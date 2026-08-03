import { D as maybeRenderHead, V as createAstro, c as renderComponent, g as renderTemplate, k as addAttribute, p as renderSlot } from "./server_BvovAKAK.mjs";
import { a as createComponent } from "./_astro_assets_DPhqHtnZ.mjs";
import { h as $$Icon, v as cn } from "./i18n_UusxS-i0.mjs";
import { o as sortMDByDate, t as getBlogCollection } from "./server_DMJrJHOC.mjs";
import { differenceInCalendarDays, eachDayOfInterval, formatISO, getDay, getMonth, getYear, nextDay, parseISO, subWeeks } from "date-fns";
//#region src/utils/reading-time.ts
var CJK_RANGES = [
	[19968, 40959],
	[13312, 19903],
	[131072, 173791],
	[173824, 177983],
	[177984, 178207],
	[178208, 183983],
	[63744, 64255],
	[194560, 195103]
];
var CJK_PUNCTUATION = /[\u3000-\u303F\uff00-\uffef]/;
function isCJK(char) {
	const code = char.charCodeAt(0);
	return CJK_RANGES.some(([start, end]) => code >= start && code <= end);
}
function countWords(text) {
	let words = 0;
	let inWord = false;
	for (let i = 0; i < text.length; i++) {
		const char = text[i];
		if (isCJK(char)) {
			words++;
			while (i + 1 < text.length && CJK_PUNCTUATION.test(text[i + 1])) i++;
			inWord = false;
		} else if (/\S/.test(char)) {
			if (!inWord) {
				words++;
				inWord = true;
			}
		} else if (inWord && i + 1 < text.length && /\S/.test(text[i + 1])) inWord = false;
	}
	return words;
}
function getReadingTime(text, wordsPerMinute = 200) {
	const words = countWords(text);
	const minutes = words / wordsPerMinute;
	const time = Math.round(minutes * 60 * 1e3);
	return {
		text: `${Math.ceil(minutes)} min read`,
		minutes,
		time,
		words
	};
}
//#endregion
//#region src/components/home/BlogStats.astro
createAstro("https://blog.rusin7.com/");
var $$BlogStats = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BlogStats;
	const { blogStartDate } = Astro.props;
	const startDate = blogStartDate;
	const isEnglish = Astro.url.pathname.includes("/en");
	const labels = {
		daysOnline: isEnglish ? "Days Online" : "运行天数",
		lastUpdated: isEnglish ? "Last Updated" : "最后更新",
		totalWords: isEnglish ? "Total Words" : "总字数",
		totalPosts: isEnglish ? "Total Posts" : "文章总数"
	};
	const allPosts = await getBlogCollection();
	const sortedPosts = sortMDByDate(allPosts);
	const daysDiff = Math.floor(((/* @__PURE__ */ new Date()).getTime() - startDate.getTime()) / 864e5);
	const lastUpdated = sortedPosts.length > 0 ? new Date(sortedPosts[0].data.updatedDate || sortedPosts[0].data.publishDate) : /* @__PURE__ */ new Date();
	let totalWords = 0;
	for (const post of allPosts) try {
		const { body } = post;
		if (body) {
			const readingTime = getReadingTime(body);
			totalWords += readingTime.words;
		}
	} catch (error) {
		console.warn(`Error calculating word count for post ${post.id}:`, error);
	}
	const formatNumber = (num) => {
		if (num >= 1e4) return Math.round(num / 1e3) / 10 + "w";
		else if (num >= 1e3) return Math.round(num / 100) / 10 + "k";
		return num.toString();
	};
	const formatDate = (date) => {
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric"
		});
	};
	return renderTemplate`${maybeRenderHead($$result)}<div class="flex flex-col gap-y-5"> <div class="grid grid-cols-1 gap-4 sm:grid-cols-3"> <div class="group flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 shadow-sm transition-all hover:border-foreground/25 hover:shadow-lg"> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "time",
		"class": "size-5 text-muted-foreground group-hover:text-primary transition-colors"
	})} <div class="text-center"> <div class="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">${daysDiff}</div> <div class="text-sm text-muted-foreground">${labels.daysOnline}</div> </div> </div> <div class="group flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 shadow-sm transition-all hover:border-foreground/25 hover:shadow-lg"> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "calendar",
		"class": "size-5 text-muted-foreground group-hover:text-primary transition-colors"
	})} <div class="text-center"> <div class="text-1xl font-bold text-foreground group-hover:text-primary transition-colors">${formatDate(lastUpdated)}</div> <div class="text-sm text-muted-foreground">${labels.lastUpdated}</div> </div> </div> <div class="group flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 shadow-sm transition-all hover:border-foreground/25 hover:shadow-lg"> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "document",
		"class": "size-5 text-muted-foreground group-hover:text-primary transition-colors"
	})} <div class="text-center"> <div class="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">${formatNumber(totalWords)}</div> <div class="text-sm text-muted-foreground">${labels.totalWords}</div> </div> </div> </div> <div class="flex items-center justify-between text-sm border-t border-border pt-3"> <span class="text-muted-foreground">${labels.totalPosts}</span> <span class="font-medium text-foreground">${allPosts.length}</span> </div> </div>`;
}, "C:/Users/22790/astro-blog2/src/components/home/BlogStats.astro", void 0);
//#endregion
//#region src/components/home/Section.astro
createAstro("https://blog.rusin7.com/");
var $$Section = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Section;
	const { class: className, title } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section${addAttribute(cn("flex flex-col gap-y-5 md:flex-row md:gap-y-0", className), "class")}> <div class="text-xl font-semibold md:min-w-36"> <h2>${title}</h2> </div> <div class="flex flex-1 flex-col gap-y-3"> ${renderSlot($$result, $$slots["default"])} </div> </section>`;
}, "C:/Users/22790/astro-blog2/src/components/home/Section.astro", void 0);
//#endregion
//#region src/assets/avatar.png
var avatar_default = new Proxy({
	"src": "/_astro/avatar.d5a-LzVb.png",
	"width": 512,
	"height": 512,
	"format": "png"
}, { get(target, name, receiver) {
	if (name === "clone") return structuredClone(target);
	if (name === "fsPath") return "C:/Users/22790/astro-blog2/src/assets/avatar.png";
	return target[name];
} });
//#endregion
//#region src/components/home/GitHubActivityCalendar.astro
createAstro("https://blog.rusin7.com/");
var $$GitHubActivityCalendar = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$GitHubActivityCalendar;
	async function fetchData(username) {
		const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
		const data = await response.json();
		if (!response.ok) {
			const message = data.error || "Unknown error";
			throw Error(`Fetching GitHub contribution data for "${username}" failed: ${message}`);
		}
		return data;
	}
	function fillHoles(activities) {
		const calendar = new Map(activities.map((a) => [a.date, a]));
		const firstActivity = activities[0];
		const lastActivity = activities[activities.length - 1];
		return eachDayOfInterval({
			start: parseISO(firstActivity.date),
			end: parseISO(lastActivity.date)
		}).map((day) => {
			const date = formatISO(day, { representation: "date" });
			return calendar.get(date) ?? {
				date,
				count: 0,
				level: 0
			};
		});
	}
	function groupByWeeks(activities) {
		const normalized = fillHoles(activities);
		const firstDate = parseISO(normalized[0].date);
		const firstCalendarDate = getDay(firstDate) === 0 ? firstDate : subWeeks(nextDay(firstDate, 0), 1);
		const padded = [...Array(differenceInCalendarDays(firstDate, firstCalendarDate)).fill(void 0), ...normalized];
		const numberOfWeeks = Math.ceil(padded.length / 7);
		return [...Array(numberOfWeeks).keys()].map((i) => padded.slice(i * 7, i * 7 + 7));
	}
	function getMonthLabels(weeks, isEnglish) {
		const monthNames = isEnglish ? [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec"
		] : [
			"一月",
			"二月",
			"三月",
			"四月",
			"五月",
			"六月",
			"七月",
			"八月",
			"九月",
			"十月",
			"十一月",
			"十二月"
		];
		return weeks.reduce((labels, week, weekIndex) => {
			const firstActivity = week.find((a) => a);
			if (!firstActivity) return labels;
			const month = monthNames[getMonth(parseISO(firstActivity.date))];
			if (weekIndex === 0 || labels.at(-1)?.label !== month) labels.push({
				weekIndex,
				label: month
			});
			return labels;
		}, []);
	}
	const { username } = Astro.props;
	const data = await fetchData(username);
	const isEnglish = Astro.url.pathname.split("/").filter(Boolean)[0] === "en";
	const activities = data.contributions;
	const totalCount = data.total.lastYear;
	const activityYear = getYear(parseISO(activities[0].date));
	const blockSize = 12;
	const blockMargin = 4;
	const blockRadius = 2;
	const labelHeight = 22;
	const weeks = groupByWeeks(activities);
	const width = weeks.length * 16 - blockMargin;
	const height = 130;
	const monthLabels = getMonthLabels(weeks, isEnglish);
	const labels = {
		contributions: isEnglish ? "contributions in" : "次贡献于",
		less: isEnglish ? "Less" : "少",
		more: isEnglish ? "More" : "多"
	};
	return renderTemplate`${maybeRenderHead($$result)}<div class="overflow-x-auto w-full" style="max-width: 90vw;"> <svg class="block"${addAttribute(width, "width")}${addAttribute(height, "height")}${addAttribute(`0 0 ${width} ${height}`, "viewBox")}> <g> ${monthLabels.map(({ label, weekIndex }) => renderTemplate`<text${addAttribute(16 * weekIndex, "x")}${addAttribute(0, "y")} dominant-baseline="hanging" fill="currentColor"> ${label} </text>`)} </g> ${weeks.map((week, wi) => renderTemplate`<g${addAttribute(`translate(${16 * wi}, 0)`, "transform")}> ${week.map((activity, di) => activity ? renderTemplate`<rect${addAttribute([
		"stroke-foreground/10, hover:opacity-80",
		activity.level === 0 && "fill-[#ebedf0] dark:fill-[#161b22]",
		activity.level === 1 && "fill-[#c6e48b] dark:fill-[#0e4429]",
		activity.level === 2 && "fill-[#7bc96f] dark:fill-[#006d32]",
		activity.level === 3 && "fill-[#239a3b] dark:fill-[#26a641]",
		activity.level === 4 && "fill-[#196127] dark:fill-[#39d353]"
	], "class:list")}${addAttribute(0, "x")}${addAttribute(labelHeight + 16 * di, "y")}${addAttribute(blockSize, "width")}${addAttribute(blockSize, "height")}${addAttribute(blockRadius, "rx")}${addAttribute(blockRadius, "ry")}${addAttribute(activity.date, "data-date")}${addAttribute(activity.level, "data-level")}> <title>${`${activity.count} contributions on ${activity.date}`}</title> </rect>` : null)} </g>`)} </svg> </div> <footer class="flex items-center justify-between"> <div>${totalCount} ${labels.contributions} ${activityYear} ~ ${activityYear + 1}</div> <div class="flex items-center gap-1"> <span>${labels.less}</span> ${[
		0,
		1,
		2,
		3,
		4
	].map((level) => renderTemplate`<svg${addAttribute(blockSize, "width")}${addAttribute(blockSize, "height")}> <rect${addAttribute(blockSize, "width")}${addAttribute(blockSize, "height")}${addAttribute(blockRadius, "rx")}${addAttribute(blockRadius, "ry")}${addAttribute([
		level === 0 && "fill-[#ebedf0] dark:fill-[#161b22]",
		level === 1 && "fill-[#c6e48b] dark:fill-[#0e4429]",
		level === 2 && "fill-[#7bc96f] dark:fill-[#006d32]",
		level === 3 && "fill-[#239a3b] dark:fill-[#26a641]",
		level === 4 && "fill-[#196127] dark:fill-[#39d353]"
	], "class:list")}></rect> </svg>`)} <span>${labels.more}</span> </div> </footer>`;
}, "C:/Users/22790/astro-blog2/src/components/home/GitHubActivityCalendar.astro", void 0);
//#endregion
export { $$BlogStats as i, avatar_default as n, $$Section as r, $$GitHubActivityCalendar as t };
