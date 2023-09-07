import { EventBus } from '/utils/eventBus';
import { MVCModel } from '/mvc';
import { GAME } from '/shared/constants';
import { GAMEACTIONS, WEAPONS } from '/shared/enums';
import type { TCallback, TGameResult } from '/shared/types';
import type { TGameplayContent } from 'src/gameplay/types';

export class GameplayModel extends MVCModel {
  public gameEventBus = new EventBus<GAMEACTIONS>();
  private _content: TGameplayContent;
  private _weapon: WEAPONS;
  private _score: number;
  private _goal: number;
  private _steps: number;
  private _coins: number;
  private _scorePerBlock: number;
  private _minimumHit: number;
  private _resultsCallback: TCallback<TGameResult>;

  constructor(content: TGameplayContent, resultsCallback: TCallback<TGameResult>) {
    super();
    this._resultsCallback = resultsCallback;
    this._minimumHit = GAME.minimumHit;
    content.field.controller.checkAvailableTurns(this._minimumHit);
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
      minimumHit: this._minimumHit,
    } as const;
  }

  public get content() {
    return this._content;
  }

  public reset = (): void => {
    this._score = 0;
    this._goal = GAME.rules.goal;
    this._steps = GAME.rules.steps;
    this._coins = GAME.rules.coins;
    this._scorePerBlock = GAME.rules.scoresPerBlock;
    this.resetWeapon();
    this.resetField(false);
  };

  private resetField = (shuffle: boolean) => {
    let trys = 1000;
    do {
      this._content.field.controller.reset(shuffle);
      trys--;
    } while (trys && !this._content.field.controller.checkAvailableTurns(this._minimumHit));
  };

  public addOneScore = (): void => {
    this._score += this._scorePerBlock;
    this.gameEventBus.emit(GAMEACTIONS.scoreUpdated, this);
    this.check.isWinner();
  };

  public turnComplete = (): void => {
    this._steps--;
    this.resetWeapon();
    this.gameEventBus.emit(GAMEACTIONS.turnUpdated, this);
  };

  public get check() {
    return {
      isWinner: () => {
        if (this._goal && this._score >= this._goal) {
          this.finishGame(true);
        }
      },
      isLooser: () => {
        const isAvailableTurns = this._content.field.controller.checkAvailableTurns(
          this._minimumHit,
        );
        const isCanBuyBonus = Object.values(GAME.bonusPrice).some(price => price <= this._coins);
        if ((!isAvailableTurns && !isCanBuyBonus) || this._steps === 0) {
          this.finishGame(false);
        }
      },
    };
  }

  private finishGame = (winner: boolean): void => {
    const gameResult = {
      winner: winner,
      ...this.gameProps,
    };
    this._resultsCallback(gameResult);
  };

  public resetWeapon = (): void => {
    this._weapon = WEAPONS.simple;
  };

  public addMoney = (money: number) => {
    this._coins += money;
    this.gameEventBus.emit(GAMEACTIONS.walletUpdated, this);
  };

  public get buyBonus() {
    const setBonus = (weapon: WEAPONS, price: number) => {
      if (this._weapon === WEAPONS.simple && price <= this._coins) {
        this._weapon = weapon;
        this._coins -= price;
        this.gameEventBus.emit(GAMEACTIONS.walletUpdated, this);
        if (weapon === WEAPONS.shuffle) {
          this.resetField(true);
          this.resetWeapon();
        }
      }
    };

    return {
      bomb: () => setBonus(WEAPONS.bomb, GAME.bonusPrice.bomb),
      horizontal: () => setBonus(WEAPONS.horizontal, GAME.bonusPrice.horizontal),
      vertical: () => setBonus(WEAPONS.vertical, GAME.bonusPrice.vertical),
      shuffle: () => setBonus(WEAPONS.shuffle, GAME.bonusPrice.shuffle),
    };
  }
}
