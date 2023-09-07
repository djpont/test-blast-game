import { MVCModel } from '/classes/mvc';
import { MVCACTIONS } from '/shared/constants';
import { type TCallback } from '/shared/types';

export class WalletModel extends MVCModel {
  private _value: number;
  private _callback: TCallback;

  constructor() {
    super();
    this._value = 0;
  }

  public get value() {
    return this._value;
  }

  public set value(value: number) {
    this._value = value;
    this.mvcEventBus.emit(MVCACTIONS.valueUpdated, this);
  }

  public get callback() {
    return this._callback;
  }

  public changeCallback = (callback: TCallback): void => {
    this._callback = callback;
    this.mvcEventBus.emit(MVCACTIONS.callbackUpdated, this);
  };
}
