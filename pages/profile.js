"use client"; // Ensure this is a client component

import { useRouter } from "next/router";
import React, { useState, useEffect } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    marginTop: theme.spacing(5),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: '0 auto',
    marginBottom: theme.spacing(2),
  },
  card: {
    maxWidth: 500,
    margin: '20px auto',
    padding: theme.spacing(3),
  },
  form: {
    marginTop: theme.spacing(2),
  },
  submit: {
    marginTop: theme.spacing(2),
  },
}));

export default function ProfilePage() {
  const [setUser] = useState(null); // State to store user data
  const router = useRouter();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  const [profile, setProfile] = useState({});
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null || {};
  const [first_name, setFirstName] = useState(user.first_name || '');
  const [last_name, setLastName] = useState(user.last_name || '');
  const [Email, setEmail] = useState(user.email || '');
  const [ETIN, setETIN] = useState(user.ETIN || '');
  const [NationalId, setNationalId] = useState(user.NationalId || '');
  const [Gender, setGender] = useState(user.Gender || '');
  const [DOB, setDOB] = useState(user.DOB || '');
  const [Contact, setContact] = useState(user.Contact || '');
  const [TaxesZone, setTaxesZone] = useState(user.TaxesZone || '');
  const [TaxesCircle, setTaxesCircle] = useState(user.TaxesCircle || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const handleNews = () => {
    window.location.href = '/news';
  };

  // Fetch user profile data
  useEffect(() => {
    if (typeof window !== 'undefined') {

      const fetchProfile = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/get-user-profile`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          });
          const result = await response.json();
          const data = result.data;
          console.log('all:',result.data);
          localStorage.setItem('userData', JSON.stringify(data));

          if (response.ok) {
            setProfile(data);
            setFirstName(data.first_name);
            setLastName(data.last_name);
            setEmail(data.Email);
            setETIN(data.ETIN);
            setNationalId(data.NationalId);
            setContact(data.Contact);
            setGender(data.Gender);
            setTaxesZone(data.TaxesZone);
            setTaxesCircle(data.TaxesCircle);
            setDOB(data.DOB);
          } else {
            swal('Error', data.message || 'Failed to fetch profile', 'error');
          }
        } catch (error) {
          swal('Error', 'Something went wrong!', 'error');
        }
      };
  
      fetchProfile();
    }
  }, [userId]);

  // const userData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('userData')) : null || {};
  // const [ETIN, setETIN] = useState(userData.ETIN || '');
  // const [NationalId, setNationalId] = useState(userData.NationalId || '');
  // const [Gender, setGender] = useState(userData.Gender || '');
  // const [DOB, setDOB] = useState(userData.DOB || '');
  // const [Contact, setContact] = useState(userData.Contact || '');
  // const [TaxesZone, setTaxesZone] = useState(userData.TaxesZone || '');
  // const [TaxesCircle, setTaxesCircle] = useState(userData.TaxesCircle || '');

  // Update user profile data
  const handleUpdate = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/packagewiseProfile', {
        method: 'POST', // Use appropriate HTTP method (PUT or PATCH)
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ userId, first_name,last_name,Email,ETIN,NationalId,Contact,Gender,DOB,TaxesZone,TaxesCircle }),
      });

      const result = await response.json();
      const data = result.data;
      console.log(data);
      if (response.ok) {
        console.log(data.DOB);
        swal('Success', 'Profile updated successfully', 'success');
        setProfile(data);
        setIsEditing(false);
      } else {
        swal('Error', data.message || 'Failed to update profile', 'error');
      }
    } catch (error) {
      swal('Error', 'Something went wrong!', 'error');
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Profile
          </Typography>
          <Typography variant="h6" className={classes.title} onClick={handleNews}>
            News
          </Typography>
          <div>
            <IconButton onClick={handleMenu} color="inherit">
              <Avatar src={''} alt={'User'} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Avatar src={user.avatar || ''} className={classes.large} />
          {!isEditing ? (
            <>
              <Typography variant="h5">Welcome {first_name}</Typography>

              <Button
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            </>
          ) : (
            <div className={classes.form}>
              <TextField
                label="First Name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Last Name"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="ETIN"
                value={ETIN}
                onChange={(e) => setETIN(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="National ID"
                value={NationalId}
                onChange={(e) => setNationalId(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              
              <TextField
                label="Gender"
                value={Gender}
                onChange={(e) => setGender(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="DOB"
                value={DOB}
                onChange={(e) => setDOB(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Contact"
                value={Contact}
                onChange={(e) => setContact(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="TaxesZone"
                value={TaxesZone}
                onChange={(e) => setTaxesZone(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="TaxesCircle"
                value={TaxesCircle}
                onChange={(e) => setTaxesCircle(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleUpdate}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                className={classes.submit}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
