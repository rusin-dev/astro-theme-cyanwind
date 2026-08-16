import type { Language, I18nContent } from './types'

export function getCurrentLanguage(): Language {
  const path = window.location.pathname
  if (path.includes('/en/') || path.endsWith('/en')) {
    return 'en'
  }
  return 'zh'
}

export const i18nContent: Record<Language, I18nContent> = {
  zh: {
    performanceWarning: {
      title: '新版博客发布',
      content: `
        <strong>新版博客已经发布</strong>，从 astro v5 升级到了 astro v7。
        
        <p><a href="https://github.com/rusin-dev/astro-theme-cyanwind">点击前往 github 查看</a></p>
        
        <p style="margin-top: 16px; opacity: 0.8; font-size: 14px;">
          💡 如果您只是访问我的博客，网站仍可正常使用。
        </p>
      `
    },
    button: '我知道了'
  },
  en: {
    performanceWarning: {
      title: 'New Blog Version Released',
      content: `
        <strong>The new blog version has been released</strong>, upgraded from Astro v5 to Astro v7.
        
        <p><a href="https://github.com/rusin-dev/astro-theme-cyanwind">Click here to view on GitHub</a></p>
        
        <p style="margin-top: 16px; opacity: 0.8; font-size: 14px;">
          💡 If you are just visiting my blog, the site will still work as usual.
        </p>
      `
    },
    button: 'Got it'
  }
}