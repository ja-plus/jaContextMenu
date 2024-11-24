import MenuItem from './MenuItem';
import Panel from './Panel';
import { MenuOption } from './types/MenuOption';
export default class Menu<Payload> extends Panel {
    id: string | undefined;
    ul: HTMLElement;
    level: number;
    menuOption: MenuOption<Payload> | null;
    children: MenuItem<Payload>[];
    payload?: Payload;
    constructor(menuOption: MenuOption<Payload>, init?: {
        level?: number;
        id?: string;
    });
    createUl(): void;
    updateMenuAttr(): void;
    renderMenuItem(): void;
    show(e: Parameters<Panel['show']>[0], payload?: any): import("./Panel").PanelShowResult;
    prepareMenuShow(payload: any): void;
    calcPosition(...p: Parameters<Panel['calcPosition']>): {
        x: number;
        y: number;
        position: [import("./Panel").PanelPositionEnum, import("./Panel").PanelPositionEnum];
    };
    private closeMenus;
    removeAllHover(): void;
    removeChildMenus(): void;
    removeItemHover(): void;
    closeAllMenus(): void;
    hide(): void;
    destroy(): void;
}
