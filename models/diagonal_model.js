import {SandpileModel} from './sandpile_model.js';
import {createEmptyGrid} from '../utils.js';

export class DiagonalModel extends SandpileModel {
  maxHeight = 9;

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
      // This structure is stable.
      return;
    }
    // The structure is unstable, so start a cascade in all eight 
    // cardinal directions.
    this.grid[y][x] = 0;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx === 0 && dy === 0) {
          continue;
        }
        this.addSand(x + dx, y + dy);
      }
    }
  }
}