import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class extends Component {
  @service logger;

  @tracked
  tileClass = null;

  game = null;
  tile = null;

  constructor() {
    super(...arguments);

    this.game = this.args.game;
    this.tile = this.args.tile;

    this.setTileClass();
  }

  get type() {
    // Weird api bug
    return this.tile.biome ? this.tile.biome.toLowerCase() : 'beach';
  }

  @action
  selectTile() {
    this.game.clickTile(this.tile);
  }

  setTileClass() {
    let tile = this.args.tile;
    let landform = tile.landform.toLowerCase();

    // Weird bug in the server for old matches
    let biome = tile.biome && tile.biome.toLowerCase();

    let tileClass = 'grass-1';

    if (landform === 'plain') {
      if (biome === 'forest') {
        tileClass = 'tree-grass-3';
      } else {
        tileClass = 'grass-1';
      }
    } else if (landform === 'depression') {
      if (!biome || biome === 'beach') {
        tileClass = 'sand-1';
      } else {
        tileClass = 'water-1';
      }
    } else if (landform === 'mountain') {
      if (biome === 'bare') {
        tileClass = 'grass-hills';
      } else {
        tileClass = 'snow-1';
      }
    }

    this.tileClass = `tile-${tileClass}`;
  }
}
