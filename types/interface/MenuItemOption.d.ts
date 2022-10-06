import MenuOption from './MenuOption';
export declare type MenuItemType = 'hr' | '---';
export declare type TextFormatter<T> = (payload: T) => string;
export default interface MenuItemOption<Payload> {
    icon?: string;
    label?: string | TextFormatter<Payload>;
    tip?: string | TextFormatter<Payload>;
    disabled?: boolean;
    type?: MenuItemType;
    customItem?: HTMLElement;
    onclick?(e: Event, payload: Payload): void;
    children?: MenuOption<Payload>;
}
