import { MVCModel } from '/mvc';
import { Block } from '/components/block';
import { GAME } from '/shared/constants';
import { MVCACTIONS } from '/shared/enums';
import { type TPosition } from '/shared/types';
import { Utils } from '/utils/utils';

export class FieldModel extends MVCModel {
  private readonly _blocks: Block[] = [];
  private readonly _width: number;
  private readonly _height: number;
  private _newBlocksPositionY: number;
  private _turnsAvailable: boolean;

  constructor(width: number, height: number) {
    super();
    this._width = width;
    this._height = height;
    this._newBlocksPositionY = 0;
    this._turnsAvailable = true;
    this.initializeBlocks(width * height);
    this.reset();
  }

  private initializeBlocks = (count: number): void => {
    for (let i = 0; i < count; i++) {
      this._blocks.push(new Block());
    }
  };

  public updateNewBlockPositionY = (blocksContainerY: number) => {
    this._newBlocksPositionY = -blocksContainerY - GAME.block.size / 2;
  };

  public reset = (shuffle: boolean = false): void => {
    const { width, height } = this.size;
    const newPositions: TPosition[] = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        newPositions.push({ x, y });
      }
    }

    if (shuffle) newPositions.sort(() => Math.random() - 0.5);

    this.blocks.forEach((block, index) => {
      const newPosition = newPositions[index];
      block.controller.changeFieldPosition(newPosition);
      block.controller.moveTo(
        this.convertPositionFromFieldToReal(newPosition),
        shuffle ? GAME.animationSpeed.fall : 0,
      );
      if (!shuffle) block.controller.recreate();
    });
    this.mvcEventBus.emit(MVCACTIONS.valueUpdated, this);
  };

  public get fieldProps() {
    return {
      map: this.map,
      size: this.size,
      blocks: this.blocks,
      turnsAvailable: this._turnsAvailable,
    } as const;
  }

  public get neighbours() {
    return {
      rect: this.getRectNeighbours,
      same: this.getSameNeighbours,
      line: this.getLineNeighbours,
    } as const;
  }

  public get size() {
    return {
      width: this._width,
      height: this._height,
    } as const;
  }

  public get blocks(): Block[] {
    return this._blocks;
  }

  public registerBlocksEvent = (callback: (block: Block) => void): void => {
    for (const block of this.blocks) {
      block.controller.registerPixiEvent(GAME.pointerEvent, () => callback(block), 'default');
    }
  };

  public get map(): Block[][] {
    const verticals = this.verticals();
    const map: Block[][] = new Array(this._width)
      .fill([])
      .map(() => new Array(this._height).fill(null));

    verticals.forEach(vertical =>
      vertical.forEach(block => {
        const { x, y } = block.blockProps.fieldPosition;
        if (x >= 0 && x < this._width && y >= 0 && y < this._height) {
          map[x][y] = block;
        }
      }),
    );

    return map;
  }

  public verticals = (onlyNotDisappeared: boolean = true): Block[][] => {
    const verticals: Block[][] = new Array(this._width).fill([]).map(() => []);

    this.blocks
      .filter(({ blockProps }) => !onlyNotDisappeared || !blockProps.disappeared)
      .forEach(block => verticals[block.blockProps.fieldPosition.x].push(block));

    verticals.forEach(vertical =>
      vertical.sort((a, b) => b.blockProps.fieldPosition.y - a.blockProps.fieldPosition.y),
    );
    return verticals;
  };

  public getLineNeighbours = (
    position: TPosition,
    orientation: 'horizontal' | 'vertical',
  ): Block[] => {
    const neighboursPositions: TPosition[] = [];
    const dLimit = orientation === 'horizontal' ? this._width : this._height;
    for (let d = 0; d < dLimit; d++) {
      const newPosition = { ...position };
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

  public getRectNeighbours = (position: TPosition, length: number = 1): Block[] => {
    const neighboursPositions: TPosition[] = [];
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

  public getSameNeighbours = (position: TPosition, found: Block[] = []): Block[] => {
    const map = this.map;
    const { x, y } = position;
    const block = map[x][y];

    if (!block) return [];

    if (!found.length) found.push(block);
    const color = block.blockProps.color;
    const neighboursPositions: TPosition[] = [];
    for (let d = -1; d <= 1; d += 2) {
      neighboursPositions.push({ x: x + d, y });
      neighboursPositions.push({ x, y: y + d });
    }
    neighboursPositions
      .filter(pos => {
        if (!this.checkPositionIsInsideField(pos)) return false;
        const block = map[pos.x][pos.y];
        if (!block || found.includes(block)) return false;
        if (block.blockProps.color === color) {
          found.push(block);
          return true;
        }
      })
      .forEach(pos => this.getSameNeighbours(pos, found));
    return found;
  };

  private checkPositionIsInsideField = (position: TPosition): boolean => {
    const { x, y } = position;
    return x >= 0 && x < this._width && y >= 0 && y < this._height;
  };

  public recreateBlocks = async (blocks: Block[]) => {
    return new Promise(resolve => {
      blocks.forEach(async block => {
        const newFieldPosition = this.getRecreatedFieldPosition(block);
        const newRealPosition = this.getRecreatedRealPosition(block);
        block.controller.changeFieldPosition(newFieldPosition);
        await block.controller.moveTo(newRealPosition);
        block.controller.recreate();
      });
      this.mvcEventBus.emit(MVCACTIONS.valueUpdated, this);
      resolve(true);
    });
  };

  public fallBlocks = async (onlyNotDisappeared: boolean = true) => {
    return new Promise(resolve => {
      this.verticals(onlyNotDisappeared).forEach((vertical, x) => {
        for (let i = 0; i < vertical.length; i++) {
          const y = this._height - 1 - i;
          const block = vertical[i];
          if (block.blockProps.fieldPosition.y < y) {
            const currentRealPosition = block.props.position;
            const newFieldPosition = { x, y };
            const newRealPosition = this.convertPositionFromFieldToReal(newFieldPosition);
            const duration =
              (Utils.distance(currentRealPosition, newRealPosition) / GAME.block.size) *
              GAME.animationSpeed.fall;
            block.controller.changeFieldPosition(newFieldPosition);
            block.controller.moveTo(newRealPosition, duration);
          }
        }
      });
      resolve(true);
    });
  };

  public getRecreatedFieldPosition = (block: Block): TPosition => {
    const { x } = block.blockProps.fieldPosition;
    const vertical = this.verticals(false)[x];
    const y = Math.min(vertical[vertical.length - 1].blockProps.fieldPosition.y, 0) - 1;
    return { x, y };
  };

  public getRecreatedRealPosition = (block: Block): TPosition => {
    const fieldX = block.blockProps.fieldPosition.x;
    const realX = block.props.position.x;
    const vertical = this.verticals(false)[fieldX];
    const y = Math.min(
      vertical[vertical.length - 1].props.position.y - GAME.block.size,
      this._newBlocksPositionY,
    );
    return { x: realX, y };
  };

  private convertPositionFromFieldToReal = (position: TPosition): TPosition => {
    const calculatePosition = (value: number) => {
      return value * GAME.block.size + GAME.block.size / 2;
    };

    const x = calculatePosition(position.x);
    const y = calculatePosition(position.y);

    return { x, y };
  };

  public checkAvailableTurns = (minimumHit: number): boolean => {
    this._turnsAvailable = this.verticals().some(vertical => {
      return vertical.some(block => {
        return this.neighbours.same(block.blockProps.fieldPosition).length >= minimumHit;
      });
    });
    this.mvcEventBus.emit(MVCACTIONS.valueUpdated, this);
    return this._turnsAvailable;
  };
}
