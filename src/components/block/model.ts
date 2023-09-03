import { EventBus } from '/classes/eventBus';
import { MVCModel } from '/classes/mvc';
import { BLOCKACTIONS, GAME } from '/shared/constants';
import { TPosition } from '/shared/types';

type TColor = (typeof GAME.block.colors)[number];

export class BlockModel extends MVCModel {
  public readonly gameplayBus: EventBus<BLOCKACTIONS>;
  private _fieldX: number;
  private _fieldY: number;
  private _fallingFrom: number;
  private _color: TColor;

  constructor(x: number, y: number) {
    super();
    this.gameplayBus = new EventBus();
    this._fieldX = x;
    this._fieldY = y;
    this._fallingFrom = y;
    this.recreate();
  }

  public get props() {
    return {
      position: { x: this._fieldX, y: this._fieldY } as TPosition,
      scale: this._scale,
      color: this._color,
      alpha: this._alpha,
    };
  }

  private set position(position: Partial<TPosition>) {
    const { x, y } = position;
    if (x !== undefined) this._fieldX = x;
    if (y !== undefined) this._fieldY = y;
    this.gameplayBus.emit(BLOCKACTIONS.updated, this);
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
    this.gameplayBus.emit(BLOCKACTIONS.recreated, this);
  };

  public zoomingOut = (delta: number): void => {
    const diffZoom = GAME.animationSpeed.scale * delta;
    const diffOpacity = GAME.animationSpeed.opacity * delta;
    this._scale -= diffZoom;
    this._alpha -= diffOpacity;
    this.gameplayBus.emit(BLOCKACTIONS.updated, this);
  };

  public setFallPosition = (y: number) => {
    this._fallingFrom = this._fieldY;
    this._fieldY = y;
    this.gameplayBus.emit(BLOCKACTIONS.updated, this);
  };

  public falling = (delta: number) => {
    this.gameplayBus.emit(BLOCKACTIONS.falling, this, delta);
  };
}
