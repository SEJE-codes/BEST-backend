if (!row.initial_color) {
  const criticite =
    (row.F || 1) *
    (row.G || 1) *
    (row.C || 1);

  if (criticite <= 2) {
    row.initial_color = "GREEN";
    row.initial_risk = "GREEN";
  } else if (criticite <= 4) {
    row.initial_color = "YELLOW";
    row.initial_risk = "YELLOW";
  } else if (criticite <= 9) {
    row.initial_color = "ORANGE";
    row.initial_risk = "ORANGE";
  } else {
    row.initial_color = "RED";
    row.initial_risk = "RED";
  }
}

if (!row.residual_color) {
  row.residual_color =
    row.initial_color;

  row.residual_risk =
    row.initial_risk;
}
const calculateRisk = (
  riskLevel
) => {

  switch (
    String(riskLevel)
      .toUpperCase()
      .trim()
  ) {

    case "GREEN":
      return {
        F: 1,
        G: 1,
        C: 1,
      };

    case "YELLOW":
      return {
        F: 2,
        G: 2,
        C: 4,
      };

    case "ORANGE":
      return {
        F: 3,
        G: 3,
        C: 9,
      };

    case "RED":
      return {
        F: 5,
        G: 4,
        C: 20,
      };

    default:
      return {
        F: 1,
        G: 1,
        C: 1,
      };
  }
};

module.exports = {
  calculateRisk,
};