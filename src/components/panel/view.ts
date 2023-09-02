import { GAME, LAYOUT, UIACTIONS } from '/shared/constants';
import { Localization } from '/shared/localozation';
import { Textures } from '/shared/textures';
import { Placer } from '/utils/placer';
import { Sprite, Text } from 'pixi.js';
import { MVCView } from '/shared/mvc';
import { PanelModel } from './model';

export class PanelView extends MVCView<PanelModel> {
  private readonly _score: Text;
  private readonly _movesLeft: Text;

  constructor(model: PanelModel) {
    const container = new Sprite(Textures.cached.textures.panelBackground);

    const scoreBackground = new Sprite(Textures.cached.textures.panelScore);
    Placer.locateByCenter(scoreBackground, container, LAYOUT.panel.score.background);

    const scoreHeader = new Text(`${Localization.text.score}:`, GAME.textStyle.clone());
    Placer.locateByCenter(scoreHeader, scoreBackground, LAYOUT.panel.score.header);
    scoreHeader.style.fontSize = LAYOUT.panel.score.header.size;

    const score = new Text('', GAME.textStyle.clone());
    Placer.locateByCenter(score, scoreBackground, LAYOUT.panel.score.text);
    score.style.fontSize = LAYOUT.panel.score.text.size;

    const movesLeftBackground = new Sprite(Textures.cached.textures.panelMoves);
    Placer.locateByCenter(movesLeftBackground, container, LAYOUT.panel.movesLeft.background);

    const movesLeft = new Text('37', GAME.textStyle.clone());
    Placer.locateByCenter(movesLeft, movesLeftBackground, LAYOUT.panel.movesLeft.text);
    movesLeft.style.fontSize = LAYOUT.panel.movesLeft.text.size;

    super(model, container);
    this._score = score;
    this._movesLeft = movesLeft;
    model.eventBus.on(UIACTIONS.valueUpdated, this.valueUpdated);
    model.eventBus.emit(UIACTIONS.valueUpdated, model);
    model.changeProps.scale(0.5);
  }

  private valueUpdated = (model: PanelModel) => {
    this._score.text = model.score;
    this._movesLeft.text = model.movesLeft;
  };
}
