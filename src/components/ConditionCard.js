import React from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { format } from "date-fns";
import { conditionToColor } from "../util";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 175,
    width: 225,
  },
  heights: {
    height: 35,
  },
  summary: {
    height: "100%",
  },
}));
const ConditionCard = ({ condition, associated }) => {
  const classes = useStyles();

  return (
    <Grid item key={condition.timestamp}>
      <Typography align="left" variant="h6">
        {format(new Date(condition.timestamp * 1000), "EEEE M/d")}
      </Typography>
      <Paper className={classes.paper} square>
        <Grid container>
          <Grid
            item
            xs={6}
            style={{
              backgroundColor: conditionToColor(condition.am.rating),
            }}
          >
            <Typography variant="body2">
              {condition.am.rating.split("_").join(" ")}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              backgroundColor: conditionToColor(condition.pm.rating),
            }}
          >
            <Typography variant="body2">
              {condition.pm.rating.split("_").join(" ")}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6} className={classes.heights}>
            <Typography variant="h6">{`${condition.am.minHeight}-${condition.am.maxHeight} ${associated.units.waveHeight}`}</Typography>
          </Grid>
          <Grid item xs={6} className={classes.heights}>
            <Typography variant="h6">{`${condition.pm.minHeight}-${condition.pm.maxHeight} ${associated.units.waveHeight}`}</Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.summary}>
          <Grid item xs={12}>
            <Typography variant="body2">{condition.observation}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default ConditionCard;
