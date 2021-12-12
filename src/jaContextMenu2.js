import h from './utils/h.js';
// import debounce from './utils/debounce.js';
import config from './config.js';
// import store from './store.js';
import Menu from './Menu.js';

const _cssStr = `
  .${config.wrapperClassName}, .${config.wrapperClassName} *{
    box-sizing: border-box;
  }
  .${config.wrapperClassName}{
    border: 1px solid #ddd;
    position: absolute;
    left: 0;top:0;
    background-color: #fff;
    padding: 2px 0 2px 0px;
    margin: 0;
    cursor: default;
    width: ${config.mainMenuWidth}px;
    display: none;
  }
  .${config.wrapperClassName} .divide{
    margin: 5px 0;
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
    width: ${config.childMenuWidth}px;
  }
  `;
export default class ContextMenu {
  /** @type {Menu} 保存生成的菜单,便于统一管理 */
  storeMenus = [];
  /** @type {Function} */
  clickEventFunc;
  constructor() {
    this.#injectCss();
    // this.#onPageResize();
    this.#hideMenuEventListener();
  }
  // 注入css
  #injectCss() {
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
  #hideMenuEventListener() {
    // add once event
    if (!this.clickEventFunc) {
      this.clickEventFunc = () => {
        this.hideAllMenu();
      };
      window.addEventListener('click', this.clickEventFunc);
    }
  }
  /**
   *
   * @param {Array<Object>} items 配置
   * @returns
   */
  create(items) {
    const mainMenu = new Menu(0, items);
    this.storeMenus.push(mainMenu);
    document.body.appendChild(mainMenu.el);
    return mainMenu;
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
  contextMenuFunc(menu) {
    // TODO: 隐藏其他菜单
    return function (e) {
      menu.show(e);
    };
  }
  hideAllMenu() {
    this.storeMenus.forEach((menu) => {
      menu.el.style.display = 'none';
    });
  }
}
