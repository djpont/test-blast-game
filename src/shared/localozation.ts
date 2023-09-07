import { GAME } from '/shared/constants';

const localizationNames = [
  'title',
  'loading',
  'score',
  'steps',
  'bonusBomb',
  'bonusVertical',
  'bonusHorizontal',
  'bonusShuffle',
  'progress',
  'startGame',
  'repeat',
  'close',
  'win',
  'loose',
] as const;

type TLocalization = {
  [key in (typeof localizationNames)[number]]: string;
};

const english: TLocalization = {
  title: 'Blast Game',
  loading: 'Loading',
  score: 'Score',
  steps: 'Moves left',
  bonusBomb: 'Bomb',
  bonusVertical: 'Vertical',
  bonusHorizontal: 'Horizontal',
  bonusShuffle: 'Shuffle',
  progress: 'Progress',
  startGame: 'Start game',
  repeat: 'Play again',
  close: 'Close',
  win: 'Level completed!',
  loose: 'Try again :(',
};

const russian: TLocalization = {
  title: 'Blast Game',
  loading: 'Загрузка',
  score: 'Очки',
  steps: 'Шагов осталось',
  bonusBomb: 'Бомба',
  bonusVertical: 'Вертик.',
  bonusHorizontal: 'Гориз.',
  bonusShuffle: 'Перемешка',
  progress: 'Прогресс',
  startGame: 'Начать игру',
  repeat: 'Играть заново',
  close: 'Закрыть',
  win: 'Уровень пройден',
  loose: 'Попробуйте снова :(',
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
