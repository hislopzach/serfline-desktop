import React, { useState } from "react";
import { Paper, Grid, InputLabel, Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SurflineAPI from "../surflineAPI";
import { SurfChart } from "./SurfChart";
import { TideChart } from "./TideChart";
import { SwellChart } from "./SwellChart";
import Conditions from "./Conditions";
import WindChart from "./WindChart";
import Report from "./Report";
import ChartPlaceholder from "./ChartPlaceholder";

import { useQuery } from "react-query";

const useStyles = makeStyles((theme) => ({
  mainPaper: {
    marginTop: 10,
    padding: 10,
  },
  chartContainer: {
    padding: 5,
  },
}));

const apiWrapper = (key, spotId, days) => {
  switch (key) {
    case "swells":
      return SurflineAPI.getSwells(spotId, days);
    case "winds":
      return SurflineAPI.getWinds(spotId, days);
    case "tides":
      return SurflineAPI.getTides(spotId, days);
    case "report":
      return SurflineAPI.getReport(spotId);
    case "overview":
      return SurflineAPI.getOverview(spotId);
    case "conditions":
      return SurflineAPI.getConditions(spotId);
    default:
      console.log("unknown key");
  }
};

const Spot = (props) => {
  const [days, setDays] = useState(3);
  const { spotId } = props.match.params;
  const classes = useStyles();
  const syncId = "anyId";

  const { data: report } = useQuery(["report", spotId], apiWrapper);
  const { data: swells } = useQuery(["swells", spotId, days], apiWrapper);
  const { data: winds } = useQuery(["winds", spotId, days], apiWrapper);
  const { data: tides } = useQuery(["tides", spotId, days], apiWrapper);
  const { data: overview } = useQuery(
    report && ["overview", report.data.spot.subregion._id],
    apiWrapper
  );

  const handleDaysChange = (event) => {
    setDays(event.target.value);
  };

  if (report) {
    document.title = `${report.data.spot.name} | Serfline`;
  }
  const { data: conditions } = useQuery(
    report && ["conditions", report.data.spot.subregion._id],
    apiWrapper
  );

  return (
    <Paper>
      <Grid container align="center">
        <Grid item xs={12} className={classes.mainPaper}>
          {overview ? (
            <Report
              reportData={report.data}
              overview={overview.data}
              days={days}
            />
          ) : (
            <ChartPlaceholder />
          )}
        </Grid>
        <Grid item xs={12}>
          <InputLabel id="days-label">Days to Show</InputLabel>
          <Select
            labelId="days-label"
            value={days}
            onChange={handleDaysChange}
            className={classes.selectEmpty}
          >
            {[1, 2, 3, 4, 5, 6].map((value, ndx) => (
              <MenuItem key={ndx} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} className={classes.mainPaper}>
          {conditions ? (
            <Conditions surflineResponse={conditions.data} days={days} />
          ) : (
            <ChartPlaceholder />
          )}
        </Grid>
        <Grid item xs={12} className={classes.mainPaper}>
          {swells ? (
            <SurfChart
              surflineResponse={swells.data}
              syncId={syncId}
              days={days}
            />
          ) : (
            <ChartPlaceholder />
          )}
        </Grid>

        <Grid item xs={12} className={classes.mainPaper}>
          {swells ? (
            <SwellChart
              surflineResponse={swells.data}
              syncId={syncId}
              days={days}
            />
          ) : (
            <ChartPlaceholder />
          )}
        </Grid>

        <Grid item xs={12} className={classes.mainPaper}>
          {winds ? (
            <WindChart
              surflineResponse={winds.data}
              syncId={syncId}
              days={days}
            />
          ) : (
            <ChartPlaceholder />
          )}
        </Grid>
        <Grid item xs={12} className={classes.mainPaper}>
          {tides ? (
            <TideChart
              surflineResponse={tides.data}
              syncId={syncId}
              days={days}
            />
          ) : (
            <ChartPlaceholder />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Spot;
