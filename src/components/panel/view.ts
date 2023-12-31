import { MVCView } from '/mvc';
import { GAME } from '/shared/constants';
import { MVCACTIONS } from '/shared/enums';
import { LAYOUT } from '/shared/layout';
import { Localization } from '/shared/localization';
import { Textures } from '/utils/textures';
import { Placer } from '/utils/placer';
import { Sprite, Text } from 'pixi.js';
import { PanelModel } from './model';

export class PanelView extends MVCView<PanelModel> {
  private readonly _score: Text;
  private readonly _moves: Text;

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

    const moves = new Text('37', GAME.textStyle.clone());
    Placer.locateByCenter(moves, movesLeftBackground, LAYOUT.panel.movesLeft.text);
    moves.style.fontSize = LAYOUT.panel.movesLeft.text.size;

    super(model, container);
    this._score = score;
    this._moves = moves;
    model.mvcEventBus.on(MVCACTIONS.valueUpdated, this.valueUpdated);
    model.mvcEventBus.emit(MVCACTIONS.valueUpdated, model);
  }

  private valueUpdated = (model: PanelModel) => {
    this._score.text = model.goal ? `${model.score}/${model.goal}` : model.score;
    this._moves.text = model.moves;
  };
}
