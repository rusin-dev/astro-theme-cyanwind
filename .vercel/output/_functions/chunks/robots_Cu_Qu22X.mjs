import { r as __exportAll } from "./rolldown-runtime_DWOOXAbm.mjs";
//#region src/pages/robots.txt.ts
var robots_txt_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var robotsTxt = `
User-agent: GPTBot
User-agent: ClaudeBot
User-agent: Claude-Web

User-agent: *
Allow: /

Sitemap: ${new URL("sitemap-index.xml", "https://blog.rusin7.com/").href}
`.trim();
var GET = () => new Response(robotsTxt, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
//#endregion
//#region \0virtual:astro:page:src/pages/robots.txt@_@ts
var page = () => robots_txt_exports;
//#endregion
export { page };
