/**
 * absolute position panel
 */
import h from './utils/h';
import config from './config';
import { injectCss, windowSize } from './utils/utils';
import { panelStyle } from './style';

export type PanelPosition = { x: number; y: number; position?: [PanelPositionEnum, PanelPositionEnum] };
export type PanelOption = {
  /** Panel width */
  width?: number;
  position?: 'fixed' | null;
  zIndex?: number;
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
    injectCss(config.panelCssId, panelStyle());
    this.createEl();
    this.addEventListener();
  }

  createEl() {
    this.el = h(`div.${config.panelClass}`, {
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
  show(e: PanelPosition): PanelShowResult {
    if (e instanceof MouseEvent) {
      e.preventDefault();
      e.stopPropagation(); // prevent trigger ancestor's contextmenu event
    }
    this.el.classList.remove('hide');
    const { x, y, position } = this.calcPosition(e);
    this.el.style.transform = `translate(${x}px,${y}px)`;
    return {
      position,
    };
  }
  /**
   * calc menu position x,y
   */
  calcPosition(e: PanelPosition): Required<PanelPosition> {
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
    this.el.classList.add('hide');
  }
  /** dom remove*/
  destroy() {
    this.el.removeEventListener('click', this.eventListenerCb);
    this.el.removeEventListener('contextmenu', this.eventListenerCb);
    this.el.remove();
  }
}
