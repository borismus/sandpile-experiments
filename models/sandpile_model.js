export class SandpileModel {
  cascadeFrequency = {};
  grainCount = 0;

  saveCascadeLength(length) {
    if (!this.cascadeFrequency[length]) {
      this.cascadeFrequency[length] = 1;
    } else {
      this.cascadeFrequency[length]++;
    }
  }

  addSandAtCenter() {
    this.cascadeLength = 0;
    this.grainCount++;

  }

  addSand(x, y) {
    if (this.cascadeLength > 0) {
      this.saveCascadeLength(this.cascadeLength);
    }
    this.cascadeLength++;
  }

  isVerticallySymmetric() {
    // Check if left and right side of board are symmetric.
    const cx = Math.floor(this.cols / 2);
    for (let row = 0; row < this.rows; row++) {
      const left = this.grid[row].slice(0, cx);
      const right = this.grid[row].slice(cx + 1);
      if (left.length != right.length) {
        return false;
      }
      if (!deepEquals(left, right.reverse())) {
        console.warn(`Found asymmetry at row ${row}.`);
        return false;
      }
    }
    return true;
  }
}

function deepEquals(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}