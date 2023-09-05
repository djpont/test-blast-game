import { EventBus } from '/classes/eventBus';
import { MVCModel } from '/classes/mvc';
import { GAMEACTIONS, WEAPONS } from '/shared/constants';

export class GameplayModel extends MVCModel {
  public gameEventBus = new EventBus<GAMEACTIONS>();
  private _weapon: WEAPONS;
  private _score: number;
  private _goal: number;
  private _steps: number;
  private _coins: number;

  constructor() {
    // console.log('GameplayModel constructor');
    super();
    this.reset();
  }

  public get gameProps() {
    return {
      weapon: this._weapon,
      score: this._score,
      goal: this._goal,
      steps: this._steps,
      coins: this._coins,
    } as const;
  }

  public reset = (): void => {
    this._score = 0;
    this._goal = 1000;
    this._steps = 30;
    this._coins = 50;
    this.resetWeapon();
  };

  private resetWeapon = (): void => {
    this._weapon = WEAPONS.simple;
  };
}
