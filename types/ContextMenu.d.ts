import Menu from './Menu';
import ContextMenuOption from './interface/ContextMenuOption';
import MenuOption from './interface/MenuOption';
import { PanelPosition } from './Panel';
export interface MenuWrapper<T> {
    show(position: PanelPosition, payload?: T): void;
    destroy(): void;
}
export default class ContextMenu {
    private storeMenus;
    clickEventFunc: () => void;
    contextMenuOption: ContextMenuOption;
    constructor(option?: ContextMenuOption);
    private injectCss;
    private hideMenuEventListener;
    private scrollListener;
    create<Payload>(menuOption: MenuOption<Payload>): MenuWrapper<Payload>;
    showMenu<T>(position: PanelPosition, menu: Menu<T>, payload?: T): void;
    hideAllMenu(): void;
    destroy(menu: Menu<any>): void;
}
