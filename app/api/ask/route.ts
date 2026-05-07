import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";

type AskRequestBody = {
  question?: unknown;
};

const SYSTEM_INSTRUCTION = [
  "Kamu adalah asisten tanya-jawab yang ramah dan jelas.",
  "Jawab selalu dalam Bahasa Indonesia.",
  "Berikan jawaban yang ringkas, jelas, dan mudah dipahami.",
  "Langsung jawab inti pertanyaan tanpa terlalu panjang.",
  "Jika pertanyaan pengguna tidak jelas, minta klarifikasi secara singkat.",
].join(" ");

export async function POST(request: Request) {
  let body: AskRequestBody;

  try {
    body = (await request.json()) as AskRequestBody;
  } catch {
    return NextResponse.json(
      { error: "Body request harus berupa JSON valid." },
      { status: 400 },
    );
  }

  const question = typeof body.question === "string" ? body.question.trim() : "";

  if (!question) {
    return NextResponse.json(
      { error: "Question wajib diisi." },
      { status: 400 },
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY belum dikonfigurasi." },
      { status: 500 },
    );
  }

  try {
    const response = await openai.responses.create({
      model: "gpt-5.5",
      instructions: SYSTEM_INSTRUCTION,
      input: question,
    });
    const answer = response.output_text.trim();

    if (!answer) {
      return NextResponse.json(
        { error: "OpenAI tidak mengembalikan jawaban." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      answer,
    });
  } catch (error) {
    console.error("Gagal memproses pertanyaan dengan OpenAI:", error);

    return NextResponse.json(
      { error: "Gagal memproses pertanyaan." },
      { status: 500 },
    );
  }
}
