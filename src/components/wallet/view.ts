import { MVCView } from '/mvc';
import { GAME } from '/shared/constants';
import { MVCACTIONS } from '/shared/enums';
import { LAYOUT } from '/shared/layout';
import { Textures } from '/utils/textures';
import { Placer } from '/utils/placer';
import { Container, NineSlicePlane, Sprite, Text } from 'pixi.js';
import { WalletModel } from './model';

export class WalletView extends MVCView<WalletModel> {
  private readonly _text: Text;
  private readonly _plus: Container;

  constructor(model: WalletModel) {
    const container = new Container();

    const background = new NineSlicePlane(Textures.cached.textures.buttonPurple);
    container.addChild(background);
    background.width = 600;

    const coin = new Sprite(Textures.cached.textures.coinSmall);
    coin.position.x = -15;
    coin.position.y = -15;
    coin.height = coin.width = background.height + 30;
    container.addChild(coin);

    const text = new Text('', GAME.textStyle.clone());
    text.style.fontSize = LAYOUT.wallet.text.size;
    Placer.locateByCenter(text, background, LAYOUT.wallet.text);

    const plus = new Sprite(Textures.cached.textures.buttonPlus);
    plus.height = plus.width = background.height * 0.85;
    Placer.locateByCenter(plus, background);
    plus.position.x = background.width + 80;

    super(model, container);
    this._text = text;
    this._plus = plus;
    model.mvcEventBus.on(MVCACTIONS.valueUpdated, this.valueUpdated);
    model.mvcEventBus.on(MVCACTIONS.callbackUpdated, this.callbackUpdated);
    this.valueUpdated(model);
  }

  private valueUpdated = (model: WalletModel) => {
    this._text.text = model.value;
  };

  private callbackUpdated = (model: WalletModel) => {
    this._plus.cursor = 'pointer';
    this._plus.eventMode = 'static';
    this._plus.on(GAME.pointerEvent, model.plusCallback);
  };
}
