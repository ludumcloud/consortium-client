import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class CreateController extends Controller {
  @service api;
  @service logger;

  size = 10;

  @action
  async createBoard() {
    let match = await this.api.createMatch({
      participants: [1],
      exponent: 3.5,
      height: parseInt(this.size, 10),
      width: parseInt(this.size, 10)
    });
    this.transitionToRoute('match', match);
  }

  @action setSize(event) {
    this.size = event.target.value;
  }
}
