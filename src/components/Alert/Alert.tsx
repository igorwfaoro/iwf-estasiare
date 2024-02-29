import { ModalRef, ModalRefPropType } from '../../contexts/ModalContext';
import Button, { ButtonTheme } from '../Button/Button';

export interface AlertButton {
  text: string;
  theme?: ButtonTheme;
  onClick?: (modalRef: ModalRef) => void;

  /**
   * @default true
   */
  closeOnClick?: boolean;
}

export interface AlertProps extends ModalRefPropType {
  message: string | JSX.Element;
  buttons: AlertButton[];
}

const Alert = (props: AlertProps) => {
  const handleButtonClick = (button: AlertButton) => {
    if (button.closeOnClick === undefined || button.closeOnClick === true)
      props.modalRef.close();

    button.onClick && button.onClick(props.modalRef);
  };

  return (
    <div className="flex flex-col gap-6 my-4">
      <div>{props.message}</div>

      <div className="flex justify-end gap-2">
        {props.buttons.map((b, i) => (
          <Button key={i} theme={b.theme} onClick={() => handleButtonClick(b)}>
            {b.text}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Alert;
