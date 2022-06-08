// import { Menu } from './src/Menu.js';
import ContextMenu, { Panel } from './src/index.ts';
// import ContextMenu from './lib/index.esm.js';
let contextMenu = new ContextMenu({
  fixMenuWhenScroll: false, // 滚动时会跟随滚动
  hideMenuWhenScroll: false, // 滚动页面时关闭菜单
});
let menu = contextMenu.create({
  items: [
    {
      label: 'aaa',
      onclick: (e, payload) => {
        console.log('aaa click', payload);
      },
    },
    {
      label: '222',
    },
    {
      label: '333',
      children: {
        width: 120,
        items: [
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
  ],
});
let menu2Option = {
  items: [
    {
      label: '菜单1',
      tip: '提示1',
      onclick(e, payload) {
        console.log('菜单1被按下', payload);
      },
    },
    {
      label: '菜单2',
      tip: '提示2',
      children: {
        items: [
          {
            label: '子菜单1',
            onclick(e, payload) {
              console.log('子菜单被按下', payload);
            },
          },
        ],
      },
    },
  ],
};
let menu2 = contextMenu.create(menu2Option);

// document.body.appendChild(menu.el);
document.body.oncontextmenu = e => {
  let payload = 'payload data: callback when click items';
  // menu.show(e, payload);
  menu.show(e, payload);
};
let block = document.querySelector('#block1');
block.addEventListener('contextmenu', e => {
  menu2.show(e, 'payload');
});

let block2 = document.querySelector('#block2');
let panel = new Panel();
panel.el.innerHTML = '<div>hehehehe</div>';
document.body.appendChild(panel.el);
block2.addEventListener('contextmenu', e => {
  panel.show(e);
});
