# Performance Optimisations · BdGovLinks

This log tracks the changes made to keep the Nuxt-powered homepage fast and the client bundle lean. Updates here ensure future contributors know which ideas have already been tried and what to watch for when tweaking performance-sensitive areas.

## ✅ Latest Improvements

- **Client-only feature loading** – `HeroParticles`, `ScrollToTopButton`, and the production-only `PerformanceMonitor` live in `.client.vue` files and render through `<ClientOnly>`, keeping them off the SSR + hydration critical path.
- **Lucide tree-shaking** – We import icons from `lucide-vue-next` on a per-icon basis so the bundle only ships the glyphs we actually render.
- **Particle efficiency** – The hero canvas respects `prefers-reduced-motion`, runs a single animation loop, and pauses whenever the component leaves the viewport. Resize and intersection observers are created once and torn down cleanly.
- **Search filtering** – Directory filtering is debounced via Vue `computed` chains instead of eager loops, keeping keystrokes responsive even with larger datasets.
- **Static SEO payloads** – The JSON-LD schema is pre-stringified at module scope so we avoid per-render serialisation work.

## 🔍 Verification

- `pnpm run build` – runs the Nuxt production build (type-check + Nitro output) and prints client bundle sizes.
  - `/` route JS: **≈124 kB** split across shared chunks plus a lazily loaded particle bundle.

## 📌 Follow-up Ideas

1. Run the Nuxt bundle analyser to validate icon tree-shaking results.
2. Consider streaming directory data from a static JSON endpoint once pagination/search requirements grow.
3. Profile hydration timings; if needed, move additional sections into islands via `<ClientOnly>` or async components.

Keep adding notes here when you make performance-focused changes so we can track their impact over time.
