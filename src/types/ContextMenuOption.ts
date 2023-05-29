export type ContextMenuOption = {
  /** default menu width */
  width?: number;
  /** 基础z-index 
  baseZIndex?: number;*/
  /** 滚动时是否关闭菜单*/
  hideMenuWhenScroll?: boolean;
  /** 滚动时菜单是否固定(hideMenuWhenScroll=false) */
  fixMenuWhenScroll?: boolean;
};
