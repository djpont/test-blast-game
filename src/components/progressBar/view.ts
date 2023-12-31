import { MVCView } from '/mvc';
import { GAME } from '/shared/constants';
import { MVCACTIONS } from '/shared/enums';
import { LAYOUT } from '/shared/layout';
import { Localization } from '/shared/localization';
import { Textures } from '/utils/textures';
import { Placer } from '/utils/placer';
import { NineSlicePlane, Text } from 'pixi.js';
import { ProgressBarModel } from './model';

export class ProgressBarView extends MVCView<ProgressBarModel> {
  private readonly _fillBar: NineSlicePlane;
  private readonly _zeroSize: number;
  private readonly _fullSize: number;

  constructor(model: ProgressBarModel, width: number) {
    const container = new NineSlicePlane(Textures.cached.textures.progressContainer);
    container.width = width;

    const text = new Text(Localization.text.progress, GAME.textStyle);
    Placer.locateByCenter(text, container, LAYOUT.progress.text);

    const fillBarBackground = new NineSlicePlane(Textures.cached.textures.barBackground);
    fillBarBackground.width = width - LAYOUT.progress.bar.padding * 2;
    Placer.locateByCenter(fillBarBackground, container, LAYOUT.progress.bar);

    const fillBar = new NineSlicePlane(Textures.cached.textures.barFill);
    fillBar.position.x = LAYOUT.progress.fillPadding.left;
    fillBar.position.y = LAYOUT.progress.fillPadding.top;
    Placer.locate(fillBar, fillBarBackground);

    super(model, container);
    this._fillBar = fillBar;
    this._zeroSize = fillBar.height;
    this._fullSize =
      fillBarBackground.width -
      LAYOUT.progress.fillPadding.left -
      LAYOUT.progress.fillPadding.right;
    model.mvcEventBus.on(MVCACTIONS.valueUpdated, this.valueUpdated);
    model.mvcEventBus.emit(MVCACTIONS.valueUpdated, model);
  }

  private valueUpdated = (model: ProgressBarModel) => {
    this._fillBar.width = (this._fullSize - this._zeroSize) * model.value + this._zeroSize;
  };
}
