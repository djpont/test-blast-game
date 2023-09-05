import { Button, Text } from '/components';
import { TSceneSchema, TSceneComponent, TCallback } from '/shared/types';

export type TSecondSceneContent = {
  label: TSceneComponent<Text>;
  backButton: TSceneComponent<Button>;
};

export type TSecondSceneSchema = {
  content: TSecondSceneContent;
} & TSceneSchema;

export type TSecondSceneCallbacks = {
  back: TCallback;
};
