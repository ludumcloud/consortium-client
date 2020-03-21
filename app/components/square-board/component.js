import Component from '@glimmer/component';

export default class extends Component {
  get grid() {
    return this.args.game.match.grid;
  }
}
