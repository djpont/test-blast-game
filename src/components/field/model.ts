import { UIModel } from '/components/abstract';
import { Block } from '/components/block';
import { UIACTIONS, GAME } from '/shared/constants';
import { TPosition } from '/shared/types';

export class FieldModel extends UIModel {
  private readonly _blocks: Block[] = [];
  private readonly _width: number;
  private readonly _height: number;

  constructor(width: number, height: number) {
    super();
    this._width = width;
    this._height = height;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const block = new Block(x, y);
        this._blocks.push(block);
      }
    }
  }

  public get size() {
    return {
      width: this._width,
      height: this._height,
    };
  }

  public get blocks(): Block[] {
    return this._blocks;
  }

  public registerBlocksEvent = (callback: (block: Block) => void) => {
    this.blocks.forEach(block => {
      const callbackWithBlock = () => {
        callback(block);
      };
      block.controller.registerPixiEvent(GAME.pointerEvent, callbackWithBlock);
    });
  };

  public reset = () => {
    const { width, height } = this.size;
    const newPositions: TPosition[] = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        newPositions.push({ x, y });
      }
    }
    this.blocks.forEach((block, index) => {
      block.controller.recreate(newPositions[index]);
    });
    this.eventBus.emit(UIACTIONS.valueUpdated);
  };

  public get map(): Block[][] {
    const verticals = this.verticals();
    const map: (Block | null)[][] = new Array(GAME.field.width).fill([]);
    for (let x = 0; x < GAME.field.width; x++) {
      map[x] = new Array(GAME.field.height).fill(null);
    }
    verticals.forEach(vertical =>
      vertical.forEach(block => {
        const { x, y } = block.props.position;
        if (x >= 0 && x < GAME.field.width && y >= 0 && x < GAME.field.width) {
          map[x][y] = block;
        }
      }),
    );
    return map;
  }

  public verticals = (): Block[][] => {
    const verticals: (Block | null)[][] = new Array(GAME.field.width).fill([]);
    for (let x = 0; x < GAME.field.width; x++) {
      verticals[x] = [];
    }
    this.blocks.forEach(block => {
      verticals[block.props.position.x].push(block);
    });
    verticals.forEach(vertical => vertical.sort((a, b) => a.props.position.y - b.props.position.y));
    return verticals;
  };

  public getLineNeighbours = (block: Block, orientation: 'horizontal' | 'vertical'): Block[] => {
    const neighboursPositions: TPosition[] = [];
    const { position } = block.props;
    const dLimit = orientation === 'horizontal' ? GAME.field.width : GAME.field.height;
    for (let d = 0; d < dLimit; d++) {
      const newPosition = { x: position.x, y: position.y };
      if (orientation === 'horizontal') {
        newPosition.x = d;
      } else {
        newPosition.y = d;
      }
      neighboursPositions.push(newPosition);
    }
    const map = this.map;
    return neighboursPositions
      .filter(position => this.checkPositionIsInsideField(position))
      .map(({ x, y }) => map[x][y]);
  };

  public getRectNeighbours = (block: Block, length: number = 1): Block[] => {
    const neighboursPositions: TPosition[] = [];
    const { position } = block.props;
    for (let x = position.x - length; x <= position.x + length; x++) {
      for (let y = position.y - length; y <= position.y + length; y++) {
        neighboursPositions.push({ x, y });
      }
    }
    const map = this.map;
    return neighboursPositions
      .filter(position => this.checkPositionIsInsideField(position))
      .map(({ x, y }) => map[x][y]);
  };

  public getSameNeighbours = (block: Block, found: Block[] = []): Block[] => {
    const { x, y } = block.props.position;
    // @ts-ignore-next-line
    const color = block.props.color;
    if (!found.length) found.push(block);
    const map = this.map;
    const neighboursPositions: TPosition[] = [];
    for (let d = -1; d <= 1; d += 2) {
      neighboursPositions.push({ x: x + d, y });
      neighboursPositions.push({ x, y: y + d });
    }
    neighboursPositions
      .filter(position => {
        if (!this.checkPositionIsInsideField(position)) return false;
        const block = map[position.x][position.y];
        if (!block || found.includes(block)) return false;
        // @ts-ignore-next-line
        if (block.props.color === color) {
          found.push(block);
          return true;
        }
      })
      .forEach(position => this.getSameNeighbours(map[position.x][position.y], found));
    return found;
  };

  private checkPositionIsInsideField = (position: TPosition): boolean => {
    const { x, y } = position;
    return x >= 0 && x < GAME.field.width && y >= 0 && y < GAME.field.height;
  };

  public getUpperEmptyPosition = (position: TPosition): TPosition => {
    const { x } = position;
    const y = this.verticals()[x][0].props.position.y - 1;
    return { x: position.x, y };
  };
}
