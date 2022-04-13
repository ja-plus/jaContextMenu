import Menu from './Menu';
import ContextMenuOption from './interface/ContextMenuOption';
import MenuOption from './interface/MenuOption';
export interface MenuWrapper {
    show(e: MouseEvent, payload: any): void;
}
export default class ContextMenu {
    storeMenus: Menu[];
    clickEventFunc: () => void;
    option: ContextMenuOption;
    constructor(option?: ContextMenuOption);
    injectCss(): void;
    hideMenuEventListener(): void;
    scrollListener(): void;
    create(option: MenuOption): MenuWrapper;
    showMenu(e: MouseEvent, menu: Menu, payload: any): void;
    hideAllMenu(): void;
}
