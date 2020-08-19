import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { degToCompass } from "../util";

const useStyles = makeStyles((theme) => ({
  details: {
    marginBottom: 5,
  },
  highlights: {
    textAlign: "left",
  },
}));

const Report = ({ report, overview, ...props }) => {
  const classes = useStyles();
  const { spot, forecast } = report;
  const {
    data: { forecastSummary },
  } = overview;
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Typography variant="h2">{spot.name}</Typography>
      </Grid>
      <Grid
        container
        item
        xs={12}
        md={6}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item className={classes.details}>
          Tide: {forecast.tide.current.height} ft{" "}
          {forecast.tide.next.type === "LOW" ? "falling" : "rising"}
        </Grid>
        <Grid item>
          Wind: {forecast.wind.speed}kts {degToCompass(forecast.wind.direction)}
        </Grid>
        <Grid item>
          Surf Height: {forecast.waveHeight.min}-{forecast.waveHeight.max} ft
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} className={classes.highlights}>
        <strong>Highlights:</strong>
        <ul>
          {forecastSummary.highlights.map((highlight, ndx) => (
            <li key={ndx}>{highlight}</li>
          ))}
        </ul>
      </Grid>
    </Grid>
  );
};

export default Report;
