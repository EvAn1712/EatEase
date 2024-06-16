'use client';

import { Title, ActionIcon, Button } from 'rizzui';
import cn from '@/utils/class-names';
import { PiXBold } from 'react-icons/pi';

type DrawerHeaderProps = {
  heading: string;
  onClose: () => void;
  onResetCart?: () => void;
  showResetButton?: boolean;
  headerClassName?: string;
};

export default function DrawerHeader({
  onClose,
  heading,
  onResetCart,
  showResetButton,
  headerClassName,
}: DrawerHeaderProps) {
  return (
    <div
      className={cn(
        'mb-4 flex items-center justify-between border-b border-muted px-4 py-[14px]',
        headerClassName
      )}
    >
      <Title as="h5" className="font-semibold">
        {heading}
      </Title>
      <div className="flex items-center gap-2">
        {showResetButton && (
          <Button variant="text" onClick={onResetCart} className="pe-0">
            Tout supprimer
          </Button>
        )}
        <ActionIcon variant="outline" onClick={onClose} className="border-0 p-0">
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
    </div>
  );
}
