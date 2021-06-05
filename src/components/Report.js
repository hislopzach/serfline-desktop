import React from "react";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import TheatersIcon from "@material-ui/icons/Theaters";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { degToCompass } from "../util";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  details: {
    marginBottom: 5,
  },
  highlights: {
    textAlign: "left",
  },
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
    cursor: "pointer",
  },
}));

const Report = ({ reportData, nearbyData, overview, ...props }) => {
  const classes = useStyles();
  const { spot, forecast, report } = reportData;
  const {
    data: { forecastSummary },
  } = overview;
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Typography variant="h2">{spot.name}</Typography>
      </Grid>
      <Grid
        container
        item
        xs={12}
        md={6}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item className={classes.details}>
          Tide: {forecast.tide.current.height} ft{" "}
          {forecast.tide.next.type === "LOW" ? "falling" : "rising"}
        </Grid>
        <Grid item>
          Wind: {forecast.wind.speed}kts {degToCompass(forecast.wind.direction)}
        </Grid>
        <Grid item>
          Surf Height: {forecast.waveHeight.min}-{forecast.waveHeight.max} ft (
          {forecast.waveHeight.humanRelation})
        </Grid>
        <Grid item>
          Water Temp: {forecast.waterTemp.min}°-{forecast.waterTemp.max}°
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} className={classes.highlights}>
        <strong>Highlights:</strong>
        <ul>
          {forecastSummary.highlights.map((highlight, ndx) => (
            <li key={ndx}>{highlight}</li>
          ))}
        </ul>
      </Grid>
      <Grid item xs={12} md={6} className={classes.highlights}>
        <div dangerouslySetInnerHTML={{ __html: report?.body }}></div>
      </Grid>
      <Grid item xs={10} container justify="center" alignItems="center">
        <Grid item xs={12} md={4} justify="center">
          <strong>Cam Links:</strong>
          <div>
            <List component="nav">
              {spot.cameras?.length ? (
                spot.cameras?.map((cam, ndx) => (
                  <ListItem
                    button
                    component={Link}
                    disabled={cam.status.isDown}
                    to={{
                      pathname: "/stream",
                      search: `?streamUrl=${cam.streamUrl}`,
                    }}
                  >
                    <ListItemIcon>
                      {cam.status.isDown ? (
                        <VideocamOffIcon />
                      ) : (
                        <VideocamIcon />
                      )}
                    </ListItemIcon>
                    <ListItemText primary={cam.title} />
                  </ListItem>
                ))
              ) : (
                <>No cameras available</>
              )}
            </List>
          </div>
        </Grid>
        <Grid item xs={12} md={4} justify="center">
          <strong>Rewind Links:</strong>
          <div>
            <List component="nav">
              {spot.cameras?.length ? (
                spot.cameras?.map((cam, ndx) => (
                  <ListItem
                    button
                    component={Link}
                    to={{
                      pathname: "/stream",
                      search: `?streamUrl=${getLatestRewind(
                        cam.rewindBaseUrl
                      )}`,
                    }}
                  >
                    <ListItemIcon>
                      <TheatersIcon />
                    </ListItemIcon>
                    <ListItemText primary={cam.title} />
                  </ListItem>
                ))
              ) : (
                <>No cameras available</>
              )}
            </List>
          </div>
        </Grid>
      </Grid>

      <Grid item xs={12} md={8}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Nearby Spots</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Paper elevation={0} component="ul" className={classes.root}>
              {nearbyData &&
                nearbyData.spots
                  .filter((s) => s.name !== spot.name)
                  ?.map((s, ndx) => (
                    <li key={ndx}>
                      <Chip
                        color="primary"
                        label={s.name}
                        icon={
                          s.cameras?.length && <VideocamIcon fontSize="small" />
                        }
                        className={classes.chip}
                        to={`/spot/${s._id}`}
                        component={Link}
                      />
                    </li>
                  ))}
            </Paper>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default Report;
