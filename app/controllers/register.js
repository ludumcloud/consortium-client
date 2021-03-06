import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

function isEmpty(value) {
  return value === undefined || value === null || value.length === 0;
}

export default class extends Controller {
  @service api;
  @service logger;

  @tracked email = '';
  @tracked username = '';
  @tracked password = '';
  @tracked passwordConfirm = '';

  @action
  async createAccount(event) {
    event.preventDefault();

    if (!this.isValid) {
      this.logger.error('Form invalid');
      return;
    }

    this.logger.log('create', {
      email: this.email,
      username: this.username,
      password: this.password,
      passwordConfirm: this.passwordConfirm
    });

    try {
      await this.api.signup({
        name: this.username,
        email: this.email,
        username: this.username,
        password: this.password
      });

      this.reset();

      this.transitionToRoute('index');
    } catch (e) {
      this.logger.error('Signup error:', e);
    }
  }

  get isValid() {
    return (
      !isEmpty(this.username) &&
      !isEmpty(this.email) &&
      !isEmpty(this.password) &&
      this.password === this.passwordConfirm
    );
  }

  reset() {
    this.email = '';
    this.username = '';
    this.password = '';
    this.passwordConfirm = '';
  }
}
