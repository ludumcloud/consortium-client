import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { later } from '@ember/runloop';

export default class extends Component {
  @service logger;

  @tracked
  tileClass = null;

  constructor() {
    super(...arguments);

    this.setTileClass();

    // Lets animate water...
    // if (this.args.tile.biome === 'ocean') {
    //   this.animateOceanTile();
    // }
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

    let tileClass = 'grass-1';

    if (landform === 'plain') {
      if (biome === 'forest') {
        tileClass = 'tree-grass-3';
      } else {
        tileClass = 'grass-1';
      }
      // tileClass = 'grass-1';
      // if (tile.isEdge) {
      //   if (tile.isTopEdge) {
      //     tileClass = 'grass-edge-top';

      //     if (tile.isLeftEdge) {
      //       tileClass = 'grass-edge-top-left';
      //     } else if (tile.isRightEdge) {
      //       tileClass = 'grass-edge-top-right';
      //     }
      //   } else if (tile.isBottomEdge) {
      //     tileClass = 'grass-edge-bottom';
      //     if (tile.isLeftEdge) {
      //       tileClass = 'grass-edge-bottom-left';
      //     } else if (tile.isRightEdge) {
      //       tileClass = 'grass-edge-bottom-right';
      //     }
      //   } else if (tile.isLeftEdge) {
      //     tileClass = 'grass-edge-left';
      //   } else if (tile.isRightEdge) {
      //     tileClass = 'grass-edge-right';
      //   }
      // }
    } else if (landform === 'depression') {
      if (!biome || biome === 'beach') {
        tileClass = 'sand-1';
        // if (tile.isEdge) {
        //   if (tile.isTopEdge) {
        //     tileClass = 'sand-edge-top';

        //     if (tile.isLeftEdge) {
        //       tileClass = 'sand-edge-top-left';
        //     } else if (tile.isRightEdge) {
        //       tileClass = 'sand-edge-top-right';
        //     }
        //   } else if (tile.isBottomEdge) {
        //     tileClass = 'sand-edge-bottom';
        //     if (tile.isLeftEdge) {
        //       tileClass = 'sand-edge-bottom-left';
        //     } else if (tile.isRightEdge) {
        //       tileClass = 'sand-edge-bottom-right';
        //     }
        //   } else if (tile.isLeftEdge) {
        //     tileClass = 'sand-edge-left';
        //   } else if (tile.isRightEdge) {
        //     tileClass = 'sand-edge-right';
        //   }
        // }
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

  animateOceanTile() {
    let order = [
      'tile-water-1',
      'tile-water-2'
      // 'tile-water-3',
      // 'tile-water-4'
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
