import { MenuItemOption } from './MenuItemOption';

export type ContextMenuOption = {
  /** default menu width */
  width?: number;
  /**  if hide menu when scroll */
  hideMenuWhenScroll?: boolean;
  /** if fix menu when scroll (hideMenuWhenScroll=false) */
  fixMenuWhenScroll?: boolean;
  /** custom sub menu arrow */
  arrowIcon?: MenuItemOption<any>['arrowIcon'];
};
