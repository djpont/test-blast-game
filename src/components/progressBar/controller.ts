import { UIController } from '/components/abstract';
import { ProgressBarModel } from './model';
import { ProgressBarView } from './view';

export class ProgressBarController extends UIController<ProgressBarModel, ProgressBarView> {
  constructor(model: ProgressBarModel, view: ProgressBarView) {
    super(model, view);
  }

  public get changeValue() {
    return (value: number) => {
      this._model.value = value;
    };
  }
}
