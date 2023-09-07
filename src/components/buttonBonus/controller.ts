import { MVCController } from '/mvc';
import { ButtonBonusModel } from './model';
import { ButtonBonusView } from './view';

export class ButtonBonusController extends MVCController<ButtonBonusModel, ButtonBonusView> {
  constructor(model: ButtonBonusModel, view: ButtonBonusView) {
    super(model, view);
  }

  public get changePrice() {
    return (value: number) => {
      this._model.price = value;
    };
  }
}
