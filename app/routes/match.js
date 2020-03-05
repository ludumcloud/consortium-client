import Route from "@ember/routing/route";

export default class extends Route {
  async model(params) {
    let match = await this.store.findRecord("match", params.id);
    console.log(match);
    return match;
  }
}
