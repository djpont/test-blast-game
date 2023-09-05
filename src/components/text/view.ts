import { MVCView } from '/classes/mvc';
import { GAME, MVCACTIONS } from '/shared/constants';
import { Text } from 'pixi.js';
import { TextModel } from './model';

export class TextView extends MVCView<TextModel> {
  private readonly _text: Text;

  constructor(model: TextModel) {
    const text = new Text(model.text, GAME.textStyle);
    text.anchor.set(0.5, 0.5);
    super(model, text);

    this._text = text;
    model.mvcEventBus.on(MVCACTIONS.valueUpdated, this.valueUpdated);
  }

  private valueUpdated = (model: TextModel) => {
    this._text.text = model.text;
  };
}
