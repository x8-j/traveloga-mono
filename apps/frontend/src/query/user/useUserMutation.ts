import {
  DefaultError,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { authCustomFetch } from '../../lib/customFetch';
import { z } from 'zod';

type MutationFnProps = {
  body: UserPayload;
};

const BASE_URL = 'api/v1/users';
const BASE_QUERY_KEY = ['users'];
export function useUserMutation(
  props?: Omit<
    UseMutationOptions<unknown, DefaultError, MutationFnProps>,
    'mutationFn'
  >,
) {
  const queryClient = useQueryClient();

  return useMutation<unknown, DefaultError, MutationFnProps>({
    ...props,
    mutationFn: async ({ body }) => {
      UserPayloadSchema.parse(body);

      await authCustomFetch(BASE_URL, {
        method: 'PATCH',
        body: JSON.stringify(body),
      });
    },
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: BASE_QUERY_KEY });
      props?.onSuccess?.(...args);
    },
  });
}

export const UserPayloadSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string(),
  password: z.string(),
  currentPassword: z.string(),
});
export type UserPayload = z.infer<typeof UserPayloadSchema>;
