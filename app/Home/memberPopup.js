"use client";

import React from 'react';
import { Grid, Paper, Typography, Button, IconButton, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import SaveIcon from '@mui/icons-material/Save';

const userInfo = {
    name: "Nama Member",
    nip: "0000001",
    programStudi: "Informatika",
    fakultas: "Informatika",
    nomorHP: "081211112222",
    tempatLahir: "Bandung",
    tanggalLahir: "01/01/1990",
    jenisKelamin: "Pria",
    agama: "Islam",
    alamatAsal: "Bandung",
    golonganDarah: "A",
    statusMember: "Aktif",
    pendidikan: [
        { degree: "S3", universitas: "Telkom University" },
        { degree: "S2", universitas: "Telkom University" },
        { degree: "S1", universitas: "Telkom University" },
    ],
    photoUrl: "https://via.placeholder.com/150", // Update the photo path accordingly
};

export default function BiodataMember() {
    return (
        <Paper style={{ padding: '20px', margin: 'auto', maxWidth: '900px' }}>
            <Typography variant="h6" gutterBottom>
                Biodata Member
            </Typography>
            <Divider style={{ marginBottom: '20px' }} />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1">Nama</Typography>
                            <Typography variant="body2">{userInfo.name}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1">Jenis Kelamin</Typography>
                            <Typography variant="body2">{userInfo.jenisKelamin}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1">NIP</Typography>
                            <Typography variant="body2">{userInfo.nip}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1">Agama</Typography>
                            <Typography variant="body2">{userInfo.agama}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1">Program Studi</Typography>
                            <Typography variant="body2">{userInfo.programStudi}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1">Alamat Asal</Typography>
                            <Typography variant="body2">{userInfo.alamatAsal}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1">Fakultas</Typography>
                            <Typography variant="body2">{userInfo.fakultas}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1">Golongan Darah</Typography>
                            <Typography variant="body2">{userInfo.golonganDarah}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1">Nomor HP</Typography>
                            <Typography variant="body2">{userInfo.nomorHP}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1">Tempat Lahir</Typography>
                            <Typography variant="body2">{userInfo.tempatLahir}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1">Tanggal Lahir</Typography>
                            <Typography variant="body2">{userInfo.tanggalLahir}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Grid container spacing={2} direction="column" alignItems="center">
                        <Grid item>
                            <img src={userInfo.photoUrl} alt="Member" style={{ width: '150px', borderRadius: '4px' }} />
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center">
                                <Typography variant="subtitle1">Status Member</Typography>
                                <IconButton size="small"><EditIcon fontSize="small" /></IconButton>
                            </Grid>
                            <Typography variant="body2" style={{ color: 'green' }}>{userInfo.statusMember}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>Riwayat Pendidikan</Typography>
                    {userInfo.pendidikan.map((edu, index) => (
                        <Grid container key={index} spacing={1}>
                            <Grid item xs={12} sm={3}>
                                <Typography variant="body2" style={{ fontWeight: 'bold' }}>Pendidikan</Typography>
                                <Typography variant="body2">{edu.degree}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Typography variant="body2" style={{ fontWeight: 'bold' }}>Universitas</Typography>
                                <Typography variant="body2" style={{ color: 'gray' }}>{edu.universitas}</Typography>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="outlined" startIcon={<PrintIcon />}>Print</Button>
                    <Button variant="contained" color="primary" startIcon={<SaveIcon />} style={{ marginLeft: '10px' }}>Simpan</Button>
                </Grid>
            </Grid>
        </Paper>
    );
}
