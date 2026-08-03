import { D as maybeRenderHead, V as createAstro, c as renderComponent, g as renderTemplate, k as addAttribute, r as spreadAttributes } from "./server_BvovAKAK.mjs";
import { a as createComponent, i as $$Image } from "./_astro_assets_DPhqHtnZ.mjs";
import { h as $$Icon, v as cn } from "./i18n_UusxS-i0.mjs";
//#region src/components/projects/ProjectSection.astro
createAstro("https://blog.rusin7.com/");
var $$ProjectSection = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ProjectSection;
	const { class: className, project, ...props } = Astro.props;
	const images = /* #__PURE__ */ Object.assign({
		"/src/assets/projects/byddl.webp": () => import("./byddl_BQTZvS0J.mjs"),
		"/src/assets/projects/lumina.webp": () => import("./lumina_CWz_9pyk.mjs")
	});
	const projectIconSet = {
		github: "github-circle",
		site: "earth",
		doc: "document",
		release: "package",
		gitee: "gitee"
	};
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute((className ?? "") + " astro-c42hbzau", "class")}${spreadAttributes(props)}> <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 astro-c42hbzau"> ${project.map((project, index) => {
		var imagePath = null;
		if (project.image) {
			imagePath = "/src/assets/projects/" + project.image;
			if (!images[imagePath]) throw new Error(`"${imagePath}" does not exist in glob: "src/assets/projects/*.{jpeg,jpg,png,gif}"`);
		}
		return renderTemplate`<div class="project-card group relative overflow-hidden rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm transition-all duration-500 hover:border-border hover:bg-card/50 hover:shadow-xl hover:shadow-primary/5 astro-c42hbzau"${addAttribute(`animation-delay: ${index * 100}ms`, "style")}>  <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 astro-c42hbzau"></div>  ${imagePath && renderTemplate`<div class="absolute inset-0 overflow-hidden astro-c42hbzau"> ${renderComponent($$result, "Image", $$Image, {
			"class": "h-full w-full object-cover opacity-0 blur-sm transition-all duration-700 group-hover:opacity-10 group-hover:blur-none group-hover:scale-110 astro-c42hbzau",
			"src": images[imagePath](),
			"alt": project.name,
			"loading": "lazy"
		})} </div>`}  <div class="relative z-10 flex h-full min-h-[200px] flex-col justify-between p-5 sm:p-6 astro-c42hbzau">  <div class="flex-1 space-y-3 astro-c42hbzau"> <div class="flex items-start justify-between gap-4 astro-c42hbzau"> <a${addAttribute(project.links.find((link) => link.type === "site")?.href || project.links[0].href, "href")} target="_blank" class="group/title no-underline astro-c42hbzau"> <h3 class="text-xl font-semibold tracking-tight text-foreground transition-colors group-hover/title:text-primary astro-c42hbzau"> ${project.name} </h3> </a> ${imagePath && renderTemplate`<div class="flex-shrink-0 overflow-hidden rounded-lg border border-border/30 bg-background/60 p-1.5 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/30 group-hover:bg-background/80 astro-c42hbzau"> ${renderComponent($$result, "Image", $$Image, {
			"class": "h-10 w-10 object-cover opacity-80 transition-opacity group-hover:opacity-100 astro-c42hbzau",
			"src": images[imagePath](),
			"alt": project.name,
			"loading": "lazy"
		})} </div>`} </div> <p class="text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground/80 astro-c42hbzau"> ${project.description} </p> </div>  <div class="mt-4 flex items-center gap-2 border-t border-border/30 pt-3 astro-c42hbzau"> ${project.links.map((link) => {
			const icon = projectIconSet[link.type];
			return renderTemplate`<a${addAttribute(link.href, "href")} class="group/link flex items-center gap-1.5 rounded-full border border-border/40 bg-background/40 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:shadow-md hover:shadow-primary/20 astro-c42hbzau"${addAttribute(link.type, "aria-label")} target="_blank"> ${renderComponent($$result, "Icon", $$Icon, {
				"class": "size-3.5 transition-transform group-hover/link:scale-110 astro-c42hbzau",
				"name": icon
			})} <span class="capitalize astro-c42hbzau">${link.type}</span> </a>`;
		})} </div> </div>  <div class="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 astro-c42hbzau"></div> </div>`;
	})} </div> </div>`;
}, "C:/Users/22790/astro-blog2/src/components/projects/ProjectSection.astro", void 0);
//#endregion
//#region src/components/projects/Sponsors.astro
createAstro("https://blog.rusin7.com/");
var $$Sponsors = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Sponsors;
	const { class: className, sponsors, ...props } = Astro.props;
	const isEnglish = Astro.url.pathname.includes("/en/");
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(cn("border px-3 sm:px-4 py-2 rounded-xl", className), "class")}${spreadAttributes(props)}> <table class="my-0"> <tr class="text-start"> <th>${isEnglish ? "Name" : "姓名"}</th> <th>${isEnglish ? "Amount" : "金额"}</th> <th>${isEnglish ? "Date" : "日期"}</th> </tr> ${sponsors.map((sponsor) => renderTemplate`<tr> <td>${sponsor.name}</td> <td>${sponsor.amount}</td> <td>${sponsor.date}</td> </tr>`)} </table> </div>`;
}, "C:/Users/22790/astro-blog2/src/components/projects/Sponsors.astro", void 0);
//#endregion
//#region src/assets/alipay-qrcode.jpg
var alipay_qrcode_default = new Proxy({
	"src": "/_astro/alipay-qrcode.DVf925Hm.jpg",
	"width": 640,
	"height": 640,
	"format": "png"
}, { get(target, name, receiver) {
	if (name === "clone") return structuredClone(target);
	if (name === "fsPath") return "C:/Users/22790/astro-blog2/src/assets/alipay-qrcode.jpg";
	return target[name];
} });
//#endregion
//#region src/assets/wechat-qrcode.jpg
var wechat_qrcode_default = new Proxy({
	"src": "/_astro/wechat-qrcode.C4Pzl1gn.jpg",
	"width": 1080,
	"height": 1080,
	"format": "webp"
}, { get(target, name, receiver) {
	if (name === "clone") return structuredClone(target);
	if (name === "fsPath") return "C:/Users/22790/astro-blog2/src/assets/wechat-qrcode.jpg";
	return target[name];
} });
//#endregion
export { $$ProjectSection as i, alipay_qrcode_default as n, $$Sponsors as r, wechat_qrcode_default as t };
