import { MVCController } from '/mvc';
import { SceneModel } from './model';
import { SceneView } from './view';

export class SceneController extends MVCController<SceneModel, SceneView> {
  constructor(model: SceneModel, view: SceneView) {
    super(model, view);
  }

  public get scene() {
    return {
      addAndSceneAndScale: this._view.addAndSceneAndScale,
    };
  }
}
