import h from './utils/h';
import Menu from './Menu';
import config from './config.js';
import MenuItemOption from './interface/MenuItemOption';
import { windowSize } from './utils/utils';
/**
 * Menu item
 */
export default class MenuItem {
  parentMenu: Menu;
  level: number;
  el: HTMLElement;
  itemOption: MenuItemOption;
  childMenu: Menu;
  constructor(level: number, item: MenuItemOption, parentMenu: Menu) {
    // console.log(parentMenu);
    this.parentMenu = parentMenu;
    this.level = level;
    this.itemOption = item; // save option
    this.init();
  }
  init() {
    const item = this.itemOption;
    if (item.type === 'hr' || item.type === '---') {
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
        [h('span.label', item.label), item.tip && h('span.tip', item.tip), item.children && h('span.right-arrow')],
      );
    }
    if (item.children) {
      if (!item.children.width) item.children.width = this.parentMenu.width; // 不设置宽度则继承父菜单宽度
      this.childMenu = new Menu(this.level + 1, item.children);
    }
  }
  /**
   * 展示子菜单
   */
  showChildMenu(e: MouseEvent) {
    const childMenuEle = this.childMenu.el;
    // if childMenuEle is hidden
    if (!(e.target as HTMLElement).contains(childMenuEle)) {
      (e.target as HTMLElement).classList.add(config.wrapperClassName + '_hover');
      childMenuEle.style.display = 'block';
    }
    this.el.appendChild(childMenuEle);
    this.calcPosition(e);
    this.childMenu.removeAllHover(); // 取消hover
    this.childMenu.payload = this.parentMenu.payload; // payload传入子菜单
  }
  calcPosition(e: MouseEvent) {
    const childMenuEle = this.childMenu.el;
    const childMenuHeight = parseFloat(getComputedStyle(childMenuEle).height);
    const liPosition = (e.target as HTMLElement).getBoundingClientRect();
    let translateX = this.parentMenu.width - 5;
    let translateY = -2; // paddingTop
    // right avaliable space
    if (windowSize.clientWidth - liPosition.x - this.parentMenu.width < this.childMenu.width) {
      translateX = -this.childMenu.width + 5;
    }
    // bottom avaliable space
    if (windowSize.clientHeight - liPosition.y + 2 < childMenuHeight) {
      translateY = -childMenuHeight + config.menuItemHeight + 2 + 1; // 1px border
    }
    this.childMenu.removeChildMenus();
    childMenuEle.style.transform = `translate(${translateX}px, ${translateY}px)`;
  }
  hideOtherChildMenu() {
    this.parentMenu?.removeChildMenus(); // 移除所有子菜单
    this.parentMenu?.removeItemHover(); // 取消hover状态
  }
}
