import { R as createVNode, t as __astro_tag_component__, u as Fragment } from "./server_BvovAKAK.mjs";
import { f as $$TabItem, l as $$Spoiler, m as $$Aside, p as $$Tabs } from "./i18n_UusxS-i0.mjs";
import { a as $$LinkPreview, i as $$ImageGroup, o as $$GithubCard, r as $$QRCode, t as $$WebVideo } from "./advanced_DT48yQJJ.mjs";
//#region src/content/blogs/mdx-components/index-en.mdx
var frontmatter = {
	"title": "MDX Components: User & Advanced",
	"publishDate": "2026-01-11T00:00:00.000Z",
	"updatedDate": "2026-01-11T00:00:00.000Z",
	"description": "How to use built-in content components (Aside/Tabs, etc.) and advanced widgets (LinkPreview/GithubCard, etc.).",
	"category": "tech",
	"tags": ["mdx", "components"],
	"language": "en",
	"minutesRead": "1 min read",
	"words": 56
};
function getHeadings() {
	return [
		{
			"depth": 2,
			"slug": "1-use-mdx-required",
			"text": "1. Use MDX (Required)"
		},
		{
			"depth": 2,
			"slug": "2-user-component-examples",
			"text": "2. User Component Examples"
		},
		{
			"depth": 2,
			"slug": "3-advanced-component-examples",
			"text": "3. Advanced Component Examples"
		},
		{
			"depth": 3,
			"slug": "github-card",
			"text": "GitHub Card"
		},
		{
			"depth": 3,
			"slug": "link-preview",
			"text": "Link Preview"
		},
		{
			"depth": 3,
			"slug": "qr-code",
			"text": "QR Code"
		},
		{
			"depth": 3,
			"slug": "image-group-masonry-like-row",
			"text": "Image Group (masonry-like row)"
		},
		{
			"depth": 3,
			"slug": "embedded-video",
			"text": "Embedded Video"
		}
	];
}
function _createMdxContent(props) {
	const { Fragment: Fragment$1 } = props.components || {};
	if (!Fragment$1) _missingMdxReference("Fragment", true);
	return createVNode(Fragment, { children: [
		createVNode(Fragment$1, { "set:html": "<h2 id=\"1-use-mdx-required\">1. Use MDX (Required)<a class=\"anchor\" href=\"#1-use-mdx-required\">#</a></h2>\n<p><code>.md</code> cannot <code>import</code> components. Use <code>.mdx</code> (e.g. <code>src/content/blogs/&#x3C;slug>/index.mdx</code>).</p>\n<h2 id=\"2-user-component-examples\">2. User Component Examples<a class=\"anchor\" href=\"#2-user-component-examples\">#</a></h2>\n" }),
		createVNode($$Aside, {
			type: "tip",
			title: "Tip",
			"set:html": "<p>You can render theme components directly inside MDX.</p>"
		}),
		"\n",
		createVNode($$Tabs, { children: [createVNode($$TabItem, {
			label: "A",
			"set:html": "<p>Panel A content</p>"
		}), createVNode($$TabItem, {
			label: "B",
			"set:html": "<p>Panel B content</p>"
		})] }),
		"\n",
		createVNode($$Spoiler, {
			label: "Click to reveal",
			"set:html": "<p>Hidden content goes here.</p>"
		}),
		"\n",
		createVNode(Fragment$1, { "set:html": "<h2 id=\"3-advanced-component-examples\">3. Advanced Component Examples<a class=\"anchor\" href=\"#3-advanced-component-examples\">#</a></h2>\n<h3 id=\"github-card\">GitHub Card<a class=\"anchor\" href=\"#github-card\">#</a></h3>\n" }),
		createVNode($$GithubCard, { repo: "Axi404/Axi-Theme" }),
		"\n",
		createVNode(Fragment$1, { "set:html": "<h3 id=\"link-preview\">Link Preview<a class=\"anchor\" href=\"#link-preview\">#</a></h3>\n" }),
		createVNode($$LinkPreview, { href: "https://astro.build/" }),
		"\n",
		createVNode(Fragment$1, { "set:html": "<h3 id=\"qr-code\">QR Code<a class=\"anchor\" href=\"#qr-code\">#</a></h3>\n" }),
		createVNode($$QRCode, {
			content: "https://axi404.top/",
			class: "mt-2"
		}),
		"\n",
		createVNode(Fragment$1, { "set:html": "<h3 id=\"image-group-masonry-like-row\">Image Group (masonry-like row)<a class=\"anchor\" href=\"#image-group-masonry-like-row\">#</a></h3>\n" }),
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
		createVNode(Fragment$1, { "set:html": "<h3 id=\"embedded-video\">Embedded Video<a class=\"anchor\" href=\"#embedded-video\">#</a></h3>\n" }),
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
var url = "src/content/blogs/mdx-components/index-en.mdx";
var file = "C:/Users/22790/astro-blog2/src/content/blogs/mdx-components/index-en.mdx";
var Content = (props = {}) => MDXContent({
	...props,
	components: {
		Fragment,
		...props.components
	}
});
Content[Symbol.for("mdx-component")] = true;
Content[Symbol.for("astro.needsHeadRendering")] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/22790/astro-blog2/src/content/blogs/mdx-components/index-en.mdx";
__astro_tag_component__(Content, "astro:jsx");
//#endregion
export { Content, Content as default, file, frontmatter, getHeadings, url };
