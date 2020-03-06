import Route from '@ember/routing/route';
import { action } from "@ember/object";
import { inject as service } from '@ember/service';

export default class RegisterRoute extends Route {
  @service api;

  @action
  createAccount() {

  }
}
