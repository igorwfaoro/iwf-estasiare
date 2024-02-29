import { ModalRefPropType } from '../../../../../../../../../contexts/ModalContext';
import { EventDetailViewModel } from '../../../../../../../../../models/view-models/event-detail.view-model';

export interface EditModalProps extends ModalRefPropType {
  event: EventDetailViewModel;
}
