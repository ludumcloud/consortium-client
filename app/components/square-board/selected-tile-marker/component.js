import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { later } from '@ember/runloop';

const TIMER = 750;

export default class extends Component {
  @tracked
  switchMarker = false;

  constructor() {
    super(...arguments);

    // later(this.changeMarker.bind(this), TIMER);
  }

  changeMarker() {
    this.switchMarker = !this.switchMarker;
    later(this.changeMarker.bind(this), TIMER);
  }
}
