import { MVCComponent } from '/classes/mvc';
import { ButtonWeaponController } from './controller';
import { ButtonWeaponModel } from './model';
import { ButtonWeaponView } from './view';

export class ButtonWeapon extends MVCComponent<
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
