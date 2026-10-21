# Emc² showcase site

A scrollable landing page for the Emc² desktop mail client. The opening screen keeps the headline,
download links, public counts and interactive demo inbox, with provider marks connected by moving dots.
Dots are hidden when reduced motion is requested.

Below it, sections cover Gmail and IMAP accounts, the six Inbox categories, Snooze, Archive and Teach,
keyboard commands, encrypted local storage and privacy, autosaved drafts, themes, notifications and
opt-in local MCP. The download section links to releases and the macOS source-install instructions;
the footer links to downloads, GitHub and the MIT license. Local sorting needs no cloud processing;
the page also explains what optional external AI sorting sends.

```sh
npx lakebed dev
npx lakebed deploy
```

It is a Lakebed capsule with no app npm dependencies. `server/index.ts` serves public star and download
counts without sign-in, and Tailwind classes compile from the client files. There are no CSS files or
additional app dependencies.

## Download count

The website sums GitHub's `download_count` across `.exe`, `.dmg` and `.AppImage` assets in all published
releases, including both Mac architectures and older app versions. Source archives, checksums and update
metadata are excluded. Counts describe downloads, not unique users or successful installations.

The server follows release pagination, shares concurrent reads and caches results for ten minutes. Failed
or invalid responses retain the last complete count; before any successful read, the count stays hidden.
This cache resets when the server restarts. Outbound fetch requires a claimed Lakebed deployment.

Run the focused check from the repository root with `node --test scripts/website-downloads.test.mjs`.
Build the website from this directory with `npx lakebed build --target claimed`.

## Provider marks

`shared/providers.ts` holds the marks for Gmail, iCloud Mail, Fastmail and Yahoo Mail. Gmail and iCloud
come from [Simple Icons](https://simpleicons.org) (CC0); Fastmail and Yahoo come from theSVG. The app
connects through Gmail OAuth or IMAP. The source file records each mark's viewBox, paths and color.

The line-and-dot connectors follow the tracing-beam pattern Col verifies in
[Aceternity UI](https://ui.aceternity.com/components/tracing-beam), reimplemented in Preact with SVG
`animateMotion` because a capsule cannot import npm components.

## Screenshots

`assets/` contains earlier demo-mail captures. The page reuses `accounts.jpg` and `settings.jpg`, inlined
as JPEG data URLs in `shared/screenshots.ts`, following the existing inlined app-icon approach. Lakebed
serves no static assets beyond the favicon. The images have explicit dimensions, lazy loading and
captions identifying the earlier interface. The accounts capture scrolls horizontally on narrow screens
to keep its text legible. `assets/inbox.jpg` remains unused.

When replacing a displayed capture, regenerate its base64 data URL from the matching JPEG and update
its dimensions and alt text. Screenshot changes require no storage service or hosted asset URL.
