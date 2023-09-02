import { UIACTIONS } from '/shared/constants';
import { UIModel } from '/components/abstract';

export class PanelModel extends UIModel {
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
