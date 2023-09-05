import { MVCController } from '/classes/mvc';
import { GameView } from '/game/view';
import { GameModel } from 'src/game/model';

export class GameController extends MVCController<GameModel, GameView> {
  constructor(model: GameModel, view: GameView) {
    super(model, view);
  }
}
