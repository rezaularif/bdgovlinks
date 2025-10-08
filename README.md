# BdGovLinks · Bangladesh Government Directory

BdGovLinks is an unofficial directory that helps residents quickly discover official Bangladesh government websites.  
The project now runs on **Nuxt 3 + Vue 3 + TypeScript**, styled with **Tailwind CSS** and optimised for fast initial loads.

## Getting Started

```bash
pnpm install
pnpm dev
```

The dev server runs at [http://localhost:3000](http://localhost:3000). Nuxt provides hot-module replacement, so any change to a page or component is immediately reflected in the browser.

## Available Scripts

| Command          | Description                                                |
| ---------------- | ---------------------------------------------------------- |
| `pnpm dev`       | Start the Nuxt development server with HMR                 |
| `pnpm build`     | Create the production build (`.nuxt` + `.output`)          |
| `pnpm preview`   | Preview the built site locally (`node .output/server`)     |
| `pnpm fetch:favicons` | Refresh the cached government website favicons        |

## Project Structure

```
app.vue                 # Root app shell, mounts pages and global monitors
pages/index.vue         # Home directory view
components/             # Vue components (client-only utilities, icons, etc.)
composables/            # Reusable Nuxt/Vue composables (e.g. language switcher)
assets/css/tailwind.css # Tailwind setup + design tokens
utils/                  # Translation data, favicon maps, helpers
```

Static assets (favicons, Open Graph images, manifest) live under `public/`.

## Tooling & Conventions

- **Styling** – Tailwind utility classes with a small set of design tokens in `assets/css/tailwind.css`.
- **Icons** – [`lucide-vue-next`](https://github.com/lucide-icons/lucide) for consistent SVG icons.
- **Language Support** – Centralised via the `useLanguage` composable and translation catalog under `utils/`.
- **Performance Monitors** – Client-only hooks deferred until after render to keep the critical path lean.

## Deploying

1. `pnpm install`
2. `pnpm build`
3. Deploy the generated `.output` directory (Nitro node-server preset) to your preferred host.  
   For Node hosting: `node .output/server/index.mjs`.

For more Nuxt guidance, see the [Nuxt docs](https://nuxt.com/docs/getting-started/introduction) and [Nitro deployment guide](https://nitro.build/deploy).

---

Made with ❤️ for the people of Bangladesh. Contributions and suggestions are always welcome!
