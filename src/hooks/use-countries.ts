import { getCountries } from "@/actions/set-country";
import { useQuery } from "@tanstack/react-query";

export const useCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const data = await getCountries();
      return data;
    },
  });
};
