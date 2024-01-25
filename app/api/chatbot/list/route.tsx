import { NextResponse } from "next/server";
import { axiosAPI, constructHeader } from "../../utils";

export async function POST(req: Request) {
  const data = await req.json();
  const url = `${process.env.API_URL}/api_v1/chatbot/list`;

  const res = await axiosAPI(url, {
    method: "POST",
    headers: constructHeader(req.headers),
    data,
  });
  return NextResponse.json(res.data);
}
