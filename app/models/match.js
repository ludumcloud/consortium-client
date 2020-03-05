import Model, { attr } from "@ember-data/model";

export default class MatchModel extends Model {
  @attr participants;
  @attr __map__;

  cachedGrid = null;

  get size() {
    return this.grid.length;
  }

  get grid() {
    if (this.cachedGrid) {
      return this.cachedGrid;
    }
    let map = this.__map__;
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
