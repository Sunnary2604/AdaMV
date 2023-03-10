!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("vega"), require("vega-lite")) : "function" == typeof define && define.amd ? define(["vega", "vega-lite"], t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).vegaEmbed = t(e.vega, e.vegaLite)
}(this, (function (e, t) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = Object.create(null);
        return e && Object.keys(e).forEach((function (r) {
            if ("default" !== r) {
                var n = Object.getOwnPropertyDescriptor(e, r);
                Object.defineProperty(t, r, n.get ? n : {
                    enumerable: !0, get: function () {
                        return e[r]
                    }
                })
            }
        })), t.default = e, Object.freeze(t)
    }

    var n = r(e), o = r(t), i = function () {
        return (i = Object.assign || function (e) {
            for (var t, r = 1, n = arguments.length; r < n; r++) for (var o in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e
        }).apply(this, arguments)
    };

    function a(e, t, r, n) {
        return new (r || (r = Promise))((function (o, i) {
            function a(e) {
                try {
                    l(n.next(e))
                } catch (e) {
                    i(e)
                }
            }

            function s(e) {
                try {
                    l(n.throw(e))
                } catch (e) {
                    i(e)
                }
            }

            function l(e) {
                var t;
                e.done ? o(e.value) : (t = e.value, t instanceof r ? t : new r((function (e) {
                    e(t)
                }))).then(a, s)
            }

            l((n = n.apply(e, t || [])).next())
        }))
    }

    function s(e, t) {
        var r, n, o, i, a = {
            label: 0, sent: function () {
                if (1 & o[0]) throw o[1];
                return o[1]
            }, trys: [], ops: []
        };
        return i = {
            next: s(0),
            throw: s(1),
            return: s(2)
        }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
            return this
        }), i;

        function s(i) {
            return function (s) {
                return function (i) {
                    if (r) throw new TypeError("Generator is already executing.");
                    for (; a;) try {
                        if (r = 1, n && (o = 2 & i[0] ? n.return : i[0] ? n.throw || ((o = n.return) && o.call(n), 0) : n.next) && !(o = o.call(n, i[1])).done) return o;
                        switch (n = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                            case 0:
                            case 1:
                                o = i;
                                break;
                            case 4:
                                return a.label++, {value: i[1], done: !1};
                            case 5:
                                a.label++, n = i[1], i = [0];
                                continue;
                            case 7:
                                i = a.ops.pop(), a.trys.pop();
                                continue;
                            default:
                                if (!(o = a.trys, (o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                    a = 0;
                                    continue
                                }
                                if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                    a.label = i[1];
                                    break
                                }
                                if (6 === i[0] && a.label < o[1]) {
                                    a.label = o[1], o = i;
                                    break
                                }
                                if (o && a.label < o[2]) {
                                    a.label = o[2], a.ops.push(i);
                                    break
                                }
                                o[2] && a.ops.pop(), a.trys.pop();
                                continue
                        }
                        i = t.call(e, a)
                    } catch (e) {
                        i = [6, e], n = 0
                    } finally {
                        r = o = 0
                    }
                    if (5 & i[0]) throw i[1];
                    return {value: i[0] ? i[1] : void 0, done: !0}
                }([i, s])
            }
        }
    }

    /*!
   * https://github.com/Starcounter-Jack/JSON-Patch
   * (c) 2017 Joachim Wester
   * MIT license
   */
    var l, c = (l = function (e, t) {
        return (l = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
            e.__proto__ = t
        } || function (e, t) {
            for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
        })(e, t)
    }, function (e, t) {
        function r() {
            this.constructor = e
        }

        l(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
    }), p = Object.prototype.hasOwnProperty;

    function d(e, t) {
        return p.call(e, t)
    }

    function u(e) {
        if (Array.isArray(e)) {
            for (var t = new Array(e.length), r = 0; r < t.length; r++) t[r] = "" + r;
            return t
        }
        if (Object.keys) return Object.keys(e);
        t = [];
        for (var n in e) d(e, n) && t.push(n);
        return t
    }

    function f(e) {
        switch (typeof e) {
            case"object":
                return JSON.parse(JSON.stringify(e));
            case"undefined":
                return null;
            default:
                return e
        }
    }

    function h(e) {
        for (var t, r = 0, n = e.length; r < n;) {
            if (!((t = e.charCodeAt(r)) >= 48 && t <= 57)) return !1;
            r++
        }
        return !0
    }

    function v(e) {
        return -1 === e.indexOf("/") && -1 === e.indexOf("~") ? e : e.replace(/~/g, "~0").replace(/\//g, "~1")
    }

    function g(e) {
        return e.replace(/~1/g, "/").replace(/~0/g, "~")
    }

    function m(e, t) {
        var r = [e];
        for (var n in t) {
            var o = "object" == typeof t[n] ? JSON.stringify(t[n], null, 2) : t[n];
            void 0 !== o && r.push(n + ": " + o)
        }
        return r.join("\n")
    }

    var E = function (e) {
        function t(t, r, n, o, i) {
            var a = this.constructor, s = e.call(this, m(t, {name: r, index: n, operation: o, tree: i})) || this;
            return s.name = r, s.index = n, s.operation = o, s.tree = i, Object.setPrototypeOf(s, a.prototype), s.message = m(t, {
                name: r,
                index: n,
                operation: o,
                tree: i
            }), s
        }

        return c(t, e), t
    }(Error), b = E, y = f, w = {
        add: function (e, t, r) {
            return e[t] = this.value, {newDocument: r}
        }, remove: function (e, t, r) {
            var n = e[t];
            return delete e[t], {newDocument: r, removed: n}
        }, replace: function (e, t, r) {
            var n = e[t];
            return e[t] = this.value, {newDocument: r, removed: n}
        }, move: function (e, t, r) {
            var n = I(r, this.path);
            n && (n = f(n));
            var o = A(r, {op: "remove", path: this.from}).removed;
            return A(r, {op: "add", path: this.path, value: o}), {newDocument: r, removed: n}
        }, copy: function (e, t, r) {
            var n = I(r, this.from);
            return A(r, {op: "add", path: this.path, value: f(n)}), {newDocument: r}
        }, test: function (e, t, r) {
            return {newDocument: r, test: L(e[t], this.value)}
        }, _get: function (e, t, r) {
            return this.value = e[t], {newDocument: r}
        }
    }, O = {
        add: function (e, t, r) {
            return h(t) ? e.splice(t, 0, this.value) : e[t] = this.value, {newDocument: r, index: t}
        }, remove: function (e, t, r) {
            return {newDocument: r, removed: e.splice(t, 1)[0]}
        }, replace: function (e, t, r) {
            var n = e[t];
            return e[t] = this.value, {newDocument: r, removed: n}
        }, move: w.move, copy: w.copy, test: w.test, _get: w._get
    };

    function I(e, t) {
        if ("" == t) return e;
        var r = {op: "_get", path: t};
        return A(e, r), r.value
    }

    function A(e, t, r, n, o, i) {
        if (void 0 === r && (r = !1), void 0 === n && (n = !0), void 0 === o && (o = !0), void 0 === i && (i = 0), r && ("function" == typeof r ? r(t, 0, e, t.path) : N(t, 0)), "" === t.path) {
            var a = {newDocument: e};
            if ("add" === t.op) return a.newDocument = t.value, a;
            if ("replace" === t.op) return a.newDocument = t.value, a.removed = e, a;
            if ("move" === t.op || "copy" === t.op) return a.newDocument = I(e, t.from), "move" === t.op && (a.removed = e), a;
            if ("test" === t.op) {
                if (a.test = L(e, t.value), !1 === a.test) throw new b("Test operation failed", "TEST_OPERATION_FAILED", i, t, e);
                return a.newDocument = e, a
            }
            if ("remove" === t.op) return a.removed = e, a.newDocument = null, a;
            if ("_get" === t.op) return t.value = e, a;
            if (r) throw new b("Operation `op` property is not one of operations defined in RFC-6902", "OPERATION_OP_INVALID", i, t, e);
            return a
        }
        n || (e = f(e));
        var s = (t.path || "").split("/"), l = e, c = 1, p = s.length, d = void 0, u = void 0, v = void 0;
        for (v = "function" == typeof r ? r : N; ;) {
            if (u = s[c], o && "__proto__" == u) throw new TypeError("JSON-Patch: modifying `__proto__` prop is banned for security reasons, if this was on purpose, please set `banPrototypeModifications` flag false and pass it to this function. More info in fast-json-patch README");
            if (r && void 0 === d && (void 0 === l[u] ? d = s.slice(0, c).join("/") : c == p - 1 && (d = t.path), void 0 !== d && v(t, 0, e, d)), c++, Array.isArray(l)) {
                if ("-" === u) u = l.length; else {
                    if (r && !h(u)) throw new b("Expected an unsigned base-10 integer value, making the new referenced value the array element with the zero-based index", "OPERATION_PATH_ILLEGAL_ARRAY_INDEX", i, t, e);
                    h(u) && (u = ~~u)
                }
                if (c >= p) {
                    if (r && "add" === t.op && u > l.length) throw new b("The specified index MUST NOT be greater than the number of elements in the array", "OPERATION_VALUE_OUT_OF_BOUNDS", i, t, e);
                    if (!1 === (a = O[t.op].call(t, l, u, e)).test) throw new b("Test operation failed", "TEST_OPERATION_FAILED", i, t, e);
                    return a
                }
            } else if (u && -1 != u.indexOf("~") && (u = g(u)), c >= p) {
                if (!1 === (a = w[t.op].call(t, l, u, e)).test) throw new b("Test operation failed", "TEST_OPERATION_FAILED", i, t, e);
                return a
            }
            l = l[u]
        }
    }

    function R(e, t, r, n, o) {
        if (void 0 === n && (n = !0), void 0 === o && (o = !0), r && !Array.isArray(t)) throw new b("Patch sequence must be an array", "SEQUENCE_NOT_AN_ARRAY");
        n || (e = f(e));
        for (var i = new Array(t.length), a = 0, s = t.length; a < s; a++) i[a] = A(e, t[a], r, !0, o, a), e = i[a].newDocument;
        return i.newDocument = e, i
    }

    function N(e, t, r, n) {
        if ("object" != typeof e || null === e || Array.isArray(e)) throw new b("Operation is not an object", "OPERATION_NOT_AN_OBJECT", t, e, r);
        if (!w[e.op]) throw new b("Operation `op` property is not one of operations defined in RFC-6902", "OPERATION_OP_INVALID", t, e, r);
        if ("string" != typeof e.path) throw new b("Operation `path` property is not a string", "OPERATION_PATH_INVALID", t, e, r);
        if (0 !== e.path.indexOf("/") && e.path.length > 0) throw new b('Operation `path` property must start with "/"', "OPERATION_PATH_INVALID", t, e, r);
        if (("move" === e.op || "copy" === e.op) && "string" != typeof e.from) throw new b("Operation `from` property is not present (applicable in `move` and `copy` operations)", "OPERATION_FROM_REQUIRED", t, e, r);
        if (("add" === e.op || "replace" === e.op || "test" === e.op) && void 0 === e.value) throw new b("Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)", "OPERATION_VALUE_REQUIRED", t, e, r);
        if (("add" === e.op || "replace" === e.op || "test" === e.op) && function e(t) {
            if (void 0 === t) return !0;
            if (t) if (Array.isArray(t)) {
                for (var r = 0, n = t.length; r < n; r++) if (e(t[r])) return !0
            } else if ("object" == typeof t) {
                var o = u(t), i = o.length;
                for (r = 0; r < i; r++) if (e(t[o[r]])) return !0
            }
            return !1
        }(e.value)) throw new b("Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)", "OPERATION_VALUE_CANNOT_CONTAIN_UNDEFINED", t, e, r);
        if (r) if ("add" == e.op) {
            var o = e.path.split("/").length, i = n.split("/").length;
            if (o !== i + 1 && o !== i) throw new b("Cannot perform an `add` operation at the desired path", "OPERATION_PATH_CANNOT_ADD", t, e, r)
        } else if ("replace" === e.op || "remove" === e.op || "_get" === e.op) {
            if (e.path !== n) throw new b("Cannot perform the operation at a path that does not exist", "OPERATION_PATH_UNRESOLVABLE", t, e, r)
        } else if ("move" === e.op || "copy" === e.op) {
            var a = T([{op: "_get", path: e.from, value: void 0}], r);
            if (a && "OPERATION_PATH_UNRESOLVABLE" === a.name) throw new b("Cannot perform the operation from a path that does not exist", "OPERATION_FROM_UNRESOLVABLE", t, e, r)
        }
    }

    function T(e, t, r) {
        try {
            if (!Array.isArray(e)) throw new b("Patch sequence must be an array", "SEQUENCE_NOT_AN_ARRAY");
            if (t) R(f(t), f(e), r || !0); else {
                r = r || N;
                for (var n = 0; n < e.length; n++) r(e[n], n, t, void 0)
            }
        } catch (e) {
            if (e instanceof b) return e;
            throw e
        }
    }

    function L(e, t) {
        if (e === t) return !0;
        if (e && t && "object" == typeof e && "object" == typeof t) {
            var r, n, o, i = Array.isArray(e), a = Array.isArray(t);
            if (i && a) {
                if ((n = e.length) != t.length) return !1;
                for (r = n; 0 != r--;) if (!L(e[r], t[r])) return !1;
                return !0
            }
            if (i != a) return !1;
            var s = Object.keys(e);
            if ((n = s.length) !== Object.keys(t).length) return !1;
            for (r = n; 0 != r--;) if (!t.hasOwnProperty(s[r])) return !1;
            for (r = n; 0 != r--;) if (!L(e[o = s[r]], t[o])) return !1;
            return !0
        }
        return e != e && t != t
    }

    var $ = Object.freeze({
        __proto__: null,
        JsonPatchError: b,
        deepClone: y,
        getValueByPointer: I,
        applyOperation: A,
        applyPatch: R,
        applyReducer: function (e, t, r) {
            var n = A(e, t);
            if (!1 === n.test) throw new b("Test operation failed", "TEST_OPERATION_FAILED", r, t, e);
            return n.newDocument
        },
        validator: N,
        validate: T,
        _areEquals: L
    }), S = new WeakMap, x = function (e) {
        this.observers = new Map, this.obj = e
    }, C = function (e, t) {
        this.callback = e, this.observer = t
    };

    /*!
   * https://github.com/Starcounter-Jack/JSON-Patch
   * (c) 2017 Joachim Wester
   * MIT license
   */
    function D(e, t) {
        void 0 === t && (t = !1);
        var r = S.get(e.object);
        F(r.value, e.object, e.patches, "", t), e.patches.length && R(r.value, e.patches);
        var n = e.patches;
        return n.length > 0 && (e.patches = [], e.callback && e.callback(n)), n
    }

    function F(e, t, r, n, o) {
        if (t !== e) {
            "function" == typeof t.toJSON && (t = t.toJSON());
            for (var i = u(t), a = u(e), s = !1, l = a.length - 1; l >= 0; l--) {
                var c = e[h = a[l]];
                if (!d(t, h) || void 0 === t[h] && void 0 !== c && !1 === Array.isArray(t)) Array.isArray(e) === Array.isArray(t) ? (o && r.push({
                    op: "test",
                    path: n + "/" + v(h),
                    value: f(c)
                }), r.push({op: "remove", path: n + "/" + v(h)}), s = !0) : (o && r.push({
                    op: "test",
                    path: n,
                    value: e
                }), r.push({op: "replace", path: n, value: t})); else {
                    var p = t[h];
                    "object" == typeof c && null != c && "object" == typeof p && null != p ? F(c, p, r, n + "/" + v(h), o) : c !== p && (o && r.push({
                        op: "test",
                        path: n + "/" + v(h),
                        value: f(c)
                    }), r.push({op: "replace", path: n + "/" + v(h), value: f(p)}))
                }
            }
            if (s || i.length != a.length) for (l = 0; l < i.length; l++) {
                var h;
                d(e, h = i[l]) || void 0 === t[h] || r.push({op: "add", path: n + "/" + v(h), value: f(t[h])})
            }
        }
    }

    var P = Object.freeze({
        __proto__: null, unobserve: function (e, t) {
            t.unobserve()
        }, observe: function (e, t) {
            var r, n = function (e) {
                return S.get(e)
            }(e);
            if (n) {
                var o = function (e, t) {
                    return e.observers.get(t)
                }(n, t);
                r = o && o.observer
            } else n = new x(e), S.set(e, n);
            if (r) return r;
            if (r = {}, n.value = f(e), t) {
                r.callback = t, r.next = null;
                var i = function () {
                    D(r)
                }, a = function () {
                    clearTimeout(r.next), r.next = setTimeout(i)
                };
                "undefined" != typeof window && (window.addEventListener("mouseup", a), window.addEventListener("keyup", a), window.addEventListener("mousedown", a), window.addEventListener("keydown", a), window.addEventListener("change", a))
            }
            return r.patches = [], r.object = e, r.unobserve = function () {
                D(r), clearTimeout(r.next), function (e, t) {
                    e.observers.delete(t.callback)
                }(n, r), "undefined" != typeof window && (window.removeEventListener("mouseup", a), window.removeEventListener("keyup", a), window.removeEventListener("mousedown", a), window.removeEventListener("keydown", a), window.removeEventListener("change", a))
            }, n.observers.set(t, new C(t, r)), r
        }, generate: D, compare: function (e, t, r) {
            void 0 === r && (r = !1);
            var n = [];
            return F(e, t, n, "", r), n
        }
    });
    Object.assign({}, $, P, {JsonPatchError: E, deepClone: f, escapePathComponent: v, unescapePathComponent: g});
    var k = /("(?:[^\\"]|\\.)*")|[:,]/g, _ = function (e, t) {
        var r, n, o;
        return t = t || {}, r = JSON.stringify([1], void 0, void 0 === t.indent ? 2 : t.indent).slice(2, -3), n = "" === r ? 1 / 0 : void 0 === t.maxLength ? 80 : t.maxLength, o = t.replacer, function e(t, i, a) {
            var s, l, c, p, d, u, f, h, v, g, m, E;
            if (t && "function" == typeof t.toJSON && (t = t.toJSON()), void 0 === (m = JSON.stringify(t, o))) return m;
            if (f = n - i.length - a, m.length <= f && (v = m.replace(k, (function (e, t) {
                return t || e + " "
            }))).length <= f) return v;
            if (null != o && (t = JSON.parse(m), o = void 0), "object" == typeof t && null !== t) {
                if (h = i + r, c = [], l = 0, Array.isArray(t)) for (g = "[", s = "]", f = t.length; l < f; l++) c.push(e(t[l], h, l === f - 1 ? 0 : 1) || "null"); else for (g = "{", s = "}", f = (u = Object.keys(t)).length; l < f; l++) p = u[l], d = JSON.stringify(p) + ": ", void 0 !== (E = e(t[p], h, d.length + (l === f - 1 ? 0 : 1))) && c.push(d + E);
                if (c.length > 0) return [g, r + c.join(",\n" + h), s].join("\n" + i)
            }
            return m
        }(e, "", 0)
    };
    var j = {
        SEMVER_SPEC_VERSION: "2.0.0",
        MAX_LENGTH: 256,
        MAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER || 9007199254740991,
        MAX_SAFE_COMPONENT_LENGTH: 16
    };
    var z = "object" == typeof process && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
    }, M = function (e, t, r) {
        return e(r = {
            path: t, exports: {}, require: function (e, t) {
                return function () {
                    throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")
                }(null == t && r.path)
            }
        }, r.exports), r.exports
    }((function (e, t) {
        const {MAX_SAFE_COMPONENT_LENGTH: r} = j, n = (t = e.exports = {}).re = [], o = t.src = [], i = t.t = {};
        let a = 0;
        const s = (e, t, r) => {
            const s = a++;
            z(s, t), i[e] = s, o[s] = t, n[s] = new RegExp(t, r ? "g" : void 0)
        };
        s("NUMERICIDENTIFIER", "0|[1-9]\\d*"), s("NUMERICIDENTIFIERLOOSE", "[0-9]+"), s("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-][a-zA-Z0-9-]*"), s("MAINVERSION", `(${o[i.NUMERICIDENTIFIER]})\\.(${o[i.NUMERICIDENTIFIER]})\\.(${o[i.NUMERICIDENTIFIER]})`), s("MAINVERSIONLOOSE", `(${o[i.NUMERICIDENTIFIERLOOSE]})\\.(${o[i.NUMERICIDENTIFIERLOOSE]})\\.(${o[i.NUMERICIDENTIFIERLOOSE]})`), s("PRERELEASEIDENTIFIER", `(?:${o[i.NUMERICIDENTIFIER]}|${o[i.NONNUMERICIDENTIFIER]})`), s("PRERELEASEIDENTIFIERLOOSE", `(?:${o[i.NUMERICIDENTIFIERLOOSE]}|${o[i.NONNUMERICIDENTIFIER]})`), s("PRERELEASE", `(?:-(${o[i.PRERELEASEIDENTIFIER]}(?:\\.${o[i.PRERELEASEIDENTIFIER]})*))`), s("PRERELEASELOOSE", `(?:-?(${o[i.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${o[i.PRERELEASEIDENTIFIERLOOSE]})*))`), s("BUILDIDENTIFIER", "[0-9A-Za-z-]+"), s("BUILD", `(?:\\+(${o[i.BUILDIDENTIFIER]}(?:\\.${o[i.BUILDIDENTIFIER]})*))`), s("FULLPLAIN", `v?${o[i.MAINVERSION]}${o[i.PRERELEASE]}?${o[i.BUILD]}?`), s("FULL", `^${o[i.FULLPLAIN]}$`), s("LOOSEPLAIN", `[v=\\s]*${o[i.MAINVERSIONLOOSE]}${o[i.PRERELEASELOOSE]}?${o[i.BUILD]}?`), s("LOOSE", `^${o[i.LOOSEPLAIN]}$`), s("GTLT", "((?:<|>)?=?)"), s("XRANGEIDENTIFIERLOOSE", o[i.NUMERICIDENTIFIERLOOSE] + "|x|X|\\*"), s("XRANGEIDENTIFIER", o[i.NUMERICIDENTIFIER] + "|x|X|\\*"), s("XRANGEPLAIN", `[v=\\s]*(${o[i.XRANGEIDENTIFIER]})(?:\\.(${o[i.XRANGEIDENTIFIER]})(?:\\.(${o[i.XRANGEIDENTIFIER]})(?:${o[i.PRERELEASE]})?${o[i.BUILD]}?)?)?`), s("XRANGEPLAINLOOSE", `[v=\\s]*(${o[i.XRANGEIDENTIFIERLOOSE]})(?:\\.(${o[i.XRANGEIDENTIFIERLOOSE]})(?:\\.(${o[i.XRANGEIDENTIFIERLOOSE]})(?:${o[i.PRERELEASELOOSE]})?${o[i.BUILD]}?)?)?`), s("XRANGE", `^${o[i.GTLT]}\\s*${o[i.XRANGEPLAIN]}$`), s("XRANGELOOSE", `^${o[i.GTLT]}\\s*${o[i.XRANGEPLAINLOOSE]}$`), s("COERCE", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?(?:$|[^\\d])`), s("COERCERTL", o[i.COERCE], !0), s("LONETILDE", "(?:~>?)"), s("TILDETRIM", `(\\s*)${o[i.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", s("TILDE", `^${o[i.LONETILDE]}${o[i.XRANGEPLAIN]}$`), s("TILDELOOSE", `^${o[i.LONETILDE]}${o[i.XRANGEPLAINLOOSE]}$`), s("LONECARET", "(?:\\^)"), s("CARETTRIM", `(\\s*)${o[i.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", s("CARET", `^${o[i.LONECARET]}${o[i.XRANGEPLAIN]}$`), s("CARETLOOSE", `^${o[i.LONECARET]}${o[i.XRANGEPLAINLOOSE]}$`), s("COMPARATORLOOSE", `^${o[i.GTLT]}\\s*(${o[i.LOOSEPLAIN]})$|^$`), s("COMPARATOR", `^${o[i.GTLT]}\\s*(${o[i.FULLPLAIN]})$|^$`), s("COMPARATORTRIM", `(\\s*)${o[i.GTLT]}\\s*(${o[i.LOOSEPLAIN]}|${o[i.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", s("HYPHENRANGE", `^\\s*(${o[i.XRANGEPLAIN]})\\s+-\\s+(${o[i.XRANGEPLAIN]})\\s*$`), s("HYPHENRANGELOOSE", `^\\s*(${o[i.XRANGEPLAINLOOSE]})\\s+-\\s+(${o[i.XRANGEPLAINLOOSE]})\\s*$`), s("STAR", "(<|>)?=?\\s*\\*"), s("GTE0", "^\\s*>=\\s*0.0.0\\s*$"), s("GTE0PRE", "^\\s*>=\\s*0.0.0-0\\s*$")
    }));
    const B = /^[0-9]+$/, G = (e, t) => {
        const r = B.test(e), n = B.test(t);
        return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1
    };
    var U = {compareIdentifiers: G, rcompareIdentifiers: (e, t) => G(t, e)};
    const {MAX_LENGTH: X, MAX_SAFE_INTEGER: V} = j, {re: W, t: H} = M, {compareIdentifiers: q} = U;

    class Y {
        constructor(e, t) {
            if (t && "object" == typeof t || (t = {loose: !!t, includePrerelease: !1}), e instanceof Y) {
                if (e.loose === !!t.loose && e.includePrerelease === !!t.includePrerelease) return e;
                e = e.version
            } else if ("string" != typeof e) throw new TypeError("Invalid Version: " + e);
            if (e.length > X) throw new TypeError(`version is longer than ${X} characters`);
            z("SemVer", e, t), this.options = t, this.loose = !!t.loose, this.includePrerelease = !!t.includePrerelease;
            const r = e.trim().match(t.loose ? W[H.LOOSE] : W[H.FULL]);
            if (!r) throw new TypeError("Invalid Version: " + e);
            if (this.raw = e, this.major = +r[1], this.minor = +r[2], this.patch = +r[3], this.major > V || this.major < 0) throw new TypeError("Invalid major version");
            if (this.minor > V || this.minor < 0) throw new TypeError("Invalid minor version");
            if (this.patch > V || this.patch < 0) throw new TypeError("Invalid patch version");
            r[4] ? this.prerelease = r[4].split(".").map(e => {
                if (/^[0-9]+$/.test(e)) {
                    const t = +e;
                    if (t >= 0 && t < V) return t
                }
                return e
            }) : this.prerelease = [], this.build = r[5] ? r[5].split(".") : [], this.format()
        }

        format() {
            return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += "-" + this.prerelease.join(".")), this.version
        }

        toString() {
            return this.version
        }

        compare(e) {
            if (z("SemVer.compare", this.version, this.options, e), !(e instanceof Y)) {
                if ("string" == typeof e && e === this.version) return 0;
                e = new Y(e, this.options)
            }
            return e.version === this.version ? 0 : this.compareMain(e) || this.comparePre(e)
        }

        compareMain(e) {
            return e instanceof Y || (e = new Y(e, this.options)), q(this.major, e.major) || q(this.minor, e.minor) || q(this.patch, e.patch)
        }

        comparePre(e) {
            if (e instanceof Y || (e = new Y(e, this.options)), this.prerelease.length && !e.prerelease.length) return -1;
            if (!this.prerelease.length && e.prerelease.length) return 1;
            if (!this.prerelease.length && !e.prerelease.length) return 0;
            let t = 0;
            do {
                const r = this.prerelease[t], n = e.prerelease[t];
                if (z("prerelease compare", t, r, n), void 0 === r && void 0 === n) return 0;
                if (void 0 === n) return 1;
                if (void 0 === r) return -1;
                if (r !== n) return q(r, n)
            } while (++t)
        }

        compareBuild(e) {
            e instanceof Y || (e = new Y(e, this.options));
            let t = 0;
            do {
                const r = this.build[t], n = e.build[t];
                if (z("prerelease compare", t, r, n), void 0 === r && void 0 === n) return 0;
                if (void 0 === n) return 1;
                if (void 0 === r) return -1;
                if (r !== n) return q(r, n)
            } while (++t)
        }

        inc(e, t) {
            switch (e) {
                case"premajor":
                    this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", t);
                    break;
                case"preminor":
                    this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", t);
                    break;
                case"prepatch":
                    this.prerelease.length = 0, this.inc("patch", t), this.inc("pre", t);
                    break;
                case"prerelease":
                    0 === this.prerelease.length && this.inc("patch", t), this.inc("pre", t);
                    break;
                case"major":
                    0 === this.minor && 0 === this.patch && 0 !== this.prerelease.length || this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
                    break;
                case"minor":
                    0 === this.patch && 0 !== this.prerelease.length || this.minor++, this.patch = 0, this.prerelease = [];
                    break;
                case"patch":
                    0 === this.prerelease.length && this.patch++, this.prerelease = [];
                    break;
                case"pre":
                    if (0 === this.prerelease.length) this.prerelease = [0]; else {
                        let e = this.prerelease.length;
                        for (; --e >= 0;) "number" == typeof this.prerelease[e] && (this.prerelease[e]++, e = -2);
                        -1 === e && this.prerelease.push(0)
                    }
                    t && (this.prerelease[0] === t ? isNaN(this.prerelease[1]) && (this.prerelease = [t, 0]) : this.prerelease = [t, 0]);
                    break;
                default:
                    throw new Error("invalid increment argument: " + e)
            }
            return this.format(), this.raw = this.version, this
        }
    }

    var J = Y;
    const {MAX_LENGTH: Q} = j, {re: Z, t: K} = M;
    var ee = (e, t) => {
        if (t && "object" == typeof t || (t = {loose: !!t, includePrerelease: !1}), e instanceof J) return e;
        if ("string" != typeof e) return null;
        if (e.length > Q) return null;
        if (!(t.loose ? Z[K.LOOSE] : Z[K.FULL]).test(e)) return null;
        try {
            return new J(e, t)
        } catch (e) {
            return null
        }
    };
    var te = (e, t) => {
        const r = ee(e, t);
        return r ? r.version : null
    };
    var re = (e, t) => {
        const r = ee(e.trim().replace(/^[=v]+/, ""), t);
        return r ? r.version : null
    };
    var ne = (e, t, r, n) => {
        "string" == typeof r && (n = r, r = void 0);
        try {
            return new J(e, r).inc(t, n).version
        } catch (e) {
            return null
        }
    };
    var oe = (e, t, r) => new J(e, r).compare(new J(t, r));
    var ie = (e, t, r) => 0 === oe(e, t, r);
    var ae = (e, t) => {
        if (ie(e, t)) return null;
        {
            const r = ee(e), n = ee(t), o = r.prerelease.length || n.prerelease.length, i = o ? "pre" : "",
                a = o ? "prerelease" : "";
            for (const e in r) if (("major" === e || "minor" === e || "patch" === e) && r[e] !== n[e]) return i + e;
            return a
        }
    };
    var se = (e, t) => new J(e, t).major;
    var le = (e, t) => new J(e, t).minor;
    var ce = (e, t) => new J(e, t).patch;
    var pe = (e, t) => {
        const r = ee(e, t);
        return r && r.prerelease.length ? r.prerelease : null
    };
    var de = (e, t, r) => oe(t, e, r);
    var ue = (e, t) => oe(e, t, !0);
    var fe = (e, t, r) => {
        const n = new J(e, r), o = new J(t, r);
        return n.compare(o) || n.compareBuild(o)
    };
    var he = (e, t) => e.sort((e, r) => fe(e, r, t));
    var ve = (e, t) => e.sort((e, r) => fe(r, e, t));
    var ge = (e, t, r) => oe(e, t, r) > 0;
    var me = (e, t, r) => oe(e, t, r) < 0;
    var Ee = (e, t, r) => 0 !== oe(e, t, r);
    var be = (e, t, r) => oe(e, t, r) >= 0;
    var ye = (e, t, r) => oe(e, t, r) <= 0;
    var we = (e, t, r, n) => {
        switch (t) {
            case"===":
                return "object" == typeof e && (e = e.version), "object" == typeof r && (r = r.version), e === r;
            case"!==":
                return "object" == typeof e && (e = e.version), "object" == typeof r && (r = r.version), e !== r;
            case"":
            case"=":
            case"==":
                return ie(e, r, n);
            case"!=":
                return Ee(e, r, n);
            case">":
                return ge(e, r, n);
            case">=":
                return be(e, r, n);
            case"<":
                return me(e, r, n);
            case"<=":
                return ye(e, r, n);
            default:
                throw new TypeError("Invalid operator: " + t)
        }
    };
    const {re: Oe, t: Ie} = M;
    var Ae = (e, t) => {
        if (e instanceof J) return e;
        if ("number" == typeof e && (e = String(e)), "string" != typeof e) return null;
        let r = null;
        if ((t = t || {}).rtl) {
            let t;
            for (; (t = Oe[Ie.COERCERTL].exec(e)) && (!r || r.index + r[0].length !== e.length);) r && t.index + t[0].length === r.index + r[0].length || (r = t), Oe[Ie.COERCERTL].lastIndex = t.index + t[1].length + t[2].length;
            Oe[Ie.COERCERTL].lastIndex = -1
        } else r = e.match(Oe[Ie.COERCE]);
        return null === r ? null : ee(`${r[2]}.${r[3] || "0"}.${r[4] || "0"}`, t)
    };

    class Re {
        constructor(e, t) {
            if (t && "object" == typeof t || (t = {
                loose: !!t,
                includePrerelease: !1
            }), e instanceof Re) return e.loose === !!t.loose && e.includePrerelease === !!t.includePrerelease ? e : new Re(e.raw, t);
            if (e instanceof He) return this.raw = e.value, this.set = [[e]], this.format(), this;
            if (this.options = t, this.loose = !!t.loose, this.includePrerelease = !!t.includePrerelease, this.raw = e, this.set = e.split(/\s*\|\|\s*/).map(e => this.parseRange(e.trim())).filter(e => e.length), !this.set.length) throw new TypeError("Invalid SemVer Range: " + e);
            this.format()
        }

        format() {
            return this.range = this.set.map(e => e.join(" ").trim()).join("||").trim(), this.range
        }

        toString() {
            return this.range
        }

        parseRange(e) {
            const t = this.options.loose;
            e = e.trim();
            const r = t ? Te[Le.HYPHENRANGELOOSE] : Te[Le.HYPHENRANGE];
            e = e.replace(r, Ue(this.options.includePrerelease)), z("hyphen replace", e), e = e.replace(Te[Le.COMPARATORTRIM], $e), z("comparator trim", e, Te[Le.COMPARATORTRIM]), e = (e = (e = e.replace(Te[Le.TILDETRIM], Se)).replace(Te[Le.CARETTRIM], xe)).split(/\s+/).join(" ");
            const n = t ? Te[Le.COMPARATORLOOSE] : Te[Le.COMPARATOR];
            return e.split(" ").map(e => De(e, this.options)).join(" ").split(/\s+/).map(e => Ge(e, this.options)).filter(this.options.loose ? e => !!e.match(n) : () => !0).map(e => new He(e, this.options))
        }

        intersects(e, t) {
            if (!(e instanceof Re)) throw new TypeError("a Range is required");
            return this.set.some(r => Ce(r, t) && e.set.some(e => Ce(e, t) && r.every(r => e.every(e => r.intersects(e, t)))))
        }

        test(e) {
            if (!e) return !1;
            if ("string" == typeof e) try {
                e = new J(e, this.options)
            } catch (e) {
                return !1
            }
            for (let t = 0; t < this.set.length; t++) if (Xe(this.set[t], e, this.options)) return !0;
            return !1
        }
    }

    var Ne = Re;
    const {re: Te, t: Le, comparatorTrimReplace: $e, tildeTrimReplace: Se, caretTrimReplace: xe} = M, Ce = (e, t) => {
            let r = !0;
            const n = e.slice();
            let o = n.pop();
            for (; r && n.length;) r = n.every(e => o.intersects(e, t)), o = n.pop();
            return r
        },
        De = (e, t) => (z("comp", e, t), e = _e(e, t), z("caret", e), e = Pe(e, t), z("tildes", e), e = ze(e, t), z("xrange", e), e = Be(e, t), z("stars", e), e),
        Fe = e => !e || "x" === e.toLowerCase() || "*" === e,
        Pe = (e, t) => e.trim().split(/\s+/).map(e => ke(e, t)).join(" "), ke = (e, t) => {
            const r = t.loose ? Te[Le.TILDELOOSE] : Te[Le.TILDE];
            return e.replace(r, (t, r, n, o, i) => {
                let a;
                return z("tilde", e, t, r, n, o, i), Fe(r) ? a = "" : Fe(n) ? a = `>=${r}.0.0 <${+r + 1}.0.0-0` : Fe(o) ? a = `>=${r}.${n}.0 <${r}.${+n + 1}.0-0` : i ? (z("replaceTilde pr", i), a = `>=${r}.${n}.${o}-${i} <${r}.${+n + 1}.0-0`) : a = `>=${r}.${n}.${o} <${r}.${+n + 1}.0-0`, z("tilde return", a), a
            })
        }, _e = (e, t) => e.trim().split(/\s+/).map(e => je(e, t)).join(" "), je = (e, t) => {
            z("caret", e, t);
            const r = t.loose ? Te[Le.CARETLOOSE] : Te[Le.CARET], n = t.includePrerelease ? "-0" : "";
            return e.replace(r, (t, r, o, i, a) => {
                let s;
                return z("caret", e, t, r, o, i, a), Fe(r) ? s = "" : Fe(o) ? s = `>=${r}.0.0${n} <${+r + 1}.0.0-0` : Fe(i) ? s = "0" === r ? `>=${r}.${o}.0${n} <${r}.${+o + 1}.0-0` : `>=${r}.${o}.0${n} <${+r + 1}.0.0-0` : a ? (z("replaceCaret pr", a), s = "0" === r ? "0" === o ? `>=${r}.${o}.${i}-${a} <${r}.${o}.${+i + 1}-0` : `>=${r}.${o}.${i}-${a} <${r}.${+o + 1}.0-0` : `>=${r}.${o}.${i}-${a} <${+r + 1}.0.0-0`) : (z("no pr"), s = "0" === r ? "0" === o ? `>=${r}.${o}.${i}${n} <${r}.${o}.${+i + 1}-0` : `>=${r}.${o}.${i}${n} <${r}.${+o + 1}.0-0` : `>=${r}.${o}.${i} <${+r + 1}.0.0-0`), z("caret return", s), s
            })
        }, ze = (e, t) => (z("replaceXRanges", e, t), e.split(/\s+/).map(e => Me(e, t)).join(" ")), Me = (e, t) => {
            e = e.trim();
            const r = t.loose ? Te[Le.XRANGELOOSE] : Te[Le.XRANGE];
            return e.replace(r, (r, n, o, i, a, s) => {
                z("xRange", e, r, n, o, i, a, s);
                const l = Fe(o), c = l || Fe(i), p = c || Fe(a), d = p;
                return "=" === n && d && (n = ""), s = t.includePrerelease ? "-0" : "", l ? r = ">" === n || "<" === n ? "<0.0.0-0" : "*" : n && d ? (c && (i = 0), a = 0, ">" === n ? (n = ">=", c ? (o = +o + 1, i = 0, a = 0) : (i = +i + 1, a = 0)) : "<=" === n && (n = "<", c ? o = +o + 1 : i = +i + 1), "<" === n && (s = "-0"), r = `${n + o}.${i}.${a}${s}`) : c ? r = `>=${o}.0.0${s} <${+o + 1}.0.0-0` : p && (r = `>=${o}.${i}.0${s} <${o}.${+i + 1}.0-0`), z("xRange return", r), r
            })
        }, Be = (e, t) => (z("replaceStars", e, t), e.trim().replace(Te[Le.STAR], "")),
        Ge = (e, t) => (z("replaceGTE0", e, t), e.trim().replace(Te[t.includePrerelease ? Le.GTE0PRE : Le.GTE0], "")),
        Ue = e => (t, r, n, o, i, a, s, l, c, p, d, u, f) => `${r = Fe(n) ? "" : Fe(o) ? `>=${n}.0.0${e ? "-0" : ""}` : Fe(i) ? `>=${n}.${o}.0${e ? "-0" : ""}` : a ? ">=" + r : `>=${r}${e ? "-0" : ""}`} ${l = Fe(c) ? "" : Fe(p) ? `<${+c + 1}.0.0-0` : Fe(d) ? `<${c}.${+p + 1}.0-0` : u ? `<=${c}.${p}.${d}-${u}` : e ? `<${c}.${p}.${+d + 1}-0` : "<=" + l}`.trim(),
        Xe = (e, t, r) => {
            for (let r = 0; r < e.length; r++) if (!e[r].test(t)) return !1;
            if (t.prerelease.length && !r.includePrerelease) {
                for (let r = 0; r < e.length; r++) if (z(e[r].semver), e[r].semver !== He.ANY && e[r].semver.prerelease.length > 0) {
                    const n = e[r].semver;
                    if (n.major === t.major && n.minor === t.minor && n.patch === t.patch) return !0
                }
                return !1
            }
            return !0
        }, Ve = Symbol("SemVer ANY");

    class We {
        constructor(e, t) {
            if (t && "object" == typeof t || (t = {loose: !!t, includePrerelease: !1}), e instanceof We) {
                if (e.loose === !!t.loose) return e;
                e = e.value
            }
            z("comparator", e, t), this.options = t, this.loose = !!t.loose, this.parse(e), this.semver === Ve ? this.value = "" : this.value = this.operator + this.semver.version, z("comp", this)
        }

        static get ANY() {
            return Ve
        }

        parse(e) {
            const t = this.options.loose ? qe[Ye.COMPARATORLOOSE] : qe[Ye.COMPARATOR], r = e.match(t);
            if (!r) throw new TypeError("Invalid comparator: " + e);
            this.operator = void 0 !== r[1] ? r[1] : "", "=" === this.operator && (this.operator = ""), r[2] ? this.semver = new J(r[2], this.options.loose) : this.semver = Ve
        }

        toString() {
            return this.value
        }

        test(e) {
            if (z("Comparator.test", e, this.options.loose), this.semver === Ve || e === Ve) return !0;
            if ("string" == typeof e) try {
                e = new J(e, this.options)
            } catch (e) {
                return !1
            }
            return we(e, this.operator, this.semver, this.options)
        }

        intersects(e, t) {
            if (!(e instanceof We)) throw new TypeError("a Comparator is required");
            if (t && "object" == typeof t || (t = {
                loose: !!t,
                includePrerelease: !1
            }), "" === this.operator) return "" === this.value || new Ne(e.value, t).test(this.value);
            if ("" === e.operator) return "" === e.value || new Ne(this.value, t).test(e.semver);
            const r = !(">=" !== this.operator && ">" !== this.operator || ">=" !== e.operator && ">" !== e.operator),
                n = !("<=" !== this.operator && "<" !== this.operator || "<=" !== e.operator && "<" !== e.operator),
                o = this.semver.version === e.semver.version,
                i = !(">=" !== this.operator && "<=" !== this.operator || ">=" !== e.operator && "<=" !== e.operator),
                a = we(this.semver, "<", e.semver, t) && (">=" === this.operator || ">" === this.operator) && ("<=" === e.operator || "<" === e.operator),
                s = we(this.semver, ">", e.semver, t) && ("<=" === this.operator || "<" === this.operator) && (">=" === e.operator || ">" === e.operator);
            return r || n || o && i || a || s
        }
    }

    var He = We;
    const {re: qe, t: Ye} = M;
    var Je = (e, t, r) => {
        try {
            t = new Ne(t, r)
        } catch (e) {
            return !1
        }
        return t.test(e)
    };
    var Qe = (e, t) => new Ne(e, t).set.map(e => e.map(e => e.value).join(" ").trim().split(" "));
    var Ze = (e, t, r) => {
        let n = null, o = null, i = null;
        try {
            i = new Ne(t, r)
        } catch (e) {
            return null
        }
        return e.forEach(e => {
            i.test(e) && (n && -1 !== o.compare(e) || (n = e, o = new J(n, r)))
        }), n
    };
    var Ke = (e, t, r) => {
        let n = null, o = null, i = null;
        try {
            i = new Ne(t, r)
        } catch (e) {
            return null
        }
        return e.forEach(e => {
            i.test(e) && (n && 1 !== o.compare(e) || (n = e, o = new J(n, r)))
        }), n
    };
    var et = (e, t) => {
        e = new Ne(e, t);
        let r = new J("0.0.0");
        if (e.test(r)) return r;
        if (r = new J("0.0.0-0"), e.test(r)) return r;
        r = null;
        for (let t = 0; t < e.set.length; ++t) {
            e.set[t].forEach(e => {
                const t = new J(e.semver.version);
                switch (e.operator) {
                    case">":
                        0 === t.prerelease.length ? t.patch++ : t.prerelease.push(0), t.raw = t.format();
                    case"":
                    case">=":
                        r && !ge(r, t) || (r = t);
                        break;
                    case"<":
                    case"<=":
                        break;
                    default:
                        throw new Error("Unexpected operation: " + e.operator)
                }
            })
        }
        return r && e.test(r) ? r : null
    };
    var tt = (e, t) => {
        try {
            return new Ne(e, t).range || "*"
        } catch (e) {
            return null
        }
    };
    const {ANY: rt} = He;
    var nt = (e, t, r, n) => {
        let o, i, a, s, l;
        switch (e = new J(e, n), t = new Ne(t, n), r) {
            case">":
                o = ge, i = ye, a = me, s = ">", l = ">=";
                break;
            case"<":
                o = me, i = be, a = ge, s = "<", l = "<=";
                break;
            default:
                throw new TypeError('Must provide a hilo val of "<" or ">"')
        }
        if (Je(e, t, n)) return !1;
        for (let r = 0; r < t.set.length; ++r) {
            const c = t.set[r];
            let p = null, d = null;
            if (c.forEach(e => {
                e.semver === rt && (e = new He(">=0.0.0")), p = p || e, d = d || e, o(e.semver, p.semver, n) ? p = e : a(e.semver, d.semver, n) && (d = e)
            }), p.operator === s || p.operator === l) return !1;
            if ((!d.operator || d.operator === s) && i(e, d.semver)) return !1;
            if (d.operator === l && a(e, d.semver)) return !1
        }
        return !0
    };
    var ot = (e, t, r) => nt(e, t, ">", r);
    var it = (e, t, r) => nt(e, t, "<", r);
    var at = (e, t, r) => (e = new Ne(e, r), t = new Ne(t, r), e.intersects(t));
    const {ANY: st} = He, lt = (e, t, r) => {
        if (1 === e.length && e[0].semver === st) return 1 === t.length && t[0].semver === st;
        const n = new Set;
        let o, i, a, s, l, c, p;
        for (const t of e) ">" === t.operator || ">=" === t.operator ? o = ct(o, t, r) : "<" === t.operator || "<=" === t.operator ? i = pt(i, t, r) : n.add(t.semver);
        if (n.size > 1) return null;
        if (o && i) {
            if (a = oe(o.semver, i.semver, r), a > 0) return null;
            if (0 === a && (">=" !== o.operator || "<=" !== i.operator)) return null
        }
        for (const e of n) {
            if (o && !Je(e, String(o), r)) return null;
            if (i && !Je(e, String(i), r)) return null;
            for (const n of t) if (!Je(e, String(n), r)) return !1;
            return !0
        }
        for (const e of t) {
            if (p = p || ">" === e.operator || ">=" === e.operator, c = c || "<" === e.operator || "<=" === e.operator, o) if (">" === e.operator || ">=" === e.operator) {
                if (s = ct(o, e, r), s === e) return !1
            } else if (">=" === o.operator && !Je(o.semver, String(e), r)) return !1;
            if (i) if ("<" === e.operator || "<=" === e.operator) {
                if (l = pt(i, e, r), l === e) return !1
            } else if ("<=" === i.operator && !Je(i.semver, String(e), r)) return !1;
            if (!e.operator && (i || o) && 0 !== a) return !1
        }
        return !(o && c && !i && 0 !== a) && !(i && p && !o && 0 !== a)
    }, ct = (e, t, r) => {
        if (!e) return t;
        const n = oe(e.semver, t.semver, r);
        return n > 0 ? e : n < 0 || ">" === t.operator && ">=" === e.operator ? t : e
    }, pt = (e, t, r) => {
        if (!e) return t;
        const n = oe(e.semver, t.semver, r);
        return n < 0 ? e : n > 0 || "<" === t.operator && "<=" === e.operator ? t : e
    };
    var dt = (e, t, r) => {
        e = new Ne(e, r), t = new Ne(t, r);
        let n = !1;
        e:for (const o of e.set) {
            for (const e of t.set) {
                const t = lt(o, e, r);
                if (n = n || null !== t, t) continue e
            }
            if (n) return !1
        }
        return !0
    }, ut = {
        re: M.re,
        src: M.src,
        tokens: M.t,
        SEMVER_SPEC_VERSION: j.SEMVER_SPEC_VERSION,
        SemVer: J,
        compareIdentifiers: U.compareIdentifiers,
        rcompareIdentifiers: U.rcompareIdentifiers,
        parse: ee,
        valid: te,
        clean: re,
        inc: ne,
        diff: ae,
        major: se,
        minor: le,
        patch: ce,
        prerelease: pe,
        compare: oe,
        rcompare: de,
        compareLoose: ue,
        compareBuild: fe,
        sort: he,
        rsort: ve,
        gt: ge,
        lt: me,
        eq: ie,
        neq: Ee,
        gte: be,
        lte: ye,
        cmp: we,
        coerce: Ae,
        Comparator: He,
        Range: Ne,
        satisfies: Je,
        toComparators: Qe,
        maxSatisfying: Ze,
        minSatisfying: Ke,
        minVersion: et,
        validRange: tt,
        outside: nt,
        gtr: ot,
        ltr: it,
        intersects: at,
        simplifyRange: (e, t, r) => {
            const n = [];
            let o = null, i = null;
            const a = e.sort((e, t) => oe(e, t, r));
            for (const e of a) {
                Je(e, t, r) ? (i = e, o || (o = e)) : (i && n.push([o, i]), i = null, o = null)
            }
            o && n.push([o, null]);
            const s = [];
            for (const [e, t] of n) e === t ? s.push(e) : t || e !== a[0] ? t ? e === a[0] ? s.push("<=" + t) : s.push(`${e} - ${t}`) : s.push(">=" + e) : s.push("*");
            const l = s.join(" || "), c = "string" == typeof t.raw ? t.raw : String(t);
            return l.length < c.length ? l : t
        },
        subset: dt
    };

    function ft(e) {
        const [t, r] = /\/schema\/([\w-]+)\/([\w\.\-]+)\.json$/g.exec(e).slice(1, 3);
        return {library: t, version: r}
    }

    const ht = "#fff", vt = {
        background: "#333",
        title: {color: ht},
        style: {"guide-label": {fill: ht}, "guide-title": {fill: ht}},
        axis: {domainColor: ht, gridColor: "#888", tickColor: ht}
    }, gt = "#4572a7", mt = {
        background: "#fff",
        arc: {fill: gt},
        area: {fill: gt},
        line: {stroke: gt, strokeWidth: 2},
        path: {stroke: gt},
        rect: {fill: gt},
        shape: {stroke: gt},
        symbol: {fill: gt, strokeWidth: 1.5, size: 50},
        axis: {
            bandPosition: .5,
            grid: !0,
            gridColor: "#000000",
            gridOpacity: 1,
            gridWidth: .5,
            labelPadding: 10,
            tickSize: 5,
            tickWidth: .5
        },
        axisBand: {grid: !1, tickExtra: !0},
        legend: {labelBaseline: "middle", labelFontSize: 11, symbolSize: 50, symbolType: "square"},
        range: {category: ["#4572a7", "#aa4643", "#8aa453", "#71598e", "#4598ae", "#d98445", "#94aace", "#d09393", "#b9cc98", "#a99cbc"]}
    }, Et = "#30a2da", bt = "#cbcbcb", yt = "#f0f0f0", wt = "#333", Ot = {
        arc: {fill: Et},
        area: {fill: Et},
        axis: {
            domainColor: bt,
            grid: !0,
            gridColor: bt,
            gridWidth: 1,
            labelColor: "#999",
            labelFontSize: 10,
            titleColor: "#333",
            tickColor: bt,
            tickSize: 10,
            titleFontSize: 14,
            titlePadding: 10,
            labelPadding: 4
        },
        axisBand: {grid: !1},
        background: yt,
        group: {fill: yt},
        legend: {
            labelColor: wt,
            labelFontSize: 11,
            padding: 1,
            symbolSize: 30,
            symbolType: "square",
            titleColor: wt,
            titleFontSize: 14,
            titlePadding: 10
        },
        line: {stroke: Et, strokeWidth: 2},
        path: {stroke: Et, strokeWidth: .5},
        rect: {fill: Et},
        range: {
            category: ["#30a2da", "#fc4f30", "#e5ae38", "#6d904f", "#8b8b8b", "#b96db8", "#ff9e27", "#56cc60", "#52d2ca", "#52689e", "#545454", "#9fe4f8"],
            diverging: ["#cc0020", "#e77866", "#f6e7e1", "#d6e8ed", "#91bfd9", "#1d78b5"],
            heatmap: ["#d6e8ed", "#cee0e5", "#91bfd9", "#549cc6", "#1d78b5"]
        },
        point: {filled: !0, shape: "circle"},
        shape: {stroke: Et},
        bar: {binSpacing: 2, fill: Et, stroke: null},
        title: {anchor: "start", fontSize: 24, fontWeight: 600, offset: 20}
    }, It = "#000", At = {
        group: {fill: "#e5e5e5"},
        arc: {fill: It},
        area: {fill: It},
        line: {stroke: It},
        path: {stroke: It},
        rect: {fill: It},
        shape: {stroke: It},
        symbol: {fill: It, size: 40},
        axis: {
            domain: !1,
            grid: !0,
            gridColor: "#FFFFFF",
            gridOpacity: 1,
            labelColor: "#7F7F7F",
            labelPadding: 4,
            tickColor: "#7F7F7F",
            tickSize: 5.67,
            titleFontSize: 16,
            titleFontWeight: "normal"
        },
        legend: {labelBaseline: "middle", labelFontSize: 11, symbolSize: 40},
        range: {category: ["#000000", "#7F7F7F", "#1A1A1A", "#999999", "#333333", "#B0B0B0", "#4D4D4D", "#C9C9C9", "#666666", "#DCDCDC"]}
    }, Rt = "Benton Gothic, sans-serif", Nt = "#82c6df", Tt = "Benton Gothic Bold, sans-serif", Lt = "normal", $t = {
        "category-6": ["#ec8431", "#829eb1", "#c89d29", "#3580b1", "#adc839", "#ab7fb4"],
        "fire-7": ["#fbf2c7", "#f9e39c", "#f8d36e", "#f4bb6a", "#e68a4f", "#d15a40", "#ab4232"],
        "fireandice-6": ["#e68a4f", "#f4bb6a", "#f9e39c", "#dadfe2", "#a6b7c6", "#849eae"],
        "ice-7": ["#edefee", "#dadfe2", "#c4ccd2", "#a6b7c6", "#849eae", "#607785", "#47525d"]
    }, St = {
        background: "#ffffff",
        title: {anchor: "start", color: "#000000", font: Tt, fontSize: 22, fontWeight: "normal"},
        arc: {fill: Nt},
        area: {fill: Nt},
        line: {stroke: Nt, strokeWidth: 2},
        path: {stroke: Nt},
        rect: {fill: Nt},
        shape: {stroke: Nt},
        symbol: {fill: Nt, size: 30},
        axis: {
            labelFont: Rt,
            labelFontSize: 11.5,
            labelFontWeight: "normal",
            titleFont: Tt,
            titleFontSize: 13,
            titleFontWeight: Lt
        },
        axisX: {labelAngle: 0, labelPadding: 4, tickSize: 3},
        axisY: {
            labelBaseline: "middle",
            maxExtent: 45,
            minExtent: 45,
            tickSize: 2,
            titleAlign: "left",
            titleAngle: 0,
            titleX: -45,
            titleY: -11
        },
        legend: {
            labelFont: Rt,
            labelFontSize: 11.5,
            symbolType: "square",
            titleFont: Tt,
            titleFontSize: 13,
            titleFontWeight: Lt
        },
        range: {
            category: $t["category-6"],
            diverging: $t["fireandice-6"],
            heatmap: $t["fire-7"],
            ordinal: $t["fire-7"],
            ramp: $t["fire-7"]
        }
    }, xt = "#ab5787", Ct = "#979797", Dt = {
        background: "#f9f9f9",
        arc: {fill: xt},
        area: {fill: xt},
        line: {stroke: xt},
        path: {stroke: xt},
        rect: {fill: xt},
        shape: {stroke: xt},
        symbol: {fill: xt, size: 30},
        axis: {
            domainColor: Ct,
            domainWidth: .5,
            gridWidth: .2,
            labelColor: Ct,
            tickColor: Ct,
            tickWidth: .2,
            titleColor: Ct
        },
        axisBand: {grid: !1},
        axisX: {grid: !0, tickSize: 10},
        axisY: {domain: !1, grid: !0, tickSize: 0},
        legend: {labelFontSize: 11, padding: 1, symbolSize: 30, symbolType: "square"},
        range: {category: ["#ab5787", "#51b2e5", "#703c5c", "#168dd9", "#d190b6", "#00609f", "#d365ba", "#154866", "#666666", "#c4c4c4"]}
    }, Ft = "#3e5c69", Pt = {
        background: "#fff",
        arc: {fill: Ft},
        area: {fill: Ft},
        line: {stroke: Ft},
        path: {stroke: Ft},
        rect: {fill: Ft},
        shape: {stroke: Ft},
        symbol: {fill: Ft},
        axis: {domainWidth: .5, grid: !0, labelPadding: 2, tickSize: 5, tickWidth: .5, titleFontWeight: "normal"},
        axisBand: {grid: !1},
        axisX: {gridWidth: .2},
        axisY: {gridDash: [3], gridWidth: .4},
        legend: {labelFontSize: 11, padding: 1, symbolType: "square"},
        range: {category: ["#3e5c69", "#6793a6", "#182429", "#0570b0", "#3690c0", "#74a9cf", "#a6bddb", "#e2ddf2"]}
    }, kt = "#1696d2", _t = "#000000", jt = "Lato", zt = "Lato", Mt = {
        "main-colors": ["#1696d2", "#d2d2d2", "#000000", "#fdbf11", "#ec008b", "#55b748", "#5c5859", "#db2b27"],
        "shades-blue": ["#CFE8F3", "#A2D4EC", "#73BFE2", "#46ABDB", "#1696D2", "#12719E", "#0A4C6A", "#062635"],
        "shades-gray": ["#F5F5F5", "#ECECEC", "#E3E3E3", "#DCDBDB", "#D2D2D2", "#9D9D9D", "#696969", "#353535"],
        "shades-yellow": ["#FFF2CF", "#FCE39E", "#FDD870", "#FCCB41", "#FDBF11", "#E88E2D", "#CA5800", "#843215"],
        "shades-magenta": ["#F5CBDF", "#EB99C2", "#E46AA7", "#E54096", "#EC008B", "#AF1F6B", "#761548", "#351123"],
        "shades-green": ["#DCEDD9", "#BCDEB4", "#98CF90", "#78C26D", "#55B748", "#408941", "#2C5C2D", "#1A2E19"],
        "shades-black": ["#D5D5D4", "#ADABAC", "#848081", "#5C5859", "#332D2F", "#262223", "#1A1717", "#0E0C0D"],
        "shades-red": ["#F8D5D4", "#F1AAA9", "#E9807D", "#E25552", "#DB2B27", "#A4201D", "#6E1614", "#370B0A"],
        "one-group": ["#1696d2", "#000000"],
        "two-groups-cat-1": ["#1696d2", "#000000"],
        "two-groups-cat-2": ["#1696d2", "#fdbf11"],
        "two-groups-cat-3": ["#1696d2", "#db2b27"],
        "two-groups-seq": ["#a2d4ec", "#1696d2"],
        "three-groups-cat": ["#1696d2", "#fdbf11", "#000000"],
        "three-groups-seq": ["#a2d4ec", "#1696d2", "#0a4c6a"],
        "four-groups-cat-1": ["#000000", "#d2d2d2", "#fdbf11", "#1696d2"],
        "four-groups-cat-2": ["#1696d2", "#ec0008b", "#fdbf11", "#5c5859"],
        "four-groups-seq": ["#cfe8f3", "#73bf42", "#1696d2", "#0a4c6a"],
        "five-groups-cat-1": ["#1696d2", "#fdbf11", "#d2d2d2", "#ec008b", "#000000"],
        "five-groups-cat-2": ["#1696d2", "#0a4c6a", "#d2d2d2", "#fdbf11", "#332d2f"],
        "five-groups-seq": ["#cfe8f3", "#73bf42", "#1696d2", "#0a4c6a", "#000000"],
        "six-groups-cat-1": ["#1696d2", "#ec008b", "#fdbf11", "#000000", "#d2d2d2", "#55b748"],
        "six-groups-cat-2": ["#1696d2", "#d2d2d2", "#ec008b", "#fdbf11", "#332d2f", "#0a4c6a"],
        "six-groups-seq": ["#cfe8f3", "#a2d4ec", "#73bfe2", "#46abdb", "#1696d2", "#12719e"],
        "diverging-colors": ["#ca5800", "#fdbf11", "#fdd870", "#fff2cf", "#cfe8f3", "#73bfe2", "#1696d2", "#0a4c6a"]
    }, Bt = {
        background: "#FFFFFF",
        title: {anchor: "start", fontSize: 18, font: jt},
        axisX: {
            domain: !0,
            domainColor: _t,
            domainWidth: 1,
            grid: !1,
            labelFontSize: 12,
            labelFont: zt,
            labelAngle: 0,
            tickColor: _t,
            tickSize: 5,
            titleFontSize: 12,
            titlePadding: 10,
            titleFont: jt
        },
        axisY: {
            domain: !1,
            domainWidth: 1,
            grid: !0,
            gridColor: "#DEDDDD",
            gridWidth: 1,
            labelFontSize: 12,
            labelFont: zt,
            labelPadding: 8,
            ticks: !1,
            titleFontSize: 12,
            titlePadding: 10,
            titleFont: jt,
            titleAngle: 0,
            titleY: -10,
            titleX: 18
        },
        legend: {
            labelFontSize: 12,
            labelFont: zt,
            symbolSize: 100,
            titleFontSize: 12,
            titlePadding: 10,
            titleFont: jt,
            orient: "right",
            offset: 10
        },
        view: {stroke: "transparent"},
        range: {
            category: Mt["six-groups-cat-1"],
            diverging: Mt["diverging-colors"],
            heatmap: Mt["diverging-colors"],
            ordinal: Mt["six-groups-seq"],
            ramp: Mt["shades-blue"]
        },
        area: {fill: kt},
        rect: {fill: kt},
        line: {color: kt, stroke: kt, strokeWidth: 5},
        trail: {color: kt, stroke: kt, strokeWidth: 0, size: 1},
        path: {stroke: kt, strokeWidth: .5},
        point: {filled: !0},
        text: {font: "Lato", color: kt, fontSize: 11, align: "center", fontWeight: 400, size: 11},
        style: {bar: {fill: kt, stroke: null}},
        arc: {fill: kt},
        shape: {stroke: kt},
        symbol: {fill: kt, size: 30}
    }, Gt = "#3366CC", Ut = "#ccc", Xt = "Arial, sans-serif", Vt = {
        arc: {fill: Gt},
        area: {fill: Gt},
        path: {stroke: Gt},
        rect: {fill: Gt},
        shape: {stroke: Gt},
        symbol: {stroke: Gt},
        circle: {fill: Gt},
        background: "#fff",
        padding: {top: 10, right: 10, bottom: 10, left: 10},
        style: {
            "guide-label": {font: Xt, fontSize: 12},
            "guide-title": {font: Xt, fontSize: 12},
            "group-title": {font: Xt, fontSize: 12}
        },
        title: {font: Xt, fontSize: 14, fontWeight: "bold", dy: -3, anchor: "start"},
        axis: {gridColor: Ut, tickColor: Ut, domain: !1, grid: !0},
        range: {
            category: ["#4285F4", "#DB4437", "#F4B400", "#0F9D58", "#AB47BC", "#00ACC1", "#FF7043", "#9E9D24", "#5C6BC0", "#F06292", "#00796B", "#C2185B"],
            heatmap: ["#c6dafc", "#5e97f6", "#2a56c6"]
        }
    }, Wt = "2.9.0";
    var Ht = Object.freeze({
        __proto__: null,
        dark: vt,
        excel: mt,
        fivethirtyeight: Ot,
        ggplot2: At,
        googlecharts: Vt,
        latimes: St,
        quartz: Dt,
        urbaninstitute: Bt,
        version: Wt,
        vox: Pt
    });

    function qt(e, t, r) {
        return e.fields = t || [], e.fname = r, e
    }

    function Yt(e) {
        return 1 === e.length ? Jt(e[0]) : Qt(e)
    }

    const Jt = e => function (t) {
        return t[e]
    }, Qt = e => {
        const t = e.length;
        return function (r) {
            for (let n = 0; n < t; ++n) r = r[e[n]];
            return r
        }
    };

    function Zt(e) {
        throw Error(e)
    }

    (function (e, t, r) {
        const n = function (e) {
            const t = [], r = e.length;
            let n, o, i, a = null, s = 0, l = "";

            function c() {
                t.push(l + e.substring(n, o)), l = "", n = o + 1
            }

            for (e += "", n = o = 0; o < r; ++o) if (i = e[o], "\\" === i) l += e.substring(n, o), l += e.substring(++o, ++o), n = o; else if (i === a) c(), a = null, s = -1; else {
                if (a) continue;
                n === s && '"' === i || n === s && "'" === i ? (n = o + 1, a = i) : "." !== i || s ? "[" === i ? (o > n && c(), s = n = o + 1) : "]" === i && (s || Zt("Access path missing open bracket: " + e), s > 0 && c(), s = 0, n = o + 1) : o > n ? c() : n = o + 1
            }
            return s && Zt("Access path missing closing bracket: " + e), a && Zt("Access path missing closing quote: " + e), o > n && (o++, c()), t
        }(e);
        e = 1 === n.length ? n[0] : e, qt((r && r.get || Yt)(n), [e], t || e)
    })("id"), qt(e => e, [], "identity"), qt(() => 0, [], "zero"), qt(() => 1, [], "one"), qt(() => !0, [], "true"), qt(() => !1, [], "false");
    var Kt = Array.isArray;

    function er(e) {
        return e === Object(e)
    }

    var tr = "#vg-tooltip-element {\n  visibility: hidden;\n  padding: 8px;\n  position: fixed;\n  z-index: 1000;\n  font-family: sans-serif;\n  font-size: 11px;\n  border-radius: 3px;\n  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);\n  /* The default theme is the light theme. */\n  background-color: rgba(255, 255, 255, 0.95);\n  border: 1px solid #d9d9d9;\n  color: black; }\n  #vg-tooltip-element.visible {\n    visibility: visible; }\n  #vg-tooltip-element h2 {\n    margin-top: 0;\n    margin-bottom: 10px;\n    font-size: 13px; }\n  #vg-tooltip-element img {\n    max-width: 200px;\n    max-height: 200px; }\n  #vg-tooltip-element table {\n    border-spacing: 0; }\n    #vg-tooltip-element table tr {\n      border: none; }\n      #vg-tooltip-element table tr td {\n        overflow: hidden;\n        text-overflow: ellipsis;\n        padding-top: 2px;\n        padding-bottom: 2px; }\n        #vg-tooltip-element table tr td.key {\n          color: #808080;\n          max-width: 150px;\n          text-align: right;\n          padding-right: 4px; }\n        #vg-tooltip-element table tr td.value {\n          display: block;\n          max-width: 300px;\n          max-height: 7em;\n          text-align: left; }\n  #vg-tooltip-element.dark-theme {\n    background-color: rgba(32, 32, 32, 0.9);\n    border: 1px solid #f5f5f5;\n    color: white; }\n    #vg-tooltip-element.dark-theme td.key {\n      color: #bfbfbf; }\n";
    const rr = "vg-tooltip-element", nr = {
        offsetX: 10,
        offsetY: 10,
        id: rr,
        styleId: "vega-tooltip-style",
        theme: "light",
        disableDefaultStyle: !1,
        sanitize: function (e) {
            return String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;")
        },
        maxDepth: 2
    };

    function or(e, t, r) {
        if (Kt(e)) return `[${e.map(e => t("string" == typeof e ? e : ir(e, r))).join(", ")}]`;
        if (er(e)) {
            let n = "";
            const o = e, {title: i, image: a} = o, s =
                /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
                function (e, t) {
                    var r = {};
                    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
                    if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                        var o = 0;
                        for (n = Object.getOwnPropertySymbols(e); o < n.length; o++) t.indexOf(n[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[o]) && (r[n[o]] = e[n[o]])
                    }
                    return r
                }(o, ["title", "image"]);
            i && (n += `<h2>${t(i)}</h2>`), a && (n += `<img src="${t(a)}">`);
            const l = Object.keys(s);
            if (l.length > 0) {
                n += "<table>";
                for (const e of l) {
                    let o = s[e];
                    void 0 !== o && (er(o) && (o = ir(o, r)), n += `<tr><td class="key">${t(e)}:</td><td class="value">${t(o)}</td></tr>`)
                }
                n += "</table>"
            }
            return n || "{}"
        }
        return t(e)
    }

    function ir(e, t) {
        return JSON.stringify(e, function (e) {
            const t = [];
            return function (r, n) {
                if ("object" != typeof n || null === n) return n;
                const o = t.indexOf(this) + 1;
                return t.length = o, t.length > e ? "[Object]" : t.indexOf(n) >= 0 ? "[Circular]" : (t.push(n), n)
            }
        }(t))
    }

    class ar {
        constructor(e) {
            this.options = Object.assign(Object.assign({}, nr), e);
            const t = this.options.id;
            if (this.call = this.tooltipHandler.bind(this), !this.options.disableDefaultStyle && !document.getElementById(this.options.styleId)) {
                const e = document.createElement("style");
                e.setAttribute("id", this.options.styleId), e.innerHTML = function (e) {
                    if (!/^[A-Za-z]+[-:.\w]*$/.test(e)) throw new Error("Invalid HTML ID");
                    return tr.toString().replace(rr, e)
                }(t);
                const r = document.head;
                r.childNodes.length > 0 ? r.insertBefore(e, r.childNodes[0]) : r.appendChild(e)
            }
            this.el = document.getElementById(t), this.el || (this.el = document.createElement("div"), this.el.setAttribute("id", t), this.el.classList.add("vg-tooltip"), document.body.appendChild(this.el))
        }

        tooltipHandler(e, t, r, n) {
            if (null == n || "" === n) return void this.el.classList.remove("visible", this.options.theme + "-theme");
            this.el.innerHTML = or(n, this.options.sanitize, this.options.maxDepth), this.el.classList.add("visible", this.options.theme + "-theme");
            const {x: o, y: i} = function (e, t, r, n) {
                let o = e.clientX + r;
                o + t.width > window.innerWidth && (o = +e.clientX - r - t.width);
                let i = e.clientY + n;
                return i + t.height > window.innerHeight && (i = +e.clientY - n - t.height), {x: o, y: i}
            }(t, this.el.getBoundingClientRect(), this.options.offsetX, this.options.offsetY);
            this.el.setAttribute("style", `top: ${i}px; left: ${o}px`)
        }
    }

    var sr;

    function lr(e) {
        return e.startsWith("http://") || e.startsWith("https://") || e.startsWith("//")
    }

    function cr(e) {
        for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        for (var n = 0, o = t; n < o.length; n++) {
            var i = o[n];
            pr(e, i)
        }
        return e
    }

    function pr(t, r) {
        for (var n = 0, o = Object.keys(r); n < o.length; n++) {
            var i = o[n];
            e.writeConfig(t, i, r[i], !0)
        }
    }

    String.prototype.startsWith || (String.prototype.startsWith = function (e, t) {
        return this.substr(!t || t < 0 ? 0 : +t, e.length) === e
    });
    var dr = n, ur = o, fr = "undefined" != typeof window ? window : void 0;
    void 0 === ur && (null === (sr = null == fr ? void 0 : fr.vl) || void 0 === sr ? void 0 : sr.compile) && (ur = fr.vl);
    var hr = {export: {svg: !0, png: !0}, source: !0, compiled: !0, editor: !0}, vr = {
            CLICK_TO_VIEW_ACTIONS: "Click to view actions",
            COMPILED_ACTION: "View Compiled Vega",
            EDITOR_ACTION: "Open in Vega Editor",
            PNG_ACTION: "Save as PNG",
            SOURCE_ACTION: "View Source",
            SVG_ACTION: "Save as SVG"
        }, gr = {vega: "Vega", "vega-lite": "Vega-Lite"},
        mr = {vega: dr.version, "vega-lite": ur ? ur.version : "not available"}, Er = {
            vega: function (e) {
                return e
            }, "vega-lite": function (e, t) {
                return ur.compile(e, {config: t}).spec
            }
        };

    function br(e, t, r, n) {
        var o = "<html><head>" + t + '</head><body><pre><code class="json">',
            i = "</code></pre>" + r + "</body></html>", a = window.open("");
        a.document.write(o + e + i), a.document.title = gr[n] + " JSON Source"
    }

    function yr(t, r, n) {
        var o, l, c;
        return void 0 === n && (n = {}), a(this, void 0, void 0, (function () {
            var a, p, d, u, f, h, v, g;
            return s(this, (function (s) {
                switch (s.label) {
                    case 0:
                        return m = n.loader, a = m && "load" in m ? n.loader : dr.loader(n.loader), e.isString(r) ? (f = (u = JSON).parse, [4, a.load(r)]) : [3, 2];
                    case 1:
                        return d = f.apply(u, [s.sent()]), [3, 3];
                    case 2:
                        d = r, s.label = 3;
                    case 3:
                        return [4, wr(null !== (o = (p = d).usermeta && p.usermeta.embedOptions) && void 0 !== o ? o : {}, a)];
                    case 4:
                        return h = s.sent(), [4, wr(n, a)];
                    case 5:
                        return v = s.sent(), g = i(i({}, cr(v, h)), {config: e.mergeConfig(null !== (l = v.config) && void 0 !== l ? l : {}, null !== (c = h.config) && void 0 !== c ? c : {})}), [4, Or(t, p, g, a)];
                    case 6:
                        return [2, s.sent()]
                }
                var m
            }))
        }))
    }

    function wr(t, r) {
        var n;
        return a(this, void 0, void 0, (function () {
            var o, a, l, c, p, d, u, f;
            return s(this, (function (s) {
                switch (s.label) {
                    case 0:
                        return e.isString(t.config) ? (c = (l = JSON).parse, [4, r.load(t.config)]) : [3, 2];
                    case 1:
                        return a = c.apply(l, [s.sent()]), [3, 3];
                    case 2:
                        a = null !== (n = t.config) && void 0 !== n ? n : {}, s.label = 3;
                    case 3:
                        return o = a, e.isString(t.patch) ? (f = (u = JSON).parse, [4, r.load(t.patch)]) : [3, 5];
                    case 4:
                        return d = f.apply(u, [s.sent()]), [3, 6];
                    case 5:
                        d = t.patch, s.label = 6;
                    case 6:
                        return p = d, [2, i(i(i({}, t), p ? {patch: p} : {}), o ? {config: o} : {})]
                }
            }))
        }))
    }

    function Or(t, r, n, o) {
        var l, c, p, d, u, f;
        return void 0 === n && (n = {}), a(this, void 0, void 0, (function () {
            function h() {
                U && document.removeEventListener("click", U), k.finalize()
            }

            var v, g, m, E, b, y, w, O, I, A, N, T, L, $, S, x, C, D, F, P, k, j, z, M, B, G, U, X, V, W, H, q, Y, J, Q,
                Z, K, ee;
            return s(this, (function (te) {
                switch (te.label) {
                    case 0:
                        if (v = n.theme ? e.mergeConfig(Ht[n.theme], null !== (l = n.config) && void 0 !== l ? l : {}) : n.config, g = e.isBoolean(n.actions) ? n.actions : cr({}, hr, null !== (c = n.actions) && void 0 !== c ? c : {}), m = i(i({}, vr), n.i18n), E = null !== (p = n.renderer) && void 0 !== p ? p : "canvas", b = null !== (d = n.logLevel) && void 0 !== d ? d : dr.Warn, y = null !== (u = n.downloadFileName) && void 0 !== u ? u : "visualization", !(w = "string" == typeof t ? document.querySelector(t) : t)) throw new Error(t + " does not exist");
                        return !1 !== n.defaultStyle && (O = "vega-embed-style", I = function (e) {
                            var t, r = e.getRootNode ? e.getRootNode() : document;
                            return r instanceof ShadowRoot ? {root: r, rootContainer: r} : {
                                root: document,
                                rootContainer: null !== (t = document.head) && void 0 !== t ? t : document.body
                            }
                        }(w), A = I.root, N = I.rootContainer, A.getElementById(O) || ((T = document.createElement("style")).id = O, T.innerText = void 0 === n.defaultStyle || !0 === n.defaultStyle ? '.vega-embed {\n  position: relative;\n  display: inline-block;\n  box-sizing: border-box; }\n  .vega-embed.has-actions {\n    padding-right: 38px; }\n  .vega-embed details:not([open]) > :not(summary) {\n    display: none !important; }\n  .vega-embed summary {\n    list-style: none;\n    position: absolute;\n    top: 0;\n    right: 0;\n    padding: 6px;\n    z-index: 1000;\n    background: white;\n    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);\n    color: #1b1e23;\n    border: 1px solid #aaa;\n    border-radius: 999px;\n    opacity: 0.2;\n    transition: opacity 0.4s ease-in;\n    outline: none;\n    cursor: pointer;\n    line-height: 0px; }\n    .vega-embed summary::-webkit-details-marker {\n      display: none; }\n    .vega-embed summary:active {\n      box-shadow: #aaa 0px 0px 0px 1px inset; }\n    .vega-embed summary svg {\n      width: 14px;\n      height: 14px; }\n  .vega-embed details[open] summary {\n    opacity: 0.7; }\n  .vega-embed:hover summary,\n  .vega-embed:focus summary {\n    opacity: 1 !important;\n    transition: opacity 0.2s ease; }\n  .vega-embed .vega-actions {\n    position: absolute;\n    z-index: 1001;\n    top: 35px;\n    right: -9px;\n    display: flex;\n    flex-direction: column;\n    padding-bottom: 8px;\n    padding-top: 8px;\n    border-radius: 4px;\n    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);\n    border: 1px solid #d9d9d9;\n    background: white;\n    animation-duration: 0.15s;\n    animation-name: scale-in;\n    animation-timing-function: cubic-bezier(0.2, 0, 0.13, 1.5);\n    text-align: left; }\n    .vega-embed .vega-actions a {\n      padding: 8px 16px;\n      font-family: sans-serif;\n      font-size: 14px;\n      font-weight: 600;\n      white-space: nowrap;\n      color: #434a56;\n      text-decoration: none; }\n      .vega-embed .vega-actions a:hover {\n        background-color: #f7f7f9;\n        color: black; }\n    .vega-embed .vega-actions::before, .vega-embed .vega-actions::after {\n      content: "";\n      display: inline-block;\n      position: absolute; }\n    .vega-embed .vega-actions::before {\n      left: auto;\n      right: 14px;\n      top: -16px;\n      border: 8px solid #0000;\n      border-bottom-color: #d9d9d9; }\n    .vega-embed .vega-actions::after {\n      left: auto;\n      right: 15px;\n      top: -14px;\n      border: 7px solid #0000;\n      border-bottom-color: #fff; }\n  .vega-embed .chart-wrapper {\n    width: 100%;\n    height: 100%; }\n\n.vega-embed-wrapper {\n  max-width: 100%;\n  overflow: scroll;\n  padding-right: 14px; }\n\n@keyframes scale-in {\n  from {\n    opacity: 0;\n    transform: scale(0.6); }\n  to {\n    opacity: 1;\n    transform: scale(1); } }\n'.toString() : n.defaultStyle, N.appendChild(T))), L = function (e, t) {
                            var r;
                            if (e.$schema) {
                                var n = ft(e.$schema);
                                t && t !== n.library && console.warn("The given visualization spec is written in " + gr[n.library] + ", but mode argument sets " + (null !== (r = gr[t]) && void 0 !== r ? r : t) + ".");
                                var o = n.library;
                                return ut.satisfies(mr[o], "^" + n.version.slice(1)) || console.warn("The input spec uses " + gr[o] + " " + n.version + ", but the current version of " + gr[o] + " is v" + mr[o] + "."), o
                            }
                            return "mark" in e || "encoding" in e || "layer" in e || "hconcat" in e || "vconcat" in e || "facet" in e || "repeat" in e ? "vega-lite" : "marks" in e || "signals" in e || "scales" in e || "axes" in e ? "vega" : null != t ? t : "vega"
                        }(r, n.mode), $ = Er[L](r, v), "vega-lite" === L && $.$schema && (S = ft($.$schema), ut.satisfies(mr.vega, "^" + S.version.slice(1)) || console.warn("The compiled spec uses Vega " + S.version + ", but current version is v" + mr.vega + ".")), w.classList.add("vega-embed"), g && w.classList.add("has-actions"), w.innerHTML = "", x = w, g && ((C = document.createElement("div")).classList.add("chart-wrapper"), w.appendChild(C), x = C), (D = n.patch) && ($ = D instanceof Function ? D($) : R($, D, !0, !1).newDocument), n.formatLocale && dr.formatLocale(n.formatLocale), n.timeFormatLocale && dr.timeFormatLocale(n.timeFormatLocale), F = n.ast, P = dr.parse($, "vega-lite" === L ? {} : v, {ast: F}), k = new dr.View(P, i({
                            loader: o,
                            logLevel: b,
                            renderer: E
                        }, F ? {expr: dr.expressionInterpreter} : {})), !1 !== n.tooltip && (j = void 0, re = n.tooltip, j = "function" == typeof re ? n.tooltip : new ar(!0 === n.tooltip ? {} : n.tooltip).call, k.tooltip(j)), void 0 === (z = n.hover) && (z = "vega" === L), z && (B = (M = "boolean" == typeof z ? {} : z).hoverSet, G = M.updateSet, k.hover(B, G)), n && (null != n.width && k.width(n.width), null != n.height && k.height(n.height), null != n.padding && k.padding(n.padding)), [4, k.initialize(x).runAsync()];
                    case 1:
                        if (te.sent(), !1 !== g) {
                            if (X = w, !1 !== n.defaultStyle && ((V = document.createElement("details")).title = m.CLICK_TO_VIEW_ACTIONS, w.append(V), X = V, (W = document.createElement("summary")).innerHTML = '\n<svg viewBox="0 0 16 16" fill="currentColor" stroke="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">\n  <circle r="2" cy="8" cx="2"></circle>\n  <circle r="2" cy="8" cx="8"></circle>\n  <circle r="2" cy="8" cx="14"></circle>\n</svg>', V.append(W), U = function (e) {
                                V.contains(e.target) || V.removeAttribute("open")
                            }, document.addEventListener("click", U)), H = document.createElement("div"), X.append(H), H.classList.add("vega-actions"), !0 === g || !1 !== g.export) for (q = function (e) {
                                if (!0 === g || !0 === g.export || g.export[e]) {
                                    var t = m[e.toUpperCase() + "_ACTION"], r = document.createElement("a");
                                    r.text = t, r.href = "#", r.target = "_blank", r.download = y + "." + e, r.addEventListener("mousedown", (function (t) {
                                        return a(this, void 0, void 0, (function () {
                                            var r;
                                            return s(this, (function (o) {
                                                switch (o.label) {
                                                    case 0:
                                                        return t.preventDefault(), [4, k.toImageURL(e, n.scaleFactor)];
                                                    case 1:
                                                        return r = o.sent(), this.href = r, [2]
                                                }
                                            }))
                                        }))
                                    })), H.append(r)
                                }
                            }, Y = 0, J = ["svg", "png"]; Y < J.length; Y++) q(J[Y]);
                            !0 !== g && !1 === g.source || ((Q = document.createElement("a")).text = m.SOURCE_ACTION, Q.href = "#", Q.addEventListener("click", (function (e) {
                                var t, o;
                                br(_(r), null !== (t = n.sourceHeader) && void 0 !== t ? t : "", null !== (o = n.sourceFooter) && void 0 !== o ? o : "", L), e.preventDefault()
                            })), H.append(Q)), "vega-lite" !== L || !0 !== g && !1 === g.compiled || ((Z = document.createElement("a")).text = m.COMPILED_ACTION, Z.href = "#", Z.addEventListener("click", (function (e) {
                                var t, r;
                                br(_($), null !== (t = n.sourceHeader) && void 0 !== t ? t : "", null !== (r = n.sourceFooter) && void 0 !== r ? r : "", "vega"), e.preventDefault()
                            })), H.append(Z)), !0 !== g && !1 === g.editor || (K = null !== (f = n.editorUrl) && void 0 !== f ? f : "https://vega.github.io/editor/", (ee = document.createElement("a")).text = m.EDITOR_ACTION, ee.href = "#", ee.addEventListener("click", (function (e) {
                                !function (e, t, r) {
                                    var n = e.open(t), o = new URL(t).origin, i = 40;
                                    e.addEventListener("message", (function t(r) {
                                        r.source === n && (i = 0, e.removeEventListener("message", t, !1))
                                    }), !1), setTimeout((function e() {
                                        i <= 0 || (n.postMessage(r, o), setTimeout(e, 250), i -= 1)
                                    }), 250)
                                }(window, K, {config: v, mode: L, renderer: E, spec: _(r)}), e.preventDefault()
                            })), H.append(ee))
                        }
                        return [2, {view: k, spec: r, vgSpec: $, finalize: h}]
                }
                var re
            }))
        }))
    }

    function Ir(e, t) {
        var r;
        return void 0 === t && (t = {}), a(this, void 0, void 0, (function () {
            var n, o, a, l;
            return s(this, (function (s) {
                switch (s.label) {
                    case 0:
                        return (n = document.createElement("div")).classList.add("vega-embed-wrapper"), o = document.createElement("div"), n.appendChild(o), a = !0 === t.actions || !1 === t.actions ? t.actions : i({
                            export: !0,
                            source: !1,
                            compiled: !0,
                            editor: !0
                        }, null !== (r = t.actions) && void 0 !== r ? r : {}), [4, yr(o, e, i({actions: a}, null != t ? t : {}))];
                    case 1:
                        return l = s.sent(), n.value = l.view, [2, n]
                }
            }))
        }))
    }

    function Ar(e) {
        return e instanceof HTMLElement
    }

    var Rr = function () {
        for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
        return t.length > 1 && (e.isString(t[0]) && !lr(t[0]) || Ar(t[0]) || 3 === t.length) ? yr(t[0], t[1], t[2]) : Ir(t[0], t[1])
    };
    return Rr.vegaLite = ur, Rr.vl = ur, Rr.container = Ir, Rr.embed = yr, Rr.vega = dr, Rr.default = yr, Rr.version = "6.12.2", Rr
}));
//# sourceMappingURL=vega-embed.min.js.map
