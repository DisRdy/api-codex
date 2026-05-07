import { ChatBox } from "@/components/ChatBox";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-8 text-zinc-950 sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-4xl flex-col justify-center gap-6">
        <div>
          <h1 className="text-3xl font-bold sm:text-4xl">
            Website Tanya Jawab AI
          </h1>
        </div>

        <ChatBox />
      </section>
    </main>
  );
}
