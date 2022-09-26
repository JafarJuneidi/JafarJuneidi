import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'
import image from '@astrojs/image'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  site: 'https://jafarjuneidi.com',
  integrations: [sitemap(), react(), image(), tailwind()],
  markdown: {
    shikiConfig: {
      theme: 'nord'
    }
  }
})
