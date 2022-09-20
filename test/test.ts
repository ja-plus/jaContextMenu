import ContextMenu from '../src/index';
const contextMenu = new ContextMenu();
const menu = contextMenu.create<number>({
  width: 100,
  items: [
    {
      label: 'label',
      onclick(e, payload) {
        console.log(payload);
      },
    },
  ],
});
// menu.show({ x: 1, y: 1 }, 's');
