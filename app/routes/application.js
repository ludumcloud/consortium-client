import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class extends Route {
  @service session;

  async beforeModel(transition) {
    this.session.restoreSession();

    try {
      await this.session.info();
      if (
        transition.targetName === 'login' ||
        transition.targetName === 'register'
      ) {
        this.transitionTo('index');
      }
    } catch (_) {
      this.session.logout();
      this.transitionTo('login');
    }

    if (!this.session.isAuthenticated) {
      this.transitionTo('login');
    }
  }
}
