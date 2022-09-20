import MenuItemOption from './MenuItemOption';
export default interface MenuOption<Payload> {
    width?: number;
    items?: MenuItemOption<Payload>[];
}
