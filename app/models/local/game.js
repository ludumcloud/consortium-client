import GameModel from './base';
import Board from './board';

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
  activeTile = null;

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

  spawnPlayers() {}

  /* Public Function API */
  clickTile(tile) {
    const active = this.activeTile;
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
