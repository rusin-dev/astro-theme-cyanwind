import { D as maybeRenderHead, V as createAstro, c as renderComponent, g as renderTemplate, k as addAttribute, p as renderSlot, u as Fragment } from "./server_BvovAKAK.mjs";
import { a as createComponent } from "./_astro_assets_DPhqHtnZ.mjs";
import { v as cn } from "./i18n_UusxS-i0.mjs";
import { n as integ } from "./site.config_BT70j0O1.mjs";
import { t as $$BaseLayout } from "./BaseLayout_3stYzWA0.mjs";
import { a as $$BackToTop, i as $$PageInfo, n as $$TOC } from "./pages_BtOzBzZV.mjs";
//#region src/layouts/ContentLayout.astro
createAstro("https://blog.rusin7.com/");
var $$ContentLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ContentLayout;
	const { meta, highlightColor, back = "/", ...props } = Astro.props;
	return renderTemplate`${renderComponent($$result, "PageLayout", $$BaseLayout, {
		"meta": meta,
		"highlightColor": highlightColor,
		...props
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<main class="mt-6 items-start gap-x-10 md:flex">  <aside class="animate top-24 min-w-48 basis-60 overflow-y-scroll max-md:hidden md:sticky md:order-2 lg:shrink-0" style="height:calc(100vh - 8rem);" id="sidebar"> ${renderSlot($$result, $$slots["sidebar"])} </aside> <article class="min-w-0 grow">  <div id="content-header" class="animate"> ${renderSlot($$result, $$slots["header"])} </div>  <div id="content"${addAttribute(cn("max-w-none animate mt-8 md:min-w-[45ch]", integ.typography.class), "class")}> ${renderSlot($$result, $$slots["default"])} </div> </article> </main> <div class="mt-6 items-start gap-x-10 md:flex">  <div class="mt-8 flex-1 text-muted-foreground md:min-w-[50ch]"> ${renderSlot($$result, $$slots["bottom"])} </div> <div class="min-w-48 basis-60"> ${renderSlot($$result, $$slots["bottom-sidebar"])} </div> </div> ${renderComponent($$result, "BackToTop", $$BackToTop, {
		"header": "content-header",
		"content": "content"
	})} ` })}`;
}, "C:/Users/22790/astro-blog2/src/layouts/ContentLayout.astro", void 0);
//#endregion
//#region src/layouts/CommonPage.astro
createAstro("https://blog.rusin7.com/");
var $$CommonPage = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$CommonPage;
	const { title, headings, info, ...props } = Astro.props;
	return renderTemplate`${renderComponent($$result, "PageLayout", $$ContentLayout, {
		"meta": { title },
		...props
	}, {
		"default": ($$result) => renderTemplate` ${renderSlot($$result, $$slots["default"])}   `,
		"sidebar": ($$result) => renderTemplate`${headings?.length && renderTemplate`${renderComponent($$result, "TOC", $$TOC, {
			"headings": headings,
			"slot": "sidebar"
		})}`}`,
		"header": ($$result) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "slot": "header" }, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<h1 class="text-2xl font-medium sm:mb-2 sm:text-3xl"> ${title} </h1> ${info && renderTemplate`${renderComponent($$result, "PageInfo", $$PageInfo, {
			"path": typeof info === "string" ? info : info.slug,
			"hideComment": typeof info === "object" && info.hideComment ? info.hideComment : false,
			"class": "italic"
		})}`}` })}`,
		"bottom": ($$result) => renderTemplate`${renderSlot($$result, $$slots["bottom"])}`,
		"bottom-sidebar": ($$result) => renderTemplate`${renderSlot($$result, $$slots["bottom-sidebar"])}`
	})}`;
}, "C:/Users/22790/astro-blog2/src/layouts/CommonPage.astro", void 0);
//#endregion
export { $$CommonPage as t };
