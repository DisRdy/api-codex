# Website Tanya Jawab AI

Website tanya-jawab AI sederhana berbasis Next.js. User dapat menulis pertanyaan di halaman chat, lalu aplikasi mengirim pertanyaan ke backend internal untuk diproses dengan OpenAI API.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- OpenAI API

## Install Dependency

Jalankan perintah berikut dari root project:

```bash
npm install
```

## Membuat File `.env.local`

Buat file `.env.local` di root project, lalu isi API key OpenAI:

```env
OPENAI_API_KEY=your_api_key_here
```

Contoh format juga tersedia di file `.env.local.example`.

## Menjalankan Development Server

Jalankan server lokal:

```bash
npm run dev
```

Buka browser ke:

```text
http://127.0.0.1:3000
```

## Mengetes Fitur Tanya-Jawab

1. Pastikan `.env.local` sudah berisi `OPENAI_API_KEY`.
2. Jalankan `npm run dev`.
3. Buka `http://127.0.0.1:3000`.
4. Tulis pertanyaan di area input chat.
5. Tekan `Enter` atau tombol `Kirim`.
6. Tunggu sampai jawaban AI muncul di chat.

Endpoint backend yang dipakai oleh frontend adalah:

```text
POST /api/ask
```

Body request:

```json
{
  "question": "isi pertanyaan user"
}
```

Response sukses:

```json
{
  "answer": "jawaban dari AI"
}
```

## Struktur Folder

```text
app/
  api/ask/route.ts      Endpoint backend untuk memproses pertanyaan
  globals.css           Style global Tailwind CSS
  layout.tsx            Root layout aplikasi
  page.tsx              Halaman utama

components/
  ChatBox.tsx           Komponen utama chat
  MessageBubble.tsx     Komponen bubble pesan user dan assistant
  QuestionInput.tsx     Komponen input pertanyaan

lib/
  openai.ts             Konfigurasi OpenAI client

types/
  chat.ts               Type data chat
```

## Catatan Keamanan

Jangan upload `OPENAI_API_KEY` ke GitHub atau repository publik. Simpan API key hanya di `.env.local`. File `.env.local` sudah diabaikan oleh `.gitignore`.

Frontend tidak menggunakan API key secara langsung. Frontend hanya memanggil endpoint backend `/api/ask`.
