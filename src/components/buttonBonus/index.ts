import { MVCComponent } from '/classes/mvc';
import { ButtonBonusController } from './controller';
import { ButtonBonusModel } from './model';
import { ButtonBonusView } from './view';

export class ButtonBonus extends MVCComponent<
  ButtonBonusModel,
  ButtonBonusView,
  ButtonBonusController
> {
  constructor(price: number, title: string) {
    const model = new ButtonBonusModel(price, title);
    const view = new ButtonBonusView(model);
    const controller = new ButtonBonusController(model, view);
    super(model, view, controller);
  }
}
