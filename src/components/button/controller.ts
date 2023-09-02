import { MVCController } from '/classes/mvc';
import { ButtonModel } from './model';
import { ButtonView } from './view';

export class ButtonController extends MVCController<ButtonModel, ButtonView> {
  constructor(model: ButtonModel, view: ButtonView) {
    super(model, view);
  }

  public get changeText() {
    return (value: string) => {
      this._model.text = value;
    };
  }
}
