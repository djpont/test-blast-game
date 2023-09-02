import { MVCController } from '/shared/mvc';
import { BlockModel, BlockView } from './index';

export class BlockController extends MVCController<BlockModel, BlockView> {
  constructor(model: BlockModel, view: BlockView) {
    super(model, view);
  }

  get recreate() {
    return this._model.recreate;
  }

  get zoomingOut() {
    return {
      do: this._model.zoomingOut,
      check: () => this._model.props.alpha > 0,
    };
  }

  get falling() {
    return {
      do: this._model.falling,
      set: this._model.setFallPosition,
      check: () => this._view.isFalling(this._model),
    };
  }
}
