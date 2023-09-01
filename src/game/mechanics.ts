import { Block } from '/components/block';
import { Field } from '/components/field';
import { ANIMATIONS, WEAPONS } from '/shared/constants';
import { Animations } from '/shared/animation';
import { PromiseResolver } from '/shared/types';

export class GameMechanics {
  private readonly _field: Field;
  private _weapon: WEAPONS;

  constructor(field: Field) {
    this._field = field;
    this.resetWeapon();
  }

  private resetWeapon = (): void => {
    this._weapon = WEAPONS.simple;
  };

  public clickOnBlock = async (block: Block) => {
    let blocks: Block[] = [];
    switch (this._weapon) {
      case WEAPONS.simple:
        blocks = this._field.model.getNeighbours.same(block);
        break;
      case WEAPONS.bomb:
        blocks = this._field.model.getNeighbours.rect(block);
        break;
      case WEAPONS.horizontal:
        blocks = this._field.model.getNeighbours.line(block, 'horizontal');
        break;
      case WEAPONS.vertical:
        blocks = this._field.model.getNeighbours.line(block, 'vertical');
        break;
    }
    return this.disappearBlocks(blocks);
  };

  private disappearBlocks = async (blocks: Block[]) => {
    const callbackGenerator = (
      resolve: PromiseResolver<boolean>,
      blocksToBeDisappeared: Block[],
    ) => {
      const blocksWithCompletedAnimation: Block[] = [];
      return async (block: Block) => {
        blocksWithCompletedAnimation.push(block);
        if (blocksWithCompletedAnimation.length === blocksToBeDisappeared.length) {
          await this.recreateBlocks(blocksToBeDisappeared);
          resolve(true);
        }
      };
    };

    return new Promise(resolve => {
      const callback = callbackGenerator(resolve, blocks);
      blocks.forEach(block => {
        Animations.blocks.add(block, ANIMATIONS.disappearing, callback);
      });
    });
  };

  private recreateBlocks = async (blocks: Block[]) => {
    const callbackGenerator = (resolve: PromiseResolver<boolean>, blocksToBeFalling: Block[]) => {
      const blocksWithCompletedAnimation: Block[] = [];
      return async (block: Block) => {
        blocksWithCompletedAnimation.push(block);
        if (blocksWithCompletedAnimation.length === blocksToBeFalling.length) {
          resolve(true);
        }
      };
    };

    return new Promise(resolve => {
      this._field.controller.recreateBlocks(blocks);
      const blocksWillFalling = this._field.controller.fallBlocks();
      const callback = callbackGenerator(resolve, blocksWillFalling);
      blocksWillFalling.forEach(block =>
        Animations.blocks.add(block, ANIMATIONS.falling, callback),
      );
    });
  };
}
