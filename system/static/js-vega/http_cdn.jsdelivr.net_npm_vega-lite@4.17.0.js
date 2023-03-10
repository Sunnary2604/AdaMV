!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).vegaLite = {})
}(this, (function (e) {
    "use strict";

    function t(e, t, n) {
        return e.fields = t || [], e.fname = n, e
    }

    function n(e) {
        return 1 === e.length ? i(e[0]) : o(e)
    }

    const i = e => function (t) {
        return t[e]
    }, o = e => {
        const t = e.length;
        return function (n) {
            for (let i = 0; i < t; ++i) n = n[e[i]];
            return n
        }
    };

    function r(e) {
        throw Error(e)
    }

    function a(e) {
        const t = [], n = e.length;
        let i, o, a, s = null, c = 0, u = "";

        function l() {
            t.push(u + e.substring(i, o)), u = "", i = o + 1
        }

        for (e += "", i = o = 0; o < n; ++o) if (a = e[o], "\\" === a) u += e.substring(i, o), u += e.substring(++o, ++o), i = o; else if (a === s) l(), s = null, c = -1; else {
            if (s) continue;
            i === c && '"' === a || i === c && "'" === a ? (i = o + 1, s = a) : "." !== a || c ? "[" === a ? (o > i && l(), c = i = o + 1) : "]" === a && (c || r("Access path missing open bracket: " + e), c > 0 && l(), c = 0, i = o + 1) : o > i ? l() : i = o + 1
        }
        return c && r("Access path missing closing bracket: " + e), s && r("Access path missing closing quote: " + e), o > i && (o++, l()), t
    }

    !function (e, i, o) {
        const r = a(e);
        e = 1 === r.length ? r[0] : e, t((o && o.get || n)(r), [e], i || e)
    }("id");
    const s = t((e => e), [], "identity");
    t((() => 0), [], "zero"), t((() => 1), [], "one"), t((() => !0), [], "true"), t((() => !1), [], "false");

    function c(e, t, n) {
        const i = [t].concat([].slice.call(n));
        console[e].apply(console, i)
    }

    var u = Array.isArray;

    function l(e) {
        return e === Object(e)
    }

    const f = e => "__proto__" !== e;

    function d(...e) {
        return e.reduce(((e, t) => {
            for (const n in t) if ("signals" === n) e.signals = m(e.signals, t.signals); else {
                const i = "legend" === n ? {layout: 1} : "style" === n || null;
                p(e, n, t[n], i)
            }
            return e
        }), {})
    }

    function p(e, t, n, i) {
        if (!f(t)) return;
        let o, r;
        if (l(n) && !u(n)) for (o in r = l(e[t]) ? e[t] : e[t] = {}, n) i && (!0 === i || i[o]) ? p(r, o, n[o]) : f(o) && (r[o] = n[o]); else e[t] = n
    }

    function m(e, t) {
        if (null == e) return t;
        const n = {}, i = [];

        function o(e) {
            n[e.name] || (n[e.name] = 1, i.push(e))
        }

        return t.forEach(o), e.forEach(o), i
    }

    function h(e) {
        return null != e ? u(e) ? e : [e] : []
    }

    const g = Object.prototype.hasOwnProperty;

    function v(e, t) {
        return g.call(e, t)
    }

    function y(e) {
        return "boolean" == typeof e
    }

    function b(e) {
        return "number" == typeof e
    }

    function x(e) {
        return "string" == typeof e
    }

    function w(e) {
        return u(e) ? "[" + e.map(w) + "]" : l(e) || x(e) ? JSON.stringify(e).replace("\u2028", "\\u2028").replace("\u2029", "\\u2029") : e
    }

    function A(e) {
        const t = {}, n = e.length;
        for (let i = 0; i < n; ++i) t[e[i]] = !0;
        return t
    }

    Array.prototype.flat || Object.defineProperty(Array.prototype, "flat", {
        configurable: !0, value: function e() {
            var t = isNaN(arguments[0]) ? 1 : Number(arguments[0]);
            return t ? Array.prototype.reduce.call(this, (function (n, i) {
                return Array.isArray(i) ? n.push.apply(n, e.call(i, t - 1)) : n.push(i), n
            }), []) : Array.prototype.slice.call(this)
        }, writable: !0
    }), Array.prototype.flatMap || Object.defineProperty(Array.prototype, "flatMap", {
        configurable: !0,
        value: function (e) {
            return Array.prototype.map.apply(this, arguments).flat()
        },
        writable: !0
    });
    var D = function (e, t, n) {
        return e(n = {
            path: t, exports: {}, require: function (e, t) {
                return function () {
                    throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")
                }(null == t && n.path)
            }
        }, n.exports), n.exports
    }((function (e) {
        var t = function () {
            function e(e, t) {
                return null != t && e instanceof t
            }

            var t, n, i;
            try {
                t = Map
            } catch (e) {
                t = function () {
                }
            }
            try {
                n = Set
            } catch (e) {
                n = function () {
                }
            }
            try {
                i = Promise
            } catch (e) {
                i = function () {
                }
            }

            function o(r, s, c, u, l) {
                "object" == typeof s && (c = s.depth, u = s.prototype, l = s.includeNonEnumerable, s = s.circular);
                var f = [], d = [], p = "undefined" != typeof Buffer;
                return void 0 === s && (s = !0), void 0 === c && (c = 1 / 0), function r(c, m) {
                    if (null === c) return null;
                    if (0 === m) return c;
                    var h, g;
                    if ("object" != typeof c) return c;
                    if (e(c, t)) h = new t; else if (e(c, n)) h = new n; else if (e(c, i)) h = new i((function (e, t) {
                        c.then((function (t) {
                            e(r(t, m - 1))
                        }), (function (e) {
                            t(r(e, m - 1))
                        }))
                    })); else if (o.__isArray(c)) h = []; else if (o.__isRegExp(c)) h = new RegExp(c.source, a(c)), c.lastIndex && (h.lastIndex = c.lastIndex); else if (o.__isDate(c)) h = new Date(c.getTime()); else {
                        if (p && Buffer.isBuffer(c)) return h = Buffer.allocUnsafe ? Buffer.allocUnsafe(c.length) : new Buffer(c.length), c.copy(h), h;
                        e(c, Error) ? h = Object.create(c) : void 0 === u ? (g = Object.getPrototypeOf(c), h = Object.create(g)) : (h = Object.create(u), g = u)
                    }
                    if (s) {
                        var v = f.indexOf(c);
                        if (-1 != v) return d[v];
                        f.push(c), d.push(h)
                    }
                    for (var y in e(c, t) && c.forEach((function (e, t) {
                        var n = r(t, m - 1), i = r(e, m - 1);
                        h.set(n, i)
                    })), e(c, n) && c.forEach((function (e) {
                        var t = r(e, m - 1);
                        h.add(t)
                    })), c) {
                        var b;
                        g && (b = Object.getOwnPropertyDescriptor(g, y)), b && null == b.set || (h[y] = r(c[y], m - 1))
                    }
                    if (Object.getOwnPropertySymbols) {
                        var x = Object.getOwnPropertySymbols(c);
                        for (y = 0; y < x.length; y++) {
                            var w = x[y];
                            (!(D = Object.getOwnPropertyDescriptor(c, w)) || D.enumerable || l) && (h[w] = r(c[w], m - 1), D.enumerable || Object.defineProperty(h, w, {enumerable: !1}))
                        }
                    }
                    if (l) {
                        var A = Object.getOwnPropertyNames(c);
                        for (y = 0; y < A.length; y++) {
                            var D, F = A[y];
                            (D = Object.getOwnPropertyDescriptor(c, F)) && D.enumerable || (h[F] = r(c[F], m - 1), Object.defineProperty(h, F, {enumerable: !1}))
                        }
                    }
                    return h
                }(r, c)
            }

            function r(e) {
                return Object.prototype.toString.call(e)
            }

            function a(e) {
                var t = "";
                return e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), t
            }

            return o.clonePrototype = function (e) {
                if (null === e) return null;
                var t = function () {
                };
                return t.prototype = e, new t
            }, o.__objToStr = r, o.__isDate = function (e) {
                return "object" == typeof e && "[object Date]" === r(e)
            }, o.__isArray = function (e) {
                return "object" == typeof e && "[object Array]" === r(e)
            }, o.__isRegExp = function (e) {
                return "object" == typeof e && "[object RegExp]" === r(e)
            }, o.__getRegExpFlags = a, o
        }();
        e.exports && (e.exports = t)
    })), F = function (e, t) {
        t || (t = {}), "function" == typeof t && (t = {cmp: t});
        var n, i = "boolean" == typeof t.cycles && t.cycles, o = t.cmp && (n = t.cmp, function (e) {
            return function (t, i) {
                var o = {key: t, value: e[t]}, r = {key: i, value: e[i]};
                return n(o, r)
            }
        }), r = [];
        return function e(t) {
            if (t && t.toJSON && "function" == typeof t.toJSON && (t = t.toJSON()), void 0 !== t) {
                if ("number" == typeof t) return isFinite(t) ? "" + t : "null";
                if ("object" != typeof t) return JSON.stringify(t);
                var n, a;
                if (Array.isArray(t)) {
                    for (a = "[", n = 0; n < t.length; n++) n && (a += ","), a += e(t[n]) || "null";
                    return a + "]"
                }
                if (null === t) return "null";
                if (-1 !== r.indexOf(t)) {
                    if (i) return JSON.stringify("__cycle__");
                    throw new TypeError("Converting circular structure to JSON")
                }
                var s = r.push(t) - 1, c = Object.keys(t).sort(o && o(t));
                for (a = "", n = 0; n < c.length; n++) {
                    var u = c[n], l = e(t[u]);
                    l && (a && (a += ","), a += JSON.stringify(u) + ":" + l)
                }
                return r.splice(s, 1), "{" + a + "}"
            }
        }(e)
    };

    function k(e) {
        return !!e.or
    }

    function C(e) {
        return !!e.and
    }

    function E(e) {
        return !!e.not
    }

    function S(e, t) {
        if (E(e)) S(e.not, t); else if (C(e)) for (const n of e.and) S(n, t); else if (k(e)) for (const n of e.or) S(n, t); else t(e)
    }

    function B(e, t) {
        return E(e) ? {not: B(e.not, t)} : C(e) ? {and: e.and.map((e => B(e, t)))} : k(e) ? {or: e.or.map((e => B(e, t)))} : t(e)
    }

    const _ = function e(t, n) {
        if (t === n) return !0;
        if (t && n && "object" == typeof t && "object" == typeof n) {
            if (t.constructor !== n.constructor) return !1;
            var i, o, r;
            if (Array.isArray(t)) {
                if ((i = t.length) != n.length) return !1;
                for (o = i; 0 != o--;) if (!e(t[o], n[o])) return !1;
                return !0
            }
            if (t.constructor === RegExp) return t.source === n.source && t.flags === n.flags;
            if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === n.valueOf();
            if (t.toString !== Object.prototype.toString) return t.toString() === n.toString();
            if ((i = (r = Object.keys(t)).length) !== Object.keys(n).length) return !1;
            for (o = i; 0 != o--;) if (!Object.prototype.hasOwnProperty.call(n, r[o])) return !1;
            for (o = i; 0 != o--;) {
                var a = r[o];
                if (!e(t[a], n[a])) return !1
            }
            return !0
        }
        return t != t && n != n
    }, z = D;

    function O(e, t) {
        const n = {};
        for (const i of t) v(e, i) && (n[i] = e[i]);
        return n
    }

    function N(e, t) {
        const n = {...e};
        for (const e of t) delete n[e];
        return n
    }

    Set.prototype.toJSON = function () {
        return "Set(".concat([...this].map((e => F(e))).join(","), ")")
    };
    const P = F;

    function j(e) {
        if (b(e)) return e;
        const t = x(e) ? e : F(e);
        if (t.length < 250) return t;
        let n = 0;
        for (let e = 0; e < t.length; e++) {
            n = (n << 5) - n + t.charCodeAt(e), n &= n
        }
        return n
    }

    function M(e) {
        return !1 === e || null === e
    }

    function T(e, t) {
        return e.indexOf(t) > -1
    }

    function L(e, t) {
        let n = 0;
        for (const [i, o] of e.entries()) if (t(o, i, n++)) return !0;
        return !1
    }

    function q(e, t) {
        let n = 0;
        for (const [i, o] of e.entries()) if (!t(o, i, n++)) return !1;
        return !0
    }

    function R(e, ...t) {
        for (const n of t) W(e, null != n ? n : {});
        return e
    }

    function W(e, t) {
        for (const n of J(t)) p(e, n, t[n], !0)
    }

    function U(e, t) {
        const n = [], i = {};
        let o;
        for (const r of e) o = t(r), o in i || (i[o] = 1, n.push(r));
        return n
    }

    function I(e, t) {
        if (e.size !== t.size) return !1;
        for (const n of e) if (!t.has(n)) return !1;
        return !0
    }

    function H(e, t) {
        for (const n of e) if (t.has(n)) return !0;
        return !1
    }

    function G(e) {
        const t = new Set;
        for (const n of e) {
            const e = a(n).map(((e, t) => 0 === t ? e : "[".concat(e, "]"))),
                i = e.map(((t, n) => e.slice(0, n + 1).join("")));
            for (const e of i) t.add(e)
        }
        return t
    }

    function V(e, t) {
        return void 0 === e || void 0 === t || H(G(e), G(t))
    }

    function Y(e) {
        return 0 === J(e).length
    }

    const J = Object.keys, X = Object.values, Q = Object.entries;

    function $(e) {
        return !0 === e || !1 === e
    }

    function K(e) {
        const t = e.replace(/\W/g, "_");
        return (e.match(/^\d+/) ? "_" : "") + t
    }

    function Z(e, t) {
        return E(e) ? "!(" + Z(e.not, t) + ")" : C(e) ? "(" + e.and.map((e => Z(e, t))).join(") && (") + ")" : k(e) ? "(" + e.or.map((e => Z(e, t))).join(") || (") + ")" : t(e)
    }

    function ee(e, t) {
        if (0 === t.length) return !0;
        const n = t.shift();
        return n in e && ee(e[n], t) && delete e[n], Y(e)
    }

    function te(e) {
        return e.charAt(0).toUpperCase() + e.substr(1)
    }

    function ne(e, t = "datum") {
        const n = a(e), i = [];
        for (let e = 1; e <= n.length; e++) {
            const o = "[".concat(n.slice(0, e).map(w).join("]["), "]");
            i.push("".concat(t).concat(o))
        }
        return i.join(" && ")
    }

    function ie(e, t = "datum") {
        return "".concat(t, "[").concat(w(a(e).join(".")), "]")
    }

    function oe(e) {
        return e.replace(/(\[|\]|\.|'|")/g, "\\$1")
    }

    function re(e) {
        return "".concat(a(e).map(oe).join("\\."))
    }

    function ae(e, t, n) {
        return e.replace(new RegExp(t.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"), "g"), n)
    }

    function se(e) {
        return "".concat(a(e).join("."))
    }

    function ce(e) {
        return e ? a(e).length : 0
    }

    function ue(...e) {
        for (const t of e) if (void 0 !== t) return t
    }

    let le = 42;

    function fe(e) {
        const t = ++le;
        return e ? String(e) + t : t
    }

    function de(e) {
        return pe(e) ? e : "__".concat(e)
    }

    function pe(e) {
        return 0 === e.indexOf("__")
    }

    function me(e) {
        if (void 0 !== e) return (e % 360 + 360) % 360
    }

    function he(e) {
        return !!b(e) || !isNaN(e) && !isNaN(parseFloat(e))
    }

    const ge = {
        labelAlign: {part: "labels", vgProp: "align"},
        labelBaseline: {part: "labels", vgProp: "baseline"},
        labelColor: {part: "labels", vgProp: "fill"},
        labelFont: {part: "labels", vgProp: "font"},
        labelFontSize: {part: "labels", vgProp: "fontSize"},
        labelFontStyle: {part: "labels", vgProp: "fontStyle"},
        labelFontWeight: {part: "labels", vgProp: "fontWeight"},
        labelOpacity: {part: "labels", vgProp: "opacity"},
        labelOffset: null,
        labelPadding: null,
        gridColor: {part: "grid", vgProp: "stroke"},
        gridDash: {part: "grid", vgProp: "strokeDash"},
        gridDashOffset: {part: "grid", vgProp: "strokeDashOffset"},
        gridOpacity: {part: "grid", vgProp: "opacity"},
        gridWidth: {part: "grid", vgProp: "strokeWidth"},
        tickColor: {part: "ticks", vgProp: "stroke"},
        tickDash: {part: "ticks", vgProp: "strokeDash"},
        tickDashOffset: {part: "ticks", vgProp: "strokeDashOffset"},
        tickOpacity: {part: "ticks", vgProp: "opacity"},
        tickSize: null,
        tickWidth: {part: "ticks", vgProp: "strokeWidth"}
    };

    function ve(e) {
        return e && e.condition
    }

    const ye = ["domain", "grid", "labels", "ticks", "title"], be = {
        grid: "grid",
        gridCap: "grid",
        gridColor: "grid",
        gridDash: "grid",
        gridDashOffset: "grid",
        gridOpacity: "grid",
        gridScale: "grid",
        gridWidth: "grid",
        orient: "main",
        bandPosition: "both",
        aria: "main",
        description: "main",
        domain: "main",
        domainCap: "main",
        domainColor: "main",
        domainDash: "main",
        domainDashOffset: "main",
        domainOpacity: "main",
        domainWidth: "main",
        format: "main",
        formatType: "main",
        labelAlign: "main",
        labelAngle: "main",
        labelBaseline: "main",
        labelBound: "main",
        labelColor: "main",
        labelFlush: "main",
        labelFlushOffset: "main",
        labelFont: "main",
        labelFontSize: "main",
        labelFontStyle: "main",
        labelFontWeight: "main",
        labelLimit: "main",
        labelLineHeight: "main",
        labelOffset: "main",
        labelOpacity: "main",
        labelOverlap: "main",
        labelPadding: "main",
        labels: "main",
        labelSeparation: "main",
        maxExtent: "main",
        minExtent: "main",
        offset: "both",
        position: "main",
        tickCap: "main",
        tickColor: "main",
        tickDash: "main",
        tickDashOffset: "main",
        tickMinStep: "main",
        tickOffset: "both",
        tickOpacity: "main",
        tickRound: "both",
        ticks: "main",
        tickSize: "main",
        tickWidth: "both",
        title: "main",
        titleAlign: "main",
        titleAnchor: "main",
        titleAngle: "main",
        titleBaseline: "main",
        titleColor: "main",
        titleFont: "main",
        titleFontSize: "main",
        titleFontStyle: "main",
        titleFontWeight: "main",
        titleLimit: "main",
        titleLineHeight: "main",
        titleOpacity: "main",
        titlePadding: "main",
        titleX: "main",
        titleY: "main",
        encode: "both",
        scale: "both",
        tickBand: "both",
        tickCount: "both",
        tickExtra: "both",
        translate: "both",
        values: "both",
        zindex: "both"
    }, xe = {
        orient: 1,
        aria: 1,
        bandPosition: 1,
        description: 1,
        domain: 1,
        domainCap: 1,
        domainColor: 1,
        domainDash: 1,
        domainDashOffset: 1,
        domainOpacity: 1,
        domainWidth: 1,
        format: 1,
        formatType: 1,
        grid: 1,
        gridCap: 1,
        gridColor: 1,
        gridDash: 1,
        gridDashOffset: 1,
        gridOpacity: 1,
        gridWidth: 1,
        labelAlign: 1,
        labelAngle: 1,
        labelBaseline: 1,
        labelBound: 1,
        labelColor: 1,
        labelFlush: 1,
        labelFlushOffset: 1,
        labelFont: 1,
        labelFontSize: 1,
        labelFontStyle: 1,
        labelFontWeight: 1,
        labelLimit: 1,
        labelLineHeight: 1,
        labelOffset: 1,
        labelOpacity: 1,
        labelOverlap: 1,
        labelPadding: 1,
        labels: 1,
        labelSeparation: 1,
        maxExtent: 1,
        minExtent: 1,
        offset: 1,
        position: 1,
        tickBand: 1,
        tickCap: 1,
        tickColor: 1,
        tickCount: 1,
        tickDash: 1,
        tickDashOffset: 1,
        tickExtra: 1,
        tickMinStep: 1,
        tickOffset: 1,
        tickOpacity: 1,
        tickRound: 1,
        ticks: 1,
        tickSize: 1,
        tickWidth: 1,
        title: 1,
        titleAlign: 1,
        titleAnchor: 1,
        titleAngle: 1,
        titleBaseline: 1,
        titleColor: 1,
        titleFont: 1,
        titleFontSize: 1,
        titleFontStyle: 1,
        titleFontWeight: 1,
        titleLimit: 1,
        titleLineHeight: 1,
        titleOpacity: 1,
        titlePadding: 1,
        titleX: 1,
        titleY: 1,
        translate: 1,
        values: 1,
        zindex: 1
    }, we = {...xe, style: 1, labelExpr: 1, encoding: 1};

    function Ae(e) {
        return !!we[e]
    }

    const De = J({
        axis: 1,
        axisBand: 1,
        axisBottom: 1,
        axisDiscrete: 1,
        axisLeft: 1,
        axisPoint: 1,
        axisQuantitative: 1,
        axisRight: 1,
        axisTemporal: 1,
        axisTop: 1,
        axisX: 1,
        axisXBand: 1,
        axisXDiscrete: 1,
        axisXPoint: 1,
        axisXQuantitative: 1,
        axisXTemporal: 1,
        axisY: 1,
        axisYBand: 1,
        axisYDiscrete: 1,
        axisYPoint: 1,
        axisYQuantitative: 1,
        axisYTemporal: 1
    }), Fe = {
        argmax: 1,
        argmin: 1,
        average: 1,
        count: 1,
        distinct: 1,
        product: 1,
        max: 1,
        mean: 1,
        median: 1,
        min: 1,
        missing: 1,
        q1: 1,
        q3: 1,
        ci0: 1,
        ci1: 1,
        stderr: 1,
        stdev: 1,
        stdevp: 1,
        sum: 1,
        valid: 1,
        values: 1,
        variance: 1,
        variancep: 1
    }, ke = {count: 1, min: 1, max: 1};

    function Ce(e) {
        return !!e && !!e.argmin
    }

    function Ee(e) {
        return !!e && !!e.argmax
    }

    function Se(e) {
        return x(e) && !!Fe[e]
    }

    const Be = ["count", "valid", "missing", "distinct"];

    function _e(e) {
        return x(e) && T(Be, e)
    }

    const ze = ["count", "sum", "distinct", "valid", "missing"],
        Oe = A(["mean", "average", "median", "q1", "q3", "min", "max"]), Ne = "row", Pe = "column", je = "facet",
        Me = "x", Te = "y", Le = "x2", qe = "y2", Re = "radius", We = "radius2", Ue = "theta", Ie = "theta2",
        He = "latitude", Ge = "longitude", Ve = "latitude2", Ye = "longitude2", Je = "color", Xe = "fill",
        Qe = "stroke", $e = "shape", Ke = "size", Ze = "angle", et = "opacity", tt = "fillOpacity",
        nt = "strokeOpacity", it = "strokeWidth", ot = "strokeDash", rt = "text", at = "order", st = "detail",
        ct = "key", ut = "tooltip", lt = "href", ft = "url", dt = "description",
        pt = {theta: 1, theta2: 1, radius: 1, radius2: 1};

    function mt(e) {
        return e in pt
    }

    const ht = {longitude: 1, longitude2: 1, latitude: 1, latitude2: 1};
    const gt = J(ht), vt = {
        x: 1,
        y: 1,
        x2: 1,
        y2: 1, ...pt, ...ht,
        color: 1,
        fill: 1,
        stroke: 1,
        opacity: 1,
        fillOpacity: 1,
        strokeOpacity: 1,
        strokeWidth: 1,
        strokeDash: 1,
        size: 1,
        angle: 1,
        shape: 1,
        order: 1,
        text: 1,
        detail: 1,
        key: 1,
        tooltip: 1,
        href: 1,
        url: 1,
        description: 1
    };

    function yt(e) {
        return e === Je || e === Xe || e === Qe
    }

    const bt = {row: 1, column: 1, facet: 1}, xt = J(bt), wt = {...vt, ...bt},
        At = J(wt), {order: Dt, detail: Ft, tooltip: kt, ...Ct} = wt, {row: Et, column: St, facet: Bt, ..._t} = Ct;

    function zt(e) {
        return !!wt[e]
    }

    const Ot = [Le, qe, Ve, Ye, Ie, We];

    function Nt(e) {
        return Pt(e) !== e
    }

    function Pt(e) {
        switch (e) {
            case Le:
                return Me;
            case qe:
                return Te;
            case Ve:
                return He;
            case Ye:
                return Ge;
            case Ie:
                return Ue;
            case We:
                return Re
        }
        return e
    }

    function jt(e) {
        if (mt(e)) switch (e) {
            case Ue:
                return "startAngle";
            case Ie:
                return "endAngle";
            case Re:
                return "outerRadius";
            case We:
                return "innerRadius"
        }
        return e
    }

    function Mt(e) {
        switch (e) {
            case Me:
                return Le;
            case Te:
                return qe;
            case He:
                return Ve;
            case Ge:
                return Ye;
            case Ue:
                return Ie;
            case Re:
                return We
        }
    }

    function Tt(e) {
        switch (e) {
            case Me:
            case Le:
                return "width";
            case Te:
            case qe:
                return "height"
        }
    }

    const {x: Lt, y: qt, x2: Rt, y2: Wt, latitude: Ut, longitude: It, latitude2: Ht, longitude2: Gt, theta: Vt, theta2: Yt, radius: Jt, radius2: Xt, ...Qt} = vt,
        $t = J(Qt), Kt = {x: 1, y: 1}, Zt = J(Kt);

    function en(e) {
        return e in Kt
    }

    const tn = {theta: 1, radius: 1}, nn = J(tn);

    function on(e) {
        return "width" === e ? Me : Te
    }

    const {text: rn, tooltip: an, href: sn, url: cn, description: un, detail: ln, key: fn, order: dn, ...pn} = Qt,
        mn = J(pn);
    const hn = {...Kt, ...tn, ...pn}, gn = J(hn);

    function vn(e) {
        return !!hn[e]
    }

    function yn(e, t) {
        return function (e) {
            switch (e) {
                case Je:
                case Xe:
                case Qe:
                case dt:
                case st:
                case ct:
                case ut:
                case lt:
                case at:
                case et:
                case tt:
                case nt:
                case it:
                case je:
                case Ne:
                case Pe:
                    return bn;
                case Me:
                case Te:
                case He:
                case Ge:
                    return wn;
                case Le:
                case qe:
                case Ve:
                case Ye:
                    return {
                        area: "always",
                        bar: "always",
                        image: "always",
                        rect: "always",
                        rule: "always",
                        circle: "binned",
                        point: "binned",
                        square: "binned",
                        tick: "binned",
                        line: "binned",
                        trail: "binned"
                    };
                case Ke:
                    return {
                        point: "always",
                        tick: "always",
                        rule: "always",
                        circle: "always",
                        square: "always",
                        bar: "always",
                        text: "always",
                        line: "always",
                        trail: "always"
                    };
                case ot:
                    return {
                        line: "always",
                        point: "always",
                        tick: "always",
                        rule: "always",
                        circle: "always",
                        square: "always",
                        bar: "always",
                        geoshape: "always"
                    };
                case $e:
                    return {point: "always", geoshape: "always"};
                case rt:
                    return {text: "always"};
                case Ze:
                    return {point: "always", square: "always", text: "always"};
                case ft:
                    return {image: "always"};
                case Ue:
                case Re:
                    return {text: "always", arc: "always"};
                case Ie:
                case We:
                    return {arc: "always"}
            }
        }(e)[t]
    }

    const bn = {
        arc: "always",
        area: "always",
        bar: "always",
        circle: "always",
        geoshape: "always",
        image: "always",
        line: "always",
        rule: "always",
        point: "always",
        rect: "always",
        square: "always",
        trail: "always",
        text: "always",
        tick: "always"
    }, {geoshape: xn, ...wn} = bn;

    function An(e) {
        switch (e) {
            case Me:
            case Te:
            case Ue:
            case Re:
            case Ke:
            case Ze:
            case it:
            case et:
            case tt:
            case nt:
            case Le:
            case qe:
            case Ie:
            case We:
                return;
            case je:
            case Ne:
            case Pe:
            case $e:
            case ot:
            case rt:
            case ut:
            case lt:
            case ft:
            case dt:
                return "discrete";
            case Je:
            case Xe:
            case Qe:
                return "flexible";
            case He:
            case Ge:
            case Ve:
            case Ye:
            case st:
            case ct:
            case at:
                return
        }
    }

    function Dn(e) {
        return y(e) && (e = pa(e, void 0)), "bin" + J(e).map((t => En(e[t]) ? K("_".concat(t, "_").concat(Q(e[t]))) : K("_".concat(t, "_").concat(e[t])))).join("")
    }

    function Fn(e) {
        return !0 === e || Cn(e) && !e.binned
    }

    function kn(e) {
        return "binned" === e || Cn(e) && !0 === e.binned
    }

    function Cn(e) {
        return l(e)
    }

    function En(e) {
        return null == e ? void 0 : e.selection
    }

    function Sn(e) {
        switch (e) {
            case Ne:
            case Pe:
            case Ke:
            case Je:
            case Xe:
            case Qe:
            case it:
            case et:
            case tt:
            case nt:
            case $e:
                return 6;
            case ot:
                return 4;
            default:
                return 10
        }
    }

    function Bn(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function _n(e, t, n) {
        var i = t.get(e);
        if (!i) throw new TypeError("attempted to set private field on non-instance");
        if (i.set) i.set.call(e, n); else {
            if (!i.writable) throw new TypeError("attempted to set read only private field");
            i.value = n
        }
        return n
    }

    function zn(e) {
        return "Invalid specification ".concat(JSON.stringify(e), '. Make sure the specification includes at least one of the following properties: "mark", "layer", "facet", "hconcat", "vconcat", "concat", or "repeat".')
    }

    const On = 'Autosize "fit" only works for single views and layered views.';

    function Nn(e) {
        return "".concat("width" == e ? "Width" : "Height", ' "container" only works for single views and layered views.')
    }

    function Pn(e) {
        const t = "width" == e ? "x" : "y";
        return "".concat("width" == e ? "Width" : "Height", ' "container" only works well with autosize "fit" or "fit-').concat(t, '".')
    }

    function jn(e) {
        return e ? 'Dropping "fit-'.concat(e, '" because spec has discrete ').concat(Tt(e), ".") : 'Dropping "fit" because spec has discrete size.'
    }

    function Mn(e) {
        return "Unknown field for ".concat(e, ". Cannot calculate view size.")
    }

    function Tn(e) {
        return 'Cannot project a selection on encoding channel "'.concat(e, '", which has no field.')
    }

    function Ln(e, t) {
        return 'Cannot project a selection on encoding channel "'.concat(e, '" as it uses an aggregate function ("').concat(t, '").')
    }

    function qn(e) {
        return "Selection not supported for ".concat(e, " yet.")
    }

    const Rn = "The same selection must be used to override scale domains in a layered view.";

    function Wn(e) {
        return 'The "columns" property cannot be used when "'.concat(e, '" has nested row/column.')
    }

    function Un(e, t, n) {
        return 'An ancestor parsed field "'.concat(e, '" as ').concat(n, " but a child wants to parse the field as ").concat(t, ".")
    }

    function In(e) {
        return "Config.customFormatTypes is not true, thus custom format type and format for channel ".concat(e, " are dropped.")
    }

    function Hn(e) {
        return 'Invalid field type "'.concat(e, '".')
    }

    function Gn(e, t) {
        const {fill: n, stroke: i} = t;
        return "Dropping color ".concat(e, " as the plot also has ").concat(n && i ? "fill and stroke" : n ? "fill" : "stroke", ".")
    }

    function Vn(e, t) {
        return "Dropping ".concat(P(e), ' from channel "').concat(t, '" since it does not contain any data field, datum, value, or signal.')
    }

    function Yn(e, t, n) {
        return "".concat(e, ' dropped as it is incompatible with "').concat(t, '"').concat(n ? " when ".concat(n) : "", ".")
    }

    function Jn(e) {
        return "".concat(e, " encoding should be discrete (ordinal / nominal / binned).")
    }

    function Xn(e, t) {
        return 'Using discrete channel "'.concat(e, '" to encode "').concat(t, '" field can be misleading as it does not encode ').concat("ordinal" === t ? "order" : "magnitude", ".")
    }

    function Qn(e) {
        return "Using unaggregated domain with raw field has no effect (".concat(P(e), ").")
    }

    function $n(e) {
        return 'Unaggregated domain not applicable for "'.concat(e, '" since it produces values outside the origin domain of the source data.')
    }

    function Kn(e) {
        return "Unaggregated domain is currently unsupported for log scale (".concat(P(e), ").")
    }

    function Zn(e, t, n) {
        return "".concat(n, "-scale's \"").concat(t, '" is dropped as it does not work with ').concat(e, " scale.")
    }

    function ei(e) {
        return 'The step for "'.concat(e, '" is dropped because the ').concat("width" === e ? "x" : "y", " is continuous.")
    }

    const ti = "Domains that should be unioned has conflicting sort properties. Sort will be set to true.";

    function ni(e, t) {
        return "Invalid ".concat(e, ": ").concat(P(t), ".")
    }

    function ii(e) {
        return "1D error band does not support ".concat(e, ".")
    }

    function oi(e) {
        return "Channel ".concat(e, ' is required for "binned" bin.')
    }

    const ri = function (e, t) {
        let n = e || 0;
        return {
            level(e) {
                return arguments.length ? (n = +e, this) : n
            }, error() {
                return n >= 1 && c(t || "error", "ERROR", arguments), this
            }, warn() {
                return n >= 2 && c(t || "warn", "WARN", arguments), this
            }, info() {
                return n >= 3 && c(t || "log", "INFO", arguments), this
            }, debug() {
                return n >= 4 && c(t || "log", "DEBUG", arguments), this
            }
        }
    }(2);
    let ai = ri;

    function si(...e) {
        ai.warn(...e)
    }

    function ci(e) {
        if (e && l(e)) for (const t of gi) if (t in e) return !0;
        return !1
    }

    const ui = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"],
        li = ui.map((e => e.substr(0, 3))),
        fi = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
        di = fi.map((e => e.substr(0, 3)));

    function pi(e, t) {
        const n = [];
        if (t && void 0 !== e.day && J(e).length > 1 && (si(function (e) {
            return "Dropping day from datetime ".concat(P(e), " as day cannot be combined with other units.")
        }(e)), delete (e = z(e)).day), void 0 !== e.year ? n.push(e.year) : n.push(2012), void 0 !== e.month) {
            const i = t ? function (e) {
                if (he(e) && (e = +e), b(e)) return e - 1;
                {
                    const t = e.toLowerCase(), n = ui.indexOf(t);
                    if (-1 !== n) return n;
                    const i = t.substr(0, 3), o = li.indexOf(i);
                    if (-1 !== o) return o;
                    throw new Error(ni("month", e))
                }
            }(e.month) : e.month;
            n.push(i)
        } else if (void 0 !== e.quarter) {
            const i = t ? function (e) {
                if (he(e) && (e = +e), b(e)) return e > 4 && si(ni("quarter", e)), e - 1;
                throw new Error(ni("quarter", e))
            }(e.quarter) : e.quarter;
            n.push(b(i) ? 3 * i : i + "*3")
        } else n.push(0);
        if (void 0 !== e.date) n.push(e.date); else if (void 0 !== e.day) {
            const i = t ? function (e) {
                if (he(e) && (e = +e), b(e)) return e % 7;
                {
                    const t = e.toLowerCase(), n = fi.indexOf(t);
                    if (-1 !== n) return n;
                    const i = t.substr(0, 3), o = di.indexOf(i);
                    if (-1 !== o) return o;
                    throw new Error(ni("day", e))
                }
            }(e.day) : e.day;
            n.push(b(i) ? i + 1 : i + "+1")
        } else n.push(1);
        for (const t of ["hours", "minutes", "seconds", "milliseconds"]) {
            const i = e[t];
            n.push(void 0 === i ? 0 : i)
        }
        return n
    }

    function mi(e) {
        const t = pi(e, !0).join(", ");
        return e.utc ? "utc(".concat(t, ")") : "datetime(".concat(t, ")")
    }

    const hi = {
        year: 1,
        quarter: 1,
        month: 1,
        week: 1,
        day: 1,
        dayofyear: 1,
        date: 1,
        hours: 1,
        minutes: 1,
        seconds: 1,
        milliseconds: 1
    }, gi = J(hi);

    function vi(e) {
        return e.startsWith("utc")
    }

    const yi = {"year-month": "%b %Y ", "year-month-date": "%b %d, %Y "};

    function bi(e) {
        const t = [];
        for (const n of gi) xi(e, n) && t.push(n);
        return t
    }

    function xi(e, t) {
        const n = e.indexOf(t);
        return !(n < 0) && (!(n > 0 && "seconds" === t && "i" === e.charAt(n - 1)) && (!(e.length > n + 3 && "day" === t && "o" === e.charAt(n + 3)) && !(n > 0 && "year" === t && "f" === e.charAt(n - 1))))
    }

    function wi(e, t, {end: n} = {end: !1}) {
        const i = ne(t), o = vi(e) ? "utc" : "";
        let r;
        const a = {};
        for (const t of gi) xi(e, t) && (a[t] = "quarter" === (s = t) ? "(".concat(o, "quarter(").concat(i, ")-1)") : "".concat(o).concat(s, "(").concat(i, ")"), r = t);
        var s;
        return n && (a[r] += "+1"), function (e) {
            const t = pi(e, !1).join(", ");
            return e.utc ? "utc(".concat(t, ")") : "datetime(".concat(t, ")")
        }(a)
    }

    function Ai(e) {
        if (!e) return;
        const t = bi(e);
        return "timeUnitSpecifier(".concat(F(t), ", ").concat(F(yi), ")")
    }

    function Di(e) {
        if (!e) return;
        let t;
        return x(e) ? t = {unit: e} : l(e) && (t = {...e, ...e.unit ? {unit: e.unit} : {}}), vi(t.unit) && (t.utc = !0, t.unit = t.unit.substr(3)), t
    }

    function Fi(e) {
        return e && !!e.signal
    }

    function ki(e) {
        return !!e.step
    }

    function Ci(e) {
        return !u(e) && ("field" in e && "data" in e)
    }

    const Ei = J({
            aria: 1,
            description: 1,
            ariaRole: 1,
            ariaRoleDescription: 1,
            blend: 1,
            opacity: 1,
            fill: 1,
            fillOpacity: 1,
            stroke: 1,
            strokeCap: 1,
            strokeWidth: 1,
            strokeOpacity: 1,
            strokeDash: 1,
            strokeDashOffset: 1,
            strokeJoin: 1,
            strokeOffset: 1,
            strokeMiterLimit: 1,
            startAngle: 1,
            endAngle: 1,
            padAngle: 1,
            innerRadius: 1,
            outerRadius: 1,
            size: 1,
            shape: 1,
            interpolate: 1,
            tension: 1,
            orient: 1,
            align: 1,
            baseline: 1,
            text: 1,
            dir: 1,
            dx: 1,
            dy: 1,
            ellipsis: 1,
            limit: 1,
            radius: 1,
            theta: 1,
            angle: 1,
            font: 1,
            fontSize: 1,
            fontWeight: 1,
            fontStyle: 1,
            lineBreak: 1,
            lineHeight: 1,
            cursor: 1,
            href: 1,
            tooltip: 1,
            cornerRadius: 1,
            cornerRadiusTopLeft: 1,
            cornerRadiusTopRight: 1,
            cornerRadiusBottomLeft: 1,
            cornerRadiusBottomRight: 1,
            aspect: 1,
            width: 1,
            height: 1,
            url: 1,
            smooth: 1
        }), Si = {
            arc: 1,
            area: 1,
            group: 1,
            image: 1,
            line: 1,
            path: 1,
            rect: 1,
            rule: 1,
            shape: 1,
            symbol: 1,
            text: 1,
            trail: 1
        },
        Bi = ["cornerRadius", "cornerRadiusTopLeft", "cornerRadiusTopRight", "cornerRadiusBottomLeft", "cornerRadiusBottomRight"];

    function _i(e) {
        return e && !!e.field && void 0 !== e.equal
    }

    function zi(e) {
        return e && !!e.field && void 0 !== e.lt
    }

    function Oi(e) {
        return e && !!e.field && void 0 !== e.lte
    }

    function Ni(e) {
        return e && !!e.field && void 0 !== e.gt
    }

    function Pi(e) {
        return e && !!e.field && void 0 !== e.gte
    }

    function ji(e) {
        if (e && e.field) {
            if (u(e.range) && 2 === e.range.length) return !0;
            if (Fi(e.range)) return !0
        }
        return !1
    }

    function Mi(e) {
        return e && !!e.field && (u(e.oneOf) || u(e.in))
    }

    function Ti(e) {
        return Mi(e) || _i(e) || ji(e) || zi(e) || Ni(e) || Oi(e) || Pi(e)
    }

    function Li(e, t) {
        return ga(e, {timeUnit: t, wrapTime: !0})
    }

    function qi(e, t = !0) {
        var n;
        const {field: i} = e, o = null === (n = Di(e.timeUnit)) || void 0 === n ? void 0 : n.unit,
            r = o ? "time(" + wi(o, i) + ")" : Kr(e, {expr: "datum"});
        if (_i(e)) return r + "===" + Li(e.equal, o);
        if (zi(e)) {
            const t = e.lt;
            return "".concat(r, "<").concat(Li(t, o))
        }
        if (Ni(e)) {
            const t = e.gt;
            return "".concat(r, ">").concat(Li(t, o))
        }
        if (Oi(e)) {
            const t = e.lte;
            return "".concat(r, "<=").concat(Li(t, o))
        }
        if (Pi(e)) {
            const t = e.gte;
            return "".concat(r, ">=").concat(Li(t, o))
        }
        if (Mi(e)) return "indexof([".concat(function (e, t) {
            return e.map((e => Li(e, t)))
        }(e.oneOf, o).join(","), "], ").concat(r, ") !== -1");
        if (function (e) {
            return e && !!e.field && void 0 !== e.valid
        }(e)) return Ri(r, e.valid);
        if (ji(e)) {
            const {range: n} = e, i = Fi(n) ? {signal: "".concat(n.signal, "[0]")} : n[0],
                a = Fi(n) ? {signal: "".concat(n.signal, "[1]")} : n[1];
            if (null !== i && null !== a && t) return "inrange(" + r + ", [" + Li(i, o) + ", " + Li(a, o) + "])";
            const s = [];
            return null !== i && s.push("".concat(r, " >= ").concat(Li(i, o))), null !== a && s.push("".concat(r, " <= ").concat(Li(a, o))), s.length > 0 ? s.join(" && ") : "true"
        }
        throw new Error("Invalid field predicate: ".concat(JSON.stringify(e)))
    }

    function Ri(e, t = !0) {
        return t ? "isValid(".concat(e, ") && isFinite(+").concat(e, ")") : "!isValid(".concat(e, ") || !isFinite(+").concat(e, ")")
    }

    function Wi(e) {
        var t;
        return Ti(e) && e.timeUnit ? {
            ...e,
            timeUnit: null === (t = Di(e.timeUnit)) || void 0 === t ? void 0 : t.unit
        } : e
    }

    const Ui = "quantitative", Ii = "ordinal", Hi = "temporal", Gi = "nominal", Vi = "geojson";
    const Yi = "linear", Ji = "log", Xi = "pow", Qi = "sqrt", $i = "symlog", Ki = "time", Zi = "utc", eo = "quantile",
        to = "quantize", no = "threshold", io = "point", oo = "band", ro = {
            linear: "numeric",
            log: "numeric",
            pow: "numeric",
            sqrt: "numeric",
            symlog: "numeric",
            identity: "numeric",
            sequential: "numeric",
            time: "time",
            utc: "time",
            ordinal: "ordinal",
            "bin-ordinal": "bin-ordinal",
            point: "ordinal-position",
            band: "ordinal-position",
            quantile: "discretizing",
            quantize: "discretizing",
            threshold: "discretizing"
        };

    function ao(e, t) {
        const n = ro[e], i = ro[t];
        return n === i || "ordinal-position" === n && "time" === i || "ordinal-position" === i && "time" === n
    }

    const so = {
        linear: 0,
        log: 1,
        pow: 1,
        sqrt: 1,
        symlog: 1,
        identity: 1,
        sequential: 1,
        time: 0,
        utc: 0,
        point: 10,
        band: 11,
        ordinal: 0,
        "bin-ordinal": 0,
        quantile: 0,
        quantize: 0,
        threshold: 0
    };

    function co(e) {
        return so[e]
    }

    const uo = ["linear", "log", "pow", "sqrt", "symlog", "time", "utc"], lo = A(uo),
        fo = A(["linear", "log", "pow", "sqrt", "symlog"]);
    const po = A(["quantile", "quantize", "threshold"]),
        mo = A(uo.concat(["quantile", "quantize", "threshold", "sequential", "identity"])),
        ho = A(["ordinal", "bin-ordinal", "point", "band"]);

    function go(e) {
        return e in ho
    }

    function vo(e) {
        return e in mo
    }

    function yo(e) {
        return e in lo
    }

    function bo(e) {
        return e in po
    }

    function xo(e) {
        return null == e ? void 0 : e.selection
    }

    const {type: wo, domain: Ao, range: Do, rangeMax: Fo, rangeMin: ko, scheme: Co, ...Eo} = {
        type: 1,
        domain: 1,
        domainMax: 1,
        domainMin: 1,
        domainMid: 1,
        align: 1,
        range: 1,
        rangeMax: 1,
        rangeMin: 1,
        scheme: 1,
        bins: 1,
        reverse: 1,
        round: 1,
        clamp: 1,
        nice: 1,
        base: 1,
        exponent: 1,
        constant: 1,
        interpolate: 1,
        zero: 1,
        padding: 1,
        paddingInner: 1,
        paddingOuter: 1
    }, So = J(Eo);

    function Bo(e, t) {
        switch (t) {
            case"type":
            case"domain":
            case"reverse":
            case"range":
                return !0;
            case"scheme":
            case"interpolate":
                return !T(["point", "band", "identity"], e);
            case"bins":
                return !T(["point", "band", "identity", "ordinal"], e);
            case"round":
                return yo(e) || "band" === e || "point" === e;
            case"padding":
            case"rangeMin":
            case"rangeMax":
                return yo(e) || T(["point", "band"], e);
            case"paddingOuter":
            case"align":
                return T(["point", "band"], e);
            case"paddingInner":
                return "band" === e;
            case"domainMax":
            case"domainMid":
            case"domainMin":
            case"clamp":
                return yo(e);
            case"nice":
                return yo(e) || "quantize" === e || "threshold" === e;
            case"exponent":
                return "pow" === e;
            case"base":
                return "log" === e;
            case"constant":
                return "symlog" === e;
            case"zero":
                return vo(e) && !T(["log", "time", "utc", "threshold", "quantile"], e)
        }
    }

    function _o(e, t) {
        switch (t) {
            case"interpolate":
            case"scheme":
            case"domainMid":
                return yt(e) ? void 0 : 'Cannot use the scale property "'.concat(e, '" with non-color channel.');
            case"align":
            case"type":
            case"bins":
            case"domain":
            case"domainMax":
            case"domainMin":
            case"range":
            case"base":
            case"exponent":
            case"constant":
            case"nice":
            case"padding":
            case"paddingInner":
            case"paddingOuter":
            case"rangeMax":
            case"rangeMin":
            case"reverse":
            case"round":
            case"clamp":
            case"zero":
                return
        }
    }

    function zo(e) {
        return e && !!e.expr
    }

    function Oo(e) {
        const t = J(e || {}), n = {};
        for (const i of t) n[i] = Aa(e[i]);
        return n
    }

    const No = {
            arc: "arc",
            area: "area",
            bar: "bar",
            image: "image",
            line: "line",
            point: "point",
            rect: "rect",
            rule: "rule",
            text: "text",
            tick: "tick",
            trail: "trail",
            circle: "circle",
            square: "square",
            geoshape: "geoshape"
        }, Po = No.arc, jo = No.area, Mo = No.bar, To = No.image, Lo = No.line, qo = No.point, Ro = No.rect, Wo = No.rule,
        Uo = No.text, Io = No.tick, Ho = No.trail, Go = No.circle, Vo = No.square, Yo = No.geoshape;

    function Jo(e) {
        return T(["line", "area", "trail"], e)
    }

    function Xo(e) {
        return T(["rect", "bar", "image", "arc"], e)
    }

    const Qo = J(No);

    function $o(e) {
        return e.type
    }

    A(Qo);
    const Ko = ["stroke", "strokeWidth", "strokeDash", "strokeDashOffset", "strokeOpacity", "strokeJoin", "strokeMiterLimit", "fill", "fillOpacity"],
        Zo = J({
            color: 1,
            filled: 1,
            invalid: 1,
            order: 1,
            radius2: 1,
            theta2: 1,
            timeUnitBand: 1,
            timeUnitBandPosition: 1
        }), er = J({
            mark: 1,
            arc: 1,
            area: 1,
            bar: 1,
            circle: 1,
            image: 1,
            line: 1,
            point: 1,
            rect: 1,
            rule: 1,
            square: 1,
            text: 1,
            tick: 1,
            trail: 1,
            geoshape: 1
        }), tr = {
            horizontal: ["cornerRadiusTopRight", "cornerRadiusBottomRight"],
            vertical: ["cornerRadiusTopLeft", "cornerRadiusTopRight"]
        }, nr = {binSpacing: 1, continuousBandSize: 5, timeUnitBandPosition: .5},
        ir = {binSpacing: 0, continuousBandSize: 5, timeUnitBandPosition: .5};

    function or(e) {
        const {channel: t, channelDef: n, markDef: i, scale: o, config: r} = e, a = lr(e);
        return qr(n) && !_e(n.aggregate) && o && yo(o.get("type")) && !1 === o.get("zero") ? rr({
            fieldDef: n,
            channel: t,
            markDef: i,
            ref: a,
            config: r
        }) : a
    }

    function rr({fieldDef: e, channel: t, markDef: n, ref: i, config: o}) {
        if (Jo(n.type)) return i;
        return null === Ba("invalid", n, o) ? i : [ar(e, t), i]
    }

    function ar(e, t) {
        return {test: sr(e, !0), ..."y" === Pt(t) ? {field: {group: "height"}} : {value: 0}}
    }

    function sr(e, t = !0) {
        return Ri(x(e) ? e : Kr(e, {expr: "datum"}), !t)
    }

    function cr(e, t, n, i) {
        const o = {};
        if (t && (o.scale = t), Wr(e)) {
            const {datum: t} = e;
            ci(t) ? o.signal = mi(t) : Fi(t) ? o.signal = t.signal : zo(t) ? o.signal = t.expr : o.value = t
        } else o.field = Kr(e, n);
        if (i) {
            const {offset: e, band: t} = i;
            e && (o.offset = e), t && (o.band = t)
        }
        return o
    }

    function ur({scaleName: e, fieldOrDatumDef: t, fieldOrDatumDef2: n, offset: i, startSuffix: o, band: r = .5}) {
        const a = 0 < r && r < 1 ? "datum" : void 0, s = Kr(t, {expr: a, suffix: o}),
            c = void 0 !== n ? Kr(n, {expr: a}) : Kr(t, {suffix: "end", expr: a}), u = {};
        if (0 === r || 1 === r) {
            u.scale = e;
            const t = 0 === r ? s : c;
            u.field = t
        } else {
            const t = "".concat(r, " * ").concat(s, " + ").concat(1 - r, " * ").concat(c);
            u.signal = 'scale("'.concat(e, '", ').concat(t, ")")
        }
        return i && (u.offset = i), u
    }

    function lr({channel: e, channelDef: t, channel2Def: n, markDef: i, config: o, scaleName: r, scale: a, stack: s, offset: c, defaultRef: u, band: l}) {
        if (t) {
            if (Hr(t)) {
                var f, d;
                if (Gr(t)) {
                    var p;
                    l = null !== (p = l) && void 0 !== p ? p : Pr({
                        channel: e,
                        fieldDef: t,
                        fieldDef2: n,
                        markDef: i,
                        stack: s,
                        config: o,
                        isMidPoint: !0
                    });
                    const {bin: a, timeUnit: u, type: f} = t;
                    if (Fn(a) || l && u && f === Hi) return s && s.impute ? cr(t, r, {binSuffix: "mid"}, {offset: c}) : l ? ur({
                        scaleName: r,
                        fieldOrDatumDef: t,
                        band: l,
                        offset: c
                    }) : cr(t, r, ya(t, e) ? {binSuffix: "range"} : {}, {offset: c});
                    if (kn(a)) {
                        if (qr(n)) return ur({
                            scaleName: r,
                            fieldOrDatumDef: t,
                            fieldOrDatumDef2: n,
                            band: l,
                            offset: c
                        });
                        si(oi(e === Me ? Le : qe))
                    }
                }
                const u = null == a ? void 0 : a.get("type");
                return cr(t, r, go(u) ? {binSuffix: "range"} : {}, {
                    offset: c,
                    band: "band" === u ? null !== (f = null !== (d = l) && void 0 !== d ? d : t.band) && void 0 !== f ? f : .5 : void 0
                })
            }
            if (Vr(t)) {
                const n = c ? {offset: c} : {};
                return {...fr(e, t.value), ...n}
            }
        }
        return "function" == typeof u && (u = u()), u ? {...u, ...c ? {offset: c} : {}} : u
    }

    function fr(e, t) {
        return T(["x", "x2"], e) && "width" === t ? {field: {group: "width"}} : T(["y", "y2"], e) && "height" === t ? {field: {group: "height"}} : Fa(t)
    }

    function dr(e) {
        return e && "number" !== e && "time" !== e
    }

    function pr(e, t, n) {
        return "".concat(e, "(").concat(t).concat(n ? ", ".concat(JSON.stringify(n)) : "", ")")
    }

    function mr({fieldOrDatumDef: e, format: t, formatType: n, expr: i, normalizeStack: o, config: r}) {
        if (dr(n)) return gr({fieldOrDatumDef: e, format: t, formatType: n, expr: i, config: r});
        const a = hr(e, i, o);
        if (ha(e)) {
            var s, c;
            const n = function (e, t, n, i, o) {
                return !t || n ? (n = x(n) ? n : i, "".concat(o ? "utc" : "time", "Format(").concat(e, ", '").concat(n, "')")) : function (e, t, n) {
                    if (!e) return;
                    const i = Ai(e), o = n || vi(e);
                    return "".concat(o ? "utc" : "time", "Format(").concat(t, ", ").concat(i, ")")
                }(t, e, o)
            }(a, qr(e) ? null === (s = Di(e.timeUnit)) || void 0 === s ? void 0 : s.unit : void 0, t, r.timeFormat, Yr(e) && (null === (c = e.scale) || void 0 === c ? void 0 : c.type) === Zi);
            return n ? {signal: n} : void 0
        }
        if (t = br(Rr(e), t, r), qr(e) && Fn(e.bin)) {
            return {signal: Ar(a, Kr(e, {expr: i, binSuffix: "end"}), t, n, r)}
        }
        return t || "quantitative" === Rr(e) ? {signal: "".concat(xr(a, t))} : {signal: "isValid(".concat(a, ") ? ").concat(a, ' : ""+').concat(a)}
    }

    function hr(e, t, n) {
        return qr(e) ? n ? "".concat(Kr(e, {expr: t, suffix: "end"}), "-").concat(Kr(e, {
            expr: t,
            suffix: "start"
        })) : Kr(e, {expr: t}) : function (e) {
            const {datum: t} = e;
            return ci(t) ? mi(t) : "".concat(JSON.stringify(t))
        }(e)
    }

    function gr({fieldOrDatumDef: e, format: t, formatType: n, expr: i, normalizeStack: o, config: r, field: a}) {
        var s;
        if (a = null !== (s = a) && void 0 !== s ? s : hr(e, i, o), qr(e) && Fn(e.bin)) {
            return {signal: Ar(a, Kr(e, {expr: i, binSuffix: "end"}), t, n, r)}
        }
        return {signal: pr(n, a, t)}
    }

    function vr(e, t, n, i, o, r) {
        if (!dr(i)) {
            if (ha(e)) {
                var a;
                return function (e, t, n, i) {
                    if (e) return e;
                    if (t) return {signal: Ai(t)};
                    return i ? void 0 : n.timeFormat
                }(n, qr(e) ? null === (a = Di(e.timeUnit)) || void 0 === a ? void 0 : a.unit : void 0, o, r)
            }
            return br(t, n, o)
        }
    }

    function yr(e, t, n) {
        return e && (Fi(e) || "number" === e || "time" === e) ? e : ha(t) && "time" !== n && "utc" !== n ? "time" : void 0
    }

    function br(e, t, n) {
        return x(t) ? t : e === Ui ? n.numberFormat : void 0
    }

    function xr(e, t) {
        return "format(".concat(e, ', "').concat(t || "", '")')
    }

    function wr(e, t, n, i) {
        var o;
        return dr(n) ? pr(n, e, t) : xr(e, null !== (o = x(t) ? t : void 0) && void 0 !== o ? o : i.numberFormat)
    }

    function Ar(e, t, n, i, o) {
        const r = wr(e, n, i, o), a = wr(t, n, i, o);
        return "".concat(Ri(e, !1), ' ? "null" : ').concat(r, ' + "').concat(" ??? ", '" + ').concat(a)
    }

    const Dr = "min", Fr = {
        x: 1,
        y: 1,
        color: 1,
        fill: 1,
        stroke: 1,
        strokeWidth: 1,
        size: 1,
        shape: 1,
        fillOpacity: 1,
        strokeOpacity: 1,
        opacity: 1,
        text: 1
    };

    function kr(e) {
        return e in Fr
    }

    function Cr(e) {
        return !!e && !!e.encoding
    }

    function Er(e) {
        return !(!e || "count" !== e.op && !e.field)
    }

    function Sr(e) {
        return !!e && u(e)
    }

    function Br(e) {
        return "row" in e || "column" in e
    }

    function _r(e) {
        return !!e && "header" in e
    }

    function zr(e) {
        return "facet" in e
    }

    function Or(e) {
        const {field: t, timeUnit: n, bin: i, aggregate: o} = e;
        return {...n ? {timeUnit: n} : {}, ...i ? {bin: i} : {}, ...o ? {aggregate: o} : {}, field: t}
    }

    function Nr(e) {
        return "sort" in e
    }

    function Pr({channel: e, fieldDef: t, fieldDef2: n, markDef: i, stack: o, config: r, isMidPoint: a}) {
        if (Hr(t) && void 0 !== t.band) return t.band;
        if (qr(t)) {
            const {timeUnit: e, bin: o} = t;
            if (e && !n) return a ? _a("timeUnitBandPosition", i, r) : Xo(i.type) ? _a("timeUnitBand", i, r) : 0;
            if (Fn(o)) return Xo(i.type) && !a ? 1 : .5
        }
        return (null == o ? void 0 : o.fieldChannel) === e && a ? .5 : void 0
    }

    function jr(e, t, n, i, o, r) {
        return !!(Fn(t.bin) || t.timeUnit && Gr(t) && "temporal" === t.type) && !!Pr({
            channel: e,
            fieldDef: t,
            fieldDef2: n,
            stack: i,
            markDef: o,
            config: r
        })
    }

    function Mr(e) {
        return !!e && "condition" in e
    }

    function Tr(e) {
        const t = e && e.condition;
        return !!t && !u(t) && qr(t)
    }

    function Lr(e) {
        const t = e && e.condition;
        return !!t && !u(t) && Hr(t)
    }

    function qr(e) {
        return !(!e || !e.field && "count" !== e.aggregate)
    }

    function Rr(e) {
        return e && e.type
    }

    function Wr(e) {
        return !!e && "datum" in e
    }

    function Ur(e) {
        return Gr(e) && ea(e) || Ir(e)
    }

    function Ir(e) {
        return Wr(e) && b(e.datum)
    }

    function Hr(e) {
        return qr(e) || Wr(e)
    }

    function Gr(e) {
        return !!e && ("field" in e || "count" === e.aggregate) && "type" in e
    }

    function Vr(e) {
        return e && "value" in e && "value" in e
    }

    function Yr(e) {
        return !!e && ("scale" in e || "sort" in e)
    }

    function Jr(e) {
        return e && ("axis" in e || "stack" in e || "impute" in e)
    }

    function Xr(e) {
        return !!e && "legend" in e
    }

    function Qr(e) {
        return !!e && ("format" in e || "formatType" in e)
    }

    function $r(e) {
        return N(e, ["legend", "axis", "header", "scale"])
    }

    function Kr(e, t = {}) {
        let n = e.field;
        const i = t.prefix;
        let o = t.suffix, r = "";
        if (function (e) {
            return "count" === e.aggregate
        }(e)) n = de("count"); else {
            let i;
            if (!t.nofn) if (function (e) {
                return "op" in e
            }(e)) i = e.op; else {
                const {bin: u, aggregate: l, timeUnit: f} = e;
                var a, s;
                if (Fn(u)) i = Dn(u), o = (null !== (a = t.binSuffix) && void 0 !== a ? a : "") + (null !== (s = t.suffix) && void 0 !== s ? s : ""); else if (l) Ee(l) ? (r = '["'.concat(n, '"]'), n = "argmax_".concat(l.argmax)) : Ce(l) ? (r = '["'.concat(n, '"]'), n = "argmin_".concat(l.argmin)) : i = String(l); else if (f) {
                    var c;
                    i = function (e) {
                        const {utc: t, ...n} = Di(e);
                        return n.unit ? (t ? "utc" : "") + J(n).map((e => K("".concat("unit" === e ? "" : "_".concat(e, "_")).concat(n[e])))).join("") : (t ? "utc" : "") + "timeunit" + J(n).map((e => K("_".concat(e, "_").concat(n[e])))).join("")
                    }(f), o = (!T(["range", "mid"], t.binSuffix) && t.binSuffix || "") + (null !== (c = t.suffix) && void 0 !== c ? c : "")
                }
            }
            i && (n = n ? "".concat(i, "_").concat(n) : i)
        }
        return o && (n = "".concat(n, "_").concat(o)), i && (n = "".concat(i, "_").concat(n)), t.forAs ? se(n) : t.expr ? ie(n, t.expr) + r : re(n) + r
    }

    function Zr(e) {
        switch (e.type) {
            case"nominal":
            case"ordinal":
            case"geojson":
                return !0;
            case"quantitative":
                return qr(e) && !!e.bin;
            case"temporal":
                return !1
        }
        throw new Error(Hn(e.type))
    }

    function ea(e) {
        return !Zr(e)
    }

    const ta = (e, t) => {
        switch (t.fieldTitle) {
            case"plain":
                return e.field;
            case"functional":
                return function (e) {
                    const {aggregate: t, bin: n, timeUnit: i, field: o} = e;
                    if (Ee(t)) return "".concat(o, " for argmax(").concat(t.argmax, ")");
                    if (Ce(t)) return "".concat(o, " for argmin(").concat(t.argmin, ")");
                    const r = Di(i),
                        a = t || (null == r ? void 0 : r.unit) || (null == r ? void 0 : r.maxbins) && "timeunit" || Fn(n) && "bin";
                    return a ? a.toUpperCase() + "(" + o + ")" : o
                }(e);
            default:
                return function (e, t) {
                    const {field: n, bin: i, timeUnit: o, aggregate: r} = e;
                    if ("count" === r) return t.countTitle;
                    if (Fn(i)) return "".concat(n, " (binned)");
                    if (o) {
                        var a;
                        const e = null === (a = Di(o)) || void 0 === a ? void 0 : a.unit;
                        if (e) return "".concat(n, " (").concat(bi(e).join("-"), ")")
                    } else if (r) return Ee(r) ? "".concat(n, " for max ").concat(r.argmax) : Ce(r) ? "".concat(n, " for min ").concat(r.argmin) : "".concat(te(r), " of ").concat(n);
                    return n
                }(e, t)
        }
    };
    let na = ta;

    function ia(e) {
        na = e
    }

    function oa(e, t, {allowDisabling: n, includeDefault: i = !0}) {
        var o;
        const r = null === (o = ra(e)) || void 0 === o ? void 0 : o.title;
        if (!qr(e)) return r;
        const a = e, s = i ? aa(a, t) : void 0;
        return n ? ue(r, a.title, s) : null !== (c = null != r ? r : a.title) && void 0 !== c ? c : s;
        var c
    }

    function ra(e) {
        return Jr(e) && e.axis ? e.axis : Xr(e) && e.legend ? e.legend : _r(e) && e.header ? e.header : void 0
    }

    function aa(e, t) {
        return na(e, t)
    }

    function sa(e) {
        if (Qr(e)) {
            const {format: t, formatType: n} = e;
            return {format: t, formatType: n}
        }
        {
            var t;
            const n = null !== (t = ra(e)) && void 0 !== t ? t : {}, {format: i, formatType: o} = n;
            return {format: i, formatType: o}
        }
    }

    function ca(e) {
        return qr(e) ? e : Tr(e) ? e.condition : void 0
    }

    function ua(e) {
        return Hr(e) ? e : Lr(e) ? e.condition : void 0
    }

    function la(e, t, n, i = {}) {
        if (x(e) || b(e) || y(e)) {
            return si(function (e, t, n) {
                return "Channel ".concat(e, " is a ").concat(t, ". Converted to {value: ").concat(P(n), "}.")
            }(t, x(e) ? "string" : b(e) ? "number" : "boolean", e)), {value: e}
        }
        return Hr(e) ? fa(e, t, n, i) : Lr(e) ? {...e, condition: fa(e.condition, t, n, i)} : e
    }

    function fa(e, t, n, i) {
        if (Qr(e)) {
            const {format: o, formatType: r, ...a} = e;
            if (dr(r) && !n.customFormatTypes) return si(In(t)), fa(a, t, n, i)
        } else {
            const o = Jr(e) ? "axis" : Xr(e) ? "legend" : _r(e) ? "header" : null;
            if (o && e[o]) {
                const {format: r, formatType: a, ...s} = e[o];
                if (dr(a) && !n.customFormatTypes) return si(In(t)), fa({...e, [o]: s}, t, n, i)
            }
        }
        return qr(e) ? da(e, t, i) : function (e) {
            let t = e.type;
            if (t) return e;
            const {datum: n} = e;
            return t = b(n) ? "quantitative" : x(n) ? "nominal" : ci(n) ? "temporal" : void 0, {...e, type: t}
        }(e)
    }

    function da(e, t, {compositeMark: n = !1} = {}) {
        const {aggregate: i, timeUnit: o, bin: r, field: a} = e, s = {...e};
        if (n || !i || Se(i) || Ee(i) || Ce(i) || (si(function (e) {
            return 'Invalid aggregation operator "'.concat(e, '".')
        }(i)), delete s.aggregate), o && (s.timeUnit = Di(o)), a && (s.field = "".concat(a)), Fn(r) && (s.bin = pa(r, t)), kn(r) && !en(t) && si(function (e) {
            return "Channel ".concat(e, ' should not be used with "binned" bin.')
        }(t)), Gr(s)) {
            const {type: e} = s, t = function (e) {
                if (e) switch (e = e.toLowerCase()) {
                    case"q":
                    case Ui:
                        return "quantitative";
                    case"t":
                    case Hi:
                        return "temporal";
                    case"o":
                    case Ii:
                        return "ordinal";
                    case"n":
                    case Gi:
                        return "nominal";
                    case Vi:
                        return "geojson"
                }
            }(e);
            e !== t && (s.type = t), "quantitative" !== e && _e(i) && (si(function (e, t) {
                return 'Invalid field type "'.concat(e, '" for aggregate: "').concat(t, '", using "quantitative" instead.')
            }(e, i)), s.type = "quantitative")
        } else if (!Nt(t)) {
            const e = function (e, t) {
                var n;
                switch (t) {
                    case"latitude":
                    case"longitude":
                        return "quantitative";
                    case"row":
                    case"column":
                    case"facet":
                    case"shape":
                    case"strokeDash":
                        return "nominal";
                    case"order":
                        return "ordinal"
                }
                if (Nr(e) && u(e.sort)) return "ordinal";
                const {aggregate: i, bin: o, timeUnit: r} = e;
                if (r) return "temporal";
                if (o || i && !Ee(i) && !Ce(i)) return "quantitative";
                if (Yr(e) && (null === (n = e.scale) || void 0 === n ? void 0 : n.type)) switch (ro[e.scale.type]) {
                    case"numeric":
                    case"discretizing":
                        return "quantitative";
                    case"time":
                        return "temporal"
                }
                return "nominal"
            }(s, t);
            s.type = e
        }
        if (Gr(s)) {
            const {compatible: e, warning: n} = function (e, t) {
                const n = e.type;
                if ("geojson" === n && "shape" !== t) return {
                    compatible: !1,
                    warning: "Channel ".concat(t, " should not be used with a geojson data.")
                };
                switch (t) {
                    case Ne:
                    case Pe:
                    case je:
                        return ea(e) ? {compatible: !1, warning: Jn(t)} : ma;
                    case Me:
                    case Te:
                    case Je:
                    case Xe:
                    case Qe:
                    case rt:
                    case st:
                    case ct:
                    case ut:
                    case lt:
                    case ft:
                    case Ze:
                    case Ue:
                    case Re:
                    case dt:
                        return ma;
                    case Ge:
                    case Ye:
                    case He:
                    case Ve:
                        return n !== Ui ? {
                            compatible: !1,
                            warning: "Channel ".concat(t, " should be used with a quantitative field only, not ").concat(e.type, " field.")
                        } : ma;
                    case et:
                    case tt:
                    case nt:
                    case it:
                    case Ke:
                    case Ie:
                    case We:
                    case Le:
                    case qe:
                        return "nominal" !== n || e.sort ? ma : {
                            compatible: !1,
                            warning: "Channel ".concat(t, " should not be used with an unsorted discrete field.")
                        };
                    case ot:
                        return T(["ordinal", "nominal"], e.type) ? ma : {
                            compatible: !1,
                            warning: "StrokeDash channel should be used with only discrete data."
                        };
                    case $e:
                        return T(["ordinal", "nominal", "geojson"], e.type) ? ma : {
                            compatible: !1,
                            warning: "Shape channel should be used with only either discrete or geojson data."
                        };
                    case at:
                        return "nominal" !== e.type || "sort" in e ? ma : {
                            compatible: !1,
                            warning: "Channel order is inappropriate for nominal field, which has no inherent order."
                        }
                }
            }(s, t) || {};
            !1 === e && si(n)
        }
        if (Nr(s) && x(s.sort)) {
            const {sort: e} = s;
            if (kr(e)) return {...s, sort: {encoding: e}};
            const t = e.substr(1);
            if ("-" === e.charAt(0) && kr(t)) return {...s, sort: {encoding: t, order: "descending"}}
        }
        if (_r(s)) {
            const {header: e} = s, {orient: t, ...n} = e;
            if (t) return {...s, header: {...n, labelOrient: e.labelOrient || t, titleOrient: e.titleOrient || t}}
        }
        return s
    }

    function pa(e, t) {
        return y(e) ? {maxbins: Sn(t)} : "binned" === e ? {binned: !0} : e.maxbins || e.step ? e : {
            ...e,
            maxbins: Sn(t)
        }
    }

    const ma = {compatible: !0};

    function ha(e) {
        const {formatType: t} = sa(e);
        return "time" === t || !t && ((n = e) && ("temporal" === n.type || qr(n) && !!n.timeUnit));
        var n
    }

    function ga(e, {timeUnit: t, type: n, wrapTime: i, undefinedIfExprNotRequired: o}) {
        var r;
        const a = t && (null === (r = Di(t)) || void 0 === r ? void 0 : r.unit);
        let s, c = a || "temporal" === n;
        return zo(e) ? s = e.expr : Fi(e) ? s = e.signal : ci(e) ? (c = !0, s = mi(e)) : (x(e) || b(e)) && c && (s = "datetime(".concat(JSON.stringify(e), ")"), function (e) {
            return !!hi[e]
        }(a) && (b(e) && e < 1e4 || x(e) && isNaN(Date.parse(e))) && (s = mi({[a]: e}))), s ? i && c ? "time(".concat(s, ")") : s : o ? void 0 : JSON.stringify(e)
    }

    function va(e, t) {
        const {type: n} = e;
        return t.map((t => {
            const i = ga(t, {timeUnit: qr(e) ? e.timeUnit : void 0, type: n, undefinedIfExprNotRequired: !0});
            return void 0 !== i ? {signal: i} : t
        }))
    }

    function ya(e, t) {
        return Fn(e.bin) ? vn(t) && T(["ordinal", "nominal"], e.type) : (console.warn("Only call this method for binned field defs."), !1)
    }

    function ba(e) {
        const {anchor: t, frame: n, offset: i, orient: o, color: r, subtitleColor: a, subtitleFont: s, subtitleFontSize: c, subtitleFontStyle: u, subtitleFontWeight: l, subtitleLineHeight: f, subtitlePadding: d, ...p} = e,
            m = {...p, ...r ? {fill: r} : {}},
            h = {...t ? {anchor: t} : {}, ...n ? {frame: n} : {}, ...i ? {offset: i} : {}, ...o ? {orient: o} : {}},
            g = {...a ? {subtitleColor: a} : {}, ...s ? {subtitleFont: s} : {}, ...c ? {subtitleFontSize: c} : {}, ...u ? {subtitleFontStyle: u} : {}, ...l ? {subtitleFontWeight: l} : {}, ...f ? {subtitleLineHeight: f} : {}, ...d ? {subtitlePadding: d} : {}};
        return {
            titleMarkConfig: m,
            subtitleMarkConfig: O(m, ["align", "baseline", "dx", "dy", "limit"]),
            nonMark: h,
            subtitle: g
        }
    }

    function xa(e) {
        return x(e) || u(e) && x(e[0])
    }

    function wa(e) {
        const t = u(e.condition) ? e.condition.map(Da) : Da(e.condition);
        return {...Aa(e), condition: t}
    }

    function Aa(e) {
        if (zo(e)) {
            const {expr: t, ...n} = e;
            return {signal: t, ...n}
        }
        return e
    }

    function Da(e) {
        if (zo(e)) {
            const {expr: t, ...n} = e;
            return {signal: t, ...n}
        }
        return e
    }

    function Fa(e) {
        if (zo(e)) {
            const {expr: t, ...n} = e;
            return {signal: t, ...n}
        }
        return Fi(e) ? e : void 0 !== e ? {value: e} : void 0
    }

    function ka(e) {
        return Fi(e) ? e.signal : w(e.value)
    }

    function Ca(e) {
        return Fi(e) ? e.signal : null == e ? null : w(e)
    }

    function Ea(e, t, n) {
        for (const i of n) {
            const n = _a(i, t.markDef, t.config);
            void 0 !== n && (e[i] = Fa(n))
        }
        return e
    }

    function Sa(e) {
        var t;
        return [].concat(e.type, null !== (t = e.style) && void 0 !== t ? t : [])
    }

    function Ba(e, t, n, i = {}) {
        const {vgChannel: o, ignoreVgConfig: r} = i;
        return o && void 0 !== t[o] ? t[o] : void 0 !== t[e] ? t[e] : !r || o && o !== e ? _a(e, t, n, i) : void 0
    }

    function _a(e, t, n, {vgChannel: i} = {}) {
        return ue(i ? za(e, t, n.style) : void 0, za(e, t, n.style), i ? n[t.type][i] : void 0, n[t.type][e], i ? n.mark[i] : n.mark[e])
    }

    function za(e, t, n) {
        return Oa(e, Sa(t), n)
    }

    function Oa(e, t, n) {
        let i;
        t = h(t);
        for (const o of t) {
            const t = n[o];
            t && void 0 !== t[e] && (i = t[e])
        }
        return i
    }

    function Na(e, t) {
        return h(e).reduce(((e, n) => {
            var i;
            return e.field.push(Kr(n, t)), e.order.push(null !== (i = n.sort) && void 0 !== i ? i : "ascending"), e
        }), {field: [], order: []})
    }

    function Pa(e, t) {
        const n = [...e];
        return t.forEach((e => {
            for (const t of n) if (_(t, e)) return;
            n.push(e)
        })), n
    }

    function ja(e, t) {
        return _(e, t) || !t ? e : e ? [...h(e), ...h(t)].join(", ") : t
    }

    function Ma(e, t) {
        const n = e.value, i = t.value;
        if (null == n || null === i) return {explicit: e.explicit, value: null};
        if ((xa(n) || Fi(n)) && (xa(i) || Fi(i))) return {explicit: e.explicit, value: ja(n, i)};
        if (xa(n) || Fi(n)) return {explicit: e.explicit, value: n};
        if (xa(i) || Fi(i)) return {explicit: e.explicit, value: i};
        if (!(xa(n) || Fi(n) || xa(i) || Fi(i))) return {explicit: e.explicit, value: Pa(n, i)};
        throw new Error("It should never reach here")
    }

    function Ta(e) {
        return "mark" in e
    }

    class La {
        constructor(e, t) {
            this.name = e, this.run = t
        }

        hasMatchingType(e) {
            return !!Ta(e) && ($o(t = e.mark) ? t.type : t) === this.name;
            var t
        }
    }

    function qa(e, t) {
        const n = e && e[t];
        return !!n && (u(n) ? L(n, (e => !!e.field)) : qr(n) || Tr(n))
    }

    function Ra(e) {
        return L(At, (t => {
            if (qa(e, t)) {
                const n = e[t];
                if (u(n)) return L(n, (e => !!e.aggregate));
                {
                    const e = ca(n);
                    return e && !!e.aggregate
                }
            }
            return !1
        }))
    }

    function Wa(e, t) {
        const n = [], i = [], o = [], r = [], a = {};
        return Ha(e, ((s, c) => {
            if (qr(s)) {
                const {field: u, aggregate: l, bin: f, timeUnit: d, ...p} = s;
                if (l || d || f) {
                    const e = ra(s), m = e && e.title;
                    let h = Kr(s, {forAs: !0});
                    const g = {...m ? [] : {title: oa(s, t, {allowDisabling: !0})}, ...p, field: h};
                    if (l) {
                        let e;
                        if (Ee(l) ? (e = "argmax", h = Kr({
                            op: "argmax",
                            field: l.argmax
                        }, {forAs: !0}), g.field = "".concat(h, ".").concat(u)) : Ce(l) ? (e = "argmin", h = Kr({
                            op: "argmin",
                            field: l.argmin
                        }, {forAs: !0}), g.field = "".concat(h, ".").concat(u)) : "boxplot" !== l && "errorbar" !== l && "errorband" !== l && (e = l), e) {
                            const t = {op: e, as: h};
                            u && (t.field = u), r.push(t)
                        }
                    } else if (n.push(h), Gr(s) && Fn(f)) {
                        if (i.push({
                            bin: f,
                            field: u,
                            as: h
                        }), n.push(Kr(s, {binSuffix: "end"})), ya(s, c) && n.push(Kr(s, {binSuffix: "range"})), en(c)) {
                            const e = {field: h + "_end"};
                            a[c + "2"] = e
                        }
                        g.bin = "binned", Nt(c) || (g.type = Ui)
                    } else if (d) {
                        o.push({timeUnit: d, field: u, as: h});
                        const e = Gr(s) && s.type !== Hi && "time";
                        e && (c === rt || c === ut ? g.formatType = e : !function (e) {
                            return !!Qt[e]
                        }(c) ? en(c) && (g.axis = {formatType: e, ...g.axis}) : g.legend = {formatType: e, ...g.legend})
                    }
                    a[c] = g
                } else n.push(u), a[c] = e[c]
            } else a[c] = e[c]
        })), {bins: i, timeUnits: o, aggregate: r, groupby: n, encoding: a}
    }

    function Ua(e, t, n, i) {
        return J(e).reduce(((o, r) => {
            if (!zt(r)) return si(function (e) {
                return "".concat(e, "-encoding is dropped as ").concat(e, " is not a valid encoding channel.")
            }(r)), o;
            const a = e[r];
            if ("angle" !== r || "arc" !== t || e.theta || (si("Arc marks uses theta channel rather than angle, replacing angle with theta."), r = Ue), !function (e, t, n) {
                const i = yn(t, n);
                if (!i) return !1;
                if ("binned" === i) {
                    const n = e[t === Le ? Me : Te];
                    return !!(qr(n) && qr(e[t]) && kn(n.bin))
                }
                return !0
            }(e, r, t)) return si(Yn(r, t)), o;
            if (r === Ke && "line" === t) {
                const t = ca(e[r]);
                if (null == t ? void 0 : t.aggregate) return si("Line marks cannot encode size with a non-groupby field. You may want to use trail marks instead."), o
            }
            if (r === Je && (n ? "fill" in e : "stroke" in e)) return si(Gn("encoding", {
                fill: "fill" in e,
                stroke: "stroke" in e
            })), o;
            if (r === st || r === at && !u(a) && !Vr(a) || r === ut && u(a)) a && (o[r] = h(a).reduce(((e, t) => (qr(t) ? e.push(da(t, r)) : si(Vn(t, r)), e)), [])); else {
                if (r === ut && null === a) o[r] = null; else if (!(qr(a) || Wr(a) || Vr(a) || Mr(a) || Fi(a))) return si(Vn(a, r)), o;
                o[r] = la(a, r, i)
            }
            return o
        }), {})
    }

    function Ia(e, t) {
        const n = {};
        for (const i of J(e)) {
            const o = la(e[i], i, t, {compositeMark: !0});
            n[i] = o
        }
        return n
    }

    function Ha(e, t, n) {
        if (e) for (const i of J(e)) {
            const o = e[i];
            if (u(o)) for (const e of o) t.call(n, e, i); else t.call(n, o, i)
        }
    }

    function Ga(e, t) {
        return J(t).reduce(((n, i) => {
            switch (i) {
                case Me:
                case Te:
                case lt:
                case dt:
                case ft:
                case Le:
                case qe:
                case Ue:
                case Ie:
                case Re:
                case We:
                case He:
                case Ge:
                case Ve:
                case Ye:
                case rt:
                case $e:
                case Ze:
                case ut:
                    return n;
                case at:
                    if ("line" === e || "trail" === e) return n;
                case st:
                case ct: {
                    const e = t[i];
                    if (u(e) || qr(e)) for (const t of h(e)) t.aggregate || n.push(Kr(t, {}));
                    return n
                }
                case Ke:
                    if ("trail" === e) return n;
                case Je:
                case Xe:
                case Qe:
                case et:
                case tt:
                case nt:
                case ot:
                case it: {
                    const e = ca(t[i]);
                    return e && !e.aggregate && n.push(Kr(e, {})), n
                }
            }
        }), [])
    }

    function Va(e, t, n, i = !0) {
        if ("tooltip" in n) return {tooltip: n.tooltip};
        return {
            tooltip: [...e.map((({fieldPrefix: e, titlePrefix: n}) => {
                const o = i ? " of ".concat(Ya(t)) : "";
                return {
                    field: e + t.field,
                    type: t.type,
                    title: Fi(n) ? {signal: n + '"'.concat(escape(o), '"')} : n + o
                }
            })), ...U(function (e) {
                const t = [];
                for (const n of J(e)) if (qa(e, n)) {
                    const i = h(e[n]);
                    for (const e of i) qr(e) ? t.push(e) : Tr(e) && t.push(e.condition)
                }
                return t
            }(n).map($r), j)]
        }
    }

    function Ya(e) {
        const {title: t, field: n} = e;
        return ue(t, n)
    }

    function Ja(e, t, n, i, o) {
        const {scale: r, axis: a} = n;
        return ({partName: s, mark: c, positionPrefix: u, endPositionPrefix: l, extraEncoding: f = {}}) => {
            const d = Ya(n);
            return Xa(e, s, o, {
                mark: c,
                encoding: {
                    [t]: {
                        field: u + "_" + n.field,
                        type: n.type, ...void 0 !== d ? {title: d} : {}, ...void 0 !== r ? {scale: r} : {}, ...void 0 !== a ? {axis: a} : {}
                    }, ...x(l) ? {[t + "2"]: {field: l + "_" + n.field}} : {}, ...i, ...f
                }
            })
        }
    }

    function Xa(e, t, n, i) {
        const {clip: o, color: r, opacity: a} = e, s = e.type;
        return e[t] || void 0 === e[t] && n[t] ? [{
            ...i,
            mark: {
                ...n[t], ...o ? {clip: o} : {}, ...r ? {color: r} : {}, ...a ? {opacity: a} : {}, ...$o(i.mark) ? i.mark : {type: i.mark},
                style: "".concat(s, "-").concat(t), ...y(e[t]) ? {} : e[t]
            }
        }] : []
    }

    function Qa(e, t, n) {
        const {encoding: i} = e, o = "vertical" === t ? "y" : "x", r = i[o], a = i[o + "2"], s = i[o + "Error"],
            c = i[o + "Error2"];
        return {
            continuousAxisChannelDef: $a(r, n),
            continuousAxisChannelDef2: $a(a, n),
            continuousAxisChannelDefError: $a(s, n),
            continuousAxisChannelDefError2: $a(c, n),
            continuousAxis: o
        }
    }

    function $a(e, t) {
        if (e && e.aggregate) {
            const {aggregate: n, ...i} = e;
            return n !== t && si(function (e, t) {
                return "Continuous axis should not have customized aggregation function ".concat(e, "; ").concat(t, " already agregates the axis.")
            }(n, t)), i
        }
        return e
    }

    function Ka(e, t) {
        const {mark: n, encoding: i} = e, {x: o, y: r} = i;
        if ($o(n) && n.orient) return n.orient;
        if (Ur(o)) {
            if (Ur(r)) {
                const e = qr(o) && o.aggregate, n = qr(r) && r.aggregate;
                if (e || n !== t) {
                    if (n || e !== t) {
                        if (e === t && n === t) throw new Error("Both x and y cannot have aggregate");
                        return ha(r) && !ha(o) ? "horizontal" : "vertical"
                    }
                    return "horizontal"
                }
                return "vertical"
            }
            return "horizontal"
        }
        if (Ur(r)) return "vertical";
        throw new Error("Need a valid continuous axis for ".concat(t, "s"))
    }

    const Za = "boxplot", es = new La(Za, ns);

    function ts(e) {
        return b(e) ? "tukey" : e
    }

    function ns(e, {config: t}) {
        var n;
        e = {...e, encoding: Ia(e.encoding, t)};
        const {mark: i, encoding: o, selection: r, projection: a, ...s} = e, c = $o(i) ? i : {type: i};
        r && si(qn("boxplot"));
        const f = null !== (n = c.extent) && void 0 !== n ? n : t.boxplot.extent, d = Ba("size", c, t),
            p = ts(f), {bins: m, timeUnits: h, transform: g, continuousAxisChannelDef: v, continuousAxis: y, groupby: b, aggregate: x, encodingWithoutContinuousAxis: w, ticksOrient: A, boxOrient: D, customTooltipWithoutAggregatedField: F} = function (e, t, n) {
                const i = Ka(e, Za), {continuousAxisChannelDef: o, continuousAxis: r} = Qa(e, i, Za), a = o.field,
                    s = ts(t), c = [...is(a), {op: "median", field: a, as: "mid_box_" + a}, {
                        op: "min",
                        field: a,
                        as: ("min-max" === s ? "lower_whisker_" : "min_") + a
                    }, {op: "max", field: a, as: ("min-max" === s ? "upper_whisker_" : "max_") + a}],
                    l = "min-max" === s || "tukey" === s ? [] : [{
                        calculate: 'datum["upper_box_'.concat(a, '"] - datum["lower_box_').concat(a, '"]'),
                        as: "iqr_" + a
                    }, {
                        calculate: 'min(datum["upper_box_'.concat(a, '"] + datum["iqr_').concat(a, '"] * ').concat(t, ', datum["max_').concat(a, '"])'),
                        as: "upper_whisker_" + a
                    }, {
                        calculate: 'max(datum["lower_box_'.concat(a, '"] - datum["iqr_').concat(a, '"] * ').concat(t, ', datum["min_').concat(a, '"])'),
                        as: "lower_whisker_" + a
                    }], {[r]: f, ...d} = e.encoding, {customTooltipWithoutAggregatedField: p, filteredEncoding: m} = function (e) {
                        const {tooltip: t, ...n} = e;
                        if (!t) return {filteredEncoding: n};
                        let i, o;
                        if (u(t)) {
                            for (const e of t) e.aggregate ? (i || (i = []), i.push(e)) : (o || (o = []), o.push(e));
                            i && (n.tooltip = i)
                        } else t.aggregate ? n.tooltip = t : o = t;
                        return u(o) && 1 === o.length && (o = o[0]), {
                            customTooltipWithoutAggregatedField: o,
                            filteredEncoding: n
                        }
                    }(d), {bins: h, timeUnits: g, aggregate: v, groupby: y, encoding: b} = Wa(m, n),
                    x = "vertical" === i ? "horizontal" : "vertical", w = i,
                    A = [...h, ...g, {aggregate: [...v, ...c], groupby: y}, ...l];
                return {
                    bins: h,
                    timeUnits: g,
                    transform: A,
                    groupby: y,
                    aggregate: v,
                    continuousAxisChannelDef: o,
                    continuousAxis: r,
                    encodingWithoutContinuousAxis: b,
                    ticksOrient: x,
                    boxOrient: w,
                    customTooltipWithoutAggregatedField: p
                }
            }(e, f, t), {color: k, size: C, ...E} = w, S = e => Ja(c, y, v, e, t.boxplot), B = S(E), _ = S(w),
            z = S({...E, ...C ? {size: C} : {}}), O = Va([{
                fieldPrefix: "min-max" === p ? "upper_whisker_" : "max_",
                titlePrefix: "Max"
            }, {fieldPrefix: "upper_box_", titlePrefix: "Q3"}, {
                fieldPrefix: "mid_box_",
                titlePrefix: "Median"
            }, {fieldPrefix: "lower_box_", titlePrefix: "Q1"}, {
                fieldPrefix: "min-max" === p ? "lower_whisker_" : "min_",
                titlePrefix: "Min"
            }], v, w), P = {type: "tick", color: "black", opacity: 1, orient: A, invalid: null, aria: !1},
            j = "min-max" === p ? O : Va([{
                fieldPrefix: "upper_whisker_",
                titlePrefix: "Upper Whisker"
            }, {fieldPrefix: "lower_whisker_", titlePrefix: "Lower Whisker"}], v, w), M = [...B({
                partName: "rule",
                mark: {type: "rule", invalid: null, aria: !1},
                positionPrefix: "lower_whisker",
                endPositionPrefix: "lower_box",
                extraEncoding: j
            }), ...B({
                partName: "rule",
                mark: {type: "rule", invalid: null, aria: !1},
                positionPrefix: "upper_box",
                endPositionPrefix: "upper_whisker",
                extraEncoding: j
            }), ...B({
                partName: "ticks",
                mark: P,
                positionPrefix: "lower_whisker",
                extraEncoding: j
            }), ...B({partName: "ticks", mark: P, positionPrefix: "upper_whisker", extraEncoding: j})],
            T = [..."tukey" !== p ? M : [], ..._({
                partName: "box",
                mark: {type: "bar", ...d ? {size: d} : {}, orient: D, invalid: null, ariaRoleDescription: "box"},
                positionPrefix: "lower_box",
                endPositionPrefix: "upper_box",
                extraEncoding: O
            }), ...z({
                partName: "median",
                mark: {
                    type: "tick",
                    invalid: null, ...l(t.boxplot.median) && t.boxplot.median.color ? {color: t.boxplot.median.color} : {}, ...d ? {size: d} : {},
                    orient: A,
                    aria: !1
                },
                positionPrefix: "mid_box",
                extraEncoding: O
            })];
        var L;
        if ("min-max" === p) return {
            ...s,
            transform: (null !== (L = s.transform) && void 0 !== L ? L : []).concat(g),
            layer: T
        };
        const q = 'datum["lower_box_'.concat(v.field, '"]'), R = 'datum["upper_box_'.concat(v.field, '"]'),
            W = "(".concat(R, " - ").concat(q, ")"), U = "".concat(q, " - ").concat(f, " * ").concat(W),
            I = "".concat(R, " + ").concat(f, " * ").concat(W), H = 'datum["'.concat(v.field, '"]'),
            G = {joinaggregate: is(v.field), groupby: b}, V = {
                transform: [{filter: "(".concat(U, " <= ").concat(H, ") && (").concat(H, " <= ").concat(I, ")")}, {
                    aggregate: [{
                        op: "min",
                        field: v.field,
                        as: "lower_whisker_" + v.field
                    }, {op: "max", field: v.field, as: "upper_whisker_" + v.field}, {
                        op: "min",
                        field: "lower_box_" + v.field,
                        as: "lower_box_" + v.field
                    }, {op: "max", field: "upper_box_" + v.field, as: "upper_box_" + v.field}, ...x], groupby: b
                }], layer: M
            }, {tooltip: J, ...X} = E, {scale: Q, axis: $} = v, K = Ya(v), Z = N($, ["title"]),
            ee = Xa(c, "outliers", t.boxplot, {
                transform: [{filter: "(".concat(H, " < ").concat(U, ") || (").concat(H, " > ").concat(I, ")")}],
                mark: "point",
                encoding: {
                    [y]: {
                        field: v.field,
                        type: v.type, ...void 0 !== K ? {title: K} : {}, ...void 0 !== Q ? {scale: Q} : {}, ...Y(Z) ? {} : {axis: Z}
                    }, ...X, ...k ? {color: k} : {}, ...F ? {tooltip: F} : {}
                }
            })[0];
        let te;
        const ne = [...m, ...h, G];
        return ee ? te = {transform: ne, layer: [ee, V]} : (te = V, te.transform.unshift(...ne)), {
            ...s,
            layer: [te, {transform: g, layer: T}]
        }
    }

    function is(e) {
        return [{op: "q1", field: e, as: "lower_box_" + e}, {op: "q3", field: e, as: "upper_box_" + e}]
    }

    const os = "errorbar", rs = new La(os, as);

    function as(e, {config: t}) {
        e = {...e, encoding: Ia(e.encoding, t)};
        const {transform: n, continuousAxisChannelDef: i, continuousAxis: o, encodingWithoutContinuousAxis: r, ticksOrient: a, markDef: s, outerSpec: c, tooltipEncoding: u} = cs(e, os, t);
        delete r.size;
        const l = Ja(s, o, i, r, t.errorbar), f = s.thickness, d = s.size, p = {
            type: "tick",
            orient: a,
            aria: !1, ...void 0 !== f ? {thickness: f} : {}, ...void 0 !== d ? {size: d} : {}
        }, m = [...l({partName: "ticks", mark: p, positionPrefix: "lower", extraEncoding: u}), ...l({
            partName: "ticks",
            mark: p,
            positionPrefix: "upper",
            extraEncoding: u
        }), ...l({
            partName: "rule",
            mark: {type: "rule", ariaRoleDescription: "errorbar", ...void 0 !== f ? {size: f} : {}},
            positionPrefix: "lower",
            endPositionPrefix: "upper",
            extraEncoding: u
        })];
        return {...c, transform: n, ...m.length > 1 ? {layer: m} : {...m[0]}}
    }

    function ss(e, t) {
        const {encoding: n} = e;
        if (function (e) {
            return (Hr(e.x) || Hr(e.y)) && !Hr(e.x2) && !Hr(e.y2) && !Hr(e.xError) && !Hr(e.xError2) && !Hr(e.yError) && !Hr(e.yError2)
        }(n)) return {orient: Ka(e, t), inputType: "raw"};
        const i = function (e) {
            return Hr(e.x2) || Hr(e.y2)
        }(n), o = function (e) {
            return Hr(e.xError) || Hr(e.xError2) || Hr(e.yError) || Hr(e.yError2)
        }(n), r = n.x, a = n.y;
        if (i) {
            if (o) throw new Error("".concat(t, " cannot be both type aggregated-upper-lower and aggregated-error"));
            const e = n.x2, i = n.y2;
            if (Hr(e) && Hr(i)) throw new Error("".concat(t, " cannot have both x2 and y2"));
            if (Hr(e)) {
                if (Ur(r)) return {orient: "horizontal", inputType: "aggregated-upper-lower"};
                throw new Error("Both x and x2 have to be quantitative in ".concat(t))
            }
            if (Hr(i)) {
                if (Ur(a)) return {orient: "vertical", inputType: "aggregated-upper-lower"};
                throw new Error("Both y and y2 have to be quantitative in ".concat(t))
            }
            throw new Error("No ranged axis")
        }
        {
            const e = n.xError, i = n.xError2, o = n.yError, s = n.yError2;
            if (Hr(i) && !Hr(e)) throw new Error("".concat(t, " cannot have xError2 without xError"));
            if (Hr(s) && !Hr(o)) throw new Error("".concat(t, " cannot have yError2 without yError"));
            if (Hr(e) && Hr(o)) throw new Error("".concat(t, " cannot have both xError and yError with both are quantiative"));
            if (Hr(e)) {
                if (Ur(r)) return {orient: "horizontal", inputType: "aggregated-error"};
                throw new Error("All x, xError, and xError2 (if exist) have to be quantitative")
            }
            if (Hr(o)) {
                if (Ur(a)) return {orient: "vertical", inputType: "aggregated-error"};
                throw new Error("All y, yError, and yError2 (if exist) have to be quantitative")
            }
            throw new Error("No ranged axis")
        }
    }

    function cs(e, t, n) {
        var i;
        const {mark: o, encoding: r, selection: a, projection: s, ...c} = e, u = $o(o) ? o : {type: o};
        a && si(qn(t));
        const {orient: l, inputType: f} = ss(e, t), {continuousAxisChannelDef: d, continuousAxisChannelDef2: p, continuousAxisChannelDefError: m, continuousAxisChannelDefError2: h, continuousAxis: g} = Qa(e, l, t), {errorBarSpecificAggregate: v, postAggregateCalculates: y, tooltipSummary: b, tooltipTitleWithFieldName: x} = function (e, t, n, i, o, r, a, s) {
                let c = [], u = [];
                const l = t.field;
                let f, d = !1;
                if ("raw" === r) {
                    const t = e.center ? e.center : e.extent ? "iqr" === e.extent ? "median" : "mean" : s.errorbar.center,
                        n = e.extent ? e.extent : "mean" === t ? "stderr" : "iqr";
                    if ("median" === t != ("iqr" === n) && si(function (e, t, n) {
                        return "".concat(e, " is not usually used with ").concat(t, " for ").concat(n, ".")
                    }(t, n, a)), "stderr" === n || "stdev" === n) c = [{op: n, field: l, as: "extent_" + l}, {
                        op: t,
                        field: l,
                        as: "center_" + l
                    }], u = [{
                        calculate: 'datum["center_'.concat(l, '"] + datum["extent_').concat(l, '"]'),
                        as: "upper_" + l
                    }, {
                        calculate: 'datum["center_'.concat(l, '"] - datum["extent_').concat(l, '"]'),
                        as: "lower_" + l
                    }], f = [{fieldPrefix: "center_", titlePrefix: te(t)}, {
                        fieldPrefix: "upper_",
                        titlePrefix: us(t, n, "+")
                    }, {fieldPrefix: "lower_", titlePrefix: us(t, n, "-")}], d = !0; else {
                        let e, t, i;
                        "ci" === n ? (e = "mean", t = "ci0", i = "ci1") : (e = "median", t = "q1", i = "q3"), c = [{
                            op: t,
                            field: l,
                            as: "lower_" + l
                        }, {op: i, field: l, as: "upper_" + l}, {
                            op: e,
                            field: l,
                            as: "center_" + l
                        }], f = [{
                            fieldPrefix: "upper_",
                            titlePrefix: oa({field: l, aggregate: i, type: "quantitative"}, s, {allowDisabling: !1})
                        }, {
                            fieldPrefix: "lower_",
                            titlePrefix: oa({field: l, aggregate: t, type: "quantitative"}, s, {allowDisabling: !1})
                        }, {
                            fieldPrefix: "center_",
                            titlePrefix: oa({field: l, aggregate: e, type: "quantitative"}, s, {allowDisabling: !1})
                        }]
                    }
                } else {
                    (e.center || e.extent) && si((p = e.center, m = e.extent, "".concat(m ? "extent " : "").concat(m && p ? "and " : "").concat(p ? "center " : "").concat(m && p ? "are " : "is ", "not needed when data are aggregated."))), "aggregated-upper-lower" === r ? (f = [], u = [{
                        calculate: 'datum["'.concat(n.field, '"]'),
                        as: "upper_" + l
                    }, {
                        calculate: 'datum["'.concat(l, '"]'),
                        as: "lower_" + l
                    }]) : "aggregated-error" === r && (f = [{
                        fieldPrefix: "",
                        titlePrefix: l
                    }], u = [{
                        calculate: 'datum["'.concat(l, '"] + datum["').concat(i.field, '"]'),
                        as: "upper_" + l
                    }], o ? u.push({
                        calculate: 'datum["'.concat(l, '"] + datum["').concat(o.field, '"]'),
                        as: "lower_" + l
                    }) : u.push({calculate: 'datum["'.concat(l, '"] - datum["').concat(i.field, '"]'), as: "lower_" + l}));
                    for (const e of u) f.push({
                        fieldPrefix: e.as.substring(0, 6),
                        titlePrefix: ae(ae(e.calculate, 'datum["', ""), '"]', "")
                    })
                }
                var p, m;
                return {
                    postAggregateCalculates: u,
                    errorBarSpecificAggregate: c,
                    tooltipSummary: f,
                    tooltipTitleWithFieldName: d
                }
            }(u, d, p, m, h, f, t, n), {[g]: w, ["x" === g ? "x2" : "y2"]: A, ["x" === g ? "xError" : "yError"]: D, ["x" === g ? "xError2" : "yError2"]: F, ...k} = r, {bins: C, timeUnits: E, aggregate: S, groupby: B, encoding: _} = Wa(k, n),
            z = [...S, ...v], O = "raw" !== f ? [] : B, N = Va(b, d, _, x);
        return {
            transform: [...null !== (i = c.transform) && void 0 !== i ? i : [], ...C, ...E, ...0 === z.length ? [] : [{
                aggregate: z,
                groupby: O
            }], ...y],
            groupby: O,
            continuousAxisChannelDef: d,
            continuousAxis: g,
            encodingWithoutContinuousAxis: _,
            ticksOrient: "vertical" === l ? "horizontal" : "vertical",
            markDef: u,
            outerSpec: c,
            tooltipEncoding: N
        }
    }

    function us(e, t, n) {
        return te(e) + " " + n + " " + t
    }

    const ls = "errorband", fs = new La(ls, ds);

    function ds(e, {config: t}) {
        e = {...e, encoding: Ia(e.encoding, t)};
        const {transform: n, continuousAxisChannelDef: i, continuousAxis: o, encodingWithoutContinuousAxis: r, markDef: a, outerSpec: s, tooltipEncoding: c} = cs(e, ls, t),
            u = a, l = Ja(u, o, i, r, t.errorband), f = void 0 !== e.encoding.x && void 0 !== e.encoding.y;
        let d = {type: f ? "area" : "rect"}, p = {type: f ? "line" : "rule"};
        const m = {...u.interpolate ? {interpolate: u.interpolate} : {}, ...u.tension && u.interpolate ? {tension: u.tension} : {}};
        return f ? (d = {...d, ...m, ariaRoleDescription: "errorband"}, p = {
            ...p, ...m,
            aria: !1
        }) : u.interpolate ? si(ii("interpolate")) : u.tension && si(ii("tension")), {
            ...s,
            transform: n,
            layer: [...l({
                partName: "band",
                mark: d,
                positionPrefix: "lower",
                endPositionPrefix: "upper",
                extraEncoding: c
            }), ...l({
                partName: "borders",
                mark: p,
                positionPrefix: "lower",
                extraEncoding: c
            }), ...l({partName: "borders", mark: p, positionPrefix: "upper", extraEncoding: c})]
        }
    }

    const ps = {};

    function ms(e, t, n) {
        const i = new La(e, t);
        ps[e] = {normalizer: i, parts: n}
    }

    ms(Za, ns, ["box", "median", "outliers", "rule", "ticks"]), ms(os, as, ["ticks", "rule"]), ms(ls, ds, ["band", "borders"]);
    const hs = ["gradientHorizontalMaxLength", "gradientHorizontalMinLength", "gradientVerticalMaxLength", "gradientVerticalMinLength", "unselectedOpacity"],
        gs = {
            titleAlign: "align",
            titleAnchor: "anchor",
            titleAngle: "angle",
            titleBaseline: "baseline",
            titleColor: "color",
            titleFont: "font",
            titleFontSize: "fontSize",
            titleFontStyle: "fontStyle",
            titleFontWeight: "fontWeight",
            titleLimit: "limit",
            titleLineHeight: "lineHeight",
            titleOrient: "orient",
            titlePadding: "offset"
        }, vs = {
            labelAlign: "align",
            labelAnchor: "anchor",
            labelAngle: "angle",
            labelBaseline: "baseline",
            labelColor: "color",
            labelFont: "font",
            labelFontSize: "fontSize",
            labelFontStyle: "fontStyle",
            labelFontWeight: "fontWeight",
            labelLimit: "limit",
            labelLineHeight: "lineHeight",
            labelOrient: "orient",
            labelPadding: "offset"
        }, ys = J(gs), bs = J(vs), xs = J({header: 1, headerRow: 1, headerColumn: 1, headerFacet: 1}),
        ws = ["size", "shape", "fill", "stroke", "strokeDash", "strokeWidth", "opacity"];

    function As(e) {
        const t = [];
        for (const n of e || []) {
            const {expr: e, bind: i, ...o} = n;
            if (i && e) {
                const n = {...o, bind: i, init: e};
                t.push(n)
            } else {
                const n = {...o, ...e ? {update: e} : {}, ...i ? {bind: i} : {}};
                t.push(n)
            }
        }
        return t
    }

    const Ds = "_vgsid_", Fs = {
        single: {on: "click", fields: [Ds], resolve: "global", empty: "all", clear: "dblclick"},
        multi: {
            on: "click",
            fields: [Ds],
            toggle: "event.shiftKey",
            resolve: "global",
            empty: "all",
            clear: "dblclick"
        },
        interval: {
            on: "[mousedown, window:mouseup] > window:mousemove!",
            encodings: ["x", "y"],
            translate: "[mousedown, window:mouseup] > window:mousemove!",
            zoom: "wheel!",
            mark: {fill: "#333", fillOpacity: .125, stroke: "white"},
            resolve: "global",
            clear: "dblclick"
        }
    };

    function ks(e) {
        return !(!e || "legend" !== e && !e.legend)
    }

    function Cs(e) {
        return ks(e) && l(e)
    }

    function Es(e) {
        return "concat" in e
    }

    function Ss(e) {
        return "vconcat" in e
    }

    function Bs(e) {
        return "hconcat" in e
    }

    const _s = ["background", "padding"];

    function zs(e, t) {
        const n = {};
        for (const t of _s) e && void 0 !== e[t] && (n[t] = Aa(e[t]));
        return t && (n.params = e.params), n
    }

    function Os(e) {
        return l(e) && void 0 !== e.step
    }

    function Ns(e) {
        return e.view || e.width || e.height
    }

    const Ps = J({align: 1, bounds: 1, center: 1, columns: 1, spacing: 1});

    function js(e, t) {
        var n;
        return null !== (n = e[t]) && void 0 !== n ? n : e["width" === t ? "continuousWidth" : "continuousHeight"]
    }

    function Ms(e, t) {
        const n = Ts(e, t);
        return Os(n) ? n.step : Ls
    }

    function Ts(e, t) {
        var n;
        return ue(null !== (n = e[t]) && void 0 !== n ? n : e["width" === t ? "discreteWidth" : "discreteHeight"], {step: e.step})
    }

    const Ls = 20, qs = {
            background: "white",
            padding: 5,
            timeFormat: "%b %d, %Y",
            countTitle: "Count of Records",
            view: {continuousWidth: 200, continuousHeight: 200, step: Ls},
            mark: {color: "#4c78a8", invalid: "filter", timeUnitBand: 1},
            arc: {},
            area: {},
            bar: nr,
            circle: {},
            geoshape: {},
            image: {},
            line: {},
            point: {},
            rect: ir,
            rule: {color: "black"},
            square: {},
            text: {color: "black"},
            tick: {thickness: 1},
            trail: {},
            boxplot: {size: 14, extent: 1.5, box: {}, median: {color: "white"}, outliers: {}, rule: {}, ticks: null},
            errorbar: {center: "mean", rule: !0, ticks: !1},
            errorband: {band: {opacity: .3}, borders: !1},
            scale: {
                pointPadding: .5,
                barBandPaddingInner: .1,
                rectBandPaddingInner: 0,
                minBandSize: 2,
                minFontSize: 8,
                maxFontSize: 40,
                minOpacity: .3,
                maxOpacity: .8,
                minSize: 9,
                minStrokeWidth: 1,
                maxStrokeWidth: 4,
                quantileCount: 4,
                quantizeCount: 4
            },
            projection: {},
            legend: {
                gradientHorizontalMaxLength: 200,
                gradientHorizontalMinLength: 100,
                gradientVerticalMaxLength: 200,
                gradientVerticalMinLength: 64,
                unselectedOpacity: .35
            },
            header: {titlePadding: 10, labelPadding: 10},
            headerColumn: {},
            headerRow: {},
            headerFacet: {},
            selection: Fs,
            style: {},
            title: {},
            facet: {spacing: 20},
            concat: {spacing: 20}
        },
        Rs = ["#4c78a8", "#f58518", "#e45756", "#72b7b2", "#54a24b", "#eeca3b", "#b279a2", "#ff9da6", "#9d755d", "#bab0ac"],
        Ws = {text: 11, guideLabel: 10, guideTitle: 11, groupTitle: 13, groupSubtitle: 12}, Us = {
            blue: Rs[0],
            orange: Rs[1],
            red: Rs[2],
            teal: Rs[3],
            green: Rs[4],
            yellow: Rs[5],
            purple: Rs[6],
            pink: Rs[7],
            brown: Rs[8],
            gray0: "#000",
            gray1: "#111",
            gray2: "#222",
            gray3: "#333",
            gray4: "#444",
            gray5: "#555",
            gray6: "#666",
            gray7: "#777",
            gray8: "#888",
            gray9: "#999",
            gray10: "#aaa",
            gray11: "#bbb",
            gray12: "#ccc",
            gray13: "#ddd",
            gray14: "#eee",
            gray15: "#fff"
        };

    function Is(e) {
        const t = J(e || {}), n = {};
        for (const i of t) {
            const t = e[i];
            n[i] = ve(t) ? wa(t) : Aa(t)
        }
        return n
    }

    const Hs = [...er, ...De, ...xs, "background", "padding", "legend", "lineBreak", "scale", "style", "title", "view"];

    function Gs(e = {}) {
        const {color: t, font: n, fontSize: i, ...o} = e, r = d({}, qs, n ? function (e) {
            return {
                text: {font: e},
                style: {
                    "guide-label": {font: e},
                    "guide-title": {font: e},
                    "group-title": {font: e},
                    "group-subtitle": {font: e}
                }
            }
        }(n) : {}, t ? function (e = {}) {
            return {
                signals: [{name: "color", value: l(e) ? {...Us, ...e} : Us}],
                mark: {color: {signal: "color.blue"}},
                rule: {color: {signal: "color.gray0"}},
                text: {color: {signal: "color.gray0"}},
                style: {
                    "guide-label": {fill: {signal: "color.gray0"}},
                    "guide-title": {fill: {signal: "color.gray0"}},
                    "group-title": {fill: {signal: "color.gray0"}},
                    "group-subtitle": {fill: {signal: "color.gray0"}},
                    cell: {stroke: {signal: "color.gray8"}}
                },
                axis: {
                    domainColor: {signal: "color.gray13"},
                    gridColor: {signal: "color.gray8"},
                    tickColor: {signal: "color.gray13"}
                },
                range: {category: [{signal: "color.blue"}, {signal: "color.orange"}, {signal: "color.red"}, {signal: "color.teal"}, {signal: "color.green"}, {signal: "color.yellow"}, {signal: "color.purple"}, {signal: "color.pink"}, {signal: "color.brown"}, {signal: "color.grey8"}]}
            }
        }(t) : {}, i ? function (e) {
            return {
                signals: [{name: "fontSize", value: l(e) ? {...Ws, ...e} : Ws}],
                text: {fontSize: {signal: "fontSize.text"}},
                style: {
                    "guide-label": {fontSize: {signal: "fontSize.guideLabel"}},
                    "guide-title": {fontSize: {signal: "fontSize.guideTitle"}},
                    "group-title": {fontSize: {signal: "fontSize.groupTitle"}},
                    "group-subtitle": {fontSize: {signal: "fontSize.groupSubtitle"}}
                }
            }
        }(i) : {}, o || {}), a = N(r, Hs);
        for (const e of ["background", "lineBreak", "padding"]) r[e] && (a[e] = Aa(r[e]));
        for (const e of er) r[e] && (a[e] = Oo(r[e]));
        for (const e of De) r[e] && (a[e] = Is(r[e]));
        for (const e of xs) r[e] && (a[e] = Oo(r[e]));
        return r.legend && (a.legend = Oo(r.legend)), r.scale && (a.scale = Oo(r.scale)), r.style && (a.style = function (e) {
            const t = J(e), n = {};
            for (const i of t) n[i] = Is(e[i]);
            return n
        }(r.style)), r.title && (a.title = Oo(r.title)), r.view && (a.view = Oo(r.view)), a
    }

    const Vs = ["view", ...Qo],
        Ys = ["color", "fontSize", "background", "padding", "facet", "concat", "numberFormat", "timeFormat", "countTitle", "header", "axisQuantitative", "axisTemporal", "axisDiscrete", "axisPoint", "axisXBand", "axisXPoint", "axisXDiscrete", "axisXQuantitative", "axisXTemporal", "axisYBand", "axisYPoint", "axisYDiscrete", "axisYQuantitative", "axisYTemporal", "scale", "selection", "overlay"],
        Js = {
            view: ["continuousWidth", "continuousHeight", "discreteWidth", "discreteHeight", "step"],
            area: ["line", "point"],
            bar: ["binSpacing", "continuousBandSize", "discreteBandSize"],
            rect: ["binSpacing", "continuousBandSize", "discreteBandSize"],
            line: ["point"],
            tick: ["bandSize", "thickness"]
        };

    function Xs(e) {
        e = z(e);
        for (const t of Ys) delete e[t];
        if (e.axis) for (const t in e.axis) ve(e.axis[t]) && delete e.axis[t];
        if (e.legend) for (const t of hs) delete e.legend[t];
        if (e.mark) {
            for (const t of Zo) delete e.mark[t];
            e.mark.tooltip && l(e.mark.tooltip) && delete e.mark.tooltip
        }
        e.params && (e.signals = (e.signals || []).concat(As(e.params)), delete e.params);
        for (const t of Vs) {
            for (const n of Zo) delete e[t][n];
            const n = Js[t];
            if (n) for (const i of n) delete e[t][i];
            Qs(e, t)
        }
        for (const t of J(ps)) delete e[t];
        !function (e) {
            const {titleMarkConfig: t, subtitleMarkConfig: n, subtitle: i} = ba(e.title);
            Y(t) || (e.style["group-title"] = {...e.style["group-title"], ...t});
            Y(n) || (e.style["group-subtitle"] = {...e.style["group-subtitle"], ...n});
            Y(i) ? delete e.title : e.title = i
        }(e);
        for (const t in e) l(e[t]) && Y(e[t]) && delete e[t];
        return Y(e) ? void 0 : e
    }

    function Qs(e, t, n, i) {
        var o;
        "view" === t && (n = "cell");
        const r = {...i ? e[t][i] : e[t], ...e.style[null !== (o = n) && void 0 !== o ? o : t]};
        var a;
        Y(r) || (e.style[null !== (a = n) && void 0 !== a ? a : t] = r);
        i || delete e[t]
    }

    function $s(e) {
        return "layer" in e
    }

    const Ks = {zero: 1, center: 1, normalize: 1};
    const Zs = new Set([Po, Mo, jo, Wo, qo, Go, Vo, Lo, Uo, Io]), ec = new Set([Mo, jo, Po]);

    function tc(e, t) {
        const n = "x" === t ? "y" : "radius", i = e[t], o = e[n];
        if (qr(i) && qr(o)) if ("quantitative" === Rr(i) && "quantitative" === Rr(o)) {
            if (i.stack) return t;
            if (o.stack) return n;
            const e = qr(i) && !!i.aggregate;
            if (e !== (qr(o) && !!o.aggregate)) return e ? t : n;
            {
                var r, a;
                const e = null === (r = i.scale) || void 0 === r ? void 0 : r.type,
                    s = null === (a = o.scale) || void 0 === a ? void 0 : a.type;
                if (e && "linear" !== e) return n;
                if (s && "linear" !== s) return t
            }
        } else {
            if ("quantitative" === Rr(i)) return t;
            if ("quantitative" === Rr(o)) return n
        } else {
            if ("quantitative" === Rr(i)) return t;
            if ("quantitative" === Rr(o)) return n
        }
    }

    function nc(e, t, n = {}) {
        const i = $o(e) ? e.type : e;
        if (!Zs.has(i)) return null;
        const o = tc(t, "x") || tc(t, "theta");
        if (!o) return null;
        const r = t[o], a = qr(r) ? Kr(r, {}) : void 0;
        let s = function (e) {
            switch (e) {
                case"x":
                    return "y";
                case"y":
                    return "x";
                case"theta":
                    return "radius";
                case"radius":
                    return "theta"
            }
        }(o), c = t[s], u = qr(c) ? Kr(c, {}) : void 0;
        u === a && (u = void 0, c = void 0, s = void 0);
        const l = $t.reduce(((e, n) => {
            if ("tooltip" !== n && qa(t, n)) {
                const i = t[n];
                for (const t of h(i)) {
                    const i = ca(t);
                    if (i.aggregate) continue;
                    const o = Kr(i, {});
                    o && o === u || e.push({channel: n, fieldDef: i})
                }
            }
            return e
        }), []);
        let f;
        if (void 0 !== r.stack ? f = y(r.stack) ? r.stack ? "zero" : null : r.stack : l.length > 0 && ec.has(i) && (f = "zero"), !f || !(f in Ks)) return null;
        var d, p;
        if (Ra(t) && 0 === l.length) return null;
        if (r.scale && r.scale.type && r.scale.type !== Yi) {
            if (n.disallowNonLinearStack) return null;
            si(function (e) {
                return "Cannot stack non-linear scale (".concat(e, ").")
            }(r.scale.type))
        }
        return Hr(t[Mt(o)]) ? (void 0 !== r.stack && si('Cannot stack "'.concat(d = o, '" if there is already "').concat(d, '2".')), null) : (qr(r) && r.aggregate && !T(ze, r.aggregate) && si((p = r.aggregate, 'Stacking is applied even though the aggregate function is non-summative ("'.concat(p, '").'))), {
            groupbyChannel: c ? s : void 0,
            groupbyField: u,
            fieldChannel: o,
            impute: null !== r.impute && Jo(i),
            stackBy: l,
            offset: f
        })
    }

    function ic(e) {
        const {point: t, line: n, ...i} = e;
        return J(i).length > 1 ? i : i.type
    }

    function oc(e) {
        for (const t of ["line", "area", "rule", "trail"]) e[t] && (e = {...e, [t]: N(e[t], ["point", "line"])});
        return e
    }

    function rc(e, t = {}, n) {
        return "transparent" === e.point ? {opacity: 0} : e.point ? l(e.point) ? e.point : {} : void 0 !== e.point ? null : t.point || n.shape ? l(t.point) ? t.point : {} : void 0
    }

    function ac(e, t = {}) {
        return e.line ? !0 === e.line ? {} : e.line : void 0 !== e.line ? null : t.line ? !0 === t.line ? {} : t.line : void 0
    }

    class sc {
        constructor() {
            Bn(this, "name", "path-overlay")
        }

        hasMatchingType(e, t) {
            if (Ta(e)) {
                const {mark: n, encoding: i} = e, o = $o(n) ? n : {type: n};
                switch (o.type) {
                    case"line":
                    case"rule":
                    case"trail":
                        return !!rc(o, t[o.type], i);
                    case"area":
                        return !!rc(o, t[o.type], i) || !!ac(o, t[o.type])
                }
            }
            return !1
        }

        run(e, t, n) {
            const {config: i} = t, {selection: o, projection: r, mark: a, encoding: s, ...c} = e, u = Ia(s, i),
                l = $o(a) ? a : {type: a}, f = rc(l, i[l.type], u), d = "area" === l.type && ac(l, i[l.type]), p = [{
                    ...o ? {selection: o} : {},
                    mark: ic({..."area" === l.type && void 0 === l.opacity && void 0 === l.fillOpacity ? {opacity: .7} : {}, ...l}),
                    encoding: N(u, ["shape"])
                }], m = nc(l, u);
            let h = u;
            if (m) {
                const {fieldChannel: e, offset: t} = m;
                h = {...u, [e]: {...u[e], ...t ? {stack: t} : {}}}
            }
            return d && p.push({
                ...r ? {projection: r} : {},
                mark: {type: "line", ...O(l, ["clip", "interpolate", "tension", "tooltip"]), ...d},
                encoding: h
            }), f && p.push({
                ...r ? {projection: r} : {},
                mark: {type: "point", opacity: 1, filled: !0, ...O(l, ["clip", "tooltip"]), ...f},
                encoding: h
            }), n({...c, layer: p}, {...t, config: oc(i)})
        }
    }

    class cc {
        constructor() {
            Bn(this, "name", "RangeStep")
        }

        hasMatchingType(e) {
            if (Ta(e) && e.encoding) for (const n of Zt) {
                const i = e.encoding[n];
                var t;
                if (i && Hr(i)) if (null == i || null === (t = i.scale) || void 0 === t ? void 0 : t.rangeStep) return !0
            }
            return !1
        }

        run(e) {
            const t = {};
            let n = {...e.encoding};
            for (const e of Zt) {
                const o = Tt(e), r = n[e];
                var i;
                if (r && Hr(r)) if (null == r || null === (i = r.scale) || void 0 === i ? void 0 : i.rangeStep) {
                    const {scale: i, ...a} = r, {rangeStep: s, ...c} = i;
                    t[o] = {step: i.rangeStep}, si('Scale\'s "rangeStep" is deprecated and will be removed in Vega-Lite 5.0. Please use "width"/"height": {"step": ...} instead. See https://vega.github.io/vega-lite/docs/size.html.'), n = {
                        ...n,
                        [e]: {...a, ...Y(c) ? {} : {scale: c}}
                    }
                }
            }
            return {...t, ...e, encoding: n}
        }
    }

    function uc(e, t) {
        return t ? Br(e) ? hc(e, t) : dc(e, t) : e
    }

    function lc(e, t) {
        return t ? hc(e, t) : e
    }

    function fc(e, t, n) {
        const i = t[e];
        return function (e) {
            return e && !x(e) && "repeat" in e
        }(i) ? i.repeat in n ? {...t, [e]: n[i.repeat]} : void si(function (e) {
            return 'Unknown repeated value "'.concat(e, '".')
        }(i.repeat)) : t
    }

    function dc(e, t) {
        if (void 0 !== (e = fc("field", e, t))) {
            if (null === e) return null;
            if (Nr(e) && Er(e.sort)) {
                const n = fc("field", e.sort, t);
                e = {...e, ...n ? {sort: n} : {}}
            }
            return e
        }
    }

    function pc(e, t) {
        if (qr(e)) return dc(e, t);
        {
            const n = fc("datum", e, t);
            return n === e || n.type || (n.type = "nominal"), n
        }
    }

    function mc(e, t) {
        if (!Hr(e)) {
            if (Lr(e)) {
                const n = pc(e.condition, t);
                if (n) return {...e, condition: n};
                {
                    const {condition: t, ...n} = e;
                    return n
                }
            }
            return e
        }
        {
            const n = pc(e, t);
            if (n) return n;
            if (Mr(e)) return {condition: e.condition}
        }
    }

    function hc(e, t) {
        const n = {};
        for (const i in e) if (v(e, i)) {
            const o = e[i];
            if (u(o)) n[i] = o.map((e => mc(e, t))).filter((e => e)); else {
                const e = mc(o, t);
                void 0 !== e && (n[i] = e)
            }
        }
        return n
    }

    class gc {
        constructor() {
            Bn(this, "name", "RuleForRangedLine")
        }

        hasMatchingType(e) {
            if (Ta(e)) {
                const {encoding: t, mark: n} = e;
                if ("line" === n) for (const e of Ot) {
                    const n = t[Pt(e)];
                    if (t[e] && (qr(n) && !kn(n.bin) || Wr(n))) return !0
                }
            }
            return !1
        }

        run(e, t, n) {
            const {encoding: i} = e;
            var o, r;
            return si((o = !!i.x2, r = !!i.y2, "Line mark is for continuous lines and thus cannot be used with ".concat(o && r ? "x2 and y2" : o ? "x2" : "y2", ". We will use the rule mark (line segments) instead."))), n({
                ...e,
                mark: "rule"
            }, t)
        }
    }

    function vc({parentEncoding: e, encoding: t = {}, layer: n}) {
        let i = {};
        if (e) {
            const o = new Set([...J(e), ...J(t)]);
            for (const r of o) {
                const o = t[r], a = e[r];
                if (Hr(o)) {
                    const e = {...a, ...o};
                    i[r] = e
                } else Lr(o) ? i[r] = {
                    ...o,
                    condition: {...a, ...o.condition}
                } : o || null === o ? i[r] = o : (n || Vr(a) || Fi(a) || Hr(a) || u(a)) && (i[r] = a)
            }
        } else i = t;
        return !i || Y(i) ? void 0 : i
    }

    function yc(e) {
        const {parentProjection: t, projection: n} = e;
        return t && n && si(function (e) {
            const {parentProjection: t, projection: n} = e;
            return "Layer's shared projection ".concat(P(t), " is overridden by a child projection ").concat(P(n), ".")
        }({parentProjection: t, projection: n})), null != n ? n : t
    }

    function bc(e, t) {
        void 0 === t && (t = Gs(e.config));
        const n = function (e, t = {}) {
            return xc.map(e, {config: t})
        }(e, t), {width: i, height: o} = e, r = function (e, t, n) {
            let {width: i, height: o} = t;
            const r = Ta(e) || $s(e), a = {};
            r ? "container" == i && "container" == o ? (a.type = "fit", a.contains = "padding") : "container" == i ? (a.type = "fit-x", a.contains = "padding") : "container" == o && (a.type = "fit-y", a.contains = "padding") : ("container" == i && (si(Nn("width")), i = void 0), "container" == o && (si(Nn("height")), o = void 0));
            const s = {type: "pad", ...a, ...n ? wc(n.autosize) : {}, ...wc(e.autosize)};
            "fit" !== s.type || r || (si(On), s.type = "pad");
            "container" == i && "fit" != s.type && "fit-x" != s.type && si(Pn("width"));
            "container" == o && "fit" != s.type && "fit-y" != s.type && si(Pn("height"));
            if (_(s, {type: "pad"})) return;
            return s
        }(n, {width: i, height: o, autosize: e.autosize}, t);
        return {...n, ...r ? {autosize: r} : {}}
    }

    const xc = new class extends class {
        map(e, t) {
            return zr(e) ? this.mapFacet(e, t) : function (e) {
                return "repeat" in e
            }(e) ? this.mapRepeat(e, t) : Bs(e) ? this.mapHConcat(e, t) : Ss(e) ? this.mapVConcat(e, t) : Es(e) ? this.mapConcat(e, t) : this.mapLayerOrUnit(e, t)
        }

        mapLayerOrUnit(e, t) {
            if ($s(e)) return this.mapLayer(e, t);
            if (Ta(e)) return this.mapUnit(e, t);
            throw new Error(zn(e))
        }

        mapLayer(e, t) {
            return {...e, layer: e.layer.map((e => this.mapLayerOrUnit(e, t)))}
        }

        mapHConcat(e, t) {
            return {...e, hconcat: e.hconcat.map((e => this.map(e, t)))}
        }

        mapVConcat(e, t) {
            return {...e, vconcat: e.vconcat.map((e => this.map(e, t)))}
        }

        mapConcat(e, t) {
            const {concat: n, ...i} = e;
            return {...i, concat: n.map((e => this.map(e, t)))}
        }

        mapFacet(e, t) {
            return {...e, spec: this.map(e.spec, t)}
        }

        mapRepeat(e, t) {
            return {...e, spec: this.map(e.spec, t)}
        }
    } {
        constructor(...e) {
            super(...e), Bn(this, "nonFacetUnitNormalizers", [es, rs, fs, new sc, new gc, new cc])
        }

        map(e, t) {
            if (Ta(e)) {
                const n = qa(e.encoding, Ne), i = qa(e.encoding, Pe), o = qa(e.encoding, je);
                if (n || i || o) return this.mapFacetedUnit(e, t)
            }
            return super.map(e, t)
        }

        mapUnit(e, t) {
            const {parentEncoding: n, parentProjection: i} = t, o = lc(e.encoding, t.repeater),
                r = {...e, ...o ? {encoding: o} : {}};
            if (n || i) return this.mapUnitWithParentEncodingOrProjection(r, t);
            const a = this.mapLayerOrUnit.bind(this);
            for (const e of this.nonFacetUnitNormalizers) if (e.hasMatchingType(r, t.config)) return e.run(r, t, a);
            return r
        }

        mapRepeat(e, t) {
            return function (e) {
                return !u(e.repeat) && e.repeat.layer
            }(e) ? this.mapLayerRepeat(e, t) : this.mapNonLayerRepeat(e, t)
        }

        mapLayerRepeat(e, t) {
            const {repeat: n, spec: i, ...o} = e, {row: r, column: a, layer: s} = n, {repeater: c = {}, repeaterPrefix: u = ""} = t;
            return r || a ? this.mapRepeat({
                ...e,
                repeat: {...r ? {row: r} : {}, ...a ? {column: a} : {}},
                spec: {repeat: {layer: s}, spec: i}
            }, t) : {
                ...o, layer: s.map((e => {
                    const n = {...c, layer: e}, o = (i.name || "") + u + "child__layer_".concat(K(e)),
                        r = this.mapLayerOrUnit(i, {...t, repeater: n, repeaterPrefix: o});
                    return r.name = o, r
                }))
            }
        }

        mapNonLayerRepeat(e, t) {
            var n;
            const {repeat: i, spec: o, data: r, ...a} = e;
            !u(i) && e.columns && (e = N(e, ["columns"]), si(Wn("repeat")));
            const s = [], {repeater: c = {}, repeaterPrefix: l = ""} = t, f = !u(i) && i.row || [c ? c.row : null],
                d = !u(i) && i.column || [c ? c.column : null], p = u(i) && i || [c ? c.repeat : null];
            for (const e of p) for (const n of f) for (const r of d) {
                const a = {repeat: e, row: n, column: r, layer: c.layer},
                    f = (o.name || "") + l + "child__" + (u(i) ? "".concat(K(e)) : (i.row ? "row_".concat(K(n)) : "") + (i.column ? "column_".concat(K(r)) : "")),
                    d = this.map(o, {...t, repeater: a, repeaterPrefix: f});
                d.name = f, s.push(N(d, ["data"]))
            }
            const m = u(i) ? e.columns : i.column ? i.column.length : 1;
            return {data: null !== (n = o.data) && void 0 !== n ? n : r, align: "all", ...a, columns: m, concat: s}
        }

        mapFacet(e, t) {
            const {facet: n} = e;
            return Br(n) && e.columns && (e = N(e, ["columns"]), si(Wn("facet"))), super.mapFacet(e, t)
        }

        mapUnitWithParentEncodingOrProjection(e, t) {
            const {encoding: n, projection: i} = e, {parentEncoding: o, parentProjection: r, config: a} = t,
                s = yc({parentProjection: r, projection: i}), c = vc({parentEncoding: o, encoding: lc(n, t.repeater)});
            return this.mapUnit({...e, ...s ? {projection: s} : {}, ...c ? {encoding: c} : {}}, {config: a})
        }

        mapFacetedUnit(e, t) {
            const {row: n, column: i, facet: o, ...r} = e.encoding, {mark: a, width: s, projection: c, height: u, view: l, selection: f, encoding: d, ...p} = e, {facetMapping: m, layout: h} = this.getFacetMappingAndLayout({
                row: n,
                column: i,
                facet: o
            }, t), g = lc(r, t.repeater);
            return this.mapFacet({
                ...p, ...h,
                facet: m,
                spec: {
                    ...s ? {width: s} : {}, ...u ? {height: u} : {}, ...l ? {view: l} : {}, ...c ? {projection: c} : {},
                    mark: a,
                    encoding: g, ...f ? {selection: f} : {}
                }
            }, t)
        }

        getFacetMappingAndLayout(e, t) {
            const {row: n, column: i, facet: o} = e;
            if (n || i) {
                o && si((a = [...n ? [Ne] : [], ...i ? [Pe] : []], "Facet encoding dropped as ".concat(a.join(" and "), " ").concat(a.length > 1 ? "are" : "is", " also specified.")));
                const t = {}, s = {};
                for (const n of [Ne, Pe]) {
                    const i = e[n];
                    if (i) {
                        const {align: e, center: o, spacing: a, columns: c, ...u} = i;
                        t[n] = u;
                        for (const e of ["align", "center", "spacing"]) {
                            var r;
                            if (void 0 !== i[e]) s[e] = null !== (r = s[e]) && void 0 !== r ? r : {}, s[e][n] = i[e]
                        }
                    }
                }
                return {facetMapping: t, layout: s}
            }
            {
                const {align: e, center: n, spacing: i, columns: r, ...a} = o;
                return {
                    facetMapping: uc(a, t.repeater),
                    layout: {...e ? {align: e} : {}, ...n ? {center: n} : {}, ...i ? {spacing: i} : {}, ...r ? {columns: r} : {}}
                }
            }
            var a
        }

        mapLayer(e, {parentEncoding: t, parentProjection: n, ...i}) {
            const {encoding: o, projection: r, ...a} = e, s = {
                ...i,
                parentEncoding: vc({parentEncoding: t, encoding: o, layer: !0}),
                parentProjection: yc({parentProjection: n, projection: r})
            };
            return super.mapLayer(a, s)
        }
    };

    function wc(e) {
        return x(e) ? {type: e} : null != e ? e : {}
    }

    class Ac {
        constructor(e = {}, t = {}) {
            this.explicit = e, this.implicit = t
        }

        clone() {
            return new Ac(z(this.explicit), z(this.implicit))
        }

        combine() {
            return {...this.explicit, ...this.implicit}
        }

        get(e) {
            return ue(this.explicit[e], this.implicit[e])
        }

        getWithExplicit(e) {
            return void 0 !== this.explicit[e] ? {
                explicit: !0,
                value: this.explicit[e]
            } : void 0 !== this.implicit[e] ? {explicit: !1, value: this.implicit[e]} : {explicit: !1, value: void 0}
        }

        setWithExplicit(e, t) {
            void 0 !== t.value && this.set(e, t.value, t.explicit)
        }

        set(e, t, n) {
            return delete this[n ? "implicit" : "explicit"][e], this[n ? "explicit" : "implicit"][e] = t, this
        }

        copyKeyFromSplit(e, t) {
            void 0 !== t.explicit[e] ? this.set(e, t.explicit[e], !0) : void 0 !== t.implicit[e] && this.set(e, t.implicit[e], !1)
        }

        copyKeyFromObject(e, t) {
            void 0 !== t[e] && this.set(e, t[e], !0)
        }

        copyAll(e) {
            for (const t of J(e.combine())) {
                const n = e.getWithExplicit(t);
                this.setWithExplicit(t, n)
            }
        }
    }

    function Dc(e) {
        return {explicit: !0, value: e}
    }

    function Fc(e) {
        return {explicit: !1, value: e}
    }

    function kc(e) {
        return (t, n, i, o) => {
            const r = e(t.value, n.value);
            return r > 0 ? t : r < 0 ? n : Cc(t, n, i, o)
        }
    }

    function Cc(e, t, n, i) {
        return e.explicit && t.explicit && si(function (e, t, n, i) {
            return "Conflicting ".concat(t.toString(), ' property "').concat(e.toString(), '" (').concat(P(n), " and ").concat(P(i), "). Using ").concat(P(n), ".")
        }(n, i, e.value, t.value)), e
    }

    function Ec(e, t, n, i, o = Cc) {
        return void 0 === e || void 0 === e.value ? t : e.explicit && !t.explicit ? e : t.explicit && !e.explicit ? t : _(e.value, t.value) ? e : o(e, t, n, i)
    }

    class Sc extends Ac {
        constructor(e = {}, t = {}, n = !1) {
            super(e, t), this.explicit = e, this.implicit = t, this.parseNothing = n
        }

        clone() {
            const e = super.clone();
            return e.parseNothing = this.parseNothing, e
        }
    }

    function Bc(e) {
        return "url" in e
    }

    function _c(e) {
        return "values" in e
    }

    function zc(e) {
        return "name" in e && !Bc(e) && !_c(e) && !Oc(e)
    }

    function Oc(e) {
        return e && (Nc(e) || Pc(e) || jc(e))
    }

    function Nc(e) {
        return "sequence" in e
    }

    function Pc(e) {
        return "sphere" in e
    }

    function jc(e) {
        return "graticule" in e
    }

    let Mc;

    function Tc(e) {
        return "filter" in e
    }

    function Lc(e) {
        return "lookup" in e
    }

    function qc(e) {
        return "pivot" in e
    }

    function Rc(e) {
        return "density" in e
    }

    function Wc(e) {
        return "quantile" in e
    }

    function Uc(e) {
        return "regression" in e
    }

    function Ic(e) {
        return "loess" in e
    }

    function Hc(e) {
        return "sample" in e
    }

    function Gc(e) {
        return "window" in e
    }

    function Vc(e) {
        return "joinaggregate" in e
    }

    function Yc(e) {
        return "flatten" in e
    }

    function Jc(e) {
        return "calculate" in e
    }

    function Xc(e) {
        return "bin" in e
    }

    function Qc(e) {
        return "impute" in e
    }

    function $c(e) {
        return "timeUnit" in e
    }

    function Kc(e) {
        return "aggregate" in e
    }

    function Zc(e) {
        return "stack" in e
    }

    function eu(e) {
        return "fold" in e
    }

    !function (e) {
        e[e.Raw = 0] = "Raw", e[e.Main = 1] = "Main", e[e.Row = 2] = "Row", e[e.Column = 3] = "Column", e[e.Lookup = 4] = "Lookup"
    }(Mc || (Mc = {}));
    const tu = "[", nu = "]", iu = /[[\]{}]/, ou = {
        "*": 1,
        arc: 1,
        area: 1,
        group: 1,
        image: 1,
        line: 1,
        path: 1,
        rect: 1,
        rule: 1,
        shape: 1,
        symbol: 1,
        text: 1,
        trail: 1
    };
    let ru, au;

    function su(e, t, n) {
        return ru = t || "view", au = n || ou, uu(e.trim()).map(lu)
    }

    function cu(e, t, n, i, o) {
        const r = e.length;
        let a, s = 0;
        for (; t < r; ++t) {
            if (a = e[t], !s && a === n) return t;
            o && o.indexOf(a) >= 0 ? --s : i && i.indexOf(a) >= 0 && ++s
        }
        return t
    }

    function uu(e) {
        const t = [], n = e.length;
        let i = 0, o = 0;
        for (; o < n;) o = cu(e, o, ",", "[{", "]}"), t.push(e.substring(i, o).trim()), i = ++o;
        if (0 === t.length) throw"Empty event selector: " + e;
        return t
    }

    function lu(e) {
        return "[" === e[0] ? function (e) {
            const t = e.length;
            let n, i = 1;
            if (i = cu(e, i, nu, tu, nu), i === t) throw"Empty between selector: " + e;
            if (n = uu(e.substring(1, i)), 2 !== n.length) throw"Between selector must have two elements: " + e;
            if (">" !== (e = e.slice(i + 1).trim())[0]) throw"Expected '>' after between selector: " + e;
            n = n.map(lu);
            const o = lu(e.slice(1).trim());
            if (o.between) return {between: n, stream: o};
            o.between = n;
            return o
        }(e) : function (e) {
            const t = {source: ru}, n = [];
            let i, o, r = [0, 0], a = 0, s = 0, c = e.length, u = 0;
            if ("}" === e[c - 1]) {
                if (u = e.lastIndexOf("{"), !(u >= 0)) throw"Unmatched right brace: " + e;
                try {
                    r = function (e) {
                        const t = e.split(",");
                        if (!e.length || t.length > 2) throw e;
                        return t.map((t => {
                            const n = +t;
                            if (n != n) throw e;
                            return n
                        }))
                    }(e.substring(u + 1, c - 1))
                } catch (t) {
                    throw"Invalid throttle specification: " + e
                }
                c = (e = e.slice(0, u).trim()).length, u = 0
            }
            if (!c) throw e;
            "@" === e[0] && (a = ++u);
            i = cu(e, u, ":"), i < c && (n.push(e.substring(s, i).trim()), s = u = ++i);
            if (u = cu(e, u, tu), u === c) n.push(e.substring(s, c).trim()); else if (n.push(e.substring(s, u).trim()), o = [], s = ++u, s === c) throw"Unmatched left bracket: " + e;
            for (; u < c;) {
                if (u = cu(e, u, nu), u === c) throw"Unmatched left bracket: " + e;
                if (o.push(e.substring(s, u).trim()), u < c - 1 && e[++u] !== tu) throw"Expected left bracket: " + e;
                s = ++u
            }
            if (!(c = n.length) || iu.test(n[c - 1])) throw"Invalid event selector: " + e;
            c > 1 ? (t.type = n[1], a ? t.markname = n[0].slice(1) : !function (e) {
                return au[e]
            }(n[0]) ? t.source = n[0] : t.marktype = n[0]) : t.type = n[0];
            "!" === t.type.slice(-1) && (t.consume = !0, t.type = t.type.slice(0, -1));
            null != o && (t.filter = o);
            r[0] && (t.throttle = r[0]);
            r[1] && (t.debounce = r[1]);
            return t
        }(e)
    }

    function fu(e, t, n, i) {
        const o = Mr(t) && t.condition, r = i(t);
        if (o) {
            return {
                [n]: [...h(o).map((t => {
                    const n = i(t);
                    return {
                        test: function (e) {
                            return e.selection
                        }(t) ? td(e, t.selection) : id(e, t.test), ...n
                    }
                })), ...void 0 !== r ? [r] : []]
            }
        }
        return void 0 !== r ? {[n]: r} : {}
    }

    function du(e, t = "text") {
        const n = e.encoding[t];
        return fu(e, n, t, (t => pu(t, e.config)))
    }

    function pu(e, t, n = "datum") {
        if (e) {
            if (Vr(e)) return Fa(e.value);
            if (Hr(e)) {
                const {format: i, formatType: o} = sa(e);
                return mr({fieldOrDatumDef: e, format: i, formatType: o, expr: n, config: t})
            }
        }
    }

    function mu(e, t = {}) {
        const {encoding: n, markDef: i, config: o, stack: r} = e, a = n.tooltip;
        if (u(a)) return {tooltip: gu({tooltip: a}, r, o, t)};
        {
            const s = t.reactiveGeom ? "datum.datum" : "datum";
            return fu(e, a, "tooltip", (e => {
                const a = pu(e, o, s);
                if (a) return a;
                if (null === e) return;
                let c = Ba("tooltip", i, o);
                return !0 === c && (c = {content: "encoding"}), x(c) ? {value: c} : l(c) ? Fi(c) ? c : "encoding" === c.content ? gu(n, r, o, t) : {signal: s} : void 0
            }))
        }
    }

    function hu(e, t, n, {reactiveGeom: i} = {}) {
        const o = {}, r = i ? "datum.datum" : "datum", a = [];

        function s(i, s) {
            var c;
            const u = Pt(s), l = Gr(i) ? i : {...i, type: e[u].type}, f = h(l.title || aa(l, n)).join(", ");
            let d;
            if (en(s)) {
                const i = "x" === s ? "x2" : "y2", a = ca(e[i]);
                if (kn(l.bin) && a) {
                    const e = Kr(l, {expr: r}), t = Kr(a, {expr: r}), {format: s, formatType: c} = sa(l);
                    d = Ar(e, t, s, c, n), o[i] = !0
                } else if (t && t.fieldChannel === s && "normalize" === t.offset) {
                    const {format: e, formatType: t} = sa(l);
                    d = mr({
                        fieldOrDatumDef: l,
                        format: e,
                        formatType: t,
                        expr: r,
                        config: n,
                        normalizeStack: !0
                    }).signal
                }
            }
            d = null !== (c = d) && void 0 !== c ? c : pu(l, n, r).signal, a.push({channel: s, key: f, value: d})
        }

        Ha(e, ((e, t) => {
            qr(e) ? s(e, t) : Tr(e) && s(e.condition, t)
        }));
        const c = {};
        for (const {channel: e, key: t, value: n} of a) o[e] || c[t] || (c[t] = n);
        return c
    }

    function gu(e, t, n, {reactiveGeom: i} = {}) {
        const o = hu(e, t, n, {reactiveGeom: i}), r = Q(o).map((([e, t]) => '"'.concat(e, '": ').concat(t)));
        return r.length > 0 ? {signal: "{".concat(r.join(", "), "}")} : void 0
    }

    function vu(e) {
        const {markDef: t, config: n} = e, i = Ba("aria", t, n);
        return !1 === i ? {} : {...i ? {aria: i} : {}, ...yu(e), ...bu(e)}
    }

    function yu(e) {
        const {mark: t, markDef: n, config: i} = e;
        if (!1 === i.aria) return {};
        const o = Ba("ariaRoleDescription", n, i);
        return null != o ? {ariaRoleDescription: {value: o}} : t in Si ? {} : {ariaRoleDescription: {value: t}}
    }

    function bu(e) {
        const {encoding: t, markDef: n, config: i, stack: o} = e, r = t.description;
        if (r) return fu(e, r, "description", (t => pu(t, e.config)));
        const a = Ba("description", n, i);
        if (null != a) return {description: Fa(a)};
        if (!1 === i.aria) return {};
        const s = hu(t, o, i);
        return Y(s) ? void 0 : {description: {signal: Q(s).map((([e, t], n) => '"'.concat(n > 0 ? "; " : "").concat(e, ': " + (').concat(t, ")"))).join(" + ")}}
    }

    function xu(e, t, n = {}) {
        const {markDef: i, encoding: o, config: r} = t, {vgChannel: a} = n;
        let {defaultRef: s, defaultValue: c} = n;
        var u;
        void 0 === s && (c = null !== (u = c) && void 0 !== u ? u : Ba(e, i, r, {
            vgChannel: a,
            ignoreVgConfig: !0
        }), void 0 !== c && (s = Fa(c)));
        const l = o[e];
        return fu(t, l, null != a ? a : e, (n => lr({
            channel: e,
            channelDef: n,
            markDef: i,
            config: r,
            scaleName: t.scaleName(e),
            scale: t.getScaleComponent(e),
            stack: null,
            defaultRef: s
        })))
    }

    function wu(e, t = {filled: void 0}) {
        var n, i, o, r;
        const {markDef: a, encoding: s, config: c} = e, {type: u} = a,
            l = null !== (n = t.filled) && void 0 !== n ? n : Ba("filled", a, c),
            f = T(["bar", "point", "circle", "square", "geoshape"], u) ? "transparent" : void 0,
            d = null !== (i = null !== (o = Ba(!0 === l ? "color" : void 0, a, c, {vgChannel: "fill"})) && void 0 !== o ? o : c.mark[!0 === l && "color"]) && void 0 !== i ? i : f,
            p = null !== (r = Ba(!1 === l ? "color" : void 0, a, c, {vgChannel: "stroke"})) && void 0 !== r ? r : c.mark[!1 === l && "color"],
            m = l ? "fill" : "stroke", h = {...d ? {fill: Fa(d)} : {}, ...p ? {stroke: Fa(p)} : {}};
        return a.color && (l ? a.fill : a.stroke) && si(Gn("property", {
            fill: "fill" in a,
            stroke: "stroke" in a
        })), {
            ...h, ...xu("color", e, {
                vgChannel: m,
                defaultValue: l ? d : p
            }), ...xu("fill", e, {defaultValue: s.fill ? d : void 0}), ...xu("stroke", e, {defaultValue: s.stroke ? p : void 0})
        }
    }

    function Au(e) {
        const {encoding: t, mark: n} = e, i = t.order;
        return !Jo(n) && Vr(i) ? fu(e, i, "zindex", (e => Fa(e.value))) : {}
    }

    function Du(e, t) {
        const n = t[function (e) {
            switch (e) {
                case Me:
                    return "xOffset";
                case Te:
                    return "yOffset";
                case Le:
                    return "x2Offset";
                case qe:
                    return "y2Offset";
                case Ue:
                    return "thetaOffset";
                case Re:
                    return "radiusOffset";
                case Ie:
                    return "theta2Offset";
                case We:
                    return "radius2Offset"
            }
        }(e)];
        if (n) return n
    }

    function Fu(e, t, {defaultPos: n, vgChannel: i, isMidPoint: o}) {
        const {encoding: r, markDef: a, config: s, stack: c} = t, u = r[e], l = r[Mt(e)], f = t.scaleName(e),
            d = t.getScaleComponent(e), p = Du(e, a),
            m = ku({model: t, defaultPos: n, channel: e, scaleName: f, scale: d}),
            h = !u && en(e) && (r.latitude || r.longitude) ? {field: t.getName(e)} : function (e) {
                const {channel: t, channelDef: n, isMidPoint: i, scaleName: o, stack: r, offset: a, markDef: s, config: c} = e;
                if (Hr(n) && r && t === r.fieldChannel) {
                    if (qr(n)) {
                        const e = Pr({channel: t, fieldDef: n, isMidPoint: i, markDef: s, stack: r, config: c});
                        if (void 0 !== e) return ur({
                            scaleName: o,
                            fieldOrDatumDef: n,
                            startSuffix: "start",
                            band: e,
                            offset: a
                        })
                    }
                    return cr(n, o, {suffix: "end"}, {offset: a})
                }
                return or(e)
            }({
                channel: e,
                channelDef: u,
                channel2Def: l,
                markDef: a,
                config: s,
                isMidPoint: o,
                scaleName: f,
                scale: d,
                stack: c,
                offset: p,
                defaultRef: m
            });
        return h ? {[i || e]: h} : void 0
    }

    function ku({model: e, defaultPos: t, channel: n, scaleName: i, scale: o}) {
        const {markDef: r, config: a} = e;
        return () => {
            const s = Pt(n), c = jt(n), u = Ba(n, r, a, {vgChannel: c});
            if (void 0 !== u) return fr(n, u);
            switch (t) {
                case"zeroOrMin":
                case"zeroOrMax":
                    if (i) {
                        const e = o.get("type");
                        if (T([Ji, Ki, Zi], e)) ; else if (o.domainDefinitelyIncludesZero()) return {scale: i, value: 0}
                    }
                    if ("zeroOrMin" === t) return "y" === s ? {field: {group: "height"}} : {value: 0};
                    switch (s) {
                        case"radius":
                            return {signal: "min(".concat(e.width.signal, ",").concat(e.height.signal, ")/2")};
                        case"theta":
                            return {signal: "2*PI"};
                        case"x":
                            return {field: {group: "width"}};
                        case"y":
                            return {value: 0}
                    }
                    break;
                case"mid":
                    return {...e[Tt(n)], mult: .5}
            }
        }
    }

    const Cu = {left: "x", center: "xc", right: "x2"}, Eu = {top: "y", middle: "yc", bottom: "y2"};

    function Su(e, t, n, i = "middle") {
        if ("radius" === e || "theta" === e) return jt(e);
        const o = "x" === e ? "align" : "baseline", r = Ba(o, t, n);
        let a;
        return Fi(r) ? (si(function (e) {
            return "The ".concat(e, " for range marks cannot be an expression")
        }(o)), a = void 0) : a = r, "x" === e ? Cu[a || ("top" === i ? "left" : "center")] : Eu[a || i]
    }

    function Bu(e, t, {defaultPos: n, defaultPos2: i, range: o}) {
        return o ? _u(e, t, {defaultPos: n, defaultPos2: i}) : Fu(e, t, {defaultPos: n})
    }

    function _u(e, t, {defaultPos: n, defaultPos2: i}) {
        const {markDef: o, config: r} = t, a = Mt(e), s = Tt(e), c = function (e, t, n) {
            const {encoding: i, mark: o, markDef: r, stack: a, config: s} = e, c = Pt(n), u = Tt(n), l = jt(n),
                f = i[c], d = e.scaleName(c), p = e.getScaleComponent(c), m = Du(n in i || n in r ? n : c, e.markDef);
            if (!f && ("x2" === n || "y2" === n) && (i.latitude || i.longitude)) return {[l]: {field: e.getName(n)}};
            const h = function ({channel: e, channelDef: t, channel2Def: n, markDef: i, config: o, scaleName: r, scale: a, stack: s, offset: c, defaultRef: u}) {
                if (Hr(t) && s && e.charAt(0) === s.fieldChannel.charAt(0)) return cr(t, r, {suffix: "start"}, {offset: c});
                return or({
                    channel: e,
                    channelDef: n,
                    scaleName: r,
                    scale: a,
                    stack: s,
                    markDef: i,
                    config: o,
                    offset: c,
                    defaultRef: u
                })
            }({
                channel: n,
                channelDef: f,
                channel2Def: i[n],
                markDef: r,
                config: s,
                scaleName: d,
                scale: p,
                stack: a,
                offset: m,
                defaultRef: void 0
            });
            if (void 0 !== h) return {[l]: h};
            return zu(n, r) || zu(n, {
                [n]: za(n, r, s.style),
                [u]: za(u, r, s.style)
            }) || zu(n, s[o]) || zu(n, s.mark) || {
                [l]: ku({
                    model: e,
                    defaultPos: t,
                    channel: n,
                    scaleName: d,
                    scale: p
                })()
            }
        }(t, i, a);
        return {...Fu(e, t, {defaultPos: n, vgChannel: c[s] ? Su(e, o, r) : jt(e)}), ...c}
    }

    function zu(e, t) {
        const n = Tt(e), i = jt(e);
        return void 0 !== t[i] ? {[i]: fr(e, t[i])} : void 0 !== t[e] ? {[i]: fr(e, t[e])} : t[n] ? {[n]: fr(e, t[n])} : void 0
    }

    function Ou(e, t, n) {
        var i, o;
        const {config: r, encoding: a, markDef: s, stack: c} = e, l = Mt(t), f = Tt(t), d = a[t], p = a[l],
            m = e.getScaleComponent(t), h = m ? m.get("type") : void 0, g = e.scaleName(t), v = s.orient,
            y = null !== (i = null !== (o = a[f]) && void 0 !== o ? o : a.size) && void 0 !== i ? i : Ba("size", s, r, {vgChannel: f}),
            b = "bar" === n && ("x" === t ? "vertical" === v : "horizontal" === v);
        if (qr(d) && (Fn(d.bin) || kn(d.bin) || d.timeUnit && !p) && !y && !go(h)) {
            var x, w;
            const n = Pr({channel: t, fieldDef: d, stack: c, markDef: s, config: r}),
                i = null === (x = e.component.axes[t]) || void 0 === x ? void 0 : x[0];
            return function ({fieldDef: e, fieldDef2: t, channel: n, band: i, scaleName: o, markDef: r, spacing: a = 0, axisTranslate: s, reverse: c, config: u}) {
                const l = Mt(n), f = jt(n), d = jt(l), p = Du(n, r);
                if (Fn(e.bin) || e.timeUnit) return {
                    [d]: ju({
                        channel: n,
                        fieldDef: e,
                        scaleName: o,
                        markDef: r,
                        band: (1 - i) / 2,
                        offset: Pu(l, a, c, s, p),
                        config: u
                    }),
                    [f]: ju({
                        channel: n,
                        fieldDef: e,
                        scaleName: o,
                        markDef: r,
                        band: 1 - (1 - i) / 2,
                        offset: Pu(n, a, c, s, p),
                        config: u
                    })
                };
                if (kn(e.bin)) {
                    const i = cr(e, o, {}, {offset: Pu(l, a, c, s, p)});
                    if (qr(t)) return {[d]: i, [f]: cr(t, o, {}, {offset: Pu(n, a, c, s, p)})};
                    if (Cn(e.bin) && e.bin.step) return {
                        [d]: i,
                        [f]: {
                            signal: 'scale("'.concat(o, '", ').concat(Kr(e, {expr: "datum"}), " + ").concat(e.bin.step, ")"),
                            offset: Pu(n, a, c, s, p)
                        }
                    }
                }
                return void si(oi(l))
            }({
                fieldDef: d,
                fieldDef2: p,
                channel: t,
                markDef: s,
                scaleName: g,
                band: n,
                axisTranslate: null !== (w = null == i ? void 0 : i.get("translate")) && void 0 !== w ? w : .5,
                spacing: en(t) ? Ba("binSpacing", s, r) : void 0,
                reverse: m.get("reverse"),
                config: r
            })
        }
        return (Hr(d) && go(h) || b) && !p ? function (e, t, n, i) {
            var o;
            const {markDef: r, encoding: a, config: s, stack: c} = i, l = r.orient, f = i.scaleName(n),
                d = i.getScaleComponent(n), p = Tt(n), m = Mt(n),
                h = "horizontal" === l && "y" === n || "vertical" === l && "x" === n,
                g = Ba(h ? "size" : p, r, s, {vgChannel: p});
            let v;
            (a.size || void 0 !== g) && (h ? v = xu("size", i, {vgChannel: p, defaultValue: g}) : si(function (e) {
                return 'Cannot apply size to non-oriented mark "'.concat(e, '".')
            }(r.type)));
            const y = null !== (o = Hr(t) ? Pr({
                channel: n,
                fieldDef: t,
                markDef: r,
                stack: c,
                config: s
            }) : void 0) && void 0 !== o ? o : 1;
            v = v || {[p]: Nu(e, p, f, d, s, y)};
            const b = "band" !== (null == d ? void 0 : d.get("type")) || !("band" in v[p]),
                x = Su(n, r, s, b ? "middle" : "top"), w = Du(n, r), A = or({
                    channel: n,
                    channelDef: t,
                    markDef: r,
                    config: s,
                    scaleName: f,
                    scale: d,
                    stack: c,
                    offset: w,
                    defaultRef: ku({model: i, defaultPos: "mid", channel: n, scaleName: f, scale: d}),
                    band: b ? .5 : (1 - y) / 2
                });
            if (p) return {[x]: A, ...v};
            {
                const e = jt(m), t = v[p], n = w ? {...t, offset: w} : t;
                return {[x]: A, [e]: u(A) ? [A[0], {...A[1], offset: n}] : {...A, offset: n}}
            }
        }(n, d, t, e) : _u(t, e, {defaultPos: "zeroOrMax", defaultPos2: "zeroOrMin"})
    }

    function Nu(e, t, n, i, o, r) {
        if (i) {
            const t = i.get("type");
            if ("point" === t || "band" === t) {
                if (void 0 !== o[e].discreteBandSize) return {value: o[e].discreteBandSize};
                if (t === io) {
                    const e = i.get("range");
                    return ki(e) && b(e.step) ? {value: e.step - 2} : {value: Ls - 2}
                }
                return {scale: n, band: r}
            }
            return {value: o[e].continuousBandSize}
        }
        const a = Ms(o.view, t), s = ue(o[e].discreteBandSize, a - 2);
        return void 0 !== s ? {value: s} : void 0
    }

    function Pu(e, t, n, i, o) {
        if (mt(e)) return 0;
        const r = "x" === e || "y2" === e ? -t / 2 : t / 2;
        if (Fi(n) || Fi(o) || Fi(i)) {
            const e = Ca(n), t = Ca(o), a = Ca(i);
            return {signal: (a ? "".concat(a, " + ") : "") + (e ? "(".concat(e, " ? -1 : 1) * ") : "") + (t ? "(".concat(t, " + ").concat(r, ")") : r)}
        }
        return o = o || 0, i + (n ? -o - r : +o + r)
    }

    function ju({channel: e, fieldDef: t, scaleName: n, markDef: i, band: o, offset: r, config: a}) {
        return rr({
            fieldDef: t,
            channel: e,
            markDef: i,
            ref: ur({scaleName: n, fieldOrDatumDef: t, band: o, offset: r}),
            config: a
        })
    }

    const Mu = new Set(["aria"]);

    function Tu(e, t) {
        const {fill: n, stroke: i} = "include" === t.color ? wu(e) : {};
        return {...qu(e.markDef, t), ...Lu(e, "fill", n), ...Lu(e, "stroke", i), ...xu("opacity", e), ...xu("fillOpacity", e), ...xu("strokeOpacity", e), ...xu("strokeWidth", e), ...xu("strokeDash", e), ...Au(e), ...mu(e), ...du(e, "href"), ...vu(e)}
    }

    function Lu(e, t, n) {
        const {config: i, mark: o, markDef: r} = e;
        if ("hide" === Ba("invalid", r, i) && n && !Jo(o)) {
            const i = function (e, {invalid: t = !1, channels: n}) {
                const i = n.reduce(((t, n) => {
                    const i = e.getScaleComponent(n);
                    if (i) {
                        const o = i.get("type"), r = e.vgField(n, {expr: "datum"});
                        r && vo(o) && (t[r] = !0)
                    }
                    return t
                }), {}), o = J(i);
                if (o.length > 0) {
                    const e = t ? "||" : "&&";
                    return o.map((e => sr(e, t))).join(" ".concat(e, " "))
                }
                return
            }(e, {invalid: !0, channels: gn});
            if (i) return {[t]: [{test: i, value: null}, ...h(n)]}
        }
        return n ? {[t]: n} : {}
    }

    function qu(e, t) {
        return Ei.reduce(((n, i) => (Mu.has(i) || void 0 === e[i] || "ignore" === t[i] || (n[i] = Fa(e[i])), n)), {})
    }

    function Ru(e) {
        const {config: t, markDef: n} = e;
        if (Ba("invalid", n, t)) {
            const t = function (e, {invalid: t = !1, channels: n}) {
                const i = n.reduce(((t, n) => {
                    const i = e.getScaleComponent(n);
                    if (i) {
                        const o = i.get("type"), r = e.vgField(n, {expr: "datum"});
                        r && vo(o) && (t[r] = !0)
                    }
                    return t
                }), {}), o = J(i);
                if (o.length > 0) {
                    const e = t ? "||" : "&&";
                    return o.map((e => sr(e, t))).join(" ".concat(e, " "))
                }
                return
            }(e, {channels: Zt});
            if (t) return {defined: {signal: t}}
        }
        return {}
    }

    function Wu(e, t) {
        if (void 0 !== t) return {[e]: Fa(t)}
    }

    const Uu = "voronoi", Iu = {
        has: e => "interval" !== e.type && e.nearest, parse: (e, t) => {
            if (t.events) for (const n of t.events) n.markname = e.getName(Uu)
        }, marks: (e, t, n) => {
            const {x: i, y: o} = t.project.hasChannel, r = e.mark;
            if (Jo(r)) return si('The "nearest" transform is not supported for '.concat(r, " marks.")), n;
            const a = {
                name: e.getName(Uu),
                type: "path",
                interactive: !0,
                from: {data: e.getName("marks")},
                encode: {
                    update: {
                        fill: {value: "transparent"},
                        strokeWidth: {value: .35},
                        stroke: {value: "transparent"},
                        isVoronoi: {value: !0}, ...mu(e, {reactiveGeom: !0})
                    }
                },
                transform: [{
                    type: "voronoi",
                    x: {expr: i || !o ? "datum.datum.x || 0" : "0"},
                    y: {expr: o || !i ? "datum.datum.y || 0" : "0"},
                    size: [e.getSizeSignalRef("width"), e.getSizeSignalRef("height")]
                }]
            };
            let s = 0, c = !1;
            return n.forEach(((t, n) => {
                var i;
                const o = null !== (i = t.name) && void 0 !== i ? i : "";
                o === e.component.mark[0].name ? s = n : o.indexOf(Uu) >= 0 && (c = !0)
            })), c || n.splice(s + 1, 0, a), n
        }
    };

    class Hu {
        constructor(e, t) {
            this.debugName = t, Bn(this, "_children", []), Bn(this, "_parent", null), Bn(this, "_hash", void 0), e && (this.parent = e)
        }

        clone() {
            throw new Error("Cannot clone node")
        }

        get parent() {
            return this._parent
        }

        set parent(e) {
            this._parent = e, e && e.addChild(this)
        }

        get children() {
            return this._children
        }

        numChildren() {
            return this._children.length
        }

        addChild(e, t) {
            this._children.indexOf(e) > -1 ? si("Attempt to add the same child twice.") : void 0 !== t ? this._children.splice(t, 0, e) : this._children.push(e)
        }

        removeChild(e) {
            const t = this._children.indexOf(e);
            return this._children.splice(t, 1), t
        }

        remove() {
            let e = this._parent.removeChild(this);
            for (const t of this._children) t._parent = this._parent, this._parent.addChild(t, e++)
        }

        insertAsParentOf(e) {
            const t = e.parent;
            t.removeChild(this), this.parent = t, e.parent = this
        }

        swapWithParent() {
            const e = this._parent, t = e.parent;
            for (const t of this._children) t.parent = e;
            this._children = [], e.removeChild(this), e.parent.removeChild(e), this.parent = t, e.parent = this
        }
    }

    class Gu extends Hu {
        clone() {
            const e = new this.constructor;
            return e.debugName = "clone_" + this.debugName, e._source = this._source, e._name = "clone_" + this._name, e.type = this.type, e.refCounts = this.refCounts, e.refCounts[e._name] = 0, e
        }

        constructor(e, t, n, i) {
            super(e, t), this.type = n, this.refCounts = i, Bn(this, "_source", void 0), Bn(this, "_name", void 0), this._source = this._name = t, this.refCounts && !(this._name in this.refCounts) && (this.refCounts[this._name] = 0)
        }

        dependentFields() {
            return new Set
        }

        producedFields() {
            return new Set
        }

        hash() {
            return void 0 === this._hash && (this._hash = "Output ".concat(fe())), this._hash
        }

        getSource() {
            return this.refCounts[this._name]++, this._source
        }

        isRequired() {
            return !!this.refCounts[this._name]
        }

        setSource(e) {
            this._source = e
        }
    }

    class Vu extends Hu {
        clone() {
            return new Vu(null, z(this.formula))
        }

        constructor(e, t) {
            super(e), this.formula = t
        }

        static makeFromEncoding(e, t) {
            const n = t.reduceFieldDef(((e, n, i) => {
                const {field: o, timeUnit: r} = n, a = Em(t) ? t.encoding[Mt(i)] : void 0,
                    s = Em(t) && jr(i, n, a, t.stack, t.markDef, t.config);
                if (r) {
                    const t = Kr(n, {forAs: !0});
                    e[j({as: t, field: o, timeUnit: r})] = {as: t, field: o, timeUnit: r, ...s ? {band: !0} : {}}
                }
                return e
            }), {});
            return Y(n) ? null : new Vu(e, n)
        }

        static makeFromTransform(e, t) {
            const {timeUnit: n, ...i} = {...t}, o = {...i, timeUnit: Di(n)};
            return new Vu(e, {[j(o)]: o})
        }

        merge(e) {
            this.formula = {...this.formula};
            for (const t in e.formula) this.formula[t] && !e.formula[t].band || (this.formula[t] = e.formula[t]);
            for (const t of e.children) e.removeChild(t), t.parent = this;
            e.remove()
        }

        removeFormulas(e) {
            const t = {};
            for (const [n, i] of Q(this.formula)) e.has(i.as) || (t[n] = i);
            this.formula = t
        }

        producedFields() {
            return new Set(X(this.formula).map((e => e.as)))
        }

        dependentFields() {
            return new Set(X(this.formula).map((e => e.field)))
        }

        hash() {
            return "TimeUnit ".concat(j(this.formula))
        }

        assemble() {
            const e = [];
            for (const t of X(this.formula)) {
                const {field: n, as: i, timeUnit: o} = t, {unit: r, utc: a, ...s} = Di(o);
                e.push({
                    field: re(n),
                    type: "timeunit", ...r ? {units: bi(r)} : {}, ...a ? {timezone: "utc"} : {}, ...s,
                    as: [i, "".concat(i, "_end")]
                })
            }
            return e
        }
    }

    const Yu = "_tuple_fields";

    class Ju {
        constructor(...e) {
            Bn(this, "hasChannel", void 0), Bn(this, "hasField", void 0), Bn(this, "timeUnit", void 0), Bn(this, "items", void 0), this.items = e, this.hasChannel = {}, this.hasField = {}
        }
    }

    const Xu = {
        has: e => "single" === e.type && "global" === e.resolve && e.bind && "scales" !== e.bind && !ks(e.bind),
        parse: (e, t, n, i) => {
            i.on || delete t.events, i.clear || delete t.clear
        },
        topLevelSignals: (e, t, n) => {
            const i = t.name, o = t.project, r = t.bind, a = t.init && t.init[0],
                s = Iu.has(t) ? "(item().isVoronoi ? datum.datum : datum)" : "datum";
            return o.items.forEach(((e, o) => {
                const c = K("".concat(i, "_").concat(e.field));
                var u, l;
                n.filter((e => e.name === c)).length || n.unshift({
                    name: c, ...a ? {init: pl(a[o])} : {value: null},
                    on: t.events ? [{
                        events: t.events,
                        update: "datum && item().mark.marktype !== 'group' ? ".concat(s, "[").concat(w(e.field), "] : null")
                    }] : [],
                    bind: null !== (u = null !== (l = r[e.field]) && void 0 !== l ? l : r[e.channel]) && void 0 !== u ? u : r
                })
            })), n
        },
        signals: (e, t, n) => {
            const i = t.name, o = t.project, r = n.filter((e => e.name === i + kl))[0], a = i + Yu,
                s = o.items.map((e => K("".concat(i, "_").concat(e.field)))),
                c = s.map((e => "".concat(e, " !== null"))).join(" && ");
            return s.length && (r.update = "".concat(c, " ? {fields: ").concat(a, ", values: [").concat(s.join(", "), "]} : null")), delete r.value, delete r.on, n
        }
    }, Qu = "_toggle", $u = {
        has: e => "multi" === e.type && !!e.toggle,
        signals: (e, t, n) => n.concat({name: t.name + Qu, value: !1, on: [{events: t.events, update: t.toggle}]}),
        modifyExpr: (e, t) => {
            const n = t.name + kl, i = t.name + Qu;
            return "".concat(i, " ? null : ").concat(n, ", ") + ("global" === t.resolve ? "".concat(i, " ? null : true, ") : "".concat(i, " ? null : {unit: ").concat(_l(e), "}, ")) + "".concat(i, " ? ").concat(n, " : null")
        }
    }, Ku = {
        has: e => void 0 !== e.clear && !1 !== e.clear, parse: (e, t, n) => {
            n.clear && (t.clear = x(n.clear) ? su(n.clear, "scope") : n.clear)
        }, topLevelSignals: (e, t, n) => {
            if (Xu.has(t)) for (const e of t.project.items) {
                const i = n.findIndex((n => n.name === K("".concat(t.name, "_").concat(e.field))));
                -1 !== i && n[i].on.push({events: t.clear, update: "null"})
            }
            return n
        }, signals: (e, t, n) => {
            function i(e, i) {
                -1 !== e && n[e].on && n[e].on.push({events: t.clear, update: i})
            }

            if ("interval" === t.type) for (const e of t.project.items) {
                const t = n.findIndex((t => t.name === e.signals.visual));
                if (i(t, "[0, 0]"), -1 === t) {
                    i(n.findIndex((t => t.name === e.signals.data)), "null")
                }
            } else {
                let e = n.findIndex((e => e.name === t.name + kl));
                i(e, "null"), $u.has(t) && (e = n.findIndex((e => e.name === t.name + Qu)), i(e, "false"))
            }
            return n
        }
    }, Zu = {
        has: e => "interval" === e.type && "global" === e.resolve && e.bind && "scales" === e.bind, parse: (e, t) => {
            const n = t.scales = [];
            for (const i of t.project.items) {
                const o = i.channel;
                if (!vn(o)) continue;
                const r = e.getScaleComponent(o), a = r ? r.get("type") : void 0;
                if (!r || !vo(a)) {
                    si("Scale bindings are currently only supported for scales with unbinned, continuous domains.");
                    continue
                }
                const s = {selection: t.name, field: i.field};
                r.set("selectionExtent", s, !0), n.push(i)
            }
        }, topLevelSignals: (e, t, n) => {
            const i = t.scales.filter((e => 0 === n.filter((t => t.name === e.signals.data)).length));
            if (!e.parent || tl(e) || 0 === i.length) return n;
            const o = n.filter((e => e.name === t.name))[0];
            let r = o.update;
            if (r.indexOf(El) >= 0) o.update = "{".concat(i.map((e => "".concat(w(e.field), ": ").concat(e.signals.data))).join(", "), "}"); else {
                for (const e of i) {
                    const t = "".concat(w(e.field), ": ").concat(e.signals.data);
                    r.indexOf(t) < 0 && (r = "".concat(r.substring(0, r.length - 1), ", ").concat(t, "}"))
                }
                o.update = r
            }
            return n.concat(i.map((e => ({name: e.signals.data}))))
        }, signals: (e, t, n) => {
            if (e.parent && !tl(e)) for (const e of t.scales) {
                const t = n.filter((t => t.name === e.signals.data))[0];
                t.push = "outer", delete t.value, delete t.update
            }
            return n
        }
    };

    function el(e, t) {
        const n = w(e.scaleName(t));
        return "domain(".concat(n, ")")
    }

    function tl(e) {
        var t;
        return e.parent && _m(e.parent) && (null !== (t = !e.parent.parent) && void 0 !== t ? t : tl(e.parent.parent))
    }

    const nl = {
        has: e => {
            const t = "global" === e.resolve && e.bind && ks(e.bind),
                n = 1 === e.project.items.length && e.project.items[0].field !== Ds;
            return t && !n && si("Legend bindings are only supported for selections over an individual field or encoding channel."), t && n
        }, parse: (e, t, n, i) => {
            if (i.on || delete t.events, i.clear || delete t.clear, i.on || i.clear) {
                const e = 'event.item && indexof(event.item.mark.role, "legend") < 0';
                for (const n of t.events) {
                    var o;
                    n.filter = h(null !== (o = n.filter) && void 0 !== o ? o : []), n.filter.indexOf(e) < 0 && n.filter.push(e)
                }
            }
            const r = Cs(t.bind) ? t.bind.legend : "click", a = x(r) ? su(r, "view") : h(r);
            t.bind = {legend: {merge: a}}
        }, topLevelSignals: (e, t, n) => {
            const i = t.name, o = Cs(t.bind) && t.bind.legend, r = e => t => {
                const n = z(t);
                return n.markname = e, n
            };
            for (const e of t.project.items) {
                if (!e.hasLegend) continue;
                const a = "".concat(K(e.field), "_legend"), s = "".concat(i, "_").concat(a);
                if (0 === n.filter((e => e.name === s)).length) {
                    const e = o.merge.map(r("".concat(a, "_symbols"))).concat(o.merge.map(r("".concat(a, "_labels")))).concat(o.merge.map(r("".concat(a, "_entries"))));
                    n.unshift({
                        name: s, ...t.init ? {} : {value: null},
                        on: [{
                            events: e,
                            update: "datum.value || item().items[0].items[0].datum.value",
                            force: !0
                        }, {events: o.merge, update: "!event.item || !datum ? null : ".concat(s), force: !0}]
                    })
                }
            }
            return n
        }, signals: (e, t, n) => {
            const i = t.name, o = t.project, r = n.find((e => e.name === i + kl)), a = i + Yu,
                s = o.items.filter((e => e.hasLegend)).map((e => K("".concat(i, "_").concat(K(e.field), "_legend")))),
                c = s.map((e => "".concat(e, " !== null"))).join(" && "),
                u = "".concat(c, " ? {fields: ").concat(a, ", values: [").concat(s.join(", "), "]} : null");
            t.events && s.length > 0 ? r.on.push({
                events: s.map((e => ({signal: e}))),
                update: u
            }) : s.length > 0 && (r.update = u, delete r.value, delete r.on);
            const l = n.find((e => e.name === i + Qu)), f = Cs(t.bind) && t.bind.legend;
            return l && (t.events ? l.on.push({...l.on[0], events: f}) : l.on[0].events = f), n
        }
    };
    const il = "_translate_anchor", ol = "_translate_delta", rl = {
        has: e => "interval" === e.type && e.translate, signals: (e, t, n) => {
            const i = t.name, o = Zu.has(t), r = i + il, {x: a, y: s} = t.project.hasChannel;
            let c = su(t.translate, "scope");
            return o || (c = c.map((e => (e.between[0].markname = i + vl, e)))), n.push({
                name: r,
                value: {},
                on: [{
                    events: c.map((e => e.between[0])),
                    update: "{x: x(unit), y: y(unit)" + (void 0 !== a ? ", extent_x: " + (o ? el(e, Me) : "slice(".concat(a.signals.visual, ")")) : "") + (void 0 !== s ? ", extent_y: " + (o ? el(e, Te) : "slice(".concat(s.signals.visual, ")")) : "") + "}"
                }]
            }, {
                name: i + ol,
                value: {},
                on: [{events: c, update: "{x: ".concat(r, ".x - x(unit), y: ").concat(r, ".y - y(unit)}")}]
            }), void 0 !== a && al(e, t, a, "width", n), void 0 !== s && al(e, t, s, "height", n), n
        }
    };

    function al(e, t, n, i, o) {
        var r;
        const a = t.name, s = a + il, c = a + ol, u = n.channel, l = Zu.has(t),
            f = o.filter((e => e.name === n.signals[l ? "data" : "visual"]))[0], d = e.getSizeSignalRef(i).signal,
            p = e.getScaleComponent(u), m = p.get("type"), h = l && u === Me ? "-" : "",
            g = "".concat(s, ".extent_").concat(u),
            v = "".concat(h).concat(c, ".").concat(u, " / ") + (l ? "".concat(d) : "span(".concat(g, ")")),
            y = "".concat(l ? "log" === m ? "panLog" : "pow" === m ? "panPow" : "panLinear" : "panLinear", "(").concat(g, ", ").concat(v) + (l && "pow" === m ? ", ".concat(null !== (r = p.get("exponent")) && void 0 !== r ? r : 1) : "") + ")";
        f.on.push({events: {signal: c}, update: l ? y : "clampRange(".concat(y, ", 0, ").concat(d, ")")})
    }

    const sl = "_zoom_anchor", cl = "_zoom_delta", ul = {
        has: e => "interval" === e.type && e.zoom, signals: (e, t, n) => {
            const i = t.name, o = Zu.has(t), r = i + cl, {x: a, y: s} = t.project.hasChannel, c = w(e.scaleName(Me)),
                u = w(e.scaleName(Te));
            let l = su(t.zoom, "scope");
            return o || (l = l.map((e => (e.markname = i + vl, e)))), n.push({
                name: i + sl,
                on: [{
                    events: l,
                    update: o ? "{" + [c ? "x: invert(".concat(c, ", x(unit))") : "", u ? "y: invert(".concat(u, ", y(unit))") : ""].filter((e => !!e)).join(", ") + "}" : "{x: x(unit), y: y(unit)}"
                }]
            }, {
                name: r,
                on: [{events: l, force: !0, update: "pow(1.001, event.deltaY * pow(16, event.deltaMode))"}]
            }), void 0 !== a && ll(e, t, a, "width", n), void 0 !== s && ll(e, t, s, "height", n), n
        }
    };

    function ll(e, t, n, i, o) {
        var r;
        const a = t.name, s = n.channel, c = Zu.has(t),
            u = o.filter((e => e.name === n.signals[c ? "data" : "visual"]))[0], l = e.getSizeSignalRef(i).signal,
            f = e.getScaleComponent(s), d = f.get("type"), p = c ? el(e, s) : u.name, m = a + cl,
            h = "".concat(a).concat(sl, ".").concat(s),
            g = "".concat(c ? "log" === d ? "zoomLog" : "pow" === d ? "zoomPow" : "zoomLinear" : "zoomLinear", "(").concat(p, ", ").concat(h, ", ").concat(m) + (c && "pow" === d ? ", ".concat(null !== (r = f.get("exponent")) && void 0 !== r ? r : 1) : "") + ")";
        u.on.push({events: {signal: m}, update: c ? g : "clampRange(".concat(g, ", 0, ").concat(l, ")")})
    }

    const fl = [{
        has: () => !0, parse: (e, t, n) => {
            var i;
            const o = t.name, r = null !== (i = t.project) && void 0 !== i ? i : t.project = new Ju, a = {}, s = {},
                c = new Set, u = (e, t) => {
                    const n = "visual" === t ? e.channel : e.field;
                    let i = K("".concat(o, "_").concat(n));
                    for (let e = 1; c.has(i); e++) i = K("".concat(o, "_").concat(n, "_").concat(e));
                    return c.add(i), {[t]: i}
                };
            if (!n.fields && !n.encodings) {
                const t = e.config.selection[n.type];
                if (n.init) for (const e of h(n.init)) for (const i of J(e)) _t[i] ? (n.encodings || (n.encodings = [])).push(i) : "interval" === n.type ? (si('Interval selections should be initialized using "x" and/or "y" keys.'), n.encodings = t.encodings) : (n.fields || (n.fields = [])).push(i); else n.encodings = t.encodings, n.fields = t.fields
            }
            for (const e of null !== (l = n.fields) && void 0 !== l ? l : []) {
                var l;
                const t = {type: "E", field: e};
                t.signals = {...u(t, "data")}, r.items.push(t), r.hasField[e] = t
            }
            for (const i of null !== (f = n.encodings) && void 0 !== f ? f : []) {
                var f;
                const n = e.fieldDef(i);
                if (n) {
                    let o = n.field;
                    if (n.aggregate) {
                        si(Ln(i, n.aggregate));
                        continue
                    }
                    if (!o) {
                        si(Tn(i));
                        continue
                    }
                    if (n.timeUnit) {
                        o = e.vgField(i);
                        const t = {timeUnit: n.timeUnit, as: o, field: n.field};
                        s[j(t)] = t
                    }
                    if (!a[o]) {
                        let s = "E";
                        if ("interval" === t.type) {
                            vo(e.getScaleComponent(i).get("type")) && (s = "R")
                        } else n.bin && (s = "R-RE");
                        const c = {field: o, channel: i, type: s};
                        c.signals = {...u(c, "data"), ...u(c, "visual")}, r.items.push(a[o] = c), r.hasField[o] = r.hasChannel[i] = a[o]
                    }
                } else si(Tn(i))
            }
            if (n.init) {
                const e = e => r.items.map((t => void 0 !== e[t.channel] ? e[t.channel] : e[t.field]));
                if ("interval" === n.type) t.init = e(n.init); else {
                    const i = h(n.init);
                    t.init = i.map(e)
                }
            }
            Y(s) || (r.timeUnit = new Vu(null, s))
        }, signals: (e, t, n) => {
            const i = t.name + Yu;
            return n.filter((e => e.name === i)).length > 0 ? n : n.concat({
                name: i, value: t.project.items.map((e => {
                    const {signals: t, hasLegend: n, ...i} = e;
                    return i.field = re(i.field), i
                }))
            })
        }
    }, $u, Zu, nl, rl, ul, Xu, Iu, Ku];

    function dl(e, t) {
        for (const n of fl) n.has(e) && t(n)
    }

    function pl(e, t = !0, n = s) {
        if (u(e)) {
            const i = e.map((e => pl(e, t, n)));
            return t ? "[".concat(i.join(", "), "]") : i
        }
        return ci(e) ? n(t ? mi(e) : function (e) {
            const t = pi(e, !0);
            return e.utc ? +new Date(Date.UTC(...t)) : +new Date(...t)
        }(e)) : t ? n(JSON.stringify(e)) : e
    }

    function ml(e, t) {
        if (e.component.selection && J(e.component.selection).length) {
            const n = w(e.getName("cell"));
            t.unshift({
                name: "facet",
                value: {},
                on: [{events: su("mousemove", "scope"), update: "isTuple(facet) ? facet : group(".concat(n, ").datum")}]
            })
        }
        return gl(t)
    }

    function hl(e, t) {
        return Bl(e, ((n, i) => {
            t = i.marks ? i.marks(e, n, t) : t, dl(n, (i => {
                i.marks && (t = i.marks(e, n, t))
            }))
        })), t
    }

    function gl(e) {
        return e.map((e => (e.on && !e.on.length && delete e.on, e)))
    }

    const vl = "_brush", yl = "_scale_trigger", bl = {
        signals: (e, t) => {
            const n = t.name, i = n + Yu, o = Zu.has(t), r = [], a = [], s = [];
            if (t.translate && !o) {
                const e = "!event.item || event.item.mark.name !== ".concat(w(n + vl));
                xl(t, ((t, n) => {
                    var i;
                    const o = h(null !== (i = n.between[0].filter) && void 0 !== i ? i : n.between[0].filter = []);
                    return o.indexOf(e) < 0 && o.push(e), t
                }))
            }
            t.project.items.forEach(((n, i) => {
                const o = n.channel;
                if (o !== Me && o !== Te) return void si("Interval selections only support x and y encoding channels.");
                const c = t.init ? t.init[i] : null, u = function (e, t, n, i) {
                        const o = n.channel, r = n.signals.visual, a = n.signals.data, s = Zu.has(t), c = w(e.scaleName(o)),
                            u = e.getScaleComponent(o), l = u ? u.get("type") : void 0,
                            f = e => "scale(".concat(c, ", ").concat(e, ")"),
                            d = e.getSizeSignalRef(o === Me ? "width" : "height").signal, p = "".concat(o, "(unit)"),
                            m = xl(t, ((e, t) => [...e, {
                                events: t.between[0],
                                update: "[".concat(p, ", ").concat(p, "]")
                            }, {events: t, update: "[".concat(r, "[0], clamp(").concat(p, ", 0, ").concat(d, ")]")}]));
                        return m.push({
                            events: {signal: t.name + yl},
                            update: vo(l) ? "[".concat(f("".concat(a, "[0]")), ", ").concat(f("".concat(a, "[1]")), "]") : "[0, 0]"
                        }), s ? [{name: a, on: []}] : [{
                            name: r, ...i ? {init: pl(i, !0, f)} : {value: []},
                            on: m
                        }, {
                            name: a, ...i ? {init: pl(i)} : {},
                            on: [{
                                events: {signal: r},
                                update: "".concat(r, "[0] === ").concat(r, "[1] ? null : invert(").concat(c, ", ").concat(r, ")")
                            }]
                        }]
                    }(e, t, n, c), l = n.signals.data, f = n.signals.visual, d = w(e.scaleName(o)),
                    p = vo(e.getScaleComponent(o).get("type")) ? "+" : "";
                r.push(...u), a.push(l), s.push({
                    scaleName: e.scaleName(o),
                    expr: "(!isArray(".concat(l, ") || ") + "(".concat(p, "invert(").concat(d, ", ").concat(f, ")[0] === ").concat(p).concat(l, "[0] && ") + "".concat(p, "invert(").concat(d, ", ").concat(f, ")[1] === ").concat(p).concat(l, "[1]))")
                })
            })), o || r.push({
                name: n + yl,
                value: {},
                on: [{
                    events: s.map((e => ({scale: e.scaleName}))),
                    update: s.map((e => e.expr)).join(" && ") + " ? ".concat(n + yl, " : {}")
                }]
            });
            const c = t.init, u = "unit: ".concat(_l(e), ", fields: ").concat(i, ", values");
            return r.concat({
                name: n + kl, ...c ? {init: "{".concat(u, ": ").concat(pl(c), "}")} : {},
                on: [{
                    events: [{signal: a.join(" || ")}],
                    update: a.join(" && ") + " ? {".concat(u, ": [").concat(a, "]} : null")
                }]
            })
        },
        modifyExpr: (e, t) => t.name + kl + ", " + ("global" === t.resolve ? "true" : "{unit: ".concat(_l(e), "}")),
        marks: (e, t, n) => {
            const i = t.name, {x: o, y: r} = t.project.hasChannel, a = o && o.signals.visual, s = r && r.signals.visual,
                c = "data(".concat(w(t.name + Fl), ")");
            if (Zu.has(t)) return n;
            const u = {
                x: void 0 !== o ? {signal: "".concat(a, "[0]")} : {value: 0},
                y: void 0 !== r ? {signal: "".concat(s, "[0]")} : {value: 0},
                x2: void 0 !== o ? {signal: "".concat(a, "[1]")} : {field: {group: "width"}},
                y2: void 0 !== r ? {signal: "".concat(s, "[1]")} : {field: {group: "height"}}
            };
            if ("global" === t.resolve) for (const t of J(u)) u[t] = [{test: "".concat(c, ".length && ").concat(c, "[0].unit === ").concat(_l(e)), ...u[t]}, {value: 0}];
            const {fill: l, fillOpacity: f, cursor: d, ...p} = t.mark, m = J(p).reduce(((e, t) => (e[t] = [{
                test: [void 0 !== o && "".concat(a, "[0] !== ").concat(a, "[1]"), void 0 !== r && "".concat(s, "[0] !== ").concat(s, "[1]")].filter((e => e)).join(" && "),
                value: p[t]
            }, {value: null}], e)), {});
            return [{
                name: i + vl + "_bg",
                type: "rect",
                clip: !0,
                encode: {enter: {fill: {value: l}, fillOpacity: {value: f}}, update: u}
            }, ...n, {
                name: i + vl,
                type: "rect",
                clip: !0,
                encode: {enter: {...d ? {cursor: {value: d}} : {}, fill: {value: "transparent"}}, update: {...u, ...m}}
            }]
        }
    };

    function xl(e, t) {
        return e.events.reduce(((e, n) => n.between ? t(e, n) : (si("".concat(n, " is not an ordered event stream for interval selections.")), e)), [])
    }

    function wl(e, t) {
        const n = t.name, i = n + Yu, o = t.project, r = "(item().isVoronoi ? datum.datum : datum)",
            a = o.items.map((t => {
                const n = e.fieldDef(t.channel);
                return n && n.bin ? "[".concat(r, "[").concat(w(e.vgField(t.channel, {})), "], ") + "".concat(r, "[").concat(w(e.vgField(t.channel, {binSuffix: "end"})), "]]") : "".concat(r, "[").concat(w(t.field), "]")
            })).join(", "), s = "unit: ".concat(_l(e), ", fields: ").concat(i, ", values"), c = t.events;
        return [{
            name: n + kl,
            on: c ? [{
                events: c,
                update: "datum && item().mark.marktype !== 'group' ? {".concat(s, ": [").concat(a, "]} : null"),
                force: !0
            }] : []
        }]
    }

    const Al = {
            signals: wl,
            modifyExpr: (e, t) => t.name + kl + ", " + ("global" === t.resolve ? "null" : "{unit: ".concat(_l(e), "}"))
        }, Dl = {
            signals: wl,
            modifyExpr: (e, t) => t.name + kl + ", " + ("global" === t.resolve ? "true" : "{unit: ".concat(_l(e), "}"))
        }, Fl = "_store", kl = "_tuple", Cl = "_modify", El = "vlSelectionResolve",
        Sl = {single: Dl, multi: Al, interval: bl};

    function Bl(e, t) {
        const n = e.component.selection;
        if (n) for (const e of X(n)) {
            if (!0 === t(e, Sl[e.type])) break
        }
    }

    function _l(e, {escape: t} = {escape: !0}) {
        let n = t ? w(e.name) : e.name;
        const i = function (e) {
            let t = e.parent;
            for (; t && !Sm(t);) t = t.parent;
            return t
        }(e);
        if (i) {
            const {facet: e} = i;
            for (const t of xt) e[t] && (n += " + '__facet_".concat(t, "_' + (facet[").concat(w(i.vgField(t)), "])"))
        }
        return n
    }

    function zl(e) {
        let t = !1;
        return Bl(e, (e => {
            t = t || e.project.items.some((e => e.field === Ds))
        })), t
    }

    const Ol = "RawCode", Nl = "Literal", Pl = "Property", jl = "Identifier", Ml = "ArrayExpression",
        Tl = "BinaryExpression", Ll = "CallExpression", ql = "ConditionalExpression", Rl = "LogicalExpression",
        Wl = "MemberExpression", Ul = "ObjectExpression", Il = "UnaryExpression";

    function Hl(e) {
        this.type = e
    }

    var Gl, Vl, Yl, Jl, Xl;
    Hl.prototype.visit = function (e) {
        let t, n, i;
        if (e(this)) return 1;
        for (t = function (e) {
            switch (e.type) {
                case Ml:
                    return e.elements;
                case Tl:
                case Rl:
                    return [e.left, e.right];
                case Ll:
                    return [e.callee].concat(e.arguments);
                case ql:
                    return [e.test, e.consequent, e.alternate];
                case Wl:
                    return [e.object, e.property];
                case Ul:
                    return e.properties;
                case Pl:
                    return [e.key, e.value];
                case Il:
                    return [e.argument];
                case jl:
                case Nl:
                case Ol:
                default:
                    return []
            }
        }(this), n = 0, i = t.length; n < i; ++n) if (t[n].visit(e)) return 1
    };
    (Gl = {})[1] = "Boolean", Gl[2] = "<end>", Gl[3] = "Identifier", Gl[4] = "Keyword", Gl[5] = "Null", Gl[6] = "Numeric", Gl[7] = "Punctuator", Gl[8] = "String", Gl[9] = "RegularExpression";
    var Ql = "Identifier", $l = "Unexpected token %0", Kl = "Invalid regular expression",
        Zl = "Invalid regular expression: missing /", ef = "Octal literals are not allowed in strict mode.",
        tf = "ILLEGAL", nf = "Disabled.",
        of = new RegExp("[\\xAA\\xB5\\xBA\\xC0-\\xD6\\xD8-\\xF6\\xF8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u037F\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u052F\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0620-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0800-\\u0815\\u081A\\u0824\\u0828\\u0840-\\u0858\\u08A0-\\u08B2\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971-\\u0980\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0CF1\\u0CF2\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC-\\u0EDF\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16EE-\\u16F8\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1AA7\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1BBA-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1CE9-\\u1CEC\\u1CEE-\\u1CF1\\u1CF5\\u1CF6\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u209C\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2160-\\u2188\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CEE\\u2CF2\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FCC\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA66E\\uA67F-\\uA69D\\uA6A0-\\uA6EF\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA78E\\uA790-\\uA7AD\\uA7B0\\uA7B1\\uA7F7-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uA9CF\\uA9E0-\\uA9E4\\uA9E6-\\uA9EF\\uA9FA-\\uA9FE\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA76\\uAA7A\\uAA7E-\\uAAAF\\uAAB1\\uAAB5\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEA\\uAAF2-\\uAAF4\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uAB30-\\uAB5A\\uAB5C-\\uAB5F\\uAB64\\uAB65\\uABC0-\\uABE2\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]"),
        rf = new RegExp("[\\xAA\\xB5\\xBA\\xC0-\\xD6\\xD8-\\xF6\\xF8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0300-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u037F\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u0483-\\u0487\\u048A-\\u052F\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0610-\\u061A\\u0620-\\u0669\\u066E-\\u06D3\\u06D5-\\u06DC\\u06DF-\\u06E8\\u06EA-\\u06FC\\u06FF\\u0710-\\u074A\\u074D-\\u07B1\\u07C0-\\u07F5\\u07FA\\u0800-\\u082D\\u0840-\\u085B\\u08A0-\\u08B2\\u08E4-\\u0963\\u0966-\\u096F\\u0971-\\u0983\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BC-\\u09C4\\u09C7\\u09C8\\u09CB-\\u09CE\\u09D7\\u09DC\\u09DD\\u09DF-\\u09E3\\u09E6-\\u09F1\\u0A01-\\u0A03\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A3C\\u0A3E-\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A59-\\u0A5C\\u0A5E\\u0A66-\\u0A75\\u0A81-\\u0A83\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABC-\\u0AC5\\u0AC7-\\u0AC9\\u0ACB-\\u0ACD\\u0AD0\\u0AE0-\\u0AE3\\u0AE6-\\u0AEF\\u0B01-\\u0B03\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3C-\\u0B44\\u0B47\\u0B48\\u0B4B-\\u0B4D\\u0B56\\u0B57\\u0B5C\\u0B5D\\u0B5F-\\u0B63\\u0B66-\\u0B6F\\u0B71\\u0B82\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BBE-\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCD\\u0BD0\\u0BD7\\u0BE6-\\u0BEF\\u0C00-\\u0C03\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D-\\u0C44\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C58\\u0C59\\u0C60-\\u0C63\\u0C66-\\u0C6F\\u0C81-\\u0C83\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBC-\\u0CC4\\u0CC6-\\u0CC8\\u0CCA-\\u0CCD\\u0CD5\\u0CD6\\u0CDE\\u0CE0-\\u0CE3\\u0CE6-\\u0CEF\\u0CF1\\u0CF2\\u0D01-\\u0D03\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D-\\u0D44\\u0D46-\\u0D48\\u0D4A-\\u0D4E\\u0D57\\u0D60-\\u0D63\\u0D66-\\u0D6F\\u0D7A-\\u0D7F\\u0D82\\u0D83\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0DCA\\u0DCF-\\u0DD4\\u0DD6\\u0DD8-\\u0DDF\\u0DE6-\\u0DEF\\u0DF2\\u0DF3\\u0E01-\\u0E3A\\u0E40-\\u0E4E\\u0E50-\\u0E59\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB9\\u0EBB-\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EC8-\\u0ECD\\u0ED0-\\u0ED9\\u0EDC-\\u0EDF\\u0F00\\u0F18\\u0F19\\u0F20-\\u0F29\\u0F35\\u0F37\\u0F39\\u0F3E-\\u0F47\\u0F49-\\u0F6C\\u0F71-\\u0F84\\u0F86-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u1000-\\u1049\\u1050-\\u109D\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u135D-\\u135F\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16EE-\\u16F8\\u1700-\\u170C\\u170E-\\u1714\\u1720-\\u1734\\u1740-\\u1753\\u1760-\\u176C\\u176E-\\u1770\\u1772\\u1773\\u1780-\\u17D3\\u17D7\\u17DC\\u17DD\\u17E0-\\u17E9\\u180B-\\u180D\\u1810-\\u1819\\u1820-\\u1877\\u1880-\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1920-\\u192B\\u1930-\\u193B\\u1946-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19B0-\\u19C9\\u19D0-\\u19D9\\u1A00-\\u1A1B\\u1A20-\\u1A5E\\u1A60-\\u1A7C\\u1A7F-\\u1A89\\u1A90-\\u1A99\\u1AA7\\u1AB0-\\u1ABD\\u1B00-\\u1B4B\\u1B50-\\u1B59\\u1B6B-\\u1B73\\u1B80-\\u1BF3\\u1C00-\\u1C37\\u1C40-\\u1C49\\u1C4D-\\u1C7D\\u1CD0-\\u1CD2\\u1CD4-\\u1CF6\\u1CF8\\u1CF9\\u1D00-\\u1DF5\\u1DFC-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u200C\\u200D\\u203F\\u2040\\u2054\\u2071\\u207F\\u2090-\\u209C\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2160-\\u2188\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D7F-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2DE0-\\u2DFF\\u2E2F\\u3005-\\u3007\\u3021-\\u302F\\u3031-\\u3035\\u3038-\\u303C\\u3041-\\u3096\\u3099\\u309A\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FCC\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA62B\\uA640-\\uA66F\\uA674-\\uA67D\\uA67F-\\uA69D\\uA69F-\\uA6F1\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA78E\\uA790-\\uA7AD\\uA7B0\\uA7B1\\uA7F7-\\uA827\\uA840-\\uA873\\uA880-\\uA8C4\\uA8D0-\\uA8D9\\uA8E0-\\uA8F7\\uA8FB\\uA900-\\uA92D\\uA930-\\uA953\\uA960-\\uA97C\\uA980-\\uA9C0\\uA9CF-\\uA9D9\\uA9E0-\\uA9FE\\uAA00-\\uAA36\\uAA40-\\uAA4D\\uAA50-\\uAA59\\uAA60-\\uAA76\\uAA7A-\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEF\\uAAF2-\\uAAF6\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uAB30-\\uAB5A\\uAB5C-\\uAB5F\\uAB64\\uAB65\\uABC0-\\uABEA\\uABEC\\uABED\\uABF0-\\uABF9\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE00-\\uFE0F\\uFE20-\\uFE2D\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF10-\\uFF19\\uFF21-\\uFF3A\\uFF3F\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]");

    function af(e, t) {
        if (!e) throw new Error("ASSERT: " + t)
    }

    function sf(e) {
        return e >= 48 && e <= 57
    }

    function cf(e) {
        return "0123456789abcdefABCDEF".indexOf(e) >= 0
    }

    function uf(e) {
        return "01234567".indexOf(e) >= 0
    }

    function lf(e) {
        return 32 === e || 9 === e || 11 === e || 12 === e || 160 === e || e >= 5760 && [5760, 6158, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8239, 8287, 12288, 65279].indexOf(e) >= 0
    }

    function ff(e) {
        return 10 === e || 13 === e || 8232 === e || 8233 === e
    }

    function df(e) {
        return 36 === e || 95 === e || e >= 65 && e <= 90 || e >= 97 && e <= 122 || 92 === e || e >= 128 && of.test(String.fromCharCode(e))
    }

    function pf(e) {
        return 36 === e || 95 === e || e >= 65 && e <= 90 || e >= 97 && e <= 122 || e >= 48 && e <= 57 || 92 === e || e >= 128 && rf.test(String.fromCharCode(e))
    }

    const mf = {
        if: 1,
        in: 1,
        do: 1,
        var: 1,
        for: 1,
        new: 1,
        try: 1,
        let: 1,
        this: 1,
        else: 1,
        case: 1,
        void: 1,
        with: 1,
        enum: 1,
        while: 1,
        break: 1,
        catch: 1,
        throw: 1,
        const: 1,
        yield: 1,
        class: 1,
        super: 1,
        return: 1,
        typeof: 1,
        delete: 1,
        switch: 1,
        export: 1,
        import: 1,
        public: 1,
        static: 1,
        default: 1,
        finally: 1,
        extends: 1,
        package: 1,
        private: 1,
        function: 1,
        continue: 1,
        debugger: 1,
        interface: 1,
        protected: 1,
        instanceof: 1,
        implements: 1
    };

    function hf() {
        for (; Yl < Jl;) {
            const e = Vl.charCodeAt(Yl);
            if (!lf(e) && !ff(e)) break;
            ++Yl
        }
    }

    function gf(e) {
        var t, n, i, o = 0;
        for (n = "u" === e ? 4 : 2, t = 0; t < n; ++t) Yl < Jl && cf(Vl[Yl]) ? (i = Vl[Yl++], o = 16 * o + "0123456789abcdef".indexOf(i.toLowerCase())) : Of({}, $l, tf);
        return String.fromCharCode(o)
    }

    function vf() {
        var e, t, n, i;
        for (t = 0, "}" === (e = Vl[Yl]) && Of({}, $l, tf); Yl < Jl && cf(e = Vl[Yl++]);) t = 16 * t + "0123456789abcdef".indexOf(e.toLowerCase());
        return (t > 1114111 || "}" !== e) && Of({}, $l, tf), t <= 65535 ? String.fromCharCode(t) : (n = 55296 + (t - 65536 >> 10), i = 56320 + (t - 65536 & 1023), String.fromCharCode(n, i))
    }

    function yf() {
        var e, t;
        for (e = Vl.charCodeAt(Yl++), t = String.fromCharCode(e), 92 === e && (117 !== Vl.charCodeAt(Yl) && Of({}, $l, tf), ++Yl, (e = gf("u")) && "\\" !== e && df(e.charCodeAt(0)) || Of({}, $l, tf), t = e); Yl < Jl && pf(e = Vl.charCodeAt(Yl));) ++Yl, t += String.fromCharCode(e), 92 === e && (t = t.substr(0, t.length - 1), 117 !== Vl.charCodeAt(Yl) && Of({}, $l, tf), ++Yl, (e = gf("u")) && "\\" !== e && pf(e.charCodeAt(0)) || Of({}, $l, tf), t += e);
        return t
    }

    function bf() {
        var e, t;
        return e = Yl, {
            type: 1 === (t = 92 === Vl.charCodeAt(Yl) ? yf() : function () {
                var e, t;
                for (e = Yl++; Yl < Jl;) {
                    if (92 === (t = Vl.charCodeAt(Yl))) return Yl = e, yf();
                    if (!pf(t)) break;
                    ++Yl
                }
                return Vl.slice(e, Yl)
            }()).length ? 3 : mf.hasOwnProperty(t) ? 4 : "null" === t ? 5 : "true" === t || "false" === t ? 1 : 3,
            value: t,
            start: e,
            end: Yl
        }
    }

    function xf() {
        var e, t, n, i, o = Yl, r = Vl.charCodeAt(Yl), a = Vl[Yl];
        switch (r) {
            case 46:
            case 40:
            case 41:
            case 59:
            case 44:
            case 123:
            case 125:
            case 91:
            case 93:
            case 58:
            case 63:
            case 126:
                return ++Yl, {type: 7, value: String.fromCharCode(r), start: o, end: Yl};
            default:
                if (61 === (e = Vl.charCodeAt(Yl + 1))) switch (r) {
                    case 43:
                    case 45:
                    case 47:
                    case 60:
                    case 62:
                    case 94:
                    case 124:
                    case 37:
                    case 38:
                    case 42:
                        return Yl += 2, {
                            type: 7,
                            value: String.fromCharCode(r) + String.fromCharCode(e),
                            start: o,
                            end: Yl
                        };
                    case 33:
                    case 61:
                        return Yl += 2, 61 === Vl.charCodeAt(Yl) && ++Yl, {
                            type: 7,
                            value: Vl.slice(o, Yl),
                            start: o,
                            end: Yl
                        }
                }
        }
        return ">>>=" === (i = Vl.substr(Yl, 4)) ? {
            type: 7,
            value: i,
            start: o,
            end: Yl += 4
        } : ">>>" === (n = i.substr(0, 3)) || "<<=" === n || ">>=" === n ? {
            type: 7,
            value: n,
            start: o,
            end: Yl += 3
        } : a === (t = n.substr(0, 2))[1] && "+-<>&|".indexOf(a) >= 0 || "=>" === t ? {
            type: 7,
            value: t,
            start: o,
            end: Yl += 2
        } : "<>=!+-*%&|^/".indexOf(a) >= 0 ? {type: 7, value: a, start: o, end: ++Yl} : void Of({}, $l, tf)
    }

    function wf() {
        var e, t, n;
        if (af(sf((n = Vl[Yl]).charCodeAt(0)) || "." === n, "Numeric literal must start with a decimal digit or a decimal point"), t = Yl, e = "", "." !== n) {
            if (e = Vl[Yl++], n = Vl[Yl], "0" === e) {
                if ("x" === n || "X" === n) return ++Yl, function (e) {
                    let t = "";
                    for (; Yl < Jl && cf(Vl[Yl]);) t += Vl[Yl++];
                    return 0 === t.length && Of({}, $l, tf), df(Vl.charCodeAt(Yl)) && Of({}, $l, tf), {
                        type: 6,
                        value: parseInt("0x" + t, 16),
                        start: e,
                        end: Yl
                    }
                }(t);
                if (uf(n)) return function (e) {
                    let t = "0" + Vl[Yl++];
                    for (; Yl < Jl && uf(Vl[Yl]);) t += Vl[Yl++];
                    return (df(Vl.charCodeAt(Yl)) || sf(Vl.charCodeAt(Yl))) && Of({}, $l, tf), {
                        type: 6,
                        value: parseInt(t, 8),
                        octal: !0,
                        start: e,
                        end: Yl
                    }
                }(t);
                n && sf(n.charCodeAt(0)) && Of({}, $l, tf)
            }
            for (; sf(Vl.charCodeAt(Yl));) e += Vl[Yl++];
            n = Vl[Yl]
        }
        if ("." === n) {
            for (e += Vl[Yl++]; sf(Vl.charCodeAt(Yl));) e += Vl[Yl++];
            n = Vl[Yl]
        }
        if ("e" === n || "E" === n) if (e += Vl[Yl++], "+" !== (n = Vl[Yl]) && "-" !== n || (e += Vl[Yl++]), sf(Vl.charCodeAt(Yl))) for (; sf(Vl.charCodeAt(Yl));) e += Vl[Yl++]; else Of({}, $l, tf);
        return df(Vl.charCodeAt(Yl)) && Of({}, $l, tf), {type: 6, value: parseFloat(e), start: t, end: Yl}
    }

    function Af() {
        var e, t, n, i;
        return Xl = null, hf(), e = Yl, t = function () {
            var e, t, n, i;
            for (af("/" === (e = Vl[Yl]), "Regular expression literal must start with a slash"), t = Vl[Yl++], n = !1, i = !1; Yl < Jl;) if (t += e = Vl[Yl++], "\\" === e) ff((e = Vl[Yl++]).charCodeAt(0)) && Of({}, Zl), t += e; else if (ff(e.charCodeAt(0))) Of({}, Zl); else if (n) "]" === e && (n = !1); else {
                if ("/" === e) {
                    i = !0;
                    break
                }
                "[" === e && (n = !0)
            }
            return i || Of({}, Zl), {value: t.substr(1, t.length - 2), literal: t}
        }(), n = function () {
            var e, t, n;
            for (t = "", n = ""; Yl < Jl && pf((e = Vl[Yl]).charCodeAt(0));) ++Yl, "\\" === e && Yl < Jl ? Of({}, $l, tf) : (n += e, t += e);
            return n.search(/[^gimuy]/g) >= 0 && Of({}, Kl, n), {value: n, literal: t}
        }(), i = function (e, t) {
            let n = e;
            t.indexOf("u") >= 0 && (n = n.replace(/\\u\{([0-9a-fA-F]+)\}/g, ((e, t) => {
                if (parseInt(t, 16) <= 1114111) return "x";
                Of({}, Kl)
            })).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "x"));
            try {
                new RegExp(n)
            } catch (e) {
                Of({}, Kl)
            }
            try {
                return new RegExp(e, t)
            } catch (e) {
                return null
            }
        }(t.value, n.value), {
            literal: t.literal + n.literal,
            value: i,
            regex: {pattern: t.value, flags: n.value},
            start: e,
            end: Yl
        }
    }

    function Df() {
        if (hf(), Yl >= Jl) return {type: 2, start: Yl, end: Yl};
        const e = Vl.charCodeAt(Yl);
        return df(e) ? bf() : 40 === e || 41 === e || 59 === e ? xf() : 39 === e || 34 === e ? function () {
            var e, t, n, i, o = "", r = !1;
            for (af("'" === (e = Vl[Yl]) || '"' === e, "String literal must starts with a quote"), t = Yl, ++Yl; Yl < Jl;) {
                if ((n = Vl[Yl++]) === e) {
                    e = "";
                    break
                }
                if ("\\" === n) if ((n = Vl[Yl++]) && ff(n.charCodeAt(0))) "\r" === n && "\n" === Vl[Yl] && ++Yl; else switch (n) {
                    case"u":
                    case"x":
                        "{" === Vl[Yl] ? (++Yl, o += vf()) : o += gf(n);
                        break;
                    case"n":
                        o += "\n";
                        break;
                    case"r":
                        o += "\r";
                        break;
                    case"t":
                        o += "\t";
                        break;
                    case"b":
                        o += "\b";
                        break;
                    case"f":
                        o += "\f";
                        break;
                    case"v":
                        o += "\v";
                        break;
                    default:
                        uf(n) ? (0 !== (i = "01234567".indexOf(n)) && (r = !0), Yl < Jl && uf(Vl[Yl]) && (r = !0, i = 8 * i + "01234567".indexOf(Vl[Yl++]), "0123".indexOf(n) >= 0 && Yl < Jl && uf(Vl[Yl]) && (i = 8 * i + "01234567".indexOf(Vl[Yl++]))), o += String.fromCharCode(i)) : o += n
                } else {
                    if (ff(n.charCodeAt(0))) break;
                    o += n
                }
            }
            return "" !== e && Of({}, $l, tf), {type: 8, value: o, octal: r, start: t, end: Yl}
        }() : 46 === e ? sf(Vl.charCodeAt(Yl + 1)) ? wf() : xf() : sf(e) ? wf() : xf()
    }

    function Ff() {
        const e = Xl;
        return Yl = e.end, Xl = Df(), Yl = e.end, e
    }

    function kf() {
        const e = Yl;
        Xl = Df(), Yl = e
    }

    function Cf(e, t, n) {
        const i = new Hl("||" === e || "&&" === e ? "LogicalExpression" : "BinaryExpression");
        return i.operator = e, i.left = t, i.right = n, i
    }

    function Ef(e, t) {
        const n = new Hl("CallExpression");
        return n.callee = e, n.arguments = t, n
    }

    function Sf(e) {
        const t = new Hl(Ql);
        return t.name = e, t
    }

    function Bf(e) {
        const t = new Hl("Literal");
        return t.value = e.value, t.raw = Vl.slice(e.start, e.end), e.regex && ("//" === t.raw && (t.raw = "/(?:)/"), t.regex = e.regex), t
    }

    function _f(e, t, n) {
        const i = new Hl("MemberExpression");
        return i.computed = "[" === e, i.object = t, i.property = n, i.computed || (n.member = !0), i
    }

    function zf(e, t, n) {
        const i = new Hl("Property");
        return i.key = t, i.value = n, i.kind = e, i
    }

    function Of(e, t) {
        var n, i = Array.prototype.slice.call(arguments, 2),
            o = t.replace(/%(\d)/g, ((e, t) => (af(t < i.length, "Message reference must be in range"), i[t])));
        throw(n = new Error(o)).index = Yl, n.description = o, n
    }

    function Nf(e) {
        2 === e.type && Of(e, "Unexpected end of input"), 6 === e.type && Of(e, "Unexpected number"), 8 === e.type && Of(e, "Unexpected string"), 3 === e.type && Of(e, "Unexpected identifier"), 4 === e.type && Of(e, "Unexpected reserved word"), Of(e, $l, e.value)
    }

    function Pf(e) {
        const t = Ff();
        7 === t.type && t.value === e || Nf(t)
    }

    function jf(e) {
        return 7 === Xl.type && Xl.value === e
    }

    function Mf(e) {
        return 4 === Xl.type && Xl.value === e
    }

    function Tf() {
        const e = [];
        for (Yl = Xl.start, Pf("["); !jf("]");) jf(",") ? (Ff(), e.push(null)) : (e.push(Xf()), jf("]") || Pf(","));
        return Ff(), function (e) {
            const t = new Hl("ArrayExpression");
            return t.elements = e, t
        }(e)
    }

    function Lf() {
        Yl = Xl.start;
        const e = Ff();
        return 8 === e.type || 6 === e.type ? (e.octal && Of(e, ef), Bf(e)) : Sf(e.value)
    }

    function qf() {
        var e, t, n;
        return Yl = Xl.start, 3 === (e = Xl).type ? (n = Lf(), Pf(":"), zf("init", n, Xf())) : 2 !== e.type && 7 !== e.type ? (t = Lf(), Pf(":"), zf("init", t, Xf())) : void Nf(e)
    }

    function Rf() {
        var e, t, n = [], i = {}, o = String;
        for (Yl = Xl.start, Pf("{"); !jf("}");) t = "$" + ((e = qf()).key.type === Ql ? e.key.name : o(e.key.value)), Object.prototype.hasOwnProperty.call(i, t) ? Of({}, "Duplicate data property in object literal not allowed in strict mode") : i[t] = !0, n.push(e), jf("}") || Pf(",");
        return Pf("}"), function (e) {
            const t = new Hl("ObjectExpression");
            return t.properties = e, t
        }(n)
    }

    const Wf = {if: 1};

    function Uf() {
        var e, t, n;
        if (jf("(")) return function () {
            Pf("(");
            const e = Qf();
            return Pf(")"), e
        }();
        if (jf("[")) return Tf();
        if (jf("{")) return Rf();
        if (e = Xl.type, Yl = Xl.start, 3 === e || Wf[Xl.value]) n = Sf(Ff().value); else if (8 === e || 6 === e) Xl.octal && Of(Xl, ef), n = Bf(Ff()); else {
            if (4 === e) throw new Error(nf);
            1 === e ? ((t = Ff()).value = "true" === t.value, n = Bf(t)) : 5 === e ? ((t = Ff()).value = null, n = Bf(t)) : jf("/") || jf("/=") ? (n = Bf(Af()), kf()) : Nf(Ff())
        }
        return n
    }

    function If() {
        const e = [];
        if (Pf("("), !jf(")")) for (; Yl < Jl && (e.push(Xf()), !jf(")"));) Pf(",");
        return Pf(")"), e
    }

    function Hf() {
        return Pf("."), function () {
            Yl = Xl.start;
            const e = Ff();
            return function (e) {
                return 3 === e.type || 4 === e.type || 1 === e.type || 5 === e.type
            }(e) || Nf(e), Sf(e.value)
        }()
    }

    function Gf() {
        Pf("[");
        const e = Qf();
        return Pf("]"), e
    }

    function Vf() {
        const e = function () {
            var e;
            for (e = Uf(); ;) if (jf(".")) e = _f(".", e, Hf()); else if (jf("(")) e = Ef(e, If()); else {
                if (!jf("[")) break;
                e = _f("[", e, Gf())
            }
            return e
        }();
        if (7 === Xl.type && (jf("++") || jf("--"))) throw new Error(nf);
        return e
    }

    function Yf() {
        var e, t;
        if (7 !== Xl.type && 4 !== Xl.type) t = Vf(); else {
            if (jf("++") || jf("--")) throw new Error(nf);
            if (jf("+") || jf("-") || jf("~") || jf("!")) e = Ff(), t = Yf(), t = function (e, t) {
                const n = new Hl("UnaryExpression");
                return n.operator = e, n.argument = t, n.prefix = !0, n
            }(e.value, t); else {
                if (Mf("delete") || Mf("void") || Mf("typeof")) throw new Error(nf);
                t = Vf()
            }
        }
        return t
    }

    function Jf(e) {
        let t = 0;
        if (7 !== e.type && 4 !== e.type) return 0;
        switch (e.value) {
            case"||":
                t = 1;
                break;
            case"&&":
                t = 2;
                break;
            case"|":
                t = 3;
                break;
            case"^":
                t = 4;
                break;
            case"&":
                t = 5;
                break;
            case"==":
            case"!=":
            case"===":
            case"!==":
                t = 6;
                break;
            case"<":
            case">":
            case"<=":
            case">=":
            case"instanceof":
            case"in":
                t = 7;
                break;
            case"<<":
            case">>":
            case">>>":
                t = 8;
                break;
            case"+":
            case"-":
                t = 9;
                break;
            case"*":
            case"/":
            case"%":
                t = 11
        }
        return t
    }

    function Xf() {
        var e, t;
        return e = function () {
            var e, t, n, i, o, r, a, s, c, u;
            if (e = Xl, c = Yf(), 0 === (o = Jf(i = Xl))) return c;
            for (i.prec = o, Ff(), t = [e, Xl], r = [c, i, a = Yf()]; (o = Jf(Xl)) > 0;) {
                for (; r.length > 2 && o <= r[r.length - 2].prec;) a = r.pop(), s = r.pop().value, c = r.pop(), t.pop(), n = Cf(s, c, a), r.push(n);
                (i = Ff()).prec = o, r.push(i), t.push(Xl), n = Yf(), r.push(n)
            }
            for (n = r[u = r.length - 1], t.pop(); u > 1;) t.pop(), n = Cf(r[u - 1].value, r[u - 2], n), u -= 2;
            return n
        }(), jf("?") && (Ff(), t = Xf(), Pf(":"), e = function (e, t, n) {
            const i = new Hl("ConditionalExpression");
            return i.test = e, i.consequent = t, i.alternate = n, i
        }(e, t, Xf())), e
    }

    function Qf() {
        const e = Xf();
        if (jf(",")) throw new Error(nf);
        return e
    }

    function $f(e) {
        const t = [];
        return "Identifier" === e.type ? [e.name] : "Literal" === e.type ? [e.value] : ("MemberExpression" === e.type && (t.push(...$f(e.object)), t.push(...$f(e.property))), t)
    }

    function Kf(e) {
        return "MemberExpression" === e.object.type ? Kf(e.object) : "datum" === e.object.name
    }

    function Zf(e) {
        const t = function (e) {
            Yl = 0, Jl = (Vl = e).length, Xl = null, kf();
            const t = Qf();
            if (2 !== Xl.type) throw new Error("Unexpect token after expression.");
            return t
        }(e), n = new Set;
        return t.visit((e => {
            "MemberExpression" === e.type && Kf(e) && n.add($f(e).slice(1).join("."))
        })), n
    }

    class ed extends Hu {
        clone() {
            return new ed(null, this.model, z(this.filter))
        }

        constructor(e, t, n) {
            super(e), this.model = t, this.filter = n, Bn(this, "expr", void 0), Bn(this, "_dependentFields", void 0), this.expr = id(this.model, this.filter, this), this._dependentFields = Zf(this.expr)
        }

        dependentFields() {
            return this._dependentFields
        }

        producedFields() {
            return new Set
        }

        assemble() {
            return {type: "filter", expr: this.expr}
        }

        hash() {
            return "Filter ".concat(this.expr)
        }
    }

    function td(e, t, n, i = "datum") {
        const o = [];
        const r = Z(t, (function (t) {
            const r = K(t), a = e.getSelectionComponent(r, t), s = w(r + Fl);
            if (a.project.timeUnit) {
                const t = null != n ? n : e.component.data.raw, i = a.project.timeUnit.clone();
                t.parent ? i.insertAsParentOf(t) : t.parent = i
            }
            return "none" !== a.empty && o.push(s), "vlSelectionTest(".concat(s, ", ").concat(i) + ("global" === a.resolve ? ")" : ", ".concat(w(a.resolve), ")"))
        }));
        return (o.length ? "!(" + o.map((e => "length(data(".concat(e, "))"))).join(" || ") + ") || " : "") + "(".concat(r, ")")
    }

    function nd(e, t) {
        const n = t.encoding;
        let i = t.field;
        if (n || i) {
            if (n && !i) {
                const o = e.project.items.filter((e => e.channel === n));
                !o.length || o.length > 1 ? (i = e.project.items[0].field, si((o.length ? "Multiple " : "No ") + "matching ".concat(w(n), " encoding found for selection ").concat(w(t.selection), ". ") + 'Using "field": '.concat(w(i), "."))) : i = o[0].field
            }
        } else i = e.project.items[0].field, e.project.items.length > 1 && si('A "field" or "encoding" must be specified when using a selection as a scale domain. ' + 'Using "field": '.concat(w(i), "."));
        return "".concat(e.name, "[").concat(w(i), "]")
    }

    function id(e, t, n) {
        return Z(t, (t => x(t) ? t : function (e) {
            return null == e ? void 0 : e.selection
        }(t) ? td(e, t.selection, n) : qi(t)))
    }

    function od(e, t, n, i) {
        var o, r, a;
        e.encode = null !== (o = e.encode) && void 0 !== o ? o : {}, e.encode[t] = null !== (r = e.encode[t]) && void 0 !== r ? r : {}, e.encode[t].update = null !== (a = e.encode[t].update) && void 0 !== a ? a : {}, e.encode[t].update[n] = i
    }

    function rd(e, t, n, i = {header: !1}) {
        const {disable: o, orient: r, scale: a, labelExpr: s, title: c, zindex: l, ...f} = e.combine();
        if (!o) {
            for (const e in f) {
                const n = be[e], i = f[e];
                if (n && n !== t && "both" !== n) delete f[e]; else if (ve(i)) {
                    const {condition: t, ...n} = i, o = h(t), r = ge[e];
                    if (r) {
                        const {vgProp: t, part: i} = r;
                        od(f, i, t, [...o.map((e => {
                            const {test: t, ...n} = e;
                            return {test: id(null, t), ...n}
                        })), n]), delete f[e]
                    } else if (null === r) {
                        const t = {
                            signal: o.map((e => {
                                const {test: t, ...n} = e;
                                return "".concat(id(null, t), " ? ").concat(ka(n), " : ")
                            })).join("") + ka(n)
                        };
                        f[e] = t
                    }
                } else if (Fi(i)) {
                    const t = ge[e];
                    if (t) {
                        const {vgProp: n, part: o} = t;
                        od(f, o, n, i), delete f[e]
                    }
                }
            }
            if ("grid" === t) {
                if (!f.grid) return;
                if (f.encode) {
                    const {grid: e} = f.encode;
                    f.encode = {...e ? {grid: e} : {}}, Y(f.encode) && delete f.encode
                }
                return {
                    scale: a,
                    orient: r, ...f,
                    domain: !1,
                    labels: !1,
                    aria: !1,
                    maxExtent: 0,
                    minExtent: 0,
                    ticks: !1,
                    zindex: ue(l, 0)
                }
            }
            {
                if (!i.header && e.mainExtracted) return;
                if (void 0 !== s) {
                    var d, p;
                    let e = s;
                    (null === (d = f.encode) || void 0 === d || null === (p = d.labels) || void 0 === p ? void 0 : p.update) && Fi(f.encode.labels.update.text) && (e = ae(s, "datum.label", f.encode.labels.update.text.signal)), od(f, "labels", "text", {signal: e})
                }
                if (null === f.labelAlign && delete f.labelAlign, f.encode) {
                    for (const t of ye) e.hasAxisPart(t) || delete f.encode[t];
                    Y(f.encode) && delete f.encode
                }
                const t = function (e, t) {
                    if (e) return u(e) && !xa(e) ? e.map((e => aa(e, t))).join(", ") : e
                }(c, n);
                return {
                    scale: a,
                    orient: r,
                    grid: !1, ...t ? {title: t} : {}, ...f, ...!1 === n.aria ? {aria: !1} : {},
                    zindex: ue(l, 0)
                }
            }
        }
    }

    function ad(e) {
        const {axes: t} = e.component, n = [];
        for (const i of Zt) if (t[i]) for (const o of t[i]) if (!o.get("disable") && !o.get("gridScale")) {
            const t = "x" === i ? "height" : "width", o = e.getSizeSignalRef(t).signal;
            t !== o && n.push({name: t, update: o})
        }
        return n
    }

    function sd(e, t, n, i) {
        return Object.assign.apply(null, [{}, ...e.map((e => {
            if ("axisOrient" === e) {
                const e = "x" === n ? "bottom" : "left", o = t["x" === n ? "axisBottom" : "axisLeft"] || {},
                    r = t["x" === n ? "axisTop" : "axisRight"] || {}, a = new Set([...J(o), ...J(r)]), s = {};
                for (const t of a.values()) s[t] = {signal: "".concat(i.signal, ' === "').concat(e, '" ? ').concat(Ca(o[t]), " : ").concat(Ca(r[t]))};
                return s
            }
            return t[e]
        }))])
    }

    function cd(e, t, n, i) {
        const o = "band" === t ? ["axisDiscrete", "axisBand"] : "point" === t ? ["axisDiscrete", "axisPoint"] : function (e) {
                return e in fo
            }(t) ? ["axisQuantitative"] : "time" === t || "utc" === t ? ["axisTemporal"] : [],
            r = "x" === e ? "axisX" : "axisY", a = Fi(n) ? "axisOrient" : "axis" + te(n),
            s = [...o, ...o.map((e => r + e.substr(4)))], c = ["axis", a, r];
        return {vlOnlyAxisConfig: sd(s, i, e, n), vgAxisConfig: sd(c, i, e, n), axisConfigStyle: ud([...c, ...s], i)}
    }

    function ud(e, t) {
        const n = [{}];
        for (const o of e) {
            var i;
            let e = null === (i = t[o]) || void 0 === i ? void 0 : i.style;
            if (e) {
                e = h(e);
                for (const i of e) n.push(t.style[i])
            }
        }
        return Object.assign.apply(null, n)
    }

    function ld(e, t, n, i = {}) {
        const o = Oa(e, n, t);
        if (void 0 !== o) return {configFrom: "style", configValue: o};
        for (const t of ["vlOnlyAxisConfig", "vgAxisConfig", "axisConfigStyle"]) {
            var r;
            if (void 0 !== (null === (r = i[t]) || void 0 === r ? void 0 : r[e])) return {
                configFrom: t,
                configValue: i[t][e]
            }
        }
        return {}
    }

    const fd = {
        scale: ({model: e, channel: t}) => e.scaleName(t),
        format: ({fieldOrDatumDef: e, config: t, axis: n}) => {
            const {format: i, formatType: o} = n;
            return vr(e, e.type, i, o, t, !0)
        },
        formatType: ({axis: e, fieldOrDatumDef: t, scaleType: n}) => {
            const {formatType: i} = e;
            return yr(i, t, n)
        },
        grid: ({fieldOrDatumDef: e, axis: t, scaleType: n}) => {
            return (!qr(e) || !kn(e.bin)) && (null !== (i = t.grid) && void 0 !== i ? i : function (e, t) {
                return !go(e) && qr(t) && !Fn(null == t ? void 0 : t.bin)
            }(n, e));
            var i
        },
        gridScale: ({model: e, channel: t}) => function (e, t) {
            const n = "x" === t ? "y" : "x";
            if (e.getScaleComponent(n)) return e.scaleName(n);
            return
        }(e, t),
        labelAlign: ({axis: e, labelAngle: t, orient: n, channel: i}) => e.labelAlign || md(t, n, i),
        labelAngle: ({labelAngle: e}) => e,
        labelBaseline: ({axis: e, labelAngle: t, orient: n, channel: i}) => e.labelBaseline || pd(t, n, i),
        labelFlush: ({axis: e, fieldOrDatumDef: t, channel: n}) => {
            var i;
            return null !== (i = e.labelFlush) && void 0 !== i ? i : function (e, t) {
                if ("x" === t && T(["quantitative", "temporal"], e)) return !0;
                return
            }(t.type, n)
        },
        labelOverlap: ({axis: e, fieldOrDatumDef: t, scaleType: n}) => {
            var i;
            return null !== (i = e.labelOverlap) && void 0 !== i ? i : function (e, t, n, i) {
                if (n && !l(i) || "nominal" !== e && "ordinal" !== e) return "log" !== t && "symlog" !== t || "greedy";
                return
            }(t.type, n, qr(t) && !!t.timeUnit, qr(t) ? t.sort : void 0)
        },
        orient: ({orient: e}) => e,
        tickCount: ({channel: e, model: t, axis: n, fieldOrDatumDef: i, scaleType: o}) => {
            var r;
            const a = "x" === e ? "width" : "y" === e ? "height" : void 0, s = a ? t.getSizeSignalRef(a) : void 0;
            return null !== (r = n.tickCount) && void 0 !== r ? r : function ({fieldOrDatumDef: e, scaleType: t, size: n, values: i}) {
                if (!i && !go(t) && "log" !== t) {
                    if (qr(e)) {
                        var o;
                        if (Fn(e.bin)) return {signal: "ceil(".concat(n.signal, "/10)")};
                        if (e.timeUnit && T(["month", "hours", "day", "quarter"], null === (o = Di(e.timeUnit)) || void 0 === o ? void 0 : o.unit)) return
                    }
                    return {signal: "ceil(".concat(n.signal, "/40)")}
                }
                return
            }({fieldOrDatumDef: i, scaleType: o, size: s, values: n.values})
        },
        title: ({axis: e, model: t, channel: n}) => {
            if (void 0 !== e.title) return e.title;
            const i = hd(t, n);
            if (void 0 !== i) return i;
            const o = t.typedFieldDef(n), r = "x" === n ? "x2" : "y2", a = t.fieldDef(r);
            return Pa(o ? [Or(o)] : [], qr(a) ? [Or(a)] : [])
        },
        values: ({axis: e, fieldOrDatumDef: t}) => function (e, t) {
            const n = e.values;
            if (u(n)) return va(t, n);
            if (Fi(n)) return n;
            return
        }(e, t),
        zindex: ({axis: e, fieldOrDatumDef: t, mark: n}) => {
            var i;
            return null !== (i = e.zindex) && void 0 !== i ? i : function (e, t) {
                if ("rect" === e && Zr(t)) return 1;
                return 0
            }(n, t)
        }
    };

    function dd(e) {
        return "(((".concat(e.signal, " % 360) + 360) % 360)")
    }

    function pd(e, t, n, i) {
        if (void 0 !== e) {
            if ("x" === n) {
                if (Fi(e)) {
                    const n = dd(e), i = Fi(t) ? "(".concat(t.signal, ' === "top")') : "top" === t;
                    return {signal: "(45 < ".concat(n, " && ").concat(n, " < 135) || (225 < ").concat(n, " && ").concat(n, ' < 315) ? "middle" :') + "(".concat(n, " <= 45 || 315 <= ").concat(n, ") === ").concat(i, ' ? "bottom" : "top"')}
                }
                if (45 < e && e < 135 || 225 < e && e < 315) return "middle";
                if (Fi(t)) {
                    const n = e <= 45 || 315 <= e ? "===" : "!==";
                    return {signal: "".concat(t.signal, " ").concat(n, ' "top" ? "bottom" : "top"')}
                }
                return (e <= 45 || 315 <= e) == ("top" === t) ? "bottom" : "top"
            }
            if (Fi(e)) {
                const n = dd(e), o = Fi(t) ? "(".concat(t.signal, ' === "left")') : "left" === t,
                    r = i ? '"middle"' : "null";
                return {signal: "".concat(n, " <= 45 || 315 <= ").concat(n, " || (135 <= ").concat(n, " && ").concat(n, " <= 225) ? ").concat(r, " : (45 <= ").concat(n, " && ").concat(n, " <= 135) === ").concat(o, ' ? "top" : "bottom"')}
            }
            if (e <= 45 || 315 <= e || 135 <= e && e <= 225) return i ? "middle" : null;
            if (Fi(t)) {
                const n = 45 <= e && e <= 135 ? "===" : "!==";
                return {signal: "".concat(t.signal, " ").concat(n, ' "left" ? "top" : "bottom"')}
            }
            return (45 <= e && e <= 135) == ("left" === t) ? "top" : "bottom"
        }
    }

    function md(e, t, n) {
        if (void 0 === e) return;
        const i = "x" === n, o = i ? 0 : 90, r = i ? "bottom" : "left";
        if (Fi(e)) {
            const n = dd(e), a = Fi(t) ? "(".concat(t.signal, ' === "').concat(r, '")') : t === r;
            return {signal: "(".concat(o ? "(" + n + " + 90)" : n, " % 180 === 0) ? ").concat(i ? null : '"center"', " :") + "(".concat(o, " < ").concat(n, " && ").concat(n, " < ").concat(180 + o, ") === ").concat(a, ' ? "left" : "right"')}
        }
        if ((e + o) % 180 == 0) return i ? null : "center";
        if (Fi(t)) {
            const n = o < e && e < 180 + o ? "===" : "!==", i = "".concat(t.signal, " ").concat(n, ' "').concat(r, '"');
            return {signal: "".concat(i, ' ? "left" : "right"')}
        }
        return (o < e && e < 180 + o) == (t === r) ? "left" : "right"
    }

    function hd(e, t) {
        const n = "x" === t ? "x2" : "y2", i = e.fieldDef(t), o = e.fieldDef(n), r = i ? i.title : void 0,
            a = o ? o.title : void 0;
        return r && a ? ja(r, a) : r || (a || (void 0 !== r ? r : void 0 !== a ? a : void 0))
    }

    class gd extends Hu {
        clone() {
            return new gd(null, z(this.transform))
        }

        constructor(e, t) {
            super(e), this.transform = t, Bn(this, "_dependentFields", void 0), this._dependentFields = Zf(this.transform.calculate)
        }

        static parseAllForSortIndex(e, t) {
            return t.forEachFieldDef(((t, n) => {
                if (Yr(t) && Sr(t.sort)) {
                    const {field: i, timeUnit: o} = t, r = t.sort, a = r.map(((e, t) => "".concat(qi({
                        field: i,
                        timeUnit: o,
                        equal: e
                    }), " ? ").concat(t, " : "))).join("") + r.length;
                    e = new gd(e, {calculate: a, as: vd(t, n, {forAs: !0})})
                }
            })), e
        }

        producedFields() {
            return new Set([this.transform.as])
        }

        dependentFields() {
            return this._dependentFields
        }

        assemble() {
            return {type: "formula", expr: this.transform.calculate, as: this.transform.as}
        }

        hash() {
            return "Calculate ".concat(j(this.transform))
        }
    }

    function vd(e, t, n) {
        return Kr(e, {prefix: t, suffix: "sort_index", ...null != n ? n : {}})
    }

    function yd(e, t) {
        return T(["top", "bottom"], t) ? "column" : T(["left", "right"], t) || "row" === e ? "row" : "column"
    }

    function bd(e, t, n, i) {
        const o = "row" === i ? n.headerRow : "column" === i ? n.headerColumn : n.headerFacet;
        return ue((t || {})[e], o[e], n.header[e])
    }

    function xd(e, t, n, i) {
        const o = {};
        for (const r of e) {
            const e = bd(r, t || {}, n, i);
            void 0 !== e && (o[r] = e)
        }
        return o
    }

    const wd = ["row", "column"], Ad = ["header", "footer"];

    function Dd(e, t) {
        const n = e.component.layoutHeaders[t].title, i = e.config ? e.config : void 0,
            o = e.component.layoutHeaders[t].facetFieldDef ? e.component.layoutHeaders[t].facetFieldDef : void 0, {titleAnchor: r, titleAngle: a, titleOrient: s} = xd(["titleAnchor", "titleAngle", "titleOrient"], o.header, i, t),
            c = yd(t, s), u = me(a);
        return {
            name: "".concat(t, "-title"),
            type: "group",
            role: "".concat(c, "-title"),
            title: {
                text: n, ..."row" === t ? {orient: "left"} : {},
                style: "guide-title", ...kd(u, c), ...Fd(c, u, r), ...Od(i, o, t, ys, gs)
            }
        }
    }

    function Fd(e, t, n = "middle") {
        switch (n) {
            case"start":
                return {align: "left"};
            case"end":
                return {align: "right"}
        }
        const i = md(t, "row" === e ? "left" : "top", "row" === e ? "y" : "x");
        return i ? {align: i} : {}
    }

    function kd(e, t) {
        const n = pd(e, "row" === t ? "left" : "top", "row" === t ? "y" : "x", !0);
        return n ? {baseline: n} : {}
    }

    function Cd(e, t) {
        const n = e.component.layoutHeaders[t], i = [];
        for (const o of Ad) if (n[o]) for (const r of n[o]) {
            const a = Bd(e, t, o, n, r);
            null != a && i.push(a)
        }
        return i
    }

    function Ed(e, t) {
        const {sort: n} = e;
        var i;
        return Er(n) ? {
            field: Kr(n, {expr: "datum"}),
            order: null !== (i = n.order) && void 0 !== i ? i : "ascending"
        } : u(n) ? {field: vd(e, t, {expr: "datum"}), order: "ascending"} : {
            field: Kr(e, {expr: "datum"}),
            order: null != n ? n : "ascending"
        }
    }

    function Sd(e, t, n) {
        const {format: i, formatType: o, labelAngle: r, labelAnchor: a, labelOrient: s, labelExpr: c} = xd(["format", "formatType", "labelAngle", "labelAnchor", "labelOrient", "labelExpr"], e.header, n, t),
            u = mr({fieldOrDatumDef: e, format: i, formatType: o, expr: "parent", config: n}).signal, l = yd(t, s);
        return {
            text: {signal: c ? ae(ae(c, "datum.label", u), "datum.value", Kr(e, {expr: "parent"})) : u}, ..."row" === t ? {orient: "left"} : {},
            style: "guide-label",
            frame: "group", ...kd(r, l), ...Fd(l, r, a), ...Od(n, e, t, bs, vs)
        }
    }

    function Bd(e, t, n, i, o) {
        if (o) {
            let r = null;
            const {facetFieldDef: a} = i, s = e.config ? e.config : void 0;
            if (a && o.labels) {
                const {labelOrient: e} = xd(["labelOrient"], a.header, s, t);
                ("row" === t && !T(["top", "bottom"], e) || "column" === t && !T(["left", "right"], e)) && (r = Sd(a, t, s))
            }
            const c = Sm(e) && !Br(e.facet), u = o.axes, l = (null == u ? void 0 : u.length) > 0;
            if (r || l) {
                const s = "row" === t ? "height" : "width";
                return {
                    name: e.getName("".concat(t, "_").concat(n)),
                    type: "group",
                    role: "".concat(t, "-").concat(n), ...i.facetFieldDef ? {
                        from: {data: e.getName(t + "_domain")},
                        sort: Ed(a, t)
                    } : {}, ...l && c ? {from: {data: e.getName("facet_domain_".concat(t))}} : {}, ...r ? {title: r} : {}, ...o.sizeSignal ? {encode: {update: {[s]: o.sizeSignal}}} : {}, ...l ? {axes: u} : {}
                }
            }
        }
        return null
    }

    const _d = {column: {start: 0, end: 1}, row: {start: 1, end: 0}};

    function zd(e, t) {
        return _d[t][e]
    }

    function Od(e, t, n, i, o) {
        const r = {};
        for (const a of i) {
            if (!o[a]) continue;
            const i = bd(a, null == t ? void 0 : t.header, e, n);
            void 0 !== i && (r[o[a]] = i)
        }
        return r
    }

    function Nd(e) {
        return [...Pd(e, "width"), ...Pd(e, "height"), ...Pd(e, "childWidth"), ...Pd(e, "childHeight")]
    }

    function Pd(e, t) {
        const n = "width" === t ? "x" : "y", i = e.component.layoutSize.get(t);
        if (!i || "merged" === i) return [];
        const o = e.getSizeSignalRef(t).signal;
        if ("step" === i) {
            const t = e.getScaleComponent(n);
            if (t) {
                const i = t.get("type"), r = t.get("range");
                if (go(i) && ki(r)) {
                    const i = e.scaleName(n);
                    if (Sm(e.parent)) {
                        if ("independent" === e.parent.component.resolve.scale[n]) return [jd(i, r)]
                    }
                    return [jd(i, r), {name: o, update: Md(i, t, "domain('".concat(i, "').length"))}]
                }
            }
            throw new Error("layout size is step although width/height is not step.")
        }
        if ("container" == i) {
            const t = o.endsWith("width"), n = t ? "containerSize()[0]" : "containerSize()[1]",
                i = js(e.config.view, t ? "width" : "height"),
                r = "isFinite(".concat(n, ") ? ").concat(n, " : ").concat(i);
            return [{name: o, init: r, on: [{update: r, events: "window:resize"}]}]
        }
        return [{name: o, value: i}]
    }

    function jd(e, t) {
        return {name: e + "_step", value: t.step}
    }

    function Md(e, t, n) {
        const i = t.get("type"), o = t.get("padding"), r = ue(t.get("paddingOuter"), o);
        let a = t.get("paddingInner");
        return a = "band" === i ? void 0 !== a ? a : o : 1, "bandspace(".concat(n, ", ").concat(Ca(a), ", ").concat(Ca(r), ") * ").concat(e, "_step")
    }

    function Td(e) {
        return "childWidth" === e ? "width" : "childHeight" === e ? "height" : e
    }

    function Ld(e, t) {
        return J(e).reduce(((n, i) => {
            const o = e[i];
            return {...n, ...fu(t, o, i, (e => Fa(e.value)))}
        }), {})
    }

    function qd(e, t) {
        if (_m(t) || Sm(t)) return "shared";
        if (Bm(t)) return en(e) ? "independent" : "shared";
        throw new Error("invalid model type for resolve")
    }

    function Rd(e, t) {
        const n = e.scale[t], i = en(t) ? "axis" : "legend";
        return "independent" === n ? ("shared" === e[i][t] && si(function (e) {
            return 'Setting the scale to be independent for "'.concat(e, '" means we also have to set the guide (axis or legend) to be independent.')
        }(t)), "independent") : e[i][t] || "shared"
    }

    const Wd = J({
        aria: 1,
        clipHeight: 1,
        columnPadding: 1,
        columns: 1,
        cornerRadius: 1,
        description: 1,
        direction: 1,
        fillColor: 1,
        format: 1,
        formatType: 1,
        gradientLength: 1,
        gradientOpacity: 1,
        gradientStrokeColor: 1,
        gradientStrokeWidth: 1,
        gradientThickness: 1,
        gridAlign: 1,
        labelAlign: 1,
        labelBaseline: 1,
        labelColor: 1,
        labelFont: 1,
        labelFontSize: 1,
        labelFontStyle: 1,
        labelFontWeight: 1,
        labelLimit: 1,
        labelOffset: 1,
        labelOpacity: 1,
        labelOverlap: 1,
        labelPadding: 1,
        labelSeparation: 1,
        legendX: 1,
        legendY: 1,
        offset: 1,
        orient: 1,
        padding: 1,
        rowPadding: 1,
        strokeColor: 1,
        symbolDash: 1,
        symbolDashOffset: 1,
        symbolFillColor: 1,
        symbolLimit: 1,
        symbolOffset: 1,
        symbolOpacity: 1,
        symbolSize: 1,
        symbolStrokeColor: 1,
        symbolStrokeWidth: 1,
        symbolType: 1,
        tickCount: 1,
        tickMinStep: 1,
        title: 1,
        titleAlign: 1,
        titleAnchor: 1,
        titleBaseline: 1,
        titleColor: 1,
        titleFont: 1,
        titleFontSize: 1,
        titleFontStyle: 1,
        titleFontWeight: 1,
        titleLimit: 1,
        titleLineHeight: 1,
        titleOpacity: 1,
        titleOrient: 1,
        titlePadding: 1,
        type: 1,
        values: 1,
        zindex: 1,
        disable: 1,
        labelExpr: 1,
        selections: 1,
        opacity: 1,
        shape: 1,
        stroke: 1,
        fill: 1,
        size: 1,
        strokeWidth: 1,
        strokeDash: 1,
        encode: 1
    });

    class Ud extends Ac {
    }

    const Id = {
        symbols: function (e, {fieldOrDatumDef: t, model: n, channel: i, legendCmpt: o, legendType: r}) {
            var a, s, c, l;
            if ("symbol" !== r) return;
            const {markDef: f, encoding: d, config: p, mark: m} = n, h = f.filled && "trail" !== m;
            let g = {...Ea({}, n, Ko), ...wu(n, {filled: h})};
            const v = null !== (a = o.get("symbolOpacity")) && void 0 !== a ? a : p.legend.symbolOpacity,
                y = null !== (s = o.get("symbolFillColor")) && void 0 !== s ? s : p.legend.symbolFillColor,
                b = null !== (c = o.get("symbolStrokeColor")) && void 0 !== c ? c : p.legend.symbolStrokeColor,
                x = void 0 === v ? null !== (l = Hd(d.opacity)) && void 0 !== l ? l : f.opacity : void 0;
            if (g.fill) {
                var w;
                if ("fill" === i || h && i === Je) delete g.fill; else if (g.fill.field) if (y) delete g.fill; else g.fill = Fa(null !== (w = p.legend.symbolBaseFillColor) && void 0 !== w ? w : "black"), g.fillOpacity = Fa(null != x ? x : 1); else if (u(g.fill)) {
                    var A, D, F;
                    const e = null !== (A = null !== (D = Gd(null !== (F = d.fill) && void 0 !== F ? F : d.color)) && void 0 !== D ? D : f.fill) && void 0 !== A ? A : h && f.color;
                    e && (g.fill = Fa(e))
                }
            }
            if (g.stroke) if ("stroke" === i || !h && i === Je) delete g.stroke; else if (g.stroke.field || b) delete g.stroke; else if (u(g.stroke)) {
                const e = ue(Gd(d.stroke || d.color), f.stroke, h ? f.color : void 0);
                e && (g.stroke = {value: e})
            }
            if (i !== et) {
                const e = qr(t) && Yd(n, o, t);
                e ? g.opacity = [{test: e, ...Fa(null != x ? x : 1)}, Fa(p.legend.unselectedOpacity)] : x && (g.opacity = Fa(x))
            }
            return g = {...g, ...e}, Y(g) ? void 0 : g
        }, gradient: function (e, {model: t, legendType: n, legendCmpt: i}) {
            var o;
            if ("gradient" !== n) return;
            const {config: r, markDef: a, encoding: s} = t;
            let c = {};
            const u = void 0 === (null !== (o = i.get("gradientOpacity")) && void 0 !== o ? o : r.legend.gradientOpacity) ? Hd(s.opacity) || a.opacity : void 0;
            u && (c.opacity = Fa(u));
            return c = {...c, ...e}, Y(c) ? void 0 : c
        }, labels: function (e, {fieldOrDatumDef: t, model: n, channel: i, legendCmpt: o}) {
            const r = n.legend(i) || {}, a = n.config, s = qr(t) ? Yd(n, o, t) : void 0, c = s ? [{
                test: s,
                value: 1
            }, {value: a.legend.unselectedOpacity}] : void 0, {format: u, formatType: l} = r, f = dr(l) ? gr({
                fieldOrDatumDef: t,
                field: "datum.value",
                format: u,
                formatType: l,
                config: a
            }) : void 0, d = {...c ? {opacity: c} : {}, ...f ? {text: f} : {}, ...e};
            return Y(d) ? void 0 : d
        }, entries: function (e, {legendCmpt: t}) {
            const n = t.get("selections");
            return (null == n ? void 0 : n.length) ? {...e, fill: {value: "transparent"}} : e
        }
    };

    function Hd(e) {
        return Vd(e, ((e, t) => Math.max(e, t.value)))
    }

    function Gd(e) {
        return Vd(e, ((e, t) => ue(e, t.value)))
    }

    function Vd(e, t) {
        return function (e) {
            const t = e && e.condition;
            return !!t && (u(t) || Vr(t))
        }(e) ? h(e.condition).reduce(t, e.value) : Vr(e) ? e.value : void 0
    }

    function Yd(e, t, n) {
        const i = t.get("selections");
        if (!(null == i ? void 0 : i.length)) return;
        const o = w(n.field);
        return i.map((e => {
            const t = w(K(e) + Fl);
            return "(!length(data(".concat(t, ")) || (").concat(e, "[").concat(o, "] && indexof(").concat(e, "[").concat(o, "], datum.value) >= 0))")
        })).join(" || ")
    }

    const Jd = {
        direction: ({direction: e}) => e,
        format: ({fieldOrDatumDef: e, legend: t, config: n}) => {
            const {format: i, formatType: o} = t;
            return vr(e, e.type, i, o, n, !1)
        },
        formatType: ({legend: e, fieldOrDatumDef: t, scaleType: n}) => {
            const {formatType: i} = e;
            return yr(i, t, n)
        },
        gradientLength: e => {
            var t, n;
            const {legend: i, legendConfig: o} = e;
            return null !== (t = null !== (n = i.gradientLength) && void 0 !== n ? n : o.gradientLength) && void 0 !== t ? t : function ({legendConfig: e, model: t, direction: n, orient: i, scaleType: o}) {
                const {gradientHorizontalMaxLength: r, gradientHorizontalMinLength: a, gradientVerticalMaxLength: s, gradientVerticalMinLength: c} = e;
                if (yo(o)) return "horizontal" === n ? "top" === i || "bottom" === i ? $d(t, "width", a, r) : a : $d(t, "height", c, s);
                return
            }(e)
        },
        labelOverlap: ({legend: e, legendConfig: t, scaleType: n}) => {
            var i, o;
            return null !== (i = null !== (o = e.labelOverlap) && void 0 !== o ? o : t.labelOverlap) && void 0 !== i ? i : function (e) {
                if (T(["quantile", "threshold", "log", "symlog"], e)) return "greedy";
                return
            }(n)
        },
        symbolType: ({legend: e, markDef: t, channel: n, encoding: i}) => {
            var o;
            return null !== (o = e.symbolType) && void 0 !== o ? o : function (e, t, n, i) {
                if ("shape" !== t) {
                    var o;
                    const e = null !== (o = Gd(n)) && void 0 !== o ? o : i;
                    if (e) return e
                }
                switch (e) {
                    case"bar":
                    case"rect":
                    case"image":
                    case"square":
                        return "square";
                    case"line":
                    case"trail":
                    case"rule":
                        return "stroke";
                    case"arc":
                    case"point":
                    case"circle":
                    case"tick":
                    case"geoshape":
                    case"area":
                    case"text":
                        return "circle"
                }
            }(t.type, n, i.shape, t.shape)
        },
        title: ({fieldOrDatumDef: e, config: t}) => oa(e, t, {allowDisabling: !0}),
        type: ({legendType: e, scaleType: t, channel: n}) => {
            if (yt(n) && yo(t)) {
                if ("gradient" === e) return
            } else if ("symbol" === e) return;
            return e
        },
        values: ({fieldOrDatumDef: e, legend: t}) => function (e, t) {
            const n = e.values;
            if (u(n)) return va(t, n);
            if (Fi(n)) return n;
            return
        }(t, e)
    };

    function Xd(e) {
        const {legend: t} = e;
        return ue(t.type, function ({channel: e, timeUnit: t, scaleType: n}) {
            if (yt(e)) {
                if (T(["quarter", "month", "day"], t)) return "symbol";
                if (yo(n)) return "gradient"
            }
            return "symbol"
        }(e))
    }

    function Qd({legendConfig: e, legendType: t, orient: n, legend: i}) {
        var o, r;
        return null !== (o = null !== (r = i.direction) && void 0 !== r ? r : e[t ? "gradientDirection" : "symbolDirection"]) && void 0 !== o ? o : function (e, t) {
            switch (e) {
                case"top":
                case"bottom":
                    return "horizontal";
                case"left":
                case"right":
                case"none":
                case void 0:
                    return;
                default:
                    return "gradient" === t ? "horizontal" : void 0
            }
        }(n, t)
    }

    function $d(e, t, n, i) {
        const o = e.getSizeSignalRef(t).signal;
        return {signal: "clamp(".concat(o, ", ").concat(n, ", ").concat(i, ")")}
    }

    function Kd(e) {
        const t = Em(e) ? function (e) {
            const {encoding: t} = e, n = {};
            for (const i of [Je, ...ws]) {
                const o = ua(t[i]);
                o && e.getScaleComponent(i) && (i === $e && qr(o) && o.type === Vi || (n[i] = ep(e, i)))
            }
            return n
        }(e) : function (e) {
            const {legends: t, resolve: n} = e.component;
            for (const i of e.children) {
                Kd(i);
                for (const o of J(i.component.legends)) n.legend[o] = Rd(e.component.resolve, o), "shared" === n.legend[o] && (t[o] = tp(t[o], i.component.legends[o]), t[o] || (n.legend[o] = "independent", delete t[o]))
            }
            for (const i of J(t)) for (const t of e.children) t.component.legends[i] && "shared" === n.legend[i] && delete t.component.legends[i];
            return t
        }(e);
        return e.component.legends = t, t
    }

    function Zd(e, t, n, i) {
        switch (t) {
            case"disable":
                return void 0 !== n;
            case"values":
                return !!(null == n ? void 0 : n.values);
            case"title":
                if ("title" === t && e === (null == i ? void 0 : i.title)) return !0
        }
        return e === (n || {})[t]
    }

    function ep(e, t) {
        var n, i, o;
        let r = e.legend(t);
        const {markDef: a, encoding: s, config: c} = e, u = c.legend, l = new Ud({}, function (e, t) {
            const n = e.scaleName(t);
            if ("trail" === e.mark) {
                if ("color" === t) return {stroke: n};
                if ("size" === t) return {strokeWidth: n}
            }
            return "color" === t ? e.markDef.filled ? {fill: n} : {stroke: n} : {[t]: n}
        }(e, t));
        !function (e, t, n) {
            var i;
            const o = null === (i = e.fieldDef(t)) || void 0 === i ? void 0 : i.field;
            Bl(e, (e => {
                var i;
                const r = null !== (i = e.project.hasField[o]) && void 0 !== i ? i : e.project.hasChannel[t];
                if (r && nl.has(e)) {
                    var a;
                    const t = null !== (a = n.get("selections")) && void 0 !== a ? a : [];
                    t.push(e.name), n.set("selections", t, !1), r.hasLegend = !0
                }
            }))
        }(e, t, l);
        const f = void 0 !== r ? !r : u.disable;
        if (l.set("disable", f, void 0 !== r), f) return l;
        r = r || {};
        const d = e.getScaleComponent(t).get("type"), p = ua(s[t]),
            m = qr(p) ? null === (n = Di(p.timeUnit)) || void 0 === n ? void 0 : n.unit : void 0,
            h = r.orient || c.legend.orient || "right", g = Xd({legend: r, channel: t, timeUnit: m, scaleType: d}),
            v = {
                legend: r,
                channel: t,
                model: e,
                markDef: a,
                encoding: s,
                fieldOrDatumDef: p,
                legendConfig: u,
                config: c,
                scaleType: d,
                orient: h,
                legendType: g,
                direction: Qd({legend: r, legendType: g, orient: h, legendConfig: u})
            };
        for (const n of Wd) {
            if ("gradient" === g && n.startsWith("symbol") || "symbol" === g && n.startsWith("gradient")) continue;
            const i = n in Jd ? Jd[n](v) : r[n];
            if (void 0 !== i) {
                const o = Zd(i, n, r, e.fieldDef(t));
                (o || void 0 === c.legend[n]) && l.set(n, i, o)
            }
        }
        const y = null !== (i = null === (o = r) || void 0 === o ? void 0 : o.encoding) && void 0 !== i ? i : {},
            b = l.get("selections"), x = {},
            w = {fieldOrDatumDef: p, model: e, channel: t, legendCmpt: l, legendType: g};
        for (const t of ["labels", "legend", "title", "symbols", "gradient", "entries"]) {
            var A;
            const n = Ld(null !== (A = y[t]) && void 0 !== A ? A : {}, e), i = t in Id ? Id[t](n, w) : n;
            void 0 === i || Y(i) || (x[t] = {
                ...(null == b ? void 0 : b.length) && qr(p) ? {name: "".concat(K(p.field), "_legend_").concat(t)} : {}, ...(null == b ? void 0 : b.length) ? {interactive: !!b} : {},
                update: i
            })
        }
        var D;
        Y(x) || l.set("encode", x, !!(null === (D = r) || void 0 === D ? void 0 : D.encoding));
        return l
    }

    function tp(e, t) {
        if (!e) return t.clone();
        const n = e.getWithExplicit("orient"), i = t.getWithExplicit("orient");
        if (n.explicit && i.explicit && n.value !== i.value) return;
        let o = !1;
        for (const n of Wd) {
            const i = Ec(e.getWithExplicit(n), t.getWithExplicit(n), n, "legend", ((e, t) => {
                switch (n) {
                    case"symbolType":
                        return np(e, t);
                    case"title":
                        return Ma(e, t);
                    case"type":
                        return o = !0, Fc("symbol")
                }
                return Cc(e, t, n, "legend")
            }));
            e.setWithExplicit(n, i)
        }
        var r, a, s, c;
        o && ((null === (r = e.implicit) || void 0 === r || null === (a = r.encode) || void 0 === a ? void 0 : a.gradient) && ee(e.implicit, ["encode", "gradient"]), (null === (s = e.explicit) || void 0 === s || null === (c = s.encode) || void 0 === c ? void 0 : c.gradient) && ee(e.explicit, ["encode", "gradient"]));
        return e
    }

    function np(e, t) {
        return "circle" === t.value ? t : e
    }

    function ip(e) {
        const t = e.component.legends, n = {};
        for (const i of J(t)) {
            const o = e.getScaleComponent(i), r = P(o.get("domains"));
            if (n[r]) for (const e of n[r]) {
                tp(e, t[i]) || n[r].push(t[i])
            } else n[r] = [t[i].clone()]
        }
        return X(n).flat().map((t => function (e, t) {
            var n;
            const {disable: i, labelExpr: o, selections: r, ...a} = e.combine();
            if (i) return;
            !1 === t.aria && null == a.aria && (a.aria = !1);
            if (null === (n = a.encode) || void 0 === n ? void 0 : n.symbols) {
                const e = a.encode.symbols.update;
                !e.fill || "transparent" === e.fill.value || e.stroke || a.stroke || (e.stroke = {value: "transparent"});
                for (const t of ws) a[t] && delete e[t]
            }
            a.title || delete a.title;
            if (void 0 !== o) {
                var s, c;
                let e = o;
                (null === (s = a.encode) || void 0 === s || null === (c = s.labels) || void 0 === c ? void 0 : c.update) && Fi(a.encode.labels.update.text) && (e = ae(o, "datum.label", a.encode.labels.update.text.signal)), function (e, t, n, i) {
                    var o, r, a;
                    e.encode = null !== (o = e.encode) && void 0 !== o ? o : {}, e.encode[t] = null !== (r = e.encode[t]) && void 0 !== r ? r : {}, e.encode[t].update = null !== (a = e.encode[t].update) && void 0 !== a ? a : {}, e.encode[t].update[n] = i
                }(a, "labels", "text", {signal: e})
            }
            return a
        }(t, e.config))).filter((e => void 0 !== e))
    }

    function op(e) {
        return _m(e) || Bm(e) ? function (e) {
            return e.children.reduce(((e, t) => e.concat(t.assembleProjections())), rp(e))
        }(e) : rp(e)
    }

    function rp(e) {
        const t = e.component.projection;
        if (!t || t.merged) return [];
        const n = t.combine(), {name: i} = n;
        if (t.data) {
            const o = {signal: "[".concat(t.size.map((e => e.signal)).join(", "), "]")}, r = t.data.reduce(((t, n) => {
                const i = Fi(n) ? n.signal : "data('".concat(e.lookupDataSource(n), "')");
                return T(t, i) || t.push(i), t
            }), []);
            if (r.length <= 0) throw new Error("Projection's fit didn't find any data sources");
            return [{name: i, size: o, fit: {signal: r.length > 1 ? "[".concat(r.join(", "), "]") : r[0]}, ...n}]
        }
        return [{name: i, translate: {signal: "[width / 2, height / 2]"}, ...n}]
    }

    const ap = ["type", "clipAngle", "clipExtent", "center", "rotate", "precision", "reflectX", "reflectY", "coefficient", "distance", "fraction", "lobes", "parallel", "radius", "ratio", "spacing", "tilt"];

    class sp extends Ac {
        constructor(e, t, n, i) {
            super({...t}, {name: e}), this.specifiedProjection = t, this.size = n, this.data = i, Bn(this, "merged", !1)
        }

        get isFit() {
            return !!this.data
        }
    }

    function cp(e) {
        e.component.projection = Em(e) ? function (e) {
            if (e.hasProjection) {
                var t;
                const n = e.specifiedProjection, i = !(n && (null != n.scale || null != n.translate)),
                    o = i ? [e.getSizeSignalRef("width"), e.getSizeSignalRef("height")] : void 0, r = i ? function (e) {
                        const t = [], {encoding: n} = e;
                        for (const i of [[Ge, He], [Ye, Ve]]) (ua(n[i[0]]) || ua(n[i[1]])) && t.push({signal: e.getName("geojson_".concat(t.length))});
                        e.channelHasField($e) && e.typedFieldDef($e).type === Vi && t.push({signal: e.getName("geojson_".concat(t.length))});
                        0 === t.length && t.push(e.requestDataName(Mc.Main));
                        return t
                    }(e) : void 0;
                return new sp(e.projectionName(!0), {...null !== (t = e.config.projection) && void 0 !== t ? t : {}, ...null != n ? n : {}}, o, r)
            }
            return
        }(e) : function (e) {
            if (0 === e.children.length) return;
            let t;
            for (const t of e.children) cp(t);
            const n = q(e.children, (e => {
                const n = e.component.projection;
                if (n) {
                    if (t) {
                        const e = function (e, t) {
                            const n = q(ap, (n => !v(e.explicit, n) && !v(t.explicit, n) || !(!v(e.explicit, n) || !v(t.explicit, n) || P(e.get(n)) !== P(t.get(n)))));
                            if (P(e.size) === P(t.size)) {
                                if (n) return e;
                                if (P(e.explicit) === P({})) return t;
                                if (P(t.explicit) === P({})) return e
                            }
                            return null
                        }(t, n);
                        return e && (t = e), !!e
                    }
                    return t = n, !0
                }
                return !0
            }));
            if (t && n) {
                const n = e.projectionName(!0), i = new sp(n, t.specifiedProjection, t.size, z(t.data));
                for (const t of e.children) {
                    const e = t.component.projection;
                    e && (e.isFit && i.data.push(...t.component.projection.data), t.renameProjection(e.get("name"), n), e.merged = !0)
                }
                return i
            }
            return
        }(e)
    }

    function up(e, t, n, i) {
        if (ya(t, n)) {
            var o, r;
            const a = Em(e) && null !== (o = null !== (r = e.axis(n)) && void 0 !== r ? r : e.legend(n)) && void 0 !== o ? o : {},
                s = Kr(t, {expr: "datum"}), c = Kr(t, {expr: "datum", binSuffix: "end"});
            return {formulaAs: Kr(t, {binSuffix: "range", forAs: !0}), formula: Ar(s, c, a.format, a.formatType, i)}
        }
        return {}
    }

    function lp(e, t) {
        return "".concat(Dn(e), "_").concat(t)
    }

    function fp(e, t, n) {
        var i;
        const o = lp(null !== (i = pa(n, void 0)) && void 0 !== i ? i : {}, t);
        return e.getName("".concat(o, "_bins"))
    }

    function dp(e, t, n) {
        let i, o;
        i = function (e) {
            return "as" in e
        }(e) ? x(e.as) ? [e.as, "".concat(e.as, "_end")] : [e.as[0], e.as[1]] : [Kr(e, {forAs: !0}), Kr(e, {
            binSuffix: "end",
            forAs: !0
        })];
        const r = {...pa(t, void 0)}, a = lp(r, e.field), {signal: s, extentSignal: c} = function (e, t) {
            return {signal: e.getName("".concat(t, "_bins")), extentSignal: e.getName("".concat(t, "_extent"))}
        }(n, a);
        if (En(r.extent)) {
            const e = r.extent, t = e.selection;
            o = nd(n.getSelectionComponent(K(t), t), e), delete r.extent
        }
        return {
            key: a,
            binComponent: {
                bin: r,
                field: e.field,
                as: [i], ...s ? {signal: s} : {}, ...c ? {extentSignal: c} : {}, ...o ? {span: o} : {}
            }
        }
    }

    class pp extends Hu {
        clone() {
            return new pp(null, z(this.bins))
        }

        constructor(e, t) {
            super(e), this.bins = t
        }

        static makeFromEncoding(e, t) {
            const n = t.reduceFieldDef(((e, n, i) => {
                if (Gr(n) && Fn(n.bin)) {
                    const {key: o, binComponent: r} = dp(n, n.bin, t);
                    e[o] = {...r, ...e[o], ...up(t, n, i, t.config)}
                }
                return e
            }), {});
            return Y(n) ? null : new pp(e, n)
        }

        static makeFromTransform(e, t, n) {
            const {key: i, binComponent: o} = dp(t, t.bin, n);
            return new pp(e, {[i]: o})
        }

        merge(e, t) {
            for (const n of J(e.bins)) n in this.bins ? (t(e.bins[n].signal, this.bins[n].signal), this.bins[n].as = U([...this.bins[n].as, ...e.bins[n].as], j)) : this.bins[n] = e.bins[n];
            for (const t of e.children) e.removeChild(t), t.parent = this;
            e.remove()
        }

        producedFields() {
            return new Set(X(this.bins).map((e => e.as)).flat(2))
        }

        dependentFields() {
            return new Set(X(this.bins).map((e => e.field)))
        }

        hash() {
            return "Bin ".concat(j(this.bins))
        }

        assemble() {
            return X(this.bins).flatMap((e => {
                const t = [], [n, ...i] = e.as, {extent: o, ...r} = e.bin, a = {
                    type: "bin",
                    field: re(e.field),
                    as: n,
                    signal: e.signal, ...En(o) ? {extent: null} : {extent: o}, ...e.span ? {span: {signal: "span(".concat(e.span, ")")}} : {}, ...r
                };
                !o && e.extentSignal && (t.push({
                    type: "extent",
                    field: re(e.field),
                    signal: e.extentSignal
                }), a.extent = {signal: e.extentSignal}), t.push(a);
                for (const e of i) for (let i = 0; i < 2; i++) t.push({
                    type: "formula",
                    expr: Kr({field: n[i]}, {expr: "datum"}),
                    as: e[i]
                });
                return e.formula && t.push({type: "formula", expr: e.formula, as: e.formulaAs}), t
            }))
        }
    }

    function mp(e, t, n, i) {
        const o = Em(i) ? i.encoding[Mt(t)] : void 0;
        if (Gr(n) && Em(i) && jr(t, n, o, i.stack, i.markDef, i.config)) e.add(Kr(n, {})), e.add(Kr(n, {suffix: "end"})), n.bin && ya(n, t) && e.add(Kr(n, {binSuffix: "range"})); else if (t in ht) {
            const n = function (e) {
                switch (e) {
                    case He:
                        return "y";
                    case Ve:
                        return "y2";
                    case Ge:
                        return "x";
                    case Ye:
                        return "x2"
                }
            }(t);
            e.add(i.getName(n))
        } else e.add(Kr(n));
        return e
    }

    class hp extends Hu {
        clone() {
            return new hp(null, new Set(this.dimensions), z(this.measures))
        }

        constructor(e, t, n) {
            super(e), this.dimensions = t, this.measures = n
        }

        get groupBy() {
            return this.dimensions
        }

        static makeFromEncoding(e, t) {
            let n = !1;
            t.forEachFieldDef((e => {
                e.aggregate && (n = !0)
            }));
            const i = {}, o = new Set;
            return n ? (t.forEachFieldDef(((e, n) => {
                const {aggregate: r, field: a} = e;
                if (r) if ("count" === r) {
                    var s;
                    i["*"] = null !== (s = i["*"]) && void 0 !== s ? s : {}, i["*"].count = new Set([Kr(e, {forAs: !0})])
                } else {
                    if (Ce(r) || Ee(r)) {
                        var c;
                        const e = Ce(r) ? "argmin" : "argmax", t = r[e];
                        i[t] = null !== (c = i[t]) && void 0 !== c ? c : {}, i[t][e] = new Set([Kr({
                            op: e,
                            field: t
                        }, {forAs: !0})])
                    } else {
                        var u;
                        i[a] = null !== (u = i[a]) && void 0 !== u ? u : {}, i[a][r] = new Set([Kr(e, {forAs: !0})])
                    }
                    var l;
                    if (vn(n) && "unaggregated" === t.scaleDomain(n)) i[a] = null !== (l = i[a]) && void 0 !== l ? l : {}, i[a].min = new Set([Kr({
                        field: a,
                        aggregate: "min"
                    }, {forAs: !0})]), i[a].max = new Set([Kr({field: a, aggregate: "max"}, {forAs: !0})])
                } else mp(o, n, e, t)
            })), o.size + J(i).length === 0 ? null : new hp(e, o, i)) : null
        }

        static makeFromTransform(e, t) {
            const n = new Set, i = {};
            for (const e of t.aggregate) {
                const {op: t, field: n, as: a} = e;
                var o, r;
                if (t) if ("count" === t) i["*"] = null !== (o = i["*"]) && void 0 !== o ? o : {}, i["*"].count = new Set([a || Kr(e, {forAs: !0})]); else i[n] = null !== (r = i[n]) && void 0 !== r ? r : {}, i[n][t] = new Set([a || Kr(e, {forAs: !0})])
            }
            for (const e of null !== (a = t.groupby) && void 0 !== a ? a : []) {
                var a;
                n.add(e)
            }
            return n.size + J(i).length === 0 ? null : new hp(e, n, i)
        }

        merge(e) {
            return I(this.dimensions, e.dimensions) ? (function (e, t) {
                for (const i of J(t)) {
                    const o = t[i];
                    for (const t of J(o)) {
                        var n;
                        i in e ? e[i][t] = new Set([...null !== (n = e[i][t]) && void 0 !== n ? n : [], ...o[t]]) : e[i] = {[t]: o[t]}
                    }
                }
            }(this.measures, e.measures), !0) : (function (...e) {
                ai.debug(...e)
            }("different dimensions, cannot merge"), !1)
        }

        addDimensions(e) {
            e.forEach(this.dimensions.add, this.dimensions)
        }

        dependentFields() {
            return new Set([...this.dimensions, ...J(this.measures)])
        }

        producedFields() {
            const e = new Set;
            for (const t of J(this.measures)) for (const n of J(this.measures[t])) {
                const i = this.measures[t][n];
                0 === i.size ? e.add("".concat(n, "_").concat(t)) : i.forEach(e.add, e)
            }
            return e
        }

        hash() {
            return "Aggregate ".concat(j({dimensions: this.dimensions, measures: this.measures}))
        }

        assemble() {
            const e = [], t = [], n = [];
            for (const i of J(this.measures)) for (const o of J(this.measures[i])) for (const r of this.measures[i][o]) n.push(r), e.push(o), t.push("*" === i ? null : re(i));
            return {type: "aggregate", groupby: [...this.dimensions].map(re), ops: e, fields: t, as: n}
        }
    }

    class gp extends Hu {
        constructor(e, t, n, i) {
            super(e), this.model = t, this.name = n, this.data = i, Bn(this, "column", void 0), Bn(this, "row", void 0), Bn(this, "facet", void 0), Bn(this, "childModel", void 0);
            for (const e of xt) {
                const n = t.facet[e];
                if (n) {
                    const {bin: i, sort: o} = n;
                    this[e] = {
                        name: t.getName("".concat(e, "_domain")),
                        fields: [Kr(n), ...Fn(i) ? [Kr(n, {binSuffix: "end"})] : []], ...Er(o) ? {sortField: o} : u(o) ? {sortIndexField: vd(n, e)} : {}
                    }
                }
            }
            this.childModel = t.child
        }

        hash() {
            let e = "Facet";
            for (const t of xt) this[t] && (e += " ".concat(t.charAt(0), ":").concat(j(this[t])));
            return e
        }

        get fields() {
            const e = [];
            for (const n of xt) {
                var t;
                (null === (t = this[n]) || void 0 === t ? void 0 : t.fields) && e.push(...this[n].fields)
            }
            return e
        }

        dependentFields() {
            const e = new Set(this.fields);
            for (const t of xt) this[t] && (this[t].sortField && e.add(this[t].sortField.field), this[t].sortIndexField && e.add(this[t].sortIndexField));
            return e
        }

        producedFields() {
            return new Set
        }

        getSource() {
            return this.name
        }

        getChildIndependentFieldsWithStep() {
            const e = {};
            for (const t of Zt) {
                const n = this.childModel.component.scales[t];
                if (n && !n.merged) {
                    const i = n.get("type"), o = n.get("range");
                    if (go(i) && ki(o)) {
                        const n = am(sm(this.childModel, t));
                        n ? e[t] = n : si(Mn(t))
                    }
                }
            }
            return e
        }

        assembleRowColumnHeaderData(e, t, n) {
            const i = {row: "y", column: "x"}[e], o = [], r = [], a = [];
            n && n[i] && (t ? (o.push("distinct_".concat(n[i])), r.push("max")) : (o.push(n[i]), r.push("distinct")), a.push("distinct_".concat(n[i])));
            const {sortField: s, sortIndexField: c} = this[e];
            if (s) {
                const {op: e = Dr, field: t} = s;
                o.push(t), r.push(e), a.push(Kr(s, {forAs: !0}))
            } else c && (o.push(c), r.push("max"), a.push(c));
            return {
                name: this[e].name,
                source: null != t ? t : this.data,
                transform: [{type: "aggregate", groupby: this[e].fields, ...o.length ? {fields: o, ops: r, as: a} : {}}]
            }
        }

        assembleFacetHeaderData(e) {
            const {columns: t} = this.model.layout, {layoutHeaders: n} = this.model.component, i = [], o = {};
            for (const e of wd) {
                for (const t of Ad) {
                    var r;
                    const i = null !== (r = n[e] && n[e][t]) && void 0 !== r ? r : [];
                    for (const t of i) {
                        var a;
                        if ((null === (a = t.axes) || void 0 === a ? void 0 : a.length) > 0) {
                            o[e] = !0;
                            break
                        }
                    }
                }
                if (o[e]) {
                    const n = 'length(data("'.concat(this.facet.name, '"))'),
                        o = "row" === e ? t ? {signal: "ceil(".concat(n, " / ").concat(t, ")")} : 1 : t ? {signal: "min(".concat(n, ", ").concat(t, ")")} : {signal: n};
                    i.push({
                        name: "".concat(this.facet.name, "_").concat(e),
                        transform: [{type: "sequence", start: 0, stop: o}]
                    })
                }
            }
            const {row: s, column: c} = o;
            return (s || c) && i.unshift(this.assembleRowColumnHeaderData("facet", null, e)), i
        }

        assemble() {
            const e = [];
            let t = null;
            const n = this.getChildIndependentFieldsWithStep(), {column: i, row: o, facet: r} = this;
            if (i && o && (n.x || n.y)) {
                var a, s;
                t = "cross_".concat(this.column.name, "_").concat(this.row.name);
                const i = [].concat(null !== (a = n.x) && void 0 !== a ? a : [], null !== (s = n.y) && void 0 !== s ? s : []),
                    o = i.map((() => "distinct"));
                e.push({
                    name: t,
                    source: this.data,
                    transform: [{type: "aggregate", groupby: this.fields, fields: i, ops: o}]
                })
            }
            for (const i of [Pe, Ne]) this[i] && e.push(this.assembleRowColumnHeaderData(i, t, n));
            if (r) {
                const t = this.assembleFacetHeaderData(n);
                t && e.push(...t)
            }
            return e
        }
    }

    function vp(e) {
        return "'" === e[0] && "'" === e[e.length - 1] || '"' === e[0] && '"' === e[e.length - 1] ? e.slice(1, -1) : e
    }

    function yp(e) {
        const t = {};
        return S(e.filter, (e => {
            if (Ti(e)) {
                let i = null;
                if (_i(e)) i = Aa(e.equal); else if (Oi(e)) i = Aa(e.lte); else if (zi(e)) i = Aa(e.lt); else if (Ni(e)) i = Aa(e.gt); else if (Pi(e)) i = Aa(e.gte); else if (ji(e)) i = e.range[0]; else if (Mi(e)) {
                    var n;
                    i = (null !== (n = e.oneOf) && void 0 !== n ? n : e.in)[0]
                }
                i && (ci(i) ? t[e.field] = "date" : b(i) ? t[e.field] = "number" : x(i) && (t[e.field] = "string")), e.timeUnit && (t[e.field] = "date")
            }
        })), t
    }

    function bp(e) {
        const t = {};

        function n(e) {
            var n;
            ha(e) ? t[e.field] = "date" : "quantitative" === e.type && (x(n = e.aggregate) && T(["min", "max"], n)) ? t[e.field] = "number" : ce(e.field) > 1 ? e.field in t || (t[e.field] = "flatten") : Yr(e) && Er(e.sort) && ce(e.sort.field) > 1 && (e.sort.field in t || (t[e.sort.field] = "flatten"))
        }

        if ((Em(e) || Sm(e)) && e.forEachFieldDef(((t, i) => {
            if (Gr(t)) n(t); else {
                const o = Pt(i), r = e.fieldDef(o);
                n({...t, type: r.type})
            }
        })), Em(e)) {
            const {mark: n, markDef: i, encoding: o} = e;
            if (Jo(n) && !e.encoding.order) {
                const e = o["horizontal" === i.orient ? "y" : "x"];
                qr(e) && "quantitative" === e.type && !(e.field in t) && (t[e.field] = "number")
            }
        }
        return t
    }

    class xp extends Hu {
        clone() {
            return new xp(null, z(this._parse))
        }

        constructor(e, t) {
            super(e), Bn(this, "_parse", void 0), this._parse = t
        }

        hash() {
            return "Parse ".concat(j(this._parse))
        }

        static makeExplicit(e, t, n) {
            let i = {};
            const o = t.data;
            return !Oc(o) && o && o.format && o.format.parse && (i = o.format.parse), this.makeWithAncestors(e, i, {}, n)
        }

        static makeWithAncestors(e, t, n, i) {
            for (const e of J(n)) {
                const t = i.getWithExplicit(e);
                void 0 !== t.value && (t.explicit || t.value === n[e] || "derived" === t.value || "flatten" === n[e] ? delete n[e] : si(Un(e, n[e], t.value)))
            }
            for (const e of J(t)) {
                const n = i.get(e);
                void 0 !== n && (n === t[e] ? delete t[e] : si(Un(e, t[e], n)))
            }
            const o = new Ac(t, n);
            i.copyAll(o);
            const r = {};
            for (const e of J(o.combine())) {
                const t = o.get(e);
                null !== t && (r[e] = t)
            }
            return 0 === J(r).length || i.parseNothing ? null : new xp(e, r)
        }

        get parse() {
            return this._parse
        }

        merge(e) {
            this._parse = {...this._parse, ...e.parse}, e.remove()
        }

        assembleFormatParse() {
            const e = {};
            for (const t of J(this._parse)) {
                const n = this._parse[t];
                1 === ce(t) && (e[t] = n)
            }
            return e
        }

        producedFields() {
            return new Set(J(this._parse))
        }

        dependentFields() {
            return new Set(J(this._parse))
        }

        assembleTransforms(e = !1) {
            return J(this._parse).filter((t => !e || ce(t) > 1)).map((e => {
                const t = function (e, t) {
                    const n = ne(e);
                    if ("number" === t) return "toNumber(".concat(n, ")");
                    if ("boolean" === t) return "toBoolean(".concat(n, ")");
                    if ("string" === t) return "toString(".concat(n, ")");
                    if ("date" === t) return "toDate(".concat(n, ")");
                    if ("flatten" === t) return n;
                    if (0 === t.indexOf("date:")) {
                        const e = vp(t.slice(5, t.length));
                        return "timeParse(".concat(n, ",'").concat(e, "')")
                    }
                    if (0 === t.indexOf("utc:")) {
                        const e = vp(t.slice(4, t.length));
                        return "utcParse(".concat(n, ",'").concat(e, "')")
                    }
                    return si('Unrecognized parse "'.concat(t, '".')), null
                }(e, this._parse[e]);
                if (!t) return null;
                return {type: "formula", expr: t, as: se(e)}
            })).filter((e => null !== e))
        }
    }

    class wp extends Hu {
        clone() {
            return new wp(null)
        }

        constructor(e) {
            super(e)
        }

        dependentFields() {
            return new Set
        }

        producedFields() {
            return new Set([Ds])
        }

        hash() {
            return "Identifier"
        }

        assemble() {
            return {type: "identifier", as: Ds}
        }
    }

    class Ap extends Hu {
        clone() {
            return new Ap(null, this.params)
        }

        constructor(e, t) {
            super(e), this.params = t
        }

        dependentFields() {
            return new Set
        }

        producedFields() {
        }

        hash() {
            return "Graticule ".concat(j(this.params))
        }

        assemble() {
            return {type: "graticule", ...!0 === this.params ? {} : this.params}
        }
    }

    class Dp extends Hu {
        clone() {
            return new Dp(null, this.params)
        }

        constructor(e, t) {
            super(e), this.params = t
        }

        dependentFields() {
            return new Set
        }

        producedFields() {
            var e;
            return new Set([null !== (e = this.params.as) && void 0 !== e ? e : "data"])
        }

        hash() {
            return "Hash ".concat(j(this.params))
        }

        assemble() {
            return {type: "sequence", ...this.params}
        }
    }

    class Fp extends Hu {
        constructor(e) {
            var t;
            let n;
            if (super(null), Bn(this, "_data", void 0), Bn(this, "_name", void 0), Bn(this, "_generator", void 0), Oc(e = null !== (t = e) && void 0 !== t ? t : {name: "source"}) || (n = e.format ? {...N(e.format, ["parse"])} : {}), _c(e)) this._data = {values: e.values}; else if (Bc(e)) {
                if (this._data = {url: e.url}, !n.type) {
                    let t = /(?:\.([^.]+))?$/.exec(e.url)[1];
                    T(["json", "csv", "tsv", "dsv", "topojson"], t) || (t = "json"), n.type = t
                }
            } else Pc(e) ? this._data = {values: [{type: "Sphere"}]} : (zc(e) || Oc(e)) && (this._data = {});
            this._generator = Oc(e), e.name && (this._name = e.name), n && !Y(n) && (this._data.format = n)
        }

        dependentFields() {
            return new Set
        }

        producedFields() {
        }

        get data() {
            return this._data
        }

        hasName() {
            return !!this._name
        }

        get isGenerator() {
            return this._generator
        }

        get dataName() {
            return this._name
        }

        set dataName(e) {
            this._name = e
        }

        set parent(e) {
            throw new Error("Source nodes have to be roots.")
        }

        remove() {
            throw new Error("Source nodes are roots and cannot be removed.")
        }

        hash() {
            throw new Error("Cannot hash sources")
        }

        assemble() {
            return {name: this._name, ...this._data, transform: []}
        }
    }

    function kp(e) {
        return e instanceof Fp || e instanceof Ap || e instanceof Dp
    }

    var Cp = new WeakMap;

    class Ep {
        constructor() {
            Cp.set(this, {writable: !0, value: void 0}), _n(this, Cp, !1)
        }

        setModified() {
            _n(this, Cp, !0)
        }

        get modifiedFlag() {
            return function (e, t) {
                var n = t.get(e);
                if (!n) throw new TypeError("attempted to get private field on non-instance");
                return n.get ? n.get.call(e) : n.value
            }(this, Cp)
        }
    }

    class Sp extends Ep {
        getNodeDepths(e, t, n) {
            n.set(e, t);
            for (const i of e.children) this.getNodeDepths(i, t + 1, n);
            return n
        }

        optimize(e) {
            const t = [...this.getNodeDepths(e, 0, new Map).entries()].sort(((e, t) => t[1] - e[1]));
            for (const e of t) this.run(e[0]);
            return this.modifiedFlag
        }
    }

    class Bp extends Ep {
        optimize(e) {
            this.run(e);
            for (const t of e.children) this.optimize(t);
            return this.modifiedFlag
        }
    }

    class _p extends Bp {
        mergeNodes(e, t) {
            const n = t.shift();
            for (const i of t) e.removeChild(i), i.parent = n, i.remove()
        }

        run(e) {
            const t = e.children.map((e => e.hash())), n = {};
            for (let i = 0; i < t.length; i++) void 0 === n[t[i]] ? n[t[i]] = [e.children[i]] : n[t[i]].push(e.children[i]);
            for (const t of J(n)) n[t].length > 1 && (this.setModified(), this.mergeNodes(e, n[t]))
        }
    }

    class zp extends Bp {
        constructor(e) {
            super(), Bn(this, "requiresSelectionId", void 0), this.requiresSelectionId = e && zl(e)
        }

        run(e) {
            e instanceof wp && (this.requiresSelectionId && (kp(e.parent) || e.parent instanceof hp || e.parent instanceof xp) || (this.setModified(), e.remove()))
        }
    }

    class Op extends Ep {
        optimize(e) {
            return this.run(e, new Set), this.modifiedFlag
        }

        run(e, t) {
            let n = new Set;
            e instanceof Vu && (n = e.producedFields(), H(n, t) && (this.setModified(), e.removeFormulas(t), 0 === e.producedFields.length && e.remove()));
            for (const i of e.children) this.run(i, new Set([...t, ...n]))
        }
    }

    class Np extends Bp {
        constructor() {
            super()
        }

        run(e) {
            e instanceof Gu && !e.isRequired() && (this.setModified(), e.remove())
        }
    }

    class Pp extends Sp {
        run(e) {
            if (!(kp(e) || e.numChildren() > 1)) for (const t of e.children) if (t instanceof xp) if (e instanceof xp) this.setModified(), e.merge(t); else {
                if (V(e.producedFields(), t.dependentFields())) continue;
                this.setModified(), t.swapWithParent()
            }
        }
    }

    class jp extends Sp {
        run(e) {
            const t = [...e.children], n = e.children.filter((e => e instanceof xp));
            if (e.numChildren() > 1 && n.length >= 1) {
                const i = {}, o = new Set;
                for (const e of n) {
                    const t = e.parse;
                    for (const e of J(t)) e in i ? i[e] !== t[e] && o.add(e) : i[e] = t[e]
                }
                for (const e of o) delete i[e];
                if (!Y(i)) {
                    this.setModified();
                    const n = new xp(e, i);
                    for (const o of t) {
                        if (o instanceof xp) for (const e of J(i)) delete o.parse[e];
                        e.removeChild(o), o.parent = n, o instanceof xp && 0 === J(o.parse).length && o.remove()
                    }
                }
            }
        }
    }

    class Mp extends Sp {
        run(e) {
            e instanceof Gu || e.numChildren() > 0 || e instanceof gp || e instanceof Fp || (this.setModified(), e.remove())
        }
    }

    class Tp extends Sp {
        run(e) {
            const t = e.children.filter((e => e instanceof Vu)), n = t.pop();
            for (const e of t) this.setModified(), n.merge(e)
        }
    }

    class Lp extends Sp {
        run(e) {
            const t = e.children.filter((e => e instanceof hp)), n = {};
            for (const e of t) {
                const t = j(e.groupBy);
                t in n || (n[t] = []), n[t].push(e)
            }
            for (const t of J(n)) {
                const i = n[t];
                if (i.length > 1) {
                    const t = i.pop();
                    for (const n of i) t.merge(n) && (e.removeChild(n), n.parent = t, n.remove(), this.setModified())
                }
            }
        }
    }

    class qp extends Sp {
        constructor(e) {
            super(), this.model = e
        }

        run(e) {
            const t = !(kp(e) || e instanceof ed || e instanceof xp || e instanceof wp), n = [], i = [];
            for (const o of e.children) o instanceof pp && (t && !V(e.producedFields(), o.dependentFields()) ? n.push(o) : i.push(o));
            if (n.length > 0) {
                const t = n.pop();
                for (const e of n) t.merge(e, this.model.renameSignal.bind(this.model));
                this.setModified(), e instanceof pp ? e.merge(t, this.model.renameSignal.bind(this.model)) : t.swapWithParent()
            }
            if (i.length > 1) {
                const e = i.pop();
                for (const t of i) e.merge(t, this.model.renameSignal.bind(this.model));
                this.setModified()
            }
        }
    }

    class Rp extends Sp {
        run(e) {
            const t = [...e.children];
            if (!L(t, (e => e instanceof Gu)) || e.numChildren() <= 1) return;
            const n = [];
            let i;
            for (const o of t) if (o instanceof Gu) {
                let t = o;
                for (; 1 === t.numChildren();) {
                    const [e] = t.children;
                    if (!(e instanceof Gu)) break;
                    t = e
                }
                n.push(...t.children), i ? (e.removeChild(o), o.parent = i.parent, i.parent.removeChild(i), i.parent = t, this.setModified()) : i = t
            } else n.push(o);
            if (n.length) {
                this.setModified();
                for (const e of n) e.parent.removeChild(e), e.parent = i
            }
        }
    }

    class Wp extends Hu {
        clone() {
            return new Wp(null, z(this.transform))
        }

        constructor(e, t) {
            super(e), this.transform = t
        }

        addDimensions(e) {
            this.transform.groupby = U(this.transform.groupby.concat(e), (e => e))
        }

        dependentFields() {
            const e = new Set;
            return this.transform.groupby && this.transform.groupby.forEach(e.add, e), this.transform.joinaggregate.map((e => e.field)).filter((e => void 0 !== e)).forEach(e.add, e), e
        }

        producedFields() {
            return new Set(this.transform.joinaggregate.map(this.getDefaultName))
        }

        getDefaultName(e) {
            var t;
            return null !== (t = e.as) && void 0 !== t ? t : Kr(e)
        }

        hash() {
            return "JoinAggregateTransform ".concat(j(this.transform))
        }

        assemble() {
            const e = [], t = [], n = [];
            for (const i of this.transform.joinaggregate) t.push(i.op), n.push(this.getDefaultName(i)), e.push(void 0 === i.field ? null : i.field);
            const i = this.transform.groupby;
            return {type: "joinaggregate", as: n, ops: t, fields: e, ...void 0 !== i ? {groupby: i} : {}}
        }
    }

    class Up extends Hu {
        clone() {
            return new Up(null, z(this._stack))
        }

        constructor(e, t) {
            super(e), Bn(this, "_stack", void 0), this._stack = t
        }

        static makeFromTransform(e, t) {
            const {stack: n, groupby: i, as: o, offset: r = "zero"} = t, a = [], s = [];
            if (void 0 !== t.sort) for (const e of t.sort) a.push(e.field), s.push(ue(e.order, "ascending"));
            const c = {field: a, order: s};
            let l;
            return l = function (e) {
                return u(e) && e.every((e => x(e))) && e.length > 1
            }(o) ? o : x(o) ? [o, o + "_end"] : [t.stack + "_start", t.stack + "_end"], new Up(e, {
                stackField: n,
                groupby: i,
                offset: r,
                sort: c,
                facetby: [],
                as: l
            })
        }

        static makeFromEncoding(e, t) {
            const n = t.stack, {encoding: i} = t;
            if (!n) return null;
            const {groupbyChannel: o, fieldChannel: r, offset: a, impute: s} = n;
            let c;
            if (o) {
                c = ca(i[o])
            }
            const l = function (e) {
                return e.stack.stackBy.reduce(((e, t) => {
                    const n = Kr(t.fieldDef);
                    return n && e.push(n), e
                }), [])
            }(t), f = t.encoding.order;
            let d;
            return d = u(f) || qr(f) ? Na(f) : l.reduce(((e, t) => (e.field.push(t), e.order.push("y" === r ? "descending" : "ascending"), e)), {
                field: [],
                order: []
            }), new Up(e, {
                dimensionFieldDef: c,
                stackField: t.vgField(r),
                facetby: [],
                stackby: l,
                sort: d,
                offset: a,
                impute: s,
                as: [t.vgField(r, {suffix: "start", forAs: !0}), t.vgField(r, {suffix: "end", forAs: !0})]
            })
        }

        get stack() {
            return this._stack
        }

        addDimensions(e) {
            this._stack.facetby.push(...e)
        }

        dependentFields() {
            const e = new Set;
            return e.add(this._stack.stackField), this.getGroupbyFields().forEach(e.add, e), this._stack.facetby.forEach(e.add, e), this._stack.sort.field.forEach(e.add, e), e
        }

        producedFields() {
            return new Set(this._stack.as)
        }

        hash() {
            return "Stack ".concat(j(this._stack))
        }

        getGroupbyFields() {
            const {dimensionFieldDef: e, impute: t, groupby: n} = this._stack;
            return e ? e.bin ? t ? [Kr(e, {binSuffix: "mid"})] : [Kr(e, {}), Kr(e, {binSuffix: "end"})] : [Kr(e)] : null != n ? n : []
        }

        assemble() {
            const e = [], {facetby: t, dimensionFieldDef: n, stackField: i, stackby: o, sort: r, offset: a, impute: s, as: c} = this._stack;
            if (s && n) {
                const {band: r = .5, bin: a} = n;
                a && e.push({
                    type: "formula",
                    expr: "".concat(r, "*") + Kr(n, {expr: "datum"}) + "+".concat(1 - r, "*") + Kr(n, {
                        expr: "datum",
                        binSuffix: "end"
                    }),
                    as: Kr(n, {binSuffix: "mid", forAs: !0})
                }), e.push({
                    type: "impute",
                    field: i,
                    groupby: [...o, ...t],
                    key: Kr(n, {binSuffix: "mid"}),
                    method: "value",
                    value: 0
                })
            }
            return e.push({
                type: "stack",
                groupby: [...this.getGroupbyFields(), ...t],
                field: i,
                sort: r,
                as: c,
                offset: a
            }), e
        }
    }

    class Ip extends Hu {
        clone() {
            return new Ip(null, z(this.transform))
        }

        constructor(e, t) {
            super(e), this.transform = t
        }

        addDimensions(e) {
            this.transform.groupby = U(this.transform.groupby.concat(e), (e => e))
        }

        dependentFields() {
            var e, t;
            const n = new Set;
            return (null !== (e = this.transform.groupby) && void 0 !== e ? e : []).forEach(n.add, n), (null !== (t = this.transform.sort) && void 0 !== t ? t : []).forEach((e => n.add(e.field))), this.transform.window.map((e => e.field)).filter((e => void 0 !== e)).forEach(n.add, n), n
        }

        producedFields() {
            return new Set(this.transform.window.map(this.getDefaultName))
        }

        getDefaultName(e) {
            var t;
            return null !== (t = e.as) && void 0 !== t ? t : Kr(e)
        }

        hash() {
            return "WindowTransform ".concat(j(this.transform))
        }

        assemble() {
            const e = [], t = [], n = [], i = [];
            for (const o of this.transform.window) t.push(o.op), n.push(this.getDefaultName(o)), i.push(void 0 === o.param ? null : o.param), e.push(void 0 === o.field ? null : o.field);
            const o = this.transform.frame, r = this.transform.groupby;
            if (o && null === o[0] && null === o[1] && t.every((e => Se(e)))) return {
                type: "joinaggregate",
                as: n,
                ops: t,
                fields: e, ...void 0 !== r ? {groupby: r} : {}
            };
            const a = [], s = [];
            if (void 0 !== this.transform.sort) for (const e of this.transform.sort) {
                var c;
                a.push(e.field), s.push(null !== (c = e.order) && void 0 !== c ? c : "ascending")
            }
            const u = {field: a, order: s}, l = this.transform.ignorePeers;
            return {
                type: "window",
                params: i,
                as: n,
                ops: t,
                fields: e,
                sort: u, ...void 0 !== l ? {ignorePeers: l} : {}, ...void 0 !== r ? {groupby: r} : {}, ...void 0 !== o ? {frame: o} : {}
            }
        }
    }

    function Hp(e) {
        if (e instanceof gp) if (1 !== e.numChildren() || e.children[0] instanceof Gu) {
            const n = e.model.component.data.main;
            Gp(n);
            const i = (t = e, function e(n) {
                if (!(n instanceof gp)) {
                    const i = n.clone();
                    if (i instanceof Gu) {
                        const e = Vp + i.getSource();
                        i.setSource(e), t.model.component.data.outputNodes[e] = i
                    } else (i instanceof hp || i instanceof Up || i instanceof Ip || i instanceof Wp) && i.addDimensions(t.fields);
                    for (const t of n.children.flatMap(e)) t.parent = i;
                    return [i]
                }
                return n.children.flatMap(e)
            }), o = e.children.map(i).flat();
            for (const e of o) e.parent = n
        } else {
            const t = e.children[0];
            (t instanceof hp || t instanceof Up || t instanceof Ip || t instanceof Wp) && t.addDimensions(e.fields), t.swapWithParent(), Hp(e)
        } else e.children.map(Hp);
        var t
    }

    function Gp(e) {
        if (e instanceof Gu && e.type === Mc.Main && 1 === e.numChildren()) {
            const t = e.children[0];
            t instanceof gp || (t.swapWithParent(), Gp(e))
        }
    }

    const Vp = "scale_";

    function Yp(e) {
        for (const t of e) {
            for (const e of t.children) if (e.parent !== t) return !1;
            if (!Yp(t.children)) return !1
        }
        return !0
    }

    function Jp(e, t) {
        let n = !1;
        for (const i of t) n = e.optimize(i) || n;
        return n
    }

    function Xp(e, t, n) {
        let i = e.sources, o = !1;
        return o = Jp(new Np, i) || o, o = Jp(new zp(t), i) || o, i = i.filter((e => e.numChildren() > 0)), o = Jp(new Mp, i) || o, i = i.filter((e => e.numChildren() > 0)), n || (o = Jp(new Pp, i) || o, o = Jp(new qp(t), i) || o, o = Jp(new Op, i) || o, o = Jp(new jp, i) || o, o = Jp(new Lp, i) || o, o = Jp(new Tp, i) || o, o = Jp(new _p, i) || o, o = Jp(new Rp, i) || o), e.sources = i, o
    }

    class Qp {
        constructor(e) {
            Bn(this, "signal", void 0), Object.defineProperty(this, "signal", {enumerable: !0, get: e})
        }

        static fromName(e, t) {
            return new Qp((() => e(t)))
        }
    }

    function $p(e) {
        Em(e) ? function (e) {
            const t = e.component.scales;
            for (const n of J(t)) {
                const i = Kp(e, n);
                if (t[n].setWithExplicit("domains", i), nm(e, n), e.component.data.isFaceted) {
                    let t = e;
                    for (; !Sm(t) && t.parent;) t = t.parent;
                    if ("shared" === t.component.resolve.scale[n]) for (const e of i.value) Ci(e) && (e.data = Vp + e.data.replace(Vp, ""))
                }
            }
        }(e) : function (e) {
            for (const t of e.children) $p(t);
            const t = e.component.scales;
            for (const n of J(t)) {
                let i, o = null;
                for (const t of e.children) {
                    const e = t.component.scales[n];
                    if (e) {
                        i = void 0 === i ? e.getWithExplicit("domains") : Ec(i, e.getWithExplicit("domains"), "domains", "scale", om);
                        const t = e.get("selectionExtent");
                        o && t && o.selection !== t.selection && si(Rn), o = t
                    }
                }
                t[n].setWithExplicit("domains", i), o && t[n].set("selectionExtent", o, !0)
            }
        }(e)
    }

    function Kp(e, t) {
        const n = e.getScaleComponent(t).get("type"), {encoding: i} = e, o = function (e, t, n, i) {
            if ("unaggregated" === e) {
                const {valid: e, reason: i} = im(t, n);
                if (!e) return void si(i)
            } else if (void 0 === e && i.useUnaggregatedDomain) {
                const {valid: e} = im(t, n);
                if (e) return "unaggregated"
            }
            return e
        }(e.scaleDomain(t), e.typedFieldDef(t), n, e.config.scale);
        return o !== e.scaleDomain(t) && (e.specifiedScales[t] = {
            ...e.specifiedScales[t],
            domain: o
        }), "x" === t && ua(i.x2) ? ua(i.x) ? Ec(em(n, o, e, "x"), em(n, o, e, "x2"), "domain", "scale", om) : em(n, o, e, "x2") : "y" === t && ua(i.y2) ? ua(i.y) ? Ec(em(n, o, e, "y"), em(n, o, e, "y2"), "domain", "scale", om) : em(n, o, e, "y2") : em(n, o, e, t)
    }

    function Zp(e, t, n) {
        var i;
        const o = null === (i = Di(n)) || void 0 === i ? void 0 : i.unit;
        return "temporal" === t || o ? function (e, t, n) {
            return e.map((e => {
                const i = ga(e, {timeUnit: n, type: t});
                return {signal: "{data: ".concat(i, "}")}
            }))
        }(e, t, o) : [e]
    }

    function em(e, t, n, i) {
        const {encoding: o} = n, r = ua(o[i]), {type: a} = r, s = r.timeUnit;
        if (function (e) {
            return e && e.unionWith
        }(t)) {
            const o = em(e, void 0, n, i), r = Zp(t.unionWith, a, s);
            return Dc([...o.value, ...r])
        }
        if (Fi(t)) return Dc([t]);
        if (t && "unaggregated" !== t && !xo(t)) return Dc(Zp(t, a, s));
        const c = n.stack;
        if (c && i === c.fieldChannel) {
            if ("normalize" === c.offset) return Fc([[0, 1]]);
            const e = n.requestDataName(Mc.Main);
            return Fc([{data: e, field: n.vgField(i, {suffix: "start"})}, {
                data: e,
                field: n.vgField(i, {suffix: "end"})
            }])
        }
        const u = vn(i) && qr(r) ? function (e, t, n) {
            if (!go(n)) return;
            const i = e.fieldDef(t), o = i.sort;
            if (Sr(o)) return {op: "min", field: vd(i, t), order: "ascending"};
            const {stack: r} = e,
                a = r ? [...r.groupbyField ? [r.groupbyField] : [], ...r.stackBy.map((e => e.fieldDef.field))] : void 0;
            if (Er(o)) {
                return tm(o, r && !T(a, o.field))
            }
            if (Cr(o)) {
                const {encoding: t, order: n} = o, i = e.fieldDef(t), {aggregate: s, field: c} = i, u = r && !T(a, c);
                if (Ce(s) || Ee(s)) return tm({field: Kr(i), order: n}, u);
                if (Se(s) || !s) return tm({op: s, field: c, order: n}, u)
            } else {
                if ("descending" === o) return {op: "min", field: e.vgField(t), order: "descending"};
                if (T(["ascending", void 0], o)) return !0
            }
            return
        }(n, i, e) : void 0;
        if (Wr(r)) {
            return Fc(Zp([r.datum], a, s))
        }
        const f = r;
        if ("unaggregated" === t) {
            const e = n.requestDataName(Mc.Main), {field: t} = r;
            return Fc([{data: e, field: Kr({field: t, aggregate: "min"})}, {
                data: e,
                field: Kr({field: t, aggregate: "max"})
            }])
        }
        if (Fn(f.bin)) {
            if (go(e)) return Fc("bin-ordinal" === e ? [] : [{
                data: $(u) ? n.requestDataName(Mc.Main) : n.requestDataName(Mc.Raw),
                field: n.vgField(i, ya(f, i) ? {binSuffix: "range"} : {}),
                sort: !0 !== u && l(u) ? u : {field: n.vgField(i, {}), op: "min"}
            }]);
            {
                const {bin: e} = f;
                if (Fn(e)) {
                    const t = fp(n, f.field, e);
                    return Fc([new Qp((() => {
                        const e = n.getSignalName(t);
                        return "[".concat(e, ".start, ").concat(e, ".stop]")
                    }))])
                }
                return Fc([{data: n.requestDataName(Mc.Main), field: n.vgField(i, {})}])
            }
        }
        if (f.timeUnit && T(["time", "utc"], e) && jr(i, f, Em(n) ? n.encoding[Mt(i)] : void 0, n.stack, n.markDef, n.config)) {
            const e = n.requestDataName(Mc.Main);
            return Fc([{data: e, field: n.vgField(i)}, {data: e, field: n.vgField(i, {suffix: "end"})}])
        }
        return Fc(u ? [{
            data: $(u) ? n.requestDataName(Mc.Main) : n.requestDataName(Mc.Raw),
            field: n.vgField(i),
            sort: u
        }] : [{data: n.requestDataName(Mc.Main), field: n.vgField(i)}])
    }

    function tm(e, t) {
        const {op: n, field: i, order: o} = e;
        return {op: null != n ? n : t ? "sum" : Dr, ...i ? {field: re(i)} : {}, ...o ? {order: o} : {}}
    }

    function nm(e, t) {
        var n;
        const i = e.component.scales[t], o = e.specifiedScales[t].domain,
            r = null === (n = e.fieldDef(t)) || void 0 === n ? void 0 : n.bin, a = xo(o) && o,
            s = Cn(r) && En(r.extent) && r.extent;
        (a || s) && i.set("selectionExtent", null != a ? a : s, !0)
    }

    function im(e, t) {
        const {aggregate: n, type: i} = e;
        return n ? x(n) && !Oe[n] ? {valid: !1, reason: $n(n)} : "quantitative" === i && "log" === t ? {
            valid: !1,
            reason: Kn(e)
        } : {valid: !0} : {valid: !1, reason: Qn(e)}
    }

    function om(e, t, n, i) {
        return e.explicit && t.explicit && si(function (e, t, n, i) {
            return "Conflicting ".concat(t.toString(), ' property "').concat(e.toString(), '" (').concat(P(n), " and ").concat(P(i), "). Using the union of the two domains.")
        }(n, i, e.value, t.value)), {explicit: e.explicit, value: [...e.value, ...t.value]}
    }

    function rm(e) {
        const t = U(e.map((e => {
            if (Ci(e)) {
                const {sort: t, ...n} = e;
                return n
            }
            return e
        })), j), n = U(e.map((e => {
            if (Ci(e)) {
                const t = e.sort;
                return void 0 === t || $(t) || ("op" in t && "count" === t.op && delete t.field, "ascending" === t.order && delete t.order), t
            }
        })).filter((e => void 0 !== e)), j);
        if (0 === t.length) return;
        if (1 === t.length) {
            const t = e[0];
            if (Ci(t) && n.length > 0) {
                let e = n[0];
                if (n.length > 1) si(ti), e = !0; else if (l(e) && "field" in e) {
                    const n = e.field;
                    t.field === n && (e = !e.order || {order: e.order})
                }
                return {...t, sort: e}
            }
            return t
        }
        const i = U(n.map((e => $(e) || !("op" in e) || x(e.op) && e.op in ke ? e : (si(function (e) {
            return "Dropping sort property ".concat(P(e), ' as unioned domains only support boolean or op "count", "min", and "max".')
        }(e)), !0))), j);
        let o;
        1 === i.length ? o = i[0] : i.length > 1 && (si(ti), o = !0);
        const r = U(e.map((e => Ci(e) ? e.data : null)), (e => e));
        if (1 === r.length && null !== r[0]) {
            return {data: r[0], fields: t.map((e => e.field)), ...o ? {sort: o} : {}}
        }
        return {fields: t, ...o ? {sort: o} : {}}
    }

    function am(e) {
        if (Ci(e) && x(e.field)) return e.field;
        if (function (e) {
            return !u(e) && "fields" in e && !("data" in e)
        }(e)) {
            let t;
            for (const n of e.fields) if (Ci(n) && x(n.field)) if (t) {
                if (t !== n.field) return si("Detected faceted independent scales that union domain of multiple fields from different data sources. We will use the first field. The result view size may be incorrect."), t
            } else t = n.field;
            return si("Detected faceted independent scales that union domain of the same fields from different source. We will assume that this is the same field from a different fork of the same data source. However, if this is not the case, the result view size may be incorrect."), t
        }
        if (function (e) {
            return !u(e) && "fields" in e && "data" in e
        }(e)) {
            si("Detected faceted independent scales that union domain of multiple fields from the same data source. We will use the first field. The result view size may be incorrect.");
            const t = e.fields[0];
            return x(t) ? t : void 0
        }
    }

    function sm(e, t) {
        return rm(e.component.scales[t].get("domains").map((t => (Ci(t) && (t.data = e.lookupDataSource(t.data)), t))))
    }

    function cm(e) {
        return _m(e) || Bm(e) ? e.children.reduce(((e, t) => e.concat(cm(t))), um(e)) : um(e)
    }

    function um(e) {
        return J(e.component.scales).reduce(((t, n) => {
            const i = e.component.scales[n];
            if (i.merged) return t;
            const o = i.combine(), {name: r, type: a, selectionExtent: s, domains: c, range: u, reverse: f, ...d} = o,
                p = function (e, t, n, i) {
                    if (en(n)) {
                        if (ki(e)) return {step: {signal: t + "_step"}}
                    } else if (l(e) && Ci(e)) return {...e, data: i.lookupDataSource(e.data)};
                    return e
                }(o.range, r, n, e);
            let m;
            s && (m = function (e, t) {
                const n = t.selection;
                return {signal: nd(e.getSelectionComponent(n, K(n)), t)}
            }(e, s));
            const h = sm(e, n);
            return t.push({
                name: r,
                type: a, ...h ? {domain: h} : {}, ...m ? {domainRaw: m} : {},
                range: p, ...void 0 !== f ? {reverse: f} : {}, ...d
            }), t
        }), [])
    }

    class lm extends Ac {
        constructor(e, t) {
            super({}, {name: e}), Bn(this, "merged", !1), this.setWithExplicit("type", t)
        }

        domainDefinitelyIncludesZero() {
            return !1 !== this.get("zero") || L(this.get("domains"), (e => u(e) && 2 === e.length && e[0] <= 0 && e[1] >= 0))
        }
    }

    const fm = ["range", "scheme"];

    function dm(e) {
        return "x" === e ? "width" : "y" === e ? "height" : void 0
    }

    function pm(e, t) {
        const n = e.fieldDef(t);
        if (n && n.bin && Fn(n.bin)) {
            const i = fp(e, n.field, n.bin), o = dm(t), r = e.getName(o);
            return new Qp((() => {
                const t = e.getSignalName(i), n = "(".concat(t, ".stop - ").concat(t, ".start) / ").concat(t, ".step");
                return "".concat(e.getSignalName(r), " / (").concat(n, ")")
            }))
        }
    }

    function mm(e, t) {
        const n = t.specifiedScales[e], {size: i} = t, o = t.getScaleComponent(e).get("type");
        for (const i of fm) if (void 0 !== n[i]) {
            const r = Bo(o, i), a = _o(e, i);
            if (r) if (a) si(a); else switch (i) {
                case"range": {
                    const i = n.range;
                    if (u(i)) {
                        if (en(e)) return Dc(i.map((e => {
                            if ("width" === e || "height" === e) {
                                const n = t.getName(e), i = t.getSignalName.bind(t);
                                return Qp.fromName(i, n)
                            }
                            return e
                        })))
                    } else if (l(i)) return Dc({
                        data: t.requestDataName(Mc.Main),
                        field: i.field,
                        sort: {op: "min", field: t.vgField(e)}
                    });
                    return Dc(i)
                }
                case"scheme":
                    return Dc(hm(n[i]))
            } else si(Zn(o, i, e))
        }
        if (e === Me || e === Te) {
            const t = e === Me ? "width" : "height", n = i[t];
            if (Os(n)) {
                if (go(o)) return Dc({step: n.step});
                si(ei(t))
            }
        }
        const {rangeMin: r, rangeMax: a} = n, s = function (e, t) {
            const {size: n, config: i, mark: o, encoding: r} = t, a = t.getSignalName.bind(t), {type: s} = ua(r[e]),
                c = t.getScaleComponent(e).get("type"), {domain: l, domainMid: f} = t.specifiedScales[e];
            switch (e) {
                case Me:
                case Te: {
                    if (T(["point", "band"], c)) if (e !== Me || n.width) {
                        if (e === Te && !n.height) {
                            const e = Ts(i.view, "height");
                            if (Os(e)) return e
                        }
                    } else {
                        const e = Ts(i.view, "width");
                        if (Os(e)) return e
                    }
                    const o = dm(e), r = t.getName(o);
                    return e === Te && vo(c) ? [Qp.fromName(a, r), 0] : [0, Qp.fromName(a, r)]
                }
                case Ke: {
                    const r = gm(o, t.component.scales[e].get("zero"), i), a = function (e, t, n, i) {
                        const o = {x: pm(n, "x"), y: pm(n, "y")};
                        switch (e) {
                            case"bar":
                            case"tick": {
                                if (void 0 !== i.scale.maxBandSize) return i.scale.maxBandSize;
                                const e = ym(t, o, i.view);
                                return b(e) ? e - 1 : new Qp((() => "".concat(e.signal, " - 1")))
                            }
                            case"line":
                            case"trail":
                            case"rule":
                                return i.scale.maxStrokeWidth;
                            case"text":
                                return i.scale.maxFontSize;
                            case"point":
                            case"square":
                            case"circle": {
                                if (i.scale.maxSize) return i.scale.maxSize;
                                const e = ym(t, o, i.view);
                                return b(e) ? Math.pow(vm * e, 2) : new Qp((() => "pow(".concat(vm, " * ").concat(e.signal, ", 2)")))
                            }
                        }
                        throw new Error(Yn("size", e))
                    }(o, n, t, i);
                    return bo(c) ? function (e, t, n) {
                        const i = () => {
                            const i = Ca(t), o = Ca(e), r = "(".concat(i, " - ").concat(o, ") / (").concat(n, " - 1)");
                            return "sequence(".concat(o, ", ").concat(i, " + ").concat(r, ", ").concat(r, ")")
                        };
                        return Fi(t) ? new Qp(i) : {signal: i()}
                    }(r, a, function (e, t, n, i) {
                        switch (e) {
                            case"quantile":
                                return t.scale.quantileCount;
                            case"quantize":
                                return t.scale.quantizeCount;
                            case"threshold":
                                return void 0 !== n && u(n) ? n.length + 1 : (si(function (e) {
                                    return "Domain for ".concat(e, " is required for threshold scale.")
                                }(i)), 3)
                        }
                    }(c, i, l, e)) : [r, a]
                }
                case Ue:
                    return [0, 2 * Math.PI];
                case Ze:
                    return [0, 360];
                case Re:
                    return [0, new Qp((() => {
                        const e = t.getSignalName("width"), n = t.getSignalName("height");
                        return "min(".concat(e, ",").concat(n, ")/2")
                    }))];
                case it:
                    return [i.scale.minStrokeWidth, i.scale.maxStrokeWidth];
                case ot:
                    return [[1, 0], [4, 2], [2, 1], [1, 1], [1, 2, 4, 2]];
                case $e:
                    return "symbol";
                case Je:
                case Xe:
                case Qe:
                    return "ordinal" === c ? "nominal" === s ? "category" : "ordinal" : void 0 !== f ? "diverging" : "rect" === o || "geoshape" === o ? "heatmap" : "ramp";
                case et:
                case tt:
                case nt:
                    return [i.scale.minOpacity, i.scale.maxOpacity]
            }
            throw new Error("Scale range undefined for channel ".concat(e))
        }(e, t);
        return (void 0 !== r || void 0 !== a) && Bo(o, "rangeMin") && u(s) && 2 === s.length ? Dc([null != r ? r : s[0], null != a ? a : s[1]]) : Fc(s)
    }

    function hm(e) {
        return function (e) {
            return !x(e) && !!e.name
        }(e) ? {scheme: e.name, ...N(e, ["name"])} : {scheme: e}
    }

    function gm(e, t, n) {
        if (t) return Fi(t) ? {signal: "".concat(t.signal, " ? 0 : ").concat(gm(e, !1, n))} : 0;
        switch (e) {
            case"bar":
            case"tick":
                return n.scale.minBandSize;
            case"line":
            case"trail":
            case"rule":
                return n.scale.minStrokeWidth;
            case"text":
                return n.scale.minFontSize;
            case"point":
            case"square":
            case"circle":
                return n.scale.minSize
        }
        throw new Error(Yn("size", e))
    }

    const vm = .95;

    function ym(e, t, n) {
        const i = Os(e.width) ? e.width.step : Ms(n, "width"), o = Os(e.height) ? e.height.step : Ms(n, "height");
        return t.x || t.y ? new Qp((() => {
            const e = [t.x ? t.x.signal : i, t.y ? t.y.signal : o];
            return "min(".concat(e.join(", "), ")")
        })) : Math.min(i, o)
    }

    function bm(e, t) {
        Em(e) ? function (e, t) {
            const n = e.component.scales, {config: i, encoding: o, markDef: r, specifiedScales: a} = e;
            for (const s of J(n)) {
                const c = a[s], u = n[s], l = e.getScaleComponent(s), f = ua(o[s]), d = c[t], p = l.get("type"),
                    m = l.get("padding"), h = l.get("paddingInner"), g = Bo(p, t), v = _o(s, t);
                if (void 0 !== d && (g ? v && si(v) : si(Zn(p, t, s))), g && void 0 === v) if (void 0 !== d) {
                    const e = f.timeUnit, n = f.type;
                    switch (t) {
                        case"domainMax":
                        case"domainMin":
                            ci(c[t]) || "temporal" === n || e ? u.set(t, {
                                signal: ga(c[t], {
                                    type: n,
                                    timeUnit: e
                                })
                            }, !0) : u.set(t, c[t], !0);
                            break;
                        default:
                            u.copyKeyFromObject(t, c)
                    }
                } else {
                    const n = t in xm ? xm[t]({
                        model: e,
                        channel: s,
                        fieldOrDatumDef: f,
                        scaleType: p,
                        scalePadding: m,
                        scalePaddingInner: h,
                        domain: c.domain,
                        markDef: r,
                        config: i
                    }) : i.scale[t];
                    void 0 !== n && u.set(t, n, !1)
                }
            }
        }(e, t) : Am(e, t)
    }

    const xm = {
        bins: ({model: e, fieldOrDatumDef: t}) => qr(t) ? function (e, t) {
            const n = t.bin;
            if (Fn(n)) {
                const i = fp(e, t.field, n);
                return new Qp((() => e.getSignalName(i)))
            }
            if (kn(n) && Cn(n) && void 0 !== n.step) return {step: n.step};
            return
        }(e, t) : void 0,
        interpolate: ({channel: e, fieldOrDatumDef: t}) => function (e, t) {
            if (T([Je, Xe, Qe], e) && "nominal" !== t) return "hcl";
            return
        }(e, t.type),
        nice: ({scaleType: e, channel: t, fieldOrDatumDef: n}) => function (e, t, n) {
            var i;
            if ((null === (i = ca(n)) || void 0 === i ? void 0 : i.bin) || T([Ki, Zi], e)) return;
            return t in Kt || void 0
        }(e, t, n),
        padding: ({channel: e, scaleType: t, fieldOrDatumDef: n, markDef: i, config: o}) => function (e, t, n, i, o, r) {
            if (e in Kt) {
                if (yo(t)) {
                    if (void 0 !== n.continuousPadding) return n.continuousPadding;
                    const {type: t, orient: a} = o;
                    if ("bar" === t && (!qr(i) || !i.bin && !i.timeUnit) && ("vertical" === a && "x" === e || "horizontal" === a && "y" === e)) return r.continuousBandSize
                }
                if (t === io) return n.pointPadding
            }
            return
        }(e, t, o.scale, n, i, o.bar),
        paddingInner: ({scalePadding: e, channel: t, markDef: n, config: i}) => function (e, t, n, i) {
            if (void 0 !== e) return;
            if (t in Kt) {
                const {bandPaddingInner: e, barBandPaddingInner: t, rectBandPaddingInner: o} = i;
                return ue(e, "bar" === n ? t : o)
            }
            return
        }(e, t, n.type, i.scale),
        paddingOuter: ({scalePadding: e, channel: t, scaleType: n, markDef: i, scalePaddingInner: o, config: r}) => function (e, t, n, i, o, r) {
            if (void 0 !== e) return;
            if (t in Kt && n === oo) {
                const {bandPaddingOuter: e} = r;
                return ue(e, Fi(o) ? {signal: "".concat(o.signal, "/2")} : o / 2)
            }
            return
        }(e, t, n, i.type, o, r.scale),
        reverse: ({fieldOrDatumDef: e, scaleType: t, channel: n, config: i}) => function (e, t, n, i) {
            if ("x" === n && void 0 !== i.xReverse) return vo(e) && "descending" === t ? Fi(i.xReverse) ? {signal: "!".concat(i.xReverse.signal)} : !i.xReverse : i.xReverse;
            if (vo(e) && "descending" === t) return !0;
            return
        }(t, qr(e) ? e.sort : void 0, n, i.scale),
        zero: ({channel: e, fieldOrDatumDef: t, domain: n, markDef: i, scaleType: o}) => function (e, t, n, i, o) {
            if (n && "unaggregated" !== n && vo(o)) {
                if (u(n)) {
                    const e = n[0], t = n[n.length - 1];
                    if (e <= 0 && t >= 0) return !0
                }
                return !1
            }
            if ("size" === e && "quantitative" === t.type && !bo(o)) return !0;
            if ((!qr(t) || !t.bin) && T([...Zt, ...nn], e)) {
                const {orient: t, type: n} = i;
                return !T(["bar", "area", "line", "trail"], n) || !("horizontal" === t && "y" === e || "vertical" === t && "x" === e)
            }
            return !1
        }(e, t, n, i, o)
    };

    function wm(e) {
        Em(e) ? function (e) {
            const t = e.component.scales;
            for (const n of gn) {
                const i = t[n];
                if (!i) continue;
                const o = mm(n, e);
                i.setWithExplicit("range", o)
            }
        }(e) : Am(e, "range")
    }

    function Am(e, t) {
        const n = e.component.scales;
        for (const n of e.children) "range" === t ? wm(n) : bm(n, t);
        for (const i of J(n)) {
            let o;
            for (const n of e.children) {
                const e = n.component.scales[i];
                if (e) {
                    o = Ec(o, e.getWithExplicit(t), t, "scale", kc(((e, n) => {
                        switch (t) {
                            case"range":
                                return e.step && n.step ? e.step - n.step : 0
                        }
                        return 0
                    })))
                }
            }
            n[i].setWithExplicit(t, o)
        }
    }

    function Dm(e, t, n, i) {
        const o = function (e, t, n) {
            var i;
            switch (t.type) {
                case"nominal":
                case"ordinal":
                    if (yt(e) || "discrete" === An(e)) return "shape" === e && "ordinal" === t.type && si(Xn(e, "ordinal")), "ordinal";
                    if (e in Kt) {
                        if (T(["rect", "bar", "image", "rule"], n)) return "band"
                    } else if ("arc" === n && e in tn) return "band";
                    return void 0 !== t.band || Jr(t) && (null === (i = t.axis) || void 0 === i ? void 0 : i.tickBand) ? "band" : "point";
                case"temporal":
                    return yt(e) ? "time" : "discrete" === An(e) ? (si(Xn(e, "temporal")), "ordinal") : qr(t) && t.timeUnit && Di(t.timeUnit).utc ? "utc" : "time";
                case"quantitative":
                    return yt(e) ? qr(t) && Fn(t.bin) ? "bin-ordinal" : "linear" : "discrete" === An(e) ? (si(Xn(e, "quantitative")), "ordinal") : "linear";
                case"geojson":
                    return
            }
            throw new Error(Hn(t.type))
        }(t, n, i), {type: r} = e;
        return vn(t) ? void 0 !== r ? function (e, t) {
            if (!vn(e)) return !1;
            switch (e) {
                case Me:
                case Te:
                case Ue:
                case Re:
                    return yo(t) || T(["band", "point"], t);
                case Ke:
                case it:
                case et:
                case tt:
                case nt:
                case Ze:
                    return yo(t) || bo(t) || T(["band", "point", "ordinal"], t);
                case Je:
                case Xe:
                case Qe:
                    return "band" !== t;
                case ot:
                    return "ordinal" === t || bo(t);
                case $e:
                    return "ordinal" === t
            }
        }(t, r) ? qr(n) && (a = r, s = n.type, !(T([Ii, Gi], s) ? void 0 === a || go(a) : s === Hi ? T([Ki, Zi, void 0], a) : s !== Ui || T([Ji, Xi, Qi, $i, eo, to, no, Yi, void 0], a))) ? (si(function (e, t) {
            return 'FieldDef does not work with "'.concat(e, '" scale. We are using "').concat(t, '" scale instead.')
        }(r, o)), o) : r : (si(function (e, t, n) {
            return 'Channel "'.concat(e, '" does not work with "').concat(t, '" scale. We are using "').concat(n, '" scale instead.')
        }(t, r, o)), o) : o : null;
        var a, s
    }

    function Fm(e) {
        Em(e) ? e.component.scales = function (e) {
            const {encoding: t, mark: n} = e;
            return gn.reduce(((i, o) => {
                const r = ua(t[o]);
                if (r && n === Yo && o === $e && r.type === Vi) return i;
                let a = r && r.scale;
                if (r && null !== a && !1 !== a) {
                    var s;
                    a = null !== (s = a) && void 0 !== s ? s : {};
                    const t = Dm(a, o, r, n);
                    i[o] = new lm(e.scaleName(o + "", !0), {value: t, explicit: a.type === t})
                }
                return i
            }), {})
        }(e) : e.component.scales = function (e) {
            const t = e.component.scales = {}, n = {}, i = e.component.resolve;
            for (const t of e.children) {
                Fm(t);
                for (const r of J(t.component.scales)) {
                    var o;
                    if (i.scale[r] = null !== (o = i.scale[r]) && void 0 !== o ? o : qd(r, e), "shared" === i.scale[r]) {
                        const e = n[r], o = t.component.scales[r].getWithExplicit("type");
                        e ? ao(e.value, o.value) ? n[r] = Ec(e, o, "type", "scale", km) : (i.scale[r] = "independent", delete n[r]) : n[r] = o
                    }
                }
            }
            for (const i of J(n)) {
                const o = e.scaleName(i, !0), r = n[i];
                t[i] = new lm(o, r);
                for (const t of e.children) {
                    const e = t.component.scales[i];
                    e && (t.renameScale(e.get("name"), o), e.merged = !0)
                }
            }
            return t
        }(e)
    }

    const km = kc(((e, t) => co(e) - co(t)));

    class Cm {
        constructor() {
            Bn(this, "nameMap", void 0), this.nameMap = {}
        }

        rename(e, t) {
            this.nameMap[e] = t
        }

        has(e) {
            return void 0 !== this.nameMap[e]
        }

        get(e) {
            for (; this.nameMap[e] && e !== this.nameMap[e];) e = this.nameMap[e];
            return e
        }
    }

    function Em(e) {
        return "unit" === (null == e ? void 0 : e.type)
    }

    function Sm(e) {
        return "facet" === (null == e ? void 0 : e.type)
    }

    function Bm(e) {
        return "concat" === (null == e ? void 0 : e.type)
    }

    function _m(e) {
        return "layer" === (null == e ? void 0 : e.type)
    }

    class zm {
        constructor(e, t, n, i, o, r, a) {
            var s, c;
            this.type = t, this.parent = n, this.config = o, Bn(this, "name", void 0), Bn(this, "size", void 0), Bn(this, "title", void 0), Bn(this, "description", void 0), Bn(this, "data", void 0), Bn(this, "transforms", void 0), Bn(this, "layout", void 0), Bn(this, "scaleNameMap", void 0), Bn(this, "projectionNameMap", void 0), Bn(this, "signalNameMap", void 0), Bn(this, "component", void 0), Bn(this, "view", void 0), Bn(this, "children", []), Bn(this, "correctDataNames", (e => (e.from && e.from.data && (e.from.data = this.lookupDataSource(e.from.data)), e.from && e.from.facet && e.from.facet.data && (e.from.facet.data = this.lookupDataSource(e.from.facet.data)), e))), this.parent = n, this.config = o, this.view = Oo(a), this.name = null !== (s = e.name) && void 0 !== s ? s : i, this.title = xa(e.title) ? {text: e.title} : e.title ? this.initTitle(e.title) : void 0, this.scaleNameMap = n ? n.scaleNameMap : new Cm, this.projectionNameMap = n ? n.projectionNameMap : new Cm, this.signalNameMap = n ? n.signalNameMap : new Cm, this.data = e.data, this.description = e.description, this.transforms = (null !== (c = e.transform) && void 0 !== c ? c : []).map((e => Tc(e) ? {filter: B(e.filter, Wi)} : e)), this.layout = "layer" === t || "unit" === t ? {} : function (e, t, n) {
                const i = n[t], o = {}, {spacing: r, columns: a} = i;
                void 0 !== r && (o.spacing = r), void 0 !== a && (zr(e) && !Br(e.facet) || Es(e)) && (o.columns = a), Ss(e) && (o.columns = 1);
                for (const t of Ps) if (void 0 !== e[t]) if ("spacing" === t) {
                    var s, c;
                    const n = e[t];
                    o[t] = b(n) ? n : {
                        row: null !== (s = n.row) && void 0 !== s ? s : r,
                        column: null !== (c = n.column) && void 0 !== c ? c : r
                    }
                } else o[t] = e[t];
                return o
            }(e, t, o), this.component = {
                data: {
                    sources: n ? n.component.data.sources : [],
                    outputNodes: n ? n.component.data.outputNodes : {},
                    outputNodeRefCounts: n ? n.component.data.outputNodeRefCounts : {},
                    isFaceted: zr(e) || n && n.component.data.isFaceted && void 0 === e.data
                },
                layoutSize: new Ac,
                layoutHeaders: {row: {}, column: {}, facet: {}},
                mark: null,
                resolve: {scale: {}, axis: {}, legend: {}, ...r ? z(r) : {}},
                selection: null,
                scales: null,
                projection: null,
                axes: {},
                legends: {}
            }
        }

        initTitle(e) {
            const t = J(e), n = {text: Aa(e.text)};
            for (const i of t) n[i] = Aa(e[i]);
            return n
        }

        get width() {
            return this.getSizeSignalRef("width")
        }

        get height() {
            return this.getSizeSignalRef("height")
        }

        parse() {
            this.parseScale(), this.parseLayoutSize(), this.renameTopLevelLayoutSizeSignal(), this.parseSelections(), this.parseProjection(), this.parseData(), this.parseAxesAndHeaders(), this.parseLegends(), this.parseMarkGroup()
        }

        parseScale() {
            !function (e, {ignoreRange: t} = {}) {
                Fm(e), $p(e);
                for (const t of So) bm(e, t);
                t || wm(e)
            }(this)
        }

        parseProjection() {
            cp(this)
        }

        renameTopLevelLayoutSizeSignal() {
            "width" !== this.getName("width") && this.renameSignal(this.getName("width"), "width"), "height" !== this.getName("height") && this.renameSignal(this.getName("height"), "height")
        }

        parseLegends() {
            Kd(this)
        }

        assembleGroupStyle() {
            var e, t;
            if ("unit" === this.type || "layer" === this.type) return null !== (e = null === (t = this.view) || void 0 === t ? void 0 : t.style) && void 0 !== e ? e : "cell"
        }

        assembleEncodeFromView(e) {
            const {style: t, ...n} = e, i = {};
            for (const e of J(n)) {
                const t = n[e];
                void 0 !== t && (i[e] = Fa(t))
            }
            return i
        }

        assembleGroupEncodeEntry(e) {
            let t = {};
            var n;
            if ((this.view && (t = this.assembleEncodeFromView(this.view)), !e) && (this.description && (t.description = Fa(this.description)), "unit" === this.type || "layer" === this.type)) return {
                width: this.getSizeSignalRef("width"),
                height: this.getSizeSignalRef("height"), ...null !== (n = t) && void 0 !== n ? n : {}
            };
            return Y(t) ? void 0 : t
        }

        assembleLayout() {
            if (!this.layout) return;
            const {spacing: e, ...t} = this.layout, {component: n, config: i} = this, o = function (e, t) {
                const n = {};
                for (const i of xt) {
                    const o = e[i];
                    if (null == o ? void 0 : o.facetFieldDef) {
                        const {titleAnchor: e, titleOrient: r} = xd(["titleAnchor", "titleOrient"], o.facetFieldDef.header, t, i),
                            a = yd(i, r), s = zd(e, a);
                        void 0 !== s && (n[a] = s)
                    }
                }
                return Y(n) ? void 0 : n
            }(n.layoutHeaders, i);
            return {padding: e, ...this.assembleDefaultLayout(), ...t, ...o ? {titleBand: o} : {}}
        }

        assembleDefaultLayout() {
            return {}
        }

        assembleHeaderMarks() {
            const {layoutHeaders: e} = this.component;
            let t = [];
            for (const n of xt) e[n].title && t.push(Dd(this, n));
            for (const e of wd) t = t.concat(Cd(this, e));
            return t
        }

        assembleAxes() {
            return function (e, t) {
                const {x: n = [], y: i = []} = e;
                return [...n.map((e => rd(e, "grid", t))), ...i.map((e => rd(e, "grid", t))), ...n.map((e => rd(e, "main", t))), ...i.map((e => rd(e, "main", t)))].filter((e => e))
            }(this.component.axes, this.config)
        }

        assembleLegends() {
            return ip(this)
        }

        assembleProjections() {
            return op(this)
        }

        assembleTitle() {
            var e;
            const {encoding: t, ...n} = null !== (e = this.title) && void 0 !== e ? e : {},
                i = {...ba(this.config.title).nonMark, ...n, ...t ? {encode: {update: t}} : {}};
            if (i.text) {
                var o, r;
                if (T(["unit", "layer"], this.type)) {
                    if (T(["middle", void 0], i.anchor)) i.frame = null !== (o = i.frame) && void 0 !== o ? o : "group"
                } else i.anchor = null !== (r = i.anchor) && void 0 !== r ? r : "start";
                return Y(i) ? void 0 : i
            }
        }

        assembleGroup(e = []) {
            const t = {};
            (e = e.concat(this.assembleSignals())).length > 0 && (t.signals = e);
            const n = this.assembleLayout();
            n && (t.layout = n), t.marks = [].concat(this.assembleHeaderMarks(), this.assembleMarks());
            const i = !this.parent || Sm(this.parent) ? cm(this) : [];
            i.length > 0 && (t.scales = i);
            const o = this.assembleAxes();
            o.length > 0 && (t.axes = o);
            const r = this.assembleLegends();
            return r.length > 0 && (t.legends = r), t
        }

        getName(e) {
            return K((this.name ? this.name + "_" : "") + e)
        }

        getDataName(e) {
            return this.getName(Mc[e].toLowerCase())
        }

        requestDataName(e) {
            const t = this.getDataName(e), n = this.component.data.outputNodeRefCounts;
            return n[t] = (n[t] || 0) + 1, t
        }

        getSizeSignalRef(e) {
            if (Sm(this.parent)) {
                const t = on(Td(e)), n = this.component.scales[t];
                if (n && !n.merged) {
                    const e = n.get("type"), i = n.get("range");
                    if (go(e) && ki(i)) {
                        const e = n.get("name"), i = am(sm(this, t));
                        if (i) {
                            return {signal: Md(e, n, Kr({aggregate: "distinct", field: i}, {expr: "datum"}))}
                        }
                        return si(Mn(t)), null
                    }
                }
            }
            return {signal: this.signalNameMap.get(this.getName(e))}
        }

        lookupDataSource(e) {
            const t = this.component.data.outputNodes[e];
            return t ? t.getSource() : e
        }

        getSignalName(e) {
            return this.signalNameMap.get(e)
        }

        renameSignal(e, t) {
            this.signalNameMap.rename(e, t)
        }

        renameScale(e, t) {
            this.scaleNameMap.rename(e, t)
        }

        renameProjection(e, t) {
            this.projectionNameMap.rename(e, t)
        }

        scaleName(e, t) {
            return t ? this.getName(e) : zt(e) && vn(e) && this.component.scales[e] || this.scaleNameMap.has(this.getName(e)) ? this.scaleNameMap.get(this.getName(e)) : void 0
        }

        projectionName(e) {
            return e ? this.getName("projection") : this.component.projection && !this.component.projection.merged || this.projectionNameMap.has(this.getName("projection")) ? this.projectionNameMap.get(this.getName("projection")) : void 0
        }

        getScaleComponent(e) {
            if (!this.component.scales) throw new Error("getScaleComponent cannot be called before parseScale(). Make sure you have called parseScale or use parseUnitModelWithScale().");
            const t = this.component.scales[e];
            return t && !t.merged ? t : this.parent ? this.parent.getScaleComponent(e) : void 0
        }

        getSelectionComponent(e, t) {
            let n = this.component.selection[e];
            if (!n && this.parent && (n = this.parent.getSelectionComponent(e, t)), !n) throw new Error('Cannot find a selection named "'.concat(t, '".'));
            return n
        }

        hasAxisOrientSignalRef() {
            var e, t;
            return (null === (e = this.component.axes.x) || void 0 === e ? void 0 : e.some((e => e.hasOrientSignalRef()))) || (null === (t = this.component.axes.y) || void 0 === t ? void 0 : t.some((e => e.hasOrientSignalRef())))
        }
    }

    class Om extends zm {
        vgField(e, t = {}) {
            const n = this.fieldDef(e);
            if (n) return Kr(n, t)
        }

        reduceFieldDef(e, t) {
            return function (e, t, n, i) {
                return e ? J(e).reduce(((n, o) => {
                    const r = e[o];
                    return u(r) ? r.reduce(((e, n) => t.call(i, e, n, o)), n) : t.call(i, n, r, o)
                }), n) : n
            }(this.getMapping(), ((t, n, i) => {
                const o = ca(n);
                return o ? e(t, o, i) : t
            }), t)
        }

        forEachFieldDef(e, t) {
            Ha(this.getMapping(), ((t, n) => {
                const i = ca(t);
                i && e(i, n)
            }), t)
        }
    }

    class Nm extends Hu {
        clone() {
            return new Nm(null, z(this.transform))
        }

        constructor(e, t) {
            var n, i, o;
            super(e), this.transform = t, this.transform = z(t);
            const r = null !== (n = this.transform.as) && void 0 !== n ? n : [void 0, void 0];
            this.transform.as = [null !== (i = r[0]) && void 0 !== i ? i : "value", null !== (o = r[1]) && void 0 !== o ? o : "density"]
        }

        dependentFields() {
            var e;
            return new Set([this.transform.density, ...null !== (e = this.transform.groupby) && void 0 !== e ? e : []])
        }

        producedFields() {
            return new Set(this.transform.as)
        }

        hash() {
            return "DensityTransform ".concat(j(this.transform))
        }

        assemble() {
            const {density: e, ...t} = this.transform;
            return {type: "kde", field: e, ...t}
        }
    }

    class Pm extends Hu {
        clone() {
            return new Pm(null, {...this.filter})
        }

        constructor(e, t) {
            super(e), this.filter = t
        }

        static make(e, t) {
            const {config: n, mark: i, markDef: o} = t;
            if ("filter" !== Ba("invalid", o, n)) return null;
            const r = t.reduceFieldDef(((e, n, o) => {
                const r = vn(o) && t.getScaleComponent(o);
                if (r) {
                    vo(r.get("type")) && "count" !== n.aggregate && !Jo(i) && (e[n.field] = n)
                }
                return e
            }), {});
            return J(r).length ? new Pm(e, r) : null
        }

        dependentFields() {
            return new Set(J(this.filter))
        }

        producedFields() {
            return new Set
        }

        hash() {
            return "FilterInvalid ".concat(j(this.filter))
        }

        assemble() {
            const e = J(this.filter).reduce(((e, t) => {
                const n = this.filter[t], i = Kr(n, {expr: "datum"});
                return null !== n && ("temporal" === n.type ? e.push("(isDate(".concat(i, ") || (isValid(").concat(i, ") && isFinite(+").concat(i, ")))")) : "quantitative" === n.type && (e.push("isValid(".concat(i, ")")), e.push("isFinite(+".concat(i, ")")))), e
            }), []);
            return e.length > 0 ? {type: "filter", expr: e.join(" && ")} : null
        }
    }

    class jm extends Hu {
        clone() {
            return new jm(this.parent, z(this.transform))
        }

        constructor(e, t) {
            super(e), this.transform = t, this.transform = z(t);
            const {flatten: n, as: i = []} = this.transform;
            this.transform.as = n.map(((e, t) => {
                var n;
                return null !== (n = i[t]) && void 0 !== n ? n : e
            }))
        }

        dependentFields() {
            return new Set(this.transform.flatten)
        }

        producedFields() {
            return new Set(this.transform.as)
        }

        hash() {
            return "FlattenTransform ".concat(j(this.transform))
        }

        assemble() {
            const {flatten: e, as: t} = this.transform;
            return {type: "flatten", fields: e, as: t}
        }
    }

    class Mm extends Hu {
        clone() {
            return new Mm(null, z(this.transform))
        }

        constructor(e, t) {
            var n, i, o;
            super(e), this.transform = t, this.transform = z(t);
            const r = null !== (n = this.transform.as) && void 0 !== n ? n : [void 0, void 0];
            this.transform.as = [null !== (i = r[0]) && void 0 !== i ? i : "key", null !== (o = r[1]) && void 0 !== o ? o : "value"]
        }

        dependentFields() {
            return new Set(this.transform.fold)
        }

        producedFields() {
            return new Set(this.transform.as)
        }

        hash() {
            return "FoldTransform ".concat(j(this.transform))
        }

        assemble() {
            const {fold: e, as: t} = this.transform;
            return {type: "fold", fields: e, as: t}
        }
    }

    class Tm extends Hu {
        clone() {
            return new Tm(null, z(this.fields), this.geojson, this.signal)
        }

        static parseAll(e, t) {
            if (t.component.projection && !t.component.projection.isFit) return e;
            let n = 0;
            for (const i of [[Ge, He], [Ye, Ve]]) {
                const o = i.map((e => {
                    const n = ua(t.encoding[e]);
                    return qr(n) ? n.field : Wr(n) ? {expr: "".concat(n.datum)} : Vr(n) ? {expr: "".concat(n.value)} : void 0
                }));
                (o[0] || o[1]) && (e = new Tm(e, o, null, t.getName("geojson_".concat(n++))))
            }
            if (t.channelHasField($e)) {
                const i = t.typedFieldDef($e);
                i.type === Vi && (e = new Tm(e, null, i.field, t.getName("geojson_".concat(n++))))
            }
            return e
        }

        constructor(e, t, n, i) {
            super(e), this.fields = t, this.geojson = n, this.signal = i
        }

        dependentFields() {
            var e;
            const t = (null !== (e = this.fields) && void 0 !== e ? e : []).filter(x);
            return new Set([...this.geojson ? [this.geojson] : [], ...t])
        }

        producedFields() {
            return new Set
        }

        hash() {
            return "GeoJSON ".concat(this.geojson, " ").concat(this.signal, " ").concat(j(this.fields))
        }

        assemble() {
            return {
                type: "geojson", ...this.fields ? {fields: this.fields} : {}, ...this.geojson ? {geojson: this.geojson} : {},
                signal: this.signal
            }
        }
    }

    class Lm extends Hu {
        clone() {
            return new Lm(null, this.projection, z(this.fields), z(this.as))
        }

        constructor(e, t, n, i) {
            super(e), this.projection = t, this.fields = n, this.as = i
        }

        static parseAll(e, t) {
            if (!t.projectionName()) return e;
            for (const n of [[Ge, He], [Ye, Ve]]) {
                const i = n.map((e => {
                    const n = ua(t.encoding[e]);
                    return qr(n) ? n.field : Wr(n) ? {expr: "".concat(n.datum)} : Vr(n) ? {expr: "".concat(n.value)} : void 0
                })), o = n[0] === Ye ? "2" : "";
                (i[0] || i[1]) && (e = new Lm(e, t.projectionName(), i, [t.getName("x" + o), t.getName("y" + o)]))
            }
            return e
        }

        dependentFields() {
            return new Set(this.fields.filter(x))
        }

        producedFields() {
            return new Set(this.as)
        }

        hash() {
            return "Geopoint ".concat(this.projection, " ").concat(j(this.fields), " ").concat(j(this.as))
        }

        assemble() {
            return {type: "geopoint", projection: this.projection, fields: this.fields, as: this.as}
        }
    }

    class qm extends Hu {
        clone() {
            return new qm(null, z(this.transform))
        }

        constructor(e, t) {
            super(e), this.transform = t
        }

        dependentFields() {
            var e;
            return new Set([this.transform.impute, this.transform.key, ...null !== (e = this.transform.groupby) && void 0 !== e ? e : []])
        }

        producedFields() {
            return new Set([this.transform.impute])
        }

        processSequence(e) {
            const {start: t = 0, stop: n, step: i} = e, o = [t, n, ...i ? [i] : []].join(",");
            return {signal: "sequence(".concat(o, ")")}
        }

        static makeFromTransform(e, t) {
            return new qm(e, t)
        }

        static makeFromEncoding(e, t) {
            const n = t.encoding, i = n.x, o = n.y;
            if (qr(i) && qr(o)) {
                const r = i.impute ? i : o.impute ? o : void 0;
                if (void 0 === r) return;
                const a = i.impute ? o : o.impute ? i : void 0, {method: s, value: c, frame: u, keyvals: l} = r.impute,
                    f = Ga(t.mark, n);
                return new qm(e, {
                    impute: r.field,
                    key: a.field, ...s ? {method: s} : {}, ...void 0 !== c ? {value: c} : {}, ...u ? {frame: u} : {}, ...void 0 !== l ? {keyvals: l} : {}, ...f.length ? {groupby: f} : {}
                })
            }
            return null
        }

        hash() {
            return "Impute ".concat(j(this.transform))
        }

        assemble() {
            const {impute: e, key: t, keyvals: n, method: i, groupby: o, value: r, frame: a = [null, null]} = this.transform,
                s = {
                    type: "impute",
                    field: e,
                    key: t, ...n ? {keyvals: (c = n, void 0 !== (null == c ? void 0 : c.stop) ? this.processSequence(n) : n)} : {},
                    method: "value", ...o ? {groupby: o} : {},
                    value: i && "value" !== i ? null : r
                };
            var c;
            if (i && "value" !== i) {
                return [s, {
                    type: "window",
                    as: ["imputed_".concat(e, "_value")],
                    ops: [i],
                    fields: [e],
                    frame: a,
                    ignorePeers: !1, ...o ? {groupby: o} : {}
                }, {
                    type: "formula",
                    expr: "datum.".concat(e, " === null ? datum.imputed_").concat(e, "_value : datum.").concat(e),
                    as: e
                }]
            }
            return [s]
        }
    }

    class Rm extends Hu {
        clone() {
            return new Rm(null, z(this.transform))
        }

        constructor(e, t) {
            var n, i, o;
            super(e), this.transform = t, this.transform = z(t);
            const r = null !== (n = this.transform.as) && void 0 !== n ? n : [void 0, void 0];
            this.transform.as = [null !== (i = r[0]) && void 0 !== i ? i : t.on, null !== (o = r[1]) && void 0 !== o ? o : t.loess]
        }

        dependentFields() {
            var e;
            return new Set([this.transform.loess, this.transform.on, ...null !== (e = this.transform.groupby) && void 0 !== e ? e : []])
        }

        producedFields() {
            return new Set(this.transform.as)
        }

        hash() {
            return "LoessTransform ".concat(j(this.transform))
        }

        assemble() {
            const {loess: e, on: t, ...n} = this.transform;
            return {type: "loess", x: t, y: e, ...n}
        }
    }

    class Wm extends Hu {
        clone() {
            return new Wm(null, z(this.transform), this.secondary)
        }

        constructor(e, t, n) {
            super(e), this.transform = t, this.secondary = n
        }

        static make(e, t, n, i) {
            const o = t.component.data.sources, {from: r} = n;
            let a = null;
            if (function (e) {
                return "data" in e
            }(r)) {
                let e = nh(r.data, o);
                e || (e = new Fp(r.data), o.push(e));
                const n = t.getName("lookup_".concat(i));
                a = new Gu(e, n, Mc.Lookup, t.component.data.outputNodeRefCounts), t.component.data.outputNodes[n] = a
            } else if (function (e) {
                return "selection" in e
            }(r)) {
                const e = r.selection;
                if (n = {as: e, ...n}, a = t.getSelectionComponent(K(e), e).materialized, !a) throw new Error('Cannot define and lookup the "'.concat(e, '" selection in the same view. ') + "Try moving the lookup into a second, layered view?")
            }
            return new Wm(e, n, a.getSource())
        }

        dependentFields() {
            return new Set([this.transform.lookup])
        }

        producedFields() {
            return new Set(this.transform.as ? h(this.transform.as) : this.transform.from.fields)
        }

        hash() {
            return "Lookup ".concat(j({transform: this.transform, secondary: this.secondary}))
        }

        assemble() {
            let e;
            if (this.transform.from.fields) e = {values: this.transform.from.fields, ...this.transform.as ? {as: h(this.transform.as)} : {}}; else {
                let t = this.transform.as;
                x(t) || (si('If "from.fields" is not specified, "as" has to be a string that specifies the key to be used for the data from the secondary source.'), t = "_lookup"), e = {as: [t]}
            }
            return {
                type: "lookup",
                from: this.secondary,
                key: this.transform.from.key,
                fields: [this.transform.lookup], ...e, ...this.transform.default ? {default: this.transform.default} : {}
            }
        }
    }

    class Um extends Hu {
        clone() {
            return new Um(null, z(this.transform))
        }

        constructor(e, t) {
            var n, i, o;
            super(e), this.transform = t, this.transform = z(t);
            const r = null !== (n = this.transform.as) && void 0 !== n ? n : [void 0, void 0];
            this.transform.as = [null !== (i = r[0]) && void 0 !== i ? i : "prob", null !== (o = r[1]) && void 0 !== o ? o : "value"]
        }

        dependentFields() {
            var e;
            return new Set([this.transform.quantile, ...null !== (e = this.transform.groupby) && void 0 !== e ? e : []])
        }

        producedFields() {
            return new Set(this.transform.as)
        }

        hash() {
            return "QuantileTransform ".concat(j(this.transform))
        }

        assemble() {
            const {quantile: e, ...t} = this.transform;
            return {type: "quantile", field: e, ...t}
        }
    }

    class Im extends Hu {
        clone() {
            return new Im(null, z(this.transform))
        }

        constructor(e, t) {
            var n, i, o;
            super(e), this.transform = t, this.transform = z(t);
            const r = null !== (n = this.transform.as) && void 0 !== n ? n : [void 0, void 0];
            this.transform.as = [null !== (i = r[0]) && void 0 !== i ? i : t.on, null !== (o = r[1]) && void 0 !== o ? o : t.regression]
        }

        dependentFields() {
            var e;
            return new Set([this.transform.regression, this.transform.on, ...null !== (e = this.transform.groupby) && void 0 !== e ? e : []])
        }

        producedFields() {
            return new Set(this.transform.as)
        }

        hash() {
            return "RegressionTransform ".concat(j(this.transform))
        }

        assemble() {
            const {regression: e, on: t, ...n} = this.transform;
            return {type: "regression", x: t, y: e, ...n}
        }
    }

    class Hm extends Hu {
        clone() {
            return new Hm(null, z(this.transform))
        }

        constructor(e, t) {
            super(e), this.transform = t
        }

        addDimensions(e) {
            var t;
            this.transform.groupby = U((null !== (t = this.transform.groupby) && void 0 !== t ? t : []).concat(e), (e => e))
        }

        producedFields() {
        }

        dependentFields() {
            var e;
            return new Set([this.transform.pivot, this.transform.value, ...null !== (e = this.transform.groupby) && void 0 !== e ? e : []])
        }

        hash() {
            return "PivotTransform ".concat(j(this.transform))
        }

        assemble() {
            const {pivot: e, value: t, groupby: n, limit: i, op: o} = this.transform;
            return {
                type: "pivot",
                field: e,
                value: t, ...void 0 !== i ? {limit: i} : {}, ...void 0 !== o ? {op: o} : {}, ...void 0 !== n ? {groupby: n} : {}
            }
        }
    }

    class Gm extends Hu {
        clone() {
            return new Gm(null, z(this.transform))
        }

        constructor(e, t) {
            super(e), this.transform = t
        }

        dependentFields() {
            return new Set
        }

        producedFields() {
            return new Set
        }

        hash() {
            return "SampleTransform ".concat(j(this.transform))
        }

        assemble() {
            return {type: "sample", size: this.transform.sample}
        }
    }

    function Vm(e) {
        let t = 0;
        return function n(i, o) {
            if (i instanceof Fp && !i.isGenerator && !Bc(i.data)) {
                e.push(o);
                o = {name: null, source: o.name, transform: []}
            }
            var r;
            if (i instanceof xp && (i.parent instanceof Fp && !o.source ? (o.format = {
                ...null !== (r = o.format) && void 0 !== r ? r : {},
                parse: i.assembleFormatParse()
            }, o.transform.push(...i.assembleTransforms(!0))) : o.transform.push(...i.assembleTransforms())), i instanceof gp) {
                o.name || (o.name = "data_".concat(t++)), !o.source || o.transform.length > 0 ? (e.push(o), i.data = o.name) : i.data = o.source;
                for (const t of i.assemble()) e.push(t)
            } else {
                if ((i instanceof Ap || i instanceof Dp || i instanceof Pm || i instanceof ed || i instanceof gd || i instanceof Lm || i instanceof Tm || i instanceof hp || i instanceof Wm || i instanceof Ip || i instanceof Wp || i instanceof Mm || i instanceof jm || i instanceof Nm || i instanceof Rm || i instanceof Um || i instanceof Im || i instanceof wp || i instanceof Gm || i instanceof Hm) && o.transform.push(i.assemble()), (i instanceof pp || i instanceof Vu || i instanceof qm || i instanceof Up) && o.transform.push(...i.assemble()), i instanceof Gu) if (o.source && 0 === o.transform.length) i.setSource(o.source); else if (i.parent instanceof Gu) i.setSource(o.name); else if (o.name || (o.name = "data_".concat(t++)), i.setSource(o.name), 1 === i.numChildren()) {
                    e.push(o);
                    o = {name: null, source: o.name, transform: []}
                }
                switch (i.numChildren()) {
                    case 0:
                        i instanceof Gu && (!o.source || o.transform.length > 0) && e.push(o);
                        break;
                    case 1:
                        n(i.children[0], o);
                        break;
                    default: {
                        o.name || (o.name = "data_".concat(t++));
                        let r = o.name;
                        !o.source || o.transform.length > 0 ? e.push(o) : r = o.source;
                        for (const e of i.children) {
                            n(e, {name: null, source: r, transform: []})
                        }
                        break
                    }
                }
            }
        }
    }

    function Ym(e) {
        return "top" === e || "left" === e || Fi(e) ? "header" : "footer"
    }

    function Jm(e, t) {
        const {facet: n, config: i, child: o, component: r} = e;
        if (e.channelHasField(t)) {
            var a;
            const s = n[t], c = bd("title", null, i, t);
            let l = oa(s, i, {allowDisabling: !0, includeDefault: void 0 === c || !!c});
            o.component.layoutHeaders[t].title && (l = u(l) ? l.join(", ") : l, l += " / " + o.component.layoutHeaders[t].title, o.component.layoutHeaders[t].title = null);
            const f = bd("labelOrient", s, i, t),
                d = ue((null !== (a = s.header) && void 0 !== a ? a : {}).labels, i.header.labels, !0),
                p = T(["bottom", "right"], f) ? "footer" : "header";
            r.layoutHeaders[t] = {title: l, facetFieldDef: s, [p]: "facet" === t ? [] : [Xm(e, t, d)]}
        }
    }

    function Xm(e, t, n) {
        const i = "row" === t ? "height" : "width";
        return {
            labels: n,
            sizeSignal: e.child.component.layoutSize.get(i) ? e.child.getSizeSignalRef(i) : void 0,
            axes: []
        }
    }

    function Qm(e, t) {
        const {child: n} = e;
        if (n.component.axes[t]) {
            const {layoutHeaders: o, resolve: r} = e.component;
            if (r.axis[t] = Rd(r, t), "shared" === r.axis[t]) {
                const r = "x" === t ? "column" : "row", a = o[r];
                for (const o of n.component.axes[t]) {
                    var i;
                    const t = Ym(o.get("orient"));
                    a[t] = null !== (i = a[t]) && void 0 !== i ? i : [Xm(e, r, !1)];
                    const n = rd(o, "main", e.config, {header: !0});
                    n && a[t][0].axes.push(n), o.mainExtracted = !0
                }
            }
        }
    }

    function $m(e) {
        for (const t of e.children) t.parseLayoutSize()
    }

    function Km(e, t) {
        const n = Td(t), i = on(n), o = e.component.resolve, r = e.component.layoutSize;
        let a;
        for (const t of e.children) {
            const e = t.component.layoutSize.getWithExplicit(n), r = o.scale[i];
            if ("independent" === r && "step" === e.value) {
                a = void 0;
                break
            }
            if (a) {
                if ("independent" === r && a.value !== e.value) {
                    a = void 0;
                    break
                }
                a = Ec(a, e, n, "")
            } else a = e
        }
        if (a) {
            for (const i of e.children) e.renameSignal(i.getName(n), e.getName(t)), i.component.layoutSize.set(n, "merged", !1);
            r.setWithExplicit(t, a)
        } else r.setWithExplicit(t, {explicit: !1, value: void 0})
    }

    function Zm(e, t) {
        const n = "width" === t ? "x" : "y", i = e.config, o = e.getScaleComponent(n);
        if (o) {
            const e = o.get("type"), n = o.get("range");
            if (go(e)) {
                const e = Ts(i.view, t);
                return ki(n) || Os(e) ? "step" : e
            }
            return js(i.view, t)
        }
        if (e.hasProjection || "arc" === e.mark) return js(i.view, t);
        {
            const e = Ts(i.view, t);
            return Os(e) ? e.step : e
        }
    }

    function eh(e, t, n) {
        return Kr(t, {suffix: "by_".concat(Kr(e)), ...null != n ? n : {}})
    }

    class th extends Om {
        constructor(e, t, n, i) {
            super(e, "facet", t, n, i, e.resolve), Bn(this, "facet", void 0), Bn(this, "child", void 0), Bn(this, "children", void 0), this.child = Eh(e.spec, this, this.getName("child"), void 0, i), this.children = [this.child], this.facet = this.initFacet(e.facet)
        }

        initFacet(e) {
            if (!Br(e)) return {facet: this.initFacetFieldDef(e, "facet")};
            const t = J(e), n = {};
            for (const i of t) {
                if (!T([Ne, Pe], i)) {
                    si(Yn(i, "facet"));
                    break
                }
                const t = e[i];
                if (void 0 === t.field) {
                    si(Vn(t, i));
                    break
                }
                n[i] = this.initFacetFieldDef(t, i)
            }
            return n
        }

        initFacetFieldDef(e, t) {
            const {header: n, ...i} = e, o = da(i, t);
            return n && (o.header = Oo(n)), o
        }

        channelHasField(e) {
            return !!this.facet[e]
        }

        fieldDef(e) {
            return this.facet[e]
        }

        parseData() {
            this.component.data = ih(this), this.child.parseData()
        }

        parseLayoutSize() {
            $m(this)
        }

        parseSelections() {
            this.child.parseSelections(), this.component.selection = this.child.component.selection
        }

        parseMarkGroup() {
            this.child.parseMarkGroup()
        }

        parseAxesAndHeaders() {
            this.child.parseAxesAndHeaders(), function (e) {
                for (const t of xt) Jm(e, t);
                Qm(e, "x"), Qm(e, "y")
            }(this)
        }

        assembleSelectionTopLevelSignals(e) {
            return this.child.assembleSelectionTopLevelSignals(e)
        }

        assembleSignals() {
            return this.child.assembleSignals(), []
        }

        assembleSelectionData(e) {
            return this.child.assembleSelectionData(e)
        }

        getHeaderLayoutMixins() {
            const e = {};
            for (const o of xt) for (const r of Ad) {
                const a = this.component.layoutHeaders[o], s = a[r], {facetFieldDef: c} = a;
                if (c) {
                    const n = bd("titleOrient", c.header, this.config, o);
                    if (T(["right", "bottom"], n)) {
                        var t;
                        const i = yd(o, n);
                        e.titleAnchor = null !== (t = e.titleAnchor) && void 0 !== t ? t : {}, e.titleAnchor[i] = "end"
                    }
                }
                if (null == s ? void 0 : s[0]) {
                    const t = "row" === o ? "height" : "width", s = "header" === r ? "headerBand" : "footerBand";
                    var n, i;
                    if ("facet" !== o && !this.child.component.layoutSize.get(t)) e[s] = null !== (n = e[s]) && void 0 !== n ? n : {}, e[s][o] = .5;
                    if (a.title) e.offset = null !== (i = e.offset) && void 0 !== i ? i : {}, e.offset["row" === o ? "rowTitle" : "columnTitle"] = 10
                }
            }
            return e
        }

        assembleDefaultLayout() {
            const {column: e, row: t} = this.facet, n = e ? this.columnDistinctSignal() : t ? 1 : void 0;
            let i = "all";
            return (t || "independent" !== this.component.resolve.scale.x) && (e || "independent" !== this.component.resolve.scale.y) || (i = "none"), {
                ...this.getHeaderLayoutMixins(), ...n ? {columns: n} : {},
                bounds: "full",
                align: i
            }
        }

        assembleLayoutSignals() {
            return this.child.assembleLayoutSignals()
        }

        columnDistinctSignal() {
            if (!(this.parent && this.parent instanceof th)) {
                const e = this.getName("column_domain");
                return {signal: "length(data('".concat(e, "'))")}
            }
        }

        assembleGroup(e) {
            return this.parent && this.parent instanceof th ? {...this.channelHasField("column") ? {encode: {update: {columns: {field: Kr(this.facet.column, {prefix: "distinct"})}}}} : {}, ...super.assembleGroup(e)} : super.assembleGroup(e)
        }

        getCardinalityAggregateForChild() {
            const e = [], t = [], n = [];
            if (this.child instanceof th) {
                if (this.child.channelHasField("column")) {
                    const i = Kr(this.child.facet.column);
                    e.push(i), t.push("distinct"), n.push("distinct_".concat(i))
                }
            } else for (const i of Zt) {
                const o = this.child.component.scales[i];
                if (o && !o.merged) {
                    const r = o.get("type"), a = o.get("range");
                    if (go(r) && ki(a)) {
                        const o = am(sm(this.child, i));
                        o ? (e.push(o), t.push("distinct"), n.push("distinct_".concat(o))) : si(Mn(i))
                    }
                }
            }
            return {fields: e, ops: t, as: n}
        }

        assembleFacet() {
            const {name: e, data: t} = this.component.data.facetRoot, {row: n, column: i} = this.facet, {fields: o, ops: r, as: a} = this.getCardinalityAggregateForChild(),
                s = [];
            for (const e of xt) {
                const t = this.facet[e];
                if (t) {
                    s.push(Kr(t));
                    const {bin: c, sort: l} = t;
                    if (Fn(c) && s.push(Kr(t, {binSuffix: "end"})), Er(l)) {
                        const {field: e, op: s = Dr} = l, c = eh(t, l);
                        n && i ? (o.push(c), r.push("max"), a.push(c)) : (o.push(e), r.push(s), a.push(c))
                    } else if (u(l)) {
                        const n = vd(t, e);
                        o.push(n), r.push("max"), a.push(n)
                    }
                }
            }
            const c = !!n && !!i;
            return {
                name: e,
                data: t,
                groupby: s, ...c || o.length > 0 ? {
                    aggregate: {
                        ...c ? {cross: c} : {}, ...o.length ? {
                            fields: o,
                            ops: r,
                            as: a
                        } : {}
                    }
                } : {}
            }
        }

        facetSortFields(e) {
            const {facet: t} = this, n = t[e];
            return n ? Er(n.sort) ? [eh(n, n.sort, {expr: "datum"})] : u(n.sort) ? [vd(n, e, {expr: "datum"})] : [Kr(n, {expr: "datum"})] : []
        }

        facetSortOrder(e) {
            const {facet: t} = this, n = t[e];
            if (n) {
                const {sort: e} = n;
                return [(Er(e) ? e.order : !u(e) && e) || "ascending"]
            }
            return []
        }

        assembleLabelTitle() {
            const {facet: e, config: t} = this;
            if (e.facet) return Sd(e.facet, "facet", t);
            const n = {row: ["top", "bottom"], column: ["left", "right"]};
            for (const o of wd) if (e[o]) {
                var i;
                const r = bd("labelOrient", null === (i = e[o]) || void 0 === i ? void 0 : i.header, t, o);
                if (T(n[o], r)) return Sd(e[o], o, t)
            }
        }

        assembleMarks() {
            const {child: e} = this, t = function (e) {
                    const t = [], n = Vm(t);
                    for (const t of e.children) n(t, {source: e.name, name: null, transform: []});
                    return t
                }(this.component.data.facetRoot), n = e.assembleGroupEncodeEntry(!1),
                i = this.assembleLabelTitle() || e.assembleTitle(), o = e.assembleGroupStyle();
            return [{
                name: this.getName("cell"),
                type: "group", ...i ? {title: i} : {}, ...o ? {style: o} : {},
                from: {facet: this.assembleFacet()},
                sort: {
                    field: xt.map((e => this.facetSortFields(e))).flat(),
                    order: xt.map((e => this.facetSortOrder(e))).flat()
                }, ...t.length > 0 ? {data: t} : {}, ...n ? {encode: {update: n}} : {}, ...e.assembleGroup(ml(this, []))
            }]
        }

        getMapping() {
            return this.facet
        }
    }

    function nh(e, t) {
        for (const a of t) {
            var n, i, o, r;
            const t = a.data;
            if (e.name && a.hasName() && e.name !== a.dataName) continue;
            const s = null === (n = e.format) || void 0 === n ? void 0 : n.mesh,
                c = null === (i = t.format) || void 0 === i ? void 0 : i.feature;
            if (s && c) continue;
            const u = null === (o = e.format) || void 0 === o ? void 0 : o.feature;
            if ((u || c) && u !== c) continue;
            const l = null === (r = t.format) || void 0 === r ? void 0 : r.mesh;
            if (!s && !l || s === l) if (_c(e) && _c(t)) {
                if (_(e.values, t.values)) return a
            } else if (Bc(e) && Bc(t)) {
                if (e.url === t.url) return a
            } else if (zc(e) && e.name === a.dataName) return a
        }
        return null
    }

    function ih(e) {
        var t, n, i;
        let o = function (e, t) {
            if (e.data || !e.parent) {
                if (null === e.data) {
                    const e = new Fp({values: []});
                    return t.push(e), e
                }
                const n = nh(e.data, t);
                if (n) return Oc(e.data) || (n.data.format = R({}, e.data.format, n.data.format)), !n.hasName() && e.data.name && (n.dataName = e.data.name), n;
                {
                    const n = new Fp(e.data);
                    return t.push(n), n
                }
            }
            return e.parent.component.data.facetRoot ? e.parent.component.data.facetRoot : e.parent.component.data.main
        }(e, e.component.data.sources);
        const {outputNodes: r, outputNodeRefCounts: a} = e.component.data,
            s = e.parent ? e.parent.component.data.ancestorParse.clone() : new Sc, c = e.data;
        Oc(c) ? (Nc(c) ? o = new Dp(o, c.sequence) : jc(c) && (o = new Ap(o, c.graticule)), s.parseNothing = !0) : null === (null == c || null === (t = c.format) || void 0 === t ? void 0 : t.parse) && (s.parseNothing = !0), o = null !== (n = xp.makeExplicit(o, e, s)) && void 0 !== n ? n : o, o = new wp(o);
        const u = e.parent && _m(e.parent);
        var l;
        (Em(e) || Sm(e)) && (u && (o = null !== (l = pp.makeFromEncoding(o, e)) && void 0 !== l ? l : o));
        e.transforms.length > 0 && (o = function (e, t, n) {
            let i = 0;
            for (const a of t.transforms) {
                let s, c = void 0;
                if (Jc(a)) s = e = new gd(e, a), c = "derived"; else if (Tc(a)) {
                    var o;
                    const i = yp(a);
                    s = e = null !== (o = xp.makeWithAncestors(e, {}, i, n)) && void 0 !== o ? o : e, e = new ed(e, t, a.filter)
                } else if (Xc(a)) s = e = pp.makeFromTransform(e, a, t), c = "number"; else if ($c(a)) c = "date", void 0 === n.getWithExplicit(a.field).value && (e = new xp(e, {[a.field]: c}), n.set(a.field, c, !1)), s = e = Vu.makeFromTransform(e, a); else if (Kc(a)) s = e = hp.makeFromTransform(e, a), c = "number", zl(t) && (e = new wp(e)); else if (Lc(a)) s = e = Wm.make(e, t, a, i++), c = "derived"; else if (Gc(a)) s = e = new Ip(e, a), c = "number"; else if (Vc(a)) s = e = new Wp(e, a), c = "number"; else if (Zc(a)) s = e = Up.makeFromTransform(e, a), c = "derived"; else if (eu(a)) s = e = new Mm(e, a), c = "derived"; else if (Yc(a)) s = e = new jm(e, a), c = "derived"; else if (qc(a)) s = e = new Hm(e, a), c = "derived"; else if (Hc(a)) e = new Gm(e, a); else if (Qc(a)) s = e = qm.makeFromTransform(e, a), c = "derived"; else if (Rc(a)) s = e = new Nm(e, a), c = "derived"; else if (Wc(a)) s = e = new Um(e, a), c = "derived"; else if (Uc(a)) s = e = new Im(e, a), c = "derived"; else {
                    if (!Ic(a)) {
                        si("Ignoring an invalid transform: ".concat(P(a), "."));
                        continue
                    }
                    s = e = new Rm(e, a), c = "derived"
                }
                if (s && void 0 !== c) for (const e of null !== (r = s.producedFields()) && void 0 !== r ? r : []) {
                    var r;
                    n.set(e, c, !1)
                }
            }
            return e
        }(o, e, s));
        const f = function (e) {
            const t = {};
            if (Em(e) && e.component.selection) for (const n of J(e.component.selection)) {
                const i = e.component.selection[n];
                for (const e of i.project.items) !e.channel && ce(e.field) > 1 && (t[e.field] = "flatten")
            }
            return t
        }(e), d = bp(e);
        if (o = null !== (i = xp.makeWithAncestors(o, {}, {...f, ...d}, s)) && void 0 !== i ? i : o, Em(e) && (o = Tm.parseAll(o, e), o = Lm.parseAll(o, e)), Em(e) || Sm(e)) {
            var p, m;
            if (!u) o = null !== (m = pp.makeFromEncoding(o, e)) && void 0 !== m ? m : o;
            o = null !== (p = Vu.makeFromEncoding(o, e)) && void 0 !== p ? p : o, o = gd.parseAllForSortIndex(o, e)
        }
        const h = e.getDataName(Mc.Raw), g = new Gu(o, h, Mc.Raw, a);
        if (r[h] = g, o = g, Em(e)) {
            var v, y;
            const t = hp.makeFromEncoding(o, e);
            t && (o = t, zl(e) && (o = new wp(o))), o = null !== (v = qm.makeFromEncoding(o, e)) && void 0 !== v ? v : o, o = null !== (y = Up.makeFromEncoding(o, e)) && void 0 !== y ? y : o
        }
        var b;
        Em(e) && (o = null !== (b = Pm.make(o, e)) && void 0 !== b ? b : o);
        const x = e.getDataName(Mc.Main), w = new Gu(o, x, Mc.Main, a);
        r[x] = w, o = w, Em(e) && function (e, t) {
            Bl(e, (n => {
                const i = n.name, o = e.getName("lookup_".concat(i));
                e.component.data.outputNodes[o] = n.materialized = new Gu(new ed(t, e, {selection: i}), o, Mc.Lookup, e.component.data.outputNodeRefCounts)
            }))
        }(e, w);
        let A = null;
        if (Sm(e)) {
            var D;
            const t = e.getName("facet");
            o = null !== (D = function (e, t) {
                const {row: n, column: i} = t;
                if (n && i) {
                    let t = null;
                    for (const o of [n, i]) if (Er(o.sort)) {
                        const {field: n, op: i = Dr} = o.sort;
                        e = t = new Wp(e, {
                            joinaggregate: [{op: i, field: n, as: eh(o, o.sort, {forAs: !0})}],
                            groupby: [Kr(o)]
                        })
                    }
                    return t
                }
                return null
            }(o, e.facet)) && void 0 !== D ? D : o, A = new gp(o, e, t, w.getSource()), r[t] = A
        }
        return {
            ...e.component.data,
            outputNodes: r,
            outputNodeRefCounts: a,
            raw: g,
            main: w,
            facetRoot: A,
            ancestorParse: s
        }
    }

    class oh extends zm {
        constructor(e, t, n, i) {
            var o, r, a, s;
            super(e, "concat", t, n, i, e.resolve), Bn(this, "children", void 0), "shared" !== (null === (o = e.resolve) || void 0 === o || null === (r = o.axis) || void 0 === r ? void 0 : r.x) && "shared" !== (null === (a = e.resolve) || void 0 === a || null === (s = a.axis) || void 0 === s ? void 0 : s.y) || si("Axes cannot be shared in concatenated or repeated views yet (https://github.com/vega/vega-lite/issues/2415)."), this.children = this.getChildren(e).map(((e, t) => Eh(e, this, this.getName("concat_" + t), void 0, i)))
        }

        parseData() {
            this.component.data = ih(this);
            for (const e of this.children) e.parseData()
        }

        parseSelections() {
            this.component.selection = {};
            for (const e of this.children) {
                e.parseSelections();
                for (const t of J(e.component.selection)) this.component.selection[t] = e.component.selection[t]
            }
        }

        parseMarkGroup() {
            for (const e of this.children) e.parseMarkGroup()
        }

        parseAxesAndHeaders() {
            for (const e of this.children) e.parseAxesAndHeaders()
        }

        getChildren(e) {
            return Ss(e) ? e.vconcat : Bs(e) ? e.hconcat : e.concat
        }

        parseLayoutSize() {
            !function (e) {
                $m(e);
                const t = 1 === e.layout.columns ? "width" : "childWidth",
                    n = void 0 === e.layout.columns ? "height" : "childHeight";
                Km(e, t), Km(e, n)
            }(this)
        }

        parseAxisGroup() {
            return null
        }

        assembleSelectionTopLevelSignals(e) {
            return this.children.reduce(((e, t) => t.assembleSelectionTopLevelSignals(e)), e)
        }

        assembleSignals() {
            return this.children.forEach((e => e.assembleSignals())), []
        }

        assembleLayoutSignals() {
            const e = Nd(this);
            for (const t of this.children) e.push(...t.assembleLayoutSignals());
            return e
        }

        assembleSelectionData(e) {
            return this.children.reduce(((e, t) => t.assembleSelectionData(e)), e)
        }

        assembleMarks() {
            return this.children.map((e => {
                const t = e.assembleTitle(), n = e.assembleGroupStyle(), i = e.assembleGroupEncodeEntry(!1);
                return {
                    type: "group",
                    name: e.getName("group"), ...t ? {title: t} : {}, ...n ? {style: n} : {}, ...i ? {encode: {update: i}} : {}, ...e.assembleGroup()
                }
            }))
        }

        assembleDefaultLayout() {
            const e = this.layout.columns;
            return {...null != e ? {columns: e} : {}, bounds: "full", align: "each"}
        }
    }

    const rh = {disable: 1, gridScale: 1, scale: 1, ...xe, labelExpr: 1, encode: 1}, ah = J(rh);

    class sh extends Ac {
        constructor(e = {}, t = {}, n = !1) {
            super(), this.explicit = e, this.implicit = t, this.mainExtracted = n
        }

        clone() {
            return new sh(z(this.explicit), z(this.implicit), this.mainExtracted)
        }

        hasAxisPart(e) {
            return "axis" === e || ("grid" === e || "title" === e ? !!this.get(e) : !(!1 === (t = this.get(e)) || null === t));
            var t
        }

        hasOrientSignalRef() {
            return Fi(this.explicit.orient)
        }
    }

    const ch = {bottom: "top", top: "bottom", left: "right", right: "left"};

    function uh(e, t) {
        if (!e) return t.map((e => e.clone()));
        {
            if (e.length !== t.length) return;
            const n = e.length;
            for (let i = 0; i < n; i++) {
                const n = e[i], o = t[i];
                if (!!n != !!o) return;
                if (n && o) {
                    const t = n.getWithExplicit("orient"), r = o.getWithExplicit("orient");
                    if (t.explicit && r.explicit && t.value !== r.value) return;
                    e[i] = lh(n, o)
                }
            }
        }
        return e
    }

    function lh(e, t) {
        for (const n of ah) {
            const i = Ec(e.getWithExplicit(n), t.getWithExplicit(n), n, "axis", ((e, t) => {
                switch (n) {
                    case"title":
                        return Ma(e, t);
                    case"gridScale":
                        return {explicit: e.explicit, value: ue(e.value, t.value)}
                }
                return Cc(e, t, n, "axis")
            }));
            e.setWithExplicit(n, i)
        }
        return e
    }

    function fh(e, t, n, i, o) {
        if ("disable" === t) return void 0 !== n;
        switch (n = n || {}, t) {
            case"titleAngle":
            case"labelAngle":
                return e === (Fi(n.labelAngle) ? n.labelAngle : me(n.labelAngle));
            case"values":
                return !!n.values;
            case"encode":
                return !!n.encoding || !!n.labelAngle;
            case"title":
                if (e === hd(i, o)) return !0
        }
        return e === n[t]
    }

    const dh = new Set(["grid", "translate", "format", "formatType", "orient", "labelExpr", "tickCount", "position", "tickMinStep"]);

    function ph(e, t) {
        var n, i, o, r, a;
        let s = t.axis(e);
        const c = new sh, u = ua(t.encoding[e]), {mark: l, config: f} = t,
            d = (null === (n = s) || void 0 === n ? void 0 : n.orient) || (null === (i = f["x" === e ? "axisX" : "axisY"]) || void 0 === i ? void 0 : i.orient) || (null === (o = f.axis) || void 0 === o ? void 0 : o.orient) || function (e) {
                return "x" === e ? "bottom" : "left"
            }(e), p = t.getScaleComponent(e).get("type"), m = cd(e, p, d, t.config),
            h = void 0 !== s ? !s : ld("disable", f.style, null === (r = s) || void 0 === r ? void 0 : r.style, m).configValue;
        if (c.set("disable", h, void 0 !== s), h) return c;
        s = s || {};
        const g = function (e, t, n, i, o) {
            const r = null == t ? void 0 : t.labelAngle;
            if (void 0 !== r) return Fi(r) ? r : me(r);
            {
                const {configValue: r} = ld("labelAngle", i, null == t ? void 0 : t.style, o);
                return void 0 !== r ? me(r) : n !== Me || !T([Gi, Ii], e.type) || qr(e) && e.timeUnit ? void 0 : 270
            }
        }(u, s, e, f.style, m), v = {
            fieldOrDatumDef: u,
            axis: s,
            channel: e,
            model: t,
            scaleType: p,
            orient: d,
            labelAngle: g,
            mark: l,
            config: f
        };
        for (const n of ah) {
            const i = n in fd ? fd[n](v) : Ae(n) ? s[n] : void 0, o = void 0 !== i, r = fh(i, n, s, t, e);
            if (o && r) c.set(n, i, r); else {
                const {configValue: e, configFrom: t} = Ae(n) && "values" !== n ? ld(n, f.style, s.style, m) : {},
                    a = void 0 !== e;
                o && !a ? c.set(n, i, r) : ("vgAxisConfig" !== t || dh.has(n) && a || ve(e) || Fi(e)) && c.set(n, e, !1)
            }
        }
        const y = null !== (a = s.encoding) && void 0 !== a ? a : {}, b = ye.reduce(((n, i) => {
            var o;
            if (!c.hasAxisPart(i)) return n;
            const r = Ld(null !== (o = y[i]) && void 0 !== o ? o : {}, t), a = "labels" === i ? function (e, t, n) {
                var i;
                const {encoding: o, config: r} = e, a = null !== (i = ua(o[t])) && void 0 !== i ? i : ua(o[Mt(t)]),
                    s = e.axis(t) || {}, {format: c, formatType: u} = s;
                return dr(u) ? {
                    text: gr({
                        fieldOrDatumDef: a,
                        field: "datum.value",
                        format: c,
                        formatType: u,
                        config: r
                    }), ...n
                } : n
            }(t, e, r) : r;
            return void 0 === a || Y(a) || (n[i] = {update: a}), n
        }), {});
        return Y(b) || c.set("encode", b, !!s.encoding || void 0 !== s.labelAngle), c
    }

    function mh(e, t, n) {
        const i = Oo(e), o = Ba("orient", i, n);
        var r, a;
        if (i.orient = function (e, t, n) {
            switch (e) {
                case qo:
                case Go:
                case Vo:
                case Uo:
                case Ro:
                case To:
                    return
            }
            const {x: i, y: o, x2: r, y2: a} = t;
            switch (e) {
                case Mo:
                    if (qr(i) && (kn(i.bin) || qr(o) && o.aggregate && !i.aggregate)) return "vertical";
                    if (qr(o) && (kn(o.bin) || qr(i) && i.aggregate && !o.aggregate)) return "horizontal";
                    if (a || r) {
                        if (n) return n;
                        if (!r && (qr(i) && i.type === Ui && !Fn(i.bin) || Ir(i))) return "horizontal";
                        if (!a && (qr(o) && o.type === Ui && !Fn(o.bin) || Ir(o))) return "vertical"
                    }
                case Wo:
                    if (r && (!qr(i) || !kn(i.bin)) && a && (!qr(o) || !kn(o.bin))) return;
                case jo:
                    if (a) return qr(o) && kn(o.bin) ? "horizontal" : "vertical";
                    if (r) return qr(i) && kn(i.bin) ? "vertical" : "horizontal";
                    if (e === Wo) {
                        if (i && !o) return "vertical";
                        if (o && !i) return "horizontal"
                    }
                case Lo:
                case Io: {
                    const t = Ur(i), r = Ur(o);
                    if (t && !r) return "tick" !== e ? "horizontal" : "vertical";
                    if (!t && r) return "tick" !== e ? "vertical" : "horizontal";
                    if (t && r) {
                        const t = i, r = o, a = t.type === Hi, s = r.type === Hi;
                        return a && !s ? "tick" !== e ? "vertical" : "horizontal" : !a && s ? "tick" !== e ? "horizontal" : "vertical" : !t.aggregate && r.aggregate ? "tick" !== e ? "vertical" : "horizontal" : t.aggregate && !r.aggregate ? "tick" !== e ? "horizontal" : "vertical" : n || "vertical"
                    }
                    return n || void 0
                }
            }
            return "vertical"
        }(i.type, t, o), void 0 !== o && o !== i.orient && si((r = i.orient, a = o, 'Specified orient "'.concat(r, '" overridden with "').concat(a, '".'))), "bar" === i.type && i.orient) {
            const e = Ba("cornerRadiusEnd", i, n);
            if (void 0 !== e) {
                const n = "horizontal" === i.orient && t.x2 || "vertical" === i.orient && t.y2 ? ["cornerRadius"] : tr[i.orient];
                for (const t of n) i[t] = e;
                void 0 !== i.cornerRadiusEnd && delete i.cornerRadiusEnd
            }
        }
        void 0 === Ba("opacity", i, n) && (i.opacity = function (e, t) {
            if (T([qo, Io, Go, Vo], e) && !Ra(t)) return .7;
            return
        }(i.type, t));
        return void 0 === Ba("cursor", i, n) && (i.cursor = function (e, t, n) {
            if (t.href || e.href || Ba("href", e, n)) return "pointer";
            return e.cursor
        }(i, t, n)), i
    }

    function hh(e, t) {
        const {config: n} = e;
        return {
            ...Tu(e, {
                align: "ignore",
                baseline: "ignore",
                color: "include",
                size: "include",
                orient: "ignore",
                theta: "ignore"
            }), ...Fu("x", e, {defaultPos: "mid"}), ...Fu("y", e, {defaultPos: "mid"}), ...xu("size", e), ...xu("angle", e), ...gh(e, n, t)
        }
    }

    function gh(e, t, n) {
        return n ? {shape: {value: n}} : xu("shape", e)
    }

    function vh(e, t, n) {
        if (void 0 === Ba("align", e, n)) return "center"
    }

    function yh(e, t, n) {
        if (void 0 === Ba("baseline", e, n)) return "middle"
    }

    function bh(e) {
        var t;
        const {config: n, markDef: i} = e, {orient: o} = i, r = "horizontal" === o ? "width" : "height",
            a = e.getScaleComponent("horizontal" === o ? "x" : "y"),
            s = null !== (t = Ba("size", i, n, {vgChannel: r})) && void 0 !== t ? t : n.tick.bandSize;
        if (void 0 !== s) return s;
        {
            const e = a ? a.get("range") : void 0;
            if (e && ki(e) && b(e.step)) return 3 * e.step / 4;
            return 3 * Ms(n.view, r) / 4
        }
    }

    const xh = {
        arc: {
            vgMark: "arc",
            encodeEntry: e => ({
                ...Tu(e, {
                    align: "ignore",
                    baseline: "ignore",
                    color: "include",
                    size: "ignore",
                    orient: "ignore",
                    theta: "ignore"
                }), ...Fu("x", e, {defaultPos: "mid"}), ...Fu("y", e, {defaultPos: "mid"}), ...Ou(e, "radius", "arc"), ...Ou(e, "theta", "arc")
            })
        },
        area: {
            vgMark: "area",
            encodeEntry: e => ({
                ...Tu(e, {
                    align: "ignore",
                    baseline: "ignore",
                    color: "include",
                    orient: "include",
                    size: "ignore",
                    theta: "ignore"
                }), ...Bu("x", e, {
                    defaultPos: "zeroOrMin",
                    defaultPos2: "zeroOrMin",
                    range: "horizontal" === e.markDef.orient
                }), ...Bu("y", e, {
                    defaultPos: "zeroOrMin",
                    defaultPos2: "zeroOrMin",
                    range: "vertical" === e.markDef.orient
                }), ...Ru(e)
            })
        },
        bar: {
            vgMark: "rect",
            encodeEntry: e => ({
                ...Tu(e, {
                    align: "ignore",
                    baseline: "ignore",
                    color: "include",
                    orient: "ignore",
                    size: "ignore",
                    theta: "ignore"
                }), ...Ou(e, "x", "bar"), ...Ou(e, "y", "bar")
            })
        },
        circle: {vgMark: "symbol", encodeEntry: e => hh(e, "circle")},
        geoshape: {
            vgMark: "shape",
            encodeEntry: e => ({
                ...Tu(e, {
                    align: "ignore",
                    baseline: "ignore",
                    color: "include",
                    size: "ignore",
                    orient: "ignore",
                    theta: "ignore"
                })
            }),
            postEncodingTransform: e => {
                const {encoding: t} = e, n = t.shape;
                return [{
                    type: "geoshape",
                    projection: e.projectionName(), ...n && qr(n) && n.type === Vi ? {field: Kr(n, {expr: "datum"})} : {}
                }]
            }
        },
        image: {
            vgMark: "image",
            encodeEntry: e => ({
                ...Tu(e, {
                    align: "ignore",
                    baseline: "ignore",
                    color: "ignore",
                    orient: "ignore",
                    size: "ignore",
                    theta: "ignore"
                }), ...Ou(e, "x", "image"), ...Ou(e, "y", "image"), ...du(e, "url")
            })
        },
        line: {
            vgMark: "line",
            encodeEntry: e => ({
                ...Tu(e, {
                    align: "ignore",
                    baseline: "ignore",
                    color: "include",
                    size: "ignore",
                    orient: "ignore",
                    theta: "ignore"
                }), ...Fu("x", e, {defaultPos: "mid"}), ...Fu("y", e, {defaultPos: "mid"}), ...xu("size", e, {vgChannel: "strokeWidth"}), ...Ru(e)
            })
        },
        point: {vgMark: "symbol", encodeEntry: e => hh(e)},
        rect: {
            vgMark: "rect",
            encodeEntry: e => ({
                ...Tu(e, {
                    align: "ignore",
                    baseline: "ignore",
                    color: "include",
                    orient: "ignore",
                    size: "ignore",
                    theta: "ignore"
                }), ...Ou(e, "x", "rect"), ...Ou(e, "y", "rect")
            })
        },
        rule: {
            vgMark: "rule", encodeEntry: e => {
                const {markDef: t} = e, n = t.orient;
                return e.encoding.x || e.encoding.y || e.encoding.latitude || e.encoding.longitude ? {
                    ...Tu(e, {
                        align: "ignore",
                        baseline: "ignore",
                        color: "include",
                        orient: "ignore",
                        size: "ignore",
                        theta: "ignore"
                    }), ...Bu("x", e, {
                        defaultPos: "horizontal" === n ? "zeroOrMax" : "mid",
                        defaultPos2: "zeroOrMin",
                        range: "vertical" !== n
                    }), ...Bu("y", e, {
                        defaultPos: "vertical" === n ? "zeroOrMax" : "mid",
                        defaultPos2: "zeroOrMin",
                        range: "horizontal" !== n
                    }), ...xu("size", e, {vgChannel: "strokeWidth"})
                } : {}
            }
        },
        square: {vgMark: "symbol", encodeEntry: e => hh(e, "square")},
        text: {
            vgMark: "text", encodeEntry: e => {
                const {config: t, encoding: n} = e;
                return {
                    ...Tu(e, {
                        align: "include",
                        baseline: "include",
                        color: "include",
                        size: "ignore",
                        orient: "ignore",
                        theta: "include"
                    }), ...Fu("x", e, {defaultPos: "mid"}), ...Fu("y", e, {defaultPos: "mid"}), ...du(e), ...xu("size", e, {vgChannel: "fontSize"}), ...xu("angle", e), ...Wu("align", vh(e.markDef, n, t)), ...Wu("baseline", yh(e.markDef, n, t)), ...Fu("radius", e, {
                        defaultPos: null,
                        isMidPoint: !0
                    }), ...Fu("theta", e, {defaultPos: null, isMidPoint: !0})
                }
            }
        },
        tick: {
            vgMark: "rect", encodeEntry: e => {
                const {config: t, markDef: n} = e, i = n.orient, o = "horizontal" === i ? "width" : "height",
                    r = "horizontal" === i ? "height" : "width";
                return {
                    ...Tu(e, {
                        align: "ignore",
                        baseline: "ignore",
                        color: "include",
                        orient: "ignore",
                        size: "ignore",
                        theta: "ignore"
                    }), ...Fu("x", e, {defaultPos: "mid", vgChannel: "xc"}), ...Fu("y", e, {
                        defaultPos: "mid",
                        vgChannel: "yc"
                    }), ...xu("size", e, {defaultValue: bh(e), vgChannel: o}), [r]: Fa(Ba("thickness", n, t))
                }
            }
        },
        trail: {
            vgMark: "trail",
            encodeEntry: e => ({
                ...Tu(e, {
                    align: "ignore",
                    baseline: "ignore",
                    color: "include",
                    size: "include",
                    orient: "ignore",
                    theta: "ignore"
                }), ...Fu("x", e, {defaultPos: "mid"}), ...Fu("y", e, {defaultPos: "mid"}), ...xu("size", e), ...Ru(e)
            })
        }
    };

    function wh(e) {
        if (T([Lo, jo, Ho], e.mark)) {
            const t = Ga(e.mark, e.encoding);
            if (t.length > 0) return function (e, t) {
                return [{
                    name: e.getName("pathgroup"),
                    type: "group",
                    from: {
                        facet: {
                            name: Ah + e.requestDataName(Mc.Main),
                            data: e.requestDataName(Mc.Main),
                            groupby: t
                        }
                    },
                    encode: {update: {width: {field: {group: "width"}}, height: {field: {group: "height"}}}},
                    marks: Fh(e, {fromPrefix: Ah})
                }]
            }(e, t)
        } else if (T([Mo], e.mark)) {
            const t = Bi.some((t => Ba(t, e.markDef, e.config)));
            if (e.stack && !e.fieldDef("size") && t) return function (e) {
                const [t] = Fh(e, {fromPrefix: Dh}), n = e.scaleName(e.stack.fieldChannel),
                    i = (t = {}) => e.vgField(e.stack.fieldChannel, t), o = (e, t) => {
                        const o = [i({prefix: "min", suffix: "start", expr: t}), i({
                            prefix: "max",
                            suffix: "start",
                            expr: t
                        }), i({prefix: "min", suffix: "end", expr: t}), i({prefix: "max", suffix: "end", expr: t})];
                        return "".concat(e, "(").concat(o.map((e => "scale('".concat(n, "',").concat(e, ")"))).join(","), ")")
                    };
                let r, a;
                "x" === e.stack.fieldChannel ? (r = {
                    ...O(t.encode.update, ["y", "yc", "y2", "height", ...Bi]),
                    x: {signal: o("min", "datum")},
                    x2: {signal: o("max", "datum")},
                    clip: {value: !0}
                }, a = {
                    x: {field: {group: "x"}, mult: -1},
                    height: {field: {group: "height"}}
                }, t.encode.update = {
                    ...N(t.encode.update, ["y", "yc", "y2"]),
                    height: {field: {group: "height"}}
                }) : (r = {
                    ...O(t.encode.update, ["x", "xc", "x2", "width"]),
                    y: {signal: o("min", "datum")},
                    y2: {signal: o("max", "datum")},
                    clip: {value: !0}
                }, a = {
                    y: {field: {group: "y"}, mult: -1},
                    width: {field: {group: "width"}}
                }, t.encode.update = {...N(t.encode.update, ["x", "xc", "x2"]), width: {field: {group: "width"}}});
                for (const n of Bi) {
                    const i = _a(n, e.markDef, e.config);
                    t.encode.update[n] ? (r[n] = t.encode.update[n], delete t.encode.update[n]) : i && (r[n] = Fa(i)), i && (t.encode.update[n] = {value: 0})
                }
                const s = e.fieldDef(e.stack.groupbyChannel), c = Kr(s) ? [Kr(s)] : [];
                ((null == s ? void 0 : s.bin) || (null == s ? void 0 : s.timeUnit)) && c.push(Kr(s, {binSuffix: "end"}));
                r = ["stroke", "strokeWidth", "strokeJoin", "strokeCap", "strokeDash", "strokeDashOffset", "strokeMiterLimit", "strokeOpacity"].reduce(((n, i) => {
                    if (t.encode.update[i]) return {...n, [i]: t.encode.update[i]};
                    {
                        const t = _a(i, e.markDef, e.config);
                        return void 0 !== t ? {...n, [i]: Fa(t)} : n
                    }
                }), r), r.stroke && (r.strokeForeground = {value: !0}, r.strokeOffset = {value: 0});
                return [{
                    type: "group",
                    from: {
                        facet: {
                            data: e.requestDataName(Mc.Main),
                            name: Dh + e.requestDataName(Mc.Main),
                            groupby: c,
                            aggregate: {
                                fields: [i({suffix: "start"}), i({suffix: "start"}), i({suffix: "end"}), i({suffix: "end"})],
                                ops: ["min", "max", "min", "max"]
                            }
                        }
                    },
                    encode: {update: r},
                    marks: [{type: "group", encode: {update: a}, marks: [t]}]
                }]
            }(e)
        }
        return Fh(e)
    }

    const Ah = "faceted_path_";
    const Dh = "stack_group_";

    function Fh(e, t = {fromPrefix: ""}) {
        const {mark: n, markDef: i, encoding: o, config: r} = e, a = ue(i.clip, function (e) {
            const t = e.getScaleComponent("x"), n = e.getScaleComponent("y");
            return !!(t && t.get("selectionExtent") || n && n.get("selectionExtent")) || void 0
        }(e), function (e) {
            const t = e.component.projection;
            return !(!t || t.isFit) || void 0
        }(e)), s = Sa(i), c = o.key, l = function (e) {
            const {encoding: t, stack: n, mark: i, markDef: o, config: r} = e, a = t.order;
            if (!(!u(a) && Vr(a) && M(a.value) || !a && M(Ba("order", o, r)))) {
                if ((u(a) || qr(a)) && !n) return Na(a, {expr: "datum"});
                if (Jo(i)) {
                    const n = "horizontal" === o.orient ? "y" : "x", i = t[n];
                    if (qr(i)) {
                        const t = i.sort;
                        return u(t) ? {
                            field: Kr(i, {
                                prefix: n,
                                suffix: "sort_index",
                                expr: "datum"
                            })
                        } : Er(t) ? {
                            field: Kr({
                                aggregate: Ra(e.encoding) ? t.op : void 0,
                                field: t.field
                            }, {expr: "datum"})
                        } : Cr(t) ? {
                            field: Kr(e.fieldDef(t.encoding), {expr: "datum"}),
                            order: t.order
                        } : null === t ? void 0 : {
                            field: Kr(i, {
                                binSuffix: e.stack && e.stack.impute ? "mid" : void 0,
                                expr: "datum"
                            })
                        }
                    }
                }
            }
        }(e), f = function (e) {
            if (!e.component.selection) return null;
            const t = J(e.component.selection).length;
            let n = t, i = e.parent;
            for (; i && 0 === n;) n = J(i.component.selection).length, i = i.parent;
            return n ? {interactive: t > 0 || !!e.encoding.tooltip} : null
        }(e), d = Ba("aria", i, r), p = xh[n].postEncodingTransform ? xh[n].postEncodingTransform(e) : null;
        return [{
            name: e.getName("marks"),
            type: xh[n].vgMark, ...a ? {clip: !0} : {}, ...s ? {style: s} : {}, ...c ? {key: c.field} : {}, ...l ? {sort: l} : {}, ...f || {}, ...!1 === d ? {aria: d} : {},
            from: {data: t.fromPrefix + e.requestDataName(Mc.Main)},
            encode: {update: xh[n].encodeEntry(e)}, ...p ? {transform: p} : {}
        }]
    }

    class kh extends Om {
        constructor(e, t, n, i = {}, o) {
            super(e, "unit", t, n, o, void 0, Ns(e) ? e.view : void 0), Bn(this, "markDef", void 0), Bn(this, "encoding", void 0), Bn(this, "specifiedScales", {}), Bn(this, "stack", void 0), Bn(this, "specifiedAxes", {}), Bn(this, "specifiedLegends", {}), Bn(this, "specifiedProjection", {}), Bn(this, "selection", {}), Bn(this, "children", []);
            const r = $o(e.mark) ? {...e.mark} : {type: e.mark}, a = r.type;
            void 0 === r.filled && (r.filled = function (e, t, {graticule: n}) {
                if (n) return !1;
                const i = _a("filled", e, t), o = e.type;
                return ue(i, o !== qo && o !== Lo && o !== Wo)
            }(r, o, {graticule: e.data && jc(e.data)}));
            const s = this.encoding = Ua(e.encoding || {}, a, r.filled, o);
            this.markDef = mh(r, s, o), this.size = function ({encoding: e, size: t}) {
                for (const n of Zt) {
                    const i = Tt(n);
                    Os(t[i]) && Ur(e[n]) && (delete t[i], si(ei(i)))
                }
                return t
            }({
                encoding: s,
                size: Ns(e) ? {...i, ...e.width ? {width: e.width} : {}, ...e.height ? {height: e.height} : {}} : i
            }), this.stack = nc(a, s), this.specifiedScales = this.initScales(a, s), this.specifiedAxes = this.initAxes(s), this.specifiedLegends = this.initLegends(s), this.specifiedProjection = e.projection, this.selection = e.selection
        }

        get hasProjection() {
            const {encoding: e} = this, t = this.mark === Yo, n = e && gt.some((t => Hr(e[t])));
            return t || n
        }

        scaleDomain(e) {
            const t = this.specifiedScales[e];
            return t ? t.domain : void 0
        }

        axis(e) {
            return this.specifiedAxes[e]
        }

        legend(e) {
            return this.specifiedLegends[e]
        }

        initScales(e, t) {
            return gn.reduce(((e, n) => {
                const i = ua(t[n]);
                var o;
                i && (e[n] = this.initScale(null !== (o = i.scale) && void 0 !== o ? o : {}));
                return e
            }), {})
        }

        initScale(e) {
            const {domain: t, range: n} = e, i = Oo(e);
            return u(t) && (i.domain = t.map(Aa)), u(n) && (i.range = n.map(Aa)), i
        }

        initAxes(e) {
            return Zt.reduce(((t, n) => {
                const i = e[n];
                if (Hr(i) || n === Me && Hr(e.x2) || n === Te && Hr(e.y2)) {
                    const e = Hr(i) ? i.axis : void 0;
                    t[n] = e ? this.initAxis({...e}) : e
                }
                return t
            }), {})
        }

        initAxis(e) {
            const t = J(e), n = {};
            for (const i of t) {
                const t = e[i];
                n[i] = ve(t) ? wa(t) : Aa(t)
            }
            return n
        }

        initLegends(e) {
            return mn.reduce(((t, n) => {
                const i = ua(e[n]);
                if (i && function (e) {
                    switch (e) {
                        case Je:
                        case Xe:
                        case Qe:
                        case Ke:
                        case $e:
                        case et:
                        case it:
                        case ot:
                            return !0;
                        case tt:
                        case nt:
                        case Ze:
                            return !1
                    }
                }(n)) {
                    const e = i.legend;
                    t[n] = e ? Oo(e) : e
                }
                return t
            }), {})
        }

        parseData() {
            this.component.data = ih(this)
        }

        parseLayoutSize() {
            !function (e) {
                const {size: t, component: n} = e;
                for (const i of Zt) {
                    const o = Tt(i);
                    if (t[o]) {
                        const e = t[o];
                        n.layoutSize.set(o, Os(e) ? "step" : e, !0)
                    } else {
                        const t = Zm(e, o);
                        n.layoutSize.set(o, t, !1)
                    }
                }
            }(this)
        }

        parseSelections() {
            this.component.selection = function (e, t) {
                const n = {}, i = e.config.selection;
                for (const r of J(null != t ? t : {})) {
                    const a = z(t[r]), {fields: s, encodings: c, ...u} = i[a.type];
                    for (const e in u) {
                        var o;
                        "encodings" === e && a.fields || "fields" === e && a.encodings || ("mark" === e && (a[e] = {...u[e], ...a[e]}), (void 0 === a[e] || !0 === a[e]) && (a[e] = null !== (o = u[e]) && void 0 !== o ? o : a[e]))
                    }
                    const l = K(r), f = n[l] = {...a, name: l, events: x(a.on) ? su(a.on, "scope") : z(a.on)};
                    dl(f, (n => {
                        n.has(f) && n.parse && n.parse(e, f, a, t[r])
                    }))
                }
                return n
            }(this, this.selection)
        }

        parseMarkGroup() {
            this.component.mark = wh(this)
        }

        parseAxesAndHeaders() {
            var e;
            this.component.axes = (e = this, Zt.reduce(((t, n) => (e.component.scales[n] && (t[n] = [ph(n, e)]), t)), {}))
        }

        assembleSelectionTopLevelSignals(e) {
            return function (e, t) {
                let n = !1;
                Bl(e, ((i, o) => {
                    const r = i.name, a = w(r + Fl);
                    if (0 === t.filter((e => e.name === r)).length) {
                        const e = "global" === i.resolve ? "union" : i.resolve,
                            n = "multi" === i.type ? ", true)" : ")";
                        t.push({name: i.name, update: "".concat(El, "(").concat(a, ", ").concat(w(e)).concat(n)})
                    }
                    n = !0, o.topLevelSignals && (t = o.topLevelSignals(e, i, t)), dl(i, (n => {
                        n.topLevelSignals && (t = n.topLevelSignals(e, i, t))
                    }))
                })), n && 0 === t.filter((e => "unit" === e.name)).length && t.unshift({
                    name: "unit",
                    value: {},
                    on: [{events: "mousemove", update: "isTuple(group()) ? group() : unit"}]
                });
                return gl(t)
            }(this, e)
        }

        assembleSignals() {
            return [...ad(this), ...(e = this, t = [], Bl(e, ((n, i) => {
                const o = n.name;
                let r = i.modifyExpr(e, n);
                t.push(...i.signals(e, n)), dl(n, (i => {
                    i.signals && (t = i.signals(e, n, t)), i.modifyExpr && (r = i.modifyExpr(e, n, r))
                })), t.push({
                    name: o + Cl,
                    on: [{events: {signal: n.name + kl}, update: "modify(".concat(w(n.name + Fl), ", ").concat(r, ")")}]
                })
            })), gl(t))];
            var e, t
        }

        assembleSelectionData(e) {
            return function (e, t) {
                const n = [...t];
                return Bl(e, (t => {
                    const i = {name: t.name + Fl};
                    if (t.init) {
                        const n = t.project.items.map((e => {
                            const {signals: t, ...n} = e;
                            return n
                        })), o = t.init.map((e => pl(e, !1)));
                        i.values = "interval" === t.type ? [{
                            unit: _l(e, {escape: !1}),
                            fields: n,
                            values: o
                        }] : o.map((t => ({unit: _l(e, {escape: !1}), fields: n, values: t})))
                    }
                    n.filter((e => e.name === t.name + Fl)).length || n.push(i)
                })), n
            }(this, e)
        }

        assembleLayout() {
            return null
        }

        assembleLayoutSignals() {
            return Nd(this)
        }

        assembleMarks() {
            var e;
            let t = null !== (e = this.component.mark) && void 0 !== e ? e : [];
            return this.parent && _m(this.parent) || (t = hl(this, t)), t.map(this.correctDataNames)
        }

        getMapping() {
            return this.encoding
        }

        get mark() {
            return this.markDef.type
        }

        channelHasField(e) {
            return qa(this.encoding, e)
        }

        fieldDef(e) {
            return ca(this.encoding[e])
        }

        typedFieldDef(e) {
            const t = this.fieldDef(e);
            return Gr(t) ? t : null
        }
    }

    class Ch extends zm {
        constructor(e, t, n, i, o) {
            super(e, "layer", t, n, o, e.resolve, e.view), Bn(this, "children", void 0);
            const r = {...i, ...e.width ? {width: e.width} : {}, ...e.height ? {height: e.height} : {}};
            this.children = e.layer.map(((e, t) => {
                if ($s(e)) return new Ch(e, this, this.getName("layer_" + t), r, o);
                if (Ta(e)) return new kh(e, this, this.getName("layer_" + t), r, o);
                throw new Error(zn(e))
            }))
        }

        parseData() {
            this.component.data = ih(this);
            for (const e of this.children) e.parseData()
        }

        parseLayoutSize() {
            var e;
            $m(e = this), Km(e, "width"), Km(e, "height")
        }

        parseSelections() {
            this.component.selection = {};
            for (const e of this.children) {
                e.parseSelections();
                for (const t of J(e.component.selection)) this.component.selection[t] = e.component.selection[t]
            }
        }

        parseMarkGroup() {
            for (const e of this.children) e.parseMarkGroup()
        }

        parseAxesAndHeaders() {
            !function (e) {
                const {axes: t, resolve: n} = e.component, i = {top: 0, bottom: 0, right: 0, left: 0};
                for (const i of e.children) {
                    i.parseAxesAndHeaders();
                    for (const o of J(i.component.axes)) n.axis[o] = Rd(e.component.resolve, o), "shared" === n.axis[o] && (t[o] = uh(t[o], i.component.axes[o]), t[o] || (n.axis[o] = "independent", delete t[o]))
                }
                for (const r of Zt) {
                    for (const a of e.children) if (a.component.axes[r]) {
                        if ("independent" === n.axis[r]) {
                            var o;
                            t[r] = (null !== (o = t[r]) && void 0 !== o ? o : []).concat(a.component.axes[r]);
                            for (const e of a.component.axes[r]) {
                                const {value: t, explicit: n} = e.getWithExplicit("orient");
                                if (!Fi(t)) {
                                    if (i[t] > 0 && !n) {
                                        const n = ch[t];
                                        i[t] > i[n] && e.set("orient", n, !1)
                                    }
                                    i[t]++
                                }
                            }
                        }
                        delete a.component.axes[r]
                    }
                    if ("independent" === n.axis[r] && t[r] && t[r].length > 1) for (const e of t[r]) e.get("grid") && !e.explicit.grid && (e.implicit.grid = !1)
                }
            }(this)
        }

        assembleSelectionTopLevelSignals(e) {
            return this.children.reduce(((e, t) => t.assembleSelectionTopLevelSignals(e)), e)
        }

        assembleSignals() {
            return this.children.reduce(((e, t) => e.concat(t.assembleSignals())), ad(this))
        }

        assembleLayoutSignals() {
            return this.children.reduce(((e, t) => e.concat(t.assembleLayoutSignals())), Nd(this))
        }

        assembleSelectionData(e) {
            return this.children.reduce(((e, t) => t.assembleSelectionData(e)), e)
        }

        assembleTitle() {
            let e = super.assembleTitle();
            if (e) return e;
            for (const t of this.children) if (e = t.assembleTitle(), e) return e
        }

        assembleLayout() {
            return null
        }

        assembleMarks() {
            return function (e, t) {
                for (const n of e.children) Em(n) && (t = hl(n, t));
                return t
            }(this, this.children.flatMap((e => e.assembleMarks())))
        }

        assembleLegends() {
            return this.children.reduce(((e, t) => e.concat(t.assembleLegends())), ip(this))
        }
    }

    function Eh(e, t, n, i, o) {
        if (zr(e)) return new th(e, t, n, o);
        if ($s(e)) return new Ch(e, t, n, i, o);
        if (Ta(e)) return new kh(e, t, n, i, o);
        if (function (e) {
            return Ss(e) || Bs(e) || Es(e)
        }(e)) return new oh(e, t, n, o);
        throw new Error(zn(e))
    }

    e.accessPathDepth = ce, e.accessPathWithDatum = ne, e.compile = function (e, t = {}) {
        var n;
        t.logger && (n = t.logger, ai = n), t.fieldTitle && ia(t.fieldTitle);
        try {
            const n = Gs(d(t.config, e.config)), i = bc(e, n), o = Eh(i, null, "", void 0, n);
            o.parse(), function (e, t) {
                Yp(e.sources);
                let n = 0, i = 0;
                for (let i = 0; i < 5 && Xp(e, t, !0); i++) n++;
                e.sources.map(Hp);
                for (let n = 0; n < 5 && Xp(e, t, !1); n++) i++;
                Yp(e.sources), 5 === Math.max(n, i) && si("Maximum optimization runs(".concat(5, ") reached."))
            }(o.component.data, o);
            return {
                spec: function (e, t, n = {}, i) {
                    const o = e.config ? Xs(e.config) : void 0,
                        r = [].concat(e.assembleSelectionData([]), function (e, t) {
                            const n = [], i = Vm(n);
                            let o = 0;
                            for (const t of e.sources) {
                                t.hasName() || (t.dataName = "source_".concat(o++));
                                const e = t.assemble();
                                i(t, e)
                            }
                            for (const e of n) 0 === e.transform.length && delete e.transform;
                            let r = 0;
                            for (const [e, t] of n.entries()) {
                                var a;
                                0 !== (null !== (a = t.transform) && void 0 !== a ? a : []).length || t.source || n.splice(r++, 0, n.splice(e, 1)[0])
                            }
                            for (const t of n) for (const n of null !== (s = t.transform) && void 0 !== s ? s : []) {
                                var s;
                                "lookup" === n.type && (n.from = e.outputNodes[n.from].getSource())
                            }
                            for (const e of n) e.name in t && (e.values = t[e.name]);
                            return n
                        }(e.component.data, n)), a = e.assembleProjections(), s = e.assembleTitle(),
                        c = e.assembleGroupStyle(), u = e.assembleGroupEncodeEntry(!0);
                    let l = e.assembleLayoutSignals();
                    l = l.filter((e => "width" !== e.name && "height" !== e.name || void 0 === e.value || (t[e.name] = +e.value, !1)));
                    const {params: f, ...d} = t;
                    return {
                        $schema: "https://vega.github.io/schema/vega/v5.json", ...e.description ? {description: e.description} : {}, ...d, ...s ? {title: s} : {}, ...c ? {style: c} : {}, ...u ? {encode: {update: u}} : {},
                        data: r, ...a.length > 0 ? {projections: a} : {}, ...e.assembleGroup([...l, ...e.assembleSelectionTopLevelSignals([]), ...As(f)]), ...o ? {config: o} : {}, ...i ? {usermeta: i} : {}
                    }
                }(o, function (e, t, n, i) {
                    const o = i.component.layoutSize.get("width"), r = i.component.layoutSize.get("height");
                    void 0 === t ? (t = {type: "pad"}, i.hasAxisOrientSignalRef() && (t.resize = !0)) : x(t) && (t = {type: t});
                    if (o && r && (a = t.type, "fit" === a || "fit-x" === a || "fit-y" === a)) if ("step" === o && "step" === r) si(jn()), t.type = "pad"; else if ("step" === o || "step" === r) {
                        const e = "step" === o ? "width" : "height";
                        si(jn(on(e)));
                        const n = "width" === e ? "height" : "width";
                        t.type = function (e) {
                            return e ? "fit-".concat(on(e)) : "fit"
                        }(n)
                    }
                    var a;
                    return {...1 === J(t).length && t.type ? "pad" === t.type ? {} : {autosize: t.type} : {autosize: t}, ...zs(n, !1), ...zs(e, !0)}
                }(e, i.autosize, n, o), e.datasets, e.usermeta), normalized: i
            }
        } finally {
            t.logger && (ai = ri), t.fieldTitle && ia(ta)
        }
    }, e.contains = T, e.deepEqual = _, e.deleteNestedProperty = ee, e.duplicate = z, e.entries = Q, e.every = q, e.fieldIntersection = V, e.flatAccessWithDatum = ie, e.getFirstDefined = ue, e.hasIntersection = H, e.hash = j, e.internalField = de, e.isBoolean = $, e.isEmpty = Y, e.isEqual = function (e, t) {
        const n = J(e), i = J(t);
        if (n.length !== i.length) return !1;
        for (const i of n) if (e[i] !== t[i]) return !1;
        return !0
    }, e.isInternalField = pe, e.isNullOrFalse = M, e.isNumeric = he, e.keys = J, e.logicalExpr = Z, e.mergeDeep = R, e.normalize = bc, e.normalizeAngle = me, e.omit = N, e.pick = O, e.prefixGenerator = G, e.removePathFromField = se, e.replaceAll = ae, e.replacePathInField = re, e.resetIdCounter = function () {
        le = 42
    }, e.setEqual = I, e.some = L, e.stringify = P, e.titleCase = te, e.unique = U, e.uniqueId = fe, e.vals = X, e.varName = K, e.version = "4.17.0", Object.defineProperty(e, "__esModule", {value: !0})
}));
//# sourceMappingURL=vega-lite.min.js.map
