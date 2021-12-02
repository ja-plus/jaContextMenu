import h from './utils/h.js';
import config from './config.js';
export class Item {
  /** @type {Menu} */
  parentMenu;
  /** @type {Number} 0 1*/
  level;
  /** @type {HTMLElement} element*/
  el;
  /** @type {Menu} */
  childMenu;
  constructor(level, item, parentMenu) {
    // console.log(parentMenu);
    this.parentMenu = parentMenu;
    this.level = level;
    this.init(item);
  }
  init(item) {
    if (item.type === 'divide' || item.type?.indexOf('--') === 0) {
      this.el = h('li.divide');
    } else {
      this.el = h(
        'li',
        {
          classList: item.disabled ? ['disabled'] : [],
          onclick: (e) => {
            if (!item.disabled) {
              item.onclick && item.onclick(e /* , contextMenuEle.payload */);
              if (!item.children) this.parentMenu.hide();
            }
          },
          // onmouseenter: it.children?.length
          //   ? (e) => this.#showChildMenu(e, it.children, contextMenuEle)
          //   : () => this.#hideChildMenu(contextMenuEle),
          onmouseenter: item.children?.length
            ? (e) => {
                this.showChildMenu(e);
              }
            : () => {
                this.hidenOtherChildMenu(); // 移除所有子菜单
              },
        },
        [h('span.label', item.label), item.tip && h('span.tip', item.tip), item.children && h('span.right-arrow')]
      );
    }
    if (item.children) {
      this.childMenu = new Menu(this.level + 1, item.children);
    }
  }
  // 展示子菜单
  showChildMenu(e) {
    this.el.appendChild(this.childMenu.el);
  }
  hidenOtherChildMenu() {
    this.parentMenu?.removeChildMenus(); // 移除所有子菜单
  }
}
/**
 * 第一层menu保留el，使用display控制显示隐藏
 * 第二层后的menu使用remove来控制显示隐藏
 */
export default class Menu {
  /** @type {Number} 0 1*/
  level;
  /** @type {HTMLElement} element*/
  el;
  /** @type {Array} config*/
  items;
  /** @type {Array<Item>} */
  children = [];
  /** @type {Menu} */
  childMenu;
  constructor(level, items) {
    this.level = level;
    this.items = items;
    this.init();
    this.addChildren(items);
  }
  init() {
    // 生成最外层元素
    this.el = h(`ul.${config.wrapperClassName}.${config.wrapperClassName}-lv${this.level}`, {
      onclick: (e) => e.stopPropagation(),
      oncontextmenu: (e) => {
        e.stopPropagation();
        e.preventDefault();
      },
    });
  }
  addChildren(items) {
    for (const it of items) {
      this.children.push(new Item(this.level, it, this));
    }
    // 挂载li
    this.children.forEach((item) => {
      this.el.appendChild(item.el);
    });
  }
  // 展示菜单
  show(e) {
    e.preventDefault();
    e.stopPropagation(); // 防止触发祖先元素定义的contextmenu事件
    this.el.style.display = 'block';
    const menuHeight = parseFloat(getComputedStyle(this.el).height);
    let translateX = e.pageX;
    let translateY = e.pageY;
    if (window.innerWidth - e.pageX < config.mainMenuWidth) {
      // right not have enough space
      translateX = e.pageX - config.mainMenuWidth;
    }
    if (window.innerHeight - e.pageY < menuHeight) {
      // bottom not have enough space
      translateY = e.pageY - menuHeight;
    }
    this.el.style.transform = `translate(${translateX}px,${translateY}px)`;
  }
  // 隐藏菜单
  hide() {
    this.el.style.display = 'none';
  }
  // 移除所有子菜单
  removeChildMenus() {
    let childMenus = document.querySelectorAll(`.${config.wrapperClassName}-lv${this.level + 1}`);
    childMenus.forEach((menu) => {
      menu.remove();
    });
  }
}
