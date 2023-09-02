import { MVCComponent } from '/shared/mvc';
import { ButtonPauseController } from './controller';
import { ButtonPauseModel } from './model';
import { ButtonPauseView } from './view';

export class ButtonPause extends MVCComponent<
  ButtonPauseModel,
  ButtonPauseView,
  ButtonPauseController
> {
  constructor() {
    const model = new ButtonPauseModel();
    const view = new ButtonPauseView(model);
    const controller = new ButtonPauseController(model, view);
    super(model, view, controller);
  }
}
