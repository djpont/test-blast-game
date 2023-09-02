import { UIACTIONS } from '/shared/constants';
import { UIModel } from '/components/abstract';

export class ProgressBarModel extends UIModel {
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
    this.eventBus.emit(UIACTIONS.valueUpdated, this);
  }
}
