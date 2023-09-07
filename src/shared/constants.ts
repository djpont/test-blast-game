import { DisplayObjectEvents, TextStyle } from 'pixi.js';

const blockColorNames = ['blue', 'purple', 'red', 'green', 'yellow'] as const;

const textureNames = [
  'barBackground',
  'barFill',
  'buttonBonus',
  'buttonPause',
  'buttonPink',
  'buttonPlus',
  'buttonPurple',
  'coinSmall',
  'field',
  'headerContainer',
  'panelBackground',
  'panelMoves',
  'panelScore',
  'progressContainer',
] as const;

export enum APPACTIONS {
  appResized = 'appResized',
  sceneChanged = 'resize',
}

export enum MVCACTIONS {
  propsUpdated = 'propsUpdated',
  positionUpdated = 'positionUpdated',
  scaleUpdated = 'scaleUpdated',
  alphaUpdated = 'alphaUpdated',
  valueUpdated = 'valueUpdated',
  callbackUpdated = 'callbackUpdated',
}

export enum BLOCKACTIONS {
  fieldPositionUpdated = 'fieldPositionUpdated',
  spriteUpdated = 'spriteUpdates',
}

export enum GAMEACTIONS {
  scoreUpdated = 'scoreUpdated',
  turnUpdated = 'turnUpdated',
  walletUpdated = 'walletUpdated',
}

export enum WEAPONS {
  simple = 'simple',
  bomb = 'bomb',
  horizontal = 'horizontal',
  vertical = 'vertical',
  shuffle = 'shuffle',
}

export const GAME = {
  language: 'ru',
  field: {
    width: 8,
    height: 9,
  },
  rules: {
    goal: 500,
    scoresPerBlock: 5,
    steps: 30,
    coins: 30,
  },
  block: {
    size: 172,
    head: 0.12,
    pivot: { x: 0.5, y: 0.62 },
    colors: blockColorNames,
  },
  textures: {
    names: textureNames,
  },
  animationSpeed: {
    fall: 250,
    disappearDelay: 50,
    disappear: 300,
  },
  minimumHit: 2,
  bonusPrice: {
    bomb: 20,
    shuffle: 10,
    vertical: 15,
    horizontal: 15,
  },
  textStyle: new TextStyle({
    fontFamily: 'Marvin',
    align: 'center',
    fill: '#fff',
    fontSize: '50px',
  }),
  pointerEvent: 'pointerdown' as keyof DisplayObjectEvents,
} as const;
