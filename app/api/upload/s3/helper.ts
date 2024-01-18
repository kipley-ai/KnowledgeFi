interface PresignedResponse {
	presignedUrl: string;
	bucketPath: string;
}

export async function fetchPresignedUrlS3(
	filename: string
): Promise<PresignedResponse> {
	const resp = await fetch("/api/upload/s3", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			filename: filename,
		}),
	});

	return (await resp.json()) as PresignedResponse;
}

export async function uploadFileS3(file: File, presignedUrl: string) {
	return await fetch(presignedUrl, {
		method: "PUT",
		// Include headers if required by the pre-signed URL parameters
		headers: {
			"Content-Type": file.type,
			"Content-Length": file.size + "",
		},
		body: file,
	});
}

export async function deleteFileS3(bucketPath: string) {
	return await fetch("/api/upload/s3", {
		method: "DELETE",
		body: JSON.stringify({
			bucketPath: bucketPath
		}),
	});
}

function getFormattedDate(date: Date) {
	const d = new Date(date);
	const year = d.getFullYear();

	const month = ("0" + (d.getMonth() + 1)).slice(-2);
	const day = ("0" + d.getDate()).slice(-2);

	return `${year}${month}/${day}`;
}

export function getFinalFilepath(filename: string) {
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
