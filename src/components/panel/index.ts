import { UIComponent } from '/components/abstract';
import { PanelController } from './controller';
import { PanelModel } from './model';
import { PanelView } from './view';

export class Panel extends UIComponent<PanelModel, PanelView, PanelController> {
  constructor() {
    const model = new PanelModel();
    const view = new PanelView(model);
    const controller = new PanelController(model, view);
    super(model, view, controller);
  }
}
