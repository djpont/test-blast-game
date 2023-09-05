import { Button, Text } from '/components';
import { TSceneSchema, TSceneComponent, TCallback } from '/shared/types';

export type TIntroSceneContent = {
  textTitle: TSceneComponent<Text>;
  startButton: TSceneComponent<Button>;
  secondButton: TSceneComponent<Button>;
};

export type TIntroSceneSchema = {
  content: TIntroSceneContent;
} & TSceneSchema;

export type TIntroSceneCallbacks = {
  startGame: TCallback;
  secondMenu: TCallback;
};
