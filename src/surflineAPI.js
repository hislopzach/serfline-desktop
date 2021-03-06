import axios from "axios";

const surflineUrl = "https://services.surfline.com";

const getSwells = async (spotId, days = 3) =>
  axios.get(
    `${surflineUrl}/kbyg/spots/forecasts/wave?spotId=${spotId}&days=${days}&intervalHours=1`
  );
const getTides = (spotId, days = 3) =>
  axios.get(
    `${surflineUrl}/kbyg/spots/forecasts/tides?spotId=${spotId}&days=${days}`
  );
const getWinds = (spotId, days = 3) =>
  axios.get(
    `${surflineUrl}/kbyg/spots/forecasts/wind?spotId=${spotId}&days=${days}`
  );
const getReport = async (spotId) =>
  axios.get(`${surflineUrl}/kbyg/spots/reports?spotId=${spotId}`);
const getOverview = async (subregionId) =>
  axios.get(`${surflineUrl}/kbyg/regions/overview?subregionId=${subregionId}`);
const getConditions = async (subregionId) =>
  axios.get(
    `${surflineUrl}/kbyg/regions/forecasts/conditions?subregionId=${subregionId}`
  );
const getFeaturedCam = async () => axios.get(`${surflineUrl}/kbyg/cotm`);
const search = async (term) =>
  axios.get(`${surflineUrl}/search/site?q=${term}&querySize=10`);

const getArticle = async (url) => {
  const { data } = await axios.get(url);
  return data;
};
const getNearbySpots = async (spotId) => {
  const { data } = await axios.get(
    `${surflineUrl}/kbyg/spots/nearby?spotId=${spotId}`
  );
  return data;
};
// const getWeathers = (spotId) =>
//   client.get(`${surflineUrl}/weather?spotId=${spotId}&days=1&intervalHours=12`);

export default {
  getSwells,
  getTides,
  getWinds,
  getReport,
  getOverview,
  search,
  getConditions,
  getFeaturedCam,
  getArticle,
  getNearbySpots,
};
