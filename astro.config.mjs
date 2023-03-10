import { defineConfig } from 'astro/config'

// https://astro.build/config
import tailwind from '@astrojs/tailwind'
import * as dotenv from 'dotenv'
import solidJs from '@astrojs/solid-js'
dotenv.config()

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind(), solidJs()],
})
