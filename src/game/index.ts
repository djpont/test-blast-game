import { MVCComponent } from '/classes/mvc';
import { Localization } from '/shared/localozation';
import { Textures } from '/shared/textures';
import { GameModel } from './model';
import { GameView } from './view';
import { GameController } from './controller';

export class Game extends MVCComponent<GameModel, GameView, GameController> {
  constructor(root: HTMLElement) {
    const model = new GameModel(root);
    const view = new GameView(model);
    const controller = new GameController(model, view);
    super(model, view, controller);

    this.loading().then(() => {
      model.startApp();
    });
  }

  private async loading() {
    const loadingDiv = document.createElement('div');

    const showLoading = () => {
      loadingDiv.className = 'loading';
      loadingDiv.innerText = Localization.text.loading;
      document.body.appendChild(loadingDiv);
    };

    const hideLoading = () => {
      const delay = 100;
      const hideAnimationDuration = 1000;
      setTimeout(() => {
        loadingDiv.classList.add('hiding');
      }, delay);
      setTimeout(() => {
        loadingDiv.remove();
      }, hideAnimationDuration + delay);
    };

    showLoading();
    await Textures.loadTextures();
    hideLoading();
  }
}
