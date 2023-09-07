import { ButtonBonus, ButtonPause, Field, Panel, ProgressBar, Wallet } from '/components';
import type { TSceneSchema, TSceneComponent, TCallback, TGameResult } from '/shared/types';

export type TGameSceneContent = {
  progressBar: TSceneComponent<ProgressBar>;
  buttonPause: TSceneComponent<ButtonPause>;
  field: TSceneComponent<Field>;
  panel: TSceneComponent<Panel>;
  wallet: TSceneComponent<Wallet>;
  buttonBonusBomb: TSceneComponent<ButtonBonus>;
  buttonBonusShuffle: TSceneComponent<ButtonBonus>;
  buttonBonusVertical: TSceneComponent<ButtonBonus>;
  buttonBonusHorizontal: TSceneComponent<ButtonBonus>;
};

export type TGameSceneSchema = {
  content: TGameSceneContent;
} & TSceneSchema;

export type TGameSceneCallbacks = {
  back: TCallback;
  results: TCallback<TGameResult>;
};
