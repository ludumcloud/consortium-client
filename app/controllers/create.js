import Controller from '@ember/controller';
import { action } from "@ember/object";
import { inject as service } from '@ember/service';

export default class CreateController extends Controller {
  @service api;
  @service logger;

  @action
  async createBoard() {
    let match = await this.api.createMatch({
      "participants": [1],
      "exponent": 3.5,
      "height": 30,
      "width": 30
    });
    this.logger.log("Created match", match);
  }
}
