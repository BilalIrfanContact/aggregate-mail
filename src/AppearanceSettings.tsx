import { accents, supportsGlass, themes, type Appearance } from "./appearance";

/** Theme, accent and transparency controls for Settings, Appearance. */
export function AppearanceSettings({ value, onChange }: {
  value: Appearance;
  onChange: (value: Appearance) => void;
}) {
  const glass = supportsGlass();
  return (
    <div className="appearance-settings">
      <h2 id="theme-label">Theme</h2>
      <div className="theme-choices" role="radiogroup" aria-labelledby="theme-label">
        {themes.map((theme) => (
          <button
            key={theme.id}
            type="button"
            role="radio"
            aria-checked={value.theme === theme.id}
            className={value.theme === theme.id ? "active" : undefined}
            onClick={() => onChange({ ...value, theme: theme.id })}
          >
            <span className="theme-preview" style={{ background: theme.swatch }} aria-hidden="true">
              <i />
              <b />
            </span>
            {theme.label}
          </button>
        ))}
      </div>
      <h2 id="accent-label">Accent</h2>
      <div className="accent-choices" role="radiogroup" aria-labelledby="accent-label">
        {accents.map((accent) => (
          <button
            key={accent.id}
            type="button"
            role="radio"
            aria-checked={value.accent === accent.id}
            aria-label={accent.label}
            title={accent.label}
            className={value.accent === accent.id ? "active" : undefined}
            style={{ background: accent.color }}
            onClick={() => onChange({ ...value, accent: accent.id })}
          />
        ))}
      </div>
      <label className="setting-toggle">
        <span>Transparency</span>
        <input
          type="checkbox"
          role="switch"
          disabled={!glass}
          checked={glass && value.glass}
          onChange={(event) => onChange({ ...value, glass: event.target.checked })}
        />
      </label>
      {!glass && <p className="note">Transparency needs macOS or Windows 11.</p>}
    </div>
  );
}
