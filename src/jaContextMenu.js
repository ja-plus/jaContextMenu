/**
 * 右键菜单功能
 * 问题，多次new 会一直向dom中添加元素
 * TODO: 图标
 */
import h from './utils/h.js';
import debounce from './utils/debounce.js';
const _wrapperClassName = 'mycontextmenu';
const _mainMenuWidth = 200;
const _childMenuWidth = 150;
const _menuItemHeight = 24;
const _cssStr = `
    .${_wrapperClassName}, .${_wrapperClassName} *{
        box-sizing: border-box;
    }
    .${_wrapperClassName}{
        border: 1px solid #ddd;
        position: absolute;
        left: 0;top:0;
        background-color: #fff;
        padding: 2px 0 2px 0px;
        margin: 0;
        cursor: default;
        width: ${_mainMenuWidth}px;
        display: none;
    }
    .${_wrapperClassName} .divide{
        margin: 5px 0;
        height: 1px;
        background-color: #ddd;
    }
    .${_wrapperClassName} li {
        position: relative;
        padding: 0 30px 0 30px;
        list-style: none;
        line-height: ${_menuItemHeight}px;
        font-size: 13px;
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
    }
    .${_wrapperClassName} li.disabled{
        color: #aaa;
        pointer-events: none;
    }
    .${_wrapperClassName} li span.label {
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .${_wrapperClassName} li span.tip{
        color:#aaa;
        font-size: 12px;
    }
    .${_wrapperClassName} li:hover:not(.divide):not(.disabled),
    .${_wrapperClassName} li.${_wrapperClassName}_hover{
        background-color: #eee;
    }
    .${_wrapperClassName} li:hover:not(.divide):not(.disabled) .tip,
    .${_wrapperClassName} li.${_wrapperClassName}_hover .tip{
        color: #000;
    }
    .${_wrapperClassName} li .right-arrow {
        position: absolute;
        right: 8px;
        top: 9px;
        border-top: 4px solid rgba(0,0,0,0);
        border-left: 4px solid #000;
        border-right: 4px solid rgba(0,0,0,0);
        border-bottom: 4px solid rgba(0,0,0,0);
    }
    .${_wrapperClassName}_child{
        width: ${_childMenuWidth}px;
    }
    `;

class MyContextMenu {
    /**
     * 如果创建了多个不一样的菜单，则需要在显示一个菜单的同时，关闭其他菜单
     * 因此需要统一管理创建的所有菜单元素,
     * (也可以统一管理传入的配置，右键时渲染，点击其他地方删除元素)
     */
    /** @type {Array<HTMLElement>} */
    #storeEle = [];
    /** @type {Function} */
    #clickEventFunc;
    /** @type {Array<Number>} */
    #windowSize = { width: null, height: null };
    constructor() {
        this.#windowSize = { width: window.innerWidth, height: window.innerHeight };
        this.#injectCss();
        this.#onPageResize();
        this.#hideMenuEventListener();
    }
    /**
     * create menu element
     * @param {Object} config
     * @returns {HTMLElement} context menu element
     */
    create(config) {
        const contextMenuEle = this.#createMenuEle(config.items);
        document.body.appendChild(contextMenuEle);
        // document.body.append(contextMenuEle); // dom.append chrome>54
        this.#storeEle.push(contextMenuEle);
        return contextMenuEle;
    }
    /**
     * create menu element
     * @param {Array<Object>} items config.items | config.items.children
     * @param {String} type ['main' | 'child']
     * @returns {HTMLElement}
     */
    #createMenuEle(items, type = 'main', mainContextMenuEle){
        let contextMenuEle;
        if (type === 'main'){
            contextMenuEle = h(`ul.${_wrapperClassName}`, {
                onclick: e => e.stopPropagation(),
                oncontextmenu: e => {
                    e.stopPropagation();
                    e.preventDefault();
                }
            }, [
                ...items.map(it => {
                    if (it.type === 'divide' || it.type?.indexOf('--') === 0){
                        return h('li.divide');
                    }
                    return h('li', {
                        classList: it.disabled ? ['disabled'] : [],
                        onclick: e => {
                            if (!it.disabled){
                                it.onclick && it.onclick(e, contextMenuEle.payload);
                                if (!it.children) this.hideMenu();
                            }
                        },
                        onmouseenter:
                            it.children?.length
                            ? (e => this.#showChildMenu(e, it.children, contextMenuEle))
                            : () => this.#hideChildMenu(contextMenuEle),
                    }, [
                        h('span.label', it.label),
                        it.tip && h('span.tip', it.tip),
                        type === 'main' && it.children && h('span.right-arrow')
                    ]);
                })
            ]);
        }
        if (type === 'child'){
            contextMenuEle = h(`ul.${_wrapperClassName}.${_wrapperClassName}_child`, {
                onclick: e => e.stopPropagation(),
                oncontextmenu: e => {
                    e.stopPropagation();
                    e.preventDefault();
                }
            }, [
                ...items.map(child => {
                    if (child.type === 'divide' || child.type?.indexOf('--') === 0){
                        return h('li.divide');
                    }
                    return h('li', {
                        classList: child.disabled ? ['disabled'] : [],
                        onclick: e => {
                            if (!child.disabled){
                                child.onclick && child.onclick(e, mainContextMenuEle.payload);
                                this.hideMenu();
                            }
                        }
                    }, [
                        h('span.label', child.label),
                        child.tip && h('span.tip', child.tip),
                    ]);
                })
            ]);
        }
        return contextMenuEle;
    }
    #injectCss() {
        let style = document.querySelector('#myContextMenu');
        if (!style) { // if not be injected
            style = h('style#myContextMenu', {
                innerHTML: _cssStr
            });
            document.head.appendChild(style);
        }
    }
    /** click and close menu listener */
    #hideMenuEventListener() {
        // add once event
        if (!this.#clickEventFunc) {
            this.#clickEventFunc = () => {
                this.hideMenu();
            };
            window.addEventListener('click', this.#clickEventFunc);
        }
    }
    /**
     *
     * @param {MouseEvent} e
     * @param {Array} children
     * @param {HTMLElement} contextMenuEle
     */
    #showChildMenu(e, children, contextMenuEle) {
        this.#hideChildMenu(contextMenuEle); // close other child menu
        /** @type {HTMLElement} */
        let childMenuEle = e.target.querySelector(`ul.${_wrapperClassName}_child`);
        if (!childMenuEle) {
            childMenuEle = this.#createMenuEle(children, 'child', contextMenuEle);
            e.target.appendChild(childMenuEle);
        }
        // if childMenuEle is hidden
        if (!childMenuEle.style.display || childMenuEle.style.display === 'none') {
            e.target.classList.add(_wrapperClassName + '_hover');
            childMenuEle.style.display = 'block';

            const childMenuHeight = parseFloat(getComputedStyle(childMenuEle).height);
            const liPosition = e.target.getBoundingClientRect();
            let translateX = _mainMenuWidth - 5;
            let translateY = -2;
            if (this.#windowSize.width - liPosition.x - _mainMenuWidth < _childMenuWidth) {
                // right avaliable space
                translateX = -_childMenuWidth + 5;
            }
            if (this.#windowSize.height - liPosition.y + 2 < childMenuHeight) {
                // bottom avaliable space
                translateY = -childMenuHeight + _menuItemHeight + 2 + 1; // 1px border
            }
            childMenuEle.style.transform = `translate(${translateX}px, ${translateY}px)`;
        }
    }
    /**
     * @param {HTMLElement} contextMenuEle
     */
    #hideChildMenu(contextMenuEle) {
        // remove main menu selected
        let hovers = contextMenuEle.querySelectorAll(`.${_wrapperClassName}_hover`);
        hovers.forEach(li => {
            li.classList.remove(_wrapperClassName + '_hover');
            // close child menu
            let childMenu = li.querySelector(`ul.${_wrapperClassName}`);
            childMenu.style.display = 'none';
        });
    }
    /** when adjust window size */
    #onPageResize() {
        let resizeFunc = debounce(() => {
            // save window inner size
            this.#windowSize = { width: window.innerWidth, height: window.innerHeight };
        });
        window.addEventListener('resize', resizeFunc);
    }
    /** open menu */
    showContextMenuFunc(contextMenuEle, payload) {
        // return this.#onContextMenu.bind(this);
        // save data to contextMenuEle
        contextMenuEle.payload = payload;
        return (e) => {
            this.#storeEle.forEach(ele => {
                if (ele !== contextMenuEle) ele.style.display = 'none'; // close other menus
            });
            e.preventDefault();
            e.stopPropagation(); // 防止触发祖先元素定义的contextmenu事件
            this.#hideChildMenu(contextMenuEle);
            contextMenuEle.style.display = 'block';

            const mainMenuHeight = parseFloat(getComputedStyle(contextMenuEle).height);
            let translateX = e.pageX;
            let translateY = e.pageY;
            if (this.#windowSize.width - e.pageX < _mainMenuWidth) {
                // right not have enough space
                translateX = e.pageX - _mainMenuWidth;
            }
            if (this.#windowSize.height - e.pageY < mainMenuHeight) {
                // bottom not have enough space
                translateY = e.pageY - mainMenuHeight;
            }
            contextMenuEle.style.transform = `translate(${translateX}px,${translateY}px)`;
        };
    }
    hideMenu() {
        this.#storeEle.forEach(contextMenuEle => {
            contextMenuEle.style.display = 'none';
            this.#hideChildMenu(contextMenuEle);
        });
    }
    /**
     *  remove menu
    */
    deleteMenu(contextMenuEle) {
        if (Array.isArray(contextMenuEle)){
            contextMenuEle.forEach(ele => {
                let item = this.#storeEle.find(it => it === ele);
                item.remove();
                item = null;
            });

        } else if (contextMenuEle instanceof HTMLElement){
            let item = this.#storeEle.find(it => it === contextMenuEle);
            item.remove();
            item = null;
        } else {
            this.#storeEle.forEach(ele => {
                ele.remove();
                ele = null;
            });
        }
        this.#storeEle = this.#storeEle.filter(Boolean);
    }
}
export default MyContextMenu;