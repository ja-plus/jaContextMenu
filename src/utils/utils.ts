import { BaseAttr } from '@/types/common';
import h from './h';

interface WindowSize {
  /** <html> element */
  htmlEl: HTMLElement;
  /** window.innerWidth - html.clientWidth */
  sW: number;
  /** window.innerHeight - html.clientHeight */
  sH: number;
  /** html.clientWidth, minus scrollbars size*/
  cW: number;
  /** html.clientHeight， minus scrollbars size */
  cH: number;
}
let _storeWindowSize: WindowSize;

export function getWindowSize(): WindowSize {
  const html = document.querySelector('html') as HTMLElement;
  const { innerWidth, innerHeight } = window;
  const { clientWidth, clientHeight } = html;
  _storeWindowSize = {
    htmlEl: html,
    sW: innerWidth - clientWidth,
    sH: innerHeight - clientHeight,
    cW: clientWidth,
    cH: clientHeight,
  };
  return _storeWindowSize;
}

getWindowSize();
window.addEventListener('resize', () => {
  getWindowSize();
});

export { _storeWindowSize as windowSize };
/**
 * Determine whether the attribute is a function, if it is, return the result after calling, otherwise return the value
 */
export function dealBaseAttr<T extends BaseAttr<B1, P>, P, B1>(data: T, payload: P) {
  return typeof data === 'function' ? data(payload) : data || '';
}

/**
 * create style tag (<style>)，inject css
 */
export function injectCss(cssId: string, styleString: string) {
  let style = document.getElementById(cssId);
  if (!style) {
    // if not be injected
    style = h(`style#${cssId}`, {
      innerHTML: styleString,
    });
    const titleTag = document.querySelector('head title');
    if (titleTag) {
      document.head.insertBefore(style, titleTag.nextElementSibling);
    } else {
      document.head.appendChild(style);
    }
  }
}
