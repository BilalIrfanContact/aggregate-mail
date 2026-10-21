import { useEffect } from "preact/hooks";
import { createClient } from "lakebed/client";
import type app from "../server/index";
import { appIcon } from "../shared/logo";
import type { Provider } from "../shared/providers";
import { providers } from "../shared/providers";
import { Inbox } from "./inbox";
import { Features } from "./features";

const client = createClient<typeof app>();

const GITHUB_REPO = "https://github.com/Zns-Nexus/aggregate-mail";
const CAFE_REPO = "https://git.cafe/screen/aggregate-mail";
const RELEASES = `${GITHUB_REPO}/releases/latest`;

// The app connects Gmail, iCloud Mail, Fastmail and Yahoo Mail, so those are the
// four marks here: two beside the window on the left, two on the right.
const left = providers.slice(0, 2);
const right = providers.slice(2);

function Mark({ provider }: { provider: Provider }) {
  return (
    <svg aria-label={provider.name} className="h-8 w-8" role="img" viewBox={provider.viewBox}>
      {provider.paths.map((path) => (
        <path d={path} fill={provider.hex} key={path} />
      ))}
    </svg>
  );
}

function Chip({ provider }: { provider: Provider }) {
  return (
    <div className="relative flex w-12 shrink-0 justify-center">
      <Mark provider={provider} />
      <span className="absolute top-full mt-2 text-[11px] leading-none whitespace-nowrap text-neutral-500">
        {provider.name}
      </span>
    </div>
  );
}

// A short lead-in from the mark to the edge of the window, so every line stays
// level with its own mark and meets the frame flush.
function Lead({ provider, towardsApp }: { provider: Provider; towardsApp: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-2 w-16 shrink-0"
      preserveAspectRatio="none"
      viewBox="0 0 100 8"
    >
      <path
        d="M 0 4 H 100"
        fill="none"
        stroke={provider.hex}
        strokeLinecap="round"
        strokeOpacity={0.4}
        strokeWidth={1.3}
      />
      <circle className="motion-reduce:hidden" fill={provider.hex} r={2.8}>
        <animateMotion
          dur="3.2s"
          path={towardsApp ? "M 0 4 H 100" : "M 100 4 H 0"}
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

function StarLink({ count, href, label }: { count?: number | null; href: string; label: string }) {
  return (
    <a
      className="flex min-h-11 items-center gap-1.5 rounded-full border border-neutral-800 px-2 py-1 text-xs text-neutral-400 hover:border-neutral-600 hover:text-white sm:px-3"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <svg aria-hidden="true" className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.6l2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.62l-5.88 3.09 1.12-6.55-4.76-4.64 6.58-.96z" />
      </svg>
      {label}
      {typeof count === "number" ? <span className="tabular-nums text-neutral-500">{count}</span> : null}
    </a>
  );
}

export function App() {
  const stars = client.useQuery("stars");
  const downloads = client.useQuery("downloads");

  useEffect(() => {
    document.title = "Emc² | Desktop email for Gmail and IMAP";
    const font = document.createElement("link");
    font.rel = "stylesheet";
    font.href = "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&display=swap";
    document.head.appendChild(font);
    document.documentElement.style.overscrollBehavior = "none";
    document.body.style.overscrollBehavior = "none";
    return () => {
      font.remove();
      document.documentElement.style.overscrollBehavior = "";
      document.body.style.overscrollBehavior = "";
    };
  }, []);

  return (
    <div
      className="min-h-dvh bg-black text-white antialiased [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-white [&_[tabindex]:focus-visible]:outline-2 [&_[tabindex]:focus-visible]:outline-offset-4 [&_[tabindex]:focus-visible]:outline-white"
      style={{ fontFamily: 'Geist, system-ui, -apple-system, "Segoe UI", sans-serif' }}
    >
      <a className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-10 focus:bg-black focus:p-3" href="#inbox">Skip to features</a>
      <header>
        <div className="mx-auto flex min-h-16 max-w-[1544px] flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-6">
          <a className="flex shrink-0 items-center gap-3" href={GITHUB_REPO} rel="noreferrer" target="_blank">
            <img alt="" className="h-6 w-6 rounded-md" height={256} src={appIcon} width={256} />
            <span className="text-[15px] font-medium tracking-tight text-white">Emc²</span>
          </a>
          <nav aria-label="Main navigation" className="flex max-w-full flex-wrap items-center gap-2 text-sm sm:gap-4">
            <a
              className="hidden py-3 text-neutral-300 hover:underline sm:inline"
              href="#inbox"
            >
              Features
            </a>
            <StarLink count={stars?.github} href={GITHUB_REPO} label="GitHub" />
            <StarLink count={stars?.cafe} href={CAFE_REPO} label="git.cafe" />
          </nav>
        </div>
      </header>

      <main>
        <section aria-labelledby="hero-heading" className="px-4 pt-10 pb-10 sm:px-6 sm:pt-12">
          <div className="mx-auto grid max-w-[1280px] gap-6 lg:grid-cols-2 lg:gap-12">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl xl:text-6xl" id="hero-heading">
              Mail that sorts itself, and stays on your machine.
            </h1>
            <div>
              <p className="max-w-2xl text-lg leading-relaxed">
                A desktop email client for Windows, macOS and Linux. Connect Gmail, iCloud, Fastmail, Yahoo or any
                IMAP server. Read, sort and keep mail in one encrypted local store.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:underline"
                  href={RELEASES}
                  rel="noreferrer"
                  target="_blank"
                >
                  Download for Windows
                </a>
                <a
                  className="rounded-full border border-neutral-800 px-6 py-3 text-sm font-medium hover:border-neutral-600 hover:underline"
                  href={GITHUB_REPO}
                  rel="noreferrer"
                  target="_blank"
                >
                  Read the source
                </a>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-neutral-400">
                {typeof downloads === "number" ? (
                  <span className="mr-3 text-white">
                    <span className="tabular-nums">{downloads.toLocaleString("en-US")}</span> downloads
                  </span>
                ) : null}
                Unsigned Windows build · <a className="underline underline-offset-4" href="#download">macOS and Linux options</a>
              </p>
            </div>
          </div>
        </section>

        <div aria-label="Interactive inbox demo with synthetic mail" className="px-4 sm:px-6">
          <div className="grid grid-cols-1 xl:w-auto xl:grid-cols-[124px_minmax(0,1280px)_124px] xl:justify-center">
            <div className="hidden xl:flex xl:flex-col xl:items-end xl:gap-[70px] xl:pt-12">
              {left.map((provider) => (
                <div className="flex items-center" key={provider.name}>
                  <Chip provider={provider} />
                  <Lead provider={provider} towardsApp />
                </div>
              ))}
            </div>

            <div className="mx-auto w-full max-w-[1280px] xl:mx-0 xl:w-auto xl:max-w-none">
              <div className="mb-8 flex items-start justify-between px-4 xl:hidden">
                {providers.map((provider) => (
                  <Chip key={provider.name} provider={provider} />
                ))}
              </div>
              <div className="h-[340px] overflow-hidden bg-[#0a0a0a] sm:h-[min(42vh,420px)] sm:min-h-[280px]" data-ui>
                <Inbox />
              </div>
            </div>

            <div className="hidden xl:flex xl:flex-col xl:items-start xl:gap-[70px] xl:pt-12">
              {right.map((provider) => (
                <div className="flex items-center" key={provider.name}>
                  <Lead provider={provider} towardsApp={false} />
                  <Chip provider={provider} />
                </div>
              ))}
            </div>
          </div>
          <p className="mx-auto mt-3 max-w-[1280px] text-sm text-neutral-400">Interactive demo with sample mail. Current features below.</p>
        </div>

        <Features />

        <section aria-labelledby="download-heading" className="scroll-mt-10 px-4 pb-20 sm:px-6 sm:pb-28" id="download">
          <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-4xl font-medium tracking-tight sm:text-5xl" id="download-heading">Get Emc²</h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed">Windows, macOS and Linux. Source available under the MIT license.</p>
              <a className="mt-8 inline-flex min-h-11 items-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:underline" href={RELEASES} rel="noreferrer" target="_blank">View downloads</a>
            </div>
            <ul className="space-y-7 text-lg leading-relaxed">
              <li><a className="inline-block py-2 font-medium underline underline-offset-4" href={RELEASES} rel="noreferrer" target="_blank">Windows</a><p className="text-neutral-300">Setup installer (.exe). Unsigned; Windows may show a publisher warning.</p></li>
              <li><a className="inline-block py-2 font-medium underline underline-offset-4" href={`${GITHUB_REPO}#macos`} rel="noreferrer" target="_blank">macOS</a><p className="text-neutral-300">Build locally from source with ad-hoc signing. Release DMGs are not notarized.</p></li>
              <li><a className="inline-block py-2 font-medium underline underline-offset-4" href={RELEASES} rel="noreferrer" target="_blank">Linux</a><p className="text-neutral-300">AppImage for x64.</p></li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="px-4 pb-8 sm:px-6">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <span className="text-2xl font-medium tracking-tight">Emc²</span>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 text-sm">
            <a className="py-3 hover:underline" href={RELEASES} rel="noreferrer" target="_blank">Download</a>
            <a className="py-3 hover:underline" href={GITHUB_REPO} rel="noreferrer" target="_blank">GitHub</a>
            <a className="py-3 hover:underline" href={`${GITHUB_REPO}/blob/main/LICENSE`} rel="noreferrer" target="_blank">MIT license</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
