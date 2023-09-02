import { Block } from '/components/block';
import { Field } from '/components/field';
import { ANIMATIONS, GAME, WEAPONS } from '/shared/constants';
import { Animations } from '/shared/animation';
import { PromiseResolver, TPosition } from '/shared/types';

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

    const checkBlocksLength = (minimum: number): void => {
      if (blocks.length < minimum) {
        blocks = [];
      }
    };

    switch (this._weapon) {
      case WEAPONS.simple:
        blocks = this._field.model.getNeighbours.same(block);
        checkBlocksLength(GAME.minimumHit);
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

    if (blocks.length) return this.disappearBlocks(blocks, block.props.position);
  };

  private disappearBlocks = async (blocks: Block[], clickPosition: TPosition) => {
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
        const lengthFromClickPosition =
          Math.abs(block.props.position.x - clickPosition.x) +
          Math.abs(block.props.position.y - clickPosition.y);
        const delay = lengthFromClickPosition * GAME.animationSpeed.disappearDelay;
        setTimeout(() => Animations.blocks.add(block, ANIMATIONS.disappearing, callback), delay);
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
