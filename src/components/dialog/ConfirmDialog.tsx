import * as AlertDialog from '@radix-ui/react-alert-dialog';

export type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmDialog = ({
  onCancel,
  onConfirm,
  open,
  title,
  cancelText,
  confirmText,
  description,
}: ConfirmDialogProps) => {
  return (
    <AlertDialog.Root
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onCancel();
      }}
    >
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <AlertDialog.Content
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            w-[90vw] max-w-md
            rounded-lg bg-white p-6 shadow-lg
            z-50 focus:outline-none"
        >
          <AlertDialog.Title className="text-lg font-semibold text-gray-900">
            {title}
          </AlertDialog.Title>
          {description && (
            <AlertDialog.Description className="mt-2 text-sm text-gray-500">
              {description}
            </AlertDialog.Description>
          )}
          <div className="mt-6 flex justify-end gap-2">
            <AlertDialog.Action asChild>
              <button
                className="rounded-md border cursor-pointer border-gray-300 bg-black
                  px-4 py-2 text-sm font-medium text-white
                  "
                onClick={onConfirm}
              >
                {confirmText}
              </button>
            </AlertDialog.Action>
            <AlertDialog.Cancel asChild>
              <button
                className="rounded-md border cursor-pointer border-gray-300 bg-black
                  px-4 py-2 text-sm font-medium text-white
                  "
                onClick={onCancel}
              >
                {cancelText}
              </button>
            </AlertDialog.Cancel>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
