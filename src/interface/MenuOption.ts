import { Text } from './common';
import MenuItemOption from './MenuItemOption';

export default interface MenuOption<Payload> {
  /** 菜单宽度*/
  width?: number;
  /** 自定义class */
  class?: Text<Payload>;
  /** 菜单项 */
  items?: MenuItemOption<Payload>[];
}
