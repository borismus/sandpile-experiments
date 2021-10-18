import dat from "https://unpkg.com/dat.gui/build/dat.gui.module.js"

import {ClassicSandpileModel} from './models/classic_model.js';
import {DiagonalModel} from './models/diagonal_model.js';
import {HeatmapRenderer} from './renderers/heatmap_renderer.js';
import {HistogramRenderer} from './renderers/histogram_renderer.js';
import {SideRenderer} from './renderers/side_renderer.js';

const config = {
  gridSize: 201,
  cellSizePx: 4,
  cellSpacingPx: 1,
  stepsPerFrame: 4,
  modelName: 'classic',
  renderHistogram: renderHistogram,
}

const modelClassMap = {
  classic: ClassicSandpileModel,
  diagonal: DiagonalModel,
  probabalistic: null,
};

let model;
let renderers = [];
let histRenderer;


let stopped = false;
let iteration = 0;
function loop() {
  for (let i = 0; i < config.stepsPerFrame; i++) {
    model.addSandAtCenter();
  }

  for (const renderer of renderers) {
    renderer.render();
  }
  iteration++;
  if (!stopped) {
    requestAnimationFrame(loop);
  }
}

function renderHistogram() {
  stopped = true;
  histRenderer = new HistogramRenderer(model);
  histRenderer.render();
}

function start() {
  // Cleanup existing renders.
  for (const renderer of renderers) {
    if (renderer.canvas) {
      renderer.canvas.remove();
    }
  }

  const modelClass = modelClassMap[config.modelName];
  model = new ClassicSandpileModel({rows: config.gridSize, cols: config.gridSize});
  renderers = [
    new HeatmapRenderer(model, {cellSize: config.cellSizePx, cellSpacing: config.cellSpacingPx}),
    new SideRenderer(model, {cellSize: config.cellSizePx, cellSpacing: config.cellSpacingPx}),
  ];

  loop();
}

var gui = new dat.GUI({name: 'Sandpile Config'});
const gridSize = gui.add(config, 'gridSize');
const cellSize = gui.add(config, 'cellSizePx', 0, 10);
const cellSpacing = gui.add(config, 'cellSpacingPx', 0, 5);
gui.add(config, 'stepsPerFrame', 0, 1000, 1);
const modelName = gui.add(config, 'modelName', ['classic', 'diagonal', 'probabalistic']);
gui.add(config, 'renderHistogram');

gridSize.onChange((value) => {
  console.log('gridSize.onChange', value);
  start();
});
modelName.onChange((value) => {
  console.log('modelName.onChange', value);
  start();
})

cellSize.onChange((value) => {
  renderers.map(r => r.cellSize = value);
});
cellSpacing.onChange((value) => {
  renderers.map(r => r.cellSpacing = value);
});


document.querySelector('button#update').addEventListener('click', () => {
  histRenderer.render();
})


start();
