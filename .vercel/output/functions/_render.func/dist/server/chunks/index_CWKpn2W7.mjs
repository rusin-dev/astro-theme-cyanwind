import { r as __exportAll } from "./rolldown-runtime_DWOOXAbm.mjs";
import { A as defineScriptVars, D as maybeRenderHead, c as renderComponent, g as renderTemplate } from "./server_BvovAKAK.mjs";
import { a as createComponent } from "./_astro_assets_DPhqHtnZ.mjs";
import { a as $$SimpleIcon, h as $$Icon, i as $$PublicationSection, r as $$ResearchProjectSection, u as $$Button } from "./i18n_UusxS-i0.mjs";
import { t as config } from "./site.config_BT70j0O1.mjs";
import { t as $$CommonPage } from "./CommonPage_CFoykwi0.mjs";
//#region src/pages/academic/index.astro
var academic_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "PageLayout", $$CommonPage, {
		"title": "学术",
		"headings": [
			{
				depth: 2,
				slug: "about-me",
				text: "关于我"
			},
			{
				depth: 2,
				slug: "research-interests",
				text: "研究爱好"
			},
			{
				depth: 2,
				slug: "publications",
				text: "专栏"
			},
			{
				depth: 2,
				slug: "open-source-projects",
				text: "开源仓库"
			}
		],
		"info": {
			slug: "/academic",
			hideComment: true
		}
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<h2 id="about-me">关于我<a class="anchor" href="#about-me">#</a></h2> <p>
我在 JCSY 和 SH 学习，坐标 ZJ，准备参加 CSP。
</p> <p>CSP-J 目标 2=，CSP-S 目标进复赛！</p> <p>
近期强力学术中，勿扰
</p> <p>这是 NOI 大纲，欢迎下载。</p> ${renderComponent($$result, "Button", $$Button, {
		"title": "下载大纲",
		"class": "w-fit",
		"href": "https://www.noi.cn/upload/resources/file/2025/04/18/NOI_Syllabus_Edition_2025.pdf",
		"target": "_blank"
	}, { "before": ($$result) => renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"class": "size-5",
		"name": "download",
		"slot": "before"
	})}` })} <h2 id="research-interests">
研究爱好<a class="anchor" href="#research-interests">#</a> </h2> <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"> ${[{
		title: "C++",
		description: "树、图论、动态规划、数据结构。",
		icon: "pytorch"
	}, {
		title: "Web",
		description: "网络安全、网站建设、前端框架",
		icon: "huggingface"
	}].map((interest) => renderTemplate`<div class="group relative overflow-hidden rounded-xl border border-border bg-card p-4 transition-all hover:border-foreground/25 hover:shadow-md"> <div class="flex items-start gap-4"> <div class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20"> ${renderComponent($$result, "SimpleIcon", $$SimpleIcon, {
		"class": "size-5 text-primary transition-transform duration-300 group-hover:scale-110",
		"name": interest.icon
	})} </div> <div class="flex-1"> <p class="text-xl font-medium leading-tight text-foreground transition-colors group-hover:text-primary"> ${interest.title} </p> <p class="text-sm leading-relaxed text-muted-foreground">${interest.description}</p> </div> </div> </div>`)} </div> <h2 id="publications">专栏<a class="anchor" href="#publications">#</a></h2> ${renderComponent($$result, "PublicationSection", $$PublicationSection, { "publications": [{
		title: "在 Hexo 中复现洛谷插件",
		authors: [{
			name: "_ruyingsuixing_",
			isMe: true
		}],
		venue: "洛谷专栏",
		year: "2026",
		type: "conference",
		abstract: "在 Hexo 中通过自定义 markedjs 解析和 css 使用洛谷的 markdown-it。",
		links: [{
			type: "洛谷",
			href: "https://www.luogu.com.cn/article/79x8skck"
		}, {
			type: "本站",
			href: "/article/luogu-plugin-in-hexo"
		}],
		status: "published"
	}] })} <h2 id="open-source-projects">
开源仓库<a class="anchor" href="#open-source-projects">#</a> </h2> ${renderComponent($$result, "ResearchProjectSection", $$ResearchProjectSection, { "projects": [{
		title: "暂无项目",
		description: "暂无项目",
		category: "无",
		status: "active",
		links: [{
			type: "github",
			href: "#",
			label: "Code"
		}]
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
}, "C:/Users/22790/astro-blog2/src/pages/academic/index.astro", void 0);
var $$file = "C:/Users/22790/astro-blog2/src/pages/academic/index.astro";
var $$url = "/academic";
//#endregion
//#region \0virtual:astro:page:src/pages/academic/index@_@astro
var page = () => academic_exports;
//#endregion
export { page };
