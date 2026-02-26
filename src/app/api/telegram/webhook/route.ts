import { NextResponse } from "next/server";

const HETZNER_API = process.env.HETZNER_API_URL || "http://89.167.82.184:8080";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Forward the Telegram webhook payload to Hetzner backend
    const res = await fetch(`${HETZNER_API}/api/telegram/webhook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.error(`Telegram webhook proxy failed: ${res.status}`);
    }

    // Always return 200 to Telegram to acknowledge receipt
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    console.error("Telegram webhook proxy error:", e);
    // Always return 200 to Telegram even on errors
    return NextResponse.json({ ok: true });
  }
}
