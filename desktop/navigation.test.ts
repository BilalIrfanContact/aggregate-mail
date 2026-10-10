import { test } from "node:test";
import assert from "node:assert/strict";
import { isExternalLink, isLocalNavigation } from "./navigation.js";
const origin = "http://127.0.0.1:32145";
test("desktop only navigates its own UI and hands safe links to the browser", () => {
  assert.ok(isLocalNavigation(`${origin}/?connected=1`, origin));
  assert.ok(!isLocalNavigation(`${origin}/api/state`, origin));
  assert.ok(isExternalLink(`${origin}/api/oauth/google`, origin));
  assert.ok(isExternalLink("https://accounts.google.com/", origin));
  for (const url of [
    "file:///C:/Windows",
    "javascript:alert(1)",
    "http://example.com",
    `${origin}/api/send`,
    "not a url",
  ])
    assert.ok(!isExternalLink(url, origin));
});
