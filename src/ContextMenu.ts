import Menu from './Menu';
import { PanelPosition } from './Panel';
import config from './config';
import { contextMenuStyle, panelStyle } from './style';
import ContextMenuOption from './types/ContextMenuOption';
import MenuOption from './types/MenuOption';
import h from './utils/h';

export interface MenuWrapper<T> {
  show(position: PanelPosition, payload?: T): void;
  destroy(): void;
}
export default class ContextMenu {
  /** 保存生成的菜单,便于统一管理 */
  private storeMenus: Menu<any>[] = [];
  clickEventFunc: (e: MouseEvent) => void;

  contextMenuOption: ContextMenuOption;
  constructor(option: ContextMenuOption = {}) {
    this.injectCss();
    // this.#onPageResize();
    this.hideMenuEventListener();
    const defaultConfig: ContextMenuOption = {
      width: config.defaultMenuWidth,
      fixMenuWhenScroll: false,
      hideMenuWhenScroll: true,
    };
    this.contextMenuOption = Object.assign(defaultConfig, option);
    if (this.contextMenuOption.hideMenuWhenScroll) {
      this.scrollListener();
    }
  }
  /**
   * create style tag (<style>)，inject css
   */
  private injectCss() {
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
  private hideMenuEventListener() {
    // add once event
    if (!this.clickEventFunc) {
      this.clickEventFunc = e => {
        if (this.storeMenus.some(menu => menu.el.style.display === 'block')) {
          this.hideAllMenu();
        }
      };
      /* capture:true: prevent click the element that stopPropagation in click event. */
      window.addEventListener('click', this.clickEventFunc /* { capture: true } */);
    }
  }
  /** if scroll hide all menu */
  private scrollListener() {
    window.addEventListener('scroll', () => {
      this.hideAllMenu();
    });
  }
  /**
   * create a context menu
   * @param {MenuOption<Payload>} items
   * @template Payload payload type
   * @returns
   */
  create<Payload>(menuOption: MenuOption<Payload>): MenuWrapper<Payload> {
    // if not transfer width ,use default width
    if (!menuOption.width) menuOption.width = this.contextMenuOption.width;
    // if (!menuOption.zIndex) menuOption.zIndex = this.contextMenuOption.baseZIndex;
    if (this.contextMenuOption.fixMenuWhenScroll) menuOption.position = 'fixed';

    const mainMenu = new Menu(0, menuOption);
    this.storeMenus.push(mainMenu);
    document.body.appendChild(mainMenu.el);
    return {
      show: (position, payload) => {
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
   * show a menu and hide other menus.
   * @param {Menu} menu
   */
  showMenu<T>(position: PanelPosition, menu: Menu<T>, payload?: T) {
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
  destroy(menu: Menu<any>) {
    menu.destroy();
    this.storeMenus = this.storeMenus.filter(menuItem => menu !== menuItem);
  }
}
