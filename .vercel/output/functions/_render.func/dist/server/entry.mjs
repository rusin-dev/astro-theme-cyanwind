import { i as __require, n as __esmMin, r as __exportAll, t as __commonJSMin } from "./chunks/rolldown-runtime_DWOOXAbm.mjs";
import { rt as AstroUserError } from "./chunks/errors-data_DxI72Vt0.mjs";
import "./chunks/path_D6AUSR7x.mjs";
import { L as AstroJSX, R as createVNode, d as chunkToString, l as renderStreaming } from "./chunks/server_BvovAKAK.mjs";
import { i as DefaultFetchHandler, n as deserializeRouteInfo, r as App, t as deserializeManifest } from "./chunks/entrypoints_C9eNad-F.mjs";
import nodePath from "node:path";
//#endregion
//#region node_modules/.pnpm/path-to-regexp@6.1.0/node_modules/path-to-regexp/dist.es2015/index.js
var dist_es2015_exports$1 = /* @__PURE__ */ __exportAll({
	compile: () => compile$1,
	match: () => match$1,
	parse: () => parse$1,
	pathToRegexp: () => pathToRegexp$1,
	regexpToFunction: () => regexpToFunction$1,
	tokensToFunction: () => tokensToFunction$1,
	tokensToRegexp: () => tokensToRegexp$1
});
/**
* Tokenize input string.
*/
function lexer$1(str) {
	var tokens = [];
	var i = 0;
	while (i < str.length) {
		var char = str[i];
		if (char === "*" || char === "+" || char === "?") {
			tokens.push({
				type: "MODIFIER",
				index: i,
				value: str[i++]
			});
			continue;
		}
		if (char === "\\") {
			tokens.push({
				type: "ESCAPED_CHAR",
				index: i++,
				value: str[i++]
			});
			continue;
		}
		if (char === "{") {
			tokens.push({
				type: "OPEN",
				index: i,
				value: str[i++]
			});
			continue;
		}
		if (char === "}") {
			tokens.push({
				type: "CLOSE",
				index: i,
				value: str[i++]
			});
			continue;
		}
		if (char === ":") {
			var name = "";
			var j = i + 1;
			while (j < str.length) {
				var code = str.charCodeAt(j);
				if (code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122 || code === 95) {
					name += str[j++];
					continue;
				}
				break;
			}
			if (!name) throw new TypeError("Missing parameter name at " + i);
			tokens.push({
				type: "NAME",
				index: i,
				value: name
			});
			i = j;
			continue;
		}
		if (char === "(") {
			var count = 1;
			var pattern = "";
			var j = i + 1;
			if (str[j] === "?") throw new TypeError("Pattern cannot start with \"?\" at " + j);
			while (j < str.length) {
				if (str[j] === "\\") {
					pattern += str[j++] + str[j++];
					continue;
				}
				if (str[j] === ")") {
					count--;
					if (count === 0) {
						j++;
						break;
					}
				} else if (str[j] === "(") {
					count++;
					if (str[j + 1] !== "?") throw new TypeError("Capturing groups are not allowed at " + j);
				}
				pattern += str[j++];
			}
			if (count) throw new TypeError("Unbalanced pattern at " + i);
			if (!pattern) throw new TypeError("Missing pattern at " + i);
			tokens.push({
				type: "PATTERN",
				index: i,
				value: pattern
			});
			i = j;
			continue;
		}
		tokens.push({
			type: "CHAR",
			index: i,
			value: str[i++]
		});
	}
	tokens.push({
		type: "END",
		index: i,
		value: ""
	});
	return tokens;
}
/**
* Parse a string for the raw tokens.
*/
function parse$1(str, options) {
	if (options === void 0) options = {};
	var tokens = lexer$1(str);
	var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
	var defaultPattern = "[^" + escapeString$1(options.delimiter || "/#?") + "]+?";
	var result = [];
	var key = 0;
	var i = 0;
	var path = "";
	var tryConsume = function(type) {
		if (i < tokens.length && tokens[i].type === type) return tokens[i++].value;
	};
	var mustConsume = function(type) {
		var value = tryConsume(type);
		if (value !== void 0) return value;
		var _a = tokens[i], nextType = _a.type, index = _a.index;
		throw new TypeError("Unexpected " + nextType + " at " + index + ", expected " + type);
	};
	var consumeText = function() {
		var result = "";
		var value;
		while (value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) result += value;
		return result;
	};
	while (i < tokens.length) {
		var char = tryConsume("CHAR");
		var name = tryConsume("NAME");
		var pattern = tryConsume("PATTERN");
		if (name || pattern) {
			var prefix = char || "";
			if (prefixes.indexOf(prefix) === -1) {
				path += prefix;
				prefix = "";
			}
			if (path) {
				result.push(path);
				path = "";
			}
			result.push({
				name: name || key++,
				prefix,
				suffix: "",
				pattern: pattern || defaultPattern,
				modifier: tryConsume("MODIFIER") || ""
			});
			continue;
		}
		var value = char || tryConsume("ESCAPED_CHAR");
		if (value) {
			path += value;
			continue;
		}
		if (path) {
			result.push(path);
			path = "";
		}
		if (tryConsume("OPEN")) {
			var prefix = consumeText();
			var name_1 = tryConsume("NAME") || "";
			var pattern_1 = tryConsume("PATTERN") || "";
			var suffix = consumeText();
			mustConsume("CLOSE");
			result.push({
				name: name_1 || (pattern_1 ? key++ : ""),
				pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
				prefix,
				suffix,
				modifier: tryConsume("MODIFIER") || ""
			});
			continue;
		}
		mustConsume("END");
	}
	return result;
}
/**
* Compile a string to a template function for the path.
*/
function compile$1(str, options) {
	return tokensToFunction$1(parse$1(str, options), options);
}
/**
* Expose a method for transforming tokens into the path function.
*/
function tokensToFunction$1(tokens, options) {
	if (options === void 0) options = {};
	var reFlags = flags$1(options);
	var _a = options.encode, encode = _a === void 0 ? function(x) {
		return x;
	} : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
	var matches = tokens.map(function(token) {
		if (typeof token === "object") return new RegExp("^(?:" + token.pattern + ")$", reFlags);
	});
	return function(data) {
		var path = "";
		for (var i = 0; i < tokens.length; i++) {
			var token = tokens[i];
			if (typeof token === "string") {
				path += token;
				continue;
			}
			var value = data ? data[token.name] : void 0;
			var optional = token.modifier === "?" || token.modifier === "*";
			var repeat = token.modifier === "*" || token.modifier === "+";
			if (Array.isArray(value)) {
				if (!repeat) throw new TypeError("Expected \"" + token.name + "\" to not repeat, but got an array");
				if (value.length === 0) {
					if (optional) continue;
					throw new TypeError("Expected \"" + token.name + "\" to not be empty");
				}
				for (var j = 0; j < value.length; j++) {
					var segment = encode(value[j], token);
					if (validate && !matches[i].test(segment)) throw new TypeError("Expected all \"" + token.name + "\" to match \"" + token.pattern + "\", but got \"" + segment + "\"");
					path += token.prefix + segment + token.suffix;
				}
				continue;
			}
			if (typeof value === "string" || typeof value === "number") {
				var segment = encode(String(value), token);
				if (validate && !matches[i].test(segment)) throw new TypeError("Expected \"" + token.name + "\" to match \"" + token.pattern + "\", but got \"" + segment + "\"");
				path += token.prefix + segment + token.suffix;
				continue;
			}
			if (optional) continue;
			var typeOfMessage = repeat ? "an array" : "a string";
			throw new TypeError("Expected \"" + token.name + "\" to be " + typeOfMessage);
		}
		return path;
	};
}
/**
* Create path match function from `path-to-regexp` spec.
*/
function match$1(str, options) {
	var keys = [];
	return regexpToFunction$1(pathToRegexp$1(str, keys, options), keys, options);
}
/**
* Create a path match function from `path-to-regexp` output.
*/
function regexpToFunction$1(re, keys, options) {
	if (options === void 0) options = {};
	var _a = options.decode, decode = _a === void 0 ? function(x) {
		return x;
	} : _a;
	return function(pathname) {
		var m = re.exec(pathname);
		if (!m) return false;
		var path = m[0], index = m.index;
		var params = Object.create(null);
		var _loop_1 = function(i) {
			if (m[i] === void 0) return "continue";
			var key = keys[i - 1];
			if (key.modifier === "*" || key.modifier === "+") params[key.name] = m[i].split(key.prefix + key.suffix).map(function(value) {
				return decode(value, key);
			});
			else params[key.name] = decode(m[i], key);
		};
		for (var i = 1; i < m.length; i++) _loop_1(i);
		return {
			path,
			index,
			params
		};
	};
}
/**
* Escape a regular expression string.
*/
function escapeString$1(str) {
	return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
* Get the flags for a regexp from the options.
*/
function flags$1(options) {
	return options && options.sensitive ? "" : "i";
}
/**
* Pull out keys from a regexp.
*/
function regexpToRegexp$1(path, keys) {
	if (!keys) return path;
	var groups = path.source.match(/\((?!\?)/g);
	if (groups) for (var i = 0; i < groups.length; i++) keys.push({
		name: i,
		prefix: "",
		suffix: "",
		modifier: "",
		pattern: ""
	});
	return path;
}
/**
* Transform an array into a regexp.
*/
function arrayToRegexp$1(paths, keys, options) {
	var parts = paths.map(function(path) {
		return pathToRegexp$1(path, keys, options).source;
	});
	return new RegExp("(?:" + parts.join("|") + ")", flags$1(options));
}
/**
* Create a path regexp from string input.
*/
function stringToRegexp$1(path, keys, options) {
	return tokensToRegexp$1(parse$1(path, options), keys, options);
}
/**
* Expose a function for taking tokens and returning a RegExp.
*/
function tokensToRegexp$1(tokens, keys, options) {
	if (options === void 0) options = {};
	var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
		return x;
	} : _d;
	var endsWith = "[" + escapeString$1(options.endsWith || "") + "]|$";
	var delimiter = "[" + escapeString$1(options.delimiter || "/#?") + "]";
	var route = start ? "^" : "";
	for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
		var token = tokens_1[_i];
		if (typeof token === "string") route += escapeString$1(encode(token));
		else {
			var prefix = escapeString$1(encode(token.prefix));
			var suffix = escapeString$1(encode(token.suffix));
			if (token.pattern) {
				if (keys) keys.push(token);
				if (prefix || suffix) {
					if (token.modifier === "+" || token.modifier === "*") {
						var mod = token.modifier === "*" ? "?" : "";
						route += "(?:" + prefix + "((?:" + token.pattern + ")(?:" + suffix + prefix + "(?:" + token.pattern + "))*)" + suffix + ")" + mod;
					} else route += "(?:" + prefix + "(" + token.pattern + ")" + suffix + ")" + token.modifier;
				} else route += "(" + token.pattern + ")" + token.modifier;
			} else route += "(?:" + prefix + suffix + ")" + token.modifier;
		}
	}
	if (end) {
		if (!strict) route += delimiter + "?";
		route += !options.endsWith ? "$" : "(?=" + endsWith + ")";
	} else {
		var endToken = tokens[tokens.length - 1];
		var isEndDelimited = typeof endToken === "string" ? delimiter.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
		if (!strict) route += "(?:" + delimiter + "(?=" + endsWith + "))?";
		if (!isEndDelimited) route += "(?=" + delimiter + "|" + endsWith + ")";
	}
	return new RegExp(route, flags$1(options));
}
/**
* Normalize the given path string, returning a regular expression.
*
* An empty array can be passed in for the keys, which will hold the
* placeholder key descriptions. For example, using `/user/:id`, `keys` will
* contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
*/
function pathToRegexp$1(path, keys, options) {
	if (path instanceof RegExp) return regexpToRegexp$1(path, keys);
	if (Array.isArray(path)) return arrayToRegexp$1(path, keys, options);
	return stringToRegexp$1(path, keys, options);
}
__esmMin((() => {}));
//#endregion
//#region node_modules/.pnpm/path-to-regexp@6.3.0/node_modules/path-to-regexp/dist.es2015/index.js
var dist_es2015_exports = /* @__PURE__ */ __exportAll({
	compile: () => compile,
	match: () => match,
	parse: () => parse,
	pathToRegexp: () => pathToRegexp,
	regexpToFunction: () => regexpToFunction,
	tokensToFunction: () => tokensToFunction,
	tokensToRegexp: () => tokensToRegexp
});
/**
* Tokenize input string.
*/
function lexer(str) {
	var tokens = [];
	var i = 0;
	while (i < str.length) {
		var char = str[i];
		if (char === "*" || char === "+" || char === "?") {
			tokens.push({
				type: "MODIFIER",
				index: i,
				value: str[i++]
			});
			continue;
		}
		if (char === "\\") {
			tokens.push({
				type: "ESCAPED_CHAR",
				index: i++,
				value: str[i++]
			});
			continue;
		}
		if (char === "{") {
			tokens.push({
				type: "OPEN",
				index: i,
				value: str[i++]
			});
			continue;
		}
		if (char === "}") {
			tokens.push({
				type: "CLOSE",
				index: i,
				value: str[i++]
			});
			continue;
		}
		if (char === ":") {
			var name = "";
			var j = i + 1;
			while (j < str.length) {
				var code = str.charCodeAt(j);
				if (code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122 || code === 95) {
					name += str[j++];
					continue;
				}
				break;
			}
			if (!name) throw new TypeError("Missing parameter name at ".concat(i));
			tokens.push({
				type: "NAME",
				index: i,
				value: name
			});
			i = j;
			continue;
		}
		if (char === "(") {
			var count = 1;
			var pattern = "";
			var j = i + 1;
			if (str[j] === "?") throw new TypeError("Pattern cannot start with \"?\" at ".concat(j));
			while (j < str.length) {
				if (str[j] === "\\") {
					pattern += str[j++] + str[j++];
					continue;
				}
				if (str[j] === ")") {
					count--;
					if (count === 0) {
						j++;
						break;
					}
				} else if (str[j] === "(") {
					count++;
					if (str[j + 1] !== "?") throw new TypeError("Capturing groups are not allowed at ".concat(j));
				}
				pattern += str[j++];
			}
			if (count) throw new TypeError("Unbalanced pattern at ".concat(i));
			if (!pattern) throw new TypeError("Missing pattern at ".concat(i));
			tokens.push({
				type: "PATTERN",
				index: i,
				value: pattern
			});
			i = j;
			continue;
		}
		tokens.push({
			type: "CHAR",
			index: i,
			value: str[i++]
		});
	}
	tokens.push({
		type: "END",
		index: i,
		value: ""
	});
	return tokens;
}
/**
* Parse a string for the raw tokens.
*/
function parse(str, options) {
	if (options === void 0) options = {};
	var tokens = lexer(str);
	var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
	var result = [];
	var key = 0;
	var i = 0;
	var path = "";
	var tryConsume = function(type) {
		if (i < tokens.length && tokens[i].type === type) return tokens[i++].value;
	};
	var mustConsume = function(type) {
		var value = tryConsume(type);
		if (value !== void 0) return value;
		var _a = tokens[i], nextType = _a.type, index = _a.index;
		throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
	};
	var consumeText = function() {
		var result = "";
		var value;
		while (value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) result += value;
		return result;
	};
	var isSafe = function(value) {
		for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
			var char = delimiter_1[_i];
			if (value.indexOf(char) > -1) return true;
		}
		return false;
	};
	var safePattern = function(prefix) {
		var prev = result[result.length - 1];
		var prevText = prefix || (prev && typeof prev === "string" ? prev : "");
		if (prev && !prevText) throw new TypeError("Must have text between two parameters, missing text after \"".concat(prev.name, "\""));
		if (!prevText || isSafe(prevText)) return "[^".concat(escapeString(delimiter), "]+?");
		return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
	};
	while (i < tokens.length) {
		var char = tryConsume("CHAR");
		var name = tryConsume("NAME");
		var pattern = tryConsume("PATTERN");
		if (name || pattern) {
			var prefix = char || "";
			if (prefixes.indexOf(prefix) === -1) {
				path += prefix;
				prefix = "";
			}
			if (path) {
				result.push(path);
				path = "";
			}
			result.push({
				name: name || key++,
				prefix,
				suffix: "",
				pattern: pattern || safePattern(prefix),
				modifier: tryConsume("MODIFIER") || ""
			});
			continue;
		}
		var value = char || tryConsume("ESCAPED_CHAR");
		if (value) {
			path += value;
			continue;
		}
		if (path) {
			result.push(path);
			path = "";
		}
		if (tryConsume("OPEN")) {
			var prefix = consumeText();
			var name_1 = tryConsume("NAME") || "";
			var pattern_1 = tryConsume("PATTERN") || "";
			var suffix = consumeText();
			mustConsume("CLOSE");
			result.push({
				name: name_1 || (pattern_1 ? key++ : ""),
				pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
				prefix,
				suffix,
				modifier: tryConsume("MODIFIER") || ""
			});
			continue;
		}
		mustConsume("END");
	}
	return result;
}
/**
* Compile a string to a template function for the path.
*/
function compile(str, options) {
	return tokensToFunction(parse(str, options), options);
}
/**
* Expose a method for transforming tokens into the path function.
*/
function tokensToFunction(tokens, options) {
	if (options === void 0) options = {};
	var reFlags = flags(options);
	var _a = options.encode, encode = _a === void 0 ? function(x) {
		return x;
	} : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
	var matches = tokens.map(function(token) {
		if (typeof token === "object") return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
	});
	return function(data) {
		var path = "";
		for (var i = 0; i < tokens.length; i++) {
			var token = tokens[i];
			if (typeof token === "string") {
				path += token;
				continue;
			}
			var value = data ? data[token.name] : void 0;
			var optional = token.modifier === "?" || token.modifier === "*";
			var repeat = token.modifier === "*" || token.modifier === "+";
			if (Array.isArray(value)) {
				if (!repeat) throw new TypeError("Expected \"".concat(token.name, "\" to not repeat, but got an array"));
				if (value.length === 0) {
					if (optional) continue;
					throw new TypeError("Expected \"".concat(token.name, "\" to not be empty"));
				}
				for (var j = 0; j < value.length; j++) {
					var segment = encode(value[j], token);
					if (validate && !matches[i].test(segment)) throw new TypeError("Expected all \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
					path += token.prefix + segment + token.suffix;
				}
				continue;
			}
			if (typeof value === "string" || typeof value === "number") {
				var segment = encode(String(value), token);
				if (validate && !matches[i].test(segment)) throw new TypeError("Expected \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
				path += token.prefix + segment + token.suffix;
				continue;
			}
			if (optional) continue;
			var typeOfMessage = repeat ? "an array" : "a string";
			throw new TypeError("Expected \"".concat(token.name, "\" to be ").concat(typeOfMessage));
		}
		return path;
	};
}
/**
* Create path match function from `path-to-regexp` spec.
*/
function match(str, options) {
	var keys = [];
	return regexpToFunction(pathToRegexp(str, keys, options), keys, options);
}
/**
* Create a path match function from `path-to-regexp` output.
*/
function regexpToFunction(re, keys, options) {
	if (options === void 0) options = {};
	var _a = options.decode, decode = _a === void 0 ? function(x) {
		return x;
	} : _a;
	return function(pathname) {
		var m = re.exec(pathname);
		if (!m) return false;
		var path = m[0], index = m.index;
		var params = Object.create(null);
		var _loop_1 = function(i) {
			if (m[i] === void 0) return "continue";
			var key = keys[i - 1];
			if (key.modifier === "*" || key.modifier === "+") params[key.name] = m[i].split(key.prefix + key.suffix).map(function(value) {
				return decode(value, key);
			});
			else params[key.name] = decode(m[i], key);
		};
		for (var i = 1; i < m.length; i++) _loop_1(i);
		return {
			path,
			index,
			params
		};
	};
}
/**
* Escape a regular expression string.
*/
function escapeString(str) {
	return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
* Get the flags for a regexp from the options.
*/
function flags(options) {
	return options && options.sensitive ? "" : "i";
}
/**
* Pull out keys from a regexp.
*/
function regexpToRegexp(path, keys) {
	if (!keys) return path;
	var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
	var index = 0;
	var execResult = groupsRegex.exec(path.source);
	while (execResult) {
		keys.push({
			name: execResult[1] || index++,
			prefix: "",
			suffix: "",
			modifier: "",
			pattern: ""
		});
		execResult = groupsRegex.exec(path.source);
	}
	return path;
}
/**
* Transform an array into a regexp.
*/
function arrayToRegexp(paths, keys, options) {
	var parts = paths.map(function(path) {
		return pathToRegexp(path, keys, options).source;
	});
	return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
/**
* Create a path regexp from string input.
*/
function stringToRegexp(path, keys, options) {
	return tokensToRegexp(parse(path, options), keys, options);
}
/**
* Expose a function for taking tokens and returning a RegExp.
*/
function tokensToRegexp(tokens, keys, options) {
	if (options === void 0) options = {};
	var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
		return x;
	} : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
	var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
	var delimiterRe = "[".concat(escapeString(delimiter), "]");
	var route = start ? "^" : "";
	for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
		var token = tokens_1[_i];
		if (typeof token === "string") route += escapeString(encode(token));
		else {
			var prefix = escapeString(encode(token.prefix));
			var suffix = escapeString(encode(token.suffix));
			if (token.pattern) {
				if (keys) keys.push(token);
				if (prefix || suffix) {
					if (token.modifier === "+" || token.modifier === "*") {
						var mod = token.modifier === "*" ? "?" : "";
						route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
					} else route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
				} else {
					if (token.modifier === "+" || token.modifier === "*") throw new TypeError("Can not repeat \"".concat(token.name, "\" without a prefix and suffix"));
					route += "(".concat(token.pattern, ")").concat(token.modifier);
				}
			} else route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
		}
	}
	if (end) {
		if (!strict) route += "".concat(delimiterRe, "?");
		route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
	} else {
		var endToken = tokens[tokens.length - 1];
		var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
		if (!strict) route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
		if (!isEndDelimited) route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
	}
	return new RegExp(route, flags(options));
}
/**
* Normalize the given path string, returning a regular expression.
*
* An empty array can be passed in for the keys, which will hold the
* placeholder key descriptions. For example, using `/user/:id`, `keys` will
* contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
*/
function pathToRegexp(path, keys, options) {
	if (path instanceof RegExp) return regexpToRegexp(path, keys);
	if (Array.isArray(path)) return arrayToRegexp(path, keys, options);
	return stringToRegexp(path, keys, options);
}
__esmMin((() => {}));
//#endregion
//#region node_modules/.pnpm/@vercel+routing-utils@5.3.3/node_modules/@vercel/routing-utils/dist/superstatic.js
var require_superstatic = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __export = (target, all) => {
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
	var superstatic_exports = {};
	__export(superstatic_exports, {
		collectHasSegments: () => collectHasSegments,
		convertCleanUrls: () => convertCleanUrls,
		convertHeaders: () => convertHeaders,
		convertRedirects: () => convertRedirects,
		convertRewrites: () => convertRewrites,
		convertTrailingSlash: () => convertTrailingSlash,
		getCleanUrls: () => getCleanUrls,
		pathToRegexp: () => pathToRegexp,
		sourceToRegex: () => sourceToRegex
	});
	module.exports = __toCommonJS(superstatic_exports);
	var import_url$1 = __require("url");
	var import_path_to_regexp = __toCommonJS(dist_es2015_exports$1);
	var import_path_to_regexp_updated = __toCommonJS(dist_es2015_exports);
	function cloneKeys(keys) {
		if (typeof keys === "undefined") return;
		return keys.slice(0);
	}
	function compareKeys(left, right) {
		return (typeof left === "undefined" ? "undefined" : left.toString()) === (typeof right === "undefined" ? "undefined" : right.toString());
	}
	function pathToRegexp(callerId, path, keys, options) {
		const newKeys = cloneKeys(keys);
		const currentRegExp = (0, import_path_to_regexp.pathToRegexp)(path, keys, options);
		try {
			const currentKeys = keys;
			const newRegExp = (0, import_path_to_regexp_updated.pathToRegexp)(path, newKeys, options);
			const isDiffRegExp = currentRegExp.toString() !== newRegExp.toString();
			if (process.env.FORCE_PATH_TO_REGEXP_LOG || isDiffRegExp) {
				const message = JSON.stringify({
					path,
					currentRegExp: currentRegExp.toString(),
					newRegExp: newRegExp.toString()
				});
				console.error(`[vc] PATH TO REGEXP PATH DIFF @ #${callerId}: ${message}`);
			}
			const isDiffKeys = !compareKeys(keys, newKeys);
			if (process.env.FORCE_PATH_TO_REGEXP_LOG || isDiffKeys) {
				const message = JSON.stringify({
					isDiffKeys,
					currentKeys,
					newKeys
				});
				console.error(`[vc] PATH TO REGEXP KEYS DIFF @ #${callerId}: ${message}`);
			}
		} catch (err) {
			const message = JSON.stringify({
				path,
				error: err.message
			});
			console.error(`[vc] PATH TO REGEXP ERROR @ #${callerId}: ${message}`);
		}
		return currentRegExp;
	}
	var UN_NAMED_SEGMENT = "__UN_NAMED_SEGMENT__";
	function getCleanUrls(filePaths) {
		return filePaths.map(toRoute).filter((f) => f.endsWith(".html")).map((f) => ({
			html: f,
			clean: f.slice(0, -5)
		}));
	}
	function convertCleanUrls(cleanUrls, trailingSlash, status = 308) {
		const routes = [];
		if (cleanUrls) {
			const loc = trailingSlash ? "/$1/" : "/$1";
			routes.push({
				src: "^/(?:(.+)/)?index(?:\\.html)?/?$",
				headers: { Location: loc },
				status
			});
			routes.push({
				src: "^/(.*)\\.html/?$",
				headers: { Location: loc },
				status
			});
		}
		return routes;
	}
	function convertRedirects(redirects, defaultStatus = 308) {
		return redirects.map((r) => {
			const { src, segments } = sourceToRegex(r.source);
			const hasSegments = collectHasSegments(r.has);
			normalizeHasKeys(r.has);
			normalizeHasKeys(r.missing);
			try {
				const loc = replaceSegments(segments, hasSegments, r.destination, true);
				let status;
				if (typeof r.permanent === "boolean") status = r.permanent ? 308 : 307;
				else if (r.statusCode) status = r.statusCode;
				else status = defaultStatus;
				const route = {
					src,
					headers: { Location: loc },
					status
				};
				if (typeof r.env !== "undefined") route.env = r.env;
				if (r.has) route.has = r.has;
				if (r.missing) route.missing = r.missing;
				return route;
			} catch (e) {
				throw new Error(`Failed to parse redirect: ${JSON.stringify(r)}`);
			}
		});
	}
	function convertRewrites(rewrites, internalParamNames) {
		return rewrites.map((r) => {
			const { src, segments } = sourceToRegex(r.source);
			const hasSegments = collectHasSegments(r.has);
			normalizeHasKeys(r.has);
			normalizeHasKeys(r.missing);
			try {
				const route = {
					src,
					dest: replaceSegments(segments, hasSegments, r.destination, false, internalParamNames),
					check: true
				};
				if (typeof r.env !== "undefined") route.env = r.env;
				if (r.has) route.has = r.has;
				if (r.missing) route.missing = r.missing;
				if (r.statusCode) route.status = r.statusCode;
				return route;
			} catch (e) {
				throw new Error(`Failed to parse rewrite: ${JSON.stringify(r)}`);
			}
		});
	}
	function convertHeaders(headers) {
		return headers.map((h) => {
			const obj = {};
			const { src, segments } = sourceToRegex(h.source);
			const hasSegments = collectHasSegments(h.has);
			normalizeHasKeys(h.has);
			normalizeHasKeys(h.missing);
			const namedSegments = segments.filter((name) => name !== UN_NAMED_SEGMENT);
			const indexes = {};
			segments.forEach((name, index) => {
				indexes[name] = toSegmentDest(index);
			});
			hasSegments.forEach((name) => {
				indexes[name] = "$" + name;
			});
			h.headers.forEach(({ key, value }) => {
				if (namedSegments.length > 0 || hasSegments.length > 0) {
					if (key.includes(":")) key = safelyCompile(key, indexes);
					if (value.includes(":")) value = safelyCompile(value, indexes);
				}
				obj[key] = value;
			});
			const route = {
				src,
				headers: obj,
				continue: true
			};
			if (h.has) route.has = h.has;
			if (h.missing) route.missing = h.missing;
			return route;
		});
	}
	function convertTrailingSlash(enable, status = 308) {
		const routes = [];
		if (enable) {
			routes.push({ src: "^/\\.well-known(?:/.*)?$" });
			routes.push({
				src: "^/((?:[^/]+/)*[^/\\.]+)$",
				headers: { Location: "/$1/" },
				status
			});
			routes.push({
				src: "^/((?:[^/]+/)*[^/]+\\.\\w+)/$",
				headers: { Location: "/$1" },
				status
			});
		} else routes.push({
			src: "^/(.*)\\/$",
			headers: { Location: "/$1" },
			status
		});
		return routes;
	}
	function sourceToRegex(source) {
		const keys = [];
		const r = pathToRegexp("632", source, keys, {
			strict: true,
			sensitive: true,
			delimiter: "/"
		});
		const segments = keys.map((k) => k.name).map((name) => {
			if (typeof name !== "string") return UN_NAMED_SEGMENT;
			return name;
		});
		return {
			src: r.source,
			segments
		};
	}
	var namedGroupsRegex = /\(\?<([a-zA-Z][a-zA-Z0-9_]*)>/g;
	var normalizeHasKeys = (hasItems = []) => {
		for (const hasItem of hasItems) if ("key" in hasItem && hasItem.type === "header") hasItem.key = hasItem.key.toLowerCase();
		return hasItems;
	};
	function getStringValueForRegex(value) {
		if (typeof value === "string") return value;
		if (value && typeof value === "object" && value !== null) {
			if ("re" in value && typeof value.re === "string") return value.re;
		}
		return null;
	}
	function collectHasSegments(has) {
		const hasSegments = /* @__PURE__ */ new Set();
		for (const hasItem of has || []) {
			if (!hasItem.value && "key" in hasItem) hasSegments.add(hasItem.key);
			const stringValue = getStringValueForRegex(hasItem.value);
			if (stringValue) {
				for (const match of stringValue.matchAll(namedGroupsRegex)) if (match[1]) hasSegments.add(match[1]);
				if (hasItem.type === "host") hasSegments.add("host");
			}
		}
		return [...hasSegments];
	}
	var escapeSegment = (str, segmentName) => str.replace(new RegExp(`:${segmentName}`, "g"), `__ESC_COLON_${segmentName}`);
	var unescapeSegments = (str) => str.replace(/__ESC_COLON_/gi, ":");
	function replaceSegments(segments, hasItemSegments, destination, isRedirect, internalParamNames) {
		const namedSegments = segments.filter((name) => name !== UN_NAMED_SEGMENT);
		if (!(destination.includes(":") && namedSegments.length > 0 || hasItemSegments.length > 0 || !isRedirect)) return destination;
		let escapedDestination = destination;
		const indexes = {};
		segments.forEach((name, index) => {
			indexes[name] = toSegmentDest(index);
			escapedDestination = escapeSegment(escapedDestination, name);
		});
		hasItemSegments.forEach((name) => {
			indexes[name] = "$" + name;
			escapedDestination = escapeSegment(escapedDestination, name);
		});
		const parsedDestination = (0, import_url$1.parse)(escapedDestination, true);
		delete parsedDestination.href;
		delete parsedDestination.path;
		delete parsedDestination.search;
		delete parsedDestination.host;
		let { pathname, hash, query, hostname, ...rest } = parsedDestination;
		pathname = unescapeSegments(pathname || "");
		hash = unescapeSegments(hash || "");
		hostname = unescapeSegments(hostname || "");
		let destParams = /* @__PURE__ */ new Set();
		const pathnameKeys = [];
		const hashKeys = [];
		const hostnameKeys = [];
		try {
			pathToRegexp("528", pathname, pathnameKeys);
			pathToRegexp("834", hash || "", hashKeys);
			pathToRegexp("712", hostname || "", hostnameKeys);
		} catch (_) {}
		destParams = new Set([
			...pathnameKeys,
			...hashKeys,
			...hostnameKeys
		].map((key) => key.name).filter((val) => typeof val === "string"));
		pathname = safelyCompile(pathname, indexes, true);
		hash = hash ? safelyCompile(hash, indexes, true) : null;
		hostname = hostname ? safelyCompile(hostname, indexes, true) : null;
		for (const [key, strOrArray] of Object.entries(query)) if (Array.isArray(strOrArray)) query[key] = strOrArray.map((str) => safelyCompile(unescapeSegments(str), indexes, true));
		else query[key] = safelyCompile(unescapeSegments(strOrArray), indexes, true);
		const paramKeys = Object.keys(indexes);
		if (!isRedirect && !paramKeys.some((param) => !(internalParamNames && internalParamNames.includes(param)) && destParams.has(param))) {
			for (const param of paramKeys) if (!(param in query) && param !== UN_NAMED_SEGMENT) query[param] = indexes[param];
		}
		destination = (0, import_url$1.format)({
			...rest,
			hostname,
			pathname,
			query,
			hash
		});
		return destination.replace(/%24/g, "$");
	}
	function safelyCompile(value, indexes, attemptDirectCompile) {
		if (!value) return value;
		if (attemptDirectCompile) try {
			return (0, import_path_to_regexp.compile)(value, { validate: false })(indexes);
		} catch (e) {}
		for (const key of Object.keys(indexes)) if (value.includes(`:${key}`)) value = value.replace(new RegExp(`:${key}\\*`, "g"), `:${key}--ESCAPED_PARAM_ASTERISK`).replace(new RegExp(`:${key}\\?`, "g"), `:${key}--ESCAPED_PARAM_QUESTION`).replace(new RegExp(`:${key}\\+`, "g"), `:${key}--ESCAPED_PARAM_PLUS`).replace(new RegExp(`:${key}(?!\\w)`, "g"), `--ESCAPED_PARAM_COLON${key}`);
		value = value.replace(/(:|\*|\?|\+|\(|\)|\{|\})/g, "\\$1").replace(/--ESCAPED_PARAM_PLUS/g, "+").replace(/--ESCAPED_PARAM_COLON/g, ":").replace(/--ESCAPED_PARAM_QUESTION/g, "?").replace(/--ESCAPED_PARAM_ASTERISK/g, "*");
		return (0, import_path_to_regexp.compile)(`/${value}`, { validate: false })(indexes).slice(1);
	}
	function toSegmentDest(index) {
		return "$" + (index + 1).toString();
	}
	function toRoute(filePath) {
		return filePath.startsWith("/") ? filePath : "/" + filePath;
	}
	0 && (module.exports = {
		collectHasSegments,
		convertCleanUrls,
		convertHeaders,
		convertRedirects,
		convertRewrites,
		convertTrailingSlash,
		getCleanUrls,
		pathToRegexp,
		sourceToRegex
	});
}));
//#endregion
//#region node_modules/.pnpm/@vercel+routing-utils@5.3.3/node_modules/@vercel/routing-utils/dist/append.js
var require_append = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __export = (target, all) => {
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
	var append_exports = {};
	__export(append_exports, { appendRoutesToPhase: () => appendRoutesToPhase });
	module.exports = __toCommonJS(append_exports);
	var import_index = require_dist();
	function appendRoutesToPhase({ routes: prevRoutes, newRoutes, phase }) {
		const routes = prevRoutes ? [...prevRoutes] : [];
		if (newRoutes === null || newRoutes.length === 0) return routes;
		let isInPhase = false;
		let insertIndex = -1;
		routes.forEach((r, i) => {
			if ((0, import_index.isHandler)(r)) {
				if (r.handle === phase) isInPhase = true;
				else if (isInPhase) {
					insertIndex = i;
					isInPhase = false;
				}
			}
		});
		if (isInPhase) routes.push(...newRoutes);
		else if (phase === null) {
			const lastPhase = routes.findIndex((r) => (0, import_index.isHandler)(r) && r.handle);
			if (lastPhase === -1) routes.push(...newRoutes);
			else routes.splice(lastPhase, 0, ...newRoutes);
		} else if (insertIndex > -1) routes.splice(insertIndex, 0, ...newRoutes);
		else {
			routes.push({ handle: phase });
			routes.push(...newRoutes);
		}
		return routes;
	}
	0 && (module.exports = { appendRoutesToPhase });
}));
//#endregion
//#region node_modules/.pnpm/@vercel+routing-utils@5.3.3/node_modules/@vercel/routing-utils/dist/merge.js
var require_merge = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __export = (target, all) => {
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
	var merge_exports = {};
	__export(merge_exports, { mergeRoutes: () => mergeRoutes });
	module.exports = __toCommonJS(merge_exports);
	var import_index = require_dist();
	function getBuilderRoutesMapping(builds) {
		const builderRoutes = {};
		for (const { entrypoint, routes, use } of builds) if (routes) {
			if (!builderRoutes[entrypoint]) builderRoutes[entrypoint] = {};
			builderRoutes[entrypoint][use] = routes;
		}
		return builderRoutes;
	}
	function getCheckAndContinue(routes) {
		const checks = [];
		const continues = [];
		const others = [];
		for (const route of routes) if ((0, import_index.isHandler)(route)) throw new Error(`Unexpected route found in getCheckAndContinue(): ${JSON.stringify(route)}`);
		else if (route.check && !route.override) checks.push(route);
		else if (route.continue && !route.override) continues.push(route);
		else others.push(route);
		return {
			checks,
			continues,
			others
		};
	}
	function mergeRoutes({ userRoutes, builds }) {
		const userHandleMap = /* @__PURE__ */ new Map();
		let userPrevHandle = null;
		(userRoutes || []).forEach((route) => {
			if ((0, import_index.isHandler)(route)) userPrevHandle = route.handle;
			else {
				const routes = userHandleMap.get(userPrevHandle);
				if (!routes) userHandleMap.set(userPrevHandle, [route]);
				else routes.push(route);
			}
		});
		const builderHandleMap = /* @__PURE__ */ new Map();
		const builderRoutes = getBuilderRoutesMapping(builds);
		Object.keys(builderRoutes).sort().forEach((path) => {
			const br = builderRoutes[path];
			Object.keys(br).sort().forEach((use) => {
				let builderPrevHandle = null;
				br[use].forEach((route) => {
					if ((0, import_index.isHandler)(route)) builderPrevHandle = route.handle;
					else {
						const routes = builderHandleMap.get(builderPrevHandle);
						if (!routes) builderHandleMap.set(builderPrevHandle, [route]);
						else routes.push(route);
					}
				});
			});
		});
		const outputRoutes = [];
		const uniqueHandleValues = /* @__PURE__ */ new Set([
			null,
			...userHandleMap.keys(),
			...builderHandleMap.keys()
		]);
		for (const handle of uniqueHandleValues) {
			const userRoutes2 = userHandleMap.get(handle) || [];
			const builderRoutes2 = builderHandleMap.get(handle) || [];
			const builderSorted = getCheckAndContinue(builderRoutes2);
			if (handle !== null && (userRoutes2.length > 0 || builderRoutes2.length > 0)) outputRoutes.push({ handle });
			outputRoutes.push(...builderSorted.continues);
			outputRoutes.push(...userRoutes2);
			outputRoutes.push(...builderSorted.checks);
			outputRoutes.push(...builderSorted.others);
		}
		return outputRoutes;
	}
	0 && (module.exports = { mergeRoutes });
}));
//#endregion
//#region node_modules/.pnpm/@vercel+routing-utils@5.3.3/node_modules/@vercel/routing-utils/dist/service-route-ownership.js
var require_service_route_ownership = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __export = (target, all) => {
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
	var service_route_ownership_exports = {};
	__export(service_route_ownership_exports, {
		getOwnershipGuard: () => getOwnershipGuard,
		normalizeRoutePrefix: () => normalizeRoutePrefix,
		scopeRouteSourceToOwnership: () => scopeRouteSourceToOwnership
	});
	module.exports = __toCommonJS(service_route_ownership_exports);
	function normalizeRoutePrefix(routePrefix) {
		let normalized = routePrefix.startsWith("/") ? routePrefix : `/${routePrefix}`;
		if (normalized !== "/" && normalized.endsWith("/")) normalized = normalized.slice(0, -1);
		return normalized || "/";
	}
	function escapeForRegex(value) {
		return value.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
	}
	function toPrefixMatcher(routePrefix) {
		return `${escapeForRegex(routePrefix)}(?:/|$)`;
	}
	function isDescendantPrefix(candidate, prefix) {
		return candidate !== prefix && candidate.startsWith(`${prefix}/`);
	}
	function getOwnershipGuard(ownerPrefix, allRoutePrefixes) {
		const owner = normalizeRoutePrefix(ownerPrefix);
		const nonRootPrefixes = Array.from(new Set(allRoutePrefixes.map(normalizeRoutePrefix))).filter((prefix) => prefix !== "/").sort((a, b) => b.length - a.length);
		if (owner === "/") return nonRootPrefixes.map((prefix) => `(?!${toPrefixMatcher(prefix)})`).join("");
		const descendants = nonRootPrefixes.filter((prefix) => isDescendantPrefix(prefix, owner));
		return `${`(?=${toPrefixMatcher(owner)})`}${descendants.map((prefix) => `(?!${toPrefixMatcher(prefix)})`).join("")}`;
	}
	function scopeRouteSourceToOwnership(source, ownershipGuard) {
		if (!ownershipGuard) return source;
		return `^${ownershipGuard}(?:${source.startsWith("^") ? source.slice(1) : source})`;
	}
	0 && (module.exports = {
		getOwnershipGuard,
		normalizeRoutePrefix,
		scopeRouteSourceToOwnership
	});
}));
//#endregion
//#region node_modules/.pnpm/@vercel+routing-utils@5.3.3/node_modules/@vercel/routing-utils/dist/schemas.js
var require_schemas = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __export = (target, all) => {
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
	var schemas_exports = {};
	__export(schemas_exports, {
		bulkRedirectsSchema: () => bulkRedirectsSchema,
		cleanUrlsSchema: () => cleanUrlsSchema,
		hasSchema: () => hasSchema,
		headersSchema: () => headersSchema,
		redirectsSchema: () => redirectsSchema,
		rewritesSchema: () => rewritesSchema,
		routesSchema: () => routesSchema,
		trailingSlashSchema: () => trailingSlashSchema
	});
	module.exports = __toCommonJS(schemas_exports);
	var mitigateSchema = {
		description: "Mitigation action to take on a route",
		type: "object",
		additionalProperties: false,
		required: ["action"],
		properties: { action: {
			description: "The mitigation action to take",
			type: "string",
			enum: ["challenge", "deny"]
		} }
	};
	var matchableValueSchema = {
		description: "A value to match against. Can be a string (regex) or a condition operation object",
		anyOf: [{
			description: "A regular expression used to match thev value. Named groups can be used in the destination.",
			type: "string",
			maxLength: 4096
		}, {
			description: "A condition operation object",
			type: "object",
			additionalProperties: false,
			minProperties: 1,
			properties: {
				eq: {
					description: "Equal to",
					anyOf: [{
						type: "string",
						maxLength: 4096
					}, { type: "number" }]
				},
				neq: {
					description: "Not equal",
					type: "string",
					maxLength: 4096
				},
				inc: {
					description: "In array",
					type: "array",
					items: {
						type: "string",
						maxLength: 4096
					}
				},
				ninc: {
					description: "Not in array",
					type: "array",
					items: {
						type: "string",
						maxLength: 4096
					}
				},
				pre: {
					description: "Starts with",
					type: "string",
					maxLength: 4096
				},
				suf: {
					description: "Ends with",
					type: "string",
					maxLength: 4096
				},
				re: {
					description: "Regex",
					type: "string",
					maxLength: 4096
				},
				gt: {
					description: "Greater than",
					type: "number"
				},
				gte: {
					description: "Greater than or equal to",
					type: "number"
				},
				lt: {
					description: "Less than",
					type: "number"
				},
				lte: {
					description: "Less than or equal to",
					type: "number"
				}
			}
		}]
	};
	var hasSchema = {
		description: "An array of requirements that are needed to match",
		type: "array",
		maxItems: 16,
		items: { anyOf: [{
			type: "object",
			additionalProperties: false,
			required: ["type", "value"],
			properties: {
				type: {
					description: "The type of request element to check",
					type: "string",
					enum: ["host"]
				},
				value: matchableValueSchema
			}
		}, {
			type: "object",
			additionalProperties: false,
			required: ["type", "key"],
			properties: {
				type: {
					description: "The type of request element to check",
					type: "string",
					enum: [
						"header",
						"cookie",
						"query"
					]
				},
				key: {
					description: "The name of the element contained in the particular type",
					type: "string",
					maxLength: 4096
				},
				value: matchableValueSchema
			}
		}] }
	};
	var routesSchema = {
		type: "array",
		deprecated: true,
		description: "A list of routes objects used to rewrite paths to point towards other internal or external paths",
		example: [{
			dest: "https://docs.example.com",
			src: "/docs"
		}],
		items: { anyOf: [{
			type: "object",
			required: ["src"],
			additionalProperties: false,
			properties: {
				src: {
					type: "string",
					maxLength: 4096
				},
				dest: {
					type: "string",
					maxLength: 4096
				},
				headers: {
					type: "object",
					additionalProperties: false,
					minProperties: 1,
					maxProperties: 100,
					patternProperties: { "^.{1,256}$": {
						type: "string",
						maxLength: 32768
					} }
				},
				methods: {
					type: "array",
					maxItems: 10,
					items: {
						type: "string",
						maxLength: 32
					}
				},
				caseSensitive: { type: "boolean" },
				important: { type: "boolean" },
				user: { type: "boolean" },
				continue: { type: "boolean" },
				override: { type: "boolean" },
				check: { type: "boolean" },
				isInternal: { type: "boolean" },
				status: {
					type: "integer",
					minimum: 100,
					maximum: 999
				},
				locale: {
					type: "object",
					additionalProperties: false,
					minProperties: 1,
					properties: {
						redirect: {
							type: "object",
							additionalProperties: false,
							minProperties: 1,
							maxProperties: 100,
							patternProperties: { "^.{1,256}$": {
								type: "string",
								maxLength: 4096
							} }
						},
						value: {
							type: "string",
							maxLength: 4096
						},
						path: {
							type: "string",
							maxLength: 4096
						},
						cookie: {
							type: "string",
							maxLength: 4096
						},
						default: {
							type: "string",
							maxLength: 4096
						}
					}
				},
				middleware: { type: "number" },
				middlewarePath: { type: "string" },
				middlewareRawSrc: {
					type: "array",
					items: { type: "string" }
				},
				has: hasSchema,
				missing: hasSchema,
				mitigate: mitigateSchema,
				transforms: {
					description: "A list of transform rules to adjust the query parameters of a request or HTTP headers of request or response",
					type: "array",
					minItems: 1,
					items: {
						type: "object",
						additionalProperties: false,
						required: [
							"type",
							"op",
							"target"
						],
						properties: {
							type: {
								description: "The scope of the transform to apply",
								type: "string",
								enum: [
									"request.headers",
									"request.query",
									"response.headers"
								]
							},
							op: {
								description: "The operation to perform on the target",
								type: "string",
								enum: [
									"append",
									"set",
									"delete"
								]
							},
							target: {
								description: "The target of the transform",
								type: "object",
								required: ["key"],
								properties: { key: {
									description: "A value to match against. Can be a string or a condition operation object (without regex support)",
									anyOf: [{
										description: "A valid header name (letters, numbers, hyphens, underscores)",
										type: "string",
										maxLength: 4096
									}, {
										description: "A condition operation object",
										type: "object",
										additionalProperties: false,
										minProperties: 1,
										properties: {
											eq: {
												description: "Equal to",
												anyOf: [{
													type: "string",
													maxLength: 4096
												}, { type: "number" }]
											},
											neq: {
												description: "Not equal",
												type: "string",
												maxLength: 4096
											},
											inc: {
												description: "In array",
												type: "array",
												items: {
													type: "string",
													maxLength: 4096
												}
											},
											ninc: {
												description: "Not in array",
												type: "array",
												items: {
													type: "string",
													maxLength: 4096
												}
											},
											pre: {
												description: "Starts with",
												type: "string",
												maxLength: 4096
											},
											suf: {
												description: "Ends with",
												type: "string",
												maxLength: 4096
											},
											gt: {
												description: "Greater than",
												type: "number"
											},
											gte: {
												description: "Greater than or equal to",
												type: "number"
											},
											lt: {
												description: "Less than",
												type: "number"
											},
											lte: {
												description: "Less than or equal to",
												type: "number"
											}
										}
									}]
								} }
							},
							args: {
								description: "The arguments to the operation",
								anyOf: [{
									type: "string",
									maxLength: 4096
								}, {
									type: "array",
									minItems: 1,
									items: {
										type: "string",
										maxLength: 4096
									}
								}]
							},
							env: {
								description: "An array of environment variable names that should be replaced at runtime in the args value",
								type: "array",
								minItems: 1,
								maxItems: 64,
								items: {
									type: "string",
									maxLength: 256
								}
							}
						},
						allOf: [{
							if: { properties: { op: { enum: ["append", "set"] } } },
							then: { required: ["args"] }
						}, {
							if: { allOf: [{ properties: { type: { enum: ["request.headers", "response.headers"] } } }, { properties: { op: { enum: ["set", "append"] } } }] },
							then: { properties: {
								target: { properties: { key: {
									if: { type: "string" },
									then: { pattern: "^[a-zA-Z0-9_-]+$" }
								} } },
								args: { anyOf: [{
									type: "string",
									pattern: "^[a-zA-Z0-9_ :;.,\"'?!(){}\\[\\]@<>=+*#$&`|~\\^%/-]+$"
								}, {
									type: "array",
									items: {
										type: "string",
										pattern: "^[a-zA-Z0-9_ :;.,\"'?!(){}\\[\\]@<>=+*#$&`|~\\^%/-]+$"
									}
								}] }
							} }
						}]
					}
				},
				env: {
					description: "An array of environment variable names that should be replaced at runtime in the destination or headers",
					type: "array",
					minItems: 1,
					maxItems: 64,
					items: {
						type: "string",
						maxLength: 256
					}
				},
				respectOriginCacheControl: {
					description: "When set to true (default), external rewrites will respect the Cache-Control header from the origin. When false, caching is disabled for this rewrite.",
					type: "boolean"
				}
			}
		}, {
			type: "object",
			required: ["handle"],
			additionalProperties: false,
			properties: { handle: {
				type: "string",
				maxLength: 32,
				enum: [
					"error",
					"filesystem",
					"hit",
					"miss",
					"resource",
					"rewrite"
				]
			} }
		}] }
	};
	var rewritesSchema = {
		type: "array",
		maxItems: 2048,
		description: "A list of rewrite definitions.",
		items: {
			type: "object",
			additionalProperties: false,
			required: ["source", "destination"],
			properties: {
				source: {
					description: "A pattern that matches each incoming pathname (excluding querystring).",
					type: "string",
					maxLength: 4096
				},
				destination: {
					description: "An absolute pathname to an existing resource or an external URL.",
					type: "string",
					maxLength: 4096
				},
				has: hasSchema,
				missing: hasSchema,
				statusCode: {
					description: "An optional integer to override the status code of the response.",
					type: "integer",
					minimum: 100,
					maximum: 999
				},
				env: {
					description: "An array of environment variable names that should be replaced at runtime in the destination",
					type: "array",
					minItems: 1,
					maxItems: 64,
					items: {
						type: "string",
						maxLength: 256
					}
				},
				respectOriginCacheControl: {
					description: "When set to true (default), external rewrites will respect the Cache-Control header from the origin. When false, caching is disabled for this rewrite.",
					type: "boolean"
				}
			}
		}
	};
	var redirectsSchema = {
		title: "Redirects",
		type: "array",
		maxItems: 2048,
		description: "A list of redirect definitions.",
		items: {
			type: "object",
			additionalProperties: false,
			required: ["source", "destination"],
			properties: {
				source: {
					description: "A pattern that matches each incoming pathname (excluding querystring).",
					type: "string",
					maxLength: 4096
				},
				destination: {
					description: "A location destination defined as an absolute pathname or external URL.",
					type: "string",
					maxLength: 4096
				},
				permanent: {
					description: "A boolean to toggle between permanent and temporary redirect. When `true`, the status code is `308`. When `false` the status code is `307`.",
					type: "boolean"
				},
				statusCode: {
					description: "An optional integer to define the status code of the redirect.",
					private: true,
					type: "integer",
					minimum: 100,
					maximum: 999
				},
				has: hasSchema,
				missing: hasSchema,
				env: {
					description: "An array of environment variable names that should be replaced at runtime in the destination",
					type: "array",
					minItems: 1,
					maxItems: 64,
					items: {
						type: "string",
						maxLength: 256
					}
				}
			}
		}
	};
	var headersSchema = {
		type: "array",
		maxItems: 2048,
		description: "A list of header definitions.",
		items: {
			type: "object",
			additionalProperties: false,
			required: ["source", "headers"],
			properties: {
				source: {
					description: "A pattern that matches each incoming pathname (excluding querystring)",
					type: "string",
					maxLength: 4096
				},
				headers: {
					description: "An array of key/value pairs representing each response header.",
					type: "array",
					maxItems: 1024,
					items: {
						type: "object",
						additionalProperties: false,
						required: ["key", "value"],
						properties: {
							key: {
								type: "string",
								maxLength: 4096
							},
							value: {
								type: "string",
								maxLength: 32768
							}
						}
					}
				},
				has: hasSchema,
				missing: hasSchema
			}
		}
	};
	var cleanUrlsSchema = {
		description: "When set to `true`, all HTML files and Serverless Functions will have their extension removed. When visiting a path that ends with the extension, a 308 response will redirect the client to the extensionless path.",
		type: "boolean"
	};
	var trailingSlashSchema = {
		description: "When `false`, visiting a path that ends with a forward slash will respond with a `308` status code and redirect to the path without the trailing slash.",
		type: "boolean"
	};
	var bulkRedirectsSchema = {
		type: "array",
		description: "A list of bulk redirect definitions.",
		items: {
			type: "object",
			additionalProperties: false,
			required: ["source", "destination"],
			properties: {
				source: {
					description: "The exact URL path or pattern to match.",
					type: "string",
					maxLength: 2048
				},
				destination: {
					description: "The target URL path where traffic should be redirected.",
					type: "string",
					maxLength: 2048
				},
				permanent: {
					description: "A boolean to toggle between permanent and temporary redirect. When `true`, the status code is `308`. When `false` the status code is `307`.",
					type: "boolean"
				},
				statusCode: {
					description: "An optional integer to define the status code of the redirect.",
					type: "integer",
					enum: [
						301,
						302,
						307,
						308
					]
				},
				sensitive: {
					description: "A boolean to toggle between case-sensitive and case-insensitive redirect. When `true`, the redirect is case-sensitive. When `false` the redirect is case-insensitive.",
					type: "boolean"
				},
				query: {
					description: "Whether the query string should be preserved by the redirect. The default is `false`.",
					type: "boolean"
				}
			}
		}
	};
	0 && (module.exports = {
		bulkRedirectsSchema,
		cleanUrlsSchema,
		hasSchema,
		headersSchema,
		redirectsSchema,
		rewritesSchema,
		routesSchema,
		trailingSlashSchema
	});
}));
//#endregion
//#region node_modules/.pnpm/@vercel+routing-utils@5.3.3/node_modules/@vercel/routing-utils/dist/types.js
var require_types = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
	module.exports = __toCommonJS({});
}));
//#endregion
//#region node_modules/.pnpm/@vercel+routing-utils@5.3.3/node_modules/@vercel/routing-utils/dist/index.js
var require_dist = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __export = (target, all) => {
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
	var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
	var src_exports = {};
	__export(src_exports, {
		appendRoutesToPhase: () => import_append.appendRoutesToPhase,
		getCleanUrls: () => import_superstatic2.getCleanUrls,
		getOwnershipGuard: () => import_service_route_ownership.getOwnershipGuard,
		getTransformedRoutes: () => getTransformedRoutes,
		isHandler: () => isHandler,
		isValidHandleValue: () => isValidHandleValue,
		mergeRoutes: () => import_merge.mergeRoutes,
		normalizeRoutePrefix: () => import_service_route_ownership.normalizeRoutePrefix,
		normalizeRoutes: () => normalizeRoutes,
		scopeRouteSourceToOwnership: () => import_service_route_ownership.scopeRouteSourceToOwnership,
		sourceToRegex: () => import_superstatic2.sourceToRegex
	});
	module.exports = __toCommonJS(src_exports);
	var import_url = __require("url");
	var import_superstatic = require_superstatic();
	var import_append = require_append();
	var import_merge = require_merge();
	var import_service_route_ownership = require_service_route_ownership();
	__reExport(src_exports, require_schemas(), module.exports);
	var import_superstatic2 = require_superstatic();
	__reExport(src_exports, require_types(), module.exports);
	var validHandleValues = /* @__PURE__ */ new Set([
		"filesystem",
		"hit",
		"miss",
		"rewrite",
		"error",
		"resource"
	]);
	function isHandler(route) {
		return typeof route.handle !== "undefined";
	}
	function isValidHandleValue(handle) {
		return validHandleValues.has(handle);
	}
	function normalizeRoutes(inputRoutes) {
		if (!inputRoutes || inputRoutes.length === 0) return {
			routes: inputRoutes,
			error: null
		};
		const routes = [];
		const handling = [];
		const errors = [];
		inputRoutes.forEach((r, i) => {
			const route = { ...r };
			routes.push(route);
			const keys = Object.keys(route);
			if (isHandler(route)) {
				const { handle } = route;
				if (keys.length !== 1) {
					const unknownProp = keys.find((prop) => prop !== "handle");
					errors.push(`Route at index ${i} has unknown property \`${unknownProp}\`.`);
				} else if (!isValidHandleValue(handle)) errors.push(`Route at index ${i} has unknown handle value \`handle: ${handle}\`.`);
				else if (handling.includes(handle)) errors.push(`Route at index ${i} is a duplicate. Please use one \`handle: ${handle}\` at most.`);
				else handling.push(handle);
			} else if (route.src) {
				if (!route.src.startsWith("^")) route.src = `^${route.src}`;
				if (!route.src.endsWith("$")) route.src = `${route.src}$`;
				route.src = route.src.replace(/\\\//g, "/");
				const regError = checkRegexSyntax("Route", i, route.src);
				if (regError) errors.push(regError);
				const handleValue = handling[handling.length - 1];
				if (handleValue === "hit") {
					if (route.dest) errors.push(`Route at index ${i} cannot define \`dest\` after \`handle: hit\`.`);
					if (route.status) errors.push(`Route at index ${i} cannot define \`status\` after \`handle: hit\`.`);
					if (!route.continue) errors.push(`Route at index ${i} must define \`continue: true\` after \`handle: hit\`.`);
				} else if (handleValue === "miss") {
					if (route.dest && !route.check) errors.push(`Route at index ${i} must define \`check: true\` after \`handle: miss\`.`);
					else if (!route.dest && !route.continue) errors.push(`Route at index ${i} must define \`continue: true\` after \`handle: miss\`.`);
				}
			} else errors.push(`Route at index ${i} must define either \`handle\` or \`src\` property.`);
		});
		return {
			routes,
			error: errors.length > 0 ? createError("invalid_route", errors, "https://vercel.link/routes-json", "Learn More") : null
		};
	}
	function checkRegexSyntax(type, index, src) {
		try {
			new RegExp(src);
		} catch (err) {
			return `${type} at index ${index} has invalid \`${type === "Route" ? "src" : "source"}\` regular expression "${src}".`;
		}
		return null;
	}
	function checkPatternSyntax(type, index, { source, destination, has }) {
		let sourceSegments = /* @__PURE__ */ new Set();
		const destinationSegments = /* @__PURE__ */ new Set();
		try {
			sourceSegments = new Set((0, import_superstatic.sourceToRegex)(source).segments);
		} catch (err) {
			return {
				message: `${type} at index ${index} has invalid \`source\` pattern "${source}".`,
				link: "https://vercel.link/invalid-route-source-pattern"
			};
		}
		if (destination) {
			try {
				const { hostname, pathname, query } = (0, import_url.parse)(destination, true);
				(0, import_superstatic.sourceToRegex)(hostname || "").segments.forEach((name) => destinationSegments.add(name));
				(0, import_superstatic.sourceToRegex)(pathname || "").segments.forEach((name) => destinationSegments.add(name));
				for (const strOrArray of Object.values(query)) {
					const value = Array.isArray(strOrArray) ? strOrArray[0] : strOrArray;
					(0, import_superstatic.sourceToRegex)(value || "").segments.forEach((name) => destinationSegments.add(name));
				}
			} catch (err) {}
			const hasSegments = (0, import_superstatic.collectHasSegments)(has);
			for (const segment of destinationSegments) if (!sourceSegments.has(segment) && !hasSegments.includes(segment)) return {
				message: `${type} at index ${index} has segment ":${segment}" in \`destination\` property but not in \`source\` or \`has\` property.`,
				link: "https://vercel.link/invalid-route-destination-segment"
			};
		}
		return null;
	}
	function checkRedirect(r, index) {
		if (typeof r.permanent !== "undefined" && typeof r.statusCode !== "undefined") return `Redirect at index ${index} cannot define both \`permanent\` and \`statusCode\` properties.`;
		return null;
	}
	function createError(code, allErrors, link, action) {
		const errors = Array.isArray(allErrors) ? allErrors : [allErrors];
		return {
			name: "RouteApiError",
			code,
			message: errors[0],
			link,
			action,
			errors
		};
	}
	function notEmpty(value) {
		return value !== null && value !== void 0;
	}
	function getTransformedRoutes(vercelConfig) {
		const { cleanUrls, rewrites, redirects, headers, trailingSlash } = vercelConfig;
		let { routes = null } = vercelConfig;
		if (routes) {
			if (typeof cleanUrls !== "undefined" || typeof trailingSlash !== "undefined" || typeof redirects !== "undefined" || typeof headers !== "undefined" || typeof rewrites !== "undefined") {
				const error = createError("invalid_mixed_routes", "If `rewrites`, `redirects`, `headers`, `cleanUrls` or `trailingSlash` are used, then `routes` cannot be present.", "https://vercel.link/mix-routing-props", "Learn More");
				return {
					routes,
					error
				};
			}
			return normalizeRoutes(routes);
		}
		if (typeof cleanUrls !== "undefined") {
			const normalized = normalizeRoutes((0, import_superstatic.convertCleanUrls)(cleanUrls, trailingSlash));
			if (normalized.error) {
				normalized.error.code = "invalid_clean_urls";
				return {
					routes,
					error: normalized.error
				};
			}
			routes = routes || [];
			routes.push(...normalized.routes || []);
		}
		if (typeof trailingSlash !== "undefined") {
			const normalized = normalizeRoutes((0, import_superstatic.convertTrailingSlash)(trailingSlash));
			if (normalized.error) {
				normalized.error.code = "invalid_trailing_slash";
				return {
					routes,
					error: normalized.error
				};
			}
			routes = routes || [];
			routes.push(...normalized.routes || []);
		}
		if (typeof redirects !== "undefined") {
			const code = "invalid_redirect";
			const regexErrorMessage = redirects.map((r, i) => checkRegexSyntax("Redirect", i, r.source)).find(notEmpty);
			if (regexErrorMessage) return {
				routes,
				error: createError("invalid_redirect", regexErrorMessage, "https://vercel.link/invalid-route-source-pattern", "Learn More")
			};
			const patternError = redirects.map((r, i) => checkPatternSyntax("Redirect", i, r)).find(notEmpty);
			if (patternError) return {
				routes,
				error: createError(code, patternError.message, patternError.link, "Learn More")
			};
			const redirectErrorMessage = redirects.map(checkRedirect).find(notEmpty);
			if (redirectErrorMessage) return {
				routes,
				error: createError(code, redirectErrorMessage, "https://vercel.link/redirects-json", "Learn More")
			};
			const normalized = normalizeRoutes((0, import_superstatic.convertRedirects)(redirects));
			if (normalized.error) {
				normalized.error.code = code;
				return {
					routes,
					error: normalized.error
				};
			}
			routes = routes || [];
			routes.push(...normalized.routes || []);
		}
		if (typeof headers !== "undefined") {
			const code = "invalid_header";
			const regexErrorMessage = headers.map((r, i) => checkRegexSyntax("Header", i, r.source)).find(notEmpty);
			if (regexErrorMessage) return {
				routes,
				error: createError(code, regexErrorMessage, "https://vercel.link/invalid-route-source-pattern", "Learn More")
			};
			const patternError = headers.map((r, i) => checkPatternSyntax("Header", i, r)).find(notEmpty);
			if (patternError) return {
				routes,
				error: createError(code, patternError.message, patternError.link, "Learn More")
			};
			const normalized = normalizeRoutes((0, import_superstatic.convertHeaders)(headers));
			if (normalized.error) {
				normalized.error.code = code;
				return {
					routes,
					error: normalized.error
				};
			}
			routes = routes || [];
			routes.push(...normalized.routes || []);
		}
		if (typeof rewrites !== "undefined") {
			const code = "invalid_rewrite";
			const regexErrorMessage = rewrites.map((r, i) => checkRegexSyntax("Rewrite", i, r.source)).find(notEmpty);
			if (regexErrorMessage) return {
				routes,
				error: createError(code, regexErrorMessage, "https://vercel.link/invalid-route-source-pattern", "Learn More")
			};
			const patternError = rewrites.map((r, i) => checkPatternSyntax("Rewrite", i, r)).find(notEmpty);
			if (patternError) return {
				routes,
				error: createError(code, patternError.message, patternError.link, "Learn More")
			};
			const normalized = normalizeRoutes((0, import_superstatic.convertRewrites)(rewrites));
			if (normalized.error) {
				normalized.error.code = code;
				return {
					routes,
					error: normalized.error
				};
			}
			routes = routes || [];
			routes.push({ handle: "filesystem" });
			routes.push(...normalized.routes || []);
		}
		return {
			routes,
			error: null
		};
	}
	0 && (module.exports = {
		appendRoutesToPhase,
		getCleanUrls,
		getOwnershipGuard,
		getTransformedRoutes,
		isHandler,
		isValidHandleValue,
		mergeRoutes,
		normalizeRoutePrefix,
		normalizeRoutes,
		scopeRouteSourceToOwnership,
		sourceToRegex,
		...require_schemas(),
		...require_types()
	});
}));
require_dist();
nodePath.posix.join;
//#endregion
//#region node_modules/.pnpm/@astrojs+vercel@11.0.5_astr_143f72aa12410e208f1e2068a31016fa/node_modules/@astrojs/vercel/dist/index.js
var ASTRO_PATH_HEADER = "x-astro-path";
var ASTRO_PATH_PARAM = "x_astro_path";
var ASTRO_PATH_TOKEN_PARAM = "x_astro_path_token";
var ASTRO_LOCALS_HEADER = "x-astro-locals";
var ASTRO_MIDDLEWARE_SECRET_HEADER = "x-astro-middleware-secret";
//#endregion
//#region \0virtual:astro-vercel:config
var middlewareSecret = "571b2178-8893-4b93-a441-0e7dab3acc9d";
//#endregion
//#region \0virtual:astro:fetchable
var _virtual_astro_fetchable_default = new DefaultFetchHandler();
//#endregion
//#region node_modules/.pnpm/@astrojs+mdx@7.0.5_@astrojs_16a860a0f54a70ad61a9c9c331e204a6/node_modules/@astrojs/mdx/dist/server.js
var slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
async function check(Component, props, { default: children = null, ...slotted } = {}) {
	if (typeof Component !== "function") return false;
	const slots = {};
	for (const [key, value] of Object.entries(slotted)) {
		const name = slotName(key);
		slots[name] = value;
	}
	try {
		return (await Component({
			...props,
			...slots,
			children
		}))[AstroJSX];
	} catch (e) {
		throwEnhancedErrorIfMdxComponent(e, Component);
	}
	return false;
}
async function renderToStaticMarkup(Component, props = {}, { default: children = null, ...slotted } = {}) {
	const slots = {};
	for (const [key, value] of Object.entries(slotted)) {
		const name = slotName(key);
		slots[name] = value;
	}
	const { result } = this;
	try {
		let html = "";
		const destination = { write(chunk) {
			if (chunk instanceof Response) return;
			html += chunkToString(result, chunk);
		} };
		await renderStreaming(createVNode(Component, {
			...props,
			...slots,
			children
		}), result, destination);
		return { html };
	} catch (e) {
		throwEnhancedErrorIfMdxComponent(e, Component);
		throw e;
	}
}
function throwEnhancedErrorIfMdxComponent(error, Component) {
	if (Component[/* @__PURE__ */ Symbol.for("mdx-component")]) {
		if (AstroUserError.is(error)) return;
		error.title = error.name;
		error.hint = `This issue often occurs when your MDX component encounters runtime errors.`;
		throw error;
	}
}
//#endregion
//#region \0virtual:astro:renderers
var renderers = [Object.assign({
	"name": "astro:jsx",
	"serverEntrypoint": "file:///C:/Users/22790/astro-blog2/node_modules/.pnpm/@astrojs+mdx@7.0.5_@astrojs_16a860a0f54a70ad61a9c9c331e204a6/node_modules/@astrojs/mdx/dist/server.js"
}, { ssr: {
	name: "astro:jsx",
	check,
	renderToStaticMarkup
} })];
[
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "page",
			"component": "_server-islands.astro",
			"params": ["name"],
			"segments": [[{
				"content": "_server-islands",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "name",
				"dynamic": true,
				"spread": false
			}]],
			"pattern": "^\\/_server-islands\\/([^/]+?)$",
			"prerender": false,
			"isIndex": false,
			"fallbackRoutes": [],
			"route": "/_server-islands/[name]",
			"origin": "internal",
			"distURL": [],
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/_image",
			"component": "node_modules/.pnpm/astro@7.2.0_@astrojs+markdo_d30460ecf2a64a9cdb0ccff5894b897c/node_modules/astro/dist/assets/endpoint/generic.js",
			"params": [],
			"pathname": "/_image",
			"pattern": "^\\/_image$",
			"segments": [[{
				"content": "_image",
				"dynamic": false,
				"spread": false
			}]],
			"type": "endpoint",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"isIndex": false,
			"origin": "internal",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/404",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/404$",
			"segments": [[{
				"content": "404",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/404.astro",
			"pathname": "/404",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/about",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/about$",
			"segments": [[{
				"content": "about",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/about/index.astro",
			"pathname": "/about",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/academic",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/academic$",
			"segments": [[{
				"content": "academic",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/academic/index.astro",
			"pathname": "/academic",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/article",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/article$",
			"segments": [[{
				"content": "article",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/article/index.astro",
			"pathname": "/article",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/collection",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/collection$",
			"segments": [[{
				"content": "collection",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/collection/index.astro",
			"pathname": "/collection",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/about",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/en\\/about$",
			"segments": [[{
				"content": "en",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "about",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/en/about/index.astro",
			"pathname": "/en/about",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/academic",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/en\\/academic$",
			"segments": [[{
				"content": "en",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "academic",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/en/academic/index.astro",
			"pathname": "/en/academic",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/article",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/en\\/article$",
			"segments": [[{
				"content": "en",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "article",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/en/article/index.astro",
			"pathname": "/en/article",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/collection",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/en\\/collection$",
			"segments": [[{
				"content": "en",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "collection",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/en/collection/index.astro",
			"pathname": "/en/collection",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/links",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/en\\/links$",
			"segments": [[{
				"content": "en",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "links",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/en/links/index.astro",
			"pathname": "/en/links",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/projects",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/en\\/projects$",
			"segments": [[{
				"content": "en",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "projects",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/en/projects/index.astro",
			"pathname": "/en/projects",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/search",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/en\\/search$",
			"segments": [[{
				"content": "en",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "search",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/en/search/index.astro",
			"pathname": "/en/search",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/tags",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/en\\/tags$",
			"segments": [[{
				"content": "en",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "tags",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/en/tags/index.astro",
			"pathname": "/en/tags",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/terms/copyright",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/terms\\/copyright$",
			"segments": [
				[{
					"content": "en",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "terms",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "copyright",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/en/terms/copyright.md",
			"pathname": "/en/terms/copyright",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/terms/disclaimer",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/terms\\/disclaimer$",
			"segments": [
				[{
					"content": "en",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "terms",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "disclaimer",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/en/terms/disclaimer.md",
			"pathname": "/en/terms/disclaimer",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/terms/list",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/terms\\/list$",
			"segments": [
				[{
					"content": "en",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "terms",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "list",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/en/terms/list.astro",
			"pathname": "/en/terms/list",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/terms/privacy-policy",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/terms\\/privacy-policy$",
			"segments": [
				[{
					"content": "en",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "terms",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "privacy-policy",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/en/terms/privacy-policy.md",
			"pathname": "/en/terms/privacy-policy",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/terms/terms-and-conditions",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/terms\\/terms-and-conditions$",
			"segments": [
				[{
					"content": "en",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "terms",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "terms-and-conditions",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/en/terms/terms-and-conditions.md",
			"pathname": "/en/terms/terms-and-conditions",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/en$",
			"segments": [[{
				"content": "en",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/en/index.astro",
			"pathname": "/en",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/links",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/links$",
			"segments": [[{
				"content": "links",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/links/index.astro",
			"pathname": "/links",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/projects",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/projects$",
			"segments": [[{
				"content": "projects",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/projects/index.astro",
			"pathname": "/projects",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/robots.txt",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/robots\\.txt$",
			"segments": [[{
				"content": "robots.txt",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/robots.txt.ts",
			"pathname": "/robots.txt",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/rss.xml",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/rss\\.xml$",
			"segments": [[{
				"content": "rss.xml",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/rss.xml.ts",
			"pathname": "/rss.xml",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/search",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/search$",
			"segments": [[{
				"content": "search",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/search/index.astro",
			"pathname": "/search",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/tags",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/tags$",
			"segments": [[{
				"content": "tags",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/tags/index.astro",
			"pathname": "/tags",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/terms/copyright",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/terms\\/copyright$",
			"segments": [[{
				"content": "terms",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "copyright",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/terms/copyright.md",
			"pathname": "/terms/copyright",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/terms/disclaimer",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/terms\\/disclaimer$",
			"segments": [[{
				"content": "terms",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "disclaimer",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/terms/disclaimer.md",
			"pathname": "/terms/disclaimer",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/terms/list",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/terms\\/list$",
			"segments": [[{
				"content": "terms",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "list",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/terms/list.astro",
			"pathname": "/terms/list",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/terms/privacy-policy",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/terms\\/privacy-policy$",
			"segments": [[{
				"content": "terms",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "privacy-policy",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/terms/privacy-policy.md",
			"pathname": "/terms/privacy-policy",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/terms/terms-and-conditions",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/terms\\/terms-and-conditions$",
			"segments": [[{
				"content": "terms",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "terms-and-conditions",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/terms/terms-and-conditions.md",
			"pathname": "/terms/terms-and-conditions",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/$",
			"segments": [],
			"params": [],
			"component": "src/pages/index.astro",
			"pathname": "/",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	}
].map(deserializeRouteInfo);
//#endregion
//#region \0virtual:astro:pages
var _page0 = () => import("./chunks/generic_BcVrbtMI.mjs");
var _page1 = () => import("./chunks/404_Cdot54yE.mjs");
var _page2 = () => import("./chunks/index_rIBGxSe7.mjs");
var _page3 = () => import("./chunks/index_CWKpn2W7.mjs");
var _page4 = () => import("./chunks/index_q4WWOwo7.mjs");
var _page5 = () => import("./chunks/index_BPGZxuBz.mjs");
var _page6 = () => import("./chunks/index_DxPxMoQV.mjs");
var _page7 = () => import("./chunks/index_Dpu0sikG.mjs");
var _page8 = () => import("./chunks/index_BT35YZMw.mjs");
var _page9 = () => import("./chunks/index_CJN8Kios.mjs");
var _page10 = () => import("./chunks/index_DVJnUOcF.mjs");
var _page11 = () => import("./chunks/index_DxYz7848.mjs");
var _page12 = () => import("./chunks/index_B14H7aRj.mjs");
var _page13 = () => import("./chunks/index_Bsg0ZmVF.mjs");
var _page14 = () => import("./chunks/copyright_BYoXl4Ov.mjs");
var _page15 = () => import("./chunks/disclaimer_CSvP0jvV.mjs");
var _page16 = () => import("./chunks/list_fEILwwXq.mjs");
var _page17 = () => import("./chunks/privacy-policy_OhvZ8J1Q.mjs");
var _page18 = () => import("./chunks/terms-and-conditions_UhNJB9aN.mjs");
var _page19 = () => import("./chunks/index_Db0fbwh_.mjs");
var _page20 = () => import("./chunks/index_Ewv7eVK6.mjs");
var _page21 = () => import("./chunks/index_B3JKn535.mjs");
var _page22 = () => import("./chunks/robots_Cu_Qu22X.mjs");
var _page23 = () => import("./chunks/rss_B0IO4yTG.mjs");
var _page24 = () => import("./chunks/index_CqKSXJzy2.mjs");
var _page25 = () => import("./chunks/index_Bo0dY9x32.mjs");
var _page26 = () => import("./chunks/copyright_BO6WKJps.mjs");
var _page27 = () => import("./chunks/disclaimer_DmnGhZuQ.mjs");
var _page28 = () => import("./chunks/list_VdvseTrL.mjs");
var _page29 = () => import("./chunks/privacy-policy_DzNwdtW0.mjs");
var _page30 = () => import("./chunks/terms-and-conditions_D3q_1D6C.mjs");
var _page31 = () => import("./chunks/index_D69oPKm6.mjs");
var pageMap = /* @__PURE__ */ new Map([
	["node_modules/.pnpm/astro@7.2.0_@astrojs+markdo_d30460ecf2a64a9cdb0ccff5894b897c/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
	["src/pages/404.astro", _page1],
	["src/pages/about/index.astro", _page2],
	["src/pages/academic/index.astro", _page3],
	["src/pages/article/index.astro", _page4],
	["src/pages/collection/index.astro", _page5],
	["src/pages/en/about/index.astro", _page6],
	["src/pages/en/academic/index.astro", _page7],
	["src/pages/en/article/index.astro", _page8],
	["src/pages/en/collection/index.astro", _page9],
	["src/pages/en/links/index.astro", _page10],
	["src/pages/en/projects/index.astro", _page11],
	["src/pages/en/search/index.astro", _page12],
	["src/pages/en/tags/index.astro", _page13],
	["src/pages/en/terms/copyright.md", _page14],
	["src/pages/en/terms/disclaimer.md", _page15],
	["src/pages/en/terms/list.astro", _page16],
	["src/pages/en/terms/privacy-policy.md", _page17],
	["src/pages/en/terms/terms-and-conditions.md", _page18],
	["src/pages/en/index.astro", _page19],
	["src/pages/links/index.astro", _page20],
	["src/pages/projects/index.astro", _page21],
	["src/pages/robots.txt.ts", _page22],
	["src/pages/rss.xml.ts", _page23],
	["src/pages/search/index.astro", _page24],
	["src/pages/tags/index.astro", _page25],
	["src/pages/terms/copyright.md", _page26],
	["src/pages/terms/disclaimer.md", _page27],
	["src/pages/terms/list.astro", _page28],
	["src/pages/terms/privacy-policy.md", _page29],
	["src/pages/terms/terms-and-conditions.md", _page30],
	["src/pages/index.astro", _page31]
]);
//#endregion
//#region \0virtual:astro:manifest
var _manifest = deserializeManifest({"rootDir":"file:///C:/Users/22790/astro-blog2/","cacheDir":"file:///C:/Users/22790/astro-blog2/node_modules/.astro/","outDir":"file:///C:/Users/22790/astro-blog2/dist/","srcDir":"file:///C:/Users/22790/astro-blog2/src/","publicDir":"file:///C:/Users/22790/astro-blog2/public/","buildClientDir":"file:///C:/Users/22790/astro-blog2/dist/client/","buildServerDir":"file:///C:/Users/22790/astro-blog2/dist/server/","adapterName":"@astrojs/vercel","assetsDir":"_astro","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","distURL":[],"_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[],"routeData":{"route":"/_image","component":"node_modules/.pnpm/astro@7.2.0_@astrojs+markdo_d30460ecf2a64a9cdb0ccff5894b897c/node_modules/astro/dist/assets/endpoint/generic.js","params":[],"pathname":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"type":"endpoint","prerender":false,"fallbackRoutes":[],"distURL":[],"isIndex":false,"origin":"internal","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[{"type":"external","src":"_astro/BaseLayout.CL6vbAf4.css"},{"type":"inline","content":".expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:0fr}.expanded:where(.astro-fj7gv3ii) .expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:1fr}svg:where(.astro-sqapcrnd){color:var(--sl-icon-color);font-size:var(--sl-icon-size,1em);width:1.5em;height:1.5em}.aside:where(.astro-mjo7ae67)>.aside-container:where(.astro-mjo7ae67){--tw-bg-opacity:.07;&.aside-tip{--primary:234 60% 60%}&.aside-caution{--primary:41 90% 50%}&.aside-danger{--primary:339 90% 60%}& .aside-content{&>:where(.astro-mjo7ae67):first-child{margin-top:0}&>:where(.astro-mjo7ae67):last-child{margin-bottom:0}& p a,& li a,& blockquote a,& td a,& a{color:hsl(var(--foreground) / var(--tw-text-opacity,1));text-decoration:underline;text-decoration-color:hsl(var(--muted-foreground) / .5);text-underline-offset:.125rem;border-radius:.25rem;margin:-.125rem -.25rem;padding:.125rem .25rem;transition:all .2s;&:hover{background-color:hsl(var(--foreground) / var(--tw-text-opacity,1));color:hsl(var(--background));text-decoration:none}}}}starlight-tabs:where(.astro-f45cruvs){display:block}.tablist-wrapper:where(.astro-f45cruvs){overflow-x:auto}:where(.astro-f45cruvs)[role=tablist]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));padding:0;list-style:none;display:flex}.tab:where(.astro-f45cruvs){margin-bottom:-2px}.tab:where(.astro-f45cruvs)>:where(.astro-f45cruvs)[role=tab]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));color:hsl(var(--foreground) / var(--tw-text-opacity,1));outline-offset:-.1875rem;overflow-wrap:initial;align-items:center;gap:.5rem;padding:.2rem 1.25rem;text-decoration:none;display:flex}.tab:where(.astro-f45cruvs) :where(.astro-f45cruvs)[role=tab][aria-selected=true]{color:hsl(var(--primary) / var(--tw-text-opacity,1));border-color:hsl(var(--primary) / var(--tw-text-opacity,1));font-weight:600}.tablist-wrapper:where(.astro-f45cruvs)~[role=tabpanel]{margin-top:1rem}.mdx-repl:where(.astro-rbi54dnn){background:linear-gradient(135deg, hsl(var(--primary) / .05) 0%, hsl(var(--muted) / .2) 100%)}.mdx-repl-container:where(.astro-rbi54dnn)>*{width:var(--width)}.mdx-repl-container:where(.astro-rbi54dnn)>:first-child{margin-top:0}.mdx-repl-container:where(.astro-rbi54dnn)>:last-child{margin-bottom:0}.mdx-repl:where(.astro-rbi54dnn) .astro-code{border-radius:0;margin:0}.mdx-repl:where(.astro-rbi54dnn) div[role=tabpanel]{margin-top:0}.sl-steps{--bullet-size:calc(1.75rem);--bullet-margin:.375rem;counter-reset:steps-counter var(--sl-steps-start,0);padding-inline-start:0!important;list-style:none!important}.sl-steps>li{counter-increment:steps-counter;padding-inline-start:calc(var(--bullet-size) + 1rem);min-height:calc(var(--bullet-size) + var(--bullet-margin));padding-bottom:1px;position:relative}.sl-steps>li+li{margin-top:0}.sl-steps>li:before{content:counter(steps-counter);top:0;width:var(--bullet-size);height:var(--bullet-size);line-height:var(--bullet-size);text-align:center;color:hsl(var(--foreground) / var(--tw-text-opacity,1));background-color:hsl(var(--primary-foreground) / var(--tw-bg-opacity,1));box-shadow:inset 0 0 0 1px hsl(var(--border) / var(--tw-border-opacity,1));border-radius:99rem;font-size:.8125rem;font-weight:600;position:absolute;inset-inline-start:0}.sl-steps>li:after{--guide-width:1px;content:\"\";top:calc(var(--bullet-size) + var(--bullet-margin));bottom:var(--bullet-margin);width:var(--guide-width);background-color:hsl(var(--border) / var(--tw-border-opacity,1));position:absolute;inset-inline-start:calc((var(--bullet-size) - var(--guide-width)) / 2)}.sl-steps>li>:first-child{--lh:calc(1.75em);--shift-y:calc(.5 * (var(--bullet-size) - var(--lh)));transform:translateY(var(--shift-y));margin-top:0;margin-bottom:var(--shift-y);color:hsl(var(--foreground) / var(--tw-text-opacity,1))}.sl-steps>li>:first-child:where(h1,h2,h3,h4,h5,h6){--lh:calc(1.2em)}\n"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[{"type":"inline","content":".algorithm-showcase:where(.astro-xqbetnri){width:100%;margin:2rem 0}.showcase-header:where(.astro-xqbetnri){justify-content:space-between;align-items:center;margin-bottom:1.5rem;display:flex}.showcase-header:where(.astro-xqbetnri) h3:where(.astro-xqbetnri){color:#64748b;letter-spacing:.05em;text-transform:uppercase;margin:0;font-size:.875rem;font-weight:500;transition:all .3s}.showcase-controls:where(.astro-xqbetnri){align-items:center;gap:1rem;display:flex}.nav-btn:where(.astro-xqbetnri){backdrop-filter:blur(8px);color:#64748b;cursor:pointer;background:#fffc;border:none;border-radius:8px;justify-content:center;align-items:center;width:32px;height:32px;transition:all .2s;display:flex;box-shadow:0 2px 8px #0000001a}.nav-btn:where(.astro-xqbetnri):hover{color:#334155;background:#fffffff2;transform:translateY(-1px);box-shadow:0 4px 12px #00000026}.nav-btn:where(.astro-xqbetnri):disabled{opacity:.4;cursor:not-allowed;transform:none;box-shadow:0 2px 8px #0000001a}.nav-btn:where(.astro-xqbetnri):disabled:hover{color:#64748b;background:#fffc;transform:none;box-shadow:0 2px 8px #0000001a}.indicator-dots:where(.astro-xqbetnri){gap:8px;display:flex}.dot:where(.astro-xqbetnri){cursor:pointer;background:#cbd5e1;border-radius:50%;width:8px;height:8px;transition:all .3s}.dot:where(.astro-xqbetnri).active{background:#3b82f6;transform:scale(1.2)}.dot:where(.astro-xqbetnri):hover:not(.active){background:#94a3b8;transform:scale(1.1)}.showcase-content:where(.astro-xqbetnri){background:0 0;border-radius:24px;position:relative;overflow:hidden}.showcase-slider:where(.astro-xqbetnri){transition:transform .5s cubic-bezier(.4,0,.2,1);display:flex}.showcase-slide:where(.astro-xqbetnri){opacity:0;flex-shrink:0;width:100%;transition:opacity .5s}.showcase-slide:where(.astro-xqbetnri).active{opacity:1}.boids-showcase:where(.astro-xqbetnri){background:0 0;border-radius:24px;width:100%;height:500px;position:relative;overflow:hidden}#boidsCanvas:where(.astro-xqbetnri){width:100%;height:100%;display:block}.cellular-automata-showcase:where(.astro-xqbetnri){background:0 0;border-radius:24px;width:100%;height:500px;position:relative;overflow:hidden}#cellularAutomataCanvas:where(.astro-xqbetnri){cursor:pointer;width:100%;height:100%;display:block}.astar-showcase:where(.astro-xqbetnri){background:0 0;border-radius:24px;width:100%;height:500px;position:relative;overflow:hidden}#astarCanvas:where(.astro-xqbetnri){cursor:crosshair;width:100%;height:100%;display:block}.placeholder-content:where(.astro-xqbetnri){text-align:center;background:linear-gradient(135deg,#f8fafc 0%,#e2e8f0 100%);border:2px dashed #cbd5e1;border-radius:24px;flex-direction:column;justify-content:center;align-items:center;height:500px;padding:2rem;display:flex}.placeholder-icon:where(.astro-xqbetnri){opacity:.6;margin-bottom:1rem;font-size:4rem}.placeholder-content:where(.astro-xqbetnri) h4:where(.astro-xqbetnri){color:#475569;margin:0 0 .5rem;font-size:1.5rem}.placeholder-content:where(.astro-xqbetnri) p:where(.astro-xqbetnri){color:#64748b;margin:0 0 1rem;font-size:1rem}.coming-soon:where(.astro-xqbetnri){color:#475569;background:#f1f5f9;border-radius:20px;padding:.5rem 1rem;font-size:.875rem;font-weight:500;display:inline-block}@media (width<=768px){.showcase-header:where(.astro-xqbetnri){flex-direction:row;align-items:center;gap:1rem;margin-bottom:1rem}.showcase-header:where(.astro-xqbetnri) h3:where(.astro-xqbetnri){font-size:.8rem}.showcase-controls:where(.astro-xqbetnri){gap:.75rem}.boids-showcase:where(.astro-xqbetnri),.cellular-automata-showcase:where(.astro-xqbetnri),.astar-showcase:where(.astro-xqbetnri),.placeholder-content:where(.astro-xqbetnri){border-radius:20px;height:400px}}\n.expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:0fr}.expanded:where(.astro-fj7gv3ii) .expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:1fr}svg:where(.astro-sqapcrnd){color:var(--sl-icon-color);font-size:var(--sl-icon-size,1em);width:1.5em;height:1.5em}.aside:where(.astro-mjo7ae67)>.aside-container:where(.astro-mjo7ae67){--tw-bg-opacity:.07;&.aside-tip{--primary:234 60% 60%}&.aside-caution{--primary:41 90% 50%}&.aside-danger{--primary:339 90% 60%}& .aside-content{&>:where(.astro-mjo7ae67):first-child{margin-top:0}&>:where(.astro-mjo7ae67):last-child{margin-bottom:0}& p a,& li a,& blockquote a,& td a,& a{color:hsl(var(--foreground) / var(--tw-text-opacity,1));text-decoration:underline;text-decoration-color:hsl(var(--muted-foreground) / .5);text-underline-offset:.125rem;border-radius:.25rem;margin:-.125rem -.25rem;padding:.125rem .25rem;transition:all .2s;&:hover{background-color:hsl(var(--foreground) / var(--tw-text-opacity,1));color:hsl(var(--background));text-decoration:none}}}}starlight-tabs:where(.astro-f45cruvs){display:block}.tablist-wrapper:where(.astro-f45cruvs){overflow-x:auto}:where(.astro-f45cruvs)[role=tablist]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));padding:0;list-style:none;display:flex}.tab:where(.astro-f45cruvs){margin-bottom:-2px}.tab:where(.astro-f45cruvs)>:where(.astro-f45cruvs)[role=tab]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));color:hsl(var(--foreground) / var(--tw-text-opacity,1));outline-offset:-.1875rem;overflow-wrap:initial;align-items:center;gap:.5rem;padding:.2rem 1.25rem;text-decoration:none;display:flex}.tab:where(.astro-f45cruvs) :where(.astro-f45cruvs)[role=tab][aria-selected=true]{color:hsl(var(--primary) / var(--tw-text-opacity,1));border-color:hsl(var(--primary) / var(--tw-text-opacity,1));font-weight:600}.tablist-wrapper:where(.astro-f45cruvs)~[role=tabpanel]{margin-top:1rem}.mdx-repl:where(.astro-rbi54dnn){background:linear-gradient(135deg, hsl(var(--primary) / .05) 0%, hsl(var(--muted) / .2) 100%)}.mdx-repl-container:where(.astro-rbi54dnn)>*{width:var(--width)}.mdx-repl-container:where(.astro-rbi54dnn)>:first-child{margin-top:0}.mdx-repl-container:where(.astro-rbi54dnn)>:last-child{margin-bottom:0}.mdx-repl:where(.astro-rbi54dnn) .astro-code{border-radius:0;margin:0}.mdx-repl:where(.astro-rbi54dnn) div[role=tabpanel]{margin-top:0}.sl-steps{--bullet-size:calc(1.75rem);--bullet-margin:.375rem;counter-reset:steps-counter var(--sl-steps-start,0);padding-inline-start:0!important;list-style:none!important}.sl-steps>li{counter-increment:steps-counter;padding-inline-start:calc(var(--bullet-size) + 1rem);min-height:calc(var(--bullet-size) + var(--bullet-margin));padding-bottom:1px;position:relative}.sl-steps>li+li{margin-top:0}.sl-steps>li:before{content:counter(steps-counter);top:0;width:var(--bullet-size);height:var(--bullet-size);line-height:var(--bullet-size);text-align:center;color:hsl(var(--foreground) / var(--tw-text-opacity,1));background-color:hsl(var(--primary-foreground) / var(--tw-bg-opacity,1));box-shadow:inset 0 0 0 1px hsl(var(--border) / var(--tw-border-opacity,1));border-radius:99rem;font-size:.8125rem;font-weight:600;position:absolute;inset-inline-start:0}.sl-steps>li:after{--guide-width:1px;content:\"\";top:calc(var(--bullet-size) + var(--bullet-margin));bottom:var(--bullet-margin);width:var(--guide-width);background-color:hsl(var(--border) / var(--tw-border-opacity,1));position:absolute;inset-inline-start:calc((var(--bullet-size) - var(--guide-width)) / 2)}.sl-steps>li>:first-child{--lh:calc(1.75em);--shift-y:calc(.5 * (var(--bullet-size) - var(--lh)));transform:translateY(var(--shift-y));margin-top:0;margin-bottom:var(--shift-y);color:hsl(var(--foreground) / var(--tw-text-opacity,1))}.sl-steps>li>:first-child:where(h1,h2,h3,h4,h5,h6){--lh:calc(1.2em)}\n"},{"type":"external","src":"_astro/pages.BnZl33Nh.css"},{"type":"external","src":"_astro/advanced.BpGthh3v.css"},{"type":"external","src":"_astro/BaseLayout.CL6vbAf4.css"}],"routeData":{"route":"/about","isIndex":true,"type":"page","pattern":"^\\/about$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about/index.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[{"type":"external","src":"_astro/pages.BnZl33Nh.css"},{"type":"external","src":"_astro/advanced.BpGthh3v.css"},{"type":"external","src":"_astro/BaseLayout.CL6vbAf4.css"},{"type":"inline","content":".expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:0fr}.expanded:where(.astro-fj7gv3ii) .expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:1fr}svg:where(.astro-sqapcrnd){color:var(--sl-icon-color);font-size:var(--sl-icon-size,1em);width:1.5em;height:1.5em}.aside:where(.astro-mjo7ae67)>.aside-container:where(.astro-mjo7ae67){--tw-bg-opacity:.07;&.aside-tip{--primary:234 60% 60%}&.aside-caution{--primary:41 90% 50%}&.aside-danger{--primary:339 90% 60%}& .aside-content{&>:where(.astro-mjo7ae67):first-child{margin-top:0}&>:where(.astro-mjo7ae67):last-child{margin-bottom:0}& p a,& li a,& blockquote a,& td a,& a{color:hsl(var(--foreground) / var(--tw-text-opacity,1));text-decoration:underline;text-decoration-color:hsl(var(--muted-foreground) / .5);text-underline-offset:.125rem;border-radius:.25rem;margin:-.125rem -.25rem;padding:.125rem .25rem;transition:all .2s;&:hover{background-color:hsl(var(--foreground) / var(--tw-text-opacity,1));color:hsl(var(--background));text-decoration:none}}}}starlight-tabs:where(.astro-f45cruvs){display:block}.tablist-wrapper:where(.astro-f45cruvs){overflow-x:auto}:where(.astro-f45cruvs)[role=tablist]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));padding:0;list-style:none;display:flex}.tab:where(.astro-f45cruvs){margin-bottom:-2px}.tab:where(.astro-f45cruvs)>:where(.astro-f45cruvs)[role=tab]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));color:hsl(var(--foreground) / var(--tw-text-opacity,1));outline-offset:-.1875rem;overflow-wrap:initial;align-items:center;gap:.5rem;padding:.2rem 1.25rem;text-decoration:none;display:flex}.tab:where(.astro-f45cruvs) :where(.astro-f45cruvs)[role=tab][aria-selected=true]{color:hsl(var(--primary) / var(--tw-text-opacity,1));border-color:hsl(var(--primary) / var(--tw-text-opacity,1));font-weight:600}.tablist-wrapper:where(.astro-f45cruvs)~[role=tabpanel]{margin-top:1rem}.mdx-repl:where(.astro-rbi54dnn){background:linear-gradient(135deg, hsl(var(--primary) / .05) 0%, hsl(var(--muted) / .2) 100%)}.mdx-repl-container:where(.astro-rbi54dnn)>*{width:var(--width)}.mdx-repl-container:where(.astro-rbi54dnn)>:first-child{margin-top:0}.mdx-repl-container:where(.astro-rbi54dnn)>:last-child{margin-bottom:0}.mdx-repl:where(.astro-rbi54dnn) .astro-code{border-radius:0;margin:0}.mdx-repl:where(.astro-rbi54dnn) div[role=tabpanel]{margin-top:0}.sl-steps{--bullet-size:calc(1.75rem);--bullet-margin:.375rem;counter-reset:steps-counter var(--sl-steps-start,0);padding-inline-start:0!important;list-style:none!important}.sl-steps>li{counter-increment:steps-counter;padding-inline-start:calc(var(--bullet-size) + 1rem);min-height:calc(var(--bullet-size) + var(--bullet-margin));padding-bottom:1px;position:relative}.sl-steps>li+li{margin-top:0}.sl-steps>li:before{content:counter(steps-counter);top:0;width:var(--bullet-size);height:var(--bullet-size);line-height:var(--bullet-size);text-align:center;color:hsl(var(--foreground) / var(--tw-text-opacity,1));background-color:hsl(var(--primary-foreground) / var(--tw-bg-opacity,1));box-shadow:inset 0 0 0 1px hsl(var(--border) / var(--tw-border-opacity,1));border-radius:99rem;font-size:.8125rem;font-weight:600;position:absolute;inset-inline-start:0}.sl-steps>li:after{--guide-width:1px;content:\"\";top:calc(var(--bullet-size) + var(--bullet-margin));bottom:var(--bullet-margin);width:var(--guide-width);background-color:hsl(var(--border) / var(--tw-border-opacity,1));position:absolute;inset-inline-start:calc((var(--bullet-size) - var(--guide-width)) / 2)}.sl-steps>li>:first-child{--lh:calc(1.75em);--shift-y:calc(.5 * (var(--bullet-size) - var(--lh)));transform:translateY(var(--shift-y));margin-top:0;margin-bottom:var(--shift-y);color:hsl(var(--foreground) / var(--tw-text-opacity,1))}.sl-steps>li>:first-child:where(h1,h2,h3,h4,h5,h6){--lh:calc(1.2em)}\n"}],"routeData":{"route":"/academic","isIndex":true,"type":"page","pattern":"^\\/academic$","segments":[[{"content":"academic","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/academic/index.astro","pathname":"/academic","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[],"routeData":{"route":"/archives","isIndex":true,"type":"page","pattern":"^\\/archives$","segments":[[{"content":"archives","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/archives/index.astro","pathname":"/archives","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[],"routeData":{"route":"/article/[category]/[...page]","isIndex":false,"type":"page","pattern":"^\\/article\\/([^/]+?)(?:\\/(.*?))?$","segments":[[{"content":"article","dynamic":false,"spread":false}],[{"content":"category","dynamic":true,"spread":false}],[{"content":"...page","dynamic":true,"spread":true}]],"params":["category","...page"],"component":"src/pages/article/[category]/[...page].astro","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[{"type":"external","src":"_astro/BaseLayout.CL6vbAf4.css"},{"type":"inline","content":".expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:0fr}.expanded:where(.astro-fj7gv3ii) .expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:1fr}svg:where(.astro-sqapcrnd){color:var(--sl-icon-color);font-size:var(--sl-icon-size,1em);width:1.5em;height:1.5em}.aside:where(.astro-mjo7ae67)>.aside-container:where(.astro-mjo7ae67){--tw-bg-opacity:.07;&.aside-tip{--primary:234 60% 60%}&.aside-caution{--primary:41 90% 50%}&.aside-danger{--primary:339 90% 60%}& .aside-content{&>:where(.astro-mjo7ae67):first-child{margin-top:0}&>:where(.astro-mjo7ae67):last-child{margin-bottom:0}& p a,& li a,& blockquote a,& td a,& a{color:hsl(var(--foreground) / var(--tw-text-opacity,1));text-decoration:underline;text-decoration-color:hsl(var(--muted-foreground) / .5);text-underline-offset:.125rem;border-radius:.25rem;margin:-.125rem -.25rem;padding:.125rem .25rem;transition:all .2s;&:hover{background-color:hsl(var(--foreground) / var(--tw-text-opacity,1));color:hsl(var(--background));text-decoration:none}}}}starlight-tabs:where(.astro-f45cruvs){display:block}.tablist-wrapper:where(.astro-f45cruvs){overflow-x:auto}:where(.astro-f45cruvs)[role=tablist]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));padding:0;list-style:none;display:flex}.tab:where(.astro-f45cruvs){margin-bottom:-2px}.tab:where(.astro-f45cruvs)>:where(.astro-f45cruvs)[role=tab]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));color:hsl(var(--foreground) / var(--tw-text-opacity,1));outline-offset:-.1875rem;overflow-wrap:initial;align-items:center;gap:.5rem;padding:.2rem 1.25rem;text-decoration:none;display:flex}.tab:where(.astro-f45cruvs) :where(.astro-f45cruvs)[role=tab][aria-selected=true]{color:hsl(var(--primary) / var(--tw-text-opacity,1));border-color:hsl(var(--primary) / var(--tw-text-opacity,1));font-weight:600}.tablist-wrapper:where(.astro-f45cruvs)~[role=tabpanel]{margin-top:1rem}.mdx-repl:where(.astro-rbi54dnn){background:linear-gradient(135deg, hsl(var(--primary) / .05) 0%, hsl(var(--muted) / .2) 100%)}.mdx-repl-container:where(.astro-rbi54dnn)>*{width:var(--width)}.mdx-repl-container:where(.astro-rbi54dnn)>:first-child{margin-top:0}.mdx-repl-container:where(.astro-rbi54dnn)>:last-child{margin-bottom:0}.mdx-repl:where(.astro-rbi54dnn) .astro-code{border-radius:0;margin:0}.mdx-repl:where(.astro-rbi54dnn) div[role=tabpanel]{margin-top:0}.sl-steps{--bullet-size:calc(1.75rem);--bullet-margin:.375rem;counter-reset:steps-counter var(--sl-steps-start,0);padding-inline-start:0!important;list-style:none!important}.sl-steps>li{counter-increment:steps-counter;padding-inline-start:calc(var(--bullet-size) + 1rem);min-height:calc(var(--bullet-size) + var(--bullet-margin));padding-bottom:1px;position:relative}.sl-steps>li+li{margin-top:0}.sl-steps>li:before{content:counter(steps-counter);top:0;width:var(--bullet-size);height:var(--bullet-size);line-height:var(--bullet-size);text-align:center;color:hsl(var(--foreground) / var(--tw-text-opacity,1));background-color:hsl(var(--primary-foreground) / var(--tw-bg-opacity,1));box-shadow:inset 0 0 0 1px hsl(var(--border) / var(--tw-border-opacity,1));border-radius:99rem;font-size:.8125rem;font-weight:600;position:absolute;inset-inline-start:0}.sl-steps>li:after{--guide-width:1px;content:\"\";top:calc(var(--bullet-size) + var(--bullet-margin));bottom:var(--bullet-margin);width:var(--guide-width);background-color:hsl(var(--border) / var(--tw-border-opacity,1));position:absolute;inset-inline-start:calc((var(--bullet-size) - var(--guide-width)) / 2)}.sl-steps>li>:first-child{--lh:calc(1.75em);--shift-y:calc(.5 * (var(--bullet-size) - var(--lh)));transform:translateY(var(--shift-y));margin-top:0;margin-bottom:var(--shift-y);color:hsl(var(--foreground) / var(--tw-text-opacity,1))}.sl-steps>li>:first-child:where(h1,h2,h3,h4,h5,h6){--lh:calc(1.2em)}\n"}],"routeData":{"route":"/article","isIndex":true,"type":"page","pattern":"^\\/article$","segments":[[{"content":"article","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/article/index.astro","pathname":"/article","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[],"routeData":{"route":"/article/[...id]","isIndex":false,"type":"page","pattern":"^\\/article(?:\\/(.*?))?$","segments":[[{"content":"article","dynamic":false,"spread":false}],[{"content":"...id","dynamic":true,"spread":true}]],"params":["...id"],"component":"src/pages/article/[...id].astro","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[],"routeData":{"route":"/collection/[id]","isIndex":false,"type":"page","pattern":"^\\/collection\\/([^/]+?)$","segments":[[{"content":"collection","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/collection/[id].astro","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[{"type":"external","src":"_astro/BaseLayout.CL6vbAf4.css"},{"type":"external","src":"_astro/pages.BnZl33Nh.css"},{"type":"external","src":"_astro/advanced.BpGthh3v.css"},{"type":"inline","content":".expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:0fr}.expanded:where(.astro-fj7gv3ii) .expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:1fr}svg:where(.astro-sqapcrnd){color:var(--sl-icon-color);font-size:var(--sl-icon-size,1em);width:1.5em;height:1.5em}.aside:where(.astro-mjo7ae67)>.aside-container:where(.astro-mjo7ae67){--tw-bg-opacity:.07;&.aside-tip{--primary:234 60% 60%}&.aside-caution{--primary:41 90% 50%}&.aside-danger{--primary:339 90% 60%}& .aside-content{&>:where(.astro-mjo7ae67):first-child{margin-top:0}&>:where(.astro-mjo7ae67):last-child{margin-bottom:0}& p a,& li a,& blockquote a,& td a,& a{color:hsl(var(--foreground) / var(--tw-text-opacity,1));text-decoration:underline;text-decoration-color:hsl(var(--muted-foreground) / .5);text-underline-offset:.125rem;border-radius:.25rem;margin:-.125rem -.25rem;padding:.125rem .25rem;transition:all .2s;&:hover{background-color:hsl(var(--foreground) / var(--tw-text-opacity,1));color:hsl(var(--background));text-decoration:none}}}}starlight-tabs:where(.astro-f45cruvs){display:block}.tablist-wrapper:where(.astro-f45cruvs){overflow-x:auto}:where(.astro-f45cruvs)[role=tablist]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));padding:0;list-style:none;display:flex}.tab:where(.astro-f45cruvs){margin-bottom:-2px}.tab:where(.astro-f45cruvs)>:where(.astro-f45cruvs)[role=tab]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));color:hsl(var(--foreground) / var(--tw-text-opacity,1));outline-offset:-.1875rem;overflow-wrap:initial;align-items:center;gap:.5rem;padding:.2rem 1.25rem;text-decoration:none;display:flex}.tab:where(.astro-f45cruvs) :where(.astro-f45cruvs)[role=tab][aria-selected=true]{color:hsl(var(--primary) / var(--tw-text-opacity,1));border-color:hsl(var(--primary) / var(--tw-text-opacity,1));font-weight:600}.tablist-wrapper:where(.astro-f45cruvs)~[role=tabpanel]{margin-top:1rem}.mdx-repl:where(.astro-rbi54dnn){background:linear-gradient(135deg, hsl(var(--primary) / .05) 0%, hsl(var(--muted) / .2) 100%)}.mdx-repl-container:where(.astro-rbi54dnn)>*{width:var(--width)}.mdx-repl-container:where(.astro-rbi54dnn)>:first-child{margin-top:0}.mdx-repl-container:where(.astro-rbi54dnn)>:last-child{margin-bottom:0}.mdx-repl:where(.astro-rbi54dnn) .astro-code{border-radius:0;margin:0}.mdx-repl:where(.astro-rbi54dnn) div[role=tabpanel]{margin-top:0}.sl-steps{--bullet-size:calc(1.75rem);--bullet-margin:.375rem;counter-reset:steps-counter var(--sl-steps-start,0);padding-inline-start:0!important;list-style:none!important}.sl-steps>li{counter-increment:steps-counter;padding-inline-start:calc(var(--bullet-size) + 1rem);min-height:calc(var(--bullet-size) + var(--bullet-margin));padding-bottom:1px;position:relative}.sl-steps>li+li{margin-top:0}.sl-steps>li:before{content:counter(steps-counter);top:0;width:var(--bullet-size);height:var(--bullet-size);line-height:var(--bullet-size);text-align:center;color:hsl(var(--foreground) / var(--tw-text-opacity,1));background-color:hsl(var(--primary-foreground) / var(--tw-bg-opacity,1));box-shadow:inset 0 0 0 1px hsl(var(--border) / var(--tw-border-opacity,1));border-radius:99rem;font-size:.8125rem;font-weight:600;position:absolute;inset-inline-start:0}.sl-steps>li:after{--guide-width:1px;content:\"\";top:calc(var(--bullet-size) + var(--bullet-margin));bottom:var(--bullet-margin);width:var(--guide-width);background-color:hsl(var(--border) / var(--tw-border-opacity,1));position:absolute;inset-inline-start:calc((var(--bullet-size) - var(--guide-width)) / 2)}.sl-steps>li>:first-child{--lh:calc(1.75em);--shift-y:calc(.5 * (var(--bullet-size) - var(--lh)));transform:translateY(var(--shift-y));margin-top:0;margin-bottom:var(--shift-y);color:hsl(var(--foreground) / var(--tw-text-opacity,1))}.sl-steps>li>:first-child:where(h1,h2,h3,h4,h5,h6){--lh:calc(1.2em)}\n"}],"routeData":{"route":"/collection","isIndex":true,"type":"page","pattern":"^\\/collection$","segments":[[{"content":"collection","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/collection/index.astro","pathname":"/collection","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[{"type":"inline","content":".algorithm-showcase:where(.astro-xqbetnri){width:100%;margin:2rem 0}.showcase-header:where(.astro-xqbetnri){justify-content:space-between;align-items:center;margin-bottom:1.5rem;display:flex}.showcase-header:where(.astro-xqbetnri) h3:where(.astro-xqbetnri){color:#64748b;letter-spacing:.05em;text-transform:uppercase;margin:0;font-size:.875rem;font-weight:500;transition:all .3s}.showcase-controls:where(.astro-xqbetnri){align-items:center;gap:1rem;display:flex}.nav-btn:where(.astro-xqbetnri){backdrop-filter:blur(8px);color:#64748b;cursor:pointer;background:#fffc;border:none;border-radius:8px;justify-content:center;align-items:center;width:32px;height:32px;transition:all .2s;display:flex;box-shadow:0 2px 8px #0000001a}.nav-btn:where(.astro-xqbetnri):hover{color:#334155;background:#fffffff2;transform:translateY(-1px);box-shadow:0 4px 12px #00000026}.nav-btn:where(.astro-xqbetnri):disabled{opacity:.4;cursor:not-allowed;transform:none;box-shadow:0 2px 8px #0000001a}.nav-btn:where(.astro-xqbetnri):disabled:hover{color:#64748b;background:#fffc;transform:none;box-shadow:0 2px 8px #0000001a}.indicator-dots:where(.astro-xqbetnri){gap:8px;display:flex}.dot:where(.astro-xqbetnri){cursor:pointer;background:#cbd5e1;border-radius:50%;width:8px;height:8px;transition:all .3s}.dot:where(.astro-xqbetnri).active{background:#3b82f6;transform:scale(1.2)}.dot:where(.astro-xqbetnri):hover:not(.active){background:#94a3b8;transform:scale(1.1)}.showcase-content:where(.astro-xqbetnri){background:0 0;border-radius:24px;position:relative;overflow:hidden}.showcase-slider:where(.astro-xqbetnri){transition:transform .5s cubic-bezier(.4,0,.2,1);display:flex}.showcase-slide:where(.astro-xqbetnri){opacity:0;flex-shrink:0;width:100%;transition:opacity .5s}.showcase-slide:where(.astro-xqbetnri).active{opacity:1}.boids-showcase:where(.astro-xqbetnri){background:0 0;border-radius:24px;width:100%;height:500px;position:relative;overflow:hidden}#boidsCanvas:where(.astro-xqbetnri){width:100%;height:100%;display:block}.cellular-automata-showcase:where(.astro-xqbetnri){background:0 0;border-radius:24px;width:100%;height:500px;position:relative;overflow:hidden}#cellularAutomataCanvas:where(.astro-xqbetnri){cursor:pointer;width:100%;height:100%;display:block}.astar-showcase:where(.astro-xqbetnri){background:0 0;border-radius:24px;width:100%;height:500px;position:relative;overflow:hidden}#astarCanvas:where(.astro-xqbetnri){cursor:crosshair;width:100%;height:100%;display:block}.placeholder-content:where(.astro-xqbetnri){text-align:center;background:linear-gradient(135deg,#f8fafc 0%,#e2e8f0 100%);border:2px dashed #cbd5e1;border-radius:24px;flex-direction:column;justify-content:center;align-items:center;height:500px;padding:2rem;display:flex}.placeholder-icon:where(.astro-xqbetnri){opacity:.6;margin-bottom:1rem;font-size:4rem}.placeholder-content:where(.astro-xqbetnri) h4:where(.astro-xqbetnri){color:#475569;margin:0 0 .5rem;font-size:1.5rem}.placeholder-content:where(.astro-xqbetnri) p:where(.astro-xqbetnri){color:#64748b;margin:0 0 1rem;font-size:1rem}.coming-soon:where(.astro-xqbetnri){color:#475569;background:#f1f5f9;border-radius:20px;padding:.5rem 1rem;font-size:.875rem;font-weight:500;display:inline-block}@media (width<=768px){.showcase-header:where(.astro-xqbetnri){flex-direction:row;align-items:center;gap:1rem;margin-bottom:1rem}.showcase-header:where(.astro-xqbetnri) h3:where(.astro-xqbetnri){font-size:.8rem}.showcase-controls:where(.astro-xqbetnri){gap:.75rem}.boids-showcase:where(.astro-xqbetnri),.cellular-automata-showcase:where(.astro-xqbetnri),.astar-showcase:where(.astro-xqbetnri),.placeholder-content:where(.astro-xqbetnri){border-radius:20px;height:400px}}\n.expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:0fr}.expanded:where(.astro-fj7gv3ii) .expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:1fr}svg:where(.astro-sqapcrnd){color:var(--sl-icon-color);font-size:var(--sl-icon-size,1em);width:1.5em;height:1.5em}.aside:where(.astro-mjo7ae67)>.aside-container:where(.astro-mjo7ae67){--tw-bg-opacity:.07;&.aside-tip{--primary:234 60% 60%}&.aside-caution{--primary:41 90% 50%}&.aside-danger{--primary:339 90% 60%}& .aside-content{&>:where(.astro-mjo7ae67):first-child{margin-top:0}&>:where(.astro-mjo7ae67):last-child{margin-bottom:0}& p a,& li a,& blockquote a,& td a,& a{color:hsl(var(--foreground) / var(--tw-text-opacity,1));text-decoration:underline;text-decoration-color:hsl(var(--muted-foreground) / .5);text-underline-offset:.125rem;border-radius:.25rem;margin:-.125rem -.25rem;padding:.125rem .25rem;transition:all .2s;&:hover{background-color:hsl(var(--foreground) / var(--tw-text-opacity,1));color:hsl(var(--background));text-decoration:none}}}}starlight-tabs:where(.astro-f45cruvs){display:block}.tablist-wrapper:where(.astro-f45cruvs){overflow-x:auto}:where(.astro-f45cruvs)[role=tablist]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));padding:0;list-style:none;display:flex}.tab:where(.astro-f45cruvs){margin-bottom:-2px}.tab:where(.astro-f45cruvs)>:where(.astro-f45cruvs)[role=tab]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));color:hsl(var(--foreground) / var(--tw-text-opacity,1));outline-offset:-.1875rem;overflow-wrap:initial;align-items:center;gap:.5rem;padding:.2rem 1.25rem;text-decoration:none;display:flex}.tab:where(.astro-f45cruvs) :where(.astro-f45cruvs)[role=tab][aria-selected=true]{color:hsl(var(--primary) / var(--tw-text-opacity,1));border-color:hsl(var(--primary) / var(--tw-text-opacity,1));font-weight:600}.tablist-wrapper:where(.astro-f45cruvs)~[role=tabpanel]{margin-top:1rem}.mdx-repl:where(.astro-rbi54dnn){background:linear-gradient(135deg, hsl(var(--primary) / .05) 0%, hsl(var(--muted) / .2) 100%)}.mdx-repl-container:where(.astro-rbi54dnn)>*{width:var(--width)}.mdx-repl-container:where(.astro-rbi54dnn)>:first-child{margin-top:0}.mdx-repl-container:where(.astro-rbi54dnn)>:last-child{margin-bottom:0}.mdx-repl:where(.astro-rbi54dnn) .astro-code{border-radius:0;margin:0}.mdx-repl:where(.astro-rbi54dnn) div[role=tabpanel]{margin-top:0}.sl-steps{--bullet-size:calc(1.75rem);--bullet-margin:.375rem;counter-reset:steps-counter var(--sl-steps-start,0);padding-inline-start:0!important;list-style:none!important}.sl-steps>li{counter-increment:steps-counter;padding-inline-start:calc(var(--bullet-size) + 1rem);min-height:calc(var(--bullet-size) + var(--bullet-margin));padding-bottom:1px;position:relative}.sl-steps>li+li{margin-top:0}.sl-steps>li:before{content:counter(steps-counter);top:0;width:var(--bullet-size);height:var(--bullet-size);line-height:var(--bullet-size);text-align:center;color:hsl(var(--foreground) / var(--tw-text-opacity,1));background-color:hsl(var(--primary-foreground) / var(--tw-bg-opacity,1));box-shadow:inset 0 0 0 1px hsl(var(--border) / var(--tw-border-opacity,1));border-radius:99rem;font-size:.8125rem;font-weight:600;position:absolute;inset-inline-start:0}.sl-steps>li:after{--guide-width:1px;content:\"\";top:calc(var(--bullet-size) + var(--bullet-margin));bottom:var(--bullet-margin);width:var(--guide-width);background-color:hsl(var(--border) / var(--tw-border-opacity,1));position:absolute;inset-inline-start:calc((var(--bullet-size) - var(--guide-width)) / 2)}.sl-steps>li>:first-child{--lh:calc(1.75em);--shift-y:calc(.5 * (var(--bullet-size) - var(--lh)));transform:translateY(var(--shift-y));margin-top:0;margin-bottom:var(--shift-y);color:hsl(var(--foreground) / var(--tw-text-opacity,1))}.sl-steps>li>:first-child:where(h1,h2,h3,h4,h5,h6){--lh:calc(1.2em)}\n"},{"type":"external","src":"_astro/pages.BnZl33Nh.css"},{"type":"external","src":"_astro/advanced.BpGthh3v.css"},{"type":"external","src":"_astro/BaseLayout.CL6vbAf4.css"}],"routeData":{"route":"/en/about","isIndex":true,"type":"page","pattern":"^\\/en\\/about$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/about/index.astro","pathname":"/en/about","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[{"type":"external","src":"_astro/pages.BnZl33Nh.css"},{"type":"external","src":"_astro/advanced.BpGthh3v.css"},{"type":"external","src":"_astro/BaseLayout.CL6vbAf4.css"},{"type":"inline","content":".expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:0fr}.expanded:where(.astro-fj7gv3ii) .expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:1fr}svg:where(.astro-sqapcrnd){color:var(--sl-icon-color);font-size:var(--sl-icon-size,1em);width:1.5em;height:1.5em}.aside:where(.astro-mjo7ae67)>.aside-container:where(.astro-mjo7ae67){--tw-bg-opacity:.07;&.aside-tip{--primary:234 60% 60%}&.aside-caution{--primary:41 90% 50%}&.aside-danger{--primary:339 90% 60%}& .aside-content{&>:where(.astro-mjo7ae67):first-child{margin-top:0}&>:where(.astro-mjo7ae67):last-child{margin-bottom:0}& p a,& li a,& blockquote a,& td a,& a{color:hsl(var(--foreground) / var(--tw-text-opacity,1));text-decoration:underline;text-decoration-color:hsl(var(--muted-foreground) / .5);text-underline-offset:.125rem;border-radius:.25rem;margin:-.125rem -.25rem;padding:.125rem .25rem;transition:all .2s;&:hover{background-color:hsl(var(--foreground) / var(--tw-text-opacity,1));color:hsl(var(--background));text-decoration:none}}}}starlight-tabs:where(.astro-f45cruvs){display:block}.tablist-wrapper:where(.astro-f45cruvs){overflow-x:auto}:where(.astro-f45cruvs)[role=tablist]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));padding:0;list-style:none;display:flex}.tab:where(.astro-f45cruvs){margin-bottom:-2px}.tab:where(.astro-f45cruvs)>:where(.astro-f45cruvs)[role=tab]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));color:hsl(var(--foreground) / var(--tw-text-opacity,1));outline-offset:-.1875rem;overflow-wrap:initial;align-items:center;gap:.5rem;padding:.2rem 1.25rem;text-decoration:none;display:flex}.tab:where(.astro-f45cruvs) :where(.astro-f45cruvs)[role=tab][aria-selected=true]{color:hsl(var(--primary) / var(--tw-text-opacity,1));border-color:hsl(var(--primary) / var(--tw-text-opacity,1));font-weight:600}.tablist-wrapper:where(.astro-f45cruvs)~[role=tabpanel]{margin-top:1rem}.mdx-repl:where(.astro-rbi54dnn){background:linear-gradient(135deg, hsl(var(--primary) / .05) 0%, hsl(var(--muted) / .2) 100%)}.mdx-repl-container:where(.astro-rbi54dnn)>*{width:var(--width)}.mdx-repl-container:where(.astro-rbi54dnn)>:first-child{margin-top:0}.mdx-repl-container:where(.astro-rbi54dnn)>:last-child{margin-bottom:0}.mdx-repl:where(.astro-rbi54dnn) .astro-code{border-radius:0;margin:0}.mdx-repl:where(.astro-rbi54dnn) div[role=tabpanel]{margin-top:0}.sl-steps{--bullet-size:calc(1.75rem);--bullet-margin:.375rem;counter-reset:steps-counter var(--sl-steps-start,0);padding-inline-start:0!important;list-style:none!important}.sl-steps>li{counter-increment:steps-counter;padding-inline-start:calc(var(--bullet-size) + 1rem);min-height:calc(var(--bullet-size) + var(--bullet-margin));padding-bottom:1px;position:relative}.sl-steps>li+li{margin-top:0}.sl-steps>li:before{content:counter(steps-counter);top:0;width:var(--bullet-size);height:var(--bullet-size);line-height:var(--bullet-size);text-align:center;color:hsl(var(--foreground) / var(--tw-text-opacity,1));background-color:hsl(var(--primary-foreground) / var(--tw-bg-opacity,1));box-shadow:inset 0 0 0 1px hsl(var(--border) / var(--tw-border-opacity,1));border-radius:99rem;font-size:.8125rem;font-weight:600;position:absolute;inset-inline-start:0}.sl-steps>li:after{--guide-width:1px;content:\"\";top:calc(var(--bullet-size) + var(--bullet-margin));bottom:var(--bullet-margin);width:var(--guide-width);background-color:hsl(var(--border) / var(--tw-border-opacity,1));position:absolute;inset-inline-start:calc((var(--bullet-size) - var(--guide-width)) / 2)}.sl-steps>li>:first-child{--lh:calc(1.75em);--shift-y:calc(.5 * (var(--bullet-size) - var(--lh)));transform:translateY(var(--shift-y));margin-top:0;margin-bottom:var(--shift-y);color:hsl(var(--foreground) / var(--tw-text-opacity,1))}.sl-steps>li>:first-child:where(h1,h2,h3,h4,h5,h6){--lh:calc(1.2em)}\n"}],"routeData":{"route":"/en/academic","isIndex":true,"type":"page","pattern":"^\\/en\\/academic$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"academic","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/academic/index.astro","pathname":"/en/academic","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[],"routeData":{"route":"/en/archives","isIndex":true,"type":"page","pattern":"^\\/en\\/archives$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"archives","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/archives/index.astro","pathname":"/en/archives","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[],"routeData":{"route":"/en/article/[category]/[...page]","isIndex":false,"type":"page","pattern":"^\\/en\\/article\\/([^/]+?)(?:\\/(.*?))?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"article","dynamic":false,"spread":false}],[{"content":"category","dynamic":true,"spread":false}],[{"content":"...page","dynamic":true,"spread":true}]],"params":["category","...page"],"component":"src/pages/en/article/[category]/[...page].astro","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[{"type":"external","src":"_astro/BaseLayout.CL6vbAf4.css"},{"type":"inline","content":".expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:0fr}.expanded:where(.astro-fj7gv3ii) .expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:1fr}svg:where(.astro-sqapcrnd){color:var(--sl-icon-color);font-size:var(--sl-icon-size,1em);width:1.5em;height:1.5em}.aside:where(.astro-mjo7ae67)>.aside-container:where(.astro-mjo7ae67){--tw-bg-opacity:.07;&.aside-tip{--primary:234 60% 60%}&.aside-caution{--primary:41 90% 50%}&.aside-danger{--primary:339 90% 60%}& .aside-content{&>:where(.astro-mjo7ae67):first-child{margin-top:0}&>:where(.astro-mjo7ae67):last-child{margin-bottom:0}& p a,& li a,& blockquote a,& td a,& a{color:hsl(var(--foreground) / var(--tw-text-opacity,1));text-decoration:underline;text-decoration-color:hsl(var(--muted-foreground) / .5);text-underline-offset:.125rem;border-radius:.25rem;margin:-.125rem -.25rem;padding:.125rem .25rem;transition:all .2s;&:hover{background-color:hsl(var(--foreground) / var(--tw-text-opacity,1));color:hsl(var(--background));text-decoration:none}}}}starlight-tabs:where(.astro-f45cruvs){display:block}.tablist-wrapper:where(.astro-f45cruvs){overflow-x:auto}:where(.astro-f45cruvs)[role=tablist]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));padding:0;list-style:none;display:flex}.tab:where(.astro-f45cruvs){margin-bottom:-2px}.tab:where(.astro-f45cruvs)>:where(.astro-f45cruvs)[role=tab]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));color:hsl(var(--foreground) / var(--tw-text-opacity,1));outline-offset:-.1875rem;overflow-wrap:initial;align-items:center;gap:.5rem;padding:.2rem 1.25rem;text-decoration:none;display:flex}.tab:where(.astro-f45cruvs) :where(.astro-f45cruvs)[role=tab][aria-selected=true]{color:hsl(var(--primary) / var(--tw-text-opacity,1));border-color:hsl(var(--primary) / var(--tw-text-opacity,1));font-weight:600}.tablist-wrapper:where(.astro-f45cruvs)~[role=tabpanel]{margin-top:1rem}.mdx-repl:where(.astro-rbi54dnn){background:linear-gradient(135deg, hsl(var(--primary) / .05) 0%, hsl(var(--muted) / .2) 100%)}.mdx-repl-container:where(.astro-rbi54dnn)>*{width:var(--width)}.mdx-repl-container:where(.astro-rbi54dnn)>:first-child{margin-top:0}.mdx-repl-container:where(.astro-rbi54dnn)>:last-child{margin-bottom:0}.mdx-repl:where(.astro-rbi54dnn) .astro-code{border-radius:0;margin:0}.mdx-repl:where(.astro-rbi54dnn) div[role=tabpanel]{margin-top:0}.sl-steps{--bullet-size:calc(1.75rem);--bullet-margin:.375rem;counter-reset:steps-counter var(--sl-steps-start,0);padding-inline-start:0!important;list-style:none!important}.sl-steps>li{counter-increment:steps-counter;padding-inline-start:calc(var(--bullet-size) + 1rem);min-height:calc(var(--bullet-size) + var(--bullet-margin));padding-bottom:1px;position:relative}.sl-steps>li+li{margin-top:0}.sl-steps>li:before{content:counter(steps-counter);top:0;width:var(--bullet-size);height:var(--bullet-size);line-height:var(--bullet-size);text-align:center;color:hsl(var(--foreground) / var(--tw-text-opacity,1));background-color:hsl(var(--primary-foreground) / var(--tw-bg-opacity,1));box-shadow:inset 0 0 0 1px hsl(var(--border) / var(--tw-border-opacity,1));border-radius:99rem;font-size:.8125rem;font-weight:600;position:absolute;inset-inline-start:0}.sl-steps>li:after{--guide-width:1px;content:\"\";top:calc(var(--bullet-size) + var(--bullet-margin));bottom:var(--bullet-margin);width:var(--guide-width);background-color:hsl(var(--border) / var(--tw-border-opacity,1));position:absolute;inset-inline-start:calc((var(--bullet-size) - var(--guide-width)) / 2)}.sl-steps>li>:first-child{--lh:calc(1.75em);--shift-y:calc(.5 * (var(--bullet-size) - var(--lh)));transform:translateY(var(--shift-y));margin-top:0;margin-bottom:var(--shift-y);color:hsl(var(--foreground) / var(--tw-text-opacity,1))}.sl-steps>li>:first-child:where(h1,h2,h3,h4,h5,h6){--lh:calc(1.2em)}\n"}],"routeData":{"route":"/en/article","isIndex":true,"type":"page","pattern":"^\\/en\\/article$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"article","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/article/index.astro","pathname":"/en/article","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[],"routeData":{"route":"/en/article/[...id]","isIndex":false,"type":"page","pattern":"^\\/en\\/article(?:\\/(.*?))?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"article","dynamic":false,"spread":false}],[{"content":"...id","dynamic":true,"spread":true}]],"params":["...id"],"component":"src/pages/en/article/[...id].astro","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[],"routeData":{"route":"/en/collection/[id]","isIndex":false,"type":"page","pattern":"^\\/en\\/collection\\/([^/]+?)$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"collection","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/en/collection/[id].astro","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[{"type":"external","src":"_astro/BaseLayout.CL6vbAf4.css"},{"type":"external","src":"_astro/pages.BnZl33Nh.css"},{"type":"external","src":"_astro/advanced.BpGthh3v.css"},{"type":"inline","content":".expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:0fr}.expanded:where(.astro-fj7gv3ii) .expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:1fr}svg:where(.astro-sqapcrnd){color:var(--sl-icon-color);font-size:var(--sl-icon-size,1em);width:1.5em;height:1.5em}.aside:where(.astro-mjo7ae67)>.aside-container:where(.astro-mjo7ae67){--tw-bg-opacity:.07;&.aside-tip{--primary:234 60% 60%}&.aside-caution{--primary:41 90% 50%}&.aside-danger{--primary:339 90% 60%}& .aside-content{&>:where(.astro-mjo7ae67):first-child{margin-top:0}&>:where(.astro-mjo7ae67):last-child{margin-bottom:0}& p a,& li a,& blockquote a,& td a,& a{color:hsl(var(--foreground) / var(--tw-text-opacity,1));text-decoration:underline;text-decoration-color:hsl(var(--muted-foreground) / .5);text-underline-offset:.125rem;border-radius:.25rem;margin:-.125rem -.25rem;padding:.125rem .25rem;transition:all .2s;&:hover{background-color:hsl(var(--foreground) / var(--tw-text-opacity,1));color:hsl(var(--background));text-decoration:none}}}}starlight-tabs:where(.astro-f45cruvs){display:block}.tablist-wrapper:where(.astro-f45cruvs){overflow-x:auto}:where(.astro-f45cruvs)[role=tablist]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));padding:0;list-style:none;display:flex}.tab:where(.astro-f45cruvs){margin-bottom:-2px}.tab:where(.astro-f45cruvs)>:where(.astro-f45cruvs)[role=tab]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));color:hsl(var(--foreground) / var(--tw-text-opacity,1));outline-offset:-.1875rem;overflow-wrap:initial;align-items:center;gap:.5rem;padding:.2rem 1.25rem;text-decoration:none;display:flex}.tab:where(.astro-f45cruvs) :where(.astro-f45cruvs)[role=tab][aria-selected=true]{color:hsl(var(--primary) / var(--tw-text-opacity,1));border-color:hsl(var(--primary) / var(--tw-text-opacity,1));font-weight:600}.tablist-wrapper:where(.astro-f45cruvs)~[role=tabpanel]{margin-top:1rem}.mdx-repl:where(.astro-rbi54dnn){background:linear-gradient(135deg, hsl(var(--primary) / .05) 0%, hsl(var(--muted) / .2) 100%)}.mdx-repl-container:where(.astro-rbi54dnn)>*{width:var(--width)}.mdx-repl-container:where(.astro-rbi54dnn)>:first-child{margin-top:0}.mdx-repl-container:where(.astro-rbi54dnn)>:last-child{margin-bottom:0}.mdx-repl:where(.astro-rbi54dnn) .astro-code{border-radius:0;margin:0}.mdx-repl:where(.astro-rbi54dnn) div[role=tabpanel]{margin-top:0}.sl-steps{--bullet-size:calc(1.75rem);--bullet-margin:.375rem;counter-reset:steps-counter var(--sl-steps-start,0);padding-inline-start:0!important;list-style:none!important}.sl-steps>li{counter-increment:steps-counter;padding-inline-start:calc(var(--bullet-size) + 1rem);min-height:calc(var(--bullet-size) + var(--bullet-margin));padding-bottom:1px;position:relative}.sl-steps>li+li{margin-top:0}.sl-steps>li:before{content:counter(steps-counter);top:0;width:var(--bullet-size);height:var(--bullet-size);line-height:var(--bullet-size);text-align:center;color:hsl(var(--foreground) / var(--tw-text-opacity,1));background-color:hsl(var(--primary-foreground) / var(--tw-bg-opacity,1));box-shadow:inset 0 0 0 1px hsl(var(--border) / var(--tw-border-opacity,1));border-radius:99rem;font-size:.8125rem;font-weight:600;position:absolute;inset-inline-start:0}.sl-steps>li:after{--guide-width:1px;content:\"\";top:calc(var(--bullet-size) + var(--bullet-margin));bottom:var(--bullet-margin);width:var(--guide-width);background-color:hsl(var(--border) / var(--tw-border-opacity,1));position:absolute;inset-inline-start:calc((var(--bullet-size) - var(--guide-width)) / 2)}.sl-steps>li>:first-child{--lh:calc(1.75em);--shift-y:calc(.5 * (var(--bullet-size) - var(--lh)));transform:translateY(var(--shift-y));margin-top:0;margin-bottom:var(--shift-y);color:hsl(var(--foreground) / var(--tw-text-opacity,1))}.sl-steps>li>:first-child:where(h1,h2,h3,h4,h5,h6){--lh:calc(1.2em)}\n"}],"routeData":{"route":"/en/collection","isIndex":true,"type":"page","pattern":"^\\/en\\/collection$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"collection","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/collection/index.astro","pathname":"/en/collection","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[{"type":"external","src":"_astro/friendCircle.CidcJVPp.css"},{"type":"external","src":"_astro/pages.BnZl33Nh.css"},{"type":"external","src":"_astro/advanced.BpGthh3v.css"},{"type":"external","src":"_astro/BaseLayout.CL6vbAf4.css"},{"type":"inline","content":".expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:0fr}.expanded:where(.astro-fj7gv3ii) .expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:1fr}svg:where(.astro-sqapcrnd){color:var(--sl-icon-color);font-size:var(--sl-icon-size,1em);width:1.5em;height:1.5em}.aside:where(.astro-mjo7ae67)>.aside-container:where(.astro-mjo7ae67){--tw-bg-opacity:.07;&.aside-tip{--primary:234 60% 60%}&.aside-caution{--primary:41 90% 50%}&.aside-danger{--primary:339 90% 60%}& .aside-content{&>:where(.astro-mjo7ae67):first-child{margin-top:0}&>:where(.astro-mjo7ae67):last-child{margin-bottom:0}& p a,& li a,& blockquote a,& td a,& a{color:hsl(var(--foreground) / var(--tw-text-opacity,1));text-decoration:underline;text-decoration-color:hsl(var(--muted-foreground) / .5);text-underline-offset:.125rem;border-radius:.25rem;margin:-.125rem -.25rem;padding:.125rem .25rem;transition:all .2s;&:hover{background-color:hsl(var(--foreground) / var(--tw-text-opacity,1));color:hsl(var(--background));text-decoration:none}}}}starlight-tabs:where(.astro-f45cruvs){display:block}.tablist-wrapper:where(.astro-f45cruvs){overflow-x:auto}:where(.astro-f45cruvs)[role=tablist]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));padding:0;list-style:none;display:flex}.tab:where(.astro-f45cruvs){margin-bottom:-2px}.tab:where(.astro-f45cruvs)>:where(.astro-f45cruvs)[role=tab]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));color:hsl(var(--foreground) / var(--tw-text-opacity,1));outline-offset:-.1875rem;overflow-wrap:initial;align-items:center;gap:.5rem;padding:.2rem 1.25rem;text-decoration:none;display:flex}.tab:where(.astro-f45cruvs) :where(.astro-f45cruvs)[role=tab][aria-selected=true]{color:hsl(var(--primary) / var(--tw-text-opacity,1));border-color:hsl(var(--primary) / var(--tw-text-opacity,1));font-weight:600}.tablist-wrapper:where(.astro-f45cruvs)~[role=tabpanel]{margin-top:1rem}.mdx-repl:where(.astro-rbi54dnn){background:linear-gradient(135deg, hsl(var(--primary) / .05) 0%, hsl(var(--muted) / .2) 100%)}.mdx-repl-container:where(.astro-rbi54dnn)>*{width:var(--width)}.mdx-repl-container:where(.astro-rbi54dnn)>:first-child{margin-top:0}.mdx-repl-container:where(.astro-rbi54dnn)>:last-child{margin-bottom:0}.mdx-repl:where(.astro-rbi54dnn) .astro-code{border-radius:0;margin:0}.mdx-repl:where(.astro-rbi54dnn) div[role=tabpanel]{margin-top:0}.sl-steps{--bullet-size:calc(1.75rem);--bullet-margin:.375rem;counter-reset:steps-counter var(--sl-steps-start,0);padding-inline-start:0!important;list-style:none!important}.sl-steps>li{counter-increment:steps-counter;padding-inline-start:calc(var(--bullet-size) + 1rem);min-height:calc(var(--bullet-size) + var(--bullet-margin));padding-bottom:1px;position:relative}.sl-steps>li+li{margin-top:0}.sl-steps>li:before{content:counter(steps-counter);top:0;width:var(--bullet-size);height:var(--bullet-size);line-height:var(--bullet-size);text-align:center;color:hsl(var(--foreground) / var(--tw-text-opacity,1));background-color:hsl(var(--primary-foreground) / var(--tw-bg-opacity,1));box-shadow:inset 0 0 0 1px hsl(var(--border) / var(--tw-border-opacity,1));border-radius:99rem;font-size:.8125rem;font-weight:600;position:absolute;inset-inline-start:0}.sl-steps>li:after{--guide-width:1px;content:\"\";top:calc(var(--bullet-size) + var(--bullet-margin));bottom:var(--bullet-margin);width:var(--guide-width);background-color:hsl(var(--border) / var(--tw-border-opacity,1));position:absolute;inset-inline-start:calc((var(--bullet-size) - var(--guide-width)) / 2)}.sl-steps>li>:first-child{--lh:calc(1.75em);--shift-y:calc(.5 * (var(--bullet-size) - var(--lh)));transform:translateY(var(--shift-y));margin-top:0;margin-bottom:var(--shift-y);color:hsl(var(--foreground) / var(--tw-text-opacity,1))}.sl-steps>li>:first-child:where(h1,h2,h3,h4,h5,h6){--lh:calc(1.2em)}\n"}],"routeData":{"route":"/en/links","isIndex":true,"type":"page","pattern":"^\\/en\\/links$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"links","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/links/index.astro","pathname":"/en/links","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[{"type":"inline","content":".project-card:where(.astro-c42hbzau){opacity:0;animation:.6s ease-out forwards fadeInUp;transform:translateY(20px)}@keyframes fadeInUp{to{opacity:1;transform:translateY(0)}}.project-card:where(.astro-c42hbzau) :where(.astro-c42hbzau){transition-duration:.2s;transition-timing-function:cubic-bezier(.4,0,.2,1)}\n"},{"type":"external","src":"_astro/pages.BnZl33Nh.css"},{"type":"external","src":"_astro/advanced.BpGthh3v.css"},{"type":"external","src":"_astro/BaseLayout.CL6vbAf4.css"},{"type":"inline","content":".expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:0fr}.expanded:where(.astro-fj7gv3ii) .expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:1fr}svg:where(.astro-sqapcrnd){color:var(--sl-icon-color);font-size:var(--sl-icon-size,1em);width:1.5em;height:1.5em}.aside:where(.astro-mjo7ae67)>.aside-container:where(.astro-mjo7ae67){--tw-bg-opacity:.07;&.aside-tip{--primary:234 60% 60%}&.aside-caution{--primary:41 90% 50%}&.aside-danger{--primary:339 90% 60%}& .aside-content{&>:where(.astro-mjo7ae67):first-child{margin-top:0}&>:where(.astro-mjo7ae67):last-child{margin-bottom:0}& p a,& li a,& blockquote a,& td a,& a{color:hsl(var(--foreground) / var(--tw-text-opacity,1));text-decoration:underline;text-decoration-color:hsl(var(--muted-foreground) / .5);text-underline-offset:.125rem;border-radius:.25rem;margin:-.125rem -.25rem;padding:.125rem .25rem;transition:all .2s;&:hover{background-color:hsl(var(--foreground) / var(--tw-text-opacity,1));color:hsl(var(--background));text-decoration:none}}}}starlight-tabs:where(.astro-f45cruvs){display:block}.tablist-wrapper:where(.astro-f45cruvs){overflow-x:auto}:where(.astro-f45cruvs)[role=tablist]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));padding:0;list-style:none;display:flex}.tab:where(.astro-f45cruvs){margin-bottom:-2px}.tab:where(.astro-f45cruvs)>:where(.astro-f45cruvs)[role=tab]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));color:hsl(var(--foreground) / var(--tw-text-opacity,1));outline-offset:-.1875rem;overflow-wrap:initial;align-items:center;gap:.5rem;padding:.2rem 1.25rem;text-decoration:none;display:flex}.tab:where(.astro-f45cruvs) :where(.astro-f45cruvs)[role=tab][aria-selected=true]{color:hsl(var(--primary) / var(--tw-text-opacity,1));border-color:hsl(var(--primary) / var(--tw-text-opacity,1));font-weight:600}.tablist-wrapper:where(.astro-f45cruvs)~[role=tabpanel]{margin-top:1rem}.mdx-repl:where(.astro-rbi54dnn){background:linear-gradient(135deg, hsl(var(--primary) / .05) 0%, hsl(var(--muted) / .2) 100%)}.mdx-repl-container:where(.astro-rbi54dnn)>*{width:var(--width)}.mdx-repl-container:where(.astro-rbi54dnn)>:first-child{margin-top:0}.mdx-repl-container:where(.astro-rbi54dnn)>:last-child{margin-bottom:0}.mdx-repl:where(.astro-rbi54dnn) .astro-code{border-radius:0;margin:0}.mdx-repl:where(.astro-rbi54dnn) div[role=tabpanel]{margin-top:0}.sl-steps{--bullet-size:calc(1.75rem);--bullet-margin:.375rem;counter-reset:steps-counter var(--sl-steps-start,0);padding-inline-start:0!important;list-style:none!important}.sl-steps>li{counter-increment:steps-counter;padding-inline-start:calc(var(--bullet-size) + 1rem);min-height:calc(var(--bullet-size) + var(--bullet-margin));padding-bottom:1px;position:relative}.sl-steps>li+li{margin-top:0}.sl-steps>li:before{content:counter(steps-counter);top:0;width:var(--bullet-size);height:var(--bullet-size);line-height:var(--bullet-size);text-align:center;color:hsl(var(--foreground) / var(--tw-text-opacity,1));background-color:hsl(var(--primary-foreground) / var(--tw-bg-opacity,1));box-shadow:inset 0 0 0 1px hsl(var(--border) / var(--tw-border-opacity,1));border-radius:99rem;font-size:.8125rem;font-weight:600;position:absolute;inset-inline-start:0}.sl-steps>li:after{--guide-width:1px;content:\"\";top:calc(var(--bullet-size) + var(--bullet-margin));bottom:var(--bullet-margin);width:var(--guide-width);background-color:hsl(var(--border) / var(--tw-border-opacity,1));position:absolute;inset-inline-start:calc((var(--bullet-size) - var(--guide-width)) / 2)}.sl-steps>li>:first-child{--lh:calc(1.75em);--shift-y:calc(.5 * (var(--bullet-size) - var(--lh)));transform:translateY(var(--shift-y));margin-top:0;margin-bottom:var(--shift-y);color:hsl(var(--foreground) / var(--tw-text-opacity,1))}.sl-steps>li>:first-child:where(h1,h2,h3,h4,h5,h6){--lh:calc(1.2em)}\n"}],"routeData":{"route":"/en/projects","isIndex":true,"type":"page","pattern":"^\\/en\\/projects$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"projects","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/projects/index.astro","pathname":"/en/projects","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[{"type":"external","src":"_astro/BaseLayout.CL6vbAf4.css"},{"type":"external","src":"_astro/pages.BnZl33Nh.css"},{"type":"external","src":"_astro/advanced.BpGthh3v.css"},{"type":"inline","content":".expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:0fr}.expanded:where(.astro-fj7gv3ii) .expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:1fr}svg:where(.astro-sqapcrnd){color:var(--sl-icon-color);font-size:var(--sl-icon-size,1em);width:1.5em;height:1.5em}.aside:where(.astro-mjo7ae67)>.aside-container:where(.astro-mjo7ae67){--tw-bg-opacity:.07;&.aside-tip{--primary:234 60% 60%}&.aside-caution{--primary:41 90% 50%}&.aside-danger{--primary:339 90% 60%}& .aside-content{&>:where(.astro-mjo7ae67):first-child{margin-top:0}&>:where(.astro-mjo7ae67):last-child{margin-bottom:0}& p a,& li a,& blockquote a,& td a,& a{color:hsl(var(--foreground) / var(--tw-text-opacity,1));text-decoration:underline;text-decoration-color:hsl(var(--muted-foreground) / .5);text-underline-offset:.125rem;border-radius:.25rem;margin:-.125rem -.25rem;padding:.125rem .25rem;transition:all .2s;&:hover{background-color:hsl(var(--foreground) / var(--tw-text-opacity,1));color:hsl(var(--background));text-decoration:none}}}}starlight-tabs:where(.astro-f45cruvs){display:block}.tablist-wrapper:where(.astro-f45cruvs){overflow-x:auto}:where(.astro-f45cruvs)[role=tablist]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));padding:0;list-style:none;display:flex}.tab:where(.astro-f45cruvs){margin-bottom:-2px}.tab:where(.astro-f45cruvs)>:where(.astro-f45cruvs)[role=tab]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));color:hsl(var(--foreground) / var(--tw-text-opacity,1));outline-offset:-.1875rem;overflow-wrap:initial;align-items:center;gap:.5rem;padding:.2rem 1.25rem;text-decoration:none;display:flex}.tab:where(.astro-f45cruvs) :where(.astro-f45cruvs)[role=tab][aria-selected=true]{color:hsl(var(--primary) / var(--tw-text-opacity,1));border-color:hsl(var(--primary) / var(--tw-text-opacity,1));font-weight:600}.tablist-wrapper:where(.astro-f45cruvs)~[role=tabpanel]{margin-top:1rem}.mdx-repl:where(.astro-rbi54dnn){background:linear-gradient(135deg, hsl(var(--primary) / .05) 0%, hsl(var(--muted) / .2) 100%)}.mdx-repl-container:where(.astro-rbi54dnn)>*{width:var(--width)}.mdx-repl-container:where(.astro-rbi54dnn)>:first-child{margin-top:0}.mdx-repl-container:where(.astro-rbi54dnn)>:last-child{margin-bottom:0}.mdx-repl:where(.astro-rbi54dnn) .astro-code{border-radius:0;margin:0}.mdx-repl:where(.astro-rbi54dnn) div[role=tabpanel]{margin-top:0}.sl-steps{--bullet-size:calc(1.75rem);--bullet-margin:.375rem;counter-reset:steps-counter var(--sl-steps-start,0);padding-inline-start:0!important;list-style:none!important}.sl-steps>li{counter-increment:steps-counter;padding-inline-start:calc(var(--bullet-size) + 1rem);min-height:calc(var(--bullet-size) + var(--bullet-margin));padding-bottom:1px;position:relative}.sl-steps>li+li{margin-top:0}.sl-steps>li:before{content:counter(steps-counter);top:0;width:var(--bullet-size);height:var(--bullet-size);line-height:var(--bullet-size);text-align:center;color:hsl(var(--foreground) / var(--tw-text-opacity,1));background-color:hsl(var(--primary-foreground) / var(--tw-bg-opacity,1));box-shadow:inset 0 0 0 1px hsl(var(--border) / var(--tw-border-opacity,1));border-radius:99rem;font-size:.8125rem;font-weight:600;position:absolute;inset-inline-start:0}.sl-steps>li:after{--guide-width:1px;content:\"\";top:calc(var(--bullet-size) + var(--bullet-margin));bottom:var(--bullet-margin);width:var(--guide-width);background-color:hsl(var(--border) / var(--tw-border-opacity,1));position:absolute;inset-inline-start:calc((var(--bullet-size) - var(--guide-width)) / 2)}.sl-steps>li>:first-child{--lh:calc(1.75em);--shift-y:calc(.5 * (var(--bullet-size) - var(--lh)));transform:translateY(var(--shift-y));margin-top:0;margin-bottom:var(--shift-y);color:hsl(var(--foreground) / var(--tw-text-opacity,1))}.sl-steps>li>:first-child:where(h1,h2,h3,h4,h5,h6){--lh:calc(1.2em)}\n"}],"routeData":{"route":"/en/search","isIndex":true,"type":"page","pattern":"^\\/en\\/search$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"search","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/search/index.astro","pathname":"/en/search","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[],"routeData":{"route":"/en/tags/[tag]/[...page]","isIndex":false,"type":"page","pattern":"^\\/en\\/tags\\/([^/]+?)(?:\\/(.*?))?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"tags","dynamic":false,"spread":false}],[{"content":"tag","dynamic":true,"spread":false}],[{"content":"...page","dynamic":true,"spread":true}]],"params":["tag","...page"],"component":"src/pages/en/tags/[tag]/[...page].astro","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[{"type":"inline","content":".animate:where(.astro-5usi24qx){opacity:0;animation:.6s ease-out forwards fadeInUp;transform:translateY(20px)}#content-header:where(.astro-5usi24qx){animation-delay:.1s}#content:where(.astro-5usi24qx){animation-delay:.3s}@keyframes fadeInUp{to{opacity:1;transform:translateY(0)}}.group:where(.astro-5usi24qx):hover{z-index:10}.group:where(.astro-5usi24qx){transform-origin:50%;will-change:transform}.group:where(.astro-5usi24qx):hover .relative:where(.astro-5usi24qx){transform-origin:50%}.backdrop-blur-md:where(.astro-5usi24qx){-webkit-backdrop-filter:blur(12px)}.backdrop-blur-sm:where(.astro-5usi24qx){-webkit-backdrop-filter:blur(4px)}.counting:where(.astro-5usi24qx){animation:.2s ease-out bounce}@keyframes bounce{0%,to{transform:translateY(0)scale(1)}50%{transform:translateY(-3px)scale(1.05)}}#topics-count:where(.astro-5usi24qx),#articles-count:where(.astro-5usi24qx){font-variant-numeric:tabular-nums;transition:all .1s ease-out}\n"},{"type":"external","src":"_astro/BaseLayout.CL6vbAf4.css"},{"type":"inline","content":".expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:0fr}.expanded:where(.astro-fj7gv3ii) .expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:1fr}svg:where(.astro-sqapcrnd){color:var(--sl-icon-color);font-size:var(--sl-icon-size,1em);width:1.5em;height:1.5em}.aside:where(.astro-mjo7ae67)>.aside-container:where(.astro-mjo7ae67){--tw-bg-opacity:.07;&.aside-tip{--primary:234 60% 60%}&.aside-caution{--primary:41 90% 50%}&.aside-danger{--primary:339 90% 60%}& .aside-content{&>:where(.astro-mjo7ae67):first-child{margin-top:0}&>:where(.astro-mjo7ae67):last-child{margin-bottom:0}& p a,& li a,& blockquote a,& td a,& a{color:hsl(var(--foreground) / var(--tw-text-opacity,1));text-decoration:underline;text-decoration-color:hsl(var(--muted-foreground) / .5);text-underline-offset:.125rem;border-radius:.25rem;margin:-.125rem -.25rem;padding:.125rem .25rem;transition:all .2s;&:hover{background-color:hsl(var(--foreground) / var(--tw-text-opacity,1));color:hsl(var(--background));text-decoration:none}}}}starlight-tabs:where(.astro-f45cruvs){display:block}.tablist-wrapper:where(.astro-f45cruvs){overflow-x:auto}:where(.astro-f45cruvs)[role=tablist]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));padding:0;list-style:none;display:flex}.tab:where(.astro-f45cruvs){margin-bottom:-2px}.tab:where(.astro-f45cruvs)>:where(.astro-f45cruvs)[role=tab]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));color:hsl(var(--foreground) / var(--tw-text-opacity,1));outline-offset:-.1875rem;overflow-wrap:initial;align-items:center;gap:.5rem;padding:.2rem 1.25rem;text-decoration:none;display:flex}.tab:where(.astro-f45cruvs) :where(.astro-f45cruvs)[role=tab][aria-selected=true]{color:hsl(var(--primary) / var(--tw-text-opacity,1));border-color:hsl(var(--primary) / var(--tw-text-opacity,1));font-weight:600}.tablist-wrapper:where(.astro-f45cruvs)~[role=tabpanel]{margin-top:1rem}.mdx-repl:where(.astro-rbi54dnn){background:linear-gradient(135deg, hsl(var(--primary) / .05) 0%, hsl(var(--muted) / .2) 100%)}.mdx-repl-container:where(.astro-rbi54dnn)>*{width:var(--width)}.mdx-repl-container:where(.astro-rbi54dnn)>:first-child{margin-top:0}.mdx-repl-container:where(.astro-rbi54dnn)>:last-child{margin-bottom:0}.mdx-repl:where(.astro-rbi54dnn) .astro-code{border-radius:0;margin:0}.mdx-repl:where(.astro-rbi54dnn) div[role=tabpanel]{margin-top:0}.sl-steps{--bullet-size:calc(1.75rem);--bullet-margin:.375rem;counter-reset:steps-counter var(--sl-steps-start,0);padding-inline-start:0!important;list-style:none!important}.sl-steps>li{counter-increment:steps-counter;padding-inline-start:calc(var(--bullet-size) + 1rem);min-height:calc(var(--bullet-size) + var(--bullet-margin));padding-bottom:1px;position:relative}.sl-steps>li+li{margin-top:0}.sl-steps>li:before{content:counter(steps-counter);top:0;width:var(--bullet-size);height:var(--bullet-size);line-height:var(--bullet-size);text-align:center;color:hsl(var(--foreground) / var(--tw-text-opacity,1));background-color:hsl(var(--primary-foreground) / var(--tw-bg-opacity,1));box-shadow:inset 0 0 0 1px hsl(var(--border) / var(--tw-border-opacity,1));border-radius:99rem;font-size:.8125rem;font-weight:600;position:absolute;inset-inline-start:0}.sl-steps>li:after{--guide-width:1px;content:\"\";top:calc(var(--bullet-size) + var(--bullet-margin));bottom:var(--bullet-margin);width:var(--guide-width);background-color:hsl(var(--border) / var(--tw-border-opacity,1));position:absolute;inset-inline-start:calc((var(--bullet-size) - var(--guide-width)) / 2)}.sl-steps>li>:first-child{--lh:calc(1.75em);--shift-y:calc(.5 * (var(--bullet-size) - var(--lh)));transform:translateY(var(--shift-y));margin-top:0;margin-bottom:var(--shift-y);color:hsl(var(--foreground) / var(--tw-text-opacity,1))}.sl-steps>li>:first-child:where(h1,h2,h3,h4,h5,h6){--lh:calc(1.2em)}\n"}],"routeData":{"route":"/en/tags","isIndex":true,"type":"page","pattern":"^\\/en\\/tags$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"tags","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/tags/index.astro","pathname":"/en/tags","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[{"type":"external","src":"_astro/pages.BnZl33Nh.css"},{"type":"external","src":"_astro/BaseLayout.CL6vbAf4.css"},{"type":"external","src":"_astro/advanced.BpGthh3v.css"},{"type":"inline","content":".expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:0fr}.expanded:where(.astro-fj7gv3ii) .expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:1fr}svg:where(.astro-sqapcrnd){color:var(--sl-icon-color);font-size:var(--sl-icon-size,1em);width:1.5em;height:1.5em}.aside:where(.astro-mjo7ae67)>.aside-container:where(.astro-mjo7ae67){--tw-bg-opacity:.07;&.aside-tip{--primary:234 60% 60%}&.aside-caution{--primary:41 90% 50%}&.aside-danger{--primary:339 90% 60%}& .aside-content{&>:where(.astro-mjo7ae67):first-child{margin-top:0}&>:where(.astro-mjo7ae67):last-child{margin-bottom:0}& p a,& li a,& blockquote a,& td a,& a{color:hsl(var(--foreground) / var(--tw-text-opacity,1));text-decoration:underline;text-decoration-color:hsl(var(--muted-foreground) / .5);text-underline-offset:.125rem;border-radius:.25rem;margin:-.125rem -.25rem;padding:.125rem .25rem;transition:all .2s;&:hover{background-color:hsl(var(--foreground) / var(--tw-text-opacity,1));color:hsl(var(--background));text-decoration:none}}}}starlight-tabs:where(.astro-f45cruvs){display:block}.tablist-wrapper:where(.astro-f45cruvs){overflow-x:auto}:where(.astro-f45cruvs)[role=tablist]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));padding:0;list-style:none;display:flex}.tab:where(.astro-f45cruvs){margin-bottom:-2px}.tab:where(.astro-f45cruvs)>:where(.astro-f45cruvs)[role=tab]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));color:hsl(var(--foreground) / var(--tw-text-opacity,1));outline-offset:-.1875rem;overflow-wrap:initial;align-items:center;gap:.5rem;padding:.2rem 1.25rem;text-decoration:none;display:flex}.tab:where(.astro-f45cruvs) :where(.astro-f45cruvs)[role=tab][aria-selected=true]{color:hsl(var(--primary) / var(--tw-text-opacity,1));border-color:hsl(var(--primary) / var(--tw-text-opacity,1));font-weight:600}.tablist-wrapper:where(.astro-f45cruvs)~[role=tabpanel]{margin-top:1rem}.mdx-repl:where(.astro-rbi54dnn){background:linear-gradient(135deg, hsl(var(--primary) / .05) 0%, hsl(var(--muted) / .2) 100%)}.mdx-repl-container:where(.astro-rbi54dnn)>*{width:var(--width)}.mdx-repl-container:where(.astro-rbi54dnn)>:first-child{margin-top:0}.mdx-repl-container:where(.astro-rbi54dnn)>:last-child{margin-bottom:0}.mdx-repl:where(.astro-rbi54dnn) .astro-code{border-radius:0;margin:0}.mdx-repl:where(.astro-rbi54dnn) div[role=tabpanel]{margin-top:0}.sl-steps{--bullet-size:calc(1.75rem);--bullet-margin:.375rem;counter-reset:steps-counter var(--sl-steps-start,0);padding-inline-start:0!important;list-style:none!important}.sl-steps>li{counter-increment:steps-counter;padding-inline-start:calc(var(--bullet-size) + 1rem);min-height:calc(var(--bullet-size) + var(--bullet-margin));padding-bottom:1px;position:relative}.sl-steps>li+li{margin-top:0}.sl-steps>li:before{content:counter(steps-counter);top:0;width:var(--bullet-size);height:var(--bullet-size);line-height:var(--bullet-size);text-align:center;color:hsl(var(--foreground) / var(--tw-text-opacity,1));background-color:hsl(var(--primary-foreground) / var(--tw-bg-opacity,1));box-shadow:inset 0 0 0 1px hsl(var(--border) / var(--tw-border-opacity,1));border-radius:99rem;font-size:.8125rem;font-weight:600;position:absolute;inset-inline-start:0}.sl-steps>li:after{--guide-width:1px;content:\"\";top:calc(var(--bullet-size) + var(--bullet-margin));bottom:var(--bullet-margin);width:var(--guide-width);background-color:hsl(var(--border) / var(--tw-border-opacity,1));position:absolute;inset-inline-start:calc((var(--bullet-size) - var(--guide-width)) / 2)}.sl-steps>li>:first-child{--lh:calc(1.75em);--shift-y:calc(.5 * (var(--bullet-size) - var(--lh)));transform:translateY(var(--shift-y));margin-top:0;margin-bottom:var(--shift-y);color:hsl(var(--foreground) / var(--tw-text-opacity,1))}.sl-steps>li>:first-child:where(h1,h2,h3,h4,h5,h6){--lh:calc(1.2em)}\n"}],"routeData":{"route":"/en/terms/copyright","isIndex":false,"type":"page","pattern":"^\\/en\\/terms\\/copyright$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"terms","dynamic":false,"spread":false}],[{"content":"copyright","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/terms/copyright.md","pathname":"/en/terms/copyright","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[{"type":"external","src":"_astro/pages.BnZl33Nh.css"},{"type":"external","src":"_astro/BaseLayout.CL6vbAf4.css"},{"type":"external","src":"_astro/advanced.BpGthh3v.css"},{"type":"inline","content":".expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:0fr}.expanded:where(.astro-fj7gv3ii) .expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:1fr}svg:where(.astro-sqapcrnd){color:var(--sl-icon-color);font-size:var(--sl-icon-size,1em);width:1.5em;height:1.5em}.aside:where(.astro-mjo7ae67)>.aside-container:where(.astro-mjo7ae67){--tw-bg-opacity:.07;&.aside-tip{--primary:234 60% 60%}&.aside-caution{--primary:41 90% 50%}&.aside-danger{--primary:339 90% 60%}& .aside-content{&>:where(.astro-mjo7ae67):first-child{margin-top:0}&>:where(.astro-mjo7ae67):last-child{margin-bottom:0}& p a,& li a,& blockquote a,& td a,& a{color:hsl(var(--foreground) / var(--tw-text-opacity,1));text-decoration:underline;text-decoration-color:hsl(var(--muted-foreground) / .5);text-underline-offset:.125rem;border-radius:.25rem;margin:-.125rem -.25rem;padding:.125rem .25rem;transition:all .2s;&:hover{background-color:hsl(var(--foreground) / var(--tw-text-opacity,1));color:hsl(var(--background));text-decoration:none}}}}starlight-tabs:where(.astro-f45cruvs){display:block}.tablist-wrapper:where(.astro-f45cruvs){overflow-x:auto}:where(.astro-f45cruvs)[role=tablist]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));padding:0;list-style:none;display:flex}.tab:where(.astro-f45cruvs){margin-bottom:-2px}.tab:where(.astro-f45cruvs)>:where(.astro-f45cruvs)[role=tab]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));color:hsl(var(--foreground) / var(--tw-text-opacity,1));outline-offset:-.1875rem;overflow-wrap:initial;align-items:center;gap:.5rem;padding:.2rem 1.25rem;text-decoration:none;display:flex}.tab:where(.astro-f45cruvs) :where(.astro-f45cruvs)[role=tab][aria-selected=true]{color:hsl(var(--primary) / var(--tw-text-opacity,1));border-color:hsl(var(--primary) / var(--tw-text-opacity,1));font-weight:600}.tablist-wrapper:where(.astro-f45cruvs)~[role=tabpanel]{margin-top:1rem}.mdx-repl:where(.astro-rbi54dnn){background:linear-gradient(135deg, hsl(var(--primary) / .05) 0%, hsl(var(--muted) / .2) 100%)}.mdx-repl-container:where(.astro-rbi54dnn)>*{width:var(--width)}.mdx-repl-container:where(.astro-rbi54dnn)>:first-child{margin-top:0}.mdx-repl-container:where(.astro-rbi54dnn)>:last-child{margin-bottom:0}.mdx-repl:where(.astro-rbi54dnn) .astro-code{border-radius:0;margin:0}.mdx-repl:where(.astro-rbi54dnn) div[role=tabpanel]{margin-top:0}.sl-steps{--bullet-size:calc(1.75rem);--bullet-margin:.375rem;counter-reset:steps-counter var(--sl-steps-start,0);padding-inline-start:0!important;list-style:none!important}.sl-steps>li{counter-increment:steps-counter;padding-inline-start:calc(var(--bullet-size) + 1rem);min-height:calc(var(--bullet-size) + var(--bullet-margin));padding-bottom:1px;position:relative}.sl-steps>li+li{margin-top:0}.sl-steps>li:before{content:counter(steps-counter);top:0;width:var(--bullet-size);height:var(--bullet-size);line-height:var(--bullet-size);text-align:center;color:hsl(var(--foreground) / var(--tw-text-opacity,1));background-color:hsl(var(--primary-foreground) / var(--tw-bg-opacity,1));box-shadow:inset 0 0 0 1px hsl(var(--border) / var(--tw-border-opacity,1));border-radius:99rem;font-size:.8125rem;font-weight:600;position:absolute;inset-inline-start:0}.sl-steps>li:after{--guide-width:1px;content:\"\";top:calc(var(--bullet-size) + var(--bullet-margin));bottom:var(--bullet-margin);width:var(--guide-width);background-color:hsl(var(--border) / var(--tw-border-opacity,1));position:absolute;inset-inline-start:calc((var(--bullet-size) - var(--guide-width)) / 2)}.sl-steps>li>:first-child{--lh:calc(1.75em);--shift-y:calc(.5 * (var(--bullet-size) - var(--lh)));transform:translateY(var(--shift-y));margin-top:0;margin-bottom:var(--shift-y);color:hsl(var(--foreground) / var(--tw-text-opacity,1))}.sl-steps>li>:first-child:where(h1,h2,h3,h4,h5,h6){--lh:calc(1.2em)}\n"}],"routeData":{"route":"/en/terms/disclaimer","isIndex":false,"type":"page","pattern":"^\\/en\\/terms\\/disclaimer$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"terms","dynamic":false,"spread":false}],[{"content":"disclaimer","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/terms/disclaimer.md","pathname":"/en/terms/disclaimer","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[{"type":"external","src":"_astro/BaseLayout.CL6vbAf4.css"},{"type":"inline","content":".expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:0fr}.expanded:where(.astro-fj7gv3ii) .expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:1fr}svg:where(.astro-sqapcrnd){color:var(--sl-icon-color);font-size:var(--sl-icon-size,1em);width:1.5em;height:1.5em}.aside:where(.astro-mjo7ae67)>.aside-container:where(.astro-mjo7ae67){--tw-bg-opacity:.07;&.aside-tip{--primary:234 60% 60%}&.aside-caution{--primary:41 90% 50%}&.aside-danger{--primary:339 90% 60%}& .aside-content{&>:where(.astro-mjo7ae67):first-child{margin-top:0}&>:where(.astro-mjo7ae67):last-child{margin-bottom:0}& p a,& li a,& blockquote a,& td a,& a{color:hsl(var(--foreground) / var(--tw-text-opacity,1));text-decoration:underline;text-decoration-color:hsl(var(--muted-foreground) / .5);text-underline-offset:.125rem;border-radius:.25rem;margin:-.125rem -.25rem;padding:.125rem .25rem;transition:all .2s;&:hover{background-color:hsl(var(--foreground) / var(--tw-text-opacity,1));color:hsl(var(--background));text-decoration:none}}}}starlight-tabs:where(.astro-f45cruvs){display:block}.tablist-wrapper:where(.astro-f45cruvs){overflow-x:auto}:where(.astro-f45cruvs)[role=tablist]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));padding:0;list-style:none;display:flex}.tab:where(.astro-f45cruvs){margin-bottom:-2px}.tab:where(.astro-f45cruvs)>:where(.astro-f45cruvs)[role=tab]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));color:hsl(var(--foreground) / var(--tw-text-opacity,1));outline-offset:-.1875rem;overflow-wrap:initial;align-items:center;gap:.5rem;padding:.2rem 1.25rem;text-decoration:none;display:flex}.tab:where(.astro-f45cruvs) :where(.astro-f45cruvs)[role=tab][aria-selected=true]{color:hsl(var(--primary) / var(--tw-text-opacity,1));border-color:hsl(var(--primary) / var(--tw-text-opacity,1));font-weight:600}.tablist-wrapper:where(.astro-f45cruvs)~[role=tabpanel]{margin-top:1rem}.mdx-repl:where(.astro-rbi54dnn){background:linear-gradient(135deg, hsl(var(--primary) / .05) 0%, hsl(var(--muted) / .2) 100%)}.mdx-repl-container:where(.astro-rbi54dnn)>*{width:var(--width)}.mdx-repl-container:where(.astro-rbi54dnn)>:first-child{margin-top:0}.mdx-repl-container:where(.astro-rbi54dnn)>:last-child{margin-bottom:0}.mdx-repl:where(.astro-rbi54dnn) .astro-code{border-radius:0;margin:0}.mdx-repl:where(.astro-rbi54dnn) div[role=tabpanel]{margin-top:0}.sl-steps{--bullet-size:calc(1.75rem);--bullet-margin:.375rem;counter-reset:steps-counter var(--sl-steps-start,0);padding-inline-start:0!important;list-style:none!important}.sl-steps>li{counter-increment:steps-counter;padding-inline-start:calc(var(--bullet-size) + 1rem);min-height:calc(var(--bullet-size) + var(--bullet-margin));padding-bottom:1px;position:relative}.sl-steps>li+li{margin-top:0}.sl-steps>li:before{content:counter(steps-counter);top:0;width:var(--bullet-size);height:var(--bullet-size);line-height:var(--bullet-size);text-align:center;color:hsl(var(--foreground) / var(--tw-text-opacity,1));background-color:hsl(var(--primary-foreground) / var(--tw-bg-opacity,1));box-shadow:inset 0 0 0 1px hsl(var(--border) / var(--tw-border-opacity,1));border-radius:99rem;font-size:.8125rem;font-weight:600;position:absolute;inset-inline-start:0}.sl-steps>li:after{--guide-width:1px;content:\"\";top:calc(var(--bullet-size) + var(--bullet-margin));bottom:var(--bullet-margin);width:var(--guide-width);background-color:hsl(var(--border) / var(--tw-border-opacity,1));position:absolute;inset-inline-start:calc((var(--bullet-size) - var(--guide-width)) / 2)}.sl-steps>li>:first-child{--lh:calc(1.75em);--shift-y:calc(.5 * (var(--bullet-size) - var(--lh)));transform:translateY(var(--shift-y));margin-top:0;margin-bottom:var(--shift-y);color:hsl(var(--foreground) / var(--tw-text-opacity,1))}.sl-steps>li>:first-child:where(h1,h2,h3,h4,h5,h6){--lh:calc(1.2em)}\n"}],"routeData":{"route":"/en/terms/list","isIndex":false,"type":"page","pattern":"^\\/en\\/terms\\/list$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"terms","dynamic":false,"spread":false}],[{"content":"list","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/terms/list.astro","pathname":"/en/terms/list","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[{"type":"external","src":"_astro/pages.BnZl33Nh.css"},{"type":"external","src":"_astro/BaseLayout.CL6vbAf4.css"},{"type":"external","src":"_astro/advanced.BpGthh3v.css"},{"type":"inline","content":".expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:0fr}.expanded:where(.astro-fj7gv3ii) .expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:1fr}svg:where(.astro-sqapcrnd){color:var(--sl-icon-color);font-size:var(--sl-icon-size,1em);width:1.5em;height:1.5em}.aside:where(.astro-mjo7ae67)>.aside-container:where(.astro-mjo7ae67){--tw-bg-opacity:.07;&.aside-tip{--primary:234 60% 60%}&.aside-caution{--primary:41 90% 50%}&.aside-danger{--primary:339 90% 60%}& .aside-content{&>:where(.astro-mjo7ae67):first-child{margin-top:0}&>:where(.astro-mjo7ae67):last-child{margin-bottom:0}& p a,& li a,& blockquote a,& td a,& a{color:hsl(var(--foreground) / var(--tw-text-opacity,1));text-decoration:underline;text-decoration-color:hsl(var(--muted-foreground) / .5);text-underline-offset:.125rem;border-radius:.25rem;margin:-.125rem -.25rem;padding:.125rem .25rem;transition:all .2s;&:hover{background-color:hsl(var(--foreground) / var(--tw-text-opacity,1));color:hsl(var(--background));text-decoration:none}}}}starlight-tabs:where(.astro-f45cruvs){display:block}.tablist-wrapper:where(.astro-f45cruvs){overflow-x:auto}:where(.astro-f45cruvs)[role=tablist]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));padding:0;list-style:none;display:flex}.tab:where(.astro-f45cruvs){margin-bottom:-2px}.tab:where(.astro-f45cruvs)>:where(.astro-f45cruvs)[role=tab]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));color:hsl(var(--foreground) / var(--tw-text-opacity,1));outline-offset:-.1875rem;overflow-wrap:initial;align-items:center;gap:.5rem;padding:.2rem 1.25rem;text-decoration:none;display:flex}.tab:where(.astro-f45cruvs) :where(.astro-f45cruvs)[role=tab][aria-selected=true]{color:hsl(var(--primary) / var(--tw-text-opacity,1));border-color:hsl(var(--primary) / var(--tw-text-opacity,1));font-weight:600}.tablist-wrapper:where(.astro-f45cruvs)~[role=tabpanel]{margin-top:1rem}.mdx-repl:where(.astro-rbi54dnn){background:linear-gradient(135deg, hsl(var(--primary) / .05) 0%, hsl(var(--muted) / .2) 100%)}.mdx-repl-container:where(.astro-rbi54dnn)>*{width:var(--width)}.mdx-repl-container:where(.astro-rbi54dnn)>:first-child{margin-top:0}.mdx-repl-container:where(.astro-rbi54dnn)>:last-child{margin-bottom:0}.mdx-repl:where(.astro-rbi54dnn) .astro-code{border-radius:0;margin:0}.mdx-repl:where(.astro-rbi54dnn) div[role=tabpanel]{margin-top:0}.sl-steps{--bullet-size:calc(1.75rem);--bullet-margin:.375rem;counter-reset:steps-counter var(--sl-steps-start,0);padding-inline-start:0!important;list-style:none!important}.sl-steps>li{counter-increment:steps-counter;padding-inline-start:calc(var(--bullet-size) + 1rem);min-height:calc(var(--bullet-size) + var(--bullet-margin));padding-bottom:1px;position:relative}.sl-steps>li+li{margin-top:0}.sl-steps>li:before{content:counter(steps-counter);top:0;width:var(--bullet-size);height:var(--bullet-size);line-height:var(--bullet-size);text-align:center;color:hsl(var(--foreground) / var(--tw-text-opacity,1));background-color:hsl(var(--primary-foreground) / var(--tw-bg-opacity,1));box-shadow:inset 0 0 0 1px hsl(var(--border) / var(--tw-border-opacity,1));border-radius:99rem;font-size:.8125rem;font-weight:600;position:absolute;inset-inline-start:0}.sl-steps>li:after{--guide-width:1px;content:\"\";top:calc(var(--bullet-size) + var(--bullet-margin));bottom:var(--bullet-margin);width:var(--guide-width);background-color:hsl(var(--border) / var(--tw-border-opacity,1));position:absolute;inset-inline-start:calc((var(--bullet-size) - var(--guide-width)) / 2)}.sl-steps>li>:first-child{--lh:calc(1.75em);--shift-y:calc(.5 * (var(--bullet-size) - var(--lh)));transform:translateY(var(--shift-y));margin-top:0;margin-bottom:var(--shift-y);color:hsl(var(--foreground) / var(--tw-text-opacity,1))}.sl-steps>li>:first-child:where(h1,h2,h3,h4,h5,h6){--lh:calc(1.2em)}\n"}],"routeData":{"route":"/en/terms/privacy-policy","isIndex":false,"type":"page","pattern":"^\\/en\\/terms\\/privacy-policy$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"terms","dynamic":false,"spread":false}],[{"content":"privacy-policy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/terms/privacy-policy.md","pathname":"/en/terms/privacy-policy","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[{"type":"external","src":"_astro/pages.BnZl33Nh.css"},{"type":"external","src":"_astro/BaseLayout.CL6vbAf4.css"},{"type":"external","src":"_astro/advanced.BpGthh3v.css"},{"type":"inline","content":".expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:0fr}.expanded:where(.astro-fj7gv3ii) .expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:1fr}svg:where(.astro-sqapcrnd){color:var(--sl-icon-color);font-size:var(--sl-icon-size,1em);width:1.5em;height:1.5em}.aside:where(.astro-mjo7ae67)>.aside-container:where(.astro-mjo7ae67){--tw-bg-opacity:.07;&.aside-tip{--primary:234 60% 60%}&.aside-caution{--primary:41 90% 50%}&.aside-danger{--primary:339 90% 60%}& .aside-content{&>:where(.astro-mjo7ae67):first-child{margin-top:0}&>:where(.astro-mjo7ae67):last-child{margin-bottom:0}& p a,& li a,& blockquote a,& td a,& a{color:hsl(var(--foreground) / var(--tw-text-opacity,1));text-decoration:underline;text-decoration-color:hsl(var(--muted-foreground) / .5);text-underline-offset:.125rem;border-radius:.25rem;margin:-.125rem -.25rem;padding:.125rem .25rem;transition:all .2s;&:hover{background-color:hsl(var(--foreground) / var(--tw-text-opacity,1));color:hsl(var(--background));text-decoration:none}}}}starlight-tabs:where(.astro-f45cruvs){display:block}.tablist-wrapper:where(.astro-f45cruvs){overflow-x:auto}:where(.astro-f45cruvs)[role=tablist]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));padding:0;list-style:none;display:flex}.tab:where(.astro-f45cruvs){margin-bottom:-2px}.tab:where(.astro-f45cruvs)>:where(.astro-f45cruvs)[role=tab]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));color:hsl(var(--foreground) / var(--tw-text-opacity,1));outline-offset:-.1875rem;overflow-wrap:initial;align-items:center;gap:.5rem;padding:.2rem 1.25rem;text-decoration:none;display:flex}.tab:where(.astro-f45cruvs) :where(.astro-f45cruvs)[role=tab][aria-selected=true]{color:hsl(var(--primary) / var(--tw-text-opacity,1));border-color:hsl(var(--primary) / var(--tw-text-opacity,1));font-weight:600}.tablist-wrapper:where(.astro-f45cruvs)~[role=tabpanel]{margin-top:1rem}.mdx-repl:where(.astro-rbi54dnn){background:linear-gradient(135deg, hsl(var(--primary) / .05) 0%, hsl(var(--muted) / .2) 100%)}.mdx-repl-container:where(.astro-rbi54dnn)>*{width:var(--width)}.mdx-repl-container:where(.astro-rbi54dnn)>:first-child{margin-top:0}.mdx-repl-container:where(.astro-rbi54dnn)>:last-child{margin-bottom:0}.mdx-repl:where(.astro-rbi54dnn) .astro-code{border-radius:0;margin:0}.mdx-repl:where(.astro-rbi54dnn) div[role=tabpanel]{margin-top:0}.sl-steps{--bullet-size:calc(1.75rem);--bullet-margin:.375rem;counter-reset:steps-counter var(--sl-steps-start,0);padding-inline-start:0!important;list-style:none!important}.sl-steps>li{counter-increment:steps-counter;padding-inline-start:calc(var(--bullet-size) + 1rem);min-height:calc(var(--bullet-size) + var(--bullet-margin));padding-bottom:1px;position:relative}.sl-steps>li+li{margin-top:0}.sl-steps>li:before{content:counter(steps-counter);top:0;width:var(--bullet-size);height:var(--bullet-size);line-height:var(--bullet-size);text-align:center;color:hsl(var(--foreground) / var(--tw-text-opacity,1));background-color:hsl(var(--primary-foreground) / var(--tw-bg-opacity,1));box-shadow:inset 0 0 0 1px hsl(var(--border) / var(--tw-border-opacity,1));border-radius:99rem;font-size:.8125rem;font-weight:600;position:absolute;inset-inline-start:0}.sl-steps>li:after{--guide-width:1px;content:\"\";top:calc(var(--bullet-size) + var(--bullet-margin));bottom:var(--bullet-margin);width:var(--guide-width);background-color:hsl(var(--border) / var(--tw-border-opacity,1));position:absolute;inset-inline-start:calc((var(--bullet-size) - var(--guide-width)) / 2)}.sl-steps>li>:first-child{--lh:calc(1.75em);--shift-y:calc(.5 * (var(--bullet-size) - var(--lh)));transform:translateY(var(--shift-y));margin-top:0;margin-bottom:var(--shift-y);color:hsl(var(--foreground) / var(--tw-text-opacity,1))}.sl-steps>li>:first-child:where(h1,h2,h3,h4,h5,h6){--lh:calc(1.2em)}\n"}],"routeData":{"route":"/en/terms/terms-and-conditions","isIndex":false,"type":"page","pattern":"^\\/en\\/terms\\/terms-and-conditions$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"terms","dynamic":false,"spread":false}],[{"content":"terms-and-conditions","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/terms/terms-and-conditions.md","pathname":"/en/terms/terms-and-conditions","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[{"type":"external","src":"_astro/BaseLayout.CL6vbAf4.css"},{"type":"inline","content":".expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:0fr}.expanded:where(.astro-fj7gv3ii) .expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:1fr}svg:where(.astro-sqapcrnd){color:var(--sl-icon-color);font-size:var(--sl-icon-size,1em);width:1.5em;height:1.5em}.aside:where(.astro-mjo7ae67)>.aside-container:where(.astro-mjo7ae67){--tw-bg-opacity:.07;&.aside-tip{--primary:234 60% 60%}&.aside-caution{--primary:41 90% 50%}&.aside-danger{--primary:339 90% 60%}& .aside-content{&>:where(.astro-mjo7ae67):first-child{margin-top:0}&>:where(.astro-mjo7ae67):last-child{margin-bottom:0}& p a,& li a,& blockquote a,& td a,& a{color:hsl(var(--foreground) / var(--tw-text-opacity,1));text-decoration:underline;text-decoration-color:hsl(var(--muted-foreground) / .5);text-underline-offset:.125rem;border-radius:.25rem;margin:-.125rem -.25rem;padding:.125rem .25rem;transition:all .2s;&:hover{background-color:hsl(var(--foreground) / var(--tw-text-opacity,1));color:hsl(var(--background));text-decoration:none}}}}starlight-tabs:where(.astro-f45cruvs){display:block}.tablist-wrapper:where(.astro-f45cruvs){overflow-x:auto}:where(.astro-f45cruvs)[role=tablist]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));padding:0;list-style:none;display:flex}.tab:where(.astro-f45cruvs){margin-bottom:-2px}.tab:where(.astro-f45cruvs)>:where(.astro-f45cruvs)[role=tab]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));color:hsl(var(--foreground) / var(--tw-text-opacity,1));outline-offset:-.1875rem;overflow-wrap:initial;align-items:center;gap:.5rem;padding:.2rem 1.25rem;text-decoration:none;display:flex}.tab:where(.astro-f45cruvs) :where(.astro-f45cruvs)[role=tab][aria-selected=true]{color:hsl(var(--primary) / var(--tw-text-opacity,1));border-color:hsl(var(--primary) / var(--tw-text-opacity,1));font-weight:600}.tablist-wrapper:where(.astro-f45cruvs)~[role=tabpanel]{margin-top:1rem}.mdx-repl:where(.astro-rbi54dnn){background:linear-gradient(135deg, hsl(var(--primary) / .05) 0%, hsl(var(--muted) / .2) 100%)}.mdx-repl-container:where(.astro-rbi54dnn)>*{width:var(--width)}.mdx-repl-container:where(.astro-rbi54dnn)>:first-child{margin-top:0}.mdx-repl-container:where(.astro-rbi54dnn)>:last-child{margin-bottom:0}.mdx-repl:where(.astro-rbi54dnn) .astro-code{border-radius:0;margin:0}.mdx-repl:where(.astro-rbi54dnn) div[role=tabpanel]{margin-top:0}.sl-steps{--bullet-size:calc(1.75rem);--bullet-margin:.375rem;counter-reset:steps-counter var(--sl-steps-start,0);padding-inline-start:0!important;list-style:none!important}.sl-steps>li{counter-increment:steps-counter;padding-inline-start:calc(var(--bullet-size) + 1rem);min-height:calc(var(--bullet-size) + var(--bullet-margin));padding-bottom:1px;position:relative}.sl-steps>li+li{margin-top:0}.sl-steps>li:before{content:counter(steps-counter);top:0;width:var(--bullet-size);height:var(--bullet-size);line-height:var(--bullet-size);text-align:center;color:hsl(var(--foreground) / var(--tw-text-opacity,1));background-color:hsl(var(--primary-foreground) / var(--tw-bg-opacity,1));box-shadow:inset 0 0 0 1px hsl(var(--border) / var(--tw-border-opacity,1));border-radius:99rem;font-size:.8125rem;font-weight:600;position:absolute;inset-inline-start:0}.sl-steps>li:after{--guide-width:1px;content:\"\";top:calc(var(--bullet-size) + var(--bullet-margin));bottom:var(--bullet-margin);width:var(--guide-width);background-color:hsl(var(--border) / var(--tw-border-opacity,1));position:absolute;inset-inline-start:calc((var(--bullet-size) - var(--guide-width)) / 2)}.sl-steps>li>:first-child{--lh:calc(1.75em);--shift-y:calc(.5 * (var(--bullet-size) - var(--lh)));transform:translateY(var(--shift-y));margin-top:0;margin-bottom:var(--shift-y);color:hsl(var(--foreground) / var(--tw-text-opacity,1))}.sl-steps>li>:first-child:where(h1,h2,h3,h4,h5,h6){--lh:calc(1.2em)}\n"}],"routeData":{"route":"/en","isIndex":true,"type":"page","pattern":"^\\/en$","segments":[[{"content":"en","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/index.astro","pathname":"/en","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[{"type":"external","src":"_astro/friendCircle.CidcJVPp.css"},{"type":"external","src":"_astro/pages.BnZl33Nh.css"},{"type":"external","src":"_astro/advanced.BpGthh3v.css"},{"type":"external","src":"_astro/BaseLayout.CL6vbAf4.css"},{"type":"inline","content":".expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:0fr}.expanded:where(.astro-fj7gv3ii) .expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:1fr}svg:where(.astro-sqapcrnd){color:var(--sl-icon-color);font-size:var(--sl-icon-size,1em);width:1.5em;height:1.5em}.aside:where(.astro-mjo7ae67)>.aside-container:where(.astro-mjo7ae67){--tw-bg-opacity:.07;&.aside-tip{--primary:234 60% 60%}&.aside-caution{--primary:41 90% 50%}&.aside-danger{--primary:339 90% 60%}& .aside-content{&>:where(.astro-mjo7ae67):first-child{margin-top:0}&>:where(.astro-mjo7ae67):last-child{margin-bottom:0}& p a,& li a,& blockquote a,& td a,& a{color:hsl(var(--foreground) / var(--tw-text-opacity,1));text-decoration:underline;text-decoration-color:hsl(var(--muted-foreground) / .5);text-underline-offset:.125rem;border-radius:.25rem;margin:-.125rem -.25rem;padding:.125rem .25rem;transition:all .2s;&:hover{background-color:hsl(var(--foreground) / var(--tw-text-opacity,1));color:hsl(var(--background));text-decoration:none}}}}starlight-tabs:where(.astro-f45cruvs){display:block}.tablist-wrapper:where(.astro-f45cruvs){overflow-x:auto}:where(.astro-f45cruvs)[role=tablist]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));padding:0;list-style:none;display:flex}.tab:where(.astro-f45cruvs){margin-bottom:-2px}.tab:where(.astro-f45cruvs)>:where(.astro-f45cruvs)[role=tab]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));color:hsl(var(--foreground) / var(--tw-text-opacity,1));outline-offset:-.1875rem;overflow-wrap:initial;align-items:center;gap:.5rem;padding:.2rem 1.25rem;text-decoration:none;display:flex}.tab:where(.astro-f45cruvs) :where(.astro-f45cruvs)[role=tab][aria-selected=true]{color:hsl(var(--primary) / var(--tw-text-opacity,1));border-color:hsl(var(--primary) / var(--tw-text-opacity,1));font-weight:600}.tablist-wrapper:where(.astro-f45cruvs)~[role=tabpanel]{margin-top:1rem}.mdx-repl:where(.astro-rbi54dnn){background:linear-gradient(135deg, hsl(var(--primary) / .05) 0%, hsl(var(--muted) / .2) 100%)}.mdx-repl-container:where(.astro-rbi54dnn)>*{width:var(--width)}.mdx-repl-container:where(.astro-rbi54dnn)>:first-child{margin-top:0}.mdx-repl-container:where(.astro-rbi54dnn)>:last-child{margin-bottom:0}.mdx-repl:where(.astro-rbi54dnn) .astro-code{border-radius:0;margin:0}.mdx-repl:where(.astro-rbi54dnn) div[role=tabpanel]{margin-top:0}.sl-steps{--bullet-size:calc(1.75rem);--bullet-margin:.375rem;counter-reset:steps-counter var(--sl-steps-start,0);padding-inline-start:0!important;list-style:none!important}.sl-steps>li{counter-increment:steps-counter;padding-inline-start:calc(var(--bullet-size) + 1rem);min-height:calc(var(--bullet-size) + var(--bullet-margin));padding-bottom:1px;position:relative}.sl-steps>li+li{margin-top:0}.sl-steps>li:before{content:counter(steps-counter);top:0;width:var(--bullet-size);height:var(--bullet-size);line-height:var(--bullet-size);text-align:center;color:hsl(var(--foreground) / var(--tw-text-opacity,1));background-color:hsl(var(--primary-foreground) / var(--tw-bg-opacity,1));box-shadow:inset 0 0 0 1px hsl(var(--border) / var(--tw-border-opacity,1));border-radius:99rem;font-size:.8125rem;font-weight:600;position:absolute;inset-inline-start:0}.sl-steps>li:after{--guide-width:1px;content:\"\";top:calc(var(--bullet-size) + var(--bullet-margin));bottom:var(--bullet-margin);width:var(--guide-width);background-color:hsl(var(--border) / var(--tw-border-opacity,1));position:absolute;inset-inline-start:calc((var(--bullet-size) - var(--guide-width)) / 2)}.sl-steps>li>:first-child{--lh:calc(1.75em);--shift-y:calc(.5 * (var(--bullet-size) - var(--lh)));transform:translateY(var(--shift-y));margin-top:0;margin-bottom:var(--shift-y);color:hsl(var(--foreground) / var(--tw-text-opacity,1))}.sl-steps>li>:first-child:where(h1,h2,h3,h4,h5,h6){--lh:calc(1.2em)}\n"}],"routeData":{"route":"/links","isIndex":true,"type":"page","pattern":"^\\/links$","segments":[[{"content":"links","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/links/index.astro","pathname":"/links","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[{"type":"inline","content":".project-card:where(.astro-c42hbzau){opacity:0;animation:.6s ease-out forwards fadeInUp;transform:translateY(20px)}@keyframes fadeInUp{to{opacity:1;transform:translateY(0)}}.project-card:where(.astro-c42hbzau) :where(.astro-c42hbzau){transition-duration:.2s;transition-timing-function:cubic-bezier(.4,0,.2,1)}\n"},{"type":"external","src":"_astro/pages.BnZl33Nh.css"},{"type":"external","src":"_astro/advanced.BpGthh3v.css"},{"type":"external","src":"_astro/BaseLayout.CL6vbAf4.css"},{"type":"inline","content":".expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:0fr}.expanded:where(.astro-fj7gv3ii) .expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:1fr}svg:where(.astro-sqapcrnd){color:var(--sl-icon-color);font-size:var(--sl-icon-size,1em);width:1.5em;height:1.5em}.aside:where(.astro-mjo7ae67)>.aside-container:where(.astro-mjo7ae67){--tw-bg-opacity:.07;&.aside-tip{--primary:234 60% 60%}&.aside-caution{--primary:41 90% 50%}&.aside-danger{--primary:339 90% 60%}& .aside-content{&>:where(.astro-mjo7ae67):first-child{margin-top:0}&>:where(.astro-mjo7ae67):last-child{margin-bottom:0}& p a,& li a,& blockquote a,& td a,& a{color:hsl(var(--foreground) / var(--tw-text-opacity,1));text-decoration:underline;text-decoration-color:hsl(var(--muted-foreground) / .5);text-underline-offset:.125rem;border-radius:.25rem;margin:-.125rem -.25rem;padding:.125rem .25rem;transition:all .2s;&:hover{background-color:hsl(var(--foreground) / var(--tw-text-opacity,1));color:hsl(var(--background));text-decoration:none}}}}starlight-tabs:where(.astro-f45cruvs){display:block}.tablist-wrapper:where(.astro-f45cruvs){overflow-x:auto}:where(.astro-f45cruvs)[role=tablist]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));padding:0;list-style:none;display:flex}.tab:where(.astro-f45cruvs){margin-bottom:-2px}.tab:where(.astro-f45cruvs)>:where(.astro-f45cruvs)[role=tab]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));color:hsl(var(--foreground) / var(--tw-text-opacity,1));outline-offset:-.1875rem;overflow-wrap:initial;align-items:center;gap:.5rem;padding:.2rem 1.25rem;text-decoration:none;display:flex}.tab:where(.astro-f45cruvs) :where(.astro-f45cruvs)[role=tab][aria-selected=true]{color:hsl(var(--primary) / var(--tw-text-opacity,1));border-color:hsl(var(--primary) / var(--tw-text-opacity,1));font-weight:600}.tablist-wrapper:where(.astro-f45cruvs)~[role=tabpanel]{margin-top:1rem}.mdx-repl:where(.astro-rbi54dnn){background:linear-gradient(135deg, hsl(var(--primary) / .05) 0%, hsl(var(--muted) / .2) 100%)}.mdx-repl-container:where(.astro-rbi54dnn)>*{width:var(--width)}.mdx-repl-container:where(.astro-rbi54dnn)>:first-child{margin-top:0}.mdx-repl-container:where(.astro-rbi54dnn)>:last-child{margin-bottom:0}.mdx-repl:where(.astro-rbi54dnn) .astro-code{border-radius:0;margin:0}.mdx-repl:where(.astro-rbi54dnn) div[role=tabpanel]{margin-top:0}.sl-steps{--bullet-size:calc(1.75rem);--bullet-margin:.375rem;counter-reset:steps-counter var(--sl-steps-start,0);padding-inline-start:0!important;list-style:none!important}.sl-steps>li{counter-increment:steps-counter;padding-inline-start:calc(var(--bullet-size) + 1rem);min-height:calc(var(--bullet-size) + var(--bullet-margin));padding-bottom:1px;position:relative}.sl-steps>li+li{margin-top:0}.sl-steps>li:before{content:counter(steps-counter);top:0;width:var(--bullet-size);height:var(--bullet-size);line-height:var(--bullet-size);text-align:center;color:hsl(var(--foreground) / var(--tw-text-opacity,1));background-color:hsl(var(--primary-foreground) / var(--tw-bg-opacity,1));box-shadow:inset 0 0 0 1px hsl(var(--border) / var(--tw-border-opacity,1));border-radius:99rem;font-size:.8125rem;font-weight:600;position:absolute;inset-inline-start:0}.sl-steps>li:after{--guide-width:1px;content:\"\";top:calc(var(--bullet-size) + var(--bullet-margin));bottom:var(--bullet-margin);width:var(--guide-width);background-color:hsl(var(--border) / var(--tw-border-opacity,1));position:absolute;inset-inline-start:calc((var(--bullet-size) - var(--guide-width)) / 2)}.sl-steps>li>:first-child{--lh:calc(1.75em);--shift-y:calc(.5 * (var(--bullet-size) - var(--lh)));transform:translateY(var(--shift-y));margin-top:0;margin-bottom:var(--shift-y);color:hsl(var(--foreground) / var(--tw-text-opacity,1))}.sl-steps>li>:first-child:where(h1,h2,h3,h4,h5,h6){--lh:calc(1.2em)}\n"}],"routeData":{"route":"/projects","isIndex":true,"type":"page","pattern":"^\\/projects$","segments":[[{"content":"projects","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/projects/index.astro","pathname":"/projects","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[],"routeData":{"route":"/robots.txt","isIndex":false,"type":"endpoint","pattern":"^\\/robots\\.txt$","segments":[[{"content":"robots.txt","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/robots.txt.ts","pathname":"/robots.txt","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.ts","pathname":"/rss.xml","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[{"type":"external","src":"_astro/BaseLayout.CL6vbAf4.css"},{"type":"external","src":"_astro/pages.BnZl33Nh.css"},{"type":"external","src":"_astro/advanced.BpGthh3v.css"},{"type":"inline","content":".expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:0fr}.expanded:where(.astro-fj7gv3ii) .expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:1fr}svg:where(.astro-sqapcrnd){color:var(--sl-icon-color);font-size:var(--sl-icon-size,1em);width:1.5em;height:1.5em}.aside:where(.astro-mjo7ae67)>.aside-container:where(.astro-mjo7ae67){--tw-bg-opacity:.07;&.aside-tip{--primary:234 60% 60%}&.aside-caution{--primary:41 90% 50%}&.aside-danger{--primary:339 90% 60%}& .aside-content{&>:where(.astro-mjo7ae67):first-child{margin-top:0}&>:where(.astro-mjo7ae67):last-child{margin-bottom:0}& p a,& li a,& blockquote a,& td a,& a{color:hsl(var(--foreground) / var(--tw-text-opacity,1));text-decoration:underline;text-decoration-color:hsl(var(--muted-foreground) / .5);text-underline-offset:.125rem;border-radius:.25rem;margin:-.125rem -.25rem;padding:.125rem .25rem;transition:all .2s;&:hover{background-color:hsl(var(--foreground) / var(--tw-text-opacity,1));color:hsl(var(--background));text-decoration:none}}}}starlight-tabs:where(.astro-f45cruvs){display:block}.tablist-wrapper:where(.astro-f45cruvs){overflow-x:auto}:where(.astro-f45cruvs)[role=tablist]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));padding:0;list-style:none;display:flex}.tab:where(.astro-f45cruvs){margin-bottom:-2px}.tab:where(.astro-f45cruvs)>:where(.astro-f45cruvs)[role=tab]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));color:hsl(var(--foreground) / var(--tw-text-opacity,1));outline-offset:-.1875rem;overflow-wrap:initial;align-items:center;gap:.5rem;padding:.2rem 1.25rem;text-decoration:none;display:flex}.tab:where(.astro-f45cruvs) :where(.astro-f45cruvs)[role=tab][aria-selected=true]{color:hsl(var(--primary) / var(--tw-text-opacity,1));border-color:hsl(var(--primary) / var(--tw-text-opacity,1));font-weight:600}.tablist-wrapper:where(.astro-f45cruvs)~[role=tabpanel]{margin-top:1rem}.mdx-repl:where(.astro-rbi54dnn){background:linear-gradient(135deg, hsl(var(--primary) / .05) 0%, hsl(var(--muted) / .2) 100%)}.mdx-repl-container:where(.astro-rbi54dnn)>*{width:var(--width)}.mdx-repl-container:where(.astro-rbi54dnn)>:first-child{margin-top:0}.mdx-repl-container:where(.astro-rbi54dnn)>:last-child{margin-bottom:0}.mdx-repl:where(.astro-rbi54dnn) .astro-code{border-radius:0;margin:0}.mdx-repl:where(.astro-rbi54dnn) div[role=tabpanel]{margin-top:0}.sl-steps{--bullet-size:calc(1.75rem);--bullet-margin:.375rem;counter-reset:steps-counter var(--sl-steps-start,0);padding-inline-start:0!important;list-style:none!important}.sl-steps>li{counter-increment:steps-counter;padding-inline-start:calc(var(--bullet-size) + 1rem);min-height:calc(var(--bullet-size) + var(--bullet-margin));padding-bottom:1px;position:relative}.sl-steps>li+li{margin-top:0}.sl-steps>li:before{content:counter(steps-counter);top:0;width:var(--bullet-size);height:var(--bullet-size);line-height:var(--bullet-size);text-align:center;color:hsl(var(--foreground) / var(--tw-text-opacity,1));background-color:hsl(var(--primary-foreground) / var(--tw-bg-opacity,1));box-shadow:inset 0 0 0 1px hsl(var(--border) / var(--tw-border-opacity,1));border-radius:99rem;font-size:.8125rem;font-weight:600;position:absolute;inset-inline-start:0}.sl-steps>li:after{--guide-width:1px;content:\"\";top:calc(var(--bullet-size) + var(--bullet-margin));bottom:var(--bullet-margin);width:var(--guide-width);background-color:hsl(var(--border) / var(--tw-border-opacity,1));position:absolute;inset-inline-start:calc((var(--bullet-size) - var(--guide-width)) / 2)}.sl-steps>li>:first-child{--lh:calc(1.75em);--shift-y:calc(.5 * (var(--bullet-size) - var(--lh)));transform:translateY(var(--shift-y));margin-top:0;margin-bottom:var(--shift-y);color:hsl(var(--foreground) / var(--tw-text-opacity,1))}.sl-steps>li>:first-child:where(h1,h2,h3,h4,h5,h6){--lh:calc(1.2em)}\n"}],"routeData":{"route":"/search","isIndex":true,"type":"page","pattern":"^\\/search$","segments":[[{"content":"search","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/search/index.astro","pathname":"/search","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[],"routeData":{"route":"/tags/[tag]/[...page]","isIndex":false,"type":"page","pattern":"^\\/tags\\/([^/]+?)(?:\\/(.*?))?$","segments":[[{"content":"tags","dynamic":false,"spread":false}],[{"content":"tag","dynamic":true,"spread":false}],[{"content":"...page","dynamic":true,"spread":true}]],"params":["tag","...page"],"component":"src/pages/tags/[tag]/[...page].astro","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[{"type":"inline","content":".animate:where(.astro-wybof3wm){opacity:0;animation:.6s ease-out forwards fadeInUp;transform:translateY(20px)}#content-header:where(.astro-wybof3wm){animation-delay:.1s}#content:where(.astro-wybof3wm){animation-delay:.3s}@keyframes fadeInUp{to{opacity:1;transform:translateY(0)}}.group:where(.astro-wybof3wm):hover{z-index:10}.group:where(.astro-wybof3wm){transform-origin:50%;will-change:transform}.group:where(.astro-wybof3wm):hover .relative:where(.astro-wybof3wm){transform-origin:50%}.backdrop-blur-md:where(.astro-wybof3wm){-webkit-backdrop-filter:blur(12px)}.backdrop-blur-sm:where(.astro-wybof3wm){-webkit-backdrop-filter:blur(4px)}.counting:where(.astro-wybof3wm){animation:.2s ease-out bounce}@keyframes bounce{0%,to{transform:translateY(0)scale(1)}50%{transform:translateY(-3px)scale(1.05)}}#topics-count:where(.astro-wybof3wm),#articles-count:where(.astro-wybof3wm){font-variant-numeric:tabular-nums;transition:all .1s ease-out}\n"},{"type":"external","src":"_astro/BaseLayout.CL6vbAf4.css"},{"type":"inline","content":".expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:0fr}.expanded:where(.astro-fj7gv3ii) .expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:1fr}svg:where(.astro-sqapcrnd){color:var(--sl-icon-color);font-size:var(--sl-icon-size,1em);width:1.5em;height:1.5em}.aside:where(.astro-mjo7ae67)>.aside-container:where(.astro-mjo7ae67){--tw-bg-opacity:.07;&.aside-tip{--primary:234 60% 60%}&.aside-caution{--primary:41 90% 50%}&.aside-danger{--primary:339 90% 60%}& .aside-content{&>:where(.astro-mjo7ae67):first-child{margin-top:0}&>:where(.astro-mjo7ae67):last-child{margin-bottom:0}& p a,& li a,& blockquote a,& td a,& a{color:hsl(var(--foreground) / var(--tw-text-opacity,1));text-decoration:underline;text-decoration-color:hsl(var(--muted-foreground) / .5);text-underline-offset:.125rem;border-radius:.25rem;margin:-.125rem -.25rem;padding:.125rem .25rem;transition:all .2s;&:hover{background-color:hsl(var(--foreground) / var(--tw-text-opacity,1));color:hsl(var(--background));text-decoration:none}}}}starlight-tabs:where(.astro-f45cruvs){display:block}.tablist-wrapper:where(.astro-f45cruvs){overflow-x:auto}:where(.astro-f45cruvs)[role=tablist]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));padding:0;list-style:none;display:flex}.tab:where(.astro-f45cruvs){margin-bottom:-2px}.tab:where(.astro-f45cruvs)>:where(.astro-f45cruvs)[role=tab]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));color:hsl(var(--foreground) / var(--tw-text-opacity,1));outline-offset:-.1875rem;overflow-wrap:initial;align-items:center;gap:.5rem;padding:.2rem 1.25rem;text-decoration:none;display:flex}.tab:where(.astro-f45cruvs) :where(.astro-f45cruvs)[role=tab][aria-selected=true]{color:hsl(var(--primary) / var(--tw-text-opacity,1));border-color:hsl(var(--primary) / var(--tw-text-opacity,1));font-weight:600}.tablist-wrapper:where(.astro-f45cruvs)~[role=tabpanel]{margin-top:1rem}.mdx-repl:where(.astro-rbi54dnn){background:linear-gradient(135deg, hsl(var(--primary) / .05) 0%, hsl(var(--muted) / .2) 100%)}.mdx-repl-container:where(.astro-rbi54dnn)>*{width:var(--width)}.mdx-repl-container:where(.astro-rbi54dnn)>:first-child{margin-top:0}.mdx-repl-container:where(.astro-rbi54dnn)>:last-child{margin-bottom:0}.mdx-repl:where(.astro-rbi54dnn) .astro-code{border-radius:0;margin:0}.mdx-repl:where(.astro-rbi54dnn) div[role=tabpanel]{margin-top:0}.sl-steps{--bullet-size:calc(1.75rem);--bullet-margin:.375rem;counter-reset:steps-counter var(--sl-steps-start,0);padding-inline-start:0!important;list-style:none!important}.sl-steps>li{counter-increment:steps-counter;padding-inline-start:calc(var(--bullet-size) + 1rem);min-height:calc(var(--bullet-size) + var(--bullet-margin));padding-bottom:1px;position:relative}.sl-steps>li+li{margin-top:0}.sl-steps>li:before{content:counter(steps-counter);top:0;width:var(--bullet-size);height:var(--bullet-size);line-height:var(--bullet-size);text-align:center;color:hsl(var(--foreground) / var(--tw-text-opacity,1));background-color:hsl(var(--primary-foreground) / var(--tw-bg-opacity,1));box-shadow:inset 0 0 0 1px hsl(var(--border) / var(--tw-border-opacity,1));border-radius:99rem;font-size:.8125rem;font-weight:600;position:absolute;inset-inline-start:0}.sl-steps>li:after{--guide-width:1px;content:\"\";top:calc(var(--bullet-size) + var(--bullet-margin));bottom:var(--bullet-margin);width:var(--guide-width);background-color:hsl(var(--border) / var(--tw-border-opacity,1));position:absolute;inset-inline-start:calc((var(--bullet-size) - var(--guide-width)) / 2)}.sl-steps>li>:first-child{--lh:calc(1.75em);--shift-y:calc(.5 * (var(--bullet-size) - var(--lh)));transform:translateY(var(--shift-y));margin-top:0;margin-bottom:var(--shift-y);color:hsl(var(--foreground) / var(--tw-text-opacity,1))}.sl-steps>li>:first-child:where(h1,h2,h3,h4,h5,h6){--lh:calc(1.2em)}\n"}],"routeData":{"route":"/tags","isIndex":true,"type":"page","pattern":"^\\/tags$","segments":[[{"content":"tags","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tags/index.astro","pathname":"/tags","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[{"type":"external","src":"_astro/pages.BnZl33Nh.css"},{"type":"external","src":"_astro/BaseLayout.CL6vbAf4.css"},{"type":"external","src":"_astro/advanced.BpGthh3v.css"},{"type":"inline","content":".expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:0fr}.expanded:where(.astro-fj7gv3ii) .expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:1fr}svg:where(.astro-sqapcrnd){color:var(--sl-icon-color);font-size:var(--sl-icon-size,1em);width:1.5em;height:1.5em}.aside:where(.astro-mjo7ae67)>.aside-container:where(.astro-mjo7ae67){--tw-bg-opacity:.07;&.aside-tip{--primary:234 60% 60%}&.aside-caution{--primary:41 90% 50%}&.aside-danger{--primary:339 90% 60%}& .aside-content{&>:where(.astro-mjo7ae67):first-child{margin-top:0}&>:where(.astro-mjo7ae67):last-child{margin-bottom:0}& p a,& li a,& blockquote a,& td a,& a{color:hsl(var(--foreground) / var(--tw-text-opacity,1));text-decoration:underline;text-decoration-color:hsl(var(--muted-foreground) / .5);text-underline-offset:.125rem;border-radius:.25rem;margin:-.125rem -.25rem;padding:.125rem .25rem;transition:all .2s;&:hover{background-color:hsl(var(--foreground) / var(--tw-text-opacity,1));color:hsl(var(--background));text-decoration:none}}}}starlight-tabs:where(.astro-f45cruvs){display:block}.tablist-wrapper:where(.astro-f45cruvs){overflow-x:auto}:where(.astro-f45cruvs)[role=tablist]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));padding:0;list-style:none;display:flex}.tab:where(.astro-f45cruvs){margin-bottom:-2px}.tab:where(.astro-f45cruvs)>:where(.astro-f45cruvs)[role=tab]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));color:hsl(var(--foreground) / var(--tw-text-opacity,1));outline-offset:-.1875rem;overflow-wrap:initial;align-items:center;gap:.5rem;padding:.2rem 1.25rem;text-decoration:none;display:flex}.tab:where(.astro-f45cruvs) :where(.astro-f45cruvs)[role=tab][aria-selected=true]{color:hsl(var(--primary) / var(--tw-text-opacity,1));border-color:hsl(var(--primary) / var(--tw-text-opacity,1));font-weight:600}.tablist-wrapper:where(.astro-f45cruvs)~[role=tabpanel]{margin-top:1rem}.mdx-repl:where(.astro-rbi54dnn){background:linear-gradient(135deg, hsl(var(--primary) / .05) 0%, hsl(var(--muted) / .2) 100%)}.mdx-repl-container:where(.astro-rbi54dnn)>*{width:var(--width)}.mdx-repl-container:where(.astro-rbi54dnn)>:first-child{margin-top:0}.mdx-repl-container:where(.astro-rbi54dnn)>:last-child{margin-bottom:0}.mdx-repl:where(.astro-rbi54dnn) .astro-code{border-radius:0;margin:0}.mdx-repl:where(.astro-rbi54dnn) div[role=tabpanel]{margin-top:0}.sl-steps{--bullet-size:calc(1.75rem);--bullet-margin:.375rem;counter-reset:steps-counter var(--sl-steps-start,0);padding-inline-start:0!important;list-style:none!important}.sl-steps>li{counter-increment:steps-counter;padding-inline-start:calc(var(--bullet-size) + 1rem);min-height:calc(var(--bullet-size) + var(--bullet-margin));padding-bottom:1px;position:relative}.sl-steps>li+li{margin-top:0}.sl-steps>li:before{content:counter(steps-counter);top:0;width:var(--bullet-size);height:var(--bullet-size);line-height:var(--bullet-size);text-align:center;color:hsl(var(--foreground) / var(--tw-text-opacity,1));background-color:hsl(var(--primary-foreground) / var(--tw-bg-opacity,1));box-shadow:inset 0 0 0 1px hsl(var(--border) / var(--tw-border-opacity,1));border-radius:99rem;font-size:.8125rem;font-weight:600;position:absolute;inset-inline-start:0}.sl-steps>li:after{--guide-width:1px;content:\"\";top:calc(var(--bullet-size) + var(--bullet-margin));bottom:var(--bullet-margin);width:var(--guide-width);background-color:hsl(var(--border) / var(--tw-border-opacity,1));position:absolute;inset-inline-start:calc((var(--bullet-size) - var(--guide-width)) / 2)}.sl-steps>li>:first-child{--lh:calc(1.75em);--shift-y:calc(.5 * (var(--bullet-size) - var(--lh)));transform:translateY(var(--shift-y));margin-top:0;margin-bottom:var(--shift-y);color:hsl(var(--foreground) / var(--tw-text-opacity,1))}.sl-steps>li>:first-child:where(h1,h2,h3,h4,h5,h6){--lh:calc(1.2em)}\n"}],"routeData":{"route":"/terms/copyright","isIndex":false,"type":"page","pattern":"^\\/terms\\/copyright$","segments":[[{"content":"terms","dynamic":false,"spread":false}],[{"content":"copyright","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/terms/copyright.md","pathname":"/terms/copyright","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[{"type":"external","src":"_astro/pages.BnZl33Nh.css"},{"type":"external","src":"_astro/BaseLayout.CL6vbAf4.css"},{"type":"external","src":"_astro/advanced.BpGthh3v.css"},{"type":"inline","content":".expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:0fr}.expanded:where(.astro-fj7gv3ii) .expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:1fr}svg:where(.astro-sqapcrnd){color:var(--sl-icon-color);font-size:var(--sl-icon-size,1em);width:1.5em;height:1.5em}.aside:where(.astro-mjo7ae67)>.aside-container:where(.astro-mjo7ae67){--tw-bg-opacity:.07;&.aside-tip{--primary:234 60% 60%}&.aside-caution{--primary:41 90% 50%}&.aside-danger{--primary:339 90% 60%}& .aside-content{&>:where(.astro-mjo7ae67):first-child{margin-top:0}&>:where(.astro-mjo7ae67):last-child{margin-bottom:0}& p a,& li a,& blockquote a,& td a,& a{color:hsl(var(--foreground) / var(--tw-text-opacity,1));text-decoration:underline;text-decoration-color:hsl(var(--muted-foreground) / .5);text-underline-offset:.125rem;border-radius:.25rem;margin:-.125rem -.25rem;padding:.125rem .25rem;transition:all .2s;&:hover{background-color:hsl(var(--foreground) / var(--tw-text-opacity,1));color:hsl(var(--background));text-decoration:none}}}}starlight-tabs:where(.astro-f45cruvs){display:block}.tablist-wrapper:where(.astro-f45cruvs){overflow-x:auto}:where(.astro-f45cruvs)[role=tablist]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));padding:0;list-style:none;display:flex}.tab:where(.astro-f45cruvs){margin-bottom:-2px}.tab:where(.astro-f45cruvs)>:where(.astro-f45cruvs)[role=tab]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));color:hsl(var(--foreground) / var(--tw-text-opacity,1));outline-offset:-.1875rem;overflow-wrap:initial;align-items:center;gap:.5rem;padding:.2rem 1.25rem;text-decoration:none;display:flex}.tab:where(.astro-f45cruvs) :where(.astro-f45cruvs)[role=tab][aria-selected=true]{color:hsl(var(--primary) / var(--tw-text-opacity,1));border-color:hsl(var(--primary) / var(--tw-text-opacity,1));font-weight:600}.tablist-wrapper:where(.astro-f45cruvs)~[role=tabpanel]{margin-top:1rem}.mdx-repl:where(.astro-rbi54dnn){background:linear-gradient(135deg, hsl(var(--primary) / .05) 0%, hsl(var(--muted) / .2) 100%)}.mdx-repl-container:where(.astro-rbi54dnn)>*{width:var(--width)}.mdx-repl-container:where(.astro-rbi54dnn)>:first-child{margin-top:0}.mdx-repl-container:where(.astro-rbi54dnn)>:last-child{margin-bottom:0}.mdx-repl:where(.astro-rbi54dnn) .astro-code{border-radius:0;margin:0}.mdx-repl:where(.astro-rbi54dnn) div[role=tabpanel]{margin-top:0}.sl-steps{--bullet-size:calc(1.75rem);--bullet-margin:.375rem;counter-reset:steps-counter var(--sl-steps-start,0);padding-inline-start:0!important;list-style:none!important}.sl-steps>li{counter-increment:steps-counter;padding-inline-start:calc(var(--bullet-size) + 1rem);min-height:calc(var(--bullet-size) + var(--bullet-margin));padding-bottom:1px;position:relative}.sl-steps>li+li{margin-top:0}.sl-steps>li:before{content:counter(steps-counter);top:0;width:var(--bullet-size);height:var(--bullet-size);line-height:var(--bullet-size);text-align:center;color:hsl(var(--foreground) / var(--tw-text-opacity,1));background-color:hsl(var(--primary-foreground) / var(--tw-bg-opacity,1));box-shadow:inset 0 0 0 1px hsl(var(--border) / var(--tw-border-opacity,1));border-radius:99rem;font-size:.8125rem;font-weight:600;position:absolute;inset-inline-start:0}.sl-steps>li:after{--guide-width:1px;content:\"\";top:calc(var(--bullet-size) + var(--bullet-margin));bottom:var(--bullet-margin);width:var(--guide-width);background-color:hsl(var(--border) / var(--tw-border-opacity,1));position:absolute;inset-inline-start:calc((var(--bullet-size) - var(--guide-width)) / 2)}.sl-steps>li>:first-child{--lh:calc(1.75em);--shift-y:calc(.5 * (var(--bullet-size) - var(--lh)));transform:translateY(var(--shift-y));margin-top:0;margin-bottom:var(--shift-y);color:hsl(var(--foreground) / var(--tw-text-opacity,1))}.sl-steps>li>:first-child:where(h1,h2,h3,h4,h5,h6){--lh:calc(1.2em)}\n"}],"routeData":{"route":"/terms/disclaimer","isIndex":false,"type":"page","pattern":"^\\/terms\\/disclaimer$","segments":[[{"content":"terms","dynamic":false,"spread":false}],[{"content":"disclaimer","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/terms/disclaimer.md","pathname":"/terms/disclaimer","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[{"type":"external","src":"_astro/BaseLayout.CL6vbAf4.css"},{"type":"inline","content":".expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:0fr}.expanded:where(.astro-fj7gv3ii) .expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:1fr}svg:where(.astro-sqapcrnd){color:var(--sl-icon-color);font-size:var(--sl-icon-size,1em);width:1.5em;height:1.5em}.aside:where(.astro-mjo7ae67)>.aside-container:where(.astro-mjo7ae67){--tw-bg-opacity:.07;&.aside-tip{--primary:234 60% 60%}&.aside-caution{--primary:41 90% 50%}&.aside-danger{--primary:339 90% 60%}& .aside-content{&>:where(.astro-mjo7ae67):first-child{margin-top:0}&>:where(.astro-mjo7ae67):last-child{margin-bottom:0}& p a,& li a,& blockquote a,& td a,& a{color:hsl(var(--foreground) / var(--tw-text-opacity,1));text-decoration:underline;text-decoration-color:hsl(var(--muted-foreground) / .5);text-underline-offset:.125rem;border-radius:.25rem;margin:-.125rem -.25rem;padding:.125rem .25rem;transition:all .2s;&:hover{background-color:hsl(var(--foreground) / var(--tw-text-opacity,1));color:hsl(var(--background));text-decoration:none}}}}starlight-tabs:where(.astro-f45cruvs){display:block}.tablist-wrapper:where(.astro-f45cruvs){overflow-x:auto}:where(.astro-f45cruvs)[role=tablist]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));padding:0;list-style:none;display:flex}.tab:where(.astro-f45cruvs){margin-bottom:-2px}.tab:where(.astro-f45cruvs)>:where(.astro-f45cruvs)[role=tab]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));color:hsl(var(--foreground) / var(--tw-text-opacity,1));outline-offset:-.1875rem;overflow-wrap:initial;align-items:center;gap:.5rem;padding:.2rem 1.25rem;text-decoration:none;display:flex}.tab:where(.astro-f45cruvs) :where(.astro-f45cruvs)[role=tab][aria-selected=true]{color:hsl(var(--primary) / var(--tw-text-opacity,1));border-color:hsl(var(--primary) / var(--tw-text-opacity,1));font-weight:600}.tablist-wrapper:where(.astro-f45cruvs)~[role=tabpanel]{margin-top:1rem}.mdx-repl:where(.astro-rbi54dnn){background:linear-gradient(135deg, hsl(var(--primary) / .05) 0%, hsl(var(--muted) / .2) 100%)}.mdx-repl-container:where(.astro-rbi54dnn)>*{width:var(--width)}.mdx-repl-container:where(.astro-rbi54dnn)>:first-child{margin-top:0}.mdx-repl-container:where(.astro-rbi54dnn)>:last-child{margin-bottom:0}.mdx-repl:where(.astro-rbi54dnn) .astro-code{border-radius:0;margin:0}.mdx-repl:where(.astro-rbi54dnn) div[role=tabpanel]{margin-top:0}.sl-steps{--bullet-size:calc(1.75rem);--bullet-margin:.375rem;counter-reset:steps-counter var(--sl-steps-start,0);padding-inline-start:0!important;list-style:none!important}.sl-steps>li{counter-increment:steps-counter;padding-inline-start:calc(var(--bullet-size) + 1rem);min-height:calc(var(--bullet-size) + var(--bullet-margin));padding-bottom:1px;position:relative}.sl-steps>li+li{margin-top:0}.sl-steps>li:before{content:counter(steps-counter);top:0;width:var(--bullet-size);height:var(--bullet-size);line-height:var(--bullet-size);text-align:center;color:hsl(var(--foreground) / var(--tw-text-opacity,1));background-color:hsl(var(--primary-foreground) / var(--tw-bg-opacity,1));box-shadow:inset 0 0 0 1px hsl(var(--border) / var(--tw-border-opacity,1));border-radius:99rem;font-size:.8125rem;font-weight:600;position:absolute;inset-inline-start:0}.sl-steps>li:after{--guide-width:1px;content:\"\";top:calc(var(--bullet-size) + var(--bullet-margin));bottom:var(--bullet-margin);width:var(--guide-width);background-color:hsl(var(--border) / var(--tw-border-opacity,1));position:absolute;inset-inline-start:calc((var(--bullet-size) - var(--guide-width)) / 2)}.sl-steps>li>:first-child{--lh:calc(1.75em);--shift-y:calc(.5 * (var(--bullet-size) - var(--lh)));transform:translateY(var(--shift-y));margin-top:0;margin-bottom:var(--shift-y);color:hsl(var(--foreground) / var(--tw-text-opacity,1))}.sl-steps>li>:first-child:where(h1,h2,h3,h4,h5,h6){--lh:calc(1.2em)}\n"}],"routeData":{"route":"/terms/list","isIndex":false,"type":"page","pattern":"^\\/terms\\/list$","segments":[[{"content":"terms","dynamic":false,"spread":false}],[{"content":"list","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/terms/list.astro","pathname":"/terms/list","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[{"type":"external","src":"_astro/pages.BnZl33Nh.css"},{"type":"external","src":"_astro/BaseLayout.CL6vbAf4.css"},{"type":"external","src":"_astro/advanced.BpGthh3v.css"},{"type":"inline","content":".expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:0fr}.expanded:where(.astro-fj7gv3ii) .expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:1fr}svg:where(.astro-sqapcrnd){color:var(--sl-icon-color);font-size:var(--sl-icon-size,1em);width:1.5em;height:1.5em}.aside:where(.astro-mjo7ae67)>.aside-container:where(.astro-mjo7ae67){--tw-bg-opacity:.07;&.aside-tip{--primary:234 60% 60%}&.aside-caution{--primary:41 90% 50%}&.aside-danger{--primary:339 90% 60%}& .aside-content{&>:where(.astro-mjo7ae67):first-child{margin-top:0}&>:where(.astro-mjo7ae67):last-child{margin-bottom:0}& p a,& li a,& blockquote a,& td a,& a{color:hsl(var(--foreground) / var(--tw-text-opacity,1));text-decoration:underline;text-decoration-color:hsl(var(--muted-foreground) / .5);text-underline-offset:.125rem;border-radius:.25rem;margin:-.125rem -.25rem;padding:.125rem .25rem;transition:all .2s;&:hover{background-color:hsl(var(--foreground) / var(--tw-text-opacity,1));color:hsl(var(--background));text-decoration:none}}}}starlight-tabs:where(.astro-f45cruvs){display:block}.tablist-wrapper:where(.astro-f45cruvs){overflow-x:auto}:where(.astro-f45cruvs)[role=tablist]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));padding:0;list-style:none;display:flex}.tab:where(.astro-f45cruvs){margin-bottom:-2px}.tab:where(.astro-f45cruvs)>:where(.astro-f45cruvs)[role=tab]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));color:hsl(var(--foreground) / var(--tw-text-opacity,1));outline-offset:-.1875rem;overflow-wrap:initial;align-items:center;gap:.5rem;padding:.2rem 1.25rem;text-decoration:none;display:flex}.tab:where(.astro-f45cruvs) :where(.astro-f45cruvs)[role=tab][aria-selected=true]{color:hsl(var(--primary) / var(--tw-text-opacity,1));border-color:hsl(var(--primary) / var(--tw-text-opacity,1));font-weight:600}.tablist-wrapper:where(.astro-f45cruvs)~[role=tabpanel]{margin-top:1rem}.mdx-repl:where(.astro-rbi54dnn){background:linear-gradient(135deg, hsl(var(--primary) / .05) 0%, hsl(var(--muted) / .2) 100%)}.mdx-repl-container:where(.astro-rbi54dnn)>*{width:var(--width)}.mdx-repl-container:where(.astro-rbi54dnn)>:first-child{margin-top:0}.mdx-repl-container:where(.astro-rbi54dnn)>:last-child{margin-bottom:0}.mdx-repl:where(.astro-rbi54dnn) .astro-code{border-radius:0;margin:0}.mdx-repl:where(.astro-rbi54dnn) div[role=tabpanel]{margin-top:0}.sl-steps{--bullet-size:calc(1.75rem);--bullet-margin:.375rem;counter-reset:steps-counter var(--sl-steps-start,0);padding-inline-start:0!important;list-style:none!important}.sl-steps>li{counter-increment:steps-counter;padding-inline-start:calc(var(--bullet-size) + 1rem);min-height:calc(var(--bullet-size) + var(--bullet-margin));padding-bottom:1px;position:relative}.sl-steps>li+li{margin-top:0}.sl-steps>li:before{content:counter(steps-counter);top:0;width:var(--bullet-size);height:var(--bullet-size);line-height:var(--bullet-size);text-align:center;color:hsl(var(--foreground) / var(--tw-text-opacity,1));background-color:hsl(var(--primary-foreground) / var(--tw-bg-opacity,1));box-shadow:inset 0 0 0 1px hsl(var(--border) / var(--tw-border-opacity,1));border-radius:99rem;font-size:.8125rem;font-weight:600;position:absolute;inset-inline-start:0}.sl-steps>li:after{--guide-width:1px;content:\"\";top:calc(var(--bullet-size) + var(--bullet-margin));bottom:var(--bullet-margin);width:var(--guide-width);background-color:hsl(var(--border) / var(--tw-border-opacity,1));position:absolute;inset-inline-start:calc((var(--bullet-size) - var(--guide-width)) / 2)}.sl-steps>li>:first-child{--lh:calc(1.75em);--shift-y:calc(.5 * (var(--bullet-size) - var(--lh)));transform:translateY(var(--shift-y));margin-top:0;margin-bottom:var(--shift-y);color:hsl(var(--foreground) / var(--tw-text-opacity,1))}.sl-steps>li>:first-child:where(h1,h2,h3,h4,h5,h6){--lh:calc(1.2em)}\n"}],"routeData":{"route":"/terms/privacy-policy","isIndex":false,"type":"page","pattern":"^\\/terms\\/privacy-policy$","segments":[[{"content":"terms","dynamic":false,"spread":false}],[{"content":"privacy-policy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/terms/privacy-policy.md","pathname":"/terms/privacy-policy","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[{"type":"external","src":"_astro/pages.BnZl33Nh.css"},{"type":"external","src":"_astro/BaseLayout.CL6vbAf4.css"},{"type":"external","src":"_astro/advanced.BpGthh3v.css"},{"type":"inline","content":".expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:0fr}.expanded:where(.astro-fj7gv3ii) .expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:1fr}svg:where(.astro-sqapcrnd){color:var(--sl-icon-color);font-size:var(--sl-icon-size,1em);width:1.5em;height:1.5em}.aside:where(.astro-mjo7ae67)>.aside-container:where(.astro-mjo7ae67){--tw-bg-opacity:.07;&.aside-tip{--primary:234 60% 60%}&.aside-caution{--primary:41 90% 50%}&.aside-danger{--primary:339 90% 60%}& .aside-content{&>:where(.astro-mjo7ae67):first-child{margin-top:0}&>:where(.astro-mjo7ae67):last-child{margin-bottom:0}& p a,& li a,& blockquote a,& td a,& a{color:hsl(var(--foreground) / var(--tw-text-opacity,1));text-decoration:underline;text-decoration-color:hsl(var(--muted-foreground) / .5);text-underline-offset:.125rem;border-radius:.25rem;margin:-.125rem -.25rem;padding:.125rem .25rem;transition:all .2s;&:hover{background-color:hsl(var(--foreground) / var(--tw-text-opacity,1));color:hsl(var(--background));text-decoration:none}}}}starlight-tabs:where(.astro-f45cruvs){display:block}.tablist-wrapper:where(.astro-f45cruvs){overflow-x:auto}:where(.astro-f45cruvs)[role=tablist]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));padding:0;list-style:none;display:flex}.tab:where(.astro-f45cruvs){margin-bottom:-2px}.tab:where(.astro-f45cruvs)>:where(.astro-f45cruvs)[role=tab]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));color:hsl(var(--foreground) / var(--tw-text-opacity,1));outline-offset:-.1875rem;overflow-wrap:initial;align-items:center;gap:.5rem;padding:.2rem 1.25rem;text-decoration:none;display:flex}.tab:where(.astro-f45cruvs) :where(.astro-f45cruvs)[role=tab][aria-selected=true]{color:hsl(var(--primary) / var(--tw-text-opacity,1));border-color:hsl(var(--primary) / var(--tw-text-opacity,1));font-weight:600}.tablist-wrapper:where(.astro-f45cruvs)~[role=tabpanel]{margin-top:1rem}.mdx-repl:where(.astro-rbi54dnn){background:linear-gradient(135deg, hsl(var(--primary) / .05) 0%, hsl(var(--muted) / .2) 100%)}.mdx-repl-container:where(.astro-rbi54dnn)>*{width:var(--width)}.mdx-repl-container:where(.astro-rbi54dnn)>:first-child{margin-top:0}.mdx-repl-container:where(.astro-rbi54dnn)>:last-child{margin-bottom:0}.mdx-repl:where(.astro-rbi54dnn) .astro-code{border-radius:0;margin:0}.mdx-repl:where(.astro-rbi54dnn) div[role=tabpanel]{margin-top:0}.sl-steps{--bullet-size:calc(1.75rem);--bullet-margin:.375rem;counter-reset:steps-counter var(--sl-steps-start,0);padding-inline-start:0!important;list-style:none!important}.sl-steps>li{counter-increment:steps-counter;padding-inline-start:calc(var(--bullet-size) + 1rem);min-height:calc(var(--bullet-size) + var(--bullet-margin));padding-bottom:1px;position:relative}.sl-steps>li+li{margin-top:0}.sl-steps>li:before{content:counter(steps-counter);top:0;width:var(--bullet-size);height:var(--bullet-size);line-height:var(--bullet-size);text-align:center;color:hsl(var(--foreground) / var(--tw-text-opacity,1));background-color:hsl(var(--primary-foreground) / var(--tw-bg-opacity,1));box-shadow:inset 0 0 0 1px hsl(var(--border) / var(--tw-border-opacity,1));border-radius:99rem;font-size:.8125rem;font-weight:600;position:absolute;inset-inline-start:0}.sl-steps>li:after{--guide-width:1px;content:\"\";top:calc(var(--bullet-size) + var(--bullet-margin));bottom:var(--bullet-margin);width:var(--guide-width);background-color:hsl(var(--border) / var(--tw-border-opacity,1));position:absolute;inset-inline-start:calc((var(--bullet-size) - var(--guide-width)) / 2)}.sl-steps>li>:first-child{--lh:calc(1.75em);--shift-y:calc(.5 * (var(--bullet-size) - var(--lh)));transform:translateY(var(--shift-y));margin-top:0;margin-bottom:var(--shift-y);color:hsl(var(--foreground) / var(--tw-text-opacity,1))}.sl-steps>li>:first-child:where(h1,h2,h3,h4,h5,h6){--lh:calc(1.2em)}\n"}],"routeData":{"route":"/terms/terms-and-conditions","isIndex":false,"type":"page","pattern":"^\\/terms\\/terms-and-conditions$","segments":[[{"content":"terms","dynamic":false,"spread":false}],[{"content":"terms-and-conditions","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/terms/terms-and-conditions.md","pathname":"/terms/terms-and-conditions","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.D6Rx8f8Z.js"}],"styles":[{"type":"external","src":"_astro/BaseLayout.CL6vbAf4.css"},{"type":"inline","content":".expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:0fr}.expanded:where(.astro-fj7gv3ii) .expand-conetent:where(.astro-fj7gv3ii){grid-template-rows:1fr}svg:where(.astro-sqapcrnd){color:var(--sl-icon-color);font-size:var(--sl-icon-size,1em);width:1.5em;height:1.5em}.aside:where(.astro-mjo7ae67)>.aside-container:where(.astro-mjo7ae67){--tw-bg-opacity:.07;&.aside-tip{--primary:234 60% 60%}&.aside-caution{--primary:41 90% 50%}&.aside-danger{--primary:339 90% 60%}& .aside-content{&>:where(.astro-mjo7ae67):first-child{margin-top:0}&>:where(.astro-mjo7ae67):last-child{margin-bottom:0}& p a,& li a,& blockquote a,& td a,& a{color:hsl(var(--foreground) / var(--tw-text-opacity,1));text-decoration:underline;text-decoration-color:hsl(var(--muted-foreground) / .5);text-underline-offset:.125rem;border-radius:.25rem;margin:-.125rem -.25rem;padding:.125rem .25rem;transition:all .2s;&:hover{background-color:hsl(var(--foreground) / var(--tw-text-opacity,1));color:hsl(var(--background));text-decoration:none}}}}starlight-tabs:where(.astro-f45cruvs){display:block}.tablist-wrapper:where(.astro-f45cruvs){overflow-x:auto}:where(.astro-f45cruvs)[role=tablist]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));padding:0;list-style:none;display:flex}.tab:where(.astro-f45cruvs){margin-bottom:-2px}.tab:where(.astro-f45cruvs)>:where(.astro-f45cruvs)[role=tab]{border-bottom:2px solid hsl(var(--border) / var(--tw-border-opacity,1));color:hsl(var(--foreground) / var(--tw-text-opacity,1));outline-offset:-.1875rem;overflow-wrap:initial;align-items:center;gap:.5rem;padding:.2rem 1.25rem;text-decoration:none;display:flex}.tab:where(.astro-f45cruvs) :where(.astro-f45cruvs)[role=tab][aria-selected=true]{color:hsl(var(--primary) / var(--tw-text-opacity,1));border-color:hsl(var(--primary) / var(--tw-text-opacity,1));font-weight:600}.tablist-wrapper:where(.astro-f45cruvs)~[role=tabpanel]{margin-top:1rem}.mdx-repl:where(.astro-rbi54dnn){background:linear-gradient(135deg, hsl(var(--primary) / .05) 0%, hsl(var(--muted) / .2) 100%)}.mdx-repl-container:where(.astro-rbi54dnn)>*{width:var(--width)}.mdx-repl-container:where(.astro-rbi54dnn)>:first-child{margin-top:0}.mdx-repl-container:where(.astro-rbi54dnn)>:last-child{margin-bottom:0}.mdx-repl:where(.astro-rbi54dnn) .astro-code{border-radius:0;margin:0}.mdx-repl:where(.astro-rbi54dnn) div[role=tabpanel]{margin-top:0}.sl-steps{--bullet-size:calc(1.75rem);--bullet-margin:.375rem;counter-reset:steps-counter var(--sl-steps-start,0);padding-inline-start:0!important;list-style:none!important}.sl-steps>li{counter-increment:steps-counter;padding-inline-start:calc(var(--bullet-size) + 1rem);min-height:calc(var(--bullet-size) + var(--bullet-margin));padding-bottom:1px;position:relative}.sl-steps>li+li{margin-top:0}.sl-steps>li:before{content:counter(steps-counter);top:0;width:var(--bullet-size);height:var(--bullet-size);line-height:var(--bullet-size);text-align:center;color:hsl(var(--foreground) / var(--tw-text-opacity,1));background-color:hsl(var(--primary-foreground) / var(--tw-bg-opacity,1));box-shadow:inset 0 0 0 1px hsl(var(--border) / var(--tw-border-opacity,1));border-radius:99rem;font-size:.8125rem;font-weight:600;position:absolute;inset-inline-start:0}.sl-steps>li:after{--guide-width:1px;content:\"\";top:calc(var(--bullet-size) + var(--bullet-margin));bottom:var(--bullet-margin);width:var(--guide-width);background-color:hsl(var(--border) / var(--tw-border-opacity,1));position:absolute;inset-inline-start:calc((var(--bullet-size) - var(--guide-width)) / 2)}.sl-steps>li>:first-child{--lh:calc(1.75em);--shift-y:calc(.5 * (var(--bullet-size) - var(--lh)));transform:translateY(var(--shift-y));margin-top:0;margin-bottom:var(--shift-y);color:hsl(var(--foreground) / var(--tw-text-opacity,1))}.sl-steps>li>:first-child:where(h1,h2,h3,h4,h5,h6){--lh:calc(1.2em)}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}}],"serverLike":true,"middlewareMode":"classic","site":"https://blog.rusin7.com/","base":"/","trailingSlash":"never","compressHTML":true,"componentMetadata":[["C:/Users/22790/astro-blog2/src/pages/article/[...id].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/en/article/[...id].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/archives/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/article/[category]/[...page].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/collection/[id].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/en/archives/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/en/article/[category]/[...page].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/en/collection/[id].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/en/tags/[tag]/[...page].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/tags/[tag]/[...page].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/content/blogs/deploy-lg-saver/index.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:\\Users\\22790\\astro-blog2\\.astro\\content-modules.mjs",{"propagation":"in-tree","containsHead":false}],["C:/Users/22790/astro-blog2/node_modules/.pnpm/astro@7.2.0_@astrojs+markdo_d30460ecf2a64a9cdb0ccff5894b897c/node_modules/astro/dist/content/runtime.js",{"propagation":"in-tree","containsHead":false}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["C:/Users/22790/astro-blog2/src/components/pages/PostPreview.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/22790/astro-blog2/src/components/pages/index.ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/22790/astro-blog2/src/components/pages/Hero.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/22790/astro-blog2/src/layouts/BlogPost.astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/article/[...id]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:pages",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:manifest",{"propagation":"in-tree","containsHead":false}],["C:/Users/22790/astro-blog2/node_modules/.pnpm/astro@7.2.0_@astrojs+markdo_d30460ecf2a64a9cdb0ccff5894b897c/node_modules/astro/dist/entrypoints/prerender.js",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/en/article/[...id]@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/22790/astro-blog2/src/layouts/ContentLayout.astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/archives/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/article/[category]/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/collection/[id]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/en/archives/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/en/article/[category]/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/en/collection/[id]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/en/tags/[tag]/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/tags/[tag]/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/22790/astro-blog2/src/utils/server.ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/22790/astro-blog2/src/components/BaseHead.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/22790/astro-blog2/src/layouts/BaseLayout.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/22790/astro-blog2/src/server.ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/22790/astro-blog2/src/components/basic/Header.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/22790/astro-blog2/src/components/basic/index.ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/22790/astro-blog2/src/content/blogs/mdx-components/index-en.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/22790/astro-blog2/src/content/blogs/rusin-note/index-en.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/22790/astro-blog2/src/content/blogs/writing-markdown-mdx/index-en.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/22790/astro-blog2/src/content/blogs/mdx-components/index.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/22790/astro-blog2/src/content/blogs/rusin-note/index.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/22790/astro-blog2/src/content/blogs/writing-markdown-mdx/index.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/22790/astro-blog2/src/pages/about/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/academic/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/en/about/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/en/academic/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/en/links/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/en/projects/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/links/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/projects/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/en/terms/copyright.md",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/en/terms/disclaimer.md",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/en/terms/privacy-policy.md",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/en/terms/terms-and-conditions.md",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/terms/copyright.md",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/terms/disclaimer.md",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/terms/privacy-policy.md",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/terms/terms-and-conditions.md",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/404.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/article/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/collection/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/en/article/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/en/collection/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/en/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/en/search/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/en/tags/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/en/terms/list.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/search/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/tags/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/pages/terms/list.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/22790/astro-blog2/src/layouts/CommonPage.astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/about/index@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/22790/astro-blog2/node_modules/.pnpm/astro@7.2.0_@astrojs+markdo_d30460ecf2a64a9cdb0ccff5894b897c/node_modules/astro/dist/core/app/entrypoints/virtual/prod.js",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:app",{"propagation":"in-tree","containsHead":false}],["C:/Users/22790/astro-blog2/node_modules/.pnpm/astro@7.2.0_@astrojs+markdo_d30460ecf2a64a9cdb0ccff5894b897c/node_modules/astro/dist/core/app/entrypoints/virtual/index.js",{"propagation":"in-tree","containsHead":false}],["C:/Users/22790/astro-blog2/node_modules/.pnpm/@astrojs+vercel@11.0.5_astr_143f72aa12410e208f1e2068a31016fa/node_modules/@astrojs/vercel/dist/serverless/entrypoint.js",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/academic/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/en/about/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/en/academic/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/en/links/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/en/projects/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/links/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/projects/index@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/22790/astro-blog2/src/layouts/IndividualPage.astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/en/terms/copyright@_@md",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/en/terms/disclaimer@_@md",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/en/terms/privacy-policy@_@md",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/en/terms/terms-and-conditions@_@md",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/terms/copyright@_@md",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/terms/disclaimer@_@md",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/terms/privacy-policy@_@md",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/terms/terms-and-conditions@_@md",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/collection/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/en/collection/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/en/search/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/search/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/404@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/article/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/en/article/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/en/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/en/tags/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/en/terms/list@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/tags/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/terms/list@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/22790/astro-blog2/src/components/home/BlogStats.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/22790/astro-blog2/src/pages/rss.xml.ts",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/rss.xml@_@ts",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"astro/entrypoints/prerender":"prerender-entry.B20gC1Ew.mjs","\u0000virtual:astro:page:src/pages/en/tags/[tag]/[...page]@_@astro":"chunks/_.._3C-8IVuN.mjs","\u0000virtual:astro:page:src/pages/en/article/[...id]@_@astro":"chunks/_.._CQ1RVkh1.mjs","\u0000virtual:astro:page:src/pages/article/[...id]@_@astro":"chunks/_.._Chzk4eZu.mjs","\u0000virtual:astro:page:src/pages/en/article/[category]/[...page]@_@astro":"chunks/_.._CsAKvSUt.mjs","\u0000virtual:astro:page:src/pages/tags/[tag]/[...page]@_@astro":"chunks/_.._D7ymanyD.mjs","\u0000virtual:astro:page:src/pages/article/[category]/[...page]@_@astro":"chunks/_.._DC03LQWw.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_C30TL34Q.mjs","\u0000virtual:astro:page:src/pages/en/collection/[id]@_@astro":"chunks/_id__hOw4zKKD.mjs","\u0000virtual:astro:page:src/pages/collection/[id]@_@astro":"chunks/_id__s_BR20DJ.mjs","\u0000noop-middleware":"virtual_astro_middleware.mjs","\u0000virtual:astro:get-image":"chunks/_virtual_astro_get-image_pxhBxc8G.mjs","\u0000virtual:astro:server-island-manifest":"chunks/_virtual_astro_server-island-manifest_C1Q2srgE.mjs","\u0000virtual:astro:session-driver":"chunks/_virtual_astro_session-driver_C-PI1Pas.mjs","C:/Users/22790/astro-blog2/src/assets/projects/byddl.webp":"chunks/byddl_BQTZvS0J.mjs","C:\\Users\\22790\\astro-blog2\\.astro\\content-assets.mjs":"chunks/content-assets_DXqEyLLP.mjs","C:\\Users\\22790\\astro-blog2\\.astro\\content-modules.mjs":"chunks/content-modules_CK6b47Da.mjs","C:/Users/22790/astro-blog2/src/content/blogs/deploy-lg-saver/index.mdx?astroPropagatedAssets":"chunks/deploy-lg-saver_BTX0yJ2U.mjs","C:/Users/22790/astro-blog2/src/content/blogs/deploy-lg-saver/index.mdx":"chunks/deploy-lg-saver_CeUK3hjc.mjs","C:/Users/22790/astro-blog2/src/content/blogs/mdx-components/index-en.mdx?astroPropagatedAssets":"chunks/index-en_zMPf14dr.mjs","C:/Users/22790/astro-blog2/src/content/blogs/rusin-note/index-en.mdx":"chunks/index-en_CicS4R7L.mjs","C:/Users/22790/astro-blog2/src/content/blogs/writing-markdown-mdx/index-en.mdx":"chunks/index-en_DX6l49z6.mjs","C:/Users/22790/astro-blog2/src/content/blogs/mdx-components/index-en.mdx":"chunks/index-en_FCi-S9Wa.mjs","C:/Users/22790/astro-blog2/src/content/blogs/rusin-note/index-en.mdx?astroPropagatedAssets":"chunks/index-en_DrDjOJmv.mjs","C:/Users/22790/astro-blog2/src/content/blogs/writing-markdown-mdx/index-en.mdx?astroPropagatedAssets":"chunks/index-en_CWbW-P5h.mjs","\u0000virtual:astro:page:src/pages/en/archives/index@_@astro":"chunks/index_BTzlXFRu.mjs","\u0000virtual:astro:page:src/pages/archives/index@_@astro":"chunks/index_DAYS0XDc.mjs","C:/Users/22790/astro-blog2/src/assets/projects/lumina.webp":"chunks/lumina_CWz_9pyk.mjs","C:/Users/22790/astro-blog2/src/content/blogs/mdx-components/index.mdx":"chunks/mdx-components_BIDKnqTj.mjs","C:/Users/22790/astro-blog2/src/content/blogs/mdx-components/index.mdx?astroPropagatedAssets":"chunks/mdx-components_D4CekUok.mjs","\u0000virtual:astro:actions/noop-entrypoint":"chunks/noop-entrypoint_Z3zFhrGC.mjs","C:/Users/22790/astro-blog2/src/content/blogs/rusin-note/index.mdx":"chunks/rusin-note_DVS4FiAI.mjs","C:/Users/22790/astro-blog2/src/content/blogs/rusin-note/index.mdx?astroPropagatedAssets":"chunks/rusin-note_Bl60vqi9.mjs","C:/Users/22790/astro-blog2/node_modules/.pnpm/astro@7.2.0_@astrojs+markdo_d30460ecf2a64a9cdb0ccff5894b897c/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BuLDlcmN.mjs","C:/Users/22790/astro-blog2/src/content/blogs/writing-markdown-mdx/index.mdx?astroPropagatedAssets":"chunks/writing-markdown-mdx_BUteVWkt.mjs","C:/Users/22790/astro-blog2/src/content/blogs/writing-markdown-mdx/index.mdx":"chunks/writing-markdown-mdx_DP_aRZhx.mjs","@astrojs/vercel/entrypoint":"entry.mjs","\u0000virtual:astro:page:src/pages/404@_@astro":"chunks/404_Cdot54yE.mjs","\u0000virtual:astro:page:src/pages/terms/copyright@_@md":"chunks/copyright_BO6WKJps.mjs","\u0000virtual:astro:page:src/pages/en/terms/copyright@_@md":"chunks/copyright_BYoXl4Ov.mjs","C:/Users/22790/astro-blog2/src/assets/tools/deepseek.svg?raw":"chunks/deepseek_DNlcsnkP.mjs","\u0000virtual:astro:page:src/pages/en/terms/disclaimer@_@md":"chunks/disclaimer_CSvP0jvV.mjs","\u0000virtual:astro:page:src/pages/terms/disclaimer@_@md":"chunks/disclaimer_DmnGhZuQ.mjs","C:/Users/22790/astro-blog2/src/assets/tools/edge.svg?raw":"chunks/edge_wahM4mwR.mjs","\u0000virtual:astro:page:node_modules/.pnpm/astro@7.2.0_@astrojs+markdo_d30460ecf2a64a9cdb0ccff5894b897c/node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_BcVrbtMI.mjs","\u0000virtual:astro:page:src/pages/en/search/index@_@astro":"chunks/index_B14H7aRj.mjs","\u0000virtual:astro:page:src/pages/projects/index@_@astro":"chunks/index_B3JKn535.mjs","\u0000virtual:astro:page:src/pages/collection/index@_@astro":"chunks/index_BPGZxuBz.mjs","\u0000virtual:astro:page:src/pages/en/article/index@_@astro":"chunks/index_BT35YZMw.mjs","\u0000virtual:astro:page:src/pages/tags/index@_@astro":"chunks/index_Bo0dY9x32.mjs","\u0000virtual:astro:page:src/pages/en/tags/index@_@astro":"chunks/index_Bsg0ZmVF.mjs","\u0000virtual:astro:page:src/pages/en/collection/index@_@astro":"chunks/index_CJN8Kios.mjs","\u0000virtual:astro:page:src/pages/academic/index@_@astro":"chunks/index_CWKpn2W7.mjs","\u0000virtual:astro:page:src/pages/search/index@_@astro":"chunks/index_CqKSXJzy2.mjs","\u0000virtual:astro:page:src/pages/index@_@astro":"chunks/index_D69oPKm6.mjs","\u0000virtual:astro:page:src/pages/en/links/index@_@astro":"chunks/index_DVJnUOcF.mjs","\u0000virtual:astro:page:src/pages/en/index@_@astro":"chunks/index_Db0fbwh_.mjs","\u0000virtual:astro:page:src/pages/en/academic/index@_@astro":"chunks/index_Dpu0sikG.mjs","\u0000virtual:astro:page:src/pages/en/about/index@_@astro":"chunks/index_DxPxMoQV.mjs","\u0000virtual:astro:page:src/pages/en/projects/index@_@astro":"chunks/index_DxYz7848.mjs","\u0000virtual:astro:page:src/pages/links/index@_@astro":"chunks/index_Ewv7eVK6.mjs","\u0000virtual:astro:page:src/pages/article/index@_@astro":"chunks/index_q4WWOwo7.mjs","\u0000virtual:astro:page:src/pages/about/index@_@astro":"chunks/index_rIBGxSe7.mjs","\u0000virtual:astro:page:src/pages/terms/list@_@astro":"chunks/list_VdvseTrL.mjs","\u0000virtual:astro:page:src/pages/en/terms/list@_@astro":"chunks/list_fEILwwXq.mjs","\u0000virtual:astro:page:src/pages/terms/privacy-policy@_@md":"chunks/privacy-policy_DzNwdtW0.mjs","\u0000virtual:astro:page:src/pages/en/terms/privacy-policy@_@md":"chunks/privacy-policy_OhvZ8J1Q.mjs","\u0000virtual:astro:page:src/pages/robots.txt@_@ts":"chunks/robots_Cu_Qu22X.mjs","\u0000virtual:astro:page:src/pages/rss.xml@_@ts":"chunks/rss_B0IO4yTG.mjs","\u0000virtual:astro:page:src/pages/terms/terms-and-conditions@_@md":"chunks/terms-and-conditions_D3q_1D6C.mjs","\u0000virtual:astro:page:src/pages/en/terms/terms-and-conditions@_@md":"chunks/terms-and-conditions_UhNJB9aN.mjs","C:/Users/22790/astro-blog2/src/assets/tools/ubuntu.svg?raw":"chunks/ubuntu_Rjq1jJuB.mjs","C:/Users/22790/astro-blog2/src/assets/tools/vscode.svg?raw":"chunks/vscode_D7V0Qlhx.mjs","C:/Users/22790/astro-blog2/src/components/about/AlgorithmShowcase.astro?astro&type=script&index=0&lang.ts":"_astro/AlgorithmShowcase.astro_astro_type_script_index_0_lang.LPC94wok.js","C:/Users/22790/astro-blog2/src/components/BaseHead.astro?astro&type=script&index=0&lang.ts":"_astro/BaseHead.astro_astro_type_script_index_0_lang.CGYzvQwh.js","C:/Users/22790/astro-blog2/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts":"_astro/BaseLayout.astro_astro_type_script_index_0_lang.05T84zgA.js","C:/Users/22790/astro-blog2/src/layouts/BaseLayout.astro?astro&type=script&index=1&lang.ts":"_astro/BaseLayout.astro_astro_type_script_index_1_lang.BVS-ra0A.js","C:/Users/22790/astro-blog2/src/layouts/BaseLayout.astro?astro&type=script&index=2&lang.ts":"_astro/BaseLayout.astro_astro_type_script_index_2_lang.ljs1vUAA.js","C:/Users/22790/astro-blog2/src/components/user/Collapse.astro?astro&type=script&index=0&lang.ts":"_astro/Collapse.astro_astro_type_script_index_0_lang.BgM39nS8.js","C:/Users/22790/astro-blog2/src/components/advanced/Comment.astro?astro&type=script&index=0&lang.ts":"_astro/Comment.astro_astro_type_script_index_0_lang.CvradaSO.js","C:/Users/22790/astro-blog2/src/components/pages/Copyright.astro?astro&type=script&index=0&lang.ts":"_astro/Copyright.astro_astro_type_script_index_0_lang.BR2Urdvy.js","C:/Users/22790/astro-blog2/src/components/basic/Footer.astro?astro&type=script&index=0&lang.ts":"_astro/Footer.astro_astro_type_script_index_0_lang.BrRHgNv_.js","C:/Users/22790/astro-blog2/src/components/advanced/GithubCard.astro?astro&type=script&index=0&lang.ts":"_astro/GithubCard.astro_astro_type_script_index_0_lang.DffQ540P.js","C:/Users/22790/astro-blog2/src/components/basic/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.C75B5-gw.js","C:/Users/22790/astro-blog2/src/components/pages/Hero.astro?astro&type=script&index=0&lang.ts":"_astro/Hero.astro_astro_type_script_index_0_lang.cOY7USLp.js","C:/Users/22790/astro-blog2/src/components/user/LanguageSwitch.astro?astro&type=script&index=0&lang.ts":"_astro/LanguageSwitch.astro_astro_type_script_index_0_lang.JkMsagxW.js","C:/Users/22790/astro-blog2/src/components/advanced/ManualTOC.astro?astro&type=script&index=0&lang.ts":"_astro/ManualTOC.astro_astro_type_script_index_0_lang.Dx1oLzce.js","C:/Users/22790/astro-blog2/src/components/pages/PFSearch.astro?astro&type=script&index=0&lang.ts":"_astro/PFSearch.astro_astro_type_script_index_0_lang.B73Cnnya.js","C:/Users/22790/astro-blog2/src/components/advanced/Quote.astro?astro&type=script&index=0&lang.ts":"_astro/Quote.astro_astro_type_script_index_0_lang.C1RIKiJo.js","C:/Users/22790/astro-blog2/src/components/pages/TOC.astro?astro&type=script&index=0&lang.ts":"_astro/TOC.astro_astro_type_script_index_0_lang.DmK7bHyP.js","C:/Users/22790/astro-blog2/src/components/user/Tabs.astro?astro&type=script&index=0&lang.ts":"_astro/Tabs.astro_astro_type_script_index_0_lang.BxXe_87b.js","C:/Users/22790/astro-blog2/src/components/basic/ThemeProvider.astro?astro&type=script&index=0&lang.ts":"_astro/ThemeProvider.astro_astro_type_script_index_0_lang.45C_6DAo.js","C:/Users/22790/astro-blog2/src/pages/links/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.Bwdlodak.js","C:/Users/22790/astro-blog2/src/pages/en/links/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.DdiignTz.js","astro:scripts/page.js":"_astro/page.D6Rx8f8Z.js","C:/Users/22790/astro-blog2/node_modules/.pnpm/@pagefind+default-ui@1.5.2/node_modules/@pagefind/default-ui/npm_dist/mjs/ui-core.mjs":"_astro/ui-core.CV4QbIfq.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/22790/astro-blog2/src/components/BaseHead.astro?astro&type=script&index=0&lang.ts","console.log(`%c Astro Theme Axi %c https://github.com/ruying-suixing/`,`color:#fff;background:linear-gradient(90deg,#448bff,#44e9ff);padding:5px 0;`,`color:#000;background:linear-gradient(90deg,#44e9ff,#ffffff);padding:5px 10px 5px 0px;`);"],["C:/Users/22790/astro-blog2/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts","document.addEventListener(`DOMContentLoaded`,()=>{document.addEventListener(`click`,e=>{let t=e.target.closest(`a[href^=\"#\"]`);if(!t||t.closest(`toc-heading`))return;let n=t.getAttribute(`href`);if(!n||n===`#`)return;let r=n.substring(1),i=document.getElementById(r);i&&(e.preventDefault(),history.pushState(null,``,n),i.scrollIntoView({behavior:`smooth`,block:`start`}))})});"],["C:/Users/22790/astro-blog2/src/layouts/BaseLayout.astro?astro&type=script&index=1&lang.ts","document.addEventListener(`DOMContentLoaded`,()=>{function e(e,t,n,r,i){let a=document.createElement(`div`);a.className=`click-particle color-${i}`;let o=Math.cos(n)*r,s=Math.sin(n)*r;a.style.setProperty(`--dx`,o+`px`),a.style.setProperty(`--dy`,s+`px`),a.style.left=e+`px`,a.style.top=t+`px`;let c=Math.random()*6+8;a.style.width=c+`px`,a.style.height=c+`px`,document.body.appendChild(a),setTimeout(()=>{a.parentNode&&a.parentNode.removeChild(a)},1100)}document.addEventListener(`click`,t=>{for(let n=0;n<10;n++){let r=Math.PI*2/10*n,i=18+Math.random()*8,a=n%10+1;setTimeout(()=>{e(t.clientX,t.clientY,r,i,a)},n*12)}for(let n=0;n<4;n++){let r=Math.random()*Math.PI*2,i=18+Math.random()*10,a=Math.floor(Math.random()*10)+1;setTimeout(()=>{e(t.clientX,t.clientY,r,i,a)},(10+n)*12)}})});"],["C:/Users/22790/astro-blog2/src/components/user/Collapse.astro?astro&type=script&index=0&lang.ts","var e=class extends HTMLElement{constructor(){super()}connectedCallback(){this.querySelector(`.expand-title`)?.addEventListener(`click`,()=>{this.classList.toggle(`expanded`)})}};customElements.define(`collapse-component`,e);"],["C:/Users/22790/astro-blog2/src/components/basic/Footer.astro?astro&type=script&index=0&lang.ts","var e=document.getElementById(`icp-registration`);if(e){let t=e.dataset.website;if(t)try{let n=new URL(t.includes(`://`)?t:`https://${t}`).hostname;window.location.hostname===n&&e.classList.remove(`hidden`)}catch{window.location.hostname===t&&e.classList.remove(`hidden`)}}"],["C:/Users/22790/astro-blog2/src/components/advanced/GithubCard.astro?astro&type=script&index=0&lang.ts","var e=class extends HTMLElement{async fetchGithub(e){try{let t=await fetch(`https://api.github.com/repos/${e}`,{referrerPolicy:`no-referrer`});if(!t.ok)throw Error(`HTTP error! status: ${t.status}`);return await t.json()}catch(e){return console.error(`Failed to fetch Github data:`,e),null}}numberFormat(e){return Intl.NumberFormat(`en-us`,{notation:`compact`,maximumFractionDigits:1}).format(e)}async connectedCallback(){if(this.dataset.repo)try{let e=await this.fetchGithub(this.dataset.repo);if(!e)return;this.querySelector(`#gh-stars`).textContent=this.numberFormat(e.stargazers_count),this.querySelector(`#gh-forks`).textContent=this.numberFormat(e.forks),this.querySelector(`#gh-language`).textContent=e.language||`N/A`,this.querySelector(`#gh-description`).textContent=typeof e.description==`string`?e.description.replace(/:[a-zA-Z0-9_]+:/g,``):`Description not set`;let t=this.querySelector(`#gh-license`);e.license?.spdx_id?t.textContent=e.license.spdx_id:t.classList.add(`no-license`);let n=this.querySelector(`#gh-avatar`);n&&(n.style.backgroundImage=`url(${e.owner.avatar_url})`,n.style.backgroundColor=`transparent`),this.classList.remove(`loading`)}catch(e){console.error(`Error setting Github data:`,e),this.querySelector(`#gh-description`).textContent=`Failed to fetch data`}}};customElements.define(`github-card`,e);"],["C:/Users/22790/astro-blog2/src/components/pages/Hero.astro?astro&type=script&index=0&lang.ts","var e=window.innerHeight,t=e/9,n=e*2/9,r=e*3/9,i=document.getElementById(`blurImage`);i&&window.addEventListener(`scroll`,()=>{let e=window.scrollY;e>=r?i.style.opacity=`0.15`:e>=n?i.style.opacity=`0.3`:e>=t&&(i.style.opacity=`0.45`)});"],["C:/Users/22790/astro-blog2/src/components/user/LanguageSwitch.astro?astro&type=script&index=0&lang.ts","document.addEventListener(`DOMContentLoaded`,()=>{let e=document.getElementById(`language-switch-btn`);e&&e.addEventListener(`click`,()=>{let t=e.dataset.targetUrl;t&&(window.location.href=t)})});"],["C:/Users/22790/astro-blog2/src/components/advanced/ManualTOC.astro?astro&type=script&index=0&lang.ts","var e=class extends HTMLElement{link=``;constructor(){super(),this.link=window.location.pathname}connectedCallback(){this.querySelectorAll(`a`).forEach(e=>{e.getAttribute(`href`)===this.link&&e.parentElement?.classList.add(`docs-hl`)})}};customElements.define(`docs-toc`,e);"],["C:/Users/22790/astro-blog2/src/components/pages/TOC.astro?astro&type=script&index=0&lang.ts","var e=class extends HTMLElement{headings=[];tocLinks=[];headingProgress={};constructor(){super(),this.headings=Array.from(document.querySelectorAll(`article h2, article h3, article h4, article h5, article h6`)),this.tocLinks=Array.from(this.querySelectorAll(`a[href^=\"#\"]`)).map(e=>({element:e,progressBar:e.previousElementSibling,slug:(e.getAttribute(`href`)||``).substring(1)}))}updatePositionAndStyle=()=>{let e=window.innerHeight,t=document.querySelector(`#content`),n=t?.getBoundingClientRect().top+window.scrollY||0,r=(t?.offsetHeight||0)+n;this.headings.forEach((t,n)=>{let i=t.getBoundingClientRect().top+window.scrollY,a=this.headings[n+1]?this.headings[n+1].getBoundingClientRect().top+window.scrollY:r,o=[i-window.scrollY,a-window.scrollY-t.offsetHeight],s=(e-o[0])/(o[1]-o[0]);this.headingProgress[t.id]={inView:o[0]<e&&o[1]>0,progress:Math.max(0,Math.min(1,s))}}),this.tocLinks.forEach(({element:e,progressBar:t,slug:n},r)=>{let{inView:i,progress:a}=this.headingProgress[n];this.headingProgress[n]&&(e.classList.toggle(`highlight`,i),e.classList.toggle(`highlight-bg-translucent`,i),e.classList.toggle(`rounded-t-2xl`,i&&(r==0||!this.headingProgress[this.tocLinks[r-1]?.slug].inView)),e.classList.toggle(`rounded-b-2xl`,i&&(r==this.tocLinks.length-1||!this.headingProgress[this.tocLinks[r+1]?.slug].inView)),t.classList.toggle(`readed`,!i&&a==1),t.classList.toggle(`highlight-bg`,i),t.style.setProperty(`height`,`${a*90}%`))})};connectedCallback(){this.tocLinks.forEach(e=>{e.element.addEventListener(`click`,t=>{t.preventDefault();let n=this.headings.find(t=>t.id===e.slug);n?(history.pushState(null,n.textContent||``,e.element.getAttribute(`href`)),n.scrollIntoView({behavior:`smooth`})):console.warn(`No heading found for slug: ${e.slug}`)})}),setInterval(this.updatePositionAndStyle,100),window.addEventListener(`scroll`,this.updatePositionAndStyle)}};customElements.define(`toc-heading`,e);"],["C:/Users/22790/astro-blog2/src/components/user/Tabs.astro?astro&type=script&index=0&lang.ts","var e=class e extends HTMLElement{static#e=new Map;tabs;panels;#t;#n=`starlight-synced-tabs__`;constructor(){super();let t=this.querySelector(`[role=\"tablist\"]`);if(this.tabs=[...t.querySelectorAll(`[role=\"tab\"]`)],this.panels=[...this.querySelectorAll(`:scope > [role=\"tabpanel\"]`)],this.#t=this.dataset.syncKey,this.#t){let t=e.#e.get(this.#t)??[];t.push(this),e.#e.set(this.#t,t)}this.tabs.forEach((e,n)=>{e.addEventListener(`click`,e=>{e.preventDefault();let r=t.querySelector(`[aria-selected=\"true\"]`);e.currentTarget!==r&&this.switchTab(e.currentTarget,n)}),e.addEventListener(`keydown`,e=>{let t=this.tabs.indexOf(e.currentTarget),n=e.key===`ArrowLeft`?t-1:e.key===`ArrowRight`?t+1:e.key===`Home`?0:e.key===`End`?this.tabs.length-1:null;n!==null&&this.tabs[n]&&(e.preventDefault(),this.switchTab(this.tabs[n],n))})})}switchTab(t,n,r=!0){if(!t)return;let i=r?this.getBoundingClientRect().top:0;this.tabs.forEach(e=>{e.setAttribute(`aria-selected`,`false`),e.setAttribute(`tabindex`,`-1`)}),this.panels.forEach(e=>{e.hidden=!0});let a=this.panels[n];a&&(a.hidden=!1),t.removeAttribute(`tabindex`),t.setAttribute(`aria-selected`,`true`),r&&(t.focus(),e.#i(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-i)}))}#r(e){!this.#t||typeof localStorage>`u`||localStorage.setItem(this.#n+this.#t,e)}static#i(t,n){let r=t.#t,i=e.#a(n);if(!r||!i)return;let a=e.#e.get(r);if(a){for(let n of a){if(n===t)continue;let r=n.tabs.findIndex(t=>e.#a(t)===i);r!==-1&&n.switchTab(n.tabs[r],r,!1)}t.#r(i)}}static#a(e){return e.textContent?.trim()}};customElements.define(`starlight-tabs`,e);"]],"assets":["/cv.pdf","/links.json","/avatar/avatar.png","/fonts/JetBrainsMono-Bold.woff2","/fonts/JetBrainsMono-Italic.woff2","/fonts/JetBrainsMono-Regular.woff2","/icons/code.svg","/icons/heart-item.svg","/scripts/pretty-feed-v3.xsl","/images/social-card.webp","/images/wormhole.png","/favicon/favicon-256x256.png","/favicon/favicon.ico","/favicon/site.webmanifest","/_astro/AlgorithmShowcase.astro_astro_type_script_index_0_lang.LPC94wok.js","/_astro/BaseLayout.astro_astro_type_script_index_2_lang.ljs1vUAA.js","/_astro/Comment.astro_astro_type_script_index_0_lang.CvradaSO.js","/_astro/Copyright.astro_astro_type_script_index_0_lang.BR2Urdvy.js","/_astro/friendCircle.BgQnX1MX.js","/_astro/friendCircle.CidcJVPp.css","/_astro/Header.astro_astro_type_script_index_0_lang.C75B5-gw.js","/_astro/index.astro_astro_type_script_index_0_lang.Bwdlodak.js","/_astro/index.astro_astro_type_script_index_0_lang.DdiignTz.js","/_astro/page.D6Rx8f8Z.js","/_astro/PFSearch.astro_astro_type_script_index_0_lang.B73Cnnya.js","/_astro/Quote.astro_astro_type_script_index_0_lang.C1RIKiJo.js","/_astro/site.config.DqzGXCet.js","/_astro/theme.Ln-BOyz1.js","/_astro/ThemeProvider.astro_astro_type_script_index_0_lang.45C_6DAo.js","/_astro/toast.D_jT52AB.js","/_astro/ui-core.CV4QbIfq.js","/_astro/utils.UOItpZGt.js","/_astro/byddl.BAQQ5kP4.webp","/_astro/lumina.sdVIR0xs.webp","/_astro/BaseLayout.CsBEh4Lt.css","/_astro/BlogPost.C6NekUA5.css","/_astro/KaTeX_AMS-Regular.BQhdFMY1.woff2","/_astro/KaTeX_AMS-Regular.DMm9YOAa.woff","/_astro/KaTeX_AMS-Regular.DRggAlZN.ttf","/_astro/KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2","/_astro/KaTeX_Caligraphic-Bold.BEiXGLvX.woff","/_astro/KaTeX_Caligraphic-Bold.ATXxdsX0.ttf","/_astro/KaTeX_Caligraphic-Regular.Di6jR-x-.woff2","/_astro/KaTeX_Caligraphic-Regular.CTRA-rTL.woff","/_astro/KaTeX_Caligraphic-Regular.wX97UBjC.ttf","/_astro/KaTeX_Fraktur-Bold.CL6g_b3V.woff2","/_astro/KaTeX_Fraktur-Bold.BsDP51OF.woff","/_astro/KaTeX_Fraktur-Bold.BdnERNNW.ttf","/_astro/KaTeX_Fraktur-Regular.CTYiF6lA.woff2","/_astro/KaTeX_Fraktur-Regular.Dxdc4cR9.woff","/_astro/KaTeX_Fraktur-Regular.CB_wures.ttf","/_astro/KaTeX_Main-Bold.Cx986IdX.woff2","/_astro/KaTeX_Main-Bold.Jm3AIy58.woff","/_astro/KaTeX_Main-Bold.waoOVXN0.ttf","/_astro/KaTeX_Main-BoldItalic.DxDJ3AOS.woff2","/_astro/KaTeX_Main-BoldItalic.SpSLRI95.woff","/_astro/KaTeX_Main-BoldItalic.DzxPMmG6.ttf","/_astro/KaTeX_Main-Italic.NWA7e6Wa.woff2","/_astro/KaTeX_Main-Italic.BMLOBm91.woff","/_astro/KaTeX_Main-Italic.3WenGoN9.ttf","/_astro/KaTeX_Main-Regular.B22Nviop.woff2","/_astro/KaTeX_Main-Regular.Dr94JaBh.woff","/_astro/KaTeX_Main-Regular.ypZvNtVU.ttf","/_astro/KaTeX_Math-BoldItalic.CZnvNsCZ.woff2","/_astro/KaTeX_Math-BoldItalic.iY-2wyZ7.woff","/_astro/KaTeX_Math-BoldItalic.B3XSjfu4.ttf","/_astro/KaTeX_Math-Italic.t53AETM-.woff2","/_astro/KaTeX_Math-Italic.DA0__PXp.woff","/_astro/KaTeX_Math-Italic.flOr_0UB.ttf","/_astro/KaTeX_SansSerif-Bold.D1sUS0GD.woff2","/_astro/KaTeX_SansSerif-Bold.DbIhKOiC.woff","/_astro/KaTeX_SansSerif-Bold.CFMepnvq.ttf","/_astro/KaTeX_SansSerif-Italic.C3H0VqGB.woff2","/_astro/KaTeX_SansSerif-Italic.DN2j7dab.woff","/_astro/KaTeX_SansSerif-Italic.YYjJ1zSn.ttf","/_astro/KaTeX_SansSerif-Regular.DDBCnlJ7.woff2","/_astro/KaTeX_SansSerif-Regular.CS6fqUqJ.woff","/_astro/KaTeX_SansSerif-Regular.BNo7hRIc.ttf","/_astro/KaTeX_Script-Regular.D3wIWfF6.woff2","/_astro/KaTeX_Script-Regular.D5yQViql.woff","/_astro/KaTeX_Script-Regular.C5JkGWo-.ttf","/_astro/KaTeX_Size1-Regular.mCD8mA8B.woff2","/_astro/KaTeX_Size1-Regular.C195tn64.woff","/_astro/KaTeX_Size1-Regular.Dbsnue_I.ttf","/_astro/KaTeX_Size2-Regular.Dy4dx90m.woff2","/_astro/KaTeX_Size2-Regular.oD1tc_U0.woff","/_astro/KaTeX_Size2-Regular.B7gKUWhC.ttf","/_astro/KaTeX_Size3-Regular.CTq5MqoE.woff","/_astro/KaTeX_Size3-Regular.DgpXs0kz.ttf","/_astro/KaTeX_Size4-Regular.Dl5lxZxV.woff2","/_astro/KaTeX_Size4-Regular.BF-4gkZK.woff","/_astro/KaTeX_Size4-Regular.DWFBv043.ttf","/_astro/KaTeX_Typewriter-Regular.CO6r4hn1.woff2","/_astro/KaTeX_Typewriter-Regular.C0xS9mPB.woff","/_astro/KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf","/_astro/advanced.CRVqGZOu.css","/_astro/wechat-qrcode.C4Pzl1gn.jpg","/_astro/avatar.d5a-LzVb.png","/_astro/alipay-qrcode.DVf925Hm.jpg","/_astro/BaseLayout.CL6vbAf4.css","/_astro/advanced.BpGthh3v.css","/_astro/pages.BnZl33Nh.css","/_astro/page.D6Rx8f8Z.js","/archives/index.html","/en/archives/index.html"],"i18n":{"fallbackType":"redirect","strategy":"pathname-prefix-other-locales","locales":["zh","en"],"defaultLocale":"zh","domainLookupTable":{}},"buildFormat":"directory","checkOrigin":true,"actionBodySizeLimit":1048576,"serverIslandBodySizeLimit":1048576,"allowedDomains":[],"key":"D61n49EwW+I072MmgY+4fMihrxOMNPBT7IeykVdpOWY=","image":{},"devToolbar":{"enabled":false,"debugInfoOutput":""},"logLevel":"info","shouldInjectCspMetaTags":false});
var manifestRoutes = _manifest.routes;
var manifest = Object.assign(_manifest, {
	renderers,
	actions: () => import("./chunks/noop-entrypoint_Z3zFhrGC.mjs"),
	middleware: () => import("./virtual_astro_middleware.mjs"),
	sessionDriver: () => import("./chunks/_virtual_astro_session-driver_C-PI1Pas.mjs"),
	serverIslandMappings: () => import("./chunks/_virtual_astro_server-island-manifest_C1Q2srgE.mjs"),
	routes: manifestRoutes,
	pageMap
});
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdo_d30460ecf2a64a9cdb0ccff5894b897c/node_modules/astro/dist/core/app/entrypoints/virtual/prod.js
var createApp$1 = ({ streaming } = {}) => {
	const app = new App(manifest, streaming);
	app.setFetchHandler(_virtual_astro_fetchable_default);
	return app;
};
//#endregion
//#region node_modules/.pnpm/astro@7.2.0_@astrojs+markdo_d30460ecf2a64a9cdb0ccff5894b897c/node_modules/astro/dist/core/app/entrypoints/virtual/index.js
var createApp = createApp$1;
//#endregion
//#region node_modules/.pnpm/@astrojs+internal-helpers@0.10.2/node_modules/@astrojs/internal-helpers/dist/request.js
function getFirstForwardedValue(multiValueHeader) {
	return multiValueHeader?.toString()?.split(",").map((e) => e.trim())?.[0];
}
var IP_RE = /^[0-9a-fA-F.:]{1,45}$/;
function isValidIpAddress(value) {
	return IP_RE.test(value);
}
function getValidatedIpFromHeader(headerValue) {
	const raw = getFirstForwardedValue(headerValue);
	if (raw && isValidIpAddress(raw)) return raw;
}
function getClientIpAddress(request) {
	return getValidatedIpFromHeader(request.headers.get("x-forwarded-for"));
}
var app = createApp();
var entrypoint_default = { async fetch(request) {
	const url = new URL(request.url);
	const hasValidMiddlewareSecret = request.headers.get(ASTRO_MIDDLEWARE_SECRET_HEADER) === middlewareSecret;
	let realPath = void 0;
	if (hasValidMiddlewareSecret) realPath = request.headers.get(ASTRO_PATH_HEADER);
	else if (url.searchParams.get("x_astro_path_token") === "571b2178-8893-4b93-a441-0e7dab3acc9d") realPath = url.searchParams.get(ASTRO_PATH_PARAM);
	if (typeof realPath === "string") {
		url.pathname = realPath;
		url.searchParams.delete(ASTRO_PATH_PARAM);
		url.searchParams.delete(ASTRO_PATH_TOKEN_PARAM);
		request = new Request(url.toString(), {
			method: request.method,
			headers: request.headers,
			...request.body ? {
				body: request.body,
				duplex: "half"
			} : {}
		});
	}
	const routeData = app.match(request);
	let locals = {};
	const astroLocalsHeader = request.headers.get(ASTRO_LOCALS_HEADER);
	if (astroLocalsHeader) {
		if (!hasValidMiddlewareSecret) return new Response("Forbidden", { status: 403 });
		locals = JSON.parse(astroLocalsHeader);
	}
	if (hasValidMiddlewareSecret) request.headers.delete(ASTRO_MIDDLEWARE_SECRET_HEADER);
	const response = await app.render(request, {
		routeData,
		clientAddress: getClientIpAddress(request),
		locals
	});
	if (app.setCookieHeaders) for (const setCookieHeader of app.setCookieHeaders(response)) response.headers.append("Set-Cookie", setCookieHeader);
	return response;
} };
//#endregion
export { entrypoint_default as default };
