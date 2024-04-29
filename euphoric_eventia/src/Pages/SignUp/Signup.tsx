import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface UserData {
  userLastName: string;
  userFirstName: string;
  userEmail: string;
  userPassword: { encryptedPassword: string };
}
console.log("Hello from TSX file")

const defaultTheme = createTheme();

export default function SignUp() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const userData: UserData = {
    userLastName: lastName,
    userFirstName: firstName,
    userEmail: email,
    userPassword: { encryptedPassword: password },
  };

  const navigate = useNavigate();

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailRegex.test(email));
  };

  const validatePassword = () => {
    setPasswordError(password.length < 6);
  };

  const handleLogin = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate('/login');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validateEmail();
    validatePassword();

    if (emailError || passwordError) {
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/accounts/createAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      var responseData = await response.json();

      setText(responseData.data);

      if (response.ok){
        navigate('/login');
      }

      if (response.ok) {
        try {
          // Make a POST request to your server endpoint to send the email
          await axios.post('http://localhost:3000/send-email', {
            to: email,
            subject: 'Sign Up Completed',
            text: `Hi ${firstName} ${lastName}!\n\nWelcome to Euphoric Eventia!\nThank you for signing up! Your registration is complete.\n\n\nBest,\nEuphoric Eventia`,
          });

          console.log('Email sent successfully');
          // Now, you can navigate to the login page or do any other necessary actions
        } catch (error) {
          console.error('Error sending email:', error);
        }
      }

    } catch (e) {
      // Handle error
    }
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setter(event.target.value);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main', marginTop: '100px' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={handleInputChange(setFirstName)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={handleInputChange(setLastName)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleInputChange(setEmail)}
                  onBlur={validateEmail}
                  error={emailError}
                  helperText={emailError ? 'Invalid email address' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={handleInputChange(setPassword)}
                  onBlur={validatePassword}
                  error={passwordError}
                  helperText={passwordError ? 'Password must be at least 6 characters' : ''}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="" variant="body2" onClick={handleLogin}>
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <p style={{color:'red', textAlign: 'center', alignContent: 'center'}}>{text}</p>
    </ThemeProvider>
  );
}
