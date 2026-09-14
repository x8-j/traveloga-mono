import {
  DefaultError,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { customFetch } from '../../lib/customFetch';
import { z } from 'zod';
import emailjs from '@emailjs/browser';

export const BASE_URL = 'api/v1/subscription';
export const BASE_QUERY_KEY = ['subscription'];

interface MutationFnProps {
  payload: SubscriptionPayload;
}
export function useSubscriptionMutation(
  props?: Omit<
    UseMutationOptions<unknown, DefaultError, MutationFnProps>,
    'mutationFn'
  >,
) {
  const queryClient = useQueryClient();

  return useMutation<unknown, DefaultError, MutationFnProps>({
    ...props,
    mutationFn: async ({ payload }) => {
      SubscriptionPayloadSchema.parse(payload);

      await customFetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (
        !process.env.REACT_APP_SERVICE_ID ||
        !process.env.REACT_APP_TEMPLATE_ID ||
        !process.env.REACT_APP_PUBLIC_KEY
      ) {
        throw new Error('Icomplete credentials to send email');
      }
      await emailjs.send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        payload,
        process.env.REACT_APP_PUBLIC_KEY,
      );
    },
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: BASE_QUERY_KEY });
      props?.onSuccess?.(...args);
    },
  });
}

export const SubscriptionPayloadSchema = z.object({
  email: z.string(),
});

export type SubscriptionPayload = z.infer<typeof SubscriptionPayloadSchema>;
