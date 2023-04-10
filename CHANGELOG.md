## v1.4.6
* change: class li font-size -> 12px
* change: default style.
    * li:hover .menu-item-tip: color -> `remove`
## v1.4.5
* add: edge contextmenu style.
* change: default style.
    * font-size -> 12px,
    * border-color -> #dadce0
    * li:hover background-color -> #e8e8e9, .menu-item-tip: color -> #000
    * divide line: color -> #dee0e3, margin-left/right -> 1px
* change: ts `declarationDir` lib/index.d.ts -> lib/types/index.d.ts
* fix: menuItemOption.disabled bug
## v1.4.4
* remove: package.json `source`.
* optimize: browser rerender cause by `utils -> getWindowSize()`.
move: `d.ts` file into `lib`folder.
## v1.4.3
* fix: remove `undefined` class name in ja-contextmenu class
## v1.4.2
* delete: `.npmignore`, use package.json `files` to order publish file. Optimize npm package size.
* change: package.json `gitee` to `github`
## v1.4.1
* change: lib file name `index` to `ja-contextmenu`.
* remove: inline style `z-index`.
* add: `private` decorator.
## v1.4.0
* update: 点击右键时才渲染菜单项。而不是一开始就渲染。
* update：`MenuItemOption.disabled` 可传方法
## v1.3.0
* fix: `ContextMenu.create` option passed `MenuOption.width` not work.
* add: `MenuItemOption.title/tip` 可传 formatter 方法.
* add: `MenuItemOption.icon`
* add: `MenuItemOption.customItem` 用户自定义渲染
* add: `MenuOption.class`,`MenuItemOption.class` 自定义class
## v1.2.2
* MenuWrapper 支持传入position，不一定要MouseEvent
* `ContextMenuOption` 支持传入默认width
* fix: inject `style` tag after `title` tag
* payload 泛型支持
## v1.2.1
* MenuWrapper add destroy function to release DOM
* fix: panel position error when scrollPage
## v1.2.0
*  change: ja-panel, ja-contextmenu extends ja-panel
## v1.1.0
* package.json add typescript d.ts support
* update readme.md
* change type `divide` to `hr`
## v1.0.1
### Bugfix
* 修复show Menu的边界情况位置