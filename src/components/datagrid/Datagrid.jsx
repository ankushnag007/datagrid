import React, { useState } from 'react';
import Checkbox from './Checkbox.jsx';
import jsonData from '../jsonData.js';

const Datagrid = () => {
  const data = Array.isArray(jsonData) ? jsonData : [];
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Function to check if the row has the status "available"
  const isAvailable = (index) => data[index].status === 'available';

  // Check if all selected rows are available
  const isDownloadEnabled = selectedRows.length > 0 && selectedRows.every((index) => isAvailable(index));

  const handleSelectRow = (index) => {
    const newSelectedRows = [...selectedRows];
    if (newSelectedRows.includes(index)) {
      newSelectedRows.splice(newSelectedRows.indexOf(index), 1); // Remove the row if already selected
    } else {
      newSelectedRows.push(index); // Add the row if not selected
    }
    setSelectedRows(newSelectedRows); // Update selected rows state
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]); // Deselect all
    } else {
      setSelectedRows(data.map((_, index) => index)); // Select all
    }
    setSelectAll(!selectAll); // Toggle select all state
  };

  const handleDownloadSelected = () => {
    const selectedData = selectedRows.map((index) => data[index]);
    const downloadMessage = selectedData
      .map((row) => `Name: ${row.name}, Path: ${row.path}`)
      .join('\n');
    alert(`Selected Files for Download:\n\n${downloadMessage}`);
  };

  return (
    <div className="p-4">
         <h1 className="text-2xl font-bold text-gray-800 mb-4 font-extralight">
  Datagrid for <span className="text-blue-700 text-2xl font-bold">Zania AI</span>
</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={selectAll}
            indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
            onChange={handleSelectAll}
          />
          <span className="text-lg text-gray-700">
            {selectedRows.length === 0 ? 'None Selected' : `${selectedRows.length} Selected`}
          </span>

          {/* Download Button */}
          <button
            disabled={!isDownloadEnabled} // Disable if not all selected rows are available
            onClick={handleDownloadSelected}
            className={`px-4 py-2 rounded-lg font-medium text-white ${
              isDownloadEnabled
                ? 'bg-blue-500 cursor-pointer' // Enabled state
                : 'bg-gray-400 text-gray-300 cursor-not-allowed' // Disabled state
            } flex items-center space-x-2`}
            title={!isDownloadEnabled ? "Data can be downloaded for available status rows" : ""} // Tooltip message
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8l-8 8-8-8"
              />
            </svg>
            <span>Download Selected</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 font-semibold text-sm text-gray-600">Checkbox</th>
            <th className="px-4 py-2 font-semibold text-sm text-gray-600">Name</th>
            <th className="px-4 py-2 font-semibold text-sm text-gray-600">Device</th>
            <th className="px-4 py-2 font-semibold text-sm text-gray-600">Path</th>
            <th className="px-4 py-2 font-semibold text-sm text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row, index) => (
            <tr
              key={index}
              className={`${
                selectedRows.includes(index) ? 'bg-blue-100' : 'hover:bg-gray-50'
              }`}
            >
              <td className="px-4 py-2">
                <Checkbox
                  checked={selectedRows.includes(index)}
                  indeterminate={selectedRows.includes(index) && selectedRows.length !== data.length}
                  onChange={() => handleSelectRow(index)}
                />
              </td>
              <td className="px-4 py-2">{row.name}</td>
              <td className="px-4 py-2">{row.device}</td>
              <td className="px-4 py-2">{row.path}</td>
              <td className="px-4 py-2 flex items-center">
                <span
                  style={{
                    backgroundColor: row.status === 'available' ? 'green' : 'gray',
                  }}
                  className="w-2.5 h-2.5 rounded-full mr-2"
                />
                {row.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Datagrid;
