import Service from '@ember/service';

export default class ApplicationService extends Service {
  get debug() {
    let hash = window.location.hash;
    if (hash.indexOf('?') > 0) {
      let [, params] = hash.split('?');
      return params.split('&')
        .map(param => param.split('='))
        .reduce((obj, [key, value]) => {
          if (key.indexOf('debug-') > -1) {
            obj[key.replace('debug-', '')] = value;
          }
          return obj;
        }, {})
    }
    return {};
  }
}
