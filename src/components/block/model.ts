import { EventBus } from '/classes/eventBus';
import { MVCModel } from '/classes/mvc';
import { Animations } from '/shared/animation';
import { GAME } from '/shared/constants';
import { BLOCKACTIONS } from '/shared/enums';
import type { TCallback, TPosition } from '/shared/types';

type TColor = (typeof GAME.block.colors)[number];

export class BlockModel extends MVCModel {
  public readonly _blockEventBus: EventBus<BLOCKACTIONS>;
  private _fieldX: number;
  private _fieldY: number;
  private _disappeared: boolean;
  private _color: TColor;

  constructor(position: TPosition, fieldPosition: TPosition) {
    super(position);
    this._blockEventBus = new EventBus();
    if (fieldPosition) this.changeFieldPosition(fieldPosition);
    this.recreate();
  }

  public get blockProps() {
    return {
      fieldPosition: { x: this._fieldX, y: this._fieldY } as TPosition,
      color: this._color,
      disappeared: this._disappeared,
    } as const;
  }

  private randomizeColor = (): void => {
    const colors = GAME.block.colors;
    const randomIndex = Math.floor(Math.random() * colors.length);
    this._color = colors[randomIndex];
  };

  public recreate = (): void => {
    this._disappeared = false;
    this.randomizeColor();
    this.changeProps.reset();
    this._blockEventBus.emit(BLOCKACTIONS.spriteUpdated, this);
  };

  public changeFieldPosition = (position: TPosition) => {
    this._fieldX = position.x;
    this._fieldY = position.y;
    this._blockEventBus.emit(BLOCKACTIONS.fieldPositionUpdated, this);
  };

  public disappear = async (
    duration: number = 0,
    callback: TCallback = undefined,
    middleCallback: TCallback = undefined,
  ) => {
    const scaleFrom = this._scale;
    const alphaFrom = this._alpha;
    let middleCallbackCalled = false;

    const fn = (step: number) => {
      const scale = (1 - step / 2) * scaleFrom;
      const alpha = (1 - step) * alphaFrom;
      this.changeProps.scale(scale);
      this.changeProps.alpha(alpha);
      if (step > 0 && !middleCallbackCalled) {
        middleCallbackCalled = true;
        this._disappeared = true;
        middleCallback?.();
      }
    };

    return Animations.add(fn, duration, callback);
  };
}
