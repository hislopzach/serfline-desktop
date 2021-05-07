import React, { useRef, useState, useEffect } from "react";
import { useQuery } from "react-query";
import {
  List,
  ListItem,
  TextField,
  Grid,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Search, Room } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";

import SurflineAPI from "./surflineAPI";

const useStyles = makeStyles((theme) => ({
  mainPaper: {
    marginTop: "3em",
    padding: 10,
    minHeight: 500,
  },
  searchBar: {
    width: "100%",
  },
  gridContainer: {
    // minWidth: "100%",
  },
}));

const SurflineSearch = ({ closeBackdrop, ...props }) => {
  const classes = useStyles();
  let history = useHistory();
  const apiWrapper = async (key, query) => {
    return await SurflineAPI.search(query);
  };
  const searchInputRef = useRef(null);
  const [query, setQuery] = useState("");
  const { data: results } = useQuery(["search", query], apiWrapper);
  const resultClick = (url) => {
    closeBackdrop();
    history.push(url);
    searchInputRef.current.blur();
  };
  useEffect(() => {
    searchInputRef.current.focus();
  }, []);
  return (
    <Grid container className={classes.gridContainer}>
      <Grid item xs={12}>
        <TextField
          inputRef={searchInputRef}
          className={classes.searchBar}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder="Search for a Spot (ex: Pipeline)"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <List>
          {results?.data[0]?.hits?.hits?.length ? (
            <>
              <ListSubheader>Surf Spots</ListSubheader>
              {results.data[0].hits.hits.map((spot) => (
                <ListItem
                  button
                  key={spot._id}
                  to={`/spot/${spot._id}`}
                  component={Link}
                  onClick={() => resultClick(`/spot/${spot._id}`)}
                >
                  <ListItemIcon>
                    <Room />
                  </ListItemIcon>
                  <ListItemText>{spot._source.name}</ListItemText>
                </ListItem>
              ))}
            </>
          ) : (
            <ListItem>No results</ListItem>
          )}
        </List>
        {/* {results && query && expand && (
          <List>
            <ListSubheader>Surf Spots</ListSubheader>
            {results.data[0].hits.hits.map((spot) => (
              <ListItem
                button
                key={spot._id}
                to={`/spot/${spot._id}`}
                component={Link}
              >
                <ListItemIcon>
                  <Room />
                </ListItemIcon>
                <ListItemText>{spot._source.name}</ListItemText>
              </ListItem>
            ))}
          </List>
        )} */}
      </Grid>
    </Grid>
  );
};

export default SurflineSearch;
