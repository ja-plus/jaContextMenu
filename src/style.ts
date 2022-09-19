import config from './config';

export const panelStyle = `
  .${config.panelClassName}, .${config.panelClassName} * {
    box-sizing: border-box;
  }
  .${config.panelClassName}{
    border: 1px solid #ddd;
    left: 0;top:0;
    background-color: #fff;
    display: none;
    width: ${config.defaultMenuWidth}px;
    position:absolute;
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
    margin: ${config.menuItemDivideLineMargin}px 0;
    height: 1px;
    background-color: #ddd;
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
    color: #aaa;
    pointer-events: none;
  }
  .${config.wrapperClassName} li span.label {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .${config.wrapperClassName} li span.tip{
    color:#aaa;
    font-size: 12px;
  }
  .${config.wrapperClassName} li:hover:not(.divide):not(.disabled),
  .${config.wrapperClassName} li.${config.wrapperClassName}_hover{
    background-color: #eee;
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
