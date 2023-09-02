import { GAME, LAYOUT, UIACTIONS } from '/shared/constants';
import { Localization } from '/shared/localozation';
import { Textures } from '/shared/textures';
import { Layout } from '/utils/layout';
import { NineSlicePlane, Text } from 'pixi.js';
import { UIView } from '/components/abstract';
import { ProgressBarModel } from './model';

export class ProgressBarView extends UIView<ProgressBarModel> {
  private readonly _fillBar: NineSlicePlane;
  private readonly _zeroSize: number;
  private readonly _fullSize: number;

  constructor(model: ProgressBarModel, width: number) {
    const container = new NineSlicePlane(Textures.cached.textures.progressContainer);
    container.width = width;

    const text = new Text(Localization.text.progress, GAME.textStyle);
    Layout.locateByCenter(text, container, LAYOUT.progress.text);

    const fillBarBackground = new NineSlicePlane(Textures.cached.textures.barBackground);
    fillBarBackground.width = width - LAYOUT.progress.bar.padding * 2;
    Layout.locateByCenter(fillBarBackground, container, LAYOUT.progress.bar);

    const fillBar = new NineSlicePlane(Textures.cached.textures.barFill);
    fillBar.position.x = LAYOUT.progress.fillPadding.left;
    fillBar.position.y = LAYOUT.progress.fillPadding.top;
    Layout.locate(fillBar, fillBarBackground);

    super(model, container);
    this._fillBar = fillBar;
    this._zeroSize = fillBar.height;
    this._fullSize =
      fillBarBackground.width -
      LAYOUT.progress.fillPadding.left -
      LAYOUT.progress.fillPadding.right;
    model.eventBus.on(UIACTIONS.valueUpdated, this.valueUpdated);
    model.eventBus.emit(UIACTIONS.valueUpdated, model);
    model.changeProps.scale(0.5);
  }

  private valueUpdated = (model: ProgressBarModel) => {
    this._fillBar.width = (this._fullSize - this._zeroSize) * model.value + this._zeroSize;
  };
}