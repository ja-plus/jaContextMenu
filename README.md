TODO: 
- [ ] 图标 
- [ ] 支持配置css 类名
- [ ] 支持增加css 类名
- [x] 滚动时隐藏Menu
- [x] 使用position:fixed定位
## jaContextMenu
js右键菜单封装  
默认样式通过js插入style标签完成，注意命名空间
## Usage 使用方式
```javascript
import ContextMenu from './lib/index.esm.js';  
let contextMenu = new ContextMenu();
let option = {
  items: [
    { 
      label: 'menu1', 
      tip: 'tip1', 
      onclick(e, payload) {
        console.log('menu1 click', payload);
      },
    },
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
    contextMenu.showMenu(e, menu, payload);
    // or
    menu.show(e,payload)
  };
 ```
## contextMenu constructure 构造函数
> new ContextMenu(config);

### config
| key | type | default | desc |
| ---- | ---- | ---- | ---- |
| fixMenuWhenScroll | Boolean | false | 滚动时菜单是否固定(需要设置hideMenuWhenScroll=false) |
| hideMenuWhenScroll | Boolean | true | 滚动时是否关闭菜单 |
## contextMenu instance function 实例方法
### 1.contextMenu.create(option: object): MenuWrapper
创建一个菜单，返回一个MenuWrapper对象
**option 取值**
| param: type | default | desc |
| ---- | ---- | ---- |
| width?: number| 200 | 菜单宽度，子菜单不配置，则继承父菜单宽度 |
| items: object |    | 列表配置 |

**items Object**
| param: type | default | desc |
| ---- | ---- | ---- |
| label?: string |    |  选项文字 |
| tip?: string |    | 选项右侧提示文字 |
| type?: string |     | 取值 '---' \|\| 'divide'为分割线| 
| onclick?: function(event, payload)|   | 点击事件回调,参数payload为调用showMenu时传入的参数 |
### 2.MenuWrapper.show(e: mouseEvent, payload?: any)
展示菜单  
payload参数在点击菜单的onclick回调中返回