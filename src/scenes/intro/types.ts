import { Button, Text } from '/components';
import type { TSceneSchema, TSceneComponent, TCallback } from '/shared/types';

export type TIntroSceneContent = {
  textTitle: TSceneComponent<Text>;
  startButton: TSceneComponent<Button>;
};

export type TIntroSceneSchema = {
  content: TIntroSceneContent;
} & TSceneSchema;

export type TIntroSceneCallbacks = {
  startGame: TCallback;
};
