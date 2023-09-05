import { MVCView } from '/classes/mvc';
import { GameModel } from './model';

export class GameView extends MVCView<GameModel> {
  constructor(model: GameModel) {
    super(model);
  }
}
