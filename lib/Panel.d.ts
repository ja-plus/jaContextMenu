export type PanelPosition = {
    x: number;
    y: number;
    position?: [PanelPositionEnum, PanelPositionEnum];
};
export type PanelOption = {
    width?: number;
    position?: 'fixed' | null;
    zIndex?: number;
};
export declare enum PanelPositionEnum {
    TOP = "top",
    BOTTOM = "bottom",
    LEFT = "left",
    RIGHT = "right"
}
export type PanelShowResult = {
    position: [PanelPositionEnum, PanelPositionEnum];
};
export default class Panel {
    el: HTMLElement | null;
    width?: number;
    height: number;
    panelOption?: PanelOption;
    constructor(panelOption?: PanelOption);
    createEl(): void;
    private addEventListener;
    private eventListenerCb;
    show(e: PanelPosition): PanelShowResult;
    calcPosition(e: PanelPosition): Required<PanelPosition>;
    hide(): void;
    destroy(): void;
}
