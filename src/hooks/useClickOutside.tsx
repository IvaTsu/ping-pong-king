import { type RefObject, useCallback, useEffect } from "react";

export default function useClickOutside(
  ref: RefObject<HTMLDivElement>,
  callback: (el: boolean) => void
): void {
  const handleClickOutside = useCallback(
    (event: Event): void => {
      const { target } = event;
      if (target !== null) {
        if (ref.current != null && !ref.current.contains(target as Node)) {
          const isOutside = false;
          callback(isOutside);
        }
      }
    },
    [callback, ref]
  );
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);
}
