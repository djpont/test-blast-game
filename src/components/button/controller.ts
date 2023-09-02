import { UIController } from '/components/abstract';
import { ButtonModel } from './model';
import { ButtonView } from './view';

export class ButtonController extends UIController<ButtonModel, ButtonView> {
  constructor(model: ButtonModel, view: ButtonView) {
    super(model, view);
  }

  public get changeText() {
    return (value: string) => {
      this._model.text = value;
    };
  }
}
