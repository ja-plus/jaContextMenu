import ContextMenu, { Panel } from '../src/index';
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
    const menuId = menu.menu.id;
    menu.show({ x: 0, y: 0 });
    menu.destroy();
    expect(menu.menu.el).toBeNull();
    const panelEl = document.querySelector(`[data-ja-menu-id=${menuId}]`);
    expect(panelEl).toBeNull();
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
  menu.destroy();
});

describe('menu item', () => {
  test('label', () => {
    const contextMenu = new ContextMenu();
    const menu = contextMenu.create({
      items: [{ label: 'A' }],
    });
    menu.show({ x: 0, y: 0 });
    const liEl = menu.menu.el.querySelector('.ja-contextmenu li');
    expect(liEl.textContent).toBe('A');
    menu.destroy();
  });

  test('tip', () => {
    const contextMenu = new ContextMenu();
    const menu = contextMenu.create({
      items: [{ label: 'A', tip: 'test tip' }],
    });
    menu.show({ x: 0, y: 0 });
    const liEl = menu.menu.el.querySelector('.ja-contextmenu li .menu-item-tip');
    expect(liEl).toBeTruthy();
    menu.destroy();
  });

  test('hr', () => {
    const contextMenu = new ContextMenu();
    const menu = contextMenu.create({
      items: [{ label: 'A' }, { type: 'hr' }, { label: 'B' }],
    });
    menu.show({ x: 0, y: 0 });
    const hrEl = menu.menu.el.querySelector('.ja-contextmenu li:nth-child(2)');
    expect(hrEl.classList.contains('divide')).toBeTruthy();
    menu.destroy();
  });

  test('icon', () => {
    const contextMenu = new ContextMenu();
    const iconImgSrc = 'http://aa.com/test-icon';
    const menu = contextMenu.create({
      items: [{ label: 'A', icon: iconImgSrc }],
    });
    menu.show({ x: 0, y: 0 });
    const img = menu.menu.el.querySelector('.ja-contextmenu li .menu-item-icon');
    expect(img.src).toBe(iconImgSrc);
    menu.destroy();
  });

  test('disabled', () => {
    const contextMenu = new ContextMenu();
    const menu = contextMenu.create({
      items: [{ label: 'A', disabled: true }],
    });
    menu.show({ x: 0, y: 0 });
    const liEl = menu.menu.el.querySelector('.ja-contextmenu li');
    expect(liEl.classList.contains('disabled')).toBeTruthy();
    menu.destroy();
  });

  test('show', () => {
    const contextMenu = new ContextMenu();
    const menu = contextMenu.create({
      items: [{ label: 'A', show: false }],
    });
    menu.show({ x: 0, y: 0 });
    const liEl = menu.menu.el.querySelector('.ja-contextmenu li');
    expect(liEl.style.display).toBe('none');
    menu.destroy();
  });

  test('class', () => {
    const contextMenu = new ContextMenu();
    const menu = contextMenu.create({
      items: [{ label: 'A', class: 'test-li-class' }],
    });
    menu.show({ x: 0, y: 0 });
    const liEl = menu.menu.el.querySelector('.test-li-class');
    expect(liEl.tagName).toBe('LI');
    menu.destroy();
  });

  test('children', () => {
    const contextMenu = new ContextMenu();
    const menu = contextMenu.create({
      items: [{ label: 'A', children: [{ label: 'B' }] }],
    });
    menu.show({ x: 0, y: 0 });
    const liEl = menu.menu.el.querySelector('.ja-contextmenu li');
    const arrow = liEl.querySelector('.right-arrow');
    expect(arrow).toBeTruthy();
    liEl.onmouseenter({ target: liEl });
    const menuId = menu.menu.id;
    const childMenuEl = document.querySelector(`[data-ja-menu-id=${menuId}][data-lv=1]`);
    expect(childMenuEl).toBeTruthy();
    menu.destroy();
  });
});

describe('2 menu', () => {
  test('hide other', () => {
    const contextMenu = new ContextMenu();
    const menu1 = contextMenu.create({
      items: [{ label: 'A' }],
    });
    const menu2 = contextMenu.create({
      items: [{ label: 'B' }],
    });
    const menu1Id = menu1.menu.id;
    const menu2Id = menu2.menu.id;

    menu1.show({ x: 0, y: 0 });
    const menu1El = document.querySelector(`[data-ja-menu-id=${menu1Id}]`);
    expect(menu1El).toBeTruthy();
    expect(menu1El.classList.contains('hide')).toBeFalsy();

    menu2.show({ x: 0, y: 0 });
    expect(menu1El.classList.contains('hide')).toBeTruthy();
    const menu2El = document.querySelector(`[data-ja-menu-id=${menu2Id}]`);
    expect(menu2El).toBeTruthy();
    expect(menu2El.classList.contains('hide')).toBeFalsy();
  });
});

describe('class Panel', () => {
  test('new Panel', () => {
    const panel = new Panel();
    panel.el.classList.add('test-panel');
    document.body.appendChild(panel.el);
    panel.show({ x: 0, y: 0 });
    let panelEl = document.querySelector('.test-panel');
    expect(panelEl).toBeTruthy();
    panel.hide();
    expect(panelEl.classList.contains('hide')).toBeTruthy();
    panel.destroy();
    panelEl = document.querySelector('.test-panel');
    expect(panelEl).toBeFalsy();
  });
});
