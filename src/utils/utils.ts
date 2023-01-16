import { BaseAttr } from '@/types/common';

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
/**
 * 判断属性是否是函数，是则返回调用后的结果，否则返回值
 */
export function dealBastAttr<T extends BaseAttr<B1, P>, P, B1>(data: T, payload: P) {
  return typeof data === 'function' ? data(payload) : data || '';
}
