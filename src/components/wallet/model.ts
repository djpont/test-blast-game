import { UIACTIONS } from '/shared/constants';
import { TCallback } from '/shared/types';
import { UIModel } from '/components/abstract';

export class WalletModel extends UIModel {
  private _value: number;
  private _callback: TCallback;

  constructor(money: number) {
    super();
    this._value = money;
  }

  public get callback() {
    return this._callback;
  }

  public set callback(callback: TCallback) {
    this._callback = callback;
    this.eventBus.emit(UIACTIONS.callbackUpdated, this);
  }

  public get value() {
    return this._value;
  }

  public set value(value: number) {
    this._value = value;
    this.eventBus.emit(UIACTIONS.valueUpdated, this);
  }
}