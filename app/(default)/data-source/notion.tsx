export default function Notion() {
    return (
        <div className="flex item-center justify-center">
            <div className="bg-[#141416] text-white w-96 rounded-lg p-6 m-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Connect Notion</h2>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1" width="38" height="38" rx="19" stroke="#353945" stroke-width="2" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z" fill="#FCFCFD" />
                    </svg>
                </div>
                <div className="mt-4">
                    <label htmlFor="notion-url" className="block text-sm font-medium">
                        Notion URL
                    </label>
                    <input
                        id="notion-url"
                        type="text"
                        placeholder="Enter here"
                        className="mt-1 block w-full px-3 py-2 bg-transparent    text-white rounded-md border border-gray-600 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex-grow w-full mt-4">
                    <button className="flex items-center justify-center w-full px-4 py-2 bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-300 rounded-full text-black">
                        Continue
                        <svg className="ml-2" width="26" height="12" viewBox="0 0 26 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.98 6.79004C18.8936 6.79004 19.6343 7.53069 19.6343 8.44433C19.6343 9.35797 18.8936 10.0986 17.98 10.0986L1.65435 10.0986C0.740709 10.0986 5.90253e-05 9.35797 5.90618e-05 8.44433C5.90983e-05 7.53069 0.740711 6.79004 1.65435 6.79004L17.98 6.79004Z" fill="#151515" />
                            <path d="M18.932 6.99088C19.5219 7.63692 19.5219 8.68436 18.932 9.33041C18.3422 9.97645 17.3859 9.97645 16.7961 9.3304L12.3947 4.50945C11.8049 3.86341 11.8049 2.81597 12.3947 2.16993C12.9845 1.52389 13.9408 1.52389 14.5306 2.16993L18.932 6.99088Z" fill="#151515" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}