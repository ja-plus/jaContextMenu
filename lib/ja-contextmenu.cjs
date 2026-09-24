'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var config = {
    panelCssId: 'ja-panel-css',
    menuCssId: 'ja-contextmenu-css',
    panelClass: 'ja-panel',
    wrapperClass: 'ja-contextmenu',
    defW: 200,
    itemH: 24,
    divideMargin: 5,
    defZ: 5000,
};

const TAG_REG = /^[\w\d]+/;
const ID_REG = /#[\w\d_-]+/;
const CLASS_REG = /\.[\w\d_-]+/g;
function h(tag, attrs, children) {
    const tagMatch = tag.match(TAG_REG);
    if (!tagMatch)
        throw new Error('invalid tag');
    const tagStr = tagMatch[0];
    const id = tag.match(ID_REG);
    let classArr = tag.match(CLASS_REG) || [];
    classArr = Array.from(classArr).map(it => it.slice(1));
    const elem = document.createElement(tagStr);
    if (id)
        elem.id = id[0].slice(1);
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
    children && children.forEach(child => {
        if (!child)
            return;
        if (child instanceof HTMLElement)
            elem.appendChild(child);
        else
            console.error(child, 'isn\'t HTMLElement');
    });
    return elem;
}

let _storeWindowSize;
let _resize = false;
function getWindowSize() {
    if (!_storeWindowSize || _resize) {
        const html = document.querySelector('html');
        const { innerWidth, innerHeight } = window;
        const { clientWidth, clientHeight } = html;
        _storeWindowSize = {
            htmlEl: html,
            sW: innerWidth - clientWidth,
            sH: innerHeight - clientHeight,
            cW: clientWidth,
            cH: clientHeight,
        };
        if (!_resize) {
            _resize = false;
        }
    }
    return _storeWindowSize;
}
window.addEventListener('resize', () => {
    _resize = true;
});
function dealBaseAttr(data, payload) {
    return typeof data === 'function' ? data(payload) : data || '';
}
function injectCss(cssId, styleString) {
    let style = document.getElementById(cssId);
    if (!style) {
        style = h(`style#${cssId}`, {
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
        var _a, _b, _c;
        const item = this.itemOption;
        if (item.type === 'hr' || item.type === '---') {
            const show = item.show === void 0 ? true : dealBaseAttr(item.show, this.parentMenu.payload);
            this.el = h('li.divide', {
                style: {
                    display: show ? '' : 'none',
                },
            });
        }
        else {
            const liDisabled = dealBaseAttr(item.disabled, this.parentMenu.payload);
            const liClassList = [dealBaseAttr(item.class, this.parentMenu.payload)];
            if (liDisabled)
                liClassList.push('disabled');
            const show = item.show === void 0 ? true : dealBaseAttr(item.show, this.parentMenu.payload);
            let iconEl;
            if (item.icon) {
                const icon = dealBaseAttr(item.icon, this.parentMenu.payload);
                iconEl = icon instanceof HTMLElement ? h('div.menu-item-icon', [icon]) : h('img.menu-item-icon', { src: icon });
            }
            let arrowIconEl = h('span.right-arrow-icon');
            const arrowIcon = item.arrowIcon || ((_a = this.parentMenu.menuOption) === null || _a === void 0 ? void 0 : _a.arrowIcon);
            if (arrowIcon) {
                arrowIconEl = dealBaseAttr(arrowIcon, this.parentMenu.payload) || arrowIconEl;
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
                onmouseenter: e => {
                    this.hideOtherChildMenu();
                    if (item.children) {
                        this.showChildMenu(e);
                    }
                },
            }, [
                iconEl,
                dealBaseAttr(item.customItem, this.parentMenu.payload) ||
                    h('span.menu-item-label', {
                        textContent: dealBaseAttr(item.label, this.parentMenu.payload),
                    }),
                item.tip && h('span.menu-item-tip', dealBaseAttr(item.tip, this.parentMenu.payload)),
                item.children && h('span.right-arrow', [arrowIconEl]),
            ]);
        }
        if (item.children) {
            if (!item.children.width) {
                item.children.width = this.parentMenu.width;
            }
            if (!item.children.theme) {
                item.children.theme = (_b = this.parentMenu.menuOption) === null || _b === void 0 ? void 0 : _b.theme;
            }
            if (!item.children.arrowIcon && item.children.arrowIcon !== null) {
                item.children.arrowIcon = (_c = this.parentMenu.menuOption) === null || _c === void 0 ? void 0 : _c.arrowIcon;
            }
            this.childMenu = new Menu(item.children, { level: this.level + 1, id: this.parentMenu.id });
        }
    }
    showChildMenu(e) {
        const childMenuEle = this.childMenu.el;
        if (!childMenuEle)
            return;
        if (!e.target.contains(childMenuEle)) {
            e.target.classList.add(config.wrapperClass + '_hover');
            childMenuEle.classList.remove('hide');
        }
        document.body.appendChild(childMenuEle);
        this.childMenu.payload = this.parentMenu.payload;
        this.childMenu.prepareMenuShow(this.childMenu.payload);
        this.childMenu.updatePanelAttr(this.childMenu.payload);
        this.calcPosition();
    }
    calcPosition() {
        const windowSize = getWindowSize();
        const childMenuEle = this.childMenu.el;
        if (!childMenuEle)
            return;
        const { height: childMenuHeight } = childMenuEle.getBoundingClientRect();
        const liPosition = this.el.getBoundingClientRect();
        const parentWidth = this.parentMenu.width || config.defW;
        const childWidth = this.childMenu.width || config.defW;
        let x = liPosition.x + liPosition.width - 5;
        let y = liPosition.y - 3;
        if (windowSize.cW - liPosition.x - parentWidth < childWidth) {
            x = liPosition.x - childWidth + 5;
        }
        if (childMenuHeight >= windowSize.cH) {
            y = 0;
            childMenuEle.style.maxHeight = `${windowSize.cH}px`;
            childMenuEle.classList.add('scroll');
        }
        else if (windowSize.cH - liPosition.y + 2 < childMenuHeight) {
            y = windowSize.cH - childMenuHeight;
        }
        childMenuEle.style.top = `${y}px`;
        childMenuEle.style.left = `${x}px`;
    }
    hideOtherChildMenu() {
        var _a, _b;
        (_a = this.parentMenu) === null || _a === void 0 ? void 0 : _a.removeChildMenus();
        (_b = this.parentMenu) === null || _b === void 0 ? void 0 : _b.removeAllHover();
    }
}

const panelStyle = () => `
.${config.panelClass}, .${config.panelClass} * {
  box-sizing: border-box;
}
.${config.panelClass}{
  --bg-color: #fff;
  --border-color: #dee0e3;
  border: 1px solid var(--border-color);
  left: 0; top: 0;
  background-color: var(--bg-color);
  position: absolute;
  z-index: ${config.defZ};
}
.${config.panelClass}.hide{
  display: none;
}
.${config.panelClass}.scroll{
  overflow: auto;
  overflow: overlay;
}`;
const contextMenuStyle = () => `
.${config.wrapperClass}{
  --item-background--hover: #e8e8e9;
  --disabled-color: #777;
  --li-height: ${config.itemH}px;
  user-select: none;
  padding: 2px 0 2px 0px;
  margin: 0;
}
.${config.wrapperClass} .${config.panelClass}{ 
  position: absolute;
}
.${config.wrapperClass} li {
  position: relative;
  padding: 0 30px 0 30px;
  list-style: none;
  height: var(--li-height);
  line-height: var(--li-height);
  font-size: 12px;
  display: flex;
  justify-content: space-between;
}
.${config.wrapperClass} li.divide{
  margin: ${config.divideMargin}px 1px;
  height: 1px;
  background-color: var(--border-color);
}
.${config.wrapperClass} li.disabled{
  color: var(--disabled-color);
  pointer-events: none;
}
.${config.wrapperClass} li .menu-item-icon{
  width: 16px;
  height: 16px;
  position: absolute;
  left: 7px; 
  top: calc(calc(var(--li-height) - 16px) / 2);
}
.${config.wrapperClass} li .menu-item-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.${config.wrapperClass} li:hover:not(.divide):not(.disabled),
.${config.wrapperClass} li.${config.wrapperClass}_hover {
  background: var(--item-background--hover);
}
.${config.wrapperClass} li .right-arrow {
  position: absolute;
  right: 4px; top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
}
.${config.wrapperClass} li .right-arrow-icon {
  position: absolute;
  left:50%;top:50%;
  transform: translate(-50%,-50%);
  border-top: 4px solid transparent;
  border-right: none;
  border-bottom: 4px solid transparent;
  border-left: 4px solid;
}`;

var PanelPositionEnum;
(function (PanelPositionEnum) {
    PanelPositionEnum["TOP"] = "top";
    PanelPositionEnum["BOTTOM"] = "bottom";
    PanelPositionEnum["LEFT"] = "left";
    PanelPositionEnum["RIGHT"] = "right";
})(PanelPositionEnum || (PanelPositionEnum = {}));
class Panel {
    constructor(panelOption) {
        this.el = null;
        this.height = 0;
        this.panelOption = panelOption;
        const width = this.panelOption ? this.panelOption.width : void 0;
        if (typeof width === 'string') {
            throw new TypeError('Invalid width');
        }
        this.width = width;
        injectCss(config.panelCssId, panelStyle());
        this.createEl();
        this.addEventListener();
    }
    createEl() {
        const { zIndex, position } = this.panelOption || {};
        this.el = h(`div`, {
            style: {
                width: this.width ? this.width + 'px' : void 0,
                zIndex,
                position,
            },
            classList: [config.panelClass, 'hide'],
        });
    }
    addEventListener() {
        const el = this.el;
        if (el) {
            el.addEventListener('click', this.eventListenerCb);
            el.addEventListener('contextmenu', this.eventListenerCb);
        }
    }
    eventListenerCb(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    show(e, payload) {
        if (e instanceof MouseEvent) {
            e.preventDefault();
            e.stopPropagation();
        }
        this.updatePanelAttr(payload);
        if (!this.el) {
            throw new Error('Panel element not found');
        }
        const { x, y, position } = this.calcPosition(e);
        this.el.style.transform = `translate(${x}px,${y}px)`;
        return {
            position,
        };
    }
    updatePanelAttr(payload) {
        var _a, _b;
        if (!this.el)
            throw new Error('error');
        const optionClass = dealBaseAttr((_a = this.panelOption) === null || _a === void 0 ? void 0 : _a.class, payload) || '';
        const className = [config.panelClass, optionClass];
        if ((_b = this.panelOption) === null || _b === void 0 ? void 0 : _b.theme) {
            className.push(`theme-${dealBaseAttr(this.panelOption.theme, payload)}`);
        }
        this.el.className = className.join(' ');
    }
    calcPosition(e) {
        var _a;
        if (!this.el)
            throw new Error('error');
        const windowSize = getWindowSize();
        const { height, width } = this.el.getBoundingClientRect();
        this.height = height;
        this.width = width;
        let { x, y } = e;
        const position = [PanelPositionEnum.RIGHT, PanelPositionEnum.BOTTOM];
        if (((_a = e.position) === null || _a === void 0 ? void 0 : _a.length) === 2) {
            position[0] = e.position[0];
            position[1] = e.position[1];
        }
        if (position[0] === PanelPositionEnum.LEFT) {
            if (x > width) {
                x = x - width;
                position[0] = PanelPositionEnum.RIGHT;
            }
        }
        if (position[0] === PanelPositionEnum.RIGHT) {
            if (windowSize.cW - x < width) {
                x = windowSize.cW - width;
                position[0] = PanelPositionEnum.LEFT;
            }
        }
        if (position[1] === PanelPositionEnum.TOP) {
            if (y > height) {
                y = y - height;
                position[1] = PanelPositionEnum.BOTTOM;
            }
        }
        if (position[1] === PanelPositionEnum.BOTTOM) {
            if (windowSize.cH - y < height && y >= height) {
                y = y - height;
                position[1] = PanelPositionEnum.TOP;
            }
        }
        return { x, y, position };
    }
    hide() {
        this.el && this.el.classList.add('hide');
    }
    destroy() {
        if (!this.el)
            return;
        this.el.removeEventListener('click', this.eventListenerCb);
        this.el.removeEventListener('contextmenu', this.eventListenerCb);
        this.el.remove();
        this.el = null;
    }
}

class Menu extends Panel {
    constructor(menuOption, init) {
        super(menuOption);
        this.children = [];
        const { id, level } = init || {};
        this.id = id || Math.random().toString(36).slice(2, 10);
        this.menuOption = menuOption;
        this.level = level || 0;
        this.createUl();
    }
    createUl() {
        this.ul = h(`ul`, {
            classList: [config.wrapperClass, `${config.wrapperClass}-lv${this.level}`],
            onclick: e => e.stopPropagation(),
            oncontextmenu: e => {
                e.stopPropagation();
                e.preventDefault();
            },
        });
        this.el && this.el.appendChild(this.ul);
    }
    updateMenuAttr() {
        if (this.el) {
            this.el.dataset.jaMenuId = this.id;
            this.el.dataset.lv = this.level.toString();
        }
        this.ul.className = `${config.wrapperClass} ${config.wrapperClass}-lv${this.level}}`;
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
        return super.show(e, payload);
    }
    prepareMenuShow(payload) {
        this.payload = payload;
        this.removeAllHover();
        this.removeChildMenus();
        this.updateMenuAttr();
        this.renderMenuItem();
    }
    calcPosition(...p) {
        const res = super.calcPosition(...p);
        let { x, y } = res;
        if (this.level === 0 && this.panelOption && this.panelOption.position !== 'fixed') {
            x += window.scrollX;
            y += window.scrollY;
        }
        return { x, y, position: res.position };
    }
    closeMenus(level, hide = true) {
        const menus = document.querySelectorAll(`.${config.panelClass}`);
        menus.forEach(menu => {
            const { lv, jaMenuId } = menu.dataset || {};
            if (lv && +lv > level && jaMenuId === this.id) {
                menu.remove();
            }
            else if (hide) {
                menu.classList.add('hide');
            }
        });
    }
    removeAllHover() {
        const className = `${config.wrapperClass}_hover`;
        this.children.forEach(item => {
            item.el.classList.remove(className);
        });
    }
    removeChildMenus() {
        this.closeMenus(this.level, false);
    }
    closeAllMenus() {
        this.closeMenus(0, true);
    }
    hide() {
        this.closeAllMenus();
        super.hide();
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
            width: config.defW,
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
            if (!menu.el.classList.contains('hide')) {
                let isInside = false;
                let el = { parentElement: e.target };
                while ((el = el.parentElement)) {
                    if (el.classList.contains(config.panelClass)) {
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
        injectCss(config.menuCssId, contextMenuStyle());
        if (!menuOption.width) {
            menuOption.width = this.contextMenuOption.width;
        }
        if (this.contextMenuOption.fixMenuWhenScroll) {
            menuOption.position = 'fixed';
        }
        if (this.contextMenuOption.arrowIcon) {
            menuOption.arrowIcon = this.contextMenuOption.arrowIcon;
        }
        if (this.contextMenuOption.theme) {
            menuOption.theme = this.contextMenuOption.theme;
        }
        const mainMenu = new Menu(menuOption);
        this.storeMenus.push(mainMenu);
        if (mainMenu.el) {
            document.body.appendChild(mainMenu.el);
        }
        return {
            menu: mainMenu,
            show: (position, payload) => this.showMenu(position, mainMenu, payload),
            calcPosition: mainMenu.calcPosition.bind(mainMenu),
            hide: mainMenu.hide.bind(mainMenu),
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
        return menu.show(position, payload);
    }
    hideAllMenu() {
        this.storeMenus.forEach(menu => menu.hide());
    }
    destroy(menu) {
        menu.destroy();
        this.storeMenus = this.storeMenus.filter(menuItem => menu !== menuItem);
    }
}

exports.Panel = Panel;
exports.default = ContextMenu;
exports.h = h;
//# sourceMappingURL=ja-contextmenu.cjs.map
