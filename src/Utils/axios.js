import axios from "axios";
import firebaseConfig from '../fbconfig'

export default axios.create({
  baseURL: firebaseConfig.databaseURL,
  responseType: "json"
});