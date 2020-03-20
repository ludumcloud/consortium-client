import Service, { inject as service } from '@ember/service';

import Match from '../models/match';

export default class extends Service {
  @service application;
  @service session;

  get host() {
    if (this.application.debug.host) {
      return this.application.debug.host;
    }
    return 'https://consortium-rest-api.herokuapp.com';
  }

  async post(url, data, type = 'json') {
    let res = await fetch(url, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `bearer ${this.session.accessToken}`
      })
    });
    if (type === 'text') {
      return res.text();
    }
    return res.json();
  }

  async get(url, data = {}, type = 'json') {
    let urlObj = new URL(url);
    Object.keys(data).forEach(key =>
      urlObj.searchParams.append(key, data[key])
    );

    let res = await fetch(urlObj, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `bearer ${this.session.accessToken}`
      })
    });
    if (type === 'text') {
      return res.text();
    }
    return res.json();
  }

  async getAllMatches() {
    let url = `${this.host}/v1/match`;
    let json = await this.get(url);
    return json;
  }

  async getMatch(id) {
    let url = `${this.host}/v1/match/${id}`;
    let json = await this.get(url);
    return Match.create(json);
  }

  async createMatch(params) {
    let url = `${this.host}/v1/match`;
    let json = await this.post(url, params);
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
    let json = this.post(url, data);
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
    let json = this.post(url, data, 'text');
    return json;
  }

  /**
   * Search
   * @param {string} type
   * @param {string} query
   */
  async search(type, query) {
    let url = `${this.host}/v1/search/users`;
    let json = this.get(url, { query });
    return json;
  }
}
