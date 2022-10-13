/**
 * 这个文件用来测试typescript 代码提示是否正常
 */
import ContextMenu from '../src/index';
const contextMenu = new ContextMenu();
const menu = contextMenu.create<number>({
  width: 100,
  items: [
    {
      label: payload => 'label',
      onclick(e, payload) {
        console.log(payload);
      },
    },
  ],
});
// menu.show({ x: 1, y: 1 }, 's');
