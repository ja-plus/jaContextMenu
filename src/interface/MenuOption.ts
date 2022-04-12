import MenuItemOption from './MenuItemOption';

export default interface MenuOption {
  /** 菜单宽度*/
  width?: number;
  /** 菜单项 */
  items?: MenuItemOption[];
}
