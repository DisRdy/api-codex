"use client";

import { useEffect, useRef, useState } from "react";
import { MessageBubble } from "@/components/MessageBubble";
import { QuestionInput } from "@/components/QuestionInput";
import type { Message } from "@/types/chat";

const errorReply: Message = {
  role: "assistant",
  content: "Maaf, terjadi kesalahan saat memproses pertanyaan.",
};

type AskResponse = {
  answer?: unknown;
};

export function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isSendingRef = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isLoading]);

  async function handleSend(questionText: string) {
    const trimmedQuestion = questionText.trim();

    if (!trimmedQuestion || isLoading || isSendingRef.current) {
      return;
    }

    isSendingRef.current = true;

    const userMessage: Message = {
      role: "user",
      content: trimmedQuestion,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setQuestion("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: trimmedQuestion }),
      });

      const data = (await response.json()) as AskResponse;
      const answer = typeof data.answer === "string" ? data.answer : "";

      if (!response.ok || !answer) {
        throw new Error("Invalid answer response.");
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content: answer,
        },
      ]);
    } catch {
      setMessages((currentMessages) => [...currentMessages, errorReply]);
    } finally {
      isSendingRef.current = false;
      setIsLoading(false);
    }
  }

  return (
    <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold text-zinc-900">Chat</h2>
          <p className="mt-1 text-sm text-zinc-500">Tanya jawab AI</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          Dummy
        </span>
      </div>

      <div
        aria-label="Daftar pesan"
        className="flex max-h-[60vh] min-h-[320px] flex-col gap-3 overflow-y-auto bg-zinc-50 p-4 sm:min-h-[420px]"
      >
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <MessageBubble key={`${message.role}-${index}`} message={message} />
          ))
        ) : (
          <div className="flex flex-1 items-center justify-center text-center text-sm text-zinc-500">
            Belum ada pesan.
          </div>
        )}

        {isLoading ? (
          <div className="text-sm text-zinc-500">AI sedang menjawab...</div>
        ) : null}

        <div ref={messagesEndRef} />
      </div>

      <QuestionInput
        isLoading={isLoading}
        onChange={setQuestion}
        onSubmit={handleSend}
        value={question}
      />
    </section>
  );
}
