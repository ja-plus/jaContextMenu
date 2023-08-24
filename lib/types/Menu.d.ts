import MenuItem from './MenuItem';
import Panel, { PanelPosition } from './Panel';
import { MenuOption } from './types/MenuOption';
export default class Menu<Payload> extends Panel {
    ul: HTMLElement;
    level: number;
    menuOption: MenuOption<Payload> | null;
    children: MenuItem<Payload>[];
    payload?: Payload;
    constructor(level: number, menuOption: MenuOption<Payload>);
    createUl(): void;
    updateMenuAttr(): void;
    renderMenuItem(): void;
    show(e: PanelPosition, payload?: any): void;
    prepareMenuShow(payload: any): void;
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
