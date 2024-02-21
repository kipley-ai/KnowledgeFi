import { NextResponse } from "next/server";
import { axiosAPI, constructHeader } from "../../utils";
import { nftDetailSchema } from "./schema";
import { ZodError } from "zod";

const url = `${process.env.API_URL}/api_v1/nft/detail`;

export async function POST(req: Request) {
  try {
    const headers = await constructHeader(req.headers);
    const data = nftDetailSchema.parse(await req.json());

    const res = await axiosAPI(url, {
      method: "POST",
      headers,
      data,
    });

    return NextResponse.json(res.data);
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(e, { status: 400 });
    }

    console.log(e);

    return NextResponse.json({ status: 500 });
  }
}
