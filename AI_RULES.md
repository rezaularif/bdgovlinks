# AI Development Rules

These guidelines describe how the BdGovLinks Nuxt application is structured and how new code should be authored. Keeping changes aligned with these conventions ensures the project stays maintainable and predictable.

## Core Stack

- **Framework**: Nuxt 3 (Vue 3, Nitro node-server preset)
- **Language**: TypeScript with `<script setup>` syntax
- **Styling**: Tailwind CSS (design tokens defined in `assets/css/tailwind.css`)
- **Icons**: `lucide-vue-next`
- **State & Utilities**: Nuxt composables (`useState`, `useHead`, etc.) and typed helpers in `utils/`
- **Tooling**: Vite bundler, `pnpm` for package management

## Conventions

1. **Component Authoring**
   - Use single-file components (`.vue`) with `<script setup lang="ts">`.
   - Place shared UI under `components/` and page-specific layouts inside `pages/`.
   - Prefer Nuxt’s auto-imports (`#imports`) for composables such as `useState`, `useHead`, `useSeoMeta`, etc.

2. **Styling**
   - Apply Tailwind utility classes directly in templates.
   - Update or add design tokens in `assets/css/tailwind.css` if new palette variables are required.
   - Avoid ad-hoc global CSS; component-scoped styles should be rare and well justified.

3. **Composables & Utilities**
   - Reusable reactive logic belongs in `composables/`. Export typed helpers and document expected behaviour.
   - Static data, translations, or JSON maps live in `utils/`.

4. **Icons**
   - Import from `lucide-vue-next`. Add new mappings in `utils/site-icons*.json` when caching favicons.

5. **Internationalisation**
   - Extend `utils/translations.ts` and keep the `useLanguage` composable in sync whenever new copy is introduced.

6. **SEO & Metadata**
   - Default metadata is defined in `nuxt.config.ts`. Page-specific overrides should use `useHead`/`useSeoMeta` inside the page component.

7. **Async / Client-Only Features**
   - Wrap browser-only functionality with `<ClientOnly>` or dedicated `.client.vue` components.
   - Respect user preferences such as `prefers-reduced-motion` in animations and visual effects.

8. **Testing & Builds**
   - Run `pnpm run build` before pushing significant changes to confirm the app compiles and Nitro output is generated.

Following these rules will keep the codebase cohesive and make future contributions smoother for everyone.
