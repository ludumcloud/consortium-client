import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

import { generateGrid } from "../../map/map";

export default class GridMap extends Component {
  @tracked
  size = 15;

  @tracked
  _grid = null;

  @action
  generateGrid() {
    this.grid = generateGrid(this.size);
  }

  @action
  setSize(event) {
    this.size = parseInt(event.target.value, 10);
  }

  get grid() {
    this._grid = generateGrid(this.size);
    return this._grid;
  }

  set grid(value) {
    this._grid = value;
    return this._grid;
  }
}
