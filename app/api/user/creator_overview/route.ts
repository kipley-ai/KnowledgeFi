import { NextResponse } from "next/server";
import { axiosAPI, constructHeader } from "../../utils";

export async function POST(req: Request) {
  const data = await req.json();
  const url = `${process.env.API_URL}/api_v1/creator_overview`;

  const res = await axiosAPI(url, {
    method: "POST",
    headers: await constructHeader(req.headers),
    data,
  });
  return NextResponse.json(res.data);
}
