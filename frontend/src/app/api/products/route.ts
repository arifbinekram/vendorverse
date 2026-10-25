import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL?.replace(/\/$/, "");

function apiUnavailable() {
  return NextResponse.json({ message: "Product API is not configured." }, { status: 503 });
}

export async function GET() {
  if (!API_URL) return apiUnavailable();

  const response = await fetch(`${API_URL}/api/products`, { cache: "no-store" });
  return NextResponse.json(await response.json(), { status: response.status });
}

export async function POST(request: NextRequest) {
  if (!API_URL) return apiUnavailable();

  const token = request.headers.get("x-admin-token");
  const body = await request.json();
  const response = await fetch(`${API_URL}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "x-admin-token": token } : {}),
    },
    body: JSON.stringify(body),
  });
  const responseBody = await response.json();
  return NextResponse.json(responseBody, { status: response.status });
}
