import { ThemeAttr } from './common';
import { MenuItemOption } from './MenuItemOption';
export type ContextMenuOption = {
    theme?: ThemeAttr;
    width?: number;
    hideMenuWhenScroll?: boolean;
    fixMenuWhenScroll?: boolean;
    arrowIcon?: MenuItemOption<any>['arrowIcon'];
};
