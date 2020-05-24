import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import Search from "./Search";
const NavBar = () => {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6">Line Hacker</Typography>
        {/* <Search /> */}
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
