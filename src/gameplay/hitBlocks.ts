import { Block, Field } from '/components';
import { GAME, WEAPONS } from '/shared/constants';
import type { TCallback, TPosition } from '/shared/types';
import { Utils } from '/shared/utils';

export const hitBlocks = async (
  weapon: WEAPONS,
  block: Block,
  minimumHit: number,
  field: Field,
  addOneScore: TCallback,
  completeTurn: TCallback,
  isLooserChecker: TCallback,
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

  const recreateBlocks = async (blocks: Block[]) => {
    await field.controller.recreateBlocks(blocks);
    await field.controller.fallBlocks(false);
    field.controller.checkAvailableTurns(minimumHit);
    isLooserChecker();
  };

  const checkMinimumHit = (): void => {
    if (blocks.length < minimumHit) {
      blocks = [];
    }
  };

  const clickPosition = block.blockProps.fieldPosition;

  switch (weapon) {
    case WEAPONS.simple:
      blocks = field.neighbours.same(clickPosition);
      checkMinimumHit();
      break;
    case WEAPONS.bomb:
      blocks = field.neighbours.rect(clickPosition);
      break;
    case WEAPONS.horizontal:
      blocks = field.neighbours.line(clickPosition, 'horizontal');
      break;
    case WEAPONS.vertical:
      blocks = field.neighbours.line(clickPosition, 'vertical');
      break;
  }
  if (blocks.length) {
    completeTurn();
    return disappearBlocks(blocks, clickPosition);
  }
};
