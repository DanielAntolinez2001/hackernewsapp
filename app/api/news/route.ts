import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "angular";
  const page = searchParams.get("page") || "0";

  try {
    const response = await axios.get(
      `https://hn.algolia.com/api/v1/search_by_date?query=${query}&page=${page}`
    );
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching news" }, { status: 500 });
  }
}
