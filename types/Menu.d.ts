import MenuItem from './MenuItem';
import MenuItemOption from './interface/MenuItemOption';
import MenuOption from './interface/MenuOption';
import Panel, { PanelOption, PanelPosition } from './Panel';
export default class Menu<Payload> extends Panel {
    ul: HTMLElement;
    level: number;
    items: MenuItemOption<Payload>[];
    children: MenuItem<Payload>[];
    payload: any;
    constructor(level: number, option: MenuOption<Payload>, panelOption?: PanelOption);
    init(): void;
    renderMenuItem(): void;
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
