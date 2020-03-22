'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
  });

  app.import('public/tiles/square.css');

  app.import('node_modules/skeleton-css/css/normalize.css');
  app.import('node_modules/skeleton-css/css/skeleton.css');

  return app.toTree();
};
