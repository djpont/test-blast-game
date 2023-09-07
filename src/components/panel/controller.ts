import { MVCController } from '/mvc';
import { PanelModel } from './model';
import { PanelView } from './view';

export class PanelController extends MVCController<PanelModel, PanelView> {
  constructor(model: PanelModel, view: PanelView) {
    super(model, view);
  }

  public get changeScore() {
    return (value: number) => {
      this._model.score = value;
    };
  }

  public get changeGoal() {
    return (value: number) => {
      this._model.goal = value;
    };
  }

  public get changeMoves() {
    return (value: number) => {
      this._model.moves = value;
    };
  }
}
