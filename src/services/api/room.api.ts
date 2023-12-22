import BaseAxios from "../axios/baseAxios";
import instance from "../axios/configAxios";

class RoomAPI extends BaseAxios {}

export default new RoomAPI("/Rooms", instance);
