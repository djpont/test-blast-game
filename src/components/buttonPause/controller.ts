import { UIController } from '/components/abstract';
import { ButtonPauseModel } from './model';
import { ButtonPauseView } from './view';

export class ButtonPauseController extends UIController<ButtonPauseModel, ButtonPauseView> {
  constructor(model: ButtonPauseModel, view: ButtonPauseView) {
    super(model, view);
  }
}
