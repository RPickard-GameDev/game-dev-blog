import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from "vite";

// Load the environment variables
const { SITE } = loadEnv(process.env.PUBLIC_SITE_URL, process.cwd(), "");
const { BASE } = loadEnv(process.env.BASE, process.cwd(), "");
// Get the site URL from environment variable or use a default for local development
const site = process.env.PUBLIC_SITE_URL;
const base = process.env.BASE;

export default defineConfig({
  SITE,
  BASE,
  vite: {
    plugins: [tailwindcss()],
    css: {
      preprocessorOptions: {
        css: {
          additionalData: `@import "aos/dist/aos.css";`
        }
      }
    },
    optimizeDeps: {
      include: ['aos']
    }
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
      langs: [],
      transformers: [],
      showLineNumbers: false,
      lineNumbersPrefix: ''
    }
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => !page.includes('/404'), // Only exclude 404 page
      entryLimit: 10000, // Increase entry limit if you have many pages
    }),
  ],
  image: {
    // Allow all remote patterns (https and http)
    remotePatterns: [
      {
        protocol: "https"
      },
      {
        protocol: "http"
      }
    ]
  }
});