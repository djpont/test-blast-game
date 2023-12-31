import { MVCView } from '/mvc';
import { GAME } from '/shared/constants';
import { MVCACTIONS } from '/shared/enums';
import { Textures } from '/utils/textures';
import { Placer } from '/utils/placer';
import { NineSlicePlane, Text } from 'pixi.js';
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
    model.mvcEventBus.on(MVCACTIONS.valueUpdated, this.valueUpdated);
    model.mvcEventBus.emit(MVCACTIONS.valueUpdated, model);
  }

  private valueUpdated = (model: ButtonModel) => {
    this._text.text = model.text;
    this._sprite.width = model.width;
  };
}
