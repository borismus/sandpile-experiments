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
}