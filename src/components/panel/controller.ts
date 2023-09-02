import { UIController } from '/components/abstract';
import { PanelModel } from './model';
import { PanelView } from './view';

export class PanelController extends UIController<PanelModel, PanelView> {
  constructor(model: PanelModel, view: PanelView) {
    super(model, view);
  }

  public get changeScore() {
    return (value: number) => {
      this._model.score = value;
    };
  }

  public get changeMovesLeft() {
    return (value: number) => {
      this._model.movesLeft = value;
    };
  }
}
