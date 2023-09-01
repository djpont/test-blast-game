import { BlockModel } from './model';
import { BlockController } from './controller';
import { BlockView } from './view';

export { BlockModel, BlockController, BlockView };

export class Block {
  private readonly _model: BlockModel;
  private readonly _controller: BlockController;
  private readonly _view: BlockView;

  public get model() {
    return this._model.props;
  }

  public get controller(): BlockController {
    return this._controller;
  }

  constructor(x: number, y: number) {
    this._model = new BlockModel(x, y);
    this._view = new BlockView(this._model);
    this._controller = new BlockController(this._model, this._view);
  }
}
