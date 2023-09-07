import { EventBus } from '/classes/eventBus';
import { MVCModel } from '/classes/mvc';
import { Scene } from '/components/scene';
import { ScenesSchemas } from '/scenes';
import { Animations } from '/shared/animation';
import { APPACTIONS } from '/shared/enums';
import { LAYOUT } from '/shared/layout';
import { Placer } from '/shared/placer';
import type { TGameResult, TSize } from '/shared/types';
import { Application, Container } from 'pixi.js';

export class GameModel extends MVCModel {
  public readonly appEventBus: EventBus<APPACTIONS>;
  private _app: Application;
  private _appSize: TSize;
  private _root: HTMLElement;
  private _stage: Container;
  private _stageRootChildrenCount: number = 1;
  private _scene: Scene;

  constructor(root: HTMLElement) {
    super();
    this.appEventBus = new EventBus<APPACTIONS>();
    this.createApp(root);
  }

  public get appProps() {
    return {
      size: this._appSize,
      root: this._root,
      stage: this._stage,
      scene: this._scene,
      stageRootChildrenCount: this._stageRootChildrenCount,
    };
  }

  public createApp = (root: HTMLElement) => {
    const appSize: TSize = {
      width: LAYOUT.app.width * LAYOUT.app.pixelRatio,
      height: LAYOUT.app.height * LAYOUT.app.pixelRatio,
    };
    const app = new Application({ ...appSize, backgroundColor: LAYOUT.app.backgroundColor });
    root.appendChild(app.view as HTMLCanvasElement);
    Placer.addMask(app.stage, appSize, true);

    this._stage = app.stage;
    this._appSize = appSize;
    this._root = root;
    this._app = app;

    window.addEventListener('resize', () => this.appEventBus.emit(APPACTIONS.appResized, this));
  };

  public startApp = () => {
    this.show.intro();
    this.appEventBus.emit(APPACTIONS.appResized, this);
    this._app.ticker.add(delta => Animations.play(delta));
  };

  private get show() {
    return {
      intro: () => {
        const callbacks = {
          startGame: this.show.game,
        };
        const scene = new Scene(ScenesSchemas.intro(callbacks));
        this.showScene(scene);
      },
      game: () => {
        const callbacks = {
          back: this.show.intro,
          results: this.show.results,
        };
        const scene = new Scene(ScenesSchemas.game(callbacks));
        this.showScene(scene);
      },

      results: (gameResult: TGameResult) => {
        const callbacks = {
          close: this.show.intro,
          repeat: this.show.game,
        };
        const scene = new Scene(ScenesSchemas.results(callbacks, gameResult));
        this.showScene(scene);
      },
    };
  }

  private showScene = (scene: Scene): void => {
    this._scene = scene;
    this.appEventBus.emit(APPACTIONS.sceneChanged, this);
  };
}
