import { MVCController } from '/classes/mvc';
// import { Block } from '/components/block';
// import { GAME, WEAPONS } from '/shared/constants';
// import { TPosition } from '/shared/types';
// import { Utils } from '/shared/utils';
import { GameplayModel } from './model';
import { GameplayView } from './view';

export class GameplayController extends MVCController<GameplayModel, GameplayView> {
  private _playerMayClick: boolean;

  constructor(model: GameplayModel, view: GameplayView) {
    // console.log('GameplayController constructor');
    super(model, view);
    this._playerMayClick = true;
    // field.controller.registerBlocksEvent(this.clickOnBlock);
  }

  /*
    private clickOnBlock = async (block: Block) => {
      if (this._playerMayClick) {
        console.log('playerMayClick = false');
        this._playerMayClick = false;
        await this.hitBlocks(block);
        this._playerMayClick = true;
        console.log('playerMayClick = true');
      }
    };

    private hitBlocks = async (block: Block) => {
      let blocks: Block[] = [];

      const checkBlocksLength = (minimum: number): void => {
        if (blocks.length < minimum) {
          blocks = [];
        }
      };

      const clickPosition = block.blockProps.fieldPosition;

      switch (this._model.gameProps.weapon) {
        case WEAPONS.simple:
          // blocks = this._field.neighbours.same(clickPosition);
          // checkBlocksLength(GAME.minimumHit);
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
          // this._field.controller.fallBlocks(true);
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
      // this._field.controller.recreateBlocks(blocks);
      // this._field.controller.fallBlocks(false);
    };

   */
}
