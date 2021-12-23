TODO: 
1. 图标 
2. 滚动时隐藏Menu
3. 使用position:fixed定位
## jaContextMenu
    js右键菜单封装  
    默认样式通过js插入style标签完成，注意命名空间
### 使用方式
```javascript
import ContextMenu from './lib/index.esm.js';  
let contextMenu = new ContextMenu();
let option = {
    items: [
      { 
        label: '菜单1', 
        tip: '提示1', 
        onclick(e, payload) {
          console.log('菜单1被按下', payload);
        },
      },
      { 
        label: '菜单2', 
        tip: '提示2',
        children: {
          width: 120,
          items: [
            {
              label: '子菜单1',
              onclick(e,payload){
                console.log('子菜单被按下', payload)
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
  };
 ```
### option 取值
| param: type | default | desc |
| ---- | ---- | ---- |
| width?: number| 200 | 菜单宽度，子菜单不配置，则继承父菜单宽度 |
| items: object |    | 列表配置 |
### items Object
| param: type | default | desc |
| ---- | ---- | ---- |
| label?: string |    |  选项文字 |
| tip?: string |    | 选项右侧提示文字 |
| type?: string |     | 取值 '---' 或 'divide'为分割线| 
| onclick?: function(event, payload)|   | 点击事件回调 |

## contextMenu function 实例方法
### contextMenu.create(option: object): Menu
    创建一个菜单，返回一个Menu对象
### contextMenu.showMenu(e: mouseEvent, menu: Menu, payload?: any)
    展示菜单  
    payload参数在点击菜单的onclick回调中返回