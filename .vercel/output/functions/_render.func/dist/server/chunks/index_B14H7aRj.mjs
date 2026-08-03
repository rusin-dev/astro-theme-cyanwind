import { r as __exportAll } from "./rolldown-runtime_DWOOXAbm.mjs";
import { D as maybeRenderHead, c as renderComponent, g as renderTemplate, u as Fragment } from "./server_BvovAKAK.mjs";
import { a as createComponent } from "./_astro_assets_DPhqHtnZ.mjs";
import { u as $$Button } from "./i18n_UusxS-i0.mjs";
import { n as integ } from "./site.config_BT70j0O1.mjs";
import { t as $$BaseLayout } from "./BaseLayout_3stYzWA0.mjs";
import { t as $$PFSearch } from "./pages_BtOzBzZV.mjs";
//#region src/pages/en/search/index.astro
var search_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "PageLayout", $$BaseLayout, { "meta": {
		description: "Search relative posts of the whole blog",
		title: "Search"
	} }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "Button", $$Button, {
		"title": "Back",
		"href": "/en",
		"style": "back"
	})} ${maybeRenderHead($$result)}<main class="mt-6 lg:mt-10"> <div id="content-header" class="animate"> <h1 class="mb-6 text-3xl font-medium">Search</h1> </div> <div id="content" class="animate"> ${integ.pagefind ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` <p>Enter a search term or phrase to search the blog.</p> ${renderComponent($$result, "PFSearch", $$PFSearch, {})} ` })}` : renderTemplate`<p>Pagefind is disabled.</p>`} </div> </main> ` })}`;
}, "C:/Users/22790/astro-blog2/src/pages/en/search/index.astro", void 0);
var $$file = "C:/Users/22790/astro-blog2/src/pages/en/search/index.astro";
var $$url = "/en/search";
//#endregion
//#region \0virtual:astro:page:src/pages/en/search/index@_@astro
var page = () => search_exports;
//#endregion
export { page };
