import {generateColors, createCanvas, DEFAULT_CELL_SIZE} from '../utils.js';


export class HeatmapRenderer {
  constructor(model, {cellSize, cellSpacing} = {}) {
    this.model = model;
    this.canvas = createCanvas();
    this.colors = generateColors(model.maxHeight);

    this.cellSize = cellSize || DEFAULT_CELL_SIZE;
    this.cellSpacing = cellSpacing || 1;
  }

  render() {
    const ctx = this.canvas.getContext('2d');
    const grid = this.model.grid;
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        const x = col * this.cellSize;
        const y = row * this.cellSize;
        const width = this.cellSize - 1;
        const height = this.cellSize - 1;
        const grainCount = grid[row][col];
        ctx.fillStyle = this.colors[grainCount];
        ctx.fillRect(x, y, width, height);
      }
    }
  }
}