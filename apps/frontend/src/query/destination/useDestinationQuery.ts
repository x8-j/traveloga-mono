import { DefaultError, UseQueryResult, useQuery } from '@tanstack/react-query';
import { customFetch } from '../../lib/customFetch';
import {
  ArrayOfDestinationsSchema,
  Destination,
  DestinationSchema,
} from './types';
import { QueryOptions } from '../../types/query';

export type ShowCaseType = 'top' | 'seasonal';

type ParamsFilter =
  | Record<'limitedOffers', 'true' | 'false'>
  | Record<'showCase', ShowCaseType>;
interface MultipleDestinationProps {
  paramsFilter?: ParamsFilter;
  options?: QueryOptions<Destination[]>;
}
interface SingularDestinationProps {
  id: string;
  options?: QueryOptions<Destination>;
}

const BASE_QUERY_KEY = ['destinations'];
const BASE_URL = 'api/v1/destinations';

/**
 * Fetches either all destinations or just one destination
 *
 * @param
 ** `paramsFilter` - All Destinations:
 ** `id` - Single Destination:
 *
 * @param options - useQuery options.
 * @returns The useQuery return object.
 */
export function useDestinationQuery(
  props?: MultipleDestinationProps,
): UseQueryResult<Destination[], DefaultError>;
export function useDestinationQuery(
  props?: SingularDestinationProps,
): UseQueryResult<Destination, DefaultError>;

export function useDestinationQuery(
  props?: MultipleDestinationProps | SingularDestinationProps,
): UseQueryResult<Destination | Destination[], DefaultError> {
  if (props && 'id' in props) {
    return useQuery({
      queryKey: [...BASE_QUERY_KEY, props.id],
      queryFn: async () => {
        const { json } = await customFetch(`${BASE_URL}/${props.id}`);
        const parsedData = DestinationSchema.parse(json);
        return parsedData;
      },
      gcTime: Infinity,
      ...props?.options,
    });
  }

  const { queryKey, URL } = getParamsFilterProps(props?.paramsFilter);
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { json } = await customFetch(URL);
      const parsedData = ArrayOfDestinationsSchema.parse(json);
      return parsedData;
    },
    gcTime: Infinity,
    ...props?.options,
  });
}

function getParamsFilterProps(paramsFilter?: ParamsFilter) {
  if (!paramsFilter) {
    return {
      queryKey: BASE_QUERY_KEY,
      URL: BASE_URL,
    };
  }

  const searchParams = new URLSearchParams(paramsFilter);
  return {
    queryKey: [...BASE_QUERY_KEY, JSON.stringify(paramsFilter)],
    URL: BASE_URL + '/' + searchParams.toString(),
  };
}
