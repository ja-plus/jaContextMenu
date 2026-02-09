/**
 * absolute position panel
 */
import config from './config';
import { panelStyle } from './style';
import { BaseAttr } from './types/common';
import h from './utils/h';
import { dealBaseAttr, getWindowSize, injectCss } from './utils/utils';

export type PanelPosition = { x: number; y: number; position?: [PanelPositionEnum, PanelPositionEnum] };
export type PanelOption = {
  /** Panel width */
  width?: number;
  position?: 'fixed' | null;
  zIndex?: number;
  class?: BaseAttr<string, void>;
};

export enum PanelPositionEnum {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
}

export type PanelShowResult = {
  position: [PanelPositionEnum, PanelPositionEnum];
};

export default class Panel {
  el: HTMLElement | null = null;
  /** panel width */
  width?: number;
  /** panel height (getBoundingClientRect) */
  height = 0;
  panelOption?: PanelOption;

  constructor(panelOption?: PanelOption) {
    this.panelOption = panelOption;
    const width = this.panelOption ? this.panelOption.width : void 0;
    if (typeof width === 'string') {
      throw new TypeError('Invalid width');
    }
    this.width = width;
    injectCss(config.panelCssId, panelStyle());
    this.createEl();
    this.addEventListener();
  }

  createEl() {
    const { zIndex, position } = this.panelOption || {};
    this.el = h(`div`, {
      style: {
        width: this.width ? this.width + 'px' : void 0,
        zIndex,
        position,
      },
      classList: [config.panelClass, 'hide'],
    });
  }

  private addEventListener() {
    const el = this.el;
    if (el) {
      el.addEventListener('click', this.eventListenerCb);
      el.addEventListener('contextmenu', this.eventListenerCb);
    }
  }

  private eventListenerCb(e: Event) {
    e.preventDefault();
    e.stopPropagation();
  }
  /**
   * show menu
   */
  show(e: PanelPosition, payload?: any): PanelShowResult {
    if (e instanceof MouseEvent) {
      e.preventDefault();
      e.stopPropagation(); // prevent trigger ancestor's contextmenu event
    }
    this.updatePanelAttr(payload);
    if (!this.el) {
      throw new Error('Panel element not found');
    }
    // this.el.classList.remove('hide');
    const { x, y, position } = this.calcPosition(e);
    this.el.style.transform = `translate(${x}px,${y}px)`;
    return {
      position,
    };
  }

  updatePanelAttr(payload?: any) {
    if (!this.el) throw new Error('error');
    const className = dealBaseAttr(this.panelOption?.class, payload) || '';
    this.el.className = `${config.panelClass} ${className}`;
  }
  /**
   * calc menu position x,y
   */
  calcPosition(e: PanelPosition): Required<PanelPosition> {
    if (!this.el) throw new Error('error');
    const windowSize = getWindowSize();
    const { height, width } = this.el.getBoundingClientRect();
    this.height = height;
    this.width = width;
    let { x, y } = e;
    const position: [PanelPositionEnum, PanelPositionEnum] = [PanelPositionEnum.RIGHT, PanelPositionEnum.BOTTOM];
    if (e.position?.length === 2) {
      position[0] = e.position[0];
      position[1] = e.position[1];
    }
    if (position[0] === PanelPositionEnum.LEFT) {
      // left have enough space
      if (x > width) {
        x = x - width; // move right
        position[0] = PanelPositionEnum.RIGHT;
      }
    }
    if (position[0] === PanelPositionEnum.RIGHT) {
      // right not have enough space
      if (windowSize.cW - x < width) {
        x = windowSize.cW - width; // move left
        position[0] = PanelPositionEnum.LEFT;
      }
    }
    if (position[1] === PanelPositionEnum.TOP) {
      // top have enough space
      if (y > height) {
        y = y - height; // move to bottom
        position[1] = PanelPositionEnum.BOTTOM;
      }
    }
    if (position[1] === PanelPositionEnum.BOTTOM) {
      // bottom not have enough space
      if (windowSize.cH - y < height && y >= height) {
        y = y - height; // move to top
        position[1] = PanelPositionEnum.TOP;
      }
    }
    return { x, y, position };
  }
  /**
   * hide menu
   */
  hide() {
    this.el && this.el.classList.add('hide');
  }
  /** dom remove*/
  destroy() {
    if (!this.el) return;
    this.el.removeEventListener('click', this.eventListenerCb);
    this.el.removeEventListener('contextmenu', this.eventListenerCb);
    this.el.remove();
    this.el = null;
  }
}
