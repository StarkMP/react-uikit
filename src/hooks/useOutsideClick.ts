import { RefObject, useEffect } from 'react';

const useOutsideClick = (
  ref: RefObject<HTMLElement | null>,
  func: (event: MouseEvent) => void,
  dependencies: any[] = []
): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
        func(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, ...dependencies]);
};

export default useOutsideClick;
