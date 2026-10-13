// Theme presets, accent colors and window transparency, stored per device.
// CSS owns each theme's palette under :root[data-theme]; this module only
// picks the preset, sets the accent and toggles the translucent chrome.

export const themes = [
  { id: "black", label: "Black", swatch: "#000" },
  { id: "graphite", label: "Graphite", swatch: "#1c1c1e" },
  { id: "midnight", label: "Midnight", swatch: "#0b1020" },
  { id: "forest", label: "Forest", swatch: "#0b1410" },
] as const;

export const accents = [
  { id: "blue", label: "Blue", color: "#6b9cff" },
  { id: "purple", label: "Purple", color: "#a78bfa" },
  { id: "pink", label: "Pink", color: "#f472b6" },
  { id: "orange", label: "Orange", color: "#fb923c" },
  { id: "green", label: "Green", color: "#4ade80" },
  { id: "graphite", label: "Graphite", color: "#a0a0a6" },
] as const;

export type ThemeId = (typeof themes)[number]["id"];
export type AccentId = (typeof accents)[number]["id"];
export type Appearance = { theme: ThemeId; accent: AccentId; glass: boolean };

export const defaultAppearance: Appearance = { theme: "black", accent: "blue", glass: true };
const storageKey = "emc2.appearance.v1";

/** Whether the desktop window has an OS material behind it to show through. */
export function supportsGlass(): boolean {
  return !!window.desktop?.materials;
}

const isTheme = (value: unknown): value is ThemeId => themes.some((theme) => theme.id === value);
const isAccent = (value: unknown): value is AccentId => accents.some((accent) => accent.id === value);

export function readAppearance(): Appearance {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(storageKey) || "null");
    if (!stored || typeof stored !== "object") return { ...defaultAppearance };
    const input = stored as Record<string, unknown>;
    return {
      theme: isTheme(input.theme) ? input.theme : defaultAppearance.theme,
      accent: isAccent(input.accent) ? input.accent : defaultAppearance.accent,
      glass: typeof input.glass === "boolean" ? input.glass : defaultAppearance.glass,
    };
  } catch {
    return { ...defaultAppearance };
  }
}

export function saveAppearance(value: Appearance): boolean {
  try {
    localStorage.setItem(storageKey, JSON.stringify({ theme: value.theme, accent: value.accent, glass: value.glass }));
    return true;
  } catch {
    return false;
  }
}

/** Applies a preset to the document root; called on start and on every change. */
export function applyAppearance(value: Appearance, root = document.documentElement) {
  root.dataset.theme = value.theme;
  root.style.setProperty("--accent", accents.find((accent) => accent.id === value.accent)!.color);
  root.toggleAttribute("data-glass", value.glass && supportsGlass());
}
