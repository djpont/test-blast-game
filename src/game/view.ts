import { MVCView } from '/classes/mvc';
import { APPACTIONS } from '/shared/constants';
import { GameModel } from './model';

export class GameView extends MVCView<GameModel> {
  constructor(model: GameModel) {
    super(model);
    model.appEventBus.on(APPACTIONS.appResized, this.resize);
    model.appEventBus.on(APPACTIONS.sceneChanged, this.changeScene);
    this.resize(model);
  }

  private resize = (model: GameModel): void => {
    const scaleX = window.innerWidth / model.appProps.size.width;
    const scaleY = window.innerHeight / model.appProps.size.height;
    const scale = Math.min(scaleX, scaleY);
    model.appProps.root.style.transform = `scale(${scale})`;
  };

  private changeScene = (model: GameModel) => {
    const { stage, stageRootChildrenCount, scene } = model.appProps;
    if (stage.children.length > stageRootChildrenCount) {
      stage.removeChildren(stageRootChildrenCount);
    }
    if (scene) scene.controller.scene.addAndSceneAndScale(stage);
  };
}
