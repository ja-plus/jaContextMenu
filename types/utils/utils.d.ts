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
