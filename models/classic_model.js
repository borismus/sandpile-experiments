import {createEmptyGrid} from '../utils.js';
import {SandpileModel} from './sandpile_model.js';

export class ClassicSandpileModel extends SandpileModel {
  maxHeight = 4;

  constructor({rows=101, cols=101} = {}) {
    super(rows, cols);
    this.rows = rows;
    this.cols = cols;
    this.grid = createEmptyGrid(rows, cols);
  }

  addSandAtCenter() {
    super.addSandAtCenter();

    const cx = Math.floor(this.cols / 2);
    const cy = Math.floor(this.rows / 2);
    this.addSand(cx, cy);
  }

  addSand(x, y) {
    super.addSand(x, y);
    if (x < 0 || y < 0 || x >= this.cols || y >= this.rows) {
      // We are out of bounds.
      return;
    }
    this.grid[y][x]++;

    if (this.grid[y][x] < this.maxHeight) {
      // This structure is now stable.
      return;
    }
    this.toppleCell(x, y);
  }

  toppleCell(x, y) {
    // The structure is unstable, so start a cascade.
    this.grid[y][x] = 0;
    this.addSand(x + 1, y);
    this.addSand(x - 1, y);
    this.addSand(x, y + 1);
    this.addSand(x, y - 1);
  }

}
