// ManageDataSources.jsx
import { useState, useEffect } from 'react';
import CheckIcon from 'public/images/check-icon-2.svg';
import ArrowIcon from 'public/images/arrow-3-icon.svg';
import Image from 'next/image';
import { useChatbotDetail } from '@/hooks/api/chatbot';
import { useParams } from 'next/navigation';
import { useKBDetail, useKBItem, useDeleteKBItem } from '@/hooks/api/kb';
import Link from 'next/link';

const ManageDataSources = () => {
    const [checkHeader, setCheckHeader] = useState(false);
    const [checkRow, setCheckRow] = useState<boolean[]>([]);
    const deleteItemAPI = useDeleteKBItem();
    const data = [
        { from: 'Twitter', type: 'File', size: '5 Bytes', lastUpdated: '2024-02-11 08:12:09 UTC', status: 'Completed' },
        { from: 'Twitter', type: 'File', size: '5 Bytes', lastUpdated: '2024-02-11 08:12:09 UTC', status: 'Failed' },
        { from: 'Twitter', type: 'File', size: '5 Bytes', lastUpdated: '2024-02-11 08:12:09 UTC', status: 'Completed' },
        { from: 'Twitter', type: 'File', size: '5 Bytes', lastUpdated: '2024-02-11 08:12:09 UTC', status: 'Completed' },
        { from: 'Twitter', type: 'File', size: '5 Bytes', lastUpdated: '2024-02-11 08:12:09 UTC', status: 'Completed' },
        // ... more data
    ];
    const {id} = useParams()

    const chatbotDetail = useChatbotDetail({
		chatbot_id:id as string
	})

    const kbItem = useKBItem({kb_id:chatbotDetail.data?.data.data.kb_id as string})

    useEffect(() => {
        if(kbItem.status === 'success') {
            let temp = kbItem.data?.data.data.kb_item_data.map(() => false);
            setCheckRow(temp);
        }
    }, [kbItem.data?.data.data.kb_item_data])

    const handleCheckRow = (index: number) => {
        let temp = [...checkRow];
        temp[index] = !temp[index];
        setCheckRow(temp);
    }

    const handleCheckAll = () => {
        let temp = [...checkRow];
        temp = temp.map(() => !checkHeader);
        setCheckRow(temp);
        setCheckHeader(!checkHeader);
    }

    const handleDelete = () => {
        const selectedIndexes = checkRow.reduce((acc: number[], value, index) => { if (value) { acc.push(index); } return acc; }, []);
        const selectedItem = selectedIndexes.map((index) => kbItem.data?.data.data.kb_item_data[index].item_name);

        deleteItemAPI.mutate({
            kb_id:chatbotDetail.data?.data.data.kb_id, 
            items_name:selectedItem
        },{
            onSuccess: () => {
                kbItem.refetch()
            }
        })
    }

	const kbDetail = useKBDetail({kb_id:chatbotDetail.data?.data.data.kb_id as string})

    return (
        <div className="flex flex-col sm:px-6 lg:px-0 text-[#7C878E] py-20 font-semibold">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-normal">Manage Data Sources</h1>
                {/* Add New Button */}
                {
                    kbDetail.data?.data.data.type !== 'twitter' && <Link href={'/chatbot/'+id+'/add'}>
                        <button
                            className="flex items-center justify-center bg-[#01F7FF] rounded-3xl py-2 px-8"
                            type="submit"
                        >
                            <h5 className="text-sm text-black flex-grow mr-3">
                                Add New
                            </h5>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.0001 4.16602V15.8327M4.16675 9.99935H15.8334" stroke="#292D32" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                        </Link>
                }
            </div>

            {/* Selected count and Delete Button */}
            <div className="my-4 flex justify-end items-center">
                {   
                    checkRow.includes(true) ? (
                        <div className="flex items-center">
                        <span className="mr-10">{checkRow.filter((value) => value === true).length} selected</span>
                        <button
                            className="flex items-center justify-center bg-transparent rounded-3xl border-2 border-[#FF6C3E] py-2 px-9"
                            type="submit" onClick={handleDelete}
                        >
                            <h5 className="text-sm text-[#FF6C3E] font-semibold flex-grow">
                                Delete
                            </h5>
                        </button>
                        </div>
                    ): <div>
                        <button
                            className="opacity-0 flex items-center justify-center bg-transparent rounded-3xl border-2 border-[#FF6C3E] py-2 px-9"
                        ><h5 className="text-sm text-[#FF6C3E] font-semibold flex-grow">
                            Delete
                        </h5></button>
                    </div>
                }
                
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table-auto min-w-full border-b border-[#393E44]">
                    <thead className="text-left border-t border-b border-[#393E44]">
                        <tr>
                            <th className="py-7 px-3">
                                <div className={`rounded  ${checkHeader ? "bg-[#01F7FF]" : "bg-transparent border-2 border-[#7C878E]"} w-4 h-4 flex items-center justify-center`} onClick={() => handleCheckAll()}>
                                    <Image src={CheckIcon} className={`${checkHeader ? "" : "hidden"}`} alt="Check Icon"/>
                                </div>
                            </th> {/* Header Checkbox */}
                            <th className="">From</th>
                            <th className="">Type</th>
                            <th className="">Size</th>
                            <th className="">Last Updated</th>
                            <th className="">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {kbItem.data?.data.data.kb_item_data.map((row:any, index:any) => (
                            <tr key={index}>
                                <td className="py-7 px-3">
                                    <div className={`rounded  ${checkRow[index] ? "bg-[#01F7FF]" : "bg-transparent border-2 border-[#7C878E]"} w-4 h-4 flex items-center justify-center`} onClick={() => handleCheckRow(index)}>
                                        <Image src={CheckIcon} className={`${checkRow[index] ? "" : "hidden"}`} alt="Check Icon"/>
                                    </div>
                                </td> {/* Row Checkbox */}
                                <td className="max-w-44 truncate pr-3">{row.item_name}</td>
                                <td className="">{row.item_type}</td>
                                <td className="">{row.size}</td>
                                <td className="">{row.created_at}</td>
                                <td className="">
                                    <span className={`text-left inline-flex leading-5 rounded-full ${row.status === 'Completed' ? 'text-[#BDFF9E]' : 'text-[#F85C72]'}`}>
                                        {row.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {/* Pagination */}
            {/* <div className="flex justify-center mt-4">
                <div className="flex rounded-md">
                    <a href="#" className="py-2 px-4 text-gray-500 bg-gray-700 hover:bg-gray-600 rounded-l">
                        {'<'}
                    </a>
                    
                    <a href="#" className="py-2 px-4 bg-blue-500 hover:bg-blue-600">1</a>
                    
                    <a href="#" className="py-2 px-4 text-gray-500 bg-gray-700 hover:bg-gray-600 rounded-r">
                        {'>'}
                    </a>
                </div>
            </div> */}
            <div className="flex flex-row items-center justify-center mt-4 space-x-12">
                <Image src={ArrowIcon} alt="Previous Icon" />
                <div className="flex border border-[#01F7FF] text-[#01F7FF] rounded w-8 h-8 text-center items-center justify-center">1</div>
                <div>2</div>
                <div>3</div>
                <div>...</div>
                <div>10</div>
                <Image src={ArrowIcon} alt="Next Icon" className="rotate-180"/>
            </div>
        </div>
    );
};

export default ManageDataSources;
