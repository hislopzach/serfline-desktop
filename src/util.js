import colors from "./colors";

export const degToCompass = (deg) => {
  var val = Math.floor(deg / 22.5 + 0.5);
  var arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
};

export const conditionToColor = (condition) => {
  switch (condition) {
    case "FLAT":
      return colors.grey;
    case "POOR":
    case "VERY POOR":
    case "POOR_TO_FAIR":
      return colors.blueLight;
    case "FAIR":
    case "FAIR_TO_GOOD":
      return colors.green;
    case "GOOD":
    case "VERY_GOOD":
      return colors.orange;
    case "GOOD_TO_EPIC":
    case "EPIC":
      return colors.red;
    default:
      return colors.blueLight;
  }
};
