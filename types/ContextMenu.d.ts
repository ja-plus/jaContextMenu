import Menu from './Menu';
import ContextMenuOption from './interface/ContextMenuOption';
import MenuOption from './interface/MenuOption';
import { PanelPosition } from './Panel';
export interface MenuWrapper<T> {
    show(position: PanelPosition, payload?: T): void;
    destroy(): void;
}
export default class ContextMenu {
    storeMenus: Menu<any>[];
    clickEventFunc: () => void;
    option: ContextMenuOption;
    constructor(option?: ContextMenuOption);
    injectCss(): void;
    hideMenuEventListener(): void;
    scrollListener(): void;
    create<Payload>(option: MenuOption<Payload>): MenuWrapper<Payload>;
    showMenu<T>(position: PanelPosition, menu: Menu<T>, payload?: T): void;
    hideAllMenu(): void;
    destroy(menu: Menu<any>): void;
}
