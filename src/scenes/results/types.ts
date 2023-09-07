import { Button, Text } from '/components';
import type { TSceneSchema, TSceneComponent, TCallback } from '/shared/types';

export type TResultsSceneContent = {
  result: TSceneComponent<Text>;
  score: TSceneComponent<Text>;
  steps: TSceneComponent<Text>;
  repeatButton: TSceneComponent<Button>;
  closeButton: TSceneComponent<Button>;
};

export type TResultsSceneSchema = {
  content: TResultsSceneContent;
} & TSceneSchema;

export type TResultsSceneCallbacks = {
  close: TCallback;
  repeat: TCallback;
};
