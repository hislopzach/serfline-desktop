import { sub } from "date-fns";
import { format } from "date-fns/esm";
import colors from "./colors";

export const degToCompass = (deg) => {
  var val = Math.floor(deg / 22.5 + 0.5);
  var arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
};

export const conditionToColor = (condition) => {
  switch (condition) {
    case "FLAT":
      return colors.grey;
    case "POOR":
    case "VERY POOR":
    case "POOR_TO_FAIR":
      return colors.blueLight;
    case "FAIR":
    case "FAIR_TO_GOOD":
      return colors.green;
    case "GOOD":
    case "VERY_GOOD":
      return colors.orange;
    case "GOOD_TO_EPIC":
    case "EPIC":
      return colors.red;
    default:
      return colors.blueLight;
  }
};

const getInnerJson = (scriptTagContents) => {
  const startIndex = scriptTagContents.indexOf("{");
  const toParse = scriptTagContents.slice(startIndex);
  const json = JSON.parse(toParse);
  return json;
};

export const getHtmlForArticle = (html) => {
  let domParser = new DOMParser();
  let doc = domParser.parseFromString(html, "text/html");
  let scriptTage = Array.from(doc.querySelectorAll("script"));
  let targetTag = scriptTage.filter(
    (tag) => tag.innerText.indexOf("window.__DATA__") > -1
  )[0];
  let data = getInnerJson(targetTag.innerText);
  console.log(data);
  return data.editorial.article.content.body;
};
export const getArticleData = (html) => {
  let domParser = new DOMParser();
  let doc = domParser.parseFromString(html, "text/html");
  let scriptTag = Array.from(doc.querySelectorAll("script"));
  let targetTag = scriptTag.find(
    (tag) => tag.innerText.indexOf("window.__DATA__") > -1
  );
  let data = getInnerJson(targetTag.innerText);
  return data;
};

export const getArticleContent = (articleData) => {
  if (articleData?.editorial?.success) {
    console.log("Editorial article");
    return articleData.editorial.article.content
  }
  if (articleData?.forecast?.activeArticle) {
    console.log("Forecast article");
    return articleData.forecast.activeArticle.article.content
  }
}

export const getArticleFromHTML = (html) => {
  const data = getArticleData(html);
  const content = getArticleContent(data);
  return content;
}


export const getLatestRewind = (rewindBaseUrl) => {
  const targetDate = dateForRewind();
  return `${rewindBaseUrl}.${targetDate}.mp4`;
};

const dateForRewind = () => {
  // get current time
  const now = new Date();
  // subtract 15 mins
  let targetDate = sub(now, {
    minutes: 15,
  });
  // put into surfline format
  const formatted = format(targetDate, "HHmm.y-MM-dd");
  return formatted;
};
