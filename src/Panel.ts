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
  width?: number;
  /** panel height (getBoundingClientRect) */
  height = 0;
  panelOption?: PanelOption;

  constructor(panelOption?: PanelOption) {
    this.panelOption = panelOption;
    this.width = this.panelOption?.width;
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
        width: this.width ? this.width + 'px' : void 0,
        zIndex: this.panelOption?.zIndex,
        position: this.panelOption?.position, // fix
      },
      classList: ['hide'],
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
      e.stopPropagation(); // prevent trigger ancestor's contextmenu event
    }
    this.el.classList.remove('hide');
    const { x, y } = this.calcPosition(e);
    this.el.style.transform = `translate(${x}px,${y}px)`;
  }
  /**
   * calc menu position x,y
   */
  calcPosition(e: PanelPosition) {
    const { height, width } = this.el.getBoundingClientRect();
    this.height = height;
    this.width = width;
    let { x, y } = e;

    // right not have enough space
    if (windowSize.clientWidth - x < width) {
      x = windowSize.clientWidth - width;
    }
    // bottom not have enough space
    if (windowSize.clientHeight - y < height) {
      y = e.y - height;
    }
    return { x, y };
  }
  /**
   * hide menu
   */
  hide() {
    this.el.classList.add('hide');
  }
  /** dom remove*/
  destroy() {
    this.el.removeEventListener('click', this.eventListenerCb);
    this.el.removeEventListener('contextmenu', this.eventListenerCb);
    this.el.remove();
  }
}
