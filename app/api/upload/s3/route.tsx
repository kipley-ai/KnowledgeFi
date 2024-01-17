import { NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import z from "zod";

const client = new S3Client({
	forcePathStyle: false,
	endpoint: process.env.S3_ENDPOINT!,
	region: process.env.S3_REGION!,
	credentials: {
		accessKeyId: process.env.S3_ACCESS_KEY_ID!,
		secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
	},
});

function getFormattedDate(date: Date) {
	const d = new Date(date);
	const year = d.getFullYear();

	const month = ("0" + (d.getMonth() + 1)).slice(-2);
	const day = ("0" + d.getDate()).slice(-2);

	return `${year}${month}/${day}`;
}

function getFinalFilepath(filename: string) {
	const date = getFormattedDate(new Date());
	const filenameArray = filename.split(".");
	const fileformat = filenameArray.pop();

	const newFilename =
		filenameArray.join("_").replace(/[\W_]+/g, "_") +
		"_" +
		Math.random().toString(36).substring(2, 12) +
		"." +
		fileformat;

	return "kb-files/" + date + "/" + newFilename;
}

const postSchema = z.object({
	filename: z.string().min(1),
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

		return NextResponse.json({
			url: await getSignedUrl(client, command, { expiresIn: 3600 }),
		});
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json({ error: "Bad payload: " + error });
		}

		return NextResponse.json({ error: "Internal server error: " + error });
	}
}

export { getPresignedUrl as POST };
