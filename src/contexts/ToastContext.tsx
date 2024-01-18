'use client';

import { createContext, useContext } from 'react';
import { ToastContainer, TypeOptions, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TOAST_DURATION = 4000;

export interface IToastProvider {
  open: (message: string, type?: TypeOptions) => void;
}

interface ToastProviderProps {
  children: JSX.Element | JSX.Element[];
}

const ToastContext = createContext<IToastProvider | undefined>(undefined);

const ToastProvider = ({ children }: ToastProviderProps) => {
  const open = (message: string, type: TypeOptions = 'info') => {
    toast(message, {
      type,
      autoClose: TOAST_DURATION
    });
  };

  return (
    <ToastContext.Provider value={{ open }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

export default ToastProvider;

export const useToast = () => useContext(ToastContext)!;
