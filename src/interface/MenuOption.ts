import { BaseAttr } from './common';
import MenuItemOption from './MenuItemOption';

export default interface MenuOption<Payload> {
  /** 菜单宽度*/
  width?: number;
  /** 自定义class */
  class?: BaseAttr<string, Payload>;
  /** 菜单项 */
  items?: MenuItemOption<Payload>[];
}
