import { GAME } from '/shared/constants';
import { Assets, Texture } from 'pixi.js';

const spritesSheetJson = '/sprites/sheet.json';

type TBlocks = {
  [key in (typeof GAME.block.colors)[number]]: Texture;
};

type TTextures = {
  [key in (typeof GAME.textures.names)[number]]: Texture;
};

type TCached = {
  blocks: TBlocks;
  textures: TTextures;
};

const cached = {
  blocks: {},
  textures: {},
};

const loadTextures = async () => {
  return new Promise(resolve => {
    Assets.load([spritesSheetJson])
      .then(async data => {
        await Object.values(data).forEach(sheet => sheet.parse());
      })
      .then(() => {
        saveLoadedTextures();
        resolve(true);
      });
  });
};

const saveLoadedTextures = (): void => {
  const newBlocks: Partial<TBlocks> = {};
  GAME.block.colors.forEach(name => {
    newBlocks[name] = Assets.cache.get(`block.${name}.png`);
  });
  cached.blocks = newBlocks as TBlocks;

  const newTextures: Partial<TTextures> = {};
  GAME.textures.names.forEach(name => {
    newTextures[name] = Assets.cache.get(`${name}.png`);
  });
  cached.textures = newTextures as TTextures;
};

export const Textures = {
  loadTextures,
  cached: cached as TCached,
};
