/** 
 * VanillaSmoothie.js v1.1.0
 * https://kimulaco.github.io/vanilla-smoothie/
 * 
 * Copyright (c) kimulaco
 * This software is released under the MIT License.
 * https://github.com/kimulaco/vanilla-smoothie/blob/develop/LICENSE
 * 
 * Date: Thu, 18 Apr 2019 11:25:15 GMT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global['vanilla-smoothie'] = factory());
}(this, function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var win = window;
  var doc = win.document;
  var history = win.history && win.history.pushState ? win.history : null;
  var body = doc.body;
  var rootElement = doc.documentElement;

  var requestAnimationFrame = win.requestAnimationFrame || win.mozRequestAnimationFrame || win.webkitRequestAnimationFrame || function (func) {
    win.setTimeout(func, 15);
  };

  var clock = Date.now();
  var time = 500;
  var context = win;
  var start = context.scrollTop || win.pageYOffset;
  var end = 0;
  var hash = '';
  var callbackFunc = null;

  var easeInOutCubic = function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };

  var getScrollPageBottom = function getScrollPageBottom() {
    return Math.max.apply(null, [body.clientHeight, body.scrollHeight, rootElement.scrollHeight, rootElement.clientHeight]) - win.innerHeight;
  };

  var getTargetTop = function getTargetTop(target) {
    var targetElement = {};

    if (typeof target === 'number') {
      return target;
    } else if (typeof target === 'string') {
      if (target[0] === '#') {
        hash = target;
      }

      targetElement = doc.querySelector(target);

      if (!targetElement) {
        return false;
      }

      return targetElement.getBoundingClientRect().top + win.pageYOffset;
    }

    return false;
  };

  var getScrollTop = function getScrollTop(startV, endV, elapsed, duration) {
    if (elapsed > duration) {
      return endV;
    }

    return startV + (end - startV) * easeInOutCubic(elapsed / duration);
  };

  var scrollFrame = function scrollFrame() {
    var elapsed = Date.now() - clock;

    if (context === win) {
      win.scroll(0, getScrollTop(start, end, elapsed, time));
    } else {
      context.scrollTop = getScrollTop(start, end, elapsed, time);
    }

    if (elapsed <= time) {
      requestAnimationFrame(scrollFrame);
    } else {
      if (hash) {
        history.pushState(null, null, hash);
      }

      hash = '';

      if (typeof callbackFunc === 'function') {
        callbackFunc();
      }
    }
  };

  var VanillaSmoothie = function () {
    function VanillaSmoothie() {
      _classCallCheck(this, VanillaSmoothie);
    }

    _createClass(VanillaSmoothie, [{
      key: "scrollTo",
      value: function scrollTo(target, duration, root, callback) {
        clock = Date.now();
        time = duration || 500;
        context = root || win;
        start = context.scrollTop || window.pageYOffset;
        end = getTargetTop(target);
        callbackFunc = callback;
        scrollFrame();
      }
    }, {
      key: "scrollTop",
      value: function scrollTop(duration, root, callback) {
        this.scrollTo(0, duration, root, callback);
      }
    }, {
      key: "scrollBottom",
      value: function scrollBottom(duration, root, callback) {
        this.scrollTo(getScrollPageBottom(), duration, root, callback);
      }
    }]);

    return VanillaSmoothie;
  }();

  var vanillaSmoothie = new VanillaSmoothie();

  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) !== 'object' && typeof module === 'undefined' && typeof window !== 'undefined') {
    window.vanillaSmoothie = new VanillaSmoothie();
  }

  return vanillaSmoothie;

}));
