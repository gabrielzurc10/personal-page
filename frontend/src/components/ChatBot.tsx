"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const API_URL = `${API_BASE}/api/chat`;

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleScroll = useCallback(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setShowScrollBtn(distanceFromBottom > 100);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Lock background scroll while the chat is maximized (covers the page).
  useEffect(() => {
    if (!(open && expanded)) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open, expanded]);

  // Refocus the input once a response finishes streaming
  useEffect(() => {
    if (open && !loading) inputRef.current?.focus();
  }, [open, loading]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    setInput("");
    setLoading(true);

    // Add user message and empty assistant message in one update
    let assistantIndex = 0;
    setMessages((prev) => {
      assistantIndex = prev.length + 1;
      return [
        ...prev,
        { role: "user", content: trimmed },
        { role: "assistant", content: "" },
      ];
    });

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          message: trimmed,
        }),
      });

      if (!res.ok) throw new Error("Failed to send message");
      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        // Keep the last potentially incomplete line in the buffer
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = JSON.parse(line.slice(6));

          if (data.type === "session") {
            setSessionId(data.session_id);
          } else if (data.type === "chunk") {
            setMessages((prev) => {
              const updated = [...prev];
              updated[assistantIndex] = {
                ...updated[assistantIndex],
                content: updated[assistantIndex].content + data.content,
              };
              return updated;
            });
          } else if (data.type === "error") {
            setMessages((prev) => {
              const updated = [...prev];
              updated[assistantIndex] = {
                ...updated[assistantIndex],
                content: "Sorry, something went wrong. Please try again.",
              };
              return updated;
            });
          }
        }
      }
    } catch {
      setMessages((prev) => {
        // If the empty assistant message was added, update it; otherwise append
        if (prev.length > assistantIndex) {
          const updated = [...prev];
          updated[assistantIndex] = {
            ...updated[assistantIndex],
            content:
              "Sorry, I'm having trouble connecting. Please try again later.",
          };
          return updated;
        }
        return [
          ...prev,
          {
            role: "assistant" as const,
            content:
              "Sorry, I'm having trouble connecting. Please try again later.",
          },
        ];
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Render an SVG as a CSS mask so its color can be controlled via background-color
  // (and therefore changed on hover). Works cross-browser with the -webkit- prefix.
  const maskStyle = (src: string): React.CSSProperties => ({
    maskImage: `url(${src})`,
    WebkitMaskImage: `url(${src})`,
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskPosition: "center",
    maskSize: "contain",
    WebkitMaskSize: "contain",
  });

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 transition-all hover:scale-105 active:scale-95"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <Image
          src={loading ? "/winstonTyping.webp" : open ? "/winstonOpened.webp" : "/winston.webp"}
          alt="Chat with Winston"
          width={130}
          height={130}
          className={loading ? "h-auto w-10 sm:w-12 md:w-14" : "h-auto w-24 sm:w-28 md:w-32"}
        />
      </button>

      {/* Backdrop */}
      {open && expanded && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setExpanded(false)}
        />
      )}

      {/* Chat Modal */}
      {open && (
        <div className={`fixed z-50 flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl dark:bg-[#171717] ${
          expanded
            ? "inset-0 m-auto h-[80vh] max-h-[700px] w-[90vw] max-w-2xl"
            : "bottom-28 right-4 h-[500px] max-h-[calc(100vh-10rem)] w-[calc(100vw-2rem)] sm:bottom-40 sm:right-6 sm:w-[380px] md:w-[420px]"
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-200 bg-primary px-4 py-3 dark:border-white/10 dark:bg-neutral-600">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white dark:text-white">
                Chat with Winston
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setExpanded(!expanded)}
                className="group"
                aria-label={expanded ? "Collapse chat" : "Expand chat"}
              >
                <span
                  aria-hidden
                  className="block h-5 w-5 bg-white/60 transition-colors group-hover:bg-white"
                  style={maskStyle(expanded ? "/collapse.svg" : "/expand.svg")}
                />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="group"
                aria-label="Close chat"
              >
                <span
                  aria-hidden
                  className="block h-5 w-5 bg-white/60 transition-colors group-hover:bg-white"
                  style={maskStyle("/close.svg")}
                />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={messagesContainerRef} onScroll={handleScroll} className="relative flex-1 overflow-y-auto px-4 py-4">
            {messages.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-3">
                  <Image src="/winstonProfile.png" alt="Winston" width={48} height={48} />
                </div>
                <p className="text-sm font-medium text-neutral-900 dark:text-white">
                  Hi! My name is Winston, Gabriel&apos;s digital assistant. Ask me anything about Gabriel.
                </p>
                <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
                  Skills, experience, education, and more.
                </p>
              </div>
            )}

            {messages.map((msg, i) => {
              // Skip empty assistant messages (placeholder for streaming)
              if (msg.role === "assistant" && msg.content === "") return null;

              return (
                <div
                  key={i}
                  className={`mb-3 flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <Image src="/winstonProfile.png" alt="Winston" width={28} height={28} className="shrink-0" />
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-blue-500 text-white dark:bg-blue-600 dark:text-white"
                        : "bg-neutral-100 text-neutral-800 dark:bg-white/10 dark:text-neutral-200"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="chat-markdown">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              );
            })}

            {loading && messages[messages.length - 1]?.content === "" && (
              <div className="mb-3 flex items-end justify-start gap-2">
                <Image src="/winstonProfile.png" alt="Winston" width={28} height={28} className="shrink-0" />
                <div className="flex gap-1.5 rounded-2xl bg-neutral-100 px-4 py-3 dark:bg-white/10">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:0ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:300ms]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Scroll to bottom */}
          {showScrollBtn && (
            <div className="pointer-events-none flex justify-center">
              <button
                onClick={scrollToBottom}
                className="pointer-events-auto -mb-4 -mt-12 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-md transition-colors hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                aria-label="Scroll to bottom"
              >
                <Image src="/chevron-down.svg" alt="scroll to bottom" width={16} height={16} className="opacity-50 dark:invert dark:opacity-70" />
              </button>
            </div>
          )}

          {/* Input */}
          <div className="p-3">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Gabriel..."
                className="flex-1 rounded-full bg-neutral-100 px-4 py-2.5 text-base text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 dark:bg-white/10 dark:text-white dark:placeholder:text-neutral-500 sm:text-sm"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white transition-opacity hover:opacity-80 disabled:opacity-50 dark:bg-blue-600"
                aria-label="Send message"
              >
                <Image src="/send.svg" alt="send message" width={16} height={16} className="invert" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
