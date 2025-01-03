import { NextResponse } from "next/server";
import { axiosAPI, constructHeader } from "../../utils";

export async function POST(req: Request) {
  const headers = await constructHeader(req.headers);
  const data = await req.json();
  //const url = `${process.env.API_URL}/api_v1/chat_history`;
  const url = `${process.env.API_URL}/chat_history`;

  const res = await axiosAPI(url, {
    method: "POST",
    headers,
    data,
  });
  console.log("chat_history ~ POST ~ res:", res.data);
  return NextResponse.json(res.data);
}
