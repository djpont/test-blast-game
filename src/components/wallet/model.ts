import { MVCModel } from '/classes/mvc';
import { MVCACTIONS } from '/shared/constants';

export class WalletModel extends MVCModel {
  private _value: number;

  constructor(money: number) {
    super();
    this._value = money;
  }

  public get value() {
    return this._value;
  }

  public set value(value: number) {
    this._value = value;
    this.mvcEventBus.emit(MVCACTIONS.valueUpdated, this);
  }
}
