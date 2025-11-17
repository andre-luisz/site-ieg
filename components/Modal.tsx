'use client';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Modal({
  open,
  onClose,
  onPrev,
  onNext,
  canPrev,
  canNext,
  children,
  ariaLabel = 'Modal',
  closeOnBackdrop = true, // ✅ nova opção
}: {
  open: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  canPrev?: boolean;
  canNext?: boolean;
  children: React.ReactNode;
  ariaLabel?: string;
  closeOnBackdrop?: boolean;
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  // Guarda o foco anterior e devolve ao fechar
  useLayoutEffect(() => {
    if (open) {
      lastActiveRef.current = (document.activeElement as HTMLElement) ?? null;
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    // Foco inicial
    closeBtnRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && canPrev) onPrev?.();
      if (e.key === 'ArrowRight' && canNext) onNext?.();

      // focus trap
      if (e.key === 'Tab') {
        const root = wrapperRef.current;
        if (!root) return;
        const focusables = Array.from(
          root.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
          )
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement;

        if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        }
      }
    }

    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      lastActiveRef.current?.focus?.();
    };
  }, [open, canPrev, canNext, onPrev, onNext, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          aria-modal="true"
          role="dialog"
          aria-label={ariaLabel}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.button
            aria-hidden
            onClick={closeOnBackdrop ? onClose : undefined}
            className={`absolute inset-0 bg-black/70 backdrop-blur-sm ${
              closeOnBackdrop ? 'cursor-pointer' : 'cursor-default'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Content wrapper */}
          <motion.div
            ref={wrapperRef}
            className="relative z-10 w-full max-w-5xl outline-none"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.6 }}
          >
            {/* Navegação */}
            {canPrev && (
              <button
                onClick={onPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-4xl px-4"
                aria-label="Anterior"
              >
                ⟵
              </button>
            )}
            {canNext && (
              <button
                onClick={onNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-4xl px-4"
                aria-label="Próximo"
              >
                ⟶
              </button>
            )}

            {/* Fechar */}
            <button
              ref={closeBtnRef}
              onClick={onClose}
              className="absolute -top-3 -right-3 rounded-full bg-white/90 hover:bg-white p-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Fechar"
            >
              ✕
            </button>

            {/* Conteúdo */}
            <motion.div
              className="overflow-hidden rounded-2xl bg-black shadow-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
