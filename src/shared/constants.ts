import { DisplayObjectEvents, TextStyle } from 'pixi.js';
import { blockColorNames, textureNames } from './enums';

export const GAME = {
  language: 'ru', // Язык (eu, en)
  field: {
    // Размеры игрового поля
    width: 8,
    height: 9,
  },
  rules: {
    // Правила и условия победы
    goal: 500,
    scoresPerBlock: 5,
    steps: 30,
    coins: 30,
  },
  bonusPrice: {
    // Стоимость бонусов
    bomb: 20,
    shuffle: 10,
    vertical: 15,
    horizontal: 15,
  },
  minimumHit: 2, // Минимальное кол-во блоков для успешного клика
  block: {
    // Параметры блока (для правильного соотношени граней блока)
    size: 172,
    head: 0.12,
    pivot: { x: 0.5, y: 0.62 },
    colors: blockColorNames,
  },
  animationSpeed: {
    // Длительность анимация в мс
    fall: 250,
    disappearDelay: 50,
    disappear: 300,
  },
  textures: {
    names: textureNames,
  },
  textStyle: new TextStyle({
    fontFamily: 'Marvin',
    align: 'center',
    fill: '#fff',
    fontSize: '50px',
  }),
  pointerEvent: 'pointerdown' as keyof DisplayObjectEvents,
} as const;
