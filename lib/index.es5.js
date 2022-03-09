function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function h(tag, attrs, children) {
  var _elem$classList;

  var id = tag.match(/#[\w\d_-]+/);
  var classArr = tag.match(/\.[\w\d_-]+/g) || [];
  classArr = classArr.map(function (it) {
    return it.substring(1);
  });
  tag = tag.match(/^[\w\d]+/)[0];
  var elem = document.createElement(tag);
  if (id) elem.id = id[0].substring(1);

  if (Array.isArray(attrs)) {
    children = attrs;
  } else if (_typeof(attrs) === 'object' && attrs !== null) {
    for (var attr in attrs) {
      if (attr === 'style' || attr === 'dataset') {
        for (var key in attrs[attr]) {
          elem[attr][key] = attrs[attr][key];
        }
      } else if (attr === 'classList' && Array.isArray(attrs[attr])) {
        classArr = classArr.concat(attrs[attr]);
      } else {
        elem[attr] = attrs[attr];
      }
    }
  } else if (typeof attrs === 'string' || typeof attrs === 'number') {
    elem.textContent = String(attrs);
  }

  if (classArr) (_elem$classList = elem.classList).add.apply(_elem$classList, _toConsumableArray(classArr));

  if (children) {
    children.forEach(function (child) {
      if (child instanceof HTMLElement) elem.appendChild(child);else if (child !== null && child !== undefined) console.error(child, 'not instance of HTMLElement');
    });
  }

  return elem;
}

var config = {
  cssId: 'jacontextmenu-css',
  wrapperClassName: 'jacontextmenu',
  defaultMenuWidth: 200,
  // childMenuWidth: 150, // 自动继承父菜单宽度
  menuItemHeight: 24,
  menuItemDivideLineMargin: 5,
  // type == 'divide'
  baseZIndex: 1000 // 基准z-index

};

var MenuItem = /*#__PURE__*/function () {
  function MenuItem(level, item, parentMenu) {
    _classCallCheck(this, MenuItem);

    this.parentMenu = parentMenu;
    this.level = level;
    this.itemOption = item;
    this.init();
  }

  _createClass(MenuItem, [{
    key: "init",
    value: function init() {
      var _this = this;

      var item = this.itemOption;

      if (item.type === 'divide' || item.type === '---') {
        this.el = h('li.divide');
      } else {
        this.el = h('li', {
          classList: item.disabled ? ['disabled'] : [],
          onclick: function onclick(e) {
            if (!item.disabled) {
              var payload = _this.parentMenu.payload;
              item.onclick && item.onclick(e, payload);
              if (!item.children) _this.parentMenu.closeAllMenus();
            }
          },
          onmouseenter: item.children ? function (e) {
            _this.showChildMenu(e);
          } : function () {
            _this.hideOtherChildMenu();
          }
        }, [h('span.label', item.label), item.tip && h('span.tip', item.tip), item.children && h('span.right-arrow')]);
      }

      if (item.children) {
        if (!item.children.width) item.children.width = this.parentMenu.width;
        this.childMenu = new Menu(this.level + 1, item.children);
      }
    }
  }, {
    key: "showChildMenu",
    value: function showChildMenu(e) {
      var childMenuEle = this.childMenu.el;

      if (!e.target.contains(childMenuEle)) {
        e.target.classList.add(config.wrapperClassName + '_hover');
        childMenuEle.style.display = 'block';
        var childMenuHeight = parseFloat(getComputedStyle(childMenuEle).height);
        var liPosition = e.target.getBoundingClientRect();
        var translateX = this.parentMenu.width - 5;
        var translateY = -2;

        if (window.innerWidth - liPosition.x - this.parentMenu.width < this.childMenu.width) {
          translateX = -this.childMenu.width + 5;
        }

        if (window.innerWidth - liPosition.y + 2 < childMenuHeight) {
          translateY = -childMenuHeight + config.menuItemHeight + 2 + 1;
        }

        this.childMenu.removeChildMenus();
        childMenuEle.style.transform = "translate(".concat(translateX, "px, ").concat(translateY, "px)");
      }

      this.el.appendChild(childMenuEle);
      this.childMenu.removeAllHover();
      this.childMenu.payload = this.parentMenu.payload;
    }
  }, {
    key: "hideOtherChildMenu",
    value: function hideOtherChildMenu() {
      var _a, _b;

      (_a = this.parentMenu) === null || _a === void 0 ? void 0 : _a.removeChildMenus();
      (_b = this.parentMenu) === null || _b === void 0 ? void 0 : _b.removeItemHover();
    }
  }]);

  return MenuItem;
}();

var Menu = /*#__PURE__*/function () {
  function Menu(level, option, innerOption) {
    _classCallCheck(this, Menu);

    this.height = 0;
    this.children = [];
    this.level = level;
    this.items = option.items;
    this.width = option.width || config.defaultMenuWidth;
    this.innerOption = innerOption;
    this.init();
    this.addChildren(option.items);
  }

  _createClass(Menu, [{
    key: "init",
    value: function init() {
      var _a;

      this.el = h("ul.".concat(config.wrapperClassName, ".").concat(config.wrapperClassName, "-lv").concat(this.level), {
        dataset: {
          lv: this.level
        },
        style: {
          width: this.width + 'px',
          zIndex: +config.baseZIndex + this.level,
          position: (_a = this.innerOption) === null || _a === void 0 ? void 0 : _a.position
        },
        onclick: function onclick(e) {
          return e.stopPropagation();
        },
        oncontextmenu: function oncontextmenu(e) {
          e.stopPropagation();
          e.preventDefault();
        }
      });
    }
  }, {
    key: "addChildren",
    value: function addChildren(items) {
      var _this2 = this;

      if (!Array.isArray(items)) {
        return console.error('option.items is not type of array');
      }

      var _iterator = _createForOfIteratorHelper(items),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var it = _step.value;
          this.children.push(new MenuItem(this.level, it, this));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.children.forEach(function (item) {
        _this2.el.appendChild(item.el);
      });
    }
  }, {
    key: "show",
    value: function show(e, payload) {
      this.payload = payload;
      e.preventDefault();
      e.stopPropagation();
      this.removeAllHover();
      this.removeChildMenus();
      this.calcPosition(e);
      this.el.style.display = 'block';
    }
  }, {
    key: "calcPosition",
    value: function calcPosition(e) {
      var scrollWidth = window.outerWidth - window.innerWidth;
      this.height = parseFloat(getComputedStyle(this.el).height);
      var translateX = e.clientX;
      var translateY = e.clientY + (this.level === 0 && !this.innerOption.position ? window.scrollY : 0);

      if (window.innerWidth - e.clientX - scrollWidth < this.width) {
        translateX = e.clientX - this.width;
      }

      if (window.innerHeight - e.clientY - scrollWidth < this.height) {
        translateY = e.clientY - this.height;
      }

      this.el.style.transform = "translate(".concat(translateX, "px,").concat(translateY, "px)");
    }
  }, {
    key: "hide",
    value: function hide() {
      this.el.style.display = 'none';
    }
  }, {
    key: "removeAllHover",
    value: function removeAllHover() {
      this.children.forEach(function (item) {
        item.el.classList.remove("".concat(config.wrapperClassName, "_hover"));
      });
    }
  }, {
    key: "removeChildMenus",
    value: function removeChildMenus() {
      this.children.forEach(function (item) {
        var _a;

        (_a = item.childMenu) === null || _a === void 0 ? void 0 : _a.el.remove();
      });
    }
  }, {
    key: "removeItemHover",
    value: function removeItemHover() {
      this.children.forEach(function (childItem) {
        childItem.el.classList.remove("".concat(config.wrapperClassName, "_hover"));
      });
    }
  }, {
    key: "closeAllMenus",
    value: function closeAllMenus() {
      var menus = document.querySelectorAll(".".concat(config.wrapperClassName));
      menus.forEach(function (menu) {
        var level = menu.dataset.lv;

        if (+level > 0) {
          menu.remove();
        } else {
          menu.style.display = 'none';
        }
      });
    }
  }]);

  return Menu;
}();

var _cssStr = "\n  .".concat(config.wrapperClassName, ", .").concat(config.wrapperClassName, " *{\n    box-sizing: border-box;\n  }\n  .").concat(config.wrapperClassName, "{\n    -webkit-user-select:none;\n    user-select: none;\n    border: 1px solid #ddd;\n    left: 0;top:0;\n    background-color: #fff;\n    padding: 2px 0 2px 0px;\n    margin: 0;\n    cursor: default;\n    width: ").concat(config.defaultMenuWidth, "px;\n    display: none;\n  }\n  /*\u4E3B\u83DC\u5355*/\n  .").concat(config.wrapperClassName, "[data-lv=\"0\"]{ \n    position: absolute;\n  }\n  /*\u5B50\u83DC\u5355*/\n  .").concat(config.wrapperClassName, " .").concat(config.wrapperClassName, "{ \n    position: absolute;\n  }\n  .").concat(config.wrapperClassName, " .divide{\n    margin: ").concat(config.menuItemDivideLineMargin, "px 0;\n    height: 1px;\n    background-color: #ddd;\n  }\n  .").concat(config.wrapperClassName, " li {\n    position: relative;\n    padding: 0 30px 0 30px;\n    list-style: none;\n    line-height: ").concat(config.menuItemHeight, "px;\n    font-size: 13px;\n    display: flex;\n    justify-content: space-between;\n    flex-wrap: nowrap;\n  }\n  .").concat(config.wrapperClassName, " li.disabled{\n    color: #aaa;\n    pointer-events: none;\n  }\n  .").concat(config.wrapperClassName, " li span.label {\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n  .").concat(config.wrapperClassName, " li span.tip{\n    color:#aaa;\n    font-size: 12px;\n  }\n  .").concat(config.wrapperClassName, " li:hover:not(.divide):not(.disabled),\n  .").concat(config.wrapperClassName, " li.").concat(config.wrapperClassName, "_hover{\n    background-color: #eee;\n  }\n  .").concat(config.wrapperClassName, " li:hover:not(.divide):not(.disabled) .tip,\n  .").concat(config.wrapperClassName, " li.").concat(config.wrapperClassName, "_hover .tip{\n    color: #000;\n  }\n  .").concat(config.wrapperClassName, " li .right-arrow {\n    position: absolute;\n    right: 8px;\n    top: 9px;\n    border-top: 4px solid rgba(0,0,0,0);\n    border-left: 4px solid #000;\n    border-right: 4px solid rgba(0,0,0,0);\n    border-bottom: 4px solid rgba(0,0,0,0);\n  }\n  .").concat(config.wrapperClassName, "_child{\n  }\n  ");

var ContextMenu = /*#__PURE__*/function () {
  function ContextMenu(option) {
    _classCallCheck(this, ContextMenu);

    this.storeMenus = [];
    this.injectCss();
    this.hideMenuEventListener();
    var defaultConfig = {
      fixMenuWhenScroll: false,
      hideMenuWhenScroll: true
    };
    this.option = Object.assign(defaultConfig, option);

    if (this.option.hideMenuWhenScroll) {
      this.scrollListener();
    }
  }

  _createClass(ContextMenu, [{
    key: "injectCss",
    value: function injectCss() {
      var style = document.querySelector("#".concat(config.cssId));

      if (!style) {
        style = h("style#".concat(config.cssId), {
          innerHTML: _cssStr
        });
        document.head.appendChild(style);
      }
    }
  }, {
    key: "hideMenuEventListener",
    value: function hideMenuEventListener() {
      var _this3 = this;

      if (!this.clickEventFunc) {
        this.clickEventFunc = function () {
          if (_this3.storeMenus.some(function (it) {
            return it.el.style.display === 'block';
          })) {
            _this3.hideAllMenu();
          }
        };

        window.addEventListener('click', this.clickEventFunc, {
          capture: true
        });
      }
    }
  }, {
    key: "scrollListener",
    value: function scrollListener() {
      var _this4 = this;

      window.addEventListener('scroll', function () {
        _this4.hideAllMenu();
      });
    }
  }, {
    key: "create",
    value: function create(option) {
      var _this5 = this;

      var innerOptiton = {};

      if (this.option.fixMenuWhenScroll) {
        innerOptiton.position = 'fixed';
      }

      var mainMenu = new Menu(0, option, innerOptiton);
      this.storeMenus.push(mainMenu);
      document.body.appendChild(mainMenu.el);
      return {
        show: function show(e, payload) {
          _this5.showMenu(e, mainMenu, payload);
        }
      };
    }
  }, {
    key: "showMenu",
    value: function showMenu(e, menu, payload) {
      this.storeMenus.forEach(function (item) {
        item.hide();
      });
      menu.show(e, payload);
    }
  }, {
    key: "hideAllMenu",
    value: function hideAllMenu() {
      this.storeMenus.forEach(function (menu) {
        menu.el.style.display = 'none';
      });
    }
  }]);

  return ContextMenu;
}();

export { ContextMenu as default };
//# sourceMappingURL=index.es5.js.map
