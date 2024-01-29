// ManageDataSources.jsx

import React from 'react';

const ManageDataSources = () => {
    const data = [
        { from: 'Twitter', type: 'File', size: '5 Bytes', lastUpdated: '2024-02-11 08:12:09 UTC', status: 'Completed' },
        { from: 'Twitter', type: 'File', size: '5 Bytes', lastUpdated: '2024-02-11 08:12:09 UTC', status: 'Failed' },
        { from: 'Twitter', type: 'File', size: '5 Bytes', lastUpdated: '2024-02-11 08:12:09 UTC', status: 'Completed' },
        { from: 'Twitter', type: 'File', size: '5 Bytes', lastUpdated: '2024-02-11 08:12:09 UTC', status: 'Completed' },
        { from: 'Twitter', type: 'File', size: '5 Bytes', lastUpdated: '2024-02-11 08:12:09 UTC', status: 'Completed' },
        // ... more data
    ];

    return (
        <div className="flex flex-col sm:px-6 lg:px-0 py-8 bg-[#292D32] text-white">
            <div className="mx-64">

                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold">All Data Sources</h1>
                    {/* Add New Button */}
                    <button
                        className="flex items-center justify-center bg-[#01F7FF] rounded-3xl py-2 px-5"
                        type="submit"
                    >
                        <h5 className="text-sm text-black font-semibold flex-grow">
                            Add New
                        </h5>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.0001 4.16602V15.8327M4.16675 9.99935H15.8334" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>

                {/* Selected count and Delete Button */}
                <div className="mb-4 flex justify-end items-center">
                    <span className="text-gray-300 mr-2">2 selected</span>
                    <button
                        className="flex items-center justify-center bg-transparent rounded-3xl border border-red-600 py-2 px-9"
                        type="submit"
                    >
                        <h5 className="text-sm text-red-600 font-semibold flex-grow">
                            Delete
                        </h5>
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-white">
                        <thead className="text-left text-gray-400">
                            <tr>
                                <th className="px-6 py-3"><input type="checkbox" /></th> {/* Header Checkbox */}
                                <th className="px-6 py-3">From</th>
                                <th className="px-6 py-3">Type</th>
                                <th className="px-6 py-3">Size</th>
                                <th className="px-6 py-3">Last Updated</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index} className="border-b border-gray-700">
                                    <td className="px-6 py-3"><input type="checkbox" /></td> {/* Row Checkbox */}
                                    <td className="px-6 py-3">{row.from}</td>
                                    <td className="px-6 py-3">{row.type}</td>
                                    <td className="px-6 py-3">{row.size}</td>
                                    <td className="px-6 py-3">{row.lastUpdated}</td>
                                    <td className="px-6 py-3">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${row.status === 'Completed' ? 'bg-green-500' : 'bg-red-500'}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                {/* Pagination */}
                <div className="flex justify-center mt-4">
                    <div className="flex rounded-md">
                        <a href="#" className="py-2 px-4 text-gray-500 bg-gray-700 hover:bg-gray-600 rounded-l">
                            {'<'}
                        </a>
                        {/* Pagination buttons */}
                        <a href="#" className="py-2 px-4 text-white bg-blue-500 hover:bg-blue-600">1</a>
                        {/* More pagination buttons */}
                        <a href="#" className="py-2 px-4 text-gray-500 bg-gray-700 hover:bg-gray-600 rounded-r">
                            {'>'}
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ManageDataSources;
