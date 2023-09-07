import { MVCModel, MVCView } from './index';

export abstract class MVCController<TModel extends MVCModel, TView extends MVCView<TModel>> {
  protected _model: TModel;
  protected _view: TView;

  protected constructor(model: TModel, view: TView) {
    this._model = model;
    this._view = view;
  }

  public get addToContainer() {
    return this._view.addToContainer;
  }

  public get removeFromContainer() {
    return this._view.removeFromContainer;
  }

  public get changeProps() {
    return this._model.changeProps;
  }

  public get moveTo() {
    return this._model.moveTo;
  }

  public get registerPixiEvent() {
    return this._view.registerPixiEvent;
  }
}
