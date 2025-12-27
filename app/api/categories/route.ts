// app/api/admin/categories/route.ts
import { NextResponse } from "next/server";

/* ------------------------------------------------------------
   🔐 CORS CONFIG
------------------------------------------------------------ */
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*", // 🔒 tighten in prod if needed
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

/* ------------------------------------------------------------
   🧠 OPTIONS (Preflight)
------------------------------------------------------------ */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: CORS_HEADERS
  });
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

/* ------------------------------------------------------------
   📥 GET — Fetch Categories (Admin)
------------------------------------------------------------ */
export async function GET() {
  try {
    /*const user = await getCurrentUser();

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401, headers: CORS_HEADERS }
      );
    }*/

    const res = await fetch(`${BASE_URL}/api/categories`)
    const categories = await res.json();

    return NextResponse.json(categories, {
      status: 200,
      headers: CORS_HEADERS
    });
  } catch (error) {
    console.error("[ADMIN_CATEGORIES_GET]", error);

    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}