import { R as createVNode, t as __astro_tag_component__, u as Fragment } from "./server_BvovAKAK.mjs";
import { f as $$TabItem, l as $$Spoiler, m as $$Aside, p as $$Tabs } from "./i18n_UusxS-i0.mjs";
import { a as $$LinkPreview, i as $$ImageGroup, o as $$GithubCard, r as $$QRCode, t as $$WebVideo } from "./advanced_DT48yQJJ.mjs";
//#region src/content/blogs/mdx-components/index.mdx
var frontmatter = {
	"title": "MDX 组件使用：User & Advanced",
	"publishDate": "2026-01-11T00:00:00.000Z",
	"updatedDate": "2026-01-11T00:00:00.000Z",
	"description": "文章内组件（Aside/Tabs 等）与高级组件（LinkPreview/GithubCard 等）的使用方式。",
	"category": "tech",
	"tags": ["mdx", "components"],
	"language": "zh",
	"minutesRead": "1 min read",
	"words": 101
};
function getHeadings() {
	return [
		{
			"depth": 2,
			"slug": "1-必须使用-mdx",
			"text": "1. 必须使用 MDX"
		},
		{
			"depth": 2,
			"slug": "2-user-组件示例",
			"text": "2. User 组件示例"
		},
		{
			"depth": 2,
			"slug": "3-advanced-组件示例",
			"text": "3. Advanced 组件示例"
		},
		{
			"depth": 3,
			"slug": "github-卡片",
			"text": "GitHub 卡片"
		},
		{
			"depth": 3,
			"slug": "链接预览",
			"text": "链接预览"
		},
		{
			"depth": 3,
			"slug": "二维码",
			"text": "二维码"
		},
		{
			"depth": 3,
			"slug": "图片组等高拼图",
			"text": "图片组（等高拼图）"
		},
		{
			"depth": 3,
			"slug": "内嵌视频",
			"text": "内嵌视频"
		}
	];
}
function _createMdxContent(props) {
	const { Fragment: Fragment$1 } = props.components || {};
	if (!Fragment$1) _missingMdxReference("Fragment", true);
	return createVNode(Fragment, { children: [
		createVNode(Fragment$1, { "set:html": "<h2 id=\"1-必须使用-mdx\">1. 必须使用 MDX<a class=\"anchor\" href=\"#1-必须使用-mdx\">#</a></h2>\n<p><code>.md</code> 文章无法 <code>import</code> 组件；请使用 <code>.mdx</code>（如 <code>src/content/blogs/&#x3C;slug>/index.mdx</code>）。</p>\n<h2 id=\"2-user-组件示例\">2. User 组件示例<a class=\"anchor\" href=\"#2-user-组件示例\">#</a></h2>\n" }),
		createVNode($$Aside, {
			type: "tip",
			title: "Tip",
			"set:html": "<p>你可以在 MDX 中直接使用主题组件。</p>"
		}),
		"\n",
		createVNode($$Tabs, { children: [createVNode($$TabItem, {
			label: "A",
			"set:html": "<p>A 面板内容</p>"
		}), createVNode($$TabItem, {
			label: "B",
			"set:html": "<p>B 面板内容</p>"
		})] }),
		"\n",
		createVNode($$Spoiler, {
			label: "点击展开",
			"set:html": "<p>隐藏内容写在这里。</p>"
		}),
		"\n",
		createVNode(Fragment$1, { "set:html": "<h2 id=\"3-advanced-组件示例\">3. Advanced 组件示例<a class=\"anchor\" href=\"#3-advanced-组件示例\">#</a></h2>\n<h3 id=\"github-卡片\">GitHub 卡片<a class=\"anchor\" href=\"#github-卡片\">#</a></h3>\n" }),
		createVNode($$GithubCard, { repo: "Axi404/Axi-Theme" }),
		"\n",
		createVNode(Fragment$1, { "set:html": "<h3 id=\"链接预览\">链接预览<a class=\"anchor\" href=\"#链接预览\">#</a></h3>\n" }),
		createVNode($$LinkPreview, { href: "https://astro.build/" }),
		"\n",
		createVNode(Fragment$1, { "set:html": "<h3 id=\"二维码\">二维码<a class=\"anchor\" href=\"#二维码\">#</a></h3>\n" }),
		createVNode($$QRCode, {
			content: "https://axi404.top/",
			class: "mt-2"
		}),
		"\n",
		createVNode(Fragment$1, { "set:html": "<h3 id=\"图片组等高拼图\">图片组（等高拼图）<a class=\"anchor\" href=\"#图片组等高拼图\">#</a></h3>\n" }),
		createVNode($$ImageGroup, { images: [{
			src: "https://picr2.axi404.top/1767811093734_image.webp",
			alt: "Image A",
			aspectRatio: 16 / 9
		}, {
			src: "https://picr2.axi404.top/1767811093734_image.webp",
			alt: "Image B",
			aspectRatio: 1
		}] }),
		"\n",
		createVNode(Fragment$1, { "set:html": "<h3 id=\"内嵌视频\">内嵌视频<a class=\"anchor\" href=\"#内嵌视频\">#</a></h3>\n" }),
		createVNode($$WebVideo, {
			src: "https://www.youtube.com/embed/dQw4w9WgXc",
			title: "Video"
		})
	] });
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
var url = "src/content/blogs/mdx-components/index.mdx";
var file = "C:/Users/22790/astro-blog2/src/content/blogs/mdx-components/index.mdx";
var Content = (props = {}) => MDXContent({
	...props,
	components: {
		Fragment,
		...props.components
	}
});
Content[Symbol.for("mdx-component")] = true;
Content[Symbol.for("astro.needsHeadRendering")] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/22790/astro-blog2/src/content/blogs/mdx-components/index.mdx";
__astro_tag_component__(Content, "astro:jsx");
//#endregion
export { Content, Content as default, file, frontmatter, getHeadings, url };
