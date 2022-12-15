/**
 * 简单的绝对定位panel块
 */
import h from './utils/h';
import config from './config';
import { windowSize } from './utils/utils';

export type PanelPosition = MouseEvent | { x: number; y: number };
/** panel 的配置 */
export interface PanelOption {
  /** 宽度 */
  width?: number;
  position?: 'fixed' | null;
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
  constructor(panelOption?: PanelOption) {
    this.panelOption = panelOption;
    this.width = this.panelOption?.width || config.defaultMenuWidth;
    this.createEl();
    this.addEventListener();
  }
  createEl() {
    this.el = h(`div.${config.panelClassName}`, {
      style: {
        width: this.width + 'px',
        zIndex: +config.baseZIndex,
        position: this.panelOption?.position, // fix
      },
    });
  }
  addEventListener() {
    this.el.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
    });
    this.el.addEventListener('contextmenu', e => {
      e.preventDefault();
      e.stopPropagation();
    });
  }
  /**
   * 展示菜单
   */
  show(e: PanelPosition) {
    if (e instanceof MouseEvent) {
      e.preventDefault();
      e.stopPropagation(); // 防止触发祖先元素定义的contextmenu事件
    }
    this.el.style.display = 'block';
    const { x, y } = this.calcPosition(e);
    this.el.style.transform = `translate(${x}px,${y}px)`;
  }
  /**
   * 计算菜单的位置 x,y
   */
  calcPosition(e: PanelPosition) {
    this.height = parseFloat(getComputedStyle(this.el).height);
    let x = e.x;
    let y = e.y;

    // right not have enough space
    if (windowSize.clientWidth - e.x < this.width) {
      x = windowSize.clientWidth - this.width;
    }
    // bottom not have enough space
    if (windowSize.clientHeight - e.y < this.height) {
      y = e.y - this.height;
    }
    return { x, y };
  }
  /**
   * 隐藏菜单
   */
  hide() {
    this.el.style.display = 'none';
  }
  /** 移除dom */
  destroy() {
    this.el.remove();
    this.el = null;
  }
}
