import { NextResponse } from "next/server";
import { axiosAPI, constructHeader } from "../../utils";

export async function POST(req: Request) {
  const headers = await constructHeader(req.headers);
  console.log(headers);
  const data = await req.json();
  const url = `${process.env.API_URL}/chat_session`;

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
