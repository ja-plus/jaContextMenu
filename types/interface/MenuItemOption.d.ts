import MenuOption from './MenuOption';
import { Text } from './common';
export declare type MenuItemType = 'hr' | '---';
export default interface MenuItemOption<Payload> {
    icon?: Text<Payload>;
    class?: Text<Payload>;
    label?: Text<Payload>;
    tip?: Text<Payload>;
    disabled?: boolean;
    type?: MenuItemType;
    customItem?: HTMLElement;
    onclick?(e: Event, payload: Payload): void;
    children?: MenuOption<Payload>;
}
