import React, { useEffect, useState} from 'react';
import { Grid, Paper, Typography, Button, IconButton, Divider, TextField, Box, FormControl, InputLabel, Select, MenuItem, Input } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import { jwtDecode } from 'jwt-decode';

const BiodataMember = ({ memberId }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});
    const [educationHistory, setEducationHistory] = useState([]);
    const [newEducation, setNewEducation] = useState({ degree: '', universitas: '' });
    const [selectedFile, setSelectedFile] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});

    const fetchMemberData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/member/get/${memberId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.response) {
                setUserInfo(data.response);
                setEducationHistory(data.response.pendidikan || []);
            } else {
                setError('Member not found');
            }
        } catch (error) {
            console.error("Error fetching member data:", error);
            setError('Error fetching member data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMemberData();
    }, [editMode, memberId]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEditClick = () => {
        setEditMode(true);
        setFormData(userInfo);
    };

    const validateForm = () => {
        const errors = {};
        const requiredFields = [
            'nama', 'jenis_kelamin', 'nip', 'agama', 'program_studi',
            'alamat_asal', 'fakultas', 'golongan_darah', 'nomor_hp',
            'tempat_lahir', 'tanggal_lahir'
        ];
        requiredFields.forEach(field => {
            if (!formData[field]) {
                errors[field] = 'This field is required';
            }
        });
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSaveClick = async () => {
        if (!validateForm()) {
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/member/update/${userInfo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, pendidikan: educationHistory }),
            });

            if (response.ok) {
                setEditMode(false);
            } else {
                setError('Error updating member data');
            }
        } catch (error) {
            console.error('Error updating member data:', error);
            setError('Error updating member data');
        }
    };

    const handleNewEducationChange = (e) => {
        setNewEducation({ ...newEducation, [e.target.name]: e.target.value });
    };

    const handleAddEducation = () => {
        if (newEducation.degree && newEducation.universitas) {
            setEducationHistory([...educationHistory, newEducation]);
            setNewEducation({ degree: '', universitas: '' });
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            setError('Please select a file to upload.');
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedFile);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/member/uploadPhoto`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const updatedUserInfo = await response.json();
                setUserInfo(updatedUserInfo);
                setSelectedFile(null);
            } else {
                setError('Error uploading photo');
            }
        } catch (error) {
            console.error('Error uploading photo:', error);
            setError('Error uploading photo');
        }
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography>Error: {error}</Typography>;
    }

    if (!userInfo) {
        return <Typography>No user info found</Typography>;
    }

    return (
        <Paper style={{ padding: '20px', margin: 'auto', maxWidth: '900px' }}>
            <Typography variant="h6" gutterBottom>
                {editMode ? 'Edit Profil' : 'Biodata Member'}
            </Typography>
            <Divider style={{ marginBottom: '20px' }} />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1">Nama {validationErrors.nama && <span style={{ color: 'red' }}>*</span>}</Typography>
                            {editMode ? (
                                <TextField
                                    name="nama"
                                    placeholder="Nama"
                                    value={formData.nama || ''}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    size="small"
                                    error={!!validationErrors.nama}
                                />
                            ) : (
                                <Typography variant="body2">{userInfo.nama}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1">Jenis Kelamin</Typography>
                            {editMode ? (
                                <FormControl fullWidth variant="outlined" size="small">
                                    <Select
                                        name="jenis_kelamin"
                                        value={formData.jenis_kelamin}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="Laki-laki">Laki-laki</MenuItem>
                                        <MenuItem value="Perempuan">Perempuan</MenuItem>
                                    </Select>
                                </FormControl>
                            ) : (
                                <Typography variant="body2">{userInfo.jenis_kelamin}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1">NIP {validationErrors.nip && <span style={{ color: 'red' }}>*</span>}</Typography>
                            {editMode ? (
                                <TextField
                                    name="nip"
                                    placeholder="NIP"
                                    value={formData.nip || ''}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    size="small"
                                    error={!!validationErrors.nip}
                                />
                            ) : (
                                <Typography variant="body2">{userInfo.nip}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1">Agama</Typography>
                            {editMode ? (
                                <FormControl fullWidth variant="outlined" size="small">
                                    <Select
                                        name="agama"
                                        value={formData.agama}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="Islam">Islam</MenuItem>
                                        <MenuItem value="Kristen">Kristen</MenuItem>
                                        <MenuItem value="Budha">Budha</MenuItem>
                                        <MenuItem value="Hindu">Hindu</MenuItem>
                                        <MenuItem value="Katolik">Katolik</MenuItem>
                                        <MenuItem value="Khonghucu">Khonghucu</MenuItem>
                                    </Select>
                                </FormControl>
                            ) : (
                                <Typography variant="body2">{userInfo.agama}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1">Program Studi {validationErrors.program_studi && <span style={{ color: 'red' }}>*</span>}</Typography>
                            {editMode ? (
                                <TextField
                                    name="program_studi"
                                    placeholder="Program Studi"
                                    value={formData.program_studi || ''}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    size="small"
                                    error={!!validationErrors.program_studi}
                                />
                            ) : (
                                <Typography variant="body2">{userInfo.program_studi}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1">Alamat Asal {validationErrors.alamat_asal && <span style={{ color: 'red' }}>*</span>}</Typography>
                            {editMode ? (
                                <TextField
                                    name="alamat_asal"
                                    placeholder="Alamat Asal"
                                    value={formData.alamat_asal || ''}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    size="small"
                                    error={!!validationErrors.alamat_asal}
                                />
                            ) : (
                                <Typography variant="body2">{userInfo.alamat_asal}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1">Fakultas {validationErrors.fakultas && <span style={{ color: 'red' }}>*</span>}</Typography>
                            {editMode ? (
                                <TextField
                                    name="fakultas"
                                    placeholder="Fakultas"
                                    value={formData.fakultas || ''}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    size="small"
                                    error={!!validationErrors.fakultas}
                                />
                            ) : (
                                <Typography variant="body2">{userInfo.fakultas}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1">Golongan Darah</Typography>
                            {editMode ? (
                                <FormControl fullWidth variant="outlined" size="small">
                                    <Select
                                        name="golongan_darah"
                                        value={formData.golongan_darah}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A">A</MenuItem>
                                        <MenuItem value="B">B</MenuItem>
                                        <MenuItem value="AB">AB</MenuItem>
                                        <MenuItem value="O">O</MenuItem>
                                    </Select>
                                </FormControl>
                            ) : (
                                <Typography variant="body2">{userInfo.golongan_darah}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1">Nomor HP {validationErrors.nomor_hp && <span style={{ color: 'red' }}>*</span>}</Typography>
                            {editMode ? (
                                <TextField
                                    name="nomor_hp"
                                    placeholder="Nomor HP"
                                    value={formData.nomor_hp || ''}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    size="small"
                                    error={!!validationErrors.nomor_hp}
                                />
                            ) : (
                                <Typography variant="body2">{userInfo.nomor_hp}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1">Tempat Lahir {validationErrors.tempat_lahir && <span style={{ color: 'red' }}>*</span>}</Typography>
                            {editMode ? (
                                <TextField
                                    name="tempat_lahir"
                                    placeholder="Tempat Lahir"
                                    value={formData.tempat_lahir || ''}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    size="small"
                                    error={!!validationErrors.tempat_lahir}
                                />
                            ) : (
                                <Typography variant="body2">{userInfo.tempat_lahir}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1">Tanggal Lahir</Typography>
                            {editMode ? (
                                <TextField
                                    name="tanggal_lahir"
                                    type="date"
                                    value={formData.tanggal_lahir ? formatDate(formData.tanggal_lahir) : ''}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    size="small"
                                    error={!formData.tanggal_lahir}
                                />
                            ) : (
                                <Typography variant="body2">{userInfo.tanggal_lahir ? formatDate(userInfo.tanggal_lahir) : ''}</Typography>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Grid container spacing={2} direction="column" alignItems="center">
                        <Grid item>
                            <img src={userInfo.foto} alt="Member" style={{ width: '150px', borderRadius: '4px' }} />
                        </Grid>
                        <Grid item>
                            <Input
                                type="file"
                                onChange={handleFileChange}
                                onClick={handleFileUpload}
                            />
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center">
                                <Typography variant="subtitle1">Status Member</Typography>
                                {editMode && <IconButton size="small"><EditIcon fontSize="small" /></IconButton>}
                            </Grid>
                            {editMode ? (
                                <FormControl variant="outlined" size="small" error={!!validationErrors.status}>
                                    <Select
                                        name="status"
                                        value={formData.status || ''}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value=""><em>Pilih Status</em></MenuItem>
                                        <MenuItem value="aktif">Aktif</MenuItem>
                                        <MenuItem value="tidak aktif">Tidak Aktif</MenuItem>
                                    </Select>
                                </FormControl>
                            ) : (
                                <Typography variant="body2" style={{ color: 'green' }}>{userInfo.status}</Typography>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>Riwayat Pendidikan</Typography>
                    {educationHistory.map((edu, index) => (
                        <Grid container key={index} spacing={1}>
                            <Grid item xs={12} sm={3}>
                                <Typography variant="body2" style={{ fontWeight: 'bold' }}>Pendidikan</Typography>
                                <Typography variant="body2">{edu.degree}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Typography variant="body2" style={{ fontWeight: 'bold' }}>Universitas</Typography>
                                <Typography variant="body2">{edu.universitas}</Typography>
                            </Grid>
                        </Grid>
                    ))}
                    {editMode && (
                        <Box mt={2} display="flex" alignItems="center">
                            <FormControl variant="outlined" size="small" style={{ marginRight: '10px', minWidth: 120 }}>
                                <InputLabel>Pendidikan Terakhir</InputLabel>
                                <Select
                                    name="degree"
                                    value={newEducation.degree}
                                    onChange={handleNewEducationChange}
                                    label="Pendidikan Terakhir"
                                >
                                    <MenuItem value=""><em>Pilih Pendidikan</em></MenuItem>
                                    <MenuItem value="S1">S1</MenuItem>
                                    <MenuItem value="S2">S2</MenuItem>
                                    <MenuItem value="S3">S3</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                name="universitas"
                                label="Universitas"
                                value={newEducation.universitas}
                                onChange={handleNewEducationChange}
                                variant="outlined"
                                size="small"
                                style={{ marginRight: '10px' }}
                            />
                            <IconButton color="primary" onClick={handleAddEducation}>
                                <AddIcon />
                            </IconButton>
                        </Box>
                    )}
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {editMode ? (
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                            style={{ marginLeft: '10px' }}
                            onClick={handleSaveClick}
                        >
                            Simpan
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<EditIcon />}
                            style={{ marginLeft: '10px' }}
                            onClick={handleEditClick}
                        >
                            Edit
                        </Button>
                    )}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default BiodataMember;

