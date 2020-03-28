import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class extends Route {
  @service api;
  @service session;

  async model(params) {
    if (!this.session.isAuthenticated) {
      this.transitionTo('login');
    }

    try {
      let match = await this.api.getMatch(params.id);
      return match;
    } catch (err) {
      this.transitionTo('login');
    }
  }
}
