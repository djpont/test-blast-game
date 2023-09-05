import { MVCView } from '/classes/mvc';
import { GameplayModel } from './model';

export class GameplayView extends MVCView<GameplayModel> {
  constructor(model: GameplayModel) {
    // console.log('GameplayModel constructor');
    super(model);
  }
}
