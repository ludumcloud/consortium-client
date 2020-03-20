import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class extends Component {
  @service api;

  query = '';

  @tracked
  users = [];

  @action
  async search(value) {
    if (value.length < 3) {
      this.users = [];
      return;
    }
    this.users = await this.api.search('users', value);
  }
}
