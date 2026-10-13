---
name: Emc²
colors:
  background: "#000"
  surface: "#0e0e10"
  raised: "#1c1c1f"
  hover: "rgba(255,255,255,0.04)"
  selected: "rgba(255,255,255,0.07)"
  line: "rgba(255,255,255,0.08)"
  control-border: "rgba(255,255,255,0.12)"
  text: "#fff"
  text-secondary: "#a0a0a6"
  text-muted: "#88888f"
  text-faint: "#82828a"
  scrollbar: "#38383d"
  accent: "#6b9cff"
  link: "#8ab0ff"
  reason: "#e3a08b"
  veil: "#1d1d1d"
  veil-hover: "#262626"
typography:
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Segoe UI Variable Text, Segoe UI, Inter, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.45
rounded:
  control: "8px"
  pane: "14px"
  menu: "12px"
  dialog: "18px"
  avatar: "50%"
---

# Aggregate interface

## Direction

A premium macOS-native working interface across all desktop platforms. A black window frame holds a navigation rail, a sidebar and near-black working panes, with white primary text and restrained secondary text. Rounded sidebar, mail and sender panes, grouped Settings controls, and consistent curved menus and dialogs. Panes carry a faint 1px top highlight so they read as layered surfaces. The accent color (blue by default) belongs to current selection, links and switches. No decorative cards, pills or slogans.

## Themes and transparency

Settings, Appearance offers four dark themes (Black, Graphite, Midnight, Forest), six accent colors and a Transparency switch, stored on the device. Themes change the background, surface and raised colors; text tones stay the same so contrast holds. Links mix the accent with white.

Transparency uses the operating system's own material behind the window: macOS vibrancy, or acrylic on Windows 11 22H2 and later. The top bar, rail and sidebar let the desktop show through, tinted by the theme. Mail lists, the reader, sender context and Settings sections stay opaque, as in macOS Mail, so scrolling never repaints a blur. Menus, dropdowns, notices and dialogs are glass in every theme: a translucent fill over a background blur that is drawn only while they are open. Where no material exists (Linux, older Windows, the browser target) the switch is disabled.

## Layout

- Top bar 52px with no fill of its own, so it shares the window tint and transparency. Apart from its controls it drags the window. Its lead area spans the rail and sidebar and holds the window controls and the sidebar toggle; it narrows with the sidebar on the same spring. The current view or Settings follows as a 15px semibold title aligned with the content pane's text, then search and the address-blur eye on the right. On Windows and Linux there are no traffic lights, so the window runs frameless with no caption overlay and the bar draws its own three dots (12px, `#ff5f57` / `#febc2e` / `#28c840`) that close, minimize and maximize over IPC; they grey to `#3a3a3a` while another window has focus. Settings, Appearance moves them to the right, where the close dot takes the corner.
- On macOS, the native traffic lights start at (16px, 16px). The app draws no dots of its own there; the lead area reserves 88px for them. Native application, File, Edit and Window menus provide standard Command shortcuts.
- Below the top bar, a 56px navigation rail runs down the left edge. It holds one 38px icon button per app section (Mail now, more features later) and Settings pinned at the bottom. The current section gets white icon color and the 7% selected wash.
- The 240px sidebar follows the rail as a rounded pane, like a macOS source list: New message, then the mail views (Important, Other, Snoozed, Archive) with outline icons and muted counts, then Accounts (All and each account with its provider mark and a faint number hint), then the Gmail label filter, with sync status at the bottom. Rows are 32px with 8px radii and white text; the current view and account filter carry the selected wash, which slides between rows on a spring instead of jumping. Hover is a 4% wash. Account number hints are not shown; the help dialog lists them. Snoozed appears only when it has mail or is open. Choosing a view, account or label from Settings returns to mail.
- The sidebar toggle hides or shows the sidebar and remembers the choice between launches. The sidebar collapses and expands by width on a spring; its content keeps a fixed width so it clips instead of reflowing. Below 760px window width the sidebar is hidden.
- In Settings, the sidebar lists the Settings sections instead of mail (Interaction, Accounts, Sorting, Connection, Appearance, Branding, MCP, About) and the content shows one section at a time. Switching sections or between mail and Settings fades the sidebar content in over 280ms.
- Sidebar, mail and sender panes sit within a 10px gutter on the black frame, separated by 10px, with 14px corner radii. Rows have 8px horizontal insets, 8px corner radii and 18px padding: high relevance 62px on two lines, medium 40px inline, low 34px; compact density uses 28px rows and tighter vertical spacing. Sender sits in a 170px column so subjects align; two-line previews align under the subject. Circular avatars (22px, 18px on low rows): the sender's company logo on a light disc when the domain has one, otherwise a gray initial, each with a small provider badge. The sender is context and stays muted while the subject carries the message in near-white; unread is a bold subject plus a white time. The selected row is a 5.5% white wash with a 1px inset accent bar on its left edge; hover is a 3% wash. High-relevance reasons are plain faint text before the time.
- Sticky date headers (Today, Yesterday, This week, This month, Earlier) in 12px faint text.
- Sender panel 280px with a hairline left border: 44px avatar, 15px name, address, account, message count, salmon reason text, then category and relevance as faint text, followed by "Recent with" and "Recently opened" lists.
- Gmail label filter follows account filters and applies within the current view. When all accounts are shown, label names include their account. Opened Gmail mail shows custom labels as plain text and offers Edit labels in a checkbox dialog. System labels are available for filtering but cannot be edited here.
- No shortcut bar. Current shortcuts appear in the help dialog and can be edited in Settings, Interaction. Conflict checks preserve editing, Escape, Tab, account-number and system shortcuts.
- Notices float as a small bordered toast at the bottom.
- Settings: a rounded working pane like the mail list. The chosen section sits in a 760px column at its top left, under a 20px title without a number, 52px account and provider rows, plain status text, outlined buttons and small outline switches. Connection fields state what is already on disk: a ticked `Saved · <client ID>` line under the ID field, `Saved · ••••••••••••` under the secret, the Jev key and the OpenAI key, and `Not saved yet` when nothing is stored. A key is only ever shown as dots. The decision-model provider is a dropdown drawn by the app, because the native select popup ignores the dark theme. MCP shows one line at rest and folds its endpoint, token and client configs behind a `Show options` disclosure, which opens when MCP is on and closes when it is off.
- Dialogs: 18px radius, hairline border, glass fill and dimmed backdrop.
- Account setup opens directly from the empty inbox and from Settings. Use the same provider choice and connection form in both places. Show known providers with their server settings already filled in; show host and port fields only for custom IMAP. Offer configured Google sign-in first and label the separate app-password option clearly. Keep errors in the form, preserve input on failure and disable duplicate submissions while checking the connection. Developer OAuth settings belong in an advanced disclosure.

## Privacy

Hidden-address bars are 0.9em high and fit within the text line. Each bar stays on one line, is capped at its container width and can wrap as a unit after a label. This leaves space between consecutive sender-detail rows without exposing the hidden text.

`p` or the eye button toggles personal-information hiding, remembered between launches. Email addresses and known connected-recipient names become solid bars. Names come from account display names when available and the current message's To/Cc headers tied to connected addresses. Full names, first names and surnames are hidden with case-insensitive whole-word matching, including previews, subjects, recipient headers, bodies, notices and text attributes. Sender company labels remain readable unless they match a known private name. Names absent from these sources cannot be inferred reliably.

A hidden bar contains no private text in its DOM children or labels. Clicking or using Enter/Space on a bar explicitly reveals that token; re-enabling privacy clears reveals. Each bar fits on one line. Private link destinations are suppressed while privacy is on, including encoded destinations. Body images are hidden because personal information inside pixels cannot be redacted. Compose's editable From/To fields keep the existing focus-to-reveal exception. Secrets stay dots.

## Typography

Formatted email uses the app's dark surfaces, readable text, blue links and subtle borders. Sender tables, headings, lists, emphasis, spacing and bounded dimensions remain intact, along with layout modes (block, inline, inline-block and table display) and left or right floats. Hiding values such as `display: none` stay rejected so all sender text is visible. A trailing `!important` is ignored rather than rejecting the declaration. Links keep a sender's `text-decoration: none`, so card-style links are not underlined; other links stay underlined. Loaded images sit directly in the sender's line, so their vertical alignment and floats apply. An image with a width gets auto height so it keeps its shape when narrowed; one sized only by height keeps that height. Mail nested deeper than 96 levels or with more than 4,000 nodes falls back to plain text. Zero widths and heights are dropped, so hidden preview text reads as one ordinary line. Before Show images, and in privacy mode, each image is an empty faint box at its own size (24px when unsized), with the reason as its label and tooltip instead of text. Normalize sender colors, including legacy presentation attributes, without changing image pixels or privacy bars. Keep the 15px body default and 1.45 line height; supported sender font sizes still provide hierarchy.

Client action icons use local outline SVGs with a consistent 24px grid, 1.75px stroke and rounded ends. Close uses a plain cross; Settings uses sliders. Gmail uses a multicolor vector mark, and custom IMAP uses an outline envelope without a colored tile. Button labels and keyboard behavior stay unchanged.

Sender provider badges are small rounded squares with opaque backgrounds; Gmail and IMAP use the raised dark surface. Their glyphs remain visible in both comfortable and compact rows, so reduced density never leaves an empty outline over the sender logo.

Segoe UI Variable on Windows, SF Pro on macOS. 14px in comfortable inbox rows, 13px in compact rows, 15px sender name and Settings headings, 20px message heading, 15px message body at 1.45 line height, with 0.85em paragraph spacing in a 65ch column.

## Behavior

Right-click a mail row or opened message for Open, Mark as read, Reply, Done, Snooze and Teach sorting; snoozed mail also offers Return to inbox. Right-click selects the target without marking it read. Shift+F10 or the Menu key opens the same menu at the focused message. Arrow keys, Home and End navigate enabled actions; Escape or Tab dismisses and restores focus. The menu stays within the viewport and closes on outside pointer input, external scrolling, resize, window blur, or a view change. Archive, snooze and sorting writes are disabled while busy or syncing. Mark as read is disabled on already-read mail and shares the queued read-on-open request without opening the message. Explicit reads can wait behind sync; failures show a notice and remain retryable.

Ctrl+Plus (including Ctrl+Equals and numpad Plus) chooses comfortable rows; Ctrl+Minus chooses compact rows. These shortcuts suppress page zoom outside editable fields and dialogs; `d` still toggles density. Opening unread mail requests provider read status independently of other UI actions. Pending read requests coalesce. This includes reader navigation and cached archived Gmail mail. Merely selecting a row does not mark it read. Failed read requests leave the message unread and show a notice; reopening retries. Archived IMAP mail is located by Message-ID, with exact candidate verification before changing remote flags.

Motion uses short ease-out transitions (cubic-bezier(0.22, 1, 0.36, 1)) and, for movement that should feel physical, a lightly damped spring written as a CSS `linear()` curve with a small overshoot. Nothing loops. List panes settle in 220ms; opened mail rises 8px; a Settings section rises 10px on the spring over 380ms; the sidebar wash slides and the sidebar collapses on the spring over about 450ms; menus reveal over 180ms; dialogs scale from 0.98 on the spring over 420ms. Rows appear together, without stagger. Native smooth scrolling follows programmatic selection in mail lists, sender context, Settings, dialogs and dropdowns. Wheel and trackpad input stay with the platform; there are no wheel interceptors. New panes reset instantly. Reduced-motion preferences shorten transitions and restore immediate scrolling. Focus shows a 1px accent outline. Message bodies preserve supported sender tables, headings, emphasis, spacing and HTTP(S) links, with colors matched to the app theme through bounded safe rendering. Sender scripts, forms, embedded documents, global stylesheets and remote fonts are discarded. Oversized or unsupported content falls back to readable cached text. Show images appears above the body. Images stay blocked until activation for this opening, appear in formatted-content order or below plain text, fit the reader width and send no referrer. Privacy mode disables loading and removes body images. The control warns that loading can tell the sender the email was opened. Loading, failure and no-supported-images states use plain status text. Switching messages or closing the reader clears consent. Embedded CID images are not shown.

An uncertain send keeps the compose dialog and draft open with "Send status unknown" and a warning that the message may already have been sent. Editing the draft keeps this status. Every subsequent Send submission requires confirmation that another send may create a duplicate. Closing compose asks to discard this draft and warns about possible delivery; it does not call the draft unsent. The native application-close prompt also avoids calling the draft unsent. Form validation blocks invalid input before submission. Confirmed send success closes compose. Sent-copy, connection cleanup and inbox-refresh failures appear as warnings without changing the send outcome.

Back and Forward use labeled arrow buttons in secondary text, pinned above the inbox and reader, with date headings below them. The reader shows a separate muted `Esc` hint for closing the email. Navigation restores the view, account and Gmail label filters, search text and selected or opened message. Row selection alone creates no visit; editing a search creates one visit for the edit sequence. A new visit after Back clears Forward. History stays in memory for the current window. Compose, Teach, Snooze, shortcut help and Settings block history traversal. Returning to an email starts with images blocked again. If a visited message disappears, navigation shows the list instead of opening another message; a missing account filter returns to All.

Closing the desktop window hides it to a tray icon instead of exiting, so the app, its mail service and its five-minute sync keep running. The tray menu reopens the window or quits, a second launch restores the window, and the system session end still exits. A sync that finds new unread mail shows one native notification for the run, naming the count and reopening the window when clicked; the first import of a mailbox never notifies, and a failed sync reports no arrivals. Editable fields and selected text keep a native right-click menu for undo, redo, cut, copy, paste and select all, with items enabled from the platform's edit flags; mail rows keep the app's own menu.
