import MenuOption from './MenuOption';
import { BaseAttr } from './common';
export type MenuItemType = 'hr' | '---';
export default interface MenuItemOption<Payload> {
    icon?: BaseAttr<string, Payload>;
    class?: BaseAttr<string, Payload>;
    label?: BaseAttr<string, Payload>;
    tip?: BaseAttr<string, Payload>;
    disabled?: BaseAttr<boolean, Payload>;
    type?: MenuItemType;
    customItem?: HTMLElement;
    onclick?(e: Event, payload: Payload): void;
    children?: MenuOption<Payload>;
}
