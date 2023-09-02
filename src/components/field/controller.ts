import { Block } from '/components/block';
import { UIController } from '/components/abstract';
import { UIACTIONS } from '/shared/constants';
import { FieldModel } from './model';
import { FieldView } from './view';

export class FieldController extends UIController<FieldModel, FieldView> {
  constructor(model: FieldModel, view: FieldView) {
    super(model, view);
  }

  get reset() {
    return this._model.reset;
  }

  get registerBlocksEvent() {
    return this._model.registerBlocksEvent;
  }

  public recreateBlocks = (blocks: Block[]) => {
    blocks.forEach(block => {
      const newPosition = this._model.getUpperEmptyPosition(block.props.position);
      block.controller.recreate(newPosition);
    });
  };

  public fallBlocks = (): Block[] => {
    const blocksWillFall: Block[] = [];
    this._model.verticals().forEach(vertical => {
      for (let y = vertical.length - 1; y >= 0; y--) {
        const block = vertical[y];
        if (block.props.position.y < y) {
          block.controller.falling.set(y);
          blocksWillFall.push(block);
        }
      }
    });
    this._model.eventBus.emit(UIACTIONS.valueUpdated);
    return blocksWillFall;
  };
}
