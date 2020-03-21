import Service, { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import * as decodeJwt from 'jwt-decode';

export default class extends Service {
  @service api;
  @service logger;

  @tracked
  _user = null;

  @tracked
  _accessToken = null;

  async login(data) {
    try {
      let token = await this.api.login(data);
      this.accessToken = token;

      let session = decodeJwt(token);
      this.user = session.data;
      return this.user;
    } catch (e) {
      this.logger.error('Could not login:', e);
      throw e;
    }
  }

  @action
  logout() {
    this.user = null;
    localStorage.removeItem('jwt');
  }

  restoreSession() {
    let token = this.accessToken;
    if (!token) {
      return;
    }
    let session = decodeJwt(token);
    this.user = session.data;
    return this.user;
  }

  async info() {
    return this.api.info();
  }

  get isAuthenticated() {
    return !!this.user && !!this.accessToken;
  }

  get user() {
    return this._user;
  }

  set user(value) {
    this._user = value;
    return this._user;
  }

  get accessToken() {
    if (!this._accessToken) {
      let storedToken = localStorage.getItem('jwt');
      if (storedToken) {
        this._accessToken = storedToken;
        return this._accessToken;
      }
    }
    return this._accessToken;
  }

  set accessToken(value) {
    this._accessToken = value;
    localStorage.setItem('jwt', value);
    return this._accessToken;
  }
}
