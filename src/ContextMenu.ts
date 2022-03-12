import h from './utils/h';
// import debounce from './utils/debounce.js';
import config from './config.js';
// import store from './store.js';
import Menu, { InnerOption } from './Menu';
import ContextMenuOption from './interface/ContextMenuOption';
import MenuOption from './interface/MenuOption';

const _cssStr = `
  .${config.wrapperClassName}, .${config.wrapperClassName} *{
    box-sizing: border-box;
  }
  .${config.wrapperClassName}{
    -webkit-user-select:none;
    user-select: none;
    border: 1px solid #ddd;
    left: 0;top:0;
    background-color: #fff;
    padding: 2px 0 2px 0px;
    margin: 0;
    cursor: default;
    width: ${config.defaultMenuWidth}px;
    display: none;
  }
  /*主菜单*/
  .${config.wrapperClassName}[data-lv="0"]{ 
    position: absolute;
  }
  /*子菜单*/
  .${config.wrapperClassName} .${config.wrapperClassName}{ 
    position: absolute;
  }
  .${config.wrapperClassName} .divide{
    margin: ${config.menuItemDivideLineMargin}px 0;
    height: 1px;
    background-color: #ddd;
  }
  .${config.wrapperClassName} li {
    position: relative;
    padding: 0 30px 0 30px;
    list-style: none;
    line-height: ${config.menuItemHeight}px;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
  }
  .${config.wrapperClassName} li.disabled{
    color: #aaa;
    pointer-events: none;
  }
  .${config.wrapperClassName} li span.label {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .${config.wrapperClassName} li span.tip{
    color:#aaa;
    font-size: 12px;
  }
  .${config.wrapperClassName} li:hover:not(.divide):not(.disabled),
  .${config.wrapperClassName} li.${config.wrapperClassName}_hover{
    background-color: #eee;
  }
  .${config.wrapperClassName} li:hover:not(.divide):not(.disabled) .tip,
  .${config.wrapperClassName} li.${config.wrapperClassName}_hover .tip{
    color: #000;
  }
  .${config.wrapperClassName} li .right-arrow {
    position: absolute;
    right: 8px;
    top: 9px;
    border-top: 4px solid rgba(0,0,0,0);
    border-left: 4px solid #000;
    border-right: 4px solid rgba(0,0,0,0);
    border-bottom: 4px solid rgba(0,0,0,0);
  }
  .${config.wrapperClassName}_child{
  }
  `;

interface MenuWrapper {
  show(e: MouseEvent, payload: any): void;
}
export default class ContextMenu {
  /** 保存生成的菜单,便于统一管理 */
  storeMenus: Menu[] = [];
  clickEventFunc: () => void;

  option: ContextMenuOption;
  constructor(option: ContextMenuOption) {
    this.injectCss();
    // this.#onPageResize();
    this.hideMenuEventListener();
    const defaultConfig = {
      fixMenuWhenScroll: false,
      hideMenuWhenScroll: true,
    };
    this.option = Object.assign(defaultConfig, option);
    if (this.option.hideMenuWhenScroll) {
      this.scrollListener();
    }
  }
  // 注入css
  injectCss() {
    let style = document.querySelector(`#${config.cssId}`);
    if (!style) {
      // if not be injected
      style = h(`style#${config.cssId}`, {
        innerHTML: _cssStr,
      });
      document.head.appendChild(style);
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
    const innerOptiton: InnerOption = {};
    if (this.option.fixMenuWhenScroll) {
      innerOptiton.position = 'fixed';
    }
    const mainMenu = new Menu(0, option, innerOptiton);
    this.storeMenus.push(mainMenu);
    document.body.appendChild(mainMenu.el);
    return {
      show: (e: MouseEvent, payload: any) => {
        this.showMenu(e, mainMenu, payload);
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
   * 展示菜单
   * @param {Menu} menu
   */
  showMenu(e: MouseEvent, menu: Menu, payload: any) {
    // 隐藏其他菜单
    this.storeMenus.forEach(item => {
      item.hide();
    });
    menu.show(e, payload);
  }
  hideAllMenu() {
    this.storeMenus.forEach(menu => {
      menu.el.style.display = 'none';
    });
  }
}
