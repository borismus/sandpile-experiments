import {createEmptyGrid} from '../utils.js';
import {ClassicSandpileModel} from './classic_model.js';

/**
 * Experimental idea: a rock is formed when a cell topples over. Imagine that
 * when the cell topples, it also
 */
export class RockpileModel extends ClassicSandpileModel {
  blackAndWhite = true;

  constructor({rows = 101, cols = 101} = {}) {
    super(rows, cols);
    this.rockGrid = createEmptyGrid(rows, cols);
    this.maxRockGridHeight = 0;
  }

  get renderGrid() {
    return this.rockGrid;
  }

  get renderColorCount() {
    return this.maxRockGridHeight;
  }

  toppleCell(x, y) {
    super.toppleCell(x, y);
    const newValue = this.rockGrid[y][x] + 1;
    this.rockGrid[y][x] = newValue;
    this.maxRockGridHeight = Math.max(newValue, this.maxRockGridHeight);
  }

}
