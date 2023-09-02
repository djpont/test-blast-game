import { Textures } from '/shared/textures';
import { Sprite } from 'pixi.js';
import { MVCView } from '/classes/mvc';
import { ButtonPauseModel } from './model';

export class ButtonPauseView extends MVCView<ButtonPauseModel> {
  constructor(model: ButtonPauseModel) {
    const sprite = new Sprite(Textures.cached.textures.buttonPause);
    sprite.eventMode = 'static';
    sprite.cursor = 'pointer';
    super(model, sprite);
  }
}
