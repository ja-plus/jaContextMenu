import MenuItem from './MenuItem';
import Panel, { PanelPosition } from './Panel';
import config from './config';
import { MenuOption } from './types/MenuOption';
import h from './utils/h';
import { dealBaseAttr } from './utils/utils';

/**
 * 第一层menu保留el，使用display控制显示隐藏
 * 第二层后的menu使用remove来控制显示隐藏
 */
export default class Menu<Payload> extends Panel {
  ul!: HTMLElement;
  /** 表示第几级的菜单*/
  level: number;
  /** config*/
  menuOption: MenuOption<Payload> | null;
  children: MenuItem<Payload>[] = [];
  /** 传入的参数 */
  payload?: Payload;

  constructor(level: number, menuOption: MenuOption<Payload>) {
    super(menuOption);
    // if(level > 1) delete menuOption.position,baseZIndex?
    this.menuOption = menuOption;
    this.level = level;
    this.createUl();
    // this.renderMenuItem();//初始化时不渲染MenuItem
  }
  createUl() {
    this.ul = h(`ul`, {
      classList: [config.wrapperClass, `${config.wrapperClass}-lv${this.level}`],
      dataset: {
        lv: this.level,
      },
      onclick: e => e.stopPropagation(),
      oncontextmenu: e => {
        e.stopPropagation();
        e.preventDefault();
      },
    });
    this.el?.appendChild(this.ul);
  }
  updateMenuAttr() {
    this.ul.className = `${config.wrapperClass} ${config.wrapperClass}-lv${this.level} ${dealBaseAttr(this.menuOption?.class, this.payload)}`;
  }
  renderMenuItem() {
    if (!Array.isArray(this.menuOption?.items)) {
      return console.error('option.items is not type of array');
    }
    this.children = [];
    // remove all menuItem
    let menuItemEl: ChildNode | null;
    while ((menuItemEl = this.ul.lastChild)) {
      menuItemEl.remove();
    }
    if (!this.menuOption?.items) return;

    for (const it of this.menuOption.items) {
      const menuItem = new MenuItem(this.level, it, this);
      this.children.push(menuItem);
      this.ul.appendChild(menuItem.el);
    }
  }
  /**
   * @override
   */
  show(e: Parameters<Panel['show']>[0], payload?: any) {
    this.prepareMenuShow(payload);
    return super.show(e); // calculate transform:translate
  }

  /**
   * do something before menu show
   * @param payload data
   */
  prepareMenuShow(payload: any) {
    this.payload = payload;
    this.removeAllHover();
    this.removeChildMenus(); // Not show child menu when open menu
    this.updateMenuAttr();
    this.renderMenuItem();
  }

  /**
   * menu position
   * @override
   */
  calcPosition(...p: Parameters<Panel['calcPosition']>) {
    const res = super.calcPosition(...p);
    let { x, y } = res;
    // add scrollX scrollY if page has scroll bar
    if (this.level === 0 && this.panelOption?.position !== 'fixed') {
      x += window.scrollX;
      y += window.scrollY;
    }
    return { x, y, position: res.position };
  }

  removeAllHover() {
    this.children.forEach(item => {
      item.el.classList.remove(`${config.wrapperClass}_hover`);
    });
  }
  /**
   * remove all child menus
   */
  removeChildMenus() {
    this.children.forEach(item => {
      item.childMenu?.el?.remove();
    });
  }

  /**
   * remove item hover status
   */
  removeItemHover() {
    this.children.forEach(childItem => {
      childItem.el.classList.remove(`${config.wrapperClass}_hover`);
    });
  }
  closeAllMenus() {
    const menus = document.querySelectorAll<HTMLElement>(`.${config.panelClass}`);
    menus.forEach(menu => {
      const level = menu.dataset.lv;
      if (level && +level > 0) {
        menu.remove();
      } else {
        menu.classList.add('hide');
      }
    });
  }
  destroy() {
    super.destroy();
    this.menuOption = null;
    this.children = [];
    this.payload = undefined;
  }
}
