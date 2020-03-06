import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { dasherize } from '@ember/string';

export default class extends Controller {
  @service router;

  get currentRouteClass() {
    return dasherize(this.router.currentRouteName);
  }
}
