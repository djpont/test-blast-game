import { UIComponent } from '/components/abstract';
import { ButtonWeaponController } from './controller';
import { ButtonWeaponModel } from './model';
import { ButtonWeaponView } from './view';

export class ButtonWeapon extends UIComponent<
  ButtonWeaponModel,
  ButtonWeaponView,
  ButtonWeaponController
> {
  constructor(price: number, title: string) {
    const model = new ButtonWeaponModel(price, title);
    const view = new ButtonWeaponView(model);
    const controller = new ButtonWeaponController(model, view);
    super(model, view, controller);
  }
}
