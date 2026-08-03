import { D as maybeRenderHead, O as renderHead, V as createAstro, c as renderComponent, g as renderTemplate, k as addAttribute, n as defineStyleVars, p as renderSlot, u as Fragment, z as unescapeHTML } from "./server_BvovAKAK.mjs";
import { a as createComponent } from "./_astro_assets_DPhqHtnZ.mjs";
import { b as renderScript, h as $$Icon, t as getRelativeLocaleUrl } from "./i18n_UusxS-i0.mjs";
import { i as getUniqueCategories, t as getBlogCollection } from "./server_DMJrJHOC.mjs";
import { t as config } from "./site.config_BT70j0O1.mjs";
//#region src/assets/styles/global.css?inline
var global_default = "html{scroll-behavior:smooth;font-family:JetBrainsMono,Century Gothic,sans-serif}html.dark{color-scheme:dark}@keyframes fade-in-up{0%{opacity:0;transform:translateY(2rem)}to{opacity:1;transform:translateY(0)}}.animate{opacity:0;animation:.3s forwards fade-in-up}@media (prefers-reduced-motion){.animate{opacity:0;animation:.1s forwards fade-in-up}}#content-header{animation-delay:50ms}#content{animation-delay:.1s}#sidebar{animation-delay:.15s}span.katex-display{padding:.5rem;overflow-y:scroll}.astro-code{border-radius:.5rem;margin-top:.5rem;margin-bottom:.5rem;background-color:var(--tw-prose-pre-bg)!important;& pre{background:0 0;margin:0;padding-inline:0;overflow-x:scroll;& code{counter-reset:step;counter-increment:step 0;width:fit-content;min-width:100%;min-height:1.5rem;display:block;&:before{inset-inline-start:0;content:\"\";background-color:hsl(var(--muted) / var(--tw-bg-opacity,1));z-index:1;width:2.75rem;display:block;position:absolute;top:.857143em;bottom:0}& .line{padding-inline-end:3rem;&:before{content:counter(step);counter-increment:step;color:hsl(var(--muted-foreground) / .6);background-color:hsl(var(--muted) / var(--tw-bg-opacity,1));box-sizing:content-box;z-index:2;justify-content:end;width:2rem;padding-inline-end:.75rem;display:inline-flex;position:sticky;inset-inline-start:0}&:last-child:empty,&:last-child:has(>span:empty:only-child){display:none}}}}&:has(code){position:relative}&:has(div.title){padding-top:2rem;& code:before{top:calc(2rem + .857143em)}}& button.copy{& .success:before{content:\"Copied!\";color:hsl(var(--muted-foreground) / var(--tw-text-opacity,1));background-color:hsl(var(--primary-foreground) / var(--tw-bg-opacity,1));border:1px solid hsl(var(--border) / var(--tw-border-opacity,1));border-radius:.25rem;justify-content:center;align-items:center;margin-right:.5rem;padding:.5rem;font-size:.75rem;display:flex;position:absolute;top:0;bottom:0;right:100%}&.copied{& .success{display:block}& .ready{display:none}}}&:hover{& button.copy{opacity:1}& .language{opacity:0}}& .highlighted,& .diff{min-width:100%;display:inline-block}& .highlighted,& .highlighted:before{background-color:#95a6b752!important}& .diff{&.remove{background-color:#f43f5e29;&:before{content:\"-\";background-color:#f43f5e29}}&.add{background-color:#10b98129;&:before{content:\"+\";background-color:#10b98129}}}}.dark{& .astro-code pre span{color:var(--shiki-dark)!important}}:root{--scrollbar-width:6px;--scrollbar-bg:#e0e0e0;--scrollbar-thumb-bg:silver}html.dark{--scrollbar-bg:#2e2e2e;--scrollbar-thumb-bg:#4e4e4e}body::-webkit-scrollbar{height:0}::-webkit-scrollbar{background:0 0;width:6px!important;height:6px!important}::-webkit-scrollbar-thumb{background-color:var(--scrollbar-thumb-bg);border:2px solid var(--scrollbar-thumb-bg);opacity:.5;border-radius:999px}::-webkit-scrollbar-corner{background:0 0}::-webkit-scrollbar-track{background:0 0}sup{font-size:.65em}.footnotes{border-top:1px solid hsl(var(--border));margin-top:2rem;padding-top:1rem;font-size:.875em}.footnotes ol{padding-left:1.5rem}.footnotes li{margin-bottom:.5rem}.footnotes p{margin-bottom:.25rem}.footnotes a[href^=\\#fnref]{opacity:.6;margin-left:.5rem;font-size:.75em;text-decoration:none}.footnotes a[href^=\\#fnref]:hover{opacity:1}#wl-edit{background:url(https://image.rusin7.com/file/Mjo1bViM.gif) 100% 100%/25% no-repeat!important;padding:20px!important}@media (width<=768px){#wl-edit{background-size:35%!important}}#wl-edit{border:1px solid #333!important;border-radius:16px!important;line-height:1.4!important}#wl-edit:focus{background-image:none}";
//#endregion
//#region src/components/BaseHead.astro
createAstro("https://blog.rusin7.com/");
var $$BaseHead = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BaseHead;
	const isEnglish = Astro.url.pathname.includes("/en");
	const { articleDate, description, ogImage, title } = Astro.props;
	const mappedTitle = {
		"关于": {
			zh: "关于",
			en: "About"
		},
		"博客": {
			zh: "博客",
			en: "Blog"
		},
		"项目": {
			zh: "项目",
			en: "Projects"
		},
		"链接": {
			zh: "链接",
			en: "Links"
		},
		"首页": {
			zh: "首页",
			en: "Home"
		},
		"赞助": {
			zh: "赞助",
			en: "Sponsorship"
		},
		"标签": {
			zh: "标签",
			en: "Tags"
		},
		"分类": {
			zh: "分类",
			en: "Categories"
		},
		"归档": {
			zh: "归档",
			en: "Archive"
		}
	}[title];
	const displayTitle = mappedTitle ? isEnglish ? mappedTitle.en : mappedTitle.zh : title;
	const displaySiteTitle = isEnglish ? config.titleEn : config.title;
	const pathname = Astro.url.pathname;
	const siteTitle = pathname === "/" || pathname === "/en" || pathname === "/en/" ? displaySiteTitle : `${displayTitle} ${config.titleDelimiter} ${displaySiteTitle}`;
	const canonicalURL = new URL(Astro.url.pathname, Astro.site);
	const socialImageURL = new URL(ogImage ? ogImage : "/images/social-card.webp", Astro.url).href;
	return renderTemplate`<meta charset="utf-8"> <meta content="width=device-width, initial-scale=1.0, shrink-to-fit=no" name="viewport"> <meta content="IE=edge" http-equiv="X-UA-Compatible"> <title>${siteTitle}</title>  <link rel="apple-touch-icon" sizes="180x180" href="/favicon/favicon.ico"> <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon.ico"> <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon.ico"> <link rel="manifest" href="/favicon/site.webmanifest">  <link rel="preconnect" href="https://cdn.jsdmirror.cn" crossorigin> <link rel="stylesheet" href="https://cdn.jsdmirror.cn/npm/lxgw-wenkai-webfont@1.7.0/lxgwwenkai-regular.min.css"> <link rel="stylesheet" href="https://cdn.jsdmirror.cn/npm/lxgw-wenkai-webfont@1.7.0/lxgwwenkai-bold.min.css"> <link rel="preload" href="/fonts/JetBrainsMono-Regular.woff2" as="font" type="font/woff2" crossorigin>  <link rel="canonical"${addAttribute(canonicalURL, "href")}>  <meta${addAttribute(siteTitle, "content")} name="title"> <meta${addAttribute(description, "content")} name="description"> <meta${addAttribute(config.author, "content")} name="author">  <meta content="" name="theme-color">  <meta${addAttribute(articleDate ? "article" : "website", "content")} property="og:type"> <meta${addAttribute(displayTitle, "content")} property="og:title"> <meta${addAttribute(description, "content")} property="og:description"> <meta${addAttribute(canonicalURL, "content")} property="og:url"> <meta${addAttribute(displaySiteTitle, "content")} property="og:site_name">  <meta${addAttribute(isEnglish ? "en_US" : config.locale.attrs, "content")} property="og:locale"> <meta${addAttribute(socialImageURL, "content")} property="og:image"> <meta content="1200" property="og:image:width"> <meta content="630" property="og:image:height"> ${articleDate && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` <meta${addAttribute(config.author, "content")} property="article:author"> <meta${addAttribute(articleDate, "content")} property="article:published_time"> ` })}`}  <meta content="summary_large_image" property="twitter:card"> <meta${addAttribute(canonicalURL, "content")} property="twitter:url"> <meta${addAttribute(displayTitle, "content")} property="twitter:title"> <meta${addAttribute(description, "content")} property="twitter:description"> <meta${addAttribute(socialImageURL, "content")} property="twitter:image">  <link href="/sitemap-index.xml" rel="sitemap">  <link rel="alternate" type="application/rss+xml"${addAttribute(displaySiteTitle, "title")}${addAttribute(`${Astro.site}rss.xml`, "href")}> <meta${addAttribute(Astro.generator, "content")} name="generator">  <style>${unescapeHTML(global_default)}</style>  <!-- <ClientRouter /> --> <!-- <script is:inline>
  const style = document.createElement('style')
  style.textContent = \`* { transition: none !important; }\`
  document.addEventListener('astro:after-swap', () => {
    document.head.appendChild(style)
    setTimeout(() => {
      style.remove()
    }, 100)
  })
<\/script> --> ${renderTemplate`${renderScript($$result, "C:/Users/22790/astro-blog2/src/components/BaseHead.astro?astro&type=script&index=0&lang.ts")}`}`;
}, "C:/Users/22790/astro-blog2/src/components/BaseHead.astro", void 0);
//#endregion
//#region src/components/basic/Footer.astro
createAstro("https://blog.rusin7.com/");
var $$Footer = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Footer;
	const year = (/* @__PURE__ */ new Date()).getFullYear();
	const footerConf = config.footer || {};
	const isEnglish = Astro.url.pathname.split("/").filter(Boolean)[0] === "en";
	const labels = {
		copyright: isEnglish ? "©" : "©",
		author: isEnglish ? config.author_en || config.author : config.author,
		sitePolicy: isEnglish ? "Site Policy" : "网站政策",
		themePowered: isEnglish ? "theme powered" : "主题驱动"
	};
	const socialLinks = {
		...footerConf.social || {},
		rss: "/rss.xml"
	};
	return renderTemplate`${maybeRenderHead($$result)}${renderScript($$result, "C:/Users/22790/astro-blog2/src/components/basic/Footer.astro?astro&type=script&index=0&lang.ts")} <footer class="mx-auto mb-5 mt-16"> <div class="border-t border-border pt-5"> <div class="flex items-center gap-y-3 max-sm:flex-col sm:justify-between sm:gap-y-0"> <div class="flex items-center gap-x-4 gap-y-2 text-muted-foreground max-sm:flex-col [&amp;_a:hover]:text-primary [&amp;_a]:text-foreground"> ${footerConf.registration && footerConf.registration.website && renderTemplate`<a id="icp-registration" class="hidden text-xs"${addAttribute(footerConf.registration.website, "data-website")} style="color:hsl(var(--muted-foreground)/var(--tw-text-opacity,1))"${addAttribute(footerConf.registration.url, "href")} target="_blank"> ${footerConf.registration.text} </a>`} <span class="[&amp;_a]:underline [&amp;_a]:decoration-muted-foreground/60 [&amp;_a]:underline-offset-2 [&amp;_a:hover]:text-primary [&amp;_a:hover]:decoration-primary"> ${labels.copyright} ${year} ${labels.author} &
<a href="/terms/list">${labels.sitePolicy}</a> </span> ${footerConf.credits && renderTemplate`<span class="text-muted-foreground [&amp;_a]:underline [&amp;_a]:decoration-muted-foreground/60 [&amp;_a]:underline-offset-2 [&amp;_a:hover]:text-primary [&amp;_a:hover]:decoration-primary"> <a href="https://github.com/withastro/astro" target="_blank">
Astro
</a>  ${labels.themePowered} </span>`} </div>  <div class="flex items-center gap-x-4"> ${Object.entries(socialLinks).map(([platform, url]) => renderTemplate`<a class="inline-block text-muted-foreground transition-all hover:text-muted-foreground/75"${addAttribute(url, "href")}${addAttribute(platform, "aria-label")}> ${renderComponent($$result, "Icon", $$Icon, { "name": platform })} </a>`)} </div> </div> </div> </footer>`;
}, "C:/Users/22790/astro-blog2/src/components/basic/Footer.astro", void 0);
//#endregion
//#region src/components/user/LanguageSwitch.astro
createAstro("https://blog.rusin7.com/");
var $$LanguageSwitch = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$LanguageSwitch;
	const currentLocale = Astro.currentLocale || "zh";
	const languages = {
		zh: "English",
		en: "中文"
	};
	const safeCurrentLocale = currentLocale === "zh" || currentLocale === "en" ? currentLocale : "zh";
	const targetLocale = safeCurrentLocale === "zh" ? "en" : "zh";
	const linkhover = targetLocale === "zh" ? "切换到中文" : "Switch to English";
	const currentPath = Astro.url.pathname;
	let pagePath = "";
	if (safeCurrentLocale === "en") {
		if (currentPath === "/en") pagePath = "/";
		else if (currentPath.startsWith("/en/")) pagePath = currentPath.slice(3) || "/";
		else pagePath = currentPath;
	} else if (safeCurrentLocale === "zh") pagePath = currentPath;
	else pagePath = currentPath;
	let targetUrl = getRelativeLocaleUrl(targetLocale, pagePath);
	if (targetUrl !== "/" && targetUrl.endsWith("/")) targetUrl = targetUrl.slice(0, -1);
	return renderTemplate`${maybeRenderHead($$result)}<button id="language-switch-btn" class="box-content rounded-md border p-1.5 transition-colors hover:bg-border md:group-[.not-top]:rounded-xl"${addAttribute(linkhover, "title")}${addAttribute(targetUrl, "data-target-url")}> <span class="sr-only">${linkhover}</span> <div class="flex items-center gap-1"> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "earth",
		"class": "size-4"
	})} <span class="text-xs font-medium">${languages[safeCurrentLocale]}</span> </div> </button> ${renderScript($$result, "C:/Users/22790/astro-blog2/src/components/user/LanguageSwitch.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/22790/astro-blog2/src/components/user/LanguageSwitch.astro", void 0);
//#endregion
//#region src/components/basic/Header.astro
createAstro("https://blog.rusin7.com/");
var $$Header = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Header;
	const isEnglish = Astro.url.pathname.split("/").filter(Boolean)[0] === "en";
	const allCollections = await getBlogCollection();
	const allCategories = getUniqueCategories(allCollections);
	const categoryMap = {
		"tech": {
			zh: "技术",
			en: "Technical"
		},
		"life": {
			zh: "生活",
			en: "Daily Life"
		},
		"solution": {
			zh: "题解",
			en: "Solution"
		},
		"ccf": {
			zh: "信奥",
			en: "IT"
		}
	};
	const categories = [
		"tech",
		"ccf",
		"life",
		"solution"
	].filter((cat) => allCategories.includes(cat)).map((cat) => ({
		slug: cat,
		name: isEnglish ? categoryMap[cat].en : categoryMap[cat].zh
	}));
	function getLocalizedUrl(locale, path) {
		let url = getRelativeLocaleUrl(locale || "zh", path);
		if (url !== "/" && url.endsWith("/")) url = url.slice(0, -1);
		return url;
	}
	return renderTemplate`${renderComponent($$result, "header-component", "header-component", { "class": "group sticky top-4 z-30 mb-12 flex items-center justify-between rounded-xl border border-transparent max-sm:py-1 sm:rounded-2xl [&.not-top]:border-border [&.not-top]:bg-background/60 [&.not-top]:px-1.5 [&.not-top]:backdrop-blur-md dark:[&.not-top]:bg-muted/60 astro-pwkpui7g" }, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<a class="z-30 text-xl font-semibold group-[.not-top]:ms-2 sm:group-[.not-top]:ms-3 astro-pwkpui7g" style="transition:margin-inline 0.3s"${addAttribute(getLocalizedUrl(Astro.currentLocale, "/"), "href")} aria-label="Brand">${isEnglish ? config.titleEn : config.title}</a> <div class="flex items-center gap-x-2 astro-pwkpui7g">  <div id="headerExpandConetent" class="end-0 start-0 top-12 grid border border-transparent group-[.not-top]:rounded-xl group-[.expanded]:opacity-100 dark:group-[.expanded.not-top]:bg-muted/60 max-md:absolute max-md:opacity-0 max-md:pointer-events-none max-md:group-[.expanded]:pointer-events-auto max-md:group-[.not-top]:border-border max-md:group-[.expanded.not-top]:bg-background/60 max-md:group-[.expanded.not-top]:backdrop-blur-md max-md:group-[.not-top]:px-4 max-md:group-[.not-top]:py-2 md:grid-rows-1 astro-pwkpui7g"> <div class="flex flex-col items-center justify-center md:flex-row astro-pwkpui7g"> ${(config.header?.menu || []).map((item) => {
		const displayTitle = isEnglish ? item.titleEn || item.title : item.title;
		if (item.link === "/article" && categories.length > 0) return renderTemplate`<div class="menu-item-with-dropdown relative w-full md:w-fit astro-pwkpui7g" style="position: relative;"> <a${addAttribute(getLocalizedUrl(Astro.currentLocale, item.link), "href")} class="blog-menu-link flex w-full flex-none items-center justify-end py-2 font-medium transition-none hover:text-primary md:px-3 md:justify-center astro-pwkpui7g" aria-label="Nav menu item"> ${displayTitle} ${renderComponent($$result, "Icon", $$Icon, {
			"name": "chevron-down",
			"class": "chevron-icon ml-1 size-4 transition-transform astro-pwkpui7g"
		})} </a>  <div class="dropdown-menu absolute right-0 top-full mt-0 w-48 rounded-xl border border-border bg-background/80 shadow-lg backdrop-blur-md dark:bg-muted/80 md:left-0 md:right-auto astro-pwkpui7g" style="z-index: 9999;"> <div class="py-1 astro-pwkpui7g"> ${categories.map((category) => renderTemplate`<a${addAttribute(getLocalizedUrl(Astro.currentLocale, `/article/${category.slug}`), "href")} class="category-link block px-4 py-2 text-sm transition-colors hover:bg-background/60 hover:text-primary dark:hover:bg-muted/60 astro-pwkpui7g"> ${category.name} </a>`)} </div> </div> </div>`;
		return renderTemplate`<a${addAttribute(getLocalizedUrl(Astro.currentLocale, item.link), "href")} class="w-full flex-none grow py-2 text-right font-medium transition-none hover:text-primary md:w-fit md:px-3 astro-pwkpui7g" aria-label="Nav menu item"> ${displayTitle} </a>`;
	})} <a class="w-full flex-none grow py-2 text-right font-medium transition-none hover:text-primary md:w-fit md:px-3 astro-pwkpui7g" href="https://www.travellings.cn/go.html" title="Travellings" target="_blank" rel="noopener noreferrer"> <span class="sr-only astro-pwkpui7g">Travellings</span> <span class="text-xl astro-pwkpui7g">🚇</span> </a> <div class="flex w-full grow flex-row justify-end gap-x-3 md:w-fit md:gap-x-5 astro-pwkpui7g"> <a class="px-1 py-2 transition-none md:px-2 astro-pwkpui7g"${addAttribute(getLocalizedUrl(Astro.currentLocale, "/search"), "href")} title="Search"> <span class="sr-only astro-pwkpui7g">Search</span> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "search",
		"class": "size-5 astro-pwkpui7g"
	})} </a> </div> </div> </div> <!-- buttons --> <div class="z-30 flex gap-x-4 group-[.not-top]:gap-x-2 astro-pwkpui7g" style="transition:gap 0.3s"> ${renderComponent($$result, "LanguageSwitch", $$LanguageSwitch, { "class": "astro-pwkpui7g" })} <button id="toggleDarkMode" class="group/dark box-content size-5 rounded-md border p-1.5 transition-colors hover:bg-border md:group-[.not-top]:rounded-xl astro-pwkpui7g"> <span class="sr-only astro-pwkpui7g">Dark Theme</span> ${renderComponent($$result, "Icon", $$Icon, {
		"class": "system size-5 group-hover/dark:text-primary astro-pwkpui7g",
		"name": "computer"
	})} ${renderComponent($$result, "Icon", $$Icon, {
		"class": "light hidden size-5 group-hover/dark:text-primary astro-pwkpui7g",
		"name": "sun"
	})} ${renderComponent($$result, "Icon", $$Icon, {
		"class": "dark hidden size-5 group-hover/dark:text-primary astro-pwkpui7g",
		"name": "moon"
	})} </button> <button id="toggleMenu" class="rounded-md border p-1.5 transition-colors hover:bg-border md:hidden md:group-[.not-top]:rounded-xl astro-pwkpui7g"> <span class="sr-only astro-pwkpui7g">Menu</span> ${renderComponent($$result, "Icon", $$Icon, {
		"class": "size-5 astro-pwkpui7g",
		"name": "menu"
	})} </button> </div> </div> ` })}  <script>
  const toggleDarkModeElement = document.getElementById('toggleDarkMode')
  if (toggleDarkModeElement) {
    toggleDarkModeElement.dataset.theme = localStorage.getItem('theme') || 'system'
  }
<\/script> ${renderScript($$result, "C:/Users/22790/astro-blog2/src/components/basic/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/22790/astro-blog2/src/components/basic/Header.astro", void 0);
//#endregion
//#region src/components/basic/ThemeProvider.astro
var $$ThemeProvider = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate` <script>
  function simpleSetTheme() {
    let theme = localStorage.getItem('theme')
    // If undefined or 'system', get from system
    if (!theme || theme === 'system') {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0B0B10' : '#FCFCFD')
  }
  simpleSetTheme()
  document.addEventListener('astro:page-load', () => simpleSetTheme())
<\/script> ${renderScript($$result, "C:/Users/22790/astro-blog2/src/components/basic/ThemeProvider.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/22790/astro-blog2/src/components/basic/ThemeProvider.astro", void 0);
//#endregion
//#region src/layouts/BaseLayout.astro
createAstro("https://blog.rusin7.com/");
var $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BaseLayout;
	const { meta: { articleDate, description = config.description, ogImage, title }, highlightColor } = Astro.props;
	const langAttr = (Astro.currentLocale || "zh") === "en" ? "en" : "zh";
	const $$definedVars = defineStyleVars([{ highlightColor }]);
	return renderTemplate`<html${addAttribute(langAttr, "lang")}${addAttribute($$definedVars, "style")} class="astro-z4jru4n3"> <head>${renderComponent($$result, "BaseHead", $$BaseHead, {
		"articleDate": articleDate,
		"description": description,
		"ogImage": ogImage,
		"title": title,
		"class": "astro-z4jru4n3"
	})}${renderComponent($$result, "ThemeProvider", $$ThemeProvider, { "class": "astro-z4jru4n3" })}${renderHead($$result)}</head> <body class="flex justify-center bg-background astro-z4jru4n3"${addAttribute($$definedVars, "style")}> <!-- <div
      id='gradient-background'
      class='pointer-events-none fixed h-screen w-screen blur-2xl transition-opacity duration-1000'
    >
      <div
        class='absolute right-[25%] top-[-90%] h-full w-[75%] rounded-full bg-gradient-to-b from-blue-300 via-pink-300 to-transparent opacity-40 dark:opacity-25'
      >
      </div>
      <div
        class='absolute left-[25%] top-[-90%] h-full w-[75%] rounded-full bg-gradient-to-b from-blue-300 via-pink-300 to-transparent opacity-40 dark:opacity-25'
      >
      </div>
      <div
        class='absolute right-[25%] top-[-85%] h-full w-[55%] rounded-full bg-gradient-to-b from-purple-300 via-blue-300 to-transparent opacity-40 dark:opacity-25'
      >
      </div>
      <div
        class='absolute left-[25%] top-[-85%] h-full w-[55%] rounded-full bg-gradient-to-b from-indigo-300 via-orange-300 to-transparent opacity-40 dark:opacity-25'
      >
      </div>
      <div
        class='absolute left-[-25%] top-[-75%] h-full w-[65%] rounded-full bg-gradient-to-b from-blue-300 via-pink-300 to-transparent opacity-30 dark:opacity-20'
      >
      </div>
      <div
        class='absolute right-[-25%] top-[-75%] h-full w-[65%] rounded-full bg-gradient-to-b from-purple-300 via-blue-300 to-transparent opacity-30 dark:opacity-20'
      >
      </div>
      <div
        class='absolute left-[-30%] top-[-85%] h-full w-[85%] rounded-full bg-gradient-to-b from-indigo-300 via-orange-300 to-transparent opacity-60 dark:opacity-30'
      >
      </div>
      <div
        class='absolute right-[-30%] top-[-85%] h-full w-[85%] rounded-full bg-gradient-to-b from-orange-300 via-indigo-300 to-transparent opacity-60 dark:opacity-30'
      >
      </div>
    </div> --> ${highlightColor && renderTemplate`<div id="highlight-gradient" class="pointer-events-none absolute start-0 top-0 z-0 h-screen w-full opacity-25 astro-z4jru4n3"${addAttribute(`${`background-image:linear-gradient(${highlightColor},transparent)`}; ${$$definedVars}`, "style")}></div>`} <div class="w-full max-w-[70rem] px-4 sm:px-7 lg:px-10 astro-z4jru4n3"${addAttribute($$definedVars, "style")}> ${renderComponent($$result, "Header", $$Header, { "class": "astro-z4jru4n3" })} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, { "class": "astro-z4jru4n3" })} </div>   ${renderScript($$result, "C:/Users/22790/astro-blog2/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts")}<!-- <script>
      document.addEventListener('DOMContentLoaded', () => {
        const originalTitle = document.title
        document.addEventListener('visibilitychange', () => {
          if (document.hidden) {
            document.title = 'ฅ^•ﻌ•^ฅ 主人快回来吧~'
          } else {
            document.title = originalTitle
          }
        })
        window.addEventListener('blur', () => {
          document.title = 'ฅ^•ﻌ•^ฅ 主人快回来吧~'
        })
        window.addEventListener('focus', () => {
          document.title = originalTitle
        })
      })
    <\/script> --> ${renderScript($$result, "C:/Users/22790/astro-blog2/src/layouts/BaseLayout.astro?astro&type=script&index=1&lang.ts")}${renderScript($$result, "C:/Users/22790/astro-blog2/src/layouts/BaseLayout.astro?astro&type=script&index=2&lang.ts")}</body> </html>`;
}, "C:/Users/22790/astro-blog2/src/layouts/BaseLayout.astro", void 0);
//#endregion
export { $$BaseLayout as t };
