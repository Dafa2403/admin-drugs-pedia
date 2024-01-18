import axios from "axios";

// const BASE_URL = "http://localhost:8080";
const BASE_URL = "http://195.35.9.182:8080"; //public


const cancelToken = axios.CancelToken.source();

export default axios.create({
  cancelToken: cancelToken.token,
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
  },
});
