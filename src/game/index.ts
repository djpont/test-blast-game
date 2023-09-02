import { Scene, TSceneComponent } from '/classes/scene';
import { TSize } from '/shared/types';
import { turtle } from '/shared/utils';
import { Application } from 'pixi.js';
import { Animations } from '/shared/animation';
import { Localization } from '/shared/localozation';
import { Textures } from '/shared/textures';
import { ButtonPause, ButtonWeapon, Field, Panel, ProgressBar, Wallet } from '/components';
import { GameController } from './controller';
import { GameMechanics } from './mechanics';

export class Game {
  private static _instance: Game;

  private async loading() {
    const loadingDiv = document.createElement('div');

    const showLoading = () => {
      loadingDiv.className = 'loading';
      loadingDiv.innerText = Localization.text.loading;
      document.body.appendChild(loadingDiv);
    };

    const doLoading = async () => {
      await Textures.loadTextures();
    };

    const hideLoading = async () => {
      const delay = 100;
      const hideAnimationDuration = 1000;
      setTimeout(() => {
        loadingDiv.classList.add('hiding');
      }, delay);
      setTimeout(() => {
        loadingDiv.remove();
      }, hideAnimationDuration + delay);
    };

    await showLoading();
    await doLoading();
    await hideLoading();
  }

  constructor() {
    if (Game._instance !== undefined) return Game._instance;
    Game._instance = this;

    this.loading().then(() => {
      this.startBlastGame();
    });
  }

  private startBlastGame = () => {
    const appSize: TSize = {
      width: 2540, //window.innerWidth,
      height: 2120, //window.innerHeight,
    };

    const app = new Application({
      ...appSize,
      backgroundColor: 0x1099bb,
    });
    document.body.appendChild(app.view as HTMLCanvasElement);

    const resize = () => {
      const scaleX = window.innerWidth / appSize.width;
      const scaleY = window.innerHeight / appSize.height;
      const scale = Math.min(scaleX, scaleY);
      app.stage.scale.set(scale, scale);
      app.renderer.resize(appSize.width * scale, appSize.height * scale);
    };
    resize();

    window.addEventListener('resize', turtle(resize, 300));

    const field = new Field();

    const mainSceneElements: TSceneComponent[] = [
      {
        element: new ProgressBar(2220),
        layout: { position: { x: 20, y: -100 }, scale: 1 },
      },
      {
        element: new ButtonPause(),
        layout: { position: { x: 2260, y: 10 }, scale: 0.9 },
      },
      {
        element: field,
        layout: { position: { x: 0, y: 300 }, scale: 1 },
      },
      {
        element: new Panel(),
        layout: { position: { x: 1650, y: 285 }, scale: 0.8 },
      },
      {
        element: new Wallet(),
        layout: { position: { x: 1740, y: 1170 }, scale: 1 },
      },
      {
        element: new ButtonWeapon(10, Localization.text.bomb),
        layout: { position: { x: 1725, y: 1370 }, scale: 0.9 },
      },
      {
        element: new ButtonWeapon(10, Localization.text.bomb),
        layout: { position: { x: 2125, y: 1370 }, scale: 0.9 },
      },
      {
        element: new ButtonWeapon(10, Localization.text.bomb),
        layout: { position: { x: 1725, y: 1750 }, scale: 0.9 },
      },
      {
        element: new ButtonWeapon(10, Localization.text.bomb),
        layout: { position: { x: 2125, y: 1750 }, scale: 0.9 },
      },
    ];

    new Scene(mainSceneElements, appSize, app);

    const gameMechanics = new GameMechanics(field);
    new GameController(field, gameMechanics);

    app.ticker.add(delta => {
      Animations.play(delta);
      // if (BlastBlock.animatedBlocks.length) {
      //   BlastBlock.animatedBlocks.forEach(block => {
      //     block.playAnimation(delta);
      //   });
      // }
      // if (BlastBlock.disappearedBlocks.length) {
      //   BlastMechanics.checkDisappearedBlocks(field.model);
      //   field.view.element.sortChildren();
      // }
    });

    // setTimeout(() => {
    //   // fieldContainer.scale.x = 0.2;
    //   // fieldContainer.scale.y = 0.2;
    //   field.controller.reset();
    // }, 4000);
  };
}
