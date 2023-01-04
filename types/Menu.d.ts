import MenuItem from './MenuItem';
import MenuOption from './interface/MenuOption';
import Panel, { PanelPosition } from './Panel';
export default class Menu<Payload> extends Panel {
    ul: HTMLElement;
    level: number;
    menuOption: MenuOption<Payload>;
    children: MenuItem<Payload>[];
    payload: Payload;
    constructor(level: number, menuOption: MenuOption<Payload>);
    createUl(): void;
    updateMenuAttr(): void;
    renderMenuItem(): void;
    show(e: PanelPosition, payload?: any): void;
    calcPosition(e: PanelPosition): {
        x: number;
        y: number;
    };
    removeAllHover(): void;
    removeChildMenus(): void;
    removeItemHover(): void;
    closeAllMenus(): void;
    destroy(): void;
}
