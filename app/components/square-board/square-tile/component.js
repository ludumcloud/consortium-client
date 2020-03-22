import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { later } from '@ember/runloop';

export default class extends Component {
  @tracked
  tileClass = null;

  constructor() {
    super(...arguments);

    this.setTileClass();

    // Lets animate water...
    if (this.args.tile.biome === 'ocean') {
      this.animateOceanTile();
    }
  }

  get type() {
    // Weird api bug
    return this.args.tile.biome ? this.args.tile.biome.toLowerCase() : 'beach';
  }

  setTileClass() {
    let tile = this.args.tile;
    let landform = tile.landform.toLowerCase();

    // Weird bug in the server for old matches
    let biome = tile.biome && tile.biome.toLowerCase();

    let tileClass = 'grass';

    if (landform === 'plain') {
      tileClass = 'grass';
    } else if (landform === 'depression') {
      if (!biome || biome === 'beach') {
        tileClass = 'sand';
      } else {
        tileClass = 'water-1';
      }
    } else if (landform === 'mountain') {
      if (biome === 'bare') {
        tileClass = 'stone';
      } else {
        tileClass = 'snow';
      }
    }

    this.tileClass = `tile-${tileClass}`;
  }

  animateOceanTile() {
    let order = [
      'tile-water-1',
      'tile-water-2',
      'tile-water-3',
      'tile-water-4'
    ];
    function changeTile() {
      let idx = order.indexOf(this.tileClass) + 1;
      if (idx === order.length) {
        idx = 0;
      }
      this.tileClass = order[idx];
      later(changeTile.bind(this), 1000);
    }
    later(changeTile.bind(this), 1000);
  }
}
