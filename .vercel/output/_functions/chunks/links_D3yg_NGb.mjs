import { D as maybeRenderHead, V as createAstro, c as renderComponent, g as renderTemplate, k as addAttribute, r as spreadAttributes } from "./server_BvovAKAK.mjs";
import { a as createComponent, i as $$Image } from "./_astro_assets_DPhqHtnZ.mjs";
//#region src/components/links/FriendList.astro
createAstro("https://blog.rusin7.com/");
var $$FriendList = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$FriendList;
	function shuffle(arr) {
		return arr.sort(function() {
			return Math.random() - .5;
		});
	}
	const { title, list: friendlist, ...props } = Astro.props;
	return renderTemplate`${title && renderTemplate`${maybeRenderHead($$result)}<h2${addAttribute(friendlist.id_name, "id")}>${title}</h2>`} <div class="grid gap-3.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"${spreadAttributes(props)}> ${friendlist.link_list.length > 0 ? shuffle(friendlist.link_list).map((frd) => renderTemplate`<a${addAttribute(frd.link, "href")} target="_blank" class="no-underline"> <div class="group relative h-full overflow-hidden rounded-2xl border border-border bg-background px-4 py-2 transition-colors hover:bg-muted sm:py-3"> <div class="relative z-10 flex h-full items-center gap-3"> <div class="relative h-16 w-16 min-w-16 overflow-hidden rounded-full"> ${renderComponent($$result, "Image", $$Image, {
		"class": "my-0 bg-white",
		"src": frd.avatar,
		"height": 80,
		"width": 80,
		"alt": "avatar",
		"loading": "lazy"
	})} <div class="absolute start-0 top-0 h-full w-full"> <div class="flex h-full w-full items-center justify-center rounded-full bg-foreground opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50"> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="me-2 stroke-background"> <line x1="5" y1="12" x2="19" y2="12" class="translate-x-4 scale-x-0 transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:scale-x-100"></line> <polyline points="12 5 19 12 12 19" class="translate-x-0 transition-all duration-300 ease-in-out group-hover:translate-x-1"></polyline> </svg> </div> </div> </div> <div class="flex flex-col gap-y-2"> <p class="my-0 line-clamp-1 text-sm">${frd.name} </p> <p class="my-0 line-clamp-1 text-xs text-muted-foreground sm:line-clamp-2"> ${frd.intro} </p> </div> </div> ${renderComponent($$result, "Image", $$Image, {
		"class": "absolute -start-2 top-0 z-0 my-0 h-full w-2/3 bg-white object-cover opacity-15",
		"src": frd.avatar,
		"height": 80,
		"width": 80,
		"alt": "avatar bg",
		"loading": "lazy",
		"style": {
			maskImage: "linear-gradient(to left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)",
			msMaskImage: "-ms-linear-gradient(to left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)",
			WebkitMaskImage: "-webkit-linear-gradient(to left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)"
		}
	})} </div> </a>`) : renderTemplate`<p>Nothing here.</p>`} </div>`;
}, "C:/Users/22790/astro-blog2/src/components/links/FriendList.astro", void 0);
var links_default = { friends: [{
	"id_name": "example-links",
	"desc": "示例友链",
	"link_list": [
		{
			"name": "哔哔一二",
			"link": "https://www.bber.cn",
			"avatar": "https://www.bber.cn/touxiang.png",
			"intro": "一个安静的个人博客"
		},
		{
			"name": "梦爱吃鱼",
			"link": "https://blog.bsgun.cn/",
			"avatar": "https://oss-cdn.bsgun.cn/logo/avatar.256.png",
			"intro": "不负心灵，不负今生。"
		},
		{
			"name": "清羽飞扬",
			"link": "https://blog.liushen.fun/",
			"avatar": "https://blog.liushen.fun/info/avatar.ico",
			"intro": "柳影曳曳，清酒孤灯，扬笔撒墨，心境如霜"
		},
		{
			"name": "BiuXin-s Blog",
			"link": "https://blog.biuxin.com/",
			"avatar": "https://x.xinb.de/i/2024/09/19/040857.webp",
			"intro": "人生的每一天，都在学习当中"
		},
		{
			"name": "無名小栈",
			"link": "https://blog.imsyy.top/",
			"avatar": "https://blog.imsyy.top/images/logo/logo.webp",
			"intro": "分享技术与科技生活"
		},
		{
			"name": "赵欣泽",
			"link": "http://blog.bslzzz.cn/",
			"avatar": "https://cdn.luogu.com.cn/upload/usericon/1217878.png",
			"intro": "一个热爱 C++ 的信竞生。"
		}
	]
}] };
//#endregion
export { $$FriendList as n, links_default as t };
