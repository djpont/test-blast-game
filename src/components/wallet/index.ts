import { MVCComponent } from '/classes/mvc';
import { WalletController } from './controller';
import { WalletModel } from './model';
import { WalletView } from './view';

export class Wallet extends MVCComponent<WalletModel, WalletView, WalletController> {
  constructor(money: number = 0) {
    const model = new WalletModel(money);
    const view = new WalletView(model);
    const controller = new WalletController(model, view);
    super(model, view, controller);
  }
}
