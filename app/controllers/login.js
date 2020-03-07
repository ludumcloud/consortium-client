import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

function isEmpty(value) {
  return value === undefined || value === null || value.length === 0;
}

export default class extends Controller {
  @service logger;
  @service session;

  @tracked email = '';
  @tracked password = '';

  @action
  async createAccount(event) {
    event.preventDefault();

    if (!this.isValid) {
      this.logger.error('Form invalid');
      return;
    }

    try {
      await this.session.login({
        email: this.email,
        password: this.password
      });

      this.reset();

      this.transitionToRoute('index');
    } catch (e) {
      this.logger.error('Login error:', e);
    }
  }

  get isValid() {
    return !isEmpty(this.email) && !isEmpty(this.password);
  }

  reset() {
    this.email = '';
    this.password = '';
  }
}
