import { UIACTIONS } from '/shared/constants';
import { UIModel } from '/components/abstract';

export class ButtonWeaponModel extends UIModel {
  private _price: number;
  private _title: string;

  constructor(price: number, title: string) {
    super();
    this._price = price;
    this._title = title;
  }

  public get price() {
    return this._price;
  }

  public set price(value: number) {
    this._price = value;
    this.eventBus.emit(UIACTIONS.valueUpdated, this);
  }

  public get title() {
    return this._title;
  }
}