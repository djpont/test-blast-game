import { GAME, UIACTIONS } from '/shared/constants';
import { LAYOUT } from '/shared/layout';
import { Textures } from '/shared/textures';
import { Placer } from '/shared/placer';
import { Sprite, Text } from 'pixi.js';
import { MVCView } from '/classes/mvc';
import { ButtonWeaponModel } from './model';

export class ButtonWeaponView extends MVCView<ButtonWeaponModel> {
  private readonly _price: Text;

  constructor(model: ButtonWeaponModel) {
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
    this._container.eventMode = 'static';
    this._container.cursor = 'pointer';
    this._price = price;
    model.eventBus.on(UIACTIONS.valueUpdated, this.valueUpdated);
  }

  private valueUpdated = (model: ButtonWeaponModel) => {
    this._price.text = model.price;
  };
}
