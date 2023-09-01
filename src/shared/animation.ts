import { Block } from '/components/block';
import { ANIMATIONS } from '/shared/constants';

type TCallback = (block: Block) => void | null;
type TAnimatedBlock = {
  block: Block;
  animation: ANIMATIONS;
  callback: TCallback;
};

const animated = {
  blocks: [] as TAnimatedBlock[],
};

const animatedBlocks = {
  add: (block: Block, animation: ANIMATIONS, callback: TCallback = null) => {
    const already = animated.blocks.filter(a => a.block === block).length !== 0;
    if (!already) animated.blocks.push({ block, animation, callback });
  },
  delete: (block: Block, animation: ANIMATIONS) => {
    animated.blocks = animated.blocks.filter(a => a.block !== block || a.animation !== animation);
  },
  clear: () => {
    animated.blocks = [];
  },
};

const play = (delta: number) => {
  animated.blocks.forEach(({ block, animation, callback }) => {
    switch (animation) {
      case ANIMATIONS.disappearing:
        block.controller.zoomingOut.do(delta);
        if (!block.controller.zoomingOut.check()) {
          animatedBlocks.delete(block, animation);
          callback?.(block);
        }
        break;
      case ANIMATIONS.falling:
        block.controller.falling.do(delta);
        if (!block.controller.falling.check()) {
          animatedBlocks.delete(block, animation);
          callback?.(block);
        }
        break;
    }
  });
};

export const Animations = {
  blocks: animatedBlocks,
  play,
} as const;
