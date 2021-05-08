import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "white",
    marginTop: theme.spacing(5),
  },
  paper: {
    padding: theme.spacing(3),
  },
  textfield: {
    width: "100%",
  },
}));

const Articles = () => {
  const classes = useStyles();
  const history = useHistory();
  const [articleUrl, setArticleUrl] = useState("");
  useEffect(() => {
    document.title = `Articles | Serfline`;
  }, []);

  const viewArticleClick = () => history.push("/article?article=" + articleUrl);
  return (
    <Container className={classes.container}>
      <Paper elevation={0} className={classes.paper}>
        <Grid container justify="center">
          <Grid item xs={12}>
            <Typography variant="h2">View Surfline Articles</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              Paste a Surfline url here to view the entire article
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField
              className={classes.textfield}
              variant="outlined"
              type="text"
              label="Paste URL here"
              size="small"
              value={articleUrl}
              onChange={(event) => setArticleUrl(event.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={viewArticleClick}
            >
              View Article
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Articles;
