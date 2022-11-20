TODO: 
- [ ] 有子菜单的项不能点击
- [x] 支持配置菜单类名
- [x] 图标 
- [x] 滚动时隐藏Menu
- [x] 使用position:fixed定位
- [x] 支持title/tip formatter
- [x] 支持传入dom，自定义菜单项

# jaContextMenu
原生js右键菜单封装  
默认样式通过js插入style标签完成，注意命名空间。仅提供最基础的样式。
## Usage 使用方式
> npm i ja-contextmenu
## 注意
安装后请把package.json 中ja-contextmenu 的版本号前的"^"删除，防止npm自动更新。(eg: "ja-contextmenu":"`^`1.3.0" => "ja-contextmenu":"1.3.0")  
精力有限，不保证小版本更新时，不改动使用方式。
## Code 样例
```javascript
import ContextMenu from 'ja-contextmenu'; // types.d.ts supported
// import ContextMenu from 'ja-contextmenu/src/index.ts'  
const contextMenu = new ContextMenu({
  width: 200,
  fixMenuWhenScroll: false,
  hideMenuWhenScroll: true
});
const option = {
  items: [
    { 
      icon: './assets/images/ico.png',
      class: 'customClass',
      label: 'menu1', 
      tip: 'tip1', 
      disabled: false,
      onclick(e, payload) {
        console.log('menu1 click', payload);
      },
    },
    { type: '---' }, // divide line
    { 
      icon: payload => 'icon href2',
      label: payload => 'menu2', 
      tip: payload => 'tip2',
      class: payload => 'class2',
      disabled: payload => true
      children: {
        width: 120,
        items: [
          {
            label: 'sub menu1',
            onclick(e,payload){
              console.log('sub menu click', payload)
            }
          },{
            customItem: document.createElement('div')
          }
        ]
      }
    },
  ],
}
let menu = contextMenu.create(option);

document.body.oncontextmenu = (e) => {
  let payload = 'payload data: callback when click items';
  menu.show(e,payload)
};
// menu.destroy(); // 销毁实例
// menu = null;
 ```
## contextMenu constructure 构造函数
> new ContextMenu(option: `ContextMenuOption`);

### ContextMenuOption
| key: type | default | desc |
|  ---- | ---- | ---- |
| width: number | 200 | 菜单宽度 |
| fixMenuWhenScroll: boolean | false | 滚动时菜单是否固定(需要设置hideMenuWhenScroll=false) |
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
| icon?: string\|(payload)=>string |    |  图片icon |
| class?: string\|(payload)=>string |    | 菜单项li class |
| label?: string\|(payload)=>string |    |  选项文字 |
| tip?: string\|(payload)=>string |    | 选项右侧提示文字 |
| disabled?: boolean\|(payload)=>boolean |    | 是否禁用 |
| type?: `MenuItemType` |     | 取值 '---' \| 'hr'为分割线 | 
| customItem?: `HTMLElement` |  | 自定义菜单项 |
| onclick?: function(event, payload)|   | 点击事件回调,参数payload为调用showMenu时传入的参数 |
| children?: `MenuOption` |     | 子菜单配置
## MenuWrapper 方法
### 1.show(e: `MouseEvent` | { x: number, y:number }, payload?: any)
展示菜单  
payload参数在点击菜单的onclick回调中返回
### 2.destroy()
销毁菜单

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
* typscript, rollup 打包, parcel 开发环境调试
* 打包使用 npm run bd && npm run dts (生成ts声明)
* 用src/utils/h.ts 创建一个元素
### 以后
* 尝试使用`Web Components`实现一版

### 欢迎提交merge request