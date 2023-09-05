import { MVCComponent } from '/classes/mvc';
import { ButtonModel } from './model';
import { ButtonView } from './view';
import { ButtonController } from './controller';

type TColors = 'pink' | 'purple';

export class Button extends MVCComponent<ButtonModel, ButtonView, ButtonController> {
  constructor(text: string, color: TColors = 'pink', width: number = 100) {
    const model = new ButtonModel(text, width);
    const view = new ButtonView(model, color);
    const controller = new ButtonController(model, view);
    super(model, view, controller);
  }
}
