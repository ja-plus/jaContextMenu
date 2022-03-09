export default interface ContextMenuOption {
  hideMenuWhenScroll?: boolean; //滚动时是否关闭菜单
  fixMenuWhenScroll?: boolean; //滚动时菜单是否固定(需要设置hideMenuWhenScroll=false)
}