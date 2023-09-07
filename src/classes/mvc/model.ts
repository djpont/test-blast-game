import { EventBus } from '/classes/eventBus';
import { Animations } from '/shared/animation';
import { MVCACTIONS } from '/shared/constants';
import type { TCallback, TPosition } from '/shared/types';

export abstract class MVCModel {
  public readonly mvcEventBus: EventBus<MVCACTIONS>;
  protected _position: TPosition;
  protected _scale: number;
  protected _alpha: number;

  protected constructor(position: TPosition = undefined) {
    this.mvcEventBus = new EventBus();
    this._position = position ?? { x: 0, y: 0 };
    this._scale = 1;
    this._alpha = 1;
  }

  public get props() {
    return {
      position: this._position,
      scale: this._scale,
      alpha: this._alpha,
    } as const;
  }

  public get changeProps() {
    return {
      position: (position: TPosition) => {
        this._position = position;
        this.mvcEventBus.emit(MVCACTIONS.positionUpdated, this);
      },
      scale: (scale: number) => {
        this._scale = scale;
        this.mvcEventBus.emit(MVCACTIONS.scaleUpdated, this);
      },
      alpha: (alpha: number) => {
        this._alpha = alpha;
        this.mvcEventBus.emit(MVCACTIONS.alphaUpdated, this);
      },
      reset: () => {
        this.changeProps.scale(1);
        this.changeProps.alpha(1);
      },
    } as const;
  }

  public moveTo = async (
    positionTo: TPosition,
    duration: number = 0,
    callback: TCallback = undefined,
  ) => {
    const movingFrom: TPosition = { ...this._position };
    const movingLengths: TPosition = {
      x: positionTo.x - this._position.x,
      y: positionTo.y - this._position.y,
    };

    const fn = (step: number) => {
      const x = movingFrom.x + movingLengths.x * step;
      const y = movingFrom.y + movingLengths.y * step;
      this.changeProps.position({ x, y });
    };

    return Animations.add(fn, duration, callback);
  };
}
