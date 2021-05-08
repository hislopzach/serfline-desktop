import axios from "axios";

// const baseUrl = "http://localhost:8080/";
const baseUrl = "http://billybutcher.gq:8888/";
// const baseUrl = "https://crossorigin.me/";
export const get = async (url) => {
  const { data } = await axios.get(baseUrl + url);
  return data;
};

export default {
  get,
};
