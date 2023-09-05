import { MVCModel } from '/classes/mvc';
import { MVCACTIONS } from '/shared/constants';

export class TextModel extends MVCModel {
  private _text: string;

  constructor(text: string) {
    super();
    this._text = text;
  }

  public get text() {
    return this._text;
  }

  public set text(value: string) {
    this._text = value;
    this.mvcEventBus.emit(MVCACTIONS.valueUpdated, this);
  }
}
