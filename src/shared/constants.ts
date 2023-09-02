// import { TSuperPower } from '/shared/types';
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

export enum ANIMATIONS {
  disappearing = 'disappearing',
  falling = 'falling',
}

export enum UIACTIONS {
  propsUpdated = 'propsUpdated',
  valueUpdated = 'valueUpdated',
  callbackUpdated = 'callbackUpdated',
}

export enum BLOCKACTIONS {
  updated = 'updated',
  recreated = 'recreated',
  falling = 'falling',
}

export enum WEAPONS {
  simple = 'simple',
  bomb = 'bomb',
  horizontal = 'horizontal',
  vertical = 'vertical',
}

const gameInitialConstants = {
  language: 'ru',
  field: {
    width: 10,
    height: 10,
  },
  block: {
    size: 172,
    head: 0.12,
    newGap: 0,
    pivot: { x: 0.5, y: 0.5 },
    colors: blockColorNames,
  },
  textures: {
    names: textureNames,
  },
  animationSpeed: {
    fall: 0.1,
    scale: 0.03,
    opacity: 0.05,
    disappearDelay: 50,
  },
  minimumHit: 2,
  textStyle: new TextStyle({
    fontFamily: 'Marvin',
    align: 'center',
    fill: '#fff',
    fontSize: '50px',
  }),
  pointerEvent: 'pointerdown' as keyof DisplayObjectEvents,
};

export const GAME = {
  ...gameInitialConstants,
  setNewGap: (value: number) => {
    gameInitialConstants.block.newGap = value;
  },
};
