import { MVCController } from '/classes/mvc';
import { ButtonPauseModel } from './model';
import { ButtonPauseView } from './view';

export class ButtonPauseController extends MVCController<ButtonPauseModel, ButtonPauseView> {
  constructor(model: ButtonPauseModel, view: ButtonPauseView) {
    super(model, view);
  }
}
