import {
	deleteFileS3,
	fetchPresignedUrlS3,
	uploadFileS3,
} from "@/app/api/upload/s3/helper";
import { formatBytes } from "lib/string";
import type { ReactSetter } from "lib/aliases";
import Image from "next/image";
import SuccessIcon from "public/images/check-icon.svg";
import CrossIcon from "public/images/cross-icon.svg";
import UploadingIcon from "public/images/upload-file/uploading-icon-white.svg";
import FailedIcon from "public/images/upload-file/failed-icon.svg";
import UploadIcon from "public/images/upload-icon.svg";
import React, { useState, useRef, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";
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
	const fileInputRef = useRef<HTMLInputElement>(null);

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

			// Check if there's actual new unprocessed new files
			if (
				newFileObjects &&
				newFileObject &&
				(files.length === 0 ||
					files.filter((file) => file.filename == newFileObject.name).length ==
						0)
			) {
				console.log("New file detected");
				const { presignedUrl, bucketPath } = await fetchPresignedUrlS3(
					newFileObject.name
				);

				// Use aborter if the file is bigger than 10 MB
				const aborter =
					newFileObject.size > 1024 * 1024 * 10 ? new AbortController() : null;

				console.log(presignedUrl, bucketPath);

				setFiles((prevFiles) => {
					return [
						...prevFiles,
						{
							filename: newFileObject.name,
							size: newFileObject.size,
							status: "uploading",
							bucketPath: bucketPath,
							link: `${process.env.KBFILES_S3_URL}/${bucketPath}`,
							aborter: aborter,
						},
					];
				});

				await uploadFileS3(newFileObject, presignedUrl, aborter)
					.then(async (res) => {
						if (res.ok) {
							console.log("Uploading file succeed: " + newFileObject.name);
							setFiles((prevFiles) => {
								return prevFiles.map((prevFile) => {
									if (prevFile.filename === newFileObject.name) {
										return {
											...prevFile,
											status: "success",
										};
									}
									return prevFile;
								});
							});
						}
					})
					.catch((e) => {
						console.error(e);

						setFiles((prevFiles) => {
							return prevFiles.map((file) => {
								if (file.filename === newFileObject.name) {
									file.aborter?.abort();

									return {
										...file,
										status: "failed",
									};
								}
								return file;
							});
						});

						// TODO: Add toast
						// setToastAttribute({
						// 	open: true,
						// 	message: "Unpredictable error",
						// 	type: "danger",
						// 	noteElement: null,
						// });
					});
			}
		});
	};

	const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setDragActive(true);
		} else if (e.type === "dragleave") {
			setDragActive(false);
		}
	};

	const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
		console.log("Inserted a new file from drop");
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);

		const newFileObjects = Array.from(e.dataTransfer?.files || []) as File[];

		handleNewFiles(newFileObjects);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log("Insert a new file from manual upload");
		e.preventDefault();
		e.stopPropagation();

		const newFileObjects = Array.from(e.target.files || []) as File[];
		handleNewFiles(newFileObjects);
	};

	const handleDelete =
		(index: number) => async (e: React.MouseEvent<HTMLImageElement>) => {
			const filename = files[index].filename;

			files[index].aborter?.abort();

			setFiles((prevFiles: UIFile[]) => {
				return prevFiles.filter((_, i) => {
					return index !== i;
				});
			});

			await deleteFileS3(files[index].bucketPath);

			console.log("Deleted the item: " + filename);
		};

	const handleDivClick = useDebouncedCallback(
		() => {
			if (fileInputRef.current) {
				fileInputRef.current.click();
			}
		},
		300, // 300ms debounce time
		{
			leading: true,
			trailing: false,
		}
	);

	const showStateIcon = (state: "uploading" | "success" | "failed") => {
		switch (state) {
			case "uploading":
				return <Image className={"animate-spin"} src={UploadingIcon} alt="Loading Icon" />;
			case "failed":
				return <Image src={FailedIcon} alt="Failed Icon" />;
			case "success":
				return <Image src={SuccessIcon} alt="Success Icon" />;
		}
	};

	return (
		<div className="mx-64">
			<div
				className="flex flex-col mt-5 mb-8 border border-dashed border-[#aaa] rounded-xl py-20 px-32 text-center items-center cursor-pointer color-[#aaa] font-inter text-white "
				onDragEnter={handleDrag}
				onDragOver={handleDrag}
				onDragLeave={handleDrag}
				onDrop={handleDrop}
				onClick={handleDivClick}
			>
				<input
					ref={fileInputRef}
					type="file"
					id="file-input"
					multiple
					onChange={handleChange}
					style={{ display: "none" }}
				/>
				<div className="bg-white rounded-full p-6 mb-8">
					<Image width={60} height={60} src={UploadIcon} alt="Upload Icon" />
				</div>
				<label className="text-md mb-3 font-semibold cursor-pointer">
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
				{files.map((file, index) => {
					return (
						<div
							key={file.bucketPath}
							className="flex py-5 px-8 my-5 rounded-3xl text-white bg-neutral-900 justify-between"
						>
							<div className="flex flex-row">
								{showStateIcon(file.status)}
								<div className="flex flex-col ml-8">
									<h3 className="font-semibold">{file.filename}</h3>
									<p className="text-xs">{formatBytes(file.size)}</p>
								</div>
							</div>
							<Image
								onClick={handleDelete(index)}
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
