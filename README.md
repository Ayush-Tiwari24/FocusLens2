# FocusLens + Clerk Auth

FocusLens eye-tracking focus monitor, fully integrated with Clerk authentication.

## Stack
- **Next.js 15** — App Router
- **Clerk** — Authentication (email, Google, GitHub, etc.)
- **face-api.js** — Eye tracking & blink detection
- **TypeScript**

## Quick Start

### 1. Install
```bash
npm install
```

### 2. Add your Clerk Secret Key
Open `.env.local` and fill in:
```env
CLERK_SECRET_KEY=sk_test_YOUR_SECRET_KEY_FROM_DASHBOARD
```
Get it from → https://dashboard.clerk.com → Your App → API Keys

### 3. Run
```bash
npm run dev
```
Open http://localhost:3000

---

## How It Works

| Route | Description |
|---|---|
| `/` | Landing page — sign in/up via Clerk modal |
| `/dashboard` | Protected FocusLens app — redirects to sign-in if not authenticated |
| `/sign-in` | Clerk sign-in page |
| `/sign-up` | Clerk sign-up page |

## Auth Flow
1. User visits `/` → sees landing page with features
2. Clicks Sign Up / Sign In → Clerk modal (supports email, Google, GitHub, etc.)
3. After auth → redirected to `/dashboard`
4. Middleware protects `/dashboard` — unauthenticated users are sent to `/sign-in`
5. FocusLens app receives user info from Clerk via `window.FL_USER`
6. Sign out button in topbar calls Clerk's `signOut()` and redirects to `/`

## File Structure
```
focuslens-clerk/
├── middleware.ts                     ← Protects /dashboard
├── .env.local                        ← Clerk API keys
├── public/
│   └── fl-app.js                     ← FocusLens core logic (auth-free)
└── app/
    ├── layout.tsx                    ← ClerkProvider + Google Fonts
    ├── globals.css                   ← All FocusLens styles
    ├── page.tsx                      ← Landing page
    ├── dashboard/
    │   ├── page.tsx                  ← Auth check → renders FocusApp
    │   └── FocusApp.tsx              ← Full FocusLens UI (client component)
    ├── sign-in/[[...sign-in]]/
    │   └── page.tsx
    └── sign-up/[[...sign-up]]/
        └── page.tsx
```

#   f o c u s l e n s 
 
 #   f o c u s l e n s 
 
 #   F o c u s L e n s 
 # FocusLens

A smart focus detection system
 
