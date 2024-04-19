import { createContext, useContext, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';

import Alert, { AlertButton, AlertProps } from '../components/Alert/Alert';
import CustomModal from '../components/Modal/Modal';

export interface AlertOptions {
  title?: string;
  message: string | JSX.Element;
  buttons: AlertButton[];
}

export interface AlertRef {
  id: string;
  component: React.FC<any>;
  props?: any;
  title?: string;
  close: (result?: any) => void;
}

export interface IAlertProvider {
  open: (options: AlertOptions) => void;
}

interface AlertProviderProps {
  children: JSX.Element;
}

const AlertContext = createContext<IAlertProvider | undefined>(undefined);

const AlertProvider = (props: AlertProviderProps) => {
  const [alertList, setAlertList] = useState<AlertRef[]>([]);

  const close = (id: string) => {
    setAlertList(alertList.filter((modal) => modal.id !== id));
  };

  const open = (options: AlertOptions) => {
    const id = uuidV4();
    const modal: AlertRef = {
      id,
      component: Alert,
      props: options as AlertProps,
      title: options.title,
      close: () => close(id)
    };

    setAlertList((ml) => [...ml, modal]);
    return modal;
  };

  return (
    <AlertContext.Provider value={{ open }}>
      {props.children}
      {alertList.map((modal) => (
        <CustomModal
          key={modal.id}
          close={modal.close}
          title={modal.title}
          hideCloseButton={true}
        >
          <modal.component {...modal.props} modalRef={modal} />
        </CustomModal>
      ))}
    </AlertContext.Provider>
  );
};

export default AlertProvider;

export const useAlert = () => useContext(AlertContext)!;
