import { A as defineScriptVars, D as maybeRenderHead, V as createAstro, c as renderComponent, g as renderTemplate, k as addAttribute, p as renderSlot, r as spreadAttributes } from "./server_BvovAKAK.mjs";
import { a as createComponent, i as $$Image } from "./_astro_assets_DPhqHtnZ.mjs";
import { b as renderScript, h as $$Icon, t as getRelativeLocaleUrl, v as cn, y as clsx } from "./i18n_UusxS-i0.mjs";
import { t as config } from "./site.config_BT70j0O1.mjs";
import { parse } from "node-html-parser";
import sharp from "sharp";
//#region src/components/advanced/Quote.astro
createAstro("https://blog.rusin7.com/");
var $$Quote = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Quote;
	const { class: className } = Astro.props;
	return renderTemplate`${renderComponent($$result, "quote-component", "quote-component", { "class": cn("not-prose inline-block", className) }, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="flex flex-row items-center gap-x-3 rounded-full border border-border px-4 py-2 text-sm shadow-sm"> <span class="relative flex items-center justify-center"> <span class="absolute size-2 animate-ping rounded-full border border-green-400 bg-green-400 opacity-75"></span> <span class="size-2 rounded-full bg-green-400"></span> </span> <p id="quote-sentence" class="font-medium text-muted-foreground">Loading...</p> </div> ` })} ${renderScript($$result, "C:/Users/22790/astro-blog2/src/components/advanced/Quote.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/22790/astro-blog2/src/components/advanced/Quote.astro", void 0);
//#endregion
//#region src/components/advanced/GithubCard.astro
createAstro("https://blog.rusin7.com/");
var $$GithubCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$GithubCard;
	const { repo: repoRaw } = Astro.props;
	const repo = repoRaw.replace(/^https:\/\/github\.com\//, "");
	const [owner, repoName] = repo.split("/");
	return renderTemplate`${renderComponent($$result, "github-card", "github-card", {
		"class": "not-prose loading astro-s6rj7zmt",
		"data-repo": repo
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<a${addAttribute(`https://github.com/${repo}`, "href")} target="_blank" class="group block flex flex-col gap-y-2 rounded-xl border border-border px-5 py-4 transition-colors hover:bg-muted hover:text-muted-foreground astro-s6rj7zmt"> <div class="flex items-center justify-between astro-s6rj7zmt"> <div class="flex items-center gap-x-2 text-foreground group-hover:text-primary astro-s6rj7zmt"> <div id="gh-avatar" class="gh-text me-2 size-8 bg-cover astro-s6rj7zmt" style="border-radius:999px"></div> <span class="text-lg transition-colors astro-s6rj7zmt">${owner}</span> <span class="text-muted-foreground astro-s6rj7zmt">/</span> <span class="text-lg font-bold transition-colors astro-s6rj7zmt">${repoName}</span> </div> <div class="rounded-full bg-primary-foreground p-1 astro-s6rj7zmt"> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "github",
		"class": "astro-s6rj7zmt"
	})} </div> </div> <p id="gh-description" class="gh-text astro-s6rj7zmt">Waiting for api.github.com...</p> <div class="flex items-center justify-between astro-s6rj7zmt"> <div class="gh-text flex flex-wrap items-center gap-x-5 astro-s6rj7zmt"> <div class="flex items-center gap-x-2 astro-s6rj7zmt">  <!-- prettier-ignore --> <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" class="astro-s6rj7zmt"><g fill="none" fill-rule="evenodd" class="astro-s6rj7zmt"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" class="astro-s6rj7zmt"></path><path fill="currentColor" d="M10.92 2.868a1.25 1.25 0 0 1 2.16 0l2.795 4.798l5.428 1.176a1.25 1.25 0 0 1 .667 2.054l-3.7 4.141l.56 5.525a1.25 1.25 0 0 1-1.748 1.27L12 19.592l-5.082 2.24a1.25 1.25 0 0 1-1.748-1.27l.56-5.525l-3.7-4.14a1.25 1.25 0 0 1 .667-2.055l5.428-1.176zM12 4.987L9.687 8.959a1.25 1.25 0 0 1-.816.592l-4.492.973l3.062 3.427c.234.262.347.61.312.959l-.463 4.573l4.206-1.854a1.25 1.25 0 0 1 1.008 0l4.206 1.854l-.463-4.573a1.25 1.25 0 0 1 .311-.959l3.063-3.427l-4.492-.973a1.25 1.25 0 0 1-.816-.592z" class="astro-s6rj7zmt"></path></g></svg> <span id="gh-stars" class="leading-tight astro-s6rj7zmt">???</span> </div> <div class="flex items-center gap-x-2 astro-s6rj7zmt">  <!-- prettier-ignore --> <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" class="astro-s6rj7zmt"><g fill="none" class="astro-s6rj7zmt"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" class="astro-s6rj7zmt"></path><path fill="currentColor" d="M18 3a3 3 0 0 1 1 5.83V9a4 4 0 0 1-4 4H9a2 2 0 0 0-2 2v.17a3.001 3.001 0 1 1-2 0V8.83a3.001 3.001 0 1 1 2 0v2.705A4 4 0 0 1 9 11h6a2 2 0 0 0 2-2v-.17A3.001 3.001 0 0 1 18 3M6 17a1 1 0 1 0 0 2a1 1 0 0 0 0-2M6 5a1 1 0 1 0 0 2a1 1 0 0 0 0-2m12 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2" class="astro-s6rj7zmt"></path></g></svg> <span id="gh-forks" class="leading-tight astro-s6rj7zmt">???</span> </div> <div class="flex items-center gap-x-2 astro-s6rj7zmt">  <!-- prettier-ignore --> <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" class="astro-s6rj7zmt"><g fill="none" fill-rule="evenodd" class="astro-s6rj7zmt"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" class="astro-s6rj7zmt"></path><path fill="currentColor" d="M12 3a1 1 0 0 1 1 1v1h.764a2 2 0 0 1 .894.211L16.236 6H20a1 1 0 1 1 0 2h-.382l2.276 4.553c.07.139.106.292.106.447a4 4 0 0 1-8 0c0-.155.036-.308.106-.447L16.382 8h-.146a2 2 0 0 1-.894-.211L13.764 7H13v12h3a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2h3V7h-.764l-1.578.789A2 2 0 0 1 7.764 8h-.146l2.276 4.553A1 1 0 0 1 10 13a4 4 0 0 1-8 0a1 1 0 0 1 .106-.447L4.382 8H4a1 1 0 0 1 0-2h3.764l1.578-.789A2 2 0 0 1 10.236 5H11V4a1 1 0 0 1 1-1M6 9.236l-1.989 3.977a2 2 0 0 0 3.978 0zm12 0l-1.989 3.977a2 2 0 0 0 3.955.157l.023-.156z" class="astro-s6rj7zmt"></path></g></svg> <span id="gh-license" class="leading-tight astro-s6rj7zmt">???</span> </div> </div> <span id="gh-language" class="gh-text leading-tight astro-s6rj7zmt">?????</span> </div> </a> ` })} ${renderScript($$result, "C:/Users/22790/astro-blog2/src/components/advanced/GithubCard.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/22790/astro-blog2/src/components/advanced/GithubCard.astro", void 0);
//#endregion
//#region src/plugins/link-preview.ts
var LRU = class extends Map {
	maxSize;
	constructor(maxSize) {
		super();
		this.maxSize = maxSize;
	}
	get(key) {
		const value = super.get(key);
		if (value) this.#touch(key, value);
		return value;
	}
	set(key, value) {
		this.#touch(key, value);
		if (this.size > this.maxSize) {
			const firstKey = this.keys().next().value;
			if (firstKey !== void 0) this.delete(firstKey);
		}
		return this;
	}
	#touch(key, value) {
		this.delete(key);
		super.set(key, value);
	}
};
var formatError = (...lines) => lines.join("\n         ");
makeSafeGetter((res) => res.json());
/**
* Fetch a URL and parse it as HTML, but catch errors to stop builds erroring.
* @param url URL to fetch
* @returns {Promise<Document | undefined>}
*/
var safeGetDOM = makeSafeGetter(async (res) => parse.parse(await res.text()));
/** Factory to create safe, caching fetch functions. */
function makeSafeGetter(handleResponse, { cacheSize = 1e3 } = {}) {
	const cache = new LRU(cacheSize);
	return async function safeGet(url) {
		try {
			const cached = cache.get(url);
			if (cached) return cached;
			const response = await fetch(url);
			if (!response.ok) throw new Error(formatError(`Failed to fetch ${url}`, `Error ${response.status}: ${response.statusText}`));
			const result = await handleResponse(response);
			cache.set(url, result);
			return result;
		} catch (e) {
			console.error(formatError(`[error] astro-embed`, e?.message ?? e, `URL: ${url}`));
			return;
		}
	};
}
/** Helper to get the `content` attribute of an element. */
var getContent = (el) => el?.getAttribute("content");
/** Helper to filter out insecure or non-absolute URLs. */
var urlOrNull = (url) => url?.slice(0, 8) === "https://" ? url : null;
/**
* Loads and parses an HTML page to return Open Graph metadata.
* @param pageUrl URL to parse
*/
async function parseOpenGraph(pageUrl) {
	const html = await safeGetDOM(pageUrl);
	if (!html) return;
	const getMetaProperty = (prop) => getContent(html.querySelector(`meta[property=${JSON.stringify(prop)}]`));
	const getMetaName = (name) => getContent(html.querySelector(`meta[name=${JSON.stringify(name)}]`));
	const title = getMetaProperty("og:title") || html.querySelector("title")?.textContent;
	const description = getMetaProperty("og:description") || getMetaName("description");
	const image = urlOrNull(getMetaProperty("og:image:secure_url") || getMetaProperty("og:image:url") || getMetaProperty("og:image"));
	const imageAlt = getMetaProperty("og:image:alt");
	const video = urlOrNull(getMetaProperty("og:video:secure_url") || getMetaProperty("og:video:url") || getMetaProperty("og:video"));
	const videoType = getMetaProperty("og:video:type");
	return {
		title,
		description,
		image,
		imageAlt,
		url: urlOrNull(getMetaProperty("og:url") || html.querySelector("link[rel='canonical']")?.getAttribute("href")) || pageUrl,
		video,
		videoType
	};
}
//#endregion
//#region src/components/advanced/LinkPreview.astro
createAstro("https://blog.rusin7.com/");
var $$LinkPreview = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$LinkPreview;
	const { href, hideMedia = false, zoomable = true } = Astro.props;
	const meta = await parseOpenGraph(href);
	const domain = meta?.url ? new URL(meta.url).hostname.replace("www.", "") : "";
	return renderTemplate`${meta && meta.title ? renderTemplate`${maybeRenderHead($$result)}<div class="not-prose link-preview-container my-2 flex justify-center sm:my-4 astro-xg3tgjss"> <article${addAttribute([["link-preview flex flex-col overflow-hidden rounded-lg border max-sm:max-w-sm sm:flex-row", {
		"link-preview--has-video max-sm:max-w-none sm:flex-col": !hideMedia && meta.video && meta.videoType,
		"link-preview--no-media": hideMedia || !(meta.video && meta.videoType || meta.image)
	}], "astro-xg3tgjss"], "class:list")}> ${hideMedia ? null : meta.video && meta.videoType ? renderTemplate`<video controls preload="metadata" width="1200" height="630" class="astro-xg3tgjss"> <source${addAttribute(meta.video, "src")}${addAttribute(meta.videoType, "type")} class="astro-xg3tgjss"> </video>` : meta.image ? renderTemplate`${renderComponent($$result, "Image", $$Image, {
		"class": (cn("m-0 sm:max-w-60", zoomable && "zoomable") ?? "") + " astro-xg3tgjss",
		"src": meta.image,
		"alt": meta.imageAlt || "",
		"width": "1200",
		"height": "630"
	})}` : null} <a class="group font-normal text-muted-foreground no-underline hover:text-muted-foreground astro-xg3tgjss"${addAttribute(href, "href")} target="_blank"> <div class="link-preview__content flex h-full flex-col gap-y-1 px-3 py-2 transition-colors group-hover:bg-muted sm:px-5 sm:py-4 astro-xg3tgjss"> <header class="line-clamp-1 font-medium text-foreground transition-colors group-hover:text-primary astro-xg3tgjss"> ${meta.title} </header> <p class="link-preview__description line-clamp-2 astro-xg3tgjss"> ${meta.description}${" "} ${domain && renderTemplate`<small class="link-preview__domain ml-1 astro-xg3tgjss">(${domain})</small>`} </p> </div> </a> </article> </div>` : renderTemplate`<div class="link-preview link-preview--no-metadata astro-xg3tgjss"> <a${addAttribute(href, "href")} target="_blank" class="astro-xg3tgjss"> ${href} </a> </div>`}`;
}, "C:/Users/22790/astro-blog2/src/components/advanced/LinkPreview.astro", void 0);
//#endregion
//#region src/components/advanced/ImageGroup.astro
createAstro("https://blog.rusin7.com/");
var $$ImageGroup = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ImageGroup;
	const { images, gap = 12, aspectRatio: commonAR } = Astro.props;
	const items = await Promise.all(images.map(async (img) => {
		const isString = typeof img === "string";
		const src = isString ? img : img.src;
		const alt = isString ? "" : img.alt;
		let ar = isString ? commonAR : img.aspectRatio || commonAR;
		if (!ar && src.startsWith("http")) try {
			const buffer = await (await fetch(src)).arrayBuffer();
			const metadata = await sharp(Buffer.from(buffer)).metadata();
			if (metadata.width && metadata.height) ar = metadata.width / metadata.height;
		} catch (e) {
			console.warn(`[ImageGroup] Failed to detect aspect ratio for ${src}`, e);
		}
		return {
			src,
			alt,
			aspectRatio: ar || 1
		};
	}));
	return renderTemplate`${maybeRenderHead($$result)}<div class="image-group flex w-full"${addAttribute(`gap: ${gap}px`, "style")}> ${items.map((img) => {
		const flexStyle = `flex: ${img.aspectRatio} 1 0%`;
		return renderTemplate`<div${addAttribute(flexStyle, "style")} class="relative flex items-center justify-center overflow-hidden"> <img${addAttribute(img.src, "src")}${addAttribute(img.alt || "", "alt")} class="block w-full h-auto"${addAttribute({ aspectRatio: img.aspectRatio }, "style")}> </div>`;
	})} </div>`;
}, "C:/Users/22790/astro-blog2/src/components/advanced/ImageGroup.astro", void 0);
//#endregion
//#region src/components/advanced/QRCode.astro
createAstro("https://blog.rusin7.com/");
var $$QRCode = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$QRCode;
	const { content, class: className, ...props } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div id="qrcode-container"${addAttribute(className, "class")}${spreadAttributes(props)}></div> <script${addAttribute(`${config.npmCDN}/qrcodejs/qrcode.min.js`, "src")}><\/script> <script>(function(){${defineScriptVars({ content })}
  const renderContent = content ?? window.location.href
  // Load qrcode
  function loadqrcode(qrcodeContainer) {
    if (!qrcodeContainer) throw new Error('qrcode container not found')
    if (qrcodeContainer.innerHTML !== '') return
    new QRCode(qrcodeContainer, renderContent)
  }
  const qrcodeContainer = document.getElementById('qrcode-container')
  if (!qrcodeContainer) throw new Error('qrcode container not found')
  loadqrcode(qrcodeContainer)
})();<\/script>`;
}, "C:/Users/22790/astro-blog2/src/components/advanced/QRCode.astro", void 0);
//#endregion
//#region src/components/advanced/MediumZoom.astro
createAstro("https://blog.rusin7.com/");
var $$MediumZoom = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$MediumZoom;
	if (!config.integ.mediumZoom.enable) return {};
	const { selector = config.integ.mediumZoom.selector, background = "hsl(var(--background) / 0.8)" } = Astro.props;
	return renderTemplate`<script src="https://cdn.jsdelivr.net/npm/medium-zoom@1/dist/medium-zoom.min.js"><\/script> <script>(function(){${defineScriptVars({
		selector,
		background
	})}
  if (typeof mediumZoom !== 'undefined') {
    mediumZoom(selector, { background })
  }
})();<\/script>`;
}, "C:/Users/22790/astro-blog2/src/components/advanced/MediumZoom.astro", void 0);
//#endregion
//#region src/components/advanced/Comment.astro
createAstro("https://blog.rusin7.com/");
var $$Comment = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Comment;
	const { class: className } = Astro.props;
	return renderTemplate`${config.integ.waline.enable && renderTemplate`${renderComponent($$result, "comment-component", "comment-component", { "class": "astro-cnqe3ceg" }, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div id="waline"${addAttribute((cn("not-prose", className) ?? "") + " astro-cnqe3ceg", "class")}>
Comment seems to stuck. Try to refresh?✨
</div> ` })}`} ${renderScript($$result, "C:/Users/22790/astro-blog2/src/components/advanced/Comment.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/22790/astro-blog2/src/components/advanced/Comment.astro", void 0);
//#endregion
//#region src/components/advanced/ArxivRating.astro
createAstro("https://blog.rusin7.com/");
var $$ArxivRating = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ArxivRating;
	const { id, tldr, rank, url = id } = Astro.props;
	const isArxivId = /^\d{4}\.\d{4,5}$/.test(id);
	const href = isArxivId ? `https://arxiv.org/abs/${id}` : url;
	const hjfy_href = isArxivId ? `https://hjfy.top/arxiv/${id}` : url;
	const processed_id = isArxivId ? id : url.split("/").pop();
	return renderTemplate`${maybeRenderHead($$result)}<div class="rounded-xl border p-4"> <div class="inline-flex items-stretch gap-2 rounded-full border pe-3"> <span class="flex shrink-0 items-center rounded-full bg-primary-foreground px-2.5 text-sm text-primary">
Arxiv ID
</span> <samp class="break-all text-foreground"> <a${addAttribute(href, "href")} target="_blank" rel="noopener noreferrer"> ${processed_id} </a> </samp> </div> ${isArxivId && renderTemplate`<div class="inline-flex items-stretch gap-2 rounded-full border pe-3"> <span class="flex shrink-0 items-center rounded-full bg-blue-100 px-2.5 text-sm text-blue-700">
幻觉翻译
</span> <samp class="break-all text-foreground"> <a${addAttribute(hjfy_href, "href")} target="_blank" rel="noopener noreferrer"> ${id} </a> </samp> </div>`} <p class="flex items-center gap-x-3"> <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"> <g fill="none"> <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path> <path fill="currentColor" d="M13 20a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2zM12 2c4.41 0 8 3.543 8 7.933c0 3.006-1.522 5.196-2.78 6.494l-.284.283l-.27.252l-.252.22l-.33.27l-.328.244c-.196.138-.34.329-.466.535l-.145.251l-.141.252c-.24.412-.518.766-1.111.766h-3.786c-.593 0-.871-.354-1.11-.766l-.213-.378c-.145-.253-.305-.494-.54-.66l-.232-.171l-.199-.155l-.227-.188l-.252-.22l-.27-.252l-.285-.283C5.522 15.129 4 12.939 4 9.933C4 5.543 7.59 2 12 2m0 2C8.677 4 6 6.665 6 9.933c0 2.624 1.533 4.494 2.593 5.471l.245.218l.22.182l.27.208l.072.052c.315.222.549.531.762.854l.373.582h2.93l.373-.582c.213-.323.447-.632.762-.854l.243-.182l.206-.165l.233-.2C16.342 14.576 18 12.662 18 9.933C18 6.665 15.323 4 12 4m.293 2.293a1 1 0 0 1 1.497 1.32l-.083.094L12.414 9l1.286 1.286c.364.364.392.937.084 1.333l-.084.095l-1.993 1.993a1 1 0 0 1-1.497-1.32l.083-.094L11.586 11L10.3 9.714a1.01 1.01 0 0 1-.084-1.333l.084-.095z"></path> </g> </svg> ${tldr} </p> <div class="function-table-content"> ${renderSlot($$result, $$slots["default"])} </div> <div class="inline-flex items-center gap-x-1 rounded-full border bg-muted px-3 [&amp;_svg]:text-foreground">
推荐指数：
${Array.from({ length: rank }, (_) => renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"> <g fill="none" fill-rule="evenodd"> <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path> <path fill="currentColor" d="M10.92 2.868a1.25 1.25 0 0 1 2.16 0l2.795 4.798l5.428 1.176a1.25 1.25 0 0 1 .667 2.054l-3.7 4.141l.56 5.525a1.25 1.25 0 0 1-1.748 1.27L12 19.592l-5.082 2.24a1.25 1.25 0 0 1-1.748-1.27l.56-5.525l-3.7-4.14a1.25 1.25 0 0 1 .667-2.055l5.428-1.176zM12 4.987L9.687 8.959a1.25 1.25 0 0 1-.816.592l-4.492.973l3.062 3.427c.234.262.347.61.312.959l-.463 4.573l4.206-1.854a1.25 1.25 0 0 1 1.008 0l4.206 1.854l-.463-4.573a1.25 1.25 0 0 1 .311-.959l3.063-3.427l-4.492-.973a1.25 1.25 0 0 1-.816-.592z"></path> </g> </svg>`)} </div> </div>`;
}, "C:/Users/22790/astro-blog2/src/components/advanced/ArxivRating.astro", void 0);
//#endregion
//#region src/components/advanced/RatingCriteria.astro
createAstro("https://blog.rusin7.com/");
var $$RatingCriteria = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$RatingCriteria;
	const { lang = "zh" } = Astro.props;
	const criteria = {
		zh: {
			title: "评分准则",
			levels: [
				{
					star: 1,
					desc: "平平无奇的论文"
				},
				{
					star: 2,
					desc: "正常的论文"
				},
				{
					star: 3,
					desc: "广受认可或者让我眼前一亮的论文"
				},
				{
					star: 4,
					desc: "奠基性的论文或者我非常喜欢的论文"
				},
				{
					star: 5,
					desc: "毋庸置疑的最棒的论文"
				}
			]
		},
		en: {
			title: "Rating Criteria",
			levels: [
				{
					star: 1,
					desc: "Mediocre paper"
				},
				{
					star: 2,
					desc: "Regular paper"
				},
				{
					star: 3,
					desc: "Widely recognized or eye-catching paper"
				},
				{
					star: 4,
					desc: "Foundational paper or one I really love"
				},
				{
					star: 5,
					desc: "Undoubtedly the best paper"
				}
			]
		}
	};
	const currentCriteria = criteria[lang] || criteria.zh;
	return renderTemplate`${maybeRenderHead($$result)}<div class="rounded-xl border p-4"> <div class="inline-flex items-stretch gap-2 rounded-full border mb-4"> <span class="flex shrink-0 items-center rounded-full bg-primary-foreground px-2.5 text-sm text-primary"> ${currentCriteria.title} </span> </div> <div class="space-y-3"> ${currentCriteria.levels.map((level) => renderTemplate`<div class="flex items-center gap-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"> <div class="inline-flex items-center gap-x-1"> ${Array.from({ length: level.star }, (_, i) => renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" class="text-yellow-500"${addAttribute(i, "data-star")}> <g fill="none" fill-rule="evenodd"> <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path> <path fill="currentColor" d="M10.92 2.868a1.25 1.25 0 0 1 2.16 0l2.795 4.798l5.428 1.176a1.25 1.25 0 0 1 .667 2.054l-3.7 4.141l.56 5.525a1.25 1.25 0 0 1-1.748 1.27L12 19.592l-5.082 2.24a1.25 1.25 0 0 1-1.748-1.27l.56-5.525l-3.7-4.14a1.25 1.25 0 0 1 .667-2.055l5.428-1.176zM12 4.987L9.687 8.959a1.25 1.25 0 0 1-.816.592l-4.492.973l3.062 3.427c.234.262.347.61.312.959l-.463 4.573l4.206-1.854a1.25 1.25 0 0 1 1.008 0l4.206 1.854l-.463-4.573a1.25 1.25 0 0 1 .311-.959l3.063-3.427l-4.492-.973a1.25 1.25 0 0 1-.816-.592z"></path> </g> </svg>`)} ${Array.from({ length: 5 - level.star }, (_, i) => renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" class="text-gray-300"${addAttribute(i + level.star, "data-empty-star")}> <g fill="none" fill-rule="evenodd"> <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path> <path fill="currentColor" d="M10.92 2.868a1.25 1.25 0 0 1 2.16 0l2.795 4.798l5.428 1.176a1.25 1.25 0 0 1 .667 2.054l-3.7 4.141l.56 5.525a1.25 1.25 0 0 1-1.748 1.27L12 19.592l-5.082 2.24a1.25 1.25 0 0 1-1.748-1.27l.56-5.525l-3.7-4.14a1.25 1.25 0 0 1 .667-2.055l5.428-1.176zM12 4.987L9.687 8.959a1.25 1.25 0 0 1-.816.592l-4.492.973l3.062 3.427c.234.262.347.61.312.959l-.463 4.573l4.206-1.854a1.25 1.25 0 0 1 1.008 0l4.206 1.854l-.463-4.573a1.25 1.25 0 0 1 .311-.959l3.063-3.427l-4.492-.973a1.25 1.25 0 0 1-.816-.592z"></path> </g> </svg>`)} </div> <span class="text-sm text-foreground flex-1">${level.desc}</span> </div>`)} </div> </div>`;
}, "C:/Users/22790/astro-blog2/src/components/advanced/RatingCriteria.astro", void 0);
//#endregion
//#region src/components/advanced/WebVideo.astro
createAstro("https://blog.rusin7.com/");
var $$WebVideo = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$WebVideo;
	const { src, title, width = "100%", height = "468px" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<iframe${addAttribute(width, "width")}${addAttribute(height, "height")}${addAttribute(src, "src")}${addAttribute(title, "title")} allowfullscreen${addAttribute({
		borderRadius: "10px",
		overflow: "hidden"
	}, "style")}></iframe>`;
}, "C:/Users/22790/astro-blog2/src/components/advanced/WebVideo.astro", void 0);
//#endregion
//#region src/components/advanced/ManualTOC.astro
createAstro("https://blog.rusin7.com/");
var $$ManualTOC = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ManualTOC;
	const { title = "DOCS", categories, class: className, ...props } = Astro.props;
	function getLocalizedUrl(locale, path) {
		let url = getRelativeLocaleUrl(locale || "zh", path);
		if (url !== "/" && url.endsWith("/")) url = url.slice(0, -1);
		return url;
	}
	return renderTemplate`${renderComponent($$result, "docs-toc", "docs-toc", {
		"class": (clsx("not-prose", className) ?? "") + " astro-gdmkxtva",
		...props
	}, { "default": ($$result) => renderTemplate` ${title && renderTemplate`${maybeRenderHead($$result)}<h2 class="font-semibold text-foreground astro-gdmkxtva">${title}</h2>`} <ul class="mt-4 flex flex-col gap-y-5 astro-gdmkxtva"> ${categories.map((category) => renderTemplate`<li class="astro-gdmkxtva"> <h3 class="text-xs uppercase tracking-widest text-muted-foreground astro-gdmkxtva">${category.title}</h3> <ul class="mt-2 flex flex-col astro-gdmkxtva"> ${category.items.sort((a, b) => a.order - b.order).map((item) => renderTemplate`<li class="docs-item relative ms-2 flex rounded-2xl px-3 py-1 text-foreground/75 transition-all hover:bg-muted/50 astro-gdmkxtva"> <a class="flex-1 hover:text-foreground astro-gdmkxtva"${addAttribute(getLocalizedUrl(Astro.currentLocale, item.href), "href")}> ${item.title} </a> </li>`)} </ul> </li>`)} </ul> ` })} ${renderScript($$result, "C:/Users/22790/astro-blog2/src/components/advanced/ManualTOC.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/22790/astro-blog2/src/components/advanced/ManualTOC.astro", void 0);
//#endregion
export { $$LinkPreview as a, $$ImageGroup as i, $$Comment as n, $$GithubCard as o, $$QRCode as r, $$WebVideo as t };
