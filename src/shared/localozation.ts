import { GAME } from '/shared/constants';

const localizationNames = ['title', 'loading'] as const;

type TLocalization = {
  [key in (typeof localizationNames)[number]]: string;
};

const english: TLocalization = {
  title: 'Blast Game Prototype',
  loading: 'Loading',
};

const russian: TLocalization = {
  title: 'Blast Game Прототип',
  loading: 'Загрузка',
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

export const BlastLocalization = {
  text: selectLocalization(),
} as const;
