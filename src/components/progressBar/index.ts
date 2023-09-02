import { MVCComponent } from '/shared/mvc';
import { ProgressBarController } from './controller';
import { ProgressBarModel } from './model';
import { ProgressBarView } from './view';

export class ProgressBar extends MVCComponent<
  ProgressBarModel,
  ProgressBarView,
  ProgressBarController
> {
  constructor(width: number, value: number = 0) {
    const model = new ProgressBarModel(value);
    const view = new ProgressBarView(model, width);
    const controller = new ProgressBarController(model, view);
    super(model, view, controller);
  }
}
