import { D as maybeRenderHead, V as createAstro, c as renderComponent, g as renderTemplate, k as addAttribute, p as renderSlot } from "./server_BvovAKAK.mjs";
import { a as createComponent } from "./_astro_assets_DPhqHtnZ.mjs";
import { h as $$Icon, u as $$Button, v as cn } from "./i18n_UusxS-i0.mjs";
import { n as integ } from "./site.config_BT70j0O1.mjs";
import { t as $$BaseLayout } from "./BaseLayout_3stYzWA0.mjs";
import { a as $$BackToTop, n as $$TOC } from "./pages_BtOzBzZV.mjs";
//#region src/layouts/IndividualPage.astro
createAstro("https://blog.rusin7.com/");
var $$IndividualPage = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$IndividualPage;
	const { frontmatter, headings } = Astro.props;
	const { title, description, heroImage, language, back } = frontmatter;
	const socialImage = heroImage?.src ?? "/images/social-card.png";
	return renderTemplate`${renderComponent($$result, "PageLayout", $$BaseLayout, { "meta": {
		title,
		description,
		ogImage: socialImage
	} }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "Button", $$Button, {
		"title": "Back",
		"href": back ?? "/",
		"style": "back"
	})} ${maybeRenderHead($$result)}<main class="mt-6 items-start gap-x-10 md:flex lg:mt-10"> ${!!headings.length && renderTemplate`${renderComponent($$result, "TOC", $$TOC, {
		"class": "animate top-24 min-w-48 basis-60 max-md:hidden md:sticky md:order-2 lg:shrink-0",
		"headings": headings
	})}`} <article class="min-w-0 grow"> <div id="content-header" class="animate"> <h1 class="text-2xl font-medium sm:mb-2 sm:text-3xl"> ${title} </h1> <div class="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs leading-6 text-muted-foreground"> ${language && renderTemplate`<span class="flex items-center gap-1"> ${renderComponent($$result, "Icon", $$Icon, { "name": "earth" })} ${language} </span>`} ${description && renderTemplate`<blockquote class="text-sm italic text-muted-foreground"> <q>${description}</q> </blockquote>`} </div> </div> <div id="content"${addAttribute(cn("animate mt-8 max-w-none md:min-w-[45ch]", integ.typography.class), "class")}> ${renderSlot($$result, $$slots["default"])} </div> </article> </main> ${renderComponent($$result, "BackToTop", $$BackToTop, {
		"header": "content-header",
		"content": "content"
	})} ` })}`;
}, "C:/Users/22790/astro-blog2/src/layouts/IndividualPage.astro", void 0);
//#endregion
export { $$IndividualPage as t };
