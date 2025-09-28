import { useEffect, useCallback } from 'react';

interface UseKeyboardNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  onEscape?: () => void;
}

export function useKeyboardNavigation({ 
  isOpen, 
  onClose, 
  onEscape 
}: UseKeyboardNavigationProps) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      if (onEscape) {
        onEscape();
      } else {
        onClose();
      }
    }
  }, [onClose, onEscape]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, handleKeyDown]);
}

export function useFocusManagement(isOpen: boolean, containerRef?: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (isOpen && containerRef?.current) {
      // Focus first focusable element when opened
      const focusableElements = containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [isOpen, containerRef]);
}