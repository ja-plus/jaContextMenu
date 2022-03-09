import MenuOption from "./MenuOption";

export default interface MenuItemOption{
  label:string;
  tip?:string;
  disabled?:boolean;
  type?: 'divide' | '---';
  onclick?(e:Event,payload:any): void;
  children?:MenuOption;
}