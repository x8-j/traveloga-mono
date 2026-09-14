import { useQuery } from '@tanstack/react-query';
import { authCustomFetch } from '../../lib/customFetch';
import { ArrayOfBookingSchema, Booking } from './types';
import { QueryOptions } from '../../types/query';
import { BASE_QUERY_KEY, BASE_URL } from './constant';

interface UseBookingQueryProps {
  options?: QueryOptions<Booking[]>;
}

export function useBookingQuery(props?: UseBookingQueryProps) {
  return useQuery({
    queryKey: BASE_QUERY_KEY,
    queryFn: async () => {
      const { json } = await authCustomFetch(BASE_URL);
      const parsedData = ArrayOfBookingSchema.parse(json);
      return parsedData;
    },
    ...props?.options,
  });
}
