import { TSuperPower } from '/shared/types';

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

export enum BLOCKACTIONS {
  updated = 'updated',
  recreated = 'recreated',
  falling = 'falling',
}

export enum FIELDACTIONS {
  updated = 'updated',
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
};

export const GAME = {
  language: 'ru',
  field: {
    width: 10,
    height: 9,
  },
  block: {
    size: Math.floor(172 / 4),
    head: 0.12,
    pivot: { x: 0.5, y: 0.5 },
    newGap: 0.12,
    colors: blockColorNames,
  },
  textures: {
    names: textureNames,
  },
  animationSpeed: {
    fall: 0.075,
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
} as const;
