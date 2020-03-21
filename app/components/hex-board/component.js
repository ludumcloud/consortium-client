import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { Tilesheet } from 'tilesheets';

export default class extends Component {
  @service pixi;

  @tracked
  sheet = null;

  constructor() {
    super(...arguments);

    let sheet = new Tilesheet('/tilesheet.png');
    sheet.setTileSize(16).setMargin(1);
    sheet.waitForLoading().then(() => (this.sheet = sheet));

    this.setup();
  }

  get grid() {
    return this.args.game.match.grid;
  }

  async setup() {
    await this.pixi.loadAssets();
    this.pixi.drawGrid(this.grid);
  }
}
