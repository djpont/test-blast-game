import { MVCComponent } from '/classes/mvc';
import { ButtonPauseModel } from './model';
import { ButtonPauseView } from './view';
import { ButtonPauseController } from './controller';

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
