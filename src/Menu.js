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
    console.log(parentMenu);
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
                this.childMenu?.show();
              }
            : () => {
                this.childMenu?.hide();
              },
        },
        [h('span.label', item.label), item.tip && h('span.tip', item.tip), item.children && h('span.right-arrow')]
      );
    }
    if (item.children) {
      this.childMenu = new Menu(this.level + 1, item.children);
      this.el.appendChild(this.childMenu.el);
    }
  }
}
export class Menu {
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
    this.el = h(`ul.${config.wrapperClassName}`, {
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
    this.children.forEach((item) => {
      this.el.appendChild(item.el);
    });
  }
  show() {
    this.el.style.display = 'block';
  }
  hide() {
    this.el.style.display = 'none';
  }
}
