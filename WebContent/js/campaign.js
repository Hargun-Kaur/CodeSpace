/*!
 * VERSION: beta 1.9.7
 * DATE: 2013-05-16
 * UPDATES AND DOCS AT: http://www.greensock.com
 * 
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2013, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
(window._gsQueue || (window._gsQueue = [])).push(function() {
        "use strict";
        window._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
                var s = [].slice,
                    r = function(t, e, s) {
                        i.call(this, t, e, s), this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0
                    },
                    n = function(t) {
                        return t.jquery || t.length && t[0] && t[0].nodeType && t[0].style
                    },
                    a = r.prototype = i.to({}, .1, {}),
                    o = [];
                r.version = "1.9.7", a.constructor = r, a.kill()._gc = !1, r.killTweensOf = r.killDelayedCallsTo = i.killTweensOf, r.getTweensOf = i.getTweensOf, r.ticker = i.ticker, a.invalidate = function() {
                    return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), i.prototype.invalidate.call(this)
                }, a.updateTo = function(t, e) {
                    var s, r = this.ratio;
                    e && this.timeline && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
                    for (s in t) this.vars[s] = t[s];
                    if (this._initted)
                        if (e) this._initted = !1;
                        else if (this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                        var n = this._time;
                        this.render(0, !0, !1), this._initted = !1, this.render(n, !0, !1)
                    } else if (this._time > 0) {
                        this._initted = !1, this._init();
                        for (var a, o = 1 / (1 - r), h = this._firstPT; h;) a = h.s + h.c, h.c *= o, h.s = a - h.c, h = h._next
                    }
                    return this
                }, a.render = function(t, e, i) {
                    var s, r, n, a, h, l, _, u = this._dirty ? this.totalDuration() : this._totalDuration,
                        p = this._time,
                        f = this._totalTime,
                        c = this._cycle;
                    if (t >= u ? (this._totalTime = u, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = this._duration, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (s = !0, r = "onComplete"), 0 === this._duration && ((0 === t || 0 > this._rawPrevTime) && this._rawPrevTime !== t && (i = !0, this._rawPrevTime > 0 && (r = "onReverseComplete", e && (t = -1))), this._rawPrevTime = t)) : 1e-7 > t ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== f || 0 === this._duration && this._rawPrevTime > 0) && (r = "onReverseComplete", s = this._reversed), 0 > t ? (this._active = !1, 0 === this._duration && (this._rawPrevTime >= 0 && (i = !0), this._rawPrevTime = t)) : this._initted || (i = !0)) : (this._totalTime = this._time = t, 0 !== this._repeat && (a = this._duration + this._repeatDelay, this._cycle = this._totalTime / a >> 0, 0 !== this._cycle && this._cycle === this._totalTime / a && this._cycle--, this._time = this._totalTime - this._cycle * a, this._yoyo && 0 !== (1 & this._cycle) && (this._time = this._duration - this._time), this._time > this._duration ? this._time = this._duration : 0 > this._time && (this._time = 0)), this._easeType ? (h = this._time / this._duration, l = this._easeType, _ = this._easePower, (1 === l || 3 === l && h >= .5) && (h = 1 - h), 3 === l && (h *= 2), 1 === _ ? h *= h : 2 === _ ? h *= h * h : 3 === _ ? h *= h * h * h : 4 === _ && (h *= h * h * h * h), this.ratio = 1 === l ? 1 - h : 2 === l ? h : .5 > this._time / this._duration ? h / 2 : 1 - h / 2) : this.ratio = this._ease.getRatio(this._time / this._duration)), p === this._time && !i) return f !== this._totalTime && this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || o)), void 0;
                    if (!this._initted) {
                        if (this._init(), !this._initted) return;
                        this._time && !s ? this.ratio = this._ease.getRatio(this._time / this._duration) : s && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (this._active || this._paused || (this._active = !0), 0 === f && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === this._duration) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || o))), n = this._firstPT; n;) n.f ? n.t[n.p](n.c * this.ratio + n.s) : n.t[n.p] = n.c * this.ratio + n.s, n = n._next;
                    this._onUpdate && (0 > t && this._startAt && this._startAt.render(t, e, i), e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || o)), this._cycle !== c && (e || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || o)), r && (this._gc || (0 > t && this._startAt && !this._onUpdate && this._startAt.render(t, e, i), s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this.vars[r].apply(this.vars[r + "Scope"] || this, this.vars[r + "Params"] || o)))
                }, r.to = function(t, e, i) {
                    return new r(t, e, i)
                }, r.from = function(t, e, i) {
                    return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new r(t, e, i)
                }, r.fromTo = function(t, e, i, s) {
                    return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, new r(t, e, s)
                }, r.staggerTo = r.allTo = function(t, e, a, h, l, _, u) {
                    h = h || 0;
                    var p, f, c, m, d = a.delay || 0,
                        g = [],
                        v = function() {
                            a.onComplete && a.onComplete.apply(a.onCompleteScope || this, a.onCompleteParams || o), l.apply(u || this, _ || o)
                        };
                    for (t instanceof Array || ("string" == typeof t && (t = i.selector(t) || t), n(t) && (t = s.call(t, 0))), p = t.length, c = 0; p > c; c++) {
                        f = {};
                        for (m in a) f[m] = a[m];
                        f.delay = d, c === p - 1 && l && (f.onComplete = v), g[c] = new r(t[c], e, f), d += h
                    }
                    return g
                }, r.staggerFrom = r.allFrom = function(t, e, i, s, n, a, o) {
                    return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, r.staggerTo(t, e, i, s, n, a, o)
                }, r.staggerFromTo = r.allFromTo = function(t, e, i, s, n, a, o, h) {
                    return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, r.staggerTo(t, e, s, n, a, o, h)
                }, r.delayedCall = function(t, e, i, s, n) {
                    return new r(e, 0, {
                        delay: t,
                        onComplete: e,
                        onCompleteParams: i,
                        onCompleteScope: s,
                        onReverseComplete: e,
                        onReverseCompleteParams: i,
                        onReverseCompleteScope: s,
                        immediateRender: !1,
                        useFrames: n,
                        overwrite: 0
                    })
                }, r.set = function(t, e) {
                    return new r(t, 0, e)
                }, r.isTweening = function(t) {
                    for (var e, s = i.getTweensOf(t), r = s.length; --r > -1;)
                        if (e = s[r], e._active || e._startTime === e._timeline._time && e._timeline._active) return !0;
                    return !1
                };
                var h = function(t, e) {
                        for (var s = [], r = 0, n = t._first; n;) n instanceof i ? s[r++] = n : (e && (s[r++] = n), s = s.concat(h(n, e)), r = s.length), n = n._next;
                        return s
                    },
                    l = r.getAllTweens = function(e) {
                        return h(t._rootTimeline, e).concat(h(t._rootFramesTimeline, e))
                    };
                r.killAll = function(t, i, s, r) {
                    null == i && (i = !0), null == s && (s = !0);
                    var n, a, o, h = l(0 != r),
                        _ = h.length,
                        u = i && s && r;
                    for (o = 0; _ > o; o++) a = h[o], (u || a instanceof e || (n = a.target === a.vars.onComplete) && s || i && !n) && (t ? a.totalTime(a.totalDuration()) : a._enabled(!1, !1))
                }, r.killChildTweensOf = function(t, e) {
                    if (null != t) {
                        var a, o, h, l, _, u = i._tweenLookup;
                        if ("string" == typeof t && (t = i.selector(t) || t), n(t) && (t = s(t, 0)), t instanceof Array)
                            for (l = t.length; --l > -1;) r.killChildTweensOf(t[l], e);
                        else {
                            a = [];
                            for (h in u)
                                for (o = u[h].target.parentNode; o;) o === t && (a = a.concat(u[h].tweens)), o = o.parentNode;
                            for (_ = a.length, l = 0; _ > l; l++) e && a[l].totalTime(a[l].totalDuration()), a[l]._enabled(!1, !1)
                        }
                    }
                };
                var _ = function(t, i, s, r) {
                    void 0 === i && (i = !0), void 0 === s && (s = !0);
                    for (var n, a, o = l(r), h = i && s && r, _ = o.length; --_ > -1;) a = o[_], (h || a instanceof e || (n = a.target === a.vars.onComplete) && s || i && !n) && a.paused(t)
                };
                return r.pauseAll = function(t, e, i) {
                    _(!0, t, e, i)
                }, r.resumeAll = function(t, e, i) {
                    _(!1, t, e, i)
                }, a.progress = function(t) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
                }, a.totalProgress = function(t) {
                    return arguments.length ? this.totalTime(this.totalDuration() * t, !1) : this._totalTime / this.totalDuration()
                }, a.time = function(t, e) {
                    return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
                }, a.duration = function(e) {
                    return arguments.length ? t.prototype.duration.call(this, e) : this._duration
                }, a.totalDuration = function(t) {
                    return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
                }, a.repeat = function(t) {
                    return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
                }, a.repeatDelay = function(t) {
                    return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
                }, a.yoyo = function(t) {
                    return arguments.length ? (this._yoyo = t, this) : this._yoyo
                }, r
            }, !0), window._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
                var s = function(t) {
                        e.call(this, t), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                        for (var i, s, n = this.vars, a = r.length; --a > -1;)
                            if (s = n[r[a]])
                                for (i = s.length; --i > -1;) "{self}" === s[i] && (s = n[r[a]] = s.concat(), s[i] = this);
                        n.tweens instanceof Array && this.add(n.tweens, 0, n.align, n.stagger)
                    },
                    r = ["onStartParams", "onUpdateParams", "onCompleteParams", "onReverseCompleteParams", "onRepeatParams"],
                    n = [],
                    a = function(t) {
                        var e, i = {};
                        for (e in t) i[e] = t[e];
                        return i
                    },
                    o = n.slice,
                    h = s.prototype = new e;
                return s.version = "1.9.7", h.constructor = s, h.kill()._gc = !1, h.to = function(t, e, s, r) {
                    return e ? this.add(new i(t, e, s), r) : this.set(t, s, r)
                }, h.from = function(t, e, s, r) {
                    return this.add(i.from(t, e, s), r)
                }, h.fromTo = function(t, e, s, r, n) {
                    return e ? this.add(i.fromTo(t, e, s, r), n) : this.set(t, r, n)
                }, h.staggerTo = function(t, e, r, n, h, l, _, u) {
                    var p, f = new s({
                        onComplete: l,
                        onCompleteParams: _,
                        onCompleteScope: u
                    });
                    for ("string" == typeof t && (t = i.selector(t) || t), !(t instanceof Array) && t.length && t[0] && t[0].nodeType && t[0].style && (t = o.call(t, 0)), n = n || 0, p = 0; t.length > p; p++) r.startAt && (r.startAt = a(r.startAt)), f.to(t[p], e, a(r), p * n);
                    return this.add(f, h)
                }, h.staggerFrom = function(t, e, i, s, r, n, a, o) {
                    return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, s, r, n, a, o)
                }, h.staggerFromTo = function(t, e, i, s, r, n, a, o, h) {
                    return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, s, r, n, a, o, h)
                }, h.call = function(t, e, s, r) {
                    return this.add(i.delayedCall(0, t, e, s), r)
                }, h.set = function(t, e, s) {
                    return s = this._parseTimeOrLabel(s, 0, !0), null == e.immediateRender && (e.immediateRender = s === this._time && !this._paused), this.add(new i(t, 0, e), s)
                }, s.exportRoot = function(t, e) {
                    t = t || {}, null == t.smoothChildTiming && (t.smoothChildTiming = !0);
                    var r, n, a = new s(t),
                        o = a._timeline;
                    for (null == e && (e = !0), o._remove(a, !0), a._startTime = 0, a._rawPrevTime = a._time = a._totalTime = o._time, r = o._first; r;) n = r._next, e && r instanceof i && r.target === r.vars.onComplete || a.add(r, r._startTime - r._delay), r = n;
                    return o.add(a, 0), a
                }, h.add = function(r, n, a, o) {
                    var h, l, _, u, p;
                    if ("number" != typeof n && (n = this._parseTimeOrLabel(n, 0, !0, r)), !(r instanceof t)) {
                        if (r instanceof Array) {
                            for (a = a || "normal", o = o || 0, h = n, l = r.length, _ = 0; l > _; _++)(u = r[_]) instanceof Array && (u = new s({
                                tweens: u
                            })), this.add(u, h), "string" != typeof u && "function" != typeof u && ("sequence" === a ? h = u._startTime + u.totalDuration() / u._timeScale : "start" === a && (u._startTime -= u.delay())), h += o;
                            return this._uncache(!0)
                        }
                        if ("string" == typeof r) return this.addLabel(r, n);
                        if ("function" != typeof r) throw "Cannot add " + r + " into the timeline; it is neither a tween, timeline, function, nor a string.";
                        r = i.delayedCall(0, r)
                    }
                    if (e.prototype.add.call(this, r, n), this._gc && !this._paused && this._time === this._duration && this._time < this.duration())
                        for (p = this; p._gc && p._timeline;) p._timeline.smoothChildTiming ? p.totalTime(p._totalTime, !0) : p._enabled(!0, !1), p = p._timeline;
                    return this
                }, h.remove = function(e) {
                    if (e instanceof t) return this._remove(e, !1);
                    if (e instanceof Array) {
                        for (var i = e.length; --i > -1;) this.remove(e[i]);
                        return this
                    }
                    return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
                }, h.append = function(t, e) {
                    return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
                }, h.insert = h.insertMultiple = function(t, e, i, s) {
                    return this.add(t, e || 0, i, s)
                }, h.appendMultiple = function(t, e, i, s) {
                    return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, s)
                }, h.addLabel = function(t, e) {
                    return this._labels[t] = this._parseTimeOrLabel(e), this
                }, h.removeLabel = function(t) {
                    return delete this._labels[t], this
                }, h.getLabelTime = function(t) {
                    return null != this._labels[t] ? this._labels[t] : -1
                }, h._parseTimeOrLabel = function(e, i, s, r) {
                    var n;
                    if (r instanceof t && r.timeline === this) this.remove(r);
                    else if (r instanceof Array)
                        for (n = r.length; --n > -1;) r[n] instanceof t && r[n].timeline === this && this.remove(r[n]);
                    if ("string" == typeof i) return this._parseTimeOrLabel(i, s && "number" == typeof e && null == this._labels[i] ? e - this.duration() : 0, s);
                    if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e]) null == e && (e = this.duration());
                    else {
                        if (n = e.indexOf("="), -1 === n) return null == this._labels[e] ? s ? this._labels[e] = this.duration() + i : i : this._labels[e] + i;
                        i = parseInt(e.charAt(n - 1) + "1", 10) * Number(e.substr(n + 1)), e = n > 1 ? this._parseTimeOrLabel(e.substr(0, n - 1), 0, s) : this.duration()
                    }
                    return Number(e) + i
                }, h.seek = function(t, e) {
                    return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1)
                }, h.stop = function() {
                    return this.paused(!0)
                }, h.gotoAndPlay = function(t, e) {
                    return this.play(t, e)
                }, h.gotoAndStop = function(t, e) {
                    return this.pause(t, e)
                }, h.render = function(t, e, i) {
                    this._gc && this._enabled(!0, !1), this._active = !this._paused;
                    var s, r, a, o, h, l = this._dirty ? this.totalDuration() : this._totalDuration,
                        _ = this._time,
                        u = this._startTime,
                        p = this._timeScale,
                        f = this._paused;
                    if (t >= l ? (this._totalTime = this._time = l, this._reversed || this._hasPausedChild() || (r = !0, o = "onComplete", 0 === this._duration && (0 === t || 0 > this._rawPrevTime) && this._rawPrevTime !== t && this._first && (h = !0, this._rawPrevTime > 0 && (o = "onReverseComplete"))), this._rawPrevTime = t, t = l + 1e-6) : 1e-7 > t ? (this._totalTime = this._time = 0, (0 !== _ || 0 === this._duration && this._rawPrevTime > 0) && (o = "onReverseComplete", r = this._reversed), 0 > t ? (this._active = !1, 0 === this._duration && this._rawPrevTime >= 0 && this._first && (h = !0)) : this._initted || (h = !0), this._rawPrevTime = t, t = 0) : this._totalTime = this._time = this._rawPrevTime = t, this._time !== _ && this._first || i || h) {
                        if (this._initted || (this._initted = !0), 0 === _ && this.vars.onStart && 0 !== this._time && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || n)), this._time >= _)
                            for (s = this._first; s && (a = s._next, !this._paused || f);)(s._active || s._startTime <= this._time && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a;
                        else
                            for (s = this._last; s && (a = s._prev, !this._paused || f);)(s._active || _ >= s._startTime && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a;
                        this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || n)), o && (this._gc || (u === this._startTime || p !== this._timeScale) && (0 === this._time || l >= this.totalDuration()) && (r && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[o] && this.vars[o].apply(this.vars[o + "Scope"] || this, this.vars[o + "Params"] || n)))
                    }
                }, h._hasPausedChild = function() {
                    for (var t = this._first; t;) {
                        if (t._paused || t instanceof s && t._hasPausedChild()) return !0;
                        t = t._next
                    }
                    return !1
                }, h.getChildren = function(t, e, s, r) {
                    r = r || -9999999999;
                    for (var n = [], a = this._first, o = 0; a;) r > a._startTime || (a instanceof i ? e !== !1 && (n[o++] = a) : (s !== !1 && (n[o++] = a), t !== !1 && (n = n.concat(a.getChildren(!0, e, s)), o = n.length))), a = a._next;
                    return n
                }, h.getTweensOf = function(t, e) {
                    for (var s = i.getTweensOf(t), r = s.length, n = [], a = 0; --r > -1;)(s[r].timeline === this || e && this._contains(s[r])) && (n[a++] = s[r]);
                    return n
                }, h._contains = function(t) {
                    for (var e = t.timeline; e;) {
                        if (e === this) return !0;
                        e = e.timeline
                    }
                    return !1
                }, h.shiftChildren = function(t, e, i) {
                    i = i || 0;
                    for (var s, r = this._first, n = this._labels; r;) r._startTime >= i && (r._startTime += t), r = r._next;
                    if (e)
                        for (s in n) n[s] >= i && (n[s] += t);
                    return this._uncache(!0)
                }, h._kill = function(t, e) {
                    if (!t && !e) return this._enabled(!1, !1);
                    for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), s = i.length, r = !1; --s > -1;) i[s]._kill(t, e) && (r = !0);
                    return r
                }, h.clear = function(t) {
                    var e = this.getChildren(!1, !0, !0),
                        i = e.length;
                    for (this._time = this._totalTime = 0; --i > -1;) e[i]._enabled(!1, !1);
                    return t !== !1 && (this._labels = {}), this._uncache(!0)
                }, h.invalidate = function() {
                    for (var t = this._first; t;) t.invalidate(), t = t._next;
                    return this
                }, h._enabled = function(t, i) {
                    if (t === this._gc)
                        for (var s = this._first; s;) s._enabled(t, !0), s = s._next;
                    return e.prototype._enabled.call(this, t, i)
                }, h.progress = function(t) {
                    return arguments.length ? this.totalTime(this.duration() * t, !1) : this._time / this.duration()
                }, h.duration = function(t) {
                    return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration)
                }, h.totalDuration = function(t) {
                    if (!arguments.length) {
                        if (this._dirty) {
                            for (var e, i, s = 0, r = this._last, n = 999999999999; r;) e = r._prev, r._dirty && r.totalDuration(), r._startTime > n && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : n = r._startTime, 0 > r._startTime && !r._paused && (s -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), n = 0), i = r._startTime + r._totalDuration / r._timeScale, i > s && (s = i), r = e;
                            this._duration = this._totalDuration = s, this._dirty = !1
                        }
                        return this._totalDuration
                    }
                    return 0 !== this.totalDuration() && 0 !== t && this.timeScale(this._totalDuration / t), this
                }, h.usesFrames = function() {
                    for (var e = this._timeline; e._timeline;) e = e._timeline;
                    return e === t._rootFramesTimeline
                }, h.rawTime = function() {
                    return this._paused || 0 !== this._totalTime && this._totalTime !== this._totalDuration ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
                }, s
            }, !0), window._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(t, e, i) {
                var s = function(e) {
                        t.call(this, e), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0
                    },
                    r = [],
                    n = new i(null, null, 1, 0),
                    a = function(t) {
                        for (; t;) {
                            if (t._paused) return !0;
                            t = t._timeline
                        }
                        return !1
                    },
                    o = s.prototype = new t;
                return o.constructor = s, o.kill()._gc = !1, s.version = "1.9.7", o.invalidate = function() {
                    return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), t.prototype.invalidate.call(this)
                }, o.addCallback = function(t, i, s, r) {
                    return this.add(e.delayedCall(0, t, s, r), i)
                }, o.removeCallback = function(t, e) {
                    if (null == e) this._kill(null, t);
                    else
                        for (var i = this.getTweensOf(t, !1), s = i.length, r = this._parseTimeOrLabel(e); --s > -1;) i[s]._startTime === r && i[s]._enabled(!1, !1);
                    return this
                }, o.tweenTo = function(t, i) {
                    i = i || {};
                    var s, a, o = {
                        ease: n,
                        overwrite: 2,
                        useFrames: this.usesFrames(),
                        immediateRender: !1
                    };
                    for (s in i) o[s] = i[s];
                    return o.time = this._parseTimeOrLabel(t), a = new e(this, Math.abs(Number(o.time) - this._time) / this._timeScale || .001, o), o.onStart = function() {
                        a.target.paused(!0), a.vars.time !== a.target.time() && a.duration(Math.abs(a.vars.time - a.target.time()) / a.target._timeScale), i.onStart && i.onStart.apply(i.onStartScope || a, i.onStartParams || r)
                    }, a
                }, o.tweenFromTo = function(t, e, i) {
                    i = i || {}, t = this._parseTimeOrLabel(t), i.startAt = {
                        onComplete: this.seek,
                        onCompleteParams: [t],
                        onCompleteScope: this
                    }, i.immediateRender = i.immediateRender !== !1;
                    var s = this.tweenTo(e, i);
                    return s.duration(Math.abs(s.vars.time - t) / this._timeScale || .001)
                }, o.render = function(t, e, i) {
                    this._gc && this._enabled(!0, !1), this._active = !this._paused;
                    var s, n, a, o, h, l, _ = this._dirty ? this.totalDuration() : this._totalDuration,
                        u = this._duration,
                        p = this._time,
                        f = this._totalTime,
                        c = this._startTime,
                        m = this._timeScale,
                        d = this._rawPrevTime,
                        g = this._paused,
                        v = this._cycle;
                    if (t >= _ ? (this._locked || (this._totalTime = _, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (n = !0, o = "onComplete", 0 === u && (0 === t || 0 > this._rawPrevTime) && this._rawPrevTime !== t && this._first && (h = !0, this._rawPrevTime > 0 && (o = "onReverseComplete"))), this._rawPrevTime = t, this._yoyo && 0 !== (1 & this._cycle) ? this._time = t = 0 : (this._time = u, t = u + 1e-6)) : 1e-7 > t ? (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== p || 0 === u && this._rawPrevTime > 0 && !this._locked) && (o = "onReverseComplete", n = this._reversed), 0 > t ? (this._active = !1, 0 === u && this._rawPrevTime >= 0 && this._first && (h = !0)) : this._initted || (h = !0), this._rawPrevTime = t, t = 0) : (this._time = this._rawPrevTime = t, this._locked || (this._totalTime = t, 0 !== this._repeat && (l = u + this._repeatDelay, this._cycle = this._totalTime / l >> 0, 0 !== this._cycle && this._cycle === this._totalTime / l && this._cycle--, this._time = this._totalTime - this._cycle * l, this._yoyo && 0 !== (1 & this._cycle) && (this._time = u - this._time), this._time > u ? (this._time = u, t = u + 1e-6) : 0 > this._time ? this._time = t = 0 : t = this._time))), this._cycle !== v && !this._locked) {
                        var y = this._yoyo && 0 !== (1 & v),
                            T = y === (this._yoyo && 0 !== (1 & this._cycle)),
                            w = this._totalTime,
                            x = this._cycle,
                            b = this._rawPrevTime,
                            P = this._time;
                        this._totalTime = v * u, v > this._cycle ? y = !y : this._totalTime += u, this._time = p, this._rawPrevTime = 0 === u ? d - 1e-5 : d, this._cycle = v, this._locked = !0, p = y ? 0 : u, this.render(p, e, 0 === u), e || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || r), T && (p = y ? u + 1e-6 : -1e-6, this.render(p, !0, !1)), this._time = P, this._totalTime = w, this._cycle = x, this._rawPrevTime = b, this._locked = !1
                    }
                    if (!(this._time !== p && this._first || i || h)) return f !== this._totalTime && this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || r)), void 0;
                    if (this._initted || (this._initted = !0), 0 === f && this.vars.onStart && 0 !== this._totalTime && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || r)), this._time >= p)
                        for (s = this._first; s && (a = s._next, !this._paused || g);)(s._active || s._startTime <= this._time && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a;
                    else
                        for (s = this._last; s && (a = s._prev, !this._paused || g);)(s._active || p >= s._startTime && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a;
                    this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || r)), o && (this._locked || this._gc || (c === this._startTime || m !== this._timeScale) && (0 === this._time || _ >= this.totalDuration()) && (n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[o] && this.vars[o].apply(this.vars[o + "Scope"] || this, this.vars[o + "Params"] || r)))
                }, o.getActive = function(t, e, i) {
                    null == t && (t = !0), null == e && (e = !0), null == i && (i = !1);
                    var s, r, n = [],
                        o = this.getChildren(t, e, i),
                        h = 0,
                        l = o.length;
                    for (s = 0; l > s; s++) r = o[s], r._paused || r._timeline._time >= r._startTime && r._timeline._time < r._startTime + r._totalDuration / r._timeScale && (a(r._timeline) || (n[h++] = r));
                    return n
                }, o.getLabelAfter = function(t) {
                    t || 0 !== t && (t = this._time);
                    var e, i = this.getLabelsArray(),
                        s = i.length;
                    for (e = 0; s > e; e++)
                        if (i[e].time > t) return i[e].name;
                    return null
                }, o.getLabelBefore = function(t) {
                    null == t && (t = this._time);
                    for (var e = this.getLabelsArray(), i = e.length; --i > -1;)
                        if (t > e[i].time) return e[i].name;
                    return null
                }, o.getLabelsArray = function() {
                    var t, e = [],
                        i = 0;
                    for (t in this._labels) e[i++] = {
                        time: this._labels[t],
                        name: t
                    };
                    return e.sort(function(t, e) {
                        return t.time - e.time
                    }), e
                }, o.progress = function(t) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
                }, o.totalProgress = function(t) {
                    return arguments.length ? this.totalTime(this.totalDuration() * t, !1) : this._totalTime / this.totalDuration()
                }, o.totalDuration = function(e) {
                    return arguments.length ? -1 === this._repeat ? this : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (t.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
                }, o.time = function(t, e) {
                    return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
                }, o.repeat = function(t) {
                    return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
                }, o.repeatDelay = function(t) {
                    return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
                }, o.yoyo = function(t) {
                    return arguments.length ? (this._yoyo = t, this) : this._yoyo
                }, o.currentLabel = function(t) {
                    return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8)
                }, s
            }, !0),
            function() {
                var t = 180 / Math.PI,
                    e = Math.PI / 180,
                    i = [],
                    s = [],
                    r = [],
                    n = {},
                    a = function(t, e, i, s) {
                        this.a = t, this.b = e, this.c = i, this.d = s, this.da = s - t, this.ca = i - t, this.ba = e - t
                    },
                    o = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
                    h = function(t, e, i, s) {
                        var r = {
                                a: t
                            },
                            n = {},
                            a = {},
                            o = {
                                c: s
                            },
                            h = (t + e) / 2,
                            l = (e + i) / 2,
                            _ = (i + s) / 2,
                            u = (h + l) / 2,
                            p = (l + _) / 2,
                            f = (p - u) / 8;
                        return r.b = h + (t - h) / 4, n.b = u + f, r.c = n.a = (r.b + n.b) / 2, n.c = a.a = (u + p) / 2, a.b = p - f, o.b = _ + (s - _) / 4, a.c = o.a = (a.b + o.b) / 2, [r, n, a, o]
                    },
                    l = function(t, e, n, a, o) {
                        var l, _, u, p, f, c, m, d, g, v, y, T, w, x = t.length - 1,
                            b = 0,
                            P = t[0].a;
                        for (l = 0; x > l; l++) f = t[b], _ = f.a, u = f.d, p = t[b + 1].d, o ? (y = i[l], T = s[l], w = .25 * (T + y) * e / (a ? .5 : r[l] || .5), c = u - (u - _) * (a ? .5 * e : 0 !== y ? w / y : 0), m = u + (p - u) * (a ? .5 * e : 0 !== T ? w / T : 0), d = u - (c + ((m - c) * (3 * y / (y + T) + .5) / 4 || 0))) : (c = u - .5 * (u - _) * e, m = u + .5 * (p - u) * e, d = u - (c + m) / 2), c += d, m += d, f.c = g = c, f.b = 0 !== l ? P : P = f.a + .6 * (f.c - f.a), f.da = u - _, f.ca = g - _, f.ba = P - _, n ? (v = h(_, P, g, u), t.splice(b, 1, v[0], v[1], v[2], v[3]), b += 4) : b++, P = m;
                        f = t[b], f.b = P, f.c = P + .4 * (f.d - P), f.da = f.d - f.a, f.ca = f.c - f.a, f.ba = P - f.a, n && (v = h(f.a, P, f.c, f.d), t.splice(b, 1, v[0], v[1], v[2], v[3]))
                    },
                    _ = function(t, e, r, n) {
                        var o, h, l, _, u, p, f = [];
                        if (n)
                            for (t = [n].concat(t), h = t.length; --h > -1;) "string" == typeof(p = t[h][e]) && "=" === p.charAt(1) && (t[h][e] = n[e] + Number(p.charAt(0) + p.substr(2)));
                        if (o = t.length - 2, 0 > o) return f[0] = new a(t[0][e], 0, 0, t[-1 > o ? 0 : 1][e]), f;
                        for (h = 0; o > h; h++) l = t[h][e], _ = t[h + 1][e], f[h] = new a(l, 0, 0, _), r && (u = t[h + 2][e], i[h] = (i[h] || 0) + (_ - l) * (_ - l), s[h] = (s[h] || 0) + (u - _) * (u - _));
                        return f[h] = new a(t[h][e], 0, 0, t[h + 1][e]), f
                    },
                    u = function(t, e, a, h, u, p) {
                        var f, c, m, d, g, v, y, T, w = {},
                            x = [],
                            b = p || t[0];
                        u = "string" == typeof u ? "," + u + "," : o, null == e && (e = 1);
                        for (c in t[0]) x.push(c);
                        if (t.length > 1) {
                            for (T = t[t.length - 1], y = !0, f = x.length; --f > -1;)
                                if (c = x[f], Math.abs(b[c] - T[c]) > .05) {
                                    y = !1;
                                    break
                                }
                            y && (t = t.concat(), p && t.unshift(p), t.push(t[1]), p = t[t.length - 3])
                        }
                        for (i.length = s.length = r.length = 0, f = x.length; --f > -1;) c = x[f], n[c] = -1 !== u.indexOf("," + c + ","), w[c] = _(t, c, n[c], p);
                        for (f = i.length; --f > -1;) i[f] = Math.sqrt(i[f]), s[f] = Math.sqrt(s[f]);
                        if (!h) {
                            for (f = x.length; --f > -1;)
                                if (n[c])
                                    for (m = w[x[f]], v = m.length - 1, d = 0; v > d; d++) g = m[d + 1].da / s[d] + m[d].da / i[d], r[d] = (r[d] || 0) + g * g;
                            for (f = r.length; --f > -1;) r[f] = Math.sqrt(r[f])
                        }
                        for (f = x.length, d = a ? 4 : 1; --f > -1;) c = x[f], m = w[c], l(m, e, a, h, n[c]), y && (m.splice(0, d), m.splice(m.length - d, d));
                        return w
                    },
                    p = function(t, e, i) {
                        e = e || "soft";
                        var s, r, n, o, h, l, _, u, p, f, c, m = {},
                            d = "cubic" === e ? 3 : 2,
                            g = "soft" === e,
                            v = [];
                        if (g && i && (t = [i].concat(t)), null == t || d + 1 > t.length) throw "invalid Bezier data";
                        for (p in t[0]) v.push(p);
                        for (l = v.length; --l > -1;) {
                            for (p = v[l], m[p] = h = [], f = 0, u = t.length, _ = 0; u > _; _++) s = null == i ? t[_][p] : "string" == typeof(c = t[_][p]) && "=" === c.charAt(1) ? i[p] + Number(c.charAt(0) + c.substr(2)) : Number(c), g && _ > 1 && u - 1 > _ && (h[f++] = (s + h[f - 2]) / 2), h[f++] = s;
                            for (u = f - d + 1, f = 0, _ = 0; u > _; _ += d) s = h[_], r = h[_ + 1], n = h[_ + 2], o = 2 === d ? 0 : h[_ + 3], h[f++] = c = 3 === d ? new a(s, r, n, o) : new a(s, (2 * r + s) / 3, (2 * r + n) / 3, n);
                            h.length = f
                        }
                        return m
                    },
                    f = function(t, e, i) {
                        for (var s, r, n, a, o, h, l, _, u, p, f, c = 1 / i, m = t.length; --m > -1;)
                            for (p = t[m], n = p.a, a = p.d - n, o = p.c - n, h = p.b - n, s = r = 0, _ = 1; i >= _; _++) l = c * _, u = 1 - l, s = r - (r = (l * l * a + 3 * u * (l * o + u * h)) * l), f = m * i + _ - 1, e[f] = (e[f] || 0) + s * s
                    },
                    c = function(t, e) {
                        e = e >> 0 || 6;
                        var i, s, r, n, a = [],
                            o = [],
                            h = 0,
                            l = 0,
                            _ = e - 1,
                            u = [],
                            p = [];
                        for (i in t) f(t[i], a, e);
                        for (r = a.length, s = 0; r > s; s++) h += Math.sqrt(a[s]), n = s % e, p[n] = h, n === _ && (l += h, n = s / e >> 0, u[n] = p, o[n] = l, h = 0, p = []);
                        return {
                            length: l,
                            lengths: o,
                            segments: u
                        }
                    },
                    m = window._gsDefine.plugin({
                        propName: "bezier",
                        priority: -1,
                        API: 2,
                        global: !0,
                        init: function(t, e, i) {
                            this._target = t, e instanceof Array && (e = {
                                values: e
                            }), this._func = {}, this._round = {}, this._props = [], this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
                            var s, r, n, a, o, h = e.values || [],
                                l = {},
                                _ = h[0],
                                f = e.autoRotate || i.vars.orientToBezier;
                            this._autoRotate = f ? f instanceof Array ? f : [
                                ["x", "y", "rotation", f === !0 ? 0 : Number(f) || 0]
                            ] : null;
                            for (s in _) this._props.push(s);
                            for (n = this._props.length; --n > -1;) s = this._props[n], this._overwriteProps.push(s), r = this._func[s] = "function" == typeof t[s], l[s] = r ? t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)]() : parseFloat(t[s]), o || l[s] !== h[0][s] && (o = l);
                            if (this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? u(h, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, o) : p(h, e.type, l), this._segCount = this._beziers[s].length, this._timeRes) {
                                var m = c(this._beziers, this._timeRes);
                                this._length = m.length, this._lengths = m.lengths, this._segments = m.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
                            }
                            if (f = this._autoRotate)
                                for (f[0] instanceof Array || (this._autoRotate = f = [f]), n = f.length; --n > -1;)
                                    for (a = 0; 3 > a; a++) s = f[n][a], this._func[s] = "function" == typeof t[s] ? t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)] : !1;
                            return !0
                        },
                        set: function(e) {
                            var i, s, r, n, a, o, h, l, _, u, p = this._segCount,
                                f = this._func,
                                c = this._target;
                            if (this._timeRes) {
                                if (_ = this._lengths, u = this._curSeg, e *= this._length, r = this._li, e > this._l2 && p - 1 > r) {
                                    for (l = p - 1; l > r && e >= (this._l2 = _[++r]););
                                    this._l1 = _[r - 1], this._li = r, this._curSeg = u = this._segments[r], this._s2 = u[this._s1 = this._si = 0]
                                } else if (this._l1 > e && r > 0) {
                                    for (; r > 0 && (this._l1 = _[--r]) >= e;);
                                    0 === r && this._l1 > e ? this._l1 = 0 : r++, this._l2 = _[r], this._li = r, this._curSeg = u = this._segments[r], this._s1 = u[(this._si = u.length - 1) - 1] || 0, this._s2 = u[this._si]
                                }
                                if (i = r, e -= this._l1, r = this._si, e > this._s2 && u.length - 1 > r) {
                                    for (l = u.length - 1; l > r && e >= (this._s2 = u[++r]););
                                    this._s1 = u[r - 1], this._si = r
                                } else if (this._s1 > e && r > 0) {
                                    for (; r > 0 && (this._s1 = u[--r]) >= e;);
                                    0 === r && this._s1 > e ? this._s1 = 0 : r++, this._s2 = u[r], this._si = r
                                }
                                o = (r + (e - this._s1) / (this._s2 - this._s1)) * this._prec
                            } else i = 0 > e ? 0 : e >= 1 ? p - 1 : p * e >> 0, o = (e - i * (1 / p)) * p;
                            for (s = 1 - o, r = this._props.length; --r > -1;) n = this._props[r], a = this._beziers[n][i], h = (o * o * a.da + 3 * s * (o * a.ca + s * a.ba)) * o + a.a, this._round[n] && (h = h + (h > 0 ? .5 : -.5) >> 0), f[n] ? c[n](h) : c[n] = h;
                            if (this._autoRotate) {
                                var m, d, g, v, y, T, w, x = this._autoRotate;
                                for (r = x.length; --r > -1;) n = x[r][2], T = x[r][3] || 0, w = x[r][4] === !0 ? 1 : t, a = this._beziers[x[r][0]], m = this._beziers[x[r][1]], a && m && (a = a[i], m = m[i], d = a.a + (a.b - a.a) * o, v = a.b + (a.c - a.b) * o, d += (v - d) * o, v += (a.c + (a.d - a.c) * o - v) * o, g = m.a + (m.b - m.a) * o, y = m.b + (m.c - m.b) * o, g += (y - g) * o, y += (m.c + (m.d - m.c) * o - y) * o, h = Math.atan2(y - g, v - d) * w + T, f[n] ? c[n](h) : c[n] = h)
                            }
                        }
                    }),
                    d = m.prototype;
                m.bezierThrough = u, m.cubicToQuadratic = h, m._autoCSS = !0, m.quadraticToCubic = function(t, e, i) {
                    return new a(t, (2 * e + t) / 3, (2 * e + i) / 3, i)
                }, m._cssRegister = function() {
                    var t = window._gsDefine.globals.CSSPlugin;
                    if (t) {
                        var i = t._internals,
                            s = i._parseToProxy,
                            r = i._setPluginRatio,
                            n = i.CSSPropTween;
                        i._registerComplexSpecialProp("bezier", {
                            parser: function(t, i, a, o, h, l) {
                                i instanceof Array && (i = {
                                    values: i
                                }), l = new m;
                                var _, u, p, f = i.values,
                                    c = f.length - 1,
                                    d = [],
                                    g = {};
                                if (0 > c) return h;
                                for (_ = 0; c >= _; _++) p = s(t, f[_], o, h, l, c !== _), d[_] = p.end;
                                for (u in i) g[u] = i[u];
                                return g.values = d, h = new n(t, "bezier", 0, 0, p.pt, 2), h.data = p, h.plugin = l, h.setRatio = r, 0 === g.autoRotate && (g.autoRotate = !0), !g.autoRotate || g.autoRotate instanceof Array || (_ = g.autoRotate === !0 ? 0 : Number(g.autoRotate) * e, g.autoRotate = null != p.end.left ? [
                                    ["left", "top", "rotation", _, !0]
                                ] : null != p.end.x ? [
                                    ["x", "y", "rotation", _, !0]
                                ] : !1), g.autoRotate && (o._transform || o._enableTransforms(!1), p.autoRotate = o._target._gsTransform), l._onInitTween(p.proxy, g, o._tween), h
                            }
                        })
                    }
                }, d._roundProps = function(t, e) {
                    for (var i = this._overwriteProps, s = i.length; --s > -1;)(t[i[s]] || t.bezier || t.bezierThrough) && (this._round[i[s]] = e)
                }, d._kill = function(t) {
                    var e, i, s = this._props;
                    for (e in this._beziers)
                        if (e in t)
                            for (delete this._beziers[e], delete this._func[e], i = s.length; --i > -1;) s[i] === e && s.splice(i, 1);
                    return this._super._kill.call(this, t)
                }
            }(), window._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(t, e) {
                var i, s, r, n, a = function() {
                        t.call(this, "css"), this._overwriteProps.length = 0
                    },
                    o = {},
                    h = a.prototype = new t("css");
                h.constructor = a, a.version = "1.9.7", a.API = 2, a.defaultTransformPerspective = 0, h = "px", a.suffixMap = {
                    top: h,
                    right: h,
                    bottom: h,
                    left: h,
                    width: h,
                    height: h,
                    fontSize: h,
                    padding: h,
                    margin: h,
                    perspective: h
                };
                var l, _, u, p, f, c, m = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
                    d = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                    g = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                    v = /[^\d\-\.]/g,
                    y = /(?:\d|\-|\+|=|#|\.)*/g,
                    T = /opacity *= *([^)]*)/,
                    w = /opacity:([^;]*)/,
                    x = /alpha\(opacity *=.+?\)/i,
                    b = /^(rgb|hsl)/,
                    P = /([A-Z])/g,
                    k = /-([a-z])/gi,
                    R = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                    S = function(t, e) {
                        return e.toUpperCase()
                    },
                    A = /(?:Left|Right|Width)/i,
                    C = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                    O = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                    D = /,(?=[^\)]*(?:\(|$))/gi,
                    M = Math.PI / 180,
                    I = 180 / Math.PI,
                    F = {},
                    E = document,
                    N = E.createElement("div"),
                    L = E.createElement("img"),
                    X = a._internals = {
                        _specialProps: o
                    },
                    U = navigator.userAgent,
                    z = function() {
                        var t, e = U.indexOf("Android"),
                            i = E.createElement("div");
                        return u = -1 !== U.indexOf("Safari") && -1 === U.indexOf("Chrome") && (-1 === e || Number(U.substr(e + 8, 1)) > 3), f = u && 6 > Number(U.substr(U.indexOf("Version/") + 8, 1)), p = -1 !== U.indexOf("Firefox"), /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(U), c = parseFloat(RegExp.$1), i.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>", t = i.getElementsByTagName("a")[0], t ? /^0.55/.test(t.style.opacity) : !1
                    }(),
                    Y = function(t) {
                        return T.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                    },
                    B = function(t) {
                        window.console && console.log(t)
                    },
                    j = "",
                    q = "",
                    V = function(t, e) {
                        e = e || N;
                        var i, s, r = e.style;
                        if (void 0 !== r[t]) return t;
                        for (t = t.charAt(0).toUpperCase() + t.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], s = 5; --s > -1 && void 0 === r[i[s] + t];);
                        return s >= 0 ? (q = 3 === s ? "ms" : i[s], j = "-" + q.toLowerCase() + "-", q + t) : null
                    },
                    Z = E.defaultView ? E.defaultView.getComputedStyle : function() {},
                    G = a.getStyle = function(t, e, i, s, r) {
                        var n;
                        return z || "opacity" !== e ? (!s && t.style[e] ? n = t.style[e] : (i = i || Z(t, null)) ? (t = i.getPropertyValue(e.replace(P, "-$1").toLowerCase()), n = t || i.length ? t : i[e]) : t.currentStyle && (i = t.currentStyle, n = i[e]), null == r || n && "none" !== n && "auto" !== n && "auto auto" !== n ? n : r) : Y(t)
                    },
                    $ = function(t, e, i, s, r) {
                        if ("px" === s || !s) return i;
                        if ("auto" === s || !i) return 0;
                        var n, a = A.test(e),
                            o = t,
                            h = N.style,
                            l = 0 > i;
                        return l && (i = -i), "%" === s && -1 !== e.indexOf("border") ? n = i / 100 * (a ? t.clientWidth : t.clientHeight) : (h.cssText = "border-style:solid; border-width:0; position:absolute; line-height:0;", "%" !== s && o.appendChild ? h[a ? "borderLeftWidth" : "borderTopWidth"] = i + s : (o = t.parentNode || E.body, h[a ? "width" : "height"] = i + s), o.appendChild(N), n = parseFloat(N[a ? "offsetWidth" : "offsetHeight"]), o.removeChild(N), 0 !== n || r || (n = $(t, e, i, s, !0))), l ? -n : n
                    },
                    Q = function(t, e, i) {
                        if ("absolute" !== G(t, "position", i)) return 0;
                        var s = "left" === e ? "Left" : "Top",
                            r = G(t, "margin" + s, i);
                        return t["offset" + s] - ($(t, e, parseFloat(r), r.replace(y, "")) || 0)
                    },
                    W = function(t, e) {
                        var i, s, r = {};
                        if (e = e || Z(t, null))
                            if (i = e.length)
                                for (; --i > -1;) r[e[i].replace(k, S)] = e.getPropertyValue(e[i]);
                            else
                                for (i in e) r[i] = e[i];
                        else if (e = t.currentStyle || t.style)
                            for (i in e) r[i.replace(k, S)] = e[i];
                        return z || (r.opacity = Y(t)), s = be(t, e, !1), r.rotation = s.rotation * I, r.skewX = s.skewX * I, r.scaleX = s.scaleX, r.scaleY = s.scaleY, r.x = s.x, r.y = s.y, xe && (r.z = s.z, r.rotationX = s.rotationX * I, r.rotationY = s.rotationY * I, r.scaleZ = s.scaleZ), r.filters && delete r.filters, r
                    },
                    H = function(t, e, i, s, r) {
                        var n, a, o, h = {},
                            l = t.style;
                        for (a in i) "cssText" !== a && "length" !== a && isNaN(a) && (e[a] !== (n = i[a]) || r && r[a]) && -1 === a.indexOf("Origin") && ("number" == typeof n || "string" == typeof n) && (h[a] = "auto" !== n || "left" !== a && "top" !== a ? "" !== n && "auto" !== n && "none" !== n || "string" != typeof e[a] || "" === e[a].replace(v, "") ? n : 0 : Q(t, a), void 0 !== l[a] && (o = new ue(l, a, l[a], o)));
                        if (s)
                            for (a in s) "className" !== a && (h[a] = s[a]);
                        return {
                            difs: h,
                            firstMPT: o
                        }
                    },
                    K = {
                        width: ["Left", "Right"],
                        height: ["Top", "Bottom"]
                    },
                    J = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                    te = function(t, e, i) {
                        var s = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
                            r = K[e],
                            n = r.length;
                        for (i = i || Z(t, null); --n > -1;) s -= parseFloat(G(t, "padding" + r[n], i, !0)) || 0, s -= parseFloat(G(t, "border" + r[n] + "Width", i, !0)) || 0;
                        return s
                    },
                    ee = function(t, e) {
                        (null == t || "" === t || "auto" === t || "auto auto" === t) && (t = "0 0");
                        var i = t.split(" "),
                            s = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : i[0],
                            r = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : i[1];
                        return null == r ? r = "0" : "center" === r && (r = "50%"), ("center" === s || isNaN(parseFloat(s))) && (s = "50%"), e && (e.oxp = -1 !== s.indexOf("%"), e.oyp = -1 !== r.indexOf("%"), e.oxr = "=" === s.charAt(1), e.oyr = "=" === r.charAt(1), e.ox = parseFloat(s.replace(v, "")), e.oy = parseFloat(r.replace(v, ""))), s + " " + r + (i.length > 2 ? " " + i[2] : "")
                    },
                    ie = function(t, e) {
                        return "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e)
                    },
                    se = function(t, e) {
                        return null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * Number(t.substr(2)) + e : parseFloat(t)
                    },
                    re = function(t, e, i, s) {
                        var r, n, a, o, h = 1e-6;
                        return null == t ? o = e : "number" == typeof t ? o = t * M : (r = 2 * Math.PI, n = t.split("_"), a = Number(n[0].replace(v, "")) * (-1 === t.indexOf("rad") ? M : 1) - ("=" === t.charAt(1) ? 0 : e), n.length && (s && (s[i] = e + a), -1 !== t.indexOf("short") && (a %= r, a !== a % (r / 2) && (a = 0 > a ? a + r : a - r)), -1 !== t.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * r) % r - (0 | a / r) * r : -1 !== t.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * r) % r - (0 | a / r) * r)), o = e + a), h > o && o > -h && (o = 0), o
                    },
                    ne = {
                        aqua: [0, 255, 255],
                        lime: [0, 255, 0],
                        silver: [192, 192, 192],
                        black: [0, 0, 0],
                        maroon: [128, 0, 0],
                        teal: [0, 128, 128],
                        blue: [0, 0, 255],
                        navy: [0, 0, 128],
                        white: [255, 255, 255],
                        fuchsia: [255, 0, 255],
                        olive: [128, 128, 0],
                        yellow: [255, 255, 0],
                        orange: [255, 165, 0],
                        gray: [128, 128, 128],
                        purple: [128, 0, 128],
                        green: [0, 128, 0],
                        red: [255, 0, 0],
                        pink: [255, 192, 203],
                        cyan: [0, 255, 255],
                        transparent: [255, 255, 255, 0]
                    },
                    ae = function(t, e, i) {
                        return t = 0 > t ? t + 1 : t > 1 ? t - 1 : t, 0 | 255 * (1 > 6 * t ? e + 6 * (i - e) * t : .5 > t ? i : 2 > 3 * t ? e + 6 * (i - e) * (2 / 3 - t) : e) + .5
                    },
                    oe = function(t) {
                        var e, i, s, r, n, a;
                        return t && "" !== t ? "number" == typeof t ? [t >> 16, 255 & t >> 8, 255 & t] : ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), ne[t] ? ne[t] : "#" === t.charAt(0) ? (4 === t.length && (e = t.charAt(1), i = t.charAt(2), s = t.charAt(3), t = "#" + e + e + i + i + s + s), t = parseInt(t.substr(1), 16), [t >> 16, 255 & t >> 8, 255 & t]) : "hsl" === t.substr(0, 3) ? (t = t.match(m), r = Number(t[0]) % 360 / 360, n = Number(t[1]) / 100, a = Number(t[2]) / 100, i = .5 >= a ? a * (n + 1) : a + n - a * n, e = 2 * a - i, t.length > 3 && (t[3] = Number(t[3])), t[0] = ae(r + 1 / 3, e, i), t[1] = ae(r, e, i), t[2] = ae(r - 1 / 3, e, i), t) : (t = t.match(m) || ne.transparent, t[0] = Number(t[0]), t[1] = Number(t[1]), t[2] = Number(t[2]), t.length > 3 && (t[3] = Number(t[3])), t)) : ne.black
                    },
                    he = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
                for (h in ne) he += "|" + h + "\\b";
                he = RegExp(he + ")", "gi");
                var le = function(t, e, i, s) {
                        if (null == t) return function(t) {
                            return t
                        };
                        var r, n = e ? (t.match(he) || [""])[0] : "",
                            a = t.split(n).join("").match(g) || [],
                            o = t.substr(0, t.indexOf(a[0])),
                            h = ")" === t.charAt(t.length - 1) ? ")" : "",
                            l = -1 !== t.indexOf(" ") ? " " : ",",
                            _ = a.length,
                            u = _ > 0 ? a[0].replace(m, "") : "";
                        return _ ? r = e ? function(t) {
                            var e, p, f, c;
                            if ("number" == typeof t) t += u;
                            else if (s && D.test(t)) {
                                for (c = t.replace(D, "|").split("|"), f = 0; c.length > f; f++) c[f] = r(c[f]);
                                return c.join(",")
                            }
                            if (e = (t.match(he) || [n])[0], p = t.split(e).join("").match(g) || [], f = p.length, _ > f--)
                                for (; _ > ++f;) p[f] = i ? p[0 | (f - 1) / 2] : a[f];
                            return o + p.join(l) + l + e + h + (-1 !== t.indexOf("inset") ? " inset" : "")
                        } : function(t) {
                            var e, n, p;
                            if ("number" == typeof t) t += u;
                            else if (s && D.test(t)) {
                                for (n = t.replace(D, "|").split("|"), p = 0; n.length > p; p++) n[p] = r(n[p]);
                                return n.join(",")
                            }
                            if (e = t.match(g) || [], p = e.length, _ > p--)
                                for (; _ > ++p;) e[p] = i ? e[0 | (p - 1) / 2] : a[p];
                            return o + e.join(l) + h
                        } : function(t) {
                            return t
                        }
                    },
                    _e = function(t) {
                        return t = t.split(","),
                            function(e, i, s, r, n, a, o) {
                                var h, l = (i + "").split(" ");
                                for (o = {}, h = 0; 4 > h; h++) o[t[h]] = l[h] = l[h] || l[(h - 1) / 2 >> 0];
                                return r.parse(e, o, n, a)
                            }
                    },
                    ue = (X._setPluginRatio = function(t) {
                        this.plugin.setRatio(t);
                        for (var e, i, s, r, n = this.data, a = n.proxy, o = n.firstMPT, h = 1e-6; o;) e = a[o.v], o.r ? e = e > 0 ? 0 | e + .5 : 0 | e - .5 : h > e && e > -h && (e = 0), o.t[o.p] = e, o = o._next;
                        if (n.autoRotate && (n.autoRotate.rotation = a.rotation), 1 === t)
                            for (o = n.firstMPT; o;) {
                                if (i = o.t, i.type) {
                                    if (1 === i.type) {
                                        for (r = i.xs0 + i.s + i.xs1, s = 1; i.l > s; s++) r += i["xn" + s] + i["xs" + (s + 1)];
                                        i.e = r
                                    }
                                } else i.e = i.s + i.xs0;
                                o = o._next
                            }
                    }, function(t, e, i, s, r) {
                        this.t = t, this.p = e, this.v = i, this.r = r, s && (s._prev = this, this._next = s)
                    }),
                    pe = (X._parseToProxy = function(t, e, i, s, r, n) {
                        var a, o, h, l, _, u = s,
                            p = {},
                            f = {},
                            c = i._transform,
                            m = F;
                        for (i._transform = null, F = e, s = _ = i.parse(t, e, s, r), F = m, n && (i._transform = c, u && (u._prev = null, u._prev && (u._prev._next = null))); s && s !== u;) {
                            if (1 >= s.type && (o = s.p, f[o] = s.s + s.c, p[o] = s.s, n || (l = new ue(s, "s", o, l, s.r), s.c = 0), 1 === s.type))
                                for (a = s.l; --a > 0;) h = "xn" + a, o = s.p + "_" + h, f[o] = s.data[h], p[o] = s[h], n || (l = new ue(s, h, o, l, s.rxp[h]));
                            s = s._next
                        }
                        return {
                            proxy: p,
                            end: f,
                            firstMPT: l,
                            pt: _
                        }
                    }, X.CSSPropTween = function(t, e, s, r, a, o, h, l, _, u, p) {
                        this.t = t, this.p = e, this.s = s, this.c = r, this.n = h || "css_" + e, t instanceof pe || n.push(this.n), this.r = l, this.type = o || 0, _ && (this.pr = _, i = !0), this.b = void 0 === u ? s : u, this.e = void 0 === p ? s + r : p, a && (this._next = a, a._prev = this)
                    }),
                    fe = a.parseComplex = function(t, e, i, s, r, n, a, o, h, _) {
                        i = i || n || "", a = new pe(t, e, 0, 0, a, _ ? 2 : 1, null, !1, o, i, s), s += "";
                        var u, p, f, c, g, v, y, T, w, x, P, k, R = i.split(", ").join(",").split(" "),
                            S = s.split(", ").join(",").split(" "),
                            A = R.length,
                            C = l !== !1;
                        for ((-1 !== s.indexOf(",") || -1 !== i.indexOf(",")) && (R = R.join(" ").replace(D, ", ").split(" "), S = S.join(" ").replace(D, ", ").split(" "), A = R.length), A !== S.length && (R = (n || "").split(" "), A = R.length), a.plugin = h, a.setRatio = _, u = 0; A > u; u++)
                            if (c = R[u], g = S[u], T = parseFloat(c), T || 0 === T) a.appendXtra("", T, ie(g, T), g.replace(d, ""), C && -1 !== g.indexOf("px"), !0);
                            else if (r && ("#" === c.charAt(0) || ne[c] || b.test(c))) k = "," === g.charAt(g.length - 1) ? ")," : ")", c = oe(c), g = oe(g), w = c.length + g.length > 6, w && !z && 0 === g[3] ? (a["xs" + a.l] += a.l ? " transparent" : "transparent", a.e = a.e.split(S[u]).join("transparent")) : (z || (w = !1), a.appendXtra(w ? "rgba(" : "rgb(", c[0], g[0] - c[0], ",", !0, !0).appendXtra("", c[1], g[1] - c[1], ",", !0).appendXtra("", c[2], g[2] - c[2], w ? "," : k, !0), w && (c = 4 > c.length ? 1 : c[3], a.appendXtra("", c, (4 > g.length ? 1 : g[3]) - c, k, !1)));
                        else if (v = c.match(m)) {
                            if (y = g.match(d), !y || y.length !== v.length) return a;
                            for (f = 0, p = 0; v.length > p; p++) P = v[p], x = c.indexOf(P, f), a.appendXtra(c.substr(f, x - f), Number(P), ie(y[p], P), "", C && "px" === c.substr(x + P.length, 2), 0 === p), f = x + P.length;
                            a["xs" + a.l] += c.substr(f)
                        } else a["xs" + a.l] += a.l ? " " + c : c;
                        if (-1 !== s.indexOf("=") && a.data) {
                            for (k = a.xs0 + a.data.s, u = 1; a.l > u; u++) k += a["xs" + u] + a.data["xn" + u];
                            a.e = k + a["xs" + u]
                        }
                        return a.l || (a.type = -1, a.xs0 = a.e), a.xfirst || a
                    },
                    ce = 9;
                for (h = pe.prototype, h.l = h.pr = 0; --ce > 0;) h["xn" + ce] = 0, h["xs" + ce] = "";
                h.xs0 = "", h._next = h._prev = h.xfirst = h.data = h.plugin = h.setRatio = h.rxp = null, h.appendXtra = function(t, e, i, s, r, n) {
                    var a = this,
                        o = a.l;
                    return a["xs" + o] += n && o ? " " + t : t || "", i || 0 === o || a.plugin ? (a.l++, a.type = a.setRatio ? 2 : 1, a["xs" + a.l] = s || "", o > 0 ? (a.data["xn" + o] = e + i, a.rxp["xn" + o] = r, a["xn" + o] = e, a.plugin || (a.xfirst = new pe(a, "xn" + o, e, i, a.xfirst || a, 0, a.n, r, a.pr), a.xfirst.xs0 = 0), a) : (a.data = {
                        s: e + i
                    }, a.rxp = {}, a.s = e, a.c = i, a.r = r, a)) : (a["xs" + o] += e + (s || ""), a)
                };
                var me = function(t, e) {
                        e = e || {}, this.p = e.prefix ? V(t) || t : t, o[t] = o[this.p] = this, this.format = e.formatter || le(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0
                    },
                    de = X._registerComplexSpecialProp = function(t, e, i) {
                        "object" != typeof e && (e = {
                            parser: i
                        });
                        var s, r, n = t.split(","),
                            a = e.defaultValue;
                        for (i = i || [a], s = 0; n.length > s; s++) e.prefix = 0 === s && e.prefix, e.defaultValue = i[s] || a, r = new me(n[s], e)
                    },
                    ge = function(t) {
                        if (!o[t]) {
                            var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                            de(t, {
                                parser: function(t, i, s, r, n, a, h) {
                                    var l = (window.GreenSockGlobals || window).com.greensock.plugins[e];
                                    return l ? (l._cssRegister(), o[s].parse(t, i, s, r, n, a, h)) : (B("Error: " + e + " js file not loaded."), n)
                                }
                            })
                        }
                    };
                h = me.prototype, h.parseComplex = function(t, e, i, s, r, n) {
                    var a, o, h, l, _, u, p = this.keyword;
                    if (this.multi && (D.test(i) || D.test(e) ? (o = e.replace(D, "|").split("|"), h = i.replace(D, "|").split("|")) : p && (o = [e], h = [i])), h) {
                        for (l = h.length > o.length ? h.length : o.length, a = 0; l > a; a++) e = o[a] = o[a] || this.dflt, i = h[a] = h[a] || this.dflt, p && (_ = e.indexOf(p), u = i.indexOf(p), _ !== u && (i = -1 === u ? h : o, i[a] += " " + p));
                        e = o.join(", "), i = h.join(", ")
                    }
                    return fe(t, this.p, e, i, this.clrs, this.dflt, s, this.pr, r, n)
                }, h.parse = function(t, e, i, s, n, a) {
                    return this.parseComplex(t.style, this.format(G(t, this.p, r, !1, this.dflt)), this.format(e), n, a)
                }, a.registerSpecialProp = function(t, e, i) {
                    de(t, {
                        parser: function(t, s, r, n, a, o) {
                            var h = new pe(t, r, 0, 0, a, 2, r, !1, i);
                            return h.plugin = o, h.setRatio = e(t, s, n._tween, r), h
                        },
                        priority: i
                    })
                };
                var ve = "scaleX,scaleY,scaleZ,x,y,z,skewX,rotation,rotationX,rotationY,perspective".split(","),
                    ye = V("transform"),
                    Te = j + "transform",
                    we = V("transformOrigin"),
                    xe = null !== V("perspective"),
                    be = function(t, e, i) {
                        var s, r, n, o, h, l, _, u, p, f, c, m, d, g = i ? t._gsTransform || {
                                skewY: 0
                            } : {
                                skewY: 0
                            },
                            v = 0 > g.scaleX,
                            y = 2e-5,
                            T = 1e5,
                            w = -Math.PI + 1e-4,
                            x = Math.PI - 1e-4,
                            b = xe ? parseFloat(G(t, we, e, !1, "0 0 0").split(" ")[2]) || g.zOrigin || 0 : 0;
                        if (ye) s = G(t, Te, e, !0);
                        else if (t.currentStyle)
                            if (s = t.currentStyle.filter.match(C), s && 4 === s.length) s = [s[0].substr(4), Number(s[2].substr(4)), Number(s[1].substr(4)), s[3].substr(4), g.x || 0, g.y || 0].join(",");
                            else {
                                if (null != g.x) return g;
                                s = ""
                            }
                        for (r = (s || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], n = r.length; --n > -1;) o = Number(r[n]), r[n] = (h = o - (o |= 0)) ? (0 | h * T + (0 > h ? -.5 : .5)) / T + o : o;
                        if (16 === r.length) {
                            var P = r[8],
                                k = r[9],
                                R = r[10],
                                S = r[12],
                                A = r[13],
                                O = r[14];
                            if (g.zOrigin && (O = -g.zOrigin, S = P * O - r[12], A = k * O - r[13], O = R * O + g.zOrigin - r[14]), !i || null == g.rotationX) {
                                var D, M, I, F, E, N, L, X = r[0],
                                    U = r[1],
                                    z = r[2],
                                    Y = r[3],
                                    B = r[4],
                                    j = r[5],
                                    q = r[6],
                                    V = r[7],
                                    Z = r[11],
                                    $ = g.rotationX = Math.atan2(q, R),
                                    Q = w > $ || $ > x;
                                $ && (F = Math.cos(-$), E = Math.sin(-$), D = B * F + P * E, M = j * F + k * E, I = q * F + R * E, P = B * -E + P * F, k = j * -E + k * F, R = q * -E + R * F, Z = V * -E + Z * F, B = D, j = M, q = I), $ = g.rotationY = Math.atan2(P, X), $ && (N = w > $ || $ > x, F = Math.cos(-$), E = Math.sin(-$), D = X * F - P * E, M = U * F - k * E, I = z * F - R * E, k = U * E + k * F, R = z * E + R * F, Z = Y * E + Z * F, X = D, U = M, z = I), $ = g.rotation = Math.atan2(U, j), $ && (L = w > $ || $ > x, F = Math.cos(-$), E = Math.sin(-$), X = X * F + B * E, M = U * F + j * E, j = U * -E + j * F, q = z * -E + q * F, U = M), L && Q ? g.rotation = g.rotationX = 0 : L && N ? g.rotation = g.rotationY = 0 : N && Q && (g.rotationY = g.rotationX = 0), g.scaleX = (0 | Math.sqrt(X * X + U * U) * T + .5) / T, g.scaleY = (0 | Math.sqrt(j * j + k * k) * T + .5) / T, g.scaleZ = (0 | Math.sqrt(q * q + R * R) * T + .5) / T, g.skewX = 0, g.perspective = Z ? 1 / (0 > Z ? -Z : Z) : 0, g.x = S, g.y = A, g.z = O
                            }
                        } else if (!(xe && 0 !== r.length && g.x === r[4] && g.y === r[5] && (g.rotationX || g.rotationY) || void 0 !== g.x && "none" === G(t, "display", e))) {
                            var W = r.length >= 6,
                                H = W ? r[0] : 1,
                                K = r[1] || 0,
                                J = r[2] || 0,
                                te = W ? r[3] : 1;
                            g.x = r[4] || 0, g.y = r[5] || 0, l = Math.sqrt(H * H + K * K), _ = Math.sqrt(te * te + J * J), u = H || K ? Math.atan2(K, H) : g.rotation || 0, p = J || te ? Math.atan2(J, te) + u : g.skewX || 0, f = l - Math.abs(g.scaleX || 0), c = _ - Math.abs(g.scaleY || 0), Math.abs(p) > Math.PI / 2 && Math.abs(p) < 1.5 * Math.PI && (v ? (l *= -1, p += 0 >= u ? Math.PI : -Math.PI, u += 0 >= u ? Math.PI : -Math.PI) : (_ *= -1, p += 0 >= p ? Math.PI : -Math.PI)), m = (u - g.rotation) % Math.PI, d = (p - g.skewX) % Math.PI, (void 0 === g.skewX || f > y || -y > f || c > y || -y > c || m > w && x > m && !1 | m * T || d > w && x > d && !1 | d * T) && (g.scaleX = l, g.scaleY = _, g.rotation = u, g.skewX = p), xe && (g.rotationX = g.rotationY = g.z = 0, g.perspective = parseFloat(a.defaultTransformPerspective) || 0, g.scaleZ = 1)
                        }
                        g.zOrigin = b;
                        for (n in g) y > g[n] && g[n] > -y && (g[n] = 0);
                        return i && (t._gsTransform = g), g
                    },
                    Pe = function(t) {
                        var e, i, s = this.data,
                            r = -s.rotation,
                            n = r + s.skewX,
                            a = 1e5,
                            o = (0 | Math.cos(r) * s.scaleX * a) / a,
                            h = (0 | Math.sin(r) * s.scaleX * a) / a,
                            l = (0 | Math.sin(n) * -s.scaleY * a) / a,
                            _ = (0 | Math.cos(n) * s.scaleY * a) / a,
                            u = this.t.style,
                            p = this.t.currentStyle;
                        if (p) {
                            i = h, h = -l, l = -i, e = p.filter, u.filter = "";
                            var f, m, d = this.t.offsetWidth,
                                g = this.t.offsetHeight,
                                v = "absolute" !== p.position,
                                w = "progid:DXImageTransform.Microsoft.Matrix(M11=" + o + ", M12=" + h + ", M21=" + l + ", M22=" + _,
                                x = s.x,
                                b = s.y;
                            if (null != s.ox && (f = (s.oxp ? .01 * d * s.ox : s.ox) - d / 2, m = (s.oyp ? .01 * g * s.oy : s.oy) - g / 2, x += f - (f * o + m * h), b += m - (f * l + m * _)), v) f = d / 2, m = g / 2, w += ", Dx=" + (f - (f * o + m * h) + x) + ", Dy=" + (m - (f * l + m * _) + b) + ")";
                            else {
                                var P, k, R, S = 8 > c ? 1 : -1;
                                for (f = s.ieOffsetX || 0, m = s.ieOffsetY || 0, s.ieOffsetX = Math.round((d - ((0 > o ? -o : o) * d + (0 > h ? -h : h) * g)) / 2 + x), s.ieOffsetY = Math.round((g - ((0 > _ ? -_ : _) * g + (0 > l ? -l : l) * d)) / 2 + b), ce = 0; 4 > ce; ce++) k = J[ce], P = p[k], i = -1 !== P.indexOf("px") ? parseFloat(P) : $(this.t, k, parseFloat(P), P.replace(y, "")) || 0, R = i !== s[k] ? 2 > ce ? -s.ieOffsetX : -s.ieOffsetY : 2 > ce ? f - s.ieOffsetX : m - s.ieOffsetY, u[k] = (s[k] = Math.round(i - R * (0 === ce || 2 === ce ? 1 : S))) + "px";
                                w += ", sizingMethod='auto expand')"
                            }
                            u.filter = -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? e.replace(O, w) : w + " " + e, (0 === t || 1 === t) && 1 === o && 0 === h && 0 === l && 1 === _ && (v && -1 === w.indexOf("Dx=0, Dy=0") || T.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf("gradient(") && u.removeAttribute("filter"))
                        }
                    },
                    ke = function() {
                        var t, e, i, s, r, n, a, o, h, l = this.data,
                            _ = this.t.style,
                            u = l.perspective,
                            f = l.scaleX,
                            c = 0,
                            m = 0,
                            d = 0,
                            g = 0,
                            v = l.scaleY,
                            y = 0,
                            T = 0,
                            w = 0,
                            x = 0,
                            b = l.scaleZ,
                            P = 0,
                            k = 0,
                            R = 0,
                            S = u ? -1 / u : 0,
                            A = l.rotation,
                            C = l.zOrigin,
                            O = 1e5;
                        p && (a = _.top ? "top" : _.bottom ? "bottom" : parseFloat(G(this.t, "top", null, !1)) ? "bottom" : "top", i = G(this.t, a, null, !1), o = parseFloat(i) || 0, h = i.substr((o + "").length) || "px", l._ffFix = !l._ffFix, _[a] = (l._ffFix ? o + .05 : o - .05) + h), (A || l.skewX) && (i = f * Math.cos(A), s = v * Math.sin(A), A -= l.skewX, c = f * -Math.sin(A), v *= Math.cos(A), f = i, g = s), A = l.rotationY, A && (t = Math.cos(A), e = Math.sin(A), i = f * t, s = g * t, r = b * -e, n = S * -e, m = f * e, y = g * e, b *= t, S *= t, f = i, g = s, w = r, k = n), A = l.rotationX, A && (t = Math.cos(A), e = Math.sin(A), i = c * t + m * e, s = v * t + y * e, r = x * t + b * e, n = R * t + S * e, m = c * -e + m * t, y = v * -e + y * t, b = x * -e + b * t, S = R * -e + S * t, c = i, v = s, x = r, R = n), C && (P -= C, d = m * P, T = y * P, P = b * P + C), d = (i = (d += l.x) - (d |= 0)) ? (0 | i * O + (0 > i ? -.5 : .5)) / O + d : d, T = (i = (T += l.y) - (T |= 0)) ? (0 | i * O + (0 > i ? -.5 : .5)) / O + T : T, P = (i = (P += l.z) - (P |= 0)) ? (0 | i * O + (0 > i ? -.5 : .5)) / O + P : P, _[ye] = "matrix3d(" + [(0 | f * O) / O, (0 | g * O) / O, (0 | w * O) / O, (0 | k * O) / O, (0 | c * O) / O, (0 | v * O) / O, (0 | x * O) / O, (0 | R * O) / O, (0 | m * O) / O, (0 | y * O) / O, (0 | b * O) / O, (0 | S * O) / O, d, T, P, u ? 1 + -P / u : 1].join(",") + ")"
                    },
                    Re = function() {
                        var t, e, i, s, r, n, a, o, h, l = this.data,
                            _ = this.t,
                            u = _.style;
                        p && (t = u.top ? "top" : u.bottom ? "bottom" : parseFloat(G(_, "top", null, !1)) ? "bottom" : "top", e = G(_, t, null, !1), i = parseFloat(e) || 0, s = e.substr((i + "").length) || "px", l._ffFix = !l._ffFix, u[t] = (l._ffFix ? i + .05 : i - .05) + s), l.rotation || l.skewX ? (r = l.rotation, n = r - l.skewX, a = 1e5, o = l.scaleX * a, h = l.scaleY * a, u[ye] = "matrix(" + (0 | Math.cos(r) * o) / a + "," + (0 | Math.sin(r) * o) / a + "," + (0 | Math.sin(n) * -h) / a + "," + (0 | Math.cos(n) * h) / a + "," + l.x + "," + l.y + ")") : u[ye] = "matrix(" + l.scaleX + ",0,0," + l.scaleY + "," + l.x + "," + l.y + ")"
                    };
                de("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation", {
                    parser: function(t, e, i, s, n, a, o) {
                        if (s._transform) return n;
                        var h, l, _, u, p, f, c, m = s._transform = be(t, r, !0),
                            d = t.style,
                            g = 1e-6,
                            v = ve.length,
                            y = o,
                            T = {};
                        if ("string" == typeof y.transform && ye) _ = d.cssText, d[ye] = y.transform, d.display = "block", h = be(t, null, !1), d.cssText = _;
                        else if ("object" == typeof y) {
                            if (h = {
                                    scaleX: se(null != y.scaleX ? y.scaleX : y.scale, m.scaleX),
                                    scaleY: se(null != y.scaleY ? y.scaleY : y.scale, m.scaleY),
                                    scaleZ: se(null != y.scaleZ ? y.scaleZ : y.scale, m.scaleZ),
                                    x: se(y.x, m.x),
                                    y: se(y.y, m.y),
                                    z: se(y.z, m.z),
                                    perspective: se(y.transformPerspective, m.perspective)
                                }, c = y.directionalRotation, null != c)
                                if ("object" == typeof c)
                                    for (_ in c) y[_] = c[_];
                                else y.rotation = c;
                            h.rotation = re("rotation" in y ? y.rotation : "shortRotation" in y ? y.shortRotation + "_short" : "rotationZ" in y ? y.rotationZ : m.rotation * I, m.rotation, "rotation", T), xe && (h.rotationX = re("rotationX" in y ? y.rotationX : "shortRotationX" in y ? y.shortRotationX + "_short" : m.rotationX * I || 0, m.rotationX, "rotationX", T), h.rotationY = re("rotationY" in y ? y.rotationY : "shortRotationY" in y ? y.shortRotationY + "_short" : m.rotationY * I || 0, m.rotationY, "rotationY", T)), h.skewX = null == y.skewX ? m.skewX : re(y.skewX, m.skewX), h.skewY = null == y.skewY ? m.skewY : re(y.skewY, m.skewY), (l = h.skewY - m.skewY) && (h.skewX += l, h.rotation += l)
                        }
                        for (p = m.z || m.rotationX || m.rotationY || h.z || h.rotationX || h.rotationY || h.perspective, p || null == y.scale || (h.scaleZ = 1); --v > -1;) i = ve[v], u = h[i] - m[i], (u > g || -g > u || null != F[i]) && (f = !0, n = new pe(m, i, m[i], u, n), i in T && (n.e = T[i]), n.xs0 = 0, n.plugin = a, s._overwriteProps.push(n.n));
                        return u = y.transformOrigin, (u || xe && p && m.zOrigin) && (ye ? (f = !0, u = (u || G(t, i, r, !1, "50% 50%")) + "", i = we, n = new pe(d, i, 0, 0, n, -1, "css_transformOrigin"), n.b = d[i], n.plugin = a, xe ? (_ = m.zOrigin, u = u.split(" "), m.zOrigin = (u.length > 2 ? parseFloat(u[2]) : _) || 0, n.xs0 = n.e = d[i] = u[0] + " " + (u[1] || "50%") + " 0px", n = new pe(m, "zOrigin", 0, 0, n, -1, n.n), n.b = _, n.xs0 = n.e = m.zOrigin) : n.xs0 = n.e = d[i] = u) : ee(u + "", m)), f && (s._transformType = p || 3 === this._transformType ? 3 : 2), n
                    },
                    prefix: !0
                }), de("boxShadow", {
                    defaultValue: "0px 0px 0px 0px #999",
                    prefix: !0,
                    color: !0,
                    multi: !0,
                    keyword: "inset"
                }), de("borderRadius", {
                    defaultValue: "0px",
                    parser: function(t, e, i, n, a) {
                        e = this.format(e);
                        var o, h, l, _, u, p, f, c, m, d, g, v, y, T, w, x, b = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                            P = t.style;
                        for (m = parseFloat(t.offsetWidth), d = parseFloat(t.offsetHeight), o = e.split(" "), h = 0; b.length > h; h++) this.p.indexOf("border") && (b[h] = V(b[h])), u = _ = G(t, b[h], r, !1, "0px"), -1 !== u.indexOf(" ") && (_ = u.split(" "), u = _[0], _ = _[1]), p = l = o[h], f = parseFloat(u), v = u.substr((f + "").length), y = "=" === p.charAt(1), y ? (c = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), c *= parseFloat(p), g = p.substr((c + "").length - (0 > c ? 1 : 0)) || "") : (c = parseFloat(p), g = p.substr((c + "").length)), "" === g && (g = s[i] || v), g !== v && (T = $(t, "borderLeft", f, v), w = $(t, "borderTop", f, v), "%" === g ? (u = 100 * (T / m) + "%", _ = 100 * (w / d) + "%") : "em" === g ? (x = $(t, "borderLeft", 1, "em"), u = T / x + "em", _ = w / x + "em") : (u = T + "px", _ = w + "px"), y && (p = parseFloat(u) + c + g, l = parseFloat(_) + c + g)), a = fe(P, b[h], u + " " + _, p + " " + l, !1, "0px", a);
                        return a
                    },
                    prefix: !0,
                    formatter: le("0px 0px 0px 0px", !1, !0)
                }), de("backgroundPosition", {
                    defaultValue: "0 0",
                    parser: function(t, e, i, s, n, a) {
                        var o, h, l, _, u, p, f = "background-position",
                            m = r || Z(t, null),
                            d = this.format((m ? c ? m.getPropertyValue(f + "-x") + " " + m.getPropertyValue(f + "-y") : m.getPropertyValue(f) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
                            g = this.format(e);
                        if (-1 !== d.indexOf("%") != (-1 !== g.indexOf("%")) && (p = G(t, "backgroundImage").replace(R, ""), p && "none" !== p)) {
                            for (o = d.split(" "), h = g.split(" "), L.setAttribute("src", p), l = 2; --l > -1;) d = o[l], _ = -1 !== d.indexOf("%"), _ !== (-1 !== h[l].indexOf("%")) && (u = 0 === l ? t.offsetWidth - L.width : t.offsetHeight - L.height, o[l] = _ ? parseFloat(d) / 100 * u + "px" : 100 * (parseFloat(d) / u) + "%");
                            d = o.join(" ")
                        }
                        return this.parseComplex(t.style, d, g, n, a)
                    },
                    formatter: ee
                }), de("backgroundSize", {
                    defaultValue: "0 0",
                    formatter: ee
                }), de("perspective", {
                    defaultValue: "0px",
                    prefix: !0
                }), de("perspectiveOrigin", {
                    defaultValue: "50% 50%",
                    prefix: !0
                }), de("transformStyle", {
                    prefix: !0
                }), de("backfaceVisibility", {
                    prefix: !0
                }), de("margin", {
                    parser: _e("marginTop,marginRight,marginBottom,marginLeft")
                }), de("padding", {
                    parser: _e("paddingTop,paddingRight,paddingBottom,paddingLeft")
                }), de("clip", {
                    defaultValue: "rect(0px,0px,0px,0px)",
                    parser: function(t, e, i, s, n, a) {
                        var o, h, l;
                        return 9 > c ? (h = t.currentStyle, l = 8 > c ? " " : ",", o = "rect(" + h.clipTop + l + h.clipRight + l + h.clipBottom + l + h.clipLeft + ")", e = this.format(e).split(",").join(l)) : (o = this.format(G(t, this.p, r, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, o, e, n, a)
                    }
                }), de("textShadow", {
                    defaultValue: "0px 0px 0px #999",
                    color: !0,
                    multi: !0
                }), de("autoRound,strictUnits", {
                    parser: function(t, e, i, s, r) {
                        return r
                    }
                }), de("border", {
                    defaultValue: "0px solid #000",
                    parser: function(t, e, i, s, n, a) {
                        return this.parseComplex(t.style, this.format(G(t, "borderTopWidth", r, !1, "0px") + " " + G(t, "borderTopStyle", r, !1, "solid") + " " + G(t, "borderTopColor", r, !1, "#000")), this.format(e), n, a)
                    },
                    color: !0,
                    formatter: function(t) {
                        var e = t.split(" ");
                        return e[0] + " " + (e[1] || "solid") + " " + (t.match(he) || ["#000"])[0]
                    }
                }), de("float,cssFloat,styleFloat", {
                    parser: function(t, e, i, s, r) {
                        var n = t.style,
                            a = "cssFloat" in n ? "cssFloat" : "styleFloat";
                        return new pe(n, a, 0, 0, r, -1, i, !1, 0, n[a], e)
                    }
                });
                var Se = function(t) {
                    var e, i = this.t,
                        s = i.filter,
                        r = 0 | this.s + this.c * t;
                    100 === r && (-1 === s.indexOf("atrix(") && -1 === s.indexOf("radient(") ? (i.removeAttribute("filter"), e = !G(this.data, "filter")) : (i.filter = s.replace(x, ""), e = !0)), e || (this.xn1 && (i.filter = s = s || "alpha(opacity=100)"), -1 === s.indexOf("opacity") ? i.filter += " alpha(opacity=" + r + ")" : i.filter = s.replace(T, "opacity=" + r))
                };
                de("opacity,alpha,autoAlpha", {
                    defaultValue: "1",
                    parser: function(t, e, i, s, n, a) {
                        var o, h = parseFloat(G(t, "opacity", r, !1, "1")),
                            l = t.style;
                        return e = parseFloat(e), "autoAlpha" === i && (o = G(t, "visibility", r), 1 === h && "hidden" === o && 0 !== e && (h = 0), n = new pe(l, "visibility", 0, 0, n, -1, null, !1, 0, 0 !== h ? "visible" : "hidden", 0 === e ? "hidden" : "visible"), n.xs0 = "visible", s._overwriteProps.push(n.n)), z ? n = new pe(l, "opacity", h, e - h, n) : (n = new pe(l, "opacity", 100 * h, 100 * (e - h), n), n.xn1 = "autoAlpha" === i ? 1 : 0, l.zoom = 1, n.type = 2, n.b = "alpha(opacity=" + n.s + ")", n.e = "alpha(opacity=" + (n.s + n.c) + ")", n.data = t, n.plugin = a, n.setRatio = Se), n
                    }
                });
                var Ae = function(t, e) {
                        e && (t.removeProperty ? t.removeProperty(e.replace(P, "-$1").toLowerCase()) : t.removeAttribute(e))
                    },
                    Ce = function(t) {
                        if (this.t._gsClassPT = this, 1 === t || 0 === t) {
                            this.t.className = 0 === t ? this.b : this.e;
                            for (var e = this.data, i = this.t.style; e;) e.v ? i[e.p] = e.v : Ae(i, e.p), e = e._next;
                            1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                        } else this.t.className !== this.e && (this.t.className = this.e)
                    };
                de("className", {
                    parser: function(t, e, s, n, a, o, h) {
                        var l, _, u, p, f, c = t.className,
                            m = t.style.cssText;
                        if (a = n._classNamePT = new pe(t, s, 0, 0, a, 2), a.setRatio = Ce, a.pr = -11, i = !0, a.b = c, _ = W(t, r), u = t._gsClassPT) {
                            for (p = {}, f = u.data; f;) p[f.p] = 1, f = f._next;
                            u.setRatio(1)
                        }
                        return t._gsClassPT = a, a.e = "=" !== e.charAt(1) ? e : c.replace(RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), n._tween._duration && (t.className = a.e, l = H(t, _, W(t), h, p), t.className = c, a.data = l.firstMPT, t.style.cssText = m, a = a.xfirst = n.parse(t, l.difs, a, o)), a
                    }
                });
                var Oe = function(t) {
                    if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration)
                        for (var e, i = "all" === this.e, s = this.t.style, r = i ? s.cssText.split(";") : this.e.split(","), n = r.length, a = o.transform.parse; --n > -1;) e = r[n], i && (e = e.substr(0, e.indexOf(":")).split(" ").join("")), o[e] && (e = o[e].parse === a ? ye : o[e].p), Ae(s, e)
                };
                for (de("clearProps", {
                        parser: function(t, e, s, r, n) {
                            return n = new pe(t, s, 0, 0, n, 2), n.setRatio = Oe, n.e = e, n.pr = -10, n.data = r._tween, i = !0, n
                        }
                    }), h = "bezier,throwProps,physicsProps,physics2D".split(","), ce = h.length; ce--;) ge(h[ce]);
                h = a.prototype, h._firstPT = null, h._onInitTween = function(t, e, o) {
                    if (!t.nodeType) return !1;
                    this._target = t, this._tween = o, this._vars = e, l = e.autoRound, i = !1, s = e.suffixMap || a.suffixMap, r = Z(t, ""), n = this._overwriteProps;
                    var h, p, c, m, d, g, v, y, T, x = t.style;
                    if (_ && "" === x.zIndex && (h = G(t, "zIndex", r), ("auto" === h || "" === h) && (x.zIndex = 0)), "string" == typeof e && (m = x.cssText, h = W(t, r), x.cssText = m + ";" + e, h = H(t, h, W(t)).difs, !z && w.test(e) && (h.opacity = parseFloat(RegExp.$1)), e = h, x.cssText = m), this._firstPT = p = this.parse(t, e, null), this._transformType) {
                        for (T = 3 === this._transformType, ye ? u && (_ = !0, "" === x.zIndex && (v = G(t, "zIndex", r), ("auto" === v || "" === v) && (x.zIndex = 0)), f && (x.WebkitBackfaceVisibility = this._vars.WebkitBackfaceVisibility || (T ? "visible" : "hidden"))) : x.zoom = 1, c = p; c && c._next;) c = c._next;
                        y = new pe(t, "transform", 0, 0, null, 2), this._linkCSSP(y, null, c), y.setRatio = T && xe ? ke : ye ? Re : Pe, y.data = this._transform || be(t, r, !0), n.pop()
                    }
                    if (i) {
                        for (; p;) {
                            for (g = p._next, c = m; c && c.pr > p.pr;) c = c._next;
                            (p._prev = c ? c._prev : d) ? p._prev._next = p: m = p, (p._next = c) ? c._prev = p : d = p, p = g
                        }
                        this._firstPT = m
                    }
                    return !0
                }, h.parse = function(t, e, i, n) {
                    var a, h, _, u, p, f, c, m, d, g, v = t.style;
                    for (a in e) f = e[a], h = o[a], h ? i = h.parse(t, f, a, this, i, n, e) : (p = G(t, a, r) + "", d = "string" == typeof f, "color" === a || "fill" === a || "stroke" === a || -1 !== a.indexOf("Color") || d && b.test(f) ? (d || (f = oe(f), f = (f.length > 3 ? "rgba(" : "rgb(") + f.join(",") + ")"), i = fe(v, a, p, f, !0, "transparent", i, 0, n)) : !d || -1 === f.indexOf(" ") && -1 === f.indexOf(",") ? (_ = parseFloat(p), c = _ || 0 === _ ? p.substr((_ + "").length) : "", ("" === p || "auto" === p) && ("width" === a || "height" === a ? (_ = te(t, a, r), c = "px") : "left" === a || "top" === a ? (_ = Q(t, a, r), c = "px") : (_ = "opacity" !== a ? 0 : 1, c = "")), g = d && "=" === f.charAt(1), g ? (u = parseInt(f.charAt(0) + "1", 10), f = f.substr(2), u *= parseFloat(f), m = f.replace(y, "")) : (u = parseFloat(f), m = d ? f.substr((u + "").length) || "" : ""), "" === m && (m = s[a] || c), f = u || 0 === u ? (g ? u + _ : u) + m : e[a], c !== m && "" !== m && (u || 0 === u) && (_ || 0 === _) && (_ = $(t, a, _, c), "%" === m ? (_ /= $(t, a, 100, "%") / 100, _ > 100 && (_ = 100), e.strictUnits !== !0 && (p = _ + "%")) : "em" === m ? _ /= $(t, a, 1, "em") : (u = $(t, a, u, m), m = "px"), g && (u || 0 === u) && (f = u + _ + m)), g && (u += _), !_ && 0 !== _ || !u && 0 !== u ? void 0 !== v[a] && (f || "NaN" != f + "" && null != f) ? (i = new pe(v, a, u || _ || 0, 0, i, -1, "css_" + a, !1, 0, p, f), i.xs0 = "none" !== f || "display" !== a && -1 === a.indexOf("Style") ? f : p) : B("invalid " + a + " tween value: " + e[a]) : (i = new pe(v, a, _, u - _, i, 0, "css_" + a, l !== !1 && ("px" === m || "zIndex" === a), 0, p, f), i.xs0 = m)) : i = fe(v, a, p, f, !0, null, i, 0, n)), n && i && !i.plugin && (i.plugin = n);
                    return i
                }, h.setRatio = function(t) {
                    var e, i, s, r = this._firstPT,
                        n = 1e-6;
                    if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                        if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                            for (; r;) {
                                if (e = r.c * t + r.s, r.r ? e = e > 0 ? 0 | e + .5 : 0 | e - .5 : n > e && e > -n && (e = 0), r.type)
                                    if (1 === r.type)
                                        if (s = r.l, 2 === s) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2;
                                        else if (3 === s) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
                                else if (4 === s) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4;
                                else if (5 === s) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5;
                                else {
                                    for (i = r.xs0 + e + r.xs1, s = 1; r.l > s; s++) i += r["xn" + s] + r["xs" + (s + 1)];
                                    r.t[r.p] = i
                                } else -1 === r.type ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(t);
                                else r.t[r.p] = e + r.xs0;
                                r = r._next
                            } else
                                for (; r;) 2 !== r.type ? r.t[r.p] = r.b : r.setRatio(t), r = r._next;
                        else
                            for (; r;) 2 !== r.type ? r.t[r.p] = r.e : r.setRatio(t), r = r._next
                }, h._enableTransforms = function(t) {
                    this._transformType = t || 3 === this._transformType ? 3 : 2
                }, h._linkCSSP = function(t, e, i, s) {
                    return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), i ? i._next = t : s || null !== this._firstPT || (this._firstPT = t), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next), t._next = e, t._prev = i), t
                }, h._kill = function(e) {
                    var i, s, r, n = e;
                    if (e.css_autoAlpha || e.css_alpha) {
                        n = {};
                        for (s in e) n[s] = e[s];
                        n.css_opacity = 1, n.css_autoAlpha && (n.css_visibility = 1)
                    }
                    return e.css_className && (i = this._classNamePT) && (r = i.xfirst, r && r._prev ? this._linkCSSP(r._prev, i._next, r._prev._prev) : r === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, r._prev), this._classNamePT = null), t.prototype._kill.call(this, n)
                };
                var De = function(t, e, i) {
                    var s, r, n, a;
                    if (t.slice)
                        for (r = t.length; --r > -1;) De(t[r], e, i);
                    else
                        for (s = t.childNodes, r = s.length; --r > -1;) n = s[r], a = n.type, n.style && (e.push(W(n)), i && i.push(n)), 1 !== a && 9 !== a && 11 !== a || !n.childNodes.length || De(n, e, i)
                };
                return a.cascadeTo = function(t, i, s) {
                    var r, n, a, o = e.to(t, i, s),
                        h = [o],
                        l = [],
                        _ = [],
                        u = [],
                        p = e._internals.reservedProps;
                    for (t = o._targets || o.target, De(t, l, u), o.render(i, !0), De(t, _), o.render(0, !0), o._enabled(!0), r = u.length; --r > -1;)
                        if (n = H(u[r], l[r], _[r]), n.firstMPT) {
                            n = n.difs;
                            for (a in s) p[a] && (n[a] = s[a]);
                            h.push(e.to(u[r], i, n))
                        }
                    return h
                }, t.activate([a]), a
            }, !0),
            function() {
                var t = window._gsDefine.plugin({
                        propName: "roundProps",
                        priority: -1,
                        API: 2,
                        init: function(t, e, i) {
                            return this._tween = i, !0
                        }
                    }),
                    e = t.prototype;
                e._onInitAllProps = function() {
                    for (var t, e, i, s = this._tween, r = s.vars.roundProps instanceof Array ? s.vars.roundProps : s.vars.roundProps.split(","), n = r.length, a = {}, o = s._propLookup.roundProps; --n > -1;) a[r[n]] = 1;
                    for (n = r.length; --n > -1;)
                        for (t = r[n], e = s._firstPT; e;) i = e._next, e.pg ? e.t._roundProps(a, !0) : e.n === t && (this._add(e.t, t, e.s, e.c), i && (i._prev = e._prev), e._prev ? e._prev._next = i : s._firstPT === e && (s._firstPT = i), e._next = e._prev = null, s._propLookup[t] = o), e = i;
                    return !1
                }, e._add = function(t, e, i, s) {
                    this._addTween(t, e, i, i + s, e, !0), this._overwriteProps.push(e)
                }
            }(), window._gsDefine.plugin({
                propName: "attr",
                API: 2,
                init: function(t, e) {
                    var i;
                    if ("function" != typeof t.setAttribute) return !1;
                    this._target = t, this._proxy = {};
                    for (i in e) this._addTween(this._proxy, i, parseFloat(t.getAttribute(i)), e[i], i), this._overwriteProps.push(i);
                    return !0
                },
                set: function(t) {
                    this._super.setRatio.call(this, t);
                    for (var e, i = this._overwriteProps, s = i.length; --s > -1;) e = i[s], this._target.setAttribute(e, this._proxy[e] + "")
                }
            }), window._gsDefine.plugin({
                propName: "directionalRotation",
                API: 2,
                init: function(t, e) {
                    "object" != typeof e && (e = {
                        rotation: e
                    }), this.finals = {};
                    var i, s, r, n, a, o, h = e.useRadians === !0 ? 2 * Math.PI : 360,
                        l = 1e-6;
                    for (i in e) "useRadians" !== i && (o = (e[i] + "").split("_"), s = o[0], r = parseFloat("function" != typeof t[i] ? t[i] : t[i.indexOf("set") || "function" != typeof t["get" + i.substr(3)] ? i : "get" + i.substr(3)]()), n = this.finals[i] = "string" == typeof s && "=" === s.charAt(1) ? r + parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2)) : Number(s) || 0, a = n - r, o.length && (s = o.join("_"), -1 !== s.indexOf("short") && (a %= h, a !== a % (h / 2) && (a = 0 > a ? a + h : a - h)), -1 !== s.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * h) % h - (0 | a / h) * h : -1 !== s.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * h) % h - (0 | a / h) * h)), (a > l || -l > a) && (this._addTween(t, i, r, r + a, i), this._overwriteProps.push(i)));
                    return !0
                },
                set: function(t) {
                    var e;
                    if (1 !== t) this._super.setRatio.call(this, t);
                    else
                        for (e = this._firstPT; e;) e.f ? e.t[e.p](this.finals[e.p]) : e.t[e.p] = this.finals[e.p], e = e._next
                }
            })._autoCSS = !0, window._gsDefine("easing.Back", ["easing.Ease"], function(t) {
                var e, i, s, r = window.GreenSockGlobals || window,
                    n = r.com.greensock,
                    a = 2 * Math.PI,
                    o = Math.PI / 2,
                    h = n._class,
                    l = function(e, i) {
                        var s = h("easing." + e, function() {}, !0),
                            r = s.prototype = new t;
                        return r.constructor = s, r.getRatio = i, s
                    },
                    _ = t.register || function() {},
                    u = function(t, e, i, s) {
                        var r = h("easing." + t, {
                            easeOut: new e,
                            easeIn: new i,
                            easeInOut: new s
                        }, !0);
                        return _(r, t), r
                    },
                    p = function(t, e, i) {
                        this.t = t, this.v = e, i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t)
                    },
                    f = function(e, i) {
                        var s = h("easing." + e, function(t) {
                                this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1
                            }, !0),
                            r = s.prototype = new t;
                        return r.constructor = s, r.getRatio = i, r.config = function(t) {
                            return new s(t)
                        }, s
                    },
                    c = u("Back", f("BackOut", function(t) {
                        return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
                    }), f("BackIn", function(t) {
                        return t * t * ((this._p1 + 1) * t - this._p1)
                    }), f("BackInOut", function(t) {
                        return 1 > (t *= 2) ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
                    })),
                    m = h("easing.SlowMo", function(t, e, i) {
                        e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = i === !0
                    }, !0),
                    d = m.prototype = new t;
                return d.constructor = m, d.getRatio = function(t) {
                    var e = t + (.5 - t) * this._p;
                    return this._p1 > t ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
                }, m.ease = new m(.7, .7), d.config = m.config = function(t, e, i) {
                    return new m(t, e, i)
                }, e = h("easing.SteppedEase", function(t) {
                    t = t || 1, this._p1 = 1 / t, this._p2 = t + 1
                }, !0), d = e.prototype = new t, d.constructor = e, d.getRatio = function(t) {
                    return 0 > t ? t = 0 : t >= 1 && (t = .999999999), (this._p2 * t >> 0) * this._p1
                }, d.config = e.config = function(t) {
                    return new e(t)
                }, i = h("easing.RoughEase", function(e) {
                    e = e || {};
                    for (var i, s, r, n, a, o, h = e.taper || "none", l = [], _ = 0, u = 0 | (e.points || 20), f = u, c = e.randomize !== !1, m = e.clamp === !0, d = e.template instanceof t ? e.template : null, g = "number" == typeof e.strength ? .4 * e.strength : .4; --f > -1;) i = c ? Math.random() : 1 / u * f, s = d ? d.getRatio(i) : i, "none" === h ? r = g : "out" === h ? (n = 1 - i, r = n * n * g) : "in" === h ? r = i * i * g : .5 > i ? (n = 2 * i, r = .5 * n * n * g) : (n = 2 * (1 - i), r = .5 * n * n * g), c ? s += Math.random() * r - .5 * r : f % 2 ? s += .5 * r : s -= .5 * r, m && (s > 1 ? s = 1 : 0 > s && (s = 0)), l[_++] = {
                        x: i,
                        y: s
                    };
                    for (l.sort(function(t, e) {
                            return t.x - e.x
                        }), o = new p(1, 1, null), f = u; --f > -1;) a = l[f], o = new p(a.x, a.y, o);
                    this._prev = new p(0, 0, 0 !== o.t ? o : o.next)
                }, !0), d = i.prototype = new t, d.constructor = i, d.getRatio = function(t) {
                    var e = this._prev;
                    if (t > e.t) {
                        for (; e.next && t >= e.t;) e = e.next;
                        e = e.prev
                    } else
                        for (; e.prev && e.t >= t;) e = e.prev;
                    return this._prev = e, e.v + (t - e.t) / e.gap * e.c
                }, d.config = function(t) {
                    return new i(t)
                }, i.ease = new i, u("Bounce", l("BounceOut", function(t) {
                    return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                }), l("BounceIn", function(t) {
                    return 1 / 2.75 > (t = 1 - t) ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
                }), l("BounceInOut", function(t) {
                    var e = .5 > t;
                    return t = e ? 1 - 2 * t : 2 * t - 1, t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
                })), u("Circ", l("CircOut", function(t) {
                    return Math.sqrt(1 - (t -= 1) * t)
                }), l("CircIn", function(t) {
                    return -(Math.sqrt(1 - t * t) - 1)
                }), l("CircInOut", function(t) {
                    return 1 > (t *= 2) ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
                })), s = function(e, i, s) {
                    var r = h("easing." + e, function(t, e) {
                            this._p1 = t || 1, this._p2 = e || s, this._p3 = this._p2 / a * (Math.asin(1 / this._p1) || 0)
                        }, !0),
                        n = r.prototype = new t;
                    return n.constructor = r, n.getRatio = i, n.config = function(t, e) {
                        return new r(t, e)
                    }, r
                }, u("Elastic", s("ElasticOut", function(t) {
                    return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * a / this._p2) + 1
                }, .3), s("ElasticIn", function(t) {
                    return -(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2))
                }, .3), s("ElasticInOut", function(t) {
                    return 1 > (t *= 2) ? -.5 * this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2) : .5 * this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2) + 1
                }, .45)), u("Expo", l("ExpoOut", function(t) {
                    return 1 - Math.pow(2, -10 * t)
                }), l("ExpoIn", function(t) {
                    return Math.pow(2, 10 * (t - 1)) - .001
                }), l("ExpoInOut", function(t) {
                    return 1 > (t *= 2) ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
                })), u("Sine", l("SineOut", function(t) {
                    return Math.sin(t * o)
                }), l("SineIn", function(t) {
                    return -Math.cos(t * o) + 1
                }), l("SineInOut", function(t) {
                    return -.5 * (Math.cos(Math.PI * t) - 1)
                })), h("easing.EaseLookup", {
                    find: function(e) {
                        return t.map[e]
                    }
                }, !0), _(r.SlowMo, "SlowMo", "ease,"), _(i, "RoughEase", "ease,"), _(e, "SteppedEase", "ease,"), c
            }, !0)
    }),
    function(t) {
        "use strict";
        var e, i, s, r, n, a = t.GreenSockGlobals || t,
            o = function(t) {
                var e, i = t.split("."),
                    s = a;
                for (e = 0; i.length > e; e++) s[i[e]] = s = s[i[e]] || {};
                return s
            },
            h = o("com.greensock"),
            l = [].slice,
            _ = function() {},
            u = {},
            p = function(e, i, s, r) {
                this.sc = u[e] ? u[e].sc : [], u[e] = this, this.gsClass = null, this.func = s;
                var n = [];
                this.check = function(h) {
                    for (var l, _, f, c, m = i.length, d = m; --m > -1;)(l = u[i[m]] || new p(i[m], [])).gsClass ? (n[m] = l.gsClass, d--) : h && l.sc.push(this);
                    if (0 === d && s)
                        for (_ = ("com.greensock." + e).split("."), f = _.pop(), c = o(_.join("."))[f] = this.gsClass = s.apply(s, n), r && (a[f] = c, "function" == typeof define && define.amd ? define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + e.split(".").join("/"), [], function() {
                                return c
                            }) : "undefined" != typeof module && module.exports && (module.exports = c)), m = 0; this.sc.length > m; m++) this.sc[m].check()
                }, this.check(!0)
            },
            f = t._gsDefine = function(t, e, i, s) {
                return new p(t, e, i, s)
            },
            c = h._class = function(t, e, i) {
                return e = e || function() {}, f(t, [], function() {
                    return e
                }, i), e
            };
        f.globals = a;
        var m = [0, 0, 1, 1],
            d = [],
            g = c("easing.Ease", function(t, e, i, s) {
                this._func = t, this._type = i || 0, this._power = s || 0, this._params = e ? m.concat(e) : m
            }, !0),
            v = g.map = {},
            y = g.register = function(t, e, i, s) {
                for (var r, n, a, o, l = e.split(","), _ = l.length, u = (i || "easeIn,easeOut,easeInOut").split(","); --_ > -1;)
                    for (n = l[_], r = s ? c("easing." + n, null, !0) : h.easing[n] || {}, a = u.length; --a > -1;) o = u[a], v[n + "." + o] = v[o + n] = r[o] = t.getRatio ? t : t[o] || new t
            };
        for (s = g.prototype, s._calcEnd = !1, s.getRatio = function(t) {
                if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
                var e = this._type,
                    i = this._power,
                    s = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
                return 1 === i ? s *= s : 2 === i ? s *= s * s : 3 === i ? s *= s * s * s : 4 === i && (s *= s * s * s * s), 1 === e ? 1 - s : 2 === e ? s : .5 > t ? s / 2 : 1 - s / 2
            }, e = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], i = e.length; --i > -1;) s = e[i] + ",Power" + i, y(new g(null, null, 1, i), s, "easeOut", !0), y(new g(null, null, 2, i), s, "easeIn" + (0 === i ? ",easeNone" : "")), y(new g(null, null, 3, i), s, "easeInOut");
        v.linear = h.easing.Linear.easeIn, v.swing = h.easing.Quad.easeInOut;
        var T = c("events.EventDispatcher", function(t) {
            this._listeners = {}, this._eventTarget = t || this
        });
        s = T.prototype, s.addEventListener = function(t, e, i, s, a) {
            a = a || 0;
            var o, h, l = this._listeners[t],
                _ = 0;
            for (null == l && (this._listeners[t] = l = []), h = l.length; --h > -1;) o = l[h], o.c === e && o.s === i ? l.splice(h, 1) : 0 === _ && a > o.pr && (_ = h + 1);
            l.splice(_, 0, {
                c: e,
                s: i,
                up: s,
                pr: a
            }), this !== r || n || r.wake()
        }, s.removeEventListener = function(t, e) {
            var i, s = this._listeners[t];
            if (s)
                for (i = s.length; --i > -1;)
                    if (s[i].c === e) return s.splice(i, 1), void 0
        }, s.dispatchEvent = function(t) {
            var e, i, s, r = this._listeners[t];
            if (r)
                for (e = r.length, i = this._eventTarget; --e > -1;) s = r[e], s.up ? s.c.call(s.s || i, {
                    type: t,
                    target: i
                }) : s.c.call(s.s || i)
        };
        var w = t.requestAnimationFrame,
            x = t.cancelAnimationFrame,
            b = Date.now || function() {
                return (new Date).getTime()
            };
        for (e = ["ms", "moz", "webkit", "o"], i = e.length; --i > -1 && !w;) w = t[e[i] + "RequestAnimationFrame"], x = t[e[i] + "CancelAnimationFrame"] || t[e[i] + "CancelRequestAnimationFrame"];
        c("Ticker", function(t, e) {
            var i, s, a, o, h, l = this,
                u = b(),
                p = e !== !1 && w,
                f = function(t) {
                    l.time = (b() - u) / 1e3;
                    var e = a,
                        r = l.time - h;
                    (!i || r > 0 || t === !0) && (l.frame++, h += r + (r >= o ? .004 : o - r), l.dispatchEvent("tick")), t !== !0 && e === a && (a = s(f))
                };
            T.call(l), this.time = this.frame = 0, this.tick = function() {
                f(!0)
            }, this.sleep = function() {
                null != a && (p && x ? x(a) : clearTimeout(a), s = _, a = null, l === r && (n = !1))
            }, this.wake = function() {
                null !== a && l.sleep(), s = 0 === i ? _ : p && w ? w : function(t) {
                    return setTimeout(t, 0 | 1e3 * (h - l.time) + 1)
                }, l === r && (n = !0), f(2)
            }, this.fps = function(t) {
                return arguments.length ? (i = t, o = 1 / (i || 60), h = this.time + o, l.wake(), void 0) : i
            }, this.useRAF = function(t) {
                return arguments.length ? (l.sleep(), p = t, l.fps(i), void 0) : p
            }, l.fps(t), setTimeout(function() {
                p && (!a || 5 > l.frame) && l.useRAF(!1)
            }, 1500)
        }), s = h.Ticker.prototype = new h.events.EventDispatcher, s.constructor = h.Ticker;
        var P = c("core.Animation", function(t, e) {
            if (this.vars = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(this.vars.delay) || 0, this._timeScale = 1, this._active = this.vars.immediateRender === !0, this.data = this.vars.data, this._reversed = this.vars.reversed === !0, N) {
                n || r.wake();
                var i = this.vars.useFrames ? E : N;
                i.add(this, i._time), this.vars.paused && this.paused(!0)
            }
        });
        r = P.ticker = new h.Ticker, s = P.prototype, s._dirty = s._gc = s._initted = s._paused = !1, s._totalTime = s._time = 0, s._rawPrevTime = -1, s._next = s._last = s._onUpdate = s._timeline = s.timeline = null, s._paused = !1, s.play = function(t, e) {
            return arguments.length && this.seek(t, e), this.reversed(!1).paused(!1)
        }, s.pause = function(t, e) {
            return arguments.length && this.seek(t, e), this.paused(!0)
        }, s.resume = function(t, e) {
            return arguments.length && this.seek(t, e), this.paused(!1)
        }, s.seek = function(t, e) {
            return this.totalTime(Number(t), e !== !1)
        }, s.restart = function(t, e) {
            return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, e !== !1, !0)
        }, s.reverse = function(t, e) {
            return arguments.length && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
        }, s.render = function() {}, s.invalidate = function() {
            return this
        }, s._enabled = function(t, e) {
            return n || r.wake(), this._gc = !t, this._active = t && !this._paused && this._totalTime > 0 && this._totalTime < this._totalDuration, e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
        }, s._kill = function() {
            return this._enabled(!1, !1)
        }, s.kill = function(t, e) {
            return this._kill(t, e), this
        }, s._uncache = function(t) {
            for (var e = t ? this : this.timeline; e;) e._dirty = !0, e = e.timeline;
            return this
        }, s.eventCallback = function(t, e, i, s) {
            if (null == t) return null;
            if ("on" === t.substr(0, 2)) {
                var r, n = this.vars;
                if (1 === arguments.length) return n[t];
                if (null == e) delete n[t];
                else if (n[t] = e, n[t + "Params"] = i, n[t + "Scope"] = s, i)
                    for (r = i.length; --r > -1;) "{self}" === i[r] && (i = n[t + "Params"] = i.concat(), i[r] = this);
                "onUpdate" === t && (this._onUpdate = e)
            }
            return this
        }, s.delay = function(t) {
            return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
        }, s.duration = function(t) {
            return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
        }, s.totalDuration = function(t) {
            return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
        }, s.time = function(t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
        }, s.totalTime = function(t, e, i) {
            if (n || r.wake(), !arguments.length) return this._totalTime;
            if (this._timeline) {
                if (0 > t && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
                    this._dirty && this.totalDuration();
                    var s = this._totalDuration,
                        a = this._timeline;
                    if (t > s && !i && (t = s), this._startTime = (this._paused ? this._pauseTime : a._time) - (this._reversed ? s - t : t) / this._timeScale, a._dirty || this._uncache(!1), !a._active)
                        for (; a._timeline;) a.totalTime(a._totalTime, !0), a = a._timeline
                }
                this._gc && this._enabled(!0, !1), this._totalTime !== t && this.render(t, e, !1)
            }
            return this
        }, s.startTime = function(t) {
            return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
        }, s.timeScale = function(t) {
            if (!arguments.length) return this._timeScale;
            if (t = t || 1e-6, this._timeline && this._timeline.smoothChildTiming) {
                var e = this._pauseTime,
                    i = e || 0 === e ? e : this._timeline.totalTime();
                this._startTime = i - (i - this._startTime) * this._timeScale / t
            }
            return this._timeScale = t, this._uncache(!1)
        }, s.reversed = function(t) {
            return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._totalTime, !0)), this) : this._reversed
        }, s.paused = function(t) {
            if (!arguments.length) return this._paused;
            if (t != this._paused && this._timeline) {
                n || t || r.wake();
                var e = this._timeline.rawTime(),
                    i = e - this._pauseTime;
                !t && this._timeline.smoothChildTiming && (this._startTime += i, this._uncache(!1)), this._pauseTime = t ? e : null, this._paused = t, this._active = !t && this._totalTime > 0 && this._totalTime < this._totalDuration, t || 0 === i || 0 === this._duration || this.render(this._totalTime, !0, !0)
            }
            return this._gc && !t && this._enabled(!0, !1), this
        };
        var k = c("core.SimpleTimeline", function(t) {
            P.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
        });
        s = k.prototype = new P, s.constructor = k, s.kill()._gc = !1, s._first = s._last = null, s._sortChildren = !1, s.add = s.insert = function(t, e) {
            var i, s;
            if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), i = this._last, this._sortChildren)
                for (s = t._startTime; i && i._startTime > s;) i = i._prev;
            return i ? (t._next = i._next, i._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = i, this._timeline && this._uncache(!0), this
        }, s._remove = function(t, e) {
            return t.timeline === this && (e || t._enabled(!1, !0), t.timeline = null, t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), this._timeline && this._uncache(!0)), this
        }, s.render = function(t, e, i) {
            var s, r = this._first;
            for (this._totalTime = this._time = this._rawPrevTime = t; r;) s = r._next, (r._active || t >= r._startTime && !r._paused) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = s
        }, s.rawTime = function() {
            return n || r.wake(), this._totalTime
        };
        var R = c("TweenLite", function(t, e, i) {
                if (P.call(this, e, i), null == t) throw "Cannot tween a null target.";
                this.target = t = "string" != typeof t ? t : R.selector(t) || t;
                var s, r, n, a = t.jquery || t.length && t[0] && t[0].nodeType && t[0].style,
                    o = this.vars.overwrite;
                if (this._overwrite = o = null == o ? F[R.defaultOverwrite] : "number" == typeof o ? o >> 0 : F[o], (a || t instanceof Array) && "number" != typeof t[0])
                    for (this._targets = n = l.call(t, 0), this._propLookup = [], this._siblings = [], s = 0; n.length > s; s++) r = n[s], r ? "string" != typeof r ? r.length && r[0] && r[0].nodeType && r[0].style ? (n.splice(s--, 1), this._targets = n = n.concat(l.call(r, 0))) : (this._siblings[s] = L(r, this, !1), 1 === o && this._siblings[s].length > 1 && X(r, this, null, 1, this._siblings[s])) : (r = n[s--] = R.selector(r), "string" == typeof r && n.splice(s + 1, 1)) : n.splice(s--, 1);
                else this._propLookup = {}, this._siblings = L(t, this, !1), 1 === o && this._siblings.length > 1 && X(t, this, null, 1, this._siblings);
                (this.vars.immediateRender || 0 === e && 0 === this._delay && this.vars.immediateRender !== !1) && this.render(-this._delay, !1, !0)
            }, !0),
            S = function(t) {
                return t.length && t[0] && t[0].nodeType && t[0].style
            },
            A = function(t, e) {
                var i, s = {};
                for (i in t) I[i] || i in e && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i || !(!O[i] || O[i] && O[i]._autoCSS) || (s[i] = t[i], delete t[i]);
                t.css = s
            };
        s = R.prototype = new P, s.constructor = R, s.kill()._gc = !1, s.ratio = 0, s._firstPT = s._targets = s._overwrittenProps = s._startAt = null, s._notifyPluginsOfEnabled = !1, R.version = "1.9.7", R.defaultEase = s._ease = new g(null, null, 1, 1), R.defaultOverwrite = "auto", R.ticker = r, R.autoSleep = !0, R.selector = t.$ || t.jQuery || function(e) {
            return t.$ ? (R.selector = t.$, t.$(e)) : t.document ? t.document.getElementById("#" === e.charAt(0) ? e.substr(1) : e) : e
        };
        var C = R._internals = {},
            O = R._plugins = {},
            D = R._tweenLookup = {},
            M = 0,
            I = C.reservedProps = {
                ease: 1,
                delay: 1,
                overwrite: 1,
                onComplete: 1,
                onCompleteParams: 1,
                onCompleteScope: 1,
                useFrames: 1,
                runBackwards: 1,
                startAt: 1,
                onUpdate: 1,
                onUpdateParams: 1,
                onUpdateScope: 1,
                onStart: 1,
                onStartParams: 1,
                onStartScope: 1,
                onReverseComplete: 1,
                onReverseCompleteParams: 1,
                onReverseCompleteScope: 1,
                onRepeat: 1,
                onRepeatParams: 1,
                onRepeatScope: 1,
                easeParams: 1,
                yoyo: 1,
                immediateRender: 1,
                repeat: 1,
                repeatDelay: 1,
                data: 1,
                paused: 1,
                reversed: 1,
                autoCSS: 1
            },
            F = {
                none: 0,
                all: 1,
                auto: 2,
                concurrent: 3,
                allOnStart: 4,
                preexisting: 5,
                "true": 1,
                "false": 0
            },
            E = P._rootFramesTimeline = new k,
            N = P._rootTimeline = new k;
        N._startTime = r.time, E._startTime = r.frame, N._active = E._active = !0, P._updateRoot = function() {
            if (N.render((r.time - N._startTime) * N._timeScale, !1, !1), E.render((r.frame - E._startTime) * E._timeScale, !1, !1), !(r.frame % 120)) {
                var t, e, i;
                for (i in D) {
                    for (e = D[i].tweens, t = e.length; --t > -1;) e[t]._gc && e.splice(t, 1);
                    0 === e.length && delete D[i]
                }
                if (i = N._first, (!i || i._paused) && R.autoSleep && !E._first && 1 === r._listeners.tick.length) {
                    for (; i && i._paused;) i = i._next;
                    i || r.sleep()
                }
            }
        }, r.addEventListener("tick", P._updateRoot);
        var L = function(t, e, i) {
                var s, r, n = t._gsTweenID;
                if (D[n || (t._gsTweenID = n = "t" + M++)] || (D[n] = {
                        target: t,
                        tweens: []
                    }), e && (s = D[n].tweens, s[r = s.length] = e, i))
                    for (; --r > -1;) s[r] === e && s.splice(r, 1);
                return D[n].tweens
            },
            X = function(t, e, i, s, r) {
                var n, a, o, h;
                if (1 === s || s >= 4) {
                    for (h = r.length, n = 0; h > n; n++)
                        if ((o = r[n]) !== e) o._gc || o._enabled(!1, !1) && (a = !0);
                        else if (5 === s) break;
                    return a
                }
                var l, _ = e._startTime + 1e-10,
                    u = [],
                    p = 0,
                    f = 0 === e._duration;
                for (n = r.length; --n > -1;)(o = r[n]) === e || o._gc || o._paused || (o._timeline !== e._timeline ? (l = l || U(e, 0, f), 0 === U(o, l, f) && (u[p++] = o)) : _ >= o._startTime && o._startTime + o.totalDuration() / o._timeScale + 1e-10 > _ && ((f || !o._initted) && 2e-10 >= _ - o._startTime || (u[p++] = o)));
                for (n = p; --n > -1;) o = u[n], 2 === s && o._kill(i, t) && (a = !0), (2 !== s || !o._firstPT && o._initted) && o._enabled(!1, !1) && (a = !0);
                return a
            },
            U = function(t, e, i) {
                for (var s = t._timeline, r = s._timeScale, n = t._startTime, a = 1e-10; s._timeline;) {
                    if (n += s._startTime, r *= s._timeScale, s._paused) return -100;
                    s = s._timeline
                }
                return n /= r, n > e ? n - e : i && n === e || !t._initted && 2 * a > n - e ? a : (n += t.totalDuration() / t._timeScale / r) > e + a ? 0 : n - e - a
            };
        s._init = function() {
            var t, e, i, s, r = this.vars,
                n = this._overwrittenProps,
                a = this._duration,
                o = r.ease;
            if (r.startAt) {
                if (r.startAt.overwrite = 0, r.startAt.immediateRender = !0, this._startAt = R.to(this.target, 0, r.startAt), r.immediateRender && (this._startAt = null, 0 === this._time && 0 !== a)) return
            } else if (r.runBackwards && r.immediateRender && 0 !== a)
                if (this._startAt) this._startAt.render(-1, !0), this._startAt = null;
                else if (0 === this._time) {
                i = {};
                for (s in r) I[s] && "autoCSS" !== s || (i[s] = r[s]);
                return i.overwrite = 0, this._startAt = R.to(this.target, 0, i), void 0
            }
            if (this._ease = o ? o instanceof g ? r.easeParams instanceof Array ? o.config.apply(o, r.easeParams) : o : "function" == typeof o ? new g(o, r.easeParams) : v[o] || R.defaultEase : R.defaultEase, this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                for (t = this._targets.length; --t > -1;) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], n ? n[t] : null) && (e = !0);
            else e = this._initProps(this.target, this._propLookup, this._siblings, n);
            if (e && R._onPluginEvent("_onInitAllProps", this), n && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), r.runBackwards)
                for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
            this._onUpdate = r.onUpdate, this._initted = !0
        }, s._initProps = function(t, e, i, s) {
            var r, n, a, o, h, l, _;
            if (null == t) return !1;
            this.vars.css || t.style && t.nodeType && O.css && this.vars.autoCSS !== !1 && A(this.vars, t);
            for (r in this.vars) {
                if (I[r]) {
                    if (("onStartParams" === r || "onUpdateParams" === r || "onCompleteParams" === r || "onReverseCompleteParams" === r || "onRepeatParams" === r) && (h = this.vars[r]))
                        for (n = h.length; --n > -1;) "{self}" === h[n] && (h = this.vars[r] = h.concat(), h[n] = this)
                } else if (O[r] && (o = new O[r])._onInitTween(t, this.vars[r], this)) {
                    for (this._firstPT = l = {
                            _next: this._firstPT,
                            t: o,
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: !0,
                            n: r,
                            pg: !0,
                            pr: o._priority
                        }, n = o._overwriteProps.length; --n > -1;) e[o._overwriteProps[n]] = this._firstPT;
                    (o._priority || o._onInitAllProps) && (a = !0), (o._onDisable || o._onEnable) && (this._notifyPluginsOfEnabled = !0)
                } else this._firstPT = e[r] = l = {
                    _next: this._firstPT,
                    t: t,
                    p: r,
                    f: "function" == typeof t[r],
                    n: r,
                    pg: !1,
                    pr: 0
                }, l.s = l.f ? t[r.indexOf("set") || "function" != typeof t["get" + r.substr(3)] ? r : "get" + r.substr(3)]() : parseFloat(t[r]), _ = this.vars[r], l.c = "string" == typeof _ && "=" === _.charAt(1) ? parseInt(_.charAt(0) + "1", 10) * Number(_.substr(2)) : Number(_) - l.s || 0;
                l && l._next && (l._next._prev = l)
            }
            return s && this._kill(s, t) ? this._initProps(t, e, i, s) : this._overwrite > 1 && this._firstPT && i.length > 1 && X(t, this, e, this._overwrite, i) ? (this._kill(e, t), this._initProps(t, e, i, s)) : a
        }, s.render = function(t, e, i) {
            var s, r, n, a = this._time;
            if (t >= this._duration) this._totalTime = this._time = this._duration, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (s = !0, r = "onComplete"), 0 === this._duration && ((0 === t || 0 > this._rawPrevTime) && this._rawPrevTime !== t && (i = !0, this._rawPrevTime > 0 && (r = "onReverseComplete", e && (t = -1))), this._rawPrevTime = t);
            else if (1e-7 > t) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== a || 0 === this._duration && this._rawPrevTime > 0) && (r = "onReverseComplete", s = this._reversed), 0 > t ? (this._active = !1, 0 === this._duration && (this._rawPrevTime >= 0 && (i = !0), this._rawPrevTime = t)) : this._initted || (i = !0);
            else if (this._totalTime = this._time = t, this._easeType) {
                var o = t / this._duration,
                    h = this._easeType,
                    l = this._easePower;
                (1 === h || 3 === h && o >= .5) && (o = 1 - o), 3 === h && (o *= 2), 1 === l ? o *= o : 2 === l ? o *= o * o : 3 === l ? o *= o * o * o : 4 === l && (o *= o * o * o * o), this.ratio = 1 === h ? 1 - o : 2 === h ? o : .5 > t / this._duration ? o / 2 : 1 - o / 2
            } else this.ratio = this._ease.getRatio(t / this._duration);
            if (this._time !== a || i) {
                if (!this._initted) {
                    if (this._init(), !this._initted) return;
                    this._time && !s ? this.ratio = this._ease.getRatio(this._time / this._duration) : s && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                }
                for (this._active || this._paused || (this._active = !0), 0 === a && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === this._duration) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || d))), n = this._firstPT; n;) n.f ? n.t[n.p](n.c * this.ratio + n.s) : n.t[n.p] = n.c * this.ratio + n.s, n = n._next;
                this._onUpdate && (0 > t && this._startAt && this._startAt.render(t, e, i), e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || d)), r && (this._gc || (0 > t && this._startAt && !this._onUpdate && this._startAt.render(t, e, i), s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this.vars[r].apply(this.vars[r + "Scope"] || this, this.vars[r + "Params"] || d)))
            }
        }, s._kill = function(t, e) {
            if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._enabled(!1, !1);
            e = "string" != typeof e ? e || this._targets || this.target : R.selector(e) || e;
            var i, s, r, n, a, o, h, l;
            if ((e instanceof Array || S(e)) && "number" != typeof e[0])
                for (i = e.length; --i > -1;) this._kill(t, e[i]) && (o = !0);
            else {
                if (this._targets) {
                    for (i = this._targets.length; --i > -1;)
                        if (e === this._targets[i]) {
                            a = this._propLookup[i] || {}, this._overwrittenProps = this._overwrittenProps || [], s = this._overwrittenProps[i] = t ? this._overwrittenProps[i] || {} : "all";
                            break
                        }
                } else {
                    if (e !== this.target) return !1;
                    a = this._propLookup, s = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                }
                if (a) {
                    h = t || a, l = t !== s && "all" !== s && t !== a && (null == t || t._tempKill !== !0);
                    for (r in h)(n = a[r]) && (n.pg && n.t._kill(h) && (o = !0), n.pg && 0 !== n.t._overwriteProps.length || (n._prev ? n._prev._next = n._next : n === this._firstPT && (this._firstPT = n._next), n._next && (n._next._prev = n._prev), n._next = n._prev = null), delete a[r]), l && (s[r] = 1);
                    !this._firstPT && this._initted && this._enabled(!1, !1)
                }
            }
            return o
        }, s.invalidate = function() {
            return this._notifyPluginsOfEnabled && R._onPluginEvent("_onDisable", this), this._firstPT = null, this._overwrittenProps = null, this._onUpdate = null, this._startAt = null, this._initted = this._active = this._notifyPluginsOfEnabled = !1, this._propLookup = this._targets ? {} : [], this
        }, s._enabled = function(t, e) {
            if (n || r.wake(), t && this._gc) {
                var i, s = this._targets;
                if (s)
                    for (i = s.length; --i > -1;) this._siblings[i] = L(s[i], this, !0);
                else this._siblings = L(this.target, this, !0)
            }
            return P.prototype._enabled.call(this, t, e), this._notifyPluginsOfEnabled && this._firstPT ? R._onPluginEvent(t ? "_onEnable" : "_onDisable", this) : !1
        }, R.to = function(t, e, i) {
            return new R(t, e, i)
        }, R.from = function(t, e, i) {
            return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new R(t, e, i)
        }, R.fromTo = function(t, e, i, s) {
            return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, new R(t, e, s)
        }, R.delayedCall = function(t, e, i, s, r) {
            return new R(e, 0, {
                delay: t,
                onComplete: e,
                onCompleteParams: i,
                onCompleteScope: s,
                onReverseComplete: e,
                onReverseCompleteParams: i,
                onReverseCompleteScope: s,
                immediateRender: !1,
                useFrames: r,
                overwrite: 0
            })
        }, R.set = function(t, e) {
            return new R(t, 0, e)
        }, R.killTweensOf = R.killDelayedCallsTo = function(t, e) {
            for (var i = R.getTweensOf(t), s = i.length; --s > -1;) i[s]._kill(e, t)
        }, R.getTweensOf = function(t) {
            if (null == t) return [];
            t = "string" != typeof t ? t : R.selector(t) || t;
            var e, i, s, r;
            if ((t instanceof Array || S(t)) && "number" != typeof t[0]) {
                for (e = t.length, i = []; --e > -1;) i = i.concat(R.getTweensOf(t[e]));
                for (e = i.length; --e > -1;)
                    for (r = i[e], s = e; --s > -1;) r === i[s] && i.splice(e, 1)
            } else
                for (i = L(t).concat(), e = i.length; --e > -1;) i[e]._gc && i.splice(e, 1);
            return i
        };
        var z = c("plugins.TweenPlugin", function(t, e) {
            this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = z.prototype
        }, !0);
        if (s = z.prototype, z.version = "1.9.1", z.API = 2, s._firstPT = null, s._addTween = function(t, e, i, s, r, n) {
                var a, o;
                null != s && (a = "number" == typeof s || "=" !== s.charAt(1) ? Number(s) - i : parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2))) && (this._firstPT = o = {
                    _next: this._firstPT,
                    t: t,
                    p: e,
                    s: i,
                    c: a,
                    f: "function" == typeof t[e],
                    n: r || e,
                    r: n
                }, o._next && (o._next._prev = o))
            }, s.setRatio = function(t) {
                for (var e, i = this._firstPT, s = 1e-6; i;) e = i.c * t + i.s, i.r ? e = e + (e > 0 ? .5 : -.5) >> 0 : s > e && e > -s && (e = 0), i.f ? i.t[i.p](e) : i.t[i.p] = e, i = i._next
            }, s._kill = function(t) {
                var e, i = this._overwriteProps,
                    s = this._firstPT;
                if (null != t[this._propName]) this._overwriteProps = [];
                else
                    for (e = i.length; --e > -1;) null != t[i[e]] && i.splice(e, 1);
                for (; s;) null != t[s.n] && (s._next && (s._next._prev = s._prev), s._prev ? (s._prev._next = s._next, s._prev = null) : this._firstPT === s && (this._firstPT = s._next)), s = s._next;
                return !1
            }, s._roundProps = function(t, e) {
                for (var i = this._firstPT; i;)(t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && (i.r = e), i = i._next
            }, R._onPluginEvent = function(t, e) {
                var i, s, r, n, a, o = e._firstPT;
                if ("_onInitAllProps" === t) {
                    for (; o;) {
                        for (a = o._next, s = r; s && s.pr > o.pr;) s = s._next;
                        (o._prev = s ? s._prev : n) ? o._prev._next = o: r = o, (o._next = s) ? s._prev = o : n = o, o = a
                    }
                    o = e._firstPT = r
                }
                for (; o;) o.pg && "function" == typeof o.t[t] && o.t[t]() && (i = !0), o = o._next;
                return i
            }, z.activate = function(t) {
                for (var e = t.length; --e > -1;) t[e].API === z.API && (O[(new t[e])._propName] = t[e]);
                return !0
            }, f.plugin = function(t) {
                if (!(t && t.propName && t.init && t.API)) throw "illegal plugin definition.";
                var e, i = t.propName,
                    s = t.priority || 0,
                    r = t.overwriteProps,
                    n = {
                        init: "_onInitTween",
                        set: "setRatio",
                        kill: "_kill",
                        round: "_roundProps",
                        initAll: "_onInitAllProps"
                    },
                    a = c("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function() {
                        z.call(this, i, s), this._overwriteProps = r || []
                    }, t.global === !0),
                    o = a.prototype = new z(i);
                o.constructor = a, a.API = t.API;
                for (e in n) "function" == typeof t[e] && (o[n[e]] = t[e]);
                return a.version = t.version, z.activate([a]), a
            }, e = t._gsQueue) {
            for (i = 0; e.length > i; i++) e[i]();
            for (s in u) u[s].func || t.console.log("GSAP encountered missing dependency: com.greensock." + s)
        }
        n = !1
    }(window),
    function($) {
        $.superscrollorama = function(options) {
            function init() {
                $window.scroll(function() {
                    doUpdateOnNextTick = !0
                }), TweenLite.ticker.addEventListener("tick", tickHandler)
            }

            function cssNumericPosition($elem) {
                var obj = {
                    top: parseFloat($elem.css("top")),
                    left: parseFloat($elem.css("left"))
                };
                return isNaN(obj.top) && (obj.top = 0), isNaN(obj.left) && (obj.left = 0), obj
            }

            function tickHandler() {
                doUpdateOnNextTick && (checkScrollAnim(), doUpdateOnNextTick = !1)
            }

            function resetPinObj(pinObj) {
                pinObj.el.css("position", pinObj.origPositioning.pos), pinObj.el.css("top", pinObj.origPositioning.top), pinObj.el.css("left", pinObj.origPositioning.left)
            }

            function setTweenProgress(tween, progress) {
                tween && (tween.totalProgress ? tween.totalProgress(progress).pause() : tween.progress(progress).pause())
            }

            function checkScrollAnim() {
                var i, startPoint, endPoint, currScrollPoint = superscrollorama.settings.isVertical ? $window.scrollTop() + scrollContainerOffset.y : $window.scrollLeft() + scrollContainerOffset.x,
                    offsetAdjust = superscrollorama.settings.triggerAtCenter ? superscrollorama.settings.isVertical ? -$window.height() / 2 : -$window.width() / 2 : 0,
                    numAnim = animObjects.length;
                for (i = 0; numAnim > i; i++) {
                    var animObj = animObjects[i],
                        target = animObj.target,
                        offset = animObj.offset;
                    if ("string" == typeof target ? (targetOffset = $(target).offset() || {}, startPoint = superscrollorama.settings.isVertical ? targetOffset.top + scrollContainerOffset.y : targetOffset.left + scrollContainerOffset.x, offset += offsetAdjust) : "number" == typeof target ? startPoint = target : $.isFunction(target) ? startPoint = target.call(this) : (targetOffset = target.offset(), startPoint = superscrollorama.settings.isVertical ? targetOffset.top + scrollContainerOffset.y : targetOffset.left + scrollContainerOffset.x, offset += offsetAdjust), startPoint += offset, endPoint = startPoint + animObj.dur, currScrollPoint > startPoint && endPoint > currScrollPoint && "TWEENING" !== animObj.state && (animObj.state = "TWEENING", animObj.start = startPoint, animObj.end = endPoint), startPoint > currScrollPoint && "BEFORE" !== animObj.state && animObj.reverse) superscrollorama.settings.playoutAnimations || 0 === animObj.dur ? animObj.tween.reverse() : setTweenProgress(animObj.tween, 0), animObj.state = "BEFORE";
                    else if (currScrollPoint > endPoint && "AFTER" !== animObj.state) superscrollorama.settings.playoutAnimations || 0 === animObj.dur ? animObj.tween.play() : setTweenProgress(animObj.tween, 1), animObj.state = "AFTER";
                    else if ("TWEENING" === animObj.state) {
                        var repeatIndefinitely = !1;
                        if (animObj.tween.repeat && (repeatIndefinitely = -1 === animObj.tween.repeat()), repeatIndefinitely) {
                            var playheadPosition = animObj.tween.totalProgress();
                            (null === animObj.playeadLastPosition || playheadPosition === animObj.playeadLastPosition) && (1 === playheadPosition ? animObj.tween.yoyo() ? animObj.tween.reverse() : animObj.tween.totalProgress(0).play() : animObj.tween.play()), animObj.playeadLastPosition = playheadPosition
                        } else setTweenProgress(animObj.tween, (currScrollPoint - animObj.start) / (animObj.end - animObj.start))
                    }
                }
                var numPinned = pinnedObjects.length;
                for (i = 0; numPinned > i; i++) {
                    var pinObj = pinnedObjects[i],
                        el = pinObj.el;
                    if ("PINNED" !== pinObj.state) {
                        var pinObjSpacerOffset = pinObj.spacer.offset();
                        "UPDATE" === pinObj.state && resetPinObj(pinObj), startPoint = superscrollorama.settings.isVertical ? pinObjSpacerOffset.top + scrollContainerOffset.y : pinObjSpacerOffset.left + scrollContainerOffset.x, startPoint += pinObj.offset, endPoint = startPoint + pinObj.dur;
                        var jumpedPast = currScrollPoint > endPoint && "BEFORE" === pinObj.state || startPoint > currScrollPoint && "AFTER" === pinObj.state,
                            inPinAra = currScrollPoint > startPoint && endPoint > currScrollPoint;
                        (inPinAra || jumpedPast) && (pinObj.pushFollowers && "static" === el.css("position") && el.css("position", "relative"), pinObj.origPositioning = {
                            pos: el.css("position"),
                            top: pinObj.spacer.css("top"),
                            left: pinObj.spacer.css("left")
                        }, pinObj.fixedPositioning = {
                            top: superscrollorama.settings.isVertical ? -pinObj.offset : pinObjSpacerOffset.top,
                            left: superscrollorama.settings.isVertical ? pinObjSpacerOffset.left : -pinObj.offset
                        }, el.css("position", "fixed"), el.css("top", pinObj.fixedPositioning.top), el.css("left", pinObj.fixedPositioning.left), pinObj.pinStart = startPoint, pinObj.pinEnd = endPoint, pinObj.pushFollowers ? superscrollorama.settings.isVertical ? pinObj.spacer.height(pinObj.dur + el.outerHeight(!0)) : pinObj.spacer.width(pinObj.dur + el.outerWidth(!0)) : "absolute" === pinObj.origPositioning.pos ? (pinObj.spacer.width(0), pinObj.spacer.height(0)) : superscrollorama.settings.isVertical ? pinObj.spacer.height(el.outerHeight(!0)) : pinObj.spacer.width(el.outerWidth(!0)), "UPDATE" === pinObj.state ? pinObj.anim && setTweenProgress(pinObj.anim, 0) : pinObj.onPin && pinObj.onPin("AFTER" === pinObj.state), pinObj.state = "PINNED")
                    }
                    if ("PINNED" === pinObj.state)
                        if (currScrollPoint < pinObj.pinStart || currScrollPoint > pinObj.pinEnd) {
                            var before = currScrollPoint < pinObj.pinStart;
                            pinObj.state = before ? "BEFORE" : "AFTER", setTweenProgress(pinObj.anim, before ? 0 : 1);
                            var spacerSize = before ? 0 : pinObj.dur;
                            superscrollorama.settings.isVertical ? pinObj.spacer.height(pinObj.pushFollowers ? spacerSize : 0) : pinObj.spacer.width(pinObj.pushFollowers ? spacerSize : 0);
                            var deltay = pinObj.fixedPositioning.top - cssNumericPosition(pinObj.el).top,
                                deltax = pinObj.fixedPositioning.left - cssNumericPosition(pinObj.el).left;
                            if (resetPinObj(pinObj), !pinObj.pushFollowers || "absolute" === pinObj.origPositioning.pos) {
                                var pinOffset;
                                "relative" === pinObj.origPositioning.pos ? (pinOffset = superscrollorama.settings.isVertical ? parseFloat(pinObj.origPositioning.top) : parseFloat(pinObj.origPositioning.left), isNaN(pinOffset) && (pinOffset = 0)) : pinOffset = superscrollorama.settings.isVertical ? pinObj.spacer.position().top : pinObj.spacer.position().left;
                                var direction = superscrollorama.settings.isVertical ? "top" : "left";
                                pinObj.el.css(direction, pinOffset + spacerSize)
                            }
                            0 !== deltay && pinObj.el.css("top", cssNumericPosition(pinObj.el).top - deltay), 0 !== deltax && pinObj.el.css("left", cssNumericPosition(pinObj.el).left - deltax), pinObj.onUnpin && pinObj.onUnpin(!before)
                        } else pinObj.anim && setTweenProgress(pinObj.anim, (currScrollPoint - pinObj.pinStart) / (pinObj.pinEnd - pinObj.pinStart))
                }
            }
            var superscrollorama = this,
                defaults = {
                    isVertical: !0,
                    triggerAtCenter: !0,
                    playoutAnimations: !0,
                    reverse: !0
                };
            superscrollorama.settings = $.extend({}, defaults, options);
            var targetOffset, i, $window = $(window),
                animObjects = [],
                pinnedObjects = [],
                scrollContainerOffset = {
                    x: 0,
                    y: 0
                },
                doUpdateOnNextTick = !1;
            return superscrollorama.addTween = function(target, tween, dur, offset, reverse) {
                return tween.pause(), animObjects.push({
                    target: target,
                    tween: tween,
                    offset: offset || 0,
                    dur: dur || 0,
                    reverse: "undefined" != typeof reverse ? reverse : superscrollorama.settings.reverse,
                    state: "BEFORE"
                }), superscrollorama
            }, superscrollorama.pin = function(el, dur, vars) {
                "string" == typeof el && (el = $(el));
                var defaults = {
                    offset: 0,
                    pushFollowers: !0
                };
                vars = $.extend({}, defaults, vars), vars.anim && vars.anim.pause();
                var spacer = $('<div class="superscrollorama-pin-spacer"></div>');
                return spacer.css("position", "relative"), spacer.css("top", el.css("top")), spacer.css("left", el.css("left")), el.before(spacer), pinnedObjects.push({
                    el: el,
                    state: "BEFORE",
                    dur: dur,
                    offset: vars.offset,
                    anim: vars.anim,
                    pushFollowers: vars.pushFollowers,
                    spacer: spacer,
                    onPin: vars.onPin,
                    onUnpin: vars.onUnpin
                }), superscrollorama
            }, superscrollorama.updatePin = function(el, dur, vars) {
                "string" == typeof el && (el = $(el)), vars.anim && vars.anim.pause();
                var numPinned = pinnedObjects.length;
                for (i = 0; numPinned > i; i++) {
                    var pinObj = pinnedObjects[i];
                    el.get(0) === pinObj.el.get(0) && (dur && (pinObj.dur = dur), vars.anim && (pinObj.anim = vars.anim), vars.offset && (pinObj.offset = vars.offset), "undefined" != typeof vars.pushFollowers && (pinObj.pushFollowers = vars.pushFollowers), vars.onPin && (pinObj.onPin = vars.onPin), vars.onUnpin && (pinObj.onUnpin = vars.onUnpin), (dur || vars.anim || vars.offset) && "PINNED" === pinObj.state && (pinObj.state = "UPDATE", checkScrollAnim()))
                }
                return superscrollorama
            }, superscrollorama.removeTween = function(target, tween, reset) {
                var count = animObjects.length;
                "undefined" == typeof reset && (reset = !0);
                for (var index = 0; count > index; index++) {
                    var value = animObjects[index];
                    value.target !== target || tween && value.tween !== tween || (animObjects.splice(index, 1), reset && setTweenProgress(value.tween, 0), count--, index--)
                }
                return superscrollorama
            }, superscrollorama.removePin = function(el, reset) {
                "string" == typeof el && (el = $(el)), "undefined" == typeof reset && (reset = !0);
                for (var count = pinnedObjects.length, index = 0; count > index; index++) {
                    var value = pinnedObjects[index];
                    value.el.is(el) && (pinnedObjects.splice(index, 1), reset && (value.spacer.remove(), resetPinObj(value), value.anim && setTweenProgress(value.anim, 0)), count--, index--)
                }
                return superscrollorama
            }, superscrollorama.setScrollContainerOffset = function(x, y) {
                return scrollContainerOffset.x = x, scrollContainerOffset.y = y, superscrollorama
            }, superscrollorama.triggerCheckAnim = function(immediately) {
                return immediately ? checkScrollAnim() : doUpdateOnNextTick = !0, superscrollorama
            }, init(), superscrollorama
        }
    }(jQuery),
    function(k) {
        for (var d, f, l = document.getElementsByTagName("head")[0].style, h = ["transformProperty", "WebkitTransform", "OTransform", "msTransform", "MozTransform"], g = 0; g < h.length; g++) void 0 !== l[h[g]] && (d = h[g]);
        d && (f = d.replace(/[tT]ransform/, "TransformOrigin"), "T" == f[0] && (f[0] = "t")), eval('IE = "v"==""'), jQuery.fn.extend({
            rotate: function(a) {
                if (0 !== this.length && "undefined" != typeof a) {
                    "number" == typeof a && (a = {
                        angle: a
                    });
                    for (var b = [], c = 0, d = this.length; d > c; c++) {
                        var e = this.get(c);
                        if (e.Wilq32 && e.Wilq32.PhotoEffect) e.Wilq32.PhotoEffect._handleRotation(a);
                        else {
                            var f = k.extend(!0, {}, a),
                                e = new Wilq32.PhotoEffect(e, f)._rootObj;
                            b.push(k(e))
                        }
                    }
                    return b
                }
            },
            getRotateAngle: function() {
                for (var a = [], b = 0, c = this.length; c > b; b++) {
                    var d = this.get(b);
                    d.Wilq32 && d.Wilq32.PhotoEffect && (a[b] = d.Wilq32.PhotoEffect._angle)
                }
                return a
            },
            stopRotate: function() {
                for (var a = 0, b = this.length; b > a; a++) {
                    var c = this.get(a);
                    c.Wilq32 && c.Wilq32.PhotoEffect && clearTimeout(c.Wilq32.PhotoEffect._timer)
                }
            }
        }), Wilq32 = window.Wilq32 || {}, Wilq32.PhotoEffect = function() {
            return d ? function(a, b) {
                a.Wilq32 = {
                    PhotoEffect: this
                }, this._img = this._rootObj = this._eventObj = a, this._handleRotation(b)
            } : function(a, b) {
                if (this._img = a, this._onLoadDelegate = [b], this._rootObj = document.createElement("span"), this._rootObj.style.display = "inline-block", this._rootObj.Wilq32 = {
                        PhotoEffect: this
                    }, a.parentNode.insertBefore(this._rootObj, a), a.complete) this._Loader();
                else {
                    var c = this;
                    jQuery(this._img).bind("load", function() {
                        c._Loader()
                    })
                }
            }
        }(), Wilq32.PhotoEffect.prototype = {
            _setupParameters: function(a) {
                this._parameters = this._parameters || {}, "number" != typeof this._angle && (this._angle = 0), "number" == typeof a.angle && (this._angle = a.angle), this._parameters.animateTo = "number" == typeof a.animateTo ? a.animateTo : this._angle, this._parameters.step = a.step || this._parameters.step || null, this._parameters.easing = a.easing || this._parameters.easing || this._defaultEasing, this._parameters.duration = a.duration || this._parameters.duration || 1e3, this._parameters.callback = a.callback || this._parameters.callback || this._emptyFunction, this._parameters.center = a.center || this._parameters.center || ["50%", "50%"], this._rotationCenterX = "string" == typeof this._parameters.center[0] ? parseInt(this._parameters.center[0], 10) / 100 * this._imgWidth * this._aspectW : this._parameters.center[0], this._rotationCenterY = "string" == typeof this._parameters.center[1] ? parseInt(this._parameters.center[1], 10) / 100 * this._imgHeight * this._aspectH : this._parameters.center[1], a.bind && a.bind != this._parameters.bind && this._BindEvents(a.bind)
            },
            _emptyFunction: function() {},
            _defaultEasing: function(a, b, c, d, e) {
                return -d * ((b = b / e - 1) * b * b * b - 1) + c
            },
            _handleRotation: function(a, b) {
                d || this._img.complete || b ? (this._setupParameters(a), this._angle == this._parameters.animateTo ? this._rotate(this._angle) : this._animateStart()) : this._onLoadDelegate.push(a)
            },
            _BindEvents: function(a) {
                if (a && this._eventObj) {
                    if (this._parameters.bind) {
                        var c, b = this._parameters.bind;
                        for (c in b) b.hasOwnProperty(c) && jQuery(this._eventObj).unbind(c, b[c])
                    }
                    this._parameters.bind = a;
                    for (c in a) a.hasOwnProperty(c) && jQuery(this._eventObj).bind(c, a[c])
                }
            },
            _Loader: function() {
                return IE ? function() {
                    var a = this._img.width,
                        b = this._img.height;
                    for (this._imgWidth = a, this._imgHeight = b, this._img.parentNode.removeChild(this._img), this._vimage = this.createVMLNode("image"), this._vimage.src = this._img.src, this._vimage.style.height = b + "px", this._vimage.style.width = a + "px", this._vimage.style.position = "absolute", this._vimage.style.top = "0px", this._vimage.style.left = "0px", this._aspectW = this._aspectH = 1, this._container = this.createVMLNode("group"), this._container.style.width = a, this._container.style.height = b, this._container.style.position = "absolute", this._container.style.top = "0px", this._container.style.left = "0px", this._container.setAttribute("coordsize", a - 1 + "," + (b - 1)), this._container.appendChild(this._vimage), this._rootObj.appendChild(this._container), this._rootObj.style.position = "relative", this._rootObj.style.width = a + "px", this._rootObj.style.height = b + "px", this._rootObj.setAttribute("id", this._img.getAttribute("id")), this._rootObj.className = this._img.className, this._eventObj = this._rootObj; a = this._onLoadDelegate.shift();) this._handleRotation(a, !0)
                } : function() {
                    this._rootObj.setAttribute("id", this._img.getAttribute("id")), this._rootObj.className = this._img.className, this._imgWidth = this._img.naturalWidth, this._imgHeight = this._img.naturalHeight;
                    var a = Math.sqrt(this._imgHeight * this._imgHeight + this._imgWidth * this._imgWidth);
                    for (this._width = 3 * a, this._height = 3 * a, this._aspectW = this._img.offsetWidth / this._img.naturalWidth, this._aspectH = this._img.offsetHeight / this._img.naturalHeight, this._img.parentNode.removeChild(this._img), this._canvas = document.createElement("canvas"), this._canvas.setAttribute("width", this._width), this._canvas.style.position = "relative", this._canvas.style.left = -this._img.height * this._aspectW + "px", this._canvas.style.top = -this._img.width * this._aspectH + "px", this._canvas.Wilq32 = this._rootObj.Wilq32, this._rootObj.appendChild(this._canvas), this._rootObj.style.width = this._img.width * this._aspectW + "px", this._rootObj.style.height = this._img.height * this._aspectH + "px", this._eventObj = this._canvas, this._cnv = this._canvas.getContext("2d"); a = this._onLoadDelegate.shift();) this._handleRotation(a, !0)
                }
            }(),
            _animateStart: function() {
                this._timer && clearTimeout(this._timer), this._animateStartTime = +new Date, this._animateStartAngle = this._angle, this._animate()
            },
            _animate: function() {
                var a = +new Date,
                    b = a - this._animateStartTime > this._parameters.duration;
                if (b && !this._parameters.animatedGif) clearTimeout(this._timer);
                else {
                    (this._canvas || this._vimage || this._img) && (a = this._parameters.easing(0, a - this._animateStartTime, this._animateStartAngle, this._parameters.animateTo - this._animateStartAngle, this._parameters.duration), this._rotate(~~(10 * a) / 10)), this._parameters.step && this._parameters.step(this._angle);
                    var c = this;
                    this._timer = setTimeout(function() {
                        c._animate.call(c)
                    }, 10)
                }
                this._parameters.callback && b && (this._angle = this._parameters.animateTo, this._rotate(this._angle), this._parameters.callback.call(this._rootObj))
            },
            _rotate: function() {
                var a = Math.PI / 180;
                return IE ? function(a) {
                    this._angle = a, this._container.style.rotation = a % 360 + "deg", this._vimage.style.top = -(this._rotationCenterY - this._imgHeight / 2) + "px", this._vimage.style.left = -(this._rotationCenterX - this._imgWidth / 2) + "px", this._container.style.top = this._rotationCenterY - this._imgHeight / 2 + "px", this._container.style.left = this._rotationCenterX - this._imgWidth / 2 + "px"
                } : d ? function(a) {
                    this._angle = a, this._img.style[d] = "rotate(" + a % 360 + "deg)", this._img.style[f] = this._parameters.center.join(" ")
                } : function(b) {
                    this._angle = b, b = b % 360 * a, this._canvas.width = this._width, this._canvas.height = this._height, this._cnv.translate(this._imgWidth * this._aspectW, this._imgHeight * this._aspectH), this._cnv.translate(this._rotationCenterX, this._rotationCenterY), this._cnv.rotate(b), this._cnv.translate(-this._rotationCenterX, -this._rotationCenterY), this._cnv.scale(this._aspectW, this._aspectH), this._cnv.drawImage(this._img, 0, 0)
                }
            }()
        }, IE && (Wilq32.PhotoEffect.prototype.createVMLNode = function() {
            document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
            try {
                return !document.namespaces.rvml && document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"),
                    function(a) {
                        return document.createElement("<rvml:" + a + ' class="rvml">')
                    }
            } catch (a) {
                return function(a) {
                    return document.createElement("<" + a + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
                }
            }
        }())
    }(jQuery),
    /*
     *	jQuery carouFredSel 6.2.1
     *	Demo's and documentation:
     *	caroufredsel.dev7studios.com
     *
     *	Copyright (c) 2013 Fred Heusschen
     *	www.frebsite.nl
     *
     *	Dual licensed under the MIT and GPL licenses.
     *	http://en.wikipedia.org/wiki/MIT_License
     *	http://en.wikipedia.org/wiki/GNU_General_Public_License
     */
    function($) {
        function sc_setScroll(d, e, c) {
            return "transition" == c.transition && "swing" == e && (e = "ease"), {
                anims: [],
                duration: d,
                orgDuration: d,
                easing: e,
                startTime: getTime()
            }
        }

        function sc_startScroll(s, c) {
            for (var a = 0, l = s.anims.length; l > a; a++) {
                var b = s.anims[a];
                b && b[0][c.transition](b[1], s.duration, s.easing, b[2])
            }
        }

        function sc_stopScroll(s, finish) {
            is_boolean(finish) || (finish = !0), is_object(s.pre) && sc_stopScroll(s.pre, finish);
            for (var a = 0, l = s.anims.length; l > a; a++) {
                var b = s.anims[a];
                b[0].stop(!0), finish && (b[0].css(b[1]), is_function(b[2]) && b[2]())
            }
            is_object(s.post) && sc_stopScroll(s.post, finish)
        }

        function sc_afterScroll($c, $c2, o) {
            switch ($c2 && $c2.remove(), o.fx) {
                case "fade":
                case "crossfade":
                case "cover-fade":
                case "uncover-fade":
                    $c.css("opacity", 1), $c.css("filter", "")
            }
        }

        function sc_fireCallbacks($t, o, b, a, c) {
            if (o[b] && o[b].call($t, a), c[b].length)
                for (var i = 0, l = c[b].length; l > i; i++) c[b][i].call($t, a);
            return []
        }

        function sc_fireQueue($c, q, c) {
            return q.length && ($c.trigger(cf_e(q[0][0], c), q[0][1]), q.shift()), q
        }

        function sc_hideHiddenItems(hiddenitems) {
            hiddenitems.each(function() {
                var hi = $(this);
                hi.data("_cfs_isHidden", hi.is(":hidden")).hide()
            })
        }

        function sc_showHiddenItems(hiddenitems) {
            hiddenitems && hiddenitems.each(function() {
                var hi = $(this);
                hi.data("_cfs_isHidden") || hi.show()
            })
        }

        function sc_clearTimers(t) {
            return t.auto && clearTimeout(t.auto), t.progress && clearInterval(t.progress), t
        }

        function sc_mapCallbackArguments(i_old, i_skp, i_new, s_itm, s_dir, s_dur, w_siz) {
            return {
                width: w_siz.width,
                height: w_siz.height,
                items: {
                    old: i_old,
                    skipped: i_skp,
                    visible: i_new
                },
                scroll: {
                    items: s_itm,
                    direction: s_dir,
                    duration: s_dur
                }
            }
        }

        function sc_getDuration(sO, o, nI, siz) {
            var dur = sO.duration;
            return "none" == sO.fx ? 0 : ("auto" == dur ? dur = o.scroll.duration / o.scroll.items * nI : 10 > dur && (dur = siz / dur), 1 > dur ? 0 : ("fade" == sO.fx && (dur /= 2), Math.round(dur)))
        }

        function nv_showNavi(o, t, c) {
            var minimum = is_number(o.items.minimum) ? o.items.minimum : o.items.visible + 1;
            if ("show" == t || "hide" == t) var f = t;
            else if (minimum > t) {
                debug(c, "Not enough items (" + t + " total, " + minimum + " needed): Hiding navigation.");
                var f = "hide"
            } else var f = "show";
            var s = "show" == f ? "removeClass" : "addClass",
                h = cf_c("hidden", c);
            o.auto.button && o.auto.button[f]()[s](h), o.prev.button && o.prev.button[f]()[s](h), o.next.button && o.next.button[f]()[s](h), o.pagination.container && o.pagination.container[f]()[s](h)
        }

        function nv_enableNavi(o, f, c) {
            if (!o.circular && !o.infinite) {
                var fx = "removeClass" == f || "addClass" == f ? f : !1,
                    di = cf_c("disabled", c);
                if (o.auto.button && fx && o.auto.button[fx](di), o.prev.button) {
                    var fn = fx || 0 == f ? "addClass" : "removeClass";
                    o.prev.button[fn](di)
                }
                if (o.next.button) {
                    var fn = fx || f == o.items.visible ? "addClass" : "removeClass";
                    o.next.button[fn](di)
                }
            }
        }

        function go_getObject($tt, obj) {
            return is_function(obj) ? obj = obj.call($tt) : is_undefined(obj) && (obj = {}), obj
        }

        function go_getItemsObject($tt, obj) {
            return obj = go_getObject($tt, obj), is_number(obj) ? obj = {
                visible: obj
            } : "variable" == obj ? obj = {
                visible: obj,
                width: obj,
                height: obj
            } : is_object(obj) || (obj = {}), obj
        }

        function go_getScrollObject($tt, obj) {
            return obj = go_getObject($tt, obj), is_number(obj) ? obj = 50 >= obj ? {
                items: obj
            } : {
                duration: obj
            } : is_string(obj) ? obj = {
                easing: obj
            } : is_object(obj) || (obj = {}), obj
        }

        function go_getNaviObject($tt, obj) {
            if (obj = go_getObject($tt, obj), is_string(obj)) {
                var temp = cf_getKeyCode(obj);
                obj = -1 == temp ? $(obj) : temp
            }
            return obj
        }

        function go_getAutoObject($tt, obj) {
            return obj = go_getNaviObject($tt, obj), is_jquery(obj) ? obj = {
                button: obj
            } : is_boolean(obj) ? obj = {
                play: obj
            } : is_number(obj) && (obj = {
                timeoutDuration: obj
            }), obj.progress && (is_string(obj.progress) || is_jquery(obj.progress)) && (obj.progress = {
                bar: obj.progress
            }), obj
        }

        function go_complementAutoObject($tt, obj) {
            return is_function(obj.button) && (obj.button = obj.button.call($tt)), is_string(obj.button) && (obj.button = $(obj.button)), is_boolean(obj.play) || (obj.play = !0), is_number(obj.delay) || (obj.delay = 0), is_undefined(obj.pauseOnEvent) && (obj.pauseOnEvent = !0), is_boolean(obj.pauseOnResize) || (obj.pauseOnResize = !0), is_number(obj.timeoutDuration) || (obj.timeoutDuration = obj.duration < 10 ? 2500 : 5 * obj.duration), obj.progress && (is_function(obj.progress.bar) && (obj.progress.bar = obj.progress.bar.call($tt)), is_string(obj.progress.bar) && (obj.progress.bar = $(obj.progress.bar)), obj.progress.bar ? (is_function(obj.progress.updater) || (obj.progress.updater = $.fn.carouFredSel.progressbarUpdater), is_number(obj.progress.interval) || (obj.progress.interval = 50)) : obj.progress = !1), obj
        }

        function go_getPrevNextObject($tt, obj) {
            return obj = go_getNaviObject($tt, obj), is_jquery(obj) ? obj = {
                button: obj
            } : is_number(obj) && (obj = {
                key: obj
            }), obj
        }

        function go_complementPrevNextObject($tt, obj) {
            return is_function(obj.button) && (obj.button = obj.button.call($tt)), is_string(obj.button) && (obj.button = $(obj.button)), is_string(obj.key) && (obj.key = cf_getKeyCode(obj.key)), obj
        }

        function go_getPaginationObject($tt, obj) {
            return obj = go_getNaviObject($tt, obj), is_jquery(obj) ? obj = {
                container: obj
            } : is_boolean(obj) && (obj = {
                keys: obj
            }), obj
        }

        function go_complementPaginationObject($tt, obj) {
            return is_function(obj.container) && (obj.container = obj.container.call($tt)), is_string(obj.container) && (obj.container = $(obj.container)), is_number(obj.items) || (obj.items = !1), is_boolean(obj.keys) || (obj.keys = !1), is_function(obj.anchorBuilder) || is_false(obj.anchorBuilder) || (obj.anchorBuilder = $.fn.carouFredSel.pageAnchorBuilder), is_number(obj.deviation) || (obj.deviation = 0), obj
        }

        function go_getSwipeObject($tt, obj) {
            return is_function(obj) && (obj = obj.call($tt)), is_undefined(obj) && (obj = {
                onTouch: !1
            }), is_true(obj) ? obj = {
                onTouch: obj
            } : is_number(obj) && (obj = {
                items: obj
            }), obj
        }

        function go_complementSwipeObject($tt, obj) {
            return is_boolean(obj.onTouch) || (obj.onTouch = !0), is_boolean(obj.onMouse) || (obj.onMouse = !1), is_object(obj.options) || (obj.options = {}), is_boolean(obj.options.triggerOnTouchEnd) || (obj.options.triggerOnTouchEnd = !1), obj
        }

        function go_getMousewheelObject($tt, obj) {
            return is_function(obj) && (obj = obj.call($tt)), is_true(obj) ? obj = {} : is_number(obj) ? obj = {
                items: obj
            } : is_undefined(obj) && (obj = !1), obj
        }

        function go_complementMousewheelObject($tt, obj) {
            return obj
        }

        function gn_getItemIndex(num, dev, org, items, $cfs) {
            if (is_string(num) && (num = $(num, $cfs)), is_object(num) && (num = $(num, $cfs)), is_jquery(num) ? (num = $cfs.children().index(num), is_boolean(org) || (org = !1)) : is_boolean(org) || (org = !0), is_number(num) || (num = 0), is_number(dev) || (dev = 0), org && (num += items.first), num += dev, items.total > 0) {
                for (; num >= items.total;) num -= items.total;
                for (; 0 > num;) num += items.total
            }
            return num
        }

        function gn_getVisibleItemsPrev(i, o, s) {
            for (var t = 0, x = 0, a = s; a >= 0; a--) {
                var j = i.eq(a);
                if (t += j.is(":visible") ? j[o.d.outerWidth](!0) : 0, t > o.maxDimension) return x;
                0 == a && (a = i.length), x++
            }
        }

        function gn_getVisibleItemsPrevFilter(i, o, s) {
            return gn_getItemsPrevFilter(i, o.items.filter, o.items.visibleConf.org, s)
        }

        function gn_getScrollItemsPrevFilter(i, o, s, m) {
            return gn_getItemsPrevFilter(i, o.items.filter, m, s)
        }

        function gn_getItemsPrevFilter(i, f, m, s) {
            for (var t = 0, x = 0, a = s, l = i.length; a >= 0; a--) {
                if (x++, x == l) return x;
                var j = i.eq(a);
                if (j.is(f) && (t++, t == m)) return x;
                0 == a && (a = l)
            }
        }

        function gn_getVisibleOrg($c, o) {
            return o.items.visibleConf.org || $c.children().slice(0, o.items.visible).filter(o.items.filter).length
        }

        function gn_getVisibleItemsNext(i, o, s) {
            for (var t = 0, x = 0, a = s, l = i.length - 1; l >= a; a++) {
                var j = i.eq(a);
                if (t += j.is(":visible") ? j[o.d.outerWidth](!0) : 0, t > o.maxDimension) return x;
                if (x++, x == l + 1) return x;
                a == l && (a = -1)
            }
        }

        function gn_getVisibleItemsNextTestCircular(i, o, s, l) {
            var v = gn_getVisibleItemsNext(i, o, s);
            return o.circular || s + v > l && (v = l - s), v
        }

        function gn_getVisibleItemsNextFilter(i, o, s) {
            return gn_getItemsNextFilter(i, o.items.filter, o.items.visibleConf.org, s, o.circular)
        }

        function gn_getScrollItemsNextFilter(i, o, s, m) {
            return gn_getItemsNextFilter(i, o.items.filter, m + 1, s, o.circular) - 1
        }

        function gn_getItemsNextFilter(i, f, m, s) {
            for (var t = 0, x = 0, a = s, l = i.length - 1; l >= a; a++) {
                if (x++, x >= l) return x;
                var j = i.eq(a);
                if (j.is(f) && (t++, t == m)) return x;
                a == l && (a = -1)
            }
        }

        function gi_getCurrentItems(i, o) {
            return i.slice(0, o.items.visible)
        }

        function gi_getOldItemsPrev(i, o, n) {
            return i.slice(n, o.items.visibleConf.old + n)
        }

        function gi_getNewItemsPrev(i, o) {
            return i.slice(0, o.items.visible)
        }

        function gi_getOldItemsNext(i, o) {
            return i.slice(0, o.items.visibleConf.old)
        }

        function gi_getNewItemsNext(i, o, n) {
            return i.slice(n, o.items.visible + n)
        }

        function sz_storeMargin(i, o, d) {
            o.usePadding && (is_string(d) || (d = "_cfs_origCssMargin"), i.each(function() {
                var j = $(this),
                    m = parseInt(j.css(o.d.marginRight), 10);
                is_number(m) || (m = 0), j.data(d, m)
            }))
        }

        function sz_resetMargin(i, o, m) {
            if (o.usePadding) {
                var x = is_boolean(m) ? m : !1;
                is_number(m) || (m = 0), sz_storeMargin(i, o, "_cfs_tempCssMargin"), i.each(function() {
                    var j = $(this);
                    j.css(o.d.marginRight, x ? j.data("_cfs_tempCssMargin") : m + j.data("_cfs_origCssMargin"))
                })
            }
        }

        function sz_storeOrigCss(i) {
            i.each(function() {
                var j = $(this);
                j.data("_cfs_origCss", j.attr("style") || "")
            })
        }

        function sz_restoreOrigCss(i) {
            i.each(function() {
                var j = $(this);
                j.attr("style", j.data("_cfs_origCss") || "")
            })
        }

        function sz_setResponsiveSizes(o, all) {
            var newS = (o.items.visible, o.items[o.d.width]),
                seco = o[o.d.height],
                secp = is_percentage(seco);
            all.each(function() {
                var $t = $(this),
                    nw = newS - ms_getPaddingBorderMargin($t, o, "Width");
                $t[o.d.width](nw), secp && $t[o.d.height](ms_getPercentage(nw, seco))
            })
        }

        function sz_setSizes($c, o) {
            var $w = $c.parent(),
                $i = $c.children(),
                $v = gi_getCurrentItems($i, o),
                sz = cf_mapWrapperSizes(ms_getSizes($v, o, !0), o, !1);
            if ($w.css(sz), o.usePadding) {
                var p = o.padding,
                    r = p[o.d[1]];
                o.align && 0 > r && (r = 0);
                var $l = $v.last();
                $l.css(o.d.marginRight, $l.data("_cfs_origCssMargin") + r), $c.css(o.d.top, p[o.d[0]]), $c.css(o.d.left, p[o.d[3]])
            }
            return $c.css(o.d.width, sz[o.d.width] + 2 * ms_getTotalSize($i, o, "width")), $c.css(o.d.height, ms_getLargestSize($i, o, "height")), sz
        }

        function ms_getSizes(i, o, wrapper) {
            return [ms_getTotalSize(i, o, "width", wrapper), ms_getLargestSize(i, o, "height", wrapper)]
        }

        function ms_getLargestSize(i, o, dim, wrapper) {
            return is_boolean(wrapper) || (wrapper = !1), is_number(o[o.d[dim]]) && wrapper ? o[o.d[dim]] : is_number(o.items[o.d[dim]]) ? o.items[o.d[dim]] : (dim = dim.toLowerCase().indexOf("width") > -1 ? "outerWidth" : "outerHeight", ms_getTrueLargestSize(i, o, dim))
        }

        function ms_getTrueLargestSize(i, o, dim) {
            for (var s = 0, a = 0, l = i.length; l > a; a++) {
                var j = i.eq(a),
                    m = j.is(":visible") ? j[o.d[dim]](!0) : 0;
                m > s && (s = m)
            }
            return s
        }

        function ms_getTotalSize(i, o, dim, wrapper) {
            if (is_boolean(wrapper) || (wrapper = !1), is_number(o[o.d[dim]]) && wrapper) return o[o.d[dim]];
            if (is_number(o.items[o.d[dim]])) return o.items[o.d[dim]] * i.length;
            for (var d = dim.toLowerCase().indexOf("width") > -1 ? "outerWidth" : "outerHeight", s = 0, a = 0, l = i.length; l > a; a++) {
                var j = i.eq(a);
                s += j.is(":visible") ? j[o.d[d]](!0) : 0
            }
            return s
        }

        function ms_getParentSize($w, o, d) {
            var isVisible = $w.is(":visible");
            isVisible && $w.hide();
            var s = $w.parent()[o.d[d]]();
            return isVisible && $w.show(), s
        }

        function ms_getMaxDimension(o, a) {
            return is_number(o[o.d.width]) ? o[o.d.width] : a
        }

        function ms_hasVariableSizes(i, o, dim) {
            for (var s = !1, v = !1, a = 0, l = i.length; l > a; a++) {
                var j = i.eq(a),
                    c = j.is(":visible") ? j[o.d[dim]](!0) : 0;
                s === !1 ? s = c : s != c && (v = !0), 0 == s && (v = !0)
            }
            return v
        }

        function ms_getPaddingBorderMargin(i, o, d) {
            return i[o.d["outer" + d]](!0) - i[o.d[d.toLowerCase()]]()
        }

        function ms_getPercentage(s, o) {
            if (is_percentage(o)) {
                if (o = parseInt(o.slice(0, -1), 10), !is_number(o)) return s;
                s *= o / 100
            }
            return s
        }

        function cf_e(n, c, pf, ns, rd) {
            return is_boolean(pf) || (pf = !0), is_boolean(ns) || (ns = !0), is_boolean(rd) || (rd = !1), pf && (n = c.events.prefix + n), ns && (n = n + "." + c.events.namespace), ns && rd && (n += c.serialNumber), n
        }

        function cf_c(n, c) {
            return is_string(c.classnames[n]) ? c.classnames[n] : n
        }

        function cf_mapWrapperSizes(ws, o, p) {
            is_boolean(p) || (p = !0);
            var pad = o.usePadding && p ? o.padding : [0, 0, 0, 0],
                wra = {};
            return wra[o.d.width] = ws[0] + pad[1] + pad[3], wra[o.d.height] = ws[1] + pad[0] + pad[2], wra
        }

        function cf_sortParams(vals, typs) {
            for (var arr = [], a = 0, l1 = vals.length; l1 > a; a++)
                for (var b = 0, l2 = typs.length; l2 > b; b++)
                    if (typs[b].indexOf(typeof vals[a]) > -1 && is_undefined(arr[b])) {
                        arr[b] = vals[a];
                        break
                    }
            return arr
        }

        function cf_getPadding(p) {
            if (is_undefined(p)) return [0, 0, 0, 0];
            if (is_number(p)) return [p, p, p, p];
            if (is_string(p) && (p = p.split("px").join("").split("em").join("").split(" ")), !is_array(p)) return [0, 0, 0, 0];
            for (var i = 0; 4 > i; i++) p[i] = parseInt(p[i], 10);
            switch (p.length) {
                case 0:
                    return [0, 0, 0, 0];
                case 1:
                    return [p[0], p[0], p[0], p[0]];
                case 2:
                    return [p[0], p[1], p[0], p[1]];
                case 3:
                    return [p[0], p[1], p[2], p[1]];
                default:
                    return [p[0], p[1], p[2], p[3]]
            }
        }

        function cf_getAlignPadding(itm, o) {
            var x = is_number(o[o.d.width]) ? Math.ceil(o[o.d.width] - ms_getTotalSize(itm, o, "width")) : 0;
            switch (o.align) {
                case "left":
                    return [0, x];
                case "right":
                    return [x, 0];
                case "center":
                default:
                    return [Math.ceil(x / 2), Math.floor(x / 2)]
            }
        }

        function cf_getDimensions(o) {
            for (var dm = [
                    ["width", "innerWidth", "outerWidth", "height", "innerHeight", "outerHeight", "left", "top", "marginRight", 0, 1, 2, 3],
                    ["height", "innerHeight", "outerHeight", "width", "innerWidth", "outerWidth", "top", "left", "marginBottom", 3, 2, 1, 0]
                ], dl = dm[0].length, dx = "right" == o.direction || "left" == o.direction ? 0 : 1, dimensions = {}, d = 0; dl > d; d++) dimensions[dm[0][d]] = dm[dx][d];
            return dimensions
        }

        function cf_getAdjust(x, o, a, $t) {
            var v = x;
            if (is_function(a)) v = a.call($t, v);
            else if (is_string(a)) {
                var p = a.split("+"),
                    m = a.split("-");
                if (m.length > p.length) var neg = !0,
                    sta = m[0],
                    adj = m[1];
                else var neg = !1,
                    sta = p[0],
                    adj = p[1];
                switch (sta) {
                    case "even":
                        v = x % 2 == 1 ? x - 1 : x;
                        break;
                    case "odd":
                        v = x % 2 == 0 ? x - 1 : x;
                        break;
                    default:
                        v = x
                }
                adj = parseInt(adj, 10), is_number(adj) && (neg && (adj = -adj), v += adj)
            }
            return (!is_number(v) || 1 > v) && (v = 1), v
        }

        function cf_getItemsAdjust(x, o, a, $t) {
            return cf_getItemAdjustMinMax(cf_getAdjust(x, o, a, $t), o.items.visibleConf)
        }

        function cf_getItemAdjustMinMax(v, i) {
            return is_number(i.min) && v < i.min && (v = i.min), is_number(i.max) && v > i.max && (v = i.max), 1 > v && (v = 1), v
        }

        function cf_getSynchArr(s) {
            is_array(s) || (s = [
                [s]
            ]), is_array(s[0]) || (s = [s]);
            for (var j = 0, l = s.length; l > j; j++) is_string(s[j][0]) && (s[j][0] = $(s[j][0])), is_boolean(s[j][1]) || (s[j][1] = !0), is_boolean(s[j][2]) || (s[j][2] = !0), is_number(s[j][3]) || (s[j][3] = 0);
            return s
        }

        function cf_getKeyCode(k) {
            return "right" == k ? 39 : "left" == k ? 37 : "up" == k ? 38 : "down" == k ? 40 : -1
        }

        function cf_setCookie(n, $c, c) {
            if (n) {
                var v = $c.triggerHandler(cf_e("currentPosition", c));
                $.fn.carouFredSel.cookie.set(n, v)
            }
        }

        function cf_getCookie(n) {
            var c = $.fn.carouFredSel.cookie.get(n);
            return "" == c ? 0 : c
        }

        function in_mapCss($elem, props) {
            for (var css = {}, p = 0, l = props.length; l > p; p++) css[props[p]] = $elem.css(props[p]);
            return css
        }

        function in_complementItems(obj, opt, itm, sta) {
            return is_object(obj.visibleConf) || (obj.visibleConf = {}), is_object(obj.sizesConf) || (obj.sizesConf = {}), 0 == obj.start && is_number(sta) && (obj.start = sta), is_object(obj.visible) ? (obj.visibleConf.min = obj.visible.min, obj.visibleConf.max = obj.visible.max, obj.visible = !1) : is_string(obj.visible) ? ("variable" == obj.visible ? obj.visibleConf.variable = !0 : obj.visibleConf.adjust = obj.visible, obj.visible = !1) : is_function(obj.visible) && (obj.visibleConf.adjust = obj.visible, obj.visible = !1), is_string(obj.filter) || (obj.filter = itm.filter(":hidden").length > 0 ? ":visible" : "*"), obj[opt.d.width] || (opt.responsive ? (debug(!0, "Set a " + opt.d.width + " for the items!"), obj[opt.d.width] = ms_getTrueLargestSize(itm, opt, "outerWidth")) : obj[opt.d.width] = ms_hasVariableSizes(itm, opt, "outerWidth") ? "variable" : itm[opt.d.outerWidth](!0)), obj[opt.d.height] || (obj[opt.d.height] = ms_hasVariableSizes(itm, opt, "outerHeight") ? "variable" : itm[opt.d.outerHeight](!0)), obj.sizesConf.width = obj.width, obj.sizesConf.height = obj.height, obj
        }

        function in_complementVisibleItems(opt, avl) {
            return "variable" == opt.items[opt.d.width] && (opt.items.visibleConf.variable = !0), opt.items.visibleConf.variable || (is_number(opt[opt.d.width]) ? opt.items.visible = Math.floor(opt[opt.d.width] / opt.items[opt.d.width]) : (opt.items.visible = Math.floor(avl / opt.items[opt.d.width]), opt[opt.d.width] = opt.items.visible * opt.items[opt.d.width], opt.items.visibleConf.adjust || (opt.align = !1)), ("Infinity" == opt.items.visible || opt.items.visible < 1) && (debug(!0, 'Not a valid number of visible items: Set to "variable".'), opt.items.visibleConf.variable = !0)), opt
        }

        function in_complementPrimarySize(obj, opt, all) {
            return "auto" == obj && (obj = ms_getTrueLargestSize(all, opt, "outerWidth")), obj
        }

        function in_complementSecondarySize(obj, opt, all) {
            return "auto" == obj && (obj = ms_getTrueLargestSize(all, opt, "outerHeight")), obj || (obj = opt.items[opt.d.height]), obj
        }

        function in_getAlignPadding(o, all) {
            var p = cf_getAlignPadding(gi_getCurrentItems(all, o), o);
            return o.padding[o.d[1]] = p[1], o.padding[o.d[3]] = p[0], o
        }

        function in_getResponsiveValues(o, all) {
            var visb = cf_getItemAdjustMinMax(Math.ceil(o[o.d.width] / o.items[o.d.width]), o.items.visibleConf);
            visb > all.length && (visb = all.length);
            var newS = Math.floor(o[o.d.width] / visb);
            return o.items.visible = visb, o.items[o.d.width] = newS, o[o.d.width] = visb * newS, o
        }

        function bt_pauseOnHoverConfig(p) {
            if (is_string(p)) var i = p.indexOf("immediate") > -1 ? !0 : !1,
                r = p.indexOf("resume") > -1 ? !0 : !1;
            else var i = r = !1;
            return [i, r]
        }

        function bt_mousesheelNumber(mw) {
            return is_number(mw) ? mw : null
        }

        function is_null(a) {
            return null === a
        }

        function is_undefined(a) {
            return is_null(a) || "undefined" == typeof a || "" === a || "undefined" === a
        }

        function is_array(a) {
            return a instanceof Array
        }

        function is_jquery(a) {
            return a instanceof jQuery
        }

        function is_object(a) {
            return (a instanceof Object || "object" == typeof a) && !is_null(a) && !is_jquery(a) && !is_array(a) && !is_function(a)
        }

        function is_number(a) {
            return (a instanceof Number || "number" == typeof a) && !isNaN(a)
        }

        function is_string(a) {
            return (a instanceof String || "string" == typeof a) && !is_undefined(a) && !is_true(a) && !is_false(a)
        }

        function is_function(a) {
            return a instanceof Function || "function" == typeof a
        }

        function is_boolean(a) {
            return a instanceof Boolean || "boolean" == typeof a || is_true(a) || is_false(a)
        }

        function is_true(a) {
            return a === !0 || "true" === a
        }

        function is_false(a) {
            return a === !1 || "false" === a
        }

        function is_percentage(x) {
            return is_string(x) && "%" == x.slice(-1)
        }

        function getTime() {
            return (new Date).getTime()
        }

        function deprecated(o, n) {
            debug(!0, o + " is DEPRECATED, support for it will be removed. Use " + n + " instead.")
        }

        function debug(d, m) {
            if (!is_undefined(window.console) && !is_undefined(window.console.log)) {
                if (is_object(d)) {
                    var s = " (" + d.selector + ")";
                    d = d.debug
                } else var s = "";
                if (!d) return !1;
                m = is_string(m) ? "carouFredSel" + s + ": " + m : ["carouFredSel" + s + ":", m], window.console.log(m)
            }
            return !1
        }
        $.fn.carouFredSel || ($.fn.caroufredsel = $.fn.carouFredSel = function(options, configs) {
            if (0 == this.length) return debug(!0, 'No element found for "' + this.selector + '".'), this;
            if (this.length > 1) return this.each(function() {
                $(this).carouFredSel(options, configs)
            });
            var $cfs = this,
                $tt0 = this[0],
                starting_position = !1;
            $cfs.data("_cfs_isCarousel") && (starting_position = $cfs.triggerHandler("_cfs_triggerEvent", "currentPosition"), $cfs.trigger("_cfs_triggerEvent", ["destroy", !0]));
            var FN = {};
            FN._init = function(o, setOrig, start) {
                o = go_getObject($tt0, o), o.items = go_getItemsObject($tt0, o.items), o.scroll = go_getScrollObject($tt0, o.scroll), o.auto = go_getAutoObject($tt0, o.auto), o.prev = go_getPrevNextObject($tt0, o.prev), o.next = go_getPrevNextObject($tt0, o.next), o.pagination = go_getPaginationObject($tt0, o.pagination), o.swipe = go_getSwipeObject($tt0, o.swipe), o.mousewheel = go_getMousewheelObject($tt0, o.mousewheel), setOrig && (opts_orig = $.extend(!0, {}, $.fn.carouFredSel.defaults, o)), opts = $.extend(!0, {}, $.fn.carouFredSel.defaults, o), opts.d = cf_getDimensions(opts), crsl.direction = "up" == opts.direction || "left" == opts.direction ? "next" : "prev";
                var a_itm = $cfs.children(),
                    avail_primary = ms_getParentSize($wrp, opts, "width");
                if (is_true(opts.cookie) && (opts.cookie = "caroufredsel_cookie_" + conf.serialNumber), opts.maxDimension = ms_getMaxDimension(opts, avail_primary), opts.items = in_complementItems(opts.items, opts, a_itm, start), opts[opts.d.width] = in_complementPrimarySize(opts[opts.d.width], opts, a_itm), opts[opts.d.height] = in_complementSecondarySize(opts[opts.d.height], opts, a_itm), opts.responsive && (is_percentage(opts[opts.d.width]) || (opts[opts.d.width] = "100%")), is_percentage(opts[opts.d.width]) && (crsl.upDateOnWindowResize = !0, crsl.primarySizePercentage = opts[opts.d.width], opts[opts.d.width] = ms_getPercentage(avail_primary, crsl.primarySizePercentage), opts.items.visible || (opts.items.visibleConf.variable = !0)), opts.responsive ? (opts.usePadding = !1, opts.padding = [0, 0, 0, 0], opts.align = !1, opts.items.visibleConf.variable = !1) : (opts.items.visible || (opts = in_complementVisibleItems(opts, avail_primary)), opts[opts.d.width] || (!opts.items.visibleConf.variable && is_number(opts.items[opts.d.width]) && "*" == opts.items.filter ? (opts[opts.d.width] = opts.items.visible * opts.items[opts.d.width], opts.align = !1) : opts[opts.d.width] = "variable"), is_undefined(opts.align) && (opts.align = is_number(opts[opts.d.width]) ? "center" : !1), opts.items.visibleConf.variable && (opts.items.visible = gn_getVisibleItemsNext(a_itm, opts, 0))), "*" == opts.items.filter || opts.items.visibleConf.variable || (opts.items.visibleConf.org = opts.items.visible, opts.items.visible = gn_getVisibleItemsNextFilter(a_itm, opts, 0)), opts.items.visible = cf_getItemsAdjust(opts.items.visible, opts, opts.items.visibleConf.adjust, $tt0), opts.items.visibleConf.old = opts.items.visible, opts.responsive) opts.items.visibleConf.min || (opts.items.visibleConf.min = opts.items.visible), opts.items.visibleConf.max || (opts.items.visibleConf.max = opts.items.visible), opts = in_getResponsiveValues(opts, a_itm, avail_primary);
                else switch (opts.padding = cf_getPadding(opts.padding), "top" == opts.align ? opts.align = "left" : "bottom" == opts.align && (opts.align = "right"), opts.align) {
                    case "center":
                    case "left":
                    case "right":
                        "variable" != opts[opts.d.width] && (opts = in_getAlignPadding(opts, a_itm), opts.usePadding = !0);
                        break;
                    default:
                        opts.align = !1, opts.usePadding = 0 == opts.padding[0] && 0 == opts.padding[1] && 0 == opts.padding[2] && 0 == opts.padding[3] ? !1 : !0
                }
                is_number(opts.scroll.duration) || (opts.scroll.duration = 500), is_undefined(opts.scroll.items) && (opts.scroll.items = opts.responsive || opts.items.visibleConf.variable || "*" != opts.items.filter ? "visible" : opts.items.visible), opts.auto = $.extend(!0, {}, opts.scroll, opts.auto), opts.prev = $.extend(!0, {}, opts.scroll, opts.prev), opts.next = $.extend(!0, {}, opts.scroll, opts.next), opts.pagination = $.extend(!0, {}, opts.scroll, opts.pagination), opts.auto = go_complementAutoObject($tt0, opts.auto), opts.prev = go_complementPrevNextObject($tt0, opts.prev), opts.next = go_complementPrevNextObject($tt0, opts.next), opts.pagination = go_complementPaginationObject($tt0, opts.pagination), opts.swipe = go_complementSwipeObject($tt0, opts.swipe), opts.mousewheel = go_complementMousewheelObject($tt0, opts.mousewheel), opts.synchronise && (opts.synchronise = cf_getSynchArr(opts.synchronise)), opts.auto.onPauseStart && (opts.auto.onTimeoutStart = opts.auto.onPauseStart, deprecated("auto.onPauseStart", "auto.onTimeoutStart")), opts.auto.onPausePause && (opts.auto.onTimeoutPause = opts.auto.onPausePause, deprecated("auto.onPausePause", "auto.onTimeoutPause")), opts.auto.onPauseEnd && (opts.auto.onTimeoutEnd = opts.auto.onPauseEnd, deprecated("auto.onPauseEnd", "auto.onTimeoutEnd")), opts.auto.pauseDuration && (opts.auto.timeoutDuration = opts.auto.pauseDuration, deprecated("auto.pauseDuration", "auto.timeoutDuration"))
            }, FN._build = function() {
                $cfs.data("_cfs_isCarousel", !0);
                var a_itm = $cfs.children(),
                    orgCSS = in_mapCss($cfs, ["textAlign", "float", "position", "top", "right", "bottom", "left", "zIndex", "width", "height", "marginTop", "marginRight", "marginBottom", "marginLeft"]),
                    newPosition = "relative";
                switch (orgCSS.position) {
                    case "absolute":
                    case "fixed":
                        newPosition = orgCSS.position
                }
                "parent" == conf.wrapper ? sz_storeOrigCss($wrp) : $wrp.css(orgCSS), $wrp.css({
                    overflow: "hidden",
                    position: newPosition
                }), sz_storeOrigCss($cfs), $cfs.data("_cfs_origCssZindex", orgCSS.zIndex), $cfs.css({
                    textAlign: "left",
                    "float": "none",
                    position: "absolute",
                    top: 0,
                    right: "auto",
                    bottom: "auto",
                    left: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0,
                    marginLeft: 0
                }), sz_storeMargin(a_itm, opts), sz_storeOrigCss(a_itm), opts.responsive && sz_setResponsiveSizes(opts, a_itm)
            }, FN._bind_events = function() {
                FN._unbind_events(), $cfs.bind(cf_e("stop", conf), function(e, imm) {
                    return e.stopPropagation(), crsl.isStopped || opts.auto.button && opts.auto.button.addClass(cf_c("stopped", conf)), crsl.isStopped = !0, opts.auto.play && (opts.auto.play = !1, $cfs.trigger(cf_e("pause", conf), imm)), !0
                }), $cfs.bind(cf_e("finish", conf), function(e) {
                    return e.stopPropagation(), crsl.isScrolling && sc_stopScroll(scrl), !0
                }), $cfs.bind(cf_e("pause", conf), function(e, imm, res) {
                    if (e.stopPropagation(), tmrs = sc_clearTimers(tmrs), imm && crsl.isScrolling) {
                        scrl.isStopped = !0;
                        var nst = getTime() - scrl.startTime;
                        scrl.duration -= nst, scrl.pre && (scrl.pre.duration -= nst), scrl.post && (scrl.post.duration -= nst), sc_stopScroll(scrl, !1)
                    }
                    if (crsl.isPaused || crsl.isScrolling || res && (tmrs.timePassed += getTime() - tmrs.startTime), crsl.isPaused || opts.auto.button && opts.auto.button.addClass(cf_c("paused", conf)), crsl.isPaused = !0, opts.auto.onTimeoutPause) {
                        var dur1 = opts.auto.timeoutDuration - tmrs.timePassed,
                            perc = 100 - Math.ceil(100 * dur1 / opts.auto.timeoutDuration);
                        opts.auto.onTimeoutPause.call($tt0, perc, dur1)
                    }
                    return !0
                }), $cfs.bind(cf_e("play", conf), function(e, dir, del, res) {
                    e.stopPropagation(), tmrs = sc_clearTimers(tmrs);
                    var v = [dir, del, res],
                        t = ["string", "number", "boolean"],
                        a = cf_sortParams(v, t);
                    if (dir = a[0], del = a[1], res = a[2], "prev" != dir && "next" != dir && (dir = crsl.direction), is_number(del) || (del = 0), is_boolean(res) || (res = !1), res && (crsl.isStopped = !1, opts.auto.play = !0), !opts.auto.play) return e.stopImmediatePropagation(), debug(conf, "Carousel stopped: Not scrolling.");
                    crsl.isPaused && opts.auto.button && (opts.auto.button.removeClass(cf_c("stopped", conf)), opts.auto.button.removeClass(cf_c("paused", conf))), crsl.isPaused = !1, tmrs.startTime = getTime();
                    var dur1 = opts.auto.timeoutDuration + del;
                    return dur2 = dur1 - tmrs.timePassed, perc = 100 - Math.ceil(100 * dur2 / dur1), opts.auto.progress && (tmrs.progress = setInterval(function() {
                        var pasd = getTime() - tmrs.startTime + tmrs.timePassed,
                            perc = Math.ceil(100 * pasd / dur1);
                        opts.auto.progress.updater.call(opts.auto.progress.bar[0], perc)
                    }, opts.auto.progress.interval)), tmrs.auto = setTimeout(function() {
                        opts.auto.progress && opts.auto.progress.updater.call(opts.auto.progress.bar[0], 100), opts.auto.onTimeoutEnd && opts.auto.onTimeoutEnd.call($tt0, perc, dur2), crsl.isScrolling ? $cfs.trigger(cf_e("play", conf), dir) : $cfs.trigger(cf_e(dir, conf), opts.auto)
                    }, dur2), opts.auto.onTimeoutStart && opts.auto.onTimeoutStart.call($tt0, perc, dur2), !0
                }), $cfs.bind(cf_e("resume", conf), function(e) {
                    return e.stopPropagation(), scrl.isStopped ? (scrl.isStopped = !1, crsl.isPaused = !1, crsl.isScrolling = !0, scrl.startTime = getTime(), sc_startScroll(scrl, conf)) : $cfs.trigger(cf_e("play", conf)), !0
                }), $cfs.bind(cf_e("prev", conf) + " " + cf_e("next", conf), function(e, obj, num, clb, que) {
                    if (e.stopPropagation(), crsl.isStopped || $cfs.is(":hidden")) return e.stopImmediatePropagation(), debug(conf, "Carousel stopped or hidden: Not scrolling.");
                    var minimum = is_number(opts.items.minimum) ? opts.items.minimum : opts.items.visible + 1;
                    if (minimum > itms.total) return e.stopImmediatePropagation(), debug(conf, "Not enough items (" + itms.total + " total, " + minimum + " needed): Not scrolling.");
                    var v = [obj, num, clb, que],
                        t = ["object", "number/string", "function", "boolean"],
                        a = cf_sortParams(v, t);
                    obj = a[0], num = a[1], clb = a[2], que = a[3];
                    var eType = e.type.slice(conf.events.prefix.length);
                    if (is_object(obj) || (obj = {}), is_function(clb) && (obj.onAfter = clb), is_boolean(que) && (obj.queue = que), obj = $.extend(!0, {}, opts[eType], obj), obj.conditions && !obj.conditions.call($tt0, eType)) return e.stopImmediatePropagation(), debug(conf, 'Callback "conditions" returned false.');
                    if (!is_number(num)) {
                        if ("*" != opts.items.filter) num = "visible";
                        else
                            for (var arr = [num, obj.items, opts[eType].items], a = 0, l = arr.length; l > a; a++)
                                if (is_number(arr[a]) || "page" == arr[a] || "visible" == arr[a]) {
                                    num = arr[a];
                                    break
                                } switch (num) {
                            case "page":
                                return e.stopImmediatePropagation(), $cfs.triggerHandler(cf_e(eType + "Page", conf), [obj, clb]);
                            case "visible":
                                opts.items.visibleConf.variable || "*" != opts.items.filter || (num = opts.items.visible)
                        }
                    }
                    if (scrl.isStopped) return $cfs.trigger(cf_e("resume", conf)), $cfs.trigger(cf_e("queue", conf), [eType, [obj, num, clb]]), e.stopImmediatePropagation(), debug(conf, "Carousel resumed scrolling.");
                    if (obj.duration > 0 && crsl.isScrolling) return obj.queue && ("last" == obj.queue && (queu = []), ("first" != obj.queue || 0 == queu.length) && $cfs.trigger(cf_e("queue", conf), [eType, [obj, num, clb]])), e.stopImmediatePropagation(), debug(conf, "Carousel currently scrolling.");
                    if (tmrs.timePassed = 0, $cfs.trigger(cf_e("slide_" + eType, conf), [obj, num]), opts.synchronise)
                        for (var s = opts.synchronise, c = [obj, num], j = 0, l = s.length; l > j; j++) {
                            var d = eType;
                            s[j][2] || (d = "prev" == d ? "next" : "prev"), s[j][1] || (c[0] = s[j][0].triggerHandler("_cfs_triggerEvent", ["configuration", d])), c[1] = num + s[j][3], s[j][0].trigger("_cfs_triggerEvent", ["slide_" + d, c])
                        }
                    return !0
                }), $cfs.bind(cf_e("slide_prev", conf), function(e, sO, nI) {
                    e.stopPropagation();
                    var a_itm = $cfs.children();
                    if (!opts.circular && 0 == itms.first) return opts.infinite && $cfs.trigger(cf_e("next", conf), itms.total - 1), e.stopImmediatePropagation();
                    if (sz_resetMargin(a_itm, opts), !is_number(nI)) {
                        if (opts.items.visibleConf.variable) nI = gn_getVisibleItemsPrev(a_itm, opts, itms.total - 1);
                        else if ("*" != opts.items.filter) {
                            var xI = is_number(sO.items) ? sO.items : gn_getVisibleOrg($cfs, opts);
                            nI = gn_getScrollItemsPrevFilter(a_itm, opts, itms.total - 1, xI)
                        } else nI = opts.items.visible;
                        nI = cf_getAdjust(nI, opts, sO.items, $tt0)
                    }
                    if (opts.circular || itms.total - nI < itms.first && (nI = itms.total - itms.first), opts.items.visibleConf.old = opts.items.visible, opts.items.visibleConf.variable) {
                        var vI = cf_getItemsAdjust(gn_getVisibleItemsNext(a_itm, opts, itms.total - nI), opts, opts.items.visibleConf.adjust, $tt0);
                        opts.items.visible + nI <= vI && nI < itms.total && (nI++, vI = cf_getItemsAdjust(gn_getVisibleItemsNext(a_itm, opts, itms.total - nI), opts, opts.items.visibleConf.adjust, $tt0)), opts.items.visible = vI
                    } else if ("*" != opts.items.filter) {
                        var vI = gn_getVisibleItemsNextFilter(a_itm, opts, itms.total - nI);
                        opts.items.visible = cf_getItemsAdjust(vI, opts, opts.items.visibleConf.adjust, $tt0)
                    }
                    if (sz_resetMargin(a_itm, opts, !0), 0 == nI) return e.stopImmediatePropagation(), debug(conf, "0 items to scroll: Not scrolling.");
                    for (debug(conf, "Scrolling " + nI + " items backward."), itms.first += nI; itms.first >= itms.total;) itms.first -= itms.total;
                    opts.circular || (0 == itms.first && sO.onEnd && sO.onEnd.call($tt0, "prev"), opts.infinite || nv_enableNavi(opts, itms.first, conf)), $cfs.children().slice(itms.total - nI, itms.total).prependTo($cfs), itms.total < opts.items.visible + nI && $cfs.children().slice(0, opts.items.visible + nI - itms.total).clone(!0).appendTo($cfs);
                    var a_itm = $cfs.children(),
                        i_old = gi_getOldItemsPrev(a_itm, opts, nI),
                        i_new = gi_getNewItemsPrev(a_itm, opts),
                        i_cur_l = a_itm.eq(nI - 1),
                        i_old_l = i_old.last(),
                        i_new_l = i_new.last();
                    sz_resetMargin(a_itm, opts);
                    var pL = 0,
                        pR = 0;
                    if (opts.align) {
                        var p = cf_getAlignPadding(i_new, opts);
                        pL = p[0], pR = p[1]
                    }
                    var oL = 0 > pL ? opts.padding[opts.d[3]] : 0,
                        hiddenitems = !1,
                        i_skp = $();
                    if (opts.items.visible < nI && (i_skp = a_itm.slice(opts.items.visibleConf.old, nI), "directscroll" == sO.fx)) {
                        var orgW = opts.items[opts.d.width];
                        hiddenitems = i_skp, i_cur_l = i_new_l, sc_hideHiddenItems(hiddenitems), opts.items[opts.d.width] = "variable"
                    }
                    var $cf2 = !1,
                        i_siz = ms_getTotalSize(a_itm.slice(0, nI), opts, "width"),
                        w_siz = cf_mapWrapperSizes(ms_getSizes(i_new, opts, !0), opts, !opts.usePadding),
                        i_siz_vis = 0,
                        a_cfs = {},
                        a_wsz = {},
                        a_cur = {},
                        a_old = {},
                        a_new = {},
                        a_lef = {},
                        a_lef_vis = {},
                        a_dur = sc_getDuration(sO, opts, nI, i_siz);
                    switch (sO.fx) {
                        case "cover":
                        case "cover-fade":
                            i_siz_vis = ms_getTotalSize(a_itm.slice(0, opts.items.visible), opts, "width")
                    }
                    hiddenitems && (opts.items[opts.d.width] = orgW), sz_resetMargin(a_itm, opts, !0), pR >= 0 && sz_resetMargin(i_old_l, opts, opts.padding[opts.d[1]]), pL >= 0 && sz_resetMargin(i_cur_l, opts, opts.padding[opts.d[3]]), opts.align && (opts.padding[opts.d[1]] = pR, opts.padding[opts.d[3]] = pL), a_lef[opts.d.left] = -(i_siz - oL), a_lef_vis[opts.d.left] = -(i_siz_vis - oL), a_wsz[opts.d.left] = w_siz[opts.d.width];
                    var _s_wrapper = function() {},
                        _a_wrapper = function() {},
                        _s_paddingold = function() {},
                        _a_paddingold = function() {},
                        _s_paddingnew = function() {},
                        _a_paddingnew = function() {},
                        _s_paddingcur = function() {},
                        _a_paddingcur = function() {},
                        _onafter = function() {},
                        _moveitems = function() {},
                        _position = function() {};
                    switch (sO.fx) {
                        case "crossfade":
                        case "cover":
                        case "cover-fade":
                        case "uncover":
                        case "uncover-fade":
                            $cf2 = $cfs.clone(!0).appendTo($wrp)
                    }
                    switch (sO.fx) {
                        case "crossfade":
                        case "uncover":
                        case "uncover-fade":
                            $cf2.children().slice(0, nI).remove(), $cf2.children().slice(opts.items.visibleConf.old).remove();
                            break;
                        case "cover":
                        case "cover-fade":
                            $cf2.children().slice(opts.items.visible).remove(), $cf2.css(a_lef_vis)
                    }
                    if ($cfs.css(a_lef), scrl = sc_setScroll(a_dur, sO.easing, conf), a_cfs[opts.d.left] = opts.usePadding ? opts.padding[opts.d[3]] : 0, ("variable" == opts[opts.d.width] || "variable" == opts[opts.d.height]) && (_s_wrapper = function() {
                            $wrp.css(w_siz)
                        }, _a_wrapper = function() {
                            scrl.anims.push([$wrp, w_siz])
                        }), opts.usePadding) {
                        switch (i_new_l.not(i_cur_l).length && (a_cur[opts.d.marginRight] = i_cur_l.data("_cfs_origCssMargin"), 0 > pL ? i_cur_l.css(a_cur) : (_s_paddingcur = function() {
                            i_cur_l.css(a_cur)
                        }, _a_paddingcur = function() {
                            scrl.anims.push([i_cur_l, a_cur])
                        })), sO.fx) {
                            case "cover":
                            case "cover-fade":
                                $cf2.children().eq(nI - 1).css(a_cur)
                        }
                        i_new_l.not(i_old_l).length && (a_old[opts.d.marginRight] = i_old_l.data("_cfs_origCssMargin"), _s_paddingold = function() {
                            i_old_l.css(a_old)
                        }, _a_paddingold = function() {
                            scrl.anims.push([i_old_l, a_old])
                        }), pR >= 0 && (a_new[opts.d.marginRight] = i_new_l.data("_cfs_origCssMargin") + opts.padding[opts.d[1]], _s_paddingnew = function() {
                            i_new_l.css(a_new)
                        }, _a_paddingnew = function() {
                            scrl.anims.push([i_new_l, a_new])
                        })
                    }
                    _position = function() {
                        $cfs.css(a_cfs)
                    };
                    var overFill = opts.items.visible + nI - itms.total;
                    _moveitems = function() {
                        if (overFill > 0 && ($cfs.children().slice(itms.total).remove(), i_old = $($cfs.children().slice(itms.total - (opts.items.visible - overFill)).get().concat($cfs.children().slice(0, overFill).get()))), sc_showHiddenItems(hiddenitems), opts.usePadding) {
                            var l_itm = $cfs.children().eq(opts.items.visible + nI - 1);
                            l_itm.css(opts.d.marginRight, l_itm.data("_cfs_origCssMargin"))
                        }
                    };
                    var cb_arguments = sc_mapCallbackArguments(i_old, i_skp, i_new, nI, "prev", a_dur, w_siz);
                    switch (_onafter = function() {
                        sc_afterScroll($cfs, $cf2, sO), crsl.isScrolling = !1, clbk.onAfter = sc_fireCallbacks($tt0, sO, "onAfter", cb_arguments, clbk), queu = sc_fireQueue($cfs, queu, conf), crsl.isPaused || $cfs.trigger(cf_e("play", conf))
                    }, crsl.isScrolling = !0, tmrs = sc_clearTimers(tmrs), clbk.onBefore = sc_fireCallbacks($tt0, sO, "onBefore", cb_arguments, clbk), sO.fx) {
                        case "none":
                            $cfs.css(a_cfs), _s_wrapper(), _s_paddingold(), _s_paddingnew(), _s_paddingcur(), _position(), _moveitems(), _onafter();
                            break;
                        case "fade":
                            scrl.anims.push([$cfs, {
                                opacity: 0
                            }, function() {
                                _s_wrapper(), _s_paddingold(), _s_paddingnew(), _s_paddingcur(), _position(), _moveitems(), scrl = sc_setScroll(a_dur, sO.easing, conf), scrl.anims.push([$cfs, {
                                    opacity: 1
                                }, _onafter]), sc_startScroll(scrl, conf)
                            }]);
                            break;
                        case "crossfade":
                            $cfs.css({
                                opacity: 0
                            }), scrl.anims.push([$cf2, {
                                opacity: 0
                            }]), scrl.anims.push([$cfs, {
                                opacity: 1
                            }, _onafter]), _a_wrapper(), _s_paddingold(), _s_paddingnew(), _s_paddingcur(), _position(), _moveitems();
                            break;
                        case "cover":
                            scrl.anims.push([$cf2, a_cfs, function() {
                                _s_paddingold(), _s_paddingnew(), _s_paddingcur(), _position(), _moveitems(), _onafter()
                            }]), _a_wrapper();
                            break;
                        case "cover-fade":
                            scrl.anims.push([$cfs, {
                                opacity: 0
                            }]), scrl.anims.push([$cf2, a_cfs, function() {
                                _s_paddingold(), _s_paddingnew(), _s_paddingcur(), _position(), _moveitems(), _onafter()
                            }]), _a_wrapper();
                            break;
                        case "uncover":
                            scrl.anims.push([$cf2, a_wsz, _onafter]), _a_wrapper(), _s_paddingold(), _s_paddingnew(), _s_paddingcur(), _position(), _moveitems();
                            break;
                        case "uncover-fade":
                            $cfs.css({
                                opacity: 0
                            }), scrl.anims.push([$cfs, {
                                opacity: 1
                            }]), scrl.anims.push([$cf2, a_wsz, _onafter]), _a_wrapper(), _s_paddingold(), _s_paddingnew(), _s_paddingcur(), _position(), _moveitems();
                            break;
                        default:
                            scrl.anims.push([$cfs, a_cfs, function() {
                                _moveitems(), _onafter()
                            }]), _a_wrapper(), _a_paddingold(), _a_paddingnew(), _a_paddingcur()
                    }
                    return sc_startScroll(scrl, conf), cf_setCookie(opts.cookie, $cfs, conf), $cfs.trigger(cf_e("updatePageStatus", conf), [!1, w_siz]), !0
                }), $cfs.bind(cf_e("slide_next", conf), function(e, sO, nI) {
                    e.stopPropagation();
                    var a_itm = $cfs.children();
                    if (!opts.circular && itms.first == opts.items.visible) return opts.infinite && $cfs.trigger(cf_e("prev", conf), itms.total - 1), e.stopImmediatePropagation();
                    if (sz_resetMargin(a_itm, opts), !is_number(nI)) {
                        if ("*" != opts.items.filter) {
                            var xI = is_number(sO.items) ? sO.items : gn_getVisibleOrg($cfs, opts);
                            nI = gn_getScrollItemsNextFilter(a_itm, opts, 0, xI)
                        } else nI = opts.items.visible;
                        nI = cf_getAdjust(nI, opts, sO.items, $tt0)
                    }
                    var lastItemNr = 0 == itms.first ? itms.total : itms.first;
                    if (!opts.circular) {
                        if (opts.items.visibleConf.variable) var vI = gn_getVisibleItemsNext(a_itm, opts, nI),
                            xI = gn_getVisibleItemsPrev(a_itm, opts, lastItemNr - 1);
                        else var vI = opts.items.visible,
                            xI = opts.items.visible;
                        nI + vI > lastItemNr && (nI = lastItemNr - xI)
                    }
                    if (opts.items.visibleConf.old = opts.items.visible, opts.items.visibleConf.variable) {
                        for (var vI = cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(a_itm, opts, nI, lastItemNr), opts, opts.items.visibleConf.adjust, $tt0); opts.items.visible - nI >= vI && nI < itms.total;) nI++, vI = cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(a_itm, opts, nI, lastItemNr), opts, opts.items.visibleConf.adjust, $tt0);
                        opts.items.visible = vI
                    } else if ("*" != opts.items.filter) {
                        var vI = gn_getVisibleItemsNextFilter(a_itm, opts, nI);
                        opts.items.visible = cf_getItemsAdjust(vI, opts, opts.items.visibleConf.adjust, $tt0)
                    }
                    if (sz_resetMargin(a_itm, opts, !0), 0 == nI) return e.stopImmediatePropagation(), debug(conf, "0 items to scroll: Not scrolling.");
                    for (debug(conf, "Scrolling " + nI + " items forward."), itms.first -= nI; itms.first < 0;) itms.first += itms.total;
                    opts.circular || (itms.first == opts.items.visible && sO.onEnd && sO.onEnd.call($tt0, "next"), opts.infinite || nv_enableNavi(opts, itms.first, conf)), itms.total < opts.items.visible + nI && $cfs.children().slice(0, opts.items.visible + nI - itms.total).clone(!0).appendTo($cfs);
                    var a_itm = $cfs.children(),
                        i_old = gi_getOldItemsNext(a_itm, opts),
                        i_new = gi_getNewItemsNext(a_itm, opts, nI),
                        i_cur_l = a_itm.eq(nI - 1),
                        i_old_l = i_old.last(),
                        i_new_l = i_new.last();
                    sz_resetMargin(a_itm, opts);
                    var pL = 0,
                        pR = 0;
                    if (opts.align) {
                        var p = cf_getAlignPadding(i_new, opts);
                        pL = p[0], pR = p[1]
                    }
                    var hiddenitems = !1,
                        i_skp = $();
                    if (opts.items.visibleConf.old < nI && (i_skp = a_itm.slice(opts.items.visibleConf.old, nI), "directscroll" == sO.fx)) {
                        var orgW = opts.items[opts.d.width];
                        hiddenitems = i_skp, i_cur_l = i_old_l, sc_hideHiddenItems(hiddenitems), opts.items[opts.d.width] = "variable"
                    }
                    var $cf2 = !1,
                        i_siz = ms_getTotalSize(a_itm.slice(0, nI), opts, "width"),
                        w_siz = cf_mapWrapperSizes(ms_getSizes(i_new, opts, !0), opts, !opts.usePadding),
                        i_siz_vis = 0,
                        a_cfs = {},
                        a_cfs_vis = {},
                        a_cur = {},
                        a_old = {},
                        a_lef = {},
                        a_dur = sc_getDuration(sO, opts, nI, i_siz);
                    switch (sO.fx) {
                        case "uncover":
                        case "uncover-fade":
                            i_siz_vis = ms_getTotalSize(a_itm.slice(0, opts.items.visibleConf.old), opts, "width")
                    }
                    hiddenitems && (opts.items[opts.d.width] = orgW), opts.align && opts.padding[opts.d[1]] < 0 && (opts.padding[opts.d[1]] = 0), sz_resetMargin(a_itm, opts, !0), sz_resetMargin(i_old_l, opts, opts.padding[opts.d[1]]), opts.align && (opts.padding[opts.d[1]] = pR, opts.padding[opts.d[3]] = pL), a_lef[opts.d.left] = opts.usePadding ? opts.padding[opts.d[3]] : 0;
                    var _s_wrapper = function() {},
                        _a_wrapper = function() {},
                        _s_paddingold = function() {},
                        _a_paddingold = function() {},
                        _s_paddingcur = function() {},
                        _a_paddingcur = function() {},
                        _onafter = function() {},
                        _moveitems = function() {},
                        _position = function() {};
                    switch (sO.fx) {
                        case "crossfade":
                        case "cover":
                        case "cover-fade":
                        case "uncover":
                        case "uncover-fade":
                            $cf2 = $cfs.clone(!0).appendTo($wrp), $cf2.children().slice(opts.items.visibleConf.old).remove()
                    }
                    switch (sO.fx) {
                        case "crossfade":
                        case "cover":
                        case "cover-fade":
                            $cfs.css("zIndex", 1), $cf2.css("zIndex", 0)
                    }
                    if (scrl = sc_setScroll(a_dur, sO.easing, conf), a_cfs[opts.d.left] = -i_siz, a_cfs_vis[opts.d.left] = -i_siz_vis, 0 > pL && (a_cfs[opts.d.left] += pL), ("variable" == opts[opts.d.width] || "variable" == opts[opts.d.height]) && (_s_wrapper = function() {
                            $wrp.css(w_siz)
                        }, _a_wrapper = function() {
                            scrl.anims.push([$wrp, w_siz])
                        }), opts.usePadding) {
                        var i_new_l_m = i_new_l.data("_cfs_origCssMargin");
                        pR >= 0 && (i_new_l_m += opts.padding[opts.d[1]]), i_new_l.css(opts.d.marginRight, i_new_l_m), i_cur_l.not(i_old_l).length && (a_old[opts.d.marginRight] = i_old_l.data("_cfs_origCssMargin")), _s_paddingold = function() {
                            i_old_l.css(a_old)
                        }, _a_paddingold = function() {
                            scrl.anims.push([i_old_l, a_old])
                        };
                        var i_cur_l_m = i_cur_l.data("_cfs_origCssMargin");
                        pL > 0 && (i_cur_l_m += opts.padding[opts.d[3]]), a_cur[opts.d.marginRight] = i_cur_l_m, _s_paddingcur = function() {
                            i_cur_l.css(a_cur)
                        }, _a_paddingcur = function() {
                            scrl.anims.push([i_cur_l, a_cur])
                        }
                    }
                    _position = function() {
                        $cfs.css(a_lef)
                    };
                    var overFill = opts.items.visible + nI - itms.total;
                    _moveitems = function() {
                        overFill > 0 && $cfs.children().slice(itms.total).remove();
                        var l_itm = $cfs.children().slice(0, nI).appendTo($cfs).last();
                        if (overFill > 0 && (i_new = gi_getCurrentItems(a_itm, opts)), sc_showHiddenItems(hiddenitems), opts.usePadding) {
                            if (itms.total < opts.items.visible + nI) {
                                var i_cur_l = $cfs.children().eq(opts.items.visible - 1);
                                i_cur_l.css(opts.d.marginRight, i_cur_l.data("_cfs_origCssMargin") + opts.padding[opts.d[1]])
                            }
                            l_itm.css(opts.d.marginRight, l_itm.data("_cfs_origCssMargin"))
                        }
                    };
                    var cb_arguments = sc_mapCallbackArguments(i_old, i_skp, i_new, nI, "next", a_dur, w_siz);
                    switch (_onafter = function() {
                        $cfs.css("zIndex", $cfs.data("_cfs_origCssZindex")), sc_afterScroll($cfs, $cf2, sO), crsl.isScrolling = !1, clbk.onAfter = sc_fireCallbacks($tt0, sO, "onAfter", cb_arguments, clbk), queu = sc_fireQueue($cfs, queu, conf), crsl.isPaused || $cfs.trigger(cf_e("play", conf))
                    }, crsl.isScrolling = !0, tmrs = sc_clearTimers(tmrs), clbk.onBefore = sc_fireCallbacks($tt0, sO, "onBefore", cb_arguments, clbk), sO.fx) {
                        case "none":
                            $cfs.css(a_cfs), _s_wrapper(), _s_paddingold(), _s_paddingcur(), _position(), _moveitems(), _onafter();
                            break;
                        case "fade":
                            scrl.anims.push([$cfs, {
                                opacity: 0
                            }, function() {
                                _s_wrapper(), _s_paddingold(), _s_paddingcur(), _position(), _moveitems(), scrl = sc_setScroll(a_dur, sO.easing, conf), scrl.anims.push([$cfs, {
                                    opacity: 1
                                }, _onafter]), sc_startScroll(scrl, conf)
                            }]);
                            break;
                        case "crossfade":
                            $cfs.css({
                                opacity: 0
                            }), scrl.anims.push([$cf2, {
                                opacity: 0
                            }]), scrl.anims.push([$cfs, {
                                opacity: 1
                            }, _onafter]), _a_wrapper(), _s_paddingold(), _s_paddingcur(), _position(), _moveitems();
                            break;
                        case "cover":
                            $cfs.css(opts.d.left, $wrp[opts.d.width]()), scrl.anims.push([$cfs, a_lef, _onafter]), _a_wrapper(), _s_paddingold(), _s_paddingcur(), _moveitems();
                            break;
                        case "cover-fade":
                            $cfs.css(opts.d.left, $wrp[opts.d.width]()), scrl.anims.push([$cf2, {
                                opacity: 0
                            }]), scrl.anims.push([$cfs, a_lef, _onafter]), _a_wrapper(), _s_paddingold(), _s_paddingcur(), _moveitems();
                            break;
                        case "uncover":
                            scrl.anims.push([$cf2, a_cfs_vis, _onafter]), _a_wrapper(), _s_paddingold(), _s_paddingcur(), _position(), _moveitems();
                            break;
                        case "uncover-fade":
                            $cfs.css({
                                opacity: 0
                            }), scrl.anims.push([$cfs, {
                                opacity: 1
                            }]), scrl.anims.push([$cf2, a_cfs_vis, _onafter]), _a_wrapper(), _s_paddingold(), _s_paddingcur(), _position(), _moveitems();
                            break;
                        default:
                            scrl.anims.push([$cfs, a_cfs, function() {
                                _position(), _moveitems(), _onafter()
                            }]), _a_wrapper(), _a_paddingold(), _a_paddingcur()
                    }
                    return sc_startScroll(scrl, conf), cf_setCookie(opts.cookie, $cfs, conf), $cfs.trigger(cf_e("updatePageStatus", conf), [!1, w_siz]), !0
                }), $cfs.bind(cf_e("slideTo", conf), function(e, num, dev, org, obj, dir, clb) {
                    e.stopPropagation();
                    var v = [num, dev, org, obj, dir, clb],
                        t = ["string/number/object", "number", "boolean", "object", "string", "function"],
                        a = cf_sortParams(v, t);
                    return obj = a[3], dir = a[4], clb = a[5], num = gn_getItemIndex(a[0], a[1], a[2], itms, $cfs), 0 == num ? !1 : (is_object(obj) || (obj = !1), "prev" != dir && "next" != dir && (dir = opts.circular ? num <= itms.total / 2 ? "next" : "prev" : 0 == itms.first || itms.first > num ? "next" : "prev"), "prev" == dir && (num = itms.total - num), $cfs.trigger(cf_e(dir, conf), [obj, num, clb]), !0)
                }), $cfs.bind(cf_e("prevPage", conf), function(e, obj, clb) {
                    e.stopPropagation();
                    var cur = $cfs.triggerHandler(cf_e("currentPage", conf));
                    return $cfs.triggerHandler(cf_e("slideToPage", conf), [cur - 1, obj, "prev", clb])
                }), $cfs.bind(cf_e("nextPage", conf), function(e, obj, clb) {
                    e.stopPropagation();
                    var cur = $cfs.triggerHandler(cf_e("currentPage", conf));
                    return $cfs.triggerHandler(cf_e("slideToPage", conf), [cur + 1, obj, "next", clb])
                }), $cfs.bind(cf_e("slideToPage", conf), function(e, pag, obj, dir, clb) {
                    e.stopPropagation(), is_number(pag) || (pag = $cfs.triggerHandler(cf_e("currentPage", conf)));
                    var ipp = opts.pagination.items || opts.items.visible,
                        max = Math.ceil(itms.total / ipp) - 1;
                    return 0 > pag && (pag = max), pag > max && (pag = 0), $cfs.triggerHandler(cf_e("slideTo", conf), [pag * ipp, 0, !0, obj, dir, clb])
                }), $cfs.bind(cf_e("jumpToStart", conf), function(e, s) {
                    if (e.stopPropagation(), s = s ? gn_getItemIndex(s, 0, !0, itms, $cfs) : 0, s += itms.first, 0 != s) {
                        if (itms.total > 0)
                            for (; s > itms.total;) s -= itms.total;
                        $cfs.prepend($cfs.children().slice(s, itms.total))
                    }
                    return !0
                }), $cfs.bind(cf_e("synchronise", conf), function(e, s) {
                    if (e.stopPropagation(), s) s = cf_getSynchArr(s);
                    else {
                        if (!opts.synchronise) return debug(conf, "No carousel to synchronise.");
                        s = opts.synchronise
                    }
                    for (var n = $cfs.triggerHandler(cf_e("currentPosition", conf)), x = !0, j = 0, l = s.length; l > j; j++) s[j][0].triggerHandler(cf_e("slideTo", conf), [n, s[j][3], !0]) || (x = !1);
                    return x
                }), $cfs.bind(cf_e("queue", conf), function(e, dir, opt) {
                    return e.stopPropagation(), is_function(dir) ? dir.call($tt0, queu) : is_array(dir) ? queu = dir : is_undefined(dir) || queu.push([dir, opt]), queu
                }), $cfs.bind(cf_e("insertItem", conf), function(e, itm, num, org, dev) {
                    e.stopPropagation();
                    var v = [itm, num, org, dev],
                        t = ["string/object", "string/number/object", "boolean", "number"],
                        a = cf_sortParams(v, t);
                    if (itm = a[0], num = a[1], org = a[2], dev = a[3], is_object(itm) && !is_jquery(itm) ? itm = $(itm) : is_string(itm) && (itm = $(itm)), !is_jquery(itm) || 0 == itm.length) return debug(conf, "Not a valid object.");
                    is_undefined(num) && (num = "end"), sz_storeMargin(itm, opts), sz_storeOrigCss(itm);
                    var orgNum = num,
                        before = "before";
                    "end" == num ? org ? (0 == itms.first ? (num = itms.total - 1, before = "after") : (num = itms.first, itms.first += itm.length), 0 > num && (num = 0)) : (num = itms.total - 1, before = "after") : num = gn_getItemIndex(num, dev, org, itms, $cfs);
                    var $cit = $cfs.children().eq(num);
                    return $cit.length ? $cit[before](itm) : (debug(conf, "Correct insert-position not found! Appending item to the end."), $cfs.append(itm)), "end" == orgNum || org || num < itms.first && (itms.first += itm.length), itms.total = $cfs.children().length, itms.first >= itms.total && (itms.first -= itms.total), $cfs.trigger(cf_e("updateSizes", conf)), $cfs.trigger(cf_e("linkAnchors", conf)), !0
                }), $cfs.bind(cf_e("removeItem", conf), function(e, num, org, dev) {
                    e.stopPropagation();
                    var v = [num, org, dev],
                        t = ["string/number/object", "boolean", "number"],
                        a = cf_sortParams(v, t);
                    num = a[0], org = a[1], dev = a[2];
                    if (num instanceof $ && num.length > 1) return $removed = $(), num.each(function() {
                        var $rem = $cfs.trigger(cf_e("removeItem", conf), [$(this), org, dev]);
                        $rem && ($removed = $removed.add($rem))
                    }), $removed;
                    if (is_undefined(num) || "end" == num) $removed = $cfs.children().last();
                    else {
                        num = gn_getItemIndex(num, dev, org, itms, $cfs);
                        var $removed = $cfs.children().eq(num);
                        $removed.length && num < itms.first && (itms.first -= $removed.length)
                    }
                    return $removed && $removed.length && ($removed.detach(), itms.total = $cfs.children().length, $cfs.trigger(cf_e("updateSizes", conf))), $removed
                }), $cfs.bind(cf_e("onBefore", conf) + " " + cf_e("onAfter", conf), function(e, fn) {
                    e.stopPropagation();
                    var eType = e.type.slice(conf.events.prefix.length);
                    return is_array(fn) && (clbk[eType] = fn), is_function(fn) && clbk[eType].push(fn), clbk[eType]
                }), $cfs.bind(cf_e("currentPosition", conf), function(e, fn) {
                    if (e.stopPropagation(), 0 == itms.first) var val = 0;
                    else var val = itms.total - itms.first;
                    return is_function(fn) && fn.call($tt0, val), val
                }), $cfs.bind(cf_e("currentPage", conf), function(e, fn) {
                    e.stopPropagation();
                    var nr, ipp = opts.pagination.items || opts.items.visible,
                        max = Math.ceil(itms.total / ipp - 1);
                    return nr = 0 == itms.first ? 0 : itms.first < itms.total % ipp ? 0 : itms.first != ipp || opts.circular ? Math.round((itms.total - itms.first) / ipp) : max, 0 > nr && (nr = 0), nr > max && (nr = max), is_function(fn) && fn.call($tt0, nr), nr
                }), $cfs.bind(cf_e("currentVisible", conf), function(e, fn) {
                    e.stopPropagation();
                    var $i = gi_getCurrentItems($cfs.children(), opts);
                    return is_function(fn) && fn.call($tt0, $i), $i
                }), $cfs.bind(cf_e("slice", conf), function(e, f, l, fn) {
                    if (e.stopPropagation(), 0 == itms.total) return !1;
                    var v = [f, l, fn],
                        t = ["number", "number", "function"],
                        a = cf_sortParams(v, t);
                    if (f = is_number(a[0]) ? a[0] : 0, l = is_number(a[1]) ? a[1] : itms.total, fn = a[2], f += itms.first, l += itms.first, items.total > 0) {
                        for (; f > itms.total;) f -= itms.total;
                        for (; l > itms.total;) l -= itms.total;
                        for (; 0 > f;) f += itms.total;
                        for (; 0 > l;) l += itms.total
                    }
                    var $i, $iA = $cfs.children();
                    return $i = l > f ? $iA.slice(f, l) : $($iA.slice(f, itms.total).get().concat($iA.slice(0, l).get())), is_function(fn) && fn.call($tt0, $i), $i
                }), $cfs.bind(cf_e("isPaused", conf) + " " + cf_e("isStopped", conf) + " " + cf_e("isScrolling", conf), function(e, fn) {
                    e.stopPropagation();
                    var eType = e.type.slice(conf.events.prefix.length),
                        value = crsl[eType];
                    return is_function(fn) && fn.call($tt0, value), value
                }), $cfs.bind(cf_e("configuration", conf), function(e, a, b, c) {
                    e.stopPropagation();
                    var reInit = !1;
                    if (is_function(a)) a.call($tt0, opts);
                    else if (is_object(a)) opts_orig = $.extend(!0, {}, opts_orig, a), b !== !1 ? reInit = !0 : opts = $.extend(!0, {}, opts, a);
                    else if (!is_undefined(a))
                        if (is_function(b)) {
                            var val = eval("opts." + a);
                            is_undefined(val) && (val = ""), b.call($tt0, val)
                        } else {
                            if (is_undefined(b)) return eval("opts." + a);
                            "boolean" != typeof c && (c = !0), eval("opts_orig." + a + " = b"), c !== !1 ? reInit = !0 : eval("opts." + a + " = b")
                        }
                    if (reInit) {
                        sz_resetMargin($cfs.children(), opts), FN._init(opts_orig), FN._bind_buttons();
                        var sz = sz_setSizes($cfs, opts);
                        $cfs.trigger(cf_e("updatePageStatus", conf), [!0, sz])
                    }
                    return opts
                }), $cfs.bind(cf_e("linkAnchors", conf), function(e, $con, sel) {
                    return e.stopPropagation(), is_undefined($con) ? $con = $("body") : is_string($con) && ($con = $($con)), is_jquery($con) && 0 != $con.length ? (is_string(sel) || (sel = "a.caroufredsel"), $con.find(sel).each(function() {
                        var h = this.hash || "";
                        h.length > 0 && -1 != $cfs.children().index($(h)) && $(this).unbind("click").click(function(e) {
                            e.preventDefault(), $cfs.trigger(cf_e("slideTo", conf), h)
                        })
                    }), !0) : debug(conf, "Not a valid object.")
                }), $cfs.bind(cf_e("updatePageStatus", conf), function(e, build) {
                    if (e.stopPropagation(), opts.pagination.container) {
                        var ipp = opts.pagination.items || opts.items.visible,
                            pgs = Math.ceil(itms.total / ipp);
                        build && (opts.pagination.anchorBuilder && (opts.pagination.container.children().remove(), opts.pagination.container.each(function() {
                            for (var a = 0; pgs > a; a++) {
                                var i = $cfs.children().eq(gn_getItemIndex(a * ipp, 0, !0, itms, $cfs));
                                $(this).append(opts.pagination.anchorBuilder.call(i[0], a + 1))
                            }
                        })), opts.pagination.container.each(function() {
                            $(this).children().unbind(opts.pagination.event).each(function(a) {
                                $(this).bind(opts.pagination.event, function(e) {
                                    e.preventDefault(), $cfs.trigger(cf_e("slideTo", conf), [a * ipp, -opts.pagination.deviation, !0, opts.pagination])
                                })
                            })
                        }));
                        var selected = $cfs.triggerHandler(cf_e("currentPage", conf)) + opts.pagination.deviation;
                        return selected >= pgs && (selected = 0), 0 > selected && (selected = pgs - 1), opts.pagination.container.each(function() {
                            $(this).children().removeClass(cf_c("selected", conf)).eq(selected).addClass(cf_c("selected", conf))
                        }), !0
                    }
                }), $cfs.bind(cf_e("updateSizes", conf), function() {
                    var vI = opts.items.visible,
                        a_itm = $cfs.children(),
                        avail_primary = ms_getParentSize($wrp, opts, "width");
                    if (itms.total = a_itm.length, crsl.primarySizePercentage ? (opts.maxDimension = avail_primary, opts[opts.d.width] = ms_getPercentage(avail_primary, crsl.primarySizePercentage)) : opts.maxDimension = ms_getMaxDimension(opts, avail_primary), opts.responsive ? (opts.items.width = opts.items.sizesConf.width, opts.items.height = opts.items.sizesConf.height, opts = in_getResponsiveValues(opts, a_itm, avail_primary), vI = opts.items.visible, sz_setResponsiveSizes(opts, a_itm)) : opts.items.visibleConf.variable ? vI = gn_getVisibleItemsNext(a_itm, opts, 0) : "*" != opts.items.filter && (vI = gn_getVisibleItemsNextFilter(a_itm, opts, 0)), !opts.circular && 0 != itms.first && vI > itms.first) {
                        if (opts.items.visibleConf.variable) var nI = gn_getVisibleItemsPrev(a_itm, opts, itms.first) - itms.first;
                        else if ("*" != opts.items.filter) var nI = gn_getVisibleItemsPrevFilter(a_itm, opts, itms.first) - itms.first;
                        else var nI = opts.items.visible - itms.first;
                        debug(conf, "Preventing non-circular: sliding " + nI + " items backward."), $cfs.trigger(cf_e("prev", conf), nI)
                    }
                    opts.items.visible = cf_getItemsAdjust(vI, opts, opts.items.visibleConf.adjust, $tt0), opts.items.visibleConf.old = opts.items.visible, opts = in_getAlignPadding(opts, a_itm);
                    var sz = sz_setSizes($cfs, opts);
                    return $cfs.trigger(cf_e("updatePageStatus", conf), [!0, sz]), nv_showNavi(opts, itms.total, conf), nv_enableNavi(opts, itms.first, conf), sz
                }), $cfs.bind(cf_e("destroy", conf), function(e, orgOrder) {
                    return e.stopPropagation(), tmrs = sc_clearTimers(tmrs), $cfs.data("_cfs_isCarousel", !1), $cfs.trigger(cf_e("finish", conf)), orgOrder && $cfs.trigger(cf_e("jumpToStart", conf)), sz_restoreOrigCss($cfs.children()), sz_restoreOrigCss($cfs), FN._unbind_events(), FN._unbind_buttons(), "parent" == conf.wrapper ? sz_restoreOrigCss($wrp) : $wrp.replaceWith($cfs), !0
                }), $cfs.bind(cf_e("debug", conf), function() {
                    return debug(conf, "Carousel width: " + opts.width), debug(conf, "Carousel height: " + opts.height), debug(conf, "Item widths: " + opts.items.width), debug(conf, "Item heights: " + opts.items.height), debug(conf, "Number of items visible: " + opts.items.visible), opts.auto.play && debug(conf, "Number of items scrolled automatically: " + opts.auto.items), opts.prev.button && debug(conf, "Number of items scrolled backward: " + opts.prev.items), opts.next.button && debug(conf, "Number of items scrolled forward: " + opts.next.items), conf.debug
                }), $cfs.bind("_cfs_triggerEvent", function(e, n, o) {
                    return e.stopPropagation(), $cfs.triggerHandler(cf_e(n, conf), o)
                })
            }, FN._unbind_events = function() {
                $cfs.unbind(cf_e("", conf)), $cfs.unbind(cf_e("", conf, !1)), $cfs.unbind("_cfs_triggerEvent")
            }, FN._bind_buttons = function() {
                if (FN._unbind_buttons(), nv_showNavi(opts, itms.total, conf), nv_enableNavi(opts, itms.first, conf), opts.auto.pauseOnHover) {
                    var pC = bt_pauseOnHoverConfig(opts.auto.pauseOnHover);
                    $wrp.bind(cf_e("mouseenter", conf, !1), function() {
                        $cfs.trigger(cf_e("pause", conf), pC)
                    }).bind(cf_e("mouseleave", conf, !1), function() {
                        $cfs.trigger(cf_e("resume", conf))
                    })
                }
                if (opts.auto.button && opts.auto.button.bind(cf_e(opts.auto.event, conf, !1), function(e) {
                        e.preventDefault();
                        var ev = !1,
                            pC = null;
                        crsl.isPaused ? ev = "play" : opts.auto.pauseOnEvent && (ev = "pause", pC = bt_pauseOnHoverConfig(opts.auto.pauseOnEvent)), ev && $cfs.trigger(cf_e(ev, conf), pC)
                    }), opts.prev.button && (opts.prev.button.bind(cf_e(opts.prev.event, conf, !1), function(e) {
                        e.preventDefault(), $cfs.trigger(cf_e("prev", conf))
                    }), opts.prev.pauseOnHover)) {
                    var pC = bt_pauseOnHoverConfig(opts.prev.pauseOnHover);
                    opts.prev.button.bind(cf_e("mouseenter", conf, !1), function() {
                        $cfs.trigger(cf_e("pause", conf), pC)
                    }).bind(cf_e("mouseleave", conf, !1), function() {
                        $cfs.trigger(cf_e("resume", conf))
                    })
                }
                if (opts.next.button && (opts.next.button.bind(cf_e(opts.next.event, conf, !1), function(e) {
                        e.preventDefault(), $cfs.trigger(cf_e("next", conf))
                    }), opts.next.pauseOnHover)) {
                    var pC = bt_pauseOnHoverConfig(opts.next.pauseOnHover);
                    opts.next.button.bind(cf_e("mouseenter", conf, !1), function() {
                        $cfs.trigger(cf_e("pause", conf), pC)
                    }).bind(cf_e("mouseleave", conf, !1), function() {
                        $cfs.trigger(cf_e("resume", conf))
                    })
                }
                if (opts.pagination.container && opts.pagination.pauseOnHover) {
                    var pC = bt_pauseOnHoverConfig(opts.pagination.pauseOnHover);
                    opts.pagination.container.bind(cf_e("mouseenter", conf, !1), function() {
                        $cfs.trigger(cf_e("pause", conf), pC)
                    }).bind(cf_e("mouseleave", conf, !1), function() {
                        $cfs.trigger(cf_e("resume", conf))
                    })
                }
                if ((opts.prev.key || opts.next.key) && $(document).bind(cf_e("keyup", conf, !1, !0, !0), function(e) {
                        var k = e.keyCode;
                        k == opts.next.key && (e.preventDefault(), $cfs.trigger(cf_e("next", conf))), k == opts.prev.key && (e.preventDefault(), $cfs.trigger(cf_e("prev", conf)))
                    }), opts.pagination.keys && $(document).bind(cf_e("keyup", conf, !1, !0, !0), function(e) {
                        var k = e.keyCode;
                        k >= 49 && 58 > k && (k = (k - 49) * opts.items.visible, k <= itms.total && (e.preventDefault(), $cfs.trigger(cf_e("slideTo", conf), [k, 0, !0, opts.pagination])))
                    }), $.fn.swipe) {
                    var isTouch = "ontouchstart" in window;
                    if (isTouch && opts.swipe.onTouch || !isTouch && opts.swipe.onMouse) {
                        var scP = $.extend(!0, {}, opts.prev, opts.swipe),
                            scN = $.extend(!0, {}, opts.next, opts.swipe),
                            swP = function() {
                                $cfs.trigger(cf_e("prev", conf), [scP])
                            },
                            swN = function() {
                                $cfs.trigger(cf_e("next", conf), [scN])
                            };
                        switch (opts.direction) {
                            case "up":
                            case "down":
                                opts.swipe.options.swipeUp = swN, opts.swipe.options.swipeDown = swP;
                                break;
                            default:
                                opts.swipe.options.swipeLeft = swN, opts.swipe.options.swipeRight = swP
                        }
                        crsl.swipe && $cfs.swipe("destroy"), $wrp.swipe(opts.swipe.options), $wrp.css("cursor", "move"), crsl.swipe = !0
                    }
                }
                if ($.fn.mousewheel && opts.mousewheel) {
                    var mcP = $.extend(!0, {}, opts.prev, opts.mousewheel),
                        mcN = $.extend(!0, {}, opts.next, opts.mousewheel);
                    crsl.mousewheel && $wrp.unbind(cf_e("mousewheel", conf, !1)), $wrp.bind(cf_e("mousewheel", conf, !1), function(e, delta) {
                        e.preventDefault(), delta > 0 ? $cfs.trigger(cf_e("prev", conf), [mcP]) : $cfs.trigger(cf_e("next", conf), [mcN])
                    }), crsl.mousewheel = !0
                }
                if (opts.auto.play && $cfs.trigger(cf_e("play", conf), opts.auto.delay), crsl.upDateOnWindowResize) {
                    var resizeFn = function() {
                            $cfs.trigger(cf_e("finish", conf)), opts.auto.pauseOnResize && !crsl.isPaused && $cfs.trigger(cf_e("play", conf)), sz_resetMargin($cfs.children(), opts), $cfs.trigger(cf_e("updateSizes", conf))
                        },
                        $w = $(window),
                        onResize = null;
                    if ($.debounce && "debounce" == conf.onWindowResize) onResize = $.debounce(200, resizeFn);
                    else if ($.throttle && "throttle" == conf.onWindowResize) onResize = $.throttle(300, resizeFn);
                    else {
                        var _windowWidth = 0,
                            _windowHeight = 0;
                        onResize = function() {
                            var nw = $w.width(),
                                nh = $w.height();
                            (nw != _windowWidth || nh != _windowHeight) && (resizeFn(), _windowWidth = nw, _windowHeight = nh)
                        }
                    }
                    $w.bind(cf_e("resize", conf, !1, !0, !0), onResize)
                }
            }, FN._unbind_buttons = function() {
                var ns2 = (cf_e("", conf), cf_e("", conf, !1));
                ns3 = cf_e("", conf, !1, !0, !0), $(document).unbind(ns3), $(window).unbind(ns3), $wrp.unbind(ns2), opts.auto.button && opts.auto.button.unbind(ns2), opts.prev.button && opts.prev.button.unbind(ns2), opts.next.button && opts.next.button.unbind(ns2), opts.pagination.container && (opts.pagination.container.unbind(ns2), opts.pagination.anchorBuilder && opts.pagination.container.children().remove()), crsl.swipe && ($cfs.swipe("destroy"), $wrp.css("cursor", "default"), crsl.swipe = !1), crsl.mousewheel && (crsl.mousewheel = !1), nv_showNavi(opts, "hide", conf), nv_enableNavi(opts, "removeClass", conf)
            }, is_boolean(configs) && (configs = {
                debug: configs
            });
            var crsl = {
                    direction: "next",
                    isPaused: !0,
                    isScrolling: !1,
                    isStopped: !1,
                    mousewheel: !1,
                    swipe: !1
                },
                itms = {
                    total: $cfs.children().length,
                    first: 0
                },
                tmrs = {
                    auto: null,
                    progress: null,
                    startTime: getTime(),
                    timePassed: 0
                },
                scrl = {
                    isStopped: !1,
                    duration: 0,
                    startTime: 0,
                    easing: "",
                    anims: []
                },
                clbk = {
                    onBefore: [],
                    onAfter: []
                },
                queu = [],
                conf = $.extend(!0, {}, $.fn.carouFredSel.configs, configs),
                opts = {},
                opts_orig = $.extend(!0, {}, options),
                $wrp = "parent" == conf.wrapper ? $cfs.parent() : $cfs.wrap("<" + conf.wrapper.element + ' class="' + conf.wrapper.classname + '" />').parent();
            if (conf.selector = $cfs.selector, conf.serialNumber = $.fn.carouFredSel.serialNumber++, conf.transition = conf.transition && $.fn.transition ? "transition" : "animate", FN._init(opts_orig, !0, starting_position), FN._build(), FN._bind_events(), FN._bind_buttons(), is_array(opts.items.start)) var start_arr = opts.items.start;
            else {
                var start_arr = [];
                0 != opts.items.start && start_arr.push(opts.items.start)
            }
            if (opts.cookie && start_arr.unshift(parseInt(cf_getCookie(opts.cookie), 10)), start_arr.length > 0)
                for (var a = 0, l = start_arr.length; l > a; a++) {
                    var s = start_arr[a];
                    if (0 != s) {
                        if (s === !0) {
                            if (s = window.location.hash, s.length < 1) continue
                        } else "random" === s && (s = Math.floor(Math.random() * itms.total));
                        if ($cfs.triggerHandler(cf_e("slideTo", conf), [s, 0, !0, {
                                fx: "none"
                            }])) break
                    }
                }
            var siz = sz_setSizes($cfs, opts),
                itm = gi_getCurrentItems($cfs.children(), opts);
            return opts.onCreate && opts.onCreate.call($tt0, {
                width: siz.width,
                height: siz.height,
                items: itm
            }), $cfs.trigger(cf_e("updatePageStatus", conf), [!0, siz]), $cfs.trigger(cf_e("linkAnchors", conf)), conf.debug && $cfs.trigger(cf_e("debug", conf)), $cfs
        }, $.fn.carouFredSel.serialNumber = 1, $.fn.carouFredSel.defaults = {
            synchronise: !1,
            infinite: !0,
            circular: !0,
            responsive: !1,
            direction: "left",
            items: {
                start: 0
            },
            scroll: {
                easing: "swing",
                duration: 500,
                pauseOnHover: !1,
                event: "click",
                queue: !1
            }
        }, $.fn.carouFredSel.configs = {
            debug: !1,
            transition: !1,
            onWindowResize: "throttle",
            events: {
                prefix: "",
                namespace: "cfs"
            },
            wrapper: {
                element: "div",
                classname: "caroufredsel_wrapper"
            },
            classnames: {}
        }, $.fn.carouFredSel.pageAnchorBuilder = function(nr) {
            return '<a href="#"><span>' + nr + "</span></a>"
        }, $.fn.carouFredSel.progressbarUpdater = function(perc) {
            $(this).css("width", perc + "%")
        }, $.fn.carouFredSel.cookie = {
            get: function(n) {
                n += "=";
                for (var ca = document.cookie.split(";"), a = 0, l = ca.length; l > a; a++) {
                    for (var c = ca[a];
                        " " == c.charAt(0);) c = c.slice(1);
                    if (0 == c.indexOf(n)) return c.slice(n.length)
                }
                return 0
            },
            set: function(n, v, d) {
                var e = "";
                if (d) {
                    var date = new Date;
                    date.setTime(date.getTime() + 24 * d * 60 * 60 * 1e3), e = "; expires=" + date.toGMTString()
                }
                document.cookie = n + "=" + v + e + "; path=/"
            },
            remove: function(n) {
                $.fn.carouFredSel.cookie.set(n, "", -1)
            }
        }, $.extend($.easing, {
            quadratic: function(t) {
                var t2 = t * t;
                return t * (-t2 * t + 4 * t2 - 6 * t + 4)
            },
            cubic: function(t) {
                return t * (4 * t * t - 9 * t + 6)
            },
            elastic: function(t) {
                var t2 = t * t;
                return t * (33 * t2 * t2 - 106 * t2 * t + 126 * t2 - 67 * t + 15)
            }
        }))
    }(jQuery);