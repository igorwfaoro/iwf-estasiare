'use client';

import { MdContentCopy } from 'react-icons/md';
import Button from '../../../../../../components/Button/Button';
import Card from '../../../../../../components/Card/Card';
import { useToast } from '../../../../../../contexts/ToastContext';
import { EventDetailViewModel } from '../../../../../../models/view-models/event-detail.view-model';
import { copyToClipboard } from '../../../../../../util/helpers/clipboard.helper';
import {
  eventFinancialPixMask,
  eventFinancialPixType
} from '../../../../../../util/helpers/event-financial.helper';

interface GiftPixProps {
  event: EventDetailViewModel;
}

export default function GiftPix({ event }: GiftPixProps) {
  const toast = useToast();

  if (!event.financial?.pixType || !event.financial?.pixKey) return <></>;

  const keyType = eventFinancialPixType(event.financial.pixType);

  const keyFormatted = eventFinancialPixMask(
    event.financial.pixType,
    event.financial.pixKey
  );

  const copyKey = async () => {
    if (await copyToClipboard(event.financial!.pixKey!)) {
      toast.open('Chave copiada com sucesso', 'success');
      return;
    }

    toast.open('Erro ao copiar chave', 'error');
  };

  return (
    <div className="max-w-[672px] mx-auto space-y-2">
      <p className="text-lg text-center text-gray-800 italic">
        Caso você queira dar um presente em dinheiro, segue nosso pix
      </p>

      <Card className="p-4 flex flex-col gap-1 items-center">
        <div>{keyType}</div>

        <div className="font-bold text-lg">{keyFormatted}</div>

        {event.financial.pixDescription && (
          <div className="text-sm">{event.financial.pixDescription}</div>
        )}

        <Button
          theme="primary-outline"
          className="flex gap-2 items-center"
          size="small"
          onClick={copyKey}
        >
          <span>Copiar chave</span>
          <MdContentCopy />
        </Button>
      </Card>
    </div>
  );
}
