import type { CardListData, Config, IntegrationUserConfig, ThemeUserConfig } from './types'

export const theme: ThemeUserConfig = {
  // === Basic configuration ===
  /** Title for your website. Will be used in metadata and as browser tab title. */
  title: "如形の博客",
  titleEn: 'Rusin\'s Blog',
  /** Will be used in index page & copyright declaration */
  author: '如形',
  authorEn: 'Rusin',
  /** Description metadata for your website. Can be used in page metadata. */
  description: '如形的个人博客，记录学习、科技、生活等内容。',
  descriptionEn: 'Rusin\'s personal blog, recording learning, technology, life and other content.',
  /** The default favicon for your site which should be a path to an image in the `public/` directory. */
  favicon: '/favicon/favicon.ico',
  /** Specify the default language for this site. */
  locale: {
    lang: 'en-US',
    attrs: 'en_US',
    // Date locale
    dateLocale: 'en-US',
    dateOptions: {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }
  },
  /** Set a logo image to show in the homepage. */
  logo: {
    src: 'src/assets/avatar.png',
    alt: 'Avatar'
  },

  // === Global configuration ===
  titleDelimiter: '|',
  prerender: true,
  npmCDN: 'https://cdn.jsdmirror.cn/npm',

  // in test
  head: [],
  customCss: [],

  /** Configure the header of your site. */
  header: {
    menu: [
      { title: '文章', titleEn: 'Articles', link: '/article' },
      { title: '标签', titleEn: 'Tags', link: '/tags' },
      { title: '项目', titleEn: 'Projects', link: '/projects' },
      { title: '友链', titleEn: 'Links', link: '/links' },
      { title: '订阅', titleEn: 'Subscribe', link: '/subscribe' },
      { title: '关于', titleEn: 'About', link: '/about' }
    ]
  },

  /** Configure the footer of your site. */
  footer: {
    // Registration information for ICP (optional)
    registration: {
      // url: '',
      // text: '',
      // website: '' // only show ICP if url === website
    },
    /** Enable displaying a "Astro & Cyanwind powered" link in your site's footer. */
    credits: true,
    /** Optional details about the social media accounts for this site. */
    social: { github: 'https://github.com/ruying-suixing', gitee: 'https://github.com/rusin/astro-theme-cyanwind', luogu: 'https://www.luogu.com.cn/user/1620655', codeforces: 'https://codeforces.com/profile/ruyingsuixing'}
  },

  content: {
    externalLinksContent: ' ↗',
    /** Blog page size for pagination (optional) */
    blogPageSize: 15,
    externalLinkArrow: true, // show external link arrow
    // Currently support weibo, x, bluesky
    share: ['weibo', 'x', 'bluesky']
  },

  /** Personal information configuration */
  personal: {
    /** Your location */
    location: 'China',
    /** Your GitHub username */
    githubUsername: 'ruying-suixing',
    /** Your email address */
    email: 'i@rusin7.com',
    /** Your Google Scholar profile URL */
    googleScholar: '',
    /** Blog start date for statistics */
    blogStartDate: '2026-08-02',
    /** Domain configuration */
    domains: {
      main: 'blog.rusin7.com',
      // githubPages: '',
      // cloudflare: '',
      friendCircle: 'fc.rusin7.com',
    },
  }
}

export const integ: IntegrationUserConfig = {
  links: {
    logbook: [
    ],
    // Yourself link info
    applyTip: [
      { name: 'Name', val: theme.title },
      { name: 'Desc', val: theme.description || 'Null' },
      { name: 'Link', val: `https://${theme.personal?.domains?.main || 'example.com'}` },
      { name: 'Avatar', val: `https://${theme.personal?.domains?.main || 'example.com'}/avatar/avatar.png` }
    ]
  },
  // Enable page search function
  pagefind: true,
  // Add a random quote to the footer (default on homepage footer)
  quote: {
    // https://developer.hitokoto.cn/sentence/#%E8%AF%B7%E6%B1%82%E5%9C%B0%E5%9D%80
    server: 'https://v1.hitokoto.cn/?c=i',
    target: '(data) => data.hitokoto || "Error"'
    // https://github.com/lukePeavey/quotable
    // server: 'https://api.quotable.io/quotes/random?maxLength=60',
    // target: `(data) => data[0].content || 'Error'`
  },
  // Tailwindcss typography
  typography: {
    // https://github.com/tailwindlabs/tailwindcss-typography
    class:
      'break-words prose prose-rusin dark:prose-invert dark:prose-rusin prose-headings:font-medium'
  },
  // A lightbox library that can add zoom effect
  mediumZoom: {
    enable: true, // disable it will not load the whole library
    selector: '.prose .zoomable',
    options: {
      className: 'zoomable'
    }
  },
  // Comment system
  waline: {
    enable: true,
    // Server service link
    server: 'https://comment.rusin7.com/',
    // Refer https://waline.js.org/en/guide/features/emoji.html
    emoji: ['bmoji', 'weibo', 'qq'],
    // Refer https://waline.js.org/en/reference/client/props.html
    additionalConfigs: {
      // search: false,
      pageview: true,
      comment: true,
      locale: {
        reaction0: 'Like',
        placeholder: '来都来了ヾ(≧∇≦*)ゝ，说两句灌灌水💧\n本站支持匿名评论😎\n不过还是建议留下邮箱方便通知你💕'
      },
      imageUploader: false
    }
  }
}

export const terms: CardListData = {
  title: 'Terms content',
  list: [
    {
      title: 'Privacy Policy',
      link: '/terms/privacy-policy'
    },
    {
      title: 'Terms and Conditions',
      link: '/terms/terms-and-conditions'
    },
    {
      title: 'Copyright',
      link: '/terms/copyright'
    },
    {
      title: 'Disclaimer',
      link: '/terms/disclaimer'
    }
  ]
}

const config = { ...theme, integ } as Config
export default config
