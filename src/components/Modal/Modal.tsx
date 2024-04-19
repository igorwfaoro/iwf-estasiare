import { CloseSVGIcon } from '@react-md/material-icons';
import Modal from 'react-modal';

export interface ModalProps {
  title?: string;
  close?: (result?: any) => void;
  children: JSX.Element;
  hideCloseButton?: boolean;
  width?: string;
}

const CustomModal = (props: ModalProps) => {
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999,
      overflow: 'hidden'
    },
    content: {
      maxWidth: '95%',
      maxHeight: '95%',
      borderRadius: '10px',
      top: 'auto',
      bottom: 'auto',
      left: 'auto',
      right: 'auto',
      padding: '0',
      border: 'none',
      width: props.width || 'auto',
      backgroundColor: '#f3f4f6'
    }
  };

  return (
    <Modal isOpen={true} style={customStyles} ariaHideApp={false}>
      <div className="p-4">
        <header className="flex justify-between">
          <h1 className="text-2xl font-bold">{props.title}</h1>
          {!props.hideCloseButton && (
            <CloseSVGIcon
              className="w-8 cursor-pointer"
              onClick={props.close}
            />
          )}
        </header>
        <div className="modal-content">{props.children}</div>
      </div>
    </Modal>
  );
};

export default CustomModal;
