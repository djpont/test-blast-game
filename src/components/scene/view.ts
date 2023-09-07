import { MVCView } from '/mvc';
import { Placer } from '/utils/placer';
import { Container } from 'pixi.js';
import { SceneModel } from './model';

export class SceneView extends MVCView<SceneModel> {
  constructor(model: SceneModel) {
    super(model);
    Placer.addMask(this._container, model.layout.size, true);
    const contentContainer = new Container();
    Placer.addMask(contentContainer, model.layout.size);
    this._container.addChild(contentContainer);
    Object.values(model.content).forEach(({ element, layout }) => {
      element.controller.addToContainer(contentContainer);
      if (layout) {
        layout.position && element.controller.changeProps.position(layout.position);
        layout.scale && element.controller.changeProps.scale(layout.scale);
      }
    });
  }

  public addAndSceneAndScale = (stage: Container) => {
    Placer.locateInsideAndScale(this._container, stage);
    // this.addToContainer(stage);
  };
}
