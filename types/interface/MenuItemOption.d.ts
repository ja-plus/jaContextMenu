import MenuOption from './MenuOption';
export declare type MenuItemType = 'hr' | '---';
export default interface MenuItemOption<Payload> {
    label?: string;
    tip?: string;
    disabled?: boolean;
    type?: MenuItemType;
    onclick?(e: Event, payload: Payload): void;
    children?: MenuOption<Payload>;
}
