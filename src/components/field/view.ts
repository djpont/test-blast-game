import { MVCView } from '/classes/mvc';
import { LAYOUT } from '/shared/layout';
import { Placer } from '/shared/placer';
import { Textures } from '/shared/textures';
import { Container, Sprite } from 'pixi.js';
import { MVCACTIONS } from '/shared/constants';
import { FieldModel } from './model';

export class FieldView extends MVCView<FieldModel> {
  private _blocksContainer: Container;

  constructor(model: FieldModel) {
    const container = new Sprite(Textures.cached.textures.field);
    Placer.addMask(container);

    super(model, container);
    const blocksContainer = new Container();
    this._blocksContainer = blocksContainer;
    model.blocks.forEach(block => block.controller.addToContainer(blocksContainer));

    const scale = Placer.locateInsideAndScale(blocksContainer, container, LAYOUT.field.padding);
    blocksContainer.position.y = container.height - blocksContainer.height - LAYOUT.field.padding;

    model.updateNewBlockPositionY(blocksContainer.position.y * scale);

    model.mvcEventBus.on(MVCACTIONS.valueUpdated, this.sort);
    model.mvcEventBus.emit(MVCACTIONS.valueUpdated);
  }

  private sort = () => {
    this._blocksContainer.sortChildren();
  };
}
