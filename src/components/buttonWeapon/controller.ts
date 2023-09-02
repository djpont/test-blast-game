import { MVCController } from '/classes/mvc';
import { ButtonWeaponModel } from './model';
import { ButtonWeaponView } from './view';

export class ButtonWeaponController extends MVCController<ButtonWeaponModel, ButtonWeaponView> {
  constructor(model: ButtonWeaponModel, view: ButtonWeaponView) {
    super(model, view);
  }

  public get changePrice() {
    return (value: number) => {
      this._model.price = value;
    };
  }
}
