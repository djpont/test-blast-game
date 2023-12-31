import { MVCModel } from '/mvc';
import { MVCACTIONS } from '/shared/enums';

export class PanelModel extends MVCModel {
  private _score: number;
  private _goal: number;
  private _moves: number;

  constructor() {
    super();
    this._score = 0;
    this._goal = 0;
    this._moves = 0;
  }

  public get score() {
    return this._score;
  }

  public set score(value: number) {
    this._score = value;
    this.mvcEventBus.emit(MVCACTIONS.valueUpdated, this);
  }

  public get goal() {
    return this._goal;
  }

  public set goal(value: number) {
    this._goal = value;
    this.mvcEventBus.emit(MVCACTIONS.valueUpdated, this);
  }

  public get moves() {
    return this._moves;
  }

  public set moves(value: number) {
    this._moves = value;
    this.mvcEventBus.emit(MVCACTIONS.valueUpdated, this);
  }
}
