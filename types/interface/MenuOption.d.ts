import { BaseAttr } from './common';
import MenuItemOption from './MenuItemOption';
export default interface MenuOption<Payload> {
    width?: number;
    class?: BaseAttr<string, Payload>;
    items?: MenuItemOption<Payload>[];
}
