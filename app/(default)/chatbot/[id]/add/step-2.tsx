import React, { useState } from "react";

import Notion from "./notion";
import Local from "./local";
import type { UIFile } from "./page";
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
				<></>
			) : selectedButton == "notion" ? (
				isModalOpen && <Notion closeModal={closeModal} />
			) : (
				<Local files={files} setFiles={setFiles}/>
			)}
		</>
	);
}
