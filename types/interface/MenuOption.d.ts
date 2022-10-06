import { Text } from './common';
import MenuItemOption from './MenuItemOption';
export default interface MenuOption<Payload> {
    width?: number;
    class?: Text<Payload>;
    items?: MenuItemOption<Payload>[];
}
