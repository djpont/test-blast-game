import { MVCController } from '/classes/mvc';
import { TextModel } from './model';
import { TextView } from './view';

export class TextController extends MVCController<TextModel, TextView> {
  constructor(model: TextModel, view: TextView) {
    super(model, view);
  }

  public get changeText() {
    return (value: string) => {
      this._model.text = value;
    };
  }
}
