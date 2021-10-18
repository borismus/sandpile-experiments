import {generateColors, createCanvas, DEFAULT_CELL_SIZE} from '../utils.js';


export class SideRenderer {
  constructor(model, {cellSize, cellPadding} = {}) {
    this.model = model;
    this.canvas = createCanvas({width: 800, height: 100});
    this.colors = generateColors(model.maxHeight);
    this.cellSize = cellSize || DEFAULT_CELL_SIZE;
    this.cellPadding = cellPadding || 1;
  }

  render() {
    const ctx = this.canvas.getContext('2d');
    const grid = this.model.grid;
    const row = Math.floor(grid.length / 2);
    const centerRow = grid[row];
    for (let col = 0; col < centerRow.length; col++) {
      const x = col * this.cellSize;
      const width = this.cellSize - this.cellPadding;
      const height = this.cellSize - this.cellPadding;
      const grainCount = grid[row][col];
      for (let i = 0; i < grainCount + 1; i++) {
        const y = (this.model.maxHeight - i) * this.cellSize;
        ctx.fillStyle = this.colors[i];
        ctx.fillRect(x, y, width, height);
      }
    }
  }
}