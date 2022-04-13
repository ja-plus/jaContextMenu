function h(tag, attrs, children) {
    let id = tag.match(/#[\w\d_-]+/);
    let classArr = tag.match(/\.[\w\d_-]+/g) || [];
    classArr = classArr.map((it) => it.substring(1));
    tag = tag.match(/^[\w\d]+/)[0];
    let elem = document.createElement(tag);
    if (id)
        elem.id = id[0].substring(1);
    if (Array.isArray(attrs)) {
        children = attrs;
    }
    else if (typeof attrs === 'object' && attrs !== null) {
        for (const attr in attrs) {
            if (attr === 'style' || attr === 'dataset') {
                for (const key in attrs[attr]) {
                    elem[attr][key] = attrs[attr][key];
                }
            }
            else if (attr === 'classList' && Array.isArray(attrs[attr])) {
                classArr = classArr.concat(attrs[attr]);
            }
            else {
                elem[attr] = attrs[attr];
            }
        }
    }
    else if (typeof attrs === 'string' || typeof attrs === 'number') {
        elem.textContent = String(attrs);
    }
    if (classArr)
        elem.classList.add(...classArr);
    if (children) {
        children.forEach((child) => {
            if (child instanceof HTMLElement)
                elem.appendChild(child);
            else if (child !== null && child !== undefined)
                console.error(child, 'not instance of HTMLElement');
        });
    }
    return elem;
}

var config = {
  cssId: 'jacontextmenu-css',
  wrapperClassName: 'jacontextmenu',
  defaultMenuWidth: 200,
  // childMenuWidth: 150, // 自动继承父菜单宽度
  menuItemHeight: 24,
  menuItemDivideLineMargin: 5, // type == 'divide'
  baseZIndex: 1000, // 基准z-index
};

let _storeWindowSize;
function getWindowSize() {
    const html = document.querySelector('html');
    const ss = {
        htmlEl: html,
        scrollWidth: window.innerWidth - html.clientWidth,
        scrollHeight: window.innerHeight - html.clientHeight,
        clientWidth: html.clientWidth,
        clientHeight: html.clientHeight,
    };
    _storeWindowSize = ss;
    return ss;
}
getWindowSize();
window.addEventListener('resize', () => {
    console.log('get getWindowSize');
    getWindowSize();
});

class MenuItem {
    constructor(level, item, parentMenu) {
        this.parentMenu = parentMenu;
        this.level = level;
        this.itemOption = item;
        this.init();
    }
    init() {
        const item = this.itemOption;
        if (item.type === 'divide' || item.type === '---') {
            this.el = h('li.divide');
        }
        else {
            this.el = h('li', {
                classList: item.disabled ? ['disabled'] : [],
                onclick: e => {
                    if (!item.disabled) {
                        const payload = this.parentMenu.payload;
                        item.onclick && item.onclick(e, payload);
                        if (!item.children)
                            this.parentMenu.closeAllMenus();
                    }
                },
                onmouseenter: item.children
                    ? e => {
                        this.showChildMenu(e);
                    }
                    : () => {
                        this.hideOtherChildMenu();
                    },
            }, [h('span.label', item.label), item.tip && h('span.tip', item.tip), item.children && h('span.right-arrow')]);
        }
        if (item.children) {
            if (!item.children.width)
                item.children.width = this.parentMenu.width;
            this.childMenu = new Menu(this.level + 1, item.children);
        }
    }
    showChildMenu(e) {
        const childMenuEle = this.childMenu.el;
        if (!e.target.contains(childMenuEle)) {
            e.target.classList.add(config.wrapperClassName + '_hover');
            childMenuEle.style.display = 'block';
        }
        this.el.appendChild(childMenuEle);
        this.calcPosition(e);
        this.childMenu.removeAllHover();
        this.childMenu.payload = this.parentMenu.payload;
    }
    calcPosition(e) {
        const childMenuEle = this.childMenu.el;
        const childMenuHeight = parseFloat(getComputedStyle(childMenuEle).height);
        const liPosition = e.target.getBoundingClientRect();
        let translateX = this.parentMenu.width - 5;
        let translateY = -2;
        if (_storeWindowSize.clientWidth - liPosition.x - this.parentMenu.width < this.childMenu.width) {
            translateX = -this.childMenu.width + 5;
        }
        if (_storeWindowSize.clientHeight - liPosition.y + 2 < childMenuHeight) {
            translateY = -childMenuHeight + config.menuItemHeight + 2 + 1;
        }
        this.childMenu.removeChildMenus();
        childMenuEle.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }
    hideOtherChildMenu() {
        var _a, _b;
        (_a = this.parentMenu) === null || _a === void 0 ? void 0 : _a.removeChildMenus();
        (_b = this.parentMenu) === null || _b === void 0 ? void 0 : _b.removeItemHover();
    }
}

class Menu {
    constructor(level, option, innerOption) {
        this.height = 0;
        this.children = [];
        this.level = level;
        this.items = option.items;
        this.width = option.width || config.defaultMenuWidth;
        this.innerOption = innerOption;
        this.init();
        this.addChildren(option.items);
    }
    init() {
        var _a;
        this.el = h(`ul.${config.wrapperClassName}.${config.wrapperClassName}-lv${this.level}`, {
            dataset: {
                lv: this.level,
            },
            style: {
                width: this.width + 'px',
                zIndex: +config.baseZIndex + this.level,
                position: (_a = this.innerOption) === null || _a === void 0 ? void 0 : _a.position,
            },
            onclick: e => e.stopPropagation(),
            oncontextmenu: e => {
                e.stopPropagation();
                e.preventDefault();
            },
        });
    }
    addChildren(items) {
        if (!Array.isArray(items)) {
            return console.error('option.items is not type of array');
        }
        for (const it of items) {
            this.children.push(new MenuItem(this.level, it, this));
        }
        this.children.forEach(item => {
            this.el.appendChild(item.el);
        });
    }
    show(e, payload) {
        this.payload = payload;
        e.preventDefault();
        e.stopPropagation();
        this.removeAllHover();
        this.removeChildMenus();
        this.el.style.display = 'block';
        this.calcPosition(e);
    }
    calcPosition(e) {
        this.height = parseFloat(getComputedStyle(this.el).height);
        let translateX = e.clientX;
        let translateY = e.clientY;
        if (_storeWindowSize.clientWidth - e.clientX < this.width) {
            translateX = _storeWindowSize.clientWidth - this.width;
        }
        if (_storeWindowSize.clientHeight - e.clientY < this.height) {
            translateY = e.clientY - this.height;
        }
        if (this.level === 0 && this.innerOption.position !== 'fixed') {
            translateX += window.scrollX;
            translateY += window.scrollY;
        }
        this.el.style.transform = `translate(${translateX}px,${translateY}px)`;
    }
    hide() {
        this.el.style.display = 'none';
    }
    removeAllHover() {
        this.children.forEach(item => {
            item.el.classList.remove(`${config.wrapperClassName}_hover`);
        });
    }
    removeChildMenus() {
        this.children.forEach(item => {
            var _a;
            (_a = item.childMenu) === null || _a === void 0 ? void 0 : _a.el.remove();
        });
    }
    removeItemHover() {
        this.children.forEach(childItem => {
            childItem.el.classList.remove(`${config.wrapperClassName}_hover`);
        });
    }
    closeAllMenus() {
        const menus = document.querySelectorAll(`.${config.wrapperClassName}`);
        menus.forEach((menu) => {
            const level = menu.dataset.lv;
            if (+level > 0) {
                menu.remove();
            }
            else {
                menu.style.display = 'none';
            }
        });
    }
}

const _cssStr = `
  .${config.wrapperClassName}, .${config.wrapperClassName} *{
    box-sizing: border-box;
  }
  .${config.wrapperClassName}{
    -webkit-user-select:none;
    user-select: none;
    border: 1px solid #ddd;
    left: 0;top:0;
    background-color: #fff;
    padding: 2px 0 2px 0px;
    margin: 0;
    cursor: default;
    width: ${config.defaultMenuWidth}px;
    display: none;
  }
  /*主菜单*/
  .${config.wrapperClassName}[data-lv="0"]{ 
    position: absolute;
  }
  /*子菜单*/
  .${config.wrapperClassName} .${config.wrapperClassName}{ 
    position: absolute;
  }
  .${config.wrapperClassName} .divide{
    margin: ${config.menuItemDivideLineMargin}px 0;
    height: 1px;
    background-color: #ddd;
  }
  .${config.wrapperClassName} li {
    position: relative;
    padding: 0 30px 0 30px;
    list-style: none;
    line-height: ${config.menuItemHeight}px;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
  }
  .${config.wrapperClassName} li.disabled{
    color: #aaa;
    pointer-events: none;
  }
  .${config.wrapperClassName} li span.label {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .${config.wrapperClassName} li span.tip{
    color:#aaa;
    font-size: 12px;
  }
  .${config.wrapperClassName} li:hover:not(.divide):not(.disabled),
  .${config.wrapperClassName} li.${config.wrapperClassName}_hover{
    background-color: #eee;
  }
  .${config.wrapperClassName} li:hover:not(.divide):not(.disabled) .tip,
  .${config.wrapperClassName} li.${config.wrapperClassName}_hover .tip{
    color: #000;
  }
  .${config.wrapperClassName} li .right-arrow {
    position: absolute;
    right: 8px;
    top: 9px;
    border-top: 4px solid rgba(0,0,0,0);
    border-left: 4px solid #000;
    border-right: 4px solid rgba(0,0,0,0);
    border-bottom: 4px solid rgba(0,0,0,0);
  }
  .${config.wrapperClassName}_child{
  }
  `;
class ContextMenu {
    constructor(option = {}) {
        this.storeMenus = [];
        this.injectCss();
        this.hideMenuEventListener();
        const defaultConfig = {
            fixMenuWhenScroll: false,
            hideMenuWhenScroll: true,
        };
        this.option = Object.assign(defaultConfig, option);
        if (this.option.hideMenuWhenScroll) {
            this.scrollListener();
        }
    }
    injectCss() {
        let style = document.querySelector(`#${config.cssId}`);
        if (!style) {
            style = h(`style#${config.cssId}`, {
                innerHTML: _cssStr,
            });
            document.head.appendChild(style);
        }
    }
    hideMenuEventListener() {
        if (!this.clickEventFunc) {
            this.clickEventFunc = () => {
                if (this.storeMenus.some(it => it.el.style.display === 'block')) {
                    this.hideAllMenu();
                }
            };
            window.addEventListener('click', this.clickEventFunc, { capture: true });
        }
    }
    scrollListener() {
        window.addEventListener('scroll', () => {
            this.hideAllMenu();
        });
    }
    create(option) {
        const innerOptiton = {};
        if (this.option.fixMenuWhenScroll) {
            innerOptiton.position = 'fixed';
        }
        const mainMenu = new Menu(0, option, innerOptiton);
        this.storeMenus.push(mainMenu);
        document.body.appendChild(mainMenu.el);
        return {
            show: (e, payload) => {
                this.showMenu(e, mainMenu, payload);
            },
        };
    }
    showMenu(e, menu, payload) {
        this.storeMenus.forEach(item => {
            item.hide();
        });
        menu.show(e, payload);
    }
    hideAllMenu() {
        this.storeMenus.forEach(menu => {
            menu.el.style.display = 'none';
        });
    }
}

export { ContextMenu as default };
//# sourceMappingURL=index.esm.js.map
