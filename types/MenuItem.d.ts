import Menu from './Menu';
import MenuItemOption from './interface/MenuItemOption';
export default class MenuItem {
    parentMenu: Menu;
    level: number;
    el: HTMLElement;
    itemOption: MenuItemOption;
    childMenu: Menu;
    constructor(level: number, item: MenuItemOption, parentMenu: Menu);
    init(): void;
    showChildMenu(e: MouseEvent): void;
    calcPosition(e: MouseEvent): void;
    hideOtherChildMenu(): void;
}
