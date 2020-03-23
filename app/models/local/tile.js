import GameModel from './base';

export default class extends GameModel {
  constructor(match, tile) {
    super();

    this.match = match;

    // Map key-value to local object
    Object.keys(tile).forEach(key => {
      this[key] = tile[key];
    });
  }

  get isEdge() {
    return (
      this.x === 0 ||
      this.y === 0 ||
      this.x === this.match.size - 1 ||
      this.y === this.match.size - 1
    );
  }

  get isTopEdge() {
    return this.y === 0;
  }

  get isRightEdge() {
    return this.x === this.match.size - 1;
  }

  get isBottomEdge() {
    return this.y === this.match.size - 1;
  }

  get isLeftEdge() {
    return this.x === 0;
  }
}
