export default class ContextMenu {
    constructor(config: any);
    storeMenus: Menu;
    clickEventFunc: Function;
    config: {
        fixMenuWhenScroll: boolean;
        hideMenuWhenScroll: boolean;
    };
    injectCss(): void;
    hideMenuEventListener(): void;
    scrollListener(): void;
    create(option: any): {
        show: (e: any, payload: any) => void;
    };
    showMenu(e: any, menu: Menu, payload: any): void;
    hideAllMenu(): void;
}
import Menu from "./Menu.js";
