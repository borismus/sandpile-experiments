import {generateColors, createCanvas, DEFAULT_CELL_SIZE} from '../utils.js';
import {Renderer} from './renderer.js';


export class HeatmapRenderer extends Renderer {
  constructor(model, {cellSize = DEFAULT_CELL_SIZE, cellPadding = 1} = {}) {
    super();
    this.model = model;
    this.canvas = createCanvas();
    this.colors = generateColors(model.renderColorCount);

    this.cellSize = cellSize;
    this.cellPadding = cellPadding;
  }

  render() {
    this.colors = generateColors(this.model.renderColorCount);

    const ctx = this.canvas.getContext('2d');
    const grid = this.model.renderGrid;
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        const x = col * this.cellSize;
        const y = row * this.cellSize;
        const width = this.cellSize - this.cellPadding;
        const height = this.cellSize - this.cellPadding;
        const grainCount = grid[row][col];
        ctx.fillStyle = this.colors[grainCount];
        ctx.fillRect(x, y, width, height);
      }
    }
  }
}