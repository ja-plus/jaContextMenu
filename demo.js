// import { Menu } from './src/Menu.js';
import ContextMenu, { Panel } from './src/index.ts';
// import ContextMenu from './lib/index.esm.js';
let contextMenu = new ContextMenu({
  width: 200,
  fixMenuWhenScroll: false, // 滚动时会跟随滚动
  hideMenuWhenScroll: false, // 滚动页面时关闭菜单
});
let menu = contextMenu.create({
  width: 150,
  items: [
    {
      label: 'width:150',
      icon: 'http://test4.h5ds.com/assets/win11/shell32 295.png',
      onclick: (e, payload) => {
        console.log('aaa click', payload);
      },
    },
    {
      label: payload => '222' + payload,
    },
    {
      label: '333',
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
