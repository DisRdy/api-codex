import type { FormEvent, KeyboardEvent } from "react";

type QuestionInputProps = {
  isLoading: boolean;
  value: string;
  onChange: (value: string) => void;
  onSubmit: (question: string) => void;
};

export function QuestionInput({
  isLoading,
  value,
  onChange,
  onSubmit,
}: QuestionInputProps) {
  const trimmedValue = value.trim();

  function submitQuestion() {
    if (!trimmedValue || isLoading) {
      return;
    }

    onSubmit(trimmedValue);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitQuestion();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== "Enter" || event.shiftKey) {
      return;
    }

    event.preventDefault();
    submitQuestion();
  }

  return (
    <form
      className="flex flex-col gap-3 border-t border-zinc-200 bg-white p-4 sm:flex-row sm:items-end"
      onSubmit={handleSubmit}
    >
      <textarea
        aria-label="Pertanyaan"
        className="max-h-36 min-h-12 flex-1 resize-none rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm leading-6 text-zinc-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        onKeyDown={handleKeyDown}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Tulis pertanyaanmu di sini..."
        rows={1}
        value={value}
      />
      <button
        className="min-h-12 rounded-lg bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 sm:w-auto"
        disabled={!trimmedValue || isLoading}
        type="submit"
      >
        {isLoading ? "Mengirim..." : "Kirim"}
      </button>
    </form>
  );
}
