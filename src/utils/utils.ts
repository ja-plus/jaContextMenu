
interface ScrollSize{
  htmlEl: HTMLElement;
  width: number;
  height: number;
}
/**获取滚动条宽度 */
export function getClientScrollSize():ScrollSize{
  let html = document.querySelector("html");
  let ss = {
    htmlEl:html,
    width: window.innerWidth - html.clientWidth,
    height: window.innerHeight - html.clientHeight
  }
  return ss 
}