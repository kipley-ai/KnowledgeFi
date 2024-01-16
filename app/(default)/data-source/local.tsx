import CheckIcon from 'public/images/check-icon.svg';
import CrossIcon from 'public/images/cross-icon.svg';
import UploadIcon from 'public/images/upload-icon.svg';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';

export default function Local() {
    const [dragActive, setDragActive] = useState(false);
    const dummyData = [
        { fileName: "file1.txt", fileSize: "10 KB" },
        { fileName: "file2.txt", fileSize: "5 KB" },
        { fileName: "file3.txt", fileSize: "8 KB" }
    ];

    const handleDrag = useCallback((event:any) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.type === 'dragenter' || event.type === 'dragover') {
          setDragActive(true);
        } else if (event.type === 'dragleave') {
          setDragActive(false);
        }
      }, []);
    
      const handleDrop = useCallback((event:any) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(false);
        const files = event.dataTransfer.files;
        console.log(files);
      }, []);
    
      const handleChange = useCallback((event:any) => {
        event.preventDefault();
        const files = event.target.files;
        console.log(files);
      }, []);

    return (
        <div className="mx-64">
            <div
                className="flex flex-col mt-5 mb-8 border border-dashed border-[#aaa] rounded-xl py-20 px-32 text-center items-center cursor-pointer color-[#aaa] font-inter text-white "
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => {
                    const fileInput = document.getElementById('file-input');
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
                    style={{ display: 'none' }}
                />
                <div className="bg-white rounded-full p-6 mb-8">
                    <Image width={60} height={60} src={UploadIcon} alt="Upload Icon" />
                </div>
                <label className="text-md mb-3 font-semibold cursor-pointer" htmlFor="file-input">
                    Drop your files here OR <span className="text-[#01F7FF]">Click here to browse</span>
                </label>
                <p className="text-slate-400 text-xs">Supported file formats: .pdf, .csv, .txt, .json, .pptx, .xlsx, .docx.</p>
                <p className="text-slate-400 text-xs">Maximum number of files allowed: 10</p>
            </div>
            <div>
                {
                    dummyData.map((data) => {
                        return (
                            <div className="flex py-5 px-8 my-5 rounded-3xl text-white bg-neutral-900 justify-between">
                                <div className="flex flex-row">
                                    <Image src={CheckIcon} alt="Check Icon" />
                                    <div className="flex flex-col ml-8">
                                        <h3 className="font-semibold">{data.fileName}</h3>
                                        <p className="text-xs">{data.fileSize}</p>
                                    </div>
                                </div>
                                <Image src={CrossIcon} alt="Cross Icon" />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}