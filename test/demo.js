// import { Menu } from './src/Menu.js';
import ContextMenu, { Panel, h } from '../src/index.ts';
// import ContextMenu, { Panel, h } from '../lib/ja-contextmenu.esm.js';
let contextMenu = new ContextMenu({
  width: 200,
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
      label: payload => '2' + payload,
    },
    {
      class: payload => (payload ? 'custom-' + payload[payload.length - 1] : 'custom-class'),
      customItem: h('div', {
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
      label: '3',
      children: {
        width: 100,
        items: [
          { label: 'w:100' },
          {
            label: '2-1',
            onclick: (e, payload) => {
              console.log('2-1 click,', payload);
            },
          },
          { type: '---' },
          { label: '2-2' },
          {
            label: '2-3->',
            children: {
              width: 200,
              items: [
                { label: 'width:200' },
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
let menu2;
let menu2Option = {
  items: [
    {
      label: '移除menu1',
      tip: () => `提示1(rd:${parseInt(Math.random() * 100)})`,
      onclick(e, payload) {
        console.log('菜单1被按下', payload);
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
  ],
};
menu2 = contextMenu.create(menu2Option);

// document.body.appendChild(menu.el);
document.body.oncontextmenu = e => {
  let payload = 'payload: ' + parseInt(Math.random() * 1000);
  // menu.show(e, payload);
  menu.show(e, payload);
};
let block = document.querySelector('#block1');
block.addEventListener('contextmenu', e => {
  menu2.show(e, 'payload');
});

// create panel demo
let block2 = document.querySelector('#block2');
let panel = new Panel();
panel.el.innerHTML = '<div style="padding:5px 10px;"> 自定义Panel</div>';
document.body.appendChild(panel.el);
window.addEventListener('click', e => {
  panel.hide();
});
block2.addEventListener('contextmenu', e => {
  panel.show(e);
});
