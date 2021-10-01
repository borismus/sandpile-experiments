import {ClassicSandpileModel} from './models/classic_model.js';
import {DiagonalModel} from './models/diagonal_model.js';
import {HeatmapRenderer} from './renderers/heatmap_renderer.js';
import {HistogramRenderer} from './renderers/histogram_renderer.js';
import {SideRenderer} from './renderers/side_renderer.js';

const GRID_SIZE = 201;
const STEPS_PER_RENDER = 201;
const CELL_SIZE = 4;
const CELL_SPACING = 1;

const model = new ClassicSandpileModel({rows: GRID_SIZE, cols: GRID_SIZE});
const renderers = [
  new HeatmapRenderer(model, {cellSize: CELL_SIZE, cellSpacing: CELL_SPACING}), 
  new SideRenderer(model, {cellSize: CELL_SIZE, cellSpacing: CELL_SPACING}), 
];
const histRenderer = new HistogramRenderer(model);


let iteration = 0;
function loop() {
  for (let i = 0; i < STEPS_PER_RENDER; i++) {
    model.addSandAtCenter();
  }

  for (const renderer of renderers) {
    renderer.render();
  }
  iteration++;
  requestAnimationFrame(loop);
}


document.querySelector('button#update').addEventListener('click', () => {
  histRenderer.render();
})

loop();
