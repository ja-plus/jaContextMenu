import { BaseAttr } from '@/types/common';
interface WindowSize {
    htmlEl: HTMLElement;
    sW: number;
    sH: number;
    cW: number;
    cH: number;
}
declare let _storeWindowSize: WindowSize;
export declare function getWindowSize(): WindowSize;
export { _storeWindowSize as windowSize };
export declare function dealBaseAttr<T extends BaseAttr<B1, P>, P, B1>(data: T, payload: P): any;
export declare function injectCss(cssId: string, styleString: string): void;
