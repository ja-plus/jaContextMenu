import Menu from './Menu';
import { PanelPosition, PanelShowResult } from './Panel';
import { ContextMenuOption } from './types/ContextMenuOption';
import { MenuOption } from './types/MenuOption';
export interface MenuWrapper<T> {
    show(position: PanelPosition, payload?: T): PanelShowResult;
    hide(): void;
    destroy(): void;
    calcPosition: Menu<T>['calcPosition'];
}
export default class ContextMenu {
    private storeMenus;
    contextMenuOption: ContextMenuOption;
    constructor(option?: ContextMenuOption);
    private hideMenuEventListener;
    private clickEventFunc;
    private scrollListener;
    create<Payload>(menuOption: MenuOption<Payload>): MenuWrapper<Payload>;
    createAsync<Payload>(menuOption: MenuOption<Payload>): () => MenuWrapper<Payload>;
    showMenu<T>(position: PanelPosition, menu: Menu<T>, payload?: T): PanelShowResult;
    hideAllMenu(): void;
    destroy(menu: Menu<any>): void;
}
