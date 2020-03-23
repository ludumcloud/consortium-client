import GameModel from './base';

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
  activeHex = null;

  constructor(match) {
    super();

    this.id = match.id;
    this.players = [];
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
  clickHex(hex) {
    const active = this.get('activeHex');
    if (active !== hex) {
      this.deactivateHex(active);
      this.activateHex(hex);
      this.activeHex = hex;
    } else {
      this.deactivateHex(hex);
      this.activeHex = null;
    }
  }

  activateHex(hex) {
    if (hex) {
      hex.state = 'active';
      hex.coord.adjacentCoords().forEach(coord => {
        const adjacentHex = this.board.lookupHex(coord);
        if (adjacentHex) {
          adjacentHex.state = 'secondary';
        }
      });
    }
  }

  deactivateHex(hex) {
    if (hex) {
      hex.state = null;
      hex.coord.adjacentCoords().forEach(coord => {
        const adjacentHex = this.board.lookupHex(coord);
        if (adjacentHex) {
          adjacentHex.state = 'null';
        }
      });
    }
  }

  lookupHex(coord) {
    return this.board.lookupHex(coord);
  }
}
