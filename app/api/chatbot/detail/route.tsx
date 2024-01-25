import { NextResponse } from "next/server";
import { axiosAPI, constructHeader } from "../../utils";

export async function POST(req: Request) {
  const data = await req.json();
  const url = "https://knowledgefi-backend.fly.dev/api_v1/chatbot/detail";
  console.log(url, " param ", data);

  const res = await axiosAPI(url, {
    method: "POST",
    headers: constructHeader(req.headers),
    data,
  });
  return NextResponse.json(res.data);
}
