import { r as __exportAll } from "./rolldown-runtime_DWOOXAbm.mjs";
import { D as maybeRenderHead, c as renderComponent, g as renderTemplate } from "./server_BvovAKAK.mjs";
import { a as createComponent, i as $$Image } from "./_astro_assets_DPhqHtnZ.mjs";
import { g as $$Card, h as $$Icon, s as $$Label, u as $$Button } from "./i18n_UusxS-i0.mjs";
import { t as config } from "./site.config_BT70j0O1.mjs";
import { i as $$BlogStats, n as avatar_default, r as $$Section, t as $$GitHubActivityCalendar } from "./GitHubActivityCalendar_DYFkRoet.mjs";
import { t as $$BaseLayout } from "./BaseLayout_3stYzWA0.mjs";
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "PageLayout", $$BaseLayout, {
		"meta": { title: "" },
		"highlightColor": "#659EB966"
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<main class="flex w-full flex-col items-center"> <section class="animate mb-10 flex flex-col items-center gap-y-7" id="content-header"> <div class="flex flex-row items-center gap-x-6"> ${renderComponent($$result, "Image", $$Image, {
		"src": avatar_default,
		"alt": "profile",
		"class": "h-36 w-auto rounded-lg border p-1",
		"loading": "eager",
		"fetchpriority": "high",
		"decoding": "async",
		"widths": [
			144,
			288,
			432
		],
		"sizes": "144px"
	})} <div class="flex flex-col gap-y-4"> <h1 class="text-3xl font-bold">${config.author}</h1> <div class="flex flex-wrap gap-x-1 gap-y-1"> ${config.personal?.location && renderTemplate`${renderComponent($$result, "Label", $$Label, { "title": config.personal.location }, { "icon": ($$result) => renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"name": "location",
		"class": "size-4",
		"slot": "icon"
	})}` })}`} ${config.personal?.githubUsername && renderTemplate`${renderComponent($$result, "Label", $$Label, {
		"title": "Github",
		"as": "a",
		"href": `https://github.com/${config.personal.githubUsername}`,
		"target": "_blank"
	}, { "icon": ($$result) => renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"name": "github",
		"class": "size-4",
		"slot": "icon"
	})}` })}`} ${config.personal?.email && renderTemplate`${renderComponent($$result, "Label", $$Label, {
		"title": "Email",
		"as": "a",
		"href": `mailto:${config.personal.email}`
	}, { "icon": ($$result) => renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"name": "email",
		"class": "size-4",
		"slot": "icon"
	})}` })}`} ${config.personal?.googleScholar && renderTemplate`${renderComponent($$result, "Label", $$Label, {
		"title": "Scholar",
		"as": "a",
		"href": config.personal.googleScholar
	}, { "icon": ($$result) => renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"name": "earth",
		"class": "size-4",
		"slot": "icon"
	})}` })}`} </div> </div> </div> <div id="content" class="animate flex flex-col gap-y-10 md:w-4/5 lg:w-5/6"> ${renderComponent($$result, "Section", $$Section, { "title": "关于" }, { "default": ($$result) => renderTemplate` <p class="text-muted-foreground">一个蒟蒻 OIer，备战 CSP 中。<br>座右铭：亲身体验、终生实践。
</p> ${renderComponent($$result, "Button", $$Button, {
		"title": "更多关于我",
		"class": "w-fit self-end",
		"href": "/about",
		"style": "ahead"
	})} ` })} ${renderComponent($$result, "Section", $$Section, { "title": "信奥" }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "Card", $$Card, {
		"as": "a",
		"heading": "CSP-J/S 即将来临",
		"subheading": "准备比赛吧！",
		"date": "🧐学习中",
		"href": "/article/ccf"
	}, {})} ` })} ${renderComponent($$result, "Section", $$Section, { "title": "统计" }, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "BlogStats", $$BlogStats, { "blogStartDate": config.personal?.blogStartDate ? new Date(config.personal.blogStartDate) : /* @__PURE__ */ new Date("2026-08-02") })} ` })} ${config.personal?.githubUsername && renderTemplate`${renderComponent($$result, "GitHubActivityCalendar", $$GitHubActivityCalendar, { "username": config.personal.githubUsername })}`} </div> </section> </main> ` })}`;
}, "C:/Users/22790/astro-blog2/src/pages/index.astro", void 0);
var $$file = "C:/Users/22790/astro-blog2/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
