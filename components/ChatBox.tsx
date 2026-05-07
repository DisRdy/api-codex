"use client";

import { useState } from "react";
import { MessageBubble } from "@/components/MessageBubble";
import { QuestionInput } from "@/components/QuestionInput";
import type { Message } from "@/types/chat";

const assistantReply: Message = {
  role: "assistant",
  content: "Ini jawaban contoh dari AI.",
};

export function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");

  function handleSend(questionText: string) {
    const userMessage: Message = {
      role: "user",
      content: questionText,
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      assistantReply,
    ]);
    setQuestion("");
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
        className="flex min-h-[360px] flex-col gap-3 bg-zinc-50 p-4"
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
      </div>

      <QuestionInput
        onChange={setQuestion}
        onSubmit={handleSend}
        value={question}
      />
    </section>
  );
}
