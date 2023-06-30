import { PanelOption } from '../Panel';
import { BaseAttr } from './common';
import { MenuItemOption } from './MenuItemOption';
export type MenuOption<Payload> = PanelOption & {
    class?: BaseAttr<string, Payload>;
    items?: MenuItemOption<Payload>[];
};
