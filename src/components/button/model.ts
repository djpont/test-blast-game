import { UIACTIONS } from '/shared/constants';
import { MVCModel } from '/shared/mvc';

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
    this.eventBus.emit(UIACTIONS.valueUpdated, this);
  }

  public get width() {
    return this._width;
  }

  public set width(value: number) {
    this._width = value;
    this.eventBus.emit(UIACTIONS.valueUpdated, this);
  }
}
