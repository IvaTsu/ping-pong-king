/* eslint-disable n/no-callback-literal */
import { type RefObject, useEffect } from "react";

export default function useClickOutside(
  ref: RefObject<HTMLDivElement>,
  callback: (el: boolean) => void
): void {
  useEffect(() => {
    function handleClickOutside(event: Event): void {
      const { target } = event;
      if (target !== null) {
        if (ref.current != null && !ref.current.contains(target as Node)) {
          callback(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);
}
