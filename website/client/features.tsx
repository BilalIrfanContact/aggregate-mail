import { accountsScreenshot, settingsScreenshot } from "../shared/screenshots";

const shortcuts = [
  { keys: "↓ / ↑ or J / K", action: "Select mail" },
  { keys: "Enter", action: "Open mail" },
  { keys: "/", action: "Search cached mail" },
  { keys: "C / R", action: "Compose / Reply" },
  { keys: "E / S", action: "Archive / Snooze" },
  { keys: "?", action: "All shortcuts" },
];

export function Features() {
  return (
    <div className="mx-auto max-w-[1280px] space-y-24 px-4 pt-24 pb-24 sm:space-y-36 sm:px-6 sm:pt-36 sm:pb-36">
      <section aria-labelledby="accounts-heading">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-16">
          <h2 className="text-4xl font-medium tracking-tight text-balance sm:text-5xl" id="accounts-heading">
            All your accounts.
            <br />
            One desktop app.
          </h2>
          <p className="max-w-xl text-lg leading-relaxed lg:self-end">
            Connect Gmail, iCloud, Fastmail, Yahoo or a custom IMAP server. Read across accounts or filter
            down to one. The installed app includes its runtime.
          </p>
        </div>
        <figure className="mt-10">
          <div
            aria-label="Earlier inbox capture. Scroll horizontally to see the full image on small screens."
            className="overflow-x-auto"
            tabIndex={0}
          >
            <img
              alt="Demo mail from Gmail, Fastmail and Yahoo together, with account filters and sender details."
              className="block h-auto w-full min-w-[720px]"
              decoding="async"
              height={800}
              loading="lazy"
              src={accountsScreenshot}
              width={1280}
            />
          </div>
          <figcaption className="mt-3 text-sm text-neutral-400">
            Earlier interface with demo mail. The current Inbox uses the six categories below.
          </figcaption>
        </figure>
      </section>

      <section aria-labelledby="inbox-heading" className="scroll-mt-10" id="inbox">
        <h2 className="text-4xl font-medium tracking-tight sm:text-5xl" id="inbox-heading">Inside the inbox</h2>
        <ul aria-label="Inbox categories" className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-lg sm:text-2xl">
          {["Primary", "Social", "Promotions", "Newsletters", "Transactions", "Updates"].map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
        <div className="mt-10 grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-24">
          <p className="max-w-md text-lg leading-relaxed">
            Category tabs separate conversations, newsletters, receipts and updates. Search the local
            cache with words, phrases and filters such as sender or unread status.
          </p>
          <dl className="space-y-7 text-lg leading-relaxed">
            <div>
              <dt className="font-medium">Snooze</dt>
              <dd className="mt-1 text-neutral-300">Set a return time. Snooze stays local to Emc².</dd>
            </div>
            <div>
              <dt className="font-medium">Done means Archive</dt>
              <dd className="mt-1 text-neutral-300">Move mail out of the inbox without deleting it.</dd>
            </div>
            <div>
              <dt className="font-medium">Teach sorting</dt>
              <dd className="mt-1 text-neutral-300">Set a sender rule for existing and future mail.</dd>
            </div>
          </dl>
        </div>
      </section>

      <section aria-labelledby="keyboard-heading" className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-4xl font-medium tracking-tight sm:text-5xl" id="keyboard-heading">Use the keyboard</h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed">
            Open Commands with Cmd+K on macOS or Ctrl+K on Windows and Linux. Search an action, then press Enter.
          </p>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-neutral-300">
            Change shortcuts in Settings, Interaction. Selecting mail with the arrow keys keeps it unread.
          </p>
        </div>
        <table className="w-full self-start text-left text-lg">
          <caption className="sr-only">Default keyboard shortcuts in the desktop app</caption>
          <thead className="sr-only"><tr><th scope="col">Keys</th><th scope="col">Action</th></tr></thead>
          <tbody>
            {shortcuts.map(({ keys, action }) => (
              <tr key={keys}>
                <th className="py-3 pr-4 font-medium" scope="row"><kbd className="[font-family:inherit]">{keys}</kbd></th>
                <td className="py-3 text-neutral-300">{action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section aria-labelledby="privacy-heading" className="scroll-mt-10" id="privacy">
        <h2 className="text-4xl font-medium tracking-tight sm:text-5xl" id="privacy-heading">Mail stays on your machine</h2>
        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl space-y-5 text-lg leading-relaxed">
            <p>Mail and account credentials live in encrypted local storage. Emc² connects directly to your mail providers.</p>
            <p>
              Local sorting needs no cloud mail processing. Optional Jev or OpenAI sorting sends the sender,
              subject and a short preview to the service you configure.
            </p>
          </div>
          <dl className="space-y-7 text-lg leading-relaxed">
            <div>
              <dt className="font-medium">Privacy mode</dt>
              <dd className="mt-1 text-neutral-300">Hide addresses and known personal names in subjects, previews and message text.</dd>
            </div>
            <div>
              <dt className="font-medium">Images by request</dt>
              <dd className="mt-1 text-neutral-300">Remote images stay blocked until you choose Show images for that opening.</dd>
            </div>
          </dl>
        </div>
      </section>

      <section aria-labelledby="settings-heading">
        <h2 className="text-4xl font-medium tracking-tight sm:text-5xl" id="settings-heading">Drafts and settings</h2>
        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
          <dl className="space-y-8 text-lg leading-relaxed">
            <div>
              <dt className="font-medium">Drafts autosave</dt>
              <dd className="mt-1 text-neutral-300">Compose and reply text saves to encrypted local drafts. Reopen it from Drafts.</dd>
            </div>
            <div>
              <dt className="font-medium">Light, dark and custom themes</dt>
              <dd className="mt-1 text-neutral-300">Choose a theme and accent, or create, import and export your own palettes.</dd>
            </div>
            <div>
              <dt className="font-medium">Notifications</dt>
              <dd className="mt-1 text-neutral-300">Choose in-app notice position and duration. Control new-mail counts and action confirmations.</dd>
            </div>
          </dl>
          <figure className="min-w-0">
            <img
              alt="Earlier Settings interface showing local appearance, branding and MCP controls."
              className="block h-auto w-full"
              decoding="async"
              height={688}
              loading="lazy"
              src={settingsScreenshot}
              width={1100}
            />
            <figcaption className="mt-3 text-sm text-neutral-400">Earlier Settings interface. Current options are described here.</figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="mcp-heading" className="grid gap-6 lg:grid-cols-2 lg:gap-16">
        <h2 className="text-4xl font-medium tracking-tight sm:text-5xl" id="mcp-heading">Local MCP for AI tools</h2>
        <div className="max-w-xl space-y-5 text-lg leading-relaxed">
          <p>MCP is off by default. Enable it in Settings to give an AI client authenticated access to synced mail while Emc² runs.</p>
          <p className="text-neutral-300">Sending replies needs a separate opt-in. Read and archive tools can change mailbox state even with sending off. Your AI client controls any onward processing.</p>
        </div>
      </section>
    </div>
  );
}
