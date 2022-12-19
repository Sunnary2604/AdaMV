!function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = "undefined" != typeof globalThis ? globalThis : t || self).vega = {})
}(this, (function (t) {
    "use strict";

    function e(t, e, n) {
        return t.fields = e || [], t.fname = n, t
    }

    function n(t) {
        return null == t ? null : t.fname
    }

    function r(t) {
        return null == t ? null : t.fields
    }

    function i(t) {
        return 1 === t.length ? o(t[0]) : a(t)
    }

    const o = t => function (e) {
        return e[t]
    }, a = t => {
        const e = t.length;
        return function (n) {
            for (let r = 0; r < e; ++r) n = n[t[r]];
            return n
        }
    };

    function u(t) {
        throw Error(t)
    }

    function s(t) {
        const e = [], n = t.length;
        let r, i, o, a = null, s = 0, l = "";

        function c() {
            e.push(l + t.substring(r, i)), l = "", r = i + 1
        }

        for (t += "", r = i = 0; i < n; ++i) if (o = t[i], "\\" === o) l += t.substring(r, i), l += t.substring(++i, ++i), r = i; else if (o === a) c(), a = null, s = -1; else {
            if (a) continue;
            r === s && '"' === o || r === s && "'" === o ? (r = i + 1, a = o) : "." !== o || s ? "[" === o ? (i > r && c(), s = r = i + 1) : "]" === o && (s || u("Access path missing open bracket: " + t), s > 0 && c(), s = 0, r = i + 1) : i > r ? c() : r = i + 1
        }
        return s && u("Access path missing closing bracket: " + t), a && u("Access path missing closing quote: " + t), i > r && (i++, c()), e
    }

    function l(t, n, r) {
        const o = s(t);
        return t = 1 === o.length ? o[0] : t, e((r && r.get || i)(o), [t], n || t)
    }

    const c = l("id"), f = e((t => t), [], "identity"), h = e((() => 0), [], "zero"), d = e((() => 1), [], "one"),
        p = e((() => !0), [], "true"), g = e((() => !1), [], "false");

    function m(t, e, n) {
        const r = [e].concat([].slice.call(n));
        console[t].apply(console, r)
    }

    function y(t, e) {
        let n = t || 0;
        return {
            level(t) {
                return arguments.length ? (n = +t, this) : n
            }, error() {
                return n >= 1 && m(e || "error", "ERROR", arguments), this
            }, warn() {
                return n >= 2 && m(e || "warn", "WARN", arguments), this
            }, info() {
                return n >= 3 && m(e || "log", "INFO", arguments), this
            }, debug() {
                return n >= 4 && m(e || "log", "DEBUG", arguments), this
            }
        }
    }

    var v = Array.isArray;

    function _(t) {
        return t === Object(t)
    }

    const x = t => "__proto__" !== t;

    function b(...t) {
        return t.reduce(((t, e) => {
            for (const n in e) if ("signals" === n) t.signals = k(t.signals, e.signals); else {
                const r = "legend" === n ? {layout: 1} : "style" === n || null;
                w(t, n, e[n], r)
            }
            return t
        }), {})
    }

    function w(t, e, n, r) {
        if (!x(e)) return;
        let i, o;
        if (_(n) && !v(n)) for (i in o = _(t[e]) ? t[e] : t[e] = {}, n) r && (!0 === r || r[i]) ? w(o, i, n[i]) : x(i) && (o[i] = n[i]); else t[e] = n
    }

    function k(t, e) {
        if (null == t) return e;
        const n = {}, r = [];

        function i(t) {
            n[t.name] || (n[t.name] = 1, r.push(t))
        }

        return e.forEach(i), t.forEach(i), r
    }

    function M(t) {
        return t[t.length - 1]
    }

    function A(t) {
        return null == t || "" === t ? null : +t
    }

    const E = t => e => t * Math.exp(e), D = t => e => Math.log(t * e),
        C = t => e => Math.sign(e) * Math.log1p(Math.abs(e / t)),
        F = t => e => Math.sign(e) * Math.expm1(Math.abs(e)) * t,
        S = t => e => e < 0 ? -Math.pow(-e, t) : Math.pow(e, t);

    function B(t, e, n, r) {
        const i = n(t[0]), o = n(M(t)), a = (o - i) * e;
        return [r(i - a), r(o - a)]
    }

    function T(t, e) {
        return B(t, e, A, f)
    }

    function z(t, e) {
        var n = Math.sign(t[0]);
        return B(t, e, D(n), E(n))
    }

    function N(t, e, n) {
        return B(t, e, S(n), S(1 / n))
    }

    function O(t, e, n) {
        return B(t, e, C(n), F(n))
    }

    function R(t, e, n, r, i) {
        const o = r(t[0]), a = r(M(t)), u = null != e ? r(e) : (o + a) / 2;
        return [i(u + (o - u) * n), i(u + (a - u) * n)]
    }

    function L(t, e, n) {
        return R(t, e, n, A, f)
    }

    function U(t, e, n) {
        const r = Math.sign(t[0]);
        return R(t, e, n, D(r), E(r))
    }

    function q(t, e, n, r) {
        return R(t, e, n, S(r), S(1 / r))
    }

    function P(t, e, n, r) {
        return R(t, e, n, C(r), F(r))
    }

    function j(t) {
        return 1 + ~~(new Date(t).getMonth() / 3)
    }

    function I(t) {
        return 1 + ~~(new Date(t).getUTCMonth() / 3)
    }

    function $(t) {
        return null != t ? v(t) ? t : [t] : []
    }

    function W(t, e, n) {
        let r, i = t[0], o = t[1];
        return o < i && (r = o, o = i, i = r), r = o - i, r >= n - e ? [e, n] : [i = Math.min(Math.max(i, e), n - r), i + r]
    }

    function H(t) {
        return "function" == typeof t
    }

    function Y(t, n, i) {
        i = i || {}, n = $(n) || [];
        const o = [], a = [], u = {}, s = i.comparator || G;
        return $(t).forEach(((t, e) => {
            null != t && (o.push("descending" === n[e] ? -1 : 1), a.push(t = H(t) ? t : l(t, null, i)), (r(t) || []).forEach((t => u[t] = 1)))
        })), 0 === a.length ? null : e(s(a, o), Object.keys(u))
    }

    const V = (t, e) => (t < e || null == t) && null != e ? -1 : (t > e || null == e) && null != t ? 1 : (e = e instanceof Date ? +e : e, (t = t instanceof Date ? +t : t) !== t && e == e ? -1 : e != e && t == t ? 1 : 0),
        G = (t, e) => 1 === t.length ? X(t[0], e[0]) : J(t, e, t.length), X = (t, e) => function (n, r) {
            return V(t(n), t(r)) * e
        }, J = (t, e, n) => (e.push(0), function (r, i) {
            let o, a = 0, u = -1;
            for (; 0 === a && ++u < n;) o = t[u], a = V(o(r), o(i));
            return a * e[u]
        });

    function Z(t) {
        return H(t) ? t : () => t
    }

    function Q(t, e) {
        let n;
        return r => {
            n && clearTimeout(n), n = setTimeout((() => (e(r), n = null)), t)
        }
    }

    function K(t) {
        for (let e, n, r = 1, i = arguments.length; r < i; ++r) for (n in e = arguments[r], e) t[n] = e[n];
        return t
    }

    function tt(t, e) {
        let n, r, i, o, a = 0;
        if (t && (n = t.length)) if (null == e) {
            for (r = t[a]; a < n && (null == r || r != r); r = t[++a]) ;
            for (i = o = r; a < n; ++a) r = t[a], null != r && (r < i && (i = r), r > o && (o = r))
        } else {
            for (r = e(t[a]); a < n && (null == r || r != r); r = e(t[++a])) ;
            for (i = o = r; a < n; ++a) r = e(t[a]), null != r && (r < i && (i = r), r > o && (o = r))
        }
        return [i, o]
    }

    function et(t, e) {
        const n = t.length;
        let r, i, o, a, u, s = -1;
        if (null == e) {
            for (; ++s < n;) if (i = t[s], null != i && i >= i) {
                r = o = i;
                break
            }
            if (s === n) return [-1, -1];
            for (a = u = s; ++s < n;) i = t[s], null != i && (r > i && (r = i, a = s), o < i && (o = i, u = s))
        } else {
            for (; ++s < n;) if (i = e(t[s], s, t), null != i && i >= i) {
                r = o = i;
                break
            }
            if (s === n) return [-1, -1];
            for (a = u = s; ++s < n;) i = e(t[s], s, t), null != i && (r > i && (r = i, a = s), o < i && (o = i, u = s))
        }
        return [a, u]
    }

    const nt = Object.prototype.hasOwnProperty;

    function rt(t, e) {
        return nt.call(t, e)
    }

    const it = {};

    function ot(t) {
        let e, n = {};

        function r(t) {
            return rt(n, t) && n[t] !== it
        }

        const i = {
            size: 0, empty: 0, object: n, has: r, get: t => r(t) ? n[t] : void 0, set(t, e) {
                return r(t) || (++i.size, n[t] === it && --i.empty), n[t] = e, this
            }, delete(t) {
                return r(t) && (--i.size, ++i.empty, n[t] = it), this
            }, clear() {
                i.size = i.empty = 0, i.object = n = {}
            }, test(t) {
                return arguments.length ? (e = t, i) : e
            }, clean() {
                const t = {};
                let r = 0;
                for (const i in n) {
                    const o = n[i];
                    o === it || e && e(o) || (t[i] = o, ++r)
                }
                i.size = r, i.empty = 0, i.object = n = t
            }
        };
        return t && Object.keys(t).forEach((e => {
            i.set(e, t[e])
        })), i
    }

    function at(t, e, n, r, i, o) {
        if (!n && 0 !== n) return o;
        const a = +n;
        let u, s = t[0], l = M(t);
        l < s && (u = s, s = l, l = u), u = Math.abs(e - s);
        const c = Math.abs(l - e);
        return u < c && u <= a ? r : c <= a ? i : o
    }

    function ut(t, e, n) {
        const r = t.prototype = Object.create(e.prototype);
        return r.constructor = t, K(r, n)
    }

    function st(t, e, n, r) {
        let i, o = e[0], a = e[e.length - 1];
        return o > a && (i = o, o = a, a = i), r = void 0 === r || r, ((n = void 0 === n || n) ? o <= t : o < t) && (r ? t <= a : t < a)
    }

    function lt(t) {
        return "boolean" == typeof t
    }

    function ct(t) {
        return "[object Date]" === Object.prototype.toString.call(t)
    }

    function ft(t) {
        return t && H(t[Symbol.iterator])
    }

    function ht(t) {
        return "number" == typeof t
    }

    function dt(t) {
        return "[object RegExp]" === Object.prototype.toString.call(t)
    }

    function pt(t) {
        return "string" == typeof t
    }

    function gt(t, n, r) {
        t && (t = n ? $(t).map((t => t.replace(/\\(.)/g, "$1"))) : $(t));
        const o = t && t.length, a = r && r.get || i, u = t => a(n ? [t] : s(t));
        let l;
        if (o) if (1 === o) {
            const e = u(t[0]);
            l = function (t) {
                return "" + e(t)
            }
        } else {
            const e = t.map(u);
            l = function (t) {
                let n = "" + e[0](t), r = 0;
                for (; ++r < o;) n += "|" + e[r](t);
                return n
            }
        } else l = function () {
            return ""
        };
        return e(l, t, "key")
    }

    function mt(t, e) {
        const n = t[0], r = M(t), i = +e;
        return i ? 1 === i ? r : n + i * (r - n) : n
    }

    function yt(t) {
        let e, n, r;
        t = +t || 1e4;
        const i = () => {
            e = {}, n = {}, r = 0
        }, o = (i, o) => (++r > t && (n = e, e = {}, r = 1), e[i] = o);
        return i(), {
            clear: i,
            has: t => rt(e, t) || rt(n, t),
            get: t => rt(e, t) ? e[t] : rt(n, t) ? o(t, n[t]) : void 0,
            set: (t, n) => rt(e, t) ? e[t] = n : o(t, n)
        }
    }

    function vt(t, e, n, r) {
        const i = e.length, o = n.length;
        if (!o) return e;
        if (!i) return n;
        const a = r || new e.constructor(i + o);
        let u = 0, s = 0, l = 0;
        for (; u < i && s < o; ++l) a[l] = t(e[u], n[s]) > 0 ? n[s++] : e[u++];
        for (; u < i; ++u, ++l) a[l] = e[u];
        for (; s < o; ++s, ++l) a[l] = n[s];
        return a
    }

    function _t(t, e) {
        let n = "";
        for (; --e >= 0;) n += t;
        return n
    }

    function xt(t, e, n, r) {
        const i = n || " ", o = t + "", a = e - o.length;
        return a <= 0 ? o : "left" === r ? _t(i, a) + o : "center" === r ? _t(i, ~~(a / 2)) + o + _t(i, Math.ceil(a / 2)) : o + _t(i, a)
    }

    function bt(t) {
        return t && M(t) - t[0] || 0
    }

    function wt(t) {
        return v(t) ? "[" + t.map(wt) + "]" : _(t) || pt(t) ? JSON.stringify(t).replace("\u2028", "\\u2028").replace("\u2029", "\\u2029") : t
    }

    function kt(t) {
        return null == t || "" === t ? null : !(!t || "false" === t || "0" === t) && !!t
    }

    const Mt = t => ht(t) || ct(t) ? t : Date.parse(t);

    function At(t, e) {
        return e = e || Mt, null == t || "" === t ? null : e(t)
    }

    function Et(t) {
        return null == t || "" === t ? null : t + ""
    }

    function Dt(t) {
        const e = {}, n = t.length;
        for (let r = 0; r < n; ++r) e[t[r]] = !0;
        return e
    }

    function Ct(t, e, n, r) {
        const i = null != r ? r : "…", o = t + "", a = o.length, u = Math.max(0, e - i.length);
        return a <= e ? o : "left" === n ? i + o.slice(a - u) : "center" === n ? o.slice(0, Math.ceil(u / 2)) + i + o.slice(a - ~~(u / 2)) : o.slice(0, u) + i
    }

    function Ft(t, e, n) {
        if (t) if (e) {
            const r = t.length;
            for (let i = 0; i < r; ++i) {
                const r = e(t[i]);
                r && n(r, i, t)
            }
        } else t.forEach(n)
    }

    const St = /^([A-Za-z]+:)?\/\//,
        Bt = /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|file|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
        Tt = /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205f\u3000]/g, zt = "file://";

    async function Nt(t, e) {
        const n = await this.sanitize(t, e), r = n.href;
        return n.localFile ? this.file(r) : this.http(r, e)
    }

    async function Ot(t, e) {
        e = K({}, this.options, e);
        const n = this.fileAccess, r = {href: null};
        let i, o, a;
        const s = Bt.test(t.replace(Tt, ""));
        null != t && "string" == typeof t && s || u("Sanitize failure, invalid URI: " + wt(t));
        const l = St.test(t);
        return (a = e.baseURL) && !l && (t.startsWith("/") || "/" === a[a.length - 1] || (t = "/" + t), t = a + t), o = (i = t.startsWith(zt)) || "file" === e.mode || "http" !== e.mode && !l && n, i ? t = t.slice(zt.length) : t.startsWith("//") && ("file" === e.defaultProtocol ? (t = t.slice(2), o = !0) : t = (e.defaultProtocol || "http") + ":" + t), Object.defineProperty(r, "localFile", {value: !!o}), r.href = t, e.target && (r.target = e.target + ""), e.rel && (r.rel = e.rel + ""), "image" === e.context && e.crossOrigin && (r.crossOrigin = e.crossOrigin + ""), r
    }

    function Rt(t) {
        return t ? e => new Promise(((n, r) => {
            t.readFile(e, ((t, e) => {
                t ? r(t) : n(e)
            }))
        })) : Lt
    }

    async function Lt() {
        u("No file system access.")
    }

    function Ut(t) {
        return t ? async function (e, n) {
            const r = K({}, this.options.http, n), i = n && n.response, o = await t(e, r);
            return o.ok ? H(o[i]) ? o[i]() : o.text() : u(o.status + "" + o.statusText)
        } : qt
    }

    async function qt() {
        u("No HTTP fetch method available.")
    }

    const Pt = t => !(Number.isNaN(+t) || t instanceof Date),
        jt = {boolean: kt, integer: A, number: A, date: At, string: Et, unknown: f},
        It = [t => "true" === t || "false" === t || !0 === t || !1 === t, t => Pt(t) && Number.isInteger(+t), Pt, t => !Number.isNaN(Date.parse(t))],
        $t = ["boolean", "integer", "number", "date"];

    function Wt(t, e) {
        if (!t || !t.length) return "unknown";
        const n = t.length, r = It.length, i = It.map(((t, e) => e + 1));
        for (let a, u, s = 0, l = 0; s < n; ++s) for (u = e ? t[s][e] : t[s], a = 0; a < r; ++a) if (i[a] && (null != (o = u) && o == o) && !It[a](u) && (i[a] = 0, ++l, l === It.length)) return "string";
        var o;
        return $t[i.reduce(((t, e) => 0 === t ? e : t), 0) - 1]
    }

    function Ht(t, e) {
        return e.reduce(((e, n) => (e[n] = Wt(t, n), e)), {})
    }

    var Yt = {}, Vt = {};

    function Gt(t) {
        return new Function("d", "return {" + t.map((function (t, e) {
            return JSON.stringify(t) + ": d[" + e + '] || ""'
        })).join(",") + "}")
    }

    function Xt(t) {
        var e = Object.create(null), n = [];
        return t.forEach((function (t) {
            for (var r in t) r in e || n.push(e[r] = r)
        })), n
    }

    function Jt(t, e) {
        var n = t + "", r = n.length;
        return r < e ? new Array(e - r + 1).join(0) + n : n
    }

    function Zt(t) {
        var e = t.getUTCHours(), n = t.getUTCMinutes(), r = t.getUTCSeconds(), i = t.getUTCMilliseconds();
        return isNaN(t) ? "Invalid Date" : function (t) {
            return t < 0 ? "-" + Jt(-t, 6) : t > 9999 ? "+" + Jt(t, 6) : Jt(t, 4)
        }(t.getUTCFullYear()) + "-" + Jt(t.getUTCMonth() + 1, 2) + "-" + Jt(t.getUTCDate(), 2) + (i ? "T" + Jt(e, 2) + ":" + Jt(n, 2) + ":" + Jt(r, 2) + "." + Jt(i, 3) + "Z" : r ? "T" + Jt(e, 2) + ":" + Jt(n, 2) + ":" + Jt(r, 2) + "Z" : n || e ? "T" + Jt(e, 2) + ":" + Jt(n, 2) + "Z" : "")
    }

    function Qt(t) {
        var e = new RegExp('["' + t + "\n\r]"), n = t.charCodeAt(0);

        function r(t, e) {
            var r, i = [], o = t.length, a = 0, u = 0, s = o <= 0, l = !1;

            function c() {
                if (s) return Vt;
                if (l) return l = !1, Yt;
                var e, r, i = a;
                if (34 === t.charCodeAt(i)) {
                    for (; a++ < o && 34 !== t.charCodeAt(a) || 34 === t.charCodeAt(++a);) ;
                    return (e = a) >= o ? s = !0 : 10 === (r = t.charCodeAt(a++)) ? l = !0 : 13 === r && (l = !0, 10 === t.charCodeAt(a) && ++a), t.slice(i + 1, e - 1).replace(/""/g, '"')
                }
                for (; a < o;) {
                    if (10 === (r = t.charCodeAt(e = a++))) l = !0; else if (13 === r) l = !0, 10 === t.charCodeAt(a) && ++a; else if (r !== n) continue;
                    return t.slice(i, e)
                }
                return s = !0, t.slice(i, o)
            }

            for (10 === t.charCodeAt(o - 1) && --o, 13 === t.charCodeAt(o - 1) && --o; (r = c()) !== Vt;) {
                for (var f = []; r !== Yt && r !== Vt;) f.push(r), r = c();
                e && null == (f = e(f, u++)) || i.push(f)
            }
            return i
        }

        function i(e, n) {
            return e.map((function (e) {
                return n.map((function (t) {
                    return a(e[t])
                })).join(t)
            }))
        }

        function o(e) {
            return e.map(a).join(t)
        }

        function a(t) {
            return null == t ? "" : t instanceof Date ? Zt(t) : e.test(t += "") ? '"' + t.replace(/"/g, '""') + '"' : t
        }

        return {
            parse: function (t, e) {
                var n, i, o = r(t, (function (t, r) {
                    if (n) return n(t, r - 1);
                    i = t, n = e ? function (t, e) {
                        var n = Gt(t);
                        return function (r, i) {
                            return e(n(r), i, t)
                        }
                    }(t, e) : Gt(t)
                }));
                return o.columns = i || [], o
            }, parseRows: r, format: function (e, n) {
                return null == n && (n = Xt(e)), [n.map(a).join(t)].concat(i(e, n)).join("\n")
            }, formatBody: function (t, e) {
                return null == e && (e = Xt(t)), i(t, e).join("\n")
            }, formatRows: function (t) {
                return t.map(o).join("\n")
            }, formatRow: o, formatValue: a
        }
    }

    function Kt(t) {
        const e = function (e, n) {
            const r = {delimiter: t};
            return te(e, n ? K(n, r) : r)
        };
        return e.responseType = "text", e
    }

    function te(t, e) {
        return e.header && (t = e.header.map(wt).join(e.delimiter) + "\n" + t), Qt(e.delimiter).parse(t + "")
    }

    function ee(t, e) {
        const n = e && e.property ? l(e.property) : f;
        return !_(t) || (r = t, "function" == typeof Buffer && H(Buffer.isBuffer) && Buffer.isBuffer(r)) ? n(JSON.parse(t)) : function (t, e) {
            !v(t) && ft(t) && (t = [...t]);
            return e && e.copy ? JSON.parse(JSON.stringify(t)) : t
        }(n(t), e);
        var r
    }

    function ne(t) {
        return t
    }

    function re(t, e) {
        return "string" == typeof e && (e = t.objects[e]), "GeometryCollection" === e.type ? {
            type: "FeatureCollection",
            features: e.geometries.map((function (e) {
                return ie(t, e)
            }))
        } : ie(t, e)
    }

    function ie(t, e) {
        var n = e.id, r = e.bbox, i = null == e.properties ? {} : e.properties, o = oe(t, e);
        return null == n && null == r ? {type: "Feature", properties: i, geometry: o} : null == r ? {
            type: "Feature",
            id: n,
            properties: i,
            geometry: o
        } : {type: "Feature", id: n, bbox: r, properties: i, geometry: o}
    }

    function oe(t, e) {
        var n = function (t) {
            if (null == t) return ne;
            var e, n, r = t.scale[0], i = t.scale[1], o = t.translate[0], a = t.translate[1];
            return function (t, u) {
                u || (e = n = 0);
                var s = 2, l = t.length, c = new Array(l);
                for (c[0] = (e += t[0]) * r + o, c[1] = (n += t[1]) * i + a; s < l;) c[s] = t[s], ++s;
                return c
            }
        }(t.transform), r = t.arcs;

        function i(t, e) {
            e.length && e.pop();
            for (var i = r[t < 0 ? ~t : t], o = 0, a = i.length; o < a; ++o) e.push(n(i[o], o));
            t < 0 && function (t, e) {
                for (var n, r = t.length, i = r - e; i < --r;) n = t[i], t[i++] = t[r], t[r] = n
            }(e, a)
        }

        function o(t) {
            return n(t)
        }

        function a(t) {
            for (var e = [], n = 0, r = t.length; n < r; ++n) i(t[n], e);
            return e.length < 2 && e.push(e[0]), e
        }

        function u(t) {
            for (var e = a(t); e.length < 4;) e.push(e[0]);
            return e
        }

        function s(t) {
            return t.map(u)
        }

        return function t(e) {
            var n, r = e.type;
            switch (r) {
                case"GeometryCollection":
                    return {type: r, geometries: e.geometries.map(t)};
                case"Point":
                    n = o(e.coordinates);
                    break;
                case"MultiPoint":
                    n = e.coordinates.map(o);
                    break;
                case"LineString":
                    n = a(e.arcs);
                    break;
                case"MultiLineString":
                    n = e.arcs.map(a);
                    break;
                case"Polygon":
                    n = s(e.arcs);
                    break;
                case"MultiPolygon":
                    n = e.arcs.map(s);
                    break;
                default:
                    return null
            }
            return {type: r, coordinates: n}
        }(e)
    }

    function ae(t, e) {
        var n = {}, r = {}, i = {}, o = [], a = -1;

        function u(t, e) {
            for (var r in t) {
                var i = t[r];
                delete e[i.start], delete i.start, delete i.end, i.forEach((function (t) {
                    n[t < 0 ? ~t : t] = 1
                })), o.push(i)
            }
        }

        return e.forEach((function (n, r) {
            var i, o = t.arcs[n < 0 ? ~n : n];
            o.length < 3 && !o[1][0] && !o[1][1] && (i = e[++a], e[a] = n, e[r] = i)
        })), e.forEach((function (e) {
            var n, o, a = function (e) {
                var n, r = t.arcs[e < 0 ? ~e : e], i = r[0];
                t.transform ? (n = [0, 0], r.forEach((function (t) {
                    n[0] += t[0], n[1] += t[1]
                }))) : n = r[r.length - 1];
                return e < 0 ? [n, i] : [i, n]
            }(e), u = a[0], s = a[1];
            if (n = i[u]) if (delete i[n.end], n.push(e), n.end = s, o = r[s]) {
                delete r[o.start];
                var l = o === n ? n : n.concat(o);
                r[l.start = n.start] = i[l.end = o.end] = l
            } else r[n.start] = i[n.end] = n; else if (n = r[s]) if (delete r[n.start], n.unshift(e), n.start = u, o = i[u]) {
                delete i[o.end];
                var c = o === n ? n : o.concat(n);
                r[c.start = o.start] = i[c.end = n.end] = c
            } else r[n.start] = i[n.end] = n; else r[(n = [e]).start = u] = i[n.end = s] = n
        })), u(i, r), u(r, i), e.forEach((function (t) {
            n[t < 0 ? ~t : t] || o.push([t])
        })), o
    }

    function ue(t) {
        return oe(t, se.apply(this, arguments))
    }

    function se(t, e, n) {
        var r, i, o;
        if (arguments.length > 1) r = le(t, e, n); else for (i = 0, r = new Array(o = t.arcs.length); i < o; ++i) r[i] = i;
        return {type: "MultiLineString", arcs: ae(t, r)}
    }

    function le(t, e, n) {
        var r, i = [], o = [];

        function a(t) {
            var e = t < 0 ? ~t : t;
            (o[e] || (o[e] = [])).push({i: t, g: r})
        }

        function u(t) {
            t.forEach(a)
        }

        function s(t) {
            t.forEach(u)
        }

        return function t(e) {
            switch (r = e, e.type) {
                case"GeometryCollection":
                    e.geometries.forEach(t);
                    break;
                case"LineString":
                    u(e.arcs);
                    break;
                case"MultiLineString":
                case"Polygon":
                    s(e.arcs);
                    break;
                case"MultiPolygon":
                    !function (t) {
                        t.forEach(s)
                    }(e.arcs)
            }
        }(e), o.forEach(null == n ? function (t) {
            i.push(t[0].i)
        } : function (t) {
            n(t[0].g, t[t.length - 1].g) && i.push(t[0].i)
        }), i
    }

    te.responseType = "text", ee.responseType = "json";
    const ce = {interior: (t, e) => t !== e, exterior: (t, e) => t === e};

    function fe(t, e) {
        let n, r, i, o;
        return t = ee(t, e), e && e.feature ? (n = re, i = e.feature) : e && e.mesh ? (n = ue, i = e.mesh, o = ce[e.filter]) : u("Missing TopoJSON feature or mesh parameter."), r = (r = t.objects[i]) ? n(t, r, o) : u("Invalid TopoJSON object: " + i), r && r.features || [r]
    }

    fe.responseType = "json";
    const he = {dsv: te, csv: Kt(","), tsv: Kt("\t"), json: ee, topojson: fe};

    function de(t, e) {
        return arguments.length > 1 ? (he[t] = e, this) : rt(he, t) ? he[t] : null
    }

    function pe(t) {
        const e = de(t);
        return e && e.responseType || "text"
    }

    function ge(t, e) {
        return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN
    }

    function me(t) {
        let e = t, n = t;

        function r(t, e, r, i) {
            for (null == r && (r = 0), null == i && (i = t.length); r < i;) {
                const o = r + i >>> 1;
                n(t[o], e) < 0 ? r = o + 1 : i = o
            }
            return r
        }

        return 1 === t.length && (e = (e, n) => t(e) - n, n = function (t) {
            return (e, n) => ge(t(e), n)
        }(t)), {
            left: r, center: function (t, n, i, o) {
                null == i && (i = 0), null == o && (o = t.length);
                const a = r(t, n, i, o - 1);
                return a > i && e(t[a - 1], n) > -e(t[a], n) ? a - 1 : a
            }, right: function (t, e, r, i) {
                for (null == r && (r = 0), null == i && (i = t.length); r < i;) {
                    const o = r + i >>> 1;
                    n(t[o], e) > 0 ? i = o : r = o + 1
                }
                return r
            }
        }
    }

    function ye(t) {
        return null === t ? NaN : +t
    }

    const ve = me(ge), _e = ve.right, xe = ve.left;
    me(ye).center;

    class be {
        constructor() {
            this._partials = new Float64Array(32), this._n = 0
        }

        add(t) {
            const e = this._partials;
            let n = 0;
            for (let r = 0; r < this._n && r < 32; r++) {
                const i = e[r], o = t + i, a = Math.abs(t) < Math.abs(i) ? t - (o - i) : i - (o - t);
                a && (e[n++] = a), t = o
            }
            return e[n] = t, this._n = n + 1, this
        }

        valueOf() {
            const t = this._partials;
            let e, n, r, i = this._n, o = 0;
            if (i > 0) {
                for (o = t[--i]; i > 0 && (e = o, n = t[--i], o = e + n, r = n - (o - e), !r);) ;
                i > 0 && (r < 0 && t[i - 1] < 0 || r > 0 && t[i - 1] > 0) && (n = 2 * r, e = o + n, n == e - o && (o = e))
            }
            return o
        }
    }

    var we = Math.sqrt(50), ke = Math.sqrt(10), Me = Math.sqrt(2);

    function Ae(t, e, n) {
        var r, i, o, a, u = -1;
        if (n = +n, (t = +t) === (e = +e) && n > 0) return [t];
        if ((r = e < t) && (i = t, t = e, e = i), 0 === (a = Ee(t, e, n)) || !isFinite(a)) return [];
        if (a > 0) for (t = Math.ceil(t / a), e = Math.floor(e / a), o = new Array(i = Math.ceil(e - t + 1)); ++u < i;) o[u] = (t + u) * a; else for (a = -a, t = Math.ceil(t * a), e = Math.floor(e * a), o = new Array(i = Math.ceil(e - t + 1)); ++u < i;) o[u] = (t + u) / a;
        return r && o.reverse(), o
    }

    function Ee(t, e, n) {
        var r = (e - t) / Math.max(0, n), i = Math.floor(Math.log(r) / Math.LN10), o = r / Math.pow(10, i);
        return i >= 0 ? (o >= we ? 10 : o >= ke ? 5 : o >= Me ? 2 : 1) * Math.pow(10, i) : -Math.pow(10, -i) / (o >= we ? 10 : o >= ke ? 5 : o >= Me ? 2 : 1)
    }

    function De(t, e, n) {
        var r = Math.abs(e - t) / Math.max(0, n), i = Math.pow(10, Math.floor(Math.log(r) / Math.LN10)), o = r / i;
        return o >= we ? i *= 10 : o >= ke ? i *= 5 : o >= Me && (i *= 2), e < t ? -i : i
    }

    function Ce(t, e) {
        let n;
        if (void 0 === e) for (const e of t) null != e && (n < e || void 0 === n && e >= e) && (n = e); else {
            let r = -1;
            for (let i of t) null != (i = e(i, ++r, t)) && (n < i || void 0 === n && i >= i) && (n = i)
        }
        return n
    }

    function Fe(t, e) {
        let n;
        if (void 0 === e) for (const e of t) null != e && (n > e || void 0 === n && e >= e) && (n = e); else {
            let r = -1;
            for (let i of t) null != (i = e(i, ++r, t)) && (n > i || void 0 === n && i >= i) && (n = i)
        }
        return n
    }

    function Se(t, e, n = 0, r = t.length - 1, i = ge) {
        for (; r > n;) {
            if (r - n > 600) {
                const o = r - n + 1, a = e - n + 1, u = Math.log(o), s = .5 * Math.exp(2 * u / 3),
                    l = .5 * Math.sqrt(u * s * (o - s) / o) * (a - o / 2 < 0 ? -1 : 1);
                Se(t, e, Math.max(n, Math.floor(e - a * s / o + l)), Math.min(r, Math.floor(e + (o - a) * s / o + l)), i)
            }
            const o = t[e];
            let a = n, u = r;
            for (Be(t, n, e), i(t[r], o) > 0 && Be(t, n, r); a < u;) {
                for (Be(t, a, u), ++a, --u; i(t[a], o) < 0;) ++a;
                for (; i(t[u], o) > 0;) --u
            }
            0 === i(t[n], o) ? Be(t, n, u) : (++u, Be(t, u, r)), u <= e && (n = u + 1), e <= u && (r = u - 1)
        }
        return t
    }

    function Be(t, e, n) {
        const r = t[e];
        t[e] = t[n], t[n] = r
    }

    function Te(t, e, n) {
        if (r = (t = Float64Array.from(function* (t, e) {
            if (void 0 === e) for (let e of t) null != e && (e = +e) >= e && (yield e); else {
                let n = -1;
                for (let r of t) null != (r = e(r, ++n, t)) && (r = +r) >= r && (yield r)
            }
        }(t, n))).length) {
            if ((e = +e) <= 0 || r < 2) return Fe(t);
            if (e >= 1) return Ce(t);
            var r, i = (r - 1) * e, o = Math.floor(i), a = Ce(Se(t, o).subarray(0, o + 1));
            return a + (Fe(t.subarray(o + 1)) - a) * (i - o)
        }
    }

    function ze(t, e, n = ye) {
        if (r = t.length) {
            if ((e = +e) <= 0 || r < 2) return +n(t[0], 0, t);
            if (e >= 1) return +n(t[r - 1], r - 1, t);
            var r, i = (r - 1) * e, o = Math.floor(i), a = +n(t[o], o, t);
            return a + (+n(t[o + 1], o + 1, t) - a) * (i - o)
        }
    }

    function Ne(t, e) {
        return Te(t, .5, e)
    }

    function Oe(t) {
        return Array.from(function* (t) {
            for (const e of t) yield* e
        }(t))
    }

    function Re(t, e, n) {
        t = +t, e = +e, n = (i = arguments.length) < 2 ? (e = t, t = 0, 1) : i < 3 ? 1 : +n;
        for (var r = -1, i = 0 | Math.max(0, Math.ceil((e - t) / n)), o = new Array(i); ++r < i;) o[r] = t + r * n;
        return o
    }

    function Le(t, e) {
        let n = 0;
        if (void 0 === e) for (let e of t) (e = +e) && (n += e); else {
            let r = -1;
            for (let i of t) (i = +e(i, ++r, t)) && (n += i)
        }
        return n
    }

    function Ue(t, e) {
        if ((n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e")) < 0) return null;
        var n, r = t.slice(0, n);
        return [r.length > 1 ? r[0] + r.slice(2) : r, +t.slice(n + 1)]
    }

    function qe(t) {
        return (t = Ue(Math.abs(t))) ? t[1] : NaN
    }

    var Pe, je = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

    function Ie(t) {
        if (!(e = je.exec(t))) throw new Error("invalid format: " + t);
        var e;
        return new $e({
            fill: e[1],
            align: e[2],
            sign: e[3],
            symbol: e[4],
            zero: e[5],
            width: e[6],
            comma: e[7],
            precision: e[8] && e[8].slice(1),
            trim: e[9],
            type: e[10]
        })
    }

    function $e(t) {
        this.fill = void 0 === t.fill ? " " : t.fill + "", this.align = void 0 === t.align ? ">" : t.align + "", this.sign = void 0 === t.sign ? "-" : t.sign + "", this.symbol = void 0 === t.symbol ? "" : t.symbol + "", this.zero = !!t.zero, this.width = void 0 === t.width ? void 0 : +t.width, this.comma = !!t.comma, this.precision = void 0 === t.precision ? void 0 : +t.precision, this.trim = !!t.trim, this.type = void 0 === t.type ? "" : t.type + ""
    }

    function We(t, e) {
        var n = Ue(t, e);
        if (!n) return t + "";
        var r = n[0], i = n[1];
        return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0")
    }

    Ie.prototype = $e.prototype, $e.prototype.toString = function () {
        return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (void 0 === this.width ? "" : Math.max(1, 0 | this.width)) + (this.comma ? "," : "") + (void 0 === this.precision ? "" : "." + Math.max(0, 0 | this.precision)) + (this.trim ? "~" : "") + this.type
    };
    var He = {
        "%": (t, e) => (100 * t).toFixed(e),
        b: t => Math.round(t).toString(2),
        c: t => t + "",
        d: function (t) {
            return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10)
        },
        e: (t, e) => t.toExponential(e),
        f: (t, e) => t.toFixed(e),
        g: (t, e) => t.toPrecision(e),
        o: t => Math.round(t).toString(8),
        p: (t, e) => We(100 * t, e),
        r: We,
        s: function (t, e) {
            var n = Ue(t, e);
            if (!n) return t + "";
            var r = n[0], i = n[1], o = i - (Pe = 3 * Math.max(-8, Math.min(8, Math.floor(i / 3)))) + 1, a = r.length;
            return o === a ? r : o > a ? r + new Array(o - a + 1).join("0") : o > 0 ? r.slice(0, o) + "." + r.slice(o) : "0." + new Array(1 - o).join("0") + Ue(t, Math.max(0, e + o - 1))[0]
        },
        X: t => Math.round(t).toString(16).toUpperCase(),
        x: t => Math.round(t).toString(16)
    };

    function Ye(t) {
        return t
    }

    var Ve, Ge, Xe, Je = Array.prototype.map,
        Ze = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];

    function Qe(t) {
        var e, n,
            r = void 0 === t.grouping || void 0 === t.thousands ? Ye : (e = Je.call(t.grouping, Number), n = t.thousands + "", function (t, r) {
                for (var i = t.length, o = [], a = 0, u = e[0], s = 0; i > 0 && u > 0 && (s + u + 1 > r && (u = Math.max(1, r - s)), o.push(t.substring(i -= u, i + u)), !((s += u + 1) > r));) u = e[a = (a + 1) % e.length];
                return o.reverse().join(n)
            }), i = void 0 === t.currency ? "" : t.currency[0] + "",
            o = void 0 === t.currency ? "" : t.currency[1] + "", a = void 0 === t.decimal ? "." : t.decimal + "",
            u = void 0 === t.numerals ? Ye : function (t) {
                return function (e) {
                    return e.replace(/[0-9]/g, (function (e) {
                        return t[+e]
                    }))
                }
            }(Je.call(t.numerals, String)), s = void 0 === t.percent ? "%" : t.percent + "",
            l = void 0 === t.minus ? "−" : t.minus + "", c = void 0 === t.nan ? "NaN" : t.nan + "";

        function f(t) {
            var e = (t = Ie(t)).fill, n = t.align, f = t.sign, h = t.symbol, d = t.zero, p = t.width, g = t.comma,
                m = t.precision, y = t.trim, v = t.type;
            "n" === v ? (g = !0, v = "g") : He[v] || (void 0 === m && (m = 12), y = !0, v = "g"), (d || "0" === e && "=" === n) && (d = !0, e = "0", n = "=");
            var _ = "$" === h ? i : "#" === h && /[boxX]/.test(v) ? "0" + v.toLowerCase() : "",
                x = "$" === h ? o : /[%p]/.test(v) ? s : "", b = He[v], w = /[defgprs%]/.test(v);

            function k(t) {
                var i, o, s, h = _, k = x;
                if ("c" === v) k = b(t) + k, t = ""; else {
                    var M = (t = +t) < 0 || 1 / t < 0;
                    if (t = isNaN(t) ? c : b(Math.abs(t), m), y && (t = function (t) {
                        t:for (var e, n = t.length, r = 1, i = -1; r < n; ++r) switch (t[r]) {
                            case".":
                                i = e = r;
                                break;
                            case"0":
                                0 === i && (i = r), e = r;
                                break;
                            default:
                                if (!+t[r]) break t;
                                i > 0 && (i = 0)
                        }
                        return i > 0 ? t.slice(0, i) + t.slice(e + 1) : t
                    }(t)), M && 0 == +t && "+" !== f && (M = !1), h = (M ? "(" === f ? f : l : "-" === f || "(" === f ? "" : f) + h, k = ("s" === v ? Ze[8 + Pe / 3] : "") + k + (M && "(" === f ? ")" : ""), w) for (i = -1, o = t.length; ++i < o;) if (48 > (s = t.charCodeAt(i)) || s > 57) {
                        k = (46 === s ? a + t.slice(i + 1) : t.slice(i)) + k, t = t.slice(0, i);
                        break
                    }
                }
                g && !d && (t = r(t, 1 / 0));
                var A = h.length + t.length + k.length, E = A < p ? new Array(p - A + 1).join(e) : "";
                switch (g && d && (t = r(E + t, E.length ? p - k.length : 1 / 0), E = ""), n) {
                    case"<":
                        t = h + t + k + E;
                        break;
                    case"=":
                        t = h + E + t + k;
                        break;
                    case"^":
                        t = E.slice(0, A = E.length >> 1) + h + t + k + E.slice(A);
                        break;
                    default:
                        t = E + h + t + k
                }
                return u(t)
            }

            return m = void 0 === m ? 6 : /[gprs]/.test(v) ? Math.max(1, Math.min(21, m)) : Math.max(0, Math.min(20, m)), k.toString = function () {
                return t + ""
            }, k
        }

        return {
            format: f, formatPrefix: function (t, e) {
                var n = f(((t = Ie(t)).type = "f", t)), r = 3 * Math.max(-8, Math.min(8, Math.floor(qe(e) / 3))),
                    i = Math.pow(10, -r), o = Ze[8 + r / 3];
                return function (t) {
                    return n(i * t) + o
                }
            }
        }
    }

    function Ke(t) {
        return Math.max(0, -qe(Math.abs(t)))
    }

    function tn(t, e) {
        return Math.max(0, 3 * Math.max(-8, Math.min(8, Math.floor(qe(e) / 3))) - qe(Math.abs(t)))
    }

    function en(t, e) {
        return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, qe(e) - qe(t)) + 1
    }

    !function (t) {
        Ve = Qe(t), Ge = Ve.format, Xe = Ve.formatPrefix
    }({thousands: ",", grouping: [3], currency: ["$", ""]});
    var nn = new Date, rn = new Date;

    function on(t, e, n, r) {
        function i(e) {
            return t(e = 0 === arguments.length ? new Date : new Date(+e)), e
        }

        return i.floor = function (e) {
            return t(e = new Date(+e)), e
        }, i.ceil = function (n) {
            return t(n = new Date(n - 1)), e(n, 1), t(n), n
        }, i.round = function (t) {
            var e = i(t), n = i.ceil(t);
            return t - e < n - t ? e : n
        }, i.offset = function (t, n) {
            return e(t = new Date(+t), null == n ? 1 : Math.floor(n)), t
        }, i.range = function (n, r, o) {
            var a, u = [];
            if (n = i.ceil(n), o = null == o ? 1 : Math.floor(o), !(n < r && o > 0)) return u;
            do {
                u.push(a = new Date(+n)), e(n, o), t(n)
            } while (a < n && n < r);
            return u
        }, i.filter = function (n) {
            return on((function (e) {
                if (e >= e) for (; t(e), !n(e);) e.setTime(e - 1)
            }), (function (t, r) {
                if (t >= t) if (r < 0) for (; ++r <= 0;) for (; e(t, -1), !n(t);) ; else for (; --r >= 0;) for (; e(t, 1), !n(t);) ;
            }))
        }, n && (i.count = function (e, r) {
            return nn.setTime(+e), rn.setTime(+r), t(nn), t(rn), Math.floor(n(nn, rn))
        }, i.every = function (t) {
            return t = Math.floor(t), isFinite(t) && t > 0 ? t > 1 ? i.filter(r ? function (e) {
                return r(e) % t == 0
            } : function (e) {
                return i.count(0, e) % t == 0
            }) : i : null
        }), i
    }

    var an = on((function () {
    }), (function (t, e) {
        t.setTime(+t + e)
    }), (function (t, e) {
        return e - t
    }));
    an.every = function (t) {
        return t = Math.floor(t), isFinite(t) && t > 0 ? t > 1 ? on((function (e) {
            e.setTime(Math.floor(e / t) * t)
        }), (function (e, n) {
            e.setTime(+e + n * t)
        }), (function (e, n) {
            return (n - e) / t
        })) : an : null
    };
    var un = 1e3, sn = 6e4, ln = 36e5, cn = 864e5, fn = 6048e5, hn = on((function (t) {
            t.setTime(t - t.getMilliseconds())
        }), (function (t, e) {
            t.setTime(+t + e * un)
        }), (function (t, e) {
            return (e - t) / un
        }), (function (t) {
            return t.getUTCSeconds()
        })), dn = on((function (t) {
            t.setTime(t - t.getMilliseconds() - t.getSeconds() * un)
        }), (function (t, e) {
            t.setTime(+t + e * sn)
        }), (function (t, e) {
            return (e - t) / sn
        }), (function (t) {
            return t.getMinutes()
        })), pn = on((function (t) {
            t.setTime(t - t.getMilliseconds() - t.getSeconds() * un - t.getMinutes() * sn)
        }), (function (t, e) {
            t.setTime(+t + e * ln)
        }), (function (t, e) {
            return (e - t) / ln
        }), (function (t) {
            return t.getHours()
        })),
        gn = on((t => t.setHours(0, 0, 0, 0)), ((t, e) => t.setDate(t.getDate() + e)), ((t, e) => (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * sn) / cn), (t => t.getDate() - 1));

    function mn(t) {
        return on((function (e) {
            e.setDate(e.getDate() - (e.getDay() + 7 - t) % 7), e.setHours(0, 0, 0, 0)
        }), (function (t, e) {
            t.setDate(t.getDate() + 7 * e)
        }), (function (t, e) {
            return (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * sn) / fn
        }))
    }

    var yn = mn(0), vn = mn(1), _n = (mn(2), mn(3), mn(4)), xn = (mn(5), mn(6), on((function (t) {
        t.setDate(1), t.setHours(0, 0, 0, 0)
    }), (function (t, e) {
        t.setMonth(t.getMonth() + e)
    }), (function (t, e) {
        return e.getMonth() - t.getMonth() + 12 * (e.getFullYear() - t.getFullYear())
    }), (function (t) {
        return t.getMonth()
    }))), bn = on((function (t) {
        t.setMonth(0, 1), t.setHours(0, 0, 0, 0)
    }), (function (t, e) {
        t.setFullYear(t.getFullYear() + e)
    }), (function (t, e) {
        return e.getFullYear() - t.getFullYear()
    }), (function (t) {
        return t.getFullYear()
    }));
    bn.every = function (t) {
        return isFinite(t = Math.floor(t)) && t > 0 ? on((function (e) {
            e.setFullYear(Math.floor(e.getFullYear() / t) * t), e.setMonth(0, 1), e.setHours(0, 0, 0, 0)
        }), (function (e, n) {
            e.setFullYear(e.getFullYear() + n * t)
        })) : null
    };
    var wn = on((function (t) {
        t.setUTCSeconds(0, 0)
    }), (function (t, e) {
        t.setTime(+t + e * sn)
    }), (function (t, e) {
        return (e - t) / sn
    }), (function (t) {
        return t.getUTCMinutes()
    })), kn = on((function (t) {
        t.setUTCMinutes(0, 0, 0)
    }), (function (t, e) {
        t.setTime(+t + e * ln)
    }), (function (t, e) {
        return (e - t) / ln
    }), (function (t) {
        return t.getUTCHours()
    })), Mn = on((function (t) {
        t.setUTCHours(0, 0, 0, 0)
    }), (function (t, e) {
        t.setUTCDate(t.getUTCDate() + e)
    }), (function (t, e) {
        return (e - t) / cn
    }), (function (t) {
        return t.getUTCDate() - 1
    }));

    function An(t) {
        return on((function (e) {
            e.setUTCDate(e.getUTCDate() - (e.getUTCDay() + 7 - t) % 7), e.setUTCHours(0, 0, 0, 0)
        }), (function (t, e) {
            t.setUTCDate(t.getUTCDate() + 7 * e)
        }), (function (t, e) {
            return (e - t) / fn
        }))
    }

    var En = An(0), Dn = An(1), Cn = (An(2), An(3), An(4)), Fn = (An(5), An(6), on((function (t) {
        t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0)
    }), (function (t, e) {
        t.setUTCMonth(t.getUTCMonth() + e)
    }), (function (t, e) {
        return e.getUTCMonth() - t.getUTCMonth() + 12 * (e.getUTCFullYear() - t.getUTCFullYear())
    }), (function (t) {
        return t.getUTCMonth()
    }))), Sn = on((function (t) {
        t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0)
    }), (function (t, e) {
        t.setUTCFullYear(t.getUTCFullYear() + e)
    }), (function (t, e) {
        return e.getUTCFullYear() - t.getUTCFullYear()
    }), (function (t) {
        return t.getUTCFullYear()
    }));
    Sn.every = function (t) {
        return isFinite(t = Math.floor(t)) && t > 0 ? on((function (e) {
            e.setUTCFullYear(Math.floor(e.getUTCFullYear() / t) * t), e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0)
        }), (function (e, n) {
            e.setUTCFullYear(e.getUTCFullYear() + n * t)
        })) : null
    };
    const Bn = "year", Tn = "quarter", zn = "month", Nn = "week", On = "date", Rn = "day", Ln = "dayofyear",
        Un = "hours", qn = "minutes", Pn = "seconds", jn = "milliseconds",
        In = [Bn, Tn, zn, Nn, On, Rn, Ln, Un, qn, Pn, jn], $n = In.reduce(((t, e, n) => (t[e] = 1 + n, t)), {});

    function Wn(t) {
        const e = $(t).slice(), n = {};
        e.length || u("Missing time unit."), e.forEach((t => {
            rt($n, t) ? n[t] = 1 : u("Invalid time unit: ".concat(t, "."))
        }));
        return (n.week || n.day ? 1 : 0) + (n.quarter || n.month || n.date ? 1 : 0) + (n.dayofyear ? 1 : 0) > 1 && u("Incompatible time units: ".concat(t)), e.sort(((t, e) => $n[t] - $n[e])), e
    }

    const Hn = {
        [Bn]: "%Y ",
        [Tn]: "Q%q ",
        [zn]: "%b ",
        [On]: "%d ",
        [Nn]: "W%U ",
        [Rn]: "%a ",
        [Ln]: "%j ",
        [Un]: "%H:00",
        [qn]: "00:%M",
        [Pn]: ":%S",
        [jn]: ".%L",
        ["".concat(Bn, "-").concat(zn)]: "%Y-%m ",
        ["".concat(Bn, "-").concat(zn, "-").concat(On)]: "%Y-%m-%d ",
        ["".concat(Un, "-").concat(qn)]: "%H:%M"
    };

    function Yn(t, e) {
        const n = K({}, Hn, e), r = Wn(t), i = r.length;
        let o, a, u = "", s = 0;
        for (s = 0; s < i;) for (o = r.length; o > s; --o) if (a = r.slice(s, o).join("-"), null != n[a]) {
            u += n[a], s = o;
            break
        }
        return u.trim()
    }

    const Vn = new Date;

    function Gn(t) {
        return Vn.setFullYear(t), Vn.setMonth(0), Vn.setDate(1), Vn.setHours(0, 0, 0, 0), Vn
    }

    function Xn(t) {
        return Zn(new Date(t))
    }

    function Jn(t) {
        return Qn(new Date(t))
    }

    function Zn(t) {
        return gn.count(Gn(t.getFullYear()) - 1, t)
    }

    function Qn(t) {
        return yn.count(Gn(t.getFullYear()) - 1, t)
    }

    function Kn(t) {
        return Gn(t).getDay()
    }

    function tr(t, e, n, r, i, o, a) {
        if (0 <= t && t < 100) {
            const u = new Date(-1, e, n, r, i, o, a);
            return u.setFullYear(t), u
        }
        return new Date(t, e, n, r, i, o, a)
    }

    function er(t) {
        return rr(new Date(t))
    }

    function nr(t) {
        return ir(new Date(t))
    }

    function rr(t) {
        const e = Date.UTC(t.getUTCFullYear(), 0, 1);
        return Mn.count(e - 1, t)
    }

    function ir(t) {
        const e = Date.UTC(t.getUTCFullYear(), 0, 1);
        return En.count(e - 1, t)
    }

    function or(t) {
        return Vn.setTime(Date.UTC(t, 0, 1)), Vn.getUTCDay()
    }

    function ar(t, e, n, r, i, o, a) {
        if (0 <= t && t < 100) {
            const t = new Date(Date.UTC(-1, e, n, r, i, o, a));
            return t.setUTCFullYear(n.y), t
        }
        return new Date(Date.UTC(t, e, n, r, i, o, a))
    }

    function ur(t, e, n, r, i) {
        const o = e || 1, a = M(t), u = (t, e, i) => function (t, e, n, r) {
                const i = n <= 1 ? t : r ? (e, i) => r + n * Math.floor((t(e, i) - r) / n) : (e, r) => n * Math.floor(t(e, r) / n);
                return e ? (t, n) => e(i(t, n), n) : i
            }(n[i = i || t], r[i], t === a && o, e), s = new Date, l = Dt(t), c = l.year ? u(Bn) : Z(2012),
            f = l.month ? u(zn) : l.quarter ? u(Tn) : h,
            p = l.week && l.day ? u(Rn, 1, Nn + Rn) : l.week ? u(Nn, 1) : l.day ? u(Rn, 1) : l.date ? u(On, 1) : l.dayofyear ? u(Ln, 1) : d,
            g = l.hours ? u(Un) : h, m = l.minutes ? u(qn) : h, y = l.seconds ? u(Pn) : h,
            v = l.milliseconds ? u(jn) : h;
        return function (t) {
            s.setTime(+t);
            const e = c(s);
            return i(e, f(s), p(s, e), g(s), m(s), y(s), v(s))
        }
    }

    function sr(t, e, n) {
        return e + 7 * t - (n + 6) % 7
    }

    const lr = {
        [Bn]: t => t.getFullYear(),
        [Tn]: t => Math.floor(t.getMonth() / 3),
        [zn]: t => t.getMonth(),
        [On]: t => t.getDate(),
        [Un]: t => t.getHours(),
        [qn]: t => t.getMinutes(),
        [Pn]: t => t.getSeconds(),
        [jn]: t => t.getMilliseconds(),
        [Ln]: t => Zn(t),
        [Nn]: t => Qn(t),
        [Nn + Rn]: (t, e) => sr(Qn(t), t.getDay(), Kn(e)),
        [Rn]: (t, e) => sr(1, t.getDay(), Kn(e))
    }, cr = {[Tn]: t => 3 * t, [Nn]: (t, e) => sr(t, 0, Kn(e))};

    function fr(t, e) {
        return ur(t, e || 1, lr, cr, tr)
    }

    const hr = {
        [Bn]: t => t.getUTCFullYear(),
        [Tn]: t => Math.floor(t.getUTCMonth() / 3),
        [zn]: t => t.getUTCMonth(),
        [On]: t => t.getUTCDate(),
        [Un]: t => t.getUTCHours(),
        [qn]: t => t.getUTCMinutes(),
        [Pn]: t => t.getUTCSeconds(),
        [jn]: t => t.getUTCMilliseconds(),
        [Ln]: t => rr(t),
        [Nn]: t => ir(t),
        [Rn]: (t, e) => sr(1, t.getUTCDay(), or(e)),
        [Nn + Rn]: (t, e) => sr(ir(t), t.getUTCDay(), or(e))
    }, dr = {[Tn]: t => 3 * t, [Nn]: (t, e) => sr(t, 0, or(e))};

    function pr(t, e) {
        return ur(t, e || 1, hr, dr, ar)
    }

    const gr = {
        [Bn]: bn,
        [Tn]: xn.every(3),
        [zn]: xn,
        [Nn]: yn,
        [On]: gn,
        [Rn]: gn,
        [Ln]: gn,
        [Un]: pn,
        [qn]: dn,
        [Pn]: hn,
        [jn]: an
    }, mr = {
        [Bn]: Sn,
        [Tn]: Fn.every(3),
        [zn]: Fn,
        [Nn]: En,
        [On]: Mn,
        [Rn]: Mn,
        [Ln]: Mn,
        [Un]: kn,
        [qn]: wn,
        [Pn]: hn,
        [jn]: an
    };

    function yr(t) {
        return gr[t]
    }

    function vr(t) {
        return mr[t]
    }

    function _r(t, e, n) {
        return t ? t.offset(e, n) : void 0
    }

    function xr(t, e, n) {
        return _r(yr(t), e, n)
    }

    function br(t, e, n) {
        return _r(vr(t), e, n)
    }

    function wr(t, e, n, r) {
        return t ? t.range(e, n, r) : void 0
    }

    function kr(t, e, n, r) {
        return wr(yr(t), e, n, r)
    }

    function Mr(t, e, n, r) {
        return wr(vr(t), e, n, r)
    }

    const Ar = 1e3, Er = 6e4, Dr = 36e5, Cr = 864e5, Fr = 2592e6, Sr = 31536e6, Br = [Bn, zn, On, Un, qn, Pn, jn],
        Tr = Br.slice(0, -1), zr = Tr.slice(0, -1), Nr = zr.slice(0, -1), Or = Nr.slice(0, -1), Rr = [Bn, zn],
        Lr = [Bn],
        Ur = [[Tr, 1, Ar], [Tr, 5, 5e3], [Tr, 15, 15e3], [Tr, 30, 3e4], [zr, 1, Er], [zr, 5, 3e5], [zr, 15, 9e5], [zr, 30, 18e5], [Nr, 1, Dr], [Nr, 3, 108e5], [Nr, 6, 216e5], [Nr, 12, 432e5], [Or, 1, Cr], [[Bn, Nn], 1, 6048e5], [Rr, 1, Fr], [Rr, 3, 7776e6], [Lr, 1, Sr]];

    function qr(t) {
        const e = t.extent, n = t.maxbins || 40, r = Math.abs(bt(e)) / n;
        let i, o, a = me((t => t[2])).right(Ur, r);
        return a === Ur.length ? (i = Lr, o = De(e[0] / Sr, e[1] / Sr, n)) : a ? (a = Ur[r / Ur[a - 1][2] < Ur[a][2] / r ? a - 1 : a], i = a[0], o = a[1]) : (i = Br, o = Math.max(De(e[0], e[1], n), 1)), {
            units: i,
            step: o
        }
    }

    function Pr(t) {
        if (0 <= t.y && t.y < 100) {
            var e = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
            return e.setFullYear(t.y), e
        }
        return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L)
    }

    function jr(t) {
        if (0 <= t.y && t.y < 100) {
            var e = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
            return e.setUTCFullYear(t.y), e
        }
        return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L))
    }

    function Ir(t, e, n) {
        return {y: t, m: e, d: n, H: 0, M: 0, S: 0, L: 0}
    }

    function $r(t) {
        var e = t.dateTime, n = t.date, r = t.time, i = t.periods, o = t.days, a = t.shortDays, u = t.months,
            s = t.shortMonths, l = ei(i), c = ni(i), f = ei(o), h = ni(o), d = ei(a), p = ni(a), g = ei(u), m = ni(u),
            y = ei(s), v = ni(s), _ = {
                a: function (t) {
                    return a[t.getDay()]
                }, A: function (t) {
                    return o[t.getDay()]
                }, b: function (t) {
                    return s[t.getMonth()]
                }, B: function (t) {
                    return u[t.getMonth()]
                }, c: null, d: ki, e: ki, f: Ci, g: qi, G: ji, H: Mi, I: Ai, j: Ei, L: Di, m: Fi, M: Si, p: function (t) {
                    return i[+(t.getHours() >= 12)]
                }, q: function (t) {
                    return 1 + ~~(t.getMonth() / 3)
                }, Q: co, s: fo, S: Bi, u: Ti, U: zi, V: Oi, w: Ri, W: Li, x: null, X: null, y: Ui, Y: Pi, Z: Ii, "%": lo
            }, x = {
                a: function (t) {
                    return a[t.getUTCDay()]
                }, A: function (t) {
                    return o[t.getUTCDay()]
                }, b: function (t) {
                    return s[t.getUTCMonth()]
                }, B: function (t) {
                    return u[t.getUTCMonth()]
                }, c: null, d: $i, e: $i, f: Gi, g: oo, G: uo, H: Wi, I: Hi, j: Yi, L: Vi, m: Xi, M: Ji, p: function (t) {
                    return i[+(t.getUTCHours() >= 12)]
                }, q: function (t) {
                    return 1 + ~~(t.getUTCMonth() / 3)
                }, Q: co, s: fo, S: Zi, u: Qi, U: Ki, V: eo, w: no, W: ro, x: null, X: null, y: io, Y: ao, Z: so, "%": lo
            }, b = {
                a: function (t, e, n) {
                    var r = d.exec(e.slice(n));
                    return r ? (t.w = p.get(r[0].toLowerCase()), n + r[0].length) : -1
                }, A: function (t, e, n) {
                    var r = f.exec(e.slice(n));
                    return r ? (t.w = h.get(r[0].toLowerCase()), n + r[0].length) : -1
                }, b: function (t, e, n) {
                    var r = y.exec(e.slice(n));
                    return r ? (t.m = v.get(r[0].toLowerCase()), n + r[0].length) : -1
                }, B: function (t, e, n) {
                    var r = g.exec(e.slice(n));
                    return r ? (t.m = m.get(r[0].toLowerCase()), n + r[0].length) : -1
                }, c: function (t, n, r) {
                    return M(t, e, n, r)
                }, d: di, e: di, f: _i, g: li, G: si, H: gi, I: gi, j: pi, L: vi, m: hi, M: mi, p: function (t, e, n) {
                    var r = l.exec(e.slice(n));
                    return r ? (t.p = c.get(r[0].toLowerCase()), n + r[0].length) : -1
                }, q: fi, Q: bi, s: wi, S: yi, u: ii, U: oi, V: ai, w: ri, W: ui, x: function (t, e, r) {
                    return M(t, n, e, r)
                }, X: function (t, e, n) {
                    return M(t, r, e, n)
                }, y: li, Y: si, Z: ci, "%": xi
            };

        function w(t, e) {
            return function (n) {
                var r, i, o, a = [], u = -1, s = 0, l = t.length;
                for (n instanceof Date || (n = new Date(+n)); ++u < l;) 37 === t.charCodeAt(u) && (a.push(t.slice(s, u)), null != (i = Xr[r = t.charAt(++u)]) ? r = t.charAt(++u) : i = "e" === r ? " " : "0", (o = e[r]) && (r = o(n, i)), a.push(r), s = u + 1);
                return a.push(t.slice(s, u)), a.join("")
            }
        }

        function k(t, e) {
            return function (n) {
                var r, i, o = Ir(1900, void 0, 1);
                if (M(o, t, n += "", 0) != n.length) return null;
                if ("Q" in o) return new Date(o.Q);
                if ("s" in o) return new Date(1e3 * o.s + ("L" in o ? o.L : 0));
                if (e && !("Z" in o) && (o.Z = 0), "p" in o && (o.H = o.H % 12 + 12 * o.p), void 0 === o.m && (o.m = "q" in o ? o.q : 0), "V" in o) {
                    if (o.V < 1 || o.V > 53) return null;
                    "w" in o || (o.w = 1), "Z" in o ? (i = (r = jr(Ir(o.y, 0, 1))).getUTCDay(), r = i > 4 || 0 === i ? Dn.ceil(r) : Dn(r), r = Mn.offset(r, 7 * (o.V - 1)), o.y = r.getUTCFullYear(), o.m = r.getUTCMonth(), o.d = r.getUTCDate() + (o.w + 6) % 7) : (i = (r = Pr(Ir(o.y, 0, 1))).getDay(), r = i > 4 || 0 === i ? vn.ceil(r) : vn(r), r = gn.offset(r, 7 * (o.V - 1)), o.y = r.getFullYear(), o.m = r.getMonth(), o.d = r.getDate() + (o.w + 6) % 7)
                } else ("W" in o || "U" in o) && ("w" in o || (o.w = "u" in o ? o.u % 7 : "W" in o ? 1 : 0), i = "Z" in o ? jr(Ir(o.y, 0, 1)).getUTCDay() : Pr(Ir(o.y, 0, 1)).getDay(), o.m = 0, o.d = "W" in o ? (o.w + 6) % 7 + 7 * o.W - (i + 5) % 7 : o.w + 7 * o.U - (i + 6) % 7);
                return "Z" in o ? (o.H += o.Z / 100 | 0, o.M += o.Z % 100, jr(o)) : Pr(o)
            }
        }

        function M(t, e, n, r) {
            for (var i, o, a = 0, u = e.length, s = n.length; a < u;) {
                if (r >= s) return -1;
                if (37 === (i = e.charCodeAt(a++))) {
                    if (i = e.charAt(a++), !(o = b[i in Xr ? e.charAt(a++) : i]) || (r = o(t, n, r)) < 0) return -1
                } else if (i != n.charCodeAt(r++)) return -1
            }
            return r
        }

        return _.x = w(n, _), _.X = w(r, _), _.c = w(e, _), x.x = w(n, x), x.X = w(r, x), x.c = w(e, x), {
            format: function (t) {
                var e = w(t += "", _);
                return e.toString = function () {
                    return t
                }, e
            }, parse: function (t) {
                var e = k(t += "", !1);
                return e.toString = function () {
                    return t
                }, e
            }, utcFormat: function (t) {
                var e = w(t += "", x);
                return e.toString = function () {
                    return t
                }, e
            }, utcParse: function (t) {
                var e = k(t += "", !0);
                return e.toString = function () {
                    return t
                }, e
            }
        }
    }

    var Wr, Hr, Yr, Vr, Gr, Xr = {"-": "", _: " ", 0: "0"}, Jr = /^\s*\d+/, Zr = /^%/, Qr = /[\\^$*+?|[\]().{}]/g;

    function Kr(t, e, n) {
        var r = t < 0 ? "-" : "", i = (r ? -t : t) + "", o = i.length;
        return r + (o < n ? new Array(n - o + 1).join(e) + i : i)
    }

    function ti(t) {
        return t.replace(Qr, "\\$&")
    }

    function ei(t) {
        return new RegExp("^(?:" + t.map(ti).join("|") + ")", "i")
    }

    function ni(t) {
        return new Map(t.map(((t, e) => [t.toLowerCase(), e])))
    }

    function ri(t, e, n) {
        var r = Jr.exec(e.slice(n, n + 1));
        return r ? (t.w = +r[0], n + r[0].length) : -1
    }

    function ii(t, e, n) {
        var r = Jr.exec(e.slice(n, n + 1));
        return r ? (t.u = +r[0], n + r[0].length) : -1
    }

    function oi(t, e, n) {
        var r = Jr.exec(e.slice(n, n + 2));
        return r ? (t.U = +r[0], n + r[0].length) : -1
    }

    function ai(t, e, n) {
        var r = Jr.exec(e.slice(n, n + 2));
        return r ? (t.V = +r[0], n + r[0].length) : -1
    }

    function ui(t, e, n) {
        var r = Jr.exec(e.slice(n, n + 2));
        return r ? (t.W = +r[0], n + r[0].length) : -1
    }

    function si(t, e, n) {
        var r = Jr.exec(e.slice(n, n + 4));
        return r ? (t.y = +r[0], n + r[0].length) : -1
    }

    function li(t, e, n) {
        var r = Jr.exec(e.slice(n, n + 2));
        return r ? (t.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3), n + r[0].length) : -1
    }

    function ci(t, e, n) {
        var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(n, n + 6));
        return r ? (t.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), n + r[0].length) : -1
    }

    function fi(t, e, n) {
        var r = Jr.exec(e.slice(n, n + 1));
        return r ? (t.q = 3 * r[0] - 3, n + r[0].length) : -1
    }

    function hi(t, e, n) {
        var r = Jr.exec(e.slice(n, n + 2));
        return r ? (t.m = r[0] - 1, n + r[0].length) : -1
    }

    function di(t, e, n) {
        var r = Jr.exec(e.slice(n, n + 2));
        return r ? (t.d = +r[0], n + r[0].length) : -1
    }

    function pi(t, e, n) {
        var r = Jr.exec(e.slice(n, n + 3));
        return r ? (t.m = 0, t.d = +r[0], n + r[0].length) : -1
    }

    function gi(t, e, n) {
        var r = Jr.exec(e.slice(n, n + 2));
        return r ? (t.H = +r[0], n + r[0].length) : -1
    }

    function mi(t, e, n) {
        var r = Jr.exec(e.slice(n, n + 2));
        return r ? (t.M = +r[0], n + r[0].length) : -1
    }

    function yi(t, e, n) {
        var r = Jr.exec(e.slice(n, n + 2));
        return r ? (t.S = +r[0], n + r[0].length) : -1
    }

    function vi(t, e, n) {
        var r = Jr.exec(e.slice(n, n + 3));
        return r ? (t.L = +r[0], n + r[0].length) : -1
    }

    function _i(t, e, n) {
        var r = Jr.exec(e.slice(n, n + 6));
        return r ? (t.L = Math.floor(r[0] / 1e3), n + r[0].length) : -1
    }

    function xi(t, e, n) {
        var r = Zr.exec(e.slice(n, n + 1));
        return r ? n + r[0].length : -1
    }

    function bi(t, e, n) {
        var r = Jr.exec(e.slice(n));
        return r ? (t.Q = +r[0], n + r[0].length) : -1
    }

    function wi(t, e, n) {
        var r = Jr.exec(e.slice(n));
        return r ? (t.s = +r[0], n + r[0].length) : -1
    }

    function ki(t, e) {
        return Kr(t.getDate(), e, 2)
    }

    function Mi(t, e) {
        return Kr(t.getHours(), e, 2)
    }

    function Ai(t, e) {
        return Kr(t.getHours() % 12 || 12, e, 2)
    }

    function Ei(t, e) {
        return Kr(1 + gn.count(bn(t), t), e, 3)
    }

    function Di(t, e) {
        return Kr(t.getMilliseconds(), e, 3)
    }

    function Ci(t, e) {
        return Di(t, e) + "000"
    }

    function Fi(t, e) {
        return Kr(t.getMonth() + 1, e, 2)
    }

    function Si(t, e) {
        return Kr(t.getMinutes(), e, 2)
    }

    function Bi(t, e) {
        return Kr(t.getSeconds(), e, 2)
    }

    function Ti(t) {
        var e = t.getDay();
        return 0 === e ? 7 : e
    }

    function zi(t, e) {
        return Kr(yn.count(bn(t) - 1, t), e, 2)
    }

    function Ni(t) {
        var e = t.getDay();
        return e >= 4 || 0 === e ? _n(t) : _n.ceil(t)
    }

    function Oi(t, e) {
        return t = Ni(t), Kr(_n.count(bn(t), t) + (4 === bn(t).getDay()), e, 2)
    }

    function Ri(t) {
        return t.getDay()
    }

    function Li(t, e) {
        return Kr(vn.count(bn(t) - 1, t), e, 2)
    }

    function Ui(t, e) {
        return Kr(t.getFullYear() % 100, e, 2)
    }

    function qi(t, e) {
        return Kr((t = Ni(t)).getFullYear() % 100, e, 2)
    }

    function Pi(t, e) {
        return Kr(t.getFullYear() % 1e4, e, 4)
    }

    function ji(t, e) {
        var n = t.getDay();
        return Kr((t = n >= 4 || 0 === n ? _n(t) : _n.ceil(t)).getFullYear() % 1e4, e, 4)
    }

    function Ii(t) {
        var e = t.getTimezoneOffset();
        return (e > 0 ? "-" : (e *= -1, "+")) + Kr(e / 60 | 0, "0", 2) + Kr(e % 60, "0", 2)
    }

    function $i(t, e) {
        return Kr(t.getUTCDate(), e, 2)
    }

    function Wi(t, e) {
        return Kr(t.getUTCHours(), e, 2)
    }

    function Hi(t, e) {
        return Kr(t.getUTCHours() % 12 || 12, e, 2)
    }

    function Yi(t, e) {
        return Kr(1 + Mn.count(Sn(t), t), e, 3)
    }

    function Vi(t, e) {
        return Kr(t.getUTCMilliseconds(), e, 3)
    }

    function Gi(t, e) {
        return Vi(t, e) + "000"
    }

    function Xi(t, e) {
        return Kr(t.getUTCMonth() + 1, e, 2)
    }

    function Ji(t, e) {
        return Kr(t.getUTCMinutes(), e, 2)
    }

    function Zi(t, e) {
        return Kr(t.getUTCSeconds(), e, 2)
    }

    function Qi(t) {
        var e = t.getUTCDay();
        return 0 === e ? 7 : e
    }

    function Ki(t, e) {
        return Kr(En.count(Sn(t) - 1, t), e, 2)
    }

    function to(t) {
        var e = t.getUTCDay();
        return e >= 4 || 0 === e ? Cn(t) : Cn.ceil(t)
    }

    function eo(t, e) {
        return t = to(t), Kr(Cn.count(Sn(t), t) + (4 === Sn(t).getUTCDay()), e, 2)
    }

    function no(t) {
        return t.getUTCDay()
    }

    function ro(t, e) {
        return Kr(Dn.count(Sn(t) - 1, t), e, 2)
    }

    function io(t, e) {
        return Kr(t.getUTCFullYear() % 100, e, 2)
    }

    function oo(t, e) {
        return Kr((t = to(t)).getUTCFullYear() % 100, e, 2)
    }

    function ao(t, e) {
        return Kr(t.getUTCFullYear() % 1e4, e, 4)
    }

    function uo(t, e) {
        var n = t.getUTCDay();
        return Kr((t = n >= 4 || 0 === n ? Cn(t) : Cn.ceil(t)).getUTCFullYear() % 1e4, e, 4)
    }

    function so() {
        return "+0000"
    }

    function lo() {
        return "%"
    }

    function co(t) {
        return +t
    }

    function fo(t) {
        return Math.floor(+t / 1e3)
    }

    function ho(t) {
        const e = {};
        return n => e[n] || (e[n] = t(n))
    }

    function po(t) {
        const e = ho(t.format), n = t.formatPrefix;
        return {
            format: e, formatPrefix: n, formatFloat(t) {
                const n = Ie(t || ",");
                if (null == n.precision) {
                    switch (n.precision = 12, n.type) {
                        case"%":
                            n.precision -= 2;
                            break;
                        case"e":
                            n.precision -= 1
                    }
                    return r = e(n), i = e(".1f")(1)[1], t => {
                        const e = r(t), n = e.indexOf(i);
                        if (n < 0) return e;
                        let o = function (t, e) {
                            let n, r = t.lastIndexOf("e");
                            if (r > 0) return r;
                            for (r = t.length; --r > e;) if (n = t.charCodeAt(r), n >= 48 && n <= 57) return r + 1
                        }(e, n);
                        const a = o < e.length ? e.slice(o) : "";
                        for (; --o > n;) if ("0" !== e[o]) {
                            ++o;
                            break
                        }
                        return e.slice(0, o) + a
                    }
                }
                return e(n);
                var r, i
            }, formatSpan(t, r, i, o) {
                o = Ie(null == o ? ",f" : o);
                const a = De(t, r, i), u = Math.max(Math.abs(t), Math.abs(r));
                let s;
                if (null == o.precision) switch (o.type) {
                    case"s":
                        return isNaN(s = tn(a, u)) || (o.precision = s), n(o, u);
                    case"":
                    case"e":
                    case"g":
                    case"p":
                    case"r":
                        isNaN(s = en(a, u)) || (o.precision = s - ("e" === o.type));
                        break;
                    case"f":
                    case"%":
                        isNaN(s = Ke(a)) || (o.precision = s - 2 * ("%" === o.type))
                }
                return e(o)
            }
        }
    }

    let go, mo;

    function yo() {
        return go = po({format: Ge, formatPrefix: Xe})
    }

    function vo(t) {
        return po(Qe(t))
    }

    function _o(t) {
        return arguments.length ? go = vo(t) : go
    }

    function xo(t, e, n) {
        _(n = n || {}) || u("Invalid time multi-format specifier: ".concat(n));
        const r = e(Pn), i = e(qn), o = e(Un), a = e(On), s = e(Nn), l = e(zn), c = e(Tn), f = e(Bn),
            h = t(n.milliseconds || ".%L"), d = t(n.seconds || ":%S"), p = t(n.minutes || "%I:%M"),
            g = t(n.hours || "%I %p"), m = t(n.date || n.day || "%a %d"), y = t(n.week || "%b %d"),
            v = t(n.month || "%B"), x = t(n.quarter || "%B"), b = t(n.year || "%Y");
        return t => (r(t) < t ? h : i(t) < t ? d : o(t) < t ? p : a(t) < t ? g : l(t) < t ? s(t) < t ? m : y : f(t) < t ? c(t) < t ? v : x : b)(t)
    }

    function bo(t) {
        const e = ho(t.format), n = ho(t.utcFormat);
        return {
            timeFormat: t => pt(t) ? e(t) : xo(e, yr, t),
            utcFormat: t => pt(t) ? n(t) : xo(n, vr, t),
            timeParse: ho(t.parse),
            utcParse: ho(t.utcParse)
        }
    }

    function wo() {
        return mo = bo({format: Hr, parse: Yr, utcFormat: Vr, utcParse: Gr})
    }

    function ko(t) {
        return bo($r(t))
    }

    function Mo(t) {
        return arguments.length ? mo = ko(t) : mo
    }

    !function (t) {
        Wr = $r(t), Hr = Wr.format, Yr = Wr.parse, Vr = Wr.utcFormat, Gr = Wr.utcParse
    }({
        dateTime: "%x, %X",
        date: "%-m/%-d/%Y",
        time: "%-I:%M:%S %p",
        periods: ["AM", "PM"],
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    }), yo(), wo();
    const Ao = (t, e) => K({}, t, e);

    function Eo(t, e) {
        const n = t ? vo(t) : _o(), r = e ? ko(e) : Mo();
        return Ao(n, r)
    }

    function Do(t, e) {
        const n = arguments.length;
        return n && 2 !== n && u("defaultLocale expects either zero or two arguments."), n ? Ao(_o(t), Mo(e)) : Ao(_o(), Mo())
    }

    function Co(t, e, n, r) {
        const i = de((e = e || {}).type || "json");
        return i || u("Unknown data format type: " + e.type), t = i(t, e), e.parse && function (t, e, n, r) {
            if (!t.length) return;
            const i = Mo();
            n = n || i.timeParse, r = r || i.utcParse;
            let o, a, u, s, l, c, f = t.columns || Object.keys(t[0]);
            "auto" === e && (e = Ht(t, f));
            f = Object.keys(e);
            const h = f.map((t => {
                const i = e[t];
                let o, a;
                if (i && (i.startsWith("date:") || i.startsWith("utc:"))) {
                    o = i.split(/:(.+)?/, 2), a = o[1], ("'" === a[0] && "'" === a[a.length - 1] || '"' === a[0] && '"' === a[a.length - 1]) && (a = a.slice(1, -1));
                    return ("utc" === o[0] ? r : n)(a)
                }
                if (!jt[i]) throw Error("Illegal format pattern: " + t + ":" + i);
                return jt[i]
            }));
            for (u = 0, l = t.length, c = f.length; u < l; ++u) for (o = t[u], s = 0; s < c; ++s) a = f[s], o[a] = h[s](o[a])
        }(t, e.parse, n, r), rt(t, "columns") && delete t.columns, t
    }

    const Fo = function (t, e) {
        return n => ({options: n || {}, sanitize: Ot, load: Nt, fileAccess: !!e, file: Rt(e), http: Ut(t)})
    }("undefined" != typeof fetch && fetch, null);

    function So(t) {
        const e = t || f, n = [], r = {};
        return n.add = t => {
            const i = e(t);
            return r[i] || (r[i] = 1, n.push(t)), n
        }, n.remove = t => {
            const i = e(t);
            if (r[i]) {
                r[i] = 0;
                const e = n.indexOf(t);
                e >= 0 && n.splice(e, 1)
            }
            return n
        }, n
    }

    async function Bo(t, e) {
        try {
            await e(t)
        } catch (e) {
            t.error(e)
        }
    }

    const To = Symbol("vega_id");
    let zo = 1;

    function No(t) {
        return !(!t || !Oo(t))
    }

    function Oo(t) {
        return t[To]
    }

    function Ro(t, e) {
        return t[To] = e, t
    }

    function Lo(t) {
        const e = t === Object(t) ? t : {data: t};
        return Oo(e) ? e : Ro(e, zo++)
    }

    function Uo(t) {
        return qo(t, Lo({}))
    }

    function qo(t, e) {
        for (const n in t) e[n] = t[n];
        return e
    }

    function Po(t, e) {
        return Ro(e, Oo(t))
    }

    function jo(t, e) {
        return t ? e ? (n, r) => t(n, r) || Oo(e(n)) - Oo(e(r)) : (e, n) => t(e, n) || Oo(e) - Oo(n) : null
    }

    function Io(t) {
        return t && t.constructor === $o
    }

    function $o() {
        const t = [], e = [], n = [], r = [], i = [];
        let o = null, a = !1;
        return {
            constructor: $o, insert(e) {
                const n = $(e), r = n.length;
                for (let e = 0; e < r; ++e) t.push(n[e]);
                return this
            }, remove(t) {
                const n = H(t) ? r : e, i = $(t), o = i.length;
                for (let t = 0; t < o; ++t) n.push(i[t]);
                return this
            }, modify(t, e, r) {
                const o = {field: e, value: Z(r)};
                return H(t) ? (o.filter = t, i.push(o)) : (o.tuple = t, n.push(o)), this
            }, encode(t, e) {
                return H(t) ? i.push({filter: t, field: e}) : n.push({tuple: t, field: e}), this
            }, clean(t) {
                return o = t, this
            }, reflow() {
                return a = !0, this
            }, pulse(u, s) {
                const l = {}, c = {};
                let f, h, d, p, g, m;
                for (f = 0, h = s.length; f < h; ++f) l[Oo(s[f])] = 1;
                for (f = 0, h = e.length; f < h; ++f) g = e[f], l[Oo(g)] = -1;
                for (f = 0, h = r.length; f < h; ++f) p = r[f], s.forEach((t => {
                    p(t) && (l[Oo(t)] = -1)
                }));
                for (f = 0, h = t.length; f < h; ++f) g = t[f], m = Oo(g), l[m] ? l[m] = 1 : u.add.push(Lo(t[f]));
                for (f = 0, h = s.length; f < h; ++f) g = s[f], l[Oo(g)] < 0 && u.rem.push(g);

                function y(t, e, n) {
                    n ? t[e] = n(t) : u.encode = e, a || (c[Oo(t)] = t)
                }

                for (f = 0, h = n.length; f < h; ++f) d = n[f], g = d.tuple, p = d.field, m = l[Oo(g)], m > 0 && (y(g, p, d.value), u.modifies(p));
                for (f = 0, h = i.length; f < h; ++f) d = i[f], p = d.filter, s.forEach((t => {
                    p(t) && l[Oo(t)] > 0 && y(t, d.field, d.value)
                })), u.modifies(d.field);
                if (a) u.mod = e.length || r.length ? s.filter((t => l[Oo(t)] > 0)) : s.slice(); else for (m in c) u.mod.push(c[m]);
                return (o || null == o && (e.length || r.length)) && u.clean(!0), u
            }
        }
    }

    const Wo = "_:mod:_";

    function Ho() {
        Object.defineProperty(this, Wo, {writable: !0, value: {}})
    }

    Ho.prototype = {
        set(t, e, n, r) {
            const i = this, o = i[t], a = i[Wo];
            return null != e && e >= 0 ? (o[e] !== n || r) && (o[e] = n, a[e + ":" + t] = -1, a[t] = -1) : (o !== n || r) && (i[t] = n, a[t] = v(n) ? 1 + n.length : -1), i
        }, modified(t, e) {
            const n = this[Wo];
            if (!arguments.length) {
                for (const t in n) if (n[t]) return !0;
                return !1
            }
            if (v(t)) {
                for (let e = 0; e < t.length; ++e) if (n[t[e]]) return !0;
                return !1
            }
            return null != e && e >= 0 ? e + 1 < n[t] || !!n[e + ":" + t] : !!n[t]
        }, clear() {
            return this[Wo] = {}, this
        }
    };
    let Yo = 0;
    const Vo = new Ho;

    function Go(t, e, n, r) {
        this.id = ++Yo, this.value = t, this.stamp = -1, this.rank = -1, this.qrank = -1, this.flags = 0, e && (this._update = e), n && this.parameters(n, r)
    }

    function Xo(t) {
        return function (e) {
            const n = this.flags;
            return 0 === arguments.length ? !!(n & t) : (this.flags = e ? n | t : n & ~t, this)
        }
    }

    Go.prototype = {
        targets() {
            return this._targets || (this._targets = So(c))
        }, set(t) {
            return this.value !== t ? (this.value = t, 1) : 0
        }, skip: Xo(1), modified: Xo(2), parameters(t, e, n) {
            e = !1 !== e;
            const r = this._argval = this._argval || new Ho, i = this._argops = this._argops || [], o = [];
            let a, s, l, c;
            const f = (t, n, a) => {
                a instanceof Go ? (a !== this && (e && a.targets().add(this), o.push(a)), i.push({
                    op: a,
                    name: t,
                    index: n
                })) : r.set(t, n, a)
            };
            for (a in t) if (s = t[a], "pulse" === a) $(s).forEach((t => {
                t instanceof Go ? t !== this && (t.targets().add(this), o.push(t)) : u("Pulse parameters must be operator instances.")
            })), this.source = s; else if (v(s)) for (r.set(a, -1, Array(l = s.length)), c = 0; c < l; ++c) f(a, c, s[c]); else f(a, -1, s);
            return this.marshall().clear(), n && (i.initonly = !0), o
        }, marshall(t) {
            const e = this._argval || Vo, n = this._argops;
            let r, i, o, a;
            if (n) {
                const u = n.length;
                for (i = 0; i < u; ++i) r = n[i], o = r.op, a = o.modified() && o.stamp === t, e.set(r.name, r.index, o.value, a);
                if (n.initonly) {
                    for (i = 0; i < u; ++i) r = n[i], r.op.targets().remove(this);
                    this._argops = null, this._update = null
                }
            }
            return e
        }, detach() {
            const t = this._argops;
            let e, n, r, i;
            if (t) for (e = 0, n = t.length; e < n; ++e) r = t[e], i = r.op, i._targets && i._targets.remove(this)
        }, evaluate(t) {
            const e = this._update;
            if (e) {
                const n = this.marshall(t.stamp), r = e.call(this, n, t);
                if (n.clear(), r !== this.value) this.value = r; else if (!this.modified()) return t.StopPropagation
            }
        }, run(t) {
            if (t.stamp < this.stamp) return t.StopPropagation;
            let e;
            return this.skip() ? (this.skip(!1), e = 0) : e = this.evaluate(t), this.pulse = e || t
        }
    };
    let Jo = 0;

    function Zo(t, e, n) {
        this.id = ++Jo, this.value = null, n && (this.receive = n), t && (this._filter = t), e && (this._apply = e)
    }

    function Qo(t, e, n) {
        return new Zo(t, e, n)
    }

    Zo.prototype = {
        _filter: p, _apply: f, targets() {
            return this._targets || (this._targets = So(c))
        }, consume(t) {
            return arguments.length ? (this._consume = !!t, this) : !!this._consume
        }, receive(t) {
            if (this._filter(t)) {
                const e = this.value = this._apply(t), n = this._targets, r = n ? n.length : 0;
                for (let t = 0; t < r; ++t) n[t].receive(e);
                this._consume && (t.preventDefault(), t.stopPropagation())
            }
        }, filter(t) {
            const e = Qo(t);
            return this.targets().add(e), e
        }, apply(t) {
            const e = Qo(null, t);
            return this.targets().add(e), e
        }, merge() {
            const t = Qo();
            this.targets().add(t);
            for (let e = 0, n = arguments.length; e < n; ++e) arguments[e].targets().add(t);
            return t
        }, throttle(t) {
            let e = -1;
            return this.filter((() => {
                const n = Date.now();
                return n - e > t ? (e = n, 1) : 0
            }))
        }, debounce(t) {
            const e = Qo();
            return this.targets().add(Qo(null, null, Q(t, (t => {
                const n = t.dataflow;
                e.receive(t), n && n.run && n.run()
            })))), e
        }, between(t, e) {
            let n = !1;
            return t.targets().add(Qo(null, null, (() => n = !0))), e.targets().add(Qo(null, null, (() => n = !1))), this.filter((() => n))
        }, detach() {
        }
    };
    const Ko = {skip: !0};

    function ta(t, e, n, r, i, o) {
        const a = K({}, o, Ko);
        let u, s;
        H(n) || (n = Z(n)), void 0 === r ? u = e => t.touch(n(e)) : H(r) ? (s = new Go(null, r, i, !1), u = e => {
            s.evaluate(e);
            const r = n(e), i = s.value;
            Io(i) ? t.pulse(r, i, o) : t.update(r, i, a)
        }) : u = e => t.update(n(e), r, a), e.apply(u)
    }

    function ea(t, e, n, r, i, o) {
        if (void 0 === r) e.targets().add(n); else {
            const a = o || {}, u = new Go(null, function (t, e) {
                return e = H(e) ? e : Z(e), t ? function (n, r) {
                    const i = e(n, r);
                    return t.skip() || (t.skip(i !== this.value).value = i), i
                } : e
            }(n, r), i, !1);
            u.modified(a.force), u.rank = e.rank, e.targets().add(u), n && (u.skip(!0), u.value = n.value, u.targets().add(n), t.connect(n, [u]))
        }
    }

    const na = {};

    function ra(t, e, n) {
        this.dataflow = t, this.stamp = null == e ? -1 : e, this.add = [], this.rem = [], this.mod = [], this.fields = null, this.encode = n || null
    }

    function ia(t, e) {
        const n = [];
        return Ft(t, e, (t => n.push(t))), n
    }

    function oa(t, e) {
        const n = {};
        return t.visit(e, (t => {
            n[Oo(t)] = 1
        })), t => n[Oo(t)] ? null : t
    }

    function aa(t, e) {
        return t ? (n, r) => t(n, r) && e(n, r) : e
    }

    function ua(t, e, n, r) {
        const i = this, o = n.length;
        let a = 0;
        this.dataflow = t, this.stamp = e, this.fields = null, this.encode = r || null, this.pulses = n;
        for (let t = 0; t < o; ++t) {
            const r = n[t];
            if (r.stamp === e) {
                if (r.fields) {
                    const t = i.fields || (i.fields = {});
                    for (const e in r.fields) t[e] = 1
                }
                r.changed(i.ADD) && (a |= i.ADD), r.changed(i.REM) && (a |= i.REM), r.changed(i.MOD) && (a |= i.MOD)
            }
        }
        this.changes = a
    }

    function sa(t) {
        return t.error("Dataflow already running. Use runAsync() to chain invocations."), t
    }

    ra.prototype = {
        StopPropagation: na,
        ADD: 1,
        REM: 2,
        MOD: 4,
        ADD_REM: 3,
        ADD_MOD: 5,
        ALL: 7,
        REFLOW: 8,
        SOURCE: 16,
        NO_SOURCE: 32,
        NO_FIELDS: 64,
        fork(t) {
            return new ra(this.dataflow).init(this, t)
        },
        clone() {
            const t = this.fork(7);
            return t.add = t.add.slice(), t.rem = t.rem.slice(), t.mod = t.mod.slice(), t.source && (t.source = t.source.slice()), t.materialize(23)
        },
        addAll() {
            let t = this;
            return !t.source || t.add === t.rem || !t.rem.length && t.source.length === t.add.length || (t = new ra(this.dataflow).init(this), t.add = t.source, t.rem = []), t
        },
        init(t, e) {
            const n = this;
            return n.stamp = t.stamp, n.encode = t.encode, !t.fields || 64 & e || (n.fields = t.fields), 1 & e ? (n.addF = t.addF, n.add = t.add) : (n.addF = null, n.add = []), 2 & e ? (n.remF = t.remF, n.rem = t.rem) : (n.remF = null, n.rem = []), 4 & e ? (n.modF = t.modF, n.mod = t.mod) : (n.modF = null, n.mod = []), 32 & e ? (n.srcF = null, n.source = null) : (n.srcF = t.srcF, n.source = t.source, t.cleans && (n.cleans = t.cleans)), n
        },
        runAfter(t) {
            this.dataflow.runAfter(t)
        },
        changed(t) {
            const e = t || 7;
            return 1 & e && this.add.length || 2 & e && this.rem.length || 4 & e && this.mod.length
        },
        reflow(t) {
            if (t) return this.fork(7).reflow();
            const e = this.add.length, n = this.source && this.source.length;
            return n && n !== e && (this.mod = this.source, e && this.filter(4, oa(this, 1))), this
        },
        clean(t) {
            return arguments.length ? (this.cleans = !!t, this) : this.cleans
        },
        modifies(t) {
            const e = this.fields || (this.fields = {});
            return v(t) ? t.forEach((t => e[t] = !0)) : e[t] = !0, this
        },
        modified(t, e) {
            const n = this.fields;
            return !(!e && !this.mod.length || !n) && (arguments.length ? v(t) ? t.some((t => n[t])) : n[t] : !!n)
        },
        filter(t, e) {
            const n = this;
            return 1 & t && (n.addF = aa(n.addF, e)), 2 & t && (n.remF = aa(n.remF, e)), 4 & t && (n.modF = aa(n.modF, e)), 16 & t && (n.srcF = aa(n.srcF, e)), n
        },
        materialize(t) {
            const e = this;
            return 1 & (t = t || 7) && e.addF && (e.add = ia(e.add, e.addF), e.addF = null), 2 & t && e.remF && (e.rem = ia(e.rem, e.remF), e.remF = null), 4 & t && e.modF && (e.mod = ia(e.mod, e.modF), e.modF = null), 16 & t && e.srcF && (e.source = e.source.filter(e.srcF), e.srcF = null), e
        },
        visit(t, e) {
            const n = this, r = e;
            if (16 & t) return Ft(n.source, n.srcF, r), n;
            1 & t && Ft(n.add, n.addF, r), 2 & t && Ft(n.rem, n.remF, r), 4 & t && Ft(n.mod, n.modF, r);
            const i = n.source;
            if (8 & t && i) {
                const t = n.add.length + n.mod.length;
                t === i.length || Ft(i, t ? oa(n, 5) : n.srcF, r)
            }
            return n
        }
    }, ut(ua, ra, {
        fork(t) {
            const e = new ra(this.dataflow).init(this, t & this.NO_FIELDS);
            return void 0 !== t && (t & e.ADD && this.visit(e.ADD, (t => e.add.push(t))), t & e.REM && this.visit(e.REM, (t => e.rem.push(t))), t & e.MOD && this.visit(e.MOD, (t => e.mod.push(t)))), e
        }, changed(t) {
            return this.changes & t
        }, modified(t) {
            const e = this, n = e.fields;
            return n && e.changes & e.MOD ? v(t) ? t.some((t => n[t])) : n[t] : 0
        }, filter() {
            u("MultiPulse does not support filtering.")
        }, materialize() {
            u("MultiPulse does not support materialization.")
        }, visit(t, e) {
            const n = this, r = n.pulses, i = r.length;
            let o = 0;
            if (t & n.SOURCE) for (; o < i; ++o) r[o].visit(t, e); else for (; o < i; ++o) r[o].stamp === n.stamp && r[o].visit(t, e);
            return n
        }
    });
    const la = {skip: !1, force: !1};

    function ca(t) {
        let e = [];
        return {
            clear: () => e = [],
            size: () => e.length,
            peek: () => e[0],
            push: n => (e.push(n), fa(e, 0, e.length - 1, t)),
            pop: () => {
                const n = e.pop();
                let r;
                return e.length ? (r = e[0], e[0] = n, function (t, e, n) {
                    const r = e, i = t.length, o = t[e];
                    let a, u = 1 + (e << 1);
                    for (; u < i;) a = u + 1, a < i && n(t[u], t[a]) >= 0 && (u = a), t[e] = t[u], u = 1 + ((e = u) << 1);
                    t[e] = o, fa(t, r, e, n)
                }(e, 0, t)) : r = n, r
            }
        }
    }

    function fa(t, e, n, r) {
        let i, o;
        const a = t[n];
        for (; n > e && (o = n - 1 >> 1, i = t[o], r(a, i) < 0);) t[n] = i, n = o;
        return t[n] = a
    }

    function ha() {
        this.logger(y()), this.logLevel(1), this._clock = 0, this._rank = 0, this._locale = Do();
        try {
            this._loader = Fo()
        } catch (t) {
        }
        this._touched = So(c), this._input = {}, this._pulse = null, this._heap = ca(((t, e) => t.qrank - e.qrank)), this._postrun = []
    }

    function da(t) {
        return function () {
            return this._log[t].apply(this, arguments)
        }
    }

    function pa(t, e) {
        Go.call(this, t, null, e)
    }

    ha.prototype = {
        stamp() {
            return this._clock
        },
        loader(t) {
            return arguments.length ? (this._loader = t, this) : this._loader
        },
        locale(t) {
            return arguments.length ? (this._locale = t, this) : this._locale
        },
        logger(t) {
            return arguments.length ? (this._log = t, this) : this._log
        },
        error: da("error"),
        warn: da("warn"),
        info: da("info"),
        debug: da("debug"),
        logLevel: da("level"),
        cleanThreshold: 1e4,
        add: function (t, e, n, r) {
            let i, o = 1;
            return t instanceof Go ? i = t : t && t.prototype instanceof Go ? i = new t : H(t) ? i = new Go(null, t) : (o = 0, i = new Go(t, e)), this.rank(i), o && (r = n, n = e), n && this.connect(i, i.parameters(n, r)), this.touch(i), i
        },
        connect: function (t, e) {
            const n = t.rank, r = e.length;
            for (let i = 0; i < r; ++i) if (n < e[i].rank) return void this.rerank(t)
        },
        rank: function (t) {
            t.rank = ++this._rank
        },
        rerank: function (t) {
            const e = [t];
            let n, r, i;
            for (; e.length;) if (this.rank(n = e.pop()), r = n._targets) for (i = r.length; --i >= 0;) e.push(n = r[i]), n === t && u("Cycle detected in dataflow graph.")
        },
        pulse: function (t, e, n) {
            this.touch(t, n || la);
            const r = new ra(this, this._clock + (this._pulse ? 0 : 1)), i = t.pulse && t.pulse.source || [];
            return r.target = t, this._input[t.id] = e.pulse(r, i), this
        },
        touch: function (t, e) {
            const n = e || la;
            return this._pulse ? this._enqueue(t) : this._touched.add(t), n.skip && t.skip(!0), this
        },
        update: function (t, e, n) {
            const r = n || la;
            return (t.set(e) || r.force) && this.touch(t, r), this
        },
        changeset: $o,
        ingest: function (t, e, n) {
            return e = this.parse(e, n), this.pulse(t, this.changeset().insert(e))
        },
        parse: function (t, e) {
            const n = this.locale();
            return Co(t, e, n.timeParse, n.utcParse)
        },
        preload: async function (t, e, n) {
            const r = this, i = r._pending || function (t) {
                let e;
                const n = new Promise((t => e = t));
                return n.requests = 0, n.done = () => {
                    0 == --n.requests && (t._pending = null, e(t))
                }, t._pending = n
            }(r);
            i.requests += 1;
            const o = await r.request(e, n);
            return r.pulse(t, r.changeset().remove(p).insert(o.data || [])), i.done(), o
        },
        request: async function (t, e) {
            const n = this;
            let r, i = 0;
            try {
                r = await n.loader().load(t, {context: "dataflow", response: pe(e && e.type)});
                try {
                    r = n.parse(r, e)
                } catch (e) {
                    i = -2, n.warn("Data ingestion failed", t, e)
                }
            } catch (e) {
                i = -1, n.warn("Loading failed", t, e)
            }
            return {data: r, status: i}
        },
        events: function (t, e, n, r) {
            const i = this, o = Qo(n, r), a = function (t) {
                t.dataflow = i;
                try {
                    o.receive(t)
                } catch (t) {
                    i.error(t)
                } finally {
                    i.run()
                }
            };
            let u;
            u = "string" == typeof t && "undefined" != typeof document ? document.querySelectorAll(t) : $(t);
            const s = u.length;
            for (let t = 0; t < s; ++t) u[t].addEventListener(e, a);
            return o
        },
        on: function (t, e, n, r, i) {
            return (t instanceof Go ? ea : ta)(this, t, e, n, r, i), this
        },
        evaluate: async function (t, e, n) {
            const r = this, i = [];
            if (r._pulse) return sa(r);
            if (r._pending && await r._pending, e && await Bo(r, e), !r._touched.length) return r.debug("Dataflow invoked, but nothing to do."), r;
            const o = ++r._clock;
            r._pulse = new ra(r, o, t), r._touched.forEach((t => r._enqueue(t, !0))), r._touched = So(c);
            let a, u, s, l = 0;
            try {
                for (; r._heap.size() > 0;) a = r._heap.pop(), a.rank === a.qrank ? (u = a.run(r._getPulse(a, t)), u.then ? u = await u : u.async && (i.push(u.async), u = na), u !== na && a._targets && a._targets.forEach((t => r._enqueue(t))), ++l) : r._enqueue(a, !0)
            } catch (t) {
                r._heap.clear(), s = t
            }
            if (r._input = {}, r._pulse = null, r.debug("Pulse ".concat(o, ": ").concat(l, " operators")), s && (r._postrun = [], r.error(s)), r._postrun.length) {
                const t = r._postrun.sort(((t, e) => e.priority - t.priority));
                r._postrun = [];
                for (let e = 0; e < t.length; ++e) await Bo(r, t[e].callback)
            }
            return n && await Bo(r, n), i.length && Promise.all(i).then((t => r.runAsync(null, (() => {
                t.forEach((t => {
                    try {
                        t(r)
                    } catch (t) {
                        r.error(t)
                    }
                }))
            })))), r
        },
        run: function (t, e, n) {
            return this._pulse ? sa(this) : (this.evaluate(t, e, n), this)
        },
        runAsync: async function (t, e, n) {
            for (; this._running;) await this._running;
            const r = () => this._running = null;
            return (this._running = this.evaluate(t, e, n)).then(r, r), this._running
        },
        runAfter: function (t, e, n) {
            if (this._pulse || e) this._postrun.push({priority: n || 0, callback: t}); else try {
                t(this)
            } catch (t) {
                this.error(t)
            }
        },
        _enqueue: function (t, e) {
            const n = t.stamp < this._clock;
            n && (t.stamp = this._clock), (n || e) && (t.qrank = t.rank, this._heap.push(t))
        },
        _getPulse: function (t, e) {
            const n = t.source, r = this._clock;
            return n && v(n) ? new ua(this, r, n.map((t => t.pulse)), e) : this._input[t.id] || function (t, e) {
                if (e && e.stamp === t.stamp) return e;
                t = t.fork(), e && e !== na && (t.source = e.source);
                return t
            }(this._pulse, n && n.pulse)
        }
    }, ut(pa, Go, {
        run(t) {
            if (t.stamp < this.stamp) return t.StopPropagation;
            let e;
            return this.skip() ? this.skip(!1) : e = this.evaluate(t), e = e || t, e.then ? e = e.then((t => this.pulse = t)) : e !== t.StopPropagation && (this.pulse = e), e
        }, evaluate(t) {
            const e = this.marshall(t.stamp), n = this.transform(e, t);
            return e.clear(), n
        }, transform() {
        }
    });
    const ga = {};

    function ma(t) {
        const e = ya(t);
        return e && e.Definition || null
    }

    function ya(t) {
        return t = t && t.toLowerCase(), rt(ga, t) ? ga[t] : null
    }

    function* va(t, e) {
        if (null == e) for (let e of t) null != e && "" !== e && (e = +e) >= e && (yield e); else {
            let n = -1;
            for (let r of t) r = e(r, ++n, t), null != r && "" !== r && (r = +r) >= r && (yield r)
        }
    }

    function _a(t, e, n) {
        const r = Float64Array.from(va(t, n));
        return r.sort(ge), e.map((t => ze(r, t)))
    }

    function xa(t, e) {
        return _a(t, [.25, .5, .75], e)
    }

    function ba(t, e) {
        const n = t.length, r = function (t, e) {
            const n = function (t, e) {
                let n, r = 0, i = 0, o = 0;
                if (void 0 === e) for (let e of t) null != e && (e = +e) >= e && (n = e - i, i += n / ++r, o += n * (e - i)); else {
                    let a = -1;
                    for (let u of t) null != (u = e(u, ++a, t)) && (u = +u) >= u && (n = u - i, i += n / ++r, o += n * (u - i))
                }
                if (r > 1) return o / (r - 1)
            }(t, e);
            return n ? Math.sqrt(n) : n
        }(t, e), i = xa(t, e), o = (i[2] - i[0]) / 1.34;
        return 1.06 * (Math.min(r, o) || r || Math.abs(i[0]) || 1) * Math.pow(n, -.2)
    }

    function wa(t) {
        const e = t.maxbins || 20, n = t.base || 10, r = Math.log(n), i = t.divide || [5, 2];
        let o, a, u, s, l, c, f = t.extent[0], h = t.extent[1];
        const d = t.span || h - f || Math.abs(f) || 1;
        if (t.step) o = t.step; else if (t.steps) {
            for (s = d / e, l = 0, c = t.steps.length; l < c && t.steps[l] < s; ++l) ;
            o = t.steps[Math.max(0, l - 1)]
        } else {
            for (a = Math.ceil(Math.log(e) / r), u = t.minstep || 0, o = Math.max(u, Math.pow(n, Math.round(Math.log(d) / r) - a)); Math.ceil(d / o) > e;) o *= n;
            for (l = 0, c = i.length; l < c; ++l) s = o / i[l], s >= u && d / s <= e && (o = s)
        }
        s = Math.log(o);
        const p = s >= 0 ? 0 : 1 + ~~(-s / r), g = Math.pow(n, -p - 1);
        return (t.nice || void 0 === t.nice) && (s = Math.floor(f / o + g) * o, f = f < s ? s - o : s, h = Math.ceil(h / o) * o), {
            start: f,
            stop: h === f ? f + o : h,
            step: o
        }
    }

    function ka(e, n, r, i) {
        if (!e.length) return [void 0, void 0];
        const o = Float64Array.from(va(e, i)), a = o.length, u = n;
        let s, l, c, f;
        for (c = 0, f = Array(u); c < u; ++c) {
            for (s = 0, l = 0; l < a; ++l) s += o[~~(t.random() * a)];
            f[c] = s / a
        }
        return f.sort(ge), [Te(f, r / 2), Te(f, 1 - r / 2)]
    }

    function Ma(t, e, n, r) {
        r = r || (t => t);
        const i = t.length, o = new Float64Array(i);
        let a, u = 0, s = 1, l = r(t[0]), c = l, f = l + e;
        for (; s < i; ++s) {
            if (a = r(t[s]), a >= f) {
                for (c = (l + c) / 2; u < s; ++u) o[u] = c;
                f = a + e, l = a
            }
            c = a
        }
        for (c = (l + c) / 2; u < s; ++u) o[u] = c;
        return n ? function (t, e) {
            const n = t.length;
            let r, i, o = 0, a = 1;
            for (; t[o] === t[a];) ++a;
            for (; a < n;) {
                for (r = a + 1; t[a] === t[r];) ++r;
                if (t[a] - t[a - 1] < e) {
                    for (i = a + (o + r - a - a >> 1); i < a;) t[i++] = t[a];
                    for (; i > a;) t[i--] = t[o]
                }
                o = a, a = r
            }
            return t
        }(o, e + e / 4) : o
    }

    t.random = Math.random;
    const Aa = Math.sqrt(2 * Math.PI), Ea = Math.SQRT2;
    let Da = NaN;

    function Ca(e, n) {
        e = e || 0, n = null == n ? 1 : n;
        let r, i, o = 0, a = 0;
        if (Da == Da) o = Da, Da = NaN; else {
            do {
                o = 2 * t.random() - 1, a = 2 * t.random() - 1, r = o * o + a * a
            } while (0 === r || r > 1);
            i = Math.sqrt(-2 * Math.log(r) / r), o *= i, Da = a * i
        }
        return e + o * n
    }

    function Fa(t, e, n) {
        const r = (t - (e || 0)) / (n = null == n ? 1 : n);
        return Math.exp(-.5 * r * r) / (n * Aa)
    }

    function Sa(t, e, n) {
        const r = (t - (e = e || 0)) / (n = null == n ? 1 : n), i = Math.abs(r);
        let o;
        if (i > 37) o = 0; else {
            const t = Math.exp(-i * i / 2);
            let e;
            i < 7.07106781186547 ? (e = .0352624965998911 * i + .700383064443688, e = e * i + 6.37396220353165, e = e * i + 33.912866078383, e = e * i + 112.079291497871, e = e * i + 221.213596169931, e = e * i + 220.206867912376, o = t * e, e = .0883883476483184 * i + 1.75566716318264, e = e * i + 16.064177579207, e = e * i + 86.7807322029461, e = e * i + 296.564248779674, e = e * i + 637.333633378831, e = e * i + 793.826512519948, e = e * i + 440.413735824752, o /= e) : (e = i + .65, e = i + 4 / e, e = i + 3 / e, e = i + 2 / e, e = i + 1 / e, o = t / e / 2.506628274631)
        }
        return r > 0 ? 1 - o : o
    }

    function Ba(t, e, n) {
        return t < 0 || t > 1 ? NaN : (e || 0) + (null == n ? 1 : n) * Ea * function (t) {
            let e, n = -Math.log((1 - t) * (1 + t));
            n < 6.25 ? (n -= 3.125, e = -364441206401782e-35, e = e * n - 16850591381820166e-35, e = 128584807152564e-32 + e * n, e = 11157877678025181e-33 + e * n, e = e * n - 1333171662854621e-31, e = 20972767875968562e-33 + e * n, e = 6637638134358324e-30 + e * n, e = e * n - 4054566272975207e-29, e = e * n - 8151934197605472e-29, e = 26335093153082323e-28 + e * n, e = e * n - 12975133253453532e-27, e = e * n - 5415412054294628e-26, e = 1.0512122733215323e-9 + e * n, e = e * n - 4.112633980346984e-9, e = e * n - 2.9070369957882005e-8, e = 4.2347877827932404e-7 + e * n, e = e * n - 13654692000834679e-22, e = e * n - 13882523362786469e-21, e = .00018673420803405714 + e * n, e = e * n - .000740702534166267, e = e * n - .006033670871430149, e = .24015818242558962 + e * n, e = 1.6536545626831027 + e * n) : n < 16 ? (n = Math.sqrt(n) - 3.25, e = 2.2137376921775787e-9, e = 9.075656193888539e-8 + e * n, e = e * n - 2.7517406297064545e-7, e = 1.8239629214389228e-8 + e * n, e = 15027403968909828e-22 + e * n, e = e * n - 4013867526981546e-21, e = 29234449089955446e-22 + e * n, e = 12475304481671779e-21 + e * n, e = e * n - 47318229009055734e-21, e = 6828485145957318e-20 + e * n, e = 24031110387097894e-21 + e * n, e = e * n - .0003550375203628475, e = .0009532893797373805 + e * n, e = e * n - .0016882755560235047, e = .002491442096107851 + e * n, e = e * n - .003751208507569241, e = .005370914553590064 + e * n, e = 1.0052589676941592 + e * n, e = 3.0838856104922208 + e * n) : Number.isFinite(n) ? (n = Math.sqrt(n) - 5, e = -27109920616438573e-27, e = e * n - 2.555641816996525e-10, e = 1.5076572693500548e-9 + e * n, e = e * n - 3.789465440126737e-9, e = 7.61570120807834e-9 + e * n, e = e * n - 1.496002662714924e-8, e = 2.914795345090108e-8 + e * n, e = e * n - 6.771199775845234e-8, e = 2.2900482228026655e-7 + e * n, e = e * n - 9.9298272942317e-7, e = 4526062597223154e-21 + e * n, e = e * n - 1968177810553167e-20, e = 7599527703001776e-20 + e * n, e = e * n - .00021503011930044477, e = e * n - .00013871931833623122, e = 1.0103004648645344 + e * n, e = 4.849906401408584 + e * n) : e = 1 / 0;
            return e * t
        }(2 * t - 1)
    }

    function Ta(t, e) {
        let n, r;
        const i = {
            mean(t) {
                return arguments.length ? (n = t || 0, i) : n
            }, stdev(t) {
                return arguments.length ? (r = null == t ? 1 : t, i) : r
            }, sample: () => Ca(n, r), pdf: t => Fa(t, n, r), cdf: t => Sa(t, n, r), icdf: t => Ba(t, n, r)
        };
        return i.mean(t).stdev(e)
    }

    function za(e, n) {
        const r = Ta();
        let i = 0;
        const o = {
            data(t) {
                return arguments.length ? (e = t, i = t ? t.length : 0, o.bandwidth(n)) : e
            }, bandwidth(t) {
                return arguments.length ? (!(n = t) && e && (n = ba(e)), o) : n
            }, sample: () => e[~~(t.random() * i)] + n * r.sample(), pdf(t) {
                let o = 0, a = 0;
                for (; a < i; ++a) o += r.pdf((t - e[a]) / n);
                return o / n / i
            }, cdf(t) {
                let o = 0, a = 0;
                for (; a < i; ++a) o += r.cdf((t - e[a]) / n);
                return o / i
            }, icdf() {
                throw Error("KDE icdf not supported.")
            }
        };
        return o.data(e)
    }

    function Na(t, e) {
        return t = t || 0, e = null == e ? 1 : e, Math.exp(t + Ca() * e)
    }

    function Oa(t, e, n) {
        if (t <= 0) return 0;
        e = e || 0, n = null == n ? 1 : n;
        const r = (Math.log(t) - e) / n;
        return Math.exp(-.5 * r * r) / (n * Aa * t)
    }

    function Ra(t, e, n) {
        return Sa(Math.log(t), e, n)
    }

    function La(t, e, n) {
        return Math.exp(Ba(t, e, n))
    }

    function Ua(t, e) {
        let n, r;
        const i = {
            mean(t) {
                return arguments.length ? (n = t || 0, i) : n
            }, stdev(t) {
                return arguments.length ? (r = null == t ? 1 : t, i) : r
            }, sample: () => Na(n, r), pdf: t => Oa(t, n, r), cdf: t => Ra(t, n, r), icdf: t => La(t, n, r)
        };
        return i.mean(t).stdev(e)
    }

    function qa(e, n) {
        let r, i = 0;
        const o = {
            weights(t) {
                return arguments.length ? (r = function (t) {
                    const e = [];
                    let n, r = 0;
                    for (n = 0; n < i; ++n) r += e[n] = null == t[n] ? 1 : +t[n];
                    for (n = 0; n < i; ++n) e[n] /= r;
                    return e
                }(n = t || []), o) : n
            }, distributions(t) {
                return arguments.length ? (t ? (i = t.length, e = t) : (i = 0, e = []), o.weights(n)) : e
            }, sample() {
                const n = t.random();
                let o = e[i - 1], a = r[0], u = 0;
                for (; u < i - 1; a += r[++u]) if (n < a) {
                    o = e[u];
                    break
                }
                return o.sample()
            }, pdf(t) {
                let n = 0, o = 0;
                for (; o < i; ++o) n += r[o] * e[o].pdf(t);
                return n
            }, cdf(t) {
                let n = 0, o = 0;
                for (; o < i; ++o) n += r[o] * e[o].cdf(t);
                return n
            }, icdf() {
                throw Error("Mixture icdf not supported.")
            }
        };
        return o.distributions(e).weights(n)
    }

    function Pa(e, n) {
        return null == n && (n = null == e ? 1 : e, e = 0), e + (n - e) * t.random()
    }

    function ja(t, e, n) {
        return null == n && (n = null == e ? 1 : e, e = 0), t >= e && t <= n ? 1 / (n - e) : 0
    }

    function Ia(t, e, n) {
        return null == n && (n = null == e ? 1 : e, e = 0), t < e ? 0 : t > n ? 1 : (t - e) / (n - e)
    }

    function $a(t, e, n) {
        return null == n && (n = null == e ? 1 : e, e = 0), t >= 0 && t <= 1 ? e + t * (n - e) : NaN
    }

    function Wa(t, e) {
        let n, r;
        const i = {
            min(t) {
                return arguments.length ? (n = t || 0, i) : n
            }, max(t) {
                return arguments.length ? (r = null == t ? 1 : t, i) : r
            }, sample: () => Pa(n, r), pdf: t => ja(t, n, r), cdf: t => Ia(t, n, r), icdf: t => $a(t, n, r)
        };
        return null == e && (e = null == t ? 1 : t, t = 0), i.min(t).max(e)
    }

    function Ha(t, e, n, r) {
        const i = r - t * t, o = Math.abs(i) < 1e-24 ? 0 : (n - t * e) / i;
        return [e - o * t, o]
    }

    function Ya(t, e, n, r) {
        t = t.filter((t => {
            let r = e(t), i = n(t);
            return null != r && (r = +r) >= r && null != i && (i = +i) >= i
        })), r && t.sort(((t, n) => e(t) - e(n)));
        const i = t.length, o = new Float64Array(i), a = new Float64Array(i);
        let u, s, l, c = 0, f = 0, h = 0;
        for (l of t) o[c] = u = +e(l), a[c] = s = +n(l), ++c, f += (u - f) / c, h += (s - h) / c;
        for (c = 0; c < i; ++c) o[c] -= f, a[c] -= h;
        return [o, a, f, h]
    }

    function Va(t, e, n, r) {
        let i, o, a = -1;
        for (const u of t) i = e(u), o = n(u), null != i && (i = +i) >= i && null != o && (o = +o) >= o && r(i, o, ++a)
    }

    function Ga(t, e, n, r, i) {
        let o = 0, a = 0;
        return Va(t, e, n, ((t, e) => {
            const n = e - i(t), u = e - r;
            o += n * n, a += u * u
        })), 1 - o / a
    }

    function Xa(t, e, n) {
        let r = 0, i = 0, o = 0, a = 0, u = 0;
        Va(t, e, n, ((t, e) => {
            ++u, r += (t - r) / u, i += (e - i) / u, o += (t * e - o) / u, a += (t * t - a) / u
        }));
        const s = Ha(r, i, o, a), l = t => s[0] + s[1] * t;
        return {coef: s, predict: l, rSquared: Ga(t, e, n, i, l)}
    }

    function Ja(t, e, n) {
        let r = 0, i = 0, o = 0, a = 0, u = 0;
        Va(t, e, n, ((t, e) => {
            ++u, t = Math.log(t), r += (t - r) / u, i += (e - i) / u, o += (t * e - o) / u, a += (t * t - a) / u
        }));
        const s = Ha(r, i, o, a), l = t => s[0] + s[1] * Math.log(t);
        return {coef: s, predict: l, rSquared: Ga(t, e, n, i, l)}
    }

    function Za(t, e, n) {
        const [r, i, o, a] = Ya(t, e, n);
        let u, s, l, c = 0, f = 0, h = 0, d = 0, p = 0;
        Va(t, e, n, ((t, e) => {
            u = r[p++], s = Math.log(e), l = u * e, c += (e * s - c) / p, f += (l - f) / p, h += (l * s - h) / p, d += (u * l - d) / p
        }));
        const [g, m] = Ha(f / a, c / a, h / a, d / a), y = t => Math.exp(g + m * (t - o));
        return {coef: [Math.exp(g - m * o), m], predict: y, rSquared: Ga(t, e, n, a, y)}
    }

    function Qa(t, e, n) {
        let r = 0, i = 0, o = 0, a = 0, u = 0, s = 0;
        Va(t, e, n, ((t, e) => {
            const n = Math.log(t), l = Math.log(e);
            ++s, r += (n - r) / s, i += (l - i) / s, o += (n * l - o) / s, a += (n * n - a) / s, u += (e - u) / s
        }));
        const l = Ha(r, i, o, a), c = t => l[0] * Math.pow(t, l[1]);
        return l[0] = Math.exp(l[0]), {coef: l, predict: c, rSquared: Ga(t, e, n, u, c)}
    }

    function Ka(t, e, n) {
        const [r, i, o, a] = Ya(t, e, n), u = r.length;
        let s, l, c, f, h = 0, d = 0, p = 0, g = 0, m = 0;
        for (s = 0; s < u;) l = r[s], c = i[s++], f = l * l, h += (f - h) / s, d += (f * l - d) / s, p += (f * f - p) / s, g += (l * c - g) / s, m += (f * c - m) / s;
        const y = p - h * h, v = h * y - d * d, _ = (m * h - g * d) / v, x = (g * y - m * d) / v, b = -_ * h,
            w = t => _ * (t -= o) * t + x * t + b + a;
        return {coef: [b - x * o + _ * o * o + a, x - 2 * _ * o, _], predict: w, rSquared: Ga(t, e, n, a, w)}
    }

    function tu(t, e, n, r) {
        if (1 === r) return Xa(t, e, n);
        if (2 === r) return Ka(t, e, n);
        const [i, o, a, u] = Ya(t, e, n), s = i.length, l = [], c = [], f = r + 1;
        let h, d, p, g, m;
        for (h = 0; h < f; ++h) {
            for (p = 0, g = 0; p < s; ++p) g += Math.pow(i[p], h) * o[p];
            for (l.push(g), m = new Float64Array(f), d = 0; d < f; ++d) {
                for (p = 0, g = 0; p < s; ++p) g += Math.pow(i[p], h + d);
                m[d] = g
            }
            c.push(m)
        }
        c.push(l);
        const y = function (t) {
            const e = t.length - 1, n = [];
            let r, i, o, a, u;
            for (r = 0; r < e; ++r) {
                for (a = r, i = r + 1; i < e; ++i) Math.abs(t[r][i]) > Math.abs(t[r][a]) && (a = i);
                for (o = r; o < e + 1; ++o) u = t[o][r], t[o][r] = t[o][a], t[o][a] = u;
                for (i = r + 1; i < e; ++i) for (o = e; o >= r; o--) t[o][i] -= t[o][r] * t[r][i] / t[r][r]
            }
            for (i = e - 1; i >= 0; --i) {
                for (u = 0, o = i + 1; o < e; ++o) u += t[o][i] * n[o];
                n[i] = (t[e][i] - u) / t[i][i]
            }
            return n
        }(c), v = t => {
            t -= a;
            let e = u + y[0] + y[1] * t + y[2] * t * t;
            for (h = 3; h < f; ++h) e += y[h] * Math.pow(t, h);
            return e
        };
        return {coef: eu(f, y, -a, u), predict: v, rSquared: Ga(t, e, n, u, v)}
    }

    function eu(t, e, n, r) {
        const i = Array(t);
        let o, a, u, s;
        for (o = 0; o < t; ++o) i[o] = 0;
        for (o = t - 1; o >= 0; --o) for (u = e[o], s = 1, i[o] += u, a = 1; a <= o; ++a) s *= (o + 1 - a) / a, i[o - a] += u * Math.pow(n, a) * s;
        return i[0] += r, i
    }

    function nu(t, e, n, r) {
        const [i, o, a, u] = Ya(t, e, n, !0), s = i.length, l = Math.max(2, ~~(r * s)), c = new Float64Array(s),
            f = new Float64Array(s), h = new Float64Array(s).fill(1);
        for (let t = -1; ++t <= 2;) {
            const e = [0, l - 1];
            for (let t = 0; t < s; ++t) {
                const n = i[t], r = e[0], a = e[1], u = n - i[r] > i[a] - n ? r : a;
                let s = 0, l = 0, d = 0, p = 0, g = 0;
                const m = 1 / Math.abs(i[u] - n || 1);
                for (let t = r; t <= a; ++t) {
                    const e = i[t], r = o[t], a = ru(Math.abs(n - e) * m) * h[t], u = e * a;
                    s += a, l += u, d += r * a, p += r * u, g += e * u
                }
                const [y, v] = Ha(l / s, d / s, p / s, g / s);
                c[t] = y + v * n, f[t] = Math.abs(o[t] - c[t]), iu(i, t + 1, e)
            }
            if (2 === t) break;
            const n = Ne(f);
            if (Math.abs(n) < 1e-12) break;
            for (let t, e, r = 0; r < s; ++r) t = f[r] / (6 * n), h[r] = t >= 1 ? 1e-12 : (e = 1 - t * t) * e
        }
        return function (t, e, n, r) {
            const i = t.length, o = [];
            let a, u = 0, s = 0, l = [];
            for (; u < i; ++u) a = t[u] + n, l[0] === a ? l[1] += (e[u] - l[1]) / ++s : (s = 0, l[1] += r, l = [a, e[u]], o.push(l));
            return l[1] += r, o
        }(i, c, a, u)
    }

    function ru(t) {
        return (t = 1 - t * t * t) * t * t
    }

    function iu(t, e, n) {
        const r = t[e];
        let i = n[0], o = n[1] + 1;
        if (!(o >= t.length)) for (; e > i && t[o] - r <= r - t[i];) n[0] = ++i, n[1] = o, ++o
    }

    const ou = .1 * Math.PI / 180;

    function au(t, e, n, r) {
        n = n || 25, r = Math.max(n, r || 200);
        const i = e => [e, t(e)], o = e[0], a = e[1], u = a - o, s = u / r, l = [i(o)], c = [];
        if (n === r) {
            for (let t = 1; t < r; ++t) l.push(i(o + t / n * u));
            return l.push(i(a)), l
        }
        c.push(i(a));
        for (let t = n; --t > 0;) c.push(i(o + t / n * u));
        let f = l[0], h = c[c.length - 1];
        for (; h;) {
            const t = i((f[0] + h[0]) / 2);
            t[0] - f[0] >= s && uu(f, t, h) > ou ? c.push(t) : (f = h, l.push(h), c.pop()), h = c[c.length - 1]
        }
        return l
    }

    function uu(t, e, n) {
        const r = Math.atan2(n[1] - t[1], n[0] - t[0]), i = Math.atan2(e[1] - t[1], e[0] - t[0]);
        return Math.abs(r - i)
    }

    function su(t) {
        return t && t.length ? 1 === t.length ? t[0] : (e = t, t => {
            const n = e.length;
            let r = 1, i = String(e[0](t));
            for (; r < n; ++r) i += "|" + e[r](t);
            return i
        }) : function () {
            return ""
        };
        var e
    }

    function lu(t, e, n) {
        return n || t + (e ? "_" + e : "")
    }

    const cu = () => {
    }, fu = {init: cu, add: cu, rem: cu, idx: 0}, hu = {
        values: {init: t => t.cell.store = !0, value: t => t.cell.data.values(), idx: -1},
        count: {value: t => t.cell.num},
        __count__: {value: t => t.missing + t.valid},
        missing: {value: t => t.missing},
        valid: {value: t => t.valid},
        sum: {init: t => t.sum = 0, value: t => t.sum, add: (t, e) => t.sum += +e, rem: (t, e) => t.sum -= e},
        product: {
            init: t => t.product = 1,
            value: t => t.valid ? t.product : void 0,
            add: (t, e) => t.product *= e,
            rem: (t, e) => t.product /= e
        },
        mean: {
            init: t => t.mean = 0,
            value: t => t.valid ? t.mean : void 0,
            add: (t, e) => (t.mean_d = e - t.mean, t.mean += t.mean_d / t.valid),
            rem: (t, e) => (t.mean_d = e - t.mean, t.mean -= t.valid ? t.mean_d / t.valid : t.mean)
        },
        average: {value: t => t.valid ? t.mean : void 0, req: ["mean"], idx: 1},
        variance: {
            init: t => t.dev = 0,
            value: t => t.valid > 1 ? t.dev / (t.valid - 1) : void 0,
            add: (t, e) => t.dev += t.mean_d * (e - t.mean),
            rem: (t, e) => t.dev -= t.mean_d * (e - t.mean),
            req: ["mean"],
            idx: 1
        },
        variancep: {value: t => t.valid > 1 ? t.dev / t.valid : void 0, req: ["variance"], idx: 2},
        stdev: {value: t => t.valid > 1 ? Math.sqrt(t.dev / (t.valid - 1)) : void 0, req: ["variance"], idx: 2},
        stdevp: {value: t => t.valid > 1 ? Math.sqrt(t.dev / t.valid) : void 0, req: ["variance"], idx: 2},
        stderr: {
            value: t => t.valid > 1 ? Math.sqrt(t.dev / (t.valid * (t.valid - 1))) : void 0,
            req: ["variance"],
            idx: 2
        },
        distinct: {value: t => t.cell.data.distinct(t.get), req: ["values"], idx: 3},
        ci0: {value: t => t.cell.data.ci0(t.get), req: ["values"], idx: 3},
        ci1: {value: t => t.cell.data.ci1(t.get), req: ["values"], idx: 3},
        median: {value: t => t.cell.data.q2(t.get), req: ["values"], idx: 3},
        q1: {value: t => t.cell.data.q1(t.get), req: ["values"], idx: 3},
        q3: {value: t => t.cell.data.q3(t.get), req: ["values"], idx: 3},
        min: {
            init: t => t.min = void 0,
            value: t => t.min = Number.isNaN(t.min) ? t.cell.data.min(t.get) : t.min,
            add: (t, e) => {
                (e < t.min || void 0 === t.min) && (t.min = e)
            },
            rem: (t, e) => {
                e <= t.min && (t.min = NaN)
            },
            req: ["values"],
            idx: 4
        },
        max: {
            init: t => t.max = void 0,
            value: t => t.max = Number.isNaN(t.max) ? t.cell.data.max(t.get) : t.max,
            add: (t, e) => {
                (e > t.max || void 0 === t.max) && (t.max = e)
            },
            rem: (t, e) => {
                e >= t.max && (t.max = NaN)
            },
            req: ["values"],
            idx: 4
        },
        argmin: {
            init: t => t.argmin = void 0, value: t => t.argmin || t.cell.data.argmin(t.get), add: (t, e, n) => {
                e < t.min && (t.argmin = n)
            }, rem: (t, e) => {
                e <= t.min && (t.argmin = void 0)
            }, req: ["min", "values"], idx: 3
        },
        argmax: {
            init: t => t.argmax = void 0, value: t => t.argmax || t.cell.data.argmax(t.get), add: (t, e, n) => {
                e > t.max && (t.argmax = n)
            }, rem: (t, e) => {
                e >= t.max && (t.argmax = void 0)
            }, req: ["max", "values"], idx: 3
        }
    }, du = Object.keys(hu);

    function pu(t, e) {
        return hu[t](e)
    }

    function gu(t, e) {
        return t.idx - e.idx
    }

    function mu() {
        this.valid = 0, this.missing = 0, this._ops.forEach((t => t.init(this)))
    }

    function yu(t, e) {
        null != t && "" !== t ? t == t && (++this.valid, this._ops.forEach((n => n.add(this, t, e)))) : ++this.missing
    }

    function vu(t, e) {
        null != t && "" !== t ? t == t && (--this.valid, this._ops.forEach((n => n.rem(this, t, e)))) : --this.missing
    }

    function _u(t) {
        return this._out.forEach((e => t[e.out] = e.value(this))), t
    }

    function xu(t, e) {
        const n = e || f, r = function (t) {
            const e = {};
            t.forEach((t => e[t.name] = t));
            const n = t => {
                t.req && t.req.forEach((t => {
                    e[t] || n(e[t] = hu[t]())
                }))
            };
            return t.forEach(n), Object.values(e).sort(gu)
        }(t), i = t.slice().sort(gu);

        function o(t) {
            this._ops = r, this._out = i, this.cell = t, this.init()
        }

        return o.prototype.init = mu, o.prototype.add = yu, o.prototype.rem = vu, o.prototype.set = _u, o.prototype.get = n, o.fields = t.map((t => t.out)), o
    }

    function bu(t) {
        this._key = t ? l(t) : Oo, this.reset()
    }

    du.forEach((t => {
        hu[t] = function (t, e) {
            return n => K({name: t, out: n || t}, fu, e)
        }(t, hu[t])
    }));
    const wu = bu.prototype;

    function ku(t) {
        pa.call(this, null, t), this._adds = [], this._mods = [], this._alen = 0, this._mlen = 0, this._drop = !0, this._cross = !1, this._dims = [], this._dnames = [], this._measures = [], this._countOnly = !1, this._counts = null, this._prev = null, this._inputs = null, this._outputs = null
    }

    wu.reset = function () {
        this._add = [], this._rem = [], this._ext = null, this._get = null, this._q = null
    }, wu.add = function (t) {
        this._add.push(t)
    }, wu.rem = function (t) {
        this._rem.push(t)
    }, wu.values = function () {
        if (this._get = null, 0 === this._rem.length) return this._add;
        const t = this._add, e = this._rem, n = this._key, r = t.length, i = e.length, o = Array(r - i), a = {};
        let u, s, l;
        for (u = 0; u < i; ++u) a[n(e[u])] = 1;
        for (u = 0, s = 0; u < r; ++u) a[n(l = t[u])] ? a[n(l)] = 0 : o[s++] = l;
        return this._rem = [], this._add = o
    }, wu.distinct = function (t) {
        const e = this.values(), n = {};
        let r, i = e.length, o = 0;
        for (; --i >= 0;) r = t(e[i]) + "", rt(n, r) || (n[r] = 1, ++o);
        return o
    }, wu.extent = function (t) {
        if (this._get !== t || !this._ext) {
            const e = this.values(), n = et(e, t);
            this._ext = [e[n[0]], e[n[1]]], this._get = t
        }
        return this._ext
    }, wu.argmin = function (t) {
        return this.extent(t)[0] || {}
    }, wu.argmax = function (t) {
        return this.extent(t)[1] || {}
    }, wu.min = function (t) {
        const e = this.extent(t)[0];
        return null != e ? t(e) : void 0
    }, wu.max = function (t) {
        const e = this.extent(t)[1];
        return null != e ? t(e) : void 0
    }, wu.quartile = function (t) {
        return this._get === t && this._q || (this._q = xa(this.values(), t), this._get = t), this._q
    }, wu.q1 = function (t) {
        return this.quartile(t)[0]
    }, wu.q2 = function (t) {
        return this.quartile(t)[1]
    }, wu.q3 = function (t) {
        return this.quartile(t)[2]
    }, wu.ci = function (t) {
        return this._get === t && this._ci || (this._ci = ka(this.values(), 1e3, .05, t), this._get = t), this._ci
    }, wu.ci0 = function (t) {
        return this.ci(t)[0]
    }, wu.ci1 = function (t) {
        return this.ci(t)[1]
    }, ku.Definition = {
        type: "Aggregate",
        metadata: {generates: !0, changes: !0},
        params: [{name: "groupby", type: "field", array: !0}, {
            name: "ops",
            type: "enum",
            array: !0,
            values: du
        }, {name: "fields", type: "field", null: !0, array: !0}, {
            name: "as",
            type: "string",
            null: !0,
            array: !0
        }, {name: "drop", type: "boolean", default: !0}, {name: "cross", type: "boolean", default: !1}, {
            name: "key",
            type: "field"
        }]
    }, ut(ku, pa, {
        transform(t, e) {
            const n = this, r = e.fork(e.NO_SOURCE | e.NO_FIELDS), i = t.modified();
            return n.stamp = r.stamp, n.value && (i || e.modified(n._inputs, !0)) ? (n._prev = n.value, n.value = i ? n.init(t) : {}, e.visit(e.SOURCE, (t => n.add(t)))) : (n.value = n.value || n.init(t), e.visit(e.REM, (t => n.rem(t))), e.visit(e.ADD, (t => n.add(t)))), r.modifies(n._outputs), n._drop = !1 !== t.drop, t.cross && n._dims.length > 1 && (n._drop = !1, n.cross()), e.clean() && n._drop && r.clean(!0).runAfter((() => this.clean())), n.changes(r)
        }, cross() {
            const t = this, e = t.value, n = t._dnames, r = n.map((() => ({}))), i = n.length;

            function o(t) {
                let e, o, a, u;
                for (e in t) for (a = t[e].tuple, o = 0; o < i; ++o) r[o][u = a[n[o]]] = u
            }

            o(t._prev), o(e), function o(a, u, s) {
                const l = n[s], c = r[s++];
                for (const n in c) {
                    const r = a ? a + "|" + n : n;
                    u[l] = c[n], s < i ? o(r, u, s) : e[r] || t.cell(r, u)
                }
            }("", {}, 0)
        }, init(t) {
            const e = this._inputs = [], i = this._outputs = [], o = {};

            function a(t) {
                const n = $(r(t)), i = n.length;
                let a, u = 0;
                for (; u < i; ++u) o[a = n[u]] || (o[a] = 1, e.push(a))
            }

            this._dims = $(t.groupby), this._dnames = this._dims.map((t => {
                const e = n(t);
                return a(t), i.push(e), e
            })), this.cellkey = t.key ? t.key : su(this._dims), this._countOnly = !0, this._counts = [], this._measures = [];
            const s = t.fields || [null], l = t.ops || ["count"], c = t.as || [], f = s.length, h = {};
            let d, p, g, m, y, v;
            for (f !== l.length && u("Unmatched number of fields and aggregate ops."), v = 0; v < f; ++v) d = s[v], p = l[v], null == d && "count" !== p && u("Null aggregate field specified."), m = n(d), y = lu(p, m, c[v]), i.push(y), "count" !== p ? (g = h[m], g || (a(d), g = h[m] = [], g.field = d, this._measures.push(g)), "count" !== p && (this._countOnly = !1), g.push(pu(p, y))) : this._counts.push(y);
            return this._measures = this._measures.map((t => xu(t, t.field))), {}
        }, cellkey: su(), cell(t, e) {
            let n = this.value[t];
            return n ? 0 === n.num && this._drop && n.stamp < this.stamp ? (n.stamp = this.stamp, this._adds[this._alen++] = n) : n.stamp < this.stamp && (n.stamp = this.stamp, this._mods[this._mlen++] = n) : (n = this.value[t] = this.newcell(t, e), this._adds[this._alen++] = n), n
        }, newcell(t, e) {
            const n = {
                key: t,
                num: 0,
                agg: null,
                tuple: this.newtuple(e, this._prev && this._prev[t]),
                stamp: this.stamp,
                store: !1
            };
            if (!this._countOnly) {
                const t = this._measures, e = t.length;
                n.agg = Array(e);
                for (let r = 0; r < e; ++r) n.agg[r] = new t[r](n)
            }
            return n.store && (n.data = new bu), n
        }, newtuple(t, e) {
            const n = this._dnames, r = this._dims, i = r.length, o = {};
            for (let e = 0; e < i; ++e) o[n[e]] = r[e](t);
            return e ? Po(e.tuple, o) : Lo(o)
        }, clean() {
            const t = this.value;
            for (const e in t) 0 === t[e].num && delete t[e]
        }, add(t) {
            const e = this.cellkey(t), n = this.cell(e, t);
            if (n.num += 1, this._countOnly) return;
            n.store && n.data.add(t);
            const r = n.agg;
            for (let e = 0, n = r.length; e < n; ++e) r[e].add(r[e].get(t), t)
        }, rem(t) {
            const e = this.cellkey(t), n = this.cell(e, t);
            if (n.num -= 1, this._countOnly) return;
            n.store && n.data.rem(t);
            const r = n.agg;
            for (let e = 0, n = r.length; e < n; ++e) r[e].rem(r[e].get(t), t)
        }, celltuple(t) {
            const e = t.tuple, n = this._counts;
            t.store && t.data.values();
            for (let r = 0, i = n.length; r < i; ++r) e[n[r]] = t.num;
            if (!this._countOnly) {
                const n = t.agg;
                for (let t = 0, r = n.length; t < r; ++t) n[t].set(e)
            }
            return e
        }, changes(t) {
            const e = this._adds, n = this._mods, r = this._prev, i = this._drop, o = t.add, a = t.rem, u = t.mod;
            let s, l, c, f;
            if (r) for (l in r) s = r[l], i && !s.num || a.push(s.tuple);
            for (c = 0, f = this._alen; c < f; ++c) o.push(this.celltuple(e[c])), e[c] = null;
            for (c = 0, f = this._mlen; c < f; ++c) s = n[c], (0 === s.num && i ? a : u).push(this.celltuple(s)), n[c] = null;
            return this._alen = this._mlen = 0, this._prev = null, t
        }
    });

    function Mu(t) {
        pa.call(this, null, t)
    }

    function Au(t, e, n) {
        const r = t;
        let i = e || [], o = n || [], a = {}, u = 0;
        return {
            add: t => o.push(t),
            remove: t => a[r(t)] = ++u,
            size: () => i.length,
            data: (t, e) => (u && (i = i.filter((t => !a[r(t)])), a = {}, u = 0), e && t && i.sort(t), o.length && (i = t ? vt(t, i, o.sort(t)) : i.concat(o), o = []), i)
        }
    }

    function Eu(t) {
        pa.call(this, [], t)
    }

    function Du(t) {
        Go.call(this, null, Cu, t)
    }

    function Cu(t) {
        return this.value && !t.modified() ? this.value : Y(t.fields, t.orders)
    }

    function Fu(t) {
        pa.call(this, null, t)
    }

    function Su(t) {
        pa.call(this, null, t)
    }

    Mu.Definition = {
        type: "Bin",
        metadata: {modifies: !0},
        params: [{name: "field", type: "field", required: !0}, {
            name: "interval",
            type: "boolean",
            default: !0
        }, {name: "anchor", type: "number"}, {name: "maxbins", type: "number", default: 20}, {
            name: "base",
            type: "number",
            default: 10
        }, {name: "divide", type: "number", array: !0, default: [5, 2]}, {
            name: "extent",
            type: "number",
            array: !0,
            length: 2,
            required: !0
        }, {name: "span", type: "number"}, {name: "step", type: "number"}, {
            name: "steps",
            type: "number",
            array: !0
        }, {name: "minstep", type: "number", default: 0}, {name: "nice", type: "boolean", default: !0}, {
            name: "name",
            type: "string"
        }, {name: "as", type: "string", array: !0, length: 2, default: ["bin0", "bin1"]}]
    }, ut(Mu, pa, {
        transform(t, e) {
            const n = !1 !== t.interval, i = this._bins(t), o = i.start, a = i.step, u = t.as || ["bin0", "bin1"],
                s = u[0], l = u[1];
            let c;
            return c = t.modified() ? (e = e.reflow(!0)).SOURCE : e.modified(r(t.field)) ? e.ADD_MOD : e.ADD, e.visit(c, n ? t => {
                const e = i(t);
                t[s] = e, t[l] = null == e ? null : o + a * (1 + (e - o) / a)
            } : t => t[s] = i(t)), e.modifies(n ? u : s)
        }, _bins(t) {
            if (this.value && !t.modified()) return this.value;
            const i = t.field, o = wa(t), a = o.step;
            let u, s, l = o.start, c = l + Math.ceil((o.stop - l) / a) * a;
            null != (u = t.anchor) && (s = u - (l + a * Math.floor((u - l) / a)), l += s, c += s);
            const f = function (t) {
                let e = A(i(t));
                return null == e ? null : e < l ? -1 / 0 : e > c ? 1 / 0 : (e = Math.max(l, Math.min(e, c - a)), l + a * Math.floor(1e-14 + (e - l) / a))
            };
            return f.start = l, f.stop = o.stop, f.step = a, this.value = e(f, r(i), t.name || "bin_" + n(i))
        }
    }), Eu.Definition = {
        type: "Collect",
        metadata: {source: !0},
        params: [{name: "sort", type: "compare"}]
    }, ut(Eu, pa, {
        transform(t, e) {
            const n = e.fork(e.ALL), r = Au(Oo, this.value, n.materialize(n.ADD).add), i = t.sort,
                o = e.changed() || i && (t.modified("sort") || e.modified(i.fields));
            return n.visit(n.REM, r.remove), this.modified(o), this.value = n.source = r.data(jo(i), o), e.source && e.source.root && (this.value.root = e.source.root), n
        }
    }), ut(Du, Go), Fu.Definition = {
        type: "CountPattern",
        metadata: {generates: !0, changes: !0},
        params: [{name: "field", type: "field", required: !0}, {
            name: "case",
            type: "enum",
            values: ["upper", "lower", "mixed"],
            default: "mixed"
        }, {name: "pattern", type: "string", default: '[\\w"]+'}, {
            name: "stopwords",
            type: "string",
            default: ""
        }, {name: "as", type: "string", array: !0, length: 2, default: ["text", "count"]}]
    }, ut(Fu, pa, {
        transform(t, e) {
            const n = e => n => {
                    for (var r, i = function (t, e, n) {
                        switch (e) {
                            case"upper":
                                t = t.toUpperCase();
                                break;
                            case"lower":
                                t = t.toLowerCase()
                        }
                        return t.match(n)
                    }(u(n), t.case, o) || [], s = 0, l = i.length; s < l; ++s) a.test(r = i[s]) || e(r)
                }, r = this._parameterCheck(t, e), i = this._counts, o = this._match, a = this._stop, u = t.field,
                s = t.as || ["text", "count"], l = n((t => i[t] = 1 + (i[t] || 0))), c = n((t => i[t] -= 1));
            return r ? e.visit(e.SOURCE, l) : (e.visit(e.ADD, l), e.visit(e.REM, c)), this._finish(e, s)
        }, _parameterCheck(t, e) {
            let n = !1;
            return !t.modified("stopwords") && this._stop || (this._stop = new RegExp("^" + (t.stopwords || "") + "$", "i"), n = !0), !t.modified("pattern") && this._match || (this._match = new RegExp(t.pattern || "[\\w']+", "g"), n = !0), (t.modified("field") || e.modified(t.field.fields)) && (n = !0), n && (this._counts = {}), n
        }, _finish(t, e) {
            const n = this._counts, r = this._tuples || (this._tuples = {}), i = e[0], o = e[1],
                a = t.fork(t.NO_SOURCE | t.NO_FIELDS);
            let u, s, l;
            for (u in n) s = r[u], l = n[u] || 0, !s && l ? (r[u] = s = Lo({}), s[i] = u, s[o] = l, a.add.push(s)) : 0 === l ? (s && a.rem.push(s), n[u] = null, r[u] = null) : s[o] !== l && (s[o] = l, a.mod.push(s));
            return a.modifies(e)
        }
    }), Su.Definition = {
        type: "Cross",
        metadata: {generates: !0},
        params: [{name: "filter", type: "expr"}, {
            name: "as",
            type: "string",
            array: !0,
            length: 2,
            default: ["a", "b"]
        }]
    }, ut(Su, pa, {
        transform(t, e) {
            const n = e.fork(e.NO_SOURCE), r = t.as || ["a", "b"], i = r[0], o = r[1],
                a = !this.value || e.changed(e.ADD_REM) || t.modified("as") || t.modified("filter");
            let u = this.value;
            return a ? (u && (n.rem = u), u = e.materialize(e.SOURCE).source, n.add = this.value = function (t, e, n, r) {
                for (var i, o, a = [], u = {}, s = t.length, l = 0; l < s; ++l) for (u[e] = o = t[l], i = 0; i < s; ++i) u[n] = t[i], r(u) && (a.push(Lo(u)), (u = {})[e] = o);
                return a
            }(u, i, o, t.filter || p)) : n.mod = u, n.source = this.value, n.modifies(r)
        }
    });
    const Bu = {kde: za, mixture: qa, normal: Ta, lognormal: Ua, uniform: Wa}, Tu = "function";

    function zu(t, e) {
        const n = t.function;
        rt(Bu, n) || u("Unknown distribution function: " + n);
        const r = Bu[n]();
        for (const n in t) "field" === n ? r.data((t.from || e()).map(t[n])) : "distributions" === n ? r[n](t[n].map((t => zu(t, e)))) : typeof r[n] === Tu && r[n](t[n]);
        return r
    }

    function Nu(t) {
        pa.call(this, null, t)
    }

    const Ou = [{
        key: {function: "normal"},
        params: [{name: "mean", type: "number", default: 0}, {name: "stdev", type: "number", default: 1}]
    }, {
        key: {function: "lognormal"},
        params: [{name: "mean", type: "number", default: 0}, {name: "stdev", type: "number", default: 1}]
    }, {
        key: {function: "uniform"},
        params: [{name: "min", type: "number", default: 0}, {name: "max", type: "number", default: 1}]
    }, {
        key: {function: "kde"},
        params: [{name: "field", type: "field", required: !0}, {name: "from", type: "data"}, {
            name: "bandwidth",
            type: "number",
            default: 0
        }]
    }], Ru = {
        key: {function: "mixture"},
        params: [{name: "distributions", type: "param", array: !0, params: Ou}, {
            name: "weights",
            type: "number",
            array: !0
        }]
    };

    function Lu(t, e) {
        return t ? t.map(((t, r) => e[r] || n(t))) : null
    }

    function Uu(t, e, n) {
        const r = [], i = t => t(s);
        let o, a, u, s, l, c;
        if (null == e) r.push(t.map(n)); else for (o = {}, a = 0, u = t.length; a < u; ++a) s = t[a], l = e.map(i), c = o[l], c || (o[l] = c = [], c.dims = l, r.push(c)), c.push(n(s));
        return r
    }

    Nu.Definition = {
        type: "Density",
        metadata: {generates: !0},
        params: [{name: "extent", type: "number", array: !0, length: 2}, {
            name: "steps",
            type: "number"
        }, {name: "minsteps", type: "number", default: 25}, {
            name: "maxsteps",
            type: "number",
            default: 200
        }, {name: "method", type: "string", default: "pdf", values: ["pdf", "cdf"]}, {
            name: "distribution",
            type: "param",
            params: Ou.concat(Ru)
        }, {name: "as", type: "string", array: !0, default: ["value", "density"]}]
    }, ut(Nu, pa, {
        transform(t, e) {
            const n = e.fork(e.NO_SOURCE | e.NO_FIELDS);
            if (!this.value || e.changed() || t.modified()) {
                const r = zu(t.distribution, function (t) {
                    return () => t.materialize(t.SOURCE).source
                }(e)), i = t.steps || t.minsteps || 25, o = t.steps || t.maxsteps || 200;
                let a = t.method || "pdf";
                "pdf" !== a && "cdf" !== a && u("Invalid density method: " + a), t.extent || r.data || u("Missing density extent parameter."), a = r[a];
                const s = t.as || ["value", "density"], l = au(a, t.extent || tt(r.data()), i, o).map((t => {
                    const e = {};
                    return e[s[0]] = t[0], e[s[1]] = t[1], Lo(e)
                }));
                this.value && (n.rem = this.value), this.value = n.add = n.source = l
            }
            return n
        }
    });

    function qu(t) {
        pa.call(this, null, t)
    }

    qu.Definition = {
        type: "DotBin",
        metadata: {modifies: !0},
        params: [{name: "field", type: "field", required: !0}, {
            name: "groupby",
            type: "field",
            array: !0
        }, {name: "step", type: "number"}, {name: "smooth", type: "boolean", default: !1}, {
            name: "as",
            type: "string",
            default: "bin"
        }]
    };

    function Pu(t) {
        Go.call(this, null, ju, t), this.modified(!0)
    }

    function ju(t) {
        const i = t.expr;
        return this.value && !t.modified("expr") ? this.value : e((e => i(e, t)), r(i), n(i))
    }

    function Iu(t) {
        pa.call(this, [void 0, void 0], t)
    }

    function $u(t, e) {
        Go.call(this, t), this.parent = e, this.count = 0
    }

    function Wu(t) {
        pa.call(this, {}, t), this._keys = ot();
        const e = this._targets = [];
        e.active = 0, e.forEach = t => {
            for (let n = 0, r = e.active; n < r; ++n) t(e[n], n, e)
        }
    }

    function Hu(t) {
        Go.call(this, null, Yu, t)
    }

    function Yu(t) {
        return this.value && !t.modified() ? this.value : v(t.name) ? $(t.name).map((t => l(t))) : l(t.name, t.as)
    }

    function Vu(t) {
        pa.call(this, ot(), t)
    }

    function Gu(t) {
        pa.call(this, [], t)
    }

    function Xu(t) {
        pa.call(this, [], t)
    }

    function Ju(t) {
        pa.call(this, null, t)
    }

    function Zu(t) {
        pa.call(this, [], t)
    }

    ut(qu, pa, {
        transform(t, e) {
            if (this.value && !t.modified() && !e.changed()) return e;
            const n = e.materialize(e.SOURCE).source, r = Uu(e.source, t.groupby, f), i = t.smooth || !1, o = t.field,
                a = t.step || ((t, e) => bt(tt(t, e)) / 30)(n, o), u = jo(((t, e) => o(t) - o(e))), s = t.as || "bin",
                l = r.length;
            let c, h = 1 / 0, d = -1 / 0, p = 0;
            for (; p < l; ++p) {
                const t = r[p].sort(u);
                c = -1;
                for (const e of Ma(t, a, i, o)) e < h && (h = e), e > d && (d = e), t[++c][s] = e
            }
            return this.value = {start: h, stop: d, step: a}, e.reflow(!0).modifies(s)
        }
    }), ut(Pu, Go), Iu.Definition = {
        type: "Extent",
        metadata: {},
        params: [{name: "field", type: "field", required: !0}]
    }, ut(Iu, pa, {
        transform(t, e) {
            const r = this.value, i = t.field, o = e.changed() || e.modified(i.fields) || t.modified("field");
            let a = r[0], u = r[1];
            if ((o || null == a) && (a = 1 / 0, u = -1 / 0), e.visit(o ? e.SOURCE : e.ADD, (t => {
                const e = A(i(t));
                null != e && (e < a && (a = e), e > u && (u = e))
            })), !Number.isFinite(a) || !Number.isFinite(u)) {
                let t = n(i);
                t && (t = ' for field "'.concat(t, '"')), e.dataflow.warn("Infinite extent".concat(t, ": [").concat(a, ", ").concat(u, "]")), a = u = void 0
            }
            this.value = [a, u]
        }
    }), ut($u, Go, {
        connect(t) {
            return this.detachSubflow = t.detachSubflow, this.targets().add(t), t.source = this
        }, add(t) {
            this.count += 1, this.value.add.push(t)
        }, rem(t) {
            this.count -= 1, this.value.rem.push(t)
        }, mod(t) {
            this.value.mod.push(t)
        }, init(t) {
            this.value.init(t, t.NO_SOURCE)
        }, evaluate() {
            return this.value
        }
    }), ut(Wu, pa, {
        activate(t) {
            this._targets[this._targets.active++] = t
        }, subflow(t, e, n, r) {
            const i = this.value;
            let o, a, u = rt(i, t) && i[t];
            return u ? u.value.stamp < n.stamp && (u.init(n), this.activate(u)) : (a = r || (a = this._group[t]) && a.tuple, o = n.dataflow, u = new $u(n.fork(n.NO_SOURCE), this), o.add(u).connect(e(o, t, a)), i[t] = u, this.activate(u)), u
        }, clean() {
            const t = this.value;
            for (const e in t) if (0 === t[e].count) {
                const n = t[e].detachSubflow;
                n && n(), delete t[e]
            }
        }, initTargets() {
            const t = this._targets, e = t.length;
            for (let n = 0; n < e && null != t[n]; ++n) t[n] = null;
            t.active = 0
        }, transform(t, e) {
            const n = e.dataflow, r = t.key, i = t.subflow, o = this._keys, a = t.modified("key"),
                u = t => this.subflow(t, i, e);
            return this._group = t.group || {}, this.initTargets(), e.visit(e.REM, (t => {
                const e = Oo(t), n = o.get(e);
                void 0 !== n && (o.delete(e), u(n).rem(t))
            })), e.visit(e.ADD, (t => {
                const e = r(t);
                o.set(Oo(t), e), u(e).add(t)
            })), a || e.modified(r.fields) ? e.visit(e.MOD, (t => {
                const e = Oo(t), n = o.get(e), i = r(t);
                n === i ? u(i).mod(t) : (o.set(e, i), u(n).rem(t), u(i).add(t))
            })) : e.changed(e.MOD) && e.visit(e.MOD, (t => {
                u(o.get(Oo(t))).mod(t)
            })), a && e.visit(e.REFLOW, (t => {
                const e = Oo(t), n = o.get(e), i = r(t);
                n !== i && (o.set(e, i), u(n).rem(t), u(i).add(t))
            })), e.clean() ? n.runAfter((() => {
                this.clean(), o.clean()
            })) : o.empty > n.cleanThreshold && n.runAfter(o.clean), e
        }
    }), ut(Hu, Go), Vu.Definition = {
        type: "Filter",
        metadata: {changes: !0},
        params: [{name: "expr", type: "expr", required: !0}]
    }, ut(Vu, pa, {
        transform(t, e) {
            const n = e.dataflow, r = this.value, i = e.fork(), o = i.add, a = i.rem, u = i.mod, s = t.expr;
            let l = !0;

            function c(e) {
                const n = Oo(e), i = s(e, t), c = r.get(n);
                i && c ? (r.delete(n), o.push(e)) : i || c ? l && i && !c && u.push(e) : (r.set(n, 1), a.push(e))
            }

            return e.visit(e.REM, (t => {
                const e = Oo(t);
                r.has(e) ? r.delete(e) : a.push(t)
            })), e.visit(e.ADD, (e => {
                s(e, t) ? o.push(e) : r.set(Oo(e), 1)
            })), e.visit(e.MOD, c), t.modified() && (l = !1, e.visit(e.REFLOW, c)), r.empty > n.cleanThreshold && n.runAfter(r.clean), i
        }
    }), Gu.Definition = {
        type: "Flatten",
        metadata: {generates: !0},
        params: [{name: "fields", type: "field", array: !0, required: !0}, {name: "index", type: "string"}, {
            name: "as",
            type: "string",
            array: !0
        }]
    }, ut(Gu, pa, {
        transform(t, e) {
            const n = e.fork(e.NO_SOURCE), r = t.fields, i = Lu(r, t.as || []), o = t.index || null, a = i.length;
            return n.rem = this.value, e.visit(e.SOURCE, (t => {
                const e = r.map((e => e(t))), u = e.reduce(((t, e) => Math.max(t, e.length)), 0);
                let s, l, c, f = 0;
                for (; f < u; ++f) {
                    for (l = Uo(t), s = 0; s < a; ++s) l[i[s]] = null == (c = e[s][f]) ? null : c;
                    o && (l[o] = f), n.add.push(l)
                }
            })), this.value = n.source = n.add, o && n.modifies(o), n.modifies(i)
        }
    }), Xu.Definition = {
        type: "Fold",
        metadata: {generates: !0},
        params: [{name: "fields", type: "field", array: !0, required: !0}, {
            name: "as",
            type: "string",
            array: !0,
            length: 2,
            default: ["key", "value"]
        }]
    }, ut(Xu, pa, {
        transform(t, e) {
            const r = e.fork(e.NO_SOURCE), i = t.fields, o = i.map(n), a = t.as || ["key", "value"], u = a[0], s = a[1],
                l = i.length;
            return r.rem = this.value, e.visit(e.SOURCE, (t => {
                for (let e, n = 0; n < l; ++n) e = Uo(t), e[u] = o[n], e[s] = i[n](t), r.add.push(e)
            })), this.value = r.source = r.add, r.modifies(a)
        }
    }), Ju.Definition = {
        type: "Formula",
        metadata: {modifies: !0},
        params: [{name: "expr", type: "expr", required: !0}, {
            name: "as",
            type: "string",
            required: !0
        }, {name: "initonly", type: "boolean"}]
    }, ut(Ju, pa, {
        transform(t, e) {
            const n = t.expr, r = t.as, i = t.modified(),
                o = t.initonly ? e.ADD : i ? e.SOURCE : e.modified(n.fields) || e.modified(r) ? e.ADD_MOD : e.ADD;
            return i && (e = e.materialize().reflow(!0)), t.initonly || e.modifies(r), e.visit(o, (e => e[r] = n(e, t)))
        }
    }), ut(Zu, pa, {
        transform(t, e) {
            const n = e.fork(e.ALL), r = t.generator;
            let i, o, a, u = this.value, s = t.size - u.length;
            if (s > 0) {
                for (i = []; --s >= 0;) i.push(a = Lo(r(t))), u.push(a);
                n.add = n.add.length ? n.materialize(n.ADD).add.concat(i) : i
            } else o = u.slice(0, -s), n.rem = n.rem.length ? n.materialize(n.REM).rem.concat(o) : o, u = u.slice(-s);
            return n.source = this.value = u, n
        }
    });
    const Qu = {
        value: "value", median: Ne, mean: function (t, e) {
            let n = 0, r = 0;
            if (void 0 === e) for (let e of t) null != e && (e = +e) >= e && (++n, r += e); else {
                let i = -1;
                for (let o of t) null != (o = e(o, ++i, t)) && (o = +o) >= o && (++n, r += o)
            }
            if (n) return r / n
        }, min: Fe, max: Ce
    }, Ku = [];

    function ts(t) {
        pa.call(this, [], t)
    }

    function es(t) {
        ku.call(this, t)
    }

    function ns(t) {
        pa.call(this, null, t)
    }

    function rs(t) {
        Go.call(this, null, is, t)
    }

    function is(t) {
        return this.value && !t.modified() ? this.value : gt(t.fields, t.flat)
    }

    function os(t) {
        pa.call(this, [], t), this._pending = null
    }

    function as(t, e, n) {
        n.forEach(Lo);
        const r = e.fork(e.NO_FIELDS & e.NO_SOURCE);
        return r.rem = t.value, t.value = r.source = r.add = n, t._pending = null, r.rem.length && r.clean(!0), r
    }

    function us(t) {
        pa.call(this, {}, t)
    }

    function ss(t) {
        Go.call(this, null, ls, t)
    }

    function ls(t) {
        if (this.value && !t.modified()) return this.value;
        const e = t.extents, n = e.length;
        let r, i, o = 1 / 0, a = -1 / 0;
        for (r = 0; r < n; ++r) i = e[r], i[0] < o && (o = i[0]), i[1] > a && (a = i[1]);
        return [o, a]
    }

    function cs(t) {
        Go.call(this, null, fs, t)
    }

    function fs(t) {
        return this.value && !t.modified() ? this.value : t.values.reduce(((t, e) => t.concat(e)), [])
    }

    function hs(t) {
        pa.call(this, null, t)
    }

    function ds(t) {
        ku.call(this, t)
    }

    function ps(t) {
        Wu.call(this, t)
    }

    function gs(t) {
        pa.call(this, null, t)
    }

    function ms(t) {
        pa.call(this, null, t)
    }

    function ys(t) {
        pa.call(this, null, t)
    }

    ts.Definition = {
        type: "Impute",
        metadata: {changes: !0},
        params: [{name: "field", type: "field", required: !0}, {
            name: "key",
            type: "field",
            required: !0
        }, {name: "keyvals", array: !0}, {name: "groupby", type: "field", array: !0}, {
            name: "method",
            type: "enum",
            default: "value",
            values: ["value", "mean", "median", "max", "min"]
        }, {name: "value", default: 0}]
    }, ut(ts, pa, {
        transform(t, e) {
            var r, i, o, a, s, l, c, f, h, d, p = e.fork(e.ALL), g = function (t) {
                var e, n = t.method || Qu.value;
                if (null != Qu[n]) return n === Qu.value ? (e = void 0 !== t.value ? t.value : 0, () => e) : Qu[n];
                u("Unrecognized imputation method: " + n)
            }(t), m = function (t) {
                const e = t.field;
                return t => t ? e(t) : NaN
            }(t), y = n(t.field), v = n(t.key), _ = (t.groupby || []).map(n), x = function (t, e, n, r) {
                var i, o, a, u, s, l, c, f, h = t => t(f), d = [], p = r ? r.slice() : [], g = {}, m = {};
                for (p.forEach(((t, e) => g[t] = e + 1)), u = 0, c = t.length; u < c; ++u) l = n(f = t[u]), s = g[l] || (g[l] = p.push(l)), (a = m[o = (i = e ? e.map(h) : Ku) + ""]) || (a = m[o] = [], d.push(a), a.values = i), a[s - 1] = f;
                return d.domain = p, d
            }(e.source, t.groupby, t.key, t.keyvals), b = [], w = this.value, k = x.domain.length;
            for (s = 0, f = x.length; s < f; ++s) for (o = (r = x[s]).values, i = NaN, c = 0; c < k; ++c) if (null == r[c]) {
                for (a = x.domain[c], d = {_impute: !0}, l = 0, h = o.length; l < h; ++l) d[_[l]] = o[l];
                d[v] = a, d[y] = Number.isNaN(i) ? i = g(r, m) : i, b.push(Lo(d))
            }
            return b.length && (p.add = p.materialize(p.ADD).add.concat(b)), w.length && (p.rem = p.materialize(p.REM).rem.concat(w)), this.value = b, p
        }
    }), es.Definition = {
        type: "JoinAggregate",
        metadata: {modifies: !0},
        params: [{name: "groupby", type: "field", array: !0}, {
            name: "fields",
            type: "field",
            null: !0,
            array: !0
        }, {name: "ops", type: "enum", array: !0, values: du}, {
            name: "as",
            type: "string",
            null: !0,
            array: !0
        }, {name: "key", type: "field"}]
    }, ut(es, ku, {
        transform(t, e) {
            const n = this, r = t.modified();
            let i;
            return n.value && (r || e.modified(n._inputs, !0)) ? (i = n.value = r ? n.init(t) : {}, e.visit(e.SOURCE, (t => n.add(t)))) : (i = n.value = n.value || this.init(t), e.visit(e.REM, (t => n.rem(t))), e.visit(e.ADD, (t => n.add(t)))), n.changes(), e.visit(e.SOURCE, (t => {
                K(t, i[n.cellkey(t)].tuple)
            })), e.reflow(r).modifies(this._outputs)
        }, changes() {
            const t = this._adds, e = this._mods;
            let n, r;
            for (n = 0, r = this._alen; n < r; ++n) this.celltuple(t[n]), t[n] = null;
            for (n = 0, r = this._mlen; n < r; ++n) this.celltuple(e[n]), e[n] = null;
            this._alen = this._mlen = 0
        }
    }), ns.Definition = {
        type: "KDE",
        metadata: {generates: !0},
        params: [{name: "groupby", type: "field", array: !0}, {
            name: "field",
            type: "field",
            required: !0
        }, {name: "cumulative", type: "boolean", default: !1}, {
            name: "counts",
            type: "boolean",
            default: !1
        }, {name: "bandwidth", type: "number", default: 0}, {
            name: "extent",
            type: "number",
            array: !0,
            length: 2
        }, {name: "resolve", type: "enum", values: ["shared", "independent"], default: "independent"}, {
            name: "steps",
            type: "number"
        }, {name: "minsteps", type: "number", default: 25}, {
            name: "maxsteps",
            type: "number",
            default: 200
        }, {name: "as", type: "string", array: !0, default: ["value", "density"]}]
    }, ut(ns, pa, {
        transform(t, e) {
            const r = e.fork(e.NO_SOURCE | e.NO_FIELDS);
            if (!this.value || e.changed() || t.modified()) {
                const i = e.materialize(e.SOURCE).source, o = Uu(i, t.groupby, t.field), a = (t.groupby || []).map(n),
                    s = t.bandwidth, l = t.cumulative ? "cdf" : "pdf", c = t.as || ["value", "density"], f = [];
                let h = t.extent, d = t.steps || t.minsteps || 25, p = t.steps || t.maxsteps || 200;
                "pdf" !== l && "cdf" !== l && u("Invalid density method: " + l), "shared" === t.resolve && (h || (h = tt(i, t.field)), d = p = t.steps || p), o.forEach((e => {
                    const n = za(e, s)[l], r = t.counts ? e.length : 1;
                    au(n, h || tt(e), d, p).forEach((t => {
                        const n = {};
                        for (let t = 0; t < a.length; ++t) n[a[t]] = e.dims[t];
                        n[c[0]] = t[0], n[c[1]] = t[1] * r, f.push(Lo(n))
                    }))
                })), this.value && (r.rem = this.value), this.value = r.add = r.source = f
            }
            return r
        }
    }), ut(rs, Go), ut(os, pa, {
        transform(t, e) {
            const n = e.dataflow;
            if (this._pending) return as(this, e, this._pending);
            if (function (t) {
                return t.modified("async") && !(t.modified("values") || t.modified("url") || t.modified("format"))
            }(t)) return e.StopPropagation;
            if (t.values) return as(this, e, n.parse(t.values, t.format));
            if (t.async) {
                return {async: n.request(t.url, t.format).then((t => (this._pending = $(t.data), t => t.touch(this))))}
            }
            return n.request(t.url, t.format).then((t => as(this, e, $(t.data))))
        }
    }), us.Definition = {
        type: "Lookup",
        metadata: {modifies: !0},
        params: [{
            name: "index",
            type: "index",
            params: [{name: "from", type: "data", required: !0}, {name: "key", type: "field", required: !0}]
        }, {name: "values", type: "field", array: !0}, {
            name: "fields",
            type: "field",
            array: !0,
            required: !0
        }, {name: "as", type: "string", array: !0}, {name: "default", default: null}]
    }, ut(us, pa, {
        transform(t, e) {
            const r = t.fields, i = t.index, o = t.values, a = null == t.default ? null : t.default, s = t.modified(),
                l = r.length;
            let c, f, h, d = s ? e.SOURCE : e.ADD, p = e, g = t.as;
            return o ? (f = o.length, l > 1 && !g && u('Multi-field lookup requires explicit "as" parameter.'), g && g.length !== l * f && u('The "as" parameter has too few output field names.'), g = g || o.map(n), c = function (t) {
                for (var e, n, u = 0, s = 0; u < l; ++u) if (null == (n = i.get(r[u](t)))) for (e = 0; e < f; ++e, ++s) t[g[s]] = a; else for (e = 0; e < f; ++e, ++s) t[g[s]] = o[e](n)
            }) : (g || u("Missing output field names."), c = function (t) {
                for (var e, n = 0; n < l; ++n) e = i.get(r[n](t)), t[g[n]] = null == e ? a : e
            }), s ? p = e.reflow(!0) : (h = r.some((t => e.modified(t.fields))), d |= h ? e.MOD : 0), e.visit(d, c), p.modifies(g)
        }
    }), ut(ss, Go), ut(cs, Go), ut(hs, pa, {
        transform(t, e) {
            return this.modified(t.modified()), this.value = t, e.fork(e.NO_SOURCE | e.NO_FIELDS)
        }
    }), ds.Definition = {
        type: "Pivot",
        metadata: {generates: !0, changes: !0},
        params: [{name: "groupby", type: "field", array: !0}, {
            name: "field",
            type: "field",
            required: !0
        }, {name: "value", type: "field", required: !0}, {
            name: "op",
            type: "enum",
            values: du,
            default: "sum"
        }, {name: "limit", type: "number", default: 0}, {name: "key", type: "field"}]
    }, ut(ds, ku, {
        _transform: ku.prototype.transform, transform(t, n) {
            return this._transform(function (t, n) {
                const i = t.field, o = t.value, a = ("count" === t.op ? "__count__" : t.op) || "sum",
                    u = r(i).concat(r(o)), s = function (t, e, n) {
                        const r = {}, i = [];
                        return n.visit(n.SOURCE, (e => {
                            const n = t(e);
                            r[n] || (r[n] = 1, i.push(n))
                        })), i.sort(V), e ? i.slice(0, e) : i
                    }(i, t.limit || 0, n);
                n.changed() && t.set("__pivot__", null, null, !0);
                return {
                    key: t.key,
                    groupby: t.groupby,
                    ops: s.map((() => a)),
                    fields: s.map((t => function (t, n, r, i) {
                        return e((e => n(e) === t ? r(e) : NaN), i, t + "")
                    }(t, i, o, u))),
                    as: s.map((t => t + "")),
                    modified: t.modified.bind(t)
                }
            }(t, n), n)
        }
    }), ut(ps, Wu, {
        transform(t, e) {
            const n = t.subflow, i = t.field, o = t => this.subflow(Oo(t), n, e, t);
            return (t.modified("field") || i && e.modified(r(i))) && u("PreFacet does not support field modification."), this.initTargets(), i ? (e.visit(e.MOD, (t => {
                const e = o(t);
                i(t).forEach((t => e.mod(t)))
            })), e.visit(e.ADD, (t => {
                const e = o(t);
                i(t).forEach((t => e.add(Lo(t))))
            })), e.visit(e.REM, (t => {
                const e = o(t);
                i(t).forEach((t => e.rem(t)))
            }))) : (e.visit(e.MOD, (t => o(t).mod(t))), e.visit(e.ADD, (t => o(t).add(t))), e.visit(e.REM, (t => o(t).rem(t)))), e.clean() && e.runAfter((() => this.clean())), e
        }
    }), gs.Definition = {
        type: "Project",
        metadata: {generates: !0, changes: !0},
        params: [{name: "fields", type: "field", array: !0}, {name: "as", type: "string", null: !0, array: !0}]
    }, ut(gs, pa, {
        transform(t, e) {
            const n = e.fork(e.NO_SOURCE), r = t.fields, i = Lu(t.fields, t.as || []),
                o = r ? (t, e) => function (t, e, n, r) {
                    for (let i = 0, o = n.length; i < o; ++i) e[r[i]] = n[i](t);
                    return e
                }(t, e, r, i) : qo;
            let a;
            return this.value ? a = this.value : (e = e.addAll(), a = this.value = {}), e.visit(e.REM, (t => {
                const e = Oo(t);
                n.rem.push(a[e]), a[e] = null
            })), e.visit(e.ADD, (t => {
                const e = o(t, Lo({}));
                a[Oo(t)] = e, n.add.push(e)
            })), e.visit(e.MOD, (t => {
                n.mod.push(o(t, a[Oo(t)]))
            })), n
        }
    }), ut(ms, pa, {
        transform(t, e) {
            return this.value = t.value, t.modified("value") ? e.fork(e.NO_SOURCE | e.NO_FIELDS) : e.StopPropagation
        }
    }), ys.Definition = {
        type: "Quantile",
        metadata: {generates: !0, changes: !0},
        params: [{name: "groupby", type: "field", array: !0}, {
            name: "field",
            type: "field",
            required: !0
        }, {name: "probs", type: "number", array: !0}, {name: "step", type: "number", default: .01}, {
            name: "as",
            type: "string",
            array: !0,
            default: ["prob", "value"]
        }]
    };

    function vs(t) {
        pa.call(this, null, t)
    }

    function _s(t) {
        pa.call(this, [], t), this.count = 0
    }

    function xs(t) {
        pa.call(this, null, t)
    }

    function bs(t) {
        pa.call(this, null, t), this.modified(!0)
    }

    function ws(t) {
        pa.call(this, null, t)
    }

    ut(ys, pa, {
        transform(t, e) {
            const r = e.fork(e.NO_SOURCE | e.NO_FIELDS), i = t.as || ["prob", "value"];
            if (this.value && !t.modified() && !e.changed()) return r.source = this.value, r;
            const o = Uu(e.materialize(e.SOURCE).source, t.groupby, t.field), a = (t.groupby || []).map(n), u = [],
                s = t.step || .01, l = t.probs || Re(s / 2, 1 - 1e-14, s), c = l.length;
            return o.forEach((t => {
                const e = _a(t, l);
                for (let n = 0; n < c; ++n) {
                    const r = {};
                    for (let e = 0; e < a.length; ++e) r[a[e]] = t.dims[e];
                    r[i[0]] = l[n], r[i[1]] = e[n], u.push(Lo(r))
                }
            })), this.value && (r.rem = this.value), this.value = r.add = r.source = u, r
        }
    }), ut(vs, pa, {
        transform(t, e) {
            let n, r;
            return this.value ? r = this.value : (n = e = e.addAll(), r = this.value = {}), t.derive && (n = e.fork(e.NO_SOURCE), e.visit(e.REM, (t => {
                const e = Oo(t);
                n.rem.push(r[e]), r[e] = null
            })), e.visit(e.ADD, (t => {
                const e = Uo(t);
                r[Oo(t)] = e, n.add.push(e)
            })), e.visit(e.MOD, (t => {
                const e = r[Oo(t)];
                for (const r in t) e[r] = t[r], n.modifies(r);
                n.mod.push(e)
            }))), n
        }
    }), _s.Definition = {
        type: "Sample",
        metadata: {},
        params: [{name: "size", type: "number", default: 1e3}]
    }, ut(_s, pa, {
        transform(e, n) {
            const r = n.fork(n.NO_SOURCE), i = e.modified("size"), o = e.size,
                a = this.value.reduce(((t, e) => (t[Oo(e)] = 1, t)), {});
            let u = this.value, s = this.count, l = 0;

            function c(e) {
                let n, i;
                u.length < o ? u.push(e) : (i = ~~((s + 1) * t.random()), i < u.length && i >= l && (n = u[i], a[Oo(n)] && r.rem.push(n), u[i] = e)), ++s
            }

            if (n.rem.length && (n.visit(n.REM, (t => {
                const e = Oo(t);
                a[e] && (a[e] = -1, r.rem.push(t)), --s
            })), u = u.filter((t => -1 !== a[Oo(t)]))), (n.rem.length || i) && u.length < o && n.source && (l = s = u.length, n.visit(n.SOURCE, (t => {
                a[Oo(t)] || c(t)
            })), l = -1), i && u.length > o) {
                const t = u.length - o;
                for (let e = 0; e < t; ++e) a[Oo(u[e])] = -1, r.rem.push(u[e]);
                u = u.slice(t)
            }
            return n.mod.length && n.visit(n.MOD, (t => {
                a[Oo(t)] && r.mod.push(t)
            })), n.add.length && n.visit(n.ADD, c), (n.add.length || l < 0) && (r.add = u.filter((t => !a[Oo(t)]))), this.count = s, this.value = r.source = u, r
        }
    }), xs.Definition = {
        type: "Sequence",
        metadata: {generates: !0, changes: !0},
        params: [{name: "start", type: "number", required: !0}, {
            name: "stop",
            type: "number",
            required: !0
        }, {name: "step", type: "number", default: 1}, {name: "as", type: "string", default: "data"}]
    }, ut(xs, pa, {
        transform(t, e) {
            if (this.value && !t.modified()) return;
            const n = e.materialize().fork(e.MOD), r = t.as || "data";
            return n.rem = this.value ? e.rem.concat(this.value) : e.rem, this.value = Re(t.start, t.stop, t.step || 1).map((t => {
                const e = {};
                return e[r] = t, Lo(e)
            })), n.add = e.add.concat(this.value), n
        }
    }), ut(bs, pa, {
        transform(t, e) {
            return this.value = e.source, e.changed() ? e.fork(e.NO_SOURCE | e.NO_FIELDS) : e.StopPropagation
        }
    });
    const ks = ["unit0", "unit1"];

    function Ms(t) {
        pa.call(this, ot(), t)
    }

    function As(t) {
        pa.call(this, null, t)
    }

    ws.Definition = {
        type: "TimeUnit",
        metadata: {modifies: !0},
        params: [{name: "field", type: "field", required: !0}, {
            name: "interval",
            type: "boolean",
            default: !0
        }, {name: "units", type: "enum", values: In, array: !0}, {
            name: "step",
            type: "number",
            default: 1
        }, {name: "maxbins", type: "number", default: 40}, {name: "extent", type: "date", array: !0}, {
            name: "timezone",
            type: "enum",
            default: "local",
            values: ["local", "utc"]
        }, {name: "as", type: "string", array: !0, length: 2, default: ks}]
    }, ut(ws, pa, {
        transform(t, e) {
            const n = t.field, i = !1 !== t.interval, o = "utc" === t.timezone, a = this._floor(t, e),
                u = (o ? vr : yr)(a.unit).offset, s = t.as || ks, l = s[0], c = s[1], f = a.step;
            let h = a.start || 1 / 0, d = a.stop || -1 / 0, p = e.ADD;
            return (t.modified() || e.modified(r(n))) && (p = (e = e.reflow(!0)).SOURCE, h = 1 / 0, d = -1 / 0), e.visit(p, (t => {
                const e = n(t);
                let r, o;
                null == e ? (t[l] = null, i && (t[c] = null)) : (t[l] = r = o = a(e), i && (t[c] = o = u(r, f)), r < h && (h = r), o > d && (d = o))
            })), a.start = h, a.stop = d, e.modifies(i ? s : l)
        }, _floor(t, e) {
            const n = "utc" === t.timezone, {units: r, step: i} = t.units ? {
                    units: t.units,
                    step: t.step || 1
                } : qr({extent: t.extent || tt(e.materialize(e.SOURCE).source, t.field), maxbins: t.maxbins}), o = Wn(r),
                a = this.value || {}, u = (n ? pr : fr)(o, i);
            return u.unit = M(o), u.units = o, u.step = i, u.start = a.start, u.stop = a.stop, this.value = u
        }
    }), ut(Ms, pa, {
        transform(t, e) {
            const n = e.dataflow, r = t.field, i = this.value, o = t => i.set(r(t), t);
            let a = !0;
            return t.modified("field") || e.modified(r.fields) ? (i.clear(), e.visit(e.SOURCE, o)) : e.changed() ? (e.visit(e.REM, (t => i.delete(r(t)))), e.visit(e.ADD, o)) : a = !1, this.modified(a), i.empty > n.cleanThreshold && n.runAfter(i.clean), e.fork()
        }
    }), ut(As, pa, {
        transform(t, e) {
            (!this.value || t.modified("field") || t.modified("sort") || e.changed() || t.sort && e.modified(t.sort.fields)) && (this.value = (t.sort ? e.source.slice().sort(jo(t.sort)) : e.source).map(t.field))
        }
    });
    const Es = {
        row_number: function () {
            return {next: t => t.index + 1}
        }, rank: function () {
            let t;
            return {
                init: () => t = 1, next: e => {
                    const n = e.index, r = e.data;
                    return n && e.compare(r[n - 1], r[n]) ? t = n + 1 : t
                }
            }
        }, dense_rank: function () {
            let t;
            return {
                init: () => t = 1, next: e => {
                    const n = e.index, r = e.data;
                    return n && e.compare(r[n - 1], r[n]) ? ++t : t
                }
            }
        }, percent_rank: function () {
            const t = Es.rank(), e = t.next;
            return {init: t.init, next: t => (e(t) - 1) / (t.data.length - 1)}
        }, cume_dist: function () {
            let t;
            return {
                init: () => t = 0, next: e => {
                    const n = e.data, r = e.compare;
                    let i = e.index;
                    if (t < i) {
                        for (; i + 1 < n.length && !r(n[i], n[i + 1]);) ++i;
                        t = i
                    }
                    return (1 + t) / n.length
                }
            }
        }, ntile: function (t, e) {
            (e = +e) > 0 || u("ntile num must be greater than zero.");
            const n = Es.cume_dist(), r = n.next;
            return {init: n.init, next: t => Math.ceil(e * r(t))}
        }, lag: function (t, e) {
            return e = +e || 1, {
                next: n => {
                    const r = n.index - e;
                    return r >= 0 ? t(n.data[r]) : null
                }
            }
        }, lead: function (t, e) {
            return e = +e || 1, {
                next: n => {
                    const r = n.index + e, i = n.data;
                    return r < i.length ? t(i[r]) : null
                }
            }
        }, first_value: function (t) {
            return {next: e => t(e.data[e.i0])}
        }, last_value: function (t) {
            return {next: e => t(e.data[e.i1 - 1])}
        }, nth_value: function (t, e) {
            return (e = +e) > 0 || u("nth_value nth must be greater than zero."), {
                next: n => {
                    const r = n.i0 + (e - 1);
                    return r < n.i1 ? t(n.data[r]) : null
                }
            }
        }, prev_value: function (t) {
            let e;
            return {
                init: () => e = null, next: n => {
                    const r = t(n.data[n.index]);
                    return null != r ? e = r : e
                }
            }
        }, next_value: function (t) {
            let e, n;
            return {
                init: () => (e = null, n = -1), next: r => {
                    const i = r.data;
                    return r.index <= n ? e : (n = function (t, e, n) {
                        for (let r = e.length; n < r; ++n) {
                            if (null != t(e[n])) return n
                        }
                        return -1
                    }(t, i, r.index)) < 0 ? (n = i.length, e = null) : e = t(i[n])
                }
            }
        }
    };
    const Ds = Object.keys(Es);

    function Cs(t) {
        const e = $(t.ops), i = $(t.fields), o = $(t.params), a = $(t.as), s = this.outputs = [], l = this.windows = [],
            c = {}, f = {}, d = [], p = [];
        let g = !0;

        function m(t) {
            $(r(t)).forEach((t => c[t] = 1))
        }

        m(t.sort), e.forEach(((t, e) => {
            const r = i[e], c = n(r), y = lu(t, c, a[e]);
            if (m(r), s.push(y), rt(Es, t)) l.push(function (t, e, n, r) {
                const i = Es[t](e, n);
                return {
                    init: i.init || h, update: function (t, e) {
                        e[r] = i.next(t)
                    }
                }
            }(t, i[e], o[e], y)); else {
                if (null == r && "count" !== t && u("Null aggregate field specified."), "count" === t) return void d.push(y);
                g = !1;
                let e = f[c];
                e || (e = f[c] = [], e.field = r, p.push(e)), e.push(pu(t, y))
            }
        })), (d.length || p.length) && (this.cell = function (t, e, n) {
            t = t.map((t => xu(t, t.field)));
            const r = {num: 0, agg: null, store: !1, count: e};
            if (!n) for (var i = t.length, o = r.agg = Array(i), a = 0; a < i; ++a) o[a] = new t[a](r);
            if (r.store) var u = r.data = new bu;
            return r.add = function (t) {
                if (r.num += 1, !n) {
                    u && u.add(t);
                    for (let e = 0; e < i; ++e) o[e].add(o[e].get(t), t)
                }
            }, r.rem = function (t) {
                if (r.num -= 1, !n) {
                    u && u.rem(t);
                    for (let e = 0; e < i; ++e) o[e].rem(o[e].get(t), t)
                }
            }, r.set = function (t) {
                let i, a;
                for (u && u.values(), i = 0, a = e.length; i < a; ++i) t[e[i]] = r.num;
                if (!n) for (i = 0, a = o.length; i < a; ++i) o[i].set(t)
            }, r.init = function () {
                r.num = 0, u && u.reset();
                for (let t = 0; t < i; ++t) o[t].init()
            }, r
        }(p, d, g)), this.inputs = Object.keys(c)
    }

    const Fs = Cs.prototype;

    function Ss(t) {
        pa.call(this, {}, t), this._mlen = 0, this._mods = []
    }

    function Bs(t, e, n, r) {
        const i = r.sort, o = i && !r.ignorePeers, a = r.frame || [null, 0], u = t.data(n), s = u.length,
            l = o ? me(i) : null, c = {i0: 0, i1: 0, p0: 0, p1: 0, index: 0, data: u, compare: i || Z(-1)};
        e.init();
        for (let t = 0; t < s; ++t) Ts(c, a, t, s), o && zs(c, l), e.update(c, u[t])
    }

    function Ts(t, e, n, r) {
        t.p0 = t.i0, t.p1 = t.i1, t.i0 = null == e[0] ? 0 : Math.max(0, n - Math.abs(e[0])), t.i1 = null == e[1] ? r : Math.min(r, n + Math.abs(e[1]) + 1), t.index = n
    }

    function zs(t, e) {
        const n = t.i0, r = t.i1 - 1, i = t.compare, o = t.data, a = o.length - 1;
        n > 0 && !i(o[n], o[n - 1]) && (t.i0 = e.left(o, o[n])), r < a && !i(o[r], o[r + 1]) && (t.i1 = e.right(o, o[r]))
    }

    Fs.init = function () {
        this.windows.forEach((t => t.init())), this.cell && this.cell.init()
    }, Fs.update = function (t, e) {
        const n = this.cell, r = this.windows, i = t.data, o = r && r.length;
        let a;
        if (n) {
            for (a = t.p0; a < t.i0; ++a) n.rem(i[a]);
            for (a = t.p1; a < t.i1; ++a) n.add(i[a]);
            n.set(e)
        }
        for (a = 0; a < o; ++a) r[a].update(t, e)
    }, Ss.Definition = {
        type: "Window",
        metadata: {modifies: !0},
        params: [{name: "sort", type: "compare"}, {name: "groupby", type: "field", array: !0}, {
            name: "ops",
            type: "enum",
            array: !0,
            values: Ds.concat(du)
        }, {name: "params", type: "number", null: !0, array: !0}, {
            name: "fields",
            type: "field",
            null: !0,
            array: !0
        }, {name: "as", type: "string", null: !0, array: !0}, {
            name: "frame",
            type: "number",
            null: !0,
            array: !0,
            length: 2,
            default: [null, 0]
        }, {name: "ignorePeers", type: "boolean", default: !1}]
    }, ut(Ss, pa, {
        transform(t, e) {
            this.stamp = e.stamp;
            const n = t.modified(), r = jo(t.sort), i = su(t.groupby), o = t => this.group(i(t));
            let a = this.state;
            a && !n || (a = this.state = new Cs(t)), n || e.modified(a.inputs) ? (this.value = {}, e.visit(e.SOURCE, (t => o(t).add(t)))) : (e.visit(e.REM, (t => o(t).remove(t))), e.visit(e.ADD, (t => o(t).add(t))));
            for (let e = 0, n = this._mlen; e < n; ++e) Bs(this._mods[e], a, r, t);
            return this._mlen = 0, this._mods = [], e.reflow(n).modifies(a.outputs)
        }, group(t) {
            let e = this.value[t];
            return e || (e = this.value[t] = Au(Oo), e.stamp = -1), e.stamp < this.stamp && (e.stamp = this.stamp, this._mods[this._mlen++] = e), e
        }
    });
    var Ns = Object.freeze({
        __proto__: null,
        aggregate: ku,
        bin: Mu,
        collect: Eu,
        compare: Du,
        countpattern: Fu,
        cross: Su,
        density: Nu,
        dotbin: qu,
        expression: Pu,
        extent: Iu,
        facet: Wu,
        field: Hu,
        filter: Vu,
        flatten: Gu,
        fold: Xu,
        formula: Ju,
        generate: Zu,
        impute: ts,
        joinaggregate: es,
        kde: ns,
        key: rs,
        load: os,
        lookup: us,
        multiextent: ss,
        multivalues: cs,
        params: hs,
        pivot: ds,
        prefacet: ps,
        project: gs,
        proxy: ms,
        quantile: ys,
        relay: vs,
        sample: _s,
        sequence: xs,
        sieve: bs,
        subflow: $u,
        timeunit: ws,
        tupleindex: Ms,
        values: As,
        window: Ss
    });
    const Os = Math.PI, Rs = 2 * Os, Ls = 1e-6, Us = Rs - Ls;

    function qs() {
        this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = ""
    }

    function Ps() {
        return new qs
    }

    function js(t) {
        return function () {
            return t
        }
    }

    qs.prototype = Ps.prototype = {
        constructor: qs, moveTo: function (t, e) {
            this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +e)
        }, closePath: function () {
            null !== this._x1 && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z")
        }, lineTo: function (t, e) {
            this._ += "L" + (this._x1 = +t) + "," + (this._y1 = +e)
        }, quadraticCurveTo: function (t, e, n, r) {
            this._ += "Q" + +t + "," + +e + "," + (this._x1 = +n) + "," + (this._y1 = +r)
        }, bezierCurveTo: function (t, e, n, r, i, o) {
            this._ += "C" + +t + "," + +e + "," + +n + "," + +r + "," + (this._x1 = +i) + "," + (this._y1 = +o)
        }, arcTo: function (t, e, n, r, i) {
            t = +t, e = +e, n = +n, r = +r, i = +i;
            var o = this._x1, a = this._y1, u = n - t, s = r - e, l = o - t, c = a - e, f = l * l + c * c;
            if (i < 0) throw new Error("negative radius: " + i);
            if (null === this._x1) this._ += "M" + (this._x1 = t) + "," + (this._y1 = e); else if (f > Ls) if (Math.abs(c * u - s * l) > Ls && i) {
                var h = n - o, d = r - a, p = u * u + s * s, g = h * h + d * d, m = Math.sqrt(p), y = Math.sqrt(f),
                    v = i * Math.tan((Os - Math.acos((p + f - g) / (2 * m * y))) / 2), _ = v / y, x = v / m;
                Math.abs(_ - 1) > Ls && (this._ += "L" + (t + _ * l) + "," + (e + _ * c)), this._ += "A" + i + "," + i + ",0,0," + +(c * h > l * d) + "," + (this._x1 = t + x * u) + "," + (this._y1 = e + x * s)
            } else this._ += "L" + (this._x1 = t) + "," + (this._y1 = e); else ;
        }, arc: function (t, e, n, r, i, o) {
            t = +t, e = +e, o = !!o;
            var a = (n = +n) * Math.cos(r), u = n * Math.sin(r), s = t + a, l = e + u, c = 1 ^ o, f = o ? r - i : i - r;
            if (n < 0) throw new Error("negative radius: " + n);
            null === this._x1 ? this._ += "M" + s + "," + l : (Math.abs(this._x1 - s) > Ls || Math.abs(this._y1 - l) > Ls) && (this._ += "L" + s + "," + l), n && (f < 0 && (f = f % Rs + Rs), f > Us ? this._ += "A" + n + "," + n + ",0,1," + c + "," + (t - a) + "," + (e - u) + "A" + n + "," + n + ",0,1," + c + "," + (this._x1 = s) + "," + (this._y1 = l) : f > Ls && (this._ += "A" + n + "," + n + ",0," + +(f >= Os) + "," + c + "," + (this._x1 = t + n * Math.cos(i)) + "," + (this._y1 = e + n * Math.sin(i))))
        }, rect: function (t, e, n, r) {
            this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +e) + "h" + +n + "v" + +r + "h" + -n + "Z"
        }, toString: function () {
            return this._
        }
    };
    var Is = Math.abs, $s = Math.atan2, Ws = Math.cos, Hs = Math.max, Ys = Math.min, Vs = Math.sin, Gs = Math.sqrt,
        Xs = 1e-12, Js = Math.PI, Zs = Js / 2, Qs = 2 * Js;

    function Ks(t) {
        return t > 1 ? 0 : t < -1 ? Js : Math.acos(t)
    }

    function tl(t) {
        return t >= 1 ? Zs : t <= -1 ? -Zs : Math.asin(t)
    }

    function el(t) {
        return t.innerRadius
    }

    function nl(t) {
        return t.outerRadius
    }

    function rl(t) {
        return t.startAngle
    }

    function il(t) {
        return t.endAngle
    }

    function ol(t) {
        return t && t.padAngle
    }

    function al(t, e, n, r, i, o, a, u) {
        var s = n - t, l = r - e, c = a - i, f = u - o, h = f * s - c * l;
        if (!(h * h < Xs)) return [t + (h = (c * (e - o) - f * (t - i)) / h) * s, e + h * l]
    }

    function ul(t, e, n, r, i, o, a) {
        var u = t - n, s = e - r, l = (a ? o : -o) / Gs(u * u + s * s), c = l * s, f = -l * u, h = t + c, d = e + f,
            p = n + c, g = r + f, m = (h + p) / 2, y = (d + g) / 2, v = p - h, _ = g - d, x = v * v + _ * _, b = i - o,
            w = h * g - p * d, k = (_ < 0 ? -1 : 1) * Gs(Hs(0, b * b * x - w * w)), M = (w * _ - v * k) / x,
            A = (-w * v - _ * k) / x, E = (w * _ + v * k) / x, D = (-w * v + _ * k) / x, C = M - m, F = A - y,
            S = E - m, B = D - y;
        return C * C + F * F > S * S + B * B && (M = E, A = D), {
            cx: M,
            cy: A,
            x01: -c,
            y01: -f,
            x11: M * (i / b - 1),
            y11: A * (i / b - 1)
        }
    }

    function sl(t) {
        return "object" == typeof t && "length" in t ? t : Array.from(t)
    }

    function ll(t) {
        this._context = t
    }

    function cl(t) {
        return new ll(t)
    }

    function fl(t) {
        return t[0]
    }

    function hl(t) {
        return t[1]
    }

    function dl(t, e) {
        var n = js(!0), r = null, i = cl, o = null;

        function a(a) {
            var u, s, l, c = (a = sl(a)).length, f = !1;
            for (null == r && (o = i(l = Ps())), u = 0; u <= c; ++u) !(u < c && n(s = a[u], u, a)) === f && ((f = !f) ? o.lineStart() : o.lineEnd()), f && o.point(+t(s, u, a), +e(s, u, a));
            if (l) return o = null, l + "" || null
        }

        return t = "function" == typeof t ? t : void 0 === t ? fl : js(t), e = "function" == typeof e ? e : void 0 === e ? hl : js(e), a.x = function (e) {
            return arguments.length ? (t = "function" == typeof e ? e : js(+e), a) : t
        }, a.y = function (t) {
            return arguments.length ? (e = "function" == typeof t ? t : js(+t), a) : e
        }, a.defined = function (t) {
            return arguments.length ? (n = "function" == typeof t ? t : js(!!t), a) : n
        }, a.curve = function (t) {
            return arguments.length ? (i = t, null != r && (o = i(r)), a) : i
        }, a.context = function (t) {
            return arguments.length ? (null == t ? r = o = null : o = i(r = t), a) : r
        }, a
    }

    function pl(t, e, n) {
        var r = null, i = js(!0), o = null, a = cl, u = null;

        function s(s) {
            var l, c, f, h, d, p = (s = sl(s)).length, g = !1, m = new Array(p), y = new Array(p);
            for (null == o && (u = a(d = Ps())), l = 0; l <= p; ++l) {
                if (!(l < p && i(h = s[l], l, s)) === g) if (g = !g) c = l, u.areaStart(), u.lineStart(); else {
                    for (u.lineEnd(), u.lineStart(), f = l - 1; f >= c; --f) u.point(m[f], y[f]);
                    u.lineEnd(), u.areaEnd()
                }
                g && (m[l] = +t(h, l, s), y[l] = +e(h, l, s), u.point(r ? +r(h, l, s) : m[l], n ? +n(h, l, s) : y[l]))
            }
            if (d) return u = null, d + "" || null
        }

        function l() {
            return dl().defined(i).curve(a).context(o)
        }

        return t = "function" == typeof t ? t : void 0 === t ? fl : js(+t), e = "function" == typeof e ? e : js(void 0 === e ? 0 : +e), n = "function" == typeof n ? n : void 0 === n ? hl : js(+n), s.x = function (e) {
            return arguments.length ? (t = "function" == typeof e ? e : js(+e), r = null, s) : t
        }, s.x0 = function (e) {
            return arguments.length ? (t = "function" == typeof e ? e : js(+e), s) : t
        }, s.x1 = function (t) {
            return arguments.length ? (r = null == t ? null : "function" == typeof t ? t : js(+t), s) : r
        }, s.y = function (t) {
            return arguments.length ? (e = "function" == typeof t ? t : js(+t), n = null, s) : e
        }, s.y0 = function (t) {
            return arguments.length ? (e = "function" == typeof t ? t : js(+t), s) : e
        }, s.y1 = function (t) {
            return arguments.length ? (n = null == t ? null : "function" == typeof t ? t : js(+t), s) : n
        }, s.lineX0 = s.lineY0 = function () {
            return l().x(t).y(e)
        }, s.lineY1 = function () {
            return l().x(t).y(n)
        }, s.lineX1 = function () {
            return l().x(r).y(e)
        }, s.defined = function (t) {
            return arguments.length ? (i = "function" == typeof t ? t : js(!!t), s) : i
        }, s.curve = function (t) {
            return arguments.length ? (a = t, null != o && (u = a(o)), s) : a
        }, s.context = function (t) {
            return arguments.length ? (null == t ? o = u = null : u = a(o = t), s) : o
        }, s
    }

    ll.prototype = {
        areaStart: function () {
            this._line = 0
        }, areaEnd: function () {
            this._line = NaN
        }, lineStart: function () {
            this._point = 0
        }, lineEnd: function () {
            (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line
        }, point: function (t, e) {
            switch (t = +t, e = +e, this._point) {
                case 0:
                    this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
                    break;
                case 1:
                    this._point = 2;
                default:
                    this._context.lineTo(t, e)
            }
        }
    };
    var gl = {
        draw: function (t, e) {
            var n = Math.sqrt(e / Js);
            t.moveTo(n, 0), t.arc(0, 0, n, 0, Qs)
        }
    };

    function ml() {
    }

    function yl(t, e, n) {
        t._context.bezierCurveTo((2 * t._x0 + t._x1) / 3, (2 * t._y0 + t._y1) / 3, (t._x0 + 2 * t._x1) / 3, (t._y0 + 2 * t._y1) / 3, (t._x0 + 4 * t._x1 + e) / 6, (t._y0 + 4 * t._y1 + n) / 6)
    }

    function vl(t) {
        this._context = t
    }

    function _l(t) {
        this._context = t
    }

    function xl(t) {
        this._context = t
    }

    function bl(t, e) {
        this._basis = new vl(t), this._beta = e
    }

    vl.prototype = {
        areaStart: function () {
            this._line = 0
        }, areaEnd: function () {
            this._line = NaN
        }, lineStart: function () {
            this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0
        }, lineEnd: function () {
            switch (this._point) {
                case 3:
                    yl(this, this._x1, this._y1);
                case 2:
                    this._context.lineTo(this._x1, this._y1)
            }
            (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line
        }, point: function (t, e) {
            switch (t = +t, e = +e, this._point) {
                case 0:
                    this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
                    break;
                case 1:
                    this._point = 2;
                    break;
                case 2:
                    this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
                default:
                    yl(this, t, e)
            }
            this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e
        }
    }, _l.prototype = {
        areaStart: ml, areaEnd: ml, lineStart: function () {
            this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0
        }, lineEnd: function () {
            switch (this._point) {
                case 1:
                    this._context.moveTo(this._x2, this._y2), this._context.closePath();
                    break;
                case 2:
                    this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
                    break;
                case 3:
                    this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4)
            }
        }, point: function (t, e) {
            switch (t = +t, e = +e, this._point) {
                case 0:
                    this._point = 1, this._x2 = t, this._y2 = e;
                    break;
                case 1:
                    this._point = 2, this._x3 = t, this._y3 = e;
                    break;
                case 2:
                    this._point = 3, this._x4 = t, this._y4 = e, this._context.moveTo((this._x0 + 4 * this._x1 + t) / 6, (this._y0 + 4 * this._y1 + e) / 6);
                    break;
                default:
                    yl(this, t, e)
            }
            this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e
        }
    }, xl.prototype = {
        areaStart: function () {
            this._line = 0
        }, areaEnd: function () {
            this._line = NaN
        }, lineStart: function () {
            this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0
        }, lineEnd: function () {
            (this._line || 0 !== this._line && 3 === this._point) && this._context.closePath(), this._line = 1 - this._line
        }, point: function (t, e) {
            switch (t = +t, e = +e, this._point) {
                case 0:
                    this._point = 1;
                    break;
                case 1:
                    this._point = 2;
                    break;
                case 2:
                    this._point = 3;
                    var n = (this._x0 + 4 * this._x1 + t) / 6, r = (this._y0 + 4 * this._y1 + e) / 6;
                    this._line ? this._context.lineTo(n, r) : this._context.moveTo(n, r);
                    break;
                case 3:
                    this._point = 4;
                default:
                    yl(this, t, e)
            }
            this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e
        }
    }, bl.prototype = {
        lineStart: function () {
            this._x = [], this._y = [], this._basis.lineStart()
        }, lineEnd: function () {
            var t = this._x, e = this._y, n = t.length - 1;
            if (n > 0) for (var r, i = t[0], o = e[0], a = t[n] - i, u = e[n] - o, s = -1; ++s <= n;) r = s / n, this._basis.point(this._beta * t[s] + (1 - this._beta) * (i + r * a), this._beta * e[s] + (1 - this._beta) * (o + r * u));
            this._x = this._y = null, this._basis.lineEnd()
        }, point: function (t, e) {
            this._x.push(+t), this._y.push(+e)
        }
    };
    var wl = function t(e) {
        function n(t) {
            return 1 === e ? new vl(t) : new bl(t, e)
        }

        return n.beta = function (e) {
            return t(+e)
        }, n
    }(.85);

    function kl(t, e, n) {
        t._context.bezierCurveTo(t._x1 + t._k * (t._x2 - t._x0), t._y1 + t._k * (t._y2 - t._y0), t._x2 + t._k * (t._x1 - e), t._y2 + t._k * (t._y1 - n), t._x2, t._y2)
    }

    function Ml(t, e) {
        this._context = t, this._k = (1 - e) / 6
    }

    Ml.prototype = {
        areaStart: function () {
            this._line = 0
        }, areaEnd: function () {
            this._line = NaN
        }, lineStart: function () {
            this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0
        }, lineEnd: function () {
            switch (this._point) {
                case 2:
                    this._context.lineTo(this._x2, this._y2);
                    break;
                case 3:
                    kl(this, this._x1, this._y1)
            }
            (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line
        }, point: function (t, e) {
            switch (t = +t, e = +e, this._point) {
                case 0:
                    this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
                    break;
                case 1:
                    this._point = 2, this._x1 = t, this._y1 = e;
                    break;
                case 2:
                    this._point = 3;
                default:
                    kl(this, t, e)
            }
            this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e
        }
    };
    var Al = function t(e) {
        function n(t) {
            return new Ml(t, e)
        }

        return n.tension = function (e) {
            return t(+e)
        }, n
    }(0);

    function El(t, e) {
        this._context = t, this._k = (1 - e) / 6
    }

    El.prototype = {
        areaStart: ml, areaEnd: ml, lineStart: function () {
            this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._point = 0
        }, lineEnd: function () {
            switch (this._point) {
                case 1:
                    this._context.moveTo(this._x3, this._y3), this._context.closePath();
                    break;
                case 2:
                    this._context.lineTo(this._x3, this._y3), this._context.closePath();
                    break;
                case 3:
                    this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5)
            }
        }, point: function (t, e) {
            switch (t = +t, e = +e, this._point) {
                case 0:
                    this._point = 1, this._x3 = t, this._y3 = e;
                    break;
                case 1:
                    this._point = 2, this._context.moveTo(this._x4 = t, this._y4 = e);
                    break;
                case 2:
                    this._point = 3, this._x5 = t, this._y5 = e;
                    break;
                default:
                    kl(this, t, e)
            }
            this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e
        }
    };
    var Dl = function t(e) {
        function n(t) {
            return new El(t, e)
        }

        return n.tension = function (e) {
            return t(+e)
        }, n
    }(0);

    function Cl(t, e) {
        this._context = t, this._k = (1 - e) / 6
    }

    Cl.prototype = {
        areaStart: function () {
            this._line = 0
        }, areaEnd: function () {
            this._line = NaN
        }, lineStart: function () {
            this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0
        }, lineEnd: function () {
            (this._line || 0 !== this._line && 3 === this._point) && this._context.closePath(), this._line = 1 - this._line
        }, point: function (t, e) {
            switch (t = +t, e = +e, this._point) {
                case 0:
                    this._point = 1;
                    break;
                case 1:
                    this._point = 2;
                    break;
                case 2:
                    this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
                    break;
                case 3:
                    this._point = 4;
                default:
                    kl(this, t, e)
            }
            this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e
        }
    };
    var Fl = function t(e) {
        function n(t) {
            return new Cl(t, e)
        }

        return n.tension = function (e) {
            return t(+e)
        }, n
    }(0);

    function Sl(t, e, n) {
        var r = t._x1, i = t._y1, o = t._x2, a = t._y2;
        if (t._l01_a > Xs) {
            var u = 2 * t._l01_2a + 3 * t._l01_a * t._l12_a + t._l12_2a, s = 3 * t._l01_a * (t._l01_a + t._l12_a);
            r = (r * u - t._x0 * t._l12_2a + t._x2 * t._l01_2a) / s, i = (i * u - t._y0 * t._l12_2a + t._y2 * t._l01_2a) / s
        }
        if (t._l23_a > Xs) {
            var l = 2 * t._l23_2a + 3 * t._l23_a * t._l12_a + t._l12_2a, c = 3 * t._l23_a * (t._l23_a + t._l12_a);
            o = (o * l + t._x1 * t._l23_2a - e * t._l12_2a) / c, a = (a * l + t._y1 * t._l23_2a - n * t._l12_2a) / c
        }
        t._context.bezierCurveTo(r, i, o, a, t._x2, t._y2)
    }

    function Bl(t, e) {
        this._context = t, this._alpha = e
    }

    Bl.prototype = {
        areaStart: function () {
            this._line = 0
        }, areaEnd: function () {
            this._line = NaN
        }, lineStart: function () {
            this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0
        }, lineEnd: function () {
            switch (this._point) {
                case 2:
                    this._context.lineTo(this._x2, this._y2);
                    break;
                case 3:
                    this.point(this._x2, this._y2)
            }
            (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line
        }, point: function (t, e) {
            if (t = +t, e = +e, this._point) {
                var n = this._x2 - t, r = this._y2 - e;
                this._l23_a = Math.sqrt(this._l23_2a = Math.pow(n * n + r * r, this._alpha))
            }
            switch (this._point) {
                case 0:
                    this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
                    break;
                case 1:
                    this._point = 2;
                    break;
                case 2:
                    this._point = 3;
                default:
                    Sl(this, t, e)
            }
            this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e
        }
    };
    var Tl = function t(e) {
        function n(t) {
            return e ? new Bl(t, e) : new Ml(t, 0)
        }

        return n.alpha = function (e) {
            return t(+e)
        }, n
    }(.5);

    function zl(t, e) {
        this._context = t, this._alpha = e
    }

    zl.prototype = {
        areaStart: ml, areaEnd: ml, lineStart: function () {
            this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0
        }, lineEnd: function () {
            switch (this._point) {
                case 1:
                    this._context.moveTo(this._x3, this._y3), this._context.closePath();
                    break;
                case 2:
                    this._context.lineTo(this._x3, this._y3), this._context.closePath();
                    break;
                case 3:
                    this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5)
            }
        }, point: function (t, e) {
            if (t = +t, e = +e, this._point) {
                var n = this._x2 - t, r = this._y2 - e;
                this._l23_a = Math.sqrt(this._l23_2a = Math.pow(n * n + r * r, this._alpha))
            }
            switch (this._point) {
                case 0:
                    this._point = 1, this._x3 = t, this._y3 = e;
                    break;
                case 1:
                    this._point = 2, this._context.moveTo(this._x4 = t, this._y4 = e);
                    break;
                case 2:
                    this._point = 3, this._x5 = t, this._y5 = e;
                    break;
                default:
                    Sl(this, t, e)
            }
            this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e
        }
    };
    var Nl = function t(e) {
        function n(t) {
            return e ? new zl(t, e) : new El(t, 0)
        }

        return n.alpha = function (e) {
            return t(+e)
        }, n
    }(.5);

    function Ol(t, e) {
        this._context = t, this._alpha = e
    }

    Ol.prototype = {
        areaStart: function () {
            this._line = 0
        }, areaEnd: function () {
            this._line = NaN
        }, lineStart: function () {
            this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0
        }, lineEnd: function () {
            (this._line || 0 !== this._line && 3 === this._point) && this._context.closePath(), this._line = 1 - this._line
        }, point: function (t, e) {
            if (t = +t, e = +e, this._point) {
                var n = this._x2 - t, r = this._y2 - e;
                this._l23_a = Math.sqrt(this._l23_2a = Math.pow(n * n + r * r, this._alpha))
            }
            switch (this._point) {
                case 0:
                    this._point = 1;
                    break;
                case 1:
                    this._point = 2;
                    break;
                case 2:
                    this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
                    break;
                case 3:
                    this._point = 4;
                default:
                    Sl(this, t, e)
            }
            this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = e
        }
    };
    var Rl = function t(e) {
        function n(t) {
            return e ? new Ol(t, e) : new Cl(t, 0)
        }

        return n.alpha = function (e) {
            return t(+e)
        }, n
    }(.5);

    function Ll(t) {
        this._context = t
    }

    function Ul(t) {
        return t < 0 ? -1 : 1
    }

    function ql(t, e, n) {
        var r = t._x1 - t._x0, i = e - t._x1, o = (t._y1 - t._y0) / (r || i < 0 && -0),
            a = (n - t._y1) / (i || r < 0 && -0), u = (o * i + a * r) / (r + i);
        return (Ul(o) + Ul(a)) * Math.min(Math.abs(o), Math.abs(a), .5 * Math.abs(u)) || 0
    }

    function Pl(t, e) {
        var n = t._x1 - t._x0;
        return n ? (3 * (t._y1 - t._y0) / n - e) / 2 : e
    }

    function jl(t, e, n) {
        var r = t._x0, i = t._y0, o = t._x1, a = t._y1, u = (o - r) / 3;
        t._context.bezierCurveTo(r + u, i + u * e, o - u, a - u * n, o, a)
    }

    function Il(t) {
        this._context = t
    }

    function $l(t) {
        this._context = new Wl(t)
    }

    function Wl(t) {
        this._context = t
    }

    function Hl(t) {
        this._context = t
    }

    function Yl(t) {
        var e, n, r = t.length - 1, i = new Array(r), o = new Array(r), a = new Array(r);
        for (i[0] = 0, o[0] = 2, a[0] = t[0] + 2 * t[1], e = 1; e < r - 1; ++e) i[e] = 1, o[e] = 4, a[e] = 4 * t[e] + 2 * t[e + 1];
        for (i[r - 1] = 2, o[r - 1] = 7, a[r - 1] = 8 * t[r - 1] + t[r], e = 1; e < r; ++e) n = i[e] / o[e - 1], o[e] -= n, a[e] -= n * a[e - 1];
        for (i[r - 1] = a[r - 1] / o[r - 1], e = r - 2; e >= 0; --e) i[e] = (a[e] - i[e + 1]) / o[e];
        for (o[r - 1] = (t[r] + i[r - 1]) / 2, e = 0; e < r - 1; ++e) o[e] = 2 * t[e + 1] - i[e + 1];
        return [i, o]
    }

    function Vl(t, e) {
        this._context = t, this._t = e
    }

    function Gl(t, e) {
        if ("undefined" != typeof document && document.createElement) {
            const n = document.createElement("canvas");
            if (n && n.getContext) return n.width = t, n.height = e, n
        }
        return null
    }

    Ll.prototype = {
        areaStart: ml, areaEnd: ml, lineStart: function () {
            this._point = 0
        }, lineEnd: function () {
            this._point && this._context.closePath()
        }, point: function (t, e) {
            t = +t, e = +e, this._point ? this._context.lineTo(t, e) : (this._point = 1, this._context.moveTo(t, e))
        }
    }, Il.prototype = {
        areaStart: function () {
            this._line = 0
        }, areaEnd: function () {
            this._line = NaN
        }, lineStart: function () {
            this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0
        }, lineEnd: function () {
            switch (this._point) {
                case 2:
                    this._context.lineTo(this._x1, this._y1);
                    break;
                case 3:
                    jl(this, this._t0, Pl(this, this._t0))
            }
            (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line
        }, point: function (t, e) {
            var n = NaN;
            if (e = +e, (t = +t) !== this._x1 || e !== this._y1) {
                switch (this._point) {
                    case 0:
                        this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
                        break;
                    case 1:
                        this._point = 2;
                        break;
                    case 2:
                        this._point = 3, jl(this, Pl(this, n = ql(this, t, e)), n);
                        break;
                    default:
                        jl(this, this._t0, n = ql(this, t, e))
                }
                this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e, this._t0 = n
            }
        }
    }, ($l.prototype = Object.create(Il.prototype)).point = function (t, e) {
        Il.prototype.point.call(this, e, t)
    }, Wl.prototype = {
        moveTo: function (t, e) {
            this._context.moveTo(e, t)
        }, closePath: function () {
            this._context.closePath()
        }, lineTo: function (t, e) {
            this._context.lineTo(e, t)
        }, bezierCurveTo: function (t, e, n, r, i, o) {
            this._context.bezierCurveTo(e, t, r, n, o, i)
        }
    }, Hl.prototype = {
        areaStart: function () {
            this._line = 0
        }, areaEnd: function () {
            this._line = NaN
        }, lineStart: function () {
            this._x = [], this._y = []
        }, lineEnd: function () {
            var t = this._x, e = this._y, n = t.length;
            if (n) if (this._line ? this._context.lineTo(t[0], e[0]) : this._context.moveTo(t[0], e[0]), 2 === n) this._context.lineTo(t[1], e[1]); else for (var r = Yl(t), i = Yl(e), o = 0, a = 1; a < n; ++o, ++a) this._context.bezierCurveTo(r[0][o], i[0][o], r[1][o], i[1][o], t[a], e[a]);
            (this._line || 0 !== this._line && 1 === n) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null
        }, point: function (t, e) {
            this._x.push(+t), this._y.push(+e)
        }
    }, Vl.prototype = {
        areaStart: function () {
            this._line = 0
        }, areaEnd: function () {
            this._line = NaN
        }, lineStart: function () {
            this._x = this._y = NaN, this._point = 0
        }, lineEnd: function () {
            0 < this._t && this._t < 1 && 2 === this._point && this._context.lineTo(this._x, this._y), (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line)
        }, point: function (t, e) {
            switch (t = +t, e = +e, this._point) {
                case 0:
                    this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
                    break;
                case 1:
                    this._point = 2;
                default:
                    if (this._t <= 0) this._context.lineTo(this._x, e), this._context.lineTo(t, e); else {
                        var n = this._x * (1 - this._t) + t * this._t;
                        this._context.lineTo(n, this._y), this._context.lineTo(n, e)
                    }
            }
            this._x = t, this._y = e
        }
    };
    const Xl = () => "undefined" != typeof Image ? Image : null;

    function Jl(t, e) {
        switch (arguments.length) {
            case 0:
                break;
            case 1:
                this.range(t);
                break;
            default:
                this.range(e).domain(t)
        }
        return this
    }

    function Zl(t, e) {
        switch (arguments.length) {
            case 0:
                break;
            case 1:
                "function" == typeof t ? this.interpolator(t) : this.range(t);
                break;
            default:
                this.domain(t), "function" == typeof e ? this.interpolator(e) : this.range(e)
        }
        return this
    }

    const Ql = Symbol("implicit");

    function Kl() {
        var t = new Map, e = [], n = [], r = Ql;

        function i(i) {
            var o = i + "", a = t.get(o);
            if (!a) {
                if (r !== Ql) return r;
                t.set(o, a = e.push(i))
            }
            return n[(a - 1) % n.length]
        }

        return i.domain = function (n) {
            if (!arguments.length) return e.slice();
            e = [], t = new Map;
            for (const r of n) {
                const n = r + "";
                t.has(n) || t.set(n, e.push(r))
            }
            return i
        }, i.range = function (t) {
            return arguments.length ? (n = Array.from(t), i) : n.slice()
        }, i.unknown = function (t) {
            return arguments.length ? (r = t, i) : r
        }, i.copy = function () {
            return Kl(e, n).unknown(r)
        }, Jl.apply(i, arguments), i
    }

    function tc(t, e, n) {
        t.prototype = e.prototype = n, n.constructor = t
    }

    function ec(t, e) {
        var n = Object.create(t.prototype);
        for (var r in e) n[r] = e[r];
        return n
    }

    function nc() {
    }

    var rc = .7, ic = 1 / rc, oc = "\\s*([+-]?\\d+)\\s*", ac = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
        uc = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*", sc = /^#([0-9a-f]{3,8})$/,
        lc = new RegExp("^rgb\\(" + [oc, oc, oc] + "\\)$"), cc = new RegExp("^rgb\\(" + [uc, uc, uc] + "\\)$"),
        fc = new RegExp("^rgba\\(" + [oc, oc, oc, ac] + "\\)$"),
        hc = new RegExp("^rgba\\(" + [uc, uc, uc, ac] + "\\)$"), dc = new RegExp("^hsl\\(" + [ac, uc, uc] + "\\)$"),
        pc = new RegExp("^hsla\\(" + [ac, uc, uc, ac] + "\\)$"), gc = {
            aliceblue: 15792383,
            antiquewhite: 16444375,
            aqua: 65535,
            aquamarine: 8388564,
            azure: 15794175,
            beige: 16119260,
            bisque: 16770244,
            black: 0,
            blanchedalmond: 16772045,
            blue: 255,
            blueviolet: 9055202,
            brown: 10824234,
            burlywood: 14596231,
            cadetblue: 6266528,
            chartreuse: 8388352,
            chocolate: 13789470,
            coral: 16744272,
            cornflowerblue: 6591981,
            cornsilk: 16775388,
            crimson: 14423100,
            cyan: 65535,
            darkblue: 139,
            darkcyan: 35723,
            darkgoldenrod: 12092939,
            darkgray: 11119017,
            darkgreen: 25600,
            darkgrey: 11119017,
            darkkhaki: 12433259,
            darkmagenta: 9109643,
            darkolivegreen: 5597999,
            darkorange: 16747520,
            darkorchid: 10040012,
            darkred: 9109504,
            darksalmon: 15308410,
            darkseagreen: 9419919,
            darkslateblue: 4734347,
            darkslategray: 3100495,
            darkslategrey: 3100495,
            darkturquoise: 52945,
            darkviolet: 9699539,
            deeppink: 16716947,
            deepskyblue: 49151,
            dimgray: 6908265,
            dimgrey: 6908265,
            dodgerblue: 2003199,
            firebrick: 11674146,
            floralwhite: 16775920,
            forestgreen: 2263842,
            fuchsia: 16711935,
            gainsboro: 14474460,
            ghostwhite: 16316671,
            gold: 16766720,
            goldenrod: 14329120,
            gray: 8421504,
            green: 32768,
            greenyellow: 11403055,
            grey: 8421504,
            honeydew: 15794160,
            hotpink: 16738740,
            indianred: 13458524,
            indigo: 4915330,
            ivory: 16777200,
            khaki: 15787660,
            lavender: 15132410,
            lavenderblush: 16773365,
            lawngreen: 8190976,
            lemonchiffon: 16775885,
            lightblue: 11393254,
            lightcoral: 15761536,
            lightcyan: 14745599,
            lightgoldenrodyellow: 16448210,
            lightgray: 13882323,
            lightgreen: 9498256,
            lightgrey: 13882323,
            lightpink: 16758465,
            lightsalmon: 16752762,
            lightseagreen: 2142890,
            lightskyblue: 8900346,
            lightslategray: 7833753,
            lightslategrey: 7833753,
            lightsteelblue: 11584734,
            lightyellow: 16777184,
            lime: 65280,
            limegreen: 3329330,
            linen: 16445670,
            magenta: 16711935,
            maroon: 8388608,
            mediumaquamarine: 6737322,
            mediumblue: 205,
            mediumorchid: 12211667,
            mediumpurple: 9662683,
            mediumseagreen: 3978097,
            mediumslateblue: 8087790,
            mediumspringgreen: 64154,
            mediumturquoise: 4772300,
            mediumvioletred: 13047173,
            midnightblue: 1644912,
            mintcream: 16121850,
            mistyrose: 16770273,
            moccasin: 16770229,
            navajowhite: 16768685,
            navy: 128,
            oldlace: 16643558,
            olive: 8421376,
            olivedrab: 7048739,
            orange: 16753920,
            orangered: 16729344,
            orchid: 14315734,
            palegoldenrod: 15657130,
            palegreen: 10025880,
            paleturquoise: 11529966,
            palevioletred: 14381203,
            papayawhip: 16773077,
            peachpuff: 16767673,
            peru: 13468991,
            pink: 16761035,
            plum: 14524637,
            powderblue: 11591910,
            purple: 8388736,
            rebeccapurple: 6697881,
            red: 16711680,
            rosybrown: 12357519,
            royalblue: 4286945,
            saddlebrown: 9127187,
            salmon: 16416882,
            sandybrown: 16032864,
            seagreen: 3050327,
            seashell: 16774638,
            sienna: 10506797,
            silver: 12632256,
            skyblue: 8900331,
            slateblue: 6970061,
            slategray: 7372944,
            slategrey: 7372944,
            snow: 16775930,
            springgreen: 65407,
            steelblue: 4620980,
            tan: 13808780,
            teal: 32896,
            thistle: 14204888,
            tomato: 16737095,
            turquoise: 4251856,
            violet: 15631086,
            wheat: 16113331,
            white: 16777215,
            whitesmoke: 16119285,
            yellow: 16776960,
            yellowgreen: 10145074
        };

    function mc() {
        return this.rgb().formatHex()
    }

    function yc() {
        return this.rgb().formatRgb()
    }

    function vc(t) {
        var e, n;
        return t = (t + "").trim().toLowerCase(), (e = sc.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), 6 === n ? _c(e) : 3 === n ? new kc(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | 240 & e, (15 & e) << 4 | 15 & e, 1) : 8 === n ? xc(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (255 & e) / 255) : 4 === n ? xc(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | 240 & e, ((15 & e) << 4 | 15 & e) / 255) : null) : (e = lc.exec(t)) ? new kc(e[1], e[2], e[3], 1) : (e = cc.exec(t)) ? new kc(255 * e[1] / 100, 255 * e[2] / 100, 255 * e[3] / 100, 1) : (e = fc.exec(t)) ? xc(e[1], e[2], e[3], e[4]) : (e = hc.exec(t)) ? xc(255 * e[1] / 100, 255 * e[2] / 100, 255 * e[3] / 100, e[4]) : (e = dc.exec(t)) ? Dc(e[1], e[2] / 100, e[3] / 100, 1) : (e = pc.exec(t)) ? Dc(e[1], e[2] / 100, e[3] / 100, e[4]) : gc.hasOwnProperty(t) ? _c(gc[t]) : "transparent" === t ? new kc(NaN, NaN, NaN, 0) : null
    }

    function _c(t) {
        return new kc(t >> 16 & 255, t >> 8 & 255, 255 & t, 1)
    }

    function xc(t, e, n, r) {
        return r <= 0 && (t = e = n = NaN), new kc(t, e, n, r)
    }

    function bc(t) {
        return t instanceof nc || (t = vc(t)), t ? new kc((t = t.rgb()).r, t.g, t.b, t.opacity) : new kc
    }

    function wc(t, e, n, r) {
        return 1 === arguments.length ? bc(t) : new kc(t, e, n, null == r ? 1 : r)
    }

    function kc(t, e, n, r) {
        this.r = +t, this.g = +e, this.b = +n, this.opacity = +r
    }

    function Mc() {
        return "#" + Ec(this.r) + Ec(this.g) + Ec(this.b)
    }

    function Ac() {
        var t = this.opacity;
        return (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t))) ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (1 === t ? ")" : ", " + t + ")")
    }

    function Ec(t) {
        return ((t = Math.max(0, Math.min(255, Math.round(t) || 0))) < 16 ? "0" : "") + t.toString(16)
    }

    function Dc(t, e, n, r) {
        return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new Sc(t, e, n, r)
    }

    function Cc(t) {
        if (t instanceof Sc) return new Sc(t.h, t.s, t.l, t.opacity);
        if (t instanceof nc || (t = vc(t)), !t) return new Sc;
        if (t instanceof Sc) return t;
        var e = (t = t.rgb()).r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), o = Math.max(e, n, r),
            a = NaN, u = o - i, s = (o + i) / 2;
        return u ? (a = e === o ? (n - r) / u + 6 * (n < r) : n === o ? (r - e) / u + 2 : (e - n) / u + 4, u /= s < .5 ? o + i : 2 - o - i, a *= 60) : u = s > 0 && s < 1 ? 0 : a, new Sc(a, u, s, t.opacity)
    }

    function Fc(t, e, n, r) {
        return 1 === arguments.length ? Cc(t) : new Sc(t, e, n, null == r ? 1 : r)
    }

    function Sc(t, e, n, r) {
        this.h = +t, this.s = +e, this.l = +n, this.opacity = +r
    }

    function Bc(t, e, n) {
        return 255 * (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e)
    }

    tc(nc, vc, {
        copy: function (t) {
            return Object.assign(new this.constructor, this, t)
        }, displayable: function () {
            return this.rgb().displayable()
        }, hex: mc, formatHex: mc, formatHsl: function () {
            return Cc(this).formatHsl()
        }, formatRgb: yc, toString: yc
    }), tc(kc, wc, ec(nc, {
        brighter: function (t) {
            return t = null == t ? ic : Math.pow(ic, t), new kc(this.r * t, this.g * t, this.b * t, this.opacity)
        }, darker: function (t) {
            return t = null == t ? rc : Math.pow(rc, t), new kc(this.r * t, this.g * t, this.b * t, this.opacity)
        }, rgb: function () {
            return this
        }, displayable: function () {
            return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1
        }, hex: Mc, formatHex: Mc, formatRgb: Ac, toString: Ac
    })), tc(Sc, Fc, ec(nc, {
        brighter: function (t) {
            return t = null == t ? ic : Math.pow(ic, t), new Sc(this.h, this.s, this.l * t, this.opacity)
        }, darker: function (t) {
            return t = null == t ? rc : Math.pow(rc, t), new Sc(this.h, this.s, this.l * t, this.opacity)
        }, rgb: function () {
            var t = this.h % 360 + 360 * (this.h < 0), e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l,
                r = n + (n < .5 ? n : 1 - n) * e, i = 2 * n - r;
            return new kc(Bc(t >= 240 ? t - 240 : t + 120, i, r), Bc(t, i, r), Bc(t < 120 ? t + 240 : t - 120, i, r), this.opacity)
        }, displayable: function () {
            return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1
        }, formatHsl: function () {
            var t = this.opacity;
            return (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t))) ? "hsl(" : "hsla(") + (this.h || 0) + ", " + 100 * (this.s || 0) + "%, " + 100 * (this.l || 0) + "%" + (1 === t ? ")" : ", " + t + ")")
        }
    }));
    const Tc = Math.PI / 180, zc = 180 / Math.PI, Nc = .96422, Oc = .82521, Rc = 4 / 29, Lc = 6 / 29, Uc = 3 * Lc * Lc;

    function qc(t) {
        if (t instanceof jc) return new jc(t.l, t.a, t.b, t.opacity);
        if (t instanceof Gc) return Xc(t);
        t instanceof kc || (t = bc(t));
        var e, n, r = Hc(t.r), i = Hc(t.g), o = Hc(t.b), a = Ic((.2225045 * r + .7168786 * i + .0606169 * o) / 1);
        return r === i && i === o ? e = n = a : (e = Ic((.4360747 * r + .3850649 * i + .1430804 * o) / Nc), n = Ic((.0139322 * r + .0971045 * i + .7141733 * o) / Oc)), new jc(116 * a - 16, 500 * (e - a), 200 * (a - n), t.opacity)
    }

    function Pc(t, e, n, r) {
        return 1 === arguments.length ? qc(t) : new jc(t, e, n, null == r ? 1 : r)
    }

    function jc(t, e, n, r) {
        this.l = +t, this.a = +e, this.b = +n, this.opacity = +r
    }

    function Ic(t) {
        return t > .008856451679035631 ? Math.pow(t, 1 / 3) : t / Uc + Rc
    }

    function $c(t) {
        return t > Lc ? t * t * t : Uc * (t - Rc)
    }

    function Wc(t) {
        return 255 * (t <= .0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - .055)
    }

    function Hc(t) {
        return (t /= 255) <= .04045 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4)
    }

    function Yc(t) {
        if (t instanceof Gc) return new Gc(t.h, t.c, t.l, t.opacity);
        if (t instanceof jc || (t = qc(t)), 0 === t.a && 0 === t.b) return new Gc(NaN, 0 < t.l && t.l < 100 ? 0 : NaN, t.l, t.opacity);
        var e = Math.atan2(t.b, t.a) * zc;
        return new Gc(e < 0 ? e + 360 : e, Math.sqrt(t.a * t.a + t.b * t.b), t.l, t.opacity)
    }

    function Vc(t, e, n, r) {
        return 1 === arguments.length ? Yc(t) : new Gc(t, e, n, null == r ? 1 : r)
    }

    function Gc(t, e, n, r) {
        this.h = +t, this.c = +e, this.l = +n, this.opacity = +r
    }

    function Xc(t) {
        if (isNaN(t.h)) return new jc(t.l, 0, 0, t.opacity);
        var e = t.h * Tc;
        return new jc(t.l, Math.cos(e) * t.c, Math.sin(e) * t.c, t.opacity)
    }

    tc(jc, Pc, ec(nc, {
        brighter: function (t) {
            return new jc(this.l + 18 * (null == t ? 1 : t), this.a, this.b, this.opacity)
        }, darker: function (t) {
            return new jc(this.l - 18 * (null == t ? 1 : t), this.a, this.b, this.opacity)
        }, rgb: function () {
            var t = (this.l + 16) / 116, e = isNaN(this.a) ? t : t + this.a / 500,
                n = isNaN(this.b) ? t : t - this.b / 200;
            return new kc(Wc(3.1338561 * (e = Nc * $c(e)) - 1.6168667 * (t = 1 * $c(t)) - .4906146 * (n = Oc * $c(n))), Wc(-.9787684 * e + 1.9161415 * t + .033454 * n), Wc(.0719453 * e - .2289914 * t + 1.4052427 * n), this.opacity)
        }
    })), tc(Gc, Vc, ec(nc, {
        brighter: function (t) {
            return new Gc(this.h, this.c, this.l + 18 * (null == t ? 1 : t), this.opacity)
        }, darker: function (t) {
            return new Gc(this.h, this.c, this.l - 18 * (null == t ? 1 : t), this.opacity)
        }, rgb: function () {
            return Xc(this).rgb()
        }
    }));
    var Jc = -.14861, Zc = 1.78277, Qc = -.29227, Kc = -.90649, tf = 1.97294, ef = tf * Kc, nf = tf * Zc,
        rf = Zc * Qc - Kc * Jc;

    function of(t) {
        if (t instanceof uf) return new uf(t.h, t.s, t.l, t.opacity);
        t instanceof kc || (t = bc(t));
        var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = (rf * r + ef * e - nf * n) / (rf + ef - nf), o = r - i,
            a = (tf * (n - i) - Qc * o) / Kc, u = Math.sqrt(a * a + o * o) / (tf * i * (1 - i)),
            s = u ? Math.atan2(a, o) * zc - 120 : NaN;
        return new uf(s < 0 ? s + 360 : s, u, i, t.opacity)
    }

    function af(t, e, n, r) {
        return 1 === arguments.length ? of(t) : new uf(t, e, n, null == r ? 1 : r)
    }

    function uf(t, e, n, r) {
        this.h = +t, this.s = +e, this.l = +n, this.opacity = +r
    }

    function sf(t, e, n, r, i) {
        var o = t * t, a = o * t;
        return ((1 - 3 * t + 3 * o - a) * e + (4 - 6 * o + 3 * a) * n + (1 + 3 * t + 3 * o - 3 * a) * r + a * i) / 6
    }

    function lf(t) {
        var e = t.length - 1;
        return function (n) {
            var r = n <= 0 ? n = 0 : n >= 1 ? (n = 1, e - 1) : Math.floor(n * e), i = t[r], o = t[r + 1],
                a = r > 0 ? t[r - 1] : 2 * i - o, u = r < e - 1 ? t[r + 2] : 2 * o - i;
            return sf((n - r / e) * e, a, i, o, u)
        }
    }

    function cf(t) {
        var e = t.length;
        return function (n) {
            var r = Math.floor(((n %= 1) < 0 ? ++n : n) * e), i = t[(r + e - 1) % e], o = t[r % e], a = t[(r + 1) % e],
                u = t[(r + 2) % e];
            return sf((n - r / e) * e, i, o, a, u)
        }
    }

    tc(uf, af, ec(nc, {
        brighter: function (t) {
            return t = null == t ? ic : Math.pow(ic, t), new uf(this.h, this.s, this.l * t, this.opacity)
        }, darker: function (t) {
            return t = null == t ? rc : Math.pow(rc, t), new uf(this.h, this.s, this.l * t, this.opacity)
        }, rgb: function () {
            var t = isNaN(this.h) ? 0 : (this.h + 120) * Tc, e = +this.l, n = isNaN(this.s) ? 0 : this.s * e * (1 - e),
                r = Math.cos(t), i = Math.sin(t);
            return new kc(255 * (e + n * (Jc * r + Zc * i)), 255 * (e + n * (Qc * r + Kc * i)), 255 * (e + n * (tf * r)), this.opacity)
        }
    }));
    var ff = t => () => t;

    function hf(t, e) {
        return function (n) {
            return t + n * e
        }
    }

    function df(t, e) {
        var n = e - t;
        return n ? hf(t, n > 180 || n < -180 ? n - 360 * Math.round(n / 360) : n) : ff(isNaN(t) ? e : t)
    }

    function pf(t) {
        return 1 == (t = +t) ? gf : function (e, n) {
            return n - e ? function (t, e, n) {
                return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function (r) {
                    return Math.pow(t + r * e, n)
                }
            }(e, n, t) : ff(isNaN(e) ? n : e)
        }
    }

    function gf(t, e) {
        var n = e - t;
        return n ? hf(t, n) : ff(isNaN(t) ? e : t)
    }

    var mf = function t(e) {
        var n = pf(e);

        function r(t, e) {
            var r = n((t = wc(t)).r, (e = wc(e)).r), i = n(t.g, e.g), o = n(t.b, e.b), a = gf(t.opacity, e.opacity);
            return function (e) {
                return t.r = r(e), t.g = i(e), t.b = o(e), t.opacity = a(e), t + ""
            }
        }

        return r.gamma = t, r
    }(1);

    function yf(t) {
        return function (e) {
            var n, r, i = e.length, o = new Array(i), a = new Array(i), u = new Array(i);
            for (n = 0; n < i; ++n) r = wc(e[n]), o[n] = r.r || 0, a[n] = r.g || 0, u[n] = r.b || 0;
            return o = t(o), a = t(a), u = t(u), r.opacity = 1, function (t) {
                return r.r = o(t), r.g = a(t), r.b = u(t), r + ""
            }
        }
    }

    var vf = yf(lf), _f = yf(cf);

    function xf(t, e) {
        e || (e = []);
        var n, r = t ? Math.min(e.length, t.length) : 0, i = e.slice();
        return function (o) {
            for (n = 0; n < r; ++n) i[n] = t[n] * (1 - o) + e[n] * o;
            return i
        }
    }

    function bf(t) {
        return ArrayBuffer.isView(t) && !(t instanceof DataView)
    }

    function wf(t, e) {
        var n, r = e ? e.length : 0, i = t ? Math.min(r, t.length) : 0, o = new Array(i), a = new Array(r);
        for (n = 0; n < i; ++n) o[n] = Ff(t[n], e[n]);
        for (; n < r; ++n) a[n] = e[n];
        return function (t) {
            for (n = 0; n < i; ++n) a[n] = o[n](t);
            return a
        }
    }

    function kf(t, e) {
        var n = new Date;
        return t = +t, e = +e, function (r) {
            return n.setTime(t * (1 - r) + e * r), n
        }
    }

    function Mf(t, e) {
        return t = +t, e = +e, function (n) {
            return t * (1 - n) + e * n
        }
    }

    function Af(t, e) {
        var n, r = {}, i = {};
        for (n in null !== t && "object" == typeof t || (t = {}), null !== e && "object" == typeof e || (e = {}), e) n in t ? r[n] = Ff(t[n], e[n]) : i[n] = e[n];
        return function (t) {
            for (n in r) i[n] = r[n](t);
            return i
        }
    }

    var Ef = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Df = new RegExp(Ef.source, "g");

    function Cf(t, e) {
        var n, r, i, o = Ef.lastIndex = Df.lastIndex = 0, a = -1, u = [], s = [];
        for (t += "", e += ""; (n = Ef.exec(t)) && (r = Df.exec(e));) (i = r.index) > o && (i = e.slice(o, i), u[a] ? u[a] += i : u[++a] = i), (n = n[0]) === (r = r[0]) ? u[a] ? u[a] += r : u[++a] = r : (u[++a] = null, s.push({
            i: a,
            x: Mf(n, r)
        })), o = Df.lastIndex;
        return o < e.length && (i = e.slice(o), u[a] ? u[a] += i : u[++a] = i), u.length < 2 ? s[0] ? function (t) {
            return function (e) {
                return t(e) + ""
            }
        }(s[0].x) : function (t) {
            return function () {
                return t
            }
        }(e) : (e = s.length, function (t) {
            for (var n, r = 0; r < e; ++r) u[(n = s[r]).i] = n.x(t);
            return u.join("")
        })
    }

    function Ff(t, e) {
        var n, r = typeof e;
        return null == e || "boolean" === r ? ff(e) : ("number" === r ? Mf : "string" === r ? (n = vc(e)) ? (e = n, mf) : Cf : e instanceof vc ? mf : e instanceof Date ? kf : bf(e) ? xf : Array.isArray(e) ? wf : "function" != typeof e.valueOf && "function" != typeof e.toString || isNaN(e) ? Af : Mf)(t, e)
    }

    function Sf(t, e) {
        return t = +t, e = +e, function (n) {
            return Math.round(t * (1 - n) + e * n)
        }
    }

    var Bf, Tf = 180 / Math.PI, zf = {translateX: 0, translateY: 0, rotate: 0, skewX: 0, scaleX: 1, scaleY: 1};

    function Nf(t, e, n, r, i, o) {
        var a, u, s;
        return (a = Math.sqrt(t * t + e * e)) && (t /= a, e /= a), (s = t * n + e * r) && (n -= t * s, r -= e * s), (u = Math.sqrt(n * n + r * r)) && (n /= u, r /= u, s /= u), t * r < e * n && (t = -t, e = -e, s = -s, a = -a), {
            translateX: i,
            translateY: o,
            rotate: Math.atan2(e, t) * Tf,
            skewX: Math.atan(s) * Tf,
            scaleX: a,
            scaleY: u
        }
    }

    function Of(t, e, n, r) {
        function i(t) {
            return t.length ? t.pop() + " " : ""
        }

        return function (o, a) {
            var u = [], s = [];
            return o = t(o), a = t(a), function (t, r, i, o, a, u) {
                if (t !== i || r !== o) {
                    var s = a.push("translate(", null, e, null, n);
                    u.push({i: s - 4, x: Mf(t, i)}, {i: s - 2, x: Mf(r, o)})
                } else (i || o) && a.push("translate(" + i + e + o + n)
            }(o.translateX, o.translateY, a.translateX, a.translateY, u, s), function (t, e, n, o) {
                t !== e ? (t - e > 180 ? e += 360 : e - t > 180 && (t += 360), o.push({
                    i: n.push(i(n) + "rotate(", null, r) - 2,
                    x: Mf(t, e)
                })) : e && n.push(i(n) + "rotate(" + e + r)
            }(o.rotate, a.rotate, u, s), function (t, e, n, o) {
                t !== e ? o.push({
                    i: n.push(i(n) + "skewX(", null, r) - 2,
                    x: Mf(t, e)
                }) : e && n.push(i(n) + "skewX(" + e + r)
            }(o.skewX, a.skewX, u, s), function (t, e, n, r, o, a) {
                if (t !== n || e !== r) {
                    var u = o.push(i(o) + "scale(", null, ",", null, ")");
                    a.push({i: u - 4, x: Mf(t, n)}, {i: u - 2, x: Mf(e, r)})
                } else 1 === n && 1 === r || o.push(i(o) + "scale(" + n + "," + r + ")")
            }(o.scaleX, o.scaleY, a.scaleX, a.scaleY, u, s), o = a = null, function (t) {
                for (var e, n = -1, r = s.length; ++n < r;) u[(e = s[n]).i] = e.x(t);
                return u.join("")
            }
        }
    }

    var Rf = Of((function (t) {
        const e = new ("function" == typeof DOMMatrix ? DOMMatrix : WebKitCSSMatrix)(t + "");
        return e.isIdentity ? zf : Nf(e.a, e.b, e.c, e.d, e.e, e.f)
    }), "px, ", "px)", "deg)"), Lf = Of((function (t) {
        return null == t ? zf : (Bf || (Bf = document.createElementNS("http://www.w3.org/2000/svg", "g")), Bf.setAttribute("transform", t), (t = Bf.transform.baseVal.consolidate()) ? Nf((t = t.matrix).a, t.b, t.c, t.d, t.e, t.f) : zf)
    }), ", ", ")", ")");

    function Uf(t) {
        return ((t = Math.exp(t)) + 1 / t) / 2
    }

    var qf = function t(e, n, r) {
        function i(t, i) {
            var o, a, u = t[0], s = t[1], l = t[2], c = i[0], f = i[1], h = i[2], d = c - u, p = f - s,
                g = d * d + p * p;
            if (g < 1e-12) a = Math.log(h / l) / e, o = function (t) {
                return [u + t * d, s + t * p, l * Math.exp(e * t * a)]
            }; else {
                var m = Math.sqrt(g), y = (h * h - l * l + r * g) / (2 * l * n * m),
                    v = (h * h - l * l - r * g) / (2 * h * n * m), _ = Math.log(Math.sqrt(y * y + 1) - y),
                    x = Math.log(Math.sqrt(v * v + 1) - v);
                a = (x - _) / e, o = function (t) {
                    var r = t * a, i = Uf(_), o = l / (n * m) * (i * function (t) {
                        return ((t = Math.exp(2 * t)) - 1) / (t + 1)
                    }(e * r + _) - function (t) {
                        return ((t = Math.exp(t)) - 1 / t) / 2
                    }(_));
                    return [u + o * d, s + o * p, l * i / Uf(e * r + _)]
                }
            }
            return o.duration = 1e3 * a * e / Math.SQRT2, o
        }

        return i.rho = function (e) {
            var n = Math.max(.001, +e), r = n * n;
            return t(n, r, r * r)
        }, i
    }(Math.SQRT2, 2, 4);

    function Pf(t) {
        return function (e, n) {
            var r = t((e = Fc(e)).h, (n = Fc(n)).h), i = gf(e.s, n.s), o = gf(e.l, n.l), a = gf(e.opacity, n.opacity);
            return function (t) {
                return e.h = r(t), e.s = i(t), e.l = o(t), e.opacity = a(t), e + ""
            }
        }
    }

    var jf = Pf(df), If = Pf(gf);

    function $f(t) {
        return function (e, n) {
            var r = t((e = Vc(e)).h, (n = Vc(n)).h), i = gf(e.c, n.c), o = gf(e.l, n.l), a = gf(e.opacity, n.opacity);
            return function (t) {
                return e.h = r(t), e.c = i(t), e.l = o(t), e.opacity = a(t), e + ""
            }
        }
    }

    var Wf = $f(df), Hf = $f(gf);

    function Yf(t) {
        return function e(n) {
            function r(e, r) {
                var i = t((e = af(e)).h, (r = af(r)).h), o = gf(e.s, r.s), a = gf(e.l, r.l),
                    u = gf(e.opacity, r.opacity);
                return function (t) {
                    return e.h = i(t), e.s = o(t), e.l = a(Math.pow(t, n)), e.opacity = u(t), e + ""
                }
            }

            return n = +n, r.gamma = e, r
        }(1)
    }

    var Vf = Yf(df), Gf = Yf(gf);

    function Xf(t, e) {
        void 0 === e && (e = t, t = Ff);
        for (var n = 0, r = e.length - 1, i = e[0], o = new Array(r < 0 ? 0 : r); n < r;) o[n] = t(i, i = e[++n]);
        return function (t) {
            var e = Math.max(0, Math.min(r - 1, Math.floor(t *= r)));
            return o[e](t - e)
        }
    }

    var Jf = Object.freeze({
        __proto__: null,
        interpolate: Ff,
        interpolateArray: function (t, e) {
            return (bf(e) ? xf : wf)(t, e)
        },
        interpolateBasis: lf,
        interpolateBasisClosed: cf,
        interpolateDate: kf,
        interpolateDiscrete: function (t) {
            var e = t.length;
            return function (n) {
                return t[Math.max(0, Math.min(e - 1, Math.floor(n * e)))]
            }
        },
        interpolateHue: function (t, e) {
            var n = df(+t, +e);
            return function (t) {
                var e = n(t);
                return e - 360 * Math.floor(e / 360)
            }
        },
        interpolateNumber: Mf,
        interpolateNumberArray: xf,
        interpolateObject: Af,
        interpolateRound: Sf,
        interpolateString: Cf,
        interpolateTransformCss: Rf,
        interpolateTransformSvg: Lf,
        interpolateZoom: qf,
        interpolateRgb: mf,
        interpolateRgbBasis: vf,
        interpolateRgbBasisClosed: _f,
        interpolateHsl: jf,
        interpolateHslLong: If,
        interpolateLab: function (t, e) {
            var n = gf((t = Pc(t)).l, (e = Pc(e)).l), r = gf(t.a, e.a), i = gf(t.b, e.b), o = gf(t.opacity, e.opacity);
            return function (e) {
                return t.l = n(e), t.a = r(e), t.b = i(e), t.opacity = o(e), t + ""
            }
        },
        interpolateHcl: Wf,
        interpolateHclLong: Hf,
        interpolateCubehelix: Vf,
        interpolateCubehelixLong: Gf,
        piecewise: Xf,
        quantize: function (t, e) {
            for (var n = new Array(e), r = 0; r < e; ++r) n[r] = t(r / (e - 1));
            return n
        }
    });

    function Zf(t) {
        return +t
    }

    var Qf = [0, 1];

    function Kf(t) {
        return t
    }

    function th(t, e) {
        return (e -= t = +t) ? function (n) {
            return (n - t) / e
        } : function (t) {
            return function () {
                return t
            }
        }(isNaN(e) ? NaN : .5)
    }

    function eh(t, e, n) {
        var r = t[0], i = t[1], o = e[0], a = e[1];
        return i < r ? (r = th(i, r), o = n(a, o)) : (r = th(r, i), o = n(o, a)), function (t) {
            return o(r(t))
        }
    }

    function nh(t, e, n) {
        var r = Math.min(t.length, e.length) - 1, i = new Array(r), o = new Array(r), a = -1;
        for (t[r] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++a < r;) i[a] = th(t[a], t[a + 1]), o[a] = n(e[a], e[a + 1]);
        return function (e) {
            var n = _e(t, e, 1, r) - 1;
            return o[n](i[n](e))
        }
    }

    function rh(t, e) {
        return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown())
    }

    function ih() {
        var t, e, n, r, i, o, a = Qf, u = Qf, s = Ff, l = Kf;

        function c() {
            var t = Math.min(a.length, u.length);
            return l !== Kf && (l = function (t, e) {
                var n;
                return t > e && (n = t, t = e, e = n), function (n) {
                    return Math.max(t, Math.min(e, n))
                }
            }(a[0], a[t - 1])), r = t > 2 ? nh : eh, i = o = null, f
        }

        function f(e) {
            return isNaN(e = +e) ? n : (i || (i = r(a.map(t), u, s)))(t(l(e)))
        }

        return f.invert = function (n) {
            return l(e((o || (o = r(u, a.map(t), Mf)))(n)))
        }, f.domain = function (t) {
            return arguments.length ? (a = Array.from(t, Zf), c()) : a.slice()
        }, f.range = function (t) {
            return arguments.length ? (u = Array.from(t), c()) : u.slice()
        }, f.rangeRound = function (t) {
            return u = Array.from(t), s = Sf, c()
        }, f.clamp = function (t) {
            return arguments.length ? (l = !!t || Kf, c()) : l !== Kf
        }, f.interpolate = function (t) {
            return arguments.length ? (s = t, c()) : s
        }, f.unknown = function (t) {
            return arguments.length ? (n = t, f) : n
        }, function (n, r) {
            return t = n, e = r, c()
        }
    }

    function oh() {
        return ih()(Kf, Kf)
    }

    function ah(t, e, n, r) {
        var i, o = De(t, e, n);
        switch ((r = Ie(null == r ? ",f" : r)).type) {
            case"s":
                var a = Math.max(Math.abs(t), Math.abs(e));
                return null != r.precision || isNaN(i = tn(o, a)) || (r.precision = i), Xe(r, a);
            case"":
            case"e":
            case"g":
            case"p":
            case"r":
                null != r.precision || isNaN(i = en(o, Math.max(Math.abs(t), Math.abs(e)))) || (r.precision = i - ("e" === r.type));
                break;
            case"f":
            case"%":
                null != r.precision || isNaN(i = Ke(o)) || (r.precision = i - 2 * ("%" === r.type))
        }
        return Ge(r)
    }

    function uh(t) {
        var e = t.domain;
        return t.ticks = function (t) {
            var n = e();
            return Ae(n[0], n[n.length - 1], null == t ? 10 : t)
        }, t.tickFormat = function (t, n) {
            var r = e();
            return ah(r[0], r[r.length - 1], null == t ? 10 : t, n)
        }, t.nice = function (n) {
            null == n && (n = 10);
            var r, i, o = e(), a = 0, u = o.length - 1, s = o[a], l = o[u], c = 10;
            for (l < s && (i = s, s = l, l = i, i = a, a = u, u = i); c-- > 0;) {
                if ((i = Ee(s, l, n)) === r) return o[a] = s, o[u] = l, e(o);
                if (i > 0) s = Math.floor(s / i) * i, l = Math.ceil(l / i) * i; else {
                    if (!(i < 0)) break;
                    s = Math.ceil(s * i) / i, l = Math.floor(l * i) / i
                }
                r = i
            }
            return t
        }, t
    }

    function sh(t, e) {
        var n, r = 0, i = (t = t.slice()).length - 1, o = t[r], a = t[i];
        return a < o && (n = r, r = i, i = n, n = o, o = a, a = n), t[r] = e.floor(o), t[i] = e.ceil(a), t
    }

    function lh(t) {
        return Math.log(t)
    }

    function ch(t) {
        return Math.exp(t)
    }

    function fh(t) {
        return -Math.log(-t)
    }

    function hh(t) {
        return -Math.exp(-t)
    }

    function dh(t) {
        return isFinite(t) ? +("1e" + t) : t < 0 ? 0 : t
    }

    function ph(t) {
        return function (e) {
            return -t(-e)
        }
    }

    function gh(t) {
        var e, n, r = t(lh, ch), i = r.domain, o = 10;

        function a() {
            return e = function (t) {
                return t === Math.E ? Math.log : 10 === t && Math.log10 || 2 === t && Math.log2 || (t = Math.log(t), function (e) {
                    return Math.log(e) / t
                })
            }(o), n = function (t) {
                return 10 === t ? dh : t === Math.E ? Math.exp : function (e) {
                    return Math.pow(t, e)
                }
            }(o), i()[0] < 0 ? (e = ph(e), n = ph(n), t(fh, hh)) : t(lh, ch), r
        }

        return r.base = function (t) {
            return arguments.length ? (o = +t, a()) : o
        }, r.domain = function (t) {
            return arguments.length ? (i(t), a()) : i()
        }, r.ticks = function (t) {
            var r, a = i(), u = a[0], s = a[a.length - 1];
            (r = s < u) && (h = u, u = s, s = h);
            var l, c, f, h = e(u), d = e(s), p = null == t ? 10 : +t, g = [];
            if (!(o % 1) && d - h < p) {
                if (h = Math.floor(h), d = Math.ceil(d), u > 0) {
                    for (; h <= d; ++h) for (c = 1, l = n(h); c < o; ++c) if (!((f = l * c) < u)) {
                        if (f > s) break;
                        g.push(f)
                    }
                } else for (; h <= d; ++h) for (c = o - 1, l = n(h); c >= 1; --c) if (!((f = l * c) < u)) {
                    if (f > s) break;
                    g.push(f)
                }
                2 * g.length < p && (g = Ae(u, s, p))
            } else g = Ae(h, d, Math.min(d - h, p)).map(n);
            return r ? g.reverse() : g
        }, r.tickFormat = function (t, i) {
            if (null == i && (i = 10 === o ? ".0e" : ","), "function" != typeof i && (i = Ge(i)), t === 1 / 0) return i;
            null == t && (t = 10);
            var a = Math.max(1, o * t / r.ticks().length);
            return function (t) {
                var r = t / n(Math.round(e(t)));
                return r * o < o - .5 && (r *= o), r <= a ? i(t) : ""
            }
        }, r.nice = function () {
            return i(sh(i(), {
                floor: function (t) {
                    return n(Math.floor(e(t)))
                }, ceil: function (t) {
                    return n(Math.ceil(e(t)))
                }
            }))
        }, r
    }

    function mh(t) {
        return function (e) {
            return Math.sign(e) * Math.log1p(Math.abs(e / t))
        }
    }

    function yh(t) {
        return function (e) {
            return Math.sign(e) * Math.expm1(Math.abs(e)) * t
        }
    }

    function vh(t) {
        var e = 1, n = t(mh(e), yh(e));
        return n.constant = function (n) {
            return arguments.length ? t(mh(e = +n), yh(e)) : e
        }, uh(n)
    }

    function _h(t) {
        return function (e) {
            return e < 0 ? -Math.pow(-e, t) : Math.pow(e, t)
        }
    }

    function xh(t) {
        return t < 0 ? -Math.sqrt(-t) : Math.sqrt(t)
    }

    function bh(t) {
        return t < 0 ? -t * t : t * t
    }

    function wh(t) {
        var e = t(Kf, Kf), n = 1;

        function r() {
            return 1 === n ? t(Kf, Kf) : .5 === n ? t(xh, bh) : t(_h(n), _h(1 / n))
        }

        return e.exponent = function (t) {
            return arguments.length ? (n = +t, r()) : n
        }, uh(e)
    }

    function kh() {
        var t = wh(ih());
        return t.copy = function () {
            return rh(t, kh()).exponent(t.exponent())
        }, Jl.apply(t, arguments), t
    }

    var Mh = 1e3, Ah = 6e4, Eh = 36e5, Dh = 864e5, Ch = 2592e6, Fh = 31536e6;

    function Sh(t) {
        return new Date(t)
    }

    function Bh(t) {
        return t instanceof Date ? +t : +new Date(+t)
    }

    function Th(t, e, n, r, i, o, a, u, s) {
        var l = oh(), c = l.invert, f = l.domain, h = s(".%L"), d = s(":%S"), p = s("%I:%M"), g = s("%I %p"),
            m = s("%a %d"), y = s("%b %d"), v = s("%B"), _ = s("%Y"),
            x = [[a, 1, Mh], [a, 5, 5e3], [a, 15, 15e3], [a, 30, 3e4], [o, 1, Ah], [o, 5, 3e5], [o, 15, 9e5], [o, 30, 18e5], [i, 1, Eh], [i, 3, 108e5], [i, 6, 216e5], [i, 12, 432e5], [r, 1, Dh], [r, 2, 1728e5], [n, 1, 6048e5], [e, 1, Ch], [e, 3, 7776e6], [t, 1, Fh]];

        function b(u) {
            return (a(u) < u ? h : o(u) < u ? d : i(u) < u ? p : r(u) < u ? g : e(u) < u ? n(u) < u ? m : y : t(u) < u ? v : _)(u)
        }

        function w(e, n, r) {
            if (null == e && (e = 10), "number" == typeof e) {
                var i, o = Math.abs(r - n) / e, a = me((function (t) {
                    return t[2]
                })).right(x, o);
                return a === x.length ? (i = De(n / Fh, r / Fh, e), e = t) : a ? (i = (a = x[o / x[a - 1][2] < x[a][2] / o ? a - 1 : a])[1], e = a[0]) : (i = Math.max(De(n, r, e), 1), e = u), e.every(i)
            }
            return e
        }

        return l.invert = function (t) {
            return new Date(c(t))
        }, l.domain = function (t) {
            return arguments.length ? f(Array.from(t, Bh)) : f().map(Sh)
        }, l.ticks = function (t) {
            var e, n = f(), r = n[0], i = n[n.length - 1], o = i < r;
            return o && (e = r, r = i, i = e), e = (e = w(t, r, i)) ? e.range(r, i + 1) : [], o ? e.reverse() : e
        }, l.tickFormat = function (t, e) {
            return null == e ? b : s(e)
        }, l.nice = function (t) {
            var e = f();
            return (t = w(t, e[0], e[e.length - 1])) ? f(sh(e, t)) : l
        }, l.copy = function () {
            return rh(l, Th(t, e, n, r, i, o, a, u, s))
        }, l
    }

    function zh() {
        var t, e, n, r, i, o = 0, a = 1, u = Kf, s = !1;

        function l(e) {
            return isNaN(e = +e) ? i : u(0 === n ? .5 : (e = (r(e) - t) * n, s ? Math.max(0, Math.min(1, e)) : e))
        }

        function c(t) {
            return function (e) {
                var n, r;
                return arguments.length ? ([n, r] = e, u = t(n, r), l) : [u(0), u(1)]
            }
        }

        return l.domain = function (i) {
            return arguments.length ? ([o, a] = i, t = r(o = +o), e = r(a = +a), n = t === e ? 0 : 1 / (e - t), l) : [o, a]
        }, l.clamp = function (t) {
            return arguments.length ? (s = !!t, l) : s
        }, l.interpolator = function (t) {
            return arguments.length ? (u = t, l) : u
        }, l.range = c(Ff), l.rangeRound = c(Sf), l.unknown = function (t) {
            return arguments.length ? (i = t, l) : i
        }, function (i) {
            return r = i, t = i(o), e = i(a), n = t === e ? 0 : 1 / (e - t), l
        }
    }

    function Nh(t, e) {
        return e.domain(t.domain()).interpolator(t.interpolator()).clamp(t.clamp()).unknown(t.unknown())
    }

    function Oh() {
        var t = uh(zh()(Kf));
        return t.copy = function () {
            return Nh(t, Oh())
        }, Zl.apply(t, arguments)
    }

    function Rh() {
        var t = wh(zh());
        return t.copy = function () {
            return Nh(t, Rh()).exponent(t.exponent())
        }, Zl.apply(t, arguments)
    }

    function Lh() {
        var t, e, n, r, i, o, a, u = 0, s = .5, l = 1, c = 1, f = Kf, h = !1;

        function d(t) {
            return isNaN(t = +t) ? a : (t = .5 + ((t = +o(t)) - e) * (c * t < c * e ? r : i), f(h ? Math.max(0, Math.min(1, t)) : t))
        }

        function p(t) {
            return function (e) {
                var n, r, i;
                return arguments.length ? ([n, r, i] = e, f = Xf(t, [n, r, i]), d) : [f(0), f(.5), f(1)]
            }
        }

        return d.domain = function (a) {
            return arguments.length ? ([u, s, l] = a, t = o(u = +u), e = o(s = +s), n = o(l = +l), r = t === e ? 0 : .5 / (e - t), i = e === n ? 0 : .5 / (n - e), c = e < t ? -1 : 1, d) : [u, s, l]
        }, d.clamp = function (t) {
            return arguments.length ? (h = !!t, d) : h
        }, d.interpolator = function (t) {
            return arguments.length ? (f = t, d) : f
        }, d.range = p(Ff), d.rangeRound = p(Sf), d.unknown = function (t) {
            return arguments.length ? (a = t, d) : a
        }, function (a) {
            return o = a, t = a(u), e = a(s), n = a(l), r = t === e ? 0 : .5 / (e - t), i = e === n ? 0 : .5 / (n - e), c = e < t ? -1 : 1, d
        }
    }

    function Uh() {
        var t = wh(Lh());
        return t.copy = function () {
            return Nh(t, Uh()).exponent(t.exponent())
        }, Zl.apply(t, arguments)
    }

    function qh(t, e, n) {
        const r = t - e + 2 * n;
        return t ? r > 0 ? r : 1 : 0
    }

    const Ph = "linear", jh = "log", Ih = "pow", $h = "sqrt", Wh = "symlog", Hh = "time", Yh = "utc", Vh = "sequential",
        Gh = "diverging", Xh = "quantile", Jh = "quantize", Zh = "threshold", Qh = "ordinal", Kh = "point", td = "band",
        ed = "bin-ordinal", nd = "continuous", rd = "discrete", id = "discretizing", od = "interpolating",
        ad = "temporal";

    function ud() {
        const t = Kl().unknown(void 0), e = t.domain, n = t.range;
        let r, i, o = [0, 1], a = !1, u = 0, s = 0, l = .5;

        function c() {
            const t = e().length, c = o[1] < o[0], f = o[1 - c], h = qh(t, u, s);
            let d = o[c - 0];
            r = (f - d) / (h || 1), a && (r = Math.floor(r)), d += (f - d - r * (t - u)) * l, i = r * (1 - u), a && (d = Math.round(d), i = Math.round(i));
            const p = Re(t).map((t => d + r * t));
            return n(c ? p.reverse() : p)
        }

        return delete t.unknown, t.domain = function (t) {
            return arguments.length ? (e(t), c()) : e()
        }, t.range = function (t) {
            return arguments.length ? (o = [+t[0], +t[1]], c()) : o.slice()
        }, t.rangeRound = function (t) {
            return o = [+t[0], +t[1]], a = !0, c()
        }, t.bandwidth = function () {
            return i
        }, t.step = function () {
            return r
        }, t.round = function (t) {
            return arguments.length ? (a = !!t, c()) : a
        }, t.padding = function (t) {
            return arguments.length ? (s = Math.max(0, Math.min(1, t)), u = s, c()) : u
        }, t.paddingInner = function (t) {
            return arguments.length ? (u = Math.max(0, Math.min(1, t)), c()) : u
        }, t.paddingOuter = function (t) {
            return arguments.length ? (s = Math.max(0, Math.min(1, t)), c()) : s
        }, t.align = function (t) {
            return arguments.length ? (l = Math.max(0, Math.min(1, t)), c()) : l
        }, t.invertRange = function (t) {
            if (null == t[0] || null == t[1]) return;
            const r = o[1] < o[0], a = r ? n().reverse() : n(), u = a.length - 1;
            let s, l, c, f = +t[0], h = +t[1];
            return f != f || h != h || (h < f && (c = f, f = h, h = c), h < a[0] || f > o[1 - r]) ? void 0 : (s = Math.max(0, _e(a, f) - 1), l = f === h ? s : _e(a, h) - 1, f - a[s] > i + 1e-10 && ++s, r && (c = s, s = u - l, l = u - c), s > l ? void 0 : e().slice(s, l + 1))
        }, t.invert = function (e) {
            const n = t.invertRange([e, e]);
            return n ? n[0] : n
        }, t.copy = function () {
            return ud().domain(e()).range(o).round(a).paddingInner(u).paddingOuter(s).align(l)
        }, c()
    }

    function sd(t) {
        const e = t.copy;
        return t.padding = t.paddingOuter, delete t.paddingInner, t.copy = function () {
            return sd(e())
        }, t
    }

    var ld = Array.prototype.map;

    function cd(t) {
        return ld.call(t, A)
    }

    const fd = Array.prototype.slice;
    const hd = {};

    function dd(t, e, n) {
        const r = function () {
            const n = e();
            return n.invertRange || (n.invertRange = n.invert ? function (t) {
                return function (e) {
                    let n, r = e[0], i = e[1];
                    return i < r && (n = r, r = i, i = n), [t.invert(r), t.invert(i)]
                }
            }(n) : n.invertExtent ? function (t) {
                return function (e) {
                    const n = t.range();
                    let r, i, o, a, u = e[0], s = e[1], l = -1;
                    for (s < u && (i = u, u = s, s = i), o = 0, a = n.length; o < a; ++o) n[o] >= u && n[o] <= s && (l < 0 && (l = o), r = o);
                    if (!(l < 0)) return u = t.invertExtent(n[l]), s = t.invertExtent(n[r]), [void 0 === u[0] ? u[1] : u[0], void 0 === s[1] ? s[0] : s[1]]
                }
            }(n) : void 0), n.type = t, n
        };
        return r.metadata = Dt($(n)), r
    }

    function pd(t, e, n) {
        return arguments.length > 1 ? (hd[t] = dd(t, e, n), this) : gd(t) ? hd[t] : void 0
    }

    function gd(t) {
        return rt(hd, t)
    }

    function md(t, e) {
        const n = hd[t];
        return n && n.metadata[e]
    }

    function yd(t) {
        return md(t, nd)
    }

    function vd(t) {
        return md(t, rd)
    }

    function _d(t) {
        return md(t, id)
    }

    function xd(t) {
        return md(t, jh)
    }

    function bd(t) {
        return md(t, od)
    }

    function wd(t) {
        return md(t, Xh)
    }

    pd("identity", (function t(e) {
        var n;

        function r(t) {
            return isNaN(t = +t) ? n : t
        }

        return r.invert = r, r.domain = r.range = function (t) {
            return arguments.length ? (e = Array.from(t, Zf), r) : e.slice()
        }, r.unknown = function (t) {
            return arguments.length ? (n = t, r) : n
        }, r.copy = function () {
            return t(e).unknown(n)
        }, e = arguments.length ? Array.from(e, Zf) : [0, 1], uh(r)
    })), pd(Ph, (function t() {
        var e = oh();
        return e.copy = function () {
            return rh(e, t())
        }, Jl.apply(e, arguments), uh(e)
    }), nd), pd(jh, (function t() {
        var e = gh(ih()).domain([1, 10]);
        return e.copy = function () {
            return rh(e, t()).base(e.base())
        }, Jl.apply(e, arguments), e
    }), [nd, jh]), pd(Ih, kh, nd), pd($h, (function () {
        return kh.apply(null, arguments).exponent(.5)
    }), nd), pd(Wh, (function t() {
        var e = vh(ih());
        return e.copy = function () {
            return rh(e, t()).constant(e.constant())
        }, Jl.apply(e, arguments)
    }), nd), pd(Hh, (function () {
        return Jl.apply(Th(bn, xn, yn, gn, pn, dn, hn, an, Hr).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments)
    }), [nd, ad]), pd(Yh, (function () {
        return Jl.apply(Th(Sn, Fn, En, Mn, kn, wn, hn, an, Vr).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments)
    }), [nd, ad]), pd(Vh, Oh, [nd, od]), pd("".concat(Vh, "-").concat(Ph), Oh, [nd, od]), pd("".concat(Vh, "-").concat(jh), (function t() {
        var e = gh(zh()).domain([1, 10]);
        return e.copy = function () {
            return Nh(e, t()).base(e.base())
        }, Zl.apply(e, arguments)
    }), [nd, od, jh]), pd("".concat(Vh, "-").concat(Ih), Rh, [nd, od]), pd("".concat(Vh, "-").concat($h), (function () {
        return Rh.apply(null, arguments).exponent(.5)
    }), [nd, od]), pd("".concat(Vh, "-").concat(Wh), (function t() {
        var e = vh(zh());
        return e.copy = function () {
            return Nh(e, t()).constant(e.constant())
        }, Zl.apply(e, arguments)
    }), [nd, od]), pd("".concat(Gh, "-").concat(Ph), (function t() {
        var e = uh(Lh()(Kf));
        return e.copy = function () {
            return Nh(e, t())
        }, Zl.apply(e, arguments)
    }), [nd, od]), pd("".concat(Gh, "-").concat(jh), (function t() {
        var e = gh(Lh()).domain([.1, 1, 10]);
        return e.copy = function () {
            return Nh(e, t()).base(e.base())
        }, Zl.apply(e, arguments)
    }), [nd, od, jh]), pd("".concat(Gh, "-").concat(Ih), Uh, [nd, od]), pd("".concat(Gh, "-").concat($h), (function () {
        return Uh.apply(null, arguments).exponent(.5)
    }), [nd, od]), pd("".concat(Gh, "-").concat(Wh), (function t() {
        var e = vh(Lh());
        return e.copy = function () {
            return Nh(e, t()).constant(e.constant())
        }, Zl.apply(e, arguments)
    }), [nd, od]), pd(Xh, (function t() {
        var e, n = [], r = [], i = [];

        function o() {
            var t = 0, e = Math.max(1, r.length);
            for (i = new Array(e - 1); ++t < e;) i[t - 1] = ze(n, t / e);
            return a
        }

        function a(t) {
            return isNaN(t = +t) ? e : r[_e(i, t)]
        }

        return a.invertExtent = function (t) {
            var e = r.indexOf(t);
            return e < 0 ? [NaN, NaN] : [e > 0 ? i[e - 1] : n[0], e < i.length ? i[e] : n[n.length - 1]]
        }, a.domain = function (t) {
            if (!arguments.length) return n.slice();
            n = [];
            for (let e of t) null == e || isNaN(e = +e) || n.push(e);
            return n.sort(ge), o()
        }, a.range = function (t) {
            return arguments.length ? (r = Array.from(t), o()) : r.slice()
        }, a.unknown = function (t) {
            return arguments.length ? (e = t, a) : e
        }, a.quantiles = function () {
            return i.slice()
        }, a.copy = function () {
            return t().domain(n).range(r).unknown(e)
        }, Jl.apply(a, arguments)
    }), [id, Xh]), pd(Jh, (function t() {
        var e, n = 0, r = 1, i = 1, o = [.5], a = [0, 1];

        function u(t) {
            return t <= t ? a[_e(o, t, 0, i)] : e
        }

        function s() {
            var t = -1;
            for (o = new Array(i); ++t < i;) o[t] = ((t + 1) * r - (t - i) * n) / (i + 1);
            return u
        }

        return u.domain = function (t) {
            return arguments.length ? ([n, r] = t, n = +n, r = +r, s()) : [n, r]
        }, u.range = function (t) {
            return arguments.length ? (i = (a = Array.from(t)).length - 1, s()) : a.slice()
        }, u.invertExtent = function (t) {
            var e = a.indexOf(t);
            return e < 0 ? [NaN, NaN] : e < 1 ? [n, o[0]] : e >= i ? [o[i - 1], r] : [o[e - 1], o[e]]
        }, u.unknown = function (t) {
            return arguments.length ? (e = t, u) : u
        }, u.thresholds = function () {
            return o.slice()
        }, u.copy = function () {
            return t().domain([n, r]).range(a).unknown(e)
        }, Jl.apply(uh(u), arguments)
    }), id), pd(Zh, (function t() {
        var e, n = [.5], r = [0, 1], i = 1;

        function o(t) {
            return t <= t ? r[_e(n, t, 0, i)] : e
        }

        return o.domain = function (t) {
            return arguments.length ? (n = Array.from(t), i = Math.min(n.length, r.length - 1), o) : n.slice()
        }, o.range = function (t) {
            return arguments.length ? (r = Array.from(t), i = Math.min(n.length, r.length - 1), o) : r.slice()
        }, o.invertExtent = function (t) {
            var e = r.indexOf(t);
            return [n[e - 1], n[e]]
        }, o.unknown = function (t) {
            return arguments.length ? (e = t, o) : e
        }, o.copy = function () {
            return t().domain(n).range(r).unknown(e)
        }, Jl.apply(o, arguments)
    }), id), pd(ed, (function t() {
        let e = [], n = [];

        function r(t) {
            return null == t || t != t ? void 0 : n[(_e(e, t) - 1) % n.length]
        }

        return r.domain = function (t) {
            return arguments.length ? (e = cd(t), r) : e.slice()
        }, r.range = function (t) {
            return arguments.length ? (n = fd.call(t), r) : n.slice()
        }, r.tickFormat = function (t, n) {
            return ah(e[0], M(e), null == t ? 10 : t, n)
        }, r.copy = function () {
            return t().domain(r.domain()).range(r.range())
        }, r
    }), [rd, id]), pd(Qh, Kl, rd), pd(td, ud, rd), pd(Kh, (function () {
        return sd(ud().paddingInner(1))
    }), rd);
    const kd = ["clamp", "base", "constant", "exponent"];

    function Md(t, e) {
        const n = e[0], r = M(e) - n;
        return function (e) {
            return t(n + e * r)
        }
    }

    function Ad(t, e, n) {
        return Xf(Cd(e || "rgb", n), t)
    }

    function Ed(t, e) {
        const n = new Array(e), r = e + 1;
        for (let i = 0; i < e;) n[i] = t(++i / r);
        return n
    }

    function Dd(t, e, n) {
        const r = n - e;
        let i, o, a;
        return r && Number.isFinite(r) ? (i = (o = t.type).indexOf("-"), o = i < 0 ? o : o.slice(i + 1), a = pd(o)().domain([e, n]).range([0, 1]), kd.forEach((e => t[e] ? a[e](t[e]()) : 0)), a) : Z(.5)
    }

    function Cd(t, e) {
        const n = Jf[function (t) {
            return "interpolate" + t.toLowerCase().split("-").map((t => t[0].toUpperCase() + t.slice(1))).join("")
        }(t)];
        return null != e && n && n.gamma ? n.gamma(e) : n
    }

    function Fd(t) {
        const e = t.length / 6 | 0, n = new Array(e);
        for (let r = 0; r < e;) n[r] = "#" + t.slice(6 * r, 6 * ++r);
        return n
    }

    function Sd(t, e) {
        for (const n in t) Td(n, e(t[n]))
    }

    const Bd = {};

    function Td(t, e) {
        return t = t && t.toLowerCase(), arguments.length > 1 ? (Bd[t] = e, this) : Bd[t]
    }

    Sd({
        category10: "1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf",
        category20: "1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5",
        category20b: "393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6",
        category20c: "3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9",
        tableau10: "4c78a8f58518e4575672b7b254a24beeca3bb279a2ff9da69d755dbab0ac",
        tableau20: "4c78a89ecae9f58518ffbf7954a24b88d27ab79a20f2cf5b43989483bcb6e45756ff9d9879706ebab0acd67195fcbfd2b279a2d6a5c99e765fd8b5a5",
        accent: "7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666",
        dark2: "1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666",
        paired: "a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928",
        pastel1: "fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2",
        pastel2: "b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc",
        set1: "e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999",
        set2: "66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3",
        set3: "8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f"
    }, Fd), Sd({
        blues: "cfe1f2bed8eca8cee58fc1de74b2d75ba3cf4592c63181bd206fb2125ca40a4a90",
        greens: "d3eecdc0e6baabdda594d3917bc77d60ba6c46ab5e329a512089430e7735036429",
        greys: "e2e2e2d4d4d4c4c4c4b1b1b19d9d9d8888887575756262624d4d4d3535351e1e1e",
        oranges: "fdd8b3fdc998fdb87bfda55efc9244f87f2cf06b18e4580bd14904b93d029f3303",
        purples: "e2e1efd4d4e8c4c5e0b4b3d6a3a0cc928ec3827cb97566ae684ea25c3696501f8c",
        reds: "fdc9b4fcb49afc9e80fc8767fa7051f6573fec3f2fdc2a25c81b1db21218970b13",
        blueGreen: "d5efedc1e8e0a7ddd18bd2be70c6a958ba9144ad77319c5d2089460e7736036429",
        bluePurple: "ccddecbad0e4a8c2dd9ab0d4919cc98d85be8b6db28a55a6873c99822287730f71",
        greenBlue: "d3eecec5e8c3b1e1bb9bd8bb82cec269c2ca51b2cd3c9fc7288abd1675b10b60a1",
        orangeRed: "fddcaffdcf9bfdc18afdad77fb9562f67d53ee6545e24932d32d1ebf130da70403",
        purpleBlue: "dbdaebc8cee4b1c3de97b7d87bacd15b9fc93a90c01e7fb70b70ab056199045281",
        purpleBlueGreen: "dbd8eac8cee4b0c3de93b7d872acd1549fc83892bb1c88a3097f8702736b016353",
        purpleRed: "dcc9e2d3b3d7ce9eccd186c0da6bb2e14da0e23189d91e6fc61159ab07498f023a",
        redPurple: "fccfccfcbec0faa9b8f98faff571a5ec539ddb3695c41b8aa908808d0179700174",
        yellowGreen: "e4f4acd1eca0b9e2949ed68880c97c62bb6e47aa5e3297502083440e723b036034",
        yellowOrangeBrown: "feeaa1fedd84fecc63feb746fca031f68921eb7215db5e0bc54c05ab3d038f3204",
        yellowOrangeRed: "fee087fed16ffebd59fea849fd903efc7335f9522bee3423de1b20ca0b22af0225",
        blueOrange: "134b852f78b35da2cb9dcae1d2e5eff2f0ebfce0bafbbf74e8932fc5690d994a07",
        brownBlueGreen: "704108a0651ac79548e3c78af3e6c6eef1eac9e9e48ed1c74da79e187a72025147",
        purpleGreen: "5b1667834792a67fb6c9aed3e6d6e8eff0efd9efd5aedda971bb75368e490e5e29",
        purpleOrange: "4114696647968f83b7b9b4d6dadbebf3eeeafce0bafbbf74e8932fc5690d994a07",
        redBlue: "8c0d25bf363adf745ef4ae91fbdbc9f2efeed2e5ef9dcae15da2cb2f78b3134b85",
        redGrey: "8c0d25bf363adf745ef4ae91fcdccbfaf4f1e2e2e2c0c0c0969696646464343434",
        yellowGreenBlue: "eff9bddbf1b4bde5b594d5b969c5be45b4c22c9ec02182b82163aa23479c1c3185",
        redYellowBlue: "a50026d4322cf16e43fcac64fedd90faf8c1dcf1ecabd6e875abd04a74b4313695",
        redYellowGreen: "a50026d4322cf16e43fcac63fedd8df9f7aed7ee8ea4d86e64bc6122964f006837",
        pinkYellowGreen: "8e0152c0267edd72adf0b3d6faddedf5f3efe1f2cab6de8780bb474f9125276419",
        spectral: "9e0142d13c4bf0704afcac63fedd8dfbf8b0e0f3a1a9dda269bda94288b55e4fa2",
        viridis: "440154470e61481a6c482575472f7d443a834144873d4e8a39568c35608d31688e2d708e2a788e27818e23888e21918d1f988b1fa08822a8842ab07f35b77943bf7154c56866cc5d7ad1518fd744a5db36bcdf27d2e21be9e51afde725",
        magma: "0000040404130b0924150e3720114b2c11603b0f704a107957157e651a80721f817f24828c29819a2e80a8327db6377ac43c75d1426fde4968e95462f1605df76f5cfa7f5efc8f65fe9f6dfeaf78febf84fece91fddea0fcedaffcfdbf",
        inferno: "0000040403130c0826170c3b240c4f330a5f420a68500d6c5d126e6b176e781c6d86216b932667a12b62ae305cbb3755c73e4cd24644dd513ae65c30ed6925f3771af8850ffb9506fca50afcb519fac62df6d645f2e661f3f484fcffa4",
        plasma: "0d088723069033059742039d5002a25d01a66a00a87801a88405a7900da49c179ea72198b12a90ba3488c33d80cb4779d35171da5a69e16462e76e5bed7953f2834cf68f44fa9a3dfca636fdb32ffec029fcce25f9dc24f5ea27f0f921",
        cividis: "00205100235800265d002961012b65042e670831690d346b11366c16396d1c3c6e213f6e26426e2c456e31476e374a6e3c4d6e42506e47536d4c566d51586e555b6e5a5e6e5e616e62646f66676f6a6a706e6d717270717573727976737c79747f7c75827f758682768985778c8877908b78938e789691789a94789e9778a19b78a59e77a9a177aea575b2a874b6ab73bbaf71c0b26fc5b66dc9b96acebd68d3c065d8c462ddc85fe2cb5ce7cf58ebd355f0d652f3da4ff7de4cfae249fce647",
        rainbow: "6e40aa883eb1a43db3bf3cafd83fa4ee4395fe4b83ff576eff6659ff7847ff8c38f3a130e2b72fcfcc36bee044aff05b8ff4576ff65b52f6673af27828ea8d1ddfa319d0b81cbecb23abd82f96e03d82e14c6edb5a5dd0664dbf6e40aa",
        sinebow: "ff4040fc582af47218e78d0bd5a703bfbf00a7d5038de70b72f41858fc2a40ff402afc5818f4720be78d03d5a700bfbf03a7d50b8de71872f42a58fc4040ff582afc7218f48d0be7a703d5bf00bfd503a7e70b8df41872fc2a58ff4040",
        turbo: "23171b32204a3e2a71453493493eae4b49c54a53d7485ee44569ee4074f53c7ff8378af93295f72e9ff42ba9ef28b3e926bce125c5d925cdcf27d5c629dcbc2de3b232e9a738ee9d3ff39347f68950f9805afc7765fd6e70fe667cfd5e88fc5795fb51a1f84badf545b9f140c5ec3cd0e637dae034e4d931ecd12ef4c92bfac029ffb626ffad24ffa223ff9821ff8d1fff821dff771cfd6c1af76118f05616e84b14df4111d5380fcb2f0dc0260ab61f07ac1805a313029b0f00950c00910b00",
        browns: "eedbbdecca96e9b97ae4a865dc9856d18954c7784cc0673fb85536ad44339f3632",
        tealBlues: "bce4d89dd3d181c3cb65b3c245a2b9368fae347da0306a932c5985",
        teals: "bbdfdfa2d4d58ac9c975bcbb61b0af4da5a43799982b8b8c1e7f7f127273006667",
        warmGreys: "dcd4d0cec5c1c0b8b4b3aaa7a59c9998908c8b827f7e7673726866665c5a59504e",
        goldGreen: "f4d166d5ca60b6c35c98bb597cb25760a6564b9c533f8f4f33834a257740146c36",
        goldOrange: "f4d166f8be5cf8aa4cf5983bf3852aef701be2621fd65322c54923b142239e3a26",
        goldRed: "f4d166f6be59f9aa51fc964ef6834bee734ae56249db5247cf4244c43141b71d3e",
        lightGreyRed: "efe9e6e1dad7d5cbc8c8bdb9bbaea9cd967ddc7b43e15f19df4011dc000b",
        lightGreyTeal: "e4eaead6dcddc8ced2b7c2c7a6b4bc64b0bf22a6c32295c11f85be1876bc",
        lightMulti: "e0f1f2c4e9d0b0de9fd0e181f6e072f6c053f3993ef77440ef4a3c",
        lightOrange: "f2e7daf7d5baf9c499fab184fa9c73f68967ef7860e8645bde515bd43d5b",
        lightTealBlue: "e3e9e0c0dccf9aceca7abfc859afc0389fb9328dad2f7ca0276b95255988",
        darkBlue: "3232322d46681a5c930074af008cbf05a7ce25c0dd38daed50f3faffffff",
        darkGold: "3c3c3c584b37725e348c7631ae8b2bcfa424ecc31ef9de30fff184ffffff",
        darkGreen: "3a3a3a215748006f4d048942489e4276b340a6c63dd2d836ffeb2cffffaa",
        darkMulti: "3737371f5287197d8c29a86995ce3fffe800ffffff",
        darkRed: "3434347036339e3c38cc4037e75d1eec8620eeab29f0ce32ffeb2c"
    }, (t => Ad(Fd(t))));
    const zd = "symbol", Nd = t => v(t) ? t.map((t => String(t))) : String(t), Od = (t, e) => t[1] - e[1],
        Rd = (t, e) => e[1] - t[1];

    function Ld(t, e, n) {
        let r;
        return ht(e) && (t.bins && (e = Math.max(e, t.bins.length)), null != n && (e = Math.min(e, Math.floor(bt(t.domain()) / n || 1)))), _(e) && (r = e.step, e = e.interval), pt(e) && (e = t.type === Hh ? yr(e) : t.type == Yh ? vr(e) : u("Only time and utc scales accept interval strings."), r && (e = e.every(r))), e
    }

    function Ud(t, e, n) {
        let r = t.range(), i = r[0], o = M(r), a = Od;
        if (i > o && (r = o, o = i, i = r, a = Rd), i = Math.floor(i), o = Math.ceil(o), e = e.map((e => [e, t(e)])).filter((t => i <= t[1] && t[1] <= o)).sort(a).map((t => t[0])), n > 0 && e.length > 1) {
            const t = [e[0], M(e)];
            for (; e.length > n && e.length >= 3;) e = e.filter(((t, e) => !(e % 2)));
            e.length < 3 && (e = t)
        }
        return e
    }

    function qd(t, e) {
        return t.bins ? Ud(t, t.bins) : t.ticks ? t.ticks(e) : t.domain()
    }

    function Pd(t, e, n, r, i, o) {
        const a = e.type;
        let u = Nd;
        if (a === Hh || i === Hh) u = t.timeFormat(r); else if (a === Yh || i === Yh) u = t.utcFormat(r); else if (xd(a)) {
            const i = t.formatFloat(r);
            if (o || e.bins) u = i; else {
                const t = jd(e, n, !1);
                u = e => t(e) ? i(e) : ""
            }
        } else if (e.tickFormat) {
            const i = e.domain();
            u = t.formatSpan(i[0], i[i.length - 1], n, r)
        } else r && (u = t.format(r));
        return u
    }

    function jd(t, e, n) {
        const r = qd(t, e), i = t.base(), o = Math.log(i), a = Math.max(1, i * e / r.length), u = t => {
            let e = t / Math.pow(i, Math.round(Math.log(t) / o));
            return e * i < i - .5 && (e *= i), e <= a
        };
        return n ? r.filter(u) : u
    }

    const Id = {[Xh]: "quantiles", [Jh]: "thresholds", [Zh]: "domain"}, $d = {[Xh]: "quantiles", [Jh]: "domain"};

    function Wd(t, e) {
        return t.bins ? function (t) {
            const e = t.slice(0, -1);
            return e.max = M(t), e
        }(t.bins) : t.type === jh ? jd(t, e, !0) : Id[t.type] ? function (t) {
            const e = [-1 / 0].concat(t);
            return e.max = 1 / 0, e
        }(t[Id[t.type]]()) : qd(t, e)
    }

    function Hd(t, e, n, r, i, o, a) {
        const u = $d[e.type] && o !== Hh && o !== Yh ? function (t, e, n) {
            const r = e[$d[e.type]](), i = r.length;
            let o, a = i > 1 ? r[1] - r[0] : r[0];
            for (o = 1; o < i; ++o) a = Math.min(a, r[o] - r[o - 1]);
            return t.formatSpan(0, a, 30, n)
        }(t, e, i) : Pd(t, e, n, i, o, a);
        return r === zd && (t => Id[t.type] || t.bins)(e) ? Yd(u) : "discrete" === r ? Gd(u) : Xd(u)
    }

    const Yd = t => (e, n, r) => {
            const i = Vd(r[n + 1], Vd(r.max, 1 / 0)), o = Jd(e, t), a = Jd(i, t);
            return o && a ? o + " – " + a : a ? "< " + a : "≥ " + o
        }, Vd = (t, e) => null != t ? t : e, Gd = t => (e, n) => n ? t(e) : null, Xd = t => e => t(e),
        Jd = (t, e) => Number.isFinite(t) ? e(t) : null;

    function Zd(t, e, n, r) {
        const i = r || e.type;
        return pt(n) && function (t) {
            return md(t, ad)
        }(i) && (n = n.replace(/%a/g, "%A").replace(/%b/g, "%B")), n || i !== Hh ? n || i !== Yh ? Hd(t, e, 5, null, n, r, !0) : t.utcFormat("%A, %d %B %Y, %X UTC") : t.timeFormat("%A, %d %B %Y, %X")
    }

    function Qd(t, e, n) {
        n = n || {};
        const r = Math.max(3, n.maxlen || 7), i = Zd(t, e, n.format, n.formatType);
        if (_d(e.type)) {
            const t = Wd(e).slice(1).map(i), n = t.length;
            return "".concat(n, " boundar").concat(1 === n ? "y" : "ies", ": ").concat(t.join(", "))
        }
        if (vd(e.type)) {
            const t = e.domain(), n = t.length,
                o = n > r ? t.slice(0, r - 2).map(i).join(", ") + ", ending with " + t.slice(-1).map(i) : t.map(i).join(", ");
            return "".concat(n, " value").concat(1 === n ? "" : "s", ": ").concat(o)
        }
        {
            const t = e.domain();
            return "values from ".concat(i(t[0]), " to ").concat(i(M(t)))
        }
    }

    let Kd = 0;
    const tp = "p_";

    function ep(t) {
        return t && t.gradient
    }

    function np(t, e, n) {
        const r = t.gradient;
        let i = t.id, o = "radial" === r ? tp : "";
        return i || (i = t.id = "gradient_" + Kd++, "radial" === r ? (t.x1 = rp(t.x1, .5), t.y1 = rp(t.y1, .5), t.r1 = rp(t.r1, 0), t.x2 = rp(t.x2, .5), t.y2 = rp(t.y2, .5), t.r2 = rp(t.r2, .5), o = tp) : (t.x1 = rp(t.x1, 0), t.y1 = rp(t.y1, 0), t.x2 = rp(t.x2, 1), t.y2 = rp(t.y2, 0))), e[i] = t, "url(" + (n || "") + "#" + o + i + ")"
    }

    function rp(t, e) {
        return null != t ? t : e
    }

    function ip(t, e) {
        var n, r = [];
        return n = {
            gradient: "linear",
            x1: t ? t[0] : 0,
            y1: t ? t[1] : 0,
            x2: e ? e[0] : 1,
            y2: e ? e[1] : 0,
            stops: r,
            stop: function (t, e) {
                return r.push({offset: t, color: e}), n
            }
        }
    }

    const op = {
        basis: {
            curve: function (t) {
                return new vl(t)
            }
        },
        "basis-closed": {
            curve: function (t) {
                return new _l(t)
            }
        },
        "basis-open": {
            curve: function (t) {
                return new xl(t)
            }
        },
        bundle: {curve: wl, tension: "beta", value: .85},
        cardinal: {curve: Al, tension: "tension", value: 0},
        "cardinal-open": {curve: Fl, tension: "tension", value: 0},
        "cardinal-closed": {curve: Dl, tension: "tension", value: 0},
        "catmull-rom": {curve: Tl, tension: "alpha", value: .5},
        "catmull-rom-closed": {curve: Nl, tension: "alpha", value: .5},
        "catmull-rom-open": {curve: Rl, tension: "alpha", value: .5},
        linear: {curve: cl},
        "linear-closed": {
            curve: function (t) {
                return new Ll(t)
            }
        },
        monotone: {
            horizontal: function (t) {
                return new $l(t)
            }, vertical: function (t) {
                return new Il(t)
            }
        },
        natural: {
            curve: function (t) {
                return new Hl(t)
            }
        },
        step: {
            curve: function (t) {
                return new Vl(t, .5)
            }
        },
        "step-after": {
            curve: function (t) {
                return new Vl(t, 1)
            }
        },
        "step-before": {
            curve: function (t) {
                return new Vl(t, 0)
            }
        }
    };

    function ap(t, e, n) {
        var r = rt(op, t) && op[t], i = null;
        return r && (i = r.curve || r[e || "vertical"], r.tension && null != n && (i = i[r.tension](n))), i
    }

    const up = {m: 2, l: 2, h: 1, v: 1, c: 6, s: 4, q: 4, t: 2, a: 7},
        sp = [/([MLHVCSQTAZmlhvcsqtaz])/g, /###/, /(\.\d+)(\.\d)/g, /(\d)([-+])/g, /\s|,|###/];

    function lp(t) {
        const e = [];
        let n, r, i, o, a, u, s, l, c, f;
        const h = t.slice().replace(sp[0], "###$1").split(sp[1]).slice(1);
        for (s = 0, c = h.length; s < c; ++s) {
            for (n = h[s], r = n.slice(1).trim().replace(sp[2], "$1###$2").replace(sp[3], "$1###$2").split(sp[4]), a = n.charAt(0), i = [a], l = 0, f = r.length; l < f; ++l) (o = +r[l]) === o && i.push(o);
            if (u = up[a.toLowerCase()], i.length - 1 > u) {
                const t = i.length;
                for (l = 1, e.push([a].concat(i.slice(l, l += u))), a = "M" === a ? "L" : "m" === a ? "l" : a; l < t; l += u) e.push([a].concat(i.slice(l, l + u)))
            } else e.push(i)
        }
        return e
    }

    const cp = Math.PI / 180, fp = Math.PI / 2, hp = 2 * Math.PI, dp = Math.sqrt(3) / 2;
    var pp = {}, gp = {}, mp = [].join;

    function yp(t) {
        const e = mp.call(t);
        if (gp[e]) return gp[e];
        var n = t[0], r = t[1], i = t[2], o = t[3], a = t[4], u = t[5], s = t[6], l = t[7];
        const c = l * a, f = -s * u, h = s * a, d = l * u, p = Math.cos(i), g = Math.sin(i), m = Math.cos(o),
            y = Math.sin(o), v = .5 * (o - i), _ = Math.sin(.5 * v), x = 8 / 3 * _ * _ / Math.sin(v), b = n + p - x * g,
            w = r + g + x * p, k = n + m, M = r + y, A = k + x * y, E = M - x * m;
        return gp[e] = [c * b + f * w, h * b + d * w, c * A + f * E, h * A + d * E, c * k + f * M, h * k + d * M]
    }

    const vp = ["l", 0, 0, 0, 0, 0, 0, 0];

    function _p(t, e, n) {
        const r = vp[0] = t[0];
        if ("a" === r || "A" === r) vp[1] = e * t[1], vp[2] = n * t[2], vp[3] = t[3], vp[4] = t[4], vp[5] = t[5], vp[6] = e * t[6], vp[7] = n * t[7]; else if ("h" === r || "H" === r) vp[1] = e * t[1]; else if ("v" === r || "V" === r) vp[1] = n * t[1]; else for (var i = 1, o = t.length; i < o; ++i) vp[i] = (i % 2 == 1 ? e : n) * t[i];
        return vp
    }

    function xp(t, e, n, r, i, o) {
        var a, u, s, l, c, f = null, h = 0, d = 0, p = 0, g = 0;
        null == n && (n = 0), null == r && (r = 0), null == i && (i = 1), null == o && (o = i), t.beginPath && t.beginPath();
        for (var m = 0, y = e.length; m < y; ++m) {
            switch (a = e[m], 1 === i && 1 === o || (a = _p(a, i, o)), a[0]) {
                case"l":
                    h += a[1], d += a[2], t.lineTo(h + n, d + r);
                    break;
                case"L":
                    h = a[1], d = a[2], t.lineTo(h + n, d + r);
                    break;
                case"h":
                    h += a[1], t.lineTo(h + n, d + r);
                    break;
                case"H":
                    h = a[1], t.lineTo(h + n, d + r);
                    break;
                case"v":
                    d += a[1], t.lineTo(h + n, d + r);
                    break;
                case"V":
                    d = a[1], t.lineTo(h + n, d + r);
                    break;
                case"m":
                    h += a[1], d += a[2], t.moveTo(h + n, d + r);
                    break;
                case"M":
                    h = a[1], d = a[2], t.moveTo(h + n, d + r);
                    break;
                case"c":
                    u = h + a[5], s = d + a[6], p = h + a[3], g = d + a[4], t.bezierCurveTo(h + a[1] + n, d + a[2] + r, p + n, g + r, u + n, s + r), h = u, d = s;
                    break;
                case"C":
                    h = a[5], d = a[6], p = a[3], g = a[4], t.bezierCurveTo(a[1] + n, a[2] + r, p + n, g + r, h + n, d + r);
                    break;
                case"s":
                    u = h + a[3], s = d + a[4], p = 2 * h - p, g = 2 * d - g, t.bezierCurveTo(p + n, g + r, h + a[1] + n, d + a[2] + r, u + n, s + r), p = h + a[1], g = d + a[2], h = u, d = s;
                    break;
                case"S":
                    u = a[3], s = a[4], p = 2 * h - p, g = 2 * d - g, t.bezierCurveTo(p + n, g + r, a[1] + n, a[2] + r, u + n, s + r), h = u, d = s, p = a[1], g = a[2];
                    break;
                case"q":
                    u = h + a[3], s = d + a[4], p = h + a[1], g = d + a[2], t.quadraticCurveTo(p + n, g + r, u + n, s + r), h = u, d = s;
                    break;
                case"Q":
                    u = a[3], s = a[4], t.quadraticCurveTo(a[1] + n, a[2] + r, u + n, s + r), h = u, d = s, p = a[1], g = a[2];
                    break;
                case"t":
                    u = h + a[1], s = d + a[2], null === f[0].match(/[QqTt]/) ? (p = h, g = d) : "t" === f[0] ? (p = 2 * h - l, g = 2 * d - c) : "q" === f[0] && (p = 2 * h - p, g = 2 * d - g), l = p, c = g, t.quadraticCurveTo(p + n, g + r, u + n, s + r), d = s, p = (h = u) + a[1], g = d + a[2];
                    break;
                case"T":
                    u = a[1], s = a[2], p = 2 * h - p, g = 2 * d - g, t.quadraticCurveTo(p + n, g + r, u + n, s + r), h = u, d = s;
                    break;
                case"a":
                    bp(t, h + n, d + r, [a[1], a[2], a[3], a[4], a[5], a[6] + h + n, a[7] + d + r]), h += a[6], d += a[7];
                    break;
                case"A":
                    bp(t, h + n, d + r, [a[1], a[2], a[3], a[4], a[5], a[6] + n, a[7] + r]), h = a[6], d = a[7];
                    break;
                case"z":
                case"Z":
                    t.closePath()
            }
            f = a
        }
    }

    function bp(t, e, n, r) {
        const i = function (t, e, n, r, i, o, a, u, s) {
            const l = mp.call(arguments);
            if (pp[l]) return pp[l];
            const c = a * cp, f = Math.sin(c), h = Math.cos(c), d = h * (u - t) * .5 + f * (s - e) * .5,
                p = h * (s - e) * .5 - f * (u - t) * .5;
            let g = d * d / ((n = Math.abs(n)) * n) + p * p / ((r = Math.abs(r)) * r);
            g > 1 && (g = Math.sqrt(g), n *= g, r *= g);
            const m = h / n, y = f / n, v = -f / r, _ = h / r, x = m * u + y * s, b = v * u + _ * s, w = m * t + y * e,
                k = v * t + _ * e;
            let M = 1 / ((w - x) * (w - x) + (k - b) * (k - b)) - .25;
            M < 0 && (M = 0);
            let A = Math.sqrt(M);
            o == i && (A = -A);
            const E = .5 * (x + w) - A * (k - b), D = .5 * (b + k) + A * (w - x), C = Math.atan2(b - D, x - E);
            let F = Math.atan2(k - D, w - E) - C;
            F < 0 && 1 === o ? F += hp : F > 0 && 0 === o && (F -= hp);
            const S = Math.ceil(Math.abs(F / (fp + .001))), B = [];
            for (let t = 0; t < S; ++t) {
                const e = C + t * F / S, i = C + (t + 1) * F / S;
                B[t] = [E, D, e, i, n, r, f, h]
            }
            return pp[l] = B
        }(r[5], r[6], r[0], r[1], r[3], r[4], r[2], e, n);
        for (let e = 0; e < i.length; ++e) {
            const n = yp(i[e]);
            t.bezierCurveTo(n[0], n[1], n[2], n[3], n[4], n[5])
        }
    }

    const wp = .5773502691896257, kp = {
        circle: {
            draw: function (t, e) {
                const n = Math.sqrt(e) / 2;
                t.moveTo(n, 0), t.arc(0, 0, n, 0, hp)
            }
        }, cross: {
            draw: function (t, e) {
                var n = Math.sqrt(e) / 2, r = n / 2.5;
                t.moveTo(-n, -r), t.lineTo(-n, r), t.lineTo(-r, r), t.lineTo(-r, n), t.lineTo(r, n), t.lineTo(r, r), t.lineTo(n, r), t.lineTo(n, -r), t.lineTo(r, -r), t.lineTo(r, -n), t.lineTo(-r, -n), t.lineTo(-r, -r), t.closePath()
            }
        }, diamond: {
            draw: function (t, e) {
                const n = Math.sqrt(e) / 2;
                t.moveTo(-n, 0), t.lineTo(0, -n), t.lineTo(n, 0), t.lineTo(0, n), t.closePath()
            }
        }, square: {
            draw: function (t, e) {
                var n = Math.sqrt(e), r = -n / 2;
                t.rect(r, r, n, n)
            }
        }, arrow: {
            draw: function (t, e) {
                var n = Math.sqrt(e) / 2, r = n / 7, i = n / 2.5, o = n / 8;
                t.moveTo(-r, n), t.lineTo(r, n), t.lineTo(r, -o), t.lineTo(i, -o), t.lineTo(0, -n), t.lineTo(-i, -o), t.lineTo(-r, -o), t.closePath()
            }
        }, wedge: {
            draw: function (t, e) {
                var n = Math.sqrt(e) / 2, r = dp * n, i = r - n * wp, o = n / 4;
                t.moveTo(0, -r - i), t.lineTo(-o, r - i), t.lineTo(o, r - i), t.closePath()
            }
        }, triangle: {
            draw: function (t, e) {
                var n = Math.sqrt(e) / 2, r = dp * n, i = r - n * wp;
                t.moveTo(0, -r - i), t.lineTo(-n, r - i), t.lineTo(n, r - i), t.closePath()
            }
        }, "triangle-up": {
            draw: function (t, e) {
                var n = Math.sqrt(e) / 2, r = dp * n;
                t.moveTo(0, -r), t.lineTo(-n, r), t.lineTo(n, r), t.closePath()
            }
        }, "triangle-down": {
            draw: function (t, e) {
                var n = Math.sqrt(e) / 2, r = dp * n;
                t.moveTo(0, r), t.lineTo(-n, -r), t.lineTo(n, -r), t.closePath()
            }
        }, "triangle-right": {
            draw: function (t, e) {
                var n = Math.sqrt(e) / 2, r = dp * n;
                t.moveTo(r, 0), t.lineTo(-r, -n), t.lineTo(-r, n), t.closePath()
            }
        }, "triangle-left": {
            draw: function (t, e) {
                var n = Math.sqrt(e) / 2, r = dp * n;
                t.moveTo(-r, 0), t.lineTo(r, -n), t.lineTo(r, n), t.closePath()
            }
        }, stroke: {
            draw: function (t, e) {
                const n = Math.sqrt(e) / 2;
                t.moveTo(-n, 0), t.lineTo(n, 0)
            }
        }
    };

    function Mp(t) {
        return rt(kp, t) ? kp[t] : function (t) {
            if (!rt(Ap, t)) {
                const e = lp(t);
                Ap[t] = {
                    draw: function (t, n) {
                        xp(t, e, 0, 0, Math.sqrt(n) / 2)
                    }
                }
            }
            return Ap[t]
        }(t)
    }

    var Ap = {};
    const Ep = .448084975506;

    function Dp(t) {
        return t.x
    }

    function Cp(t) {
        return t.y
    }

    function Fp(t) {
        return t.width
    }

    function Sp(t) {
        return t.height
    }

    function Bp(t) {
        return "function" == typeof t ? t : () => +t
    }

    function Tp(t, e, n) {
        return Math.max(e, Math.min(t, n))
    }

    function zp() {
        var t = Dp, e = Cp, n = Fp, r = Sp, i = Bp(0), o = i, a = i, u = i, s = null;

        function l(l, c, f) {
            var h, d = null != c ? c : +t.call(this, l), p = null != f ? f : +e.call(this, l), g = +n.call(this, l),
                m = +r.call(this, l), y = Math.min(g, m) / 2, v = Tp(+i.call(this, l), 0, y),
                _ = Tp(+o.call(this, l), 0, y), x = Tp(+a.call(this, l), 0, y), b = Tp(+u.call(this, l), 0, y);
            if (s || (s = h = Ps()), v <= 0 && _ <= 0 && x <= 0 && b <= 0) s.rect(d, p, g, m); else {
                var w = d + g, k = p + m;
                s.moveTo(d + v, p), s.lineTo(w - _, p), s.bezierCurveTo(w - Ep * _, p, w, p + Ep * _, w, p + _), s.lineTo(w, k - b), s.bezierCurveTo(w, k - Ep * b, w - Ep * b, k, w - b, k), s.lineTo(d + x, k), s.bezierCurveTo(d + Ep * x, k, d, k - Ep * x, d, k - x), s.lineTo(d, p + v), s.bezierCurveTo(d, p + Ep * v, d + Ep * v, p, d + v, p), s.closePath()
            }
            if (h) return s = null, h + "" || null
        }

        return l.x = function (e) {
            return arguments.length ? (t = Bp(e), l) : t
        }, l.y = function (t) {
            return arguments.length ? (e = Bp(t), l) : e
        }, l.width = function (t) {
            return arguments.length ? (n = Bp(t), l) : n
        }, l.height = function (t) {
            return arguments.length ? (r = Bp(t), l) : r
        }, l.cornerRadius = function (t, e, n, r) {
            return arguments.length ? (i = Bp(t), o = null != e ? Bp(e) : i, u = null != n ? Bp(n) : i, a = null != r ? Bp(r) : o, l) : i
        }, l.context = function (t) {
            return arguments.length ? (s = null == t ? null : t, l) : s
        }, l
    }

    function Np() {
        var t, e, n, r, i, o, a, u, s = null;

        function l(t, e, n) {
            const r = n / 2;
            if (i) {
                var l = a - e, c = t - o;
                if (l || c) {
                    var f = Math.sqrt(l * l + c * c), h = (l /= f) * u, d = (c /= f) * u, p = Math.atan2(c, l);
                    s.moveTo(o - h, a - d), s.lineTo(t - l * r, e - c * r), s.arc(t, e, r, p - Math.PI, p), s.lineTo(o + h, a + d), s.arc(o, a, u, p, p + Math.PI)
                } else s.arc(t, e, r, 0, hp);
                s.closePath()
            } else i = 1;
            o = t, a = e, u = r
        }

        function c(o) {
            var a, u, c, f = o.length, h = !1;
            for (null == s && (s = c = Ps()), a = 0; a <= f; ++a) !(a < f && r(u = o[a], a, o)) === h && (h = !h) && (i = 0), h && l(+t(u, a, o), +e(u, a, o), +n(u, a, o));
            if (c) return s = null, c + "" || null
        }

        return c.x = function (e) {
            return arguments.length ? (t = e, c) : t
        }, c.y = function (t) {
            return arguments.length ? (e = t, c) : e
        }, c.size = function (t) {
            return arguments.length ? (n = t, c) : n
        }, c.defined = function (t) {
            return arguments.length ? (r = t, c) : r
        }, c.context = function (t) {
            return arguments.length ? (s = null == t ? null : t, c) : s
        }, c
    }

    function Op(t, e) {
        return null != t ? t : e
    }

    const Rp = t => t.x || 0, Lp = t => t.y || 0, Up = t => !(!1 === t.defined), qp = function () {
            var t = el, e = nl, n = js(0), r = null, i = rl, o = il, a = ol, u = null;

            function s() {
                var s, l, c = +t.apply(this, arguments), f = +e.apply(this, arguments), h = i.apply(this, arguments) - Zs,
                    d = o.apply(this, arguments) - Zs, p = Is(d - h), g = d > h;
                if (u || (u = s = Ps()), f < c && (l = f, f = c, c = l), f > Xs) if (p > Qs - Xs) u.moveTo(f * Ws(h), f * Vs(h)), u.arc(0, 0, f, h, d, !g), c > Xs && (u.moveTo(c * Ws(d), c * Vs(d)), u.arc(0, 0, c, d, h, g)); else {
                    var m, y, v = h, _ = d, x = h, b = d, w = p, k = p, M = a.apply(this, arguments) / 2,
                        A = M > Xs && (r ? +r.apply(this, arguments) : Gs(c * c + f * f)),
                        E = Ys(Is(f - c) / 2, +n.apply(this, arguments)), D = E, C = E;
                    if (A > Xs) {
                        var F = tl(A / c * Vs(M)), S = tl(A / f * Vs(M));
                        (w -= 2 * F) > Xs ? (x += F *= g ? 1 : -1, b -= F) : (w = 0, x = b = (h + d) / 2), (k -= 2 * S) > Xs ? (v += S *= g ? 1 : -1, _ -= S) : (k = 0, v = _ = (h + d) / 2)
                    }
                    var B = f * Ws(v), T = f * Vs(v), z = c * Ws(b), N = c * Vs(b);
                    if (E > Xs) {
                        var O, R = f * Ws(_), L = f * Vs(_), U = c * Ws(x), q = c * Vs(x);
                        if (p < Js && (O = al(B, T, U, q, R, L, z, N))) {
                            var P = B - O[0], j = T - O[1], I = R - O[0], $ = L - O[1],
                                W = 1 / Vs(Ks((P * I + j * $) / (Gs(P * P + j * j) * Gs(I * I + $ * $))) / 2),
                                H = Gs(O[0] * O[0] + O[1] * O[1]);
                            D = Ys(E, (c - H) / (W - 1)), C = Ys(E, (f - H) / (W + 1))
                        }
                    }
                    k > Xs ? C > Xs ? (m = ul(U, q, B, T, f, C, g), y = ul(R, L, z, N, f, C, g), u.moveTo(m.cx + m.x01, m.cy + m.y01), C < E ? u.arc(m.cx, m.cy, C, $s(m.y01, m.x01), $s(y.y01, y.x01), !g) : (u.arc(m.cx, m.cy, C, $s(m.y01, m.x01), $s(m.y11, m.x11), !g), u.arc(0, 0, f, $s(m.cy + m.y11, m.cx + m.x11), $s(y.cy + y.y11, y.cx + y.x11), !g), u.arc(y.cx, y.cy, C, $s(y.y11, y.x11), $s(y.y01, y.x01), !g))) : (u.moveTo(B, T), u.arc(0, 0, f, v, _, !g)) : u.moveTo(B, T), c > Xs && w > Xs ? D > Xs ? (m = ul(z, N, R, L, c, -D, g), y = ul(B, T, U, q, c, -D, g), u.lineTo(m.cx + m.x01, m.cy + m.y01), D < E ? u.arc(m.cx, m.cy, D, $s(m.y01, m.x01), $s(y.y01, y.x01), !g) : (u.arc(m.cx, m.cy, D, $s(m.y01, m.x01), $s(m.y11, m.x11), !g), u.arc(0, 0, c, $s(m.cy + m.y11, m.cx + m.x11), $s(y.cy + y.y11, y.cx + y.x11), g), u.arc(y.cx, y.cy, D, $s(y.y11, y.x11), $s(y.y01, y.x01), !g))) : u.arc(0, 0, c, b, x, g) : u.lineTo(z, N)
                } else u.moveTo(0, 0);
                if (u.closePath(), s) return u = null, s + "" || null
            }

            return s.centroid = function () {
                var n = (+t.apply(this, arguments) + +e.apply(this, arguments)) / 2,
                    r = (+i.apply(this, arguments) + +o.apply(this, arguments)) / 2 - Js / 2;
                return [Ws(r) * n, Vs(r) * n]
            }, s.innerRadius = function (e) {
                return arguments.length ? (t = "function" == typeof e ? e : js(+e), s) : t
            }, s.outerRadius = function (t) {
                return arguments.length ? (e = "function" == typeof t ? t : js(+t), s) : e
            }, s.cornerRadius = function (t) {
                return arguments.length ? (n = "function" == typeof t ? t : js(+t), s) : n
            }, s.padRadius = function (t) {
                return arguments.length ? (r = null == t ? null : "function" == typeof t ? t : js(+t), s) : r
            }, s.startAngle = function (t) {
                return arguments.length ? (i = "function" == typeof t ? t : js(+t), s) : i
            }, s.endAngle = function (t) {
                return arguments.length ? (o = "function" == typeof t ? t : js(+t), s) : o
            }, s.padAngle = function (t) {
                return arguments.length ? (a = "function" == typeof t ? t : js(+t), s) : a
            }, s.context = function (t) {
                return arguments.length ? (u = null == t ? null : t, s) : u
            }, s
        }().startAngle((t => t.startAngle || 0)).endAngle((t => t.endAngle || 0)).padAngle((t => t.padAngle || 0)).innerRadius((t => t.innerRadius || 0)).outerRadius((t => t.outerRadius || 0)).cornerRadius((t => t.cornerRadius || 0)),
        Pp = pl().x(Rp).y1(Lp).y0((t => (t.y || 0) + (t.height || 0))).defined(Up),
        jp = pl().y(Lp).x1(Rp).x0((t => (t.x || 0) + (t.width || 0))).defined(Up), Ip = dl().x(Rp).y(Lp).defined(Up),
        $p = zp().x(Rp).y(Lp).width((t => t.width || 0)).height((t => t.height || 0)).cornerRadius((t => Op(t.cornerRadiusTopLeft, t.cornerRadius) || 0), (t => Op(t.cornerRadiusTopRight, t.cornerRadius) || 0), (t => Op(t.cornerRadiusBottomRight, t.cornerRadius) || 0), (t => Op(t.cornerRadiusBottomLeft, t.cornerRadius) || 0)),
        Wp = function (t, e) {
            var n = null;

            function r() {
                var r;
                if (n || (n = r = Ps()), t.apply(this, arguments).draw(n, +e.apply(this, arguments)), r) return n = null, r + "" || null
            }

            return t = "function" == typeof t ? t : js(t || gl), e = "function" == typeof e ? e : js(void 0 === e ? 64 : +e), r.type = function (e) {
                return arguments.length ? (t = "function" == typeof e ? e : js(e), r) : t
            }, r.size = function (t) {
                return arguments.length ? (e = "function" == typeof t ? t : js(+t), r) : e
            }, r.context = function (t) {
                return arguments.length ? (n = null == t ? null : t, r) : n
            }, r
        }().type((t => Mp(t.shape || "circle"))).size((t => Op(t.size, 64))),
        Hp = Np().x(Rp).y(Lp).defined(Up).size((t => t.size || 1));

    function Yp(t) {
        return t.cornerRadius || t.cornerRadiusTopLeft || t.cornerRadiusTopRight || t.cornerRadiusBottomRight || t.cornerRadiusBottomLeft
    }

    function Vp(t, e, n, r) {
        return $p.context(t)(e, n, r)
    }

    var Gp = 1;

    function Xp() {
        Gp = 1
    }

    function Jp(t, e, n) {
        var r = e.clip, i = t._defs, o = e.clip_id || (e.clip_id = "clip" + Gp++),
            a = i.clipping[o] || (i.clipping[o] = {id: o});
        return H(r) ? a.path = r(null) : Yp(n) ? a.path = Vp(null, n, 0, 0) : (a.width = n.width || 0, a.height = n.height || 0), "url(#" + o + ")"
    }

    function Zp(t) {
        this.clear(), t && this.union(t)
    }

    function Qp(t) {
        this.mark = t, this.bounds = this.bounds || new Zp
    }

    function Kp(t) {
        Qp.call(this, t), this.items = this.items || []
    }

    function tg(t) {
        this._pending = 0, this._loader = t || Fo()
    }

    function eg(t) {
        t._pending += 1
    }

    function ng(t) {
        t._pending -= 1
    }

    function rg(t, e, n) {
        if (e.stroke && 0 !== e.opacity && 0 !== e.strokeOpacity) {
            const r = null != e.strokeWidth ? +e.strokeWidth : 1;
            t.expand(r + (n ? function (t, e) {
                return t.strokeJoin && "miter" !== t.strokeJoin ? 0 : e
            }(e, r) : 0))
        }
        return t
    }

    Zp.prototype = {
        clone() {
            return new Zp(this)
        }, clear() {
            return this.x1 = +Number.MAX_VALUE, this.y1 = +Number.MAX_VALUE, this.x2 = -Number.MAX_VALUE, this.y2 = -Number.MAX_VALUE, this
        }, empty() {
            return this.x1 === +Number.MAX_VALUE && this.y1 === +Number.MAX_VALUE && this.x2 === -Number.MAX_VALUE && this.y2 === -Number.MAX_VALUE
        }, equals(t) {
            return this.x1 === t.x1 && this.y1 === t.y1 && this.x2 === t.x2 && this.y2 === t.y2
        }, set(t, e, n, r) {
            return n < t ? (this.x2 = t, this.x1 = n) : (this.x1 = t, this.x2 = n), r < e ? (this.y2 = e, this.y1 = r) : (this.y1 = e, this.y2 = r), this
        }, add(t, e) {
            return t < this.x1 && (this.x1 = t), e < this.y1 && (this.y1 = e), t > this.x2 && (this.x2 = t), e > this.y2 && (this.y2 = e), this
        }, expand(t) {
            return this.x1 -= t, this.y1 -= t, this.x2 += t, this.y2 += t, this
        }, round() {
            return this.x1 = Math.floor(this.x1), this.y1 = Math.floor(this.y1), this.x2 = Math.ceil(this.x2), this.y2 = Math.ceil(this.y2), this
        }, scale(t) {
            return this.x1 *= t, this.y1 *= t, this.x2 *= t, this.y2 *= t, this
        }, translate(t, e) {
            return this.x1 += t, this.x2 += t, this.y1 += e, this.y2 += e, this
        }, rotate(t, e, n) {
            const r = this.rotatedPoints(t, e, n);
            return this.clear().add(r[0], r[1]).add(r[2], r[3]).add(r[4], r[5]).add(r[6], r[7])
        }, rotatedPoints(t, e, n) {
            var {x1: r, y1: i, x2: o, y2: a} = this, u = Math.cos(t), s = Math.sin(t), l = e - e * u + n * s,
                c = n - e * s - n * u;
            return [u * r - s * i + l, s * r + u * i + c, u * r - s * a + l, s * r + u * a + c, u * o - s * i + l, s * o + u * i + c, u * o - s * a + l, s * o + u * a + c]
        }, union(t) {
            return t.x1 < this.x1 && (this.x1 = t.x1), t.y1 < this.y1 && (this.y1 = t.y1), t.x2 > this.x2 && (this.x2 = t.x2), t.y2 > this.y2 && (this.y2 = t.y2), this
        }, intersect(t) {
            return t.x1 > this.x1 && (this.x1 = t.x1), t.y1 > this.y1 && (this.y1 = t.y1), t.x2 < this.x2 && (this.x2 = t.x2), t.y2 < this.y2 && (this.y2 = t.y2), this
        }, encloses(t) {
            return t && this.x1 <= t.x1 && this.x2 >= t.x2 && this.y1 <= t.y1 && this.y2 >= t.y2
        }, alignsWith(t) {
            return t && (this.x1 == t.x1 || this.x2 == t.x2 || this.y1 == t.y1 || this.y2 == t.y2)
        }, intersects(t) {
            return t && !(this.x2 < t.x1 || this.x1 > t.x2 || this.y2 < t.y1 || this.y1 > t.y2)
        }, contains(t, e) {
            return !(t < this.x1 || t > this.x2 || e < this.y1 || e > this.y2)
        }, width() {
            return this.x2 - this.x1
        }, height() {
            return this.y2 - this.y1
        }
    }, ut(Kp, Qp), tg.prototype = {
        pending() {
            return this._pending
        }, sanitizeURL(t) {
            const e = this;
            return eg(e), e._loader.sanitize(t, {context: "href"}).then((t => (ng(e), t))).catch((() => (ng(e), null)))
        }, loadImage(t) {
            const e = this, n = Xl();
            return eg(e), e._loader.sanitize(t, {context: "image"}).then((t => {
                const r = t.href;
                if (!r || !n) throw{url: r};
                const i = new n, o = rt(t, "crossOrigin") ? t.crossOrigin : "anonymous";
                return null != o && (i.crossOrigin = o), i.onload = () => ng(e), i.onerror = () => ng(e), i.src = r, i
            })).catch((t => (ng(e), {complete: !1, width: 0, height: 0, src: t && t.url || ""})))
        }, ready() {
            const t = this;
            return new Promise((e => {
                !function n(r) {
                    t.pending() ? setTimeout((() => {
                        n(!0)
                    }), 10) : e(r)
                }(!1)
            }))
        }
    };
    const ig = hp - 1e-8;
    let og, ag, ug, sg, lg, cg, fg, hg;
    const dg = (t, e) => og.add(t, e), pg = (t, e) => dg(ag = t, ug = e), gg = t => dg(t, og.y1),
        mg = t => dg(og.x1, t), yg = (t, e) => lg * t + fg * e, vg = (t, e) => cg * t + hg * e,
        _g = (t, e) => dg(yg(t, e), vg(t, e)), xg = (t, e) => pg(yg(t, e), vg(t, e));

    function bg(t, e) {
        return og = t, e ? (sg = e * cp, lg = hg = Math.cos(sg), cg = Math.sin(sg), fg = -cg) : (lg = hg = 1, sg = cg = fg = 0), wg
    }

    const wg = {
        beginPath() {
        }, closePath() {
        }, moveTo: xg, lineTo: xg, rect(t, e, n, r) {
            sg ? (_g(t + n, e), _g(t + n, e + r), _g(t, e + r), xg(t, e)) : (dg(t + n, e + r), pg(t, e))
        }, quadraticCurveTo(t, e, n, r) {
            const i = yg(t, e), o = vg(t, e), a = yg(n, r), u = vg(n, r);
            kg(ag, i, a, gg), kg(ug, o, u, mg), pg(a, u)
        }, bezierCurveTo(t, e, n, r, i, o) {
            const a = yg(t, e), u = vg(t, e), s = yg(n, r), l = vg(n, r), c = yg(i, o), f = vg(i, o);
            Mg(ag, a, s, c, gg), Mg(ug, u, l, f, mg), pg(c, f)
        }, arc(t, e, n, r, i, o) {
            if (r += sg, i += sg, ag = n * Math.cos(i) + t, ug = n * Math.sin(i) + e, Math.abs(i - r) > ig) dg(t - n, e - n), dg(t + n, e + n); else {
                const a = r => dg(n * Math.cos(r) + t, n * Math.sin(r) + e);
                let u, s;
                if (a(r), a(i), i !== r) if ((r %= hp) < 0 && (r += hp), (i %= hp) < 0 && (i += hp), i < r && (o = !o, u = r, r = i, i = u), o) for (i -= hp, u = r - r % fp, s = 0; s < 4 && u > i; ++s, u -= fp) a(u); else for (u = r - r % fp + fp, s = 0; s < 4 && u < i; ++s, u += fp) a(u)
            }
        }
    };

    function kg(t, e, n, r) {
        const i = (t - e) / (t + n - 2 * e);
        0 < i && i < 1 && r(t + (e - t) * i)
    }

    function Mg(t, e, n, r, i) {
        const o = r - t + 3 * e - 3 * n, a = t + n - 2 * e, u = t - e;
        let s, l = 0, c = 0;
        Math.abs(o) > 1e-14 ? (s = a * a + u * o, s >= 0 && (s = Math.sqrt(s), l = (-a + s) / o, c = (-a - s) / o)) : l = .5 * u / a, 0 < l && l < 1 && i(Ag(l, t, e, n, r)), 0 < c && c < 1 && i(Ag(c, t, e, n, r))
    }

    function Ag(t, e, n, r, i) {
        const o = 1 - t, a = o * o, u = t * t;
        return a * o * e + 3 * a * t * n + 3 * o * u * r + u * t * i
    }

    var Eg = (Eg = Gl(1, 1)) ? Eg.getContext("2d") : null;
    const Dg = new Zp;

    function Cg(t) {
        return function (e, n) {
            if (!Eg) return !0;
            t(Eg, e), Dg.clear().union(e.bounds).intersect(n).round();
            const {x1: r, y1: i, x2: o, y2: a} = Dg;
            for (let t = i; t <= a; ++t) for (let e = r; e <= o; ++e) if (Eg.isPointInPath(e, t)) return !0;
            return !1
        }
    }

    function Fg(t, e) {
        return e.contains(t.x || 0, t.y || 0)
    }

    function Sg(t, e) {
        const n = t.x || 0, r = t.y || 0, i = t.width || 0, o = t.height || 0;
        return e.intersects(Dg.set(n, r, n + i, r + o))
    }

    function Bg(t, e) {
        const n = t.x || 0, r = t.y || 0;
        return Tg(e, n, r, null != t.x2 ? t.x2 : n, null != t.y2 ? t.y2 : r)
    }

    function Tg(t, e, n, r, i) {
        const {x1: o, y1: a, x2: u, y2: s} = t, l = r - e, c = i - n;
        let f, h, d, p, g = 0, m = 1;
        for (p = 0; p < 4; ++p) {
            if (0 === p && (f = -l, h = -(o - e)), 1 === p && (f = l, h = u - e), 2 === p && (f = -c, h = -(a - n)), 3 === p && (f = c, h = s - n), Math.abs(f) < 1e-10 && h < 0) return !1;
            if (d = h / f, f < 0) {
                if (d > m) return !1;
                d > g && (g = d)
            } else if (f > 0) {
                if (d < g) return !1;
                d < m && (m = d)
            }
        }
        return !0
    }

    function zg(t, e) {
        t.globalCompositeOperation = e.blend || "source-over"
    }

    function Ng(t, e) {
        return null == t ? e : t
    }

    function Og(t, e) {
        const n = e.length;
        for (let r = 0; r < n; ++r) t.addColorStop(e[r].offset, e[r].color);
        return t
    }

    function Rg(t, e, n) {
        return ep(n) ? function (t, e, n) {
            const r = n.width(), i = n.height();
            let o;
            if ("radial" === e.gradient) o = t.createRadialGradient(n.x1 + Ng(e.x1, .5) * r, n.y1 + Ng(e.y1, .5) * i, Math.max(r, i) * Ng(e.r1, 0), n.x1 + Ng(e.x2, .5) * r, n.y1 + Ng(e.y2, .5) * i, Math.max(r, i) * Ng(e.r2, .5)); else {
                const a = Ng(e.x1, 0), u = Ng(e.y1, 0), s = Ng(e.x2, 1), l = Ng(e.y2, 0);
                if (a !== s && u !== l && r !== i) {
                    const n = Gl(Math.ceil(r), Math.ceil(i)), o = n.getContext("2d");
                    return o.scale(r, i), o.fillStyle = Og(o.createLinearGradient(a, u, s, l), e.stops), o.fillRect(0, 0, r, i), t.createPattern(n, "no-repeat")
                }
                o = t.createLinearGradient(n.x1 + a * r, n.y1 + u * i, n.x1 + s * r, n.y1 + l * i)
            }
            return Og(o, e.stops)
        }(t, n, e.bounds) : n
    }

    function Lg(t, e, n) {
        return (n *= null == e.fillOpacity ? 1 : e.fillOpacity) > 0 && (t.globalAlpha = n, t.fillStyle = Rg(t, e, e.fill), !0)
    }

    var Ug = [];

    function qg(t, e, n) {
        var r = null != (r = e.strokeWidth) ? r : 1;
        return !(r <= 0) && ((n *= null == e.strokeOpacity ? 1 : e.strokeOpacity) > 0 && (t.globalAlpha = n, t.strokeStyle = Rg(t, e, e.stroke), t.lineWidth = r, t.lineCap = e.strokeCap || "butt", t.lineJoin = e.strokeJoin || "miter", t.miterLimit = e.strokeMiterLimit || 10, t.setLineDash && (t.setLineDash(e.strokeDash || Ug), t.lineDashOffset = e.strokeDashOffset || 0), !0))
    }

    function Pg(t, e) {
        return t.zindex - e.zindex || t.index - e.index
    }

    function jg(t) {
        if (!t.zdirty) return t.zitems;
        var e, n, r, i = t.items, o = [];
        for (n = 0, r = i.length; n < r; ++n) (e = i[n]).index = n, e.zindex && o.push(e);
        return t.zdirty = !1, t.zitems = o.sort(Pg)
    }

    function Ig(t, e) {
        var n, r, i = t.items;
        if (!i || !i.length) return;
        const o = jg(t);
        if (o && o.length) {
            for (n = 0, r = i.length; n < r; ++n) i[n].zindex || e(i[n]);
            i = o
        }
        for (n = 0, r = i.length; n < r; ++n) e(i[n])
    }

    function $g(t, e) {
        var n, r, i = t.items;
        if (!i || !i.length) return null;
        const o = jg(t);
        for (o && o.length && (i = o), r = i.length; --r >= 0;) if (n = e(i[r])) return n;
        if (i === o) for (r = (i = t.items).length; --r >= 0;) if (!i[r].zindex && (n = e(i[r]))) return n;
        return null
    }

    function Wg(t) {
        return function (e, n, r) {
            Ig(n, (n => {
                r && !r.intersects(n.bounds) || Yg(t, e, n, n)
            }))
        }
    }

    function Hg(t) {
        return function (e, n, r) {
            !n.items.length || r && !r.intersects(n.bounds) || Yg(t, e, n.items[0], n.items)
        }
    }

    function Yg(t, e, n, r) {
        var i = null == n.opacity ? 1 : n.opacity;
        0 !== i && (t(e, r) || (zg(e, n), n.fill && Lg(e, n, i) && e.fill(), n.stroke && qg(e, n, i) && e.stroke()))
    }

    function Vg(t) {
        return t = t || p, function (e, n, r, i, o, a) {
            return r *= e.pixelRatio, i *= e.pixelRatio, $g(n, (n => {
                const u = n.bounds;
                if ((!u || u.contains(o, a)) && u) return t(e, n, r, i, o, a) ? n : void 0
            }))
        }
    }

    function Gg(t, e) {
        return function (n, r, i, o) {
            var a, u, s = Array.isArray(r) ? r[0] : r, l = null == e ? s.fill : e, c = s.stroke && n.isPointInStroke;
            return c && (a = s.strokeWidth, u = s.strokeCap, n.lineWidth = null != a ? a : 1, n.lineCap = null != u ? u : "butt"), !t(n, r) && (l && n.isPointInPath(i, o) || c && n.isPointInStroke(i, o))
        }
    }

    function Xg(t) {
        return Vg(Gg(t))
    }

    function Jg(t, e) {
        return "translate(" + t + "," + e + ")"
    }

    function Zg(t) {
        return "rotate(" + t + ")"
    }

    function Qg(t) {
        return Jg(t.x || 0, t.y || 0)
    }

    function Kg(t, e, n) {
        function r(t, n) {
            var r = n.x || 0, i = n.y || 0, o = n.angle || 0;
            t.translate(r, i), o && t.rotate(o *= cp), t.beginPath(), e(t, n), o && t.rotate(-o), t.translate(-r, -i)
        }

        return {
            type: t, tag: "path", nested: !1, attr: function (t, n) {
                t("transform", function (t) {
                    return Jg(t.x || 0, t.y || 0) + (t.angle ? " " + Zg(t.angle) : "")
                }(n)), t("d", e(null, n))
            }, bound: function (t, n) {
                return e(bg(t, n.angle), n), rg(t, n).translate(n.x || 0, n.y || 0)
            }, draw: Wg(r), pick: Xg(r), isect: n || Cg(r)
        }
    }

    var tm = Kg("arc", (function (t, e) {
        return qp.context(t)(e)
    }));

    function em(t, e, n) {
        function r(t, n) {
            t.beginPath(), e(t, n)
        }

        const i = Gg(r);
        return {
            type: t, tag: "path", nested: !0, attr: function (t, n) {
                var r = n.mark.items;
                r.length && t("d", e(null, r))
            }, bound: function (t, n) {
                var r = n.items;
                return 0 === r.length ? t : (e(bg(t), r), rg(t, r[0]))
            }, draw: Hg(r), pick: function (t, e, n, r, o, a) {
                var u = e.items, s = e.bounds;
                return !u || !u.length || s && !s.contains(o, a) ? null : (n *= t.pixelRatio, r *= t.pixelRatio, i(t, u, n, r) ? u[0] : null)
            }, isect: Fg, tip: n
        }
    }

    var nm = em("area", (function (t, e) {
        const n = e[0], r = n.interpolate || "linear";
        return ("horizontal" === n.orient ? jp : Pp).curve(ap(r, n.orient, n.tension)).context(t)(e)
    }), (function (t, e) {
        for (var n, r, i = "horizontal" === t[0].orient ? e[1] : e[0], o = "horizontal" === t[0].orient ? "y" : "x", a = t.length, u = 1 / 0; --a >= 0;) !1 !== t[a].defined && (r = Math.abs(t[a][o] - i)) < u && (u = r, n = t[a]);
        return n
    }));

    function rm(t, e) {
        t.beginPath(), Yp(e) ? Vp(t, e, 0, 0) : t.rect(0, 0, e.width || 0, e.height || 0), t.clip()
    }

    function im(t) {
        const e = Ng(t.strokeWidth, 1);
        return null != t.strokeOffset ? t.strokeOffset : t.stroke && e > .5 && e < 1.5 ? .5 - Math.abs(e - 1) : 0
    }

    function om(t, e) {
        const n = im(e);
        t("d", Vp(null, e, n, n))
    }

    function am(t, e, n, r) {
        const i = im(e);
        t.beginPath(), Vp(t, e, (n || 0) + i, (r || 0) + i)
    }

    const um = Gg(am), sm = Gg(am, !1), lm = Gg(am, !0);
    var cm = {
        type: "group", tag: "g", nested: !1, attr: function (t, e) {
            t("transform", Qg(e))
        }, bound: function (t, e) {
            if (!e.clip && e.items) {
                const n = e.items, r = n.length;
                for (let e = 0; e < r; ++e) t.union(n[e].bounds)
            }
            return (e.clip || e.width || e.height) && !e.noBound && t.add(0, 0).add(e.width || 0, e.height || 0), rg(t, e), t.translate(e.x || 0, e.y || 0)
        }, draw: function (t, e, n) {
            Ig(e, (e => {
                const r = e.x || 0, i = e.y || 0, o = e.strokeForeground, a = null == e.opacity ? 1 : e.opacity;
                (e.stroke || e.fill) && a && (am(t, e, r, i), zg(t, e), e.fill && Lg(t, e, a) && t.fill(), e.stroke && !o && qg(t, e, a) && t.stroke()), t.save(), t.translate(r, i), e.clip && rm(t, e), n && n.translate(-r, -i), Ig(e, (e => {
                    this.draw(t, e, n)
                })), n && n.translate(r, i), t.restore(), o && e.stroke && a && (am(t, e, r, i), zg(t, e), qg(t, e, a) && t.stroke())
            }))
        }, pick: function (t, e, n, r, i, o) {
            if (e.bounds && !e.bounds.contains(i, o) || !e.items) return null;
            const a = n * t.pixelRatio, u = r * t.pixelRatio;
            return $g(e, (s => {
                let l, c, f;
                const h = s.bounds;
                if (h && !h.contains(i, o)) return;
                c = s.x || 0, f = s.y || 0;
                const d = c + (s.width || 0), p = f + (s.height || 0), g = s.clip;
                if (g && (i < c || i > d || o < f || o > p)) return;
                if (t.save(), t.translate(c, f), c = i - c, f = o - f, g && Yp(s) && !lm(t, s, a, u)) return t.restore(), null;
                const m = s.strokeForeground, y = !1 !== e.interactive;
                return y && m && s.stroke && sm(t, s, a, u) ? (t.restore(), s) : (l = $g(s, (t => function (t, e, n) {
                    return (!1 !== t.interactive || "group" === t.marktype) && t.bounds && t.bounds.contains(e, n)
                }(t, c, f) ? this.pick(t, n, r, c, f) : null)), !l && y && (s.fill || !m && s.stroke) && um(t, s, a, u) && (l = s), t.restore(), l || null)
            }))
        }, isect: Sg, content: function (t, e, n) {
            t("clip-path", e.clip ? Jp(n, e, e) : null)
        }, background: function (t, e) {
            t("class", "background"), t("aria-hidden", !0), om(t, e)
        }, foreground: function (t, e) {
            t("class", "foreground"), t("aria-hidden", !0), e.strokeForeground ? om(t, e) : t("d", "")
        }
    }, fm = {xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", version: "1.1"};

    function hm(t, e) {
        var n = t.image;
        return (!n || t.url && t.url !== n.url) && (n = {
            complete: !1,
            width: 0,
            height: 0
        }, e.loadImage(t.url).then((e => {
            t.image = e, t.image.url = t.url
        }))), n
    }

    function dm(t, e) {
        return null != t.width ? t.width : e && e.width ? !1 !== t.aspect && t.height ? t.height * e.width / e.height : e.width : 0
    }

    function pm(t, e) {
        return null != t.height ? t.height : e && e.height ? !1 !== t.aspect && t.width ? t.width * e.height / e.width : e.height : 0
    }

    function gm(t, e) {
        return "center" === t ? e / 2 : "right" === t ? e : 0
    }

    function mm(t, e) {
        return "middle" === t ? e / 2 : "bottom" === t ? e : 0
    }

    var ym = {
        type: "image", tag: "image", nested: !1, attr: function (t, e, n) {
            const r = hm(e, n), i = dm(e, r), o = pm(e, r), a = (e.x || 0) - gm(e.align, i),
                u = (e.y || 0) - mm(e.baseline, o);
            t("href", !r.src && r.toDataURL ? r.toDataURL() : r.src || "", fm["xmlns:xlink"], "xlink:href"), t("transform", Jg(a, u)), t("width", i), t("height", o), t("preserveAspectRatio", !1 === e.aspect ? "none" : "xMidYMid")
        }, bound: function (t, e) {
            const n = e.image, r = dm(e, n), i = pm(e, n), o = (e.x || 0) - gm(e.align, r),
                a = (e.y || 0) - mm(e.baseline, i);
            return t.set(o, a, o + r, a + i)
        }, draw: function (t, e, n) {
            Ig(e, (e => {
                if (n && !n.intersects(e.bounds)) return;
                const r = hm(e, this);
                let i, o, a, u, s = dm(e, r), l = pm(e, r), c = (e.x || 0) - gm(e.align, s),
                    f = (e.y || 0) - mm(e.baseline, l);
                !1 !== e.aspect && (o = r.width / r.height, a = e.width / e.height, o == o && a == a && o !== a && (a < o ? (u = s / o, f += (l - u) / 2, l = u) : (u = l * o, c += (s - u) / 2, s = u))), (r.complete || r.toDataURL) && (zg(t, e), t.globalAlpha = null != (i = e.opacity) ? i : 1, t.imageSmoothingEnabled = !1 !== e.smooth, t.drawImage(r, c, f, s, l))
            }))
        }, pick: Vg(), isect: p, get: hm, xOffset: gm, yOffset: mm
    }, vm = em("line", (function (t, e) {
        const n = e[0], r = n.interpolate || "linear";
        return Ip.curve(ap(r, n.orient, n.tension)).context(t)(e)
    }), (function (t, e) {
        for (var n, r, i = Math.pow(t[0].strokeWidth || 1, 2), o = t.length; --o >= 0;) if (!1 !== t[o].defined && (n = t[o].x - e[0]) * n + (r = t[o].y - e[1]) * r < i) return t[o];
        return null
    }));

    function _m(t, e) {
        var n = e.path;
        if (null == n) return !0;
        var r = e.x || 0, i = e.y || 0, o = e.scaleX || 1, a = e.scaleY || 1, u = (e.angle || 0) * cp, s = e.pathCache;
        s && s.path === n || ((e.pathCache = s = lp(n)).path = n), u && t.rotate && t.translate ? (t.translate(r, i), t.rotate(u), xp(t, s, 0, 0, o, a), t.rotate(-u), t.translate(-r, -i)) : xp(t, s, r, i, o, a)
    }

    var xm = {
        type: "path", tag: "path", nested: !1, attr: function (t, e) {
            var n = e.scaleX || 1, r = e.scaleY || 1;
            1 === n && 1 === r || t("vector-effect", "non-scaling-stroke"), t("transform", function (t) {
                return Jg(t.x || 0, t.y || 0) + (t.angle ? " " + Zg(t.angle) : "") + (t.scaleX || t.scaleY ? " " + (e = t.scaleX || 1, n = t.scaleY || 1, "scale(" + e + "," + n + ")") : "");
                var e, n
            }(e)), t("d", e.path)
        }, bound: function (t, e) {
            return _m(bg(t, e.angle), e) ? t.set(0, 0, 0, 0) : rg(t, e, !0)
        }, draw: Wg(_m), pick: Xg(_m), isect: Cg(_m)
    };

    function bm(t, e) {
        t.beginPath(), Vp(t, e)
    }

    var wm = {
        type: "rect", tag: "path", nested: !1, attr: function (t, e) {
            t("d", Vp(null, e))
        }, bound: function (t, e) {
            var n, r;
            return rg(t.set(n = e.x || 0, r = e.y || 0, n + e.width || 0, r + e.height || 0), e)
        }, draw: Wg(bm), pick: Xg(bm), isect: Sg
    };

    function km(t, e, n) {
        var r, i, o, a;
        return !(!e.stroke || !qg(t, e, n)) && (r = e.x || 0, i = e.y || 0, o = null != e.x2 ? e.x2 : r, a = null != e.y2 ? e.y2 : i, t.beginPath(), t.moveTo(r, i), t.lineTo(o, a), !0)
    }

    var Mm = {
        type: "rule", tag: "line", nested: !1, attr: function (t, e) {
            t("transform", Qg(e)), t("x2", null != e.x2 ? e.x2 - (e.x || 0) : 0), t("y2", null != e.y2 ? e.y2 - (e.y || 0) : 0)
        }, bound: function (t, e) {
            var n, r;
            return rg(t.set(n = e.x || 0, r = e.y || 0, null != e.x2 ? e.x2 : n, null != e.y2 ? e.y2 : r), e)
        }, draw: function (t, e, n) {
            Ig(e, (e => {
                if (!n || n.intersects(e.bounds)) {
                    var r = null == e.opacity ? 1 : e.opacity;
                    r && km(t, e, r) && (zg(t, e), t.stroke())
                }
            }))
        }, pick: Vg((function (t, e, n, r) {
            return !!t.isPointInStroke && (km(t, e, 1) && t.isPointInStroke(n, r))
        })), isect: Bg
    }, Am = Kg("shape", (function (t, e) {
        return (e.mark.shape || e.shape).context(t)(e)
    })), Em = Kg("symbol", (function (t, e) {
        return Wp.context(t)(e)
    }), Fg);
    const Dm = yt();
    var Cm = {height: Nm, measureWidth: Tm, estimateWidth: Sm, width: Sm, canvas: Fm};

    function Fm(t) {
        Cm.width = t && Eg ? Tm : Sm
    }

    function Sm(t, e) {
        return Bm(Um(t, e), Nm(t))
    }

    function Bm(t, e) {
        return ~~(.8 * t.length * e)
    }

    function Tm(t, e) {
        return Nm(t) <= 0 || !(e = Um(t, e)) ? 0 : zm(e, Pm(t))
    }

    function zm(t, e) {
        const n = "(".concat(e, ") ").concat(t);
        let r = Dm.get(n);
        return void 0 === r && (Eg.font = e, r = Eg.measureText(t).width, Dm.set(n, r)), r
    }

    function Nm(t) {
        return null != t.fontSize ? +t.fontSize || 0 : 11
    }

    function Om(t) {
        return null != t.lineHeight ? t.lineHeight : Nm(t) + 2
    }

    function Rm(t) {
        return e = t.lineBreak && t.text && !v(t.text) ? t.text.split(t.lineBreak) : t.text, v(e) ? e.length > 1 ? e : e[0] : e;
        var e
    }

    function Lm(t) {
        const e = Rm(t);
        return (v(e) ? e.length - 1 : 0) * Om(t)
    }

    function Um(t, e) {
        const n = null == e ? "" : (e + "").trim();
        return t.limit > 0 && n.length ? function (t, e) {
            var n = +t.limit, r = function (t) {
                if (Cm.width === Tm) {
                    const e = Pm(t);
                    return t => zm(t, e)
                }
                {
                    const e = Nm(t);
                    return t => Bm(t, e)
                }
            }(t);
            if (r(e) < n) return e;
            var i, o = t.ellipsis || "…", a = "rtl" === t.dir, u = 0, s = e.length;
            if (n -= r(o), a) {
                for (; u < s;) i = u + s >>> 1, r(e.slice(i)) > n ? u = i + 1 : s = i;
                return o + e.slice(u)
            }
            for (; u < s;) i = 1 + (u + s >>> 1), r(e.slice(0, i)) < n ? u = i : s = i - 1;
            return e.slice(0, u) + o
        }(t, n) : n
    }

    function qm(t, e) {
        var n = t.font;
        return (e && n ? String(n).replace(/"/g, "'") : n) || "sans-serif"
    }

    function Pm(t, e) {
        return (t.fontStyle ? t.fontStyle + " " : "") + (t.fontVariant ? t.fontVariant + " " : "") + (t.fontWeight ? t.fontWeight + " " : "") + Nm(t) + "px " + qm(t, e)
    }

    function jm(t) {
        var e = t.baseline, n = Nm(t);
        return Math.round("top" === e ? .79 * n : "middle" === e ? .3 * n : "bottom" === e ? -.21 * n : "line-top" === e ? .29 * n + .5 * Om(t) : "line-bottom" === e ? .29 * n - .5 * Om(t) : 0)
    }

    Fm(!0);
    const Im = {left: "start", center: "middle", right: "end"}, $m = new Zp;

    function Wm(t) {
        var e, n = t.x || 0, r = t.y || 0, i = t.radius || 0;
        return i && (e = (t.theta || 0) - fp, n += i * Math.cos(e), r += i * Math.sin(e)), $m.x1 = n, $m.y1 = r, $m
    }

    function Hm(t, e, n) {
        var r, i = Cm.height(e), o = e.align, a = Wm(e), u = a.x1, s = a.y1, l = e.dx || 0,
            c = (e.dy || 0) + jm(e) - Math.round(.8 * i), f = Rm(e);
        if (v(f) ? (i += Om(e) * (f.length - 1), r = f.reduce(((t, n) => Math.max(t, Cm.width(e, n))), 0)) : r = Cm.width(e, f), "center" === o ? l -= r / 2 : "right" === o && (l -= r), t.set(l += u, c += s, l + r, c + i), e.angle && !n) t.rotate(e.angle * cp, u, s); else if (2 === n) return t.rotatedPoints(e.angle * cp, u, s);
        return t
    }

    var Ym = {
        arc: tm, area: nm, group: cm, image: ym, line: vm, path: xm, rect: wm, rule: Mm, shape: Am, symbol: Em, text: {
            type: "text", tag: "text", nested: !1, attr: function (t, e) {
                var n, r = e.dx || 0, i = (e.dy || 0) + jm(e), o = Wm(e), a = o.x1, u = o.y1, s = e.angle || 0;
                t("text-anchor", Im[e.align] || "start"), s ? (n = Jg(a, u) + " " + Zg(s), (r || i) && (n += " " + Jg(r, i))) : n = Jg(a + r, u + i), t("transform", n)
            }, bound: Hm, draw: function (t, e, n) {
                Ig(e, (e => {
                    var r, i, o, a, u, s, l, c = null == e.opacity ? 1 : e.opacity;
                    if (!(n && !n.intersects(e.bounds) || 0 === c || e.fontSize <= 0 || null == e.text || 0 === e.text.length)) {
                        if (t.font = Pm(e), t.textAlign = e.align || "left", i = (r = Wm(e)).x1, o = r.y1, e.angle && (t.save(), t.translate(i, o), t.rotate(e.angle * cp), i = o = 0), i += e.dx || 0, o += (e.dy || 0) + jm(e), s = Rm(e), zg(t, e), v(s)) for (u = Om(e), a = 0; a < s.length; ++a) l = Um(e, s[a]), e.fill && Lg(t, e, c) && t.fillText(l, i, o), e.stroke && qg(t, e, c) && t.strokeText(l, i, o), o += u; else l = Um(e, s), e.fill && Lg(t, e, c) && t.fillText(l, i, o), e.stroke && qg(t, e, c) && t.strokeText(l, i, o);
                        e.angle && t.restore()
                    }
                }))
            }, pick: Vg((function (t, e, n, r, i, o) {
                if (e.fontSize <= 0) return !1;
                if (!e.angle) return !0;
                var a = Wm(e), u = a.x1, s = a.y1, l = Hm($m, e, 1), c = -e.angle * cp, f = Math.cos(c),
                    h = Math.sin(c), d = f * i - h * o + (u - f * u + h * s), p = h * i + f * o + (s - h * u - f * s);
                return l.contains(d, p)
            })), isect: function (t, e) {
                const n = Hm($m, t, 2);
                return Tg(e, n[0], n[1], n[2], n[3]) || Tg(e, n[0], n[1], n[4], n[5]) || Tg(e, n[4], n[5], n[6], n[7]) || Tg(e, n[2], n[3], n[6], n[7])
            }
        }, trail: em("trail", (function (t, e) {
            return Hp.context(t)(e)
        }), (function (t, e) {
            for (var n, r, i = t.length; --i >= 0;) if (!1 !== t[i].defined && (n = t[i].x - e[0]) * n + (r = t[i].y - e[1]) * r < (n = t[i].size || 1) * n) return t[i];
            return null
        }))
    };

    function Vm(t, e, n) {
        var r = Ym[t.mark.marktype], i = e || r.bound;
        return r.nested && (t = t.mark), i(t.bounds || (t.bounds = new Zp), t, n)
    }

    var Gm = {mark: null};

    function Xm(t, e, n) {
        var r, i, o, a, u = Ym[t.marktype], s = u.bound, l = t.items, c = l && l.length;
        if (u.nested) return c ? o = l[0] : (Gm.mark = t, o = Gm), a = Vm(o, s, n), e = e && e.union(a) || a;
        if (e = e || t.bounds && t.bounds.clear() || new Zp, c) for (r = 0, i = l.length; r < i; ++r) e.union(Vm(l[r], s, n));
        return t.bounds = e
    }

    const Jm = ["marktype", "name", "role", "interactive", "clip", "items", "zindex", "x", "y", "width", "height", "align", "baseline", "fill", "fillOpacity", "opacity", "blend", "stroke", "strokeOpacity", "strokeWidth", "strokeCap", "strokeDash", "strokeDashOffset", "strokeForeground", "strokeOffset", "startAngle", "endAngle", "innerRadius", "outerRadius", "cornerRadius", "padAngle", "cornerRadiusTopLeft", "cornerRadiusTopRight", "cornerRadiusBottomLeft", "cornerRadiusBottomRight", "interpolate", "tension", "orient", "defined", "url", "aspect", "smooth", "path", "scaleX", "scaleY", "x2", "y2", "size", "shape", "text", "angle", "theta", "radius", "dir", "dx", "dy", "ellipsis", "limit", "lineBreak", "lineHeight", "font", "fontSize", "fontWeight", "fontStyle", "fontVariant", "description", "aria", "ariaRole", "ariaRoleDescription"];

    function Zm(t, e) {
        return JSON.stringify(t, Jm, e)
    }

    function Qm(t) {
        return Km("string" == typeof t ? JSON.parse(t) : t)
    }

    function Km(t) {
        var e, n, r, i = t.marktype, o = t.items;
        if (o) for (n = 0, r = o.length; n < r; ++n) e = i ? "mark" : "group", o[n][e] = t, o[n].zindex && (o[n][e].zdirty = !0), "group" === (i || e) && Km(o[n]);
        return i && Xm(t), t
    }

    function ty(t) {
        arguments.length ? this.root = Qm(t) : (this.root = ey({
            marktype: "group",
            name: "root",
            role: "frame"
        }), this.root.items = [new Kp(this.root)])
    }

    function ey(t, e) {
        const n = {
            bounds: new Zp,
            clip: !!t.clip,
            group: e,
            interactive: !1 !== t.interactive,
            items: [],
            marktype: t.marktype,
            name: t.name || void 0,
            role: t.role || void 0,
            zindex: t.zindex || 0
        };
        return null != t.aria && (n.aria = t.aria), t.description && (n.description = t.description), n
    }

    function ny(t, e, n) {
        return !t && "undefined" != typeof document && document.createElement && (t = document), t ? n ? t.createElementNS(n, e) : t.createElement(e) : null
    }

    function ry(t, e) {
        e = e.toLowerCase();
        for (var n = t.childNodes, r = 0, i = n.length; r < i; ++r) if (n[r].tagName.toLowerCase() === e) return n[r]
    }

    function iy(t, e, n, r) {
        var i, o = t.childNodes[e];
        return o && o.tagName.toLowerCase() === n.toLowerCase() || (i = o || null, o = ny(t.ownerDocument, n, r), t.insertBefore(o, i)), o
    }

    function oy(t, e) {
        for (var n = t.childNodes, r = n.length; r > e;) t.removeChild(n[--r]);
        return t
    }

    function ay(t) {
        return "mark-" + t.marktype + (t.role ? " role-" + t.role : "") + (t.name ? " " + t.name : "")
    }

    function uy(t, e) {
        const n = e.getBoundingClientRect();
        return [t.clientX - n.left - (e.clientLeft || 0), t.clientY - n.top - (e.clientTop || 0)]
    }

    function sy(t, e) {
        this._active = null, this._handlers = {}, this._loader = t || Fo(), this._tooltip = e || ly
    }

    function ly(t, e, n, r) {
        t.element().setAttribute("title", r || "")
    }

    function cy(t) {
        this._el = null, this._bgcolor = null, this._loader = new tg(t)
    }

    ty.prototype = {
        toJSON(t) {
            return Zm(this.root, t || 0)
        }, mark(t, e, n) {
            const r = ey(t, e = e || this.root.items[0]);
            return e.items[n] = r, r.zindex && (r.group.zdirty = !0), r
        }
    }, sy.prototype = {
        initialize(t, e, n) {
            return this._el = t, this._obj = n || null, this.origin(e)
        }, element() {
            return this._el
        }, canvas() {
            return this._el && this._el.firstChild
        }, origin(t) {
            return arguments.length ? (this._origin = t || [0, 0], this) : this._origin.slice()
        }, scene(t) {
            return arguments.length ? (this._scene = t, this) : this._scene
        }, on() {
        }, off() {
        }, _handlerIndex(t, e, n) {
            for (let r = t ? t.length : 0; --r >= 0;) if (t[r].type === e && (!n || t[r].handler === n)) return r;
            return -1
        }, handlers(t) {
            const e = this._handlers, n = [];
            if (t) n.push(...e[this.eventName(t)]); else for (const t in e) n.push(...e[t]);
            return n
        }, eventName(t) {
            const e = t.indexOf(".");
            return e < 0 ? t : t.slice(0, e)
        }, handleHref(t, e, n) {
            this._loader.sanitize(n, {context: "href"}).then((e => {
                const n = new MouseEvent(t.type, t), r = ny(null, "a");
                for (const t in e) r.setAttribute(t, e[t]);
                r.dispatchEvent(n)
            })).catch((() => {
            }))
        }, handleTooltip(t, e, n) {
            if (e && null != e.tooltip) {
                e = function (t, e, n, r) {
                    var i, o, a = t && t.mark;
                    if (a && (i = Ym[a.marktype]).tip) {
                        for ((o = uy(e, n))[0] -= r[0], o[1] -= r[1]; t = t.mark.group;) o[0] -= t.x || 0, o[1] -= t.y || 0;
                        t = i.tip(a.items, o)
                    }
                    return t
                }(e, t, this.canvas(), this._origin);
                const r = n && e && e.tooltip || null;
                this._tooltip.call(this._obj, this, t, e, r)
            }
        }, getItemBoundingClientRect(t) {
            const e = this.canvas();
            if (!e) return;
            const n = e.getBoundingClientRect(), r = this._origin, i = t.bounds, o = i.width(), a = i.height();
            let u = i.x1 + r[0] + n.left, s = i.y1 + r[1] + n.top;
            for (; t.mark && (t = t.mark.group);) u += t.x || 0, s += t.y || 0;
            return {x: u, y: s, width: o, height: a, left: u, top: s, right: u + o, bottom: s + a}
        }
    }, cy.prototype = {
        initialize(t, e, n, r, i) {
            return this._el = t, this.resize(e, n, r, i)
        }, element() {
            return this._el
        }, canvas() {
            return this._el && this._el.firstChild
        }, background(t) {
            return 0 === arguments.length ? this._bgcolor : (this._bgcolor = t, this)
        }, resize(t, e, n, r) {
            return this._width = t, this._height = e, this._origin = n || [0, 0], this._scale = r || 1, this
        }, dirty() {
        }, render(t) {
            const e = this;
            return e._call = function () {
                e._render(t)
            }, e._call(), e._call = null, e
        }, _render() {
        }, renderAsync(t) {
            const e = this.render(t);
            return this._ready ? this._ready.then((() => e)) : Promise.resolve(e)
        }, _load(t, e) {
            var n = this, r = n._loader[t](e);
            if (!n._ready) {
                const t = n._call;
                n._ready = n._loader.ready().then((e => {
                    e && t(), n._ready = null
                }))
            }
            return r
        }, sanitizeURL(t) {
            return this._load("sanitizeURL", t)
        }, loadImage(t) {
            return this._load("loadImage", t)
        }
    };
    const fy = "dragenter", hy = "dragleave", dy = "dragover", py = "mousedown", gy = "mousemove", my = "mouseout",
        yy = "mouseover", vy = "click", _y = "mousewheel", xy = "touchstart", by = "touchmove", wy = "touchend",
        ky = gy, My = my, Ay = vy;

    function Ey(t, e) {
        sy.call(this, t, e), this._down = null, this._touch = null, this._first = !0, this._events = {}
    }

    function Dy(t, e) {
        (t => t === xy || t === by || t === wy ? [xy, by, wy] : [t])(e).forEach((e => function (t, e) {
            const n = t.canvas();
            n && !t._events[e] && (t._events[e] = 1, n.addEventListener(e, t[e] ? n => t[e](n) : n => t.fire(e, n)))
        }(t, e)))
    }

    function Cy(t, e, n) {
        return function (r) {
            const i = this._active, o = this.pickEvent(r);
            o === i || (i && i.exit || this.fire(n, r), this._active = o, this.fire(e, r)), this.fire(t, r)
        }
    }

    function Fy(t) {
        return function (e) {
            this.fire(t, e), this._active = null
        }
    }

    ut(Ey, sy, {
        initialize(t, e, n) {
            return this._canvas = t && ry(t, "canvas"), [vy, py, gy, my, hy].forEach((t => Dy(this, t))), sy.prototype.initialize.call(this, t, e, n)
        },
        canvas() {
            return this._canvas
        },
        context() {
            return this._canvas.getContext("2d")
        },
        events: ["keydown", "keypress", "keyup", fy, hy, dy, py, "mouseup", gy, my, yy, vy, "dblclick", "wheel", _y, xy, by, wy],
        DOMMouseScroll(t) {
            this.fire(_y, t)
        },
        mousemove: Cy(gy, yy, my),
        dragover: Cy(dy, fy, hy),
        mouseout: Fy(my),
        dragleave: Fy(hy),
        mousedown(t) {
            this._down = this._active, this.fire(py, t)
        },
        click(t) {
            this._down === this._active && (this.fire(vy, t), this._down = null)
        },
        touchstart(t) {
            this._touch = this.pickEvent(t.changedTouches[0]), this._first && (this._active = this._touch, this._first = !1), this.fire(xy, t, !0)
        },
        touchmove(t) {
            this.fire(by, t, !0)
        },
        touchend(t) {
            this.fire(wy, t, !0), this._touch = null
        },
        fire(t, e, n) {
            const r = n ? this._touch : this._active, i = this._handlers[t];
            if (e.vegaType = t, t === Ay && r && r.href ? this.handleHref(e, r, r.href) : t !== ky && t !== My || this.handleTooltip(e, r, t !== My), i) for (let t = 0, n = i.length; t < n; ++t) i[t].handler.call(this._obj, e, r)
        },
        on(t, e) {
            const n = this.eventName(t), r = this._handlers;
            return this._handlerIndex(r[n], t, e) < 0 && (Dy(this, t), (r[n] || (r[n] = [])).push({
                type: t,
                handler: e
            })), this
        },
        off(t, e) {
            const n = this.eventName(t), r = this._handlers[n], i = this._handlerIndex(r, t, e);
            return i >= 0 && r.splice(i, 1), this
        },
        pickEvent(t) {
            const e = uy(t, this._canvas), n = this._origin;
            return this.pick(this._scene, e[0], e[1], e[0] - n[0], e[1] - n[1])
        },
        pick(t, e, n, r, i) {
            const o = this.context();
            return Ym[t.marktype].pick.call(this, o, t, e, n, r, i)
        }
    });
    var Sy = "undefined" != typeof window && window.devicePixelRatio || 1;

    function By(t) {
        cy.call(this, t), this._options = {}, this._redraw = !1, this._dirty = new Zp, this._tempb = new Zp
    }

    const Ty = cy.prototype;

    function zy(t, e) {
        sy.call(this, t, e);
        const n = this;
        n._hrefHandler = Ny(n, ((t, e) => {
            e && e.href && n.handleHref(t, e, e.href)
        })), n._tooltipHandler = Ny(n, ((t, e) => {
            n.handleTooltip(t, e, t.type !== My)
        }))
    }

    ut(By, cy, {
        initialize(t, e, n, r, i, o) {
            return this._options = o || {}, this._canvas = this._options.externalContext ? null : Gl(1, 1, this._options.type), t && this._canvas && (oy(t, 0).appendChild(this._canvas), this._canvas.setAttribute("class", "marks")), Ty.initialize.call(this, t, e, n, r, i)
        }, resize(t, e, n, r) {
            if (Ty.resize.call(this, t, e, n, r), this._canvas) !function (t, e, n, r, i, o) {
                const a = "undefined" != typeof HTMLElement && t instanceof HTMLElement && null != t.parentNode,
                    u = t.getContext("2d"), s = a ? Sy : i;
                t.width = e * s, t.height = n * s;
                for (const t in o) u[t] = o[t];
                a && 1 !== s && (t.style.width = e + "px", t.style.height = n + "px"), u.pixelRatio = s, u.setTransform(s, 0, 0, s, s * r[0], s * r[1])
            }(this._canvas, this._width, this._height, this._origin, this._scale, this._options.context); else {
                const t = this._options.externalContext;
                t || u("CanvasRenderer is missing a valid canvas or context"), t.scale(this._scale, this._scale), t.translate(this._origin[0], this._origin[1])
            }
            return this._redraw = !0, this
        }, canvas() {
            return this._canvas
        }, context() {
            return this._options.externalContext || (this._canvas ? this._canvas.getContext("2d") : null)
        }, dirty(t) {
            const e = this._tempb.clear().union(t.bounds);
            let n = t.mark.group;
            for (; n;) e.translate(n.x || 0, n.y || 0), n = n.mark.group;
            this._dirty.union(e)
        }, _render(t) {
            const e = this.context(), n = this._origin, r = this._width, i = this._height, o = this._dirty,
                a = ((t, e, n) => (new Zp).set(0, 0, e, n).translate(-t[0], -t[1]))(n, r, i);
            e.save();
            const u = this._redraw || o.empty() ? (this._redraw = !1, a.expand(1)) : function (t, e, n) {
                return e.expand(1).round(), t.pixelRatio % 1 && e.scale(t.pixelRatio).round().scale(1 / t.pixelRatio), e.translate(-n[0] % 1, -n[1] % 1), t.beginPath(), t.rect(e.x1, e.y1, e.width(), e.height()), t.clip(), e
            }(e, a.intersect(o), n);
            return this.clear(-n[0], -n[1], r, i), this.draw(e, t, u), e.restore(), o.clear(), this
        }, draw(t, e, n) {
            const r = Ym[e.marktype];
            e.clip && function (t, e) {
                var n = e.clip;
                t.save(), H(n) ? (t.beginPath(), n(t), t.clip()) : rm(t, e.group)
            }(t, e), r.draw.call(this, t, e, n), e.clip && t.restore()
        }, clear(t, e, n, r) {
            const i = this._options, o = this.context();
            "pdf" === i.type || i.externalContext || o.clearRect(t, e, n, r), null != this._bgcolor && (o.fillStyle = this._bgcolor, o.fillRect(t, e, n, r))
        }
    });
    const Ny = (t, e) => n => {
        let r = n.target.__data__;
        r = Array.isArray(r) ? r[0] : r, n.vegaType = n.type, e.call(t._obj, n, r)
    };
    ut(zy, sy, {
        initialize(t, e, n) {
            let r = this._svg;
            return r && (r.removeEventListener(Ay, this._hrefHandler), r.removeEventListener(ky, this._tooltipHandler), r.removeEventListener(My, this._tooltipHandler)), this._svg = r = t && ry(t, "svg"), r && (r.addEventListener(Ay, this._hrefHandler), r.addEventListener(ky, this._tooltipHandler), r.addEventListener(My, this._tooltipHandler)), sy.prototype.initialize.call(this, t, e, n)
        }, canvas() {
            return this._svg
        }, on(t, e) {
            const n = this.eventName(t), r = this._handlers;
            if (this._handlerIndex(r[n], t, e) < 0) {
                const i = {type: t, handler: e, listener: Ny(this, e)};
                (r[n] || (r[n] = [])).push(i), this._svg && this._svg.addEventListener(n, i.listener)
            }
            return this
        }, off(t, e) {
            const n = this.eventName(t), r = this._handlers[n], i = this._handlerIndex(r, t, e);
            return i >= 0 && (this._svg && this._svg.removeEventListener(n, r[i].listener), r.splice(i, 1)), this
        }
    });
    const Oy = "aria-hidden", Ry = "aria-label", Ly = "role", Uy = "aria-roledescription", qy = "graphics-object",
        Py = "graphics-symbol", jy = (t, e, n) => ({[Ly]: t, [Uy]: e, [Ry]: n || void 0}),
        Iy = Dt(["axis-domain", "axis-grid", "axis-label", "axis-tick", "axis-title", "legend-band", "legend-entry", "legend-gradient", "legend-label", "legend-title", "legend-symbol", "title"]),
        $y = {
            axis: {
                desc: "axis", caption: function (t) {
                    const e = t.datum, n = t.orient, r = e.title ? Gy(t) : null, i = t.context,
                        o = i.scales[e.scale].value, a = i.dataflow.locale(), u = o.type;
                    return "".concat("left" === n || "right" === n ? "Y" : "X", "-axis") + (r ? " titled '".concat(r, "'") : "") + " for a ".concat(vd(u) ? "discrete" : u, " scale") + " with ".concat(Qd(a, o, t))
                }
            },
            legend: {
                desc: "legend", caption: function (t) {
                    const e = t.datum, n = e.title ? Gy(t) : null, r = "".concat(e.type || "", " legend").trim(),
                        i = e.scales, o = Object.keys(i), a = t.context, u = a.scales[i[o[0]]].value,
                        s = a.dataflow.locale();
                    return l = r, (l.length ? l[0].toUpperCase() + l.slice(1) : l) + (n ? " titled '".concat(n, "'") : "") + " for ".concat(function (t) {
                        return (t = t.map((t => t + ("fill" === t || "stroke" === t ? " color" : "")))).length < 2 ? t[0] : t.slice(0, -1).join(", ") + " and " + M(t)
                    }(o)) + " with ".concat(Qd(s, u, t));
                    var l
                }
            },
            "title-text": {desc: "title", caption: t => "Title text '".concat(Vy(t), "'")},
            "title-subtitle": {desc: "subtitle", caption: t => "Subtitle text '".concat(Vy(t), "'")}
        }, Wy = {ariaRole: Ly, ariaRoleDescription: Uy, description: Ry};

    function Hy(t, e) {
        const n = !1 === e.aria;
        if (t(Oy, n || void 0), n || null == e.description) for (const e in Wy) t(Wy[e], void 0); else {
            const n = e.mark.marktype;
            t(Ry, e.description), t(Ly, e.ariaRole || ("group" === n ? qy : Py)), t(Uy, e.ariaRoleDescription || "".concat(n, " mark"))
        }
    }

    function Yy(t) {
        return !1 === t.aria ? {[Oy]: !0} : Iy[t.role] ? null : $y[t.role] ? function (t, e) {
            try {
                const n = t.items[0], r = e.caption || (() => "");
                return jy(e.role || Py, e.desc, n.description || r(n))
            } catch (t) {
                return null
            }
        }(t, $y[t.role]) : function (t) {
            const e = t.marktype,
                n = "group" === e || "text" === e || t.items.some((t => null != t.description && !1 !== t.aria));
            return jy(n ? qy : Py, "".concat(e, " mark container"), t.description)
        }(t)
    }

    function Vy(t) {
        return $(t.text).join(" ")
    }

    function Gy(t) {
        try {
            return $(M(t.items).items[0].text).join(" ")
        } catch (t) {
            return null
        }
    }

    const Xy = t => (t + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    function Jy() {
        let t = "", e = "", n = "";
        const r = [], i = () => e = n = "",
            o = (t, n) => (null != n && (e += " ".concat(t, '="').concat(Xy(n).replace(/"/g, "&quot;").replace(/\t/g, "&#x9;").replace(/\n/g, "&#xA;").replace(/\r/g, "&#xD;"), '"')), a),
            a = {
                open(u, ...s) {
                    (o => {
                        e && (t += "".concat(e, ">").concat(n), i()), r.push(o)
                    })(u), e = "<" + u;
                    for (const t of s) for (const e in t) o(e, t[e]);
                    return a
                }, close() {
                    const o = r.pop();
                    return t += e ? e + (n ? ">".concat(n, "</").concat(o, ">") : "/>") : "</".concat(o, ">"), i(), a
                }, attr: o, text: t => (n += Xy(t), a), toString: () => t
            };
        return a
    }

    const Zy = t => Qy(Jy(), t) + "";

    function Qy(t, e) {
        if (t.open(e.tagName), e.hasAttributes()) {
            const n = e.attributes, r = n.length;
            for (let e = 0; e < r; ++e) t.attr(n[e].name, n[e].value)
        }
        if (e.hasChildNodes()) {
            const n = e.childNodes, r = n.length;
            for (let e = 0; e < r; e++) {
                const r = n[e];
                3 === r.nodeType ? t.text(r.nodeValue) : Qy(t, r)
            }
        }
        return t.close()
    }

    const Ky = {
        fill: "fill",
        fillOpacity: "fill-opacity",
        stroke: "stroke",
        strokeOpacity: "stroke-opacity",
        strokeWidth: "stroke-width",
        strokeCap: "stroke-linecap",
        strokeJoin: "stroke-linejoin",
        strokeDash: "stroke-dasharray",
        strokeDashOffset: "stroke-dashoffset",
        strokeMiterLimit: "stroke-miterlimit",
        opacity: "opacity",
        blend: "mix-blend-mode"
    }, tv = {fill: "none", "stroke-miterlimit": 10}, ev = fm.xmlns;

    function nv(t) {
        cy.call(this, t), this._dirtyID = 0, this._dirty = [], this._svg = null, this._root = null, this._defs = null
    }

    const rv = cy.prototype;

    function iv(t, e) {
        for (; t && t.dirty !== e; t = t.mark.group) {
            if (t.dirty = e, !t.mark || t.mark.dirty === e) return;
            t.mark.dirty = e
        }
    }

    function ov(t, e, n) {
        let r, i, o;
        if ("radial" === e.gradient) {
            let r = iy(t, n++, "pattern", ev);
            dv(r, {
                id: tp + e.id,
                viewBox: "0,0,1,1",
                width: "100%",
                height: "100%",
                preserveAspectRatio: "xMidYMid slice"
            }), r = iy(r, 0, "rect", ev), dv(r, {
                width: 1,
                height: 1,
                fill: "url(".concat(gv(), "#").concat(e.id, ")")
            }), dv(t = iy(t, n++, "radialGradient", ev), {
                id: e.id,
                fx: e.x1,
                fy: e.y1,
                fr: e.r1,
                cx: e.x2,
                cy: e.y2,
                r: e.r2
            })
        } else dv(t = iy(t, n++, "linearGradient", ev), {id: e.id, x1: e.x1, x2: e.x2, y1: e.y1, y2: e.y2});
        for (r = 0, i = e.stops.length; r < i; ++r) o = iy(t, r, "stop", ev), o.setAttribute("offset", e.stops[r].offset), o.setAttribute("stop-color", e.stops[r].color);
        return oy(t, r), n
    }

    function av(t, e, n) {
        let r;
        return (t = iy(t, n, "clipPath", ev)).setAttribute("id", e.id), e.path ? (r = iy(t, 0, "path", ev), r.setAttribute("d", e.path)) : (r = iy(t, 0, "rect", ev), dv(r, {
            x: 0,
            y: 0,
            width: e.width,
            height: e.height
        })), oy(t, 1), n + 1
    }

    function uv(t, e, n, r, i) {
        let o, a = t._svg;
        if (!a && (o = e.ownerDocument, a = ny(o, r, ev), t._svg = a, t.mark && (a.__data__ = t, a.__values__ = {fill: "default"}, "g" === r))) {
            const e = ny(o, "path", ev);
            a.appendChild(e), e.__data__ = t;
            const n = ny(o, "g", ev);
            a.appendChild(n), n.__data__ = t;
            const r = ny(o, "path", ev);
            a.appendChild(r), r.__data__ = t, r.__values__ = {fill: "default"}
        }
        return (a.ownerSVGElement !== i || function (t, e) {
            return t.parentNode && t.parentNode.childNodes.length > 1 && t.previousSibling != e
        }(a, n)) && e.insertBefore(a, n ? n.nextSibling : e.firstChild), a
    }

    ut(nv, cy, {
        initialize(t, e, n, r, i) {
            return this._defs = {}, this._clearDefs(), t && (this._svg = iy(t, 0, "svg", ev), dv(this._svg, fm), this._svg.setAttribute("class", "marks"), oy(t, 1), this._root = iy(this._svg, 0, "g", ev), dv(this._root, tv), oy(this._svg, 1)), this.background(this._bgcolor), rv.initialize.call(this, t, e, n, r, i)
        }, background(t) {
            return arguments.length && this._svg && this._svg.style.setProperty("background-color", t), rv.background.apply(this, arguments)
        }, resize(t, e, n, r) {
            return rv.resize.call(this, t, e, n, r), this._svg && (dv(this._svg, {
                width: this._width * this._scale,
                height: this._height * this._scale,
                viewBox: "0 0 ".concat(this._width, " ").concat(this._height)
            }), this._root.setAttribute("transform", "translate(".concat(this._origin, ")"))), this._dirty = [], this
        }, canvas() {
            return this._svg
        }, svg() {
            const t = this._svg, e = this._bgcolor;
            if (!t) return null;
            let n;
            e && (t.removeAttribute("style"), n = iy(t, 0, "rect", ev), dv(n, {
                width: this._width,
                height: this._height,
                fill: e
            }));
            const r = Zy(t);
            return e && (t.removeChild(n), this._svg.style.setProperty("background-color", e)), r
        }, _render(t) {
            return this._dirtyCheck() && (this._dirtyAll && this._clearDefs(), this.mark(this._root, t), oy(this._root, 1)), this.defs(), this._dirty = [], ++this._dirtyID, this
        }, dirty(t) {
            t.dirty !== this._dirtyID && (t.dirty = this._dirtyID, this._dirty.push(t))
        }, isDirty(t) {
            return this._dirtyAll || !t._svg || t.dirty === this._dirtyID
        }, _dirtyCheck() {
            this._dirtyAll = !0;
            const t = this._dirty;
            if (!t.length || !this._dirtyID) return !0;
            const e = ++this._dirtyID;
            let n, r, i, o, a, u, s;
            for (a = 0, u = t.length; a < u; ++a) n = t[a], r = n.mark, r.marktype !== i && (i = r.marktype, o = Ym[i]), r.zdirty && r.dirty !== e && (this._dirtyAll = !1, iv(n, e), r.items.forEach((t => {
                t.dirty = e
            }))), r.zdirty || (n.exit ? (o.nested && r.items.length ? (s = r.items[0], s._svg && this._update(o, s._svg, s)) : n._svg && (s = n._svg.parentNode, s && s.removeChild(n._svg)), n._svg = null) : (n = o.nested ? r.items[0] : n, n._update !== e && (n._svg && n._svg.ownerSVGElement ? this._update(o, n._svg, n) : (this._dirtyAll = !1, iv(n, e)), n._update = e)));
            return !this._dirtyAll
        }, mark(t, e, n) {
            if (!this.isDirty(e)) return e._svg;
            const r = this._svg, i = Ym[e.marktype], o = !1 === e.interactive ? "none" : null, a = "g" === i.tag;
            let u = null, s = 0;
            const l = uv(e, t, n, "g", r);
            l.setAttribute("class", ay(e));
            const c = Yy(e);
            for (const t in c) pv(l, t, c[t]);
            a || pv(l, "pointer-events", o), pv(l, "clip-path", e.clip ? Jp(this, e, e.group) : null);
            const f = t => {
                const e = this.isDirty(t), n = uv(t, l, u, i.tag, r);
                e && (this._update(i, n, t), a && function (t, e, n) {
                    e = e.lastChild.previousSibling;
                    let r, i = 0;
                    Ig(n, (n => {
                        r = t.mark(e, n, r), ++i
                    })), oy(e, 1 + i)
                }(this, n, t)), u = n, ++s
            };
            return i.nested ? e.items.length && f(e.items[0]) : Ig(e, f), oy(l, s), l
        }, _update(t, e, n) {
            sv = e, lv = e.__values__, Hy(fv, n), t.attr(fv, n, this);
            const r = cv[t.type];
            r && r.call(this, t, e, n), sv && this.style(sv, n)
        }, style(t, e) {
            if (null != e) for (const n in Ky) {
                let r = "font" === n ? qm(e) : e[n];
                if (r === lv[n]) continue;
                const i = Ky[n];
                null == r ? t.removeAttribute(i) : (ep(r) && (r = np(r, this._defs.gradient, gv())), t.setAttribute(i, r + "")), lv[n] = r
            }
        }, defs() {
            const t = this._svg, e = this._defs;
            let n = e.el, r = 0;
            for (const i in e.gradient) n || (e.el = n = iy(t, 1, "defs", ev)), r = ov(n, e.gradient[i], r);
            for (const i in e.clipping) n || (e.el = n = iy(t, 1, "defs", ev)), r = av(n, e.clipping[i], r);
            n && (0 === r ? (t.removeChild(n), e.el = null) : oy(n, r))
        }, _clearDefs() {
            const t = this._defs;
            t.gradient = {}, t.clipping = {}
        }
    });
    let sv = null, lv = null;
    const cv = {
        group(t, e, n) {
            const r = sv = e.childNodes[2];
            lv = r.__values__, t.foreground(fv, n, this), lv = e.__values__, sv = e.childNodes[1], t.content(fv, n, this);
            const i = sv = e.childNodes[0];
            t.background(fv, n, this);
            const o = !1 === n.mark.interactive ? "none" : null;
            if (o !== lv.events && (pv(r, "pointer-events", o), pv(i, "pointer-events", o), lv.events = o), n.strokeForeground && n.stroke) {
                const t = n.fill;
                pv(r, "display", null), this.style(i, n), pv(i, "stroke", null), t && (n.fill = null), lv = r.__values__, this.style(r, n), t && (n.fill = t), sv = null
            } else pv(r, "display", "none")
        }, image(t, e, n) {
            !1 === n.smooth ? (hv(e, "image-rendering", "optimizeSpeed"), hv(e, "image-rendering", "pixelated")) : hv(e, "image-rendering", null)
        }, text(t, e, n) {
            const r = Rm(n);
            let i, o, a, u;
            v(r) ? (o = r.map((t => Um(n, t))), i = o.join("\n"), i !== lv.text && (oy(e, 0), a = e.ownerDocument, u = Om(n), o.forEach(((t, r) => {
                const i = ny(a, "tspan", ev);
                i.__data__ = n, i.textContent = t, r && (i.setAttribute("x", 0), i.setAttribute("dy", u)), e.appendChild(i)
            })), lv.text = i)) : (o = Um(n, r), o !== lv.text && (e.textContent = o, lv.text = o)), pv(e, "font-family", qm(n)), pv(e, "font-size", Nm(n) + "px"), pv(e, "font-style", n.fontStyle), pv(e, "font-variant", n.fontVariant), pv(e, "font-weight", n.fontWeight)
        }
    };

    function fv(t, e, n) {
        e !== lv[t] && (n ? function (t, e, n, r) {
            null != n ? t.setAttributeNS(r, e, n) : t.removeAttributeNS(r, e)
        }(sv, t, e, n) : pv(sv, t, e), lv[t] = e)
    }

    function hv(t, e, n) {
        n !== lv[e] && (null == n ? t.style.removeProperty(e) : t.style.setProperty(e, n + ""), lv[e] = n)
    }

    function dv(t, e) {
        for (const n in e) pv(t, n, e[n])
    }

    function pv(t, e, n) {
        null != n ? t.setAttribute(e, n) : t.removeAttribute(e)
    }

    function gv() {
        let t;
        return "undefined" == typeof window ? "" : (t = window.location).hash ? t.href.slice(0, -t.hash.length) : t.href
    }

    function mv(t) {
        cy.call(this, t), this._text = null, this._defs = {gradient: {}, clipping: {}}
    }

    ut(mv, cy, {
        svg() {
            return this._text
        }, _render(t) {
            const e = Jy();
            e.open("svg", K({}, fm, {
                class: "marks",
                width: this._width * this._scale,
                height: this._height * this._scale,
                viewBox: "0 0 ".concat(this._width, " ").concat(this._height)
            }));
            const n = this._bgcolor;
            return n && "transparent" !== n && "none" !== n && e.open("rect", {
                width: this._width,
                height: this._height,
                fill: n
            }).close(), e.open("g", tv, {transform: "translate(" + this._origin + ")"}), this.mark(e, t), e.close(), this.defs(e), this._text = e.close() + "", this
        }, mark(t, e) {
            const n = Ym[e.marktype], r = n.tag, i = [Hy, n.attr];
            t.open("g", {
                class: ay(e),
                "clip-path": e.clip ? Jp(this, e, e.group) : null
            }, Yy(e), {"pointer-events": "g" !== r && !1 === e.interactive ? "none" : null});
            const o = o => {
                const a = this.href(o);
                if (a && t.open("a", a), t.open(r, this.attr(e, o, i, "g" !== r ? r : null)), "text" === r) {
                    const e = Rm(o);
                    if (v(e)) {
                        const n = {x: 0, dy: Om(o)};
                        for (let r = 0; r < e.length; ++r) t.open("tspan", r ? n : null).text(Um(o, e[r])).close()
                    } else t.text(Um(o, e))
                } else if ("g" === r) {
                    const r = o.strokeForeground, i = o.fill, a = o.stroke;
                    r && a && (o.stroke = null), t.open("path", this.attr(e, o, n.background, "bgrect")).close(), t.open("g", this.attr(e, o, n.content)), Ig(o, (e => this.mark(t, e))), t.close(), r && a ? (i && (o.fill = null), o.stroke = a, t.open("path", this.attr(e, o, n.foreground, "bgrect")).close(), i && (o.fill = i)) : t.open("path", this.attr(e, o, n.foreground, "bgfore")).close()
                }
                t.close(), a && t.close()
            };
            return n.nested ? e.items && e.items.length && o(e.items[0]) : Ig(e, o), t.close()
        }, href(t) {
            const e = t.href;
            let n;
            if (e) {
                if (n = this._hrefs && this._hrefs[e]) return n;
                this.sanitizeURL(e).then((t => {
                    t["xlink:href"] = t.href, t.href = null, (this._hrefs || (this._hrefs = {}))[e] = t
                }))
            }
            return null
        }, attr(t, e, n, r) {
            const i = {}, o = (t, e, n, r) => {
                i[r || t] = e
            };
            return Array.isArray(n) ? n.forEach((t => t(o, e, this))) : n(o, e, this), r && function (t, e, n, r, i) {
                if (null == e) return t;
                "bgrect" === r && !1 === n.interactive && (t["pointer-events"] = "none");
                if ("bgfore" === r && (!1 === n.interactive && (t["pointer-events"] = "none"), t.display = "none", null !== e.fill)) return t;
                "image" === r && !1 === e.smooth && (t.style = "image-rendering: optimizeSpeed; image-rendering: pixelated;");
                "text" === r && (t["font-family"] = qm(e), t["font-size"] = Nm(e) + "px", t["font-style"] = e.fontStyle, t["font-variant"] = e.fontVariant, t["font-weight"] = e.fontWeight);
                for (const n in Ky) {
                    let r = e[n];
                    const o = Ky[n];
                    ("transparent" !== r || "fill" !== o && "stroke" !== o) && null != r && (ep(r) && (r = np(r, i.gradient, "")), t[o] = r)
                }
            }(i, e, t, r, this._defs), i
        }, defs(t) {
            const e = this._defs.gradient, n = this._defs.clipping;
            if (0 !== Object.keys(e).length + Object.keys(n).length) {
                t.open("defs");
                for (const n in e) {
                    const r = e[n], i = r.stops;
                    "radial" === r.gradient ? (t.open("pattern", {
                        id: tp + n,
                        viewBox: "0,0,1,1",
                        width: "100%",
                        height: "100%",
                        preserveAspectRatio: "xMidYMid slice"
                    }), t.open("rect", {
                        width: "1",
                        height: "1",
                        fill: "url(#" + n + ")"
                    }).close(), t.close(), t.open("radialGradient", {
                        id: n,
                        fx: r.x1,
                        fy: r.y1,
                        fr: r.r1,
                        cx: r.x2,
                        cy: r.y2,
                        r: r.r2
                    })) : t.open("linearGradient", {id: n, x1: r.x1, x2: r.x2, y1: r.y1, y2: r.y2});
                    for (let e = 0; e < i.length; ++e) t.open("stop", {
                        offset: i[e].offset,
                        "stop-color": i[e].color
                    }).close();
                    t.close()
                }
                for (const e in n) {
                    const r = n[e];
                    t.open("clipPath", {id: e}), r.path ? t.open("path", {d: r.path}).close() : t.open("rect", {
                        x: 0,
                        y: 0,
                        width: r.width,
                        height: r.height
                    }).close(), t.close()
                }
                t.close()
            }
        }
    });
    const yv = "canvas", vv = "none", _v = {Canvas: yv, PNG: "png", SVG: "svg", None: vv}, xv = {};

    function bv(t, e) {
        return t = String(t || "").toLowerCase(), arguments.length > 1 ? (xv[t] = e, this) : xv[t]
    }

    function wv(t, e, n) {
        const r = [], i = (new Zp).union(e), o = t.marktype;
        return o ? kv(t, i, n, r) : "group" === o ? Mv(t, i, n, r) : u("Intersect scene must be mark node or group item.")
    }

    function kv(t, e, n, r) {
        if (function (t, e, n) {
            return t.bounds && e.intersects(t.bounds) && ("group" === t.marktype || !1 !== t.interactive && (!n || n(t)))
        }(t, e, n)) {
            const i = t.items, o = t.marktype, a = i.length;
            let u = 0;
            if ("group" === o) for (; u < a; ++u) Mv(i[u], e, n, r); else for (const t = Ym[o].isect; u < a; ++u) {
                const n = i[u];
                Av(n, e, t) && r.push(n)
            }
        }
        return r
    }

    function Mv(t, e, n, r) {
        n && n(t.mark) && Av(t, e, Ym.group.isect) && r.push(t);
        const i = t.items, o = i && i.length;
        if (o) {
            const a = t.x || 0, u = t.y || 0;
            e.translate(-a, -u);
            for (let t = 0; t < o; ++t) kv(i[t], e, n, r);
            e.translate(a, u)
        }
        return r
    }

    function Av(t, e, n) {
        const r = t.bounds;
        return e.encloses(r) || e.intersects(r) && n(t, e)
    }

    xv.canvas = xv.png = {renderer: By, headless: By, handler: Ey}, xv.svg = {
        renderer: nv,
        headless: mv,
        handler: zy
    }, xv.none = {};
    const Ev = new Zp;

    function Dv(t) {
        const e = t.clip;
        if (H(e)) e(bg(Ev.clear())); else {
            if (!e) return;
            Ev.set(0, 0, t.group.width, t.group.height)
        }
        t.bounds.intersect(Ev)
    }

    function Cv(t, e, n) {
        return t === e || ("path" === n ? Fv(t, e) : t instanceof Date && e instanceof Date ? +t == +e : ht(t) && ht(e) ? Math.abs(t - e) <= 1e-9 : t && e && (_(t) || _(e)) ? function (t, e) {
            var n, r, i = Object.keys(t), o = Object.keys(e);
            if (i.length !== o.length) return !1;
            for (i.sort(), o.sort(), r = i.length - 1; r >= 0; r--) if (i[r] != o[r]) return !1;
            for (r = i.length - 1; r >= 0; r--) if (!Cv(t[n = i[r]], e[n], n)) return !1;
            return typeof t == typeof e
        }(t, e) : t == e)
    }

    function Fv(t, e) {
        return Cv(lp(t), lp(e))
    }

    const Sv = "top", Bv = "left", Tv = "right", zv = "bottom", Nv = "start", Ov = "middle", Rv = "end", Lv = "group",
        Uv = "axis", qv = "title", Pv = "frame", jv = "scope", Iv = "legend", $v = "row-header", Wv = "row-footer",
        Hv = "row-title", Yv = "column-header", Vv = "column-footer", Gv = "column-title", Xv = "padding", Jv = "fit",
        Zv = "fit-x", Qv = "fit-y", Kv = "none", t_ = "all", e_ = "each", n_ = "flush", r_ = "column", i_ = "row";

    function o_(t) {
        pa.call(this, null, t)
    }

    function a_(t, e, n) {
        return e(t.bounds.clear(), t, n)
    }

    ut(o_, pa, {
        transform(t, e) {
            const n = e.dataflow, r = t.mark, i = r.marktype, o = Ym[i], a = o.bound;
            let u, s = r.bounds;
            if (o.nested) r.items.length && n.dirty(r.items[0]), s = a_(r, a), r.items.forEach((t => {
                t.bounds.clear().union(s)
            })); else if (i === Lv || t.modified()) switch (e.visit(e.MOD, (t => n.dirty(t))), s.clear(), r.items.forEach((t => s.union(a_(t, a)))), r.role) {
                case Uv:
                case Iv:
                case qv:
                    e.reflow()
            } else u = e.changed(e.REM), e.visit(e.ADD, (t => {
                s.union(a_(t, a))
            })), e.visit(e.MOD, (t => {
                u = u || s.alignsWith(t.bounds), n.dirty(t), s.union(a_(t, a))
            })), u && (s.clear(), r.items.forEach((t => s.union(t.bounds))));
            return Dv(r), e.modifies("bounds")
        }
    });
    const u_ = ":vega_identifier:";

    function s_(t) {
        pa.call(this, 0, t)
    }

    function l_(t) {
        pa.call(this, null, t)
    }

    function c_(t) {
        pa.call(this, null, t)
    }

    s_.Definition = {
        type: "Identifier",
        metadata: {modifies: !0},
        params: [{name: "as", type: "string", required: !0}]
    }, ut(s_, pa, {
        transform(t, e) {
            const n = (i = e.dataflow)._signals[u_] || (i._signals[u_] = i.add(0)), r = t.as;
            var i;
            let o = n.value;
            return e.visit(e.ADD, (t => t[r] = t[r] || ++o)), n.set(this.value = o), e
        }
    }), ut(l_, pa, {
        transform(t, e) {
            let n = this.value;
            n || (n = e.dataflow.scenegraph().mark(t.markdef, function (t) {
                const e = t.groups, n = t.parent;
                return e && 1 === e.size ? e.get(Object.keys(e.object)[0]) : e && n ? e.lookup(n) : null
            }(t), t.index), n.group.context = t.context, t.context.group || (t.context.group = n.group), n.source = this.source, n.clip = t.clip, n.interactive = t.interactive, this.value = n);
            const r = n.marktype === Lv ? Kp : Qp;
            return e.visit(e.ADD, (t => r.call(t, n))), (t.modified("clip") || t.modified("interactive")) && (n.clip = t.clip, n.interactive = !!t.interactive, n.zdirty = !0, e.reflow()), n.items = e.source, e
        }
    });
    const f_ = {
        parity: t => t.filter(((t, e) => e % 2 ? t.opacity = 0 : 1)), greedy: (t, e) => {
            let n;
            return t.filter(((t, r) => r && h_(n.bounds, t.bounds, e) ? t.opacity = 0 : (n = t, 1)))
        }
    }, h_ = (t, e, n) => n > Math.max(e.x1 - t.x2, t.x1 - e.x2, e.y1 - t.y2, t.y1 - e.y2), d_ = (t, e) => {
        for (var n, r = 1, i = t.length, o = t[0].bounds; r < i; o = n, ++r) if (h_(o, n = t[r].bounds, e)) return !0
    }, p_ = t => {
        const e = t.bounds;
        return e.width() > 1 && e.height() > 1
    }, g_ = t => (t.forEach((t => t.opacity = 1)), t), m_ = (t, e) => t.reflow(e.modified()).modifies("opacity");

    function y_(t) {
        pa.call(this, null, t)
    }

    ut(c_, pa, {
        transform(t, e) {
            const n = f_[t.method] || f_.parity, r = t.separation || 0;
            let i, o, a = e.materialize(e.SOURCE).source;
            if (!a || !a.length) return;
            if (!t.method) return t.modified("method") && (g_(a), e = m_(e, t)), e;
            if (a = a.filter(p_), !a.length) return;
            if (t.sort && (a = a.slice().sort(t.sort)), i = g_(a), e = m_(e, t), i.length >= 3 && d_(i, r)) {
                do {
                    i = n(i, r)
                } while (i.length >= 3 && d_(i, r));
                i.length < 3 && !M(a).opacity && (i.length > 1 && (M(i).opacity = 0), M(a).opacity = 1)
            }
            t.boundScale && t.boundTolerance >= 0 && (o = ((t, e, n) => {
                var r = t.range(), i = new Zp;
                return e === Sv || e === zv ? i.set(r[0], -1 / 0, r[1], 1 / 0) : i.set(-1 / 0, r[0], 1 / 0, r[1]), i.expand(n || 1), t => i.encloses(t.bounds)
            })(t.boundScale, t.boundOrient, +t.boundTolerance), a.forEach((t => {
                o(t) || (t.opacity = 0)
            })));
            const u = i[0].mark.bounds.clear();
            return a.forEach((t => {
                t.opacity && u.union(t.bounds)
            })), e
        }
    }), ut(y_, pa, {
        transform(t, e) {
            const n = e.dataflow;
            if (e.visit(e.ALL, (t => n.dirty(t))), e.fields && e.fields.zindex) {
                const t = e.source && e.source[0];
                t && (t.mark.zdirty = !0)
            }
        }
    });
    const v_ = new Zp;

    function __(t, e, n) {
        return t[e] === n ? 0 : (t[e] = n, 1)
    }

    function x_(t) {
        var e = t.items[0].orient;
        return e === Bv || e === Tv
    }

    function b_(t, e, n, r) {
        var i, o, a = e.items[0], u = a.datum, s = null != a.translate ? a.translate : .5, l = a.orient,
            c = function (t) {
                let e = +t.grid;
                return [t.ticks ? e++ : -1, t.labels ? e++ : -1, e + +t.domain]
            }(u), f = a.range, h = a.offset, d = a.position, p = a.minExtent, g = a.maxExtent,
            m = u.title && a.items[c[2]].items[0], y = a.titlePadding, v = a.bounds, _ = m && Lm(m), x = 0, b = 0;
        switch (v_.clear().union(v), v.clear(), (i = c[0]) > -1 && v.union(a.items[i].bounds), (i = c[1]) > -1 && v.union(a.items[i].bounds), l) {
            case Sv:
                x = d || 0, b = -h, o = Math.max(p, Math.min(g, -v.y1)), v.add(0, -o).add(f, 0), m && w_(t, m, o, y, _, 0, -1, v);
                break;
            case Bv:
                x = -h, b = d || 0, o = Math.max(p, Math.min(g, -v.x1)), v.add(-o, 0).add(0, f), m && w_(t, m, o, y, _, 1, -1, v);
                break;
            case Tv:
                x = n + h, b = d || 0, o = Math.max(p, Math.min(g, v.x2)), v.add(0, 0).add(o, f), m && w_(t, m, o, y, _, 1, 1, v);
                break;
            case zv:
                x = d || 0, b = r + h, o = Math.max(p, Math.min(g, v.y2)), v.add(0, 0).add(f, o), m && w_(t, m, o, y, 0, 0, 1, v);
                break;
            default:
                x = a.x, b = a.y
        }
        return rg(v.translate(x, b), a), __(a, "x", x + s) | __(a, "y", b + s) && (a.bounds = v_, t.dirty(a), a.bounds = v, t.dirty(a)), a.mark.bounds.clear().union(v)
    }

    function w_(t, e, n, r, i, o, a, u) {
        const s = e.bounds;
        if (e.auto) {
            const u = a * (n + i + r);
            let l = 0, c = 0;
            t.dirty(e), o ? l = (e.x || 0) - (e.x = u) : c = (e.y || 0) - (e.y = u), e.mark.bounds.clear().union(s.translate(-l, -c)), t.dirty(e)
        }
        u.union(s)
    }

    const k_ = (t, e) => Math.floor(Math.min(t, e)), M_ = (t, e) => Math.ceil(Math.max(t, e));

    function A_(t) {
        return (new Zp).set(0, 0, t.width || 0, t.height || 0)
    }

    function E_(t) {
        const e = t.bounds.clone();
        return e.empty() ? e.set(0, 0, 0, 0) : e.translate(-(t.x || 0), -(t.y || 0))
    }

    function D_(t, e, n) {
        const r = _(t) ? t[e] : t;
        return null != r ? r : void 0 !== n ? n : 0
    }

    function C_(t) {
        return t < 0 ? Math.ceil(-t) : 0
    }

    function F_(t, e, n) {
        var r, i, o, a, u, s, l, c, f, h, d, p = !n.nodirty, g = n.bounds === n_ ? A_ : E_, m = v_.set(0, 0, 0, 0),
            y = D_(n.align, r_), v = D_(n.align, i_), _ = D_(n.padding, r_), x = D_(n.padding, i_),
            b = n.columns || e.length, w = b <= 0 ? 1 : Math.ceil(e.length / b), k = e.length, M = Array(k),
            A = Array(b), E = 0, D = Array(k), C = Array(w), F = 0, S = Array(k), B = Array(k), T = Array(k);
        for (i = 0; i < b; ++i) A[i] = 0;
        for (i = 0; i < w; ++i) C[i] = 0;
        for (i = 0; i < k; ++i) s = e[i], u = T[i] = g(s), s.x = s.x || 0, S[i] = 0, s.y = s.y || 0, B[i] = 0, o = i % b, a = ~~(i / b), E = Math.max(E, l = Math.ceil(u.x2)), F = Math.max(F, c = Math.ceil(u.y2)), A[o] = Math.max(A[o], l), C[a] = Math.max(C[a], c), M[i] = _ + C_(u.x1), D[i] = x + C_(u.y1), p && t.dirty(e[i]);
        for (i = 0; i < k; ++i) i % b == 0 && (M[i] = 0), i < b && (D[i] = 0);
        if (y === e_) for (o = 1; o < b; ++o) {
            for (d = 0, i = o; i < k; i += b) d < M[i] && (d = M[i]);
            for (i = o; i < k; i += b) M[i] = d + A[o - 1]
        } else if (y === t_) {
            for (d = 0, i = 0; i < k; ++i) i % b && d < M[i] && (d = M[i]);
            for (i = 0; i < k; ++i) i % b && (M[i] = d + E)
        } else for (y = !1, o = 1; o < b; ++o) for (i = o; i < k; i += b) M[i] += A[o - 1];
        if (v === e_) for (a = 1; a < w; ++a) {
            for (d = 0, r = (i = a * b) + b; i < r; ++i) d < D[i] && (d = D[i]);
            for (i = a * b; i < r; ++i) D[i] = d + C[a - 1]
        } else if (v === t_) {
            for (d = 0, i = b; i < k; ++i) d < D[i] && (d = D[i]);
            for (i = b; i < k; ++i) D[i] = d + F
        } else for (v = !1, a = 1; a < w; ++a) for (r = (i = a * b) + b; i < r; ++i) D[i] += C[a - 1];
        for (f = 0, i = 0; i < k; ++i) f = M[i] + (i % b ? f : 0), S[i] += f - e[i].x;
        for (o = 0; o < b; ++o) for (h = 0, i = o; i < k; i += b) h += D[i], B[i] += h - e[i].y;
        if (y && D_(n.center, r_) && w > 1) for (i = 0; i < k; ++i) (f = (u = y === t_ ? E : A[i % b]) - T[i].x2 - e[i].x - S[i]) > 0 && (S[i] += f / 2);
        if (v && D_(n.center, i_) && 1 !== b) for (i = 0; i < k; ++i) (h = (u = v === t_ ? F : C[~~(i / b)]) - T[i].y2 - e[i].y - B[i]) > 0 && (B[i] += h / 2);
        for (i = 0; i < k; ++i) m.union(T[i].translate(S[i], B[i]));
        switch (f = D_(n.anchor, "x"), h = D_(n.anchor, "y"), D_(n.anchor, r_)) {
            case Rv:
                f -= m.width();
                break;
            case Ov:
                f -= m.width() / 2
        }
        switch (D_(n.anchor, i_)) {
            case Rv:
                h -= m.height();
                break;
            case Ov:
                h -= m.height() / 2
        }
        for (f = Math.round(f), h = Math.round(h), m.clear(), i = 0; i < k; ++i) e[i].mark.bounds.clear();
        for (i = 0; i < k; ++i) (s = e[i]).x += S[i] += f, s.y += B[i] += h, m.union(s.mark.bounds.union(s.bounds.translate(S[i], B[i]))), p && t.dirty(s);
        return m
    }

    function S_(t, e, n) {
        var r, i, o, a, u, s, l, c = function (t) {
                var e, n, r = t.items, i = r.length, o = 0;
                const a = {
                    marks: [],
                    rowheaders: [],
                    rowfooters: [],
                    colheaders: [],
                    colfooters: [],
                    rowtitle: null,
                    coltitle: null
                };
                for (; o < i; ++o) if (n = (e = r[o]).items, e.marktype === Lv) switch (e.role) {
                    case Uv:
                    case Iv:
                    case qv:
                        break;
                    case $v:
                        a.rowheaders.push(...n);
                        break;
                    case Wv:
                        a.rowfooters.push(...n);
                        break;
                    case Yv:
                        a.colheaders.push(...n);
                        break;
                    case Vv:
                        a.colfooters.push(...n);
                        break;
                    case Hv:
                        a.rowtitle = n[0];
                        break;
                    case Gv:
                        a.coltitle = n[0];
                        break;
                    default:
                        a.marks.push(...n)
                }
                return a
            }(e), f = c.marks, h = n.bounds === n_ ? B_ : T_, d = n.offset, p = n.columns || f.length,
            g = p <= 0 ? 1 : Math.ceil(f.length / p), m = g * p;
        const y = F_(t, f, n);
        y.empty() && y.set(0, 0, 0, 0), c.rowheaders && (s = D_(n.headerBand, i_, null), r = z_(t, c.rowheaders, f, p, g, -D_(d, "rowHeader"), k_, 0, h, "x1", 0, p, 1, s)), c.colheaders && (s = D_(n.headerBand, r_, null), i = z_(t, c.colheaders, f, p, p, -D_(d, "columnHeader"), k_, 1, h, "y1", 0, 1, p, s)), c.rowfooters && (s = D_(n.footerBand, i_, null), o = z_(t, c.rowfooters, f, p, g, D_(d, "rowFooter"), M_, 0, h, "x2", p - 1, p, 1, s)), c.colfooters && (s = D_(n.footerBand, r_, null), a = z_(t, c.colfooters, f, p, p, D_(d, "columnFooter"), M_, 1, h, "y2", m - p, 1, p, s)), c.rowtitle && (u = D_(n.titleAnchor, i_), l = D_(d, "rowTitle"), l = u === Rv ? o + l : r - l, s = D_(n.titleBand, i_, .5), N_(t, c.rowtitle, l, 0, y, s)), c.coltitle && (u = D_(n.titleAnchor, r_), l = D_(d, "columnTitle"), l = u === Rv ? a + l : i - l, s = D_(n.titleBand, r_, .5), N_(t, c.coltitle, l, 1, y, s))
    }

    function B_(t, e) {
        return "x1" === e ? t.x || 0 : "y1" === e ? t.y || 0 : "x2" === e ? (t.x || 0) + (t.width || 0) : "y2" === e ? (t.y || 0) + (t.height || 0) : void 0
    }

    function T_(t, e) {
        return t.bounds[e]
    }

    function z_(t, e, n, r, i, o, a, u, s, l, c, f, h, d) {
        var p, g, m, y, v, _, x, b, w, k = n.length, M = 0, A = 0;
        if (!k) return M;
        for (p = c; p < k; p += f) n[p] && (M = a(M, s(n[p], l)));
        if (!e.length) return M;
        for (e.length > i && (t.warn("Grid headers exceed limit: " + i), e = e.slice(0, i)), M += o, g = 0, y = e.length; g < y; ++g) t.dirty(e[g]), e[g].mark.bounds.clear();
        for (p = c, g = 0, y = e.length; g < y; ++g, p += f) {
            for (v = (_ = e[g]).mark.bounds, m = p; m >= 0 && null == (x = n[m]); m -= h) ;
            u ? (b = null == d ? x.x : Math.round(x.bounds.x1 + d * x.bounds.width()), w = M) : (b = M, w = null == d ? x.y : Math.round(x.bounds.y1 + d * x.bounds.height())), v.union(_.bounds.translate(b - (_.x || 0), w - (_.y || 0))), _.x = b, _.y = w, t.dirty(_), A = a(A, v[l])
        }
        return A
    }

    function N_(t, e, n, r, i, o) {
        if (e) {
            t.dirty(e);
            var a = n, u = n;
            r ? a = Math.round(i.x1 + o * i.width()) : u = Math.round(i.y1 + o * i.height()), e.bounds.translate(a - (e.x || 0), u - (e.y || 0)), e.mark.bounds.clear().union(e.bounds), e.x = a, e.y = u, t.dirty(e)
        }
    }

    function O_(t, e, n, r, i, o, a) {
        const u = function (t, e) {
            const n = t[e] || {};
            return (e, r) => null != n[e] ? n[e] : null != t[e] ? t[e] : r
        }(n, e), s = function (t, e) {
            let n = -1 / 0;
            return t.forEach((t => {
                null != t.offset && (n = Math.max(n, t.offset))
            })), n > -1 / 0 ? n : e
        }(t, u("offset", 0)), l = u("anchor", Nv), c = l === Rv ? 1 : l === Ov ? .5 : 0, f = {
            align: e_,
            bounds: u("bounds", n_),
            columns: "vertical" === u("direction") ? 1 : t.length,
            padding: u("margin", 8),
            center: u("center"),
            nodirty: !0
        };
        switch (e) {
            case Bv:
                f.anchor = {x: Math.floor(r.x1) - s, column: Rv, y: c * (a || r.height() + 2 * r.y1), row: l};
                break;
            case Tv:
                f.anchor = {x: Math.ceil(r.x2) + s, y: c * (a || r.height() + 2 * r.y1), row: l};
                break;
            case Sv:
                f.anchor = {y: Math.floor(i.y1) - s, row: Rv, x: c * (o || i.width() + 2 * i.x1), column: l};
                break;
            case zv:
                f.anchor = {y: Math.ceil(i.y2) + s, x: c * (o || i.width() + 2 * i.x1), column: l};
                break;
            case"top-left":
                f.anchor = {x: s, y: s};
                break;
            case"top-right":
                f.anchor = {x: o - s, y: s, column: Rv};
                break;
            case"bottom-left":
                f.anchor = {x: s, y: a - s, row: Rv};
                break;
            case"bottom-right":
                f.anchor = {x: o - s, y: a - s, column: Rv, row: Rv}
        }
        return f
    }

    function R_(t, e) {
        var n, r, i = e.items[0], o = i.datum, a = i.orient, u = i.bounds, s = i.x, l = i.y;
        return i._bounds ? i._bounds.clear().union(u) : i._bounds = u.clone(), u.clear(), function (t, e, n) {
            var r = e.padding, i = r - n.x, o = r - n.y;
            if (e.datum.title) {
                var a = e.items[1].items[0], u = a.anchor, s = e.titlePadding || 0, l = r - a.x, c = r - a.y;
                switch (a.orient) {
                    case Bv:
                        i += Math.ceil(a.bounds.width()) + s;
                        break;
                    case Tv:
                    case zv:
                        break;
                    default:
                        o += a.bounds.height() + s
                }
                switch ((i || o) && U_(t, n, i, o), a.orient) {
                    case Bv:
                        c += L_(e, n, a, u, 1, 1);
                        break;
                    case Tv:
                        l += L_(e, n, a, Rv, 0, 0) + s, c += L_(e, n, a, u, 1, 1);
                        break;
                    case zv:
                        l += L_(e, n, a, u, 0, 0), c += L_(e, n, a, Rv, -1, 0, 1) + s;
                        break;
                    default:
                        l += L_(e, n, a, u, 0, 0)
                }
                (l || c) && U_(t, a, l, c), (l = Math.round(a.bounds.x1 - r)) < 0 && (U_(t, n, -l, 0), U_(t, a, -l, 0))
            } else (i || o) && U_(t, n, i, o)
        }(t, i, i.items[0].items[0]), u = function (t, e) {
            return t.items.forEach((t => e.union(t.bounds))), e.x1 = t.padding, e.y1 = t.padding, e
        }(i, u), n = 2 * i.padding, r = 2 * i.padding, u.empty() || (n = Math.ceil(u.width() + n), r = Math.ceil(u.height() + r)), "symbol" === o.type && function (t) {
            const e = t.reduce(((t, e) => (t[e.column] = Math.max(e.bounds.x2 - e.x, t[e.column] || 0), t)), {});
            t.forEach((t => {
                t.width = e[t.column], t.height = t.bounds.y2 - t.y
            }))
        }(i.items[0].items[0].items[0].items), a !== Kv && (i.x = s = 0, i.y = l = 0), i.width = n, i.height = r, rg(u.set(s, l, s + n, l + r), i), i.mark.bounds.clear().union(u), i
    }

    function L_(t, e, n, r, i, o, a) {
        const u = "symbol" !== t.datum.type, s = n.datum.vgrad,
            l = (!u || !o && s || a ? e : e.items[0]).bounds[i ? "y2" : "x2"] - t.padding, c = s && o ? l : 0,
            f = s && o ? 0 : l, h = i <= 0 ? 0 : Lm(n);
        return Math.round(r === Nv ? c : r === Rv ? f - h : .5 * (l - h))
    }

    function U_(t, e, n, r) {
        e.x += n, e.y += r, e.bounds.translate(n, r), e.mark.bounds.translate(n, r), t.dirty(e)
    }

    function q_(t) {
        pa.call(this, null, t)
    }

    ut(q_, pa, {
        transform(t, e) {
            const n = e.dataflow;
            return t.mark.items.forEach((e => {
                t.layout && S_(n, e, t.layout), function (t, e, n) {
                    var r, i, o, a, u, s = e.items, l = Math.max(0, e.width || 0), c = Math.max(0, e.height || 0),
                        f = (new Zp).set(0, 0, l, c), h = f.clone(), d = f.clone(), p = [];
                    for (a = 0, u = s.length; a < u; ++a) switch ((i = s[a]).role) {
                        case Uv:
                            (x_(i) ? h : d).union(b_(t, i, l, c));
                            break;
                        case qv:
                            r = i;
                            break;
                        case Iv:
                            p.push(R_(t, i));
                            break;
                        case Pv:
                        case jv:
                        case $v:
                        case Wv:
                        case Hv:
                        case Yv:
                        case Vv:
                        case Gv:
                            h.union(i.bounds), d.union(i.bounds);
                            break;
                        default:
                            f.union(i.bounds)
                    }
                    if (p.length) {
                        const e = {};
                        p.forEach((t => {
                            (o = t.orient || Tv) !== Kv && (e[o] || (e[o] = [])).push(t)
                        }));
                        for (const r in e) {
                            const i = e[r];
                            F_(t, i, O_(i, r, n.legends, h, d, l, c))
                        }
                        p.forEach((e => {
                            const r = e.bounds;
                            if (r.equals(e._bounds) || (e.bounds = e._bounds, t.dirty(e), e.bounds = r, t.dirty(e)), n.autosize && n.autosize.type === Jv) switch (e.orient) {
                                case Bv:
                                case Tv:
                                    f.add(r.x1, 0).add(r.x2, 0);
                                    break;
                                case Sv:
                                case zv:
                                    f.add(0, r.y1).add(0, r.y2)
                            } else f.union(r)
                        }))
                    }
                    f.union(h).union(d), r && f.union(function (t, e, n, r, i) {
                        var o, a = e.items[0], u = a.frame, s = a.orient, l = a.anchor, c = a.offset, f = a.padding,
                            h = a.items[0].items[0], d = a.items[1] && a.items[1].items[0],
                            p = s === Bv || s === Tv ? r : n, g = 0, m = 0, y = 0, v = 0, _ = 0;
                        if (u !== Lv ? s === Bv ? (g = i.y2, p = i.y1) : s === Tv ? (g = i.y1, p = i.y2) : (g = i.x1, p = i.x2) : s === Bv && (g = r, p = 0), o = l === Nv ? g : l === Rv ? p : (g + p) / 2, d && d.text) {
                            switch (s) {
                                case Sv:
                                case zv:
                                    _ = h.bounds.height() + f;
                                    break;
                                case Bv:
                                    v = h.bounds.width() + f;
                                    break;
                                case Tv:
                                    v = -h.bounds.width() - f
                            }
                            v_.clear().union(d.bounds), v_.translate(v - (d.x || 0), _ - (d.y || 0)), __(d, "x", v) | __(d, "y", _) && (t.dirty(d), d.bounds.clear().union(v_), d.mark.bounds.clear().union(v_), t.dirty(d)), v_.clear().union(d.bounds)
                        } else v_.clear();
                        switch (v_.union(h.bounds), s) {
                            case Sv:
                                m = o, y = i.y1 - v_.height() - c;
                                break;
                            case Bv:
                                m = i.x1 - v_.width() - c, y = o;
                                break;
                            case Tv:
                                m = i.x2 + v_.width() + c, y = o;
                                break;
                            case zv:
                                m = o, y = i.y2 + c;
                                break;
                            default:
                                m = a.x, y = a.y
                        }
                        return __(a, "x", m) | __(a, "y", y) && (v_.translate(m, y), t.dirty(a), a.bounds.clear().union(v_), e.bounds.clear().union(v_), t.dirty(a)), a.bounds
                    }(t, r, l, c, f));
                    e.clip && f.set(0, 0, e.width || 0, e.height || 0);
                    !function (t, e, n, r) {
                        const i = r.autosize || {}, o = i.type;
                        if (t._autosize < 1 || !o) return;
                        let a = t._width, u = t._height, s = Math.max(0, e.width || 0),
                            l = Math.max(0, Math.ceil(-n.x1)), c = Math.max(0, e.height || 0),
                            f = Math.max(0, Math.ceil(-n.y1));
                        const h = Math.max(0, Math.ceil(n.x2 - s)), d = Math.max(0, Math.ceil(n.y2 - c));
                        if (i.contains === Xv) {
                            const e = t.padding();
                            a -= e.left + e.right, u -= e.top + e.bottom
                        }
                        o === Kv ? (l = 0, f = 0, s = a, c = u) : o === Jv ? (s = Math.max(0, a - l - h), c = Math.max(0, u - f - d)) : o === Zv ? (s = Math.max(0, a - l - h), u = c + f + d) : o === Qv ? (a = s + l + h, c = Math.max(0, u - f - d)) : "pad" === o && (a = s + l + h, u = c + f + d);
                        t._resizeView(a, u, s, c, [l, f], i.resize)
                    }(t, e, f, n)
                }(n, e, t)
            })), function (t) {
                return t && "legend-entry" !== t.mark.role
            }(t.mark.group) ? e.reflow() : e
        }
    });
    var P_ = Object.freeze({
        __proto__: null,
        bound: o_,
        identifier: s_,
        mark: l_,
        overlap: c_,
        render: y_,
        viewlayout: q_
    });

    function j_(t) {
        pa.call(this, null, t)
    }

    function I_(t) {
        pa.call(this, null, t)
    }

    function $_() {
        return Lo({})
    }

    function W_(t) {
        pa.call(this, null, t)
    }

    function H_(t) {
        pa.call(this, [], t)
    }

    ut(j_, pa, {
        transform(t, e) {
            if (this.value && !t.modified()) return e.StopPropagation;
            var n = e.dataflow.locale(), r = e.fork(e.NO_SOURCE | e.NO_FIELDS), i = this.value, o = t.scale,
                a = Ld(o, null == t.count ? t.values ? t.values.length : 10 : t.count, t.minstep),
                u = t.format || Pd(n, o, a, t.formatSpecifier, t.formatType, !!t.values),
                s = t.values ? Ud(o, t.values, a) : qd(o, a);
            return i && (r.rem = i), i = s.map(((t, e) => Lo({
                index: e / (s.length - 1 || 1),
                value: t,
                label: u(t)
            }))), t.extra && i.length && i.push(Lo({
                index: -1,
                extra: {value: i[0].value},
                label: ""
            })), r.source = i, r.add = i, this.value = i, r
        }
    }), ut(I_, pa, {
        transform(t, e) {
            var n = e.dataflow, r = e.fork(e.NO_SOURCE | e.NO_FIELDS), i = t.item || $_, o = t.key || Oo,
                a = this.value;
            return v(r.encode) && (r.encode = null), a && (t.modified("key") || e.modified(o)) && u("DataJoin does not support modified key function or fields."), a || (e = e.addAll(), this.value = a = function (t) {
                const e = ot().test((t => t.exit));
                return e.lookup = n => e.get(t(n)), e
            }(o)), e.visit(e.ADD, (t => {
                const e = o(t);
                let n = a.get(e);
                n ? n.exit ? (a.empty--, r.add.push(n)) : r.mod.push(n) : (n = i(t), a.set(e, n), r.add.push(n)), n.datum = t, n.exit = !1
            })), e.visit(e.MOD, (t => {
                const e = o(t), n = a.get(e);
                n && (n.datum = t, r.mod.push(n))
            })), e.visit(e.REM, (t => {
                const e = o(t), n = a.get(e);
                t !== n.datum || n.exit || (r.rem.push(n), n.exit = !0, ++a.empty)
            })), e.changed(e.ADD_MOD) && r.modifies("datum"), (e.clean() || t.clean && a.empty > n.cleanThreshold) && n.runAfter(a.clean), r
        }
    }), ut(W_, pa, {
        transform(t, e) {
            var n = e.fork(e.ADD_REM), r = t.mod || !1, i = t.encoders, o = e.encode;
            if (v(o)) {
                if (!n.changed() && !o.every((t => i[t]))) return e.StopPropagation;
                o = o[0], n.encode = null
            }
            var a = "enter" === o, u = i.update || g, s = i.enter || g, l = i.exit || g, c = (o && !a ? i[o] : u) || g;
            if (e.changed(e.ADD) && (e.visit(e.ADD, (e => {
                s(e, t), u(e, t)
            })), n.modifies(s.output), n.modifies(u.output), c !== g && c !== u && (e.visit(e.ADD, (e => {
                c(e, t)
            })), n.modifies(c.output))), e.changed(e.REM) && l !== g && (e.visit(e.REM, (e => {
                l(e, t)
            })), n.modifies(l.output)), a || c !== g) {
                const i = e.MOD | (t.modified() ? e.REFLOW : 0);
                a ? (e.visit(i, (e => {
                    const i = s(e, t) || r;
                    (c(e, t) || i) && n.mod.push(e)
                })), n.mod.length && n.modifies(s.output)) : e.visit(i, (e => {
                    (c(e, t) || r) && n.mod.push(e)
                })), n.mod.length && n.modifies(c.output)
            }
            return n.changed() ? n : e.StopPropagation
        }
    }), ut(H_, pa, {
        transform(t, e) {
            if (null != this.value && !t.modified()) return e.StopPropagation;
            var n, r, i, o, a, u = e.dataflow.locale(), s = e.fork(e.NO_SOURCE | e.NO_FIELDS), l = this.value,
                c = t.type || zd, f = t.scale, h = +t.limit, d = Ld(f, null == t.count ? 5 : t.count, t.minstep),
                p = !!t.values || c === zd, g = t.format || Hd(u, f, d, c, t.formatSpecifier, t.formatType, p),
                m = t.values || Wd(f, d);
            return l && (s.rem = l), c === zd ? (h && m.length > h ? (e.dataflow.warn("Symbol legend count exceeds limit, filtering items."), l = m.slice(0, h - 1), a = !0) : l = m, H(i = t.size) ? (t.values || 0 !== f(l[0]) || (l = l.slice(1)), o = l.reduce(((e, n) => Math.max(e, i(n, t))), 0)) : i = Z(o = i || 8), l = l.map(((e, n) => Lo({
                index: n,
                label: g(e, n, l),
                value: e,
                offset: o,
                size: i(e, t)
            }))), a && (a = m[l.length], l.push(Lo({
                index: l.length,
                label: "…".concat(m.length - l.length, " entries"),
                value: a,
                offset: o,
                size: i(a, t)
            })))) : "gradient" === c ? (n = f.domain(), r = Dd(f, n[0], M(n)), m.length < 3 && !t.values && n[0] !== M(n) && (m = [n[0], M(n)]), l = m.map(((t, e) => Lo({
                index: e,
                label: g(t, e, m),
                value: t,
                perc: r(t)
            })))) : (i = m.length - 1, r = function (t) {
                const e = t.domain(), n = e.length - 1;
                let r = +e[0], i = +M(e), o = i - r;
                if (t.type === Zh) {
                    const t = n ? o / n : .1;
                    r -= t, i += t, o = i - r
                }
                return t => (t - r) / o
            }(f), l = m.map(((t, e) => Lo({
                index: e,
                label: g(t, e, m),
                value: t,
                perc: e ? r(t) : 0,
                perc2: e === i ? 1 : r(m[e + 1])
            })))), s.source = l, s.add = l, this.value = l, s
        }
    });
    const Y_ = t => t.source.x, V_ = t => t.source.y, G_ = t => t.target.x, X_ = t => t.target.y;

    function J_(t) {
        pa.call(this, {}, t)
    }

    J_.Definition = {
        type: "LinkPath",
        metadata: {modifies: !0},
        params: [{name: "sourceX", type: "field", default: "source.x"}, {
            name: "sourceY",
            type: "field",
            default: "source.y"
        }, {name: "targetX", type: "field", default: "target.x"}, {
            name: "targetY",
            type: "field",
            default: "target.y"
        }, {
            name: "orient",
            type: "enum",
            default: "vertical",
            values: ["horizontal", "vertical", "radial"]
        }, {
            name: "shape",
            type: "enum",
            default: "line",
            values: ["line", "arc", "curve", "diagonal", "orthogonal"]
        }, {name: "require", type: "signal"}, {name: "as", type: "string", default: "path"}]
    }, ut(J_, pa, {
        transform(t, e) {
            var n = t.sourceX || Y_, r = t.sourceY || V_, i = t.targetX || G_, o = t.targetY || X_, a = t.as || "path",
                s = t.orient || "vertical", l = t.shape || "line", c = tx.get(l + "-" + s) || tx.get(l);
            return c || u("LinkPath unsupported type: " + t.shape + (t.orient ? "-" + t.orient : "")), e.visit(e.SOURCE, (t => {
                t[a] = c(n(t), r(t), i(t), o(t))
            })), e.reflow(t.modified()).modifies(a)
        }
    });
    const Z_ = (t, e, n, r) => "M" + t + "," + e + "L" + n + "," + r, Q_ = (t, e, n, r) => {
        var i = n - t, o = r - e, a = Math.sqrt(i * i + o * o) / 2;
        return "M" + t + "," + e + "A" + a + "," + a + " " + 180 * Math.atan2(o, i) / Math.PI + " 0 1 " + n + "," + r
    }, K_ = (t, e, n, r) => {
        const i = n - t, o = r - e, a = .2 * (i + o), u = .2 * (o - i);
        return "M" + t + "," + e + "C" + (t + a) + "," + (e + u) + " " + (n + u) + "," + (r - a) + " " + n + "," + r
    }, tx = ot({
        line: Z_,
        "line-radial": (t, e, n, r) => Z_(e * Math.cos(t), e * Math.sin(t), r * Math.cos(n), r * Math.sin(n)),
        arc: Q_,
        "arc-radial": (t, e, n, r) => Q_(e * Math.cos(t), e * Math.sin(t), r * Math.cos(n), r * Math.sin(n)),
        curve: K_,
        "curve-radial": (t, e, n, r) => K_(e * Math.cos(t), e * Math.sin(t), r * Math.cos(n), r * Math.sin(n)),
        "orthogonal-horizontal": (t, e, n, r) => "M" + t + "," + e + "V" + r + "H" + n,
        "orthogonal-vertical": (t, e, n, r) => "M" + t + "," + e + "H" + n + "V" + r,
        "orthogonal-radial": (t, e, n, r) => {
            const i = Math.cos(t), o = Math.sin(t), a = Math.cos(n), u = Math.sin(n);
            return "M" + e * i + "," + e * o + "A" + e + "," + e + " 0 0," + ((Math.abs(n - t) > Math.PI ? n <= t : n > t) ? 1 : 0) + " " + e * a + "," + e * u + "L" + r * a + "," + r * u
        },
        "diagonal-horizontal": (t, e, n, r) => {
            const i = (t + n) / 2;
            return "M" + t + "," + e + "C" + i + "," + e + " " + i + "," + r + " " + n + "," + r
        },
        "diagonal-vertical": (t, e, n, r) => {
            const i = (e + r) / 2;
            return "M" + t + "," + e + "C" + t + "," + i + " " + n + "," + i + " " + n + "," + r
        },
        "diagonal-radial": (t, e, n, r) => {
            const i = Math.cos(t), o = Math.sin(t), a = Math.cos(n), u = Math.sin(n), s = (e + r) / 2;
            return "M" + e * i + "," + e * o + "C" + s * i + "," + s * o + " " + s * a + "," + s * u + " " + r * a + "," + r * u
        }
    });

    function ex(t) {
        pa.call(this, null, t)
    }

    ex.Definition = {
        type: "Pie",
        metadata: {modifies: !0},
        params: [{name: "field", type: "field"}, {name: "startAngle", type: "number", default: 0}, {
            name: "endAngle",
            type: "number",
            default: 6.283185307179586
        }, {name: "sort", type: "boolean", default: !1}, {
            name: "as",
            type: "string",
            array: !0,
            length: 2,
            default: ["startAngle", "endAngle"]
        }]
    }, ut(ex, pa, {
        transform(t, e) {
            var n, r, i, o = t.as || ["startAngle", "endAngle"], a = o[0], u = o[1], s = t.field || d,
                l = t.startAngle || 0, c = null != t.endAngle ? t.endAngle : 2 * Math.PI, f = e.source, h = f.map(s),
                p = h.length, g = l, m = (c - l) / Le(h), y = Re(p);
            for (t.sort && y.sort(((t, e) => h[t] - h[e])), n = 0; n < p; ++n) i = h[y[n]], (r = f[y[n]])[a] = g, r[u] = g += i * m;
            return this.value = h, e.reflow(t.modified()).modifies(o)
        }
    });

    function nx(t) {
        return yd(t) && t !== Vh
    }

    const rx = Dt(["set", "modified", "clear", "type", "scheme", "schemeExtent", "schemeCount", "domain", "domainMin", "domainMid", "domainMax", "domainRaw", "domainImplicit", "nice", "zero", "bins", "range", "rangeStep", "round", "reverse", "interpolate", "interpolateGamma"]);

    function ix(t) {
        pa.call(this, null, t), this.modified(!0)
    }

    function ox(t, e, n) {
        xd(t) && (Math.abs(e.reduce(((t, e) => t + (e < 0 ? -1 : e > 0 ? 1 : 0)), 0)) !== e.length && n.warn("Log scale domain includes zero: " + wt(e)));
        return e
    }

    function ax(t, e, n) {
        return H(t) && (e || n) ? Md(t, ux(e || [0, 1], n)) : t
    }

    function ux(t, e) {
        return e ? t.slice().reverse() : t
    }

    function sx(t) {
        pa.call(this, null, t)
    }

    ut(ix, pa, {
        transform(t, e) {
            var n = e.dataflow, r = this.value, i = function (t) {
                var e, n = t.type, r = "";
                if (n === Vh) return "sequential-linear";
                (function (t) {
                    const e = t.type;
                    return yd(e) && e !== Hh && e !== Yh && (t.scheme || t.range && t.range.length && t.range.every(pt))
                })(t) && (r = 2 === (e = t.rawDomain ? t.rawDomain.length : t.domain ? t.domain.length + +(null != t.domainMid) : 0) ? "sequential-" : 3 === e ? "diverging-" : "");
                return (r + n || Ph).toLowerCase()
            }(t);
            for (i in r && i === r.type || (this.value = r = pd(i)()), t) if (!rx[i]) {
                if ("padding" === i && nx(r.type)) continue;
                H(r[i]) ? r[i](t[i]) : n.warn("Unsupported scale property: " + i)
            }
            return function (t, e, n) {
                var r = t.type, i = e.round || !1, o = e.range;
                if (null != e.rangeStep) o = function (t, e, n) {
                    t !== td && t !== Kh && u("Only band and point scales support rangeStep.");
                    var r = (null != e.paddingOuter ? e.paddingOuter : e.padding) || 0,
                        i = t === Kh ? 1 : (null != e.paddingInner ? e.paddingInner : e.padding) || 0;
                    return [0, e.rangeStep * qh(n, i, r)]
                }(r, e, n); else if (e.scheme && (o = function (t, e, n) {
                    var r, i = e.schemeExtent;
                    v(e.scheme) ? r = Ad(e.scheme, e.interpolate, e.interpolateGamma) : (r = Td(e.scheme.toLowerCase())) || u("Unrecognized scheme name: ".concat(e.scheme));
                    return n = t === Zh ? n + 1 : t === ed ? n - 1 : t === Xh || t === Jh ? +e.schemeCount || 5 : n, bd(t) ? ax(r, i, e.reverse) : H(r) ? Ed(ax(r, i), n) : t === Qh ? r : r.slice(0, n)
                }(r, e, n), H(o))) {
                    if (t.interpolator) return t.interpolator(o);
                    u("Scale type ".concat(r, " does not support interpolating color schemes."))
                }
                if (o && bd(r)) return t.interpolator(Ad(ux(o, e.reverse), e.interpolate, e.interpolateGamma));
                o && e.interpolate && t.interpolate ? t.interpolate(Cd(e.interpolate, e.interpolateGamma)) : H(t.round) ? t.round(i) : H(t.rangeRound) && t.interpolate(i ? Sf : Ff);
                o && t.range(ux(o, e.reverse))
            }(r, t, function (t, e, n) {
                let r = e.bins;
                if (r && !v(r)) {
                    const e = t.domain(), n = e[0], i = M(e), o = r.step;
                    let a = null == r.start ? n : r.start, s = null == r.stop ? i : r.stop;
                    o || u("Scale bins parameter missing step property."), a < n && (a = o * Math.ceil(n / o)), s > i && (s = o * Math.floor(i / o)), r = Re(a, s + o / 2, o)
                }
                r ? t.bins = r : t.bins && delete t.bins;
                t.type === ed && (r ? e.domain || e.domainRaw || (t.domain(r), n = r.length) : t.bins = t.domain());
                return n
            }(r, t, function (t, e, n) {
                const r = function (t, e, n) {
                    return e ? (t.domain(ox(t.type, e, n)), e.length) : -1
                }(t, e.domainRaw, n);
                if (r > -1) return r;
                var i, o, a = e.domain, u = t.type, s = e.zero || void 0 === e.zero && function (t) {
                    const e = t.type;
                    return !t.bins && (e === Ph || e === Ih || e === $h)
                }(t);
                if (!a) return 0;
                nx(u) && e.padding && a[0] !== M(a) && (a = function (t, e, n, r, i, o) {
                    var a = Math.abs(M(n) - n[0]), u = a / (a - 2 * r),
                        s = t === jh ? U(e, null, u) : t === $h ? q(e, null, u, .5) : t === Ih ? q(e, null, u, i || 1) : t === Wh ? P(e, null, u, o || 1) : L(e, null, u);
                    return (e = e.slice())[0] = s[0], e[e.length - 1] = s[1], e
                }(u, a, e.range, e.padding, e.exponent, e.constant));
                if ((s || null != e.domainMin || null != e.domainMax || null != e.domainMid) && (i = (a = a.slice()).length - 1 || 1, s && (a[0] > 0 && (a[0] = 0), a[i] < 0 && (a[i] = 0)), null != e.domainMin && (a[0] = e.domainMin), null != e.domainMax && (a[i] = e.domainMax), null != e.domainMid)) {
                    const t = (o = e.domainMid) > a[i] ? i + 1 : o < a[0] ? 0 : i;
                    t !== i && n.warn("Scale domainMid exceeds domain min or max.", o), a.splice(t, 0, o)
                }
                t.domain(ox(u, a, n)), u === Qh && t.unknown(e.domainImplicit ? Ql : void 0);
                e.nice && t.nice && t.nice(!0 !== e.nice && Ld(t, e.nice) || null);
                return a.length
            }(r, t, n))), e.fork(e.NO_SOURCE | e.NO_FIELDS)
        }
    }), ut(sx, pa, {
        transform(t, e) {
            const n = t.modified("sort") || e.changed(e.ADD) || e.modified(t.sort.fields) || e.modified("datum");
            return n && e.source.sort(jo(t.sort)), this.modified(n), e
        }
    });
    const lx = "zero", cx = "center", fx = "normalize", hx = ["y0", "y1"];

    function dx(t) {
        pa.call(this, null, t)
    }

    function px(t, e, n, r, i) {
        for (var o, a = (e - t.sum) / 2, u = t.length, s = 0; s < u; ++s) (o = t[s])[r] = a, o[i] = a += Math.abs(n(o))
    }

    function gx(t, e, n, r, i) {
        for (var o, a = 1 / t.sum, u = 0, s = t.length, l = 0, c = 0; l < s; ++l) (o = t[l])[r] = u, o[i] = u = a * (c += Math.abs(n(o)))
    }

    function mx(t, e, n, r, i) {
        for (var o, a, u = 0, s = 0, l = t.length, c = 0; c < l; ++c) (o = +n(a = t[c])) < 0 ? (a[r] = s, a[i] = s += o) : (a[r] = u, a[i] = u += o)
    }

    dx.Definition = {
        type: "Stack",
        metadata: {modifies: !0},
        params: [{name: "field", type: "field"}, {name: "groupby", type: "field", array: !0}, {
            name: "sort",
            type: "compare"
        }, {name: "offset", type: "enum", default: lx, values: [lx, cx, fx]}, {
            name: "as",
            type: "string",
            array: !0,
            length: 2,
            default: hx
        }]
    }, ut(dx, pa, {
        transform(t, e) {
            var n, r, i, o, a = t.as || hx, u = a[0], s = a[1], l = jo(t.sort), c = t.field || d,
                f = t.offset === cx ? px : t.offset === fx ? gx : mx;
            for (n = function (t, e, n, r) {
                var i, o, a, u, s, l, c, f, h, d = [], p = t => t(s);
                if (null == e) d.push(t.slice()); else for (i = {}, o = 0, a = t.length; o < a; ++o) s = t[o], (c = i[l = e.map(p)]) || (i[l] = c = [], d.push(c)), c.push(s);
                for (l = 0, h = 0, u = d.length; l < u; ++l) {
                    for (o = 0, f = 0, a = (c = d[l]).length; o < a; ++o) f += Math.abs(r(c[o]));
                    c.sum = f, f > h && (h = f), n && c.sort(n)
                }
                return d.max = h, d
            }(e.source, t.groupby, l, c), r = 0, i = n.length, o = n.max; r < i; ++r) f(n[r], o, c, u, s);
            return e.reflow(t.modified()).modifies(a)
        }
    });
    var yx = Object.freeze({
            __proto__: null,
            axisticks: j_,
            datajoin: I_,
            encode: W_,
            legendentries: H_,
            linkpath: J_,
            pie: ex,
            scale: ix,
            sortitems: sx,
            stack: dx
        }), vx = 1e-6, _x = 1e-12, xx = Math.PI, bx = xx / 2, wx = xx / 4, kx = 2 * xx, Mx = 180 / xx, Ax = xx / 180,
        Ex = Math.abs, Dx = Math.atan, Cx = Math.atan2, Fx = Math.cos, Sx = Math.ceil, Bx = Math.exp, Tx = Math.hypot,
        zx = Math.log, Nx = Math.pow, Ox = Math.sin, Rx = Math.sign || function (t) {
            return t > 0 ? 1 : t < 0 ? -1 : 0
        }, Lx = Math.sqrt, Ux = Math.tan;

    function qx(t) {
        return t > 1 ? 0 : t < -1 ? xx : Math.acos(t)
    }

    function Px(t) {
        return t > 1 ? bx : t < -1 ? -bx : Math.asin(t)
    }

    function jx() {
    }

    function Ix(t, e) {
        t && Wx.hasOwnProperty(t.type) && Wx[t.type](t, e)
    }

    var $x = {
        Feature: function (t, e) {
            Ix(t.geometry, e)
        }, FeatureCollection: function (t, e) {
            for (var n = t.features, r = -1, i = n.length; ++r < i;) Ix(n[r].geometry, e)
        }
    }, Wx = {
        Sphere: function (t, e) {
            e.sphere()
        }, Point: function (t, e) {
            t = t.coordinates, e.point(t[0], t[1], t[2])
        }, MultiPoint: function (t, e) {
            for (var n = t.coordinates, r = -1, i = n.length; ++r < i;) t = n[r], e.point(t[0], t[1], t[2])
        }, LineString: function (t, e) {
            Hx(t.coordinates, e, 0)
        }, MultiLineString: function (t, e) {
            for (var n = t.coordinates, r = -1, i = n.length; ++r < i;) Hx(n[r], e, 0)
        }, Polygon: function (t, e) {
            Yx(t.coordinates, e)
        }, MultiPolygon: function (t, e) {
            for (var n = t.coordinates, r = -1, i = n.length; ++r < i;) Yx(n[r], e)
        }, GeometryCollection: function (t, e) {
            for (var n = t.geometries, r = -1, i = n.length; ++r < i;) Ix(n[r], e)
        }
    };

    function Hx(t, e, n) {
        var r, i = -1, o = t.length - n;
        for (e.lineStart(); ++i < o;) r = t[i], e.point(r[0], r[1], r[2]);
        e.lineEnd()
    }

    function Yx(t, e) {
        var n = -1, r = t.length;
        for (e.polygonStart(); ++n < r;) Hx(t[n], e, 1);
        e.polygonEnd()
    }

    function Vx(t, e) {
        t && $x.hasOwnProperty(t.type) ? $x[t.type](t, e) : Ix(t, e)
    }

    var Gx, Xx, Jx, Zx, Qx, Kx, tb, eb, nb, rb, ib, ob, ab, ub, sb, lb, cb = new be, fb = new be, hb = {
        point: jx, lineStart: jx, lineEnd: jx, polygonStart: function () {
            cb = new be, hb.lineStart = db, hb.lineEnd = pb
        }, polygonEnd: function () {
            var t = +cb;
            fb.add(t < 0 ? kx + t : t), this.lineStart = this.lineEnd = this.point = jx
        }, sphere: function () {
            fb.add(kx)
        }
    };

    function db() {
        hb.point = gb
    }

    function pb() {
        mb(Gx, Xx)
    }

    function gb(t, e) {
        hb.point = mb, Gx = t, Xx = e, Jx = t *= Ax, Zx = Fx(e = (e *= Ax) / 2 + wx), Qx = Ox(e)
    }

    function mb(t, e) {
        var n = (t *= Ax) - Jx, r = n >= 0 ? 1 : -1, i = r * n, o = Fx(e = (e *= Ax) / 2 + wx), a = Ox(e), u = Qx * a,
            s = Zx * o + u * Fx(i), l = u * r * Ox(i);
        cb.add(Cx(l, s)), Jx = t, Zx = o, Qx = a
    }

    function yb(t) {
        return [Cx(t[1], t[0]), Px(t[2])]
    }

    function vb(t) {
        var e = t[0], n = t[1], r = Fx(n);
        return [r * Fx(e), r * Ox(e), Ox(n)]
    }

    function _b(t, e) {
        return t[0] * e[0] + t[1] * e[1] + t[2] * e[2]
    }

    function xb(t, e) {
        return [t[1] * e[2] - t[2] * e[1], t[2] * e[0] - t[0] * e[2], t[0] * e[1] - t[1] * e[0]]
    }

    function bb(t, e) {
        t[0] += e[0], t[1] += e[1], t[2] += e[2]
    }

    function wb(t, e) {
        return [t[0] * e, t[1] * e, t[2] * e]
    }

    function kb(t) {
        var e = Lx(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
        t[0] /= e, t[1] /= e, t[2] /= e
    }

    var Mb, Ab, Eb, Db, Cb, Fb, Sb, Bb, Tb, zb, Nb, Ob, Rb, Lb, Ub, qb, Pb = {
        point: jb, lineStart: $b, lineEnd: Wb, polygonStart: function () {
            Pb.point = Hb, Pb.lineStart = Yb, Pb.lineEnd = Vb, ub = new be, hb.polygonStart()
        }, polygonEnd: function () {
            hb.polygonEnd(), Pb.point = jb, Pb.lineStart = $b, Pb.lineEnd = Wb, cb < 0 ? (Kx = -(eb = 180), tb = -(nb = 90)) : ub > vx ? nb = 90 : ub < -1e-6 && (tb = -90), lb[0] = Kx, lb[1] = eb
        }, sphere: function () {
            Kx = -(eb = 180), tb = -(nb = 90)
        }
    };

    function jb(t, e) {
        sb.push(lb = [Kx = t, eb = t]), e < tb && (tb = e), e > nb && (nb = e)
    }

    function Ib(t, e) {
        var n = vb([t * Ax, e * Ax]);
        if (ab) {
            var r = xb(ab, n), i = xb([r[1], -r[0], 0], r);
            kb(i), i = yb(i);
            var o, a = t - rb, u = a > 0 ? 1 : -1, s = i[0] * Mx * u, l = Ex(a) > 180;
            l ^ (u * rb < s && s < u * t) ? (o = i[1] * Mx) > nb && (nb = o) : l ^ (u * rb < (s = (s + 360) % 360 - 180) && s < u * t) ? (o = -i[1] * Mx) < tb && (tb = o) : (e < tb && (tb = e), e > nb && (nb = e)), l ? t < rb ? Gb(Kx, t) > Gb(Kx, eb) && (eb = t) : Gb(t, eb) > Gb(Kx, eb) && (Kx = t) : eb >= Kx ? (t < Kx && (Kx = t), t > eb && (eb = t)) : t > rb ? Gb(Kx, t) > Gb(Kx, eb) && (eb = t) : Gb(t, eb) > Gb(Kx, eb) && (Kx = t)
        } else sb.push(lb = [Kx = t, eb = t]);
        e < tb && (tb = e), e > nb && (nb = e), ab = n, rb = t
    }

    function $b() {
        Pb.point = Ib
    }

    function Wb() {
        lb[0] = Kx, lb[1] = eb, Pb.point = jb, ab = null
    }

    function Hb(t, e) {
        if (ab) {
            var n = t - rb;
            ub.add(Ex(n) > 180 ? n + (n > 0 ? 360 : -360) : n)
        } else ib = t, ob = e;
        hb.point(t, e), Ib(t, e)
    }

    function Yb() {
        hb.lineStart()
    }

    function Vb() {
        Hb(ib, ob), hb.lineEnd(), Ex(ub) > vx && (Kx = -(eb = 180)), lb[0] = Kx, lb[1] = eb, ab = null
    }

    function Gb(t, e) {
        return (e -= t) < 0 ? e + 360 : e
    }

    function Xb(t, e) {
        return t[0] - e[0]
    }

    function Jb(t, e) {
        return t[0] <= t[1] ? t[0] <= e && e <= t[1] : e < t[0] || t[1] < e
    }

    var Zb = {
        sphere: jx, point: Qb, lineStart: tw, lineEnd: rw, polygonStart: function () {
            Zb.lineStart = iw, Zb.lineEnd = ow
        }, polygonEnd: function () {
            Zb.lineStart = tw, Zb.lineEnd = rw
        }
    };

    function Qb(t, e) {
        t *= Ax;
        var n = Fx(e *= Ax);
        Kb(n * Fx(t), n * Ox(t), Ox(e))
    }

    function Kb(t, e, n) {
        ++Mb, Eb += (t - Eb) / Mb, Db += (e - Db) / Mb, Cb += (n - Cb) / Mb
    }

    function tw() {
        Zb.point = ew
    }

    function ew(t, e) {
        t *= Ax;
        var n = Fx(e *= Ax);
        Lb = n * Fx(t), Ub = n * Ox(t), qb = Ox(e), Zb.point = nw, Kb(Lb, Ub, qb)
    }

    function nw(t, e) {
        t *= Ax;
        var n = Fx(e *= Ax), r = n * Fx(t), i = n * Ox(t), o = Ox(e),
            a = Cx(Lx((a = Ub * o - qb * i) * a + (a = qb * r - Lb * o) * a + (a = Lb * i - Ub * r) * a), Lb * r + Ub * i + qb * o);
        Ab += a, Fb += a * (Lb + (Lb = r)), Sb += a * (Ub + (Ub = i)), Bb += a * (qb + (qb = o)), Kb(Lb, Ub, qb)
    }

    function rw() {
        Zb.point = Qb
    }

    function iw() {
        Zb.point = aw
    }

    function ow() {
        uw(Ob, Rb), Zb.point = Qb
    }

    function aw(t, e) {
        Ob = t, Rb = e, t *= Ax, e *= Ax, Zb.point = uw;
        var n = Fx(e);
        Lb = n * Fx(t), Ub = n * Ox(t), qb = Ox(e), Kb(Lb, Ub, qb)
    }

    function uw(t, e) {
        t *= Ax;
        var n = Fx(e *= Ax), r = n * Fx(t), i = n * Ox(t), o = Ox(e), a = Ub * o - qb * i, u = qb * r - Lb * o,
            s = Lb * i - Ub * r, l = Tx(a, u, s), c = Px(l), f = l && -c / l;
        Tb.add(f * a), zb.add(f * u), Nb.add(f * s), Ab += c, Fb += c * (Lb + (Lb = r)), Sb += c * (Ub + (Ub = i)), Bb += c * (qb + (qb = o)), Kb(Lb, Ub, qb)
    }

    function sw(t, e) {
        function n(n, r) {
            return n = t(n, r), e(n[0], n[1])
        }

        return t.invert && e.invert && (n.invert = function (n, r) {
            return (n = e.invert(n, r)) && t.invert(n[0], n[1])
        }), n
    }

    function lw(t, e) {
        return [Ex(t) > xx ? t + Math.round(-t / kx) * kx : t, e]
    }

    function cw(t, e, n) {
        return (t %= kx) ? e || n ? sw(hw(t), dw(e, n)) : hw(t) : e || n ? dw(e, n) : lw
    }

    function fw(t) {
        return function (e, n) {
            return [(e += t) > xx ? e - kx : e < -xx ? e + kx : e, n]
        }
    }

    function hw(t) {
        var e = fw(t);
        return e.invert = fw(-t), e
    }

    function dw(t, e) {
        var n = Fx(t), r = Ox(t), i = Fx(e), o = Ox(e);

        function a(t, e) {
            var a = Fx(e), u = Fx(t) * a, s = Ox(t) * a, l = Ox(e), c = l * n + u * r;
            return [Cx(s * i - c * o, u * n - l * r), Px(c * i + s * o)]
        }

        return a.invert = function (t, e) {
            var a = Fx(e), u = Fx(t) * a, s = Ox(t) * a, l = Ox(e), c = l * i - s * o;
            return [Cx(s * i + l * o, u * n + c * r), Px(c * n - u * r)]
        }, a
    }

    function pw(t, e) {
        (e = vb(e))[0] -= t, kb(e);
        var n = qx(-e[1]);
        return ((-e[2] < 0 ? -n : n) + kx - vx) % kx
    }

    function gw() {
        var t, e = [];
        return {
            point: function (e, n, r) {
                t.push([e, n, r])
            }, lineStart: function () {
                e.push(t = [])
            }, lineEnd: jx, rejoin: function () {
                e.length > 1 && e.push(e.pop().concat(e.shift()))
            }, result: function () {
                var n = e;
                return e = [], t = null, n
            }
        }
    }

    function mw(t, e) {
        return Ex(t[0] - e[0]) < vx && Ex(t[1] - e[1]) < vx
    }

    function yw(t, e, n, r) {
        this.x = t, this.z = e, this.o = n, this.e = r, this.v = !1, this.n = this.p = null
    }

    function vw(t, e, n, r, i) {
        var o, a, u = [], s = [];
        if (t.forEach((function (t) {
            if (!((e = t.length - 1) <= 0)) {
                var e, n, r = t[0], a = t[e];
                if (mw(r, a)) {
                    if (!r[2] && !a[2]) {
                        for (i.lineStart(), o = 0; o < e; ++o) i.point((r = t[o])[0], r[1]);
                        return void i.lineEnd()
                    }
                    a[0] += 2e-6
                }
                u.push(n = new yw(r, t, null, !0)), s.push(n.o = new yw(r, null, n, !1)), u.push(n = new yw(a, t, null, !1)), s.push(n.o = new yw(a, null, n, !0))
            }
        })), u.length) {
            for (s.sort(e), _w(u), _w(s), o = 0, a = s.length; o < a; ++o) s[o].e = n = !n;
            for (var l, c, f = u[0]; ;) {
                for (var h = f, d = !0; h.v;) if ((h = h.n) === f) return;
                l = h.z, i.lineStart();
                do {
                    if (h.v = h.o.v = !0, h.e) {
                        if (d) for (o = 0, a = l.length; o < a; ++o) i.point((c = l[o])[0], c[1]); else r(h.x, h.n.x, 1, i);
                        h = h.n
                    } else {
                        if (d) for (l = h.p.z, o = l.length - 1; o >= 0; --o) i.point((c = l[o])[0], c[1]); else r(h.x, h.p.x, -1, i);
                        h = h.p
                    }
                    l = (h = h.o).z, d = !d
                } while (!h.v);
                i.lineEnd()
            }
        }
    }

    function _w(t) {
        if (e = t.length) {
            for (var e, n, r = 0, i = t[0]; ++r < e;) i.n = n = t[r], n.p = i, i = n;
            i.n = n = t[0], n.p = i
        }
    }

    function xw(t) {
        return Ex(t[0]) <= xx ? t[0] : Rx(t[0]) * ((Ex(t[0]) + xx) % kx - xx)
    }

    function bw(t, e, n, r) {
        return function (i) {
            var o, a, u, s = e(i), l = gw(), c = e(l), f = !1, h = {
                point: d, lineStart: g, lineEnd: m, polygonStart: function () {
                    h.point = y, h.lineStart = v, h.lineEnd = _, a = [], o = []
                }, polygonEnd: function () {
                    h.point = d, h.lineStart = g, h.lineEnd = m, a = Oe(a);
                    var t = function (t, e) {
                        var n = xw(e), r = e[1], i = Ox(r), o = [Ox(n), -Fx(n), 0], a = 0, u = 0, s = new be;
                        1 === i ? r = bx + vx : -1 === i && (r = -bx - vx);
                        for (var l = 0, c = t.length; l < c; ++l) if (h = (f = t[l]).length) for (var f, h, d = f[h - 1], p = xw(d), g = d[1] / 2 + wx, m = Ox(g), y = Fx(g), v = 0; v < h; ++v, p = x, m = w, y = k, d = _) {
                            var _ = f[v], x = xw(_), b = _[1] / 2 + wx, w = Ox(b), k = Fx(b), M = x - p,
                                A = M >= 0 ? 1 : -1, E = A * M, D = E > xx, C = m * w;
                            if (s.add(Cx(C * A * Ox(E), y * k + C * Fx(E))), a += D ? M + A * kx : M, D ^ p >= n ^ x >= n) {
                                var F = xb(vb(d), vb(_));
                                kb(F);
                                var S = xb(o, F);
                                kb(S);
                                var B = (D ^ M >= 0 ? -1 : 1) * Px(S[2]);
                                (r > B || r === B && (F[0] || F[1])) && (u += D ^ M >= 0 ? 1 : -1)
                            }
                        }
                        return (a < -1e-6 || a < vx && s < -1e-12) ^ 1 & u
                    }(o, r);
                    a.length ? (f || (i.polygonStart(), f = !0), vw(a, kw, t, n, i)) : t && (f || (i.polygonStart(), f = !0), i.lineStart(), n(null, null, 1, i), i.lineEnd()), f && (i.polygonEnd(), f = !1), a = o = null
                }, sphere: function () {
                    i.polygonStart(), i.lineStart(), n(null, null, 1, i), i.lineEnd(), i.polygonEnd()
                }
            };

            function d(e, n) {
                t(e, n) && i.point(e, n)
            }

            function p(t, e) {
                s.point(t, e)
            }

            function g() {
                h.point = p, s.lineStart()
            }

            function m() {
                h.point = d, s.lineEnd()
            }

            function y(t, e) {
                u.push([t, e]), c.point(t, e)
            }

            function v() {
                c.lineStart(), u = []
            }

            function _() {
                y(u[0][0], u[0][1]), c.lineEnd();
                var t, e, n, r, s = c.clean(), h = l.result(), d = h.length;
                if (u.pop(), o.push(u), u = null, d) if (1 & s) {
                    if ((e = (n = h[0]).length - 1) > 0) {
                        for (f || (i.polygonStart(), f = !0), i.lineStart(), t = 0; t < e; ++t) i.point((r = n[t])[0], r[1]);
                        i.lineEnd()
                    }
                } else d > 1 && 2 & s && h.push(h.pop().concat(h.shift())), a.push(h.filter(ww))
            }

            return h
        }
    }

    function ww(t) {
        return t.length > 1
    }

    function kw(t, e) {
        return ((t = t.x)[0] < 0 ? t[1] - bx - vx : bx - t[1]) - ((e = e.x)[0] < 0 ? e[1] - bx - vx : bx - e[1])
    }

    lw.invert = lw;
    var Mw = bw((function () {
        return !0
    }), (function (t) {
        var e, n = NaN, r = NaN, i = NaN;
        return {
            lineStart: function () {
                t.lineStart(), e = 1
            }, point: function (o, a) {
                var u = o > 0 ? xx : -xx, s = Ex(o - n);
                Ex(s - xx) < vx ? (t.point(n, r = (r + a) / 2 > 0 ? bx : -bx), t.point(i, r), t.lineEnd(), t.lineStart(), t.point(u, r), t.point(o, r), e = 0) : i !== u && s >= xx && (Ex(n - i) < vx && (n -= i * vx), Ex(o - u) < vx && (o -= u * vx), r = function (t, e, n, r) {
                    var i, o, a = Ox(t - n);
                    return Ex(a) > vx ? Dx((Ox(e) * (o = Fx(r)) * Ox(n) - Ox(r) * (i = Fx(e)) * Ox(t)) / (i * o * a)) : (e + r) / 2
                }(n, r, o, a), t.point(i, r), t.lineEnd(), t.lineStart(), t.point(u, r), e = 0), t.point(n = o, r = a), i = u
            }, lineEnd: function () {
                t.lineEnd(), n = r = NaN
            }, clean: function () {
                return 2 - e
            }
        }
    }), (function (t, e, n, r) {
        var i;
        if (null == t) i = n * bx, r.point(-xx, i), r.point(0, i), r.point(xx, i), r.point(xx, 0), r.point(xx, -i), r.point(0, -i), r.point(-xx, -i), r.point(-xx, 0), r.point(-xx, i); else if (Ex(t[0] - e[0]) > vx) {
            var o = t[0] < e[0] ? xx : -xx;
            i = n * o / 2, r.point(-o, i), r.point(0, i), r.point(o, i)
        } else r.point(e[0], e[1])
    }), [-xx, -bx]);

    function Aw(t) {
        var e = Fx(t), n = 6 * Ax, r = e > 0, i = Ex(e) > vx;

        function o(t, n) {
            return Fx(t) * Fx(n) > e
        }

        function a(t, n, r) {
            var i = [1, 0, 0], o = xb(vb(t), vb(n)), a = _b(o, o), u = o[0], s = a - u * u;
            if (!s) return !r && t;
            var l = e * a / s, c = -e * u / s, f = xb(i, o), h = wb(i, l);
            bb(h, wb(o, c));
            var d = f, p = _b(h, d), g = _b(d, d), m = p * p - g * (_b(h, h) - 1);
            if (!(m < 0)) {
                var y = Lx(m), v = wb(d, (-p - y) / g);
                if (bb(v, h), v = yb(v), !r) return v;
                var _, x = t[0], b = n[0], w = t[1], k = n[1];
                b < x && (_ = x, x = b, b = _);
                var M = b - x, A = Ex(M - xx) < vx;
                if (!A && k < w && (_ = w, w = k, k = _), A || M < vx ? A ? w + k > 0 ^ v[1] < (Ex(v[0] - x) < vx ? w : k) : w <= v[1] && v[1] <= k : M > xx ^ (x <= v[0] && v[0] <= b)) {
                    var E = wb(d, (-p + y) / g);
                    return bb(E, h), [v, yb(E)]
                }
            }
        }

        function u(e, n) {
            var i = r ? t : xx - t, o = 0;
            return e < -i ? o |= 1 : e > i && (o |= 2), n < -i ? o |= 4 : n > i && (o |= 8), o
        }

        return bw(o, (function (t) {
            var e, n, s, l, c;
            return {
                lineStart: function () {
                    l = s = !1, c = 1
                }, point: function (f, h) {
                    var d, p = [f, h], g = o(f, h), m = r ? g ? 0 : u(f, h) : g ? u(f + (f < 0 ? xx : -xx), h) : 0;
                    if (!e && (l = s = g) && t.lineStart(), g !== s && (!(d = a(e, p)) || mw(e, d) || mw(p, d)) && (p[2] = 1), g !== s) c = 0, g ? (t.lineStart(), d = a(p, e), t.point(d[0], d[1])) : (d = a(e, p), t.point(d[0], d[1], 2), t.lineEnd()), e = d; else if (i && e && r ^ g) {
                        var y;
                        m & n || !(y = a(p, e, !0)) || (c = 0, r ? (t.lineStart(), t.point(y[0][0], y[0][1]), t.point(y[1][0], y[1][1]), t.lineEnd()) : (t.point(y[1][0], y[1][1]), t.lineEnd(), t.lineStart(), t.point(y[0][0], y[0][1], 3)))
                    }
                    !g || e && mw(e, p) || t.point(p[0], p[1]), e = p, s = g, n = m
                }, lineEnd: function () {
                    s && t.lineEnd(), e = null
                }, clean: function () {
                    return c | (l && s) << 1
                }
            }
        }), (function (e, r, i, o) {
            !function (t, e, n, r, i, o) {
                if (n) {
                    var a = Fx(e), u = Ox(e), s = r * n;
                    null == i ? (i = e + r * kx, o = e - s / 2) : (i = pw(a, i), o = pw(a, o), (r > 0 ? i < o : i > o) && (i += r * kx));
                    for (var l, c = i; r > 0 ? c > o : c < o; c -= s) l = yb([a, -u * Fx(c), -u * Ox(c)]), t.point(l[0], l[1])
                }
            }(o, t, n, i, e, r)
        }), r ? [0, -t] : [-xx, t - xx])
    }

    var Ew = 1e9, Dw = -Ew;

    function Cw(t, e, n, r) {
        function i(i, o) {
            return t <= i && i <= n && e <= o && o <= r
        }

        function o(i, o, u, l) {
            var c = 0, f = 0;
            if (null == i || (c = a(i, u)) !== (f = a(o, u)) || s(i, o) < 0 ^ u > 0) do {
                l.point(0 === c || 3 === c ? t : n, c > 1 ? r : e)
            } while ((c = (c + u + 4) % 4) !== f); else l.point(o[0], o[1])
        }

        function a(r, i) {
            return Ex(r[0] - t) < vx ? i > 0 ? 0 : 3 : Ex(r[0] - n) < vx ? i > 0 ? 2 : 1 : Ex(r[1] - e) < vx ? i > 0 ? 1 : 0 : i > 0 ? 3 : 2
        }

        function u(t, e) {
            return s(t.x, e.x)
        }

        function s(t, e) {
            var n = a(t, 1), r = a(e, 1);
            return n !== r ? n - r : 0 === n ? e[1] - t[1] : 1 === n ? t[0] - e[0] : 2 === n ? t[1] - e[1] : e[0] - t[0]
        }

        return function (a) {
            var s, l, c, f, h, d, p, g, m, y, v, _ = a, x = gw(), b = {
                point: w, lineStart: function () {
                    b.point = k, l && l.push(c = []);
                    y = !0, m = !1, p = g = NaN
                }, lineEnd: function () {
                    s && (k(f, h), d && m && x.rejoin(), s.push(x.result()));
                    b.point = w, m && _.lineEnd()
                }, polygonStart: function () {
                    _ = x, s = [], l = [], v = !0
                }, polygonEnd: function () {
                    var e = function () {
                        for (var e = 0, n = 0, i = l.length; n < i; ++n) for (var o, a, u = l[n], s = 1, c = u.length, f = u[0], h = f[0], d = f[1]; s < c; ++s) o = h, a = d, h = (f = u[s])[0], d = f[1], a <= r ? d > r && (h - o) * (r - a) > (d - a) * (t - o) && ++e : d <= r && (h - o) * (r - a) < (d - a) * (t - o) && --e;
                        return e
                    }(), n = v && e, i = (s = Oe(s)).length;
                    (n || i) && (a.polygonStart(), n && (a.lineStart(), o(null, null, 1, a), a.lineEnd()), i && vw(s, u, e, o, a), a.polygonEnd());
                    _ = a, s = l = c = null
                }
            };

            function w(t, e) {
                i(t, e) && _.point(t, e)
            }

            function k(o, a) {
                var u = i(o, a);
                if (l && c.push([o, a]), y) f = o, h = a, d = u, y = !1, u && (_.lineStart(), _.point(o, a)); else if (u && m) _.point(o, a); else {
                    var s = [p = Math.max(Dw, Math.min(Ew, p)), g = Math.max(Dw, Math.min(Ew, g))],
                        x = [o = Math.max(Dw, Math.min(Ew, o)), a = Math.max(Dw, Math.min(Ew, a))];
                    !function (t, e, n, r, i, o) {
                        var a, u = t[0], s = t[1], l = 0, c = 1, f = e[0] - u, h = e[1] - s;
                        if (a = n - u, f || !(a > 0)) {
                            if (a /= f, f < 0) {
                                if (a < l) return;
                                a < c && (c = a)
                            } else if (f > 0) {
                                if (a > c) return;
                                a > l && (l = a)
                            }
                            if (a = i - u, f || !(a < 0)) {
                                if (a /= f, f < 0) {
                                    if (a > c) return;
                                    a > l && (l = a)
                                } else if (f > 0) {
                                    if (a < l) return;
                                    a < c && (c = a)
                                }
                                if (a = r - s, h || !(a > 0)) {
                                    if (a /= h, h < 0) {
                                        if (a < l) return;
                                        a < c && (c = a)
                                    } else if (h > 0) {
                                        if (a > c) return;
                                        a > l && (l = a)
                                    }
                                    if (a = o - s, h || !(a < 0)) {
                                        if (a /= h, h < 0) {
                                            if (a > c) return;
                                            a > l && (l = a)
                                        } else if (h > 0) {
                                            if (a < l) return;
                                            a < c && (c = a)
                                        }
                                        return l > 0 && (t[0] = u + l * f, t[1] = s + l * h), c < 1 && (e[0] = u + c * f, e[1] = s + c * h), !0
                                    }
                                }
                            }
                        }
                    }(s, x, t, e, n, r) ? u && (_.lineStart(), _.point(o, a), v = !1) : (m || (_.lineStart(), _.point(s[0], s[1])), _.point(x[0], x[1]), u || _.lineEnd(), v = !1)
                }
                p = o, g = a, m = u
            }

            return b
        }
    }

    function Fw(t, e, n) {
        var r = Re(t, e - vx, n).concat(e);
        return function (t) {
            return r.map((function (e) {
                return [t, e]
            }))
        }
    }

    function Sw(t, e, n) {
        var r = Re(t, e - vx, n).concat(e);
        return function (t) {
            return r.map((function (e) {
                return [e, t]
            }))
        }
    }

    var Bw, Tw, zw, Nw, Ow = t => t, Rw = new be, Lw = new be, Uw = {
        point: jx, lineStart: jx, lineEnd: jx, polygonStart: function () {
            Uw.lineStart = qw, Uw.lineEnd = Iw
        }, polygonEnd: function () {
            Uw.lineStart = Uw.lineEnd = Uw.point = jx, Rw.add(Ex(Lw)), Lw = new be
        }, result: function () {
            var t = Rw / 2;
            return Rw = new be, t
        }
    };

    function qw() {
        Uw.point = Pw
    }

    function Pw(t, e) {
        Uw.point = jw, Bw = zw = t, Tw = Nw = e
    }

    function jw(t, e) {
        Lw.add(Nw * t - zw * e), zw = t, Nw = e
    }

    function Iw() {
        jw(Bw, Tw)
    }

    var $w = 1 / 0, Ww = $w, Hw = -$w, Yw = Hw, Vw = {
        point: function (t, e) {
            t < $w && ($w = t);
            t > Hw && (Hw = t);
            e < Ww && (Ww = e);
            e > Yw && (Yw = e)
        }, lineStart: jx, lineEnd: jx, polygonStart: jx, polygonEnd: jx, result: function () {
            var t = [[$w, Ww], [Hw, Yw]];
            return Hw = Yw = -(Ww = $w = 1 / 0), t
        }
    };
    var Gw, Xw, Jw, Zw, Qw = 0, Kw = 0, tk = 0, ek = 0, nk = 0, rk = 0, ik = 0, ok = 0, ak = 0, uk = {
        point: sk, lineStart: lk, lineEnd: hk, polygonStart: function () {
            uk.lineStart = dk, uk.lineEnd = pk
        }, polygonEnd: function () {
            uk.point = sk, uk.lineStart = lk, uk.lineEnd = hk
        }, result: function () {
            var t = ak ? [ik / ak, ok / ak] : rk ? [ek / rk, nk / rk] : tk ? [Qw / tk, Kw / tk] : [NaN, NaN];
            return Qw = Kw = tk = ek = nk = rk = ik = ok = ak = 0, t
        }
    };

    function sk(t, e) {
        Qw += t, Kw += e, ++tk
    }

    function lk() {
        uk.point = ck
    }

    function ck(t, e) {
        uk.point = fk, sk(Jw = t, Zw = e)
    }

    function fk(t, e) {
        var n = t - Jw, r = e - Zw, i = Lx(n * n + r * r);
        ek += i * (Jw + t) / 2, nk += i * (Zw + e) / 2, rk += i, sk(Jw = t, Zw = e)
    }

    function hk() {
        uk.point = sk
    }

    function dk() {
        uk.point = gk
    }

    function pk() {
        mk(Gw, Xw)
    }

    function gk(t, e) {
        uk.point = mk, sk(Gw = Jw = t, Xw = Zw = e)
    }

    function mk(t, e) {
        var n = t - Jw, r = e - Zw, i = Lx(n * n + r * r);
        ek += i * (Jw + t) / 2, nk += i * (Zw + e) / 2, rk += i, ik += (i = Zw * t - Jw * e) * (Jw + t), ok += i * (Zw + e), ak += 3 * i, sk(Jw = t, Zw = e)
    }

    function yk(t) {
        this._context = t
    }

    yk.prototype = {
        _radius: 4.5, pointRadius: function (t) {
            return this._radius = t, this
        }, polygonStart: function () {
            this._line = 0
        }, polygonEnd: function () {
            this._line = NaN
        }, lineStart: function () {
            this._point = 0
        }, lineEnd: function () {
            0 === this._line && this._context.closePath(), this._point = NaN
        }, point: function (t, e) {
            switch (this._point) {
                case 0:
                    this._context.moveTo(t, e), this._point = 1;
                    break;
                case 1:
                    this._context.lineTo(t, e);
                    break;
                default:
                    this._context.moveTo(t + this._radius, e), this._context.arc(t, e, this._radius, 0, kx)
            }
        }, result: jx
    };
    var vk, _k, xk, bk, wk, kk = new be, Mk = {
        point: jx, lineStart: function () {
            Mk.point = Ak
        }, lineEnd: function () {
            vk && Ek(_k, xk), Mk.point = jx
        }, polygonStart: function () {
            vk = !0
        }, polygonEnd: function () {
            vk = null
        }, result: function () {
            var t = +kk;
            return kk = new be, t
        }
    };

    function Ak(t, e) {
        Mk.point = Ek, _k = bk = t, xk = wk = e
    }

    function Ek(t, e) {
        bk -= t, wk -= e, kk.add(Lx(bk * bk + wk * wk)), bk = t, wk = e
    }

    function Dk() {
        this._string = []
    }

    function Ck(t) {
        return "m0," + t + "a" + t + "," + t + " 0 1,1 0," + -2 * t + "a" + t + "," + t + " 0 1,1 0," + 2 * t + "z"
    }

    function Fk(t, e) {
        var n, r, i = 4.5;

        function o(t) {
            return t && ("function" == typeof i && r.pointRadius(+i.apply(this, arguments)), Vx(t, n(r))), r.result()
        }

        return o.area = function (t) {
            return Vx(t, n(Uw)), Uw.result()
        }, o.measure = function (t) {
            return Vx(t, n(Mk)), Mk.result()
        }, o.bounds = function (t) {
            return Vx(t, n(Vw)), Vw.result()
        }, o.centroid = function (t) {
            return Vx(t, n(uk)), uk.result()
        }, o.projection = function (e) {
            return arguments.length ? (n = null == e ? (t = null, Ow) : (t = e).stream, o) : t
        }, o.context = function (t) {
            return arguments.length ? (r = null == t ? (e = null, new Dk) : new yk(e = t), "function" != typeof i && r.pointRadius(i), o) : e
        }, o.pointRadius = function (t) {
            return arguments.length ? (i = "function" == typeof t ? t : (r.pointRadius(+t), +t), o) : i
        }, o.projection(t).context(e)
    }

    function Sk(t) {
        return function (e) {
            var n = new Bk;
            for (var r in t) n[r] = t[r];
            return n.stream = e, n
        }
    }

    function Bk() {
    }

    function Tk(t, e, n) {
        var r = t.clipExtent && t.clipExtent();
        return t.scale(150).translate([0, 0]), null != r && t.clipExtent(null), Vx(n, t.stream(Vw)), e(Vw.result()), null != r && t.clipExtent(r), t
    }

    function zk(t, e, n) {
        return Tk(t, (function (n) {
            var r = e[1][0] - e[0][0], i = e[1][1] - e[0][1],
                o = Math.min(r / (n[1][0] - n[0][0]), i / (n[1][1] - n[0][1])),
                a = +e[0][0] + (r - o * (n[1][0] + n[0][0])) / 2, u = +e[0][1] + (i - o * (n[1][1] + n[0][1])) / 2;
            t.scale(150 * o).translate([a, u])
        }), n)
    }

    function Nk(t, e, n) {
        return zk(t, [[0, 0], e], n)
    }

    function Ok(t, e, n) {
        return Tk(t, (function (n) {
            var r = +e, i = r / (n[1][0] - n[0][0]), o = (r - i * (n[1][0] + n[0][0])) / 2, a = -i * n[0][1];
            t.scale(150 * i).translate([o, a])
        }), n)
    }

    function Rk(t, e, n) {
        return Tk(t, (function (n) {
            var r = +e, i = r / (n[1][1] - n[0][1]), o = -i * n[0][0], a = (r - i * (n[1][1] + n[0][1])) / 2;
            t.scale(150 * i).translate([o, a])
        }), n)
    }

    Dk.prototype = {
        _radius: 4.5, _circle: Ck(4.5), pointRadius: function (t) {
            return (t = +t) !== this._radius && (this._radius = t, this._circle = null), this
        }, polygonStart: function () {
            this._line = 0
        }, polygonEnd: function () {
            this._line = NaN
        }, lineStart: function () {
            this._point = 0
        }, lineEnd: function () {
            0 === this._line && this._string.push("Z"), this._point = NaN
        }, point: function (t, e) {
            switch (this._point) {
                case 0:
                    this._string.push("M", t, ",", e), this._point = 1;
                    break;
                case 1:
                    this._string.push("L", t, ",", e);
                    break;
                default:
                    null == this._circle && (this._circle = Ck(this._radius)), this._string.push("M", t, ",", e, this._circle)
            }
        }, result: function () {
            if (this._string.length) {
                var t = this._string.join("");
                return this._string = [], t
            }
            return null
        }
    }, Bk.prototype = {
        constructor: Bk, point: function (t, e) {
            this.stream.point(t, e)
        }, sphere: function () {
            this.stream.sphere()
        }, lineStart: function () {
            this.stream.lineStart()
        }, lineEnd: function () {
            this.stream.lineEnd()
        }, polygonStart: function () {
            this.stream.polygonStart()
        }, polygonEnd: function () {
            this.stream.polygonEnd()
        }
    };
    var Lk = Fx(30 * Ax);

    function Uk(t, e) {
        return +e ? function (t, e) {
            function n(r, i, o, a, u, s, l, c, f, h, d, p, g, m) {
                var y = l - r, v = c - i, _ = y * y + v * v;
                if (_ > 4 * e && g--) {
                    var x = a + h, b = u + d, w = s + p, k = Lx(x * x + b * b + w * w), M = Px(w /= k),
                        A = Ex(Ex(w) - 1) < vx || Ex(o - f) < vx ? (o + f) / 2 : Cx(b, x), E = t(A, M), D = E[0],
                        C = E[1], F = D - r, S = C - i, B = v * F - y * S;
                    (B * B / _ > e || Ex((y * F + v * S) / _ - .5) > .3 || a * h + u * d + s * p < Lk) && (n(r, i, o, a, u, s, D, C, A, x /= k, b /= k, w, g, m), m.point(D, C), n(D, C, A, x, b, w, l, c, f, h, d, p, g, m))
                }
            }

            return function (e) {
                var r, i, o, a, u, s, l, c, f, h, d, p, g = {
                    point: m, lineStart: y, lineEnd: _, polygonStart: function () {
                        e.polygonStart(), g.lineStart = x
                    }, polygonEnd: function () {
                        e.polygonEnd(), g.lineStart = y
                    }
                };

                function m(n, r) {
                    n = t(n, r), e.point(n[0], n[1])
                }

                function y() {
                    c = NaN, g.point = v, e.lineStart()
                }

                function v(r, i) {
                    var o = vb([r, i]), a = t(r, i);
                    n(c, f, l, h, d, p, c = a[0], f = a[1], l = r, h = o[0], d = o[1], p = o[2], 16, e), e.point(c, f)
                }

                function _() {
                    g.point = m, e.lineEnd()
                }

                function x() {
                    y(), g.point = b, g.lineEnd = w
                }

                function b(t, e) {
                    v(r = t, e), i = c, o = f, a = h, u = d, s = p, g.point = v
                }

                function w() {
                    n(c, f, l, h, d, p, i, o, r, a, u, s, 16, e), g.lineEnd = _, _()
                }

                return g
            }
        }(t, e) : function (t) {
            return Sk({
                point: function (e, n) {
                    e = t(e, n), this.stream.point(e[0], e[1])
                }
            })
        }(t)
    }

    var qk = Sk({
        point: function (t, e) {
            this.stream.point(t * Ax, e * Ax)
        }
    });

    function Pk(t, e, n, r, i, o) {
        if (!o) return function (t, e, n, r, i) {
            function o(o, a) {
                return [e + t * (o *= r), n - t * (a *= i)]
            }

            return o.invert = function (o, a) {
                return [(o - e) / t * r, (n - a) / t * i]
            }, o
        }(t, e, n, r, i);
        var a = Fx(o), u = Ox(o), s = a * t, l = u * t, c = a / t, f = u / t, h = (u * n - a * e) / t,
            d = (u * e + a * n) / t;

        function p(t, o) {
            return [s * (t *= r) - l * (o *= i) + e, n - l * t - s * o]
        }

        return p.invert = function (t, e) {
            return [r * (c * t - f * e + h), i * (d - f * t - c * e)]
        }, p
    }

    function jk(t) {
        return Ik((function () {
            return t
        }))()
    }

    function Ik(t) {
        var e, n, r, i, o, a, u, s, l, c, f = 150, h = 480, d = 250, p = 0, g = 0, m = 0, y = 0, v = 0, _ = 0, x = 1,
            b = 1, w = null, k = Mw, M = null, A = Ow, E = .5;

        function D(t) {
            return s(t[0] * Ax, t[1] * Ax)
        }

        function C(t) {
            return (t = s.invert(t[0], t[1])) && [t[0] * Mx, t[1] * Mx]
        }

        function F() {
            var t = Pk(f, 0, 0, x, b, _).apply(null, e(p, g)), r = Pk(f, h - t[0], d - t[1], x, b, _);
            return n = cw(m, y, v), u = sw(e, r), s = sw(n, u), a = Uk(u, E), S()
        }

        function S() {
            return l = c = null, D
        }

        return D.stream = function (t) {
            return l && c === t ? l : l = qk(function (t) {
                return Sk({
                    point: function (e, n) {
                        var r = t(e, n);
                        return this.stream.point(r[0], r[1])
                    }
                })
            }(n)(k(a(A(c = t)))))
        }, D.preclip = function (t) {
            return arguments.length ? (k = t, w = void 0, S()) : k
        }, D.postclip = function (t) {
            return arguments.length ? (A = t, M = r = i = o = null, S()) : A
        }, D.clipAngle = function (t) {
            return arguments.length ? (k = +t ? Aw(w = t * Ax) : (w = null, Mw), S()) : w * Mx
        }, D.clipExtent = function (t) {
            return arguments.length ? (A = null == t ? (M = r = i = o = null, Ow) : Cw(M = +t[0][0], r = +t[0][1], i = +t[1][0], o = +t[1][1]), S()) : null == M ? null : [[M, r], [i, o]]
        }, D.scale = function (t) {
            return arguments.length ? (f = +t, F()) : f
        }, D.translate = function (t) {
            return arguments.length ? (h = +t[0], d = +t[1], F()) : [h, d]
        }, D.center = function (t) {
            return arguments.length ? (p = t[0] % 360 * Ax, g = t[1] % 360 * Ax, F()) : [p * Mx, g * Mx]
        }, D.rotate = function (t) {
            return arguments.length ? (m = t[0] % 360 * Ax, y = t[1] % 360 * Ax, v = t.length > 2 ? t[2] % 360 * Ax : 0, F()) : [m * Mx, y * Mx, v * Mx]
        }, D.angle = function (t) {
            return arguments.length ? (_ = t % 360 * Ax, F()) : _ * Mx
        }, D.reflectX = function (t) {
            return arguments.length ? (x = t ? -1 : 1, F()) : x < 0
        }, D.reflectY = function (t) {
            return arguments.length ? (b = t ? -1 : 1, F()) : b < 0
        }, D.precision = function (t) {
            return arguments.length ? (a = Uk(u, E = t * t), S()) : Lx(E)
        }, D.fitExtent = function (t, e) {
            return zk(D, t, e)
        }, D.fitSize = function (t, e) {
            return Nk(D, t, e)
        }, D.fitWidth = function (t, e) {
            return Ok(D, t, e)
        }, D.fitHeight = function (t, e) {
            return Rk(D, t, e)
        }, function () {
            return e = t.apply(this, arguments), D.invert = e.invert && C, F()
        }
    }

    function $k(t) {
        var e = 0, n = xx / 3, r = Ik(t), i = r(e, n);
        return i.parallels = function (t) {
            return arguments.length ? r(e = t[0] * Ax, n = t[1] * Ax) : [e * Mx, n * Mx]
        }, i
    }

    function Wk(t, e) {
        var n = Ox(t), r = (n + Ox(e)) / 2;
        if (Ex(r) < vx) return function (t) {
            var e = Fx(t);

            function n(t, n) {
                return [t * e, Ox(n) / e]
            }

            return n.invert = function (t, n) {
                return [t / e, Px(n * e)]
            }, n
        }(t);
        var i = 1 + n * (2 * r - n), o = Lx(i) / r;

        function a(t, e) {
            var n = Lx(i - 2 * r * Ox(e)) / r;
            return [n * Ox(t *= r), o - n * Fx(t)]
        }

        return a.invert = function (t, e) {
            var n = o - e, a = Cx(t, Ex(n)) * Rx(n);
            return n * r < 0 && (a -= xx * Rx(t) * Rx(n)), [a / r, Px((i - (t * t + n * n) * r * r) / (2 * r))]
        }, a
    }

    function Hk() {
        return $k(Wk).scale(155.424).center([0, 33.6442])
    }

    function Yk() {
        return Hk().parallels([29.5, 45.5]).scale(1070).translate([480, 250]).rotate([96, 0]).center([-.6, 38.7])
    }

    function Vk(t) {
        return function (e, n) {
            var r = Fx(e), i = Fx(n), o = t(r * i);
            return o === 1 / 0 ? [2, 0] : [o * i * Ox(e), o * Ox(n)]
        }
    }

    function Gk(t) {
        return function (e, n) {
            var r = Lx(e * e + n * n), i = t(r), o = Ox(i), a = Fx(i);
            return [Cx(e * o, r * a), Px(r && n * o / r)]
        }
    }

    var Xk = Vk((function (t) {
        return Lx(2 / (1 + t))
    }));
    Xk.invert = Gk((function (t) {
        return 2 * Px(t / 2)
    }));
    var Jk = Vk((function (t) {
        return (t = qx(t)) && t / Ox(t)
    }));

    function Zk(t, e) {
        return [t, zx(Ux((bx + e) / 2))]
    }

    function Qk(t) {
        var e, n, r, i = jk(t), o = i.center, a = i.scale, u = i.translate, s = i.clipExtent, l = null;

        function c() {
            var o = xx * a(), u = i(function (t) {
                function e(e) {
                    return (e = t(e[0] * Ax, e[1] * Ax))[0] *= Mx, e[1] *= Mx, e
                }

                return t = cw(t[0] * Ax, t[1] * Ax, t.length > 2 ? t[2] * Ax : 0), e.invert = function (e) {
                    return (e = t.invert(e[0] * Ax, e[1] * Ax))[0] *= Mx, e[1] *= Mx, e
                }, e
            }(i.rotate()).invert([0, 0]));
            return s(null == l ? [[u[0] - o, u[1] - o], [u[0] + o, u[1] + o]] : t === Zk ? [[Math.max(u[0] - o, l), e], [Math.min(u[0] + o, n), r]] : [[l, Math.max(u[1] - o, e)], [n, Math.min(u[1] + o, r)]])
        }

        return i.scale = function (t) {
            return arguments.length ? (a(t), c()) : a()
        }, i.translate = function (t) {
            return arguments.length ? (u(t), c()) : u()
        }, i.center = function (t) {
            return arguments.length ? (o(t), c()) : o()
        }, i.clipExtent = function (t) {
            return arguments.length ? (null == t ? l = e = n = r = null : (l = +t[0][0], e = +t[0][1], n = +t[1][0], r = +t[1][1]), c()) : null == l ? null : [[l, e], [n, r]]
        }, c()
    }

    function Kk(t) {
        return Ux((bx + t) / 2)
    }

    function tM(t, e) {
        var n = Fx(t), r = t === e ? Ox(t) : zx(n / Fx(e)) / zx(Kk(e) / Kk(t)), i = n * Nx(Kk(t), r) / r;
        if (!r) return Zk;

        function o(t, e) {
            i > 0 ? e < -bx + vx && (e = -bx + vx) : e > bx - vx && (e = bx - vx);
            var n = i / Nx(Kk(e), r);
            return [n * Ox(r * t), i - n * Fx(r * t)]
        }

        return o.invert = function (t, e) {
            var n = i - e, o = Rx(r) * Lx(t * t + n * n), a = Cx(t, Ex(n)) * Rx(n);
            return n * r < 0 && (a -= xx * Rx(t) * Rx(n)), [a / r, 2 * Dx(Nx(i / o, 1 / r)) - bx]
        }, o
    }

    function eM(t, e) {
        return [t, e]
    }

    function nM(t, e) {
        var n = Fx(t), r = t === e ? Ox(t) : (n - Fx(e)) / (e - t), i = n / r + t;
        if (Ex(r) < vx) return eM;

        function o(t, e) {
            var n = i - e, o = r * t;
            return [n * Ox(o), i - n * Fx(o)]
        }

        return o.invert = function (t, e) {
            var n = i - e, o = Cx(t, Ex(n)) * Rx(n);
            return n * r < 0 && (o -= xx * Rx(t) * Rx(n)), [o / r, i - Rx(r) * Lx(t * t + n * n)]
        }, o
    }

    Jk.invert = Gk((function (t) {
        return t
    })), Zk.invert = function (t, e) {
        return [t, 2 * Dx(Bx(e)) - bx]
    }, eM.invert = eM;
    var rM = 1.340264, iM = -.081106, oM = 893e-6, aM = .003796, uM = Lx(3) / 2;

    function sM(t, e) {
        var n = Px(uM * Ox(e)), r = n * n, i = r * r * r;
        return [t * Fx(n) / (uM * (rM + 3 * iM * r + i * (7 * oM + 9 * aM * r))), n * (rM + iM * r + i * (oM + aM * r))]
    }

    function lM(t, e) {
        var n = Fx(e), r = Fx(t) * n;
        return [n * Ox(t) / r, Ox(e) / r]
    }

    function cM(t, e) {
        var n = e * e, r = n * n;
        return [t * (.8707 - .131979 * n + r * (r * (.003971 * n - .001529 * r) - .013791)), e * (1.007226 + n * (.015085 + r * (.028874 * n - .044475 - .005916 * r)))]
    }

    function fM(t, e) {
        return [Fx(e) * Ox(t), Ox(e)]
    }

    function hM(t, e) {
        var n = Fx(e), r = 1 + Fx(t) * n;
        return [n * Ox(t) / r, Ox(e) / r]
    }

    function dM(t, e) {
        return [zx(Ux((bx + e) / 2)), -t]
    }

    sM.invert = function (t, e) {
        for (var n, r = e, i = r * r, o = i * i * i, a = 0; a < 12 && (o = (i = (r -= n = (r * (rM + iM * i + o * (oM + aM * i)) - e) / (rM + 3 * iM * i + o * (7 * oM + 9 * aM * i))) * r) * i * i, !(Ex(n) < _x)); ++a) ;
        return [uM * t * (rM + 3 * iM * i + o * (7 * oM + 9 * aM * i)) / Fx(r), Px(Ox(r) / uM)]
    }, lM.invert = Gk(Dx), cM.invert = function (t, e) {
        var n, r = e, i = 25;
        do {
            var o = r * r, a = o * o;
            r -= n = (r * (1.007226 + o * (.015085 + a * (.028874 * o - .044475 - .005916 * a))) - e) / (1.007226 + o * (.045255 + a * (.259866 * o - .311325 - .005916 * 11 * a)))
        } while (Ex(n) > vx && --i > 0);
        return [t / (.8707 + (o = r * r) * (o * (o * o * o * (.003971 - .001529 * o) - .013791) - .131979)), r]
    }, fM.invert = Gk(Px), hM.invert = Gk((function (t) {
        return 2 * Dx(t)
    })), dM.invert = function (t, e) {
        return [-e, 2 * Dx(Bx(t)) - bx]
    };
    var pM = Math.abs, gM = Math.cos, mM = Math.sin, yM = Math.PI, vM = yM / 2, _M = function (t) {
        return t > 0 ? Math.sqrt(t) : 0
    }(2);

    function xM(t) {
        return t > 1 ? vM : t < -1 ? -vM : Math.asin(t)
    }

    function bM(t, e) {
        var n, r = t * mM(e), i = 30;
        do {
            e -= n = (e + mM(e) - r) / (1 + gM(e))
        } while (pM(n) > 1e-6 && --i > 0);
        return e / 2
    }

    var wM = function (t, e, n) {
        function r(r, i) {
            return [t * r * gM(i = bM(n, i)), e * mM(i)]
        }

        return r.invert = function (r, i) {
            return i = xM(i / e), [r / (t * gM(i)), xM((2 * i + mM(2 * i)) / n)]
        }, r
    }(_M / vM, _M, yM);
    const kM = Fk(),
        MM = ["clipAngle", "clipExtent", "scale", "translate", "center", "rotate", "parallels", "precision", "reflectX", "reflectY", "coefficient", "distance", "fraction", "lobes", "parallel", "radius", "ratio", "spacing", "tilt"];

    function AM(t, e) {
        return function n() {
            const r = e();
            return r.type = t, r.path = Fk().projection(r), r.copy = r.copy || function () {
                const t = n();
                return MM.forEach((e => {
                    r[e] && t[e](r[e]())
                })), t.path.pointRadius(r.path.pointRadius()), t
            }, r
        }
    }

    function EM(t, e) {
        if (!t || "string" != typeof t) throw new Error("Projection type must be a name string.");
        return t = t.toLowerCase(), arguments.length > 1 ? (CM[t] = AM(t, e), this) : CM[t] || null
    }

    function DM(t) {
        return t && t.path || kM
    }

    const CM = {
        albers: Yk, albersusa: function () {
            var t, e, n, r, i, o, a = Yk(), u = Hk().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]),
                s = Hk().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]), l = {
                    point: function (t, e) {
                        o = [t, e]
                    }
                };

            function c(t) {
                var e = t[0], a = t[1];
                return o = null, n.point(e, a), o || (r.point(e, a), o) || (i.point(e, a), o)
            }

            function f() {
                return t = e = null, c
            }

            return c.invert = function (t) {
                var e = a.scale(), n = a.translate(), r = (t[0] - n[0]) / e, i = (t[1] - n[1]) / e;
                return (i >= .12 && i < .234 && r >= -.425 && r < -.214 ? u : i >= .166 && i < .234 && r >= -.214 && r < -.115 ? s : a).invert(t)
            }, c.stream = function (n) {
                return t && e === n ? t : (r = [a.stream(e = n), u.stream(n), s.stream(n)], i = r.length, t = {
                    point: function (t, e) {
                        for (var n = -1; ++n < i;) r[n].point(t, e)
                    }, sphere: function () {
                        for (var t = -1; ++t < i;) r[t].sphere()
                    }, lineStart: function () {
                        for (var t = -1; ++t < i;) r[t].lineStart()
                    }, lineEnd: function () {
                        for (var t = -1; ++t < i;) r[t].lineEnd()
                    }, polygonStart: function () {
                        for (var t = -1; ++t < i;) r[t].polygonStart()
                    }, polygonEnd: function () {
                        for (var t = -1; ++t < i;) r[t].polygonEnd()
                    }
                });
                var r, i
            }, c.precision = function (t) {
                return arguments.length ? (a.precision(t), u.precision(t), s.precision(t), f()) : a.precision()
            }, c.scale = function (t) {
                return arguments.length ? (a.scale(t), u.scale(.35 * t), s.scale(t), c.translate(a.translate())) : a.scale()
            }, c.translate = function (t) {
                if (!arguments.length) return a.translate();
                var e = a.scale(), o = +t[0], c = +t[1];
                return n = a.translate(t).clipExtent([[o - .455 * e, c - .238 * e], [o + .455 * e, c + .238 * e]]).stream(l), r = u.translate([o - .307 * e, c + .201 * e]).clipExtent([[o - .425 * e + vx, c + .12 * e + vx], [o - .214 * e - vx, c + .234 * e - vx]]).stream(l), i = s.translate([o - .205 * e, c + .212 * e]).clipExtent([[o - .214 * e + vx, c + .166 * e + vx], [o - .115 * e - vx, c + .234 * e - vx]]).stream(l), f()
            }, c.fitExtent = function (t, e) {
                return zk(c, t, e)
            }, c.fitSize = function (t, e) {
                return Nk(c, t, e)
            }, c.fitWidth = function (t, e) {
                return Ok(c, t, e)
            }, c.fitHeight = function (t, e) {
                return Rk(c, t, e)
            }, c.scale(1070)
        }, azimuthalequalarea: function () {
            return jk(Xk).scale(124.75).clipAngle(179.999)
        }, azimuthalequidistant: function () {
            return jk(Jk).scale(79.4188).clipAngle(179.999)
        }, conicconformal: function () {
            return $k(tM).scale(109.5).parallels([30, 30])
        }, conicequalarea: Hk, conicequidistant: function () {
            return $k(nM).scale(131.154).center([0, 13.9389])
        }, equalEarth: function () {
            return jk(sM).scale(177.158)
        }, equirectangular: function () {
            return jk(eM).scale(152.63)
        }, gnomonic: function () {
            return jk(lM).scale(144.049).clipAngle(60)
        }, identity: function () {
            var t, e, n, r, i, o, a, u = 1, s = 0, l = 0, c = 1, f = 1, h = 0, d = null, p = 1, g = 1, m = Sk({
                point: function (t, e) {
                    var n = _([t, e]);
                    this.stream.point(n[0], n[1])
                }
            }), y = Ow;

            function v() {
                return p = u * c, g = u * f, o = a = null, _
            }

            function _(n) {
                var r = n[0] * p, i = n[1] * g;
                if (h) {
                    var o = i * t - r * e;
                    r = r * t + i * e, i = o
                }
                return [r + s, i + l]
            }

            return _.invert = function (n) {
                var r = n[0] - s, i = n[1] - l;
                if (h) {
                    var o = i * t + r * e;
                    r = r * t - i * e, i = o
                }
                return [r / p, i / g]
            }, _.stream = function (t) {
                return o && a === t ? o : o = m(y(a = t))
            }, _.postclip = function (t) {
                return arguments.length ? (y = t, d = n = r = i = null, v()) : y
            }, _.clipExtent = function (t) {
                return arguments.length ? (y = null == t ? (d = n = r = i = null, Ow) : Cw(d = +t[0][0], n = +t[0][1], r = +t[1][0], i = +t[1][1]), v()) : null == d ? null : [[d, n], [r, i]]
            }, _.scale = function (t) {
                return arguments.length ? (u = +t, v()) : u
            }, _.translate = function (t) {
                return arguments.length ? (s = +t[0], l = +t[1], v()) : [s, l]
            }, _.angle = function (n) {
                return arguments.length ? (e = Ox(h = n % 360 * Ax), t = Fx(h), v()) : h * Mx
            }, _.reflectX = function (t) {
                return arguments.length ? (c = t ? -1 : 1, v()) : c < 0
            }, _.reflectY = function (t) {
                return arguments.length ? (f = t ? -1 : 1, v()) : f < 0
            }, _.fitExtent = function (t, e) {
                return zk(_, t, e)
            }, _.fitSize = function (t, e) {
                return Nk(_, t, e)
            }, _.fitWidth = function (t, e) {
                return Ok(_, t, e)
            }, _.fitHeight = function (t, e) {
                return Rk(_, t, e)
            }, _
        }, mercator: function () {
            return Qk(Zk).scale(961 / kx)
        }, mollweide: function () {
            return jk(wM).scale(169.529)
        }, naturalEarth1: function () {
            return jk(cM).scale(175.295)
        }, orthographic: function () {
            return jk(fM).scale(249.5).clipAngle(90.000001)
        }, stereographic: function () {
            return jk(hM).scale(250).clipAngle(142)
        }, transversemercator: function () {
            var t = Qk(dM), e = t.center, n = t.rotate;
            return t.center = function (t) {
                return arguments.length ? e([-t[1], t[0]]) : [(t = e())[1], -t[0]]
            }, t.rotate = function (t) {
                return arguments.length ? n([t[0], t[1], t.length > 2 ? t[2] + 90 : 90]) : [(t = n())[0], t[1], t[2] - 90]
            }, n([0, 0, 90]).scale(159.155)
        }
    };
    for (const t in CM) EM(t, CM[t]);

    function FM() {
    }

    const SM = [[], [[[1, 1.5], [.5, 1]]], [[[1.5, 1], [1, 1.5]]], [[[1.5, 1], [.5, 1]]], [[[1, .5], [1.5, 1]]], [[[1, 1.5], [.5, 1]], [[1, .5], [1.5, 1]]], [[[1, .5], [1, 1.5]]], [[[1, .5], [.5, 1]]], [[[.5, 1], [1, .5]]], [[[1, 1.5], [1, .5]]], [[[.5, 1], [1, .5]], [[1.5, 1], [1, 1.5]]], [[[1.5, 1], [1, .5]]], [[[.5, 1], [1.5, 1]]], [[[1, 1.5], [1.5, 1]]], [[[.5, 1], [1, 1.5]]], []];

    function BM() {
        var t = 1, e = 1, n = a;

        function r(t, e) {
            return e.map((e => i(t, e)))
        }

        function i(r, i) {
            var a = [], u = [];
            return function (n, r, i) {
                var a, u, s, l, c, f, h = new Array, d = new Array;
                a = u = -1, l = n[0] >= r, SM[l << 1].forEach(p);
                for (; ++a < t - 1;) s = l, l = n[a + 1] >= r, SM[s | l << 1].forEach(p);
                SM[l << 0].forEach(p);
                for (; ++u < e - 1;) {
                    for (a = -1, l = n[u * t + t] >= r, c = n[u * t] >= r, SM[l << 1 | c << 2].forEach(p); ++a < t - 1;) s = l, l = n[u * t + t + a + 1] >= r, f = c, c = n[u * t + a + 1] >= r, SM[s | l << 1 | c << 2 | f << 3].forEach(p);
                    SM[l | c << 3].forEach(p)
                }
                a = -1, c = n[u * t] >= r, SM[c << 2].forEach(p);
                for (; ++a < t - 1;) f = c, c = n[u * t + a + 1] >= r, SM[c << 2 | f << 3].forEach(p);

                function p(t) {
                    var e, n, r = [t[0][0] + a, t[0][1] + u], s = [t[1][0] + a, t[1][1] + u], l = o(r), c = o(s);
                    (e = d[l]) ? (n = h[c]) ? (delete d[e.end], delete h[n.start], e === n ? (e.ring.push(s), i(e.ring)) : h[e.start] = d[n.end] = {
                        start: e.start,
                        end: n.end,
                        ring: e.ring.concat(n.ring)
                    }) : (delete d[e.end], e.ring.push(s), d[e.end = c] = e) : (e = h[c]) ? (n = d[l]) ? (delete h[e.start], delete d[n.end], e === n ? (e.ring.push(s), i(e.ring)) : h[n.start] = d[e.end] = {
                        start: n.start,
                        end: e.end,
                        ring: n.ring.concat(e.ring)
                    }) : (delete h[e.start], e.ring.unshift(r), h[e.start = l] = e) : h[l] = d[c] = {
                        start: l,
                        end: c,
                        ring: [r, s]
                    }
                }

                SM[c << 3].forEach(p)
            }(r, i, (t => {
                n(t, r, i), function (t) {
                    var e = 0, n = t.length, r = t[n - 1][1] * t[0][0] - t[n - 1][0] * t[0][1];
                    for (; ++e < n;) r += t[e - 1][1] * t[e][0] - t[e - 1][0] * t[e][1];
                    return r
                }(t) > 0 ? a.push([t]) : u.push(t)
            })), u.forEach((t => {
                for (var e, n = 0, r = a.length; n < r; ++n) if (-1 !== TM((e = a[n])[0], t)) return void e.push(t)
            })), {type: "MultiPolygon", value: i, coordinates: a}
        }

        function o(e) {
            return 2 * e[0] + e[1] * (t + 1) * 4
        }

        function a(n, r, i) {
            n.forEach((n => {
                var o, a = n[0], u = n[1], s = 0 | a, l = 0 | u, c = r[l * t + s];
                a > 0 && a < t && s === a && (o = r[l * t + s - 1], n[0] = a + (i - o) / (c - o) - .5), u > 0 && u < e && l === u && (o = r[(l - 1) * t + s], n[1] = u + (i - o) / (c - o) - .5)
            }))
        }

        return r.contour = i, r.size = function (n) {
            if (!arguments.length) return [t, e];
            var i = Math.floor(n[0]), o = Math.floor(n[1]);
            return i >= 0 && o >= 0 || u("invalid size"), t = i, e = o, r
        }, r.smooth = function (t) {
            return arguments.length ? (n = t ? a : FM, r) : n === a
        }, r
    }

    function TM(t, e) {
        for (var n, r = -1, i = e.length; ++r < i;) if (n = zM(t, e[r])) return n;
        return 0
    }

    function zM(t, e) {
        for (var n = e[0], r = e[1], i = -1, o = 0, a = t.length, u = a - 1; o < a; u = o++) {
            var s = t[o], l = s[0], c = s[1], f = t[u], h = f[0], d = f[1];
            if (NM(s, f, e)) return 0;
            c > r != d > r && n < (h - l) * (r - c) / (d - c) + l && (i = -i)
        }
        return i
    }

    function NM(t, e, n) {
        var r, i, o, a;
        return function (t, e, n) {
            return (e[0] - t[0]) * (n[1] - t[1]) == (n[0] - t[0]) * (e[1] - t[1])
        }(t, e, n) && (i = t[r = +(t[0] === e[0])], o = n[r], a = e[r], i <= o && o <= a || a <= o && o <= i)
    }

    function OM(t, e, n) {
        return function (r) {
            var i = tt(r), o = n ? Math.min(i[0], 0) : i[0], a = i[1], u = a - o, s = e ? De(o, a, t) : u / (t + 1);
            return Re(s, a, s)
        }
    }

    function RM(t) {
        pa.call(this, null, t)
    }

    function LM(t, e, n, r, i) {
        const o = t.x1 || 0, a = t.y1 || 0, u = e * n < 0;

        function s(t) {
            t.forEach(l)
        }

        function l(t) {
            u && t.reverse(), t.forEach(c)
        }

        function c(t) {
            t[0] = (t[0] - o) * e + r, t[1] = (t[1] - a) * n + i
        }

        return function (t) {
            return t.coordinates.forEach(s), t
        }
    }

    function UM(t, e, n) {
        const r = t >= 0 ? t : ba(e, n);
        return Math.round((Math.sqrt(4 * r * r + 1) - 1) / 2)
    }

    function qM(t) {
        return H(t) ? t : Z(+t)
    }

    function PM() {
        var t = t => t[0], e = t => t[1], n = d, r = [-1, -1], i = 960, o = 500, a = 2;

        function s(u, s) {
            const l = UM(r[0], u, t) >> a, c = UM(r[1], u, e) >> a, f = l ? l + 2 : 0, h = c ? c + 2 : 0,
                d = 2 * f + (i >> a), p = 2 * h + (o >> a), g = new Float32Array(d * p), m = new Float32Array(d * p);
            let y = g;
            u.forEach((r => {
                const i = f + (+t(r) >> a), o = h + (+e(r) >> a);
                i >= 0 && i < d && o >= 0 && o < p && (g[i + o * d] += +n(r))
            })), l > 0 && c > 0 ? (jM(d, p, g, m, l), IM(d, p, m, g, c), jM(d, p, g, m, l), IM(d, p, m, g, c), jM(d, p, g, m, l), IM(d, p, m, g, c)) : l > 0 ? (jM(d, p, g, m, l), jM(d, p, m, g, l), jM(d, p, g, m, l), y = m) : c > 0 && (IM(d, p, g, m, c), IM(d, p, m, g, c), IM(d, p, g, m, c), y = m);
            const v = s ? Math.pow(2, -2 * a) : 1 / Le(y);
            for (let t = 0, e = d * p; t < e; ++t) y[t] *= v;
            return {values: y, scale: 1 << a, width: d, height: p, x1: f, y1: h, x2: f + (i >> a), y2: h + (o >> a)}
        }

        return s.x = function (e) {
            return arguments.length ? (t = qM(e), s) : t
        }, s.y = function (t) {
            return arguments.length ? (e = qM(t), s) : e
        }, s.weight = function (t) {
            return arguments.length ? (n = qM(t), s) : n
        }, s.size = function (t) {
            if (!arguments.length) return [i, o];
            var e = +t[0], n = +t[1];
            return e >= 0 && n >= 0 || u("invalid size"), i = e, o = n, s
        }, s.cellSize = function (t) {
            return arguments.length ? ((t = +t) >= 1 || u("invalid cell size"), a = Math.floor(Math.log(t) / Math.LN2), s) : 1 << a
        }, s.bandwidth = function (t) {
            return arguments.length ? (1 === (t = $(t)).length && (t = [+t[0], +t[0]]), 2 !== t.length && u("invalid bandwidth"), r = t, s) : r
        }, s
    }

    function jM(t, e, n, r, i) {
        const o = 1 + (i << 1);
        for (let a = 0; a < e; ++a) for (let e = 0, u = 0; e < t + i; ++e) e < t && (u += n[e + a * t]), e >= i && (e >= o && (u -= n[e - o + a * t]), r[e - i + a * t] = u / Math.min(e + 1, t - 1 + o - e, o))
    }

    function IM(t, e, n, r, i) {
        const o = 1 + (i << 1);
        for (let a = 0; a < t; ++a) for (let u = 0, s = 0; u < e + i; ++u) u < e && (s += n[a + u * t]), u >= i && (u >= o && (s -= n[a + (u - o) * t]), r[a + (u - i) * t] = s / Math.min(u + 1, e - 1 + o - u, o))
    }

    function $M(t) {
        pa.call(this, null, t)
    }

    RM.Definition = {
        type: "Isocontour",
        metadata: {generates: !0},
        params: [{name: "field", type: "field"}, {name: "thresholds", type: "number", array: !0}, {
            name: "levels",
            type: "number"
        }, {name: "nice", type: "boolean", default: !1}, {
            name: "resolve",
            type: "enum",
            values: ["shared", "independent"],
            default: "independent"
        }, {name: "zero", type: "boolean", default: !0}, {name: "smooth", type: "boolean", default: !0}, {
            name: "scale",
            type: "number",
            expr: !0
        }, {name: "translate", type: "number", array: !0, expr: !0}, {
            name: "as",
            type: "string",
            null: !0,
            default: "contour"
        }]
    }, ut(RM, pa, {
        transform(t, e) {
            if (this.value && !e.changed() && !t.modified()) return e.StopPropagation;
            var n = e.fork(e.NO_SOURCE | e.NO_FIELDS), r = e.materialize(e.SOURCE).source, i = t.field || f,
                o = BM().smooth(!1 !== t.smooth), a = t.thresholds || function (t, e, n) {
                    const r = OM(n.levels || 10, n.nice, !1 !== n.zero);
                    return "shared" !== n.resolve ? r : r(t.map((t => Ce(e(t).values))))
                }(r, i, t), u = null === t.as ? null : t.as || "contour", s = [];
            return r.forEach((e => {
                const n = i(e), r = o.size([n.width, n.height])(n.values, v(a) ? a : a(n.values));
                !function (t, e, n, r) {
                    let i = r.scale || e.scale, o = r.translate || e.translate;
                    H(i) && (i = i(n, r));
                    H(o) && (o = o(n, r));
                    if ((1 === i || null == i) && !o) return;
                    const a = (ht(i) ? i : i[0]) || 1, u = (ht(i) ? i : i[1]) || 1, s = o && o[0] || 0,
                        l = o && o[1] || 0;
                    t.forEach(LM(e, a, u, s, l))
                }(r, n, e, t), r.forEach((t => {
                    s.push(qo(e, Lo(null != u ? {[u]: t} : t)))
                }))
            })), this.value && (n.rem = this.value), this.value = n.source = n.add = s, n
        }
    }), $M.Definition = {
        type: "KDE2D",
        metadata: {generates: !0},
        params: [{name: "size", type: "number", array: !0, length: 2, required: !0}, {
            name: "x",
            type: "field",
            required: !0
        }, {name: "y", type: "field", required: !0}, {name: "weight", type: "field"}, {
            name: "groupby",
            type: "field",
            array: !0
        }, {name: "cellSize", type: "number"}, {
            name: "bandwidth",
            type: "number",
            array: !0,
            length: 2
        }, {name: "counts", type: "boolean", default: !1}, {name: "as", type: "string", default: "grid"}]
    };
    const WM = ["x", "y", "weight", "size", "cellSize", "bandwidth"];

    function HM(t, e) {
        return WM.forEach((n => null != e[n] ? t[n](e[n]) : 0)), t
    }

    function YM(t) {
        pa.call(this, null, t)
    }

    ut($M, pa, {
        transform(t, e) {
            if (this.value && !e.changed() && !t.modified()) return e.StopPropagation;
            var r, i = e.fork(e.NO_SOURCE | e.NO_FIELDS), o = function (t, e) {
                    var n, r, i, o, a, u, s = [], l = t => t(o);
                    if (null == e) s.push(t); else for (n = {}, r = 0, i = t.length; r < i; ++r) o = t[r], (u = n[a = e.map(l)]) || (n[a] = u = [], u.dims = a, s.push(u)), u.push(o);
                    return s
                }(e.materialize(e.SOURCE).source, t.groupby), a = (t.groupby || []).map(n), u = HM(PM(), t),
                s = t.as || "grid";
            return r = o.map((e => Lo(function (t, e) {
                for (let n = 0; n < a.length; ++n) t[a[n]] = e[n];
                return t
            }({[s]: u(e, t.counts)}, e.dims)))), this.value && (i.rem = this.value), this.value = i.source = i.add = r, i
        }
    }), YM.Definition = {
        type: "Contour",
        metadata: {generates: !0},
        params: [{name: "size", type: "number", array: !0, length: 2, required: !0}, {
            name: "values",
            type: "number",
            array: !0
        }, {name: "x", type: "field"}, {name: "y", type: "field"}, {name: "weight", type: "field"}, {
            name: "cellSize",
            type: "number"
        }, {name: "bandwidth", type: "number"}, {name: "count", type: "number"}, {
            name: "nice",
            type: "boolean",
            default: !1
        }, {name: "thresholds", type: "number", array: !0}, {name: "smooth", type: "boolean", default: !0}]
    }, ut(YM, pa, {
        transform(t, e) {
            if (this.value && !e.changed() && !t.modified()) return e.StopPropagation;
            var n, r, i = e.fork(e.NO_SOURCE | e.NO_FIELDS), o = BM().smooth(!1 !== t.smooth), a = t.values,
                u = t.thresholds || OM(t.count || 10, t.nice, !!a), s = t.size;
            return a || (a = e.materialize(e.SOURCE).source, r = LM(n = HM(PM(), t)(a, !0), n.scale || 1, n.scale || 1, 0, 0), s = [n.width, n.height], a = n.values), u = v(u) ? u : u(a), a = o.size(s)(a, u), r && a.forEach(r), this.value && (i.rem = this.value), this.value = i.source = i.add = (a || []).map(Lo), i
        }
    });
    const VM = "Feature", GM = "FeatureCollection";

    function XM(t) {
        pa.call(this, null, t)
    }

    function JM(t) {
        pa.call(this, null, t)
    }

    function ZM(t) {
        pa.call(this, null, t)
    }

    function QM(t) {
        pa.call(this, null, t)
    }

    function KM(t) {
        pa.call(this, [], t), this.generator = function () {
            var t, e, n, r, i, o, a, u, s, l, c, f, h = 10, d = h, p = 90, g = 360, m = 2.5;

            function y() {
                return {type: "MultiLineString", coordinates: v()}
            }

            function v() {
                return Re(Sx(r / p) * p, n, p).map(c).concat(Re(Sx(u / g) * g, a, g).map(f)).concat(Re(Sx(e / h) * h, t, h).filter((function (t) {
                    return Ex(t % p) > vx
                })).map(s)).concat(Re(Sx(o / d) * d, i, d).filter((function (t) {
                    return Ex(t % g) > vx
                })).map(l))
            }

            return y.lines = function () {
                return v().map((function (t) {
                    return {type: "LineString", coordinates: t}
                }))
            }, y.outline = function () {
                return {
                    type: "Polygon",
                    coordinates: [c(r).concat(f(a).slice(1), c(n).reverse().slice(1), f(u).reverse().slice(1))]
                }
            }, y.extent = function (t) {
                return arguments.length ? y.extentMajor(t).extentMinor(t) : y.extentMinor()
            }, y.extentMajor = function (t) {
                return arguments.length ? (r = +t[0][0], n = +t[1][0], u = +t[0][1], a = +t[1][1], r > n && (t = r, r = n, n = t), u > a && (t = u, u = a, a = t), y.precision(m)) : [[r, u], [n, a]]
            }, y.extentMinor = function (n) {
                return arguments.length ? (e = +n[0][0], t = +n[1][0], o = +n[0][1], i = +n[1][1], e > t && (n = e, e = t, t = n), o > i && (n = o, o = i, i = n), y.precision(m)) : [[e, o], [t, i]]
            }, y.step = function (t) {
                return arguments.length ? y.stepMajor(t).stepMinor(t) : y.stepMinor()
            }, y.stepMajor = function (t) {
                return arguments.length ? (p = +t[0], g = +t[1], y) : [p, g]
            }, y.stepMinor = function (t) {
                return arguments.length ? (h = +t[0], d = +t[1], y) : [h, d]
            }, y.precision = function (h) {
                return arguments.length ? (m = +h, s = Fw(o, i, 90), l = Sw(e, t, m), c = Fw(u, a, 90), f = Sw(r, n, m), y) : m
            }, y.extentMajor([[-180, -89.999999], [180, 89.999999]]).extentMinor([[-180, -80.000001], [180, 80.000001]])
        }()
    }

    function tA(t) {
        pa.call(this, null, t)
    }

    function eA(t) {
        if (!H(t)) return !1;
        const e = Dt(r(t));
        return e.$x || e.$y || e.$value || e.$max
    }

    function nA(t) {
        pa.call(this, null, t), this.modified(!0)
    }

    function rA(t, e, n) {
        H(t[e]) && t[e](n)
    }

    XM.Definition = {
        type: "GeoJSON",
        metadata: {},
        params: [{name: "fields", type: "field", array: !0, length: 2}, {name: "geojson", type: "field"}]
    }, ut(XM, pa, {
        transform(t, e) {
            var n, i = this._features, o = this._points, a = t.fields, u = a && a[0], s = a && a[1],
                l = t.geojson || !a && f, c = e.ADD;
            n = t.modified() || e.changed(e.REM) || e.modified(r(l)) || u && e.modified(r(u)) || s && e.modified(r(s)), this.value && !n || (c = e.SOURCE, this._features = i = [], this._points = o = []), l && e.visit(c, (t => i.push(l(t)))), u && s && (e.visit(c, (t => {
                var e = u(t), n = s(t);
                null != e && null != n && (e = +e) === e && (n = +n) === n && o.push([e, n])
            })), i = i.concat({type: VM, geometry: {type: "MultiPoint", coordinates: o}})), this.value = {
                type: GM,
                features: i
            }
        }
    }), JM.Definition = {
        type: "GeoPath",
        metadata: {modifies: !0},
        params: [{name: "projection", type: "projection"}, {name: "field", type: "field"}, {
            name: "pointRadius",
            type: "number",
            expr: !0
        }, {name: "as", type: "string", default: "path"}]
    }, ut(JM, pa, {
        transform(t, e) {
            var n = e.fork(e.ALL), r = this.value, i = t.field || f, o = t.as || "path", a = n.SOURCE;
            !r || t.modified() ? (this.value = r = DM(t.projection), n.materialize().reflow()) : a = i === f || e.modified(i.fields) ? n.ADD_MOD : n.ADD;
            const u = function (t, e) {
                const n = t.pointRadius();
                t.context(null), null != e && t.pointRadius(e);
                return n
            }(r, t.pointRadius);
            return n.visit(a, (t => t[o] = r(i(t)))), r.pointRadius(u), n.modifies(o)
        }
    }), ZM.Definition = {
        type: "GeoPoint",
        metadata: {modifies: !0},
        params: [{name: "projection", type: "projection", required: !0}, {
            name: "fields",
            type: "field",
            array: !0,
            required: !0,
            length: 2
        }, {name: "as", type: "string", array: !0, length: 2, default: ["x", "y"]}]
    }, ut(ZM, pa, {
        transform(t, e) {
            var n, r = t.projection, i = t.fields[0], o = t.fields[1], a = t.as || ["x", "y"], u = a[0], s = a[1];

            function l(t) {
                const e = r([i(t), o(t)]);
                e ? (t[u] = e[0], t[s] = e[1]) : (t[u] = void 0, t[s] = void 0)
            }

            return t.modified() ? e = e.materialize().reflow(!0).visit(e.SOURCE, l) : (n = e.modified(i.fields) || e.modified(o.fields), e.visit(n ? e.ADD_MOD : e.ADD, l)), e.modifies(a)
        }
    }), QM.Definition = {
        type: "GeoShape",
        metadata: {modifies: !0, nomod: !0},
        params: [{name: "projection", type: "projection"}, {
            name: "field",
            type: "field",
            default: "datum"
        }, {name: "pointRadius", type: "number", expr: !0}, {name: "as", type: "string", default: "shape"}]
    }, ut(QM, pa, {
        transform(t, e) {
            var n = e.fork(e.ALL), r = this.value, i = t.as || "shape", o = n.ADD;
            return r && !t.modified() || (this.value = r = function (t, e, n) {
                const r = null == n ? n => t(e(n)) : r => {
                    var i = t.pointRadius(), o = t.pointRadius(n)(e(r));
                    return t.pointRadius(i), o
                };
                return r.context = e => (t.context(e), r), r
            }(DM(t.projection), t.field || l("datum"), t.pointRadius), n.materialize().reflow(), o = n.SOURCE), n.visit(o, (t => t[i] = r)), n.modifies(i)
        }
    }), KM.Definition = {
        type: "Graticule",
        metadata: {changes: !0, generates: !0},
        params: [{
            name: "extent",
            type: "array",
            array: !0,
            length: 2,
            content: {type: "number", array: !0, length: 2}
        }, {
            name: "extentMajor",
            type: "array",
            array: !0,
            length: 2,
            content: {type: "number", array: !0, length: 2}
        }, {
            name: "extentMinor",
            type: "array",
            array: !0,
            length: 2,
            content: {type: "number", array: !0, length: 2}
        }, {name: "step", type: "number", array: !0, length: 2}, {
            name: "stepMajor",
            type: "number",
            array: !0,
            length: 2,
            default: [90, 360]
        }, {name: "stepMinor", type: "number", array: !0, length: 2, default: [10, 10]}, {
            name: "precision",
            type: "number",
            default: 2.5
        }]
    }, ut(KM, pa, {
        transform(t, e) {
            var n, r = this.value, i = this.generator;
            if (!r.length || t.modified()) for (const e in t) H(i[e]) && i[e](t[e]);
            return n = i(), r.length ? e.mod.push(Po(r[0], n)) : e.add.push(Lo(n)), r[0] = n, e
        }
    }), tA.Definition = {
        type: "heatmap",
        metadata: {modifies: !0},
        params: [{name: "field", type: "field"}, {name: "color", type: "string", expr: !0}, {
            name: "opacity",
            type: "number",
            expr: !0
        }, {name: "resolve", type: "enum", values: ["shared", "independent"], default: "independent"}, {
            name: "as",
            type: "string",
            default: "image"
        }]
    }, ut(tA, pa, {
        transform(t, e) {
            if (!e.changed() && !t.modified()) return e.StopPropagation;
            var n = e.materialize(e.SOURCE).source, r = "shared" === t.resolve, i = t.field || f, o = function (t, e) {
                    let n;
                    H(t) ? (n = n => t(n, e), n.dep = eA(t)) : t ? n = Z(t) : (n = t => t.$value / t.$max || 0, n.dep = !0);
                    return n
                }(t.opacity, t), a = function (t, e) {
                    let n;
                    H(t) ? (n = n => wc(t(n, e)), n.dep = eA(t)) : n = Z(wc(t || "#888"));
                    return n
                }(t.color, t), u = t.as || "image",
                s = {$x: 0, $y: 0, $value: 0, $max: r ? Ce(n.map((t => Ce(i(t).values)))) : 0};
            return n.forEach((t => {
                const e = i(t), n = K({}, t, s);
                r || (n.$max = Ce(e.values || [])), t[u] = function (t, e, n, r) {
                    const i = t.width, o = t.height, a = t.x1 || 0, u = t.y1 || 0, s = t.x2 || i, l = t.y2 || o,
                        c = t.values, f = c ? t => c[t] : h, d = Gl(s - a, l - u), p = d.getContext("2d"),
                        g = p.getImageData(0, 0, s - a, l - u), m = g.data;
                    for (let t = u, o = 0; t < l; ++t) {
                        e.$y = t - u;
                        for (let u = a, l = t * i; u < s; ++u, o += 4) {
                            e.$x = u - a, e.$value = f(u + l);
                            const t = n(e);
                            m[o + 0] = t.r, m[o + 1] = t.g, m[o + 2] = t.b, m[o + 3] = ~~(255 * r(e))
                        }
                    }
                    return p.putImageData(g, 0, 0), d
                }(e, n, a.dep ? a : Z(a(n)), o.dep ? o : Z(o(n)))
            })), e.reflow(!0).modifies(u)
        }
    }), ut(nA, pa, {
        transform(t, e) {
            let n = this.value;
            return !n || t.modified("type") ? (this.value = n = function (t) {
                const e = EM((t || "mercator").toLowerCase());
                e || u("Unrecognized projection type: " + t);
                return e()
            }(t.type), MM.forEach((e => {
                null != t[e] && rA(n, e, t[e])
            }))) : MM.forEach((e => {
                t.modified(e) && rA(n, e, t[e])
            })), null != t.pointRadius && n.path.pointRadius(t.pointRadius), t.fit && function (t, e) {
                const n = function (t) {
                    return 1 === (t = $(t)).length ? t[0] : {
                        type: GM,
                        features: t.reduce(((t, e) => t.concat(function (t) {
                            return t.type === GM ? t.features : $(t).filter((t => null != t)).map((t => t.type === VM ? t : {
                                type: VM,
                                geometry: t
                            }))
                        }(e))), [])
                    }
                }(e.fit);
                e.extent ? t.fitExtent(e.extent, n) : e.size && t.fitSize(e.size, n)
            }(n, t), e.fork(e.NO_SOURCE | e.NO_FIELDS)
        }
    });
    var iA = Object.freeze({
        __proto__: null,
        contour: YM,
        geojson: XM,
        geopath: JM,
        geopoint: ZM,
        geoshape: QM,
        graticule: KM,
        heatmap: tA,
        isocontour: RM,
        kde2d: $M,
        projection: nA
    });

    function oA(t, e, n, r) {
        if (isNaN(e) || isNaN(n)) return t;
        var i, o, a, u, s, l, c, f, h, d = t._root, p = {data: r}, g = t._x0, m = t._y0, y = t._x1, v = t._y1;
        if (!d) return t._root = p, t;
        for (; d.length;) if ((l = e >= (o = (g + y) / 2)) ? g = o : y = o, (c = n >= (a = (m + v) / 2)) ? m = a : v = a, i = d, !(d = d[f = c << 1 | l])) return i[f] = p, t;
        if (u = +t._x.call(null, d.data), s = +t._y.call(null, d.data), e === u && n === s) return p.next = d, i ? i[f] = p : t._root = p, t;
        do {
            i = i ? i[f] = new Array(4) : t._root = new Array(4), (l = e >= (o = (g + y) / 2)) ? g = o : y = o, (c = n >= (a = (m + v) / 2)) ? m = a : v = a
        } while ((f = c << 1 | l) == (h = (s >= a) << 1 | u >= o));
        return i[h] = d, i[f] = p, t
    }

    function aA(t, e, n, r, i) {
        this.node = t, this.x0 = e, this.y0 = n, this.x1 = r, this.y1 = i
    }

    function uA(t) {
        return t[0]
    }

    function sA(t) {
        return t[1]
    }

    function lA(t, e, n) {
        var r = new cA(null == e ? uA : e, null == n ? sA : n, NaN, NaN, NaN, NaN);
        return null == t ? r : r.addAll(t)
    }

    function cA(t, e, n, r, i, o) {
        this._x = t, this._y = e, this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = o, this._root = void 0
    }

    function fA(t) {
        for (var e = {data: t.data}, n = e; t = t.next;) n = n.next = {data: t.data};
        return e
    }

    var hA = lA.prototype = cA.prototype;

    function dA(t) {
        return function () {
            return t
        }
    }

    function pA(t) {
        return 1e-6 * (t() - .5)
    }

    function gA(t) {
        return t.x + t.vx
    }

    function mA(t) {
        return t.y + t.vy
    }

    function yA(t) {
        return t.index
    }

    function vA(t, e) {
        var n = t.get(e);
        if (!n) throw new Error("node not found: " + e);
        return n
    }

    hA.copy = function () {
        var t, e, n = new cA(this._x, this._y, this._x0, this._y0, this._x1, this._y1), r = this._root;
        if (!r) return n;
        if (!r.length) return n._root = fA(r), n;
        for (t = [{
            source: r,
            target: n._root = new Array(4)
        }]; r = t.pop();) for (var i = 0; i < 4; ++i) (e = r.source[i]) && (e.length ? t.push({
            source: e,
            target: r.target[i] = new Array(4)
        }) : r.target[i] = fA(e));
        return n
    }, hA.add = function (t) {
        const e = +this._x.call(null, t), n = +this._y.call(null, t);
        return oA(this.cover(e, n), e, n, t)
    }, hA.addAll = function (t) {
        var e, n, r, i, o = t.length, a = new Array(o), u = new Array(o), s = 1 / 0, l = 1 / 0, c = -1 / 0, f = -1 / 0;
        for (n = 0; n < o; ++n) isNaN(r = +this._x.call(null, e = t[n])) || isNaN(i = +this._y.call(null, e)) || (a[n] = r, u[n] = i, r < s && (s = r), r > c && (c = r), i < l && (l = i), i > f && (f = i));
        if (s > c || l > f) return this;
        for (this.cover(s, l).cover(c, f), n = 0; n < o; ++n) oA(this, a[n], u[n], t[n]);
        return this
    }, hA.cover = function (t, e) {
        if (isNaN(t = +t) || isNaN(e = +e)) return this;
        var n = this._x0, r = this._y0, i = this._x1, o = this._y1;
        if (isNaN(n)) i = (n = Math.floor(t)) + 1, o = (r = Math.floor(e)) + 1; else {
            for (var a, u, s = i - n || 1, l = this._root; n > t || t >= i || r > e || e >= o;) switch (u = (e < r) << 1 | t < n, (a = new Array(4))[u] = l, l = a, s *= 2, u) {
                case 0:
                    i = n + s, o = r + s;
                    break;
                case 1:
                    n = i - s, o = r + s;
                    break;
                case 2:
                    i = n + s, r = o - s;
                    break;
                case 3:
                    n = i - s, r = o - s
            }
            this._root && this._root.length && (this._root = l)
        }
        return this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = o, this
    }, hA.data = function () {
        var t = [];
        return this.visit((function (e) {
            if (!e.length) do {
                t.push(e.data)
            } while (e = e.next)
        })), t
    }, hA.extent = function (t) {
        return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]]
    }, hA.find = function (t, e, n) {
        var r, i, o, a, u, s, l, c = this._x0, f = this._y0, h = this._x1, d = this._y1, p = [], g = this._root;
        for (g && p.push(new aA(g, c, f, h, d)), null == n ? n = 1 / 0 : (c = t - n, f = e - n, h = t + n, d = e + n, n *= n); s = p.pop();) if (!(!(g = s.node) || (i = s.x0) > h || (o = s.y0) > d || (a = s.x1) < c || (u = s.y1) < f)) if (g.length) {
            var m = (i + a) / 2, y = (o + u) / 2;
            p.push(new aA(g[3], m, y, a, u), new aA(g[2], i, y, m, u), new aA(g[1], m, o, a, y), new aA(g[0], i, o, m, y)), (l = (e >= y) << 1 | t >= m) && (s = p[p.length - 1], p[p.length - 1] = p[p.length - 1 - l], p[p.length - 1 - l] = s)
        } else {
            var v = t - +this._x.call(null, g.data), _ = e - +this._y.call(null, g.data), x = v * v + _ * _;
            if (x < n) {
                var b = Math.sqrt(n = x);
                c = t - b, f = e - b, h = t + b, d = e + b, r = g.data
            }
        }
        return r
    }, hA.remove = function (t) {
        if (isNaN(o = +this._x.call(null, t)) || isNaN(a = +this._y.call(null, t))) return this;
        var e, n, r, i, o, a, u, s, l, c, f, h, d = this._root, p = this._x0, g = this._y0, m = this._x1, y = this._y1;
        if (!d) return this;
        if (d.length) for (; ;) {
            if ((l = o >= (u = (p + m) / 2)) ? p = u : m = u, (c = a >= (s = (g + y) / 2)) ? g = s : y = s, e = d, !(d = d[f = c << 1 | l])) return this;
            if (!d.length) break;
            (e[f + 1 & 3] || e[f + 2 & 3] || e[f + 3 & 3]) && (n = e, h = f)
        }
        for (; d.data !== t;) if (r = d, !(d = d.next)) return this;
        return (i = d.next) && delete d.next, r ? (i ? r.next = i : delete r.next, this) : e ? (i ? e[f] = i : delete e[f], (d = e[0] || e[1] || e[2] || e[3]) && d === (e[3] || e[2] || e[1] || e[0]) && !d.length && (n ? n[h] = d : this._root = d), this) : (this._root = i, this)
    }, hA.removeAll = function (t) {
        for (var e = 0, n = t.length; e < n; ++e) this.remove(t[e]);
        return this
    }, hA.root = function () {
        return this._root
    }, hA.size = function () {
        var t = 0;
        return this.visit((function (e) {
            if (!e.length) do {
                ++t
            } while (e = e.next)
        })), t
    }, hA.visit = function (t) {
        var e, n, r, i, o, a, u = [], s = this._root;
        for (s && u.push(new aA(s, this._x0, this._y0, this._x1, this._y1)); e = u.pop();) if (!t(s = e.node, r = e.x0, i = e.y0, o = e.x1, a = e.y1) && s.length) {
            var l = (r + o) / 2, c = (i + a) / 2;
            (n = s[3]) && u.push(new aA(n, l, c, o, a)), (n = s[2]) && u.push(new aA(n, r, c, l, a)), (n = s[1]) && u.push(new aA(n, l, i, o, c)), (n = s[0]) && u.push(new aA(n, r, i, l, c))
        }
        return this
    }, hA.visitAfter = function (t) {
        var e, n = [], r = [];
        for (this._root && n.push(new aA(this._root, this._x0, this._y0, this._x1, this._y1)); e = n.pop();) {
            var i = e.node;
            if (i.length) {
                var o, a = e.x0, u = e.y0, s = e.x1, l = e.y1, c = (a + s) / 2, f = (u + l) / 2;
                (o = i[0]) && n.push(new aA(o, a, u, c, f)), (o = i[1]) && n.push(new aA(o, c, u, s, f)), (o = i[2]) && n.push(new aA(o, a, f, c, l)), (o = i[3]) && n.push(new aA(o, c, f, s, l))
            }
            r.push(e)
        }
        for (; e = r.pop();) t(e.node, e.x0, e.y0, e.x1, e.y1);
        return this
    }, hA.x = function (t) {
        return arguments.length ? (this._x = t, this) : this._x
    }, hA.y = function (t) {
        return arguments.length ? (this._y = t, this) : this._y
    };
    var _A = {
        value: () => {
        }
    };

    function xA() {
        for (var t, e = 0, n = arguments.length, r = {}; e < n; ++e) {
            if (!(t = arguments[e] + "") || t in r || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
            r[t] = []
        }
        return new bA(r)
    }

    function bA(t) {
        this._ = t
    }

    function wA(t, e) {
        return t.trim().split(/^|\s+/).map((function (t) {
            var n = "", r = t.indexOf(".");
            if (r >= 0 && (n = t.slice(r + 1), t = t.slice(0, r)), t && !e.hasOwnProperty(t)) throw new Error("unknown type: " + t);
            return {type: t, name: n}
        }))
    }

    function kA(t, e) {
        for (var n, r = 0, i = t.length; r < i; ++r) if ((n = t[r]).name === e) return n.value
    }

    function MA(t, e, n) {
        for (var r = 0, i = t.length; r < i; ++r) if (t[r].name === e) {
            t[r] = _A, t = t.slice(0, r).concat(t.slice(r + 1));
            break
        }
        return null != n && t.push({name: e, value: n}), t
    }

    bA.prototype = xA.prototype = {
        constructor: bA, on: function (t, e) {
            var n, r = this._, i = wA(t + "", r), o = -1, a = i.length;
            if (!(arguments.length < 2)) {
                if (null != e && "function" != typeof e) throw new Error("invalid callback: " + e);
                for (; ++o < a;) if (n = (t = i[o]).type) r[n] = MA(r[n], t.name, e); else if (null == e) for (n in r) r[n] = MA(r[n], t.name, null);
                return this
            }
            for (; ++o < a;) if ((n = (t = i[o]).type) && (n = kA(r[n], t.name))) return n
        }, copy: function () {
            var t = {}, e = this._;
            for (var n in e) t[n] = e[n].slice();
            return new bA(t)
        }, call: function (t, e) {
            if ((n = arguments.length - 2) > 0) for (var n, r, i = new Array(n), o = 0; o < n; ++o) i[o] = arguments[o + 2];
            if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
            for (o = 0, n = (r = this._[t]).length; o < n; ++o) r[o].value.apply(e, i)
        }, apply: function (t, e, n) {
            if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
            for (var r = this._[t], i = 0, o = r.length; i < o; ++i) r[i].value.apply(e, n)
        }
    };
    var AA, EA, DA = 0, CA = 0, FA = 0, SA = 0, BA = 0, TA = 0,
        zA = "object" == typeof performance && performance.now ? performance : Date,
        NA = "object" == typeof window && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function (t) {
            setTimeout(t, 17)
        };

    function OA() {
        return BA || (NA(RA), BA = zA.now() + TA)
    }

    function RA() {
        BA = 0
    }

    function LA() {
        this._call = this._time = this._next = null
    }

    function UA(t, e, n) {
        var r = new LA;
        return r.restart(t, e, n), r
    }

    function qA() {
        BA = (SA = zA.now()) + TA, DA = CA = 0;
        try {
            !function () {
                OA(), ++DA;
                for (var t, e = AA; e;) (t = BA - e._time) >= 0 && e._call.call(null, t), e = e._next;
                --DA
            }()
        } finally {
            DA = 0, function () {
                var t, e, n = AA, r = 1 / 0;
                for (; n;) n._call ? (r > n._time && (r = n._time), t = n, n = n._next) : (e = n._next, n._next = null, n = t ? t._next = e : AA = e);
                EA = t, jA(r)
            }(), BA = 0
        }
    }

    function PA() {
        var t = zA.now(), e = t - SA;
        e > 1e3 && (TA -= e, SA = t)
    }

    function jA(t) {
        DA || (CA && (CA = clearTimeout(CA)), t - BA > 24 ? (t < 1 / 0 && (CA = setTimeout(qA, t - zA.now() - TA)), FA && (FA = clearInterval(FA))) : (FA || (SA = zA.now(), FA = setInterval(PA, 1e3)), DA = 1, NA(qA)))
    }

    LA.prototype = UA.prototype = {
        constructor: LA, restart: function (t, e, n) {
            if ("function" != typeof t) throw new TypeError("callback is not a function");
            n = (null == n ? OA() : +n) + (null == e ? 0 : +e), this._next || EA === this || (EA ? EA._next = this : AA = this, EA = this), this._call = t, this._time = n, jA()
        }, stop: function () {
            this._call && (this._call = null, this._time = 1 / 0, jA())
        }
    };
    const IA = 4294967296;

    function $A(t) {
        return t.x
    }

    function WA(t) {
        return t.y
    }

    var HA = Math.PI * (3 - Math.sqrt(5));

    function YA(t) {
        var e, n = 1, r = .001, i = 1 - Math.pow(r, 1 / 300), o = 0, a = .6, u = new Map, s = UA(f),
            l = xA("tick", "end"), c = function () {
                let t = 1;
                return () => (t = (1664525 * t + 1013904223) % IA) / IA
            }();

        function f() {
            h(), l.call("tick", e), n < r && (s.stop(), l.call("end", e))
        }

        function h(r) {
            var s, l, c = t.length;
            void 0 === r && (r = 1);
            for (var f = 0; f < r; ++f) for (n += (o - n) * i, u.forEach((function (t) {
                t(n)
            })), s = 0; s < c; ++s) null == (l = t[s]).fx ? l.x += l.vx *= a : (l.x = l.fx, l.vx = 0), null == l.fy ? l.y += l.vy *= a : (l.y = l.fy, l.vy = 0);
            return e
        }

        function d() {
            for (var e, n = 0, r = t.length; n < r; ++n) {
                if ((e = t[n]).index = n, null != e.fx && (e.x = e.fx), null != e.fy && (e.y = e.fy), isNaN(e.x) || isNaN(e.y)) {
                    var i = 10 * Math.sqrt(.5 + n), o = n * HA;
                    e.x = i * Math.cos(o), e.y = i * Math.sin(o)
                }
                (isNaN(e.vx) || isNaN(e.vy)) && (e.vx = e.vy = 0)
            }
        }

        function p(e) {
            return e.initialize && e.initialize(t, c), e
        }

        return null == t && (t = []), d(), e = {
            tick: h, restart: function () {
                return s.restart(f), e
            }, stop: function () {
                return s.stop(), e
            }, nodes: function (n) {
                return arguments.length ? (t = n, d(), u.forEach(p), e) : t
            }, alpha: function (t) {
                return arguments.length ? (n = +t, e) : n
            }, alphaMin: function (t) {
                return arguments.length ? (r = +t, e) : r
            }, alphaDecay: function (t) {
                return arguments.length ? (i = +t, e) : +i
            }, alphaTarget: function (t) {
                return arguments.length ? (o = +t, e) : o
            }, velocityDecay: function (t) {
                return arguments.length ? (a = 1 - t, e) : 1 - a
            }, randomSource: function (t) {
                return arguments.length ? (c = t, u.forEach(p), e) : c
            }, force: function (t, n) {
                return arguments.length > 1 ? (null == n ? u.delete(t) : u.set(t, p(n)), e) : u.get(t)
            }, find: function (e, n, r) {
                var i, o, a, u, s, l = 0, c = t.length;
                for (null == r ? r = 1 / 0 : r *= r, l = 0; l < c; ++l) (a = (i = e - (u = t[l]).x) * i + (o = n - u.y) * o) < r && (s = u, r = a);
                return s
            }, on: function (t, n) {
                return arguments.length > 1 ? (l.on(t, n), e) : l.on(t)
            }
        }
    }

    const VA = {
            center: function (t, e) {
                var n, r = 1;

                function i() {
                    var i, o, a = n.length, u = 0, s = 0;
                    for (i = 0; i < a; ++i) u += (o = n[i]).x, s += o.y;
                    for (u = (u / a - t) * r, s = (s / a - e) * r, i = 0; i < a; ++i) (o = n[i]).x -= u, o.y -= s
                }

                return null == t && (t = 0), null == e && (e = 0), i.initialize = function (t) {
                    n = t
                }, i.x = function (e) {
                    return arguments.length ? (t = +e, i) : t
                }, i.y = function (t) {
                    return arguments.length ? (e = +t, i) : e
                }, i.strength = function (t) {
                    return arguments.length ? (r = +t, i) : r
                }, i
            }, collide: function (t) {
                var e, n, r, i = 1, o = 1;

                function a() {
                    for (var t, a, s, l, c, f, h, d = e.length, p = 0; p < o; ++p) for (a = lA(e, gA, mA).visitAfter(u), t = 0; t < d; ++t) s = e[t], f = n[s.index], h = f * f, l = s.x + s.vx, c = s.y + s.vy, a.visit(g);

                    function g(t, e, n, o, a) {
                        var u = t.data, d = t.r, p = f + d;
                        if (!u) return e > l + p || o < l - p || n > c + p || a < c - p;
                        if (u.index > s.index) {
                            var g = l - u.x - u.vx, m = c - u.y - u.vy, y = g * g + m * m;
                            y < p * p && (0 === g && (y += (g = pA(r)) * g), 0 === m && (y += (m = pA(r)) * m), y = (p - (y = Math.sqrt(y))) / y * i, s.vx += (g *= y) * (p = (d *= d) / (h + d)), s.vy += (m *= y) * p, u.vx -= g * (p = 1 - p), u.vy -= m * p)
                        }
                    }
                }

                function u(t) {
                    if (t.data) return t.r = n[t.data.index];
                    for (var e = t.r = 0; e < 4; ++e) t[e] && t[e].r > t.r && (t.r = t[e].r)
                }

                function s() {
                    if (e) {
                        var r, i, o = e.length;
                        for (n = new Array(o), r = 0; r < o; ++r) i = e[r], n[i.index] = +t(i, r, e)
                    }
                }

                return "function" != typeof t && (t = dA(null == t ? 1 : +t)), a.initialize = function (t, n) {
                    e = t, r = n, s()
                }, a.iterations = function (t) {
                    return arguments.length ? (o = +t, a) : o
                }, a.strength = function (t) {
                    return arguments.length ? (i = +t, a) : i
                }, a.radius = function (e) {
                    return arguments.length ? (t = "function" == typeof e ? e : dA(+e), s(), a) : t
                }, a
            }, nbody: function () {
                var t, e, n, r, i, o = dA(-30), a = 1, u = 1 / 0, s = .81;

                function l(n) {
                    var i, o = t.length, a = lA(t, $A, WA).visitAfter(f);
                    for (r = n, i = 0; i < o; ++i) e = t[i], a.visit(h)
                }

                function c() {
                    if (t) {
                        var e, n, r = t.length;
                        for (i = new Array(r), e = 0; e < r; ++e) n = t[e], i[n.index] = +o(n, e, t)
                    }
                }

                function f(t) {
                    var e, n, r, o, a, u = 0, s = 0;
                    if (t.length) {
                        for (r = o = a = 0; a < 4; ++a) (e = t[a]) && (n = Math.abs(e.value)) && (u += e.value, s += n, r += n * e.x, o += n * e.y);
                        t.x = r / s, t.y = o / s
                    } else {
                        (e = t).x = e.data.x, e.y = e.data.y;
                        do {
                            u += i[e.data.index]
                        } while (e = e.next)
                    }
                    t.value = u
                }

                function h(t, o, l, c) {
                    if (!t.value) return !0;
                    var f = t.x - e.x, h = t.y - e.y, d = c - o, p = f * f + h * h;
                    if (d * d / s < p) return p < u && (0 === f && (p += (f = pA(n)) * f), 0 === h && (p += (h = pA(n)) * h), p < a && (p = Math.sqrt(a * p)), e.vx += f * t.value * r / p, e.vy += h * t.value * r / p), !0;
                    if (!(t.length || p >= u)) {
                        (t.data !== e || t.next) && (0 === f && (p += (f = pA(n)) * f), 0 === h && (p += (h = pA(n)) * h), p < a && (p = Math.sqrt(a * p)));
                        do {
                            t.data !== e && (d = i[t.data.index] * r / p, e.vx += f * d, e.vy += h * d)
                        } while (t = t.next)
                    }
                }

                return l.initialize = function (e, r) {
                    t = e, n = r, c()
                }, l.strength = function (t) {
                    return arguments.length ? (o = "function" == typeof t ? t : dA(+t), c(), l) : o
                }, l.distanceMin = function (t) {
                    return arguments.length ? (a = t * t, l) : Math.sqrt(a)
                }, l.distanceMax = function (t) {
                    return arguments.length ? (u = t * t, l) : Math.sqrt(u)
                }, l.theta = function (t) {
                    return arguments.length ? (s = t * t, l) : Math.sqrt(s)
                }, l
            }, link: function (t) {
                var e, n, r, i, o, a, u = yA, s = function (t) {
                    return 1 / Math.min(i[t.source.index], i[t.target.index])
                }, l = dA(30), c = 1;

                function f(r) {
                    for (var i = 0, u = t.length; i < c; ++i) for (var s, l, f, h, d, p, g, m = 0; m < u; ++m) l = (s = t[m]).source, h = (f = s.target).x + f.vx - l.x - l.vx || pA(a), d = f.y + f.vy - l.y - l.vy || pA(a), h *= p = ((p = Math.sqrt(h * h + d * d)) - n[m]) / p * r * e[m], d *= p, f.vx -= h * (g = o[m]), f.vy -= d * g, l.vx += h * (g = 1 - g), l.vy += d * g
                }

                function h() {
                    if (r) {
                        var a, s, l = r.length, c = t.length, f = new Map(r.map(((t, e) => [u(t, e, r), t])));
                        for (a = 0, i = new Array(l); a < c; ++a) (s = t[a]).index = a, "object" != typeof s.source && (s.source = vA(f, s.source)), "object" != typeof s.target && (s.target = vA(f, s.target)), i[s.source.index] = (i[s.source.index] || 0) + 1, i[s.target.index] = (i[s.target.index] || 0) + 1;
                        for (a = 0, o = new Array(c); a < c; ++a) s = t[a], o[a] = i[s.source.index] / (i[s.source.index] + i[s.target.index]);
                        e = new Array(c), d(), n = new Array(c), p()
                    }
                }

                function d() {
                    if (r) for (var n = 0, i = t.length; n < i; ++n) e[n] = +s(t[n], n, t)
                }

                function p() {
                    if (r) for (var e = 0, i = t.length; e < i; ++e) n[e] = +l(t[e], e, t)
                }

                return null == t && (t = []), f.initialize = function (t, e) {
                    r = t, a = e, h()
                }, f.links = function (e) {
                    return arguments.length ? (t = e, h(), f) : t
                }, f.id = function (t) {
                    return arguments.length ? (u = t, f) : u
                }, f.iterations = function (t) {
                    return arguments.length ? (c = +t, f) : c
                }, f.strength = function (t) {
                    return arguments.length ? (s = "function" == typeof t ? t : dA(+t), d(), f) : s
                }, f.distance = function (t) {
                    return arguments.length ? (l = "function" == typeof t ? t : dA(+t), p(), f) : l
                }, f
            }, x: function (t) {
                var e, n, r, i = dA(.1);

                function o(t) {
                    for (var i, o = 0, a = e.length; o < a; ++o) (i = e[o]).vx += (r[o] - i.x) * n[o] * t
                }

                function a() {
                    if (e) {
                        var o, a = e.length;
                        for (n = new Array(a), r = new Array(a), o = 0; o < a; ++o) n[o] = isNaN(r[o] = +t(e[o], o, e)) ? 0 : +i(e[o], o, e)
                    }
                }

                return "function" != typeof t && (t = dA(null == t ? 0 : +t)), o.initialize = function (t) {
                    e = t, a()
                }, o.strength = function (t) {
                    return arguments.length ? (i = "function" == typeof t ? t : dA(+t), a(), o) : i
                }, o.x = function (e) {
                    return arguments.length ? (t = "function" == typeof e ? e : dA(+e), a(), o) : t
                }, o
            }, y: function (t) {
                var e, n, r, i = dA(.1);

                function o(t) {
                    for (var i, o = 0, a = e.length; o < a; ++o) (i = e[o]).vy += (r[o] - i.y) * n[o] * t
                }

                function a() {
                    if (e) {
                        var o, a = e.length;
                        for (n = new Array(a), r = new Array(a), o = 0; o < a; ++o) n[o] = isNaN(r[o] = +t(e[o], o, e)) ? 0 : +i(e[o], o, e)
                    }
                }

                return "function" != typeof t && (t = dA(null == t ? 0 : +t)), o.initialize = function (t) {
                    e = t, a()
                }, o.strength = function (t) {
                    return arguments.length ? (i = "function" == typeof t ? t : dA(+t), a(), o) : i
                }, o.y = function (e) {
                    return arguments.length ? (t = "function" == typeof e ? e : dA(+e), a(), o) : t
                }, o
            }
        }, GA = "forces", XA = ["alpha", "alphaMin", "alphaTarget", "velocityDecay", "forces"],
        JA = ["static", "iterations"], ZA = ["x", "y", "vx", "vy"];

    function QA(t) {
        pa.call(this, null, t)
    }

    function KA(t, e, n, r) {
        var i, o, a, u, s = $(e.forces);
        for (i = 0, o = XA.length; i < o; ++i) (a = XA[i]) !== GA && e.modified(a) && t[a](e[a]);
        for (i = 0, o = s.length; i < o; ++i) u = GA + i, (a = n || e.modified(GA, i) ? eE(s[i]) : r && tE(s[i], r) ? t.force(u) : null) && t.force(u, a);
        for (o = t.numForces || 0; i < o; ++i) t.force(GA + i, null);
        return t.numForces = s.length, t
    }

    function tE(t, e) {
        var n, i;
        for (n in t) if (H(i = t[n]) && e.modified(r(i))) return 1;
        return 0
    }

    function eE(t) {
        var e, n;
        for (n in rt(VA, t.force) || u("Unrecognized force: " + t.force), e = VA[t.force](), t) H(e[n]) && nE(e[n], t[n], t);
        return e
    }

    function nE(t, e, n) {
        t(H(e) ? t => e(t, n) : e)
    }

    QA.Definition = {
        type: "Force",
        metadata: {modifies: !0},
        params: [{name: "static", type: "boolean", default: !1}, {
            name: "restart",
            type: "boolean",
            default: !1
        }, {name: "iterations", type: "number", default: 300}, {
            name: "alpha",
            type: "number",
            default: 1
        }, {name: "alphaMin", type: "number", default: .001}, {
            name: "alphaTarget",
            type: "number",
            default: 0
        }, {name: "velocityDecay", type: "number", default: .4}, {
            name: "forces",
            type: "param",
            array: !0,
            params: [{
                key: {force: "center"},
                params: [{name: "x", type: "number", default: 0}, {name: "y", type: "number", default: 0}]
            }, {
                key: {force: "collide"},
                params: [{name: "radius", type: "number", expr: !0}, {
                    name: "strength",
                    type: "number",
                    default: .7
                }, {name: "iterations", type: "number", default: 1}]
            }, {
                key: {force: "nbody"},
                params: [{name: "strength", type: "number", default: -30}, {
                    name: "theta",
                    type: "number",
                    default: .9
                }, {name: "distanceMin", type: "number", default: 1}, {name: "distanceMax", type: "number"}]
            }, {
                key: {force: "link"},
                params: [{name: "links", type: "data"}, {name: "id", type: "field"}, {
                    name: "distance",
                    type: "number",
                    default: 30,
                    expr: !0
                }, {name: "strength", type: "number", expr: !0}, {name: "iterations", type: "number", default: 1}]
            }, {
                key: {force: "x"},
                params: [{name: "strength", type: "number", default: .1}, {name: "x", type: "field"}]
            }, {
                key: {force: "y"},
                params: [{name: "strength", type: "number", default: .1}, {name: "y", type: "field"}]
            }]
        }, {name: "as", type: "string", array: !0, modify: !1, default: ZA}]
    }, ut(QA, pa, {
        transform(t, e) {
            var n, r, i = this.value, o = e.changed(e.ADD_REM), a = t.modified(XA), u = t.iterations || 300;
            if (i ? (o && (e.modifies("index"), i.nodes(e.source)), (a || e.changed(e.MOD)) && KA(i, t, 0, e)) : (this.value = i = function (t, e) {
                const n = YA(t), r = n.stop, i = n.restart;
                let o = !1;
                return n.stopped = () => o, n.restart = () => (o = !1, i()), n.stop = () => (o = !0, r()), KA(n, e, !0).on("end", (() => o = !0))
            }(e.source, t), i.on("tick", (n = e.dataflow, r = this, () => n.touch(r).run())), t.static || (o = !0, i.tick()), e.modifies("index")), a || o || t.modified(JA) || e.changed() && t.restart) if (i.alpha(Math.max(i.alpha(), t.alpha || 1)).alphaDecay(1 - Math.pow(i.alphaMin(), 1 / u)), t.static) for (i.stop(); --u >= 0;) i.tick(); else if (i.stopped() && i.restart(), !o) return e.StopPropagation;
            return this.finish(t, e)
        }, finish(t, e) {
            const n = e.dataflow;
            for (let t, e = this._argops, u = 0, s = e.length; u < s; ++u) if (t = e[u], t.name === GA && "link" === t.op._argval.force) for (var r, i = t.op._argops, o = 0, a = i.length; o < a; ++o) if ("links" === i[o].name && (r = i[o].op.source)) {
                n.pulse(r, n.changeset().reflow());
                break
            }
            return e.reflow(t.modified()).modifies(ZA)
        }
    });
    var rE = Object.freeze({__proto__: null, force: QA});

    function iE(t, e) {
        return t.parent === e.parent ? 1 : 2
    }

    function oE(t, e) {
        return t + e.x
    }

    function aE(t, e) {
        return Math.max(t, e.y)
    }

    function uE(t) {
        var e = 0, n = t.children, r = n && n.length;
        if (r) for (; --r >= 0;) e += n[r].value; else e = 1;
        t.value = e
    }

    function sE(t, e) {
        t instanceof Map ? (t = [void 0, t], void 0 === e && (e = cE)) : void 0 === e && (e = lE);
        for (var n, r, i, o, a, u = new dE(t), s = [u]; n = s.pop();) if ((i = e(n.data)) && (a = (i = Array.from(i)).length)) for (n.children = i, o = a - 1; o >= 0; --o) s.push(r = i[o] = new dE(i[o])), r.parent = n, r.depth = n.depth + 1;
        return u.eachBefore(hE)
    }

    function lE(t) {
        return t.children
    }

    function cE(t) {
        return Array.isArray(t) ? t[1] : null
    }

    function fE(t) {
        void 0 !== t.data.value && (t.value = t.data.value), t.data = t.data.data
    }

    function hE(t) {
        var e = 0;
        do {
            t.height = e
        } while ((t = t.parent) && t.height < ++e)
    }

    function dE(t) {
        this.data = t, this.depth = this.height = 0, this.parent = null
    }

    function pE(t) {
        for (var e, n, r = 0, i = (t = function (t) {
            for (var e, n, r = t.length; r;) n = Math.random() * r-- | 0, e = t[r], t[r] = t[n], t[n] = e;
            return t
        }(Array.from(t))).length, o = []; r < i;) e = t[r], n && yE(n, e) ? ++r : (n = _E(o = gE(o, e)), r = 0);
        return n
    }

    function gE(t, e) {
        var n, r;
        if (vE(e, t)) return [e];
        for (n = 0; n < t.length; ++n) if (mE(e, t[n]) && vE(xE(t[n], e), t)) return [t[n], e];
        for (n = 0; n < t.length - 1; ++n) for (r = n + 1; r < t.length; ++r) if (mE(xE(t[n], t[r]), e) && mE(xE(t[n], e), t[r]) && mE(xE(t[r], e), t[n]) && vE(bE(t[n], t[r], e), t)) return [t[n], t[r], e];
        throw new Error
    }

    function mE(t, e) {
        var n = t.r - e.r, r = e.x - t.x, i = e.y - t.y;
        return n < 0 || n * n < r * r + i * i
    }

    function yE(t, e) {
        var n = t.r - e.r + 1e-9 * Math.max(t.r, e.r, 1), r = e.x - t.x, i = e.y - t.y;
        return n > 0 && n * n > r * r + i * i
    }

    function vE(t, e) {
        for (var n = 0; n < e.length; ++n) if (!yE(t, e[n])) return !1;
        return !0
    }

    function _E(t) {
        switch (t.length) {
            case 1:
                return function (t) {
                    return {x: t.x, y: t.y, r: t.r}
                }(t[0]);
            case 2:
                return xE(t[0], t[1]);
            case 3:
                return bE(t[0], t[1], t[2])
        }
    }

    function xE(t, e) {
        var n = t.x, r = t.y, i = t.r, o = e.x, a = e.y, u = e.r, s = o - n, l = a - r, c = u - i,
            f = Math.sqrt(s * s + l * l);
        return {x: (n + o + s / f * c) / 2, y: (r + a + l / f * c) / 2, r: (f + i + u) / 2}
    }

    function bE(t, e, n) {
        var r = t.x, i = t.y, o = t.r, a = e.x, u = e.y, s = e.r, l = n.x, c = n.y, f = n.r, h = r - a, d = r - l,
            p = i - u, g = i - c, m = s - o, y = f - o, v = r * r + i * i - o * o, _ = v - a * a - u * u + s * s,
            x = v - l * l - c * c + f * f, b = d * p - h * g, w = (p * x - g * _) / (2 * b) - r,
            k = (g * m - p * y) / b, M = (d * _ - h * x) / (2 * b) - i, A = (h * y - d * m) / b, E = k * k + A * A - 1,
            D = 2 * (o + w * k + M * A), C = w * w + M * M - o * o,
            F = -(E ? (D + Math.sqrt(D * D - 4 * E * C)) / (2 * E) : C / D);
        return {x: r + w + k * F, y: i + M + A * F, r: F}
    }

    function wE(t, e, n) {
        var r, i, o, a, u = t.x - e.x, s = t.y - e.y, l = u * u + s * s;
        l ? (i = e.r + n.r, i *= i, a = t.r + n.r, i > (a *= a) ? (r = (l + a - i) / (2 * l), o = Math.sqrt(Math.max(0, a / l - r * r)), n.x = t.x - r * u - o * s, n.y = t.y - r * s + o * u) : (r = (l + i - a) / (2 * l), o = Math.sqrt(Math.max(0, i / l - r * r)), n.x = e.x + r * u - o * s, n.y = e.y + r * s + o * u)) : (n.x = e.x + n.r, n.y = e.y)
    }

    function kE(t, e) {
        var n = t.r + e.r - 1e-6, r = e.x - t.x, i = e.y - t.y;
        return n > 0 && n * n > r * r + i * i
    }

    function ME(t) {
        var e = t._, n = t.next._, r = e.r + n.r, i = (e.x * n.r + n.x * e.r) / r, o = (e.y * n.r + n.y * e.r) / r;
        return i * i + o * o
    }

    function AE(t) {
        this._ = t, this.next = null, this.previous = null
    }

    function EE(t) {
        if (!(i = (t = function (t) {
            return "object" == typeof t && "length" in t ? t : Array.from(t)
        }(t)).length)) return 0;
        var e, n, r, i, o, a, u, s, l, c, f;
        if ((e = t[0]).x = 0, e.y = 0, !(i > 1)) return e.r;
        if (n = t[1], e.x = -n.r, n.x = e.r, n.y = 0, !(i > 2)) return e.r + n.r;
        wE(n, e, r = t[2]), e = new AE(e), n = new AE(n), r = new AE(r), e.next = r.previous = n, n.next = e.previous = r, r.next = n.previous = e;
        t:for (u = 3; u < i; ++u) {
            wE(e._, n._, r = t[u]), r = new AE(r), s = n.next, l = e.previous, c = n._.r, f = e._.r;
            do {
                if (c <= f) {
                    if (kE(s._, r._)) {
                        n = s, e.next = n, n.previous = e, --u;
                        continue t
                    }
                    c += s._.r, s = s.next
                } else {
                    if (kE(l._, r._)) {
                        (e = l).next = n, n.previous = e, --u;
                        continue t
                    }
                    f += l._.r, l = l.previous
                }
            } while (s !== l.next);
            for (r.previous = e, r.next = n, e.next = n.previous = n = r, o = ME(e); (r = r.next) !== n;) (a = ME(r)) < o && (e = r, o = a);
            n = e.next
        }
        for (e = [n._], r = n; (r = r.next) !== n;) e.push(r._);
        for (r = pE(e), u = 0; u < i; ++u) (e = t[u]).x -= r.x, e.y -= r.y;
        return r.r
    }

    function DE(t) {
        return null == t ? null : CE(t)
    }

    function CE(t) {
        if ("function" != typeof t) throw new Error;
        return t
    }

    function FE() {
        return 0
    }

    function SE(t) {
        return function () {
            return t
        }
    }

    function BE(t) {
        return Math.sqrt(t.value)
    }

    function TE(t) {
        return function (e) {
            e.children || (e.r = Math.max(0, +t(e) || 0))
        }
    }

    function zE(t, e) {
        return function (n) {
            if (r = n.children) {
                var r, i, o, a = r.length, u = t(n) * e || 0;
                if (u) for (i = 0; i < a; ++i) r[i].r += u;
                if (o = EE(r), u) for (i = 0; i < a; ++i) r[i].r -= u;
                n.r = o + u
            }
        }
    }

    function NE(t) {
        return function (e) {
            var n = e.parent;
            e.r *= t, n && (e.x = n.x + t * e.x, e.y = n.y + t * e.y)
        }
    }

    function OE(t) {
        t.x0 = Math.round(t.x0), t.y0 = Math.round(t.y0), t.x1 = Math.round(t.x1), t.y1 = Math.round(t.y1)
    }

    function RE(t, e, n, r, i) {
        for (var o, a = t.children, u = -1, s = a.length, l = t.value && (r - e) / t.value; ++u < s;) (o = a[u]).y0 = n, o.y1 = i, o.x0 = e, o.x1 = e += o.value * l
    }

    dE.prototype = sE.prototype = {
        constructor: dE, count: function () {
            return this.eachAfter(uE)
        }, each: function (t, e) {
            let n = -1;
            for (const r of this) t.call(e, r, ++n, this);
            return this
        }, eachAfter: function (t, e) {
            for (var n, r, i, o = this, a = [o], u = [], s = -1; o = a.pop();) if (u.push(o), n = o.children) for (r = 0, i = n.length; r < i; ++r) a.push(n[r]);
            for (; o = u.pop();) t.call(e, o, ++s, this);
            return this
        }, eachBefore: function (t, e) {
            for (var n, r, i = this, o = [i], a = -1; i = o.pop();) if (t.call(e, i, ++a, this), n = i.children) for (r = n.length - 1; r >= 0; --r) o.push(n[r]);
            return this
        }, find: function (t, e) {
            let n = -1;
            for (const r of this) if (t.call(e, r, ++n, this)) return r
        }, sum: function (t) {
            return this.eachAfter((function (e) {
                for (var n = +t(e.data) || 0, r = e.children, i = r && r.length; --i >= 0;) n += r[i].value;
                e.value = n
            }))
        }, sort: function (t) {
            return this.eachBefore((function (e) {
                e.children && e.children.sort(t)
            }))
        }, path: function (t) {
            for (var e = this, n = function (t, e) {
                if (t === e) return t;
                var n = t.ancestors(), r = e.ancestors(), i = null;
                t = n.pop(), e = r.pop();
                for (; t === e;) i = t, t = n.pop(), e = r.pop();
                return i
            }(e, t), r = [e]; e !== n;) e = e.parent, r.push(e);
            for (var i = r.length; t !== n;) r.splice(i, 0, t), t = t.parent;
            return r
        }, ancestors: function () {
            for (var t = this, e = [t]; t = t.parent;) e.push(t);
            return e
        }, descendants: function () {
            return Array.from(this)
        }, leaves: function () {
            var t = [];
            return this.eachBefore((function (e) {
                e.children || t.push(e)
            })), t
        }, links: function () {
            var t = this, e = [];
            return t.each((function (n) {
                n !== t && e.push({source: n.parent, target: n})
            })), e
        }, copy: function () {
            return sE(this).eachBefore(fE)
        }, [Symbol.iterator]: function* () {
            var t, e, n, r, i = this, o = [i];
            do {
                for (t = o.reverse(), o = []; i = t.pop();) if (yield i, e = i.children) for (n = 0, r = e.length; n < r; ++n) o.push(e[n])
            } while (o.length)
        }
    };
    var LE = {depth: -1}, UE = {};

    function qE(t) {
        return t.id
    }

    function PE(t) {
        return t.parentId
    }

    function jE() {
        var t = qE, e = PE;

        function n(n) {
            var r, i, o, a, u, s, l, c = Array.from(n), f = c.length, h = new Map;
            for (i = 0; i < f; ++i) r = c[i], u = c[i] = new dE(r), null != (s = t(r, i, n)) && (s += "") && (l = u.id = s, h.set(l, h.has(l) ? UE : u)), null != (s = e(r, i, n)) && (s += "") && (u.parent = s);
            for (i = 0; i < f; ++i) if (s = (u = c[i]).parent) {
                if (!(a = h.get(s))) throw new Error("missing: " + s);
                if (a === UE) throw new Error("ambiguous: " + s);
                a.children ? a.children.push(u) : a.children = [u], u.parent = a
            } else {
                if (o) throw new Error("multiple roots");
                o = u
            }
            if (!o) throw new Error("no root");
            if (o.parent = LE, o.eachBefore((function (t) {
                t.depth = t.parent.depth + 1, --f
            })).eachBefore(hE), o.parent = null, f > 0) throw new Error("cycle");
            return o
        }

        return n.id = function (e) {
            return arguments.length ? (t = CE(e), n) : t
        }, n.parentId = function (t) {
            return arguments.length ? (e = CE(t), n) : e
        }, n
    }

    function IE(t, e) {
        return t.parent === e.parent ? 1 : 2
    }

    function $E(t) {
        var e = t.children;
        return e ? e[0] : t.t
    }

    function WE(t) {
        var e = t.children;
        return e ? e[e.length - 1] : t.t
    }

    function HE(t, e, n) {
        var r = n / (e.i - t.i);
        e.c -= r, e.s += n, t.c += r, e.z += n, e.m += n
    }

    function YE(t, e, n) {
        return t.a.parent === e.parent ? t.a : n
    }

    function VE(t, e) {
        this._ = t, this.parent = null, this.children = null, this.A = null, this.a = this, this.z = 0, this.m = 0, this.c = 0, this.s = 0, this.t = null, this.i = e
    }

    function GE(t, e, n, r, i) {
        for (var o, a = t.children, u = -1, s = a.length, l = t.value && (i - n) / t.value; ++u < s;) (o = a[u]).x0 = e, o.x1 = r, o.y0 = n, o.y1 = n += o.value * l
    }

    VE.prototype = Object.create(dE.prototype);
    var XE = (1 + Math.sqrt(5)) / 2;

    function JE(t, e, n, r, i, o) {
        for (var a, u, s, l, c, f, h, d, p, g, m, y = [], v = e.children, _ = 0, x = 0, b = v.length, w = e.value; _ < b;) {
            s = i - n, l = o - r;
            do {
                c = v[x++].value
            } while (!c && x < b);
            for (f = h = c, m = c * c * (g = Math.max(l / s, s / l) / (w * t)), p = Math.max(h / m, m / f); x < b; ++x) {
                if (c += u = v[x].value, u < f && (f = u), u > h && (h = u), m = c * c * g, (d = Math.max(h / m, m / f)) > p) {
                    c -= u;
                    break
                }
                p = d
            }
            y.push(a = {
                value: c,
                dice: s < l,
                children: v.slice(_, x)
            }), a.dice ? RE(a, n, r, i, w ? r += l * c / w : o) : GE(a, n, r, w ? n += s * c / w : i, o), w -= c, _ = x
        }
        return y
    }

    var ZE = function t(e) {
        function n(t, n, r, i, o) {
            JE(e, t, n, r, i, o)
        }

        return n.ratio = function (e) {
            return t((e = +e) > 1 ? e : 1)
        }, n
    }(XE);
    var QE = function t(e) {
        function n(t, n, r, i, o) {
            if ((a = t._squarify) && a.ratio === e) for (var a, u, s, l, c, f = -1, h = a.length, d = t.value; ++f < h;) {
                for (s = (u = a[f]).children, l = u.value = 0, c = s.length; l < c; ++l) u.value += s[l].value;
                u.dice ? RE(u, n, r, i, d ? r += (o - r) * u.value / d : o) : GE(u, n, r, d ? n += (i - n) * u.value / d : i, o), d -= u.value
            } else t._squarify = a = JE(e, t, n, r, i, o), a.ratio = e
        }

        return n.ratio = function (e) {
            return t((e = +e) > 1 ? e : 1)
        }, n
    }(XE);

    function KE(t, e, n) {
        const r = {};
        return t.each((t => {
            const i = t.data;
            n(i) && (r[e(i)] = t)
        })), t.lookup = r, t
    }

    function tD(t) {
        pa.call(this, null, t)
    }

    tD.Definition = {
        type: "Nest",
        metadata: {treesource: !0, changes: !0},
        params: [{name: "keys", type: "field", array: !0}, {name: "generate", type: "boolean"}]
    };
    const eD = t => t.values;

    function nD() {
        const t = [], e = {entries: t => r(n(t, 0), 0), key: n => (t.push(n), e)};

        function n(e, r) {
            if (r >= t.length) return e;
            const i = e.length, o = t[r++], a = {}, u = {};
            let s, l, c, f = -1;
            for (; ++f < i;) s = o(l = e[f]) + "", (c = a[s]) ? c.push(l) : a[s] = [l];
            for (s in a) u[s] = n(a[s], r);
            return u
        }

        function r(e, n) {
            if (++n > t.length) return e;
            const i = [];
            for (const t in e) i.push({key: t, values: r(e[t], n)});
            return i
        }

        return e
    }

    function rD(t) {
        pa.call(this, null, t)
    }

    ut(tD, pa, {
        transform(t, e) {
            e.source || u("Nest transform requires an upstream data source.");
            var n = t.generate, r = t.modified(), i = e.clone(), o = this.value;
            return (!o || r || e.changed()) && (o && o.each((t => {
                t.children && No(t.data) && i.rem.push(t.data)
            })), this.value = o = sE({values: $(t.keys).reduce(((t, e) => (t.key(e), t)), nD()).entries(i.source)}, eD), n && o.each((t => {
                t.children && (t = Lo(t.data), i.add.push(t), i.source.push(t))
            })), KE(o, Oo, Oo)), i.source.root = o, i
        }
    });
    const iD = (t, e) => t.parent === e.parent ? 1 : 2;
    ut(rD, pa, {
        transform(t, e) {
            e.source && e.source.root || u(this.constructor.name + " transform requires a backing tree data source.");
            const n = this.layout(t.method), r = this.fields, i = e.source.root, o = t.as || r;
            t.field ? i.sum(t.field) : i.count(), t.sort && i.sort(jo(t.sort, (t => t.data))), function (t, e, n) {
                for (let r, i = 0, o = e.length; i < o; ++i) r = e[i], r in n && t[r](n[r])
            }(n, this.params, t), n.separation && n.separation(!1 !== t.separation ? iD : d);
            try {
                this.value = n(i)
            } catch (t) {
                u(t)
            }
            return i.each((t => function (t, e, n) {
                const r = t.data, i = e.length - 1;
                for (let o = 0; o < i; ++o) r[n[o]] = t[e[o]];
                r[n[i]] = t.children ? t.children.length : 0
            }(t, r, o))), e.reflow(t.modified()).modifies(o).modifies("leaf")
        }
    });
    const oD = ["x", "y", "r", "depth", "children"];

    function aD(t) {
        rD.call(this, t)
    }

    aD.Definition = {
        type: "Pack",
        metadata: {tree: !0, modifies: !0},
        params: [{name: "field", type: "field"}, {name: "sort", type: "compare"}, {
            name: "padding",
            type: "number",
            default: 0
        }, {name: "radius", type: "field", default: null}, {
            name: "size",
            type: "number",
            array: !0,
            length: 2
        }, {name: "as", type: "string", array: !0, length: oD.length, default: oD}]
    }, ut(aD, rD, {
        layout: function () {
            var t = null, e = 1, n = 1, r = FE;

            function i(i) {
                return i.x = e / 2, i.y = n / 2, t ? i.eachBefore(TE(t)).eachAfter(zE(r, .5)).eachBefore(NE(1)) : i.eachBefore(TE(BE)).eachAfter(zE(FE, 1)).eachAfter(zE(r, i.r / Math.min(e, n))).eachBefore(NE(Math.min(e, n) / (2 * i.r))), i
            }

            return i.radius = function (e) {
                return arguments.length ? (t = DE(e), i) : t
            }, i.size = function (t) {
                return arguments.length ? (e = +t[0], n = +t[1], i) : [e, n]
            }, i.padding = function (t) {
                return arguments.length ? (r = "function" == typeof t ? t : SE(+t), i) : r
            }, i
        }, params: ["radius", "size", "padding"], fields: oD
    });
    const uD = ["x0", "y0", "x1", "y1", "depth", "children"];

    function sD(t) {
        rD.call(this, t)
    }

    function lD(t) {
        pa.call(this, null, t)
    }

    sD.Definition = {
        type: "Partition",
        metadata: {tree: !0, modifies: !0},
        params: [{name: "field", type: "field"}, {name: "sort", type: "compare"}, {
            name: "padding",
            type: "number",
            default: 0
        }, {name: "round", type: "boolean", default: !1}, {
            name: "size",
            type: "number",
            array: !0,
            length: 2
        }, {name: "as", type: "string", array: !0, length: uD.length, default: uD}]
    }, ut(sD, rD, {
        layout: function () {
            var t = 1, e = 1, n = 0, r = !1;

            function i(i) {
                var o = i.height + 1;
                return i.x0 = i.y0 = n, i.x1 = t, i.y1 = e / o, i.eachBefore(function (t, e) {
                    return function (r) {
                        r.children && RE(r, r.x0, t * (r.depth + 1) / e, r.x1, t * (r.depth + 2) / e);
                        var i = r.x0, o = r.y0, a = r.x1 - n, u = r.y1 - n;
                        a < i && (i = a = (i + a) / 2), u < o && (o = u = (o + u) / 2), r.x0 = i, r.y0 = o, r.x1 = a, r.y1 = u
                    }
                }(e, o)), r && i.eachBefore(OE), i
            }

            return i.round = function (t) {
                return arguments.length ? (r = !!t, i) : r
            }, i.size = function (n) {
                return arguments.length ? (t = +n[0], e = +n[1], i) : [t, e]
            }, i.padding = function (t) {
                return arguments.length ? (n = +t, i) : n
            }, i
        }, params: ["size", "round", "padding"], fields: uD
    }), lD.Definition = {
        type: "Stratify",
        metadata: {treesource: !0},
        params: [{name: "key", type: "field", required: !0}, {name: "parentKey", type: "field", required: !0}]
    }, ut(lD, pa, {
        transform(t, e) {
            e.source || u("Stratify transform requires an upstream data source.");
            let n = this.value;
            const r = t.modified(), i = e.fork(e.ALL).materialize(e.SOURCE),
                o = !n || r || e.changed(e.ADD_REM) || e.modified(t.key.fields) || e.modified(t.parentKey.fields);
            return i.source = i.source.slice(), o && (n = i.source.length ? KE(jE().id(t.key).parentId(t.parentKey)(i.source), t.key, p) : KE(jE()([{}]), t.key, t.key)), i.source.root = this.value = n, i
        }
    });
    const cD = {
        tidy: function () {
            var t = IE, e = 1, n = 1, r = null;

            function i(i) {
                var s = function (t) {
                    for (var e, n, r, i, o, a = new VE(t, 0), u = [a]; e = u.pop();) if (r = e._.children) for (e.children = new Array(o = r.length), i = o - 1; i >= 0; --i) u.push(n = e.children[i] = new VE(r[i], i)), n.parent = e;
                    return (a.parent = new VE(null, 0)).children = [a], a
                }(i);
                if (s.eachAfter(o), s.parent.m = -s.z, s.eachBefore(a), r) i.eachBefore(u); else {
                    var l = i, c = i, f = i;
                    i.eachBefore((function (t) {
                        t.x < l.x && (l = t), t.x > c.x && (c = t), t.depth > f.depth && (f = t)
                    }));
                    var h = l === c ? 1 : t(l, c) / 2, d = h - l.x, p = e / (c.x + h + d), g = n / (f.depth || 1);
                    i.eachBefore((function (t) {
                        t.x = (t.x + d) * p, t.y = t.depth * g
                    }))
                }
                return i
            }

            function o(e) {
                var n = e.children, r = e.parent.children, i = e.i ? r[e.i - 1] : null;
                if (n) {
                    !function (t) {
                        for (var e, n = 0, r = 0, i = t.children, o = i.length; --o >= 0;) (e = i[o]).z += n, e.m += n, n += e.s + (r += e.c)
                    }(e);
                    var o = (n[0].z + n[n.length - 1].z) / 2;
                    i ? (e.z = i.z + t(e._, i._), e.m = e.z - o) : e.z = o
                } else i && (e.z = i.z + t(e._, i._));
                e.parent.A = function (e, n, r) {
                    if (n) {
                        for (var i, o = e, a = e, u = n, s = o.parent.children[0], l = o.m, c = a.m, f = u.m, h = s.m; u = WE(u), o = $E(o), u && o;) s = $E(s), (a = WE(a)).a = e, (i = u.z + f - o.z - l + t(u._, o._)) > 0 && (HE(YE(u, e, r), e, i), l += i, c += i), f += u.m, l += o.m, h += s.m, c += a.m;
                        u && !WE(a) && (a.t = u, a.m += f - c), o && !$E(s) && (s.t = o, s.m += l - h, r = e)
                    }
                    return r
                }(e, i, e.parent.A || r[0])
            }

            function a(t) {
                t._.x = t.z + t.parent.m, t.m += t.parent.m
            }

            function u(t) {
                t.x *= e, t.y = t.depth * n
            }

            return i.separation = function (e) {
                return arguments.length ? (t = e, i) : t
            }, i.size = function (t) {
                return arguments.length ? (r = !1, e = +t[0], n = +t[1], i) : r ? null : [e, n]
            }, i.nodeSize = function (t) {
                return arguments.length ? (r = !0, e = +t[0], n = +t[1], i) : r ? [e, n] : null
            }, i
        }, cluster: function () {
            var t = iE, e = 1, n = 1, r = !1;

            function i(i) {
                var o, a = 0;
                i.eachAfter((function (e) {
                    var n = e.children;
                    n ? (e.x = function (t) {
                        return t.reduce(oE, 0) / t.length
                    }(n), e.y = function (t) {
                        return 1 + t.reduce(aE, 0)
                    }(n)) : (e.x = o ? a += t(e, o) : 0, e.y = 0, o = e)
                }));
                var u = function (t) {
                    for (var e; e = t.children;) t = e[0];
                    return t
                }(i), s = function (t) {
                    for (var e; e = t.children;) t = e[e.length - 1];
                    return t
                }(i), l = u.x - t(u, s) / 2, c = s.x + t(s, u) / 2;
                return i.eachAfter(r ? function (t) {
                    t.x = (t.x - i.x) * e, t.y = (i.y - t.y) * n
                } : function (t) {
                    t.x = (t.x - l) / (c - l) * e, t.y = (1 - (i.y ? t.y / i.y : 1)) * n
                })
            }

            return i.separation = function (e) {
                return arguments.length ? (t = e, i) : t
            }, i.size = function (t) {
                return arguments.length ? (r = !1, e = +t[0], n = +t[1], i) : r ? null : [e, n]
            }, i.nodeSize = function (t) {
                return arguments.length ? (r = !0, e = +t[0], n = +t[1], i) : r ? [e, n] : null
            }, i
        }
    }, fD = ["x", "y", "depth", "children"];

    function hD(t) {
        rD.call(this, t)
    }

    function dD(t) {
        pa.call(this, [], t)
    }

    hD.Definition = {
        type: "Tree",
        metadata: {tree: !0, modifies: !0},
        params: [{name: "field", type: "field"}, {name: "sort", type: "compare"}, {
            name: "method",
            type: "enum",
            default: "tidy",
            values: ["tidy", "cluster"]
        }, {name: "size", type: "number", array: !0, length: 2}, {
            name: "nodeSize",
            type: "number",
            array: !0,
            length: 2
        }, {name: "separation", type: "boolean", default: !0}, {
            name: "as",
            type: "string",
            array: !0,
            length: fD.length,
            default: fD
        }]
    }, ut(hD, rD, {
        layout(t) {
            const e = t || "tidy";
            if (rt(cD, e)) return cD[e]();
            u("Unrecognized Tree layout method: " + e)
        }, params: ["size", "nodeSize"], fields: fD
    }), dD.Definition = {
        type: "TreeLinks",
        metadata: {tree: !0, generates: !0, changes: !0},
        params: []
    }, ut(dD, pa, {
        transform(t, e) {
            const n = this.value, r = e.source && e.source.root, i = e.fork(e.NO_SOURCE), o = {};
            return r || u("TreeLinks transform requires a tree data source."), e.changed(e.ADD_REM) ? (i.rem = n, e.visit(e.SOURCE, (t => o[Oo(t)] = 1)), r.each((t => {
                const e = t.data, n = t.parent && t.parent.data;
                n && o[Oo(e)] && o[Oo(n)] && i.add.push(Lo({source: n, target: e}))
            })), this.value = i.add) : e.changed(e.MOD) && (e.visit(e.MOD, (t => o[Oo(t)] = 1)), n.forEach((t => {
                (o[Oo(t.source)] || o[Oo(t.target)]) && i.mod.push(t)
            }))), i
        }
    });
    const pD = {
        binary: function (t, e, n, r, i) {
            var o, a, u = t.children, s = u.length, l = new Array(s + 1);
            for (l[0] = a = o = 0; o < s; ++o) l[o + 1] = a += u[o].value;
            !function t(e, n, r, i, o, a, s) {
                if (e >= n - 1) {
                    var c = u[e];
                    return c.x0 = i, c.y0 = o, c.x1 = a, void (c.y1 = s)
                }
                var f = l[e], h = r / 2 + f, d = e + 1, p = n - 1;
                for (; d < p;) {
                    var g = d + p >>> 1;
                    l[g] < h ? d = g + 1 : p = g
                }
                h - l[d - 1] < l[d] - h && e + 1 < d && --d;
                var m = l[d] - f, y = r - m;
                if (a - i > s - o) {
                    var v = r ? (i * y + a * m) / r : a;
                    t(e, d, m, i, o, v, s), t(d, n, y, v, o, a, s)
                } else {
                    var _ = r ? (o * y + s * m) / r : s;
                    t(e, d, m, i, o, a, _), t(d, n, y, i, _, a, s)
                }
            }(0, s, t.value, e, n, r, i)
        }, dice: RE, slice: GE, slicedice: function (t, e, n, r, i) {
            (1 & t.depth ? GE : RE)(t, e, n, r, i)
        }, squarify: ZE, resquarify: QE
    }, gD = ["x0", "y0", "x1", "y1", "depth", "children"];

    function mD(t) {
        rD.call(this, t)
    }

    mD.Definition = {
        type: "Treemap",
        metadata: {tree: !0, modifies: !0},
        params: [{name: "field", type: "field"}, {name: "sort", type: "compare"}, {
            name: "method",
            type: "enum",
            default: "squarify",
            values: ["squarify", "resquarify", "binary", "dice", "slice", "slicedice"]
        }, {name: "padding", type: "number", default: 0}, {
            name: "paddingInner",
            type: "number",
            default: 0
        }, {name: "paddingOuter", type: "number", default: 0}, {
            name: "paddingTop",
            type: "number",
            default: 0
        }, {name: "paddingRight", type: "number", default: 0}, {
            name: "paddingBottom",
            type: "number",
            default: 0
        }, {name: "paddingLeft", type: "number", default: 0}, {
            name: "ratio",
            type: "number",
            default: 1.618033988749895
        }, {name: "round", type: "boolean", default: !1}, {
            name: "size",
            type: "number",
            array: !0,
            length: 2
        }, {name: "as", type: "string", array: !0, length: gD.length, default: gD}]
    }, ut(mD, rD, {
        layout() {
            const t = function () {
                var t = ZE, e = !1, n = 1, r = 1, i = [0], o = FE, a = FE, u = FE, s = FE, l = FE;

                function c(t) {
                    return t.x0 = t.y0 = 0, t.x1 = n, t.y1 = r, t.eachBefore(f), i = [0], e && t.eachBefore(OE), t
                }

                function f(e) {
                    var n = i[e.depth], r = e.x0 + n, c = e.y0 + n, f = e.x1 - n, h = e.y1 - n;
                    f < r && (r = f = (r + f) / 2), h < c && (c = h = (c + h) / 2), e.x0 = r, e.y0 = c, e.x1 = f, e.y1 = h, e.children && (n = i[e.depth + 1] = o(e) / 2, r += l(e) - n, c += a(e) - n, (f -= u(e) - n) < r && (r = f = (r + f) / 2), (h -= s(e) - n) < c && (c = h = (c + h) / 2), t(e, r, c, f, h))
                }

                return c.round = function (t) {
                    return arguments.length ? (e = !!t, c) : e
                }, c.size = function (t) {
                    return arguments.length ? (n = +t[0], r = +t[1], c) : [n, r]
                }, c.tile = function (e) {
                    return arguments.length ? (t = CE(e), c) : t
                }, c.padding = function (t) {
                    return arguments.length ? c.paddingInner(t).paddingOuter(t) : c.paddingInner()
                }, c.paddingInner = function (t) {
                    return arguments.length ? (o = "function" == typeof t ? t : SE(+t), c) : o
                }, c.paddingOuter = function (t) {
                    return arguments.length ? c.paddingTop(t).paddingRight(t).paddingBottom(t).paddingLeft(t) : c.paddingTop()
                }, c.paddingTop = function (t) {
                    return arguments.length ? (a = "function" == typeof t ? t : SE(+t), c) : a
                }, c.paddingRight = function (t) {
                    return arguments.length ? (u = "function" == typeof t ? t : SE(+t), c) : u
                }, c.paddingBottom = function (t) {
                    return arguments.length ? (s = "function" == typeof t ? t : SE(+t), c) : s
                }, c.paddingLeft = function (t) {
                    return arguments.length ? (l = "function" == typeof t ? t : SE(+t), c) : l
                }, c
            }();
            return t.ratio = e => {
                const n = t.tile();
                n.ratio && t.tile(n.ratio(e))
            }, t.method = e => {
                rt(pD, e) ? t.tile(pD[e]) : u("Unrecognized Treemap layout method: " + e)
            }, t
        },
        params: ["method", "ratio", "size", "round", "padding", "paddingInner", "paddingOuter", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft"],
        fields: gD
    });
    var yD = Object.freeze({
        __proto__: null,
        nest: tD,
        pack: aD,
        partition: sD,
        stratify: lD,
        tree: hD,
        treelinks: dD,
        treemap: mD
    });

    function vD(t, e, n, r) {
        const i = t.width, o = t.height, a = n || r, u = Gl(i, o).getContext("2d");
        e.forEach((t => _D(u, t, a)));
        const s = new Uint32Array(u.getImageData(0, 0, i, o).data.buffer), l = t.bitmap(), c = a && t.bitmap();
        let f, h, d, p, g;
        for (h = 0; h < o; ++h) for (f = 0; f < i; ++f) g = 4278190080 & s[h * i + f], g && (d = t(f), p = t(h), r || l.set(d, p), a && 268435456 ^ g && c.set(d, p));
        return [l, c]
    }

    function _D(t, e, n) {
        if (!e.length) return;
        const r = e[0].mark.marktype;
        "group" === r ? e.forEach((e => {
            e.items.forEach((e => _D(t, e.items, n)))
        })) : Ym[r].draw(t, {items: n ? e.map(xD) : e})
    }

    function xD(t) {
        const e = qo(t, {});
        return e.stroke && (e.strokeOpacity = 1), e.fill && (e.fillOpacity = .0625, e.stroke = "#000", e.strokeOpacity = 1, e.strokeWidth = 2), e
    }

    const bD = 31, wD = new Uint32Array(33), kD = new Uint32Array(33);
    kD[0] = 0, wD[0] = ~kD[0];
    for (let t = 1; t <= 32; ++t) kD[t] = kD[t - 1] << 1 | 1, wD[t] = ~kD[t];

    function MD(t, e, n) {
        const r = Math.max(1, Math.sqrt(t * e / 1e6)), i = ~~((t + 2 * n + r) / r), o = ~~((e + 2 * n + r) / r),
            a = t => ~~((t + n) / r);
        return a.invert = t => t * r - n, a.bitmap = () => function (t, e) {
            const n = new Uint32Array(~~((t * e + 32) / 32));

            function r(t, e) {
                n[t] |= e
            }

            function i(t, e) {
                n[t] &= e
            }

            return {
                array: n, get: (e, r) => {
                    const i = r * t + e;
                    return n[i >>> 5] & 1 << (i & bD)
                }, set: (e, n) => {
                    const i = n * t + e;
                    r(i >>> 5, 1 << (i & bD))
                }, clear: (e, n) => {
                    const r = n * t + e;
                    i(r >>> 5, ~(1 << (r & bD)))
                }, getRange: (e, r, i, o) => {
                    let a, u, s, l, c = o;
                    for (; c >= r; --c) if (a = c * t + e, u = c * t + i, s = a >>> 5, l = u >>> 5, s === l) {
                        if (n[s] & wD[a & bD] & kD[1 + (u & bD)]) return !0
                    } else {
                        if (n[s] & wD[a & bD]) return !0;
                        if (n[l] & kD[1 + (u & bD)]) return !0;
                        for (let t = s + 1; t < l; ++t) if (n[t]) return !0
                    }
                    return !1
                }, setRange: (e, n, i, o) => {
                    let a, u, s, l, c;
                    for (; n <= o; ++n) if (a = n * t + e, u = n * t + i, s = a >>> 5, l = u >>> 5, s === l) r(s, wD[a & bD] & kD[1 + (u & bD)]); else for (r(s, wD[a & bD]), r(l, kD[1 + (u & bD)]), c = s + 1; c < l; ++c) r(c, 4294967295)
                }, clearRange: (e, n, r, o) => {
                    let a, u, s, l, c;
                    for (; n <= o; ++n) if (a = n * t + e, u = n * t + r, s = a >>> 5, l = u >>> 5, s === l) i(s, kD[a & bD] | wD[1 + (u & bD)]); else for (i(s, kD[a & bD]), i(l, wD[1 + (u & bD)]), c = s + 1; c < l; ++c) i(c, 0)
                }, outOfBounds: (n, r, i, o) => n < 0 || r < 0 || o >= e || i >= t
            }
        }(i, o), a.ratio = r, a.padding = n, a.width = t, a.height = e, a
    }

    function AD(t, e, n, r, i, o) {
        let a = n / 2;
        return t - a < 0 || t + a > i || e - (a = r / 2) < 0 || e + a > o
    }

    function ED(t, e, n, r, i, o, a, u) {
        const s = i * o / (2 * r), l = t(e - s), c = t(e + s), f = t(n - (o /= 2)), h = t(n + o);
        return a.outOfBounds(l, f, c, h) || a.getRange(l, f, c, h) || u && u.getRange(l, f, c, h)
    }

    const DD = [-1, -1, 1, 1], CD = [-1, 1, -1, 1];
    const FD = ["right", "center", "left"], SD = ["bottom", "middle", "top"];

    function BD(t, e, n, r, i, o, a, u, s, l, c, f) {
        return !(i.outOfBounds(t, n, e, r) || (f && o ? o.getRange(t, n, e, r) || !function (t, e, n, r, i) {
            return i[0] <= t && n <= i[2] && i[3] <= e && r <= i[5]
        }(a, s, u, l, c) : i.getRange(t, n, e, r)))
    }

    const TD = {
        "top-left": 0,
        top: 1,
        "top-right": 2,
        left: 4,
        middle: 5,
        right: 6,
        "bottom-left": 8,
        bottom: 9,
        "bottom-right": 10
    }, zD = {
        naive: function (t, e, n, r) {
            const i = t.width, o = t.height;
            return function (t) {
                const e = t.datum.datum.items[r].items, n = e.length, a = t.datum.fontSize,
                    u = Cm.width(t.datum, t.datum.text);
                let s, l, c, f, h, d, p, g = 0;
                for (let r = 0; r < n; ++r) s = e[r].x, c = e[r].y, l = void 0 === e[r].x2 ? s : e[r].x2, f = void 0 === e[r].y2 ? c : e[r].y2, h = (s + l) / 2, d = (c + f) / 2, p = Math.abs(l - s + f - c), p >= g && (g = p, t.x = h, t.y = d);
                return h = u / 2, d = a / 2, s = t.x - h, l = t.x + h, c = t.y - d, f = t.y + d, t.align = "center", s < 0 && l <= i ? t.align = "left" : 0 <= s && i < l && (t.align = "right"), t.baseline = "middle", c < 0 && f <= o ? t.baseline = "top" : 0 <= c && o < f && (t.baseline = "bottom"), !0
            }
        }, "reduced-search": function (t, e, n, r) {
            const i = t.width, o = t.height, a = e[0], u = e[1];

            function s(e, n, r, s, l) {
                const c = t.invert(e), f = t.invert(n);
                let h, d = r, p = o;
                if (!AD(c, f, s, l, i, o) && !ED(t, c, f, l, s, d, a, u) && !ED(t, c, f, l, s, l, a, null)) {
                    for (; p - d >= 1;) h = (d + p) / 2, ED(t, c, f, l, s, h, a, u) ? p = h : d = h;
                    if (d > r) return [c, f, d, !0]
                }
            }

            return function (e) {
                const u = e.datum.datum.items[r].items, l = u.length, c = e.datum.fontSize,
                    f = Cm.width(e.datum, e.datum.text);
                let h, d, p, g, m, y, v, _, x, b, w, k, M, A, E, D, C, F = n ? c : 0, S = !1, B = !1, T = 0;
                for (let r = 0; r < l; ++r) {
                    for (h = u[r].x, p = u[r].y, d = void 0 === u[r].x2 ? h : u[r].x2, g = void 0 === u[r].y2 ? p : u[r].y2, h > d && (C = h, h = d, d = C), p > g && (C = p, p = g, g = C), x = t(h), w = t(d), b = ~~((x + w) / 2), k = t(p), A = t(g), M = ~~((k + A) / 2), v = b; v >= x; --v) for (_ = M; _ >= k; --_) D = s(v, _, F, f, c), D && ([e.x, e.y, F, S] = D);
                    for (v = b; v <= w; ++v) for (_ = M; _ <= A; ++_) D = s(v, _, F, f, c), D && ([e.x, e.y, F, S] = D);
                    S || n || (E = Math.abs(d - h + g - p), m = (h + d) / 2, y = (p + g) / 2, E >= T && !AD(m, y, f, c, i, o) && !ED(t, m, y, c, f, c, a, null) && (T = E, e.x = m, e.y = y, B = !0))
                }
                return !(!S && !B) && (m = f / 2, y = c / 2, a.setRange(t(e.x - m), t(e.y - y), t(e.x + m), t(e.y + y)), e.align = "center", e.baseline = "middle", !0)
            }
        }, floodfill: function (t, e, n, r) {
            const i = t.width, o = t.height, a = e[0], u = e[1], s = t.bitmap();
            return function (e) {
                const l = e.datum.datum.items[r].items, c = l.length, f = e.datum.fontSize,
                    h = Cm.width(e.datum, e.datum.text), d = [];
                let p, g, m, y, v, _, x, b, w, k, M, A, E = n ? f : 0, D = !1, C = !1, F = 0;
                for (let r = 0; r < c; ++r) {
                    for (p = l[r].x, m = l[r].y, g = void 0 === l[r].x2 ? p : l[r].x2, y = void 0 === l[r].y2 ? m : l[r].y2, d.push([t((p + g) / 2), t((m + y) / 2)]); d.length;) if ([x, b] = d.pop(), !(a.get(x, b) || u.get(x, b) || s.get(x, b))) {
                        s.set(x, b);
                        for (let t = 0; t < 4; ++t) v = x + DD[t], _ = b + CD[t], s.outOfBounds(v, _, v, _) || d.push([v, _]);
                        if (v = t.invert(x), _ = t.invert(b), w = E, k = o, !AD(v, _, h, f, i, o) && !ED(t, v, _, f, h, w, a, u) && !ED(t, v, _, f, h, f, a, null)) {
                            for (; k - w >= 1;) M = (w + k) / 2, ED(t, v, _, f, h, M, a, u) ? k = M : w = M;
                            w > E && (e.x = v, e.y = _, E = w, D = !0)
                        }
                    }
                    D || n || (A = Math.abs(g - p + y - m), v = (p + g) / 2, _ = (m + y) / 2, A >= F && !AD(v, _, h, f, i, o) && !ED(t, v, _, f, h, f, a, null) && (F = A, e.x = v, e.y = _, C = !0))
                }
                return !(!D && !C) && (v = h / 2, _ = f / 2, a.setRange(t(e.x - v), t(e.y - _), t(e.x + v), t(e.y + _)), e.align = "center", e.baseline = "middle", !0)
            }
        }
    };

    function ND(t, e, n, r, i, o, a, u, s, l, c) {
        if (!t.length) return t;
        const f = Math.max(r.length, i.length), h = function (t, e) {
                const n = new Float64Array(e), r = t.length;
                for (let e = 0; e < r; ++e) n[e] = t[e] || 0;
                for (let t = r; t < e; ++t) n[t] = n[r - 1];
                return n
            }(r, f), d = function (t, e) {
                const n = new Int8Array(e), r = t.length;
                for (let e = 0; e < r; ++e) n[e] |= TD[t[e]];
                for (let t = r; t < e; ++t) n[t] = n[r - 1];
                return n
            }(i, f), p = (x = t[0].datum) && x.mark && x.mark.marktype, g = "group" === p && t[0].datum.items[s].marktype,
            m = "area" === g, y = function (t, e, n, r) {
                const i = t => [t.x, t.x, t.x, t.y, t.y, t.y];
                return t ? "line" === t || "area" === t ? t => i(t.datum) : "line" === e ? t => {
                    const e = t.datum.items[r].items;
                    return i(e.length ? e["start" === n ? 0 : e.length - 1] : {x: NaN, y: NaN})
                } : t => {
                    const e = t.datum.bounds;
                    return [e.x1, (e.x1 + e.x2) / 2, e.x2, e.y1, (e.y1 + e.y2) / 2, e.y2]
                } : i
            }(p, g, u, s), v = MD(e[0], e[1], l), _ = m && "naive" === c;
        var x;
        const b = t.map((t => ({
            datum: t,
            opacity: 0,
            x: void 0,
            y: void 0,
            align: void 0,
            baseline: void 0,
            boundary: y(t)
        })));
        let w;
        if (!_) {
            n && b.sort(((t, e) => n(t.datum, e.datum)));
            let e = !1;
            for (let t = 0; t < d.length && !e; ++t) e = 5 === d[t] || h[t] < 0;
            p && (a || m) && (o = [t.map((t => t.datum))].concat(o)), w = o.length ? vD(v, o, e, m) : function (t, e) {
                const n = t.bitmap();
                return (e || []).forEach((e => n.set(t(e.boundary[0]), t(e.boundary[3])))), [n, void 0]
            }(v, a && b)
        }
        const k = m ? zD[c](v, w, a, s) : function (t, e, n, r) {
            const i = t.width, o = t.height, a = e[0], u = e[1], s = r.length;
            return function (e) {
                const l = e.boundary, c = e.datum.fontSize;
                if (l[2] < 0 || l[5] < 0 || l[0] > i || l[3] > o) return !1;
                let f, h, d, p, g, m, y, v, _, x, b, w, k, M, A, E = 0;
                for (let i = 0; i < s; ++i) {
                    if (f = (3 & n[i]) - 1, h = (n[i] >>> 2 & 3) - 1, d = 0 === f && 0 === h || r[i] < 0, p = f && h ? Math.SQRT1_2 : 1, g = r[i] < 0 ? -1 : 1, m = l[1 + f] + r[i] * f * p, b = l[4 + h] + g * c * h / 2 + r[i] * h * p, v = b - c / 2, _ = b + c / 2, w = t(m), M = t(v), A = t(_), !E) {
                        if (!BD(w, w, M, A, a, u, m, m, v, _, l, d)) continue;
                        E = Cm.width(e.datum, e.datum.text)
                    }
                    if (x = m + g * E * f / 2, m = x - E / 2, y = x + E / 2, w = t(m), k = t(y), BD(w, k, M, A, a, u, m, y, v, _, l, d)) return e.x = f ? f * g < 0 ? y : m : x, e.y = h ? h * g < 0 ? _ : v : b, e.align = FD[f * g + 1], e.baseline = SD[h * g + 1], a.setRange(w, M, k, A), !0
                }
                return !1
            }
        }(v, w, d, h);
        return b.forEach((t => t.opacity = +k(t))), b
    }

    const OD = ["x", "y", "opacity", "align", "baseline"],
        RD = ["top-left", "left", "bottom-left", "top", "bottom", "top-right", "right", "bottom-right"];

    function LD(t) {
        pa.call(this, null, t)
    }

    LD.Definition = {
        type: "Label",
        metadata: {modifies: !0},
        params: [{name: "size", type: "number", array: !0, length: 2, required: !0}, {
            name: "sort",
            type: "compare"
        }, {name: "anchor", type: "string", array: !0, default: RD}, {
            name: "offset",
            type: "number",
            array: !0,
            default: [1]
        }, {name: "padding", type: "number", default: 0}, {
            name: "lineAnchor",
            type: "string",
            values: ["start", "end"],
            default: "end"
        }, {name: "markIndex", type: "number", default: 0}, {
            name: "avoidBaseMark",
            type: "boolean",
            default: !0
        }, {name: "avoidMarks", type: "data", array: !0}, {
            name: "method",
            type: "string",
            default: "naive"
        }, {name: "as", type: "string", array: !0, length: OD.length, default: OD}]
    }, ut(LD, pa, {
        transform(t, e) {
            const n = t.modified();
            if (!(n || e.changed(e.ADD_REM) || function (n) {
                const r = t[n];
                return H(r) && e.modified(r.fields)
            }("sort"))) return;
            t.size && 2 === t.size.length || u("Size parameter should be specified as a [width, height] array.");
            const r = t.as || OD;
            return ND(e.materialize(e.SOURCE).source, t.size, t.sort, $(t.offset || 1), $(t.anchor || RD), t.avoidMarks || [], !1 !== t.avoidBaseMark, t.lineAnchor || "end", t.markIndex || 0, t.padding || 0, t.method || "naive").forEach((t => {
                const e = t.datum;
                e[r[0]] = t.x, e[r[1]] = t.y, e[r[2]] = t.opacity, e[r[3]] = t.align, e[r[4]] = t.baseline
            })), e.reflow(n).modifies(r)
        }
    });
    var UD = Object.freeze({__proto__: null, label: LD});

    function qD(t, e) {
        var n, r, i, o, a, u, s = [], l = function (t) {
            return t(o)
        };
        if (null == e) s.push(t); else for (n = {}, r = 0, i = t.length; r < i; ++r) o = t[r], (u = n[a = e.map(l)]) || (n[a] = u = [], u.dims = a, s.push(u)), u.push(o);
        return s
    }

    function PD(t) {
        pa.call(this, null, t)
    }

    PD.Definition = {
        type: "Loess",
        metadata: {generates: !0},
        params: [{name: "x", type: "field", required: !0}, {name: "y", type: "field", required: !0}, {
            name: "groupby",
            type: "field",
            array: !0
        }, {name: "bandwidth", type: "number", default: .3}, {name: "as", type: "string", array: !0}]
    }, ut(PD, pa, {
        transform(t, e) {
            const r = e.fork(e.NO_SOURCE | e.NO_FIELDS);
            if (!this.value || e.changed() || t.modified()) {
                const i = qD(e.materialize(e.SOURCE).source, t.groupby), o = (t.groupby || []).map(n), a = o.length,
                    u = t.as || [n(t.x), n(t.y)], s = [];
                i.forEach((e => {
                    nu(e, t.x, t.y, t.bandwidth || .3).forEach((t => {
                        const n = {};
                        for (let t = 0; t < a; ++t) n[o[t]] = e.dims[t];
                        n[u[0]] = t[0], n[u[1]] = t[1], s.push(Lo(n))
                    }))
                })), this.value && (r.rem = this.value), this.value = r.add = r.source = s
            }
            return r
        }
    });
    const jD = {linear: Xa, log: Ja, exp: Za, pow: Qa, quad: Ka, poly: tu};

    function ID(t) {
        pa.call(this, null, t)
    }

    ID.Definition = {
        type: "Regression",
        metadata: {generates: !0},
        params: [{name: "x", type: "field", required: !0}, {name: "y", type: "field", required: !0}, {
            name: "groupby",
            type: "field",
            array: !0
        }, {name: "method", type: "string", default: "linear", values: Object.keys(jD)}, {
            name: "order",
            type: "number",
            default: 3
        }, {name: "extent", type: "number", array: !0, length: 2}, {
            name: "params",
            type: "boolean",
            default: !1
        }, {name: "as", type: "string", array: !0}]
    }, ut(ID, pa, {
        transform(t, e) {
            const r = e.fork(e.NO_SOURCE | e.NO_FIELDS);
            if (!this.value || e.changed() || t.modified()) {
                const i = qD(e.materialize(e.SOURCE).source, t.groupby), o = (t.groupby || []).map(n),
                    a = t.method || "linear", s = t.order || 3,
                    l = ((t, e) => "poly" === t ? e : "quad" === t ? 2 : 1)(a, s), c = t.as || [n(t.x), n(t.y)],
                    f = jD[a], h = [];
                let d = t.extent;
                rt(jD, a) || u("Invalid regression method: " + a), null != d && "log" === a && d[0] <= 0 && (e.dataflow.warn("Ignoring extent with values <= 0 for log regression."), d = null), i.forEach((n => {
                    if (n.length <= l) return void e.dataflow.warn("Skipping regression with more parameters than data points.");
                    const r = f(n, t.x, t.y, s);
                    if (t.params) return void h.push(Lo({keys: n.dims, coef: r.coef, rSquared: r.rSquared}));
                    const i = d || tt(n, t.x), u = t => {
                        const e = {};
                        for (let t = 0; t < o.length; ++t) e[o[t]] = n.dims[t];
                        e[c[0]] = t[0], e[c[1]] = t[1], h.push(Lo(e))
                    };
                    "linear" === a ? i.forEach((t => u([t, r.predict(t)]))) : au(r.predict, i, 25, 200).forEach(u)
                })), this.value && (r.rem = this.value), this.value = r.add = r.source = h
            }
            return r
        }
    });
    var $D = Object.freeze({__proto__: null, loess: PD, regression: ID});
    const WD = Math.pow(2, -52), HD = new Uint32Array(512);

    class YD {
        static from(t, e = tC, n = eC) {
            const r = t.length, i = new Float64Array(2 * r);
            for (let o = 0; o < r; o++) {
                const r = t[o];
                i[2 * o] = e(r), i[2 * o + 1] = n(r)
            }
            return new YD(i)
        }

        constructor(t) {
            const e = t.length >> 1;
            if (e > 0 && "number" != typeof t[0]) throw new Error("Expected coords to contain numbers.");
            this.coords = t;
            const n = Math.max(2 * e - 5, 0);
            this._triangles = new Uint32Array(3 * n), this._halfedges = new Int32Array(3 * n), this._hashSize = Math.ceil(Math.sqrt(e)), this._hullPrev = new Uint32Array(e), this._hullNext = new Uint32Array(e), this._hullTri = new Uint32Array(e), this._hullHash = new Int32Array(this._hashSize).fill(-1), this._ids = new Uint32Array(e), this._dists = new Float64Array(e), this.update()
        }

        update() {
            const {coords: t, _hullPrev: e, _hullNext: n, _hullTri: r, _hullHash: i} = this, o = t.length >> 1;
            let a = 1 / 0, u = 1 / 0, s = -1 / 0, l = -1 / 0;
            for (let e = 0; e < o; e++) {
                const n = t[2 * e], r = t[2 * e + 1];
                n < a && (a = n), r < u && (u = r), n > s && (s = n), r > l && (l = r), this._ids[e] = e
            }
            const c = (a + s) / 2, f = (u + l) / 2;
            let h, d, p, g = 1 / 0;
            for (let e = 0; e < o; e++) {
                const n = VD(c, f, t[2 * e], t[2 * e + 1]);
                n < g && (h = e, g = n)
            }
            const m = t[2 * h], y = t[2 * h + 1];
            g = 1 / 0;
            for (let e = 0; e < o; e++) {
                if (e === h) continue;
                const n = VD(m, y, t[2 * e], t[2 * e + 1]);
                n < g && n > 0 && (d = e, g = n)
            }
            let v = t[2 * d], _ = t[2 * d + 1], x = 1 / 0;
            for (let e = 0; e < o; e++) {
                if (e === h || e === d) continue;
                const n = ZD(m, y, v, _, t[2 * e], t[2 * e + 1]);
                n < x && (p = e, x = n)
            }
            let b = t[2 * p], w = t[2 * p + 1];
            if (x === 1 / 0) {
                for (let e = 0; e < o; e++) this._dists[e] = t[2 * e] - t[0] || t[2 * e + 1] - t[1];
                QD(this._ids, this._dists, 0, o - 1);
                const e = new Uint32Array(o);
                let n = 0;
                for (let t = 0, r = -1 / 0; t < o; t++) {
                    const i = this._ids[t];
                    this._dists[i] > r && (e[n++] = i, r = this._dists[i])
                }
                return this.hull = e.subarray(0, n), this.triangles = new Uint32Array(0), void (this.halfedges = new Uint32Array(0))
            }
            if (XD(m, y, v, _, b, w)) {
                const t = d, e = v, n = _;
                d = p, v = b, _ = w, p = t, b = e, w = n
            }
            const k = function (t, e, n, r, i, o) {
                const a = n - t, u = r - e, s = i - t, l = o - e, c = a * a + u * u, f = s * s + l * l,
                    h = .5 / (a * l - u * s);
                return {x: t + (l * c - u * f) * h, y: e + (a * f - s * c) * h}
            }(m, y, v, _, b, w);
            this._cx = k.x, this._cy = k.y;
            for (let e = 0; e < o; e++) this._dists[e] = VD(t[2 * e], t[2 * e + 1], k.x, k.y);
            QD(this._ids, this._dists, 0, o - 1), this._hullStart = h;
            let M = 3;
            n[h] = e[p] = d, n[d] = e[h] = p, n[p] = e[d] = h, r[h] = 0, r[d] = 1, r[p] = 2, i.fill(-1), i[this._hashKey(m, y)] = h, i[this._hashKey(v, _)] = d, i[this._hashKey(b, w)] = p, this.trianglesLen = 0, this._addTriangle(h, d, p, -1, -1, -1);
            for (let o, a, u = 0; u < this._ids.length; u++) {
                const s = this._ids[u], l = t[2 * s], c = t[2 * s + 1];
                if (u > 0 && Math.abs(l - o) <= WD && Math.abs(c - a) <= WD) continue;
                if (o = l, a = c, s === h || s === d || s === p) continue;
                let f = 0;
                for (let t = 0, e = this._hashKey(l, c); t < this._hashSize && (f = i[(e + t) % this._hashSize], -1 === f || f === n[f]); t++) ;
                f = e[f];
                let g, m = f;
                for (; g = n[m], !XD(l, c, t[2 * m], t[2 * m + 1], t[2 * g], t[2 * g + 1]);) if (m = g, m === f) {
                    m = -1;
                    break
                }
                if (-1 === m) continue;
                let y = this._addTriangle(m, s, n[m], -1, -1, r[m]);
                r[s] = this._legalize(y + 2), r[m] = y, M++;
                let v = n[m];
                for (; g = n[v], XD(l, c, t[2 * v], t[2 * v + 1], t[2 * g], t[2 * g + 1]);) y = this._addTriangle(v, s, g, r[s], -1, r[v]), r[s] = this._legalize(y + 2), n[v] = v, M--, v = g;
                if (m === f) for (; g = e[m], XD(l, c, t[2 * g], t[2 * g + 1], t[2 * m], t[2 * m + 1]);) y = this._addTriangle(g, s, m, -1, r[m], r[g]), this._legalize(y + 2), r[g] = y, n[m] = m, M--, m = g;
                this._hullStart = e[s] = m, n[m] = e[v] = s, n[s] = v, i[this._hashKey(l, c)] = s, i[this._hashKey(t[2 * m], t[2 * m + 1])] = m
            }
            this.hull = new Uint32Array(M);
            for (let t = 0, e = this._hullStart; t < M; t++) this.hull[t] = e, e = n[e];
            this.triangles = this._triangles.subarray(0, this.trianglesLen), this.halfedges = this._halfedges.subarray(0, this.trianglesLen)
        }

        _hashKey(t, e) {
            return Math.floor(function (t, e) {
                const n = t / (Math.abs(t) + Math.abs(e));
                return (e > 0 ? 3 - n : 1 + n) / 4
            }(t - this._cx, e - this._cy) * this._hashSize) % this._hashSize
        }

        _legalize(t) {
            const {_triangles: e, _halfedges: n, coords: r} = this;
            let i = 0, o = 0;
            for (; ;) {
                const a = n[t], u = t - t % 3;
                if (o = u + (t + 2) % 3, -1 === a) {
                    if (0 === i) break;
                    t = HD[--i];
                    continue
                }
                const s = a - a % 3, l = u + (t + 1) % 3, c = s + (a + 2) % 3, f = e[o], h = e[t], d = e[l], p = e[c];
                if (JD(r[2 * f], r[2 * f + 1], r[2 * h], r[2 * h + 1], r[2 * d], r[2 * d + 1], r[2 * p], r[2 * p + 1])) {
                    e[t] = p, e[a] = f;
                    const r = n[c];
                    if (-1 === r) {
                        let e = this._hullStart;
                        do {
                            if (this._hullTri[e] === c) {
                                this._hullTri[e] = t;
                                break
                            }
                            e = this._hullPrev[e]
                        } while (e !== this._hullStart)
                    }
                    this._link(t, r), this._link(a, n[o]), this._link(o, c);
                    const u = s + (a + 1) % 3;
                    i < HD.length && (HD[i++] = u)
                } else {
                    if (0 === i) break;
                    t = HD[--i]
                }
            }
            return o
        }

        _link(t, e) {
            this._halfedges[t] = e, -1 !== e && (this._halfedges[e] = t)
        }

        _addTriangle(t, e, n, r, i, o) {
            const a = this.trianglesLen;
            return this._triangles[a] = t, this._triangles[a + 1] = e, this._triangles[a + 2] = n, this._link(a, r), this._link(a + 1, i), this._link(a + 2, o), this.trianglesLen += 3, a
        }
    }

    function VD(t, e, n, r) {
        const i = t - n, o = e - r;
        return i * i + o * o
    }

    function GD(t, e, n, r, i, o) {
        const a = (r - e) * (i - t), u = (n - t) * (o - e);
        return Math.abs(a - u) >= 33306690738754716e-32 * Math.abs(a + u) ? a - u : 0
    }

    function XD(t, e, n, r, i, o) {
        return (GD(i, o, t, e, n, r) || GD(t, e, n, r, i, o) || GD(n, r, i, o, t, e)) < 0
    }

    function JD(t, e, n, r, i, o, a, u) {
        const s = t - a, l = e - u, c = n - a, f = r - u, h = i - a, d = o - u, p = c * c + f * f, g = h * h + d * d;
        return s * (f * g - p * d) - l * (c * g - p * h) + (s * s + l * l) * (c * d - f * h) < 0
    }

    function ZD(t, e, n, r, i, o) {
        const a = n - t, u = r - e, s = i - t, l = o - e, c = a * a + u * u, f = s * s + l * l,
            h = .5 / (a * l - u * s), d = (l * c - u * f) * h, p = (a * f - s * c) * h;
        return d * d + p * p
    }

    function QD(t, e, n, r) {
        if (r - n <= 20) for (let i = n + 1; i <= r; i++) {
            const r = t[i], o = e[r];
            let a = i - 1;
            for (; a >= n && e[t[a]] > o;) t[a + 1] = t[a--];
            t[a + 1] = r
        } else {
            let i = n + 1, o = r;
            KD(t, n + r >> 1, i), e[t[n]] > e[t[r]] && KD(t, n, r), e[t[i]] > e[t[r]] && KD(t, i, r), e[t[n]] > e[t[i]] && KD(t, n, i);
            const a = t[i], u = e[a];
            for (; ;) {
                do {
                    i++
                } while (e[t[i]] < u);
                do {
                    o--
                } while (e[t[o]] > u);
                if (o < i) break;
                KD(t, i, o)
            }
            t[n + 1] = t[o], t[o] = a, r - i + 1 >= o - n ? (QD(t, e, i, r), QD(t, e, n, o - 1)) : (QD(t, e, n, o - 1), QD(t, e, i, r))
        }
    }

    function KD(t, e, n) {
        const r = t[e];
        t[e] = t[n], t[n] = r
    }

    function tC(t) {
        return t[0]
    }

    function eC(t) {
        return t[1]
    }

    const nC = 1e-6;

    class rC {
        constructor() {
            this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = ""
        }

        moveTo(t, e) {
            this._ += "M".concat(this._x0 = this._x1 = +t, ",").concat(this._y0 = this._y1 = +e)
        }

        closePath() {
            null !== this._x1 && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z")
        }

        lineTo(t, e) {
            this._ += "L".concat(this._x1 = +t, ",").concat(this._y1 = +e)
        }

        arc(t, e, n) {
            const r = (t = +t) + (n = +n), i = e = +e;
            if (n < 0) throw new Error("negative radius");
            null === this._x1 ? this._ += "M".concat(r, ",").concat(i) : (Math.abs(this._x1 - r) > nC || Math.abs(this._y1 - i) > nC) && (this._ += "L" + r + "," + i), n && (this._ += "A".concat(n, ",").concat(n, ",0,1,1,").concat(t - n, ",").concat(e, "A").concat(n, ",").concat(n, ",0,1,1,").concat(this._x1 = r, ",").concat(this._y1 = i))
        }

        rect(t, e, n, r) {
            this._ += "M".concat(this._x0 = this._x1 = +t, ",").concat(this._y0 = this._y1 = +e, "h").concat(+n, "v").concat(+r, "h").concat(-n, "Z")
        }

        value() {
            return this._ || null
        }
    }

    class iC {
        constructor() {
            this._ = []
        }

        moveTo(t, e) {
            this._.push([t, e])
        }

        closePath() {
            this._.push(this._[0].slice())
        }

        lineTo(t, e) {
            this._.push([t, e])
        }

        value() {
            return this._.length ? this._ : null
        }
    }

    class oC {
        constructor(t, [e, n, r, i] = [0, 0, 960, 500]) {
            if (!((r = +r) >= (e = +e) && (i = +i) >= (n = +n))) throw new Error("invalid bounds");
            this.delaunay = t, this._circumcenters = new Float64Array(2 * t.points.length), this.vectors = new Float64Array(2 * t.points.length), this.xmax = r, this.xmin = e, this.ymax = i, this.ymin = n, this._init()
        }

        update() {
            return this.delaunay.update(), this._init(), this
        }

        _init() {
            const {delaunay: {points: t, hull: e, triangles: n}, vectors: r} = this,
                i = this.circumcenters = this._circumcenters.subarray(0, n.length / 3 * 2);
            for (let e, r, o = 0, a = 0, u = n.length; o < u; o += 3, a += 2) {
                const u = 2 * n[o], s = 2 * n[o + 1], l = 2 * n[o + 2], c = t[u], f = t[u + 1], h = t[s], d = t[s + 1],
                    p = t[l], g = t[l + 1], m = h - c, y = d - f, v = p - c, _ = g - f, x = m * m + y * y,
                    b = v * v + _ * _, w = 2 * (m * _ - y * v);
                if (w) if (Math.abs(w) < 1e-8) e = (c + p) / 2, r = (f + g) / 2; else {
                    const t = 1 / w;
                    e = c + (_ * x - y * b) * t, r = f + (m * b - v * x) * t
                } else e = (c + p) / 2 - 1e8 * _, r = (f + g) / 2 + 1e8 * v;
                i[a] = e, i[a + 1] = r
            }
            let o, a, u, s = e[e.length - 1], l = 4 * s, c = t[2 * s], f = t[2 * s + 1];
            r.fill(0);
            for (let n = 0; n < e.length; ++n) s = e[n], o = l, a = c, u = f, l = 4 * s, c = t[2 * s], f = t[2 * s + 1], r[o + 2] = r[l] = u - f, r[o + 3] = r[l + 1] = c - a
        }

        render(t) {
            const e = null == t ? t = new rC : void 0, {delaunay: {halfedges: n, inedges: r, hull: i}, circumcenters: o, vectors: a} = this;
            if (i.length <= 1) return null;
            for (let e = 0, r = n.length; e < r; ++e) {
                const r = n[e];
                if (r < e) continue;
                const i = 2 * Math.floor(e / 3), a = 2 * Math.floor(r / 3), u = o[i], s = o[i + 1], l = o[a],
                    c = o[a + 1];
                this._renderSegment(u, s, l, c, t)
            }
            let u, s = i[i.length - 1];
            for (let e = 0; e < i.length; ++e) {
                u = s, s = i[e];
                const n = 2 * Math.floor(r[s] / 3), l = o[n], c = o[n + 1], f = 4 * u,
                    h = this._project(l, c, a[f + 2], a[f + 3]);
                h && this._renderSegment(l, c, h[0], h[1], t)
            }
            return e && e.value()
        }

        renderBounds(t) {
            const e = null == t ? t = new rC : void 0;
            return t.rect(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin), e && e.value()
        }

        renderCell(t, e) {
            const n = null == e ? e = new rC : void 0, r = this._clip(t);
            if (null === r || !r.length) return;
            e.moveTo(r[0], r[1]);
            let i = r.length;
            for (; r[0] === r[i - 2] && r[1] === r[i - 1] && i > 1;) i -= 2;
            for (let t = 2; t < i; t += 2) r[t] === r[t - 2] && r[t + 1] === r[t - 1] || e.lineTo(r[t], r[t + 1]);
            return e.closePath(), n && n.value()
        }

        * cellPolygons() {
            const {delaunay: {points: t}} = this;
            for (let e = 0, n = t.length / 2; e < n; ++e) {
                const t = this.cellPolygon(e);
                t && (t.index = e, yield t)
            }
        }

        cellPolygon(t) {
            const e = new iC;
            return this.renderCell(t, e), e.value()
        }

        _renderSegment(t, e, n, r, i) {
            let o;
            const a = this._regioncode(t, e), u = this._regioncode(n, r);
            0 === a && 0 === u ? (i.moveTo(t, e), i.lineTo(n, r)) : (o = this._clipSegment(t, e, n, r, a, u)) && (i.moveTo(o[0], o[1]), i.lineTo(o[2], o[3]))
        }

        contains(t, e, n) {
            return (e = +e) == e && (n = +n) == n && this.delaunay._step(t, e, n) === t
        }

        * neighbors(t) {
            const e = this._clip(t);
            if (e) for (const n of this.delaunay.neighbors(t)) {
                const t = this._clip(n);
                if (t) t:for (let r = 0, i = e.length; r < i; r += 2) for (let o = 0, a = t.length; o < a; o += 2) if (e[r] == t[o] && e[r + 1] == t[o + 1] && e[(r + 2) % i] == t[(o + a - 2) % a] && e[(r + 3) % i] == t[(o + a - 1) % a]) {
                    yield n;
                    break t
                }
            }
        }

        _cell(t) {
            const {circumcenters: e, delaunay: {inedges: n, halfedges: r, triangles: i}} = this, o = n[t];
            if (-1 === o) return null;
            const a = [];
            let u = o;
            do {
                const n = Math.floor(u / 3);
                if (a.push(e[2 * n], e[2 * n + 1]), u = u % 3 == 2 ? u - 2 : u + 1, i[u] !== t) break;
                u = r[u]
            } while (u !== o && -1 !== u);
            return a
        }

        _clip(t) {
            if (0 === t && 1 === this.delaunay.hull.length) return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
            const e = this._cell(t);
            if (null === e) return null;
            const {vectors: n} = this, r = 4 * t;
            return n[r] || n[r + 1] ? this._clipInfinite(t, e, n[r], n[r + 1], n[r + 2], n[r + 3]) : this._clipFinite(t, e)
        }

        _clipFinite(t, e) {
            const n = e.length;
            let r, i, o, a, u, s = null, l = e[n - 2], c = e[n - 1], f = this._regioncode(l, c);
            for (let h = 0; h < n; h += 2) if (r = l, i = c, l = e[h], c = e[h + 1], o = f, f = this._regioncode(l, c), 0 === o && 0 === f) a = u, u = 0, s ? s.push(l, c) : s = [l, c]; else {
                let e, n, h, d, p;
                if (0 === o) {
                    if (null === (e = this._clipSegment(r, i, l, c, o, f))) continue;
                    [n, h, d, p] = e
                } else {
                    if (null === (e = this._clipSegment(l, c, r, i, f, o))) continue;
                    [d, p, n, h] = e, a = u, u = this._edgecode(n, h), a && u && this._edge(t, a, u, s, s.length), s ? s.push(n, h) : s = [n, h]
                }
                a = u, u = this._edgecode(d, p), a && u && this._edge(t, a, u, s, s.length), s ? s.push(d, p) : s = [d, p]
            }
            if (s) a = u, u = this._edgecode(s[0], s[1]), a && u && this._edge(t, a, u, s, s.length); else if (this.contains(t, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2)) return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
            return s
        }

        _clipSegment(t, e, n, r, i, o) {
            for (; ;) {
                if (0 === i && 0 === o) return [t, e, n, r];
                if (i & o) return null;
                let a, u, s = i || o;
                8 & s ? (a = t + (n - t) * (this.ymax - e) / (r - e), u = this.ymax) : 4 & s ? (a = t + (n - t) * (this.ymin - e) / (r - e), u = this.ymin) : 2 & s ? (u = e + (r - e) * (this.xmax - t) / (n - t), a = this.xmax) : (u = e + (r - e) * (this.xmin - t) / (n - t), a = this.xmin), i ? (t = a, e = u, i = this._regioncode(t, e)) : (n = a, r = u, o = this._regioncode(n, r))
            }
        }

        _clipInfinite(t, e, n, r, i, o) {
            let a, u = Array.from(e);
            if ((a = this._project(u[0], u[1], n, r)) && u.unshift(a[0], a[1]), (a = this._project(u[u.length - 2], u[u.length - 1], i, o)) && u.push(a[0], a[1]), u = this._clipFinite(t, u)) for (let e, n = 0, r = u.length, i = this._edgecode(u[r - 2], u[r - 1]); n < r; n += 2) e = i, i = this._edgecode(u[n], u[n + 1]), e && i && (n = this._edge(t, e, i, u, n), r = u.length); else this.contains(t, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2) && (u = [this.xmin, this.ymin, this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax]);
            return u
        }

        _edge(t, e, n, r, i) {
            for (; e !== n;) {
                let n, o;
                switch (e) {
                    case 5:
                        e = 4;
                        continue;
                    case 4:
                        e = 6, n = this.xmax, o = this.ymin;
                        break;
                    case 6:
                        e = 2;
                        continue;
                    case 2:
                        e = 10, n = this.xmax, o = this.ymax;
                        break;
                    case 10:
                        e = 8;
                        continue;
                    case 8:
                        e = 9, n = this.xmin, o = this.ymax;
                        break;
                    case 9:
                        e = 1;
                        continue;
                    case 1:
                        e = 5, n = this.xmin, o = this.ymin
                }
                r[i] === n && r[i + 1] === o || !this.contains(t, n, o) || (r.splice(i, 0, n, o), i += 2)
            }
            if (r.length > 4) for (let t = 0; t < r.length; t += 2) {
                const e = (t + 2) % r.length, n = (t + 4) % r.length;
                (r[t] === r[e] && r[e] === r[n] || r[t + 1] === r[e + 1] && r[e + 1] === r[n + 1]) && (r.splice(e, 2), t -= 2)
            }
            return i
        }

        _project(t, e, n, r) {
            let i, o, a, u = 1 / 0;
            if (r < 0) {
                if (e <= this.ymin) return null;
                (i = (this.ymin - e) / r) < u && (a = this.ymin, o = t + (u = i) * n)
            } else if (r > 0) {
                if (e >= this.ymax) return null;
                (i = (this.ymax - e) / r) < u && (a = this.ymax, o = t + (u = i) * n)
            }
            if (n > 0) {
                if (t >= this.xmax) return null;
                (i = (this.xmax - t) / n) < u && (o = this.xmax, a = e + (u = i) * r)
            } else if (n < 0) {
                if (t <= this.xmin) return null;
                (i = (this.xmin - t) / n) < u && (o = this.xmin, a = e + (u = i) * r)
            }
            return [o, a]
        }

        _edgecode(t, e) {
            return (t === this.xmin ? 1 : t === this.xmax ? 2 : 0) | (e === this.ymin ? 4 : e === this.ymax ? 8 : 0)
        }

        _regioncode(t, e) {
            return (t < this.xmin ? 1 : t > this.xmax ? 2 : 0) | (e < this.ymin ? 4 : e > this.ymax ? 8 : 0)
        }
    }

    const aC = 2 * Math.PI, uC = Math.pow;

    function sC(t) {
        return t[0]
    }

    function lC(t) {
        return t[1]
    }

    function cC(t, e, n) {
        return [t + Math.sin(t + e) * n, e + Math.cos(t - e) * n]
    }

    class fC {
        static from(t, e = sC, n = lC, r) {
            return new fC("length" in t ? function (t, e, n, r) {
                const i = t.length, o = new Float64Array(2 * i);
                for (let a = 0; a < i; ++a) {
                    const i = t[a];
                    o[2 * a] = e.call(r, i, a, t), o[2 * a + 1] = n.call(r, i, a, t)
                }
                return o
            }(t, e, n, r) : Float64Array.from(function* (t, e, n, r) {
                let i = 0;
                for (const o of t) yield e.call(r, o, i, t), yield n.call(r, o, i, t), ++i
            }(t, e, n, r)))
        }

        constructor(t) {
            this._delaunator = new YD(t), this.inedges = new Int32Array(t.length / 2), this._hullIndex = new Int32Array(t.length / 2), this.points = this._delaunator.coords, this._init()
        }

        update() {
            return this._delaunator.update(), this._init(), this
        }

        _init() {
            const t = this._delaunator, e = this.points;
            if (t.hull && t.hull.length > 2 && function (t) {
                const {triangles: e, coords: n} = t;
                for (let t = 0; t < e.length; t += 3) {
                    const r = 2 * e[t], i = 2 * e[t + 1], o = 2 * e[t + 2];
                    if ((n[o] - n[r]) * (n[i + 1] - n[r + 1]) - (n[i] - n[r]) * (n[o + 1] - n[r + 1]) > 1e-10) return !1
                }
                return !0
            }(t)) {
                this.collinear = Int32Array.from({length: e.length / 2}, ((t, e) => e)).sort(((t, n) => e[2 * t] - e[2 * n] || e[2 * t + 1] - e[2 * n + 1]));
                const t = this.collinear[0], n = this.collinear[this.collinear.length - 1],
                    r = [e[2 * t], e[2 * t + 1], e[2 * n], e[2 * n + 1]],
                    i = 1e-8 * Math.hypot(r[3] - r[1], r[2] - r[0]);
                for (let t = 0, n = e.length / 2; t < n; ++t) {
                    const n = cC(e[2 * t], e[2 * t + 1], i);
                    e[2 * t] = n[0], e[2 * t + 1] = n[1]
                }
                this._delaunator = new YD(e)
            } else delete this.collinear;
            const n = this.halfedges = this._delaunator.halfedges, r = this.hull = this._delaunator.hull,
                i = this.triangles = this._delaunator.triangles, o = this.inedges.fill(-1),
                a = this._hullIndex.fill(-1);
            for (let t = 0, e = n.length; t < e; ++t) {
                const e = i[t % 3 == 2 ? t - 2 : t + 1];
                -1 !== n[t] && -1 !== o[e] || (o[e] = t)
            }
            for (let t = 0, e = r.length; t < e; ++t) a[r[t]] = t;
            r.length <= 2 && r.length > 0 && (this.triangles = new Int32Array(3).fill(-1), this.halfedges = new Int32Array(3).fill(-1), this.triangles[0] = r[0], this.triangles[1] = r[1], this.triangles[2] = r[1], o[r[0]] = 1, 2 === r.length && (o[r[1]] = 0))
        }

        voronoi(t) {
            return new oC(this, t)
        }

        * neighbors(t) {
            const {inedges: e, hull: n, _hullIndex: r, halfedges: i, triangles: o, collinear: a} = this;
            if (a) {
                const e = a.indexOf(t);
                return e > 0 && (yield a[e - 1]), void (e < a.length - 1 && (yield a[e + 1]))
            }
            const u = e[t];
            if (-1 === u) return;
            let s = u, l = -1;
            do {
                if (yield l = o[s], s = s % 3 == 2 ? s - 2 : s + 1, o[s] !== t) return;
                if (s = i[s], -1 === s) {
                    const e = n[(r[t] + 1) % n.length];
                    return void (e !== l && (yield e))
                }
            } while (s !== u)
        }

        find(t, e, n = 0) {
            if ((t = +t) != t || (e = +e) != e) return -1;
            const r = n;
            let i;
            for (; (i = this._step(n, t, e)) >= 0 && i !== n && i !== r;) n = i;
            return i
        }

        _step(t, e, n) {
            const {inedges: r, hull: i, _hullIndex: o, halfedges: a, triangles: u, points: s} = this;
            if (-1 === r[t] || !s.length) return (t + 1) % (s.length >> 1);
            let l = t, c = uC(e - s[2 * t], 2) + uC(n - s[2 * t + 1], 2);
            const f = r[t];
            let h = f;
            do {
                let r = u[h];
                const f = uC(e - s[2 * r], 2) + uC(n - s[2 * r + 1], 2);
                if (f < c && (c = f, l = r), h = h % 3 == 2 ? h - 2 : h + 1, u[h] !== t) break;
                if (h = a[h], -1 === h) {
                    if (h = i[(o[t] + 1) % i.length], h !== r && uC(e - s[2 * h], 2) + uC(n - s[2 * h + 1], 2) < c) return h;
                    break
                }
            } while (h !== f);
            return l
        }

        render(t) {
            const e = null == t ? t = new rC : void 0, {points: n, halfedges: r, triangles: i} = this;
            for (let e = 0, o = r.length; e < o; ++e) {
                const o = r[e];
                if (o < e) continue;
                const a = 2 * i[e], u = 2 * i[o];
                t.moveTo(n[a], n[a + 1]), t.lineTo(n[u], n[u + 1])
            }
            return this.renderHull(t), e && e.value()
        }

        renderPoints(t, e = 2) {
            const n = null == t ? t = new rC : void 0, {points: r} = this;
            for (let n = 0, i = r.length; n < i; n += 2) {
                const i = r[n], o = r[n + 1];
                t.moveTo(i + e, o), t.arc(i, o, e, 0, aC)
            }
            return n && n.value()
        }

        renderHull(t) {
            const e = null == t ? t = new rC : void 0, {hull: n, points: r} = this, i = 2 * n[0], o = n.length;
            t.moveTo(r[i], r[i + 1]);
            for (let e = 1; e < o; ++e) {
                const i = 2 * n[e];
                t.lineTo(r[i], r[i + 1])
            }
            return t.closePath(), e && e.value()
        }

        hullPolygon() {
            const t = new iC;
            return this.renderHull(t), t.value()
        }

        renderTriangle(t, e) {
            const n = null == e ? e = new rC : void 0, {points: r, triangles: i} = this, o = 2 * i[t *= 3],
                a = 2 * i[t + 1], u = 2 * i[t + 2];
            return e.moveTo(r[o], r[o + 1]), e.lineTo(r[a], r[a + 1]), e.lineTo(r[u], r[u + 1]), e.closePath(), n && n.value()
        }

        * trianglePolygons() {
            const {triangles: t} = this;
            for (let e = 0, n = t.length / 3; e < n; ++e) yield this.trianglePolygon(e)
        }

        trianglePolygon(t) {
            const e = new iC;
            return this.renderTriangle(t, e), e.value()
        }
    }

    function hC(t) {
        pa.call(this, null, t)
    }

    hC.Definition = {
        type: "Voronoi",
        metadata: {modifies: !0},
        params: [{name: "x", type: "field", required: !0}, {name: "y", type: "field", required: !0}, {
            name: "size",
            type: "number",
            array: !0,
            length: 2
        }, {
            name: "extent",
            type: "array",
            array: !0,
            length: 2,
            default: [[-1e5, -1e5], [1e5, 1e5]],
            content: {type: "number", array: !0, length: 2}
        }, {name: "as", type: "string", default: "path"}]
    };
    const dC = [-1e5, -1e5, 1e5, 1e5];

    function pC(t) {
        const e = t[0][0], n = t[0][1];
        let r = t.length - 1;
        for (; t[r][0] === e && t[r][1] === n; --r) ;
        return "M" + t.slice(0, r + 1).join("L") + "Z"
    }

    ut(hC, pa, {
        transform(t, e) {
            const n = t.as || "path", r = e.source;
            if (!r || !r.length) return e;
            let i = t.size;
            i = i ? [0, 0, i[0], i[1]] : (i = t.extent) ? [i[0][0], i[0][1], i[1][0], i[1][1]] : dC;
            const o = this.value = fC.from(r, t.x, t.y).voronoi(i);
            for (let t = 0, e = r.length; t < e; ++t) {
                const e = o.cellPolygon(t);
                r[t][n] = e ? pC(e) : null
            }
            return e.reflow(t.modified()).modifies(n)
        }
    });
    var gC = Object.freeze({__proto__: null, voronoi: hC}), mC = Math.PI / 180, yC = 2048;

    function vC() {
        var t, e, n, r, i, o, a, u = [256, 256], s = kC, l = [], c = Math.random, f = {};

        function h(t, e, n) {
            for (var r, i, o, a = e.x, l = e.y, f = Math.sqrt(u[0] * u[0] + u[1] * u[1]), h = s(u), d = c() < .5 ? 1 : -1, p = -d; (r = h(p += d)) && (i = ~~r[0], o = ~~r[1], !(Math.min(Math.abs(i), Math.abs(o)) >= f));) if (e.x = a + i, e.y = l + o, !(e.x + e.x0 < 0 || e.y + e.y0 < 0 || e.x + e.x1 > u[0] || e.y + e.y1 > u[1]) && (!n || !xC(e, t, u[0])) && (!n || wC(e, n))) {
                for (var g, m = e.sprite, y = e.width >> 5, v = u[0] >> 5, _ = e.x - (y << 4), x = 127 & _, b = 32 - x, w = e.y1 - e.y0, k = (e.y + e.y0) * v + (_ >> 5), M = 0; M < w; M++) {
                    g = 0;
                    for (var A = 0; A <= y; A++) t[k + A] |= g << b | (A < y ? (g = m[M * y + A]) >>> x : 0);
                    k += v
                }
                return e.sprite = null, !0
            }
            return !1
        }

        return f.layout = function () {
            for (var s = function (t) {
                t.width = t.height = 1;
                var e = Math.sqrt(t.getContext("2d").getImageData(0, 0, 1, 1).data.length >> 2);
                t.width = 2048 / e, t.height = yC / e;
                var n = t.getContext("2d");
                return n.fillStyle = n.strokeStyle = "red", n.textAlign = "center", {context: n, ratio: e}
            }(Gl()), f = function (t) {
                var e = [], n = -1;
                for (; ++n < t;) e[n] = 0;
                return e
            }((u[0] >> 5) * u[1]), d = null, p = l.length, g = -1, m = [], y = l.map((u => ({
                text: t(u),
                font: e(u),
                style: r(u),
                weight: i(u),
                rotate: o(u),
                size: ~~(n(u) + 1e-14),
                padding: a(u),
                xoff: 0,
                yoff: 0,
                x1: 0,
                y1: 0,
                x0: 0,
                y0: 0,
                hasText: !1,
                sprite: null,
                datum: u
            }))).sort(((t, e) => e.size - t.size)); ++g < p;) {
                var v = y[g];
                v.x = u[0] * (c() + .5) >> 1, v.y = u[1] * (c() + .5) >> 1, _C(s, v, y, g), v.hasText && h(f, v, d) && (m.push(v), d ? bC(d, v) : d = [{
                    x: v.x + v.x0,
                    y: v.y + v.y0
                }, {x: v.x + v.x1, y: v.y + v.y1}], v.x -= u[0] >> 1, v.y -= u[1] >> 1)
            }
            return m
        }, f.words = function (t) {
            return arguments.length ? (l = t, f) : l
        }, f.size = function (t) {
            return arguments.length ? (u = [+t[0], +t[1]], f) : u
        }, f.font = function (t) {
            return arguments.length ? (e = MC(t), f) : e
        }, f.fontStyle = function (t) {
            return arguments.length ? (r = MC(t), f) : r
        }, f.fontWeight = function (t) {
            return arguments.length ? (i = MC(t), f) : i
        }, f.rotate = function (t) {
            return arguments.length ? (o = MC(t), f) : o
        }, f.text = function (e) {
            return arguments.length ? (t = MC(e), f) : t
        }, f.spiral = function (t) {
            return arguments.length ? (s = AC[t] || t, f) : s
        }, f.fontSize = function (t) {
            return arguments.length ? (n = MC(t), f) : n
        }, f.padding = function (t) {
            return arguments.length ? (a = MC(t), f) : a
        }, f.random = function (t) {
            return arguments.length ? (c = t, f) : c
        }, f
    }

    function _C(t, e, n, r) {
        if (!e.sprite) {
            var i = t.context, o = t.ratio;
            i.clearRect(0, 0, 2048 / o, yC / o);
            var a, u, s, l, c, f = 0, h = 0, d = 0, p = n.length;
            for (--r; ++r < p;) {
                if (e = n[r], i.save(), i.font = e.style + " " + e.weight + " " + ~~((e.size + 1) / o) + "px " + e.font, a = i.measureText(e.text + "m").width * o, s = e.size << 1, e.rotate) {
                    var g = Math.sin(e.rotate * mC), m = Math.cos(e.rotate * mC), y = a * m, v = a * g, _ = s * m,
                        x = s * g;
                    a = Math.max(Math.abs(y + x), Math.abs(y - x)) + 31 >> 5 << 5, s = ~~Math.max(Math.abs(v + _), Math.abs(v - _))
                } else a = a + 31 >> 5 << 5;
                if (s > d && (d = s), f + a >= 2048 && (f = 0, h += d, d = 0), h + s >= yC) break;
                i.translate((f + (a >> 1)) / o, (h + (s >> 1)) / o), e.rotate && i.rotate(e.rotate * mC), i.fillText(e.text, 0, 0), e.padding && (i.lineWidth = 2 * e.padding, i.strokeText(e.text, 0, 0)), i.restore(), e.width = a, e.height = s, e.xoff = f, e.yoff = h, e.x1 = a >> 1, e.y1 = s >> 1, e.x0 = -e.x1, e.y0 = -e.y1, e.hasText = !0, f += a
            }
            for (var b = i.getImageData(0, 0, 2048 / o, yC / o).data, w = []; --r >= 0;) if ((e = n[r]).hasText) {
                for (u = (a = e.width) >> 5, s = e.y1 - e.y0, l = 0; l < s * u; l++) w[l] = 0;
                if (null == (f = e.xoff)) return;
                h = e.yoff;
                var k = 0, M = -1;
                for (c = 0; c < s; c++) {
                    for (l = 0; l < a; l++) {
                        var A = u * c + (l >> 5), E = b[2048 * (h + c) + (f + l) << 2] ? 1 << 31 - l % 32 : 0;
                        w[A] |= E, k |= E
                    }
                    k ? M = c : (e.y0++, s--, c--, h++)
                }
                e.y1 = e.y0 + M, e.sprite = w.slice(0, (e.y1 - e.y0) * u)
            }
        }
    }

    function xC(t, e, n) {
        n >>= 5;
        for (var r, i = t.sprite, o = t.width >> 5, a = t.x - (o << 4), u = 127 & a, s = 32 - u, l = t.y1 - t.y0, c = (t.y + t.y0) * n + (a >> 5), f = 0; f < l; f++) {
            r = 0;
            for (var h = 0; h <= o; h++) if ((r << s | (h < o ? (r = i[f * o + h]) >>> u : 0)) & e[c + h]) return !0;
            c += n
        }
        return !1
    }

    function bC(t, e) {
        var n = t[0], r = t[1];
        e.x + e.x0 < n.x && (n.x = e.x + e.x0), e.y + e.y0 < n.y && (n.y = e.y + e.y0), e.x + e.x1 > r.x && (r.x = e.x + e.x1), e.y + e.y1 > r.y && (r.y = e.y + e.y1)
    }

    function wC(t, e) {
        return t.x + t.x1 > e[0].x && t.x + t.x0 < e[1].x && t.y + t.y1 > e[0].y && t.y + t.y0 < e[1].y
    }

    function kC(t) {
        var e = t[0] / t[1];
        return function (t) {
            return [e * (t *= .1) * Math.cos(t), t * Math.sin(t)]
        }
    }

    function MC(t) {
        return "function" == typeof t ? t : function () {
            return t
        }
    }

    var AC = {
        archimedean: kC, rectangular: function (t) {
            var e = 4 * t[0] / t[1], n = 0, r = 0;
            return function (t) {
                var i = t < 0 ? -1 : 1;
                switch (Math.sqrt(1 + 4 * i * t) - i & 3) {
                    case 0:
                        n += e;
                        break;
                    case 1:
                        r += 4;
                        break;
                    case 2:
                        n -= e;
                        break;
                    default:
                        r -= 4
                }
                return [n, r]
            }
        }
    };
    const EC = ["x", "y", "font", "fontSize", "fontStyle", "fontWeight", "angle"],
        DC = ["text", "font", "rotate", "fontSize", "fontStyle", "fontWeight"];

    function CC(t) {
        pa.call(this, vC(), t)
    }

    CC.Definition = {
        type: "Wordcloud",
        metadata: {modifies: !0},
        params: [{name: "size", type: "number", array: !0, length: 2}, {
            name: "font",
            type: "string",
            expr: !0,
            default: "sans-serif"
        }, {name: "fontStyle", type: "string", expr: !0, default: "normal"}, {
            name: "fontWeight",
            type: "string",
            expr: !0,
            default: "normal"
        }, {name: "fontSize", type: "number", expr: !0, default: 14}, {
            name: "fontSizeRange",
            type: "number",
            array: "nullable",
            default: [10, 50]
        }, {name: "rotate", type: "number", expr: !0, default: 0}, {name: "text", type: "field"}, {
            name: "spiral",
            type: "string",
            values: ["archimedean", "rectangular"]
        }, {name: "padding", type: "number", expr: !0}, {name: "as", type: "string", array: !0, length: 7, default: EC}]
    }, ut(CC, pa, {
        transform(e, n) {
            !e.size || e.size[0] && e.size[1] || u("Wordcloud size dimensions must be non-zero.");
            const r = e.modified();
            if (!(r || n.changed(n.ADD_REM) || DC.some((function (t) {
                const r = e[t];
                return H(r) && n.modified(r.fields)
            })))) return;
            const i = n.materialize(n.SOURCE).source, o = this.value, a = e.as || EC;
            let s, l = e.fontSize || 14;
            if (H(l) ? s = e.fontSizeRange : l = Z(l), s) {
                const t = l, e = pd("sqrt")().domain(tt(i, t)).range(s);
                l = n => e(t(n))
            }
            i.forEach((t => {
                t[a[0]] = NaN, t[a[1]] = NaN, t[a[3]] = 0
            }));
            const c = o.words(i).text(e.text).size(e.size || [500, 500]).padding(e.padding || 1).spiral(e.spiral || "archimedean").rotate(e.rotate || 0).font(e.font || "sans-serif").fontStyle(e.fontStyle || "normal").fontWeight(e.fontWeight || "normal").fontSize(l).random(t.random).layout(),
                f = o.size(), h = f[0] >> 1, d = f[1] >> 1, p = c.length;
            for (let t, e, n = 0; n < p; ++n) t = c[n], e = t.datum, e[a[0]] = t.x + h, e[a[1]] = t.y + d, e[a[2]] = t.font, e[a[3]] = t.size, e[a[4]] = t.style, e[a[5]] = t.weight, e[a[6]] = t.rotate;
            return n.reflow(r).modifies(a)
        }
    });
    var FC = Object.freeze({__proto__: null, wordcloud: CC});
    const SC = t => new Uint8Array(t), BC = t => new Uint16Array(t), TC = t => new Uint32Array(t);

    function zC(t, e, n) {
        const r = (e < 257 ? SC : e < 65537 ? BC : TC)(t);
        return n && r.set(n), r
    }

    function NC(t, e, n) {
        const r = 1 << e;
        return {
            one: r, zero: ~r, range: n.slice(), bisect: t.bisect, index: t.index, size: t.size, onAdd(t, e) {
                const n = this, i = n.bisect(n.range, t.value), o = t.index, a = i[0], u = i[1], s = o.length;
                let l;
                for (l = 0; l < a; ++l) e[o[l]] |= r;
                for (l = u; l < s; ++l) e[o[l]] |= r;
                return n
            }
        }
    }

    function OC() {
        let t = TC(0), e = [], n = 0;
        return {
            insert: function (r, i, o) {
                if (!i.length) return [];
                const a = n, u = i.length, s = TC(u);
                let l, c, f, h = Array(u);
                for (f = 0; f < u; ++f) h[f] = r(i[f]), s[f] = f;
                if (h = function (t, e) {
                    return t.sort.call(e, ((e, n) => {
                        const r = t[e], i = t[n];
                        return r < i ? -1 : r > i ? 1 : 0
                    })), function (t, e) {
                        return Array.from(e, (e => t[e]))
                    }(t, e)
                }(h, s), a) l = e, c = t, e = Array(a + u), t = TC(a + u), function (t, e, n, r, i, o, a, u, s) {
                    let l, c = 0, f = 0;
                    for (l = 0; c < r && f < a; ++l) e[c] < i[f] ? (u[l] = e[c], s[l] = n[c++]) : (u[l] = i[f], s[l] = o[f++] + t);
                    for (; c < r; ++c, ++l) u[l] = e[c], s[l] = n[c];
                    for (; f < a; ++f, ++l) u[l] = i[f], s[l] = o[f] + t
                }(o, l, c, a, h, s, u, e, t); else {
                    if (o > 0) for (f = 0; f < u; ++f) s[f] += o;
                    e = h, t = s
                }
                return n = a + u, {index: s, value: h}
            }, remove: function (r, i) {
                const o = n;
                let a, u, s;
                for (u = 0; !i[t[u]] && u < o; ++u) ;
                for (s = u; u < o; ++u) i[a = t[u]] || (t[s] = a, e[s] = e[u], ++s);
                n = o - r
            }, bisect: function (t, r) {
                let i;
                return r ? i = r.length : (r = e, i = n), [xe(r, t[0], 0, i), _e(r, t[1], 0, i)]
            }, reindex: function (e) {
                for (let r = 0, i = n; r < i; ++r) t[r] = e[t[r]]
            }, index: () => t, size: () => n
        }
    }

    function RC(t) {
        pa.call(this, function () {
            let t = 8, e = [], n = TC(0), r = zC(0, t), i = zC(0, t);
            return {
                data: () => e,
                seen: () => n = function (t, e, n) {
                    return t.length >= e ? t : ((n = n || new t.constructor(e)).set(t), n)
                }(n, e.length),
                add(t) {
                    for (let n, r = 0, i = e.length, o = t.length; r < o; ++r) n = t[r], n._index = i++, e.push(n)
                },
                remove(t, n) {
                    const o = e.length, a = Array(o - t), u = e;
                    let s, l, c;
                    for (l = 0; !n[l] && l < o; ++l) a[l] = e[l], u[l] = l;
                    for (c = l; l < o; ++l) s = e[l], n[l] ? u[l] = -1 : (u[l] = c, r[c] = r[l], i[c] = i[l], a[c] = s, s._index = c++), r[l] = 0;
                    return e = a, u
                },
                size: () => e.length,
                curr: () => r,
                prev: () => i,
                reset: t => i[t] = r[t],
                all: () => t < 257 ? 255 : t < 65537 ? 65535 : 4294967295,
                set(t, e) {
                    r[t] |= e
                },
                clear(t, e) {
                    r[t] &= ~e
                },
                resize(e, n) {
                    (e > r.length || n > t) && (t = Math.max(n, t), r = zC(e, t, r), i = zC(e, t))
                }
            }
        }(), t), this._indices = null, this._dims = null
    }

    function LC(t) {
        pa.call(this, null, t)
    }

    RC.Definition = {
        type: "CrossFilter",
        metadata: {},
        params: [{name: "fields", type: "field", array: !0, required: !0}, {
            name: "query",
            type: "array",
            array: !0,
            required: !0,
            content: {type: "number", array: !0, length: 2}
        }]
    }, ut(RC, pa, {
        transform(t, e) {
            return this._dims ? t.modified("fields") || t.fields.some((t => e.modified(t.fields))) ? this.reinit(t, e) : this.eval(t, e) : this.init(t, e)
        }, init(t, e) {
            const n = t.fields, r = t.query, i = this._indices = {}, o = this._dims = [], a = r.length;
            let u, s, l = 0;
            for (; l < a; ++l) u = n[l].fname, s = i[u] || (i[u] = OC()), o.push(NC(s, l, r[l]));
            return this.eval(t, e)
        }, reinit(t, e) {
            const n = e.materialize().fork(), r = t.fields, i = t.query, o = this._indices, a = this._dims,
                u = this.value, s = u.curr(), l = u.prev(), c = u.all(), f = n.rem = n.add, h = n.mod, d = i.length,
                p = {};
            let g, m, y, v, _, x, b, w, k;
            if (l.set(s), e.rem.length && (_ = this.remove(t, e, n)), e.add.length && u.add(e.add), e.mod.length) for (x = {}, v = e.mod, b = 0, w = v.length; b < w; ++b) x[v[b]._index] = 1;
            for (b = 0; b < d; ++b) k = r[b], (!a[b] || t.modified("fields", b) || e.modified(k.fields)) && (y = k.fname, (g = p[y]) || (o[y] = m = OC(), p[y] = g = m.insert(k, e.source, 0)), a[b] = NC(m, b, i[b]).onAdd(g, s));
            for (b = 0, w = u.data().length; b < w; ++b) _[b] || (l[b] !== s[b] ? f.push(b) : x[b] && s[b] !== c && h.push(b));
            return u.mask = (1 << d) - 1, n
        }, eval(t, e) {
            const n = e.materialize().fork(), r = this._dims.length;
            let i = 0;
            return e.rem.length && (this.remove(t, e, n), i |= (1 << r) - 1), t.modified("query") && !t.modified("fields") && (i |= this.update(t, e, n)), e.add.length && (this.insert(t, e, n), i |= (1 << r) - 1), e.mod.length && (this.modify(e, n), i |= (1 << r) - 1), this.value.mask = i, n
        }, insert(t, e, n) {
            const r = e.add, i = this.value, o = this._dims, a = this._indices, u = t.fields, s = {}, l = n.add,
                c = i.size() + r.length, f = o.length;
            let h, d, p, g = i.size();
            i.resize(c, f), i.add(r);
            const m = i.curr(), y = i.prev(), v = i.all();
            for (h = 0; h < f; ++h) d = u[h].fname, p = s[d] || (s[d] = a[d].insert(u[h], r, g)), o[h].onAdd(p, m);
            for (; g < c; ++g) y[g] = v, m[g] !== v && l.push(g)
        }, modify(t, e) {
            const n = e.mod, r = this.value, i = r.curr(), o = r.all(), a = t.mod;
            let u, s, l;
            for (u = 0, s = a.length; u < s; ++u) l = a[u]._index, i[l] !== o && n.push(l)
        }, remove(t, e, n) {
            const r = this._indices, i = this.value, o = i.curr(), a = i.prev(), u = i.all(), s = {}, l = n.rem,
                c = e.rem;
            let f, h, d, p;
            for (f = 0, h = c.length; f < h; ++f) d = c[f]._index, s[d] = 1, a[d] = p = o[d], o[d] = u, p !== u && l.push(d);
            for (d in r) r[d].remove(h, s);
            return this.reindex(e, h, s), s
        }, reindex(t, e, n) {
            const r = this._indices, i = this.value;
            t.runAfter((() => {
                const t = i.remove(e, n);
                for (const e in r) r[e].reindex(t)
            }))
        }, update(t, e, n) {
            const r = this._dims, i = t.query, o = e.stamp, a = r.length;
            let u, s, l = 0;
            for (n.filters = 0, s = 0; s < a; ++s) t.modified("query", s) && (u = s, ++l);
            if (1 === l) l = r[u].one, this.incrementOne(r[u], i[u], n.add, n.rem); else for (s = 0, l = 0; s < a; ++s) t.modified("query", s) && (l |= r[s].one, this.incrementAll(r[s], i[s], o, n.add), n.rem = n.add);
            return l
        }, incrementAll(t, e, n, r) {
            const i = this.value, o = i.seen(), a = i.curr(), u = i.prev(), s = t.index(), l = t.bisect(t.range),
                c = t.bisect(e), f = c[0], h = c[1], d = l[0], p = l[1], g = t.one;
            let m, y, v;
            if (f < d) for (m = f, y = Math.min(d, h); m < y; ++m) v = s[m], o[v] !== n && (u[v] = a[v], o[v] = n, r.push(v)), a[v] ^= g; else if (f > d) for (m = d, y = Math.min(f, p); m < y; ++m) v = s[m], o[v] !== n && (u[v] = a[v], o[v] = n, r.push(v)), a[v] ^= g;
            if (h > p) for (m = Math.max(f, p), y = h; m < y; ++m) v = s[m], o[v] !== n && (u[v] = a[v], o[v] = n, r.push(v)), a[v] ^= g; else if (h < p) for (m = Math.max(d, h), y = p; m < y; ++m) v = s[m], o[v] !== n && (u[v] = a[v], o[v] = n, r.push(v)), a[v] ^= g;
            t.range = e.slice()
        }, incrementOne(t, e, n, r) {
            const i = this.value.curr(), o = t.index(), a = t.bisect(t.range), u = t.bisect(e), s = u[0], l = u[1],
                c = a[0], f = a[1], h = t.one;
            let d, p, g;
            if (s < c) for (d = s, p = Math.min(c, l); d < p; ++d) g = o[d], i[g] ^= h, n.push(g); else if (s > c) for (d = c, p = Math.min(s, f); d < p; ++d) g = o[d], i[g] ^= h, r.push(g);
            if (l > f) for (d = Math.max(s, f), p = l; d < p; ++d) g = o[d], i[g] ^= h, n.push(g); else if (l < f) for (d = Math.max(c, l), p = f; d < p; ++d) g = o[d], i[g] ^= h, r.push(g);
            t.range = e.slice()
        }
    }), LC.Definition = {
        type: "ResolveFilter",
        metadata: {},
        params: [{
            name: "ignore",
            type: "number",
            required: !0,
            description: "A bit mask indicating which filters to ignore."
        }, {
            name: "filter",
            type: "object",
            required: !0,
            description: "Per-tuple filter bitmaps from a CrossFilter transform."
        }]
    }, ut(LC, pa, {
        transform(t, e) {
            const n = ~(t.ignore || 0), r = t.filter, i = r.mask;
            if (0 == (i & n)) return e.StopPropagation;
            const o = e.fork(e.ALL), a = r.data(), u = r.curr(), s = r.prev(), l = t => u[t] & n ? null : a[t];
            return o.filter(o.MOD, l), i & i - 1 ? (o.filter(o.ADD, (t => {
                const e = u[t] & n;
                return !e && e ^ s[t] & n ? a[t] : null
            })), o.filter(o.REM, (t => {
                const e = u[t] & n;
                return e && !(e ^ e ^ s[t] & n) ? a[t] : null
            }))) : (o.filter(o.ADD, l), o.filter(o.REM, (t => (u[t] & n) === i ? a[t] : null))), o.filter(o.SOURCE, (t => l(t._index)))
        }
    });
    var UC = Object.freeze({__proto__: null, crossfilter: RC, resolvefilter: LC});
    const qC = "RawCode", PC = "Literal", jC = "Property", IC = "Identifier", $C = "ArrayExpression",
        WC = "BinaryExpression", HC = "CallExpression", YC = "ConditionalExpression", VC = "LogicalExpression",
        GC = "MemberExpression", XC = "ObjectExpression", JC = "UnaryExpression";

    function ZC(t) {
        this.type = t
    }

    var QC, KC, tF, eF, nF;
    ZC.prototype.visit = function (t) {
        let e, n, r;
        if (t(this)) return 1;
        for (e = function (t) {
            switch (t.type) {
                case $C:
                    return t.elements;
                case WC:
                case VC:
                    return [t.left, t.right];
                case HC:
                    return [t.callee].concat(t.arguments);
                case YC:
                    return [t.test, t.consequent, t.alternate];
                case GC:
                    return [t.object, t.property];
                case XC:
                    return t.properties;
                case jC:
                    return [t.key, t.value];
                case JC:
                    return [t.argument];
                case IC:
                case PC:
                case qC:
                default:
                    return []
            }
        }(this), n = 0, r = e.length; n < r; ++n) if (e[n].visit(t)) return 1
    };
    (QC = {})[1] = "Boolean", QC[2] = "<end>", QC[3] = "Identifier", QC[4] = "Keyword", QC[5] = "Null", QC[6] = "Numeric", QC[7] = "Punctuator", QC[8] = "String", QC[9] = "RegularExpression";
    var rF = "Identifier", iF = "Unexpected token %0", oF = "Invalid regular expression",
        aF = "Invalid regular expression: missing /", uF = "Octal literals are not allowed in strict mode.",
        sF = "ILLEGAL", lF = "Disabled.",
        cF = new RegExp("[\\xAA\\xB5\\xBA\\xC0-\\xD6\\xD8-\\xF6\\xF8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u037F\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u052F\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0620-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0800-\\u0815\\u081A\\u0824\\u0828\\u0840-\\u0858\\u08A0-\\u08B2\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971-\\u0980\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0CF1\\u0CF2\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC-\\u0EDF\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16EE-\\u16F8\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1AA7\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1BBA-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1CE9-\\u1CEC\\u1CEE-\\u1CF1\\u1CF5\\u1CF6\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u209C\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2160-\\u2188\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CEE\\u2CF2\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FCC\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA66E\\uA67F-\\uA69D\\uA6A0-\\uA6EF\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA78E\\uA790-\\uA7AD\\uA7B0\\uA7B1\\uA7F7-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uA9CF\\uA9E0-\\uA9E4\\uA9E6-\\uA9EF\\uA9FA-\\uA9FE\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA76\\uAA7A\\uAA7E-\\uAAAF\\uAAB1\\uAAB5\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEA\\uAAF2-\\uAAF4\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uAB30-\\uAB5A\\uAB5C-\\uAB5F\\uAB64\\uAB65\\uABC0-\\uABE2\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]"),
        fF = new RegExp("[\\xAA\\xB5\\xBA\\xC0-\\xD6\\xD8-\\xF6\\xF8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0300-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u037F\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u0483-\\u0487\\u048A-\\u052F\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0610-\\u061A\\u0620-\\u0669\\u066E-\\u06D3\\u06D5-\\u06DC\\u06DF-\\u06E8\\u06EA-\\u06FC\\u06FF\\u0710-\\u074A\\u074D-\\u07B1\\u07C0-\\u07F5\\u07FA\\u0800-\\u082D\\u0840-\\u085B\\u08A0-\\u08B2\\u08E4-\\u0963\\u0966-\\u096F\\u0971-\\u0983\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BC-\\u09C4\\u09C7\\u09C8\\u09CB-\\u09CE\\u09D7\\u09DC\\u09DD\\u09DF-\\u09E3\\u09E6-\\u09F1\\u0A01-\\u0A03\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A3C\\u0A3E-\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A59-\\u0A5C\\u0A5E\\u0A66-\\u0A75\\u0A81-\\u0A83\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABC-\\u0AC5\\u0AC7-\\u0AC9\\u0ACB-\\u0ACD\\u0AD0\\u0AE0-\\u0AE3\\u0AE6-\\u0AEF\\u0B01-\\u0B03\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3C-\\u0B44\\u0B47\\u0B48\\u0B4B-\\u0B4D\\u0B56\\u0B57\\u0B5C\\u0B5D\\u0B5F-\\u0B63\\u0B66-\\u0B6F\\u0B71\\u0B82\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BBE-\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCD\\u0BD0\\u0BD7\\u0BE6-\\u0BEF\\u0C00-\\u0C03\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D-\\u0C44\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C58\\u0C59\\u0C60-\\u0C63\\u0C66-\\u0C6F\\u0C81-\\u0C83\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBC-\\u0CC4\\u0CC6-\\u0CC8\\u0CCA-\\u0CCD\\u0CD5\\u0CD6\\u0CDE\\u0CE0-\\u0CE3\\u0CE6-\\u0CEF\\u0CF1\\u0CF2\\u0D01-\\u0D03\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D-\\u0D44\\u0D46-\\u0D48\\u0D4A-\\u0D4E\\u0D57\\u0D60-\\u0D63\\u0D66-\\u0D6F\\u0D7A-\\u0D7F\\u0D82\\u0D83\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0DCA\\u0DCF-\\u0DD4\\u0DD6\\u0DD8-\\u0DDF\\u0DE6-\\u0DEF\\u0DF2\\u0DF3\\u0E01-\\u0E3A\\u0E40-\\u0E4E\\u0E50-\\u0E59\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB9\\u0EBB-\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EC8-\\u0ECD\\u0ED0-\\u0ED9\\u0EDC-\\u0EDF\\u0F00\\u0F18\\u0F19\\u0F20-\\u0F29\\u0F35\\u0F37\\u0F39\\u0F3E-\\u0F47\\u0F49-\\u0F6C\\u0F71-\\u0F84\\u0F86-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u1000-\\u1049\\u1050-\\u109D\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u135D-\\u135F\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16EE-\\u16F8\\u1700-\\u170C\\u170E-\\u1714\\u1720-\\u1734\\u1740-\\u1753\\u1760-\\u176C\\u176E-\\u1770\\u1772\\u1773\\u1780-\\u17D3\\u17D7\\u17DC\\u17DD\\u17E0-\\u17E9\\u180B-\\u180D\\u1810-\\u1819\\u1820-\\u1877\\u1880-\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1920-\\u192B\\u1930-\\u193B\\u1946-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19B0-\\u19C9\\u19D0-\\u19D9\\u1A00-\\u1A1B\\u1A20-\\u1A5E\\u1A60-\\u1A7C\\u1A7F-\\u1A89\\u1A90-\\u1A99\\u1AA7\\u1AB0-\\u1ABD\\u1B00-\\u1B4B\\u1B50-\\u1B59\\u1B6B-\\u1B73\\u1B80-\\u1BF3\\u1C00-\\u1C37\\u1C40-\\u1C49\\u1C4D-\\u1C7D\\u1CD0-\\u1CD2\\u1CD4-\\u1CF6\\u1CF8\\u1CF9\\u1D00-\\u1DF5\\u1DFC-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u200C\\u200D\\u203F\\u2040\\u2054\\u2071\\u207F\\u2090-\\u209C\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2160-\\u2188\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D7F-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2DE0-\\u2DFF\\u2E2F\\u3005-\\u3007\\u3021-\\u302F\\u3031-\\u3035\\u3038-\\u303C\\u3041-\\u3096\\u3099\\u309A\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FCC\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA62B\\uA640-\\uA66F\\uA674-\\uA67D\\uA67F-\\uA69D\\uA69F-\\uA6F1\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA78E\\uA790-\\uA7AD\\uA7B0\\uA7B1\\uA7F7-\\uA827\\uA840-\\uA873\\uA880-\\uA8C4\\uA8D0-\\uA8D9\\uA8E0-\\uA8F7\\uA8FB\\uA900-\\uA92D\\uA930-\\uA953\\uA960-\\uA97C\\uA980-\\uA9C0\\uA9CF-\\uA9D9\\uA9E0-\\uA9FE\\uAA00-\\uAA36\\uAA40-\\uAA4D\\uAA50-\\uAA59\\uAA60-\\uAA76\\uAA7A-\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEF\\uAAF2-\\uAAF6\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uAB30-\\uAB5A\\uAB5C-\\uAB5F\\uAB64\\uAB65\\uABC0-\\uABEA\\uABEC\\uABED\\uABF0-\\uABF9\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE00-\\uFE0F\\uFE20-\\uFE2D\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF10-\\uFF19\\uFF21-\\uFF3A\\uFF3F\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]");

    function hF(t, e) {
        if (!t) throw new Error("ASSERT: " + e)
    }

    function dF(t) {
        return t >= 48 && t <= 57
    }

    function pF(t) {
        return "0123456789abcdefABCDEF".indexOf(t) >= 0
    }

    function gF(t) {
        return "01234567".indexOf(t) >= 0
    }

    function mF(t) {
        return 32 === t || 9 === t || 11 === t || 12 === t || 160 === t || t >= 5760 && [5760, 6158, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8239, 8287, 12288, 65279].indexOf(t) >= 0
    }

    function yF(t) {
        return 10 === t || 13 === t || 8232 === t || 8233 === t
    }

    function vF(t) {
        return 36 === t || 95 === t || t >= 65 && t <= 90 || t >= 97 && t <= 122 || 92 === t || t >= 128 && cF.test(String.fromCharCode(t))
    }

    function _F(t) {
        return 36 === t || 95 === t || t >= 65 && t <= 90 || t >= 97 && t <= 122 || t >= 48 && t <= 57 || 92 === t || t >= 128 && fF.test(String.fromCharCode(t))
    }

    const xF = {
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

    function bF() {
        for (; tF < eF;) {
            const t = KC.charCodeAt(tF);
            if (!mF(t) && !yF(t)) break;
            ++tF
        }
    }

    function wF(t) {
        var e, n, r, i = 0;
        for (n = "u" === t ? 4 : 2, e = 0; e < n; ++e) tF < eF && pF(KC[tF]) ? (r = KC[tF++], i = 16 * i + "0123456789abcdef".indexOf(r.toLowerCase())) : UF({}, iF, sF);
        return String.fromCharCode(i)
    }

    function kF() {
        var t, e, n, r;
        for (e = 0, "}" === (t = KC[tF]) && UF({}, iF, sF); tF < eF && pF(t = KC[tF++]);) e = 16 * e + "0123456789abcdef".indexOf(t.toLowerCase());
        return (e > 1114111 || "}" !== t) && UF({}, iF, sF), e <= 65535 ? String.fromCharCode(e) : (n = 55296 + (e - 65536 >> 10), r = 56320 + (e - 65536 & 1023), String.fromCharCode(n, r))
    }

    function MF() {
        var t, e;
        for (t = KC.charCodeAt(tF++), e = String.fromCharCode(t), 92 === t && (117 !== KC.charCodeAt(tF) && UF({}, iF, sF), ++tF, (t = wF("u")) && "\\" !== t && vF(t.charCodeAt(0)) || UF({}, iF, sF), e = t); tF < eF && _F(t = KC.charCodeAt(tF));) ++tF, e += String.fromCharCode(t), 92 === t && (e = e.substr(0, e.length - 1), 117 !== KC.charCodeAt(tF) && UF({}, iF, sF), ++tF, (t = wF("u")) && "\\" !== t && _F(t.charCodeAt(0)) || UF({}, iF, sF), e += t);
        return e
    }

    function AF() {
        var t, e;
        return t = tF, {
            type: 1 === (e = 92 === KC.charCodeAt(tF) ? MF() : function () {
                var t, e;
                for (t = tF++; tF < eF;) {
                    if (92 === (e = KC.charCodeAt(tF))) return tF = t, MF();
                    if (!_F(e)) break;
                    ++tF
                }
                return KC.slice(t, tF)
            }()).length ? 3 : xF.hasOwnProperty(e) ? 4 : "null" === e ? 5 : "true" === e || "false" === e ? 1 : 3,
            value: e,
            start: t,
            end: tF
        }
    }

    function EF() {
        var t, e, n, r, i = tF, o = KC.charCodeAt(tF), a = KC[tF];
        switch (o) {
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
                return ++tF, {type: 7, value: String.fromCharCode(o), start: i, end: tF};
            default:
                if (61 === (t = KC.charCodeAt(tF + 1))) switch (o) {
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
                        return tF += 2, {
                            type: 7,
                            value: String.fromCharCode(o) + String.fromCharCode(t),
                            start: i,
                            end: tF
                        };
                    case 33:
                    case 61:
                        return tF += 2, 61 === KC.charCodeAt(tF) && ++tF, {
                            type: 7,
                            value: KC.slice(i, tF),
                            start: i,
                            end: tF
                        }
                }
        }
        return ">>>=" === (r = KC.substr(tF, 4)) ? {
            type: 7,
            value: r,
            start: i,
            end: tF += 4
        } : ">>>" === (n = r.substr(0, 3)) || "<<=" === n || ">>=" === n ? {
            type: 7,
            value: n,
            start: i,
            end: tF += 3
        } : a === (e = n.substr(0, 2))[1] && "+-<>&|".indexOf(a) >= 0 || "=>" === e ? {
            type: 7,
            value: e,
            start: i,
            end: tF += 2
        } : "<>=!+-*%&|^/".indexOf(a) >= 0 ? {type: 7, value: a, start: i, end: ++tF} : void UF({}, iF, sF)
    }

    function DF() {
        var t, e, n;
        if (hF(dF((n = KC[tF]).charCodeAt(0)) || "." === n, "Numeric literal must start with a decimal digit or a decimal point"), e = tF, t = "", "." !== n) {
            if (t = KC[tF++], n = KC[tF], "0" === t) {
                if ("x" === n || "X" === n) return ++tF, function (t) {
                    let e = "";
                    for (; tF < eF && pF(KC[tF]);) e += KC[tF++];
                    return 0 === e.length && UF({}, iF, sF), vF(KC.charCodeAt(tF)) && UF({}, iF, sF), {
                        type: 6,
                        value: parseInt("0x" + e, 16),
                        start: t,
                        end: tF
                    }
                }(e);
                if (gF(n)) return function (t) {
                    let e = "0" + KC[tF++];
                    for (; tF < eF && gF(KC[tF]);) e += KC[tF++];
                    return (vF(KC.charCodeAt(tF)) || dF(KC.charCodeAt(tF))) && UF({}, iF, sF), {
                        type: 6,
                        value: parseInt(e, 8),
                        octal: !0,
                        start: t,
                        end: tF
                    }
                }(e);
                n && dF(n.charCodeAt(0)) && UF({}, iF, sF)
            }
            for (; dF(KC.charCodeAt(tF));) t += KC[tF++];
            n = KC[tF]
        }
        if ("." === n) {
            for (t += KC[tF++]; dF(KC.charCodeAt(tF));) t += KC[tF++];
            n = KC[tF]
        }
        if ("e" === n || "E" === n) if (t += KC[tF++], "+" !== (n = KC[tF]) && "-" !== n || (t += KC[tF++]), dF(KC.charCodeAt(tF))) for (; dF(KC.charCodeAt(tF));) t += KC[tF++]; else UF({}, iF, sF);
        return vF(KC.charCodeAt(tF)) && UF({}, iF, sF), {type: 6, value: parseFloat(t), start: e, end: tF}
    }

    function CF() {
        var t, e, n, r;
        return nF = null, bF(), t = tF, e = function () {
            var t, e, n, r;
            for (hF("/" === (t = KC[tF]), "Regular expression literal must start with a slash"), e = KC[tF++], n = !1, r = !1; tF < eF;) if (e += t = KC[tF++], "\\" === t) yF((t = KC[tF++]).charCodeAt(0)) && UF({}, aF), e += t; else if (yF(t.charCodeAt(0))) UF({}, aF); else if (n) "]" === t && (n = !1); else {
                if ("/" === t) {
                    r = !0;
                    break
                }
                "[" === t && (n = !0)
            }
            return r || UF({}, aF), {value: e.substr(1, e.length - 2), literal: e}
        }(), n = function () {
            var t, e, n;
            for (e = "", n = ""; tF < eF && _F((t = KC[tF]).charCodeAt(0));) ++tF, "\\" === t && tF < eF ? UF({}, iF, sF) : (n += t, e += t);
            return n.search(/[^gimuy]/g) >= 0 && UF({}, oF, n), {value: n, literal: e}
        }(), r = function (t, e) {
            let n = t;
            e.indexOf("u") >= 0 && (n = n.replace(/\\u\{([0-9a-fA-F]+)\}/g, ((t, e) => {
                if (parseInt(e, 16) <= 1114111) return "x";
                UF({}, oF)
            })).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "x"));
            try {
                new RegExp(n)
            } catch (t) {
                UF({}, oF)
            }
            try {
                return new RegExp(t, e)
            } catch (t) {
                return null
            }
        }(e.value, n.value), {
            literal: e.literal + n.literal,
            value: r,
            regex: {pattern: e.value, flags: n.value},
            start: t,
            end: tF
        }
    }

    function FF() {
        if (bF(), tF >= eF) return {type: 2, start: tF, end: tF};
        const t = KC.charCodeAt(tF);
        return vF(t) ? AF() : 40 === t || 41 === t || 59 === t ? EF() : 39 === t || 34 === t ? function () {
            var t, e, n, r, i = "", o = !1;
            for (hF("'" === (t = KC[tF]) || '"' === t, "String literal must starts with a quote"), e = tF, ++tF; tF < eF;) {
                if ((n = KC[tF++]) === t) {
                    t = "";
                    break
                }
                if ("\\" === n) if ((n = KC[tF++]) && yF(n.charCodeAt(0))) "\r" === n && "\n" === KC[tF] && ++tF; else switch (n) {
                    case"u":
                    case"x":
                        "{" === KC[tF] ? (++tF, i += kF()) : i += wF(n);
                        break;
                    case"n":
                        i += "\n";
                        break;
                    case"r":
                        i += "\r";
                        break;
                    case"t":
                        i += "\t";
                        break;
                    case"b":
                        i += "\b";
                        break;
                    case"f":
                        i += "\f";
                        break;
                    case"v":
                        i += "\v";
                        break;
                    default:
                        gF(n) ? (0 !== (r = "01234567".indexOf(n)) && (o = !0), tF < eF && gF(KC[tF]) && (o = !0, r = 8 * r + "01234567".indexOf(KC[tF++]), "0123".indexOf(n) >= 0 && tF < eF && gF(KC[tF]) && (r = 8 * r + "01234567".indexOf(KC[tF++]))), i += String.fromCharCode(r)) : i += n
                } else {
                    if (yF(n.charCodeAt(0))) break;
                    i += n
                }
            }
            return "" !== t && UF({}, iF, sF), {type: 8, value: i, octal: o, start: e, end: tF}
        }() : 46 === t ? dF(KC.charCodeAt(tF + 1)) ? DF() : EF() : dF(t) ? DF() : EF()
    }

    function SF() {
        const t = nF;
        return tF = t.end, nF = FF(), tF = t.end, t
    }

    function BF() {
        const t = tF;
        nF = FF(), tF = t
    }

    function TF(t, e, n) {
        const r = new ZC("||" === t || "&&" === t ? "LogicalExpression" : "BinaryExpression");
        return r.operator = t, r.left = e, r.right = n, r
    }

    function zF(t, e) {
        const n = new ZC("CallExpression");
        return n.callee = t, n.arguments = e, n
    }

    function NF(t) {
        const e = new ZC(rF);
        return e.name = t, e
    }

    function OF(t) {
        const e = new ZC("Literal");
        return e.value = t.value, e.raw = KC.slice(t.start, t.end), t.regex && ("//" === e.raw && (e.raw = "/(?:)/"), e.regex = t.regex), e
    }

    function RF(t, e, n) {
        const r = new ZC("MemberExpression");
        return r.computed = "[" === t, r.object = e, r.property = n, r.computed || (n.member = !0), r
    }

    function LF(t, e, n) {
        const r = new ZC("Property");
        return r.key = e, r.value = n, r.kind = t, r
    }

    function UF(t, e) {
        var n, r = Array.prototype.slice.call(arguments, 2),
            i = e.replace(/%(\d)/g, ((t, e) => (hF(e < r.length, "Message reference must be in range"), r[e])));
        throw(n = new Error(i)).index = tF, n.description = i, n
    }

    function qF(t) {
        2 === t.type && UF(t, "Unexpected end of input"), 6 === t.type && UF(t, "Unexpected number"), 8 === t.type && UF(t, "Unexpected string"), 3 === t.type && UF(t, "Unexpected identifier"), 4 === t.type && UF(t, "Unexpected reserved word"), UF(t, iF, t.value)
    }

    function PF(t) {
        const e = SF();
        7 === e.type && e.value === t || qF(e)
    }

    function jF(t) {
        return 7 === nF.type && nF.value === t
    }

    function IF(t) {
        return 4 === nF.type && nF.value === t
    }

    function $F() {
        const t = [];
        for (tF = nF.start, PF("["); !jF("]");) jF(",") ? (SF(), t.push(null)) : (t.push(eS()), jF("]") || PF(","));
        return SF(), function (t) {
            const e = new ZC("ArrayExpression");
            return e.elements = t, e
        }(t)
    }

    function WF() {
        tF = nF.start;
        const t = SF();
        return 8 === t.type || 6 === t.type ? (t.octal && UF(t, uF), OF(t)) : NF(t.value)
    }

    function HF() {
        var t, e, n;
        return tF = nF.start, 3 === (t = nF).type ? (n = WF(), PF(":"), LF("init", n, eS())) : 2 !== t.type && 7 !== t.type ? (e = WF(), PF(":"), LF("init", e, eS())) : void qF(t)
    }

    function YF() {
        var t, e, n = [], r = {}, i = String;
        for (tF = nF.start, PF("{"); !jF("}");) e = "$" + ((t = HF()).key.type === rF ? t.key.name : i(t.key.value)), Object.prototype.hasOwnProperty.call(r, e) ? UF({}, "Duplicate data property in object literal not allowed in strict mode") : r[e] = !0, n.push(t), jF("}") || PF(",");
        return PF("}"), function (t) {
            const e = new ZC("ObjectExpression");
            return e.properties = t, e
        }(n)
    }

    const VF = {if: 1};

    function GF() {
        var t, e, n;
        if (jF("(")) return function () {
            PF("(");
            const t = nS();
            return PF(")"), t
        }();
        if (jF("[")) return $F();
        if (jF("{")) return YF();
        if (t = nF.type, tF = nF.start, 3 === t || VF[nF.value]) n = NF(SF().value); else if (8 === t || 6 === t) nF.octal && UF(nF, uF), n = OF(SF()); else {
            if (4 === t) throw new Error(lF);
            1 === t ? ((e = SF()).value = "true" === e.value, n = OF(e)) : 5 === t ? ((e = SF()).value = null, n = OF(e)) : jF("/") || jF("/=") ? (n = OF(CF()), BF()) : qF(SF())
        }
        return n
    }

    function XF() {
        const t = [];
        if (PF("("), !jF(")")) for (; tF < eF && (t.push(eS()), !jF(")"));) PF(",");
        return PF(")"), t
    }

    function JF() {
        return PF("."), function () {
            tF = nF.start;
            const t = SF();
            return function (t) {
                return 3 === t.type || 4 === t.type || 1 === t.type || 5 === t.type
            }(t) || qF(t), NF(t.value)
        }()
    }

    function ZF() {
        PF("[");
        const t = nS();
        return PF("]"), t
    }

    function QF() {
        const t = function () {
            var t;
            for (t = GF(); ;) if (jF(".")) t = RF(".", t, JF()); else if (jF("(")) t = zF(t, XF()); else {
                if (!jF("[")) break;
                t = RF("[", t, ZF())
            }
            return t
        }();
        if (7 === nF.type && (jF("++") || jF("--"))) throw new Error(lF);
        return t
    }

    function KF() {
        var t, e;
        if (7 !== nF.type && 4 !== nF.type) e = QF(); else {
            if (jF("++") || jF("--")) throw new Error(lF);
            if (jF("+") || jF("-") || jF("~") || jF("!")) t = SF(), e = KF(), e = function (t, e) {
                const n = new ZC("UnaryExpression");
                return n.operator = t, n.argument = e, n.prefix = !0, n
            }(t.value, e); else {
                if (IF("delete") || IF("void") || IF("typeof")) throw new Error(lF);
                e = QF()
            }
        }
        return e
    }

    function tS(t) {
        let e = 0;
        if (7 !== t.type && 4 !== t.type) return 0;
        switch (t.value) {
            case"||":
                e = 1;
                break;
            case"&&":
                e = 2;
                break;
            case"|":
                e = 3;
                break;
            case"^":
                e = 4;
                break;
            case"&":
                e = 5;
                break;
            case"==":
            case"!=":
            case"===":
            case"!==":
                e = 6;
                break;
            case"<":
            case">":
            case"<=":
            case">=":
            case"instanceof":
            case"in":
                e = 7;
                break;
            case"<<":
            case">>":
            case">>>":
                e = 8;
                break;
            case"+":
            case"-":
                e = 9;
                break;
            case"*":
            case"/":
            case"%":
                e = 11
        }
        return e
    }

    function eS() {
        var t, e;
        return t = function () {
            var t, e, n, r, i, o, a, u, s, l;
            if (t = nF, s = KF(), 0 === (i = tS(r = nF))) return s;
            for (r.prec = i, SF(), e = [t, nF], o = [s, r, a = KF()]; (i = tS(nF)) > 0;) {
                for (; o.length > 2 && i <= o[o.length - 2].prec;) a = o.pop(), u = o.pop().value, s = o.pop(), e.pop(), n = TF(u, s, a), o.push(n);
                (r = SF()).prec = i, o.push(r), e.push(nF), n = KF(), o.push(n)
            }
            for (n = o[l = o.length - 1], e.pop(); l > 1;) e.pop(), n = TF(o[l - 1].value, o[l - 2], n), l -= 2;
            return n
        }(), jF("?") && (SF(), e = eS(), PF(":"), t = function (t, e, n) {
            const r = new ZC("ConditionalExpression");
            return r.test = t, r.consequent = e, r.alternate = n, r
        }(t, e, eS())), t
    }

    function nS() {
        const t = eS();
        if (jF(",")) throw new Error(lF);
        return t
    }

    var rS = {
        NaN: "NaN",
        E: "Math.E",
        LN2: "Math.LN2",
        LN10: "Math.LN10",
        LOG2E: "Math.LOG2E",
        LOG10E: "Math.LOG10E",
        PI: "Math.PI",
        SQRT1_2: "Math.SQRT1_2",
        SQRT2: "Math.SQRT2",
        MIN_VALUE: "Number.MIN_VALUE",
        MAX_VALUE: "Number.MAX_VALUE"
    };

    function iS(t) {
        function e(e, n, r) {
            return i => function (e, n, r, i) {
                let o = t(n[0]);
                return r && (o = r + "(" + o + ")", 0 === r.lastIndexOf("new ", 0) && (o = "(" + o + ")")), o + "." + e + (i < 0 ? "" : 0 === i ? "()" : "(" + n.slice(1).map(t).join(",") + ")")
            }(e, i, n, r)
        }

        const n = "new Date", r = "String", i = "RegExp";
        return {
            isNaN: "Number.isNaN",
            isFinite: "Number.isFinite",
            abs: "Math.abs",
            acos: "Math.acos",
            asin: "Math.asin",
            atan: "Math.atan",
            atan2: "Math.atan2",
            ceil: "Math.ceil",
            cos: "Math.cos",
            exp: "Math.exp",
            floor: "Math.floor",
            log: "Math.log",
            max: "Math.max",
            min: "Math.min",
            pow: "Math.pow",
            random: "Math.random",
            round: "Math.round",
            sin: "Math.sin",
            sqrt: "Math.sqrt",
            tan: "Math.tan",
            clamp: function (e) {
                e.length < 3 && u("Missing arguments to clamp function."), e.length > 3 && u("Too many arguments to clamp function.");
                const n = e.map(t);
                return "Math.max(" + n[1] + ", Math.min(" + n[2] + "," + n[0] + "))"
            },
            now: "Date.now",
            utc: "Date.UTC",
            datetime: n,
            date: e("getDate", n, 0),
            day: e("getDay", n, 0),
            year: e("getFullYear", n, 0),
            month: e("getMonth", n, 0),
            hours: e("getHours", n, 0),
            minutes: e("getMinutes", n, 0),
            seconds: e("getSeconds", n, 0),
            milliseconds: e("getMilliseconds", n, 0),
            time: e("getTime", n, 0),
            timezoneoffset: e("getTimezoneOffset", n, 0),
            utcdate: e("getUTCDate", n, 0),
            utcday: e("getUTCDay", n, 0),
            utcyear: e("getUTCFullYear", n, 0),
            utcmonth: e("getUTCMonth", n, 0),
            utchours: e("getUTCHours", n, 0),
            utcminutes: e("getUTCMinutes", n, 0),
            utcseconds: e("getUTCSeconds", n, 0),
            utcmilliseconds: e("getUTCMilliseconds", n, 0),
            length: e("length", null, -1),
            join: e("join", null),
            indexof: e("indexOf", null),
            lastindexof: e("lastIndexOf", null),
            slice: e("slice", null),
            reverse: function (e) {
                return "(" + t(e[0]) + ").slice().reverse()"
            },
            parseFloat: "parseFloat",
            parseInt: "parseInt",
            upper: e("toUpperCase", r, 0),
            lower: e("toLowerCase", r, 0),
            substring: e("substring", r),
            split: e("split", r),
            replace: e("replace", r),
            trim: e("trim", r, 0),
            regexp: i,
            test: e("test", i),
            if: function (e) {
                e.length < 3 && u("Missing arguments to if function."), e.length > 3 && u("Too many arguments to if function.");
                const n = e.map(t);
                return "(" + n[0] + "?" + n[1] + ":" + n[2] + ")"
            }
        }
    }

    const oS = "intersect", aS = "union";
    var uS = "index:unit";

    function sS(t, e) {
        for (var n, r, i = e.fields, o = e.values, a = i.length, u = 0; u < a; ++u) if ((r = i[u]).getter = l.getter || l(r.field), ct(n = r.getter(t)) && (n = A(n)), ct(o[u]) && (o[u] = A(o[u])), ct(o[u][0]) && (o[u] = o[u].map(A)), "E" === r.type) {
            if (v(o[u]) ? o[u].indexOf(n) < 0 : n !== o[u]) return !1
        } else if ("R" === r.type) {
            if (!st(n, o[u])) return !1
        } else if ("R-RE" === r.type) {
            if (!st(n, o[u], !0, !1)) return !1
        } else if ("R-E" === r.type) {
            if (!st(n, o[u], !1, !1)) return !1
        } else if ("R-LE" === r.type && !st(n, o[u], !1, !0)) return !1;
        return !0
    }

    var lS = {
        E_union: function (t, e) {
            if (!t.length) return e;
            for (var n = 0, r = e.length; n < r; ++n) t.indexOf(e[n]) < 0 && t.push(e[n]);
            return t
        }, E_intersect: function (t, e) {
            return t.length ? t.filter((t => e.indexOf(t) >= 0)) : e
        }, R_union: function (t, e) {
            var n = A(e[0]), r = A(e[1]);
            return n > r && (n = e[1], r = e[0]), t.length ? (t[0] > n && (t[0] = n), t[1] < r && (t[1] = r), t) : [n, r]
        }, R_intersect: function (t, e) {
            var n = A(e[0]), r = A(e[1]);
            return n > r && (n = e[1], r = e[0]), t.length ? r < t[0] || t[1] < n ? [] : (t[0] < n && (t[0] = n), t[1] > r && (t[1] = r), t) : [n, r]
        }
    };

    function cS(t, e, n, r) {
        e[0].type !== PC && u("First argument to selection functions must be a string literal.");
        const i = e[0].value, o = "unit", a = "@unit", s = ":" + i;
        (e.length >= 2 && M(e).value) !== oS || rt(r, a) || (r["@unit"] = n.getData(i).indataRef(n, o)), rt(r, s) || (r[s] = n.getData(i).tuplesRef())
    }

    function fS(t) {
        const e = this.context.data[t];
        return e ? e.values.value : []
    }

    const hS = t => function (e, n) {
            return this.context.dataflow.locale()[t](n)(e)
        }, dS = hS("format"), pS = hS("timeFormat"), gS = hS("utcFormat"), mS = hS("timeParse"), yS = hS("utcParse"),
        vS = new Date(2e3, 0, 1);

    function _S(t, e, n) {
        return Number.isInteger(t) && Number.isInteger(e) ? (vS.setYear(2e3), vS.setMonth(t), vS.setDate(e), pS.call(this, vS, n)) : ""
    }

    function xS(t, e, n, r) {
        e[0].type !== PC && u("First argument to data functions must be a string literal.");
        const i = e[0].value, o = ":" + i;
        if (!rt(o, r)) try {
            r[o] = n.getData(i).tuplesRef()
        } catch (t) {
        }
    }

    function bS(t, e, n, r) {
        if (e[0].type === PC) wS(n, r, e[0].value); else for (t in n.scales) wS(n, r, t)
    }

    function wS(t, e, n) {
        const r = "%" + n;
        if (!rt(e, r)) try {
            e[r] = t.scaleRef(n)
        } catch (t) {
        }
    }

    function kS(t, e) {
        let n;
        return H(t) ? t : pt(t) ? (n = e.scales[t]) && n.value : void 0
    }

    function MS(t, e, n) {
        e.__bandwidth = t => t && t.bandwidth ? t.bandwidth() : 0, n._bandwidth = bS, n._range = bS, n._scale = bS;
        const r = e => "_[" + (e.type === PC ? wt("%" + e.value) : wt("%") + "+" + t(e)) + "]";
        return {
            _bandwidth: t => "this.__bandwidth(".concat(r(t[0]), ")"),
            _range: t => "".concat(r(t[0]), ".range()"),
            _scale: e => "".concat(r(e[0]), "(").concat(t(e[1]), ")")
        }
    }

    function AS(t, e) {
        return function (n, r, i) {
            if (n) {
                const e = kS(n, (i || this).context);
                return e && e.path[t](r)
            }
            return e(r)
        }
    }

    const ES = AS("area", (function (t) {
        return fb = new be, Vx(t, hb), 2 * fb
    })), DS = AS("bounds", (function (t) {
        var e, n, r, i, o, a, u;
        if (nb = eb = -(Kx = tb = 1 / 0), sb = [], Vx(t, Pb), n = sb.length) {
            for (sb.sort(Xb), e = 1, o = [r = sb[0]]; e < n; ++e) Jb(r, (i = sb[e])[0]) || Jb(r, i[1]) ? (Gb(r[0], i[1]) > Gb(r[0], r[1]) && (r[1] = i[1]), Gb(i[0], r[1]) > Gb(r[0], r[1]) && (r[0] = i[0])) : o.push(r = i);
            for (a = -1 / 0, e = 0, r = o[n = o.length - 1]; e <= n; r = i, ++e) i = o[e], (u = Gb(r[1], i[0])) > a && (a = u, Kx = i[0], eb = r[1])
        }
        return sb = lb = null, Kx === 1 / 0 || tb === 1 / 0 ? [[NaN, NaN], [NaN, NaN]] : [[Kx, tb], [eb, nb]]
    })), CS = AS("centroid", (function (t) {
        Mb = Ab = Eb = Db = Cb = Fb = Sb = Bb = 0, Tb = new be, zb = new be, Nb = new be, Vx(t, Zb);
        var e = +Tb, n = +zb, r = +Nb, i = Tx(e, n, r);
        return i < _x && (e = Fb, n = Sb, r = Bb, Ab < vx && (e = Eb, n = Db, r = Cb), (i = Tx(e, n, r)) < _x) ? [NaN, NaN] : [Cx(n, e) * Mx, Px(r / i) * Mx]
    }));

    function FS(t, e, n) {
        try {
            t[e].apply(t, ["EXPRESSION"].concat([].slice.call(n)))
        } catch (e) {
            t.warn(e)
        }
        return n[n.length - 1]
    }

    function SS(t) {
        const e = t / 255;
        return e <= .03928 ? e / 12.92 : Math.pow((e + .055) / 1.055, 2.4)
    }

    function BS(t) {
        const e = wc(t);
        return .2126 * SS(e.r) + .7152 * SS(e.g) + .0722 * SS(e.b)
    }

    function TS(t, e) {
        return t === e || t != t && e != e || (v(t) ? !(!v(e) || t.length !== e.length) && function (t, e) {
            for (let n = 0, r = t.length; n < r; ++n) if (!TS(t[n], e[n])) return !1;
            return !0
        }(t, e) : !(!_(t) || !_(e)) && zS(t, e))
    }

    function zS(t, e) {
        for (const n in t) if (!TS(t[n], e[n])) return !1;
        return !0
    }

    function NS(t) {
        return e => zS(t, e)
    }

    const OS = t => t.data;

    function RS(t, e) {
        const n = fS.call(e, t);
        return n.root && n.root.lookup || {}
    }

    const LS = () => "undefined" != typeof window && window || null;
    const US = {
        random: () => t.random(),
        cumulativeNormal: Sa,
        cumulativeLogNormal: Ra,
        cumulativeUniform: Ia,
        densityNormal: Fa,
        densityLogNormal: Oa,
        densityUniform: ja,
        quantileNormal: Ba,
        quantileLogNormal: La,
        quantileUniform: $a,
        sampleNormal: Ca,
        sampleLogNormal: Na,
        sampleUniform: Pa,
        isArray: v,
        isBoolean: lt,
        isDate: ct,
        isDefined: t => void 0 !== t,
        isNumber: ht,
        isObject: _,
        isRegExp: dt,
        isString: pt,
        isTuple: No,
        isValid: t => null != t && t == t,
        toBoolean: kt,
        toDate: At,
        toNumber: A,
        toString: Et,
        flush: at,
        lerp: mt,
        merge: function () {
            const t = [].slice.call(arguments);
            return t.unshift({}), K(...t)
        },
        pad: xt,
        peek: M,
        span: bt,
        inrange: st,
        truncate: Ct,
        rgb: wc,
        lab: Pc,
        hcl: Vc,
        hsl: Fc,
        luminance: BS,
        contrast: function (t, e) {
            const n = BS(t), r = BS(e);
            return (Math.max(n, r) + .05) / (Math.min(n, r) + .05)
        },
        sequence: Re,
        format: dS,
        utcFormat: gS,
        utcParse: yS,
        utcOffset: br,
        utcSequence: Mr,
        timeFormat: pS,
        timeParse: mS,
        timeOffset: xr,
        timeSequence: kr,
        timeUnitSpecifier: Yn,
        monthFormat: function (t) {
            return _S.call(this, t, 1, "%B")
        },
        monthAbbrevFormat: function (t) {
            return _S.call(this, t, 1, "%b")
        },
        dayFormat: function (t) {
            return _S.call(this, 0, 2 + t, "%A")
        },
        dayAbbrevFormat: function (t) {
            return _S.call(this, 0, 2 + t, "%a")
        },
        quarter: j,
        utcquarter: I,
        week: Jn,
        utcweek: nr,
        dayofyear: Xn,
        utcdayofyear: er,
        warn: function () {
            return FS(this.context.dataflow, "warn", arguments)
        },
        info: function () {
            return FS(this.context.dataflow, "info", arguments)
        },
        debug: function () {
            return FS(this.context.dataflow, "debug", arguments)
        },
        extent: tt,
        inScope: function (t) {
            const e = this.context.group;
            let n = !1;
            if (e) for (; t;) {
                if (t === e) {
                    n = !0;
                    break
                }
                t = t.mark.group
            }
            return n
        },
        intersect: function (t, e, n) {
            if (!t) return [];
            const [r, i] = t, o = (new Zp).set(r[0], r[1], i[0], i[1]);
            return wv(n || this.context.dataflow.scenegraph().root, o, function (t) {
                let e = null;
                if (t) {
                    const n = $(t.marktype), r = $(t.markname);
                    e = t => (!n.length || n.some((e => t.marktype === e))) && (!r.length || r.some((e => t.name === e)))
                }
                return e
            }(e))
        },
        clampRange: W,
        pinchDistance: function (t) {
            const e = t.touches, n = e[0].clientX - e[1].clientX, r = e[0].clientY - e[1].clientY;
            return Math.sqrt(n * n + r * r)
        },
        pinchAngle: function (t) {
            const e = t.touches;
            return Math.atan2(e[0].clientY - e[1].clientY, e[0].clientX - e[1].clientX)
        },
        screen: function () {
            const t = LS();
            return t ? t.screen : {}
        },
        containerSize: function () {
            const t = this.context.dataflow, e = t.container && t.container();
            return e ? [e.clientWidth, e.clientHeight] : [void 0, void 0]
        },
        windowSize: function () {
            const t = LS();
            return t ? [t.innerWidth, t.innerHeight] : [void 0, void 0]
        },
        bandspace: function (t, e, n) {
            return qh(t || 0, e || 0, n || 0)
        },
        setdata: function (t, e) {
            const n = this.context.dataflow, r = this.context.data[t].input;
            return n.pulse(r, n.changeset().remove(p).insert(e)), 1
        },
        pathShape: function (t) {
            let e = null;
            return function (n) {
                return n ? xp(n, e = e || lp(t)) : t
            }
        },
        panLinear: T,
        panLog: z,
        panPow: N,
        panSymlog: O,
        zoomLinear: L,
        zoomLog: U,
        zoomPow: q,
        zoomSymlog: P,
        encode: function (t, e, n) {
            if (t) {
                const n = this.context.dataflow, r = t.mark.source;
                n.pulse(r, n.changeset().encode(t, e))
            }
            return void 0 !== n ? n : t
        },
        modify: function (t, e, n, r, i, o) {
            const a = this.context.dataflow, u = this.context.data[t], s = u.input, l = a.stamp();
            let c, f, h = u.changes;
            if (!1 === a._trigger || !(s.value.length || e || r)) return 0;
            if ((!h || h.stamp < l) && (u.changes = h = a.changeset(), h.stamp = l, a.runAfter((() => {
                u.modified = !0, a.pulse(s, h).run()
            }), !0, 1)), n && (c = !0 === n ? p : v(n) || No(n) ? n : NS(n), h.remove(c)), e && h.insert(e), r && (c = NS(r), s.value.some(c) ? h.remove(c) : h.insert(r)), i) for (f in o) h.modify(i, f, o[f]);
            return 1
        }
    }, qS = ["view", "item", "group", "xy", "x", "y"], PS = "this.", jS = {}, IS = {
        forbidden: ["_"],
        allowed: ["datum", "event", "item"],
        fieldvar: "datum",
        globalvar: t => "_[".concat(wt("$" + t), "]"),
        functions: function (t) {
            const e = iS(t);
            qS.forEach((t => e[t] = "event.vega." + t));
            for (const t in US) e[t] = PS + t;
            return K(e, MS(t, US, jS)), e
        },
        constants: rS,
        visitors: jS
    }, $S = function (t) {
        const e = (t = t || {}).allowed ? Dt(t.allowed) : {}, n = t.forbidden ? Dt(t.forbidden) : {},
            r = t.constants || rS, i = (t.functions || iS)(h), o = t.globalvar, a = t.fieldvar,
            s = H(o) ? o : t => "".concat(o, '["').concat(t, '"]');
        let l = {}, c = {}, f = 0;

        function h(t) {
            if (pt(t)) return t;
            const e = d[t.type];
            return null == e && u("Unsupported type: " + t.type), e(t)
        }

        const d = {
            Literal: t => t.raw,
            Identifier: t => {
                const i = t.name;
                return f > 0 ? i : rt(n, i) ? u("Illegal identifier: " + i) : rt(r, i) ? r[i] : rt(e, i) ? i : (l[i] = 1, s(i))
            },
            MemberExpression: t => {
                const e = !t.computed, n = h(t.object);
                e && (f += 1);
                const r = h(t.property);
                return n === a && (c[function (t) {
                    const e = t && t.length - 1;
                    return e && ('"' === t[0] && '"' === t[e] || "'" === t[0] && "'" === t[e]) ? t.slice(1, -1) : t
                }(r)] = 1), e && (f -= 1), n + (e ? "." + r : "[" + r + "]")
            },
            CallExpression: t => {
                "Identifier" !== t.callee.type && u("Illegal callee type: " + t.callee.type);
                const e = t.callee.name, n = t.arguments, r = rt(i, e) && i[e];
                return r || u("Unrecognized function: " + e), H(r) ? r(n) : r + "(" + n.map(h).join(",") + ")"
            },
            ArrayExpression: t => "[" + t.elements.map(h).join(",") + "]",
            BinaryExpression: t => "(" + h(t.left) + t.operator + h(t.right) + ")",
            UnaryExpression: t => "(" + t.operator + h(t.argument) + ")",
            ConditionalExpression: t => "(" + h(t.test) + "?" + h(t.consequent) + ":" + h(t.alternate) + ")",
            LogicalExpression: t => "(" + h(t.left) + t.operator + h(t.right) + ")",
            ObjectExpression: t => "{" + t.properties.map(h).join(",") + "}",
            Property: t => {
                f += 1;
                const e = h(t.key);
                return f -= 1, e + ":" + h(t.value)
            }
        };

        function p(t) {
            const e = {code: h(t), globals: Object.keys(l), fields: Object.keys(c)};
            return l = {}, c = {}, e
        }

        return p.functions = i, p.constants = r, p
    }(IS);

    function WS(t, e, n) {
        return 1 === arguments.length ? US[t] : (US[t] = e, n && (jS[t] = n), $S && ($S.functions[t] = PS + t), this)
    }

    function HS(t, e) {
        const n = {};
        let r;
        try {
            r = function (t) {
                tF = 0, eF = (KC = t).length, nF = null, BF();
                const e = nS();
                if (2 !== nF.type) throw new Error("Unexpect token after expression.");
                return e
            }(t = pt(t) ? t : wt(t) + "")
        } catch (e) {
            u("Expression parse error: " + t)
        }
        r.visit((t => {
            if (t.type !== HC) return;
            const r = t.callee.name, i = IS.visitors[r];
            i && i(r, t.arguments, e, n)
        }));
        const i = $S(r);
        return i.globals.forEach((t => {
            const r = "$" + t;
            !rt(n, r) && e.getSignal(t) && (n[r] = e.signalRef(t))
        })), {$expr: K({code: i.code}, e.options.ast ? {ast: r} : null), $fields: i.fields, $params: n}
    }

    WS("bandwidth", (function (t, e) {
        const n = kS(t, (e || this).context);
        return n && n.bandwidth ? n.bandwidth() : 0
    }), bS), WS("copy", (function (t, e) {
        const n = kS(t, (e || this).context);
        return n ? n.copy() : void 0
    }), bS), WS("domain", (function (t, e) {
        const n = kS(t, (e || this).context);
        return n ? n.domain() : []
    }), bS), WS("range", (function (t, e) {
        const n = kS(t, (e || this).context);
        return n && n.range ? n.range() : []
    }), bS), WS("invert", (function (t, e, n) {
        const r = kS(t, (n || this).context);
        return r ? v(e) ? (r.invertRange || r.invert)(e) : (r.invert || r.invertExtent)(e) : void 0
    }), bS), WS("scale", (function (t, e, n) {
        const r = kS(t, (n || this).context);
        return r ? r(e) : void 0
    }), bS), WS("gradient", (function (t, e, n, r, i) {
        t = kS(t, (i || this).context);
        const o = ip(e, n);
        let a = t.domain(), u = a[0], s = M(a), l = f;
        return s - u ? l = Dd(t, u, s) : t = (t.interpolator ? pd("sequential")().interpolator(t.interpolator()) : pd("linear")().interpolate(t.interpolate()).range(t.range())).domain([u = 0, s = 1]), t.ticks && (a = t.ticks(+r || 15), u !== a[0] && a.unshift(u), s !== M(a) && a.push(s)), a.forEach((e => o.stop(l(e), t(e)))), o
    }), bS), WS("geoArea", ES, bS), WS("geoBounds", DS, bS), WS("geoCentroid", CS, bS), WS("geoShape", (function (t, e, n) {
        const r = kS(t, (n || this).context);
        return function (t) {
            return r ? r.path.context(t)(e) : ""
        }
    }), bS), WS("indata", (function (t, e, n) {
        const r = this.context.data[t]["index:" + e], i = r ? r.value.get(n) : void 0;
        return i ? i.count : i
    }), (function (t, e, n, r) {
        e[0].type !== PC && u("First argument to indata must be a string literal."), e[1].type !== PC && u("Second argument to indata must be a string literal.");
        const i = e[0].value, o = e[1].value, a = "@" + o;
        rt(a, r) || (r[a] = n.getData(i).indataRef(n, o))
    })), WS("data", fS, xS), WS("treePath", (function (t, e, n) {
        const r = RS(t, this), i = r[e], o = r[n];
        return i && o ? i.path(o).map(OS) : void 0
    }), xS), WS("treeAncestors", (function (t, e) {
        const n = RS(t, this)[e];
        return n ? n.ancestors().map(OS) : void 0
    }), xS), WS("vlSelectionTest", (function (t, e, n) {
        for (var r, i, o, a, u, s = this.context.data[t], l = s ? s.values.value : [], c = s ? s[uS] && s[uS].value : void 0, f = n === oS, h = l.length, d = 0; d < h; ++d) if (r = l[d], c && f) {
            if (-1 === (o = (i = i || {})[a = r.unit] || 0)) continue;
            if (u = sS(e, r), i[a] = u ? -1 : ++o, u && 1 === c.size) return !0;
            if (!u && o === c.get(a).count) return !1
        } else if (f ^ (u = sS(e, r))) return u;
        return h && f
    }), cS), WS("vlSelectionResolve", (function (t, e, n) {
        for (var r, i, o, a, u, s, l, c, f, h, d, p = this.context.data[t], g = p ? p.values.value : [], m = {}, y = {}, v = {}, _ = g.length, x = 0; x < _; ++x) {
            for (a = (r = g[x]).unit, i = r.fields, o = r.values, h = 0, d = i.length; h < d; ++h) u = i[h], l = (s = m[u.field] || (m[u.field] = {}))[a] || (s[a] = []), v[u.field] = c = u.type.charAt(0), f = lS[c + "_union"], s[a] = f(l, $(o[h]));
            n && (l = y[a] || (y[a] = [])).push($(o).reduce(((t, e, n) => (t[i[n].field] = e, t)), {}))
        }
        return e = e || aS, Object.keys(m).forEach((t => {
            m[t] = Object.keys(m[t]).map((e => m[t][e])).reduce(((n, r) => void 0 === n ? r : lS[v[t] + "_" + e](n, r)))
        })), g = Object.keys(y), n && g.length && (m.vlMulti = e === aS ? {or: g.reduce(((t, e) => (t.push(...y[e]), t)), [])} : {and: g.map((t => ({or: y[t]})))}), m
    }), cS);
    const YS = Dt(["rule"]), VS = Dt(["group", "image", "rect"]);

    function GS(t) {
        return (t + "").toLowerCase()
    }

    function XS(t, e, n) {
        ";" !== n[n.length - 1] && (n = "return(" + n + ");");
        const r = Function(...e.concat(n));
        return t && t.functions ? r.bind(t.functions) : r
    }

    var JS = {
        operator: (t, e) => XS(t, ["_"], e.code),
        parameter: (t, e) => XS(t, ["datum", "_"], e.code),
        event: (t, e) => XS(t, ["event"], e.code),
        handler: (t, e) => XS(t, ["_", "event"], "var datum=event.item&&event.item.datum;return ".concat(e.code, ";")),
        encode: (t, e) => {
            const {marktype: n, channels: r} = e;
            let i = "var o=item,datum=o.datum,m=0,$;";
            for (const t in r) {
                const e = "o[" + wt(t) + "]";
                i += "$=".concat(r[t].code, ";if(").concat(e, "!==$)").concat(e, "=$,m=1;")
            }
            return i += function (t, e) {
                let n = "";
                return YS[e] || (t.x2 && (t.x ? (VS[e] && (n += "if(o.x>o.x2)$=o.x,o.x=o.x2,o.x2=$;"), n += "o.width=o.x2-o.x;") : n += "o.x=o.x2-(o.width||0);"), t.xc && (n += "o.x=o.xc-(o.width||0)/2;"), t.y2 && (t.y ? (VS[e] && (n += "if(o.y>o.y2)$=o.y,o.y=o.y2,o.y2=$;"), n += "o.height=o.y2-o.y;") : n += "o.y=o.y2-(o.height||0);"), t.yc && (n += "o.y=o.yc-(o.height||0)/2;")), n
            }(r, n), i += "return m;", XS(t, ["item", "_"], i)
        },
        codegen: {
            get(t) {
                const e = "[".concat(t.map(wt).join("]["), "]"), n = Function("_", "return _".concat(e, ";"));
                return n.path = e, n
            }, comparator(t, e) {
                let n;
                const r = Function("a", "b", "var u, v; return " + t.map(((t, r) => {
                    const i = e[r];
                    let o, a;
                    return t.path ? (o = "a".concat(t.path), a = "b".concat(t.path)) : ((n = n || {})["f" + r] = t, o = "this.f".concat(r, "(a)"), a = "this.f".concat(r, "(b)")), function (t, e, n, r) {
                        return "((u = ".concat(t, ") < (v = ").concat(e, ") || u == null) && v != null ? ").concat(n, "\n  : (u > v || v == null) && u != null ? ").concat(r, "\n  : ((v = v instanceof Date ? +v : v), (u = u instanceof Date ? +u : u)) !== u && v === v ? ").concat(n, "\n  : v !== v && u === u ? ").concat(r, " : ")
                    }(o, a, -i, i)
                })).join("") + "0;");
                return n ? r.bind(n) : r
            }
        }
    };

    function ZS(t, e, n) {
        if (!t || !_(t)) return t;
        for (let r, i = 0, o = QS.length; i < o; ++i) if (r = QS[i], rt(t, r.key)) return r.parse(t, e, n);
        return t
    }

    var QS = [{
        key: "$ref", parse: function (t, e) {
            return e.get(t.$ref) || u("Operator not defined: " + t.$ref)
        }
    }, {
        key: "$key", parse: function (t, e) {
            const n = "k:" + t.$key + "_" + !!t.$flat;
            return e.fn[n] || (e.fn[n] = gt(t.$key, t.$flat, e.expr.codegen))
        }
    }, {
        key: "$expr", parse: function (t, n, r) {
            t.$params && n.parseParameters(t.$params, r);
            const i = "e:" + t.$expr.code + "_" + t.$name;
            return n.fn[i] || (n.fn[i] = e(n.parameterExpression(t.$expr), t.$fields, t.$name))
        }
    }, {
        key: "$field", parse: function (t, e) {
            if (!t.$field) return null;
            const n = "f:" + t.$field + "_" + t.$name;
            return e.fn[n] || (e.fn[n] = l(t.$field, t.$name, e.expr.codegen))
        }
    }, {
        key: "$encode", parse: function (t, n) {
            const r = t.$encode, i = {};
            for (const t in r) {
                const o = r[t];
                i[t] = e(n.encodeExpression(o.$expr), o.$fields), i[t].output = o.$output
            }
            return i
        }
    }, {
        key: "$compare", parse: function (t, e) {
            const n = "c:" + t.$compare + "_" + t.$order, r = $(t.$compare).map((t => t && t.$tupleid ? Oo : t));
            return e.fn[n] || (e.fn[n] = Y(r, t.$order, e.expr.codegen))
        }
    }, {
        key: "$context", parse: function (t, e) {
            return e
        }
    }, {
        key: "$subflow", parse: function (t, e) {
            const n = t.$subflow;
            return function (t, r, i) {
                const o = e.fork().parse(n), a = o.get(n.operators[0].id), u = o.signals.parent;
                return u && u.set(i), a.detachSubflow = () => e.detach(o), a
            }
        }
    }, {
        key: "$tupleid", parse: function () {
            return Oo
        }
    }];
    const KS = {skip: !0};

    function tB(t, e, n, r) {
        return new eB(t, e, n, r)
    }

    function eB(t, e, n, r) {
        this.dataflow = t, this.transforms = e, this.events = t.events.bind(t), this.expr = r || JS, this.signals = {}, this.scales = {}, this.nodes = {}, this.data = {}, this.fn = {}, n && (this.functions = Object.create(n), this.functions.context = this)
    }

    function nB(t) {
        this.dataflow = t.dataflow, this.transforms = t.transforms, this.events = t.events, this.expr = t.expr, this.signals = Object.create(t.signals), this.scales = Object.create(t.scales), this.nodes = Object.create(t.nodes), this.data = Object.create(t.data), this.fn = Object.create(t.fn), t.functions && (this.functions = Object.create(t.functions), this.functions.context = this)
    }

    function rB(t, e) {
        t && (null == e ? t.removeAttribute("aria-label") : t.setAttribute("aria-label", e))
    }

    eB.prototype = nB.prototype = {
        fork() {
            const t = new nB(this);
            return (this.subcontext || (this.subcontext = [])).push(t), t
        }, detach(t) {
            this.subcontext = this.subcontext.filter((e => e !== t));
            const e = Object.keys(t.nodes);
            for (const n of e) t.nodes[n]._targets = null;
            for (const n of e) t.nodes[n].detach();
            t.nodes = null
        }, get(t) {
            return this.nodes[t]
        }, set(t, e) {
            return this.nodes[t] = e
        }, add(t, e) {
            const n = this, r = n.dataflow, i = t.value;
            if (n.set(t.id, e), function (t) {
                return "collect" === GS(t)
            }(t.type) && i && (i.$ingest ? r.ingest(e, i.$ingest, i.$format) : i.$request ? r.preload(e, i.$request, i.$format) : r.pulse(e, r.changeset().insert(i))), t.root && (n.root = e), t.parent) {
                let i = n.get(t.parent.$ref);
                i ? (r.connect(i, [e]), e.targets().add(i)) : (n.unresolved = n.unresolved || []).push((() => {
                    i = n.get(t.parent.$ref), r.connect(i, [e]), e.targets().add(i)
                }))
            }
            if (t.signal && (n.signals[t.signal] = e), t.scale && (n.scales[t.scale] = e), t.data) for (const r in t.data) {
                const i = n.data[r] || (n.data[r] = {});
                t.data[r].forEach((t => i[t] = e))
            }
        }, resolve() {
            return (this.unresolved || []).forEach((t => t())), delete this.unresolved, this
        }, operator(t, e) {
            this.add(t, this.dataflow.add(t.value, e))
        }, transform(t, e) {
            this.add(t, this.dataflow.add(this.transforms[GS(e)]))
        }, stream(t, e) {
            this.set(t.id, e)
        }, update(t, e, n, r, i) {
            this.dataflow.on(e, n, r, i, t.options)
        }, operatorExpression(t) {
            return this.expr.operator(this, t)
        }, parameterExpression(t) {
            return this.expr.parameter(this, t)
        }, eventExpression(t) {
            return this.expr.event(this, t)
        }, handlerExpression(t) {
            return this.expr.handler(this, t)
        }, encodeExpression(t) {
            return this.expr.encode(this, t)
        }, parse: function (t) {
            const e = this, n = t.operators || [];
            return t.background && (e.background = t.background), t.eventConfig && (e.eventConfig = t.eventConfig), t.locale && (e.locale = t.locale), n.forEach((t => e.parseOperator(t))), n.forEach((t => e.parseOperatorParameters(t))), (t.streams || []).forEach((t => e.parseStream(t))), (t.updates || []).forEach((t => e.parseUpdate(t))), e.resolve()
        }, parseOperator: function (t) {
            const e = this;
            !function (t) {
                return "operator" === GS(t)
            }(t.type) && t.type ? e.transform(t, t.type) : e.operator(t, t.update ? e.operatorExpression(t.update) : null)
        }, parseOperatorParameters: function (t) {
            const e = this;
            if (t.params) {
                const n = e.get(t.id);
                n || u("Invalid operator id: " + t.id), e.dataflow.connect(n, n.parameters(e.parseParameters(t.params), t.react, t.initonly))
            }
        }, parseParameters: function (t, e) {
            e = e || {};
            const n = this;
            for (const r in t) {
                const i = t[r];
                e[r] = v(i) ? i.map((t => ZS(t, n, e))) : ZS(i, n, e)
            }
            return e
        }, parseStream: function (t) {
            var e, n = this, r = null != t.filter ? n.eventExpression(t.filter) : void 0,
                i = null != t.stream ? n.get(t.stream) : void 0;
            t.source ? i = n.events(t.source, t.type, r) : t.merge && (i = (e = t.merge.map((t => n.get(t))))[0].merge.apply(e[0], e.slice(1))), t.between && (e = t.between.map((t => n.get(t))), i = i.between(e[0], e[1])), t.filter && (i = i.filter(r)), null != t.throttle && (i = i.throttle(+t.throttle)), null != t.debounce && (i = i.debounce(+t.debounce)), null == i && u("Invalid stream definition: " + JSON.stringify(t)), t.consume && i.consume(!0), n.stream(t, i)
        }, parseUpdate: function (t) {
            var e, n = this, r = _(r = t.source) ? r.$ref : r, i = n.get(r), o = t.update, a = void 0;
            i || u("Source not defined: " + t.source), e = t.target && t.target.$expr ? n.eventExpression(t.target.$expr) : n.get(t.target), o && o.$expr && (o.$params && (a = n.parseParameters(o.$params)), o = n.handlerExpression(o.$expr)), n.update(t, i, e, o, a)
        }, getState: function (t) {
            var e = this, n = {};
            if (t.signals) {
                var r = n.signals = {};
                Object.keys(e.signals).forEach((n => {
                    const i = e.signals[n];
                    t.signals(n, i) && (r[n] = i.value)
                }))
            }
            if (t.data) {
                var i = n.data = {};
                Object.keys(e.data).forEach((n => {
                    const r = e.data[n];
                    t.data(n, r) && (i[n] = r.input.value)
                }))
            }
            return e.subcontext && !1 !== t.recurse && (n.subcontext = e.subcontext.map((e => e.getState(t)))), n
        }, setState: function (t) {
            var e = this, n = e.dataflow, r = t.data, i = t.signals;
            Object.keys(i || {}).forEach((t => {
                n.update(e.signals[t], i[t], KS)
            })), Object.keys(r || {}).forEach((t => {
                n.pulse(e.data[t].input, n.changeset().remove(p).insert(r[t]))
            })), (t.subcontext || []).forEach(((t, n) => {
                const r = e.subcontext[n];
                r && r.setState(t)
            }))
        }
    };
    const iB = "default";

    function oB(t, e) {
        const n = t.globalCursor() ? "undefined" != typeof document && document.body : t.container();
        if (n) return null == e ? n.style.removeProperty("cursor") : n.style.cursor = e
    }

    function aB(t, e) {
        var n = t._runtime.data;
        return rt(n, e) || u("Unrecognized data set: " + e), n[e]
    }

    function uB(t, e) {
        Io(e) || u("Second argument to changes must be a changeset.");
        const n = aB(this, t);
        return n.modified = !0, this.pulse(n.input, e)
    }

    function sB(t) {
        var e = t.padding();
        return Math.max(0, t._viewWidth + e.left + e.right)
    }

    function lB(t) {
        var e = t.padding();
        return Math.max(0, t._viewHeight + e.top + e.bottom)
    }

    function cB(t) {
        var e = t.padding(), n = t._origin;
        return [e.left + n[0], e.top + n[1]]
    }

    function fB(t, e, n) {
        var r, i, o = t._renderer, a = o && o.canvas();
        return a && (i = cB(t), (r = uy(e.changedTouches ? e.changedTouches[0] : e, a))[0] -= i[0], r[1] -= i[1]), e.dataflow = t, e.item = n, e.vega = function (t, e, n) {
            const r = e ? "group" === e.mark.marktype ? e : e.mark.group : null;

            function i(t) {
                var n, i = r;
                if (t) for (n = e; n; n = n.mark.group) if (n.mark.name === t) {
                    i = n;
                    break
                }
                return i && i.mark && i.mark.interactive ? i : {}
            }

            function o(t) {
                if (!t) return n;
                pt(t) && (t = i(t));
                const e = n.slice();
                for (; t;) e[0] -= t.x || 0, e[1] -= t.y || 0, t = t.mark && t.mark.group;
                return e
            }

            return {
                view: Z(t), item: Z(e || {}), group: i, xy: o, x: function (t) {
                    return o(t)[0]
                }, y: function (t) {
                    return o(t)[1]
                }
            }
        }(t, n, r), e
    }

    const hB = "view", dB = {trap: !1};

    function pB(t, e, n) {
        const r = t._eventConfig && t._eventConfig[e];
        return !(!1 === r || _(r) && !r[n]) || (t.warn("Blocked ".concat(e, " ").concat(n, " event listener.")), !1)
    }

    function gB(t) {
        return t.item
    }

    function mB(t) {
        return t.item.mark.source
    }

    function yB(t) {
        return function (e, n) {
            return n.vega.view().changeset().encode(n.item, t)
        }
    }

    function vB(t, e, n) {
        const r = document.createElement(t);
        for (const t in e) r.setAttribute(t, e[t]);
        return null != n && (r.textContent = n), r
    }

    const _B = "vega-bind", xB = "vega-bind-name";

    function bB(t, e, n) {
        if (!e) return;
        const r = n.param;
        let i = n.state;
        return i || (i = n.state = {
            elements: null, active: !1, set: null, update: e => {
                e !== t.signal(r.signal) && t.runAsync(null, (() => {
                    i.source = !0, t.signal(r.signal, e)
                }))
            }
        }, r.debounce && (i.update = Q(r.debounce, i.update))), function (t, e, n, r) {
            const i = vB("div", {class: _B}), o = "radio" === n.input ? i : i.appendChild(vB("label"));
            o.appendChild(vB("span", {class: xB}, n.name || n.signal)), e.appendChild(i);
            let a = wB;
            switch (n.input) {
                case"checkbox":
                    a = kB;
                    break;
                case"select":
                    a = MB;
                    break;
                case"radio":
                    a = AB;
                    break;
                case"range":
                    a = EB
            }
            a(t, o, n, r)
        }(i, e, r, t.signal(r.signal)), i.active || (t.on(t._signals[r.signal], null, (() => {
            i.source ? i.source = !1 : i.set(t.signal(r.signal))
        })), i.active = !0), i
    }

    function wB(t, e, n, r) {
        const i = vB("input");
        for (const t in n) "signal" !== t && "element" !== t && i.setAttribute("input" === t ? "type" : t, n[t]);
        i.setAttribute("name", n.signal), i.value = r, e.appendChild(i), i.addEventListener("input", (() => t.update(i.value))), t.elements = [i], t.set = t => i.value = t
    }

    function kB(t, e, n, r) {
        const i = {type: "checkbox", name: n.signal};
        r && (i.checked = !0);
        const o = vB("input", i);
        e.appendChild(o), o.addEventListener("change", (() => t.update(o.checked))), t.elements = [o], t.set = t => o.checked = !!t || null
    }

    function MB(t, e, n, r) {
        const i = vB("select", {name: n.signal}), o = n.labels || [];
        n.options.forEach(((t, e) => {
            const n = {value: t};
            DB(t, r) && (n.selected = !0), i.appendChild(vB("option", n, (o[e] || t) + ""))
        })), e.appendChild(i), i.addEventListener("change", (() => {
            t.update(n.options[i.selectedIndex])
        })), t.elements = [i], t.set = t => {
            for (let e = 0, r = n.options.length; e < r; ++e) if (DB(n.options[e], t)) return void (i.selectedIndex = e)
        }
    }

    function AB(t, e, n, r) {
        const i = vB("span", {class: "vega-bind-radio"}), o = n.labels || [];
        e.appendChild(i), t.elements = n.options.map(((e, a) => {
            const u = {type: "radio", name: n.signal, value: e};
            DB(e, r) && (u.checked = !0);
            const s = vB("input", u);
            s.addEventListener("change", (() => t.update(e)));
            const l = vB("label", {}, (o[a] || e) + "");
            return l.prepend(s), i.appendChild(l), s
        })), t.set = e => {
            const n = t.elements, r = n.length;
            for (let t = 0; t < r; ++t) DB(n[t].value, e) && (n[t].checked = !0)
        }
    }

    function EB(t, e, n, r) {
        r = void 0 !== r ? r : (+n.max + +n.min) / 2;
        const i = null != n.max ? n.max : Math.max(100, +r) || 100, o = n.min || Math.min(0, i, +r) || 0,
            a = n.step || De(o, i, 100), u = vB("input", {type: "range", name: n.signal, min: o, max: i, step: a});
        u.value = r;
        const s = vB("span", {}, +r);
        e.appendChild(u), e.appendChild(s);
        const l = () => {
            s.textContent = u.value, t.update(+u.value)
        };
        u.addEventListener("input", l), u.addEventListener("change", l), t.elements = [u], t.set = t => {
            u.value = t, s.textContent = t
        }
    }

    function DB(t, e) {
        return t === e || t + "" == e + ""
    }

    function CB(t, e, n, r, i, o) {
        return (e = e || new r(t.loader())).initialize(n, sB(t), lB(t), cB(t), i, o).background(t.background())
    }

    function FB(t, e) {
        return e ? function () {
            try {
                e.apply(this, arguments)
            } catch (e) {
                t.error(e)
            }
        } : null
    }

    function SB(t, e) {
        if ("string" == typeof e) {
            if ("undefined" == typeof document) return t.error("DOM document instance not found."), null;
            if (!(e = document.querySelector(e))) return t.error("Signal bind element not found: " + e), null
        }
        if (e) try {
            e.innerHTML = ""
        } catch (n) {
            e = null, t.error(n)
        }
        return e
    }

    const BB = t => +t || 0;

    function TB(t) {
        return _(t) ? {top: BB(t.top), bottom: BB(t.bottom), left: BB(t.left), right: BB(t.right)} : (t => ({
            top: t,
            bottom: t,
            left: t,
            right: t
        }))(BB(t))
    }

    async function zB(t, e, n, r) {
        const i = bv(e), o = i && i.headless;
        return o || u("Unrecognized renderer type: " + e), await t.runAsync(), CB(t, null, null, o, n, r).renderAsync(t._scenegraph.root)
    }

    var NB = "width", OB = "height", RB = "padding", LB = {skip: !0};

    function UB(t, e) {
        var n = t.autosize(), r = t.padding();
        return e - (n && n.contains === RB ? r.left + r.right : 0)
    }

    function qB(t, e) {
        var n = t.autosize(), r = t.padding();
        return e - (n && n.contains === RB ? r.top + r.bottom : 0)
    }

    function PB(t, e) {
        return e.modified && v(e.input.value) && t.indexOf("_:vega:_")
    }

    function jB(t, e) {
        return !("parent" === t || e instanceof ga.proxy)
    }

    function IB(t, e, n, r) {
        const i = t.element();
        i && i.setAttribute("title", function (t) {
            return null == t ? "" : v(t) ? $B(t) : _(t) && !ct(t) ? (e = t, Object.keys(e).map((t => {
                const n = e[t];
                return t + ": " + (v(n) ? $B(n) : WB(n))
            })).join("\n")) : t + "";
            var e
        }(r))
    }

    function $B(t) {
        return "[" + t.map(WB).join(", ") + "]"
    }

    function WB(t) {
        return v(t) ? "[…]" : _(t) && !ct(t) ? "{…}" : t
    }

    function HB(t, e) {
        const n = this;
        if (e = e || {}, ha.call(n), e.loader && n.loader(e.loader), e.logger && n.logger(e.logger), null != e.logLevel && n.logLevel(e.logLevel), e.locale || t.locale) {
            const r = K({}, t.locale, e.locale);
            n.locale(Eo(r.number, r.time))
        }
        n._el = null, n._elBind = null, n._renderType = e.renderer || _v.Canvas, n._scenegraph = new ty;
        const r = n._scenegraph.root;
        n._renderer = null, n._tooltip = e.tooltip || IB, n._redraw = !0, n._handler = (new Ey).scene(r), n._globalCursor = !1, n._preventDefault = !1, n._timers = [], n._eventListeners = [], n._resizeListeners = [], n._eventConfig = function (t) {
            const e = K({defaults: {}}, t), n = (t, e) => {
                e.forEach((e => {
                    v(t[e]) && (t[e] = Dt(t[e]))
                }))
            };
            return n(e.defaults, ["prevent", "allow"]), n(e, ["view", "window", "selector"]), e
        }(t.eventConfig), n.globalCursor(n._eventConfig.globalCursor);
        const i = function (t, e, n) {
            return tB(t, ga, US, n).parse(e)
        }(n, t, e.expr);
        n._runtime = i, n._signals = i.signals, n._bind = (t.bindings || []).map((t => ({
            state: null,
            param: K({}, t)
        }))), i.root && i.root.set(r), r.source = i.data.root.input, n.pulse(i.data.root.input, n.changeset().insert(r.items)), n._width = n.width(), n._height = n.height(), n._viewWidth = UB(n, n._width), n._viewHeight = qB(n, n._height), n._origin = [0, 0], n._resize = 0, n._autosize = 1, function (t) {
            var e = t._signals, n = e.width, r = e.height, i = e.padding;

            function o() {
                t._autosize = t._resize = 1
            }

            t._resizeWidth = t.add(null, (e => {
                t._width = e.size, t._viewWidth = UB(t, e.size), o()
            }), {size: n}), t._resizeHeight = t.add(null, (e => {
                t._height = e.size, t._viewHeight = qB(t, e.size), o()
            }), {size: r});
            const a = t.add(null, o, {pad: i});
            t._resizeWidth.rank = n.rank + 1, t._resizeHeight.rank = r.rank + 1, a.rank = i.rank + 1
        }(n), function (t) {
            t.add(null, (e => (t._background = e.bg, t._resize = 1, e.bg)), {bg: t._signals.background})
        }(n), function (t) {
            const e = t._signals.cursor || (t._signals.cursor = t.add({user: iB, item: null}));
            t.on(t.events("view", "mousemove"), e, ((t, n) => {
                const r = e.value, i = r ? pt(r) ? r : r.user : iB, o = n.item && n.item.cursor || null;
                return r && i === r.user && o == r.item ? r : {user: i, item: o}
            })), t.add(null, (function (e) {
                let n = e.cursor, r = this.value;
                return pt(n) || (r = n.item, n = n.user), oB(t, n && n !== iB ? n : r || n), r
            }), {cursor: e})
        }(n), n.description(t.description), e.hover && n.hover(), e.container && n.initialize(e.container, e.bind)
    }

    function YB(t, e) {
        return rt(t._signals, e) ? t._signals[e] : u("Unrecognized signal name: " + wt(e))
    }

    function VB(t, e) {
        const n = (t._targets || []).filter((t => t._update && t._update.handler === e));
        return n.length ? n[0] : null
    }

    function GB(t, e, n, r) {
        let i = VB(n, r);
        return i || (i = FB(t, (() => r(e, n.value))), i.handler = r, t.on(n, null, i)), t
    }

    function XB(t, e, n) {
        const r = VB(e, n);
        return r && e._targets.remove(r), t
    }

    ut(HB, ha, {
        async evaluate(t, e, n) {
            if (await ha.prototype.evaluate.call(this, t, e), this._redraw || this._resize) try {
                this._renderer && (this._resize && (this._resize = 0, function (t) {
                    var e = cB(t), n = sB(t), r = lB(t);
                    t._renderer.background(t.background()), t._renderer.resize(n, r, e), t._handler.origin(e), t._resizeListeners.forEach((e => {
                        try {
                            e(n, r)
                        } catch (e) {
                            t.error(e)
                        }
                    }))
                }(this)), await this._renderer.renderAsync(this._scenegraph.root)), this._redraw = !1
            } catch (t) {
                this.error(t)
            }
            return n && Bo(this, n), this
        }, dirty(t) {
            this._redraw = !0, this._renderer && this._renderer.dirty(t)
        }, description(t) {
            if (arguments.length) {
                const e = null != t ? t + "" : null;
                return e !== this._desc && rB(this._el, this._desc = e), this
            }
            return this._desc
        }, container() {
            return this._el
        }, scenegraph() {
            return this._scenegraph
        }, origin() {
            return this._origin.slice()
        }, signal(t, e, n) {
            const r = YB(this, t);
            return 1 === arguments.length ? r.value : this.update(r, e, n)
        }, width(t) {
            return arguments.length ? this.signal("width", t) : this.signal("width")
        }, height(t) {
            return arguments.length ? this.signal("height", t) : this.signal("height")
        }, padding(t) {
            return arguments.length ? this.signal("padding", TB(t)) : TB(this.signal("padding"))
        }, autosize(t) {
            return arguments.length ? this.signal("autosize", t) : this.signal("autosize")
        }, background(t) {
            return arguments.length ? this.signal("background", t) : this.signal("background")
        }, renderer(t) {
            return arguments.length ? (bv(t) || u("Unrecognized renderer type: " + t), t !== this._renderType && (this._renderType = t, this._resetRenderer()), this) : this._renderType
        }, tooltip(t) {
            return arguments.length ? (t !== this._tooltip && (this._tooltip = t, this._resetRenderer()), this) : this._tooltip
        }, loader(t) {
            return arguments.length ? (t !== this._loader && (ha.prototype.loader.call(this, t), this._resetRenderer()), this) : this._loader
        }, resize() {
            return this._autosize = 1, this.touch(YB(this, "autosize"))
        }, _resetRenderer() {
            this._renderer && (this._renderer = null, this.initialize(this._el, this._elBind))
        }, _resizeView: function (t, e, n, r, i, o) {
            this.runAfter((a => {
                let u = 0;
                a._autosize = 0, a.width() !== n && (u = 1, a.signal(NB, n, LB), a._resizeWidth.skip(!0)), a.height() !== r && (u = 1, a.signal(OB, r, LB), a._resizeHeight.skip(!0)), a._viewWidth !== t && (a._resize = 1, a._viewWidth = t), a._viewHeight !== e && (a._resize = 1, a._viewHeight = e), a._origin[0] === i[0] && a._origin[1] === i[1] || (a._resize = 1, a._origin = i), u && a.run("enter"), o && a.runAfter((t => t.resize()))
            }), !1, 1)
        }, addEventListener(t, e, n) {
            let r = e;
            return n && !1 === n.trap || (r = FB(this, e), r.raw = e), this._handler.on(t, r), this
        }, removeEventListener(t, e) {
            for (var n, r, i = this._handler.handlers(t), o = i.length; --o >= 0;) if (r = i[o].type, n = i[o].handler, t === r && (e === n || e === n.raw)) {
                this._handler.off(r, n);
                break
            }
            return this
        }, addResizeListener(t) {
            const e = this._resizeListeners;
            return e.indexOf(t) < 0 && e.push(t), this
        }, removeResizeListener(t) {
            var e = this._resizeListeners, n = e.indexOf(t);
            return n >= 0 && e.splice(n, 1), this
        }, addSignalListener(t, e) {
            return GB(this, t, YB(this, t), e)
        }, removeSignalListener(t, e) {
            return XB(this, YB(this, t), e)
        }, addDataListener(t, e) {
            return GB(this, t, aB(this, t).values, e)
        }, removeDataListener(t, e) {
            return XB(this, aB(this, t).values, e)
        }, globalCursor(t) {
            if (arguments.length) {
                if (this._globalCursor !== !!t) {
                    const e = oB(this, null);
                    this._globalCursor = !!t, e && oB(this, e)
                }
                return this
            }
            return this._globalCursor
        }, preventDefault(t) {
            return arguments.length ? (this._preventDefault = t, this) : this._preventDefault
        }, timer: function (t, e) {
            this._timers.push(function (t, e, n) {
                var r = new LA, i = e;
                return null == e ? (r.restart(t, e, n), r) : (r._restart = r.restart, r.restart = function (t, e, n) {
                    e = +e, n = null == n ? OA() : +n, r._restart((function o(a) {
                        a += i, r._restart(o, i += e, n), t(a)
                    }), e, n)
                }, r.restart(t, e, n), r)
            }((function (e) {
                t({timestamp: Date.now(), elapsed: e})
            }), e))
        }, events: function (t, e, n) {
            var r, i = this, o = new Zo(n), a = function (n, r) {
                i.runAsync(null, (() => {
                    t === hB && function (t, e) {
                        var n = t._eventConfig.defaults, r = n.prevent, i = n.allow;
                        return !1 !== r && !0 !== i && (!0 === r || !1 === i || (r ? r[e] : i ? !i[e] : t.preventDefault()))
                    }(i, e) && n.preventDefault(), o.receive(fB(i, n, r))
                }))
            };
            if ("timer" === t) pB(i, "timer", e) && i.timer(a, e); else if (t === hB) pB(i, "view", e) && i.addEventListener(e, a, dB); else if ("window" === t ? pB(i, "window", e) && "undefined" != typeof window && (r = [window]) : "undefined" != typeof document && pB(i, "selector", e) && (r = document.querySelectorAll(t)), r) {
                for (var u = 0, s = r.length; u < s; ++u) r[u].addEventListener(e, a);
                i._eventListeners.push({type: e, sources: r, handler: a})
            } else i.warn("Can not resolve event source: " + t);
            return o
        }, finalize: function () {
            var t, e, n, r = this._tooltip, i = this._timers, o = this._eventListeners;
            for (t = i.length; --t >= 0;) i[t].stop();
            for (t = o.length; --t >= 0;) for (e = (n = o[t]).sources.length; --e >= 0;) n.sources[e].removeEventListener(n.type, n.handler);
            return r && r.call(this, this._handler, null, null, null), this
        }, hover: function (t, e) {
            return e = [e || "update", (t = [t || "hover"])[0]], this.on(this.events("view", "mouseover", gB), mB, yB(t)), this.on(this.events("view", "mouseout", gB), mB, yB(e)), this
        }, data: function (t, e) {
            return arguments.length < 2 ? aB(this, t).values.value : uB.call(this, t, $o().remove(p).insert(e))
        }, change: uB, insert: function (t, e) {
            return uB.call(this, t, $o().insert(e))
        }, remove: function (t, e) {
            return uB.call(this, t, $o().remove(e))
        }, scale: function (t) {
            var e = this._runtime.scales;
            return rt(e, t) || u("Unrecognized scale or projection: " + t), e[t].value
        }, initialize: function (t, e) {
            const n = this, r = n._renderType, i = n._eventConfig.bind, o = bv(r);
            t = n._el = t ? SB(n, t) : null, function (t) {
                const e = t.container();
                e && (e.setAttribute("role", "graphics-document"), e.setAttribute("aria-roleDescription", "visualization"), rB(e, t.description()))
            }(n), o || n.error("Unrecognized renderer type: " + r);
            const a = o.handler || Ey, u = t ? o.renderer : o.headless;
            return n._renderer = u ? CB(n, n._renderer, t, u) : null, n._handler = function (t, e, n, r) {
                const i = new r(t.loader(), FB(t, t.tooltip())).scene(t.scenegraph().root).initialize(n, cB(t), t);
                return e && e.handlers().forEach((t => {
                    i.on(t.type, t.handler)
                })), i
            }(n, n._handler, t, a), n._redraw = !0, t && "none" !== i && (e = e ? n._elBind = SB(n, e) : t.appendChild(vB("form", {class: "vega-bindings"})), n._bind.forEach((t => {
                t.param.element && "container" !== i && (t.element = SB(n, t.param.element))
            })), n._bind.forEach((t => {
                bB(n, t.element || e, t)
            }))), n
        }, toImageURL: async function (t, e) {
            t !== _v.Canvas && t !== _v.SVG && t !== _v.PNG && u("Unrecognized image type: " + t);
            const n = await zB(this, t, e);
            return t === _v.SVG ? function (t, e) {
                const n = new Blob([t], {type: e});
                return window.URL.createObjectURL(n)
            }(n.svg(), "image/svg+xml") : n.canvas().toDataURL("image/png")
        }, toCanvas: async function (t, e) {
            return (await zB(this, _v.Canvas, t, e)).canvas()
        }, toSVG: async function (t) {
            return (await zB(this, _v.SVG, t)).svg()
        }, getState: function (t) {
            return this._runtime.getState(t || {data: PB, signals: jB, recurse: !0})
        }, setState: function (t) {
            return this.runAsync(null, (e => {
                e._trigger = !1, e._runtime.setState(t)
            }), (t => {
                t._trigger = !0
            })), this
        }
    });
    const JB = "[", ZB = "]", QB = /[[\]{}]/, KB = {
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
    let tT, eT;

    function nT(t, e, n, r, i) {
        const o = t.length;
        let a, u = 0;
        for (; e < o; ++e) {
            if (a = t[e], !u && a === n) return e;
            i && i.indexOf(a) >= 0 ? --u : r && r.indexOf(a) >= 0 && ++u
        }
        return e
    }

    function rT(t) {
        const e = [], n = t.length;
        let r = 0, i = 0;
        for (; i < n;) i = nT(t, i, ",", "[{", "]}"), e.push(t.substring(r, i).trim()), r = ++i;
        if (0 === e.length) throw"Empty event selector: " + t;
        return e
    }

    function iT(t) {
        return "[" === t[0] ? function (t) {
            const e = t.length;
            let n, r = 1;
            if (r = nT(t, r, ZB, JB, ZB), r === e) throw"Empty between selector: " + t;
            if (n = rT(t.substring(1, r)), 2 !== n.length) throw"Between selector must have two elements: " + t;
            if (">" !== (t = t.slice(r + 1).trim())[0]) throw"Expected '>' after between selector: " + t;
            n = n.map(iT);
            const i = iT(t.slice(1).trim());
            if (i.between) return {between: n, stream: i};
            i.between = n;
            return i
        }(t) : function (t) {
            const e = {source: tT}, n = [];
            let r, i, o = [0, 0], a = 0, u = 0, s = t.length, l = 0;
            if ("}" === t[s - 1]) {
                if (l = t.lastIndexOf("{"), !(l >= 0)) throw"Unmatched right brace: " + t;
                try {
                    o = function (t) {
                        const e = t.split(",");
                        if (!t.length || e.length > 2) throw t;
                        return e.map((e => {
                            const n = +e;
                            if (n != n) throw t;
                            return n
                        }))
                    }(t.substring(l + 1, s - 1))
                } catch (e) {
                    throw"Invalid throttle specification: " + t
                }
                s = (t = t.slice(0, l).trim()).length, l = 0
            }
            if (!s) throw t;
            "@" === t[0] && (a = ++l);
            r = nT(t, l, ":"), r < s && (n.push(t.substring(u, r).trim()), u = l = ++r);
            if (l = nT(t, l, JB), l === s) n.push(t.substring(u, s).trim()); else if (n.push(t.substring(u, l).trim()), i = [], u = ++l, u === s) throw"Unmatched left bracket: " + t;
            for (; l < s;) {
                if (l = nT(t, l, ZB), l === s) throw"Unmatched left bracket: " + t;
                if (i.push(t.substring(u, l).trim()), l < s - 1 && t[++l] !== JB) throw"Expected left bracket: " + t;
                u = ++l
            }
            if (!(s = n.length) || QB.test(n[s - 1])) throw"Invalid event selector: " + t;
            s > 1 ? (e.type = n[1], a ? e.markname = n[0].slice(1) : !function (t) {
                return eT[t]
            }(n[0]) ? e.source = n[0] : e.marktype = n[0]) : e.type = n[0];
            "!" === e.type.slice(-1) && (e.consume = !0, e.type = e.type.slice(0, -1));
            null != i && (e.filter = i);
            o[0] && (e.throttle = o[0]);
            o[1] && (e.debounce = o[1]);
            return e
        }(t)
    }

    function oT(t) {
        return _(t) ? t : {type: t || "pad"}
    }

    const aT = t => +t || 0;

    function uT(t) {
        return _(t) ? t.signal ? t : {
            top: aT(t.top),
            bottom: aT(t.bottom),
            left: aT(t.left),
            right: aT(t.right)
        } : {top: e = aT(t), bottom: e, left: e, right: e};
        var e
    }

    const sT = t => _(t) && !v(t) ? K({}, t) : {value: t};

    function lT(t, e, n, r) {
        if (null != n) {
            return _(n) && !v(n) || v(n) && n.length && _(n[0]) ? t.update[e] = n : t[r || "enter"][e] = {value: n}, 1
        }
        return 0
    }

    function cT(t, e, n) {
        for (const n in e) lT(t, n, e[n]);
        for (const e in n) lT(t, e, n[e], "update")
    }

    function fT(t, e, n) {
        for (const r in e) n && rt(n, r) || (t[r] = K(t[r] || {}, e[r]));
        return t
    }

    function hT(t, e) {
        return e && (e.enter && e.enter[t] || e.update && e.update[t])
    }

    const dT = "mark", pT = "frame", gT = "scope", mT = "legend-label", yT = "title-text", vT = "title-subtitle";

    function _T(t, e, n) {
        t[e] = n && n.signal ? {signal: n.signal} : {value: n}
    }

    const xT = t => pt(t) ? wt(t) : t.signal ? "(".concat(t.signal, ")") : MT(t);

    function bT(t) {
        if (null != t.gradient) return function (t) {
            const e = [t.start, t.stop, t.count].map((t => null == t ? null : wt(t)));
            for (; e.length && null == M(e);) e.pop();
            return e.unshift(xT(t.gradient)), "gradient(".concat(e.join(","), ")")
        }(t);
        let e = t.signal ? "(".concat(t.signal, ")") : t.color ? function (t) {
            return t.c ? wT("hcl", t.h, t.c, t.l) : t.h || t.s ? wT("hsl", t.h, t.s, t.l) : t.l || t.a ? wT("lab", t.l, t.a, t.b) : t.r || t.g || t.b ? wT("rgb", t.r, t.g, t.b) : null
        }(t.color) : null != t.field ? MT(t.field) : void 0 !== t.value ? wt(t.value) : void 0;
        return null != t.scale && (e = function (t, e) {
            const n = xT(t.scale);
            null != t.range ? e = "lerp(_range(".concat(n, "), ").concat(+t.range, ")") : (void 0 !== e && (e = "_scale(".concat(n, ", ").concat(e, ")")), t.band && (e = (e ? e + "+" : "") + "_bandwidth(".concat(n, ")") + (1 == +t.band ? "" : "*" + kT(t.band)), t.extra && (e = "(datum.extra ? _scale(".concat(n, ", datum.extra.value) : ").concat(e, ")"))), null == e && (e = "0"));
            return e
        }(t, e)), void 0 === e && (e = null), null != t.exponent && (e = "pow(".concat(e, ",").concat(kT(t.exponent), ")")), null != t.mult && (e += "*".concat(kT(t.mult))), null != t.offset && (e += "+".concat(kT(t.offset))), t.round && (e = "round(".concat(e, ")")), e
    }

    const wT = (t, e, n, r) => "(".concat(t, "(").concat([e, n, r].map(bT).join(","), ")+'')");

    function kT(t) {
        return _(t) ? "(" + bT(t) + ")" : t
    }

    function MT(t) {
        return AT(_(t) ? t : {datum: t})
    }

    function AT(t) {
        let e, n, r;
        if (t.signal) e = "datum", r = t.signal; else if (t.group || t.parent) {
            for (n = Math.max(1, t.level || 1), e = "item"; n-- > 0;) e += ".mark.group";
            t.parent ? (r = t.parent, e += ".datum") : r = t.group
        } else t.datum ? (e = "datum", r = t.datum) : u("Invalid field reference: " + wt(t));
        return t.signal || (r = pt(r) ? s(r).map(wt).join("][") : AT(r)), e + "[" + r + "]"
    }

    function ET(t, e, n, r, i, o) {
        const a = {};
        (o = o || {}).encoders = {$encode: a}, t = function (t, e, n, r, i) {
            const o = {}, a = {};
            let u, s, l, c;
            for (s in s = "lineBreak", "text" !== e || null == i[s] || hT(s, t) || _T(o, s, i[s]), ("legend" == n || String(n).startsWith("axis")) && (n = null), c = n === pT ? i.group : n === dT ? K({}, i.mark, i[e]) : null, c) l = hT(s, t) || ("fill" === s || "stroke" === s) && (hT("fill", t) || hT("stroke", t)), l || _T(o, s, c[s]);
            for (s in $(r).forEach((e => {
                const n = i.style && i.style[e];
                for (const e in n) hT(e, t) || _T(o, e, n[e])
            })), t = K({}, t), o) c = o[s], c.signal ? (u = u || {})[s] = c : a[s] = c;
            return t.enter = K(a, t.enter), u && (t.update = K(u, t.update)), t
        }(t, e, n, r, i.config);
        for (const n in t) a[n] = DT(t[n], e, o, i);
        return o
    }

    function DT(t, e, n, r) {
        const i = {}, o = {};
        for (const e in t) null != t[e] && (i[e] = CT((a = t[e], v(a) ? function (t) {
            let e = "";
            return t.forEach((t => {
                const n = bT(t);
                e += t.test ? "(".concat(t.test, ")?").concat(n, ":") : n
            })), ":" === M(e) && (e += "null"), e
        }(a) : bT(a)), r, n, o));
        var a;
        return {$expr: {marktype: e, channels: i}, $fields: Object.keys(o), $output: Object.keys(t)}
    }

    function CT(t, e, n, r) {
        const i = HS(t, e);
        return i.$fields.forEach((t => r[t] = 1)), K(n, i.$params), i.$expr
    }

    const FT = ["value", "update", "init", "react", "bind"];

    function ST(t, e) {
        u(t + ' for "outer" push: ' + wt(e))
    }

    function BT(t, e) {
        const n = t.name;
        if ("outer" === t.push) e.signals[n] || ST("No prior signal definition", n), FT.forEach((e => {
            void 0 !== t[e] && ST("Invalid property ", e)
        })); else {
            const r = e.addSignal(n, t.value);
            !1 === t.react && (r.react = !1), t.bind && e.addBinding(n, t.bind)
        }
    }

    function TT(t, e, n, r) {
        this.id = -1, this.type = t, this.value = e, this.params = n, r && (this.parent = r)
    }

    function zT(t, e, n, r) {
        return new TT(t, e, n, r)
    }

    function NT(t, e) {
        return zT("operator", t, e)
    }

    function OT(t) {
        const e = {$ref: t.id};
        return t.id < 0 && (t.refs = t.refs || []).push(e), e
    }

    function RT(t, e) {
        return e ? {$field: t, $name: e} : {$field: t}
    }

    const LT = RT("key");

    function UT(t, e) {
        return {$compare: t, $order: e}
    }

    function qT(t, e) {
        return (t && t.signal ? "$" + t.signal : t || "") + (t && e ? "_" : "") + (e && e.signal ? "$" + e.signal : e || "")
    }

    const PT = "scope", jT = "view";

    function IT(t) {
        return t && t.signal
    }

    function $T(t) {
        if (IT(t)) return !0;
        if (_(t)) for (const e in t) if ($T(t[e])) return !0;
        return !1
    }

    function WT(t, e) {
        return null != t ? t : e
    }

    function HT(t) {
        return t && t.signal || t
    }

    const YT = "timer";

    function VT(t, e) {
        return (t.merge ? GT : t.stream ? XT : t.type ? JT : u("Invalid stream specification: " + wt(t)))(t, e)
    }

    function GT(t, e) {
        const n = ZT({merge: t.merge.map((t => VT(t, e)))}, t, e);
        return e.addStream(n).id
    }

    function XT(t, e) {
        const n = ZT({stream: VT(t.stream, e)}, t, e);
        return e.addStream(n).id
    }

    function JT(t, e) {
        let n;
        t.type === YT ? (n = e.event(YT, t.throttle), t = {
            between: t.between,
            filter: t.filter
        }) : n = e.event(function (t) {
            return t === PT ? jT : t || jT
        }(t.source), t.type);
        const r = ZT({stream: n}, t, e);
        return 1 === Object.keys(r).length ? n : e.addStream(r).id
    }

    function ZT(t, e, n) {
        let r = e.between;
        return r && (2 !== r.length && u('Stream "between" parameter must have 2 entries: ' + wt(e)), t.between = [VT(r[0], n), VT(r[1], n)]), r = e.filter ? [].concat(e.filter) : [], (e.marktype || e.markname || e.markrole) && r.push(function (t, e, n) {
            const r = "event.item";
            return r + (t && "*" !== t ? "&&" + r + ".mark.marktype==='" + t + "'" : "") + (n ? "&&" + r + ".mark.role==='" + n + "'" : "") + (e ? "&&" + r + ".mark.name==='" + e + "'" : "")
        }(e.marktype, e.markname, e.markrole)), e.source === PT && r.push("inScope(event.item)"), r.length && (t.filter = HS("(" + r.join(")&&(") + ")", n).$expr), null != (r = e.throttle) && (t.throttle = +r), null != (r = e.debounce) && (t.debounce = +r), e.consume && (t.consume = !0), t
    }

    const QT = {code: "_.$value", ast: {type: "Identifier", value: "value"}};

    function KT(t, e, n) {
        const r = t.encode, i = {target: n};
        let o = t.events, a = t.update, s = [];
        o || u("Signal update missing events specification."), pt(o) && (o = function (t, e, n) {
            return tT = e || "view", eT = n || KB, rT(t.trim()).map(iT)
        }(o, e.isSubscope() ? PT : jT)), o = $(o).filter((t => t.signal || t.scale ? (s.push(t), 0) : 1)), s.length > 1 && (s = [tz(s)]), o.length && s.push(o.length > 1 ? {merge: o} : o[0]), null != r && (a && u("Signal encode and update are mutually exclusive."), a = "encode(item()," + wt(r) + ")"), i.update = pt(a) ? HS(a, e) : null != a.expr ? HS(a.expr, e) : null != a.value ? a.value : null != a.signal ? {
            $expr: QT,
            $params: {$value: e.signalRef(a.signal)}
        } : u("Invalid signal update specification."), t.force && (i.options = {force: !0}), s.forEach((t => e.addUpdate(K(function (t, e) {
            return {source: t.signal ? e.signalRef(t.signal) : t.scale ? e.scaleRef(t.scale) : VT(t, e)}
        }(t, e), i))))
    }

    function tz(t) {
        return {signal: "[" + t.map((t => t.scale ? 'scale("' + t.scale + '")' : t.signal)) + "]"}
    }

    const ez = t => (e, n, r) => zT(t, n, e || void 0, r), nz = ez("aggregate"), rz = ez("axisticks"), iz = ez("bound"),
        oz = ez("collect"), az = ez("compare"), uz = ez("datajoin"), sz = ez("encode"), lz = ez("expression"),
        cz = ez("facet"), fz = ez("field"), hz = ez("key"), dz = ez("legendentries"), pz = ez("load"), gz = ez("mark"),
        mz = ez("multiextent"), yz = ez("multivalues"), vz = ez("overlap"), _z = ez("params"), xz = ez("prefacet"),
        bz = ez("projection"), wz = ez("proxy"), kz = ez("relay"), Mz = ez("render"), Az = ez("scale"),
        Ez = ez("sieve"), Dz = ez("sortitems"), Cz = ez("viewlayout"), Fz = ez("values");
    let Sz = 0;
    const Bz = {min: "min", max: "max", count: "sum"};

    function Tz(t, e) {
        const n = e.getScale(t.name).params;
        let r;
        for (r in n.domain = Rz(t.domain, t, e), null != t.range && (n.range = Wz(t, e, n)), null != t.interpolate && function (t, e) {
            e.interpolate = zz(t.type || t), null != t.gamma && (e.interpolateGamma = zz(t.gamma))
        }(t.interpolate, n), null != t.nice && (n.nice = function (t) {
            return _(t) ? {interval: zz(t.interval), step: zz(t.step)} : zz(t)
        }(t.nice)), null != t.bins && (n.bins = function (t, e) {
            return t.signal || v(t) ? Nz(t, e) : e.objectProperty(t)
        }(t.bins, e)), t) rt(n, r) || "name" === r || (n[r] = zz(t[r], e))
    }

    function zz(t, e) {
        return _(t) ? t.signal ? e.signalRef(t.signal) : u("Unsupported object: " + wt(t)) : t
    }

    function Nz(t, e) {
        return t.signal ? e.signalRef(t.signal) : t.map((t => zz(t, e)))
    }

    function Oz(t) {
        u("Can not find data set: " + wt(t))
    }

    function Rz(t, e, n) {
        if (t) return t.signal ? n.signalRef(t.signal) : (v(t) ? Lz : t.fields ? qz : Uz)(t, e, n);
        null == e.domainMin && null == e.domainMax || u("No scale domain defined for domainMin/domainMax to override.")
    }

    function Lz(t, e, n) {
        return t.map((t => zz(t, n)))
    }

    function Uz(t, e, n) {
        const r = n.getData(t.data);
        return r || Oz(t.data), vd(e.type) ? r.valuesRef(n, t.field, jz(t.sort, !1)) : wd(e.type) ? r.domainRef(n, t.field) : r.extentRef(n, t.field)
    }

    function qz(t, e, n) {
        const r = t.data,
            i = t.fields.reduce(((t, e) => (e = pt(e) ? {data: r, field: e} : v(e) || e.signal ? function (t, e) {
                const n = "_:vega:_" + Sz++, r = oz({});
                if (v(t)) r.value = {$ingest: t}; else if (t.signal) {
                    const i = "setdata(" + wt(n) + "," + t.signal + ")";
                    r.params.input = e.signalRef(i)
                }
                return e.addDataPipeline(n, [r, Ez({})]), {data: n, field: "data"}
            }(e, n) : e, t.push(e), t)), []);
        return (vd(e.type) ? Pz : wd(e.type) ? Iz : $z)(t, n, i)
    }

    function Pz(t, e, n) {
        const r = jz(t.sort, !0);
        let i, o;
        const a = n.map((t => {
            const n = e.getData(t.data);
            return n || Oz(t.data), n.countsRef(e, t.field, r)
        })), u = {groupby: LT, pulse: a};
        r && (i = r.op || "count", o = r.field ? qT(i, r.field) : "count", u.ops = [Bz[i]], u.fields = [e.fieldRef(o)], u.as = [o]), i = e.add(nz(u));
        const s = e.add(oz({pulse: OT(i)}));
        return o = e.add(Fz({field: LT, sort: e.sortRef(r), pulse: OT(s)})), OT(o)
    }

    function jz(t, e) {
        return t && (t.field || t.op ? t.field || "count" === t.op ? e && t.field && t.op && !Bz[t.op] && u("Multiple domain scales can not be sorted using " + t.op) : u("No field provided for sort aggregate op: " + t.op) : _(t) ? t.field = "key" : t = {field: "key"}), t
    }

    function Iz(t, e, n) {
        const r = n.map((t => {
            const n = e.getData(t.data);
            return n || Oz(t.data), n.domainRef(e, t.field)
        }));
        return OT(e.add(yz({values: r})))
    }

    function $z(t, e, n) {
        const r = n.map((t => {
            const n = e.getData(t.data);
            return n || Oz(t.data), n.extentRef(e, t.field)
        }));
        return OT(e.add(mz({extents: r})))
    }

    function Wz(t, e, n) {
        const r = e.config.range;
        let i = t.range;
        if (i.signal) return e.signalRef(i.signal);
        if (pt(i)) {
            if (r && rt(r, i)) return Wz(t = K({}, t, {range: r[i]}), e, n);
            "width" === i ? i = [0, {signal: "width"}] : "height" === i ? i = vd(t.type) ? [0, {signal: "height"}] : [{signal: "height"}, 0] : u("Unrecognized scale range value: " + wt(i))
        } else {
            if (i.scheme) return n.scheme = v(i.scheme) ? Nz(i.scheme, e) : zz(i.scheme, e), i.extent && (n.schemeExtent = Nz(i.extent, e)), void (i.count && (n.schemeCount = zz(i.count, e)));
            if (i.step) return void (n.rangeStep = zz(i.step, e));
            if (vd(t.type) && !v(i)) return Rz(i, t, e);
            v(i) || u("Unsupported range type: " + wt(i))
        }
        return i.map((t => (v(t) ? Nz : zz)(t, e)))
    }

    function Hz(t, e, n) {
        return v(t) ? t.map((t => Hz(t, e, n))) : _(t) ? t.signal ? n.signalRef(t.signal) : "fit" === e ? t : u("Unsupported parameter object: " + wt(t)) : t
    }

    const Yz = "top", Vz = "left", Gz = "right", Xz = "bottom", Jz = "center", Zz = "index", Qz = "label", Kz = "perc",
        tN = "value", eN = "guide-label", nN = "guide-title", rN = "group-title", iN = "group-subtitle", oN = "symbol",
        aN = "gradient", uN = "discrete", sN = "size",
        lN = [sN, "shape", "fill", "stroke", "strokeWidth", "strokeDash", "opacity"],
        cN = {name: 1, style: 1, interactive: 1}, fN = {value: 0}, hN = {value: 1}, dN = "group", pN = "rect",
        gN = "rule", mN = "text";

    function yN(t) {
        return t.type = dN, t.interactive = t.interactive || !1, t
    }

    function vN(t, e) {
        const n = (n, r) => WT(t[n], WT(e[n], r));
        return n.isVertical = n => "vertical" === WT(t.direction, e.direction || (n ? e.symbolDirection : e.gradientDirection)), n.gradientLength = () => WT(t.gradientLength, e.gradientLength || e.gradientWidth), n.gradientThickness = () => WT(t.gradientThickness, e.gradientThickness || e.gradientHeight), n.entryColumns = () => WT(t.columns, WT(e.columns, +n.isVertical(!0))), n
    }

    function _N(t, e) {
        const n = e && (e.update && e.update[t] || e.enter && e.enter[t]);
        return n && n.signal ? n : n ? n.value : null
    }

    function xN(t, e, n) {
        return "item.anchor === '".concat("start", "' ? ").concat(t, " : item.anchor === '").concat("end", "' ? ").concat(e, " : ").concat(n)
    }

    const bN = xN(wt(Vz), wt(Gz), wt(Jz));

    function wN(t, e) {
        return e ? t ? _(t) ? Object.assign({}, t, {offset: wN(t.offset, e)}) : {value: t, offset: e} : e : t
    }

    function kN(t, e) {
        return e ? (t.name = e.name, t.style = e.style || t.style, t.interactive = !!e.interactive, t.encode = fT(t.encode, e, cN)) : t.interactive = !1, t
    }

    function MN(t, e, n, r) {
        const i = vN(t, n), o = i.isVertical(), a = i.gradientThickness(), u = i.gradientLength();
        let s, l, c, f, h;
        o ? (l = [0, 1], c = [0, 0], f = a, h = u) : (l = [0, 0], c = [1, 0], f = u, h = a);
        const d = {
            enter: s = {opacity: fN, x: fN, y: fN, width: sT(f), height: sT(h)},
            update: K({}, s, {opacity: hN, fill: {gradient: e, start: l, stop: c}}),
            exit: {opacity: fN}
        };
        return cT(d, {
            stroke: i("gradientStrokeColor"),
            strokeWidth: i("gradientStrokeWidth")
        }, {opacity: i("gradientOpacity")}), kN({type: pN, role: "legend-gradient", encode: d}, r)
    }

    function AN(t, e, n, r, i) {
        const o = vN(t, n), a = o.isVertical(), u = o.gradientThickness(), s = o.gradientLength();
        let l, c, f, h, d = "";
        a ? (l = "y", f = "y2", c = "x", h = "width", d = "1-") : (l = "x", f = "x2", c = "y", h = "height");
        const p = {opacity: fN, fill: {scale: e, field: tN}};
        p[l] = {signal: d + "datum." + Kz, mult: s}, p[c] = fN, p[f] = {
            signal: d + "datum.perc2",
            mult: s
        }, p[h] = sT(u);
        const g = {enter: p, update: K({}, p, {opacity: hN}), exit: {opacity: fN}};
        return cT(g, {
            stroke: o("gradientStrokeColor"),
            strokeWidth: o("gradientStrokeWidth")
        }, {opacity: o("gradientOpacity")}), kN({type: pN, role: "legend-band", key: tN, from: i, encode: g}, r)
    }

    const EN = "datum.".concat(Kz, '<=0?"').concat(Vz, '":datum.').concat(Kz, '>=1?"').concat(Gz, '":"').concat(Jz, '"'),
        DN = "datum.".concat(Kz, '<=0?"').concat(Xz, '":datum.').concat(Kz, '>=1?"').concat(Yz, '":"').concat("middle", '"');

    function CN(t, e, n, r) {
        const i = vN(t, e), o = i.isVertical(), a = sT(i.gradientThickness()), u = i.gradientLength();
        let s, l, c, f, h = i("labelOverlap"), d = "";
        const p = {enter: s = {opacity: fN}, update: l = {opacity: hN, text: {field: Qz}}, exit: {opacity: fN}};
        return cT(p, {
            fill: i("labelColor"),
            fillOpacity: i("labelOpacity"),
            font: i("labelFont"),
            fontSize: i("labelFontSize"),
            fontStyle: i("labelFontStyle"),
            fontWeight: i("labelFontWeight"),
            limit: WT(t.labelLimit, e.gradientLabelLimit)
        }), o ? (s.align = {value: "left"}, s.baseline = l.baseline = {signal: DN}, c = "y", f = "x", d = "1-") : (s.align = l.align = {signal: EN}, s.baseline = {value: "top"}, c = "x", f = "y"), s[c] = l[c] = {
            signal: d + "datum." + Kz,
            mult: u
        }, s[f] = l[f] = a, a.offset = WT(t.labelOffset, e.gradientLabelOffset) || 0, h = h ? {
            separation: i("labelSeparation"),
            method: h,
            order: "datum.index"
        } : void 0, kN({type: mN, role: mT, style: eN, key: tN, from: r, encode: p, overlap: h}, n)
    }

    function FN(t, e, n, r, i) {
        const o = vN(t, e), a = n.entries, u = !(!a || !a.interactive), s = a ? a.name : void 0, l = o("clipHeight"),
            c = o("symbolOffset"), f = {data: "value"},
            h = "(".concat(i, ") ? datum.").concat("offset", " : datum.").concat(sN), d = l ? sT(l) : {field: sN},
            p = "datum.".concat(Zz), g = "max(1, ".concat(i, ")");
        let m, y, v, _, x;
        d.mult = .5, m = {
            enter: y = {opacity: fN, x: {signal: h, mult: .5, offset: c}, y: d},
            update: v = {opacity: hN, x: y.x, y: y.y},
            exit: {opacity: fN}
        };
        let b = null, w = null;
        t.fill || (b = e.symbolBaseFillColor, w = e.symbolBaseStrokeColor), cT(m, {
            fill: o("symbolFillColor", b),
            shape: o("symbolType"),
            size: o("symbolSize"),
            stroke: o("symbolStrokeColor", w),
            strokeDash: o("symbolDash"),
            strokeDashOffset: o("symbolDashOffset"),
            strokeWidth: o("symbolStrokeWidth")
        }, {opacity: o("symbolOpacity")}), lN.forEach((e => {
            t[e] && (v[e] = y[e] = {scale: t[e], field: tN})
        }));
        const k = kN({
            type: "symbol",
            role: "legend-symbol",
            key: tN,
            from: f,
            clip: !!l || void 0,
            encode: m
        }, n.symbols), M = sT(c);
        M.offset = o("labelOffset"), m = {
            enter: y = {opacity: fN, x: {signal: h, offset: M}, y: d},
            update: v = {opacity: hN, text: {field: Qz}, x: y.x, y: y.y},
            exit: {opacity: fN}
        }, cT(m, {
            align: o("labelAlign"),
            baseline: o("labelBaseline"),
            fill: o("labelColor"),
            fillOpacity: o("labelOpacity"),
            font: o("labelFont"),
            fontSize: o("labelFontSize"),
            fontStyle: o("labelFontStyle"),
            fontWeight: o("labelFontWeight"),
            limit: o("labelLimit")
        });
        const A = kN({type: mN, role: mT, style: eN, key: tN, from: f, encode: m}, n.labels);
        return m = {
            enter: {noBound: {value: !l}, width: fN, height: l ? sT(l) : fN, opacity: fN},
            exit: {opacity: fN},
            update: v = {opacity: hN, row: {signal: null}, column: {signal: null}}
        }, o.isVertical(!0) ? (_ = "ceil(item.mark.items.length / ".concat(g, ")"), v.row.signal = "".concat(p, "%").concat(_), v.column.signal = "floor(".concat(p, " / ").concat(_, ")"), x = {field: ["row", p]}) : (v.row.signal = "floor(".concat(p, " / ").concat(g, ")"), v.column.signal = "".concat(p, " % ").concat(g), x = {field: p}), v.column.signal = "(".concat(i, ")?").concat(v.column.signal, ":").concat(p), yN({
            role: gT,
            from: r = {facet: {data: r, name: "value", groupby: Zz}},
            encode: fT(m, a, cN),
            marks: [k, A],
            name: s,
            interactive: u,
            sort: x
        })
    }

    const SN = 'item.orient === "left"', BN = 'item.orient === "right"', TN = "(".concat(SN, " || ").concat(BN, ")"),
        zN = "datum.vgrad && ".concat(TN), NN = xN('"top"', '"bottom"', '"middle"'),
        ON = xN('"right"', '"left"', '"center"'),
        RN = "datum.vgrad && ".concat(BN, " ? (").concat(ON, ") : (").concat(TN, " && !(datum.vgrad && ").concat(SN, ')) ? "left" : ').concat(bN),
        LN = "item._anchor || (".concat(TN, ' ? "middle" : "start")'),
        UN = "".concat(zN, " ? (").concat(SN, " ? -90 : 90) : 0"),
        qN = "".concat(TN, " ? (datum.vgrad ? (").concat(BN, ' ? "bottom" : "top") : ').concat(NN, ') : "top"');

    function PN(t, e) {
        let n;
        return _(t) && (t.signal ? n = t.signal : t.path ? n = "pathShape(" + jN(t.path) + ")" : t.sphere && (n = "geoShape(" + jN(t.sphere) + ', {type: "Sphere"})')), n ? e.signalRef(n) : !!t
    }

    function jN(t) {
        return _(t) && t.signal ? t.signal : wt(t)
    }

    function IN(t) {
        const e = t.role || "";
        return e.indexOf("axis") && e.indexOf("legend") && e.indexOf("title") ? t.type === dN ? gT : e || dT : e
    }

    function $N(t) {
        return {
            marktype: t.type,
            name: t.name || void 0,
            role: t.role || IN(t),
            zindex: +t.zindex || void 0,
            aria: t.aria,
            description: t.description
        }
    }

    function WN(t, e) {
        return t && t.signal ? e.signalRef(t.signal) : !1 !== t
    }

    function HN(t, e) {
        const n = ma(t.type);
        n || u("Unrecognized transform type: " + wt(t.type));
        const r = zT(n.type.toLowerCase(), null, YN(n, t, e));
        return t.signal && e.addSignal(t.signal, e.proxy(r)), r.metadata = n.metadata || {}, r
    }

    function YN(t, e, n) {
        const r = {}, i = t.params.length;
        for (let o = 0; o < i; ++o) {
            const i = t.params[o];
            r[i.name] = VN(i, e, n)
        }
        return r
    }

    function VN(t, e, n) {
        const r = t.type, i = e[t.name];
        return "index" === r ? function (t, e, n) {
            pt(e.from) || u('Lookup "from" parameter must be a string literal.');
            return n.getData(e.from).lookupRef(n, e.key)
        }(0, e, n) : void 0 !== i ? "param" === r ? function (t, e, n) {
            const r = e[t.name];
            return t.array ? (v(r) || u("Expected an array of sub-parameters. Instead: " + wt(r)), r.map((e => XN(t, e, n)))) : XN(t, r, n)
        }(t, e, n) : "projection" === r ? n.projectionRef(e[t.name]) : t.array && !IT(i) ? i.map((e => GN(t, e, n))) : GN(t, i, n) : void (t.required && u("Missing required " + wt(e.type) + " parameter: " + wt(t.name)))
    }

    function GN(t, e, n) {
        const r = t.type;
        if (IT(e)) return KN(r) ? u("Expression references can not be signals.") : tO(r) ? n.fieldRef(e) : eO(r) ? n.compareRef(e) : n.signalRef(e.signal);
        {
            const i = t.expr || tO(r);
            return i && JN(e) ? n.exprRef(e.expr, e.as) : i && ZN(e) ? RT(e.field, e.as) : KN(r) ? HS(e, n) : QN(r) ? OT(n.getData(e).values) : tO(r) ? RT(e) : eO(r) ? n.compareRef(e) : e
        }
    }

    function XN(t, e, n) {
        const r = t.params.length;
        let i;
        for (let n = 0; n < r; ++n) {
            i = t.params[n];
            for (const t in i.key) if (i.key[t] !== e[t]) {
                i = null;
                break
            }
            if (i) break
        }
        i || u("Unsupported parameter: " + wt(e));
        const o = K(YN(i, e, n), i.key);
        return OT(n.add(_z(o)))
    }

    const JN = t => t && t.expr, ZN = t => t && t.field, QN = t => "data" === t, KN = t => "expr" === t,
        tO = t => "field" === t, eO = t => "compare" === t;

    function nO(t, e) {
        return t.$ref ? t : t.data && t.data.$ref ? t.data : OT(e.getData(t.data).output)
    }

    function rO(t, e, n, r, i) {
        this.scope = t, this.input = e, this.output = n, this.values = r, this.aggregate = i, this.index = {}
    }

    function iO(t) {
        return pt(t) ? t : null
    }

    function oO(t, e, n) {
        const r = qT(n.op, n.field);
        let i;
        if (e.ops) {
            for (let t = 0, n = e.as.length; t < n; ++t) if (e.as[t] === r) return
        } else e.ops = ["count"], e.fields = [null], e.as = ["count"];
        n.op && (e.ops.push((i = n.op.signal) ? t.signalRef(i) : n.op), e.fields.push(t.fieldRef(n.field)), e.as.push(r))
    }

    function aO(t, e, n, r, i, o, a) {
        const u = e[n] || (e[n] = {}), s = function (t) {
            return _(t) ? ("descending" === t.order ? "-" : "+") + qT(t.op, t.field) : ""
        }(o);
        let l, c, f = iO(i);
        if (null != f && (t = e.scope, f += s ? "|" + s : "", l = u[f]), !l) {
            const n = o ? {field: LT, pulse: e.countsRef(t, i, o)} : {field: t.fieldRef(i), pulse: OT(e.output)};
            s && (n.sort = t.sortRef(o)), c = t.add(zT(r, void 0, n)), a && (e.index[i] = c), l = OT(c), null != f && (u[f] = l)
        }
        return l
    }

    function uO(t, e, n) {
        const r = t.remove, i = t.insert, o = t.toggle, a = t.modify, u = t.values, s = e.add(NT()),
            l = HS("if(" + t.trigger + ',modify("' + n + '",' + [i, r, o, a, u].map((t => null == t ? "null" : t)).join(",") + "),0)", e);
        s.update = l.$expr, s.params = l.$params
    }

    function sO(t, e) {
        const n = IN(t), r = t.type === dN, i = t.from && t.from.facet, o = t.overlap;
        let a, s, l, c, f, h, d, p = t.layout || n === gT || n === pT;
        const g = n === dT || p || i, m = function (t, e, n) {
            let r, i, o, a, s;
            return t ? (r = t.facet) && (e || u("Only group marks can be faceted."), null != r.field ? a = s = nO(r, n) : (t.data ? s = OT(n.getData(t.data).aggregate) : (o = HN(K({
                type: "aggregate",
                groupby: $(r.groupby)
            }, r.aggregate), n), o.params.key = n.keyRef(r.groupby), o.params.pulse = nO(r, n), a = s = OT(n.add(o))), i = n.keyRef(r.groupby, !0))) : a = OT(n.add(oz(null, [{}]))), a || (a = nO(t, n)), {
                key: i,
                pulse: a,
                parent: s
            }
        }(t.from, r, e);
        s = e.add(uz({key: m.key || (t.key ? RT(t.key) : void 0), pulse: m.pulse, clean: !r}));
        const y = OT(s);
        s = l = e.add(oz({pulse: y})), s = e.add(gz({
            markdef: $N(t),
            interactive: WN(t.interactive, e),
            clip: PN(t.clip, e),
            context: {$context: !0},
            groups: e.lookup(),
            parent: e.signals.parent ? e.signalRef("parent") : null,
            index: e.markpath(),
            pulse: OT(s)
        }));
        const v = OT(s);
        s = c = e.add(sz(ET(t.encode, t.type, n, t.style, e, {
            mod: !1,
            pulse: v
        }))), s.params.parent = e.encode(), t.transform && t.transform.forEach((t => {
            const n = HN(t, e), r = n.metadata;
            (r.generates || r.changes) && u("Mark transforms should not generate new data."), r.nomod || (c.params.mod = !0), n.params.pulse = OT(s), e.add(s = n)
        })), t.sort && (s = e.add(Dz({sort: e.compareRef(t.sort), pulse: OT(s)})));
        const _ = OT(s);
        (i || p) && (p = e.add(Cz({
            layout: e.objectProperty(t.layout),
            legends: e.legends,
            mark: v,
            pulse: _
        })), h = OT(p));
        const x = e.add(iz({mark: v, pulse: h || _}));
        d = OT(x), r && (g && (a = e.operators, a.pop(), p && a.pop()), e.pushState(_, h || d, y), i ? function (t, e, n) {
            const r = t.from.facet, i = r.name, o = nO(r, e);
            let a;
            r.name || u("Facet must have a name: " + wt(r)), r.data || u("Facet must reference a data set: " + wt(r)), r.field ? a = e.add(xz({
                field: e.fieldRef(r.field),
                pulse: o
            })) : r.groupby ? a = e.add(cz({
                key: e.keyRef(r.groupby),
                group: OT(e.proxy(n.parent)),
                pulse: o
            })) : u("Facet must specify groupby or field: " + wt(r));
            const s = e.fork(), l = s.add(oz()), c = s.add(Ez({pulse: OT(l)}));
            s.addData(i, new rO(s, l, l, c)), s.addSignal("parent", null), a.params.subflow = {$subflow: s.parse(t).toRuntime()}
        }(t, e, m) : g ? function (t, e, n) {
            const r = e.add(xz({pulse: n.pulse})), i = e.fork();
            i.add(Ez()), i.addSignal("parent", null), r.params.subflow = {$subflow: i.parse(t).toRuntime()}
        }(t, e, m) : e.parse(t), e.popState(), g && (p && a.push(p), a.push(x))), o && (d = function (t, e, n) {
            const r = t.method, i = t.bound, o = t.separation, a = {
                separation: IT(o) ? n.signalRef(o.signal) : o,
                method: IT(r) ? n.signalRef(r.signal) : r,
                pulse: e
            };
            t.order && (a.sort = n.compareRef({field: t.order}));
            if (i) {
                const t = i.tolerance;
                a.boundTolerance = IT(t) ? n.signalRef(t.signal) : +t, a.boundScale = n.scaleRef(i.scale), a.boundOrient = i.orient
            }
            return OT(n.add(vz(a)))
        }(o, d, e));
        const b = e.add(Mz({pulse: d})), w = e.add(Ez({pulse: OT(b)}, void 0, e.parent()));
        null != t.name && (f = t.name, e.addData(f, new rO(e, l, b, w)), t.on && t.on.forEach((t => {
            (t.insert || t.remove || t.toggle) && u("Marks only support modify triggers."), uO(t, e, f)
        })))
    }

    function lO(t, e) {
        const n = e.config.legend, r = t.encode || {}, i = vN(t, n), o = r.legend || {}, a = o.name || void 0,
            s = o.interactive, l = o.style, c = {};
        let f, h, d, p = 0;
        lN.forEach((e => t[e] ? (c[e] = t[e], p = p || t[e]) : 0)), p || u("Missing valid scale for legend.");
        const g = function (t, e) {
                let n = t.type || oN;
                t.type || 1 !== function (t) {
                    return lN.reduce(((e, n) => e + (t[n] ? 1 : 0)), 0)
                }(t) || !t.fill && !t.stroke || (n = yd(e) ? aN : _d(e) ? uN : oN);
                return n !== aN ? n : _d(e) ? uN : aN
            }(t, e.scaleType(p)), m = {title: null != t.title, scales: c, type: g, vgrad: "symbol" !== g && i.isVertical()},
            y = OT(e.add(oz(null, [m]))), v = OT(e.add(dz(h = {
                type: g,
                scale: e.scaleRef(p),
                count: e.objectProperty(i("tickCount")),
                limit: e.property(i("symbolLimit")),
                values: e.objectProperty(t.values),
                minstep: e.property(t.tickMinStep),
                formatType: e.property(t.formatType),
                formatSpecifier: e.property(t.format)
            })));
        return g === aN ? (d = [MN(t, p, n, r.gradient), CN(t, n, r.labels, v)], h.count = h.count || e.signalRef("max(2,2*floor((".concat(HT(i.gradientLength()), ")/100))"))) : g === uN ? d = [AN(t, p, n, r.gradient, v), CN(t, n, r.labels, v)] : (f = function (t, e) {
            const n = vN(t, e);
            return {
                align: n("gridAlign"),
                columns: n.entryColumns(),
                center: {row: !0, column: !1},
                padding: {row: n("rowPadding"), column: n("columnPadding")}
            }
        }(t, n), d = [FN(t, n, r, v, HT(f.columns))], h.size = function (t, e, n) {
            const r = HT(fO("size", t, n)), i = HT(fO("strokeWidth", t, n)), o = HT(function (t, e, n) {
                return _N("fontSize", t) || function (t, e, n) {
                    const r = e.config.style[n];
                    return r && r[t]
                }("fontSize", e, n)
            }(n[1].encode, e, eN));
            return HS("max(ceil(sqrt(".concat(r, ")+").concat(i, "),").concat(o, ")"), e)
        }(t, e, d[0].marks)), d = [yN({
            role: "legend-entry",
            from: y,
            encode: {enter: {x: {value: 0}, y: {value: 0}}},
            marks: d,
            layout: f,
            interactive: s
        })], m.title && d.push(function (t, e, n, r) {
            const i = vN(t, e), o = {
                enter: {opacity: fN},
                update: {opacity: hN, x: {field: {group: "padding"}}, y: {field: {group: "padding"}}},
                exit: {opacity: fN}
            };
            return cT(o, {
                orient: i("titleOrient"),
                _anchor: i("titleAnchor"),
                anchor: {signal: LN},
                angle: {signal: UN},
                align: {signal: RN},
                baseline: {signal: qN},
                text: t.title,
                fill: i("titleColor"),
                fillOpacity: i("titleOpacity"),
                font: i("titleFont"),
                fontSize: i("titleFontSize"),
                fontStyle: i("titleFontStyle"),
                fontWeight: i("titleFontWeight"),
                limit: i("titleLimit"),
                lineHeight: i("titleLineHeight")
            }, {align: i("titleAlign"), baseline: i("titleBaseline")}), kN({
                type: mN,
                role: "legend-title",
                style: nN,
                from: r,
                encode: o
            }, n)
        }(t, n, r.title, y)), sO(yN({
            role: "legend",
            from: y,
            encode: fT(cO(i, t, n), o, cN),
            marks: d,
            aria: i("aria"),
            description: i("description"),
            zindex: i("zindex"),
            name: a,
            interactive: s,
            style: l
        }), e)
    }

    function cO(t, e, n) {
        const r = {enter: {}, update: {}};
        return cT(r, {
            orient: t("orient"),
            offset: t("offset"),
            padding: t("padding"),
            titlePadding: t("titlePadding"),
            cornerRadius: t("cornerRadius"),
            fill: t("fillColor"),
            stroke: t("strokeColor"),
            strokeWidth: n.strokeWidth,
            strokeDash: n.strokeDash,
            x: t("legendX"),
            y: t("legendY"),
            format: e.format,
            formatType: e.formatType
        }), r
    }

    function fO(t, e, n) {
        return e[t] ? 'scale("'.concat(e[t], '",datum)') : _N(t, n[0].encode)
    }

    rO.fromEntries = function (t, e) {
        const n = e.length, r = e[n - 1], i = e[n - 2];
        let o = e[0], a = null, u = 1;
        for (o && "load" === o.type && (o = e[1]), t.add(e[0]); u < n; ++u) e[u].params.pulse = OT(e[u - 1]), t.add(e[u]), "aggregate" === e[u].type && (a = e[u]);
        return new rO(t, o, i, r, a)
    }, rO.prototype = {
        countsRef(t, e, n) {
            const r = this, i = r.counts || (r.counts = {}), o = iO(e);
            let a, u, s;
            return null != o && (t = r.scope, a = i[o]), a ? n && n.field && oO(t, a.agg.params, n) : (s = {
                groupby: t.fieldRef(e, "key"),
                pulse: OT(r.output)
            }, n && n.field && oO(t, s, n), u = t.add(nz(s)), a = t.add(oz({pulse: OT(u)})), a = {
                agg: u,
                ref: OT(a)
            }, null != o && (i[o] = a)), a.ref
        }, tuplesRef() {
            return OT(this.values)
        }, extentRef(t, e) {
            return aO(t, this, "extent", "extent", e, !1)
        }, domainRef(t, e) {
            return aO(t, this, "domain", "values", e, !1)
        }, valuesRef(t, e, n) {
            return aO(t, this, "vals", "values", e, n || !0)
        }, lookupRef(t, e) {
            return aO(t, this, "lookup", "tupleindex", e, !1)
        }, indataRef(t, e) {
            return aO(t, this, "indata", "tupleindex", e, !0, !0)
        }
    };
    const hO = 'item.orient==="'.concat(Vz, '"?-90:item.orient==="').concat(Gz, '"?90:0');

    function dO(t, e) {
        const n = vN(t = pt(t) ? {text: t} : t, e.config.title), r = t.encode || {}, i = r.group || {},
            o = i.name || void 0, a = i.interactive, u = i.style, s = [], l = OT(e.add(oz(null, [{}])));
        return s.push(function (t, e, n, r) {
            const i = {value: 0}, o = t.text,
                a = {enter: {opacity: i}, update: {opacity: {value: 1}}, exit: {opacity: i}};
            return cT(a, {
                text: o,
                align: {signal: "item.mark.group.align"},
                angle: {signal: "item.mark.group.angle"},
                limit: {signal: "item.mark.group.limit"},
                baseline: "top",
                dx: e("dx"),
                dy: e("dy"),
                fill: e("color"),
                font: e("font"),
                fontSize: e("fontSize"),
                fontStyle: e("fontStyle"),
                fontWeight: e("fontWeight"),
                lineHeight: e("lineHeight")
            }, {align: e("align"), angle: e("angle"), baseline: e("baseline")}), kN({
                type: mN,
                role: yT,
                style: rN,
                from: r,
                encode: a
            }, n)
        }(t, n, function (t) {
            const e = t.encode;
            return e && e.title || K({name: t.name, interactive: t.interactive, style: t.style}, e)
        }(t), l)), t.subtitle && s.push(function (t, e, n, r) {
            const i = {value: 0}, o = t.subtitle,
                a = {enter: {opacity: i}, update: {opacity: {value: 1}}, exit: {opacity: i}};
            return cT(a, {
                text: o,
                align: {signal: "item.mark.group.align"},
                angle: {signal: "item.mark.group.angle"},
                limit: {signal: "item.mark.group.limit"},
                baseline: "top",
                dx: e("dx"),
                dy: e("dy"),
                fill: e("subtitleColor"),
                font: e("subtitleFont"),
                fontSize: e("subtitleFontSize"),
                fontStyle: e("subtitleFontStyle"),
                fontWeight: e("subtitleFontWeight"),
                lineHeight: e("subtitleLineHeight")
            }, {align: e("align"), angle: e("angle"), baseline: e("baseline")}), kN({
                type: mN,
                role: vT,
                style: iN,
                from: r,
                encode: a
            }, n)
        }(t, n, r.subtitle, l)), sO(yN({
            role: "title",
            from: l,
            encode: pO(n, i),
            marks: s,
            aria: n("aria"),
            description: n("description"),
            zindex: n("zindex"),
            name: o,
            interactive: a,
            style: u
        }), e)
    }

    function pO(t, e) {
        const n = {enter: {}, update: {}};
        return cT(n, {
            orient: t("orient"),
            anchor: t("anchor"),
            align: {signal: bN},
            angle: {signal: hO},
            limit: t("limit"),
            frame: t("frame"),
            offset: t("offset") || 0,
            padding: t("subtitlePadding")
        }), fT(n, e, cN)
    }

    function gO(t, e) {
        const n = [];
        t.transform && t.transform.forEach((t => {
            n.push(HN(t, e))
        })), t.on && t.on.forEach((n => {
            uO(n, e, t.name)
        })), e.addDataPipeline(t.name, function (t, e, n) {
            const r = [];
            let i, o, a, u, s, l = null, c = !1, f = !1;
            t.values ? $T(t.values) || $T(t.format) ? (r.push(yO(e, t)), r.push(l = mO())) : r.push(l = mO({
                $ingest: t.values,
                $format: t.format
            })) : t.url ? $T(t.url) || $T(t.format) ? (r.push(yO(e, t)), r.push(l = mO())) : r.push(l = mO({
                $request: t.url,
                $format: t.format
            })) : t.source && (l = i = $(t.source).map((t => OT(e.getData(t).output))), r.push(null));
            for (o = 0, a = n.length; o < a; ++o) u = n[o], s = u.metadata, l || s.source || r.push(l = mO()), r.push(u), s.generates && (f = !0), s.modifies && !f && (c = !0), s.source ? l = u : s.changes && (l = null);
            i && (a = i.length - 1, r[0] = kz({derive: c, pulse: a ? i : i[0]}), (c || a) && r.splice(1, 0, mO()));
            l || r.push(mO());
            return r.push(Ez({})), r
        }(t, e, n))
    }

    function mO(t) {
        const e = oz({}, t);
        return e.metadata = {source: !0}, e
    }

    function yO(t, e) {
        return pz({
            url: e.url ? t.property(e.url) : void 0,
            async: e.async ? t.property(e.async) : void 0,
            values: e.values ? t.property(e.values) : void 0,
            format: t.objectProperty(e.format)
        })
    }

    const vO = t => t === Xz || t === Yz, _O = (t, e, n) => IT(t) ? AO(t.signal, e, n) : t === Vz || t === Yz ? e : n,
        xO = (t, e, n) => IT(t) ? kO(t.signal, e, n) : vO(t) ? e : n,
        bO = (t, e, n) => IT(t) ? MO(t.signal, e, n) : vO(t) ? n : e,
        wO = (t, e, n) => IT(t) ? EO(t.signal, e, n) : t === Yz ? {value: e} : {value: n},
        kO = (t, e, n) => CO("".concat(t, " === '").concat(Yz, "' || ").concat(t, " === '").concat(Xz, "'"), e, n),
        MO = (t, e, n) => CO("".concat(t, " !== '").concat(Yz, "' && ").concat(t, " !== '").concat(Xz, "'"), e, n),
        AO = (t, e, n) => SO("".concat(t, " === '").concat(Vz, "' || ").concat(t, " === '").concat(Yz, "'"), e, n),
        EO = (t, e, n) => SO("".concat(t, " === '").concat(Yz, "'"), e, n),
        DO = (t, e, n) => SO("".concat(t, " === '").concat(Gz, "'"), e, n),
        CO = (t, e, n) => (e = null != e ? sT(e) : e, n = null != n ? sT(n) : n, FO(e) && FO(n) ? (e = e ? e.signal || wt(e.value) : null, n = n ? n.signal || wt(n.value) : null, {signal: "".concat(t, " ? (").concat(e, ") : (").concat(n, ")")}) : [K({test: t}, e)].concat(n || [])),
        FO = t => null == t || 1 === Object.keys(t).length,
        SO = (t, e, n) => ({signal: "".concat(t, " ? (").concat(TO(e), ") : (").concat(TO(n), ")")}),
        BO = (t, e, n, r, i) => ({signal: (null != r ? "".concat(t, " === '").concat(Vz, "' ? (").concat(TO(r), ") : ") : "") + (null != n ? "".concat(t, " === '").concat(Xz, "' ? (").concat(TO(n), ") : ") : "") + (null != i ? "".concat(t, " === '").concat(Gz, "' ? (").concat(TO(i), ") : ") : "") + (null != e ? "".concat(t, " === '").concat(Yz, "' ? (").concat(TO(e), ") : ") : "") + "(null)"}),
        TO = t => IT(t) ? t.signal : null == t ? null : wt(t), zO = (t, e) => {
            const n = t.signal;
            return n && n.endsWith("(null)") ? {signal: n.slice(0, -6) + e.signal} : t
        };

    function NO(t, e, n, r) {
        let i;
        if (e && rt(e, t)) return e[t];
        if (rt(n, t)) return n[t];
        if (t.startsWith("title")) {
            switch (t) {
                case"titleColor":
                    i = "fill";
                    break;
                case"titleFont":
                case"titleFontSize":
                case"titleFontWeight":
                    i = t[5].toLowerCase() + t.slice(6)
            }
            return r["guide-title"][i]
        }
        if (t.startsWith("label")) {
            switch (t) {
                case"labelColor":
                    i = "fill";
                    break;
                case"labelFont":
                case"labelFontSize":
                    i = t[5].toLowerCase() + t.slice(6)
            }
            return r["guide-label"][i]
        }
        return null
    }

    function OO(t) {
        const e = {};
        for (const n of t) if (n) for (const t in n) e[t] = 1;
        return Object.keys(e)
    }

    function RO(t, e) {
        return {scale: t.scale, range: e}
    }

    function LO(t, e, n, r, i) {
        const o = vN(t, e), a = t.orient, u = t.gridScale, s = _O(a, 1, -1), l = function (t, e) {
            if (1 === e) ; else if (_(t)) {
                let n = t = K({}, t);
                for (; null != n.mult;) {
                    if (!_(n.mult)) return n.mult = IT(e) ? {signal: "(".concat(n.mult, ") * (").concat(e.signal, ")")} : n.mult * e, t;
                    n = n.mult = K({}, n.mult)
                }
                n.mult = e
            } else t = IT(e) ? {signal: "(".concat(e.signal, ") * (").concat(t || 0, ")")} : e * (t || 0);
            return t
        }(t.offset, s);
        let c, f, h;
        const d = {enter: c = {opacity: fN}, update: h = {opacity: hN}, exit: f = {opacity: fN}};
        cT(d, {
            stroke: o("gridColor"),
            strokeCap: o("gridCap"),
            strokeDash: o("gridDash"),
            strokeDashOffset: o("gridDashOffset"),
            strokeOpacity: o("gridOpacity"),
            strokeWidth: o("gridWidth")
        });
        const p = {scale: t.scale, field: tN, band: i.band, extra: i.extra, offset: i.offset, round: o("tickRound")},
            g = xO(a, {signal: "height"}, {signal: "width"}),
            m = u ? {scale: u, range: 0, mult: s, offset: l} : {value: 0, offset: l},
            y = u ? {scale: u, range: 1, mult: s, offset: l} : K(g, {mult: s, offset: l});
        return c.x = h.x = xO(a, p, m), c.y = h.y = bO(a, p, m), c.x2 = h.x2 = bO(a, y), c.y2 = h.y2 = xO(a, y), f.x = xO(a, p), f.y = bO(a, p), kN({
            type: gN,
            role: "axis-grid",
            key: tN,
            from: r,
            encode: d
        }, n)
    }

    function UO(t, e, n, r, i) {
        return {signal: 'flush(range("' + t + '"), scale("' + t + '", datum.value), ' + e + "," + n + "," + r + "," + i + ")"}
    }

    function qO(t, e, n, r, i, o) {
        const a = vN(t, e), u = t.orient, s = t.scale, l = _O(u, -1, 1), c = HT(a("labelFlush")),
            f = HT(a("labelFlushOffset")), h = a("labelAlign"), d = a("labelBaseline");
        let p, g = 0 === c || !!c;
        const m = sT(i);
        m.mult = l, m.offset = sT(a("labelPadding") || 0), m.offset.mult = l;
        const y = {scale: s, field: tN, band: .5, offset: wN(o.offset, a("labelOffset"))},
            v = xO(u, g ? UO(s, c, '"left"', '"right"', '"center"') : {value: "center"}, ((t, e, n) => IT(t) ? DO(t.signal, e, n) : t === Gz ? {value: e} : {value: n})(u, "left", "right")),
            _ = xO(u, wO(u, "bottom", "top"), g ? UO(s, c, '"top"', '"bottom"', '"middle"') : {value: "middle"}),
            x = UO(s, c, "-(".concat(f, ")"), f, 0);
        g = g && f;
        const b = {opacity: fN, x: xO(u, y, m), y: bO(u, y, m)}, w = {
            enter: b,
            update: p = {opacity: hN, text: {field: Qz}, x: b.x, y: b.y, align: v, baseline: _},
            exit: {opacity: fN, x: b.x, y: b.y}
        };
        cT(w, {dx: !h && g ? xO(u, x) : null, dy: !d && g ? bO(u, x) : null}), cT(w, {
            angle: a("labelAngle"),
            fill: a("labelColor"),
            fillOpacity: a("labelOpacity"),
            font: a("labelFont"),
            fontSize: a("labelFontSize"),
            fontWeight: a("labelFontWeight"),
            fontStyle: a("labelFontStyle"),
            limit: a("labelLimit"),
            lineHeight: a("labelLineHeight")
        }, {align: h, baseline: d});
        const k = a("labelBound");
        let M = a("labelOverlap");
        return M = M || k ? {
            separation: a("labelSeparation"),
            method: M,
            order: "datum.index",
            bound: k ? {scale: s, orient: u, tolerance: k} : null
        } : void 0, p.align !== v && (p.align = zO(p.align, v)), p.baseline !== _ && (p.baseline = zO(p.baseline, _)), kN({
            type: mN,
            role: "axis-label",
            style: eN,
            key: tN,
            from: r,
            encode: w,
            overlap: M
        }, n)
    }

    function PO(t, e, n, r) {
        const i = vN(t, e), o = t.orient, a = _O(o, -1, 1);
        let u, s;
        const l = {
            enter: u = {opacity: fN, anchor: sT(i("titleAnchor", null)), align: {signal: bN}},
            update: s = K({}, u, {opacity: hN, text: sT(t.title)}),
            exit: {opacity: fN}
        }, c = {signal: 'lerp(range("'.concat(t.scale, '"), ').concat(xN(0, 1, .5), ")")};
        return s.x = xO(o, c), s.y = bO(o, c), u.angle = xO(o, fN, ((t, e) => 0 === e ? 0 : IT(t) ? {signal: "(".concat(t.signal, ") * ").concat(e)} : {value: t * e})(a, 90)), u.baseline = xO(o, wO(o, Xz, Yz), {value: Xz}), s.angle = u.angle, s.baseline = u.baseline, cT(l, {
            fill: i("titleColor"),
            fillOpacity: i("titleOpacity"),
            font: i("titleFont"),
            fontSize: i("titleFontSize"),
            fontStyle: i("titleFontStyle"),
            fontWeight: i("titleFontWeight"),
            limit: i("titleLimit"),
            lineHeight: i("titleLineHeight")
        }, {align: i("titleAlign"), angle: i("titleAngle"), baseline: i("titleBaseline")}), function (t, e, n, r) {
            const i = (t, e) => null != t ? (n.update[e] = zO(sT(t), n.update[e]), !1) : !hT(e, r),
                o = i(t("titleX"), "x"), a = i(t("titleY"), "y");
            n.enter.auto = a === o ? sT(a) : xO(e, sT(a), sT(o))
        }(i, o, l, n), l.update.align = zO(l.update.align, u.align), l.update.angle = zO(l.update.angle, u.angle), l.update.baseline = zO(l.update.baseline, u.baseline), kN({
            type: mN,
            role: "axis-title",
            style: nN,
            from: r,
            encode: l
        }, n)
    }

    function jO(t, e) {
        const n = function (t, e) {
                var n, r, i, o = e.config, a = o.style, u = o.axis, s = "band" === e.scaleType(t.scale) && o.axisBand,
                    l = t.orient;
                if (IT(l)) {
                    const t = OO([o.axisX, o.axisY]), e = OO([o.axisTop, o.axisBottom, o.axisLeft, o.axisRight]);
                    for (i of (n = {}, t)) n[i] = xO(l, NO(i, o.axisX, u, a), NO(i, o.axisY, u, a));
                    for (i of (r = {}, e)) r[i] = BO(l.signal, NO(i, o.axisTop, u, a), NO(i, o.axisBottom, u, a), NO(i, o.axisLeft, u, a), NO(i, o.axisRight, u, a))
                } else n = l === Yz || l === Xz ? o.axisX : o.axisY, r = o["axis" + l[0].toUpperCase() + l.slice(1)];
                return n || r || s ? K({}, u, n, r, s) : u
            }(t, e), r = t.encode || {}, i = r.axis || {}, o = i.name || void 0, a = i.interactive, u = i.style,
            s = vN(t, n), l = function (t) {
                const e = t("tickBand");
                let n, r, i = t("tickOffset");
                return e ? e.signal ? (n = {signal: "(".concat(e.signal, ") === 'extent' ? 1 : 0.5")}, r = {signal: "(".concat(e.signal, ") === 'extent'")}, _(i) || (i = {signal: "(".concat(e.signal, ") === 'extent' ? 0 : ").concat(i)})) : "extent" === e ? (n = 1, r = !0, i = 0) : (n = .5, r = !1) : (n = t("bandPosition"), r = t("tickExtra")), {
                    extra: r,
                    band: n,
                    offset: i
                }
            }(s), c = {
                scale: t.scale,
                ticks: !!s("ticks"),
                labels: !!s("labels"),
                grid: !!s("grid"),
                domain: !!s("domain"),
                title: null != t.title
            }, f = OT(e.add(oz({}, [c]))), h = OT(e.add(rz({
                scale: e.scaleRef(t.scale),
                extra: e.property(l.extra),
                count: e.objectProperty(t.tickCount),
                values: e.objectProperty(t.values),
                minstep: e.property(t.tickMinStep),
                formatType: e.property(t.formatType),
                formatSpecifier: e.property(t.format)
            }))), d = [];
        let p;
        return c.grid && d.push(LO(t, n, r.grid, h, l)), c.ticks && (p = s("tickSize"), d.push(function (t, e, n, r, i, o) {
            const a = vN(t, e), u = t.orient, s = _O(u, -1, 1);
            let l, c, f;
            const h = {enter: l = {opacity: fN}, update: f = {opacity: hN}, exit: c = {opacity: fN}};
            cT(h, {
                stroke: a("tickColor"),
                strokeCap: a("tickCap"),
                strokeDash: a("tickDash"),
                strokeDashOffset: a("tickDashOffset"),
                strokeOpacity: a("tickOpacity"),
                strokeWidth: a("tickWidth")
            });
            const d = sT(i);
            d.mult = s;
            const p = {
                scale: t.scale,
                field: tN,
                band: o.band,
                extra: o.extra,
                offset: o.offset,
                round: a("tickRound")
            };
            return f.y = l.y = xO(u, fN, p), f.y2 = l.y2 = xO(u, d), c.x = xO(u, p), f.x = l.x = bO(u, fN, p), f.x2 = l.x2 = bO(u, d), c.y = bO(u, p), kN({
                type: gN,
                role: "axis-tick",
                key: tN,
                from: r,
                encode: h
            }, n)
        }(t, n, r.ticks, h, p, l))), c.labels && (p = c.ticks ? p : 0, d.push(qO(t, n, r.labels, h, p, l))), c.domain && d.push(function (t, e, n, r) {
            const i = vN(t, e), o = t.orient;
            let a, u;
            const s = {enter: a = {opacity: fN}, update: u = {opacity: hN}, exit: {opacity: fN}};
            cT(s, {
                stroke: i("domainColor"),
                strokeCap: i("domainCap"),
                strokeDash: i("domainDash"),
                strokeDashOffset: i("domainDashOffset"),
                strokeWidth: i("domainWidth"),
                strokeOpacity: i("domainOpacity")
            });
            const l = RO(t, 0), c = RO(t, 1);
            return a.x = u.x = xO(o, l, fN), a.x2 = u.x2 = xO(o, c), a.y = u.y = bO(o, l, fN), a.y2 = u.y2 = bO(o, c), kN({
                type: gN,
                role: "axis-domain",
                from: r,
                encode: s
            }, n)
        }(t, n, r.domain, f)), c.title && d.push(PO(t, n, r.title, f)), sO(yN({
            role: "axis",
            from: f,
            encode: fT(IO(s, t), i, cN),
            marks: d,
            aria: s("aria"),
            description: s("description"),
            zindex: s("zindex"),
            name: o,
            interactive: a,
            style: u
        }), e)
    }

    function IO(t, e) {
        const n = {enter: {}, update: {}};
        return cT(n, {
            orient: t("orient"),
            offset: t("offset") || 0,
            position: WT(e.position, 0),
            titlePadding: t("titlePadding"),
            minExtent: t("minExtent"),
            maxExtent: t("maxExtent"),
            range: {signal: 'abs(span(range("'.concat(e.scale, '")))')},
            translate: t("translate"),
            format: e.format,
            formatType: e.formatType
        }), n
    }

    function $O(t, e, n) {
        const r = $(t.signals), i = $(t.scales);
        return n || r.forEach((t => BT(t, e))), $(t.projections).forEach((t => function (t, e) {
            const n = e.config.projection || {}, r = {};
            for (const n in t) "name" !== n && (r[n] = Hz(t[n], n, e));
            for (const t in n) null == r[t] && (r[t] = Hz(n[t], t, e));
            e.addProjection(t.name, r)
        }(t, e))), i.forEach((t => function (t, e) {
            const n = t.type || "linear";
            gd(n) || u("Unrecognized scale type: " + wt(n)), e.addScale(t.name, {type: n, domain: void 0})
        }(t, e))), $(t.data).forEach((t => gO(t, e))), i.forEach((t => Tz(t, e))), (n || r).forEach((t => function (t, e) {
            const n = e.getSignal(t.name);
            let r = t.update;
            t.init && (r ? u("Signals can not include both init and update expressions.") : (r = t.init, n.initonly = !0)), r && (r = HS(r, e), n.update = r.$expr, n.params = r.$params), t.on && t.on.forEach((t => KT(t, e, n.id)))
        }(t, e))), $(t.axes).forEach((t => jO(t, e))), $(t.marks).forEach((t => sO(t, e))), $(t.legends).forEach((t => lO(t, e))), t.title && dO(t.title, e), e.parseLambdas(), e
    }

    function WO(t, e) {
        const n = e.config, r = OT(e.root = e.add(NT())), i = function (t, e) {
            const n = n => WT(t[n], e[n]),
                r = [HO("background", n("background")), HO("autosize", oT(n("autosize"))), HO("padding", uT(n("padding"))), HO("width", n("width") || 0), HO("height", n("height") || 0)],
                i = r.reduce(((t, e) => (t[e.name] = e, t)), {}), o = {};
            return $(t.signals).forEach((t => {
                rt(i, t.name) ? t = K(i[t.name], t) : r.push(t), o[t.name] = t
            })), $(e.signals).forEach((t => {
                rt(o, t.name) || rt(i, t.name) || r.push(t)
            })), r
        }(t, n);
        i.forEach((t => BT(t, e))), e.description = t.description || n.description, e.eventConfig = n.events, e.legends = e.objectProperty(n.legend && n.legend.layout), e.locale = n.locale;
        const o = e.add(oz()), a = e.add(sz(ET((t => fT({
            enter: {x: {value: 0}, y: {value: 0}},
            update: {width: {signal: "width"}, height: {signal: "height"}}
        }, t))(t.encode), dN, pT, t.style, e, {pulse: OT(o)}))), u = e.add(Cz({
            layout: e.objectProperty(t.layout),
            legends: e.legends,
            autosize: e.signalRef("autosize"),
            mark: r,
            pulse: OT(a)
        }));
        e.operators.pop(), e.pushState(OT(a), OT(u), null), $O(t, e, i), e.operators.push(u);
        let s = e.add(iz({mark: r, pulse: OT(u)}));
        return s = e.add(Mz({pulse: OT(s)})), s = e.add(Ez({pulse: OT(s)})), e.addData("root", new rO(e, o, o, s)), e
    }

    function HO(t, e) {
        return e && e.signal ? {name: t, update: e.signal} : {name: t, value: e}
    }

    function YO(t, e) {
        this.config = t || {}, this.options = e || {}, this.bindings = [], this.field = {}, this.signals = {}, this.lambdas = {}, this.scales = {}, this.events = {}, this.data = {}, this.streams = [], this.updates = [], this.operators = [], this.eventConfig = null, this.locale = null, this._id = 0, this._subid = 0, this._nextsub = [0], this._parent = [], this._encode = [], this._lookup = [], this._markpath = []
    }

    function VO(t) {
        this.config = t.config, this.options = t.options, this.legends = t.legends, this.field = Object.create(t.field), this.signals = Object.create(t.signals), this.lambdas = Object.create(t.lambdas), this.scales = Object.create(t.scales), this.events = Object.create(t.events), this.data = Object.create(t.data), this.streams = [], this.updates = [], this.operators = [], this._id = 0, this._subid = ++t._nextsub[0], this._nextsub = t._nextsub, this._parent = t._parent.slice(), this._encode = t._encode.slice(), this._lookup = t._lookup.slice(), this._markpath = t._markpath
    }

    function GO(t) {
        return (v(t) ? XO : JO)(t)
    }

    function XO(t) {
        const e = t.length;
        let n = "[";
        for (let r = 0; r < e; ++r) {
            const e = t[r];
            n += (r > 0 ? "," : "") + (_(e) ? e.signal || GO(e) : wt(e))
        }
        return n + "]"
    }

    function JO(t) {
        let e, n, r = "{", i = 0;
        for (e in t) n = t[e], r += (++i > 1 ? "," : "") + wt(e) + ":" + (_(n) ? n.signal || GO(n) : wt(n));
        return r + "}"
    }

    YO.prototype = VO.prototype = {
        parse(t) {
            return $O(t, this)
        }, fork() {
            return new VO(this)
        }, isSubscope() {
            return this._subid > 0
        }, toRuntime() {
            return this.finish(), {
                description: this.description,
                operators: this.operators,
                streams: this.streams,
                updates: this.updates,
                bindings: this.bindings,
                eventConfig: this.eventConfig,
                locale: this.locale
            }
        }, id() {
            return (this._subid ? this._subid + ":" : 0) + this._id++
        }, add(t) {
            return this.operators.push(t), t.id = this.id(), t.refs && (t.refs.forEach((e => {
                e.$ref = t.id
            })), t.refs = null), t
        }, proxy(t) {
            const e = t instanceof TT ? OT(t) : t;
            return this.add(wz({value: e}))
        }, addStream(t) {
            return this.streams.push(t), t.id = this.id(), t
        }, addUpdate(t) {
            return this.updates.push(t), t
        }, finish() {
            let t, e;
            for (t in this.root && (this.root.root = !0), this.signals) this.signals[t].signal = t;
            for (t in this.scales) this.scales[t].scale = t;

            function n(t, e, n) {
                let r, i;
                t && (r = t.data || (t.data = {}), i = r[e] || (r[e] = []), i.push(n))
            }

            for (t in this.data) {
                e = this.data[t], n(e.input, t, "input"), n(e.output, t, "output"), n(e.values, t, "values");
                for (const r in e.index) n(e.index[r], t, "index:" + r)
            }
            return this
        }, pushState(t, e, n) {
            this._encode.push(OT(this.add(Ez({pulse: t})))), this._parent.push(e), this._lookup.push(n ? OT(this.proxy(n)) : null), this._markpath.push(-1)
        }, popState() {
            this._encode.pop(), this._parent.pop(), this._lookup.pop(), this._markpath.pop()
        }, parent() {
            return M(this._parent)
        }, encode() {
            return M(this._encode)
        }, lookup() {
            return M(this._lookup)
        }, markpath() {
            const t = this._markpath;
            return ++t[t.length - 1]
        }, fieldRef(t, e) {
            if (pt(t)) return RT(t, e);
            t.signal || u("Unsupported field reference: " + wt(t));
            const n = t.signal;
            let r = this.field[n];
            if (!r) {
                const t = {name: this.signalRef(n)};
                e && (t.as = e), this.field[n] = r = OT(this.add(fz(t)))
            }
            return r
        }, compareRef(t) {
            let e = !1;
            const n = t => IT(t) ? (e = !0, this.signalRef(t.signal)) : function (t) {
                return t && t.expr
            }(t) ? (e = !0, this.exprRef(t.expr)) : t, r = $(t.field).map(n), i = $(t.order).map(n);
            return e ? OT(this.add(az({fields: r, orders: i}))) : UT(r, i)
        }, keyRef(t, e) {
            let n = !1;
            const r = this.signals;
            return t = $(t).map((t => IT(t) ? (n = !0, OT(r[t.signal])) : t)), n ? OT(this.add(hz({
                fields: t,
                flat: e
            }))) : function (t, e) {
                const n = {$key: t};
                return e && (n.$flat = !0), n
            }(t, e)
        }, sortRef(t) {
            if (!t) return t;
            const e = qT(t.op, t.field), n = t.order || "ascending";
            return n.signal ? OT(this.add(az({fields: e, orders: this.signalRef(n.signal)}))) : UT(e, n)
        }, event(t, e) {
            const n = t + ":" + e;
            if (!this.events[n]) {
                const r = this.id();
                this.streams.push({id: r, source: t, type: e}), this.events[n] = r
            }
            return this.events[n]
        }, hasOwnSignal(t) {
            return rt(this.signals, t)
        }, addSignal(t, e) {
            this.hasOwnSignal(t) && u("Duplicate signal name: " + wt(t));
            const n = e instanceof TT ? e : this.add(NT(e));
            return this.signals[t] = n
        }, getSignal(t) {
            return this.signals[t] || u("Unrecognized signal name: " + wt(t)), this.signals[t]
        }, signalRef(t) {
            return this.signals[t] ? OT(this.signals[t]) : (rt(this.lambdas, t) || (this.lambdas[t] = this.add(NT(null))), OT(this.lambdas[t]))
        }, parseLambdas() {
            const t = Object.keys(this.lambdas);
            for (let e = 0, n = t.length; e < n; ++e) {
                const n = t[e], r = HS(n, this), i = this.lambdas[n];
                i.params = r.$params, i.update = r.$expr
            }
        }, property(t) {
            return t && t.signal ? this.signalRef(t.signal) : t
        }, objectProperty(t) {
            return t && _(t) ? this.signalRef(t.signal || GO(t)) : t
        }, exprRef(t, e) {
            const n = {expr: HS(t, this)};
            return e && (n.expr.$name = e), OT(this.add(lz(n)))
        }, addBinding(t, e) {
            this.bindings || u("Nested signals do not support binding: " + wt(t)), this.bindings.push(K({signal: t}, e))
        }, addScaleProj(t, e) {
            rt(this.scales, t) && u("Duplicate scale or projection name: " + wt(t)), this.scales[t] = this.add(e)
        }, addScale(t, e) {
            this.addScaleProj(t, Az(e))
        }, addProjection(t, e) {
            this.addScaleProj(t, bz(e))
        }, getScale(t) {
            return this.scales[t] || u("Unrecognized scale name: " + wt(t)), this.scales[t]
        }, scaleRef(t) {
            return OT(this.getScale(t))
        }, scaleType(t) {
            return this.getScale(t).params.type
        }, projectionRef(t) {
            return this.scaleRef(t)
        }, projectionType(t) {
            return this.scaleType(t)
        }, addData(t, e) {
            return rt(this.data, t) && u("Duplicate data set name: " + wt(t)), this.data[t] = e
        }, getData(t) {
            return this.data[t] || u("Undefined data set name: " + wt(t)), this.data[t]
        }, addDataPipeline(t, e) {
            return rt(this.data, t) && u("Duplicate data set name: " + wt(t)), this.addData(t, rO.fromEntries(this, e))
        }
    }, K(ga, Ns, P_, yx, iA, rE, UD, yD, $D, gC, FC, UC), t.Bounds = Zp, t.CanvasHandler = Ey, t.CanvasRenderer = By, t.DATE = On, t.DAY = Rn, t.DAYOFYEAR = Ln, t.Dataflow = ha, t.Debug = 4, t.Error = 1, t.EventStream = Zo, t.Gradient = ip, t.GroupItem = Kp, t.HOURS = Un, t.Handler = sy, t.Info = 3, t.Item = Qp, t.MILLISECONDS = jn, t.MINUTES = qn, t.MONTH = zn, t.Marks = Ym, t.MultiPulse = ua, t.None = 0, t.Operator = Go, t.Parameters = Ho, t.Pulse = ra, t.QUARTER = Tn, t.RenderType = _v, t.Renderer = cy, t.ResourceLoader = tg, t.SECONDS = Pn, t.SVGHandler = zy, t.SVGRenderer = nv, t.SVGStringRenderer = mv, t.Scenegraph = ty, t.TIME_UNITS = In, t.Transform = pa, t.View = HB, t.WEEK = Nn, t.Warn = 2, t.YEAR = Bn, t.accessor = e, t.accessorFields = r, t.accessorName = n, t.array = $, t.ascending = V, t.bandwidthNRD = ba, t.bin = wa, t.bootstrapCI = ka, t.boundClip = Dv, t.boundContext = bg, t.boundItem = Vm, t.boundMark = Xm, t.boundStroke = rg, t.changeset = $o, t.clampRange = W, t.compare = Y, t.constant = Z, t.cumulativeLogNormal = Ra, t.cumulativeNormal = Sa, t.cumulativeUniform = Ia, t.dayofyear = Xn, t.debounce = Q, t.defaultLocale = Do, t.definition = ma, t.densityLogNormal = Oa, t.densityNormal = Fa, t.densityUniform = ja, t.domChild = iy, t.domClear = oy, t.domCreate = ny, t.domFind = ry, t.dotbin = Ma, t.error = u, t.expressionFunction = WS, t.extend = K, t.extent = tt, t.extentIndex = et, t.falsy = g, t.fastmap = ot, t.field = l, t.flush = at, t.font = Pm, t.fontFamily = qm, t.fontSize = Nm, t.format = he, t.formatLocale = _o, t.formats = de, t.hasOwnProperty = rt, t.id = c, t.identity = f, t.inferType = Wt, t.inferTypes = Ht, t.ingest = Lo, t.inherits = ut, t.inrange = st, t.interpolate = Cd, t.interpolateColors = Ad, t.interpolateRange = Md, t.intersect = wv,t.intersectBoxLine = Tg,t.intersectPath = Cg,t.intersectPoint = Fg,t.intersectRule = Bg,t.isArray = v,t.isBoolean = lt,t.isDate = ct,t.isFunction = H,t.isIterable = ft,t.isNumber = ht,t.isObject = _,t.isRegExp = dt,t.isString = pt,t.isTuple = No,t.key = gt,t.lerp = mt,t.lineHeight = Om,t.loader = Fo,t.locale = Eo,t.logger = y,t.lruCache = yt,t.markup = Jy,t.merge = vt,t.mergeConfig = b,t.multiLineOffset = Lm,t.one = d,t.pad = xt,t.panLinear = T,t.panLog = z,t.panPow = N,t.panSymlog = O,t.parse = function (t, e, n) {
        return _(t) || u("Input Vega specification must be an object."), WO(t, new YO(e = b(function () {
            const t = "sans-serif", e = "#4c78a8", n = "#000", r = "#888", i = "#ddd";
            return {
                description: "Vega visualization",
                padding: 0,
                autosize: "pad",
                background: null,
                events: {defaults: {allow: ["wheel"]}},
                group: null,
                mark: null,
                arc: {fill: e},
                area: {fill: e},
                image: null,
                line: {stroke: e, strokeWidth: 2},
                path: {stroke: e},
                rect: {fill: e},
                rule: {stroke: n},
                shape: {stroke: e},
                symbol: {fill: e, size: 64},
                text: {fill: n, font: t, fontSize: 11},
                trail: {fill: e, size: 2},
                style: {
                    "guide-label": {fill: n, font: t, fontSize: 10},
                    "guide-title": {fill: n, font: t, fontSize: 11, fontWeight: "bold"},
                    "group-title": {fill: n, font: t, fontSize: 13, fontWeight: "bold"},
                    "group-subtitle": {fill: n, font: t, fontSize: 12},
                    point: {size: 30, strokeWidth: 2, shape: "circle"},
                    circle: {size: 30, strokeWidth: 2},
                    square: {size: 30, strokeWidth: 2, shape: "square"},
                    cell: {fill: "transparent", stroke: i}
                },
                title: {orient: "top", anchor: "middle", offset: 4, subtitlePadding: 3},
                axis: {
                    minExtent: 0,
                    maxExtent: 200,
                    bandPosition: .5,
                    domain: !0,
                    domainWidth: 1,
                    domainColor: r,
                    grid: !1,
                    gridWidth: 1,
                    gridColor: i,
                    labels: !0,
                    labelAngle: 0,
                    labelLimit: 180,
                    labelOffset: 0,
                    labelPadding: 2,
                    ticks: !0,
                    tickColor: r,
                    tickOffset: 0,
                    tickRound: !0,
                    tickSize: 5,
                    tickWidth: 1,
                    titlePadding: 4
                },
                axisBand: {tickOffset: -.5},
                projection: {type: "mercator"},
                legend: {
                    orient: "right",
                    padding: 0,
                    gridAlign: "each",
                    columnPadding: 10,
                    rowPadding: 2,
                    symbolDirection: "vertical",
                    gradientDirection: "vertical",
                    gradientLength: 200,
                    gradientThickness: 16,
                    gradientStrokeColor: i,
                    gradientStrokeWidth: 0,
                    gradientLabelOffset: 2,
                    labelAlign: "left",
                    labelBaseline: "middle",
                    labelLimit: 160,
                    labelOffset: 4,
                    labelOverlap: !0,
                    symbolLimit: 30,
                    symbolType: "circle",
                    symbolSize: 100,
                    symbolOffset: 0,
                    symbolStrokeWidth: 1.5,
                    symbolBaseFillColor: "transparent",
                    symbolBaseStrokeColor: r,
                    titleLimit: 180,
                    titleOrient: "top",
                    titlePadding: 5,
                    layout: {
                        offset: 18,
                        direction: "horizontal",
                        left: {direction: "vertical"},
                        right: {direction: "vertical"}
                    }
                },
                range: {
                    category: {scheme: "tableau10"},
                    ordinal: {scheme: "blues"},
                    heatmap: {scheme: "yellowgreenblue"},
                    ramp: {scheme: "blues"},
                    diverging: {scheme: "blueorange", extent: [1, 0]},
                    symbol: ["circle", "square", "triangle-up", "cross", "diamond", "triangle-right", "triangle-down", "triangle-left"]
                }
            }
        }(), e, t.config), n)).toRuntime()
    },t.pathCurves = ap,t.pathEqual = Fv,t.pathParse = lp,t.pathRectangle = zp,t.pathRender = xp,t.pathSymbols = Mp,t.pathTrail = Np,t.peek = M,t.point = uy,t.projection = EM,t.quantileLogNormal = La,t.quantileNormal = Ba,t.quantileUniform = $a,t.quantiles = _a,t.quantizeInterpolator = Ed,t.quarter = j,t.quartiles = xa,t.randomInteger = function (e, n) {
        let r, i, o;
        null == n && (n = e, e = 0);
        const a = {
            min(t) {
                return arguments.length ? (r = t || 0, o = i - r, a) : r
            },
            max(t) {
                return arguments.length ? (i = t || 0, o = i - r, a) : i
            },
            sample: () => r + Math.floor(o * t.random()),
            pdf: t => t === Math.floor(t) && t >= r && t < i ? 1 / o : 0,
            cdf(t) {
                const e = Math.floor(t);
                return e < r ? 0 : e >= i ? 1 : (e - r + 1) / o
            },
            icdf: t => t >= 0 && t <= 1 ? r - 1 + Math.floor(t * o) : NaN
        };
        return a.min(e).max(n)
    },t.randomKDE = za,t.randomLCG = function (t) {
        return function () {
            return (t = (1103515245 * t + 12345) % 2147483647) / 2147483647
        }
    },t.randomLogNormal = Ua,t.randomMixture = qa,t.randomNormal = Ta,t.randomUniform = Wa,t.read = Co,t.regressionExp = Za,t.regressionLinear = Xa,t.regressionLoess = nu,t.regressionLog = Ja,t.regressionPoly = tu,t.regressionPow = Qa,t.regressionQuad = Ka,t.renderModule = bv,t.repeat = _t,t.resetDefaultLocale = function () {
        return yo(), wo(), Do()
    },t.resetSVGClipId = Xp,t.resetSVGDefIds = function () {
        Xp(), Kd = 0
    },t.responseType = pe,t.runtimeContext = tB,t.sampleCurve = au,t.sampleLogNormal = Na,t.sampleNormal = Ca,t.sampleUniform = Pa,t.scale = pd,t.sceneEqual = Cv,t.sceneFromJSON = Qm,t.scenePickVisit = $g,t.sceneToJSON = Zm,t.sceneVisit = Ig,t.sceneZOrder = jg,t.scheme = Td,t.serializeXML = Zy,t.setRandom = function (e) {
        t.random = e
    },t.span = bt,t.splitAccessPath = s,t.stringValue = wt,t.textMetrics = Cm,t.timeBin = qr,t.timeFloor = fr,t.timeFormatLocale = Mo,t.timeInterval = yr,t.timeOffset = xr,t.timeSequence = kr,t.timeUnitSpecifier = Yn,t.timeUnits = Wn,t.toBoolean = kt,t.toDate = At,t.toNumber = A,t.toSet = Dt,t.toString = Et,t.transform = ya,t.transforms = ga,t.truncate = Ct,t.truthy = p,t.tupleid = Oo,t.typeParsers = jt,t.utcFloor = pr,t.utcInterval = vr,t.utcOffset = br,t.utcSequence = Mr,t.utcdayofyear = er,t.utcquarter = I,t.utcweek = nr,t.version = "5.17.0",t.visitArray = Ft,t.week = Jn,t.writeConfig = w,t.zero = h,t.zoomLinear = L,t.zoomLog = U,t.zoomPow = q,t.zoomSymlog = P,Object.defineProperty(t, "__esModule", {value: !0})
}));
//# sourceMappingURL=vega.min.js.map
