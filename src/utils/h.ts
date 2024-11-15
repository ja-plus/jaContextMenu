// HTMLElement attribute rewrite
interface Attrs {
  [key: string]: any;
  style?: { [key: string]: any };
  dataset?: { [key: string]: any };
  classList?: string[];
  onclick?(e: MouseEvent): void;
  oncontextmenu?(e: MouseEvent): void;
  onmouseenter?(e: MouseEvent): void;
}
type ChildElements = (HTMLElement | undefined | null | string)[];
/**
 * createElement function
 * h(tag[, text[,children]])
 * h(tag[, attrs[,children]])
 * h(tag[, children])
 * @param tag tag name ,support `tag#id.class` emmet grammar，only support id ,class
 * @param attrs Object - attribute，string - textContent，Array - children。children auto ignore falsy value
 * @param children
 */
export default function h(tag: string, attrs?: Attrs | string | number | ChildElements, children?: ChildElements): HTMLElement {
  // TODO: validate param type
  const tagMatch = tag.match(/^[\w\d]+/);
  if (!tagMatch) throw new Error('invalid tag');
  const tagStr = tagMatch[0];

  // parse emmet grammar (support id class)
  const id = tag.match(/#[\w\d_-]+/);
  // let classArr = tag.match(/(?<=\.)[\w\d_-]+/g) || []; // className // low level browser not support
  let classArr: string[] = tag.match(/\.[\w\d_-]+/g) || []; // className
  classArr = Array.from(classArr).map(it => it.substring(1));

  const elem: any = document.createElement(tagStr);
  if (id) elem.id = id[0].substring(1);

  if (Array.isArray(attrs)) {
    children = attrs;
  } else if (typeof attrs === 'object' && attrs !== null) {
    for (const attr in attrs) {
      if (attr === 'style' || attr === 'dataset') {
        // if (attr === 'style' && 'cssText' in attrs.style) {
        //   elem.style.cssText = attrs.style.cssText;
        // }
        const v = attrs[attr];
        for (const key in v) {
          // if (attr === 'style' && key === 'cssText') continue;
          elem[attr][key] = v[key];
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
      if (!child) return;

      if (child instanceof HTMLElement) elem.appendChild(child);
      else console.error(child, 'not instance of HTMLElement');
    });
  }

  return elem;
}
