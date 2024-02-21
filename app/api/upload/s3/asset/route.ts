import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { File } from "buffer";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { delSchema, postSchema } from "../schema";
import { getAssetFinalFilepath } from "../helper";

const client = new S3Client({
  forcePathStyle: false,
  endpoint: process.env.S3_ENDPOINT!,
  region: process.env.S3_REGION!,
  credentials: {
    accessKeyId: process.env.ASSET_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.ASSET_S3_SECRET_ACCESS_KEY!,
  },
});

async function getPresignedUrl(req: Request) {
  try {
    // console.log(req.body)
    const form = await req.formData();
    // console.log("AAAAAAAAAAAA",bodyy.files)
    const file = form.get("input-file-upload");
    const file_dir = form.get("file-dir");
    // files.map(async (file)=>{
    // return NextResponse.json({ message: "failure" },{ status: 400 });
    if (!file)
      return NextResponse.json(
        { message: "No file detected" },
        { status: 400 },
      );

    const isFile = file instanceof File;

    if (!isFile)
      return NextResponse.json({ message: "Is not a file" }, { status: 400 });

    const buffer = await file.arrayBuffer();

    const body = Buffer.from(buffer);

    const filename = getAssetFinalFilepath(file.name, file_dir);

    await client.send(
      new PutObjectCommand({
        ACL: "private",
        Bucket: process.env.ASSET_S3_BUCKET as string,
        Key: filename,
        Body: body,
      }),
    );

    return NextResponse.json({
      message: "success",
      link: process.env.ASSET_S3_URL + "/" + filename,
    });
  } catch (reason) {
    console.log(reason);
    return NextResponse.json({ message: "failure" }, { status: 500 });
  }
}

async function deleteFileOnBucket(req: Request) {
  try {
    const data = delSchema.parse(await req.json());

    const command = new DeleteObjectCommand({
      Bucket: process.env.KBFILES_S3_BUCKET!,
      Key: data.bucketPath,
    });

    await client.send(command);

    return NextResponse.json({ message: "Delete success" }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(error, { status: 400 });
    }

    console.error(error);

    return NextResponse.json({ status: 500 });
  }
}
export { deleteFileOnBucket as DELETE, getPresignedUrl as POST };
