import { Container, DisplayObjectEvents } from 'pixi.js';
import { MVCACTIONS } from '/shared/constants';
import { MVCModel } from './index';

export abstract class MVCView<TModel extends MVCModel> {
  protected _container: Container;
  private _parent: Container;

  protected constructor(model: TModel, child: Container = undefined) {
    this._container = new Container();
    if (child) this._container.addChild(child);

    model.mvcEventBus.on(MVCACTIONS.propsUpdated, this.updateAllProps);
    model.mvcEventBus.on(MVCACTIONS.positionUpdated, this.updatePosition);
    model.mvcEventBus.on(MVCACTIONS.scaleUpdated, this.updateScale);
    model.mvcEventBus.on(MVCACTIONS.alphaUpdated, this.updateAlpha);

    this.updateAllProps(model);
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

  public registerPixiEvent = (
    event: keyof DisplayObjectEvents,
    callback: () => void,
    cursor: typeof this._container.cursor = 'pointer',
  ): void => {
    this._container.cursor = cursor ? cursor : 'default';
    this._container.eventMode = 'static';
    this._container.removeAllListeners();
    this._container.on(event, callback);
  };

  private updateAllProps = (model: TModel) => {
    this.updatePosition(model);
    this.updateScale(model);
    this.updateAlpha(model);
  };

  private updatePosition = (model: TModel) => {
    const { props } = model;
    this._container.position.x = props.position.x;
    this._container.position.y = props.position.y;
  };

  private updateScale = (model: TModel) => {
    const { props } = model;
    this._container.scale.x = props.scale;
    this._container.scale.y = props.scale;
  };

  private updateAlpha = (model: TModel) => {
    this._container.alpha = model.props.alpha;
  };
}
