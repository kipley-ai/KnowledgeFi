import {
	DeleteObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getFinalFilepath } from "./helper";
import { delSchema, postSchema } from "./schema";

const client = new S3Client({
	forcePathStyle: false,
	endpoint: process.env.S3_ENDPOINT!,
	region: process.env.S3_REGION!,
	credentials: {
		accessKeyId: process.env.S3_ACCESS_KEY_ID!,
		secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
	},
});

async function getPresignedUrl(req: Request) {
	try {
		const data = postSchema.parse(await req.json());
		const finalFilepath = getFinalFilepath(data.filename);

		const command = new PutObjectCommand({
			ACL: "private",
			Bucket: process.env.KBFILES_S3_BUCKET!,
			Key: finalFilepath,
		});

		return NextResponse.json(
			{
				presignedUrl: await getSignedUrl(client, command, { expiresIn: 3600 }),
				bucketPath: finalFilepath,
			},
			{ status: 200 }
		);
	} catch (error) {
		if (error instanceof ZodError) {
			return NextResponse.json(error, { status: 400 });
		}

		console.error(error)

		return NextResponse.json({ status: 500 });
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

		console.error(error)

		return NextResponse.json({ status: 500 });
	}
}
export { deleteFileOnBucket as DELETE, getPresignedUrl as POST };

