import { Container, DisplayObjectEvents, Sprite } from 'pixi.js';
import { BLOCKACTIONS, GAME } from '/shared/constants';
import { BlastTextures } from '/shared/textures';
import { BlockModel } from './index';

const calculatePosition = (value: number) => {
  return value * GAME.block.size + GAME.block.size / 2;
};

export class BlockView {
  private readonly _container: Container;
  private readonly _sprite: Sprite;

  constructor(model: BlockModel) {
    this._sprite = this.create.sprite();
    this._container = this.create.container(this._sprite);
    model.eventBus.on(BLOCKACTIONS.updated, this.update);
    model.eventBus.on(BLOCKACTIONS.recreated, this.recreate);
    model.eventBus.on(BLOCKACTIONS.falling, this.falling);
    model.eventBus.emit(BLOCKACTIONS.recreated, model);
  }

  private create = {
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
    container(sprite: Sprite): Container {
      const container = new Container();
      const size = GAME.block.size;
      const headHeight = GAME.block.size * GAME.block.head;
      container.width = size;
      container.height = size;
      container.addChild(sprite);
      const pivotX = size * GAME.block.pivot.x;
      const pivotY = size * GAME.block.pivot.y + headHeight;
      container.pivot.set(pivotX, pivotY);
      container.sortableChildren = true;
      container.eventMode = 'static';
      return container;
    },
  };

  public addToContainer = (container: Container): void => {
    container.addChild(this._container);
  };

  public registerPixiEvent = (event: keyof DisplayObjectEvents, callback: () => void): void => {
    this._container.on(event, callback);
  };

  private update = (model: BlockModel) => {
    this._container.scale.x = model.props.scale;
    this._container.scale.y = model.props.scale;
    this._container.alpha = model.props.alpha;
    this._container.zIndex = -model.props.position.y;
  };

  private recreate = (model: BlockModel) => {
    this._sprite.texture = BlastTextures.cached.blocks[model.props.color];
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
