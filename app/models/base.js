export default class BaseModel {}

BaseModel.create = function(data) {
  let self = new this();
  Object.keys(data).forEach(key => self[key] = data[key]);
  return self;
}
