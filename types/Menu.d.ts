import MenuItem from './MenuItem';
import MenuItemOption from './interface/MenuItemOption';
import MenuOption from './interface/MenuOption';
import Panel, { PanelOption, PanelPosition } from './Panel';
export default class Menu extends Panel {
    ul: HTMLElement;
    level: number;
    items: MenuItemOption[];
    children: MenuItem[];
    payload: any;
    constructor(level: number, option: MenuOption, panelOption?: PanelOption);
    init(): void;
    addChildren(items: MenuItemOption[]): void;
    show(e: PanelPosition, payload?: any): void;
    calcPosition(e: MouseEvent): {
        x: number;
        y: number;
    };
    removeAllHover(): void;
    removeChildMenus(): void;
    removeItemHover(): void;
    closeAllMenus(): void;
    destroy(): void;
}
