import { TCallback } from '/shared/types';
import { MVCController } from '/shared/mvc';
import { WalletModel } from './model';
import { WalletView } from './view';

export class WalletController extends MVCController<WalletModel, WalletView> {
  constructor(model: WalletModel, view: WalletView) {
    super(model, view);
  }

  public get changeValue() {
    return (value: number) => {
      this._model.value = value;
    };
  }

  public get changeCallback() {
    return (callback: TCallback) => {
      this._model.callback = callback;
    };
  }
}
