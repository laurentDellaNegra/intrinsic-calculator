import { defineConfig } from 'astro/config'

// https://astro.build/config
import tailwind from '@astrojs/tailwind'
import * as dotenv from 'dotenv'
import solidJs from '@astrojs/solid-js'
import vercel from '@astrojs/vercel/serverless'
dotenv.config()

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind(), solidJs()],
  adapter: vercel(),
})
