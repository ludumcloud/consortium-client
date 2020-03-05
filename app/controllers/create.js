import Controller from '@ember/controller';
import { action } from "@ember/object";

export default class CreateController extends Controller {
  @action createBoard() {
    console.log('CREATE');
    let newMatch = this.store.createRecord("match", {
      "participants": [1],
      "exponent": 3.5,
      "height": 30,
      "width": 30
    });
    newMatch.save();
  }
}
