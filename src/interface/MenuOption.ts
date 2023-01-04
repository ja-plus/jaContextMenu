import { PanelOption } from '@/Panel';
import { BaseAttr } from './common';
import MenuItemOption from './MenuItemOption';

export default interface MenuOption<Payload> extends PanelOption {
  /** 自定义class */
  class?: BaseAttr<string, Payload>;
  /** 菜单项 */
  items?: MenuItemOption<Payload>[];
}
