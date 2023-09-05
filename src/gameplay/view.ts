import { MVCView } from '/classes/mvc';
import { GAMEACTIONS } from '/shared/constants';
import { GameplayModel } from './model';

export class GameplayView extends MVCView<GameplayModel> {
  constructor(model: GameplayModel) {
    super(model);
    model.gameEventBus.on(GAMEACTIONS.scoreUpdated, this.scoreUpdated);
    model.gameEventBus.on(GAMEACTIONS.turnUpdated, this.turnUpdated);
    model.gameEventBus.on(GAMEACTIONS.walletUpdated, this.walletUpdated);
    this.updateAll(model);
  }

  private updateAll = (model: GameplayModel): void => {
    this.scoreUpdated(model);
    this.turnUpdated(model);
    this.walletUpdated(model);
  };

  private scoreUpdated = (model: GameplayModel): void => {
    const percent = model.gameProps.score / model.gameProps.goal;
    model.content.progressBar.controller.changeValue(percent);
    model.content.panel.controller.changeScore(model.gameProps.score);
  };

  private turnUpdated = (model: GameplayModel): void => {
    model.content.panel.controller.changeMoves(model.gameProps.steps);
  };

  private walletUpdated = (model: GameplayModel): void => {
    model.content.wallet.controller.changeValue(model.gameProps.coins);
  };
}
