import BaseAxios from "../axios/baseAxios";
import instance from "../axios/configAxios";

class InformationHotelsAPI extends BaseAxios {}

export default new InformationHotelsAPI("/InformationHotels", instance);
