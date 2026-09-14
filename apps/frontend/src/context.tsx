import React, { createContext, useContext, useState } from 'react';

export interface ContentModal {
  id: string;
  type: 'booking' | 'destination' | 'login' | 'signin' | '';
  isOpen: boolean;
}

interface AppContextType {
  setPayment: (id: string, value: number) => void;
  cancelPayment: () => void;
  openSignInModal: () => void;
  closeModal: () => void;
  openDestinationUI: (value: string) => void;
  openBookingUI: (value?: string) => void;
  contentModal: ContentModal;
  user: any | null;
  setUser: (user: any) => void;
  isAccountEditOpen: boolean;
  setIsAccountEditOpen: (open: boolean) => void;
  isPaymentOpen: { isOpen: boolean; value: number; id: string };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAccountEditOpen, setIsAccountEditOpen] = useState<boolean>(false);

  // Booking, Destination, SignIn Modal
  const [contentModal, setContentModal] = useState<ContentModal>({
    id: '',
    type: '',
    isOpen: false,
  });

  const openBookingUI = (value?: string) => {
    setContentModal((prev) => ({
      id: value ?? prev.id,
      type: 'booking',
      isOpen: true,
    }));
  };

  const openDestinationUI = (value: string) => {
    setContentModal({
      id: value,
      type: 'destination',
      isOpen: true,
    });
  };

  const openSignInModal = () => {
    setContentModal({
      id: '',
      type: 'signin',
      isOpen: true,
    });
  };

  const closeModal = () => {
    setContentModal({
      id: '',
      type: '',
      isOpen: false,
    });
  };

  //Payment Modal
  const [isPaymentOpen, setIsPaymentOpen] = useState<{
    isOpen: boolean;
    value: number;
    id: string;
  }>({
    isOpen: false,
    value: 0,
    id: '',
  });

  const setPayment = (id: string, value: number) => {
    setIsPaymentOpen({
      isOpen: true,
      value: value,
      id: id,
    });
  };

  const cancelPayment = () => {
    setIsPaymentOpen({
      isOpen: false,
      value: 0,
      id: '',
    });
  };

  //User

  const [user, setUser] = useState<any | null>(null);

  const value = {
    setPayment,
    cancelPayment,
    openSignInModal,
    closeModal,
    openDestinationUI,
    openBookingUI,
    contentModal,
    user,
    setUser,
    isAccountEditOpen,
    setIsAccountEditOpen,
    isPaymentOpen,
  };

  return <AppContext.Provider {...{ value }}>{children}</AppContext.Provider>;
};

export const useGlobalContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within an AppProvider');
  }
  return context;
};

export default AppProvider;
