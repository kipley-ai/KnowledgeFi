import { NextResponse } from "next/server";
import { axiosAPI, constructHeader } from "../../utils";

export async function POST(req: Request) {
  const headers = constructHeader(req.headers);
  const data = await req.json();
  const url = "https://knowledgefi-backend.fly.dev/chat_session";

  const res = await axiosAPI(url, {
    method: "POST",
    headers,
    data,
  });

  return NextResponse.json(res.data);
}

// export async function POST(req: Request) {
//   const data = await req.json();
//   const res = await axiosAPI(data.request_url, {
//     method: "POST",
//     headers: constructHeader(req.headers),
//     data: data,
//   });
//   return NextResponse.json(res.data);
// }
