import { MenuOption } from './MenuOption';
import { BaseAttr } from './common';
export type MenuItemType = 'hr' | '---';
export interface MenuItemOption<Payload> {
    icon?: BaseAttr<string | HTMLElement, Payload>;
    arrowIcon?: BaseAttr<HTMLElement, Payload>;
    class?: BaseAttr<string, Payload>;
    label?: BaseAttr<string, Payload>;
    tip?: BaseAttr<string, Payload>;
    disabled?: BaseAttr<boolean, Payload>;
    show?: BaseAttr<boolean, Payload>;
    type?: MenuItemType;
    customItem?: BaseAttr<HTMLElement, Payload>;
    onclick?(e: Event, payload?: Payload): boolean | void;
    children?: MenuOption<Payload>;
}
