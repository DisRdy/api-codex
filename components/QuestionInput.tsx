import type { FormEvent } from "react";

type QuestionInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (question: string) => void;
};

export function QuestionInput({
  value,
  onChange,
  onSubmit,
}: QuestionInputProps) {
  const trimmedValue = value.trim();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!trimmedValue) {
      return;
    }

    onSubmit(trimmedValue);
  }

  return (
    <form
      className="flex flex-col gap-3 border-t border-zinc-200 bg-white p-4 sm:flex-row"
      onSubmit={handleSubmit}
    >
      <input
        aria-label="Pertanyaan"
        className="min-h-12 flex-1 rounded-lg border border-zinc-300 bg-white px-4 text-sm text-zinc-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Ketik pertanyaan..."
        type="text"
        value={value}
      />
      <button
        className="min-h-12 rounded-lg bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500"
        disabled={!trimmedValue}
        type="submit"
      >
        Kirim
      </button>
    </form>
  );
}
