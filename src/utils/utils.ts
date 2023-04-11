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
  const { innerWidth, innerHeight } = window;
  const { clientWidth, clientHeight } = html;
  _storeWindowSize = {
    htmlEl: html,
    scrollWidth: innerWidth - clientWidth,
    scrollHeight: innerHeight - clientHeight,
    clientWidth,
    clientHeight,
  };
  return _storeWindowSize;
}

getWindowSize();
window.addEventListener('resize', () => {
  getWindowSize();
});

export { _storeWindowSize as windowSize };
/**
 * 判断属性是否是函数，是则返回调用后的结果，否则返回值
 */
export function dealBastAttr<T extends BaseAttr<B1, P>, P, B1>(data: T, payload: P) {
  return typeof data === 'function' ? data(payload) : data || '';
}
