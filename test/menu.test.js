import ContextMenu from '../lib/ja-contextmenu.esm';
describe(() => {
  test('create menu', () => {
    const contextMenu = new ContextMenu();
    const menu = contextMenu.create({
      width: 120,
      items: [{ label: 'A' }],
    });
    // expect(menu).toBeDefined();
  });
});
