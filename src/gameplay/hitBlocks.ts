import { Block, Field } from '/components';
import { GAME, WEAPONS } from '/shared/constants';
import { TCallback, TPosition } from '/shared/types';
import { Utils } from '/shared/utils';

export const hitBlocks = async (
  weapon: WEAPONS,
  block: Block,
  field: Field,
  addOneScore: TCallback,
  completeTurn: TCallback,
) => {
  let blocks: Block[] = [];

  const disappearBlocks = async (blocks: Block[], clickPosition: TPosition) => {
    let blockToBeDisappear = blocks.length;

    return new Promise(resolve => {
      const fullDisappeared = (blocks: Block[]) => {
        return async () => {
          blockToBeDisappear--;
          if (!blockToBeDisappear) {
            recreateBlocks(blocks);
            resolve(true);
          }
        };
      };

      const middleDisappeared = () => {
        field.controller.fallBlocks(true);
      };

      blocks.forEach(async block => {
        const distance = Utils.distance(block.blockProps.fieldPosition, clickPosition, true);
        const delay = distance * GAME.animationSpeed.disappearDelay;
        setTimeout(() => {
          addOneScore();
          block.controller.disappear(
            GAME.animationSpeed.disappear,
            fullDisappeared(blocks),
            middleDisappeared,
          );
        }, delay);
      });
    });
  };

  const recreateBlocks = (blocks: Block[]) => {
    field.controller.recreateBlocks(blocks);
    field.controller.fallBlocks(false);
  };

  const checkBlocksLength = (minimum: number): void => {
    if (blocks.length < minimum) {
      blocks = [];
    }
  };

  const clickPosition = block.blockProps.fieldPosition;

  switch (weapon) {
    case WEAPONS.simple:
      blocks = field.neighbours.same(clickPosition);
      checkBlocksLength(GAME.minimumHit);
      break;
    case WEAPONS.bomb:
      blocks = field.neighbours.rect(block);
      break;
    case WEAPONS.horizontal:
      blocks = field.neighbours.line(block, 'horizontal');
      break;
    case WEAPONS.vertical:
      blocks = field.neighbours.line(block, 'vertical');
      break;
  }
  if (blocks.length) {
    completeTurn();
    return disappearBlocks(blocks, clickPosition);
  }
};
