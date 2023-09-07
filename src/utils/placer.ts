import type { TPosition, TSize } from '/shared/types';
import { Container, Graphics, NineSlicePlane, Sprite, Text } from 'pixi.js';

type TLayout = {
  anchor?: Partial<TPosition>;
} & Partial<TPosition>;

const locate = (
  element: Container | Sprite | Text | NineSlicePlane,
  parent: Container,
  layout: TLayout = undefined,
): void => {
  if (layout) {
    if (layout.anchor) {
      if (element instanceof Sprite || element instanceof Text) {
        element.anchor.set(layout.anchor.x, layout.anchor.y);
      } else {
        element.pivot.set(element.width * layout.anchor.x, element.height * layout.anchor.y);
      }
    }
    if (layout.x) element.position.x = parent.width * layout.x;
    if (layout.y) element.position.y = parent.height * layout.y;
  }
  parent.addChild(element);
};

const locateByCenter = (
  element: Container | Sprite | Text,
  parent: Container,
  layout: TLayout = undefined,
): void => {
  const newLayout = {
    x: (layout && layout.x) ?? 0.5,
    y: (layout && layout.y) ?? 0.5,
    anchor: { x: 0.5, y: 0.5 },
  };
  locate(element, parent, newLayout);
};

const locateInsideAndScale = (
  element: Container,
  parent: Container,
  padding: number = 0,
): number => {
  const scaleDiffX = element.width / (parent.width - padding * 2);
  const scaleDiffY = element.height / (parent.height - padding * 2);
  const scaleDiff = Math.max(scaleDiffX, scaleDiffY);
  element.scale.x /= scaleDiff;
  element.scale.y /= scaleDiff;
  element.position.x = (parent.width - element.width) / 2;
  element.position.y = (parent.height - element.height) / 2;
  parent.addChild(element);
  return scaleDiff;
};

const addMask = (
  container: Container,
  size: TSize = undefined,
  addCorners: boolean = false,
): void => {
  if (addCorners && size) {
    const containerCorners = new Graphics();
    const ccsize = 0; // Увеличить для видимости углов контейнера
    containerCorners.beginFill('#fff');
    containerCorners.drawRect(0, 0, ccsize, ccsize);
    containerCorners.drawRect(0, size.height - ccsize, ccsize, ccsize);
    containerCorners.drawRect(size.width - ccsize, 0, ccsize, ccsize);
    containerCorners.drawRect(size.width - ccsize, size.height - ccsize, ccsize, ccsize);
    containerCorners.endFill();
    container.addChild(containerCorners);
  }

  const mask = new Graphics();
  mask.beginFill(0xffffff);
  mask.drawRect(0, 0, size ? size.width : container.width, size ? size.height : container.height);
  mask.endFill();
  container.mask = mask;
  container.addChild(mask);
};

const addBackground = (container: Container, color: string): void => {
  const containerCorners = new Graphics();
  containerCorners.beginFill(color);
  containerCorners.drawRect(0, 0, container.width, container.height);
  containerCorners.endFill();
  container.addChild(containerCorners);
};

export const Placer = {
  locate,
  locateByCenter,
  locateInsideAndScale,
  addMask,
  addBackground,
};
