import { TSuperPower } from '/shared/types';
import { TextStyle } from 'pixi.js';

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

export enum POWERUPSCOLORS {
  super = '#ffffff',
}

export enum POWERUPS {
  super = 'super',
}

export enum WEAPONS {
  simple = 'simple',
  bomb = 'bomb',
  horizontal = 'horizontal',
  vertical = 'vertical',
}

const powerUps: Record<POWERUPS, TSuperPower> = {
  [POWERUPS.super]: {
    minLimit: 999,
    color: POWERUPSCOLORS.super,
    weapon: WEAPONS.bomb,
  },
} as const;

export const GAME = {
  language: 'ru',
  field: {
    width: 5,
    height: 5,
  },
  block: {
    size: Math.floor(172 / 2),
    head: 0.12,
    pivot: { x: 0.5, y: 0.5 },
    newGap: 0.12,
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
  powerUps: powerUps,
  weapons: {
    [WEAPONS.bomb]: {
      length: 1,
    },
  },
  textStyle: new TextStyle({
    fontFamily: 'Marvin',
    align: 'center',
    fill: '#fff',
    fontSize: '50px',
  }),
  pointerEvent: 'pointerdown',
} as const;

export const LAYOUT = {
  panel: {
    score: {
      background: { x: 0.5, y: 0.75 },
      header: { x: 0, y: -0.235, size: '80px' },
      text: { x: 0, y: 0.115, size: '140px' },
    },
    movesLeft: {
      background: { x: 0.5, y: 0.325 },
      text: { x: 0, y: -0.03, size: '250px' },
    },
  },
  buttons: {
    weapon: {
      coin: { x: 0.69, y: 0.76 },
      price: { x: 0.57, y: 0.735, size: '90px', anchor: { x: 1, y: 0.5 } },
      title: { x: 0.5, y: 0.35, size: '50px' },
    },
  },
  progress: {
    size: 800,
    text: {
      x: 0.5,
      y: 0.47,
    },
    bar: {
      x: 0.5,
      y: 0.75,
      padding: 50,
    },
    fillPadding: {
      left: 12,
      right: 6,
      top: 5,
    },
  },
  wallet: {
    text: {
      x: 0.6,
      y: 0.4,
      size: '100px',
    },
    plus: {
      x: 0.5,
      y: 0.5,
    },
  },
} as const;
