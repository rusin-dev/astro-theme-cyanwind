import { r as __exportAll } from "./rolldown-runtime_DWOOXAbm.mjs";
import { A as defineScriptVars, D as maybeRenderHead, c as renderComponent, g as renderTemplate } from "./server_BvovAKAK.mjs";
import { a as createComponent } from "./_astro_assets_DPhqHtnZ.mjs";
import { a as $$SimpleIcon, h as $$Icon, i as $$PublicationSection, r as $$ResearchProjectSection, u as $$Button } from "./i18n_UusxS-i0.mjs";
import { t as config } from "./site.config_BT70j0O1.mjs";
import { t as $$CommonPage } from "./CommonPage_CFoykwi0.mjs";
//#region src/pages/en/academic/index.astro
var academic_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "PageLayout", $$CommonPage, {
		"title": "Academic",
		"headings": [
			{
				depth: 2,
				slug: "about-me",
				text: "About Me"
			},
			{
				depth: 2,
				slug: "research-interests",
				text: "Research Interests"
			},
			{
				depth: 2,
				slug: "publications",
				text: "Publications"
			},
			{
				depth: 2,
				slug: "open-source-projects",
				text: "Open Source Projects"
			}
		],
		"info": {
			slug: "/academic",
			hideComment: true
		}
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<h2 id="about-me">About Me<a class="anchor" href="#about-me">#</a></h2> <p>
I study at JCSY and SH, based in ZJ, preparing for the CSP.
</p> <p>CSP-J target: 2=, CSP-S target: advance to the final round!</p> <p>
Intense academic work in progress, do not disturb.
</p> <p>This is the NOI syllabus, feel free to download.</p> ${renderComponent($$result, "Button", $$Button, {
		"title": "Download Syllabus",
		"class": "w-fit",
		"href": "https://www.noi.cn/upload/resources/file/2025/04/18/NOI_Syllabus_Edition_2025.pdf",
		"target": "_blank"
	}, { "before": ($$result) => renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"class": "size-5",
		"name": "download",
		"slot": "before"
	})}` })} <h2 id="research-interests">
Research Interests<a class="anchor" href="#research-interests">#</a> </h2> <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"> ${[{
		title: "C++",
		description: "Trees, graph theory, dynamic programming, data structures.",
		icon: "pytorch"
	}, {
		title: "Web",
		description: "Cybersecurity, website building, frontend frameworks.",
		icon: "huggingface"
	}].map((interest) => renderTemplate`<div class="group relative overflow-hidden rounded-xl border border-border bg-card p-4 transition-all hover:border-foreground/25 hover:shadow-md"> <div class="flex items-start gap-4"> <div class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20"> ${renderComponent($$result, "SimpleIcon", $$SimpleIcon, {
		"class": "size-5 text-primary transition-transform duration-300 group-hover:scale-110",
		"name": interest.icon
	})} </div> <div class="flex-1"> <p class="text-xl font-medium leading-tight text-foreground transition-colors group-hover:text-primary"> ${interest.title} </p> <p class="text-sm leading-relaxed text-muted-foreground">${interest.description}</p> </div> </div> </div>`)} </div> <h2 id="publications">Publications<a class="anchor" href="#publications">#</a></h2> ${renderComponent($$result, "PublicationSection", $$PublicationSection, { "publications": [{
		title: "Recreating the Luogu Plugin in Hexo",
		authors: [{
			name: "_ruyingsuixing_",
			isMe: true
		}],
		venue: "Luogu Blog",
		year: "2026",
		type: "conference",
		abstract: "Recreating Luogu's markdown-it parsing and CSS in Hexo via custom markedjs and styles.",
		links: [{
			type: "Luogu",
			href: "https://www.luogu.com.cn/article/79x8skck"
		}, {
			type: "This Site",
			href: "/article/luogu-plugin-in-hexo"
		}],
		status: "published"
	}] })} <h2 id="open-source-projects">
Open Source Projects<a class="anchor" href="#open-source-projects">#</a> </h2> ${renderComponent($$result, "ResearchProjectSection", $$ResearchProjectSection, { "projects": [{
		title: "No projects yet",
		description: "No projects yet",
		category: "None",
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
}, "C:/Users/22790/astro-blog2/src/pages/en/academic/index.astro", void 0);
var $$file = "C:/Users/22790/astro-blog2/src/pages/en/academic/index.astro";
var $$url = "/en/academic";
//#endregion
//#region \0virtual:astro:page:src/pages/en/academic/index@_@astro
var page = () => academic_exports;
//#endregion
export { page };
