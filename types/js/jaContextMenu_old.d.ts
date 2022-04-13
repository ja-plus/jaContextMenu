export default ContextMenu;
declare class ContextMenu {
    create(config: Object): HTMLElement;
    showContextMenuFunc(contextMenuEle: any, payload: any): (e: any) => void;
    hideMenu(): void;
    deleteMenu(contextMenuEle: any): void;
    #private;
}
