export const LAYOUT = {
  app: {
    width: 2540,
    height: 2120,
    backgroundColor: '#1099bb',
    pixelScale: 0.5,
  },
  panel: {
    score: {
      background: { x: 0.5, y: 0.75 },
      header: { x: 0, y: -0.235, size: '80px' },
      text: { x: 0, y: 0.115, size: '140px' },
    },
    movesLeft: {
      background: { x: 0.5, y: 0.325 },
      text: { x: 0, y: -0.03, size: '250px' },
    },
  },
  buttons: {
    weapon: {
      coin: { x: 0.69, y: 0.76 },
      price: { x: 0.57, y: 0.735, size: '90px', anchor: { x: 1, y: 0.5 } },
      title: { x: 0.5, y: 0.35, size: '50px' },
    },
  },
  progress: {
    size: 800,
    text: {
      x: 0.5,
      y: 0.47,
    },
    bar: {
      x: 0.5,
      y: 0.75,
      padding: 50,
    },
    fillPadding: {
      left: 12,
      right: 6,
      top: 5,
    },
  },
  wallet: {
    text: {
      x: 0.6,
      y: 0.4,
      size: '100px',
    },
    plus: {
      x: 0.5,
      y: 0.5,
    },
  },
  field: {
    padding: 60,
  },
} as const;
