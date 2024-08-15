var config = {
    panelCssId: 'ja-panel-css',
    contextMenuCssId: 'ja-contextmenu-css',
    panelClassName: 'ja-panel',
    wrapperClassName: 'ja-contextmenu',
    defaultMenuWidth: 200,
    menuItemHeight: 24,
    menuItemDivideLineMargin: 5,
    defaultZIndex: 5000,
};

function h(tag, attrs, children) {
    const tagMatch = tag.match(/^[\w\d]+/);
    if (!tagMatch)
        throw new Error('invalid tag');
    const tagStr = tagMatch[0];
    const id = tag.match(/#[\w\d_-]+/);
    let classArr = tag.match(/\.[\w\d_-]+/g) || [];
    classArr = Array.from(classArr).map(it => it.substring(1));
    const elem = document.createElement(tagStr);
    if (id)
        elem.id = id[0].substring(1);
    if (Array.isArray(attrs)) {
        children = attrs;
    }
    else if (typeof attrs === 'object' && attrs !== null) {
        for (const attr in attrs) {
            if (attr === 'style' || attr === 'dataset') {
                const v = attrs[attr];
                for (const key in v) {
                    elem[attr][key] = v[key];
                }
            }
            else if (attr === 'classList' && Array.isArray(attrs.classList)) {
                classArr = classArr.concat(attrs.classList.filter(Boolean));
            }
            else {
                elem[attr] = attrs[attr];
            }
        }
    }
    else if (typeof attrs === 'string' || typeof attrs === 'number') {
        elem.textContent = String(attrs);
    }
    if (classArr.length)
        elem.classList.add(...classArr);
    if (children) {
        children.forEach(child => {
            if (!child)
                return;
            if (child instanceof HTMLElement)
                elem.appendChild(child);
            else
                console.error(child, 'not instance of HTMLElement');
        });
    }
    return elem;
}

let _storeWindowSize;
function getWindowSize() {
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
function dealBaseAttr(data, payload) {
    return typeof data === 'function' ? data(payload) : data || '';
}
function injectCss(cssId, styleString) {
    let style = document.getElementById(cssId);
    if (!style) {
        style = h(`style#${config.contextMenuCssId}`, {
            innerHTML: styleString,
        });
        const titleTag = document.querySelector('head title');
        if (titleTag) {
            document.head.insertBefore(style, titleTag.nextElementSibling);
        }
        else {
            document.head.appendChild(style);
        }
    }
}

class MenuItem {
    constructor(level, item, parentMenu) {
        this.parentMenu = parentMenu;
        this.level = level;
        this.itemOption = item;
        this.init();
    }
    init() {
        const item = this.itemOption;
        if (item.type === 'hr' || item.type === '---') {
            this.el = h('li.divide');
        }
        else {
            const liDisabled = dealBaseAttr(item.disabled, this.parentMenu.payload);
            const liClassList = [dealBaseAttr(item.class, this.parentMenu.payload)];
            if (liDisabled)
                liClassList.push('disabled');
            const show = item.show === undefined ? true : dealBaseAttr(item.show, this.parentMenu.payload);
            let iconEl;
            if (item.icon) {
                const icon = dealBaseAttr(item.icon, this.parentMenu.payload);
                iconEl = icon instanceof HTMLElement ? h('div.menu-item-icon', [icon]) : h('img.menu-item-icon', { src: icon });
            }
            this.el = h('li', {
                style: {
                    display: show ? '' : 'none',
                },
                classList: liClassList,
                onclick: e => {
                    var _a;
                    if (!liDisabled) {
                        const stay = (_a = item.onclick) === null || _a === void 0 ? void 0 : _a.call(item, e, this.parentMenu.payload);
                        if (!item.children && !stay)
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
            }, [
                iconEl,
                item.customItem ||
                    h('span.menu-item-label', {
                        textContent: dealBaseAttr(item.label, this.parentMenu.payload),
                    }),
                item.tip && h('span.menu-item-tip', dealBaseAttr(item.tip, this.parentMenu.payload)),
                item.children && h('span.right-arrow'),
            ]);
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
        this.childMenu.payload = this.parentMenu.payload;
        this.childMenu.prepareMenuShow(this.childMenu.payload);
        this.calcPosition();
    }
    calcPosition() {
        const childMenuEle = this.childMenu.el;
        const childMenuHeight = childMenuEle.getBoundingClientRect().height;
        const liPosition = this.el.getBoundingClientRect();
        let translateX = this.parentMenu.width - 5;
        let translateY = -2;
        if (_storeWindowSize.clientWidth - liPosition.x - this.parentMenu.width < this.childMenu.width) {
            translateX = -this.childMenu.width + 5;
        }
        if (_storeWindowSize.clientHeight - liPosition.y + 2 < childMenuHeight) {
            translateY = -childMenuHeight + config.menuItemHeight + 2 + 1;
        }
        childMenuEle.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }
    hideOtherChildMenu() {
        var _a, _b;
        (_a = this.parentMenu) === null || _a === void 0 ? void 0 : _a.removeChildMenus();
        (_b = this.parentMenu) === null || _b === void 0 ? void 0 : _b.removeItemHover();
    }
}

const panelStyle = `
  .${config.panelClassName}, .${config.panelClassName} * {
    box-sizing: border-box;
  }
  .${config.panelClassName}{
    --border-color: #dee0e3;
    border: 1px solid var(--border-color);
    left: 0; top: 0;
    background-color: #fff;
    display: none;
    width: ${config.defaultMenuWidth}px;
    position: absolute;
    z-index: ${config.defaultZIndex};
  }
`;
const contextMenuStyle = `
  .${config.wrapperClassName}{
    --item-background--hover: #e8e8e9;
    --disabled-color: #777;
    --tip-color: #5f6368;
    --li-height: ${config.menuItemHeight}px;
    user-select: none;
    padding: 2px 0 2px 0px;
    margin: 0;
  }
  /*子菜单*/
  .${config.wrapperClassName} .${config.panelClassName}{ 
    position: absolute;
  }
  
  .${config.wrapperClassName} li {
    position: relative;
    padding: 0 30px 0 30px;
    list-style: none;
    height: var(--li-height);
    line-height: var(--li-height);
    font-size: 12px;
    display: flex;
    justify-content: space-between;
  }
  .${config.wrapperClassName} li.divide{
    margin: ${config.menuItemDivideLineMargin}px 1px;
    height: 1px;
    background-color: var(--border-color);
  }
  .${config.wrapperClassName} li.disabled{
    color: var(--disabled-color);
    pointer-events: none;
  }
  .${config.wrapperClassName} li .menu-item-icon{
    width: 16px;
    height: 16px;
    position: absolute;
    left: 7px; 
    top: calc(calc(var(--li-height) - 16px) / 2);
  }
  .${config.wrapperClassName} li .menu-item-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .${config.wrapperClassName} li .menu-item-tip {
    color: var(--tip-color);
  }
  .${config.wrapperClassName} li:hover:not(.divide):not(.disabled),
  .${config.wrapperClassName} li.${config.wrapperClassName}_hover {
    background: var(--item-background--hover);
  }
  .${config.wrapperClassName} li .right-arrow {
    position: absolute;
    right: 8px; top: 9px;
    border-top: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-left: 4px solid;
  }
  `;

class Panel {
    constructor(panelOption) {
        var _a, _b;
        this.height = 0;
        this.panelOption = panelOption;
        this.width = ((_a = this.panelOption) === null || _a === void 0 ? void 0 : _a.width) || config.defaultMenuWidth;
        if (typeof ((_b = this.panelOption) === null || _b === void 0 ? void 0 : _b.width) === 'string') {
            throw new TypeError('Invalid width type.');
        }
        injectCss(config.panelCssId, panelStyle);
        this.createEl();
        this.addEventListener();
    }
    createEl() {
        var _a, _b;
        this.el = h(`div.${config.panelClassName}`, {
            style: {
                width: this.width + 'px',
                zIndex: (_a = this.panelOption) === null || _a === void 0 ? void 0 : _a.zIndex,
                position: (_b = this.panelOption) === null || _b === void 0 ? void 0 : _b.position,
            },
        });
    }
    addEventListener() {
        var _a, _b;
        (_a = this.el) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.eventListenerCb);
        (_b = this.el) === null || _b === void 0 ? void 0 : _b.addEventListener('contextmenu', this.eventListenerCb);
    }
    eventListenerCb(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    show(e) {
        if (e instanceof MouseEvent) {
            e.preventDefault();
            e.stopPropagation();
        }
        this.el.style.display = 'block';
        const { x, y } = this.calcPosition(e);
        this.el.style.transform = `translate(${x}px,${y}px)`;
    }
    calcPosition(e) {
        this.height = this.el.getBoundingClientRect().height;
        let { x, y } = e;
        if (_storeWindowSize.clientWidth - x < this.width) {
            x = _storeWindowSize.clientWidth - this.width;
        }
        if (_storeWindowSize.clientHeight - y < this.height) {
            y = e.y - this.height;
        }
        return { x, y };
    }
    hide() {
        this.el.style.display = 'none';
    }
    destroy() {
        this.el.removeEventListener('click', this.eventListenerCb);
        this.el.removeEventListener('contextmenu', this.eventListenerCb);
        this.el.remove();
    }
}

class Menu extends Panel {
    constructor(level, menuOption) {
        super(menuOption);
        this.children = [];
        this.menuOption = menuOption;
        this.level = level;
        this.createUl();
    }
    createUl() {
        var _a;
        this.ul = h(`ul`, {
            classList: [config.wrapperClassName, `${config.wrapperClassName}-lv${this.level}`],
            dataset: {
                lv: this.level,
            },
            onclick: e => e.stopPropagation(),
            oncontextmenu: e => {
                e.stopPropagation();
                e.preventDefault();
            },
        });
        (_a = this.el) === null || _a === void 0 ? void 0 : _a.appendChild(this.ul);
    }
    updateMenuAttr() {
        var _a;
        this.ul.className = `${config.wrapperClassName} ${config.wrapperClassName}-lv${this.level} ${dealBaseAttr((_a = this.menuOption) === null || _a === void 0 ? void 0 : _a.class, this.payload)}`;
    }
    renderMenuItem() {
        var _a, _b;
        if (!Array.isArray((_a = this.menuOption) === null || _a === void 0 ? void 0 : _a.items)) {
            return console.error('option.items is not type of array');
        }
        this.children = [];
        let menuItemEl;
        while ((menuItemEl = this.ul.lastChild)) {
            menuItemEl.remove();
        }
        if (!((_b = this.menuOption) === null || _b === void 0 ? void 0 : _b.items))
            return;
        for (const it of this.menuOption.items) {
            const menuItem = new MenuItem(this.level, it, this);
            this.children.push(menuItem);
            this.ul.appendChild(menuItem.el);
        }
    }
    show(e, payload) {
        this.prepareMenuShow(payload);
        super.show(e);
    }
    prepareMenuShow(payload) {
        this.payload = payload;
        this.removeAllHover();
        this.removeChildMenus();
        this.updateMenuAttr();
        this.renderMenuItem();
    }
    calcPosition(e) {
        var _a;
        let { x, y } = super.calcPosition(e);
        if (this.level === 0 && ((_a = this.panelOption) === null || _a === void 0 ? void 0 : _a.position) !== 'fixed') {
            x += window.scrollX;
            y += window.scrollY;
        }
        return { x, y };
    }
    removeAllHover() {
        this.children.forEach(item => {
            item.el.classList.remove(`${config.wrapperClassName}_hover`);
        });
    }
    removeChildMenus() {
        this.children.forEach(item => {
            var _a, _b;
            (_b = (_a = item.childMenu) === null || _a === void 0 ? void 0 : _a.el) === null || _b === void 0 ? void 0 : _b.remove();
        });
    }
    removeItemHover() {
        this.children.forEach(childItem => {
            childItem.el.classList.remove(`${config.wrapperClassName}_hover`);
        });
    }
    closeAllMenus() {
        const menus = document.querySelectorAll(`.${config.panelClassName}`);
        menus.forEach(menu => {
            const level = menu.dataset.lv;
            if (level && +level > 0) {
                menu.remove();
            }
            else {
                menu.style.display = 'none';
            }
        });
    }
    destroy() {
        super.destroy();
        this.menuOption = null;
        this.children = [];
        this.payload = undefined;
    }
}

class ContextMenu {
    constructor(option = {}) {
        this.storeMenus = [];
        this.hideMenuEventListener();
        const defaultConfig = {
            width: config.defaultMenuWidth,
            fixMenuWhenScroll: false,
            hideMenuWhenScroll: true,
        };
        this.contextMenuOption = Object.assign(defaultConfig, option);
        if (this.contextMenuOption.hideMenuWhenScroll) {
            this.scrollListener();
        }
    }
    hideMenuEventListener() {
        window.addEventListener('click', this.clickEventFunc.bind(this), { capture: true });
    }
    clickEventFunc(e) {
        this.storeMenus.forEach(menu => {
            if (!menu.el)
                return;
            if (menu.el.style.display === 'block') {
                let isInside = false;
                let el = { parentElement: e.target };
                while ((el = el.parentElement)) {
                    if (el === menu.el) {
                        isInside = true;
                        break;
                    }
                }
                if (!isInside) {
                    menu.hide();
                }
            }
        });
    }
    scrollListener() {
        window.addEventListener('scroll', () => {
            this.hideAllMenu();
        });
    }
    create(menuOption) {
        injectCss(config.contextMenuCssId, contextMenuStyle);
        if (!menuOption.width)
            menuOption.width = this.contextMenuOption.width;
        if (this.contextMenuOption.fixMenuWhenScroll)
            menuOption.position = 'fixed';
        const mainMenu = new Menu(0, menuOption);
        this.storeMenus.push(mainMenu);
        if (mainMenu.el) {
            document.body.appendChild(mainMenu.el);
        }
        return {
            show: (position, payload) => this.showMenu(position, mainMenu, payload),
            hide: () => mainMenu.hide(),
            destroy: () => this.destroy(mainMenu),
        };
    }
    createAsync(menuOption) {
        let menu;
        return () => {
            return menu || (menu = this.create(menuOption));
        };
    }
    showMenu(position, menu, payload) {
        this.hideAllMenu();
        menu.show(position, payload);
    }
    hideAllMenu() {
        this.storeMenus.forEach(menu => menu.hide());
    }
    destroy(menu) {
        menu.destroy();
        this.storeMenus = this.storeMenus.filter(menuItem => menu !== menuItem);
    }
}

export { Panel, ContextMenu as default, h };
//# sourceMappingURL=ja-contextmenu.esm.js.map
