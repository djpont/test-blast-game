import { MVCComponent } from '/classes/mvc';
import { BlockModel } from './model';
import { BlockController } from './controller';
import { BlockView } from './view';

export { BlockModel, BlockController, BlockView };

export class Block extends MVCComponent<BlockModel, BlockView, BlockController> {
  constructor(x: number, y: number) {
    const model = new BlockModel(x, y);
    const view = new BlockView(model);
    const controller = new BlockController(model, view);
    super(model, view, controller);
  }

  public get props2() {
    return this._model.props;
  }
}
