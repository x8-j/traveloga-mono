import { UseQueryOptions, DefaultError, QueryKey } from '@tanstack/react-query';

export type QueryOptions<T> = Omit<
  UseQueryOptions<T, DefaultError, T, QueryKey>,
  'queryKey' | 'queryFn'
>;
