import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useUserMutation } from '../query/user';
import { useSnackbar } from '../store/snackbar';

type FormInputs =
  | 'firstname'
  | 'lastname'
  | 'email'
  | 'password'
  | 'currentPassword';
type FormValues = Record<FormInputs, string>;
interface FormInputData {
  title: string;
  inputName: FormInputs;
  type: string;
  icon?: boolean;
  maxLength?: number;
}
const formInputData: FormInputData[] = [
  {
    title: 'First name',
    inputName: 'firstname',
    type: 'text',
  },
  {
    title: 'Last name',
    inputName: 'lastname',
    type: 'text',
  },
  {
    title: 'Email',
    inputName: 'email',
    type: 'email',
    maxLength: 25,
  },
  {
    title: 'Password',
    inputName: 'password',
    icon: true,
    type: '',
  },
  {
    title: 'Current password',
    inputName: 'currentPassword',
    icon: true,
    type: '',
  },
];

const EditAccountComponent = () => {
  const {
    unregister,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [typeisPassword, setTypeIsPassword] = useState({
    password: true,
    currentPassword: true,
  });

  const checkInputValue = (inputName: FormInputs, value: string) => {
    setValue(inputName, value);
    if (!value) unregister(inputName);
  };

  const { mutate } = useUserMutation();

  const { triggerSnackbar } = useSnackbar();

  const onFormSubmit = useCallback(async (body: FormValues) => {
    mutate(
      {
        body,
      },
      {
        onSuccess: () => {
          triggerSnackbar({ type: 'success', message: 'Payment verified!' });
        },
        onError: () => {
          triggerSnackbar({
            type: 'error',
            message: 'Payment verification failed. Please try again.',
          });
        },
      },
    );
  }, []);

  return (
    <form
      className="w-screen bg-white px-8 py-8"
      onSubmit={handleSubmit(onFormSubmit)}>
      <h1 className="mb-8 text-center text-2xl font-medium">
        EDIT ACCOUNT INFO
      </h1>
      <div className="grid grid-flow-row grid-cols-1 gap-4">
        {formInputData.map(({ title, inputName, type, icon }, index) => (
          <div className="flex flex-col" key={index}>
            <label className="text-xl">{title}</label>
            {errors[inputName] && (
              <p className="my-1 text-sm text-red-600">
                {errors[inputName].message}
              </p>
            )}
            <div className="flex items-center justify-center border-2 border-solid border-black/50">
              <input
                className="w-full px-4 py-2"
                type={
                  !type
                    ? inputName in typeisPassword &&
                      typeisPassword[inputName as keyof typeof typeisPassword]
                      ? `password`
                      : `text`
                    : type
                }
                onChange={(e) =>
                  checkInputValue(inputName, e.currentTarget.value)
                }
              />
              {icon && (
                <FontAwesomeIcon
                  className="mx-4 text-2xl"
                  icon={faEye}
                  onClick={() =>
                    setTypeIsPassword({
                      ...typeisPassword,
                      [inputName]: !(
                        inputName in typeisPassword &&
                        typeisPassword[inputName as keyof typeof typeisPassword]
                      ),
                    })
                  }
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-flow-row grid-cols-2 gap-6">
        <button className="transition-color bg-amber-200 py-4 duration-300 ease-in-out hover:bg-amber-300">
          Close
        </button>
        <button
          className="transition-color bg-amber-200 py-4 duration-300 ease-in-out hover:bg-amber-300"
          type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default EditAccountComponent;
