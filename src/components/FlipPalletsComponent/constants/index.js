import colorbrewer from 'colorbrewer';

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
export const DEFAULT_SWATCHES = 5;
export const DEFAULT_SCALE = colorbrewer.BuGn[DEFAULT_SWATCHES]
