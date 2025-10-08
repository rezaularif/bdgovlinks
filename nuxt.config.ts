import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  nitro: {
    compatibilityDate: '2025-10-08',
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  runtimeConfig: {
    public: {
      siteUrl:
        process.env.NODE_ENV === 'production'
          ? 'https://bdgovlinks.com'
          : 'http://localhost:3000',
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      titleTemplate:
        '%s | BdGovLinks - Bangladesh Government Website Directory',
      title: 'BdGovLinks - Unofficial Directory of Bangladesh Government Websites',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=5',
        },
        {
          name: 'description',
          content:
            'Find all official government websites of Bangladesh in one place. Access government services, information, and resources.',
        },
        {
          name: 'keywords',
          content:
            'Bangladesh government websites, Bangladesh government directory, Bangladesh official websites, government services Bangladesh, Bangladesh public services, Bangladesh ministries, Bangladesh government portal',
        },
        { name: 'author', content: 'Arif' },
        { name: 'publisher', content: 'BdGovLinks' },
        { name: 'theme-color', content: '#107a4a' },
        {
          name: 'robots',
          content: 'index,follow,max-image-preview:large,max-snippet:-1',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:url', content: 'https://bdgovlinks.com' },
        {
          property: 'og:title',
          content:
            'BdGovLinks - Unofficial Directory of Bangladesh Government Websites',
        },
        {
          property: 'og:description',
          content:
            'Find all official government websites of Bangladesh in one place. Access government services, information, and resources.',
        },
        {
          property: 'og:site_name',
          content: 'BdGovLinks',
        },
        {
          property: 'og:image',
          content: '/opengraph-image.png',
        },
        {
          property: 'og:image:width',
          content: '1200',
        },
        {
          property: 'og:image:height',
          content: '630',
        },
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          name: 'twitter:title',
          content:
            'BdGovLinks - Unofficial Directory of Bangladesh Government Websites',
        },
        {
          name: 'twitter:description',
          content:
            'Find all official government websites of Bangladesh in one place. Access government services, information, and resources.',
        },
        { name: 'twitter:image', content: '/twitter-image.png' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon-96x96.png',
          sizes: '96x96',
        },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        {
          rel: 'apple-touch-icon',
          href: '/favicon-96x96.png',
          sizes: '180x180',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
        {
          rel: 'canonical',
          href: 'https://bdgovlinks.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
      ],
      script: [
        {
          src: 'https://cloud.umami.is/script.js',
          defer: true,
          'data-website-id': 'fc54d9bb-b60c-4815-9bfd-a1a467cacb50',
        },
      ],
    },
  },
});
