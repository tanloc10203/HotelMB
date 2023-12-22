import BaseAxios from "../axios/baseAxios";
import instance from "../axios/configAxios";

class RateAPI extends BaseAxios {}

export default new RateAPI("/Rates", instance);
