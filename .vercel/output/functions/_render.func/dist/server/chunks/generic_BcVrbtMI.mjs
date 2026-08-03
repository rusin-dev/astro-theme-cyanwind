import { r as __exportAll } from "./rolldown-runtime_DWOOXAbm.mjs";
import { b as isRemoteAllowed, c as isRemotePath, v as fetchWithRedirects } from "./path_D6AUSR7x.mjs";
import { n as imageConfig, r as lookup } from "./_astro_assets_DPhqHtnZ.mjs";
import { t as getConfiguredImageService } from "./assets_DmZ17A5k.mjs";
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdo_d30460ecf2a64a9cdb0ccff5894b897c/node_modules/astro/dist/assets/utils/etag.js
var fnv1a52 = (str) => {
	const len = str.length;
	let i = 0, t0 = 0, v0 = 8997, t1 = 0, v1 = 33826, t2 = 0, v2 = 40164, t3 = 0, v3 = 52210;
	while (i < len) {
		v0 ^= str.charCodeAt(i++);
		t0 = v0 * 435;
		t1 = v1 * 435;
		t2 = v2 * 435;
		t3 = v3 * 435;
		t2 += v0 << 8;
		t3 += v1 << 8;
		t1 += t0 >>> 16;
		v0 = t0 & 65535;
		t2 += t1 >>> 16;
		v1 = t1 & 65535;
		v3 = t3 + (t2 >>> 16) & 65535;
		v2 = t2 & 65535;
	}
	return (v3 & 15) * 281474976710656 + v2 * 4294967296 + v1 * 65536 + (v0 ^ v3 >> 4);
};
var etag = (payload, weak = false) => {
	return (weak ? "W/\"" : "\"") + fnv1a52(payload).toString(36) + payload.length.toString(36) + "\"";
};
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdo_d30460ecf2a64a9cdb0ccff5894b897c/node_modules/astro/dist/assets/endpoint/loadImage.js
async function loadImage(src, headers, imageConfig, isRemote, fetchFn) {
	try {
		const res = await fetchWithRedirects({
			url: src,
			headers,
			imageConfig,
			fetchFn
		});
		if (isRemote && !isRemoteAllowed(res.url, imageConfig)) return;
		if (!res.ok) return;
		return await res.arrayBuffer();
	} catch {
		return;
	}
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdo_d30460ecf2a64a9cdb0ccff5894b897c/node_modules/astro/dist/assets/endpoint/generic.js
var generic_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = async ({ request }) => {
	try {
		const imageService = await getConfiguredImageService();
		if (!("transform" in imageService)) throw new Error("Configured image service is not a local service");
		const url = new URL(request.url);
		const transform = await imageService.parseURL(url, imageConfig);
		if (!transform?.src) throw new Error("Incorrect transform returned by `parseURL`");
		let inputBuffer = void 0;
		const isRemoteImage = isRemotePath(transform.src);
		if (isRemoteImage && isRemoteAllowed(transform.src, imageConfig) === false) return new Response("Forbidden", { status: 403 });
		const sourceUrl = new URL(transform.src, url.origin);
		if (!isRemoteImage && sourceUrl.origin !== url.origin) return new Response("Forbidden", { status: 403 });
		inputBuffer = await loadImage(sourceUrl, isRemoteImage ? new Headers() : request.headers, imageConfig, isRemoteImage);
		if (!inputBuffer) return new Response("Not Found", { status: 404 });
		const { data, format } = await imageService.transform(new Uint8Array(inputBuffer), transform, imageConfig);
		return new Response(data, {
			status: 200,
			headers: {
				"Content-Type": lookup(format) ?? `image/${format}`,
				"Cache-Control": "public, max-age=31536000",
				ETag: etag(data.toString()),
				Date: (/* @__PURE__ */ new Date()).toUTCString()
			}
		});
	} catch (err) {
		console.error("Could not process image request:", err);
		return new Response("Internal Server Error", { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:node_modules/.pnpm/astro@7.2.0_@astrojs+markdo_d30460ecf2a64a9cdb0ccff5894b897c/node_modules/astro/dist/assets/endpoint/generic@_@js
var page = () => generic_exports;
//#endregion
export { page };
