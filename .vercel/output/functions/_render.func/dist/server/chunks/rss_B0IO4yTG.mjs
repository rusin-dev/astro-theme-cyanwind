import { r as __exportAll } from "./rolldown-runtime_DWOOXAbm.mjs";
import { t as getImage } from "./_astro_assets_DPhqHtnZ.mjs";
import { o as sortMDByDate, t as getBlogCollection } from "./server_DMJrJHOC.mjs";
import { t as config } from "./site.config_BT70j0O1.mjs";
import { visit } from "unist-util-visit";
import rss from "@astrojs/rss";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
//#region src/pages/rss.xml.ts
var rss_xml_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var imagesGlob = /* #__PURE__ */ Object.assign({});
var renderContent = async (post, site) => {
	function remarkReplaceImageLink() {
		return async function(tree) {
			const promises = [];
			visit(tree, "image", (node) => {
				if (node.url.startsWith("/images")) node.url = `${site}${node.url.replace("/", "")}`;
				else {
					const promise = imagesGlob[`/src/content/blogs/${post.id}/${node.url.replace("./", "")}`]?.().then(async (res) => {
						const imagePath = res?.default;
						if (imagePath) node.url = `${site}${(await getImage({ src: imagePath })).src.replace("/", "")}`;
					});
					if (promise) promises.push(promise);
				}
			});
			await Promise.all(promises);
		};
	}
	const file = await unified().use(remarkParse).use(remarkReplaceImageLink).use(remarkRehype).use(rehypeStringify).process(post.body);
	return String(file);
};
var GET = async (context) => {
	const allPostsByDate = sortMDByDate(await getBlogCollection());
	const siteUrl = context.site ?? new URL("https://blog.rusin7.com/");
	return rss({
		trailingSlash: false,
		xmlns: { h: "http://www.w3.org/TR/html4/" },
		stylesheet: "/scripts/pretty-feed-v3.xsl",
		title: config.title,
		description: config.description || "A blog built with Astro",
		site: "https://blog.rusin7.com/",
		items: await Promise.all(allPostsByDate.map(async (post) => ({
			pubDate: post.data.publishDate,
			link: `/article/${post.id}`,
			customData: `<h:img src="${typeof post.data.heroImage?.src === "string" ? post.data.heroImage?.src : post.data.heroImage?.src.src}" />
          <enclosure url="${typeof post.data.heroImage?.src === "string" ? post.data.heroImage?.src : post.data.heroImage?.src.src}" />`,
			content: await renderContent(post, siteUrl),
			...post.data
		})))
	});
};
//#endregion
//#region \0virtual:astro:page:src/pages/rss.xml@_@ts
var page = () => rss_xml_exports;
//#endregion
export { page };
