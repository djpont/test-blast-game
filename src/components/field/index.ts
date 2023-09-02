import { MVCComponent } from '/shared/mvc';
import { GAME } from '/shared/constants';
import { FieldModel } from './model';
import { FieldView } from './view';
import { FieldController } from './controller';

export class Field extends MVCComponent<FieldModel, FieldView, FieldController> {
  constructor() {
    const model = new FieldModel(GAME.field.width, GAME.field.height);
    const view = new FieldView(model);
    const controller = new FieldController(model, view);
    super(model, view, controller);
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
