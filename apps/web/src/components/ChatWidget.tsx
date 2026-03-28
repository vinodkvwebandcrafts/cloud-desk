"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useChatMutation } from "@/lib/hooks";
import { useLanguage } from "@/lib/language-context";
import clsx from "clsx";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatWidget() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatMutation = useChatMutation();
  const [initialized, setInitialized] = useState(false);

  // Set welcome message when chat opens (uses current locale)
  useEffect(() => {
    if (isOpen && !initialized) {
      setMessages([{ role: "assistant", content: t.chatWelcome }]);
      setInitialized(true);
    }
  }, [isOpen, initialized, t.chatWelcome]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Close on Escape
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  async function handleSend() {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      const response = await chatMutation.mutateAsync(userMessage);
      setMessages((prev) => [...prev, { role: "assistant", content: response.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    }
  }

  return (
    <>
      {/* FAB button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
          isOpen
            ? "bg-gray-600 hover:bg-gray-700"
            : "bg-blue-600 hover:bg-blue-700"
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <>
          {/* Mobile overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />

          <div
            className={clsx(
              "fixed z-50",
              // Mobile: full screen
              "inset-0 md:inset-auto",
              // Desktop: positioned bottom-right
              "md:bottom-24 md:right-6 md:w-96 md:h-[500px]",
              "flex flex-col bg-white dark:bg-gray-800 md:rounded-xl md:shadow-2xl md:border md:border-gray-200 md:dark:border-gray-700"
            )}
          >
            {/* Chat header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-blue-600 text-white md:rounded-t-xl">
              <div>
                <h3 className="font-semibold">{t.chatTitle}</h3>
                <p className="text-xs text-blue-100">{t.chatSubtitle}</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="md:hidden p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={clsx(
                    "max-w-[80%] px-4 py-2 rounded-2xl text-sm",
                    msg.role === "user"
                      ? "ml-auto bg-blue-600 text-white rounded-br-md"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-md"
                  )}
                >
                  {msg.content}
                </div>
              ))}
              {chatMutation.isPending && (
                <div className="max-w-[80%] px-4 py-2 rounded-2xl bg-gray-100 dark:bg-gray-700 rounded-bl-md">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-3">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.chatPlaceholder}
                  className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white text-sm outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || chatMutation.isPending}
                  className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
