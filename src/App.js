import React from "react";
import { Container, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import surflineWaves from "./surflineWaves";
import surflineWinds from "./surflineWinds";
import surflineTides from "./surflineTides";
import { SurfChart } from "./SurfChart";
import { TideChart } from "./TideChart";
import { SwellChart } from "./SwellChart";
import WindChart from "./WindChart";

const useStyles = makeStyles((theme) => ({
  mainPaper: {
    marginTop: "3em",
    padding: 10,
  },
  chartContainer: {
    padding: 5,
  },
}));

function App() {
  const classes = useStyles();
  const synchId = "all";
  return (
    <Container maxWidth="lg" className={classes.mainPaper}>
      <Paper>
        <Grid container align="center">
          <Grid item xs={12} className={classes.mainPaper}>
            <SurfChart surflineResponse={surflineWaves} synchId={synchId} />
          </Grid>
          <Grid item xs={12} className={classes.mainPaper}>
            <SwellChart surflineResponse={surflineWaves} synchId={synchId} />
          </Grid>
          <Grid item xs={12} className={classes.mainPaper}>
            <TideChart surflineResponse={surflineTides} synchId={synchId} />
          </Grid>
          <Grid item xs={12} className={classes.mainPaper}>
            <WindChart surflineResponse={surflineWinds} synchId={synchId} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default App;
