(window.webpackJsonp = window.webpackJsonp || []).push([
    [2],
    [
        ,
        function (t, e, n) {
            var r,
                o = n(44),
                i = n(22),
                s = n(46),
                a = n(47),
                c = n(48);
            'undefined' != typeof ArrayBuffer && (r = n(49));
            var l =
                    'undefined' != typeof navigator &&
                    /Android/i.test(navigator.userAgent),
                u =
                    'undefined' != typeof navigator &&
                    /PhantomJS/i.test(navigator.userAgent),
                h = l || u;
            e.protocol = 3;
            var f = (e.packets = {
                    open: 0,
                    close: 1,
                    ping: 2,
                    pong: 3,
                    message: 4,
                    upgrade: 5,
                    noop: 6
                }),
                p = o(f),
                d = { type: 'error', data: 'parser error' },
                g = n(50);
            function y(t, e, n) {
                for (
                    var r = new Array(t.length),
                        o = a(t.length, n),
                        i = function (t, n, o) {
                            e(n, function (e, n) {
                                (r[t] = n), o(e, r);
                            });
                        },
                        s = 0;
                    s < t.length;
                    s++
                )
                    i(s, t[s], o);
            }
            (e.encodePacket = function (t, n, r, o) {
                'function' == typeof n && ((o = n), (n = !1)),
                    'function' == typeof r && ((o = r), (r = null));
                var i = void 0 === t.data ? void 0 : t.data.buffer || t.data;
                if (
                    'undefined' != typeof ArrayBuffer &&
                    i instanceof ArrayBuffer
                )
                    return (function (t, n, r) {
                        if (!n) return e.encodeBase64Packet(t, r);
                        var o = t.data,
                            i = new Uint8Array(o),
                            s = new Uint8Array(1 + o.byteLength);
                        s[0] = f[t.type];
                        for (var a = 0; a < i.length; a++) s[a + 1] = i[a];
                        return r(s.buffer);
                    })(t, n, o);
                if (void 0 !== g && i instanceof g)
                    return (function (t, n, r) {
                        if (!n) return e.encodeBase64Packet(t, r);
                        if (h)
                            return (function (t, n, r) {
                                if (!n) return e.encodeBase64Packet(t, r);
                                var o = new FileReader();
                                return (
                                    (o.onload = function () {
                                        e.encodePacket(
                                            { type: t.type, data: o.result },
                                            n,
                                            !0,
                                            r
                                        );
                                    }),
                                    o.readAsArrayBuffer(t.data)
                                );
                            })(t, n, r);
                        var o = new Uint8Array(1);
                        o[0] = f[t.type];
                        var i = new g([o.buffer, t.data]);
                        return r(i);
                    })(t, n, o);
                if (i && i.base64)
                    return (function (t, n) {
                        var r = 'b' + e.packets[t.type] + t.data.data;
                        return n(r);
                    })(t, o);
                var s = f[t.type];
                return (
                    void 0 !== t.data &&
                        (s += r
                            ? c.encode(String(t.data), { strict: !1 })
                            : String(t.data)),
                    o('' + s)
                );
            }),
                (e.encodeBase64Packet = function (t, n) {
                    var r,
                        o = 'b' + e.packets[t.type];
                    if (void 0 !== g && t.data instanceof g) {
                        var i = new FileReader();
                        return (
                            (i.onload = function () {
                                var t = i.result.split(',')[1];
                                n(o + t);
                            }),
                            i.readAsDataURL(t.data)
                        );
                    }
                    try {
                        r = String.fromCharCode.apply(
                            null,
                            new Uint8Array(t.data)
                        );
                    } catch (e) {
                        for (
                            var s = new Uint8Array(t.data),
                                a = new Array(s.length),
                                c = 0;
                            c < s.length;
                            c++
                        )
                            a[c] = s[c];
                        r = String.fromCharCode.apply(null, a);
                    }
                    return (o += btoa(r)), n(o);
                }),
                (e.decodePacket = function (t, n, r) {
                    if (void 0 === t) return d;
                    if ('string' == typeof t) {
                        if ('b' === t.charAt(0))
                            return e.decodeBase64Packet(t.substr(1), n);
                        if (
                            r &&
                            !1 ===
                                (t = (function (t) {
                                    try {
                                        t = c.decode(t, { strict: !1 });
                                    } catch (t) {
                                        return !1;
                                    }
                                    return t;
                                })(t))
                        )
                            return d;
                        var o = t.charAt(0);
                        return Number(o) == o && p[o]
                            ? t.length > 1
                                ? { type: p[o], data: t.substring(1) }
                                : { type: p[o] }
                            : d;
                    }
                    o = new Uint8Array(t)[0];
                    var i = s(t, 1);
                    return (
                        g && 'blob' === n && (i = new g([i])),
                        { type: p[o], data: i }
                    );
                }),
                (e.decodeBase64Packet = function (t, e) {
                    var n = p[t.charAt(0)];
                    if (!r)
                        return {
                            type: n,
                            data: { base64: !0, data: t.substr(1) }
                        };
                    var o = r.decode(t.substr(1));
                    return (
                        'blob' === e && g && (o = new g([o])),
                        { type: n, data: o }
                    );
                }),
                (e.encodePayload = function (t, n, r) {
                    'function' == typeof n && ((r = n), (n = null));
                    var o = i(t);
                    if (n && o)
                        return g && !h
                            ? e.encodePayloadAsBlob(t, r)
                            : e.encodePayloadAsArrayBuffer(t, r);
                    if (!t.length) return r('0:');
                    y(
                        t,
                        function (t, r) {
                            e.encodePacket(t, !!o && n, !1, function (t) {
                                r(
                                    null,
                                    (function (t) {
                                        return t.length + ':' + t;
                                    })(t)
                                );
                            });
                        },
                        function (t, e) {
                            return r(e.join(''));
                        }
                    );
                }),
                (e.decodePayload = function (t, n, r) {
                    if ('string' != typeof t)
                        return e.decodePayloadAsBinary(t, n, r);
                    var o;
                    if (
                        ('function' == typeof n && ((r = n), (n = null)),
                        '' === t)
                    )
                        return r(d, 0, 1);
                    for (var i, s, a = '', c = 0, l = t.length; c < l; c++) {
                        var u = t.charAt(c);
                        if (':' === u) {
                            if ('' === a || a != (i = Number(a)))
                                return r(d, 0, 1);
                            if (a != (s = t.substr(c + 1, i)).length)
                                return r(d, 0, 1);
                            if (s.length) {
                                if (
                                    ((o = e.decodePacket(s, n, !1)),
                                    d.type === o.type && d.data === o.data)
                                )
                                    return r(d, 0, 1);
                                if (!1 === r(o, c + i, l)) return;
                            }
                            (c += i), (a = '');
                        } else a += u;
                    }
                    return '' !== a ? r(d, 0, 1) : void 0;
                }),
                (e.encodePayloadAsArrayBuffer = function (t, n) {
                    if (!t.length) return n(new ArrayBuffer(0));
                    y(
                        t,
                        function (t, n) {
                            e.encodePacket(t, !0, !0, function (t) {
                                return n(null, t);
                            });
                        },
                        function (t, e) {
                            var r = e.reduce(function (t, e) {
                                    var n;
                                    return (
                                        t +
                                        (n =
                                            'string' == typeof e
                                                ? e.length
                                                : e.byteLength).toString()
                                            .length +
                                        n +
                                        2
                                    );
                                }, 0),
                                o = new Uint8Array(r),
                                i = 0;
                            return (
                                e.forEach(function (t) {
                                    var e = 'string' == typeof t,
                                        n = t;
                                    if (e) {
                                        for (
                                            var r = new Uint8Array(t.length),
                                                s = 0;
                                            s < t.length;
                                            s++
                                        )
                                            r[s] = t.charCodeAt(s);
                                        n = r.buffer;
                                    }
                                    o[i++] = e ? 0 : 1;
                                    var a = n.byteLength.toString();
                                    for (s = 0; s < a.length; s++)
                                        o[i++] = parseInt(a[s]);
                                    o[i++] = 255;
                                    for (
                                        r = new Uint8Array(n), s = 0;
                                        s < r.length;
                                        s++
                                    )
                                        o[i++] = r[s];
                                }),
                                n(o.buffer)
                            );
                        }
                    );
                }),
                (e.encodePayloadAsBlob = function (t, n) {
                    y(
                        t,
                        function (t, n) {
                            e.encodePacket(t, !0, !0, function (t) {
                                var e = new Uint8Array(1);
                                if (((e[0] = 1), 'string' == typeof t)) {
                                    for (
                                        var r = new Uint8Array(t.length), o = 0;
                                        o < t.length;
                                        o++
                                    )
                                        r[o] = t.charCodeAt(o);
                                    (t = r.buffer), (e[0] = 0);
                                }
                                var i = (t instanceof ArrayBuffer
                                        ? t.byteLength
                                        : t.size
                                    ).toString(),
                                    s = new Uint8Array(i.length + 1);
                                for (o = 0; o < i.length; o++)
                                    s[o] = parseInt(i[o]);
                                if (((s[i.length] = 255), g)) {
                                    var a = new g([e.buffer, s.buffer, t]);
                                    n(null, a);
                                }
                            });
                        },
                        function (t, e) {
                            return n(new g(e));
                        }
                    );
                }),
                (e.decodePayloadAsBinary = function (t, n, r) {
                    'function' == typeof n && ((r = n), (n = null));
                    for (var o = t, i = []; o.byteLength > 0; ) {
                        for (
                            var a = new Uint8Array(o),
                                c = 0 === a[0],
                                l = '',
                                u = 1;
                            255 !== a[u];
                            u++
                        ) {
                            if (l.length > 310) return r(d, 0, 1);
                            l += a[u];
                        }
                        (o = s(o, 2 + l.length)), (l = parseInt(l));
                        var h = s(o, 0, l);
                        if (c)
                            try {
                                h = String.fromCharCode.apply(
                                    null,
                                    new Uint8Array(h)
                                );
                            } catch (t) {
                                var f = new Uint8Array(h);
                                h = '';
                                for (u = 0; u < f.length; u++)
                                    h += String.fromCharCode(f[u]);
                            }
                        i.push(h), (o = s(o, l));
                    }
                    var p = i.length;
                    i.forEach(function (t, o) {
                        r(e.decodePacket(t, n, !0), o, p);
                    });
                });
        },
        function (t, e, n) {
            (function (r) {
                (e.log = function (...t) {
                    return (
                        'object' == typeof console &&
                        console.log &&
                        console.log(...t)
                    );
                }),
                    (e.formatArgs = function (e) {
                        if (
                            ((e[0] =
                                (this.useColors ? '%c' : '') +
                                this.namespace +
                                (this.useColors ? ' %c' : ' ') +
                                e[0] +
                                (this.useColors ? '%c ' : ' ') +
                                '+' +
                                t.exports.humanize(this.diff)),
                            !this.useColors)
                        )
                            return;
                        const n = 'color: ' + this.color;
                        e.splice(1, 0, n, 'color: inherit');
                        let r = 0,
                            o = 0;
                        e[0].replace(/%[a-zA-Z%]/g, (t) => {
                            '%%' !== t && (r++, '%c' === t && (o = r));
                        }),
                            e.splice(o, 0, n);
                    }),
                    (e.save = function (t) {
                        try {
                            t
                                ? e.storage.setItem('debug', t)
                                : e.storage.removeItem('debug');
                        } catch (t) {}
                    }),
                    (e.load = function () {
                        let t;
                        try {
                            t = e.storage.getItem('debug');
                        } catch (t) {}
                        !t && void 0 !== r && 'env' in r && (t = r.env.DEBUG);
                        return t;
                    }),
                    (e.useColors = function () {
                        if (
                            'undefined' != typeof window &&
                            window.process &&
                            ('renderer' === window.process.type ||
                                window.process.__nwjs)
                        )
                            return !0;
                        if (
                            'undefined' != typeof navigator &&
                            navigator.userAgent &&
                            navigator.userAgent
                                .toLowerCase()
                                .match(/(edge|trident)\/(\d+)/)
                        )
                            return !1;
                        return (
                            ('undefined' != typeof document &&
                                document.documentElement &&
                                document.documentElement.style &&
                                document.documentElement.style
                                    .WebkitAppearance) ||
                            ('undefined' != typeof window &&
                                window.console &&
                                (window.console.firebug ||
                                    (window.console.exception &&
                                        window.console.table))) ||
                            ('undefined' != typeof navigator &&
                                navigator.userAgent &&
                                navigator.userAgent
                                    .toLowerCase()
                                    .match(/firefox\/(\d+)/) &&
                                parseInt(RegExp.$1, 10) >= 31) ||
                            ('undefined' != typeof navigator &&
                                navigator.userAgent &&
                                navigator.userAgent
                                    .toLowerCase()
                                    .match(/applewebkit\/(\d+)/))
                        );
                    }),
                    (e.storage = (function () {
                        try {
                            return localStorage;
                        } catch (t) {}
                    })()),
                    (e.colors = [
                        '#0000CC',
                        '#0000FF',
                        '#0033CC',
                        '#0033FF',
                        '#0066CC',
                        '#0066FF',
                        '#0099CC',
                        '#0099FF',
                        '#00CC00',
                        '#00CC33',
                        '#00CC66',
                        '#00CC99',
                        '#00CCCC',
                        '#00CCFF',
                        '#3300CC',
                        '#3300FF',
                        '#3333CC',
                        '#3333FF',
                        '#3366CC',
                        '#3366FF',
                        '#3399CC',
                        '#3399FF',
                        '#33CC00',
                        '#33CC33',
                        '#33CC66',
                        '#33CC99',
                        '#33CCCC',
                        '#33CCFF',
                        '#6600CC',
                        '#6600FF',
                        '#6633CC',
                        '#6633FF',
                        '#66CC00',
                        '#66CC33',
                        '#9900CC',
                        '#9900FF',
                        '#9933CC',
                        '#9933FF',
                        '#99CC00',
                        '#99CC33',
                        '#CC0000',
                        '#CC0033',
                        '#CC0066',
                        '#CC0099',
                        '#CC00CC',
                        '#CC00FF',
                        '#CC3300',
                        '#CC3333',
                        '#CC3366',
                        '#CC3399',
                        '#CC33CC',
                        '#CC33FF',
                        '#CC6600',
                        '#CC6633',
                        '#CC9900',
                        '#CC9933',
                        '#CCCC00',
                        '#CCCC33',
                        '#FF0000',
                        '#FF0033',
                        '#FF0066',
                        '#FF0099',
                        '#FF00CC',
                        '#FF00FF',
                        '#FF3300',
                        '#FF3333',
                        '#FF3366',
                        '#FF3399',
                        '#FF33CC',
                        '#FF33FF',
                        '#FF6600',
                        '#FF6633',
                        '#FF9900',
                        '#FF9933',
                        '#FFCC00',
                        '#FFCC33'
                    ]),
                    (t.exports = n(31)(e));
                const { formatters: o } = t.exports;
                o.j = function (t) {
                    try {
                        return JSON.stringify(t);
                    } catch (t) {
                        return '[UnexpectedJSONParseError]: ' + t.message;
                    }
                };
            }.call(this, n(7)));
        },
        function (t, e) {
            (e.encode = function (t) {
                var e = '';
                for (var n in t)
                    t.hasOwnProperty(n) &&
                        (e.length && (e += '&'),
                        (e +=
                            encodeURIComponent(n) +
                            '=' +
                            encodeURIComponent(t[n])));
                return e;
            }),
                (e.decode = function (t) {
                    for (
                        var e = {}, n = t.split('&'), r = 0, o = n.length;
                        r < o;
                        r++
                    ) {
                        var i = n[r].split('=');
                        e[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
                    }
                    return e;
                });
        },
        function (t, e) {
            t.exports = function (t, e) {
                var n = function () {};
                (n.prototype = e.prototype),
                    (t.prototype = new n()),
                    (t.prototype.constructor = t);
            };
        },
        function (t, e, n) {
            (function (r) {
                (e.log = function (...t) {
                    return (
                        'object' == typeof console &&
                        console.log &&
                        console.log(...t)
                    );
                }),
                    (e.formatArgs = function (e) {
                        if (
                            ((e[0] =
                                (this.useColors ? '%c' : '') +
                                this.namespace +
                                (this.useColors ? ' %c' : ' ') +
                                e[0] +
                                (this.useColors ? '%c ' : ' ') +
                                '+' +
                                t.exports.humanize(this.diff)),
                            !this.useColors)
                        )
                            return;
                        const n = 'color: ' + this.color;
                        e.splice(1, 0, n, 'color: inherit');
                        let r = 0,
                            o = 0;
                        e[0].replace(/%[a-zA-Z%]/g, (t) => {
                            '%%' !== t && (r++, '%c' === t && (o = r));
                        }),
                            e.splice(o, 0, n);
                    }),
                    (e.save = function (t) {
                        try {
                            t
                                ? e.storage.setItem('debug', t)
                                : e.storage.removeItem('debug');
                        } catch (t) {}
                    }),
                    (e.load = function () {
                        let t;
                        try {
                            t = e.storage.getItem('debug');
                        } catch (t) {}
                        !t && void 0 !== r && 'env' in r && (t = r.env.DEBUG);
                        return t;
                    }),
                    (e.useColors = function () {
                        if (
                            'undefined' != typeof window &&
                            window.process &&
                            ('renderer' === window.process.type ||
                                window.process.__nwjs)
                        )
                            return !0;
                        if (
                            'undefined' != typeof navigator &&
                            navigator.userAgent &&
                            navigator.userAgent
                                .toLowerCase()
                                .match(/(edge|trident)\/(\d+)/)
                        )
                            return !1;
                        return (
                            ('undefined' != typeof document &&
                                document.documentElement &&
                                document.documentElement.style &&
                                document.documentElement.style
                                    .WebkitAppearance) ||
                            ('undefined' != typeof window &&
                                window.console &&
                                (window.console.firebug ||
                                    (window.console.exception &&
                                        window.console.table))) ||
                            ('undefined' != typeof navigator &&
                                navigator.userAgent &&
                                navigator.userAgent
                                    .toLowerCase()
                                    .match(/firefox\/(\d+)/) &&
                                parseInt(RegExp.$1, 10) >= 31) ||
                            ('undefined' != typeof navigator &&
                                navigator.userAgent &&
                                navigator.userAgent
                                    .toLowerCase()
                                    .match(/applewebkit\/(\d+)/))
                        );
                    }),
                    (e.storage = (function () {
                        try {
                            return localStorage;
                        } catch (t) {}
                    })()),
                    (e.colors = [
                        '#0000CC',
                        '#0000FF',
                        '#0033CC',
                        '#0033FF',
                        '#0066CC',
                        '#0066FF',
                        '#0099CC',
                        '#0099FF',
                        '#00CC00',
                        '#00CC33',
                        '#00CC66',
                        '#00CC99',
                        '#00CCCC',
                        '#00CCFF',
                        '#3300CC',
                        '#3300FF',
                        '#3333CC',
                        '#3333FF',
                        '#3366CC',
                        '#3366FF',
                        '#3399CC',
                        '#3399FF',
                        '#33CC00',
                        '#33CC33',
                        '#33CC66',
                        '#33CC99',
                        '#33CCCC',
                        '#33CCFF',
                        '#6600CC',
                        '#6600FF',
                        '#6633CC',
                        '#6633FF',
                        '#66CC00',
                        '#66CC33',
                        '#9900CC',
                        '#9900FF',
                        '#9933CC',
                        '#9933FF',
                        '#99CC00',
                        '#99CC33',
                        '#CC0000',
                        '#CC0033',
                        '#CC0066',
                        '#CC0099',
                        '#CC00CC',
                        '#CC00FF',
                        '#CC3300',
                        '#CC3333',
                        '#CC3366',
                        '#CC3399',
                        '#CC33CC',
                        '#CC33FF',
                        '#CC6600',
                        '#CC6633',
                        '#CC9900',
                        '#CC9933',
                        '#CCCC00',
                        '#CCCC33',
                        '#FF0000',
                        '#FF0033',
                        '#FF0066',
                        '#FF0099',
                        '#FF00CC',
                        '#FF00FF',
                        '#FF3300',
                        '#FF3333',
                        '#FF3366',
                        '#FF3399',
                        '#FF33CC',
                        '#FF33FF',
                        '#FF6600',
                        '#FF6633',
                        '#FF9900',
                        '#FF9933',
                        '#FFCC00',
                        '#FFCC33'
                    ]),
                    (t.exports = n(51)(e));
                const { formatters: o } = t.exports;
                o.j = function (t) {
                    try {
                        return JSON.stringify(t);
                    } catch (t) {
                        return '[UnexpectedJSONParseError]: ' + t.message;
                    }
                };
            }.call(this, n(7)));
        },
        function (t, e, n) {
            var r = n(30),
                o = n(8),
                i = n(19),
                s = n(2)('socket.io-client');
            t.exports = e = c;
            var a = (e.managers = {});
            function c(t, e) {
                'object' == typeof t && ((e = t), (t = void 0)), (e = e || {});
                var n,
                    o = r(t),
                    c = o.source,
                    l = o.id,
                    u = o.path,
                    h = a[l] && u in a[l].nsps;
                return (
                    e.forceNew ||
                    e['force new connection'] ||
                    !1 === e.multiplex ||
                    h
                        ? (s('ignoring socket cache for %s', c), (n = i(c, e)))
                        : (a[l] ||
                              (s('new io instance for %s', c),
                              (a[l] = i(c, e))),
                          (n = a[l])),
                    o.query && !e.query && (e.query = o.query),
                    n.socket(o.path, e)
                );
            }
            (e.protocol = o.protocol),
                (e.connect = c),
                (e.Manager = n(19)),
                (e.Socket = n(25));
        },
        function (t, e) {
            var n,
                r,
                o = (t.exports = {});
            function i() {
                throw new Error('setTimeout has not been defined');
            }
            function s() {
                throw new Error('clearTimeout has not been defined');
            }
            function a(t) {
                if (n === setTimeout) return setTimeout(t, 0);
                if ((n === i || !n) && setTimeout)
                    return (n = setTimeout), setTimeout(t, 0);
                try {
                    return n(t, 0);
                } catch (e) {
                    try {
                        return n.call(null, t, 0);
                    } catch (e) {
                        return n.call(this, t, 0);
                    }
                }
            }
            !(function () {
                try {
                    n = 'function' == typeof setTimeout ? setTimeout : i;
                } catch (t) {
                    n = i;
                }
                try {
                    r = 'function' == typeof clearTimeout ? clearTimeout : s;
                } catch (t) {
                    r = s;
                }
            })();
            var c,
                l = [],
                u = !1,
                h = -1;
            function f() {
                u &&
                    c &&
                    ((u = !1),
                    c.length ? (l = c.concat(l)) : (h = -1),
                    l.length && p());
            }
            function p() {
                if (!u) {
                    var t = a(f);
                    u = !0;
                    for (var e = l.length; e; ) {
                        for (c = l, l = []; ++h < e; ) c && c[h].run();
                        (h = -1), (e = l.length);
                    }
                    (c = null),
                        (u = !1),
                        (function (t) {
                            if (r === clearTimeout) return clearTimeout(t);
                            if ((r === s || !r) && clearTimeout)
                                return (r = clearTimeout), clearTimeout(t);
                            try {
                                r(t);
                            } catch (e) {
                                try {
                                    return r.call(null, t);
                                } catch (e) {
                                    return r.call(this, t);
                                }
                            }
                        })(t);
                }
            }
            function d(t, e) {
                (this.fun = t), (this.array = e);
            }
            function g() {}
            (o.nextTick = function (t) {
                var e = new Array(arguments.length - 1);
                if (arguments.length > 1)
                    for (var n = 1; n < arguments.length; n++)
                        e[n - 1] = arguments[n];
                l.push(new d(t, e)), 1 !== l.length || u || a(p);
            }),
                (d.prototype.run = function () {
                    this.fun.apply(null, this.array);
                }),
                (o.title = 'browser'),
                (o.browser = !0),
                (o.env = {}),
                (o.argv = []),
                (o.version = ''),
                (o.versions = {}),
                (o.on = g),
                (o.addListener = g),
                (o.once = g),
                (o.off = g),
                (o.removeListener = g),
                (o.removeAllListeners = g),
                (o.emit = g),
                (o.prependListener = g),
                (o.prependOnceListener = g),
                (o.listeners = function (t) {
                    return [];
                }),
                (o.binding = function (t) {
                    throw new Error('process.binding is not supported');
                }),
                (o.cwd = function () {
                    return '/';
                }),
                (o.chdir = function (t) {
                    throw new Error('process.chdir is not supported');
                }),
                (o.umask = function () {
                    return 0;
                });
        },
        function (t, e, n) {
            var r = n(33)('socket.io-parser'),
                o = n(9),
                i = n(36),
                s = n(17),
                a = n(18);
            function c() {}
            (e.protocol = 4),
                (e.types = [
                    'CONNECT',
                    'DISCONNECT',
                    'EVENT',
                    'ACK',
                    'ERROR',
                    'BINARY_EVENT',
                    'BINARY_ACK'
                ]),
                (e.CONNECT = 0),
                (e.DISCONNECT = 1),
                (e.EVENT = 2),
                (e.ACK = 3),
                (e.ERROR = 4),
                (e.BINARY_EVENT = 5),
                (e.BINARY_ACK = 6),
                (e.Encoder = c),
                (e.Decoder = h);
            var l = e.ERROR + '"encode error"';
            function u(t) {
                var n = '' + t.type;
                if (
                    ((e.BINARY_EVENT !== t.type && e.BINARY_ACK !== t.type) ||
                        (n += t.attachments + '-'),
                    t.nsp && '/' !== t.nsp && (n += t.nsp + ','),
                    null != t.id && (n += t.id),
                    null != t.data)
                ) {
                    var o = (function (t) {
                        try {
                            return JSON.stringify(t);
                        } catch (t) {
                            return !1;
                        }
                    })(t.data);
                    if (!1 === o) return l;
                    n += o;
                }
                return r('encoded %j as %s', t, n), n;
            }
            function h() {
                this.reconstructor = null;
            }
            function f(t) {
                (this.reconPack = t), (this.buffers = []);
            }
            function p(t) {
                return { type: e.ERROR, data: 'parser error: ' + t };
            }
            (c.prototype.encode = function (t, n) {
                (r('encoding packet %j', t),
                e.BINARY_EVENT === t.type || e.BINARY_ACK === t.type)
                    ? (function (t, e) {
                          i.removeBlobs(t, function (t) {
                              var n = i.deconstructPacket(t),
                                  r = u(n.packet),
                                  o = n.buffers;
                              o.unshift(r), e(o);
                          });
                      })(t, n)
                    : n([u(t)]);
            }),
                o(h.prototype),
                (h.prototype.add = function (t) {
                    var n;
                    if ('string' == typeof t)
                        (n = (function (t) {
                            var n = 0,
                                o = { type: Number(t.charAt(0)) };
                            if (null == e.types[o.type])
                                return p('unknown packet type ' + o.type);
                            if (
                                e.BINARY_EVENT === o.type ||
                                e.BINARY_ACK === o.type
                            ) {
                                for (
                                    var i = '';
                                    '-' !== t.charAt(++n) &&
                                    ((i += t.charAt(n)), n != t.length);

                                );
                                if (i != Number(i) || '-' !== t.charAt(n))
                                    throw new Error('Illegal attachments');
                                o.attachments = Number(i);
                            }
                            if ('/' === t.charAt(n + 1))
                                for (o.nsp = ''; ++n; ) {
                                    if (',' === (c = t.charAt(n))) break;
                                    if (((o.nsp += c), n === t.length)) break;
                                }
                            else o.nsp = '/';
                            var a = t.charAt(n + 1);
                            if ('' !== a && Number(a) == a) {
                                for (o.id = ''; ++n; ) {
                                    var c;
                                    if (
                                        null == (c = t.charAt(n)) ||
                                        Number(c) != c
                                    ) {
                                        --n;
                                        break;
                                    }
                                    if (((o.id += t.charAt(n)), n === t.length))
                                        break;
                                }
                                o.id = Number(o.id);
                            }
                            if (t.charAt(++n)) {
                                var l = (function (t) {
                                    try {
                                        return JSON.parse(t);
                                    } catch (t) {
                                        return !1;
                                    }
                                })(t.substr(n));
                                if (!(!1 !== l && (o.type === e.ERROR || s(l))))
                                    return p('invalid payload');
                                o.data = l;
                            }
                            return r('decoded %s as %j', t, o), o;
                        })(t)),
                            e.BINARY_EVENT === n.type || e.BINARY_ACK === n.type
                                ? ((this.reconstructor = new f(n)),
                                  0 ===
                                      this.reconstructor.reconPack
                                          .attachments &&
                                      this.emit('decoded', n))
                                : this.emit('decoded', n);
                    else {
                        if (!a(t) && !t.base64)
                            throw new Error('Unknown type: ' + t);
                        if (!this.reconstructor)
                            throw new Error(
                                'got binary data when not reconstructing a packet'
                            );
                        (n = this.reconstructor.takeBinaryData(t)) &&
                            ((this.reconstructor = null),
                            this.emit('decoded', n));
                    }
                }),
                (h.prototype.destroy = function () {
                    this.reconstructor &&
                        this.reconstructor.finishedReconstruction();
                }),
                (f.prototype.takeBinaryData = function (t) {
                    if (
                        (this.buffers.push(t),
                        this.buffers.length === this.reconPack.attachments)
                    ) {
                        var e = i.reconstructPacket(
                            this.reconPack,
                            this.buffers
                        );
                        return this.finishedReconstruction(), e;
                    }
                    return null;
                }),
                (f.prototype.finishedReconstruction = function () {
                    (this.reconPack = null), (this.buffers = []);
                });
        },
        function (t, e, n) {
            function r(t) {
                if (t)
                    return (function (t) {
                        for (var e in r.prototype) t[e] = r.prototype[e];
                        return t;
                    })(t);
            }
            (t.exports = r),
                (r.prototype.on = r.prototype.addEventListener = function (
                    t,
                    e
                ) {
                    return (
                        (this._callbacks = this._callbacks || {}),
                        (this._callbacks['$' + t] =
                            this._callbacks['$' + t] || []).push(e),
                        this
                    );
                }),
                (r.prototype.once = function (t, e) {
                    function n() {
                        this.off(t, n), e.apply(this, arguments);
                    }
                    return (n.fn = e), this.on(t, n), this;
                }),
                (r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function (
                    t,
                    e
                ) {
                    if (
                        ((this._callbacks = this._callbacks || {}),
                        0 == arguments.length)
                    )
                        return (this._callbacks = {}), this;
                    var n,
                        r = this._callbacks['$' + t];
                    if (!r) return this;
                    if (1 == arguments.length)
                        return delete this._callbacks['$' + t], this;
                    for (var o = 0; o < r.length; o++)
                        if ((n = r[o]) === e || n.fn === e) {
                            r.splice(o, 1);
                            break;
                        }
                    return this;
                }),
                (r.prototype.emit = function (t) {
                    this._callbacks = this._callbacks || {};
                    var e = [].slice.call(arguments, 1),
                        n = this._callbacks['$' + t];
                    if (n)
                        for (var r = 0, o = (n = n.slice(0)).length; r < o; ++r)
                            n[r].apply(this, e);
                    return this;
                }),
                (r.prototype.listeners = function (t) {
                    return (
                        (this._callbacks = this._callbacks || {}),
                        this._callbacks['$' + t] || []
                    );
                }),
                (r.prototype.hasListeners = function (t) {
                    return !!this.listeners(t).length;
                });
        },
        function (t, e, n) {
            'use strict';
            (function (t) {
                /*!
                 * The buffer module from node.js, for the browser.
                 *
                 * @author   Feross Aboukhadijeh <http://feross.org>
                 * @license  MIT
                 */
                var r = n(37),
                    o = n(38),
                    i = n(39);
                function s() {
                    return c.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
                }
                function a(t, e) {
                    if (s() < e)
                        throw new RangeError('Invalid typed array length');
                    return (
                        c.TYPED_ARRAY_SUPPORT
                            ? ((t = new Uint8Array(e)).__proto__ = c.prototype)
                            : (null === t && (t = new c(e)), (t.length = e)),
                        t
                    );
                }
                function c(t, e, n) {
                    if (!(c.TYPED_ARRAY_SUPPORT || this instanceof c))
                        return new c(t, e, n);
                    if ('number' == typeof t) {
                        if ('string' == typeof e)
                            throw new Error(
                                'If encoding is specified then the first argument must be a string'
                            );
                        return h(this, t);
                    }
                    return l(this, t, e, n);
                }
                function l(t, e, n, r) {
                    if ('number' == typeof e)
                        throw new TypeError(
                            '"value" argument must not be a number'
                        );
                    return 'undefined' != typeof ArrayBuffer &&
                        e instanceof ArrayBuffer
                        ? (function (t, e, n, r) {
                              if ((e.byteLength, n < 0 || e.byteLength < n))
                                  throw new RangeError(
                                      "'offset' is out of bounds"
                                  );
                              if (e.byteLength < n + (r || 0))
                                  throw new RangeError(
                                      "'length' is out of bounds"
                                  );
                              e =
                                  void 0 === n && void 0 === r
                                      ? new Uint8Array(e)
                                      : void 0 === r
                                      ? new Uint8Array(e, n)
                                      : new Uint8Array(e, n, r);
                              c.TYPED_ARRAY_SUPPORT
                                  ? ((t = e).__proto__ = c.prototype)
                                  : (t = f(t, e));
                              return t;
                          })(t, e, n, r)
                        : 'string' == typeof e
                        ? (function (t, e, n) {
                              ('string' == typeof n && '' !== n) ||
                                  (n = 'utf8');
                              if (!c.isEncoding(n))
                                  throw new TypeError(
                                      '"encoding" must be a valid string encoding'
                                  );
                              var r = 0 | d(e, n),
                                  o = (t = a(t, r)).write(e, n);
                              o !== r && (t = t.slice(0, o));
                              return t;
                          })(t, e, n)
                        : (function (t, e) {
                              if (c.isBuffer(e)) {
                                  var n = 0 | p(e.length);
                                  return (
                                      0 === (t = a(t, n)).length ||
                                          e.copy(t, 0, 0, n),
                                      t
                                  );
                              }
                              if (e) {
                                  if (
                                      ('undefined' != typeof ArrayBuffer &&
                                          e.buffer instanceof ArrayBuffer) ||
                                      'length' in e
                                  )
                                      return 'number' != typeof e.length ||
                                          (r = e.length) != r
                                          ? a(t, 0)
                                          : f(t, e);
                                  if ('Buffer' === e.type && i(e.data))
                                      return f(t, e.data);
                              }
                              var r;
                              throw new TypeError(
                                  'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.'
                              );
                          })(t, e);
                }
                function u(t) {
                    if ('number' != typeof t)
                        throw new TypeError('"size" argument must be a number');
                    if (t < 0)
                        throw new RangeError(
                            '"size" argument must not be negative'
                        );
                }
                function h(t, e) {
                    if (
                        (u(e),
                        (t = a(t, e < 0 ? 0 : 0 | p(e))),
                        !c.TYPED_ARRAY_SUPPORT)
                    )
                        for (var n = 0; n < e; ++n) t[n] = 0;
                    return t;
                }
                function f(t, e) {
                    var n = e.length < 0 ? 0 : 0 | p(e.length);
                    t = a(t, n);
                    for (var r = 0; r < n; r += 1) t[r] = 255 & e[r];
                    return t;
                }
                function p(t) {
                    if (t >= s())
                        throw new RangeError(
                            'Attempt to allocate Buffer larger than maximum size: 0x' +
                                s().toString(16) +
                                ' bytes'
                        );
                    return 0 | t;
                }
                function d(t, e) {
                    if (c.isBuffer(t)) return t.length;
                    if (
                        'undefined' != typeof ArrayBuffer &&
                        'function' == typeof ArrayBuffer.isView &&
                        (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)
                    )
                        return t.byteLength;
                    'string' != typeof t && (t = '' + t);
                    var n = t.length;
                    if (0 === n) return 0;
                    for (var r = !1; ; )
                        switch (e) {
                            case 'ascii':
                            case 'latin1':
                            case 'binary':
                                return n;
                            case 'utf8':
                            case 'utf-8':
                            case void 0:
                                return U(t).length;
                            case 'ucs2':
                            case 'ucs-2':
                            case 'utf16le':
                            case 'utf-16le':
                                return 2 * n;
                            case 'hex':
                                return n >>> 1;
                            case 'base64':
                                return H(t).length;
                            default:
                                if (r) return U(t).length;
                                (e = ('' + e).toLowerCase()), (r = !0);
                        }
                }
                function g(t, e, n) {
                    var r = !1;
                    if (((void 0 === e || e < 0) && (e = 0), e > this.length))
                        return '';
                    if (
                        ((void 0 === n || n > this.length) && (n = this.length),
                        n <= 0)
                    )
                        return '';
                    if ((n >>>= 0) <= (e >>>= 0)) return '';
                    for (t || (t = 'utf8'); ; )
                        switch (t) {
                            case 'hex':
                                return F(this, e, n);
                            case 'utf8':
                            case 'utf-8':
                                return S(this, e, n);
                            case 'ascii':
                                return k(this, e, n);
                            case 'latin1':
                            case 'binary':
                                return R(this, e, n);
                            case 'base64':
                                return N(this, e, n);
                            case 'ucs2':
                            case 'ucs-2':
                            case 'utf16le':
                            case 'utf-16le':
                                return B(this, e, n);
                            default:
                                if (r)
                                    throw new TypeError(
                                        'Unknown encoding: ' + t
                                    );
                                (t = (t + '').toLowerCase()), (r = !0);
                        }
                }
                function y(t, e, n) {
                    var r = t[e];
                    (t[e] = t[n]), (t[n] = r);
                }
                function m(t, e, n, r, o) {
                    if (0 === t.length) return -1;
                    if (
                        ('string' == typeof n
                            ? ((r = n), (n = 0))
                            : n > 2147483647
                            ? (n = 2147483647)
                            : n < -2147483648 && (n = -2147483648),
                        (n = +n),
                        isNaN(n) && (n = o ? 0 : t.length - 1),
                        n < 0 && (n = t.length + n),
                        n >= t.length)
                    ) {
                        if (o) return -1;
                        n = t.length - 1;
                    } else if (n < 0) {
                        if (!o) return -1;
                        n = 0;
                    }
                    if (
                        ('string' == typeof e && (e = c.from(e, r)),
                        c.isBuffer(e))
                    )
                        return 0 === e.length ? -1 : b(t, e, n, r, o);
                    if ('number' == typeof e)
                        return (
                            (e &= 255),
                            c.TYPED_ARRAY_SUPPORT &&
                            'function' == typeof Uint8Array.prototype.indexOf
                                ? o
                                    ? Uint8Array.prototype.indexOf.call(t, e, n)
                                    : Uint8Array.prototype.lastIndexOf.call(
                                          t,
                                          e,
                                          n
                                      )
                                : b(t, [e], n, r, o)
                        );
                    throw new TypeError('val must be string, number or Buffer');
                }
                function b(t, e, n, r, o) {
                    var i,
                        s = 1,
                        a = t.length,
                        c = e.length;
                    if (
                        void 0 !== r &&
                        ('ucs2' === (r = String(r).toLowerCase()) ||
                            'ucs-2' === r ||
                            'utf16le' === r ||
                            'utf-16le' === r)
                    ) {
                        if (t.length < 2 || e.length < 2) return -1;
                        (s = 2), (a /= 2), (c /= 2), (n /= 2);
                    }
                    function l(t, e) {
                        return 1 === s ? t[e] : t.readUInt16BE(e * s);
                    }
                    if (o) {
                        var u = -1;
                        for (i = n; i < a; i++)
                            if (l(t, i) === l(e, -1 === u ? 0 : i - u)) {
                                if ((-1 === u && (u = i), i - u + 1 === c))
                                    return u * s;
                            } else -1 !== u && (i -= i - u), (u = -1);
                    } else
                        for (n + c > a && (n = a - c), i = n; i >= 0; i--) {
                            for (var h = !0, f = 0; f < c; f++)
                                if (l(t, i + f) !== l(e, f)) {
                                    h = !1;
                                    break;
                                }
                            if (h) return i;
                        }
                    return -1;
                }
                function v(t, e, n, r) {
                    n = Number(n) || 0;
                    var o = t.length - n;
                    r ? (r = Number(r)) > o && (r = o) : (r = o);
                    var i = e.length;
                    if (i % 2 != 0) throw new TypeError('Invalid hex string');
                    r > i / 2 && (r = i / 2);
                    for (var s = 0; s < r; ++s) {
                        var a = parseInt(e.substr(2 * s, 2), 16);
                        if (isNaN(a)) return s;
                        t[n + s] = a;
                    }
                    return s;
                }
                function w(t, e, n, r) {
                    return j(U(e, t.length - n), t, n, r);
                }
                function C(t, e, n, r) {
                    return j(
                        (function (t) {
                            for (var e = [], n = 0; n < t.length; ++n)
                                e.push(255 & t.charCodeAt(n));
                            return e;
                        })(e),
                        t,
                        n,
                        r
                    );
                }
                function E(t, e, n, r) {
                    return C(t, e, n, r);
                }
                function T(t, e, n, r) {
                    return j(H(e), t, n, r);
                }
                function A(t, e, n, r) {
                    return j(
                        (function (t, e) {
                            for (
                                var n, r, o, i = [], s = 0;
                                s < t.length && !((e -= 2) < 0);
                                ++s
                            )
                                (n = t.charCodeAt(s)),
                                    (r = n >> 8),
                                    (o = n % 256),
                                    i.push(o),
                                    i.push(r);
                            return i;
                        })(e, t.length - n),
                        t,
                        n,
                        r
                    );
                }
                function N(t, e, n) {
                    return 0 === e && n === t.length
                        ? r.fromByteArray(t)
                        : r.fromByteArray(t.slice(e, n));
                }
                function S(t, e, n) {
                    n = Math.min(t.length, n);
                    for (var r = [], o = e; o < n; ) {
                        var i,
                            s,
                            a,
                            c,
                            l = t[o],
                            u = null,
                            h = l > 239 ? 4 : l > 223 ? 3 : l > 191 ? 2 : 1;
                        if (o + h <= n)
                            switch (h) {
                                case 1:
                                    l < 128 && (u = l);
                                    break;
                                case 2:
                                    128 == (192 & (i = t[o + 1])) &&
                                        (c = ((31 & l) << 6) | (63 & i)) >
                                            127 &&
                                        (u = c);
                                    break;
                                case 3:
                                    (i = t[o + 1]),
                                        (s = t[o + 2]),
                                        128 == (192 & i) &&
                                            128 == (192 & s) &&
                                            (c =
                                                ((15 & l) << 12) |
                                                ((63 & i) << 6) |
                                                (63 & s)) > 2047 &&
                                            (c < 55296 || c > 57343) &&
                                            (u = c);
                                    break;
                                case 4:
                                    (i = t[o + 1]),
                                        (s = t[o + 2]),
                                        (a = t[o + 3]),
                                        128 == (192 & i) &&
                                            128 == (192 & s) &&
                                            128 == (192 & a) &&
                                            (c =
                                                ((15 & l) << 18) |
                                                ((63 & i) << 12) |
                                                ((63 & s) << 6) |
                                                (63 & a)) > 65535 &&
                                            c < 1114112 &&
                                            (u = c);
                            }
                        null === u
                            ? ((u = 65533), (h = 1))
                            : u > 65535 &&
                              ((u -= 65536),
                              r.push(((u >>> 10) & 1023) | 55296),
                              (u = 56320 | (1023 & u))),
                            r.push(u),
                            (o += h);
                    }
                    return (function (t) {
                        var e = t.length;
                        if (e <= 4096)
                            return String.fromCharCode.apply(String, t);
                        var n = '',
                            r = 0;
                        for (; r < e; )
                            n += String.fromCharCode.apply(
                                String,
                                t.slice(r, (r += 4096))
                            );
                        return n;
                    })(r);
                }
                (e.Buffer = c),
                    (e.SlowBuffer = function (t) {
                        +t != t && (t = 0);
                        return c.alloc(+t);
                    }),
                    (e.INSPECT_MAX_BYTES = 50),
                    (c.TYPED_ARRAY_SUPPORT =
                        void 0 !== t.TYPED_ARRAY_SUPPORT
                            ? t.TYPED_ARRAY_SUPPORT
                            : (function () {
                                  try {
                                      var t = new Uint8Array(1);
                                      return (
                                          (t.__proto__ = {
                                              __proto__: Uint8Array.prototype,
                                              foo: function () {
                                                  return 42;
                                              }
                                          }),
                                          42 === t.foo() &&
                                              'function' == typeof t.subarray &&
                                              0 === t.subarray(1, 1).byteLength
                                      );
                                  } catch (t) {
                                      return !1;
                                  }
                              })()),
                    (e.kMaxLength = s()),
                    (c.poolSize = 8192),
                    (c._augment = function (t) {
                        return (t.__proto__ = c.prototype), t;
                    }),
                    (c.from = function (t, e, n) {
                        return l(null, t, e, n);
                    }),
                    c.TYPED_ARRAY_SUPPORT &&
                        ((c.prototype.__proto__ = Uint8Array.prototype),
                        (c.__proto__ = Uint8Array),
                        'undefined' != typeof Symbol &&
                            Symbol.species &&
                            c[Symbol.species] === c &&
                            Object.defineProperty(c, Symbol.species, {
                                value: null,
                                configurable: !0
                            })),
                    (c.alloc = function (t, e, n) {
                        return (function (t, e, n, r) {
                            return (
                                u(e),
                                e <= 0
                                    ? a(t, e)
                                    : void 0 !== n
                                    ? 'string' == typeof r
                                        ? a(t, e).fill(n, r)
                                        : a(t, e).fill(n)
                                    : a(t, e)
                            );
                        })(null, t, e, n);
                    }),
                    (c.allocUnsafe = function (t) {
                        return h(null, t);
                    }),
                    (c.allocUnsafeSlow = function (t) {
                        return h(null, t);
                    }),
                    (c.isBuffer = function (t) {
                        return !(null == t || !t._isBuffer);
                    }),
                    (c.compare = function (t, e) {
                        if (!c.isBuffer(t) || !c.isBuffer(e))
                            throw new TypeError('Arguments must be Buffers');
                        if (t === e) return 0;
                        for (
                            var n = t.length,
                                r = e.length,
                                o = 0,
                                i = Math.min(n, r);
                            o < i;
                            ++o
                        )
                            if (t[o] !== e[o]) {
                                (n = t[o]), (r = e[o]);
                                break;
                            }
                        return n < r ? -1 : r < n ? 1 : 0;
                    }),
                    (c.isEncoding = function (t) {
                        switch (String(t).toLowerCase()) {
                            case 'hex':
                            case 'utf8':
                            case 'utf-8':
                            case 'ascii':
                            case 'latin1':
                            case 'binary':
                            case 'base64':
                            case 'ucs2':
                            case 'ucs-2':
                            case 'utf16le':
                            case 'utf-16le':
                                return !0;
                            default:
                                return !1;
                        }
                    }),
                    (c.concat = function (t, e) {
                        if (!i(t))
                            throw new TypeError(
                                '"list" argument must be an Array of Buffers'
                            );
                        if (0 === t.length) return c.alloc(0);
                        var n;
                        if (void 0 === e)
                            for (e = 0, n = 0; n < t.length; ++n)
                                e += t[n].length;
                        var r = c.allocUnsafe(e),
                            o = 0;
                        for (n = 0; n < t.length; ++n) {
                            var s = t[n];
                            if (!c.isBuffer(s))
                                throw new TypeError(
                                    '"list" argument must be an Array of Buffers'
                                );
                            s.copy(r, o), (o += s.length);
                        }
                        return r;
                    }),
                    (c.byteLength = d),
                    (c.prototype._isBuffer = !0),
                    (c.prototype.swap16 = function () {
                        var t = this.length;
                        if (t % 2 != 0)
                            throw new RangeError(
                                'Buffer size must be a multiple of 16-bits'
                            );
                        for (var e = 0; e < t; e += 2) y(this, e, e + 1);
                        return this;
                    }),
                    (c.prototype.swap32 = function () {
                        var t = this.length;
                        if (t % 4 != 0)
                            throw new RangeError(
                                'Buffer size must be a multiple of 32-bits'
                            );
                        for (var e = 0; e < t; e += 4)
                            y(this, e, e + 3), y(this, e + 1, e + 2);
                        return this;
                    }),
                    (c.prototype.swap64 = function () {
                        var t = this.length;
                        if (t % 8 != 0)
                            throw new RangeError(
                                'Buffer size must be a multiple of 64-bits'
                            );
                        for (var e = 0; e < t; e += 8)
                            y(this, e, e + 7),
                                y(this, e + 1, e + 6),
                                y(this, e + 2, e + 5),
                                y(this, e + 3, e + 4);
                        return this;
                    }),
                    (c.prototype.toString = function () {
                        var t = 0 | this.length;
                        return 0 === t
                            ? ''
                            : 0 === arguments.length
                            ? S(this, 0, t)
                            : g.apply(this, arguments);
                    }),
                    (c.prototype.equals = function (t) {
                        if (!c.isBuffer(t))
                            throw new TypeError('Argument must be a Buffer');
                        return this === t || 0 === c.compare(this, t);
                    }),
                    (c.prototype.inspect = function () {
                        var t = '',
                            n = e.INSPECT_MAX_BYTES;
                        return (
                            this.length > 0 &&
                                ((t = this.toString('hex', 0, n)
                                    .match(/.{2}/g)
                                    .join(' ')),
                                this.length > n && (t += ' ... ')),
                            '<Buffer ' + t + '>'
                        );
                    }),
                    (c.prototype.compare = function (t, e, n, r, o) {
                        if (!c.isBuffer(t))
                            throw new TypeError('Argument must be a Buffer');
                        if (
                            (void 0 === e && (e = 0),
                            void 0 === n && (n = t ? t.length : 0),
                            void 0 === r && (r = 0),
                            void 0 === o && (o = this.length),
                            e < 0 || n > t.length || r < 0 || o > this.length)
                        )
                            throw new RangeError('out of range index');
                        if (r >= o && e >= n) return 0;
                        if (r >= o) return -1;
                        if (e >= n) return 1;
                        if (this === t) return 0;
                        for (
                            var i = (o >>>= 0) - (r >>>= 0),
                                s = (n >>>= 0) - (e >>>= 0),
                                a = Math.min(i, s),
                                l = this.slice(r, o),
                                u = t.slice(e, n),
                                h = 0;
                            h < a;
                            ++h
                        )
                            if (l[h] !== u[h]) {
                                (i = l[h]), (s = u[h]);
                                break;
                            }
                        return i < s ? -1 : s < i ? 1 : 0;
                    }),
                    (c.prototype.includes = function (t, e, n) {
                        return -1 !== this.indexOf(t, e, n);
                    }),
                    (c.prototype.indexOf = function (t, e, n) {
                        return m(this, t, e, n, !0);
                    }),
                    (c.prototype.lastIndexOf = function (t, e, n) {
                        return m(this, t, e, n, !1);
                    }),
                    (c.prototype.write = function (t, e, n, r) {
                        if (void 0 === e)
                            (r = 'utf8'), (n = this.length), (e = 0);
                        else if (void 0 === n && 'string' == typeof e)
                            (r = e), (n = this.length), (e = 0);
                        else {
                            if (!isFinite(e))
                                throw new Error(
                                    'Buffer.write(string, encoding, offset[, length]) is no longer supported'
                                );
                            (e |= 0),
                                isFinite(n)
                                    ? ((n |= 0), void 0 === r && (r = 'utf8'))
                                    : ((r = n), (n = void 0));
                        }
                        var o = this.length - e;
                        if (
                            ((void 0 === n || n > o) && (n = o),
                            (t.length > 0 && (n < 0 || e < 0)) ||
                                e > this.length)
                        )
                            throw new RangeError(
                                'Attempt to write outside buffer bounds'
                            );
                        r || (r = 'utf8');
                        for (var i = !1; ; )
                            switch (r) {
                                case 'hex':
                                    return v(this, t, e, n);
                                case 'utf8':
                                case 'utf-8':
                                    return w(this, t, e, n);
                                case 'ascii':
                                    return C(this, t, e, n);
                                case 'latin1':
                                case 'binary':
                                    return E(this, t, e, n);
                                case 'base64':
                                    return T(this, t, e, n);
                                case 'ucs2':
                                case 'ucs-2':
                                case 'utf16le':
                                case 'utf-16le':
                                    return A(this, t, e, n);
                                default:
                                    if (i)
                                        throw new TypeError(
                                            'Unknown encoding: ' + r
                                        );
                                    (r = ('' + r).toLowerCase()), (i = !0);
                            }
                    }),
                    (c.prototype.toJSON = function () {
                        return {
                            type: 'Buffer',
                            data: Array.prototype.slice.call(
                                this._arr || this,
                                0
                            )
                        };
                    });
                function k(t, e, n) {
                    var r = '';
                    n = Math.min(t.length, n);
                    for (var o = e; o < n; ++o)
                        r += String.fromCharCode(127 & t[o]);
                    return r;
                }
                function R(t, e, n) {
                    var r = '';
                    n = Math.min(t.length, n);
                    for (var o = e; o < n; ++o) r += String.fromCharCode(t[o]);
                    return r;
                }
                function F(t, e, n) {
                    var r = t.length;
                    (!e || e < 0) && (e = 0), (!n || n < 0 || n > r) && (n = r);
                    for (var o = '', i = e; i < n; ++i) o += $(t[i]);
                    return o;
                }
                function B(t, e, n) {
                    for (
                        var r = t.slice(e, n), o = '', i = 0;
                        i < r.length;
                        i += 2
                    )
                        o += String.fromCharCode(r[i] + 256 * r[i + 1]);
                    return o;
                }
                function _(t, e, n) {
                    if (t % 1 != 0 || t < 0)
                        throw new RangeError('offset is not uint');
                    if (t + e > n)
                        throw new RangeError(
                            'Trying to access beyond buffer length'
                        );
                }
                function L(t, e, n, r, o, i) {
                    if (!c.isBuffer(t))
                        throw new TypeError(
                            '"buffer" argument must be a Buffer instance'
                        );
                    if (e > o || e < i)
                        throw new RangeError(
                            '"value" argument is out of bounds'
                        );
                    if (n + r > t.length)
                        throw new RangeError('Index out of range');
                }
                function x(t, e, n, r) {
                    e < 0 && (e = 65535 + e + 1);
                    for (var o = 0, i = Math.min(t.length - n, 2); o < i; ++o)
                        t[n + o] =
                            (e & (255 << (8 * (r ? o : 1 - o)))) >>>
                            (8 * (r ? o : 1 - o));
                }
                function O(t, e, n, r) {
                    e < 0 && (e = 4294967295 + e + 1);
                    for (var o = 0, i = Math.min(t.length - n, 4); o < i; ++o)
                        t[n + o] = (e >>> (8 * (r ? o : 3 - o))) & 255;
                }
                function P(t, e, n, r, o, i) {
                    if (n + r > t.length)
                        throw new RangeError('Index out of range');
                    if (n < 0) throw new RangeError('Index out of range');
                }
                function M(t, e, n, r, i) {
                    return (
                        i || P(t, 0, n, 4), o.write(t, e, n, r, 23, 4), n + 4
                    );
                }
                function I(t, e, n, r, i) {
                    return (
                        i || P(t, 0, n, 8), o.write(t, e, n, r, 52, 8), n + 8
                    );
                }
                (c.prototype.slice = function (t, e) {
                    var n,
                        r = this.length;
                    if (
                        ((t = ~~t) < 0
                            ? (t += r) < 0 && (t = 0)
                            : t > r && (t = r),
                        (e = void 0 === e ? r : ~~e) < 0
                            ? (e += r) < 0 && (e = 0)
                            : e > r && (e = r),
                        e < t && (e = t),
                        c.TYPED_ARRAY_SUPPORT)
                    )
                        (n = this.subarray(t, e)).__proto__ = c.prototype;
                    else {
                        var o = e - t;
                        n = new c(o, void 0);
                        for (var i = 0; i < o; ++i) n[i] = this[i + t];
                    }
                    return n;
                }),
                    (c.prototype.readUIntLE = function (t, e, n) {
                        (t |= 0), (e |= 0), n || _(t, e, this.length);
                        for (
                            var r = this[t], o = 1, i = 0;
                            ++i < e && (o *= 256);

                        )
                            r += this[t + i] * o;
                        return r;
                    }),
                    (c.prototype.readUIntBE = function (t, e, n) {
                        (t |= 0), (e |= 0), n || _(t, e, this.length);
                        for (
                            var r = this[t + --e], o = 1;
                            e > 0 && (o *= 256);

                        )
                            r += this[t + --e] * o;
                        return r;
                    }),
                    (c.prototype.readUInt8 = function (t, e) {
                        return e || _(t, 1, this.length), this[t];
                    }),
                    (c.prototype.readUInt16LE = function (t, e) {
                        return (
                            e || _(t, 2, this.length),
                            this[t] | (this[t + 1] << 8)
                        );
                    }),
                    (c.prototype.readUInt16BE = function (t, e) {
                        return (
                            e || _(t, 2, this.length),
                            (this[t] << 8) | this[t + 1]
                        );
                    }),
                    (c.prototype.readUInt32LE = function (t, e) {
                        return (
                            e || _(t, 4, this.length),
                            (this[t] |
                                (this[t + 1] << 8) |
                                (this[t + 2] << 16)) +
                                16777216 * this[t + 3]
                        );
                    }),
                    (c.prototype.readUInt32BE = function (t, e) {
                        return (
                            e || _(t, 4, this.length),
                            16777216 * this[t] +
                                ((this[t + 1] << 16) |
                                    (this[t + 2] << 8) |
                                    this[t + 3])
                        );
                    }),
                    (c.prototype.readIntLE = function (t, e, n) {
                        (t |= 0), (e |= 0), n || _(t, e, this.length);
                        for (
                            var r = this[t], o = 1, i = 0;
                            ++i < e && (o *= 256);

                        )
                            r += this[t + i] * o;
                        return r >= (o *= 128) && (r -= Math.pow(2, 8 * e)), r;
                    }),
                    (c.prototype.readIntBE = function (t, e, n) {
                        (t |= 0), (e |= 0), n || _(t, e, this.length);
                        for (
                            var r = e, o = 1, i = this[t + --r];
                            r > 0 && (o *= 256);

                        )
                            i += this[t + --r] * o;
                        return i >= (o *= 128) && (i -= Math.pow(2, 8 * e)), i;
                    }),
                    (c.prototype.readInt8 = function (t, e) {
                        return (
                            e || _(t, 1, this.length),
                            128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
                        );
                    }),
                    (c.prototype.readInt16LE = function (t, e) {
                        e || _(t, 2, this.length);
                        var n = this[t] | (this[t + 1] << 8);
                        return 32768 & n ? 4294901760 | n : n;
                    }),
                    (c.prototype.readInt16BE = function (t, e) {
                        e || _(t, 2, this.length);
                        var n = this[t + 1] | (this[t] << 8);
                        return 32768 & n ? 4294901760 | n : n;
                    }),
                    (c.prototype.readInt32LE = function (t, e) {
                        return (
                            e || _(t, 4, this.length),
                            this[t] |
                                (this[t + 1] << 8) |
                                (this[t + 2] << 16) |
                                (this[t + 3] << 24)
                        );
                    }),
                    (c.prototype.readInt32BE = function (t, e) {
                        return (
                            e || _(t, 4, this.length),
                            (this[t] << 24) |
                                (this[t + 1] << 16) |
                                (this[t + 2] << 8) |
                                this[t + 3]
                        );
                    }),
                    (c.prototype.readFloatLE = function (t, e) {
                        return (
                            e || _(t, 4, this.length),
                            o.read(this, t, !0, 23, 4)
                        );
                    }),
                    (c.prototype.readFloatBE = function (t, e) {
                        return (
                            e || _(t, 4, this.length),
                            o.read(this, t, !1, 23, 4)
                        );
                    }),
                    (c.prototype.readDoubleLE = function (t, e) {
                        return (
                            e || _(t, 8, this.length),
                            o.read(this, t, !0, 52, 8)
                        );
                    }),
                    (c.prototype.readDoubleBE = function (t, e) {
                        return (
                            e || _(t, 8, this.length),
                            o.read(this, t, !1, 52, 8)
                        );
                    }),
                    (c.prototype.writeUIntLE = function (t, e, n, r) {
                        ((t = +t), (e |= 0), (n |= 0), r) ||
                            L(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
                        var o = 1,
                            i = 0;
                        for (this[e] = 255 & t; ++i < n && (o *= 256); )
                            this[e + i] = (t / o) & 255;
                        return e + n;
                    }),
                    (c.prototype.writeUIntBE = function (t, e, n, r) {
                        ((t = +t), (e |= 0), (n |= 0), r) ||
                            L(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
                        var o = n - 1,
                            i = 1;
                        for (this[e + o] = 255 & t; --o >= 0 && (i *= 256); )
                            this[e + o] = (t / i) & 255;
                        return e + n;
                    }),
                    (c.prototype.writeUInt8 = function (t, e, n) {
                        return (
                            (t = +t),
                            (e |= 0),
                            n || L(this, t, e, 1, 255, 0),
                            c.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
                            (this[e] = 255 & t),
                            e + 1
                        );
                    }),
                    (c.prototype.writeUInt16LE = function (t, e, n) {
                        return (
                            (t = +t),
                            (e |= 0),
                            n || L(this, t, e, 2, 65535, 0),
                            c.TYPED_ARRAY_SUPPORT
                                ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8))
                                : x(this, t, e, !0),
                            e + 2
                        );
                    }),
                    (c.prototype.writeUInt16BE = function (t, e, n) {
                        return (
                            (t = +t),
                            (e |= 0),
                            n || L(this, t, e, 2, 65535, 0),
                            c.TYPED_ARRAY_SUPPORT
                                ? ((this[e] = t >>> 8), (this[e + 1] = 255 & t))
                                : x(this, t, e, !1),
                            e + 2
                        );
                    }),
                    (c.prototype.writeUInt32LE = function (t, e, n) {
                        return (
                            (t = +t),
                            (e |= 0),
                            n || L(this, t, e, 4, 4294967295, 0),
                            c.TYPED_ARRAY_SUPPORT
                                ? ((this[e + 3] = t >>> 24),
                                  (this[e + 2] = t >>> 16),
                                  (this[e + 1] = t >>> 8),
                                  (this[e] = 255 & t))
                                : O(this, t, e, !0),
                            e + 4
                        );
                    }),
                    (c.prototype.writeUInt32BE = function (t, e, n) {
                        return (
                            (t = +t),
                            (e |= 0),
                            n || L(this, t, e, 4, 4294967295, 0),
                            c.TYPED_ARRAY_SUPPORT
                                ? ((this[e] = t >>> 24),
                                  (this[e + 1] = t >>> 16),
                                  (this[e + 2] = t >>> 8),
                                  (this[e + 3] = 255 & t))
                                : O(this, t, e, !1),
                            e + 4
                        );
                    }),
                    (c.prototype.writeIntLE = function (t, e, n, r) {
                        if (((t = +t), (e |= 0), !r)) {
                            var o = Math.pow(2, 8 * n - 1);
                            L(this, t, e, n, o - 1, -o);
                        }
                        var i = 0,
                            s = 1,
                            a = 0;
                        for (this[e] = 255 & t; ++i < n && (s *= 256); )
                            t < 0 &&
                                0 === a &&
                                0 !== this[e + i - 1] &&
                                (a = 1),
                                (this[e + i] = (((t / s) >> 0) - a) & 255);
                        return e + n;
                    }),
                    (c.prototype.writeIntBE = function (t, e, n, r) {
                        if (((t = +t), (e |= 0), !r)) {
                            var o = Math.pow(2, 8 * n - 1);
                            L(this, t, e, n, o - 1, -o);
                        }
                        var i = n - 1,
                            s = 1,
                            a = 0;
                        for (this[e + i] = 255 & t; --i >= 0 && (s *= 256); )
                            t < 0 &&
                                0 === a &&
                                0 !== this[e + i + 1] &&
                                (a = 1),
                                (this[e + i] = (((t / s) >> 0) - a) & 255);
                        return e + n;
                    }),
                    (c.prototype.writeInt8 = function (t, e, n) {
                        return (
                            (t = +t),
                            (e |= 0),
                            n || L(this, t, e, 1, 127, -128),
                            c.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
                            t < 0 && (t = 255 + t + 1),
                            (this[e] = 255 & t),
                            e + 1
                        );
                    }),
                    (c.prototype.writeInt16LE = function (t, e, n) {
                        return (
                            (t = +t),
                            (e |= 0),
                            n || L(this, t, e, 2, 32767, -32768),
                            c.TYPED_ARRAY_SUPPORT
                                ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8))
                                : x(this, t, e, !0),
                            e + 2
                        );
                    }),
                    (c.prototype.writeInt16BE = function (t, e, n) {
                        return (
                            (t = +t),
                            (e |= 0),
                            n || L(this, t, e, 2, 32767, -32768),
                            c.TYPED_ARRAY_SUPPORT
                                ? ((this[e] = t >>> 8), (this[e + 1] = 255 & t))
                                : x(this, t, e, !1),
                            e + 2
                        );
                    }),
                    (c.prototype.writeInt32LE = function (t, e, n) {
                        return (
                            (t = +t),
                            (e |= 0),
                            n || L(this, t, e, 4, 2147483647, -2147483648),
                            c.TYPED_ARRAY_SUPPORT
                                ? ((this[e] = 255 & t),
                                  (this[e + 1] = t >>> 8),
                                  (this[e + 2] = t >>> 16),
                                  (this[e + 3] = t >>> 24))
                                : O(this, t, e, !0),
                            e + 4
                        );
                    }),
                    (c.prototype.writeInt32BE = function (t, e, n) {
                        return (
                            (t = +t),
                            (e |= 0),
                            n || L(this, t, e, 4, 2147483647, -2147483648),
                            t < 0 && (t = 4294967295 + t + 1),
                            c.TYPED_ARRAY_SUPPORT
                                ? ((this[e] = t >>> 24),
                                  (this[e + 1] = t >>> 16),
                                  (this[e + 2] = t >>> 8),
                                  (this[e + 3] = 255 & t))
                                : O(this, t, e, !1),
                            e + 4
                        );
                    }),
                    (c.prototype.writeFloatLE = function (t, e, n) {
                        return M(this, t, e, !0, n);
                    }),
                    (c.prototype.writeFloatBE = function (t, e, n) {
                        return M(this, t, e, !1, n);
                    }),
                    (c.prototype.writeDoubleLE = function (t, e, n) {
                        return I(this, t, e, !0, n);
                    }),
                    (c.prototype.writeDoubleBE = function (t, e, n) {
                        return I(this, t, e, !1, n);
                    }),
                    (c.prototype.copy = function (t, e, n, r) {
                        if (
                            (n || (n = 0),
                            r || 0 === r || (r = this.length),
                            e >= t.length && (e = t.length),
                            e || (e = 0),
                            r > 0 && r < n && (r = n),
                            r === n)
                        )
                            return 0;
                        if (0 === t.length || 0 === this.length) return 0;
                        if (e < 0)
                            throw new RangeError('targetStart out of bounds');
                        if (n < 0 || n >= this.length)
                            throw new RangeError('sourceStart out of bounds');
                        if (r < 0)
                            throw new RangeError('sourceEnd out of bounds');
                        r > this.length && (r = this.length),
                            t.length - e < r - n && (r = t.length - e + n);
                        var o,
                            i = r - n;
                        if (this === t && n < e && e < r)
                            for (o = i - 1; o >= 0; --o) t[o + e] = this[o + n];
                        else if (i < 1e3 || !c.TYPED_ARRAY_SUPPORT)
                            for (o = 0; o < i; ++o) t[o + e] = this[o + n];
                        else
                            Uint8Array.prototype.set.call(
                                t,
                                this.subarray(n, n + i),
                                e
                            );
                        return i;
                    }),
                    (c.prototype.fill = function (t, e, n, r) {
                        if ('string' == typeof t) {
                            if (
                                ('string' == typeof e
                                    ? ((r = e), (e = 0), (n = this.length))
                                    : 'string' == typeof n &&
                                      ((r = n), (n = this.length)),
                                1 === t.length)
                            ) {
                                var o = t.charCodeAt(0);
                                o < 256 && (t = o);
                            }
                            if (void 0 !== r && 'string' != typeof r)
                                throw new TypeError(
                                    'encoding must be a string'
                                );
                            if ('string' == typeof r && !c.isEncoding(r))
                                throw new TypeError('Unknown encoding: ' + r);
                        } else 'number' == typeof t && (t &= 255);
                        if (e < 0 || this.length < e || this.length < n)
                            throw new RangeError('Out of range index');
                        if (n <= e) return this;
                        var i;
                        if (
                            ((e >>>= 0),
                            (n = void 0 === n ? this.length : n >>> 0),
                            t || (t = 0),
                            'number' == typeof t)
                        )
                            for (i = e; i < n; ++i) this[i] = t;
                        else {
                            var s = c.isBuffer(t)
                                    ? t
                                    : U(new c(t, r).toString()),
                                a = s.length;
                            for (i = 0; i < n - e; ++i) this[i + e] = s[i % a];
                        }
                        return this;
                    });
                var D = /[^+\/0-9A-Za-z-_]/g;
                function $(t) {
                    return t < 16 ? '0' + t.toString(16) : t.toString(16);
                }
                function U(t, e) {
                    var n;
                    e = e || 1 / 0;
                    for (
                        var r = t.length, o = null, i = [], s = 0;
                        s < r;
                        ++s
                    ) {
                        if ((n = t.charCodeAt(s)) > 55295 && n < 57344) {
                            if (!o) {
                                if (n > 56319) {
                                    (e -= 3) > -1 && i.push(239, 191, 189);
                                    continue;
                                }
                                if (s + 1 === r) {
                                    (e -= 3) > -1 && i.push(239, 191, 189);
                                    continue;
                                }
                                o = n;
                                continue;
                            }
                            if (n < 56320) {
                                (e -= 3) > -1 && i.push(239, 191, 189), (o = n);
                                continue;
                            }
                            n = 65536 + (((o - 55296) << 10) | (n - 56320));
                        } else o && (e -= 3) > -1 && i.push(239, 191, 189);
                        if (((o = null), n < 128)) {
                            if ((e -= 1) < 0) break;
                            i.push(n);
                        } else if (n < 2048) {
                            if ((e -= 2) < 0) break;
                            i.push((n >> 6) | 192, (63 & n) | 128);
                        } else if (n < 65536) {
                            if ((e -= 3) < 0) break;
                            i.push(
                                (n >> 12) | 224,
                                ((n >> 6) & 63) | 128,
                                (63 & n) | 128
                            );
                        } else {
                            if (!(n < 1114112))
                                throw new Error('Invalid code point');
                            if ((e -= 4) < 0) break;
                            i.push(
                                (n >> 18) | 240,
                                ((n >> 12) & 63) | 128,
                                ((n >> 6) & 63) | 128,
                                (63 & n) | 128
                            );
                        }
                    }
                    return i;
                }
                function H(t) {
                    return r.toByteArray(
                        (function (t) {
                            if (
                                (t = (function (t) {
                                    return t.trim
                                        ? t.trim()
                                        : t.replace(/^\s+|\s+$/g, '');
                                })(t).replace(D, '')).length < 2
                            )
                                return '';
                            for (; t.length % 4 != 0; ) t += '=';
                            return t;
                        })(t)
                    );
                }
                function j(t, e, n, r) {
                    for (
                        var o = 0;
                        o < r && !(o + n >= e.length || o >= t.length);
                        ++o
                    )
                        e[o + n] = t[o];
                    return o;
                }
            }.call(this, n(15)));
        },
        function (t, e, n) {
            var r = n(42),
                o = n(12);
            t.exports = function (t) {
                var e = t.xdomain,
                    n = t.xscheme,
                    i = t.enablesXDR;
                try {
                    if ('undefined' != typeof XMLHttpRequest && (!e || r))
                        return new XMLHttpRequest();
                } catch (t) {}
                try {
                    if ('undefined' != typeof XDomainRequest && !n && i)
                        return new XDomainRequest();
                } catch (t) {}
                if (!e)
                    try {
                        return new o[['Active'].concat('Object').join('X')](
                            'Microsoft.XMLHTTP'
                        );
                    } catch (t) {}
            };
        },
        function (t, e) {
            t.exports =
                'undefined' != typeof self
                    ? self
                    : 'undefined' != typeof window
                    ? window
                    : Function('return this')();
        },
        function (t, e, n) {
            var r = n(1),
                o = n(14);
            function i(t) {
                (this.path = t.path),
                    (this.hostname = t.hostname),
                    (this.port = t.port),
                    (this.secure = t.secure),
                    (this.query = t.query),
                    (this.timestampParam = t.timestampParam),
                    (this.timestampRequests = t.timestampRequests),
                    (this.readyState = ''),
                    (this.agent = t.agent || !1),
                    (this.socket = t.socket),
                    (this.enablesXDR = t.enablesXDR),
                    (this.withCredentials = t.withCredentials),
                    (this.pfx = t.pfx),
                    (this.key = t.key),
                    (this.passphrase = t.passphrase),
                    (this.cert = t.cert),
                    (this.ca = t.ca),
                    (this.ciphers = t.ciphers),
                    (this.rejectUnauthorized = t.rejectUnauthorized),
                    (this.forceNode = t.forceNode),
                    (this.isReactNative = t.isReactNative),
                    (this.extraHeaders = t.extraHeaders),
                    (this.localAddress = t.localAddress);
            }
            (t.exports = i),
                o(i.prototype),
                (i.prototype.onError = function (t, e) {
                    var n = new Error(t);
                    return (
                        (n.type = 'TransportError'),
                        (n.description = e),
                        this.emit('error', n),
                        this
                    );
                }),
                (i.prototype.open = function () {
                    return (
                        ('closed' !== this.readyState &&
                            '' !== this.readyState) ||
                            ((this.readyState = 'opening'), this.doOpen()),
                        this
                    );
                }),
                (i.prototype.close = function () {
                    return (
                        ('opening' !== this.readyState &&
                            'open' !== this.readyState) ||
                            (this.doClose(), this.onClose()),
                        this
                    );
                }),
                (i.prototype.send = function (t) {
                    if ('open' !== this.readyState)
                        throw new Error('Transport not open');
                    this.write(t);
                }),
                (i.prototype.onOpen = function () {
                    (this.readyState = 'open'),
                        (this.writable = !0),
                        this.emit('open');
                }),
                (i.prototype.onData = function (t) {
                    var e = r.decodePacket(t, this.socket.binaryType);
                    this.onPacket(e);
                }),
                (i.prototype.onPacket = function (t) {
                    this.emit('packet', t);
                }),
                (i.prototype.onClose = function () {
                    (this.readyState = 'closed'), this.emit('close');
                });
        },
        function (t, e, n) {
            function r(t) {
                if (t)
                    return (function (t) {
                        for (var e in r.prototype) t[e] = r.prototype[e];
                        return t;
                    })(t);
            }
            (t.exports = r),
                (r.prototype.on = r.prototype.addEventListener = function (
                    t,
                    e
                ) {
                    return (
                        (this._callbacks = this._callbacks || {}),
                        (this._callbacks['$' + t] =
                            this._callbacks['$' + t] || []).push(e),
                        this
                    );
                }),
                (r.prototype.once = function (t, e) {
                    function n() {
                        this.off(t, n), e.apply(this, arguments);
                    }
                    return (n.fn = e), this.on(t, n), this;
                }),
                (r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function (
                    t,
                    e
                ) {
                    if (
                        ((this._callbacks = this._callbacks || {}),
                        0 == arguments.length)
                    )
                        return (this._callbacks = {}), this;
                    var n,
                        r = this._callbacks['$' + t];
                    if (!r) return this;
                    if (1 == arguments.length)
                        return delete this._callbacks['$' + t], this;
                    for (var o = 0; o < r.length; o++)
                        if ((n = r[o]) === e || n.fn === e) {
                            r.splice(o, 1);
                            break;
                        }
                    return (
                        0 === r.length && delete this._callbacks['$' + t], this
                    );
                }),
                (r.prototype.emit = function (t) {
                    this._callbacks = this._callbacks || {};
                    for (
                        var e = new Array(arguments.length - 1),
                            n = this._callbacks['$' + t],
                            r = 1;
                        r < arguments.length;
                        r++
                    )
                        e[r - 1] = arguments[r];
                    if (n) {
                        r = 0;
                        for (var o = (n = n.slice(0)).length; r < o; ++r)
                            n[r].apply(this, e);
                    }
                    return this;
                }),
                (r.prototype.listeners = function (t) {
                    return (
                        (this._callbacks = this._callbacks || {}),
                        this._callbacks['$' + t] || []
                    );
                }),
                (r.prototype.hasListeners = function (t) {
                    return !!this.listeners(t).length;
                });
        },
        function (t, e) {
            var n;
            n = (function () {
                return this;
            })();
            try {
                n = n || new Function('return this')();
            } catch (t) {
                'object' == typeof window && (n = window);
            }
            t.exports = n;
        },
        function (t, e) {
            var n = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
                r = [
                    'source',
                    'protocol',
                    'authority',
                    'userInfo',
                    'user',
                    'password',
                    'host',
                    'port',
                    'relative',
                    'path',
                    'directory',
                    'file',
                    'query',
                    'anchor'
                ];
            t.exports = function (t) {
                var e = t,
                    o = t.indexOf('['),
                    i = t.indexOf(']');
                -1 != o &&
                    -1 != i &&
                    (t =
                        t.substring(0, o) +
                        t.substring(o, i).replace(/:/g, ';') +
                        t.substring(i, t.length));
                for (var s = n.exec(t || ''), a = {}, c = 14; c--; )
                    a[r[c]] = s[c] || '';
                return (
                    -1 != o &&
                        -1 != i &&
                        ((a.source = e),
                        (a.host = a.host
                            .substring(1, a.host.length - 1)
                            .replace(/;/g, ':')),
                        (a.authority = a.authority
                            .replace('[', '')
                            .replace(']', '')
                            .replace(/;/g, ':')),
                        (a.ipv6uri = !0)),
                    a
                );
            };
        },
        function (t, e) {
            var n = {}.toString;
            t.exports =
                Array.isArray ||
                function (t) {
                    return '[object Array]' == n.call(t);
                };
        },
        function (t, e, n) {
            (function (e) {
                t.exports = function (t) {
                    return (
                        (n && e.isBuffer(t)) ||
                        (r &&
                            (t instanceof ArrayBuffer ||
                                (function (t) {
                                    return 'function' ==
                                        typeof ArrayBuffer.isView
                                        ? ArrayBuffer.isView(t)
                                        : t.buffer instanceof ArrayBuffer;
                                })(t)))
                    );
                };
                var n =
                        'function' == typeof e &&
                        'function' == typeof e.isBuffer,
                    r = 'function' == typeof ArrayBuffer;
            }.call(this, n(10).Buffer));
        },
        function (t, e, n) {
            var r = n(40),
                o = n(25),
                i = n(9),
                s = n(8),
                a = n(26),
                c = n(27),
                l = n(2)('socket.io-client:manager'),
                u = n(24),
                h = n(57),
                f = Object.prototype.hasOwnProperty;
            function p(t, e) {
                if (!(this instanceof p)) return new p(t, e);
                t && 'object' == typeof t && ((e = t), (t = void 0)),
                    ((e = e || {}).path = e.path || '/socket.io'),
                    (this.nsps = {}),
                    (this.subs = []),
                    (this.opts = e),
                    this.reconnection(!1 !== e.reconnection),
                    this.reconnectionAttempts(e.reconnectionAttempts || 1 / 0),
                    this.reconnectionDelay(e.reconnectionDelay || 1e3),
                    this.reconnectionDelayMax(e.reconnectionDelayMax || 5e3),
                    this.randomizationFactor(e.randomizationFactor || 0.5),
                    (this.backoff = new h({
                        min: this.reconnectionDelay(),
                        max: this.reconnectionDelayMax(),
                        jitter: this.randomizationFactor()
                    })),
                    this.timeout(null == e.timeout ? 2e4 : e.timeout),
                    (this.readyState = 'closed'),
                    (this.uri = t),
                    (this.connecting = []),
                    (this.lastPing = null),
                    (this.encoding = !1),
                    (this.packetBuffer = []);
                var n = e.parser || s;
                (this.encoder = new n.Encoder()),
                    (this.decoder = new n.Decoder()),
                    (this.autoConnect = !1 !== e.autoConnect),
                    this.autoConnect && this.open();
            }
            (t.exports = p),
                (p.prototype.emitAll = function () {
                    for (var t in (this.emit.apply(this, arguments), this.nsps))
                        f.call(this.nsps, t) &&
                            this.nsps[t].emit.apply(this.nsps[t], arguments);
                }),
                (p.prototype.updateSocketIds = function () {
                    for (var t in this.nsps)
                        f.call(this.nsps, t) &&
                            (this.nsps[t].id = this.generateId(t));
                }),
                (p.prototype.generateId = function (t) {
                    return ('/' === t ? '' : t + '#') + this.engine.id;
                }),
                i(p.prototype),
                (p.prototype.reconnection = function (t) {
                    return arguments.length
                        ? ((this._reconnection = !!t), this)
                        : this._reconnection;
                }),
                (p.prototype.reconnectionAttempts = function (t) {
                    return arguments.length
                        ? ((this._reconnectionAttempts = t), this)
                        : this._reconnectionAttempts;
                }),
                (p.prototype.reconnectionDelay = function (t) {
                    return arguments.length
                        ? ((this._reconnectionDelay = t),
                          this.backoff && this.backoff.setMin(t),
                          this)
                        : this._reconnectionDelay;
                }),
                (p.prototype.randomizationFactor = function (t) {
                    return arguments.length
                        ? ((this._randomizationFactor = t),
                          this.backoff && this.backoff.setJitter(t),
                          this)
                        : this._randomizationFactor;
                }),
                (p.prototype.reconnectionDelayMax = function (t) {
                    return arguments.length
                        ? ((this._reconnectionDelayMax = t),
                          this.backoff && this.backoff.setMax(t),
                          this)
                        : this._reconnectionDelayMax;
                }),
                (p.prototype.timeout = function (t) {
                    return arguments.length
                        ? ((this._timeout = t), this)
                        : this._timeout;
                }),
                (p.prototype.maybeReconnectOnOpen = function () {
                    !this.reconnecting &&
                        this._reconnection &&
                        0 === this.backoff.attempts &&
                        this.reconnect();
                }),
                (p.prototype.open = p.prototype.connect = function (t, e) {
                    if (
                        (l('readyState %s', this.readyState),
                        ~this.readyState.indexOf('open'))
                    )
                        return this;
                    l('opening %s', this.uri),
                        (this.engine = r(this.uri, this.opts));
                    var n = this.engine,
                        o = this;
                    (this.readyState = 'opening'), (this.skipReconnect = !1);
                    var i = a(n, 'open', function () {
                            o.onopen(), t && t();
                        }),
                        s = a(n, 'error', function (e) {
                            if (
                                (l('connect_error'),
                                o.cleanup(),
                                (o.readyState = 'closed'),
                                o.emitAll('connect_error', e),
                                t)
                            ) {
                                var n = new Error('Connection error');
                                (n.data = e), t(n);
                            } else o.maybeReconnectOnOpen();
                        });
                    if (!1 !== this._timeout) {
                        var c = this._timeout;
                        l('connect attempt will timeout after %d', c);
                        var u = setTimeout(function () {
                            l('connect attempt timed out after %d', c),
                                i.destroy(),
                                n.close(),
                                n.emit('error', 'timeout'),
                                o.emitAll('connect_timeout', c);
                        }, c);
                        this.subs.push({
                            destroy: function () {
                                clearTimeout(u);
                            }
                        });
                    }
                    return this.subs.push(i), this.subs.push(s), this;
                }),
                (p.prototype.onopen = function () {
                    l('open'),
                        this.cleanup(),
                        (this.readyState = 'open'),
                        this.emit('open');
                    var t = this.engine;
                    this.subs.push(a(t, 'data', c(this, 'ondata'))),
                        this.subs.push(a(t, 'ping', c(this, 'onping'))),
                        this.subs.push(a(t, 'pong', c(this, 'onpong'))),
                        this.subs.push(a(t, 'error', c(this, 'onerror'))),
                        this.subs.push(a(t, 'close', c(this, 'onclose'))),
                        this.subs.push(
                            a(this.decoder, 'decoded', c(this, 'ondecoded'))
                        );
                }),
                (p.prototype.onping = function () {
                    (this.lastPing = new Date()), this.emitAll('ping');
                }),
                (p.prototype.onpong = function () {
                    this.emitAll('pong', new Date() - this.lastPing);
                }),
                (p.prototype.ondata = function (t) {
                    this.decoder.add(t);
                }),
                (p.prototype.ondecoded = function (t) {
                    this.emit('packet', t);
                }),
                (p.prototype.onerror = function (t) {
                    l('error', t), this.emitAll('error', t);
                }),
                (p.prototype.socket = function (t, e) {
                    var n = this.nsps[t];
                    if (!n) {
                        (n = new o(this, t, e)), (this.nsps[t] = n);
                        var r = this;
                        n.on('connecting', i),
                            n.on('connect', function () {
                                n.id = r.generateId(t);
                            }),
                            this.autoConnect && i();
                    }
                    function i() {
                        ~u(r.connecting, n) || r.connecting.push(n);
                    }
                    return n;
                }),
                (p.prototype.destroy = function (t) {
                    var e = u(this.connecting, t);
                    ~e && this.connecting.splice(e, 1),
                        this.connecting.length || this.close();
                }),
                (p.prototype.packet = function (t) {
                    l('writing packet %j', t);
                    var e = this;
                    t.query && 0 === t.type && (t.nsp += '?' + t.query),
                        e.encoding
                            ? e.packetBuffer.push(t)
                            : ((e.encoding = !0),
                              this.encoder.encode(t, function (n) {
                                  for (var r = 0; r < n.length; r++)
                                      e.engine.write(n[r], t.options);
                                  (e.encoding = !1), e.processPacketQueue();
                              }));
                }),
                (p.prototype.processPacketQueue = function () {
                    if (this.packetBuffer.length > 0 && !this.encoding) {
                        var t = this.packetBuffer.shift();
                        this.packet(t);
                    }
                }),
                (p.prototype.cleanup = function () {
                    l('cleanup');
                    for (var t = this.subs.length, e = 0; e < t; e++) {
                        this.subs.shift().destroy();
                    }
                    (this.packetBuffer = []),
                        (this.encoding = !1),
                        (this.lastPing = null),
                        this.decoder.destroy();
                }),
                (p.prototype.close = p.prototype.disconnect = function () {
                    l('disconnect'),
                        (this.skipReconnect = !0),
                        (this.reconnecting = !1),
                        'opening' === this.readyState && this.cleanup(),
                        this.backoff.reset(),
                        (this.readyState = 'closed'),
                        this.engine && this.engine.close();
                }),
                (p.prototype.onclose = function (t) {
                    l('onclose'),
                        this.cleanup(),
                        this.backoff.reset(),
                        (this.readyState = 'closed'),
                        this.emit('close', t),
                        this._reconnection &&
                            !this.skipReconnect &&
                            this.reconnect();
                }),
                (p.prototype.reconnect = function () {
                    if (this.reconnecting || this.skipReconnect) return this;
                    var t = this;
                    if (this.backoff.attempts >= this._reconnectionAttempts)
                        l('reconnect failed'),
                            this.backoff.reset(),
                            this.emitAll('reconnect_failed'),
                            (this.reconnecting = !1);
                    else {
                        var e = this.backoff.duration();
                        l('will wait %dms before reconnect attempt', e),
                            (this.reconnecting = !0);
                        var n = setTimeout(function () {
                            t.skipReconnect ||
                                (l('attempting reconnect'),
                                t.emitAll(
                                    'reconnect_attempt',
                                    t.backoff.attempts
                                ),
                                t.emitAll('reconnecting', t.backoff.attempts),
                                t.skipReconnect ||
                                    t.open(function (e) {
                                        e
                                            ? (l('reconnect attempt error'),
                                              (t.reconnecting = !1),
                                              t.reconnect(),
                                              t.emitAll(
                                                  'reconnect_error',
                                                  e.data
                                              ))
                                            : (l('reconnect success'),
                                              t.onreconnect());
                                    }));
                        }, e);
                        this.subs.push({
                            destroy: function () {
                                clearTimeout(n);
                            }
                        });
                    }
                }),
                (p.prototype.onreconnect = function () {
                    var t = this.backoff.attempts;
                    (this.reconnecting = !1),
                        this.backoff.reset(),
                        this.updateSocketIds(),
                        this.emitAll('reconnect', t);
                });
        },
        function (t, e, n) {
            var r = n(11),
                o = n(43),
                i = n(53),
                s = n(54);
            (e.polling = function (t) {
                var e = !1,
                    n = !1,
                    s = !1 !== t.jsonp;
                if ('undefined' != typeof location) {
                    var a = 'https:' === location.protocol,
                        c = location.port;
                    c || (c = a ? 443 : 80),
                        (e = t.hostname !== location.hostname || c !== t.port),
                        (n = t.secure !== a);
                }
                if (
                    ((t.xdomain = e),
                    (t.xscheme = n),
                    'open' in new r(t) && !t.forceJSONP)
                )
                    return new o(t);
                if (!s) throw new Error('JSONP disabled');
                return new i(t);
            }),
                (e.websocket = s);
        },
        function (t, e, n) {
            var r = n(13),
                o = n(3),
                i = n(1),
                s = n(4),
                a = n(23),
                c = n(5)('engine.io-client:polling');
            t.exports = u;
            var l = null != new (n(11))({ xdomain: !1 }).responseType;
            function u(t) {
                var e = t && t.forceBase64;
                (l && !e) || (this.supportsBinary = !1), r.call(this, t);
            }
            s(u, r),
                (u.prototype.name = 'polling'),
                (u.prototype.doOpen = function () {
                    this.poll();
                }),
                (u.prototype.pause = function (t) {
                    var e = this;
                    function n() {
                        c('paused'), (e.readyState = 'paused'), t();
                    }
                    if (
                        ((this.readyState = 'pausing'),
                        this.polling || !this.writable)
                    ) {
                        var r = 0;
                        this.polling &&
                            (c('we are currently polling - waiting to pause'),
                            r++,
                            this.once('pollComplete', function () {
                                c('pre-pause polling complete'), --r || n();
                            })),
                            this.writable ||
                                (c(
                                    'we are currently writing - waiting to pause'
                                ),
                                r++,
                                this.once('drain', function () {
                                    c('pre-pause writing complete'), --r || n();
                                }));
                    } else n();
                }),
                (u.prototype.poll = function () {
                    c('polling'),
                        (this.polling = !0),
                        this.doPoll(),
                        this.emit('poll');
                }),
                (u.prototype.onData = function (t) {
                    var e = this;
                    c('polling got data %s', t);
                    i.decodePayload(t, this.socket.binaryType, function (
                        t,
                        n,
                        r
                    ) {
                        if (
                            ('opening' === e.readyState && e.onOpen(),
                            'close' === t.type)
                        )
                            return e.onClose(), !1;
                        e.onPacket(t);
                    }),
                        'closed' !== this.readyState &&
                            ((this.polling = !1),
                            this.emit('pollComplete'),
                            'open' === this.readyState
                                ? this.poll()
                                : c(
                                      'ignoring poll - transport state "%s"',
                                      this.readyState
                                  ));
                }),
                (u.prototype.doClose = function () {
                    var t = this;
                    function e() {
                        c('writing close packet'), t.write([{ type: 'close' }]);
                    }
                    'open' === this.readyState
                        ? (c('transport open - closing'), e())
                        : (c('transport not open - deferring close'),
                          this.once('open', e));
                }),
                (u.prototype.write = function (t) {
                    var e = this;
                    this.writable = !1;
                    var n = function () {
                        (e.writable = !0), e.emit('drain');
                    };
                    i.encodePayload(t, this.supportsBinary, function (t) {
                        e.doWrite(t, n);
                    });
                }),
                (u.prototype.uri = function () {
                    var t = this.query || {},
                        e = this.secure ? 'https' : 'http',
                        n = '';
                    return (
                        !1 !== this.timestampRequests &&
                            (t[this.timestampParam] = a()),
                        this.supportsBinary || t.sid || (t.b64 = 1),
                        (t = o.encode(t)),
                        this.port &&
                            (('https' === e && 443 !== Number(this.port)) ||
                                ('http' === e && 80 !== Number(this.port))) &&
                            (n = ':' + this.port),
                        t.length && (t = '?' + t),
                        e +
                            '://' +
                            (-1 !== this.hostname.indexOf(':')
                                ? '[' + this.hostname + ']'
                                : this.hostname) +
                            n +
                            this.path +
                            t
                    );
                });
        },
        function (t, e, n) {
            (function (e) {
                var r = n(45),
                    o = Object.prototype.toString,
                    i =
                        'function' == typeof Blob ||
                        ('undefined' != typeof Blob &&
                            '[object BlobConstructor]' === o.call(Blob)),
                    s =
                        'function' == typeof File ||
                        ('undefined' != typeof File &&
                            '[object FileConstructor]' === o.call(File));
                t.exports = function t(n) {
                    if (!n || 'object' != typeof n) return !1;
                    if (r(n)) {
                        for (var o = 0, a = n.length; o < a; o++)
                            if (t(n[o])) return !0;
                        return !1;
                    }
                    if (
                        ('function' == typeof e &&
                            e.isBuffer &&
                            e.isBuffer(n)) ||
                        ('function' == typeof ArrayBuffer &&
                            n instanceof ArrayBuffer) ||
                        (i && n instanceof Blob) ||
                        (s && n instanceof File)
                    )
                        return !0;
                    if (
                        n.toJSON &&
                        'function' == typeof n.toJSON &&
                        1 === arguments.length
                    )
                        return t(n.toJSON(), !0);
                    for (var c in n)
                        if (
                            Object.prototype.hasOwnProperty.call(n, c) &&
                            t(n[c])
                        )
                            return !0;
                    return !1;
                };
            }.call(this, n(10).Buffer));
        },
        function (t, e, n) {
            'use strict';
            var r,
                o = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(
                    ''
                ),
                i = {},
                s = 0,
                a = 0;
            function c(t) {
                var e = '';
                do {
                    (e = o[t % 64] + e), (t = Math.floor(t / 64));
                } while (t > 0);
                return e;
            }
            function l() {
                var t = c(+new Date());
                return t !== r ? ((s = 0), (r = t)) : t + '.' + c(s++);
            }
            for (; a < 64; a++) i[o[a]] = a;
            (l.encode = c),
                (l.decode = function (t) {
                    var e = 0;
                    for (a = 0; a < t.length; a++) e = 64 * e + i[t.charAt(a)];
                    return e;
                }),
                (t.exports = l);
        },
        function (t, e) {
            var n = [].indexOf;
            t.exports = function (t, e) {
                if (n) return t.indexOf(e);
                for (var r = 0; r < t.length; ++r) if (t[r] === e) return r;
                return -1;
            };
        },
        function (t, e, n) {
            var r = n(8),
                o = n(9),
                i = n(56),
                s = n(26),
                a = n(27),
                c = n(2)('socket.io-client:socket'),
                l = n(3),
                u = n(22);
            t.exports = p;
            var h = {
                    connect: 1,
                    connect_error: 1,
                    connect_timeout: 1,
                    connecting: 1,
                    disconnect: 1,
                    error: 1,
                    reconnect: 1,
                    reconnect_attempt: 1,
                    reconnect_failed: 1,
                    reconnect_error: 1,
                    reconnecting: 1,
                    ping: 1,
                    pong: 1
                },
                f = o.prototype.emit;
            function p(t, e, n) {
                (this.io = t),
                    (this.nsp = e),
                    (this.json = this),
                    (this.ids = 0),
                    (this.acks = {}),
                    (this.receiveBuffer = []),
                    (this.sendBuffer = []),
                    (this.connected = !1),
                    (this.disconnected = !0),
                    (this.flags = {}),
                    n && n.query && (this.query = n.query),
                    this.io.autoConnect && this.open();
            }
            o(p.prototype),
                (p.prototype.subEvents = function () {
                    if (!this.subs) {
                        var t = this.io;
                        this.subs = [
                            s(t, 'open', a(this, 'onopen')),
                            s(t, 'packet', a(this, 'onpacket')),
                            s(t, 'close', a(this, 'onclose'))
                        ];
                    }
                }),
                (p.prototype.open = p.prototype.connect = function () {
                    return (
                        this.connected ||
                            (this.subEvents(),
                            this.io.open(),
                            'open' === this.io.readyState && this.onopen(),
                            this.emit('connecting')),
                        this
                    );
                }),
                (p.prototype.send = function () {
                    var t = i(arguments);
                    return t.unshift('message'), this.emit.apply(this, t), this;
                }),
                (p.prototype.emit = function (t) {
                    if (h.hasOwnProperty(t))
                        return f.apply(this, arguments), this;
                    var e = i(arguments),
                        n = {
                            type: (
                                void 0 !== this.flags.binary
                                    ? this.flags.binary
                                    : u(e)
                            )
                                ? r.BINARY_EVENT
                                : r.EVENT,
                            data: e,
                            options: {}
                        };
                    return (
                        (n.options.compress =
                            !this.flags || !1 !== this.flags.compress),
                        'function' == typeof e[e.length - 1] &&
                            (c('emitting packet with ack id %d', this.ids),
                            (this.acks[this.ids] = e.pop()),
                            (n.id = this.ids++)),
                        this.connected
                            ? this.packet(n)
                            : this.sendBuffer.push(n),
                        (this.flags = {}),
                        this
                    );
                }),
                (p.prototype.packet = function (t) {
                    (t.nsp = this.nsp), this.io.packet(t);
                }),
                (p.prototype.onopen = function () {
                    if ((c('transport is open - connecting'), '/' !== this.nsp))
                        if (this.query) {
                            var t =
                                'object' == typeof this.query
                                    ? l.encode(this.query)
                                    : this.query;
                            c('sending connect packet with query %s', t),
                                this.packet({ type: r.CONNECT, query: t });
                        } else this.packet({ type: r.CONNECT });
                }),
                (p.prototype.onclose = function (t) {
                    c('close (%s)', t),
                        (this.connected = !1),
                        (this.disconnected = !0),
                        delete this.id,
                        this.emit('disconnect', t);
                }),
                (p.prototype.onpacket = function (t) {
                    var e = t.nsp === this.nsp,
                        n = t.type === r.ERROR && '/' === t.nsp;
                    if (e || n)
                        switch (t.type) {
                            case r.CONNECT:
                                this.onconnect();
                                break;
                            case r.EVENT:
                            case r.BINARY_EVENT:
                                this.onevent(t);
                                break;
                            case r.ACK:
                            case r.BINARY_ACK:
                                this.onack(t);
                                break;
                            case r.DISCONNECT:
                                this.ondisconnect();
                                break;
                            case r.ERROR:
                                this.emit('error', t.data);
                        }
                }),
                (p.prototype.onevent = function (t) {
                    var e = t.data || [];
                    c('emitting event %j', e),
                        null != t.id &&
                            (c('attaching ack callback to event'),
                            e.push(this.ack(t.id))),
                        this.connected
                            ? f.apply(this, e)
                            : this.receiveBuffer.push(e);
                }),
                (p.prototype.ack = function (t) {
                    var e = this,
                        n = !1;
                    return function () {
                        if (!n) {
                            n = !0;
                            var o = i(arguments);
                            c('sending ack %j', o),
                                e.packet({
                                    type: u(o) ? r.BINARY_ACK : r.ACK,
                                    id: t,
                                    data: o
                                });
                        }
                    };
                }),
                (p.prototype.onack = function (t) {
                    var e = this.acks[t.id];
                    'function' == typeof e
                        ? (c('calling ack %s with %j', t.id, t.data),
                          e.apply(this, t.data),
                          delete this.acks[t.id])
                        : c('bad ack %s', t.id);
                }),
                (p.prototype.onconnect = function () {
                    (this.connected = !0),
                        (this.disconnected = !1),
                        this.emit('connect'),
                        this.emitBuffered();
                }),
                (p.prototype.emitBuffered = function () {
                    var t;
                    for (t = 0; t < this.receiveBuffer.length; t++)
                        f.apply(this, this.receiveBuffer[t]);
                    for (
                        this.receiveBuffer = [], t = 0;
                        t < this.sendBuffer.length;
                        t++
                    )
                        this.packet(this.sendBuffer[t]);
                    this.sendBuffer = [];
                }),
                (p.prototype.ondisconnect = function () {
                    c('server disconnect (%s)', this.nsp),
                        this.destroy(),
                        this.onclose('io server disconnect');
                }),
                (p.prototype.destroy = function () {
                    if (this.subs) {
                        for (var t = 0; t < this.subs.length; t++)
                            this.subs[t].destroy();
                        this.subs = null;
                    }
                    this.io.destroy(this);
                }),
                (p.prototype.close = p.prototype.disconnect = function () {
                    return (
                        this.connected &&
                            (c('performing disconnect (%s)', this.nsp),
                            this.packet({ type: r.DISCONNECT })),
                        this.destroy(),
                        this.connected && this.onclose('io client disconnect'),
                        this
                    );
                }),
                (p.prototype.compress = function (t) {
                    return (this.flags.compress = t), this;
                }),
                (p.prototype.binary = function (t) {
                    return (this.flags.binary = t), this;
                });
        },
        function (t, e) {
            t.exports = function (t, e, n) {
                return (
                    t.on(e, n),
                    {
                        destroy: function () {
                            t.removeListener(e, n);
                        }
                    }
                );
            };
        },
        function (t, e) {
            var n = [].slice;
            t.exports = function (t, e) {
                if (
                    ('string' == typeof e && (e = t[e]), 'function' != typeof e)
                )
                    throw new Error('bind() requires a function');
                var r = n.call(arguments, 2);
                return function () {
                    return e.apply(t, r.concat(n.call(arguments)));
                };
            };
        },
        ,
        function (t, e) {
            var n = Object.freeze({
                __proto__: null,
                invariant: function (t, e) {
                    if (!t) throw new Error('Invariant Violation: ' + e);
                },
                isTrue: function (t, e) {
                    if (!t) throw new Error('Assert Violation: ' + e);
                },
                isFalse: function (t, e) {
                    if (t) throw new Error('Assert Violation: ' + e);
                },
                fail: function (t) {
                    throw new Error(t);
                }
            });
            const {
                    assign: r,
                    create: o,
                    defineProperties: i,
                    defineProperty: s,
                    freeze: a,
                    getOwnPropertyDescriptor: c,
                    getOwnPropertyNames: l,
                    getPrototypeOf: u,
                    hasOwnProperty: h,
                    isFrozen: f,
                    keys: p,
                    seal: d,
                    setPrototypeOf: g
                } = Object,
                { isArray: y } = Array,
                {
                    filter: m,
                    find: b,
                    indexOf: v,
                    join: w,
                    map: C,
                    push: E,
                    reduce: T,
                    reverse: A,
                    slice: N,
                    splice: S,
                    unshift: k,
                    forEach: R
                } = Array.prototype,
                {
                    charCodeAt: F,
                    replace: B,
                    slice: _,
                    toLowerCase: L
                } = String.prototype;
            function x(t) {
                return void 0 === t;
            }
            function O(t) {
                return null === t;
            }
            function P(t) {
                return !0 === t;
            }
            function M(t) {
                return !1 === t;
            }
            function I(t) {
                return 'function' == typeof t;
            }
            const D = {}.toString;
            function $(t) {
                return t && t.toString
                    ? y(t)
                        ? w.call(C.call(t, $), ',')
                        : t.toString()
                    : 'object' == typeof t
                    ? D.call(t)
                    : t + U;
            }
            const U = '',
                H = o(null),
                j = o(null);
            R.call(
                [
                    'ariaActiveDescendant',
                    'ariaAtomic',
                    'ariaAutoComplete',
                    'ariaBusy',
                    'ariaChecked',
                    'ariaColCount',
                    'ariaColIndex',
                    'ariaColSpan',
                    'ariaControls',
                    'ariaCurrent',
                    'ariaDescribedBy',
                    'ariaDetails',
                    'ariaDisabled',
                    'ariaErrorMessage',
                    'ariaExpanded',
                    'ariaFlowTo',
                    'ariaHasPopup',
                    'ariaHidden',
                    'ariaInvalid',
                    'ariaKeyShortcuts',
                    'ariaLabel',
                    'ariaLabelledBy',
                    'ariaLevel',
                    'ariaLive',
                    'ariaModal',
                    'ariaMultiLine',
                    'ariaMultiSelectable',
                    'ariaOrientation',
                    'ariaOwns',
                    'ariaPlaceholder',
                    'ariaPosInSet',
                    'ariaPressed',
                    'ariaReadOnly',
                    'ariaRelevant',
                    'ariaRequired',
                    'ariaRoleDescription',
                    'ariaRowCount',
                    'ariaRowIndex',
                    'ariaRowSpan',
                    'ariaSelected',
                    'ariaSetSize',
                    'ariaSort',
                    'ariaValueMax',
                    'ariaValueMin',
                    'ariaValueNow',
                    'ariaValueText',
                    'role'
                ],
                (t) => {
                    const e = L.call(B.call(t, /^aria/, 'aria-'));
                    (H[e] = t), (j[t] = e);
                }
            );
            !(function () {
                if ('object' == typeof globalThis) return globalThis;
                let t;
                try {
                    Object.defineProperty(Object.prototype, '__magic__', {
                        get: function () {
                            return this;
                        },
                        configurable: !0
                    }),
                        (t = __magic__),
                        delete Object.prototype.__magic__;
                } catch (t) {
                } finally {
                    void 0 === t && (t = window);
                }
            })();
            const q = 'Symbol(x)' === Symbol('x').toString();
            function Y(t, e) {
                return q ? Symbol(t) : `$$lwc-${e}-${t}$$`;
            }
            const z = new WeakMap();
            function W(t, e, n) {
                let r = z.get(t);
                x(r) && ((r = o(null)), z.set(t, r)), (r[e] = n);
            }
            function X(t, e) {
                const n = z.get(t);
                if (!x(n)) return n[e];
            }
            p({
                accesskey: 'accessKey',
                readonly: 'readOnly',
                tabindex: 'tabIndex',
                bgcolor: 'bgColor',
                colspan: 'colSpan',
                rowspan: 'rowSpan',
                contenteditable: 'contentEditable',
                crossorigin: 'crossOrigin',
                datetime: 'dateTime',
                formaction: 'formAction',
                ismap: 'isMap',
                maxlength: 'maxLength',
                minlength: 'minLength',
                novalidate: 'noValidate',
                usemap: 'useMap',
                for: 'htmlFor'
            }).forEach((t) => {});
            const {
                    DOCUMENT_POSITION_CONTAINED_BY: K,
                    DOCUMENT_POSITION_CONTAINS: V,
                    DOCUMENT_POSITION_PRECEDING: J,
                    DOCUMENT_POSITION_FOLLOWING: G,
                    ELEMENT_NODE: Z,
                    TEXT_NODE: Q,
                    CDATA_SECTION_NODE: tt,
                    PROCESSING_INSTRUCTION_NODE: et,
                    COMMENT_NODE: nt,
                    DOCUMENT_FRAGMENT_NODE: rt
                } = Node,
                {
                    appendChild: ot,
                    cloneNode: it,
                    compareDocumentPosition: st,
                    insertBefore: at,
                    removeChild: ct,
                    replaceChild: lt,
                    hasChildNodes: ut
                } = Node.prototype,
                { contains: ht } = HTMLElement.prototype,
                ft = c(Node.prototype, 'firstChild').get,
                pt = c(Node.prototype, 'lastChild').get,
                dt = c(Node.prototype, 'textContent').get,
                gt = c(Node.prototype, 'parentNode').get,
                yt = c(Node.prototype, 'ownerDocument').get,
                mt = h.call(Node.prototype, 'parentElement')
                    ? c(Node.prototype, 'parentElement').get
                    : c(HTMLElement.prototype, 'parentElement').get,
                bt = c(Node.prototype, 'textContent').set,
                vt = h.call(Node.prototype, 'childNodes')
                    ? c(Node.prototype, 'childNodes').get
                    : c(HTMLElement.prototype, 'childNodes').get,
                wt = h.call(Node.prototype, 'isConnected')
                    ? c(Node.prototype, 'isConnected').get
                    : function () {
                          const t = yt.call(this);
                          return null === t || 0 != (st.call(t, this) & K);
                      },
                {
                    addEventListener: Ct,
                    getAttribute: Et,
                    getBoundingClientRect: Tt,
                    getElementsByTagName: At,
                    getElementsByTagNameNS: Nt,
                    hasAttribute: St,
                    querySelector: kt,
                    querySelectorAll: Rt,
                    removeAttribute: Ft,
                    removeEventListener: Bt,
                    setAttribute: _t
                } = Element.prototype,
                Lt = h.call(Element.prototype, 'attachShadow')
                    ? Element.prototype.attachShadow
                    : () => {
                          throw new TypeError(
                              'attachShadow() is not supported in current browser. Load the @lwc/synthetic-shadow polyfill and use Lightning Web Components'
                          );
                      },
                xt = c(Element.prototype, 'childElementCount').get,
                Ot = c(Element.prototype, 'firstElementChild').get,
                Pt = c(Element.prototype, 'lastElementChild').get,
                Mt = h.call(Element.prototype, 'innerHTML')
                    ? c(Element.prototype, 'innerHTML')
                    : c(HTMLElement.prototype, 'innerHTML'),
                It = Mt.get,
                Dt = Mt.set,
                $t = h.call(Element.prototype, 'outerHTML')
                    ? c(Element.prototype, 'outerHTML')
                    : c(HTMLElement.prototype, 'outerHTML'),
                Ut = $t.get,
                Ht = $t.set,
                jt = c(Element.prototype, 'tagName').get,
                qt = c(HTMLElement.prototype, 'tabIndex'),
                Yt = qt.get,
                zt = qt.set,
                Wt = h.call(Element.prototype, 'matches')
                    ? Element.prototype.matches
                    : Element.prototype.msMatchesSelector,
                Xt = h.call(Element.prototype, 'children')
                    ? c(Element.prototype, 'children').get
                    : c(HTMLElement.prototype, 'children').get,
                { getElementsByClassName: Kt } = HTMLElement.prototype,
                Vt = h.call(Element.prototype, 'shadowRoot')
                    ? c(Element.prototype, 'shadowRoot').get
                    : () => null;
            let Jt, Gt;
            'undefined' != typeof HTMLSlotElement
                ? ((Jt = HTMLSlotElement.prototype.assignedNodes),
                  (Gt = HTMLSlotElement.prototype.assignedElements))
                : ((Jt = () => {
                      throw new TypeError(
                          "assignedNodes() is not supported in current browser. Load the @lwc/synthetic-shadow polyfill to start using <slot> elements in your Lightning Web Component's template"
                      );
                  }),
                  (Gt = () => {
                      throw new TypeError(
                          "assignedElements() is not supported in current browser. Load the @lwc/synthetic-shadow polyfill to start using <slot> elements in your Lightning Web Component's template"
                      );
                  }));
            const Zt =
                    'EventTarget' in window
                        ? EventTarget.prototype.dispatchEvent
                        : Node.prototype.dispatchEvent,
                Qt = c(Event.prototype, 'target').get,
                te = c(Event.prototype, 'currentTarget').get,
                ee = c(FocusEvent.prototype, 'relatedTarget').get,
                ne = c(Document.prototype, 'activeElement').get,
                re = h.call(Document.prototype, 'elementFromPoint')
                    ? Document.prototype.elementFromPoint
                    : Document.prototype.msElementFromPoint,
                oe = c(Document.prototype, 'defaultView').get,
                {
                    createComment: ie,
                    querySelectorAll: se,
                    getElementById: ae,
                    getElementsByClassName: ce,
                    getElementsByTagName: le,
                    getElementsByTagNameNS: ue
                } = Document.prototype,
                { getElementsByName: he } = HTMLDocument.prototype,
                { addEventListener: fe, removeEventListener: pe } = window,
                de = MutationObserver,
                ge = de.prototype.observe;
            const { createElement: ye } = Document.prototype;
            'undefined' == typeof HTMLSlotElement &&
                (function () {
                    class t {}
                    g(t, HTMLElement.constructor),
                        g(t.prototype, HTMLElement.prototype),
                        (Window.prototype.HTMLSlotElement = t),
                        s(Document.prototype, 'createElement', {
                            value: function (e, n) {
                                const r = ye.apply(this, N.call(arguments));
                                return (
                                    4 === e.length &&
                                        115 === F.call(e, 0) &&
                                        108 === F.call(e, 1) &&
                                        111 === F.call(e, 2) &&
                                        116 === F.call(e, 3) &&
                                        g(r, t.prototype),
                                    r
                                );
                            }
                        });
                })();
            const {
                    assign: me,
                    create: be,
                    defineProperties: ve,
                    defineProperty: we,
                    freeze: Ce,
                    getOwnPropertyDescriptor: Ee,
                    getOwnPropertyNames: Te,
                    getPrototypeOf: Ae,
                    hasOwnProperty: Ne,
                    isFrozen: Se,
                    keys: ke,
                    seal: Re,
                    setPrototypeOf: Fe
                } = Object,
                {
                    filter: Be,
                    find: _e,
                    indexOf: Le,
                    join: xe,
                    map: Oe,
                    push: Pe,
                    reduce: Me,
                    reverse: Ie,
                    slice: De,
                    splice: $e,
                    unshift: Ue,
                    forEach: He
                } = Array.prototype,
                {
                    charCodeAt: je,
                    replace: qe,
                    slice: Ye,
                    toLowerCase: ze
                } = String.prototype,
                We = be(null),
                Xe = be(null);
            He.call(
                [
                    'ariaActiveDescendant',
                    'ariaAtomic',
                    'ariaAutoComplete',
                    'ariaBusy',
                    'ariaChecked',
                    'ariaColCount',
                    'ariaColIndex',
                    'ariaColSpan',
                    'ariaControls',
                    'ariaCurrent',
                    'ariaDescribedBy',
                    'ariaDetails',
                    'ariaDisabled',
                    'ariaErrorMessage',
                    'ariaExpanded',
                    'ariaFlowTo',
                    'ariaHasPopup',
                    'ariaHidden',
                    'ariaInvalid',
                    'ariaKeyShortcuts',
                    'ariaLabel',
                    'ariaLabelledBy',
                    'ariaLevel',
                    'ariaLive',
                    'ariaModal',
                    'ariaMultiLine',
                    'ariaMultiSelectable',
                    'ariaOrientation',
                    'ariaOwns',
                    'ariaPlaceholder',
                    'ariaPosInSet',
                    'ariaPressed',
                    'ariaReadOnly',
                    'ariaRelevant',
                    'ariaRequired',
                    'ariaRoleDescription',
                    'ariaRowCount',
                    'ariaRowIndex',
                    'ariaRowSpan',
                    'ariaSelected',
                    'ariaSetSize',
                    'ariaSort',
                    'ariaValueMax',
                    'ariaValueMin',
                    'ariaValueNow',
                    'ariaValueText',
                    'role'
                ],
                (t) => {
                    const e = ze.call(qe.call(t, /^aria/, 'aria-'));
                    (We[e] = t), (Xe[t] = e);
                }
            );
            const Ke = (function () {
                if ('object' == typeof globalThis) return globalThis;
                let t;
                try {
                    Object.defineProperty(Object.prototype, '__magic__', {
                        get: function () {
                            return this;
                        },
                        configurable: !0
                    }),
                        (t = __magic__),
                        delete Object.prototype.__magic__;
                } catch (t) {
                } finally {
                    void 0 === t && (t = window);
                }
                return t;
            })();
            Symbol('x').toString();
            ke({
                accesskey: 'accessKey',
                readonly: 'readOnly',
                tabindex: 'tabIndex',
                bgcolor: 'bgColor',
                colspan: 'colSpan',
                rowspan: 'rowSpan',
                contenteditable: 'contentEditable',
                crossorigin: 'crossOrigin',
                datetime: 'dateTime',
                formaction: 'formAction',
                ismap: 'isMap',
                maxlength: 'maxLength',
                minlength: 'minLength',
                novalidate: 'noValidate',
                usemap: 'useMap',
                for: 'htmlFor'
            }).forEach((t) => {}),
                Ke.lwcRuntimeFlags ||
                    Object.defineProperty(Ke, 'lwcRuntimeFlags', {
                        value: be(null)
                    });
            const Ve = Ke.lwcRuntimeFlags;
            function Je(t) {
                const e = yt.call(t);
                return null === e ? t : e;
            }
            function Ge(t) {
                const e = Je(t),
                    n = oe.call(e);
                if (null === n) throw new TypeError();
                return n;
            }
            let Ze;
            function Qe(t) {
                if (x(Ze)) {
                    const e = Je(t);
                    Ze =
                        e.body &&
                        'temporary-bypass' ===
                            Et.call(e.body, 'data-global-patching-bypass');
                }
                return P(Ze);
            }
            function tn(t) {
                const e = t.length,
                    n = [];
                if (e > 0) for (let r = 0; r < e; r++) n[r] = t[r];
                return n;
            }
            function en(t, e) {
                const n = [];
                let r = t;
                const o = t instanceof Window ? t : t.getRootNode();
                for (; !O(r); )
                    if ((n.push(r), r instanceof Element)) {
                        const t = r.assignedSlot;
                        r = O(t) ? r.parentNode : t;
                    } else
                        r =
                            r instanceof ShadowRoot && (e || r !== o)
                                ? r.host
                                : r instanceof Node
                                ? r.parentNode
                                : null;
                let i;
                return (
                    (i = t instanceof Window ? t.document : Je(t)),
                    n[n.length - 1] === i && n.push(window),
                    n
                );
            }
            function nn(t, e) {
                if (O(t)) return null;
                const n = en(t, !0),
                    r = e;
                for (let t, e, o, i, s = 0; s < r.length; s++)
                    if (
                        ((t = r[s]),
                        (o = t instanceof Window ? t : t.getRootNode()),
                        o !== e && ((i = n.indexOf(o)), (e = o)),
                        !(o instanceof Vn) || (!x(i) && i > -1))
                    )
                        return t;
                return null;
            }
            var rn;
            !(function (t) {
                (t[(t.CUSTOM_ELEMENT_LISTENER = 1)] =
                    'CUSTOM_ELEMENT_LISTENER'),
                    (t[(t.SHADOW_ROOT_LISTENER = 2)] = 'SHADOW_ROOT_LISTENER');
            })(rn || (rn = {}));
            const on = new WeakMap();
            function sn(t, e) {
                return !!(st.call(t, e) & K);
            }
            const an = { composed: !1 };
            function cn(t, e) {
                let n = t.getRootNode(e);
                return 'mode' in n && 'delegatesFocus' in n && (n = qn(n)), n;
            }
            function ln() {
                const t = te.call(this),
                    e = Qt.call(this),
                    n = en(e, this.composed),
                    r = Je(e);
                if (!(t instanceof Node))
                    return O(t) && x(lr(e)) ? e : nn(r, n);
                if (t === r || t === r.body) return x(lr(e)) ? e : nn(r, n);
                return nn(
                    on.get(this) === rn.SHADOW_ROOT_LISTENER ? Yn(t) : t,
                    n
                );
            }
            function un() {
                const t = Qt.call(this);
                return O(te.call(this)) ? [] : en(t, this.composed);
            }
            function hn(t) {
                if (on.has(t)) return;
                i(t, {
                    target: { get: ln, enumerable: !0, configurable: !0 },
                    composedPath: {
                        value: un,
                        writable: !0,
                        enumerable: !0,
                        configurable: !0
                    },
                    srcElement: { get: ln, enumerable: !0, configurable: !0 },
                    path: { get: un, enumerable: !0, configurable: !0 }
                });
                const e = (function (t, e) {
                    do {
                        const n = c(t, e);
                        if (!x(n)) return n;
                        t = u(t);
                    } while (null !== t);
                })(t, 'relatedTarget');
                if (!x(e)) {
                    const n = e.get;
                    s(t, 'relatedTarget', {
                        get() {
                            const t = on.get(this),
                                e = te.call(this),
                                r = n.call(this);
                            if (O(r)) return null;
                            return nn(
                                t === rn.SHADOW_ROOT_LISTENER ? Yn(e) : e,
                                en(r, !0)
                            );
                        },
                        enumerable: !0,
                        configurable: !0
                    });
                }
                on.set(t, 0);
            }
            const fn = new WeakMap();
            function pn(t) {
                let e = fn.get(t);
                return x(e) && ((e = o(null)), fn.set(t, e)), e;
            }
            const dn = new WeakMap();
            function gn(t, e) {
                if (!I(e)) throw new TypeError();
                let n = dn.get(e);
                return (
                    x(n) &&
                        ((n = function (n) {
                            const { composed: r } = n,
                                o = Qt.call(n),
                                i = te.call(n);
                            if (o !== i) {
                                const s = cn(o, { composed: r });
                                (sn(s, i) || (!1 === r && s === i)) &&
                                    e.call(t, n);
                            }
                        }),
                        (n.placement = rn.SHADOW_ROOT_LISTENER),
                        (n.original = e),
                        dn.set(e, n)),
                    n
                );
            }
            const yn = new WeakMap();
            function mn(t, e) {
                if (!I(e)) throw new TypeError();
                let n = yn.get(e);
                return (
                    x(n) &&
                        ((n = function (n) {
                            (function (t) {
                                const e = Qt.call(t),
                                    n = te.call(t),
                                    { composed: r } = t;
                                return !0 === r || e === n || sn(cn(e, an), n);
                            })(n) && e.call(t, n);
                        }),
                        (n.placement = rn.CUSTOM_ELEMENT_LISTENER),
                        (n.original = e),
                        yn.set(e, n)),
                    n
                );
            }
            function bn(t) {
                hn(t);
                let e = !1,
                    n = !1;
                const {
                        type: r,
                        stopImmediatePropagation: o,
                        stopPropagation: i
                    } = t,
                    a = pn(te.call(t))[r];
                s(t, 'stopImmediatePropagation', {
                    value() {
                        (e = !0), o.call(t);
                    },
                    writable: !0,
                    enumerable: !0,
                    configurable: !0
                }),
                    s(t, 'stopPropagation', {
                        value() {
                            (n = !0), i.call(t);
                        },
                        writable: !0,
                        enumerable: !0,
                        configurable: !0
                    });
                const c = N.call(a);
                function l(n) {
                    R.call(c, (r) => {
                        M(e) &&
                            r.placement === n &&
                            -1 !== v.call(a, r) &&
                            r.call(void 0, t);
                    });
                }
                on.set(t, rn.SHADOW_ROOT_LISTENER),
                    l(rn.SHADOW_ROOT_LISTENER),
                    M(e) &&
                        M(n) &&
                        (on.set(t, rn.CUSTOM_ELEMENT_LISTENER),
                        l(rn.CUSTOM_ELEMENT_LISTENER)),
                    on.set(t, 0);
            }
            function vn(t, e, n) {
                const r = pn(t);
                let o = r[e];
                x(o) && (o = r[e] = []),
                    0 === o.length && Ct.call(t, e, bn),
                    E.call(o, n);
            }
            function wn(t, e, n) {
                let r, o;
                x((o = pn(t)[e])) ||
                    -1 === (r = v.call(o, n)) ||
                    (S.call(o, r, 1), 0 === o.length && Bt.call(t, e, bn));
            }
            function Cn(t) {
                switch (t.nodeType) {
                    case Z: {
                        const e = sr(t);
                        let n = '';
                        for (let t = 0, r = e.length; t < r; t += 1) {
                            const r = e[t];
                            r.nodeType !== nt && (n += Cn(r));
                        }
                        return n;
                    }
                    default:
                        return t.nodeValue;
                }
            }
            const En = Y('StaticNodeListItems', 'synthetic-shadow');
            function Tn() {
                throw new TypeError('Illegal constructor');
            }
            function An(t) {
                const e = o(Tn.prototype);
                return (
                    W(e, En, t),
                    R.call(t, (t, n) => {
                        s(e, n, { value: t, enumerable: !0, configurable: !0 });
                    }),
                    e
                );
            }
            (Tn.prototype = o(NodeList.prototype, {
                constructor: { writable: !0, configurable: !0, value: Tn },
                item: {
                    writable: !0,
                    enumerable: !0,
                    configurable: !0,
                    value(t) {
                        return this[t];
                    }
                },
                length: {
                    enumerable: !0,
                    configurable: !0,
                    get() {
                        return X(this, En).length;
                    }
                },
                forEach: {
                    writable: !0,
                    enumerable: !0,
                    configurable: !0,
                    value(t, e) {
                        R.call(X(this, En), t, e);
                    }
                },
                entries: {
                    writable: !0,
                    enumerable: !0,
                    configurable: !0,
                    value() {
                        return C.call(X(this, En), (t, e) => [e, t]);
                    }
                },
                keys: {
                    writable: !0,
                    enumerable: !0,
                    configurable: !0,
                    value() {
                        return C.call(X(this, En), (t, e) => e);
                    }
                },
                values: {
                    writable: !0,
                    enumerable: !0,
                    configurable: !0,
                    value() {
                        return X(this, En);
                    }
                },
                [Symbol.iterator]: {
                    writable: !0,
                    configurable: !0,
                    value() {
                        let t = 0;
                        return {
                            next: () => {
                                const e = X(this, En);
                                return t < e.length
                                    ? { value: e[t++], done: !1 }
                                    : { done: !0 };
                            }
                        };
                    }
                },
                [Symbol.toStringTag]: {
                    configurable: !0,
                    get: () => 'NodeList'
                },
                toString: {
                    writable: !0,
                    configurable: !0,
                    value: () => '[object NodeList]'
                }
            })),
                g(Tn, NodeList);
            const Nn = Y('StaticHTMLCollectionItems', 'synthetic-shadow');
            function Sn() {
                throw new TypeError('Illegal constructor');
            }
            function kn(t) {
                const e = o(Sn.prototype);
                return (
                    W(e, Nn, t),
                    R.call(t, (t, n) => {
                        s(e, n, { value: t, enumerable: !0, configurable: !0 });
                    }),
                    e
                );
            }
            (Sn.prototype = o(HTMLCollection.prototype, {
                constructor: { writable: !0, configurable: !0, value: Sn },
                item: {
                    writable: !0,
                    enumerable: !0,
                    configurable: !0,
                    value(t) {
                        return this[t];
                    }
                },
                length: {
                    enumerable: !0,
                    configurable: !0,
                    get() {
                        return X(this, Nn).length;
                    }
                },
                namedItem: {
                    writable: !0,
                    enumerable: !0,
                    configurable: !0,
                    value(t) {
                        if ('' === t) return null;
                        const e = X(this, Nn);
                        for (let n = 0, r = e.length; n < r; n++) {
                            const n = e[r];
                            if (
                                t === Et.call(n, 'id') ||
                                t === Et.call(n, 'name')
                            )
                                return n;
                        }
                        return null;
                    }
                },
                forEach: {
                    writable: !0,
                    enumerable: !0,
                    configurable: !0,
                    value(t, e) {
                        R.call(X(this, Nn), t, e);
                    }
                },
                entries: {
                    writable: !0,
                    enumerable: !0,
                    configurable: !0,
                    value() {
                        return C.call(X(this, Nn), (t, e) => [e, t]);
                    }
                },
                keys: {
                    writable: !0,
                    enumerable: !0,
                    configurable: !0,
                    value() {
                        return C.call(X(this, Nn), (t, e) => e);
                    }
                },
                values: {
                    writable: !0,
                    enumerable: !0,
                    configurable: !0,
                    value() {
                        return X(this, Nn);
                    }
                },
                [Symbol.iterator]: {
                    writable: !0,
                    configurable: !0,
                    value() {
                        let t = 0;
                        return {
                            next: () => {
                                const e = X(this, Nn);
                                return t < e.length
                                    ? { value: e[t++], done: !1 }
                                    : { done: !0 };
                            }
                        };
                    }
                },
                [Symbol.toStringTag]: {
                    configurable: !0,
                    get: () => 'HTMLCollection'
                },
                toString: {
                    writable: !0,
                    configurable: !0,
                    value: () => '[object HTMLCollection]'
                }
            })),
                g(Sn, HTMLCollection);
            const Rn = /[&\u00A0"]/g,
                Fn = /[&\u00A0<>]/g,
                { replace: Bn, toLowerCase: _n } = String.prototype;
            function Ln(t) {
                switch (t) {
                    case '&':
                        return '&amp;';
                    case '<':
                        return '&lt;';
                    case '>':
                        return '&gt;';
                    case '"':
                        return '&quot;';
                    case ' ':
                        return '&nbsp;';
                    default:
                        return '';
                }
            }
            function xn(t) {
                return Bn.call(t, Rn, Ln);
            }
            const On = new Set([
                    'AREA',
                    'BASE',
                    'BR',
                    'COL',
                    'COMMAND',
                    'EMBED',
                    'HR',
                    'IMG',
                    'INPUT',
                    'KEYGEN',
                    'LINK',
                    'META',
                    'PARAM',
                    'SOURCE',
                    'TRACK',
                    'WBR'
                ]),
                Pn = new Set([
                    'STYLE',
                    'SCRIPT',
                    'XMP',
                    'IFRAME',
                    'NOEMBED',
                    'NOFRAMES',
                    'PLAINTEXT',
                    'NOSCRIPT'
                ]);
            function Mn(t) {
                switch (t.nodeType) {
                    case Z: {
                        const { attributes: e } = t,
                            n = jt.call(t);
                        let r = '<' + _n.call(n);
                        for (let t, n = 0; (t = e[n]); n++)
                            r += ' ' + t.name + '="' + xn(t.value) + '"';
                        return (
                            (r += '>'),
                            On.has(n)
                                ? r
                                : r +
                                  (function (t) {
                                      let e = '';
                                      const n = sr(t);
                                      for (
                                          let t = 0, r = n.length;
                                          t < r;
                                          t += 1
                                      )
                                          e += Mn(n[t]);
                                      return e;
                                  })(t) +
                                  '</' +
                                  _n.call(n) +
                                  '>'
                        );
                    }
                    case Q: {
                        const { data: n, parentNode: r } = t;
                        return r instanceof Element && Pn.has(jt.call(r))
                            ? n
                            : ((e = n), Bn.call(e, Fn, Ln));
                    }
                    case tt:
                        return `<!CDATA[[${t.data}]]>`;
                    case et:
                        return `<?${t.target} ${t.data}?>`;
                    case nt:
                        return `\x3c!--${t.data}--\x3e`;
                    default:
                        return '';
                }
                var e;
            }
            const In = Y('shadowRecord', 'synthetic-shadow'),
                { createDocumentFragment: Dn } = document;
            function $n(t) {
                const e = X(t, In);
                if (x(e)) throw new TypeError();
                return e;
            }
            function Un(t) {
                return t.$shadowResolver$;
            }
            function Hn(t, e) {
                t.$shadowResolver$ = e;
            }
            function jn(t) {
                return $n(t).delegatesFocus;
            }
            function qn(t) {
                return $n(t).host;
            }
            function Yn(t) {
                return $n(t).shadowRoot;
            }
            function zn(t) {
                return !x(X(t, In));
            }
            s(Node.prototype, '$shadowResolver$', {
                set(t) {
                    var e, n;
                    (this.$$ShadowResolverKey$$ = t),
                        (e = this),
                        (n = t.nodeKey),
                        s(e, '$$OwnerKey$$', { value: n, configurable: !0 });
                },
                get() {
                    return this.$$ShadowResolverKey$$;
                },
                configurable: !0,
                enumerable: !0
            });
            let Wn = 0;
            function Xn(t, e) {
                if (!x(X(t, In)))
                    throw new Error(
                        "Failed to execute 'attachShadow' on 'Element': Shadow root cannot be created on a host which already hosts a shadow tree."
                    );
                const { mode: n, delegatesFocus: r } = e,
                    o = Je(t),
                    i = Dn.call(o),
                    a = {
                        mode: n,
                        delegatesFocus: !!r,
                        host: t,
                        shadowRoot: i
                    };
                W(i, In, a), W(t, In, a);
                const c = () => i,
                    l = (c.nodeKey = Wn++);
                return (
                    s(t, '$$OwnKey$$', { value: l }),
                    Hn(i, c),
                    g(i, Vn.prototype),
                    i
                );
            }
            const Kn = {
                constructor: { writable: !0, configurable: !0, value: Vn },
                toString: {
                    writable: !0,
                    configurable: !0,
                    value: () => '[object ShadowRoot]'
                }
            };
            function Vn() {
                throw new TypeError('Illegal constructor');
            }
            function Jn(t) {
                let e = mt.call(t);
                for (; !O(e) && Qn(e); ) (t = e), (e = mt.call(t));
                return t;
            }
            function Gn(t, e) {
                n.invariant(
                    t instanceof HTMLElement,
                    'isNodeSlotted() should be called with a host as the first argument instead of ' +
                        t
                ),
                    n.invariant(
                        e instanceof Node,
                        'isNodeSlotted() should be called with a node as the second argument instead of ' +
                            e
                    ),
                    n.invariant(
                        st.call(e, t) & V,
                        'isNodeSlotted() should never be called with a node that is not a child node of ' +
                            t
                    );
                const r = ur(t);
                let o = e instanceof Element ? e : mt.call(e);
                for (; !O(o) && o !== t; ) {
                    const e = hr(o),
                        n = mt.call(o);
                    if (e === r) return Qn(o);
                    if (n === t) return !1;
                    if (O(n) || hr(n) === e) o = n;
                    else {
                        if (!Qn(n)) return !1;
                        if (((o = Zn(Jn(n))), !O(o))) {
                            if (o === t) return !0;
                            if (hr(o) === r) return !0;
                        }
                    }
                }
                return !1;
            }
            function Zn(t) {
                if (!(t instanceof Node)) return null;
                const e = hr(t);
                if (x(e)) return null;
                let n = t;
                for (; !O(n) && ur(n) !== e; ) n = gt.call(n);
                return O(n) ? null : n;
            }
            function Qn(t) {
                return t instanceof HTMLSlotElement;
            }
            function tr(t, e) {
                n.invariant(
                    t instanceof HTMLElement,
                    'isNodeOwnedBy() should be called with an element as the first argument instead of ' +
                        t
                ),
                    n.invariant(
                        e instanceof Node,
                        'isNodeOwnedBy() should be called with a node as the second argument instead of ' +
                            e
                    ),
                    n.invariant(
                        st.call(e, t) & V,
                        'isNodeOwnedBy() should never be called with a node that is not a child node of ' +
                            t
                    );
                const r = hr(e);
                return x(r) || ur(t) === r;
            }
            function er(t) {
                const e = qn(t);
                return or(e, tn(vt.call(e)));
            }
            function nr(t, e) {
                const n = [];
                for (let r = 0, o = e.length; r < o; r += 1) {
                    const o = e[r];
                    !tr(t, o) && Gn(t, o) && E.call(n, o);
                }
                return n;
            }
            function rr(t, e) {
                for (let n = 0, r = e.length; n < r; n += 1) {
                    const r = e[n];
                    if (!tr(t, r) && Gn(t, r)) return r;
                }
                return null;
            }
            function or(t, e) {
                const n = [];
                for (let r = 0, o = e.length; r < o; r += 1) {
                    const o = e[r];
                    tr(t, o) && E.call(n, o);
                }
                return n;
            }
            function ir(t, e) {
                for (let n = 0, r = e.length; n < r; n += 1)
                    if (tr(t, e[n])) return e[n];
                return null;
            }
            function sr(t) {
                let e;
                if (!zn(t) && !Qn(t)) return (e = vt.call(t)), tn(e);
                if (zn(t)) {
                    const e = tn(Rt.call(t, 'slot')),
                        n = Un(Yn(t));
                    return T.call(
                        e,
                        (t, e) => (n === Un(e) && E.apply(t, ar(e)), t),
                        []
                    );
                }
                {
                    e = tn(vt.call(t));
                    const n = Un(t);
                    return T.call(
                        e,
                        (t, e) => (n === Un(e) && E.call(t, e), t),
                        []
                    );
                }
            }
            function ar(t) {
                const e = Zn(t);
                if (O(e)) return [];
                const n = tn(vt.call(t));
                return T.call(n, (t, n) => (tr(e, n) || E.call(t, n), t), []);
            }
            r(
                Kn,
                {
                    insertBefore: {
                        writable: !0,
                        enumerable: !0,
                        configurable: !0,
                        value(t, e) {
                            return at.call(qn(this), t, e), t;
                        }
                    },
                    removeChild: {
                        writable: !0,
                        enumerable: !0,
                        configurable: !0,
                        value(t) {
                            return ct.call(qn(this), t), t;
                        }
                    },
                    appendChild: {
                        writable: !0,
                        enumerable: !0,
                        configurable: !0,
                        value(t) {
                            return ot.call(qn(this), t), t;
                        }
                    },
                    replaceChild: {
                        writable: !0,
                        enumerable: !0,
                        configurable: !0,
                        value(t, e) {
                            return lt.call(qn(this), t, e), e;
                        }
                    },
                    addEventListener: {
                        writable: !0,
                        enumerable: !0,
                        configurable: !0,
                        value(t, e, n) {
                            !(function (t, e, n, r) {
                                if (!I(n))
                                    throw new TypeError(
                                        `Invalid second argument for ShadowRoot.addEventListener() in ${$(
                                            t
                                        )} for event "${e}". Expected an EventListener but received ${n}.`
                                    );
                                vn(qn(t), e, gn(t, n));
                            })(this, t, e);
                        }
                    },
                    removeEventListener: {
                        writable: !0,
                        enumerable: !0,
                        configurable: !0,
                        value(t, e, n) {
                            !(function (t, e, n, r) {
                                wn(qn(t), e, gn(t, n));
                            })(this, t, e);
                        }
                    },
                    baseURI: {
                        enumerable: !0,
                        configurable: !0,
                        get() {
                            return qn(this).baseURI;
                        }
                    },
                    childNodes: {
                        enumerable: !0,
                        configurable: !0,
                        get() {
                            return An(er(this));
                        }
                    },
                    compareDocumentPosition: {
                        writable: !0,
                        enumerable: !0,
                        configurable: !0,
                        value(t) {
                            const e = qn(this);
                            return this === t
                                ? 0
                                : this.contains(t)
                                ? 20
                                : st.call(e, t) & K
                                ? 37
                                : 35;
                        }
                    },
                    contains: {
                        writable: !0,
                        enumerable: !0,
                        configurable: !0,
                        value(t) {
                            if (this === t) return !0;
                            const e = qn(this);
                            return 0 != (st.call(e, t) & K) && tr(e, t);
                        }
                    },
                    firstChild: {
                        enumerable: !0,
                        configurable: !0,
                        get() {
                            return Rr(this)[0] || null;
                        }
                    },
                    lastChild: {
                        enumerable: !0,
                        configurable: !0,
                        get() {
                            const t = Rr(this);
                            return t[t.length - 1] || null;
                        }
                    },
                    hasChildNodes: {
                        writable: !0,
                        enumerable: !0,
                        configurable: !0,
                        value() {
                            return Rr(this).length > 0;
                        }
                    },
                    isConnected: {
                        enumerable: !0,
                        configurable: !0,
                        get() {
                            return wt.call(qn(this));
                        }
                    },
                    nextSibling: {
                        enumerable: !0,
                        configurable: !0,
                        get: () => null
                    },
                    previousSibling: {
                        enumerable: !0,
                        configurable: !0,
                        get: () => null
                    },
                    nodeName: {
                        enumerable: !0,
                        configurable: !0,
                        get: () => '#document-fragment'
                    },
                    nodeType: {
                        enumerable: !0,
                        configurable: !0,
                        get: () => 11
                    },
                    nodeValue: {
                        enumerable: !0,
                        configurable: !0,
                        get: () => null
                    },
                    ownerDocument: {
                        enumerable: !0,
                        configurable: !0,
                        get() {
                            return qn(this).ownerDocument;
                        }
                    },
                    parentElement: {
                        enumerable: !0,
                        configurable: !0,
                        get: () => null
                    },
                    parentNode: {
                        enumerable: !0,
                        configurable: !0,
                        get: () => null
                    },
                    textContent: {
                        enumerable: !0,
                        configurable: !0,
                        get() {
                            const t = Rr(this);
                            let e = '';
                            for (let n = 0, r = t.length; n < r; n += 1) {
                                const r = t[n];
                                r.nodeType !== nt && (e += Cn(r));
                            }
                            return e;
                        },
                        set(t) {
                            const e = qn(this);
                            bt.call(e, t);
                        }
                    },
                    getRootNode: {
                        writable: !0,
                        enumerable: !0,
                        configurable: !0,
                        value(t) {
                            return !x(t) && P(t.composed)
                                ? qn(this).getRootNode(t)
                                : this;
                        }
                    }
                },
                {
                    childElementCount: {
                        enumerable: !0,
                        configurable: !0,
                        get() {
                            return this.children.length;
                        }
                    },
                    children: {
                        enumerable: !0,
                        configurable: !0,
                        get() {
                            return kn(
                                m.call(er(this), (t) => t instanceof Element)
                            );
                        }
                    },
                    firstElementChild: {
                        enumerable: !0,
                        configurable: !0,
                        get() {
                            return this.children[0] || null;
                        }
                    },
                    lastElementChild: {
                        enumerable: !0,
                        configurable: !0,
                        get() {
                            const { children: t } = this;
                            return t.item(t.length - 1) || null;
                        }
                    },
                    querySelector: {
                        writable: !0,
                        enumerable: !0,
                        configurable: !0,
                        value(t) {
                            return (function (t, e) {
                                const n = qn(t),
                                    r = tn(Rt.call(n, e));
                                return ir(n, r);
                            })(this, t);
                        }
                    },
                    querySelectorAll: {
                        writable: !0,
                        enumerable: !0,
                        configurable: !0,
                        value(t) {
                            return An(
                                (function (t, e) {
                                    const n = qn(t),
                                        r = Rt.call(n, e);
                                    return or(n, tn(r));
                                })(this, t)
                            );
                        }
                    }
                },
                {
                    innerHTML: {
                        enumerable: !0,
                        configurable: !0,
                        get() {
                            const t = Rr(this);
                            let e = '';
                            for (let n = 0, r = t.length; n < r; n += 1)
                                e += Mn(t[n]);
                            return e;
                        },
                        set(t) {
                            const e = qn(this);
                            Dt.call(e, t);
                        }
                    }
                },
                {
                    activeElement: {
                        enumerable: !0,
                        configurable: !0,
                        get() {
                            const t = qn(this),
                                e = Je(t),
                                n = ne.call(e);
                            if (O(n)) return n;
                            if (0 == (st.call(t, n) & K)) return null;
                            let r = n;
                            for (; !tr(t, r); ) r = mt.call(r);
                            return Qn(r) ? null : r;
                        }
                    },
                    delegatesFocus: {
                        configurable: !0,
                        get() {
                            return $n(this).delegatesFocus;
                        }
                    },
                    elementFromPoint: {
                        writable: !0,
                        enumerable: !0,
                        configurable: !0,
                        value(t, e) {
                            const n = Je(qn(this)),
                                r = re.call(n, t, e);
                            return O(r) ? r : nn(this, en(r, !0));
                        }
                    },
                    elementsFromPoint: {
                        writable: !0,
                        enumerable: !0,
                        configurable: !0,
                        value(t, e) {
                            throw new Error();
                        }
                    },
                    getSelection: {
                        writable: !0,
                        enumerable: !0,
                        configurable: !0,
                        value() {
                            throw new Error();
                        }
                    },
                    host: {
                        enumerable: !0,
                        configurable: !0,
                        get() {
                            return qn(this);
                        }
                    },
                    mode: {
                        configurable: !0,
                        get() {
                            return $n(this).mode;
                        }
                    },
                    styleSheets: {
                        enumerable: !0,
                        configurable: !0,
                        get() {
                            throw new Error();
                        }
                    }
                }
            ),
                (Vn.prototype = o(DocumentFragment.prototype, Kn));
            const cr = 'Symbol(x)' === Symbol('x').toString();
            function lr(t) {
                return t.$$OwnerKey$$;
            }
            function ur(t) {
                return t.$$OwnKey$$;
            }
            function hr(t) {
                let e,
                    n = t;
                for (; !O(n); ) {
                    if (((e = lr(n)), !x(e))) return e;
                    n = gt.call(n);
                }
            }
            function fr(t) {
                return !x(lr(t));
            }
            function pr(t) {
                return Qn(t) || zn(t);
            }
            function dr(t, e) {
                const n = Zn(t);
                if (e === n) return Yn(n);
                if (e instanceof Element) {
                    if (hr(t) === hr(e)) return e;
                    if (!O(n) && Qn(e)) {
                        const t = Zn(e);
                        if (!O(t) && tr(n, t)) return t;
                    }
                }
                return null;
            }
            function gr() {
                return Rr(this).length > 0;
            }
            function yr() {
                return Rr(this)[0] || null;
            }
            function mr() {
                const t = Rr(this);
                return t[t.length - 1] || null;
            }
            function br() {
                return Cn(this);
            }
            function vr() {
                const t = gt.call(this);
                return O(t) ? t : dr(this, t);
            }
            function wr() {
                const t = gt.call(this);
                if (O(t)) return null;
                const e = dr(this, t);
                return e instanceof Element ? e : null;
            }
            function Cr(t) {
                return this.getRootNode() === t
                    ? 10
                    : lr(this) !== lr(t)
                    ? 35
                    : st.call(this, t);
            }
            function Er(t) {
                return (
                    null != t &&
                    lr(this) === lr(t) &&
                    0 != (st.call(this, t) & K)
                );
            }
            function Tr(t) {
                const e = it.call(this, !1);
                if (!t) return e;
                const n = Rr(this);
                for (let t = 0, r = n.length; t < r; t += 1)
                    e.appendChild(n[t].cloneNode(!0));
                return e;
            }
            function Ar() {
                if (this instanceof Element && zn(this)) {
                    const t = Zn(this),
                        e = O(t) ? [] : or(t, sr(this));
                    return (
                        M(cr) &&
                            !kr &&
                            k.call(
                                e,
                                (function (t) {
                                    const e = Yn(t);
                                    let n = e.$$placeholder$$;
                                    if (!x(n)) return n;
                                    const r = Je(t);
                                    return (
                                        (n = e.$$placeholder$$ = ie.call(
                                            r,
                                            ''
                                        )),
                                        i(n, {
                                            childNodes: {
                                                get: () => e.childNodes,
                                                enumerable: !0,
                                                configurable: !0
                                            },
                                            tagName: {
                                                get: () =>
                                                    `#shadow-root (${e.mode})`,
                                                enumerable: !0,
                                                configurable: !0
                                            }
                                        }),
                                        n
                                    );
                                })(this)
                            ),
                        An(e)
                    );
                }
                return vt.call(this);
            }
            const Nr = Node.prototype.getRootNode,
                Sr = x(Nr)
                    ? function () {
                          let t,
                              e = this;
                          for (; !O((t = gt.call(e))); ) e = t;
                          return e;
                      }
                    : Nr;
            i(Node.prototype, {
                firstChild: {
                    get() {
                        return pr(this) ? yr.call(this) : ft.call(this);
                    },
                    enumerable: !0,
                    configurable: !0
                },
                lastChild: {
                    get() {
                        return pr(this) ? mr.call(this) : pt.call(this);
                    },
                    enumerable: !0,
                    configurable: !0
                },
                textContent: {
                    get() {
                        return Ve.ENABLE_NODE_PATCH
                            ? Qe(this)
                                ? dt.call(this)
                                : br.call(this)
                            : fr(this) || zn(this)
                            ? br.call(this)
                            : dt.call(this);
                    },
                    set: function (t) {
                        bt.call(this, t);
                    },
                    enumerable: !0,
                    configurable: !0
                },
                parentNode: {
                    get() {
                        return fr(this) ? vr.call(this) : gt.call(this);
                    },
                    enumerable: !0,
                    configurable: !0
                },
                parentElement: {
                    get() {
                        return fr(this) ? wr.call(this) : mt.call(this);
                    },
                    enumerable: !0,
                    configurable: !0
                },
                childNodes: {
                    get() {
                        return pr(this) ? Ar.call(this) : vt.call(this);
                    },
                    enumerable: !0,
                    configurable: !0
                },
                hasChildNodes: {
                    value() {
                        return pr(this) ? gr.call(this) : ut.call(this);
                    },
                    enumerable: !0,
                    writable: !0,
                    configurable: !0
                },
                compareDocumentPosition: {
                    value(t) {
                        return Qe(this) ? st.call(this, t) : Cr.call(this, t);
                    },
                    enumerable: !0,
                    writable: !0,
                    configurable: !0
                },
                contains: {
                    value(t) {
                        return (
                            this === t ||
                            (Ve.ENABLE_NODE_PATCH
                                ? Qe(this)
                                    ? ht.call(this, t)
                                    : Er.call(this, t)
                                : null != t &&
                                  (fr(this) || zn(this)
                                      ? Er.call(this, t)
                                      : ht.call(this, t)))
                        );
                    },
                    enumerable: !0,
                    writable: !0,
                    configurable: !0
                },
                cloneNode: {
                    value(t) {
                        return Ve.ENABLE_NODE_PATCH
                            ? P(t)
                                ? Qe(this)
                                    ? it.call(this, t)
                                    : Tr.call(this, t)
                                : it.call(this, t)
                            : fr(this) || zn(this)
                            ? Tr.call(this, t)
                            : it.call(this, t);
                    },
                    enumerable: !0,
                    writable: !0,
                    configurable: !0
                },
                getRootNode: {
                    value: function (t) {
                        return P(!x(t) && !!t.composed)
                            ? Sr.call(this, t)
                            : (function (t) {
                                  const e = Zn(t);
                                  return O(e) ? Sr.call(t) : Yn(e);
                              })(this);
                    },
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                },
                isConnected: {
                    enumerable: !0,
                    configurable: !0,
                    get() {
                        return wt.call(this);
                    }
                }
            });
            let kr = !1;
            const Rr = M(cr)
                ? function (t) {
                      let e;
                      kr = !0;
                      let n = null;
                      try {
                          e = t.childNodes;
                      } catch (t) {
                          n = t;
                      } finally {
                          if (((kr = !1), !O(n))) throw n;
                      }
                      return e;
                  }
                : function (t) {
                      return t.childNodes;
                  };
            function Fr(t) {
                const e = Qt.call(t);
                return e instanceof Node && !x(hr(e));
            }
            function Br(t) {
                return (
                    I(t) || (!O(t) && 'object' == typeof t && I(t.handleEvent))
                );
            }
            function _r(t) {
                if ('$$lwcEventWrapper$$' in t) return t.$$lwcEventWrapper$$;
                const e = I(t);
                return (t.$$lwcEventWrapper$$ = function (n) {
                    return (
                        Fr(n) && hn(n),
                        e ? t.call(this, n) : t.handleEvent && t.handleEvent(n)
                    );
                });
            }
            h.call(HTMLElement.prototype, 'contains') &&
                s(
                    HTMLElement.prototype,
                    'contains',
                    c(Node.prototype, 'contains')
                ),
                h.call(HTMLElement.prototype, 'parentElement') &&
                    s(
                        HTMLElement.prototype,
                        'parentElement',
                        c(Node.prototype, 'parentElement')
                    ),
                (Document.prototype.elementFromPoint = function (t, e) {
                    const n = re.call(this, t, e);
                    return O(n) ? n : nn(this, en(n, !0));
                }),
                s(Document.prototype, 'activeElement', {
                    get() {
                        let t = ne.call(this);
                        if (O(t)) return t;
                        for (; !x(lr(t)); )
                            if (((t = mt.call(t)), O(t))) return null;
                        return 'HTML' === t.tagName && (t = this.body), t;
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                s(Document.prototype, 'getElementById', {
                    value() {
                        const t = ae.apply(this, N.call(arguments));
                        return O(t) ? null : x(lr(t)) || Qe(t) ? t : null;
                    },
                    writable: !0,
                    enumerable: !0,
                    configurable: !0
                }),
                s(Document.prototype, 'querySelector', {
                    value() {
                        const t = tn(se.apply(this, N.call(arguments))),
                            e = b.call(t, (t) => x(lr(t)) || Qe(t));
                        return x(e) ? null : e;
                    },
                    writable: !0,
                    enumerable: !0,
                    configurable: !0
                }),
                s(Document.prototype, 'querySelectorAll', {
                    value() {
                        const t = tn(se.apply(this, N.call(arguments)));
                        return An(m.call(t, (t) => x(lr(t)) || Qe(t)));
                    },
                    writable: !0,
                    enumerable: !0,
                    configurable: !0
                }),
                s(Document.prototype, 'getElementsByClassName', {
                    value() {
                        const t = tn(ce.apply(this, N.call(arguments)));
                        return kn(m.call(t, (t) => x(lr(t)) || Qe(t)));
                    },
                    writable: !0,
                    enumerable: !0,
                    configurable: !0
                }),
                s(Document.prototype, 'getElementsByTagName', {
                    value() {
                        const t = tn(le.apply(this, N.call(arguments)));
                        return kn(m.call(t, (t) => x(lr(t)) || Qe(t)));
                    },
                    writable: !0,
                    enumerable: !0,
                    configurable: !0
                }),
                s(Document.prototype, 'getElementsByTagNameNS', {
                    value() {
                        const t = tn(ue.apply(this, N.call(arguments)));
                        return kn(m.call(t, (t) => x(lr(t)) || Qe(t)));
                    },
                    writable: !0,
                    enumerable: !0,
                    configurable: !0
                }),
                s(
                    c(HTMLDocument.prototype, 'getElementsByName')
                        ? HTMLDocument.prototype
                        : Document.prototype,
                    'getElementsByName',
                    {
                        value() {
                            const t = tn(he.apply(this, N.call(arguments)));
                            return An(m.call(t, (t) => x(lr(t)) || Qe(t)));
                        },
                        writable: !0,
                        enumerable: !0,
                        configurable: !0
                    }
                ),
                Object.defineProperty(window, 'ShadowRoot', {
                    value: Vn,
                    configurable: !0,
                    writable: !0
                }),
                (window.addEventListener = function (t, e, n) {
                    if (!Br(e)) return;
                    const r = _r(e);
                    fe.call(this, t, r, n);
                }),
                (window.removeEventListener = function (t, e, n) {
                    if (!Br(e)) return;
                    const r = _r(e);
                    pe.call(this, t, r || e, n);
                });
            const Lr =
                'undefined' != typeof EventTarget
                    ? EventTarget.prototype
                    : Node.prototype;
            i(Lr, {
                addEventListener: {
                    value: function (t, e, n) {
                        if (!Br(e)) return;
                        const r = _r(e);
                        Ct.call(this, t, r, n);
                    },
                    enumerable: !0,
                    writable: !0,
                    configurable: !0
                },
                removeEventListener: {
                    value: function (t, e, n) {
                        if (!Br(e)) return;
                        const r = _r(e);
                        Bt.call(this, t, r || e, n);
                    },
                    enumerable: !0,
                    writable: !0,
                    configurable: !0
                }
            });
            const xr = Object.getOwnPropertyDescriptor(
                Event.prototype,
                'composed'
            );
            const Or = Object.getOwnPropertyDescriptor(
                HTMLElement.prototype,
                'click'
            );
            function Pr(t) {
                Object.defineProperty(t, 'composed', {
                    configurable: !0,
                    enumerable: !0,
                    get: () => !0
                });
            }
            (function () {
                if (!xr) return !1;
                let t = new Event('click');
                const e = document.createElement('button');
                return (
                    e.addEventListener('click', (e) => (t = e)),
                    e.click(),
                    !xr.get.call(t)
                );
            })() &&
                (HTMLElement.prototype.click = function () {
                    Ct.call(this, 'click', Pr);
                    try {
                        Or.value.call(this);
                    } finally {
                        Bt.call(this, 'click', Pr);
                    }
                }),
                !0 !== new Event('test', { composed: !0 }).composed &&
                    (function () {
                        const t = r(o(null), {
                                beforeinput: 1,
                                blur: 1,
                                click: 1,
                                compositionend: 1,
                                compositionstart: 1,
                                compositionupdate: 1,
                                copy: 1,
                                cut: 1,
                                dblclick: 1,
                                DOMActivate: 1,
                                DOMFocusIn: 1,
                                DOMFocusOut: 1,
                                drag: 1,
                                dragend: 1,
                                dragenter: 1,
                                dragleave: 1,
                                dragover: 1,
                                dragstart: 1,
                                drop: 1,
                                focus: 1,
                                focusin: 1,
                                focusout: 1,
                                gotpointercapture: 1,
                                input: 1,
                                keydown: 1,
                                keypress: 1,
                                keyup: 1,
                                lostpointercapture: 1,
                                mousedown: 1,
                                mouseenter: 1,
                                mouseleave: 1,
                                mousemove: 1,
                                mouseout: 1,
                                mouseover: 1,
                                mouseup: 1,
                                paste: 1,
                                pointercancel: 1,
                                pointerdown: 1,
                                pointerenter: 1,
                                pointerleave: 1,
                                pointermove: 1,
                                pointerout: 1,
                                pointerover: 1,
                                pointerup: 1,
                                touchcancel: 1,
                                touchend: 1,
                                touchmove: 1,
                                touchstart: 1,
                                wheel: 1
                            }),
                            e = Event;
                        function n(t, n) {
                            const r = new e(t, n),
                                o = !(!n || !n.composed);
                            return (
                                Object.defineProperties(r, {
                                    composed: {
                                        get: () => o,
                                        configurable: !0,
                                        enumerable: !0
                                    }
                                }),
                                r
                            );
                        }
                        (n.prototype = e.prototype),
                            (n.AT_TARGET = e.AT_TARGET),
                            (n.BUBBLING_PHASE = e.BUBBLING_PHASE),
                            (n.CAPTURING_PHASE = e.CAPTURING_PHASE),
                            (n.NONE = e.NONE),
                            (window.Event = n),
                            Object.defineProperties(Event.prototype, {
                                composed: {
                                    get() {
                                        const { type: e } = this;
                                        return 1 === t[e];
                                    },
                                    configurable: !0,
                                    enumerable: !0
                                }
                            });
                    })();
            const Mr = CustomEvent;
            function Ir(t, e) {
                const n = new Mr(t, e),
                    r = !(!e || !e.composed);
                return (
                    Object.defineProperties(n, {
                        composed: {
                            get: () => r,
                            configurable: !0,
                            enumerable: !0
                        }
                    }),
                    n
                );
            }
            if (
                ((Ir.prototype = Mr.prototype),
                (window.CustomEvent = Ir),
                'undefined' != typeof ClipboardEvent)
            ) {
                const t = r(o(null), { copy: 1, cut: 1, paste: 1 });
                i(ClipboardEvent.prototype, {
                    composed: {
                        get() {
                            const { type: e } = this;
                            return 1 === t[e];
                        },
                        configurable: !0,
                        enumerable: !0
                    }
                });
            }
            'undefined' != typeof HTMLIFrameElement &&
                (function () {
                    const t = c(HTMLIFrameElement.prototype, 'contentWindow'),
                        { get: e } = t;
                    (t.get = function () {
                        const t = e.call(this);
                        return O(t) || x(lr(this))
                            ? t
                            : ((n = t),
                              {
                                  addEventListener() {
                                      return n.addEventListener.apply(
                                          n,
                                          arguments
                                      );
                                  },
                                  blur() {
                                      return n.blur.apply(n, arguments);
                                  },
                                  close() {
                                      return n.close.apply(n, arguments);
                                  },
                                  focus() {
                                      return n.focus.apply(n, arguments);
                                  },
                                  postMessage() {
                                      return n.postMessage.apply(n, arguments);
                                  },
                                  removeEventListener() {
                                      return n.removeEventListener.apply(
                                          n,
                                          arguments
                                      );
                                  },
                                  get closed() {
                                      return n.closed;
                                  },
                                  get frames() {
                                      return n.frames;
                                  },
                                  get length() {
                                      return n.length;
                                  },
                                  get location() {
                                      return n.location;
                                  },
                                  set location(t) {
                                      n.location = t;
                                  },
                                  get opener() {
                                      return n.opener;
                                  },
                                  get parent() {
                                      return n.parent;
                                  },
                                  get self() {
                                      return n.self;
                                  },
                                  get top() {
                                      return n.top;
                                  },
                                  get window() {
                                      return n.window;
                                  }
                              });
                        var n;
                    }),
                        s(HTMLIFrameElement.prototype, 'contentWindow', t);
                })();
            const Dr = MutationObserver,
                { disconnect: $r, observe: Ur, takeRecords: Hr } = Dr.prototype,
                jr = new WeakMap();
            function qr(t) {
                return t.$$lwcNodeObservers$$;
            }
            function Yr(t) {
                const {
                        addedNodes: e,
                        removedNodes: n,
                        target: r,
                        type: s
                    } = t,
                    a = o(MutationRecord.prototype);
                return (
                    i(a, {
                        addedNodes: {
                            get: () => e,
                            enumerable: !0,
                            configurable: !0
                        },
                        removedNodes: {
                            get: () => n,
                            enumerable: !0,
                            configurable: !0
                        },
                        type: {
                            get: () => s,
                            enumerable: !0,
                            configurable: !0
                        },
                        target: {
                            get: () => r.shadowRoot,
                            enumerable: !0,
                            configurable: !0
                        }
                    }),
                    a
                );
            }
            function zr(t, e) {
                let n = e;
                for (; !O(n); ) {
                    const e = qr(n);
                    if (!x(e) && (e[0] === t || -1 !== v.call(e, t))) return !0;
                    n = n.parentNode;
                }
                return !1;
            }
            function Wr(t, e) {
                return T.call(
                    t,
                    (t, n) => {
                        const {
                            target: r,
                            addedNodes: o,
                            removedNodes: i,
                            type: s
                        } = n;
                        if ('childList' !== s || x(ur(r)))
                            zr(e, r) && E.call(t, n);
                        else if (o.length > 0) {
                            const i = o[0];
                            if (zr(e, i)) {
                                const o = qr(r);
                                !o || (o[0] !== e && -1 === v.call(o, e))
                                    ? E.call(t, Yr(n))
                                    : E.call(t, n);
                            }
                        } else {
                            const o = r.shadowRoot,
                                s = i[0];
                            if (hr(r) === hr(s) && zr(e, r)) E.call(t, n);
                            else if (o) {
                                const r = qr(o);
                                !r ||
                                    (r[0] !== e && -1 === v.call(r, e)) ||
                                    E.call(t, Yr(n));
                            }
                        }
                        return t;
                    },
                    []
                );
            }
            function Xr(t) {
                const e = (function (t) {
                    let e = t.$$lwcObserverCallbackWrapper$$;
                    return (
                        x(e) &&
                            (e = t.$$lwcObserverCallbackWrapper$$ = (e, n) => {
                                const r = Wr(e, n);
                                0 !== r.length && t.call(n, r, n);
                            }),
                        e
                    );
                })(t);
                return new Dr(e);
            }
            let Kr;
            (Xr.prototype = Dr.prototype),
                (Xr.prototype.disconnect = function () {
                    $r.call(this);
                    const t = jr.get(this);
                    x(t) ||
                        (R.call(t, (t) => {
                            const e = t.$$lwcNodeObservers$$;
                            if (!x(e)) {
                                const t = v.call(e, this);
                                -1 !== t && S.call(e, t, 1);
                            }
                        }),
                        (t.length = 0));
                }),
                (Xr.prototype.observe = function (t, e) {
                    let n = qr(t);
                    var r;
                    if (
                        (x(n) &&
                            ((n = []), (r = n), (t.$$lwcNodeObservers$$ = r)),
                        -1 === v.call(n, this) && E.call(n, this),
                        t instanceof Vn && (t = t.host),
                        jr.has(this))
                    ) {
                        const e = jr.get(this);
                        -1 === v.call(e, t) && E.call(e, t);
                    } else jr.set(this, [t]);
                    return Ur.call(this, t, e);
                }),
                (Xr.prototype.takeRecords = function () {
                    return Wr(Hr.call(this), this);
                }),
                s(window, 'MutationObserver', {
                    value: Xr,
                    configurable: !0,
                    writable: !0
                });
            const Vr = { childList: !0 },
                Jr = Y('slotchange', 'synthetic-shadow');
            function Gr(t) {
                const e = tn(vt.call(t));
                return T.call(
                    e,
                    (t, e) => (
                        e instanceof Element && Qn(e)
                            ? E.apply(t, Gr(e))
                            : E.call(t, e),
                        t
                    ),
                    []
                );
            }
            function Zr() {
                const t = gt.call(this);
                return O(t) || !Qn(t) || hr(t) === hr(this) ? null : t;
            }
            function Qr(t, e) {
                let n;
                const r = lr(t);
                if (x(r))
                    n =
                        t instanceof HTMLBodyElement
                            ? m.call(e, (e) => x(lr(e)) || Qe(t))
                            : N.call(e);
                else if (zn(t)) {
                    const r = Zn(t);
                    n = O(r) ? [] : ur(t) ? nr(t, e) : or(r, e);
                } else n = m.call(e, (t) => hr(t) === r);
                return n;
            }
            var to;
            function eo() {
                const t = Rr(this);
                let e = '';
                for (let n = 0, r = t.length; n < r; n += 1) e += Mn(t[n]);
                return e;
            }
            function no() {
                return Mn(this);
            }
            function ro() {
                const t = Zn(this),
                    e = O(t) ? [] : or(t, sr(this));
                return kn(m.call(e, (t) => t instanceof Element));
            }
            function oo() {
                return this.children.length;
            }
            function io() {
                return this.children[0] || null;
            }
            function so() {
                const { children: t } = this;
                return t.item(t.length - 1) || null;
            }
            function ao(t, e, n) {
                let r;
                if (zn(t)) {
                    const n = Zn(t);
                    r = O(n) ? [] : ur(t) ? nr(t, e) : or(n, e);
                } else if (fr(t)) {
                    const o = lr(t);
                    if (x(o))
                        if (n === to.Enabled) {
                            const n = hr(t);
                            r = m.call(e, (t) => hr(t) === n);
                        } else r = N.call(e);
                    else r = m.call(e, (t) => hr(t) === o);
                } else
                    r =
                        t instanceof HTMLBodyElement || n === to.Enabled
                            ? m.call(e, (e) => x(lr(e)) || Qe(t))
                            : N.call(e);
                return r;
            }
            i(HTMLSlotElement.prototype, {
                addEventListener: {
                    value(t, e, r) {
                        HTMLElement.prototype.addEventListener.call(
                            this,
                            t,
                            e,
                            r
                        ),
                            'slotchange' !== t ||
                                X(this, Jr) ||
                                (W(this, Jr, !0),
                                Kr ||
                                    (Kr = new de((t) => {
                                        const e = [];
                                        R.call(t, (t) => {
                                            n.invariant(
                                                'childList' === t.type,
                                                `Invalid mutation type: ${t.type}. This mutation handler for slots should only handle "childList" mutations.`
                                            );
                                            const { target: r } = t;
                                            -1 === v.call(e, r) &&
                                                (E.call(e, r),
                                                Zt.call(
                                                    r,
                                                    new CustomEvent(
                                                        'slotchange'
                                                    )
                                                ));
                                        });
                                    })),
                                ge.call(Kr, this, Vr));
                    },
                    writable: !0,
                    enumerable: !0,
                    configurable: !0
                },
                assignedElements: {
                    value(t) {
                        if (fr(this)) {
                            const e =
                                !x(t) && P(t.flatten) ? Gr(this) : ar(this);
                            return m.call(e, (t) => t instanceof Element);
                        }
                        return Gt.apply(this, N.call(arguments));
                    },
                    writable: !0,
                    enumerable: !0,
                    configurable: !0
                },
                assignedNodes: {
                    value(t) {
                        if (fr(this)) {
                            return !x(t) && P(t.flatten) ? Gr(this) : ar(this);
                        }
                        return Jt.apply(this, N.call(arguments));
                    },
                    writable: !0,
                    enumerable: !0,
                    configurable: !0
                },
                name: {
                    get() {
                        const t = Et.call(this, 'name');
                        return O(t) ? '' : t;
                    },
                    set(t) {
                        _t.call(this, 'name', t);
                    },
                    enumerable: !0,
                    configurable: !0
                },
                childNodes: {
                    get() {
                        if (fr(this)) {
                            const t = Zn(this);
                            return An(O(t) ? [] : or(t, sr(this)));
                        }
                        return vt.call(this);
                    },
                    enumerable: !0,
                    configurable: !0
                }
            }),
                i(Text.prototype, {
                    assignedSlot: { get: Zr, enumerable: !0, configurable: !0 }
                }),
                (function (t) {
                    (t[(t.Disabled = 0)] = 'Disabled'),
                        (t[(t.Enabled = 1)] = 'Enabled');
                })(to || (to = {})),
                i(Element.prototype, {
                    innerHTML: {
                        get() {
                            return Ve.ENABLE_ELEMENT_PATCH
                                ? Qe(this)
                                    ? It.call(this)
                                    : eo.call(this)
                                : fr(this) || zn(this)
                                ? eo.call(this)
                                : It.call(this);
                        },
                        set(t) {
                            Dt.call(this, t);
                        },
                        enumerable: !0,
                        configurable: !0
                    },
                    outerHTML: {
                        get() {
                            return Ve.ENABLE_ELEMENT_PATCH
                                ? Qe(this)
                                    ? Ut.call(this)
                                    : no.call(this)
                                : fr(this) || zn(this)
                                ? no.call(this)
                                : Ut.call(this);
                        },
                        set(t) {
                            Ht.call(this, t);
                        },
                        enumerable: !0,
                        configurable: !0
                    },
                    attachShadow: {
                        value: function (t) {
                            return P(t['$$lwc-synthetic-mode$$'])
                                ? Xn(this, t)
                                : Lt.call(this, t);
                        },
                        enumerable: !0,
                        writable: !0,
                        configurable: !0
                    },
                    shadowRoot: {
                        get: function () {
                            if (zn(this)) {
                                const t = Yn(this);
                                if ('open' === t.mode) return t;
                            }
                            return Vt.call(this);
                        },
                        enumerable: !0,
                        configurable: !0
                    },
                    children: {
                        get() {
                            return pr(this) ? ro.call(this) : Xt.call(this);
                        },
                        enumerable: !0,
                        configurable: !0
                    },
                    childElementCount: {
                        get() {
                            return pr(this) ? oo.call(this) : xt.call(this);
                        },
                        enumerable: !0,
                        configurable: !0
                    },
                    firstElementChild: {
                        get() {
                            return pr(this) ? io.call(this) : Ot.call(this);
                        },
                        enumerable: !0,
                        configurable: !0
                    },
                    lastElementChild: {
                        get() {
                            return pr(this) ? so.call(this) : Pt.call(this);
                        },
                        enumerable: !0,
                        configurable: !0
                    },
                    assignedSlot: { get: Zr, enumerable: !0, configurable: !0 }
                }),
                h.call(HTMLElement.prototype, 'innerHTML') &&
                    s(
                        HTMLElement.prototype,
                        'innerHTML',
                        c(Element.prototype, 'innerHTML')
                    ),
                h.call(HTMLElement.prototype, 'outerHTML') &&
                    s(
                        HTMLElement.prototype,
                        'outerHTML',
                        c(Element.prototype, 'outerHTML')
                    ),
                h.call(HTMLElement.prototype, 'children') &&
                    s(
                        HTMLElement.prototype,
                        'children',
                        c(Element.prototype, 'children')
                    ),
                i(Element.prototype, {
                    querySelector: {
                        value: function () {
                            const t = tn(Rt.apply(this, N.call(arguments)));
                            if (zn(this)) {
                                const e = Zn(this);
                                return O(e)
                                    ? null
                                    : ur(this)
                                    ? rr(this, t)
                                    : ir(e, t);
                            }
                            if (fr(this)) {
                                const e = lr(this);
                                if (x(e)) {
                                    if (!Ve.ENABLE_NODE_LIST_PATCH)
                                        return 0 === t.length ? null : t[0];
                                    const e = hr(this),
                                        n = b.call(t, (t) => hr(t) === e);
                                    return x(n) ? null : n;
                                }
                                {
                                    const n = b.call(t, (t) => hr(t) === e);
                                    return x(n) ? null : n;
                                }
                            }
                            {
                                if (
                                    !(
                                        Ve.ENABLE_NODE_LIST_PATCH ||
                                        this instanceof HTMLBodyElement
                                    )
                                ) {
                                    const e = t[0];
                                    return x(e) ? null : e;
                                }
                                const e = b.call(
                                    t,
                                    (t) => x(lr(t)) || Qe(this)
                                );
                                return x(e) ? null : e;
                            }
                        },
                        writable: !0,
                        enumerable: !0,
                        configurable: !0
                    },
                    querySelectorAll: {
                        value() {
                            const t = tn(Rt.apply(this, N.call(arguments)));
                            if (!Ve.ENABLE_NODE_LIST_PATCH) {
                                return An(ao(this, t, to.Disabled));
                            }
                            return An(ao(this, t, to.Enabled));
                        },
                        writable: !0,
                        enumerable: !0,
                        configurable: !0
                    }
                }),
                i(Element.prototype, {
                    getElementsByClassName: {
                        value() {
                            const t = tn(Kt.apply(this, N.call(arguments)));
                            if (!Ve.ENABLE_HTML_COLLECTIONS_PATCH)
                                return kn(Qr(this, t));
                            return kn(ao(this, t, to.Enabled));
                        },
                        writable: !0,
                        enumerable: !0,
                        configurable: !0
                    },
                    getElementsByTagName: {
                        value() {
                            const t = tn(At.apply(this, N.call(arguments)));
                            if (!Ve.ENABLE_HTML_COLLECTIONS_PATCH)
                                return kn(Qr(this, t));
                            return kn(ao(this, t, to.Enabled));
                        },
                        writable: !0,
                        enumerable: !0,
                        configurable: !0
                    },
                    getElementsByTagNameNS: {
                        value() {
                            const t = tn(Nt.apply(this, N.call(arguments)));
                            if (!Ve.ENABLE_HTML_COLLECTIONS_PATCH)
                                return kn(Qr(this, t));
                            return kn(ao(this, t, to.Enabled));
                        },
                        writable: !0,
                        enumerable: !0,
                        configurable: !0
                    }
                }),
                h.call(HTMLElement.prototype, 'getElementsByClassName') &&
                    s(
                        HTMLElement.prototype,
                        'getElementsByClassName',
                        c(Element.prototype, 'getElementsByClassName')
                    );
            const co =
                    '\n    [contenteditable],\n    [tabindex],\n    a[href],\n    area[href],\n    audio[controls],\n    button,\n    iframe,\n    input,\n    select,\n    textarea,\n    video[controls]\n',
                lo = new Set(['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA']);
            function uo(t) {
                return t.filter((t) =>
                    St.call(t, 'tabindex')
                        ? '0' === Et.call(t, 'tabindex')
                        : !lo.has(jt.call(t)) || !St.call(t, 'disabled')
                );
            }
            const ho = Y('DidAddMouseEventListeners', 'synthetic-shadow');
            function fo(t) {
                return (
                    (!zn(t) || !jn(t)) &&
                    Wt.call(t, co) &&
                    (function (t) {
                        const { width: e, height: n } = Tt.call(t),
                            r = e > 0 || n > 0,
                            o = 'AREA' === t.tagName;
                        return (
                            (r || o) &&
                            'hidden' !== getComputedStyle(t).visibility
                        );
                    })(t)
                );
            }
            function po() {
                const t = this.getRootNode();
                if (t === this) {
                    const t = kt.call(this, co);
                    return void (O(t) || t.focus.apply(t, arguments));
                }
                const e = t;
                if (e.activeElement === this) return;
                const n = tn(Rt.call(this, co));
                let r = !1;
                for (; !r && 0 !== n.length; ) {
                    const t = n.shift();
                    t.focus.apply(t, arguments);
                    r = t.getRootNode().activeElement === t;
                }
            }
            function go(t) {
                const e = Je(t),
                    r = uo(tn(se.call(e, co))),
                    o = uo(tn(Rt.call(t, co)));
                n.invariant(
                    '-1' === Et.call(t, 'tabindex') || jn(t),
                    'The focusin event is only relevant when the tabIndex property is -1 on the host.'
                );
                const i = o[0],
                    s = o[o.length - 1],
                    a = v.call(r, t),
                    c = a > -1 ? a : v.call(r, i),
                    l = 0 === o.length ? c + 1 : v.call(r, s) + 1;
                return { prev: N.call(r, 0, c), inner: o, next: N.call(r, l) };
            }
            function yo(t, e) {
                const n = st.call(t, e);
                return n & K ? 0 : n & J ? 1 : n & G ? 2 : -1;
            }
            function mo(t) {
                t.preventDefault(), t.stopPropagation();
            }
            function bo(t, e) {
                fe.call(t, 'focusin', mo, !0),
                    fe.call(t, 'focusout', mo, !0),
                    e(),
                    pe.call(t, 'focusin', mo, !0),
                    pe.call(t, 'focusout', mo, !0);
            }
            function vo(t, e, n) {
                const r = Ge(n),
                    o = (function (t, e) {
                        const n = t.length;
                        if (n > 0)
                            for (let r = 0; r < n; r += 1) {
                                const n = t[r];
                                if (No(e.getRootNode(), n)) return n;
                            }
                        return null;
                    })(t, n);
                O(o)
                    ? bo(r, () => {
                          e.blur();
                      })
                    : bo(r, () => {
                          o.focus();
                      });
            }
            let wo = !1;
            function Co() {
                wo = !0;
            }
            function Eo() {
                wo = !1;
            }
            function To(t) {
                if (wo) return;
                const e = te.call(t),
                    n = Qt.call(t);
                if (e !== n) return;
                const r = ee.call(t);
                if (O(r)) return;
                const o = go(e);
                if (1 === yo(e, r)) {
                    const t = No.bind(null, e.getRootNode()),
                        i = b.call(o.inner, t);
                    if (x(i)) vo(o.next, n, r);
                    else {
                        bo(Ge(i), () => {
                            i.focus();
                        });
                    }
                } else e === n && vo(A.call(o.prev), n, r);
            }
            function Ao(t) {
                if (wo) return;
                const e = ee.call(t);
                if (O(e)) return;
                const n = te.call(t),
                    r = go(n);
                if (-1 !== v.call(r.inner, e)) return;
                const o = Qt.call(t),
                    i = yo(n, e);
                1 === i && vo(r.next, o, e),
                    2 === i && vo(A.call(r.prev), o, e);
            }
            function No(t, e) {
                if (!fo(e)) return !1;
                const n = Je(e);
                let r = e.getRootNode();
                for (; r !== n && r !== t; ) {
                    const t = r.host;
                    if ('-1' === Et.call(t, 'tabindex')) return !1;
                    r = t && t.getRootNode();
                }
                return !0;
            }
            function So(t) {
                Bt.call(t, 'focusin', To, !0);
            }
            function ko(t) {
                const e = Je(t);
                X(e, ho) ||
                    (W(e, ho, !0),
                    Ct.call(e, 'mousedown', Co, !0),
                    Ct.call(
                        e,
                        'mouseup',
                        () => {
                            setTimeout(Eo);
                        },
                        !0
                    ),
                    Ct.call(e, 'dragstart', Eo, !0));
            }
            function Ro(t) {
                Bt.call(t, 'focusin', Ao, !0);
            }
            const { blur: Fo, focus: Bo } = HTMLElement.prototype;
            function _o() {
                return jn(this) && M(St.call(this, 'tabindex'))
                    ? 0
                    : Yt.call(this);
            }
            function Lo(t) {
                const e = jn(this),
                    r = Yt.call(this),
                    o = St.call(this, 'tabindex');
                zt.call(this, t);
                const i = Yt.call(this),
                    s = St.call(this, 'tabindex'),
                    a = r !== i;
                var c;
                (o &&
                    (a || M(s)) &&
                    (-1 === r && Ro(this), 0 === r && e && So(this)),
                M(s)) ||
                    (o && s && M(a)) ||
                    (-1 === i &&
                        ((c = this),
                        n.invariant(
                            -1 === Yt.call(c),
                            `Invalid attempt to handle focus in  ${$(c)}. ${$(
                                c
                            )} should have tabIndex -1, but has tabIndex ${Yt.call(
                                c
                            )}`
                        ),
                        ko(c),
                        So(c),
                        Ct.call(c, 'focusin', Ao, !0)),
                    0 === i &&
                        e &&
                        (function (t) {
                            n.invariant(
                                jn(t),
                                `Invalid attempt to handle focus event for ${$(
                                    t
                                )}. ${$(
                                    t
                                )} should have delegates focus true, but is not delegating focus`
                            ),
                                ko(t),
                                Ro(t),
                                Ct.call(t, 'focusin', To, !0);
                        })(this));
            }
            function xo() {
                if (jn(this)) {
                    const t = (function (t) {
                        const e = Je(t),
                            n = ne.call(e);
                        return O(n) || 0 != (st.call(t, n) & K) ? n : null;
                    })(this);
                    if (!O(t)) return void t.blur();
                }
                return Fo.call(this);
            }
            function Oo() {
                Co(),
                    zn(this) && jn(this)
                        ? po.call(this)
                        : (Bo.apply(this, arguments), Eo());
            }
            i(HTMLElement.prototype, {
                tabIndex: {
                    get() {
                        return zn(this) ? _o.call(this) : Yt.call(this);
                    },
                    set(t) {
                        return zn(this) ? Lo.call(this, t) : zt.call(this, t);
                    },
                    enumerable: !0,
                    configurable: !0
                },
                blur: {
                    value() {
                        if (zn(this)) return xo.call(this);
                        Fo.call(this);
                    },
                    enumerable: !0,
                    writable: !0,
                    configurable: !0
                },
                focus: {
                    value() {
                        Oo.apply(this, arguments);
                    },
                    enumerable: !0,
                    writable: !0,
                    configurable: !0
                }
            });
            const {
                addEventListener: Po,
                removeEventListener: Mo
            } = Node.prototype;
            function Io(t, e, n) {
                zn(this)
                    ? (function (t, e, n, r) {
                          if (!I(n))
                              throw new TypeError(
                                  `Invalid second argument for Element.addEventListener() in ${$(
                                      t
                                  )} for event "${e}". Expected an EventListener but received ${n}.`
                              );
                          vn(t, e, mn(t, n));
                      })(this, t, e)
                    : Po.call(this, t, e, n);
            }
            function Do(t, e, n) {
                zn(this)
                    ? (function (t, e, n, r) {
                          wn(t, e, mn(t, n));
                      })(this, t, e)
                    : Mo.call(this, t, e, n);
            }
            'undefined' != typeof EventTarget
                ? i(EventTarget.prototype, {
                      addEventListener: {
                          value: Io,
                          enumerable: !0,
                          writable: !0,
                          configurable: !0
                      },
                      removeEventListener: {
                          value: Do,
                          enumerable: !0,
                          writable: !0,
                          configurable: !0
                      }
                  })
                : i(Node.prototype, {
                      addEventListener: {
                          value: Io,
                          enumerable: !0,
                          writable: !0,
                          configurable: !0
                      },
                      removeEventListener: {
                          value: Do,
                          enumerable: !0,
                          writable: !0,
                          configurable: !0
                      }
                  });
            s(Element.prototype, '$shadowToken$', {
                set(t) {
                    const e = this.$$ShadowTokenKey$$;
                    x(e) || e === t || Ft.call(this, e),
                        x(t) || _t.call(this, t, ''),
                        (this.$$ShadowTokenKey$$ = t);
                },
                get() {
                    return this.$$ShadowTokenKey$$;
                },
                configurable: !0
            });
            const $o = function () {};
            let Uo;
            const Ho = { childList: !0 };
            function jo(t, e, n) {
                const r = Un(t);
                if (r !== e && (Hn(t, e), t instanceof Element)) {
                    if (
                        ((function (t, e) {
                            t.$shadowToken$ = e;
                        })(t, n),
                        zn(t))
                    )
                        return;
                    x(r) && ge.call(Uo, t, Ho);
                    const o = vt.call(t);
                    for (let t = 0, r = o.length; t < r; t += 1) jo(o[t], e, n);
                }
            }
            function qo(t) {
                if (
                    (x(Uo) &&
                        (Uo = new de((t) => {
                            R.call(t, (t) => {
                                const {
                                        target: e,
                                        addedNodes: n,
                                        removedNodes: r
                                    } = t,
                                    o = Un(e),
                                    i = e.$shadowToken$;
                                for (let t = 0, n = r.length; t < n; t += 1) {
                                    const n = r[t];
                                    st.call(e, n) &
                                        Node.DOCUMENT_POSITION_CONTAINED_BY ||
                                        jo(n, $o, void 0);
                                }
                                for (let t = 0, r = n.length; t < r; t += 1) {
                                    const r = n[t];
                                    st.call(e, r) &
                                        Node.DOCUMENT_POSITION_CONTAINED_BY &&
                                        jo(r, o, i);
                                }
                            });
                        })),
                    x(Un(t)))
                )
                    throw new Error('Invalid Element');
                ge.call(Uo, t, Ho);
            }
            s(Element.prototype, '$domManual$', {
                set(t) {
                    (this.$$DomManualKey$$ = t), P(t) && qo(this);
                },
                get() {
                    return this.$$DomManualKey$$;
                },
                configurable: !0
            });
        },
        function (t, e, n) {
            var r = n(16),
                o = n(2)('socket.io-client:url');
            t.exports = function (t, e) {
                var n = t;
                (e = e || ('undefined' != typeof location && location)),
                    null == t && (t = e.protocol + '//' + e.host);
                'string' == typeof t &&
                    ('/' === t.charAt(0) &&
                        (t = '/' === t.charAt(1) ? e.protocol + t : e.host + t),
                    /^(https?|wss?):\/\//.test(t) ||
                        (o('protocol-less url %s', t),
                        (t =
                            void 0 !== e
                                ? e.protocol + '//' + t
                                : 'https://' + t)),
                    o('parse %s', t),
                    (n = r(t)));
                n.port ||
                    (/^(http|ws)$/.test(n.protocol)
                        ? (n.port = '80')
                        : /^(http|ws)s$/.test(n.protocol) && (n.port = '443'));
                n.path = n.path || '/';
                var i =
                    -1 !== n.host.indexOf(':') ? '[' + n.host + ']' : n.host;
                return (
                    (n.id = n.protocol + '://' + i + ':' + n.port),
                    (n.href =
                        n.protocol +
                        '://' +
                        i +
                        (e && e.port === n.port ? '' : ':' + n.port)),
                    n
                );
            };
        },
        function (t, e, n) {
            t.exports = function (t) {
                function e(t) {
                    let e = 0;
                    for (let n = 0; n < t.length; n++)
                        (e = (e << 5) - e + t.charCodeAt(n)), (e |= 0);
                    return r.colors[Math.abs(e) % r.colors.length];
                }
                function r(t) {
                    let n;
                    function s(...t) {
                        if (!s.enabled) return;
                        const e = s,
                            o = Number(new Date()),
                            i = o - (n || o);
                        (e.diff = i),
                            (e.prev = n),
                            (e.curr = o),
                            (n = o),
                            (t[0] = r.coerce(t[0])),
                            'string' != typeof t[0] && t.unshift('%O');
                        let a = 0;
                        (t[0] = t[0].replace(/%([a-zA-Z%])/g, (n, o) => {
                            if ('%%' === n) return n;
                            a++;
                            const i = r.formatters[o];
                            if ('function' == typeof i) {
                                const r = t[a];
                                (n = i.call(e, r)), t.splice(a, 1), a--;
                            }
                            return n;
                        })),
                            r.formatArgs.call(e, t);
                        (e.log || r.log).apply(e, t);
                    }
                    return (
                        (s.namespace = t),
                        (s.enabled = r.enabled(t)),
                        (s.useColors = r.useColors()),
                        (s.color = e(t)),
                        (s.destroy = o),
                        (s.extend = i),
                        'function' == typeof r.init && r.init(s),
                        r.instances.push(s),
                        s
                    );
                }
                function o() {
                    const t = r.instances.indexOf(this);
                    return -1 !== t && (r.instances.splice(t, 1), !0);
                }
                function i(t, e) {
                    const n = r(this.namespace + (void 0 === e ? ':' : e) + t);
                    return (n.log = this.log), n;
                }
                function s(t) {
                    return t
                        .toString()
                        .substring(2, t.toString().length - 2)
                        .replace(/\.\*\?$/, '*');
                }
                return (
                    (r.debug = r),
                    (r.default = r),
                    (r.coerce = function (t) {
                        if (t instanceof Error) return t.stack || t.message;
                        return t;
                    }),
                    (r.disable = function () {
                        const t = [
                            ...r.names.map(s),
                            ...r.skips.map(s).map((t) => '-' + t)
                        ].join(',');
                        return r.enable(''), t;
                    }),
                    (r.enable = function (t) {
                        let e;
                        r.save(t), (r.names = []), (r.skips = []);
                        const n = ('string' == typeof t ? t : '').split(
                                /[\s,]+/
                            ),
                            o = n.length;
                        for (e = 0; e < o; e++)
                            n[e] &&
                                ('-' === (t = n[e].replace(/\*/g, '.*?'))[0]
                                    ? r.skips.push(
                                          new RegExp('^' + t.substr(1) + '$')
                                      )
                                    : r.names.push(new RegExp('^' + t + '$')));
                        for (e = 0; e < r.instances.length; e++) {
                            const t = r.instances[e];
                            t.enabled = r.enabled(t.namespace);
                        }
                    }),
                    (r.enabled = function (t) {
                        if ('*' === t[t.length - 1]) return !0;
                        let e, n;
                        for (e = 0, n = r.skips.length; e < n; e++)
                            if (r.skips[e].test(t)) return !1;
                        for (e = 0, n = r.names.length; e < n; e++)
                            if (r.names[e].test(t)) return !0;
                        return !1;
                    }),
                    (r.humanize = n(32)),
                    Object.keys(t).forEach((e) => {
                        r[e] = t[e];
                    }),
                    (r.instances = []),
                    (r.names = []),
                    (r.skips = []),
                    (r.formatters = {}),
                    (r.selectColor = e),
                    r.enable(r.load()),
                    r
                );
            };
        },
        function (t, e) {
            var n = 1e3,
                r = 6e4,
                o = 60 * r,
                i = 24 * o;
            function s(t, e, n, r) {
                var o = e >= 1.5 * n;
                return Math.round(t / n) + ' ' + r + (o ? 's' : '');
            }
            t.exports = function (t, e) {
                e = e || {};
                var a = typeof t;
                if ('string' === a && t.length > 0)
                    return (function (t) {
                        if ((t = String(t)).length > 100) return;
                        var e = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
                            t
                        );
                        if (!e) return;
                        var s = parseFloat(e[1]);
                        switch ((e[2] || 'ms').toLowerCase()) {
                            case 'years':
                            case 'year':
                            case 'yrs':
                            case 'yr':
                            case 'y':
                                return 315576e5 * s;
                            case 'weeks':
                            case 'week':
                            case 'w':
                                return 6048e5 * s;
                            case 'days':
                            case 'day':
                            case 'd':
                                return s * i;
                            case 'hours':
                            case 'hour':
                            case 'hrs':
                            case 'hr':
                            case 'h':
                                return s * o;
                            case 'minutes':
                            case 'minute':
                            case 'mins':
                            case 'min':
                            case 'm':
                                return s * r;
                            case 'seconds':
                            case 'second':
                            case 'secs':
                            case 'sec':
                            case 's':
                                return s * n;
                            case 'milliseconds':
                            case 'millisecond':
                            case 'msecs':
                            case 'msec':
                            case 'ms':
                                return s;
                            default:
                                return;
                        }
                    })(t);
                if ('number' === a && isFinite(t))
                    return e.long
                        ? (function (t) {
                              var e = Math.abs(t);
                              if (e >= i) return s(t, e, i, 'day');
                              if (e >= o) return s(t, e, o, 'hour');
                              if (e >= r) return s(t, e, r, 'minute');
                              if (e >= n) return s(t, e, n, 'second');
                              return t + ' ms';
                          })(t)
                        : (function (t) {
                              var e = Math.abs(t);
                              if (e >= i) return Math.round(t / i) + 'd';
                              if (e >= o) return Math.round(t / o) + 'h';
                              if (e >= r) return Math.round(t / r) + 'm';
                              if (e >= n) return Math.round(t / n) + 's';
                              return t + 'ms';
                          })(t);
                throw new Error(
                    'val is not a non-empty string or a valid number. val=' +
                        JSON.stringify(t)
                );
            };
        },
        function (t, e, n) {
            (function (r) {
                function o() {
                    var t;
                    try {
                        t = e.storage.debug;
                    } catch (t) {}
                    return (
                        !t && void 0 !== r && 'env' in r && (t = r.env.DEBUG), t
                    );
                }
                ((e = t.exports = n(34)).log = function () {
                    return (
                        'object' == typeof console &&
                        console.log &&
                        Function.prototype.apply.call(
                            console.log,
                            console,
                            arguments
                        )
                    );
                }),
                    (e.formatArgs = function (t) {
                        var n = this.useColors;
                        if (
                            ((t[0] =
                                (n ? '%c' : '') +
                                this.namespace +
                                (n ? ' %c' : ' ') +
                                t[0] +
                                (n ? '%c ' : ' ') +
                                '+' +
                                e.humanize(this.diff)),
                            !n)
                        )
                            return;
                        var r = 'color: ' + this.color;
                        t.splice(1, 0, r, 'color: inherit');
                        var o = 0,
                            i = 0;
                        t[0].replace(/%[a-zA-Z%]/g, function (t) {
                            '%%' !== t && (o++, '%c' === t && (i = o));
                        }),
                            t.splice(i, 0, r);
                    }),
                    (e.save = function (t) {
                        try {
                            null == t
                                ? e.storage.removeItem('debug')
                                : (e.storage.debug = t);
                        } catch (t) {}
                    }),
                    (e.load = o),
                    (e.useColors = function () {
                        if (
                            'undefined' != typeof window &&
                            window.process &&
                            'renderer' === window.process.type
                        )
                            return !0;
                        if (
                            'undefined' != typeof navigator &&
                            navigator.userAgent &&
                            navigator.userAgent
                                .toLowerCase()
                                .match(/(edge|trident)\/(\d+)/)
                        )
                            return !1;
                        return (
                            ('undefined' != typeof document &&
                                document.documentElement &&
                                document.documentElement.style &&
                                document.documentElement.style
                                    .WebkitAppearance) ||
                            ('undefined' != typeof window &&
                                window.console &&
                                (window.console.firebug ||
                                    (window.console.exception &&
                                        window.console.table))) ||
                            ('undefined' != typeof navigator &&
                                navigator.userAgent &&
                                navigator.userAgent
                                    .toLowerCase()
                                    .match(/firefox\/(\d+)/) &&
                                parseInt(RegExp.$1, 10) >= 31) ||
                            ('undefined' != typeof navigator &&
                                navigator.userAgent &&
                                navigator.userAgent
                                    .toLowerCase()
                                    .match(/applewebkit\/(\d+)/))
                        );
                    }),
                    (e.storage =
                        'undefined' != typeof chrome &&
                        void 0 !== chrome.storage
                            ? chrome.storage.local
                            : (function () {
                                  try {
                                      return window.localStorage;
                                  } catch (t) {}
                              })()),
                    (e.colors = [
                        '#0000CC',
                        '#0000FF',
                        '#0033CC',
                        '#0033FF',
                        '#0066CC',
                        '#0066FF',
                        '#0099CC',
                        '#0099FF',
                        '#00CC00',
                        '#00CC33',
                        '#00CC66',
                        '#00CC99',
                        '#00CCCC',
                        '#00CCFF',
                        '#3300CC',
                        '#3300FF',
                        '#3333CC',
                        '#3333FF',
                        '#3366CC',
                        '#3366FF',
                        '#3399CC',
                        '#3399FF',
                        '#33CC00',
                        '#33CC33',
                        '#33CC66',
                        '#33CC99',
                        '#33CCCC',
                        '#33CCFF',
                        '#6600CC',
                        '#6600FF',
                        '#6633CC',
                        '#6633FF',
                        '#66CC00',
                        '#66CC33',
                        '#9900CC',
                        '#9900FF',
                        '#9933CC',
                        '#9933FF',
                        '#99CC00',
                        '#99CC33',
                        '#CC0000',
                        '#CC0033',
                        '#CC0066',
                        '#CC0099',
                        '#CC00CC',
                        '#CC00FF',
                        '#CC3300',
                        '#CC3333',
                        '#CC3366',
                        '#CC3399',
                        '#CC33CC',
                        '#CC33FF',
                        '#CC6600',
                        '#CC6633',
                        '#CC9900',
                        '#CC9933',
                        '#CCCC00',
                        '#CCCC33',
                        '#FF0000',
                        '#FF0033',
                        '#FF0066',
                        '#FF0099',
                        '#FF00CC',
                        '#FF00FF',
                        '#FF3300',
                        '#FF3333',
                        '#FF3366',
                        '#FF3399',
                        '#FF33CC',
                        '#FF33FF',
                        '#FF6600',
                        '#FF6633',
                        '#FF9900',
                        '#FF9933',
                        '#FFCC00',
                        '#FFCC33'
                    ]),
                    (e.formatters.j = function (t) {
                        try {
                            return JSON.stringify(t);
                        } catch (t) {
                            return '[UnexpectedJSONParseError]: ' + t.message;
                        }
                    }),
                    e.enable(o());
            }.call(this, n(7)));
        },
        function (t, e, n) {
            function r(t) {
                var n;
                function r() {
                    if (r.enabled) {
                        var t = r,
                            o = +new Date(),
                            i = o - (n || o);
                        (t.diff = i), (t.prev = n), (t.curr = o), (n = o);
                        for (
                            var s = new Array(arguments.length), a = 0;
                            a < s.length;
                            a++
                        )
                            s[a] = arguments[a];
                        (s[0] = e.coerce(s[0])),
                            'string' != typeof s[0] && s.unshift('%O');
                        var c = 0;
                        (s[0] = s[0].replace(/%([a-zA-Z%])/g, function (n, r) {
                            if ('%%' === n) return n;
                            c++;
                            var o = e.formatters[r];
                            if ('function' == typeof o) {
                                var i = s[c];
                                (n = o.call(t, i)), s.splice(c, 1), c--;
                            }
                            return n;
                        })),
                            e.formatArgs.call(t, s);
                        var l = r.log || e.log || console.log.bind(console);
                        l.apply(t, s);
                    }
                }
                return (
                    (r.namespace = t),
                    (r.enabled = e.enabled(t)),
                    (r.useColors = e.useColors()),
                    (r.color = (function (t) {
                        var n,
                            r = 0;
                        for (n in t)
                            (r = (r << 5) - r + t.charCodeAt(n)), (r |= 0);
                        return e.colors[Math.abs(r) % e.colors.length];
                    })(t)),
                    (r.destroy = o),
                    'function' == typeof e.init && e.init(r),
                    e.instances.push(r),
                    r
                );
            }
            function o() {
                var t = e.instances.indexOf(this);
                return -1 !== t && (e.instances.splice(t, 1), !0);
            }
            ((e = t.exports = r.debug = r.default = r).coerce = function (t) {
                return t instanceof Error ? t.stack || t.message : t;
            }),
                (e.disable = function () {
                    e.enable('');
                }),
                (e.enable = function (t) {
                    var n;
                    e.save(t), (e.names = []), (e.skips = []);
                    var r = ('string' == typeof t ? t : '').split(/[\s,]+/),
                        o = r.length;
                    for (n = 0; n < o; n++)
                        r[n] &&
                            ('-' === (t = r[n].replace(/\*/g, '.*?'))[0]
                                ? e.skips.push(
                                      new RegExp('^' + t.substr(1) + '$')
                                  )
                                : e.names.push(new RegExp('^' + t + '$')));
                    for (n = 0; n < e.instances.length; n++) {
                        var i = e.instances[n];
                        i.enabled = e.enabled(i.namespace);
                    }
                }),
                (e.enabled = function (t) {
                    if ('*' === t[t.length - 1]) return !0;
                    var n, r;
                    for (n = 0, r = e.skips.length; n < r; n++)
                        if (e.skips[n].test(t)) return !1;
                    for (n = 0, r = e.names.length; n < r; n++)
                        if (e.names[n].test(t)) return !0;
                    return !1;
                }),
                (e.humanize = n(35)),
                (e.instances = []),
                (e.names = []),
                (e.skips = []),
                (e.formatters = {});
        },
        function (t, e) {
            var n = 1e3,
                r = 6e4,
                o = 60 * r,
                i = 24 * o;
            function s(t, e, n) {
                if (!(t < e))
                    return t < 1.5 * e
                        ? Math.floor(t / e) + ' ' + n
                        : Math.ceil(t / e) + ' ' + n + 's';
            }
            t.exports = function (t, e) {
                e = e || {};
                var a,
                    c = typeof t;
                if ('string' === c && t.length > 0)
                    return (function (t) {
                        if ((t = String(t)).length > 100) return;
                        var e = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
                            t
                        );
                        if (!e) return;
                        var s = parseFloat(e[1]);
                        switch ((e[2] || 'ms').toLowerCase()) {
                            case 'years':
                            case 'year':
                            case 'yrs':
                            case 'yr':
                            case 'y':
                                return 315576e5 * s;
                            case 'days':
                            case 'day':
                            case 'd':
                                return s * i;
                            case 'hours':
                            case 'hour':
                            case 'hrs':
                            case 'hr':
                            case 'h':
                                return s * o;
                            case 'minutes':
                            case 'minute':
                            case 'mins':
                            case 'min':
                            case 'm':
                                return s * r;
                            case 'seconds':
                            case 'second':
                            case 'secs':
                            case 'sec':
                            case 's':
                                return s * n;
                            case 'milliseconds':
                            case 'millisecond':
                            case 'msecs':
                            case 'msec':
                            case 'ms':
                                return s;
                            default:
                                return;
                        }
                    })(t);
                if ('number' === c && !1 === isNaN(t))
                    return e.long
                        ? s((a = t), i, 'day') ||
                              s(a, o, 'hour') ||
                              s(a, r, 'minute') ||
                              s(a, n, 'second') ||
                              a + ' ms'
                        : (function (t) {
                              if (t >= i) return Math.round(t / i) + 'd';
                              if (t >= o) return Math.round(t / o) + 'h';
                              if (t >= r) return Math.round(t / r) + 'm';
                              if (t >= n) return Math.round(t / n) + 's';
                              return t + 'ms';
                          })(t);
                throw new Error(
                    'val is not a non-empty string or a valid number. val=' +
                        JSON.stringify(t)
                );
            };
        },
        function (t, e, n) {
            var r = n(17),
                o = n(18),
                i = Object.prototype.toString,
                s =
                    'function' == typeof Blob ||
                    ('undefined' != typeof Blob &&
                        '[object BlobConstructor]' === i.call(Blob)),
                a =
                    'function' == typeof File ||
                    ('undefined' != typeof File &&
                        '[object FileConstructor]' === i.call(File));
            (e.deconstructPacket = function (t) {
                var e = [],
                    n = t.data,
                    i = t;
                return (
                    (i.data = (function t(e, n) {
                        if (!e) return e;
                        if (o(e)) {
                            var i = { _placeholder: !0, num: n.length };
                            return n.push(e), i;
                        }
                        if (r(e)) {
                            for (
                                var s = new Array(e.length), a = 0;
                                a < e.length;
                                a++
                            )
                                s[a] = t(e[a], n);
                            return s;
                        }
                        if ('object' == typeof e && !(e instanceof Date)) {
                            s = {};
                            for (var c in e) s[c] = t(e[c], n);
                            return s;
                        }
                        return e;
                    })(n, e)),
                    (i.attachments = e.length),
                    { packet: i, buffers: e }
                );
            }),
                (e.reconstructPacket = function (t, e) {
                    return (
                        (t.data = (function t(e, n) {
                            if (!e) return e;
                            if (e && e._placeholder) return n[e.num];
                            if (r(e))
                                for (var o = 0; o < e.length; o++)
                                    e[o] = t(e[o], n);
                            else if ('object' == typeof e)
                                for (var i in e) e[i] = t(e[i], n);
                            return e;
                        })(t.data, e)),
                        (t.attachments = void 0),
                        t
                    );
                }),
                (e.removeBlobs = function (t, e) {
                    var n = 0,
                        i = t;
                    !(function t(c, l, u) {
                        if (!c) return c;
                        if (
                            (s && c instanceof Blob) ||
                            (a && c instanceof File)
                        ) {
                            n++;
                            var h = new FileReader();
                            (h.onload = function () {
                                u ? (u[l] = this.result) : (i = this.result),
                                    --n || e(i);
                            }),
                                h.readAsArrayBuffer(c);
                        } else if (r(c))
                            for (var f = 0; f < c.length; f++) t(c[f], f, c);
                        else if ('object' == typeof c && !o(c))
                            for (var p in c) t(c[p], p, c);
                    })(i),
                        n || e(i);
                });
        },
        function (t, e, n) {
            'use strict';
            (e.byteLength = function (t) {
                var e = l(t),
                    n = e[0],
                    r = e[1];
                return (3 * (n + r)) / 4 - r;
            }),
                (e.toByteArray = function (t) {
                    var e,
                        n,
                        r = l(t),
                        s = r[0],
                        a = r[1],
                        c = new i(
                            (function (t, e, n) {
                                return (3 * (e + n)) / 4 - n;
                            })(0, s, a)
                        ),
                        u = 0,
                        h = a > 0 ? s - 4 : s;
                    for (n = 0; n < h; n += 4)
                        (e =
                            (o[t.charCodeAt(n)] << 18) |
                            (o[t.charCodeAt(n + 1)] << 12) |
                            (o[t.charCodeAt(n + 2)] << 6) |
                            o[t.charCodeAt(n + 3)]),
                            (c[u++] = (e >> 16) & 255),
                            (c[u++] = (e >> 8) & 255),
                            (c[u++] = 255 & e);
                    2 === a &&
                        ((e =
                            (o[t.charCodeAt(n)] << 2) |
                            (o[t.charCodeAt(n + 1)] >> 4)),
                        (c[u++] = 255 & e));
                    1 === a &&
                        ((e =
                            (o[t.charCodeAt(n)] << 10) |
                            (o[t.charCodeAt(n + 1)] << 4) |
                            (o[t.charCodeAt(n + 2)] >> 2)),
                        (c[u++] = (e >> 8) & 255),
                        (c[u++] = 255 & e));
                    return c;
                }),
                (e.fromByteArray = function (t) {
                    for (
                        var e,
                            n = t.length,
                            o = n % 3,
                            i = [],
                            s = 0,
                            a = n - o;
                        s < a;
                        s += 16383
                    )
                        i.push(u(t, s, s + 16383 > a ? a : s + 16383));
                    1 === o
                        ? ((e = t[n - 1]),
                          i.push(r[e >> 2] + r[(e << 4) & 63] + '=='))
                        : 2 === o &&
                          ((e = (t[n - 2] << 8) + t[n - 1]),
                          i.push(
                              r[e >> 10] +
                                  r[(e >> 4) & 63] +
                                  r[(e << 2) & 63] +
                                  '='
                          ));
                    return i.join('');
                });
            for (
                var r = [],
                    o = [],
                    i = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
                    s =
                        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
                    a = 0,
                    c = s.length;
                a < c;
                ++a
            )
                (r[a] = s[a]), (o[s.charCodeAt(a)] = a);
            function l(t) {
                var e = t.length;
                if (e % 4 > 0)
                    throw new Error(
                        'Invalid string. Length must be a multiple of 4'
                    );
                var n = t.indexOf('=');
                return -1 === n && (n = e), [n, n === e ? 0 : 4 - (n % 4)];
            }
            function u(t, e, n) {
                for (var o, i, s = [], a = e; a < n; a += 3)
                    (o =
                        ((t[a] << 16) & 16711680) +
                        ((t[a + 1] << 8) & 65280) +
                        (255 & t[a + 2])),
                        s.push(
                            r[((i = o) >> 18) & 63] +
                                r[(i >> 12) & 63] +
                                r[(i >> 6) & 63] +
                                r[63 & i]
                        );
                return s.join('');
            }
            (o['-'.charCodeAt(0)] = 62), (o['_'.charCodeAt(0)] = 63);
        },
        function (t, e) {
            (e.read = function (t, e, n, r, o) {
                var i,
                    s,
                    a = 8 * o - r - 1,
                    c = (1 << a) - 1,
                    l = c >> 1,
                    u = -7,
                    h = n ? o - 1 : 0,
                    f = n ? -1 : 1,
                    p = t[e + h];
                for (
                    h += f, i = p & ((1 << -u) - 1), p >>= -u, u += a;
                    u > 0;
                    i = 256 * i + t[e + h], h += f, u -= 8
                );
                for (
                    s = i & ((1 << -u) - 1), i >>= -u, u += r;
                    u > 0;
                    s = 256 * s + t[e + h], h += f, u -= 8
                );
                if (0 === i) i = 1 - l;
                else {
                    if (i === c) return s ? NaN : (1 / 0) * (p ? -1 : 1);
                    (s += Math.pow(2, r)), (i -= l);
                }
                return (p ? -1 : 1) * s * Math.pow(2, i - r);
            }),
                (e.write = function (t, e, n, r, o, i) {
                    var s,
                        a,
                        c,
                        l = 8 * i - o - 1,
                        u = (1 << l) - 1,
                        h = u >> 1,
                        f = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                        p = r ? 0 : i - 1,
                        d = r ? 1 : -1,
                        g = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0;
                    for (
                        e = Math.abs(e),
                            isNaN(e) || e === 1 / 0
                                ? ((a = isNaN(e) ? 1 : 0), (s = u))
                                : ((s = Math.floor(Math.log(e) / Math.LN2)),
                                  e * (c = Math.pow(2, -s)) < 1 &&
                                      (s--, (c *= 2)),
                                  (e +=
                                      s + h >= 1
                                          ? f / c
                                          : f * Math.pow(2, 1 - h)) *
                                      c >=
                                      2 && (s++, (c /= 2)),
                                  s + h >= u
                                      ? ((a = 0), (s = u))
                                      : s + h >= 1
                                      ? ((a = (e * c - 1) * Math.pow(2, o)),
                                        (s += h))
                                      : ((a =
                                            e *
                                            Math.pow(2, h - 1) *
                                            Math.pow(2, o)),
                                        (s = 0)));
                        o >= 8;
                        t[n + p] = 255 & a, p += d, a /= 256, o -= 8
                    );
                    for (
                        s = (s << o) | a, l += o;
                        l > 0;
                        t[n + p] = 255 & s, p += d, s /= 256, l -= 8
                    );
                    t[n + p - d] |= 128 * g;
                });
        },
        function (t, e) {
            var n = {}.toString;
            t.exports =
                Array.isArray ||
                function (t) {
                    return '[object Array]' == n.call(t);
                };
        },
        function (t, e, n) {
            (t.exports = n(41)), (t.exports.parser = n(1));
        },
        function (t, e, n) {
            var r = n(20),
                o = n(14),
                i = n(5)('engine.io-client:socket'),
                s = n(24),
                a = n(1),
                c = n(16),
                l = n(3);
            function u(t, e) {
                if (!(this instanceof u)) return new u(t, e);
                (e = e || {}),
                    t && 'object' == typeof t && ((e = t), (t = null)),
                    t
                        ? ((t = c(t)),
                          (e.hostname = t.host),
                          (e.secure =
                              'https' === t.protocol || 'wss' === t.protocol),
                          (e.port = t.port),
                          t.query && (e.query = t.query))
                        : e.host && (e.hostname = c(e.host).host),
                    (this.secure =
                        null != e.secure
                            ? e.secure
                            : 'undefined' != typeof location &&
                              'https:' === location.protocol),
                    e.hostname &&
                        !e.port &&
                        (e.port = this.secure ? '443' : '80'),
                    (this.agent = e.agent || !1),
                    (this.hostname =
                        e.hostname ||
                        ('undefined' != typeof location
                            ? location.hostname
                            : 'localhost')),
                    (this.port =
                        e.port ||
                        ('undefined' != typeof location && location.port
                            ? location.port
                            : this.secure
                            ? 443
                            : 80)),
                    (this.query = e.query || {}),
                    'string' == typeof this.query &&
                        (this.query = l.decode(this.query)),
                    (this.upgrade = !1 !== e.upgrade),
                    (this.path =
                        (e.path || '/engine.io').replace(/\/$/, '') + '/'),
                    (this.forceJSONP = !!e.forceJSONP),
                    (this.jsonp = !1 !== e.jsonp),
                    (this.forceBase64 = !!e.forceBase64),
                    (this.enablesXDR = !!e.enablesXDR),
                    (this.withCredentials = !1 !== e.withCredentials),
                    (this.timestampParam = e.timestampParam || 't'),
                    (this.timestampRequests = e.timestampRequests),
                    (this.transports = e.transports || [
                        'polling',
                        'websocket'
                    ]),
                    (this.transportOptions = e.transportOptions || {}),
                    (this.readyState = ''),
                    (this.writeBuffer = []),
                    (this.prevBufferLen = 0),
                    (this.policyPort = e.policyPort || 843),
                    (this.rememberUpgrade = e.rememberUpgrade || !1),
                    (this.binaryType = null),
                    (this.onlyBinaryUpgrades = e.onlyBinaryUpgrades),
                    (this.perMessageDeflate =
                        !1 !== e.perMessageDeflate &&
                        (e.perMessageDeflate || {})),
                    !0 === this.perMessageDeflate &&
                        (this.perMessageDeflate = {}),
                    this.perMessageDeflate &&
                        null == this.perMessageDeflate.threshold &&
                        (this.perMessageDeflate.threshold = 1024),
                    (this.pfx = e.pfx || null),
                    (this.key = e.key || null),
                    (this.passphrase = e.passphrase || null),
                    (this.cert = e.cert || null),
                    (this.ca = e.ca || null),
                    (this.ciphers = e.ciphers || null),
                    (this.rejectUnauthorized =
                        void 0 === e.rejectUnauthorized ||
                        e.rejectUnauthorized),
                    (this.forceNode = !!e.forceNode),
                    (this.isReactNative =
                        'undefined' != typeof navigator &&
                        'string' == typeof navigator.product &&
                        'reactnative' === navigator.product.toLowerCase()),
                    ('undefined' == typeof self || this.isReactNative) &&
                        (e.extraHeaders &&
                            Object.keys(e.extraHeaders).length > 0 &&
                            (this.extraHeaders = e.extraHeaders),
                        e.localAddress && (this.localAddress = e.localAddress)),
                    (this.id = null),
                    (this.upgrades = null),
                    (this.pingInterval = null),
                    (this.pingTimeout = null),
                    (this.pingIntervalTimer = null),
                    (this.pingTimeoutTimer = null),
                    this.open();
            }
            (t.exports = u),
                (u.priorWebsocketSuccess = !1),
                o(u.prototype),
                (u.protocol = a.protocol),
                (u.Socket = u),
                (u.Transport = n(13)),
                (u.transports = n(20)),
                (u.parser = n(1)),
                (u.prototype.createTransport = function (t) {
                    i('creating transport "%s"', t);
                    var e = (function (t) {
                        var e = {};
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                        return e;
                    })(this.query);
                    (e.EIO = a.protocol), (e.transport = t);
                    var n = this.transportOptions[t] || {};
                    return (
                        this.id && (e.sid = this.id),
                        new r[t]({
                            query: e,
                            socket: this,
                            agent: n.agent || this.agent,
                            hostname: n.hostname || this.hostname,
                            port: n.port || this.port,
                            secure: n.secure || this.secure,
                            path: n.path || this.path,
                            forceJSONP: n.forceJSONP || this.forceJSONP,
                            jsonp: n.jsonp || this.jsonp,
                            forceBase64: n.forceBase64 || this.forceBase64,
                            enablesXDR: n.enablesXDR || this.enablesXDR,
                            withCredentials:
                                n.withCredentials || this.withCredentials,
                            timestampRequests:
                                n.timestampRequests || this.timestampRequests,
                            timestampParam:
                                n.timestampParam || this.timestampParam,
                            policyPort: n.policyPort || this.policyPort,
                            pfx: n.pfx || this.pfx,
                            key: n.key || this.key,
                            passphrase: n.passphrase || this.passphrase,
                            cert: n.cert || this.cert,
                            ca: n.ca || this.ca,
                            ciphers: n.ciphers || this.ciphers,
                            rejectUnauthorized:
                                n.rejectUnauthorized || this.rejectUnauthorized,
                            perMessageDeflate:
                                n.perMessageDeflate || this.perMessageDeflate,
                            extraHeaders: n.extraHeaders || this.extraHeaders,
                            forceNode: n.forceNode || this.forceNode,
                            localAddress: n.localAddress || this.localAddress,
                            requestTimeout:
                                n.requestTimeout || this.requestTimeout,
                            protocols: n.protocols || void 0,
                            isReactNative: this.isReactNative
                        })
                    );
                }),
                (u.prototype.open = function () {
                    var t;
                    if (
                        this.rememberUpgrade &&
                        u.priorWebsocketSuccess &&
                        -1 !== this.transports.indexOf('websocket')
                    )
                        t = 'websocket';
                    else {
                        if (0 === this.transports.length) {
                            var e = this;
                            return void setTimeout(function () {
                                e.emit('error', 'No transports available');
                            }, 0);
                        }
                        t = this.transports[0];
                    }
                    this.readyState = 'opening';
                    try {
                        t = this.createTransport(t);
                    } catch (t) {
                        return this.transports.shift(), void this.open();
                    }
                    t.open(), this.setTransport(t);
                }),
                (u.prototype.setTransport = function (t) {
                    i('setting transport %s', t.name);
                    var e = this;
                    this.transport &&
                        (i(
                            'clearing existing transport %s',
                            this.transport.name
                        ),
                        this.transport.removeAllListeners()),
                        (this.transport = t),
                        t
                            .on('drain', function () {
                                e.onDrain();
                            })
                            .on('packet', function (t) {
                                e.onPacket(t);
                            })
                            .on('error', function (t) {
                                e.onError(t);
                            })
                            .on('close', function () {
                                e.onClose('transport close');
                            });
                }),
                (u.prototype.probe = function (t) {
                    i('probing transport "%s"', t);
                    var e = this.createTransport(t, { probe: 1 }),
                        n = !1,
                        r = this;
                    function o() {
                        if (r.onlyBinaryUpgrades) {
                            var o =
                                !this.supportsBinary &&
                                r.transport.supportsBinary;
                            n = n || o;
                        }
                        n ||
                            (i('probe transport "%s" opened', t),
                            e.send([{ type: 'ping', data: 'probe' }]),
                            e.once('packet', function (o) {
                                if (!n)
                                    if (
                                        'pong' === o.type &&
                                        'probe' === o.data
                                    ) {
                                        if (
                                            (i('probe transport "%s" pong', t),
                                            (r.upgrading = !0),
                                            r.emit('upgrading', e),
                                            !e)
                                        )
                                            return;
                                        (u.priorWebsocketSuccess =
                                            'websocket' === e.name),
                                            i(
                                                'pausing current transport "%s"',
                                                r.transport.name
                                            ),
                                            r.transport.pause(function () {
                                                n ||
                                                    ('closed' !==
                                                        r.readyState &&
                                                        (i(
                                                            'changing transport and sending upgrade packet'
                                                        ),
                                                        f(),
                                                        r.setTransport(e),
                                                        e.send([
                                                            { type: 'upgrade' }
                                                        ]),
                                                        r.emit('upgrade', e),
                                                        (e = null),
                                                        (r.upgrading = !1),
                                                        r.flush()));
                                            });
                                    } else {
                                        i('probe transport "%s" failed', t);
                                        var s = new Error('probe error');
                                        (s.transport = e.name),
                                            r.emit('upgradeError', s);
                                    }
                            }));
                    }
                    function s() {
                        n || ((n = !0), f(), e.close(), (e = null));
                    }
                    function a(n) {
                        var o = new Error('probe error: ' + n);
                        (o.transport = e.name),
                            s(),
                            i(
                                'probe transport "%s" failed because of error: %s',
                                t,
                                n
                            ),
                            r.emit('upgradeError', o);
                    }
                    function c() {
                        a('transport closed');
                    }
                    function l() {
                        a('socket closed');
                    }
                    function h(t) {
                        e &&
                            t.name !== e.name &&
                            (i('"%s" works - aborting "%s"', t.name, e.name),
                            s());
                    }
                    function f() {
                        e.removeListener('open', o),
                            e.removeListener('error', a),
                            e.removeListener('close', c),
                            r.removeListener('close', l),
                            r.removeListener('upgrading', h);
                    }
                    (u.priorWebsocketSuccess = !1),
                        e.once('open', o),
                        e.once('error', a),
                        e.once('close', c),
                        this.once('close', l),
                        this.once('upgrading', h),
                        e.open();
                }),
                (u.prototype.onOpen = function () {
                    if (
                        (i('socket open'),
                        (this.readyState = 'open'),
                        (u.priorWebsocketSuccess =
                            'websocket' === this.transport.name),
                        this.emit('open'),
                        this.flush(),
                        'open' === this.readyState &&
                            this.upgrade &&
                            this.transport.pause)
                    ) {
                        i('starting upgrade probes');
                        for (var t = 0, e = this.upgrades.length; t < e; t++)
                            this.probe(this.upgrades[t]);
                    }
                }),
                (u.prototype.onPacket = function (t) {
                    if (
                        'opening' === this.readyState ||
                        'open' === this.readyState ||
                        'closing' === this.readyState
                    )
                        switch (
                            (i(
                                'socket receive: type "%s", data "%s"',
                                t.type,
                                t.data
                            ),
                            this.emit('packet', t),
                            this.emit('heartbeat'),
                            t.type)
                        ) {
                            case 'open':
                                this.onHandshake(JSON.parse(t.data));
                                break;
                            case 'pong':
                                this.setPing(), this.emit('pong');
                                break;
                            case 'error':
                                var e = new Error('server error');
                                (e.code = t.data), this.onError(e);
                                break;
                            case 'message':
                                this.emit('data', t.data),
                                    this.emit('message', t.data);
                        }
                    else
                        i(
                            'packet received with socket readyState "%s"',
                            this.readyState
                        );
                }),
                (u.prototype.onHandshake = function (t) {
                    this.emit('handshake', t),
                        (this.id = t.sid),
                        (this.transport.query.sid = t.sid),
                        (this.upgrades = this.filterUpgrades(t.upgrades)),
                        (this.pingInterval = t.pingInterval),
                        (this.pingTimeout = t.pingTimeout),
                        this.onOpen(),
                        'closed' !== this.readyState &&
                            (this.setPing(),
                            this.removeListener('heartbeat', this.onHeartbeat),
                            this.on('heartbeat', this.onHeartbeat));
                }),
                (u.prototype.onHeartbeat = function (t) {
                    clearTimeout(this.pingTimeoutTimer);
                    var e = this;
                    e.pingTimeoutTimer = setTimeout(function () {
                        'closed' !== e.readyState && e.onClose('ping timeout');
                    }, t || e.pingInterval + e.pingTimeout);
                }),
                (u.prototype.setPing = function () {
                    var t = this;
                    clearTimeout(t.pingIntervalTimer),
                        (t.pingIntervalTimer = setTimeout(function () {
                            i(
                                'writing ping packet - expecting pong within %sms',
                                t.pingTimeout
                            ),
                                t.ping(),
                                t.onHeartbeat(t.pingTimeout);
                        }, t.pingInterval));
                }),
                (u.prototype.ping = function () {
                    var t = this;
                    this.sendPacket('ping', function () {
                        t.emit('ping');
                    });
                }),
                (u.prototype.onDrain = function () {
                    this.writeBuffer.splice(0, this.prevBufferLen),
                        (this.prevBufferLen = 0),
                        0 === this.writeBuffer.length
                            ? this.emit('drain')
                            : this.flush();
                }),
                (u.prototype.flush = function () {
                    'closed' !== this.readyState &&
                        this.transport.writable &&
                        !this.upgrading &&
                        this.writeBuffer.length &&
                        (i(
                            'flushing %d packets in socket',
                            this.writeBuffer.length
                        ),
                        this.transport.send(this.writeBuffer),
                        (this.prevBufferLen = this.writeBuffer.length),
                        this.emit('flush'));
                }),
                (u.prototype.write = u.prototype.send = function (t, e, n) {
                    return this.sendPacket('message', t, e, n), this;
                }),
                (u.prototype.sendPacket = function (t, e, n, r) {
                    if (
                        ('function' == typeof e && ((r = e), (e = void 0)),
                        'function' == typeof n && ((r = n), (n = null)),
                        'closing' !== this.readyState &&
                            'closed' !== this.readyState)
                    ) {
                        (n = n || {}).compress = !1 !== n.compress;
                        var o = { type: t, data: e, options: n };
                        this.emit('packetCreate', o),
                            this.writeBuffer.push(o),
                            r && this.once('flush', r),
                            this.flush();
                    }
                }),
                (u.prototype.close = function () {
                    if (
                        'opening' === this.readyState ||
                        'open' === this.readyState
                    ) {
                        this.readyState = 'closing';
                        var t = this;
                        this.writeBuffer.length
                            ? this.once('drain', function () {
                                  this.upgrading ? r() : e();
                              })
                            : this.upgrading
                            ? r()
                            : e();
                    }
                    function e() {
                        t.onClose('forced close'),
                            i('socket closing - telling transport to close'),
                            t.transport.close();
                    }
                    function n() {
                        t.removeListener('upgrade', n),
                            t.removeListener('upgradeError', n),
                            e();
                    }
                    function r() {
                        t.once('upgrade', n), t.once('upgradeError', n);
                    }
                    return this;
                }),
                (u.prototype.onError = function (t) {
                    i('socket error %j', t),
                        (u.priorWebsocketSuccess = !1),
                        this.emit('error', t),
                        this.onClose('transport error', t);
                }),
                (u.prototype.onClose = function (t, e) {
                    if (
                        'opening' === this.readyState ||
                        'open' === this.readyState ||
                        'closing' === this.readyState
                    ) {
                        i('socket close with reason: "%s"', t);
                        clearTimeout(this.pingIntervalTimer),
                            clearTimeout(this.pingTimeoutTimer),
                            this.transport.removeAllListeners('close'),
                            this.transport.close(),
                            this.transport.removeAllListeners(),
                            (this.readyState = 'closed'),
                            (this.id = null),
                            this.emit('close', t, e),
                            (this.writeBuffer = []),
                            (this.prevBufferLen = 0);
                    }
                }),
                (u.prototype.filterUpgrades = function (t) {
                    for (var e = [], n = 0, r = t.length; n < r; n++)
                        ~s(this.transports, t[n]) && e.push(t[n]);
                    return e;
                });
        },
        function (t, e) {
            try {
                t.exports =
                    'undefined' != typeof XMLHttpRequest &&
                    'withCredentials' in new XMLHttpRequest();
            } catch (e) {
                t.exports = !1;
            }
        },
        function (t, e, n) {
            var r = n(11),
                o = n(21),
                i = n(14),
                s = n(4),
                a = n(5)('engine.io-client:polling-xhr'),
                c = n(12);
            function l() {}
            function u(t) {
                if (
                    (o.call(this, t),
                    (this.requestTimeout = t.requestTimeout),
                    (this.extraHeaders = t.extraHeaders),
                    'undefined' != typeof location)
                ) {
                    var e = 'https:' === location.protocol,
                        n = location.port;
                    n || (n = e ? 443 : 80),
                        (this.xd =
                            ('undefined' != typeof location &&
                                t.hostname !== location.hostname) ||
                            n !== t.port),
                        (this.xs = t.secure !== e);
                }
            }
            function h(t) {
                (this.method = t.method || 'GET'),
                    (this.uri = t.uri),
                    (this.xd = !!t.xd),
                    (this.xs = !!t.xs),
                    (this.async = !1 !== t.async),
                    (this.data = void 0 !== t.data ? t.data : null),
                    (this.agent = t.agent),
                    (this.isBinary = t.isBinary),
                    (this.supportsBinary = t.supportsBinary),
                    (this.enablesXDR = t.enablesXDR),
                    (this.withCredentials = t.withCredentials),
                    (this.requestTimeout = t.requestTimeout),
                    (this.pfx = t.pfx),
                    (this.key = t.key),
                    (this.passphrase = t.passphrase),
                    (this.cert = t.cert),
                    (this.ca = t.ca),
                    (this.ciphers = t.ciphers),
                    (this.rejectUnauthorized = t.rejectUnauthorized),
                    (this.extraHeaders = t.extraHeaders),
                    this.create();
            }
            if (
                ((t.exports = u),
                (t.exports.Request = h),
                s(u, o),
                (u.prototype.supportsBinary = !0),
                (u.prototype.request = function (t) {
                    return (
                        ((t = t || {}).uri = this.uri()),
                        (t.xd = this.xd),
                        (t.xs = this.xs),
                        (t.agent = this.agent || !1),
                        (t.supportsBinary = this.supportsBinary),
                        (t.enablesXDR = this.enablesXDR),
                        (t.withCredentials = this.withCredentials),
                        (t.pfx = this.pfx),
                        (t.key = this.key),
                        (t.passphrase = this.passphrase),
                        (t.cert = this.cert),
                        (t.ca = this.ca),
                        (t.ciphers = this.ciphers),
                        (t.rejectUnauthorized = this.rejectUnauthorized),
                        (t.requestTimeout = this.requestTimeout),
                        (t.extraHeaders = this.extraHeaders),
                        new h(t)
                    );
                }),
                (u.prototype.doWrite = function (t, e) {
                    var n = 'string' != typeof t && void 0 !== t,
                        r = this.request({
                            method: 'POST',
                            data: t,
                            isBinary: n
                        }),
                        o = this;
                    r.on('success', e),
                        r.on('error', function (t) {
                            o.onError('xhr post error', t);
                        }),
                        (this.sendXhr = r);
                }),
                (u.prototype.doPoll = function () {
                    a('xhr poll');
                    var t = this.request(),
                        e = this;
                    t.on('data', function (t) {
                        e.onData(t);
                    }),
                        t.on('error', function (t) {
                            e.onError('xhr poll error', t);
                        }),
                        (this.pollXhr = t);
                }),
                i(h.prototype),
                (h.prototype.create = function () {
                    var t = {
                        agent: this.agent,
                        xdomain: this.xd,
                        xscheme: this.xs,
                        enablesXDR: this.enablesXDR
                    };
                    (t.pfx = this.pfx),
                        (t.key = this.key),
                        (t.passphrase = this.passphrase),
                        (t.cert = this.cert),
                        (t.ca = this.ca),
                        (t.ciphers = this.ciphers),
                        (t.rejectUnauthorized = this.rejectUnauthorized);
                    var e = (this.xhr = new r(t)),
                        n = this;
                    try {
                        a('xhr open %s: %s', this.method, this.uri),
                            e.open(this.method, this.uri, this.async);
                        try {
                            if (this.extraHeaders)
                                for (var o in (e.setDisableHeaderCheck &&
                                    e.setDisableHeaderCheck(!0),
                                this.extraHeaders))
                                    this.extraHeaders.hasOwnProperty(o) &&
                                        e.setRequestHeader(
                                            o,
                                            this.extraHeaders[o]
                                        );
                        } catch (t) {}
                        if ('POST' === this.method)
                            try {
                                this.isBinary
                                    ? e.setRequestHeader(
                                          'Content-type',
                                          'application/octet-stream'
                                      )
                                    : e.setRequestHeader(
                                          'Content-type',
                                          'text/plain;charset=UTF-8'
                                      );
                            } catch (t) {}
                        try {
                            e.setRequestHeader('Accept', '*/*');
                        } catch (t) {}
                        'withCredentials' in e &&
                            (e.withCredentials = this.withCredentials),
                            this.requestTimeout &&
                                (e.timeout = this.requestTimeout),
                            this.hasXDR()
                                ? ((e.onload = function () {
                                      n.onLoad();
                                  }),
                                  (e.onerror = function () {
                                      n.onError(e.responseText);
                                  }))
                                : (e.onreadystatechange = function () {
                                      if (2 === e.readyState)
                                          try {
                                              var t = e.getResponseHeader(
                                                  'Content-Type'
                                              );
                                              ((n.supportsBinary &&
                                                  'application/octet-stream' ===
                                                      t) ||
                                                  'application/octet-stream; charset=UTF-8' ===
                                                      t) &&
                                                  (e.responseType =
                                                      'arraybuffer');
                                          } catch (t) {}
                                      4 === e.readyState &&
                                          (200 === e.status || 1223 === e.status
                                              ? n.onLoad()
                                              : setTimeout(function () {
                                                    n.onError(
                                                        'number' ==
                                                            typeof e.status
                                                            ? e.status
                                                            : 0
                                                    );
                                                }, 0));
                                  }),
                            a('xhr data %s', this.data),
                            e.send(this.data);
                    } catch (t) {
                        return void setTimeout(function () {
                            n.onError(t);
                        }, 0);
                    }
                    'undefined' != typeof document &&
                        ((this.index = h.requestsCount++),
                        (h.requests[this.index] = this));
                }),
                (h.prototype.onSuccess = function () {
                    this.emit('success'), this.cleanup();
                }),
                (h.prototype.onData = function (t) {
                    this.emit('data', t), this.onSuccess();
                }),
                (h.prototype.onError = function (t) {
                    this.emit('error', t), this.cleanup(!0);
                }),
                (h.prototype.cleanup = function (t) {
                    if (void 0 !== this.xhr && null !== this.xhr) {
                        if (
                            (this.hasXDR()
                                ? (this.xhr.onload = this.xhr.onerror = l)
                                : (this.xhr.onreadystatechange = l),
                            t)
                        )
                            try {
                                this.xhr.abort();
                            } catch (t) {}
                        'undefined' != typeof document &&
                            delete h.requests[this.index],
                            (this.xhr = null);
                    }
                }),
                (h.prototype.onLoad = function () {
                    var t;
                    try {
                        var e;
                        try {
                            e = this.xhr.getResponseHeader('Content-Type');
                        } catch (t) {}
                        t =
                            (('application/octet-stream' === e ||
                                'application/octet-stream; charset=UTF-8' ===
                                    e) &&
                                this.xhr.response) ||
                            this.xhr.responseText;
                    } catch (t) {
                        this.onError(t);
                    }
                    null != t && this.onData(t);
                }),
                (h.prototype.hasXDR = function () {
                    return (
                        'undefined' != typeof XDomainRequest &&
                        !this.xs &&
                        this.enablesXDR
                    );
                }),
                (h.prototype.abort = function () {
                    this.cleanup();
                }),
                (h.requestsCount = 0),
                (h.requests = {}),
                'undefined' != typeof document)
            )
                if ('function' == typeof attachEvent)
                    attachEvent('onunload', f);
                else if ('function' == typeof addEventListener) {
                    addEventListener(
                        'onpagehide' in c ? 'pagehide' : 'unload',
                        f,
                        !1
                    );
                }
            function f() {
                for (var t in h.requests)
                    h.requests.hasOwnProperty(t) && h.requests[t].abort();
            }
        },
        function (t, e) {
            t.exports =
                Object.keys ||
                function (t) {
                    var e = [],
                        n = Object.prototype.hasOwnProperty;
                    for (var r in t) n.call(t, r) && e.push(r);
                    return e;
                };
        },
        function (t, e) {
            var n = {}.toString;
            t.exports =
                Array.isArray ||
                function (t) {
                    return '[object Array]' == n.call(t);
                };
        },
        function (t, e) {
            t.exports = function (t, e, n) {
                var r = t.byteLength;
                if (((e = e || 0), (n = n || r), t.slice)) return t.slice(e, n);
                if (
                    (e < 0 && (e += r),
                    n < 0 && (n += r),
                    n > r && (n = r),
                    e >= r || e >= n || 0 === r)
                )
                    return new ArrayBuffer(0);
                for (
                    var o = new Uint8Array(t),
                        i = new Uint8Array(n - e),
                        s = e,
                        a = 0;
                    s < n;
                    s++, a++
                )
                    i[a] = o[s];
                return i.buffer;
            };
        },
        function (t, e) {
            function n() {}
            t.exports = function (t, e, r) {
                var o = !1;
                return (r = r || n), (i.count = t), 0 === t ? e() : i;
                function i(t, n) {
                    if (i.count <= 0)
                        throw new Error('after called too many times');
                    --i.count,
                        t
                            ? ((o = !0), e(t), (e = r))
                            : 0 !== i.count || o || e(null, n);
                }
            };
        },
        function (t, e) {
            /*! https://mths.be/utf8js v2.1.2 by @mathias */
            var n,
                r,
                o,
                i = String.fromCharCode;
            function s(t) {
                for (var e, n, r = [], o = 0, i = t.length; o < i; )
                    (e = t.charCodeAt(o++)) >= 55296 && e <= 56319 && o < i
                        ? 56320 == (64512 & (n = t.charCodeAt(o++)))
                            ? r.push(((1023 & e) << 10) + (1023 & n) + 65536)
                            : (r.push(e), o--)
                        : r.push(e);
                return r;
            }
            function a(t, e) {
                if (t >= 55296 && t <= 57343) {
                    if (e)
                        throw Error(
                            'Lone surrogate U+' +
                                t.toString(16).toUpperCase() +
                                ' is not a scalar value'
                        );
                    return !1;
                }
                return !0;
            }
            function c(t, e) {
                return i(((t >> e) & 63) | 128);
            }
            function l(t, e) {
                if (0 == (4294967168 & t)) return i(t);
                var n = '';
                return (
                    0 == (4294965248 & t)
                        ? (n = i(((t >> 6) & 31) | 192))
                        : 0 == (4294901760 & t)
                        ? (a(t, e) || (t = 65533),
                          (n = i(((t >> 12) & 15) | 224)),
                          (n += c(t, 6)))
                        : 0 == (4292870144 & t) &&
                          ((n = i(((t >> 18) & 7) | 240)),
                          (n += c(t, 12)),
                          (n += c(t, 6))),
                    (n += i((63 & t) | 128))
                );
            }
            function u() {
                if (o >= r) throw Error('Invalid byte index');
                var t = 255 & n[o];
                if ((o++, 128 == (192 & t))) return 63 & t;
                throw Error('Invalid continuation byte');
            }
            function h(t) {
                var e, i;
                if (o > r) throw Error('Invalid byte index');
                if (o == r) return !1;
                if (((e = 255 & n[o]), o++, 0 == (128 & e))) return e;
                if (192 == (224 & e)) {
                    if ((i = ((31 & e) << 6) | u()) >= 128) return i;
                    throw Error('Invalid continuation byte');
                }
                if (224 == (240 & e)) {
                    if ((i = ((15 & e) << 12) | (u() << 6) | u()) >= 2048)
                        return a(i, t) ? i : 65533;
                    throw Error('Invalid continuation byte');
                }
                if (
                    240 == (248 & e) &&
                    (i = ((7 & e) << 18) | (u() << 12) | (u() << 6) | u()) >=
                        65536 &&
                    i <= 1114111
                )
                    return i;
                throw Error('Invalid UTF-8 detected');
            }
            t.exports = {
                version: '2.1.2',
                encode: function (t, e) {
                    for (
                        var n = !1 !== (e = e || {}).strict,
                            r = s(t),
                            o = r.length,
                            i = -1,
                            a = '';
                        ++i < o;

                    )
                        a += l(r[i], n);
                    return a;
                },
                decode: function (t, e) {
                    var a = !1 !== (e = e || {}).strict;
                    (n = s(t)), (r = n.length), (o = 0);
                    for (var c, l = []; !1 !== (c = h(a)); ) l.push(c);
                    return (function (t) {
                        for (var e, n = t.length, r = -1, o = ''; ++r < n; )
                            (e = t[r]) > 65535 &&
                                ((o += i(
                                    (((e -= 65536) >>> 10) & 1023) | 55296
                                )),
                                (e = 56320 | (1023 & e))),
                                (o += i(e));
                        return o;
                    })(l);
                }
            };
        },
        function (t, e) {
            !(function () {
                'use strict';
                for (
                    var t =
                            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
                        n = new Uint8Array(256),
                        r = 0;
                    r < t.length;
                    r++
                )
                    n[t.charCodeAt(r)] = r;
                (e.encode = function (e) {
                    var n,
                        r = new Uint8Array(e),
                        o = r.length,
                        i = '';
                    for (n = 0; n < o; n += 3)
                        (i += t[r[n] >> 2]),
                            (i += t[((3 & r[n]) << 4) | (r[n + 1] >> 4)]),
                            (i += t[((15 & r[n + 1]) << 2) | (r[n + 2] >> 6)]),
                            (i += t[63 & r[n + 2]]);
                    return (
                        o % 3 == 2
                            ? (i = i.substring(0, i.length - 1) + '=')
                            : o % 3 == 1 &&
                              (i = i.substring(0, i.length - 2) + '=='),
                        i
                    );
                }),
                    (e.decode = function (t) {
                        var e,
                            r,
                            o,
                            i,
                            s,
                            a = 0.75 * t.length,
                            c = t.length,
                            l = 0;
                        '=' === t[t.length - 1] &&
                            (a--, '=' === t[t.length - 2] && a--);
                        var u = new ArrayBuffer(a),
                            h = new Uint8Array(u);
                        for (e = 0; e < c; e += 4)
                            (r = n[t.charCodeAt(e)]),
                                (o = n[t.charCodeAt(e + 1)]),
                                (i = n[t.charCodeAt(e + 2)]),
                                (s = n[t.charCodeAt(e + 3)]),
                                (h[l++] = (r << 2) | (o >> 4)),
                                (h[l++] = ((15 & o) << 4) | (i >> 2)),
                                (h[l++] = ((3 & i) << 6) | (63 & s));
                        return u;
                    });
            })();
        },
        function (t, e) {
            var n =
                    void 0 !== n
                        ? n
                        : 'undefined' != typeof WebKitBlobBuilder
                        ? WebKitBlobBuilder
                        : 'undefined' != typeof MSBlobBuilder
                        ? MSBlobBuilder
                        : 'undefined' != typeof MozBlobBuilder &&
                          MozBlobBuilder,
                r = (function () {
                    try {
                        return 2 === new Blob(['hi']).size;
                    } catch (t) {
                        return !1;
                    }
                })(),
                o =
                    r &&
                    (function () {
                        try {
                            return (
                                2 === new Blob([new Uint8Array([1, 2])]).size
                            );
                        } catch (t) {
                            return !1;
                        }
                    })(),
                i = n && n.prototype.append && n.prototype.getBlob;
            function s(t) {
                return t.map(function (t) {
                    if (t.buffer instanceof ArrayBuffer) {
                        var e = t.buffer;
                        if (t.byteLength !== e.byteLength) {
                            var n = new Uint8Array(t.byteLength);
                            n.set(
                                new Uint8Array(e, t.byteOffset, t.byteLength)
                            ),
                                (e = n.buffer);
                        }
                        return e;
                    }
                    return t;
                });
            }
            function a(t, e) {
                e = e || {};
                var r = new n();
                return (
                    s(t).forEach(function (t) {
                        r.append(t);
                    }),
                    e.type ? r.getBlob(e.type) : r.getBlob()
                );
            }
            function c(t, e) {
                return new Blob(s(t), e || {});
            }
            'undefined' != typeof Blob &&
                ((a.prototype = Blob.prototype),
                (c.prototype = Blob.prototype)),
                (t.exports = r ? (o ? Blob : c) : i ? a : void 0);
        },
        function (t, e, n) {
            t.exports = function (t) {
                function e(t) {
                    let e = 0;
                    for (let n = 0; n < t.length; n++)
                        (e = (e << 5) - e + t.charCodeAt(n)), (e |= 0);
                    return r.colors[Math.abs(e) % r.colors.length];
                }
                function r(t) {
                    let n;
                    function s(...t) {
                        if (!s.enabled) return;
                        const e = s,
                            o = Number(new Date()),
                            i = o - (n || o);
                        (e.diff = i),
                            (e.prev = n),
                            (e.curr = o),
                            (n = o),
                            (t[0] = r.coerce(t[0])),
                            'string' != typeof t[0] && t.unshift('%O');
                        let a = 0;
                        (t[0] = t[0].replace(/%([a-zA-Z%])/g, (n, o) => {
                            if ('%%' === n) return n;
                            a++;
                            const i = r.formatters[o];
                            if ('function' == typeof i) {
                                const r = t[a];
                                (n = i.call(e, r)), t.splice(a, 1), a--;
                            }
                            return n;
                        })),
                            r.formatArgs.call(e, t);
                        (e.log || r.log).apply(e, t);
                    }
                    return (
                        (s.namespace = t),
                        (s.enabled = r.enabled(t)),
                        (s.useColors = r.useColors()),
                        (s.color = e(t)),
                        (s.destroy = o),
                        (s.extend = i),
                        'function' == typeof r.init && r.init(s),
                        r.instances.push(s),
                        s
                    );
                }
                function o() {
                    const t = r.instances.indexOf(this);
                    return -1 !== t && (r.instances.splice(t, 1), !0);
                }
                function i(t, e) {
                    const n = r(this.namespace + (void 0 === e ? ':' : e) + t);
                    return (n.log = this.log), n;
                }
                function s(t) {
                    return t
                        .toString()
                        .substring(2, t.toString().length - 2)
                        .replace(/\.\*\?$/, '*');
                }
                return (
                    (r.debug = r),
                    (r.default = r),
                    (r.coerce = function (t) {
                        if (t instanceof Error) return t.stack || t.message;
                        return t;
                    }),
                    (r.disable = function () {
                        const t = [
                            ...r.names.map(s),
                            ...r.skips.map(s).map((t) => '-' + t)
                        ].join(',');
                        return r.enable(''), t;
                    }),
                    (r.enable = function (t) {
                        let e;
                        r.save(t), (r.names = []), (r.skips = []);
                        const n = ('string' == typeof t ? t : '').split(
                                /[\s,]+/
                            ),
                            o = n.length;
                        for (e = 0; e < o; e++)
                            n[e] &&
                                ('-' === (t = n[e].replace(/\*/g, '.*?'))[0]
                                    ? r.skips.push(
                                          new RegExp('^' + t.substr(1) + '$')
                                      )
                                    : r.names.push(new RegExp('^' + t + '$')));
                        for (e = 0; e < r.instances.length; e++) {
                            const t = r.instances[e];
                            t.enabled = r.enabled(t.namespace);
                        }
                    }),
                    (r.enabled = function (t) {
                        if ('*' === t[t.length - 1]) return !0;
                        let e, n;
                        for (e = 0, n = r.skips.length; e < n; e++)
                            if (r.skips[e].test(t)) return !1;
                        for (e = 0, n = r.names.length; e < n; e++)
                            if (r.names[e].test(t)) return !0;
                        return !1;
                    }),
                    (r.humanize = n(52)),
                    Object.keys(t).forEach((e) => {
                        r[e] = t[e];
                    }),
                    (r.instances = []),
                    (r.names = []),
                    (r.skips = []),
                    (r.formatters = {}),
                    (r.selectColor = e),
                    r.enable(r.load()),
                    r
                );
            };
        },
        function (t, e) {
            var n = 1e3,
                r = 6e4,
                o = 60 * r,
                i = 24 * o;
            function s(t, e, n, r) {
                var o = e >= 1.5 * n;
                return Math.round(t / n) + ' ' + r + (o ? 's' : '');
            }
            t.exports = function (t, e) {
                e = e || {};
                var a = typeof t;
                if ('string' === a && t.length > 0)
                    return (function (t) {
                        if ((t = String(t)).length > 100) return;
                        var e = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
                            t
                        );
                        if (!e) return;
                        var s = parseFloat(e[1]);
                        switch ((e[2] || 'ms').toLowerCase()) {
                            case 'years':
                            case 'year':
                            case 'yrs':
                            case 'yr':
                            case 'y':
                                return 315576e5 * s;
                            case 'weeks':
                            case 'week':
                            case 'w':
                                return 6048e5 * s;
                            case 'days':
                            case 'day':
                            case 'd':
                                return s * i;
                            case 'hours':
                            case 'hour':
                            case 'hrs':
                            case 'hr':
                            case 'h':
                                return s * o;
                            case 'minutes':
                            case 'minute':
                            case 'mins':
                            case 'min':
                            case 'm':
                                return s * r;
                            case 'seconds':
                            case 'second':
                            case 'secs':
                            case 'sec':
                            case 's':
                                return s * n;
                            case 'milliseconds':
                            case 'millisecond':
                            case 'msecs':
                            case 'msec':
                            case 'ms':
                                return s;
                            default:
                                return;
                        }
                    })(t);
                if ('number' === a && isFinite(t))
                    return e.long
                        ? (function (t) {
                              var e = Math.abs(t);
                              if (e >= i) return s(t, e, i, 'day');
                              if (e >= o) return s(t, e, o, 'hour');
                              if (e >= r) return s(t, e, r, 'minute');
                              if (e >= n) return s(t, e, n, 'second');
                              return t + ' ms';
                          })(t)
                        : (function (t) {
                              var e = Math.abs(t);
                              if (e >= i) return Math.round(t / i) + 'd';
                              if (e >= o) return Math.round(t / o) + 'h';
                              if (e >= r) return Math.round(t / r) + 'm';
                              if (e >= n) return Math.round(t / n) + 's';
                              return t + 'ms';
                          })(t);
                throw new Error(
                    'val is not a non-empty string or a valid number. val=' +
                        JSON.stringify(t)
                );
            };
        },
        function (t, e, n) {
            var r = n(21),
                o = n(4),
                i = n(12);
            t.exports = u;
            var s,
                a = /\n/g,
                c = /\\n/g;
            function l() {}
            function u(t) {
                r.call(this, t),
                    (this.query = this.query || {}),
                    s || (s = i.___eio = i.___eio || []),
                    (this.index = s.length);
                var e = this;
                s.push(function (t) {
                    e.onData(t);
                }),
                    (this.query.j = this.index),
                    'function' == typeof addEventListener &&
                        addEventListener(
                            'beforeunload',
                            function () {
                                e.script && (e.script.onerror = l);
                            },
                            !1
                        );
            }
            o(u, r),
                (u.prototype.supportsBinary = !1),
                (u.prototype.doClose = function () {
                    this.script &&
                        (this.script.parentNode.removeChild(this.script),
                        (this.script = null)),
                        this.form &&
                            (this.form.parentNode.removeChild(this.form),
                            (this.form = null),
                            (this.iframe = null)),
                        r.prototype.doClose.call(this);
                }),
                (u.prototype.doPoll = function () {
                    var t = this,
                        e = document.createElement('script');
                    this.script &&
                        (this.script.parentNode.removeChild(this.script),
                        (this.script = null)),
                        (e.async = !0),
                        (e.src = this.uri()),
                        (e.onerror = function (e) {
                            t.onError('jsonp poll error', e);
                        });
                    var n = document.getElementsByTagName('script')[0];
                    n
                        ? n.parentNode.insertBefore(e, n)
                        : (document.head || document.body).appendChild(e),
                        (this.script = e),
                        'undefined' != typeof navigator &&
                            /gecko/i.test(navigator.userAgent) &&
                            setTimeout(function () {
                                var t = document.createElement('iframe');
                                document.body.appendChild(t),
                                    document.body.removeChild(t);
                            }, 100);
                }),
                (u.prototype.doWrite = function (t, e) {
                    var n = this;
                    if (!this.form) {
                        var r,
                            o = document.createElement('form'),
                            i = document.createElement('textarea'),
                            s = (this.iframeId = 'eio_iframe_' + this.index);
                        (o.className = 'socketio'),
                            (o.style.position = 'absolute'),
                            (o.style.top = '-1000px'),
                            (o.style.left = '-1000px'),
                            (o.target = s),
                            (o.method = 'POST'),
                            o.setAttribute('accept-charset', 'utf-8'),
                            (i.name = 'd'),
                            o.appendChild(i),
                            document.body.appendChild(o),
                            (this.form = o),
                            (this.area = i);
                    }
                    function l() {
                        u(), e();
                    }
                    function u() {
                        if (n.iframe)
                            try {
                                n.form.removeChild(n.iframe);
                            } catch (t) {
                                n.onError(
                                    'jsonp polling iframe removal error',
                                    t
                                );
                            }
                        try {
                            var t =
                                '<iframe src="javascript:0" name="' +
                                n.iframeId +
                                '">';
                            r = document.createElement(t);
                        } catch (t) {
                            ((r = document.createElement('iframe')).name =
                                n.iframeId),
                                (r.src = 'javascript:0');
                        }
                        (r.id = n.iframeId),
                            n.form.appendChild(r),
                            (n.iframe = r);
                    }
                    (this.form.action = this.uri()),
                        u(),
                        (t = t.replace(c, '\\\n')),
                        (this.area.value = t.replace(a, '\\n'));
                    try {
                        this.form.submit();
                    } catch (t) {}
                    this.iframe.attachEvent
                        ? (this.iframe.onreadystatechange = function () {
                              'complete' === n.iframe.readyState && l();
                          })
                        : (this.iframe.onload = l);
                });
        },
        function (t, e, n) {
            (function (e) {
                var r,
                    o,
                    i = n(13),
                    s = n(1),
                    a = n(3),
                    c = n(4),
                    l = n(23),
                    u = n(5)('engine.io-client:websocket');
                if (
                    ('undefined' != typeof WebSocket
                        ? (r = WebSocket)
                        : 'undefined' != typeof self &&
                          (r = self.WebSocket || self.MozWebSocket),
                    'undefined' == typeof window)
                )
                    try {
                        o = n(55);
                    } catch (t) {}
                var h = r || o;
                function f(t) {
                    t && t.forceBase64 && (this.supportsBinary = !1),
                        (this.perMessageDeflate = t.perMessageDeflate),
                        (this.usingBrowserWebSocket = r && !t.forceNode),
                        (this.protocols = t.protocols),
                        this.usingBrowserWebSocket || (h = o),
                        i.call(this, t);
                }
                (t.exports = f),
                    c(f, i),
                    (f.prototype.name = 'websocket'),
                    (f.prototype.supportsBinary = !0),
                    (f.prototype.doOpen = function () {
                        if (this.check()) {
                            var t = this.uri(),
                                e = this.protocols,
                                n = {};
                            this.isReactNative ||
                                ((n.agent = this.agent),
                                (n.perMessageDeflate = this.perMessageDeflate),
                                (n.pfx = this.pfx),
                                (n.key = this.key),
                                (n.passphrase = this.passphrase),
                                (n.cert = this.cert),
                                (n.ca = this.ca),
                                (n.ciphers = this.ciphers),
                                (n.rejectUnauthorized = this.rejectUnauthorized)),
                                this.extraHeaders &&
                                    (n.headers = this.extraHeaders),
                                this.localAddress &&
                                    (n.localAddress = this.localAddress);
                            try {
                                this.ws =
                                    this.usingBrowserWebSocket &&
                                    !this.isReactNative
                                        ? e
                                            ? new h(t, e)
                                            : new h(t)
                                        : new h(t, e, n);
                            } catch (t) {
                                return this.emit('error', t);
                            }
                            void 0 === this.ws.binaryType &&
                                (this.supportsBinary = !1),
                                this.ws.supports && this.ws.supports.binary
                                    ? ((this.supportsBinary = !0),
                                      (this.ws.binaryType = 'nodebuffer'))
                                    : (this.ws.binaryType = 'arraybuffer'),
                                this.addEventListeners();
                        }
                    }),
                    (f.prototype.addEventListeners = function () {
                        var t = this;
                        (this.ws.onopen = function () {
                            t.onOpen();
                        }),
                            (this.ws.onclose = function () {
                                t.onClose();
                            }),
                            (this.ws.onmessage = function (e) {
                                t.onData(e.data);
                            }),
                            (this.ws.onerror = function (e) {
                                t.onError('websocket error', e);
                            });
                    }),
                    (f.prototype.write = function (t) {
                        var n = this;
                        this.writable = !1;
                        for (var r = t.length, o = 0, i = r; o < i; o++)
                            !(function (t) {
                                s.encodePacket(t, n.supportsBinary, function (
                                    o
                                ) {
                                    if (!n.usingBrowserWebSocket) {
                                        var i = {};
                                        if (
                                            (t.options &&
                                                (i.compress =
                                                    t.options.compress),
                                            n.perMessageDeflate)
                                        )
                                            ('string' == typeof o
                                                ? e.byteLength(o)
                                                : o.length) <
                                                n.perMessageDeflate.threshold &&
                                                (i.compress = !1);
                                    }
                                    try {
                                        n.usingBrowserWebSocket
                                            ? n.ws.send(o)
                                            : n.ws.send(o, i);
                                    } catch (t) {
                                        u(
                                            'websocket closed before onclose event'
                                        );
                                    }
                                    --r || a();
                                });
                            })(t[o]);
                        function a() {
                            n.emit('flush'),
                                setTimeout(function () {
                                    (n.writable = !0), n.emit('drain');
                                }, 0);
                        }
                    }),
                    (f.prototype.onClose = function () {
                        i.prototype.onClose.call(this);
                    }),
                    (f.prototype.doClose = function () {
                        void 0 !== this.ws && this.ws.close();
                    }),
                    (f.prototype.uri = function () {
                        var t = this.query || {},
                            e = this.secure ? 'wss' : 'ws',
                            n = '';
                        return (
                            this.port &&
                                (('wss' === e && 443 !== Number(this.port)) ||
                                    ('ws' === e && 80 !== Number(this.port))) &&
                                (n = ':' + this.port),
                            this.timestampRequests &&
                                (t[this.timestampParam] = l()),
                            this.supportsBinary || (t.b64 = 1),
                            (t = a.encode(t)).length && (t = '?' + t),
                            e +
                                '://' +
                                (-1 !== this.hostname.indexOf(':')
                                    ? '[' + this.hostname + ']'
                                    : this.hostname) +
                                n +
                                this.path +
                                t
                        );
                    }),
                    (f.prototype.check = function () {
                        return !(
                            !h ||
                            ('__initialize' in h &&
                                this.name === f.prototype.name)
                        );
                    });
            }.call(this, n(10).Buffer));
        },
        ,
        function (t, e) {
            t.exports = function (t, e) {
                for (var n = [], r = (e = e || 0) || 0; r < t.length; r++)
                    n[r - e] = t[r];
                return n;
            };
        },
        function (t, e) {
            function n(t) {
                (t = t || {}),
                    (this.ms = t.min || 100),
                    (this.max = t.max || 1e4),
                    (this.factor = t.factor || 2),
                    (this.jitter =
                        t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0),
                    (this.attempts = 0);
            }
            (t.exports = n),
                (n.prototype.duration = function () {
                    var t = this.ms * Math.pow(this.factor, this.attempts++);
                    if (this.jitter) {
                        var e = Math.random(),
                            n = Math.floor(e * this.jitter * t);
                        t = 0 == (1 & Math.floor(10 * e)) ? t - n : t + n;
                    }
                    return 0 | Math.min(t, this.max);
                }),
                (n.prototype.reset = function () {
                    this.attempts = 0;
                }),
                (n.prototype.setMin = function (t) {
                    this.ms = t;
                }),
                (n.prototype.setMax = function (t) {
                    this.max = t;
                }),
                (n.prototype.setJitter = function (t) {
                    this.jitter = t;
                });
        }
    ]
]);