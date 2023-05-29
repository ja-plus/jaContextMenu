import { MenuOption } from './MenuOption';
import { BaseAttr } from './common';
export type MenuItemType = 'hr' | '---';
export interface MenuItemOption<Payload> {
  /** item icon url or base64 */
  icon?: BaseAttr<string, Payload>;
  /** item class name */
  class?: BaseAttr<string, Payload>;
  /** item text */
  label?: BaseAttr<string, Payload>;
  /** tip text */
  tip?: BaseAttr<string, Payload>;
  /** if disabled item */
  disabled?: BaseAttr<boolean, Payload>;
  /**if show item */
  show?: BaseAttr<boolean, Payload>;
  /** value = '---' indicate splitLine */
  type?: MenuItemType;
  /** custom <li> */
  customItem?: HTMLElement;
  /**
   * Item click event
   * @param {MouseEvent} e
   * @param {Payload} payload data
   */
  onclick?(e: Event, payload: Payload): void;
  children?: MenuOption<Payload>;
}
