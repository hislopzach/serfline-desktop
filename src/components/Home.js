import React, { useEffect } from "react";
import { Container, Grid, Paper, Typography } from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch";
import { makeStyles } from "@material-ui/core/styles";
import ChartPlaceholder from "./ChartPlaceholder";
import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import surflineAPI from "../surflineAPI";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  mainPaper: {
    marginTop: "3em",
    padding: 10,
  },
  link: {
    textDecoration: "none",
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

  useEffect(() => {
    document.title = `Home | Serfline`;
  }, []);

  return (
    // <Paper>
    <Container maxWidth="lg" className={classes.mainPaper}>
      <Grid container spacing={3} direction="column">
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h5">
              New Feature: Articles! Use the <Link to="/articles" className={classes.link}>Articles</Link> page to view full length
              articles
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h2">Cam of the Moment:</Typography>
            <Typography variant="h3">
              {response?.data?.data?.spot?.name}
              <Link to={`/spot/${response?.data?.data?.spot?._id}`}>
                <LaunchIcon color="primary" />
              </Link>
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
      </Grid>
    </Container>
    // </Paper>
  );
};

export default Home;
