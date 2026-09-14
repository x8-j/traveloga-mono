import {
  DefaultError,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { customFetch } from '../../lib/customFetch';
import { z } from 'zod';

export const BASE_URL = 'api/v1/message';
export const BASE_QUERY_KEY = ['message'];

interface MutationFnProps {
  payload: MessagePayload;
}
export function useMessageMutation(
  props?: Omit<
    UseMutationOptions<unknown, DefaultError, MutationFnProps>,
    'mutationFn'
  >,
) {
  const queryClient = useQueryClient();

  return useMutation<unknown, DefaultError, MutationFnProps>({
    ...props,
    mutationFn: async ({ payload }) => {
      MessagePayloadSchema.parse(payload);

      await customFetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: BASE_QUERY_KEY });
      props?.onSuccess?.(...args);
    },
  });
}

export const MessagePayloadSchema = z.object({
  email: z.string(),
  name: z.string(),
  subject: z.string(),
  message: z.string(),
});

export type MessagePayload = z.infer<typeof MessagePayloadSchema>;
