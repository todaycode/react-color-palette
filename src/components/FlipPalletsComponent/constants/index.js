import colorbrewer from 'colorbrewer';

// console.log(colorbrewer.schemeGroups.sequential);
// // ["BuGn","BuPu","GnBu",...]

// console.log(colorbrewer.Blues[5]);
// // ["#eff3ff","#bdd7e7","#6baed6","#3182bd","#08519c"]
export const COLORSCALE_TYPES = [
  "Sequential",
  "Diverging",
  "Categorical",
];

export const SCALES_WITHOUT_LOG = ["Sequential", "Diverging", "Categorical"];
export const BREWER = {
  Sequential: colorbrewer.schemeGroups.sequential,
  Diverging: colorbrewer.schemeGroups.diverging,
  Categorical: ["Set1", "Pastel1", "Dark2", "Set2", "Pastel2", "Set3"]
};
console.log("BREWER" ,BREWER)
export const CUBEHELIX = [
  { start: 300, rotations: -1.5 },
  { start: 0, rotations: -0.4 },
  { start: 0, rotations: -0.1 },
  { start: 100, rotations: 0.4 },
  { start: 200, rotations: -0.1 },
  { start: 200, rotations: -0.4 },
  { start: 200, rotations: 0.4 },
  { start: 300, rotations: -0.1 }
];

export const DEFAULT_START = 300;
export const DEFAULT_ROTATIONS = -1.5;
export const DEFAULT_HUE = 1;
// export const DEFAULT_GAMMA = 1;
export const DEFAULT_LIGHTNESS = [0.85, 0.15];
export const DEFAULT_NCOLORS = 10;
export const DEFAULT_SWATCHES = 5;
export const DEFAULT_SCALE = colorbrewer.BuGn[DEFAULT_SWATCHES]
export const DEFAULT_LOG_BREAKPOINTS = 4;
export const DEFAULT_BREAKPOINTS = [0, 1];
export const DEFAULT_SWATCH_WIDTH = 20;
export const DEFAULT_NPREVIEWCOLORS = 10;
