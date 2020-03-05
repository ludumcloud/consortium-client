import RESTSerializer from "@ember-data/serializer/rest";

export default class MatchSerializer extends RESTSerializer {
  normalizeSingleResponse(store, type, payload) {
    let data = {
      id: payload.id,
      type: type.modelName,
      attributes: payload
    };
    return { data };
  }
}
