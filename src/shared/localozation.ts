import { GAME } from '/shared/constants';

const localizationNames = [
  'title',
  'loading',
  'score',
  'bonusBomb',
  'bonusVertical',
  'bonusHorizontal',
  'bonusShuffle',
  'progress',
  'startGame',
] as const;

type TLocalization = {
  [key in (typeof localizationNames)[number]]: string;
};

const english: TLocalization = {
  title: 'Blast Game Prototype',
  loading: 'Loading',
  score: 'Score',
  bonusBomb: 'Bomb',
  bonusVertical: 'Vertical',
  bonusHorizontal: 'Horizontal',
  bonusShuffle: 'Shuffle',
  progress: 'Progress',
  startGame: 'Start game',
};

const russian: TLocalization = {
  title: 'Blast Game Прототип',
  loading: 'Загрузка',
  score: 'Очки',
  bonusBomb: 'Бомба',
  bonusVertical: 'Вертик.',
  bonusHorizontal: 'Гориз.',
  bonusShuffle: 'Перемешка',
  progress: 'Прогресс',
  startGame: 'Начать игру',
};

const selectLocalization = (): TLocalization => {
  switch (GAME.language.toString()) {
    case 'ru':
    default:
      return russian;
    case 'en':
      return english;
  }
};

export const Localization = {
  text: selectLocalization(),
} as const;
