import config from './config';

export const panelStyle = `
  .${config.panelClassName}, .${config.panelClassName} * {
    box-sizing: border-box;
  }
  .${config.panelClassName}{
    --border-color: #dee0e3;
    border: 1px solid var(--border-color);
    left: 0;top:0;
    background-color: #fff;
    display: none;
    width: ${config.defaultMenuWidth}px;
    position:absolute;
    z-index: ${config.defaultZIndex};
  }
`;

export const contextMenuStyle = `
  .${config.wrapperClassName}{
    -webkit-user-select:none;
    user-select: none;
    padding: 2px 0 2px 0px;
    margin: 0;
    cursor: default;
  }
  /*子菜单*/
  .${config.wrapperClassName} .${config.panelClassName}{ 
    position: absolute;
  }
  .${config.wrapperClassName} .divide{
    margin: ${config.menuItemDivideLineMargin}px 1px;
    height: 1px;
    background-color: var(--border-color);
  }
  .${config.wrapperClassName} li {
    position: relative;
    padding: 0 30px 0 30px;
    list-style: none;
    line-height: ${config.menuItemHeight}px;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
  }
  .${config.wrapperClassName} li.disabled{
    color: #5f6368;
    pointer-events: none;
  }
  .${config.wrapperClassName} li .menu-item-icon{
    position:absolute;
    left: 7px;
    top: 4px;
    height: 16px;
    vertical-align: middle;
  }
  .${config.wrapperClassName} li .menu-item-label {
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
  }
  .${config.wrapperClassName} li .menu-item-tip {
    color: #5f6368;
    font-size: 12px;
  }
  .${config.wrapperClassName} li:hover:not(.divide):not(.disabled),
  .${config.wrapperClassName} li.${config.wrapperClassName}_hover {
    background-color: #e8e8e9;
  }
  .${config.wrapperClassName} li.${config.wrapperClassName}_hover .menu-item-tip {
    color: #000;
  }
  .${config.wrapperClassName} li:hover:not(.divide):not(.disabled) .tip,
  .${config.wrapperClassName} li.${config.wrapperClassName}_hover .tip{
    color: #000;
  }
  .${config.wrapperClassName} li .right-arrow {
    position: absolute;
    right: 8px;
    top: 9px;
    border-top: 4px solid transparent;
    border-left: 4px solid #000;
    border-right: 4px solid transparent;
    border-bottom: 4px solid transparent;
  }
  .${config.wrapperClassName}_child{
  }
  `;
