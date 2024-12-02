import { MenuItemOption } from './MenuItemOption';
export type ContextMenuOption = {
    width?: number;
    hideMenuWhenScroll?: boolean;
    fixMenuWhenScroll?: boolean;
    arrowIcon?: MenuItemOption<any>['arrowIcon'];
};
