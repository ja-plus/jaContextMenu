import ContextMenu from '../src/index';
import { describe, expect, it, test } from 'vitest';
// @vitest-environment happy-dom

const html = document.documentElement;

// 设置clientWidth和clientHeight
Object.defineProperty(html, 'clientWidth', {
  get: () => 800,
});
Object.defineProperty(html, 'clientHeight', {
  get: () => 600,
});

it('should set clientWidth and clientHeight', () => {
  expect(html.clientWidth).toBe(800);
  expect(html.clientHeight).toBe(600);
});

describe('create menu', () => {
  test('create', () => {
    const contextMenu = new ContextMenu();
    const menu = contextMenu.create({
      items: [{ label: 'A' }],
    });
    expect(menu).toBeTruthy();
  });
  test('show', () => {
    const contextMenu = new ContextMenu();
    const menu = contextMenu.create({
      items: [{ label: 'A' }],
    });
    menu.show({ x: 0, y: 0 });
    const panelEl = menu.menu.el;
    const style = getComputedStyle(panelEl);
    expect(style.display).toBe('block');
  });

  test('hide', () => {
    const contextMenu = new ContextMenu();
    const menu = contextMenu.create({
      items: [{ label: 'A' }],
    });
    menu.show({ x: 0, y: 0 });
    menu.hide();
    const panelEl = menu.menu.el;
    const style = getComputedStyle(panelEl);
    expect(style.display).toBe('none');
  });
  test('destroy', () => {
    const contextMenu = new ContextMenu();
    const menu = contextMenu.create({
      items: [{ label: 'A' }],
    });
    menu.show({ x: 0, y: 0 });
    menu.destroy();
    expect(menu.menu.el).toBeNull();
  });

  test('attr: width ', () => {
    const contextMenu = new ContextMenu();
    const menu = contextMenu.create({
      width: 120,
      items: [{ label: 'A' }],
    });
    menu.show({ x: 0, y: 0 });
    let panelEl = menu.menu.el;
    const style = getComputedStyle(panelEl);
    expect(style.width).toBe('120px');
    expect(style.display).toBe('block');
  });

  test('attr: class', () => {
    const contextMenu = new ContextMenu();
    const menu = contextMenu.create({
      class: 'test-ul-class',
      items: [{ label: 'A' }],
    });
    menu.show({ x: 0, y: 0 });
    const ulEl = document.querySelector('.test-ul-class');
    expect(ulEl).toBeTruthy();
  });
});

test('show menu with position', () => {
  const contextMenu = new ContextMenu();
  const menu = contextMenu.create({
    items: [{ label: 'A' }],
  });
  menu.show({ x: 100, y: 200 });
  const panelEl = menu.menu.el;
  const style = getComputedStyle(panelEl);
  expect(style.transform).toBe('translate(100px,200px)');
});
