import {generateColors, createCanvas, DEFAULT_CELL_SIZE} from '../utils.js';
import {Renderer} from './renderer.js';


export class SideRenderer extends Renderer {
  constructor(model, {cellSize = DEFAULT_CELL_SIZE, cellPadding = 1} = {}) {
    super();
    this.model = model;
    this.canvas = createCanvas({width: 800, height: 600});
    this.colors = generateColors(model.maxHeight);
    if (model.variableHeight) {
      this.colors = ['black'];
    }
    this.cellSize = cellSize;
    this.cellPadding = cellPadding;
  }

  render() {
    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
        ctx.fillStyle = this.colors[i % this.colors.length];
        ctx.fillRect(x, y, width, height);
      }
    }
  }
}