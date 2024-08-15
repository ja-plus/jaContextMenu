/**
 * absolute position panel
 */
import h from './utils/h';
import config from './config';
import { injectCss, windowSize } from './utils/utils';
import { panelStyle } from './style';

export type PanelPosition = { x: number; y: number };
export type PanelOption = {
  /** Panel width */
  width?: number;
  position?: 'fixed' | null;
  zIndex?: number;
};
export default class Panel {
  el!: HTMLElement;
  /** panel width */
  width: number;
  /** panel height (getBoundingClientRect) */
  height = 0;
  panelOption?: PanelOption;

  constructor(panelOption?: PanelOption) {
    this.panelOption = panelOption;
    this.width = this.panelOption?.width || config.defaultMenuWidth;
    if (typeof this.panelOption?.width === 'string') {
      throw new TypeError('Invalid width type.');
    }
    injectCss(config.panelCssId, panelStyle);
    this.createEl();
    this.addEventListener();
  }

  createEl() {
    this.el = h(`div.${config.panelClassName}`, {
      style: {
        width: this.width + 'px',
        zIndex: this.panelOption?.zIndex,
        position: this.panelOption?.position, // fix
      },
    });
  }

  private addEventListener() {
    this.el?.addEventListener('click', this.eventListenerCb);
    this.el?.addEventListener('contextmenu', this.eventListenerCb);
  }

  private eventListenerCb(e: Event) {
    e.preventDefault();
    e.stopPropagation();
  }
  /**
   * show menu
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
   * calc menu position x,y
   */
  calcPosition(e: PanelPosition) {
    this.height = this.el.getBoundingClientRect().height;
    let { x, y } = e;

    // right not have enough space
    if (windowSize.clientWidth - x < this.width) {
      x = windowSize.clientWidth - this.width;
    }
    // bottom not have enough space
    if (windowSize.clientHeight - y < this.height) {
      y = e.y - this.height;
    }
    return { x, y };
  }
  /**
   * hide menu
   */
  hide() {
    this.el.style.display = 'none';
  }
  /** dom remove*/
  destroy() {
    this.el.removeEventListener('click', this.eventListenerCb);
    this.el.removeEventListener('contextmenu', this.eventListenerCb);
    this.el.remove();
  }
}
