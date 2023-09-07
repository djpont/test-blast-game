import { MVCView } from '/classes/mvc';
import { GAME } from '/shared/constants';
import { MVCACTIONS } from '/shared/enums';
import { LAYOUT } from '/shared/layout';
import { Textures } from '/shared/textures';
import { Placer } from '/shared/placer';
import { Sprite, Text } from 'pixi.js';
import { ButtonBonusModel } from './model';

export class ButtonBonusView extends MVCView<ButtonBonusModel> {
  private readonly _price: Text;

  constructor(model: ButtonBonusModel) {
    const container = new Sprite(Textures.cached.textures.buttonBonus);

    const coin = new Sprite(Textures.cached.textures.coinSmall);
    Placer.locateByCenter(coin, container, LAYOUT.buttons.weapon.coin);

    const price = new Text(model.price, GAME.textStyle.clone());
    Placer.locate(price, container, LAYOUT.buttons.weapon.price);
    price.style.fontSize = LAYOUT.buttons.weapon.price.size;

    const title = new Text(model.title, GAME.textStyle.clone());
    Placer.locateByCenter(title, container, LAYOUT.buttons.weapon.title);
    title.style.fontSize = LAYOUT.buttons.weapon.title.size;

    super(model, container);
    this._price = price;
    model.mvcEventBus.on(MVCACTIONS.valueUpdated, this.valueUpdated);
  }

  private valueUpdated = (model: ButtonBonusModel) => {
    this._price.text = model.price;
  };
}
