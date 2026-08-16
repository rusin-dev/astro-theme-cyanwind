# Astro Theme CyanWind

![CyanWind](https://img.shields.io/badge/astro--theme-cyanwind-cyan?style=flat-square)
![Version](https://img.shields.io/badge/version-2.0.0-blue?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

A modern, feature-rich Astro theme designed for personal blogs and content creation. Built with Astro, Tailwind CSS, and TypeScript for an optimal developer experience.

**Live Demo:** [https://blog.rusin7.com](https://blog.rusin7.com)

**Author:** 如形 (Rusin) | [GitHub](https://github.com/ruying-suixing)

---

## ✨ Features

- **🚀 Performance First** - Built on Astro for blazing-fast static site generation
- **🎨 Beautiful Design** - Clean, modern UI with dark mode support powered by Tailwind CSS
- **📝 MDX Support** - Write content using Markdown with embedded components
- **🔍 Full-Text Search** - Built-in search functionality with Pagefind
- **💬 Comments System** - Integrated Waline comment system
- **📊 Blog Statistics** - Track your writing statistics over time
- **🏷️ Tags & Categories** - Organize content with tags and academic categories
- **🔗 Friend Links** - Showcase and manage friend links
- **📱 Responsive Design** - Fully responsive across all devices
- **🌐 Multi-language Support** - Support for both Chinese and English
- **📱 Social Sharing** - Share articles on Weibo, X, and Bluesky
- **🎯 SEO Optimized** - Sitemap, RSS feed, and structured data
- **⚡ Image Optimization** - Automatic image optimization with Sharp
- **🧮 Math Support** - KaTeX support for mathematical formulas
- **🎀 Customizable** - Easily configurable theme settings

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ruying-suixing/astro-blog.git
   cd astro-blog
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure your site**
   
   Edit `src/site.config.ts` to customize:
   - Site title and author information
   - Navigation menu
   - Personal information and social links
   - Theme settings and integrations

4. **Start development server**
   ```bash
   pnpm dev
   ```

   Visit `http://localhost:3000` to see your site

5. **Build for production**
   ```bash
   pnpm build
   ```

---

## 📖 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with auto-reload |
| `pnpm dev:force` | Force restart development server |
| `pnpm dev:check` | Dev server with TypeScript checking |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm check` | Run TypeScript type checking |
| `pnpm lint` | Lint and fix code style |
| `pnpm format` | Format code with Prettier |
| `pnpm quality` | Run linting, formatting, and type checking |
| `pnpm sync` | Sync Astro content collections |
| `pnpm clean` | Clean build artifacts |

---

## 🛠️ Configuration

### Main Configuration File: `src/site.config.ts`

#### Basic Settings
```typescript
export const theme: ThemeUserConfig = {
  title: "Your Blog Title",
  author: "Your Name",
  description: "Your blog description",
  favicon: "/favicon/favicon.ico",
  locale: { /* language and date settings */ }
}
```

#### Navigation Menu
```typescript
header: {
  menu: [
    { title: '文章', titleEn: 'Articles', link: '/article' },
    { title: '学术', titleEn: 'Academic', link: '/academic' },
    // Add more menu items...
  ]
}
```

#### Integration Features
```typescript
export const integ: IntegrationUserConfig = {
  pagefind: true,      // Enable search
  waline: { enable: true }, // Enable comments
  // More integrations...
}
```

See `src/site.config.ts` for complete configuration options.

---

## 📁 Project Structure

```
.
├── src/
│   ├── assets/           # Images and static assets
│   ├── components/       # Reusable Astro components
│   ├── content/          # Markdown content files
│   ├── layouts/          # Page layouts
│   ├── pages/            # Route pages
│   ├── schemas/          # Content collection schemas
│   ├── site.config.ts    # Main configuration file
│   └── types/            # TypeScript type definitions
├── public/               # Static files
├── astro.config.mjs      # Astro configuration
├── tailwind.config.mjs   # Tailwind CSS configuration
└── package.json          # Project dependencies
```

---

## 📝 Content Organization

### Blog Articles
Place your blog posts in `src/content/` with the appropriate frontmatter:

```markdown
---
title: "Article Title"
date: 2024-01-01
tags: [tag1, tag2]
description: "Article description"
---

Your content here...
```

### Pages
- **Articles** - Main blog posts (`/article`)
- **Academic** - Academic content (`/academic`)
- **Projects** - Project showcase (`/projects`)
- **Links** - Friend links management (`/links`)
- **About** - About page (`/about`)

---

## 🎨 Customization

### Themes & Styling
- Customize Tailwind CSS in `tailwind.config.mjs`
- Modify component styles in `src/components/`
- Add custom CSS in `src/site.config.ts` via `customCss` option

### Adding Custom Pages
1. Create a new `.astro` or `.md` file in `src/pages/`
2. Use appropriate layout from `src/layouts/`
3. The file will automatically become a route

---

## 🔗 Deployment

This theme supports multiple deployment platforms:

### Vercel
```bash
pnpm build:vercel
```

### Cloudflare Pages
```bash
pnpm build:cloudflare
```

### GitHub Pages
```bash
pnpm build:github
```

### Static Hosting
```bash
pnpm build
# Output in `dist/` directory
```

---

## 🔧 Tech Stack

- **Framework:** [Astro 7.2+](https://astro.build)
- **Styling:** [Tailwind CSS 3](https://tailwindcss.com)
- **Language:** [TypeScript 5](https://www.typescriptlang.org)
- **Content:** MDX with Markdown support
- **Search:** [Pagefind](https://pagefind.app)
- **Comments:** [Waline](https://waline.js.org)
- **Code Highlighting:** [Shiki](https://shiki.matsu.io)
- **Math:** [KaTeX](https://katex.org)
- **Icons:** [Simple Icons](https://simpleicons.org)
- **Image Processing:** [Sharp](https://sharp.pixelplumbing.com)

---

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `astro` | Static site generator |
| `@astrojs/mdx` | MDX integration |
| `tailwindcss` | Utility-first CSS |
| `typescript` | Type safety |
| `@pagefind/default-ui` | Full-text search |
| `@waline/client` | Comment system |
| `shiki` | Syntax highlighting |
| `rehype-katex` | Math formula support |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Comments powered by [Waline](https://waline.js.org)
- Search powered by [Pagefind](https://pagefind.app)

---

## 📞 Support & Contact

- **Author:** 如形 (Rusin)
- **GitHub:** [ruying-suixing](https://github.com/ruying-suixing)
- **Email:** [i@rusin7.com](mailto:i@rusin7.com)
- **Website:** [https://blog.rusin7.com](https://blog.rusin7.com)

---

**Made with ❤️ by Rusin**
