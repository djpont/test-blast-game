import { Application } from 'pixi.js';
import { Animations } from '/shared/animation';
import { BlastLocalization } from '/shared/localozation';
import { BlastTextures } from '/shared/textures';
import { Field } from '/components/field';
import { GameController } from './controller';
import { GameMechanics } from './mechanics';

export class Game {
  private static _instance: Game;

  private async loading() {
    const loadingDiv = document.createElement('div');

    const showLoading = () => {
      loadingDiv.className = 'loading';
      loadingDiv.innerText = BlastLocalization.text.loading;
      document.body.appendChild(loadingDiv);
    };

    const doLoading = async () => {
      await BlastTextures.loadTextures();
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
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb,
    });
    document.body.appendChild(app.view as HTMLCanvasElement);

    const field = new Field(app.stage);

    const gameMechanics = new GameMechanics(field);
    new GameController(field, gameMechanics);

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
