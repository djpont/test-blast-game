import { MVCView } from '/classes/mvc';
import { Placer } from '/shared/placer';
import { Textures } from '/shared/textures';
import { Container, Graphics, Sprite } from 'pixi.js';
import { GAME, UIACTIONS } from '/shared/constants';
import { FieldModel } from './model';

const create = {
  mask(container: Container): void {
    const mask = new Graphics();
    mask.beginFill(0xffffff);
    mask.drawRect(0, 0, container.width, container.height);
    mask.endFill();
    container.addChild(mask);
    container.mask = mask;
  },
};

export class FieldView extends MVCView<FieldModel> {
  private _blocksContainer: Container;

  constructor(model: FieldModel) {
    const container = new Sprite(Textures.cached.textures.field);
    create.mask(container);

    super(model, container);
    const blocksContainer = new Container();
    this._blocksContainer = blocksContainer;
    model.blocks.forEach(block => block.controller.addToContainer(blocksContainer));

    Placer.locateInsideAndScale(blocksContainer, container);

    const newGap =
      (blocksContainer.position.y / GAME.block.size + GAME.block.head) / blocksContainer.scale.y;
    GAME.setNewGap(newGap);

    model.eventBus.on(UIACTIONS.valueUpdated, this.sort);
    model.eventBus.emit(UIACTIONS.valueUpdated);
  }

  private sort = () => {
    this._blocksContainer.sortChildren();
  };
}
