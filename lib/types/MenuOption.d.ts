import { PanelOption } from '@/Panel';
import { BaseAttr } from './common';
import MenuItemOption from './MenuItemOption';
export default interface MenuOption<Payload> extends PanelOption {
    class?: BaseAttr<string, Payload>;
    items?: MenuItemOption<Payload>[];
}
