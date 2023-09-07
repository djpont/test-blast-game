import { Animations } from '/shared/animation';
import { Placer } from '/shared/placer';
import type { TGameResult, TSize } from '/shared/types';
import { Application, Container } from 'pixi.js';
import { MVCModel } from '/classes/mvc';
import { Scene } from '/components/scene';
import { ScenesSchemas } from '/scenes';
import { LAYOUT } from '/shared/layout';

export class GameModel extends MVCModel {
  private _stage: Container;
  private _stageRootChildrenCount: number = 1;
  private _currentScene: Scene;

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
    root.appendChild(app.view as HTMLCanvasElement);
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

    this.show.intro();

    app.ticker.add(delta => Animations.play(delta));
  };

  private get show() {
    return {
      intro: () => {
        const callbacks = {
          startGame: this.show.game,
        };
        const scene = new Scene(ScenesSchemas.intro(callbacks));
        this.showScene(scene, true);
      },
      game: () => {
        const callbacks = {
          back: this.show.intro,
          results: this.show.results,
        };
        const scene = new Scene(ScenesSchemas.game(callbacks));
        this.showScene(scene, true);
      },

      results: (gameResult: TGameResult) => {
        const callbacks = {
          close: this.show.intro,
          repeat: this.show.game,
        };
        const scene = new Scene(ScenesSchemas.results(callbacks, gameResult));
        this.showScene(scene, true);
      },
    };
  }

  private showScene = (scene: Scene, removeOthers: boolean = false) => {
    if (removeOthers && this._stage.children.length > this._stageRootChildrenCount) {
      this._stage.removeChildren(this._stageRootChildrenCount);
    }
    this._currentScene = scene;
    scene.controller.scene.addAndSceneAndScale(this._stage);
  };
}
