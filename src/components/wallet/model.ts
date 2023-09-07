import { MVCModel } from '/classes/mvc';
import { MVCACTIONS } from '/shared/enums';
import { type TCallback } from '/shared/types';

export class WalletModel extends MVCModel {
  private _value: number;
  private _plusCallback: TCallback;

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

  public get plusCallback() {
    return this._plusCallback;
  }

  public changePlusCallback = (callback: TCallback): void => {
    this._plusCallback = callback;
    this.mvcEventBus.emit(MVCACTIONS.callbackUpdated, this);
  };
}
