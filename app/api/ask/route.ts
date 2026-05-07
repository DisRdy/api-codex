import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";

type AskRequestBody = {
  question?: unknown;
};

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
      input: question,
    });

    return NextResponse.json({
      answer: response.output_text,
    });
  } catch (error) {
    console.error("Gagal memproses pertanyaan dengan OpenAI:", error);

    return NextResponse.json(
      { error: "Gagal memproses pertanyaan." },
      { status: 500 },
    );
  }
}
