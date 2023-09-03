import { Block } from '/components/block';
import { Field } from '/components/field';
import { GAME, WEAPONS } from '/shared/constants';
import { TPosition } from '/shared/types';
import { Utils } from '/shared/utils';

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

    const clickPosition = block.blockProps.fieldPosition;

    switch (this._weapon) {
      case WEAPONS.simple:
        blocks = this._field.neighbours.same(clickPosition);
        checkBlocksLength(GAME.minimumHit);
        break;
      case WEAPONS.bomb:
        // blocks = this._field.neighbours.rect(block);
        break;
      case WEAPONS.horizontal:
        // blocks = this._field.neighbours.line(block, 'horizontal');
        break;
      case WEAPONS.vertical:
        // blocks = this._field.neighbours.line(block, 'vertical');
        break;
    }

    if (blocks.length) return this.disappearBlocks(blocks, clickPosition);
  };

  private disappearBlocks = async (blocks: Block[], clickPosition: TPosition) => {
    let blockToBeDisappear = blocks.length;

    return new Promise(resolve => {
      const fullDisappeared = (blocks: Block[]) => {
        return async () => {
          blockToBeDisappear--;
          if (!blockToBeDisappear) {
            this.recreateBlocks(blocks);
            resolve(true);
          }
        };
      };

      const middleDisappeared = () => {
        this._field.controller.fallBlocks(true);
      };

      blocks.forEach(async block => {
        const distance = Utils.distance(block.blockProps.fieldPosition, clickPosition, true);
        const delay = distance * GAME.animationSpeed.disappearDelay;
        setTimeout(() => {
          block.controller.disappear(
            GAME.animationSpeed.disappear,
            fullDisappeared(blocks),
            middleDisappeared,
          );
        }, delay);
      });
    });
  };

  private recreateBlocks = (blocks: Block[]) => {
    this._field.controller.recreateBlocks(blocks);
    this._field.controller.fallBlocks(false);
  };

  /*

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
        // const blocksWillFalling = this._field.controller.fallBlocks();
        // const callback = callbackGenerator(resolve, blocksWillFalling);
        // blocksWillFalling.forEach(block =>
        //   Animations.blocks.add(block, ANIMATIONS.falling, callback),
        // );
      });
    };

   */
}
