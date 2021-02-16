import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  copyright: {
    color: "#838687",
    textAlign: "center",
  },
}));

const Footer = () => {
  const styles = useStyles();

  return (
    <Grid container spacing={2} justify="center" className={styles.container}>
      <Grid item xs={12} md="auto">
        <Typography variant="subtitle2" className={styles.copyright}>
          Created by Zachary Hislop.
        </Typography>
      </Grid>
      <Grid item xs="auto">
        <Typography variant="subtitle2" className={styles.copyright}>
          Serfline is not associated with Surfline. All Forecast data is
          property of Surfline
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
