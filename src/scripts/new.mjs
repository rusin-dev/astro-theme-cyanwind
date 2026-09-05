/**
 * Create a new post in the content directory
 *
 * Usage: pnpm new [options] <post-title>
 *
 * Options:
 *   -l, --lang <zh|en|all>  Set the language (default: zh; all means both zh and en)
 *   -d, --draft             Create a draft post (default: false)
 *   -m, --mdx               Use MDX format (default: false)
 *   -h, --help [en]         Show this help message; add "en" to show English
 *
 * Example:
 *   pnpm new "你好，世界"
 *   pnpm new -l en "Hello World"
 *   pnpm new -l all "Hello World"
 */

import fs from 'node:fs'
import path from 'node:path'

import minimist from './libs/minimist.cjs'
import slugify from './libs/slugify.cjs'

function getDate() {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Month is 0-based
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function getPostSlug(postTitle) {
  let slug = slugify(postTitle).toLocaleLowerCase()
  if (slug === '') {
    slug = 'untitled'
  }
  return slug
}

function buildContent({ title, draft, language }) {
  return `---
title: ${title}
description: Write your description here.
publishDate: ${getDate()}
${draft ? 'draft: true\n' : ''}${language ? `language: ${language}\n` : ''}tags: [tag1, tag2]
---

Write your content here.
`
}

const HELP_INFO = `用法: pnpm new [选项] <文章标题>

选项（均可选）:
new
  默认: 创建中文文章
  -l, --lang <zh|en|all>   设置文章语言（默认: zh;all 表示中文和英文都有）
  -d, --draft              创建草稿（默认: false）
  -m, --mdx                使用 MDX 格式（默认: false）
"title"
  -h, --help [en]          显示此帮助信息;后面加 en 参数显示英文版

生成位置:
  中文:   src/content/blogs/<slug>/index.md
  英文:   src/content/blogs/<slug>/index-en.md
  all:    同时生成上述中文和英文两份

示例:
  pnpm new "你好，世界"           # 中文文章
  pnpm new -l en "Hello World"   # 英文文章
  pnpm new -l all "Hello World"  # 中英文都有
  pnpm new -m "MDX Post"         # 使用 MDX 格式
`
const HELP_INFO_EN = `Usage: pnpm new [options] <post-title>

Options (all optional):
new
  Default: create a Chinese post
  -l, --lang <zh|en|all>   Set the language (default: zh; all means both zh and en)
  -d, --draft              Create a draft post (default: false)
  -m, --mdx                Use MDX format (default: false)
"title"
  -h, --help [en]          Show this help message; add "en" to display English

Generated files:
  Chinese:  src/content/blogs/<slug>/index.md
  English:  src/content/blogs/<slug>/index-en.md
  all:      generate both the Chinese and English files above

Examples:
  pnpm new "你好，世界"           # Chinese post
  pnpm new -l en "Hello World"   # English post
  pnpm new -l all "Hello World"  # Both languages
  pnpm new -m "MDX Post"         # Use MDX format
`
const TARGET_DIR = 'src/content/blogs/'
const LANGS = ['zh', 'en', 'all']

export default function main(args) {
  const parsedArgs = minimist(args, {
    string: ['lang'],
    boolean: ['draft', 'mdx', 'help'],
    default: {
      lang: 'zh',
      draft: false,
      mdx: false
    },
    alias: {
      l: 'lang',
      d: 'draft',
      m: 'mdx',
      h: 'help'
    }
  })

  if (parsedArgs.help) {
    const isEn = parsedArgs.lang === 'en' || parsedArgs._.includes('en')
    console.log(isEn ? HELP_INFO_EN : HELP_INFO)
    process.exit(0)
  }

  const lang = LANGS.includes(parsedArgs.lang) ? parsedArgs.lang : 'zh'
  const postTitle = parsedArgs._.join(' ').trim()
  const title = postTitle || 'Untitled'
  console.log('Creating new post:', title)

  const ext = parsedArgs.mdx ? '.mdx' : '.md'
  const slug = getPostSlug(title)
  const dirPath = path.join(TARGET_DIR, slug)
  const targets =
    lang === 'all' ? [{ name: 'index', language: 'zh' }, { name: 'index-en', language: 'en' }]
    : lang === 'en' ? [{ name: 'index-en', language: 'en' }]
    : [{ name: 'index', language: 'zh' }]

  const created = []
  for (const { name, language } of targets) {
    const fullPath = path.join(dirPath, `${name}${ext}`)
    if (fs.existsSync(fullPath)) {
      console.error(`ERROR: File ${fullPath} already exists`)
      process.exit(1)
    }
    fs.mkdirSync(dirPath, { recursive: true })
    fs.writeFileSync(fullPath, buildContent({ title, draft: parsedArgs.draft, language }))
    created.push(fullPath)
  }

  created.forEach((fullPath) => console.log(`Post created at ${fullPath}`))
}