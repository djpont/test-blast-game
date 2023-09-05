import { MVCComponent } from '/classes/mvc';
import { TSceneSchema } from '/shared/types';
import { SceneModel } from './model';
import { SceneView } from './view';
import { SceneController } from './controller';

export class Scene extends MVCComponent<SceneModel, SceneView, SceneController> {
  constructor(scene: TSceneSchema) {
    const model = new SceneModel(scene);
    const view = new SceneView(model);
    const controller = new SceneController(model, view);
    super(model, view, controller);
    scene.controller?.(scene.content, scene.callbacks);
  }

  public get content() {
    return this._model.content;
  }
}
