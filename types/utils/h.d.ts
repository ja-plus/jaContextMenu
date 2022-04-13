interface Attrs {
    [key: string]: any;
    style?: {
        [key: string]: string | number;
    };
    dataset?: {
        [key: string]: string | number;
    };
    classList?: string[];
    onclick?(e: MouseEvent): void;
    oncontextmenu?(e: MouseEvent): void;
    onmouseenter?(e: MouseEvent): void;
}
export default function h(tag: string, attrs?: Attrs | string | number | HTMLElement[], children?: HTMLElement[]): HTMLElement;
export {};
