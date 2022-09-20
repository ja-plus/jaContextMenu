import Menu from './Menu';
import MenuItemOption from './interface/MenuItemOption';
export default class MenuItem<T> {
    parentMenu: Menu<T>;
    level: number;
    el: HTMLElement;
    itemOption: MenuItemOption<T>;
    childMenu: Menu<T>;
    constructor(level: number, item: MenuItemOption<T>, parentMenu: Menu<T>);
    init(): void;
    showChildMenu(e: MouseEvent): void;
    calcPosition(e: MouseEvent): void;
    hideOtherChildMenu(): void;
}
