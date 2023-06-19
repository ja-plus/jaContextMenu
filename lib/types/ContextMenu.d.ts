import Menu from './Menu';
import { PanelPosition } from './Panel';
import { ContextMenuOption } from './types/ContextMenuOption';
import { MenuOption } from './types/MenuOption';
export interface MenuWrapper<T> {
    show(position: PanelPosition, payload?: T): void;
    hide(): void;
    destroy(): void;
}
export default class ContextMenu {
    private storeMenus;
    contextMenuOption: ContextMenuOption;
    constructor(option?: ContextMenuOption);
    private injectCss;
    private hideMenuEventListener;
    private clickEventFunc;
    private scrollListener;
    create<Payload>(menuOption: MenuOption<Payload>): MenuWrapper<Payload>;
    showMenu<T>(position: PanelPosition, menu: Menu<T>, payload?: T): void;
    hideAllMenu(): void;
    destroy(menu: Menu<any>): void;
}
