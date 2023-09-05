import { EventBus } from '/classes/eventBus';
import { MVCModel } from '/classes/mvc';
import { GAMEACTIONS, WEAPONS } from '/shared/constants';
import { TGameplayContent } from './type';

export class GameplayModel extends MVCModel {
  public gameEventBus = new EventBus<GAMEACTIONS>();
  private _content: TGameplayContent;
  private _weapon: WEAPONS;
  private _score: number;
  private _goal: number;
  private _steps: number;
  private _coins: number;
  private _scorePerBlock: number;

  constructor(content: TGameplayContent) {
    super();
    this._content = content;
    this.reset();
  }

  public get gameProps() {
    return {
      weapon: this._weapon,
      score: this._score,
      goal: this._goal,
      steps: this._steps,
      coins: this._coins,
      scorePerBlock: this._scorePerBlock,
    } as const;
  }

  public get content() {
    return this._content;
  }

  public reset = (): void => {
    this._score = 0;
    this._goal = 1000;
    this._steps = 0;
    this._coins = 50;
    this._scorePerBlock = 5;
    this.resetWeapon();
  };

  public addOneScore = (): void => {
    this._score += this._scorePerBlock;
    this.gameEventBus.emit(GAMEACTIONS.scoreUpdated, this);
  };

  public turnComplete = (): void => {
    this._steps++;
    this.gameEventBus.emit(GAMEACTIONS.turnUpdated, this);
  };

  public resetWeapon = (): void => {
    this._weapon = WEAPONS.simple;
  };

  public addMoney = (money: number) => {
    this._coins += money;
    this.gameEventBus.emit(GAMEACTIONS.walletUpdated, this);
  };
}
