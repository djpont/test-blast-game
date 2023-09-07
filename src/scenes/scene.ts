import type { TSceneSchema, TSize } from '/shared/types';
import { Application, Container } from 'pixi.js';

export class Scene {
  private readonly _container: Container;
  private readonly _content: object;

  constructor(scene: TSceneSchema, size: TSize, app: Application) {
    this._content = scene.content;
    const container = new Container();
    this._container = container;
    app.stage.addChild(container);

    Object.values(scene.content).forEach(({ element, layout }) => {
      element.controller.addToContainer(container);
      if (layout) {
        layout.position && element.controller.changeProps.position(layout.position);
        layout.scale && element.controller.changeProps.scale(layout.scale);
      }
    });
  }

  public get content() {
    return this._content;
  }
}
