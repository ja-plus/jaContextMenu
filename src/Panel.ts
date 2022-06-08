/**
 * 简单的绝对定位panel块
 */
import h from './utils/h';
import config from './config';
import MenuOption from './interface/MenuOption';
import { windowSize } from './utils/utils';

export interface PanelOption {
  position?: string;
}
/** 面板 */
export default class Panel {
  /** element*/
  el: HTMLElement;
  /** panel width 传百分比就不好计算 */
  width: number;
  /** panel height 计算得出的菜单高度 */
  height = 0;
  panelOption: PanelOption;
  constructor(option: MenuOption, panelOption?: PanelOption) {
    this.width = option?.width || config.defaultMenuWidth;
    this.panelOption = panelOption;
    this.el = h(`div.${config.panelClassName}`, {
      style: {
        width: this.width + 'px',
        zIndex: +config.baseZIndex,
        position: this.panelOption?.position, // fix
      },
    });
  }
  /**
   * 展示菜单
   */
  show(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation(); // 防止触发祖先元素定义的contextmenu事件
    this.el.style.display = 'block';
    const { x, y } = this.calcPosition(e);
    this.el.style.transform = `translate(${x}px,${y}px)`;
  }
  /**
   * 计算菜单的位置 x,y
   */
  calcPosition(e: MouseEvent) {
    this.height = parseFloat(getComputedStyle(this.el).height);
    let x = e.clientX;
    let y = e.clientY;

    // right not have enough space
    if (windowSize.clientWidth - e.clientX < this.width) {
      x = windowSize.clientWidth - this.width;
    }
    // bottom not have enough space
    if (windowSize.clientHeight - e.clientY < this.height) {
      y = e.clientY - this.height;
    }
    // add scrollX scrollY if page has scroll bar
    if (this.panelOption?.position !== 'fixed') {
      x += window.scrollX;
      y += window.scrollY;
    }
    return { x, y };
  }
  /**
   * 隐藏菜单
   */
  hide() {
    this.el.style.display = 'none';
  }
}
