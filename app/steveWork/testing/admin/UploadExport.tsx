import React, { useState } from 'react';

export default function UploadExport() {
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        }
    };

    const handleUploadClick = () => {
        // Handle the file upload logic here (e.g., sending it to the server)
        console.log('File uploaded:', fileName);
    };

    return (
        <div className="bg-gray-800 p-4 rounded-md shadow-lg w-full max-w-md">
            <label className="block text-white mb-2 text-lg font-semibold" htmlFor="fileInput">
                Upload File
            </label>
            <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-600"
            />
            {fileName && (
                <div className="mt-4 text-white">
                    <span className="font-semibold">Selected file:</span> {fileName}
                </div>
            )}
            <button
                onClick={handleUploadClick}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
                Upload
            </button>
        </div>
    );
};
