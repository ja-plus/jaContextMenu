import { PanelOption } from '../Panel';
import { MenuItemOption } from './MenuItemOption';
export type MenuOption<Payload> = PanelOption & {
    arrowIcon?: MenuItemOption<Payload>['arrowIcon'];
    items?: MenuItemOption<Payload>[];
};
