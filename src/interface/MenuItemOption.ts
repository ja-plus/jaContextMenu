import MenuOption from './MenuOption';

export type MenuItemType = 'hr' | '---';
export default interface MenuItemOption {
  /** 选项文字 */
  label?: string;
  /** 选项右侧文字提示 */
  tip?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** */
  type?: MenuItemType;
  /**
   * 点击事件
   * @param {Event} e 鼠标事件
   * @param {any} payload 点击时传入的数据
   */
  onclick?(e: Event, payload: any): void;
  children?: MenuOption;
}
