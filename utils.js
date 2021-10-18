export function createEmptyGrid(rows, cols) {
  const grid = [];
  for (let r = 0; r < rows; r++) {
    grid.push(new Array(cols).fill(0));
  }
  return grid;
}

// const DEFAULT_COLORS = ['#3288bd', '#99d594', '#fee08b', '#d53e4f'];
const FOUR_GOOD_COLORS = ['white', 'green', 'purple', 'gold'];
const NINE_GOOD_COLORS = ['white', 'lime', 'green', 'pink', 'purple', 'magenta', 'lavender', 'gold', 'yellow']
export function generateColors(count) {
  if (count === 4) {
    return FOUR_GOOD_COLORS;
  }
  if (count === 9) {
    return NINE_GOOD_COLORS;
  }
  const out = [];
  for (let i = 0; i < count; i++) {
    const percent = i / count;
    const hue = 200 + Math.floor(percent * 160);
    const color = `hsl(${hue}, 100%, 50%)`;
    out.push(color);
  }
  return out;
}

export function createCanvas({width=800, height=800} = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);
  return canvas;
}


export const DEFAULT_CELL_SIZE = 6;