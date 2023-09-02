import { MVCView } from '/shared/mvc';
import { Container, Graphics } from 'pixi.js';
import { GAME, UIACTIONS } from '/shared/constants';
import { FieldModel } from './model';

const createBorder = (): Graphics => {
  const border = new Graphics();
  border.lineStyle(2, '#000000');
  border.drawRect(
    0,
    0,
    GAME.field.width * GAME.block.size,
    GAME.field.height * GAME.block.size + GAME.block.head * GAME.block.size,
  );
  border.endFill();
  return border;
};

const create = {
  container(mask: Graphics | undefined = undefined): Container {
    const container = new Container();
    if (mask) {
      container.mask = mask;
      container.addChild(mask);
    }
    container.addChild(createBorder());
    return container;
  },
  mask(): Graphics {
    const mask = new Graphics();
    mask.beginFill(0xffffff);
    mask.drawRect(
      0,
      0,
      GAME.field.width * GAME.block.size,
      GAME.field.height * GAME.block.size + GAME.block.head * GAME.block.size,
    );
    mask.endFill();
    return mask;
  },
};

export class FieldView extends MVCView<FieldModel> {
  constructor(model: FieldModel) {
    const mask = create.mask();
    super(model, mask);
    this._container.mask = mask;
    model.blocks.forEach(block => block.controller.addToContainer(this._container));
    model.eventBus.on(UIACTIONS.valueUpdated, this.sort);
    model.eventBus.emit(UIACTIONS.valueUpdated);
  }

  private sort = () => {
    this._container.sortChildren();
  };
}
