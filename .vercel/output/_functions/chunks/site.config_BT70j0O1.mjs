//#region src/site.config.ts
var theme = {
	/** Title for your website. Will be used in metadata and as browser tab title. */
	title: "如形の博客",
	titleEn: "Rusin's Blog",
	/** Will be used in index page & copyright declaration */
	author: "如形",
	author_en: "Rusin",
	/** Description metadata for your website. Can be used in page metadata. */
	description: "如形的个人博客，记录学习、科技、生活等内容。",
	description_en: "Rusin's personal blog, recording learning, technology, life and other content.",
	/** The default favicon for your site which should be a path to an image in the `public/` directory. */
	favicon: "/favicon/favicon.ico",
	/** Specify the default language for this site. */
	locale: {
		lang: "en-US",
		attrs: "en_US",
		dateLocale: "en-US",
		dateOptions: {
			day: "numeric",
			month: "short",
			year: "numeric"
		}
	},
	/** Set a logo image to show in the homepage. */
	logo: {
		src: "src/assets/avatar.png",
		alt: "Avatar"
	},
	titleDelimiter: "|",
	prerender: true,
	npmCDN: "https://cdn.jsdmirror.cn/npm",
	head: [],
	customCss: [],
	/** Configure the header of your site. */
	header: { menu: [
		{
			title: "文章",
			titleEn: "Articles",
			link: "/article"
		},
		{
			title: "学术",
			titleEn: "Academic",
			link: "/academic"
		},
		{
			title: "项目",
			titleEn: "Projects",
			link: "/projects"
		},
		{
			title: "友链",
			titleEn: "Links",
			link: "/links"
		},
		{
			title: "关于",
			titleEn: "About",
			link: "/about"
		}
	] },
	/** Configure the footer of your site. */
	footer: {
		registration: {},
		/** Enable displaying a "Astro & Axi theme powered" link in your site's footer. */
		credits: false,
		/** Optional details about the social media accounts for this site. */
		social: { github: "https://github.com/ruying-suixing/astro-blog" }
	},
	content: {
		externalLinksContent: " ↗",
		/** Blog page size for pagination (optional) */
		blogPageSize: 15,
		externalLinkArrow: true,
		share: [
			"weibo",
			"x",
			"bluesky"
		]
	},
	/** Personal information configuration */
	personal: {
		/** Your location */
		location: "China",
		/** Your GitHub username */
		githubUsername: "ruying-suixing",
		/** Your email address */
		email: "i@rusin7.com",
		/** Your Google Scholar profile URL */
		googleScholar: "",
		/** Blog start date for statistics */
		blogStartDate: "2026-08-02",
		/** Domain configuration */
		domains: {
			main: "blog.rusin7.com",
			friendCircle: "fc.rusin7.com"
		}
	}
};
var integ = {
	links: {
		logbook: [],
		applyTip: [
			{
				name: "Name",
				val: theme.title
			},
			{
				name: "Desc",
				val: theme.description || "Null"
			},
			{
				name: "Link",
				val: `https://${theme.personal?.domains?.main || "example.com"}`
			},
			{
				name: "Avatar",
				val: `https://${theme.personal?.domains?.main || "example.com"}/avatar/avatar.png`
			}
		]
	},
	pagefind: true,
	quote: {
		server: "https://v1.hitokoto.cn/?c=i",
		target: "(data) => data.hitokoto || \"Error\""
	},
	typography: { class: "break-words prose prose-axi dark:prose-invert dark:prose-axi prose-headings:font-medium" },
	mediumZoom: {
		enable: true,
		selector: ".prose .zoomable",
		options: { className: "zoomable" }
	},
	waline: {
		enable: true,
		server: "https://comment.rusin7.com/",
		emoji: [
			"bmoji",
			"weibo",
			"qq"
		],
		additionalConfigs: {
			pageview: true,
			comment: true,
			locale: {
				reaction0: "Like",
				placeholder: "来都来了ヾ(≧∇≦*)ゝ，说两句灌灌水💧\n本站支持匿名评论😎\n不过还是建议留下邮箱方便通知你💕"
			},
			imageUploader: false
		}
	}
};
var terms = {
	title: "Terms content",
	list: [
		{
			title: "Privacy Policy",
			link: "/terms/privacy-policy"
		},
		{
			title: "Terms and Conditions",
			link: "/terms/terms-and-conditions"
		},
		{
			title: "Copyright",
			link: "/terms/copyright"
		},
		{
			title: "Disclaimer",
			link: "/terms/disclaimer"
		}
	]
};
var config = {
	...theme,
	integ
};
//#endregion
export { integ as n, terms as r, config as t };
