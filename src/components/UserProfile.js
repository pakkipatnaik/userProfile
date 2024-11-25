import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import {
  TextField,
  Button,
  Box,
  Typography,
  Avatar,
  Grid,
  Paper,
  MenuItem,
  InputLabel,
} from '@mui/material';
import styles from '../styles/userProfile.module.css';

const UserProfile = () => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [preview, setPreview] = useState(null);


  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('email', data.email);
    formData.append('address', data.address);
    formData.append('contactNumber', data.contactNumber);
    formData.append('city', data.city);
    formData.append('state', data.state);
    formData.append('password', data.password);
    if (data.profilePicture && data.profilePicture.length > 0) {
      formData.append('profilePicture', data.profilePicture[0]);
    }
    try {
      await axios.post('http://localhost:5000/api/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue('profilePicture', e.target.files); 
    }
  };

  const resetForm = () => {
    reset();
    setPreview(null); 
  };

  return (
    <Grid container justifyContent="center" className ={styles.userProfileContainer} >
      <Grid item xs={10} sm={6} md={4}>
        <Paper elevation={3} className={styles.userProfilePaper}>
          <Box
          className={styles.userProfileHeader}
          >
            <Typography variant="h5">
              Edit Profile
            </Typography>
            <Avatar
            className={styles.userProfileAvatar}
              src={preview}
              alt="Profile Preview"
            />
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <InputLabel className={styles.userProfileInputLabel}>First Name</InputLabel>
                <TextField
                  fullWidth
                  {...register('firstName', { required: 'First name is required' })}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  sx={{
                    '& .MuiOutlinedInput-input': {
                      height: '0px'
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel className={styles.userProfileInputLabel}>Last Name</InputLabel>
                <TextField
                  fullWidth
                  {...register('lastName', { required: 'Last name is required' })}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  sx={{
                    '& .MuiOutlinedInput-input': {
                      height: '0px'
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel className={styles.userProfileInputLabel}>Email</InputLabel>
                <TextField
                  type="email"
                  fullWidth
                  {...register('email', { required: 'Email is required' })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{
                    '& .MuiOutlinedInput-input': {
                      height: '0px'
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel className={styles.userProfileInputLabel}>Contact Number</InputLabel>
                <TextField
                  fullWidth
                  {...register('contactNumber', {
                    required: 'Contact number is required',
                    pattern: {
                      value: /^\d{10}$/,
                      message: 'Contact number must be 10 digits',
                    },
                  })}
                  error={!!errors.contactNumber}
                  helperText={errors.contactNumber?.message}
                  sx={{
                    '& .MuiOutlinedInput-input': {
                      height: '0px'
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel className={styles.userProfileInputLabel} >Password</InputLabel>
                <TextField
                  type="password"
                  fullWidth
                  {...register('password', {
                    required: 'Password is required',
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                      message: 'Password must contain at least 8 characters, one uppercase, one lowercase, and one number',
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  sx={{
                    '& .MuiOutlinedInput-input': {
                      height: '0px'
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel className={styles.userProfileInputLabel}>Profile Picture</InputLabel>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                >
                  Upload Profile Picture
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>
              </Grid>
            </Grid>
            <Box className={styles.userProfileButtons}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={resetForm}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </Box>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserProfile;