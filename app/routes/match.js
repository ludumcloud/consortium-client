import Route from "@ember/routing/route";
import { inject as service } from '@ember/service';

export default class extends Route {
  @service api;
  async model(params) {
    return this.api.getMatch(params.id);
  }
}
