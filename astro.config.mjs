import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'
import * as dotenv from 'dotenv'
import solidJs from '@astrojs/solid-js'
import cloudflare from '@astrojs/cloudflare'
dotenv.config()

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind(), solidJs()],
  adapter: cloudflare(),
})
