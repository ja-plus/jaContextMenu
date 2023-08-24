interface Attrs {
    [key: string]: any;
    style?: {
        [key: string]: any;
    };
    dataset?: {
        [key: string]: any;
    };
    classList?: string[];
    onclick?(e: MouseEvent): void;
    oncontextmenu?(e: MouseEvent): void;
    onmouseenter?(e: MouseEvent): void;
}
type ChildElements = (HTMLElement | undefined | null | string)[];
export default function h(tag: string, attrs?: Attrs | string | number | ChildElements, children?: ChildElements): HTMLElement;
export {};
