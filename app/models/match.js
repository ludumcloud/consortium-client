import BaseModel from './base';
import Tile from './local/tile';

export default class extends BaseModel {
  participants = null;
  __map__ = null;

  cachedGrid = null;

  get units() {
    return [
      {
        position: { x: 4, y: 8 },
        player: 1,
        type: 'infantry'
      },
      {
        position: { x: 6, y: 9 },
        player: 1,
        type: 'infantry'
      }
    ];
  }

  get improvements() {
    return [];
  }

  get size() {
    return this.grid.length;
  }

  get grid() {
    if (this.cachedGrid) {
      return this.cachedGrid;
    }
    let map = this.__map__;
    if (!map) {
      return [[]];
    }
    let { width, height } = map;
    let grid = [...new Array(height)].map(() => [...new Array(width)]);
    map.__tiles__.forEach(tile => {
      let { x, y } = tile;
      grid[y][x] = new Tile(this, tile);
    });

    this.cachedGrid = grid;

    return grid;
  }
}
