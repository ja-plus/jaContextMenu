export default class MenuItem {
    constructor(level: any, item: any, parentMenu: any);
    parentMenu: Menu;
    level: number;
    el: HTMLElement;
    itemOption: Object;
    childMenu: Menu;
    init(): void;
    showChildMenu(e: any): void;
    hideOtherChildMenu(): void;
}
import Menu from "./Menu.js";
