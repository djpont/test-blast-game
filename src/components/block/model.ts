import { EventBus } from '/utils/eventBus';
import { BLOCKACTIONS, GAME } from '/shared/constants';
import { TPosition } from '/shared/types';

type TColor = (typeof GAME.block.colors)[number];

export class BlockModel {
  public readonly eventBus: EventBus<BLOCKACTIONS>;
  private _x: number;
  private _y: number;
  private _fallingFrom: number;
  private _scale: number;
  private _alpha: number;
  private _color: TColor;

  constructor(x: number, y: number) {
    this.eventBus = new EventBus();
    this._x = x;
    this._y = y;
    this._fallingFrom = y;
    this.recreate();
  }

  get props() {
    return {
      position: { x: this._x, y: this._y } as TPosition,
      color: this._color,
      scale: this._scale,
      alpha: this._alpha,
    };
  }

  private set position(position: Partial<TPosition>) {
    const { x, y } = position;
    if (x !== undefined) this._x = x;
    if (y !== undefined) this._y = y;
    this.eventBus.emit(BLOCKACTIONS.updated, this);
  }

  private randomizeColor = (): void => {
    const colors = GAME.block.colors;
    const randomIndex = Math.floor(Math.random() * colors.length);
    this._color = colors[randomIndex];
  };

  private reset = (): void => {
    this._scale = 1;
    this._alpha = 1;
  };

  public recreate = (position: TPosition | undefined = undefined) => {
    if (position) this.position = position;
    this.randomizeColor();
    this.reset();
    this.eventBus.emit(BLOCKACTIONS.recreated, this);
  };

  public zoomingOut = (delta: number): void => {
    const diffZoom = GAME.animationSpeed.scale * delta;
    const diffOpacity = GAME.animationSpeed.opacity * delta;
    this._scale -= diffZoom;
    this._alpha -= diffOpacity;
    this.eventBus.emit(BLOCKACTIONS.updated, this);
  };

  public setFallPosition = (y: number) => {
    this._fallingFrom = this._y;
    this._y = y;
    this.eventBus.emit(BLOCKACTIONS.updated, this);
  };

  public falling = (delta: number) => {
    this.eventBus.emit(BLOCKACTIONS.falling, this, delta);
  };
}