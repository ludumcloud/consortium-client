import Component from '@glimmer/component';

export default class extends Component {
  constructor() {
    super(...arguments);

    this.unit = this.args.unit;
    this.game = this.args.game;
    this.tile = this.args.tile;
  }
}
