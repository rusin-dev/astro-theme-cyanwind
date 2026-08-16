// @ts-check

import cloudflare from '@astrojs/cloudflare'
import { rehypeHeadingIds, unified } from '@astrojs/markdown-remark'
// Adapters
import vercel from '@astrojs/vercel'
import { defineConfig } from 'astro/config'
// Rehype & remark packages
import rehypeKatex from 'rehype-katex'
import remarkDirective from 'remark-directive'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeExternalLinks from 'rehype-external-links'

// Integrations
import AstroAxiIntegration from './src/axi-integration.ts'
import { rehypeLuoguBlocks, remarkLuoguBlocks } from './src/plugins/luogu-blocks.ts'
import { remarkAddZoomable, remarkReadingTime } from './src/plugins/remark-plugins'
// Others
// import { visualizer } from 'rollup-plugin-visualizer'

// Local integrations
import { outputCopier } from './src/plugins/output-copier.ts'
// Local rehype & remark plugins
import rehypeAutolinkHeadings from './src/plugins/rehype-auto-link-headings.ts'
// Shiki
import {
  addCopyButton,
  addLanguage,
  addTitle,
  transformerNotationDiff,
  transformerNotationHighlight,
  updateStyle
} from './src/plugins/shiki-transformers.ts'
import config from './src/site.config.ts'

const platform = process.env.DEPLOYMENT_PLATFORM || 'vercel'
const isCloudflare = platform === 'cloudflare'
const isGithubPages = platform === 'github'

/** @param {typeof config} cfg */
function buildRemarkPlugins(cfg) {
  /** @type {import('astro').RemarkPlugins} */
  const remarkPlugins = [remarkMath, remarkGfm, remarkDirective, remarkLuoguBlocks]
  if (cfg.integ.mediumZoom.enable) {
    remarkPlugins.push([remarkAddZoomable, cfg.integ.mediumZoom.options ?? {}])
  }
  remarkPlugins.push(remarkReadingTime)
  return remarkPlugins
}

// https://astro.build/config
export default defineConfig({
  // Top-Level Options
  site: isGithubPages
    ? `https://${config.personal?.domains?.githubPages || 'example.github.io'}/`
    : isCloudflare
      ? `https://${config.personal?.domains?.cloudflare || 'example.pages.dev'}/`
      : `https://${config.personal?.domains?.main || 'example.com'}/`,
  // base: '/docs',
  trailingSlash: 'never',

  // Internationalization
  i18n: {
    locales: ['zh', 'en'],
    defaultLocale: 'zh',
    routing: {
      prefixDefaultLocale: false
    }
  },

  adapter: isGithubPages ? undefined : isCloudflare ? cloudflare() : vercel(),
  output: isGithubPages ? 'static' : isCloudflare ? 'static' : 'server',

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },

  integrations: [
    // astro-axi will automatically add sitemap, mdx & tailwind
    // sitemap(),
    // mdx(),
    // tailwind({ applyBaseStyles: false }),
    AstroAxiIntegration(config),
    // (await import('@playform/compress')).default({
    //   SVG: false,
    //   Exclude: ['index.*.js']
    // }),

    // Temporary fix vercel adapter
    // static build method is not needed
    outputCopier({
      integ: ['sitemap', 'pagefind']
    })
  ],
  // root: './my-project-directory',

  // Prefetch Options
  prefetch: true,
  // Server Options
  server: {
    host: true
  },
  build: {
    inlineStylesheets: 'auto'
  },
  compressHTML: true,
  // Markdown Options
  markdown: {
    processor: unified({
      remarkPlugins: buildRemarkPlugins(config),
      rehypePlugins: [
        rehypeLuoguBlocks,
        rehypeHeadingIds,
        [rehypeKatex, { strict: 'ignore' }],
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'append',
            properties: { className: ['anchor'] },
            content: { type: 'text', value: '#' }
          }
        ],
        [
          rehypeExternalLinks,
          {
            content: { type: 'text', value: config.content?.externalLinksContent || ' ↗' },
            target: '_blank',
            rel: ['nofollow', 'noopener', 'noreferrer']
          }
        ]
      ],
      remarkRehype: {
        footnoteLabel: '脚注',
        footnoteBackLabel: '返回内容',
        footnoteBackContent: '↑'
      }
    }),
    // https://docs.astro.build/en/guides/syntax-highlighting/
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      langAlias: {
        nginx: 'ini', // 或尝试 'ini', 'config'
      },
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        updateStyle(),
        addTitle(),
        addLanguage(),
        addCopyButton(2000)
      ]
    }
  }
})
