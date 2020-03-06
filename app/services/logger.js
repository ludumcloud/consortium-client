import Service from '@ember/service';

const LOG_LEVELS = ['info', 'log', 'warn', 'error'];

export default class extends Service {
  constructor() {
    super(...arguments);

    // eslint-disable-next-line no-console
    LOG_LEVELS.forEach(level => this[level] = console.log.bind(console));
  }
}
