import { MVCComponent } from '/classes/mvc';
import { TPosition, TSize } from '/shared/types';
import { Application, Container } from 'pixi.js';

export type TSceneComponent = {
  element: MVCComponent;
  layout?: {
    position?: TPosition;
    scale?: number;
  };
};

export class Scene {
  private _scene: Container;

  constructor(components: TSceneComponent[], size: TSize, app: Application) {
    const scene = new Container();
    this._scene = scene;
    app.stage.addChild(scene);

    const { width, height } = size;
    scene.width = width;
    scene.height = height;

    components.forEach(({ element, layout }) => {
      element.controller.addToContainer(scene);
      if (layout) {
        layout.position && element.controller.changeProps.position(layout.position);
        layout.scale && element.controller.changeProps.scale(layout.scale);
      }
    });
  }
}
