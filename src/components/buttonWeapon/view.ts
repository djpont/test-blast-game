import { GAME, LAYOUT, UIACTIONS } from '/shared/constants';
import { Textures } from '/shared/textures';
import { Layout } from '/utils/layout';
import { Sprite, Text } from 'pixi.js';
import { UIView } from '/components/abstract';
import { ButtonWeaponModel } from './model';

export class ButtonWeaponView extends UIView<ButtonWeaponModel> {
  private readonly _title: Text;
  private readonly _price: Text;

  constructor(model: ButtonWeaponModel) {
    const container = new Sprite(Textures.cached.textures.buttonBonus);

    const coin = new Sprite(Textures.cached.textures.coinSmall);
    Layout.locateByCenter(coin, container, LAYOUT.buttons.weapon.coin);

    const price = new Text(model.price, GAME.textStyle.clone());
    Layout.locate(price, container, LAYOUT.buttons.weapon.price);
    price.style.fontSize = LAYOUT.buttons.weapon.price.size;

    const title = new Text(model.title, GAME.textStyle.clone());
    Layout.locateByCenter(title, container, LAYOUT.buttons.weapon.title);
    title.style.fontSize = LAYOUT.buttons.weapon.title.size;

    super(model, container);
    this._price = price;
    model.eventBus.on(UIACTIONS.valueUpdated, this.valueUpdated);
  }

  private valueUpdated = (model: ButtonWeaponModel) => {
    this._price.text = model.price;
  };
}
