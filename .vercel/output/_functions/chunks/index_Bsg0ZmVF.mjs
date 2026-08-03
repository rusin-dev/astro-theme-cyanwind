import { r as __exportAll } from "./rolldown-runtime_DWOOXAbm.mjs";
import { D as maybeRenderHead, c as renderComponent, g as renderTemplate, k as addAttribute } from "./server_BvovAKAK.mjs";
import { a as createComponent } from "./_astro_assets_DPhqHtnZ.mjs";
import { u as $$Button, v as cn } from "./i18n_UusxS-i0.mjs";
import { a as getUniqueTagsWithCount, t as getBlogCollection } from "./server_DMJrJHOC.mjs";
import { t as $$BaseLayout } from "./BaseLayout_3stYzWA0.mjs";
//#region src/pages/en/tags/index.astro
var tags_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const allPosts = await getBlogCollection();
	const allTags = getUniqueTagsWithCount(allPosts);
	return renderTemplate`${renderComponent($$result, "PageLayout", $$BaseLayout, {
		"meta": {
			description: "A list of all the topics I've written about in my posts",
			title: "All Tags"
		},
		"class": "astro-5usi24qx"
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "Button", $$Button, {
		"title": "Back",
		"href": "/en",
		"style": "back",
		"class": "astro-5usi24qx"
	})} ${maybeRenderHead($$result)}<main class="relative mt-6 lg:mt-10 astro-5usi24qx"> <div id="content-header" class="animate mb-12 text-center astro-5usi24qx"> <div class="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-opacity-90 bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg backdrop-blur-sm astro-5usi24qx"> <svg class="h-8 w-8 text-white astro-5usi24qx" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" class="astro-5usi24qx"></path> </svg> </div> <h1 class="mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-4xl font-bold text-transparent dark:from-white dark:via-gray-200 dark:to-white lg:text-5xl astro-5usi24qx">
Explore Topics
</h1> <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400 astro-5usi24qx">
Discover all the fascinating topics I've explored in my blog posts. Click on any tag to dive
        deeper into that subject.
</p> <div class="mt-8 inline-flex items-center gap-2 rounded-full border border-gray-200/50 bg-white/70 px-4 py-2 text-sm text-gray-600 backdrop-blur-md dark:border-gray-700/50 dark:bg-gray-800/70 dark:text-gray-400 astro-5usi24qx"> <svg class="h-4 w-4 astro-5usi24qx" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" class="astro-5usi24qx"></path> </svg> <span id="topics-count"${addAttribute(allTags.length, "data-target")} class="inline-block text-center font-mono astro-5usi24qx">0</span> topics • <span id="articles-count"${addAttribute(allPosts.length, "data-target")} class="inline-block text-center font-mono astro-5usi24qx">0</span> articles
</div> </div> <div id="content" class="animate astro-5usi24qx"> ${allTags.length > 0 ? renderTemplate`<div class="mx-auto max-w-6xl astro-5usi24qx"> <div class="astro-5usi24qx"> <h2 class="mb-6 flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-gray-200 astro-5usi24qx"> <svg class="h-5 w-5 text-blue-500 astro-5usi24qx" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" class="astro-5usi24qx"></path> </svg>
All Topics
</h2> <div class="flex flex-wrap justify-center gap-3 astro-5usi24qx"> ${allTags.map(([tag, val]) => renderTemplate`<div class="group astro-5usi24qx"> ${renderComponent($$result, "Button", $$Button, {
		"href": `/tags/${tag}`,
		"style": "pill",
		"class": (cn("relative overflow-hidden border border-gray-200/60 bg-white/80 backdrop-blur-md transition-all duration-200 ease-out hover:border-blue-300/80 hover:shadow-lg dark:border-gray-700/60 dark:bg-gray-800/80 dark:hover:border-blue-600/80", "flex items-center gap-2 px-4 py-2", val > 2 ? "text-lg" : val > 1 ? "text-base font-medium" : "text-sm") ?? "") + " astro-5usi24qx"
	}, { "default": ($$result) => renderTemplate` <span class="relative z-10 text-gray-700 transition-colors group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-white astro-5usi24qx"> ${tag} </span> <span${addAttribute((cn("relative z-10 rounded-full bg-gray-100/80 px-2 py-1 font-medium text-gray-600 backdrop-blur-sm transition-colors group-hover:bg-blue-100/90 group-hover:text-blue-700 dark:bg-gray-700/80 dark:text-gray-400 dark:group-hover:bg-blue-900/80 dark:group-hover:text-blue-300", val > 2 ? "text-sm" : "text-xs") ?? "") + " astro-5usi24qx", "class")}> ${val} </span> ` })} </div>`)} </div> </div> </div>` : renderTemplate`<div class="py-16 text-center astro-5usi24qx"> <div class="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full border border-gray-200/50 bg-gray-100/70 backdrop-blur-md dark:border-gray-700/50 dark:bg-gray-800/70 astro-5usi24qx"> <svg class="h-10 w-10 text-gray-400 astro-5usi24qx" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" class="astro-5usi24qx"></path> </svg> </div> <h3 class="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-300 astro-5usi24qx">
No topics yet
</h3> <p class="text-gray-500 dark:text-gray-400 astro-5usi24qx">
Check back later as I publish more content!
</p> </div>`} </div> </main> ` })} <script>
  function animateNumber(element, target, duration) {
    if (!element || target == null || isNaN(target) || target <= 0) {
      return
    }

    duration = duration || 2000

    const targetLength = target.toString().length
    element.style.minWidth = \`\${Math.max(targetLength, 2)}ch\`

    const start = 0
    const increment = target / (duration / 50)
    let current = start

    const timer = setInterval(() => {
      current += increment

      if (current >= target) {
        current = target
        clearInterval(timer)
        element.classList.add('counting')
        setTimeout(() => element.classList.remove('counting'), 300)
      }

      element.textContent = Math.floor(current).toString()

      if (current < target && Math.floor(current) % 3 === 0) {
        element.classList.add('counting')
        setTimeout(() => element.classList.remove('counting'), 200)
      }
    }, 50)
  }

  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      const topicsElement = document.getElementById('topics-count')
      const articlesElement = document.getElementById('articles-count')

      if (topicsElement) {
        const targetValue = topicsElement.getAttribute('data-target')
        const topicsTarget = parseInt(targetValue, 10)

        if (!isNaN(topicsTarget) && topicsTarget > 0) {
          animateNumber(topicsElement, topicsTarget, 1500)
        }
      }

      if (articlesElement) {
        const targetValue = articlesElement.getAttribute('data-target')
        const articlesTarget = parseInt(targetValue, 10)

        if (!isNaN(articlesTarget) && articlesTarget > 0) {
          setTimeout(() => {
            animateNumber(articlesElement, articlesTarget, 1500)
          }, 200)
        }
      }
    }, 600)
  })
<\/script>`;
}, "C:/Users/22790/astro-blog2/src/pages/en/tags/index.astro", void 0);
var $$file = "C:/Users/22790/astro-blog2/src/pages/en/tags/index.astro";
var $$url = "/en/tags";
//#endregion
//#region \0virtual:astro:page:src/pages/en/tags/index@_@astro
var page = () => tags_exports;
//#endregion
export { page };
