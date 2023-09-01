import { Block } from '/components/block';
import { Field } from '/components/field';
import { GameMechanics } from './mechanics';

export class GameController {
  private _mechanics: GameMechanics;
  private _playerMayClick: boolean;

  constructor(field: Field, mechanics: GameMechanics) {
    this._mechanics = mechanics;
    this._playerMayClick = true;
    field.controller.registerBlocksEvent(this.clickOnBlock);
  }

  private clickOnBlock = async (block: Block) => {
    if (this._playerMayClick) {
      this._playerMayClick = false;
      await this._mechanics.clickOnBlock(block);
      this._playerMayClick = true;
    }
  };
}
