import React from "react";
import {
  AppBar,
  Backdrop,
  Container,
  IconButton,
  InputBase,
  Paper,
  Toolbar,
  Typography,
  withStyles,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

import { Link } from "react-router-dom";
import SurflineSearch from "../SurflineSearch";
import useKeyPress from "../hooks/useKeyPress";

const useStyles = makeStyles((theme) => ({
  button: {
    color: "white",
  },
  link: {
    textDecoration: "none",
  },
  mainPaper: {
    marginTop: "3em",
    padding: 10,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const MyBackdrop = withStyles({
  root: {
    alignItems: "flex-start",
    backgroundColor: "rgb(117 125 232 / 98%)",
  },
})(Backdrop);

const NavBar = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  useKeyPress("Escape", handleClose);
  return (
    <>
      <AppBar>
        <Toolbar>
          <Link to="/" className={classes.link}>
            <Typography variant="h5" className={classes.button}>
              Serfline
            </Typography>
          </Link>
          <div className={classes.search} onClick={handleToggle}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search for a Spot"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
        <MyBackdrop open={open} onClick={handleClose}>
          <Container
            maxWidth="md"
            className={classes.mainPaper}
            onClick={(event) => event.stopPropagation()}
          >
            <Paper elevation={0} className={classes.mainPaper}>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
              {open && <SurflineSearch closeBackdrop={handleClose} />}
            </Paper>
          </Container>
        </MyBackdrop>
      </AppBar>
    </>
  );
};
export default NavBar;
