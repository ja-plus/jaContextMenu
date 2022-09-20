import MenuOption from './interface/MenuOption';
export declare type PanelPosition = MouseEvent | {
    x: number;
    y: number;
};
export interface PanelOption {
    position?: string;
}
export default class Panel {
    el: HTMLElement;
    width: number;
    height: number;
    panelOption: PanelOption;
    constructor(option: MenuOption<any>, panelOption?: PanelOption);
    show(e: PanelPosition): void;
    calcPosition(e: PanelPosition): {
        x: number;
        y: number;
    };
    hide(): void;
    destroy(): void;
}
