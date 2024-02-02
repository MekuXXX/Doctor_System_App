import { Rate } from "@prisma/client";

export const calculateRate = (rates: { rateValue: number }[]) => {
  if (!rates.length) return 0;

  let numberRates = 0;
  const rate = rates.reduce((acc, curr) => {
    ++numberRates;
    return acc + curr.rateValue;
  }, 0);
  return rate / numberRates;
};
