import { MVCComponent } from '/mvc';
import { WalletModel } from './model';
import { WalletView } from './view';
import { WalletController } from './controller';

export class Wallet extends MVCComponent<WalletModel, WalletView, WalletController> {
  constructor() {
    const model = new WalletModel();
    const view = new WalletView(model);
    const controller = new WalletController(model, view);
    super(model, view, controller);
  }
}
