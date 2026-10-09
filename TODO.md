# Remaining Auth/UI Fixes (A, B, C)

## A. Deep-link redirect_url not honored
- **Where**: `proxy.ts:17` sets `?redirect_url=<path>`, but `SocialButtons` hardcodes `redirectUrl: "/profile"`.
- **Fix**: In `SocialButtons.handleSignIn`, read `window.location.search` for `redirect_url`, validate it's an internal path (`/...`), pass as `redirectUrl`.

## B. sso-callback ignores `currentTask`
- **Where**: `sso-callback/page.tsx:20-22` — ternary is a no-op; if `session?.currentTask` exists (MFA, org switch, etc.), it still forces `/profile`.
- **Fix**: Import `RedirectToTasks` from `@clerk/nextjs`; if `session?.currentTask`, render `<RedirectToTasks />` instead of pushing.

## C. No user-facing error on failed sign-in
- **Where**: `SocialButtons.tsx:19-25` — only `console.error`; button re-enables silently.
- **Fix**: Add `error` state; render a visible message (e.g., `<p className="text-accent-p text-xs mt-2">{error}</p>`).

---

## D. Captcha section styling
- **Where**: `signin/page.tsx:64` — bare `<div id="clerk-captcha" />`.
- **Fix**: Theme it to match the black UI and prevent layout shift:
  - `data-cl-theme="dark" data-cl-size="flexible"`
  - reserve space (e.g. `min-h-[65px]`) so Turnstile injection doesn't push the terms text.
  - Note: `appearance.captcha` on `<ClerkProvider>` does NOT apply to custom flows — data attributes only.

## Notes
- All other fixes (D–J) are done and verified.
- Profile page (H) intentionally left as placeholder per user request.