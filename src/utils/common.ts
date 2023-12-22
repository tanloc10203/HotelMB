import { IPriceByHour } from "@/models/roomPriceByHour.model";

export const calcWithDiscount = (totalPrice: number, priceDiscount: number) =>
  priceDiscount > 100
    ? totalPrice - priceDiscount
    : totalPrice - (totalPrice * priceDiscount) / 100;

export const calcPriceHourWithDiscount = ({
  priceHours,
  totalPrice,
  totalTime,
  priceDiscount,
}: {
  totalPrice: number;
  priceHours: IPriceByHour[];
  totalTime: number;
  priceDiscount: number;
}) => {
  let results = calcWithDiscount(totalPrice, priceDiscount);
  // const priceHoursLength = priceHours.length;

  // console.log("========================================================================");

  const timeUsed: number[] = [];

  for (let j = 0; j < totalTime; j++) {
    const time = j + 1;

    const priceHour = priceHours.find((t) => t.start_hour === time);

    if (priceHour) {
      const priceDiscountCalc = calcWithDiscount(priceHour.price, priceDiscount);
      timeUsed.push(time);
      results += priceDiscountCalc;

      // console.log(`${time} results = `, { results, price: priceHour?.price });
    } else {
      // console.log(`Không tìm thấy time = `, time);
      // If time is max in timeUsed => get last timeUsed else first time;

      const timeUsedLast = timeUsed[timeUsed.length - 1];

      if (time > timeUsedLast) {
        const priceHour = priceHours.find((t) => t.start_hour === timeUsedLast);

        if (priceHour) {
          const priceDiscountCalc = calcWithDiscount(priceHour.price, priceDiscount);
          results += priceDiscountCalc;
        }

        // console.log(`${time} results = `, { results, price: priceHour?.price });
      } else {
        // console.log(`${time} results else = `, results);
      }
    }
  }

  // console.log(timeUsed);

  // console.log("========================================================================");

  return results;
};
