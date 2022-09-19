import h from './utils/h';
// import debounce from './utils/debounce.js';
import config from './config.js';
// import store from './store.js';
import Menu from './Menu';
import ContextMenuOption from './interface/ContextMenuOption';
import MenuOption from './interface/MenuOption';
import { contextMenuStyle, panelStyle } from './style';
import { PanelOption, PanelPosition } from './Panel';

export interface MenuWrapper {
  show(position: PanelPosition, payload: any): void;
  destroy(): void;
}
export default class ContextMenu {
  /** 保存生成的菜单,便于统一管理 */
  storeMenus: Menu[] = [];
  clickEventFunc: () => void;

  option: ContextMenuOption;
  constructor(option: ContextMenuOption = {}) {
    this.injectCss();
    // this.#onPageResize();
    this.hideMenuEventListener();
    const defaultConfig = {
      width: config.defaultMenuWidth,
      fixMenuWhenScroll: false,
      hideMenuWhenScroll: true,
    };
    this.option = Object.assign(defaultConfig, option);
    if (this.option.hideMenuWhenScroll) {
      this.scrollListener();
    }
  }
  /**
   * 创建style标签，注入css
   */
  injectCss() {
    const titleTag = document.querySelector('head title');
    let style = document.querySelector(`#${config.cssId}`);
    if (!style) {
      // if not be injected
      style = h(`style#${config.cssId}`, {
        innerHTML: panelStyle + contextMenuStyle,
      });
      if (titleTag) {
        document.head.insertBefore(style, titleTag.nextElementSibling);
      } else {
        document.head.appendChild(style);
      }
    }
  }
  /** click and close menu listener */
  hideMenuEventListener() {
    // add once event
    if (!this.clickEventFunc) {
      this.clickEventFunc = () => {
        if (this.storeMenus.some(it => it.el.style.display === 'block')) {
          // 存在打开的菜单才关闭
          this.hideAllMenu();
        }
      };
      window.addEventListener('click', this.clickEventFunc, { capture: true });
    }
  }
  /** if scroll hide all menu */
  scrollListener() {
    window.addEventListener('scroll', () => {
      this.hideAllMenu();
    });
  }
  /**
   *
   * @param {Array<Object>} items 配置
   * @returns
   */
  create(option: MenuOption): MenuWrapper {
    const panelOption: PanelOption = {};
    if (this.option.fixMenuWhenScroll) {
      panelOption.position = 'fixed';
    }
    if (this.option.width) {
      option.width = this.option.width;
    }
    const mainMenu = new Menu(0, option, panelOption);
    this.storeMenus.push(mainMenu);
    document.body.appendChild(mainMenu.el);
    return {
      show: (position: PanelPosition, payload: any) => {
        this.showMenu(position, mainMenu, payload);
      },
      destroy: () => {
        this.destroy(mainMenu);
      },
    };
  }
  /** 监听窗口 */
  // #onPageResize() {
  //   let resizeFunc = debounce(() => {
  //     // save window inner size
  //     store.windowSize = {
  //       width: window.innerWidth,
  //       height: window.innerHeight,
  //     };
  //   });
  //   window.addEventListener('resize', resizeFunc);
  // }
  /**
   * 封装展示菜单
   * 因为要把其他菜单隐藏
   * @param {Menu} menu
   */
  showMenu(position: PanelPosition, menu: Menu, payload: any) {
    // 隐藏其他菜单
    this.storeMenus.forEach(item => {
      item.hide();
    });
    menu.show(position, payload);
  }
  hideAllMenu() {
    this.storeMenus.forEach(menu => {
      menu.el.style.display = 'none';
    });
  }
  destroy(menu: Menu) {
    menu.destroy();
    for (let i = 0; i < this.storeMenus.length; i++) {
      const m = this.storeMenus[i];
      if (m === menu) {
        this.storeMenus[i] = null;
        break;
      }
    }
    this.storeMenus = this.storeMenus.filter(Boolean);
  }
}
