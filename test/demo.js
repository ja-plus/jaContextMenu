// import { Menu } from './src/Menu.js';
import ContextMenu, { Panel, h } from '../src/index.ts';
// import ContextMenu, { Panel, h } from '../lib/ja-contextmenu.esm.js';
import PlusIcon from './icon/plus.svg';
import MinusIcon from './icon/minus.svg';
let contextMenu = new ContextMenu({
  fixMenuWhenScroll: false, // 滚动时会跟随滚动
  hideMenuWhenScroll: false, // 滚动页面时关闭菜单
});
let menu = contextMenu.create({
  width: 150,
  class: payload => 'my-contextmenu' + payload[payload.length - 1],
  items: [
    {
      label: 'width:150',
      icon: 'http://test4.h5ds.com/assets/win11/shell32 295.png',
      onclick: (e, payload) => {
        console.log('aaa click', payload);
      },
    },
    {
      icon: PlusIcon,
      label: payload => '2' + payload,
    },
    {
      class: payload => (payload ? 'custom-' + payload[payload.length - 1] : 'custom-class'),
      customItem: h('div.customClassName#customItemId', {
        textContent: 'customRender',
        style: {
          cssText: `
            border:1px solid #aaa;
            border-radius:4px;
            padding:0 2px;
            background:repeating-linear-gradient(45deg,#aaa 0,#aaa 10%,#eee 10%,#eee 20%);
            text-shadow: 0 0 2px #000;
            box-shadow: 0 0 10px #aaa;
          `,
        },
      }),
    },
    {
      icon: MinusIcon,
      label: '3',
      children: {
        width: 100,
        items: [
          { label: 'w:100', disabled: true },
          { type: '---' },
          {
            label: '2-1',
            onclick: (e, payload) => {
              console.log('2-1 click,', payload);
            },
          },
          { label: '2-2' },
          {
            label: '2-3->',
            children: {
              width: 200,
              items: [
                { label: 'width:200', disabled: true },
                { type: '---' },
                {
                  label: '3-1',
                  onclick: (e, payload) => {
                    console.log('3-1 click,', payload);
                  },
                },
                {
                  label: '3-2',
                },
              ],
            },
          },
        ],
      },
    },
    {
      label: '4 disabled',
      disabled: payload => true,
    },
  ],
});
let menu2Option = {
  items: [
    {
      label: () => (menu ? '移除menu1' : 'menu1已被移除'),
      tip: () => `rd:${parseInt(Math.random() * 100)}`,
      disabled: () => !menu,
      onclick(e, payload) {
        console.log('移除menu1', payload);
        menu.destroy();
        menu = null;
      },
    },
    {
      label: '菜单2',
      tip: '提示2',
      children: {
        items: [
          {
            label: '移除本菜单',
            onclick(e, payload) {
              console.log('子菜单被按下', payload);
              menu2.destroy();
            },
          },
        ],
      },
    },
    { type: '---' },
    { label: '返回', tip: 'Alt+向左键', onclick: () => console.log('返回') },
    { label: '前进', tip: 'Alt+向右键', onclick: () => console.log('前进') },
  ],
};
let menu2 = contextMenu.create(menu2Option);

// document.body.appendChild(menu.el);
document.body.oncontextmenu = e => {
  let payload = 'payload: ' + parseInt(Math.random() * 1000);
  // menu.show(e, payload);
  menu.show(e, payload);
};
const block = document.querySelector('#block1');
const block2 = document.querySelector('#block2');
const block3 = document.querySelector('#block3');
block.addEventListener('contextmenu', e => {
  menu2.show(e, 'payload');
});

// create panel demo
let panel = new Panel();
panel.el.append(
  h(
    'div',
    {
      textContent: 'Custom panel inner',
      style: {
        padding: '5px 10px',
      },
    },
    [
      h('table', { border: '1px', style: { width: '100%' } }, [
        h('thead', [h('tr', [h('th', 'id'), h('th', 'name')])]),
        h('tbody', [h('tr', [h('td', '1'), h('td', 'Jack')]), h('tr', [h('td', '2'), h('td', 'Tom')])]),
      ]),
    ],
  ),
);
document.body.appendChild(panel.el);
window.addEventListener('click', e => {
  panel.hide();
});
block2.addEventListener('contextmenu', e => {
  panel.show(e);
});

// const menu3 = contextMenu.create({ items: [{ label: 'test' }] });
block3.addEventListener('click', e => {
  e.stopPropagation();
  console.log('stop propagation');
  // menu3.show(e);
});
