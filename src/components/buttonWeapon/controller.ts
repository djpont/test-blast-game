import { UIController } from '/components/abstract';
import { ButtonWeaponModel } from './model';
import { ButtonWeaponView } from './view';

export class ButtonWeaponController extends UIController<ButtonWeaponModel, ButtonWeaponView> {
  constructor(model: ButtonWeaponModel, view: ButtonWeaponView) {
    super(model, view);
  }

  public get changePrice() {
    return (value: number) => {
      this._model.price = value;
    };
  }
}
