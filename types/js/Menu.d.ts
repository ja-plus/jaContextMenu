export default class Menu {
    constructor(level: any, option: any, innerOption: any);
    level: number;
    el: HTMLElement;
    width: number;
    height: number;
    items: any[];
    children: Array<MenuItem>;
    payload: any;
    innerOption: {
        position: string;
    };
    init(): void;
    addChildren(items: any): void;
    show(e: any, payload: any): void;
    calcPosition(e: any): void;
    hide(): void;
    removeAllHover(): void;
    removeChildMenus(): void;
    removeItemHover(): void;
    closeAllMenus(): void;
}
import MenuItem from "./MenuItem.js";
