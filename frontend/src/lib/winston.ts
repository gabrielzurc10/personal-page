/**
 * Lightweight bridge so any part of the page can open the Winston chat with a
 * ready-made question. The ChatBot listens for this event; everything else just
 * dispatches it, so no context provider is needed.
 */
export const WINSTON_ASK_EVENT = "winston:ask";

export function askWinston(message: string) {
  window.dispatchEvent(new CustomEvent<string>(WINSTON_ASK_EVENT, { detail: message }));
}
