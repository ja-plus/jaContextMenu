// HTMLElement属性重写
interface Attrs {
  [key: string]: any;
  style?: { [key: string]: string | number };
  dataset?: { [key: string]: string | number };
  classList?: string[];
  onclick?(e: MouseEvent): void;
  oncontextmenu?(e: MouseEvent): void;
  onmouseenter?(e: MouseEvent): void;
}
/**
 * createElement function
 * h(tag[, text[,children]])
 * h(tag[, attrs[,children]])
 * h(tag[, children])
 * @param {String} tag 标签名称，支持tag#id.class emmet写法，暂支持id ,class
 * @param {Attrs | String | Number | HTMLElement[]} attrs 传Object为属性，传String为textContent，传数组为children
 * @param {HTMLElement[]} children
 */
export default function h(tag: string, attrs?: Attrs | string | number | HTMLElement[], children?: HTMLElement[]): HTMLElement {
  // TODO: validate param type
  // 解析emmet 语法 (暂支持id class, 防止解析字符串影响更多性能)
  const id = tag.match(/#[\w\d_-]+/);
  // let classArr = tag.match(/(?<=\.)[\w\d_-]+/g) || []; // className // 低版本浏览器不支持零宽断言
  let classArr: string[] = tag.match(/\.[\w\d_-]+/g) || []; // className
  classArr = Array.from(classArr).map(it => it.substring(1));
  tag = tag.match(/^[\w\d]+/)[0];

  const elem: any = document.createElement(tag);
  if (id) elem.id = id[0].substring(1);

  if (Array.isArray(attrs)) {
    children = attrs;
  } else if (typeof attrs === 'object' && attrs !== null) {
    for (const attr in attrs) {
      if (attr === 'style' || attr === 'dataset') {
        for (const key in attrs[attr]) {
          elem[attr][key] = attrs[attr][key];
        }
      } else if (attr === 'classList' && Array.isArray(attrs.classList)) {
        classArr = classArr.concat(attrs.classList.filter(Boolean));
      } else {
        elem[attr] = attrs[attr];
      }
    }
  } else if (typeof attrs === 'string' || typeof attrs === 'number') {
    elem.textContent = String(attrs);
  }

  if (classArr.length) elem.classList.add(...classArr);

  if (children) {
    children.forEach(child => {
      if (child instanceof HTMLElement) elem.appendChild(child);
      else if (child !== null && child !== undefined) console.error(child, 'not instance of HTMLElement');
    });
  }

  return elem;
}
