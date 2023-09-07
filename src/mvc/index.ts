import { MVCController } from './controller';
import { MVCModel } from './model';
import { MVCView } from './view';

abstract class MVCComponent<
  TModel extends MVCModel = MVCModel,
  TView extends MVCView<TModel> = MVCView<TModel>,
  TController extends MVCController<TModel, TView> = MVCController<TModel, TView>,
> {
  protected _model: TModel;
  protected _view: TView;
  protected _controller: TController;

  protected constructor(model: TModel, view: TView, controller: TController) {
    this._model = model;
    this._view = view;
    this._controller = controller;
  }

  public get props() {
    return this._model.props;
  }

  public get controller() {
    return this._controller;
  }
}

export { MVCComponent, MVCModel, MVCView, MVCController };
