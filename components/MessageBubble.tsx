import type { Message } from "@/types/chat";

type MessageBubbleProps = {
  message: Message;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap break-words rounded-lg px-4 py-3 text-sm leading-6 sm:max-w-[70%] ${
          isUser
            ? "bg-emerald-600 text-white"
            : "border border-zinc-200 bg-white text-zinc-800"
        }`}
      >
        <p>{message.content}</p>
      </div>
    </div>
  );
}
