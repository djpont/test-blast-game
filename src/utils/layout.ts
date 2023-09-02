import { TPosition } from '/shared/types';
import { Container, NineSlicePlane, Sprite, Text } from 'pixi.js';

type TLayout = {
  anchor?: Partial<TPosition>;
} & Partial<TPosition>;

const locateByCenter = (
  element: Container | Sprite | Text,
  parent: Container,
  layout: TLayout = undefined,
) => {
  const newLayout = {
    x: (layout && layout.x) ?? 0.5,
    y: (layout && layout.y) ?? 0.5,
    anchor: { x: 0.5, y: 0.5 },
  };
  locate(element, parent, newLayout);
};

const locate = (
  element: Container | Sprite | Text | NineSlicePlane,
  parent: Container,
  layout: TLayout = undefined,
) => {
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

export const Layout = {
  locate,
  locateByCenter,
};
