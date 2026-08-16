import { z } from 'astro/zod'

export const HeaderMenuSchema = () =>
  z
    .array(
      z.object({
        title: z.string(),
        titleEn: z.string().optional(), // 新增英文标题
        link: z.string()
      })
    )
    .default([
      { title: '博客', titleEn: 'Blog', link: '/blog' },
      { title: '项目', titleEn: 'Projects', link: '/projects' },
      { title: '链接', titleEn: 'Links', link: '/links' },
      { title: '关于', titleEn: 'About', link: '/about' }
    ])
    .describe('The header menu items for your site.')