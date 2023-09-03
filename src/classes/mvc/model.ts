import { EventBus } from '/classes/eventBus';
import { UIACTIONS } from '/shared/constants';
import { TPosition } from '/shared/types';

export abstract class MVCModel {
  public readonly eventBus: EventBus<UIACTIONS>;
  protected _position: TPosition;
  protected _scale: number;
  protected _alpha: number;

  protected constructor() {
    this.eventBus = new EventBus();
    this._position = { x: 0, y: 0 };
    this._scale = 1;
    this._alpha = 1;
  }

  public get props() {
    return {
      position: this._position,
      scale: this._scale,
      alpha: this._alpha,
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
