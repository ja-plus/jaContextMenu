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
      const show = item.show === void 0 ? true : dealBaseAttr(item.show, this.parentMenu.payload);

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
                this.hideOtherChildMenu(); // remove all child menu
              },
        },
        [
          iconEl,
          dealBaseAttr(item.customItem, this.parentMenu.payload) ||
            h('span.menu-item-label', {
              textContent: dealBaseAttr(item.label, this.parentMenu.payload),
            }),
          item.tip && h('span.menu-item-tip', dealBaseAttr(item.tip, this.parentMenu.payload)),
          item.children && h('span.right-arrow'),
        ],
      );
    }
    if (item.children) {
      // extend parent width
      if (!item.children.width) item.children.width = this.parentMenu.width;
      this.childMenu = new Menu(item.children, { level: this.level + 1, id: this.parentMenu.id });
    }
  }

  showChildMenu(e: MouseEvent) {
    const childMenuEle = this.childMenu.el;
    // if childMenuEle is hidden
    if (!(e.target as HTMLElement).contains(childMenuEle)) {
      (e.target as HTMLElement).classList.add(config.wrapperClass + '_hover');
      childMenuEle.classList.remove('hide');
    }
    document.body.appendChild(childMenuEle);
    this.childMenu.payload = this.parentMenu.payload; // parent payload to child menu
    this.childMenu.prepareMenuShow(this.childMenu.payload);
    this.calcPosition(); // recalculate position
  }

  calcPosition() {
    const childMenuEle = this.childMenu.el;
    const { height: childMenuHeight } = childMenuEle.getBoundingClientRect();
    const liPosition = this.el.getBoundingClientRect();
    const parentWidth = this.parentMenu.width || config.defW;
    const childWidth = this.childMenu.width || config.defW;
    let x = liPosition.x + liPosition.width - 5;
    let y = liPosition.y - 3;
    // right not available space
    if (windowSize.cW - liPosition.x - parentWidth < childWidth) {
      x = liPosition.x - childWidth + 5;
    }
    if (childMenuHeight >= windowSize.cH) {
      y = 0;
      // if child menu height is larger than window height
      childMenuEle.style.maxHeight = `${windowSize.cH}px`;
      childMenuEle.classList.add('scroll');
    } else if (windowSize.cH - liPosition.y + 2 < childMenuHeight) {
      // bottom not available space
      // sticky bottom
      y = windowSize.cH - childMenuHeight;
      //#region to top
      // translateY = -childMenuHeight + config.itemH + 2 + 1; // 1px border
      //#endregion
    }

    // this.childMenu.removeChildMenus();
    childMenuEle.style.top = `${y}px`;
    childMenuEle.style.left = `${x}px`;
  }

  hideOtherChildMenu() {
    this.parentMenu?.removeChildMenus();
    this.parentMenu?.removeItemHover();
  }
}
