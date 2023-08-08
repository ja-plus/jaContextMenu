import MenuItem from './MenuItem';
import Panel, { PanelPosition } from './Panel';
import config from './config';
import { MenuOption } from './types/MenuOption';
import h from './utils/h';
import { dealBastAttr } from './utils/utils';

/**
 * 第一层menu保留el，使用display控制显示隐藏
 * 第二层后的menu使用remove来控制显示隐藏
 */
export default class Menu<Payload> extends Panel {
  ul: HTMLElement;
  /** 表示第几级的菜单*/
  level: number;
  /** config*/
  menuOption: MenuOption<Payload>;
  children: MenuItem<Payload>[] = [];
  /** 传入的参数 */
  payload: Payload;

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
      classList: [config.wrapperClassName, `${config.wrapperClassName}-lv${this.level}`],
      dataset: {
        lv: this.level,
      },
      onclick: e => e.stopPropagation(),
      oncontextmenu: e => {
        e.stopPropagation();
        e.preventDefault();
      },
    });
    this.el.appendChild(this.ul);
  }
  updateMenuAttr() {
    this.ul.className = `${config.wrapperClassName} ${config.wrapperClassName}-lv${this.level} ${dealBastAttr(this.menuOption.class, this.payload)}`;
  }
  renderMenuItem() {
    if (!Array.isArray(this.menuOption.items)) {
      return console.error('option.items is not type of array');
    }
    this.children = [];
    // remove all menuItem
    let menuItemEl: ChildNode;
    while ((menuItemEl = this.ul.lastChild)) {
      menuItemEl.remove();
    }
    for (const it of this.menuOption.items) {
      this.children.push(new MenuItem(this.level, it, this));
    }
    this.children.forEach(item => {
      this.ul.appendChild(item.el);
    });
  }
  /**
   * @override
   */
  show(e: PanelPosition, payload?: any) {
    this.prepareMenuShow(payload);
    super.show(e); // calculate transform:translate
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
  calcPosition(e: PanelPosition) {
    let { x, y } = super.calcPosition(e);
    // add scrollX scrollY if page has scroll bar
    if (this.level === 0 && this.panelOption.position !== 'fixed') {
      x += window.scrollX;
      y += window.scrollY;
    }
    return { x, y };
  }

  removeAllHover() {
    this.children.forEach(item => {
      item.el.classList.remove(`${config.wrapperClassName}_hover`);
    });
  }
  /**
   * remove all child menus
   */
  removeChildMenus() {
    this.children.forEach(item => {
      item.childMenu?.el.remove();
    });
  }

  removeItemHover() {
    this.children.forEach(childItem => {
      childItem.el.classList.remove(`${config.wrapperClassName}_hover`);
    });
  }
  closeAllMenus() {
    const menus = document.querySelectorAll<HTMLElement>(`.${config.panelClassName}`);
    menus.forEach(menu => {
      const level = menu.dataset.lv;
      if (+level > 0) {
        menu.remove();
      } else {
        menu.style.display = 'none';
      }
    });
  }
  destroy() {
    this.el.remove();
    this.el = null;
    this.menuOption = null;
    this.children = [];
    this.payload = null;
  }
}
