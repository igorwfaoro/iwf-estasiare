'use client';

import { createContext, useContext, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';

import CustomModal from '../components/Modal/Modal';

export type ModalRefPropType = {
  modalRef: ModalRef;
};

export interface ModalProvider {
  Component: React.JSXElementConstructor<React.PropsWithChildren<any>>;
  props?: { [key: string]: any };
}

export interface ModalOptions {
  component: React.FC<any>;
  props?: any;
  title?: string;
  onClose?: (result?: any) => void;
  width?: string;
  providers?: ModalProvider[];
}

export interface ModalRef {
  id: string;
  component: React.FC<any>;
  props?: any;
  title?: string;
  close: (result?: any) => void;
  width?: string;
  providers?: ModalProvider[];
}

export interface IModalProvider {
  open: (options: ModalOptions) => ModalRef;
}

interface ModalProviderProps {
  children: JSX.Element;
}

const ModalContext = createContext<IModalProvider | undefined>(undefined);

const ModalProvider = (props: ModalProviderProps) => {
  const [modalList, setModalList] = useState<ModalRef[]>([]);

  const close = (id: string) => {
    setModalList(modalList.filter((modal) => modal.id !== id));
  };

  const open = (options: ModalOptions) => {
    const id = uuidV4();
    const modal: ModalRef = {
      id,
      component: options.component,
      props: options.props,
      title: options.title,
      width: options.width,
      providers: options.providers,
      close: (result?: any) => {
        close(id);
        if (options.onClose) options.onClose(result);
      }
    };

    setModalList((ml) => [...ml, modal]);
    return modal;
  };

  return (
    <ModalContext.Provider value={{ open }}>
      {props.children}
      {modalList.map((modal) => {
        const modalComponent = (
          <modal.component {...modal.props} modalRef={modal} />
        );

        return (
          <CustomModal
            key={modal.id}
            close={modal.close}
            title={modal.title}
            width={modal.width}
          >
            {modal.providers
              ? modal.providers.reduceRight(
                  (acc, Comp) => (
                    <Comp.Component {...Comp.props}>{acc}</Comp.Component>
                  ),
                  modalComponent
                )
              : modalComponent}
          </CustomModal>
        );
      })}
    </ModalContext.Provider>
  );
};

export default ModalProvider;

export const useModal = () => useContext(ModalContext)!;
