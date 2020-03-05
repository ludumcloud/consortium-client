import Route from "@ember/routing/route";

export default class extends Route {
  async model(params) {
    return this.store.findRecord("match", params.id);
  }
}
