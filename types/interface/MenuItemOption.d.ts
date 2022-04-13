import MenuOption from './MenuOption';
export declare type MenuItemType = 'divide' | '---';
export default interface MenuItemOption {
    label?: string;
    tip?: string;
    disabled?: boolean;
    type?: MenuItemType;
    onclick?(e: Event, payload: any): void;
    children?: MenuOption;
}
