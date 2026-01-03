import { NextRequest, NextResponse } from "next/server";

/* ------------------------------------------------------------------
   CORS CONFIG
------------------------------------------------------------------ */

const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_BASE_URL,
  "http://localhost:3000",
].filter(Boolean);

/* ------------------------------------------------------------------
   Helpers
------------------------------------------------------------------ */

function corsHeaders(origin: string | null) {
  const isAllowed = origin && ALLOWED_ORIGINS.includes(origin);

  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : "null",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Credentials": "true",
  };
}

/* ------------------------------------------------------------------
   OPTIONS (Preflight)
------------------------------------------------------------------ */

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");

  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(origin),
  });
}

/* ------------------------------------------------------------------
   POST
------------------------------------------------------------------ */

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");

  try {
    const body = await req.json();

    const {
      productId,
      productName,
      name,
      email,
      phone,
      message,
    } = body ?? {};

    /* -------------------- Validation -------------------- */
    if (
      !productId ||
      !name ||
      !email ||
      !phone ||
      typeof email !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid or missing fields" },
        {
          status: 400,
          headers: corsHeaders(origin),
        }
      );
    }

    /* -------------------- Persist / Notify -------------------- */
    // TODO:
    // - Save to DB
    // - Send email (Resend / Nodemailer)
    // - Push to CRM / Slack

    console.log("📩 NEW QUOTE REQUEST", {
      productId,
      productName,
      name,
      email,
      phone,
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true },
      {
        status: 200,
        headers: corsHeaders(origin),
      }
    );
  } catch (error) {
    console.log("[QUOTE_REQUEST_ERROR]", error);

    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 500,
        headers: corsHeaders(origin),
      }
    );
  }
}
