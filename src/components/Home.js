import React from "react";
import { Container, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ChartPlaceholder from "./ChartPlaceholder";
import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import surflineAPI from "../surflineAPI";

const useStyles = makeStyles((theme) => ({
  mainPaper: {
    marginTop: "3em",
    padding: 10,
  },
  text: {
    textAlign: "center",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Home = () => {
  const classes = useStyles();
  const { data: response, isLoading } = useQuery(
    "featuredCam",
    surflineAPI.getFeaturedCam
  );

  return (
    // <Paper>
    <Container maxWidth="lg" className={classes.mainPaper}>
      <Grid container spacing={3} direction="column">
        <Grid item xs={12}>
          <Paper elevation={1} className={classes.paper}>
            <Typography variant="h2">Cam of the Moment:</Typography>
            <Typography variant="h3">
              {response?.data?.data?.spot?.name}
            </Typography>
            <Grid container justify="center">
              <Grid item xs="auto">
                {isLoading ? (
                  <ChartPlaceholder />
                ) : (
                  <ReactPlayer
                    url={response?.data?.data?.spot?.cameras?.[0]?.streamUrl}
                    playing={false}
                    controls
                    width="100%"
                    height="100%"
                  />
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={0} className={classes.paper}>
            <Typography variant="h5">
              Recently visited spots coming soon
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
    // </Paper>
  );
};

export default Home;
