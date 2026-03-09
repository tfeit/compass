import { type ReactNode, useEffect, useCallback } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        onKeyDown={(e) => e.key === 'Enter' && onClose()}
      />
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-xl bg-white shadow-xl flex flex-col animate-fade-in">
        {title && (
          <h2 id="modal-title" className="sr-only">
            {title}
          </h2>
        )}
        <div className="overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}
