import { MVCModel } from '/classes/mvc';
import { MVCACTIONS } from '/shared/enums';

export class ButtonModel extends MVCModel {
  private _text: string;
  private _width: number;

  constructor(text: string, width: number) {
    super();
    this._text = text;
    this._width = width;
  }

  public get text() {
    return this._text;
  }

  public set text(value: string) {
    this._text = value;
    this.mvcEventBus.emit(MVCACTIONS.valueUpdated, this);
  }

  public get width() {
    return this._width;
  }

  public set width(value: number) {
    this._width = value;
    this.mvcEventBus.emit(MVCACTIONS.valueUpdated, this);
  }
}
