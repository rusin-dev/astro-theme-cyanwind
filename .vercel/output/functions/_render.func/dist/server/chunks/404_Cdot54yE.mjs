import { r as __exportAll } from "./rolldown-runtime_DWOOXAbm.mjs";
import { D as maybeRenderHead, c as renderComponent, g as renderTemplate } from "./server_BvovAKAK.mjs";
import { a as createComponent } from "./_astro_assets_DPhqHtnZ.mjs";
import { u as $$Button } from "./i18n_UusxS-i0.mjs";
import { t as $$BaseLayout } from "./BaseLayout_3stYzWA0.mjs";
//#region src/pages/404.astro
var _404_exports = /* @__PURE__ */ __exportAll({
	default: () => $$404,
	file: () => $$file,
	url: () => $$url
});
var $$404 = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "PageLayout", $$BaseLayout, { "meta": {
		description: "Not found",
		title: "404"
	} }, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="px-4 py-10 text-center sm:px-6 lg:px-8"> <h1 class="block text-7xl font-bold sm:text-9xl">404</h1> <p class="mt-3 text-muted-foreground">哦，似乎有什么不对劲。</p> <p class="text-lg">抱歉，我们找不到您想要的页面。</p> ${renderComponent($$result, "Button", $$Button, {
		"title": "回到首页",
		"href": "/",
		"style": "ahead",
		"class": "mt-5"
	})} </div> ` })}`;
}, "C:/Users/22790/astro-blog2/src/pages/404.astro", void 0);
var $$file = "C:/Users/22790/astro-blog2/src/pages/404.astro";
var $$url = "/404";
//#endregion
//#region \0virtual:astro:page:src/pages/404@_@astro
var page = () => _404_exports;
//#endregion
export { page };
