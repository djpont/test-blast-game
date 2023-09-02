import { MVCView } from '/shared/mvc';
import { Sprite } from 'pixi.js';
import { BLOCKACTIONS, GAME } from '/shared/constants';
import { Textures } from '/shared/textures';
import { BlockModel } from './index';

const calculatePosition = (value: number) => {
  return value * GAME.block.size + GAME.block.size / 2;
};

const create = {
  sprite(): Sprite {
    const sprite = new Sprite();
    const size = GAME.block.size;
    const headHeight = GAME.block.size * GAME.block.head;
    const fullHeight = GAME.block.size + headHeight;
    sprite.width = size;
    sprite.height = fullHeight;
    sprite.position.y = headHeight;
    sprite.position.x = 0;
    return sprite;
  },
};

export class BlockView extends MVCView<BlockModel> {
  private readonly _sprite: Sprite;

  constructor(model: BlockModel) {
    const sprite = create.sprite();
    super(model, sprite);
    this._sprite = sprite;
    const pivotX = sprite.width * GAME.block.pivot.x;
    const pivotY = sprite.height * GAME.block.pivot.y + GAME.block.size * GAME.block.head;
    this._container.pivot.set(pivotX, pivotY);
    this._container.sortableChildren = true;
    this._container.eventMode = 'static';
    model.gameplayBus.on(BLOCKACTIONS.updated, this.update);
    model.gameplayBus.on(BLOCKACTIONS.recreated, this.recreate);
    model.gameplayBus.on(BLOCKACTIONS.falling, this.falling);
    model.gameplayBus.emit(BLOCKACTIONS.recreated, model);
  }

  private update = (model: BlockModel) => {
    this._container.scale.x = model.props.scale;
    this._container.scale.y = model.props.scale;
    this._container.alpha = model.props.alpha;
    this._container.zIndex = -model.props.position.y;
  };

  private recreate = (model: BlockModel) => {
    this._sprite.texture = Textures.cached.blocks[model.props.color];
    this._container.position.x = calculatePosition(model.props.position.x);
    let y = calculatePosition(model.props.position.y);
    if (model.props.position.y < 0) y -= GAME.block.newGap * GAME.block.size;
    this._container.position.y = y;
    this.update(model);
  };

  public falling = (model: BlockModel, delta: number): void => {
    const diffY = GAME.block.size * GAME.animationSpeed.fall * delta;
    const currentY = this._container.position.y + diffY;
    const finalY = calculatePosition(model.props.position.y);
    const distance = finalY - currentY;
    if (distance > diffY) {
      this._container.position.y = currentY;
    } else {
      this._container.position.y = finalY;
    }
  };

  public isFalling = (model: BlockModel): boolean => {
    return this._container.position.y < calculatePosition(model.props.position.y);
  };
}
