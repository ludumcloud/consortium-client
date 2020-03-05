import RESTAdapter from "@ember-data/adapter/rest";
import { inject as service} from '@ember/service';


export default class MatchAdapter extends RESTAdapter {
  @service application;

  namespace = "v1";

  get host() {
    if (this.application.debug.host) {
      return this.application.debug.host;
    }
    return 'https://consortium-game-api.herokuapp.com';
  }

  pathForType() {
    return "match";
  }
}
