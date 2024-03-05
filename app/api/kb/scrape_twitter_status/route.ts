import { NextResponse } from "next/server";
import { axiosAPI, constructHeader } from "../../utils";

export async function POST(req: Request) {
  const data = await req.json();
  const baseUrl = `${process.env.API_URL}/api_v1/scrap_twitter_status`;
  const res = await axiosAPI(baseUrl, {
    method: "POST",
    headers: await constructHeader(req.headers),
    data,
  });

  const response = await res.data;

  return NextResponse.json(response);
}
