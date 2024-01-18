import {
	deleteFileS3,
	fetchPresignedUrlS3,
	uploadFileS3,
} from "@/app/api/upload/s3/helper";
import type { ReactSetter } from "lib/aliases";
import Image from "next/image";
import CheckIcon from "public/images/check-icon.svg";
import CrossIcon from "public/images/cross-icon.svg";
import UploadIcon from "public/images/upload-icon.svg";
import React, { useState } from "react";
import type { UIFile } from "./page";

export default function Local({
	files,
	setFiles,
}: {
	files: UIFile[];
	setFiles: ReactSetter<UIFile[]>;
}) {
	const [showInvalidModal, setShowInvalidModal] = useState(false);
	const [dragActive, setDragActive] = useState(false);

	const dummyFile = [
		{ fileName: "file1.txt", fileSize: "10 KB" },
		{ fileName: "file2.txt", fileSize: "5 KB" },
		{ fileName: "file3.txt", fileSize: "8 KB" },
	];

	const formats =
		".docx, .doc, .odt, .pptx, .ppt, .xlsx, .csv, .tsv, .eml, .msg, .rtf, .epub, .html, .xml, .json, .jpg, .png, .pdf, .txt";

	const handleNewFiles = (newFileObjects: File[]) => {
		newFileObjects.forEach(async (newFileObject: File) => {
			const filenameArray = newFileObject.name.split(".");
			const fileformat = filenameArray.pop();

			// Check if format valid
			if (
				formats.split(", ").filter((format) => "." + fileformat === format)
					.length == 0
			) {
				setShowInvalidModal(true);
				return;
			}

			if (
				newFileObjects &&
				newFileObject &&
				(files.length === 0 ||
					files.filter((file) => file.fileObject.name == newFileObject.name)
						.length > 0)
			) {
				const { presignedUrl, bucketPath } = await fetchPresignedUrlS3(
					newFileObject.name
				);

				setFiles((prevFiles) => {
					return [
						...prevFiles,
						{
							fileObject: newFileObject,
							bucketPath: bucketPath,
							status: "loading",
							link: `${process.env.KBFILES_S3_URL}/${bucketPath}`,
						},
					];
				});

				await uploadFileS3(newFileObject, presignedUrl)
					.then(async (res) => {
						if (res.ok) {
							console.log("Uploading file succeed: " + newFileObject.name)
							setFiles((prevFiles) => {
								return prevFiles.map((file) => {
									if (file.fileObject.name === newFileObject.name) {
										return {
											...file,
											status: "succeed",
										};
									}
									return file;
								});
							});
						}
					})
					.catch((e) => {
						console.error(e);

						// TODO: Add toast
						// setToastAttribute({
						// 	open: true,
						// 	message: "Upload failed",
						// 	type: "danger",
						// 	noteElement: null,
						// });
					});
			}
		});
	};

	const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		if (event.type === "dragenter" || event.type === "dragover") {
			setDragActive(true);
		} else if (event.type === "dragleave") {
			setDragActive(false);
		}
	};

	const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
		console.log("Uploaded a new file from drop");
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);

		const newFileObjects = Array.from(e.dataTransfer?.files || []) as File[];

		handleNewFiles(newFileObjects);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log("Uploaded a new file from manual upload");
		e.preventDefault();
		const newFileObjects = Array.from(e.target.files || []) as File[];

		handleNewFiles(newFileObjects);
	};

	const handleDelete =
		(bucketPath: string) => async (e: React.MouseEvent<HTMLImageElement>) => {
			console.log("Deleted the item: " + bucketPath);

			setFiles((prevFiles: UIFile[]) => {
				return prevFiles.filter(
					(prevFile) => prevFile.bucketPath !== bucketPath
				);
			});

			await deleteFileS3(bucketPath);
		};

	return (
		<div className="mx-64">
			<div
				className="flex flex-col mt-5 mb-8 border border-dashed border-[#aaa] rounded-xl py-20 px-32 text-center items-center cursor-pointer color-[#aaa] font-inter text-white "
				onDragEnter={handleDrag}
				onDragOver={handleDrag}
				onDragLeave={handleDrag}
				onDrop={handleDrop}
				onClick={() => {
					const fileInput = document.getElementById("file-input");
					if (fileInput) {
						fileInput.click();
					}
				}}
			>
				<input
					type="file"
					id="file-input"
					multiple
					onChange={handleChange}
					style={{ display: "none" }}
				/>
				<div className="bg-white rounded-full p-6 mb-8">
					<Image width={60} height={60} src={UploadIcon} alt="Upload Icon" />
				</div>
				<label
					className="text-md mb-3 font-semibold cursor-pointer"
					htmlFor="file-input"
				>
					Drop your files here OR{" "}
					<span className="text-[#01F7FF]">Click here to browse</span>
				</label>
				<p className="text-slate-400 text-xs">
					Supported file formats: .pdf, .csv, .txt, .json, .pptx, .xlsx, .docx.
				</p>
				<p className="text-slate-400 text-xs">
					Maximum number of files allowed: 10
				</p>
			</div>
			<div>
				{files.map((file) => {
					return (
						<div
							key={file.bucketPath}
							className="flex py-5 px-8 my-5 rounded-3xl text-white bg-neutral-900 justify-between"
						>
							<div className="flex flex-row">
								<Image src={CheckIcon} alt="Check Icon" />
								<div className="flex flex-col ml-8">
									<h3 className="font-semibold">{file.fileObject.name}</h3>
									<p className="text-xs">{file.fileObject.size}</p>
								</div>
							</div>
							{ file.status == "loading" && "Loading"}
							<Image
								onClick={handleDelete(file.bucketPath)}
								src={CrossIcon}
								alt="Cross Icon"
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}
