import EachBooking from './EachBooking';
import type { Booking } from '../../types/Booking';
import type { BookingFilter } from './AccountNavigation';

interface BookingsListProps {
  listOfBookings: Booking[];
  alterBookingList: (bookings: Booking[]) => void;
  bookingFilter: BookingFilter;
}
const BookingsList = ({
  listOfBookings,
  alterBookingList,
  bookingFilter,
}: BookingsListProps) => {
  const bookingListValues = ['Cart', 'Booked', 'Cancelled', 'Refunded'];

  if (bookingFilter) {
    return (
      <div className="flex w-full flex-col gap-2 p-4 md:bg-black/10">
        <h1 className="font-Rubik text-lg font-semibold lg:text-xl">
          {bookingFilter.toUpperCase()}
        </h1>
        <div className="grid grid-flow-row grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
          {listOfBookings &&
            listOfBookings
              .filter((eachBooking) => eachBooking.status === bookingFilter)
              .map((eachBooking, index) => (
                <EachBooking
                  {...{ eachBooking, alterBookingList }}
                  key={index}
                />
              ))}
        </div>
      </div>
    );
  }
  return (
    <>
      {bookingListValues.map((title, index1) => (
        <div
          className="flex w-full flex-col gap-2 p-4 odd:bg-black/10 md:odd:bg-white md:even:bg-black/10"
          key={index1}>
          <h1 className="font-Rubik text-lg font-semibold lg:text-xl">
            {title.toUpperCase()}
          </h1>
          <div className="grid grid-flow-row grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
            {listOfBookings &&
              listOfBookings
                .filter((eachBooking) => eachBooking.status === title)
                .map((eachBooking, index) => (
                  <EachBooking
                    {...{ eachBooking, alterBookingList }}
                    key={index}
                  />
                ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default BookingsList;
