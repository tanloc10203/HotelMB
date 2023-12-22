import BaseAxios from "../axios/baseAxios";
import instance from "../axios/configAxios";

class TaxAPI extends BaseAxios {}

export default new TaxAPI("/Taxs", instance);
