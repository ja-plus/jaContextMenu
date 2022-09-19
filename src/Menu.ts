import h from './utils/h';
import config from './config.js';
import MenuItem from './MenuItem';
import MenuItemOption from './interface/MenuItemOption';
import MenuOption from './interface/MenuOption';
import Panel, { PanelOption, PanelPosition } from './Panel';

/**
 * 第一层menu保留el，使用display控制显示隐藏
 * 第二层后的menu使用remove来控制显示隐藏
 */
export default class Menu extends Panel {
  /** 列表元素 */
  ul: HTMLElement;
  /** 0 1*/
  level: number;
  /** config*/
  items: MenuItemOption[];
  children: MenuItem[] = [];
  /** 传入的参数 */
  payload: any;

  constructor(level: number, option: MenuOption, panelOption?: PanelOption) {
    super(option, panelOption);
    this.level = level;
    this.items = option.items;
    this.init();
    this.addChildren(option.items);
  }
  init() {
    this.ul = h(`ul.${config.wrapperClassName}.${config.wrapperClassName}-lv${this.level}`, {
      dataset: {
        lv: this.level,
      },
      style: {
        zIndex: +config.baseZIndex + this.level,
      },
      onclick: e => e.stopPropagation(),
      oncontextmenu: e => {
        e.stopPropagation();
        e.preventDefault();
      },
    });
    // 向panel中增加列表元素
    this.el.appendChild(this.ul);
  }
  addChildren(items: MenuItemOption[]) {
    if (!Array.isArray(items)) {
      return console.error('option.items is not type of array');
    }
    for (const it of items) {
      this.children.push(new MenuItem(this.level, it, this));
    }
    // 挂载li
    this.children.forEach(item => {
      this.ul.appendChild(item.el);
    });
  }
  /**
   * 展示菜单
   * @override
   */
  show(e: PanelPosition, payload?: any) {
    this.payload = payload;
    this.removeAllHover(); // 移除所有hover
    this.removeChildMenus(); // 打开的时候不会展示任何子菜单
    super.show(e);
  }
  /**
   * 计算出现的位置
   * @override
   */
  calcPosition(e: MouseEvent) {
    let { x, y } = super.calcPosition(e);
    // add scrollX scrollY if page has scroll bar
    if (this.level === 0 && this.panelOption.position !== 'fixed') {
      x += window.scrollX;
      y += window.scrollY;
    }
    return { x, y };
  }

  /**
   * 移除所有hover
   */
  removeAllHover() {
    this.children.forEach(item => {
      item.el.classList.remove(`${config.wrapperClassName}_hover`);
    });
  }
  /**
   * 移除所有子菜单
   */
  removeChildMenus() {
    this.children.forEach(item => {
      item.childMenu?.el.remove();
    });
  }
  /**
   * 移除选项hover
   */
  removeItemHover() {
    this.children.forEach(childItem => {
      childItem.el.classList.remove(`${config.wrapperClassName}_hover`);
    });
  }
  /**
   * 关闭所有菜单
   */
  closeAllMenus() {
    const menus = document.querySelectorAll(`.${config.panelClassName}`);
    menus.forEach((menu: HTMLElement) => {
      const level = menu.dataset.lv;
      if (+level > 0) {
        menu.remove();
      } else {
        menu.style.display = 'none';
      }
    });
  }
  /** 移除 */
  destroy() {
    this.el.remove();
    this.el = null;
    this.items = [];
    this.children = [];
    this.payload = null;
  }
}
