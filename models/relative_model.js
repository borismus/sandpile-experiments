import {createEmptyGrid} from '../utils.js';
import {SandpileModel} from './sandpile_model.js';

/**
 * Concept: a cell is considered to be stable if it is not too tall compared to 
 * its neighbors. If it's too tall compared to the neighbors, there is also
 * enough space for it to overflow into.
 * 
 * Mathematically, look at neighbors_i in all eight directions. The weakest
 * support is the neighbor with the smallest height, call it neighbor_j.
 * 
 * neighbor_j := argmin(neighbor_i.height)
 * max_diff := height - neighbor_j.height
 * if max_diff == 8:
 *   collapse, so that height -= 8 and neighbor_i.height++
 * 
 * 
 * Update (Oct 23, 2021): This model doesn't appear to be abelian in the sense 
 * that it matters which vertex topples if multiple are unstable.
 * 
 * Is there another variant of the sandpile model that is abelian?
 * 
 * - iter31: 0 0 2 4 6	6	6	4	2	0	0
 * - iter32: 0 0 2 4 6	7	6	4	2	0	0
 * - iter33: 
 */
export class RelativeHeightModel extends SandpileModel {
  maxHeight = 9;
  variableHeight = true;

  constructor({rows = 101, cols = 101, spillGravity = false, isDiagonal = false} = {}) {
    super(rows, cols);
    this.rows = rows;
    this.cols = cols;
    this.grid = createEmptyGrid(rows, cols);
    this.spillGravity = spillGravity;
    this.getNeighbors = isDiagonal ? this.getNeighborsDiagonal : this.getNeighborsOrtho;
    // this.getNeighbors = this.getNeighbors2DSymmetric;

    const [cx, cy] = this.center;
    this.neighbourCount = this.getNeighbors(cx, cy).length;
  }

  get center() {
    const cx = Math.floor(this.cols / 2);
    const cy = Math.floor(this.rows / 2);
    return [cx, cy];
  }

  addSandAtCenter() {
    super.addSandAtCenter();

    const [cx, cy] = this.center;

    this.maxHeight = Math.max(this.maxHeight, this.grid[cy][cx] + 1);

    this.addSand(cx, cy);
  }

  addSand(x, y) {
    super.addSand(x, y);
    if (this.outOfBounds(x, y)) {
      // We are out of bounds.
      return;
    }

    this.grid[y][x]++;

    // Compare to the smallest neighbor.
    const minNeighborHeight = this.getMinNeighborHeight(x, y);
    const thisHeight = this.grid[y][x];
    if (thisHeight == minNeighborHeight) {
      // This cell is as short as the shortest neighbor. 
      return;
    } else if (thisHeight < minNeighborHeight) {
      // this.drawNeighbors(x, y);
      return;
    }
    const maxDiff = thisHeight - minNeighborHeight;
    if (maxDiff <= this.neighbourCount) {
      // This structure is now stable.
      return;
    }

    // The structure is unstable, so start a cascade to all neighbors.
    this.grid[y][x] -= this.neighbourCount;
    if (this.spillGravity) {
      // Spill into the shortest neighbor.
      for (let i = 0; i < this.neighbourCount; i++) {
        const sn = this.getShortestNeighborCoords(x, y);
        this.addSand(sn[0], sn[1]);
      }
    } else {
      // Naively spill in all directions.
      this.getNeighbors(x, y).map(([x, y]) => this.addSand(x, y));
    }
  }

  getMinNeighborHeight(x, y) {
    const heights = this.getNeighbors(x, y).map(([x, y]) => this.grid[y][x]);
    return Math.min(...heights);
  }

  getShortestNeighborCoords(x, y) {
    const neighbors = this.getNeighbors(x, y);
    const heights = neighbors.map(([x, y]) => this.grid[y][x]);
    const shortestInd = argmin(heights);
    return neighbors[shortestInd];
  }

  outOfBounds(x, y) {
    return x < 0 || y < 0 || x >= this.cols || y >= this.rows;
  }

  getNeighborsDiagonal(x, y) {
    const out = [];
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        // Skip the center.
        if (dx === 0 && dy === 0) {
          continue;
        }
        // Only return in-bounds items.
        if (this.outOfBounds(x + dx, y + dy)) {
          continue;
        }
        out.push([x + dx, y + dy]);
      }
    }
    return out;
  }

  getNeighborsOrtho(x, y) {
    const ortho = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ];
    return ortho.filter(([x, y]) => !this.outOfBounds(x, y));
  }

  getNeighbors2DSymmetric(x, y) {
    let out = [];
    const cx = Math.floor(this.cols / 2);
    const cy = Math.floor(this.rows / 2);
    const left = [x-1, y];
    const right = [x+1, y];
    const top = [x, y-1];
    const bottom = [x, y+1];
    // On the left side, start w/ left, then right.
    out = out.concat(y < cy ? [top, bottom] : [bottom, top]);
    out = out.concat(x < cx ? [left, right] : [right, left]);
    
    return out.filter(([x, y]) => !this.outOfBounds(x, y));
  }
  

  drawNeighbors(x, y) {
    const neighbors = this.getNeighbors(x, y);
    const heights = neighbors.map(([x, y]) => this.grid[y][x]);
    console.log(x, y);
    console.log(heights.slice(0, 3));
    console.log(heights.slice(3, 5));
    console.log(heights.slice(5));
  }
}

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


function argmin(array) {
  return array.map((x, i) => [x, i]).reduce((r, a) => (a[0] < r[0] ? a : r))[1];
}