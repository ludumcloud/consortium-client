import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;

  constructor() {
    super(...arguments);

    window.App = this;
  }

  serviceFor(name) {
    return this.__container__.lookup(`service:${name}`);
  }
}

loadInitializers(App, config.modulePrefix);
