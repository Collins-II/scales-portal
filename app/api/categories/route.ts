// app/api/admin/categories/route.ts
import { NextRequest, NextResponse } from "next/server";
import Category from "@/lib/database/models/category";
import { connectToDatabase } from "@/lib/database";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import ScaleProduct from "@/lib/database/models/scales_product";

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

/* ------------------------------------------------------------
   📥 GET — Fetch Categories (Admin)
------------------------------------------------------------ */
export async function GET() {
  try {
    await connectToDatabase();

    const scales = (await ScaleProduct.find()
      .select("_id scaleType image slug")
      .lean()) || [];

    // Ensure we always return an array
    const formatted = Array.isArray(scales)
      ? scales.map(scale => ({
          _id: String(scale._id),
          name: scale.scaleType,
          image: scale.image || undefined
        }))
      : [];

    return NextResponse.json(formatted, {
      status: 200,
      headers: CORS_HEADERS
    });
  } catch (error) {
    console.error("[ADMIN_SCALE_PRODUCTS_GET]", error);

    return NextResponse.json(
      { error: "Failed to fetch scale products" },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

/* ------------------------------------------------------------
   ➕ POST — Create Category (Admin)
------------------------------------------------------------ */
export async function POST(req: NextRequest) {
  try {
   /* const user = await getCurrentUser();

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401, headers: CORS_HEADERS }
      );
    }*/

    const body = await req.json();
    const { name, slug, description, parent } = body;

    if (!name?.trim() || !slug?.trim()) {
      return NextResponse.json(
        { error: "Name and slug are required" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    await connectToDatabase();

    // Prevent duplicate slugs
    const exists = await Category.findOne({ slug });
    if (exists) {
      return NextResponse.json(
        { error: "Category slug already exists" },
        { status: 409, headers: CORS_HEADERS }
      );
    }

    const category = await Category.create({
      name: name.trim(),
      slug: slug.trim(),
      description: description?.trim() || "",
      parent: parent || null
    });

    return NextResponse.json(category, {
      status: 201,
      headers: CORS_HEADERS
    });
  } catch (error) {
    console.error("[ADMIN_CATEGORIES_POST]", error);

    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
