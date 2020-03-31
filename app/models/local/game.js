import GameModel from './base';
import Board from './board';
import { tracked } from '@glimmer/tracking';

// eslint-disable-next-line no-unused-vars
const sizes = {
  square: {
    small: 10,
    medium: 20,
    large: 40
  },
  hexagon: {
    small: 11,
    medium: 23,
    large: 47
  },
  random: {
    small: 11,
    medium: 22,
    large: 44
  }
};

export default class extends GameModel {
  /* Public Properties API */
  id = null;
  board = null;
  players = null;
  match = null;

  @tracked
  activeTile = null;

  @tracked
  activeUnit = null;

  _units = null;

  constructor(match) {
    super();

    this.id = match.id;
    this.players = [];
    this.board = new Board(match.grid);

    this.match = match;
    this.match.game = this;
  }

  get size() {
    return this.match.size;
  }

  get phase() {
    return {
      gamePhase: 'gameStart',
      activePlayer: null,
      activePlayerIndex: null,
      turn: 0
    };
  }

  get units() {
    if (this._units) {
      return this._units;
    }
    // Quicker lookup...
    let units = this.match.units.reduce((acc, unit) => {
      let containerPosition = `x${unit.position.x}y${unit.position.y}`;
      if (!acc[containerPosition]) {
        acc[containerPosition] = [];
      }
      acc[containerPosition].push(unit);
      return acc;
    }, {});
    this._units = units;
    return this._units;
  }

  spawnPlayers() {}

  tileUnits(tile) {
    return this.units[`x${tile.x}y${tile.y}`];
  }

  clickUnit(unit) {
    let active = this.activeUnit;
    if (active !== unit) {
      this.activeUnit = unit;
    } else {
      this.activeUnit = null;
    }
  }

  clickTile(tile) {
    const active = this.activeTile;

    if (!this.tileUnits(tile)) {
      this.activeUnit = null;
    }

    if (active !== tile) {
      this.deactivateTile(active);
      this.activateTile(tile);
      this.activeTile = tile;
    } else {
      this.deactivateTile(tile);
      this.activeTile = null;
    }
  }

  activateTile(tile) {
    if (tile) {
      tile.state = 'active';
      this.board.adjacentTiles(tile).forEach(tile => {
        tile.state = 'secondary';
      });
    }
  }

  deactivateTile(tile) {
    if (tile) {
      tile.state = null;
      this.board.adjacentTiles(tile).forEach(tile => {
        tile.state = null;
      });
    }
  }

  lookupTile(coord) {
    return this.board.lookupTile(coord);
  }
}
