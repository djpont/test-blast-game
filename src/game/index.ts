import { Application } from 'pixi.js';
import { Animations } from '/shared/animation';
import { Localization } from '/shared/localozation';
import { Textures } from '/shared/textures';
import { Field } from '/components';
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
    const app = new Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x1099bb,
    });
    document.body.appendChild(app.view as HTMLCanvasElement);

    const field = new Field();
    field.controller.addToContainer(app.stage);

    const gameMechanics = new GameMechanics(field);
    new GameController(field, gameMechanics);

    // const score = new Panel();
    // score.controller.addToContainer(app.stage);
    // score.controller.changeScore(10);
    // score.controller.changeMovesLeft(20);
    // const btn1 = new ButtonWeapon(10, BlastLocalization.text.bomb);
    // btn1.controller.changeProps.position({ x: 100, y: 100 });
    // btn1.controller.addToContainer(app.stage);
    // const btn2 = new Button('кнопка', 'purple', 500);
    // btn2.controller.addToContainer(app.stage);
    // btn2.controller.changeProps.position({ x: 100, y: 100 });

    // const progress = new ProgressBar(LAYOUT.progress.size, 1);
    // progress.controller.addToContainer(app.stage);
    // progress.controller.changeProps.position({ x: 100, y: 25 });
    //
    // const pause = new ButtonPause();
    // pause.controller.addToContainer(app.stage);
    // pause.controller.registerPixiEvent(GAME.pointerEvent, callback);

    // let money = 100;
    // const wallet = new Wallet(money);
    // wallet.controller.addToContainer(app.stage);
    // wallet.controller.changeProps.position({ x: 50, y: 50 });
    // wallet.controller.changeCallback(() => {
    //   money -= 10;
    //   wallet.controller.changeValue(money);
    // });

    // const a = new NineSlicePlane(BlastTextures.cached.textures.barBackground);
    // a.height = 100;
    // a.width = 100;
    // // a.scale.set(0.1, 0.1);
    // a.position.y = 20;
    //
    // const b = new Container();
    // b.addChild(a);
    // app.stage.addChild(b);
    // b.scale.x = 0.2;
    // b.scale.y = 0.2;

    // setInterval(() => {
    //   Animations.play(1);
    // }, 100);

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
