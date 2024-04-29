// Header.tsx
import React, { ReactNode } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import Logo from '../images/Logo1.png'; // Make sure this path is correct
import {useTranslation} from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher.tsx';

// Define a type for the props
interface HeaderProps {
  loggedIn: boolean;
}

// Styled components
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: '#242145', // Adjust this to match your AppBar's background color if different
});

// styled navigate link
const NavigationLinks = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto', // This will push your navigation links to the right
});

// styled navigate link
const StyledLink = styled(Link)({
  color: '#ffffff',
  textDecoration: "none",
  marginLeft: '30px', // Adjust the spacing between links as needed
  fontSize: '1.15rem', // Increased font size, adjust as needed
  paddingBottom: '1rem', // Space for the underline
  borderBottom: '10px solid transparent', 
  '&:hover': {
    borderBottom: '7px solid #D90166 ', // Pink underline
  }
});

// website logo
const LogoImage = styled('img')({
  height: '90px', // Adjust the size as needed
});

const Header: React.FC<HeaderProps> = ({ loggedIn }) => {
  // initializing translation 
  const {t}=useTranslation()

  // navbar loggedin
  const navbarLoggedin = (): ReactNode => (
    <NavigationLinks>
      <LanguageSwitcher />
      <StyledLink to='/create-event'>{t("Create Event")}</StyledLink>
      <StyledLink to='/events-organized'>{t("Organized Events")}</StyledLink>
      <StyledLink to='/logout'>{t("Logout")}</StyledLink>
    </NavigationLinks>
  );
  
  // navbar loggedout
  const navbarLoggedout = (): ReactNode => (
    <NavigationLinks>
      <LanguageSwitcher />
      <StyledLink to='/login'>{t("Login")}</StyledLink>
    </NavigationLinks>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <StyledToolbar>
          <Link to='/'>
            <LogoImage src={Logo} alt="Logo" />
          </Link>
          {loggedIn ? navbarLoggedin() : navbarLoggedout()}
        </StyledToolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
