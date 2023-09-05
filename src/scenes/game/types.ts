import { ButtonBonus, ButtonPause, Field, Panel, ProgressBar, Wallet } from '/components';
import { TSceneSchema, TSceneComponent, TCallback } from '/shared/types';

export type TGameSceneContent = {
  progressBar: TSceneComponent<ProgressBar>;
  buttonPause: TSceneComponent<ButtonPause>;
  field: TSceneComponent<Field>;
  panel: TSceneComponent<Panel>;
  wallet: TSceneComponent<Wallet>;
  buttonBonus1: TSceneComponent<ButtonBonus>;
  buttonBonus2: TSceneComponent<ButtonBonus>;
  buttonBonus3: TSceneComponent<ButtonBonus>;
  buttonBonus4: TSceneComponent<ButtonBonus>;
};

export type TGameSceneSchema = {
  content: TGameSceneContent;
} & TSceneSchema;

export type TGameSceneCallbacks = {
  back: TCallback;
};
