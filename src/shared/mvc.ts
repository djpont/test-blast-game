import { Container, DisplayObjectEvents } from 'pixi.js';
import { UIACTIONS } from '/shared/constants';
import { TPosition } from '/shared/types';
import { EventBus } from '/utils/eventBus';

export abstract class MVCComponent<
  TModel extends MVCModel,
  TView extends MVCView<TModel>,
  TController extends MVCController<TModel, TView>,
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

export abstract class MVCModel {
  public readonly eventBus: EventBus<UIACTIONS>;
  protected _position: TPosition;
  protected _scale: number;

  protected constructor() {
    this.eventBus = new EventBus();
    this._position = { x: 0, y: 0 };
    this._scale = 1;
  }

  public get props() {
    return {
      position: this._position,
      scale: this._scale,
    };
  }

  public get changeProps() {
    return {
      position: (position: TPosition) => {
        this._position = position;
        this.eventBus.emit(UIACTIONS.propsUpdated, this);
      },
      scale: (scale: number) => {
        this._scale = scale;
        this.eventBus.emit(UIACTIONS.propsUpdated, this);
      },
    };
  }
}

export abstract class MVCView<TModel extends MVCModel> {
  protected _container: Container;
  private _parent: Container;

  protected constructor(model: TModel, child: Container = undefined) {
    this._container = new Container();
    if (child) this._container.addChild(child);

    model.eventBus.on(UIACTIONS.propsUpdated, this.propsUpdated);
    model.eventBus.emit(UIACTIONS.propsUpdated, model);
  }

  public addToContainer = (container: Container) => {
    this._parent = container;
    container.addChild(this._container);
  };

  public removeFromContainer = () => {
    if (this._parent) {
      const i = this._parent.getChildIndex(this._container);
      this._parent.removeChildAt(i);
      this._parent = null;
    }
  };

  public registerPixiEvent = (event: keyof DisplayObjectEvents, callback: () => void): void => {
    this._container.eventMode = 'static';
    this._container.on(event, callback);
  };

  private propsUpdated = (model: TModel) => {
    const { props } = model;
    this._container.position.x = props.position.x;
    this._container.position.y = props.position.y;
    this._container.scale.x = props.scale;
    this._container.scale.y = props.scale;
  };
}

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

  public get registerPixiEvent() {
    return this._view.registerPixiEvent;
  }
}
