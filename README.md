TODO: 
- [x] click 外部关闭事件，capture:true。
- [x] 有子菜单的项不能点击
- [x] 支持配置菜单类名
- [x] 图标 
- [x] 滚动时隐藏Menu
- [x] 使用position:fixed定位
- [x] 支持title/tip formatter
- [x] 支持传入dom，自定义菜单项

# jaContextMenu
## 简介
* 原生js右键菜单封装。也可用于onclick事件打开菜单。
* 默认样式通过js插入style标签完成，注意class命名空间。
* 仅提供最基础的样式。
* 支持typescript。
* default z-index = 5000;
* [Gitee](https://gitee.com/japlus/ja-context-menu)
## Usage 使用方式
> npm i ja-contextmenu
## 注意
安装后请把package.json 中ja-contextmenu 的版本号前的"^"删除，防止npm的预料之外的自动更新。(例: "ja-contextmenu":"`^`1.3.0" => "ja-contextmenu":"1.3.0")  
精力有限，不保证小版本更新时，不改动使用方式。
## Code 样例
```javascript
import ContextMenu, { h } from 'ja-contextmenu'; // types.d.ts supported
// import ContextMenu from 'ja-contextmenu/src/index.ts'  
const contextMenu = new ContextMenu({
  width: 200, // 默认200
  fixMenuWhenScroll: false, // 滚动时菜单是否固定(position:fixed)default:false
  hideMenuWhenScroll: true // 滚动时是否关闭菜单，default:true
});
const menuOption = {
  items: [
    { 
      label: 'menu1', // 选项名称
      icon: './assets/images/ico.png', // 选项前的图标icon url
      class: 'customClass', // 选项自定义class，默认 ''
      tip: 'tip1', // 选项右侧提示文字
      disabled: false, // 是否禁用选项，默认false
      onclick(e, payload) {
        // payload 为调用menu.show方法传入的参数
        console.log('menu1 click', payload);
      },
    },
    { type: '---' }, // 分割线
    { 
      // 支持选项内容根据payload变动
      label: payload => 'menu2', 
      icon: payload => 'icon href2',
      class: payload => 'class2',
      tip: payload => 'tip2',
      disabled: payload => true
      children: {
        width: 120,// 不传则继承父菜单宽度
        items: [
          {
            label: 'sub menu1',
            onclick: (e, payload) => {
              console.log('sub menu1 click', payload)
            }
          },{
            class: 'li-class-name',
            // 自定义选项内容
            customItem: document.createElement('div')
          },{
            // 我封装了createElement的函数h
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
// 或者
someButton.onclick = (e) => {
  menu.show(e);
}
// 主动隐藏
// menu.hide();
// 销毁实例
// menu.destroy(); 
// menu = null;
 ```
## contextMenu constructure 构造函数
> new ContextMenu(option: `ContextMenuOption`);

### ContextMenuOption
| key: type | default | desc |
|  ---- | ---- | ---- |
| width: number | 200 | 菜单宽度 |
| fixMenuWhenScroll: boolean | false | 滚动时菜单是否固定(hideMenuWhenScroll=false) |
| hideMenuWhenScroll: boolean | true | 滚动时是否关闭菜单 |
## ContextMenu instance function 实例方法
### create\<PayloadType\>(option: `MenuOption`): `MenuWrapper`
创建一个菜单，返回一个MenuWrapper对象  
泛型`PayloadType` 为payload的类型  
#### MenuOption
| param: type | default | desc |
| ---- | ---- | ---- |
| width?: number| 200 | 菜单宽度，子菜单不配置，则继承父菜单宽度 |
| class?: string\|(payload)=>string | | 菜单ul class |
| items: `MenuItemOption` |    | 列表配置项 |

#### MenuItemOption
| param: type | default | desc |
| ---- | ---- | ---- |
| icon?: string\|(payload)=>string |    | 选项前的图标icon url |
| class?: string\|(payload)=>string |    | 菜单项li class |
| label?: string\|(payload)=>string |    | 选项文字 |
| tip?: string\|(payload)=>string |    | 选项右侧提示文字 |
| disabled?: boolean\|(payload)=>boolean |    | 是否禁用 |
| type?: `MenuItemType` |     | 取值 '---' \| 'hr'为分割线 | 
| customItem?: `HTMLElement` |  | 自定义菜单项 |
| onclick?: function(event, payload)|   | 点击事件回调,参数payload为调用showMenu时传入的参数 |
| children?: `MenuOption` |     | 子菜单配置
## MenuWrapper
```ts
const menu:MenuWrapper = context.create(...)
```
### 1.show(pos: { x: number, y:number }, payload?: any)
展示菜单。
* pos: 支持 `PointerEvent`, `MouseEvent`
* payload: 在点击菜单的onclick回调中返回。
### 2.hide() 隐藏
### 3.destroy() 销毁

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

## 关于项目
### 结构
* build:rollup, dev: parel
* prod打包: npm run bd
* src/utils/h.ts 用来创建一个DOM元素

### 欢迎提交merge request