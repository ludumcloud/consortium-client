import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class extends Controller {
  @service api;
  @service logger;

  @tracked name = '';
  @tracked email = '';
  @tracked password = '';
  @tracked passwordConfirm = '';

  @action
  async createAccount(event) {
    event.preventDefault();

    this.logger.log('create', {
      name: this.name,
      email: this.email,
      password: this.password,
      passwordConfirm: this.passwordConfirm
    });

    // do api save...
    this.reset();
  }

  reset() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.passwordConfirm = '';
  }
}
