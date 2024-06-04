'use client'

import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MemberDialog from './MemberDialog';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import PrintIcon from '@mui/icons-material/Print';

const members = [
    { id: 1, name: 'John Doe', NIP: '123456', programStudi: 'Computer Science' },
    { id: 2, name: 'Jane Smith', NIP: '234567', programStudi: 'Mathematics' },
    { id: 3, name: 'Alice Johnson', NIP: '345678', programStudi: 'Physics' },
    { id: 4, name: 'Bob Brown', NIP: '456789', programStudi: 'Chemistry' },
    { id: 5, name: 'Emily Davis', NIP: '567890', programStudi: 'Biology' },
    { id: 6, name: 'Michael Wilson', NIP: '678901', programStudi: 'Engineering' },
    { id: 7, name: 'Olivia Martinez', NIP: '789012', programStudi: 'Medicine' },
    { id: 8, name: 'James Anderson', NIP: '890123', programStudi: 'History' },
    { id: 9, name: 'Sophia Taylor', NIP: '901234', programStudi: 'Geography' },
    { id: 10, name: 'Daniel Thomas', NIP: '012345', programStudi: 'Literature' },
    { id: 11, name: 'Emma Jackson', NIP: '123456', programStudi: 'Psychology' },
    { id: 12, name: 'William White', NIP: '234567', programStudi: 'Sociology' },
    { id: 13, name: 'Ava Harris', NIP: '345678', programStudi: 'Economics' },
    { id: 14, name: 'Alexander Martin', NIP: '456789', programStudi: 'Political Science' },
    { id: 15, name: 'Mia Thompson', NIP: '567890', programStudi: 'Anthropology' },
    { id: 16, name: 'Ethan Garcia', NIP: '678901', programStudi: 'Music' },
    { id: 17, name: 'Charlotte Rodriguez', NIP: '789012', programStudi: 'Dance' },
    { id: 18, name: 'Benjamin Martinez', NIP: '890123', programStudi: 'Art' },
    { id: 19, name: 'Madison Lopez', NIP: '901234', programStudi: 'Film Studies' },
    { id: 20, name: 'Jacob Lee', NIP: '012345', programStudi: 'Theater' },
];

const MemberTable = () => {
    const [open, setOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');

    const startRange = (currentPage - 1) * itemsPerPage + 1;
    let endRange = currentPage * itemsPerPage;
    if (endRange > members.length) {
        endRange = members.length;
    }

    const handleOpen = (member) => {
        setSelectedMember(member);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedMember(null);
    };

    // Function to handle dropdown change
    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(1); // Reset current page when items per page changes
    };

    // Function to handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset current page when search term changes
    };

    // Logic for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMembers = members
        .filter((member) => {
            if (searchTerm === '') return true;
            return (
                member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                member.NIP.toLowerCase().includes(searchTerm.toLowerCase()) ||
                member.programStudi.toLowerCase().includes(searchTerm.toLowerCase())
            );
        })
        .slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto my-8">
            <div className="bg-gray-200 p-4 rounded-lg shadow-lg overflow-hidden">

                {/* Dropdown and search */}
                <div className="flex justify-between mb-4 text-gray-500 items-center">
                    <div className="flex items-center">
                        <span className="text-sm mr-2">Show</span>
                        <div className="flex items-center">
                            <select
                                value={itemsPerPage}
                                onChange={handleItemsPerPageChange}
                                className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 mr-2"
                            >
                                {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                            <span className="text-sm">Data</span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <span className="text-sm mr-2">Search:</span>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 mr-2"
                        />
                        <button className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded-md flex items-center" onClick={() => { }}>
                            <PrintIcon />
                            <span className="ml-2">Print Data Member</span>
                        </button>
                    </div>
                </div>

                <table className="w-full table-auto border-collapse rounded">
                    <thead className="bg-red-700">
                        <tr>
                            <th className="px-4 py-2 text-center text-xs font-bold text-white uppercase border-r border-gray-300 size-0">No</th>
                            <th className="px-4 py-2 text-left text-xs font-bold text-white uppercase border-r border-gray-300">Name</th>
                            <th className="px-4 py-2 text-center text-xs font-bold text-white uppercase border-r border-gray-300">NIP</th>
                            <th className="px-4 py-2 text-center text-xs font-bold text-white uppercase border-r border-gray-300">Program Studi</th>
                            <th className="px-4 py-2 text-center text-xs font-bold text-white uppercase">Lihat</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentMembers.map((member, index) => (
                            <tr key={member.id}>
                                <td className="px-4 py-2 whitespace-nowrap border-r border-gray-300 text-center">{indexOfFirstItem + index + 1}</td>
                                <td className="px-4 py-2 whitespace-nowrap border-r border-gray-300">{member.name}</td>
                                <td className="px-4 py-2 whitespace-nowrap border-r border-gray-300 text-center">{member.NIP}</td>
                                <td className="px-4 py-2 whitespace-nowrap border-r border-gray-300 text-center">{member.programStudi}</td>
                                <td className="px-4 py-2 whitespace-nowrap flex justify-center">
                                    <IconButton onClick={() => handleOpen(member)}>
                                        <VisibilityIcon style={{ color: '#1677BD' }} />
                                    </IconButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-end mt-4">
                    <div className="flex items-center">
                        <IconButton
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            color="primary"
                        >
                            <ArrowBackIosRoundedIcon />
                        </IconButton>
                        <span className="text-sm text-gray-600">
                            {`Show ${startRange} to ${endRange} from ${members.length} data`}
                        </span>
                        <IconButton
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentMembers.length < itemsPerPage}
                            color="primary"
                        >
                            <ArrowForwardIosRoundedIcon />
                        </IconButton>
                    </div>
                </div>
            </div>

            <MemberDialog open={open} onClose={handleClose} member={selectedMember} />
        </div>
    );
};

export default MemberTable;
