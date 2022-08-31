TODO: 
- [ ] 图标 
- [ ] 支持配置css 类名
- [ ] 有子菜单的项不能点击
- [x] 滚动时隐藏Menu
- [x] 使用position:fixed定位
# jaContextMenu
js右键菜单封装  
默认样式通过js插入style标签完成，注意命名空间。仅提供最基础的样式。
## Usage 使用方式
> npm i ja-contextmenu
```javascript
import ContextMenu from 'ja-contextmenu'; // types.d.ts supported
// import ContextMenu from 'ja-contextmenu/src/index.ts'  
const contextMenu = new ContextMenu();
const option = {
  items: [
    { 
      label: 'menu1', 
      tip: 'tip1', 
      onclick(e, payload) {
        console.log('menu1 click', payload);
      },
    },
    { type: '---' }, // divide line
    { 
      label: 'menu2', 
      tip: 'tip2',
      children: {
        width: 120,
        items: [
          {
            label: 'sub menu1',
            onclick(e,payload){
              console.log('sub menu click', payload)
            }
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
| key | type | default | desc |
| ---- | ---- | ---- | ---- |
| fixMenuWhenScroll | Boolean | false | 滚动时菜单是否固定(需要设置hideMenuWhenScroll=false) |
| hideMenuWhenScroll | Boolean | true | 滚动时是否关闭菜单 |
## ContextMenu instance function 实例方法
### create(option: `MenuOption`): `MenuWrapper`
创建一个菜单，返回一个MenuWrapper对象  
#### MenuOption
| param: type | default | desc |
| ---- | ---- | ---- |
| width?: number| 200 | 菜单宽度，子菜单不配置，则继承父菜单宽度 |
| items: `MenuItemOption` |    | 列表配置项 |

#### MenuItemOption
| param: type | default | desc |
| ---- | ---- | ---- |
| label?: string |    |  选项文字 |
| tip?: string |    | 选项右侧提示文字 |
| type?: `MenuItemType` |     | 取值 '---' \| 'hr'为分割线 | 
| onclick?: function(event, payload)|   | 点击事件回调,参数payload为调用showMenu时传入的参数 |
| children?: `MenuOption` |     | 子菜单配置
## MenuWrapper 方法
### show(e: `MouseEvent`, payload?: any)
展示菜单  
payload参数在点击菜单的onclick回调中返回
### destroy()
销毁菜单