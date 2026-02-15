import { useQuery } from '@tanstack/react-query';
import { requestWhoAmI } from '../../api/user';

export const useWhoAmIQuery = () => {
  return useQuery({
    queryKey: ['whoAmI'],
    queryFn: async () => {
      try {
        const { data } = await requestWhoAmI();
        return data.user;
      } catch (error) {
        return null;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};
