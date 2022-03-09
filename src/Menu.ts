import h from './utils/h';
import config from './config.js';
import MenuItem from './MenuItem';
import MenuItemOption from './interface/MenuItemOption';
import MenuOption from './interface/MenuOption';
import { getClientScrollSize } from './utils/utils';

export interface InnerOption{
  position?:string;
}
/**
 * 第一层menu保留el，使用display控制显示隐藏
 * 第二层后的menu使用remove来控制显示隐藏
 */
export default class Menu {
  /**0 1*/
  level:number;
  /**element*/
  el:HTMLElement;
  /** menu width 传百分比就不好计算 */
  width:number;
  /** menu height 计算得出的菜单高度 */
  height:number = 0;
  /**config*/
  items:MenuItemOption[];
  children:MenuItem[] = [];
  /**传入的参数 */
  payload:any;
  innerOption:InnerOption;
  constructor(level:number, option:MenuOption, innerOption?:InnerOption) {
    this.level = level;
    this.items = option.items;
    this.width = option.width || config.defaultMenuWidth;
    this.innerOption = innerOption;
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
        position: this.innerOption?.position, // fix
      },
      onclick: (e) => e.stopPropagation(),
      oncontextmenu: (e) => {
        e.stopPropagation();
        e.preventDefault();
      },
    });
  }
  addChildren(items:MenuItemOption[]) {
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
  show(e:MouseEvent, payload:any) {
    this.payload = payload;
    e.preventDefault();
    e.stopPropagation(); // 防止触发祖先元素定义的contextmenu事件
    this.removeAllHover(); // 移除所有hover
    this.removeChildMenus(); // 打开的时候不会展示任何子菜单
    this.el.style.display = 'block';
    this.calcPosition(e);
  }
  // 计算出现的位置
  calcPosition(e:MouseEvent) {
    this.height = parseFloat(getComputedStyle(this.el).height);
    const scrollSize = getClientScrollSize()
    let translateX = e.clientX;
    let translateY = e.clientY;

    // right not have enough space
    if (window.innerWidth - e.clientX - scrollSize.width < this.width) {
      translateX = scrollSize.htmlEl.clientWidth - this.width;
    }
    // bottom not have enough space
    if (window.innerHeight - e.clientY - scrollSize.height < this.height) {
      translateY = e.clientY - this.height 
    }
    // add scrollX scrollY if page has scroll bar
    if(this.level === 0 && this.innerOption.position !== 'fixed'){
      translateX += window.scrollX
      translateY += window.scrollY;
    }
    this.el.style.transform = `translate(${translateX}px,${translateY}px)`;
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
    menus.forEach((menu:HTMLElement) => {
      let level = menu.dataset.lv;
      if (+level > 0) {
        menu.remove();
      } else {
        menu.style.display = 'none';
      }
    });
  }
}
