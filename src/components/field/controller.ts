import { MVCController } from '/classes/mvc';
import { FieldModel } from './model';
import { FieldView } from './view';

export class FieldController extends MVCController<FieldModel, FieldView> {
  constructor(model: FieldModel, view: FieldView) {
    super(model, view);
  }

  get reset() {
    return this._model.reset;
  }

  get registerBlocksEvent() {
    return this._model.registerBlocksEvent;
  }

  get recreateBlocks() {
    return this._model.recreateBlocks;
  }

  get fallBlocks() {
    return this._model.fallBlocks;
  }

  get checkAvailableTurns() {
    return this._model.checkAvailableTurns;
  }
}
