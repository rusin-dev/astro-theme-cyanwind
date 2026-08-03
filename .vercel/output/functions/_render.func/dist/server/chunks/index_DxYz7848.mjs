import { r as __exportAll } from "./rolldown-runtime_DWOOXAbm.mjs";
import { A as defineScriptVars, D as maybeRenderHead, c as renderComponent, g as renderTemplate } from "./server_BvovAKAK.mjs";
import { a as createComponent, i as $$Image } from "./_astro_assets_DPhqHtnZ.mjs";
import { h as $$Icon, u as $$Button } from "./i18n_UusxS-i0.mjs";
import { t as config } from "./site.config_BT70j0O1.mjs";
import { t as $$CommonPage } from "./CommonPage_CFoykwi0.mjs";
import { i as $$ProjectSection, n as alipay_qrcode_default, r as $$Sponsors, t as wechat_qrcode_default } from "./wechat-qrcode_ClHeNXrW.mjs";
//#region src/pages/en/projects/index.astro
var projects_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "PageLayout", $$CommonPage, {
		"title": "Projects",
		"headings": [{
			depth: 2,
			slug: "projects",
			text: "Projects"
		}, {
			depth: 2,
			slug: "sponsorship",
			text: "Sponsorship"
		}],
		"info": {
			slug: "/projects",
			hideComment: true
		}
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<p>
If you find my projects helpful or interesting, consider sponsoring me to keep me motivated.
</p> ${renderComponent($$result, "Button", $$Button, {
		"title": "Checkout sponsorship",
		"class": "w-fit",
		"href": "#sponsorship"
	}, { "before": ($$result) => renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"class": "size-5",
		"name": "receive-money",
		"slot": "before"
	})}` })} <h2 id="projects">Projects</h2> ${renderComponent($$result, "ProjectSection", $$ProjectSection, { "project": [{
		name: "Classmate Project",
		description: "Simple Python Editor.",
		image: "byddl.webp",
		links: [{
			type: "github",
			href: "https://github.com/chengzi404-hash/Python-Editor"
		}, {
			type: "gitee",
			href: "https://gitee.com/chengzi404-byte/Python-Editor"
		}]
	}] })}  <h2 id="sponsorship">Sponsorship</h2> <p>
Please leave a message or contact me directly after sponsoring to be added to the sponsor list.
    Wishing you joy!
</p> <div class="flex flex-col justify-center gap-4 sm:flex-row"> ${[{
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
	})} </div>`)} </div> <p>Thanks to these supporters:</p> ${renderComponent($$result, "Sponsors", $$Sponsors, { "sponsors": [{
		name: "Sponsor 1",
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
}, "C:/Users/22790/astro-blog2/src/pages/en/projects/index.astro", void 0);
var $$file = "C:/Users/22790/astro-blog2/src/pages/en/projects/index.astro";
var $$url = "/en/projects";
//#endregion
//#region \0virtual:astro:page:src/pages/en/projects/index@_@astro
var page = () => projects_exports;
//#endregion
export { page };
