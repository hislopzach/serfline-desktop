import axios from "axios";

// const baseUrl = "http://localhost:8080/";
// const baseUrl = "http://billybutcher.gq:8888/";
const baseUrl = " http://45.76.173.71/";
export const get = async (url) => {
  const { data } = await axios.get(baseUrl + url);
  return data;
};

export default {
  get,
};
