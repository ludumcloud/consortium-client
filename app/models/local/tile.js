import { tracked } from '@glimmer/tracking';

import GameModel from './base';

export default class extends GameModel {
  @tracked
  _state = '';

  constructor(match, tile) {
    super();

    this.match = match;

    // Map key-value to local object
    Object.keys(tile).forEach(key => {
      this[key] = tile[key];
    });
  }

  get adjacentPoints() {
    let { x, y } = this;
    return [
      [x - 1, y - 1],
      [x, y - 1],
      [x + 1, y - 1],
      [x + 1, y],
      [x + 1, y + 1],
      [x, y + 1],
      [x - 1, y + 1],
      [x - 1, y]
    ]
      .filter(
        ([x, y]) =>
          x >= 0 && y >= 0 && x < this.match.size && y < this.match.size
      )
      .map(([x, y]) => ({ x, y }));
  }

  get isActive() {
    return this.state === 'active';
  }

  get isSecondary() {
    return this.state === 'secondary';
  }

  get state() {
    return this._state;
  }

  set state(value) {
    return (this._state = value);
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
