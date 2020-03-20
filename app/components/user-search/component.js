import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { set } from '@ember/object';

export default class extends Component {
  @service api;
  @service session;

  query = '';

  @tracked
  _users = [];

  @action
  async search(value) {
    if (value.length < 3) {
      this._users = [];
      return;
    }
    this._users = await this.api.search('users', value);
  }

  @action
  selectResult(result, cb) {
    set(result, 'selected', !result.selected);

    if (cb) {
      cb(result.user);
    }
  }

  get results() {
    let users = this._users;
    return users.map(user => {
      let result = {
        user,
        selected: false
      };

      if (user.id === this.session.user.id) {
        result.selected = true;
      }

      return result;
    });
  }
}
