import { MVCComponent } from '/classes/mvc';
import { TPosition } from '/shared/types';
import { BlockModel } from './model';
import { BlockController } from './controller';
import { BlockView } from './view';

export { BlockModel, BlockController, BlockView };

export class Block extends MVCComponent<BlockModel, BlockView, BlockController> {
  constructor(position: TPosition = undefined, fieldPosition: TPosition = undefined) {
    const model = new BlockModel(position, fieldPosition);
    const view = new BlockView(model);
    const controller = new BlockController(model, view);
    super(model, view, controller);
  }

  public get blockProps() {
    return this._model.blockProps;
  }
}
