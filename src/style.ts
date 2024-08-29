import config from './config';

export const panelStyle = `
  .${config.panelClassName}, .${config.panelClassName} * {
    box-sizing: border-box;
  }
  .${config.panelClassName}{
    --border-color: #dee0e3;
    border: 1px solid var(--border-color);
    left: 0; top: 0;
    background-color: #fff;
    position: absolute;
    z-index: ${config.defaultZIndex};
  }
  .${config.panelClassName}.hide{
    display: none;
  }
`;

export const contextMenuStyle = `
  .${config.wrapperClassName}{
    --item-background--hover: #e8e8e9;
    --disabled-color: #777;
    --tip-color: #5f6368;
    --li-height: ${config.menuItemHeight}px;
    user-select: none;
    padding: 2px 0 2px 0px;
    margin: 0;
  }
  /*子菜单*/
  .${config.wrapperClassName} .${config.panelClassName}{ 
    position: absolute;
  }
  
  .${config.wrapperClassName} li {
    position: relative;
    padding: 0 30px 0 30px;
    list-style: none;
    height: var(--li-height);
    line-height: var(--li-height);
    font-size: 12px;
    display: flex;
    justify-content: space-between;
  }
  .${config.wrapperClassName} li.divide{
    margin: ${config.menuItemDivideLineMargin}px 1px;
    height: 1px;
    background-color: var(--border-color);
  }
  .${config.wrapperClassName} li.disabled{
    color: var(--disabled-color);
    pointer-events: none;
  }
  .${config.wrapperClassName} li .menu-item-icon{
    width: 16px;
    height: 16px;
    position: absolute;
    left: 7px; 
    top: calc(calc(var(--li-height) - 16px) / 2);
  }
  .${config.wrapperClassName} li .menu-item-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .${config.wrapperClassName} li .menu-item-tip {
    color: var(--tip-color);
  }
  .${config.wrapperClassName} li:hover:not(.divide):not(.disabled),
  .${config.wrapperClassName} li.${config.wrapperClassName}_hover {
    background: var(--item-background--hover);
  }
  .${config.wrapperClassName} li .right-arrow {
    position: absolute;
    right: 8px; top: 9px;
    border-top: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-left: 4px solid;
  }
  `;
