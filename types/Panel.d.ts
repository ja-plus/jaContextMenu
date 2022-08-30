import MenuOption from './interface/MenuOption';
export interface PanelOption {
    position?: string;
}
export default class Panel {
    el: HTMLElement;
    width: number;
    height: number;
    panelOption: PanelOption;
    constructor(option: MenuOption, panelOption?: PanelOption);
    show(e: MouseEvent): void;
    calcPosition(e: MouseEvent): {
        x: number;
        y: number;
    };
    hide(): void;
    destroy(): void;
}
