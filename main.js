import dat from "https://unpkg.com/dat.gui/build/dat.gui.module.js"

import {ClassicSandpileModel} from './models/classic_model.js';
import {DiagonalModel} from './models/diagonal_model.js';
import {RelativeHeightModel} from './models/relative_model.js';
import {RockpileModel} from './models/rockpile_model.js';
import {HeatmapRenderer} from './renderers/heatmap_renderer.js';
import {HistogramRenderer} from './renderers/histogram_renderer.js';
import {SideRenderer} from './renderers/side_renderer.js';

const config = {
  rows: 101,
  cols: 101,
  cellSizePx: 8,
  cellPaddingPx: 0.5,
  stepsPerFrame: 1,
  modelName: 'relative',
  renderHistogram: renderHistogram,
  checkVerticalSymmetry: checkVerticalSymmetry,
}

const relConfig = {
  spillGravity: false,
  isDiagonal: true,
}

const modelClassMap = {
  classic: ClassicSandpileModel,
  diagonal: DiagonalModel,
  relative: RelativeHeightModel,
  rockpile: RockpileModel,
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
  // if (!model.isVerticallySymmetric()) {
  //   // debugger;
  // }
  if (!stopped) {
    requestAnimationFrame(loop);
  }
}

function renderHistogram() {
  stopped = true;
  histRenderer = new HistogramRenderer(model);
  histRenderer.render();
}

function checkVerticalSymmetry() {
  alert(`isVerticallySymmetric: ${model.isVerticallySymmetric()}`);
}

function start() {
  // Cleanup existing renders.
  for (const renderer of renderers) {
    if (renderer.canvas) {
      renderer.canvas.remove();
    }
  }

  const modelClass = modelClassMap[config.modelName];
  let extras = {};
  if (config.modelName === 'relative') {
    extras = {
      ...extras,
      spillGravity: relConfig.spillGravity,
      isDiagonal: relConfig.isDiagonal,
    };
  }
  model = new modelClass({rows: config.rows, cols: config.cols, ...extras});
  renderers = [
    new HeatmapRenderer(model, {cellSize: config.cellSizePx, cellPadding: config.cellPaddingPx}),
    new SideRenderer(model, {cellSize: config.cellSizePx, cellPadding: config.cellPaddingPx}),
  ];

  // Head start.
  // for (let i = 0; i < 216; i++) {
  //   model.addSandAtCenter();
  // }

  // Debug only.
  window.model = model;
  loop();
}

var gui = new dat.GUI({name: 'Sandpile Config'});
const modelName = gui.add(config, 'modelName', Object.keys(modelClassMap)).onChange(start);
const rows = gui.add(config, 'rows').onChange(start);
const cols = gui.add(config, 'cols').onChange(start);
gui.add(config, 'stepsPerFrame', 0, 1000, 1);
const cellSize = gui.add(config, 'cellSizePx', 0, 10);
const cellPadding = gui.add(config, 'cellPaddingPx', 0, 5);
gui.add(config, 'renderHistogram');
gui.add(config, 'checkVerticalSymmetry');

const relGui = gui.addFolder('relative');
relGui.add(relConfig, 'spillGravity').onChange(start);
relGui.add(relConfig, 'isDiagonal').onChange(start);

cellSize.onChange((value) => {
  renderers.map(r => {
    r.cellSize = value;
    r.clear();
  });
});
cellPadding.onChange((value) => {
  renderers.map(r => {
    r.cellPadding = value;
    r.clear();
  });
});

start();
window.addEventListener('keydown', e => {
  if (e.key === ' ') {
    model.addSandAtCenter();
    console.log('model.grainCount', model.grainCount);
  }
})