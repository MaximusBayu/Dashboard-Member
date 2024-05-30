"use client";

import React, { useState } from 'react';

const MemberPage = () => {
  const [memberData, setMemberData] = useState({
    name: '',
    fullName: '',
    nip: '',
    religion: '',
    program: '',
    faculty: '',
    bloodType: '',
    birthPlace: '',
    dateOfBirth: '',
    phoneNumber: '',
    address: '',
    educationHistory: '',
    photo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMemberData({ ...memberData, [name]: value });
  };

  const handleFileChange = (e) => {
    setMemberData({ ...memberData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      for (const key in memberData) {
        formData.append(key, memberData[key]);
      }

      const response = await fetch('/api/members', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        console.log('Member data submitted successfully');
        setMemberData({
          name: '',
          fullName: '',
          nip: '',
          religion: '',
          program: '',
          faculty: '',
          bloodType: '',
          birthPlace: '',
          dateOfBirth: '',
          phoneNumber: '',
          address: '',
          educationHistory: '',
          photo: null,
        });
      } else {
        console.error('Failed to submit member data');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">Edit Profil</h1>
      <div className="flex">
        <div className="w-1/2">
          <div className="mb-5">
            <label className="block font-bold mb-2">Nama</label>
            <input
              type="text"
              name="name"
              value={memberData.name}
              onChange={handleInputChange}
              className="w-full p-2 text-lg border"
              placeholder="Tulis Nama"
            />
          </div>
          <div className="mb-5">
            <label className="block font-bold mb-2">NIP</label>
            <input
              type="text"
              name="nip"
              value={memberData.nip}
              onChange={handleInputChange}
              className="w-full p-2 text-lg border"
              placeholder="Tulis NIP"
            />
          </div>
          <div className="mb-5">
            <label className="block font-bold mb-2">Program Studi</label>
            <input
              type="text"
              name="program"
              value={memberData.program}
              onChange={handleInputChange}
              className="w-full p-2 text-lg border"
              placeholder="Tulis Program Studi"
            />
          </div>
          <div className="mb-5">
            <label className="block font-bold mb-2">Fakultas</label>
            <input
              type="text"
              name="faculty"
              value={memberData.faculty}
              onChange={handleInputChange}
              className="w-full p-2 text-lg border"
              placeholder="Pilih Fakultas"
            />
          </div>
          <div className="mb-5">
            <label className="block font-bold mb-2">Tempat Lahir</label>
            <input
              type="text"
              name="birthPlace"
              value={memberData.birthPlace}
              onChange={handleInputChange}
              className="w-full p-2 text-lg border"
              placeholder="Tulis Tempat Lahir"
            />
          </div>
          <div className="mb-5">
            <label className="block font-bold mb-2">Nomor HP</label>
            <input
              type="tel"
              name="phoneNumber"
              value={memberData.phoneNumber}
              onChange={handleInputChange}
              className="w-full p-2 text-lg border"
              placeholder="Tulis Nomor HP"
            />
          </div>
          <div className="mb-5">
            <label className="block font-bold mb-2">Riwayat Pendidikan</label>
            <textarea
              name="educationHistory"
              value={memberData.educationHistory}
              onChange={handleInputChange}
              className="w-full p-2 text-lg border"
              placeholder="Tulis Riwayat Pendidikan"
            />
          </div>
        </div>
        <div className="w-1/2 ml-5">
          <div className="mb-5">
            <label className="block font-bold mb-2">Jenis Kelamin</label>
            <select
              name="fullName"
              value={memberData.fullName}
              onChange={handleInputChange}
              className="w-full p-2 text-lg border"
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          <div className="mb-5">
            <label className="block font-bold mb-2">Agama</label>
            <select
              name="religion"
              value={memberData.religion}
              onChange={handleInputChange}
              className="w-full p-2 text-lg border"
            >
              <option value="">Pilih Agama</option>
              <option value="Islam">Islam</option>
              <option value="Kristen">Kristen</option>
              <option value="Katolik">Katolik</option>
              <option value="Hindu">Hindu</option>
              <option value="Buddha">Buddha</option>
              <option value="Konghucu">Konghucu</option>
            </select>
          </div>
          <div className="mb-5">
          <label className="block font-bold mb-2">Alamat</label>
          <input
            type="text"
            name="address"
            value={memberData.address}
            onChange={handleInputChange}
            className="w-full p-2 text-lg border"
            placeholder="Tulis Alamat"
          />
        </div>
          <div className="mb-5">
            <label className="block font-bold mb-2">Golongan Darah</label>
            <select
              name="bloodType"
              value={memberData.bloodType}
              onChange={handleInputChange}
              className="w-full p-2 text-lg border"
            >
              <option value="">Pilih Golongan Darah</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="AB">AB</option>
              <option value="O">O</option>
            </select>
          </div>
          <div className="mb-5">
            <label className="block font-bold mb-2">Tanggal Lahir</label>
            <input
              type="date"
              name="dateOfBirth"
              value={memberData.dateOfBirth}
              onChange={handleInputChange}
              className="w-full p-2 text-lg border"
              placeholder="mm/dd/yyyy"
            />
          </div>
        </div>
        <div className="w-1/2 ml-5">
          <div className="mb-5 flex flex-col items-center">
            <div className="w-64 h-80 bg-gray-200 mb-2"></div>
            <span>Foto 4x6</span>
          </div>
          <div className="mb-5">
            <label className="block font-bold mb-2">Unggah Foto</label>
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
              className="w-full p-2 text-lg border"
            />
            {memberData.photo && (
              <img
                src={URL.createObjectURL(memberData.photo)}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover"
              />
            )}
          </div>
          <div className="mb-5 flex items-center">
            <label className="block font-bold mb-2 mr-3">Status Member:</label>
            <span className="text-green-500">Aktif</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center">
          <span className="mr-2 text-blue-500 cursor-pointer">Edit</span>
          <span className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">Simpan</span>
        </div>
      </div>
    </div>
  );
};


export default MemberPage;
