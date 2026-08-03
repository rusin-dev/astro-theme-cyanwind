import { r as __exportAll } from "./rolldown-runtime_DWOOXAbm.mjs";
import { D as maybeRenderHead, c as renderComponent, g as renderTemplate, k as addAttribute } from "./server_BvovAKAK.mjs";
import { a as createComponent } from "./_astro_assets_DPhqHtnZ.mjs";
import { t as getBlogCollection } from "./server_DMJrJHOC.mjs";
import { t as $$BaseLayout } from "./BaseLayout_3stYzWA0.mjs";
//#region src/pages/article/index.astro
var article_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const allPosts = await getBlogCollection();
	const categories = [...new Set(allPosts.map((post) => post.data.category).filter((cat) => !!cat))];
	const categoryMap = {
		"tech": "技术",
		"life": "生活",
		"solution": "题解",
		"ccf": "信竞",
		"other": "其他"
	};
	categories.sort((a, b) => {
		const nameA = categoryMap[a] || a;
		const nameB = categoryMap[b] || b;
		return nameA.localeCompare(nameB);
	});
	return renderTemplate`${renderComponent($$result, "PageLayout", $$BaseLayout, { "meta": {
		title: "文章 - 如形の小站",
		description: "所有文章分类列表"
	} }, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<main class="mt-6 lg:mt-10"> <div id="content-header" class="animate"> <h1 class="mb-2 text-3xl font-medium">文章分类</h1> <p class="text-muted-foreground">共 ${categories.length} 个分类</p> <br> <p class="text-muted-foreground">选一个分类开始静心阅读吧。</p> <br> </div> ${categories.length === 0 ? renderTemplate`<p>还没有分类。</p>` : renderTemplate`<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"> ${categories.map((category) => {
		const count = allPosts.filter((post) => post.data.category === category).length;
		const displayName = categoryMap[category] || category;
		return renderTemplate`<a${addAttribute(`/article/${category}`, "href")} class="group rounded-lg border p-6 transition-shadow hover:shadow-md" data-astro-prefetch> <h2 class="text-xl font-semibold group-hover:text-primary"> ${displayName} </h2> <p class="mt-2 text-sm text-muted-foreground"> ${count} 篇文章
</p> </a>`;
	})} </div>`} </main> ` })}`;
}, "C:/Users/22790/astro-blog2/src/pages/article/index.astro", void 0);
var $$file = "C:/Users/22790/astro-blog2/src/pages/article/index.astro";
var $$url = "/article";
//#endregion
//#region \0virtual:astro:page:src/pages/article/index@_@astro
var page = () => article_exports;
//#endregion
export { page };
