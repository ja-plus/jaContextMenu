import MenuOption from './MenuOption';
import { BaseAttr } from './common';
export type MenuItemType = 'hr' | '---';
/** 自定义展示文字 */
export default interface MenuItemOption<Payload> {
  /** 图标 */
  icon?: BaseAttr<string, Payload>;
  /** 自定义class */
  class?: BaseAttr<string, Payload>;
  /** 选项文字 */
  label?: BaseAttr<string, Payload>;
  /** 选项右侧文字提示 */
  tip?: BaseAttr<string, Payload>;
  /** 是否禁用 */
  disabled?: boolean;
  /** */
  type?: MenuItemType;
  /** 用户自定义展示的内容 */
  customItem?: HTMLElement;
  /**
   * 点击事件
   * @param {Event} e 鼠标事件
   * @param {Payload} payload 点击时传入的数据
   */
  onclick?(e: Event, payload: Payload): void;
  children?: MenuOption<Payload>;
}
