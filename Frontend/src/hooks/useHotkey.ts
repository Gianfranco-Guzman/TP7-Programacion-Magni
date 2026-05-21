import { useEffect, useMemo, useRef } from "react";

type Hotkey = {
  key: string;
  ctrl: boolean;
  alt: boolean;
  shift: boolean;
  meta: boolean;
};

type UseHotkeyOptions = {
  enabled?: boolean;
  preventDefault?: boolean;
};

function parseCombo(combo: string): Hotkey {
  const parts = combo
    .toLowerCase()
    .split("+")
    .map((p) => p.trim())
    .filter(Boolean);

  return {
    ctrl: parts.includes("ctrl") || parts.includes("control"),
    alt: parts.includes("alt") || parts.includes("option"),
    shift: parts.includes("shift"),
    meta: parts.includes("meta") || parts.includes("cmd") || parts.includes("command"),
    key: parts.find(
      (p) => !["ctrl", "control", "alt", "option", "shift", "meta", "cmd", "command"].includes(p),
    ) ?? "",
  };
}

export function useHotkey(
  combo: string,
  handler: () => void,
  { enabled = true, preventDefault = true }: UseHotkeyOptions = {},
) {
  const hotkey = useMemo(() => parseCombo(combo), [combo]);
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!enabled) return;
    if (!hotkey.key) return;

    const onKeyDown = (evento: KeyboardEvent) => {
      if (evento.ctrlKey !== hotkey.ctrl) return;
      if (evento.altKey !== hotkey.alt) return;
      if (evento.shiftKey !== hotkey.shift) return;
      if (evento.metaKey !== hotkey.meta) return;

      if (evento.key.toLowerCase() !== hotkey.key) return;

      if (preventDefault) evento.preventDefault();
      handlerRef.current();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enabled, hotkey, preventDefault]);
}
