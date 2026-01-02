import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/data/dummy";
import { getProductsByType } from "@/actions/getProductsByType";

/* -----------------------------------------------------
   CORS CONFIG (Production Safe)
----------------------------------------------------- */
const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
  process.env.NEXT_PUBLIC_SITE_URL,
].filter(Boolean);

function corsHeaders(origin: string | null) {
  const isAllowed = origin && ALLOWED_ORIGINS.includes(origin);

  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : "null",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };
}

/* -----------------------------------------------------
   OPTIONS (Preflight)
----------------------------------------------------- */
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");

  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(origin),
  });
}

/* -----------------------------------------------------
   GET /api/products/search
----------------------------------------------------- */
export async function GET(req: NextRequest) {
  const origin = req.headers.get("origin");

  try {
    const { searchParams } = new URL(req.url);

    /* ---------------------------
       Query Params
    ----------------------------*/
    const q = searchParams.get("q")?.toLowerCase() || "";
    const category = searchParams.get("category") || "all";
    const scaleType = searchParams.get("type") || "all";
    const sort = searchParams.get("sort") || "relevance";

    const minCap = Number(searchParams.get("minCap")) || 0;
    const maxCap = Number(searchParams.get("maxCap")) || Infinity;

    const minPrice = Number(searchParams.get("minPrice")) || 0;
    const maxPrice = Number(searchParams.get("maxPrice")) || Infinity;

    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.min(
      50,
      Math.max(1, Number(searchParams.get("limit")) || 12)
    );
    
    const products = await getProductsByType();
    /* ---------------------------
       Filtering
    ----------------------------*/
    const filtered = products?.filter((p: Product) => {
      if (!p.isActive) return false;

      if (q) {
        const haystack = `${p.name} ${p.description} ${p.tags?.join(" ")}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      if (category !== "all" && p.categorySlug !== category) {
        return false;
      }

      if (scaleType !== "all" && p.scaleType !== scaleType) {
        return false;
      }

      if (
        (p.minCapacity && p.minCapacity < minCap) ||
        (p.maxCapacity && p.maxCapacity > maxCap)
      ) {
        return false;
      }

      if (p.price < minPrice || p.price > maxPrice) {
        return false;
      }

      return true;
    });

    /* ---------------------------
       Sorting
    ----------------------------*/
    switch (sort) {
      case "price_low":
        filtered?.sort((a, b) => a.price - b.price);
        break;

      case "price_high":
        filtered?.sort((a, b) => b.price - a.price);
        break;

      case "newest":
        filtered?.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );
        break;

      case "relevance":
      default:
        if (q) {
          filtered?.sort((a, b) => {
            const aScore = a.name.toLowerCase().includes(q) ? 2 : 0;
            const bScore = b.name.toLowerCase().includes(q) ? 2 : 0;
            return bScore - aScore;
          });
        }
        break;
    }

    /* ---------------------------
       Pagination
    ----------------------------*/
    const total = filtered?.length;
    const start = (page - 1) * limit;
    const end = start + limit;

    const results = filtered?.slice(start, end);

    /* ---------------------------
       Response
    ----------------------------*/
    return NextResponse.json(
      {
        results,
        total,
        page,
        limit,
      },
      {
        status: 200,
        headers: corsHeaders(origin),
      }
    );
  } catch (error) {
    console.error("[PRODUCT_SEARCH_API]", error);

    return NextResponse.json(
      { error: "Search failed" },
      {
        status: 500,
        headers: corsHeaders(origin),
      }
    );
  }
}
