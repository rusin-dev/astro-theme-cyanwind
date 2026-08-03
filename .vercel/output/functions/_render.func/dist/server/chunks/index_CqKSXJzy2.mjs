import { r as __exportAll } from "./rolldown-runtime_DWOOXAbm.mjs";
import { D as maybeRenderHead, c as renderComponent, g as renderTemplate, u as Fragment } from "./server_BvovAKAK.mjs";
import { a as createComponent } from "./_astro_assets_DPhqHtnZ.mjs";
import { u as $$Button } from "./i18n_UusxS-i0.mjs";
import { n as integ } from "./site.config_BT70j0O1.mjs";
import { t as $$BaseLayout } from "./BaseLayout_3stYzWA0.mjs";
import { t as $$PFSearch } from "./pages_BtOzBzZV.mjs";
//#region src/pages/search/index.astro
var search_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "PageLayout", $$BaseLayout, { "meta": {
		description: "搜索整个博客的相关文章",
		title: "搜索"
	} }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "Button", $$Button, {
		"title": "返回",
		"href": "/",
		"style": "back"
	})} ${maybeRenderHead($$result)}<main class="mt-6 lg:mt-10"> <div id="content-header" class="animate"> <h1 class="mb-6 text-3xl font-medium">Search</h1> </div> <div id="content" class="animate"> ${integ.pagefind ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` <p>搜索整个博客的相关文章</p> ${renderComponent($$result, "PFSearch", $$PFSearch, {})} ` })}` : renderTemplate`<p>文章搜索未开启</p>`} </div> </main> ` })}`;
}, "C:/Users/22790/astro-blog2/src/pages/search/index.astro", void 0);
var $$file = "C:/Users/22790/astro-blog2/src/pages/search/index.astro";
var $$url = "/search";
//#endregion
//#region \0virtual:astro:page:src/pages/search/index@_@astro
var page = () => search_exports;
//#endregion
export { page };
