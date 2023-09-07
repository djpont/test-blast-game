export const blockColorNames = ['blue', 'purple', 'red', 'green', 'yellow'] as const;

export const textureNames = [
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
