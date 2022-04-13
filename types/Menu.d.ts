import MenuItem from './MenuItem';
import MenuItemOption from './interface/MenuItemOption';
import MenuOption from './interface/MenuOption';
export interface InnerOption {
    position?: string;
}
export default class Menu {
    level: number;
    el: HTMLElement;
    width: number;
    height: number;
    items: MenuItemOption[];
    children: MenuItem[];
    payload: any;
    innerOption: InnerOption;
    constructor(level: number, option: MenuOption, innerOption?: InnerOption);
    init(): void;
    addChildren(items: MenuItemOption[]): void;
    show(e: MouseEvent, payload: any): void;
    calcPosition(e: MouseEvent): void;
    hide(): void;
    removeAllHover(): void;
    removeChildMenus(): void;
    removeItemHover(): void;
    closeAllMenus(): void;
}
