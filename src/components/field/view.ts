import { Container, Graphics } from 'pixi.js';
import { FIELDACTIONS, GAME } from '/shared/constants';
import { FieldModel } from './index';

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

export class FieldView {
  private readonly _container: Container;

  constructor(model: FieldModel, stage: Container) {
    const mask = this.create.mask();
    const container = this.create.container(mask);
    this._container = container;
    stage.addChild(container);
    model.blocks.forEach(block => block.controller.addToContainer(container));
    model.eventBus.on(FIELDACTIONS.updated, this.sort);
    model.eventBus.emit(FIELDACTIONS.updated);
  }

  private create = {
    container(mask: Graphics | undefined = undefined): Container {
      const container = new Container();
      container.position.x = 50;
      container.position.y = 150;
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

  private sort = () => {
    this._container.sortChildren();
  };
}
