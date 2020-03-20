import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class CreateController extends Controller {
  @service api;
  @service logger;
  @service session;

  size = 10;

  users = [];

  constructor() {
    super(...arguments);

    this.users.push(this.session.user);
  }

  @action
  async createBoard() {
    let match = await this.api.createMatch({
      participants: this.users,
      exponent: 3.5,
      height: parseInt(this.size, 10),
      width: parseInt(this.size, 10)
    });

    this.reset();

    this.transitionToRoute('match', match);
  }

  @action
  setSize(event) {
    this.size = event.target.value;
  }

  @action
  selectUser(user) {
    let currentUserIdx = this.users.findIndex(u => u.id === user.id);
    if (currentUserIdx > -1) {
      this.users.splice(currentUserIdx, 1);
    } else {
      this.users.push(user);
    }

    console.log(this.users);
  }

  reset() {
    this.users = [];
    this.size = 10;
  }
}
