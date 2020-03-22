import Service from '@ember/service';
import Pixi from 'pixi.js';
import { Promise, resolve } from 'rsvp';

function cellTexture(textures, cell) {
  let type = 'dirt';
  let landform = cell.landform.toLowerCase();
  let biome = cell.biome.toLowerCase();
  if (landform === 'mountain') {
    if (biome === 'bare') {
      type = 'stone';
    } else if (biome === 'tundra') {
      type = 'snow';
    } else {
      type = 'mountain';
    }
  } else if (landform === 'depression') {
    if (biome === 'ocean') {
      type = 'water';
    } else {
      type = 'sand';
    }
  } else if (landform === 'plain') {
    type = 'grass';
  } else if (landform === 'hill') {
    type = 'autumn';
  }

  return textures[`${type}-half.png`];
}

export default class extends Service {
  _loadedAssets = false;

  /**
   * @type Pixi.Application
   */
  app = null;

  constructor() {
    super(...arguments);

    let app = new Pixi.Application({
      width: 1024,
      height: 1024,
      transparent: true
    });

    this.app = app;
  }

  loadAssets() {
    if (this._loadedAssets) {
      return resolve();
    }
    return new Promise(resolve => {
      this.app.loader
        .add('grid', '/tiles/grid.png')
        .add('spritesheet', '/tiles/grid.json')
        .load((loader, resources) => {
          this._loadedAssets = true;

          this.app.resources = resources;
          resolve();
        });
    });
  }

  drawGrid(grid) {
    let spritesheet = this.app.resources.spritesheet;

    grid.forEach((row, idx) => {
      let rowContainer = new Pixi.Container();
      row.forEach(cell => {
        let sprite = Pixi.Sprite.from(cellTexture(spritesheet.textures, cell));
        sprite.interactive = true;
        sprite
          .on('pointerover', () => {
            sprite.alpha = 0.9;
          })
          .on('pointerout', () => {
            sprite.alpha = 1.0;
          });
        sprite.x = cell.x * sprite.width;

        rowContainer.addChild(sprite);
      });

      let width = 64;
      let height = 90;

      rowContainer.x = rowContainer.x + width / 2;
      rowContainer.y = idx * rowContainer.height - idx * (height / 2.5);
      if (idx % 2 === 1) {
        rowContainer.x = rowContainer.x + width / 2;
      }

      this.app.stage.addChild(rowContainer);
    });
  }
}
