import Service, { inject as service } from '@ember/service';

import Match from '../models/match';

async function post(url, data) {
  let res = await fetch(url, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  });
  return res.json();
}

export default class extends Service {
  @service application;

  get host() {
    if (this.application.debug.host) {
      return this.application.debug.host;
    }
    return 'https://consortium-game-api.herokuapp.com';
  }

  async getMatch(id) {
    let url = `${this.host}/v1/match/${id}`;
    let res = await fetch(url);
    let json = await res.json();
    return Match.create(json);
  }

  async createMatch(params) {
    let url = `${this.host}/v1/match`;
    let json = await post(url, params);
    return Match.create(json);
  }

  /**
   * Create an account
   * @param {object} data signup information
   * @param {string} data.username
   * @param {string} data.password
   * @param {string} data.email
   * @param {string} data.name
   */
  async signup(data) {
    let url = `${this.host}/v1/auth/signup`;
    let json = post(url, data);
    return json;
  }

  /**
   * Login
   * @param {object} data login information
   * @param {string} data.email
   * @param {string} data.password
   */
  async login(data) {
    let url = `${this.host}/v1/auth/login`;
    let json = post(url, data);
    return json;
  }
}
