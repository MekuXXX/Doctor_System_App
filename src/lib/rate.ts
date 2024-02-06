export const calculateRate = (rates: { rateValue: number }[]) => {
  if (!rates || rates.length === 0) return 1;

  let numberRates = 0;
  const rate = rates.reduce((acc, curr) => {
    ++numberRates;
    return acc + curr.rateValue;
  }, 0);
  return rate / numberRates;
};
