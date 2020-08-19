import React from "react";
import { Grid } from "@material-ui/core";
import ConditionCard from "./ConditionCard";

const Conditions = ({ surflineResponse, days, ...props }) => {
  const {
    data: { conditions },
    associated,
  } = surflineResponse;
  return (
    <>
      <Grid container justify="center" spacing={4}>
        {conditions.slice(0, days).map((condition) => (
          <ConditionCard
            key={condition.timestamp}
            condition={condition}
            associated={associated}
          />
        ))}
      </Grid>
      <Grid container justify="center" spacing={4}>
        {conditions.slice(3, days).map((condition) => (
          <ConditionCard
            key={condition.timestamp}
            condition={condition}
            associated={associated}
          />
        ))}
      </Grid>
    </>
  );
};

export default Conditions;
