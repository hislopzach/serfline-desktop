import {
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import proxyApi from "../proxyAPI";
import { getArticleData } from "../util";
import "./EditorialArticleBody.scss";
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "white",
    marginTop: theme.spacing(3),
  },
  title: {
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  loadingItem: {
    minHeight: 250,
  },
}));

const Article = () => {
  const classes = useStyles();
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
  const { article } = parseQueryString(searchParams);
  const { data: articlePage, status } = useQuery(["article", article], () =>
    proxyApi.get(article)
  );
  const articleData = articlePage ? getArticleData(articlePage) : {};
  return (
    <Container className={classes.container} maxWidth="lg">
      <link
        rel="stylesheet"
        type="text/css"
        href="https://wa.cdn-surfline.com/backplane/margins-081a5417289d249b0cea.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://wa.cdn-surfline.com/travel/main-d8688f844328cacc1b7d.css"
      />
      <Grid container justify="center">
        <Grid item xs={12}>
          {status === "success" && (
            <>
              <div className={classes.title}>
                <Typography variant="h3">
                  {articleData.editorial.article.content.title}
                </Typography>
              </div>
              <div
                className="sl-editorial-article-body"
                dangerouslySetInnerHTML={{
                  __html: articleData.editorial.article.content.body,
                }}
              ></div>
            </>
          )}
          {status === "loading" && (
            <Grid
              item
              container
              justify="center"
              alignItems="center"
              className={classes.loadingItem}
            >
              <CircularProgress />
            </Grid>
          )}
          {status === "error" && (
            <>
              <Typography variant="h3">Something went wrong</Typography>
              <Link to="/articles">
                <Typography variant="h6">Return to Articles page</Typography>
              </Link>
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Article;
