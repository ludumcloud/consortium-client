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

  setTileClass() {
    let tile = this.args.tile;
    let landform = tile.landform.toLowerCase();

    // Weird bug in the server for old matches
    let biome =
      landform === 'depression' && !tile.biome
        ? 'beach'
        : tile.biome.toLowerCase();

    let tileClass = 'grass-iso';

    if (landform === 'plain') {
      tileClass = 'grass-iso';
    } else if (landform === 'depression') {
      if (biome === 'beach') {
        tileClass = 'sand-iso';
      }
      tileClass = 'water-1';
    } else if (landform === 'mountain') {
      if (biome === 'bare') {
        tileClass = 'stone-iso';
      }

      tileClass = 'snow-iso';
    }

    this.tileClass = tileClass;
  }

  animateOceanTile() {
    let order = ['water-1', 'water-2', 'water-3', 'water-4'];
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
