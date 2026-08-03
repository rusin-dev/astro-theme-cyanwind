import { r as __exportAll } from "./rolldown-runtime_DWOOXAbm.mjs";
import { A as defineScriptVars, D as maybeRenderHead, c as renderComponent, g as renderTemplate } from "./server_BvovAKAK.mjs";
import { a as createComponent, i as $$Image } from "./_astro_assets_DPhqHtnZ.mjs";
import { h as $$Icon, u as $$Button } from "./i18n_UusxS-i0.mjs";
import { t as config } from "./site.config_BT70j0O1.mjs";
import { t as $$CommonPage } from "./CommonPage_CFoykwi0.mjs";
import { i as $$ProjectSection, n as alipay_qrcode_default, r as $$Sponsors, t as wechat_qrcode_default } from "./wechat-qrcode_ClHeNXrW.mjs";
//#region src/pages/projects/index.astro
var projects_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "PageLayout", $$CommonPage, {
		"title": "x项目",
		"headings": [{
			depth: 2,
			slug: "projects",
			text: "项目"
		}, {
			depth: 2,
			slug: "sponsorship",
			text: "赞助"
		}],
		"info": {
			slug: "/projects",
			hideComment: true
		}
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="mb-8 flex items-center justify-between"> <p class="text-muted-foreground">如果你觉得我的项目还不错，可以赞助我，让我有动力继续做下去。</p> ${renderComponent($$result, "Button", $$Button, {
		"title": "赞助",
		"class": "w-fit",
		"href": "#sponsorship"
	}, { "before": ($$result) => renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"class": "size-5",
		"name": "receive-money",
		"slot": "before"
	})}` })} </div>  <h2 id="projects" class="mb-8 text-2xl font-semibold">Projects</h2> ${renderComponent($$result, "ProjectSection", $$ProjectSection, { "project": [{
		name: "同学项目：pyIDE",
		description: "Simple Python Editor.",
		image: "byddl.webp",
		links: [{
			type: "github",
			href: "https://github.com/chengzi404-hash/Python-Editor"
		}, {
			type: "gitee",
			href: "https://gitee.com/chengzi404-byte/Python-Editor"
		}]
	}] })}  <h2 id="sponsorship">赞助</h2> <p>请在赞助后留言或主动联系我，可以被放入赞助人列表，祝你开心。</p> <div class="flex flex-col justify-center gap-4 sm:flex-row"> ${[{
		name: "WeChat",
		icon: "wechat-pay",
		image: wechat_qrcode_default
	}, {
		name: "Alipay",
		icon: "alipay",
		image: alipay_qrcode_default
	}].map((item) => renderTemplate`<div class="group relative justify-center overflow-hidden rounded-xl border bg-white"> <div class="absolute bottom-0 end-0 start-0 top-0 flex items-center justify-center transition-opacity group-hover:opacity-0"> ${renderComponent($$result, "Icon", $$Icon, {
		"class": "size-20",
		"name": item.icon
	})} </div> ${renderComponent($$result, "Image", $$Image, {
		"class": "mx-auto my-0 max-w-60 opacity-30 blur-sm transition-opacity group-hover:opacity-100 group-hover:blur-none",
		"src": item.image,
		"alt": item.name,
		"loading": "lazy"
	})} </div>`)} </div> <p>感谢这些人的支持：</p> ${renderComponent($$result, "Sponsors", $$Sponsors, { "sponsors": [{
		name: "赞助者 1",
		amount: "10.0",
		date: "2026-08-04"
	}] })} ` })} <script type="module">${defineScriptVars({
		npmCDN: config.npmCDN,
		walineServer: config.integ.waline.server
	})}
  const normalizePath = (path) => {
    if (path === '/') return path
    return path.endsWith('/') ? path.slice(0, -1) : path
  }

  const loadPageviewCount = async () => {
    const pageview = await import(\`\${npmCDN}/@waline/client@v3/dist/pageview.js\`)
    pageview.pageviewCount({
      serverURL: walineServer,
      path: normalizePath(window.location.pathname)
    })
  }

  await loadPageviewCount()
<\/script>`;
}, "C:/Users/22790/astro-blog2/src/pages/projects/index.astro", void 0);
var $$file = "C:/Users/22790/astro-blog2/src/pages/projects/index.astro";
var $$url = "/projects";
//#endregion
//#region \0virtual:astro:page:src/pages/projects/index@_@astro
var page = () => projects_exports;
//#endregion
export { page };
