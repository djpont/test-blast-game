import { MVCModel } from '/mvc';
import { MVCACTIONS } from '/shared/enums';

export class ProgressBarModel extends MVCModel {
  private _value: number;

  constructor(value: number) {
    super();
    this._value = value;
  }

  public get value() {
    return this._value;
  }

  public set value(value: number) {
    value = value < 0 ? 0 : value > 1 ? 1 : value;
    this._value = value;
    this.mvcEventBus.emit(MVCACTIONS.valueUpdated, this);
  }
}
