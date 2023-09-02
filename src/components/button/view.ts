import { GAME, UIACTIONS } from '/shared/constants';
import { Textures } from '/shared/textures';
import { Placer } from '/utils/placer';
import { NineSlicePlane, Text } from 'pixi.js';
import { MVCView } from '/shared/mvc';
import { ButtonModel } from './model';

export class ButtonView extends MVCView<ButtonModel> {
  private readonly _sprite: NineSlicePlane;
  private readonly _text: Text;

  constructor(model: ButtonModel, color: string) {
    const sprite = new NineSlicePlane(
      color === 'purple'
        ? Textures.cached.textures.buttonPurple
        : Textures.cached.textures.buttonPink,
    );
    sprite.width = model.width;

    const text = new Text(model.text, GAME.textStyle);
    Placer.locateByCenter(text, sprite);

    super(model, sprite);
    this._sprite = sprite;
    this._text = text;
    model.eventBus.on(UIACTIONS.valueUpdated, this.valueUpdated);
    model.eventBus.emit(UIACTIONS.valueUpdated, model);
    model.changeProps.scale(0.5);
  }

  private valueUpdated = (model: ButtonModel) => {
    this._text.text = model.text;
    this._sprite.width = model.width;
  };
}
