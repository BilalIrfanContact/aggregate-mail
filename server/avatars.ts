import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { logoDomain } from "../shared/types.js";

// Company logos are fetched on the server and served from localhost, so the
// renderer never loads a remote image and no mailbox host is contacted for one.
const service = "https://icons.duckduckgo.com/ip3";
const memory = new Map<string, { body: Buffer; type: string }>();
const cacheDir = () =>
  path.join(process.env.MAIL_DATA_DIR || ".data", "logos");

const readCached = (file: string) => {
  if (!existsSync(file)) return null;
  try {
    const { body, type } = JSON.parse(readFileSync(file, "utf8")) as {
      body: string;
      type: string;
    };
    return { body: Buffer.from(body, "base64"), type };
  } catch {
    return null;
  }
};
const writeCached = (file: string, image: { body: Buffer; type: string }) => {
  try {
    mkdirSync(path.dirname(file), { recursive: true, mode: 0o700 });
    writeFileSync(
      file,
      JSON.stringify({ type: image.type, body: image.body.toString("base64") }),
      { mode: 0o600 },
    );
  } catch {
    // A logo is decorative: a cache that cannot be written is not an error.
  }
};
async function download(domain: string) {
  try {
    const response = await fetch(`${service}/${domain}.ico`, {
      signal: AbortSignal.timeout(8000),
    });
    const type = response.headers.get("content-type")?.split(";")[0].trim();
    if (!response.ok || !type?.startsWith("image/")) return null;
    const body = Buffer.from(await response.arrayBuffer());
    return body.length && body.length <= 512 * 1024 ? { body, type } : null;
  } catch {
    return null;
  }
}

export async function companyLogo(value: string) {
  const domain = logoDomain(value);
  if (!domain) return null;
  const cached = memory.get(domain);
  if (cached) return cached;
  const file = path.join(cacheDir(), `${domain}.json`);
  const onDisk = readCached(file);
  const image = onDisk || (await download(domain));
  if (!image) return null;
  if (!onDisk) writeCached(file, image);
  memory.set(domain, image);
  return image;
}
