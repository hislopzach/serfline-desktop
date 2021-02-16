import React from "react";
import { Container, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SurflineSearch from "../SurflineSearch";

const useStyles = makeStyles((theme) => ({
  mainPaper: {
    marginTop: "3em",
    padding: 10,
  },
  text: {
    textAlign: "center",
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Paper>
      <Container maxWidth="lg" className={classes.mainPaper}>
        <Paper elevation={0} className={classes.searchContainer}>
          <SurflineSearch />
        </Paper>
      </Container>
    </Paper>
  );
};

export default Home;
