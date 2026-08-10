import { Outlet } from 'react-router-dom';
import { useGlobalContext } from '../../context';
import { useSnackbar } from '../../store/snackbar';
import BookingUI from '../BookingUI/BookingUI';
import EachDestinationUI from '../EachDestinationUI';
import Footer from '../Footer';
import { SignInRequiredComponent, StatusSnackBar } from '../PopUpComponents';
import TransitionWrapper from '../TransitionWrapper';
import Nav from '../Navigation';

const Layout = () => {
  const {
    user,
    contentModal: { isOpen: isContentOpen, type: contentType },
  } = useGlobalContext();

  const { isOpen } = useSnackbar();

  return (
    <div className="relative flex flex-col items-center">
      <div className="flex flex-col items-center container">
        <Nav />
        <Outlet />
        <Footer />
      </div>
      <TransitionWrapper isOpen={isContentOpen}>
        {isContentOpen && contentType === 'destination' && (
          <EachDestinationUI />
        )}
        {isContentOpen && contentType === 'booking' && <BookingUI />}
        {isContentOpen && contentType === 'signin' && (
          <SignInRequiredComponent />
        )}
      </TransitionWrapper>
      {isOpen && <StatusSnackBar />}
    </div>
  );
};

export default Layout;
