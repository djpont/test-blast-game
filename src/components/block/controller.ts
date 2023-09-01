import { BlockModel, BlockView } from './index';

export class BlockController {
  private readonly _model: BlockModel;
  private readonly _view: BlockView;

  constructor(model: BlockModel, view: BlockView) {
    this._model = model;
    this._view = view;
  }

  get addToContainer() {
    return this._view.addToContainer;
  }

  get registerPixiEvent() {
    return this._view.registerPixiEvent;
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
