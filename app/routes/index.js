import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service api;
  @service session;

  beforeModel() {
    if (!this.session.isAuthenticated) {
      this.transitionTo('login');
    }
  }

  async model() {
    let matches = await this.api.getAllMatches();
    return matches.sort((l, r) => l.id - r.id);
  }
}
