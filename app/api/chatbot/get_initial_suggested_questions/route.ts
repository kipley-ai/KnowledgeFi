import { NextResponse } from "next/server";
import { axiosAPI, constructHeader } from "../../utils";

export async function POST(req: Request) {
  const data = await req.json();
  const url = `${process.env.API_URL}/chatbot/get-initial-suggested-questions`;

  const res = await axiosAPI(url, {
    method: "POST",
    headers: await constructHeader(req.headers),
    data,
  });
  //console.log("get-initial-suggested-questions ~ POST ~ res:", res.data);
  return NextResponse.json(res.data);
}
