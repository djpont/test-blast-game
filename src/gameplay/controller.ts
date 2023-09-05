import { MVCController } from '/classes/mvc';
import { Block } from '/components';
import { GAME } from '/shared/constants';
import { GameplayModel } from './model';
import { GameplayView } from './view';
import { hitBlocks } from './hitBlocks';

export class GameplayController extends MVCController<GameplayModel, GameplayView> {
  private _playerCanClickOnBlock: boolean;

  constructor(model: GameplayModel, view: GameplayView) {
    super(model, view);
    this._playerCanClickOnBlock = true;
    model.content.field.controller.registerBlocksEvent(this.clickOnBlock);
    model.content.wallet.controller.changeCallback(() => model.addMoney(5));
    model.content.buttonBonusBomb.controller.registerPixiEvent(
      GAME.pointerEvent,
      model.buyBonus.bomb,
    );
    model.content.buttonBonusHorizontal.controller.registerPixiEvent(
      GAME.pointerEvent,
      model.buyBonus.horizontal,
    );
    model.content.buttonBonusVertical.controller.registerPixiEvent(
      GAME.pointerEvent,
      model.buyBonus.vertical,
    );
    model.content.buttonBonusShuffle.controller.registerPixiEvent(
      GAME.pointerEvent,
      model.buyBonus.shuffle,
    );
  }

  private clickOnBlock = async (block: Block) => {
    if (this._playerCanClickOnBlock) {
      this._playerCanClickOnBlock = false;
      await hitBlocks(
        this._model.gameProps.weapon,
        block,
        this._model.gameProps.minimumHit,
        this._model.content.field,
        this._model.addOneScore,
        this._model.turnComplete,
      );
      this._playerCanClickOnBlock = true;
    }
  };
}
