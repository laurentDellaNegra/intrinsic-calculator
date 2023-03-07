import { defineConfig } from 'astro/config'

// https://astro.build/config
import tailwind from '@astrojs/tailwind'

import * as dotenv from 'dotenv'
dotenv.config()

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind()],
})
