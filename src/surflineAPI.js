import axios from "axios";

const surflineUrl = "https://services.surfline.com";
export default {
  getSwells: (spotId) => getSwells(spotId),
  getTides: (spotId) => getTides(spotId),
  getWinds: (spotId) => getWinds(spotId),
  getReport: (spotId) => getReport(spotId),
  getOverview: (subregionId) => getOverview(subregionId),
  search: (term) => search(term),
};

const getSwells = async (spotId) =>
  axios.get(
    `${surflineUrl}/kbyg/spots/forecasts/wave?spotId=${spotId}&days=6&intervalHours=1`
  );
const getTides = (spotId) =>
  axios.get(
    `${surflineUrl}/kbyg/spots/forecasts/tides?spotId=${spotId}&days=6`
  );
const getWinds = (spotId) =>
  axios.get(`${surflineUrl}/kbyg/spots/forecasts/wind?spotId=${spotId}&days=6`);
const getReport = async (spotId) =>
  axios.get(`${surflineUrl}/kbyg/spots/reports?spotId=${spotId}`);
const getOverview = async (subregionId) =>
  axios.get(`${surflineUrl}/kbyg/regions/overview?subregionId=${subregionId}`);
const getConditions = async (subregionId) =>
  axios.get(
    `${surflineUrl}/kbyg/regions/forecasts/conditions?subregionId=${subregionId}`
  );
const search = async (term) =>
  axios.get(`${surflineUrl}/search/site?q=${term}`);

// const getWeathers = (spotId) =>
//   client.get(`${surflineUrl}/weather?spotId=${spotId}&days=1&intervalHours=12`);
