import MenuOption from './MenuOption';
import { BaseAttr } from './common';
export declare type MenuItemType = 'hr' | '---';
export default interface MenuItemOption<Payload> {
    icon?: BaseAttr<string, Payload>;
    class?: BaseAttr<string, Payload>;
    label?: BaseAttr<string, Payload>;
    tip?: BaseAttr<string, Payload>;
    disabled?: boolean;
    type?: MenuItemType;
    customItem?: HTMLElement;
    onclick?(e: Event, payload: Payload): void;
    children?: MenuOption<Payload>;
}
