import { MVCComponent } from '/mvc';
import { PanelModel } from './model';
import { PanelView } from './view';
import { PanelController } from './controller';

export class Panel extends MVCComponent<PanelModel, PanelView, PanelController> {
  constructor() {
    const model = new PanelModel();
    const view = new PanelView(model);
    const controller = new PanelController(model, view);
    super(model, view, controller);
  }
}
