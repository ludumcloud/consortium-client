import GameModel from './base';

export default class extends GameModel {
  grid = null;

  constructor(grid) {
    super();

    this.grid = grid;
  }

  lookupTile(x, y) {
    const grid = this.grid;

    if (grid && grid[y]) {
      return grid[y][x];
    }

    return null;
  }

  adjacentTiles(tile) {
    return tile.adjacentPoints
      .map(({ x, y }) => {
        return this.lookupTile(x, y);
      })
      .filter(tile => tile !== null);
  }
}
