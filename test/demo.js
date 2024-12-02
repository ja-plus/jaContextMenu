// import { Menu } from './src/Menu.js';
import { default as ContextMenu, Panel, h } from '../src/index.ts';
// import ContextMenu, { Panel, h } from '../lib/ja-contextmenu.esm.js';
import PlusIcon from './icon/plus.svg';
import MinusIcon from './icon/minus.svg';
import RightArrowIcon from './icon/right-arrow.svg';
let contextMenu = new ContextMenu({
  fixMenuWhenScroll: false,
  hideMenuWhenScroll: false,
});
let menu = contextMenu.create({
  width: 150,
  class: payload => 'my-contextmenu' + payload[payload.length - 1],
  items: [
    {
      icon: () =>
        h('div', { style: { cssText: `width:16px;height: 16px;background-color:${Math.random() < 0.5 ? 'green' : 'red'};border-radius:50%` } }),
      label: 'width:150',
      onclick: (e, payload) => {
        console.log('aaa click', payload);
      },
    },
    {
      label: 'show',
      show: () => Math.random() < 0.5,
    },
    {
      icon: PlusIcon,
      label: payload => '2' + payload,
    },
    {
      class: payload => (payload ? 'custom-' + payload[payload.length - 1] : 'custom-class'),
      arrowIcon: () => h('img', { src: RightArrowIcon, style: { cssText: 'width:16px;height:16px' } }),
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
      children: {
        items: [{ label: 'custom render item' }],
      },
    },
    {
      icon: MinusIcon,
      label: '3',
      children: {
        width: 150,
        items: [
          { label: 'sticky bottom', disabled: true },
          { type: '---' },
          {
            label: '2-1',
            onclick: (e, payload) => {
              console.log('2-1 click,', payload);
            },
          },
          { label: '2-2' },
          {
            label: 'more items',
            children: {
              width: 200,
              items: [
                { label: 'H > pageH', disabled: true },
                { type: '---' },
                {
                  label: '3-0',
                  children: {
                    items: [{ label: '3-0-0' }],
                  },
                },
                {
                  label: '3-1',
                  onclick: (e, payload) => {
                    console.log('3-1 click,', payload);
                  },
                },
                ...Array.from({ length: 30 }, (_, i) => ({
                  label: `3-${i}`,
                })),
              ],
            },
          },
          ...Array.from({ length: 10 }, (_, i) => ({
            label: `2-${4 + i}`,
          })),
        ],
      },
    },
    {
      label: '4 disabled',
      disabled: () => true,
    },
    {
      icon: () => h('input', { type: 'checkbox' }),
      label: 'onclick:() => true',
      onclick: () => true,
    },
  ],
});
let menu2Option = {
  items: [
    {
      label: () => (menu ? 'Remove Menu 1' : 'Menu 1 removed'),
      tip: () => `rd:${parseInt(Math.random() * 100)}`,
      disabled: () => !menu,
      onclick(e, payload) {
        console.log('Remove menu1', payload);
        menu.destroy();
        menu = null;
      },
    },
    {
      label: 'Menu 2',
      tip: 'Tip 2',
      children: {
        items: [
          {
            label: 'Remove this menu',
            onclick(e, payload) {
              console.log('sub menu clicked', payload);
              menu2().destroy();
            },
          },
          {
            label: 'Disabled status',
            disabled: true,
          },
          {
            label: 'Add icon',
            icon: () => h('div', { style: { cssText: 'width: 14px;height:14px;border: 2px dashed;' } }),
          },
          {
            label: 'Custom item',
            onclick: e => {
              return true; // not close menu
            },
            customItem: () => {
              return h('div', { style: { cssText: 'display:flex;align-items:center;' } }, [
                h('div', 'Custom items'), //
                h('input', {
                  type: 'range',
                  style: {
                    cssText: 'width: 50px',
                  },
                }),
              ]);
            },
          },
        ],
      },
    },
    { type: '---' },
    { label: 'Return', tip: 'Alt+A', onclick: () => console.log('Return') },
    { label: 'Forward', tip: 'Alt+B', onclick: () => console.log('Forward') },
    { label: 'Press Q to close menu', tip: '', disabled: true },
  ],
};
let menu2 = contextMenu.createAsync(menu2Option);

document.body.oncontextmenu = e => {
  let payload = 'payload: ' + parseInt(Math.random() * 1000);
  // menu.show(e, payload);
  menu.show(e, payload);
};
window.addEventListener('keypress', e => {
  if (e.key === 'q') {
    menu.hide();
    menu2().hide();
  }
});
const block = document.querySelector('#block1');
const block2 = document.querySelector('#block2');
// const block3 = document.querySelector('#block3');
const block4 = document.querySelector('#block4');
block.addEventListener('contextmenu', e => {
  const showResult = menu2().show(e, 'payload');
  console.log(showResult);
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
// block3.addEventListener('click', e => {
//   e.stopPropagation();
//   console.log('stop propagation');
//   // menu3.show(e);
// });

const menu4 = contextMenu.create({ items: [{ label: 'prefer left top' }, { label: 'prefer left top' }] });
block4.addEventListener('contextmenu', e => {
  e.stopPropagation();
  e.position = ['left', 'top'];
  menu4.show(e);
});
