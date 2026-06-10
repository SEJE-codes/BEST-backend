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