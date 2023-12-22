import moment from "moment";

export const formatDate = (
  date: string | Date,
  formatPrev = "YYYY-MM-DD",
  newFormat = "DD/MM/YYYY"
) => moment(new Date(date), formatPrev).format(newFormat);
