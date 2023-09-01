import { Block } from '/components/block';
import { FIELDACTIONS } from '/shared/constants';
import { FieldModel, FieldView } from './index';

export class FieldController {
  private readonly _model: FieldModel;
  private readonly _view: FieldView;

  constructor(model: FieldModel, view: FieldView) {
    this._model = model;
    this._view = view;
  }

  get reset() {
    return this._model.reset;
  }

  get registerBlocksEvent() {
    return this._model.registerBlocksEvent;
  }

  public recreateBlocks = (blocks: Block[]) => {
    blocks.forEach(block => {
      const newPosition = this._model.getUpperEmptyPosition(block.model.position);
      block.controller.recreate(newPosition);
    });
  };

  public fallBlocks = (): Block[] => {
    const blocksWillFall: Block[] = [];
    this._model.verticals().forEach(vertical => {
      for (let y = vertical.length - 1; y >= 0; y--) {
        const block = vertical[y];
        if (block.model.position.y < y) {
          block.controller.falling.set(y);
          blocksWillFall.push(block);
        }
      }
    });
    this._model.eventBus.emit(FIELDACTIONS.updated);
    return blocksWillFall;
  };
}
