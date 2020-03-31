import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class extends Component {
  constructor() {
    super(...arguments);

    this.unit = this.args.unit;
    this.game = this.args.game;
    this.tile = this.args.tile;
  }

  get selected() {
    return this.game.activeTile === this.tile;
  }

  get spriteClass() {
    if (this.unit.type === 'infantry') {
      return 'character-infantry';
    }
    return '';
  }

  get isActive() {
    return this.unit === this.game.activeUnit;
  }

  @action
  handleClick() {
    this.game.clickUnit(this.unit);
  }
}
