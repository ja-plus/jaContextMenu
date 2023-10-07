# ja-contextmenu
Demo: npm run dev (this project)
![img](https://github.com/ja-plus/jaContextMenu/blob/master/md-imgs/main.png?raw=true)

## Brief introduction
* Native js right-click menu encapsulation. It can also be used for the onclick event to open the menu.
* The default style is completed by inserting the style tag through js, paying attention to the class namespace.。
* Only the most basic styles are provided.
* TypeScript ✔
* default z-index = 5000;
* [Gitee](https://gitee.com/japlus/ja-context-menu)
* [中文](https://gitee.com/japlus/ja-context-menu/blob/master/README.zh.md)
## Usage
> npm i ja-contextmenu
```js
import ContextMenu from 'ja-contextmenu';
const contextMenu = new ContextMenu();
let menu = contextMenu.create({
  item:[
    { label:'go', onclick(e, payload){...} }
  ]
})
window.addEventListener('contextmenu',e => {menu.show(e, payload)})

```
## Attention
Please delete the "^"before the version number of ja-contextmenu in package.json after installation to prevent the unexpected automatic update of npm. <br>
(eg: "ja-contextmenu":"`^`1.3.0" => "ja-contextmenu":"1.3.0")
<br>
Limited energy, there is no guarantee that the use mode will not be changed when the small version is updated.
## Feature Log
- [x] MenuItemOption.onclick return true. click item not close menu. (v1.6.0)
- [x] MenuItemOption.icon support HTMLElement. (v1.6.0)
- [x] MenuItemOption.show: boolean。Control MenuItem show. (v1.5.0)
- [x] click close，capture:true.
- [x] Items with submenus cannot be clicked.
- [x] Support configuration class.
- [x] Support configuration class icon.
- [x] Hide when scrolling
- [x] Use position:fixed
- [x] title/tip formatter
- [x] Support incoming DOM，custom MenuItem
## Example
```javascript
import ContextMenu, { h } from 'ja-contextmenu'; // types.d.ts supported
// import ContextMenu from 'ja-contextmenu/src/index.ts'  
const contextMenu = new ContextMenu({
  width: 200, // default: 200
  fixMenuWhenScroll: false, // (position:fixed) default:false
  hideMenuWhenScroll: true // default:true
});
const menuOption = {
  items: [
    { 
      label: 'menu1', // name
      icon: './assets/images/ico.png', // icon url | HTMLElement
      class: 'customClass', // item class, default: ''
      tip: 'tip1', // Prompt text to the right of option, default: ''
      show: true, // default: true
      disabled: false, //  default: false
      onclick(e, payload) {
        // payload is the parameter passed in by calling the menu.show method.
        console.log('menu1 click', payload);
        // return true; // not close menu
      },
    },
    { type: '---' }, // <hr> split line
    { 
      // support function
      label: payload => 'menu2', 
      icon: payload => 'icon href2',
      class: payload => 'class2',
      tip: payload => 'tip2',
      show: payload => true,
      disabled: payload => true
      children: {
        width: 120, // default = parent menu width
        items: [
          {
            label: 'sub menu1',
            onclick: (e, payload) => {
              console.log('sub menu1 click', payload)
            }
          },{
            class: 'li-class-name',
            customItem: document.createElement('div')
          },{
            // I encapsulated the function h of createElement.
            customItem: h('div',[
              h('span', {
                // {[element.key]:value}
                textContent: 'hello', // element.textContent = 'hello'
                style:{
                  fontWeight:'bolder'.// element.style.fontWeight = 'holder'
                  cssText: 'font-size:14px;' // element.style.cssText = 'font-size:14px;'
                }, 
                className:'class-name', 
              }),
              h('span.class-name#id',' world')
            ])
          }
        ]
      }
    },
  ],
}
let menu = contextMenu.create(menuOption);

document.body.oncontextmenu = (e) => {
  let payload = 'payload data: callback when click items';
  menu.show(e, payload);
};
// or
someButton.onclick = (e) => {
  menu.show(e);
}

// menu.hide();
// menu.destroy();
// menu = null;
 ```
## ContextMenu constructor
> new ContextMenu(option: `ContextMenuOption`);
### ContextMenuOption
| key: type | default | desc |
|  ---- | ---- | ---- |
| width: number | 200 | Menu width |
| fixMenuWhenScroll: boolean | false | Is the menu fixed when scrolling(hideMenuWhenScroll=false) |
| hideMenuWhenScroll: boolean | true | Whether to close the menu when scrolling. |
## ContextMenu instance method 
### create\<PayloadType\>(option: `MenuOption`): `MenuWrapper`
Create a menu and return a MenuWrapper object. 
#### MenuOption
| param: type | default | desc |
| ---- | ---- | ---- |
| width?: number| 200 | Menu width. If the submenu is not configured, the width of the parent menu will be inherited. |
| class?: string\|(payload)=>string | | Menu ul class |
| items: `MenuItemOption` |    | List configuration item |

#### MenuItemOption
| param: type | default | desc |
| ---- | ---- | ---- |
| icon?: string\|HTMLElement\|(payload)=>string\|HTMLElement |    | icon url |
| class?: string\|(payload)=>string |    | Menu item 'li' class |
| label?: string\|(payload)=>string |    | Item text |
| tip?: string\|(payload)=>string |    | Prompt text to the right of menu item |
| show?: boolean\|(payload)=>boolean |  true  | Whether to show |
| disabled?: boolean\|(payload)=>boolean |  false  | Whether to disabled |
| type?: `MenuItemType` |     | value '---' \| 'hr' => &lt;hr&gt; split line | 
| customItem?: `HTMLElement` |  | Custom Menu Item |
| onclick?: function(event, payload):boolean|   | Click the event callback, and the parameter payload is the parameter passed in when calling the showMenu. return true does not close the menu after clicking.|
| children?: `MenuOption` |     | Submenu configuration
## MenuWrapper
```ts
const menu:MenuWrapper = contextMenu.create<Payload>(...)
```
### 1.show(pos: { x: number, y: number }, payload?: any)
Show menu
* pos: `PointerEvent`, `MouseEvent`, T extends { x: number, y: number }
* payload: Return in the onclick callback of the click menu.
### 2.hide()
### 3.destroy()

## Typescript Demo
```ts
import ContextMenu from 'ja-contextmenu';
const contextMenu = new ContextMenu();
// Generic - PayloadType
const menu = contextMenu.create<number>({
  width: 100,
  items: [
    {
      label: 'label',
      onclick(e, payload:number) { // type
        console.log(payload);
      },
    },
  ],
});

menu.show({x: 100,y:100}, 1) // payload type :number
//menu.show({x: 100,y:100}, '2') // payload type error not number

```

## About Project
* **demo**: npm run dev<br>
  Demo code in `/test` folder
* build prod: npm run bd
* src/utils/h.ts => document.createElement()
