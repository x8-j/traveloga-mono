import { useCallback } from 'react';
import { useGlobalContext } from '../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister } from '@fortawesome/free-solid-svg-icons';
import { useSnackbar } from '../store/snackbar';
import { useBookingMutation } from '../query/booking/useBookingMutation';

const PaymentModal = () => {
  const {
    isPaymentOpen: { id, value },
    cancelPayment,
  } = useGlobalContext();

  const { triggerSnackbar } = useSnackbar();

  const { mutate, isPending } = useBookingMutation({
    onSuccess: () => {
      triggerSnackbar({ type: 'success', message: 'Payment verified!' });
    },
    onError: () => {
      triggerSnackbar({
        type: 'error',
        message: 'Payment verification failed. Please try again.',
      });
    },
    onSettled: () => {
      cancelPayment();
    },
  });
  const onButtonClick = useCallback(() => {
    mutate({ body: { status: 'Booked' }, id, method: 'PATCH' });
  }, [id]);

  return (
    <div className="flex flex-col items-center gap-4 bg-white px-6 py-6 lg:w-fit lg:px-8 lg:py-6">
      <FontAwesomeIcon className="text-4xl" icon={faCashRegister} />
      <div className="flex flex-col items-center">
        <h1 className="font-Rubik text-lg lg:text-xl">Payment Confirmation</h1>
        <h2>Amount: {value}</h2>
      </div>
      <div className="flex w-full items-center gap-2 font-semibold">
        <button
          className="button_transition flex-1 bg-amber-300 py-2 hover:bg-amber-400 hover:text-white"
          onClick={(e) => {
            cancelPayment();
          }}>
          Cancel
        </button>
        <button
          className="button_transition flex-1 bg-amber-300 py-2 hover:text-white enabled:hover:bg-amber-400 disabled:bg-amber-200"
          onClick={onButtonClick}
          disabled={isPending}>
          {isPending ? 'Paying...' : 'Pay'}
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
