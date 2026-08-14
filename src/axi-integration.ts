import { spawn } from 'node:child_process'
import { dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
// Astro
import type { AstroIntegration } from 'astro'
// Integrations
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

import { vitePluginUserConfig } from './plugins/virtual-user-config'
import { UserConfigSchema, type UserInputConfig } from './types/user-config'
import { parseWithFriendlyErrors } from './utils/error-map'

export default function AstroAxiIntegration(opts: UserInputConfig): AstroIntegration {
  const integrations: AstroIntegration[] = []
  return {
    name: 'astro-axi',
    hooks: {
      'astro:config:setup': async ({ config, updateConfig }) => {
        let userConfig = parseWithFriendlyErrors(
          UserConfigSchema,
          opts,
          'Invalid config passed to astro-axi integration'
        )

        // Add built-in integrations only if they are not already added by the user through the
        // config or by a plugin.
        const allIntegrations = [...config.integrations, ...integrations]
        if (!allIntegrations.find(({ name }) => name === '@astrojs/sitemap')) {
          integrations.push(sitemap())
        }
        if (!allIntegrations.find(({ name }) => name === '@astrojs/mdx')) {
          integrations.push(mdx({ optimize: true }))
        }

        // Add integrations immediately after Starlight in the config array.
        // e.g. if a user has `integrations: [starlight(), tailwind()]`, then the order will be
        // `[starlight(), expressiveCode(), sitemap(), mdx(), tailwind()]`.
        // This ensures users can add integrations before/after Starlight and we respect that order.
        const selfIndex = config.integrations.findIndex((i) => i.name === 'astro-axi')
        config.integrations.splice(selfIndex + 1, 0, ...integrations)

        updateConfig({
          vite: {
            // @ts-ignore
            plugins: [vitePluginUserConfig(userConfig, config)]
          },
          scopedStyleStrategy: 'where',
          // If not already configured, default to prefetching all links on hover.
          prefetch: config.prefetch ?? { prefetchAll: true }
        })
      },

      'astro:build:done': ({ dir }) => {
        if (!opts.integ.pagefind) return
        const targetDir = fileURLToPath(dir)
        const cwd = dirname(fileURLToPath(import.meta.url))
        const relativeDir = relative(cwd, targetDir)
        return new Promise<void>((resolve) => {
          spawn('npx', ['-y', 'pagefind', '--site', relativeDir], {
            stdio: 'inherit',
            shell: true,
            cwd
          }).on('close', () => resolve())
        })
      }
    }
  }
}
