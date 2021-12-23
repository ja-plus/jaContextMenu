function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
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
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

/**
 * createElement function
 * h(tag[, text[,children]])
 * h(tag[, attrs[,children]])
 * h(tag[, children])
 * @param {String} tag 标签名称，支持tag#id.class emmet写法，暂支持id ,class
 * @param {Object | String | Array<HTMLElement>} attrs 传Object为属性，传String为textContent，传数组为children
 * @param {Array<HTMLElement>} children
 */
function h(tag, attrs, children) {
  var _elem$classList;

  // TODO: validate param type
  // 解析emmet 语法 (暂支持id class, 防止解析字符串影响更多性能)
  var id = tag.match(/#[\w\d_-]+/); // let classArr = tag.match(/(?<=\.)[\w\d_-]+/g) || []; // className // 低版本浏览器不支持零宽断言

  var classArr = tag.match(/\.[\w\d_-]+/g) || []; // className

  classArr = classArr.map(function (it) {
    return it.substring(1);
  });
  tag = tag.match(/^[\w\d]+/)[0];
  var elem = document.createElement(tag);

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

  if (children) {
    children.forEach(function (child) {
      if (child instanceof HTMLElement) elem.appendChild(child);else if (child !== null && child !== undefined) console.error(child, 'not instance of HTMLElement');
    });
  }

  if (id) elem.id = id;
  if (classArr) (_elem$classList = elem.classList).add.apply(_elem$classList, _toConsumableArray(classArr));
  return elem;
}

var config = {
  cssId: 'jacontextmenu-css',
  wrapperClassName: 'jacontextmenu',
  defaultMenuWidth: 200,
  // childMenuWidth: 150,
  menuItemHeight: 24,
  baseZIndex: 1000 // 基准z-index

};

var MenuItem = /*#__PURE__*/function () {
  /** @type {Menu} */

  /** @type {Number} 0 1*/

  /** @type {HTMLElement} element*/

  /** @type {Object} item option*/

  /** @type {Menu} */
  function MenuItem(level, item, parentMenu) {
    _classCallCheck(this, MenuItem);

    _defineProperty(this, "parentMenu", void 0);

    _defineProperty(this, "level", void 0);

    _defineProperty(this, "el", void 0);

    _defineProperty(this, "itemOption", void 0);

    _defineProperty(this, "childMenu", void 0);

    // console.log(parentMenu);
    this.parentMenu = parentMenu;
    this.level = level;
    this.itemOption = item; // save option

    this.init();
  }

  _createClass(MenuItem, [{
    key: "init",
    value: function init() {
      var _item$type,
          _this = this;

      var item = this.itemOption;

      if (item.type === 'divide' || ((_item$type = item.type) === null || _item$type === void 0 ? void 0 : _item$type.indexOf('---')) === 0) {
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
          // onmouseenter: it.children?.length
          //   ? (e) => this.#showChildMenu(e, it.children, contextMenuEle)
          //   : () => this.#hideChildMenu(contextMenuEle),
          onmouseenter: item.children ? function (e) {
            _this.showChildMenu(e);
          } : function () {
            _this.hideOtherChildMenu(); // 移除所有子菜单

          }
        }, [h('span.label', item.label), item.tip && h('span.tip', item.tip), item.children && h('span.right-arrow')]);
      }

      if (item.children) {
        if (!item.children.width) item.children.width = this.parentMenu.width; // 不设置宽度则继承父菜单宽度

        this.childMenu = new Menu(this.level + 1, item.children);
      }
    } // 展示子菜单

  }, {
    key: "showChildMenu",
    value: function showChildMenu(e) {
      var childMenuEle = this.childMenu.el; // if childMenuEle is hidden

      if (!e.target.contains(childMenuEle)) {
        e.target.classList.add(config.wrapperClassName + '_hover');
        childMenuEle.style.display = 'block';
        var childMenuHeight = parseFloat(getComputedStyle(childMenuEle).height);
        var liPosition = e.target.getBoundingClientRect();
        var translateX = this.parentMenu.width - 5;
        var translateY = -2; // paddingTop
        // right avaliable space

        if (window.innerWidth - liPosition.x - this.parentMenu.width < this.childMenu.width) {
          translateX = -this.childMenu.width + 5;
        } // bottom avaliable space


        if (window.innerWidth - liPosition.y + 2 < childMenuHeight) {
          translateY = -childMenuHeight + config.menuItemHeight + 2 + 1; // 1px border
        }

        this.childMenu.removeChildMenus();
        childMenuEle.style.transform = "translate(".concat(translateX, "px, ").concat(translateY, "px)");
      }

      this.el.appendChild(childMenuEle);
      this.childMenu.removeAllHover(); // 取消hover

      this.childMenu.payload = this.parentMenu.payload; // payload传入子菜单
    }
  }, {
    key: "hideOtherChildMenu",
    value: function hideOtherChildMenu() {
      var _this$parentMenu, _this$parentMenu2;

      (_this$parentMenu = this.parentMenu) === null || _this$parentMenu === void 0 ? void 0 : _this$parentMenu.removeChildMenus(); // 移除所有子菜单

      (_this$parentMenu2 = this.parentMenu) === null || _this$parentMenu2 === void 0 ? void 0 : _this$parentMenu2.removeItemHover(); // 取消hover状态
    }
  }]);

  return MenuItem;
}();
/**
 * 第一层menu保留el，使用display控制显示隐藏
 * 第二层后的menu使用remove来控制显示隐藏
 */

var Menu = /*#__PURE__*/function () {
  /** @type {Number} 0 1*/

  /** @type {HTMLElement} element*/

  /** @type {Number} menu width 传百分比就不好计算 */

  /** @type {Array} config*/

  /** @type {Array<MenuItem>} */

  /** @type {any} 传入的参数 */
  function Menu(level, option) {
    _classCallCheck(this, Menu);

    _defineProperty(this, "level", void 0);

    _defineProperty(this, "el", void 0);

    _defineProperty(this, "width", void 0);

    _defineProperty(this, "items", void 0);

    _defineProperty(this, "children", []);

    _defineProperty(this, "payload", void 0);

    this.level = level;
    this.items = option.items;
    this.width = option.width || config.defaultMenuWidth;
    this.init();
    this.addChildren(option.items);
  }

  _createClass(Menu, [{
    key: "init",
    value: function init() {
      // 生成最外层元素
      this.el = h("ul.".concat(config.wrapperClassName, ".").concat(config.wrapperClassName, "-lv").concat(this.level), {
        dataset: {
          lv: this.level
        },
        style: {
          width: this.width + 'px',
          zIndex: +config.baseZIndex + this.level
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
        } // 挂载li

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.children.forEach(function (item) {
        _this2.el.appendChild(item.el);
      });
    } // 展示菜单

  }, {
    key: "show",
    value: function show(e, payload) {
      this.payload = payload;
      e.preventDefault();
      e.stopPropagation(); // 防止触发祖先元素定义的contextmenu事件

      this.removeAllHover(); // 移除所有hover

      this.removeChildMenus(); // 打开的时候不会展示任何子菜单
      // ------ START calc menu position code block

      {
        var menuHeight = parseFloat(getComputedStyle(this.el).height);
        var translateX = e.pageX;
        var translateY = e.pageY; // right not have enough space

        if (window.innerWidth - e.pageX < this.width) {
          translateX = e.pageX - this.width;
        } // bottom not have enough space


        if (window.innerHeight - e.pageY < menuHeight) {
          translateY = e.pageY - menuHeight;
        }

        this.el.style.transform = "translate(".concat(translateX, "px,").concat(translateY, "px)");
      }
      this.el.style.display = 'block';
    } // 隐藏菜单

  }, {
    key: "hide",
    value: function hide() {
      this.el.style.display = 'none';
    } // 移除所有hover

  }, {
    key: "removeAllHover",
    value: function removeAllHover() {
      this.children.forEach(function (item) {
        item.el.classList.remove("".concat(config.wrapperClassName, "_hover"));
      });
    } // 移除所有子菜单

  }, {
    key: "removeChildMenus",
    value: function removeChildMenus() {
      this.children.forEach(function (item) {
        var _item$childMenu;

        (_item$childMenu = item.childMenu) === null || _item$childMenu === void 0 ? void 0 : _item$childMenu.el.remove();
      });
    } // 移除选项hover

  }, {
    key: "removeItemHover",
    value: function removeItemHover() {
      this.children.forEach(function (childItem) {
        childItem.el.classList.remove("".concat(config.wrapperClassName, "_hover"));
      });
    } // 关闭所有菜单

  }, {
    key: "closeAllMenus",
    value: function closeAllMenus() {
      var menus = document.querySelectorAll(".".concat(config.wrapperClassName));
      menus.forEach(function (menu) {
        var level = menu.dataset.lv;

        if (level > 0) {
          menu.remove();
        } else {
          menu.style.display = 'none';
        }
      });
    }
  }]);

  return Menu;
}();

var _cssStr = "\n  .".concat(config.wrapperClassName, ", .").concat(config.wrapperClassName, " *{\n    box-sizing: border-box;\n  }\n  .").concat(config.wrapperClassName, "{\n    -webkit-user-select:none;\n    user-select: none;\n    border: 1px solid #ddd;\n    position: absolute;\n    left: 0;top:0;\n    background-color: #fff;\n    padding: 2px 0 2px 0px;\n    margin: 0;\n    cursor: default;\n    width: ").concat(config.defaultMenuWidth, "px;\n    display: none;\n  }\n  .").concat(config.wrapperClassName, " .divide{\n    margin: 5px 0;\n    height: 1px;\n    background-color: #ddd;\n  }\n  .").concat(config.wrapperClassName, " li {\n    position: relative;\n    padding: 0 30px 0 30px;\n    list-style: none;\n    line-height: ").concat(config.menuItemHeight, "px;\n    font-size: 13px;\n    display: flex;\n    justify-content: space-between;\n    flex-wrap: nowrap;\n  }\n  .").concat(config.wrapperClassName, " li.disabled{\n    color: #aaa;\n    pointer-events: none;\n  }\n  .").concat(config.wrapperClassName, " li span.label {\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n  .").concat(config.wrapperClassName, " li span.tip{\n    color:#aaa;\n    font-size: 12px;\n  }\n  .").concat(config.wrapperClassName, " li:hover:not(.divide):not(.disabled),\n  .").concat(config.wrapperClassName, " li.").concat(config.wrapperClassName, "_hover{\n    background-color: #eee;\n  }\n  .").concat(config.wrapperClassName, " li:hover:not(.divide):not(.disabled) .tip,\n  .").concat(config.wrapperClassName, " li.").concat(config.wrapperClassName, "_hover .tip{\n    color: #000;\n  }\n  .").concat(config.wrapperClassName, " li .right-arrow {\n    position: absolute;\n    right: 8px;\n    top: 9px;\n    border-top: 4px solid rgba(0,0,0,0);\n    border-left: 4px solid #000;\n    border-right: 4px solid rgba(0,0,0,0);\n    border-bottom: 4px solid rgba(0,0,0,0);\n  }\n  .").concat(config.wrapperClassName, "_child{\n    width: ").concat(config.childMenuWidth, "px;\n  }\n  ");

var ContextMenu = /*#__PURE__*/function () {
  /** @type {Menu} 保存生成的菜单,便于统一管理 */

  /** @type {Function} */
  function ContextMenu() {
    _classCallCheck(this, ContextMenu);

    _defineProperty(this, "storeMenus", []);

    _defineProperty(this, "clickEventFunc", void 0);

    this.injectCss(); // this.#onPageResize();

    this.hideMenuEventListener();
  } // 注入css


  _createClass(ContextMenu, [{
    key: "injectCss",
    value: function injectCss() {
      var style = document.querySelector("#".concat(config.cssId));

      if (!style) {
        // if not be injected
        style = h("style#".concat(config.cssId), {
          innerHTML: _cssStr
        });
        document.head.appendChild(style);
      }
    }
    /** click and close menu listener */

  }, {
    key: "hideMenuEventListener",
    value: function hideMenuEventListener() {
      var _this = this;

      // add once event
      if (!this.clickEventFunc) {
        this.clickEventFunc = function () {
          if (_this.storeMenus.some(function (it) {
            return it.el.style.display === 'block';
          })) {
            _this.hideAllMenu();
          }
        };

        window.addEventListener('click', this.clickEventFunc);
      }
    }
    /**
     *
     * @param {Array<Object>} items 配置
     * @returns
     */

  }, {
    key: "create",
    value: function create(option) {
      var mainMenu = new Menu(0, option);
      this.storeMenus.push(mainMenu);
      document.body.appendChild(mainMenu.el);
      return mainMenu;
    }
    /** 监听窗口 */
    // #onPageResize() {
    //   let resizeFunc = debounce(() => {
    //     // save window inner size
    //     store.windowSize = {
    //       width: window.innerWidth,
    //       height: window.innerHeight,
    //     };
    //   });
    //   window.addEventListener('resize', resizeFunc);
    // }

    /**
     * 展示菜单
     * @param {Menu} menu
     */

  }, {
    key: "showMenu",
    value: function showMenu(e, menu, payload) {
      // 隐藏其他菜单
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