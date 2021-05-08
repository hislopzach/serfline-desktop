import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router";
import proxyApi from "../proxyAPI";
import { getArticleData } from "../util";
import "./EditorialArticleBody.scss";
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "white",
    marginTop: theme.spacing(3),
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
  const { data: articlePage } = useQuery(["article", article], () =>
    proxyApi.get(article)
  );
  const articleData = articlePage ? getArticleData(articlePage) : {};
  return (
    <Container className={classes.container}>
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
      {articlePage && (
        <>
          <Typography variant="h3">
            {articleData.editorial.article.content.title}
          </Typography>
          <div
            dangerouslySetInnerHTML={{
              __html: articleData.editorial.article.content.body,
            }}
          ></div>
        </>
      )}
    </Container>
  );
};

export default Article;
