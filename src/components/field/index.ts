import { MVCComponent } from '/classes/mvc';
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

  public get fieldProps() {
    return this._model.fieldProps;
  }

  public get neighbours() {
    return this._model.neighbours;
  }

  public get controller(): FieldController {
    return this._controller;
  }
}
