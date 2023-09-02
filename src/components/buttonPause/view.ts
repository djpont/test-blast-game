import { Textures } from '/shared/textures';
import { Sprite } from 'pixi.js';
import { UIView } from '/components/abstract';
import { ButtonPauseModel } from './model';

export class ButtonPauseView extends UIView<ButtonPauseModel> {
  constructor(model: ButtonPauseModel) {
    const sprite = new Sprite(Textures.cached.textures.buttonPause);
    super(model, sprite);
    model.changeProps.scale(0.5);
  }
}
