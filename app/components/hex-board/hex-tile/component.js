import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { htmlSafe } from "@ember/template";

// 32 per row, 0 indexed
const TILE_POSITION = {
  forest: 67,
  rainforest: 66,
  shrubland: 65,
  grassland: 64,
  temperate: 5,
  tundra: 51,
  rocky: 22,
  "resource-primary": 69,
  "resource-secondary": 3
};

export default class extends Component {
  @tracked
  _style = "";

  get style() {
    let sheet = this.args.sheet;
    let type = this.args.hex.biome;

    if (!sheet) {
      return "";
    }

    if (type === "empty" || type === "lake") {
      return "";
    }

    this._style = htmlSafe(
      sheet.getTileDomElement(TILE_POSITION[type]).getAttribute("style")
    );
    return this._style;
  }
}
