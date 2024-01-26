import { NextResponse } from "next/server";
import { axiosAPI, constructHeader } from "../../utils";

export async function POST(req: Request) {
  const data = await req.json();
  const url = "https://knowledgefi-backend.fly.dev/new_session";
  console.log(url, " param ", data);

  const res = await axiosAPI(url, {
    method: "POST",
    headers: await constructHeader(req.headers),
    data,
  });
  return NextResponse.json(res.data);
}
