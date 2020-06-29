import React from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <AppBar>
      <Toolbar>
        <Link to="/">
          <Button>Line Hacker</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
