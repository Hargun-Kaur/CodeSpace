// This is just a sample script. Paste your real code (javascript or HTML) here.
if ('this_is' == /an_example/) {
    of_beautifier();
} else {
    var a = b ? (c % d) : e[f];
}
/* ===================================================
 * bootstrap-transition.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#transitions
 * ===================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
function loadScript(asyncScripts) {
    for (var scriptname in asyncScripts) asyncScripts.hasOwnProperty(scriptname) && (loaded = !1, script = document.createElement("script"), script.type = "text/javascript", script.src = asyncScripts[scriptname], script.onload = script.onreadystatechange = function() {
        loaded || this.readyState && "complete" != this.readyState || (loaded = !0)
    }, tag = document.getElementsByTagName("script")[0], tag.parentNode.insertBefore(script, tag))
};
function($) {
    "use strict";
    $(function() {
        $.support.transition = function() {
            var transitionEnd = function() {
                var name, el = document.createElement("bootstrap"),
                    transEndEventNames = {
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd otransitionend",
                        transition: "transitionend"
                    };
                for (name in transEndEventNames)
                    if (void 0 !== el.style[name]) return transEndEventNames[name]
            }();
            return transitionEnd && {
                end: transitionEnd
            }
        }();
    });
};

/* =========================================================
 * bootstrap-modal.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#modals
 * =========================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

 function($) {
    "use strict";
    var Modal = function(element, options) {
        this.options = options, this.$element = $(element).delegate('[data-dismiss="modal"]', "click.dismiss.modal", $.proxy(this.hide, this)), this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
    };
    Modal.prototype = {
        constructor: Modal,
        toggle: function() {
            return this[this.isShown ? "hide" : "show"]()
        },
        show: function() {
            var that = this,
                e = $.Event("show");
            this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.backdrop(function() {
                var transition = $.support.transition && that.$element.hasClass("fade");
                that.$element.parent().length || that.$element.appendTo(document.body), that.$element.show(), transition && that.$element[0].offsetWidth, that.$element.addClass("in").attr("aria-hidden", !1), that.enforceFocus(), transition ? that.$element.one($.support.transition.end, function() {
                    that.$element.focus().trigger("shown")
                }) : that.$element.focus().trigger("shown")
            }))
        },
        hide: function(e) {
            e && e.preventDefault();
            e = $.Event("hide"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), $(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), $.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal())
        },
        enforceFocus: function() {
            var that = this;
            $(document).on("focusin.modal", function(e) {
                that.$element[0] === e.target || that.$element.has(e.target).length || that.$element.focus()
            })
        },
        escape: function() {
            var that = this;
            this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal", function(e) {
                27 == e.which && that.hide()
            }) : this.isShown || this.$element.off("keyup.dismiss.modal")
        },
        hideWithTransition: function() {
            var that = this,
                timeout = setTimeout(function() {
                    that.$element.off($.support.transition.end), that.hideModal()
                }, 500);
            this.$element.one($.support.transition.end, function() {
                clearTimeout(timeout), that.hideModal()
            })
        },
        hideModal: function() {
            var that = this;
            this.$element.hide(), this.backdrop(function() {
                that.removeBackdrop(), that.$element.trigger("hidden")
            })
        },
        removeBackdrop: function() {
            this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
        },
        backdrop: function(callback) {
            var animate = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var doAnimate = $.support.transition && animate;
                if (this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').appendTo(document.body), this.$backdrop.click("static" == this.options.backdrop ? $.proxy(this.$element[0].focus, this.$element[0]) : $.proxy(this.hide, this)), doAnimate && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !callback) return;
                doAnimate ? this.$backdrop.one($.support.transition.end, callback) : callback()
            } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), $.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one($.support.transition.end, callback) : callback()) : callback && callback()
        }
    };
    var old = $.fn.modal;
    $.fn.modal = function(option) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data("modal"),
                options = $.extend({}, $.fn.modal.defaults, $this.data(), "object" == typeof option && option);
            data || $this.data("modal", data = new Modal(this, options)), "string" == typeof option ? data[option]() : options.show && data.show()
        })
    }, $.fn.modal.defaults = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, $.fn.modal.Constructor = Modal, $.fn.modal.noConflict = function() {
        return $.fn.modal = old, this
    }, $(document).on("click.modal.data-api", '[data-toggle="modal"]', function(e) {
        var $this = $(this),
            href = $this.attr("href"),
            $target = $($this.attr("data-target") || href && href.replace(/.*(?=#[^\s]+$)/, "")),
            option = $target.data("modal") ? "toggle" : $.extend({
                remote: !/#/.test(href) && href
            }, $target.data(), $this.data());
        e.preventDefault(), $target.modal(option).one("hide", function() {
            $this.focus();
        });
    });
};


function($) {
    "use strict";

    function ScrollSpy(element, options) {
        var href, process = $.proxy(this.process, this),
            $element = $(element).is("body") ? $(window) : $(element);
        this.options = $.extend({}, $.fn.scrollspy.defaults, options), this.$scrollElement = $element.on("scroll.scroll-spy.data-api", process), this.selector = (this.options.target || (href = $(element).attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.$body = $("body"), this.refresh(), this.process()
    }
    ScrollSpy.prototype = {
        constructor: ScrollSpy,
        refresh: function() {
            var $targets, self = this;
            this.offsets = $([]), this.targets = $([]), $targets = this.$body.find(this.selector).map(function() {
                var $el = $(this),
                    href = $el.data("target") || $el.attr("href"),
                    $href = /^#\w/.test(href) && $(href);
                return $href && $href.length && [
                    [$href.position().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href]
                ] || null
            }).sort(function(a, b) {
                return a[0] - b[0]
            }).each(function() {
                self.offsets.push(this[0]), self.targets.push(this[1])
            })
        },
        process: function() {
            var i, scrollTop = this.$scrollElement.scrollTop() + this.options.offset,
                scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
                maxScroll = scrollHeight - this.$scrollElement.height(),
                offsets = this.offsets,
                targets = this.targets,
                activeTarget = this.activeTarget;
            if (scrollTop >= maxScroll) return activeTarget != (i = targets.last()[0]) && this.activate(i);
            for (i = offsets.length; i--;) activeTarget != targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1]) && this.activate(targets[i])
        },
        activate: function(target) {
            var active, selector;
            this.activeTarget = target, $(this.selector).parent(".active").removeClass("active"), selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]', active = $(selector).parent("li").addClass("active"), active.parent(".dropdown-menu").length && (active = active.closest("li.dropdown").addClass("active")), active.trigger("activate")
        }
    };
    var old = $.fn.scrollspy;
    $.fn.scrollspy = function(option) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data("scrollspy"),
                options = "object" == typeof option && option;
            data || $this.data("scrollspy", data = new ScrollSpy(this, options)), "string" == typeof option && data[option]()
        })
    }, $.fn.scrollspy.Constructor = ScrollSpy, $.fn.scrollspy.defaults = {
        offset: 10
    }, $.fn.scrollspy.noConflict = function() {
        return $.fn.scrollspy = old, this
    }, $(window).on("load", function() {
        $('[data-spy="scroll"]').each(function() {
            var $spy = $(this);
            $spy.scrollspy($spy.data())
        })
    })
},
/* ===========================================================
 * bootstrap-tooltip.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
! function($) {
    "use strict";
    var Tooltip = function(element, options) {
        this.init("tooltip", element, options)
    };
    Tooltip.prototype = {
        constructor: Tooltip,
        init: function(type, element, options) {
            var eventIn, eventOut, triggers, trigger, i;
            for (this.type = type, this.$element = $(element), this.options = this.getOptions(options), this.enabled = !0, triggers = this.options.trigger.split(" "), i = triggers.length; i--;) trigger = triggers[i], "click" == trigger ? this.$element.on("click." + this.type, this.options.selector, $.proxy(this.toggle, this)) : "manual" != trigger && (eventIn = "hover" == trigger ? "mouseenter" : "focus", eventOut = "hover" == trigger ? "mouseleave" : "blur", this.$element.on(eventIn + "." + this.type, this.options.selector, $.proxy(this.enter, this)), this.$element.on(eventOut + "." + this.type, this.options.selector, $.proxy(this.leave, this)));
            this.options.selector ? this._options = $.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        },
        getOptions: function(options) {
            return options = $.extend({}, $.fn[this.type].defaults, this.$element.data(), options), options.delay && "number" == typeof options.delay && (options.delay = {
                show: options.delay,
                hide: options.delay
            }), options
        },
        enter: function(e) {
            var self, defaults = $.fn[this.type].defaults,
                options = {};
            return this._options && $.each(this._options, function(key, value) {
                defaults[key] != value && (options[key] = value)
            }, this), self = $(e.currentTarget)[this.type](options).data(this.type), self.options.delay && self.options.delay.show ? (clearTimeout(this.timeout), self.hoverState = "in", this.timeout = setTimeout(function() {
                "in" == self.hoverState && self.show()
            }, self.options.delay.show), void 0) : self.show()
        },
        leave: function(e) {
            var self = $(e.currentTarget)[this.type](this._options).data(this.type);
            return this.timeout && clearTimeout(this.timeout), self.options.delay && self.options.delay.hide ? (self.hoverState = "out", this.timeout = setTimeout(function() {
                "out" == self.hoverState && self.hide()
            }, self.options.delay.hide), void 0) : self.hide()
        },
        show: function() {
            var $tip, pos, actualWidth, actualHeight, placement, tp, e = $.Event("show");
            if (this.hasContent() && this.enabled) {
                if (this.$element.trigger(e), e.isDefaultPrevented()) return;
                switch ($tip = this.tip(), this.setContent(), this.options.animation && $tip.addClass("fade"), placement = "function" == typeof this.options.placement ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement, $tip.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }), this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element), pos = this.getPosition(), actualWidth = $tip[0].offsetWidth, actualHeight = $tip[0].offsetHeight, placement) {
                    case "bottom":
                        tp = {
                            top: pos.top + pos.height,
                            left: pos.left + pos.width / 2 - actualWidth / 2
                        };
                        break;
                    case "top":
                        tp = {
                            top: pos.top - actualHeight,
                            left: pos.left + pos.width / 2 - actualWidth / 2
                        };
                        break;
                    case "left":
                        tp = {
                            top: pos.top + pos.height / 2 - actualHeight / 2,
                            left: pos.left - actualWidth
                        };
                        break;
                    case "right":
                        tp = {
                            top: pos.top + pos.height / 2 - actualHeight / 2,
                            left: pos.left + pos.width
                        }
                }
                this.applyPlacement(tp, placement), this.$element.trigger("shown")
            }
        },
        applyPlacement: function(offset, placement) {
            var actualWidth, actualHeight, delta, replace, $tip = this.tip(),
                width = $tip[0].offsetWidth,
                height = $tip[0].offsetHeight;
            $tip.offset(offset).addClass(placement).addClass("in"), actualWidth = $tip[0].offsetWidth, actualHeight = $tip[0].offsetHeight, "top" == placement && actualHeight != height && (offset.top = offset.top + height - actualHeight, replace = !0), "bottom" == placement || "top" == placement ? (delta = 0, offset.left < 0 && (delta = -2 * offset.left, offset.left = 0, $tip.offset(offset), actualWidth = $tip[0].offsetWidth, actualHeight = $tip[0].offsetHeight), this.replaceArrow(delta - width + actualWidth, actualWidth, "left")) : this.replaceArrow(actualHeight - height, actualHeight, "top"), replace && $tip.offset(offset)
        },
        replaceArrow: function(delta, dimension, position) {
            this.arrow().css(position, delta ? 50 * (1 - delta / dimension) + "%" : "")
        },
        setContent: function() {
            var $tip = this.tip(),
                title = this.getTitle();
            $tip.find(".tooltip-inner")[this.options.html ? "html" : "text"](title), $tip.removeClass("fade in top bottom left right")
        },
        hide: function() {
            function removeWithAnimation() {
                var timeout = setTimeout(function() {
                    $tip.off($.support.transition.end).detach()
                }, 500);
                $tip.one($.support.transition.end, function() {
                    clearTimeout(timeout), $tip.detach()
                })
            }
            var $tip = this.tip(),
                e = $.Event("hide");
            return this.$element.trigger(e), e.isDefaultPrevented() ? void 0 : ($tip.removeClass("in"), $.support.transition && this.$tip.hasClass("fade") ? removeWithAnimation() : $tip.detach(), this.$element.trigger("hidden"), this)
        },
        fixTitle: function() {
            var $e = this.$element;
            ($e.attr("title") || "string" != typeof $e.attr("data-original-title")) && $e.attr("data-original-title", $e.attr("title") || "").attr("title", "")
        },
        hasContent: function() {
            return this.getTitle()
        },
        getPosition: function() {
            var el = this.$element[0];
            return $.extend({}, "function" == typeof el.getBoundingClientRect ? el.getBoundingClientRect() : {
                width: el.offsetWidth,
                height: el.offsetHeight
            }, this.$element.offset())
        },
        getTitle: function() {
            var title, $e = this.$element,
                o = this.options;
            return title = $e.attr("data-original-title") || ("function" == typeof o.title ? o.title.call($e[0]) : o.title)
        },
        tip: function() {
            return this.$tip = this.$tip || $(this.options.template)
        },
        arrow: function() {
            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
        },
        validate: function() {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        },
        enable: function() {
            this.enabled = !0
        },
        disable: function() {
            this.enabled = !1
        },
        toggleEnabled: function() {
            this.enabled = !this.enabled
        },
        toggle: function(e) {
            var self = e ? $(e.currentTarget)[this.type](this._options).data(this.type) : this;
            self.tip().hasClass("in") ? self.hide() : self.show()
        },
        destroy: function() {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    };
    var old = $.fn.tooltip;
    $.fn.tooltip = function(option) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data("tooltip"),
                options = "object" == typeof option && option;
            data || $this.data("tooltip", data = new Tooltip(this, options)), "string" == typeof option && data[option]()
        })
    }, $.fn.tooltip.Constructor = Tooltip, $.fn.tooltip.defaults = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1
    }, $.fn.tooltip.noConflict = function() {
        return $.fn.tooltip = old, this
    }
}(window.jQuery),
/* ===========================================================
 * bootstrap-popover.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#popovers
 * ===========================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */
! function($) {
    "use strict";
    var Popover = function(element, options) {
        this.init("popover", element, options)
    };
    Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {
        constructor: Popover,
        setContent: function() {
            var $tip = this.tip(),
                title = this.getTitle(),
                content = this.getContent();
            $tip.find(".popover-title")[this.options.html ? "html" : "text"](title), $tip.find(".popover-content")[this.options.html ? "html" : "text"](content), $tip.removeClass("fade top bottom left right in")
        },
        hasContent: function() {
            return this.getTitle() || this.getContent()
        },
        getContent: function() {
            var content, $e = this.$element,
                o = this.options;
            return content = ("function" == typeof o.content ? o.content.call($e[0]) : o.content) || $e.attr("data-content")
        },
        tip: function() {
            return this.$tip || (this.$tip = $(this.options.template)), this.$tip
        },
        destroy: function() {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    });
    var old = $.fn.popover;
    $.fn.popover = function(option) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data("popover"),
                options = "object" == typeof option && option;
            data || $this.data("popover", data = new Popover(this, options)), "string" == typeof option && data[option]()
        })
    }, $.fn.popover.Constructor = Popover, $.fn.popover.defaults = $.extend({}, $.fn.tooltip.defaults, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), $.fn.popover.noConflict = function() {
        return $.fn.popover = old, this
    }
}(window.jQuery),
/* ==========================================================
 * bootstrap-alert.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#alerts
 * ==========================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
! function($) {
    "use strict";
    var dismiss = '[data-dismiss="alert"]',
        Alert = function(el) {
            $(el).on("click", dismiss, this.close)
        };
    Alert.prototype.close = function(e) {
        function removeElement() {
            $parent.trigger("closed").remove()
        }
        var $parent, $this = $(this),
            selector = $this.attr("data-target");
        selector || (selector = $this.attr("href"), selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "")), $parent = $(selector), e && e.preventDefault(), $parent.length || ($parent = $this.hasClass("alert") ? $this : $this.parent()), $parent.trigger(e = $.Event("close")), e.isDefaultPrevented() || ($parent.removeClass("in"), $.support.transition && $parent.hasClass("fade") ? $parent.on($.support.transition.end, removeElement) : removeElement())
    };
    var old = $.fn.alert;
    $.fn.alert = function(option) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data("alert");
            data || $this.data("alert", data = new Alert(this)), "string" == typeof option && data[option].call($this)
        })
    }, $.fn.alert.Constructor = Alert, $.fn.alert.noConflict = function() {
        return $.fn.alert = old, this
    }, $(document).on("click.alert.data-api", dismiss, Alert.prototype.close)
}(window.jQuery),
/* ============================================================
 * bootstrap-button.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#buttons
 * ============================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
! function($) {
    "use strict";
    var Button = function(element, options) {
        this.$element = $(element), this.options = $.extend({}, $.fn.button.defaults, options)
    };
    Button.prototype.setState = function(state) {
        var d = "disabled",
            $el = this.$element,
            data = $el.data(),
            val = $el.is("input") ? "val" : "html";
        state += "Text", data.resetText || $el.data("resetText", $el[val]()), $el[val](data[state] || this.options[state]), setTimeout(function() {
            "loadingText" == state ? $el.addClass(d).attr(d, d) : $el.removeClass(d).removeAttr(d)
        }, 0)
    }, Button.prototype.toggle = function() {
        var $parent = this.$element.closest('[data-toggle="buttons-radio"]');
        $parent && $parent.find(".active").removeClass("active"), this.$element.toggleClass("active")
    };
    var old = $.fn.button;
    $.fn.button = function(option) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data("button"),
                options = "object" == typeof option && option;
            data || $this.data("button", data = new Button(this, options)), "toggle" == option ? data.toggle() : option && data.setState(option)
        })
    }, $.fn.button.defaults = {
        loadingText: "loading..."
    }, $.fn.button.Constructor = Button, $.fn.button.noConflict = function() {
        return $.fn.button = old, this
    }, $(document).on("click.button.data-api", "[data-toggle^=button]", function(e) {
        var $btn = $(e.target);
        $btn.hasClass("btn") || ($btn = $btn.closest(".btn")), $btn.button("toggle")
    })
}(window.jQuery),
/* =============================================================
 * bootstrap-collapse.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#collapse
 * =============================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
! function($) {
    "use strict";
    var Collapse = function(element, options) {
        this.$element = $(element), this.options = $.extend({}, $.fn.collapse.defaults, options), this.options.parent && (this.$parent = $(this.options.parent)), this.options.toggle && this.toggle()
    };
    Collapse.prototype = {
        constructor: Collapse,
        dimension: function() {
            var hasWidth = this.$element.hasClass("width");
            return hasWidth ? "width" : "height"
        },
        show: function() {
            var dimension, scroll, actives, hasData;
            if (!this.transitioning && !this.$element.hasClass("in")) {
                if (dimension = this.dimension(), scroll = $.camelCase(["scroll", dimension].join("-")), actives = this.$parent && this.$parent.find("> .accordion-group > .in"), actives && actives.length) {
                    if (hasData = actives.data("collapse"), hasData && hasData.transitioning) return;
                    actives.collapse("hide"), hasData || actives.data("collapse", null)
                }
                this.$element[dimension](0), this.transition("addClass", $.Event("show"), "shown"), $.support.transition && this.$element[dimension](this.$element[0][scroll])
            }
        },
        hide: function() {
            var dimension;
            !this.transitioning && this.$element.hasClass("in") && (dimension = this.dimension(), this.reset(this.$element[dimension]()), this.transition("removeClass", $.Event("hide"), "hidden"), this.$element[dimension](0))
        },
        reset: function(size) {
            var dimension = this.dimension();
            return this.$element.removeClass("collapse")[dimension](size || "auto")[0].offsetWidth, this.$element[null !== size ? "addClass" : "removeClass"]("collapse"), this
        },
        transition: function(method, startEvent, completeEvent) {
            var that = this,
                complete = function() {
                    "show" == startEvent.type && that.reset(), that.transitioning = 0, that.$element.trigger(completeEvent)
                };
            this.$element.trigger(startEvent), startEvent.isDefaultPrevented() || (this.transitioning = 1, this.$element[method]("in"), $.support.transition && this.$element.hasClass("collapse") ? this.$element.one($.support.transition.end, complete) : complete())
        },
        toggle: function() {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        }
    };
    var old = $.fn.collapse;
    $.fn.collapse = function(option) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data("collapse"),
                options = $.extend({}, $.fn.collapse.defaults, $this.data(), "object" == typeof option && option);
            data || $this.data("collapse", data = new Collapse(this, options)), "string" == typeof option && data[option]()
        })
    }, $.fn.collapse.defaults = {
        toggle: !0
    }, $.fn.collapse.Constructor = Collapse, $.fn.collapse.noConflict = function() {
        return $.fn.collapse = old, this
    }, $(document).on("click.collapse.data-api", "[data-toggle=collapse]", function(e) {
        var href, $this = $(this),
            target = $this.attr("data-target") || e.preventDefault() || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, ""),
            option = $(target).data("collapse") ? "toggle" : $this.data();
        $this[$(target).hasClass("in") ? "addClass" : "removeClass"]("collapsed"), $(target).collapse(option)
    })
}(window.jQuery),
/* ==========================================================
 * bootstrap-carousel.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#carousel
 * ==========================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
! function($) {
    "use strict";
    var Carousel = function(element, options) {
        this.$element = $(element), this.$indicators = this.$element.find(".carousel-indicators"), this.options = options, "hover" == this.options.pause && this.$element.on("mouseenter", $.proxy(this.pause, this)).on("mouseleave", $.proxy(this.cycle, this))
    };
    Carousel.prototype = {
        cycle: function(e) {
            return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval)), this
        },
        getActiveIndex: function() {
            return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
        },
        to: function(pos) {
            var activeIndex = this.getActiveIndex(),
                that = this;
            if (!(pos > this.$items.length - 1 || 0 > pos)) return this.sliding ? this.$element.one("slid", function() {
                that.to(pos)
            }) : activeIndex == pos ? this.pause().cycle() : this.slide(pos > activeIndex ? "next" : "prev", $(this.$items[pos]))
        },
        pause: function(e) {
            return e || (this.paused = !0), this.$element.find(".next, .prev").length && $.support.transition.end && (this.$element.trigger($.support.transition.end), this.cycle(!0)), clearInterval(this.interval), this.interval = null, this
        },
        next: function() {
            return this.sliding ? void 0 : this.slide("next")
        },
        prev: function() {
            return this.sliding ? void 0 : this.slide("prev")
        },
        slide: function(type, next) {
            var e, $active = this.$element.find(".item.active"),
                $next = next || $active[type](),
                isCycling = this.interval,
                direction = "next" == type ? "left" : "right",
                fallback = "next" == type ? "first" : "last",
                that = this;
            if (this.sliding = !0, isCycling && this.pause(), $next = $next.length ? $next : this.$element.find(".item")[fallback](), e = $.Event("slide", {
                    relatedTarget: $next[0],
                    direction: direction
                }), !$next.hasClass("active")) {
                if (this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid", function() {
                        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()]);
                        $nextIndicator && $nextIndicator.addClass("active")
                    })), $.support.transition && this.$element.hasClass("slide")) {
                    if (this.$element.trigger(e), e.isDefaultPrevented()) return;
                    $next.addClass(type), $next[0].offsetWidth, $active.addClass(direction), $next.addClass(direction), this.$element.one($.support.transition.end, function() {
                        $next.removeClass([type, direction].join(" ")).addClass("active"), $active.removeClass(["active", direction].join(" ")), that.sliding = !1, setTimeout(function() {
                            that.$element.trigger("slid")
                        }, 0)
                    })
                } else {
                    if (this.$element.trigger(e), e.isDefaultPrevented()) return;
                    $active.removeClass("active"), $next.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
                }
                return isCycling && this.cycle(), this
            }
        }
    };
    var old = $.fn.carousel;
    $.fn.carousel = function(option) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data("carousel"),
                options = $.extend({}, $.fn.carousel.defaults, "object" == typeof option && option),
                action = "string" == typeof option ? option : options.slide;
            data || $this.data("carousel", data = new Carousel(this, options)), "number" == typeof option ? data.to(option) : action ? data[action]() : options.interval && data.pause().cycle()
        })
    }, $.fn.carousel.defaults = {
        interval: 5e3,
        pause: "hover"
    }, $.fn.carousel.Constructor = Carousel, $.fn.carousel.noConflict = function() {
        return $.fn.carousel = old, this
    }, $(document).on("click.carousel.data-api", "[data-slide], [data-slide-to]", function(e) {
        var href, slideIndex, $this = $(this),
            $target = $($this.attr("data-target") || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "")),
            options = $.extend({}, $target.data(), $this.data());
        $target.carousel(options), (slideIndex = $this.attr("data-slide-to")) && $target.data("carousel").pause().to(slideIndex).cycle(), e.preventDefault()
    })
}(window.jQuery),
/* =============================================================
 * bootstrap-typeahead.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#typeahead
 * =============================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
! function($) {
    "use strict";
    var Typeahead = function(element, options) {
        this.$element = $(element), this.options = $.extend({}, $.fn.typeahead.defaults, options), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.source = this.options.source, this.$menu = $(this.options.menu), this.shown = !1, this.listen()
    };
    Typeahead.prototype = {
        constructor: Typeahead,
        select: function() {
            var val = this.$menu.find(".active").attr("data-value");
            return this.$element.val(this.updater(val)).change(), this.hide()
        },
        updater: function(item) {
            return item
        },
        show: function() {
            var pos = $.extend({}, this.$element.position(), {
                height: this.$element[0].offsetHeight
            });
            return this.$menu.insertAfter(this.$element).css({
                top: pos.top + pos.height,
                left: pos.left
            }).show(), this.shown = !0, this
        },
        hide: function() {
            return this.$menu.hide(), this.shown = !1, this
        },
        lookup: function() {
            var items;
            return this.query = this.$element.val(), !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (items = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source, items ? this.process(items) : this)
        },
        process: function(items) {
            var that = this;
            return items = $.grep(items, function(item) {
                return that.matcher(item)
            }), items = this.sorter(items), items.length ? this.render(items.slice(0, this.options.items)).show() : this.shown ? this.hide() : this
        },
        matcher: function(item) {
            return ~item.toLowerCase().indexOf(this.query.toLowerCase())
        },
        sorter: function(items) {
            for (var item, beginswith = [], caseSensitive = [], caseInsensitive = []; item = items.shift();) item.toLowerCase().indexOf(this.query.toLowerCase()) ? ~item.indexOf(this.query) ? caseSensitive.push(item) : caseInsensitive.push(item) : beginswith.push(item);
            return beginswith.concat(caseSensitive, caseInsensitive)
        },
        highlighter: function(item) {
            var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            return item.replace(new RegExp("(" + query + ")", "ig"), function($1, match) {
                return "<strong>" + match + "</strong>"
            })
        },
        render: function(items) {
            var that = this;
            return items = $(items).map(function(i, item) {
                return i = $(that.options.item).attr("data-value", item), i.find("a").html(that.highlighter(item)), i[0]
            }), items.first().addClass("active"), this.$menu.html(items), this
        },
        next: function() {
            var active = this.$menu.find(".active").removeClass("active"),
                next = active.next();
            next.length || (next = $(this.$menu.find("li")[0])), next.addClass("active")
        },
        prev: function() {
            var active = this.$menu.find(".active").removeClass("active"),
                prev = active.prev();
            prev.length || (prev = this.$menu.find("li").last()), prev.addClass("active")
        },
        listen: function() {
            this.$element.on("focus", $.proxy(this.focus, this)).on("blur", $.proxy(this.blur, this)).on("keypress", $.proxy(this.keypress, this)).on("keyup", $.proxy(this.keyup, this)), this.eventSupported("keydown") && this.$element.on("keydown", $.proxy(this.keydown, this)), this.$menu.on("click", $.proxy(this.click, this)).on("mouseenter", "li", $.proxy(this.mouseenter, this)).on("mouseleave", "li", $.proxy(this.mouseleave, this))
        },
        eventSupported: function(eventName) {
            var isSupported = eventName in this.$element;
            return isSupported || (this.$element.setAttribute(eventName, "return;"), isSupported = "function" == typeof this.$element[eventName]), isSupported
        },
        move: function(e) {
            if (this.shown) {
                switch (e.keyCode) {
                    case 9:
                    case 13:
                    case 27:
                        e.preventDefault();
                        break;
                    case 38:
                        e.preventDefault(), this.prev();
                        break;
                    case 40:
                        e.preventDefault(), this.next()
                }
                e.stopPropagation()
            }
        },
        keydown: function(e) {
            this.suppressKeyPressRepeat = ~$.inArray(e.keyCode, [40, 38, 9, 13, 27]), this.move(e)
        },
        keypress: function(e) {
            this.suppressKeyPressRepeat || this.move(e)
        },
        keyup: function(e) {
            switch (e.keyCode) {
                case 40:
                case 38:
                case 16:
                case 17:
                case 18:
                    break;
                case 9:
                case 13:
                    if (!this.shown) return;
                    this.select();
                    break;
                case 27:
                    if (!this.shown) return;
                    this.hide();
                    break;
                default:
                    this.lookup()
            }
            e.stopPropagation(), e.preventDefault()
        },
        focus: function() {
            this.focused = !0
        },
        blur: function() {
            this.focused = !1, !this.mousedover && this.shown && this.hide()
        },
        click: function(e) {
            e.stopPropagation(), e.preventDefault(), this.select(), this.$element.focus()
        },
        mouseenter: function(e) {
            this.mousedover = !0, this.$menu.find(".active").removeClass("active"), $(e.currentTarget).addClass("active")
        },
        mouseleave: function() {
            this.mousedover = !1, !this.focused && this.shown && this.hide()
        }
    };
    var old = $.fn.typeahead;
    $.fn.typeahead = function(option) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data("typeahead"),
                options = "object" == typeof option && option;
            data || $this.data("typeahead", data = new Typeahead(this, options)), "string" == typeof option && data[option]()
        })
    }, $.fn.typeahead.defaults = {
        source: [],
        items: 8,
        menu: '<ul class="typeahead dropdown-menu"></ul>',
        item: '<li><a href="#"></a></li>',
        minLength: 1
    }, $.fn.typeahead.Constructor = Typeahead, $.fn.typeahead.noConflict = function() {
        return $.fn.typeahead = old, this
    }, $(document).on("focus.typeahead.data-api", '[data-provide="typeahead"]', function() {
        var $this = $(this);
        $this.data("typeahead") || $this.typeahead($this.data())
    })
}(window.jQuery),
/*! jQuery UI - v1.8.23 - 2012-08-15
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.draggable.js, jquery.ui.droppable.js, jquery.ui.resizable.js, jquery.ui.selectable.js, jquery.ui.sortable.js, jquery.effects.core.js, jquery.effects.blind.js, jquery.effects.bounce.js, jquery.effects.clip.js, jquery.effects.drop.js, jquery.effects.explode.js, jquery.effects.fade.js, jquery.effects.fold.js, jquery.effects.highlight.js, jquery.effects.pulsate.js, jquery.effects.scale.js, jquery.effects.shake.js, jquery.effects.slide.js, jquery.effects.transfer.js, jquery.ui.accordion.js, jquery.ui.autocomplete.js, jquery.ui.button.js, jquery.ui.datepicker.js, jquery.ui.dialog.js, jquery.ui.position.js, jquery.ui.progressbar.js, jquery.ui.slider.js, jquery.ui.tabs.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
function($, undefined) {
    function focusable(element, isTabIndexNotNaN) {
        var nodeName = element.nodeName.toLowerCase();
        if ("area" === nodeName) {
            var img, map = element.parentNode,
                mapName = map.name;
            return element.href && mapName && "map" === map.nodeName.toLowerCase() ? (img = $("img[usemap=#" + mapName + "]")[0], !!img && visible(img)) : !1
        }
        return (/input|select|textarea|button|object/.test(nodeName) ? !element.disabled : "a" == nodeName ? element.href || isTabIndexNotNaN : isTabIndexNotNaN) && visible(element)
    }

    function visible(element) {
        return !$(element).parents().andSelf().filter(function() {
            return "hidden" === $.curCSS(this, "visibility") || $.expr.filters.hidden(this)
        }).length
    }
    $.ui = $.ui || {}, $.ui.version || ($.extend($.ui, {
        version: "1.8.23",
        keyCode: {
            ALT: 18,
            BACKSPACE: 8,
            CAPS_LOCK: 20,
            COMMA: 188,
            COMMAND: 91,
            COMMAND_LEFT: 91,
            COMMAND_RIGHT: 93,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            MENU: 93,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            WINDOWS: 91
        }
    }), $.fn.extend({
        propAttr: $.fn.prop || $.fn.attr,
        _focus: $.fn.focus,
        focus: function(delay, fn) {
            return "number" == typeof delay ? this.each(function() {
                var elem = this;
                setTimeout(function() {
                    $(elem).focus(), fn && fn.call(elem)
                }, delay)
            }) : this._focus.apply(this, arguments)
        },
        scrollParent: function() {
            var scrollParent;
            return scrollParent = $.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test($.curCSS(this, "position", 1)) && /(auto|scroll)/.test($.curCSS(this, "overflow", 1) + $.curCSS(this, "overflow-y", 1) + $.curCSS(this, "overflow-x", 1))
            }).eq(0) : this.parents().filter(function() {
                return /(auto|scroll)/.test($.curCSS(this, "overflow", 1) + $.curCSS(this, "overflow-y", 1) + $.curCSS(this, "overflow-x", 1))
            }).eq(0), /fixed/.test(this.css("position")) || !scrollParent.length ? $(document) : scrollParent
        },
        zIndex: function(zIndex) {
            if (zIndex !== undefined) return this.css("zIndex", zIndex);
            if (this.length)
                for (var position, value, elem = $(this[0]); elem.length && elem[0] !== document;) {
                    if (position = elem.css("position"), ("absolute" === position || "relative" === position || "fixed" === position) && (value = parseInt(elem.css("zIndex"), 10), !isNaN(value) && 0 !== value)) return value;
                    elem = elem.parent()
                }
            return 0
        },
        disableSelection: function() {
            return this.bind(($.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(event) {
                event.preventDefault()
            })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    }), $("<a>").outerWidth(1).jquery || $.each(["Width", "Height"], function(i, name) {
        function reduce(elem, size, border, margin) {
            return $.each(side, function() {
                size -= parseFloat($.curCSS(elem, "padding" + this, !0)) || 0, border && (size -= parseFloat($.curCSS(elem, "border" + this + "Width", !0)) || 0), margin && (size -= parseFloat($.curCSS(elem, "margin" + this, !0)) || 0)
            }), size
        }
        var side = "Width" === name ? ["Left", "Right"] : ["Top", "Bottom"],
            type = name.toLowerCase(),
            orig = {
                innerWidth: $.fn.innerWidth,
                innerHeight: $.fn.innerHeight,
                outerWidth: $.fn.outerWidth,
                outerHeight: $.fn.outerHeight
            };
        $.fn["inner" + name] = function(size) {
            return size === undefined ? orig["inner" + name].call(this) : this.each(function() {
                $(this).css(type, reduce(this, size) + "px")
            })
        }, $.fn["outer" + name] = function(size, margin) {
            return "number" != typeof size ? orig["outer" + name].call(this, size) : this.each(function() {
                $(this).css(type, reduce(this, size, !0, margin) + "px")
            })
        }
    ), $.extend($.expr[":"], {
        data: $.expr.createPseudo ? $.expr.createPseudo(function(dataName) {
            return function(elem) {
                return !!$.data(elem, dataName)
            }
        ) : function(elem, i, match) {
            return !!$.data(elem, match[3])
        },
        focusable: function(element) {
            return focusable(element, !isNaN($.attr(element, "tabindex")))
        },
        tabbable: function(element) {
            var tabIndex = $.attr(element, "tabindex"),
                isTabIndexNaN = isNaN(tabIndex);
            return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN)
        }
    }), $(function() {
        var body = document.body,
            div = body.appendChild(div = document.createElement("div"));
        div.offsetHeight, $.extend(div.style, {
            minHeight: "100px",
            height: "auto",
            padding: 0,
            borderWidth: 0
        }), $.support.minHeight = 100 === div.offsetHeight, $.support.selectstart = "onselectstart" in div, body.removeChild(div).style.display = "none"
    }), $.curCSS || ($.curCSS = $.css), $.extend($.ui, {
        plugin: {
            add: function(module, option, set) {
                var proto = $.ui[module].prototype;
                for (var i in set) proto.plugins[i] = proto.plugins[i] || [], proto.plugins[i].push([option, set[i]])
            },
            call: function(instance, name, args) {
                var set = instance.plugins[name];
                if (set && instance.element[0].parentNode)
                    for (var i = 0; i < set.length; i++) instance.options[set[i][0]] && set[i][1].apply(instance.element, args)
            }
        },
        contains: function(a, b) {
            return document.compareDocumentPosition ? 16 & a.compareDocumentPosition(b) : a !== b && a.contains(b)
        },
        hasScroll: function(el, a) {
            if ("hidden" === $(el).css("overflow")) return !1;
            var scroll = a && "left" === a ? "scrollLeft" : "scrollTop",
                has = !1;
            return el[scroll] > 0 ? !0 : (el[scroll] = 1, has = el[scroll] > 0, el[scroll] = 0, has)
        },
        isOverAxis: function(x, reference, size) {
            return x > reference && reference + size > x
        },
        isOver: function(y, x, top, left, height, width) {
            return $.ui.isOverAxis(y, top, height) && $.ui.isOverAxis(x, left, width)
        }
    }))
}(jQuery),
function($, undefined) {
    if ($.cleanData) {
        var _cleanData = $.cleanData;
        $.cleanData = function(elems) {
            for (var elem, i = 0; null != (elem = elems[i]); i++) try {
                $(elem).triggerHandler("remove")
            } catch (e) {}
            _cleanData(elems)
        }
    }; else {
        var _remove = $.fn.remove;
        $.fn.remove = function(selector, keepData) {
            return this.each(function() {
                return keepData || (!selector || $.filter(selector, [this]).length) && $("*", this).add([this]).each(function() {
                    try {
                        $(this).triggerHandler("remove")
                    } catch (e) {}
                }), _remove.call($(this), selector, keepData)
            })
        }
    }
    $.widget = function(name, base, prototype) {
        var fullName, namespace = name.split(".")[0];
        name = name.split(".")[1], fullName = namespace + "-" + name, prototype || (prototype = base, base = $.Widget), $.expr[":"][fullName] = function(elem) {
            return !!$.data(elem, name)
        }, $[namespace] = $[namespace] || {}, $[namespace][name] = function(options, element) {
            arguments.length && this._createWidget(options, element)
        };
        var basePrototype = new base;
        basePrototype.options = $.extend(!0, {}, basePrototype.options), $[namespace][name].prototype = $.extend(!0, basePrototype, {
            namespace: namespace,
            widgetName: name,
            widgetEventPrefix: $[namespace][name].prototype.widgetEventPrefix || name,
            widgetBaseClass: fullName
        }, prototype), $.widget.bridge(name, $[namespace][name])
    }, $.widget.bridge = function(name, object) {
        $.fn[name] = function(options) {
            var isMethodCall = "string" == typeof options,
                args = Array.prototype.slice.call(arguments, 1),
                returnValue = this;
            return options = !isMethodCall && args.length ? $.extend.apply(null, [!0, options].concat(args)) : options, isMethodCall && "_" === options.charAt(0) ? returnValue : (isMethodCall ? this.each(function() {
                var instance = $.data(this, name),
                    methodValue = instance && $.isFunction(instance[options]) ? instance[options].apply(instance, args) : instance;
                return methodValue !== instance && methodValue !== undefined ? (returnValue = methodValue, !1) : void 0
            }) : this.each(function() {
                var instance = $.data(this, name);
                instance ? instance.option(options || {})._init() : $.data(this, name, new object(options, this))
            }), returnValue)
        }
    }, $.Widget = function(options, element) {
        arguments.length && this._createWidget(options, element)
    }, $.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {
            disabled: !1
        },
        _createWidget: function(options, element) {
            $.data(element, this.widgetName, this), this.element = $(element), this.options = $.extend(!0, {}, this.options, this._getCreateOptions(), options);
            var self = this;
            this.element.bind("remove." + this.widgetName, function() {
                self.destroy()
            }), this._create(), this._trigger("create"), this._init()
        },
        _getCreateOptions: function() {
            return $.metadata && $.metadata.get(this.element[0])[this.widgetName]
        },
        _create: function() {},
        _init: function() {},
        destroy: function() {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName), this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled")
        },
        widget: function() {
            return this.element
        },
        option: function(key, value) {
            var options = key;
            if (0 === arguments.length) return $.extend({}, this.options);
            if ("string" == typeof key) {
                if (value === undefined) return this.options[key];
                options = {}, options[key] = value
            }
            return this._setOptions(options), this
        },
        _setOptions: function(options) {
            var self = this;
            return $.each(options, function(key, value) {
                self._setOption(key, value)
            }), this
        },
        _setOption: function(key, value) {
            return this.options[key] = value, "disabled" === key && this.widget()[value ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", value), this
        },
        enable: function() {
            return this._setOption("disabled", !1)
        },
        disable: function() {
            return this._setOption("disabled", !0)
        },
        _trigger: function(type, event, data) {
            var prop, orig, callback = this.options[type];
            if (data = data || {}, event = $.Event(event), event.type = (type === this.widgetEventPrefix ? type : this.widgetEventPrefix + type).toLowerCase(), event.target = this.element[0], orig = event.originalEvent)
                for (prop in orig) prop in event || (event[prop] = orig[prop]);
            return this.element.trigger(event, data), !($.isFunction(callback) && callback.call(this.element[0], event, data) === !1 || event.isDefaultPrevented())
        }
    }
}(jQuery),
function($) {
    var mouseHandled = !1;
    $(document).mouseup(function() {
        mouseHandled = !1
    }), $.widget("ui.mouse", {
        options: {
            cancel: ":input,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var self = this;
            this.element.bind("mousedown." + this.widgetName, function(event) {
                return self._mouseDown(event)
            }).bind("click." + this.widgetName, function(event) {
                return !0 === $.data(event.target, self.widgetName + ".preventClickEvent") ? ($.removeData(event.target, self.widgetName + ".preventClickEvent"), event.stopImmediatePropagation(), !1) : void 0
            }), this.started = !1
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && $(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(event) {
            if (!mouseHandled) {
                this._mouseStarted && this._mouseUp(event), this._mouseDownEvent = event;
                var self = this,
                    btnIsLeft = 1 == event.which,
                    elIsCancel = "string" == typeof this.options.cancel && event.target.nodeName ? $(event.target).closest(this.options.cancel).length : !1;
                return btnIsLeft && !elIsCancel && this._mouseCapture(event) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    self.mouseDelayMet = !0
                }, this.options.delay)), this._mouseDistanceMet(event) && this._mouseDelayMet(event) && (this._mouseStarted = this._mouseStart(event) !== !1, !this._mouseStarted) ? (event.preventDefault(), !0) : (!0 === $.data(event.target, this.widgetName + ".preventClickEvent") && $.removeData(event.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(event) {
                    return self._mouseMove(event)
                }, this._mouseUpDelegate = function(event) {
                    return self._mouseUp(event)
                }, $(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), event.preventDefault(), mouseHandled = !0, !0)) : !0
            }
        },
        _mouseMove: function(event) {
            return !$.browser.msie || document.documentMode >= 9 || event.button ? this._mouseStarted ? (this._mouseDrag(event), event.preventDefault()) : (this._mouseDistanceMet(event) && this._mouseDelayMet(event) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, event) !== !1, this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event)), !this._mouseStarted) : this._mouseUp(event)
        },
        _mouseUp: function(event) {
            return $(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, event.target == this._mouseDownEvent.target && $.data(event.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(event)), !1
        },
        _mouseDistanceMet: function(event) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - event.pageX), Math.abs(this._mouseDownEvent.pageY - event.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0
        }
    })
}(jQuery),
function($) {
    $.widget("ui.draggable", $.ui.mouse, {
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1
        },
        _create: function() {
            "original" != this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
        },
        destroy: function() {
            return this.element.data("draggable") ? (this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy(), this) : void 0
        },
        _mouseCapture: function(event) {
            var o = this.options;
            return this.helper || o.disabled || $(event.target).is(".ui-resizable-handle") ? !1 : (this.handle = this._getHandle(event), this.handle ? (o.iframeFix && $(o.iframeFix === !0 ? "iframe" : o.iframeFix).each(function() {
                $('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1e3
                }).css($(this).offset()).appendTo("body")
            }), !0) : !1)
        },
        _mouseStart: function(event) {
            var o = this.options;
            return this.helper = this._createHelper(event), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), $.ui.ddmanager && ($.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offset = this.positionAbs = this.element.offset(), this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            }, $.extend(this.offset, {
                click: {
                    left: event.pageX - this.offset.left,
                    top: event.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }), this.originalPosition = this.position = this._generatePosition(event), this.originalPageX = event.pageX, this.originalPageY = event.pageY, o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt), o.containment && this._setContainment(), this._trigger("start", event) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), $.ui.ddmanager && !o.dropBehaviour && $.ui.ddmanager.prepareOffsets(this, event), this._mouseDrag(event, !0), $.ui.ddmanager && $.ui.ddmanager.dragStart(this, event), !0)
        },
        _mouseDrag: function(event, noPropagation) {
            if (this.position = this._generatePosition(event), this.positionAbs = this._convertPositionTo("absolute"), !noPropagation) {
                var ui = this._uiHash();
                if (this._trigger("drag", event, ui) === !1) return this._mouseUp({}), !1;
                this.position = ui.position
            }
            return this.options.axis && "y" == this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" == this.options.axis || (this.helper[0].style.top = this.position.top + "px"), $.ui.ddmanager && $.ui.ddmanager.drag(this, event), !1
        },
        _mouseStop: function(event) {
            var dropped = !1;
            $.ui.ddmanager && !this.options.dropBehaviour && (dropped = $.ui.ddmanager.drop(this, event)), this.dropped && (dropped = this.dropped, this.dropped = !1);
            for (var element = this.element[0], elementInDom = !1; element && (element = element.parentNode);) element == document && (elementInDom = !0);
            if (!elementInDom && "original" === this.options.helper) return !1;
            if ("invalid" == this.options.revert && !dropped || "valid" == this.options.revert && dropped || this.options.revert === !0 || $.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped)) {
                var self = this;
                $(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                    self._trigger("stop", event) !== !1 && self._clear()
                })
            } else this._trigger("stop", event) !== !1 && this._clear();
            return !1
        },
        _mouseUp: function(event) {
            return this.options.iframeFix === !0 && $("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this)
            }), $.ui.ddmanager && $.ui.ddmanager.dragStop(this, event), $.ui.mouse.prototype._mouseUp.call(this, event)
        },
        cancel: function() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
        },
        _getHandle: function(event) {
            var handle = this.options.handle && $(this.options.handle, this.element).length ? !1 : !0;
            return $(this.options.handle, this.element).find("*").andSelf().each(function() {
                this == event.target && (handle = !0)
            }), handle
        },
        _createHelper: function(event) {
            var o = this.options,
                helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event])) : "clone" == o.helper ? this.element.clone().removeAttr("id") : this.element;
            return helper.parents("body").length || helper.appendTo("parent" == o.appendTo ? this.element[0].parentNode : o.appendTo), helper[0] == this.element[0] || /(fixed|absolute)/.test(helper.css("position")) || helper.css("position", "absolute"), helper
        },
        _adjustOffsetFromHelper: function(obj) {
            "string" == typeof obj && (obj = obj.split(" ")), $.isArray(obj) && (obj = {
                left: +obj[0],
                top: +obj[1] || 0
            }), "left" in obj && (this.offset.click.left = obj.left + this.margins.left), "right" in obj && (this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left), "top" in obj && (this.offset.click.top = obj.top + this.margins.top), "bottom" in obj && (this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var po = this.offsetParent.offset();
            return "absolute" == this.cssPosition && this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (po.left += this.scrollParent.scrollLeft(), po.top += this.scrollParent.scrollTop()), (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && "html" == this.offsetParent[0].tagName.toLowerCase() && $.browser.msie) && (po = {
                top: 0,
                left: 0
            }), {
                top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" == this.cssPosition) {
                var p = this.element.position();
                return {
                    top: p.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: p.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var o = this.options;
            if ("parent" == o.containment && (o.containment = this.helper[0].parentNode), ("document" == o.containment || "window" == o.containment) && (this.containment = ["document" == o.containment ? 0 : $(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, "document" == o.containment ? 0 : $(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, ("document" == o.containment ? 0 : $(window).scrollLeft()) + $("document" == o.containment ? document : window).width() - this.helperProportions.width - this.margins.left, ("document" == o.containment ? 0 : $(window).scrollTop()) + ($("document" == o.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(o.containment) || o.containment.constructor == Array) o.containment.constructor == Array && (this.containment = o.containment);
            else {
                var c = $(o.containment),
                    ce = c[0];
                if (!ce) return;
                var over = (c.offset(), "hidden" != $(ce).css("overflow"));
                this.containment = [(parseInt($(ce).css("borderLeftWidth"), 10) || 0) + (parseInt($(ce).css("paddingLeft"), 10) || 0), (parseInt($(ce).css("borderTopWidth"), 10) || 0) + (parseInt($(ce).css("paddingTop"), 10) || 0), (over ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"), 10) || 0) - (parseInt($(ce).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (over ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"), 10) || 0) - (parseInt($(ce).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = c
            }
        },
        _convertPositionTo: function(d, pos) {
            pos || (pos = this.position);
            var mod = "absolute" == d ? 1 : -1,
                scroll = (this.options, "absolute" != this.cssPosition || this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent),
                scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);
            return {
                top: pos.top + this.offset.relative.top * mod + this.offset.parent.top * mod - ($.browser.safari && $.browser.version < 526 && "fixed" == this.cssPosition ? 0 : ("fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : scrollIsRootNode ? 0 : scroll.scrollTop()) * mod),
                left: pos.left + this.offset.relative.left * mod + this.offset.parent.left * mod - ($.browser.safari && $.browser.version < 526 && "fixed" == this.cssPosition ? 0 : ("fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft()) * mod)
            }
        },
        _generatePosition: function(event) {
            var o = this.options,
                scroll = "absolute" != this.cssPosition || this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName),
                pageX = event.pageX,
                pageY = event.pageY;
            if (this.originalPosition) {
                var containment;
                if (this.containment) {
                    if (this.relative_container) {
                        var co = this.relative_container.offset();
                        containment = [this.containment[0] + co.left, this.containment[1] + co.top, this.containment[2] + co.left, this.containment[3] + co.top]
                    } else containment = this.containment;
                    event.pageX - this.offset.click.left < containment[0] && (pageX = containment[0] + this.offset.click.left), event.pageY - this.offset.click.top < containment[1] && (pageY = containment[1] + this.offset.click.top), event.pageX - this.offset.click.left > containment[2] && (pageX = containment[2] + this.offset.click.left), event.pageY - this.offset.click.top > containment[3] && (pageY = containment[3] + this.offset.click.top)
                }
                if (o.grid) {
                    var top = o.grid[1] ? this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY;
                    pageY = containment ? top - this.offset.click.top < containment[1] || top - this.offset.click.top > containment[3] ? top - this.offset.click.top < containment[1] ? top + o.grid[1] : top - o.grid[1] : top : top;
                    var left = o.grid[0] ? this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX;
                    pageX = containment ? left - this.offset.click.left < containment[0] || left - this.offset.click.left > containment[2] ? left - this.offset.click.left < containment[0] ? left + o.grid[0] : left - o.grid[0] : left : left
                }
            }
            return {
                top: pageY - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ($.browser.safari && $.browser.version < 526 && "fixed" == this.cssPosition ? 0 : "fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : scrollIsRootNode ? 0 : scroll.scrollTop()),
                left: pageX - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ($.browser.safari && $.browser.version < 526 && "fixed" == this.cssPosition ? 0 : "fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft())
            }
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging"), this.helper[0] == this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
        },
        _trigger: function(type, event, ui) {
            return ui = ui || this._uiHash(), $.ui.plugin.call(this, type, [event, ui]), "drag" == type && (this.positionAbs = this._convertPositionTo("absolute")), $.Widget.prototype._trigger.call(this, type, event, ui)
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    }), $.extend($.ui.draggable, {
        version: "1.8.23"
    }), $.ui.plugin.add("draggable", "connectToSortable", {
        start: function(event, ui) {
            var inst = $(this).data("draggable"),
                o = inst.options,
                uiSortable = $.extend({}, ui, {
                    item: inst.element
                });
            inst.sortables = [], $(o.connectToSortable).each(function() {
                var sortable = $.data(this, "sortable");
                sortable && !sortable.options.disabled && (inst.sortables.push({
                    instance: sortable,
                    shouldRevert: sortable.options.revert
                }), sortable.refreshPositions(), sortable._trigger("activate", event, uiSortable))
            })
        },
        stop: function(event, ui) {
            var inst = $(this).data("draggable"),
                uiSortable = $.extend({}, ui, {
                    item: inst.element
                });
            $.each(inst.sortables, function() {
                this.instance.isOver ? (this.instance.isOver = 0, inst.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(event), this.instance.options.helper = this.instance.options._helper, "original" == inst.options.helper && this.instance.currentItem.css({
                    top: "auto",
                    left: "auto"
                })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", event, uiSortable))
            })
        },
        drag: function(event, ui) {
            var inst = $(this).data("draggable"),
                self = this;
            $.each(inst.sortables, function() {
                this.instance.positionAbs = inst.positionAbs, this.instance.helperProportions = inst.helperProportions, this.instance.offset.click = inst.offset.click, this.instance._intersectsWith(this.instance.containerCache) ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = $(self).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
                    return ui.helper[0]
                }, event.target = this.instance.currentItem[0], this.instance._mouseCapture(event, !0), this.instance._mouseStart(event, !0, !0), this.instance.offset.click.top = inst.offset.click.top, this.instance.offset.click.left = inst.offset.click.left, this.instance.offset.parent.left -= inst.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= inst.offset.parent.top - this.instance.offset.parent.top, inst._trigger("toSortable", event), inst.dropped = this.instance.element, inst.currentItem = inst.element, this.instance.fromOutside = inst), this.instance.currentItem && this.instance._mouseDrag(event)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", event, this.instance._uiHash(this.instance)), this.instance._mouseStop(event, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), inst._trigger("fromSortable", event), inst.dropped = !1)
            })
        }
    }), $.ui.plugin.add("draggable", "cursor", {
        start: function() {
            var t = $("body"),
                o = $(this).data("draggable").options;
            t.css("cursor") && (o._cursor = t.css("cursor")), t.css("cursor", o.cursor)
        },
        stop: function() {
            var o = $(this).data("draggable").options;
            o._cursor && $("body").css("cursor", o._cursor)
        }
    }), $.ui.plugin.add("draggable", "opacity", {
        start: function(event, ui) {
            var t = $(ui.helper),
                o = $(this).data("draggable").options;
            t.css("opacity") && (o._opacity = t.css("opacity")), t.css("opacity", o.opacity)
        },
        stop: function(event, ui) {
            var o = $(this).data("draggable").options;
            o._opacity && $(ui.helper).css("opacity", o._opacity)
        }
    }), $.ui.plugin.add("draggable", "scroll", {
        start: function() {
            var i = $(this).data("draggable");
            i.scrollParent[0] != document && "HTML" != i.scrollParent[0].tagName && (i.overflowOffset = i.scrollParent.offset())
        },
        drag: function(event) {
            var i = $(this).data("draggable"),
                o = i.options,
                scrolled = !1;
            i.scrollParent[0] != document && "HTML" != i.scrollParent[0].tagName ? (o.axis && "x" == o.axis || (i.overflowOffset.top + i.scrollParent[0].offsetHeight - event.pageY < o.scrollSensitivity ? i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop + o.scrollSpeed : event.pageY - i.overflowOffset.top < o.scrollSensitivity && (i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop - o.scrollSpeed)), o.axis && "y" == o.axis || (i.overflowOffset.left + i.scrollParent[0].offsetWidth - event.pageX < o.scrollSensitivity ? i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft + o.scrollSpeed : event.pageX - i.overflowOffset.left < o.scrollSensitivity && (i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft - o.scrollSpeed))) : (o.axis && "x" == o.axis || (event.pageY - $(document).scrollTop() < o.scrollSensitivity ? scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed) : $(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity && (scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed))), o.axis && "y" == o.axis || (event.pageX - $(document).scrollLeft() < o.scrollSensitivity ? scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed) : $(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity && (scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed)))), scrolled !== !1 && $.ui.ddmanager && !o.dropBehaviour && $.ui.ddmanager.prepareOffsets(i, event)
        }
    }), $.ui.plugin.add("draggable", "snap", {
        start: function() {
            var i = $(this).data("draggable"),
                o = i.options;
            i.snapElements = [], $(o.snap.constructor != String ? o.snap.items || ":data(draggable)" : o.snap).each(function() {
                var $t = $(this),
                    $o = $t.offset();
                this != i.element[0] && i.snapElements.push({
                    item: this,
                    width: $t.outerWidth(),
                    height: $t.outerHeight(),
                    top: $o.top,
                    left: $o.left
                })
            })
        },
        drag: function(event, ui) {
            for (var inst = $(this).data("draggable"), o = inst.options, d = o.snapTolerance, x1 = ui.offset.left, x2 = x1 + inst.helperProportions.width, y1 = ui.offset.top, y2 = y1 + inst.helperProportions.height, i = inst.snapElements.length - 1; i >= 0; i--) {
                var l = inst.snapElements[i].left,
                    r = l + inst.snapElements[i].width,
                    t = inst.snapElements[i].top,
                    b = t + inst.snapElements[i].height;
                if (x1 > l - d && r + d > x1 && y1 > t - d && b + d > y1 || x1 > l - d && r + d > x1 && y2 > t - d && b + d > y2 || x2 > l - d && r + d > x2 && y1 > t - d && b + d > y1 || x2 > l - d && r + d > x2 && y2 > t - d && b + d > y2) {
                    if ("inner" != o.snapMode) {
                        var ts = Math.abs(t - y2) <= d,
                            bs = Math.abs(b - y1) <= d,
                            ls = Math.abs(l - x2) <= d,
                            rs = Math.abs(r - x1) <= d;
                        ts && (ui.position.top = inst._convertPositionTo("relative", {
                            top: t - inst.helperProportions.height,
                            left: 0
                        }).top - inst.margins.top), bs && (ui.position.top = inst._convertPositionTo("relative", {
                            top: b,
                            left: 0
                        }).top - inst.margins.top), ls && (ui.position.left = inst._convertPositionTo("relative", {
                            top: 0,
                            left: l - inst.helperProportions.width
                        }).left - inst.margins.left), rs && (ui.position.left = inst._convertPositionTo("relative", {
                            top: 0,
                            left: r
                        }).left - inst.margins.left)
                    }
                    var first = ts || bs || ls || rs;
                    if ("outer" != o.snapMode) {
                        var ts = Math.abs(t - y1) <= d,
                            bs = Math.abs(b - y2) <= d,
                            ls = Math.abs(l - x1) <= d,
                            rs = Math.abs(r - x2) <= d;
                        ts && (ui.position.top = inst._convertPositionTo("relative", {
                            top: t,
                            left: 0
                        }).top - inst.margins.top), bs && (ui.position.top = inst._convertPositionTo("relative", {
                            top: b - inst.helperProportions.height,
                            left: 0
                        }).top - inst.margins.top), ls && (ui.position.left = inst._convertPositionTo("relative", {
                            top: 0,
                            left: l
                        }).left - inst.margins.left), rs && (ui.position.left = inst._convertPositionTo("relative", {
                            top: 0,
                            left: r - inst.helperProportions.width
                        }).left - inst.margins.left)
                    }!inst.snapElements[i].snapping && (ts || bs || ls || rs || first) && inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), {
                        snapItem: inst.snapElements[i].item
                    })), inst.snapElements[i].snapping = ts || bs || ls || rs || first
                } else inst.snapElements[i].snapping && inst.options.snap.release && inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), {
                    snapItem: inst.snapElements[i].item
                })), inst.snapElements[i].snapping = !1
            }
        }
    }), $.ui.plugin.add("draggable", "stack", {
        start: function() {
            var o = $(this).data("draggable").options,
                group = $.makeArray($(o.stack)).sort(function(a, b) {
                    return (parseInt($(a).css("zIndex"), 10) || 0) - (parseInt($(b).css("zIndex"), 10) || 0)
                });
            if (group.length) {
                var min = parseInt(group[0].style.zIndex) || 0;
                $(group).each(function(i) {
                    this.style.zIndex = min + i
                }), this[0].style.zIndex = min + group.length
            }
        }
    }), $.ui.plugin.add("draggable", "zIndex", {
        start: function(event, ui) {
            var t = $(ui.helper),
                o = $(this).data("draggable").options;
            t.css("zIndex") && (o._zIndex = t.css("zIndex")), t.css("zIndex", o.zIndex)
        },
        stop: function(event, ui) {
            var o = $(this).data("draggable").options;
            o._zIndex && $(ui.helper).css("zIndex", o._zIndex)
        }
    })
}(jQuery),
function($) {
    $.widget("ui.droppable", {
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: !1,
            addClasses: !0,
            greedy: !1,
            hoverClass: !1,
            scope: "default",
            tolerance: "intersect"
        },
        _create: function() {
            var o = this.options,
                accept = o.accept;
            this.isover = 0, this.isout = 1, this.accept = $.isFunction(accept) ? accept : function(d) {
                return d.is(accept)
            }, this.proportions = {
                width: this.element[0].offsetWidth,
                height: this.element[0].offsetHeight
            }, $.ui.ddmanager.droppables[o.scope] = $.ui.ddmanager.droppables[o.scope] || [], $.ui.ddmanager.droppables[o.scope].push(this), o.addClasses && this.element.addClass("ui-droppable")
        },
        destroy: function() {
            for (var drop = $.ui.ddmanager.droppables[this.options.scope], i = 0; i < drop.length; i++) drop[i] == this && drop.splice(i, 1);
            return this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable"), this
        },
        _setOption: function(key, value) {
            "accept" == key && (this.accept = $.isFunction(value) ? value : function(d) {
                return d.is(value)
            }), $.Widget.prototype._setOption.apply(this, arguments)
        },
        _activate: function(event) {
            var draggable = $.ui.ddmanager.current;
            this.options.activeClass && this.element.addClass(this.options.activeClass), draggable && this._trigger("activate", event, this.ui(draggable))
        },
        _deactivate: function(event) {
            var draggable = $.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass), draggable && this._trigger("deactivate", event, this.ui(draggable))
        },
        _over: function(event) {
            var draggable = $.ui.ddmanager.current;
            draggable && (draggable.currentItem || draggable.element)[0] != this.element[0] && this.accept.call(this.element[0], draggable.currentItem || draggable.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", event, this.ui(draggable)))
        },
        _out: function(event) {
            var draggable = $.ui.ddmanager.current;
            draggable && (draggable.currentItem || draggable.element)[0] != this.element[0] && this.accept.call(this.element[0], draggable.currentItem || draggable.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", event, this.ui(draggable)))
        },
        _drop: function(event, custom) {
            var draggable = custom || $.ui.ddmanager.current;
            if (!draggable || (draggable.currentItem || draggable.element)[0] == this.element[0]) return !1;
            var childrenIntersection = !1;
            return this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function() {
                var inst = $.data(this, "droppable");
                return inst.options.greedy && !inst.options.disabled && inst.options.scope == draggable.options.scope && inst.accept.call(inst.element[0], draggable.currentItem || draggable.element) && $.ui.intersect(draggable, $.extend(inst, {
                    offset: inst.element.offset()
                }), inst.options.tolerance) ? (childrenIntersection = !0, !1) : void 0
            }), childrenIntersection ? !1 : this.accept.call(this.element[0], draggable.currentItem || draggable.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", event, this.ui(draggable)), this.element) : !1
        },
        ui: function(c) {
            return {
                draggable: c.currentItem || c.element,
                helper: c.helper,
                position: c.position,
                offset: c.positionAbs
            }
        }
    }), $.extend($.ui.droppable, {
        version: "1.8.23"
    }), $.ui.intersect = function(draggable, droppable, toleranceMode) {
        if (!droppable.offset) return !1;
        var x1 = (draggable.positionAbs || draggable.position.absolute).left,
            x2 = x1 + draggable.helperProportions.width,
            y1 = (draggable.positionAbs || draggable.position.absolute).top,
            y2 = y1 + draggable.helperProportions.height,
            l = droppable.offset.left,
            r = l + droppable.proportions.width,
            t = droppable.offset.top,
            b = t + droppable.proportions.height;
        switch (toleranceMode) {
            case "fit":
                return x1 >= l && r >= x2 && y1 >= t && b >= y2;
            case "intersect":
                return l < x1 + draggable.helperProportions.width / 2 && x2 - draggable.helperProportions.width / 2 < r && t < y1 + draggable.helperProportions.height / 2 && y2 - draggable.helperProportions.height / 2 < b;
            case "pointer":
                var draggableLeft = (draggable.positionAbs || draggable.position.absolute).left + (draggable.clickOffset || draggable.offset.click).left,
                    draggableTop = (draggable.positionAbs || draggable.position.absolute).top + (draggable.clickOffset || draggable.offset.click).top,
                    isOver = $.ui.isOver(draggableTop, draggableLeft, t, l, droppable.proportions.height, droppable.proportions.width);
                return isOver;
            case "touch":
                return (y1 >= t && b >= y1 || y2 >= t && b >= y2 || t > y1 && y2 > b) && (x1 >= l && r >= x1 || x2 >= l && r >= x2 || l > x1 && x2 > r);
            default:
                return !1
        }
    }, $.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function(t, event) {
            var m = $.ui.ddmanager.droppables[t.options.scope] || [],
                type = event ? event.type : null,
                list = (t.currentItem || t.element).find(":data(droppable)").andSelf();
            droppablesLoop: for (var i = 0; i < m.length; i++)
                if (!(m[i].options.disabled || t && !m[i].accept.call(m[i].element[0], t.currentItem || t.element))) {
                    for (var j = 0; j < list.length; j++)
                        if (list[j] == m[i].element[0]) {
                            m[i].proportions.height = 0;
                            continue droppablesLoop
                        }
                    m[i].visible = "none" != m[i].element.css("display"), m[i].visible && ("mousedown" == type && m[i]._activate.call(m[i], event), m[i].offset = m[i].element.offset(), m[i].proportions = {
                        width: m[i].element[0].offsetWidth,
                        height: m[i].element[0].offsetHeight
                    })
                }
        },
        drop: function(draggable, event) {
            var dropped = !1;
            return $.each($.ui.ddmanager.droppables[draggable.options.scope] || [], function() {
                this.options && (!this.options.disabled && this.visible && $.ui.intersect(draggable, this, this.options.tolerance) && (dropped = this._drop.call(this, event) || dropped), !this.options.disabled && this.visible && this.accept.call(this.element[0], draggable.currentItem || draggable.element) && (this.isout = 1, this.isover = 0, this._deactivate.call(this, event)))
            }), dropped
        },
        dragStart: function(draggable, event) {
            draggable.element.parents(":not(body,html)").bind("scroll.droppable", function() {
                draggable.options.refreshPositions || $.ui.ddmanager.prepareOffsets(draggable, event)
            })
        },
        drag: function(draggable, event) {
            draggable.options.refreshPositions && $.ui.ddmanager.prepareOffsets(draggable, event), $.each($.ui.ddmanager.droppables[draggable.options.scope] || [], function() {
                if (!this.options.disabled && !this.greedyChild && this.visible) {
                    var intersects = $.ui.intersect(draggable, this, this.options.tolerance),
                        c = intersects || 1 != this.isover ? intersects && 0 == this.isover ? "isover" : null : "isout";
                    if (c) {
                        var parentInstance;
                        if (this.options.greedy) {
                            var parent = this.element.parents(":data(droppable):eq(0)");
                            parent.length && (parentInstance = $.data(parent[0], "droppable"), parentInstance.greedyChild = "isover" == c ? 1 : 0)
                        }
                        parentInstance && "isover" == c && (parentInstance.isover = 0, parentInstance.isout = 1, parentInstance._out.call(parentInstance, event)), this[c] = 1, this["isout" == c ? "isover" : "isout"] = 0, this["isover" == c ? "_over" : "_out"].call(this, event), parentInstance && "isout" == c && (parentInstance.isout = 0, parentInstance.isover = 1, parentInstance._over.call(parentInstance, event))
                    }
                }
            })
        },
        dragStop: function(draggable, event) {
            draggable.element.parents(":not(body,html)").unbind("scroll.droppable"), draggable.options.refreshPositions || $.ui.ddmanager.prepareOffsets(draggable, event)
        }
    }
}(jQuery),
function($) {
    $.widget("ui.resizable", $.ui.mouse, {
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 1e3
        },
        _create: function() {
            var self = this,
                o = this.options;
            if (this.element.addClass("ui-resizable"), $.extend(this, {
                    _aspectRatio: !!o.aspectRatio,
                    aspectRatio: o.aspectRatio,
                    originalElement: this.element,
                    _proportionallyResizeElements: [],
                    _helper: o.helper || o.ghost || o.animate ? o.helper || "ui-resizable-helper" : null
                }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap($('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                })), this.element = this.element.parent().data("resizable", this.element.data("resizable")), this.elementIsWrapper = !0, this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                }), this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                })), this.originalElement.css({
                    margin: this.originalElement.css("margin")
                }), this._proportionallyResize()), this.handles = o.handles || ($(".ui-resizable-handle", this.element).length ? {
                    n: ".ui-resizable-n",
                    e: ".ui-resizable-e",
                    s: ".ui-resizable-s",
                    w: ".ui-resizable-w",
                    se: ".ui-resizable-se",
                    sw: ".ui-resizable-sw",
                    ne: ".ui-resizable-ne",
                    nw: ".ui-resizable-nw"
                } : "e,s,se"), this.handles.constructor == String) {
                "all" == this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw");
                var n = this.handles.split(",");
                this.handles = {};
                for (var i = 0; i < n.length; i++) {
                    var handle = $.trim(n[i]),
                        hname = "ui-resizable-" + handle,
                        axis = $('<div class="ui-resizable-handle ' + hname + '"></div>');
                    axis.css({
                        zIndex: o.zIndex
                    }), "se" == handle && axis.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[handle] = ".ui-resizable-" + handle, this.element.append(axis)
                }
            }
            this._renderAxis = function(target) {
                target = target || this.element;
                for (var i in this.handles) {
                    if (this.handles[i].constructor == String && (this.handles[i] = $(this.handles[i], this.element).show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                        var axis = $(this.handles[i], this.element),
                            padWrapper = 0;
                        padWrapper = /sw|ne|nw|se|n|s/.test(i) ? axis.outerHeight() : axis.outerWidth();
                        var padPos = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join("");
                        target.css(padPos, padWrapper), this._proportionallyResize()
                    }
                    $(this.handles[i]).length
                }
            }, this._renderAxis(this.element), this._handles = $(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function() {
                if (!self.resizing) {
                    if (this.className) var axis = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
                    self.axis = axis && axis[1] ? axis[1] : "se"
                }
            }), o.autoHide && (this._handles.hide(), $(this.element).addClass("ui-resizable-autohide").hover(function() {
                o.disabled || ($(this).removeClass("ui-resizable-autohide"), self._handles.show())
            }, function() {
                o.disabled || self.resizing || ($(this).addClass("ui-resizable-autohide"), self._handles.hide())
            })), this._mouseInit()
        },
        destroy: function() {
            this._mouseDestroy();
            var _destroy = function(exp) {
                $(exp).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            if (this.elementIsWrapper) {
                _destroy(this.element);
                var wrapper = this.element;
                wrapper.after(this.originalElement.css({
                    position: wrapper.css("position"),
                    width: wrapper.outerWidth(),
                    height: wrapper.outerHeight(),
                    top: wrapper.css("top"),
                    left: wrapper.css("left")
                })).remove()
            }
            return this.originalElement.css("resize", this.originalResizeStyle), _destroy(this.originalElement), this
        },
        _mouseCapture: function(event) {
            var handle = !1;
            for (var i in this.handles) $(this.handles[i])[0] == event.target && (handle = !0);
            return !this.options.disabled && handle
        },
        _mouseStart: function(event) {
            var o = this.options,
                iniPos = this.element.position(),
                el = this.element;
            this.resizing = !0, this.documentScroll = {
                top: $(document).scrollTop(),
                left: $(document).scrollLeft()
            }, (el.is(".ui-draggable") || /absolute/.test(el.css("position"))) && el.css({
                position: "absolute",
                top: iniPos.top,
                left: iniPos.left
            }), this._renderProxy();
            var curleft = num(this.helper.css("left")),
                curtop = num(this.helper.css("top"));
            o.containment && (curleft += $(o.containment).scrollLeft() || 0, curtop += $(o.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                left: curleft,
                top: curtop
            }, this.size = this._helper ? {
                width: el.outerWidth(),
                height: el.outerHeight()
            } : {
                width: el.width(),
                height: el.height()
            }, this.originalSize = this._helper ? {
                width: el.outerWidth(),
                height: el.outerHeight()
            } : {
                width: el.width(),
                height: el.height()
            }, this.originalPosition = {
                left: curleft,
                top: curtop
            }, this.sizeDiff = {
                width: el.outerWidth() - el.width(),
                height: el.outerHeight() - el.height()
            }, this.originalMousePosition = {
                left: event.pageX,
                top: event.pageY
            }, this.aspectRatio = "number" == typeof o.aspectRatio ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
            var cursor = $(".ui-resizable-" + this.axis).css("cursor");
            return $("body").css("cursor", "auto" == cursor ? this.axis + "-resize" : cursor), el.addClass("ui-resizable-resizing"), this._propagate("start", event), !0
        },
        _mouseDrag: function(event) {
            var el = this.helper,
                smp = (this.options, this.originalMousePosition),
                a = this.axis,
                dx = event.pageX - smp.left || 0,
                dy = event.pageY - smp.top || 0,
                trigger = this._change[a];
            if (!trigger) return !1; {
                var data = trigger.apply(this, [event, dx, dy]);
                $.browser.msie && $.browser.version < 7, this.sizeDiff
            }
            return this._updateVirtualBoundaries(event.shiftKey), (this._aspectRatio || event.shiftKey) && (data = this._updateRatio(data, event)), data = this._respectSize(data, event), this._propagate("resize", event), el.css({
                top: this.position.top + "px",
                left: this.position.left + "px",
                width: this.size.width + "px",
                height: this.size.height + "px"
            }), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), this._updateCache(data), this._trigger("resize", event, this.ui()), !1
        },
        _mouseStop: function(event) {
            this.resizing = !1;
            var o = this.options,
                self = this;
            if (this._helper) {
                var pr = this._proportionallyResizeElements,
                    ista = pr.length && /textarea/i.test(pr[0].nodeName),
                    soffseth = ista && $.ui.hasScroll(pr[0], "left") ? 0 : self.sizeDiff.height,
                    soffsetw = ista ? 0 : self.sizeDiff.width,
                    s = {
                        width: self.helper.width() - soffsetw,
                        height: self.helper.height() - soffseth
                    },
                    left = parseInt(self.element.css("left"), 10) + (self.position.left - self.originalPosition.left) || null,
                    top = parseInt(self.element.css("top"), 10) + (self.position.top - self.originalPosition.top) || null;
                o.animate || this.element.css($.extend(s, {
                    top: top,
                    left: left
                })), self.helper.height(self.size.height), self.helper.width(self.size.width), this._helper && !o.animate && this._proportionallyResize()
            }
            return $("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", event), this._helper && this.helper.remove(), !1
        },
        _updateVirtualBoundaries: function(forceAspectRatio) {
            var pMinWidth, pMaxWidth, pMinHeight, pMaxHeight, b, o = this.options;
            b = {
                minWidth: isNumber(o.minWidth) ? o.minWidth : 0,
                maxWidth: isNumber(o.maxWidth) ? o.maxWidth : 1 / 0,
                minHeight: isNumber(o.minHeight) ? o.minHeight : 0,
                maxHeight: isNumber(o.maxHeight) ? o.maxHeight : 1 / 0
            }, (this._aspectRatio || forceAspectRatio) && (pMinWidth = b.minHeight * this.aspectRatio, pMinHeight = b.minWidth / this.aspectRatio, pMaxWidth = b.maxHeight * this.aspectRatio, pMaxHeight = b.maxWidth / this.aspectRatio, pMinWidth > b.minWidth && (b.minWidth = pMinWidth), pMinHeight > b.minHeight && (b.minHeight = pMinHeight), pMaxWidth < b.maxWidth && (b.maxWidth = pMaxWidth), pMaxHeight < b.maxHeight && (b.maxHeight = pMaxHeight)), this._vBoundaries = b
        },
        _updateCache: function(data) {
            this.options;
            this.offset = this.helper.offset(), isNumber(data.left) && (this.position.left = data.left), isNumber(data.top) && (this.position.top = data.top), isNumber(data.height) && (this.size.height = data.height), isNumber(data.width) && (this.size.width = data.width)
        },
        _updateRatio: function(data) {
            var cpos = (this.options, this.position),
                csize = this.size,
                a = this.axis;
            return isNumber(data.height) ? data.width = data.height * this.aspectRatio : isNumber(data.width) && (data.height = data.width / this.aspectRatio), "sw" == a && (data.left = cpos.left + (csize.width - data.width), data.top = null), "nw" == a && (data.top = cpos.top + (csize.height - data.height), data.left = cpos.left + (csize.width - data.width)), data
        },
        _respectSize: function(data, event) {
            var o = (this.helper, this._vBoundaries),
                a = (this._aspectRatio || event.shiftKey, this.axis),
                ismaxw = isNumber(data.width) && o.maxWidth && o.maxWidth < data.width,
                ismaxh = isNumber(data.height) && o.maxHeight && o.maxHeight < data.height,
                isminw = isNumber(data.width) && o.minWidth && o.minWidth > data.width,
                isminh = isNumber(data.height) && o.minHeight && o.minHeight > data.height;
            isminw && (data.width = o.minWidth), isminh && (data.height = o.minHeight), ismaxw && (data.width = o.maxWidth), ismaxh && (data.height = o.maxHeight);
            var dw = this.originalPosition.left + this.originalSize.width,
                dh = this.position.top + this.size.height,
                cw = /sw|nw|w/.test(a),
                ch = /nw|ne|n/.test(a);
            isminw && cw && (data.left = dw - o.minWidth), ismaxw && cw && (data.left = dw - o.maxWidth), isminh && ch && (data.top = dh - o.minHeight), ismaxh && ch && (data.top = dh - o.maxHeight);
            var isNotwh = !data.width && !data.height;
            return isNotwh && !data.left && data.top ? data.top = null : isNotwh && !data.top && data.left && (data.left = null), data
        },
        _proportionallyResize: function() {
            this.options;
            if (this._proportionallyResizeElements.length)
                for (var element = this.helper || this.element, i = 0; i < this._proportionallyResizeElements.length; i++) {
                    var prel = this._proportionallyResizeElements[i];
                    if (!this.borderDif) {
                        var b = [prel.css("borderTopWidth"), prel.css("borderRightWidth"), prel.css("borderBottomWidth"), prel.css("borderLeftWidth")],
                            p = [prel.css("paddingTop"), prel.css("paddingRight"), prel.css("paddingBottom"), prel.css("paddingLeft")];
                        this.borderDif = $.map(b, function(v, i) {
                            var border = parseInt(v, 10) || 0,
                                padding = parseInt(p[i], 10) || 0;
                            return border + padding
                        })
                    }
                    $.browser.msie && ($(element).is(":hidden") || $(element).parents(":hidden").length) || prel.css({
                        height: element.height() - this.borderDif[0] - this.borderDif[2] || 0,
                        width: element.width() - this.borderDif[1] - this.borderDif[3] || 0
                    })
                }
        },
        _renderProxy: function() {
            var el = this.element,
                o = this.options;
            if (this.elementOffset = el.offset(), this._helper) {
                this.helper = this.helper || $('<div style="overflow:hidden;"></div>');
                var ie6 = $.browser.msie && $.browser.version < 7,
                    ie6offset = ie6 ? 1 : 0,
                    pxyoffset = ie6 ? 2 : -1;
                this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() + pxyoffset,
                    height: this.element.outerHeight() + pxyoffset,
                    position: "absolute",
                    left: this.elementOffset.left - ie6offset + "px",
                    top: this.elementOffset.top - ie6offset + "px",
                    zIndex: ++o.zIndex
                }), this.helper.appendTo("body").disableSelection()
            } else this.helper = this.element
        },
        _change: {
            e: function(event, dx) {
                return {
                    width: this.originalSize.width + dx
                }
            },
            w: function(event, dx) {
                var cs = (this.options, this.originalSize),
                    sp = this.originalPosition;
                return {
                    left: sp.left + dx,
                    width: cs.width - dx
                }
            },
            n: function(event, dx, dy) {
                var cs = (this.options, this.originalSize),
                    sp = this.originalPosition;
                return {
                    top: sp.top + dy,
                    height: cs.height - dy
                }
            },
            s: function(event, dx, dy) {
                return {
                    height: this.originalSize.height + dy
                }
            },
            se: function(event, dx, dy) {
                return $.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [event, dx, dy]))
            },
            sw: function(event, dx, dy) {
                return $.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [event, dx, dy]))
            },
            ne: function(event, dx, dy) {
                return $.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [event, dx, dy]))
            },
            nw: function(event, dx, dy) {
                return $.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [event, dx, dy]))
            }
        },
        _propagate: function(n, event) {
            $.ui.plugin.call(this, n, [event, this.ui()]), "resize" != n && this._trigger(n, event, this.ui())
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    }), $.extend($.ui.resizable, {
        version: "1.8.23"
    }), $.ui.plugin.add("resizable", "alsoResize", {
        start: function() {
            var self = $(this).data("resizable"),
                o = self.options,
                _store = function(exp) {
                    $(exp).each(function() {
                        var el = $(this);
                        el.data("resizable-alsoresize", {
                            width: parseInt(el.width(), 10),
                            height: parseInt(el.height(), 10),
                            left: parseInt(el.css("left"), 10),
                            top: parseInt(el.css("top"), 10)
                        })
                    })
                };
            "object" != typeof o.alsoResize || o.alsoResize.parentNode ? _store(o.alsoResize) : o.alsoResize.length ? (o.alsoResize = o.alsoResize[0], _store(o.alsoResize)) : $.each(o.alsoResize, function(exp) {
                _store(exp)
            })
        },
        resize: function(event, ui) {
            var self = $(this).data("resizable"),
                o = self.options,
                os = self.originalSize,
                op = self.originalPosition,
                delta = {
                    height: self.size.height - os.height || 0,
                    width: self.size.width - os.width || 0,
                    top: self.position.top - op.top || 0,
                    left: self.position.left - op.left || 0
                },
                _alsoResize = function(exp, c) {
                    $(exp).each(function() {
                        var el = $(this),
                            start = $(this).data("resizable-alsoresize"),
                            style = {},
                            css = c && c.length ? c : el.parents(ui.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                        $.each(css, function(i, prop) {
                            var sum = (start[prop] || 0) + (delta[prop] || 0);
                            sum && sum >= 0 && (style[prop] = sum || null)
                        }), el.css(style)
                    })
                };
            "object" != typeof o.alsoResize || o.alsoResize.nodeType ? _alsoResize(o.alsoResize) : $.each(o.alsoResize, function(exp, c) {
                _alsoResize(exp, c)
            })
        },
        stop: function() {
            $(this).removeData("resizable-alsoresize")
        }
    }), $.ui.plugin.add("resizable", "animate", {
        stop: function(event) {
            var self = $(this).data("resizable"),
                o = self.options,
                pr = self._proportionallyResizeElements,
                ista = pr.length && /textarea/i.test(pr[0].nodeName),
                soffseth = ista && $.ui.hasScroll(pr[0], "left") ? 0 : self.sizeDiff.height,
                soffsetw = ista ? 0 : self.sizeDiff.width,
                style = {
                    width: self.size.width - soffsetw,
                    height: self.size.height - soffseth
                },
                left = parseInt(self.element.css("left"), 10) + (self.position.left - self.originalPosition.left) || null,
                top = parseInt(self.element.css("top"), 10) + (self.position.top - self.originalPosition.top) || null;
            self.element.animate($.extend(style, top && left ? {
                top: top,
                left: left
            } : {}), {
                duration: o.animateDuration,
                easing: o.animateEasing,
                step: function() {
                    var data = {
                        width: parseInt(self.element.css("width"), 10),
                        height: parseInt(self.element.css("height"), 10),
                        top: parseInt(self.element.css("top"), 10),
                        left: parseInt(self.element.css("left"), 10)
                    };
                    pr && pr.length && $(pr[0]).css({
                        width: data.width,
                        height: data.height
                    }), self._updateCache(data), self._propagate("resize", event)
                }
            })
        }
    }), $.ui.plugin.add("resizable", "containment", {
        start: function() {
            var self = $(this).data("resizable"),
                o = self.options,
                el = self.element,
                oc = o.containment,
                ce = oc instanceof $ ? oc.get(0) : /parent/.test(oc) ? el.parent().get(0) : oc;
            if (ce)
                if (self.containerElement = $(ce), /document/.test(oc) || oc == document) self.containerOffset = {
                    left: 0,
                    top: 0
                }, self.containerPosition = {
                    left: 0,
                    top: 0
                }, self.parentData = {
                    element: $(document),
                    left: 0,
                    top: 0,
                    width: $(document).width(),
                    height: $(document).height() || document.body.parentNode.scrollHeight
                };
                else {
                    var element = $(ce),
                        p = [];
                    $(["Top", "Right", "Left", "Bottom"]).each(function(i, name) {
                        p[i] = num(element.css("padding" + name))
                    }), self.containerOffset = element.offset(), self.containerPosition = element.position(), self.containerSize = {
                        height: element.innerHeight() - p[3],
                        width: element.innerWidth() - p[1]
                    };
                    var co = self.containerOffset,
                        ch = self.containerSize.height,
                        cw = self.containerSize.width,
                        width = $.ui.hasScroll(ce, "left") ? ce.scrollWidth : cw,
                        height = $.ui.hasScroll(ce) ? ce.scrollHeight : ch;
                    self.parentData = {
                        element: ce,
                        left: co.left,
                        top: co.top,
                        width: width,
                        height: height
                    }
                }
        },
        resize: function(event) {
            var self = $(this).data("resizable"),
                o = self.options,
                co = (self.containerSize, self.containerOffset),
                cp = (self.size, self.position),
                pRatio = self._aspectRatio || event.shiftKey,
                cop = {
                    top: 0,
                    left: 0
                },
                ce = self.containerElement;
            ce[0] != document && /static/.test(ce.css("position")) && (cop = co), cp.left < (self._helper ? co.left : 0) && (self.size.width = self.size.width + (self._helper ? self.position.left - co.left : self.position.left - cop.left), pRatio && (self.size.height = self.size.width / self.aspectRatio), self.position.left = o.helper ? co.left : 0), cp.top < (self._helper ? co.top : 0) && (self.size.height = self.size.height + (self._helper ? self.position.top - co.top : self.position.top), pRatio && (self.size.width = self.size.height * self.aspectRatio), self.position.top = self._helper ? co.top : 0), self.offset.left = self.parentData.left + self.position.left, self.offset.top = self.parentData.top + self.position.top;
            var woset = Math.abs((self._helper ? self.offset.left - cop.left : self.offset.left - cop.left) + self.sizeDiff.width),
                hoset = Math.abs((self._helper ? self.offset.top - cop.top : self.offset.top - co.top) + self.sizeDiff.height),
                isParent = self.containerElement.get(0) == self.element.parent().get(0),
                isOffsetRelative = /relative|absolute/.test(self.containerElement.css("position"));
            isParent && isOffsetRelative && (woset -= self.parentData.left), woset + self.size.width >= self.parentData.width && (self.size.width = self.parentData.width - woset, pRatio && (self.size.height = self.size.width / self.aspectRatio)), hoset + self.size.height >= self.parentData.height && (self.size.height = self.parentData.height - hoset, pRatio && (self.size.width = self.size.height * self.aspectRatio))
        },
        stop: function() {
            var self = $(this).data("resizable"),
                o = self.options,
                co = (self.position, self.containerOffset),
                cop = self.containerPosition,
                ce = self.containerElement,
                helper = $(self.helper),
                ho = helper.offset(),
                w = helper.outerWidth() - self.sizeDiff.width,
                h = helper.outerHeight() - self.sizeDiff.height;
            self._helper && !o.animate && /relative/.test(ce.css("position")) && $(this).css({
                left: ho.left - cop.left - co.left,
                width: w,
                height: h
            }), self._helper && !o.animate && /static/.test(ce.css("position")) && $(this).css({
                left: ho.left - cop.left - co.left,
                width: w,
                height: h
            })
        }
    }), $.ui.plugin.add("resizable", "ghost", {
        start: function() {
            var self = $(this).data("resizable"),
                o = self.options,
                cs = self.size;
            self.ghost = self.originalElement.clone(), self.ghost.css({
                opacity: .25,
                display: "block",
                position: "relative",
                height: cs.height,
                width: cs.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass("string" == typeof o.ghost ? o.ghost : ""), self.ghost.appendTo(self.helper)
        },
        resize: function() {
            {
                var self = $(this).data("resizable");
                self.options
            }
            self.ghost && self.ghost.css({
                position: "relative",
                height: self.size.height,
                width: self.size.width
            })
        },
        stop: function() {
            {
                var self = $(this).data("resizable");
                self.options
            }
            self.ghost && self.helper && self.helper.get(0).removeChild(self.ghost.get(0))
        }
    }), $.ui.plugin.add("resizable", "grid", {
        resize: function(event) {
            {
                var self = $(this).data("resizable"),
                    o = self.options,
                    cs = self.size,
                    os = self.originalSize,
                    op = self.originalPosition,
                    a = self.axis;
                o._aspectRatio || event.shiftKey
            }
            o.grid = "number" == typeof o.grid ? [o.grid, o.grid] : o.grid;
            var ox = Math.round((cs.width - os.width) / (o.grid[0] || 1)) * (o.grid[0] || 1),
                oy = Math.round((cs.height - os.height) / (o.grid[1] || 1)) * (o.grid[1] || 1);
            /^(se|s|e)$/.test(a) ? (self.size.width = os.width + ox, self.size.height = os.height + oy) : /^(ne)$/.test(a) ? (self.size.width = os.width + ox, self.size.height = os.height + oy, self.position.top = op.top - oy) : /^(sw)$/.test(a) ? (self.size.width = os.width + ox, self.size.height = os.height + oy, self.position.left = op.left - ox) : (self.size.width = os.width + ox, self.size.height = os.height + oy, self.position.top = op.top - oy, self.position.left = op.left - ox)
        }
    });
    var num = function(v) {
            return parseInt(v, 10) || 0
        },
        isNumber = function(value) {
            return !isNaN(parseInt(value, 10))
        }
}(jQuery),
function($) {
    $.widget("ui.selectable", $.ui.mouse, {
        options: {
            appendTo: "body",
            autoRefresh: !0,
            distance: 0,
            filter: "*",
            tolerance: "touch"
        },
        _create: function() {
            var self = this;
            this.element.addClass("ui-selectable"), this.dragged = !1;
            var selectees;
            this.refresh = function() {
                selectees = $(self.options.filter, self.element[0]), selectees.addClass("ui-selectee"), selectees.each(function() {
                    var $this = $(this),
                        pos = $this.offset();
                    $.data(this, "selectable-item", {
                        element: this,
                        $element: $this,
                        left: pos.left,
                        top: pos.top,
                        right: pos.left + $this.outerWidth(),
                        bottom: pos.top + $this.outerHeight(),
                        startselected: !1,
                        selected: $this.hasClass("ui-selected"),
                        selecting: $this.hasClass("ui-selecting"),
                        unselecting: $this.hasClass("ui-unselecting")
                    })
                })
            }, this.refresh(), this.selectees = selectees.addClass("ui-selectee"), this._mouseInit(), this.helper = $("<div class='ui-selectable-helper'></div>")
        },
        destroy: function() {
            return this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable"), this._mouseDestroy(), this
        },
        _mouseStart: function(event) {
            var self = this;
            if (this.opos = [event.pageX, event.pageY], !this.options.disabled) {
                var options = this.options;
                this.selectees = $(options.filter, this.element[0]), this._trigger("start", event), $(options.appendTo).append(this.helper), this.helper.css({
                    left: event.clientX,
                    top: event.clientY,
                    width: 0,
                    height: 0
                }), options.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
                    var selectee = $.data(this, "selectable-item");
                    selectee.startselected = !0, event.metaKey || event.ctrlKey || (selectee.$element.removeClass("ui-selected"), selectee.selected = !1, selectee.$element.addClass("ui-unselecting"), selectee.unselecting = !0, self._trigger("unselecting", event, {
                        unselecting: selectee.element
                    }))
                }), $(event.target).parents().andSelf().each(function() {
                    var selectee = $.data(this, "selectable-item");
                    if (selectee) {
                        var doSelect = !event.metaKey && !event.ctrlKey || !selectee.$element.hasClass("ui-selected");
                        return selectee.$element.removeClass(doSelect ? "ui-unselecting" : "ui-selected").addClass(doSelect ? "ui-selecting" : "ui-unselecting"), selectee.unselecting = !doSelect, selectee.selecting = doSelect, selectee.selected = doSelect, doSelect ? self._trigger("selecting", event, {
                            selecting: selectee.element
                        }) : self._trigger("unselecting", event, {
                            unselecting: selectee.element
                        }), !1
                    }
                })
            }
        },
        _mouseDrag: function(event) {
            var self = this;
            if (this.dragged = !0, !this.options.disabled) {
                var options = this.options,
                    x1 = this.opos[0],
                    y1 = this.opos[1],
                    x2 = event.pageX,
                    y2 = event.pageY;
                if (x1 > x2) {
                    var tmp = x2;
                    x2 = x1, x1 = tmp
                }
                if (y1 > y2) {
                    var tmp = y2;
                    y2 = y1, y1 = tmp
                }
                return this.helper.css({
                    left: x1,
                    top: y1,
                    width: x2 - x1,
                    height: y2 - y1
                }), this.selectees.each(function() {
                    var selectee = $.data(this, "selectable-item");
                    if (selectee && selectee.element != self.element[0]) {
                        var hit = !1;
                        "touch" == options.tolerance ? hit = !(selectee.left > x2 || selectee.right < x1 || selectee.top > y2 || selectee.bottom < y1) : "fit" == options.tolerance && (hit = selectee.left > x1 && selectee.right < x2 && selectee.top > y1 && selectee.bottom < y2), hit ? (selectee.selected && (selectee.$element.removeClass("ui-selected"), selectee.selected = !1), selectee.unselecting && (selectee.$element.removeClass("ui-unselecting"), selectee.unselecting = !1), selectee.selecting || (selectee.$element.addClass("ui-selecting"), selectee.selecting = !0, self._trigger("selecting", event, {
                            selecting: selectee.element
                        }))) : (selectee.selecting && ((event.metaKey || event.ctrlKey) && selectee.startselected ? (selectee.$element.removeClass("ui-selecting"), selectee.selecting = !1, selectee.$element.addClass("ui-selected"), selectee.selected = !0) : (selectee.$element.removeClass("ui-selecting"), selectee.selecting = !1, selectee.startselected && (selectee.$element.addClass("ui-unselecting"), selectee.unselecting = !0), self._trigger("unselecting", event, {
                            unselecting: selectee.element
                        }))), selectee.selected && (event.metaKey || event.ctrlKey || selectee.startselected || (selectee.$element.removeClass("ui-selected"), selectee.selected = !1, selectee.$element.addClass("ui-unselecting"), selectee.unselecting = !0, self._trigger("unselecting", event, {
                            unselecting: selectee.element
                        }))))
                    }
                }), !1
            }
        },
        _mouseStop: function(event) {
            var self = this;
            this.dragged = !1;
            this.options;
            return $(".ui-unselecting", this.element[0]).each(function() {
                var selectee = $.data(this, "selectable-item");
                selectee.$element.removeClass("ui-unselecting"), selectee.unselecting = !1, selectee.startselected = !1, self._trigger("unselected", event, {
                    unselected: selectee.element
                })
            }), $(".ui-selecting", this.element[0]).each(function() {
                var selectee = $.data(this, "selectable-item");
                selectee.$element.removeClass("ui-selecting").addClass("ui-selected"), selectee.selecting = !1, selectee.selected = !0, selectee.startselected = !0, self._trigger("selected", event, {
                    selected: selectee.element
                })
            }), this._trigger("stop", event), this.helper.remove(), !1
        }
    }), $.extend($.ui.selectable, {
        version: "1.8.23"
    })
}(jQuery),
function($) {
    $.widget("ui.sortable", $.ui.mouse, {
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "> *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1e3
        },
        _create: function() {
            var o = this.options;
            this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? "x" === o.axis || /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display")) : !1, this.offset = this.element.offset(), this._mouseInit(), this.ready = !0
        },
        destroy: function() {
            $.Widget.prototype.destroy.call(this), this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
            for (var i = this.items.length - 1; i >= 0; i--) this.items[i].item.removeData(this.widgetName + "-item");
            return this
        },
        _setOption: function(key, value) {
            "disabled" === key ? (this.options[key] = value, this.widget()[value ? "addClass" : "removeClass"]("ui-sortable-disabled")) : $.Widget.prototype._setOption.apply(this, arguments)
        },
        _mouseCapture: function(event, overrideHandle) {
            var that = this;
            if (this.reverting) return !1;
            if (this.options.disabled || "static" == this.options.type) return !1;
            this._refreshItems(event); {
                var currentItem = null,
                    self = this;
                $(event.target).parents().each(function() {
                    return $.data(this, that.widgetName + "-item") == self ? (currentItem = $(this), !1) : void 0
                })
            }
            if ($.data(event.target, that.widgetName + "-item") == self && (currentItem = $(event.target)), !currentItem) return !1;
            if (this.options.handle && !overrideHandle) {
                var validHandle = !1;
                if ($(this.options.handle, currentItem).find("*").andSelf().each(function() {
                        this == event.target && (validHandle = !0)
                    }), !validHandle) return !1
            }
            return this.currentItem = currentItem, this._removeCurrentsFromItems(), !0
        },
        _mouseStart: function(event, overrideHandle, noActivation) {
            var o = this.options,
                self = this;
            if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(event), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                    top: this.offset.top - this.margins.top,
                    left: this.offset.left - this.margins.left
                }, $.extend(this.offset, {
                    click: {
                        left: event.pageX - this.offset.left,
                        top: event.pageY - this.offset.top
                    },
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(event), this.originalPageX = event.pageX, this.originalPageY = event.pageY, o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt), this.domPosition = {
                    prev: this.currentItem.prev()[0],
                    parent: this.currentItem.parent()[0]
                }, this.helper[0] != this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), o.containment && this._setContainment(), o.cursor && ($("body").css("cursor") && (this._storedCursor = $("body").css("cursor")), $("body").css("cursor", o.cursor)), o.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", o.opacity)), o.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", o.zIndex)), this.scrollParent[0] != document && "HTML" != this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", event, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !noActivation)
                for (var i = this.containers.length - 1; i >= 0; i--) this.containers[i]._trigger("activate", event, self._uiHash(this));
            return $.ui.ddmanager && ($.ui.ddmanager.current = this), $.ui.ddmanager && !o.dropBehaviour && $.ui.ddmanager.prepareOffsets(this, event), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(event), !0
        },
        _mouseDrag: function(event) {
            if (this.position = this._generatePosition(event), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll) {
                var o = this.options,
                    scrolled = !1;
                this.scrollParent[0] != document && "HTML" != this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - event.pageY < o.scrollSensitivity ? this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop + o.scrollSpeed : event.pageY - this.overflowOffset.top < o.scrollSensitivity && (this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop - o.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - event.pageX < o.scrollSensitivity ? this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft + o.scrollSpeed : event.pageX - this.overflowOffset.left < o.scrollSensitivity && (this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft - o.scrollSpeed)) : (event.pageY - $(document).scrollTop() < o.scrollSensitivity ? scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed) : $(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity && (scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed)), event.pageX - $(document).scrollLeft() < o.scrollSensitivity ? scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed) : $(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity && (scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed))), scrolled !== !1 && $.ui.ddmanager && !o.dropBehaviour && $.ui.ddmanager.prepareOffsets(this, event)
            }
            this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" == this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" == this.options.axis || (this.helper[0].style.top = this.position.top + "px");
            for (var i = this.items.length - 1; i >= 0; i--) {
                var item = this.items[i],
                    itemElement = item.item[0],
                    intersection = this._intersectsWithPointer(item);
                if (intersection && itemElement != this.currentItem[0] && this.placeholder[1 == intersection ? "next" : "prev"]()[0] != itemElement && !$.ui.contains(this.placeholder[0], itemElement) && ("semi-dynamic" == this.options.type ? !$.ui.contains(this.element[0], itemElement) : !0)) {
                    if (this.direction = 1 == intersection ? "down" : "up", "pointer" != this.options.tolerance && !this._intersectsWithSides(item)) break;
                    this._rearrange(event, item), this._trigger("change", event, this._uiHash());
                    break
                }
            }
            return this._contactContainers(event), $.ui.ddmanager && $.ui.ddmanager.drag(this, event), this._trigger("sort", event, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
        },
        _mouseStop: function(event, noPropagation) {
            if (event) {
                if ($.ui.ddmanager && !this.options.dropBehaviour && $.ui.ddmanager.drop(this, event), this.options.revert) {
                    var self = this,
                        cur = self.placeholder.offset();
                    self.reverting = !0, $(this.helper).animate({
                        left: cur.left - this.offset.parent.left - self.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
                        top: cur.top - this.offset.parent.top - self.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
                    }, parseInt(this.options.revert, 10) || 500, function() {
                        self._clear(event)
                    })
                } else this._clear(event, noPropagation);
                return !1
            }
        },
        cancel: function() {
            var self = this;
            if (this.dragging) {
                this._mouseUp({
                    target: null
                }), "original" == this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var i = this.containers.length - 1; i >= 0; i--) this.containers[i]._trigger("deactivate", null, self._uiHash(this)), this.containers[i].containerCache.over && (this.containers[i]._trigger("out", null, self._uiHash(this)), this.containers[i].containerCache.over = 0)
            }
            return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" != this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), $.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }), this.domPosition.prev ? $(this.domPosition.prev).after(this.currentItem) : $(this.domPosition.parent).prepend(this.currentItem)), this
        },
        serialize: function(o) {
            var items = this._getItemsAsjQuery(o && o.connected),
                str = [];
            return o = o || {}, $(items).each(function() {
                var res = ($(o.item || this).attr(o.attribute || "id") || "").match(o.expression || /(.+)[-=_](.+)/);
                res && str.push((o.key || res[1] + "[]") + "=" + (o.key && o.expression ? res[1] : res[2]))
            }), !str.length && o.key && str.push(o.key + "="), str.join("&")
        },
        toArray: function(o) {
            var items = this._getItemsAsjQuery(o && o.connected),
                ret = [];
            return o = o || {}, items.each(function() {
                ret.push($(o.item || this).attr(o.attribute || "id") || "")
            }), ret
        },
        _intersectsWith: function(item) {
            var x1 = this.positionAbs.left,
                x2 = x1 + this.helperProportions.width,
                y1 = this.positionAbs.top,
                y2 = y1 + this.helperProportions.height,
                l = item.left,
                r = l + item.width,
                t = item.top,
                b = t + item.height,
                dyClick = this.offset.click.top,
                dxClick = this.offset.click.left,
                isOverElement = y1 + dyClick > t && b > y1 + dyClick && x1 + dxClick > l && r > x1 + dxClick;
            return "pointer" == this.options.tolerance || this.options.forcePointerForContainers || "pointer" != this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > item[this.floating ? "width" : "height"] ? isOverElement : l < x1 + this.helperProportions.width / 2 && x2 - this.helperProportions.width / 2 < r && t < y1 + this.helperProportions.height / 2 && y2 - this.helperProportions.height / 2 < b
        },
        _intersectsWithPointer: function(item) {
            var isOverElementHeight = "x" === this.options.axis || $.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, item.top, item.height),
                isOverElementWidth = "y" === this.options.axis || $.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, item.left, item.width),
                isOverElement = isOverElementHeight && isOverElementWidth,
                verticalDirection = this._getDragVerticalDirection(),
                horizontalDirection = this._getDragHorizontalDirection();
            return isOverElement ? this.floating ? horizontalDirection && "right" == horizontalDirection || "down" == verticalDirection ? 2 : 1 : verticalDirection && ("down" == verticalDirection ? 2 : 1) : !1
        },
        _intersectsWithSides: function(item) {
            var isOverBottomHalf = $.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, item.top + item.height / 2, item.height),
                isOverRightHalf = $.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, item.left + item.width / 2, item.width),
                verticalDirection = this._getDragVerticalDirection(),
                horizontalDirection = this._getDragHorizontalDirection();
            return this.floating && horizontalDirection ? "right" == horizontalDirection && isOverRightHalf || "left" == horizontalDirection && !isOverRightHalf : verticalDirection && ("down" == verticalDirection && isOverBottomHalf || "up" == verticalDirection && !isOverBottomHalf)
        },
        _getDragVerticalDirection: function() {
            var delta = this.positionAbs.top - this.lastPositionAbs.top;
            return 0 != delta && (delta > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function() {
            var delta = this.positionAbs.left - this.lastPositionAbs.left;
            return 0 != delta && (delta > 0 ? "right" : "left")
        },
        refresh: function(event) {
            return this._refreshItems(event), this.refreshPositions(), this
        },
        _connectWith: function() {
            var options = this.options;
            return options.connectWith.constructor == String ? [options.connectWith] : options.connectWith
        },
        _getItemsAsjQuery: function(connected) {
            var items = [],
                queries = [],
                connectWith = this._connectWith();
            if (connectWith && connected)
                for (var i = connectWith.length - 1; i >= 0; i--)
                    for (var cur = $(connectWith[i]), j = cur.length - 1; j >= 0; j--) {
                        var inst = $.data(cur[j], this.widgetName);
                        inst && inst != this && !inst.options.disabled && queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element) : $(inst.options.items, inst.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), inst])
                    }
            queries.push([$.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : $(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
            for (var i = queries.length - 1; i >= 0; i--) queries[i][0].each(function() {
                items.push(this)
            });
            return $(items)
        },
        _removeCurrentsFromItems: function() {
            for (var list = this.currentItem.find(":data(" + this.widgetName + "-item)"), i = 0; i < this.items.length; i++)
                for (var j = 0; j < list.length; j++) list[j] == this.items[i].item[0] && this.items.splice(i, 1)
        },
        _refreshItems: function(event) {
            this.items = [], this.containers = [this];
            var items = this.items,
                queries = [
                    [$.isFunction(this.options.items) ? this.options.items.call(this.element[0], event, {
                        item: this.currentItem
                    }) : $(this.options.items, this.element), this]
                ],
                connectWith = this._connectWith();
            if (connectWith && this.ready)
                for (var i = connectWith.length - 1; i >= 0; i--)
                    for (var cur = $(connectWith[i]), j = cur.length - 1; j >= 0; j--) {
                        var inst = $.data(cur[j], this.widgetName);
                        inst && inst != this && !inst.options.disabled && (queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element[0], event, {
                            item: this.currentItem
                        }) : $(inst.options.items, inst.element), inst]), this.containers.push(inst))
                    }
            for (var i = queries.length - 1; i >= 0; i--)
                for (var targetData = queries[i][1], _queries = queries[i][0], j = 0, queriesLength = _queries.length; queriesLength > j; j++) {
                    var item = $(_queries[j]);
                    item.data(this.widgetName + "-item", targetData), items.push({
                        item: item,
                        instance: targetData,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
                }
        },
        refreshPositions: function(fast) {
            this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
            for (var i = this.items.length - 1; i >= 0; i--) {
                var item = this.items[i];
                if (item.instance == this.currentContainer || !this.currentContainer || item.item[0] == this.currentItem[0]) {
                    var t = this.options.toleranceElement ? $(this.options.toleranceElement, item.item) : item.item;
                    fast || (item.width = t.outerWidth(), item.height = t.outerHeight());
                    var p = t.offset();
                    item.left = p.left, item.top = p.top
                }
            }
            if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
            else
                for (var i = this.containers.length - 1; i >= 0; i--) {
                    var p = this.containers[i].element.offset();
                    this.containers[i].containerCache.left = p.left, this.containers[i].containerCache.top = p.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight()
                }
            return this
        },
        _createPlaceholder: function(that) {
            var self = that || this,
                o = self.options;
            if (!o.placeholder || o.placeholder.constructor == String) {
                var className = o.placeholder;
                o.placeholder = {
                    element: function() {
                        var el = $(document.createElement(self.currentItem[0].nodeName)).addClass(className || self.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                        return className || (el.style.visibility = "hidden"), el
                    },
                    update: function(container, p) {
                        (!className || o.forcePlaceholderSize) && (p.height() || p.height(self.currentItem.innerHeight() - parseInt(self.currentItem.css("paddingTop") || 0, 10) - parseInt(self.currentItem.css("paddingBottom") || 0, 10)), p.width() || p.width(self.currentItem.innerWidth() - parseInt(self.currentItem.css("paddingLeft") || 0, 10) - parseInt(self.currentItem.css("paddingRight") || 0, 10)))
                    }
                }
            }
            self.placeholder = $(o.placeholder.element.call(self.element, self.currentItem)), self.currentItem.after(self.placeholder), o.placeholder.update(self, self.placeholder)
        },
        _contactContainers: function(event) {
            for (var innermostContainer = null, innermostIndex = null, i = this.containers.length - 1; i >= 0; i--)
                if (!$.ui.contains(this.currentItem[0], this.containers[i].element[0]))
                    if (this._intersectsWith(this.containers[i].containerCache)) {
                        if (innermostContainer && $.ui.contains(this.containers[i].element[0], innermostContainer.element[0])) continue;
                        innermostContainer = this.containers[i], innermostIndex = i
                    } else this.containers[i].containerCache.over && (this.containers[i]._trigger("out", event, this._uiHash(this)), this.containers[i].containerCache.over = 0);
            if (innermostContainer)
                if (1 === this.containers.length) this.containers[innermostIndex]._trigger("over", event, this._uiHash(this)), this.containers[innermostIndex].containerCache.over = 1;
                else if (this.currentContainer != this.containers[innermostIndex]) {
                for (var dist = 1e4, itemWithLeastDistance = null, base = this.positionAbs[this.containers[innermostIndex].floating ? "left" : "top"], j = this.items.length - 1; j >= 0; j--)
                    if ($.ui.contains(this.containers[innermostIndex].element[0], this.items[j].item[0])) {
                        var cur = this.containers[innermostIndex].floating ? this.items[j].item.offset().left : this.items[j].item.offset().top;
                        Math.abs(cur - base) < dist && (dist = Math.abs(cur - base), itemWithLeastDistance = this.items[j], this.direction = cur - base > 0 ? "down" : "up")
                    }
                if (!itemWithLeastDistance && !this.options.dropOnEmpty) return;
                this.currentContainer = this.containers[innermostIndex], itemWithLeastDistance ? this._rearrange(event, itemWithLeastDistance, null, !0) : this._rearrange(event, null, this.containers[innermostIndex].element, !0), this._trigger("change", event, this._uiHash()), this.containers[innermostIndex]._trigger("change", event, this._uiHash(this)), this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[innermostIndex]._trigger("over", event, this._uiHash(this)), this.containers[innermostIndex].containerCache.over = 1
            }
        },
        _createHelper: function(event) {
            var o = this.options,
                helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event, this.currentItem])) : "clone" == o.helper ? this.currentItem.clone() : this.currentItem;
            return helper.parents("body").length || $("parent" != o.appendTo ? o.appendTo : this.currentItem[0].parentNode)[0].appendChild(helper[0]), helper[0] == this.currentItem[0] && (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            }), ("" == helper[0].style.width || o.forceHelperSize) && helper.width(this.currentItem.width()), ("" == helper[0].style.height || o.forceHelperSize) && helper.height(this.currentItem.height()), helper
        },
        _adjustOffsetFromHelper: function(obj) {
            "string" == typeof obj && (obj = obj.split(" ")), $.isArray(obj) && (obj = {
                left: +obj[0],
                top: +obj[1] || 0
            }), "left" in obj && (this.offset.click.left = obj.left + this.margins.left), "right" in obj && (this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left), "top" in obj && (this.offset.click.top = obj.top + this.margins.top), "bottom" in obj && (this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var po = this.offsetParent.offset();
            return "absolute" == this.cssPosition && this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (po.left += this.scrollParent.scrollLeft(), po.top += this.scrollParent.scrollTop()), (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && "html" == this.offsetParent[0].tagName.toLowerCase() && $.browser.msie) && (po = {
                top: 0,
                left: 0
            }), {
                top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" == this.cssPosition) {
                var p = this.currentItem.position();
                return {
                    top: p.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: p.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var o = this.options;
            if ("parent" == o.containment && (o.containment = this.helper[0].parentNode), ("document" == o.containment || "window" == o.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, $("document" == o.containment ? document : window).width() - this.helperProportions.width - this.margins.left, ($("document" == o.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), !/^(document|window|parent)$/.test(o.containment)) {
                var ce = $(o.containment)[0],
                    co = $(o.containment).offset(),
                    over = "hidden" != $(ce).css("overflow");
                this.containment = [co.left + (parseInt($(ce).css("borderLeftWidth"), 10) || 0) + (parseInt($(ce).css("paddingLeft"), 10) || 0) - this.margins.left, co.top + (parseInt($(ce).css("borderTopWidth"), 10) || 0) + (parseInt($(ce).css("paddingTop"), 10) || 0) - this.margins.top, co.left + (over ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"), 10) || 0) - (parseInt($(ce).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, co.top + (over ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"), 10) || 0) - (parseInt($(ce).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },
        _convertPositionTo: function(d, pos) {
            pos || (pos = this.position);
            var mod = "absolute" == d ? 1 : -1,
                scroll = (this.options, "absolute" != this.cssPosition || this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent),
                scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);
            return {
                top: pos.top + this.offset.relative.top * mod + this.offset.parent.top * mod - ($.browser.safari && "fixed" == this.cssPosition ? 0 : ("fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : scrollIsRootNode ? 0 : scroll.scrollTop()) * mod),
                left: pos.left + this.offset.relative.left * mod + this.offset.parent.left * mod - ($.browser.safari && "fixed" == this.cssPosition ? 0 : ("fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft()) * mod)
            }
        },
        _generatePosition: function(event) {
            var o = this.options,
                scroll = "absolute" != this.cssPosition || this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);
            "relative" != this.cssPosition || this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset());
            var pageX = event.pageX,
                pageY = event.pageY;
            if (this.originalPosition && (this.containment && (event.pageX - this.offset.click.left < this.containment[0] && (pageX = this.containment[0] + this.offset.click.left), event.pageY - this.offset.click.top < this.containment[1] && (pageY = this.containment[1] + this.offset.click.top), event.pageX - this.offset.click.left > this.containment[2] && (pageX = this.containment[2] + this.offset.click.left), event.pageY - this.offset.click.top > this.containment[3] && (pageY = this.containment[3] + this.offset.click.top)), o.grid)) {
                var top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];
                pageY = this.containment ? top - this.offset.click.top < this.containment[1] || top - this.offset.click.top > this.containment[3] ? top - this.offset.click.top < this.containment[1] ? top + o.grid[1] : top - o.grid[1] : top : top;
                var left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];
                pageX = this.containment ? left - this.offset.click.left < this.containment[0] || left - this.offset.click.left > this.containment[2] ? left - this.offset.click.left < this.containment[0] ? left + o.grid[0] : left - o.grid[0] : left : left
            }
            return {
                top: pageY - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ($.browser.safari && "fixed" == this.cssPosition ? 0 : "fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : scrollIsRootNode ? 0 : scroll.scrollTop()),
                left: pageX - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ($.browser.safari && "fixed" == this.cssPosition ? 0 : "fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft())
            }
        },
        _rearrange: function(event, i, a, hardRefresh) {
            a ? a[0].appendChild(this.placeholder[0]) : i.item[0].parentNode.insertBefore(this.placeholder[0], "down" == this.direction ? i.item[0] : i.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
            var self = this,
                counter = this.counter;
            window.setTimeout(function() {
                counter == self.counter && self.refreshPositions(!hardRefresh)
            }, 0)
        },
        _clear: function(event, noPropagation) {
            this.reverting = !1;
            var delayedTriggers = [];
            if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] == this.currentItem[0]) {
                for (var i in this._storedCSS)("auto" == this._storedCSS[i] || "static" == this._storedCSS[i]) && (this._storedCSS[i] = "");
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else this.currentItem.show();
            if (this.fromOutside && !noPropagation && delayedTriggers.push(function(event) {
                    this._trigger("receive", event, this._uiHash(this.fromOutside))
                }), !this.fromOutside && this.domPosition.prev == this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent == this.currentItem.parent()[0] || noPropagation || delayedTriggers.push(function(event) {
                    this._trigger("update", event, this._uiHash())
                }), !$.ui.contains(this.element[0], this.currentItem[0])) {
                noPropagation || delayedTriggers.push(function(event) {
                    this._trigger("remove", event, this._uiHash())
                });
                for (var i = this.containers.length - 1; i >= 0; i--) $.ui.contains(this.containers[i].element[0], this.currentItem[0]) && !noPropagation && (delayedTriggers.push(function(c) {
                    return function(event) {
                        c._trigger("receive", event, this._uiHash(this))
                    }
                }.call(this, this.containers[i])), delayedTriggers.push(function(c) {
                    return function(event) {
                        c._trigger("update", event, this._uiHash(this))
                    }
                }.call(this, this.containers[i])))
            }
            for (var i = this.containers.length - 1; i >= 0; i--) noPropagation || delayedTriggers.push(function(c) {
                return function(event) {
                    c._trigger("deactivate", event, this._uiHash(this))
                }
            }.call(this, this.containers[i])), this.containers[i].containerCache.over && (delayedTriggers.push(function(c) {
                return function(event) {
                    c._trigger("out", event, this._uiHash(this))
                }
            }.call(this, this.containers[i])), this.containers[i].containerCache.over = 0);
            if (this._storedCursor && $("body").css("cursor", this._storedCursor), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" == this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, this.cancelHelperRemoval) {
                if (!noPropagation) {
                    this._trigger("beforeStop", event, this._uiHash());
                    for (var i = 0; i < delayedTriggers.length; i++) delayedTriggers[i].call(this, event);
                    this._trigger("stop", event, this._uiHash())
                }
                return this.fromOutside = !1, !1
            }
            if (noPropagation || this._trigger("beforeStop", event, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] != this.currentItem[0] && this.helper.remove(), this.helper = null, !noPropagation) {
                for (var i = 0; i < delayedTriggers.length; i++) delayedTriggers[i].call(this, event);
                this._trigger("stop", event, this._uiHash())
            }
            return this.fromOutside = !1, !0
        },
        _trigger: function() {
            $.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
        },
        _uiHash: function(inst) {
            var self = inst || this;
            return {
                helper: self.helper,
                placeholder: self.placeholder || $([]),
                position: self.position,
                originalPosition: self.originalPosition,
                offset: self.positionAbs,
                item: self.currentItem,
                sender: inst ? inst.element : null
            }
        }
    }), $.extend($.ui.sortable, {
        version: "1.8.23"
    })
}(jQuery), jQuery.effects || function($, undefined) {
        function getRGB(color) {
            var result;
            return color && color.constructor == Array && 3 == color.length ? color : (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color)) ? [parseInt(result[1], 10), parseInt(result[2], 10), parseInt(result[3], 10)] : (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color)) ? [2.55 * parseFloat(result[1]), 2.55 * parseFloat(result[2]), 2.55 * parseFloat(result[3])] : (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color)) ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color)) ? [parseInt(result[1] + result[1], 16), parseInt(result[2] + result[2], 16), parseInt(result[3] + result[3], 16)] : (result = /rgba\(0, 0, 0, 0\)/.exec(color)) ? colors.transparent : colors[$.trim(color).toLowerCase()]
        }

        function getColor(elem, attr) {
            var color;
            do {
                if (color = ($.curCSS || $.css)(elem, attr), "" != color && "transparent" != color || $.nodeName(elem, "body")) break;
                attr = "backgroundColor"
            } while (elem = elem.parentNode);
            return getRGB(color)
        }

        function getElementStyles() {
            var key, camelCase, style = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle,
                newStyle = {};
            if (style && style.length && style[0] && style[style[0]])
                for (var len = style.length; len--;) key = style[len], "string" == typeof style[key] && (camelCase = key.replace(/\-(\w)/g, function(all, letter) {
                    return letter.toUpperCase()
                }), newStyle[camelCase] = style[key]);
            else
                for (key in style) "string" == typeof style[key] && (newStyle[key] = style[key]);
            return newStyle
        }

        function filterStyles(styles) {
            var name, value;
            for (name in styles) value = styles[name], (null == value || $.isFunction(value) || name in shorthandStyles || /scrollbar/.test(name) || !/color/i.test(name) && isNaN(parseFloat(value))) && delete styles[name];
            return styles
        }

        function styleDifference(oldStyle, newStyle) {
            var name, diff = {
                _: 0
            };
            for (name in newStyle) oldStyle[name] != newStyle[name] && (diff[name] = newStyle[name]);
            return diff
        }

        function _normalizeArguments(effect, options, speed, callback) {
            return "object" == typeof effect && (callback = options, speed = null, options = effect, effect = options.effect), $.isFunction(options) && (callback = options, speed = null, options = {}), ("number" == typeof options || $.fx.speeds[options]) && (callback = speed, speed = options, options = {}), $.isFunction(speed) && (callback = speed, speed = null), options = options || {}, speed = speed || options.duration, speed = $.fx.off ? 0 : "number" == typeof speed ? speed : speed in $.fx.speeds ? $.fx.speeds[speed] : $.fx.speeds._default, callback = callback || options.complete, [effect, options, speed, callback]
        }

        function standardSpeed(speed) {
            return !speed || "number" == typeof speed || $.fx.speeds[speed] ? !0 : "string" != typeof speed || $.effects[speed] ? !1 : !0
        }
        $.effects = {}, $.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderColor", "color", "outlineColor"], function(i, attr) {
            $.fx.step[attr] = function(fx) {
                fx.colorInit || (fx.start = getColor(fx.elem, attr), fx.end = getRGB(fx.end), fx.colorInit = !0), fx.elem.style[attr] = "rgb(" + Math.max(Math.min(parseInt(fx.pos * (fx.end[0] - fx.start[0]) + fx.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(fx.pos * (fx.end[1] - fx.start[1]) + fx.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(fx.pos * (fx.end[2] - fx.start[2]) + fx.start[2], 10), 255), 0) + ")"
            }
        });
        var colors = {
                aqua: [0, 255, 255],
                azure: [240, 255, 255],
                beige: [245, 245, 220],
                black: [0, 0, 0],
                blue: [0, 0, 255],
                brown: [165, 42, 42],
                cyan: [0, 255, 255],
                darkblue: [0, 0, 139],
                darkcyan: [0, 139, 139],
                darkgrey: [169, 169, 169],
                darkgreen: [0, 100, 0],
                darkkhaki: [189, 183, 107],
                darkmagenta: [139, 0, 139],
                darkolivegreen: [85, 107, 47],
                darkorange: [255, 140, 0],
                darkorchid: [153, 50, 204],
                darkred: [139, 0, 0],
                darksalmon: [233, 150, 122],
                darkviolet: [148, 0, 211],
                fuchsia: [255, 0, 255],
                gold: [255, 215, 0],
                green: [0, 128, 0],
                indigo: [75, 0, 130],
                khaki: [240, 230, 140],
                lightblue: [173, 216, 230],
                lightcyan: [224, 255, 255],
                lightgreen: [144, 238, 144],
                lightgrey: [211, 211, 211],
                lightpink: [255, 182, 193],
                lightyellow: [255, 255, 224],
                lime: [0, 255, 0],
                magenta: [255, 0, 255],
                maroon: [128, 0, 0],
                navy: [0, 0, 128],
                olive: [128, 128, 0],
                orange: [255, 165, 0],
                pink: [255, 192, 203],
                purple: [128, 0, 128],
                violet: [128, 0, 128],
                red: [255, 0, 0],
                silver: [192, 192, 192],
                white: [255, 255, 255],
                yellow: [255, 255, 0],
                transparent: [255, 255, 255]
            },
            classAnimationActions = ["add", "remove", "toggle"],
            shorthandStyles = {
                border: 1,
                borderBottom: 1,
                borderColor: 1,
                borderLeft: 1,
                borderRight: 1,
                borderTop: 1,
                borderWidth: 1,
                margin: 1,
                padding: 1
            };
        $.effects.animateClass = function(value, duration, easing, callback) {
            return $.isFunction(easing) && (callback = easing, easing = null), this.queue(function() {
                var newStyle, that = $(this),
                    originalStyleAttr = that.attr("style") || " ",
                    originalStyle = filterStyles(getElementStyles.call(this)),
                    className = that.attr("class") || "";
                $.each(classAnimationActions, function(i, action) {
                    value[action] && that[action + "Class"](value[action])
                }), newStyle = filterStyles(getElementStyles.call(this)), that.attr("class", className), that.animate(styleDifference(originalStyle, newStyle), {
                    queue: !1,
                    duration: duration,
                    easing: easing,
                    complete: function() {
                        $.each(classAnimationActions, function(i, action) {
                            value[action] && that[action + "Class"](value[action])
                        }), "object" == typeof that.attr("style") ? (that.attr("style").cssText = "", that.attr("style").cssText = originalStyleAttr) : that.attr("style", originalStyleAttr), callback && callback.apply(this, arguments), $.dequeue(this)
                    }
                })
            })
        }, $.fn.extend({
            _addClass: $.fn.addClass,
            addClass: function(classNames, speed, easing, callback) {
                return speed ? $.effects.animateClass.apply(this, [{
                    add: classNames
                }, speed, easing, callback]) : this._addClass(classNames)
            },
            _removeClass: $.fn.removeClass,
            removeClass: function(classNames, speed, easing, callback) {
                return speed ? $.effects.animateClass.apply(this, [{
                    remove: classNames
                }, speed, easing, callback]) : this._removeClass(classNames)
            },
            _toggleClass: $.fn.toggleClass,
            toggleClass: function(classNames, force, speed, easing, callback) {
                return "boolean" == typeof force || force === undefined ? speed ? $.effects.animateClass.apply(this, [force ? {
                    add: classNames
                } : {
                    remove: classNames
                }, speed, easing, callback]) : this._toggleClass(classNames, force) : $.effects.animateClass.apply(this, [{
                    toggle: classNames
                }, force, speed, easing])
            },
            switchClass: function(remove, add, speed, easing, callback) {
                return $.effects.animateClass.apply(this, [{
                    add: add,
                    remove: remove
                }, speed, easing, callback])
            }
        }), $.extend($.effects, {
            version: "1.8.23",
            save: function(element, set) {
                for (var i = 0; i < set.length; i++) null !== set[i] && element.data("ec.storage." + set[i], element[0].style[set[i]])
            },
            restore: function(element, set) {
                for (var i = 0; i < set.length; i++) null !== set[i] && element.css(set[i], element.data("ec.storage." + set[i]))
            },
            setMode: function(el, mode) {
                return "toggle" == mode && (mode = el.is(":hidden") ? "show" : "hide"), mode
            },
            getBaseline: function(origin, original) {
                var y, x;
                switch (origin[0]) {
                    case "top":
                        y = 0;
                        break;
                    case "middle":
                        y = .5;
                        break;
                    case "bottom":
                        y = 1;
                        break;
                    default:
                        y = origin[0] / original.height
                }
                switch (origin[1]) {
                    case "left":
                        x = 0;
                        break;
                    case "center":
                        x = .5;
                        break;
                    case "right":
                        x = 1;
                        break;
                    default:
                        x = origin[1] / original.width
                }
                return {
                    x: x,
                    y: y
                }
            },
            createWrapper: function(element) {
                if (element.parent().is(".ui-effects-wrapper")) return element.parent();
                var props = {
                        width: element.outerWidth(!0),
                        height: element.outerHeight(!0),
                        "float": element.css("float")
                    },
                    wrapper = $("<div></div>").addClass("ui-effects-wrapper").css({
                        fontSize: "100%",
                        background: "transparent",
                        border: "none",
                        margin: 0,
                        padding: 0
                    }),
                    active = document.activeElement;
                try {
                    active.id
                } catch (e) {
                    active = document.body
                }
                return element.wrap(wrapper), (element[0] === active || $.contains(element[0], active)) && $(active).focus(), wrapper = element.parent(), "static" == element.css("position") ? (wrapper.css({
                    position: "relative"
                }), element.css({
                    position: "relative"
                })) : ($.extend(props, {
                    position: element.css("position"),
                    zIndex: element.css("z-index")
                }), $.each(["top", "left", "bottom", "right"], function(i, pos) {
                    props[pos] = element.css(pos), isNaN(parseInt(props[pos], 10)) && (props[pos] = "auto")
                }), element.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto"
                })), wrapper.css(props).show()
            },
            removeWrapper: function(element) {
                var parent, active = document.activeElement;
                return element.parent().is(".ui-effects-wrapper") ? (parent = element.parent().replaceWith(element), (element[0] === active || $.contains(element[0], active)) && $(active).focus(), parent) : element
            },
            setTransition: function(element, list, factor, value) {
                return value = value || {}, $.each(list, function(i, x) {
                    var unit = element.cssUnit(x);
                    unit[0] > 0 && (value[x] = unit[0] * factor + unit[1])
                }), value
            }
        }), $.fn.extend({
            effect: function(effect) {
                var args = _normalizeArguments.apply(this, arguments),
                    args2 = {
                        options: args[1],
                        duration: args[2],
                        callback: args[3]
                    },
                    mode = args2.options.mode,
                    effectMethod = $.effects[effect];
                return $.fx.off || !effectMethod ? mode ? this[mode](args2.duration, args2.callback) : this.each(function() {
                    args2.callback && args2.callback.call(this)
                }) : effectMethod.call(this, args2)
            },
            _show: $.fn.show,
            show: function(speed) {
                if (standardSpeed(speed)) return this._show.apply(this, arguments);
                var args = _normalizeArguments.apply(this, arguments);
                return args[1].mode = "show", this.effect.apply(this, args)
            },
            _hide: $.fn.hide,
            hide: function(speed) {
                if (standardSpeed(speed)) return this._hide.apply(this, arguments);
                var args = _normalizeArguments.apply(this, arguments);
                return args[1].mode = "hide", this.effect.apply(this, args)
            },
            __toggle: $.fn.toggle,
            toggle: function(speed) {
                if (standardSpeed(speed) || "boolean" == typeof speed || $.isFunction(speed)) return this.__toggle.apply(this, arguments);
                var args = _normalizeArguments.apply(this, arguments);
                return args[1].mode = "toggle", this.effect.apply(this, args)
            },
            cssUnit: function(key) {
                var style = this.css(key),
                    val = [];
                return $.each(["em", "px", "%", "pt"], function(i, unit) {
                    style.indexOf(unit) > 0 && (val = [parseFloat(style), unit])
                }), val
            }
        });
        var baseEasings = {};
        $.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(i, name) {
            baseEasings[name] = function(p) {
                return Math.pow(p, i + 2)
            }
        }), $.extend(baseEasings, {
            Sine: function(p) {
                return 1 - Math.cos(p * Math.PI / 2)
            },
            Circ: function(p) {
                return 1 - Math.sqrt(1 - p * p)
            },
            Elastic: function(p) {
                return 0 === p || 1 === p ? p : -Math.pow(2, 8 * (p - 1)) * Math.sin((80 * (p - 1) - 7.5) * Math.PI / 15)
            },
            Back: function(p) {
                return p * p * (3 * p - 2)
            },
            Bounce: function(p) {
                for (var pow2, bounce = 4; p < ((pow2 = Math.pow(2, --bounce)) - 1) / 11;);
                return 1 / Math.pow(4, 3 - bounce) - 7.5625 * Math.pow((3 * pow2 - 2) / 22 - p, 2)
            }
        }), $.each(baseEasings, function(name, easeIn) {
            $.easing["easeIn" + name] = easeIn, $.easing["easeOut" + name] = function(p) {
                return 1 - easeIn(1 - p)
            }, $.easing["easeInOut" + name] = function(p) {
                return .5 > p ? easeIn(2 * p) / 2 : easeIn(-2 * p + 2) / -2 + 1
            }
        })
    }(jQuery),
    function($) {
        $.effects.blind = function(o) {
            return this.queue(function() {
                var el = $(this),
                    props = ["position", "top", "bottom", "left", "right"],
                    mode = $.effects.setMode(el, o.options.mode || "hide"),
                    direction = o.options.direction || "vertical";
                $.effects.save(el, props), el.show();
                var wrapper = $.effects.createWrapper(el).css({
                        overflow: "hidden"
                    }),
                    ref = "vertical" == direction ? "height" : "width",
                    distance = "vertical" == direction ? wrapper.height() : wrapper.width();
                "show" == mode && wrapper.css(ref, 0);
                var animation = {};
                animation[ref] = "show" == mode ? distance : 0, wrapper.animate(animation, o.duration, o.options.easing, function() {
                    "hide" == mode && el.hide(), $.effects.restore(el, props), $.effects.removeWrapper(el), o.callback && o.callback.apply(el[0], arguments), el.dequeue()
                })
            })
        }
    }(jQuery),
    function($) {
        $.effects.bounce = function(o) {
            return this.queue(function() {
                var el = $(this),
                    props = ["position", "top", "bottom", "left", "right"],
                    mode = $.effects.setMode(el, o.options.mode || "effect"),
                    direction = o.options.direction || "up",
                    distance = o.options.distance || 20,
                    times = o.options.times || 5,
                    speed = o.duration || 250;
                /show|hide/.test(mode) && props.push("opacity"), $.effects.save(el, props), el.show(), $.effects.createWrapper(el);
                var ref = "up" == direction || "down" == direction ? "top" : "left",
                    motion = "up" == direction || "left" == direction ? "pos" : "neg",
                    distance = o.options.distance || ("top" == ref ? el.outerHeight(!0) / 3 : el.outerWidth(!0) / 3);
                if ("show" == mode && el.css("opacity", 0).css(ref, "pos" == motion ? -distance : distance), "hide" == mode && (distance /= 2 * times), "hide" != mode && times--, "show" == mode) {
                    var animation = {
                        opacity: 1
                    };
                    animation[ref] = ("pos" == motion ? "+=" : "-=") + distance, el.animate(animation, speed / 2, o.options.easing), distance /= 2, times--
                }
                for (var i = 0; times > i; i++) {
                    var animation1 = {},
                        animation2 = {};
                    animation1[ref] = ("pos" == motion ? "-=" : "+=") + distance, animation2[ref] = ("pos" == motion ? "+=" : "-=") + distance, el.animate(animation1, speed / 2, o.options.easing).animate(animation2, speed / 2, o.options.easing), distance = "hide" == mode ? 2 * distance : distance / 2
                }
                if ("hide" == mode) {
                    var animation = {
                        opacity: 0
                    };
                    animation[ref] = ("pos" == motion ? "-=" : "+=") + distance, el.animate(animation, speed / 2, o.options.easing, function() {
                        el.hide(), $.effects.restore(el, props), $.effects.removeWrapper(el), o.callback && o.callback.apply(this, arguments)
                    })
                } else {
                    var animation1 = {},
                        animation2 = {};
                    animation1[ref] = ("pos" == motion ? "-=" : "+=") + distance, animation2[ref] = ("pos" == motion ? "+=" : "-=") + distance, el.animate(animation1, speed / 2, o.options.easing).animate(animation2, speed / 2, o.options.easing, function() {
                        $.effects.restore(el, props), $.effects.removeWrapper(el), o.callback && o.callback.apply(this, arguments)
                    })
                }
                el.queue("fx", function() {
                    el.dequeue()
                }), el.dequeue()
            })
        }
    }(jQuery),
    function($) {
        $.effects.clip = function(o) {
            return this.queue(function() {
                var el = $(this),
                    props = ["position", "top", "bottom", "left", "right", "height", "width"],
                    mode = $.effects.setMode(el, o.options.mode || "hide"),
                    direction = o.options.direction || "vertical";
                $.effects.save(el, props), el.show();
                var wrapper = $.effects.createWrapper(el).css({
                        overflow: "hidden"
                    }),
                    animate = "IMG" == el[0].tagName ? wrapper : el,
                    ref = {
                        size: "vertical" == direction ? "height" : "width",
                        position: "vertical" == direction ? "top" : "left"
                    },
                    distance = "vertical" == direction ? animate.height() : animate.width();
                "show" == mode && (animate.css(ref.size, 0), animate.css(ref.position, distance / 2));
                var animation = {};
                animation[ref.size] = "show" == mode ? distance : 0, animation[ref.position] = "show" == mode ? 0 : distance / 2, animate.animate(animation, {
                    queue: !1,
                    duration: o.duration,
                    easing: o.options.easing,
                    complete: function() {
                        "hide" == mode && el.hide(), $.effects.restore(el, props), $.effects.removeWrapper(el), o.callback && o.callback.apply(el[0], arguments), el.dequeue()
                    }
                })
            })
        }
    }(jQuery),
    function($) {
        $.effects.drop = function(o) {
            return this.queue(function() {
                var el = $(this),
                    props = ["position", "top", "bottom", "left", "right", "opacity"],
                    mode = $.effects.setMode(el, o.options.mode || "hide"),
                    direction = o.options.direction || "left";
                $.effects.save(el, props), el.show(), $.effects.createWrapper(el);
                var ref = "up" == direction || "down" == direction ? "top" : "left",
                    motion = "up" == direction || "left" == direction ? "pos" : "neg",
                    distance = o.options.distance || ("top" == ref ? el.outerHeight(!0) / 2 : el.outerWidth(!0) / 2);
                "show" == mode && el.css("opacity", 0).css(ref, "pos" == motion ? -distance : distance);
                var animation = {
                    opacity: "show" == mode ? 1 : 0
                };
                animation[ref] = ("show" == mode ? "pos" == motion ? "+=" : "-=" : "pos" == motion ? "-=" : "+=") + distance, el.animate(animation, {
                    queue: !1,
                    duration: o.duration,
                    easing: o.options.easing,
                    complete: function() {
                        "hide" == mode && el.hide(), $.effects.restore(el, props), $.effects.removeWrapper(el), o.callback && o.callback.apply(this, arguments), el.dequeue()
                    }
                })
            })
        }
    }(jQuery),
    function($) {
        $.effects.explode = function(o) {
            return this.queue(function() {
                var rows = o.options.pieces ? Math.round(Math.sqrt(o.options.pieces)) : 3,
                    cells = o.options.pieces ? Math.round(Math.sqrt(o.options.pieces)) : 3;
                o.options.mode = "toggle" == o.options.mode ? $(this).is(":visible") ? "hide" : "show" : o.options.mode;
                var el = $(this).show().css("visibility", "hidden"),
                    offset = el.offset();
                offset.top -= parseInt(el.css("marginTop"), 10) || 0, offset.left -= parseInt(el.css("marginLeft"), 10) || 0;
                for (var width = el.outerWidth(!0), height = el.outerHeight(!0), i = 0; rows > i; i++)
                    for (var j = 0; cells > j; j++) el.clone().appendTo("body").wrap("<div></div>").css({
                        position: "absolute",
                        visibility: "visible",
                        left: -j * (width / cells),
                        top: -i * (height / rows)
                    }).parent().addClass("ui-effects-explode").css({
                        position: "absolute",
                        overflow: "hidden",
                        width: width / cells,
                        height: height / rows,
                        left: offset.left + j * (width / cells) + ("show" == o.options.mode ? (j - Math.floor(cells / 2)) * (width / cells) : 0),
                        top: offset.top + i * (height / rows) + ("show" == o.options.mode ? (i - Math.floor(rows / 2)) * (height / rows) : 0),
                        opacity: "show" == o.options.mode ? 0 : 1
                    }).animate({
                        left: offset.left + j * (width / cells) + ("show" == o.options.mode ? 0 : (j - Math.floor(cells / 2)) * (width / cells)),
                        top: offset.top + i * (height / rows) + ("show" == o.options.mode ? 0 : (i - Math.floor(rows / 2)) * (height / rows)),
                        opacity: "show" == o.options.mode ? 1 : 0
                    }, o.duration || 500);
                setTimeout(function() {
                    "show" == o.options.mode ? el.css({
                        visibility: "visible"
                    }) : el.css({
                        visibility: "visible"
                    }).hide(), o.callback && o.callback.apply(el[0]), el.dequeue(), $("div.ui-effects-explode").remove()
                }, o.duration || 500)
            })
        }
    }(jQuery),
    function($) {
        $.effects.fade = function(o) {
            return this.queue(function() {
                var elem = $(this),
                    mode = $.effects.setMode(elem, o.options.mode || "hide");
                elem.animate({
                    opacity: mode
                }, {
                    queue: !1,
                    duration: o.duration,
                    easing: o.options.easing,
                    complete: function() {
                        o.callback && o.callback.apply(this, arguments), elem.dequeue()
                    }
                })
            })
        }
    }(jQuery),
    function($) {
        $.effects.fold = function(o) {
            return this.queue(function() {
                var el = $(this),
                    props = ["position", "top", "bottom", "left", "right"],
                    mode = $.effects.setMode(el, o.options.mode || "hide"),
                    size = o.options.size || 15,
                    horizFirst = !!o.options.horizFirst,
                    duration = o.duration ? o.duration / 2 : $.fx.speeds._default / 2;
                $.effects.save(el, props), el.show();
                var wrapper = $.effects.createWrapper(el).css({
                        overflow: "hidden"
                    }),
                    widthFirst = "show" == mode != horizFirst,
                    ref = widthFirst ? ["width", "height"] : ["height", "width"],
                    distance = widthFirst ? [wrapper.width(), wrapper.height()] : [wrapper.height(), wrapper.width()],
                    percent = /([0-9]+)%/.exec(size);
                percent && (size = parseInt(percent[1], 10) / 100 * distance["hide" == mode ? 0 : 1]), "show" == mode && wrapper.css(horizFirst ? {
                    height: 0,
                    width: size
                } : {
                    height: size,
                    width: 0
                });
                var animation1 = {},
                    animation2 = {};
                animation1[ref[0]] = "show" == mode ? distance[0] : size, animation2[ref[1]] = "show" == mode ? distance[1] : 0, wrapper.animate(animation1, duration, o.options.easing).animate(animation2, duration, o.options.easing, function() {
                    "hide" == mode && el.hide(), $.effects.restore(el, props), $.effects.removeWrapper(el), o.callback && o.callback.apply(el[0], arguments), el.dequeue()
                })
            })
        }
    }(jQuery),
    function($) {
        $.effects.highlight = function(o) {
            return this.queue(function() {
                var elem = $(this),
                    props = ["backgroundImage", "backgroundColor", "opacity"],
                    mode = $.effects.setMode(elem, o.options.mode || "show"),
                    animation = {
                        backgroundColor: elem.css("backgroundColor")
                    };
                "hide" == mode && (animation.opacity = 0), $.effects.save(elem, props), elem.show().css({
                    backgroundImage: "none",
                    backgroundColor: o.options.color || "#ffff99"
                }).animate(animation, {
                    queue: !1,
                    duration: o.duration,
                    easing: o.options.easing,
                    complete: function() {
                        "hide" == mode && elem.hide(), $.effects.restore(elem, props), "show" == mode && !$.support.opacity && this.style.removeAttribute("filter"), o.callback && o.callback.apply(this, arguments), elem.dequeue()
                    }
                })
            })
        }
    }(jQuery),
    function($) {
        $.effects.pulsate = function(o) {
            return this.queue(function() {
                var elem = $(this),
                    mode = $.effects.setMode(elem, o.options.mode || "show"),
                    times = 2 * (o.options.times || 5) - 1,
                    duration = o.duration ? o.duration / 2 : $.fx.speeds._default / 2,
                    isVisible = elem.is(":visible"),
                    animateTo = 0;
                isVisible || (elem.css("opacity", 0).show(), animateTo = 1), ("hide" == mode && isVisible || "show" == mode && !isVisible) && times--;
                for (var i = 0; times > i; i++) elem.animate({
                    opacity: animateTo
                }, duration, o.options.easing), animateTo = (animateTo + 1) % 2;
                elem.animate({
                    opacity: animateTo
                }, duration, o.options.easing, function() {
                    0 == animateTo && elem.hide(), o.callback && o.callback.apply(this, arguments)
                }), elem.queue("fx", function() {
                    elem.dequeue()
                }).dequeue()
            })
        }
    }(jQuery),
    function($) {
        $.effects.puff = function(o) {
            return this.queue(function() {
                var elem = $(this),
                    mode = $.effects.setMode(elem, o.options.mode || "hide"),
                    percent = parseInt(o.options.percent, 10) || 150,
                    factor = percent / 100,
                    original = {
                        height: elem.height(),
                        width: elem.width()
                    };
                $.extend(o.options, {
                    fade: !0,
                    mode: mode,
                    percent: "hide" == mode ? percent : 100,
                    from: "hide" == mode ? original : {
                        height: original.height * factor,
                        width: original.width * factor
                    }
                }), elem.effect("scale", o.options, o.duration, o.callback), elem.dequeue()
            })
        }, $.effects.scale = function(o) {
            return this.queue(function() {
                var el = $(this),
                    options = $.extend(!0, {}, o.options),
                    mode = $.effects.setMode(el, o.options.mode || "effect"),
                    percent = parseInt(o.options.percent, 10) || (0 == parseInt(o.options.percent, 10) ? 0 : "hide" == mode ? 0 : 100),
                    direction = o.options.direction || "both",
                    origin = o.options.origin;
                "effect" != mode && (options.origin = origin || ["middle", "center"], options.restore = !0);
                var original = {
                    height: el.height(),
                    width: el.width()
                };
                el.from = o.options.from || ("show" == mode ? {
                    height: 0,
                    width: 0
                } : original);
                var factor = {
                    y: "horizontal" != direction ? percent / 100 : 1,
                    x: "vertical" != direction ? percent / 100 : 1
                };
                el.to = {
                    height: original.height * factor.y,
                    width: original.width * factor.x
                }, o.options.fade && ("show" == mode && (el.from.opacity = 0, el.to.opacity = 1), "hide" == mode && (el.from.opacity = 1, el.to.opacity = 0)), options.from = el.from, options.to = el.to, options.mode = mode, el.effect("size", options, o.duration, o.callback), el.dequeue()
            })
        }, $.effects.size = function(o) {
            return this.queue(function() {
                var el = $(this),
                    props = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
                    props1 = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
                    props2 = ["width", "height", "overflow"],
                    cProps = ["fontSize"],
                    vProps = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
                    hProps = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
                    mode = $.effects.setMode(el, o.options.mode || "effect"),
                    restore = o.options.restore || !1,
                    scale = o.options.scale || "both",
                    origin = o.options.origin,
                    original = {
                        height: el.height(),
                        width: el.width()
                    };
                if (el.from = o.options.from || original, el.to = o.options.to || original, origin) {
                    var baseline = $.effects.getBaseline(origin, original);
                    el.from.top = (original.height - el.from.height) * baseline.y, el.from.left = (original.width - el.from.width) * baseline.x, el.to.top = (original.height - el.to.height) * baseline.y, el.to.left = (original.width - el.to.width) * baseline.x
                }
                var factor = {
                    from: {
                        y: el.from.height / original.height,
                        x: el.from.width / original.width
                    },
                    to: {
                        y: el.to.height / original.height,
                        x: el.to.width / original.width
                    }
                };
                ("box" == scale || "both" == scale) && (factor.from.y != factor.to.y && (props = props.concat(vProps), el.from = $.effects.setTransition(el, vProps, factor.from.y, el.from), el.to = $.effects.setTransition(el, vProps, factor.to.y, el.to)), factor.from.x != factor.to.x && (props = props.concat(hProps), el.from = $.effects.setTransition(el, hProps, factor.from.x, el.from), el.to = $.effects.setTransition(el, hProps, factor.to.x, el.to))), ("content" == scale || "both" == scale) && factor.from.y != factor.to.y && (props = props.concat(cProps), el.from = $.effects.setTransition(el, cProps, factor.from.y, el.from), el.to = $.effects.setTransition(el, cProps, factor.to.y, el.to)), $.effects.save(el, restore ? props : props1), el.show(), $.effects.createWrapper(el), el.css("overflow", "hidden").css(el.from), ("content" == scale || "both" == scale) && (vProps = vProps.concat(["marginTop", "marginBottom"]).concat(cProps), hProps = hProps.concat(["marginLeft", "marginRight"]), props2 = props.concat(vProps).concat(hProps), el.find("*[width]").each(function() {
                    var child = $(this);
                    restore && $.effects.save(child, props2);
                    var c_original = {
                        height: child.height(),
                        width: child.width()
                    };
                    child.from = {
                        height: c_original.height * factor.from.y,
                        width: c_original.width * factor.from.x
                    }, child.to = {
                        height: c_original.height * factor.to.y,
                        width: c_original.width * factor.to.x
                    }, factor.from.y != factor.to.y && (child.from = $.effects.setTransition(child, vProps, factor.from.y, child.from), child.to = $.effects.setTransition(child, vProps, factor.to.y, child.to)), factor.from.x != factor.to.x && (child.from = $.effects.setTransition(child, hProps, factor.from.x, child.from), child.to = $.effects.setTransition(child, hProps, factor.to.x, child.to)), child.css(child.from), child.animate(child.to, o.duration, o.options.easing, function() {
                        restore && $.effects.restore(child, props2)
                    })
                })), el.animate(el.to, {
                    queue: !1,
                    duration: o.duration,
                    easing: o.options.easing,
                    complete: function() {
                        0 === el.to.opacity && el.css("opacity", el.from.opacity), "hide" == mode && el.hide(), $.effects.restore(el, restore ? props : props1), $.effects.removeWrapper(el), o.callback && o.callback.apply(this, arguments), el.dequeue()
                    }
                })
            })
        }
    }(jQuery),
    function($) {
        $.effects.shake = function(o) {
            return this.queue(function() {
                var el = $(this),
                    props = ["position", "top", "bottom", "left", "right"],
                    direction = ($.effects.setMode(el, o.options.mode || "effect"), o.options.direction || "left"),
                    distance = o.options.distance || 20,
                    times = o.options.times || 3,
                    speed = o.duration || o.options.duration || 140;
                $.effects.save(el, props), el.show(), $.effects.createWrapper(el);
                var ref = "up" == direction || "down" == direction ? "top" : "left",
                    motion = "up" == direction || "left" == direction ? "pos" : "neg",
                    animation = {},
                    animation1 = {},
                    animation2 = {};
                animation[ref] = ("pos" == motion ? "-=" : "+=") + distance, animation1[ref] = ("pos" == motion ? "+=" : "-=") + 2 * distance, animation2[ref] = ("pos" == motion ? "-=" : "+=") + 2 * distance, el.animate(animation, speed, o.options.easing);
                for (var i = 1; times > i; i++) el.animate(animation1, speed, o.options.easing).animate(animation2, speed, o.options.easing);
                el.animate(animation1, speed, o.options.easing).animate(animation, speed / 2, o.options.easing, function() {
                    $.effects.restore(el, props), $.effects.removeWrapper(el), o.callback && o.callback.apply(this, arguments)
                }), el.queue("fx", function() {
                    el.dequeue()
                }), el.dequeue()
            })
        }
    }(jQuery),
    function($) {
        $.effects.slide = function(o) {
            return this.queue(function() {
                var el = $(this),
                    props = ["position", "top", "bottom", "left", "right"],
                    mode = $.effects.setMode(el, o.options.mode || "show"),
                    direction = o.options.direction || "left";
                $.effects.save(el, props), el.show(), $.effects.createWrapper(el).css({
                    overflow: "hidden"
                });
                var ref = "up" == direction || "down" == direction ? "top" : "left",
                    motion = "up" == direction || "left" == direction ? "pos" : "neg",
                    distance = o.options.distance || ("top" == ref ? el.outerHeight(!0) : el.outerWidth(!0));
                "show" == mode && el.css(ref, "pos" == motion ? isNaN(distance) ? "-" + distance : -distance : distance);
                var animation = {};
                animation[ref] = ("show" == mode ? "pos" == motion ? "+=" : "-=" : "pos" == motion ? "-=" : "+=") + distance, el.animate(animation, {
                    queue: !1,
                    duration: o.duration,
                    easing: o.options.easing,
                    complete: function() {
                        "hide" == mode && el.hide(), $.effects.restore(el, props), $.effects.removeWrapper(el), o.callback && o.callback.apply(this, arguments), el.dequeue()
                    }
                })
            })
        }
    }(jQuery),
    function($) {
        $.effects.transfer = function(o) {
            return this.queue(function() {
                var elem = $(this),
                    target = $(o.options.to),
                    endPosition = target.offset(),
                    animation = {
                        top: endPosition.top,
                        left: endPosition.left,
                        height: target.innerHeight(),
                        width: target.innerWidth()
                    },
                    startPosition = elem.offset(),
                    transfer = $('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(o.options.className).css({
                        top: startPosition.top,
                        left: startPosition.left,
                        height: elem.innerHeight(),
                        width: elem.innerWidth(),
                        position: "absolute"
                    }).animate(animation, o.duration, o.options.easing, function() {
                        transfer.remove(), o.callback && o.callback.apply(elem[0], arguments), elem.dequeue()
                    })
            })
        }
    }(jQuery),
    function($) {
        $.widget("ui.accordion", {
            options: {
                active: 0,
                animated: "slide",
                autoHeight: !0,
                clearStyle: !1,
                collapsible: !1,
                event: "click",
                fillSpace: !1,
                header: "> li > :first-child,> :not(li):even",
                icons: {
                    header: "ui-icon-triangle-1-e",
                    headerSelected: "ui-icon-triangle-1-s"
                },
                navigation: !1,
                navigationFilter: function() {
                    return this.href.toLowerCase() === location.href.toLowerCase()
                }
            },
            _create: function() {
                var self = this,
                    options = self.options;
                if (self.running = 0, self.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix"), self.headers = self.element.find(options.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion", function() {
                        options.disabled || $(this).addClass("ui-state-hover")
                    }).bind("mouseleave.accordion", function() {
                        options.disabled || $(this).removeClass("ui-state-hover")
                    }).bind("focus.accordion", function() {
                        options.disabled || $(this).addClass("ui-state-focus")
                    }).bind("blur.accordion", function() {
                        options.disabled || $(this).removeClass("ui-state-focus")
                    }), self.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom"), options.navigation) {
                    var current = self.element.find("a").filter(options.navigationFilter).eq(0);
                    if (current.length) {
                        var header = current.closest(".ui-accordion-header");
                        self.active = header.length ? header : current.closest(".ui-accordion-content").prev()
                    }
                }
                self.active = self._findActive(self.active || options.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top"), self.active.next().addClass("ui-accordion-content-active"), self._createIcons(), self.resize(), self.element.attr("role", "tablist"), self.headers.attr("role", "tab").bind("keydown.accordion", function(event) {
                    return self._keydown(event)
                }).next().attr("role", "tabpanel"), self.headers.not(self.active || "").attr({
                    "aria-expanded": "false",
                    "aria-selected": "false",
                    tabIndex: -1
                }).next().hide(), self.active.length ? self.active.attr({
                    "aria-expanded": "true",
                    "aria-selected": "true",
                    tabIndex: 0
                }) : self.headers.eq(0).attr("tabIndex", 0), $.browser.safari || self.headers.find("a").attr("tabIndex", -1), options.event && self.headers.bind(options.event.split(" ").join(".accordion ") + ".accordion", function(event) {
                    self._clickHandler.call(self, event, this), event.preventDefault()
                })
            },
            _createIcons: function() {
                var options = this.options;
                options.icons && ($("<span></span>").addClass("ui-icon " + options.icons.header).prependTo(this.headers), this.active.children(".ui-icon").toggleClass(options.icons.header).toggleClass(options.icons.headerSelected), this.element.addClass("ui-accordion-icons"))
            },
            _destroyIcons: function() {
                this.headers.children(".ui-icon").remove(), this.element.removeClass("ui-accordion-icons")
            },
            destroy: function() {
                var options = this.options;
                this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex"), this.headers.find("a").removeAttr("tabIndex"), this._destroyIcons();
                var contents = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
                return (options.autoHeight || options.fillHeight) && contents.css("height", ""), $.Widget.prototype.destroy.call(this)
            },
            _setOption: function(key, value) {
                $.Widget.prototype._setOption.apply(this, arguments), "active" == key && this.activate(value), "icons" == key && (this._destroyIcons(), value && this._createIcons()), "disabled" == key && this.headers.add(this.headers.next())[value ? "addClass" : "removeClass"]("ui-accordion-disabled ui-state-disabled")
            },
            _keydown: function(event) {
                if (!(this.options.disabled || event.altKey || event.ctrlKey)) {
                    var keyCode = $.ui.keyCode,
                        length = this.headers.length,
                        currentIndex = this.headers.index(event.target),
                        toFocus = !1;
                    switch (event.keyCode) {
                        case keyCode.RIGHT:
                        case keyCode.DOWN:
                            toFocus = this.headers[(currentIndex + 1) % length];
                            break;
                        case keyCode.LEFT:
                        case keyCode.UP:
                            toFocus = this.headers[(currentIndex - 1 + length) % length];
                            break;
                        case keyCode.SPACE:
                        case keyCode.ENTER:
                            this._clickHandler({
                                target: event.target
                            }, event.target), event.preventDefault()
                    }
                    return toFocus ? ($(event.target).attr("tabIndex", -1), $(toFocus).attr("tabIndex", 0), toFocus.focus(), !1) : !0
                }
            },
            resize: function() {
                var maxHeight, options = this.options;
                if (options.fillSpace) {
                    if ($.browser.msie) {
                        var defOverflow = this.element.parent().css("overflow");
                        this.element.parent().css("overflow", "hidden")
                    }
                    maxHeight = this.element.parent().height(), $.browser.msie && this.element.parent().css("overflow", defOverflow), this.headers.each(function() {
                        maxHeight -= $(this).outerHeight(!0)
                    }), this.headers.next().each(function() {
                        $(this).height(Math.max(0, maxHeight - $(this).innerHeight() + $(this).height()))
                    }).css("overflow", "auto")
                } else options.autoHeight && (maxHeight = 0, this.headers.next().each(function() {
                    maxHeight = Math.max(maxHeight, $(this).height("").height())
                }).height(maxHeight));
                return this
            },
            activate: function(index) {
                this.options.active = index;
                var active = this._findActive(index)[0];
                return this._clickHandler({
                    target: active
                }, active), this
            },
            _findActive: function(selector) {
                return selector ? "number" == typeof selector ? this.headers.filter(":eq(" + selector + ")") : this.headers.not(this.headers.not(selector)) : selector === !1 ? $([]) : this.headers.filter(":eq(0)")
            },
            _clickHandler: function(event, target) {
                var options = this.options;
                if (!options.disabled) {
                    if (!event.target) {
                        if (!options.collapsible) return;
                        this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(options.icons.headerSelected).addClass(options.icons.header), this.active.next().addClass("ui-accordion-content-active");
                        var toHide = this.active.next(),
                            data = {
                                options: options,
                                newHeader: $([]),
                                oldHeader: options.active,
                                newContent: $([]),
                                oldContent: toHide
                            },
                            toShow = this.active = $([]);
                        return this._toggle(toShow, toHide, data), void 0
                    }
                    var clicked = $(event.currentTarget || target),
                        clickedIsActive = clicked[0] === this.active[0];
                    if (options.active = options.collapsible && clickedIsActive ? !1 : this.headers.index(clicked), !(this.running || !options.collapsible && clickedIsActive)) {
                        var active = this.active,
                            toShow = clicked.next(),
                            toHide = this.active.next(),
                            data = {
                                options: options,
                                newHeader: clickedIsActive && options.collapsible ? $([]) : clicked,
                                oldHeader: this.active,
                                newContent: clickedIsActive && options.collapsible ? $([]) : toShow,
                                oldContent: toHide
                            },
                            down = this.headers.index(this.active[0]) > this.headers.index(clicked[0]);
                        this.active = clickedIsActive ? $([]) : clicked, this._toggle(toShow, toHide, data, clickedIsActive, down), active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(options.icons.headerSelected).addClass(options.icons.header), clickedIsActive || (clicked.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(options.icons.header).addClass(options.icons.headerSelected), clicked.next().addClass("ui-accordion-content-active"))
                    }
                }
            },
            _toggle: function(toShow, toHide, data, clickedIsActive, down) {
                var self = this,
                    options = self.options;
                self.toShow = toShow, self.toHide = toHide, self.data = data;
                var complete = function() {
                    return self ? self._completed.apply(self, arguments) : void 0
                };
                if (self._trigger("changestart", null, self.data), self.running = 0 === toHide.size() ? toShow.size() : toHide.size(), options.animated) {
                    var animOptions = {};
                    animOptions = options.collapsible && clickedIsActive ? {
                        toShow: $([]),
                        toHide: toHide,
                        complete: complete,
                        down: down,
                        autoHeight: options.autoHeight || options.fillSpace
                    } : {
                        toShow: toShow,
                        toHide: toHide,
                        complete: complete,
                        down: down,
                        autoHeight: options.autoHeight || options.fillSpace
                    }, options.proxied || (options.proxied = options.animated), options.proxiedDuration || (options.proxiedDuration = options.duration), options.animated = $.isFunction(options.proxied) ? options.proxied(animOptions) : options.proxied, options.duration = $.isFunction(options.proxiedDuration) ? options.proxiedDuration(animOptions) : options.proxiedDuration;
                    var animations = $.ui.accordion.animations,
                        duration = options.duration,
                        easing = options.animated;
                    !easing || animations[easing] || $.easing[easing] || (easing = "slide"), animations[easing] || (animations[easing] = function(options) {
                        this.slide(options, {
                            easing: easing,
                            duration: duration || 700
                        })
                    }), animations[easing](animOptions)
                } else options.collapsible && clickedIsActive ? toShow.toggle() : (toHide.hide(), toShow.show()), complete(!0);
                toHide.prev().attr({
                    "aria-expanded": "false",
                    "aria-selected": "false",
                    tabIndex: -1
                }).blur(), toShow.prev().attr({
                    "aria-expanded": "true",
                    "aria-selected": "true",
                    tabIndex: 0
                }).focus()
            },
            _completed: function(cancel) {
                this.running = cancel ? 0 : --this.running, this.running || (this.options.clearStyle && this.toShow.add(this.toHide).css({
                    height: "",
                    overflow: ""
                }), this.toHide.removeClass("ui-accordion-content-active"), this.toHide.length && (this.toHide.parent()[0].className = this.toHide.parent()[0].className), this._trigger("change", null, this.data))
            }
        }), $.extend($.ui.accordion, {
            version: "1.8.23",
            animations: {
                slide: function(options, additions) {
                    if (options = $.extend({
                            easing: "swing",
                            duration: 300
                        }, options, additions), !options.toHide.size()) return options.toShow.animate({
                        height: "show",
                        paddingTop: "show",
                        paddingBottom: "show"
                    }, options), void 0;
                    if (!options.toShow.size()) return options.toHide.animate({
                        height: "hide",
                        paddingTop: "hide",
                        paddingBottom: "hide"
                    }, options), void 0;
                    var originalWidth, overflow = options.toShow.css("overflow"),
                        percentDone = 0,
                        showProps = {},
                        hideProps = {},
                        fxAttrs = ["height", "paddingTop", "paddingBottom"],
                        s = options.toShow;
                    originalWidth = s[0].style.width, s.width(s.parent().width() - parseFloat(s.css("paddingLeft")) - parseFloat(s.css("paddingRight")) - (parseFloat(s.css("borderLeftWidth")) || 0) - (parseFloat(s.css("borderRightWidth")) || 0)), $.each(fxAttrs, function(i, prop) {
                        hideProps[prop] = "hide";
                        var parts = ("" + $.css(options.toShow[0], prop)).match(/^([\d+-.]+)(.*)$/);
                        showProps[prop] = {
                            value: parts[1],
                            unit: parts[2] || "px"
                        }
                    }), options.toShow.css({
                        height: 0,
                        overflow: "hidden"
                    }).show(), options.toHide.filter(":hidden").each(options.complete).end().filter(":visible").animate(hideProps, {
                        step: function(now, settings) {
                            "height" == settings.prop && (percentDone = settings.end - settings.start === 0 ? 0 : (settings.now - settings.start) / (settings.end - settings.start)), options.toShow[0].style[settings.prop] = percentDone * showProps[settings.prop].value + showProps[settings.prop].unit
                        },
                        duration: options.duration,
                        easing: options.easing,
                        complete: function() {
                            options.autoHeight || options.toShow.css("height", ""), options.toShow.css({
                                width: originalWidth,
                                overflow: overflow
                            }), options.complete()
                        }
                    })
                },
                bounceslide: function(options) {
                    this.slide(options, {
                        easing: options.down ? "easeOutBounce" : "swing",
                        duration: options.down ? 1e3 : 200
                    })
                }
            }
        })
    }(jQuery),
    function($) {
        var requestIndex = 0;
        $.widget("ui.autocomplete", {
            options: {
                appendTo: "body",
                autoFocus: !1,
                delay: 300,
                minLength: 1,
                position: {
                    my: "left top",
                    at: "left bottom",
                    collision: "none"
                },
                source: null
            },
            pending: 0,
            _create: function() {
                var suppressKeyPress, self = this,
                    doc = this.element[0].ownerDocument;
                this.isMultiLine = this.element.is("textarea"), this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({
                    role: "textbox",
                    "aria-autocomplete": "list",
                    "aria-haspopup": "true"
                }).bind("keydown.autocomplete", function(event) {
                    if (!self.options.disabled && !self.element.propAttr("readOnly")) {
                        suppressKeyPress = !1;
                        var keyCode = $.ui.keyCode;
                        switch (event.keyCode) {
                            case keyCode.PAGE_UP:
                                self._move("previousPage", event);
                                break;
                            case keyCode.PAGE_DOWN:
                                self._move("nextPage", event);
                                break;
                            case keyCode.UP:
                                self._keyEvent("previous", event);
                                break;
                            case keyCode.DOWN:
                                self._keyEvent("next", event);
                                break;
                            case keyCode.ENTER:
                            case keyCode.NUMPAD_ENTER:
                                self.menu.active && (suppressKeyPress = !0, event.preventDefault());
                            case keyCode.TAB:
                                if (!self.menu.active) return;
                                self.menu.select(event);
                                break;
                            case keyCode.ESCAPE:
                                self.element.val(self.term), self.close(event);
                                break;
                            default:
                                clearTimeout(self.searching), self.searching = setTimeout(function() {
                                    self.term != self.element.val() && (self.selectedItem = null, self.search(null, event))
                                }, self.options.delay)
                        }
                    }
                }).bind("keypress.autocomplete", function(event) {
                    suppressKeyPress && (suppressKeyPress = !1, event.preventDefault())
                }).bind("focus.autocomplete", function() {
                    self.options.disabled || (self.selectedItem = null, self.previous = self.element.val())
                }).bind("blur.autocomplete", function(event) {
                    self.options.disabled || (clearTimeout(self.searching), self.closing = setTimeout(function() {
                        self.close(event), self._change(event)
                    }, 150))
                }), this._initSource(), this.menu = $("<ul></ul>").addClass("ui-autocomplete").appendTo($(this.options.appendTo || "body", doc)[0]).mousedown(function(event) {
                    var menuElement = self.menu.element[0];
                    $(event.target).closest(".ui-menu-item").length || setTimeout(function() {
                        $(document).one("mousedown", function(event) {
                            event.target === self.element[0] || event.target === menuElement || $.ui.contains(menuElement, event.target) || self.close()
                        })
                    }, 1), setTimeout(function() {
                        clearTimeout(self.closing)
                    }, 13)
                }).menu({
                    focus: function(event, ui) {
                        var item = ui.item.data("item.autocomplete");
                        !1 !== self._trigger("focus", event, {
                            item: item
                        }) && /^key/.test(event.originalEvent.type) && self.element.val(item.value)
                    },
                    selected: function(event, ui) {
                        var item = ui.item.data("item.autocomplete"),
                            previous = self.previous;
                        self.element[0] !== doc.activeElement && (self.element.focus(), self.previous = previous, setTimeout(function() {
                            self.previous = previous, self.selectedItem = item
                        }, 1)), !1 !== self._trigger("select", event, {
                            item: item
                        }) && self.element.val(item.value), self.term = self.element.val(), self.close(event), self.selectedItem = item
                    },
                    blur: function() {
                        self.menu.element.is(":visible") && self.element.val() !== self.term && self.element.val(self.term)
                    }
                }).zIndex(this.element.zIndex() + 1).css({
                    top: 0,
                    left: 0
                }).hide().data("menu"), $.fn.bgiframe && this.menu.element.bgiframe(), self.beforeunloadHandler = function() {
                    self.element.removeAttr("autocomplete")
                }, $(window).bind("beforeunload", self.beforeunloadHandler)
            },
            destroy: function() {
                this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup"), this.menu.element.remove(), $(window).unbind("beforeunload", this.beforeunloadHandler), $.Widget.prototype.destroy.call(this)
            },
            _setOption: function(key, value) {
                $.Widget.prototype._setOption.apply(this, arguments), "source" === key && this._initSource(), "appendTo" === key && this.menu.element.appendTo($(value || "body", this.element[0].ownerDocument)[0]), "disabled" === key && value && this.xhr && this.xhr.abort()
            },
            _initSource: function() {
                var array, url, self = this;
                $.isArray(this.options.source) ? (array = this.options.source, this.source = function(request, response) {
                    response($.ui.autocomplete.filter(array, request.term))
                }) : "string" == typeof this.options.source ? (url = this.options.source, this.source = function(request, response) {
                    self.xhr && self.xhr.abort(), self.xhr = $.ajax({
                        url: url,
                        data: request,
                        dataType: "json",
                        success: function(data) {
                            response(data)
                        },
                        error: function() {
                            response([])
                        }
                    })
                }) : this.source = this.options.source
            },
            search: function(value, event) {
                return value = null != value ? value : this.element.val(), this.term = this.element.val(), value.length < this.options.minLength ? this.close(event) : (clearTimeout(this.closing), this._trigger("search", event) !== !1 ? this._search(value) : void 0)
            },
            _search: function(value) {
                this.pending++, this.element.addClass("ui-autocomplete-loading"), this.source({
                    term: value
                }, this._response())
            },
            _response: function() {
                var that = this,
                    index = ++requestIndex;
                return function(content) {
                    index === requestIndex && that.__response(content), that.pending--, that.pending || that.element.removeClass("ui-autocomplete-loading")
                }
            },
            __response: function(content) {
                !this.options.disabled && content && content.length ? (content = this._normalize(content), this._suggest(content), this._trigger("open")) : this.close()
            },
            close: function(event) {
                clearTimeout(this.closing), this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.deactivate(), this._trigger("close", event))
            },
            _change: function(event) {
                this.previous !== this.element.val() && this._trigger("change", event, {
                    item: this.selectedItem
                })
            },
            _normalize: function(items) {
                return items.length && items[0].label && items[0].value ? items : $.map(items, function(item) {
                    return "string" == typeof item ? {
                        label: item,
                        value: item
                    } : $.extend({
                        label: item.label || item.value,
                        value: item.value || item.label
                    }, item)
                })
            },
            _suggest: function(items) {
                var ul = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
                this._renderMenu(ul, items), this.menu.deactivate(), this.menu.refresh(), ul.show(), this._resizeMenu(), ul.position($.extend({
                    of: this.element
                }, this.options.position)), this.options.autoFocus && this.menu.next(new $.Event("mouseover"))
            },
            _resizeMenu: function() {
                var ul = this.menu.element;
                ul.outerWidth(Math.max(ul.width("").outerWidth() + 1, this.element.outerWidth()))
            },
            _renderMenu: function(ul, items) {
                var self = this;
                $.each(items, function(index, item) {
                    self._renderItem(ul, item)
                })
            },
            _renderItem: function(ul, item) {
                return $("<li></li>").data("item.autocomplete", item).append($("<a></a>").text(item.label)).appendTo(ul)
            },
            _move: function(direction, event) {
                return this.menu.element.is(":visible") ? this.menu.first() && /^previous/.test(direction) || this.menu.last() && /^next/.test(direction) ? (this.element.val(this.term), this.menu.deactivate(), void 0) : (this.menu[direction](event), void 0) : (this.search(null, event), void 0)
            },
            widget: function() {
                return this.menu.element
            },
            _keyEvent: function(keyEvent, event) {
                (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(keyEvent, event), event.preventDefault())
            }
        }), $.extend($.ui.autocomplete, {
            escapeRegex: function(value) {
                return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
            },
            filter: function(array, term) {
                var matcher = new RegExp($.ui.autocomplete.escapeRegex(term), "i");
                return $.grep(array, function(value) {
                    return matcher.test(value.label || value.value || value)
                })
            }
        })
    }(jQuery),
    /*
     * jQuery UI Menu (not officially released)
     * 
     * This widget isn't yet finished and the API is subject to change. We plan to finish
     * it for the next release. You're welcome to give it a try anyway and give us feedback,
     * as long as you're okay with migrating your code later on. We can help with that, too.
     *
     * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
     * Dual licensed under the MIT or GPL Version 2 licenses.
     * http://jquery.org/license
     *
     * http://docs.jquery.com/UI/Menu
     *
     * Depends:
     *	jquery.ui.core.js
     *  jquery.ui.widget.js
     */
    function($) {
        $.widget("ui.menu", {
            _create: function() {
                var self = this;
                this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({
                    role: "listbox",
                    "aria-activedescendant": "ui-active-menuitem"
                }).click(function(event) {
                    $(event.target).closest(".ui-menu-item a").length && (event.preventDefault(), self.select(event))
                }), this.refresh()
            },
            refresh: function() {
                var self = this,
                    items = this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem");
                items.children("a").addClass("ui-corner-all").attr("tabindex", -1).mouseenter(function(event) {
                    self.activate(event, $(this).parent())
                }).mouseleave(function() {
                    self.deactivate()
                })
            },
            activate: function(event, item) {
                if (this.deactivate(), this.hasScroll()) {
                    var offset = item.offset().top - this.element.offset().top,
                        scroll = this.element.scrollTop(),
                        elementHeight = this.element.height();
                    0 > offset ? this.element.scrollTop(scroll + offset) : offset >= elementHeight && this.element.scrollTop(scroll + offset - elementHeight + item.height())
                }
                this.active = item.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end(), this._trigger("focus", event, {
                    item: item
                })
            },
            deactivate: function() {
                this.active && (this.active.children("a").removeClass("ui-state-hover").removeAttr("id"), this._trigger("blur"), this.active = null)
            },
            next: function(event) {
                this.move("next", ".ui-menu-item:first", event)
            },
            previous: function(event) {
                this.move("prev", ".ui-menu-item:last", event)
            },
            first: function() {
                return this.active && !this.active.prevAll(".ui-menu-item").length
            },
            last: function() {
                return this.active && !this.active.nextAll(".ui-menu-item").length
            },
            move: function(direction, edge, event) {
                if (!this.active) return this.activate(event, this.element.children(edge)), void 0;
                var next = this.active[direction + "All"](".ui-menu-item").eq(0);
                next.length ? this.activate(event, next) : this.activate(event, this.element.children(edge))
            },
            nextPage: function(event) {
                if (this.hasScroll()) {
                    if (!this.active || this.last()) return this.activate(event, this.element.children(".ui-menu-item:first")), void 0;
                    var base = this.active.offset().top,
                        height = this.element.height(),
                        result = this.element.children(".ui-menu-item").filter(function() {
                            var close = $(this).offset().top - base - height + $(this).height();
                            return 10 > close && close > -10
                        });
                    result.length || (result = this.element.children(".ui-menu-item:last")), this.activate(event, result)
                } else this.activate(event, this.element.children(".ui-menu-item").filter(!this.active || this.last() ? ":first" : ":last"))
            },
            previousPage: function(event) {
                if (this.hasScroll()) {
                    if (!this.active || this.first()) return this.activate(event, this.element.children(".ui-menu-item:last")), void 0;
                    var base = this.active.offset().top,
                        height = this.element.height(),
                        result = this.element.children(".ui-menu-item").filter(function() {
                            var close = $(this).offset().top - base + height - $(this).height();
                            return 10 > close && close > -10
                        });
                    result.length || (result = this.element.children(".ui-menu-item:first")), this.activate(event, result)
                } else this.activate(event, this.element.children(".ui-menu-item").filter(!this.active || this.first() ? ":last" : ":first"))
            },
            hasScroll: function() {
                return this.element.height() < this.element[$.fn.prop ? "prop" : "attr"]("scrollHeight")
            },
            select: function(event) {
                this._trigger("selected", event, {
                    item: this.active
                })
            }
        })
    }(jQuery),
    function($) {
        var lastActive, startXPos, startYPos, clickDragged, baseClasses = "ui-button ui-widget ui-state-default ui-corner-all",
            stateClasses = "ui-state-hover ui-state-active ",
            typeClasses = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
            formResetHandler = function() {
                var buttons = $(this).find(":ui-button");
                setTimeout(function() {
                    buttons.button("refresh")
                }, 1)
            },
            radioGroup = function(radio) {
                var name = radio.name,
                    form = radio.form,
                    radios = $([]);
                return name && (radios = form ? $(form).find("[name='" + name + "']") : $("[name='" + name + "']", radio.ownerDocument).filter(function() {
                    return !this.form
                })), radios
            };
        $.widget("ui.button", {
            options: {
                disabled: null,
                text: !0,
                label: null,
                icons: {
                    primary: null,
                    secondary: null
                }
            },
            _create: function() {
                this.element.closest("form").unbind("reset.button").bind("reset.button", formResetHandler), "boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.propAttr("disabled") : this.element.propAttr("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
                var self = this,
                    options = this.options,
                    toggleButton = "checkbox" === this.type || "radio" === this.type,
                    hoverClass = "ui-state-hover" + (toggleButton ? "" : " ui-state-active"),
                    focusClass = "ui-state-focus";
                null === options.label && (options.label = this.buttonElement.html()), this.buttonElement.addClass(baseClasses).attr("role", "button").bind("mouseenter.button", function() {
                    options.disabled || ($(this).addClass("ui-state-hover"), this === lastActive && $(this).addClass("ui-state-active"))
                }).bind("mouseleave.button", function() {
                    options.disabled || $(this).removeClass(hoverClass)
                }).bind("click.button", function(event) {
                    options.disabled && (event.preventDefault(), event.stopImmediatePropagation())
                }), this.element.bind("focus.button", function() {
                    self.buttonElement.addClass(focusClass)
                }).bind("blur.button", function() {
                    self.buttonElement.removeClass(focusClass)
                }), toggleButton && (this.element.bind("change.button", function() {
                    clickDragged || self.refresh()
                }), this.buttonElement.bind("mousedown.button", function(event) {
                    options.disabled || (clickDragged = !1, startXPos = event.pageX, startYPos = event.pageY)
                }).bind("mouseup.button", function(event) {
                    options.disabled || (startXPos !== event.pageX || startYPos !== event.pageY) && (clickDragged = !0)
                })), "checkbox" === this.type ? this.buttonElement.bind("click.button", function() {
                    return options.disabled || clickDragged ? !1 : ($(this).toggleClass("ui-state-active"), self.buttonElement.attr("aria-pressed", self.element[0].checked), void 0)
                }) : "radio" === this.type ? this.buttonElement.bind("click.button", function() {
                    if (options.disabled || clickDragged) return !1;
                    $(this).addClass("ui-state-active"), self.buttonElement.attr("aria-pressed", "true");
                    var radio = self.element[0];
                    radioGroup(radio).not(radio).map(function() {
                        return $(this).button("widget")[0]
                    }).removeClass("ui-state-active").attr("aria-pressed", "false")
                }) : (this.buttonElement.bind("mousedown.button", function() {
                    return options.disabled ? !1 : ($(this).addClass("ui-state-active"), lastActive = this, $(document).one("mouseup", function() {
                        lastActive = null
                    }), void 0)
                }).bind("mouseup.button", function() {
                    return options.disabled ? !1 : ($(this).removeClass("ui-state-active"), void 0)
                }).bind("keydown.button", function(event) {
                    return options.disabled ? !1 : ((event.keyCode == $.ui.keyCode.SPACE || event.keyCode == $.ui.keyCode.ENTER) && $(this).addClass("ui-state-active"), void 0)
                }).bind("keyup.button", function() {
                    $(this).removeClass("ui-state-active")
                }), this.buttonElement.is("a") && this.buttonElement.keyup(function(event) {
                    event.keyCode === $.ui.keyCode.SPACE && $(this).click()
                })), this._setOption("disabled", options.disabled), this._resetButton()
            },
            _determineButtonType: function() {
                if (this.type = this.element.is(":checkbox") ? "checkbox" : this.element.is(":radio") ? "radio" : this.element.is("input") ? "input" : "button", "checkbox" === this.type || "radio" === this.type) {
                    var ancestor = this.element.parents().filter(":last"),
                        labelSelector = "label[for='" + this.element.attr("id") + "']";
                    this.buttonElement = ancestor.find(labelSelector), this.buttonElement.length || (ancestor = ancestor.length ? ancestor.siblings() : this.element.siblings(), this.buttonElement = ancestor.filter(labelSelector), this.buttonElement.length || (this.buttonElement = ancestor.find(labelSelector))), this.element.addClass("ui-helper-hidden-accessible");
                    var checked = this.element.is(":checked");
                    checked && this.buttonElement.addClass("ui-state-active"), this.buttonElement.attr("aria-pressed", checked)
                } else this.buttonElement = this.element
            },
            widget: function() {
                return this.buttonElement
            },
            destroy: function() {
                this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(baseClasses + " " + stateClasses + " " + typeClasses).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title"), $.Widget.prototype.destroy.call(this)
            },
            _setOption: function(key, value) {
                return $.Widget.prototype._setOption.apply(this, arguments), "disabled" === key ? (value ? this.element.propAttr("disabled", !0) : this.element.propAttr("disabled", !1), void 0) : (this._resetButton(), void 0)
            },
            refresh: function() {
                var isDisabled = this.element.is(":disabled");
                isDisabled !== this.options.disabled && this._setOption("disabled", isDisabled), "radio" === this.type ? radioGroup(this.element[0]).each(function() {
                    $(this).is(":checked") ? $(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : $(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
                }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
            },
            _resetButton: function() {
                if ("input" === this.type) return this.options.label && this.element.val(this.options.label), void 0;
                var buttonElement = this.buttonElement.removeClass(typeClasses),
                    buttonText = $("<span></span>", this.element[0].ownerDocument).addClass("ui-button-text").html(this.options.label).appendTo(buttonElement.empty()).text(),
                    icons = this.options.icons,
                    multipleIcons = icons.primary && icons.secondary,
                    buttonClasses = [];
                icons.primary || icons.secondary ? (this.options.text && buttonClasses.push("ui-button-text-icon" + (multipleIcons ? "s" : icons.primary ? "-primary" : "-secondary")), icons.primary && buttonElement.prepend("<span class='ui-button-icon-primary ui-icon " + icons.primary + "'></span>"), icons.secondary && buttonElement.append("<span class='ui-button-icon-secondary ui-icon " + icons.secondary + "'></span>"), this.options.text || (buttonClasses.push(multipleIcons ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || buttonElement.attr("title", buttonText))) : buttonClasses.push("ui-button-text-only"), buttonElement.addClass(buttonClasses.join(" "))
            }
        }), $.widget("ui.buttonset", {
            options: {
                items: ":button, :submit, :reset, :checkbox, :radio, a, :data(button)"
            },
            _create: function() {
                this.element.addClass("ui-buttonset")
            },
            _init: function() {
                this.refresh()
            },
            _setOption: function(key, value) {
                "disabled" === key && this.buttons.button("option", key, value), $.Widget.prototype._setOption.apply(this, arguments)
            },
            refresh: function() {
                var rtl = "rtl" === this.element.css("direction");
                this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
                    return $(this).button("widget")[0]
                }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(rtl ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(rtl ? "ui-corner-left" : "ui-corner-right").end().end()
            },
            destroy: function() {
                this.element.removeClass("ui-buttonset"), this.buttons.map(function() {
                    return $(this).button("widget")[0]
                }).removeClass("ui-corner-left ui-corner-right").end().button("destroy"), $.Widget.prototype.destroy.call(this)
            }
        })
    }(jQuery),
    function($, undefined) {
        function Datepicker() {
            this.debug = !1, this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
                closeText: "Done",
                prevText: "Prev",
                nextText: "Next",
                currentText: "Today",
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                weekHeader: "Wk",
                dateFormat: "mm/dd/yy",
                firstDay: 0,
                isRTL: !1,
                showMonthAfterYear: !1,
                yearSuffix: ""
            }, this._defaults = {
                showOn: "focus",
                showAnim: "fadeIn",
                showOptions: {},
                defaultDate: null,
                appendText: "",
                buttonText: "...",
                buttonImage: "",
                buttonImageOnly: !1,
                hideIfNoPrevNext: !1,
                navigationAsDateFormat: !1,
                gotoCurrent: !1,
                changeMonth: !1,
                changeYear: !1,
                yearRange: "c-10:c+10",
                showOtherMonths: !1,
                selectOtherMonths: !1,
                showWeek: !1,
                calculateWeek: this.iso8601Week,
                shortYearCutoff: "+10",
                minDate: null,
                maxDate: null,
                duration: "fast",
                beforeShowDay: null,
                beforeShow: null,
                onSelect: null,
                onChangeMonthYear: null,
                onClose: null,
                numberOfMonths: 1,
                showCurrentAtPos: 0,
                stepMonths: 1,
                stepBigMonths: 12,
                altField: "",
                altFormat: "",
                constrainInput: !0,
                showButtonPanel: !1,
                autoSize: !1,
                disabled: !1
            }, $.extend(this._defaults, this.regional[""]), this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
        }

        function bindHover(dpDiv) {
            var selector = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
            return dpDiv.bind("mouseout", function(event) {
                var elem = $(event.target).closest(selector);
                elem.length && elem.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")
            }).bind("mouseover", function(event) {
                var elem = $(event.target).closest(selector);
                !$.datepicker._isDisabledDatepicker(instActive.inline ? dpDiv.parent()[0] : instActive.input[0]) && elem.length && (elem.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), elem.addClass("ui-state-hover"), elem.hasClass("ui-datepicker-prev") && elem.addClass("ui-datepicker-prev-hover"), elem.hasClass("ui-datepicker-next") && elem.addClass("ui-datepicker-next-hover"))
            })
        }

        function extendRemove(target, props) {
            $.extend(target, props);
            for (var name in props)(null == props[name] || props[name] == undefined) && (target[name] = props[name]);
            return target
        }

        function isArray(a) {
            return a && ($.browser.safari && "object" == typeof a && a.length || a.constructor && a.constructor.toString().match(/\Array\(\)/))
        }
        $.extend($.ui, {
            datepicker: {
                version: "1.8.23"
            }
        });
        var PROP_NAME = "datepicker",
            dpuuid = (new Date).getTime(),
            instActive;
        $.extend(Datepicker.prototype, {
            markerClassName: "hasDatepicker",
            maxRows: 4,
            log: function() {
                this.debug && console.log.apply("", arguments)
            },
            _widgetDatepicker: function() {
                return this.dpDiv
            },
            setDefaults: function(settings) {
                return extendRemove(this._defaults, settings || {}), this
            },
            _attachDatepicker: function(target, settings) {
                var inlineSettings = null;
                for (var attrName in this._defaults) {
                    var attrValue = target.getAttribute("date:" + attrName);
                    if (attrValue) {
                        inlineSettings = inlineSettings || {};
                        try {
                            inlineSettings[attrName] = eval(attrValue)
                        } catch (err) {
                            inlineSettings[attrName] = attrValue
                        }
                    }
                }
                var nodeName = target.nodeName.toLowerCase(),
                    inline = "div" == nodeName || "span" == nodeName;
                target.id || (this.uuid += 1, target.id = "dp" + this.uuid);
                var inst = this._newInst($(target), inline);
                inst.settings = $.extend({}, settings || {}, inlineSettings || {}), "input" == nodeName ? this._connectDatepicker(target, inst) : inline && this._inlineDatepicker(target, inst)
            },
            _newInst: function(target, inline) {
                var id = target[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1");
                return {
                    id: id,
                    input: target,
                    selectedDay: 0,
                    selectedMonth: 0,
                    selectedYear: 0,
                    drawMonth: 0,
                    drawYear: 0,
                    inline: inline,
                    dpDiv: inline ? bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')) : this.dpDiv
                }
            },
            _connectDatepicker: function(target, inst) {
                var input = $(target);
                inst.append = $([]), inst.trigger = $([]), input.hasClass(this.markerClassName) || (this._attachments(input, inst), input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function(event, key, value) {
                    inst.settings[key] = value
                }).bind("getData.datepicker", function(event, key) {
                    return this._get(inst, key)
                }), this._autoSize(inst), $.data(target, PROP_NAME, inst), inst.settings.disabled && this._disableDatepicker(target))
            },
            _attachments: function(input, inst) {
                var appendText = this._get(inst, "appendText"),
                    isRTL = this._get(inst, "isRTL");
                inst.append && inst.append.remove(), appendText && (inst.append = $('<span class="' + this._appendClass + '">' + appendText + "</span>"), input[isRTL ? "before" : "after"](inst.append)), input.unbind("focus", this._showDatepicker), inst.trigger && inst.trigger.remove();
                var showOn = this._get(inst, "showOn");
                if (("focus" == showOn || "both" == showOn) && input.focus(this._showDatepicker), "button" == showOn || "both" == showOn) {
                    var buttonText = this._get(inst, "buttonText"),
                        buttonImage = this._get(inst, "buttonImage");
                    inst.trigger = $(this._get(inst, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
                        src: buttonImage,
                        alt: buttonText,
                        title: buttonText
                    }) : $('<button type="button"></button>').addClass(this._triggerClass).html("" == buttonImage ? buttonText : $("<img/>").attr({
                        src: buttonImage,
                        alt: buttonText,
                        title: buttonText
                    }))), input[isRTL ? "before" : "after"](inst.trigger), inst.trigger.click(function() {
                        return $.datepicker._datepickerShowing && $.datepicker._lastInput == input[0] ? $.datepicker._hideDatepicker() : $.datepicker._datepickerShowing && $.datepicker._lastInput != input[0] ? ($.datepicker._hideDatepicker(), $.datepicker._showDatepicker(input[0])) : $.datepicker._showDatepicker(input[0]), !1
                    })
                }
            },
            _autoSize: function(inst) {
                if (this._get(inst, "autoSize") && !inst.inline) {
                    var date = new Date(2009, 11, 20),
                        dateFormat = this._get(inst, "dateFormat");
                    if (dateFormat.match(/[DM]/)) {
                        var findMax = function(names) {
                            for (var max = 0, maxI = 0, i = 0; i < names.length; i++) names[i].length > max && (max = names[i].length, maxI = i);
                            return maxI
                        };
                        date.setMonth(findMax(this._get(inst, dateFormat.match(/MM/) ? "monthNames" : "monthNamesShort"))), date.setDate(findMax(this._get(inst, dateFormat.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - date.getDay())
                    }
                    inst.input.attr("size", this._formatDate(inst, date).length)
                }
            },
            _inlineDatepicker: function(target, inst) {
                var divSpan = $(target);
                divSpan.hasClass(this.markerClassName) || (divSpan.addClass(this.markerClassName).append(inst.dpDiv).bind("setData.datepicker", function(event, key, value) {
                    inst.settings[key] = value
                }).bind("getData.datepicker", function(event, key) {
                    return this._get(inst, key)
                }), $.data(target, PROP_NAME, inst), this._setDate(inst, this._getDefaultDate(inst), !0), this._updateDatepicker(inst), this._updateAlternate(inst), inst.settings.disabled && this._disableDatepicker(target), inst.dpDiv.css("display", "block"))
            },
            _dialogDatepicker: function(input, date, onSelect, settings, pos) {
                var inst = this._dialogInst;
                if (!inst) {
                    this.uuid += 1;
                    var id = "dp" + this.uuid;
                    this._dialogInput = $('<input type="text" id="' + id + '" style="position: absolute; top: -100px; width: 0px;"/>'), this._dialogInput.keydown(this._doKeyDown), $("body").append(this._dialogInput), inst = this._dialogInst = this._newInst(this._dialogInput, !1), inst.settings = {}, $.data(this._dialogInput[0], PROP_NAME, inst)
                }
                if (extendRemove(inst.settings, settings || {}), date = date && date.constructor == Date ? this._formatDate(inst, date) : date, this._dialogInput.val(date), this._pos = pos ? pos.length ? pos : [pos.pageX, pos.pageY] : null, !this._pos) {
                    var browserWidth = document.documentElement.clientWidth,
                        browserHeight = document.documentElement.clientHeight,
                        scrollX = document.documentElement.scrollLeft || document.body.scrollLeft,
                        scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                    this._pos = [browserWidth / 2 - 100 + scrollX, browserHeight / 2 - 150 + scrollY]
                }
                return this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), inst.settings.onSelect = onSelect, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), $.blockUI && $.blockUI(this.dpDiv), $.data(this._dialogInput[0], PROP_NAME, inst), this
            },
            _destroyDatepicker: function(target) {
                var $target = $(target),
                    inst = $.data(target, PROP_NAME);
                if ($target.hasClass(this.markerClassName)) {
                    var nodeName = target.nodeName.toLowerCase();
                    $.removeData(target, PROP_NAME), "input" == nodeName ? (inst.append.remove(), inst.trigger.remove(), $target.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" == nodeName || "span" == nodeName) && $target.removeClass(this.markerClassName).empty()
                }
            },
            _enableDatepicker: function(target) {
                var $target = $(target),
                    inst = $.data(target, PROP_NAME);
                if ($target.hasClass(this.markerClassName)) {
                    var nodeName = target.nodeName.toLowerCase();
                    if ("input" == nodeName) target.disabled = !1, inst.trigger.filter("button").each(function() {
                        this.disabled = !1
                    }).end().filter("img").css({
                        opacity: "1.0",
                        cursor: ""
                    });
                    else if ("div" == nodeName || "span" == nodeName) {
                        var inline = $target.children("." + this._inlineClass);
                        inline.children().removeClass("ui-state-disabled"), inline.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")
                    }
                    this._disabledInputs = $.map(this._disabledInputs, function(value) {
                        return value == target ? null : value
                    })
                }
            },
            _disableDatepicker: function(target) {
                var $target = $(target),
                    inst = $.data(target, PROP_NAME);
                if ($target.hasClass(this.markerClassName)) {
                    var nodeName = target.nodeName.toLowerCase();
                    if ("input" == nodeName) target.disabled = !0, inst.trigger.filter("button").each(function() {
                        this.disabled = !0
                    }).end().filter("img").css({
                        opacity: "0.5",
                        cursor: "default"
                    });
                    else if ("div" == nodeName || "span" == nodeName) {
                        var inline = $target.children("." + this._inlineClass);
                        inline.children().addClass("ui-state-disabled"), inline.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled", "disabled")
                    }
                    this._disabledInputs = $.map(this._disabledInputs, function(value) {
                        return value == target ? null : value
                    }), this._disabledInputs[this._disabledInputs.length] = target
                }
            },
            _isDisabledDatepicker: function(target) {
                if (!target) return !1;
                for (var i = 0; i < this._disabledInputs.length; i++)
                    if (this._disabledInputs[i] == target) return !0;
                return !1
            },
            _getInst: function(target) {
                try {
                    return $.data(target, PROP_NAME)
                } catch (err) {
                    throw "Missing instance data for this datepicker"
                }
            },
            _optionDatepicker: function(target, name, value) {
                var inst = this._getInst(target);
                if (2 == arguments.length && "string" == typeof name) return "defaults" == name ? $.extend({}, $.datepicker._defaults) : inst ? "all" == name ? $.extend({}, inst.settings) : this._get(inst, name) : null;
                var settings = name || {};
                if ("string" == typeof name && (settings = {}, settings[name] = value), inst) {
                    this._curInst == inst && this._hideDatepicker();
                    var date = this._getDateDatepicker(target, !0),
                        minDate = this._getMinMaxDate(inst, "min"),
                        maxDate = this._getMinMaxDate(inst, "max");
                    extendRemove(inst.settings, settings), null !== minDate && settings.dateFormat !== undefined && settings.minDate === undefined && (inst.settings.minDate = this._formatDate(inst, minDate)), null !== maxDate && settings.dateFormat !== undefined && settings.maxDate === undefined && (inst.settings.maxDate = this._formatDate(inst, maxDate)), this._attachments($(target), inst), this._autoSize(inst), this._setDate(inst, date), this._updateAlternate(inst), this._updateDatepicker(inst)
                }
            },
            _changeDatepicker: function(target, name, value) {
                this._optionDatepicker(target, name, value)
            },
            _refreshDatepicker: function(target) {
                var inst = this._getInst(target);
                inst && this._updateDatepicker(inst)
            },
            _setDateDatepicker: function(target, date) {
                var inst = this._getInst(target);
                inst && (this._setDate(inst, date), this._updateDatepicker(inst), this._updateAlternate(inst))
            },
            _getDateDatepicker: function(target, noDefault) {
                var inst = this._getInst(target);
                return inst && !inst.inline && this._setDateFromField(inst, noDefault), inst ? this._getDate(inst) : null
            },
            _doKeyDown: function(event) {
                var inst = $.datepicker._getInst(event.target),
                    handled = !0,
                    isRTL = inst.dpDiv.is(".ui-datepicker-rtl");
                if (inst._keyEvent = !0, $.datepicker._datepickerShowing) switch (event.keyCode) {
                    case 9:
                        $.datepicker._hideDatepicker(), handled = !1;
                        break;
                    case 13:
                        var sel = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", inst.dpDiv);
                        sel[0] && $.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
                        var onSelect = $.datepicker._get(inst, "onSelect");
                        if (onSelect) {
                            var dateStr = $.datepicker._formatDate(inst);
                            onSelect.apply(inst.input ? inst.input[0] : null, [dateStr, inst])
                        } else $.datepicker._hideDatepicker();
                        return !1;
                    case 27:
                        $.datepicker._hideDatepicker();
                        break;
                    case 33:
                        $.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths"), "M");
                        break;
                    case 34:
                        $.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths"), "M");
                        break;
                    case 35:
                        (event.ctrlKey || event.metaKey) && $.datepicker._clearDate(event.target), handled = event.ctrlKey || event.metaKey;
                        break;
                    case 36:
                        (event.ctrlKey || event.metaKey) && $.datepicker._gotoToday(event.target), handled = event.ctrlKey || event.metaKey;
                        break;
                    case 37:
                        (event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, isRTL ? 1 : -1, "D"), handled = event.ctrlKey || event.metaKey, event.originalEvent.altKey && $.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths"), "M");
                        break;
                    case 38:
                        (event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, -7, "D"), handled = event.ctrlKey || event.metaKey;
                        break;
                    case 39:
                        (event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, isRTL ? -1 : 1, "D"), handled = event.ctrlKey || event.metaKey, event.originalEvent.altKey && $.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths"), "M");
                        break;
                    case 40:
                        (event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, 7, "D"), handled = event.ctrlKey || event.metaKey;
                        break;
                    default:
                        handled = !1
                } else 36 == event.keyCode && event.ctrlKey ? $.datepicker._showDatepicker(this) : handled = !1;
                handled && (event.preventDefault(), event.stopPropagation())
            },
            _doKeyPress: function(event) {
                var inst = $.datepicker._getInst(event.target);
                if ($.datepicker._get(inst, "constrainInput")) {
                    var chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat")),
                        chr = String.fromCharCode(event.charCode == undefined ? event.keyCode : event.charCode);
                    return event.ctrlKey || event.metaKey || " " > chr || !chars || chars.indexOf(chr) > -1
                }
            },
            _doKeyUp: function(event) {
                var inst = $.datepicker._getInst(event.target);
                if (inst.input.val() != inst.lastVal) try {
                    var date = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), inst.input ? inst.input.val() : null, $.datepicker._getFormatConfig(inst));
                    date && ($.datepicker._setDateFromField(inst), $.datepicker._updateAlternate(inst), $.datepicker._updateDatepicker(inst))
                } catch (err) {
                    $.datepicker.log(err)
                }
                return !0
            },
            _showDatepicker: function(input) {
                if (input = input.target || input, "input" != input.nodeName.toLowerCase() && (input = $("input", input.parentNode)[0]), !$.datepicker._isDisabledDatepicker(input) && $.datepicker._lastInput != input) {
                    var inst = $.datepicker._getInst(input);
                    $.datepicker._curInst && $.datepicker._curInst != inst && ($.datepicker._curInst.dpDiv.stop(!0, !0), inst && $.datepicker._datepickerShowing && $.datepicker._hideDatepicker($.datepicker._curInst.input[0]));
                    var beforeShow = $.datepicker._get(inst, "beforeShow"),
                        beforeShowSettings = beforeShow ? beforeShow.apply(input, [input, inst]) : {};
                    if (beforeShowSettings !== !1) {
                        extendRemove(inst.settings, beforeShowSettings), inst.lastVal = null, $.datepicker._lastInput = input, $.datepicker._setDateFromField(inst), $.datepicker._inDialog && (input.value = ""), $.datepicker._pos || ($.datepicker._pos = $.datepicker._findPos(input), $.datepicker._pos[1] += input.offsetHeight);
                        var isFixed = !1;
                        $(input).parents().each(function() {
                            return isFixed |= "fixed" == $(this).css("position"), !isFixed
                        }), isFixed && $.browser.opera && ($.datepicker._pos[0] -= document.documentElement.scrollLeft, $.datepicker._pos[1] -= document.documentElement.scrollTop);
                        var offset = {
                            left: $.datepicker._pos[0],
                            top: $.datepicker._pos[1]
                        };
                        if ($.datepicker._pos = null, inst.dpDiv.empty(), inst.dpDiv.css({
                                position: "absolute",
                                display: "block",
                                top: "-1000px"
                            }), $.datepicker._updateDatepicker(inst), offset = $.datepicker._checkOffset(inst, offset, isFixed), inst.dpDiv.css({
                                position: $.datepicker._inDialog && $.blockUI ? "static" : isFixed ? "fixed" : "absolute",
                                display: "none",
                                left: offset.left + "px",
                                top: offset.top + "px"
                            }), !inst.inline) {
                            var showAnim = $.datepicker._get(inst, "showAnim"),
                                duration = $.datepicker._get(inst, "duration"),
                                postProcess = function() {
                                    var cover = inst.dpDiv.find("iframe.ui-datepicker-cover");
                                    if (cover.length) {
                                        var borders = $.datepicker._getBorders(inst.dpDiv);
                                        cover.css({
                                            left: -borders[0],
                                            top: -borders[1],
                                            width: inst.dpDiv.outerWidth(),
                                            height: inst.dpDiv.outerHeight()
                                        })
                                    }
                                };
                            inst.dpDiv.zIndex($(input).zIndex() + 1), $.datepicker._datepickerShowing = !0, $.effects && $.effects[showAnim] ? inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess) : inst.dpDiv[showAnim || "show"](showAnim ? duration : null, postProcess), showAnim && duration || postProcess(), inst.input.is(":visible") && !inst.input.is(":disabled") && inst.input.focus(), $.datepicker._curInst = inst
                        }
                    }
                }
            },
            _updateDatepicker: function(inst) {
                var self = this;
                self.maxRows = 4;
                var borders = $.datepicker._getBorders(inst.dpDiv);
                instActive = inst, inst.dpDiv.empty().append(this._generateHTML(inst)), this._attachHandlers(inst);
                var cover = inst.dpDiv.find("iframe.ui-datepicker-cover");
                cover.length && cover.css({
                    left: -borders[0],
                    top: -borders[1],
                    width: inst.dpDiv.outerWidth(),
                    height: inst.dpDiv.outerHeight()
                }), inst.dpDiv.find("." + this._dayOverClass + " a").mouseover();
                var numMonths = this._getNumberOfMonths(inst),
                    cols = numMonths[1],
                    width = 17;
                if (inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), cols > 1 && inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", width * cols + "em"), inst.dpDiv[(1 != numMonths[0] || 1 != numMonths[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), inst == $.datepicker._curInst && $.datepicker._datepickerShowing && inst.input && inst.input.is(":visible") && !inst.input.is(":disabled") && inst.input[0] != document.activeElement && inst.input.focus(), inst.yearshtml) {
                    var origyearshtml = inst.yearshtml;
                    setTimeout(function() {
                        origyearshtml === inst.yearshtml && inst.yearshtml && inst.dpDiv.find("select.ui-datepicker-year:first").replaceWith(inst.yearshtml), origyearshtml = inst.yearshtml = null
                    }, 0)
                }
            },
            _getBorders: function(elem) {
                var convert = function(value) {
                    return {
                        thin: 1,
                        medium: 2,
                        thick: 3
                    }[value] || value
                };
                return [parseFloat(convert(elem.css("border-left-width"))), parseFloat(convert(elem.css("border-top-width")))]
            },
            _checkOffset: function(inst, offset, isFixed) {
                var dpWidth = inst.dpDiv.outerWidth(),
                    dpHeight = inst.dpDiv.outerHeight(),
                    inputWidth = inst.input ? inst.input.outerWidth() : 0,
                    inputHeight = inst.input ? inst.input.outerHeight() : 0,
                    viewWidth = document.documentElement.clientWidth + (isFixed ? 0 : $(document).scrollLeft()),
                    viewHeight = document.documentElement.clientHeight + (isFixed ? 0 : $(document).scrollTop());
                return offset.left -= this._get(inst, "isRTL") ? dpWidth - inputWidth : 0, offset.left -= isFixed && offset.left == inst.input.offset().left ? $(document).scrollLeft() : 0, offset.top -= isFixed && offset.top == inst.input.offset().top + inputHeight ? $(document).scrollTop() : 0, offset.left -= Math.min(offset.left, offset.left + dpWidth > viewWidth && viewWidth > dpWidth ? Math.abs(offset.left + dpWidth - viewWidth) : 0), offset.top -= Math.min(offset.top, offset.top + dpHeight > viewHeight && viewHeight > dpHeight ? Math.abs(dpHeight + inputHeight) : 0), offset
            },
            _findPos: function(obj) {
                for (var inst = this._getInst(obj), isRTL = this._get(inst, "isRTL"); obj && ("hidden" == obj.type || 1 != obj.nodeType || $.expr.filters.hidden(obj));) obj = obj[isRTL ? "previousSibling" : "nextSibling"];
                var position = $(obj).offset();
                return [position.left, position.top]
            },
            _hideDatepicker: function(input) {
                var inst = this._curInst;
                if (inst && (!input || inst == $.data(input, PROP_NAME)) && this._datepickerShowing) {
                    var showAnim = this._get(inst, "showAnim"),
                        duration = this._get(inst, "duration"),
                        postProcess = function() {
                            $.datepicker._tidyDialog(inst)
                        };
                    $.effects && $.effects[showAnim] ? inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess) : inst.dpDiv["slideDown" == showAnim ? "slideUp" : "fadeIn" == showAnim ? "fadeOut" : "hide"](showAnim ? duration : null, postProcess), showAnim || postProcess(), this._datepickerShowing = !1;
                    var onClose = this._get(inst, "onClose");
                    onClose && onClose.apply(inst.input ? inst.input[0] : null, [inst.input ? inst.input.val() : "", inst]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                        position: "absolute",
                        left: "0",
                        top: "-100px"
                    }), $.blockUI && ($.unblockUI(), $("body").append(this.dpDiv))), this._inDialog = !1
                }
            },
            _tidyDialog: function(inst) {
                inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
            },
            _checkExternalClick: function(event) {
                if ($.datepicker._curInst) {
                    var $target = $(event.target),
                        inst = $.datepicker._getInst($target[0]);
                    ($target[0].id != $.datepicker._mainDivId && 0 == $target.parents("#" + $.datepicker._mainDivId).length && !$target.hasClass($.datepicker.markerClassName) && !$target.closest("." + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && (!$.datepicker._inDialog || !$.blockUI) || $target.hasClass($.datepicker.markerClassName) && $.datepicker._curInst != inst) && $.datepicker._hideDatepicker()
                }
            },
            _adjustDate: function(id, offset, period) {
                var target = $(id),
                    inst = this._getInst(target[0]);
                this._isDisabledDatepicker(target[0]) || (this._adjustInstDate(inst, offset + ("M" == period ? this._get(inst, "showCurrentAtPos") : 0), period), this._updateDatepicker(inst))
            },
            _gotoToday: function(id) {
                var target = $(id),
                    inst = this._getInst(target[0]);
                if (this._get(inst, "gotoCurrent") && inst.currentDay) inst.selectedDay = inst.currentDay, inst.drawMonth = inst.selectedMonth = inst.currentMonth, inst.drawYear = inst.selectedYear = inst.currentYear;
                else {
                    var date = new Date;
                    inst.selectedDay = date.getDate(), inst.drawMonth = inst.selectedMonth = date.getMonth(), inst.drawYear = inst.selectedYear = date.getFullYear()
                }
                this._notifyChange(inst), this._adjustDate(target)
            },
            _selectMonthYear: function(id, select, period) {
                var target = $(id),
                    inst = this._getInst(target[0]);
                inst["selected" + ("M" == period ? "Month" : "Year")] = inst["draw" + ("M" == period ? "Month" : "Year")] = parseInt(select.options[select.selectedIndex].value, 10), this._notifyChange(inst), this._adjustDate(target)
            },
            _selectDay: function(id, month, year, td) {
                var target = $(id);
                if (!$(td).hasClass(this._unselectableClass) && !this._isDisabledDatepicker(target[0])) {
                    var inst = this._getInst(target[0]);
                    inst.selectedDay = inst.currentDay = $("a", td).html(), inst.selectedMonth = inst.currentMonth = month, inst.selectedYear = inst.currentYear = year, this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear))
                }
            },
            _clearDate: function(id) {
                {
                    var target = $(id);
                    this._getInst(target[0])
                }
                this._selectDate(target, "")
            },
            _selectDate: function(id, dateStr) {
                var target = $(id),
                    inst = this._getInst(target[0]);
                dateStr = null != dateStr ? dateStr : this._formatDate(inst), inst.input && inst.input.val(dateStr), this._updateAlternate(inst);
                var onSelect = this._get(inst, "onSelect");
                onSelect ? onSelect.apply(inst.input ? inst.input[0] : null, [dateStr, inst]) : inst.input && inst.input.trigger("change"), inst.inline ? this._updateDatepicker(inst) : (this._hideDatepicker(), this._lastInput = inst.input[0], "object" != typeof inst.input[0] && inst.input.focus(), this._lastInput = null)
            },
            _updateAlternate: function(inst) {
                var altField = this._get(inst, "altField");
                if (altField) {
                    var altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat"),
                        date = this._getDate(inst),
                        dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
                    $(altField).each(function() {
                        $(this).val(dateStr)
                    })
                }
            },
            noWeekends: function(date) {
                var day = date.getDay();
                return [day > 0 && 6 > day, ""]
            },
            iso8601Week: function(date) {
                var checkDate = new Date(date.getTime());
                checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
                var time = checkDate.getTime();
                return checkDate.setMonth(0), checkDate.setDate(1), Math.floor(Math.round((time - checkDate) / 864e5) / 7) + 1
            },
            parseDate: function(format, value, settings) {
                if (null == format || null == value) throw "Invalid arguments";
                if (value = "object" == typeof value ? value.toString() : value + "", "" == value) return null;
                var shortYearCutoff = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff;
                shortYearCutoff = "string" != typeof shortYearCutoff ? shortYearCutoff : (new Date).getFullYear() % 100 + parseInt(shortYearCutoff, 10);
                for (var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort, dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames, monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort, monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames, year = -1, month = -1, day = -1, doy = -1, literal = !1, lookAhead = function(match) {
                        var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) == match;
                        return matches && iFormat++, matches
                    }, getNumber = function(match) {
                        var isDoubled = lookAhead(match),
                            size = "@" == match ? 14 : "!" == match ? 20 : "y" == match && isDoubled ? 4 : "o" == match ? 3 : 2,
                            digits = new RegExp("^\\d{1," + size + "}"),
                            num = value.substring(iValue).match(digits);
                        if (!num) throw "Missing number at position " + iValue;
                        return iValue += num[0].length, parseInt(num[0], 10)
                    }, getName = function(match, shortNames, longNames) {
                        var names = $.map(lookAhead(match) ? longNames : shortNames, function(v, k) {
                                return [
                                    [k, v]
                                ]
                            }).sort(function(a, b) {
                                return -(a[1].length - b[1].length)
                            }),
                            index = -1;
                        if ($.each(names, function(i, pair) {
                                var name = pair[1];
                                return value.substr(iValue, name.length).toLowerCase() == name.toLowerCase() ? (index = pair[0], iValue += name.length, !1) : void 0
                            }), -1 != index) return index + 1;
                        throw "Unknown name at position " + iValue
                    }, checkLiteral = function() {
                        if (value.charAt(iValue) != format.charAt(iFormat)) throw "Unexpected literal at position " + iValue;
                        iValue++
                    }, iValue = 0, iFormat = 0; iFormat < format.length; iFormat++)
                    if (literal) "'" != format.charAt(iFormat) || lookAhead("'") ? checkLiteral() : literal = !1;
                    else switch (format.charAt(iFormat)) {
                        case "d":
                            day = getNumber("d");
                            break;
                        case "D":
                            getName("D", dayNamesShort, dayNames);
                            break;
                        case "o":
                            doy = getNumber("o");
                            break;
                        case "m":
                            month = getNumber("m");
                            break;
                        case "M":
                            month = getName("M", monthNamesShort, monthNames);
                            break;
                        case "y":
                            year = getNumber("y");
                            break;
                        case "@":
                            var date = new Date(getNumber("@"));
                            year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();
                            break;
                        case "!":
                            var date = new Date((getNumber("!") - this._ticksTo1970) / 1e4);
                            year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();
                            break;
                        case "'":
                            lookAhead("'") ? checkLiteral() : literal = !0;
                            break;
                        default:
                            checkLiteral()
                    }
                    if (iValue < value.length) throw "Extra/unparsed characters found in date: " + value.substring(iValue);
                if (-1 == year ? year = (new Date).getFullYear() : 100 > year && (year += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (shortYearCutoff >= year ? 0 : -100)), doy > -1)
                    for (month = 1, day = doy;;) {
                        var dim = this._getDaysInMonth(year, month - 1);
                        if (dim >= day) break;
                        month++, day -= dim
                    }
                var date = this._daylightSavingAdjust(new Date(year, month - 1, day));
                if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day) throw "Invalid date";
                return date
            },
            ATOM: "yy-mm-dd",
            COOKIE: "D, dd M yy",
            ISO_8601: "yy-mm-dd",
            RFC_822: "D, d M y",
            RFC_850: "DD, dd-M-y",
            RFC_1036: "D, d M y",
            RFC_1123: "D, d M yy",
            RFC_2822: "D, d M yy",
            RSS: "D, d M y",
            TICKS: "!",
            TIMESTAMP: "@",
            W3C: "yy-mm-dd",
            _ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
            formatDate: function(format, date, settings) {
                if (!date) return "";
                var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,
                    dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,
                    monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,
                    monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,
                    lookAhead = function(match) {
                        var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) == match;
                        return matches && iFormat++, matches
                    },
                    formatNumber = function(match, value, len) {
                        var num = "" + value;
                        if (lookAhead(match))
                            for (; num.length < len;) num = "0" + num;
                        return num
                    },
                    formatName = function(match, value, shortNames, longNames) {
                        return lookAhead(match) ? longNames[value] : shortNames[value]
                    },
                    output = "",
                    literal = !1;
                if (date)
                    for (var iFormat = 0; iFormat < format.length; iFormat++)
                        if (literal) "'" != format.charAt(iFormat) || lookAhead("'") ? output += format.charAt(iFormat) : literal = !1;
                        else switch (format.charAt(iFormat)) {
                            case "d":
                                output += formatNumber("d", date.getDate(), 2);
                                break;
                            case "D":
                                output += formatName("D", date.getDay(), dayNamesShort, dayNames);
                                break;
                            case "o":
                                output += formatNumber("o", Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                                break;
                            case "m":
                                output += formatNumber("m", date.getMonth() + 1, 2);
                                break;
                            case "M":
                                output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
                                break;
                            case "y":
                                output += lookAhead("y") ? date.getFullYear() : (date.getYear() % 100 < 10 ? "0" : "") + date.getYear() % 100;
                                break;
                            case "@":
                                output += date.getTime();
                                break;
                            case "!":
                                output += 1e4 * date.getTime() + this._ticksTo1970;
                                break;
                            case "'":
                                lookAhead("'") ? output += "'" : literal = !0;
                                break;
                            default:
                                output += format.charAt(iFormat)
                        }
                        return output
            },
            _possibleChars: function(format) {
                for (var chars = "", literal = !1, lookAhead = function(match) {
                        var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) == match;
                        return matches && iFormat++, matches
                    }, iFormat = 0; iFormat < format.length; iFormat++)
                    if (literal) "'" != format.charAt(iFormat) || lookAhead("'") ? chars += format.charAt(iFormat) : literal = !1;
                    else switch (format.charAt(iFormat)) {
                        case "d":
                        case "m":
                        case "y":
                        case "@":
                            chars += "0123456789";
                            break;
                        case "D":
                        case "M":
                            return null;
                        case "'":
                            lookAhead("'") ? chars += "'" : literal = !0;
                            break;
                        default:
                            chars += format.charAt(iFormat)
                    }
                    return chars
            },
            _get: function(inst, name) {
                return inst.settings[name] !== undefined ? inst.settings[name] : this._defaults[name]
            },
            _setDateFromField: function(inst, noDefault) {
                if (inst.input.val() != inst.lastVal) {
                    var date, defaultDate, dateFormat = this._get(inst, "dateFormat"),
                        dates = inst.lastVal = inst.input ? inst.input.val() : null;
                    date = defaultDate = this._getDefaultDate(inst);
                    var settings = this._getFormatConfig(inst);
                    try {
                        date = this.parseDate(dateFormat, dates, settings) || defaultDate
                    } catch (event) {
                        this.log(event), dates = noDefault ? "" : dates
                    }
                    inst.selectedDay = date.getDate(), inst.drawMonth = inst.selectedMonth = date.getMonth(), inst.drawYear = inst.selectedYear = date.getFullYear(), inst.currentDay = dates ? date.getDate() : 0, inst.currentMonth = dates ? date.getMonth() : 0, inst.currentYear = dates ? date.getFullYear() : 0, this._adjustInstDate(inst)
                }
            },
            _getDefaultDate: function(inst) {
                return this._restrictMinMax(inst, this._determineDate(inst, this._get(inst, "defaultDate"), new Date))
            },
            _determineDate: function(inst, date, defaultDate) {
                var offsetNumeric = function(offset) {
                        var date = new Date;
                        return date.setDate(date.getDate() + offset), date
                    },
                    offsetString = function(offset) {
                        try {
                            return $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), offset, $.datepicker._getFormatConfig(inst))
                        } catch (e) {}
                        for (var date = (offset.toLowerCase().match(/^c/) ? $.datepicker._getDate(inst) : null) || new Date, year = date.getFullYear(), month = date.getMonth(), day = date.getDate(), pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, matches = pattern.exec(offset); matches;) {
                            switch (matches[2] || "d") {
                                case "d":
                                case "D":
                                    day += parseInt(matches[1], 10);
                                    break;
                                case "w":
                                case "W":
                                    day += 7 * parseInt(matches[1], 10);
                                    break;
                                case "m":
                                case "M":
                                    month += parseInt(matches[1], 10), day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
                                    break;
                                case "y":
                                case "Y":
                                    year += parseInt(matches[1], 10), day = Math.min(day, $.datepicker._getDaysInMonth(year, month))
                            }
                            matches = pattern.exec(offset)
                        }
                        return new Date(year, month, day)
                    },
                    newDate = null == date || "" === date ? defaultDate : "string" == typeof date ? offsetString(date) : "number" == typeof date ? isNaN(date) ? defaultDate : offsetNumeric(date) : new Date(date.getTime());
                return newDate = newDate && "Invalid Date" == newDate.toString() ? defaultDate : newDate, newDate && (newDate.setHours(0), newDate.setMinutes(0), newDate.setSeconds(0), newDate.setMilliseconds(0)), this._daylightSavingAdjust(newDate)
            },
            _daylightSavingAdjust: function(date) {
                return date ? (date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0), date) : null
            },
            _setDate: function(inst, date, noChange) {
                var clear = !date,
                    origMonth = inst.selectedMonth,
                    origYear = inst.selectedYear,
                    newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date));
                inst.selectedDay = inst.currentDay = newDate.getDate(), inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth(), inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear(), origMonth == inst.selectedMonth && origYear == inst.selectedYear || noChange || this._notifyChange(inst), this._adjustInstDate(inst), inst.input && inst.input.val(clear ? "" : this._formatDate(inst))
            },
            _getDate: function(inst) {
                var startDate = !inst.currentYear || inst.input && "" == inst.input.val() ? null : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
                return startDate
            },
            _attachHandlers: function(inst) {
                var stepMonths = this._get(inst, "stepMonths"),
                    id = "#" + inst.id.replace(/\\\\/g, "\\");
                inst.dpDiv.find("[data-handler]").map(function() {
                    var handler = {
                        prev: function() {
                            window["DP_jQuery_" + dpuuid].datepicker._adjustDate(id, -stepMonths, "M")
                        },
                        next: function() {
                            window["DP_jQuery_" + dpuuid].datepicker._adjustDate(id, +stepMonths, "M")
                        },
                        hide: function() {
                            window["DP_jQuery_" + dpuuid].datepicker._hideDatepicker()
                        },
                        today: function() {
                            window["DP_jQuery_" + dpuuid].datepicker._gotoToday(id)
                        },
                        selectDay: function() {
                            return window["DP_jQuery_" + dpuuid].datepicker._selectDay(id, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                        },
                        selectMonth: function() {
                            return window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(id, this, "M"), !1
                        },
                        selectYear: function() {
                            return window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(id, this, "Y"), !1
                        }
                    };
                    $(this).bind(this.getAttribute("data-event"), handler[this.getAttribute("data-handler")])
                })
            },
            _generateHTML: function(inst) {
                var today = new Date;
                today = this._daylightSavingAdjust(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
                var isRTL = this._get(inst, "isRTL"),
                    showButtonPanel = this._get(inst, "showButtonPanel"),
                    hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext"),
                    navigationAsDateFormat = this._get(inst, "navigationAsDateFormat"),
                    numMonths = this._getNumberOfMonths(inst),
                    showCurrentAtPos = this._get(inst, "showCurrentAtPos"),
                    stepMonths = this._get(inst, "stepMonths"),
                    isMultiMonth = 1 != numMonths[0] || 1 != numMonths[1],
                    currentDate = this._daylightSavingAdjust(inst.currentDay ? new Date(inst.currentYear, inst.currentMonth, inst.currentDay) : new Date(9999, 9, 9)),
                    minDate = this._getMinMaxDate(inst, "min"),
                    maxDate = this._getMinMaxDate(inst, "max"),
                    drawMonth = inst.drawMonth - showCurrentAtPos,
                    drawYear = inst.drawYear;
                if (0 > drawMonth && (drawMonth += 12, drawYear--), maxDate) {
                    var maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - numMonths[0] * numMonths[1] + 1, maxDate.getDate()));
                    for (maxDraw = minDate && minDate > maxDraw ? minDate : maxDraw; this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw;) drawMonth--, 0 > drawMonth && (drawMonth = 11, drawYear--)
                }
                inst.drawMonth = drawMonth, inst.drawYear = drawYear;
                var prevText = this._get(inst, "prevText");
                prevText = navigationAsDateFormat ? this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst)) : prevText;
                var prev = this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? '<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "e" : "w") + '">' + prevText + "</span></a>" : hideIfNoPrevNext ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "e" : "w") + '">' + prevText + "</span></a>",
                    nextText = this._get(inst, "nextText");
                nextText = navigationAsDateFormat ? this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst)) : nextText;
                var next = this._canAdjustMonth(inst, 1, drawYear, drawMonth) ? '<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "w" : "e") + '">' + nextText + "</span></a>" : hideIfNoPrevNext ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "w" : "e") + '">' + nextText + "</span></a>",
                    currentText = this._get(inst, "currentText"),
                    gotoDate = this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today;
                currentText = navigationAsDateFormat ? this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)) : currentText;
                var controls = inst.inline ? "" : '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">' + this._get(inst, "closeText") + "</button>",
                    buttonPanel = showButtonPanel ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (isRTL ? controls : "") + (this._isInRange(inst, gotoDate) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click">' + currentText + "</button>" : "") + (isRTL ? "" : controls) + "</div>" : "",
                    firstDay = parseInt(this._get(inst, "firstDay"), 10);
                firstDay = isNaN(firstDay) ? 0 : firstDay;
                for (var showWeek = this._get(inst, "showWeek"), dayNames = this._get(inst, "dayNames"), dayNamesMin = (this._get(inst, "dayNamesShort"), this._get(inst, "dayNamesMin")), monthNames = this._get(inst, "monthNames"), monthNamesShort = this._get(inst, "monthNamesShort"), beforeShowDay = this._get(inst, "beforeShowDay"), showOtherMonths = this._get(inst, "showOtherMonths"), selectOtherMonths = this._get(inst, "selectOtherMonths"), defaultDate = (this._get(inst, "calculateWeek") || this.iso8601Week, this._getDefaultDate(inst)), html = "", row = 0; row < numMonths[0]; row++) {
                    var group = "";
                    this.maxRows = 4;
                    for (var col = 0; col < numMonths[1]; col++) {
                        var selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay)),
                            cornerClass = " ui-corner-all",
                            calender = "";
                        if (isMultiMonth) {
                            if (calender += '<div class="ui-datepicker-group', numMonths[1] > 1) switch (col) {
                                case 0:
                                    calender += " ui-datepicker-group-first", cornerClass = " ui-corner-" + (isRTL ? "right" : "left");
                                    break;
                                case numMonths[1] - 1:
                                    calender += " ui-datepicker-group-last", cornerClass = " ui-corner-" + (isRTL ? "left" : "right");
                                    break;
                                default:
                                    calender += " ui-datepicker-group-middle", cornerClass = ""
                            }
                            calender += '">'
                        }
                        calender += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '">' + (/all|left/.test(cornerClass) && 0 == row ? isRTL ? next : prev : "") + (/all|right/.test(cornerClass) && 0 == row ? isRTL ? prev : next : "") + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, row > 0 || col > 0, monthNames, monthNamesShort) + '</div><table class="ui-datepicker-calendar"><thead><tr>';
                        for (var thead = showWeek ? '<th class="ui-datepicker-week-col">' + this._get(inst, "weekHeader") + "</th>" : "", dow = 0; 7 > dow; dow++) {
                            var day = (dow + firstDay) % 7;
                            thead += "<th" + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + dayNames[day] + '">' + dayNamesMin[day] + "</span></th>"
                        }
                        calender += thead + "</tr></thead><tbody>";
                        var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
                        drawYear == inst.selectedYear && drawMonth == inst.selectedMonth && (inst.selectedDay = Math.min(inst.selectedDay, daysInMonth));
                        var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7,
                            curRows = Math.ceil((leadDays + daysInMonth) / 7),
                            numRows = isMultiMonth ? this.maxRows > curRows ? this.maxRows : curRows : curRows;
                        this.maxRows = numRows;
                        for (var printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays)), dRow = 0; numRows > dRow; dRow++) {
                            calender += "<tr>";
                            for (var tbody = showWeek ? '<td class="ui-datepicker-week-col">' + this._get(inst, "calculateWeek")(printDate) + "</td>" : "", dow = 0; 7 > dow; dow++) {
                                var daySettings = beforeShowDay ? beforeShowDay.apply(inst.input ? inst.input[0] : null, [printDate]) : [!0, ""],
                                    otherMonth = printDate.getMonth() != drawMonth,
                                    unselectable = otherMonth && !selectOtherMonths || !daySettings[0] || minDate && minDate > printDate || maxDate && printDate > maxDate;
                                tbody += '<td class="' + ((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (otherMonth ? " ui-datepicker-other-month" : "") + (printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth && inst._keyEvent || defaultDate.getTime() == printDate.getTime() && defaultDate.getTime() == selectedDate.getTime() ? " " + this._dayOverClass : "") + (unselectable ? " " + this._unselectableClass + " ui-state-disabled" : "") + (otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + (printDate.getTime() == currentDate.getTime() ? " " + this._currentClass : "") + (printDate.getTime() == today.getTime() ? " ui-datepicker-today" : "")) + '"' + (otherMonth && !showOtherMonths || !daySettings[2] ? "" : ' title="' + daySettings[2] + '"') + (unselectable ? "" : ' data-handler="selectDay" data-event="click" data-month="' + printDate.getMonth() + '" data-year="' + printDate.getFullYear() + '"') + ">" + (otherMonth && !showOtherMonths ? "&#xa0;" : unselectable ? '<span class="ui-state-default">' + printDate.getDate() + "</span>" : '<a class="ui-state-default' + (printDate.getTime() == today.getTime() ? " ui-state-highlight" : "") + (printDate.getTime() == currentDate.getTime() ? " ui-state-active" : "") + (otherMonth ? " ui-priority-secondary" : "") + '" href="#">' + printDate.getDate() + "</a>") + "</td>", printDate.setDate(printDate.getDate() + 1), printDate = this._daylightSavingAdjust(printDate)
                            }
                            calender += tbody + "</tr>"
                        }
                        drawMonth++, drawMonth > 11 && (drawMonth = 0, drawYear++), calender += "</tbody></table>" + (isMultiMonth ? "</div>" + (numMonths[0] > 0 && col == numMonths[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' : "") : ""), group += calender
                    }
                    html += group
                }
                return html += buttonPanel + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !inst.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : ""), inst._keyEvent = !1, html
            },
            _generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate, secondary, monthNames, monthNamesShort) {
                var changeMonth = this._get(inst, "changeMonth"),
                    changeYear = this._get(inst, "changeYear"),
                    showMonthAfterYear = this._get(inst, "showMonthAfterYear"),
                    html = '<div class="ui-datepicker-title">',
                    monthHtml = "";
                if (secondary || !changeMonth) monthHtml += '<span class="ui-datepicker-month">' + monthNames[drawMonth] + "</span>";
                else {
                    var inMinYear = minDate && minDate.getFullYear() == drawYear,
                        inMaxYear = maxDate && maxDate.getFullYear() == drawYear;
                    monthHtml += '<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';
                    for (var month = 0; 12 > month; month++)(!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth()) && (monthHtml += '<option value="' + month + '"' + (month == drawMonth ? ' selected="selected"' : "") + ">" + monthNamesShort[month] + "</option>");
                    monthHtml += "</select>"
                }
                if (showMonthAfterYear || (html += monthHtml + (!secondary && changeMonth && changeYear ? "" : "&#xa0;")), !inst.yearshtml)
                    if (inst.yearshtml = "", secondary || !changeYear) html += '<span class="ui-datepicker-year">' + drawYear + "</span>";
                    else {
                        var years = this._get(inst, "yearRange").split(":"),
                            thisYear = (new Date).getFullYear(),
                            determineYear = function(value) {
                                var year = value.match(/c[+-].*/) ? drawYear + parseInt(value.substring(1), 10) : value.match(/[+-].*/) ? thisYear + parseInt(value, 10) : parseInt(value, 10);
                                return isNaN(year) ? thisYear : year
                            },
                            year = determineYear(years[0]),
                            endYear = Math.max(year, determineYear(years[1] || ""));
                        for (year = minDate ? Math.max(year, minDate.getFullYear()) : year, endYear = maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear, inst.yearshtml += '<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">'; endYear >= year; year++) inst.yearshtml += '<option value="' + year + '"' + (year == drawYear ? ' selected="selected"' : "") + ">" + year + "</option>";
                        inst.yearshtml += "</select>", html += inst.yearshtml, inst.yearshtml = null
                    }
                return html += this._get(inst, "yearSuffix"), showMonthAfterYear && (html += (!secondary && changeMonth && changeYear ? "" : "&#xa0;") + monthHtml), html += "</div>"
            },
            _adjustInstDate: function(inst, offset, period) {
                var year = inst.drawYear + ("Y" == period ? offset : 0),
                    month = inst.drawMonth + ("M" == period ? offset : 0),
                    day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + ("D" == period ? offset : 0),
                    date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));
                inst.selectedDay = date.getDate(), inst.drawMonth = inst.selectedMonth = date.getMonth(), inst.drawYear = inst.selectedYear = date.getFullYear(), ("M" == period || "Y" == period) && this._notifyChange(inst)
            },
            _restrictMinMax: function(inst, date) {
                var minDate = this._getMinMaxDate(inst, "min"),
                    maxDate = this._getMinMaxDate(inst, "max"),
                    newDate = minDate && minDate > date ? minDate : date;
                return newDate = maxDate && newDate > maxDate ? maxDate : newDate
            },
            _notifyChange: function(inst) {
                var onChange = this._get(inst, "onChangeMonthYear");
                onChange && onChange.apply(inst.input ? inst.input[0] : null, [inst.selectedYear, inst.selectedMonth + 1, inst])
            },
            _getNumberOfMonths: function(inst) {
                var numMonths = this._get(inst, "numberOfMonths");
                return null == numMonths ? [1, 1] : "number" == typeof numMonths ? [1, numMonths] : numMonths
            },
            _getMinMaxDate: function(inst, minMax) {
                return this._determineDate(inst, this._get(inst, minMax + "Date"), null)
            },
            _getDaysInMonth: function(year, month) {
                return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate()
            },
            _getFirstDayOfMonth: function(year, month) {
                return new Date(year, month, 1).getDay()
            },
            _canAdjustMonth: function(inst, offset, curYear, curMonth) {
                var numMonths = this._getNumberOfMonths(inst),
                    date = this._daylightSavingAdjust(new Date(curYear, curMonth + (0 > offset ? offset : numMonths[0] * numMonths[1]), 1));
                return 0 > offset && date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth())), this._isInRange(inst, date)
            },
            _isInRange: function(inst, date) {
                var minDate = this._getMinMaxDate(inst, "min"),
                    maxDate = this._getMinMaxDate(inst, "max");
                return (!minDate || date.getTime() >= minDate.getTime()) && (!maxDate || date.getTime() <= maxDate.getTime())
            },
            _getFormatConfig: function(inst) {
                var shortYearCutoff = this._get(inst, "shortYearCutoff");
                return shortYearCutoff = "string" != typeof shortYearCutoff ? shortYearCutoff : (new Date).getFullYear() % 100 + parseInt(shortYearCutoff, 10), {
                    shortYearCutoff: shortYearCutoff,
                    dayNamesShort: this._get(inst, "dayNamesShort"),
                    dayNames: this._get(inst, "dayNames"),
                    monthNamesShort: this._get(inst, "monthNamesShort"),
                    monthNames: this._get(inst, "monthNames")
                }
            },
            _formatDate: function(inst, day, month, year) {
                day || (inst.currentDay = inst.selectedDay, inst.currentMonth = inst.selectedMonth, inst.currentYear = inst.selectedYear);
                var date = day ? "object" == typeof day ? day : this._daylightSavingAdjust(new Date(year, month, day)) : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
                return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst))
            }
        }), $.fn.datepicker = function(options) {
            if (!this.length) return this;
            $.datepicker.initialized || ($(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv), $.datepicker.initialized = !0);
            var otherArgs = Array.prototype.slice.call(arguments, 1);
            return "string" != typeof options || "isDisabled" != options && "getDate" != options && "widget" != options ? "option" == options && 2 == arguments.length && "string" == typeof arguments[1] ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs)) : this.each(function() {
                "string" == typeof options ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this].concat(otherArgs)) : $.datepicker._attachDatepicker(this, options)
            }) : $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs))
        }, $.datepicker = new Datepicker, $.datepicker.initialized = !1, $.datepicker.uuid = (new Date).getTime(), $.datepicker.version = "1.8.23", window["DP_jQuery_" + dpuuid] = $
    }(jQuery),
    function($, undefined) {
        var uiDialogClasses = "ui-dialog ui-widget ui-widget-content ui-corner-all ",
            sizeRelatedOptions = {
                buttons: !0,
                height: !0,
                maxHeight: !0,
                maxWidth: !0,
                minHeight: !0,
                minWidth: !0,
                width: !0
            },
            resizableRelatedOptions = {
                maxHeight: !0,
                maxWidth: !0,
                minHeight: !0,
                minWidth: !0
            };
        $.widget("ui.dialog", {
            options: {
                autoOpen: !0,
                buttons: {},
                closeOnEscape: !0,
                closeText: "close",
                dialogClass: "",
                draggable: !0,
                hide: null,
                height: "auto",
                maxHeight: !1,
                maxWidth: !1,
                minHeight: 150,
                minWidth: 150,
                modal: !1,
                position: {
                    my: "center",
                    at: "center",
                    collision: "fit",
                    using: function(pos) {
                        var topOffset = $(this).css(pos).offset().top;
                        0 > topOffset && $(this).css("top", pos.top - topOffset)
                    }
                },
                resizable: !0,
                show: null,
                stack: !0,
                title: "",
                width: 300,
                zIndex: 1e3
            },
            _create: function() {
                this.originalTitle = this.element.attr("title"), "string" != typeof this.originalTitle && (this.originalTitle = ""), this.options.title = this.options.title || this.originalTitle; {
                    var self = this,
                        options = self.options,
                        title = options.title || "&#160;",
                        titleId = $.ui.dialog.getTitleId(self.element),
                        uiDialog = (self.uiDialog = $("<div></div>")).appendTo(document.body).hide().addClass(uiDialogClasses + options.dialogClass).css({
                            zIndex: options.zIndex
                        }).attr("tabIndex", -1).css("outline", 0).keydown(function(event) {
                            options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode && event.keyCode === $.ui.keyCode.ESCAPE && (self.close(event), event.preventDefault())
                        }).attr({
                            role: "dialog",
                            "aria-labelledby": titleId
                        }).mousedown(function(event) {
                            self.moveToTop(!1, event)
                        }),
                        uiDialogTitlebar = (self.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(uiDialog), (self.uiDialogTitlebar = $("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(uiDialog)),
                        uiDialogTitlebarClose = $('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function() {
                            uiDialogTitlebarClose.addClass("ui-state-hover")
                        }, function() {
                            uiDialogTitlebarClose.removeClass("ui-state-hover")
                        }).focus(function() {
                            uiDialogTitlebarClose.addClass("ui-state-focus")
                        }).blur(function() {
                            uiDialogTitlebarClose.removeClass("ui-state-focus")
                        }).click(function(event) {
                            return self.close(event), !1
                        }).appendTo(uiDialogTitlebar);
                    (self.uiDialogTitlebarCloseText = $("<span></span>")).addClass("ui-icon ui-icon-closethick").text(options.closeText).appendTo(uiDialogTitlebarClose), $("<span></span>").addClass("ui-dialog-title").attr("id", titleId).html(title).prependTo(uiDialogTitlebar)
                }
                $.isFunction(options.beforeclose) && !$.isFunction(options.beforeClose) && (options.beforeClose = options.beforeclose), uiDialogTitlebar.find("*").add(uiDialogTitlebar).disableSelection(), options.draggable && $.fn.draggable && self._makeDraggable(), options.resizable && $.fn.resizable && self._makeResizable(), self._createButtons(options.buttons), self._isOpen = !1, $.fn.bgiframe && uiDialog.bgiframe()
            },
            _init: function() {
                this.options.autoOpen && this.open()
            },
            destroy: function() {
                var self = this;
                return self.overlay && self.overlay.destroy(), self.uiDialog.hide(), self.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"), self.uiDialog.remove(), self.originalTitle && self.element.attr("title", self.originalTitle), self
            },
            widget: function() {
                return this.uiDialog
            },
            close: function(event) {
                var maxZ, thisZ, self = this;
                if (!1 !== self._trigger("beforeClose", event)) return self.overlay && self.overlay.destroy(), self.uiDialog.unbind("keypress.ui-dialog"), self._isOpen = !1, self.options.hide ? self.uiDialog.hide(self.options.hide, function() {
                    self._trigger("close", event)
                }) : (self.uiDialog.hide(), self._trigger("close", event)), $.ui.dialog.overlay.resize(), self.options.modal && (maxZ = 0, $(".ui-dialog").each(function() {
                    this !== self.uiDialog[0] && (thisZ = $(this).css("z-index"), isNaN(thisZ) || (maxZ = Math.max(maxZ, thisZ)))
                }), $.ui.dialog.maxZ = maxZ), self
            },
            isOpen: function() {
                return this._isOpen
            },
            moveToTop: function(force, event) {
                var saveScroll, self = this,
                    options = self.options;
                return options.modal && !force || !options.stack && !options.modal ? self._trigger("focus", event) : (options.zIndex > $.ui.dialog.maxZ && ($.ui.dialog.maxZ = options.zIndex), self.overlay && ($.ui.dialog.maxZ += 1, self.overlay.$el.css("z-index", $.ui.dialog.overlay.maxZ = $.ui.dialog.maxZ)), saveScroll = {
                    scrollTop: self.element.scrollTop(),
                    scrollLeft: self.element.scrollLeft()
                }, $.ui.dialog.maxZ += 1, self.uiDialog.css("z-index", $.ui.dialog.maxZ), self.element.attr(saveScroll), self._trigger("focus", event), self)
            },
            open: function() {
                if (!this._isOpen) {
                    var self = this,
                        options = self.options,
                        uiDialog = self.uiDialog;
                    return self.overlay = options.modal ? new $.ui.dialog.overlay(self) : null, self._size(), self._position(options.position), uiDialog.show(options.show), self.moveToTop(!0), options.modal && uiDialog.bind("keydown.ui-dialog", function(event) {
                        if (event.keyCode === $.ui.keyCode.TAB) {
                            var tabbables = $(":tabbable", this),
                                first = tabbables.filter(":first"),
                                last = tabbables.filter(":last");
                            return event.target !== last[0] || event.shiftKey ? event.target === first[0] && event.shiftKey ? (last.focus(1), !1) : void 0 : (first.focus(1), !1)
                        }
                    }), $(self.element.find(":tabbable").get().concat(uiDialog.find(".ui-dialog-buttonpane :tabbable").get().concat(uiDialog.get()))).eq(0).focus(), self._isOpen = !0, self._trigger("open"), self
                }
            },
            _createButtons: function(buttons) {
                var self = this,
                    hasButtons = !1,
                    uiDialogButtonPane = $("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),
                    uiButtonSet = $("<div></div>").addClass("ui-dialog-buttonset").appendTo(uiDialogButtonPane);
                self.uiDialog.find(".ui-dialog-buttonpane").remove(), "object" == typeof buttons && null !== buttons && $.each(buttons, function() {
                    return !(hasButtons = !0)
                }), hasButtons && ($.each(buttons, function(name, props) {
                    props = $.isFunction(props) ? {
                        click: props,
                        text: name
                    } : props;
                    var button = $('<button type="button"></button>').click(function() {
                        props.click.apply(self.element[0], arguments)
                    }).appendTo(uiButtonSet);
                    $.each(props, function(key, value) {
                        "click" !== key && (key in button ? button[key](value) : button.attr(key, value))
                    }), $.fn.button && button.button()
                }), uiDialogButtonPane.appendTo(self.uiDialog))
            },
            _makeDraggable: function() {
                function filteredUi(ui) {
                    return {
                        position: ui.position,
                        offset: ui.offset
                    }
                }
                var heightBeforeDrag, self = this,
                    options = self.options,
                    doc = $(document);
                self.uiDialog.draggable({
                    cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                    handle: ".ui-dialog-titlebar",
                    containment: "document",
                    start: function(event, ui) {
                        heightBeforeDrag = "auto" === options.height ? "auto" : $(this).height(), $(this).height($(this).height()).addClass("ui-dialog-dragging"), self._trigger("dragStart", event, filteredUi(ui))
                    },
                    drag: function(event, ui) {
                        self._trigger("drag", event, filteredUi(ui))
                    },
                    stop: function(event, ui) {
                        options.position = [ui.position.left - doc.scrollLeft(), ui.position.top - doc.scrollTop()], $(this).removeClass("ui-dialog-dragging").height(heightBeforeDrag), self._trigger("dragStop", event, filteredUi(ui)), $.ui.dialog.overlay.resize()
                    }
                })
            },
            _makeResizable: function(handles) {
                function filteredUi(ui) {
                    return {
                        originalPosition: ui.originalPosition,
                        originalSize: ui.originalSize,
                        position: ui.position,
                        size: ui.size
                    }
                }
                handles = handles === undefined ? this.options.resizable : handles;
                var self = this,
                    options = self.options,
                    position = self.uiDialog.css("position"),
                    resizeHandles = "string" == typeof handles ? handles : "n,e,s,w,se,sw,ne,nw";
                self.uiDialog.resizable({
                    cancel: ".ui-dialog-content",
                    containment: "document",
                    alsoResize: self.element,
                    maxWidth: options.maxWidth,
                    maxHeight: options.maxHeight,
                    minWidth: options.minWidth,
                    minHeight: self._minHeight(),
                    handles: resizeHandles,
                    start: function(event, ui) {
                        $(this).addClass("ui-dialog-resizing"), self._trigger("resizeStart", event, filteredUi(ui))
                    },
                    resize: function(event, ui) {
                        self._trigger("resize", event, filteredUi(ui))
                    },
                    stop: function(event, ui) {
                        $(this).removeClass("ui-dialog-resizing"), options.height = $(this).height(), options.width = $(this).width(), self._trigger("resizeStop", event, filteredUi(ui)), $.ui.dialog.overlay.resize()
                    }
                }).css("position", position).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
            },
            _minHeight: function() {
                var options = this.options;
                return "auto" === options.height ? options.minHeight : Math.min(options.minHeight, options.height)
            },
            _position: function(position) {
                var isVisible, myAt = [],
                    offset = [0, 0];
                position ? (("string" == typeof position || "object" == typeof position && "0" in position) && (myAt = position.split ? position.split(" ") : [position[0], position[1]], 1 === myAt.length && (myAt[1] = myAt[0]), $.each(["left", "top"], function(i, offsetPosition) {
                    +myAt[i] === myAt[i] && (offset[i] = myAt[i], myAt[i] = offsetPosition)
                }), position = {
                    my: myAt.join(" "),
                    at: myAt.join(" "),
                    offset: offset.join(" ")
                }), position = $.extend({}, $.ui.dialog.prototype.options.position, position)) : position = $.ui.dialog.prototype.options.position, isVisible = this.uiDialog.is(":visible"), isVisible || this.uiDialog.show(), this.uiDialog.css({
                    top: 0,
                    left: 0
                }).position($.extend({
                    of: window
                }, position)), isVisible || this.uiDialog.hide()
            },
            _setOptions: function(options) {
                var self = this,
                    resizableOptions = {},
                    resize = !1;
                $.each(options, function(key, value) {
                    self._setOption(key, value), key in sizeRelatedOptions && (resize = !0), key in resizableRelatedOptions && (resizableOptions[key] = value)
                }), resize && this._size(), this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", resizableOptions)
            },
            _setOption: function(key, value) {
                var self = this,
                    uiDialog = self.uiDialog;
                switch (key) {
                    case "beforeclose":
                        key = "beforeClose";
                        break;
                    case "buttons":
                        self._createButtons(value);
                        break;
                    case "closeText":
                        self.uiDialogTitlebarCloseText.text("" + value);
                        break;
                    case "dialogClass":
                        uiDialog.removeClass(self.options.dialogClass).addClass(uiDialogClasses + value);
                        break;
                    case "disabled":
                        value ? uiDialog.addClass("ui-dialog-disabled") : uiDialog.removeClass("ui-dialog-disabled");
                        break;
                    case "draggable":
                        var isDraggable = uiDialog.is(":data(draggable)");
                        isDraggable && !value && uiDialog.draggable("destroy"), !isDraggable && value && self._makeDraggable();
                        break;
                    case "position":
                        self._position(value);
                        break;
                    case "resizable":
                        var isResizable = uiDialog.is(":data(resizable)");
                        isResizable && !value && uiDialog.resizable("destroy"), isResizable && "string" == typeof value && uiDialog.resizable("option", "handles", value), isResizable || value === !1 || self._makeResizable(value);
                        break;
                    case "title":
                        $(".ui-dialog-title", self.uiDialogTitlebar).html("" + (value || "&#160;"))
                }
                $.Widget.prototype._setOption.apply(self, arguments)
            },
            _size: function() {
                var nonContentHeight, minContentHeight, options = this.options,
                    isVisible = this.uiDialog.is(":visible");
                if (this.element.show().css({
                        width: "auto",
                        minHeight: 0,
                        height: 0
                    }), options.minWidth > options.width && (options.width = options.minWidth), nonContentHeight = this.uiDialog.css({
                        height: "auto",
                        width: options.width
                    }).height(), minContentHeight = Math.max(0, options.minHeight - nonContentHeight), "auto" === options.height)
                    if ($.support.minHeight) this.element.css({
                        minHeight: minContentHeight,
                        height: "auto"
                    });
                    else {
                        this.uiDialog.show();
                        var autoHeight = this.element.css("height", "auto").height();
                        isVisible || this.uiDialog.hide(), this.element.height(Math.max(autoHeight, minContentHeight))
                    }
                else this.element.height(Math.max(options.height - nonContentHeight, 0));
                this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
            }
        }), $.extend($.ui.dialog, {
            version: "1.8.23",
            uuid: 0,
            maxZ: 0,
            getTitleId: function($el) {
                var id = $el.attr("id");
                return id || (this.uuid += 1, id = this.uuid), "ui-dialog-title-" + id
            },
            overlay: function(dialog) {
                this.$el = $.ui.dialog.overlay.create(dialog)
            }
        }), $.extend($.ui.dialog.overlay, {
            instances: [],
            oldInstances: [],
            maxZ: 0,
            events: $.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function(event) {
                return event + ".dialog-overlay"
            }).join(" "),
            create: function(dialog) {
                0 === this.instances.length && (setTimeout(function() {
                    $.ui.dialog.overlay.instances.length && $(document).bind($.ui.dialog.overlay.events, function(event) {
                        return $(event.target).zIndex() < $.ui.dialog.overlay.maxZ ? !1 : void 0
                    })
                }, 1), $(document).bind("keydown.dialog-overlay", function(event) {
                    dialog.options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode && event.keyCode === $.ui.keyCode.ESCAPE && (dialog.close(event), event.preventDefault())
                }), $(window).bind("resize.dialog-overlay", $.ui.dialog.overlay.resize));
                var $el = (this.oldInstances.pop() || $("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({
                    width: this.width(),
                    height: this.height()
                });
                return $.fn.bgiframe && $el.bgiframe(), this.instances.push($el), $el
            },
            destroy: function($el) {
                var indexOf = $.inArray($el, this.instances); - 1 != indexOf && this.oldInstances.push(this.instances.splice(indexOf, 1)[0]), 0 === this.instances.length && $([document, window]).unbind(".dialog-overlay"), $el.remove();
                var maxZ = 0;
                $.each(this.instances, function() {
                    maxZ = Math.max(maxZ, this.css("z-index"))
                }), this.maxZ = maxZ
            },
            height: function() {
                var scrollHeight, offsetHeight;
                return $.browser.msie && $.browser.version < 7 ? (scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight), offsetHeight = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight), offsetHeight > scrollHeight ? $(window).height() + "px" : scrollHeight + "px") : $(document).height() + "px"
            },
            width: function() {
                var scrollWidth, offsetWidth;
                return $.browser.msie ? (scrollWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth), offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth), offsetWidth > scrollWidth ? $(window).width() + "px" : scrollWidth + "px") : $(document).width() + "px"
            },
            resize: function() {
                var $overlays = $([]);
                $.each($.ui.dialog.overlay.instances, function() {
                    $overlays = $overlays.add(this)
                }), $overlays.css({
                    width: 0,
                    height: 0
                }).css({
                    width: $.ui.dialog.overlay.width(),
                    height: $.ui.dialog.overlay.height()
                })
            }
        }), $.extend($.ui.dialog.overlay.prototype, {
            destroy: function() {
                $.ui.dialog.overlay.destroy(this.$el)
            }
        })
    }(jQuery),
    function($) {
        $.ui = $.ui || {};
        var horizontalPositions = /left|center|right/,
            verticalPositions = /top|center|bottom/,
            center = "center",
            support = {},
            _position = $.fn.position,
            _offset = $.fn.offset;
        $.fn.position = function(options) {
                if (!options || !options.of) return _position.apply(this, arguments);
                options = $.extend({}, options);
                var targetWidth, targetHeight, basePosition, target = $(options.of),
                    targetElem = target[0],
                    collision = (options.collision || "flip").split(" "),
                    offset = options.offset ? options.offset.split(" ") : [0, 0];
                return 9 === targetElem.nodeType ? (targetWidth = target.width(), targetHeight = target.height(), basePosition = {
                    top: 0,
                    left: 0
                }) : targetElem.setTimeout ? (targetWidth = target.width(), targetHeight = target.height(), basePosition = {
                    top: target.scrollTop(),
                    left: target.scrollLeft()
                }) : targetElem.preventDefault ? (options.at = "left top", targetWidth = targetHeight = 0, basePosition = {
                    top: options.of.pageY,
                    left: options.of.pageX
                }) : (targetWidth = target.outerWidth(), targetHeight = target.outerHeight(), basePosition = target.offset()), $.each(["my", "at"], function() {
                    var pos = (options[this] || "").split(" ");
                    1 === pos.length && (pos = horizontalPositions.test(pos[0]) ? pos.concat([center]) : verticalPositions.test(pos[0]) ? [center].concat(pos) : [center, center]), pos[0] = horizontalPositions.test(pos[0]) ? pos[0] : center, pos[1] = verticalPositions.test(pos[1]) ? pos[1] : center, options[this] = pos
                }), 1 === collision.length && (collision[1] = collision[0]), offset[0] = parseInt(offset[0], 10) || 0, 1 === offset.length && (offset[1] = offset[0]), offset[1] = parseInt(offset[1], 10) || 0, "right" === options.at[0] ? basePosition.left += targetWidth : options.at[0] === center && (basePosition.left += targetWidth / 2), "bottom" === options.at[1] ? basePosition.top += targetHeight : options.at[1] === center && (basePosition.top += targetHeight / 2), basePosition.left += offset[0], basePosition.top += offset[1], this.each(function() {
                    var collisionPosition, elem = $(this),
                        elemWidth = elem.outerWidth(),
                        elemHeight = elem.outerHeight(),
                        marginLeft = parseInt($.curCSS(this, "marginLeft", !0)) || 0,
                        marginTop = parseInt($.curCSS(this, "marginTop", !0)) || 0,
                        collisionWidth = elemWidth + marginLeft + (parseInt($.curCSS(this, "marginRight", !0)) || 0),
                        collisionHeight = elemHeight + marginTop + (parseInt($.curCSS(this, "marginBottom", !0)) || 0),
                        position = $.extend({}, basePosition);
                    "right" === options.my[0] ? position.left -= elemWidth : options.my[0] === center && (position.left -= elemWidth / 2), "bottom" === options.my[1] ? position.top -= elemHeight : options.my[1] === center && (position.top -= elemHeight / 2), support.fractions || (position.left = Math.round(position.left), position.top = Math.round(position.top)), collisionPosition = {
                        left: position.left - marginLeft,
                        top: position.top - marginTop
                    }, $.each(["left", "top"], function(i, dir) {
                        $.ui.position[collision[i]] && $.ui.position[collision[i]][dir](position, {
                            targetWidth: targetWidth,
                            targetHeight: targetHeight,
                            elemWidth: elemWidth,
                            elemHeight: elemHeight,
                            collisionPosition: collisionPosition,
                            collisionWidth: collisionWidth,
                            collisionHeight: collisionHeight,
                            offset: offset,
                            my: options.my,
                            at: options.at
                        })
                    }), $.fn.bgiframe && elem.bgiframe(), elem.offset($.extend(position, {
                        using: options.using
                    }))
                })
            }, $.ui.position = {
                fit: {
                    left: function(position, data) {
                        var win = $(window),
                            over = data.collisionPosition.left + data.collisionWidth - win.width() - win.scrollLeft();
                        position.left = over > 0 ? position.left - over : Math.max(position.left - data.collisionPosition.left, position.left)
                    },
                    top: function(position, data) {
                        var win = $(window),
                            over = data.collisionPosition.top + data.collisionHeight - win.height() - win.scrollTop();
                        position.top = over > 0 ? position.top - over : Math.max(position.top - data.collisionPosition.top, position.top)
                    }
                },
                flip: {
                    left: function(position, data) {
                        if (data.at[0] !== center) {
                            var win = $(window),
                                over = data.collisionPosition.left + data.collisionWidth - win.width() - win.scrollLeft(),
                                myOffset = "left" === data.my[0] ? -data.elemWidth : "right" === data.my[0] ? data.elemWidth : 0,
                                atOffset = "left" === data.at[0] ? data.targetWidth : -data.targetWidth,
                                offset = -2 * data.offset[0];
                            position.left += data.collisionPosition.left < 0 ? myOffset + atOffset + offset : over > 0 ? myOffset + atOffset + offset : 0
                        }
                    },
                    top: function(position, data) {
                        if (data.at[1] !== center) {
                            var win = $(window),
                                over = data.collisionPosition.top + data.collisionHeight - win.height() - win.scrollTop(),
                                myOffset = "top" === data.my[1] ? -data.elemHeight : "bottom" === data.my[1] ? data.elemHeight : 0,
                                atOffset = "top" === data.at[1] ? data.targetHeight : -data.targetHeight,
                                offset = -2 * data.offset[1];
                            position.top += data.collisionPosition.top < 0 ? myOffset + atOffset + offset : over > 0 ? myOffset + atOffset + offset : 0
                        }
                    }
                }
            }, $.offset.setOffset || ($.offset.setOffset = function(elem, options) {
                /static/.test($.curCSS(elem, "position")) && (elem.style.position = "relative");
                var curElem = $(elem),
                    curOffset = curElem.offset(),
                    curTop = parseInt($.curCSS(elem, "top", !0), 10) || 0,
                    curLeft = parseInt($.curCSS(elem, "left", !0), 10) || 0,
                    props = {
                        top: options.top - curOffset.top + curTop,
                        left: options.left - curOffset.left + curLeft
                    };
                "using" in options ? options.using.call(elem, props) : curElem.css(props)
            }, $.fn.offset = function(options) {
                var elem = this[0];
                return elem && elem.ownerDocument ? options ? $.isFunction(options) ? this.each(function(i) {
                    $(this).offset(options.call(this, i, $(this).offset()))
                }) : this.each(function() {
                    $.offset.setOffset(this, options)
                }) : _offset.call(this) : null
            }), $.curCSS || ($.curCSS = $.css),
            function() {
                var testElement, testElementParent, testElementStyle, offset, offsetTotal, body = document.getElementsByTagName("body")[0],
                    div = document.createElement("div");
                testElement = document.createElement(body ? "div" : "body"), testElementStyle = {
                    visibility: "hidden",
                    width: 0,
                    height: 0,
                    border: 0,
                    margin: 0,
                    background: "none"
                }, body && $.extend(testElementStyle, {
                    position: "absolute",
                    left: "-1000px",
                    top: "-1000px"
                });
                for (var i in testElementStyle) testElement.style[i] = testElementStyle[i];
                testElement.appendChild(div), testElementParent = body || document.documentElement, testElementParent.insertBefore(testElement, testElementParent.firstChild), div.style.cssText = "position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;", offset = $(div).offset(function(_, offset) {
                    return offset
                }).offset(), testElement.innerHTML = "", testElementParent.removeChild(testElement), offsetTotal = offset.top + offset.left + (body ? 2e3 : 0), support.fractions = offsetTotal > 21 && 22 > offsetTotal
            }()
    }(jQuery),
    function($, undefined) {
        $.widget("ui.progressbar", {
            options: {
                value: 0,
                max: 100
            },
            min: 0,
            _create: function() {
                this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                    role: "progressbar",
                    "aria-valuemin": this.min,
                    "aria-valuemax": this.options.max,
                    "aria-valuenow": this._value()
                }), this.valueDiv = $("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), this.oldValue = this._value(), this._refreshValue()
            },
            destroy: function() {
                this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.valueDiv.remove(), $.Widget.prototype.destroy.apply(this, arguments)
            },
            value: function(newValue) {
                return newValue === undefined ? this._value() : (this._setOption("value", newValue), this)
            },
            _setOption: function(key, value) {
                "value" === key && (this.options.value = value, this._refreshValue(), this._value() === this.options.max && this._trigger("complete")), $.Widget.prototype._setOption.apply(this, arguments)
            },
            _value: function() {
                var val = this.options.value;
                return "number" != typeof val && (val = 0), Math.min(this.options.max, Math.max(this.min, val))
            },
            _percentage: function() {
                return 100 * this._value() / this.options.max
            },
            _refreshValue: function() {
                var value = this.value(),
                    percentage = this._percentage();
                this.oldValue !== value && (this.oldValue = value, this._trigger("change")), this.valueDiv.toggle(value > this.min).toggleClass("ui-corner-right", value === this.options.max).width(percentage.toFixed(0) + "%"), this.element.attr("aria-valuenow", value)
            }
        }), $.extend($.ui.progressbar, {
            version: "1.8.23"
        })
    }(jQuery),
    function($) {
        var numPages = 5;
        $.widget("ui.slider", $.ui.mouse, {
            widgetEventPrefix: "slide",
            options: {
                animate: !1,
                distance: 0,
                max: 100,
                min: 0,
                orientation: "horizontal",
                range: !1,
                step: 1,
                value: 0,
                values: null
            },
            _create: function() {
                var self = this,
                    o = this.options,
                    existingHandles = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                    handle = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
                    handleCount = o.values && o.values.length || 1,
                    handles = [];
                this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all" + (o.disabled ? " ui-slider-disabled ui-disabled" : "")), this.range = $([]), o.range && (o.range === !0 && (o.values || (o.values = [this._valueMin(), this._valueMin()]), o.values.length && 2 !== o.values.length && (o.values = [o.values[0], o.values[0]])), this.range = $("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header" + ("min" === o.range || "max" === o.range ? " ui-slider-range-" + o.range : "")));
                for (var i = existingHandles.length; handleCount > i; i += 1) handles.push(handle);
                this.handles = existingHandles.add($(handles.join("")).appendTo(self.element)), this.handle = this.handles.eq(0), this.handles.add(this.range).filter("a").click(function(event) {
                    event.preventDefault()
                }).hover(function() {
                    o.disabled || $(this).addClass("ui-state-hover")
                }, function() {
                    $(this).removeClass("ui-state-hover")
                }).focus(function() {
                    o.disabled ? $(this).blur() : ($(".ui-slider .ui-state-focus").removeClass("ui-state-focus"), $(this).addClass("ui-state-focus"))
                }).blur(function() {
                    $(this).removeClass("ui-state-focus")
                }), this.handles.each(function(i) {
                    $(this).data("index.ui-slider-handle", i)
                }), this.handles.keydown(function(event) {
                    var allowed, curVal, newVal, step, index = $(this).data("index.ui-slider-handle");
                    if (!self.options.disabled) {
                        switch (event.keyCode) {
                            case $.ui.keyCode.HOME:
                            case $.ui.keyCode.END:
                            case $.ui.keyCode.PAGE_UP:
                            case $.ui.keyCode.PAGE_DOWN:
                            case $.ui.keyCode.UP:
                            case $.ui.keyCode.RIGHT:
                            case $.ui.keyCode.DOWN:
                            case $.ui.keyCode.LEFT:
                                if (event.preventDefault(), !self._keySliding && (self._keySliding = !0, $(this).addClass("ui-state-active"), allowed = self._start(event, index), allowed === !1)) return
                        }
                        switch (step = self.options.step, curVal = newVal = self.options.values && self.options.values.length ? self.values(index) : self.value(), event.keyCode) {
                            case $.ui.keyCode.HOME:
                                newVal = self._valueMin();
                                break;
                            case $.ui.keyCode.END:
                                newVal = self._valueMax();
                                break;
                            case $.ui.keyCode.PAGE_UP:
                                newVal = self._trimAlignValue(curVal + (self._valueMax() - self._valueMin()) / numPages);
                                break;
                            case $.ui.keyCode.PAGE_DOWN:
                                newVal = self._trimAlignValue(curVal - (self._valueMax() - self._valueMin()) / numPages);
                                break;
                            case $.ui.keyCode.UP:
                            case $.ui.keyCode.RIGHT:
                                if (curVal === self._valueMax()) return;
                                newVal = self._trimAlignValue(curVal + step);
                                break;
                            case $.ui.keyCode.DOWN:
                            case $.ui.keyCode.LEFT:
                                if (curVal === self._valueMin()) return;
                                newVal = self._trimAlignValue(curVal - step)
                        }
                        self._slide(event, index, newVal)
                    }
                }).keyup(function(event) {
                    var index = $(this).data("index.ui-slider-handle");
                    self._keySliding && (self._keySliding = !1, self._stop(event, index), self._change(event, index), $(this).removeClass("ui-state-active"))
                }), this._refreshValue(), this._animateOff = !1
            },
            destroy: function() {
                return this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider"), this._mouseDestroy(), this
            },
            _mouseCapture: function(event) {
                var position, normValue, distance, closestHandle, self, index, allowed, offset, mouseOverHandle, o = this.options;
                return o.disabled ? !1 : (this.elementSize = {
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight()
                }, this.elementOffset = this.element.offset(), position = {
                    x: event.pageX,
                    y: event.pageY
                }, normValue = this._normValueFromMouse(position), distance = this._valueMax() - this._valueMin() + 1, self = this, this.handles.each(function(i) {
                    var thisDistance = Math.abs(normValue - self.values(i));
                    distance > thisDistance && (distance = thisDistance, closestHandle = $(this), index = i)
                }), o.range === !0 && this.values(1) === o.min && (index += 1, closestHandle = $(this.handles[index])), allowed = this._start(event, index), allowed === !1 ? !1 : (this._mouseSliding = !0, self._handleIndex = index, closestHandle.addClass("ui-state-active").focus(), offset = closestHandle.offset(), mouseOverHandle = !$(event.target).parents().andSelf().is(".ui-slider-handle"), this._clickOffset = mouseOverHandle ? {
                    left: 0,
                    top: 0
                } : {
                    left: event.pageX - offset.left - closestHandle.width() / 2,
                    top: event.pageY - offset.top - closestHandle.height() / 2 - (parseInt(closestHandle.css("borderTopWidth"), 10) || 0) - (parseInt(closestHandle.css("borderBottomWidth"), 10) || 0) + (parseInt(closestHandle.css("marginTop"), 10) || 0)
                }, this.handles.hasClass("ui-state-hover") || this._slide(event, index, normValue), this._animateOff = !0, !0))
            },
            _mouseStart: function() {
                return !0
            },
            _mouseDrag: function(event) {
                var position = {
                        x: event.pageX,
                        y: event.pageY
                    },
                    normValue = this._normValueFromMouse(position);
                return this._slide(event, this._handleIndex, normValue), !1
            },
            _mouseStop: function(event) {
                return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(event, this._handleIndex), this._change(event, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
            },
            _detectOrientation: function() {
                this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
            },
            _normValueFromMouse: function(position) {
                var pixelTotal, pixelMouse, percentMouse, valueTotal, valueMouse;
                return "horizontal" === this.orientation ? (pixelTotal = this.elementSize.width, pixelMouse = position.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (pixelTotal = this.elementSize.height, pixelMouse = position.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), percentMouse = pixelMouse / pixelTotal, percentMouse > 1 && (percentMouse = 1), 0 > percentMouse && (percentMouse = 0), "vertical" === this.orientation && (percentMouse = 1 - percentMouse), valueTotal = this._valueMax() - this._valueMin(), valueMouse = this._valueMin() + percentMouse * valueTotal, this._trimAlignValue(valueMouse)
            },
            _start: function(event, index) {
                var uiHash = {
                    handle: this.handles[index],
                    value: this.value()
                };
                return this.options.values && this.options.values.length && (uiHash.value = this.values(index), uiHash.values = this.values()), this._trigger("start", event, uiHash)
            },
            _slide: function(event, index, newVal) {
                var otherVal, newValues, allowed;
                this.options.values && this.options.values.length ? (otherVal = this.values(index ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === index && newVal > otherVal || 1 === index && otherVal > newVal) && (newVal = otherVal), newVal !== this.values(index) && (newValues = this.values(), newValues[index] = newVal, allowed = this._trigger("slide", event, {
                    handle: this.handles[index],
                    value: newVal,
                    values: newValues
                }), otherVal = this.values(index ? 0 : 1), allowed !== !1 && this.values(index, newVal, !0))) : newVal !== this.value() && (allowed = this._trigger("slide", event, {
                    handle: this.handles[index],
                    value: newVal
                }), allowed !== !1 && this.value(newVal))
            },
            _stop: function(event, index) {
                var uiHash = {
                    handle: this.handles[index],
                    value: this.value()
                };
                this.options.values && this.options.values.length && (uiHash.value = this.values(index), uiHash.values = this.values()), this._trigger("stop", event, uiHash)
            },
            _change: function(event, index) {
                if (!this._keySliding && !this._mouseSliding) {
                    var uiHash = {
                        handle: this.handles[index],
                        value: this.value()
                    };
                    this.options.values && this.options.values.length && (uiHash.value = this.values(index), uiHash.values = this.values()), this._trigger("change", event, uiHash)
                }
            },
            value: function(newValue) {
                return arguments.length ? (this.options.value = this._trimAlignValue(newValue), this._refreshValue(), this._change(null, 0), void 0) : this._value()
            },
            values: function(index, newValue) {
                var vals, newValues, i;
                if (arguments.length > 1) return this.options.values[index] = this._trimAlignValue(newValue), this._refreshValue(), this._change(null, index), void 0;
                if (!arguments.length) return this._values();
                if (!$.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(index) : this.value();
                for (vals = this.options.values, newValues = arguments[0], i = 0; i < vals.length; i += 1) vals[i] = this._trimAlignValue(newValues[i]), this._change(null, i);
                this._refreshValue()
            },
            _setOption: function(key, value) {
                var i, valsLength = 0;
                switch ($.isArray(this.options.values) && (valsLength = this.options.values.length), $.Widget.prototype._setOption.apply(this, arguments), key) {
                    case "disabled":
                        value ? (this.handles.filter(".ui-state-focus").blur(), this.handles.removeClass("ui-state-hover"), this.handles.propAttr("disabled", !0), this.element.addClass("ui-disabled")) : (this.handles.propAttr("disabled", !1), this.element.removeClass("ui-disabled"));
                        break;
                    case "orientation":
                        this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
                        break;
                    case "value":
                        this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                        break;
                    case "values":
                        for (this._animateOff = !0, this._refreshValue(), i = 0; valsLength > i; i += 1) this._change(null, i);
                        this._animateOff = !1
                }
            },
            _value: function() {
                var val = this.options.value;
                return val = this._trimAlignValue(val)
            },
            _values: function(index) {
                var val, vals, i;
                if (arguments.length) return val = this.options.values[index], val = this._trimAlignValue(val);
                for (vals = this.options.values.slice(), i = 0; i < vals.length; i += 1) vals[i] = this._trimAlignValue(vals[i]);
                return vals
            },
            _trimAlignValue: function(val) {
                if (val <= this._valueMin()) return this._valueMin();
                if (val >= this._valueMax()) return this._valueMax();
                var step = this.options.step > 0 ? this.options.step : 1,
                    valModStep = (val - this._valueMin()) % step,
                    alignValue = val - valModStep;
                return 2 * Math.abs(valModStep) >= step && (alignValue += valModStep > 0 ? step : -step), parseFloat(alignValue.toFixed(5))
            },
            _valueMin: function() {
                return this.options.min
            },
            _valueMax: function() {
                return this.options.max
            },
            _refreshValue: function() {
                var valPercent, lastValPercent, value, valueMin, valueMax, oRange = this.options.range,
                    o = this.options,
                    self = this,
                    animate = this._animateOff ? !1 : o.animate,
                    _set = {};
                this.options.values && this.options.values.length ? this.handles.each(function(i) {
                    valPercent = (self.values(i) - self._valueMin()) / (self._valueMax() - self._valueMin()) * 100, _set["horizontal" === self.orientation ? "left" : "bottom"] = valPercent + "%", $(this).stop(1, 1)[animate ? "animate" : "css"](_set, o.animate), self.options.range === !0 && ("horizontal" === self.orientation ? (0 === i && self.range.stop(1, 1)[animate ? "animate" : "css"]({
                        left: valPercent + "%"
                    }, o.animate), 1 === i && self.range[animate ? "animate" : "css"]({
                        width: valPercent - lastValPercent + "%"
                    }, {
                        queue: !1,
                        duration: o.animate
                    })) : (0 === i && self.range.stop(1, 1)[animate ? "animate" : "css"]({
                        bottom: valPercent + "%"
                    }, o.animate), 1 === i && self.range[animate ? "animate" : "css"]({
                        height: valPercent - lastValPercent + "%"
                    }, {
                        queue: !1,
                        duration: o.animate
                    }))), lastValPercent = valPercent
                }) : (value = this.value(), valueMin = this._valueMin(), valueMax = this._valueMax(), valPercent = valueMax !== valueMin ? (value - valueMin) / (valueMax - valueMin) * 100 : 0, _set["horizontal" === self.orientation ? "left" : "bottom"] = valPercent + "%", this.handle.stop(1, 1)[animate ? "animate" : "css"](_set, o.animate), "min" === oRange && "horizontal" === this.orientation && this.range.stop(1, 1)[animate ? "animate" : "css"]({
                    width: valPercent + "%"
                }, o.animate), "max" === oRange && "horizontal" === this.orientation && this.range[animate ? "animate" : "css"]({
                    width: 100 - valPercent + "%"
                }, {
                    queue: !1,
                    duration: o.animate
                }), "min" === oRange && "vertical" === this.orientation && this.range.stop(1, 1)[animate ? "animate" : "css"]({
                    height: valPercent + "%"
                }, o.animate), "max" === oRange && "vertical" === this.orientation && this.range[animate ? "animate" : "css"]({
                    height: 100 - valPercent + "%"
                }, {
                    queue: !1,
                    duration: o.animate
                }))
            }
        }), $.extend($.ui.slider, {
            version: "1.8.23"
        })
    }(jQuery),
    function($, undefined) {
        function getNextTabId() {
            return ++tabId
        }

        function getNextListId() {
            return ++listId
        }
        var tabId = 0,
            listId = 0;
        $.widget("ui.tabs", {
            options: {
                add: null,
                ajaxOptions: null,
                cache: !1,
                cookie: null,
                collapsible: !1,
                disable: null,
                disabled: [],
                enable: null,
                event: "click",
                fx: null,
                idPrefix: "ui-tabs-",
                load: null,
                panelTemplate: "<div></div>",
                remove: null,
                select: null,
                show: null,
                spinner: "<em>Loading&#8230;</em>",
                tabTemplate: "<li><a href='#{href}'><span>#{label}</span></a></li>"
            },
            _create: function() {
                this._tabify(!0)
            },
            _setOption: function(key, value) {
                if ("selected" == key) {
                    if (this.options.collapsible && value == this.options.selected) return;
                    this.select(value)
                } else this.options[key] = value, this._tabify()
            },
            _tabId: function(a) {
                return a.title && a.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF-]/g, "") || this.options.idPrefix + getNextTabId()
            },
            _sanitizeSelector: function(hash) {
                return hash.replace(/:/g, "\\:")
            },
            _cookie: function() {
                var cookie = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + getNextListId());
                return $.cookie.apply(null, [cookie].concat($.makeArray(arguments)))
            },
            _ui: function(tab, panel) {
                return {
                    tab: tab,
                    panel: panel,
                    index: this.anchors.index(tab)
                }
            },
            _cleanup: function() {
                this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function() {
                    var el = $(this);
                    el.html(el.data("label.tabs")).removeData("label.tabs")
                })
            },
            _tabify: function(init) {
                function resetStyle($el, fx) {
                    $el.css("display", ""), !$.support.opacity && fx.opacity && $el[0].style.removeAttribute("filter")
                }
                var self = this,
                    o = this.options,
                    fragmentId = /^#.+/;
                this.list = this.element.find("ol,ul").eq(0), this.lis = $(" > li:has(a[href])", this.list), this.anchors = this.lis.map(function() {
                    return $("a", this)[0]
                }), this.panels = $([]), this.anchors.each(function(i, a) {
                    var baseEl, href = $(a).attr("href"),
                        hrefBase = href.split("#")[0];
                    if (hrefBase && (hrefBase === location.toString().split("#")[0] || (baseEl = $("base")[0]) && hrefBase === baseEl.href) && (href = a.hash, a.href = href), fragmentId.test(href)) self.panels = self.panels.add(self.element.find(self._sanitizeSelector(href)));
                    else if (href && "#" !== href) {
                        $.data(a, "href.tabs", href), $.data(a, "load.tabs", href.replace(/#.*$/, ""));
                        var id = self._tabId(a);
                        a.href = "#" + id;
                        var $panel = self.element.find("#" + id);
                        $panel.length || ($panel = $(o.panelTemplate).attr("id", id).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(self.panels[i - 1] || self.list), $panel.data("destroy.tabs", !0)), self.panels = self.panels.add($panel)
                    } else o.disabled.push(i)
                }), init ? (this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all"), this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"), this.lis.addClass("ui-state-default ui-corner-top"), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom"), o.selected === undefined ? (location.hash && this.anchors.each(function(i, a) {
                    return a.hash == location.hash ? (o.selected = i, !1) : void 0
                }), "number" != typeof o.selected && o.cookie && (o.selected = parseInt(self._cookie(), 10)), "number" != typeof o.selected && this.lis.filter(".ui-tabs-selected").length && (o.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"))), o.selected = o.selected || (this.lis.length ? 0 : -1)) : null === o.selected && (o.selected = -1), o.selected = o.selected >= 0 && this.anchors[o.selected] || o.selected < 0 ? o.selected : 0, o.disabled = $.unique(o.disabled.concat($.map(this.lis.filter(".ui-state-disabled"), function(n) {
                    return self.lis.index(n)
                }))).sort(), -1 != $.inArray(o.selected, o.disabled) && o.disabled.splice($.inArray(o.selected, o.disabled), 1), this.panels.addClass("ui-tabs-hide"), this.lis.removeClass("ui-tabs-selected ui-state-active"), o.selected >= 0 && this.anchors.length && (self.element.find(self._sanitizeSelector(self.anchors[o.selected].hash)).removeClass("ui-tabs-hide"), this.lis.eq(o.selected).addClass("ui-tabs-selected ui-state-active"), self.element.queue("tabs", function() {
                    self._trigger("show", null, self._ui(self.anchors[o.selected], self.element.find(self._sanitizeSelector(self.anchors[o.selected].hash))[0]))
                }), this.load(o.selected)), $(window).bind("unload", function() {
                    self.lis.add(self.anchors).unbind(".tabs"), self.lis = self.anchors = self.panels = null
                })) : o.selected = this.lis.index(this.lis.filter(".ui-tabs-selected")), this.element[o.collapsible ? "addClass" : "removeClass"]("ui-tabs-collapsible"), o.cookie && this._cookie(o.selected, o.cookie);
                for (var li, i = 0; li = this.lis[i]; i++) $(li)[-1 == $.inArray(i, o.disabled) || $(li).hasClass("ui-tabs-selected") ? "removeClass" : "addClass"]("ui-state-disabled");
                if (o.cache === !1 && this.anchors.removeData("cache.tabs"), this.lis.add(this.anchors).unbind(".tabs"), "mouseover" !== o.event) {
                    var addState = function(state, el) {
                            el.is(":not(.ui-state-disabled)") && el.addClass("ui-state-" + state)
                        },
                        removeState = function(state, el) {
                            el.removeClass("ui-state-" + state)
                        };
                    this.lis.bind("mouseover.tabs", function() {
                        addState("hover", $(this))
                    }), this.lis.bind("mouseout.tabs", function() {
                        removeState("hover", $(this))
                    }), this.anchors.bind("focus.tabs", function() {
                        addState("focus", $(this).closest("li"))
                    }), this.anchors.bind("blur.tabs", function() {
                        removeState("focus", $(this).closest("li"))
                    })
                }
                var hideFx, showFx;
                o.fx && ($.isArray(o.fx) ? (hideFx = o.fx[0], showFx = o.fx[1]) : hideFx = showFx = o.fx);
                var showTab = showFx ? function(clicked, $show) {
                        $(clicked).closest("li").addClass("ui-tabs-selected ui-state-active"), $show.hide().removeClass("ui-tabs-hide").animate(showFx, showFx.duration || "normal", function() {
                            resetStyle($show, showFx), self._trigger("show", null, self._ui(clicked, $show[0]))
                        })
                    } : function(clicked, $show) {
                        $(clicked).closest("li").addClass("ui-tabs-selected ui-state-active"), $show.removeClass("ui-tabs-hide"), self._trigger("show", null, self._ui(clicked, $show[0]))
                    },
                    hideTab = hideFx ? function(clicked, $hide) {
                        $hide.animate(hideFx, hideFx.duration || "normal", function() {
                            self.lis.removeClass("ui-tabs-selected ui-state-active"), $hide.addClass("ui-tabs-hide"), resetStyle($hide, hideFx), self.element.dequeue("tabs")
                        })
                    } : function(clicked, $hide) {
                        self.lis.removeClass("ui-tabs-selected ui-state-active"), $hide.addClass("ui-tabs-hide"), self.element.dequeue("tabs")
                    };
                this.anchors.bind(o.event + ".tabs", function() {
                    var el = this,
                        $li = $(el).closest("li"),
                        $hide = self.panels.filter(":not(.ui-tabs-hide)"),
                        $show = self.element.find(self._sanitizeSelector(el.hash));
                    if ($li.hasClass("ui-tabs-selected") && !o.collapsible || $li.hasClass("ui-state-disabled") || $li.hasClass("ui-state-processing") || self.panels.filter(":animated").length || self._trigger("select", null, self._ui(this, $show[0])) === !1) return this.blur(), !1;
                    if (o.selected = self.anchors.index(this), self.abort(), o.collapsible) {
                        if ($li.hasClass("ui-tabs-selected")) return o.selected = -1, o.cookie && self._cookie(o.selected, o.cookie), self.element.queue("tabs", function() {
                            hideTab(el, $hide)
                        }).dequeue("tabs"), this.blur(), !1;
                        if (!$hide.length) return o.cookie && self._cookie(o.selected, o.cookie), self.element.queue("tabs", function() {
                            showTab(el, $show)
                        }), self.load(self.anchors.index(this)), this.blur(), !1
                    }
                    if (o.cookie && self._cookie(o.selected, o.cookie), !$show.length) throw "jQuery UI Tabs: Mismatching fragment identifier.";
                    $hide.length && self.element.queue("tabs", function() {
                        hideTab(el, $hide)
                    }), self.element.queue("tabs", function() {
                        showTab(el, $show)
                    }), self.load(self.anchors.index(this)), $.browser.msie && this.blur()
                }), this.anchors.bind("click.tabs", function() {
                    return !1
                })
            },
            _getIndex: function(index) {
                return "string" == typeof index && (index = this.anchors.index(this.anchors.filter("[href$='" + index + "']"))), index
            },
            destroy: function() {
                var o = this.options;
                return this.abort(), this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs"), this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"), this.anchors.each(function() {
                    var href = $.data(this, "href.tabs");
                    href && (this.href = href);
                    var $this = $(this).unbind(".tabs");
                    $.each(["href", "load", "cache"], function(i, prefix) {
                        $this.removeData(prefix + ".tabs")
                    })
                }), this.lis.unbind(".tabs").add(this.panels).each(function() {
                    $.data(this, "destroy.tabs") ? $(this).remove() : $(this).removeClass(["ui-state-default", "ui-corner-top", "ui-tabs-selected", "ui-state-active", "ui-state-hover", "ui-state-focus", "ui-state-disabled", "ui-tabs-panel", "ui-widget-content", "ui-corner-bottom", "ui-tabs-hide"].join(" "))
                }), o.cookie && this._cookie(null, o.cookie), this
            },
            add: function(url, label, index) {
                index === undefined && (index = this.anchors.length);
                var self = this,
                    o = this.options,
                    $li = $(o.tabTemplate.replace(/#\{href\}/g, url).replace(/#\{label\}/g, label)),
                    id = url.indexOf("#") ? this._tabId($("a", $li)[0]) : url.replace("#", "");
                $li.addClass("ui-state-default ui-corner-top").data("destroy.tabs", !0);
                var $panel = self.element.find("#" + id);
                return $panel.length || ($panel = $(o.panelTemplate).attr("id", id).data("destroy.tabs", !0)), $panel.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"), index >= this.lis.length ? ($li.appendTo(this.list), $panel.appendTo(this.list[0].parentNode)) : ($li.insertBefore(this.lis[index]), $panel.insertBefore(this.panels[index])), o.disabled = $.map(o.disabled, function(n) {
                    return n >= index ? ++n : n
                }), this._tabify(), 1 == this.anchors.length && (o.selected = 0, $li.addClass("ui-tabs-selected ui-state-active"), $panel.removeClass("ui-tabs-hide"), this.element.queue("tabs", function() {
                    self._trigger("show", null, self._ui(self.anchors[0], self.panels[0]))
                }), this.load(0)), this._trigger("add", null, this._ui(this.anchors[index], this.panels[index])), this
            },
            remove: function(index) {
                index = this._getIndex(index);
                var o = this.options,
                    $li = this.lis.eq(index).remove(),
                    $panel = this.panels.eq(index).remove();
                return $li.hasClass("ui-tabs-selected") && this.anchors.length > 1 && this.select(index + (index + 1 < this.anchors.length ? 1 : -1)), o.disabled = $.map($.grep(o.disabled, function(n) {
                    return n != index
                }), function(n) {
                    return n >= index ? --n : n
                }), this._tabify(), this._trigger("remove", null, this._ui($li.find("a")[0], $panel[0])), this
            },
            enable: function(index) {
                index = this._getIndex(index);
                var o = this.options;
                if (-1 != $.inArray(index, o.disabled)) return this.lis.eq(index).removeClass("ui-state-disabled"), o.disabled = $.grep(o.disabled, function(n) {
                    return n != index
                }), this._trigger("enable", null, this._ui(this.anchors[index], this.panels[index])), this
            },
            disable: function(index) {
                index = this._getIndex(index);
                var o = this.options;
                return index != o.selected && (this.lis.eq(index).addClass("ui-state-disabled"), o.disabled.push(index), o.disabled.sort(), this._trigger("disable", null, this._ui(this.anchors[index], this.panels[index]))), this
            },
            select: function(index) {
                if (index = this._getIndex(index), -1 == index) {
                    if (!this.options.collapsible || -1 == this.options.selected) return this;
                    index = this.options.selected
                }
                return this.anchors.eq(index).trigger(this.options.event + ".tabs"), this
            },
            load: function(index) {
                index = this._getIndex(index);
                var self = this,
                    o = this.options,
                    a = this.anchors.eq(index)[0],
                    url = $.data(a, "load.tabs");
                if (this.abort(), !url || 0 !== this.element.queue("tabs").length && $.data(a, "cache.tabs")) return this.element.dequeue("tabs"), void 0;
                if (this.lis.eq(index).addClass("ui-state-processing"), o.spinner) {
                    var span = $("span", a);
                    span.data("label.tabs", span.html()).html(o.spinner)
                }
                return this.xhr = $.ajax($.extend({}, o.ajaxOptions, {
                    url: url,
                    success: function(r, s) {
                        self.element.find(self._sanitizeSelector(a.hash)).html(r), self._cleanup(), o.cache && $.data(a, "cache.tabs", !0), self._trigger("load", null, self._ui(self.anchors[index], self.panels[index]));
                        try {
                            o.ajaxOptions.success(r, s)
                        } catch (e) {}
                    },
                    error: function(xhr, s) {
                        self._cleanup(), self._trigger("load", null, self._ui(self.anchors[index], self.panels[index]));
                        try {
                            o.ajaxOptions.error(xhr, s, index, a)
                        } catch (e) {}
                    }
                })), self.element.dequeue("tabs"), this
            },
            abort: function() {
                return this.element.queue([]), this.panels.stop(!1, !0), this.element.queue("tabs", this.element.queue("tabs").splice(-2, 2)), this.xhr && (this.xhr.abort(), delete this.xhr), this._cleanup(), this
            },
            url: function(index, url) {
                return this.anchors.eq(index).removeData("cache.tabs").data("load.tabs", url), this
            },
            length: function() {
                return this.anchors.length
            }
        }), $.extend($.ui.tabs, {
            version: "1.8.23"
        }), $.extend($.ui.tabs.prototype, {
            rotation: null,
            rotate: function(ms, continuing) {
                var self = this,
                    o = this.options,
                    rotate = self._rotate || (self._rotate = function(e) {
                        clearTimeout(self.rotation), self.rotation = setTimeout(function() {
                            var t = o.selected;
                            self.select(++t < self.anchors.length ? t : 0)
                        }, ms), e && e.stopPropagation()
                    }),
                    stop = self._unrotate || (self._unrotate = continuing ? function() {
                        rotate()
                    } : function(e) {
                        e.clientX && self.rotate(null)
                    });
                return ms ? (this.element.bind("tabsshow", rotate), this.anchors.bind(o.event + ".tabs", stop), rotate()) : (clearTimeout(self.rotation), this.element.unbind("tabsshow", rotate), this.anchors.unbind(o.event + ".tabs", stop), delete this._rotate, delete this._unrotate), this
            }
        })
    }(jQuery),
    function() {
        var root = this,
            previousUnderscore = root._,
            breaker = {},
            ArrayProto = Array.prototype,
            ObjProto = Object.prototype,
            FuncProto = Function.prototype,
            push = ArrayProto.push,
            slice = ArrayProto.slice,
            concat = ArrayProto.concat,
            toString = ObjProto.toString,
            hasOwnProperty = ObjProto.hasOwnProperty,
            nativeForEach = ArrayProto.forEach,
            nativeMap = ArrayProto.map,
            nativeReduce = ArrayProto.reduce,
            nativeReduceRight = ArrayProto.reduceRight,
            nativeFilter = ArrayProto.filter,
            nativeEvery = ArrayProto.every,
            nativeSome = ArrayProto.some,
            nativeIndexOf = ArrayProto.indexOf,
            nativeLastIndexOf = ArrayProto.lastIndexOf,
            nativeIsArray = Array.isArray,
            nativeKeys = Object.keys,
            nativeBind = FuncProto.bind,
            _ = function(obj) {
                return obj instanceof _ ? obj : this instanceof _ ? (this._wrapped = obj, void 0) : new _(obj)
            };
        "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = _), exports._ = _) : root._ = _, _.VERSION = "1.4.3";
        var each = _.each = _.forEach = function(obj, iterator, context) {
            if (null != obj)
                if (nativeForEach && obj.forEach === nativeForEach) obj.forEach(iterator, context);
                else if (obj.length === +obj.length) {
                for (var i = 0, l = obj.length; l > i; i++)
                    if (iterator.call(context, obj[i], i, obj) === breaker) return
            } else
                for (var key in obj)
                    if (_.has(obj, key) && iterator.call(context, obj[key], key, obj) === breaker) return
        };
        _.map = _.collect = function(obj, iterator, context) {
            var results = [];
            return null == obj ? results : nativeMap && obj.map === nativeMap ? obj.map(iterator, context) : (each(obj, function(value, index, list) {
                results[results.length] = iterator.call(context, value, index, list)
            }), results)
        };
        var reduceError = "Reduce of empty array with no initial value";
        _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
            var initial = arguments.length > 2;
            if (null == obj && (obj = []), nativeReduce && obj.reduce === nativeReduce) return context && (iterator = _.bind(iterator, context)), initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
            if (each(obj, function(value, index, list) {
                    initial ? memo = iterator.call(context, memo, value, index, list) : (memo = value, initial = !0)
                }), !initial) throw new TypeError(reduceError);
            return memo
        }, _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
            var initial = arguments.length > 2;
            if (null == obj && (obj = []), nativeReduceRight && obj.reduceRight === nativeReduceRight) return context && (iterator = _.bind(iterator, context)), initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
            var length = obj.length;
            if (length !== +length) {
                var keys = _.keys(obj);
                length = keys.length
            }
            if (each(obj, function(value, index, list) {
                    index = keys ? keys[--length] : --length, initial ? memo = iterator.call(context, memo, obj[index], index, list) : (memo = obj[index], initial = !0)
                }), !initial) throw new TypeError(reduceError);
            return memo
        }, _.find = _.detect = function(obj, iterator, context) {
            var result;
            return any(obj, function(value, index, list) {
                return iterator.call(context, value, index, list) ? (result = value, !0) : void 0
            }), result
        }, _.filter = _.select = function(obj, iterator, context) {
            var results = [];
            return null == obj ? results : nativeFilter && obj.filter === nativeFilter ? obj.filter(iterator, context) : (each(obj, function(value, index, list) {
                iterator.call(context, value, index, list) && (results[results.length] = value)
            }), results)
        }, _.reject = function(obj, iterator, context) {
            return _.filter(obj, function(value, index, list) {
                return !iterator.call(context, value, index, list)
            }, context)
        }, _.every = _.all = function(obj, iterator, context) {
            iterator || (iterator = _.identity);
            var result = !0;
            return null == obj ? result : nativeEvery && obj.every === nativeEvery ? obj.every(iterator, context) : (each(obj, function(value, index, list) {
                return (result = result && iterator.call(context, value, index, list)) ? void 0 : breaker
            }), !!result)
        };
        var any = _.some = _.any = function(obj, iterator, context) {
            iterator || (iterator = _.identity);
            var result = !1;
            return null == obj ? result : nativeSome && obj.some === nativeSome ? obj.some(iterator, context) : (each(obj, function(value, index, list) {
                return result || (result = iterator.call(context, value, index, list)) ? breaker : void 0
            }), !!result)
        };
        _.contains = _.include = function(obj, target) {
            return null == obj ? !1 : nativeIndexOf && obj.indexOf === nativeIndexOf ? -1 != obj.indexOf(target) : any(obj, function(value) {
                return value === target
            })
        }, _.invoke = function(obj, method) {
            var args = slice.call(arguments, 2);
            return _.map(obj, function(value) {
                return (_.isFunction(method) ? method : value[method]).apply(value, args)
            })
        }, _.pluck = function(obj, key) {
            return _.map(obj, function(value) {
                return value[key]
            })
        }, _.where = function(obj, attrs) {
            return _.isEmpty(attrs) ? [] : _.filter(obj, function(value) {
                for (var key in attrs)
                    if (attrs[key] !== value[key]) return !1;
                return !0
            })
        }, _.max = function(obj, iterator, context) {
            if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) return Math.max.apply(Math, obj);
            if (!iterator && _.isEmpty(obj)) return -1 / 0;
            var result = {
                computed: -1 / 0,
                value: -1 / 0
            };
            return each(obj, function(value, index, list) {
                var computed = iterator ? iterator.call(context, value, index, list) : value;
                computed >= result.computed && (result = {
                    value: value,
                    computed: computed
                })
            }), result.value
        }, _.min = function(obj, iterator, context) {
            if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) return Math.min.apply(Math, obj);
            if (!iterator && _.isEmpty(obj)) return 1 / 0;
            var result = {
                computed: 1 / 0,
                value: 1 / 0
            };
            return each(obj, function(value, index, list) {
                var computed = iterator ? iterator.call(context, value, index, list) : value;
                computed < result.computed && (result = {
                    value: value,
                    computed: computed
                })
            }), result.value
        }, _.shuffle = function(obj) {
            var rand, index = 0,
                shuffled = [];
            return each(obj, function(value) {
                rand = _.random(index++), shuffled[index - 1] = shuffled[rand], shuffled[rand] = value
            }), shuffled
        };
        var lookupIterator = function(value) {
            return _.isFunction(value) ? value : function(obj) {
                return obj[value]
            }
        };
        _.sortBy = function(obj, value, context) {
            var iterator = lookupIterator(value);
            return _.pluck(_.map(obj, function(value, index, list) {
                return {
                    value: value,
                    index: index,
                    criteria: iterator.call(context, value, index, list)
                }
            }).sort(function(left, right) {
                var a = left.criteria,
                    b = right.criteria;
                if (a !== b) {
                    if (a > b || void 0 === a) return 1;
                    if (b > a || void 0 === b) return -1
                }
                return left.index < right.index ? -1 : 1
            }), "value")
        };
        var group = function(obj, value, context, behavior) {
            var result = {},
                iterator = lookupIterator(value || _.identity);
            return each(obj, function(value, index) {
                var key = iterator.call(context, value, index, obj);
                behavior(result, key, value)
            }), result
        };
        _.groupBy = function(obj, value, context) {
            return group(obj, value, context, function(result, key, value) {
                (_.has(result, key) ? result[key] : result[key] = []).push(value)
            })
        }, _.countBy = function(obj, value, context) {
            return group(obj, value, context, function(result, key) {
                _.has(result, key) || (result[key] = 0), result[key]++
            })
        }, _.sortedIndex = function(array, obj, iterator, context) {
            iterator = null == iterator ? _.identity : lookupIterator(iterator);
            for (var value = iterator.call(context, obj), low = 0, high = array.length; high > low;) {
                var mid = low + high >>> 1;
                iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid
            }
            return low
        }, _.toArray = function(obj) {
            return obj ? _.isArray(obj) ? slice.call(obj) : obj.length === +obj.length ? _.map(obj, _.identity) : _.values(obj) : []
        }, _.size = function(obj) {
            return null == obj ? 0 : obj.length === +obj.length ? obj.length : _.keys(obj).length
        }, _.first = _.head = _.take = function(array, n, guard) {
            return null == array ? void 0 : null == n || guard ? array[0] : slice.call(array, 0, n)
        }, _.initial = function(array, n, guard) {
            return slice.call(array, 0, array.length - (null == n || guard ? 1 : n))
        }, _.last = function(array, n, guard) {
            return null == array ? void 0 : null == n || guard ? array[array.length - 1] : slice.call(array, Math.max(array.length - n, 0))
        }, _.rest = _.tail = _.drop = function(array, n, guard) {
            return slice.call(array, null == n || guard ? 1 : n)
        }, _.compact = function(array) {
            return _.filter(array, _.identity)
        };
        var flatten = function(input, shallow, output) {
            return each(input, function(value) {
                _.isArray(value) ? shallow ? push.apply(output, value) : flatten(value, shallow, output) : output.push(value)
            }), output
        };
        _.flatten = function(array, shallow) {
            return flatten(array, shallow, [])
        }, _.without = function(array) {
            return _.difference(array, slice.call(arguments, 1))
        }, _.uniq = _.unique = function(array, isSorted, iterator, context) {
            _.isFunction(isSorted) && (context = iterator, iterator = isSorted, isSorted = !1);
            var initial = iterator ? _.map(array, iterator, context) : array,
                results = [],
                seen = [];
            return each(initial, function(value, index) {
                (isSorted ? index && seen[seen.length - 1] === value : _.contains(seen, value)) || (seen.push(value), results.push(array[index]))
            }), results
        }, _.union = function() {
            return _.uniq(concat.apply(ArrayProto, arguments))
        }, _.intersection = function(array) {
            var rest = slice.call(arguments, 1);
            return _.filter(_.uniq(array), function(item) {
                return _.every(rest, function(other) {
                    return _.indexOf(other, item) >= 0
                })
            })
        }, _.difference = function(array) {
            var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
            return _.filter(array, function(value) {
                return !_.contains(rest, value)
            })
        }, _.zip = function() {
            for (var args = slice.call(arguments), length = _.max(_.pluck(args, "length")), results = new Array(length), i = 0; length > i; i++) results[i] = _.pluck(args, "" + i);
            return results
        }, _.object = function(list, values) {
            if (null == list) return {};
            for (var result = {}, i = 0, l = list.length; l > i; i++) values ? result[list[i]] = values[i] : result[list[i][0]] = list[i][1];
            return result
        }, _.indexOf = function(array, item, isSorted) {
            if (null == array) return -1;
            var i = 0,
                l = array.length;
            if (isSorted) {
                if ("number" != typeof isSorted) return i = _.sortedIndex(array, item), array[i] === item ? i : -1;
                i = 0 > isSorted ? Math.max(0, l + isSorted) : isSorted
            }
            if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
            for (; l > i; i++)
                if (array[i] === item) return i;
            return -1
        }, _.lastIndexOf = function(array, item, from) {
            if (null == array) return -1;
            var hasIndex = null != from;
            if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
            for (var i = hasIndex ? from : array.length; i--;)
                if (array[i] === item) return i;
            return -1
        }, _.range = function(start, stop, step) {
            arguments.length <= 1 && (stop = start || 0, start = 0), step = arguments[2] || 1;
            for (var len = Math.max(Math.ceil((stop - start) / step), 0), idx = 0, range = new Array(len); len > idx;) range[idx++] = start, start += step;
            return range
        };
        var ctor = function() {};
        _.bind = function(func, context) {
            var args, bound;
            if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
            if (!_.isFunction(func)) throw new TypeError;
            return args = slice.call(arguments, 2), bound = function() {
                if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
                ctor.prototype = func.prototype;
                var self = new ctor;
                ctor.prototype = null;
                var result = func.apply(self, args.concat(slice.call(arguments)));
                return Object(result) === result ? result : self
            }
        }, _.bindAll = function(obj) {
            var funcs = slice.call(arguments, 1);
            return 0 == funcs.length && (funcs = _.functions(obj)), each(funcs, function(f) {
                obj[f] = _.bind(obj[f], obj)
            }), obj
        }, _.memoize = function(func, hasher) {
            var memo = {};
            return hasher || (hasher = _.identity),
                function() {
                    var key = hasher.apply(this, arguments);
                    return _.has(memo, key) ? memo[key] : memo[key] = func.apply(this, arguments)
                }
        }, _.delay = function(func, wait) {
            var args = slice.call(arguments, 2);
            return setTimeout(function() {
                return func.apply(null, args)
            }, wait)
        }, _.defer = function(func) {
            return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)))
        }, _.throttle = function(func, wait) {
            var context, args, timeout, result, previous = 0,
                later = function() {
                    previous = new Date, timeout = null, result = func.apply(context, args)
                };
            return function() {
                var now = new Date,
                    remaining = wait - (now - previous);
                return context = this, args = arguments, 0 >= remaining ? (clearTimeout(timeout), timeout = null, previous = now, result = func.apply(context, args)) : timeout || (timeout = setTimeout(later, remaining)), result
            }
        }, _.debounce = function(func, wait, immediate) {
            var timeout, result;
            return function() {
                var context = this,
                    args = arguments,
                    later = function() {
                        timeout = null, immediate || (result = func.apply(context, args))
                    },
                    callNow = immediate && !timeout;
                return clearTimeout(timeout), timeout = setTimeout(later, wait), callNow && (result = func.apply(context, args)), result
            }
        }, _.once = function(func) {
            var memo, ran = !1;
            return function() {
                return ran ? memo : (ran = !0, memo = func.apply(this, arguments), func = null, memo)
            }
        }, _.wrap = function(func, wrapper) {
            return function() {
                var args = [func];
                return push.apply(args, arguments), wrapper.apply(this, args)
            }
        }, _.compose = function() {
            var funcs = arguments;
            return function() {
                for (var args = arguments, i = funcs.length - 1; i >= 0; i--) args = [funcs[i].apply(this, args)];
                return args[0]
            }
        }, _.after = function(times, func) {
            return 0 >= times ? func() : function() {
                return --times < 1 ? func.apply(this, arguments) : void 0
            }
        }, _.keys = nativeKeys || function(obj) {
            if (obj !== Object(obj)) throw new TypeError("Invalid object");
            var keys = [];
            for (var key in obj) _.has(obj, key) && (keys[keys.length] = key);
            return keys
        }, _.values = function(obj) {
            var values = [];
            for (var key in obj) _.has(obj, key) && values.push(obj[key]);
            return values
        }, _.pairs = function(obj) {
            var pairs = [];
            for (var key in obj) _.has(obj, key) && pairs.push([key, obj[key]]);
            return pairs
        }, _.invert = function(obj) {
            var result = {};
            for (var key in obj) _.has(obj, key) && (result[obj[key]] = key);
            return result
        }, _.functions = _.methods = function(obj) {
            var names = [];
            for (var key in obj) _.isFunction(obj[key]) && names.push(key);
            return names.sort()
        }, _.extend = function(obj) {
            return each(slice.call(arguments, 1), function(source) {
                if (source)
                    for (var prop in source) obj[prop] = source[prop]
            }), obj
        }, _.pick = function(obj) {
            var copy = {},
                keys = concat.apply(ArrayProto, slice.call(arguments, 1));
            return each(keys, function(key) {
                key in obj && (copy[key] = obj[key])
            }), copy
        }, _.omit = function(obj) {
            var copy = {},
                keys = concat.apply(ArrayProto, slice.call(arguments, 1));
            for (var key in obj) _.contains(keys, key) || (copy[key] = obj[key]);
            return copy
        }, _.defaults = function(obj) {
            return each(slice.call(arguments, 1), function(source) {
                if (source)
                    for (var prop in source) null == obj[prop] && (obj[prop] = source[prop])
            }), obj
        }, _.clone = function(obj) {
            return _.isObject(obj) ? _.isArray(obj) ? obj.slice() : _.extend({}, obj) : obj
        }, _.tap = function(obj, interceptor) {
            return interceptor(obj), obj
        };
        var eq = function(a, b, aStack, bStack) {
            if (a === b) return 0 !== a || 1 / a == 1 / b;
            if (null == a || null == b) return a === b;
            a instanceof _ && (a = a._wrapped), b instanceof _ && (b = b._wrapped);
            var className = toString.call(a);
            if (className != toString.call(b)) return !1;
            switch (className) {
                case "[object String]":
                    return a == String(b);
                case "[object Number]":
                    return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;
                case "[object Date]":
                case "[object Boolean]":
                    return +a == +b;
                case "[object RegExp]":
                    return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase
            }
            if ("object" != typeof a || "object" != typeof b) return !1;
            for (var length = aStack.length; length--;)
                if (aStack[length] == a) return bStack[length] == b;
            aStack.push(a), bStack.push(b);
            var size = 0,
                result = !0;
            if ("[object Array]" == className) {
                if (size = a.length, result = size == b.length)
                    for (; size-- && (result = eq(a[size], b[size], aStack, bStack)););
            } else {
                var aCtor = a.constructor,
                    bCtor = b.constructor;
                if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor)) return !1;
                for (var key in a)
                    if (_.has(a, key) && (size++, !(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack)))) break;
                if (result) {
                    for (key in b)
                        if (_.has(b, key) && !size--) break;
                    result = !size
                }
            }
            return aStack.pop(), bStack.pop(), result
        };
        _.isEqual = function(a, b) {
            return eq(a, b, [], [])
        }, _.isEmpty = function(obj) {
            if (null == obj) return !0;
            if (_.isArray(obj) || _.isString(obj)) return 0 === obj.length;
            for (var key in obj)
                if (_.has(obj, key)) return !1;
            return !0
        }, _.isElement = function(obj) {
            return !(!obj || 1 !== obj.nodeType)
        }, _.isArray = nativeIsArray || function(obj) {
            return "[object Array]" == toString.call(obj)
        }, _.isObject = function(obj) {
            return obj === Object(obj)
        }, each(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(name) {
            _["is" + name] = function(obj) {
                return toString.call(obj) == "[object " + name + "]"
            }
        }), _.isArguments(arguments) || (_.isArguments = function(obj) {
            return !(!obj || !_.has(obj, "callee"))
        }), "function" != typeof /./ && (_.isFunction = function(obj) {
            return "function" == typeof obj
        }), _.isFinite = function(obj) {
            return isFinite(obj) && !isNaN(parseFloat(obj))
        }, _.isNaN = function(obj) {
            return _.isNumber(obj) && obj != +obj
        }, _.isBoolean = function(obj) {
            return obj === !0 || obj === !1 || "[object Boolean]" == toString.call(obj)
        }, _.isNull = function(obj) {
            return null === obj
        }, _.isUndefined = function(obj) {
            return void 0 === obj
        }, _.has = function(obj, key) {
            return hasOwnProperty.call(obj, key)
        }, _.noConflict = function() {
            return root._ = previousUnderscore, this
        }, _.identity = function(value) {
            return value
        }, _.times = function(n, iterator, context) {
            for (var accum = Array(n), i = 0; n > i; i++) accum[i] = iterator.call(context, i);
            return accum
        }, _.random = function(min, max) {
            return null == max && (max = min, min = 0), min + (0 | Math.random() * (max - min + 1))
        };
        var entityMap = {
            escape: {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "/": "&#x2F;"
            }
        };
        entityMap.unescape = _.invert(entityMap.escape);
        var entityRegexes = {
            escape: new RegExp("[" + _.keys(entityMap.escape).join("") + "]", "g"),
            unescape: new RegExp("(" + _.keys(entityMap.unescape).join("|") + ")", "g")
        };
        _.each(["escape", "unescape"], function(method) {
            _[method] = function(string) {
                return null == string ? "" : ("" + string).replace(entityRegexes[method], function(match) {
                    return entityMap[method][match]
                })
            }
        }), _.result = function(object, property) {
            if (null == object) return null;
            var value = object[property];
            return _.isFunction(value) ? value.call(object) : value
        }, _.mixin = function(obj) {
            each(_.functions(obj), function(name) {
                var func = _[name] = obj[name];
                _.prototype[name] = function() {
                    var args = [this._wrapped];
                    return push.apply(args, arguments), result.call(this, func.apply(_, args))
                }
            })
        };
        var idCounter = 0;
        _.uniqueId = function(prefix) {
            var id = "" + ++idCounter;
            return prefix ? prefix + id : id
        }, _.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var noMatch = /(.)^/,
            escapes = {
                "'": "'",
                "\\": "\\",
                "\r": "r",
                "\n": "n",
                "	": "t",
                "\u2028": "u2028",
                "\u2029": "u2029"
            },
            escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
        _.template = function(text, data, settings) {
            settings = _.defaults({}, settings, _.templateSettings);
            var matcher = new RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join("|") + "|$", "g"),
                index = 0,
                source = "__p+='";
            text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
                return source += text.slice(index, offset).replace(escaper, function(match) {
                    return "\\" + escapes[match]
                }), escape && (source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'"), interpolate && (source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'"), evaluate && (source += "';\n" + evaluate + "\n__p+='"), index = offset + match.length, match
            }), source += "';\n", settings.variable || (source = "with(obj||{}){\n" + source + "}\n"), source = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n";
            try {
                var render = new Function(settings.variable || "obj", "_", source)
            } catch (e) {
                throw e.source = source, e
            }
            if (data) return render(data, _);
            var template = function(data) {
                return render.call(this, data, _)
            };
            return template.source = "function(" + (settings.variable || "obj") + "){\n" + source + "}", template
        }, _.chain = function(obj) {
            return _(obj).chain()
        };
        var result = function(obj) {
            return this._chain ? _(obj).chain() : obj
        };
        _.mixin(_), each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(name) {
            var method = ArrayProto[name];
            _.prototype[name] = function() {
                var obj = this._wrapped;
                return method.apply(obj, arguments), "shift" != name && "splice" != name || 0 !== obj.length || delete obj[0], result.call(this, obj)
            }
        }), each(["concat", "join", "slice"], function(name) {
            var method = ArrayProto[name];
            _.prototype[name] = function() {
                return result.call(this, method.apply(this._wrapped, arguments))
            }
        }), _.extend(_.prototype, {
            chain: function() {
                return this._chain = !0, this
            },
            value: function() {
                return this._wrapped
            }
        })
    }.call(this),
    /*
    Copyright 2012 Igor Vaynberg

    Version: 3.4.0 Timestamp: Tue May 14 08:27:33 PDT 2013

    This software is licensed under the Apache License, Version 2.0 (the "Apache License") or the GNU
    General Public License version 2 (the "GPL License"). You may choose either license to govern your
    use of this software only upon the condition that you accept all of the terms of either the Apache
    License or the GPL License.

    You may obtain a copy of the Apache License and the GPL License at:

        http://www.apache.org/licenses/LICENSE-2.0
        http://www.gnu.org/licenses/gpl-2.0.html

    Unless required by applicable law or agreed to in writing, software distributed under the
    Apache License or the GPL Licesnse is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
    CONDITIONS OF ANY KIND, either express or implied. See the Apache License and the GPL License for
    the specific language governing permissions and limitations under the Apache License and the GPL License.
    */
    function($) {
        "undefined" == typeof $.fn.each2 && $.fn.extend({
            each2: function(c) {
                for (var j = $([0]), i = -1, l = this.length; ++i < l && (j.context = j[0] = this[i]) && c.call(j[0], i, j) !== !1;);
                return this
            }
        })
    }(jQuery),
    function($, undefined) {
        "use strict";

        function indexOf(value, array) {
            for (var i = 0, l = array.length; l > i; i += 1)
                if (equal(value, array[i])) return i;
            return -1
        }

        function measureScrollbar() {
            var $template = $(MEASURE_SCROLLBAR_TEMPLATE);
            $template.appendTo("body");
            var dim = {
                width: $template.width() - $template[0].clientWidth,
                height: $template.height() - $template[0].clientHeight
            };
            return $template.remove(), dim
        }

        function equal(a, b) {
            return a === b ? !0 : a === undefined || b === undefined ? !1 : null === a || null === b ? !1 : a.constructor === String ? a + "" == b + "" : b.constructor === String ? b + "" == a + "" : !1
        }

        function splitVal(string, separator) {
            var val, i, l;
            if (null === string || string.length < 1) return [];
            for (val = string.split(separator), i = 0, l = val.length; l > i; i += 1) val[i] = $.trim(val[i]);
            return val
        }

        function getSideBorderPadding(element) {
            return element.outerWidth(!1) - element.width()
        }

        function installKeyUpChangeEvent(element) {
            var key = "keyup-change-value";
            element.on("keydown", function() {
                $.data(element, key) === undefined && $.data(element, key, element.val())
            }), element.on("keyup", function() {
                var val = $.data(element, key);
                val !== undefined && element.val() !== val && ($.removeData(element, key), element.trigger("keyup-change"))
            })
        }

        function installFilteredMouseMove(element) {
            element.on("mousemove", function(e) {
                var lastpos = lastMousePosition;
                (lastpos === undefined || lastpos.x !== e.pageX || lastpos.y !== e.pageY) && $(e.target).trigger("mousemove-filtered", e)
            })
        }

        function debounce(quietMillis, fn, ctx) {
            ctx = ctx || undefined;
            var timeout;
            return function() {
                var args = arguments;
                window.clearTimeout(timeout), timeout = window.setTimeout(function() {
                    fn.apply(ctx, args)
                }, quietMillis)
            }
        }

        function thunk(formula) {
            var value, evaluated = !1;
            return function() {
                return evaluated === !1 && (value = formula(), evaluated = !0), value
            }
        }

        function installDebouncedScroll(threshold, element) {
            var notify = debounce(threshold, function(e) {
                element.trigger("scroll-debounced", e)
            });
            element.on("scroll", function(e) {
                indexOf(e.target, element.get()) >= 0 && notify(e)
            })
        }

        function focus($el) {
            $el[0] !== document.activeElement && window.setTimeout(function() {
                var range, el = $el[0],
                    pos = $el.val().length;
                $el.focus(), $el.is(":visible") && el === document.activeElement && (el.setSelectionRange ? el.setSelectionRange(pos, pos) : el.createTextRange && (range = el.createTextRange(), range.collapse(!1), range.select()))
            }, 0)
        }

        function getCursorInfo(el) {
            el = $(el)[0];
            var offset = 0,
                length = 0;
            if ("selectionStart" in el) offset = el.selectionStart, length = el.selectionEnd - offset;
            else if ("selection" in document) {
                el.focus();
                var sel = document.selection.createRange();
                length = document.selection.createRange().text.length, sel.moveStart("character", -el.value.length), offset = sel.text.length - length
            }
            return {
                offset: offset,
                length: length
            }
        }

        function killEvent(event) {
            event.preventDefault(), event.stopPropagation()
        }

        function killEventImmediately(event) {
            event.preventDefault(), event.stopImmediatePropagation()
        }

        function measureTextWidth(e) {
            if (!sizer) {
                var style = e[0].currentStyle || window.getComputedStyle(e[0], null);
                sizer = $(document.createElement("div")).css({
                    position: "absolute",
                    left: "-10000px",
                    top: "-10000px",
                    display: "none",
                    fontSize: style.fontSize,
                    fontFamily: style.fontFamily,
                    fontStyle: style.fontStyle,
                    fontWeight: style.fontWeight,
                    letterSpacing: style.letterSpacing,
                    textTransform: style.textTransform,
                    whiteSpace: "nowrap"
                }), sizer.attr("class", "select2-sizer"), $("body").append(sizer)
            }
            return sizer.text(e.val()), sizer.width()
        }

        function syncCssClasses(dest, src, adapter) {
            var classes, adapted, replacements = [];
            classes = dest.attr("class"), classes && (classes = "" + classes, $(classes.split(" ")).each2(function() {
                0 === this.indexOf("select2-") && replacements.push(this)
            })), classes = src.attr("class"), classes && (classes = "" + classes, $(classes.split(" ")).each2(function() {
                0 !== this.indexOf("select2-") && (adapted = adapter(this), adapted && replacements.push(this))
            })), dest.attr("class", replacements.join(" "))
        }

        function markMatch(text, term, markup, escapeMarkup) {
            var match = text.toUpperCase().indexOf(term.toUpperCase()),
                tl = term.length;
            return 0 > match ? (markup.push(escapeMarkup(text)), void 0) : (markup.push(escapeMarkup(text.substring(0, match))), markup.push("<span class='select2-match'>"), markup.push(escapeMarkup(text.substring(match, match + tl))), markup.push("</span>"), markup.push(escapeMarkup(text.substring(match + tl, text.length))), void 0)
        }

        function ajax(options) {
            var timeout, requestSequence = 0,
                handler = null,
                quietMillis = options.quietMillis || 100,
                ajaxUrl = options.url,
                self = this;
            return function(query) {
                window.clearTimeout(timeout), timeout = window.setTimeout(function() {
                    requestSequence += 1;
                    var requestNumber = requestSequence,
                        data = options.data,
                        url = ajaxUrl,
                        transport = options.transport || $.fn.select2.ajaxDefaults.transport,
                        deprecated = {
                            type: options.type || "GET",
                            cache: options.cache || !1,
                            jsonpCallback: options.jsonpCallback || undefined,
                            dataType: options.dataType || "json"
                        },
                        params = $.extend({}, $.fn.select2.ajaxDefaults.params, deprecated);
                    data = data ? data.call(self, query.term, query.page, query.context) : null, url = "function" == typeof url ? url.call(self, query.term, query.page, query.context) : url, null !== handler && handler.abort(), options.params && ($.isFunction(options.params) ? $.extend(params, options.params.call(self)) : $.extend(params, options.params)), $.extend(params, {
                        url: url,
                        dataType: options.dataType,
                        data: data,
                        success: function(data) {
                            if (!(requestSequence > requestNumber)) {
                                var results = options.results(data, query.page);
                                query.callback(results)
                            }
                        }
                    }), handler = transport.call(self, params)
                }, quietMillis)
            }
        }

        function local(options) {
            var dataText, tmp, data = options,
                text = function(item) {
                    return "" + item.text
                };
            $.isArray(data) && (tmp = data, data = {
                results: tmp
            }), $.isFunction(data) === !1 && (tmp = data, data = function() {
                return tmp
            });
            var dataItem = data();
            return dataItem.text && (text = dataItem.text, $.isFunction(text) || (dataText = dataItem.text, text = function(item) {
                    return item[dataText]
                })),
                function(query) {
                    var process, t = query.term,
                        filtered = {
                            results: []
                        };
                    return "" === t ? (query.callback(data()), void 0) : (process = function(datum, collection) {
                        var group, attr;
                        if (datum = datum[0], datum.children) {
                            group = {};
                            for (attr in datum) datum.hasOwnProperty(attr) && (group[attr] = datum[attr]);
                            group.children = [], $(datum.children).each2(function(i, childDatum) {
                                process(childDatum, group.children)
                            }), (group.children.length || query.matcher(t, text(group), datum)) && collection.push(group)
                        } else query.matcher(t, text(datum), datum) && collection.push(datum)
                    }, $(data().results).each2(function(i, datum) {
                        process(datum, filtered.results)
                    }), query.callback(filtered), void 0)
                }
        }

        function tags(data) {
            var isFunc = $.isFunction(data);
            return function(query) {
                var t = query.term,
                    filtered = {
                        results: []
                    };
                $(isFunc ? data() : data).each(function() {
                    var isObject = this.text !== undefined,
                        text = isObject ? this.text : this;
                    ("" === t || query.matcher(t, text)) && filtered.results.push(isObject ? this : {
                        id: this,
                        text: this
                    })
                }), query.callback(filtered)
            }
        }

        function checkFormatter(formatter) {
            if ($.isFunction(formatter)) return !0;
            if (!formatter) return !1;
            throw new Error("formatterName must be a function or a falsy value")
        }

        function evaluate(val) {
            return $.isFunction(val) ? val() : val
        }

        function countResults(results) {
            var count = 0;
            return $.each(results, function(i, item) {
                item.children ? count += countResults(item.children) : count++
            }), count
        }

        function defaultTokenizer(input, selection, selectCallback, opts) {
            var token, index, i, l, separator, original = input,
                dupe = !1;
            if (!opts.createSearchChoice || !opts.tokenSeparators || opts.tokenSeparators.length < 1) return undefined;
            for (;;) {
                for (index = -1, i = 0, l = opts.tokenSeparators.length; l > i && (separator = opts.tokenSeparators[i], index = input.indexOf(separator), !(index >= 0)); i++);
                if (0 > index) break;
                if (token = input.substring(0, index), input = input.substring(index + separator.length), token.length > 0 && (token = opts.createSearchChoice(token, selection), token !== undefined && null !== token && opts.id(token) !== undefined && null !== opts.id(token))) {
                    for (dupe = !1, i = 0, l = selection.length; l > i; i++)
                        if (equal(opts.id(token), opts.id(selection[i]))) {
                            dupe = !0;
                            break
                        }
                    dupe || selectCallback(token)
                }
            }
            return original !== input ? input : void 0
        }

        function clazz(SuperClass, methods) {
            var constructor = function() {};
            return constructor.prototype = new SuperClass, constructor.prototype.constructor = constructor, constructor.prototype.parent = SuperClass.prototype, constructor.prototype = $.extend(constructor.prototype, methods), constructor
        }
        if (window.Select2 === undefined) {
            var KEY, AbstractSelect2, SingleSelect2, MultiSelect2, nextUid, sizer, lastMousePosition, $document, scrollBarDimensions, KEY = {
                    TAB: 9,
                    ENTER: 13,
                    ESC: 27,
                    SPACE: 32,
                    LEFT: 37,
                    UP: 38,
                    RIGHT: 39,
                    DOWN: 40,
                    SHIFT: 16,
                    CTRL: 17,
                    ALT: 18,
                    PAGE_UP: 33,
                    PAGE_DOWN: 34,
                    HOME: 36,
                    END: 35,
                    BACKSPACE: 8,
                    DELETE: 46,
                    isArrow: function(k) {
                        switch (k = k.which ? k.which : k) {
                            case KEY.LEFT:
                            case KEY.RIGHT:
                            case KEY.UP:
                            case KEY.DOWN:
                                return !0
                        }
                        return !1
                    },
                    isControl: function(e) {
                        var k = e.which;
                        switch (k) {
                            case KEY.SHIFT:
                            case KEY.CTRL:
                            case KEY.ALT:
                                return !0
                        }
                        return e.metaKey ? !0 : !1
                    },
                    isFunctionKey: function(k) {
                        return k = k.which ? k.which : k, k >= 112 && 123 >= k
                    }
                },
                MEASURE_SCROLLBAR_TEMPLATE = "<div class='select2-measure-scrollbar'></div>";
            $document = $(document), nextUid = function() {
                var counter = 1;
                return function() {
                    return counter++
                }
            }(), $document.on("mousemove", function(e) {
                lastMousePosition = {
                    x: e.pageX,
                    y: e.pageY
                }
            }), AbstractSelect2 = clazz(Object, {
                bind: function(func) {
                    var self = this;
                    return function() {
                        func.apply(self, arguments)
                    }
                },
                init: function(opts) {
                    var results, search, disabled, readonly, resultsSelector = ".select2-results";
                    this.opts = opts = this.prepareOpts(opts), this.id = opts.id, opts.element.data("select2") !== undefined && null !== opts.element.data("select2") && this.destroy(), this.container = this.createContainer(), this.containerId = "s2id_" + (opts.element.attr("id") || "autogen" + nextUid()), this.containerSelector = "#" + this.containerId.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, "\\$1"), this.container.attr("id", this.containerId), this.body = thunk(function() {
                        return opts.element.closest("body")
                    }), syncCssClasses(this.container, this.opts.element, this.opts.adaptContainerCssClass), this.container.css(evaluate(opts.containerCss)), this.container.addClass(evaluate(opts.containerCssClass)), this.elementTabIndex = this.opts.element.attr("tabindex"), this.opts.element.data("select2", this).attr("tabindex", "-1").before(this.container), this.container.data("select2", this), this.dropdown = this.container.find(".select2-drop"), this.dropdown.addClass(evaluate(opts.dropdownCssClass)), this.dropdown.data("select2", this), this.results = results = this.container.find(resultsSelector), this.search = search = this.container.find("input.select2-input"), this.resultsPage = 0, this.context = null, this.initContainer(), installFilteredMouseMove(this.results), this.dropdown.on("mousemove-filtered touchstart touchmove touchend", resultsSelector, this.bind(this.highlightUnderEvent)), installDebouncedScroll(80, this.results), this.dropdown.on("scroll-debounced", resultsSelector, this.bind(this.loadMoreIfNeeded)), $(this.container).on("change", ".select2-input", function(e) {
                        e.stopPropagation()
                    }), $(this.dropdown).on("change", ".select2-input", function(e) {
                        e.stopPropagation()
                    }), $.fn.mousewheel && results.mousewheel(function(e, delta, deltaX, deltaY) {
                        var top = results.scrollTop();
                        deltaY > 0 && 0 >= top - deltaY ? (results.scrollTop(0), killEvent(e)) : 0 > deltaY && results.get(0).scrollHeight - results.scrollTop() + deltaY <= results.height() && (results.scrollTop(results.get(0).scrollHeight - results.height()), killEvent(e))
                    }), installKeyUpChangeEvent(search), search.on("keyup-change input paste", this.bind(this.updateResults)), search.on("focus", function() {
                        search.addClass("select2-focused")
                    }), search.on("blur", function() {
                        search.removeClass("select2-focused")
                    }), this.dropdown.on("mouseup", resultsSelector, this.bind(function(e) {
                        $(e.target).closest(".select2-result-selectable").length > 0 && (this.highlightUnderEvent(e), this.selectHighlighted(e))
                    })), this.dropdown.on("click mouseup mousedown", function(e) {
                        e.stopPropagation()
                    }), $.isFunction(this.opts.initSelection) && (this.initSelection(), this.monitorSource()), null !== opts.maximumInputLength && this.search.attr("maxlength", opts.maximumInputLength);
                    var disabled = opts.element.prop("disabled");
                    disabled === undefined && (disabled = !1), this.enable(!disabled);
                    var readonly = opts.element.prop("readonly");
                    readonly === undefined && (readonly = !1), this.readonly(readonly), scrollBarDimensions = scrollBarDimensions || measureScrollbar(), this.autofocus = opts.element.prop("autofocus"), opts.element.prop("autofocus", !1), this.autofocus && this.focus()
                },
                destroy: function() {
                    var select2 = this.opts.element.data("select2");
                    this.propertyObserver && (delete this.propertyObserver, this.propertyObserver = null), select2 !== undefined && (select2.container.remove(), select2.dropdown.remove(), select2.opts.element.removeClass("select2-offscreen").removeData("select2").off(".select2").attr({
                        tabindex: this.elementTabIndex
                    }).prop("autofocus", this.autofocus || !1).show())
                },
                optionToData: function(element) {
                    return element.is("option") ? {
                        id: element.prop("value"),
                        text: element.text(),
                        element: element.get(),
                        css: element.attr("class"),
                        disabled: element.prop("disabled"),
                        locked: equal(element.attr("locked"), "locked")
                    } : element.is("optgroup") ? {
                        text: element.attr("label"),
                        children: [],
                        element: element.get(),
                        css: element.attr("class")
                    } : void 0
                },
                prepareOpts: function(opts) {
                    var element, select, idKey, ajaxUrl, self = this;
                    if (element = opts.element, "select" === element.get(0).tagName.toLowerCase() && (this.select = select = opts.element), select && $.each(["id", "multiple", "ajax", "query", "createSearchChoice", "initSelection", "data", "tags"], function() {
                            if (this in opts) throw new Error("Option '" + this + "' is not allowed for Select2 when attached to a <select> element.")
                        }), opts = $.extend({}, {
                            populateResults: function(container, results, query) {
                                var populate, id = this.opts.id;
                                (populate = function(results, container, depth) {
                                    var i, l, result, selectable, disabled, compound, node, label, innerContainer, formatted;
                                    for (results = opts.sortResults(results, container, query), i = 0, l = results.length; l > i; i += 1) result = results[i], disabled = result.disabled === !0, selectable = !disabled && id(result) !== undefined, compound = result.children && result.children.length > 0, node = $("<li></li>"), node.addClass("select2-results-dept-" + depth), node.addClass("select2-result"), node.addClass(selectable ? "select2-result-selectable" : "select2-result-unselectable"), disabled && node.addClass("select2-disabled"), compound && node.addClass("select2-result-with-children"), node.addClass(self.opts.formatResultCssClass(result)), label = $(document.createElement("div")), label.addClass("select2-result-label"), formatted = opts.formatResult(result, label, query, self.opts.escapeMarkup), formatted !== undefined && label.html(formatted), node.append(label), compound && (innerContainer = $("<ul></ul>"), innerContainer.addClass("select2-result-sub"), populate(result.children, innerContainer, depth + 1), node.append(innerContainer)), node.data("select2-data", result), container.append(node)
                                })(results, container, 0)
                            }
                        }, $.fn.select2.defaults, opts), "function" != typeof opts.id && (idKey = opts.id, opts.id = function(e) {
                            return e[idKey]
                        }), $.isArray(opts.element.data("select2Tags"))) {
                        if ("tags" in opts) throw "tags specified as both an attribute 'data-select2-tags' and in options of Select2 " + opts.element.attr("id");
                        opts.tags = opts.element.data("select2Tags")
                    }
                    if (select ? (opts.query = this.bind(function(query) {
                            var children, firstChild, process, data = {
                                    results: [],
                                    more: !1
                                },
                                term = query.term;
                            process = function(element, collection) {
                                var group;
                                element.is("option") ? query.matcher(term, element.text(), element) && collection.push(self.optionToData(element)) : element.is("optgroup") && (group = self.optionToData(element), element.children().each2(function(i, elm) {
                                    process(elm, group.children)
                                }), group.children.length > 0 && collection.push(group))
                            }, children = element.children(), this.getPlaceholder() !== undefined && children.length > 0 && (firstChild = children[0], "" === $(firstChild).text() && (children = children.not(firstChild))), children.each2(function(i, elm) {
                                process(elm, data.results)
                            }), query.callback(data)
                        }), opts.id = function(e) {
                            return e.id
                        }, opts.formatResultCssClass = function(data) {
                            return data.css
                        }) : "query" in opts || ("ajax" in opts ? (ajaxUrl = opts.element.data("ajax-url"), ajaxUrl && ajaxUrl.length > 0 && (opts.ajax.url = ajaxUrl), opts.query = ajax.call(opts.element, opts.ajax)) : "data" in opts ? opts.query = local(opts.data) : "tags" in opts && (opts.query = tags(opts.tags), opts.createSearchChoice === undefined && (opts.createSearchChoice = function(term) {
                            return {
                                id: term,
                                text: term
                            }
                        }), opts.initSelection === undefined && (opts.initSelection = function(element, callback) {
                            var data = [];
                            $(splitVal(element.val(), opts.separator)).each(function() {
                                var id = this,
                                    text = this,
                                    tags = opts.tags;
                                $.isFunction(tags) && (tags = tags()), $(tags).each(function() {
                                    return equal(this.id, id) ? (text = this.text, !1) : void 0
                                }), data.push({
                                    id: id,
                                    text: text
                                })
                            }), callback(data)
                        }))), "function" != typeof opts.query) throw "query function not defined for Select2 " + opts.element.attr("id");
                    return opts
                },
                monitorSource: function() {
                    var sync, el = this.opts.element;
                    el.on("change.select2", this.bind(function() {
                        this.opts.element.data("select2-change-triggered") !== !0 && this.initSelection()
                    })), sync = this.bind(function() {
                        var readonly, disabled = el.prop("disabled");
                        disabled === undefined && (disabled = !1), this.enable(!disabled);
                        var readonly = el.prop("readonly");
                        readonly === undefined && (readonly = !1), this.readonly(readonly), syncCssClasses(this.container, this.opts.element, this.opts.adaptContainerCssClass), this.container.addClass(evaluate(this.opts.containerCssClass)), syncCssClasses(this.dropdown, this.opts.element, this.opts.adaptDropdownCssClass), this.dropdown.addClass(evaluate(this.opts.dropdownCssClass))
                    }), el.on("propertychange.select2 DOMAttrModified.select2", sync), this.mutationCallback === undefined && (this.mutationCallback = function(mutations) {
                        mutations.forEach(sync)
                    }), "undefined" != typeof WebKitMutationObserver && (this.propertyObserver && (delete this.propertyObserver, this.propertyObserver = null), this.propertyObserver = new WebKitMutationObserver(this.mutationCallback), this.propertyObserver.observe(el.get(0), {
                        attributes: !0,
                        subtree: !1
                    }))
                },
                triggerSelect: function(data) {
                    var evt = $.Event("select2-selecting", {
                        val: this.id(data),
                        object: data
                    });
                    return this.opts.element.trigger(evt), !evt.isDefaultPrevented()
                },
                triggerChange: function(details) {
                    details = details || {}, details = $.extend({}, details, {
                        type: "change",
                        val: this.val()
                    }), this.opts.element.data("select2-change-triggered", !0), this.opts.element.trigger(details), this.opts.element.data("select2-change-triggered", !1), this.opts.element.click(), this.opts.blurOnChange && this.opts.element.blur()
                },
                isInterfaceEnabled: function() {
                    return this.enabledInterface === !0
                },
                enableInterface: function() {
                    var enabled = this._enabled && !this._readonly,
                        disabled = !enabled;
                    return enabled === this.enabledInterface ? !1 : (this.container.toggleClass("select2-container-disabled", disabled), this.close(), this.enabledInterface = enabled, !0)
                },
                enable: function(enabled) {
                    return enabled === undefined && (enabled = !0), this._enabled === enabled ? !1 : (this._enabled = enabled, this.opts.element.prop("disabled", !enabled), this.enableInterface(), !0)
                },
                readonly: function(enabled) {
                    return enabled === undefined && (enabled = !1), this._readonly === enabled ? !1 : (this._readonly = enabled, this.opts.element.prop("readonly", enabled), this.enableInterface(), !0)
                },
                opened: function() {
                    return this.container.hasClass("select2-dropdown-open")
                },
                positionDropdown: function() {
                    var bodyOffset, above, css, resultsListNode, $dropdown = this.dropdown,
                        offset = this.container.offset(),
                        height = this.container.outerHeight(!1),
                        width = this.container.outerWidth(!1),
                        dropHeight = $dropdown.outerHeight(!1),
                        viewPortRight = $(window).scrollLeft() + $(window).width(),
                        viewportBottom = $(window).scrollTop() + $(window).height(),
                        dropTop = offset.top + height,
                        dropLeft = offset.left,
                        enoughRoomBelow = viewportBottom >= dropTop + dropHeight,
                        enoughRoomAbove = offset.top - dropHeight >= this.body().scrollTop(),
                        dropWidth = $dropdown.outerWidth(!1),
                        enoughRoomOnRight = viewPortRight >= dropLeft + dropWidth,
                        aboveNow = $dropdown.hasClass("select2-drop-above");
                    this.opts.dropdownAutoWidth ? (resultsListNode = $(".select2-results", $dropdown)[0], $dropdown.addClass("select2-drop-auto-width"), $dropdown.css("width", ""), dropWidth = $dropdown.outerWidth(!1) + (resultsListNode.scrollHeight === resultsListNode.clientHeight ? 0 : scrollBarDimensions.width), dropWidth > width ? width = dropWidth : dropWidth = width, enoughRoomOnRight = viewPortRight >= dropLeft + dropWidth) : this.container.removeClass("select2-drop-auto-width"), "static" !== this.body().css("position") && (bodyOffset = this.body().offset(), dropTop -= bodyOffset.top, dropLeft -= bodyOffset.left), aboveNow ? (above = !0, !enoughRoomAbove && enoughRoomBelow && (above = !1)) : (above = !1, !enoughRoomBelow && enoughRoomAbove && (above = !0)), enoughRoomOnRight || (dropLeft = offset.left + width - dropWidth), above ? (dropTop = offset.top - dropHeight, this.container.addClass("select2-drop-above"), $dropdown.addClass("select2-drop-above")) : (this.container.removeClass("select2-drop-above"), $dropdown.removeClass("select2-drop-above")), css = $.extend({
                        top: dropTop,
                        left: dropLeft,
                        width: width
                    }, evaluate(this.opts.dropdownCss)), $dropdown.css(css)
                },
                shouldOpen: function() {
                    var event;
                    return this.opened() ? !1 : this._enabled === !1 || this._readonly === !0 ? !1 : (event = $.Event("select2-opening"), this.opts.element.trigger(event), !event.isDefaultPrevented())
                },
                clearDropdownAlignmentPreference: function() {
                    this.container.removeClass("select2-drop-above"), this.dropdown.removeClass("select2-drop-above")
                },
                open: function() {
                    return this.shouldOpen() ? (this.opening(), !0) : !1
                },
                opening: function() {
                    function _makeMaskCss() {
                        return {
                            width: Math.max(document.documentElement.scrollWidth, $(window).width()),
                            height: Math.max(document.documentElement.scrollHeight, $(window).height())
                        }
                    }
                    var mask, cid = this.containerId,
                        scroll = "scroll." + cid,
                        resize = "resize." + cid,
                        orient = "orientationchange." + cid;
                    this.container.addClass("select2-dropdown-open").addClass("select2-container-active"), this.clearDropdownAlignmentPreference(), this.dropdown[0] !== this.body().children().last()[0] && this.dropdown.detach().appendTo(this.body()), mask = $("#select2-drop-mask"), 0 == mask.length && (mask = $(document.createElement("div")), mask.attr("id", "select2-drop-mask").attr("class", "select2-drop-mask"), mask.hide(), mask.appendTo(this.body()), mask.on("mousedown touchstart", function(e) {
                        var self, dropdown = $("#select2-drop");
                        dropdown.length > 0 && (self = dropdown.data("select2"), self.opts.selectOnBlur && self.selectHighlighted({
                            noFocus: !0
                        }), self.close(), e.preventDefault(), e.stopPropagation())
                    })), this.dropdown.prev()[0] !== mask[0] && this.dropdown.before(mask), $("#select2-drop").removeAttr("id"), this.dropdown.attr("id", "select2-drop"), mask.css(_makeMaskCss()), mask.show(), this.dropdown.show(), this.positionDropdown(), this.dropdown.addClass("select2-drop-active"), this.ensureHighlightVisible();
                    var that = this;
                    this.container.parents().add(window).each(function() {
                        $(this).on(resize + " " + scroll + " " + orient, function() {
                            $("#select2-drop-mask").css(_makeMaskCss()), that.positionDropdown()
                        })
                    })
                },
                close: function() {
                    if (this.opened()) {
                        var cid = this.containerId,
                            scroll = "scroll." + cid,
                            resize = "resize." + cid,
                            orient = "orientationchange." + cid;
                        this.container.parents().add(window).each(function() {
                            $(this).off(scroll).off(resize).off(orient)
                        }), this.clearDropdownAlignmentPreference(), $("#select2-drop-mask").hide(), this.dropdown.removeAttr("id"), this.dropdown.hide(), this.container.removeClass("select2-dropdown-open"), this.results.empty(), this.clearSearch(), this.search.removeClass("select2-active"), this.opts.element.trigger($.Event("select2-close"))
                    }
                },
                clearSearch: function() {},
                getMaximumSelectionSize: function() {
                    return evaluate(this.opts.maximumSelectionSize)
                },
                ensureHighlightVisible: function() {
                    var children, index, child, hb, rb, y, more, results = this.results;
                    if (index = this.highlight(), !(0 > index)) {
                        if (0 == index) return results.scrollTop(0), void 0;
                        children = this.findHighlightableChoices().find(".select2-result-label"), child = $(children[index]), hb = child.offset().top + child.outerHeight(!0), index === children.length - 1 && (more = results.find("li.select2-more-results"), more.length > 0 && (hb = more.offset().top + more.outerHeight(!0))), rb = results.offset().top + results.outerHeight(!0), hb > rb && results.scrollTop(results.scrollTop() + (hb - rb)), y = child.offset().top - results.offset().top, 0 > y && "none" != child.css("display") && results.scrollTop(results.scrollTop() + y)
                    }
                },
                findHighlightableChoices: function() {
                    return this.results.find(".select2-result-selectable:not(.select2-selected):not(.select2-disabled)")
                },
                moveHighlight: function(delta) {
                    for (var choices = this.findHighlightableChoices(), index = this.highlight(); index > -1 && index < choices.length;) {
                        index += delta;
                        var choice = $(choices[index]);
                        if (choice.hasClass("select2-result-selectable") && !choice.hasClass("select2-disabled") && !choice.hasClass("select2-selected")) {
                            this.highlight(index);
                            break
                        }
                    }
                },
                highlight: function(index) {
                    var choice, data, choices = this.findHighlightableChoices();
                    return 0 === arguments.length ? indexOf(choices.filter(".select2-highlighted")[0], choices.get()) : (index >= choices.length && (index = choices.length - 1), 0 > index && (index = 0), this.results.find(".select2-highlighted").removeClass("select2-highlighted"), choice = $(choices[index]), choice.addClass("select2-highlighted"), this.ensureHighlightVisible(), data = choice.data("select2-data"), data && this.opts.element.trigger({
                        type: "select2-highlight",
                        val: this.id(data),
                        choice: data
                    }), void 0)
                },
                countSelectableResults: function() {
                    return this.findHighlightableChoices().length
                },
                highlightUnderEvent: function(event) {
                    var el = $(event.target).closest(".select2-result-selectable");
                    if (el.length > 0 && !el.is(".select2-highlighted")) {
                        var choices = this.findHighlightableChoices();
                        this.highlight(choices.index(el))
                    } else 0 == el.length && this.results.find(".select2-highlighted").removeClass("select2-highlighted")
                },
                loadMoreIfNeeded: function() {
                    var below, results = this.results,
                        more = results.find("li.select2-more-results"),
                        page = this.resultsPage + 1,
                        self = this,
                        term = this.search.val(),
                        context = this.context;
                    0 !== more.length && (below = more.offset().top - results.offset().top - results.height(), below <= this.opts.loadMorePadding && (more.addClass("select2-active"), this.opts.query({
                        element: this.opts.element,
                        term: term,
                        page: page,
                        context: context,
                        matcher: this.opts.matcher,
                        callback: this.bind(function(data) {
                            self.opened() && (self.opts.populateResults.call(this, results, data.results, {
                                term: term,
                                page: page,
                                context: context
                            }), self.postprocessResults(data, !1, !1), data.more === !0 ? (more.detach().appendTo(results).text(self.opts.formatLoadMore(page + 1)), window.setTimeout(function() {
                                self.loadMoreIfNeeded()
                            }, 10)) : more.remove(), self.positionDropdown(), self.resultsPage = page, self.context = data.context)
                        })
                    })))
                },
                tokenize: function() {},
                updateResults: function(initial) {
                    function postRender() {
                        results.scrollTop(0), search.removeClass("select2-active"), self.positionDropdown()
                    }

                    function render(html) {
                        results.html(html), postRender()
                    }
                    var data, input, search = this.search,
                        results = this.results,
                        opts = this.opts,
                        self = this,
                        term = search.val(),
                        lastTerm = $.data(this.container, "select2-last-term");
                    if ((initial === !0 || !lastTerm || !equal(term, lastTerm)) && ($.data(this.container, "select2-last-term", term), initial === !0 || this.showSearchInput !== !1 && this.opened())) {
                        var maxSelSize = this.getMaximumSelectionSize();
                        if (maxSelSize >= 1 && (data = this.data(), $.isArray(data) && data.length >= maxSelSize && checkFormatter(opts.formatSelectionTooBig, "formatSelectionTooBig"))) return render("<li class='select2-selection-limit'>" + opts.formatSelectionTooBig(maxSelSize) + "</li>"), void 0;
                        if (search.val().length < opts.minimumInputLength) return checkFormatter(opts.formatInputTooShort, "formatInputTooShort") ? render("<li class='select2-no-results'>" + opts.formatInputTooShort(search.val(), opts.minimumInputLength) + "</li>") : render(""), initial && this.showSearch(!0), void 0;
                        if (opts.maximumInputLength && search.val().length > opts.maximumInputLength) return checkFormatter(opts.formatInputTooLong, "formatInputTooLong") ? render("<li class='select2-no-results'>" + opts.formatInputTooLong(search.val(), opts.maximumInputLength) + "</li>") : render(""), void 0;
                        opts.formatSearching && 0 === this.findHighlightableChoices().length && render("<li class='select2-searching'>" + opts.formatSearching() + "</li>"), search.addClass("select2-active"), input = this.tokenize(), input != undefined && null != input && search.val(input), this.resultsPage = 1, opts.query({
                            element: opts.element,
                            term: search.val(),
                            page: this.resultsPage,
                            context: null,
                            matcher: opts.matcher,
                            callback: this.bind(function(data) {
                                var def;
                                return this.opened() ? (this.context = data.context === undefined ? null : data.context, this.opts.createSearchChoice && "" !== search.val() && (def = this.opts.createSearchChoice.call(null, search.val(), data.results), def !== undefined && null !== def && self.id(def) !== undefined && null !== self.id(def) && 0 === $(data.results).filter(function() {
                                    return equal(self.id(this), self.id(def))
                                }).length && data.results.unshift(def)), 0 === data.results.length && checkFormatter(opts.formatNoMatches, "formatNoMatches") ? (render("<li class='select2-no-results'>" + opts.formatNoMatches(search.val()) + "</li>"), void 0) : (results.empty(), self.opts.populateResults.call(this, results, data.results, {
                                    term: search.val(),
                                    page: this.resultsPage,
                                    context: null
                                }), data.more === !0 && checkFormatter(opts.formatLoadMore, "formatLoadMore") && (results.append("<li class='select2-more-results'>" + self.opts.escapeMarkup(opts.formatLoadMore(this.resultsPage)) + "</li>"), window.setTimeout(function() {
                                    self.loadMoreIfNeeded()
                                }, 10)), this.postprocessResults(data, initial), postRender(), this.opts.element.trigger({
                                    type: "select2-loaded",
                                    data: data
                                }), void 0)) : (this.search.removeClass("select2-active"), void 0)
                            })
                        })
                    }
                },
                cancel: function() {
                    this.close()
                },
                blur: function() {
                    this.opts.selectOnBlur && this.selectHighlighted({
                        noFocus: !0
                    }), this.close(), this.container.removeClass("select2-container-active"), this.search[0] === document.activeElement && this.search.blur(), this.clearSearch(), this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus")
                },
                focusSearch: function() {
                    focus(this.search)
                },
                selectHighlighted: function(options) {
                    var index = this.highlight(),
                        highlighted = this.results.find(".select2-highlighted"),
                        data = highlighted.closest(".select2-result").data("select2-data");
                    data && (this.highlight(index), this.onSelect(data, options))
                },
                getPlaceholder: function() {
                    return this.opts.element.attr("placeholder") || this.opts.element.attr("data-placeholder") || this.opts.element.data("placeholder") || this.opts.placeholder
                },
                initContainerWidth: function() {
                    function resolveContainerWidth() {
                        var style, attrs, matches, i, l;
                        if ("off" === this.opts.width) return null;
                        if ("element" === this.opts.width) return 0 === this.opts.element.outerWidth(!1) ? "auto" : this.opts.element.outerWidth(!1) + "px";
                        if ("copy" === this.opts.width || "resolve" === this.opts.width) {
                            if (style = this.opts.element.attr("style"), style !== undefined)
                                for (attrs = style.split(";"), i = 0, l = attrs.length; l > i; i += 1)
                                    if (matches = attrs[i].replace(/\s/g, "").match(/width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i), null !== matches && matches.length >= 1) return matches[1];
                            return style = this.opts.element.css("width"), style && style.length > 0 ? style : "resolve" === this.opts.width ? 0 === this.opts.element.outerWidth(!1) ? "auto" : this.opts.element.outerWidth(!1) + "px" : null
                        }
                        return $.isFunction(this.opts.width) ? this.opts.width() : this.opts.width
                    }
                    var width = resolveContainerWidth.call(this);
                    null !== width && this.container.css("width", width)
                }
            }), SingleSelect2 = clazz(AbstractSelect2, {
                createContainer: function() {
                    var container = $(document.createElement("div")).attr({
                        "class": "select2-container"
                    }).html(["<a href='javascript:void(0)' onclick='return false;' class='select2-choice' tabindex='-1'>", "   <span>&nbsp;</span><abbr class='select2-search-choice-close'></abbr>", "   <div><b></b></div>", "</a>", "<input class='select2-focusser select2-offscreen' type='text'/>", "<div class='select2-drop select2-display-none'>", "   <div class='select2-search'>", "       <input type='text' autocomplete='off' autocorrect='off' autocapitilize='off' spellcheck='false' class='select2-input'/>", "   </div>", "   <ul class='select2-results'>", "   </ul>", "</div>"].join(""));
                    return container
                },
                enableInterface: function() {
                    this.parent.enableInterface.apply(this, arguments) && this.focusser.prop("disabled", !this.isInterfaceEnabled())
                },
                opening: function() {
                    var el, range;
                    this.parent.opening.apply(this, arguments), this.showSearchInput !== !1 && this.search.val(this.focusser.val()), this.search.focus(), el = this.search.get(0), el.createTextRange && (range = el.createTextRange(), range.collapse(!1), range.select()), this.focusser.prop("disabled", !0).val(""), this.updateResults(!0), this.opts.element.trigger($.Event("select2-open"))
                },
                close: function() {
                    this.opened() && (this.parent.close.apply(this, arguments), this.focusser.removeAttr("disabled"), this.focusser.focus())
                },
                focus: function() {
                    this.opened() ? this.close() : (this.focusser.removeAttr("disabled"), this.focusser.focus())
                },
                isFocused: function() {
                    return this.container.hasClass("select2-container-active")
                },
                cancel: function() {
                    this.parent.cancel.apply(this, arguments), this.focusser.removeAttr("disabled"), this.focusser.focus()
                },
                initContainer: function() {
                    var selection, container = this.container,
                        dropdown = this.dropdown;
                    this.showSearch(!1), this.selection = selection = container.find(".select2-choice"), this.focusser = container.find(".select2-focusser"), this.focusser.attr("id", "s2id_autogen" + nextUid()), $("label[for='" + this.opts.element.attr("id") + "']").attr("for", this.focusser.attr("id")), this.focusser.attr("tabindex", this.elementTabIndex), this.search.on("keydown", this.bind(function(e) {
                        if (this.isInterfaceEnabled()) {
                            if (e.which === KEY.PAGE_UP || e.which === KEY.PAGE_DOWN) return killEvent(e), void 0;
                            switch (e.which) {
                                case KEY.UP:
                                case KEY.DOWN:
                                    return this.moveHighlight(e.which === KEY.UP ? -1 : 1), killEvent(e), void 0;
                                case KEY.ENTER:
                                    return this.selectHighlighted(), killEvent(e), void 0;
                                case KEY.TAB:
                                    return this.selectHighlighted({
                                        noFocus: !0
                                    }), void 0;
                                case KEY.ESC:
                                    return this.cancel(e), killEvent(e), void 0
                            }
                        }
                    })), this.search.on("blur", this.bind(function() {
                        document.activeElement === this.body().get(0) && window.setTimeout(this.bind(function() {
                            this.search.focus()
                        }), 0)
                    })), this.focusser.on("keydown", this.bind(function(e) {
                        return !this.isInterfaceEnabled() || e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC ? void 0 : this.opts.openOnEnter === !1 && e.which === KEY.ENTER ? (killEvent(e), void 0) : e.which == KEY.DOWN || e.which == KEY.UP || e.which == KEY.ENTER && this.opts.openOnEnter ? (this.open(), killEvent(e), void 0) : e.which == KEY.DELETE || e.which == KEY.BACKSPACE ? (this.opts.allowClear && this.clear(), killEvent(e), void 0) : void 0
                    })), installKeyUpChangeEvent(this.focusser), this.focusser.on("keyup-change input", this.bind(function(e) {
                        e.stopPropagation(), this.opened() || this.open()
                    })), selection.on("mousedown", "abbr", this.bind(function(e) {
                        this.isInterfaceEnabled() && (this.clear(), killEventImmediately(e), this.close(), this.selection.focus())
                    })), selection.on("mousedown", this.bind(function(e) {
                        this.container.hasClass("select2-container-active") || this.opts.element.trigger($.Event("select2-focus")), this.opened() ? this.close() : this.isInterfaceEnabled() && this.open(), killEvent(e)
                    })), dropdown.on("mousedown", this.bind(function() {
                        this.search.focus()
                    })), selection.on("focus", this.bind(function(e) {
                        killEvent(e)
                    })), this.focusser.on("focus", this.bind(function() {
                        this.container.hasClass("select2-container-active") || this.opts.element.trigger($.Event("select2-focus")), this.container.addClass("select2-container-active")
                    })).on("blur", this.bind(function() {
                        this.opened() || (this.container.removeClass("select2-container-active"), this.opts.element.trigger($.Event("select2-blur")))
                    })), this.search.on("focus", this.bind(function() {
                        this.container.hasClass("select2-container-active") || this.opts.element.trigger($.Event("select2-focus")), this.container.addClass("select2-container-active")
                    })), this.initContainerWidth(), this.opts.element.addClass("select2-offscreen"), this.setPlaceholder()
                },
                clear: function(triggerChange) {
                    var data = this.selection.data("select2-data");
                    data && (this.opts.element.val(""), this.selection.find("span").empty(), this.selection.removeData("select2-data"), this.setPlaceholder(), triggerChange !== !1 && (this.opts.element.trigger({
                        type: "select2-removed",
                        val: this.id(data),
                        choice: data
                    }), this.triggerChange({
                        removed: data
                    })))
                },
                initSelection: function() {
                    if ("" === this.opts.element.val() && "" === this.opts.element.text()) this.updateSelection([]), this.close(), this.setPlaceholder();
                    else {
                        var self = this;
                        this.opts.initSelection.call(null, this.opts.element, function(selected) {
                            selected !== undefined && null !== selected && (self.updateSelection(selected), self.close(), self.setPlaceholder())
                        })
                    }
                },
                prepareOpts: function() {
                    var opts = this.parent.prepareOpts.apply(this, arguments),
                        self = this;
                    return "select" === opts.element.get(0).tagName.toLowerCase() ? opts.initSelection = function(element, callback) {
                        var selected = element.find(":selected");
                        callback(self.optionToData(selected))
                    } : "data" in opts && (opts.initSelection = opts.initSelection || function(element, callback) {
                        var id = element.val(),
                            match = null;
                        opts.query({
                            matcher: function(term, text, el) {
                                var is_match = equal(id, opts.id(el));
                                return is_match && (match = el), is_match
                            },
                            callback: $.isFunction(callback) ? function() {
                                callback(match)
                            } : $.noop
                        })
                    }), opts
                },
                getPlaceholder: function() {
                    return this.select && "" !== this.select.find("option").first().text() ? undefined : this.parent.getPlaceholder.apply(this, arguments)
                },
                setPlaceholder: function() {
                    var placeholder = this.getPlaceholder();
                    if ("" === this.opts.element.val() && placeholder !== undefined) {
                        if (this.select && "" !== this.select.find("option:first").text()) return;
                        this.selection.find("span").html(this.opts.escapeMarkup(placeholder)), this.selection.addClass("select2-default"), this.container.removeClass("select2-allowclear")
                    }
                },
                postprocessResults: function(data, initial, noHighlightUpdate) {
                    var selected = 0,
                        self = this;
                    if (this.findHighlightableChoices().each2(function(i, elm) {
                            return equal(self.id(elm.data("select2-data")), self.opts.element.val()) ? (selected = i, !1) : void 0
                        }), noHighlightUpdate !== !1 && this.highlight(selected), initial === !0 && this.showSearchInput === !1) {
                        var min = this.opts.minimumResultsForSearch;
                        min >= 0 && this.showSearch(countResults(data.results) >= min)
                    }
                },
                showSearch: function(showSearchInput) {
                    this.showSearchInput = showSearchInput, this.dropdown.find(".select2-search").toggleClass("select2-search-hidden", !showSearchInput), this.dropdown.find(".select2-search").toggleClass("select2-offscreen", !showSearchInput), $(this.dropdown, this.container).toggleClass("select2-with-searchbox", showSearchInput)
                },
                onSelect: function(data, options) {
                    if (this.triggerSelect(data)) {
                        var old = this.opts.element.val(),
                            oldData = this.data();
                        this.opts.element.val(this.id(data)), this.updateSelection(data), this.opts.element.trigger({
                            type: "select2-selected",
                            val: this.id(data),
                            choice: data
                        }), this.close(), options && options.noFocus || this.selection.focus(), equal(old, this.id(data)) || this.triggerChange({
                            added: data,
                            removed: oldData
                        })
                    }
                },
                updateSelection: function(data) {
                    var formatted, container = this.selection.find("span");
                    this.selection.data("select2-data", data), container.empty(), formatted = this.opts.formatSelection(data, container), formatted !== undefined && container.append(this.opts.escapeMarkup(formatted)), this.selection.removeClass("select2-default"), this.opts.allowClear && this.getPlaceholder() !== undefined && this.container.addClass("select2-allowclear")
                },
                val: function() {
                    var val, triggerChange = !1,
                        data = null,
                        self = this,
                        oldData = this.data();
                    if (0 === arguments.length) return this.opts.element.val();
                    if (val = arguments[0], arguments.length > 1 && (triggerChange = arguments[1]), this.select) this.select.val(val).find(":selected").each2(function(i, elm) {
                        return data = self.optionToData(elm), !1
                    }), this.updateSelection(data), this.setPlaceholder(), triggerChange && this.triggerChange({
                        added: data,
                        removed: oldData
                    });
                    else {
                        if (this.opts.initSelection === undefined) throw new Error("cannot call val() if initSelection() is not defined");
                        if (!val && 0 !== val) return this.clear(triggerChange), void 0;
                        this.opts.element.val(val), this.opts.initSelection(this.opts.element, function(data) {
                            self.opts.element.val(data ? self.id(data) : ""), self.updateSelection(data), self.setPlaceholder(), triggerChange && self.triggerChange({
                                added: data,
                                removed: oldData
                            })
                        })
                    }
                },
                clearSearch: function() {
                    this.search.val(""), this.focusser.val("")
                },
                data: function(value, triggerChange) {
                    var data;
                    return 0 === arguments.length ? (data = this.selection.data("select2-data"), data == undefined && (data = null), data) : (value && "" !== value ? (data = this.data(), this.opts.element.val(value ? this.id(value) : ""), this.updateSelection(value), triggerChange && this.triggerChange({
                        added: value,
                        removed: data
                    })) : this.clear(triggerChange), void 0)
                }
            }), MultiSelect2 = clazz(AbstractSelect2, {
                createContainer: function() {
                    var container = $(document.createElement("div")).attr({
                        "class": "select2-container select2-container-multi"
                    }).html(["    <ul class='select2-choices'>", "  <li class='select2-search-field'>", "    <input type='text' autocomplete='off' autocorrect='off' autocapitilize='off' spellcheck='false' class='select2-input'>", "  </li>", "</ul>", "<div class='select2-drop select2-drop-multi select2-display-none'>", "   <ul class='select2-results'>", "   </ul>", "</div>"].join(""));
                    return container
                },
                prepareOpts: function() {
                    var opts = this.parent.prepareOpts.apply(this, arguments),
                        self = this;
                    return "select" === opts.element.get(0).tagName.toLowerCase() ? opts.initSelection = function(element, callback) {
                        var data = [];
                        element.find(":selected").each2(function(i, elm) {
                            data.push(self.optionToData(elm))
                        }), callback(data)
                    } : "data" in opts && (opts.initSelection = opts.initSelection || function(element, callback) {
                        var ids = splitVal(element.val(), opts.separator),
                            matches = [];
                        opts.query({
                            matcher: function(term, text, el) {
                                var is_match = $.grep(ids, function(id) {
                                    return equal(id, opts.id(el))
                                }).length;
                                return is_match && matches.push(el), is_match
                            },
                            callback: $.isFunction(callback) ? function() {
                                for (var ordered = [], i = 0; i < ids.length; i++)
                                    for (var id = ids[i], j = 0; j < matches.length; j++) {
                                        var match = matches[j];
                                        if (equal(id, opts.id(match))) {
                                            ordered.push(match), matches.splice(j, 1);
                                            break
                                        }
                                    }
                                callback(ordered)
                            } : $.noop
                        })
                    }), opts
                },
                selectChoice: function(choice) {
                    var selected = this.container.find(".select2-search-choice-focus");
                    selected.length && choice && choice[0] == selected[0] || (selected.length && this.opts.element.trigger("choice-deselected", selected), selected.removeClass("select2-search-choice-focus"), choice && choice.length && (this.close(), choice.addClass("select2-search-choice-focus"), this.opts.element.trigger("choice-selected", choice)))
                },
                initContainer: function() {
                    var selection, selector = ".select2-choices";
                    this.searchContainer = this.container.find(".select2-search-field"), this.selection = selection = this.container.find(selector);
                    var _this = this;
                    this.selection.on("mousedown", ".select2-search-choice", function() {
                        _this.search[0].focus(), _this.selectChoice($(this))
                    }), this.search.attr("id", "s2id_autogen" + nextUid()), $("label[for='" + this.opts.element.attr("id") + "']").attr("for", this.search.attr("id")), this.search.on("input paste", this.bind(function() {
                        this.isInterfaceEnabled() && (this.opened() || this.open())
                    })), this.search.attr("tabindex", this.elementTabIndex), this.keydowns = 0, this.search.on("keydown", this.bind(function(e) {
                        if (this.isInterfaceEnabled()) {
                            ++this.keydowns;
                            var selected = selection.find(".select2-search-choice-focus"),
                                prev = selected.prev(".select2-search-choice:not(.select2-locked)"),
                                next = selected.next(".select2-search-choice:not(.select2-locked)"),
                                pos = getCursorInfo(this.search);
                            if (selected.length && (e.which == KEY.LEFT || e.which == KEY.RIGHT || e.which == KEY.BACKSPACE || e.which == KEY.DELETE || e.which == KEY.ENTER)) {
                                var selectedChoice = selected;
                                return e.which == KEY.LEFT && prev.length ? selectedChoice = prev : e.which == KEY.RIGHT ? selectedChoice = next.length ? next : null : e.which === KEY.BACKSPACE ? (this.unselect(selected.first()), this.search.width(10), selectedChoice = prev.length ? prev : next) : e.which == KEY.DELETE ? (this.unselect(selected.first()), this.search.width(10), selectedChoice = next.length ? next : null) : e.which == KEY.ENTER && (selectedChoice = null), this.selectChoice(selectedChoice), killEvent(e), selectedChoice && selectedChoice.length || this.open(), void 0
                            }
                            if ((e.which === KEY.BACKSPACE && 1 == this.keydowns || e.which == KEY.LEFT) && 0 == pos.offset && !pos.length) return this.selectChoice(selection.find(".select2-search-choice:not(.select2-locked)").last()), killEvent(e), void 0;
                            if (this.selectChoice(null), this.opened()) switch (e.which) {
                                case KEY.UP:
                                case KEY.DOWN:
                                    return this.moveHighlight(e.which === KEY.UP ? -1 : 1), killEvent(e), void 0;
                                case KEY.ENTER:
                                    return this.selectHighlighted(), killEvent(e), void 0;
                                case KEY.TAB:
                                    return this.selectHighlighted({
                                        noFocus: !0
                                    }), void 0;
                                case KEY.ESC:
                                    return this.cancel(e), killEvent(e), void 0
                            }
                            if (e.which !== KEY.TAB && !KEY.isControl(e) && !KEY.isFunctionKey(e) && e.which !== KEY.BACKSPACE && e.which !== KEY.ESC) {
                                if (e.which === KEY.ENTER) {
                                    if (this.opts.openOnEnter === !1) return;
                                    if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) return
                                }
                                this.open(), (e.which === KEY.PAGE_UP || e.which === KEY.PAGE_DOWN) && killEvent(e), e.which === KEY.ENTER && killEvent(e)
                            }
                        }
                    })), this.search.on("keyup", this.bind(function() {
                        this.keydowns = 0, this.resizeSearch()
                    })), this.search.on("blur", this.bind(function(e) {
                        this.container.removeClass("select2-container-active"), this.search.removeClass("select2-focused"), this.selectChoice(null), this.opened() || this.clearSearch(), e.stopImmediatePropagation(), this.opts.element.trigger($.Event("select2-blur"))
                    })), this.container.on("mousedown", selector, this.bind(function(e) {
                        this.isInterfaceEnabled() && ($(e.target).closest(".select2-search-choice").length > 0 || (this.selectChoice(null), this.clearPlaceholder(), this.container.hasClass("select2-container-active") || this.opts.element.trigger($.Event("select2-focus")), this.open(), this.focusSearch(), e.preventDefault()))
                    })), this.container.on("focus", selector, this.bind(function() {
                        this.isInterfaceEnabled() && (this.container.hasClass("select2-container-active") || this.opts.element.trigger($.Event("select2-focus")), this.container.addClass("select2-container-active"), this.dropdown.addClass("select2-drop-active"), this.clearPlaceholder())
                    })), this.initContainerWidth(), this.opts.element.addClass("select2-offscreen"), this.clearSearch()
                },
                enableInterface: function() {
                    this.parent.enableInterface.apply(this, arguments) && this.search.prop("disabled", !this.isInterfaceEnabled())
                },
                initSelection: function() {
                    if ("" === this.opts.element.val() && "" === this.opts.element.text() && (this.updateSelection([]), this.close(), this.clearSearch()), this.select || "" !== this.opts.element.val()) {
                        var self = this;
                        this.opts.initSelection.call(null, this.opts.element, function(data) {
                            data !== undefined && null !== data && (self.updateSelection(data), self.close(), self.clearSearch())
                        })
                    }
                },
                clearSearch: function() {
                    var placeholder = this.getPlaceholder(),
                        maxWidth = this.getMaxSearchWidth();
                    placeholder !== undefined && 0 === this.getVal().length && this.search.hasClass("select2-focused") === !1 ? (this.search.val(placeholder).addClass("select2-default"), this.search.width(maxWidth > 0 ? maxWidth : this.container.css("width"))) : this.search.val("").width(10)
                },
                clearPlaceholder: function() {
                    this.search.hasClass("select2-default") && this.search.val("").removeClass("select2-default")
                },
                opening: function() {
                    this.clearPlaceholder(), this.resizeSearch(), this.parent.opening.apply(this, arguments), this.focusSearch(), this.updateResults(!0), this.search.focus(), this.opts.element.trigger($.Event("select2-open"))
                },
                close: function() {
                    this.opened() && this.parent.close.apply(this, arguments)
                },
                focus: function() {
                    this.close(), this.search.focus()
                },
                isFocused: function() {
                    return this.search.hasClass("select2-focused")
                },
                updateSelection: function(data) {
                    var ids = [],
                        filtered = [],
                        self = this;
                    $(data).each(function() {
                        indexOf(self.id(this), ids) < 0 && (ids.push(self.id(this)), filtered.push(this))
                    }), data = filtered, this.selection.find(".select2-search-choice").remove(), $(data).each(function() {
                        self.addSelectedChoice(this)
                    }), self.postprocessResults()
                },
                tokenize: function() {
                    var input = this.search.val();
                    input = this.opts.tokenizer(input, this.data(), this.bind(this.onSelect), this.opts), null != input && input != undefined && (this.search.val(input), input.length > 0 && this.open())
                },
                onSelect: function(data, options) {
                    this.triggerSelect(data) && (this.addSelectedChoice(data), this.opts.element.trigger({
                        type: "selected",
                        val: this.id(data),
                        choice: data
                    }), (this.select || !this.opts.closeOnSelect) && this.postprocessResults(), this.opts.closeOnSelect ? (this.close(), this.search.width(10)) : this.countSelectableResults() > 0 ? (this.search.width(10), this.resizeSearch(), this.getMaximumSelectionSize() > 0 && this.val().length >= this.getMaximumSelectionSize() && this.updateResults(!0), this.positionDropdown()) : (this.close(), this.search.width(10)), this.triggerChange({
                        added: data
                    }), options && options.noFocus || this.focusSearch())
                },
                cancel: function() {
                    this.close(), this.focusSearch()
                },
                addSelectedChoice: function(data) {
                    var formatted, enableChoice = !data.locked,
                        enabledItem = $("<li class='select2-search-choice'>    <div></div>    <a href='#' onclick='return false;' class='select2-search-choice-close' tabindex='-1'></a></li>"),
                        disabledItem = $("<li class='select2-search-choice select2-locked'><div></div></li>"),
                        choice = enableChoice ? enabledItem : disabledItem,
                        id = this.id(data),
                        val = this.getVal();
                    formatted = this.opts.formatSelection(data, choice.find("div")), formatted != undefined && choice.find("div").replaceWith("<div title='" + this.opts.escapeMarkup(formatted) + "'>" + this.opts.escapeMarkup(formatted) + "</div>"), enableChoice && choice.find(".select2-search-choice-close").on("mousedown", killEvent).on("click dblclick", this.bind(function(e) {
                        this.isInterfaceEnabled() && ($(e.target).closest(".select2-search-choice").fadeOut("fast", this.bind(function() {
                            this.unselect($(e.target)), this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus"), this.close(), this.focusSearch()
                        })).dequeue(), killEvent(e))
                    })).on("focus", this.bind(function() {
                        this.isInterfaceEnabled() && (this.container.addClass("select2-container-active"), this.dropdown.addClass("select2-drop-active"))
                    })), choice.data("select2-data", data), choice.insertBefore(this.searchContainer), val.push(id), this.setVal(val)
                },
                unselect: function(selected) {
                    var data, index, val = this.getVal();
                    if (selected = selected.closest(".select2-search-choice"), 0 === selected.length) throw "Invalid argument: " + selected + ". Must be .select2-search-choice";
                    data = selected.data("select2-data"), data && (index = indexOf(this.id(data), val), index >= 0 && (val.splice(index, 1), this.setVal(val), this.select && this.postprocessResults()), selected.remove(), this.opts.element.trigger({
                        type: "removed",
                        val: this.id(data),
                        choice: data
                    }), this.triggerChange({
                        removed: data
                    }))
                },
                postprocessResults: function(data, initial, noHighlightUpdate) {
                    var val = this.getVal(),
                        choices = this.results.find(".select2-result"),
                        compound = this.results.find(".select2-result-with-children"),
                        self = this;
                    choices.each2(function(i, choice) {
                        var id = self.id(choice.data("select2-data"));
                        indexOf(id, val) >= 0 && (choice.addClass("select2-selected"), choice.find(".select2-result-selectable").addClass("select2-selected"))
                    }), compound.each2(function(i, choice) {
                        choice.is(".select2-result-selectable") || 0 !== choice.find(".select2-result-selectable:not(.select2-selected)").length || choice.addClass("select2-selected")
                    }), -1 == this.highlight() && noHighlightUpdate !== !1 && self.highlight(0), !this.opts.createSearchChoice && !choices.filter(".select2-result:not(.select2-selected)").length > 0 && this.results.append("<li class='select2-no-results'>" + self.opts.formatNoMatches(self.search.val()) + "</li>")
                },
                getMaxSearchWidth: function() {
                    return this.selection.width() - getSideBorderPadding(this.search)
                },
                resizeSearch: function() {
                    var minimumWidth, left, maxWidth, containerLeft, searchWidth, sideBorderPadding = getSideBorderPadding(this.search);
                    minimumWidth = measureTextWidth(this.search) + 10, left = this.search.offset().left, maxWidth = this.selection.width(), containerLeft = this.selection.offset().left, searchWidth = maxWidth - (left - containerLeft) - sideBorderPadding, minimumWidth > searchWidth && (searchWidth = maxWidth - sideBorderPadding), 40 > searchWidth && (searchWidth = maxWidth - sideBorderPadding), 0 >= searchWidth && (searchWidth = minimumWidth), this.search.width(searchWidth)
                },
                getVal: function() {
                    var val;
                    return this.select ? (val = this.select.val(), null === val ? [] : val) : (val = this.opts.element.val(), splitVal(val, this.opts.separator))
                },
                setVal: function(val) {
                    var unique;
                    this.select ? this.select.val(val) : (unique = [], $(val).each(function() {
                        indexOf(this, unique) < 0 && unique.push(this)
                    }), this.opts.element.val(0 === unique.length ? "" : unique.join(this.opts.separator)))
                },
                buildChangeDetails: function(old, current) {
                    for (var current = current.slice(0), old = old.slice(0), i = 0; i < current.length; i++)
                        for (var j = 0; j < old.length; j++) equal(this.opts.id(current[i]), this.opts.id(old[j])) && (current.splice(i, 1), i--, old.splice(j, 1), j--);
                    return {
                        added: current,
                        removed: old
                    }
                },
                val: function(val, triggerChange) {
                    var oldData, self = this;
                    if (0 === arguments.length) return this.getVal();
                    if (oldData = this.data(), oldData.length || (oldData = []), !val && 0 !== val) return this.opts.element.val(""), this.updateSelection([]), this.clearSearch(), triggerChange && this.triggerChange({
                        added: this.data(),
                        removed: oldData
                    }), void 0;
                    if (this.setVal(val), this.select) this.opts.initSelection(this.select, this.bind(this.updateSelection)), triggerChange && this.triggerChange(this.buildChangeDetails(oldData, this.data()));
                    else {
                        if (this.opts.initSelection === undefined) throw new Error("val() cannot be called if initSelection() is not defined");
                        this.opts.initSelection(this.opts.element, function(data) {
                            var ids = $(data).map(self.id);
                            self.setVal(ids), self.updateSelection(data), self.clearSearch(), triggerChange && self.triggerChange(this.buildChangeDetails(oldData, this.data()))
                        })
                    }
                    this.clearSearch()
                },
                onSortStart: function() {
                    if (this.select) throw new Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.");
                    this.search.width(0), this.searchContainer.hide()
                },
                onSortEnd: function() {
                    var val = [],
                        self = this;
                    this.searchContainer.show(), this.searchContainer.appendTo(this.searchContainer.parent()), this.resizeSearch(), this.selection.find(".select2-search-choice").each(function() {
                        val.push(self.opts.id($(this).data("select2-data")))
                    }), this.setVal(val), this.triggerChange()
                },
                data: function(values, triggerChange) {
                    var ids, old, self = this;
                    return 0 === arguments.length ? this.selection.find(".select2-search-choice").map(function() {
                        return $(this).data("select2-data")
                    }).get() : (old = this.data(), values || (values = []), ids = $.map(values, function(e) {
                        return self.opts.id(e)
                    }), this.setVal(ids), this.updateSelection(values), this.clearSearch(), triggerChange && this.triggerChange(this.buildChangeDetails(old, this.data())), void 0)
                }
            }), $.fn.select2 = function() {
                var opts, select2, value, multiple, args = Array.prototype.slice.call(arguments, 0),
                    allowedMethods = ["val", "destroy", "opened", "open", "close", "focus", "isFocused", "container", "onSortStart", "onSortEnd", "enable", "readonly", "positionDropdown", "data"],
                    valueMethods = ["val", "opened", "isFocused", "container", "data"];
                return this.each(function() {
                    if (0 === args.length || "object" == typeof args[0]) opts = 0 === args.length ? {} : $.extend({}, args[0]), opts.element = $(this), "select" === opts.element.get(0).tagName.toLowerCase() ? multiple = opts.element.prop("multiple") : (multiple = opts.multiple || !1, "tags" in opts && (opts.multiple = multiple = !0)), select2 = multiple ? new MultiSelect2 : new SingleSelect2, select2.init(opts);
                    else {
                        if ("string" != typeof args[0]) throw "Invalid arguments to select2 plugin: " + args;
                        if (indexOf(args[0], allowedMethods) < 0) throw "Unknown method: " + args[0];
                        if (value = undefined, select2 = $(this).data("select2"), select2 === undefined) return;
                        if (value = "container" === args[0] ? select2.container : select2[args[0]].apply(select2, args.slice(1)), indexOf(args[0], valueMethods) >= 0) return !1
                    }
                }), value === undefined ? this : value
            }, $.fn.select2.defaults = {
                width: "copy",
                loadMorePadding: 0,
                closeOnSelect: !0,
                openOnEnter: !0,
                containerCss: {},
                dropdownCss: {},
                containerCssClass: "",
                dropdownCssClass: "",
                formatResult: function(result, container, query, escapeMarkup) {
                    var markup = [];
                    return markMatch(result.text, query.term, markup, escapeMarkup), markup.join("")
                },
                formatSelection: function(data) {
                    return data ? data.text : undefined
                },
                sortResults: function(results) {
                    return results
                },
                formatResultCssClass: function() {
                    return undefined
                },
                formatNoMatches: function() {
                    return "No matches found"
                },
                formatInputTooShort: function(input, min) {
                    var n = min - input.length;
                    return "Please enter " + n + " more character" + (1 == n ? "" : "s")
                },
                formatInputTooLong: function(input, max) {
                    var n = input.length - max;
                    return "Please delete " + n + " character" + (1 == n ? "" : "s")
                },
                formatSelectionTooBig: function(limit) {
                    return "You can only select " + limit + " item" + (1 == limit ? "" : "s")
                },
                formatLoadMore: function() {
                    return "Loading more results..."
                },
                formatSearching: function() {
                    return "Searching..."
                },
                minimumResultsForSearch: 0,
                minimumInputLength: 0,
                maximumInputLength: null,
                maximumSelectionSize: 0,
                id: function(e) {
                    return e.id
                },
                matcher: function(term, text) {
                    return ("" + text).toUpperCase().indexOf(("" + term).toUpperCase()) >= 0
                },
                separator: ",",
                tokenSeparators: [],
                tokenizer: defaultTokenizer,
                escapeMarkup: function(markup) {
                    var replace_map = {
                        "\\": "&#92;",
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        '"': "&quot;",
                        "'": "&#39;",
                        "/": "&#47;"
                    };
                    return String(markup).replace(/[&<>"'\/\\]/g, function(match) {
                        return replace_map[match]
                    })
                },
                blurOnChange: !1,
                selectOnBlur: !1,
                adaptContainerCssClass: function(c) {
                    return c
                },
                adaptDropdownCssClass: function() {
                    return null
                }
            }, $.fn.select2.ajaxDefaults = {
                transport: $.ajax,
                params: {
                    type: "GET",
                    cache: !1,
                    dataType: "json"
                }
            }, window.Select2 = {
                query: {
                    ajax: ajax,
                    local: local,
                    tags: tags
                },
                util: {
                    debounce: debounce,
                    markMatch: markMatch
                },
                "class": {
                    "abstract": AbstractSelect2,
                    single: SingleSelect2,
                    multi: MultiSelect2
                }
            }
        }
    }(jQuery),
    /**
     * This script gives you the zone info key representing your device's time zone setting.
     *
     * @name jsTimezoneDetect
     * @version 1.0.5
     * @author Jon Nylander
     * @license MIT License - http://www.opensource.org/licenses/mit-license.php
     *
     * For usage and examples, visit:
     * http://pellepim.bitbucket.org/jstz/
     *
     * Copyright (c) Jon Nylander
     */
    function(root) {
        var jstz = function() {
            "use strict";
            var HEMISPHERE_SOUTH = "s",
                get_date_offset = function(date) {
                    var offset = -date.getTimezoneOffset();
                    return null !== offset ? offset : 0
                },
                get_date = function(year, month, date) {
                    var d = new Date;
                    return void 0 !== year && d.setFullYear(year), d.setMonth(month), d.setDate(date), d
                },
                get_january_offset = function(year) {
                    return get_date_offset(get_date(year, 0, 2))
                },
                get_june_offset = function(year) {
                    return get_date_offset(get_date(year, 5, 2))
                },
                date_is_dst = function(date) {
                    var is_southern = date.getMonth() > 7,
                        base_offset = is_southern ? get_june_offset(date.getFullYear()) : get_january_offset(date.getFullYear()),
                        date_offset = get_date_offset(date),
                        is_west = 0 > base_offset,
                        dst_offset = base_offset - date_offset;
                    return is_west || is_southern ? 0 !== dst_offset : 0 > dst_offset
                },
                lookup_key = function() {
                    var january_offset = get_january_offset(),
                        june_offset = get_june_offset(),
                        diff = january_offset - june_offset;
                    return 0 > diff ? january_offset + ",1" : diff > 0 ? june_offset + ",1," + HEMISPHERE_SOUTH : january_offset + ",0"
                },
                determine = function() {
                    var key = lookup_key();
                    return new jstz.TimeZone(jstz.olson.timezones[key])
                },
                dst_start_for = function(tz_name) {
                    var ru_pre_dst_change = new Date(2010, 6, 15, 1, 0, 0, 0),
                        dst_starts = {
                            "America/Denver": new Date(2011, 2, 13, 3, 0, 0, 0),
                            "America/Mazatlan": new Date(2011, 3, 3, 3, 0, 0, 0),
                            "America/Chicago": new Date(2011, 2, 13, 3, 0, 0, 0),
                            "America/Mexico_City": new Date(2011, 3, 3, 3, 0, 0, 0),
                            "America/Asuncion": new Date(2012, 9, 7, 3, 0, 0, 0),
                            "America/Santiago": new Date(2012, 9, 3, 3, 0, 0, 0),
                            "America/Campo_Grande": new Date(2012, 9, 21, 5, 0, 0, 0),
                            "America/Montevideo": new Date(2011, 9, 2, 3, 0, 0, 0),
                            "America/Sao_Paulo": new Date(2011, 9, 16, 5, 0, 0, 0),
                            "America/Los_Angeles": new Date(2011, 2, 13, 8, 0, 0, 0),
                            "America/Santa_Isabel": new Date(2011, 3, 5, 8, 0, 0, 0),
                            "America/Havana": new Date(2012, 2, 10, 2, 0, 0, 0),
                            "America/New_York": new Date(2012, 2, 10, 7, 0, 0, 0),
                            "Europe/Helsinki": new Date(2013, 2, 31, 5, 0, 0, 0),
                            "Pacific/Auckland": new Date(2011, 8, 26, 7, 0, 0, 0),
                            "America/Halifax": new Date(2011, 2, 13, 6, 0, 0, 0),
                            "America/Goose_Bay": new Date(2011, 2, 13, 2, 1, 0, 0),
                            "America/Miquelon": new Date(2011, 2, 13, 5, 0, 0, 0),
                            "America/Godthab": new Date(2011, 2, 27, 1, 0, 0, 0),
                            "Europe/Moscow": ru_pre_dst_change,
                            "Asia/Amman": new Date(2013, 2, 29, 1, 0, 0, 0),
                            "Asia/Beirut": new Date(2013, 2, 31, 2, 0, 0, 0),
                            "Asia/Damascus": new Date(2013, 3, 6, 2, 0, 0, 0),
                            "Asia/Jerusalem": new Date(2013, 2, 29, 5, 0, 0, 0),
                            "Asia/Yekaterinburg": ru_pre_dst_change,
                            "Asia/Omsk": ru_pre_dst_change,
                            "Asia/Krasnoyarsk": ru_pre_dst_change,
                            "Asia/Irkutsk": ru_pre_dst_change,
                            "Asia/Yakutsk": ru_pre_dst_change,
                            "Asia/Vladivostok": ru_pre_dst_change,
                            "Asia/Baku": new Date(2013, 2, 31, 4, 0, 0),
                            "Asia/Yerevan": new Date(2013, 2, 31, 3, 0, 0),
                            "Asia/Kamchatka": ru_pre_dst_change,
                            "Asia/Gaza": new Date(2010, 2, 27, 4, 0, 0),
                            "Africa/Cairo": new Date(2010, 4, 1, 3, 0, 0),
                            "Europe/Minsk": ru_pre_dst_change,
                            "Pacific/Apia": new Date(2010, 10, 1, 1, 0, 0, 0),
                            "Pacific/Fiji": new Date(2010, 11, 1, 0, 0, 0),
                            "Australia/Perth": new Date(2008, 10, 1, 1, 0, 0, 0)
                        };
                    return dst_starts[tz_name]
                };
            return {
                determine: determine,
                date_is_dst: date_is_dst,
                dst_start_for: dst_start_for
            }
        }();
        jstz.TimeZone = function(tz_name) {
            "use strict";
            var AMBIGUITIES = {
                    "America/Denver": ["America/Denver", "America/Mazatlan"],
                    "America/Chicago": ["America/Chicago", "America/Mexico_City"],
                    "America/Santiago": ["America/Santiago", "America/Asuncion", "America/Campo_Grande"],
                    "America/Montevideo": ["America/Montevideo", "America/Sao_Paulo"],
                    "Asia/Beirut": ["Asia/Amman", "Asia/Jerusalem", "Asia/Beirut", "Europe/Helsinki", "Asia/Damascus"],
                    "Pacific/Auckland": ["Pacific/Auckland", "Pacific/Fiji"],
                    "America/Los_Angeles": ["America/Los_Angeles", "America/Santa_Isabel"],
                    "America/New_York": ["America/Havana", "America/New_York"],
                    "America/Halifax": ["America/Goose_Bay", "America/Halifax"],
                    "America/Godthab": ["America/Miquelon", "America/Godthab"],
                    "Asia/Dubai": ["Europe/Moscow"],
                    "Asia/Dhaka": ["Asia/Yekaterinburg"],
                    "Asia/Jakarta": ["Asia/Omsk"],
                    "Asia/Shanghai": ["Asia/Krasnoyarsk", "Australia/Perth"],
                    "Asia/Tokyo": ["Asia/Irkutsk"],
                    "Australia/Brisbane": ["Asia/Yakutsk"],
                    "Pacific/Noumea": ["Asia/Vladivostok"],
                    "Pacific/Tarawa": ["Asia/Kamchatka", "Pacific/Fiji"],
                    "Pacific/Tongatapu": ["Pacific/Apia"],
                    "Asia/Baghdad": ["Europe/Minsk"],
                    "Asia/Baku": ["Asia/Yerevan", "Asia/Baku"],
                    "Africa/Johannesburg": ["Asia/Gaza", "Africa/Cairo"]
                },
                timezone_name = tz_name,
                ambiguity_check = function() {
                    for (var ambiguity_list = AMBIGUITIES[timezone_name], length = ambiguity_list.length, i = 0, tz = ambiguity_list[0]; length > i; i += 1)
                        if (tz = ambiguity_list[i], jstz.date_is_dst(jstz.dst_start_for(tz))) return timezone_name = tz, void 0
                },
                is_ambiguous = function() {
                    return "undefined" != typeof AMBIGUITIES[timezone_name]
                };
            return is_ambiguous() && ambiguity_check(), {
                name: function() {
                    return timezone_name
                }
            }
        }, jstz.olson = {}, jstz.olson.timezones = {
            "-720,0": "Pacific/Majuro",
            "-660,0": "Pacific/Pago_Pago",
            "-600,1": "America/Adak",
            "-600,0": "Pacific/Honolulu",
            "-570,0": "Pacific/Marquesas",
            "-540,0": "Pacific/Gambier",
            "-540,1": "America/Anchorage",
            "-480,1": "America/Los_Angeles",
            "-480,0": "Pacific/Pitcairn",
            "-420,0": "America/Phoenix",
            "-420,1": "America/Denver",
            "-360,0": "America/Guatemala",
            "-360,1": "America/Chicago",
            "-360,1,s": "Pacific/Easter",
            "-300,0": "America/Bogota",
            "-300,1": "America/New_York",
            "-270,0": "America/Caracas",
            "-240,1": "America/Halifax",
            "-240,0": "America/Santo_Domingo",
            "-240,1,s": "America/Santiago",
            "-210,1": "America/St_Johns",
            "-180,1": "America/Godthab",
            "-180,0": "America/Argentina/Buenos_Aires",
            "-180,1,s": "America/Montevideo",
            "-120,0": "America/Noronha",
            "-120,1": "America/Noronha",
            "-60,1": "Atlantic/Azores",
            "-60,0": "Atlantic/Cape_Verde",
            "0,0": "Etc/UTC",
            "0,1": "Europe/London",
            "60,1": "Europe/Berlin",
            "60,0": "Africa/Lagos",
            "60,1,s": "Africa/Windhoek",
            "120,1": "Asia/Beirut",
            "120,0": "Africa/Johannesburg",
            "180,0": "Asia/Baghdad",
            "180,1": "Europe/Moscow",
            "210,1": "Asia/Tehran",
            "240,0": "Asia/Dubai",
            "240,1": "Asia/Baku",
            "270,0": "Asia/Kabul",
            "300,1": "Asia/Yekaterinburg",
            "300,0": "Asia/Karachi",
            "330,0": "Asia/Kolkata",
            "345,0": "Asia/Kathmandu",
            "360,0": "Asia/Dhaka",
            "360,1": "Asia/Omsk",
            "390,0": "Asia/Rangoon",
            "420,1": "Asia/Krasnoyarsk",
            "420,0": "Asia/Jakarta",
            "480,0": "Asia/Shanghai",
            "480,1": "Asia/Irkutsk",
            "525,0": "Australia/Eucla",
            "525,1,s": "Australia/Eucla",
            "540,1": "Asia/Yakutsk",
            "540,0": "Asia/Tokyo",
            "570,0": "Australia/Darwin",
            "570,1,s": "Australia/Adelaide",
            "600,0": "Australia/Brisbane",
            "600,1": "Asia/Vladivostok",
            "600,1,s": "Australia/Sydney",
            "630,1,s": "Australia/Lord_Howe",
            "660,1": "Asia/Kamchatka",
            "660,0": "Pacific/Noumea",
            "690,0": "Pacific/Norfolk",
            "720,1,s": "Pacific/Auckland",
            "720,0": "Pacific/Tarawa",
            "765,1,s": "Pacific/Chatham",
            "780,0": "Pacific/Tongatapu",
            "780,1,s": "Pacific/Apia",
            "840,0": "Pacific/Kiritimati"
        }, "undefined" != typeof exports ? exports.jstz = jstz : root.jstz = jstz
    }(this),
    function(global, factory) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define(factory) : global.moment = factory()
    }(this, function() {
        "use strict";

        function utils_hooks__hooks() {
            return hookCallback.apply(null, arguments)
        }

        function setHookCallback(callback) {
            hookCallback = callback
        }

        function isArray(input) {
            return "[object Array]" === Object.prototype.toString.call(input)
        }

        function isDate(input) {
            return input instanceof Date || "[object Date]" === Object.prototype.toString.call(input)
        }

        function map(arr, fn) {
            var i, res = [];
            for (i = 0; i < arr.length; ++i) res.push(fn(arr[i], i));
            return res
        }

        function hasOwnProp(a, b) {
            return Object.prototype.hasOwnProperty.call(a, b)
        }

        function extend(a, b) {
            for (var i in b) hasOwnProp(b, i) && (a[i] = b[i]);
            return hasOwnProp(b, "toString") && (a.toString = b.toString), hasOwnProp(b, "valueOf") && (a.valueOf = b.valueOf), a
        }

        function create_utc__createUTC(input, format, locale, strict) {
            return createLocalOrUTC(input, format, locale, strict, !0).utc()
        }

        function defaultParsingFlags() {
            return {
                empty: !1,
                unusedTokens: [],
                unusedInput: [],
                overflow: -2,
                charsLeftOver: 0,
                nullInput: !1,
                invalidMonth: null,
                invalidFormat: !1,
                userInvalidated: !1,
                iso: !1
            }
        }

        function getParsingFlags(m) {
            return null == m._pf && (m._pf = defaultParsingFlags()), m._pf
        }

        function valid__isValid(m) {
            if (null == m._isValid) {
                var flags = getParsingFlags(m);
                m._isValid = !(isNaN(m._d.getTime()) || !(flags.overflow < 0) || flags.empty || flags.invalidMonth || flags.invalidWeekday || flags.nullInput || flags.invalidFormat || flags.userInvalidated), m._strict && (m._isValid = m._isValid && 0 === flags.charsLeftOver && 0 === flags.unusedTokens.length && void 0 === flags.bigHour)
            }
            return m._isValid
        }

        function valid__createInvalid(flags) {
            var m = create_utc__createUTC(0 / 0);
            return null != flags ? extend(getParsingFlags(m), flags) : getParsingFlags(m).userInvalidated = !0, m
        }

        function copyConfig(to, from) {
            var i, prop, val;
            if ("undefined" != typeof from._isAMomentObject && (to._isAMomentObject = from._isAMomentObject), "undefined" != typeof from._i && (to._i = from._i), "undefined" != typeof from._f && (to._f = from._f), "undefined" != typeof from._l && (to._l = from._l), "undefined" != typeof from._strict && (to._strict = from._strict), "undefined" != typeof from._tzm && (to._tzm = from._tzm), "undefined" != typeof from._isUTC && (to._isUTC = from._isUTC), "undefined" != typeof from._offset && (to._offset = from._offset), "undefined" != typeof from._pf && (to._pf = getParsingFlags(from)), "undefined" != typeof from._locale && (to._locale = from._locale), momentProperties.length > 0)
                for (i in momentProperties) prop = momentProperties[i], val = from[prop], "undefined" != typeof val && (to[prop] = val);
            return to
        }

        function Moment(config) {
            copyConfig(this, config), this._d = new Date(null != config._d ? config._d.getTime() : 0 / 0), updateInProgress === !1 && (updateInProgress = !0, utils_hooks__hooks.updateOffset(this), updateInProgress = !1)
        }

        function isMoment(obj) {
            return obj instanceof Moment || null != obj && null != obj._isAMomentObject
        }

        function absFloor(number) {
            return 0 > number ? Math.ceil(number) : Math.floor(number)
        }

        function toInt(argumentForCoercion) {
            var coercedNumber = +argumentForCoercion,
                value = 0;
            return 0 !== coercedNumber && isFinite(coercedNumber) && (value = absFloor(coercedNumber)), value
        }

        function compareArrays(array1, array2, dontConvert) {
            var i, len = Math.min(array1.length, array2.length),
                lengthDiff = Math.abs(array1.length - array2.length),
                diffs = 0;
            for (i = 0; len > i; i++)(dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) && diffs++;
            return diffs + lengthDiff
        }

        function Locale() {}

        function normalizeLocale(key) {
            return key ? key.toLowerCase().replace("_", "-") : key
        }

        function chooseLocale(names) {
            for (var j, next, locale, split, i = 0; i < names.length;) {
                for (split = normalizeLocale(names[i]).split("-"), j = split.length, next = normalizeLocale(names[i + 1]), next = next ? next.split("-") : null; j > 0;) {
                    if (locale = loadLocale(split.slice(0, j).join("-"))) return locale;
                    if (next && next.length >= j && compareArrays(split, next, !0) >= j - 1) break;
                    j--
                }
                i++
            }
            return null
        }

        function loadLocale(name) {
            var oldLocale = null;
            if (!locales[name] && "undefined" != typeof module && module && module.exports) try {
                oldLocale = globalLocale._abbr, require("./locale/" + name), locale_locales__getSetGlobalLocale(oldLocale)
            } catch (e) {}
            return locales[name]
        }

        function locale_locales__getSetGlobalLocale(key, values) {
            var data;
            return key && (data = "undefined" == typeof values ? locale_locales__getLocale(key) : defineLocale(key, values), data && (globalLocale = data)), globalLocale._abbr
        }

        function defineLocale(name, values) {
            return null !== values ? (values.abbr = name, locales[name] = locales[name] || new Locale, locales[name].set(values), locale_locales__getSetGlobalLocale(name), locales[name]) : (delete locales[name], null)
        }

        function locale_locales__getLocale(key) {
            var locale;
            if (key && key._locale && key._locale._abbr && (key = key._locale._abbr), !key) return globalLocale;
            if (!isArray(key)) {
                if (locale = loadLocale(key)) return locale;
                key = [key]
            }
            return chooseLocale(key)
        }

        function addUnitAlias(unit, shorthand) {
            var lowerCase = unit.toLowerCase();
            aliases[lowerCase] = aliases[lowerCase + "s"] = aliases[shorthand] = unit
        }

        function normalizeUnits(units) {
            return "string" == typeof units ? aliases[units] || aliases[units.toLowerCase()] : void 0
        }

        function normalizeObjectUnits(inputObject) {
            var normalizedProp, prop, normalizedInput = {};
            for (prop in inputObject) hasOwnProp(inputObject, prop) && (normalizedProp = normalizeUnits(prop), normalizedProp && (normalizedInput[normalizedProp] = inputObject[prop]));
            return normalizedInput
        }

        function makeGetSet(unit, keepTime) {
            return function(value) {
                return null != value ? (get_set__set(this, unit, value), utils_hooks__hooks.updateOffset(this, keepTime), this) : get_set__get(this, unit)
            }
        }

        function get_set__get(mom, unit) {
            return mom._d["get" + (mom._isUTC ? "UTC" : "") + unit]()
        }

        function get_set__set(mom, unit, value) {
            return mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value)
        }

        function getSet(units, value) {
            var unit;
            if ("object" == typeof units)
                for (unit in units) this.set(unit, units[unit]);
            else if (units = normalizeUnits(units), "function" == typeof this[units]) return this[units](value);
            return this
        }

        function zeroFill(number, targetLength, forceSign) {
            var absNumber = "" + Math.abs(number),
                zerosToFill = targetLength - absNumber.length,
                sign = number >= 0;
            return (sign ? forceSign ? "+" : "" : "-") + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber
        }

        function addFormatToken(token, padded, ordinal, callback) {
            var func = callback;
            "string" == typeof callback && (func = function() {
                return this[callback]()
            }), token && (formatTokenFunctions[token] = func), padded && (formatTokenFunctions[padded[0]] = function() {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2])
            }), ordinal && (formatTokenFunctions[ordinal] = function() {
                return this.localeData().ordinal(func.apply(this, arguments), token)
            })
        }

        function removeFormattingTokens(input) {
            return input.match(/\[[\s\S]/) ? input.replace(/^\[|\]$/g, "") : input.replace(/\\/g, "")
        }

        function makeFormatFunction(format) {
            var i, length, array = format.match(formattingTokens);
            for (i = 0, length = array.length; length > i; i++) array[i] = formatTokenFunctions[array[i]] ? formatTokenFunctions[array[i]] : removeFormattingTokens(array[i]);
            return function(mom) {
                var output = "";
                for (i = 0; length > i; i++) output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
                return output
            }
        }

        function formatMoment(m, format) {
            return m.isValid() ? (format = expandFormat(format, m.localeData()), formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format), formatFunctions[format](m)) : m.localeData().invalidDate()
        }

        function expandFormat(format, locale) {
            function replaceLongDateFormatTokens(input) {
                return locale.longDateFormat(input) || input
            }
            var i = 5;
            for (localFormattingTokens.lastIndex = 0; i >= 0 && localFormattingTokens.test(format);) format = format.replace(localFormattingTokens, replaceLongDateFormatTokens), localFormattingTokens.lastIndex = 0, i -= 1;
            return format
        }

        function isFunction(sth) {
            return "function" == typeof sth && "[object Function]" === Object.prototype.toString.call(sth)
        }

        function addRegexToken(token, regex, strictRegex) {
            regexes[token] = isFunction(regex) ? regex : function(isStrict) {
                return isStrict && strictRegex ? strictRegex : regex
            }
        }

        function getParseRegexForToken(token, config) {
            return hasOwnProp(regexes, token) ? regexes[token](config._strict, config._locale) : new RegExp(unescapeFormat(token))
        }

        function unescapeFormat(s) {
            return s.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(matched, p1, p2, p3, p4) {
                return p1 || p2 || p3 || p4
            }).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
        }

        function addParseToken(token, callback) {
            var i, func = callback;
            for ("string" == typeof token && (token = [token]), "number" == typeof callback && (func = function(input, array) {
                    array[callback] = toInt(input)
                }), i = 0; i < token.length; i++) tokens[token[i]] = func
        }

        function addWeekParseToken(token, callback) {
            addParseToken(token, function(input, array, config, token) {
                config._w = config._w || {}, callback(input, config._w, config, token)
            })
        }

        function addTimeToArrayFromToken(token, input, config) {
            null != input && hasOwnProp(tokens, token) && tokens[token](input, config._a, config, token)
        }

        function daysInMonth(year, month) {
            return new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
        }

        function localeMonths(m) {
            return this._months[m.month()]
        }

        function localeMonthsShort(m) {
            return this._monthsShort[m.month()]
        }

        function localeMonthsParse(monthName, format, strict) {
            var i, mom, regex;
            for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), i = 0; 12 > i; i++) {
                if (mom = create_utc__createUTC([2e3, i]), strict && !this._longMonthsParse[i] && (this._longMonthsParse[i] = new RegExp("^" + this.months(mom, "").replace(".", "") + "$", "i"), this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(mom, "").replace(".", "") + "$", "i")), strict || this._monthsParse[i] || (regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, ""), this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i")), strict && "MMMM" === format && this._longMonthsParse[i].test(monthName)) return i;
                if (strict && "MMM" === format && this._shortMonthsParse[i].test(monthName)) return i;
                if (!strict && this._monthsParse[i].test(monthName)) return i
            }
        }

        function setMonth(mom, value) {
            var dayOfMonth;
            return "string" == typeof value && (value = mom.localeData().monthsParse(value), "number" != typeof value) ? mom : (dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value)), mom._d["set" + (mom._isUTC ? "UTC" : "") + "Month"](value, dayOfMonth), mom)
        }

        function getSetMonth(value) {
            return null != value ? (setMonth(this, value), utils_hooks__hooks.updateOffset(this, !0), this) : get_set__get(this, "Month")
        }

        function getDaysInMonth() {
            return daysInMonth(this.year(), this.month())
        }

        function checkOverflow(m) {
            var overflow, a = m._a;
            return a && -2 === getParsingFlags(m).overflow && (overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || 24 === a[HOUR] && (0 !== a[MINUTE] || 0 !== a[SECOND] || 0 !== a[MILLISECOND]) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1, getParsingFlags(m)._overflowDayOfYear && (YEAR > overflow || overflow > DATE) && (overflow = DATE), getParsingFlags(m).overflow = overflow), m
        }

        function warn(msg) {
            utils_hooks__hooks.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + msg)
        }

        function deprecate(msg, fn) {
            var firstTime = !0;
            return extend(function() {
                return firstTime && (warn(msg + "\n" + (new Error).stack), firstTime = !1), fn.apply(this, arguments)
            }, fn)
        }

        function deprecateSimple(name, msg) {
            deprecations[name] || (warn(msg), deprecations[name] = !0)
        }

        function configFromISO(config) {
            var i, l, string = config._i,
                match = from_string__isoRegex.exec(string);
            if (match) {
                for (getParsingFlags(config).iso = !0, i = 0, l = isoDates.length; l > i; i++)
                    if (isoDates[i][1].exec(string)) {
                        config._f = isoDates[i][0];
                        break
                    }
                for (i = 0, l = isoTimes.length; l > i; i++)
                    if (isoTimes[i][1].exec(string)) {
                        config._f += (match[6] || " ") + isoTimes[i][0];
                        break
                    }
                string.match(matchOffset) && (config._f += "Z"), configFromStringAndFormat(config)
            } else config._isValid = !1
        }

        function configFromString(config) {
            var matched = aspNetJsonRegex.exec(config._i);
            return null !== matched ? (config._d = new Date(+matched[1]), void 0) : (configFromISO(config), config._isValid === !1 && (delete config._isValid, utils_hooks__hooks.createFromInputFallback(config)), void 0)
        }

        function createDate(y, m, d, h, M, s, ms) {
            var date = new Date(y, m, d, h, M, s, ms);
            return 1970 > y && date.setFullYear(y), date
        }

        function createUTCDate(y) {
            var date = new Date(Date.UTC.apply(null, arguments));
            return 1970 > y && date.setUTCFullYear(y), date
        }

        function daysInYear(year) {
            return isLeapYear(year) ? 366 : 365
        }

        function isLeapYear(year) {
            return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0
        }

        function getIsLeapYear() {
            return isLeapYear(this.year())
        }

        function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
            var adjustedMoment, end = firstDayOfWeekOfYear - firstDayOfWeek,
                daysToDayOfWeek = firstDayOfWeekOfYear - mom.day();
            return daysToDayOfWeek > end && (daysToDayOfWeek -= 7), end - 7 > daysToDayOfWeek && (daysToDayOfWeek += 7), adjustedMoment = local__createLocal(mom).add(daysToDayOfWeek, "d"), {
                week: Math.ceil(adjustedMoment.dayOfYear() / 7),
                year: adjustedMoment.year()
            }
        }

        function localeWeek(mom) {
            return weekOfYear(mom, this._week.dow, this._week.doy).week
        }

        function localeFirstDayOfWeek() {
            return this._week.dow
        }

        function localeFirstDayOfYear() {
            return this._week.doy
        }

        function getSetWeek(input) {
            var week = this.localeData().week(this);
            return null == input ? week : this.add(7 * (input - week), "d")
        }

        function getSetISOWeek(input) {
            var week = weekOfYear(this, 1, 4).week;
            return null == input ? week : this.add(7 * (input - week), "d")
        }

        function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
            var dayOfYear, week1Jan = 6 + firstDayOfWeek - firstDayOfWeekOfYear,
                janX = createUTCDate(year, 0, 1 + week1Jan),
                d = janX.getUTCDay();
            return firstDayOfWeek > d && (d += 7), weekday = null != weekday ? 1 * weekday : firstDayOfWeek, dayOfYear = 1 + week1Jan + 7 * (week - 1) - d + weekday, {
                year: dayOfYear > 0 ? year : year - 1,
                dayOfYear: dayOfYear > 0 ? dayOfYear : daysInYear(year - 1) + dayOfYear
            }
        }

        function getSetDayOfYear(input) {
            var dayOfYear = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
            return null == input ? dayOfYear : this.add(input - dayOfYear, "d")
        }

        function defaults(a, b, c) {
            return null != a ? a : null != b ? b : c
        }

        function currentDateArray(config) {
            var now = new Date;
            return config._useUTC ? [now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()] : [now.getFullYear(), now.getMonth(), now.getDate()]
        }

        function configFromArray(config) {
            var i, date, currentDate, yearToUse, input = [];
            if (!config._d) {
                for (currentDate = currentDateArray(config), config._w && null == config._a[DATE] && null == config._a[MONTH] && dayOfYearFromWeekInfo(config), config._dayOfYear && (yearToUse = defaults(config._a[YEAR], currentDate[YEAR]), config._dayOfYear > daysInYear(yearToUse) && (getParsingFlags(config)._overflowDayOfYear = !0), date = createUTCDate(yearToUse, 0, config._dayOfYear), config._a[MONTH] = date.getUTCMonth(), config._a[DATE] = date.getUTCDate()), i = 0; 3 > i && null == config._a[i]; ++i) config._a[i] = input[i] = currentDate[i];
                for (; 7 > i; i++) config._a[i] = input[i] = null == config._a[i] ? 2 === i ? 1 : 0 : config._a[i];
                24 === config._a[HOUR] && 0 === config._a[MINUTE] && 0 === config._a[SECOND] && 0 === config._a[MILLISECOND] && (config._nextDay = !0, config._a[HOUR] = 0), config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input), null != config._tzm && config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm), config._nextDay && (config._a[HOUR] = 24)
            }
        }

        function dayOfYearFromWeekInfo(config) {
            var w, weekYear, week, weekday, dow, doy, temp;
            w = config._w, null != w.GG || null != w.W || null != w.E ? (dow = 1, doy = 4, weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year), week = defaults(w.W, 1), weekday = defaults(w.E, 1)) : (dow = config._locale._week.dow, doy = config._locale._week.doy, weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year), week = defaults(w.w, 1), null != w.d ? (weekday = w.d, dow > weekday && ++week) : weekday = null != w.e ? w.e + dow : dow), temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow), config._a[YEAR] = temp.year, config._dayOfYear = temp.dayOfYear
        }

        function configFromStringAndFormat(config) {
            if (config._f === utils_hooks__hooks.ISO_8601) return configFromISO(config), void 0;
            config._a = [], getParsingFlags(config).empty = !0;
            var i, parsedInput, tokens, token, skipped, string = "" + config._i,
                stringLength = string.length,
                totalParsedInputLength = 0;
            for (tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [], i = 0; i < tokens.length; i++) token = tokens[i], parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0], parsedInput && (skipped = string.substr(0, string.indexOf(parsedInput)), skipped.length > 0 && getParsingFlags(config).unusedInput.push(skipped), string = string.slice(string.indexOf(parsedInput) + parsedInput.length), totalParsedInputLength += parsedInput.length), formatTokenFunctions[token] ? (parsedInput ? getParsingFlags(config).empty = !1 : getParsingFlags(config).unusedTokens.push(token), addTimeToArrayFromToken(token, parsedInput, config)) : config._strict && !parsedInput && getParsingFlags(config).unusedTokens.push(token);
            getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength, string.length > 0 && getParsingFlags(config).unusedInput.push(string), getParsingFlags(config).bigHour === !0 && config._a[HOUR] <= 12 && config._a[HOUR] > 0 && (getParsingFlags(config).bigHour = void 0), config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem), configFromArray(config), checkOverflow(config)
        }

        function meridiemFixWrap(locale, hour, meridiem) {
            var isPm;
            return null == meridiem ? hour : null != locale.meridiemHour ? locale.meridiemHour(hour, meridiem) : null != locale.isPM ? (isPm = locale.isPM(meridiem), isPm && 12 > hour && (hour += 12), isPm || 12 !== hour || (hour = 0), hour) : hour
        }

        function configFromStringAndArray(config) {
            var tempConfig, bestMoment, scoreToBeat, i, currentScore;
            if (0 === config._f.length) return getParsingFlags(config).invalidFormat = !0, config._d = new Date(0 / 0), void 0;
            for (i = 0; i < config._f.length; i++) currentScore = 0, tempConfig = copyConfig({}, config), null != config._useUTC && (tempConfig._useUTC = config._useUTC), tempConfig._f = config._f[i], configFromStringAndFormat(tempConfig), valid__isValid(tempConfig) && (currentScore += getParsingFlags(tempConfig).charsLeftOver, currentScore += 10 * getParsingFlags(tempConfig).unusedTokens.length, getParsingFlags(tempConfig).score = currentScore, (null == scoreToBeat || scoreToBeat > currentScore) && (scoreToBeat = currentScore, bestMoment = tempConfig));
            extend(config, bestMoment || tempConfig)
        }

        function configFromObject(config) {
            if (!config._d) {
                var i = normalizeObjectUnits(config._i);
                config._a = [i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], configFromArray(config)
            }
        }

        function createFromConfig(config) {
            var res = new Moment(checkOverflow(prepareConfig(config)));
            return res._nextDay && (res.add(1, "d"), res._nextDay = void 0), res
        }

        function prepareConfig(config) {
            var input = config._i,
                format = config._f;
            return config._locale = config._locale || locale_locales__getLocale(config._l), null === input || void 0 === format && "" === input ? valid__createInvalid({
                nullInput: !0
            }) : ("string" == typeof input && (config._i = input = config._locale.preparse(input)), isMoment(input) ? new Moment(checkOverflow(input)) : (isArray(format) ? configFromStringAndArray(config) : format ? configFromStringAndFormat(config) : isDate(input) ? config._d = input : configFromInput(config), config))
        }

        function configFromInput(config) {
            var input = config._i;
            void 0 === input ? config._d = new Date : isDate(input) ? config._d = new Date(+input) : "string" == typeof input ? configFromString(config) : isArray(input) ? (config._a = map(input.slice(0), function(obj) {
                return parseInt(obj, 10)
            }), configFromArray(config)) : "object" == typeof input ? configFromObject(config) : "number" == typeof input ? config._d = new Date(input) : utils_hooks__hooks.createFromInputFallback(config)
        }

        function createLocalOrUTC(input, format, locale, strict, isUTC) {
            var c = {};
            return "boolean" == typeof locale && (strict = locale, locale = void 0), c._isAMomentObject = !0, c._useUTC = c._isUTC = isUTC, c._l = locale, c._i = input, c._f = format, c._strict = strict, createFromConfig(c)
        }

        function local__createLocal(input, format, locale, strict) {
            return createLocalOrUTC(input, format, locale, strict, !1)
        }

        function pickBy(fn, moments) {
            var res, i;
            if (1 === moments.length && isArray(moments[0]) && (moments = moments[0]), !moments.length) return local__createLocal();
            for (res = moments[0], i = 1; i < moments.length; ++i)(!moments[i].isValid() || moments[i][fn](res)) && (res = moments[i]);
            return res
        }

        function min() {
            var args = [].slice.call(arguments, 0);
            return pickBy("isBefore", args)
        }

        function max() {
            var args = [].slice.call(arguments, 0);
            return pickBy("isAfter", args)
        }

        function Duration(duration) {
            var normalizedInput = normalizeObjectUnits(duration),
                years = normalizedInput.year || 0,
                quarters = normalizedInput.quarter || 0,
                months = normalizedInput.month || 0,
                weeks = normalizedInput.week || 0,
                days = normalizedInput.day || 0,
                hours = normalizedInput.hour || 0,
                minutes = normalizedInput.minute || 0,
                seconds = normalizedInput.second || 0,
                milliseconds = normalizedInput.millisecond || 0;
            this._milliseconds = +milliseconds + 1e3 * seconds + 6e4 * minutes + 36e5 * hours, this._days = +days + 7 * weeks, this._months = +months + 3 * quarters + 12 * years, this._data = {}, this._locale = locale_locales__getLocale(), this._bubble()
        }

        function isDuration(obj) {
            return obj instanceof Duration
        }

        function offset(token, separator) {
            addFormatToken(token, 0, 0, function() {
                var offset = this.utcOffset(),
                    sign = "+";
                return 0 > offset && (offset = -offset, sign = "-"), sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~offset % 60, 2)
            })
        }

        function offsetFromString(string) {
            var matches = (string || "").match(matchOffset) || [],
                chunk = matches[matches.length - 1] || [],
                parts = (chunk + "").match(chunkOffset) || ["-", 0, 0],
                minutes = +(60 * parts[1]) + toInt(parts[2]);
            return "+" === parts[0] ? minutes : -minutes
        }

        function cloneWithOffset(input, model) {
            var res, diff;
            return model._isUTC ? (res = model.clone(), diff = (isMoment(input) || isDate(input) ? +input : +local__createLocal(input)) - +res, res._d.setTime(+res._d + diff), utils_hooks__hooks.updateOffset(res, !1), res) : local__createLocal(input).local()
        }

        function getDateOffset(m) {
            return 15 * -Math.round(m._d.getTimezoneOffset() / 15)
        }

        function getSetOffset(input, keepLocalTime) {
            var localAdjust, offset = this._offset || 0;
            return null != input ? ("string" == typeof input && (input = offsetFromString(input)), Math.abs(input) < 16 && (input = 60 * input), !this._isUTC && keepLocalTime && (localAdjust = getDateOffset(this)), this._offset = input, this._isUTC = !0, null != localAdjust && this.add(localAdjust, "m"), offset !== input && (!keepLocalTime || this._changeInProgress ? add_subtract__addSubtract(this, create__createDuration(input - offset, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, utils_hooks__hooks.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? offset : getDateOffset(this)
        }

        function getSetZone(input, keepLocalTime) {
            return null != input ? ("string" != typeof input && (input = -input), this.utcOffset(input, keepLocalTime), this) : -this.utcOffset()
        }

        function setOffsetToUTC(keepLocalTime) {
            return this.utcOffset(0, keepLocalTime)
        }

        function setOffsetToLocal(keepLocalTime) {
            return this._isUTC && (this.utcOffset(0, keepLocalTime), this._isUTC = !1, keepLocalTime && this.subtract(getDateOffset(this), "m")), this
        }

        function setOffsetToParsedOffset() {
            return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(offsetFromString(this._i)), this
        }

        function hasAlignedHourOffset(input) {
            return input = input ? local__createLocal(input).utcOffset() : 0, (this.utcOffset() - input) % 60 === 0
        }

        function isDaylightSavingTime() {
            return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
        }

        function isDaylightSavingTimeShifted() {
            if ("undefined" != typeof this._isDSTShifted) return this._isDSTShifted;
            var c = {};
            if (copyConfig(c, this), c = prepareConfig(c), c._a) {
                var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
                this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0
            } else this._isDSTShifted = !1;
            return this._isDSTShifted
        }

        function isLocal() {
            return !this._isUTC
        }

        function isUtcOffset() {
            return this._isUTC
        }

        function isUtc() {
            return this._isUTC && 0 === this._offset
        }

        function create__createDuration(input, key) {
            var sign, ret, diffRes, duration = input,
                match = null;
            return isDuration(input) ? duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months
            } : "number" == typeof input ? (duration = {}, key ? duration[key] = input : duration.milliseconds = input) : (match = aspNetRegex.exec(input)) ? (sign = "-" === match[1] ? -1 : 1, duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(match[MILLISECOND]) * sign
            }) : (match = create__isoRegex.exec(input)) ? (sign = "-" === match[1] ? -1 : 1, duration = {
                y: parseIso(match[2], sign),
                M: parseIso(match[3], sign),
                d: parseIso(match[4], sign),
                h: parseIso(match[5], sign),
                m: parseIso(match[6], sign),
                s: parseIso(match[7], sign),
                w: parseIso(match[8], sign)
            }) : null == duration ? duration = {} : "object" == typeof duration && ("from" in duration || "to" in duration) && (diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to)), duration = {}, duration.ms = diffRes.milliseconds, duration.M = diffRes.months), ret = new Duration(duration), isDuration(input) && hasOwnProp(input, "_locale") && (ret._locale = input._locale), ret
        }

        function parseIso(inp, sign) {
            var res = inp && parseFloat(inp.replace(",", "."));
            return (isNaN(res) ? 0 : res) * sign
        }

        function positiveMomentsDifference(base, other) {
            var res = {
                milliseconds: 0,
                months: 0
            };
            return res.months = other.month() - base.month() + 12 * (other.year() - base.year()), base.clone().add(res.months, "M").isAfter(other) && --res.months, res.milliseconds = +other - +base.clone().add(res.months, "M"), res
        }

        function momentsDifference(base, other) {
            var res;
            return other = cloneWithOffset(other, base), base.isBefore(other) ? res = positiveMomentsDifference(base, other) : (res = positiveMomentsDifference(other, base), res.milliseconds = -res.milliseconds, res.months = -res.months), res
        }

        function createAdder(direction, name) {
            return function(val, period) {
                var dur, tmp;
                return null === period || isNaN(+period) || (deprecateSimple(name, "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period)."), tmp = val, val = period, period = tmp), val = "string" == typeof val ? +val : val, dur = create__createDuration(val, period), add_subtract__addSubtract(this, dur, direction), this
            }
        }

        function add_subtract__addSubtract(mom, duration, isAdding, updateOffset) {
            var milliseconds = duration._milliseconds,
                days = duration._days,
                months = duration._months;
            updateOffset = null == updateOffset ? !0 : updateOffset, milliseconds && mom._d.setTime(+mom._d + milliseconds * isAdding), days && get_set__set(mom, "Date", get_set__get(mom, "Date") + days * isAdding), months && setMonth(mom, get_set__get(mom, "Month") + months * isAdding), updateOffset && utils_hooks__hooks.updateOffset(mom, days || months)
        }

        function moment_calendar__calendar(time, formats) {
            var now = time || local__createLocal(),
                sod = cloneWithOffset(now, this).startOf("day"),
                diff = this.diff(sod, "days", !0),
                format = -6 > diff ? "sameElse" : -1 > diff ? "lastWeek" : 0 > diff ? "lastDay" : 1 > diff ? "sameDay" : 2 > diff ? "nextDay" : 7 > diff ? "nextWeek" : "sameElse";
            return this.format(formats && formats[format] || this.localeData().calendar(format, this, local__createLocal(now)))
        }

        function clone() {
            return new Moment(this)
        }

        function isAfter(input, units) {
            var inputMs;
            return units = normalizeUnits("undefined" != typeof units ? units : "millisecond"), "millisecond" === units ? (input = isMoment(input) ? input : local__createLocal(input), +this > +input) : (inputMs = isMoment(input) ? +input : +local__createLocal(input), inputMs < +this.clone().startOf(units))
        }

        function isBefore(input, units) {
            var inputMs;
            return units = normalizeUnits("undefined" != typeof units ? units : "millisecond"), "millisecond" === units ? (input = isMoment(input) ? input : local__createLocal(input), +input > +this) : (inputMs = isMoment(input) ? +input : +local__createLocal(input), +this.clone().endOf(units) < inputMs)
        }

        function isBetween(from, to, units) {
            return this.isAfter(from, units) && this.isBefore(to, units)
        }

        function isSame(input, units) {
            var inputMs;
            return units = normalizeUnits(units || "millisecond"), "millisecond" === units ? (input = isMoment(input) ? input : local__createLocal(input), +this === +input) : (inputMs = +local__createLocal(input), +this.clone().startOf(units) <= inputMs && inputMs <= +this.clone().endOf(units))
        }

        function diff(input, units, asFloat) {
            var delta, output, that = cloneWithOffset(input, this),
                zoneDelta = 6e4 * (that.utcOffset() - this.utcOffset());
            return units = normalizeUnits(units), "year" === units || "month" === units || "quarter" === units ? (output = monthDiff(this, that), "quarter" === units ? output /= 3 : "year" === units && (output /= 12)) : (delta = this - that, output = "second" === units ? delta / 1e3 : "minute" === units ? delta / 6e4 : "hour" === units ? delta / 36e5 : "day" === units ? (delta - zoneDelta) / 864e5 : "week" === units ? (delta - zoneDelta) / 6048e5 : delta), asFloat ? output : absFloor(output)
        }

        function monthDiff(a, b) {
            var anchor2, adjust, wholeMonthDiff = 12 * (b.year() - a.year()) + (b.month() - a.month()),
                anchor = a.clone().add(wholeMonthDiff, "months");
            return 0 > b - anchor ? (anchor2 = a.clone().add(wholeMonthDiff - 1, "months"), adjust = (b - anchor) / (anchor - anchor2)) : (anchor2 = a.clone().add(wholeMonthDiff + 1, "months"), adjust = (b - anchor) / (anchor2 - anchor)), -(wholeMonthDiff + adjust)
        }

        function toString() {
            return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
        }

        function moment_format__toISOString() {
            var m = this.clone().utc();
            return 0 < m.year() && m.year() <= 9999 ? "function" == typeof Date.prototype.toISOString ? this.toDate().toISOString() : formatMoment(m, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : formatMoment(m, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
        }

        function format(inputString) {
            var output = formatMoment(this, inputString || utils_hooks__hooks.defaultFormat);
            return this.localeData().postformat(output)
        }

        function from(time, withoutSuffix) {
            return this.isValid() ? create__createDuration({
                to: this,
                from: time
            }).locale(this.locale()).humanize(!withoutSuffix) : this.localeData().invalidDate()
        }

        function fromNow(withoutSuffix) {
            return this.from(local__createLocal(), withoutSuffix)
        }

        function to(time, withoutSuffix) {
            return this.isValid() ? create__createDuration({
                from: this,
                to: time
            }).locale(this.locale()).humanize(!withoutSuffix) : this.localeData().invalidDate()
        }

        function toNow(withoutSuffix) {
            return this.to(local__createLocal(), withoutSuffix)
        }

        function locale(key) {
            var newLocaleData;
            return void 0 === key ? this._locale._abbr : (newLocaleData = locale_locales__getLocale(key), null != newLocaleData && (this._locale = newLocaleData), this)
        }

        function localeData() {
            return this._locale
        }

        function startOf(units) {
            switch (units = normalizeUnits(units)) {
                case "year":
                    this.month(0);
                case "quarter":
                case "month":
                    this.date(1);
                case "week":
                case "isoWeek":
                case "day":
                    this.hours(0);
                case "hour":
                    this.minutes(0);
                case "minute":
                    this.seconds(0);
                case "second":
                    this.milliseconds(0)
            }
            return "week" === units && this.weekday(0), "isoWeek" === units && this.isoWeekday(1), "quarter" === units && this.month(3 * Math.floor(this.month() / 3)), this
        }

        function endOf(units) {
            return units = normalizeUnits(units), void 0 === units || "millisecond" === units ? this : this.startOf(units).add(1, "isoWeek" === units ? "week" : units).subtract(1, "ms")
        }

        function to_type__valueOf() {
            return +this._d - 6e4 * (this._offset || 0)
        }

        function unix() {
            return Math.floor(+this / 1e3)
        }

        function toDate() {
            return this._offset ? new Date(+this) : this._d
        }

        function toArray() {
            var m = this;
            return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()]
        }

        function toObject() {
            var m = this;
            return {
                years: m.year(),
                months: m.month(),
                date: m.date(),
                hours: m.hours(),
                minutes: m.minutes(),
                seconds: m.seconds(),
                milliseconds: m.milliseconds()
            }
        }

        function moment_valid__isValid() {
            return valid__isValid(this)
        }

        function parsingFlags() {
            return extend({}, getParsingFlags(this))
        }

        function invalidAt() {
            return getParsingFlags(this).overflow
        }

        function addWeekYearFormatToken(token, getter) {
            addFormatToken(0, [token, token.length], 0, getter)
        }

        function weeksInYear(year, dow, doy) {
            return weekOfYear(local__createLocal([year, 11, 31 + dow - doy]), dow, doy).week
        }

        function getSetWeekYear(input) {
            var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
            return null == input ? year : this.add(input - year, "y")
        }

        function getSetISOWeekYear(input) {
            var year = weekOfYear(this, 1, 4).year;
            return null == input ? year : this.add(input - year, "y")
        }

        function getISOWeeksInYear() {
            return weeksInYear(this.year(), 1, 4)
        }

        function getWeeksInYear() {
            var weekInfo = this.localeData()._week;
            return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy)
        }

        function getSetQuarter(input) {
            return null == input ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (input - 1) + this.month() % 3)
        }

        function parseWeekday(input, locale) {
            return "string" != typeof input ? input : isNaN(input) ? (input = locale.weekdaysParse(input), "number" == typeof input ? input : null) : parseInt(input, 10)
        }

        function localeWeekdays(m) {
            return this._weekdays[m.day()]
        }

        function localeWeekdaysShort(m) {
            return this._weekdaysShort[m.day()]
        }

        function localeWeekdaysMin(m) {
            return this._weekdaysMin[m.day()]
        }

        function localeWeekdaysParse(weekdayName) {
            var i, mom, regex;
            for (this._weekdaysParse = this._weekdaysParse || [], i = 0; 7 > i; i++)
                if (this._weekdaysParse[i] || (mom = local__createLocal([2e3, 1]).day(i), regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, ""), this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i")), this._weekdaysParse[i].test(weekdayName)) return i
        }

        function getSetDayOfWeek(input) {
            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return null != input ? (input = parseWeekday(input, this.localeData()), this.add(input - day, "d")) : day
        }

        function getSetLocaleDayOfWeek(input) {
            var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return null == input ? weekday : this.add(input - weekday, "d")
        }

        function getSetISODayOfWeek(input) {
            return null == input ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7)
        }

        function meridiem(token, lowercase) {
            addFormatToken(token, 0, 0, function() {
                return this.localeData().meridiem(this.hours(), this.minutes(), lowercase)
            })
        }

        function matchMeridiem(isStrict, locale) {
            return locale._meridiemParse
        }

        function localeIsPM(input) {
            return "p" === (input + "").toLowerCase().charAt(0)
        }

        function localeMeridiem(hours, minutes, isLower) {
            return hours > 11 ? isLower ? "pm" : "PM" : isLower ? "am" : "AM"
        }

        function parseMs(input, array) {
            array[MILLISECOND] = toInt(1e3 * ("0." + input))
        }

        function getZoneAbbr() {
            return this._isUTC ? "UTC" : ""
        }

        function getZoneName() {
            return this._isUTC ? "Coordinated Universal Time" : ""
        }

        function moment__createUnix(input) {
            return local__createLocal(1e3 * input)
        }

        function moment__createInZone() {
            return local__createLocal.apply(null, arguments).parseZone()
        }

        function locale_calendar__calendar(key, mom, now) {
            var output = this._calendar[key];
            return "function" == typeof output ? output.call(mom, now) : output
        }

        function longDateFormat(key) {
            var format = this._longDateFormat[key],
                formatUpper = this._longDateFormat[key.toUpperCase()];
            return format || !formatUpper ? format : (this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function(val) {
                return val.slice(1)
            }), this._longDateFormat[key])
        }

        function invalidDate() {
            return this._invalidDate
        }

        function ordinal(number) {
            return this._ordinal.replace("%d", number)
        }

        function preParsePostFormat(string) {
            return string
        }

        function relative__relativeTime(number, withoutSuffix, string, isFuture) {
            var output = this._relativeTime[string];
            return "function" == typeof output ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number)
        }

        function pastFuture(diff, output) {
            var format = this._relativeTime[diff > 0 ? "future" : "past"];
            return "function" == typeof format ? format(output) : format.replace(/%s/i, output)
        }

        function locale_set__set(config) {
            var prop, i;
            for (i in config) prop = config[i], "function" == typeof prop ? this[i] = prop : this["_" + i] = prop;
            this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
        }

        function lists__get(format, index, field, setter) {
            var locale = locale_locales__getLocale(),
                utc = create_utc__createUTC().set(setter, index);
            return locale[field](utc, format)
        }

        function list(format, index, field, count, setter) {
            if ("number" == typeof format && (index = format, format = void 0), format = format || "", null != index) return lists__get(format, index, field, setter);
            var i, out = [];
            for (i = 0; count > i; i++) out[i] = lists__get(format, i, field, setter);
            return out
        }

        function lists__listMonths(format, index) {
            return list(format, index, "months", 12, "month")
        }

        function lists__listMonthsShort(format, index) {
            return list(format, index, "monthsShort", 12, "month")
        }

        function lists__listWeekdays(format, index) {
            return list(format, index, "weekdays", 7, "day")
        }

        function lists__listWeekdaysShort(format, index) {
            return list(format, index, "weekdaysShort", 7, "day")
        }

        function lists__listWeekdaysMin(format, index) {
            return list(format, index, "weekdaysMin", 7, "day")
        }

        function duration_abs__abs() {
            var data = this._data;
            return this._milliseconds = mathAbs(this._milliseconds), this._days = mathAbs(this._days), this._months = mathAbs(this._months), data.milliseconds = mathAbs(data.milliseconds), data.seconds = mathAbs(data.seconds), data.minutes = mathAbs(data.minutes), data.hours = mathAbs(data.hours), data.months = mathAbs(data.months), data.years = mathAbs(data.years), this
        }

        function duration_add_subtract__addSubtract(duration, input, value, direction) {
            var other = create__createDuration(input, value);
            return duration._milliseconds += direction * other._milliseconds, duration._days += direction * other._days, duration._months += direction * other._months, duration._bubble()
        }

        function duration_add_subtract__add(input, value) {
            return duration_add_subtract__addSubtract(this, input, value, 1)
        }

        function duration_add_subtract__subtract(input, value) {
            return duration_add_subtract__addSubtract(this, input, value, -1)
        }

        function absCeil(number) {
            return 0 > number ? Math.floor(number) : Math.ceil(number)
        }

        function bubble() {
            var seconds, minutes, hours, years, monthsFromDays, milliseconds = this._milliseconds,
                days = this._days,
                months = this._months,
                data = this._data;
            return milliseconds >= 0 && days >= 0 && months >= 0 || 0 >= milliseconds && 0 >= days && 0 >= months || (milliseconds += 864e5 * absCeil(monthsToDays(months) + days), days = 0, months = 0), data.milliseconds = milliseconds % 1e3, seconds = absFloor(milliseconds / 1e3), data.seconds = seconds % 60, minutes = absFloor(seconds / 60), data.minutes = minutes % 60, hours = absFloor(minutes / 60), data.hours = hours % 24, days += absFloor(hours / 24), monthsFromDays = absFloor(daysToMonths(days)), months += monthsFromDays, days -= absCeil(monthsToDays(monthsFromDays)), years = absFloor(months / 12), months %= 12, data.days = days, data.months = months, data.years = years, this
        }

        function daysToMonths(days) {
            return 4800 * days / 146097
        }

        function monthsToDays(months) {
            return 146097 * months / 4800
        }

        function as(units) {
            var days, months, milliseconds = this._milliseconds;
            if (units = normalizeUnits(units), "month" === units || "year" === units) return days = this._days + milliseconds / 864e5, months = this._months + daysToMonths(days), "month" === units ? months : months / 12;
            switch (days = this._days + Math.round(monthsToDays(this._months)), units) {
                case "week":
                    return days / 7 + milliseconds / 6048e5;
                case "day":
                    return days + milliseconds / 864e5;
                case "hour":
                    return 24 * days + milliseconds / 36e5;
                case "minute":
                    return 1440 * days + milliseconds / 6e4;
                case "second":
                    return 86400 * days + milliseconds / 1e3;
                case "millisecond":
                    return Math.floor(864e5 * days) + milliseconds;
                default:
                    throw new Error("Unknown unit " + units)
            }
        }

        function duration_as__valueOf() {
            return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * toInt(this._months / 12)
        }

        function makeAs(alias) {
            return function() {
                return this.as(alias)
            }
        }

        function duration_get__get(units) {
            return units = normalizeUnits(units), this[units + "s"]()
        }

        function makeGetter(name) {
            return function() {
                return this._data[name]
            }
        }

        function weeks() {
            return absFloor(this.days() / 7)
        }

        function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
            return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture)
        }

        function duration_humanize__relativeTime(posNegDuration, withoutSuffix, locale) {
            var duration = create__createDuration(posNegDuration).abs(),
                seconds = round(duration.as("s")),
                minutes = round(duration.as("m")),
                hours = round(duration.as("h")),
                days = round(duration.as("d")),
                months = round(duration.as("M")),
                years = round(duration.as("y")),
                a = seconds < thresholds.s && ["s", seconds] || 1 === minutes && ["m"] || minutes < thresholds.m && ["mm", minutes] || 1 === hours && ["h"] || hours < thresholds.h && ["hh", hours] || 1 === days && ["d"] || days < thresholds.d && ["dd", days] || 1 === months && ["M"] || months < thresholds.M && ["MM", months] || 1 === years && ["y"] || ["yy", years];
            return a[2] = withoutSuffix, a[3] = +posNegDuration > 0, a[4] = locale, substituteTimeAgo.apply(null, a)
        }

        function duration_humanize__getSetRelativeTimeThreshold(threshold, limit) {
            return void 0 === thresholds[threshold] ? !1 : void 0 === limit ? thresholds[threshold] : (thresholds[threshold] = limit, !0)
        }

        function humanize(withSuffix) {
            var locale = this.localeData(),
                output = duration_humanize__relativeTime(this, !withSuffix, locale);
            return withSuffix && (output = locale.pastFuture(+this, output)), locale.postformat(output)
        }

        function iso_string__toISOString() {
            var minutes, hours, years, seconds = iso_string__abs(this._milliseconds) / 1e3,
                days = iso_string__abs(this._days),
                months = iso_string__abs(this._months);
            minutes = absFloor(seconds / 60), hours = absFloor(minutes / 60), seconds %= 60, minutes %= 60, years = absFloor(months / 12), months %= 12;
            var Y = years,
                M = months,
                D = days,
                h = hours,
                m = minutes,
                s = seconds,
                total = this.asSeconds();
            return total ? (0 > total ? "-" : "") + "P" + (Y ? Y + "Y" : "") + (M ? M + "M" : "") + (D ? D + "D" : "") + (h || m || s ? "T" : "") + (h ? h + "H" : "") + (m ? m + "M" : "") + (s ? s + "S" : "") : "P0D"
        }
        var hookCallback, globalLocale, momentProperties = utils_hooks__hooks.momentProperties = [],
            updateInProgress = !1,
            locales = {},
            aliases = {},
            formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
            localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
            formatFunctions = {},
            formatTokenFunctions = {},
            match1 = /\d/,
            match2 = /\d\d/,
            match3 = /\d{3}/,
            match4 = /\d{4}/,
            match6 = /[+-]?\d{6}/,
            match1to2 = /\d\d?/,
            match1to3 = /\d{1,3}/,
            match1to4 = /\d{1,4}/,
            match1to6 = /[+-]?\d{1,6}/,
            matchUnsigned = /\d+/,
            matchSigned = /[+-]?\d+/,
            matchOffset = /Z|[+-]\d\d:?\d\d/gi,
            matchTimestamp = /[+-]?\d+(\.\d{1,3})?/,
            matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
            regexes = {},
            tokens = {},
            YEAR = 0,
            MONTH = 1,
            DATE = 2,
            HOUR = 3,
            MINUTE = 4,
            SECOND = 5,
            MILLISECOND = 6;
        addFormatToken("M", ["MM", 2], "Mo", function() {
            return this.month() + 1
        }), addFormatToken("MMM", 0, 0, function(format) {
            return this.localeData().monthsShort(this, format)
        }), addFormatToken("MMMM", 0, 0, function(format) {
            return this.localeData().months(this, format)
        }), addUnitAlias("month", "M"), addRegexToken("M", match1to2), addRegexToken("MM", match1to2, match2), addRegexToken("MMM", matchWord), addRegexToken("MMMM", matchWord), addParseToken(["M", "MM"], function(input, array) {
            array[MONTH] = toInt(input) - 1
        }), addParseToken(["MMM", "MMMM"], function(input, array, config, token) {
            var month = config._locale.monthsParse(input, token, config._strict);
            null != month ? array[MONTH] = month : getParsingFlags(config).invalidMonth = input
        });
        var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
            defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            deprecations = {};
        utils_hooks__hooks.suppressDeprecationWarnings = !1;
        var from_string__isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
            isoDates = [
                ["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/],
                ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/],
                ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/],
                ["GGGG-[W]WW", /\d{4}-W\d{2}/],
                ["YYYY-DDD", /\d{4}-\d{3}/]
            ],
            isoTimes = [
                ["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/],
                ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
                ["HH:mm", /(T| )\d\d:\d\d/],
                ["HH", /(T| )\d\d/]
            ],
            aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;
        utils_hooks__hooks.createFromInputFallback = deprecate("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(config) {
            config._d = new Date(config._i + (config._useUTC ? " UTC" : ""))
        }), addFormatToken(0, ["YY", 2], 0, function() {
            return this.year() % 100
        }), addFormatToken(0, ["YYYY", 4], 0, "year"), addFormatToken(0, ["YYYYY", 5], 0, "year"), addFormatToken(0, ["YYYYYY", 6, !0], 0, "year"), addUnitAlias("year", "y"), addRegexToken("Y", matchSigned), addRegexToken("YY", match1to2, match2), addRegexToken("YYYY", match1to4, match4), addRegexToken("YYYYY", match1to6, match6), addRegexToken("YYYYYY", match1to6, match6), addParseToken(["YYYYY", "YYYYYY"], YEAR), addParseToken("YYYY", function(input, array) {
            array[YEAR] = 2 === input.length ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input)
        }), addParseToken("YY", function(input, array) {
            array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input)
        }), utils_hooks__hooks.parseTwoDigitYear = function(input) {
            return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3)
        };
        var getSetYear = makeGetSet("FullYear", !1);
        addFormatToken("w", ["ww", 2], "wo", "week"), addFormatToken("W", ["WW", 2], "Wo", "isoWeek"), addUnitAlias("week", "w"), addUnitAlias("isoWeek", "W"), addRegexToken("w", match1to2), addRegexToken("ww", match1to2, match2), addRegexToken("W", match1to2), addRegexToken("WW", match1to2, match2), addWeekParseToken(["w", "ww", "W", "WW"], function(input, week, config, token) {
            week[token.substr(0, 1)] = toInt(input)
        });
        var defaultLocaleWeek = {
            dow: 0,
            doy: 6
        };
        addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), addUnitAlias("dayOfYear", "DDD"), addRegexToken("DDD", match1to3), addRegexToken("DDDD", match3), addParseToken(["DDD", "DDDD"], function(input, array, config) {
            config._dayOfYear = toInt(input)
        }), utils_hooks__hooks.ISO_8601 = function() {};
        var prototypeMin = deprecate("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function() {
                var other = local__createLocal.apply(null, arguments);
                return this > other ? this : other
            }),
            prototypeMax = deprecate("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function() {
                var other = local__createLocal.apply(null, arguments);
                return other > this ? this : other
            });
        offset("Z", ":"), offset("ZZ", ""), addRegexToken("Z", matchOffset), addRegexToken("ZZ", matchOffset), addParseToken(["Z", "ZZ"], function(input, array, config) {
            config._useUTC = !0, config._tzm = offsetFromString(input)
        });
        var chunkOffset = /([\+\-]|\d\d)/gi;
        utils_hooks__hooks.updateOffset = function() {};
        var aspNetRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,
            create__isoRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
        create__createDuration.fn = Duration.prototype;
        var add_subtract__add = createAdder(1, "add"),
            add_subtract__subtract = createAdder(-1, "subtract");
        utils_hooks__hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
        var lang = deprecate("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(key) {
            return void 0 === key ? this.localeData() : this.locale(key)
        });
        addFormatToken(0, ["gg", 2], 0, function() {
            return this.weekYear() % 100
        }), addFormatToken(0, ["GG", 2], 0, function() {
            return this.isoWeekYear() % 100
        }), addWeekYearFormatToken("gggg", "weekYear"), addWeekYearFormatToken("ggggg", "weekYear"), addWeekYearFormatToken("GGGG", "isoWeekYear"), addWeekYearFormatToken("GGGGG", "isoWeekYear"), addUnitAlias("weekYear", "gg"), addUnitAlias("isoWeekYear", "GG"), addRegexToken("G", matchSigned), addRegexToken("g", matchSigned), addRegexToken("GG", match1to2, match2), addRegexToken("gg", match1to2, match2), addRegexToken("GGGG", match1to4, match4), addRegexToken("gggg", match1to4, match4), addRegexToken("GGGGG", match1to6, match6), addRegexToken("ggggg", match1to6, match6), addWeekParseToken(["gggg", "ggggg", "GGGG", "GGGGG"], function(input, week, config, token) {
            week[token.substr(0, 2)] = toInt(input)
        }), addWeekParseToken(["gg", "GG"], function(input, week, config, token) {
            week[token] = utils_hooks__hooks.parseTwoDigitYear(input)
        }), addFormatToken("Q", 0, 0, "quarter"), addUnitAlias("quarter", "Q"), addRegexToken("Q", match1), addParseToken("Q", function(input, array) {
            array[MONTH] = 3 * (toInt(input) - 1)
        }), addFormatToken("D", ["DD", 2], "Do", "date"), addUnitAlias("date", "D"), addRegexToken("D", match1to2), addRegexToken("DD", match1to2, match2), addRegexToken("Do", function(isStrict, locale) {
            return isStrict ? locale._ordinalParse : locale._ordinalParseLenient
        }), addParseToken(["D", "DD"], DATE), addParseToken("Do", function(input, array) {
            array[DATE] = toInt(input.match(match1to2)[0], 10)
        });
        var getSetDayOfMonth = makeGetSet("Date", !0);
        addFormatToken("d", 0, "do", "day"), addFormatToken("dd", 0, 0, function(format) {
            return this.localeData().weekdaysMin(this, format)
        }), addFormatToken("ddd", 0, 0, function(format) {
            return this.localeData().weekdaysShort(this, format)
        }), addFormatToken("dddd", 0, 0, function(format) {
            return this.localeData().weekdays(this, format)
        }), addFormatToken("e", 0, 0, "weekday"), addFormatToken("E", 0, 0, "isoWeekday"), addUnitAlias("day", "d"), addUnitAlias("weekday", "e"), addUnitAlias("isoWeekday", "E"), addRegexToken("d", match1to2), addRegexToken("e", match1to2), addRegexToken("E", match1to2), addRegexToken("dd", matchWord), addRegexToken("ddd", matchWord), addRegexToken("dddd", matchWord), addWeekParseToken(["dd", "ddd", "dddd"], function(input, week, config) {
            var weekday = config._locale.weekdaysParse(input);
            null != weekday ? week.d = weekday : getParsingFlags(config).invalidWeekday = input
        }), addWeekParseToken(["d", "e", "E"], function(input, week, config, token) {
            week[token] = toInt(input)
        });
        var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
            defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
        addFormatToken("H", ["HH", 2], 0, "hour"), addFormatToken("h", ["hh", 2], 0, function() {
            return this.hours() % 12 || 12
        }), meridiem("a", !0), meridiem("A", !1), addUnitAlias("hour", "h"), addRegexToken("a", matchMeridiem), addRegexToken("A", matchMeridiem), addRegexToken("H", match1to2), addRegexToken("h", match1to2), addRegexToken("HH", match1to2, match2), addRegexToken("hh", match1to2, match2), addParseToken(["H", "HH"], HOUR), addParseToken(["a", "A"], function(input, array, config) {
            config._isPm = config._locale.isPM(input), config._meridiem = input
        }), addParseToken(["h", "hh"], function(input, array, config) {
            array[HOUR] = toInt(input), getParsingFlags(config).bigHour = !0
        });
        var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i,
            getSetHour = makeGetSet("Hours", !0);
        addFormatToken("m", ["mm", 2], 0, "minute"), addUnitAlias("minute", "m"), addRegexToken("m", match1to2), addRegexToken("mm", match1to2, match2), addParseToken(["m", "mm"], MINUTE);
        var getSetMinute = makeGetSet("Minutes", !1);
        addFormatToken("s", ["ss", 2], 0, "second"), addUnitAlias("second", "s"), addRegexToken("s", match1to2), addRegexToken("ss", match1to2, match2), addParseToken(["s", "ss"], SECOND);
        var getSetSecond = makeGetSet("Seconds", !1);
        addFormatToken("S", 0, 0, function() {
            return ~~(this.millisecond() / 100)
        }), addFormatToken(0, ["SS", 2], 0, function() {
            return ~~(this.millisecond() / 10)
        }), addFormatToken(0, ["SSS", 3], 0, "millisecond"), addFormatToken(0, ["SSSS", 4], 0, function() {
            return 10 * this.millisecond()
        }), addFormatToken(0, ["SSSSS", 5], 0, function() {
            return 100 * this.millisecond()
        }), addFormatToken(0, ["SSSSSS", 6], 0, function() {
            return 1e3 * this.millisecond()
        }), addFormatToken(0, ["SSSSSSS", 7], 0, function() {
            return 1e4 * this.millisecond()
        }), addFormatToken(0, ["SSSSSSSS", 8], 0, function() {
            return 1e5 * this.millisecond()
        }), addFormatToken(0, ["SSSSSSSSS", 9], 0, function() {
            return 1e6 * this.millisecond()
        }), addUnitAlias("millisecond", "ms"), addRegexToken("S", match1to3, match1), addRegexToken("SS", match1to3, match2), addRegexToken("SSS", match1to3, match3);
        var token;
        for (token = "SSSS"; token.length <= 9; token += "S") addRegexToken(token, matchUnsigned);
        for (token = "S"; token.length <= 9; token += "S") addParseToken(token, parseMs);
        var getSetMillisecond = makeGetSet("Milliseconds", !1);
        addFormatToken("z", 0, 0, "zoneAbbr"), addFormatToken("zz", 0, 0, "zoneName");
        var momentPrototype__proto = Moment.prototype;
        momentPrototype__proto.add = add_subtract__add, momentPrototype__proto.calendar = moment_calendar__calendar, momentPrototype__proto.clone = clone, momentPrototype__proto.diff = diff, momentPrototype__proto.endOf = endOf, momentPrototype__proto.format = format, momentPrototype__proto.from = from, momentPrototype__proto.fromNow = fromNow, momentPrototype__proto.to = to, momentPrototype__proto.toNow = toNow, momentPrototype__proto.get = getSet, momentPrototype__proto.invalidAt = invalidAt, momentPrototype__proto.isAfter = isAfter, momentPrototype__proto.isBefore = isBefore, momentPrototype__proto.isBetween = isBetween, momentPrototype__proto.isSame = isSame, momentPrototype__proto.isValid = moment_valid__isValid, momentPrototype__proto.lang = lang, momentPrototype__proto.locale = locale, momentPrototype__proto.localeData = localeData, momentPrototype__proto.max = prototypeMax, momentPrototype__proto.min = prototypeMin, momentPrototype__proto.parsingFlags = parsingFlags, momentPrototype__proto.set = getSet, momentPrototype__proto.startOf = startOf, momentPrototype__proto.subtract = add_subtract__subtract, momentPrototype__proto.toArray = toArray, momentPrototype__proto.toObject = toObject, momentPrototype__proto.toDate = toDate, momentPrototype__proto.toISOString = moment_format__toISOString, momentPrototype__proto.toJSON = moment_format__toISOString, momentPrototype__proto.toString = toString, momentPrototype__proto.unix = unix, momentPrototype__proto.valueOf = to_type__valueOf, momentPrototype__proto.year = getSetYear, momentPrototype__proto.isLeapYear = getIsLeapYear, momentPrototype__proto.weekYear = getSetWeekYear, momentPrototype__proto.isoWeekYear = getSetISOWeekYear, momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter, momentPrototype__proto.month = getSetMonth, momentPrototype__proto.daysInMonth = getDaysInMonth, momentPrototype__proto.week = momentPrototype__proto.weeks = getSetWeek, momentPrototype__proto.isoWeek = momentPrototype__proto.isoWeeks = getSetISOWeek, momentPrototype__proto.weeksInYear = getWeeksInYear, momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear, momentPrototype__proto.date = getSetDayOfMonth, momentPrototype__proto.day = momentPrototype__proto.days = getSetDayOfWeek, momentPrototype__proto.weekday = getSetLocaleDayOfWeek, momentPrototype__proto.isoWeekday = getSetISODayOfWeek, momentPrototype__proto.dayOfYear = getSetDayOfYear, momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour, momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute, momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond, momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond, momentPrototype__proto.utcOffset = getSetOffset, momentPrototype__proto.utc = setOffsetToUTC, momentPrototype__proto.local = setOffsetToLocal, momentPrototype__proto.parseZone = setOffsetToParsedOffset, momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset, momentPrototype__proto.isDST = isDaylightSavingTime, momentPrototype__proto.isDSTShifted = isDaylightSavingTimeShifted, momentPrototype__proto.isLocal = isLocal, momentPrototype__proto.isUtcOffset = isUtcOffset, momentPrototype__proto.isUtc = isUtc, momentPrototype__proto.isUTC = isUtc, momentPrototype__proto.zoneAbbr = getZoneAbbr, momentPrototype__proto.zoneName = getZoneName, momentPrototype__proto.dates = deprecate("dates accessor is deprecated. Use date instead.", getSetDayOfMonth), momentPrototype__proto.months = deprecate("months accessor is deprecated. Use month instead", getSetMonth), momentPrototype__proto.years = deprecate("years accessor is deprecated. Use year instead", getSetYear), momentPrototype__proto.zone = deprecate("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", getSetZone);
        var momentPrototype = momentPrototype__proto,
            defaultCalendar = {
                sameDay: "[Today at] LT",
                nextDay: "[Tomorrow at] LT",
                nextWeek: "dddd [at] LT",
                lastDay: "[Yesterday at] LT",
                lastWeek: "[Last] dddd [at] LT",
                sameElse: "L"
            },
            defaultLongDateFormat = {
                LTS: "h:mm:ss A",
                LT: "h:mm A",
                L: "MM/DD/YYYY",
                LL: "MMMM D, YYYY",
                LLL: "MMMM D, YYYY h:mm A",
                LLLL: "dddd, MMMM D, YYYY h:mm A"
            },
            defaultInvalidDate = "Invalid date",
            defaultOrdinal = "%d",
            defaultOrdinalParse = /\d{1,2}/,
            defaultRelativeTime = {
                future: "in %s",
                past: "%s ago",
                s: "a few seconds",
                m: "a minute",
                mm: "%d minutes",
                h: "an hour",
                hh: "%d hours",
                d: "a day",
                dd: "%d days",
                M: "a month",
                MM: "%d months",
                y: "a year",
                yy: "%d years"
            },
            prototype__proto = Locale.prototype;
        prototype__proto._calendar = defaultCalendar, prototype__proto.calendar = locale_calendar__calendar, prototype__proto._longDateFormat = defaultLongDateFormat, prototype__proto.longDateFormat = longDateFormat, prototype__proto._invalidDate = defaultInvalidDate, prototype__proto.invalidDate = invalidDate, prototype__proto._ordinal = defaultOrdinal, prototype__proto.ordinal = ordinal, prototype__proto._ordinalParse = defaultOrdinalParse, prototype__proto.preparse = preParsePostFormat, prototype__proto.postformat = preParsePostFormat, prototype__proto._relativeTime = defaultRelativeTime, prototype__proto.relativeTime = relative__relativeTime, prototype__proto.pastFuture = pastFuture, prototype__proto.set = locale_set__set, prototype__proto.months = localeMonths, prototype__proto._months = defaultLocaleMonths, prototype__proto.monthsShort = localeMonthsShort, prototype__proto._monthsShort = defaultLocaleMonthsShort, prototype__proto.monthsParse = localeMonthsParse, prototype__proto.week = localeWeek, prototype__proto._week = defaultLocaleWeek, prototype__proto.firstDayOfYear = localeFirstDayOfYear, prototype__proto.firstDayOfWeek = localeFirstDayOfWeek, prototype__proto.weekdays = localeWeekdays, prototype__proto._weekdays = defaultLocaleWeekdays, prototype__proto.weekdaysMin = localeWeekdaysMin, prototype__proto._weekdaysMin = defaultLocaleWeekdaysMin, prototype__proto.weekdaysShort = localeWeekdaysShort, prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort, prototype__proto.weekdaysParse = localeWeekdaysParse, prototype__proto.isPM = localeIsPM, prototype__proto._meridiemParse = defaultLocaleMeridiemParse, prototype__proto.meridiem = localeMeridiem, locale_locales__getSetGlobalLocale("en", {
            ordinalParse: /\d{1,2}(th|st|nd|rd)/,
            ordinal: function(number) {
                var b = number % 10,
                    output = 1 === toInt(number % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
                return number + output
            }
        }), utils_hooks__hooks.lang = deprecate("moment.lang is deprecated. Use moment.locale instead.", locale_locales__getSetGlobalLocale), utils_hooks__hooks.langData = deprecate("moment.langData is deprecated. Use moment.localeData instead.", locale_locales__getLocale);
        var mathAbs = Math.abs,
            asMilliseconds = makeAs("ms"),
            asSeconds = makeAs("s"),
            asMinutes = makeAs("m"),
            asHours = makeAs("h"),
            asDays = makeAs("d"),
            asWeeks = makeAs("w"),
            asMonths = makeAs("M"),
            asYears = makeAs("y"),
            milliseconds = makeGetter("milliseconds"),
            seconds = makeGetter("seconds"),
            minutes = makeGetter("minutes"),
            hours = makeGetter("hours"),
            days = makeGetter("days"),
            months = makeGetter("months"),
            years = makeGetter("years"),
            round = Math.round,
            thresholds = {
                s: 45,
                m: 45,
                h: 22,
                d: 26,
                M: 11
            },
            iso_string__abs = Math.abs,
            duration_prototype__proto = Duration.prototype;
        duration_prototype__proto.abs = duration_abs__abs, duration_prototype__proto.add = duration_add_subtract__add, duration_prototype__proto.subtract = duration_add_subtract__subtract, duration_prototype__proto.as = as, duration_prototype__proto.asMilliseconds = asMilliseconds, duration_prototype__proto.asSeconds = asSeconds, duration_prototype__proto.asMinutes = asMinutes, duration_prototype__proto.asHours = asHours, duration_prototype__proto.asDays = asDays, duration_prototype__proto.asWeeks = asWeeks, duration_prototype__proto.asMonths = asMonths, duration_prototype__proto.asYears = asYears, duration_prototype__proto.valueOf = duration_as__valueOf, duration_prototype__proto._bubble = bubble, duration_prototype__proto.get = duration_get__get, duration_prototype__proto.milliseconds = milliseconds, duration_prototype__proto.seconds = seconds, duration_prototype__proto.minutes = minutes, duration_prototype__proto.hours = hours, duration_prototype__proto.days = days, duration_prototype__proto.weeks = weeks, duration_prototype__proto.months = months, duration_prototype__proto.years = years, duration_prototype__proto.humanize = humanize, duration_prototype__proto.toISOString = iso_string__toISOString, duration_prototype__proto.toString = iso_string__toISOString, duration_prototype__proto.toJSON = iso_string__toISOString, duration_prototype__proto.locale = locale, duration_prototype__proto.localeData = localeData, duration_prototype__proto.toIsoString = deprecate("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", iso_string__toISOString), duration_prototype__proto.lang = lang, addFormatToken("X", 0, 0, "unix"), addFormatToken("x", 0, 0, "valueOf"), addRegexToken("x", matchSigned), addRegexToken("X", matchTimestamp), addParseToken("X", function(input, array, config) {
            config._d = new Date(1e3 * parseFloat(input, 10))
        }), addParseToken("x", function(input, array, config) {
            config._d = new Date(toInt(input))
        }), utils_hooks__hooks.version = "2.10.6", setHookCallback(local__createLocal), utils_hooks__hooks.fn = momentPrototype, utils_hooks__hooks.min = min, utils_hooks__hooks.max = max, utils_hooks__hooks.utc = create_utc__createUTC, utils_hooks__hooks.unix = moment__createUnix, utils_hooks__hooks.months = lists__listMonths, utils_hooks__hooks.isDate = isDate, utils_hooks__hooks.locale = locale_locales__getSetGlobalLocale, utils_hooks__hooks.invalid = valid__createInvalid, utils_hooks__hooks.duration = create__createDuration, utils_hooks__hooks.isMoment = isMoment, utils_hooks__hooks.weekdays = lists__listWeekdays, utils_hooks__hooks.parseZone = moment__createInZone, utils_hooks__hooks.localeData = locale_locales__getLocale, utils_hooks__hooks.isDuration = isDuration, utils_hooks__hooks.monthsShort = lists__listMonthsShort, utils_hooks__hooks.weekdaysMin = lists__listWeekdaysMin, utils_hooks__hooks.defineLocale = defineLocale, utils_hooks__hooks.weekdaysShort = lists__listWeekdaysShort, utils_hooks__hooks.normalizeUnits = normalizeUnits, utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;
        var _moment = utils_hooks__hooks;
        return _moment
    }),
    function(root, factory) {
        "use strict";
        "function" == typeof define && define.amd ? define(["moment"], factory) : "object" == typeof module && module.exports ? module.exports = factory(require("moment")) : factory(root.moment)
    }(this, function(moment) {
        "use strict";

        function charCodeToInt(charCode) {
            return charCode > 96 ? charCode - 87 : charCode > 64 ? charCode - 29 : charCode - 48
        }

        function unpackBase60(string) {
            var num, i = 0,
                parts = string.split("."),
                whole = parts[0],
                fractional = parts[1] || "",
                multiplier = 1,
                out = 0,
                sign = 1;
            for (45 === string.charCodeAt(0) && (i = 1, sign = -1), i; i < whole.length; i++) num = charCodeToInt(whole.charCodeAt(i)), out = 60 * out + num;
            for (i = 0; i < fractional.length; i++) multiplier /= 60, num = charCodeToInt(fractional.charCodeAt(i)), out += num * multiplier;
            return out * sign
        }

        function arrayToInt(array) {
            for (var i = 0; i < array.length; i++) array[i] = unpackBase60(array[i])
        }

        function intToUntil(array, length) {
            for (var i = 0; length > i; i++) array[i] = Math.round((array[i - 1] || 0) + 6e4 * array[i]);
            array[length - 1] = 1 / 0
        }

        function mapIndices(source, indices) {
            var i, out = [];
            for (i = 0; i < indices.length; i++) out[i] = source[indices[i]];
            return out
        }

        function unpack(string) {
            var data = string.split("|"),
                offsets = data[2].split(" "),
                indices = data[3].split(""),
                untils = data[4].split(" ");
            return arrayToInt(offsets), arrayToInt(indices), arrayToInt(untils), intToUntil(untils, indices.length), {
                name: data[0],
                abbrs: mapIndices(data[1].split(" "), indices),
                offsets: mapIndices(offsets, indices),
                untils: untils,
                population: 0 | data[5]
            }
        }

        function Zone(packedString) {
            packedString && this._set(unpack(packedString))
        }

        function OffsetAt(at) {
            var timeString = at.toTimeString(),
                abbr = timeString.match(/\(.+\)/);
            abbr = abbr && abbr[0] ? abbr[0].match(/[A-Z]/g).join("") : timeString.match(/[A-Z]{3,5}/g)[0], "GMT" === abbr && (abbr = void 0), this.at = +at, this.abbr = abbr, this.offset = at.getTimezoneOffset()
        }

        function ZoneScore(zone) {
            this.zone = zone, this.offsetScore = 0, this.abbrScore = 0
        }

        function findChange(low, high) {
            for (var mid, diff; diff = 6e4 * ((high.at - low.at) / 12e4 | 0);) mid = new OffsetAt(new Date(low.at + diff)), mid.offset === low.offset ? low = mid : high = mid;
            return low
        }

        function userOffsets() {
            var change, next, i, startYear = (new Date).getFullYear() - 2,
                last = new OffsetAt(new Date(startYear, 0, 1)),
                offsets = [last];
            for (i = 1; 48 > i; i++) next = new OffsetAt(new Date(startYear, i, 1)), next.offset !== last.offset && (change = findChange(last, next), offsets.push(change), offsets.push(new OffsetAt(new Date(change.at + 6e4)))), last = next;
            for (i = 0; 4 > i; i++) offsets.push(new OffsetAt(new Date(startYear + i, 0, 1))), offsets.push(new OffsetAt(new Date(startYear + i, 6, 1)));
            return offsets
        }

        function sortZoneScores(a, b) {
            return a.offsetScore !== b.offsetScore ? a.offsetScore - b.offsetScore : a.abbrScore !== b.abbrScore ? a.abbrScore - b.abbrScore : b.zone.population - a.zone.population
        }

        function addToGuesses(name, offsets) {
            var i, offset;
            for (arrayToInt(offsets), i = 0; i < offsets.length; i++) offset = offsets[i], guesses[offset] = guesses[offset] || {}, guesses[offset][name] = !0
        }

        function guessesForUserOffsets(offsets) {
            var i, j, guessesOffset, offsetsLength = offsets.length,
                filteredGuesses = {},
                out = [];
            for (i = 0; offsetsLength > i; i++) {
                guessesOffset = guesses[offsets[i].offset] || {};
                for (j in guessesOffset) guessesOffset.hasOwnProperty(j) && (filteredGuesses[j] = !0)
            }
            for (i in filteredGuesses) filteredGuesses.hasOwnProperty(i) && out.push(names[i]);
            return out
        }

        function rebuildGuess() {
            var zoneScore, i, j, offsets = userOffsets(),
                offsetsLength = offsets.length,
                guesses = guessesForUserOffsets(offsets),
                zoneScores = [];
            for (i = 0; i < guesses.length; i++) {
                for (zoneScore = new ZoneScore(getZone(guesses[i]), offsetsLength), j = 0; offsetsLength > j; j++) zoneScore.scoreOffsetAt(offsets[j]);
                zoneScores.push(zoneScore)
            }
            return zoneScores.sort(sortZoneScores), zoneScores.length > 0 ? zoneScores[0].zone.name : void 0
        }

        function guess(ignoreCache) {
            return (!cachedGuess || ignoreCache) && (cachedGuess = rebuildGuess()), cachedGuess
        }

        function normalizeName(name) {
            return (name || "").toLowerCase().replace(/\//g, "_")
        }

        function addZone(packed) {
            var i, name, split, normalized;
            for ("string" == typeof packed && (packed = [packed]), i = 0; i < packed.length; i++) split = packed[i].split("|"), name = split[0], normalized = normalizeName(name), zones[normalized] = packed[i], names[normalized] = name, split[5] && addToGuesses(normalized, split[2].split(" "))
        }

        function getZone(name, caller) {
            name = normalizeName(name);
            var link, zone = zones[name];
            return zone instanceof Zone ? zone : "string" == typeof zone ? (zone = new Zone(zone), zones[name] = zone, zone) : links[name] && caller !== getZone && (link = getZone(links[name], getZone)) ? (zone = zones[name] = new Zone, zone._set(link), zone.name = names[name], zone) : null
        }

        function getNames() {
            var i, out = [];
            for (i in names) names.hasOwnProperty(i) && (zones[i] || zones[links[i]]) && names[i] && out.push(names[i]);
            return out.sort()
        }

        function addLink(aliases) {
            var i, alias, normal0, normal1;
            for ("string" == typeof aliases && (aliases = [aliases]), i = 0; i < aliases.length; i++) alias = aliases[i].split("|"), normal0 = normalizeName(alias[0]), normal1 = normalizeName(alias[1]), links[normal0] = normal1, names[normal0] = alias[0], links[normal1] = normal0, names[normal1] = alias[1]
        }

        function loadData(data) {
            addZone(data.zones), addLink(data.links), tz.dataVersion = data.version
        }

        function zoneExists(name) {
            return zoneExists.didShowError || (zoneExists.didShowError = !0, logError("moment.tz.zoneExists('" + name + "') has been deprecated in favor of !moment.tz.zone('" + name + "')")), !!getZone(name)
        }

        function needsOffset(m) {
            return !(!m._a || void 0 !== m._tzm)
        }

        function logError(message) {
            "undefined" != typeof console && "function" == typeof console.error && console.error(message)
        }

        function tz(input) {
            var args = Array.prototype.slice.call(arguments, 0, -1),
                name = arguments[arguments.length - 1],
                zone = getZone(name),
                out = moment.utc.apply(null, args);
            return zone && !moment.isMoment(input) && needsOffset(out) && out.add(zone.parse(out), "minutes"), out.tz(name), out
        }

        function abbrWrap(old) {
            return function() {
                return this._z ? this._z.abbr(this) : old.call(this)
            }
        }

        function resetZoneWrap(old) {
            return function() {
                return this._z = null, old.apply(this, arguments)
            }
        }
        if (void 0 !== moment.tz) return logError("Moment Timezone " + moment.tz.version + " was already loaded " + (moment.tz.dataVersion ? "with data from " : "without any data") + moment.tz.dataVersion), moment;
        var cachedGuess, VERSION = "0.5.0",
            zones = {},
            links = {},
            names = {},
            guesses = {},
            momentVersion = moment.version.split("."),
            major = +momentVersion[0],
            minor = +momentVersion[1];
        (2 > major || 2 === major && 6 > minor) && logError("Moment Timezone requires Moment.js >= 2.6.0. You are using Moment.js " + moment.version + ". See momentjs.com"), Zone.prototype = {
            _set: function(unpacked) {
                this.name = unpacked.name, this.abbrs = unpacked.abbrs, this.untils = unpacked.untils, this.offsets = unpacked.offsets, this.population = unpacked.population
            },
            _index: function(timestamp) {
                var i, target = +timestamp,
                    untils = this.untils;
                for (i = 0; i < untils.length; i++)
                    if (target < untils[i]) return i
            },
            parse: function(timestamp) {
                var offset, offsetNext, offsetPrev, i, target = +timestamp,
                    offsets = this.offsets,
                    untils = this.untils,
                    max = untils.length - 1;
                for (i = 0; max > i; i++)
                    if (offset = offsets[i], offsetNext = offsets[i + 1], offsetPrev = offsets[i ? i - 1 : i], offsetNext > offset && tz.moveAmbiguousForward ? offset = offsetNext : offset > offsetPrev && tz.moveInvalidForward && (offset = offsetPrev), target < untils[i] - 6e4 * offset) return offsets[i];
                return offsets[max]
            },
            abbr: function(mom) {
                return this.abbrs[this._index(mom)]
            },
            offset: function(mom) {
                return this.offsets[this._index(mom)]
            }
        }, ZoneScore.prototype.scoreOffsetAt = function(offsetAt) {
            this.offsetScore += Math.abs(this.zone.offset(offsetAt.at) - offsetAt.offset), this.zone.abbr(offsetAt.at).match(/[A-Z]/g).join("") !== offsetAt.abbr && this.abbrScore++
        }, tz.version = VERSION, tz.dataVersion = "", tz._zones = zones, tz._links = links, tz._names = names, tz.add = addZone, tz.link = addLink, tz.load = loadData, tz.zone = getZone, tz.zoneExists = zoneExists, tz.guess = guess, tz.names = getNames, tz.Zone = Zone, tz.unpack = unpack, tz.unpackBase60 = unpackBase60, tz.needsOffset = needsOffset, tz.moveInvalidForward = !0, tz.moveAmbiguousForward = !1;
        var fn = moment.fn;
        moment.tz = tz, moment.defaultZone = null, moment.updateOffset = function(mom, keepTime) {
            var offset, zone = moment.defaultZone;
            void 0 === mom._z && (zone && needsOffset(mom) && !mom._isUTC && (mom._d = moment.utc(mom._a)._d, mom.utc().add(zone.parse(mom), "minutes")), mom._z = zone), mom._z && (offset = mom._z.offset(mom), Math.abs(offset) < 16 && (offset /= 60), void 0 !== mom.utcOffset ? mom.utcOffset(-offset, keepTime) : mom.zone(offset, keepTime))
        }, fn.tz = function(name) {
            return name ? (this._z = getZone(name), this._z ? moment.updateOffset(this) : logError("Moment Timezone has no data for " + name + ". See http://momentjs.com/timezone/docs/#/data-loading/."), this) : this._z ? this._z.name : void 0
        }, fn.zoneName = abbrWrap(fn.zoneName), fn.zoneAbbr = abbrWrap(fn.zoneAbbr), fn.utc = resetZoneWrap(fn.utc), moment.tz.setDefault = function(name) {
            return (2 > major || 2 === major && 9 > minor) && logError("Moment Timezone setDefault() requires Moment.js >= 2.9.0. You are using Moment.js " + moment.version + "."), moment.defaultZone = name ? getZone(name) : null, moment
        };
        var momentProperties = moment.momentProperties;
        return "[object Array]" === Object.prototype.toString.call(momentProperties) ? (momentProperties.push("_z"), momentProperties.push("_a")) : momentProperties && (momentProperties._z = null), loadData({
            version: "2015g",
            zones: ["Africa/Abidjan|LMT GMT|g.8 0|01|-2ldXH.Q|48e5", "Africa/Accra|LMT GMT GHST|.Q 0 -k|012121212121212121212121212121212121212121212121|-26BbX.8 6tzX.8 MnE 1BAk MnE 1BAk MnE 1BAk MnE 1C0k MnE 1BAk MnE 1BAk MnE 1BAk MnE 1C0k MnE 1BAk MnE 1BAk MnE 1BAk MnE 1C0k MnE 1BAk MnE 1BAk MnE 1BAk MnE 1C0k MnE 1BAk MnE 1BAk MnE 1BAk MnE 1C0k MnE 1BAk MnE 1BAk MnE|41e5", "Africa/Nairobi|LMT EAT BEAT BEAUT|-2r.g -30 -2u -2J|01231|-1F3Cr.g 3Dzr.g okMu MFXJ|47e5", "Africa/Algiers|PMT WET WEST CET CEST|-9.l 0 -10 -10 -20|0121212121212121343431312123431213|-2nco9.l cNb9.l HA0 19A0 1iM0 11c0 1oo0 Wo0 1rc0 QM0 1EM0 UM0 DA0 Imo0 rd0 De0 9Xz0 1fb0 1ap0 16K0 2yo0 mEp0 hwL0 jxA0 11A0 dDd0 17b0 11B0 1cN0 2Dy0 1cN0 1fB0 1cL0|26e5", "Africa/Lagos|LMT WAT|-d.A -10|01|-22y0d.A|17e6", "Africa/Bissau|LMT WAT GMT|12.k 10 0|012|-2ldWV.E 2xonV.E|39e4", "Africa/Maputo|LMT CAT|-2a.k -20|01|-2GJea.k|26e5", "Africa/Cairo|EET EEST|-20 -30|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-1bIO0 vb0 1ip0 11z0 1iN0 1nz0 12p0 1pz0 10N0 1pz0 16p0 1jz0 s3d0 Vz0 1oN0 11b0 1oO0 10N0 1pz0 10N0 1pb0 10N0 1pb0 10N0 1pb0 10N0 1pz0 10N0 1pb0 10N0 1pb0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1WL0 rd0 1Rz0 wp0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1qL0 Xd0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1ny0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 WL0 1qN0 Rb0 1wp0 On0 1zd0 Lz0 1EN0 Fb0 c10 8n0 8Nd0 gL0 e10 mn0|15e6", "Africa/Casablanca|LMT WET WEST CET|u.k 0 -10 -10|0121212121212121213121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2gMnt.E 130Lt.E rb0 Dd0 dVb0 b6p0 TX0 EoB0 LL0 gnd0 rz0 43d0 AL0 1Nd0 XX0 1Cp0 pz0 dEp0 4mn0 SyN0 AL0 1Nd0 wn0 1FB0 Db0 1zd0 Lz0 1Nf0 wM0 co0 go0 1o00 s00 dA0 vc0 11A0 A00 e00 y00 11A0 uM0 e00 Dc0 11A0 s00 e00 IM0 WM0 mo0 gM0 LA0 WM0 jA0 e00 Rc0 11A0 e00 e00 U00 11A0 8o0 e00 11A0 11A0 5A0 e00 17c0 1fA0 1a00 1a00 1fA0 17c0 1io0 14o0 1lc0 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1lc0 14o0 1fA0|32e5", "Africa/Ceuta|WET WEST CET CEST|0 -10 -10 -20|010101010101010101010232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-25KN0 11z0 drd0 18o0 3I00 17c0 1fA0 1a00 1io0 1a00 1y7p0 LL0 gnd0 rz0 43d0 AL0 1Nd0 XX0 1Cp0 pz0 dEp0 4VB0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|85e3", "Africa/El_Aaiun|LMT WAT WET WEST|Q.M 10 0 -10|01232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-1rDz7.c 1GVA7.c 6L0 AL0 1Nd0 XX0 1Cp0 pz0 1cBB0 AL0 1Nd0 wn0 1FB0 Db0 1zd0 Lz0 1Nf0 wM0 co0 go0 1o00 s00 dA0 vc0 11A0 A00 e00 y00 11A0 uM0 e00 Dc0 11A0 s00 e00 IM0 WM0 mo0 gM0 LA0 WM0 jA0 e00 Rc0 11A0 e00 e00 U00 11A0 8o0 e00 11A0 11A0 5A0 e00 17c0 1fA0 1a00 1a00 1fA0 17c0 1io0 14o0 1lc0 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1lc0 14o0 1fA0|20e4", "Africa/Johannesburg|SAST SAST SAST|-1u -20 -30|012121|-2GJdu 1Ajdu 1cL0 1cN0 1cL0|84e5", "Africa/Khartoum|LMT CAT CAST EAT|-2a.8 -20 -30 -30|01212121212121212121212121212121213|-1yW2a.8 1zK0a.8 16L0 1iN0 17b0 1jd0 17b0 1ip0 17z0 1i10 17X0 1hB0 18n0 1hd0 19b0 1gp0 19z0 1iN0 17b0 1ip0 17z0 1i10 18n0 1hd0 18L0 1gN0 19b0 1gp0 19z0 1iN0 17z0 1i10 17X0 yGd0|51e5", "Africa/Monrovia|MMT LRT GMT|H.8 I.u 0|012|-23Lzg.Q 29s01.m|11e5", "Africa/Ndjamena|LMT WAT WAST|-10.c -10 -20|0121|-2le10.c 2J3c0.c Wn0|13e5", "Africa/Tripoli|LMT CET CEST EET|-Q.I -10 -20 -20|012121213121212121212121213123123|-21JcQ.I 1hnBQ.I vx0 4iP0 xx0 4eN0 Bb0 7ip0 U0n0 A10 1db0 1cN0 1db0 1dd0 1db0 1eN0 1bb0 1e10 1cL0 1c10 1db0 1dd0 1db0 1cN0 1db0 1q10 fAn0 1ep0 1db0 AKq0 TA0 1o00|11e5", "Africa/Tunis|PMT CET CEST|-9.l -10 -20|0121212121212121212121212121212121|-2nco9.l 18pa9.l 1qM0 DA0 3Tc0 11B0 1ze0 WM0 7z0 3d0 14L0 1cN0 1f90 1ar0 16J0 1gXB0 WM0 1rA0 11c0 nwo0 Ko0 1cM0 1cM0 1rA0 10M0 zuM0 10N0 1aN0 1qM0 WM0 1qM0 11A0 1o00|20e5", "Africa/Windhoek|SWAT SAST SAST CAT WAT WAST|-1u -20 -30 -20 -10 -20|012134545454545454545454545454545454545454545454545454545454545454545454545454545454545454545|-2GJdu 1Ajdu 1cL0 1SqL0 9NA0 11D0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 11B0 1nX0 11B0|32e4", "America/Adak|NST NWT NPT BST BDT AHST HST HDT|b0 a0 a0 b0 a0 a0 a0 90|012034343434343434343434343434343456767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-17SX0 8wW0 iB0 Qlb0 52O0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cm0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|326", "America/Anchorage|CAT CAWT CAPT AHST AHDT YST AKST AKDT|a0 90 90 a0 90 90 90 80|012034343434343434343434343434343456767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-17T00 8wX0 iA0 Qlb0 52O0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cm0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|30e4", "America/Port_of_Spain|LMT AST|46.4 40|01|-2kNvR.U|43e3", "America/Araguaina|LMT BRT BRST|3c.M 30 20|0121212121212121212121212121212121212121212121212121|-2glwL.c HdKL.c 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 dMN0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 ny10 Lz0|14e4", "America/Argentina/Buenos_Aires|CMT ART ARST ART ARST|4g.M 40 30 30 20|0121212121212121212121212121212121212121213434343434343234343|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wp0 Rb0 1wp0 TX0 g0p0 10M0 j3c0 uL0 1qN0 WL0", "America/Argentina/Catamarca|CMT ART ARST ART ARST WART|4g.M 40 30 30 20 40|0121212121212121212121212121212121212121213434343454343235343|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 g0p0 10M0 ako0 7B0 8zb0 uL0", "America/Argentina/Cordoba|CMT ART ARST ART ARST WART|4g.M 40 30 30 20 40|0121212121212121212121212121212121212121213434343454343234343|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 g0p0 10M0 j3c0 uL0 1qN0 WL0", "America/Argentina/Jujuy|CMT ART ARST ART ARST WART WARST|4g.M 40 30 30 20 40 30|01212121212121212121212121212121212121212134343456543432343|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1ze0 TX0 1ld0 WK0 1wp0 TX0 g0p0 10M0 j3c0 uL0", "America/Argentina/La_Rioja|CMT ART ARST ART ARST WART|4g.M 40 30 30 20 40|01212121212121212121212121212121212121212134343434534343235343|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Qn0 qO0 16n0 Rb0 1wp0 TX0 g0p0 10M0 ako0 7B0 8zb0 uL0", "America/Argentina/Mendoza|CMT ART ARST ART ARST WART WARST|4g.M 40 30 30 20 40 30|0121212121212121212121212121212121212121213434345656543235343|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1u20 SL0 1vd0 Tb0 1wp0 TW0 g0p0 10M0 agM0 Op0 7TX0 uL0", "America/Argentina/Rio_Gallegos|CMT ART ARST ART ARST WART|4g.M 40 30 30 20 40|0121212121212121212121212121212121212121213434343434343235343|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wp0 Rb0 1wp0 TX0 g0p0 10M0 ako0 7B0 8zb0 uL0", "America/Argentina/Salta|CMT ART ARST ART ARST WART|4g.M 40 30 30 20 40|01212121212121212121212121212121212121212134343434543432343|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 g0p0 10M0 j3c0 uL0", "America/Argentina/San_Juan|CMT ART ARST ART ARST WART|4g.M 40 30 30 20 40|01212121212121212121212121212121212121212134343434534343235343|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Qn0 qO0 16n0 Rb0 1wp0 TX0 g0p0 10M0 ak00 m10 8lb0 uL0", "America/Argentina/San_Luis|CMT ART ARST ART ARST WART WARST|4g.M 40 30 30 20 40 30|01212121212121212121212121212121212121212134343456536353465653|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 XX0 1q20 SL0 AN0 kin0 10M0 ak00 m10 8lb0 8L0 jd0 1qN0 WL0 1qN0", "America/Argentina/Tucuman|CMT ART ARST ART ARST WART|4g.M 40 30 30 20 40|012121212121212121212121212121212121212121343434345434323534343|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 g0p0 10M0 ako0 4N0 8BX0 uL0 1qN0 WL0", "America/Argentina/Ushuaia|CMT ART ARST ART ARST WART|4g.M 40 30 30 20 40|0121212121212121212121212121212121212121213434343434343235343|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wp0 Rb0 1wp0 TX0 g0p0 10M0 ajA0 8p0 8zb0 uL0", "America/Curacao|LMT ANT AST|4z.L 4u 40|012|-2kV7o.d 28KLS.d|15e4", "America/Asuncion|AMT PYT PYT PYST|3O.E 40 30 30|012131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313|-1x589.k 1DKM9.k 3CL0 3Dd0 10L0 1pB0 10n0 1pB0 10n0 1pB0 1cL0 1dd0 1db0 1dd0 1cL0 1dd0 1cL0 1dd0 1cL0 1dd0 1db0 1dd0 1cL0 1dd0 1cL0 1dd0 1cL0 1dd0 1db0 1dd0 1cL0 1lB0 14n0 1dd0 1cL0 1fd0 WL0 1rd0 1aL0 1dB0 Xz0 1qp0 Xb0 1qN0 10L0 1rB0 TX0 1tB0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 1cL0 WN0 1qL0 11B0 1nX0 1ip0 WL0 1qN0 WL0 1qN0 WL0 1tB0 TX0 1tB0 TX0 1tB0 19X0 1a10 1fz0 1a10 1fz0 1cN0 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0|28e5", "America/Atikokan|CST CDT CWT CPT EST|60 50 50 50 50|0101234|-25TQ0 1in0 Rnb0 3je0 8x30 iw0|28e2", "America/Bahia|LMT BRT BRST|2y.4 30 20|01212121212121212121212121212121212121212121212121212121212121|-2glxp.U HdLp.U 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 l5B0 Rb0|27e5", "America/Bahia_Banderas|LMT MST CST PST MDT CDT|71 70 60 80 60 50|0121212131414141414141414141414141414152525252525252525252525252525252525252525252525252525252|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 otX0 gmN0 P2N0 13Vd0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nW0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|84e3", "America/Barbados|LMT BMT AST ADT|3W.t 3W.t 40 30|01232323232|-1Q0I1.v jsM0 1ODC1.v IL0 1ip0 17b0 1ip0 17b0 1ld0 13b0|28e4", "America/Belem|LMT BRT BRST|3d.U 30 20|012121212121212121212121212121|-2glwK.4 HdKK.4 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0|20e5", "America/Belize|LMT CST CHDT CDT|5Q.M 60 5u 50|01212121212121212121212121212121212121212121212121213131|-2kBu7.c fPA7.c Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1f0Mu qn0 lxB0 mn0|57e3", "America/Blanc-Sablon|AST ADT AWT APT|40 30 30 30|010230|-25TS0 1in0 UGp0 8x50 iu0|11e2", "America/Boa_Vista|LMT AMT AMST|42.E 40 30|0121212121212121212121212121212121|-2glvV.k HdKV.k 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 smp0 WL0 1tB0 2L0|62e2", "America/Bogota|BMT COT COST|4U.g 50 40|0121|-2eb73.I 38yo3.I 2en0|90e5", "America/Boise|PST PDT MST MWT MPT MDT|80 70 70 60 60 60|0101023425252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252|-261q0 1nX0 11B0 1nX0 8C10 JCL0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 Dd0 1Kn0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|21e4", "America/Cambridge_Bay|zzz MST MWT MPT MDDT MDT CST CDT EST|0 70 60 60 50 60 60 50 50|0123141515151515151515151515151515151515151515678651515151515151515151515151515151515151515151515151515151515151515151515151|-21Jc0 RO90 8x20 ix0 LCL0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11A0 1nX0 2K0 WQ0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|15e2", "America/Campo_Grande|LMT AMT AMST|3C.s 40 30|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212|-2glwl.w HdLl.w 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 1C10 Lz0 1Ip0 HX0 1zd0 On0 1HB0 IL0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1C10 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1C10 Lz0 1C10 Lz0 1C10 Lz0 1C10 On0 1zd0 Rb0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0|77e4", "America/Cancun|LMT CST EST EDT CDT|5L.4 60 50 40 50|0123232341414141414141414141414141414141412|-1UQG0 2q2o0 yLB0 1lb0 14p0 1lb0 14p0 Lz0 xB0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 Dd0|63e4", "America/Caracas|CMT VET VET|4r.E 4u 40|0121|-2kV7w.k 28KM2.k 1IwOu|29e5", "America/Cayenne|LMT GFT GFT|3t.k 40 30|012|-2mrwu.E 2gWou.E|58e3", "America/Cayman|KMT EST EDT|57.b 50 40|0121212121212121212121212121212121212121212121|-2l1uQ.N 4duNQ.N 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|58e3", "America/Chicago|CST CDT EST CWT CPT|60 50 50 50 50|01010101010101010101010101010101010102010101010103401010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 1wp0 TX0 WN0 1qL0 1cN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 11B0 1Hz0 14p0 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 RB0 8x30 iw0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|92e5", "America/Chihuahua|LMT MST CST CDT MDT|74.k 70 60 50 60|0121212323241414141414141414141414141414141414141414141414141414141414141414141414141414141|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 2zQN0 1lb0 14p0 1lb0 14q0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|81e4", "America/Costa_Rica|SJMT CST CDT|5A.d 60 50|0121212121|-1Xd6n.L 2lu0n.L Db0 1Kp0 Db0 pRB0 15b0 1kp0 mL0|12e5", "America/Creston|MST PST|70 80|010|-29DR0 43B0|53e2", "America/Cuiaba|LMT AMT AMST|3I.k 40 30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212|-2glwf.E HdLf.E 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 4a10 HX0 1zd0 On0 1HB0 IL0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1C10 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1C10 Lz0 1C10 Lz0 1C10 Lz0 1C10 On0 1zd0 Rb0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0|54e4", "America/Danmarkshavn|LMT WGT WGST GMT|1e.E 30 20 0|01212121212121212121212121212121213|-2a5WJ.k 2z5fJ.k 19U0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 DC0|8", "America/Dawson|YST YDT YWT YPT YDDT PST PDT|90 80 80 80 70 80 70|0101023040565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565|-25TN0 1in0 1o10 13V0 Ser0 8x00 iz0 LCL0 1fA0 jrA0 fNd0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|13e2", "America/Dawson_Creek|PST PDT PWT PPT MST|80 70 70 70 70|0102301010101010101010101010101010101010101010101010101014|-25TO0 1in0 UGp0 8x10 iy0 3NB0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 ML0|12e3", "America/Denver|MST MDT MWT MPT|70 60 60 60|01010101023010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261r0 1nX0 11B0 1nX0 11B0 1qL0 WN0 mn0 Ord0 8x20 ix0 LCN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|26e5", "America/Detroit|LMT CST EST EWT EPT EDT|5w.b 60 50 40 40 40|01234252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252|-2Cgir.N peqr.N 156L0 8x40 iv0 6fd0 11z0 Jy10 SL0 dnB0 1cL0 s10 1Vz0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|37e5", "America/Edmonton|LMT MST MDT MWT MPT|7x.Q 70 60 60 60|01212121212121341212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2yd4q.8 shdq.8 1in0 17d0 hz0 2dB0 1fz0 1a10 11z0 1qN0 WL0 1qN0 11z0 IGN0 8x20 ix0 3NB0 11z0 LFB0 1cL0 3Cp0 1cL0 66N0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|10e5", "America/Eirunepe|LMT ACT ACST AMT|4D.s 50 40 40|0121212121212121212121212121212131|-2glvk.w HdLk.w 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 dPB0 On0 yTd0 d5X0|31e3", "America/El_Salvador|LMT CST CDT|5U.M 60 50|012121|-1XiG3.c 2Fvc3.c WL0 1qN0 WL0|11e5", "America/Tijuana|LMT MST PST PDT PWT PPT|7M.4 70 80 70 70 70|012123245232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-1UQE0 4PX0 8mM0 8lc0 SN0 1cL0 pHB0 83r0 zI0 5O10 1Rz0 cOP0 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 BUp0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 U10 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|20e5", "America/Fort_Nelson|PST PDT PWT PPT MST|80 70 70 70 70|01023010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010104|-25TO0 1in0 UGp0 8x10 iy0 3NB0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0|39e2", "America/Fort_Wayne|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|010101023010101010101010101040454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 QI10 Db0 RB0 8x30 iw0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 5Tz0 1o10 qLb0 1cL0 1cN0 1cL0 1qhd0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Fortaleza|LMT BRT BRST|2y 30 20|0121212121212121212121212121212121212121|-2glxq HdLq 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 nsp0 WL0 1tB0 5z0 2mN0 On0|34e5", "America/Glace_Bay|LMT AST ADT AWT APT|3X.M 40 30 30 30|012134121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2IsI0.c CwO0.c 1in0 UGp0 8x50 iu0 iq10 11z0 Jg10 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|19e3", "America/Godthab|LMT WGT WGST|3q.U 30 20|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2a5Ux.4 2z5dx.4 19U0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|17e3", "America/Goose_Bay|NST NDT NST NDT NWT NPT AST ADT ADDT|3u.Q 2u.Q 3u 2u 2u 2u 40 30 20|010232323232323245232323232323232323232323232323232323232326767676767676767676767676767676767676767676768676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-25TSt.8 1in0 DXb0 2HbX.8 WL0 1qN0 WL0 1qN0 WL0 1tB0 TX0 1tB0 WL0 1qN0 WL0 1qN0 7UHu itu 1tB0 WL0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1tB0 WL0 1ld0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 S10 g0u 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14n1 1lb0 14p0 1nW0 11C0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zcX Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|76e2", "America/Grand_Turk|KMT EST EDT AST|57.b 50 40 40|0121212121212121212121212121212121212121212121212121212121212121212121212123|-2l1uQ.N 2HHBQ.N 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|37e2", "America/Guatemala|LMT CST CDT|62.4 60 50|0121212121|-24KhV.U 2efXV.U An0 mtd0 Nz0 ifB0 17b0 zDB0 11z0|13e5", "America/Guayaquil|QMT ECT|5e 50|01|-1yVSK|27e5", "America/Guyana|LMT GBGT GYT GYT GYT|3Q.E 3J 3J 30 40|01234|-2dvU7.k 24JzQ.k mlc0 Bxbf|80e4", "America/Halifax|LMT AST ADT AWT APT|4e.o 40 30 30 30|0121212121212121212121212121212121212121212121212134121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2IsHJ.A xzzJ.A 1db0 3I30 1in0 3HX0 IL0 1E10 ML0 1yN0 Pb0 1Bd0 Mn0 1Bd0 Rz0 1w10 Xb0 1w10 LX0 1w10 Xb0 1w10 Lz0 1C10 Jz0 1E10 OL0 1yN0 Un0 1qp0 Xb0 1qp0 11X0 1w10 Lz0 1HB0 LX0 1C10 FX0 1w10 Xb0 1qp0 Xb0 1BB0 LX0 1td0 Xb0 1qp0 Xb0 Rf0 8x50 iu0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 3Qp0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 3Qp0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 6i10 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|39e4", "America/Havana|HMT CST CDT|5t.A 50 40|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1Meuu.o 72zu.o ML0 sld0 An0 1Nd0 Db0 1Nd0 An0 6Ep0 An0 1Nd0 An0 JDd0 Mn0 1Ap0 On0 1fd0 11X0 1qN0 WL0 1wp0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 14n0 1ld0 14L0 1kN0 15b0 1kp0 1cL0 1cN0 1fz0 1a10 1fz0 1fB0 11z0 14p0 1nX0 11B0 1nX0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 14n0 1ld0 14n0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 1a10 1in0 1a10 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 17c0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 11A0 6i00 Rc0 1wo0 U00 1tA0 Rc0 1wo0 U00 1wo0 U00 1zc0 U00 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0|21e5", "America/Hermosillo|LMT MST CST PST MDT|7n.Q 70 60 80 60|0121212131414141|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 otX0 gmN0 P2N0 13Vd0 1lb0 14p0 1lb0 14p0 1lb0|64e4", "America/Indiana/Knox|CST CDT CWT CPT EST|60 50 50 50 50|0101023010101010101010101010101010101040101010101010101010101010101010101010101010101010141010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 3NB0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 11z0 1o10 11z0 1o10 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 3Cn0 8wp0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 z8o0 1o00 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Indiana/Marengo|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|0101023010101010101010104545454545414545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 dyN0 11z0 6fd0 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 jrz0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1VA0 LA0 1BX0 1e6p0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Indiana/Petersburg|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|01010230101010101010101010104010101010101010101010141014545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 njX0 WN0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 3Fb0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 19co0 1o00 Rd0 1zb0 Oo0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Indiana/Tell_City|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|01010230101010101010101010101010454541010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 1o10 11z0 g0p0 11z0 1o10 11z0 1qL0 WN0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 caL0 1cL0 1cN0 1cL0 1qhd0 1o00 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Indiana/Vevay|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|010102304545454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 kPB0 Awn0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1lnd0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Indiana/Vincennes|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|01010230101010101010101010101010454541014545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 1o10 11z0 g0p0 11z0 1o10 11z0 1qL0 WN0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 caL0 1cL0 1cN0 1cL0 1qhd0 1o00 Rd0 1zb0 Oo0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Indiana/Winamac|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|01010230101010101010101010101010101010454541054545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 jrz0 1cL0 1cN0 1cL0 1qhd0 1o00 Rd0 1za0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Inuvik|zzz PST PDDT MST MDT|0 80 60 70 60|0121343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343|-FnA0 tWU0 1fA0 wPe0 2pz0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|35e2", "America/Iqaluit|zzz EWT EPT EST EDDT EDT CST CDT|0 40 40 50 30 40 60 50|01234353535353535353535353535353535353535353567353535353535353535353535353535353535353535353535353535353535353535353535353|-16K00 7nX0 iv0 LCL0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11C0 1nX0 11A0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|67e2", "America/Jamaica|KMT EST EDT|57.b 50 40|0121212121212121212121|-2l1uQ.N 2uM1Q.N 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0|94e4", "America/Juneau|PST PWT PPT PDT YDT YST AKST AKDT|80 70 70 70 80 90 90 80|01203030303030303030303030403030356767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-17T20 8x10 iy0 Vo10 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cM0 1cM0 1cL0 1cN0 1fz0 1a10 1fz0 co0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|33e3", "America/Kentucky/Louisville|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|0101010102301010101010101010101010101454545454545414545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 3Fd0 Nb0 LPd0 11z0 RB0 8x30 iw0 Bb0 10N0 2bB0 8in0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 xz0 gso0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1VA0 LA0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Kentucky/Monticello|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|0101023010101010101010101010101010101010101010101010101010101010101010101454545454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 SWp0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11A0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/La_Paz|CMT BOST BOT|4w.A 3w.A 40|012|-1x37r.o 13b0|19e5", "America/Lima|LMT PET PEST|58.A 50 40|0121212121212121|-2tyGP.o 1bDzP.o zX0 1aN0 1cL0 1cN0 1cL0 1PrB0 zX0 1O10 zX0 6Gp0 zX0 98p0 zX0|11e6", "America/Los_Angeles|PST PDT PWT PPT|80 70 70 70|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261q0 1nX0 11B0 1nX0 SgN0 8x10 iy0 5Wp0 1Vb0 3dB0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|15e6", "America/Maceio|LMT BRT BRST|2m.Q 30 20|012121212121212121212121212121212121212121|-2glxB.8 HdLB.8 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 dMN0 Lz0 8Q10 WL0 1tB0 5z0 2mN0 On0|93e4", "America/Managua|MMT CST EST CDT|5J.c 60 50 50|0121313121213131|-1quie.M 1yAMe.M 4mn0 9Up0 Dz0 1K10 Dz0 s3F0 1KH0 DB0 9In0 k8p0 19X0 1o30 11y0|22e5", "America/Manaus|LMT AMT AMST|40.4 40 30|01212121212121212121212121212121|-2glvX.U HdKX.U 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 dPB0 On0|19e5", "America/Martinique|FFMT AST ADT|44.k 40 30|0121|-2mPTT.E 2LPbT.E 19X0|39e4", "America/Matamoros|LMT CST CDT|6E 60 50|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1UQG0 2FjC0 1nX0 i6p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 U10 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|45e4", "America/Mazatlan|LMT MST CST PST MDT|75.E 70 60 80 60|0121212131414141414141414141414141414141414141414141414141414141414141414141414141414141414141|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 otX0 gmN0 P2N0 13Vd0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|44e4", "America/Menominee|CST CDT CWT CPT EST|60 50 50 50 50|01010230101041010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 1o10 11z0 LCN0 1fz0 6410 9Jb0 1cM0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|85e2", "America/Merida|LMT CST EST CDT|5W.s 60 50 50|0121313131313131313131313131313131313131313131313131313131313131313131313131313131313131|-1UQG0 2q2o0 2hz0 wu30 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|11e5", "America/Metlakatla|PST PWT PPT PDT|80 70 70 70|0120303030303030303030303030303030|-17T20 8x10 iy0 Vo10 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0|14e2", "America/Mexico_City|LMT MST CST CDT CWT|6A.A 70 60 50 50|012121232324232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 gEn0 TX0 3xd0 Jb0 6zB0 SL0 e5d0 17b0 1Pff0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|20e6", "America/Miquelon|LMT AST PMST PMDT|3I.E 40 30 20|012323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-2mKkf.k 2LTAf.k gQ10 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|61e2", "America/Moncton|EST AST ADT AWT APT|50 40 30 30 30|012121212121212121212134121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2IsH0 CwN0 1in0 zAo0 An0 1Nd0 An0 1Nd0 An0 1Nd0 An0 1Nd0 An0 1Nd0 An0 1K10 Lz0 1zB0 NX0 1u10 Wn0 S20 8x50 iu0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 3Cp0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14n1 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 ReX 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|64e3", "America/Monterrey|LMT CST CDT|6F.g 60 50|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1UQG0 2FjC0 1nX0 i6p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|41e5", "America/Montevideo|MMT UYT UYHST UYST UYT UYHST|3I.I 3u 30 20 30 2u|012121212121212121212121213434343434345454543453434343434343434343434343434343434343434|-20UIf.g 8jzJ.g 1cLu 1dcu 1cLu 1dcu 1cLu ircu 11zu 1o0u 11zu 1o0u 11zu 1qMu WLu 1qMu WLu 1qMu WLu 1qMu 11zu 1o0u 11zu NAu 11bu 2iMu zWu Dq10 19X0 pd0 jz0 cm10 19X0 1fB0 1on0 11d0 1oL0 1nB0 1fzu 1aou 1fzu 1aou 1fzu 3nAu Jb0 3MN0 1SLu 4jzu 2PB0 Lb0 3Dd0 1pb0 ixd0 An0 1MN0 An0 1wp0 On0 1wp0 Rb0 1zd0 On0 1wp0 Rb0 s8p0 1fB0 1ip0 11z0 1ld0 14n0 1o10 11z0 1o10 11z0 1o10 14n0 1ld0 14n0 1ld0 14n0 1o10 11z0 1o10 11z0 1o10 11z0|17e5", "America/Toronto|EST EDT EWT EPT|50 40 40 40|01010101010101010101010101010101010101010101012301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-25TR0 1in0 11Wu 1nzu 1fD0 WJ0 1wr0 Nb0 1Ap0 On0 1zd0 On0 1wp0 TX0 1tB0 TX0 1tB0 TX0 1tB0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 4kM0 8x40 iv0 1o10 11z0 1nX0 11z0 1o10 11z0 1o10 1qL0 11D0 1nX0 11B0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|65e5", "America/Nassau|LMT EST EDT|59.u 50 40|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2kNuO.u 26XdO.u 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|24e4", "America/New_York|EST EDT EWT EPT|50 40 40 40|01010101010101010101010101010101010101010101010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261t0 1nX0 11B0 1nX0 11B0 1qL0 1a10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 RB0 8x40 iv0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|21e6", "America/Nipigon|EST EDT EWT EPT|50 40 40 40|010123010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-25TR0 1in0 Rnb0 3je0 8x40 iv0 19yN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|16e2", "America/Nome|NST NWT NPT BST BDT YST AKST AKDT|b0 a0 a0 b0 a0 90 90 80|012034343434343434343434343434343456767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-17SX0 8wW0 iB0 Qlb0 52O0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cl0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|38e2", "America/Noronha|LMT FNT FNST|29.E 20 10|0121212121212121212121212121212121212121|-2glxO.k HdKO.k 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 nsp0 WL0 1tB0 2L0 2pB0 On0|30e2", "America/North_Dakota/Beulah|MST MDT MWT MPT CST CDT|70 60 60 60 60 50|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101014545454545454545454545454545454545454545454545454545454|-261r0 1nX0 11B0 1nX0 SgN0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Oo0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/North_Dakota/Center|MST MDT MWT MPT CST CDT|70 60 60 60 60 50|010102301010101010101010101010101010101010101010101010101014545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-261r0 1nX0 11B0 1nX0 SgN0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14o0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/North_Dakota/New_Salem|MST MDT MWT MPT CST CDT|70 60 60 60 60 50|010102301010101010101010101010101010101010101010101010101010101010101010101010101454545454545454545454545454545454545454545454545454545454545454545454|-261r0 1nX0 11B0 1nX0 SgN0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14o0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Ojinaga|LMT MST CST CDT MDT|6V.E 70 60 50 60|0121212323241414141414141414141414141414141414141414141414141414141414141414141414141414141|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 2zQN0 1lb0 14p0 1lb0 14q0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 U10 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e3", "America/Panama|CMT EST|5j.A 50|01|-2uduE.o|15e5", "America/Pangnirtung|zzz AST AWT APT ADDT ADT EDT EST CST CDT|0 40 30 30 20 30 40 50 60 50|012314151515151515151515151515151515167676767689767676767676767676767676767676767676767676767676767676767676767676767676767|-1XiM0 PnG0 8x50 iu0 LCL0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1o00 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11C0 1nX0 11A0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|14e2", "America/Paramaribo|LMT PMT PMT NEGT SRT SRT|3E.E 3E.Q 3E.A 3u 3u 30|012345|-2nDUj.k Wqo0.c qanX.I 1dmLN.o lzc0|24e4", "America/Phoenix|MST MDT MWT|70 60 60|01010202010|-261r0 1nX0 11B0 1nX0 SgN0 4Al1 Ap0 1db0 SWqX 1cL0|42e5", "America/Port-au-Prince|PPMT EST EDT|4N 50 40|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-28RHb 2FnMb 19X0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14q0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 i6n0 1nX0 11B0 1nX0 d430 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e5", "America/Rio_Branco|LMT ACT ACST AMT|4v.c 50 40 40|01212121212121212121212121212131|-2glvs.M HdLs.M 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 NBd0 d5X0|31e4", "America/Porto_Velho|LMT AMT AMST|4f.A 40 30|012121212121212121212121212121|-2glvI.o HdKI.o 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0|37e4", "America/Puerto_Rico|AST AWT APT|40 30 30|0120|-17lU0 7XT0 iu0|24e5", "America/Rainy_River|CST CDT CWT CPT|60 50 50 50|010123010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-25TQ0 1in0 Rnb0 3je0 8x30 iw0 19yN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|842", "America/Rankin_Inlet|zzz CST CDDT CDT EST|0 60 40 50 50|012131313131313131313131313131313131313131313431313131313131313131313131313131313131313131313131313131313131313131313131|-vDc0 keu0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|26e2", "America/Recife|LMT BRT BRST|2j.A 30 20|0121212121212121212121212121212121212121|-2glxE.o HdLE.o 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 nsp0 WL0 1tB0 2L0 2pB0 On0|33e5", "America/Regina|LMT MST MDT MWT MPT CST|6W.A 70 60 60 60 60|012121212121212121212121341212121212121212121212121215|-2AD51.o uHe1.o 1in0 s2L0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 66N0 1cL0 1cN0 19X0 1fB0 1cL0 1fB0 1cL0 1cN0 1cL0 M30 8x20 ix0 1ip0 1cL0 1ip0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 3NB0 1cL0 1cN0|19e4", "America/Resolute|zzz CST CDDT CDT EST|0 60 40 50 50|012131313131313131313131313131313131313131313431313131313431313131313131313131313131313131313131313131313131313131313131|-SnA0 GWS0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|229", "America/Santa_Isabel|LMT MST PST PDT PWT PPT|7D.s 70 80 70 70 70|012123245232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-1UQE0 4PX0 8mM0 8lc0 SN0 1cL0 pHB0 83r0 zI0 5O10 1Rz0 cOP0 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 BUp0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|23e3", "America/Santarem|LMT AMT AMST BRT|3C.M 40 30 30|0121212121212121212121212121213|-2glwl.c HdLl.c 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 NBd0|21e4", "America/Santiago|SMT CLT CLT CLST CLST CLT|4G.K 50 40 40 30 30|01020313131313121242124242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424245|-2q2jh.e fJAh.e 5knG.K 1Vzh.e jRAG.K 1pbh.e 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 nHX0 op0 9Bz0 jb0 1oN0 ko0 Qeo0 WL0 1zd0 On0 1ip0 11z0 1o10 11z0 1qN0 WL0 1ld0 14n0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 1wn0|62e5", "America/Santo_Domingo|SDMT EST EDT EHDT AST|4E 50 40 4u 40|01213131313131414|-1ttjk 1lJMk Mn0 6sp0 Lbu 1Cou yLu 1RAu wLu 1QMu xzu 1Q0u xXu 1PAu 13jB0 e00|29e5", "America/Sao_Paulo|LMT BRT BRST|36.s 30 20|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212|-2glwR.w HdKR.w 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 pTd0 PX0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 1C10 Lz0 1Ip0 HX0 1zd0 On0 1HB0 IL0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1C10 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1C10 Lz0 1C10 Lz0 1C10 Lz0 1C10 On0 1zd0 Rb0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0|20e6", "America/Scoresbysund|LMT CGT CGST EGST EGT|1r.Q 20 10 0 10|0121343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434|-2a5Ww.8 2z5ew.8 1a00 1cK0 1cL0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|452", "America/Sitka|PST PWT PPT PDT YST AKST AKDT|80 70 70 70 90 90 80|01203030303030303030303030303030345656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565|-17T20 8x10 iy0 Vo10 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 co0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|90e2", "America/St_Johns|NST NDT NST NDT NWT NPT NDDT|3u.Q 2u.Q 3u 2u 2u 2u 1u|01010101010101010101010101010101010102323232323232324523232323232323232323232323232323232323232323232323232323232323232323232323232323232326232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-28oit.8 14L0 1nB0 1in0 1gm0 Dz0 1JB0 1cL0 1cN0 1cL0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 1cL0 1cN0 1cL0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 1cL0 1fB0 19X0 1fB0 19X0 10O0 eKX.8 19X0 1iq0 WL0 1qN0 WL0 1qN0 WL0 1tB0 TX0 1tB0 WL0 1qN0 WL0 1qN0 7UHu itu 1tB0 WL0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1tB0 WL0 1ld0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14n1 1lb0 14p0 1nW0 11C0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zcX Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|11e4", "America/Swift_Current|LMT MST MDT MWT MPT CST|7b.k 70 60 60 60 60|012134121212121212121215|-2AD4M.E uHdM.E 1in0 UGp0 8x20 ix0 1o10 17b0 1ip0 11z0 1o10 11z0 1o10 11z0 isN0 1cL0 3Cp0 1cL0 1cN0 11z0 1qN0 WL0 pMp0|16e3", "America/Tegucigalpa|LMT CST CDT|5M.Q 60 50|01212121|-1WGGb.8 2ETcb.8 WL0 1qN0 WL0 GRd0 AL0|11e5", "America/Thule|LMT AST ADT|4z.8 40 30|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2a5To.Q 31NBo.Q 1cL0 1cN0 1cL0 1fB0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|656", "America/Thunder_Bay|CST EST EWT EPT EDT|60 50 40 40 40|0123141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141|-2q5S0 1iaN0 8x40 iv0 XNB0 1cL0 1cN0 1fz0 1cN0 1cL0 3Cp0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|11e4", "America/Vancouver|PST PDT PWT PPT|80 70 70 70|0102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-25TO0 1in0 UGp0 8x10 iy0 1o10 17b0 1ip0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e5", "America/Whitehorse|YST YDT YWT YPT YDDT PST PDT|90 80 80 80 70 80 70|0101023040565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565|-25TN0 1in0 1o10 13V0 Ser0 8x00 iz0 LCL0 1fA0 3NA0 vrd0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e3", "America/Winnipeg|CST CDT CWT CPT|60 50 50 50|010101023010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aIi0 WL0 3ND0 1in0 Jap0 Rb0 aCN0 8x30 iw0 1tB0 11z0 1ip0 11z0 1o10 11z0 1o10 11z0 1rd0 10L0 1op0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 1cL0 1cN0 11z0 6i10 WL0 6i10 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1a00 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1a00 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|66e4", "America/Yakutat|YST YWT YPT YDT AKST AKDT|90 80 80 80 90 80|01203030303030303030303030303030304545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-17T10 8x00 iz0 Vo10 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cn0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|642", "America/Yellowknife|zzz MST MWT MPT MDDT MDT|0 70 60 60 50 60|012314151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151|-1pdA0 hix0 8x20 ix0 LCL0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|19e3", "Antarctica/Casey|zzz AWST CAST|0 -80 -b0|012121|-2q00 1DjS0 T90 40P0 KL0|10", "Antarctica/Davis|zzz DAVT DAVT|0 -70 -50|01012121|-vyo0 iXt0 alj0 1D7v0 VB0 3Wn0 KN0|70", "Antarctica/DumontDUrville|zzz PMT DDUT|0 -a0 -a0|0102|-U0o0 cfq0 bFm0|80", "Antarctica/Macquarie|AEST AEDT zzz MIST|-a0 -b0 0 -b0|0102010101010101010101010101010101010101010101010101010101010101010101010101010101010101013|-29E80 19X0 4SL0 1ayy0 Lvs0 1cM0 1o00 Rc0 1wo0 Rc0 1wo0 U00 1wo0 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1qM0 WM0 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1wo0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 11A0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 11A0 1o00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1cM0 1cM0 1cM0|1", "Antarctica/Mawson|zzz MAWT MAWT|0 -60 -50|012|-CEo0 2fyk0|60", "Pacific/Auckland|NZMT NZST NZST NZDT|-bu -cu -c0 -d0|01020202020202020202020202023232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323|-1GCVu Lz0 1tB0 11zu 1o0u 11zu 1o0u 11zu 1o0u 14nu 1lcu 14nu 1lcu 1lbu 11Au 1nXu 11Au 1nXu 11Au 1nXu 11Au 1nXu 11Au 1qLu WMu 1qLu 11Au 1n1bu IM0 1C00 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1qM0 14o0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1io0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00|14e5", "Antarctica/Palmer|zzz ARST ART ART ARST CLT CLST CLT|0 30 40 30 20 40 30 30|012121212123435656565656565656565656565656565656565656565656565656565656565656567|-cao0 nD0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 jsN0 14N0 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 1wn0|40", "Antarctica/Rothera|zzz ROTT|0 30|01|gOo0|130", "Antarctica/Syowa|zzz SYOT|0 -30|01|-vs00|20", "Antarctica/Troll|zzz UTC CEST|0 0 -20|01212121212121212121212121212121212121212121212121212121212121212121|1puo0 hd0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|40", "Antarctica/Vostok|zzz VOST|0 -60|01|-tjA0|25", "Europe/Oslo|CET CEST|-10 -20|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2awM0 Qm0 W6o0 5pf0 WM0 1fA0 1cM0 1cM0 1cM0 1cM0 wJc0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1qM0 WM0 zpc0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|62e4", "Asia/Riyadh|LMT AST|-36.Q -30|01|-TvD6.Q|57e5", "Asia/Almaty|LMT ALMT ALMT ALMST|-57.M -50 -60 -70|0123232323232323232323232323232323232323232323232|-1Pc57.M eUo7.M 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 3Cl0 1cL0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0|15e5", "Asia/Amman|LMT EET EEST|-2n.I -20 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1yW2n.I 1HiMn.I KL0 1oN0 11b0 1oN0 11b0 1pd0 1dz0 1cp0 11b0 1op0 11b0 fO10 1db0 1e10 1cL0 1cN0 1cL0 1cN0 1fz0 1pd0 10n0 1ld0 14n0 1hB0 15b0 1ip0 19X0 1cN0 1cL0 1cN0 17b0 1ld0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1So0 y00 1fc0 1dc0 1co0 1dc0 1cM0 1cM0 1cM0 1o00 11A0 1lc0 17c0 1cM0 1cM0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 4bX0 Dd0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|25e5", "Asia/Anadyr|LMT ANAT ANAT ANAST ANAST ANAST ANAT|-bN.U -c0 -d0 -e0 -d0 -c0 -b0|01232414141414141414141561414141414141414141414141414141414141561|-1PcbN.U eUnN.U 23CL0 1db0 1cN0 1dc0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 IM0 rU0 1cL0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qN0 WM0|13e3", "Asia/Aqtau|LMT FORT FORT SHET SHET SHEST AQTT AQTST AQTST AQTT|-3l.4 -40 -50 -50 -60 -60 -50 -60 -50 -40|012345353535353535353536767676898989898989898989896|-1Pc3l.4 eUnl.4 1jcL0 JDc0 1cL0 1dc0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2UK0 Fz0 1cL0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cN0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 RW0|15e4", "Asia/Aqtobe|LMT AKTT AKTT AKTST AKTT AQTT AQTST|-3M.E -40 -50 -60 -60 -50 -60|01234323232323232323232565656565656565656565656565|-1Pc3M.E eUnM.E 23CL0 1db0 1cM0 1dc0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2UK0 Fz0 1cL0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0|27e4", "Asia/Ashgabat|LMT ASHT ASHT ASHST ASHST TMT TMT|-3R.w -40 -50 -60 -50 -40 -50|012323232323232323232324156|-1Pc3R.w eUnR.w 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 ba0 xC0|41e4", "Asia/Baghdad|BMT AST ADT|-2V.A -30 -40|012121212121212121212121212121212121212121212121212121|-26BeV.A 2ACnV.A 11b0 1cp0 1dz0 1dd0 1db0 1cN0 1cp0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1de0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0|66e5", "Asia/Qatar|LMT GST AST|-3q.8 -40 -30|012|-21Jfq.8 27BXq.8|96e4", "Asia/Baku|LMT BAKT BAKT BAKST BAKST AZST AZT AZT AZST|-3j.o -30 -40 -50 -40 -40 -30 -40 -50|0123232323232323232323245657878787878787878787878787878787878787878787878787878787878787878787878787878787878787|-1Pc3j.o 1jUoj.o WCL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 10K0 c30 1cJ0 1cL0 8wu0 1o00 11z0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|27e5", "Asia/Bangkok|BMT ICT|-6G.4 -70|01|-218SG.4|15e6", "Asia/Beirut|EET EEST|-20 -30|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-21aq0 1on0 1410 1db0 19B0 1in0 1ip0 WL0 1lQp0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 11b0 q6N0 En0 1oN0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 11b0 1op0 11b0 dA10 17b0 1iN0 17b0 1iN0 17b0 1iN0 17b0 1vB0 SL0 1mp0 13z0 1iN0 17b0 1iN0 17b0 1jd0 12n0 1a10 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0|22e5", "Asia/Bishkek|LMT FRUT FRUT FRUST FRUST KGT KGST KGT|-4W.o -50 -60 -70 -60 -50 -60 -60|01232323232323232323232456565656565656565656565656567|-1Pc4W.o eUnW.o 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 11c0 1tX0 17b0 1ip0 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1cPu 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 T8u|87e4", "Asia/Brunei|LMT BNT BNT|-7D.E -7u -80|012|-1KITD.E gDc9.E|42e4", "Asia/Kolkata|HMT BURT IST IST|-5R.k -6u -5u -6u|01232|-18LFR.k 1unn.k HB0 7zX0|15e6", "Asia/Chita|LMT YAKT YAKT YAKST YAKST YAKT IRKT|-7x.Q -80 -90 -a0 -90 -a0 -80|012323232323232323232324123232323232323232323232323232323232323256|-21Q7x.Q pAnx.Q 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 IM0 rU0 1cL0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|33e4", "Asia/Choibalsan|LMT ULAT ULAT CHOST CHOT CHOT CHOST|-7C -70 -80 -a0 -90 -80 -90|0123434343434343434343434343434343434343434343456565656565656565656565656565656565656565656565|-2APHC 2UkoC cKn0 1da0 1dd0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 6hD0 11z0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 3Db0 h1f0 1cJ0 1cP0 1cJ0 1cP0 1fx0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1fx0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1fx0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1fx0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0|38e3", "Asia/Shanghai|CST CDT|-80 -90|01010101010101010|-1c1I0 LX0 16p0 1jz0 1Myp0 Rb0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0|23e6", "Asia/Colombo|MMT IST IHST IST LKT LKT|-5j.w -5u -60 -6u -6u -60|01231451|-2zOtj.w 1rFbN.w 1zzu 7Apu 23dz0 11zu n3cu|22e5", "Asia/Dhaka|HMT BURT IST DACT BDT BDST|-5R.k -6u -5u -60 -60 -70|01213454|-18LFR.k 1unn.k HB0 m6n0 LqMu 1x6n0 1i00|16e6", "Asia/Damascus|LMT EET EEST|-2p.c -20 -30|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-21Jep.c Hep.c 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1xRB0 11X0 1oN0 10L0 1pB0 11b0 1oN0 10L0 1mp0 13X0 1oN0 11b0 1pd0 11b0 1oN0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 Nb0 1AN0 Nb0 bcp0 19X0 1gp0 19X0 3ld0 1xX0 Vd0 1Bz0 Sp0 1vX0 10p0 1dz0 1cN0 1cL0 1db0 1db0 1g10 1an0 1ap0 1db0 1fd0 1db0 1cN0 1db0 1dd0 1db0 1cp0 1dz0 1c10 1dX0 1cN0 1db0 1dd0 1db0 1cN0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1db0 1cN0 1db0 1cN0 19z0 1fB0 1qL0 11B0 1on0 Wp0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0|26e5", "Asia/Dili|LMT TLT JST TLT WITA|-8m.k -80 -90 -90 -80|012343|-2le8m.k 1dnXm.k 8HA0 1ew00 Xld0|19e4", "Asia/Dubai|LMT GST|-3F.c -40|01|-21JfF.c|39e5", "Asia/Dushanbe|LMT DUST DUST DUSST DUSST TJT|-4z.c -50 -60 -70 -60 -50|0123232323232323232323245|-1Pc4z.c eUnz.c 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 14N0|76e4", "Asia/Gaza|EET EET EEST IST IDT|-20 -30 -30 -20 -30|010101010102020202020202020202023434343434343434343434343430202020202020202020202020202020202020202020202020202020202020202020202020202020202020|-1c2q0 5Rb0 10r0 1px0 10N0 1pz0 16p0 1jB0 16p0 1jx0 pBd0 Vz0 1oN0 11b0 1oO0 10N0 1pz0 10N0 1pb0 10N0 1pb0 10N0 1pb0 10N0 1pz0 10N0 1pb0 10N0 1pb0 11d0 1oL0 dW0 hfB0 Db0 1fB0 Rb0 npB0 11z0 1C10 IL0 1s10 10n0 1o10 WL0 1zd0 On0 1ld0 11z0 1o10 14n0 1o10 14n0 1nd0 12n0 1nd0 Xz0 1q10 12n0 M10 C00 17c0 1io0 17c0 1io0 17c0 1o00 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 17c0 1io0 18N0 1bz0 19z0 1gp0 1610 1iL0 11z0 1o10 14o0 1lA1 SKX 1xd1 MKX 1AN0 1a00 1fA0 1cL0 1cN0 1nX0 1210 1nz0 1210 1nz0 14N0 1nz0 1210 1nz0 1210 1nz0 1210 1nz0 1210 1nz0 1210 1nz0 14N0 1nz0 1210 1nz0 1210 1nz0 1210 1nz0 1210 1nz0 14N0 1nz0 1210 1nz0 1210 1nz0 1210 1nz0 1210 1nz0 1210 1nz0 14N0 1nz0 1210 1nz0 1210 1nz0 1210 1nz0|18e5", "Asia/Hebron|EET EET EEST IST IDT|-20 -30 -30 -20 -30|01010101010202020202020202020202343434343434343434343434343020202020202020202020202020202020202020202020202020202020202020202020202020202020202020|-1c2q0 5Rb0 10r0 1px0 10N0 1pz0 16p0 1jB0 16p0 1jx0 pBd0 Vz0 1oN0 11b0 1oO0 10N0 1pz0 10N0 1pb0 10N0 1pb0 10N0 1pb0 10N0 1pz0 10N0 1pb0 10N0 1pb0 11d0 1oL0 dW0 hfB0 Db0 1fB0 Rb0 npB0 11z0 1C10 IL0 1s10 10n0 1o10 WL0 1zd0 On0 1ld0 11z0 1o10 14n0 1o10 14n0 1nd0 12n0 1nd0 Xz0 1q10 12n0 M10 C00 17c0 1io0 17c0 1io0 17c0 1o00 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 17c0 1io0 18N0 1bz0 19z0 1gp0 1610 1iL0 12L0 1mN0 14o0 1lc0 Tb0 1xd1 MKX bB0 cn0 1cN0 1a00 1fA0 1cL0 1cN0 1nX0 1210 1nz0 1210 1nz0 14N0 1nz0 1210 1nz0 1210 1nz0 1210 1nz0 1210 1nz0 1210 1nz0 14N0 1nz0 1210 1nz0 1210 1nz0 1210 1nz0 1210 1nz0 14N0 1nz0 1210 1nz0 1210 1nz0 1210 1nz0 1210 1nz0 1210 1nz0 14N0 1nz0 1210 1nz0 1210 1nz0 1210 1nz0|25e4", "Asia/Ho_Chi_Minh|LMT PLMT ICT IDT JST|-76.E -76.u -70 -80 -90|0123423232|-2yC76.E bK00.a 1h7b6.u 5lz0 18o0 3Oq0 k5b0 aW00 BAM0|90e5", "Asia/Hong_Kong|LMT HKT HKST JST|-7A.G -80 -90 -90|0121312121212121212121212121212121212121212121212121212121212121212121|-2CFHA.G 1sEP6.G 1cL0 ylu 93X0 1qQu 1tX0 Rd0 1In0 NB0 1cL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1kL0 14N0 1nX0 U10 1tz0 U10 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 U10 1tz0 U10 1wn0 Rd0 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 17d0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 s10 1Vz0 1cN0 1cL0 1cN0 1cL0 6fd0 14n0|73e5", "Asia/Hovd|LMT HOVT HOVT HOVST|-66.A -60 -70 -80|012323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-2APG6.A 2Uko6.A cKn0 1db0 1dd0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 6hD0 11z0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 kEp0 1cJ0 1cP0 1cJ0 1cP0 1fx0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1fx0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1fx0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1fx0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0|81e3", "Asia/Irkutsk|IMT IRKT IRKT IRKST IRKST IRKT|-6V.5 -70 -80 -90 -80 -90|012323232323232323232324123232323232323232323232323232323232323252|-21zGV.5 pjXV.5 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 IM0 rU0 1cL0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|60e4", "Europe/Istanbul|IMT EET EEST TRST TRT|-1U.U -20 -30 -40 -30|012121212121212121212121212121212121212121212121212121234343434342121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2ogNU.U dzzU.U 11b0 8tB0 1on0 1410 1db0 19B0 1in0 3Rd0 Un0 1oN0 11b0 zSp0 CL0 mN0 1Vz0 1gN0 1pz0 5Rd0 1fz0 1yp0 ML0 1kp0 17b0 1ip0 17b0 1fB0 19X0 1jB0 18L0 1ip0 17z0 qdd0 xX0 3S10 Tz0 dA10 11z0 1o10 11z0 1qN0 11z0 1ze0 11B0 WM0 1qO0 WI0 1nX0 1rB0 10L0 11B0 1in0 17d0 1in0 2pX0 19E0 1fU0 16Q0 1iI0 16Q0 1iI0 1Vd0 pb0 3Kp0 14o0 1df0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cL0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WO0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 Xc0 1qo0 WM0 1qM0 11A0 1o00 1200 1nA0 11A0 1tA0 U00 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|13e6", "Asia/Jakarta|BMT JAVT WIB JST WIB WIB|-77.c -7k -7u -90 -80 -70|01232425|-1Q0Tk luM0 mPzO 8vWu 6kpu 4PXu xhcu|31e6", "Asia/Jayapura|LMT WIT ACST|-9m.M -90 -9u|0121|-1uu9m.M sMMm.M L4nu|26e4", "Asia/Jerusalem|JMT IST IDT IDDT|-2k.E -20 -30 -40|01212121212132121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-26Bek.E SyMk.E 5Rb0 10r0 1px0 10N0 1pz0 16p0 1jB0 16p0 1jx0 3LB0 Em0 or0 1cn0 1dB0 16n0 10O0 1ja0 1tC0 14o0 1cM0 1a00 11A0 1Na0 An0 1MP0 AJ0 1Kp0 LC0 1oo0 Wl0 EQN0 Db0 1fB0 Rb0 npB0 11z0 1C10 IL0 1s10 10n0 1o10 WL0 1zd0 On0 1ld0 11z0 1o10 14n0 1o10 14n0 1nd0 12n0 1nd0 Xz0 1q10 12n0 1hB0 1dX0 1ep0 1aL0 1eN0 17X0 1nf0 11z0 1tB0 19W0 1e10 17b0 1ep0 1gL0 18N0 1fz0 1eN0 17b0 1gq0 1gn0 19d0 1dz0 1c10 17X0 1hB0 1gn0 19d0 1dz0 1c10 17X0 1kp0 1dz0 1c10 1aL0 1eN0 1oL0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0|81e4", "Asia/Kabul|AFT AFT|-40 -4u|01|-10Qs0|46e5", "Asia/Kamchatka|LMT PETT PETT PETST PETST|-ay.A -b0 -c0 -d0 -c0|01232323232323232323232412323232323232323232323232323232323232412|-1SLKy.A ivXy.A 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 IM0 rU0 1cL0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qN0 WM0|18e4", "Asia/Karachi|LMT IST IST KART PKT PKST|-4s.c -5u -6u -50 -50 -60|012134545454|-2xoss.c 1qOKW.c 7zX0 eup0 LqMu 1fy01 1cL0 dK0X 11b0 1610 1jX0|24e6", "Asia/Urumqi|LMT XJT|-5O.k -60|01|-1GgtO.k|32e5", "Asia/Kathmandu|LMT IST NPT|-5F.g -5u -5J|012|-21JhF.g 2EGMb.g|12e5", "Asia/Khandyga|LMT YAKT YAKT YAKST YAKST VLAT VLAST VLAT YAKT|-92.d -80 -90 -a0 -90 -a0 -b0 -b0 -a0|01232323232323232323232412323232323232323232323232565656565656565782|-21Q92.d pAp2.d 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 IM0 rU0 1cL0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 qK0 yN0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 17V0 7zD0|66e2", "Asia/Krasnoyarsk|LMT KRAT KRAT KRAST KRAST KRAT|-6b.q -60 -70 -80 -70 -80|012323232323232323232324123232323232323232323232323232323232323252|-21Hib.q prAb.q 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 IM0 rU0 1cL0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|10e5", "Asia/Kuala_Lumpur|SMT MALT MALST MALT MALT JST MYT|-6T.p -70 -7k -7k -7u -90 -80|01234546|-2Bg6T.p 17anT.p 7hXE dM00 17bO 8Fyu 1so1u|71e5", "Asia/Kuching|LMT BORT BORT BORTST JST MYT|-7l.k -7u -80 -8k -90 -80|01232323232323232425|-1KITl.k gDbP.k 6ynu AnE 1O0k AnE 1NAk AnE 1NAk AnE 1NAk AnE 1O0k AnE 1NAk AnE pAk 8Fz0 1so10|13e4", "Asia/Macau|LMT MOT MOST CST|-7y.k -80 -90 -80|0121212121212121212121212121212121212121213|-2le7y.k 1XO34.k 1wn0 Rd0 1wn0 R9u 1wqu U10 1tz0 TVu 1tz0 17gu 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cJu 1cL0 1cN0 1fz0 1cN0 1cOu 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cJu 1cL0 1cN0 1fz0 1cN0 1cL0 KEp0|57e4", "Asia/Magadan|LMT MAGT MAGT MAGST MAGST MAGT|-a3.c -a0 -b0 -c0 -b0 -c0|012323232323232323232324123232323232323232323232323232323232323251|-1Pca3.c eUo3.c 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 IM0 rU0 1cL0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|95e3", "Asia/Makassar|LMT MMT WITA JST|-7V.A -7V.A -80 -90|01232|-21JjV.A vfc0 myLV.A 8ML0|15e5", "Asia/Manila|PHT PHST JST|-80 -90 -90|010201010|-1kJI0 AL0 cK10 65X0 mXB0 vX0 VK10 1db0|24e6", "Asia/Nicosia|LMT EET EEST|-2d.s -20 -30|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1Vc2d.s 2a3cd.s 1cL0 1qp0 Xz0 19B0 19X0 1fB0 1db0 1cp0 1cL0 1fB0 19X0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1o30 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|32e4", "Asia/Novokuznetsk|LMT KRAT KRAT KRAST KRAST NOVST NOVT NOVT|-5M.M -60 -70 -80 -70 -70 -60 -70|012323232323232323232324123232323232323232323232323232323232325672|-1PctM.M eULM.M 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 IM0 rU0 1cL0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qN0 WM0 8Hz0|55e4", "Asia/Novosibirsk|LMT NOVT NOVT NOVST NOVST|-5v.E -60 -70 -80 -70|0123232323232323232323241232341414141414141414141414141414141414121|-21Qnv.E pAFv.E 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 IM0 rU0 1cL0 1cQ0 ml0 Os0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|15e5", "Asia/Omsk|LMT OMST OMST OMSST OMSST OMST|-4R.u -50 -60 -70 -60 -70|012323232323232323232324123232323232323232323232323232323232323252|-224sR.u pMLR.u 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 IM0 rU0 1cL0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|12e5", "Asia/Oral|LMT URAT URAT URAST URAT URAST ORAT ORAST ORAT|-3p.o -40 -50 -60 -60 -50 -40 -50 -50|012343232323232323251516767676767676767676767676768|-1Pc3p.o eUnp.o 23CL0 1db0 1cM0 1dc0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 2UK0 Fz0 1cL0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 RW0|27e4", "Asia/Pontianak|LMT PMT WIB JST WIB WITA WIB|-7h.k -7h.k -7u -90 -80 -80 -70|012324256|-2ua7h.k XE00 munL.k 8Rau 6kpu 4PXu xhcu Wqnu|23e4", "Asia/Pyongyang|LMT KST JCST JST KST|-8n -8u -90 -90 -90|012341|-2um8n 97XR 12FXu jdA0 2Onc0|29e5", "Asia/Qyzylorda|LMT KIZT KIZT KIZST KIZT QYZT QYZT QYZST|-4l.Q -40 -50 -60 -60 -50 -60 -70|012343232323232323232325676767676767676767676767676|-1Pc4l.Q eUol.Q 23CL0 1db0 1cM0 1dc0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2UK0 dC0 rU0 1cL0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0|73e4", "Asia/Rangoon|RMT BURT JST MMT|-6o.E -6u -90 -6u|0123|-21Jio.E SmnS.E 7j9u|48e5", "Asia/Sakhalin|LMT JCST JST SAKT SAKST SAKST SAKT|-9u.M -90 -90 -b0 -c0 -b0 -a0|0123434343434343434343435634343434343565656565656565656565656565636|-2AGVu.M 1iaMu.M je00 1qFa0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 IM0 rU0 1cL0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o10 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|58e4", "Asia/Samarkand|LMT SAMT SAMT SAMST TAST UZST UZT|-4r.R -40 -50 -60 -60 -60 -50|01234323232323232323232356|-1Pc4r.R eUor.R 23CL0 1db0 1cM0 1dc0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 11x0 bf0|36e4", "Asia/Seoul|LMT KST JCST JST KST KDT KDT|-8r.Q -8u -90 -90 -90 -9u -a0|01234151515151515146464|-2um8r.Q 97XV.Q 12FXu jjA0 kKo0 2I0u OL0 1FB0 Rb0 1qN0 TX0 1tB0 TX0 1tB0 TX0 1tB0 TX0 2ap0 12FBu 11A0 1o00 11A0|23e6", "Asia/Singapore|SMT MALT MALST MALT MALT JST SGT SGT|-6T.p -70 -7k -7k -7u -90 -7u -80|012345467|-2Bg6T.p 17anT.p 7hXE dM00 17bO 8Fyu Mspu DTA0|56e5", "Asia/Srednekolymsk|LMT MAGT MAGT MAGST MAGST MAGT SRET|-ae.Q -a0 -b0 -c0 -b0 -c0 -b0|012323232323232323232324123232323232323232323232323232323232323256|-1Pcae.Q eUoe.Q 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 IM0 rU0 1cL0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|35e2", "Asia/Taipei|JWST JST CST CDT|-80 -90 -80 -90|01232323232323232323232323232323232323232|-1iw80 joM0 1yo0 Tz0 1ip0 1jX0 1cN0 11b0 1oN0 11b0 1oN0 11b0 1oN0 11b0 10N0 1BX0 10p0 1pz0 10p0 1pz0 10p0 1db0 1dd0 1db0 1cN0 1db0 1cN0 1db0 1cN0 1db0 1BB0 ML0 1Bd0 ML0 uq10 1db0 1cN0 1db0 97B0 AL0|74e5", "Asia/Tashkent|LMT TAST TAST TASST TASST UZST UZT|-4B.b -50 -60 -70 -60 -60 -50|01232323232323232323232456|-1Pc4B.b eUnB.b 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 11y0 bf0|23e5", "Asia/Tbilisi|TBMT TBIT TBIT TBIST TBIST GEST GET GET GEST|-2X.b -30 -40 -50 -40 -40 -30 -40 -50|0123232323232323232323245656565787878787878787878567|-1Pc2X.b 1jUnX.b WCL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 3y0 19f0 1cK0 1cL0 1cN0 1cL0 1cN0 1cL0 1cM0 1cL0 1fB0 3Nz0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 An0 Os0 WM0|11e5", "Asia/Tehran|LMT TMT IRST IRST IRDT IRDT|-3p.I -3p.I -3u -40 -50 -4u|01234325252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252|-2btDp.I 1d3c0 1huLT.I TXu 1pz0 sN0 vAu 1cL0 1dB0 1en0 pNB0 UL0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 64p0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0|14e6", "Asia/Thimphu|LMT IST BTT|-5W.A -5u -60|012|-Su5W.A 1BGMs.A|79e3", "Asia/Tokyo|JCST JST JDT|-90 -90 -a0|0121212121|-1iw90 pKq0 QL0 1lB0 13X0 1zB0 NX0 1zB0 NX0|38e6", "Asia/Ulaanbaatar|LMT ULAT ULAT ULAST|-77.w -70 -80 -90|012323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-2APH7.w 2Uko7.w cKn0 1db0 1dd0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 6hD0 11z0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 kEp0 1cJ0 1cP0 1cJ0 1cP0 1fx0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1fx0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1fx0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1fx0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0|12e5", "Asia/Ust-Nera|LMT YAKT YAKT MAGST MAGT MAGST MAGT MAGT VLAT VLAT|-9w.S -80 -90 -c0 -b0 -b0 -a0 -c0 -b0 -a0|0123434343434343434343456434343434343434343434343434343434343434789|-21Q9w.S pApw.S 23CL0 1d90 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 IM0 rU0 1cL0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 17V0 7zD0|65e2", "Asia/Vladivostok|LMT VLAT VLAT VLAST VLAST VLAT|-8L.v -90 -a0 -b0 -a0 -b0|012323232323232323232324123232323232323232323232323232323232323252|-1SJIL.v itXL.v 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 IM0 rU0 1cL0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|60e4", "Asia/Yakutsk|LMT YAKT YAKT YAKST YAKST YAKT|-8C.W -80 -90 -a0 -90 -a0|012323232323232323232324123232323232323232323232323232323232323252|-21Q8C.W pAoC.W 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 IM0 rU0 1cL0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|28e4", "Asia/Yekaterinburg|LMT PMT SVET SVET SVEST SVEST YEKT YEKST YEKT|-42.x -3J.5 -40 -50 -60 -50 -50 -60 -60|0123434343434343434343435267676767676767676767676767676767676767686|-2ag42.x 7mQh.s qBvJ.5 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 IM0 rU0 1cL0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|14e5", "Asia/Yerevan|LMT YERT YERT YERST YERST AMST AMT AMT AMST|-2W -30 -40 -50 -40 -40 -30 -40 -50|0123232323232323232323245656565657878787878787878787878787878787|-1Pc2W 1jUnW WCL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1am0 2r0 1cJ0 1cL0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 3Fb0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|13e5", "Atlantic/Azores|HMT AZOT AZOST AZOMT AZOT AZOST WET|1S.w 20 10 0 10 0 0|01212121212121212121212121212121212121212121232123212321232121212121212121212121212121212121212121454545454545454545454545454545456545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-2ldW5.s aPX5.s Sp0 LX0 1vc0 Tc0 1uM0 SM0 1vc0 Tc0 1vc0 SM0 1vc0 6600 1co0 3E00 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 3I00 17c0 1cM0 1cM0 3Fc0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 1tA0 1cM0 1dc0 1400 gL0 IM0 s10 U00 dX0 Rc0 pd0 Rc0 gL0 Oo0 pd0 Rc0 gL0 Oo0 pd0 14o0 1cM0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 3Co0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 qIl0 1cM0 1fA0 1cM0 1cM0 1cN0 1cL0 1cN0 1cM0 1cM0 1cM0 1cM0 1cN0 1cL0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cL0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|25e4", "Atlantic/Bermuda|LMT AST ADT|4j.i 40 30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1BnRE.G 1LTbE.G 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|65e3", "Atlantic/Canary|LMT CANT WET WEST|11.A 10 0 -10|01232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-1UtaW.o XPAW.o 1lAK0 1a10 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|54e4", "Atlantic/Cape_Verde|LMT CVT CVST CVT|1y.4 20 10 10|01213|-2xomp.U 1qOMp.U 7zX0 1djf0|50e4", "Atlantic/Faroe|LMT WET WEST|r.4 0 -10|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2uSnw.U 2Wgow.U 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|49e3", "Atlantic/Madeira|FMT MADT MADST MADMT WET WEST|17.A 10 0 -10 0 -10|01212121212121212121212121212121212121212121232123212321232121212121212121212121212121212121212121454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-2ldWQ.o aPWQ.o Sp0 LX0 1vc0 Tc0 1uM0 SM0 1vc0 Tc0 1vc0 SM0 1vc0 6600 1co0 3E00 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 3I00 17c0 1cM0 1cM0 3Fc0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 1tA0 1cM0 1dc0 1400 gL0 IM0 s10 U00 dX0 Rc0 pd0 Rc0 gL0 Oo0 pd0 Rc0 gL0 Oo0 pd0 14o0 1cM0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 3Co0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 qIl0 1cM0 1fA0 1cM0 1cM0 1cN0 1cL0 1cN0 1cM0 1cM0 1cM0 1cM0 1cN0 1cL0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|27e4", "Atlantic/Reykjavik|LMT IST ISST GMT|1s 10 0 0|012121212121212121212121212121212121212121212121212121212121212121213|-2uWmw mfaw 1Bd0 ML0 1LB0 Cn0 1LB0 3fX0 C10 HrX0 1cO0 LB0 1EL0 LA0 1C00 Oo0 1wo0 Rc0 1wo0 Rc0 1wo0 Rc0 1zc0 Oo0 1zc0 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1lc0 14o0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 14o0|12e4", "Atlantic/South_Georgia|GST|20|0||30", "Atlantic/Stanley|SMT FKT FKST FKT FKST|3P.o 40 30 30 20|0121212121212134343212121212121212121212121212121212121212121212121212|-2kJw8.A 12bA8.A 19X0 1fB0 19X0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1fB0 Cn0 1Cc10 WL0 1qL0 U10 1tz0 U10 1qM0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1tz0 U10 1tz0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1tz0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qN0 U10 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 U10 1tz0 U10 1tz0 U10 1wn0 U10 1tz0 U10 1tz0 U10|21e2", "Australia/Sydney|AEST AEDT|-a0 -b0|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293lX xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 14o0 1o00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1tA0 WM0 1tA0 U00 1tA0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 11A0 1o00 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|40e5", "Australia/Adelaide|ACST ACDT|-9u -au|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293lt xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 Oo0 1zc0 WM0 1qM0 Rc0 1zc0 U00 1tA0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|11e5", "Australia/Brisbane|AEST AEDT|-a0 -b0|01010101010101010|-293lX xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 H1A0 Oo0 1zc0 Oo0 1zc0 Oo0|20e5", "Australia/Broken_Hill|ACST ACDT|-9u -au|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293lt xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 14o0 1o00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1tA0 WM0 1tA0 U00 1tA0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|18e3", "Australia/Currie|AEST AEDT|-a0 -b0|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-29E80 19X0 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1qM0 WM0 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1wo0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 11A0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 11A0 1o00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|746", "Australia/Darwin|ACST ACDT|-9u -au|010101010|-293lt xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0|12e4", "Australia/Eucla|ACWST ACWDT|-8J -9J|0101010101010101010|-293kI xcX 10jd0 yL0 1cN0 1cL0 1gSp0 Oo0 l5A0 Oo0 iJA0 G00 zU00 IM0 1qM0 11A0 1o00 11A0|368", "Australia/Hobart|AEST AEDT|-a0 -b0|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-29E80 19X0 10jd0 yL0 1cN0 1cL0 1fB0 19X0 VfB0 1cM0 1o00 Rc0 1wo0 Rc0 1wo0 U00 1wo0 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1qM0 WM0 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1wo0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 11A0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 11A0 1o00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|21e4", "Australia/Lord_Howe|AEST LHST LHDT LHDT|-a0 -au -bu -b0|0121212121313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313|raC0 1zdu Rb0 1zd0 On0 1zd0 On0 1zd0 On0 1zd0 TXu 1qMu WLu 1tAu WLu 1tAu TXu 1tAu Onu 1zcu Onu 1zcu Onu 1zcu Rbu 1zcu Onu 1zcu Onu 1zcu 11zu 1o0u 11zu 1o0u 11zu 1o0u 11zu 1qMu WLu 11Au 1nXu 1qMu 11zu 1o0u 11zu 1o0u 11zu 1qMu WLu 1qMu 11zu 1o0u WLu 1qMu 14nu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1fzu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu|347", "Australia/Lindeman|AEST AEDT|-a0 -b0|010101010101010101010|-293lX xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 H1A0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0|10", "Australia/Melbourne|AEST AEDT|-a0 -b0|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293lX xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1qM0 11A0 1tA0 U00 1tA0 U00 1tA0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 11A0 1o00 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|39e5", "Australia/Perth|AWST AWDT|-80 -90|0101010101010101010|-293jX xcX 10jd0 yL0 1cN0 1cL0 1gSp0 Oo0 l5A0 Oo0 iJA0 G00 zU00 IM0 1qM0 11A0 1o00 11A0|18e5", "CET|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 16M0 1gMM0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00", "CST6CDT|CST CDT CWT CPT|60 50 50 50|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "Pacific/Easter|EMT EAST EASST EAST EASST EAST|7h.s 70 60 60 50 50|012121212121212121212121212123434343434343434343434343434343434343434343434343434343434343434345|-1uSgG.w 1s4IG.w WL0 1zd0 On0 1ip0 11z0 1o10 11z0 1qN0 WL0 1ld0 14n0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 1wn0|30e2", "EET|EET EEST|-20 -30|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|hDB0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00", "EST|EST|50|0|", "EST5EDT|EST EDT EWT EPT|50 40 40 40|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261t0 1nX0 11B0 1nX0 SgN0 8x40 iv0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "Europe/Dublin|DMT IST GMT BST IST|p.l -y.D 0 -10 -10|01232323232324242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242|-2ax9y.D Rc0 1fzy.D 14M0 1fc0 1g00 1co0 1dc0 1co0 1oo0 1400 1dc0 19A0 1io0 1io0 WM0 1o00 14o0 1o00 17c0 1io0 17c0 1fA0 1a00 1lc0 17c0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1cM0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1io0 1qM0 Dc0 g5X0 14p0 1wn0 17d0 1io0 11A0 1o00 17c0 1fA0 1a00 1fA0 1cM0 1fA0 1a00 17c0 1fA0 1a00 1io0 17c0 1lc0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1a00 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1tA0 IM0 90o0 U00 1tA0 U00 1tA0 U00 1tA0 U00 1tA0 WM0 1qM0 WM0 1qM0 WM0 1tA0 U00 1tA0 U00 1tA0 11z0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 14o0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5", "Etc/GMT+0|GMT|0|0|", "Etc/GMT+1|GMT+1|10|0|", "Etc/GMT+10|GMT+10|a0|0|", "Etc/GMT+11|GMT+11|b0|0|", "Etc/GMT+12|GMT+12|c0|0|", "Etc/GMT+2|GMT+2|20|0|", "Etc/GMT+3|GMT+3|30|0|", "Etc/GMT+4|GMT+4|40|0|", "Etc/GMT+5|GMT+5|50|0|", "Etc/GMT+6|GMT+6|60|0|", "Etc/GMT+7|GMT+7|70|0|", "Etc/GMT+8|GMT+8|80|0|", "Etc/GMT+9|GMT+9|90|0|", "Etc/GMT-1|GMT-1|-10|0|", "Etc/GMT-10|GMT-10|-a0|0|", "Etc/GMT-11|GMT-11|-b0|0|", "Etc/GMT-12|GMT-12|-c0|0|", "Etc/GMT-13|GMT-13|-d0|0|", "Etc/GMT-14|GMT-14|-e0|0|", "Etc/GMT-2|GMT-2|-20|0|", "Etc/GMT-3|GMT-3|-30|0|", "Etc/GMT-4|GMT-4|-40|0|", "Etc/GMT-5|GMT-5|-50|0|", "Etc/GMT-6|GMT-6|-60|0|", "Etc/GMT-7|GMT-7|-70|0|", "Etc/GMT-8|GMT-8|-80|0|", "Etc/GMT-9|GMT-9|-90|0|", "Etc/UCT|UCT|0|0|", "Etc/UTC|UTC|0|0|", "Europe/Amsterdam|AMT NST NEST NET CEST CET|-j.w -1j.w -1k -k -20 -10|010101010101010101010101010101010101010101012323234545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545|-2aFcj.w 11b0 1iP0 11A0 1io0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1co0 1io0 1yo0 Pc0 1a00 1fA0 1Bc0 Mo0 1tc0 Uo0 1tA0 U00 1uo0 W00 1s00 VA0 1so0 Vc0 1sM0 UM0 1wo0 Rc0 1u00 Wo0 1rA0 W00 1s00 VA0 1sM0 UM0 1w00 fV0 BCX.w 1tA0 U00 1u00 Wo0 1sm0 601k WM0 1fA0 1cM0 1cM0 1cM0 16M0 1gMM0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|16e5", "Europe/Andorra|WET CET CEST|0 -10 -20|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-UBA0 1xIN0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|79e3", "Europe/Athens|AMT EET EEST CEST CET|-1y.Q -20 -30 -20 -10|012123434121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2a61x.Q CNbx.Q mn0 kU10 9b0 3Es0 Xa0 1fb0 1dd0 k3X0 Nz0 SCp0 1vc0 SO0 1cM0 1a00 1ao0 1fc0 1a10 1fG0 1cg0 1dX0 1bX0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|35e5", "Europe/London|GMT BST BDST|0 -10 -20|0101010101010101010101010101010101010101010101010121212121210101210101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2axa0 Rc0 1fA0 14M0 1fc0 1g00 1co0 1dc0 1co0 1oo0 1400 1dc0 19A0 1io0 1io0 WM0 1o00 14o0 1o00 17c0 1io0 17c0 1fA0 1a00 1lc0 17c0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1cM0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1io0 1qM0 Dc0 2Rz0 Dc0 1zc0 Oo0 1zc0 Rc0 1wo0 17c0 1iM0 FA0 xB0 1fA0 1a00 14o0 bb0 LA0 xB0 Rc0 1wo0 11A0 1o00 17c0 1fA0 1a00 1fA0 1cM0 1fA0 1a00 17c0 1fA0 1a00 1io0 17c0 1lc0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1a00 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1tA0 IM0 90o0 U00 1tA0 U00 1tA0 U00 1tA0 U00 1tA0 WM0 1qM0 WM0 1qM0 WM0 1tA0 U00 1tA0 U00 1tA0 11z0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 14o0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|10e6", "Europe/Belgrade|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-19RC0 3IP0 WM0 1fA0 1cM0 1cM0 1rc0 Qo0 1vmo0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5", "Europe/Berlin|CET CEST CEMT|-10 -20 -30|01010101010101210101210101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 kL0 Nc0 m10 WM0 1ao0 1cp0 dX0 jz0 Dd0 1io0 17c0 1fA0 1a00 1ehA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|41e5", "Europe/Prague|CET CEST|-10 -20|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 16M0 1lc0 1tA0 17A0 11c0 1io0 17c0 1io0 17c0 1fc0 1ao0 1bNc0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|13e5", "Europe/Brussels|WET CET CEST WEST|0 -10 -20 -10|0121212103030303030303030303030303030303030303030303212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2ehc0 3zX0 11c0 1iO0 11A0 1o00 11A0 my0 Ic0 1qM0 Rc0 1EM0 UM0 1u00 10o0 1io0 1io0 17c0 1a00 1fA0 1cM0 1cM0 1io0 17c0 1fA0 1a00 1io0 1a30 1io0 17c0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 y00 5Wn0 WM0 1fA0 1cM0 16M0 1iM0 16M0 1C00 Uo0 1eeo0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|21e5", "Europe/Bucharest|BMT EET EEST|-1I.o -20 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1xApI.o 20LI.o RA0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1Axc0 On0 1fA0 1a10 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cK0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cL0 1cN0 1cL0 1fB0 1nX0 11E0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|19e5", "Europe/Budapest|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1ip0 17b0 1op0 1tb0 Q2m0 3Ne0 WM0 1fA0 1cM0 1cM0 1oJ0 1dc0 1030 1fA0 1cM0 1cM0 1cM0 1cM0 1fA0 1a00 1iM0 1fA0 8Ha0 Rb0 1wN0 Rb0 1BB0 Lz0 1C20 LB0 SNX0 1a10 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|17e5", "Europe/Zurich|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-19Lc0 11A0 1o00 11A0 1xG10 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|38e4", "Europe/Chisinau|CMT BMT EET EEST CEST CET MSK MSD|-1T -1I.o -20 -30 -20 -10 -30 -40|0123232323232323232345454676767676767676767623232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-26jdT wGMa.A 20LI.o RA0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 27A0 2en0 39g0 WM0 1fA0 1cM0 V90 1t7z0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1ty0 2bD0 1cM0 1cK0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1nX0 11D0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|67e4", "Europe/Copenhagen|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2azC0 Tz0 VuO0 60q0 WM0 1fA0 1cM0 1cM0 1cM0 S00 1HA0 Nc0 1C00 Dc0 1Nc0 Ao0 1h5A0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5", "Europe/Gibraltar|GMT BST BDST CET CEST|0 -10 -20 -10 -20|010101010101010101010101010101010101010101010101012121212121010121010101010101010101034343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343|-2axa0 Rc0 1fA0 14M0 1fc0 1g00 1co0 1dc0 1co0 1oo0 1400 1dc0 19A0 1io0 1io0 WM0 1o00 14o0 1o00 17c0 1io0 17c0 1fA0 1a00 1lc0 17c0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1cM0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1io0 1qM0 Dc0 2Rz0 Dc0 1zc0 Oo0 1zc0 Rc0 1wo0 17c0 1iM0 FA0 xB0 1fA0 1a00 14o0 bb0 LA0 xB0 Rc0 1wo0 11A0 1o00 17c0 1fA0 1a00 1fA0 1cM0 1fA0 1a00 17c0 1fA0 1a00 1io0 17c0 1lc0 17c0 1fA0 10Jz0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|30e3", "Europe/Helsinki|HMT EET EEST|-1D.N -20 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1WuND.N OULD.N 1dA0 1xGq0 1cM0 1cM0 1cM0 1cN0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5", "Europe/Kaliningrad|CET CEST CET CEST MSK MSD EEST EET FET|-10 -20 -20 -30 -30 -40 -30 -20 -30|0101010101010232454545454545454545454676767676767676767676767676767676767676787|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 Am0 Lb0 1en0 op0 1pNz0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 1cJ0 1cL0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|44e4", "Europe/Kiev|KMT EET MSK CEST CET MSD EEST|-22.4 -20 -30 -20 -10 -40 -30|0123434252525252525252525256161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161|-1Pc22.4 eUo2.4 rnz0 2Hg0 WM0 1fA0 da0 1v4m0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 Db0 3220 1cK0 1cL0 1cN0 1cL0 1cN0 1cL0 1cQ0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|34e5", "Europe/Lisbon|LMT WET WEST WEMT CET CEST|A.J 0 -10 -20 -10 -20|012121212121212121212121212121212121212121212321232123212321212121212121212121212121212121212121214121212121212121212121212121212124545454212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2ldXn.f aPWn.f Sp0 LX0 1vc0 Tc0 1uM0 SM0 1vc0 Tc0 1vc0 SM0 1vc0 6600 1co0 3E00 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 3I00 17c0 1cM0 1cM0 3Fc0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 1tA0 1cM0 1dc0 1400 gL0 IM0 s10 U00 dX0 Rc0 pd0 Rc0 gL0 Oo0 pd0 Rc0 gL0 Oo0 pd0 14o0 1cM0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 3Co0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 pvy0 1cM0 1cM0 1fA0 1cM0 1cM0 1cN0 1cL0 1cN0 1cM0 1cM0 1cM0 1cM0 1cN0 1cL0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|27e5", "Europe/Luxembourg|LMT CET CEST WET WEST WEST WET|-o.A -10 -20 0 -10 -20 -10|0121212134343434343434343434343434343434343434343434565651212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2DG0o.A t6mo.A TB0 1nX0 Up0 1o20 11A0 rW0 CM0 1qP0 R90 1EO0 UK0 1u20 10m0 1ip0 1in0 17e0 19W0 1fB0 1db0 1cp0 1in0 17d0 1fz0 1a10 1in0 1a10 1in0 17f0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 vA0 60L0 WM0 1fA0 1cM0 17c0 1io0 16M0 1C00 Uo0 1eeo0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|54e4", "Europe/Madrid|WET WEST WEMT CET CEST|0 -10 -20 -10 -20|01010101010101010101010121212121234343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343|-28dd0 11A0 1go0 19A0 1co0 1dA0 b1A0 18o0 3I00 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 iyo0 Rc0 18o0 1hc0 1io0 1a00 14o0 5aL0 MM0 1vc0 17A0 1i00 1bc0 1eo0 17d0 1in0 17A0 6hA0 10N0 XIL0 1a10 1in0 17d0 19X0 1cN0 1fz0 1a10 1fX0 1cp0 1cO0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|62e5", "Europe/Malta|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2as10 M00 1cM0 1cM0 14o0 1o00 WM0 1qM0 17c0 1cM0 M3A0 5M20 WM0 1fA0 1cM0 1cM0 1cM0 16m0 1de0 1lc0 14m0 1lc0 WO0 1qM0 GTW0 On0 1C10 Lz0 1C10 Lz0 1EN0 Lz0 1C10 Lz0 1zd0 Oo0 1C00 On0 1cp0 1cM0 1lA0 Xc0 1qq0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1iN0 19z0 1fB0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|42e4", "Europe/Minsk|MMT EET MSK CEST CET MSD EEST FET|-1O -20 -30 -20 -10 -40 -30 -30|012343432525252525252525252616161616161616161616161616161616161616172|-1Pc1O eUnO qNX0 3gQ0 WM0 1fA0 1cM0 Al0 1tsn0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 3Fc0 1cN0 1cK0 1cM0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hy0|19e5", "Europe/Monaco|PMT WET WEST WEMT CET CEST|-9.l 0 -10 -20 -10 -20|01212121212121212121212121212121212121212121212121232323232345454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-2nco9.l cNb9.l HA0 19A0 1iM0 11c0 1oo0 Wo0 1rc0 QM0 1EM0 UM0 1u00 10o0 1io0 1wo0 Rc0 1a00 1fA0 1cM0 1cM0 1io0 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Df0 2RV0 11z0 11B0 1ze0 WM0 1fA0 1cM0 1fa0 1aq0 16M0 1ekn0 1cL0 1fC0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|38e3", "Europe/Moscow|MMT MMT MST MDST MSD MSK MSM EET EEST MSK|-2u.h -2v.j -3v.j -4v.j -40 -30 -50 -20 -30 -40|012132345464575454545454545454545458754545454545454545454545454545454545454595|-2ag2u.h 2pyW.W 1bA0 11X0 GN0 1Hb0 c20 imv.j 3DA0 dz0 15A0 c10 2q10 iM10 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 IM0 rU0 1cL0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|16e6", "Europe/Paris|PMT WET WEST CEST CET WEMT|-9.l 0 -10 -20 -10 -20|0121212121212121212121212121212121212121212121212123434352543434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434|-2nco8.l cNb8.l HA0 19A0 1iM0 11c0 1oo0 Wo0 1rc0 QM0 1EM0 UM0 1u00 10o0 1io0 1wo0 Rc0 1a00 1fA0 1cM0 1cM0 1io0 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Df0 Ik0 5M30 WM0 1fA0 1cM0 Vx0 hB0 1aq0 16M0 1ekn0 1cL0 1fC0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|11e6", "Europe/Riga|RMT LST EET MSK CEST CET MSD EEST|-1A.y -2A.y -20 -30 -20 -10 -40 -30|010102345454536363636363636363727272727272727272727272727272727272727272727272727272727272727272727272727272727272727272727272|-25TzA.y 11A0 1iM0 ko0 gWm0 yDXA.y 2bX0 3fE0 WM0 1fA0 1cM0 1cM0 4m0 1sLy0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 1o00 11A0 1o00 11A0 1qM0 3oo0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|64e4", "Europe/Rome|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2as10 M00 1cM0 1cM0 14o0 1o00 WM0 1qM0 17c0 1cM0 M3A0 5M20 WM0 1fA0 1cM0 16K0 1iO0 16m0 1de0 1lc0 14m0 1lc0 WO0 1qM0 GTW0 On0 1C10 Lz0 1C10 Lz0 1EN0 Lz0 1C10 Lz0 1zd0 Oo0 1C00 On0 1C10 Lz0 1zd0 On0 1C10 LA0 1C00 LA0 1zc0 Oo0 1C00 Oo0 1zc0 Oo0 1fC0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|39e5", "Europe/Samara|LMT SAMT SAMT KUYT KUYST MSD MSK EEST KUYT SAMST SAMST|-3k.k -30 -40 -40 -50 -40 -30 -30 -30 -50 -40|012343434343434343435656782929292929292929292929292929292929292a12|-22WNk.k qHak.k bcn0 1Qqo0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cN0 8o0 14j0 1cL0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qN0 WM0|12e5", "Europe/Simferopol|SMT EET MSK CEST CET MSD EEST MSK|-2g -20 -30 -20 -10 -40 -30 -40|012343432525252525252525252161616525252616161616161616161616161616161616172|-1Pc2g eUog rEn0 2qs0 WM0 1fA0 1cM0 3V0 1u0L0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1Q00 4eL0 1cL0 1cN0 1cL0 1cN0 dX0 WL0 1cN0 1cL0 1fB0 1o30 11B0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11z0 1nW0|33e4", "Europe/Sofia|EET CET CEST EEST|-20 -10 -20 -30|01212103030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030|-168L0 WM0 1fA0 1cM0 1cM0 1cN0 1mKH0 1dd0 1fb0 1ap0 1fb0 1a20 1fy0 1a30 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cK0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1nX0 11E0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5", "Europe/Stockholm|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2azC0 TB0 2yDe0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|15e5", "Europe/Tallinn|TMT CET CEST EET MSK MSD EEST|-1D -10 -20 -20 -30 -40 -30|012103421212454545454545454546363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363|-26oND teD 11A0 1Ta0 4rXl KSLD 2FX0 2Jg0 WM0 1fA0 1cM0 18J0 1sTX0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o10 11A0 1qM0 5QM0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|41e4", "Europe/Tirane|LMT CET CEST|-1j.k -10 -20|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2glBj.k 14pcj.k 5LC0 WM0 4M0 1fCK0 10n0 1op0 11z0 1pd0 11z0 1qN0 WL0 1qp0 Xb0 1qp0 Xb0 1qp0 11z0 1lB0 11z0 1qN0 11z0 1iN0 16n0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|42e4", "Europe/Uzhgorod|CET CEST MSK MSD EET EEST|-10 -20 -30 -40 -20 -30|010101023232323232323232320454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-1cqL0 6i00 WM0 1fA0 1cM0 1ml0 1Cp0 1r3W0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1Q00 1Nf0 2pw0 1cL0 1cN0 1cL0 1cN0 1cL0 1cQ0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|11e4", "Europe/Vienna|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 3KM0 14o0 LA00 6i00 WM0 1fA0 1cM0 1cM0 1cM0 400 2qM0 1a00 1cM0 1cM0 1io0 17c0 1gHa0 19X0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|18e5", "Europe/Vilnius|WMT KMT CET EET MSK CEST MSD EEST|-1o -1z.A -10 -20 -30 -20 -40 -30|012324525254646464646464646464647373737373737352537373737373737373737373737373737373737373737373737373737373737373737373|-293do 6ILM.o 1Ooz.A zz0 Mfd0 29W0 3is0 WM0 1fA0 1cM0 LV0 1tgL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11B0 1o00 11A0 1qM0 8io0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|54e4", "Europe/Volgograd|LMT TSAT STAT STAT VOLT VOLST VOLST VOLT MSD MSK MSK|-2V.E -30 -30 -40 -40 -50 -40 -30 -40 -30 -40|0123454545454545454546767489898989898989898989898989898989898989a9|-21IqV.E cLXV.E cEM0 1gqn0 Lco0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 2pz0 1cJ0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|10e5", "Europe/Warsaw|WMT CET CEST EET EEST|-1o -10 -20 -20 -30|012121234312121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2ctdo 1LXo 11d0 1iO0 11A0 1o00 11A0 1on0 11A0 6zy0 HWP0 5IM0 WM0 1fA0 1cM0 1dz0 1mL0 1en0 15B0 1aq0 1nA0 11A0 1io0 17c0 1fA0 1a00 iDX0 LA0 1cM0 1cM0 1C00 Oo0 1cM0 1cM0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1C00 LA0 uso0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|17e5", "Europe/Zaporozhye|CUT EET MSK CEST CET MSD EEST|-2k -20 -30 -20 -10 -40 -30|01234342525252525252525252526161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161|-1Pc2k eUok rdb0 2RE0 WM0 1fA0 8m0 1v9a0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cK0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cQ0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|77e4", "HST|HST|a0|0|", "Indian/Chagos|LMT IOT IOT|-4N.E -50 -60|012|-2xosN.E 3AGLN.E|30e2", "Indian/Christmas|CXT|-70|0||21e2", "Indian/Cocos|CCT|-6u|0||596", "Indian/Kerguelen|zzz TFT|0 -50|01|-MG00|130", "Indian/Mahe|LMT SCT|-3F.M -40|01|-2yO3F.M|79e3", "Indian/Maldives|MMT MVT|-4S -50|01|-olgS|35e4", "Indian/Mauritius|LMT MUT MUST|-3O -40 -50|012121|-2xorO 34unO 14L0 12kr0 11z0|15e4", "Indian/Reunion|LMT RET|-3F.Q -40|01|-2mDDF.Q|84e4", "Pacific/Kwajalein|MHT KWAT MHT|-b0 c0 -c0|012|-AX0 W9X0|14e3", "MET|MET MEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 16M0 1gMM0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00", "MST|MST|70|0|", "MST7MDT|MST MDT MWT MPT|70 60 60 60|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261r0 1nX0 11B0 1nX0 SgN0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "Pacific/Chatham|CHAST CHAST CHADT|-cf -cJ -dJ|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212|-WqAf 1adef IM0 1C00 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1qM0 14o0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1io0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00|600", "PST8PDT|PST PDT PWT PPT|80 70 70 70|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261q0 1nX0 11B0 1nX0 SgN0 8x10 iy0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "Pacific/Apia|LMT WSST SST SDT WSDT WSST|bq.U bu b0 a0 -e0 -d0|01232345454545454545454545454545454545454545454545454545454|-2nDMx.4 1yW03.4 2rRbu 1ff0 1a00 CI0 AQ0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00|37e3", "Pacific/Bougainville|PGT JST BST|-a0 -90 -b0|0102|-16Wy0 7CN0 2MQp0|18e4", "Pacific/Chuuk|CHUT|-a0|0||49e3", "Pacific/Efate|LMT VUT VUST|-bd.g -b0 -c0|0121212121212121212121|-2l9nd.g 2Szcd.g 1cL0 1oN0 10L0 1fB0 19X0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 Lz0 1Nd0 An0|66e3", "Pacific/Enderbury|PHOT PHOT PHOT|c0 b0 -d0|012|nIc0 B8n0|1", "Pacific/Fakaofo|TKT TKT|b0 -d0|01|1Gfn0|483", "Pacific/Fiji|LMT FJT FJST|-bT.I -c0 -d0|0121212121212121212121212121212121212121212121212121212121212121|-2bUzT.I 3m8NT.I LA0 1EM0 IM0 nJc0 LA0 1o00 Rc0 1wo0 Ao0 1Nc0 Ao0 1Q00 xz0 1SN0 uM0 1SM0 uM0 1VA0 s00 1VA0 uM0 1SM0 uM0 1SM0 uM0 1SM0 uM0 1VA0 s00 1VA0 s00 1VA0 uM0 1SM0 uM0 1SM0 uM0 1SM0 uM0 1VA0 s00 1VA0 uM0 1SM0 uM0 1SM0 uM0 1SM0 uM0 1VA0 s00 1VA0 s00 1VA0 uM0 1SM0 uM0 1SM0 uM0 1SM0 uM0|88e4", "Pacific/Funafuti|TVT|-c0|0||45e2", "Pacific/Galapagos|LMT ECT GALT|5W.o 50 60|012|-1yVS1.A 2dTz1.A|25e3", "Pacific/Gambier|LMT GAMT|8X.M 90|01|-2jof0.c|125", "Pacific/Guadalcanal|LMT SBT|-aD.M -b0|01|-2joyD.M|11e4", "Pacific/Guam|GST ChST|-a0 -a0|01|1fpq0|17e4", "Pacific/Honolulu|HST HDT HST|au 9u a0|010102|-1thLu 8x0 lef0 8Pz0 46p0|37e4", "Pacific/Kiritimati|LINT LINT LINT|aE a0 -e0|012|nIaE B8nk|51e2", "Pacific/Kosrae|KOST KOST|-b0 -c0|010|-AX0 1bdz0|66e2", "Pacific/Majuro|MHT MHT|-b0 -c0|01|-AX0|28e3", "Pacific/Marquesas|LMT MART|9i 9u|01|-2joeG|86e2", "Pacific/Pago_Pago|LMT NST BST SST|bm.M b0 b0 b0|0123|-2nDMB.c 2gVzB.c EyM0|37e2", "Pacific/Nauru|LMT NRT JST NRT|-b7.E -bu -90 -c0|01213|-1Xdn7.E PvzB.E 5RCu 1ouJu|10e3", "Pacific/Niue|NUT NUT NUT|bk bu b0|012|-KfME 17y0a|12e2", "Pacific/Norfolk|NMT NFT NFST NFT|-bc -bu -cu -b0|01213|-Kgbc W01G On0 1COp0|25e4", "Pacific/Noumea|LMT NCT NCST|-b5.M -b0 -c0|01212121|-2l9n5.M 2EqM5.M xX0 1PB0 yn0 HeP0 Ao0|98e3", "Pacific/Palau|PWT|-90|0||21e3", "Pacific/Pitcairn|PNT PST|8u 80|01|18Vku|56", "Pacific/Pohnpei|PONT|-b0|0||34e3", "Pacific/Port_Moresby|PGT|-a0|0||25e4", "Pacific/Rarotonga|CKT CKHST CKT|au 9u a0|012121212121212121212121212|lyWu IL0 1zcu Onu 1zcu Onu 1zcu Rbu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Rbu 1zcu Onu 1zcu Onu 1zcu Onu|13e3", "Pacific/Tahiti|LMT TAHT|9W.g a0|01|-2joe1.I|18e4", "Pacific/Tarawa|GILT|-c0|0||29e3", "Pacific/Tongatapu|TOT TOT TOST|-ck -d0 -e0|01212121|-1aB0k 2n5dk 15A0 1wo0 xz0 1Q10 xz0|75e3", "Pacific/Wake|WAKT|-c0|0||16e3", "Pacific/Wallis|WFT|-c0|0||94", "WET|WET WEST|0 -10|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|hDB0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00"],
            links: ["Africa/Abidjan|Africa/Bamako", "Africa/Abidjan|Africa/Banjul", "Africa/Abidjan|Africa/Conakry", "Africa/Abidjan|Africa/Dakar", "Africa/Abidjan|Africa/Freetown", "Africa/Abidjan|Africa/Lome", "Africa/Abidjan|Africa/Nouakchott", "Africa/Abidjan|Africa/Ouagadougou", "Africa/Abidjan|Africa/Sao_Tome", "Africa/Abidjan|Africa/Timbuktu", "Africa/Abidjan|Atlantic/St_Helena", "Africa/Cairo|Egypt", "Africa/Johannesburg|Africa/Maseru", "Africa/Johannesburg|Africa/Mbabane", "Africa/Khartoum|Africa/Juba", "Africa/Lagos|Africa/Bangui", "Africa/Lagos|Africa/Brazzaville", "Africa/Lagos|Africa/Douala", "Africa/Lagos|Africa/Kinshasa", "Africa/Lagos|Africa/Libreville", "Africa/Lagos|Africa/Luanda", "Africa/Lagos|Africa/Malabo", "Africa/Lagos|Africa/Niamey", "Africa/Lagos|Africa/Porto-Novo", "Africa/Maputo|Africa/Blantyre", "Africa/Maputo|Africa/Bujumbura", "Africa/Maputo|Africa/Gaborone", "Africa/Maputo|Africa/Harare", "Africa/Maputo|Africa/Kigali", "Africa/Maputo|Africa/Lubumbashi", "Africa/Maputo|Africa/Lusaka", "Africa/Nairobi|Africa/Addis_Ababa", "Africa/Nairobi|Africa/Asmara", "Africa/Nairobi|Africa/Asmera", "Africa/Nairobi|Africa/Dar_es_Salaam", "Africa/Nairobi|Africa/Djibouti", "Africa/Nairobi|Africa/Kampala", "Africa/Nairobi|Africa/Mogadishu", "Africa/Nairobi|Indian/Antananarivo", "Africa/Nairobi|Indian/Comoro", "Africa/Nairobi|Indian/Mayotte", "Africa/Tripoli|Libya", "America/Adak|America/Atka", "America/Adak|US/Aleutian", "America/Anchorage|US/Alaska", "America/Argentina/Buenos_Aires|America/Buenos_Aires", "America/Argentina/Catamarca|America/Argentina/ComodRivadavia", "America/Argentina/Catamarca|America/Catamarca", "America/Argentina/Cordoba|America/Cordoba", "America/Argentina/Cordoba|America/Rosario", "America/Argentina/Jujuy|America/Jujuy", "America/Argentina/Mendoza|America/Mendoza", "America/Atikokan|America/Coral_Harbour", "America/Chicago|US/Central", "America/Curacao|America/Aruba", "America/Curacao|America/Kralendijk", "America/Curacao|America/Lower_Princes", "America/Denver|America/Shiprock", "America/Denver|Navajo", "America/Denver|US/Mountain", "America/Detroit|US/Michigan", "America/Edmonton|Canada/Mountain", "America/Fort_Wayne|America/Indiana/Indianapolis", "America/Fort_Wayne|America/Indianapolis", "America/Fort_Wayne|US/East-Indiana", "America/Halifax|Canada/Atlantic", "America/Havana|Cuba", "America/Indiana/Knox|America/Knox_IN", "America/Indiana/Knox|US/Indiana-Starke", "America/Jamaica|Jamaica", "America/Kentucky/Louisville|America/Louisville", "America/Los_Angeles|US/Pacific", "America/Los_Angeles|US/Pacific-New", "America/Manaus|Brazil/West", "America/Mazatlan|Mexico/BajaSur", "America/Mexico_City|Mexico/General", "America/New_York|US/Eastern", "America/Noronha|Brazil/DeNoronha", "America/Phoenix|US/Arizona", "America/Port_of_Spain|America/Anguilla", "America/Port_of_Spain|America/Antigua", "America/Port_of_Spain|America/Dominica", "America/Port_of_Spain|America/Grenada", "America/Port_of_Spain|America/Guadeloupe", "America/Port_of_Spain|America/Marigot", "America/Port_of_Spain|America/Montserrat", "America/Port_of_Spain|America/St_Barthelemy", "America/Port_of_Spain|America/St_Kitts", "America/Port_of_Spain|America/St_Lucia", "America/Port_of_Spain|America/St_Thomas", "America/Port_of_Spain|America/St_Vincent", "America/Port_of_Spain|America/Tortola", "America/Port_of_Spain|America/Virgin", "America/Regina|Canada/East-Saskatchewan", "America/Regina|Canada/Saskatchewan", "America/Rio_Branco|America/Porto_Acre", "America/Rio_Branco|Brazil/Acre", "America/Santiago|Chile/Continental", "America/Sao_Paulo|Brazil/East", "America/St_Johns|Canada/Newfoundland", "America/Tijuana|America/Ensenada", "America/Tijuana|Mexico/BajaNorte", "America/Toronto|America/Montreal", "America/Toronto|Canada/Eastern", "America/Vancouver|Canada/Pacific", "America/Whitehorse|Canada/Yukon", "America/Winnipeg|Canada/Central", "Asia/Ashgabat|Asia/Ashkhabad", "Asia/Bangkok|Asia/Phnom_Penh", "Asia/Bangkok|Asia/Vientiane", "Asia/Dhaka|Asia/Dacca", "Asia/Dubai|Asia/Muscat", "Asia/Ho_Chi_Minh|Asia/Saigon", "Asia/Hong_Kong|Hongkong", "Asia/Jerusalem|Asia/Tel_Aviv", "Asia/Jerusalem|Israel", "Asia/Kathmandu|Asia/Katmandu", "Asia/Kolkata|Asia/Calcutta", "Asia/Macau|Asia/Macao", "Asia/Makassar|Asia/Ujung_Pandang", "Asia/Nicosia|Europe/Nicosia", "Asia/Qatar|Asia/Bahrain", "Asia/Riyadh|Asia/Aden", "Asia/Riyadh|Asia/Kuwait", "Asia/Seoul|ROK", "Asia/Shanghai|Asia/Chongqing", "Asia/Shanghai|Asia/Chungking", "Asia/Shanghai|Asia/Harbin", "Asia/Shanghai|PRC", "Asia/Singapore|Singapore", "Asia/Taipei|ROC", "Asia/Tehran|Iran", "Asia/Thimphu|Asia/Thimbu", "Asia/Tokyo|Japan", "Asia/Ulaanbaatar|Asia/Ulan_Bator", "Asia/Urumqi|Asia/Kashgar", "Atlantic/Faroe|Atlantic/Faeroe", "Atlantic/Reykjavik|Iceland", "Australia/Adelaide|Australia/South", "Australia/Brisbane|Australia/Queensland", "Australia/Broken_Hill|Australia/Yancowinna", "Australia/Darwin|Australia/North", "Australia/Hobart|Australia/Tasmania", "Australia/Lord_Howe|Australia/LHI", "Australia/Melbourne|Australia/Victoria", "Australia/Perth|Australia/West", "Australia/Sydney|Australia/ACT", "Australia/Sydney|Australia/Canberra", "Australia/Sydney|Australia/NSW", "Etc/GMT+0|Etc/GMT", "Etc/GMT+0|Etc/GMT-0", "Etc/GMT+0|Etc/GMT0", "Etc/GMT+0|Etc/Greenwich", "Etc/GMT+0|GMT", "Etc/GMT+0|GMT+0", "Etc/GMT+0|GMT-0", "Etc/GMT+0|GMT0", "Etc/GMT+0|Greenwich", "Etc/UCT|UCT", "Etc/UTC|Etc/Universal", "Etc/UTC|Etc/Zulu", "Etc/UTC|UTC", "Etc/UTC|Universal", "Etc/UTC|Zulu", "Europe/Belgrade|Europe/Ljubljana", "Europe/Belgrade|Europe/Podgorica", "Europe/Belgrade|Europe/Sarajevo", "Europe/Belgrade|Europe/Skopje", "Europe/Belgrade|Europe/Zagreb", "Europe/Chisinau|Europe/Tiraspol", "Europe/Dublin|Eire", "Europe/Helsinki|Europe/Mariehamn", "Europe/Istanbul|Asia/Istanbul", "Europe/Istanbul|Turkey", "Europe/Lisbon|Portugal", "Europe/London|Europe/Belfast", "Europe/London|Europe/Guernsey", "Europe/London|Europe/Isle_of_Man", "Europe/London|Europe/Jersey", "Europe/London|GB", "Europe/London|GB-Eire", "Europe/Moscow|W-SU", "Europe/Oslo|Arctic/Longyearbyen", "Europe/Oslo|Atlantic/Jan_Mayen", "Europe/Prague|Europe/Bratislava", "Europe/Rome|Europe/San_Marino", "Europe/Rome|Europe/Vatican", "Europe/Warsaw|Poland", "Europe/Zurich|Europe/Busingen", "Europe/Zurich|Europe/Vaduz", "Pacific/Auckland|Antarctica/McMurdo", "Pacific/Auckland|Antarctica/South_Pole", "Pacific/Auckland|NZ", "Pacific/Chatham|NZ-CHAT", "Pacific/Chuuk|Pacific/Truk", "Pacific/Chuuk|Pacific/Yap", "Pacific/Easter|Chile/EasterIsland", "Pacific/Guam|Pacific/Saipan", "Pacific/Honolulu|Pacific/Johnston", "Pacific/Honolulu|US/Hawaii", "Pacific/Kwajalein|Kwajalein", "Pacific/Pago_Pago|Pacific/Midway", "Pacific/Pago_Pago|Pacific/Samoa", "Pacific/Pago_Pago|US/Samoa", "Pacific/Pohnpei|Pacific/Ponape"]
        }), moment
    }),
    /*!
     * jQuery Cookie Plugin v1.4.1
     * https://github.com/carhartl/jquery-cookie
     *
     * Copyright 2013 Klaus Hartl
     * Released under the MIT license
     */
    function(factory) {
        "function" == typeof define && define.amd ? define(["jquery"], factory) : "object" == typeof exports ? factory(require("jquery")) : factory(jQuery)
    }(function($) {
        function encode(s) {
            return config.raw ? s : encodeURIComponent(s)
        }

        function decode(s) {
            return config.raw ? s : decodeURIComponent(s)
        }

        function stringifyCookieValue(value) {
            return encode(config.json ? JSON.stringify(value) : String(value))
        }

        function parseCookieValue(s) {
            0 === s.indexOf('"') && (s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
            try {
                return s = decodeURIComponent(s.replace(pluses, " ")), config.json ? JSON.parse(s) : s
            } catch (e) {}
        }

        function read(s, converter) {
            var value = config.raw ? s : parseCookieValue(s);
            return $.isFunction(converter) ? converter(value) : value
        }
        var pluses = /\+/g,
            config = $.cookie = function(key, value, options) {
                if (void 0 !== value && !$.isFunction(value)) {
                    if (options = $.extend({}, config.defaults, options), "number" == typeof options.expires) {
                        var days = options.expires,
                            t = options.expires = new Date;
                        t.setTime(+t + 864e5 * days)
                    }
                    return document.cookie = [encode(key), "=", stringifyCookieValue(value), options.expires ? "; expires=" + options.expires.toUTCString() : "", options.path ? "; path=" + options.path : "", options.domain ? "; domain=" + options.domain : "", options.secure ? "; secure" : ""].join("")
                }
                for (var result = key ? void 0 : {}, cookies = document.cookie ? document.cookie.split("; ") : [], i = 0, l = cookies.length; l > i; i++) {
                    var parts = cookies[i].split("="),
                        name = decode(parts.shift()),
                        cookie = parts.join("=");
                    if (key && key === name) {
                        result = read(cookie, value);
                        break
                    }
                    key || void 0 === (cookie = read(cookie)) || (result[name] = cookie)
                }
                return result
            };
        config.defaults = {}, $.removeCookie = function(key, options) {
            return void 0 === $.cookie(key) ? !1 : ($.cookie(key, "", $.extend({}, options, {
                expires: -1
            })), !$.cookie(key))
        }
    }),
    function(jQuery) {
        var daysInWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            shortMonthsInYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            longMonthsInYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            shortMonthsToNumber = [];
        shortMonthsToNumber.Jan = "01", shortMonthsToNumber.Feb = "02", shortMonthsToNumber.Mar = "03", shortMonthsToNumber.Apr = "04", shortMonthsToNumber.May = "05", shortMonthsToNumber.Jun = "06", shortMonthsToNumber.Jul = "07", shortMonthsToNumber.Aug = "08", shortMonthsToNumber.Sep = "09", shortMonthsToNumber.Oct = "10", shortMonthsToNumber.Nov = "11", shortMonthsToNumber.Dec = "12", jQuery.format = function() {
            function strDay(value) {
                return daysInWeek[parseInt(value, 10)] || value
            }

            function strMonth(value) {
                var monthArrayIndex = parseInt(value, 10) - 1;
                return shortMonthsInYear[monthArrayIndex] || value
            }

            function strLongMonth(value) {
                var monthArrayIndex = parseInt(value, 10) - 1;
                return longMonthsInYear[monthArrayIndex] || value
            }
            var parseMonth = function(value) {
                    return shortMonthsToNumber[value] || value
                },
                parseTime = function(value) {
                    var retValue = value,
                        millis = "";
                    if (-1 !== retValue.indexOf(".")) {
                        var delimited = retValue.split(".");
                        retValue = delimited[0], millis = delimited[1]
                    }
                    var values3 = retValue.split(":");
                    return 3 === values3.length ? (hour = values3[0], minute = values3[1], second = values3[2], {
                        time: retValue,
                        hour: hour,
                        minute: minute,
                        second: second,
                        millis: millis
                    }) : {
                        time: "",
                        hour: "",
                        minute: "",
                        second: "",
                        millis: ""
                    }
                };
            return {
                date: function(value, format) {
                    try {
                        var date = null,
                            year = null,
                            month = null,
                            dayOfMonth = null,
                            dayOfWeek = null,
                            time = null;
                        if ("number" == typeof value) return this.date(new Date(value), format);
                        if ("function" == typeof value.getFullYear) year = value.getFullYear(), month = value.getMonth() + 1, dayOfMonth = value.getDate(), dayOfWeek = value.getDay(), time = parseTime(value.toTimeString());
                        else if (-1 != value.search(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.?\d{0,3}[-+]?\d{2}:?\d{2}/)) {
                            var values = value.split(/[T\+-]/);
                            year = values[0], month = values[1], dayOfMonth = values[2], time = parseTime(values[3].split(".")[0]), date = new Date(year, month - 1, dayOfMonth), dayOfWeek = date.getDay()
                        } else {
                            var values = value.split(" ");
                            switch (values.length) {
                                case 6:
                                    year = values[5], month = parseMonth(values[1]), dayOfMonth = values[2], time = parseTime(values[3]), date = new Date(year, month - 1, dayOfMonth), dayOfWeek = date.getDay();
                                    break;
                                case 2:
                                    var values2 = values[0].split("-");
                                    year = values2[0], month = values2[1], dayOfMonth = values2[2], time = parseTime(values[1]), date = new Date(year, month - 1, dayOfMonth), dayOfWeek = date.getDay();
                                    break;
                                case 7:
                                case 9:
                                case 10:
                                    year = values[3], month = parseMonth(values[1]), dayOfMonth = values[2], time = parseTime(values[4]), date = new Date(year, month - 1, dayOfMonth), dayOfWeek = date.getDay();
                                    break;
                                case 1:
                                    var values2 = values[0].split("");
                                    year = values2[0] + values2[1] + values2[2] + values2[3], month = values2[5] + values2[6], dayOfMonth = values2[8] + values2[9], time = parseTime(values2[13] + values2[14] + values2[15] + values2[16] + values2[17] + values2[18] + values2[19] + values2[20]), date = new Date(year, month - 1, dayOfMonth), dayOfWeek = date.getDay();
                                    break;
                                default:
                                    return value
                            }
                        }
                        for (var pattern = "", retValue = "", unparsedRest = "", i = 0; i < format.length; i++) {
                            var currentPattern = format.charAt(i);
                            switch (pattern += currentPattern, unparsedRest = "", pattern) {
                                case "ddd":
                                    retValue += strDay(dayOfWeek), pattern = "";
                                    break;
                                case "dd":
                                    if ("d" == format.charAt(i + 1)) break;
                                    1 === String(dayOfMonth).length && (dayOfMonth = "0" + dayOfMonth), retValue += dayOfMonth, pattern = "";
                                    break;
                                case "d":
                                    if ("d" == format.charAt(i + 1)) break;
                                    retValue += parseInt(dayOfMonth, 10), pattern = "";
                                    break;
                                case "MMMM":
                                    retValue += strLongMonth(month), pattern = "";
                                    break;
                                case "MMM":
                                    if ("M" === format.charAt(i + 1)) break;
                                    retValue += strMonth(month), pattern = "";
                                    break;
                                case "MM":
                                    if ("M" == format.charAt(i + 1)) break;
                                    1 === String(month).length && (month = "0" + month), retValue += month, pattern = "";
                                    break;
                                case "M":
                                    if ("M" == format.charAt(i + 1)) break;
                                    retValue += parseInt(month, 10), pattern = "";
                                    break;
                                case "yyyy":
                                    retValue += year, pattern = "";
                                    break;
                                case "yy":
                                    if ("y" == format.charAt(i + 1) && "y" == format.charAt(i + 2)) break;
                                    retValue += String(year).slice(-2), pattern = "";
                                    break;
                                case "HH":
                                    retValue += time.hour, pattern = "";
                                    break;
                                case "hh":
                                    var hour = 0 == time.hour ? 12 : time.hour < 13 ? time.hour : time.hour - 12;
                                    hour = 1 == String(hour).length ? "0" + hour : hour, retValue += hour, pattern = "";
                                    break;
                                case "h":
                                    if ("h" == format.charAt(i + 1)) break;
                                    var hour = 0 == time.hour ? 12 : time.hour < 13 ? time.hour : time.hour - 12;
                                    retValue += parseInt(hour, 10), pattern = "";
                                    break;
                                case "mm":
                                    retValue += time.minute, pattern = "";
                                    break;
                                case "ss":
                                    retValue += time.second.substring(0, 2), pattern = "";
                                    break;
                                case "SSS":
                                    retValue += time.millis.substring(0, 3), pattern = "";
                                    break;
                                case "a":
                                    retValue += time.hour >= 12 ? "PM" : "AM", pattern = "";
                                    break;
                                case " ":
                                    retValue += currentPattern, pattern = "";
                                    break;
                                case "/":
                                    retValue += currentPattern, pattern = "";
                                    break;
                                case ":":
                                    retValue += currentPattern, pattern = "";
                                    break;
                                default:
                                    2 === pattern.length && 0 !== pattern.indexOf("y") && "SS" != pattern ? (retValue += pattern.substring(0, 1), pattern = pattern.substring(1, 2)) : 3 === pattern.length && -1 === pattern.indexOf("yyy") ? pattern = "" : unparsedRest = pattern
                            }
                        }
                        return retValue += unparsedRest
                    } catch (e) {
                        throw e
                    }
                }
            }
        }()
    }(jQuery), jQuery.format.date.defaultShortDateFormat = "dd/MM/yyyy", jQuery.format.date.defaultLongDateFormat = "dd/MM/yyyy hh:mm:ss", jQuery(document).ready(function() {
        jQuery(".shortDateFormat").each(function(idx, elem) {
            jQuery(elem).is(":input") ? jQuery(elem).val(jQuery.format.date(jQuery(elem).val(), jQuery.format.date.defaultShortDateFormat)) : jQuery(elem).text(jQuery.format.date(jQuery(elem).text(), jQuery.format.date.defaultShortDateFormat))
        }), jQuery(".longDateFormat").each(function(idx, elem) {
            jQuery(elem).is(":input") ? jQuery(elem).val(jQuery.format.date(jQuery(elem).val(), jQuery.format.date.defaultLongDateFormat)) : jQuery(elem).text(jQuery.format.date(jQuery(elem).text(), jQuery.format.date.defaultLongDateFormat))
        })
    }),
    /*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
     * Licensed under the MIT License (LICENSE.txt).
     *
     * Version: 3.1.12
     *
     * Requires: jQuery 1.2.2+
     */
    function(factory) {
        "function" == typeof define && define.amd ? define(["jquery"], factory) : "object" == typeof exports ? module.exports = factory : factory(jQuery)
    }(function($) {
        function handler(event) {
            var orgEvent = event || window.event,
                args = slice.call(arguments, 1),
                delta = 0,
                deltaX = 0,
                deltaY = 0,
                absDelta = 0,
                offsetX = 0,
                offsetY = 0;
            if (event = $.event.fix(orgEvent), event.type = "mousewheel", "detail" in orgEvent && (deltaY = -1 * orgEvent.detail), "wheelDelta" in orgEvent && (deltaY = orgEvent.wheelDelta), "wheelDeltaY" in orgEvent && (deltaY = orgEvent.wheelDeltaY), "wheelDeltaX" in orgEvent && (deltaX = -1 * orgEvent.wheelDeltaX), "axis" in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS && (deltaX = -1 * deltaY, deltaY = 0), delta = 0 === deltaY ? deltaX : deltaY, "deltaY" in orgEvent && (deltaY = -1 * orgEvent.deltaY, delta = deltaY), "deltaX" in orgEvent && (deltaX = orgEvent.deltaX, 0 === deltaY && (delta = -1 * deltaX)), 0 !== deltaY || 0 !== deltaX) {
                if (1 === orgEvent.deltaMode) {
                    var lineHeight = $.data(this, "mousewheel-line-height");
                    delta *= lineHeight, deltaY *= lineHeight, deltaX *= lineHeight
                } else if (2 === orgEvent.deltaMode) {
                    var pageHeight = $.data(this, "mousewheel-page-height");
                    delta *= pageHeight, deltaY *= pageHeight, deltaX *= pageHeight
                }
                if (absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX)), (!lowestDelta || lowestDelta > absDelta) && (lowestDelta = absDelta, shouldAdjustOldDeltas(orgEvent, absDelta) && (lowestDelta /= 40)), shouldAdjustOldDeltas(orgEvent, absDelta) && (delta /= 40, deltaX /= 40, deltaY /= 40), delta = Math[delta >= 1 ? "floor" : "ceil"](delta / lowestDelta), deltaX = Math[deltaX >= 1 ? "floor" : "ceil"](deltaX / lowestDelta), deltaY = Math[deltaY >= 1 ? "floor" : "ceil"](deltaY / lowestDelta), special.settings.normalizeOffset && this.getBoundingClientRect) {
                    var boundingRect = this.getBoundingClientRect();
                    offsetX = event.clientX - boundingRect.left, offsetY = event.clientY - boundingRect.top
                }
                return event.deltaX = deltaX, event.deltaY = deltaY, event.deltaFactor = lowestDelta, event.offsetX = offsetX, event.offsetY = offsetY, event.deltaMode = 0, args.unshift(event, delta, deltaX, deltaY), nullLowestDeltaTimeout && clearTimeout(nullLowestDeltaTimeout), nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200), ($.event.dispatch || $.event.handle).apply(this, args)
            }
        }

        function nullLowestDelta() {
            lowestDelta = null
        }

        function shouldAdjustOldDeltas(orgEvent, absDelta) {
            return special.settings.adjustOldDeltas && "mousewheel" === orgEvent.type && absDelta % 120 === 0
        }
        var nullLowestDeltaTimeout, lowestDelta, toFix = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
            toBind = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
            slice = Array.prototype.slice;
        if ($.event.fixHooks)
            for (var i = toFix.length; i;) $.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
        var special = $.event.special.mousewheel = {
            version: "3.1.12",
            setup: function() {
                if (this.addEventListener)
                    for (var i = toBind.length; i;) this.addEventListener(toBind[--i], handler, !1);
                else this.onmousewheel = handler;
                $.data(this, "mousewheel-line-height", special.getLineHeight(this)), $.data(this, "mousewheel-page-height", special.getPageHeight(this))
            },
            teardown: function() {
                if (this.removeEventListener)
                    for (var i = toBind.length; i;) this.removeEventListener(toBind[--i], handler, !1);
                else this.onmousewheel = null;
                $.removeData(this, "mousewheel-line-height"), $.removeData(this, "mousewheel-page-height")
            },
            getLineHeight: function(elem) {
                var $elem = $(elem),
                    $parent = $elem["offsetParent" in $.fn ? "offsetParent" : "parent"]();
                return $parent.length || ($parent = $("body")), parseInt($parent.css("fontSize"), 10) || parseInt($elem.css("fontSize"), 10) || 16
            },
            getPageHeight: function(elem) {
                return $(elem).height()
            },
            settings: {
                adjustOldDeltas: !0,
                normalizeOffset: !0
            }
        };
        $.fn.extend({
            mousewheel: function(fn) {
                return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel")
            },
            unmousewheel: function(fn) {
                return this.unbind("mousewheel", fn)
            }
        })
    }), "object" != typeof JSON && (JSON = {}),
    function() {
        "use strict";

        function f(n) {
            return 10 > n ? "0" + n : n
        }

        function this_value() {
            return this.valueOf()
        }

        function quote(string) {
            return rx_escapable.lastIndex = 0, rx_escapable.test(string) ? '"' + string.replace(rx_escapable, function(a) {
                var c = meta[a];
                return "string" == typeof c ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + string + '"'
        }

        function str(key, holder) {
            var i, k, v, length, partial, mind = gap,
                value = holder[key];
            switch (value && "object" == typeof value && "function" == typeof value.toJSON && (value = value.toJSON(key)), "function" == typeof rep && (value = rep.call(holder, key, value)), typeof value) {
                case "string":
                    return quote(value);
                case "number":
                    return isFinite(value) ? String(value) : "null";
                case "boolean":
                case "null":
                    return String(value);
                case "object":
                    if (!value) return "null";
                    if (gap += indent, partial = [], "[object Array]" === Object.prototype.toString.apply(value)) {
                        for (length = value.length, i = 0; length > i; i += 1) partial[i] = str(i, value) || "null";
                        return v = 0 === partial.length ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]", gap = mind, v
                    }
                    if (rep && "object" == typeof rep)
                        for (length = rep.length, i = 0; length > i; i += 1) "string" == typeof rep[i] && (k = rep[i], v = str(k, value), v && partial.push(quote(k) + (gap ? ": " : ":") + v));
                    else
                        for (k in value) Object.prototype.hasOwnProperty.call(value, k) && (v = str(k, value), v && partial.push(quote(k) + (gap ? ": " : ":") + v));
                    return v = 0 === partial.length ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}", gap = mind, v
            }
        }
        var rx_one = /^[\],:{}\s]*$/,
            rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
            rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
            rx_four = /(?:^|:|,)(?:\s*\[)+/g,
            rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        }, Boolean.prototype.toJSON = this_value, Number.prototype.toJSON = this_value, String.prototype.toJSON = this_value);
        var gap, indent, meta, rep;
        "function" != typeof JSON.stringify && (meta = {
            "\b": "\\b",
            "	": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        }, JSON.stringify = function(value, replacer, space) {
            var i;
            if (gap = "", indent = "", "number" == typeof space)
                for (i = 0; space > i; i += 1) indent += " ";
            else "string" == typeof space && (indent = space);
            if (rep = replacer, replacer && "function" != typeof replacer && ("object" != typeof replacer || "number" != typeof replacer.length)) throw new Error("JSON.stringify");
            return str("", {
                "": value
            })
        }), "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && "object" == typeof value)
                    for (k in value) Object.prototype.hasOwnProperty.call(value, k) && (v = walk(value, k), void 0 !== v ? value[k] = v : delete value[k]);
                return reviver.call(holder, key, value)
            }
            var j;
            if (text = String(text), rx_dangerous.lastIndex = 0, rx_dangerous.test(text) && (text = text.replace(rx_dangerous, function(a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                })), rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
                "": j
            }, "") : j;
            throw new SyntaxError("JSON.parse")
        })
    }(),
    /**
     * Timeago is a jQuery plugin that makes it easy to support automatically
     * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
     *
     * @name timeago
     * @version 0.11.4
     * @requires jQuery v1.2.3+
     * @author Ryan McGeary
     * @license MIT License - http://www.opensource.org/licenses/mit-license.php
     *
     * For usage and examples, visit:
     * http://timeago.yarp.com/
     *
     * Copyright (c) 2008-2012, Ryan McGeary (ryan -[at]- mcgeary [*dot*] org)
     */
    function($) {
        function refresh() {
            var data = prepareData(this);
            return isNaN(data.datetime) || $(this).text(inWords(data.datetime)), this
        }

        function prepareData(element) {
            if (element = $(element), !element.data("timeago")) {
                element.data("timeago", {
                    datetime: $t.datetime(element)
                });
                var text = $.trim(element.text());
                !(text.length > 0) || $t.isTime(element) && element.attr("title") || element.attr("title", text)
            }
            return element.data("timeago")
        }

        function inWords(date) {
            return $t.inWords(distance(date))
        }

        function distance(date) {
            return (new Date).getTime() - date.getTime()
        }
        $.timeago = function(timestamp) {
            return timestamp instanceof Date ? inWords(timestamp) : "string" == typeof timestamp ? inWords($.timeago.parse(timestamp)) : "number" == typeof timestamp ? inWords(new Date(timestamp)) : inWords($.timeago.datetime(timestamp))
        };
        var $t = $.timeago;
        $.extend($.timeago, {
            settings: {
                refreshMillis: 6e4,
                allowFuture: !1,
                strings: {
                    prefixAgo: null,
                    prefixFromNow: null,
                    suffixAgo: "ago",
                    suffixFromNow: "from now",
                    seconds: "less than a minute",
                    minute: "about a minute",
                    minutes: "%d minutes",
                    hour: "about an hour",
                    hours: "about %d hours",
                    day: "a day",
                    days: "%d days",
                    month: "about a month",
                    months: "%d months",
                    year: "about a year",
                    years: "%d years",
                    wordSeparator: " ",
                    numbers: []
                }
            },
            inWords: function(distanceMillis) {
                function substitute(stringOrFunction, number) {
                    var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction,
                        value = $l.numbers && $l.numbers[number] || number;
                    return string.replace(/%d/i, value)
                }
                var $l = this.settings.strings,
                    prefix = $l.prefixAgo,
                    suffix = $l.suffixAgo;
                this.settings.allowFuture && 0 > distanceMillis && (prefix = $l.prefixFromNow, suffix = $l.suffixFromNow);
                var seconds = Math.abs(distanceMillis) / 1e3,
                    minutes = seconds / 60,
                    hours = minutes / 60,
                    days = hours / 24,
                    years = days / 365,
                    words = 45 > seconds && substitute($l.seconds, Math.round(seconds)) || 90 > seconds && substitute($l.minute, 1) || 45 > minutes && substitute($l.minutes, Math.round(minutes)) || 90 > minutes && substitute($l.hour, 1) || 24 > hours && substitute($l.hours, Math.round(hours)) || 42 > hours && substitute($l.day, 1) || 30 > days && substitute($l.days, Math.round(days)) || 45 > days && substitute($l.month, 1) || 365 > days && substitute($l.months, Math.round(days / 30)) || 1.5 > years && substitute($l.year, 1) || substitute($l.years, Math.round(years)),
                    separator = void 0 === $l.wordSeparator ? " " : $l.wordSeparator;
                return $.trim([prefix, words, suffix].join(separator))
            },
            parse: function(iso8601) {
                var s = $.trim(iso8601);
                return s = s.replace(/\.\d+/, ""), s = s.replace(/-/, "/").replace(/-/, "/"), s = s.replace(/T/, " ").replace(/Z/, " UTC"), s = s.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"), new Date(s)
            },
            datetime: function(elem) {
                var iso8601 = $t.isTime(elem) ? $(elem).attr("datetime") : $(elem).attr("title");
                return $t.parse(iso8601)
            },
            isTime: function(elem) {
                return "time" === $(elem).get(0).tagName.toLowerCase()
            }
        }), $.fn.timeago = function() {
            var self = this;
            self.each(refresh);
            var $s = $t.settings;
            return $s.refreshMillis > 0 && setInterval(function() {
                self.each(refresh)
            }, $s.refreshMillis), self
        }, document.createElement("abbr"), document.createElement("time")
    }(jQuery),
    /*
     * ----------------------------- JSTORAGE -------------------------------------
     * Simple local storage wrapper to save data on the browser side, supporting
     * all major browsers - IE6+, Firefox2+, Safari4+, Chrome4+ and Opera 10.5+
     *
     * Author: Andris Reinman, andris.reinman@gmail.com
     * Project homepage: www.jstorage.info
     *
     * Licensed under Unlicense:
     *
     * This is free and unencumbered software released into the public domain.
     *
     * Anyone is free to copy, modify, publish, use, compile, sell, or
     * distribute this software, either in source code form or as a compiled
     * binary, for any purpose, commercial or non-commercial, and by any
     * means.
     *
     * In jurisdictions that recognize copyright laws, the author or authors
     * of this software dedicate any and all copyright interest in the
     * software to the public domain. We make this dedication for the benefit
     * of the public at large and to the detriment of our heirs and
     * successors. We intend this dedication to be an overt act of
     * relinquishment in perpetuity of all present and future rights to this
     * software under copyright law.
     *
     * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
     * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
     * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
     * IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
     * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
     * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
     * OTHER DEALINGS IN THE SOFTWARE.
     *
     * For more information, please refer to <http://unlicense.org/>
     */
    function() {
        "use strict";

        function _init() {
            var localStorageReallyWorks = !1;
            if ("localStorage" in window) try {
                window.localStorage.setItem("_tmptest", "tmpval"), localStorageReallyWorks = !0, window.localStorage.removeItem("_tmptest")
            } catch (BogusQuotaExceededErrorOnIos5) {}
            if (localStorageReallyWorks) try {
                    window.localStorage && (_storage_service = window.localStorage, _backend = "localStorage", _observer_update = _storage_service.jStorage_update)
                } catch (E3) {} else if ("globalStorage" in window) try {
                    window.globalStorage && (_storage_service = "localhost" == window.location.hostname ? window.globalStorage["localhost.localdomain"] : window.globalStorage[window.location.hostname], _backend = "globalStorage", _observer_update = _storage_service.jStorage_update)
                } catch (E4) {} else {
                    if (_storage_elm = document.createElement("link"), !_storage_elm.addBehavior) return _storage_elm = null, void 0;
                    _storage_elm.style.behavior = "url(#default#userData)", document.getElementsByTagName("head")[0].appendChild(_storage_elm);
                    try {
                        _storage_elm.load("jStorage")
                    } catch (E) {
                        _storage_elm.setAttribute("jStorage", "{}"), _storage_elm.save("jStorage"), _storage_elm.load("jStorage")
                    }
                    var data = "{}";
                    try {
                        data = _storage_elm.getAttribute("jStorage")
                    } catch (E5) {}
                    try {
                        _observer_update = _storage_elm.getAttribute("jStorage_update")
                    } catch (E6) {}
                    _storage_service.jStorage = data, _backend = "userDataBehavior"
                }
                _load_storage(), _handleTTL(), _setupObserver(), _handlePubSub(), "addEventListener" in window && window.addEventListener("pageshow", function(event) {
                event.persisted && _storageObserver()
            }, !1)
        }

        function _reloadData() {
            var data = "{}";
            if ("userDataBehavior" == _backend) {
                _storage_elm.load("jStorage");
                try {
                    data = _storage_elm.getAttribute("jStorage")
                } catch (E5) {}
                try {
                    _observer_update = _storage_elm.getAttribute("jStorage_update")
                } catch (E6) {}
                _storage_service.jStorage = data
            }
            _load_storage(), _handleTTL(), _handlePubSub()
        }

        function _setupObserver() {
            "localStorage" == _backend || "globalStorage" == _backend ? "addEventListener" in window ? window.addEventListener("storage", _storageObserver, !1) : document.attachEvent("onstorage", _storageObserver) : "userDataBehavior" == _backend && setInterval(_storageObserver, 1e3)
        }

        function _storageObserver() {
            var updateTime;
            clearTimeout(_observer_timeout), _observer_timeout = setTimeout(function() {
                if ("localStorage" == _backend || "globalStorage" == _backend) updateTime = _storage_service.jStorage_update;
                else if ("userDataBehavior" == _backend) {
                    _storage_elm.load("jStorage");
                    try {
                        updateTime = _storage_elm.getAttribute("jStorage_update")
                    } catch (E5) {}
                }
                updateTime && updateTime != _observer_update && (_observer_update = updateTime, _checkUpdatedKeys())
            }, 25)
        }

        function _checkUpdatedKeys() {
            var newCrc32List, oldCrc32List = JSON.parse(JSON.stringify(_storage.__jstorage_meta.CRC32));
            _reloadData(), newCrc32List = JSON.parse(JSON.stringify(_storage.__jstorage_meta.CRC32));
            var key, updated = [],
                removed = [];
            for (key in oldCrc32List)
                if (oldCrc32List.hasOwnProperty(key)) {
                    if (!newCrc32List[key]) {
                        removed.push(key);
                        continue
                    }
                    oldCrc32List[key] != newCrc32List[key] && "2." == String(oldCrc32List[key]).substr(0, 2) && updated.push(key)
                }
            for (key in newCrc32List) newCrc32List.hasOwnProperty(key) && (oldCrc32List[key] || updated.push(key));
            _fireObservers(updated, "updated"), _fireObservers(removed, "deleted")
        }

        function _fireObservers(keys, action) {
            keys = [].concat(keys || []);
            var i, j, len, jlen;
            if ("flushed" == action) {
                keys = [];
                for (var key in _observers) _observers.hasOwnProperty(key) && keys.push(key);
                action = "deleted"
            }
            for (i = 0, len = keys.length; len > i; i++) {
                if (_observers[keys[i]])
                    for (j = 0, jlen = _observers[keys[i]].length; jlen > j; j++) _observers[keys[i]][j](keys[i], action);
                if (_observers["*"])
                    for (j = 0, jlen = _observers["*"].length; jlen > j; j++) _observers["*"][j](keys[i], action)
            }
        }

        function _publishChange() {
            var updateTime = (+new Date).toString();
            if ("localStorage" == _backend || "globalStorage" == _backend) try {
                _storage_service.jStorage_update = updateTime
            } catch (E8) {
                _backend = !1
            } else "userDataBehavior" == _backend && (_storage_elm.setAttribute("jStorage_update", updateTime), _storage_elm.save("jStorage"));
            _storageObserver()
        }

        function _load_storage() {
            if (_storage_service.jStorage) try {
                _storage = JSON.parse(String(_storage_service.jStorage))
            } catch (E6) {
                _storage_service.jStorage = "{}"
            } else _storage_service.jStorage = "{}";
            _storage_size = _storage_service.jStorage ? String(_storage_service.jStorage).length : 0, _storage.__jstorage_meta || (_storage.__jstorage_meta = {}), _storage.__jstorage_meta.CRC32 || (_storage.__jstorage_meta.CRC32 = {})
        }

        function _save() {
            _dropOldEvents();
            try {
                _storage_service.jStorage = JSON.stringify(_storage), _storage_elm && (_storage_elm.setAttribute("jStorage", _storage_service.jStorage), _storage_elm.save("jStorage")), _storage_size = _storage_service.jStorage ? String(_storage_service.jStorage).length : 0
            } catch (E7) {}
        }

        function _checkKey(key) {
            if ("string" != typeof key && "number" != typeof key) throw new TypeError("Key name must be string or numeric");
            if ("__jstorage_meta" == key) throw new TypeError("Reserved key name");
            return !0
        }

        function _handleTTL() {
            var curtime, i, TTL, CRC32, nextExpire = 1 / 0,
                changed = !1,
                deleted = [];
            if (clearTimeout(_ttl_timeout), _storage.__jstorage_meta && "object" == typeof _storage.__jstorage_meta.TTL) {
                curtime = +new Date, TTL = _storage.__jstorage_meta.TTL, CRC32 = _storage.__jstorage_meta.CRC32;
                for (i in TTL) TTL.hasOwnProperty(i) && (TTL[i] <= curtime ? (delete TTL[i], delete CRC32[i], delete _storage[i], changed = !0, deleted.push(i)) : TTL[i] < nextExpire && (nextExpire = TTL[i]));
                1 / 0 != nextExpire && (_ttl_timeout = setTimeout(_handleTTL, Math.min(nextExpire - curtime, 2147483647))), changed && (_save(), _publishChange(), _fireObservers(deleted, "deleted"))
            }
        }

        function _handlePubSub() {
            var i, len;
            if (_storage.__jstorage_meta.PubSub) {
                var pubelm, _pubsubCurrent = _pubsub_last,
                    needFired = [];
                for (i = len = _storage.__jstorage_meta.PubSub.length - 1; i >= 0; i--) pubelm = _storage.__jstorage_meta.PubSub[i], pubelm[0] > _pubsub_last && (_pubsubCurrent = pubelm[0], needFired.unshift(pubelm));
                for (i = needFired.length - 1; i >= 0; i--) _fireSubscribers(needFired[i][1], needFired[i][2]);
                _pubsub_last = _pubsubCurrent
            }
        }

        function _fireSubscribers(channel, payload) {
            if (_pubsub_observers[channel])
                for (var i = 0, len = _pubsub_observers[channel].length; len > i; i++) try {
                    _pubsub_observers[channel][i](channel, JSON.parse(JSON.stringify(payload)))
                } catch (E) {}
        }

        function _dropOldEvents() {
            if (_storage.__jstorage_meta.PubSub) {
                for (var retire = +new Date - 2e3, i = 0, len = _storage.__jstorage_meta.PubSub.length; len > i; i++)
                    if (_storage.__jstorage_meta.PubSub[i][0] <= retire) {
                        _storage.__jstorage_meta.PubSub.splice(i, _storage.__jstorage_meta.PubSub.length - i);
                        break
                    }
                _storage.__jstorage_meta.PubSub.length || delete _storage.__jstorage_meta.PubSub
            }
        }

        function _publish(channel, payload) {
            _storage.__jstorage_meta || (_storage.__jstorage_meta = {}), _storage.__jstorage_meta.PubSub || (_storage.__jstorage_meta.PubSub = []), _storage.__jstorage_meta.PubSub.unshift([+new Date, channel, payload]), _save(), _publishChange()
        }

        function murmurhash2_32_gc(str, seed) {
            for (var k, l = str.length, h = seed ^ l, i = 0; l >= 4;) k = 255 & str.charCodeAt(i) | (255 & str.charCodeAt(++i)) << 8 | (255 & str.charCodeAt(++i)) << 16 | (255 & str.charCodeAt(++i)) << 24, k = 1540483477 * (65535 & k) + ((1540483477 * (k >>> 16) & 65535) << 16), k ^= k >>> 24, k = 1540483477 * (65535 & k) + ((1540483477 * (k >>> 16) & 65535) << 16), h = 1540483477 * (65535 & h) + ((1540483477 * (h >>> 16) & 65535) << 16) ^ k, l -= 4, ++i;
            switch (l) {
                case 3:
                    h ^= (255 & str.charCodeAt(i + 2)) << 16;
                case 2:
                    h ^= (255 & str.charCodeAt(i + 1)) << 8;
                case 1:
                    h ^= 255 & str.charCodeAt(i), h = 1540483477 * (65535 & h) + ((1540483477 * (h >>> 16) & 65535) << 16)
            }
            return h ^= h >>> 13, h = 1540483477 * (65535 & h) + ((1540483477 * (h >>> 16) & 65535) << 16), h ^= h >>> 15, h >>> 0
        }
        var JSTORAGE_VERSION = "0.4.12",
            $ = window.jQuery || window.$ || (window.$ = {}),
            JSON = {
                parse: window.JSON && (window.JSON.parse || window.JSON.decode) || String.prototype.evalJSON && function(str) {
                    return String(str).evalJSON()
                } || $.parseJSON || $.evalJSON,
                stringify: Object.toJSON || window.JSON && (window.JSON.stringify || window.JSON.encode) || $.toJSON
            };
        if ("function" != typeof JSON.parse || "function" != typeof JSON.stringify) throw new Error("No JSON support found, include //cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js to page");
        var _ttl_timeout, _storage = {
                __jstorage_meta: {
                    CRC32: {}
                }
            },
            _storage_service = {
                jStorage: "{}"
            },
            _storage_elm = null,
            _storage_size = 0,
            _backend = !1,
            _observers = {},
            _observer_timeout = !1,
            _observer_update = 0,
            _pubsub_observers = {},
            _pubsub_last = +new Date,
            _XMLService = {
                isXML: function(elm) {
                    var documentElement = (elm ? elm.ownerDocument || elm : 0).documentElement;
                    return documentElement ? "HTML" !== documentElement.nodeName : !1
                },
                encode: function(xmlNode) {
                    if (!this.isXML(xmlNode)) return !1;
                    try {
                        return (new XMLSerializer).serializeToString(xmlNode)
                    } catch (E1) {
                        try {
                            return xmlNode.xml
                        } catch (E2) {}
                    }
                    return !1
                },
                decode: function(xmlString) {
                    var resultXML, dom_parser = "DOMParser" in window && (new DOMParser).parseFromString || window.ActiveXObject && function(_xmlString) {
                        var xml_doc = new ActiveXObject("Microsoft.XMLDOM");
                        return xml_doc.async = "false", xml_doc.loadXML(_xmlString), xml_doc
                    };
                    return dom_parser ? (resultXML = dom_parser.call("DOMParser" in window && new DOMParser || window, xmlString, "text/xml"), this.isXML(resultXML) ? resultXML : !1) : !1
                }
            };
        $.jStorage = {
            version: JSTORAGE_VERSION,
            set: function(key, value, options) {
                if (_checkKey(key), options = options || {}, "undefined" == typeof value) return this.deleteKey(key), value;
                if (_XMLService.isXML(value)) value = {
                    _is_xml: !0,
                    xml: _XMLService.encode(value)
                };
                else {
                    if ("function" == typeof value) return void 0;
                    value && "object" == typeof value && (value = JSON.parse(JSON.stringify(value)))
                }
                return _storage[key] = value, _storage.__jstorage_meta.CRC32[key] = "2." + murmurhash2_32_gc(JSON.stringify(value), 2538058380), this.setTTL(key, options.TTL || 0), _fireObservers(key, "updated"), value
            },
            get: function(key, def) {
                return _checkKey(key), key in _storage ? _storage[key] && "object" == typeof _storage[key] && _storage[key]._is_xml ? _XMLService.decode(_storage[key].xml) : _storage[key] : "undefined" == typeof def ? null : def
            },
            deleteKey: function(key) {
                return _checkKey(key), key in _storage ? (delete _storage[key], "object" == typeof _storage.__jstorage_meta.TTL && key in _storage.__jstorage_meta.TTL && delete _storage.__jstorage_meta.TTL[key], delete _storage.__jstorage_meta.CRC32[key], _save(), _publishChange(), _fireObservers(key, "deleted"), !0) : !1
            },
            setTTL: function(key, ttl) {
                var curtime = +new Date;
                return _checkKey(key), ttl = Number(ttl) || 0, key in _storage ? (_storage.__jstorage_meta.TTL || (_storage.__jstorage_meta.TTL = {}), ttl > 0 ? _storage.__jstorage_meta.TTL[key] = curtime + ttl : delete _storage.__jstorage_meta.TTL[key], _save(), _handleTTL(), _publishChange(), !0) : !1
            },
            getTTL: function(key) {
                var ttl, curtime = +new Date;
                return _checkKey(key), key in _storage && _storage.__jstorage_meta.TTL && _storage.__jstorage_meta.TTL[key] ? (ttl = _storage.__jstorage_meta.TTL[key] - curtime, ttl || 0) : 0
            },
            flush: function() {
                return _storage = {
                    __jstorage_meta: {
                        CRC32: {}
                    }
                }, _save(), _publishChange(), _fireObservers(null, "flushed"), !0
            },
            storageObj: function() {
                function F() {}
                return F.prototype = _storage, new F
            },
            index: function() {
                var i, index = [];
                for (i in _storage) _storage.hasOwnProperty(i) && "__jstorage_meta" != i && index.push(i);
                return index
            },
            storageSize: function() {
                return _storage_size
            },
            currentBackend: function() {
                return _backend
            },
            storageAvailable: function() {
                return !!_backend
            },
            listenKeyChange: function(key, callback) {
                _checkKey(key), _observers[key] || (_observers[key] = []), _observers[key].push(callback)
            },
            stopListening: function(key, callback) {
                if (_checkKey(key), _observers[key]) {
                    if (!callback) return delete _observers[key], void 0;
                    for (var i = _observers[key].length - 1; i >= 0; i--) _observers[key][i] == callback && _observers[key].splice(i, 1)
                }
            },
            subscribe: function(channel, callback) {
                if (channel = (channel || "").toString(), !channel) throw new TypeError("Channel not defined");
                _pubsub_observers[channel] || (_pubsub_observers[channel] = []), _pubsub_observers[channel].push(callback)
            },
            publish: function(channel, payload) {
                if (channel = (channel || "").toString(), !channel) throw new TypeError("Channel not defined");
                _publish(channel, payload)
            },
            reInit: function() {
                _reloadData()
            },
            noConflict: function(saveInGlobal) {
                return delete window.$.jStorage, saveInGlobal && (window.jStorage = this), this
            }
        }, _init()
    }(),
    function($) {
        "use strict";
        $.ajaxPrefilter(function(options) {
            return options.iframe ? (options.originalURL = options.url, "iframe") : void 0
        }), $.ajaxTransport("iframe", function(options, origOptions) {
            function cleanUp() {
                markers.prop("disabled", !1), form.remove(), iframe.one("load", function() {
                    iframe.remove()
                }), iframe.attr("src", "javascript:false;")
            }
            var form = null,
                iframe = null,
                name = "iframe-" + $.now(),
                files = $(options.files).filter(":file:enabled"),
                markers = null,
                accepts = null;
            return options.dataTypes.shift(), options.data = origOptions.data, files.length ? (form = $("<form enctype='multipart/form-data' method='post'></form>").hide().attr({
                action: options.originalURL,
                target: name
            }), $('<input type="hidden" name="' + $("meta[name=csrf-param]").attr("content") + '" value="' + $("meta[name=csrf-token]").attr("content") + '" >').appendTo(form), "string" == typeof options.data && options.data.length > 0 && $.error("data must not be serialized"), $.each(options.data || {}, function(name, value) {
                $.isPlainObject(value) && (name = value.name, value = value.value), $("<input type='hidden' />").attr({
                    name: name,
                    value: value
                }).appendTo(form)
            }), $("<input type='hidden' value='IFrame' name='X-Requested-With' />").appendTo(form), accepts = options.dataTypes[0] && options.accepts[options.dataTypes[0]] ? options.accepts[options.dataTypes[0]] + ("*" !== options.dataTypes[0] ? ", */*; q=0.01" : "") : options.accepts["*"], $("<input type='hidden' name='X-HTTP-Accept'>").attr("value", accepts).appendTo(form), markers = files.after(function() {
                return $(this).clone().prop("disabled", !0)
            }).next(), files.appendTo(form), {
                send: function(headers, completeCallback) {
                    iframe = $("<iframe src='javascript:false;' name='" + name + "' id='" + name + "' style='display:none'></iframe>"), iframe.one("load", function() {
                        iframe.one("load", function() {
                            var doc = this.contentWindow ? this.contentWindow.document : this.contentDocument ? this.contentDocument : this.document,
                                root = doc.documentElement ? doc.documentElement : doc.body,
                                textarea = root.getElementsByTagName("textarea")[0],
                                type = textarea && textarea.getAttribute("data-type") || null,
                                status = textarea && textarea.getAttribute("data-status") || 200,
                                statusText = textarea && textarea.getAttribute("data-statusText") || "OK",
                                content = {
                                    html: root.innerHTML,
                                    text: type ? textarea.value : root ? root.textContent || root.innerText : null
                                };
                            cleanUp(), completeCallback(status, statusText, content, type ? "Content-Type: " + type : null)
                        }), form[0].submit()
                    }), $("body").append(form, iframe)
                },
                abort: function() {
                    null !== iframe && (iframe.unbind("load").attr("src", "javascript:false;"), cleanUp())
                }
            }) : void 0
        })
    }(jQuery),
    function() {
        var initializing = !1;
        window.JQClass = function() {}, JQClass.classes = {}, JQClass.extend = function extender(prop) {
            function JQClass() {
                !initializing && this._init && this._init.apply(this, arguments)
            }
            var base = this.prototype;
            initializing = !0;
            var prototype = new this;
            initializing = !1;
            for (var name in prop) prototype[name] = "function" == typeof prop[name] && "function" == typeof base[name] ? function(name, fn) {
                return function() {
                    var __super = this._super;
                    this._super = function(args) {
                        return base[name].apply(this, args)
                    };
                    var ret = fn.apply(this, arguments);
                    return this._super = __super, ret
                }
            }(name, prop[name]) : prop[name];
            return JQClass.prototype = prototype, JQClass.prototype.constructor = JQClass, JQClass.extend = extender, JQClass
        }
    }(),
    function($) {
        function camelCase(name) {
            return name.replace(/-([a-z])/g, function(match, group) {
                return group.toUpperCase()
            })
        }
        JQClass.classes.JQPlugin = JQClass.extend({
            name: "plugin",
            defaultOptions: {},
            regionalOptions: {},
            _getters: [],
            _getMarker: function() {
                return "is-" + this.name
            },
            _init: function() {
                $.extend(this.defaultOptions, this.regionalOptions && this.regionalOptions[""] || {});
                var jqName = camelCase(this.name);
                $[jqName] = this, $.fn[jqName] = function(options) {
                    var otherArgs = Array.prototype.slice.call(arguments, 1);
                    return $[jqName]._isNotChained(options, otherArgs) ? $[jqName][options].apply($[jqName], [this[0]].concat(otherArgs)) : this.each(function() {
                        if ("string" == typeof options) {
                            if ("_" === options[0] || !$[jqName][options]) throw "Unknown method: " + options;
                            $[jqName][options].apply($[jqName], [this].concat(otherArgs))
                        } else $[jqName]._attach(this, options)
                    })
                }
            },
            setDefaults: function(options) {
                $.extend(this.defaultOptions, options || {})
            },
            _isNotChained: function(name, otherArgs) {
                return "option" === name && (0 === otherArgs.length || 1 === otherArgs.length && "string" == typeof otherArgs[0]) ? !0 : $.inArray(name, this._getters) > -1
            },
            _attach: function(elem, options) {
                if (elem = $(elem), !elem.hasClass(this._getMarker())) {
                    elem.addClass(this._getMarker()), options = $.extend({}, this.defaultOptions, this._getMetadata(elem), options || {});
                    var inst = $.extend({
                        name: this.name,
                        elem: elem,
                        options: options
                    }, this._instSettings(elem, options));
                    elem.data(this.name, inst), this._postAttach(elem, inst), this.option(elem, options)
                }
            },
            _instSettings: function() {
                return {}
            },
            _postAttach: function() {},
            _getMetadata: function(elem) {
                try {
                    var data = elem.data(this.name.toLowerCase()) || "";
                    data = data.replace(/'/g, '"'), data = data.replace(/([a-zA-Z0-9]+):/g, function(match, group, i) {
                        var count = data.substring(0, i).match(/"/g);
                        return count && count.length % 2 !== 0 ? group + ":" : '"' + group + '":'
                    }), data = $.parseJSON("{" + data + "}");
                    for (var name in data) {
                        var value = data[name];
                        "string" == typeof value && value.match(/^new Date\((.*)\)$/) && (data[name] = eval(value))
                    }
                    return data
                } catch (e) {
                    return {}
                }
            },
            _getInst: function(elem) {
                return $(elem).data(this.name) || {}
            },
            option: function(elem, name, value) {
                elem = $(elem);
                var inst = elem.data(this.name);
                if (!name || "string" == typeof name && null == value) {
                    var options = (inst || {}).options;
                    return options && name ? options[name] : options
                }
                if (elem.hasClass(this._getMarker())) {
                    var options = name || {};
                    "string" == typeof name && (options = {}, options[name] = value), this._optionsChanged(elem, inst, options), $.extend(inst.options, options)
                }
            },
            _optionsChanged: function() {},
            destroy: function(elem) {
                elem = $(elem), elem.hasClass(this._getMarker()) && (this._preDestroy(elem, this._getInst(elem)), elem.removeData(this.name).removeClass(this._getMarker()))
            },
            _preDestroy: function() {}
        }), $.JQPlugin = {
            createPlugin: function(superClass, overrides) {
                "object" == typeof superClass && (overrides = superClass, superClass = "JQPlugin"), superClass = camelCase(superClass);
                var className = camelCase(overrides.name);
                JQClass.classes[className] = JQClass.classes[superClass].extend(overrides), new JQClass.classes[className]
            }
        }
    }(jQuery),
    function($) {
        var pluginName = "countdown",
            Y = 0,
            O = 1,
            W = 2,
            D = 3,
            H = 4,
            M = 5,
            S = 6;
        $.JQPlugin.createPlugin({
            name: pluginName,
            defaultOptions: {
                until: null,
                since: null,
                timezone: null,
                serverSync: null,
                format: "dHMS",
                layout: "",
                compact: !1,
                padZeroes: !1,
                significant: 0,
                description: "",
                expiryUrl: "",
                expiryText: "",
                alwaysExpire: !1,
                onExpiry: null,
                onTick: null,
                tickInterval: 1
            },
            regionalOptions: {
                "": {
                    labels: ["Years", "Months", "Weeks", "Days", "Hours", "Minutes", "Seconds"],
                    labels1: ["Year", "Month", "Week", "Day", "Hour", "Minute", "Second"],
                    compactLabels: ["y", "m", "w", "d"],
                    whichLabels: null,
                    digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
                    timeSeparator: ":",
                    isRTL: !1
                }
            },
            _getters: ["getTimes"],
            _rtlClass: pluginName + "-rtl",
            _sectionClass: pluginName + "-section",
            _amountClass: pluginName + "-amount",
            _periodClass: pluginName + "-period",
            _rowClass: pluginName + "-row",
            _holdingClass: pluginName + "-holding",
            _showClass: pluginName + "-show",
            _descrClass: pluginName + "-descr",
            _timerElems: [],
            _init: function() {
                function timerCallBack(timestamp) {
                    var drawStart = 1e12 > timestamp ? perfAvail ? performance.now() + performance.timing.navigationStart : now() : timestamp || now();
                    drawStart - animationStartTime >= 1e3 && (self._updateElems(), animationStartTime = drawStart), requestAnimationFrame(timerCallBack)
                }
                var self = this;
                this._super(), this._serverSyncs = [];
                var now = "function" == typeof Date.now ? Date.now : function() {
                        return (new Date).getTime()
                    },
                    perfAvail = window.performance && "function" == typeof window.performance.now,
                    requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || null,
                    animationStartTime = 0;
                !requestAnimationFrame || $.noRequestAnimationFrame ? ($.noRequestAnimationFrame = null, setInterval(function() {
                    self._updateElems()
                }, 980)) : (animationStartTime = window.animationStartTime || window.webkitAnimationStartTime || window.mozAnimationStartTime || window.oAnimationStartTime || window.msAnimationStartTime || now(), requestAnimationFrame(timerCallBack))
            },
            UTCDate: function(tz, year, month, day, hours, mins, secs, ms) {
                "object" == typeof year && year.constructor == Date && (ms = year.getMilliseconds(), secs = year.getSeconds(), mins = year.getMinutes(), hours = year.getHours(), day = year.getDate(), month = year.getMonth(), year = year.getFullYear());
                var d = new Date;
                return d.setUTCFullYear(year), d.setUTCDate(1), d.setUTCMonth(month || 0), d.setUTCDate(day || 1), d.setUTCHours(hours || 0), d.setUTCMinutes((mins || 0) - (Math.abs(tz) < 30 ? 60 * tz : tz)), d.setUTCSeconds(secs || 0), d.setUTCMilliseconds(ms || 0), d
            },
            periodsToSeconds: function(periods) {
                return 31557600 * periods[0] + 2629800 * periods[1] + 604800 * periods[2] + 86400 * periods[3] + 3600 * periods[4] + 60 * periods[5] + periods[6]
            },
            _instSettings: function() {
                return {
                    _periods: [0, 0, 0, 0, 0, 0, 0]
                }
            },
            _addElem: function(elem) {
                this._hasElem(elem) || this._timerElems.push(elem)
            },
            _hasElem: function(elem) {
                return $.inArray(elem, this._timerElems) > -1
            },
            _removeElem: function(elem) {
                this._timerElems = $.map(this._timerElems, function(value) {
                    return value == elem ? null : value
                })
            },
            _updateElems: function() {
                for (var i = this._timerElems.length - 1; i >= 0; i--) this._updateCountdown(this._timerElems[i])
            },
            _optionsChanged: function(elem, inst, options) {
                options.layout && (options.layout = options.layout.replace(/&lt;/g, "<").replace(/&gt;/g, ">")), this._resetExtraLabels(inst.options, options);
                var timezoneChanged = inst.options.timezone != options.timezone;
                $.extend(inst.options, options), this._adjustSettings(elem, inst, null != options.until || null != options.since || timezoneChanged);
                var now = new Date;
                (inst._since && inst._since < now || inst._until && inst._until > now) && this._addElem(elem[0]), this._updateCountdown(elem, inst)
            },
            _updateCountdown: function(elem, inst) {
                if (elem = elem.jquery ? elem : $(elem), inst = inst || elem.data(this.name)) {
                    if (elem.html(this._generateHTML(inst)).toggleClass(this._rtlClass, inst.options.isRTL), $.isFunction(inst.options.onTick)) {
                        var periods = "lap" != inst._hold ? inst._periods : this._calculatePeriods(inst, inst._show, inst.options.significant, new Date);
                        (1 == inst.options.tickInterval || this.periodsToSeconds(periods) % inst.options.tickInterval == 0) && inst.options.onTick.apply(elem[0], [periods])
                    }
                    var expired = "pause" != inst._hold && (inst._since ? inst._now.getTime() < inst._since.getTime() : inst._now.getTime() >= inst._until.getTime());
                    if (expired && !inst._expiring) {
                        if (inst._expiring = !0, this._hasElem(elem[0]) || inst.options.alwaysExpire) {
                            if (this._removeElem(elem[0]), $.isFunction(inst.options.onExpiry) && inst.options.onExpiry.apply(elem[0], []), inst.options.expiryText) {
                                var layout = inst.options.layout;
                                inst.options.layout = inst.options.expiryText, this._updateCountdown(elem[0], inst), inst.options.layout = layout
                            }
                            inst.options.expiryUrl && (window.location = inst.options.expiryUrl)
                        }
                        inst._expiring = !1
                    } else "pause" == inst._hold && this._removeElem(elem[0])
                }
            },
            _resetExtraLabels: function(base, options) {
                var changingLabels = !1;
                for (var n in options)
                    if ("whichLabels" != n && n.match(/[Ll]abels/)) {
                        changingLabels = !0;
                        break
                    }
                if (changingLabels)
                    for (var n in base) n.match(/[Ll]abels[02-9]|compactLabels1/) && (base[n] = null)
            },
            _adjustSettings: function(elem, inst, recalc) {
                for (var now, serverOffset = 0, serverEntry = null, i = 0; i < this._serverSyncs.length; i++)
                    if (this._serverSyncs[i][0] == inst.options.serverSync) {
                        serverEntry = this._serverSyncs[i][1];
                        break
                    }
                if (null != serverEntry) serverOffset = inst.options.serverSync ? serverEntry : 0, now = new Date;
                else {
                    var serverResult = $.isFunction(inst.options.serverSync) ? inst.options.serverSync.apply(elem[0], []) : null;
                    now = new Date, serverOffset = serverResult ? now.getTime() - serverResult.getTime() : 0, this._serverSyncs.push([inst.options.serverSync, serverOffset])
                }
                var timezone = inst.options.timezone;
                timezone = null == timezone ? -now.getTimezoneOffset() : timezone, (recalc || !recalc && null == inst._until && null == inst._since) && (inst._since = inst.options.since, null != inst._since && (inst._since = this.UTCDate(timezone, this._determineTime(inst._since, null)), inst._since && serverOffset && inst._since.setMilliseconds(inst._since.getMilliseconds() + serverOffset)), inst._until = this.UTCDate(timezone, this._determineTime(inst.options.until, now)), serverOffset && inst._until.setMilliseconds(inst._until.getMilliseconds() + serverOffset)), inst._show = this._determineShow(inst)
            },
            _preDestroy: function(elem) {
                this._removeElem(elem[0]), elem.empty()
            },
            pause: function(elem) {
                this._hold(elem, "pause")
            },
            lap: function(elem) {
                this._hold(elem, "lap")
            },
            resume: function(elem) {
                this._hold(elem, null)
            },
            toggle: function(elem) {
                var inst = $.data(elem, this.name) || {};
                this[inst._hold ? "resume" : "pause"](elem)
            },
            toggleLap: function(elem) {
                var inst = $.data(elem, this.name) || {};
                this[inst._hold ? "resume" : "lap"](elem)
            },
            _hold: function(elem, hold) {
                var inst = $.data(elem, this.name);
                if (inst) {
                    if ("pause" == inst._hold && !hold) {
                        inst._periods = inst._savePeriods;
                        var sign = inst._since ? "-" : "+";
                        inst[inst._since ? "_since" : "_until"] = this._determineTime(sign + inst._periods[0] + "y" + sign + inst._periods[1] + "o" + sign + inst._periods[2] + "w" + sign + inst._periods[3] + "d" + sign + inst._periods[4] + "h" + sign + inst._periods[5] + "m" + sign + inst._periods[6] + "s"), this._addElem(elem)
                    }
                    inst._hold = hold, inst._savePeriods = "pause" == hold ? inst._periods : null, $.data(elem, this.name, inst), this._updateCountdown(elem, inst)
                }
            },
            getTimes: function(elem) {
                var inst = $.data(elem, this.name);
                return inst ? "pause" == inst._hold ? inst._savePeriods : inst._hold ? this._calculatePeriods(inst, inst._show, inst.options.significant, new Date) : inst._periods : null
            },
            _determineTime: function(setting, defaultTime) {
                var self = this,
                    offsetNumeric = function(offset) {
                        var time = new Date;
                        return time.setTime(time.getTime() + 1e3 * offset), time
                    },
                    offsetString = function(offset) {
                        offset = offset.toLowerCase();
                        for (var time = new Date, year = time.getFullYear(), month = time.getMonth(), day = time.getDate(), hour = time.getHours(), minute = time.getMinutes(), second = time.getSeconds(), pattern = /([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g, matches = pattern.exec(offset); matches;) {
                            switch (matches[2] || "s") {
                                case "s":
                                    second += parseInt(matches[1], 10);
                                    break;
                                case "m":
                                    minute += parseInt(matches[1], 10);
                                    break;
                                case "h":
                                    hour += parseInt(matches[1], 10);
                                    break;
                                case "d":
                                    day += parseInt(matches[1], 10);
                                    break;
                                case "w":
                                    day += 7 * parseInt(matches[1], 10);
                                    break;
                                case "o":
                                    month += parseInt(matches[1], 10), day = Math.min(day, self._getDaysInMonth(year, month));
                                    break;
                                case "y":
                                    year += parseInt(matches[1], 10), day = Math.min(day, self._getDaysInMonth(year, month))
                            }
                            matches = pattern.exec(offset)
                        }
                        return new Date(year, month, day, hour, minute, second, 0)
                    },
                    time = null == setting ? defaultTime : "string" == typeof setting ? offsetString(setting) : "number" == typeof setting ? offsetNumeric(setting) : setting;
                return time && time.setMilliseconds(0), time
            },
            _getDaysInMonth: function(year, month) {
                return 32 - new Date(year, month, 32).getDate()
            },
            _normalLabels: function(num) {
                return num
            },
            _generateHTML: function(inst) {
                var self = this;
                inst._periods = inst._hold ? inst._periods : this._calculatePeriods(inst, inst._show, inst.options.significant, new Date);
                for (var shownNonZero = !1, showCount = 0, sigCount = inst.options.significant, show = $.extend({}, inst._show), period = Y; S >= period; period++) shownNonZero |= "?" == inst._show[period] && inst._periods[period] > 0, show[period] = "?" != inst._show[period] || shownNonZero ? inst._show[period] : null, showCount += show[period] ? 1 : 0, sigCount -= inst._periods[period] > 0 ? 1 : 0;
                for (var showSignificant = [!1, !1, !1, !1, !1, !1, !1], period = S; period >= Y; period--) inst._show[period] && (inst._periods[period] ? showSignificant[period] = !0 : (showSignificant[period] = sigCount > 0, sigCount--));
                var labels = inst.options.compact ? inst.options.compactLabels : inst.options.labels,
                    whichLabels = inst.options.whichLabels || this._normalLabels,
                    showCompact = function(period) {
                        var labelsNum = inst.options["compactLabels" + whichLabels(inst._periods[period])];
                        return show[period] ? self._translateDigits(inst, inst._periods[period]) + (labelsNum ? labelsNum[period] : labels[period]) + " " : ""
                    },
                    minDigits = inst.options.padZeroes ? 2 : 1,
                    showFull = function(period) {
                        var labelsNum = inst.options["labels" + whichLabels(inst._periods[period])];
                        return !inst.options.significant && show[period] || inst.options.significant && showSignificant[period] ? '<span class="' + self._sectionClass + '"><span class="' + self._amountClass + '">' + self._minDigits(inst, inst._periods[period], minDigits) + '</span><span class="' + self._periodClass + '">' + (labelsNum ? labelsNum[period] : labels[period]) + "</span></span>" : ""
                    };
                return inst.options.layout ? this._buildLayout(inst, show, inst.options.layout, inst.options.compact, inst.options.significant, showSignificant) : (inst.options.compact ? '<span class="' + this._rowClass + " " + this._amountClass + (inst._hold ? " " + this._holdingClass : "") + '">' + showCompact(Y) + showCompact(O) + showCompact(W) + showCompact(D) + (show[H] ? this._minDigits(inst, inst._periods[H], 2) : "") + (show[M] ? (show[H] ? inst.options.timeSeparator : "") + this._minDigits(inst, inst._periods[M], 2) : "") + (show[S] ? (show[H] || show[M] ? inst.options.timeSeparator : "") + this._minDigits(inst, inst._periods[S], 2) : "") : '<span class="' + this._rowClass + " " + this._showClass + (inst.options.significant || showCount) + (inst._hold ? " " + this._holdingClass : "") + '">' + showFull(Y) + showFull(O) + showFull(W) + showFull(D) + showFull(H) + showFull(M) + showFull(S)) + "</span>" + (inst.options.description ? '<span class="' + this._rowClass + " " + this._descrClass + '">' + inst.options.description + "</span>" : "")
            },
            _buildLayout: function(inst, show, layout, compact, significant, showSignificant) {
                for (var labels = inst.options[compact ? "compactLabels" : "labels"], whichLabels = inst.options.whichLabels || this._normalLabels, labelFor = function(index) {
                        return (inst.options[(compact ? "compactLabels" : "labels") + whichLabels(inst._periods[index])] || labels)[index]
                    }, digit = function(value, position) {
                        return inst.options.digits[Math.floor(value / position) % 10]
                    }, subs = {
                        desc: inst.options.description,
                        sep: inst.options.timeSeparator,
                        yl: labelFor(Y),
                        yn: this._minDigits(inst, inst._periods[Y], 1),
                        ynn: this._minDigits(inst, inst._periods[Y], 2),
                        ynnn: this._minDigits(inst, inst._periods[Y], 3),
                        y1: digit(inst._periods[Y], 1),
                        y10: digit(inst._periods[Y], 10),
                        y100: digit(inst._periods[Y], 100),
                        y1000: digit(inst._periods[Y], 1e3),
                        ol: labelFor(O),
                        on: this._minDigits(inst, inst._periods[O], 1),
                        onn: this._minDigits(inst, inst._periods[O], 2),
                        onnn: this._minDigits(inst, inst._periods[O], 3),
                        o1: digit(inst._periods[O], 1),
                        o10: digit(inst._periods[O], 10),
                        o100: digit(inst._periods[O], 100),
                        o1000: digit(inst._periods[O], 1e3),
                        wl: labelFor(W),
                        wn: this._minDigits(inst, inst._periods[W], 1),
                        wnn: this._minDigits(inst, inst._periods[W], 2),
                        wnnn: this._minDigits(inst, inst._periods[W], 3),
                        w1: digit(inst._periods[W], 1),
                        w10: digit(inst._periods[W], 10),
                        w100: digit(inst._periods[W], 100),
                        w1000: digit(inst._periods[W], 1e3),
                        dl: labelFor(D),
                        dn: this._minDigits(inst, inst._periods[D], 1),
                        dnn: this._minDigits(inst, inst._periods[D], 2),
                        dnnn: this._minDigits(inst, inst._periods[D], 3),
                        d1: digit(inst._periods[D], 1),
                        d10: digit(inst._periods[D], 10),
                        d100: digit(inst._periods[D], 100),
                        d1000: digit(inst._periods[D], 1e3),
                        hl: labelFor(H),
                        hn: this._minDigits(inst, inst._periods[H], 1),
                        hnn: this._minDigits(inst, inst._periods[H], 2),
                        hnnn: this._minDigits(inst, inst._periods[H], 3),
                        h1: digit(inst._periods[H], 1),
                        h10: digit(inst._periods[H], 10),
                        h100: digit(inst._periods[H], 100),
                        h1000: digit(inst._periods[H], 1e3),
                        ml: labelFor(M),
                        mn: this._minDigits(inst, inst._periods[M], 1),
                        mnn: this._minDigits(inst, inst._periods[M], 2),
                        mnnn: this._minDigits(inst, inst._periods[M], 3),
                        m1: digit(inst._periods[M], 1),
                        m10: digit(inst._periods[M], 10),
                        m100: digit(inst._periods[M], 100),
                        m1000: digit(inst._periods[M], 1e3),
                        sl: labelFor(S),
                        sn: this._minDigits(inst, inst._periods[S], 1),
                        snn: this._minDigits(inst, inst._periods[S], 2),
                        snnn: this._minDigits(inst, inst._periods[S], 3),
                        s1: digit(inst._periods[S], 1),
                        s10: digit(inst._periods[S], 10),
                        s100: digit(inst._periods[S], 100),
                        s1000: digit(inst._periods[S], 1e3)
                    }, html = layout, i = Y; S >= i; i++) {
                    var period = "yowdhms".charAt(i),
                        re = new RegExp("\\{" + period + "<\\}([\\s\\S]*)\\{" + period + ">\\}", "g");
                    html = html.replace(re, !significant && show[i] || significant && showSignificant[i] ? "$1" : "")
                }
                return $.each(subs, function(n, v) {
                    var re = new RegExp("\\{" + n + "\\}", "g");
                    html = html.replace(re, v)
                }), html
            },
            _minDigits: function(inst, value, len) {
                return value = "" + value, value.length >= len ? this._translateDigits(inst, value) : (value = "0000000000" + value, this._translateDigits(inst, value.substr(value.length - len)))
            },
            _translateDigits: function(inst, value) {
                return ("" + value).replace(/[0-9]/g, function(digit) {
                    return inst.options.digits[digit]
                })
            },
            _determineShow: function(inst) {
                var format = inst.options.format,
                    show = [];
                return show[Y] = format.match("y") ? "?" : format.match("Y") ? "!" : null, show[O] = format.match("o") ? "?" : format.match("O") ? "!" : null, show[W] = format.match("w") ? "?" : format.match("W") ? "!" : null, show[D] = format.match("d") ? "?" : format.match("D") ? "!" : null, show[H] = format.match("h") ? "?" : format.match("H") ? "!" : null, show[M] = format.match("m") ? "?" : format.match("M") ? "!" : null, show[S] = format.match("s") ? "?" : format.match("S") ? "!" : null, show
            },
            _calculatePeriods: function(inst, show, significant, now) {
                inst._now = now, inst._now.setMilliseconds(0);
                var until = new Date(inst._now.getTime());
                inst._since ? now.getTime() < inst._since.getTime() ? inst._now = now = until : now = inst._since : (until.setTime(inst._until.getTime()), now.getTime() > inst._until.getTime() && (inst._now = now = until));
                var periods = [0, 0, 0, 0, 0, 0, 0];
                if (show[Y] || show[O]) {
                    var lastNow = this._getDaysInMonth(now.getFullYear(), now.getMonth()),
                        lastUntil = this._getDaysInMonth(until.getFullYear(), until.getMonth()),
                        sameDay = until.getDate() == now.getDate() || until.getDate() >= Math.min(lastNow, lastUntil) && now.getDate() >= Math.min(lastNow, lastUntil),
                        getSecs = function(date) {
                            return 60 * (60 * date.getHours() + date.getMinutes()) + date.getSeconds()
                        },
                        months = Math.max(0, 12 * (until.getFullYear() - now.getFullYear()) + until.getMonth() - now.getMonth() + (until.getDate() < now.getDate() && !sameDay || sameDay && getSecs(until) < getSecs(now) ? -1 : 0));
                    periods[Y] = show[Y] ? Math.floor(months / 12) : 0, periods[O] = show[O] ? months - 12 * periods[Y] : 0, now = new Date(now.getTime());
                    var wasLastDay = now.getDate() == lastNow,
                        lastDay = this._getDaysInMonth(now.getFullYear() + periods[Y], now.getMonth() + periods[O]);
                    now.getDate() > lastDay && now.setDate(lastDay), now.setFullYear(now.getFullYear() + periods[Y]), now.setMonth(now.getMonth() + periods[O]), wasLastDay && now.setDate(lastDay)
                }
                var diff = Math.floor((until.getTime() - now.getTime()) / 1e3),
                    extractPeriod = function(period, numSecs) {
                        periods[period] = show[period] ? Math.floor(diff / numSecs) : 0, diff -= periods[period] * numSecs
                    };
                if (extractPeriod(W, 604800), extractPeriod(D, 86400), extractPeriod(H, 3600), extractPeriod(M, 60), extractPeriod(S, 1), diff > 0 && !inst._since)
                    for (var multiplier = [1, 12, 4.3482, 7, 24, 60, 60], lastShown = S, max = 1, period = S; period >= Y; period--) show[period] && (periods[lastShown] >= max && (periods[lastShown] = 0, diff = 1), diff > 0 && (periods[period]++, diff = 0, lastShown = period, max = 1)), max *= multiplier[period];
                if (significant)
                    for (var period = Y; S >= period; period++) significant && periods[period] ? significant-- : significant || (periods[period] = 0);
                return periods
            }
        })
    }(jQuery),
    function($) {
        function operate(input, direct, method) {
            var node = input[0],
                state = /er/.test(method) ? _indeterminate : /bl/.test(method) ? _disabled : _checked,
                active = method == _update ? {
                    checked: node[_checked],
                    disabled: node[_disabled],
                    indeterminate: "true" == input.attr(_indeterminate) || "false" == input.attr(_determinate)
                } : node[state];
            if (/^(ch|di|in)/.test(method) && !active) on(input, state);
            else if (/^(un|en|de)/.test(method) && active) off(input, state);
            else if (method == _update)
                for (var each in active) active[each] ? on(input, each, !0) : off(input, each, !0);
            else direct && "toggle" != method || (direct || input[_callback]("ifClicked"), active ? node[_type] !== _radio && off(input, state) : on(input, state))
        }

        function on(input, state, keep) {
            var node = input[0],
                parent = input.parent(),
                checked = state == _checked,
                indeterminate = state == _indeterminate,
                disabled = state == _disabled,
                callback = indeterminate ? _determinate : checked ? _unchecked : "enabled",
                regular = option(input, callback + capitalize(node[_type])),
                specific = option(input, state + capitalize(node[_type]));
            if (node[state] !== !0) {
                if (!keep && state == _checked && node[_type] == _radio && node.name) {
                    var form = input.closest("form"),
                        inputs = 'input[name="' + node.name + '"]';
                    inputs = form.length ? form.find(inputs) : $(inputs), inputs.each(function() {
                        this !== node && $(this).data(_iCheck) && off($(this), state)
                    })
                }
                indeterminate ? (node[state] = !0, node[_checked] && off(input, _checked, "force")) : (keep || (node[state] = !0), checked && node[_indeterminate] && off(input, _indeterminate, !1)), callbacks(input, checked, state, keep)
            }
            node[_disabled] && option(input, _cursor, !0) && parent.find("." + _iCheckHelper).css(_cursor, "default"), parent[_add](specific || option(input, state) || ""), parent.attr("role") && !indeterminate && parent.attr("aria-" + (disabled ? _disabled : _checked), "true"), parent[_remove](regular || option(input, callback) || "")
        }

        function off(input, state, keep) {
            var node = input[0],
                parent = input.parent(),
                checked = state == _checked,
                indeterminate = state == _indeterminate,
                disabled = state == _disabled,
                callback = indeterminate ? _determinate : checked ? _unchecked : "enabled",
                regular = option(input, callback + capitalize(node[_type])),
                specific = option(input, state + capitalize(node[_type]));
            node[state] !== !1 && ((indeterminate || !keep || "force" == keep) && (node[state] = !1), callbacks(input, checked, callback, keep)), !node[_disabled] && option(input, _cursor, !0) && parent.find("." + _iCheckHelper).css(_cursor, "pointer"), parent[_remove](specific || option(input, state) || ""), parent.attr("role") && !indeterminate && parent.attr("aria-" + (disabled ? _disabled : _checked), "false"), parent[_add](regular || option(input, callback) || "")
        }

        function tidy(input, callback) {
            input.data(_iCheck) && (input.parent().html(input.attr("style", input.data(_iCheck).s || "")), callback && input[_callback](callback), input.off(".i").unwrap(), $(_label + '[for="' + input[0].id + '"]').add(input.closest(_label)).off(".i"))
        }

        function option(input, state, regular) {
            return input.data(_iCheck) ? input.data(_iCheck).o[state + (regular ? "" : "Class")] : void 0
        }

        function capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1)
        }

        function callbacks(input, checked, callback, keep) {
            keep || (checked && input[_callback]("ifToggled"), input[_callback]("ifChanged")[_callback]("if" + capitalize(callback)))
        }
        var _iCheck = "iCheck",
            _iCheckHelper = _iCheck + "-helper",
            _checkbox = "checkbox",
            _radio = "radio",
            _checked = "checked",
            _unchecked = "un" + _checked,
            _disabled = "disabled";
        _determinate = "determinate", _indeterminate = "in" + _determinate, _update = "update", _type = "type", _click = "click", _touch = "touchbegin.i touchend.i", _add = "addClass", _remove = "removeClass", _callback = "trigger", _label = "label", _cursor = "cursor", _mobile = /ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent), $.fn[_iCheck] = function(options, fire) {
            var handle = 'input[type="' + _checkbox + '"], input[type="' + _radio + '"]',
                stack = $(),
                walker = function(object) {
                    object.each(function() {
                        var self = $(this);
                        stack = self.is(handle) ? stack.add(self) : stack.add(self.find(handle))
                    })
                };
            if (/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(options)) return options = options.toLowerCase(), walker(this), stack.each(function() {
                var self = $(this);
                "destroy" == options ? tidy(self, "ifDestroyed") : operate(self, !0, options), $.isFunction(fire) && fire()
            });
            if ("object" != typeof options && options) return this;
            var settings = $.extend({
                    checkedClass: _checked,
                    disabledClass: _disabled,
                    indeterminateClass: _indeterminate,
                    labelHover: !0
                }, options),
                selector = settings.handle,
                hoverClass = settings.hoverClass || "hover",
                focusClass = settings.focusClass || "focus",
                activeClass = settings.activeClass || "active",
                labelHover = !!settings.labelHover,
                labelHoverClass = settings.labelHoverClass || "hover",
                area = 0 | ("" + settings.increaseArea).replace("%", "");
            return (selector == _checkbox || selector == _radio) && (handle = 'input[type="' + selector + '"]'), -50 > area && (area = -50), walker(this), stack.each(function() {
                var self = $(this);
                tidy(self);
                var helper, node = this,
                    id = node.id,
                    offset = -area + "%",
                    size = 100 + 2 * area + "%",
                    layer = {
                        position: "absolute",
                        top: offset,
                        left: offset,
                        display: "block",
                        width: size,
                        height: size,
                        margin: 0,
                        padding: 0,
                        background: "#fff",
                        border: 0,
                        opacity: 0
                    },
                    hide = _mobile ? {
                        position: "absolute",
                        visibility: "hidden"
                    } : area ? layer : {
                        position: "absolute",
                        opacity: 0
                    },
                    className = node[_type] == _checkbox ? settings.checkboxClass || "i" + _checkbox : settings.radioClass || "i" + _radio,
                    label = $(_label + '[for="' + id + '"]').add(self.closest(_label)),
                    aria = !!settings.aria,
                    ariaID = _iCheck + "-" + Math.random().toString(36).substr(2, 6),
                    parent = '<div class="' + className + '" ' + (aria ? 'role="' + node[_type] + '" ' : "");
                aria && label.each(function() {
                    parent += 'aria-labelledby="', this.id ? parent += this.id : (this.id = ariaID, parent += ariaID), parent += '"'
                }), parent = self.wrap(parent + "/>")[_callback]("ifCreated").parent().append(settings.insert), helper = $('<ins class="' + _iCheckHelper + '"/>').css(layer).appendTo(parent), self.data(_iCheck, {
                    o: settings,
                    s: self.attr("style")
                }).css(hide), !!settings.inheritClass && parent[_add](node.className || ""), !!settings.inheritID && id && parent.attr("id", _iCheck + "-" + id), "static" == parent.css("position") && parent.css("position", "relative"), operate(self, !0, _update), label.length && label.on(_click + ".i mouseover.i mouseout.i " + _touch, function(event) {
                    var type = event[_type],
                        item = $(this);
                    if (!node[_disabled]) {
                        if (type == _click) {
                            if ($(event.target).is("a")) return;
                            operate(self, !1, !0)
                        } else labelHover && (/ut|nd/.test(type) ? (parent[_remove](hoverClass), item[_remove](labelHoverClass)) : (parent[_add](hoverClass), item[_add](labelHoverClass)));
                        if (!_mobile) return !1;
                        event.stopPropagation()
                    }
                }), self.on(_click + ".i focus.i blur.i keyup.i keydown.i keypress.i", function(event) {
                    var type = event[_type],
                        key = event.keyCode;
                    return type == _click ? !1 : "keydown" == type && 32 == key ? (node[_type] == _radio && node[_checked] || (node[_checked] ? off(self, _checked) : on(self, _checked)), !1) : ("keyup" == type && node[_type] == _radio ? !node[_checked] && on(self, _checked) : /us|ur/.test(type) && parent["blur" == type ? _remove : _add](focusClass), void 0)
                }), helper.on(_click + " mousedown mouseup mouseover mouseout " + _touch, function(event) {
                    var type = event[_type],
                        toggle = /wn|up/.test(type) ? activeClass : hoverClass;
                    if (!node[_disabled]) {
                        if (type == _click ? operate(self, !1, !0) : (/wn|er|in/.test(type) ? parent[_add](toggle) : parent[_remove](toggle + " " + activeClass), label.length && labelHover && toggle == hoverClass && label[/ut|nd/.test(type) ? _remove : _add](labelHoverClass)), !_mobile) return !1;
                        event.stopPropagation()
                    }
                })
            })
        }
    }(window.jQuery || window.Zepto),
    function() {
        function $(expr, con) {
            return [].slice.call((con || document).querySelectorAll(expr))
        }
        if (window.addEventListener) {
            var self = window.StyleFix = {
                link: function(link) {
                    try {
                        if ("stylesheet" !== link.rel || link.hasAttribute("data-noprefix")) return
                    } catch (e) {
                        return
                    }
                    var process, url = link.href || link.getAttribute("data-href"),
                        base = url.replace(/[^\/]+$/, ""),
                        base_scheme = (/^[a-z]{3,10}:/.exec(base) || [""])[0],
                        base_domain = (/^[a-z]{3,10}:\/\/[^\/]+/.exec(base) || [""])[0],
                        base_query = /^([^?]*)\??/.exec(url)[1],
                        parent = link.parentNode,
                        xhr = new XMLHttpRequest;
                    xhr.onreadystatechange = function() {
                        4 === xhr.readyState && process()
                    }, process = function() {
                        var css = xhr.responseText;
                        if (css && link.parentNode && (!xhr.status || xhr.status < 400 || xhr.status > 600)) {
                            if (css = self.fix(css, !0, link), base) {
                                css = css.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi, function($0, quote, url) {
                                    return /^([a-z]{3,10}:|#)/i.test(url) ? $0 : /^\/\//.test(url) ? 'url("' + base_scheme + url + '")' : /^\//.test(url) ? 'url("' + base_domain + url + '")' : /^\?/.test(url) ? 'url("' + base_query + url + '")' : 'url("' + base + url + '")'
                                });
                                var escaped_base = base.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g, "\\$1");
                                css = css.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)" + escaped_base, "gi"), "$1")
                            }
                            var style = document.createElement("style");
                            style.textContent = css, style.media = link.media, style.disabled = link.disabled, style.setAttribute("data-href", link.getAttribute("href")), parent.insertBefore(style, link), parent.removeChild(link), style.media = link.media
                        }
                    };
                    try {
                        xhr.open("GET", url), xhr.send(null)
                    } catch (e) {
                        "undefined" != typeof XDomainRequest && (xhr = new XDomainRequest, xhr.onerror = xhr.onprogress = function() {}, xhr.onload = process, xhr.open("GET", url), xhr.send(null))
                    }
                    link.setAttribute("data-inprogress", "")
                },
                styleElement: function(style) {
                    if (!style.hasAttribute("data-noprefix")) {
                        var disabled = style.disabled;
                        style.textContent = self.fix(style.textContent, !0, style), style.disabled = disabled
                    }
                },
                styleAttribute: function(element) {
                    var css = element.getAttribute("style");
                    css = self.fix(css, !1, element), element.setAttribute("style", css)
                },
                process: function() {
                    $('link[rel="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link), $("style").forEach(StyleFix.styleElement), $("[style]").forEach(StyleFix.styleAttribute)
                },
                register: function(fixer, index) {
                    (self.fixers = self.fixers || []).splice(void 0 === index ? self.fixers.length : index, 0, fixer)
                },
                fix: function(css, raw, element) {
                    for (var i = 0; i < self.fixers.length; i++) css = self.fixers[i](css, raw, element) || css;
                    return css
                },
                camelCase: function(str) {
                    return str.replace(/-([a-z])/g, function($0, $1) {
                        return $1.toUpperCase()
                    }).replace("-", "")
                },
                deCamelCase: function(str) {
                    return str.replace(/[A-Z]/g, function($0) {
                        return "-" + $0.toLowerCase()
                    })
                }
            };
            ! function() {
                setTimeout(function() {
                    $('link[rel="stylesheet"]').forEach(StyleFix.link)
                }, 10), document.addEventListener("DOMContentLoaded", StyleFix.process, !1)
            }()
        }
    }(),
    function(root) {
        function fix(what, before, after, replacement, css) {
            if (what = self[what], what.length) {
                var regex = RegExp(before + "(" + what.join("|") + ")" + after, "gi");
                css = css.replace(regex, replacement)
            }
            return css
        }
        if (window.StyleFix && window.getComputedStyle) {
            var self = window.PrefixFree = {
                prefixCSS: function(css, raw) {
                    var prefix = self.prefix;
                    if (self.functions.indexOf("linear-gradient") > -1 && (css = css.replace(/(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/gi, function($0, delim, repeating, deg) {
                            return delim + (repeating || "") + "linear-gradient(" + (90 - deg) + "deg"
                        })), css = fix("functions", "(\\s|:|,)", "\\s*\\(", "$1" + prefix + "$2(", css), css = fix("keywords", "(\\s|:)", "(\\s|;|\\}|$)", "$1" + prefix + "$2$3", css), css = fix("properties", "(^|\\{|\\s|;)", "\\s*:", "$1" + prefix + "$2:", css), self.properties.length) {
                        var regex = RegExp("\\b(" + self.properties.join("|") + ")(?!:)", "gi");
                        css = fix("valueProperties", "\\b", ":(.+?);", function($0) {
                            return $0.replace(regex, prefix + "$1")
                        }, css)
                    }
                    return raw && (css = fix("selectors", "", "\\b", self.prefixSelector, css), css = fix("atrules", "@", "\\b", "@" + prefix + "$1", css)), css = css.replace(RegExp("-" + prefix, "g"), "-"), css = css.replace(/-\*-(?=[a-z]+)/gi, self.prefix)
                },
                property: function(property) {
                    return (self.properties.indexOf(property) >= 0 ? self.prefix : "") + property
                },
                value: function(value, property) {
                    return value = fix("functions", "(^|\\s|,)", "\\s*\\(", "$1" + self.prefix + "$2(", value), value = fix("keywords", "(^|\\s)", "(\\s|$)", "$1" + self.prefix + "$2$3", value), self.valueProperties.indexOf(property) >= 0 && (value = fix("properties", "(^|\\s|,)", "($|\\s|,)", "$1" + self.prefix + "$2$3", value)), value
                },
                prefixSelector: function(selector) {
                    return selector.replace(/^:{1,2}/, function($0) {
                        return $0 + self.prefix
                    })
                },
                prefixProperty: function(property, camelCase) {
                    var prefixed = self.prefix + property;
                    return camelCase ? StyleFix.camelCase(prefixed) : prefixed
                }
            };
            ! function() {
                var prefixes = {},
                    properties = [],
                    style = getComputedStyle(document.documentElement, null),
                    dummy = document.createElement("div").style,
                    iterate = function(property) {
                        if ("-" === property.charAt(0)) {
                            properties.push(property);
                            var parts = property.split("-"),
                                prefix = parts[1];
                            for (prefixes[prefix] = ++prefixes[prefix] || 1; parts.length > 3;) {
                                parts.pop();
                                var shorthand = parts.join("-");
                                supported(shorthand) && -1 === properties.indexOf(shorthand) && properties.push(shorthand)
                            }
                        }
                    },
                    supported = function(property) {
                        return StyleFix.camelCase(property) in dummy
                    };
                if (style.length > 0)
                    for (var i = 0; i < style.length; i++) iterate(style[i]);
                else
                    for (var property in style) iterate(StyleFix.deCamelCase(property));
                var highest = {
                    uses: 0
                };
                for (var prefix in prefixes) {
                    var uses = prefixes[prefix];
                    highest.uses < uses && (highest = {
                        prefix: prefix,
                        uses: uses
                    })
                }
                self.prefix = "-" + highest.prefix + "-", self.Prefix = StyleFix.camelCase(self.prefix), self.properties = [];
                for (var i = 0; i < properties.length; i++) {
                    var property = properties[i];
                    if (0 === property.indexOf(self.prefix)) {
                        var unprefixed = property.slice(self.prefix.length);
                        supported(unprefixed) || self.properties.push(unprefixed)
                    }
                }
                "Ms" != self.Prefix || "transform" in dummy || "MsTransform" in dummy || !("msTransform" in dummy) || self.properties.push("transform", "transform-origin"), self.properties.sort()
            }(),
            function() {
                function supported(value, property) {
                    return style[property] = "", style[property] = value, !!style[property]
                }
                var functions = {
                    "linear-gradient": {
                        property: "backgroundImage",
                        params: "red, teal"
                    },
                    calc: {
                        property: "width",
                        params: "1px + 5%"
                    },
                    element: {
                        property: "backgroundImage",
                        params: "#foo"
                    },
                    "cross-fade": {
                        property: "backgroundImage",
                        params: "url(a.png), url(b.png), 50%"
                    }
                };
                functions["repeating-linear-gradient"] = functions["repeating-radial-gradient"] = functions["radial-gradient"] = functions["linear-gradient"];
                var keywords = {
                    initial: "color",
                    "zoom-in": "cursor",
                    "zoom-out": "cursor",
                    box: "display",
                    flexbox: "display",
                    "inline-flexbox": "display",
                    flex: "display",
                    "inline-flex": "display",
                    grid: "display",
                    "inline-grid": "display",
                    "min-content": "width"
                };
                self.functions = [], self.keywords = [];
                var style = document.createElement("div").style;
                for (var func in functions) {
                    var test = functions[func],
                        property = test.property,
                        value = func + "(" + test.params + ")";
                    !supported(value, property) && supported(self.prefix + value, property) && self.functions.push(func)
                }
                for (var keyword in keywords) {
                    var property = keywords[keyword];
                    !supported(keyword, property) && supported(self.prefix + keyword, property) && self.keywords.push(keyword)
                }
            }(),
            function() {
                function supported(selector) {
                    return style.textContent = selector + "{}", !!style.sheet.cssRules.length
                }
                var selectors = {
                        ":read-only": null,
                        ":read-write": null,
                        ":any-link": null,
                        "::selection": null
                    },
                    atrules = {
                        keyframes: "name",
                        viewport: null,
                        document: 'regexp(".")'
                    };
                self.selectors = [], self.atrules = [];
                var style = root.appendChild(document.createElement("style"));
                for (var selector in selectors) {
                    var test = selector + (selectors[selector] ? "(" + selectors[selector] + ")" : "");
                    !supported(test) && supported(self.prefixSelector(test)) && self.selectors.push(selector)
                }
                for (var atrule in atrules) {
                    var test = atrule + " " + (atrules[atrule] || "");
                    !supported("@" + test) && supported("@" + self.prefix + test) && self.atrules.push(atrule)
                }
                root.removeChild(style)
            }(), self.valueProperties = ["transition", "transition-property"], root.className += " " + self.prefix, StyleFix.register(self.prefixCSS)
        }
    }(document.documentElement), window.Modernizr = function(a, b, c) {
        function C(a) {
            j.cssText = a
        }

        function D(a, b) {
            return C(n.join(a + ";") + (b || ""))
        }

        function E(a, b) {
            return typeof a === b
        }

        function F(a, b) {
            return !!~("" + a).indexOf(b)
        }

        function G(a, b) {
            for (var d in a) {
                var e = a[d];
                if (!F(e, "-") && j[e] !== c) return "pfx" == b ? e : !0
            }
            return !1
        }

        function H(a, b, d) {
            for (var e in a) {
                var f = b[a[e]];
                if (f !== c) return d === !1 ? a[e] : E(f, "function") ? f.bind(d || b) : f
            }
            return !1
        }

        function I(a, b, c) {
            var d = a.charAt(0).toUpperCase() + a.slice(1),
                e = (a + " " + p.join(d + " ") + d).split(" ");
            return E(b, "string") || E(b, "undefined") ? G(e, b) : (e = (a + " " + q.join(d + " ") + d).split(" "), H(e, b, c))
        }
        var k, x, B, d = "2.6.2",
            e = {},
            f = !0,
            g = b.documentElement,
            h = "modernizr",
            i = b.createElement(h),
            j = i.style,
            l = ":)",
            m = {}.toString,
            n = " -webkit- -moz- -o- -ms- ".split(" "),
            o = "Webkit Moz O ms",
            p = o.split(" "),
            q = o.toLowerCase().split(" "),
            r = {
                svg: "http://www.w3.org/2000/svg"
            },
            s = {},
            v = [],
            w = v.slice,
            y = function(a, c, d, e) {
                var f, i, j, k, l = b.createElement("div"),
                    m = b.body,
                    n = m || b.createElement("body");
                if (parseInt(d, 10))
                    for (; d--;) j = b.createElement("div"), j.id = e ? e[d] : h + (d + 1), l.appendChild(j);
                return f = ["&#173;", '<style id="s', h, '">', a, "</style>"].join(""), l.id = h, (m ? l : n).innerHTML += f, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden", k = g.style.overflow, g.style.overflow = "hidden", g.appendChild(n)), i = c(l, a), m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), g.style.overflow = k), !!i
            },
            z = function() {
                function d(d, e) {
                    e = e || b.createElement(a[d] || "div"), d = "on" + d;
                    var f = d in e;
                    return f || (e.setAttribute || (e = b.createElement("div")), e.setAttribute && e.removeAttribute && (e.setAttribute(d, ""), f = E(e[d], "function"), E(e[d], "undefined") || (e[d] = c), e.removeAttribute(d))), e = null, f
                }
                var a = {
                    select: "input",
                    change: "input",
                    submit: "form",
                    reset: "form",
                    error: "img",
                    load: "img",
                    abort: "img"
                };
                return d
            }(),
            A = {}.hasOwnProperty;
        B = E(A, "undefined") || E(A.call, "undefined") ? function(a, b) {
            return b in a && E(a.constructor.prototype[b], "undefined")
        } : function(a, b) {
            return A.call(a, b)
        }, Function.prototype.bind || (Function.prototype.bind = function(b) {
            var c = this;
            if ("function" != typeof c) throw new TypeError;
            var d = w.call(arguments, 1),
                e = function() {
                    if (this instanceof e) {
                        var a = function() {};
                        a.prototype = c.prototype;
                        var f = new a,
                            g = c.apply(f, d.concat(w.call(arguments)));
                        return Object(g) === g ? g : f
                    }
                    return c.apply(b, d.concat(w.call(arguments)))
                };
            return e
        }), s.flexbox = function() {
            return I("flexWrap")
        }, s.flexboxlegacy = function() {
            return I("boxDirection")
        }, s.canvas = function() {
            var a = b.createElement("canvas");
            return !!a.getContext && !!a.getContext("2d")
        }, s.canvastext = function() {
            return !!e.canvas && !!E(b.createElement("canvas").getContext("2d").fillText, "function")
        }, s.webgl = function() {
            return !!a.WebGLRenderingContext
        }, s.touch = function() {
            var c;
            return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : y(["@media (", n.join("touch-enabled),("), h, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(a) {
                c = 9 === a.offsetTop
            }), c
        }, s.geolocation = function() {
            return "geolocation" in navigator
        }, s.history = function() {
            return !!a.history && !!history.pushState
        }, s.draganddrop = function() {
            var a = b.createElement("div");
            return "draggable" in a || "ondragstart" in a && "ondrop" in a
        }, s.rgba = function() {
            return C("background-color:rgba(150,255,150,.5)"), F(j.backgroundColor, "rgba")
        }, s.hsla = function() {
            return C("background-color:hsla(120,40%,100%,.5)"), F(j.backgroundColor, "rgba") || F(j.backgroundColor, "hsla")
        }, s.multiplebgs = function() {
            return C("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(j.background)
        }, s.backgroundsize = function() {
            return I("backgroundSize")
        }, s.borderimage = function() {
            return I("borderImage")
        }, s.borderradius = function() {
            return I("borderRadius")
        }, s.boxshadow = function() {
            return I("boxShadow")
        }, s.textshadow = function() {
            return "" === b.createElement("div").style.textShadow
        }, s.opacity = function() {
            return D("opacity:.55"), /^0.55$/.test(j.opacity)
        }, s.cssanimations = function() {
            return I("animationName")
        }, s.csscolumns = function() {
            return I("columnCount")
        }, s.cssgradients = function() {
            var a = "background-image:",
                b = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
                c = "linear-gradient(left top,#9f9, white);";
            return C((a + "-webkit- ".split(" ").join(b + a) + n.join(c + a)).slice(0, -a.length)), F(j.backgroundImage, "gradient")
        }, s.cssreflections = function() {
            return I("boxReflect")
        }, s.csstransforms = function() {
            return !!I("transform")
        }, s.csstransforms3d = function() {
            var a = !!I("perspective");
            return a && "webkitPerspective" in g.style && y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(b) {
                a = 9 === b.offsetLeft && 3 === b.offsetHeight
            }), a
        }, s.csstransitions = function() {
            return I("transition")
        }, s.fontface = function() {
            var a;
            return y('@font-face {font-family:"font";src:url("https://")}', function(c, d) {
                var e = b.getElementById("smodernizr"),
                    f = e.sheet || e.styleSheet,
                    g = f ? f.cssRules && f.cssRules[0] ? f.cssRules[0].cssText : f.cssText || "" : "";
                a = /src/i.test(g) && 0 === g.indexOf(d.split(" ")[0])
            }), a
        }, s.generatedcontent = function() {
            var a;
            return y(["#", h, "{font:0/0 a}#", h, ':after{content:"', l, '";visibility:hidden;font:3px/1 a}'].join(""), function(b) {
                a = b.offsetHeight >= 3
            }), a
        }, s.video = function() {
            var a = b.createElement("video"),
                c = !1;
            try {
                (c = !!a.canPlayType) && (c = new Boolean(c), c.ogg = a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), c.h264 = a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), c.webm = a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""))
            } catch (d) {}
            return c
        }, s.audio = function() {
            var a = b.createElement("audio"),
                c = !1;
            try {
                (c = !!a.canPlayType) && (c = new Boolean(c), c.ogg = a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), c.mp3 = a.canPlayType("audio/mpeg;").replace(/^no$/, ""), c.wav = a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), c.m4a = (a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/aac;")).replace(/^no$/, ""))
            } catch (d) {}
            return c
        }, s.applicationcache = function() {
            return !!a.applicationCache
        }, s.svg = function() {
            return !!b.createElementNS && !!b.createElementNS(r.svg, "svg").createSVGRect
        }, s.inlinesvg = function() {
            var a = b.createElement("div");
            return a.innerHTML = "<svg/>", (a.firstChild && a.firstChild.namespaceURI) == r.svg
        }, s.smil = function() {
            return !!b.createElementNS && /SVGAnimate/.test(m.call(b.createElementNS(r.svg, "animate")))
        }, s.svgclippaths = function() {
            return !!b.createElementNS && /SVGClipPath/.test(m.call(b.createElementNS(r.svg, "clipPath")))
        };
        for (var J in s) B(s, J) && (x = J.toLowerCase(), e[x] = s[J](), v.push((e[x] ? "" : "no-") + x));
        return e.addTest = function(a, b) {
                if ("object" == typeof a)
                    for (var d in a) B(a, d) && e.addTest(d, a[d]);
                else {
                    if (a = a.toLowerCase(), e[a] !== c) return e;
                    b = "function" == typeof b ? b() : b, "undefined" != typeof f && f && (g.className += " mod_" + (b ? "" : "no-") + a), e[a] = b
                }
                return e
            }, C(""), i = k = null,
            function(a, b) {
                function k(a, b) {
                    var c = a.createElement("p"),
                        d = a.getElementsByTagName("head")[0] || a.documentElement;
                    return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild)
                }

                function l() {
                    var a = r.elements;
                    return "string" == typeof a ? a.split(" ") : a
                }

                function m(a) {
                    var b = i[a[g]];
                    return b || (b = {}, h++, a[g] = h, i[h] = b), b
                }

                function n(a, c, f) {
                    if (c || (c = b), j) return c.createElement(a);
                    f || (f = m(c));
                    var g;
                    return g = f.cache[a] ? f.cache[a].cloneNode() : e.test(a) ? (f.cache[a] = f.createElem(a)).cloneNode() : f.createElem(a), g.canHaveChildren && !d.test(a) ? f.frag.appendChild(g) : g
                }

                function o(a, c) {
                    if (a || (a = b), j) return a.createDocumentFragment();
                    c = c || m(a);
                    for (var d = c.frag.cloneNode(), e = 0, f = l(), g = f.length; g > e; e++) d.createElement(f[e]);
                    return d
                }

                function p(a, b) {
                    b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function(c) {
                        return r.shivMethods ? n(c, a, b) : b.createElem(c)
                    }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + l().join().replace(/\w+/g, function(a) {
                        return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")'
                    }) + ");return n}")(r, b.frag)
                }

                function q(a) {
                    a || (a = b);
                    var c = m(a);
                    return r.shivCSS && !f && !c.hasCSS && (c.hasCSS = !!k(a, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), j || p(a, c), a
                }
                var f, j, c = a.html5 || {},
                    d = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                    e = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                    g = "_html5shiv",
                    h = 0,
                    i = {};
                ! function() {
                    try {
                        var a = b.createElement("a");
                        a.innerHTML = "<xyz></xyz>", f = "hidden" in a, j = 1 == a.childNodes.length || function() {
                            b.createElement("a");
                            var a = b.createDocumentFragment();
                            return "undefined" == typeof a.cloneNode || "undefined" == typeof a.createDocumentFragment || "undefined" == typeof a.createElement
                        }()
                    } catch (c) {
                        f = !0, j = !0
                    }
                }();
                var r = {
                    elements: c.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
                    shivCSS: c.shivCSS !== !1,
                    supportsUnknownElements: j,
                    shivMethods: c.shivMethods !== !1,
                    type: "default",
                    shivDocument: q,
                    createElement: n,
                    createDocumentFragment: o
                };
                a.html5 = r, q(b)
            }(this, b), e._version = d, e._prefixes = n, e._domPrefixes = q, e._cssomPrefixes = p, e.hasEvent = z, e.testProp = function(a) {
                return G([a])
            }, e.testAllProps = I, e.testStyles = y, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " mod_js mod_" + v.join(" mod_") : ""), e
    }(this, this.document),
    function(a, b, c) {
        function d(a) {
            return "[object Function]" == o.call(a)
        }

        function e(a) {
            return "string" == typeof a
        }

        function f() {}

        function g(a) {
            return !a || "loaded" == a || "complete" == a || "uninitialized" == a
        }

        function h() {
            var a = p.shift();
            q = 1, a ? a.t ? m(function() {
                ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1)
            }, 0) : (a(), h()) : q = 0
        }

        function i(a, c, d, e, f, i, j) {
            function k(b) {
                if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) {
                    "img" != a && m(function() {
                        t.removeChild(l)
                    }, 50);
                    for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload()
                }
            }
            var j = j || B.errorTimeout,
                l = b.createElement(a),
                o = 0,
                r = 0,
                u = {
                    t: d,
                    s: c,
                    e: f,
                    a: i,
                    x: j
                };
            1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function() {
                k.call(this, r)
            }, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l))
        }

        function j(a, b, c, d, f) {
            return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this
        }

        function k() {
            var a = B;
            return a.loader = {
                load: j,
                i: 0
            }, a
        }
        var A, B, l = b.documentElement,
            m = a.setTimeout,
            n = b.getElementsByTagName("script")[0],
            o = {}.toString,
            p = [],
            q = 0,
            r = "MozAppearance" in l.style,
            s = r && !!b.createRange().compareNode,
            t = s ? l : n.parentNode,
            l = a.opera && "[object Opera]" == o.call(a.opera),
            l = !!b.attachEvent && !l,
            u = r ? "object" : l ? "script" : "img",
            v = l ? "script" : u,
            w = Array.isArray || function(a) {
                return "[object Array]" == o.call(a)
            },
            x = [],
            y = {},
            z = {
                timeout: function(a, b) {
                    return b.length && (a.timeout = b[0]), a
                }
            };
        B = function(a) {
            function b(a) {
                var e, f, g, a = a.split("!"),
                    b = x.length,
                    c = a.pop(),
                    d = a.length,
                    c = {
                        url: c,
                        origUrl: c,
                        prefixes: a
                    };
                for (f = 0; d > f; f++) g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g));
                for (f = 0; b > f; f++) c = x[f](c);
                return c
            }

            function g(a, e, f, g, h) {
                var i = b(a),
                    j = i.autoCallback;
                i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function() {
                    k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2
                })))
            }

            function h(a, b) {
                function c(a, c) {
                    if (a) {
                        if (e(a)) c || (j = function() {
                            var a = [].slice.call(arguments);
                            k.apply(this, a), l()
                        }), g(a, j, b, 0, h);
                        else if (Object(a) === a)
                            for (n in m = function() {
                                    var c, b = 0;
                                    for (c in a) a.hasOwnProperty(c) && b++;
                                    return b
                                }(), a) a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function() {
                                var a = [].slice.call(arguments);
                                k.apply(this, a), l()
                            } : j[n] = function(a) {
                                return function() {
                                    var b = [].slice.call(arguments);
                                    a && a.apply(this, b), l()
                                }
                            }(k[n])), g(a[n], j, b, n, h))
                    } else !c && l()
                }
                var m, n, h = !!a.test,
                    i = a.load || a.both,
                    j = a.callback || f,
                    k = j,
                    l = a.complete || f;
                c(h ? a.yep : a.nope, !!i), i && c(i)
            }
            var i, j, l = this.yepnope.loader;
            if (e(a)) g(a, 0, l, 0);
            else if (w(a))
                for (i = 0; i < a.length; i++) j = a[i], e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l);
            else Object(a) === a && h(a, l)
        }, B.addPrefix = function(a, b) {
            z[a] = b
        }, B.addFilter = function(a) {
            x.push(a)
        }, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function() {
            b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete"
        }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function(a, c, d, e, i, j) {
            var l, o, k = b.createElement("script"),
                e = e || B.errorTimeout;
            k.src = a;
            for (o in d) k.setAttribute(o, d[o]);
            c = j ? h : c || f, k.onreadystatechange = k.onload = function() {
                !l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null)
            }, m(function() {
                l || (l = 1, c(1))
            }, e), i ? k.onload() : n.parentNode.insertBefore(k, n)
        }, a.yepnope.injectCss = function(a, c, d, e, g, i) {
            var j, e = b.createElement("link"),
                c = i ? h : c || f;
            e.href = a, e.rel = "stylesheet", e.type = "text/css";
            for (j in d) e.setAttribute(j, d[j]);
            g || (n.parentNode.insertBefore(e, n), m(c, 0))
        }
    }(this, document), Modernizr.load = function() {
        yepnope.apply(window, [].slice.call(arguments, 0))
    }, Modernizr.addTest("csscalc", function() {
        var a = "width:",
            b = "calc(10px);",
            c = document.createElement("div");
        return c.style.cssText = a + Modernizr._prefixes.join(b + a), !!c.style.length
    }), Modernizr.addTest("fullscreen", function() {
        for (var a = 0; a < Modernizr._domPrefixes.length; a++)
            if (document[Modernizr._domPrefixes[a].toLowerCase() + "CancelFullScreen"]) return !0;
        return !!document.cancelFullScreen || !1
    }), Modernizr.addTest("cssresize", Modernizr.testAllProps("resize")), Modernizr.addTest("ie8compat", function() {
        return !window.addEventListener && document.documentMode && 7 === document.documentMode
    }),
    /*
    Tipr 1.0.1
    Copyright (c) 2013 Tipue
    Tipr is released under the MIT License
    http://www.tipue.com/tipr
    */
    function($) {
        $.fn.tipr = function(options) {
            var set = $.extend({
                speed: 200,
                mode: "bottom"
            }, options);
            return this.each(function() {
                var tipr_cont = ".tipr_container_" + set.mode;
                $(this).hover(function() {
                    var out = '<div class="tipr_container_' + set.mode + '"><div class="tipr_point_' + set.mode + '"><div class="tipr_content">' + $(this).attr("data-tip") + "</div></div></div>";
                    $(this).append(out);
                    var w_t = $(tipr_cont).outerWidth(),
                        w_e = $(this).width(),
                        m_l = w_e / 2 - w_t / 2;
                    $(tipr_cont).css("margin-left", m_l + "px"), $(this).removeAttr("title"), $(tipr_cont).fadeIn(set.speed)
                }, function() {
                    $(tipr_cont).remove()
                })
            })
        }
    }(jQuery);
var countries_mapping = {
    Afghanistan: "AF",
    Albania: "AL",
    Algeria: "DZ",
    "American Samoa": "AS",
    Andorra: "AD",
    Angola: "AO",
    Anguilla: "AI",
    Antarctica: "AQ",
    "Antigua and Barbuda": "AG",
    Argentina: "AR",
    Armenia: "AM",
    Aruba: "AW",
    Australia: "AU",
    Austria: "AT",
    Azerbaijan: "AZ",
    Bahamas: "BS",
    Bahrain: "BH",
    Bangladesh: "BD",
    Barbados: "BB",
    Belarus: "BY",
    Belgium: "BE",
    Belize: "BZ",
    Benin: "BJ",
    Bermuda: "BM",
    Bhutan: "BT",
    Bolivia: "BO",
    "Bonaire, Sint Eustatius and Saba": "BQ",
    "Bosnia and Herzegovina": "BA",
    Botswana: "BW",
    "Bouvet Island": "BV",
    Brazil: "BR",
    "British Indian Ocean Territory": "IO",
    "Brunei Darussalam": "BN",
    Bulgaria: "BG",
    "Burkina Faso": "BF",
    Burundi: "BI",
    Cambodia: "KH",
    Cameroon: "CM",
    Canada: "CA",
    "Cabo Verde": "CV",
    "Cayman Islands": "KY",
    "Central African Republic": "CF",
    Chad: "TD",
    Chile: "CL",
    China: "CN",
    "Christmas Island": "CX",
    "Cocos (Keeling) Islands": "CC",
    Colombia: "CO",
    Comoros: "KM",
    Congo: "CG",
    Congo: "CD",
    "Cook Islands": "CK",
    "Costa Rica": "CR",
    Croatia: "HR",
    Cuba: "CU",
    Cura\ u00e7ao: "CW",
    Cyprus: "CY",
    "Czech Republic": "CZ",
    "C\xf4te d'Ivoire": "CI",
    Denmark: "DK",
    Djibouti: "DJ",
    Dominica: "DM",
    "Dominican Republic": "DO",
    Ecuador: "EC",
    Egypt: "EG",
    "El Salvador": "SV",
    "Equatorial Guinea": "GQ",
    Eritrea: "ER",
    Estonia: "EE",
    Ethiopia: "ET",
    "Falkland Islands (Malvinas)": "FK",
    "Faroe Islands": "FO",
    Fiji: "FJ",
    Finland: "FI",
    France: "FR",
    "French Guiana": "GF",
    "French Polynesia": "PF",
    "French Southern Territories": "TF",
    Gabon: "GA",
    Gambia: "GM",
    Georgia: "GE",
    Germany: "DE",
    Ghana: "GH",
    Gibraltar: "GI",
    Greece: "GR",
    Greenland: "GL",
    Grenada: "GD",
    Guadeloupe: "GP",
    Guam: "GU",
    Guatemala: "GT",
    Guernsey: "GG",
    Guinea: "GN",
    "Guinea-Bissau": "GW",
    Guyana: "GY",
    Haiti: "HT",
    "Heard Island and McDonald Islands": "HM",
    "Holy See (Vatican City State)": "VA",
    Honduras: "HN",
    "Hong Kong": "HK",
    Hungary: "HU",
    Iceland: "IS",
    India: "IN",
    Indonesia: "ID",
    Iran: "IR",
    Iraq: "IQ",
    Ireland: "IE",
    "Isle of Man": "IM",
    Israel: "IL",
    Italy: "IT",
    Jamaica: "JM",
    Japan: "JP",
    Jersey: "JE",
    Jordan: "JO",
    Kazakhstan: "KZ",
    Kenya: "KE",
    Kiribati: "KI",
    Kosovo: "xk",
    "North Korea": "KP",
    "South Korea": "KR",
    Kuwait: "KW",
    Kyrgyzstan: "KG",
    "Lao People's Democratic Republic": "LA",
    Latvia: "LV",
    Lebanon: "LB",
    Lesotho: "LS",
    Liberia: "LR",
    Libya: "LY",
    Liechtenstein: "LI",
    Lithuania: "LT",
    Luxembourg: "LU",
    Macao: "MO",
    Macedonia: "MK",
    Madagascar: "MG",
    Malawi: "MW",
    Malaysia: "MY",
    Maldives: "MV",
    Mali: "ML",
    Malta: "MT",
    "Marshall Islands": "MH",
    Martinique: "MQ",
    Mauritania: "MR",
    Mauritius: "MU",
    Mayotte: "YT",
    Mexico: "MX",
    Micronesia: "FM",
    Moldova: "MD",
    Monaco: "MC",
    Mongolia: "MN",
    Montenegro: "ME",
    Montserrat: "MS",
    Morocco: "MA",
    Mozambique: "MZ",
    Myanmar: "MM",
    Namibia: "NA",
    Nauru: "NR",
    Nepal: "NP",
    Netherlands: "NL",
    "New Caledonia": "NC",
    "New Zealand": "NZ",
    Nicaragua: "NI",
    Niger: "NE",
    Nigeria: "NG",
    Niue: "NU",
    "Norfolk Island": "NF",
    "Northern Mariana Islands": "MP",
    Norway: "NO",
    Oman: "OM",
    Pakistan: "PK",
    Palau: "PW",
    "Palestine, State of": "PS",
    Panama: "PA",
    "Papua New Guinea": "PG",
    Paraguay: "PY",
    Peru: "PE",
    Philippines: "PH",
    Pitcairn: "PN",
    Poland: "PL",
    Portugal: "PT",
    "Puerto Rico": "PR",
    Qatar: "QA",
    Romania: "RO",
    "Russian Federation": "RU",
    Rwanda: "RW",
    R\ u00e9union: "RE",
    "Saint Barth\xe9lemy": "BL",
    "Saint Helena, Ascension and Tristan da Cunha": "SH",
    "Saint Kitts and Nevis": "KN",
    "Saint Lucia": "LC",
    "Saint Martin (French part)": "MF",
    "Saint Pierre and Miquelon": "PM",
    "Saint Vincent and the Grenadines": "VC",
    Samoa: "WS",
    "San Marino": "SM",
    "Sao Tome and Principe": "ST",
    "Saudi Arabia": "SA",
    Senegal: "SN",
    Serbia: "RS",
    Seychelles: "SC",
    "Sierra Leone": "SL",
    Singapore: "SG",
    "Sint Maarten (Dutch part)": "SX",
    Slovakia: "SK",
    Slovenia: "SI",
    "Solomon Islands": "SB",
    Somalia: "SO",
    "South Africa": "ZA",
    "South Georgia and the South Sandwich Islands": "GS",
    "South Sudan": "SS",
    Spain: "ES",
    "Sri Lanka": "LK",
    Sudan: "SD",
    Suriname: "SR",
    "Svalbard and Jan Mayen": "SJ",
    Swaziland: "SZ",
    Sweden: "SE",
    Switzerland: "CH",
    "Syrian Arab Republic": "SY",
    Taiwan: "TW",
    Tajikistan: "TJ",
    Tanzania: "TZ",
    Thailand: "TH",
    "Timor-Leste": "TL",
    Togo: "TG",
    Tokelau: "TK",
    Tonga: "TO",
    "Trinidad and Tobago": "TT",
    Tunisia: "TN",
    Turkey: "TR",
    Turkmenistan: "TM",
    "Turks and Caicos Islands": "TC",
    Tuvalu: "TV",
    Uganda: "UG",
    Ukraine: "UA",
    "United Arab Emirates": "AE",
    "United Kingdom": "GB",
    "United States": "US",
    "United States Minor Outlying Islands": "UM",
    Uruguay: "UY",
    Uzbekistan: "UZ",
    Vanuatu: "VU",
    Venezuela: "VE",
    Vietnam: "VN",
    "Virgin Islands, British": "VG",
    "Virgin Islands, U.S.": "VI",
    "Wallis and Futuna": "WF",
    "Western Sahara": "EH",
    Yemen: "YE",
    Zambia: "ZM",
    Zimbabwe: "ZW",
    "\xc5land Islands": "AX"
};
(function() {
    var Offline, checkXHR, defaultOptions, extendNative, grab, handlers, init;
    extendNative = function(to, from) {
        var e, key, val, _results;
        _results = [];
        for (key in from.prototype) try {
            val = from.prototype[key], null == to[key] && "function" != typeof val ? _results.push(to[key] = val) : _results.push(void 0)
        } catch (_error) {
            e = _error
        }
        return _results
    }, Offline = {}, null == Offline.options && (Offline.options = {}), defaultOptions = {
        checks: {
            xhr: {
                url: function() {
                    return $.cookie("cdn_url") ? "https://" + $.cookie("cdn_url") + "/status.html?_=" + Math.floor(1e9 * Math.random()) : "https://hrcdn.net/status.html?_=" + Math.floor(1e9 * Math.random())
                }
            },
            image: {
                url: function() {
                    return $.cookie("cdn_url") ? "https://" + $.cookie("cdn_url") + "/hackerrank/online.gif?_=" + Math.floor(1e9 * Math.random()) : "https://hrcdn.net/hackerrank/online.gif?_=" + Math.floor(1e9 * Math.random())
                }
            },
            active: "image"
        },
        checkOnLoad: !1,
        interceptRequests: !1,
        reconnect: !0
    }, grab = function(obj, key) {
        var cur, i, part, parts, _i, _len;
        for (cur = obj, parts = key.split("."), i = _i = 0, _len = parts.length; _len > _i && (part = parts[i], cur = cur[part], "object" == typeof cur); i = ++_i);
        return i === parts.length - 1 ? cur : void 0
    }, Offline.getOption = function(key) {
        var val, _ref;
        return val = null != (_ref = grab(Offline.options, key)) ? _ref : grab(defaultOptions, key), "function" == typeof val ? val() : val
    }, "function" == typeof window.addEventListener && window.addEventListener("online", function() {
        return setTimeout(Offline.confirmUp, 100)
    }, !1), "function" == typeof window.addEventListener && window.addEventListener("offline", function() {
        return Offline.confirmDown()
    }, !1), Offline.state = "up", Offline.markUp = function() {
        return Offline.trigger("confirmed-up"), "up" !== Offline.state ? (Offline.state = "up", Offline.trigger("up")) : void 0
    }, Offline.markDown = function() {
        return Offline.trigger("confirmed-down"), "down" !== Offline.state ? (Offline.state = "down", Offline.trigger("down")) : void 0
    }, handlers = {}, Offline.on = function(event, handler, ctx) {
        var e, events, _i, _len, _results;
        if (events = event.split(" "), events.length > 1) {
            for (_results = [], _i = 0, _len = events.length; _len > _i; _i++) e = events[_i], _results.push(Offline.on(e, handler, ctx));
            return _results
        }
        return null == handlers[event] && (handlers[event] = []), handlers[event].push([ctx, handler])
    }, Offline.off = function(event, handler) {
        var ctx, i, _handler, _ref, _results;
        if (null != handlers[event]) {
            if (handler) {
                for (i = 0, _results = []; i < handlers[event].length;) _ref = handlers[event][i], ctx = _ref[0], _handler = _ref[1], _handler === handler ? _results.push(handlers[event].splice(i, 1)) : _results.push(i++);
                return _results
            }
            return handlers[event] = []
        }
    }, Offline.trigger = function(event) {
        var ctx, handler, _i, _len, _ref, _ref1, _results;
        if (null != handlers[event]) {
            for (_ref = handlers[event], _results = [], _i = 0, _len = _ref.length; _len > _i; _i++) _ref1 = _ref[_i], ctx = _ref1[0], handler = _ref1[1], _results.push(handler.call(ctx));
            return _results
        }
    }, checkXHR = function(xhr, onUp, onDown) {
        var checkStatus, _onreadystatechange;
        return checkStatus = function() {
            return xhr.status && xhr.status < 12e3 ? onUp() : onDown()
        }, null !== xhr.onprogress ? (_onreadystatechange = xhr.onreadystatechange, xhr.onreadystatechange = function() {
            return 4 === xhr.readyState ? checkStatus() : 0 === xhr.readyState && onDown(), "function" == typeof _onreadystatechange ? _onreadystatechange.apply(null, arguments) : void 0
        }) : "function" == typeof xhr.addEventListener ? (xhr.addEventListener("error", onDown, !1), xhr.addEventListener("timeout", onDown, !1), xhr.addEventListener("load", checkStatus, !1)) : void 0
    }, Offline.checks = {}, Offline.checks.xhr = function() {
        var e, xhr;
        xhr = new XMLHttpRequest, xhr.offline = !1, xhr.open("HEAD", Offline.getOption("checks.xhr.url"), !0), checkXHR(xhr, Offline.markUp, Offline.markDown);
        try {
            xhr.send()
        } catch (_error) {
            e = _error, Offline.markDown()
        }
        return xhr
    }, Offline.checks.image = function() {
        var img;
        return img = document.createElement("img"), img.onerror = Offline.markDown, img.onload = Offline.markUp, img.src = Offline.getOption("checks.image.url"), void 0
    }, Offline.check = function() {
        return Offline.trigger("checking"), Offline.checks[Offline.getOption("checks.active")]()
    }, Offline.confirmUp = Offline.confirmDown = Offline.check, Offline.onXHR = function(cb) {
        var monitorXHR, _XDomainRequest, _XMLHttpRequest;
        return monitorXHR = function(req, flags) {
            var _open;
            return _open = req.open, req.open = function(type, url, async, user, password) {
                return cb({
                    type: type,
                    url: url,
                    async: async,
                    flags: flags,
                    user: user,
                    password: password,
                    xhr: req
                }), _open.apply(req, arguments)
            }
        }, _XMLHttpRequest = window.XMLHttpRequest, window.XMLHttpRequest = function(flags) {
            var req, _overrideMimeType, _setRequestHeader;
            return req = new _XMLHttpRequest(flags), monitorXHR(req, flags), _setRequestHeader = req.setRequestHeader, req.headers = {}, req.setRequestHeader = function(name, value) {
                return req.headers[name] = value, _setRequestHeader.call(req, name, value)
            }, _overrideMimeType = req.overrideMimeType, req.overrideMimeType = function(type) {
                return req.mimeType = type, _overrideMimeType.call(req, type)
            }, req
        }, extendNative(window.XMLHttpRequest, _XMLHttpRequest), null != window.XDomainRequest ? (_XDomainRequest = window.XDomainRequest, window.XDomainRequest = function() {
            var req;
            return req = new _XDomainRequest, monitorXHR(req), req
        }, extendNative(window.XDomainRequest, _XDomainRequest)) : void 0
    }, init = function() {
        return Offline.getOption("interceptRequests") && Offline.onXHR(function(_arg) {
            var xhr;
            return xhr = _arg.xhr, xhr.offline !== !1 ? checkXHR(xhr, Offline.confirmUp, Offline.confirmDown) : void 0
        }), Offline.getOption("checkOnLoad") ? Offline.check() : void 0
    }, setTimeout(init, 0), window.Offline = Offline
}).call(this),
    function() {
        var down, next, nope, rc, reset, retryIntv, tick, tryNow, up;
        if (!window.Offline) throw new Error("Offline Reconnect brought in without offline.js");
        rc = Offline.reconnect = {}, retryIntv = null, reset = function() {
            var _ref;
            return null != rc.state && "inactive" !== rc.state && Offline.trigger("reconnect:stopped"), rc.state = "inactive", rc.remaining = rc.delay = null != (_ref = Offline.getOption("reconnect.initialDelay")) ? _ref : 3
        }, next = function() {
            var delay, _ref;
            return delay = null != (_ref = Offline.getOption("reconnect.delay")) ? _ref : Math.min(Math.ceil(1.5 * rc.delay), 3600), rc.remaining = rc.delay = delay
        }, tick = function() {
            return "connecting" !== rc.state ? (rc.remaining -= 1, Offline.trigger("reconnect:tick"), 0 === rc.remaining ? tryNow() : void 0) : void 0
        }, tryNow = function() {
            return "waiting" === rc.state ? (Offline.trigger("reconnect:connecting"), rc.state = "connecting", Offline.check()) : void 0
        }, down = function() {
            return Offline.getOption("reconnect") ? (reset(), rc.state = "waiting", Offline.trigger("reconnect:started"), retryIntv = setInterval(tick, 1e3)) : void 0
        }, up = function() {
            return null != retryIntv && clearInterval(retryIntv), reset()
        }, nope = function() {
            return Offline.getOption("reconnect") ? "connecting" === rc.state ? (Offline.trigger("reconnect:failure"), rc.state = "waiting", next()) : void 0 : void 0
        }, rc.tryNow = tryNow, reset(), Offline.on("down", down), Offline.on("confirmed-down", nope), Offline.on("up", up)
    }.call(this),
    function() {
        var clear, flush, held, holdRequest, makeRequest, waitingOnConfirm;
        if (!window.Offline) throw new Error("Requests module brought in without offline.js");
        held = [], waitingOnConfirm = !1, holdRequest = function(req) {
            return Offline.trigger("requests:capture"), "down" !== Offline.state && (waitingOnConfirm = !0), held.push(req)
        }, makeRequest = function(_arg) {
            var body, name, password, type, url, user, val, xhr, _ref;
            xhr = _arg.xhr, url = _arg.url, type = _arg.type, user = _arg.user, password = _arg.password, body = _arg.body, xhr.abort(), xhr.open(type, url, !0, user, password), _ref = xhr.headers;
            for (name in _ref) val = _ref[name], xhr.setRequestHeader(name, val);
            return xhr.mimeType && xhr.overrideMimeType(xhr.mimeType), xhr.send(body)
        }, clear = function() {
            return held = []
        }, flush = function() {
            var key, request, requests, url, _i, _len;
            for (Offline.trigger("requests:flush"), requests = {}, _i = 0, _len = held.length; _len > _i; _i++) request = held[_i], url = request.url.replace(/(\?|&)_=[0-9]+/, function(match, char) {
                return "?" === char ? char : ""
            }), requests["" + request.type.toUpperCase() + " - " + url] = request;
            for (key in requests) request = requests[key], makeRequest(request);
            return clear()
        }, setTimeout(function() {
            return Offline.getOption("requests") !== !1 ? (Offline.on("confirmed-up", function() {
                return waitingOnConfirm ? (waitingOnConfirm = !1, clear()) : void 0
            }), Offline.on("up", flush), Offline.on("down", function() {
                return waitingOnConfirm = !1
            }), Offline.onXHR(function(request) {
                var async, hold, xhr, _onreadystatechange, _send;
                return xhr = request.xhr, async = request.async, xhr.offline !== !1 && (hold = function() {
                    return holdRequest(request)
                }, _send = xhr.send, xhr.send = function(body) {
                    return request.body = body, _send.apply(xhr, arguments)
                }, async) ? null === xhr.onprogress ? (xhr.addEventListener("error", hold, !1), xhr.addEventListener("timeout", hold, !1)) : (_onreadystatechange = xhr.onreadystatechange, xhr.onreadystatechange = function() {
                    return 0 === xhr.readyState ? hold() : 4 === xhr.readyState && (0 === xhr.status || xhr.status >= 12e3) && hold(), "function" == typeof _onreadystatechange ? _onreadystatechange.apply(null, arguments) : void 0
                }) : void 0
            }), Offline.requests = {
                flush: flush,
                clear: clear
            }) : void 0
        }, 0)
    }.call(this),
    function() {
        var RETRY_TEMPLATE, TEMPLATE, addClass, content, createFromHTML, el, flashClass, flashTimeouts, init, removeClass, render, roundTime, _onreadystatechange;
        if (!window.Offline) throw new Error("Offline UI brought in without offline.js");
        TEMPLATE = '<div class="offline-ui"><div class="offline-ui-content"></div></div>', RETRY_TEMPLATE = '<a href class="offline-ui-retry"></a>', createFromHTML = function(html) {
            var el;
            return el = document.createElement("div"), el.innerHTML = html, el.children[0]
        }, el = content = null, addClass = function(name) {
            return removeClass(name), el.className += " " + name
        }, removeClass = function(name) {
            return el.className = el.className.replace(new RegExp("(^| )" + name.split(" ").join("|") + "( |$)", "gi"), " ")
        }, flashTimeouts = {}, flashClass = function(name, time) {
            return addClass(name), null != flashTimeouts[name] && clearTimeout(flashTimeouts[name]), flashTimeouts[name] = setTimeout(function() {
                return removeClass(name), delete flashTimeouts[name]
            }, 1e3 * time)
        }, roundTime = function(sec) {
            var mult, unit, units, val;
            units = {
                day: 86400,
                hour: 3600,
                minute: 60,
                second: 1
            };
            for (unit in units)
                if (mult = units[unit], sec >= mult) return val = Math.floor(sec / mult), [val, unit];
            return ["now", ""]
        }, render = function() {
            var button, handler;
            return el = createFromHTML(TEMPLATE), document.body.appendChild(el), null != Offline.reconnect && Offline.getOption("reconnect") && (el.appendChild(createFromHTML(RETRY_TEMPLATE)), button = el.querySelector(".offline-ui-retry"), handler = function(e) {
                return e.preventDefault(), Offline.reconnect.tryNow()
            }, null != button.addEventListener ? button.addEventListener("click", handler, !1) : button.attachEvent("click", handler)), addClass("offline-ui-" + Offline.state), content = el.querySelector(".offline-ui-content")
        }, init = function() {
            return render(), Offline.on("up", function() {
                return removeClass("offline-ui-down"), addClass("offline-ui-up"), flashClass("offline-ui-up-2s", 2), flashClass("offline-ui-up-5s", 5)
            }), Offline.on("down", function() {
                return removeClass("offline-ui-up"), addClass("offline-ui-down"), flashClass("offline-ui-down-2s", 2), flashClass("offline-ui-down-5s", 5)
            }), Offline.on("reconnect:connecting", function() {
                return addClass("offline-ui-connecting"), removeClass("offline-ui-waiting")
            }), Offline.on("reconnect:tick", function() {
                var time, unit, _ref;
                return addClass("offline-ui-waiting"), removeClass("offline-ui-connecting"), _ref = roundTime(Offline.reconnect.remaining), time = _ref[0], unit = _ref[1], content.setAttribute("data-retry-in-value", time), content.setAttribute("data-retry-in-unit", unit)
            }), Offline.on("reconnect:stopped", function() {
                return removeClass("offline-ui-connecting offline-ui-waiting"), content.setAttribute("data-retry-in-value", null), content.setAttribute("data-retry-in-unit", null)
            }), Offline.on("reconnect:failure", function() {
                return flashClass("offline-ui-reconnect-failed-2s", 2), flashClass("offline-ui-reconnect-failed-5s", 5)
            }), Offline.on("reconnect:success", function() {
                return flashClass("offline-ui-reconnect-succeeded-2s", 2), flashClass("offline-ui-reconnect-succeeded-5s", 5)
            })
        }, "complete" === document.readyState ? init() : null != document.addEventListener ? document.addEventListener("DOMContentLoaded", init, !1) : (_onreadystatechange = document.onreadystatechange, document.onreadystatechange = function() {
            return "complete" === document.readyState && init(), "function" == typeof _onreadystatechange ? _onreadystatechange.apply(null, arguments) : void 0
        })
    }.call(this),
    function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = "function" == typeof require && require;
                    if (!u && a) return a(o, !0);
                    if (i) return i(o, !0);
                    throw new Error("Cannot find module '" + o + "'")
                }
                var f = n[o] = {
                    exports: {}
                };
                t[o][0].call(f.exports, function(e) {
                    var n = t[o][1][e];
                    return s(n ? n : e)
                }, f, f.exports, e, t, n, r)
            }
            return n[o].exports
        }
        for (var i = "function" == typeof require && require, o = 0; o < r.length; o++) s(r[o]);
        return s
    }({
        1: [function(require) {
            (function() {
                var $, Bus, Leg, methods, tourbus, __slice = [].slice;
                $ = jQuery, Bus = require("./modules/bus"), Leg = require("./modules/leg"), tourbus = $.tourbus = function() {
                    var args, method;
                    return args = 1 <= arguments.length ? __slice.call(arguments, 0) : [], method = args[0], methods.hasOwnProperty(method) ? args = args.slice(1) : method instanceof $ ? method = "build" : "string" == typeof method ? (method = "build", args[0] = $(args[0])) : $.error("Unknown method of $.tourbus --", args), methods[method].apply(this, args)
                }, $.fn.tourbus = function() {
                    var args;
                    return args = 1 <= arguments.length ? __slice.call(arguments, 0) : [], this.each(function() {
                        return args.unshift($(this)), tourbus.apply(null, ["build"].concat(__slice.call(args))), this
                    })
                }, methods = {
                    build: function(el, options) {
                        var built;
                        return null == options && (options = {}), options = $.extend(!0, {}, tourbus.defaults, options), built = [], el instanceof $ || (el = $(el)), el.each(function() {
                            return built.push(new Bus(this, options))
                        }), 0 === built.length && $.error("" + el.selector + " was not found!"), 1 === built.length ? built[0] : built
                    },
                    destroyAll: function() {
                        var bus, index, _ref, _results;
                        _ref = Bus._busses, _results = [];
                        for (index in _ref) bus = _ref[index], _results.push(bus.destroy());
                        return _results
                    },
                    expose: function(global) {
                        return global.tourbus = {
                            Bus: Bus,
                            Leg: Leg
                        }
                    }
                }, tourbus.defaults = {
                    debug: !1,
                    autoDepart: !1,
                    container: "body",
                    "class": null,
                    startAt: 0,
                    onDepart: function() {
                        return null
                    },
                    onStop: function() {
                        return null
                    },
                    onLegStart: function() {
                        return null
                    },
                    onLegEnd: function() {
                        return null
                    },
                    leg: {
                        "class": null,
                        scrollTo: null,
                        scrollSpeed: 150,
                        scrollContext: 100,
                        orientation: "bottom",
                        align: "left",
                        width: "auto",
                        margin: 10,
                        top: null,
                        left: null,
                        zindex: 9999,
                        arrow: "50%"
                    }
                }
            }).call(this)
        }, {
            "./modules/bus": 2,
            "./modules/leg": 3
        }],
        2: [function(require, module) {
            (function() {
                var $, Bus, Leg, utils, __slice = [].slice;
                $ = jQuery, Leg = require("./leg"), utils = require("./utils"), module.exports = Bus = function() {
                    function Bus(el, options) {
                        this.options = options, this.id = this.constructor.uniqueId(), this.elId = "tourbus-" + this.id, this.constructor._busses[this.id] = this, this.$original = $(el), this.rawData = this.$original.data(), this.$container = $(utils.dataProp(this.rawData.container, this.options.container)), this.$original.data({
                            tourbus: this
                        }), this.currentLegIndex = null, this.legs = [], this.legEls = this.$original.children("li"), this.totalLegs = this.legEls.length, this._configureElement(), this._setupEvents(), utils.dataProp(this.rawData.autoDepart, this.options.autoDepart) && this.$original.trigger("depart.tourbus"), this._log("built tourbus with el", el.toString(), "and options", this.options)
                    }
                    return Bus._busses = {}, Bus._tours = 0, Bus.uniqueId = function() {
                        return this._tours++
                    }, Bus.prototype.depart = function() {
                        return this.running = !0, this.options.onDepart(this), this._log("departing", this), this.currentLegIndex = utils.dataProp(this.rawData.startAt, this.options.startAt), this.showLeg()
                    }, Bus.prototype.stop = function() {
                        return this.running ? ($.each(this.legs, $.proxy(this.hideLeg, this)), this.currentLegIndex = null, this.options.onStop(this), this.running = !1) : void 0
                    }, Bus.prototype.on = function(event, selector, fn) {
                        return this.$container.on(event, selector, fn)
                    }, Bus.prototype.currentLeg = function() {
                        return null === this.currentLegIndex ? null : this.legs[this.currentLegIndex]
                    }, Bus.prototype.buildLeg = function(i) {
                        var $legEl, data, leg;
                        return $legEl = $(this.legEls[i]), data = $legEl.data(), this.legs[i] = leg = new Leg({
                            bus: this,
                            original: $legEl,
                            target: data.el || "body",
                            index: i,
                            rawData: data
                        }), leg.render(), this.$el.append(leg.$el), leg._position(), leg.hide(), leg
                    }, Bus.prototype.showLeg = function(index) {
                        var leg, preventDefault;
                        return null == index && (index = this.currentLegIndex), leg = this.legs[index] || this.buildLeg(index), this._log("showLeg:", leg), preventDefault = this.options.onLegStart(leg, this), preventDefault !== !1 && leg.show(), ++index < this.totalLegs && !this.legs[index] ? this.buildLeg(index) : void 0
                    }, Bus.prototype.hideLeg = function(index) {
                        var leg, preventDefault;
                        return null == index && (index = this.currentLegIndex), leg = this.legs[index], leg && leg.visible && (this._log("hideLeg:", leg), preventDefault = this.options.onLegEnd(leg, this), preventDefault !== !1 && leg.hide()), --index > 0 && !this.legs[index] ? this.buildLeg(index) : void 0
                    }, Bus.prototype.repositionLegs = function() {
                        return $.each(this.legs, function() {
                            return this.reposition()
                        })
                    }, Bus.prototype.next = function() {
                        return this.hideLeg(), this.currentLegIndex++, this.currentLegIndex > this.totalLegs - 1 ? this.$original.trigger("stop.tourbus") : this.showLeg()
                    }, Bus.prototype.prev = function() {
                        return this.hideLeg(), this.currentLegIndex--, this.currentLegIndex < 0 ? this.$original.trigger("stop.tourbus") : this.showLeg()
                    }, Bus.prototype.destroy = function() {
                        return $.each(this.legs, function() {
                            return this.destroy()
                        }), this.legs = [], delete this.constructor._busses[this.id], this._teardownEvents(), this.$original.removeData("tourbus"), this.$el.remove()
                    }, Bus.prototype._configureElement = function() {
                        return this.$el = $("<div class='tourbus-container'></div>"), this.el = this.$el[0], this.$el.attr({
                            id: this.elId
                        }), this.$el.addClass(utils.dataProp(this.rawData["class"], this.options["class"])), this.$container.append(this.$el)
                    }, Bus.prototype._log = function() {
                        return utils.dataProp(this.rawData.debug, this.options.debug) ? console.log.apply(console, ["TOURBUS " + this.id + ":"].concat(__slice.call(arguments))) : void 0
                    }, Bus.prototype._setupEvents = function() {
                        return this.$original.on("depart.tourbus", $.proxy(this.depart, this)), this.$original.on("stop.tourbus", $.proxy(this.stop, this)), this.$original.on("next.tourbus", $.proxy(this.next, this)), this.$original.on("prev.tourbus", $.proxy(this.prev, this))
                    }, Bus.prototype._teardownEvents = function() {
                        return this.$original.off(".tourbus")
                    }, Bus
                }()
            }).call(this)
        }, {
            "./leg": 3,
            "./utils": 4
        }],
        3: [function(require, module) {
            (function() {
                var $, Leg, utils, _addRule;
                $ = jQuery, utils = require("./utils"), module.exports = Leg = function() {
                    function Leg(options) {
                        if (this.options = options, this.$original = this.options.original, this.bus = this.options.bus, this.rawData = this.options.rawData, this.index = this.options.index, this.$target = $(this.options.target), this.id = "" + this.bus.id + "-" + this.options.index, this.elId = "tourbus-leg-" + this.id, this.visible = !1, 0 === this.$target.length) throw "" + this.$target.selector + " is not an element!";
                        this.content = this.$original.html(), this._setupOptions(), this._configureElement(), this._configureTarget(), this._configureScroll(), this._setupEvents(), this.bus._log("leg " + this.index + " made with options", this.options)
                    }
                    return Leg.prototype.render = function() {
                        var arrowClass, html;
                        return arrowClass = "centered" === this.options.orientation ? "" : "tourbus-arrow", this.$el.addClass(" " + arrowClass + " tourbus-arrow-" + this.options.orientation + " "), html = "<div class='tourbus-leg-inner'>\n  " + this.content + "\n</div>", this.$el.css({
                            width: this.options.width,
                            zIndex: this.options.zindex
                        }).html(html), this
                    }, Leg.prototype.destroy = function() {
                        return this.$el.remove(), this._teardownEvents()
                    }, Leg.prototype.reposition = function() {
                        return this._configureTarget(), this._position()
                    }, Leg.prototype._position = function() {
                        var css, keys, rule, selector;
                        return "centered" !== this.options.orientation && (rule = {}, keys = {
                            top: "left",
                            bottom: "left",
                            left: "top",
                            right: "top"
                        }, "number" == typeof this.options.arrow && (this.options.arrow += "px"), rule[keys[this.options.orientation]] = this.options.arrow, selector = "#" + this.elId + ".tourbus-arrow", this.bus._log("adding rule for " + this.elId, rule), _addRule("" + selector + ":before, " + selector + ":after", rule)), css = this._offsets(), this.bus._log("setting offsets on leg", css), this.$el.css(css)
                    }, Leg.prototype.show = function() {
                        return this.visible = !0, this.$el.css({
                            visibility: "visible",
                            opacity: 1,
                            zIndex: this.options.zindex
                        }), this.scrollIntoView()
                    }, Leg.prototype.hide = function() {
                        return this.visible = !1, this.bus.options.debug ? this.$el.css({
                            visibility: "visible",
                            opacity: .4,
                            zIndex: 0
                        }) : this.$el.css({
                            visibility: "hidden"
                        })
                    }, Leg.prototype.scrollIntoView = function() {
                        var scrollTarget;
                        if (this.willScroll) return scrollTarget = utils.dataProp(this.options.scrollTo, this.$el), this.bus._log("scrolling to", scrollTarget, this.scrollSettings), $.scrollTo(scrollTarget, this.scrollSettings)
                    }, Leg.prototype._setupOptions = function() {
                        var dataProps, globalOptions, prop, _i, _len, _results;
                        for (globalOptions = this.bus.options.leg, dataProps = ["class", "top", "left", "scrollTo", "scrollSpeed", "scrollContext", "margin", "arrow", "align", "width", "zindex", "orientation"], _results = [], _i = 0, _len = dataProps.length; _len > _i; _i++) prop = dataProps[_i], _results.push(this.options[prop] = utils.dataProp(this.rawData[prop], globalOptions[prop]));
                        return _results
                    }, Leg.prototype._configureElement = function() {
                        return this.$el = $("<div class='tourbus-leg'></div>"), this.el = this.$el[0], this.$el.attr({
                            id: this.elId
                        }), this.$el.addClass(this.options["class"]), this.$el.css({
                            zIndex: this.options.zindex
                        })
                    }, Leg.prototype._setupEvents = function() {
                        return this.$el.on("click", ".tourbus-next", $.proxy(this.bus.next, this.bus)), this.$el.on("click", ".tourbus-prev", $.proxy(this.bus.prev, this.bus)), this.$el.on("click", ".tourbus-stop", $.proxy(this.bus.stop, this.bus))
                    }, Leg.prototype._teardownEvents = function() {
                        return this.$el.off("click")
                    }, Leg.prototype._configureTarget = function() {
                        return this.targetOffset = this.$target.offset(), utils.dataProp(this.options.top, !1) && (this.targetOffset.top = this.options.top), utils.dataProp(this.options.left, !1) && (this.targetOffset.left = this.options.left), this.targetWidth = this.$target.outerWidth(), this.targetHeight = this.$target.outerHeight()
                    }, Leg.prototype._configureScroll = function() {
                        return this.willScroll = $.fn.scrollTo && this.options.scrollTo !== !1, this.scrollSettings = {
                            offset: -this.options.scrollContext,
                            easing: "linear",
                            axis: "y",
                            duration: this.options.scrollSpeed
                        }
                    }, Leg.prototype._offsets = function() {
                        var dimension, elHalf, elHeight, elWidth, offsets, targetHalf, targetHeightOverride, validOrientations;
                        switch (elHeight = this.$el.height(), elWidth = this.$el.width(), offsets = {}, this.options.orientation) {
                            case "centered":
                                targetHeightOverride = $(window).height(), offsets.top = this.options.top, utils.dataProp(offsets.top, !1) || (offsets.top = targetHeightOverride / 2 - elHeight / 2), offsets.left = this.targetWidth / 2 - elWidth / 2;
                                break;
                            case "left":
                                offsets.top = this.targetOffset.top, offsets.left = this.targetOffset.left - elWidth - this.options.margin;
                                break;
                            case "right":
                                offsets.top = this.targetOffset.top, offsets.left = this.targetOffset.left + this.targetWidth + this.options.margin;
                                break;
                            case "top":
                                offsets.top = this.targetOffset.top - elHeight - this.options.margin, offsets.left = this.targetOffset.left;
                                break;
                            case "bottom":
                                offsets.top = this.targetOffset.top + this.targetHeight + this.options.margin, offsets.left = this.targetOffset.left
                        }
                        if (validOrientations = {
                                top: ["left", "right"],
                                bottom: ["left", "right"],
                                left: ["top", "bottom"],
                                right: ["top", "bottom"]
                            }, utils.include(this.options.orientation, validOrientations[this.options.align])) switch (this.options.align) {
                            case "right":
                                offsets.left += this.targetWidth - elWidth;
                                break;
                            case "bottom":
                                offsets.top += this.targetHeight - elHeight
                        } else "center" === this.options.align && (utils.include(this.options.orientation, validOrientations.left) ? (targetHalf = this.targetWidth / 2, elHalf = elWidth / 2, dimension = "left") : (targetHalf = this.targetHeight / 2, elHalf = elHeight / 2, dimension = "top"), targetHalf > elHalf ? offsets[dimension] += targetHalf - elHalf : offsets[dimension] -= elHalf - targetHalf);
                        return offsets
                    }, Leg
                }(), _addRule = function(styleTag) {
                    var sheet;
                    return styleTag.type = "text/css", document.getElementsByTagName("head")[0].appendChild(styleTag), sheet = document.styleSheets[document.styleSheets.length - 1],
                        function(selector, css) {
                            var key, propText;
                            propText = $.map(function() {
                                var _results;
                                _results = [];
                                for (key in css) _results.push(key);
                                return _results
                            }(), function(p) {
                                return "" + p + ":" + css[p]
                            }).join(";");
                            try {
                                sheet.insertRule ? sheet.insertRule("" + selector + " { " + propText + " }", (sheet.cssRules || sheet.rules).length) : sheet.addRule(selector, propText)
                            } catch (_error) {}
                        }
                }(document.createElement("style"))
            }).call(this)
        }, {
            "./utils": 4
        }],
        4: [function(require, module) {
            (function() {
                module.exports = {
                    dataProp: function(possiblyFalsy, alternative) {
                        return null === possiblyFalsy || "undefined" == typeof possiblyFalsy ? alternative : possiblyFalsy
                    },
                    include: function(value, array) {
                        return -1 !== $.inArray(value, array || [])
                    }
                }
            }).call(this)
        }, {}]
    }, {}, [1, 2, 3, 4]),
    function(root, pluralize) {
        "function" == typeof require && "object" == typeof exports && "object" == typeof module ? module.exports = pluralize() : "function" == typeof define && define.amd ? define(function() {
            return pluralize()
        }) : root.pluralize = pluralize()
    }(this, function() {
        var pluralRules = [],
            singularRules = [],
            uncountables = {},
            irregularPlurals = {},
            irregularSingles = {},
            toLowerCase = function(str) {
                return str.toLowerCase()
            },
            toUpperCase = function(str) {
                return str.toUpperCase()
            },
            toTitleCase = function(str) {
                return toUpperCase(str[0]) + toLowerCase(str.substr(1))
            },
            toWord = function(word) {
                return String(word).trim()
            },
            toLowerWord = function(word) {
                return toLowerCase(toWord(word))
            },
            sanitizeRule = function(rule) {
                return "string" == typeof rule ? new RegExp("^" + rule + "$") : rule
            },
            restoreCase = function(token) {
                return token === token.toUpperCase() ? toUpperCase : token[0] === token[0].toUpperCase() ? toTitleCase : toLowerCase
            },
            sanitizeWord = function(word, collection) {
                if (!word.length || uncountables[word]) return word;
                for (var len = collection.length; len--;) {
                    var rule = collection[len];
                    if (rule[0].test(word)) return word.replace(rule[0], rule[1])
                }
                return word
            },
            replaceWord = function(replaceMap, keepMap, rules) {
                return function(word) {
                    word = toWord(word);
                    var token = toLowerCase(word),
                        restore = restoreCase(word);
                    return keepMap[token] ? restore(token) : replaceMap[token] ? restore(replaceMap[token]) : restore(sanitizeWord(token, rules))
                }
            },
            pluralize = function(word, count, inclusive) {
                var pluralized = 1 === count ? singular(word) : plural(word);
                return (inclusive ? count + " " : "") + pluralized
            },
            plural = pluralize.plural = replaceWord(irregularSingles, irregularPlurals, pluralRules),
            singular = pluralize.singular = replaceWord(irregularPlurals, irregularSingles, singularRules);
        return pluralize.addPluralRule = function(rule, replacement) {
            pluralRules.push([sanitizeRule(rule), replacement])
        }, pluralize.addSingularRule = function(rule, replacement) {
            singularRules.push([sanitizeRule(rule), replacement])
        }, pluralize.addUncountableRule = function(word) {
            return "string" == typeof word ? uncountables[toLowerWord(word)] = !0 : (pluralize.addPluralRule(word, "$&"), pluralize.addSingularRule(word, "$&"), void 0)
        }, pluralize.addIrregularRule = function(single, plural) {
            plural = toLowerWord(plural), single = toLowerWord(single), irregularSingles[single] = plural, irregularPlurals[plural] = single
        }, [
            ["I", "we"],
            ["me", "us"],
            ["he", "they"],
            ["she", "they"],
            ["them", "them"],
            ["myself", "ourselves"],
            ["yourself", "yourselves"],
            ["itself", "themselves"],
            ["herself", "themselves"],
            ["himself", "themselves"],
            ["themself", "themselves"],
            ["this", "these"],
            ["that", "those"],
            ["volcano", "volcanoes"],
            ["tornado", "tornadoes"],
            ["torpedo", "torpedoes"],
            ["genus", "genera"],
            ["viscus", "viscera"],
            ["stigma", "stigmata"],
            ["stoma", "stomata"],
            ["dogma", "dogmata"],
            ["lemma", "lemmata"],
            ["schema", "schemata"],
            ["anathema", "anathemata"],
            ["ox", "oxen"],
            ["axe", "axes"],
            ["die", "dice"],
            ["yes", "yeses"],
            ["foot", "feet"],
            ["eave", "eaves"],
            ["beau", "beaus"],
            ["goose", "geese"],
            ["tooth", "teeth"],
            ["quiz", "quizzes"],
            ["human", "humans"],
            ["proof", "proofs"],
            ["carve", "carves"],
            ["valve", "valves"],
            ["thief", "thieves"],
            ["genie", "genies"],
            ["groove", "grooves"],
            ["pickaxe", "pickaxes"],
            ["whiskey", "whiskies"]
        ].forEach(function(rule) {
            return pluralize.addIrregularRule(rule[0], rule[1])
        }), [
            [/s?$/, "s"],
            [/([^aeiou]ese)$/, "$1"],
            [/^(ax|test)is$/, "$1es"],
            [/(alias|[^aou]us|tlas|gas|ris)$/, "$1es"],
            [/(e[mn]u)s?$/, "$1s"],
            [/([^l]ias|[aeiou]las|[emjzr]as|[iu]am)$/, "$1"],
            [/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc)(?:us|i)$/, "$1i"],
            [/^(alumn|alg|vertebr)(?:a|ae)$/, "$1ae"],
            [/(her|at)o$/, "$1oes"],
            [/^(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/, "$1a"],
            [/^(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|\w+hedr)(?:a|on)$/, "$1a"],
            [/sis$/, "ses"],
            [/(?:([^f])fe|(ar|l|[eo][ao])f)$/, "$1$2ves"],
            [/([^aeiouy]|qu)y$/, "$1ies"],
            [/([^ch][ieo][ln])ey$/, "$1ies"],
            [/(x|ch|ss|sh|zz)$/, "$1es"],
            [/(matr|cod|mur|sil|vert|ind)(?:ix|ex)$/, "$1ices"],
            [/^(m|l)(?:ice|ouse)$/, "$1ice"],
            [/(pe)(?:rson|ople)$/, "$1ople"],
            [/(child)(?:ren)?$/, "$1ren"],
            [/(eau)x?$/, "$1x"],
            [/m[ae]n$/, "men"]
        ].forEach(function(rule) {
            return pluralize.addPluralRule(rule[0], rule[1])
        }), [
            [/s$/, ""],
            [/(ss)$/, "$1"],
            [/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)(?:sis|ses)$/, "$1sis"],
            [/(^analy)(?:sis|ses)$/, "$1sis"],
            [/([^aeflor])ves$/, "$1fe"],
            [/(hive|tive|dr?ive)s$/, "$1"],
            [/(ar|(?:wo|[ae])l|[eo][ao])ves$/, "$1f"],
            [/([^aeiouy]|qu)ies$/, "$1y"],
            [/(^[pl]|zomb|^(?:neck)?t|[aeo][lt]|cut)ies$/, "$1ie"],
            [/([^c][eor]n|smil)ies$/, "$1ey"],
            [/^(m|l)ice$/, "$1ouse"],
            [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|tlas|gas|hero|ato|ris)(?:es)?$/, "$1"],
            [/(e[mn]u)s?$/, "$1"],
            [/(movie|twelve)s$/, "$1"],
            [/(cris|test|diagnos)(?:is|es)$/, "$1is"],
            [/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc)(?:us|i)$/, "$1us"],
            [/^(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)a$/, "$1um"],
            [/^(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|\w+hedr)a$/, "$1on"],
            [/^(alumn|alg|vertebr)ae$/, "$1a"],
            [/(cod|mur|sil|vert|ind)ices$/, "$1ex"],
            [/(matr)ices$/, "$1ix"],
            [/(pe)(rson|ople)$/, "$1rson"],
            [/(child)ren$/, "$1"],
            [/(eau)[sx]?$/, "$1"],
            [/men$/, "man"]
        ].forEach(function(rule) {
            return pluralize.addSingularRule(rule[0], rule[1])
        }), ["advice", "agenda", "bison", "bream", "buffalo", "carp", "chassis", "cod", "cooperation", "corps", "digestion", "debris", "diabetes", "energy", "equipment", "elk", "excretion", "expertise", "flounder", "gallows", "graffiti", "headquarters", "health", "herpes", "highjinks", "homework", "information", "jeans", "justice", "kudos", "labour", "machinery", "mackerel", "media", "mews", "moose", "news", "pike", "plankton", "pliers", "pollution", "premises", "rain", "rice", "salmon", "scissors", "series", "sewage", "shambles", "shrimp", "species", "staff", "swine", "trout", "tuna", "whiting", "wildebeest", /pox$/, /ois$/, /deer$/, /fish$/, /sheep$/, /measles$/, /[^aeiou]ese$/].forEach(pluralize.addUncountableRule), pluralize
    }),
    function(e, t, n) {
        e.fn.sss = function(r) {
            var i = e.extend({
                slideShow: !0,
                startOn: 0,
                speed: 3500,
                transition: 400,
                arrows: !0
            }, r);
            return this.each(function() {
                function y(e) {
                    return s.eq(e).height() / o.width() * 100 + "%"
                }

                function b(e) {
                    if (!c) {
                        c = !0;
                        var t = s.eq(e);
                        t.fadeIn(a), s.not(t).fadeOut(a), o.animate({
                            paddingBottom: y(e)
                        }, a, function() {
                            c = !1
                        }), g()
                    }
                }

                function w() {
                    l = l === u - 1 ? 0 : l + 1, b(l)
                }

                function E() {
                    l = 0 === l ? u - 1 : l - 1, b(l)
                }
                var h, p, d, v, m, r = e(this),
                    s = r.children().wrapAll('<div class="sss"/>').addClass("ssslide"),
                    o = r.find(".sss"),
                    u = s.length,
                    a = i.transition,
                    f = i.startOn,
                    l = f > u - 1 ? 0 : f,
                    c = !1,
                    g = i.slideShow ? function() {
                        clearTimeout(p), p = setTimeout(w, i.speed)
                    } : e.noop;
                i.arrows && o.append('<div class="sssprev"/>', '<div class="sssnext"/>'), m = o.find(".sssnext"), v = o.find(".sssprev"), e(t).load(function() {
                    o.css({
                        paddingBottom: y(l)
                    }).click(function(t) {
                        h = e(t.target), h.is(m) ? w() : h.is(v) && E()
                    }), b(l), e(n).keydown(function(e) {
                        d = e.keyCode, 39 === d ? w() : 37 === d && E()
                    })
                })
            })
        }
    }(jQuery, window, document), asyncScripts = {
        optimizely: "//cdn.optimizely.com/js/1706060344.js"
    }, loadScript(asyncScripts), "function" != typeof Object.create && (Object.create = function(o) {
        function F() {}
        return F.prototype = o, new F
    }), "function" != typeof String.prototype.toTitleCase && (String.prototype.toTitleCase = function() {
        return this.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        })
    }), "function" != typeof String.prototype.toProperCase && (String.prototype.toProperCase = function() {
        return this.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        })
    }), "function" != typeof Number.prototype.round && (Number.prototype.round = function(decimalPlaces) {
        "number" != typeof decimalPlaces && (decimalPlaces = 2);
        var multiplier = Math.pow(10, decimalPlaces);
        return Math.round(this * multiplier) / multiplier
    }), "function" != typeof String.prototype.trim && (String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, "")
    }), $(document).ready(function() {
        function switchTab($this) {
            $classs = $this.attr("class").split(/\s/)[0], $new_panel = $(".work-panels ." + $classs), $this.hasClass("selected") || ($tab.toggleClass("selected").toggleClass("hide"), $panel.toggleClass("selected").toggleClass("hide"), $tab = $this.toggleClass("selected").toggleClass("hide"), $panel = $new_panel.toggleClass("selected").toggleClass("hide"))
        }

        function scrollToHash() {
            var hash = window.location.hash,
                str = hash.replace("_industry", "");
            0 !== $(str).length && $(document.body).animate({
                scrollTop: $(str).offset().top - 120
            }, 2e3)
        }
        $(".tip").tipr(), $(".mobile-dropdown .product-link").on("click", function() {
            $(".product-dropdown").toggleClass("mobile-open")
        }), $(".nav-toggle").on("click", function(e) {
            e.preventDefault(), $(".static-topbar").toggleClass("topbar-open"), $("body").toggleClass("nav-overflow-hidden"), $(".product-dropdown").removeClass("mobile-open")
        });
        var $tabs = $(".static-tabs a"),
            $tab = $(".static-tabs .selected"),
            $panel = $(".work-panels .selected");
        $tabs.on("click", function() {
            $this = $(this), switchTab($this)
        }), $(window).load(function() {
            window.location.hash && -1 != window.location.href.indexOf("work/customers") && ($(".js-industry").trigger("click"), scrollToHash())
        }), $(".work .js-play").click(function(e) {
            var className = $(this).attr("class").split(/\s/)[0];
            e.preventDefault(), $("." + className).removeClass("hidden"), $(".challenge_modal").filter("." + className).removeClass("hidden").addClass("animated fadeIn"), $(".challenge-title").html($(e.currentTarget).data("name")), $(".close_challenge_modal").click(function(e) {
                e.preventDefault(), $(".challenge_modal").addClass("hidden");
                var vid = $(".challenge_modal .challenge_body iframe").filter("." + className);
                if (vid.length > 0) {
                    var src = vid.attr("src");
                    vid.attr("src", ""), vid.attr("src", src)
                }
            })
        })
    });