import { Grid, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import ReactPlayer from "react-player/file";
import { useLocation } from "react-router";
const StreamViewer = (props) => {
  // const { streamUrl } = props.match.params;
  let { search: searchParams } = useLocation();

  const parseQueryString = function (queryString) {
    const params = {};
    // Split into key/value pairs
    const queries = queryString.substring(1).split("&");

    // Convert the array of strings into an object
    for (let i = 0, l = queries.length; i < l; i++) {
      let temp = queries[i].split("=");
      params[temp[0]] = temp[1];
    }

    return params;
  };
  useEffect(() => {
    document.title = `Stream Viewer | Serfline`;
  }, []);
  const { streamUrl } = parseQueryString(searchParams);
  return (
    <>
      {streamUrl?.length ? (
        <Paper style={{ marginTop: 30, padding: 10 }}>
          <Grid container justify="center">
            <Grid item xs="auto">
              <ReactPlayer
                url={streamUrl}
                playing={false}
                controls
                width="100%"
                height="100%"
              />
            </Grid>
          </Grid>
        </Paper>
      ) : null}
    </>
  );
};

export default StreamViewer;
