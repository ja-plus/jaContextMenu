export declare type PanelPosition = MouseEvent | {
    x: number;
    y: number;
};
export interface PanelOption {
    width?: number;
    position?: 'fixed' | null;
    zIndex?: number;
}
export default class Panel {
    el: HTMLElement;
    width: number;
    height: number;
    panelOption: PanelOption;
    constructor(panelOption?: PanelOption);
    createEl(): void;
    private addEventListener;
    private eventListenerCb;
    show(e: PanelPosition): void;
    calcPosition(e: PanelPosition): {
        x: number;
        y: number;
    };
    hide(): void;
    destroy(): void;
}
