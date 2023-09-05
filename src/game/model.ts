import { Placer } from '/shared/placer';
import { TSize } from '/shared/types';
import { Application, Container } from 'pixi.js';
import { EventBus } from '/classes/eventBus';
import { MVCModel } from '/classes/mvc';
import { Scene } from '/components/scene';
import { ScenesSchemas } from '/scenes';
import { GAMEACTIONS } from '/shared/constants';
import { LAYOUT } from '/shared/layout';

export class GameModel extends MVCModel {
  private _stage: Container;
  private _stageRootChildrenCount: number = 1;
  private _currentScene: Scene;
  public gameEventBus = new EventBus<GAMEACTIONS>();

  constructor() {
    super();
  }

  public createApp = (root: HTMLElement) => {
    const pixelRatio = window.devicePixelRatio ?? 1;
    const appSize: TSize = {
      width: LAYOUT.app.width * pixelRatio,
      height: LAYOUT.app.height * pixelRatio,
    };
    const app = new Application({ ...appSize, backgroundColor: LAYOUT.app.backgroundColor });
    Placer.addMask(app.stage, appSize, true);
    this._stage = app.stage;

    const resizeApp = () => {
      const scaleX = window.innerWidth / appSize.width;
      const scaleY = window.innerHeight / appSize.height;
      const scale = Math.min(scaleX, scaleY);
      root.style.transform = `scale(${scale})`;
    };

    resizeApp();
    window.addEventListener('resize', resizeApp);

    root.appendChild(app.view as HTMLCanvasElement);
    this.showIntro();
  };

  private showIntro = () => {
    const callbacks = {
      startGame: () => {
        this.showGame();
      },
      secondMenu: () => {
        this.showSecond();
      },
    };
    setTimeout(() => {
      callbacks.startGame();
    }, 100);
    const scene = new Scene(ScenesSchemas.intro(callbacks));
    this.showScene(scene, true);
  };

  private showSecond = () => {
    const callbacks = {
      back: () => {
        this.showIntro();
      },
    };
    const scene = new Scene(ScenesSchemas.second(callbacks));
    this.showScene(scene, true);
  };

  private showGame = () => {
    const callbacks = {
      back: () => {
        this.showIntro();
      },
    };
    const scene = new Scene(ScenesSchemas.game(callbacks));
    this.showScene(scene, true);
  };

  private showScene = (scene: Scene, removeOthers: boolean = false) => {
    if (removeOthers && this._stage.children.length > this._stageRootChildrenCount) {
      this._stage.removeChildren(this._stageRootChildrenCount);
    }
    this._currentScene = scene;
    scene.controller.scene.addAndSceneAndScale(this._stage);
  };
}
