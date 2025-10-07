# Performance Optimizations for Bangladesh Directory Website

This log captures the tuning work done to keep the homepage fast and the client bundle lean. Changes in this round focus on eliminating unnecessary client work, trimming shipped JavaScript, and keeping expensive features off the critical path.

## ✅ Latest Improvements

- **Targeted code-splitting** – `HeroParticles`, `ScrollToTopButton`, and the production-only `PerformanceMonitor` now load through client-only wrappers, so their code leaves the critical render path and only hydrates when the browser needs it.
- **Lucide icon tree-shaking** – Next.js `modularizeImports` is configured for `lucide-react`, ensuring only the icons we render ship to the browser instead of the full icon library bundle.
- **Hero particle efficiency** – The canvas animation now respects `prefers-reduced-motion`, runs a single requestAnimationFrame loop, and skips all work while off-screen. Resize and intersection observers are established once, preventing repeated setup churn.
- **Responsive filtering** – Search input leverages `useDeferredValue`, which keeps keystrokes responsive while large queries run on a deferred version of the text.
- **Static SEO payload** – The JSON-LD schema is pre-stringified at module scope, avoiding extra allocations on every render and reducing repeated serialization work during user interactions.

## 🔍 Verification

- `pnpm run build` – validates type-checking and emits bundle statistics.
  - `/` route JS: **~123 kB first load**, split into shared chunks plus a lazily loaded particle chunk.

## 📌 Follow-up Ideas

1. Profile bundle analyzer output to confirm icon modularization eliminates the base lucide chunk entirely.
2. Consider moving the large directory data into a static JSON fetch so that the initial HTML stays lean while still streaming the content.
3. Explore server components for static sections once language selection can be derived from request metadata.

Keep this file updated when new optimizations land so we can track their impact over time.
