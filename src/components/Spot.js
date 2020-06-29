import React from "react";
import { Container, Paper, Grid } from "@material-ui/core";
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
    marginTop: "3em",
    padding: 10,
  },
  chartContainer: {
    padding: 5,
  },
}));

const apiWrapper = (key, spotId) => {
  switch (key) {
    case "swells":
      return SurflineAPI.getSwells(spotId);
    case "winds":
      return SurflineAPI.getWinds(spotId);
    case "tides":
      return SurflineAPI.getTides(spotId);
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
  const { spotId } = props.match.params;
  const classes = useStyles();
  const synchId = "all";

  const { data: report } = useQuery(["report", spotId], apiWrapper);
  const { data: swells } = useQuery(["swells", spotId], apiWrapper);
  const { data: winds } = useQuery(["winds", spotId], apiWrapper);
  const { data: tides } = useQuery(["tides", spotId], apiWrapper);
  const { data: overview } = useQuery(
    report && ["overview", report.data.spot.subregion._id],
    apiWrapper
  );

  if (report) {
    document.title = `Lineup | ${report.data.spot.name}`;
  }
  const { data: conditions } = useQuery(
    report && ["conditions", report.data.spot.subregion._id],
    apiWrapper
  );

  return (
    <Container maxWidth="lg" className={classes.mainPaper}>
      <Paper>
        <Grid container align="center">
          <Grid item xs={12} className={classes.mainPaper}>
            {overview ? (
              <Report report={report.data} overview={overview.data} />
            ) : (
              <ChartPlaceholder />
            )}
          </Grid>
          <Grid item xs={12} className={classes.mainPaper}>
            {conditions ? (
              <Conditions
                surflineResponse={conditions.data}
                synchId={synchId}
              />
            ) : (
              <ChartPlaceholder />
            )}
          </Grid>
          <Grid item xs={12} className={classes.mainPaper}>
            {swells ? (
              <SurfChart surflineResponse={swells.data} synchId={synchId} />
            ) : (
              <ChartPlaceholder />
            )}
          </Grid>

          <Grid item xs={12} className={classes.mainPaper}>
            {swells ? (
              <SwellChart surflineResponse={swells.data} synchId={synchId} />
            ) : (
              <ChartPlaceholder />
            )}
          </Grid>
          <Grid item xs={12} className={classes.mainPaper}>
            {tides ? (
              <TideChart surflineResponse={tides.data} synchId={synchId} />
            ) : (
              <ChartPlaceholder />
            )}
          </Grid>
          <Grid item xs={12} className={classes.mainPaper}>
            {winds ? (
              <WindChart surflineResponse={winds.data} synchId={synchId} />
            ) : (
              <ChartPlaceholder />
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Spot;
