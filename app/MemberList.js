'use client'

import React, { useState, useEffect, useRef } from 'react';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import PrintIcon from '@mui/icons-material/Print';
import FilterListIcon from '@mui/icons-material/FilterList';
import MemberDialog from './MemberDialog';
import ReactToPrint from 'react-to-print';
import PrintMember from './PrintMember';

const members = [
    { id: 1, name: 'John Doe', NIP: '123456', programStudi: 'Informatika', status: 'aktif' },
    { id: 2, name: 'Jane Smith', NIP: '234567', programStudi: 'Rekayasa Perangkat Lunak', status: 'tidak aktif' },
    { id: 3, name: 'Alice Johnson', NIP: '345678', programStudi: 'Sistem Informasi', status: 'aktif' },
    { id: 4, name: 'Bob Brown', NIP: '456789', programStudi: 'Rekayasa Perangkat Lunak', status: 'aktif' },
    { id: 5, name: 'Emily Davis', NIP: '567890', programStudi: 'Informatika', status: 'tidak aktif' },
    { id: 6, name: 'Michael Wilson', NIP: '678901', programStudi: 'Sistem Informasi', status: 'aktif' },
    { id: 7, name: 'Olivia Martinez', NIP: '789012', programStudi: 'Rekayasa Perangkat Lunak', status: 'aktif' },
    { id: 8, name: 'James Anderson', NIP: '890123', programStudi: 'Informatika', status: 'aktif' },
    { id: 9, name: 'Sophia Taylor', NIP: '901234', programStudi: 'Sistem Informasi', status: 'tidak aktif' },
    { id: 10, name: 'Daniel Thomas', NIP: '012345', programStudi: 'Informatika', status: 'aktif' },
    { id: 11, name: 'Emma Jackson', NIP: '123456', programStudi: 'Sistem Informasi', status: 'tidak aktif' },
    { id: 12, name: 'William White', NIP: '234567', programStudi: 'Rekayasa Perangkat Lunak', status: 'aktif' },
    { id: 13, name: 'Ava Harris', NIP: '345678', programStudi: 'Informatika', status: 'aktif' },
    { id: 14, name: 'Alexander Martin', NIP: '456789', programStudi: 'Sistem Informasi', status: 'tidak aktif' },
    { id: 15, name: 'Mia Thompson', NIP: '567890', programStudi: 'Rekayasa Perangkat Lunak', status: 'aktif' },
    { id: 16, name: 'Ethan Garcia', NIP: '678901', programStudi: 'Sistem Informasi', status: 'aktif' },
    { id: 17, name: 'Charlotte Rodriguez', NIP: '789012', programStudi: 'Informatika', status: 'tidak aktif' },
    { id: 18, name: 'Benjamin Martinez', NIP: '890123', programStudi: 'Rekayasa Perangkat Lunak', status: 'tidak aktif' },
    { id: 19, name: 'Madison Lopez', NIP: '901234', programStudi: 'Sistem Informasi', status: 'aktif' },
    { id: 20, name: 'Jacob Lee', NIP: '012345', programStudi: 'Informatika', status: 'aktif' },
];



const MemberTable = () => {
    const [open, setOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const componentRef = useRef();

    const handleStatusFilterChange = (event) => {
        setStatusFilter(event.target.value);
    };

    const handleFilterOpen = () => {
        setFilterOpen(true);
    };

    const handleFilterClose = () => {
        setFilterOpen(false);
    };

    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value);
    };

    const handleClickOutsideFilter = (event) => {
        const filterDropdown = document.getElementById('filter-dropdown');
        if (filterDropdown && !filterDropdown.contains(event.target)) {
            handleFilterClose();
        }
    };

    useEffect(() => {
        if (filterOpen) {
            document.addEventListener('click', handleClickOutsideFilter);
        } else {
            document.removeEventListener('click', handleClickOutsideFilter);
        }
        return () => {
            document.removeEventListener('click', handleClickOutsideFilter);
        };
    }, [filterOpen]);

    const handlePrintOpen = () => {
        setConfirmationOpen(true);
    };

    const handleConfirmationClose = () => {
        setConfirmationOpen(false);
    };

    const handleConfirmationPrint = () => {
        console.log('Printed');
        setConfirmationOpen(false);
        handlePrint();
    };

    const handlePrint = () => {
        if (componentRef.current) {
            componentRef.current.handlePrint();
        }
    };

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

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(1);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const filteredMembers = members.filter((member) => {
        if (selectedFilter) {
            return member.programStudi === selectedFilter;
        }
        return true;
    });

    const sortedMembers = statusFilter === 'aktif' ?
        filteredMembers.filter(member => member.status === 'aktif') :
        statusFilter === 'tidak-aktif' ?
            filteredMembers.filter(member => member.status === 'tidak aktif') :
            filteredMembers;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMembers = sortedMembers
        .filter((member) => {
            if (searchTerm === '') return true;
            return (
                member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                member.NIP.toLowerCase().includes(searchTerm.toLowerCase()) ||
                member.programStudi.toLowerCase().includes(searchTerm.toLowerCase())
            );
        })
        .slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto my-8">
            <div className="bg-gray-200 p-4 rounded-lg shadow-lg overflow-hidden">
                <div className="flex justify-between mb-4 text-gray-500 items-center">
                    <div className="flex items-center">
                        <div className="flex items-center justify-start">
                            <span className="text-sm mr-2">Show</span>
                            <div className="flex items-center mr-4">
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
                            <button
                                className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md flex items-center"
                                onClick={handleFilterOpen}
                            >
                                <FilterListIcon />
                                <span className="ml-2">Filters</span>
                            </button>
                            {filterOpen && (
                                <div id="filter-dropdown" className="absolute top-36 mt-2 ml-36 w-64 bg-white border border-gray-300 rounded-md shadow-lg p-4 z-10">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-sm font-semibold">Filters</h3>
                                        <button className="text-sm text-gray-600" onClick={handleFilterClose}>Close</button>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="filter-select" className="block text-sm font-semibold mb-1">Filter by Jurusan</label>
                                        <select
                                            id="filter-select"
                                            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                                            value={selectedFilter}
                                            onChange={handleFilterChange}
                                        >
                                            <option value="" >All</option>
                                            <option value="Informatika">Informatika</option>
                                            <option value="Rekayasa Perangkat Lunak">Rekayasa Perangkat Lunak</option>
                                            <option value="Sistem Informasi">Sistem Informasi</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <span className="block text-sm font-semibold mb-1">Status</span>
                                        <div>
                                            <input
                                                type="checkbox"
                                                id="aktif"
                                                checked={statusFilter === 'aktif'}
                                                onChange={() => setStatusFilter(statusFilter === 'aktif' ? '' : 'aktif')}
                                            />
                                            <label htmlFor="aktif" className="ml-2">Aktif</label>
                                        </div>
                                        <div>
                                            <input
                                                type="checkbox"
                                                id="tidak-aktif"
                                                checked={statusFilter === 'tidak-aktif'}
                                                onChange={() => setStatusFilter(statusFilter === 'tidak-aktif' ? '' : 'tidak-aktif')}
                                            />
                                            <label htmlFor="tidak-aktif" className="ml-2">Tidak Aktif</label>
                                        </div>
                                    </div>

                                </div>
                            )}
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
                        <button className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded-md flex items-center" onClick={handlePrintOpen}>
                            <PrintIcon />
                            <span className="ml-2">Print Data Member</span>
                        </button>
                    </div>
                </div>

                <table ref={componentRef} className="w-full table-auto border-collapse rounded">
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

            <Dialog open={confirmationOpen} onClose={handleConfirmationClose} maxWidth="sm" fullWidth>
                <DialogTitle>Print Confirmation</DialogTitle>
                <DialogContent>
                    <p>Apakah anda yakin ingin melakukan print pada semua member ini?</p>
                </DialogContent>
                <DialogActions className='p-4'>
                    <Button onClick={handleConfirmationClose} variant='text'>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmationPrint} variant='contained' autoFocus>
                        Print
                    </Button>
                </DialogActions>
            </Dialog>
            <ReactToPrint
                trigger={() => (
                    <div style={{ display: 'none' }}>
                        <PrintMember ref={componentRef} />
                    </div>
                )}
                content={() => componentRef}
            />
        </div>
    );
};

export default MemberTable;
