import { r as __exportAll } from "./rolldown-runtime_DWOOXAbm.mjs";
import { D as maybeRenderHead, c as renderComponent, g as renderTemplate } from "./server_BvovAKAK.mjs";
import { a as createComponent } from "./_astro_assets_DPhqHtnZ.mjs";
import { u as $$Button } from "./i18n_UusxS-i0.mjs";
import { r as getPostCollections } from "./server_DMJrJHOC.mjs";
import { t as $$BaseLayout } from "./BaseLayout_3stYzWA0.mjs";
import { r as $$CollectionPreview } from "./pages_BtOzBzZV.mjs";
//#region src/pages/en/collection/index.astro
var collection_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const collections = await getPostCollections();
	return renderTemplate`${renderComponent($$result, "PageLayout", $$BaseLayout, { "meta": {
		title: "All Collections",
		description: "View all post collections"
	} }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "Button", $$Button, {
		"title": "Back",
		"href": "/",
		"style": "back"
	})} ${maybeRenderHead($$result)}<main class="mt-6 lg:mt-10"> <div id="content-header" class="animate"> <h1 class="text-3xl font-bold mb-6">Collections</h1> <p class="text-muted-foreground mb-10 text-lg">
Curated sets of posts on specific topics or themes.
</p> </div> <section id="content" class="animate"> ${collections.length > 0 ? renderTemplate`<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"> ${collections.map((collection) => renderTemplate`${renderComponent($$result, "CollectionPreview", $$CollectionPreview, { "collection": collection })}`)} </div>` : renderTemplate`<div class="py-12 text-center text-muted-foreground"> <p>No collections found.</p> </div>`} </section> </main> ` })}`;
}, "C:/Users/22790/astro-blog2/src/pages/en/collection/index.astro", void 0);
var $$file = "C:/Users/22790/astro-blog2/src/pages/en/collection/index.astro";
var $$url = "/en/collection";
//#endregion
//#region \0virtual:astro:page:src/pages/en/collection/index@_@astro
var page = () => collection_exports;
//#endregion
export { page };
