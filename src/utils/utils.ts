import { BaseAttr } from '@/interface/common';

interface WindowSize {
  /** <html> element */
  htmlEl: HTMLElement;
  /** window.innerWidth - html.clientWidth */
  scrollWidth: number;
  /** window.innerHeight - html.clientHeight */
  scrollHeight: number;
  /** 减去滚动条的宽度 html.clientWidth*/
  clientWidth: number;
  /** 减去滚动条的高度 html.clientHeight */
  clientHeight: number;
}
let _storeWindowSize: WindowSize;
/** 获取界面大小 */
export function getWindowSize(): WindowSize {
  const html = document.querySelector('html');
  const ss = {
    htmlEl: html,
    scrollWidth: window.innerWidth - html.clientWidth,
    scrollHeight: window.innerHeight - html.clientHeight,
    clientWidth: html.clientWidth,
    clientHeight: html.clientHeight,
  };
  _storeWindowSize = ss; // store
  return ss;
}

getWindowSize();
window.addEventListener('resize', () => {
  // console.log('get getWindowSize');
  getWindowSize();
});

export { _storeWindowSize as windowSize };

export function dealTextFmt<T>(data: BaseAttr<string, T>, payload: T) {
  return typeof data === 'function' ? data(payload) : data;
}
