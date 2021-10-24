export function createEmptyGrid(rows, cols) {
  const grid = [];
  for (let r = 0; r < rows; r++) {
    grid.push(new Array(cols).fill(0));
  }
  return grid;
}

const FOUR_GOOD_COLORS = ['#ffffff', '#32CD32', '#6b20a4', '#f8d749'];
// const FOUR_GOOD_COLORS = ['white', 'green', 'purple', 'gold'];
const NINE_GOOD_COLORS = ['white', 'lime', 'green', 'pink', 'purple', 'magenta', 'lavender', 'gold', 'yellow']
export function generateColors(count) {
  if (count === 1) {
    return ['black'];
  }
  if (count === 4) {
    return FOUR_GOOD_COLORS;
  }
  if (count === 9) {
    return NINE_GOOD_COLORS;
  }
  const out = [];
  for (let i = 0; i < count; i++) {
    const percent = i / count;
    // out.push(interpolateColor('#ffffff', '#ff00ff', percent));
    out.push(interpolateColorMulti(FOUR_GOOD_COLORS, percent));
  }
  return out;
}

function interpolateColorMulti(colorList, percent) {
  // Figure out which color based on the number of colors
  const segmentCount = colorList.length - 1;
  const segmentInd = Math.floor(segmentCount * percent);
  const color1 = colorList[segmentInd];
  const color2 = colorList[segmentInd + 1];
  const percentWithinSegment = (percent - segmentInd / segmentCount) * segmentCount;
  return interpolateColor(color1, color2, percentWithinSegment)

}

function interpolateColor(color2, color1, ratio) {
  color1 = trimLeadingHashIfNeeded(color1);
  color2 = trimLeadingHashIfNeeded(color2);
  var hex = function (x) {
    x = x.toString(16);
    return (x.length == 1) ? '0' + x : x;
  };

  var r = Math.ceil(parseInt(color1.substring(0, 2), 16) * ratio + parseInt(color2.substring(0, 2), 16) * (1 - ratio));
  var g = Math.ceil(parseInt(color1.substring(2, 4), 16) * ratio + parseInt(color2.substring(2, 4), 16) * (1 - ratio));
  var b = Math.ceil(parseInt(color1.substring(4, 6), 16) * ratio + parseInt(color2.substring(4, 6), 16) * (1 - ratio));

  return '#' + hex(r) + hex(g) + hex(b);
}

function trimLeadingHashIfNeeded(str) {
  if (str[0] === '#') {
    return str.slice(1);
  }
  return str;
}

function hslInterpolate(color1, color2, percent) {
  // const hue = 200 + Math.floor(percent * 160);
  const hue = Math.floor(percent * 360);
  return `hsl(${hue}, 100%, 50%)`;
}

export function createCanvas({width = 800, height = 800} = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);
  return canvas;
}


export const DEFAULT_CELL_SIZE = 6;