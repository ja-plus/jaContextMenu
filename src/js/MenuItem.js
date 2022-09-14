import h from './utils/h.ts';
import Menu from './Menu.js';
import config from './config.js';
/**
 * Menu item
 */
export default class MenuItem {
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
          onclick: e => {
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
            ? e => {
                this.showChildMenu(e);
              }
            : () => {
                this.hideOtherChildMenu(); // 移除所有子菜单
              },
        },
        [
          item.icon && h('span.icon', `<img src="${item.icon}"/>`),
          h('span.label', item.label + 'xxx'),
          item.tip && h('span.tip', item.tip),
          item.children && h('span.right-arrow'),
        ],
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
