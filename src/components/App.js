import React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ReactQueryConfigProvider } from "react-query";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Spot from "./Spot";
import SurflineSearch from "../SurflineSearch";
import NavBar from "./NavBar";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
  mainPaper: {
    marginTop: "3em",
    padding: 10,
  },
  chartContainer: {
    padding: 5,
  },
}));

const queryConfig = {
  throwOnError: false,
  retry: 1,
  staleTime: 5 * 60 * 1000,
  cacheTime: 10 * 60 * 1000,
};

const App = () => {
  const classes = useStyles();
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Container maxWidth="lg" className={classes.mainPaper}>
        <Router>
          <NavBar />
          <Switch>
            <Route path="/spot/:spotId" component={Spot} />
            <Route path="/" component={SurflineSearch} />
          </Switch>
        </Router>
        <Footer />
      </Container>
      <Footer />
    </ReactQueryConfigProvider>
  );
};

export default App;
