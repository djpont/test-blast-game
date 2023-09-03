import { MVCModel } from '/classes/mvc';
import { UIACTIONS } from '/shared/constants';

export class PanelModel extends MVCModel {
  private _score: number;
  private _movesLeft: number;

  constructor() {
    super();
    this._score = 0;
    this._movesLeft = 0;
  }

  public get score() {
    return this._score;
  }

  public set score(value: number) {
    this._score = value;
    this.eventBus.emit(UIACTIONS.valueUpdated, this);
  }

  public get movesLeft() {
    return this._movesLeft;
  }

  public set movesLeft(value: number) {
    this._movesLeft = value;
    this.eventBus.emit(UIACTIONS.valueUpdated, this);
  }
}
