import { MVCView } from '/mvc';
import { BLOCKACTIONS } from '/shared/enums';
import { Sprite } from 'pixi.js';
import { GAME } from '/shared/constants';
import { Textures } from '/utils/textures';
import { BlockModel } from './index';

const createBlockSprite = (): Sprite => {
  const sprite = new Sprite();
  const size = GAME.block.size;
  const headHeight = GAME.block.size * GAME.block.head;
  const fullHeight = GAME.block.size + headHeight;
  sprite.width = size;
  sprite.height = fullHeight;
  sprite.position.y = headHeight;
  sprite.position.x = 0;
  return sprite;
};

export class BlockView extends MVCView<BlockModel> {
  private readonly _sprite: Sprite;

  constructor(model: BlockModel) {
    const sprite = createBlockSprite();
    super(model, sprite);
    this._sprite = sprite;
    const pivotX = sprite.width * GAME.block.pivot.x;
    const pivotY = sprite.height * GAME.block.pivot.y;
    this._container.pivot.set(pivotX, pivotY);
    this._container.sortableChildren = true;
    model._blockEventBus.on(BLOCKACTIONS.spriteUpdated, this.updateSprite);
    model._blockEventBus.on(BLOCKACTIONS.fieldPositionUpdated, this.updateZIndex);
    this.updateZIndex(model);
    this.updateSprite(model);
  }

  private updateZIndex = (model: BlockModel): void => {
    this._container.zIndex = -model.blockProps.fieldPosition.y;
  };

  private updateSprite = (model: BlockModel): void => {
    this._sprite.texture = Textures.cached.blocks[model.blockProps.color];
  };
}
