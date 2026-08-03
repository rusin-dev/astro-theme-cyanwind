import { r as __exportAll } from "./rolldown-runtime_DWOOXAbm.mjs";
import { D as maybeRenderHead, c as renderComponent, g as renderTemplate, k as addAttribute } from "./server_BvovAKAK.mjs";
import { a as createComponent } from "./_astro_assets_DPhqHtnZ.mjs";
import { d as $$CardList, u as $$Button, v as cn } from "./i18n_UusxS-i0.mjs";
import { n as integ, r as terms } from "./site.config_BT70j0O1.mjs";
import { t as $$BaseLayout } from "./BaseLayout_3stYzWA0.mjs";
//#region src/pages/terms/list.astro
var list_exports = /* @__PURE__ */ __exportAll({
	default: () => $$List,
	file: () => $$file,
	url: () => $$url
});
var $$List = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "PageLayout", $$BaseLayout, { "meta": {
		title: "网站政策",
		description: "网站政策文件"
	} }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "Button", $$Button, {
		"title": "返回",
		"href": "/",
		"style": "back"
	})} ${maybeRenderHead($$result)}<main class="mt-6 lg:mt-10"> <div id="content-header" class="animate"> <h1 class="mb-6 text-3xl font-medium">Site Policy</h1> </div> <div id="content"${addAttribute(cn("animate mt-8 max-w-none md:min-w-[45ch]", integ.typography.class), "class")}> <h2 class="text-xl font-medium">网站政策文件</h2> ${renderComponent($$result, "CardList", $$CardList, { ...terms })} </div> </main> ` })}`;
}, "C:/Users/22790/astro-blog2/src/pages/terms/list.astro", void 0);
var $$file = "C:/Users/22790/astro-blog2/src/pages/terms/list.astro";
var $$url = "/terms/list";
//#endregion
//#region \0virtual:astro:page:src/pages/terms/list@_@astro
var page = () => list_exports;
//#endregion
export { page };
