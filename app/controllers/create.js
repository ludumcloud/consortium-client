import Controller from '@ember/controller';
import { action } from "@ember/object";
import { inject as service } from '@ember/service';

export default class CreateController extends Controller {
  @service api;
  @service logger;

  size = 10;

  @action async createBoard() {
    let match = await this.api.createMatch({
      "participants": [1],
      "exponent": 3.5,
      "height": this.size,
      "width": this.size
    });
<<<<<<< HEAD
    this.logger.log("Created match", match);
=======
    this.transitionToRoute('match', match);
  }

  @action setSize(event) {
    this.size = event.target.value;
>>>>>>> 13eec8642587ee2989311a0b61b13895a04c24c9
  }
}
