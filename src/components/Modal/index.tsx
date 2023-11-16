import { CloseSVGIcon } from '@react-md/material-icons';
import Modal from 'react-modal';
import './index.scss';

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
      overflow: 'hidden',
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
      backgroundColor: '#ffffff',
    },
  };

  return (
    <Modal isOpen={true} style={customStyles} className="app-modal">
      <div className="wrapper">
        <div className="header">
          <div className="title">{props.title}</div>
          {!props.hideCloseButton && (
            <CloseSVGIcon className="close-icon" onClick={props.close} />
          )}
        </div>
        <div className="modal-content">{props.children}</div>
      </div>
    </Modal>
  );
};

export default CustomModal;
