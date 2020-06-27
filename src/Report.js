import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { degToCompass } from "./util";

const Report = ({ surflineResponse, ...props }) => {
  const { spot, forecast } = surflineResponse;
  return (
    <Grid container justify="center" spacing={2}>
      <Grid item xs="12">
        <Typography variant="h2">{spot.name}</Typography>
      </Grid>
      <Grid item xs="auto">
        Tide: {forecast.tide.current.height} ft
      </Grid>
      <Grid item xs="auto">
        Wind: {forecast.wind.speed}kts {degToCompass(forecast.wind.direction)}
      </Grid>
      <Grid item xs="auto">
        Surf Height: {forecast.waveHeight.min}-{forecast.waveHeight.max} ft
      </Grid>
    </Grid>
  );
};

export default Report;
