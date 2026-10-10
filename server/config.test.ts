import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

test("connection settings preserve other config and reject line injection", async () => {
  const directory = mkdtempSync(path.join(tmpdir(), "aggregate-config-"));
  process.env.MAIL_DATA_DIR = path.join(directory, "mail");
  process.env.MAIL_CONFIG_PATH = path.join(directory, "settings.env");
  process.env.MAIL_DESKTOP_TOKEN = "test-only-token";
  writeFileSync(
    process.env.MAIL_CONFIG_PATH,
    "# Keep this\nAPP_URL=http://127.0.0.1:3001\nGOOGLE_CLIENT_ID=old\n",
  );
  const { startServer } = await import("./index.js");
  const server = await startServer(0);
  try {
    const address = server.address();
    assert.ok(address && typeof address === "object");
    const origin = `http://127.0.0.1:${address.port}`;
    const headers = {
      "X-Desktop-Token": "test-only-token",
      "Content-Type": "application/json",
    };
    const state = (await (
      await fetch(`${origin}/api/state`, { headers })
    ).json()) as { csrf: string };
    const mutationHeaders = { ...headers, "X-CSRF-Token": state.csrf };
    const saved = await fetch(`${origin}/api/config`, {
      method: "POST",
      headers: mutationHeaders,
      body: JSON.stringify({
        googleClientId: "new-client",
        googleClientSecret: "test-secret",
      }),
    });
    assert.equal(saved.status, 200);
    const config = readFileSync(process.env.MAIL_CONFIG_PATH, "utf8");
    assert.match(config, /# Keep this\nAPP_URL=http:\/\/127\.0\.0\.1:3001/);
    assert.match(config, /GOOGLE_CLIENT_ID="new-client"/);
    assert.ok(!config.includes("GOOGLE_CLIENT_ID=old"));
    const rejected = await fetch(`${origin}/api/config`, {
      method: "POST",
      headers: mutationHeaders,
      body: JSON.stringify({ googleClientSecret: "bad\nINJECTED=1" }),
    });
    assert.equal(rejected.status, 400);
    assert.equal(readFileSync(process.env.MAIL_CONFIG_PATH, "utf8"), config);
    assert.equal((await fetch(`${origin}/api/state`)).status, 403);
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  }
});
