import { R as createVNode, t as __astro_tag_component__, u as Fragment } from "./server_BvovAKAK.mjs";
//#region src/content/blogs/writing-markdown-mdx/index.mdx
var frontmatter = {
	"title": "写作指南：Markdown / MDX",
	"publishDate": "2026-01-11T00:00:00.000Z",
	"updatedDate": "2026-01-11T00:00:00.000Z",
	"description": "主题内支持的 Markdown 扩展、数学公式、代码高亮与一些写作约定。",
	"category": "tech",
	"tags": [
		"markdown",
		"mdx",
		"writing"
	],
	"language": "zh",
	"minutesRead": "1 min read",
	"words": 187
};
function getHeadings() {
	return [
		{
			"depth": 2,
			"slug": "1-markdown-支持范围",
			"text": "1. Markdown 支持范围"
		},
		{
			"depth": 2,
			"slug": "2-数学公式katex",
			"text": "2. 数学公式（KaTeX）"
		},
		{
			"depth": 2,
			"slug": "3-代码块增强差异高亮",
			"text": "3. 代码块增强（差异/高亮）"
		},
		{
			"depth": 2,
			"slug": "4-什么时候用-mdx",
			"text": "4. 什么时候用 MDX"
		}
	];
}
function _createMdxContent(props) {
	const { Fragment } = props.components || {};
	if (!Fragment) _missingMdxReference("Fragment", true);
	return createVNode(Fragment, { "set:html": "<h2 id=\"1-markdown-支持范围\">1. Markdown 支持范围<a class=\"anchor\" href=\"#1-markdown-支持范围\">#</a></h2>\n<p>主题默认启用了常用扩展：</p>\n<ul>\n<li>GFM：表格、删除线、任务列表等</li>\n<li>数学公式：KaTeX（<code>$...$</code> / <code>$$...$$</code>）</li>\n<li>代码高亮：Shiki（支持标题、差异标注等）</li>\n</ul>\n<h2 id=\"2-数学公式katex\">2. 数学公式（KaTeX）<a class=\"anchor\" href=\"#2-数学公式katex\">#</a></h2>\n<p>行内：</p>\n<div class=\"astro-code astro-code-themes github-light github-dark\" style=\"background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"md\"><pre><code><span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">欧拉公式：$e^{i</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">\\\\</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">pi}+1=0$</span></span></code></pre><span class=\"language transition-opacity duration-300 absolute top-3 right-0 ps-1 pe-3 text-sm bg-muted text-muted-foreground select-none\">md</span><button class=\"copy transition-opacity duration-300 opacity-0 absolute top-3 right-3 text-muted-foreground p-1 box-content border border-border rounded bg-primary-foreground\" data-code=\"欧拉公式：$e^{i\\\\pi}+1=0$\" onclick=\"\n          navigator.clipboard.writeText(this.dataset.code);\n          this.classList.add(&#x27;copied&#x27;);\n          setTimeout(() => this.classList.remove(&#x27;copied&#x27;), 2000)\n        \"><div class=\"ready\"><svg class=\"size-5\"><use href=\"/icons/code.svg#mingcute-clipboard-line\"></use></svg></div><div class=\"success hidden\"><svg class=\"size-5\"><use href=\"/icons/code.svg#mingcute-file-check-line\"></use></svg></div></button></div>\n<p>块级：</p>\n<div class=\"astro-code astro-code-themes github-light github-dark\" style=\"background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"md\"><pre><code><span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">$$</span></span>\n<span class=\"line\"><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">\\\\</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">int_0^1 x^2 dx = </span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\">\\\\</span><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">frac{1}{3}</span></span>\n<span class=\"line\"><span style=\"color:#24292E;--shiki-dark:#E1E4E8\">$$</span></span></code></pre><span class=\"language transition-opacity duration-300 absolute top-3 right-0 ps-1 pe-3 text-sm bg-muted text-muted-foreground select-none\">md</span><button class=\"copy transition-opacity duration-300 opacity-0 absolute top-3 right-3 text-muted-foreground p-1 box-content border border-border rounded bg-primary-foreground\" data-code=\"$$\n\\\\int_0^1 x^2 dx = \\\\frac{1}{3}\n$$\" onclick=\"\n          navigator.clipboard.writeText(this.dataset.code);\n          this.classList.add(&#x27;copied&#x27;);\n          setTimeout(() => this.classList.remove(&#x27;copied&#x27;), 2000)\n        \"><div class=\"ready\"><svg class=\"size-5\"><use href=\"/icons/code.svg#mingcute-clipboard-line\"></use></svg></div><div class=\"success hidden\"><svg class=\"size-5\"><use href=\"/icons/code.svg#mingcute-file-check-line\"></use></svg></div></button></div>\n<h2 id=\"3-代码块增强差异高亮\">3. 代码块增强（差异/高亮）<a class=\"anchor\" href=\"#3-代码块增强差异高亮\">#</a></h2>\n<p>你可以在代码中使用注释标记来展示变更（示例来自主题的高亮 transformer）：</p>\n<div class=\"astro-code astro-code-themes github-light github-dark has-diff\" style=\"background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"ts\"><pre><code><span class=\"line diff remove\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">const</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> a</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> =</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> 1</span></span>\n<span class=\"line diff add\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">const</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> a</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> =</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> 2</span></span></code></pre><span class=\"language transition-opacity duration-300 absolute top-3 right-0 ps-1 pe-3 text-sm bg-muted text-muted-foreground select-none\">ts</span><button class=\"copy transition-opacity duration-300 opacity-0 absolute top-3 right-3 text-muted-foreground p-1 box-content border border-border rounded bg-primary-foreground\" data-code=\"const a = 1 // [!code --]\nconst a = 2 // [!code ++]\" onclick=\"\n          navigator.clipboard.writeText(this.dataset.code);\n          this.classList.add(&#x27;copied&#x27;);\n          setTimeout(() => this.classList.remove(&#x27;copied&#x27;), 2000)\n        \"><div class=\"ready\"><svg class=\"size-5\"><use href=\"/icons/code.svg#mingcute-clipboard-line\"></use></svg></div><div class=\"success hidden\"><svg class=\"size-5\"><use href=\"/icons/code.svg#mingcute-file-check-line\"></use></svg></div></button></div>\n<p>也可以做行高亮：</p>\n<div class=\"astro-code astro-code-themes github-light github-dark has-highlighted\" style=\"background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"ts\"><pre><code><span class=\"line highlighted\"><span style=\"color:#D73A49;--shiki-dark:#F97583\">const</span><span style=\"color:#005CC5;--shiki-dark:#79B8FF\"> token</span><span style=\"color:#D73A49;--shiki-dark:#F97583\"> =</span><span style=\"color:#032F62;--shiki-dark:#9ECBFF\"> 'secret'</span></span></code></pre><span class=\"language transition-opacity duration-300 absolute top-3 right-0 ps-1 pe-3 text-sm bg-muted text-muted-foreground select-none\">ts</span><button class=\"copy transition-opacity duration-300 opacity-0 absolute top-3 right-3 text-muted-foreground p-1 box-content border border-border rounded bg-primary-foreground\" data-code=\"const token = &#x27;secret&#x27; // [!code highlight]\" onclick=\"\n          navigator.clipboard.writeText(this.dataset.code);\n          this.classList.add(&#x27;copied&#x27;);\n          setTimeout(() => this.classList.remove(&#x27;copied&#x27;), 2000)\n        \"><div class=\"ready\"><svg class=\"size-5\"><use href=\"/icons/code.svg#mingcute-clipboard-line\"></use></svg></div><div class=\"success hidden\"><svg class=\"size-5\"><use href=\"/icons/code.svg#mingcute-file-check-line\"></use></svg></div></button></div>\n<h2 id=\"4-什么时候用-mdx\">4. 什么时候用 MDX<a class=\"anchor\" href=\"#4-什么时候用-mdx\">#</a></h2>\n<p>当你需要在文章里使用组件（例如 <code>Aside</code>、<code>Tabs</code>、<code>GithubCard</code> 等）时，请使用 <code>.mdx</code>，并在文件顶部 <code>import</code> 组件。</p>\n<p>组件用法示例文档：见 “MDX 组件使用”。</p>" });
}
function MDXContent(props = {}) {
	const { wrapper: MDXLayout } = props.components || {};
	return MDXLayout ? createVNode(MDXLayout, {
		...props,
		children: createVNode(_createMdxContent, { ...props })
	}) : _createMdxContent(props);
}
function _missingMdxReference(id, component) {
	throw new Error("Expected " + (component ? "component" : "object") + " `" + id + "` to be defined: you likely forgot to import, pass, or provide it.");
}
var url = "src/content/blogs/writing-markdown-mdx/index.mdx";
var file = "C:/Users/22790/astro-blog2/src/content/blogs/writing-markdown-mdx/index.mdx";
var Content = (props = {}) => MDXContent({
	...props,
	components: {
		Fragment,
		...props.components
	}
});
Content[Symbol.for("mdx-component")] = true;
Content[Symbol.for("astro.needsHeadRendering")] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/22790/astro-blog2/src/content/blogs/writing-markdown-mdx/index.mdx";
__astro_tag_component__(Content, "astro:jsx");
//#endregion
export { Content, Content as default, file, frontmatter, getHeadings, url };
