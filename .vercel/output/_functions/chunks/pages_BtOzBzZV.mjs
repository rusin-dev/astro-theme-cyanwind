import { A as defineScriptVars, D as maybeRenderHead, V as createAstro, c as renderComponent, g as renderTemplate, k as addAttribute, r as spreadAttributes, u as Fragment } from "./server_BvovAKAK.mjs";
import { a as createComponent, i as $$Image } from "./_astro_assets_DPhqHtnZ.mjs";
import { _ as getFormattedDate, b as renderScript, c as $$FormattedDate, h as $$Icon, t as getRelativeLocaleUrl, u as $$Button, v as cn } from "./i18n_UusxS-i0.mjs";
import { s as renderEntry } from "./server_DMJrJHOC.mjs";
import { t as config } from "./site.config_BT70j0O1.mjs";
import { r as $$QRCode } from "./advanced_DT48yQJJ.mjs";
//#region src/components/pages/ArticleBottom.astro
createAstro("https://blog.rusin7.com/");
var $$ArticleBottom = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ArticleBottom;
	const { id, collections, class: className } = Astro.props;
	const path = Astro.url.pathname.split("/").slice(0, -1).join("/");
	const currentCategory = collections.find((x) => x.id === id)?.data.category;
	let navigationCollections = collections;
	if (currentCategory) navigationCollections = collections.filter((x) => x.data.category === currentCategory);
	const index = navigationCollections.findIndex((x) => x.id === id);
	const prev = navigationCollections[index - 1];
	const next = navigationCollections[index + 1];
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(cn("flex max-sm:flex-col sm:justify-between gap-2", className), "class")}> <span class="min-w-0"> ${prev && renderTemplate`<a${addAttribute(`${path}/${prev.id}`, "href")} class="group inline-flex items-center gap-x-2 rounded-xl px-4 py-2 no-underline transition-colors duration-300 hover:bg-muted max-sm:max-w-[80%] sm:flex"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 rotate-180 stroke-muted-foreground transition-colors group-hover:stroke-primary"> <line x1="5" y1="12" x2="19" y2="12" class="translate-x-4 scale-x-0 transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:scale-x-100"></line> <polyline points="12 5 19 12 12 19" class="translate-x-0 transition-all duration-300 ease-in-out group-hover:translate-x-1"></polyline> </svg> <p class="truncate font-medium transition-colors">${prev.data.title}</p> </a>`} </span> <span class="min-w-0"> ${next && renderTemplate`<a${addAttribute(`${path}/${next.id}`, "href")} class="group inline-flex items-center gap-x-2 rounded-xl px-4 py-2 text-right no-underline transition-colors duration-300 hover:bg-muted max-sm:float-end max-sm:max-w-[80%] sm:flex"> <p class="truncate font-medium transition-colors">${next.data.title}</p> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 stroke-muted-foreground transition-colors group-hover:stroke-primary"> <line x1="5" y1="12" x2="19" y2="12" class="translate-x-4 scale-x-0 transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:scale-x-100"></line> <polyline points="12 5 19 12 12 19" class="translate-x-0 transition-all duration-300 ease-in-out group-hover:translate-x-1"></polyline> </svg> </a>`} </span> </div>`;
}, "C:/Users/22790/astro-blog2/src/components/pages/ArticleBottom.astro", void 0);
//#endregion
//#region src/components/pages/BackToTop.astro
createAstro("https://blog.rusin7.com/");
var $$BackToTop = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BackToTop;
	const { header: headerName, content: contentName, needPercent = true } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<button aria-label="Back to Top" class="z-90 group fixed bottom-8 end-4 flex h-10 w-10 translate-y-28 items-center justify-center rounded-full border-2 border-transparent bg-muted text-muted-foreground opacity-0 transition-all duration-300 hover:border-border/75 data-[show=true]:translate-y-0 data-[show=true]:opacity-100 sm:end-8 sm:h-12 sm:w-12" data-show="false" id="to-top-btn"> <div class="absolute bottom-0 end-0 start-0 top-0 flex items-center justify-center transition-opacity group-hover:opacity-0 group-[.ended]:opacity-0"> <span class="text">10</span> <span class="text-xs">%</span> </div> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "up",
		"class": "opacity-0 transition-opacity group-hover:opacity-100 group-[.ended]:opacity-100"
	})} </button> <script>(function(){${defineScriptVars({
		headerName,
		contentName,
		needPercent
	})}
  const scrollBtn = document.getElementById('to-top-btn')
  const scrollPercentEl = scrollBtn.children[0].children[0]
  const targetHeader = document.getElementById(headerName)
  const articleElement = document.getElementById(contentName)

  // scroll to top
  function callback(entries) {
    entries.forEach((entry) => {
      // only show the scroll to top button when the heading is out of view
      scrollBtn.dataset.show = (!entry.isIntersecting).toString()
    })
  }
  scrollBtn.addEventListener('click', () => {
    document.documentElement.scrollTo({ behavior: 'smooth', top: 0 })
  })
  if (targetHeader) {
    const observer = new IntersectionObserver(callback)
    observer.observe(targetHeader)
  } else {
    console.error(\`Element with ID \${headerName} not found.\`)
  }

  if (needPercent) {
    // scroll percentage
    let scrollHeight = articleElement.scrollHeight // total height
    let articleTop = articleElement.offsetTop // article top
    const clientHeight = document.documentElement.clientHeight // client height

    function recalculateHeights() {
      scrollHeight = articleElement.scrollHeight
      articleTop = articleElement.offsetTop
    }

    const images = articleElement.querySelectorAll('img')
    let loadedImagesCount = 0
    const totalImages = images.length

    if (totalImages > 0) {
      images.forEach((img) => {
        if (img.complete) {
          loadedImagesCount++
        } else {
          img.addEventListener('load', () => {
            loadedImagesCount++
            if (loadedImagesCount === totalImages) {
              recalculateHeights()
            }
          })
          img.addEventListener('error', () => {
            loadedImagesCount++
            if (loadedImagesCount === totalImages) {
              recalculateHeights()
            }
          })
        }
      })
      if (loadedImagesCount === totalImages) {
        recalculateHeights()
      }
    }

    function calculateScrollPercent() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop < articleTop) return
      
      const scrollableHeight = Math.max(scrollHeight - clientHeight, 1)
      const scrolledAmount = scrollTop - articleTop
      
      const percent = Math.round((scrolledAmount / scrollableHeight) * 100)
      return Math.max(0, Math.min(100, percent))
    }

    document.addEventListener('scroll', () => {
      const scrollPercent = calculateScrollPercent()
      if (scrollPercent === undefined) return
      scrollPercentEl.innerText = scrollPercent.toString()

      // If percent is 100, percent won't need to show
      scrollBtn.classList.toggle('ended', scrollPercent >= 100)
    })

    window.addEventListener('resize', recalculateHeights)
  } else {
    scrollBtn.classList.add('ended')
  }
})();<\/script>`;
}, "C:/Users/22790/astro-blog2/src/components/pages/BackToTop.astro", void 0);
//#endregion
//#region src/components/pages/Copyright.astro
createAstro("https://blog.rusin7.com/");
var $$Copyright = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Copyright;
	const { data: { heroImage, title, publishDate }, class: className } = Astro.props;
	const image = typeof heroImage?.src === "string" ? heroImage?.src : heroImage?.src?.src ?? "";
	const shares = {
		weibo: { link: `http://service.weibo.com/share/share.php?url=${Astro.url}&title=${title}&pic=${image}` },
		x: { link: `https://x.com/intent/tweet?text='${title}'&url='${Astro.url}'&via='${config.author}'` },
		bluesky: { link: `https://bsky.app/intent/compose?text=${title}%0A${Astro.url}` }
	};
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute((cn("relative flex flex-col gap-y-2 rounded-xl border px-3 sm:px-4 py-2 sm:py-3", className) ?? "") + " astro-gjbzq56a", "class")}> ${renderComponent($$result, "Icon", $$Icon, {
		"class": "absolute end-4 top-4 size-20 opacity-10 astro-gjbzq56a",
		"name": "copyright"
	})} <div class="absolute bottom-2 right-2 w-20 h-10 signature-container astro-gjbzq56a"> <svg viewBox="0 -1 163.403 90.305" xmlns="http://www.w3.org/2000/svg" class="w-full h-full signature-svg astro-gjbzq56a"> <g stroke-linecap="round" fill-rule="evenodd" stroke="currentColor" stroke-width="0.3mm" fill="currentColor" class="astro-gjbzq56a"> <path class="signature-path astro-gjbzq56a" d="M 24.402 85.301 Q 17.502 85.301 11.952 81.901 Q 6.402 78.501 3.202 72.051 Q 0.002 65.601 0.002 56.801 Q 0.002 41.601 6.502 28.651 Q 13.002 15.701 25.702 7.851 Q 38.402 0.001 56.202 0.001 Q 60.802 0.001 66.052 0.701 Q 71.302 1.401 75.602 2.801 Q 78.402 3.601 78.402 6.801 Q 78.402 9.401 76.452 11.701 Q 74.502 14.001 71.902 14.001 Q 71.102 14.001 70.702 13.901 Q 65.502 12.701 61.802 12.151 Q 58.102 11.601 54.002 11.601 Q 41.302 11.601 32.402 17.751 Q 23.502 23.901 19.102 34.001 Q 14.702 44.101 14.702 55.801 Q 14.702 64.301 18.052 68.951 Q 21.402 73.601 26.802 73.601 Q 32.902 73.601 37.502 68.601 Q 42.102 63.601 45.902 52.401 Q 49.702 41.201 53.402 22.001 Q 54.002 19.201 55.802 18.201 Q 57.602 17.201 60.602 17.201 Q 67.702 17.201 67.702 21.801 Q 67.702 22.601 67.402 23.801 Q 64.802 33.501 62.652 45.251 Q 60.502 57.001 60.502 63.101 Q 60.502 68.501 62.102 70.951 Q 63.702 73.401 67.002 73.401 Q 70.202 73.401 73.102 71.251 A 23.845 23.845 0 0 0 74.956 69.705 A 43.109 43.109 0 0 0 75.125 69.55 A 12.009 12.009 0 0 1 76.332 66.429 A 10.164 10.164 0 0 1 77.002 65.401 Q 79.302 62.301 83.502 62.301 Q 87.102 62.301 87.102 65.001 Q 87.102 65.701 86.902 67.501 Q 86.602 71.101 86.602 71.601 Q 86.602 74.601 89.202 74.601 Q 91.102 74.601 92.852 72.351 Q 94.602 70.101 95.752 66.201 Q 96.902 62.301 96.902 57.601 Q 96.902 54.001 96.002 51.551 Q 95.102 49.101 93.802 49.101 Q 92.702 49.101 92.202 49.651 Q 91.702 50.201 91.202 51.501 Q 90.602 53.101 89.602 54.051 Q 88.602 55.001 86.102 55.001 Q 83.902 55.001 82.602 53.451 Q 81.302 51.901 81.302 48.701 Q 81.302 43.601 84.402 40.701 Q 87.502 37.801 92.402 37.801 Q 96.602 37.801 100.002 39.851 Q 103.402 41.901 105.202 45.801 Q 108.202 41.801 111.952 39.801 Q 115.702 37.801 119.302 37.801 Q 123.202 37.801 125.252 39.601 Q 127.302 41.401 127.302 45.401 Q 127.302 49.901 125.602 52.451 Q 123.902 55.001 121.502 55.001 Q 119.302 55.001 118.502 54.101 Q 117.702 53.201 117.302 51.501 Q 117.102 50.301 116.702 49.701 Q 116.302 49.101 115.302 49.101 Q 114.102 49.101 112.752 51.351 Q 111.402 53.601 110.452 57.301 Q 109.502 61.001 109.502 65.001 Q 109.502 69.701 111.752 72.251 Q 114.002 74.801 117.902 74.801 Q 121.802 74.801 125.252 72.151 Q 127.442 70.468 130.096 67.598 A 81.726 81.726 0 0 0 130.631 67.01 A 46.575 46.575 0 0 1 130.738 65.106 Q 130.998 61.577 131.752 56.951 Q 132.902 49.901 134.702 43.801 Q 135.602 40.601 137.102 39.401 Q 138.602 38.201 141.902 38.201 Q 147.002 38.201 147.002 41.601 Q 147.002 44.101 145.102 53.201 Q 142.702 64.201 142.702 68.101 Q 142.702 71.101 143.502 72.701 Q 144.302 74.301 146.202 74.301 Q 148.002 74.301 150.702 71.801 Q 153.402 69.301 157.902 63.901 Q 159.102 62.501 160.602 62.501 Q 161.902 62.501 162.652 63.701 Q 163.402 64.901 163.402 67.001 Q 163.402 71.001 161.502 73.201 Q 151.602 85.301 143.002 85.301 Q 136.502 85.301 133.552 80.701 A 17.114 17.114 0 0 1 132.192 78.047 A 46.504 46.504 0 0 1 129.824 80.016 A 41.632 41.632 0 0 1 127.252 81.851 Q 122.002 85.301 115.402 85.301 Q 110.302 85.301 106.352 83.401 Q 102.402 81.501 100.102 78.001 Q 94.402 85.201 86.602 85.201 Q 81.102 85.201 77.902 82.001 A 10.732 10.732 0 0 1 76.686 80.537 A 42.127 42.127 0 0 1 76.431 80.739 A 31.425 31.425 0 0 1 74.402 82.201 Q 69.702 85.301 62.902 85.301 Q 55.902 85.301 51.602 81.251 Q 47.302 77.201 46.202 69.801 Q 38.802 85.301 24.402 85.301 Z M 143.802 31.601 Q 139.602 31.601 137.502 29.651 Q 135.402 27.701 135.402 24.201 Q 135.402 20.701 138.152 18.351 Q 140.902 16.001 145.002 16.001 Q 148.702 16.001 151.002 17.801 Q 153.302 19.601 153.302 22.901 Q 153.302 26.901 150.702 29.251 Q 148.102 31.601 143.802 31.601 Z" vector-effect="non-scaling-stroke"></path> </g> </svg> </div>  <div class="flex flex-col astro-gjbzq56a"> <div class="font-medium text-foreground astro-gjbzq56a">${title}</div> <div class="text-sm astro-gjbzq56a">${Astro.url}</div> </div>  <div class="flex flex-row flex-wrap justify-start gap-x-5 gap-y-1 sm:gap-x-8 astro-gjbzq56a"> <div class="flex gap-x-2 sm:flex-col astro-gjbzq56a"> <span class="astro-gjbzq56a">Author</span> <span class="text-sm text-foreground max-sm:place-self-center astro-gjbzq56a">${config.author}</span> </div> ${publishDate && renderTemplate`<div class="flex gap-x-2 sm:min-w-16 sm:flex-col astro-gjbzq56a"> <span class="astro-gjbzq56a">Published at</span> <span class="text-sm text-foreground max-sm:place-self-center astro-gjbzq56a"> ${getFormattedDate(publishDate, { month: "long" })} </span> </div>`} <div class="flex gap-x-2 sm:flex-col astro-gjbzq56a"> <span class="astro-gjbzq56a">Copyright</span> <a class="text-sm text-foreground max-sm:place-self-center underline decoration-muted-foreground/50 underline-offset-2 rounded px-1 -mx-1 transition-all duration-200 hover:no-underline hover:bg-foreground hover:text-background astro-gjbzq56a" href="https://creativecommons.org/licenses/by/4.0/" target="_blank">
CC BY-NC-SA 4.0
</a> </div> </div>  <div class="relative astro-gjbzq56a"> <div class="flex flex-row gap-3 astro-gjbzq56a"> <button id="copy-link" class="group rounded-full bg-muted p-1 text-muted-foreground transition-colors hover:text-primary sm:p-1.5 astro-gjbzq56a"> ${renderComponent($$result, "Icon", $$Icon, {
		"class": "size-5 astro-gjbzq56a",
		"name": "link"
	})} </button> <button id="get-qrcode" class="group rounded-full bg-muted p-1 text-muted-foreground transition-colors hover:text-primary sm:p-1.5 astro-gjbzq56a"> ${renderComponent($$result, "Icon", $$Icon, {
		"class": "size-5 astro-gjbzq56a",
		"name": "qrcode"
	})} </button> ${(config.content?.share || []).map((share) => renderTemplate`<a${addAttribute(shares[share].link, "href")} target="_blank"${addAttribute(`share-${share}`, "id")} class="group rounded-full bg-muted p-1 text-muted-foreground transition-colors hover:text-primary sm:p-1.5 astro-gjbzq56a"> ${renderComponent($$result, "Icon", $$Icon, {
		"class": "size-5 astro-gjbzq56a",
		"name": share
	})} </a>`)} </div> ${renderComponent($$result, "QRCode", $$QRCode, {
		"aria-expanded": "false",
		"class": "absolute z-10 -mt-2 box-content max-h-0 max-w-44 overflow-hidden rounded-xl border bg-muted p-4 opacity-0 transition-all duration-300 ease-in-out aria-expanded:max-h-44 aria-expanded:translate-y-4 aria-expanded:opacity-100 astro-gjbzq56a"
	})} </div> </div> <div class="mx-6 rounded-b-xl border border-t-0 px-3 pb-1.5 pt-1 sm:mx-8 sm:px-4 astro-gjbzq56a"> <a href="/projects#sponsorship" class="flex items-center justify-between text-muted-foreground no-underline astro-gjbzq56a"> <span class="astro-gjbzq56a">Buy me a cup of coffee ☕.</span> ${renderComponent($$result, "Icon", $$Icon, {
		"class": "box-content size-5 p-1 astro-gjbzq56a",
		"name": "receive-money"
	})} </a> </div> ${renderScript($$result, "C:/Users/22790/astro-blog2/src/components/pages/Copyright.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/22790/astro-blog2/src/components/pages/Copyright.astro", void 0);
//#endregion
//#region src/components/pages/Hero.astro
createAstro("https://blog.rusin7.com/");
var $$Hero = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Hero;
	const { data: { title, description, draft, heroImage, publishDate, updatedDate, comment: enableComment, tags, language, pixivLink }, remarkPluginFrontmatter } = Astro.props;
	const dateTimeOptions = { month: "short" };
	const imageProps = heroImage ? {
		src: heroImage.src,
		width: heroImage.width || 1200,
		height: heroImage.height || 630
	} : void 0;
	const imageAlt = heroImage?.alt || title;
	return renderTemplate`${imageProps && renderTemplate`${maybeRenderHead($$result)}<div class="hero-image relative mb-6"> ${renderComponent($$result, "Image", $$Image, {
		"alt": imageAlt,
		"class": "cover-image relative z-10 h-auto w-full max-w-[65ch] rounded-2xl object-contain",
		"fetchpriority": "high",
		"loading": "eager",
		...imageProps
	})} ${renderComponent($$result, "Image", $$Image, {
		"alt": "Blur image",
		"fetchpriority": "high",
		"loading": "eager",
		"id": "blurImage",
		"class": "absolute end-0 top-4 z-0 mt-0 h-full max-w-[65ch] rounded-3xl opacity-60 blur-xl transition-opacity duration-300",
		...imageProps
	})} </div>`} ${draft ? renderTemplate`<span class="text-red-500">(Draft)</span>` : null} <div class="article-info max-lg:mx-auto"> <div class="flex flex-wrap gap-x-4 gap-y-2 text-xs leading-6 text-muted-foreground">  <div class="flex items-center gap-1"> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "calendar",
		"class": "size-5"
	})} ${renderComponent($$result, "FormattedDate", $$FormattedDate, {
		"class": "font-sans",
		"date": publishDate,
		"dateTimeOptions": dateTimeOptions
	})} ${updatedDate && renderTemplate`<div class="flex items-center gap-1"> <span> / </span> <span>
Update
${renderComponent($$result, "FormattedDate", $$FormattedDate, {
		"class": "font-sans",
		"date": updatedDate,
		"dateTimeOptions": dateTimeOptions
	})} </span> </div>`} </div>  <div class="flex items-center gap-1"> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "time",
		"class": "size-5"
	})} ${remarkPluginFrontmatter.minutesRead} </div> ${language && renderTemplate`<span class="flex items-center gap-1"> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "earth",
		"class": "size-5"
	})} ${language} </span>`} ${pixivLink && renderTemplate`<span class="flex items-center gap-1"> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "moon",
		"class": "size-5"
	})} <a${addAttribute(`https://www.pixiv.net/artworks/${pixivLink}`, "href")} target="_blank" rel="noopener noreferrer" class="hover:underline hover:underline-offset-4">
Hero Image
</a> </span>`} ${!!tags?.length && renderTemplate`<span class="flex items-center gap-1"> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "hashtag",
		"class": "size-5"
	})} ${tags.map((tag, i) => renderTemplate`<div> <a${addAttribute(`View more blogs with the tag ${tag}`, "aria-label")} class="hover:underline hover:underline-offset-4" data-pagefind-filter="tag"${addAttribute(`/tags/${tag}`, "href")}> ${tag} </a> ${i < tags.length - 1 && "/"} </div>`)} </span>`} </div> <h1 class="mt-4 text-2xl font-medium sm:mb-2 sm:mt-6 sm:text-3xl"> ${title} </h1> <div class="mt-3 italic"> <blockquote class="text-sm text-muted-foreground"><q>${description}</q></blockquote> ${!draft && enableComment && renderTemplate`${renderComponent($$result, "PageInfo", $$PageInfo, { "class": "mt-1" })}`} </div> </div>  <div class="mt-4 w-1/2 border-t max-lg:mx-auto sm:mt-6 sm:w-1/3"></div> ${renderScript($$result, "C:/Users/22790/astro-blog2/src/components/pages/Hero.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/22790/astro-blog2/src/components/pages/Hero.astro", void 0);
//#endregion
//#region src/components/pages/PageInfo.astro
createAstro("https://blog.rusin7.com/");
var $$PageInfo = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PageInfo;
	const { class: className, hideComment, ...props } = Astro.props;
	const normalizePath = (path) => {
		if (path === "/") return path;
		return path.endsWith("/") ? path.slice(0, -1) : path;
	};
	const path = normalizePath(Astro.url.pathname);
	const isEnglish = Astro.url.pathname.split("/").filter(Boolean)[0] === "en";
	const labels = {
		views: isEnglish ? "views" : "次阅读",
		comments: isEnglish ? "comments" : "次评论"
	};
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(cn("text-base text-sm text-muted-foreground", className), "class")}${spreadAttributes(props)}> <span class="waline-pageview-count"${addAttribute(path, "data-path")}></span> ${labels.views} ${!hideComment && renderTemplate`<a href="#waline">
| <span class="waline-comment-count"${addAttribute(path, "data-path")}></span> ${labels.comments} </a>`} </div>`;
}, "C:/Users/22790/astro-blog2/src/components/pages/PageInfo.astro", void 0);
//#endregion
//#region src/components/pages/Paginator.astro
createAstro("https://blog.rusin7.com/");
var $$Paginator = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Paginator;
	const { currentPage, lastPage, url } = Astro.props;
	function getPageNumbers(current, last) {
		if (last <= 1) return [];
		const delta = 2;
		const rangeWithDots = [];
		let l;
		rangeWithDots.push(1);
		for (let i = Math.max(2, current - delta); i <= Math.min(last - 1, current + delta); i++) {
			if (i > 2 && l === void 0) rangeWithDots.push("...");
			rangeWithDots.push(i);
			l = i;
		}
		if (last > 1) {
			if (l !== void 0 && l < last - 1) rangeWithDots.push("...");
			rangeWithDots.push(last);
		}
		const simpleRange = [];
		const left = current - delta;
		const right = current + delta + 1;
		let lastAdded;
		for (let i = 1; i <= last; i++) if (i === 1 || i === last || i >= left && i < right) {
			if (lastAdded !== void 0 && typeof lastAdded === "number" && i > lastAdded + 1) {
				if (simpleRange[simpleRange.length - 1] !== "...") simpleRange.push("...");
			}
			simpleRange.push(i);
			lastAdded = i;
		} else if (lastAdded !== "..." && (i < left || i >= right)) {
			if (simpleRange[simpleRange.length - 1] !== "...") {
				simpleRange.push("...");
				lastAdded = "...";
			}
		}
		return simpleRange;
	}
	const pageNumbers = getPageNumbers(currentPage, lastPage);
	function replacePageInUrl(currentUrl, page) {
		const base = currentUrl.replace(/\/\d+\/?$/, "");
		if (page === 1) return base || "/";
		return `${base === "/" ? "" : base}/${page}`;
	}
	const itemBaseClasses = "flex items-center justify-center min-w-[36px] h-9 px-2 rounded text-sm transition-colors duration-150 ease-in-out";
	const linkClasses = `
  ${itemBaseClasses}
  text-gray-600 hover:bg-gray-100 hover:text-gray-900
  focus:outline-none focus:ring-1 focus:ring-blue-400 focus:bg-gray-100
  dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100
  dark:focus:bg-gray-700 dark:focus:ring-blue-500 dark:focus:ring-offset-gray-800
`;
	const currentClasses = `
  ${itemBaseClasses}
  bg-blue-100 text-blue-700 font-semibold cursor-default
  dark:bg-gray-700 dark:text-gray-100
`;
	const ellipsisClasses = `
  ${itemBaseClasses}
  text-gray-400 dark:text-gray-500 cursor-default
`;
	return renderTemplate`${lastPage > 1 && renderTemplate`${maybeRenderHead($$result)}<nav class="mt-8 flex flex-wrap items-center justify-center gap-1" aria-label="Pagination"> ${pageNumbers.map((num) => typeof num === "number" ? num === currentPage ? renderTemplate`<span${addAttribute(currentClasses, "class")} aria-current="page"${addAttribute(`Page ${num}, Current Page`, "aria-label")}> ${num} </span>` : renderTemplate`<a${addAttribute(replacePageInUrl(url.current, num), "href")}${addAttribute(linkClasses, "class")}${addAttribute(`Go to page ${num}`, "aria-label")}> ${num} </a>` : renderTemplate`<span${addAttribute(ellipsisClasses, "class")} aria-hidden="true">
...
</span>`)} </nav>`}`;
}, "C:/Users/22790/astro-blog2/src/components/pages/Paginator.astro", void 0);
//#endregion
//#region src/components/pages/PostPreview.astro
createAstro("https://blog.rusin7.com/");
var $$PostPreview = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PostPreview;
	const { as: Tag = "div", post, detailed = false, class: className } = Astro.props;
	const { id, data } = post;
	const { remarkPluginFrontmatter } = await renderEntry(post);
	const postDate = data.updatedDate ?? data.publishDate;
	const heroImageProps = data.heroImage ? {
		src: data.heroImage.src,
		alt: data.heroImage.alt,
		color: data.heroImage.color,
		width: data.heroImage.width || 1200,
		height: data.heroImage.height || 630
	} : void 0;
	function getLocalizedUrl(locale, path) {
		let url = getRelativeLocaleUrl(locale || "zh", path);
		if (url !== "/" && url.endsWith("/")) url = url.slice(0, -1);
		return url;
	}
	return renderTemplate`${maybeRenderHead($$result)}<li${addAttribute((cn("post-preview group/card flex flex-col relative rounded-2xl border border-border bg-background transition-colors ease-in-out px-5 py-2.5 hover:bg-muted", detailed && "max-sm:px-4 sm:py-5", className) ?? "") + " astro-bnkco7nu", "class")}${addAttribute(detailed && data.heroImage?.color && `--preview-highlight:color-mix(in srgb,${data.heroImage.color} 40%,hsl(var(--foreground)/var(--tw-text-opacity,1)));
    --preview-highlight-bg:hsl(from ${data.heroImage.color} h s l/20%)`, "style")}> <a${addAttribute((cn("group/link w-full flex flex-col transition-all hover:text-primary", !detailed && "sm:flex-row", detailed && data.heroImage && "max-md:pt-24") ?? "") + " astro-bnkco7nu", "class")}${addAttribute(getLocalizedUrl(Astro.currentLocale, `/article/${id}`), "href")} data-astro-prefetch> ${detailed && heroImageProps && renderTemplate`${renderComponent($$result, "Image", $$Image, {
		"alt": heroImageProps.alt || data.title,
		"class": "cover-image absolute end-0 top-0 z-0 h-2/3 w-full rounded-2xl object-cover opacity-50 transition-opacity duration-300 group-hover/card:opacity-70 md:h-full md:w-3/5 astro-bnkco7nu",
		"loading": "eager",
		"src": heroImageProps.src,
		"width": heroImageProps.width,
		"height": heroImageProps.height
	})}`} ${renderComponent($$result, "FormattedDate", $$FormattedDate, {
		"class": "min-w-[95px] py-1 text-xs astro-bnkco7nu",
		"date": postDate
	})} ${renderComponent($$result, "Tag", Tag, { "class": "z-10 flex-grow astro-bnkco7nu" }, { "default": ($$result) => renderTemplate`<div class="flex justify-between astro-bnkco7nu"> <div${addAttribute((detailed ? "font-medium" : "") + " astro-bnkco7nu", "class")}> ${data.draft && renderTemplate`<span class="text-red-500 astro-bnkco7nu">(Draft) </span>`} ${data.title} </div> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="preview-redirect my-1 stroke-muted-foreground group-hover/link:stroke-primary astro-bnkco7nu"><line x1="5" y1="12" x2="19" y2="12" class="translate-x-4 scale-x-0 transition-all duration-300 ease-in-out group-hover/link:translate-x-1 group-hover/link:scale-x-100 astro-bnkco7nu"></line><polyline points="12 5 19 12 12 19" class="translate-x-0 transition-all duration-300 ease-in-out group-hover/link:translate-x-1 astro-bnkco7nu"></polyline></svg> </div> ${detailed && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`  <p${addAttribute((cn("line-clamp-2 pt-1 text-sm text-muted-foreground sm:line-clamp-3", data.heroImage && "sm:me-24") ?? "") + " astro-bnkco7nu", "class")}> ${data.description} </p> <div class="flex items-center gap-2 py-1.5 text-sm italic leading-4 text-muted-foreground sm:py-3 astro-bnkco7nu">  <span class="flex items-center gap-1 astro-bnkco7nu"> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "time",
		"class": "size-4 astro-bnkco7nu"
	})} ${remarkPluginFrontmatter.minutesRead} </span>  ${data.language && renderTemplate`<span class="flex items-center gap-1 astro-bnkco7nu"> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "earth",
		"class": "size-4 astro-bnkco7nu"
	})} ${data.language} </span>`} </div> ` })}`}` })} </a> <!-- tags --> ${detailed && data.tags && renderTemplate`<ul class="tag-list mt-1 flex flex-wrap gap-2 astro-bnkco7nu"> ${data.tags.map((tag) => renderTemplate`<li class="astro-bnkco7nu"> ${renderComponent($$result, "Button", $$Button, {
		"title": tag,
		"href": getLocalizedUrl(Astro.currentLocale, `/tags/${tag}`),
		"style": "pill",
		"class": "astro-bnkco7nu"
	})} </li>`)} </ul>`} </li>`;
}, "C:/Users/22790/astro-blog2/src/components/pages/PostPreview.astro", void 0);
//#endregion
//#region src/components/pages/CollectionPreview.astro
createAstro("https://blog.rusin7.com/");
var $$CollectionPreview = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$CollectionPreview;
	const { collection, minimal = false, class: className } = Astro.props;
	const { id, data } = collection;
	const isEn = Astro.currentLocale === "en";
	const title = isEn && data.title_en ? data.title_en : data.title;
	const description = isEn && data.description_en ? data.description_en : data.description;
	function getLocalizedUrl(locale, path) {
		let url = getRelativeLocaleUrl(locale || "zh", path);
		if (url !== "/" && url.endsWith("/")) url = url.slice(0, -1);
		return url;
	}
	const collectionUrl = getLocalizedUrl(Astro.currentLocale, `/collection/${id}`);
	return renderTemplate`${minimal ? renderTemplate`${maybeRenderHead($$result)}<li${addAttribute(className, "class")}> <a${addAttribute(collectionUrl, "href")} class="group flex items-center justify-between rounded-lg border border-border bg-card p-3 transition-all hover:border-primary/50 hover:bg-muted/50 hover:shadow-sm"> <div class="flex flex-col gap-0.5 overflow-hidden"> <span class="truncate font-medium text-foreground transition-colors group-hover:text-primary"> ${title} </span> ${description && renderTemplate`<span class="truncate text-xs text-muted-foreground">${description}</span>`} </div> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "chevron-down",
		"class": "size-4 -rotate-90 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
	})} </a> </li>` : renderTemplate`<a${addAttribute(collectionUrl, "href")}${addAttribute(cn("group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:bg-muted/50 hover:shadow-md", className), "class")}> <div class="flex flex-col"> ${data.heroImage ? renderTemplate`<div class="group/img relative aspect-video w-full overflow-hidden"> ${renderComponent($$result, "Image", $$Image, {
		"src": data.heroImage.src,
		"alt": data.heroImage.alt || title,
		"width": data.heroImage.width || 1200,
		"height": data.heroImage.height || 630,
		"class": "h-full w-full object-cover transition-all duration-300 brightness-[0.8] group-hover/img:brightness-90"
	})} <div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4"> <h2 class="line-clamp-2 text-xl font-semibold text-white">${title}</h2> ${description && renderTemplate`<p class="mt-1 line-clamp-2 text-sm text-white/80">${description}</p>`} </div> </div>` : renderTemplate`<div class="flex flex-col gap-3 p-4"> <div class="flex items-center justify-between"> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "package",
		"class": "size-8 text-primary/80"
	})} </div> <div class="flex flex-col gap-1"> <h2 class="line-clamp-2 text-xl font-semibold transition-colors group-hover:text-primary"> ${title} </h2> ${description && renderTemplate`<p class="line-clamp-3 text-sm text-muted-foreground">${description}</p>`} </div> </div>`} </div> <div class="flex items-center justify-between p-4 text-sm font-medium text-primary"> <span class="text-foreground transition-colors group-hover:text-primary">
View Collection
</span> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "chevron-down",
		"class": "size-5 -rotate-90 text-muted-foreground transition-colors group-hover:text-primary"
	})} </div> </a>`}`;
}, "C:/Users/22790/astro-blog2/src/components/pages/CollectionPreview.astro", void 0);
//#endregion
//#region src/components/pages/CollectionHeader.astro
createAstro("https://blog.rusin7.com/");
var $$CollectionHeader = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$CollectionHeader;
	const { collection, class: className } = Astro.props;
	const { data } = collection;
	const isEn = Astro.currentLocale === "en";
	const title = isEn && data.title_en ? data.title_en : data.title;
	const description = isEn && data.description_en ? data.description_en : data.description;
	const imageProps = data.heroImage ? {
		src: data.heroImage.src,
		alt: data.heroImage.alt || title,
		width: data.heroImage.width || 1200,
		height: data.heroImage.height || 630
	} : void 0;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(cn("mb-8 animate", className), "class")}> ${imageProps ? renderTemplate`<div class="group relative overflow-hidden rounded-xl shadow-sm"> ${renderComponent($$result, "Image", $$Image, {
		"src": imageProps.src,
		"alt": imageProps.alt,
		"width": imageProps.width,
		"height": imageProps.height,
		"class": "h-auto w-full object-cover max-h-[400px] transition-all"
	})} <div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6"> <h1 class="mb-2 text-3xl font-bold text-white">${title}</h1> ${description && renderTemplate`<p class="line-clamp-2 text-white/90">${description}</p>`} </div> </div>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` <h1 class="mb-2 text-3xl">${title}</h1> ${description && renderTemplate`<p class="text-muted-foreground">${description}</p>`} ` })}`} </div>`;
}, "C:/Users/22790/astro-blog2/src/components/pages/CollectionHeader.astro", void 0);
//#endregion
//#region src/plugins/toc.ts
function diveChildren(item, depth) {
	if (depth === 1 || !item.subheadings.length) return item.subheadings;
	else return diveChildren(item.subheadings[item.subheadings.length - 1], depth - 1);
}
function cleanHeadingText(text) {
	return text.replace(/\s*#\s*$/, "");
}
function generateToc(headings) {
	const bodyHeadings = [...headings.filter(({ depth }) => depth > 1)];
	const toc = [];
	bodyHeadings.forEach((h) => {
		const heading = {
			...h,
			text: cleanHeadingText(h.text),
			subheadings: []
		};
		if (heading.depth === 2) toc.push(heading);
		else {
			const lastItemInToc = toc[toc.length - 1];
			if (heading.depth < lastItemInToc.depth) throw new Error(`Orphan heading found: ${heading.text}.`);
			diveChildren(lastItemInToc, heading.depth - lastItemInToc.depth).push(heading);
		}
	});
	return toc;
}
//#endregion
//#region src/components/pages/TOCHeading.astro
createAstro("https://blog.rusin7.com/");
var $$TOCHeading = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$TOCHeading;
	const { heading: { depth, slug, subheadings, text } } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<li> <div class="relative"> <span class="absolute top-[5%] w-[2px] rounded transition-colors duration-300 [&amp;.highlight-bg]:bg-primary [&amp;.readed]:bg-input"></span> <a${addAttribute(`Scroll to section: ${text}`, "aria-label")}${addAttribute(cn("line-clamp-2 px-3 py-1 ms-2 flex-1 text-foreground/75 transition-all hover:text-foreground [&.highlight]:font-medium [&.highlight]:text-primary [&.readed]:text-input [&.highlight-bg-translucent]:bg-muted", depth === 3 && "ps-7", depth === 4 && "ps-10", depth === 5 && "ps-14"), "class")}${addAttribute(`#${slug}`, "href")}>${text}</a> </div> ${!!subheadings.length && renderTemplate`<ul> ${subheadings.map((subheading) => renderTemplate`${renderComponent($$result, "Astro.self", Astro.self, { "heading": subheading })}`)} </ul>`} </li>`;
}, "C:/Users/22790/astro-blog2/src/components/pages/TOCHeading.astro", void 0);
//#endregion
//#region src/components/pages/TOC.astro
createAstro("https://blog.rusin7.com/");
var $$TOC = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$TOC;
	const { headings, class: className, ...props } = Astro.props;
	const tocTitle = Astro.url.pathname.includes("/en/") ? "TABLE OF CONTENTS" : "本页面目录";
	const toc = generateToc(headings);
	return renderTemplate`${renderComponent($$result, "toc-heading", "toc-heading", {
		"class": className,
		...props
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<h2 class="font-semibold">${tocTitle}</h2> <ul class="mt-4 text-card-foreground"> ${toc.map((heading) => renderTemplate`${renderComponent($$result, "TOCHeading", $$TOCHeading, { "heading": heading })}`)} </ul> ` })} ${renderScript($$result, "C:/Users/22790/astro-blog2/src/components/pages/TOC.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/22790/astro-blog2/src/components/pages/TOC.astro", void 0);
//#endregion
//#region src/components/pages/PFSearch.astro
var $$PFSearch = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "site-search", "site-search", { "class": "astro-afjvlkzy" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead($$result2)}<aside class="form my-4 astro-afjvlkzy"> ${renderTemplate`<div id="site-search" class="astro-afjvlkzy"></div>`} </aside> ` })} ${renderScript($$result, "C:/Users/22790/astro-blog2/src/components/pages/PFSearch.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/22790/astro-blog2/src/components/pages/PFSearch.astro", void 0);
//#endregion
export { $$BackToTop as a, $$PageInfo as i, $$TOC as n, $$CollectionPreview as r, $$PFSearch as t };
