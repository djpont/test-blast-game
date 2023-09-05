import { MVCView } from '/classes/mvc';
import { Text } from '/components';
import { LAYOUT } from '/shared/layout';
import { Placer } from '/shared/placer';
import { Textures } from '/shared/textures';
import { Container, Sprite } from 'pixi.js';
import { MVCACTIONS } from '/shared/constants';
import { FieldModel } from './model';

export class FieldView extends MVCView<FieldModel> {
  private _blocksContainer: Container;
  private _noTurnsText: Container;

  constructor(model: FieldModel) {
    const container = new Sprite(Textures.cached.textures.field);
    Placer.addMask(container);

    super(model, container);
    const blocksContainer = new Container();
    model.blocks.forEach(block => block.controller.addToContainer(blocksContainer));
    this._blocksContainer = blocksContainer;

    const scale = Placer.locateInsideAndScale(blocksContainer, container, LAYOUT.field.padding);
    blocksContainer.position.y = container.height - blocksContainer.height - LAYOUT.field.padding;

    model.updateNewBlockPositionY(blocksContainer.position.y * scale);

    this.initializeNoTurnsText();

    model.mvcEventBus.on(MVCACTIONS.valueUpdated, this.updated);
    this.updated(model);
  }

  private initializeNoTurnsText = (): void => {
    const container = this._container;
    const textContainer = new Container();
    Placer.addMask(textContainer, { width: container.width, height: container.height }, true);
    const text = new Text('Нет доступных ходов');
    text.controller.changeProps.scale(2);
    text.controller.addToContainer(textContainer);
    text.controller.moveTo({ x: container.width / 2, y: container.height / 2 });
    Placer.locateInsideAndScale(textContainer, container);
    this._noTurnsText = textContainer;
  };

  private updated = (model: FieldModel) => {
    this._blocksContainer.sortChildren();
    if (!model.fieldProps.turnsAvailable) {
      this._blocksContainer.alpha = 0.5;
      this._noTurnsText.visible = true;
    } else {
      this._blocksContainer.alpha = 1;
      this._noTurnsText.visible = false;
    }
  };
}
