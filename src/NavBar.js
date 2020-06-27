import React from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Search from "./Search";
const NavBar = () => {
  return (
    <AppBar>
      <Toolbar>
        <Link to="/">
          <Button>Line Hacker</Button>
        </Link>

        {/* <Search /> */}
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
