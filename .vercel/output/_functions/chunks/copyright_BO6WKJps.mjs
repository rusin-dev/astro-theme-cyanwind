import { r as __exportAll } from "./rolldown-runtime_DWOOXAbm.mjs";
import { c as renderComponent, g as renderTemplate, z as unescapeHTML } from "./server_BvovAKAK.mjs";
import { a as createComponent } from "./_astro_assets_DPhqHtnZ.mjs";
import { t as $$IndividualPage } from "./IndividualPage__IJur1Db.mjs";
//#region src/pages/terms/copyright.md
var copyright_exports = /* @__PURE__ */ __exportAll({
	Content: () => Content,
	compiledContent: () => compiledContent,
	default: () => Content,
	file: () => file,
	frontmatter: () => frontmatter,
	getHeadings: () => getHeadings,
	rawContent: () => rawContent,
	url: () => url
});
var html = () => "<h2 style=\"text-align: center;\"><b>COPYRIGHT NOTICE</b></h2>\n<p>Effective date: 2030-12-31</p>	 	 \n<p>Unless otherwise noted, all original content on <b>[Your Domain]</b> — including but not limited to text, code snippets, and tutorials — is created by <b>[Your Name]</b> and licensed under the \n<a href=\"https://creativecommons.org/licenses/by/4.0/\" target=\"_blank\" rel=\"noopener noreferrer\">\nCreative Commons Attribution 4.0 International License (CC BY 4.0)\n</a>.</p>\n<p>This license allows you to:</p>\n<ul>\n  <li><b>Share</b> — copy and redistribute the material in any medium or format</li>\n  <li><b>Adapt</b> — remix, transform, and build upon the material for any purpose, even commercially</li>\n</ul>\n<p>Under the following condition:</p>\n<ul>\n  <li><b>Attribution</b> — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may not imply endorsement by the original author.</li>\n</ul>\n<p><b>Note:</b> The majority of blog post cover images (\"Hero Images\") are selected from publicly available works on \n<a href=\"https://www.pixiv.net/\" target=\"_blank\" rel=\"noopener noreferrer\">Pixiv</a>, with credit and original links provided in each post.</p>\n<p>This site may also include third-party images, logos, trademarks, or other materials sourced from the internet. These assets — regardless of whether they are explicitly marked with ©, ™, or other symbols — remain the intellectual property of their respective rights holders. Their use on this site is strictly for illustrative or non-commercial purposes. No copyright or trademark infringement is intended.</p>\n<p>If you believe that any content on <b>[Your Domain]</b> infringes upon your rights, please contact us at <b>[Your Email]</b>. We will respond promptly and remove the content if necessary.</p>\n<p>Example attribution (for content reuse):</p>\n<blockquote>\n  Originally published on <a href=\"https://[Your Domain]\" target=\"_blank\">[Your Domain]</a> by [Your Name], licensed under \n  <a href=\"https://creativecommons.org/licenses/by/4.0/\" target=\"_blank\" rel=\"noopener noreferrer\">CC BY 4.0</a>.\n</blockquote>";
var frontmatter = {
	"layout": "@/layouts/IndividualPage.astro",
	"title": "Copyright",
	"description": "Effective date: 2030-12-31",
	"language": "En",
	"back": "/terms/list",
	"minutesRead": "2 min read",
	"words": 261
};
var file = "C:/Users/22790/astro-blog2/src/pages/terms/copyright.md";
var url = "/terms/copyright";
function rawContent() {
	return "   \n                                        \n\n                  \n                                         \n              \n                   \n   \n\n<h2 style=\"text-align: center;\"><b>COPYRIGHT NOTICE</b></h2>\n<p>Effective date: 2030-12-31</p>	 	 \n\n<p>Unless otherwise noted, all original content on <b>[Your Domain]</b> — including but not limited to text, code snippets, and tutorials — is created by <b>[Your Name]</b> and licensed under the \n<a href=\"https://creativecommons.org/licenses/by/4.0/\" target=\"_blank\" rel=\"noopener noreferrer\">\nCreative Commons Attribution 4.0 International License (CC BY 4.0)\n</a>.</p>\n\n<p>This license allows you to:</p>\n<ul>\n  <li><b>Share</b> — copy and redistribute the material in any medium or format</li>\n  <li><b>Adapt</b> — remix, transform, and build upon the material for any purpose, even commercially</li>\n</ul>\n\n<p>Under the following condition:</p>\n<ul>\n  <li><b>Attribution</b> — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may not imply endorsement by the original author.</li>\n</ul>\n\n<p><b>Note:</b> The majority of blog post cover images (\"Hero Images\") are selected from publicly available works on \n<a href=\"https://www.pixiv.net/\" target=\"_blank\" rel=\"noopener noreferrer\">Pixiv</a>, with credit and original links provided in each post.</p>\n\n<p>This site may also include third-party images, logos, trademarks, or other materials sourced from the internet. These assets — regardless of whether they are explicitly marked with ©, ™, or other symbols — remain the intellectual property of their respective rights holders. Their use on this site is strictly for illustrative or non-commercial purposes. No copyright or trademark infringement is intended.</p>\n\n<p>If you believe that any content on <b>[Your Domain]</b> infringes upon your rights, please contact us at <b>[Your Email]</b>. We will respond promptly and remove the content if necessary.</p>\n\n<p>Example attribution (for content reuse):</p>\n<blockquote>\n  Originally published on <a href=\"https://[Your Domain]\" target=\"_blank\">[Your Domain]</a> by [Your Name], licensed under \n  <a href=\"https://creativecommons.org/licenses/by/4.0/\" target=\"_blank\" rel=\"noopener noreferrer\">CC BY 4.0</a>.\n</blockquote>\n\n";
}
async function compiledContent() {
	return await html();
}
function getHeadings() {
	return [];
}
var Content = createComponent((result, _props, slots) => {
	const { layout, ...content } = frontmatter;
	content.file = file;
	content.url = url;
	return renderTemplate`${renderComponent(result, "Layout", $$IndividualPage, {
		file,
		url,
		content,
		frontmatter: content,
		headings: getHeadings(),
		rawContent,
		compiledContent,
		"server:root": true
	}, { "default": () => renderTemplate`${unescapeHTML(html())}` })}`;
});
//#endregion
//#region \0virtual:astro:page:src/pages/terms/copyright@_@md
var page = () => copyright_exports;
//#endregion
export { page };
