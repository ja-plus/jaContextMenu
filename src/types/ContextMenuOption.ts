import { ThemeAttr } from './common';
import { MenuItemOption } from './MenuItemOption';

export type ContextMenuOption = {
  /** menu theme */
  theme?: ThemeAttr;
  /** default menu width */
  width?: number;
  /**  if hide menu when scroll */
  hideMenuWhenScroll?: boolean;
  /** if fix menu when scroll (hideMenuWhenScroll=false) */
  fixMenuWhenScroll?: boolean;
  /** custom sub menu arrow */
  arrowIcon?: MenuItemOption<any>['arrowIcon'];
};
