declare module 'virtual:config' {
  const Config: import('./user-config').UserConfig
  export default Config
}

declare module 'vfile' {
  interface DataMap {
    astro: {
      headings?: import('mdast').MarkdownHeading[]
      localImagePaths?: string[]
      remoteImagePaths?: string[]
      frontmatter?: Record<string, any>
      relativeUrl?: string
    }
  }
}
