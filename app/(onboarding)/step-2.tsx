import React, { useState } from "react";
import Twitter from "./twitter";
import Notion from "./notion";
import Local from "./local";
import type { UIFile } from "./select-data-elements";
import type { ReactSetter } from "lib/aliases";

export default function Step2({
	selectedButton,
	files,
	setFiles,
}: {
	selectedButton: string;
	files: UIFile[];
	setFiles: ReactSetter<UIFile[]>;
}) {
	const [isModalOpen, setIsModalOpen] = useState(true);

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			{selectedButton == "twitter" ? (
				<Twitter />
			) : selectedButton == "notion" ? (
				isModalOpen && <Notion closeModal={closeModal} />
			) : (
				<Local files={files} setFiles={setFiles}/>
			)}
		</>
	);
}
