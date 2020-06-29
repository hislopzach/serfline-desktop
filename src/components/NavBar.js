import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../colors";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    color: "white",
  },
  link: {
    textDecoration: "none",
  },
}));
const NavBar = () => {
  const classes = useStyles();
  return (
    <AppBar>
      <Toolbar>
        <Link to="/" className={classes.link}>
          <Typography variant="h5" className={classes.button}>
            Lineup
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
