import {
  faCartFlatbedSuitcase,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback } from 'react';
import { useGlobalContext } from '../../context';
import {
  DateOfBookingComponent,
  FlightypeAndRegionComponent,
  HotelToggleComponent,
  LocationComponent,
  PriceComponent,
} from './index';
import useBookingContext, { BookingProvider } from './BookingStateContext';
import { useBookingMutation } from '../../query/booking';
import { useSnackbar } from '../../store/snackbar';

const BookingUI = () => {
  const { closeModal, contentModal } = useGlobalContext();
  const {
    regionsCategory,
    travellingFromRegion,
    travellingFromLocation,
    dateOfLeave,
    amount,
    withHotel,
    flightType,
    dateOfReturn,
    title,
  } = useBookingContext();

  const { triggerSnackbar } = useSnackbar();
  const { mutate, isPending } = useBookingMutation({
    onSuccess: () => {
      triggerSnackbar({
        type: 'success',
        message: 'Flight booked sucessfully!',
      });
    },
    onError: () => {
      triggerSnackbar({
        type: 'error',
        message: 'Failed to book flight',
      });
    },
    onSettled: closeModal,
  });

  const onFormSubmit = useCallback(() => {
    mutate({
      id: contentModal.id,
      method: 'POST',
      body: {
        travellingFromLocation,
        regionsCategory,
        travellingFromRegion,
        travellingTo: title,
        dateOfLeave,
        dateOfReturn,
        withHotel,
        flightType,
        amount,
      },
    });
  }, [
    contentModal.id,
    travellingFromLocation,
    regionsCategory,
    travellingFromRegion,
    title,
    dateOfLeave,
    dateOfReturn,
    withHotel,
    flightType,
    amount,
  ]);

  return (
    <BookingProvider>
      <div className="flex max-w-4xl flex-row-reverse justify-center bg-white md:w-fit">
        <form
          className="relative flex w-full flex-col gap-2 bg-white p-6 md:gap-3 md:py-6"
          onSubmit={(e) => {
            e.preventDefault();
            onFormSubmit();
          }}>
          <div className="relative self-end">
            <FontAwesomeIcon
              className="button_transition absolute right-0 top-0 z-10 text-2xl text-black/50 hover:text-black"
              icon={faXmark}
              onClick={() => closeModal()}
            />
          </div>
          <h1 className="font-Rubik text-xl lg:text-2xl">PLANE BOOKING</h1>
          <div className="grid h-full grid-cols-6 content-start gap-x-3 gap-y-2 md:grid-cols-10 md:gap-3">
            <FlightypeAndRegionComponent />
            <LocationComponent />
            <HotelToggleComponent />
            <DateOfBookingComponent />
            <PriceComponent />
          </div>
          <button
            className="button_transition col-span-6 flex items-center justify-center gap-3 rounded-lg bg-amber-300 py-3 hover:text-white enabled:hover:bg-amber-400 disabled:bg-amber-200"
            type="submit"
            disabled={isPending}>
            <FontAwesomeIcon
              className="text-lg md:text-xl"
              icon={faCartFlatbedSuitcase}
            />
            <h1 className="font-semibold md:text-lg">
              {isPending ? 'BOOKING...' : 'BOOK FLIGHT'}
            </h1>
          </button>
        </form>
      </div>
    </BookingProvider>
  );
};

export default BookingUI;
