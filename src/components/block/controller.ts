import { MVCController } from '/classes/mvc';
import { BlockModel, BlockView } from './index';

export class BlockController extends MVCController<BlockModel, BlockView> {
  constructor(model: BlockModel, view: BlockView) {
    super(model, view);
  }

  get recreate() {
    return this._model.recreate;
  }

  get changeFieldPosition() {
    return this._model.changeFieldPosition;
  }

  get disappear() {
    return this._model.disappear;
  }
}
