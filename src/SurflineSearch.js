import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  List,
  ListItem,
  TextField,
  Container,
  Paper,
  Grid,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Search, Room } from "@material-ui/icons";
import { Link } from "react-router-dom";

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
}));

const SurflineSearch = ({ ...props }) => {
  const classes = useStyles();

  const apiWrapper = async (key, query) => {
    return await SurflineAPI.search(query);
  };

  const [query, setQuery] = useState("");
  const { data: results } = useQuery(["search", query], apiWrapper);

  return (
    <Container maxWidth="lg" className={classes.mainPaper}>
      <Paper>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              className={classes.searchBar}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              placeholder="Search for a Spot"
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
            {results && query && (
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
                {/* <ListSubheader>Regions</ListSubheader>
                {results.data[1].hits.hits.map((spot) => (
                  <ListItem
                    button
                    key={spot._id}
                    to={`/spot/${spot._id}`}
                    component={Link}
                  >
                    <ListItemIcon>
                      <Map />
                    </ListItemIcon>
                    <ListItemText>{spot._source.name}</ListItemText>
                  </ListItem>
                ))} */}
              </List>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SurflineSearch;
