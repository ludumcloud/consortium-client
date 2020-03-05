import RESTAdapter from "@ember-data/adapter/rest";

export default class MatchAdapter extends RESTAdapter {
  namespace = "v1";

  host = 'https://consortium-game-api.herokuapp.com';

  pathForType() {
    return "match";
  }
}
