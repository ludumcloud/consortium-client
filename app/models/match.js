import BaseModel from './base'

export default class extends BaseModel {
  participants = null;
  __map__ = null;

  cachedGrid = null;

  get size() {
    return this.grid.length;
  }

  get grid() {
    if (this.cachedGrid) {
      return this.cachedGrid;
    }
    let map = this.__map__;
    if (!map) {
      return [ [] ];
    }
    let { width, height } = map;
    let grid = [...new Array(height)].map(() => [...new Array(width)]);
    map.__tiles__.forEach(tile => {
      let { x, y } = tile;
      grid[y][x] = tile;
    });

    this.cachedGrid = grid;

    return grid;
  }
}
