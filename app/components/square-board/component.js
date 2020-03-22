import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class extends Component {
  @service logger;

  constructor() {
    super(...arguments);

    this.logger.log(this.args.game);
  }

  get grid() {
    return this.args.game.match.grid;
  }
}
