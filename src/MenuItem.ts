import Menu from './Menu';
import config from './config';
import { MenuItemOption } from './types/MenuItemOption';
import h from './utils/h';
import { dealBaseAttr, windowSize } from './utils/utils';
/**
 * Menu item
 */
export default class MenuItem<T> {
  parentMenu: Menu<T>;
  level: number;
  el!: HTMLElement;
  itemOption: MenuItemOption<T>;
  childMenu!: Menu<T>;

  constructor(level: number, item: MenuItemOption<T>, parentMenu: Menu<T>) {
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
      const liDisabled = dealBaseAttr(item.disabled, this.parentMenu.payload);
      const liClassList = [dealBaseAttr(item.class, this.parentMenu.payload)];
      if (liDisabled) liClassList.push('disabled');
      const show = item.show === undefined ? true : dealBaseAttr(item.show, this.parentMenu.payload);

      let iconEl;
      if (item.icon) {
        const icon = dealBaseAttr(item.icon, this.parentMenu.payload);
        iconEl = icon instanceof HTMLElement ? h('div.menu-item-icon', [icon]) : h('img.menu-item-icon', { src: icon }); // 图标
      }
      this.el = h(
        'li',
        {
          style: {
            display: show ? '' : 'none',
          },
          classList: liClassList,
          onclick: e => {
            if (!liDisabled) {
              const stay = item.onclick?.(e, this.parentMenu.payload);
              if (!item.children && !stay) this.parentMenu.closeAllMenus();
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
          iconEl,
          item.customItem ||
            h('span.menu-item-label', {
              textContent: dealBaseAttr(item.label, this.parentMenu.payload),
            }),
          item.tip && h('span.menu-item-tip', dealBaseAttr(item.tip, this.parentMenu.payload)), // 提示文字
          item.children && h('span.right-arrow'), // 右箭头
        ],
      );
    }
    if (item.children) {
      // 不设置宽度则继承父菜单宽度
      if (!item.children.width) item.children.width = this.parentMenu.width;
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
    this.childMenu.payload = this.parentMenu.payload; // payload传入子菜单
    this.childMenu.prepareMenuShow(this.childMenu.payload);
    this.calcPosition(); // 重新计算菜单出现的位置。
  }

  calcPosition() {
    const childMenuEle = this.childMenu.el;
    const childMenuHeight = childMenuEle.getBoundingClientRect().height;
    const liPosition = this.el.getBoundingClientRect();
    let translateX = this.parentMenu.width - 5;
    let translateY = -2; // paddingTop
    // right available space
    if (windowSize.clientWidth - liPosition.x - this.parentMenu.width < this.childMenu.width) {
      translateX = -this.childMenu.width + 5;
    }
    // bottom available space
    if (windowSize.clientHeight - liPosition.y + 2 < childMenuHeight) {
      translateY = -childMenuHeight + config.menuItemHeight + 2 + 1; // 1px border
    }
    // this.childMenu.removeChildMenus();
    childMenuEle.style.transform = `translate(${translateX}px, ${translateY}px)`;
    // return { x: translateX, y: translateY };
  }
  hideOtherChildMenu() {
    this.parentMenu?.removeChildMenus(); // 移除所有子菜单
    this.parentMenu?.removeItemHover(); // 取消hover状态
  }
}
