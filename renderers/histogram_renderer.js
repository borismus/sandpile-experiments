import {createCanvas, generateColors} from '../utils.js';
import {Renderer} from './renderer.js';

const BUCKET_COUNT = 100;

export class HistogramRenderer extends Renderer {
  constructor(model) {
    super();
    this.model = model;
    this.canvas = createCanvas(640, 320);
  }

  render() {
    const ctx = this.canvas.getContext('2d');
    let allDict = this.model.cascadeFrequency;

    // Bucketize if needed
    const dict = bucketize(allDict);

    // Get the max dimensions for scaling.
    const {maxSize, maxFreq} = getMaxFreqAndSize(dict);
    

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let size in dict) {
      const freq = dict[size];
      // Render a bar for each.
      const percentHeight = freq / maxFreq;
      const percentX = Number(size) / maxSize;

      const x = this.canvas.width * percentX;
      const y = this.canvas.height * (1 - percentHeight);
      const width = this.canvas.width / maxSize;
      const height = this.canvas.height * (percentHeight);
      ctx.fillRect(x, y, width, height);
    }

    // // Show a few data points, maybe at 0, 0.25, 0.5, 0.75 and 1.
    ctx.font = '12px sans-serif';
    // const percentages = [0, 0.25, 0.5, 0.75, 1];
    // for (const p of percentages) {
    //   const {size, freq} = getPercentile(allDict, p);
    //   const x = p * this.canvas.width + 10;
    //   const y = 1/p * this.canvas.height;
    //   ctx.fillText(`avo of ${size} ${freq}`, x, 10);
    // }
    
    const keys = Object.keys(allDict);
    const largestAvo = keys[keys.length - 1];
    const numberOfSize1 = allDict[1];
    const textX = 20;
    ctx.fillText(`Largest avalanche: ${largestAvo}`, textX, 10);
    ctx.fillText(`Number of avalanches of size 1: ${numberOfSize1}`, textX, 30);
    const log2Grains = Math.floor(Math.log2(this.model.grainCount));
    ctx.fillText(`Grains of sand: 2^${log2Grains}`, textX, 50);
  }
  

}

function bucketize(dict, bucketCount=BUCKET_COUNT) {
  const keys = Object.keys(dict);
  const lastKey = keys[keys.length - 1];

  const bucketSize = lastKey / bucketCount;
  const bucketDict = {};
  for (const key in dict) {
    const freq = dict[key];
    // Figure out which bucket to put the key.
    const bucket = Math.floor(key / bucketSize);
    if (bucketDict[bucket] === undefined) {
      bucketDict[bucket] = freq;
    } else {
      bucketDict[bucket] += freq;
    }
  }
  return bucketDict;
}

function getMaxFreqAndSize(dict) {
  let maxFreq = -Infinity;
  let maxSize = -Infinity;
  for (const key in dict) {
    const size = Number(key);
    const freq = dict[size];
    if (maxFreq < freq) {
      maxFreq = freq;
    }
    if (maxSize < size) {
      maxSize = size;
    }
  }
  return {maxFreq, maxSize};
}

function getPercentile(dict, p) {
  const keys = Object.keys(dict).map(k => Number(k));
  const lastKey = keys[keys.length - 1];
  const targetKey = Math.floor(lastKey * p);
  // Find a value closest to target key.
  let closestKey = -1;
  let minDist = Infinity;
  for (const key of keys) {
    const dist = Math.abs(targetKey - key);
    if (dist < minDist) {
      minDist = dist;
      closestKey = key;
    }
  }
  return {freq: dict[closestKey], size: closestKey};
}