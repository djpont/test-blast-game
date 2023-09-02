import { GAME } from '/shared/constants';

const localizationNames = [
  'title',
  'loading',
  'score',
  'bomb',
  'superVertical',
  'superHorizontal',
  'progress',
] as const;

type TLocalization = {
  [key in (typeof localizationNames)[number]]: string;
};

const english: TLocalization = {
  title: 'Blast Game Prototype',
  loading: 'Loading',
  score: 'Score',
  bomb: 'Bomb',
  superVertical: 'Vertical',
  superHorizontal: 'Horizontal',
  progress: 'Progress',
};

const russian: TLocalization = {
  title: 'Blast Game Прототип',
  loading: 'Загрузка',
  score: 'Очки',
  bomb: 'Бомба',
  superVertical: 'Вертик.',
  superHorizontal: 'Гориз.',
  progress: 'Прогресс',
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
