export default interface ContextMenuOption {
  /** 滚动时是否关闭菜单*/
  hideMenuWhenScroll?: boolean;
  /** 滚动时菜单是否固定(需要设置hideMenuWhenScroll=false) */
  fixMenuWhenScroll?: boolean;
}
