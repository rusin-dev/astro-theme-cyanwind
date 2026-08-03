import { D as maybeRenderHead, V as createAstro, c as renderComponent, g as renderTemplate, k as addAttribute, r as spreadAttributes } from "./server_BvovAKAK.mjs";
import { a as createComponent } from "./_astro_assets_DPhqHtnZ.mjs";
import { b as renderScript, o as $$Svg, v as cn } from "./i18n_UusxS-i0.mjs";
//#region src/components/about/AlgorithmShowcase.astro
createAstro("https://blog.rusin7.com/");
var $$AlgorithmShowcase = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$AlgorithmShowcase;
	const { class: className = "" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(`algorithm-showcase ${className} astro-xqbetnri`, "class")}> <div class="showcase-header astro-xqbetnri"> <h3 id="current-title" class="astro-xqbetnri">博德算法</h3> <div class="showcase-controls astro-xqbetnri"> <button id="prev-btn" class="nav-btn astro-xqbetnri" aria-label="上一个算法"> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="astro-xqbetnri"> <polyline points="15,18 9,12 15,6" class="astro-xqbetnri"></polyline> </svg> </button> <div class="indicator-dots astro-xqbetnri" id="indicator-dots"> <span class="dot active astro-xqbetnri"></span> <span class="dot astro-xqbetnri"></span> <span class="dot astro-xqbetnri"></span> </div> <button id="next-btn" class="nav-btn astro-xqbetnri" aria-label="下一个算法"> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="astro-xqbetnri"> <polyline points="9,18 15,12 9,6" class="astro-xqbetnri"></polyline> </svg> </button> </div> </div> <div class="showcase-content astro-xqbetnri"> <div class="showcase-slider astro-xqbetnri" id="showcase-slider"> <!-- Boids Algorithm --> <div class="showcase-slide active astro-xqbetnri" data-title="Boids Algorithm"> <div class="boids-showcase astro-xqbetnri"> <canvas id="boidsCanvas" class="astro-xqbetnri"></canvas> </div> </div> <!-- Cellular Automata - Conway's Game of Life --> <div class="showcase-slide astro-xqbetnri" data-title="Game of Life"> <div class="cellular-automata-showcase astro-xqbetnri"> <canvas id="cellularAutomataCanvas" class="astro-xqbetnri"></canvas> </div> </div> <!-- A* Pathfinding Algorithm --> <div class="showcase-slide astro-xqbetnri" data-title="Pathfinding"> <div class="astar-showcase astro-xqbetnri"> <canvas id="astarCanvas" class="astro-xqbetnri"></canvas> </div> </div> </div> </div> </div> ${renderScript($$result, "C:/Users/22790/astro-blog2/src/components/about/AlgorithmShowcase.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/22790/astro-blog2/src/components/about/AlgorithmShowcase.astro", void 0);
//#endregion
//#region src/components/about/ToolSection.astro
createAstro("https://blog.rusin7.com/");
var $$ToolSection = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ToolSection;
	const { class: className, title, tools, ...props } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(cn("not-prose flex flex-col rounded-xl border border-border py-3 px-3 gap-y-3 sm:gap-y-4", className), "class")}${spreadAttributes(props)}> <div class="m-0 px-2 text-lg font-medium">${title}</div> <div class="grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2"> ${tools.map((tool) => renderTemplate`<a class="group relative text-sm leading-normal no-underline"${addAttribute(tool.href, "href")}${addAttribute(tool.name, "id")} target="_blank"> <div class="flex items-center gap-x-3 rounded-lg border border-transparent px-1.5 py-1 transition-colors hover:border-border hover:bg-muted"> ${renderComponent($$result, "Svg", $$Svg, {
		"src": tool.icon,
		"class": "size-10 rounded-lg bg-primary-foreground fill-foreground p-2"
	})} <div class="z-20 flex flex-col"> <div class="font-medium text-foreground">${tool.name}</div> <div class="font-normal">${tool.description}</div> </div> </div> </a>`)} </div> </div>`;
}, "C:/Users/22790/astro-blog2/src/components/about/ToolSection.astro", void 0);
//#endregion
export { $$AlgorithmShowcase as n, $$ToolSection as t };
