# 🏗 CORE NEXT.JS 16 ARCHITECTURE RULES

⭐ **RULE 1 — Server Components FIRST**
- All components **MUST** be Server Components by default.
- Client Components **MUST** be explicitly justified.
- Never add `"use client"` unless interaction is required.
- **Above-the-fold content MUST ALWAYS be server rendered:**
  - Hero sections
  - Navigation shell
  - Headings and marketing copy
  - First viewport product/content grid
  - Page layout structure

⭐ **RULE 2 — Client Components MUST be isolated islands**
- When interactivity is required:
  - Extract only interactive logic.
  - Wrap only minimal UI.
  - Avoid client wrappers around layout trees.
- **Example:**
  - ✅ **Correct:** `NavbarShell (Server)` └ `NavbarMenuToggle (Client)`
  - ❌ **Incorrect:** `"use client"` atop `Navbar` (entire component)

⭐ **RULE 3 — Root Layout MUST remain server-only**
- Never wrap Root Layout with:
  - Smooth scroll libraries
  - Animation providers
  - Analytics providers
  - Cookie consent providers
  - UI global state providers
- These must be lazy-loaded or scoped lower in the tree (e.g., using a `ClientSideUtilities` island).

⚡ **STREAMING RULES (App Router)**
- Enable progressive rendering.
- Use `Suspense` boundaries for data-heavy sections.
- Stream content early.
- Avoid client components blocking streaming.
- **Above-the-fold streaming:** Hero and navigation MUST be streamable from the server.

🧩 **HYDRATION CONTROL RULES**
- Hydration must **NEVER** block first paint.
- **Avoid:**
  - Global client providers in `layout.tsx`.
  - Heavy runtime libraries in layout.
  - Client logic required for primary content visibility.
- Hydration must be: **minimal, isolated, and progressive.**

🖼 **NEXT/IMAGE RULES**
- **Above Fold Images:** Must ALWAYS include `priority`, `fetchPriority="high"`, and `loading="eager"`.
- **Delivery:** Use responsive `sizes`, avoid CSS background images for heroes, use WebP/AVIF, and compress aggressively.

🎨 **RENDER BLOCKING & CSS RULES**
- Never delay hero or heading rendering with:
  - `opacity: 0`
  - Animation reveal
  - Delayed transitions
  - Skeleton overlay hiding real content
- Critical content **MUST** be visible immediately after HTML arrives.

⚡ **JAVASCRIPT BUNDLE RULES**
- Use **dynamic imports** for below-fold sections (`ssr: false` where appropriate).
- Enable tree shaking.
- Avoid global imports of heavy libraries.
- Use Next.js `optimizePackageImports` when possible.

🌐 **NEXT/SCRIPT RULES**
- Analytics and third-party scripts **MUST** use `next/script` with `strategy="afterInteractive"` or `lazyOnload`.
- Never block rendering.

🔤 **NEXT/FONT RULES**
- Use `display: swap`.
- Use automatic preloading.
- Avoid layout shift and runtime font loading.

🌍 **INTERNATIONALIZATION RULES (next-intl)**
- Prefer server translation APIs (`getTranslations`).
- Avoid wrapping full layout in client providers.
- Only use client provider when interactive translation is required.

⚠ **NEXT.JS 16 ANTI-PATTERNS (STRICTLY FORBIDDEN)**
- ❌ Full layout marked as client.
- ❌ Smooth scroll wrapping entire app.
- ❌ Analytics or tracking scripts inside layout synchronously.
- ❌ Lazy loading above-the-fold images.
- ❌ Animation-based content reveal for hero text.
- ❌ Heavy providers in `RootLayout`.
- ❌ Large UI libraries imported globally.

🧪 **SPEED INDEX RISK DETECTION**
- Does UI require hydration before content becomes visible?
- Does any animation delay visual completion?
- Are any client wrappers blocking rendering?
- Are critical images prioritized?
- Is any CSS blocking rendering?
- Are analytics scripts deferred?
- **👉 You MUST automatically refactor before finalizing code if risk exists.**

📊 **PERFORMANCE SELF-AUDIT CHECKLIST**
1. **Above Fold:** Is hero/nav server rendered? Priority images? Text visible immediately?
2. **Hydration:** Minimal client components? Scoped providers? Layout server-only?
3. **Streaming:** Progressive streaming? Suspense used correctly?
4. **Network:** Fonts optimized? Images compressed? Deferred scripts?

🧠 **DEVELOPMENT PHILOSOPHY**
1. **Server First**
2. **Streaming First**
3. **Hydration Minimal**
4. **Visual Paint Early**
5. **JavaScript Last**

🚨 **FAILURE RESPONSE PROTOCOL**
- Stop feature implementation if performance risk is detected.
- Explain the bottleneck.
- Propose architecture-safe solution.
- Continue only after performance issue is fixed.

📈 **SUCCESS CRITERIA**
- Above-the-fold content renders without hydration delay.
- Streaming SSR is preserved.
- Speed Index is optimized by design.
- **Lighthouse Mobile Performance ≥ 90.**
