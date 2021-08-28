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
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Link } from "react-router-dom";
import SurflineSearch from "../SurflineSearch";
import useKeyPress from "../hooks/useKeyPress";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  button: {
    color: "white",
  },
  link: {
    textDecoration: "none",
  },
  container: {
    marginTop: "1em",
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
    marginLeft: theme.spacing(2),
    width: "90%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "90%",
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
  backdrop: {
    zIndex: 1500,
  },
  closeButton: {
    position: "absolute",
    left: "94%",
    color: "white",
    [theme.breakpoints.down("sm")]: {
      display: "none",
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
  const history = useHistory();

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
          <Link to="/articles" className={classes.link} style={{marginLeft:"1em"}}>
            <Typography variant="h6" className={classes.button}>
              Articles
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
        <Button onClick={history.goBack}><ArrowBackIosIcon/></Button>
        <Button onClick={history.goForward}><ArrowForwardIosIcon/></Button>
        </Toolbar>
        <MyBackdrop
          open={open}
          onClick={handleClose}
          className={classes.backdrop}
        >
          <Container
            maxWidth="md"
            className={classes.container}
            onClick={(event) => event.stopPropagation()}
          >
            <Paper elevation={0}>
              <IconButton
                onClick={handleClose}
                className={classes.closeButton}
                color="primary"
                size="medium"
              >
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
