import { Container } from 'pixi.js';
import { GAME } from '/shared/constants';
import { FieldModel } from './model';
import { FieldView } from './view';
import { FieldController } from './controller';

export { FieldModel, FieldView, FieldController };

export class Field {
  private readonly _model: FieldModel;
  private readonly _view: FieldView;
  private readonly _controller: FieldController;

  constructor(stage: Container) {
    this._model = new FieldModel(GAME.field.width, GAME.field.height);
    this._view = new FieldView(this._model, stage);
    this._controller = new FieldController(this._model, this._view);
  }

  public get model() {
    const { map, size, blocks, getRectNeighbours, getSameNeighbours, getLineNeighbours } =
      this._model;
    return {
      map,
      size,
      blocks,
      getNeighbours: {
        rect: getRectNeighbours,
        same: getSameNeighbours,
        line: getLineNeighbours,
      },
    };
  }

  public get controller(): FieldController {
    return this._controller;
  }
}
