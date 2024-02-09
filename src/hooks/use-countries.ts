import { getCountries } from "@/actions/set-country";
import { useQuery } from "@tanstack/react-query";

export const useCountries = () => {
  const refetchInterval = process.env.NEXT_PUBLIC_REFETCH_INTERVAL || 5000;
  return useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const data = await getCountries();
      return data;
    },
    refetchInterval: Number(refetchInterval),
  });
};
