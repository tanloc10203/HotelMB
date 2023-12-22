import BaseAxios from "../axios/baseAxios";
import instance from "../axios/configAxios";

class BannerAPI extends BaseAxios {}

export default new BannerAPI("/Banners", instance);
