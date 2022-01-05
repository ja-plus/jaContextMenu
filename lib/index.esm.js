function h(tag, attrs, children) {
    var _a;
    var id = tag.match(/#[\w\d_-]+/);
    var classArr = tag.match(/\.[\w\d_-]+/g) || [];
    classArr = classArr.map(function (it) { return it.substring(1); });
    tag = tag.match(/^[\w\d]+/)[0];
    var elem = document.createElement(tag);
    if (Array.isArray(attrs)) {
        children = attrs;
    }
    else if (typeof attrs === 'object' && attrs !== null) {
        for (var attr in attrs) {
            if (attr === 'style' || attr === 'dataset') {
                for (var key in attrs[attr]) {
                    elem[attr][key] = attrs[attr][key];
                }
            }
            else if (attr === 'classList' && Array.isArray(attrs[attr])) {
                classArr = classArr.concat(attrs[attr]);
            }
            else {
                elem[attr] = attrs[attr];
            }
        }
    }
    else if (typeof attrs === 'string' || typeof attrs === 'number') {
        elem.textContent = String(attrs);
    }
    if (children) {
        children.forEach(function (child) {
            if (child instanceof HTMLElement)
                elem.appendChild(child);
            else if (child !== null && child !== undefined)
                console.error(child, 'not instance of HTMLElement');
        });
    }
    if (id)
        elem.id = id[0];
    if (classArr)
        (_a = elem.classList).add.apply(_a, classArr);
    return elem;
}

var config = {
  cssId: 'jacontextmenu-css',
  wrapperClassName: 'jacontextmenu',
  defaultMenuWidth: 200,
  // childMenuWidth: 150,
  menuItemHeight: 24,
  menuItemDivideLineMargin: 5, // type == 'divide'
  baseZIndex: 1000, // 基准z-index
};

class MenuItem {
  /** @type {Menu} */
  parentMenu;
  /** @type {Number} 0 1*/
  level;
  /** @type {HTMLElement} element*/
  el;
  /** @type {Object} item option*/
  itemOption;
  /** @type {Menu} */
  childMenu;
  constructor(level, item, parentMenu) {
    // console.log(parentMenu);
    this.parentMenu = parentMenu;
    this.level = level;
    this.itemOption = item; // save option
    this.init();
  }
  init() {
    const item = this.itemOption;
    if (item.type === 'divide' || item.type?.indexOf('---') === 0) {
      this.el = h('li.divide');
    } else {
      this.el = h(
        'li',
        {
          classList: item.disabled ? ['disabled'] : [],
          onclick: (e) => {
            if (!item.disabled) {
              const payload = this.parentMenu.payload;
              item.onclick && item.onclick(e, payload);
              if (!item.children) this.parentMenu.closeAllMenus();
            }
          },
          // onmouseenter: it.children?.length
          //   ? (e) => this.#showChildMenu(e, it.children, contextMenuEle)
          //   : () => this.#hideChildMenu(contextMenuEle),
          onmouseenter: item.children
            ? (e) => {
                this.showChildMenu(e);
              }
            : () => {
                this.hideOtherChildMenu(); // 移除所有子菜单
              },
        },
        [h('span.label', item.label), item.tip && h('span.tip', item.tip), item.children && h('span.right-arrow')]
      );
    }
    if (item.children) {
      if (!item.children.width) item.children.width = this.parentMenu.width; // 不设置宽度则继承父菜单宽度
      this.childMenu = new Menu(this.level + 1, item.children);
    }
  }
  // 展示子菜单
  showChildMenu(e) {
    const childMenuEle = this.childMenu.el;
    // if childMenuEle is hidden
    if (!e.target.contains(childMenuEle)) {
      e.target.classList.add(config.wrapperClassName + '_hover');
      childMenuEle.style.display = 'block';

      const childMenuHeight = parseFloat(getComputedStyle(childMenuEle).height);
      const liPosition = e.target.getBoundingClientRect();
      let translateX = this.parentMenu.width - 5;
      let translateY = -2; // paddingTop
      // right avaliable space
      if (window.innerWidth - liPosition.x - this.parentMenu.width < this.childMenu.width) {
        translateX = -this.childMenu.width + 5;
      }
      // bottom avaliable space
      if (window.innerWidth - liPosition.y + 2 < childMenuHeight) {
        translateY = -childMenuHeight + config.menuItemHeight + 2 + 1; // 1px border
      }
      this.childMenu.removeChildMenus();
      childMenuEle.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }
    this.el.appendChild(childMenuEle);
    this.childMenu.removeAllHover(); // 取消hover
    this.childMenu.payload = this.parentMenu.payload; // payload传入子菜单
  }
  hideOtherChildMenu() {
    this.parentMenu?.removeChildMenus(); // 移除所有子菜单
    this.parentMenu?.removeItemHover(); // 取消hover状态
  }
}
/**
 * 第一层menu保留el，使用display控制显示隐藏
 * 第二层后的menu使用remove来控制显示隐藏
 */
class Menu {
  /** @type {Number} 0 1*/
  level;
  /** @type {HTMLElement} element*/
  el;
  /** @type {Number} menu width 传百分比就不好计算 */
  width;
  /** @type {Number} menu height 计算得出的菜单高度 */
  height = 0;
  /** @type {Array} config*/
  items;
  /** @type {Array<MenuItem>} */
  children = [];
  /** @type {any} 传入的参数 */
  payload;
  constructor(level, option) {
    this.level = level;
    this.items = option.items;
    this.width = option.width || config.defaultMenuWidth;
    this.init();
    this.addChildren(option.items);
  }
  init() {
    // 生成最外层元素
    this.el = h(`ul.${config.wrapperClassName}.${config.wrapperClassName}-lv${this.level}`, {
      dataset: {
        lv: this.level,
      },
      style: {
        width: this.width + 'px',
        zIndex: +config.baseZIndex + this.level,
      },
      onclick: (e) => e.stopPropagation(),
      oncontextmenu: (e) => {
        e.stopPropagation();
        e.preventDefault();
      },
    });
  }
  addChildren(items) {
    if (!Array.isArray(items)) {
      return console.error('option.items is not type of array');
    }
    for (const it of items) {
      this.children.push(new MenuItem(this.level, it, this));
    }
    // 挂载li
    this.children.forEach((item) => {
      this.el.appendChild(item.el);
    });
  }
  // 展示菜单
  show(e, payload) {
    this.payload = payload;
    e.preventDefault();
    e.stopPropagation(); // 防止触发祖先元素定义的contextmenu事件
    this.removeAllHover(); // 移除所有hover
    this.removeChildMenus(); // 打开的时候不会展示任何子菜单
    this.el.style.display = 'block';
    // ------ START calc menu position code block
    {
      this.height = parseFloat(getComputedStyle(this.el).height);
      let translateX = e.clientX;
      let translateY = e.clientY;
      // right not have enough space
      if (window.innerWidth - e.clientX < this.width) {
        translateX = e.clientX - this.width;
      }
      // bottom not have enough space
      if (window.innerHeight - e.clientY < this.height) {
        translateY = e.clientY - this.height;
      }
      this.el.style.transform = `translate(${translateX}px,${translateY}px)`;
    }
  }
  // 隐藏菜单
  hide() {
    this.el.style.display = 'none';
  }
  // 移除所有hover
  removeAllHover() {
    this.children.forEach((item) => {
      item.el.classList.remove(`${config.wrapperClassName}_hover`);
    });
  }
  // 移除所有子菜单
  removeChildMenus() {
    this.children.forEach((item) => {
      item.childMenu?.el.remove();
    });
  }
  // 移除选项hover
  removeItemHover() {
    this.children.forEach((childItem) => {
      childItem.el.classList.remove(`${config.wrapperClassName}_hover`);
    });
  }
  // 关闭所有菜单
  closeAllMenus() {
    let menus = document.querySelectorAll(`.${config.wrapperClassName}`);
    menus.forEach((menu) => {
      let level = menu.dataset.lv;
      if (level > 0) {
        menu.remove();
      } else {
        menu.style.display = 'none';
      }
    });
  }
}

const _cssStr = `
  .${config.wrapperClassName}, .${config.wrapperClassName} *{
    box-sizing: border-box;
  }
  .${config.wrapperClassName}{
    -webkit-user-select:none;
    user-select: none;
    border: 1px solid #ddd;
    left: 0;top:0;
    background-color: #fff;
    padding: 2px 0 2px 0px;
    margin: 0;
    cursor: default;
    width: ${config.defaultMenuWidth}px;
    display: none;
  }
  /*主菜单*/
  .${config.wrapperClassName}[data-lv="0"]{ 
    position: fixed;
  }
  /*子菜单*/
  .${config.wrapperClassName} .${config.wrapperClassName}{ 
    position: absolute;
  }
  .${config.wrapperClassName} .divide{
    margin: ${config.menuItemDivideLineMargin}px 0;
    height: 1px;
    background-color: #ddd;
  }
  .${config.wrapperClassName} li {
    position: relative;
    padding: 0 30px 0 30px;
    list-style: none;
    line-height: ${config.menuItemHeight}px;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
  }
  .${config.wrapperClassName} li.disabled{
    color: #aaa;
    pointer-events: none;
  }
  .${config.wrapperClassName} li span.label {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .${config.wrapperClassName} li span.tip{
    color:#aaa;
    font-size: 12px;
  }
  .${config.wrapperClassName} li:hover:not(.divide):not(.disabled),
  .${config.wrapperClassName} li.${config.wrapperClassName}_hover{
    background-color: #eee;
  }
  .${config.wrapperClassName} li:hover:not(.divide):not(.disabled) .tip,
  .${config.wrapperClassName} li.${config.wrapperClassName}_hover .tip{
    color: #000;
  }
  .${config.wrapperClassName} li .right-arrow {
    position: absolute;
    right: 8px;
    top: 9px;
    border-top: 4px solid rgba(0,0,0,0);
    border-left: 4px solid #000;
    border-right: 4px solid rgba(0,0,0,0);
    border-bottom: 4px solid rgba(0,0,0,0);
  }
  .${config.wrapperClassName}_child{
    width: ${config.childMenuWidth}px;
  }
  `;
class ContextMenu {
  /** @type {Menu} 保存生成的菜单,便于统一管理 */
  storeMenus = [];
  /** @type {Function} */
  clickEventFunc;
  /** @type {Object} */
  config;
  constructor(config) {
    this.injectCss();
    // this.#onPageResize();
    this.hideMenuEventListener();
    if (config?.hideMenuWhenScroll) {
      this.scrollListener();
    }
  }
  // 注入css
  injectCss() {
    let style = document.querySelector(`#${config.cssId}`);
    if (!style) {
      // if not be injected
      style = h(`style#${config.cssId}`, {
        innerHTML: _cssStr,
      });
      document.head.appendChild(style);
    }
  }
  /** click and close menu listener */
  hideMenuEventListener() {
    // add once event
    if (!this.clickEventFunc) {
      this.clickEventFunc = () => {
        if (this.storeMenus.some((it) => it.el.style.display === 'block')) {
          // 存在打开的菜单才关闭
          this.hideAllMenu();
        }
      };
      window.addEventListener('click', this.clickEventFunc);
    }
  }
  /** if scroll hide all menu */
  scrollListener() {
    window.addEventListener('scroll', () => {
      this.hideAllMenu();
    });
  }
  /**
   *
   * @param {Array<Object>} items 配置
   * @returns
   */
  create(option) {
    const mainMenu = new Menu(0, option);
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
  showMenu(e, menu, payload) {
    // 隐藏其他菜单
    this.storeMenus.forEach((item) => {
      item.hide();
    });
    menu.show(e, payload);
  }
  hideAllMenu() {
    this.storeMenus.forEach((menu) => {
      menu.el.style.display = 'none';
    });
  }
}

export { ContextMenu as default };
//# sourceMappingURL=index.esm.js.map
