import {
  DefaultError,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { authCustomFetch } from '../../lib/customFetch';
import { BookingSchemaPayload, BookingPayload } from './types';
import { BASE_URL, BASE_QUERY_KEY } from './constant';

type MutationFnProps =
  | {
      id: string;
      method: 'POST';
      body: BookingPayload;
    }
  | {
      id: string;
      method: 'PATCH';
      body: BookingPayload;
    }
  | {
      id: string;
      method: 'DELETE';
    };
export function useBookingMutation(
  props?: Omit<
    UseMutationOptions<unknown, DefaultError, MutationFnProps>,
    'mutationFn'
  >,
) {
  const queryClient = useQueryClient();

  return useMutation<unknown, DefaultError, MutationFnProps>({
    ...props,
    mutationFn: async (mutateProps) => {
      const { id, method } = mutateProps;
      const URL = BASE_URL + '/' + id;

      if (method === 'DELETE') {
        await authCustomFetch(URL, {
          method,
        });
        return;
      }

      const { body } = mutateProps;

      BookingSchemaPayload.parse(body);

      await authCustomFetch(URL, {
        method,
        body: JSON.stringify(body),
      });
    },
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: BASE_QUERY_KEY });
      props?.onSuccess?.(...args);
    },
  });
}
