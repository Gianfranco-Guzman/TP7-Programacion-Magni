import { useCallback, useEffect, useRef, useState } from "react";

export function useTransientFlag(durationMs: number) {
  const [value, setValue] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const trigger = useCallback(() => {
    setValue(true);
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setValue(false), durationMs);
  }, [durationMs]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return { value, setValue, trigger };
}
