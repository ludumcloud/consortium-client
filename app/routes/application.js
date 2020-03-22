import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class extends Route {
  @service session;

  actions = {};

  async beforeModel() {
    this.session.restoreSession();

    if (!this.session.isAuthenticated) {
      this.transitionTo('login');
    }
  }
}
