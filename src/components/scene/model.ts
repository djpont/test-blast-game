import { MVCModel } from '/classes/mvc';
import type { TSceneSchema, TSceneLayout, TSceneContent } from '/shared/types';

export class SceneModel extends MVCModel {
  private readonly _content: TSceneContent;
  private readonly _layout: TSceneLayout;

  constructor(scene: TSceneSchema) {
    super();
    this._content = scene.content;
    this._layout = scene.layout;
  }

  public get content() {
    return this._content;
  }

  public get layout() {
    return this._layout;
  }
}
