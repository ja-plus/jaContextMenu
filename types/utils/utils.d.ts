import { Text } from '@/interface/common';
interface WindowSize {
    htmlEl: HTMLElement;
    scrollWidth: number;
    scrollHeight: number;
    clientWidth: number;
    clientHeight: number;
}
declare let _storeWindowSize: WindowSize;
export declare function getWindowSize(): WindowSize;
export { _storeWindowSize as windowSize };
export declare function dealTextFmt<T>(data: Text<T>, payload: T): string;
