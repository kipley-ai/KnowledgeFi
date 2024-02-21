import { NextResponse } from "next/server";
import { axiosAPI, constructHeader } from "../../utils";

export async function POST(req: Request) {
  const url = `${process.env.API_URL}/api_v1/is_whitelisted`;

  const res = await axiosAPI(url, {
    method: "POST",
    headers: await constructHeader(req.headers),
  });
  return NextResponse.json(res.data);
}
