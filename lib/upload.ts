interface PresignedUrlResponse {
	presignedUrl: string;
}

export default function uploadFile(file: File, presignedUrl: string): void {
	fetch(presignedUrl, {
		method: "PUT",
		// Include headers if required by the pre-signed URL parameters
		headers: {
			"Content-Type": file.type,
		},
		body: file,
	})
		.then((response) => {
			if (response.ok) {
				console.log("File successfully uploaded!");
			} else {
				console.error("Upload failed:", response);
			}
		})
		.catch((error) => console.error("Error uploading file:", error));
}
