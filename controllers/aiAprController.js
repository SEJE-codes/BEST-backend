exports.generateAPR =
  async (req, res) => {
    try {
      const { blocs } =
        req.body;

      const generatedTable =
        blocs.map((item) => {
          let risk =
            "GREEN";

          if (
            item.preventive_measures
              .length < 20
          ) {
            risk = "RED";
          } else if (
            item.preventive_measures
              .length < 60
          ) {
            risk = "ORANGE";
          } else {
            risk = "GREEN";
          }

          return {
            bloc_code:
              item.bloc_code,

            installation:
              item.installation,

            central_event:
              item.central_event,

            existing_measures:
              item.preventive_measures,

            risk_color:
              risk,
          };
        });

      res.json(
        generatedTable
      );
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "APR generation failed",
      });
    }
  };