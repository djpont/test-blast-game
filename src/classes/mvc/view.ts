import { Container, DisplayObjectEvents } from 'pixi.js';
import { UIACTIONS } from '/shared/constants';
import { MVCModel } from './index';

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
