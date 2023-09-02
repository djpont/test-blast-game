import { MVCComponent } from '/shared/mvc';
import { PanelController } from './controller';
import { PanelModel } from './model';
import { PanelView } from './view';

export class Panel extends MVCComponent<PanelModel, PanelView, PanelController> {
  constructor() {
    const model = new PanelModel();
    const view = new PanelView(model);
    const controller = new PanelController(model, view);
    super(model, view, controller);
  }
}
