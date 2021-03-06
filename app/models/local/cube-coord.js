import { assert } from "@ember/debug";
import GameModel from "./base";

class CubeCoord extends GameModel {
  x = 0;
  y = 0;
  z = 0;

  constructor({ x, y, z }) {
    super();

    this.x = x;
    this.y = y;
    this.z = z;
  }

  adjacentCoords() {
    const x = this.x;
    const y = this.y;
    const z = this.z;

    return [
      CubeCoord.fromCube(x - 1, y + 1, z),
      CubeCoord.fromCube(x + 1, y - 1, z),
      CubeCoord.fromCube(x, y - 1, z + 1),
      CubeCoord.fromCube(x, y + 1, z - 1),
      CubeCoord.fromCube(x + 1, y, z - 1),
      CubeCoord.fromCube(x - 1, y, z + 1)
    ];
  }

  distanceFrom(other) {
    const dx = Math.abs(this.x - other.x);
    const dy = Math.abs(this.y - other.y);
    const dz = Math.abs(this.x - other.z);

    const manhattanDistance = dx + dy + dz;

    return manhattanDistance / 2;
  }
}

CubeCoord.fromRowCol = (row, col) => {
  const x = col - (row + (row & 1)) / 2;
  const z = row;
  const y = -x - z;

  return new CubeCoord({ x, y, z });
};

CubeCoord.fromCube = (x, y, z) => {
  assert("x + y + z must equal 0", x + y + z === 0);
  return new CubeCoord({ x, y, z });
};

export default CubeCoord;
